// ODRL-AP-NL viewer — SPARQL-endpointlaag (?sparql=<endpoint>).
//
// DOM-vrij en node-testbaar: fetch is injecteerbaar, de query-bouwers zijn
// pure functies die alleen strings opleveren. De viewer gebruikt dit in twee
// stappen (Swagger-achtig "lijst + detail"):
//   1. policyListQuery()      -> SELECT: alle policies met titel, afnemer(-label),
//                                temporal-containerinfo en versietelling;
//                                listSkeletonTurtle() maakt daar een skelet-graaf
//                                van die de bestaande modelcode (parse.js) direct
//                                begrijpt (containers, versies, labels).
//                                Vooraf gaat policyListFirstQuery() — dezelfde
//                                skeletvorm, maar alleen de eerste n titels per
//                                soort en zonder aggregaties (tweefasige lading:
//                                eerst beeld, dan index; zie doc.js).
//   2. policyDetailQuery(iri) -> CONSTRUCT: de volledige weergave-sluiting van
//                                één policy (geneste blank nodes, benoemde
//                                bouwstenen, temporele container + zusterversies,
//                                labels één hop uit); addSource() in de store en
//                                de bestaande weergave rendert hem.
//
// GRAPH-SCOPING: sommige endpoints mengen in hun union default graph meerdere
// granulariteiten van dezelfde policies (bv. het lokale BRP-register, waar
// `autorisatiebesluiten-compact` en `-actueel` DEZELFDE besluiten op
// categorie- vs rubriekniveau beschrijven). Daarvoor kent policyDetailQuery
// de optie excludeGraphs: uit te sluiten named graphs. De uitsluiting
// veronderstelt dat de data in named graphs staat — waar de default graph de
// union van alle named graphs is, klopt dat per definitie. WELKE graphs een
// endpoint moet uitsluiten is endpointkennis en dus configuratie van de
// aanroepplek: zie assets/endpoint-config.js en de ?exclude-graph=-parameter
// (audit-punt C3). De default hier is leeg — de generieke laag kent geen
// dataset-namen.

import {
  TEMPORAL_VOCABS, VERSION_DATING_PREDS, SKELETON_CONTAINER_CLASS,
  SKELETON_MEMBER_PRED, SKELETON_COUNT_PRED,
} from './temporal.js';
// Taalvoorkeur voor de labels die de index-SELECTs opleveren (audit-punt B16).
import { langRank, getLang } from './i18n.js';

const ODRL = 'http://www.w3.org/ns/odrl/2/';
const DCT = 'http://purl.org/dc/terms/';
const DCAT = 'http://www.w3.org/ns/dcat#';
const SCHEMA = 'https://schema.org/';

export const DEFAULT_EXCLUDE_GRAPHS = [];

const PREFIXES_SPARQL = `PREFIX odrl: <http://www.w3.org/ns/odrl/2/>
PREFIX dct:  <http://purl.org/dc/terms/>
PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX schema: <https://schema.org/>
`;

// --- HTTP-laag ---------------------------------------------------------------

async function sparqlPost(endpoint, query, accept, fetchImpl) {
  const doFetch = fetchImpl || globalThis.fetch;
  const res = await doFetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: accept,
    },
    body: 'query=' + encodeURIComponent(query),
  });
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.text()).slice(0, 200); } catch { /* leeg laten */ }
    throw new Error(`SPARQL HTTP ${res.status}${detail ? ' — ' + detail : ''}`);
  }
  return res;
}

// SELECT -> array van bindings ({var: {type, value, ...}}).
export async function sparqlSelect(endpoint, query, fetchImpl) {
  const res = await sparqlPost(endpoint, query, 'application/sparql-results+json', fetchImpl);
  const json = await res.json();
  return (json && json.results && json.results.bindings) || [];
}

// CONSTRUCT/DESCRIBE -> Turtle-tekst.
export async function sparqlConstruct(endpoint, query, fetchImpl) {
  const res = await sparqlPost(endpoint, query, 'text/turtle', fetchImpl);
  return res.text();
}

// --- Query-bouwers (pure functies) -------------------------------------------

// IRI's gaan letterlijk een query in: alleen veilige tekens toestaan.
function iriRef(iri) {
  const s = String(iri || '');
  if (!/^[^<>"{}|^`\\\s]+$/.test(s)) throw new Error('ongeldige IRI voor SPARQL: ' + s);
  return '<' + s + '>';
}

function graphFilter(gVar, excludeGraphs) {
  if (!excludeGraphs || !excludeGraphs.length) return '';
  return `FILTER(${gVar} NOT IN (${excludeGraphs.map(iriRef).join(', ')}))`;
}

// Lidmaatschap container<->versie: AFGELEID uit de gedeelde prov-regel in
// assets/temporal.js (memberPreds containerzijde, inverseMemberPreds
// versiezijde/invers), zodat modelbouw (parse.js) en queries niet uiteen
// kunnen lopen (audit-punt B13).
//
// Sinds de versmalling op PROV/DCT (aug 2026) is dat ÉÉN patroon —
// `?v prov:specializationOf ?c` — en levert deze functie dus géén UNION meer
// op. De naam blijft; de vorm volgt de declaratie. Wat eruit ging:
// pav:hasVersion (0 voorkomens in de stores én in testdata/wild/) en
// dct:hasPart (in het /odrl-register uitsluitend de registerwortel die zijn
// besluit-identiteiten opsomt, nul policies). Twee dode UNION-takken minder
// op ELKE plek waar dit lidmaatschap voorkomt — in policyDetailQuery zijn dat
// er vier, dus 8 takken minder in die ene query.
const MEMBER_VOCAB = TEMPORAL_VOCABS.find((v) => v.id === 'prov');
function memberUnion(cVar, vVar) {
  const alts = [
    ...MEMBER_VOCAB.memberPreds.map((p) => `{ ${cVar} <${p}> ${vVar} }`),
    ...MEMBER_VOCAB.inverseMemberPreds.map((p) => `{ ${vVar} <${p}> ${cVar} }`),
  ];
  // Eén alternatief: als kale triple, zonder overbodige accolades — dat
  // scheelt de engine een group-graph-pattern per voorkomen.
  if (alts.length === 1) return alts[0].replace(/^\{ | \}$/g, '') + ' .';
  return alts.join(' UNION ');
}

// "Deze node is een VERSIE": datering op de versiezijde, als propertypad-
// alternatief. Afgeleid uit dezelfde gedeelde constante die parse.js gebruikt
// (hasVersionDating), zodat de versietelling van de query en die van de
// modelbouw niet uiteen kunnen lopen.
const VERSION_DATING_ALT = VERSION_DATING_PREDS.map((p) => `<${p}>`).join('|');

// GELDINGSPERIODE in een SELECT. De eigen vorm is sinds aug 2026 het
// SCHEMA-PAAR op de node zelf (schema:validFrom / schema:validThrough, twee
// platte datumliterals); de dct:valid-periodeknoop en de dct:valid-literal
// blijven de tolerante terugval (derden-data, CG-documentpatroon,
// niet-gemigreerde grafen). Zie assets/temporal.js voor de rangorde.
//
// VORM. Twee losse OPTIONALs voor het schema-paar, plus ÉÉN buitenste OPTIONAL
// voor de terugvalknoop met de twee datums als GENESTE OPTIONALs op de al
// gebonden knoop — niet drie losse OPTIONALs met elk een eigen
// dct:valid-pattern. Dat laatste is een meetresultaat, geen stijlkeuze: de
// losse vorm (dct:valid/dcat:startDate, dct:valid/dcat:endDate, dct:valid +
// isLiteral) kostte op /brp-ap 407 ms tegen 279 ms — de dct:valid-triple werd
// drie keer opnieuw opgezocht.
//
// COALESCE legt de RANGORDE vast: staat het schema-paar er, dan wint het, ook
// als de node daarnaast nog een periodeknoop draagt (een store kan halverwege
// een migratie staan). De uitgaande kolomnamen blijven exact ?from/?to/?node,
// zodat listSkeletonTurtle en de gedecomponeerde index er niets van merken.
//
// De ?valid-kolom draagt de terugval-KNOOP (blank of benoemd) of de literal;
// de skeletbouwer gebruikt hem alleen als hij een literal is (validityLines).
const validityOptionals = (sVar, nodeVar, fromVar, toVar) => `  OPTIONAL { ${sVar} schema:validFrom ${fromVar}_s }
  OPTIONAL { ${sVar} schema:validThrough ${toVar}_s }
  OPTIONAL {
    ${sVar} dct:valid ${nodeVar} .
    OPTIONAL { ${nodeVar} dcat:startDate ${fromVar}_n }
    OPTIONAL { ${nodeVar} dcat:endDate ${toVar}_n }
  }
  BIND(COALESCE(${fromVar}_s, ${fromVar}_n) AS ${fromVar})
  BIND(COALESCE(${toVar}_s, ${toVar}_n) AS ${toVar})`;

// Alle odrl:Set/Offer/Agreement/Request met label/titel, assignee(-label),
// temporal-containerinfo en versietelling (incl. historie: de telling loopt
// over álle leden van de container, ook de versies die alleen in de
// historisch-graph staan). Eén rij per policy (GROUP BY + SAMPLE); de
// granulariteits-dubbeling compact/actueel dedupliceert daardoor vanzelf.
// De containerinfo + versietelling komt uit één sub-SELECT die per ?policy
// aggregeert en als top-level OPTIONAL op ?policy joint; BINNENIN wordt de
// versietelling éérst per container berekend (klein: 2,6k groepen) en daarna
// pas aan het lidmaatschap gejoind. Gemeten: 2,9 s op 12,5k policies.
// Valkuilen die hier bewust omzeild zijn (niet "vereenvoudigen" zonder
// opnieuw te meten):
//   - een subquery gejoind op ?c: ?c is bij container-loze policies ongebonden
//     en een left-join zonder gedeelde gebonden variabele wordt een
//     cross-product — elke Offer kreeg er spontaan een willekeurige
//     BRP-container bij (gevonden in de Puppeteer-check);
//   - dezelfde subquery GENEST in de container-OPTIONAL laat ARQ hem per
//     buitenrij herevalueren (minutenlang op 12,5k policies);
//   - een COUNT over zusterversies direct in de buitenquery creëert een
//     multiplicatieve fan-out met de assignee-tak (gemeten 11,5 s);
//   - de dubbele lidmaatschaps-join mét ?v-typecheck per rij kost 31 s.
export function policyListQuery() {
  return `${PREFIXES_SPARQL}
SELECT ?policy ?kind
       (SAMPLE(?t)   AS ?title)
       (SAMPLE(?a)   AS ?assignee) (SAMPLE(?al) AS ?assigneeLabel)
       (SAMPLE(?c)   AS ?container) (SAMPLE(?ct) AS ?containerTitle)
       (SAMPLE(?vc)  AS ?versionCount)
       (SAMPLE(?iss) AS ?issued)
       (SAMPLE(?vf)  AS ?validFrom) (SAMPLE(?vt) AS ?validTo)
       (SAMPLE(?vn)  AS ?valid)
       (SAMPLE(?rev) AS ?revisionOf)
       (SAMPLE(?ofX) AS ?offerRef)
       (SAMPLE(?rqX) AS ?requestRef)
       (SAMPLE(?ansX) AS ?answeredByRef)
WHERE {
  VALUES (?type ?kind) { (odrl:Set "set") (odrl:Offer "offer") (odrl:Agreement "agreement") (odrl:Request "request") }
  ?policy a ?type .
  FILTER(isIRI(?policy))
  OPTIONAL { ?policy dct:title ?t }
  OPTIONAL {
    { ?policy odrl:assignee ?a } UNION { ?policy odrl:permission/odrl:assignee ?a }
    OPTIONAL { ?a rdfs:label|skos:prefLabel ?al }
  }
  OPTIONAL {
    { SELECT ?policy (SAMPLE(?cX) AS ?c) (SAMPLE(?ctX) AS ?ct)
             (SAMPLE(?vcX) AS ?vc)
      WHERE {
        { SELECT ?cX (COUNT(DISTINCT ?v) AS ?vcX) WHERE {
            ${memberUnion('?cX', '?v')}
            FILTER(isIRI(?v))
            # Een versie is een GETYPEERDE policy óf een documentversie (stub):
            # een lid dat zelf geen odrl-type draagt maar wel versiegegevens.
            # Dezelfde toets als readTemporalContainers in parse.js. Zonder de
            # stub-tak telde /brp-ap elke overeenkomst als "1 versie" (de
            # vervangen besluitversies zijn daar kale prov:Entity's) en bleven
            # de pijlen op elke ingeklapte kaart uit. Meetpunt: 3,2 s → 3,8 s
            # op 13,9k policies — het typecheck-alternatief zonder subquery
            # kostte 31 s, dus deze vorm blijft staan.
            { VALUES ?vt { odrl:Set odrl:Offer odrl:Agreement odrl:Request } ?v a ?vt }
            UNION
            { ?v ${VERSION_DATING_ALT} ?vd }
          } GROUP BY ?cX }
        ${memberUnion('?cX', '?policy')}
        OPTIONAL { ?cX dct:title ?ctX }
      } GROUP BY ?policy }
  }
  # Datering van de versie: dct:issued (de datum die de versienavigator toont)
  # en de geldingsperiode. Zonder deze takken stond in lijstmodus overal een
  # "—" in de chip. Meer dateringsvormen kent het profiel niet.
  OPTIONAL { ?policy dct:issued ?iss }
${validityOptionals('?policy', '?vn', '?vf', '?vt')}
  OPTIONAL { ?policy prov:wasRevisionOf ?rev }
  # Agreement->Offer-koppeling (SAMPLE: één per policy), zodat de skelet-graaf
  # de terugverwijzings-lijst "overeenkomsten op dit aanbod" kan vullen. De
  # typecheck houdt grondslag-/bronverwijzingen (wetten, datasets) buiten.
  # Gemeten (12,5k policies): geen meetbare vertraging t.o.v. de basisquery.
  OPTIONAL { ?policy prov:wasDerivedFrom ?ofX . ?ofX a odrl:Offer }
  # Agreement->Request-koppeling, langs hetzelfde predicaat en met dezelfde
  # typecheck. Een EIGEN kolom (niet dezelfde ?ofX): een overeenkomst draagt
  # meestal BEIDE — het aanbod dat zij invult en het verzoek dat zij
  # beantwoordt — en één SAMPLE zou er willekeurig één van laten vallen.
  # Hiermee kan de verzoek-kaart de regel "beantwoord door <overeenkomst>"
  # tonen zonder dat het detail van die overeenkomst geladen is; zonder deze
  # tak leek op /brp-ap elk van de 1.151 verzoeken onbeantwoord.
  # Gemeten (25-8, Fuseki, 5 rondes, mediaan) mét/zonder de Request-soort én
  # deze kolom: /brp-ap 436/405 ms (3.733 t.o.v. 2.582 rijen), /brp 2.005/1.754
  # ms (13.706 t.o.v. 12.555 rijen). Fase 1 blijft 10 ms.
  OPTIONAL { ?policy prov:wasDerivedFrom ?rqX . ?rqX a odrl:Request }
  # Dezelfde relatie nog één keer, maar OMGEKEERD: welke overeenkomst wijst
  # naar DEZE policy? Op een verzoek-rij is dat de overeenkomst waarin erop
  # beslist is, en daar hangt de vaste regel op de verzoek-kaart aan.
  #
  # Waarom niet genoeg aan de kolom hierboven: die is een SAMPLE PER
  # OVEREENKOMST, en een overeenkomst komt vaak uit MEERDERE verzoeken voort
  # (890501-v13: drie). De niet-gekozen verzoeken zagen er dan onbeantwoord
  # uit — op /brp-ap bereikte de agreement-kant 880 van de 1.151 verzoeken,
  # deze kant alle 1.151. Andersom is de SAMPLE wél veilig: op een verzoek
  # volgt één beslissing.
  # Gemeten (25-8, Fuseki, 3 rondes, /brp-ap) mét/zonder: 0,47/0,56 s — binnen
  # de ruis; het antwoord groeit met 140 kB.
  OPTIONAL { ?ansX prov:wasDerivedFrom ?policy . ?ansX a odrl:Agreement }
}
GROUP BY ?policy ?kind
`;
}

// --- Gedecomponeerde index (compatibiliteitsmodus) ---------------------------
// policyListQuery() hierboven is getuned voor ARQ (Fuseki/Jena): de geneste
// sub-SELECTs met SAMPLE/GROUP BY zijn daar juist de SNELLE vorm, omdat ARQ de
// binnenste aggregatie één keer uitrekent en het resultaat als tabel hergebruikt.
// NIET ELKE ENGINE DOET DAT. Een streaming-evaluator (zoals sommige gehoste
// SPARQL-diensten gebruiken) herbekijkt een geneste aggregatie per buitenrij,
// en de query loopt in de servertimeout ("SPARQL HTTP 504 — Query has timed
// out") — ongeacht datavolume: ook op een subset van 86k statements, waar
// fase 1 in 139 ms klaar is.
//
// Daarom deze TWEEDE VORM van dezelfde index: zes PLATTE queries (geen enkele
// sub-SELECT), parallel opgehaald en client-side samengevoegd door
// mergeFlatIndex() tot exact dezelfde rijstructuur als policyListQuery levert —
// zodat listSkeletonTurtle en alles daarachter ongewijzigd blijft werken.
// Het rekenwerk dat de engine niet wil doen (het SAMPLE-per-policy, de join van
// telling op container op policy) is verplaatst naar de client, waar het
// lineair is.
//
// De prijs is bandbreedte, niet tijd: zonder GROUP BY fan-outen de rijen
// (op het volle /brp: 25,5k policyrijen, 26,5k lidmaatschapsrijen, 13,9k
// metarijen). SELECT-rijen zijn goedkoop; mergeFlatIndex is O(n) over alle
// binnengekomen rijen samen.
//
// Gemeten (23-8, toen nog vijf queries; de zesde — flatRequestRefQuery —
// is dezelfde vorm en orde van grootte als flatOfferRefQuery), som parallel:
//   gehoste streaming-engine (86k statements): 0,4 / 1,3 / 1,8 / 0,3 / 0,4 s
//     — tegenover een 504 na 10 s voor policyListQuery;
//   lokale Fuseki /brp (3,4M triples): 1,9 / 0,5 / 2,5 / 0,3 / 0,1 s.
//
// LET OP bij wijzigen: de winst zit in de AFWEZIGHEID van geneste SELECTs.
// Een "handige" sub-SELECT toevoegen maakt het pad weer onbruikbaar op Speedy;
// de unit-tests bewaken die vorm expliciet.

// Basisrijen: policysoort, titel, afnemer(-label). Als
// policyListFirstQuery(), maar zonder LIMIT en zonder GROUP BY/SAMPLE — het
// samennemen per policy doet mergeFlatIndex.
export function flatPolicyRowsQuery() {
  return `${PREFIXES_SPARQL}
SELECT ?policy ?kind ?title ?assignee ?assigneeLabel
WHERE {
  VALUES (?type ?kind) { (odrl:Set "set") (odrl:Offer "offer") (odrl:Agreement "agreement") (odrl:Request "request") }
  ?policy a ?type .
  FILTER(isIRI(?policy))
  OPTIONAL { ?policy dct:title ?title }
  OPTIONAL {
    { ?policy odrl:assignee ?assignee } UNION { ?policy odrl:permission/odrl:assignee ?assignee }
    OPTIONAL { ?assignee rdfs:label|skos:prefLabel ?assigneeLabel }
  }
}
`;
}

// Containerlidmaatschap van GETYPEERDE policies: welke versiecontainer hoort bij
// welke policy, plus de containertitel. De typecheck op ?policy is wezenlijk
// voor de omvang — zónder komen ook alle documentversie-stubs mee (gemeten:
// 11.105 i.p.v. 130 rijen op de kleine subset, 135.406 i.p.v. 26.490 op de
// grote store) terwijl
// mergeFlatIndex ze toch weggooit. De TELLING (flatVersionCountQuery) heeft die
// stubs wél nodig en haalt ze apart op.
export function flatMembershipQuery() {
  return `${PREFIXES_SPARQL}
SELECT ?container ?policy ?containerTitle
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ${memberUnion('?container', '?policy')}
  FILTER(isIRI(?container) && isIRI(?policy))
  OPTIONAL { ?container dct:title ?containerTitle }
}
`;
}

// Versietelling per container — één ENKELE, top-level GROUP BY. Dezelfde
// verbreding als de telling in policyListQuery: een versie is een getypeerde
// policy óf een documentversie (een lid zonder odrl-type maar met
// versiegegevens), want in /brp-ap zijn de vervangen besluitversies kale
// prov:Entity's en zou elke overeenkomst anders als "1 versie" tellen.
export function flatVersionCountQuery() {
  return `${PREFIXES_SPARQL}
SELECT ?container (COUNT(DISTINCT ?v) AS ?n)
WHERE {
  ${memberUnion('?container', '?v')}
  FILTER(isIRI(?container) && isIRI(?v))
  { VALUES ?vt { odrl:Set odrl:Offer odrl:Agreement odrl:Request } ?v a ?vt }
  UNION
  { ?v ${VERSION_DATING_ALT} ?vd }
}
GROUP BY ?container
`;
}

// Versiemetadata per policy: de datering die de versienavigator toont. Platte
// OPTIONALs op de getypeerde policies — geen aggregatie, geen subquery.
export function flatVersionMetaQuery() {
  return `${PREFIXES_SPARQL}
SELECT ?policy ?issued ?validFrom ?validTo ?valid ?revisionOf
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  FILTER(isIRI(?policy))
  OPTIONAL { ?policy dct:issued ?issued }
${validityOptionals('?policy', '?valid', '?validFrom', '?validTo')}
  OPTIONAL { ?policy prov:wasRevisionOf ?revisionOf }
}
`;
}

// Agreement->Offer-koppeling. De typecheck op ?offer houdt grondslag-/
// bronverwijzingen (wetten, datasets) buiten; die op ?policy houdt niet-policies
// buiten die toevallig naar een aanbod wijzen (gemeten op /brp: 2.160 i.p.v.
// 26.848 rijen).
export function flatOfferRefQuery() {
  return `${PREFIXES_SPARQL}
SELECT DISTINCT ?policy ?offer
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?offer .
  ?offer a odrl:Offer .
  FILTER(isIRI(?policy))
}
`;
}

// Agreement->Request-koppeling, de tegenhanger van flatOfferRefQuery. Eigen
// query en eigen kolom om dezelfde reden als in policyListQuery: een
// overeenkomst draagt meestal zowel een aanbod- als een verzoekverwijzing en
// die mogen elkaar niet verdringen. Plat, geen sub-SELECT — de vormregel van
// dit hele blok.
export function flatRequestRefQuery() {
  return `${PREFIXES_SPARQL}
SELECT DISTINCT ?policy ?request
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?request .
  ?request a odrl:Request .
  FILTER(isIRI(?policy))
}
`;
}

// Dezelfde relatie OMGEKEERD: welke overeenkomst wijst naar deze policy? Op
// een verzoek-rij is dat de overeenkomst waarin erop beslist is. Zie
// policyListQuery voor waarom dit een eigen richting moet zijn en niet uit de
// kolom hierboven af te leiden valt (een overeenkomst komt vaak uit meerdere
// verzoeken voort). Plat, geen sub-SELECT — de vormregel van dit blok.
export function flatAnsweredByQuery() {
  return `${PREFIXES_SPARQL}
SELECT DISTINCT ?policy ?agreement
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?agreement prov:wasDerivedFrom ?policy .
  ?agreement a odrl:Agreement .
  FILTER(isIRI(?policy))
}
`;
}

// De platte resultatensets samenvoegen tot bindings met EXACT de vorm die
// policyListQuery oplevert (?policy ?kind ?title ?assignee ?assigneeLabel
// ?container ?containerTitle ?versionCount ?issued ?validFrom ?validTo ?valid
// ?revisionOf ?offerRef), zodat listSkeletonTurtle er niets van merkt.
//
// SAMPLE-NABOOTSING: waar de engine SAMPLE() zou doen, wint hier de EERSTE
// waarde. SPARQL's SAMPLE is niet-deterministisch, dus dit is een geldige keuze
// én reproduceerbaar. Twee plaatsen doen het strenger dan de engine: het
// afnemerslabel wordt alleen overgenomen van dezelfde afnemer als de gekozene,
// en de containertitel alleen van dezelfde container — in policyListQuery zijn
// dat losse SAMPLEs die in theorie uit verschillende rijen kunnen komen.
//
// TAALVOORKEUR (B16): de queries filteren NIET op taal — ze halen elk
// rdfs:label/skos:prefLabel/dct:title op dat er is — dus komen meertalige
// registers hier met meerdere rijen per policy binnen. Voor titels en labels
// wint daarom niet de eerste maar de best passende taal (langRank); bij
// gelijke rang blijft "eerste wint" gelden. Let op het verschil met het
// getunede pad: policyListQuery laat de ENGINE een SAMPLE trekken en kan dus
// een willekeurige taal opleveren; zodra een kaart wordt uitgeklapt haalt het
// detail-CONSTRUCT álle talen op en corrigeert pickLabel dat alsnog.
//
// Groepering op (policy, kind), net als GROUP BY ?policy ?kind: een node die
// zowel Set als Offer is levert twee rijen, precies zoals nu.
// O(n) over de som van alle binnengekomen rijen (alleen Map-opbouw en één pas
// over de basisrijen).
export function mergeFlatIndex(rows, membership, counts, meta, offerRefs,
  { lang = null, requestRefs = [], answeredByRefs = [] } = {}) {
  const val = (b) => (b ? b.value : null);
  const L = lang || getLang();
  // Is `next` een beter passend label dan `cur`? Strikt kleiner, zodat bij
  // gelijke taalrang de EERSTE binding wint (reproduceerbaar).
  const better = (cur, next) => !cur
    || langRank(next['xml:lang'] || '', L) < langRank(cur['xml:lang'] || '', L);

  // 1. container (+titel) per policy — eerste container wint.
  const contByPolicy = new Map();
  for (const r of membership || []) {
    const p = val(r && r.policy);
    if (!p || !r.container) continue;
    let e = contByPolicy.get(p);
    if (!e) { e = { container: r.container, containerTitle: null }; contByPolicy.set(p, e); }
    if (r.containerTitle && r.container.value === e.container.value
      && better(e.containerTitle, r.containerTitle)) {
      e.containerTitle = r.containerTitle;
    }
  }

  // 2. versietelling per container.
  const countByContainer = new Map();
  for (const r of counts || []) {
    const c = val(r && r.container);
    if (!c || !r.n) continue;
    if (!countByContainer.has(c)) countByContainer.set(c, r.n);
  }

  // 3. datering per policy — per veld de eerste waarde.
  const META_FIELDS = ['issued', 'validFrom', 'validTo', 'valid', 'revisionOf'];
  const metaByPolicy = new Map();
  for (const r of meta || []) {
    const p = val(r && r.policy);
    if (!p) continue;
    let e = metaByPolicy.get(p);
    if (!e) { e = {}; metaByPolicy.set(p, e); }
    for (const f of META_FIELDS) if (!e[f] && r[f]) e[f] = r[f];
  }

  // 4. offerRef en requestRef per policy — eerste wint (de engine deed SAMPLE).
  // Twee aparte kolommen: een overeenkomst draagt ze allebei.
  const offerByPolicy = new Map();
  for (const r of offerRefs || []) {
    const p = val(r && r.policy);
    if (!p || !r.offer) continue;
    if (!offerByPolicy.has(p)) offerByPolicy.set(p, r.offer);
  }
  const reqByPolicy = new Map();
  for (const r of requestRefs || []) {
    const p = val(r && r.policy);
    if (!p || !r.request) continue;
    if (!reqByPolicy.has(p)) reqByPolicy.set(p, r.request);
  }
  // En de omgekeerde richting: de overeenkomst waarin op dit verzoek beslist is.
  const ansByPolicy = new Map();
  for (const r of answeredByRefs || []) {
    const p = val(r && r.policy);
    if (!p || !r.agreement) continue;
    if (!ansByPolicy.has(p)) ansByPolicy.set(p, r.agreement);
  }

  // 5. basisrijen samennemen per (policy, kind) en de rest erbij hangen.
  const out = [];
  const byKey = new Map();
  for (const r of rows || []) {
    if (!r || !r.policy) continue;
    const key = r.policy.value + '\\u0000' + (val(r.kind) || '');
    let row = byKey.get(key);
    if (!row) {
      row = { policy: r.policy };
      if (r.kind) row.kind = r.kind;
      byKey.set(key, row);
      out.push(row);
    }
    if (r.title && better(row.title, r.title)) row.title = r.title;
    if (!row.assignee && r.assignee) {
      row.assignee = r.assignee;
      if (r.assigneeLabel) row.assigneeLabel = r.assigneeLabel;
    } else if (row.assignee && r.assigneeLabel
      && r.assignee && r.assignee.value === row.assignee.value
      && better(row.assigneeLabel, r.assigneeLabel)) {
      row.assigneeLabel = r.assigneeLabel;
    }
  }
  for (const row of out) {
    const p = row.policy.value;
    const c = contByPolicy.get(p);
    if (c) {
      row.container = c.container;
      if (c.containerTitle) row.containerTitle = c.containerTitle;
      const n = countByContainer.get(c.container.value);
      if (n) row.versionCount = n;
    }
    const m = metaByPolicy.get(p);
    if (m) for (const f of META_FIELDS) if (m[f]) row[f] = m[f];
    const o = offerByPolicy.get(p);
    if (o) row.offerRef = o;
    const rq = reqByPolicy.get(p);
    if (rq) row.requestRef = rq;
    const ans = ansByPolicy.get(p);
    if (ans) row.answeredByRef = ans;
  }
  return out;
}

// Herkent de fout waarop de compatibiliteitsmodus moet aanslaan: een timeout of
// een serverfout (5xx) van het endpoint. Een 4xx (syntaxfout, geen toegang) of
// een netwerk-/CORS-fout is géén reden om het platte pad te proberen — dat zou
// daar op precies dezelfde manier stuklopen.
export function isEndpointTimeout(err) {
  const msg = String((err && err.message) || err || '');
  return /SPARQL HTTP 5\d\d/.test(msg) || /\btimed out\b|\btimeout\b/i.test(msg);
}

// De zes platte queries PARALLEL ophalen en mergen. Levert dezelfde bindings
// als `sparqlSelect(ep, policyListQuery())` — de aanroepplek merkt het verschil
// alleen aan de snelheid en aan het aantal HTTP-rondjes.
export async function decomposedIndexRows(endpoint, fetchImpl, { lang = null } = {}) {
  const [rows, membership, counts, meta, offerRefs, requestRefs, answeredByRefs] = await Promise.all([
    sparqlSelect(endpoint, flatPolicyRowsQuery(), fetchImpl),
    sparqlSelect(endpoint, flatMembershipQuery(), fetchImpl),
    sparqlSelect(endpoint, flatVersionCountQuery(), fetchImpl),
    sparqlSelect(endpoint, flatVersionMetaQuery(), fetchImpl),
    sparqlSelect(endpoint, flatOfferRefQuery(), fetchImpl),
    sparqlSelect(endpoint, flatRequestRefQuery(), fetchImpl),
    sparqlSelect(endpoint, flatAnsweredByQuery(), fetchImpl),
  ]);
  return mergeFlatIndex(rows, membership, counts, meta, offerRefs,
    { lang, requestRefs, answeredByRefs });
}

// --- Fase 1 van de tweefasige lijstlading ------------------------------------
// policyListQuery() hierboven is de VOLLEDIGE index: versietelling over de hele
// store, afnemerlabels, containerinfo, offerRef. Op /brp kost dat 4–5,5 s op
// 13.947 rijen — al die tijd staat de pagina op skeletons. Dit is de goedkope
// EERSTE SLAG: per policysoort de eerste n titels met hun afnemer, verder
// niets. Geen versietelling, geen containerjoin, geen offerRef — precies de
// velden die een leesbare kaart nodig heeft.
//
// Vorm: één UNION-tak per soort, elk met een EIGEN sub-SELECT + LIMIT. Dat is
// wezenlijk: één gedeelde LIMIT over de union zou op /brp volledig door de
// overeenkomsten opgesnoept worden (13,3k van de 13,9k rijen) en Aanbod en
// Beleidssets leeg laten. Nu levert elke soort zijn eigen kop van de lijst —
// sinds aug 2026 VIER soorten, want odrl:Request heeft een eigen sectie en
// dus ook een eigen LIMIT-tak (zonder die tak was de Verzoeken-sectie in het
// eerste beeld leeg gebleven tot de volledige index binnen was).
// De buitenste GROUP BY/SAMPLE draait over hooguit 4 × limitPerKind policies
// (de fan-out van titel × afnemer) en is dus verwaarloosbaar; hij houdt de
// belofte "één rij per policy" van policyListQuery overeind, zodat
// listSkeletonTurtle ongewijzigd bruikbaar blijft.
// Gemeten op /brp (3,3M triples, limitPerKind 60): 22–120 ms, tegenover
// 4,4 s voor de volledige index.
export const FIRST_LIST_LIMIT = 60;

export function policyListFirstQuery({ limitPerKind = FIRST_LIST_LIMIT } = {}) {
  const lim = Math.max(1, limitPerKind | 0);
  const branch = (cls, kind) => `  {
    { SELECT ?policy WHERE { ?policy a ${cls} . FILTER(isIRI(?policy)) } LIMIT ${lim} }
    BIND("${kind}" AS ?kind)
  }`;
  return `${PREFIXES_SPARQL}
SELECT ?policy ?kind
       (SAMPLE(?t)  AS ?title)
       (SAMPLE(?a)  AS ?assignee) (SAMPLE(?al) AS ?assigneeLabel)
WHERE {
${branch('odrl:Set', 'set')} UNION
${branch('odrl:Offer', 'offer')} UNION
${branch('odrl:Agreement', 'agreement')} UNION
${branch('odrl:Request', 'request')}
  OPTIONAL { ?policy dct:title ?t }
  OPTIONAL {
    { ?policy odrl:assignee ?a } UNION { ?policy odrl:permission/odrl:assignee ?a }
    OPTIONAL { ?a rdfs:label|skos:prefLabel ?al }
  }
}
GROUP BY ?policy ?kind
`;
}

// Versiecontainers waarvan de IDENTITEIT zegt welke policysoort zij was
// (`dct:type odrl:Agreement|Offer|Set`), met hun versies. Bedoeld voor
// besluiten waarvan geen enkele versie nog als odrl-policy in de graaf staat —
// beëindigde besluiten, waarvan het register alleen documentversies bewaart.
// Die vallen buiten policyListQuery (die selecteert op rdf:type Set/Offer/
// Agreement) en zouden dus onzichtbaar blijven in lijstmodus. De regels van
// zo'n versie staan in de bron-datalaag en komen pas mee met het detail-
// CONSTRUCT bij het uitklappen; hier volstaan titel + geldigheidsperiode.
// Goedkoop: alleen containers mét zo'n expliciete soort-hint doen mee.
export function containerListQuery() {
  return `${PREFIXES_SPARQL}
SELECT ?container ?kind ?version
       (SAMPLE(?ct)  AS ?containerTitle)
       (SAMPLE(?t)   AS ?title)
       (SAMPLE(?vf)  AS ?validFrom) (SAMPLE(?vt) AS ?validTo)
       (SAMPLE(?vn)  AS ?valid)
       (SAMPLE(?iss) AS ?issued)
WHERE {
  VALUES (?typeHint ?kind) { (odrl:Set "set") (odrl:Offer "offer") (odrl:Agreement "agreement") (odrl:Request "request") }
  ?container dct:type ?typeHint .
  ${memberUnion('?container', '?version')}
  FILTER(isIRI(?container) && isIRI(?version))
  OPTIONAL { ?container dct:title ?ct }
  OPTIONAL { ?version dct:title ?t }
${validityOptionals('?version', '?vn', '?vf', '?vt')}
  OPTIONAL { ?version dct:issued ?iss }
}
GROUP BY ?container ?kind ?version
`;
}

// De weergave-sluiting van één node: geneste blank nodes en aangehaalde
// benoemde bouwstenen. Het pad volgt de regel-/constraintstructuur (incl.
// rdf-lijsten van logische constraints) én odrl:action/odrl:target: in de
// brp-ap-data zit de inhoud juist dáár (action als blanke knoop met
// rdf:value + purpose-refinement; target als benoemde odrl:AssetCollection
// met titel/beschrijving/leden). Het LIDMAATSCHAP van een collectie wordt
// bewust NIET in dit pad gevolgd — niet dct:hasPart en ook niet de
// ODRL-kernrichting ^odrl:partOf: dit pad haalt van elke bereikte knoop ÁLLE
// triples op, en een gegevensset met duizenden rubrieken zou dan de halve
// graaf binnentrekken (en in het /odrl-register hangt de REGISTERWORTEL zijn
// 2.622 besluit-identiteiten met dct:hasPart op — die zou er dan in één klap
// bij komen). De leden krijgen precies wat de ledenlijst nodig
// heeft — label, rdf:type en de lidmaatschapstriple zelf — via de gerichte
// hops 4b/4d/4c hieronder. Gemeten op /brp-ap (overeenkomst 510228-v13, een
// gegevensset met 3.264 leden): ^odrl:partOf IN deze ster-groep kost 1,1 s en
// 2,7 MB, de gerichte tak 4d 0,34 s en 2,1 MB.
// "Draagt deze knoop een DOMEIN-type?" — een rdf:type buiten de ODRL-kern.
// Dezelfde maatstaf die memberDesc/groupMembersByAncestry in parse.js
// hanteren: odrl:AssetCollection zegt alleen DÁT iets een verzameling is,
// brp:Groep zegt WÁT het is.
//
// Als TRIPLE-patroon geschreven, niet als FILTER EXISTS: dat scheelt op
// /brp-ap de helft (0,19 s tegen 0,31 s op de niveau-query van 890501-v13).
// Een knoop met twee domeintypen bindt dan twee keer, maar dat is onschadelijk
// — CONSTRUCT ontdubbelt, en waar het patroon in een sub-SELECT staat vangt de
// DISTINCT het al af. De hulpvariabele krijgt per gebruik een eigen naam
// (?dt<tag>): dezelfde naam in twee takken is geldig maar leest als een
// verband dat er niet is.
const ODRL_NS = 'http://www.w3.org/ns/odrl/2/';
const DOMAIN_TYPED = (nodeVar, tag) => `${nodeVar} rdf:type ?dt${tag} .
      FILTER(!STRSTARTS(STR(?dt${tag}), "${ODRL_NS}"))`;

const CLOSURE_PATH = '(odrl:permission|odrl:prohibition|odrl:obligation|odrl:duty'
  + '|odrl:remedy|odrl:consequence|odrl:constraint|odrl:refinement'
  + '|odrl:action|odrl:target'
  // rightOperand erbij: een rdf:List als rechteroperand (odrl:isAnyOf met
  // waardenlijst) is anders onbereikbaar — rdf:first/rest staan wel in het
  // pad, maar de instap naar de lijstkop ontbrak, waardoor de chip
  // "(anoniem)" toonde terwijl ttl-modus de waarden wél expandeerde.
  + '|odrl:rightOperand'
  // dct:valid erbij als TERUGVAL: de eigen geldingsvorm is sinds aug 2026 het
  // schema-paar (twee platte literals op de policy zelf, die met `?s ?p ?o`
  // vanzelf meekomen), maar een niet-gemigreerde graaf kan de periode nog als
  // dct:PeriodOfTime-KNOOP dragen. Zonder deze hop komt daar wel de
  // dct:valid-triple mee maar niet de knoop erachter, en staat de kaart zonder
  // begin- en einddatum. Goedkoop: een periodeknoop draagt drie triples en
  // heeft geen uitgaande paden — op schema-data bindt de tak nergens aan.
  + '|dct:valid'
  + '|odrl:and|odrl:or|odrl:xone|odrl:andSequence|rdf:first|rdf:rest)*';

// Metadata die de versie-kiezer per zusterversie nodig heeft; hun volledige
// regels laadt de viewer pas wanneer zo'n versie zelf geopend wordt.
// De geldingsdatums en prov:wasDerivedFrom horen er ook bij: van een VERVANGEN
// besluitversie neemt /brp-ap alleen de temporele documentdata op (geen
// regels), en dan zijn juist de geldigheidsperiode en de verwijzing naar het
// bron-besluit het enige wat die versie te vertellen heeft. schema:validFrom/
// validThrough is de eigen vorm; dct:valid blijft als tolerante terugval in de
// lijst staan (kost niets extra's: het is één IN-filter).
const VERSION_META_PREDS = 'rdf:type, dct:title, dct:issued, '
  + 'schema:validFrom, schema:validThrough, dct:valid, odrl:uid, '
  + 'prov:wasRevisionOf, prov:specializationOf, prov:wasDerivedFrom';

// CONSTRUCT van de volledige weergave-sluiting van één policy:
//   1. de policy + geneste blank nodes + benoemde constraints/duties;
//   2. zijn temporele container (alle eigen niet-blanke triples, incl. de
//      lidmaatschappen naar álle versies — ook de historische);
//   3. zusterversie-metadata (titel, dct:issued/valid, wasRevisionOf, ...)
//      zodat de versie-kiezer volledig gevuld is, incl. vervallen versies;
//   4. rdfs:label/skos:prefLabel/dct:title van alle geraakte IRI's één hop
//      uit (objecten én predicaten — rubrieklabels, afnemerslabels,
//      domeinpredicaten als brp:medium);
//   5. de VINDPLAATS: het ankerobject van prov:hadPrimarySource op een regel
//      (een plek IN een brondocument, bv. <pdf#page=1>) met zijn eigen
//      triples, plus één hop naar het brondocument zelf.
export function policyDetailQuery(iri, { excludeGraphs = DEFAULT_EXCLUDE_GRAPHS } = {}) {
  const P = iriRef(iri);
  // Zonder uitsluitingen géén GRAPH-wrapper: dan werkt de query ook op een
  // endpoint waar alle data in de echte default graph staat.
  // MET uitsluitingen loopt het sluitingspad over de union default graph
  // (zodat het over graph-grenzen heen kan: agreement → target-gegevensset
  // in een eigen named graph) en wordt alleen het OPHALEN van de triples
  // graph-gescopet — de compact/actueel-deduplicatie blijft werken doordat
  // de blanke knopen van een uitgesloten graph daar hun triples hebben.
  const closure = (sVar, pVar, oVar, gVar) => (excludeGraphs && excludeGraphs.length
    ? `${P} ${CLOSURE_PATH} ${sVar} .
    GRAPH ${gVar} { ${sVar} ${pVar} ${oVar} . }
    ${graphFilter(gVar, excludeGraphs)}`
    : `${P} ${CLOSURE_PATH} ${sVar} . ${sVar} ${pVar} ${oVar} .`);
  // Variant voor de takken 4c/5: het sluitingspad loopt in ÉÉN propertypad
  // door naar de knoop waarvan we de triples willen (de klasse van een
  // collectielid, het vindplaats-anker, het brondocument), en pas het
  // OPHALEN daarvan wordt graph-gescopet. Die vorm is geen stijlkwestie
  // maar een meetresultaat: dezelfde patronen als losse triples verleiden
  // ARQ tot een plan dat honderden keren duurder is (zie 4c hieronder).
  const hopPath = (suffix, cVar, gVar) => (excludeGraphs && excludeGraphs.length
    ? `${P} ${CLOSURE_PATH}${suffix} ${cVar} .
    GRAPH ${gVar} { ${cVar} ?lp ?ll . }
    ${graphFilter(gVar, excludeGraphs)}`
    : `${P} ${CLOSURE_PATH}${suffix} ${cVar} . ${cVar} ?lp ?ll .`);
  // Lidmaatschapspad van een collectie, in BEIDE richtingen: `collectie
  // dct:hasPart lid` (onze oude conventie) en `lid odrl:partOf collectie`
  // (de ODRL-kern, dus een INVERSE hop). Als één propertypad-alternatief
  // geschreven — zie de vormwaarschuwing bij hopPath.
  const MEMBER_HOP = '(dct:hasPart|^odrl:partOf)';
  // De REGELPOSITIE-predicaten (PROFILE_PATTERNS.rulePreds in parse.js): de hop
  // van een policy of regel naar een regel. Gebruikt door de dekking-tak 8a/8b.
  const RULE_HOP = '(odrl:permission|odrl:prohibition|odrl:obligation|odrl:duty)';
  // De VOORWAARDEPOSITIE (PROFILE_PATTERNS.constraintPreds in parse.js): de
  // laatste hop naar een voorwaardeknoop, waar dan ook in de sluiting — op de
  // regel, op de actie (refinement) of op een collectie. Gebruikt door tak
  // 8c/8d, de dekking op VOORWAARDE-niveau. Dat de hop op odrl:constraint/
  // odrl:refinement EINDIGT is wat hem goedkoop houdt: alleen knopen in
  // voorwaardepositie krijgen de inverse ^prov:wasDerivedFrom achter zich.
  const COND_HOP = '(odrl:constraint|odrl:refinement)';
  const memberPath = (cVar, gVar) => hopPath('/' + MEMBER_HOP, cVar, gVar);
  const classPath = (cVar, gVar) => hopPath('/' + MEMBER_HOP + '/rdf:type', cVar, gVar);
  // VERZOEK-tak (6a/6b): het odrl:Request achter deze policy, langs dezelfde
  // relatie als de Offer-koppeling — prov:wasDerivedFrom, het enige predicaat
  // dat het profiel voor policy-herkomst kent. De rdf:type-check op ?req is wat
  // de drie soorten wasDerivedFrom-doelwitten (aanbod, verzoek, bron-document)
  // uit elkaar houdt en houdt de tak tegelijk goedkoop: zonder verzoeken in de
  // store bindt ?req nergens aan en kost hij niets. Zelfde vormregel als
  // hopPath: het pad ná ?req staat in ÉÉN propertypad, alleen het OPHALEN van
  // de triples is graph-gescopet.
  const REQ_HOP = 'prov:wasDerivedFrom';
  const requestPath = (suffix, gVar) => (excludeGraphs && excludeGraphs.length
    ? `${P} ${REQ_HOP} ?req . ?req a odrl:Request .
    ?req ${suffix} ?x .
    GRAPH ${gVar} { ?x ?lp ?ll . }
    ${graphFilter(gVar, excludeGraphs)}`
    : `${P} ${REQ_HOP} ?req . ?req a odrl:Request . ?req ${suffix} ?x . ?x ?lp ?ll .`);
  // Het verzoek zélf óf één van zijn regelknopen (waar odrl:assignee in een
  // mini-verzoek op staat): de `?`-quantifier dekt beide in één pad.
  const REQ_RULE = '(odrl:permission|odrl:prohibition|odrl:obligation)?';
  // OVERERVINGS-tak (7a/7b): odrl:inheritFrom (ODRL 2.2 Policy Inheritance).
  // De kaart van dit beleid vouwt de geërfde regels samen tot één rij per
  // ouder; zonder deze tak zou die rij in endpoint-modus altijd "ouder niet
  // geladen" zeggen, ook als de ouder gewoon in de store staat.
  //
  // DIEPTE — bewuste keuze: ÉÉN hop. De directe ouder(s) komen mét hun regels
  // mee; erft die ouder zélf ook (een keten), dan blijft de grootouder-rij
  // eerst "niet geladen" en komt hij lui binnen zodra de gebruiker de
  // ouderkaart opent — dat is precies dezelfde ensureDetail-route, die op de
  // ouder-IRI weer policyDetailQuery draait en dus de volgende hop ophaalt.
  // Alle hops vooraf ophalen zou de sluiting bij een lange keten
  // onvoorspelbaar laten uitdijen voor iets wat de lezer meestal niet opent.
  // Vormregel als bij hopPath/requestPath: het pad naar de sluitingsknoop staat
  // in ÉÉN propertypad (inheritFrom gevolgd door CLOSURE_PATH), alleen het
  // OPHALEN van de triples is graph-gescopet — losse triples verleiden ARQ tot
  // een veel duurder plan. Verder identiek aan closure() hierboven.
  const INHERIT_HOP = 'odrl:inheritFrom';
  const inheritClosure = (sVar, pVar, oVar, gVar) => (excludeGraphs && excludeGraphs.length
    ? `${P} ${INHERIT_HOP}/${CLOSURE_PATH} ${sVar} .
    GRAPH ${gVar} { ${sVar} ${pVar} ${oVar} . }
    ${graphFilter(gVar, excludeGraphs)}`
    : `${P} ${INHERIT_HOP}/${CLOSURE_PATH} ${sVar} . ${sVar} ${pVar} ${oVar} .`);
  return `${PREFIXES_SPARQL}
CONSTRUCT {
  ?s ?p ?o .
  ?c ?cp ?co .
  ?v ?vp ?vo .
  ?x ?lp ?ll .
}
WHERE {
  {
    # 1. sluiting van de policy zelf
    ${closure('?s', '?p', '?o', '?g1')}
  } UNION {
    # 2. temporele container (met lidmaatschap naar alle versies)
    ${memberUnion('?c', P)}
    ?c ?cp ?co .
    # Blanke objecten blijven buiten beeld — een container is een platte knoop —
    # MET één uitzondering: een niet-gemigreerde graaf kan zijn geldingsperiode
    # nog als blanke dct:PeriodOfTime-knoop dragen, en die draagt dan de
    # datering van het CG-documentpatroon. De eigen vorm (schema:validFrom/
    # validThrough) bestaat uit platte literals en komt hier gewoon mee.
    FILTER(!isBlank(?co) || ?cp = dct:valid)
  } UNION {
    # 3. zusterversies: metadata voor de versie-kiezer (incl. vervallen)
    ${memberUnion('?c2', P)}
    ${memberUnion('?c2', '?v')}
    ?v ?vp ?vo .
    FILTER(?vp IN (${VERSION_META_PREDS}))
  } UNION {
    # 3b. TERUGVAL: geldingsperiode-KNOPEN van de container en van de
    # zusterversies. Op schema-data doet deze tak NIETS — daar zijn de datums
    # platte literals op de versie zelf en komen ze al mee met tak 2 (?c ?cp ?co)
    # en tak 3 (VERSION_META_PREDS). Hij blijft staan voor niet-gemigreerde
    # grafen en derden-data, waar het object van dct:valid een blanke
    # dct:PeriodOfTime-knoop is: tak 2 en 3 halen dan wel de dct:valid-TRIPLE op
    # maar niet dcat:startDate/endDate erachter, en stond de versie-kiezer
    # zonder data. De policy's eigen periode zit al in tak 1 (dct:valid staat in
    # CLOSURE_PATH). Goedkoop: hooguit één knoop van drie triples per versie, en
    # op schema-data bindt ?cp1/?vp1 dct:valid nergens aan.
    {
      ${memberUnion('?cp1', P)}
      ?cp1 dct:valid ?x .
    } UNION {
      ${memberUnion('?cp2', P)}
      ${memberUnion('?cp2', '?vp1')}
      ?vp1 dct:valid ?x .
    }
    ?x ?lp ?ll .
  } UNION {
    # 4a. labels van geraakte predicaten
    ${closure('?sa', '?x', '?oa', '?g4a')}
    ?x ?lp ?ll .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title))
  } UNION {
    # 4b. labels van geraakte IRI-objecten (plus rdf:type, zodat de modelcode
    # bv. wasDerivedFrom-doelen als odrl:Offer herkent en het "Vult aanbod
    # in"-veld ook in sparql-modus vult)
    ${closure('?sb', '?pb', '?x', '?g4b')}
    FILTER(isIRI(?x))
    ?x ?lp ?ll .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))
  } UNION {
    # 4c. labels van de KLASSEN van die IRI-objecten. De ledenlijst van een
    # gegevensset groepeert op rdf:type van het lid en toont het klasse-label
    # als groepskop (audit-punt C1). Branch 4b haalt dat rdf:type wél op maar
    # het LABEL van de klasse zelf staat één hop verder; zonder deze tak viel
    # het kopje in endpoint-modus terug op de localName ("Rubriek"), die
    # toevallig Nederlands oogt maar geen label is — en dus ook niet met de
    # taal mee kon wisselen (B16). Bewust als ÉÉN propertypad geschreven en
    # gebonden aan het lidmaatschapspad (MEMBER_HOP, hetzelfde pad dat
    # collectionMembers in parse.js leest). Dat is geen stijlkwestie: gemeten
    # op /brp kost deze vorm 9 ms, terwijl dezelfde patronen als losse triples
    # (?coll dct:hasPart ?xc . ?xc a ?x . ?x ?lp ?ll) ARQ tot een plan
    # verleiden dat 1,0-1,3 s kost.
    ${classPath('?x', '?g4c')}
    FILTER(?lp IN (rdfs:label, skos:prefLabel))
  } UNION {
    # 4d. LEDEN via de ODRL-kernrichting. Hangt het lidmaatschap aan de
    # COLLECTIE (dct:hasPart), dan is elk lid een object binnen de sluiting en
    # levert 4b zijn label en rdf:type. Hangt het aan het LID (lid odrl:partOf
    # collectie, de kernvorm sinds de migratie), dan is het lid nergens object
    # en zou de ledenlijst in endpoint-modus leeg blijven. Deze tak loopt het
    # lidmaatschapspad daarom expliciet af — de inverse hop staat IN het
    # propertypad, om dezelfde reden als bij 4c — en haalt precies op wat de
    # ledenlijst nodig heeft: het label, het groepeertype, en de
    # lidmaatschapstriple zelf (anders kent de modelcode het verband niet).
    # Meting op /brp-ap, 510228-v13 (3.264 leden): met deze tak duurt de hele
    # detailquery 0,34 s; met de hop in de ster-groep (CLOSURE_PATH) 1,1 s.
    ${memberPath('?x', '?g4d')}
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type, odrl:partOf))
  } UNION {
    # 5a. VINDPLAATS: het ankerobject van prov:hadPrimarySource op een regel.
    # Anders dan dpv:hasLegalBasis (de wettelijke grondslag) wijst dit naar de PLEK
    # in het brondocument waar de regel vandaan komt — in de brp-ap-data
    # <pdf-url#page=n>, een eigen entiteit met rdfs:label ("… , p. 1"),
    # dct:isPartOf naar het besluitdocument en een paginanummer. Branch 4b
    # levert alleen label+type van dat anker; hier komen zijn ÓVERIGE eigen
    # triples mee, zodat de weergave de vindplaats compleet kent. Bewust
    # ongefilterd op predicaat: welke term een dataset voor "pagina" gebruikt
    # is datasetkennis en hoort niet in deze generieke laag. Blanke objecten
    # blijven buiten beeld (zoals in tak 2) — een anker is een platte knoop.
    ${hopPath('/prov:hadPrimarySource', '?x', '?g5a')}
    FILTER(!isBlank(?ll))
  } UNION {
    # 5b. het BRONDOCUMENT één hop achter de vindplaats (dct:isPartOf voor een
    # pagina-anker, dct:isFormatOf wanneer het anker het bestand zelf is):
    # zijn kenmerk en titel, zodat de weergave de vindplaats kan benoemen
    # zonder een tweede query. Beperkt tot identificerende velden — de rest
    # van een documentbeschrijving hoort bij het document, niet bij de regel.
    ${hopPath('/prov:hadPrimarySource/(dct:isPartOf|dct:isFormatOf)', '?x', '?g5b')}
    FILTER(?lp IN (dct:identifier, skos:notation, dct:title, rdfs:label))
  } UNION {
    # 6a. VERZOEK: de aanvraag (odrl:Request) waaruit deze overeenkomst
    # voortkwam, als MINI-STUB in de data — kenmerk, datum en één minimale
    # permission met de indiener. Branch 4b levert van dat verzoek alleen
    # label + rdf:type (het is een object van de policy); deze tak haalt de
    # velden op die de Verzoek-regel toont, plus de regelknoop waar de
    # indiener aan hangt. Bewust GEFILTERD op predicaat: een verzoek dat
    # toevallig een volledige policy is (de zelfstandige verzoeken in het
    # wilde corpus) mag deze detailquery niet laten uitdijen — die heeft zijn
    # eigen kaart en dus zijn eigen detail-CONSTRUCT.
    # Gemeten (24-8, Fuseki, 5 rondes, mediaan) mét/zonder deze twee takken,
    # op /brp-ap MET 1.151 verzoeken in de store: 008001-v6 (1,6 MB antwoord)
    # 153/182 ms, /odrl 250001-v33 147/159 ms — binnen de ruis; het antwoord
    # groeit met ~500 B (de triples van het ene verzoek).
    ${requestPath(REQ_RULE, '?g6a')}
    FILTER(?lp IN (rdf:type, dct:identifier, skos:notation, dct:issued,
                   dct:title, rdfs:label, odrl:uid, odrl:assignee,
                   prov:wasDerivedFrom,
                   odrl:permission, odrl:prohibition, odrl:obligation))
  } UNION {
    # 6b. de INDIENER van dat verzoek: het label van de odrl:assignee. Die kan
    # een bestaande afnemer-IRI zijn (label staat elders in de graaf) of een
    # eigen partij-knoop met alleen een rdfs:label; beide komen hier binnen.
    ${requestPath(REQ_RULE + '/odrl:assignee', '?g6b')}
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title))
  } UNION {
    # 6c. het AANBOD dat dat verzoek aanvraagt (note §4, Request→Offer). De
    # link zelf komt met tak 6a mee (prov:wasDerivedFrom staat sinds aug 2026
    # in dat predicaatfilter); wat er nog ontbrak is de andere KANT: zonder
    # rdf:type op het doelwit weet de modelcode niet dat het een odrl:Offer is
    # — en dan is de aanvraag-zin "vraagt … aan" geen aanvraag meer maar
    # gewone herkomst, precies het verschil dat de betekenistabel maakt. De
    # titel hoort erbij omdat de zin de aanbodNAAM toont; zonder haar stond er
    # een kale localName. Dit was zichtbaar op /breda: in ttl-modus stond de
    # zin er, in sparql-modus niet.
    #
    # Vormregel als 6a/6b: het pad ná ?req in ÉÉN propertypad, alleen het
    # OPHALEN graph-gescopet. Bewust gefilterd op de identificerende velden —
    # het aanbod heeft zijn eigen kaart en dus zijn eigen detailquery.
    # Gemeten (25-8, Fuseki, 5 rondes, mediaan) mét/zonder tak 6c én het
    # verruimde 6a-filter: /brp-ap 008001-v6 198/193 ms (1.950 KB, gelijk),
    # /brp 250001-v33 844/865 ms (9.448 KB, gelijk) — binnen de ruis.
    ${requestPath('prov:wasDerivedFrom', '?g6c')}
    FILTER(?lp IN (rdf:type, dct:title, rdfs:label, skos:prefLabel))
  } UNION {
    # 7a. OUDERBELEID (odrl:inheritFrom, één hop) MET zijn regels: dezelfde
    # sluiting als tak 1, maar vanaf de ouder. Ongefilterd op predicaat — de
    # vouwrij toont de ouderregels als volwaardige regel-rijen, dus die hebben
    # dezelfde velden nodig als de eigen regels (titel, actie, doel, targets,
    # voorwaarden). Zonder inheritFrom in de graaf bindt ?x nergens aan en kost
    # de tak niets.
    ${inheritClosure('?x', '?lp', '?ll', '?g7a')}
  } UNION {
    # 7b. labels + rdf:type van de IRI's die in die ouder-sluiting geraakt
    # worden: zonder deze tak leest de ouderrij zijn regels wel, maar staan de
    # actie, het doel en de doelobjecten er als kale localName bij (en zou het
    # ouderlabel in de vouwrij zelf ook ontbreken). Zelfde vorm en zelfde
    # predicaatfilter als tak 4b, één inheritFrom-hop verderop.
    ${inheritClosure('?sc', '?pc', '?x', '?g7b')}
    FILTER(isIRI(?x))
    ?x ?lp ?ll .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))
  } UNION {
    # 8a. DEKKING: knopen die met prov:wasDerivedFrom naar een REGEL van deze
    # policy wijzen — de machine-uitvoerbare laag (een Rego-module, een
    # beleidsbundel) die zegt dat zij die regel afdekt. Alle andere takken
    # lopen de graaf UITgaand af; dekking is de enige INkomende richting die
    # de kaart nodig heeft, en zonder haar bleef de dekking-chip in
    # ?sparql=-modus leeg terwijl dezelfde bron in ttl-modus vijf keer "gedekt
    # door" toonde (gevonden op /breda).
    #
    # De hop naar de regel loopt via de REGELPOSITIE
    # (odrl:permission/prohibition/obligation/duty) en niet via "iets met een
    # odrl:uid". Dat is geen detail: de policy zélf draagt ook een odrl:uid, en
    # met die ruimere vorm zou ^prov:wasDerivedFrom vanaf de policy álle
    # overeenkomsten binnentrekken die haar aanbod invullen (op /brp-ap 729 op
    # één kaart). Naar een REGEL wijst niets anders dan een dekker.
    # Vormregel als bij 4c/4d: het hele pad in ÉÉN propertypad.
    ${hopPath('/' + RULE_HOP + '/^prov:wasDerivedFrom', '?x', '?g8a')}
    FILTER(?lp IN (rdf:type, rdfs:label, skos:prefLabel, dct:title,
                   dct:description, prov:wasDerivedFrom))
  } UNION {
    # 8b. het label van de KLASSE van die dekker ("Rego-module", "bundel") —
    # de chip noemt het soort naast de naam, en zonder deze hop stond daar een
    # kale localName. Zelfde verhouding als 4b tot 4c.
    ${hopPath('/' + RULE_HOP + '/^prov:wasDerivedFrom/rdf:type', '?x', '?g8b')}
    FILTER(?lp IN (rdfs:label, skos:prefLabel))
  } UNION {
    # 8c. DEKKING OP VOORWAARDE-NIVEAU: knopen die met prov:wasDerivedFrom naar
    # een VOORWAARDE van deze policy wijzen. Sinds aug 2026 is dat het
    # zwaartepunt van de dekking — een bundel werkt vooral beslispunten uit
    # ("alleen voor dit doel", "hoogstens 30 dagen"); dat de regel als geheel
    # wordt uitgevoerd is maar de helft van het verhaal. Zonder deze tak stond
    # het raderwiel bij elke voorwaarde in ttl-modus wél en in ?sparql=-modus
    # niet, bij precies dezelfde bron.
    #
    # Zelfde vorm en zelfde afweging als 8a: de hop eindigt op de
    # VOORWAARDEPOSITIE, niet op "iets met een label" — alleen wat in
    # odrl:constraint-/odrl:refinement-positie hangt kan een dekkingsdoel zijn,
    # en naar zo'n knoop wijst niets anders dan een dekker. Het pad loopt over
    # de hele sluiting, dus regel-, action- en collectie-refinements komen alle
    # drie mee.
    ${hopPath('/' + COND_HOP + '/^prov:wasDerivedFrom', '?x', '?g8c')}
    FILTER(?lp IN (rdf:type, rdfs:label, skos:prefLabel, dct:title,
                   dct:description, prov:wasDerivedFrom))
  } UNION {
    # 8d. het label van de KLASSE van die dekker — zelfde verhouding als 8b
    # tot 8a: zonder deze hop staat er een kale localName in de chip.
    ${hopPath('/' + COND_HOP + '/^prov:wasDerivedFrom/rdf:type', '?x', '?g8d')}
    FILTER(?lp IN (rdfs:label, skos:prefLabel))
  }
}
`;
}

// --- Eén niveau van de partOf-boom (ledenlijst-fold-out, ?sparql=-modus) -----
// De ledenlijst is sinds aug 2026 een doorlopende BOOM over de odrl:partOf-
// keten (zie memberTreeLevel in parse.js). Elk uitklappen kost precies ÉÉN
// CONSTRUCT — deze — en dat is een bewuste keuze boven "de hele keten vooraf":
// policyDetailQuery haalt met tak 4d alleen de DIRECTE leden op, en een
// gegevensset met 3.264 leden zou met twee of drie niveaus vooruit de halve
// graaf binnentrekken voor een boom die de lezer meestal niet openklapt.
//
// Wat deze query ophaalt, en waarom precies dat:
//   a. de LEDEN van <iri> met hun label en rdf:type. Het lidmaatschap wordt
//      altijd in de ODRL-KERNRICHTING geconstrueerd (`lid odrl:partOf
//      collectie`), ook als de bron de oude dct:hasPart-richting draagt: de
//      modelcode leest beide, maar één richting in de store houdt de
//      dedup-vraag uit de weg;
//   b. het LABEL van de klasse van elk lid — de groepskop per niveau (audit-
//      punt C1: geen localName als kopje);
//   c. de lidmaatschapsTRIPLE van de KLEINKINDEREN, zonder hun labels. Dat is
//      precies genoeg om te weten wélke leden zelf uitklapbaar zijn (hasMembers
//      in parse.js), en niet meer: hun labels komen mee zodra dát lid wordt
//      uitgeklapt, met de volgende hop. Eén triple per kleinkind.
//   d. de VOOROUDERS van de leden, twee hops omhoog: de keten waarin een lid
//      buiten deze collectie om hangt (BRP: groep, daarboven categorie), met
//      hun labels. Dat is waar de ledenlijst zijn koppen op zet
//      (groupMembersByAncestry in parse.js), en het hoort precies hier: de
//      ancestry is per NIVEAU nodig, en dit is de query die per niveau loopt.
//      In policyDetailQuery zou dezelfde keten 0,13 s -> 2,2 s hebben gekost
//      (gemeten op 890501-v13) voor gegevens die pas bij het uitklappen tellen.
// Vormregel als bij policyDetailQuery: de lidmaatschapshop staat in ÉÉN
// propertypad-alternatief; dezelfde patronen als losse triples verleiden ARQ
// tot een fors duurder plan.
export function collectionLevelQuery(iri, { excludeGraphs = DEFAULT_EXCLUDE_GRAPHS } = {}) {
  const P = iriRef(iri);
  const scoped = (gVar, body) => (excludeGraphs && excludeGraphs.length
    ? `GRAPH ${gVar} { ${body} }
    ${graphFilter(gVar, excludeGraphs)}`
    : body);
  const MEMBER_HOP = '(dct:hasPart|^odrl:partOf)';
  return `${PREFIXES_SPARQL}
CONSTRUCT {
  ?m odrl:partOf ${P} .
  ?m ?lp ?ll .
  ?ty ?tp ?tl .
  ?gc odrl:partOf ?m .
  ?m odrl:partOf ?an .
  ?an ?ap ?al .
  ?an odrl:partOf ?up .
  ?up ?upp ?upl .
}
WHERE {
  {
    # a. de leden zelf + hun label/type
    ${P} ${MEMBER_HOP} ?m .
    FILTER(isIRI(?m))
    OPTIONAL {
      ${scoped('?g1', `?m ?lp ?ll .
      FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    }
  } UNION {
    # b. het label van de KLASSE van elk lid (de groepskop van dit niveau)
    ${P} ${MEMBER_HOP}/rdf:type ?ty .
    ${scoped('?g2', `?ty ?tp ?tl .
    FILTER(?tp IN (rdfs:label, skos:prefLabel))`)}
  } UNION {
    # c. bestaat er een niveau ONDER dit lid? Alleen de lidmaatschapstriple.
    ${P} ${MEMBER_HOP} ?m .
    ?m ${MEMBER_HOP} ?gc .
    FILTER(isIRI(?m) && isIRI(?gc))
  } UNION {
    # d. de VOOROUDERS van de leden — de ancestry-koppen van dit niveau.
    #
    # De sub-SELECT is hier het hele verhaal. Een lid van een gegevensset is
    # in /brp-ap óók lid van honderden ándere gegevenssets: de 69 leden van
    # 890501-v13 leveren samen 65.146 partOf-triples. Zonder de sub-SELECT
    # dragen álle vervolgpatronen die 65k bindingen mee (gemeten: 2,1 s en
    # 120 kB); mét — DISTINCT, en de domein-type-eis er meteen IN — blijven er
    # ~15 voorouders over en kost de hele niveau-query 0,13 s.
    #
    # Die domein-type-eis is geen optimalisatie maar dezelfde eis die de
    # modelcode stelt: alleen een voorouder met een rdf:type BUITEN de
    # ODRL-kern is een noemer waaronder leden vallen; een kale
    # odrl:AssetCollection is een andere SELECTIE van dezelfde leden en zou
    # honderden zinloze koppen opleveren. Zie groupMembersByAncestry.
    #
    # Beide kopniveaus komen uit één sub-SELECT (MEMBER_ANCESTRY_HEAD_LEVELS
    # is er ook precies twee): eerst de directe voorouder met zijn label, dan
    # via de UNION de voorouder DAARboven met de zijne. De lidmaatschapstriple
    # ?m -> ?an gaat mee, anders kent de modelcode het verband niet; ?an -> ?up
    # idem voor de knoop tussen de twee koppen.
    { SELECT DISTINCT ?an WHERE {
        ${P} ${MEMBER_HOP}/odrl:partOf ?an .
        FILTER(isIRI(?an))
        ${DOMAIN_TYPED('?an', 'd')}
      } }
    {
      # de lidmaatschapstriple lid -> voorouder: zonder haar kent de modelcode
      # het verband niet. Als eigen tak, ná de sub-SELECT: dan draait de join
      # over de handvol gevonden voorouders in plaats van over alle
      # partOf-triples van alle leden (op de grootste gegevensset van /brp-ap,
      # 350 leden, scheelde dat 1,2 s -> 0,80 s).
      ${P} ${MEMBER_HOP} ?m .
      ?m odrl:partOf ?an .
      FILTER(isIRI(?m))
    } UNION {
      ${scoped('?g4', `?an ?ap ?al .
      FILTER(?ap IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    } UNION {
      ?an odrl:partOf ?up .
      FILTER(isIRI(?up))
      ${DOMAIN_TYPED('?up', 'e')}
      ${scoped('?g5', `?up ?upp ?upl .
      FILTER(?upp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    }
  }
}
`;
}

// --- De verkenner: één knoop, BEIDE richtingen -------------------------------
// De verkenner-modus van doc.html (assets/verken-view.js) toont per knoop wat
// hij zelf zegt én wie naar hem verwijst. In ?src=<endpoint>-modus is de
// geladen graaf daarvoor per definitie onvolledig: het lijst-skelet en de
// detail-CONSTRUCTs zijn op POLICIES gericht, en een willekeurige knoop
// (een partij, een doel-concept, een gegevensveld) staat er hooguit als
// verwijzing in. Per navigatiestap haalt de verkenner daarom deze ENE
// CONSTRUCT op en mengt het resultaat in de store vóór het renderen.
//
// VORM. Dezelfde twee richtingen als de query die het ⌕ aan de externe client
// meegeeft (verken.js/nodeQuery), plus de LABELS van de buren: zonder die
// labels zou elke rij in de lijst een kale curie zijn, terwijl de weergave
// juist om leesbare namen draait. De labeltriples hangen in een OPTIONAL, dus
// een buur zonder label valt gewoon weg.
//
// PAGINEREN VIA EEN SUB-SELECT MET LIMIT. Een druk bezochte knoop (een Offer
// met 1.392 wasDerivedFrom's) mag één navigatiestap niet in tienduizenden
// triples laten lopen. De limiet zit per RICHTING in een sub-SELECT, zodat
// het afkappen gebeurt vóór de labels erbij gezocht worden — anders zou één
// buur met vijf labels vijf plaatsen van de limiet opeten.
export const NODE_REFS_LIMIT = 400;

export function nodeRefsQuery(iri, {
  limit = NODE_REFS_LIMIT, excludeGraphs = DEFAULT_EXCLUDE_GRAPHS,
} = {}) {
  const P = iriRef(iri);
  const lim = Math.max(1, limit | 0);
  const scoped = (gVar, body) => (excludeGraphs && excludeGraphs.length
    ? `GRAPH ${gVar} { ${body} }
    ${graphFilter(gVar, excludeGraphs)}`
    : body);
  const LABEL_PREDS = 'FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))';
  return `${PREFIXES_SPARQL}
CONSTRUCT {
  ${P} ?uit ?object .
  ?subject ?in ${P} .
  ?object ?lp ?ll .
  ?subject ?lp ?ll .
}
WHERE {
  {
    # a. wat deze knoop zelf zegt (literals en verwijzingen), met de labels
    #    van de knopen waarnaar hij wijst.
    { SELECT ?uit ?object WHERE { ${P} ?uit ?object } LIMIT ${lim} }
    OPTIONAL { ${scoped('?g1', `?object ?lp ?ll .
      ${LABEL_PREDS}`)} }
  } UNION {
    # b. wie naar deze knoop verwijst, met hún labels.
    { SELECT ?in ?subject WHERE { ?subject ?in ${P} . FILTER(isIRI(?subject)) } LIMIT ${lim} }
    OPTIONAL { ${scoped('?g2', `?subject ?lp ?ll .
      ${LABEL_PREDS}`)} }
  }
}
`;
}

// --- Skelet-graaf uit de lijst-SELECT ----------------------------------------

function ttlEscape(s) {
  return String(s)
    .replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    .replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
}

function bindingValue(b) { return b ? b.value : null; }

const KIND_CLASS = {
  set: ODRL + 'Set',
  offer: ODRL + 'Offer',
  agreement: ODRL + 'Agreement',
  // odrl:Request: sinds aug 2026 een EIGEN soort in de index, want verzoeken
  // hebben een eigen top-sectie. Het skelet schrijft `a odrl:Request` en de
  // modelcode herkent daaraan zowel de policysoort (ODRL-kern: een verzoek is
  // een set) als de verzoek-rol (isRequest) — precies zoals bij een
  // ttl-bron.
  request: ODRL + 'Request',
};

// Geldingsperiode in het SKELET, in de EIGEN vorm: het schema-PAAR, twee platte
// datumliterals op het subject zelf. Levert de regels of niets.
//
// Het skelet schrijft ALTIJD het schema-paar, ook als de bron de datums via een
// dct:valid-periodeknoop leverde: de query heeft ze dan al tot ?from/?to
// genormaliseerd (validityOptionals/COALESCE), en het skelet is een
// viewer-intern tussenformaat — daar één vorm aanhouden houdt de skeletgraaf
// vlak en de weergave leesbaar. De periodeknoop uit een niet-gemigreerde
// bron overleeft dus niet als knoop; zijn DATUMS wel, en die zijn wat de
// weergave toont. (Voor de VOLLEDIGE graaf van één policy geldt dat niet: het
// detail-CONSTRUCT haalt de bron-triples ongewijzigd op, knoop en al.)
//
// Is ?valid een LITERAL en zijn er geen datums, dan droeg de bron de oude
// stringvorm zonder ontleedbare datums; die schrijven we onveranderd door —
// parse.js leest hem alsnog (readValidity, stap 3).
function validityLines(subject, from, to, validBinding) {
  const type = validBinding && validBinding.type;
  const out = [];
  if (from || to) {
    if (from) out.push(`<${subject}> <${SCHEMA}validFrom> "${ttlEscape(from)}" .`);
    if (to) out.push(`<${subject}> <${SCHEMA}validThrough> "${ttlEscape(to)}" .`);
  } else if (type === 'literal') {
    out.push(`<${subject}> <${DCT}valid> "${ttlEscape(validBinding.value)}" .`);
  }
  return out;
}

// Zet de bindings van policyListQuery() om in een Turtle-skelet dat de
// bestaande modelcode (buildModel/readTemporalContainers/buildNav) direct
// begrijpt: policies met type/titel/datering/assignee(+label) en containers
// met prov:specializationOf-lidmaatschap plus de viewer-interne
// containermarker. Regels (permissions e.d.) zitten er bewust niet in — die
// haalt de viewer per policy op met policyDetailQuery zodra een kaart wordt
// uitgeklapt.
export function listSkeletonTurtle(bindings) {
  const lines = new Set();
  // Alleen echte IRI-bindings ('uri'; blank nodes zijn niet stabiel
  // adresseerbaar over queries heen) met uitsluitend veilige tekens.
  const safeIri = (b) => (b && b.type === 'uri' && /^[^<>"{}|^`\\\s]+$/.test(b.value)
    ? b.value : null);
  for (const row of bindings || []) {
    const p = safeIri(row.policy);
    if (!p) continue;
    const kindClass = KIND_CLASS[bindingValue(row.kind)] || KIND_CLASS.set;
    lines.add(`<${p}> a <${kindClass}> .`);
    const title = bindingValue(row.title);
    if (title) {
      const lang = row.title['xml:lang'] ? '@' + row.title['xml:lang'] : '';
      lines.add(`<${p}> <http://purl.org/dc/terms/title> "${ttlEscape(title)}"${lang} .`);
    }
    const iss = bindingValue(row.issued);
    if (iss) lines.add(`<${p}> <${DCT}issued> "${ttlEscape(iss)}" .`);
    for (const l of validityLines(p, bindingValue(row.validFrom),
      bindingValue(row.validTo), row.valid)) lines.add(l);
    const rev = safeIri(row.revisionOf);
    if (rev) lines.add(`<${p}> <http://www.w3.org/ns/prov#wasRevisionOf> <${rev}> .`);
    // Agreement->Offer-koppeling: hiermee kan de Offer-kaart zijn (mogelijk
    // onvolledige — SAMPLE) terugverwijzings-lijst tonen vóór de details
    // geladen zijn; de UI formuleert daarom "n getoond" in ?sparql=-modus.
    const off = safeIri(row.offerRef);
    if (off) lines.add(`<${p}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${off}> .`);
    // Agreement->Request: dezelfde relatie, ander doelwit. De verzoek-kaart
    // leest hem omgekeerd ("beantwoord door <overeenkomst>"); het TYPE van het
    // verzoek staat al in het skelet, want verzoeken zijn sinds aug 2026 een
    // eigen soort in de index.
    const req = safeIri(row.requestRef);
    if (req) lines.add(`<${p}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${req}> .`);
    // De OMGEKEERDE richting, op de verzoek-rij: de overeenkomst waarin op dit
    // verzoek beslist is. Dezelfde triple, andere kant — hiermee draagt de
    // verzoek-kaart zijn beslissingsregel vanaf het SKELET, dus voor élk
    // verzoek en niet alleen voor de toevallig al geladen overeenkomsten. De
    // titel van die overeenkomst komt uit haar eigen indexrij.
    const ans = safeIri(row.answeredByRef);
    if (ans) lines.add(`<${ans}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${p}> .`);
    const a = safeIri(row.assignee);
    if (a) {
      lines.add(`<${p}> <${ODRL}assignee> <${a}> .`);
      const al = bindingValue(row.assigneeLabel);
      if (al) {
        const lang = row.assigneeLabel['xml:lang'] ? '@' + row.assigneeLabel['xml:lang'] : '';
        lines.add(`<${a}> <http://www.w3.org/2000/01/rdf-schema#label> `
          + `"${ttlEscape(al)}"${lang} .`);
      }
    }
    const c = safeIri(row.container);
    if (c) {
      // Containermarker (viewer-intern urn:) + het ECHTE lidmaatschap
      // versie→container, beide uit de gedeelde temporal-declaratie
      // (assets/temporal.js). De marker is nodig omdat het skelet per rij maar
      // één versie meebrengt: zonder hem zou containerherkenning afhangen van
      // de datering van juist die ene versie.
      lines.add(`<${c}> a <${SKELETON_CONTAINER_CLASS}> .`);
      lines.add(`<${p}> <${SKELETON_MEMBER_PRED}> <${c}> .`);
      // Versietelling uit de SELECT: het skelet brengt per rij maar ÉÉN lid
      // mee, dus zonder dit feit denkt het model dat elke container één versie
      // heeft en tekent de navigator-chip op een ingeklapte kaart twee dode
      // pijlen. Met de telling weet de chip dát er te bladeren valt (de
      // buren zelf komen pas met het detail-CONSTRUCT).
      const vc = parseInt(bindingValue(row.versionCount) || '', 10);
      if (Number.isFinite(vc) && vc > 0) {
        lines.add(`<${c}> <${SKELETON_COUNT_PRED}> "${vc}" .`);
      }
      const ct = bindingValue(row.containerTitle);
      if (ct) {
        const lang = row.containerTitle['xml:lang'] ? '@' + row.containerTitle['xml:lang'] : '';
        lines.add(`<${c}> <http://purl.org/dc/terms/title> "${ttlEscape(ct)}"${lang} .`);
      }
    }
  }
  return [...lines].join('\n') + (lines.size ? '\n' : '');
}

// Skelet uit containerListQuery(): de container met zijn soort-hint plus zijn
// versies als DOCUMENTVERSIES. Bewust GEEN rdf:type op de versie — dan zou het
// model haar als volwaardige (maar regelloze) policy zien; nu herkent
// readTemporalContainers haar als stub, en komt de inhoud uit de bron-datalaag
// zodra de kaart wordt uitgeklapt.
export function containerSkeletonTurtle(bindings) {
  const lines = new Set();
  const safeIri = (b) => (b && b.type === 'uri' && /^[^<>"{}|^`\\\s]+$/.test(b.value)
    ? b.value : null);
  const lit = (s, p, b) => {
    const v = bindingValue(b);
    if (!v) return;
    const lang = b['xml:lang'] ? '@' + b['xml:lang'] : '';
    lines.add(`<${s}> <${p}> "${ttlEscape(v)}"${lang} .`);
  };
  for (const row of bindings || []) {
    const c = safeIri(row.container);
    const v = safeIri(row.version);
    if (!c || !v) continue;
    const kindClass = KIND_CLASS[bindingValue(row.kind)];
    if (!kindClass) continue;
    lines.add(`<${c}> a <${SKELETON_CONTAINER_CLASS}> .`);
    lines.add(`<${c}> <${DCT}type> <${kindClass}> .`);
    lines.add(`<${v}> <${SKELETON_MEMBER_PRED}> <${c}> .`);
    lit(c, DCT + 'title', row.containerTitle);
    lit(v, DCT + 'title', row.title);
    for (const l of validityLines(v, bindingValue(row.validFrom),
      bindingValue(row.validTo), row.valid)) lines.add(l);
    lit(v, DCT + 'issued', row.issued);
  }
  return [...lines].join('\n') + (lines.size ? '\n' : '');
}
