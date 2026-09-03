// ODRL-AP-NL viewer — het ⌕ als uitgang naar een GENERIEKE RDF-verkenner.
//
// De weergaven van deze viewer zijn mensleesbaar; de machineleesbare RDF komt
// er niet meer naast te staan. Wie de ruwe triples van een knoop wil zien,
// gaat naar een ANDERE PAGINA: een generieke SPARQL-client (Comunica, als
// statische bundel meegeleverd in ../comunica/). Het ⌕ is daarom geen knop
// meer die een paneel opent, maar een gewone link (nieuw tabblad) naar die
// client — met de bronnen van déze pagina als datasources en een query op de
// aangeklikte knoop.
//
// De client leest zijn staat uit de HASH van de URL (zie ldf-client-url-state
// in de gegenereerde bundel):
//     #datasources=<url>;<url>&query=<sparql>&executeOnLoad=true
// Elke hash-waarde wordt door de client in één keer gedecodeerd en pas daarna
// op [ ,;] gesplitst; per datasource dus encodeURIComponent en samenvoegen met
// ';'. Een datasource mag GETYPEERD zijn als "type@url" (de client splitst op
// de eerste '@'); zie verkenSources voor waarom het SPARQL-endpoint dat moet.
//
// Alles hier is DOM-vrij behalve verkenLink(): de URL-opbouw is puur en
// node-testbaar, en het module-topniveau raakt `document` niet aan.
import { t } from './i18n.js';

// Waar de meegeleverde client staat, gezien vanaf een pagina in viewer/. Dit
// is de TERUGVAL; de pagina's geven hun eigen pad mee uit
// assets/default-corpus.js (COMUNICA_BASE), zodat een uitrol met een andere
// mappenstructuur alleen dat configuratiebestand hoeft te wisselen.
export const COMUNICA_PATH = '../comunica/';

// --- IRI's ------------------------------------------------------------------

// De IRI achter wat de weergave doorgeeft: een string, een N3-term of een kale
// { id }-handle uit de worker. Een BLANKE KNOOP levert null: die heeft geen
// adres buiten dit document en is dus in een generieke verkenner niet aan te
// wijzen — daar hoort dan ook geen ⌕ bij.
export function iriOf(termOrIri) {
  if (!termOrIri) return null;
  if (typeof termOrIri === 'string') return validIri(termOrIri);
  if (typeof termOrIri !== 'object') return null;
  if (termOrIri.termType) {
    return termOrIri.termType === 'NamedNode' ? validIri(termOrIri.value) : null;
  }
  // Worker-handle: N3 codeert een NamedNode als de kale IRI, een blanke knoop
  // als "_:…" en een literal als '"…"'.
  if (typeof termOrIri.id === 'string') return validIri(termOrIri.id);
  return null;
}

// Alleen wat als <IRI> in een SPARQL-query mag staan (IRIREF-grammatica):
// een absolute IRI zonder de tekens die de haakjesvorm zouden breken.
function validIri(s) {
  const v = String(s || '');
  if (!/^[A-Za-z][A-Za-z0-9+.-]*:/.test(v)) return null;
  if (/[\s<>"{}|\\^`]/.test(v)) return null;
  return v;
}

// --- De query ---------------------------------------------------------------

// EEN CONSTRUCT, GEEN DESCRIBE OF SELECT (uitgeprobeerd in de client zelf).
// DESCRIBE toont alleen wat de knoop zélf zegt en verzwijgt wie naar hem
// verwijst; een SELECT levert per triple een blok met ?variabele-labels en
// leest als een formulier. De CONSTRUCT hieronder geeft precies de twee
// richtingen die de weergave ook toonde ("verwijst naar" / "verwezen vanuit"),
// en de client serialiseert het resultaat als Turtle met prefixen — dus als
// een leesbaar bronfragment.
export function nodeQuery(iri) {
  const v = validIri(iri);
  if (!v) return null;
  return `CONSTRUCT {\n`
    + `  <${v}> ?uit ?object .\n`
    + `  ?subject ?in <${v}> .\n`
    + `}\nWHERE {\n`
    + `  { <${v}> ?uit ?object }\n`
    + `  UNION\n`
    + `  { ?subject ?in <${v}> }\n`
    + `}`;
}

// --- De bronnen -------------------------------------------------------------

function absolutize(url, pageUrl) {
  const u = String(url || '');
  if (!u) return null;
  if (!pageUrl) return u;
  try { return new URL(u, pageUrl).href; } catch { return u; }
}

// De datasources die de verkenner moet laden: in bestandsmodus de bron-URL's
// van deze pagina, absoluut gemaakt (de client draait op een ander pad en kan
// met "../data/…" niets), in endpoint-modus het SPARQL-endpoint. Staan ze
// allebei aan (bestanden + bijlaad-endpoint), dan gaan ze allebei mee.
// Pseudo-bronnen die uit het endpoint zelf komen (detail-CONSTRUCTs) hebben
// geen eigen URL en tellen niet mee.
//
// HET ENDPOINT KRIJGT EEN TYPEPREFIX: `sparql@<url>`. De client leest een
// bronstring als "type@url" wanneer er een '@' vóór de URL staat, en slaat dan
// het SNIFFEN van het brontype over. Zonder die prefix haalt de engine de kale
// endpoint-URL eerst met een GET zonder query op om te zien wát het is; een
// Fuseki antwoordt daarop met 404 en de verkenner meldt "Metadata extraction …
// failed". Bestandsbronnen blijven kaal: daar is het sniffen juist correct.
// De prefix komt vóór de VOLLEDIGE absolute URL — de resolver ziet hem dus
// nooit (een 'sparql@http://…' zou hij als relatief pad opvatten).
export function verkenSources({ sources = [], sparqlEndpoint = null } = {}, pageUrl = null) {
  const out = [];
  const add = (u, type = null) => {
    const abs = absolutize(u, pageUrl);
    if (!abs) return;
    const entry = type ? type + '@' + abs : abs;
    if (!out.includes(entry)) out.push(entry);
  };
  for (const s of sources || []) {
    if (!s || s.fromSparql || !s.url) continue;
    add(s.url);
  }
  if (sparqlEndpoint) add(sparqlEndpoint, 'sparql');
  return out;
}

// --- De URL -----------------------------------------------------------------

// De client codeert hash-waarden met encodeURIComponent plus de haakjes (zijn
// eigen encodeURIComponentExtended); wij schrijven ze net zo, zodat een link
// die de gebruiker deelt er hetzelfde uitziet als een die de client zelf
// bijwerkt.
function enc(s) {
  return encodeURIComponent(String(s)).replace(/\(/g, '%28').replace(/\)/g, '%29');
}

export function comunicaUrl({ base = COMUNICA_PATH, datasources = [], query = '', pageUrl = null } = {}) {
  const parts = [];
  if (datasources && datasources.length) {
    parts.push('datasources=' + datasources.map(enc).join(';'));
  }
  if (query) {
    parts.push('query=' + enc(query));
    // Meteen uitvoeren: de link is een antwoord, geen invuloefening. ALLEEN
    // met bronnen: zonder datasources zou de client op de eerste seconde een
    // foutbalk tonen. Dat gebeurt wanneer de pagina uit lokaal geopende
    // bestanden leest — die hebben geen URL die een andere pagina kan halen.
    // De query staat dan gewoon klaar en de lezer wijst zelf een bron aan.
    if (datasources && datasources.length) parts.push('executeOnLoad=true');
  }
  const href = absolutize(base, pageUrl) || base;
  return parts.length ? href + '#' + parts.join('&') : href;
}

// De volledige ⌕-bestemming voor één knoop. null = geen bestemming (blanke
// knoop of geen bruikbare IRI); de aanroeper laat het ⌕ dan weg.
export function verkenHref(termOrIri, state = {}, { base = COMUNICA_PATH, pageUrl = null } = {}) {
  const iri = iriOf(termOrIri);
  if (!iri) return null;
  return comunicaUrl({
    base,
    datasources: verkenSources(state, pageUrl),
    query: nodeQuery(iri),
    pageUrl,
  });
}

// --- De knop ----------------------------------------------------------------

// Zelfde ronde ⌕-affordance als voorheen (klasse `verken-btn`, dus ook
// dezelfde maat, rand en hover), maar een LINK in plaats van een knop.
//
// TWEE BESTEMMINGEN, ÉÉN VORM.
//   * ZONDER `onActivate` (assets/app.js, de drie-panelen-editor): een externe
//     link naar de meegeleverde Comunica-bundel, in een nieuw tabblad. Die
//     view laadt bestanden ook lokaal ("Bestand openen"), en die hebben geen
//     URL die een andere pagina kan ophalen — een eigen verkenner-stand zou
//     daar dus leeg blijven.
//   * MÉT `onActivate` (assets/doc.js): de verkenner-stand van de pagina zelf.
//     Dan géén target=_blank — het is dezelfde pagina, in hetzelfde tabblad,
//     en de bronnen blijven geladen. De href blijft een echte, deelbare URL
//     (?verken=<IRI>), zodat middelklik, "openen in nieuw tabblad" en
//     kopiëren gewoon werken; alleen de gewone linkerklik wordt onderschept.
//
// stopPropagation in beide gevallen: de rij eronder mag niet meespringen.
export function verkenLink(href, title, onActivate = null) {
  const a = document.createElement('a');
  a.className = 'verken-btn';
  a.setAttribute('href', href);
  if (!onActivate) {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  }
  a.setAttribute('title', title || t('verken.title'));
  a.setAttribute('aria-label', t('verken.aria'));
  a.textContent = '⌕';
  a.addEventListener('click', (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!onActivate) return;
    // Modifier-klik en middelklik blijven van de browser (nieuw tabblad/
    // venster): zelfde regel als bij de kruisverwijzingen in het document.
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button)) return;
    if (e && e.preventDefault) e.preventDefault();
    onActivate();
  });
  return a;
}
