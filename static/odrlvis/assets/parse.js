// ODRL-AP-NL viewer — parse & model module (ESM, node-testable).
//
// Verantwoordelijkheden:
//   1. Turtle (via N3.js) en JSON-LD (eigen lichte expander) inlezen tot één
//      samengevoegde RDF-graaf (N3.Store).
//   2. Bekende prefixes toepassen om URI's leesbaar af te korten.
//   3. De drietraps-structuur (Offer -> Agreement -> doel-Permissions),
//      constraints, obligations en conformsToPolicy-artefacten uit de graaf
//      afleiden tot een weergavemodel.
//
// Dit bestand bevat GEEN DOM-code, zodat het met `node` te unit-testen is.

import * as N3 from '../vendor/n3.esm.min.js';
import { knownContext } from '../vendor/contexts/known-contexts.js';
import {
  TEMPORAL_VOCABS, TEMPORAL_DOC_PREDS, VERSION_DATING_PREDS,
  SCHEMA_VALID_FROM, SCHEMA_VALID_THROUGH,
  PERIOD_START_PRED, PERIOD_END_PRED, SKELETON_COUNT_PRED,
} from './temporal.js';
// Taalregime (audit-punt B16): pickLabel kiest de literal in de actieve taal,
// t() levert de weergavewoorden die dit bestand zelf produceert (statuswoorden,
// operator-zinwoorden, nav-rollen). De taal staat module-globaal in i18n.js en
// wordt door de weergave gezet (doc.js/?lang=); default nl.
import { t, pickLabel, getLang, collate } from './i18n.js';
// De standaard-labelbundel voor ODRL 2.2 die de viewer MEELEVERT
// (gegenereerd uit examples/labels-odrl.ttl). Zie labelFor hieronder: laatste
// terugval vóór de kale localName.
import { ODRL_CORE_LABELS, ODRL_CORE_DEFS } from './odrl-core-labels.js';

// Herexport: de temporal-declaratie is data in assets/temporal.js (één
// definitie, gedeeld met sparql.js — audit-punt B13); bestaande importeurs
// van parse.js blijven werken.
export { TEMPORAL_VOCABS };

const { DataFactory, Store, Parser } = N3;
const { namedNode, blankNode, literal } = DataFactory;

// --- Vocabulaire-namespaces -------------------------------------------------

// Alleen W3C-/OGC-kernvocabulaires en de eigen NL-profielen (apnl/geonl) staan
// hier statisch (audit-punt C2). Dataset-/registerprefixen (brp*, tooi, gem,
// oorg, bwb, …) komen als DATA binnen: uit de @prefix-declaraties van de
// geladen bronnen (registerPrefixes hieronder) of, voor bronloze
// ?src=<endpoint>-modus, uit het default-registerfragment
// assets/register-prefixes.js dat de UI-lagen registreren.
export const PREFIXES = {
  apnl: 'https://standaarden.overheid.nl/odrl-ap-nl/',
  odrl: 'http://www.w3.org/ns/odrl/2/',
  tpl: 'http://www.w3.org/ns/odrl/2/temporal/',
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
  owl: 'http://www.w3.org/2002/07/owl#',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  dct: 'http://purl.org/dc/terms/',
  dcat: 'http://www.w3.org/ns/dcat#',
  prov: 'http://www.w3.org/ns/prov#',
  pav: 'http://purl.org/pav/',
  skos: 'http://www.w3.org/2004/02/skos/core#',
  dpv: 'https://w3id.org/dpv#',
  foaf: 'http://xmlns.com/foaf/0.1/',
  geonl: 'https://standaarden.overheid.nl/odrl-geo-nl/',
  geo: 'http://www.opengis.net/ont/geosparql#',
  geof: 'http://www.opengis.net/def/function/geosparql/',
  // RDF Data Cube (W3C Rec 2014). De viewer gebruikt er één term uit:
  // qb:DimensionProperty als markering van een GROEPERENDE refinement-dimensie
  // (zie groupingDimensions hieronder).
  qb: 'http://purl.org/linked-data/cube#',
  // SHACL (W3C Rec 2017). De viewer gebruikt er één term uit: sh:order als
  // NESTVOLGORDE van de gedeclareerde groeperingsdimensies (zie
  // groupingDimensions hieronder).
  sh: 'http://www.w3.org/ns/shacl#',
};

const RDF = PREFIXES.rdf;
const RDFS = PREFIXES.rdfs;
const ODRL = PREFIXES.odrl;
const APNL = PREFIXES.apnl;
const QB = PREFIXES.qb;
const SH = PREFIXES.sh;
const DCT = PREFIXES.dct;
const DCAT = PREFIXES.dcat;
const PROV = PREFIXES.prov;
const DPV = PREFIXES.dpv;

// --- Prefix-hulpjes ---------------------------------------------------------

// Brongedreven prefixen: @prefix-declaraties uit de geladen Turtle-bronnen
// worden geregistreerd zodat curie() ze kent (prefixen als data, consistent
// met de registerfilosofie — bv. apdoel: uit doelenregister.ttl). De
// statische PREFIXES blijven de basis; bronnen vullen aan maar overschrijven
// bestaande korte namen niet (eerste declaratie wint, stabiel gedrag).
const sourcePrefixes = Object.create(null);
export function registerPrefixes(map) {
  for (const [p, ns] of Object.entries(map || {})) {
    if (!p || typeof ns !== 'string' || !ns) continue;
    if (!/^[A-Za-z][\w.-]*$/.test(p)) continue;
    if (PREFIXES[p] || sourcePrefixes[p]) continue;
    sourcePrefixes[p] = ns;
    prefixList = null; // curie-cache verversen: nieuw prefix kan korter afkorten
    curieCache.clear();
  }
}

// --- Label-hulpjes -----------------------------------------------------------

// Default-labels als DATA, analoog aan registerPrefixes hierboven
// (audit-punt C2): een kleine koppeltabel IRI -> i18n-key voor externe
// vocabulairetermen (dct:, skos:, …) die niet door de geladen bronnen zelf
// gelabeld worden — zie assets/register-labels.js; de wóórden staan per taal
// in assets/i18n.js (`prop.*`). De UI-lagen (doc.js, app.js) registreren die
// tabel bij het opstarten, net zoals register-prefixes.js.
// Bron-rdfs:label/skos:prefLabel/dct:title wint altijd (labelFor hieronder
// raadpleegt de graaf eerst): dit is puur de laatste terugval vóór een kale
// localName, geen hardcoded UI-kennis. De key wordt PAS BIJ HET RENDEREN
// vertaald, zodat een taalwissel deze namen meeneemt.
const propertyLabelKeys = Object.create(null);
export function registerLabelKeys(map) {
  for (const [iri, key] of Object.entries(map || {})) {
    if (!iri || typeof key !== 'string' || !key) continue;
    if (propertyLabelKeys[iri]) continue; // eerste registratie wint
    propertyLabelKeys[iri] = key;
  }
}

// Voor het profiel op de bronnen (registerPrefixes uit alle geladen bronnen)
// — het worker-pad geeft ze zo in één keer aan de hoofddraad door.
export function knownSourcePrefixes() { return { ...sourcePrefixes }; }

// Namespace voor één prefix: statisch óf brongedreven (voor tokenisatie,
// invoer-expansie en JSON-LD-contexten — registerprefixen tellen overal mee).
export function prefixNamespace(p) {
  return PREFIXES[p] || sourcePrefixes[p] || null;
}

// Alle bekende prefixen (statisch + brongedreven), o.a. voor de
// Turtle-serialisatie en het @prefix-voorblok van het bewerkpad.
export function allPrefixes() {
  return { ...sourcePrefixes, ...PREFIXES };
}

// Kort een IRI af tot `prefix:local` als een bekend prefix past, anders geef
// de volle IRI terug. Kiest het langst passende prefix (statisch én uit de
// bronnen). Hot path in buildModel (miljoenen aanroepen bij grote corpora):
// de prefixlijst wordt één keer gesorteerd (langste namespace eerst) en het
// resultaat per IRI gememoïzeerd; registerPrefixes maakt beide ongeldig.
let prefixList = null;
const curieCache = new Map();
export function curie(iri) {
  if (typeof iri !== 'string') return iri;
  const hit = curieCache.get(iri);
  if (hit !== undefined) return hit;
  if (!prefixList) {
    prefixList = [...Object.entries(PREFIXES), ...Object.entries(sourcePrefixes)]
      .sort((a, b) => b[1].length - a[1].length);
  }
  let out = iri;
  for (const [p, ns] of prefixList) {
    if (iri.startsWith(ns)) {
      const local = iri.slice(ns.length);
      // Langste passende namespace, maar een lokale naam met '/' is geen
      // geldige afkorting: dan de volle IRI (zelfde gedrag als voorheen).
      if (!local.includes('/')) out = `${p}:${local}`;
      break;
    }
  }
  curieCache.set(iri, out);
  return out;
}

// Menselijk label voor een IRI: laatste padsegment of fragment, ontdaan van
// leestekens; gebruikt als fallback als er geen rdfs:label is.
export function localName(iri) {
  if (typeof iri !== 'string') return String(iri);
  const hash = iri.lastIndexOf('#');
  const slash = iri.lastIndexOf('/');
  const cut = Math.max(hash, slash);
  let name = cut >= 0 ? iri.slice(cut + 1) : iri;
  if (!name) name = iri;
  return name;
}

// --- Inlezen ----------------------------------------------------------------

// Detecteer het formaat op basis van bestandsnaam/inhoud.
export function detectFormat(name = '', content = '') {
  const n = name.toLowerCase();
  if (n.endsWith('.jsonld') || n.endsWith('.json')) return 'jsonld';
  if (n.endsWith('.ttl') || n.endsWith('.turtle') || n.endsWith('.nt')) return 'turtle';
  // RDF/XML wordt bewust niet geparset (geen XML-parser aan boord); door het
  // formaat te benoemen kan de UI een nette melding tonen i.p.v. een
  // Turtle-parsefout of stilte.
  if (n.endsWith('.rdf') || n.endsWith('.xml')) return 'rdfxml';
  const t = content.trimStart();
  if (t.startsWith('{') || t.startsWith('[')) return 'jsonld';
  return 'turtle';
}

// Voeg één bron toe aan de store. Retourneert het aantal toegevoegde quads.
export function addSource(store, content, format) {
  if (format === 'rdfxml') throw new Error(t('err.unsupportedFormat'));
  if (format === 'jsonld') return addJsonLd(store, content);
  return addTurtle(store, content);
}

function addTurtle(store, content) {
  const parser = new Parser();
  const quads = parser.parse(content);
  store.addQuads(quads);
  // Declaraties als data: registreer de @prefix/PREFIX-declaraties van de
  // bron zodat curie() ze kan gebruiken (lichte scan; de N3-parser biedt in
  // de synchrone vorm geen prefix-API).
  const decls = {};
  const re = /(?:@prefix|\bPREFIX)\s+([A-Za-z][\w.-]*):\s*<([^>]+)>/g;
  let m;
  while ((m = re.exec(content)) !== null) decls[m[1]] = m[2];
  registerPrefixes(decls);
  return quads.length;
}

// --- Lichte JSON-LD-expander ------------------------------------------------
// Bewust een SUBSET van JSON-LD, geen volledige processor. Gedekt is:
//   - @context als object (prefix-map én term-definities), als bekende URL
//     (gevendorde contexts uit vendor/contexts/known-contexts.js — er wordt
//     NOOIT gefetcht) en als array van beide; een geneste @context op een
//     knoop breidt de actieve context voor die subtree uit;
//   - term-definities als object: {"@id": ..., "@type": "@id"|"@vocab"|<datatype>}
//     — bij "@id"/"@vocab" wordt een stringwaarde een IRI i.p.v. een literal,
//     een datatype-IRI wordt als literal-datatype toegepast; @container en
//     @language in een term-definitie worden netjes genegeerd (waarden gelden
//     als herhaalde properties, géén rdf:List);
//   - aliassen uit de context ("uid" -> @id, "type" -> @type);
//   - @vocab voor kale termen; @graph; @id (incl. "_:"-labels); @type; arrays;
//     geneste knopen; @value/@language/@type; expliciete {"@list"/"@set": []}
//     -waarden (platgeslagen tot herhaalde waarden);
//   - een array op topniveau (de standaard *expanded* JSON-LD-vorm) telt als
//     @graph.
// NIET gedekt: remote contexts buiten de gevendorde lijst, @base/relatieve
// IRI's, @reverse, @nest, @index, taal-maps, @list-containers (als rdf:List),
// per-term scoped contexts, @protected/@propagate. Onbekende kale termen
// blijven — net als voorheen — ongewijzigd staan (geen stille verwijdering).

function emptyCtx() { return { terms: Object.create(null), vocab: null }; }

// Bouw een nieuwe actieve context uit `base` plus een ruwe @context-waarde
// (string-URL | object | array daarvan). Een string-URL wordt alleen
// gehonoreerd als hij in de gevendorde KNOWN_CONTEXTS voorkomt.
function extendContext(base, raw) {
  const ctx = { terms: Object.assign(Object.create(null), base.terms), vocab: base.vocab };
  const apply = (part) => {
    if (part == null) return;
    if (typeof part === 'string') {
      const known = knownContext(part);
      if (known) apply(known);
      return; // onbekende URL: negeren (geen netwerk)
    }
    if (Array.isArray(part)) { part.forEach(apply); return; }
    if (typeof part !== 'object') return;
    if ('@context' in part && Object.keys(part).length === 1) { apply(part['@context']); return; }
    // Pas 1: ruwe term->IRI-strings verzamelen, zodat CURIE's bínnen de
    // context ("compensationValue": "rml:compensationValue") oplossen,
    // onafhankelijk van declaratievolgorde.
    const rawIds = Object.create(null);
    for (const [k, v] of Object.entries(part)) {
      if (k.startsWith('@')) continue;
      if (typeof v === 'string') rawIds[k] = v;
      else if (v && typeof v === 'object' && typeof v['@id'] === 'string') rawIds[k] = v['@id'];
    }
    const resolve = (val, seen = new Set()) => {
      if (typeof val !== 'string' || val.startsWith('@')) return val;
      if (/^https?:\/\//.test(val) || val.startsWith('urn:')) return val;
      const i = val.indexOf(':');
      if (i > 0) {
        const prefix = val.slice(0, i);
        if (!seen.has(prefix)) {
          seen.add(prefix);
          const viaRaw = rawIds[prefix] != null ? resolve(rawIds[prefix], seen) : null;
          const viaBase = ctx.terms[prefix] && typeof ctx.terms[prefix].id === 'string'
            && !ctx.terms[prefix].id.startsWith('@') ? ctx.terms[prefix].id : null;
          const ns = (viaRaw && !viaRaw.startsWith('@')) ? viaRaw : (viaBase || PREFIXES[prefix] || null);
          if (ns) return ns + val.slice(i + 1);
        }
      }
      return val;
    };
    // @vocab vóór de termen, zodat term-definities zonder @id erop terugvallen.
    if (typeof part['@vocab'] === 'string') ctx.vocab = part['@vocab'];
    for (const [k, v] of Object.entries(part)) {
      if (k.startsWith('@')) continue; // @vocab hierboven; @base/@language/@version: buiten subset
      if (v === null) { delete ctx.terms[k]; continue; }
      if (typeof v === 'string') { ctx.terms[k] = { id: resolve(v), type: null }; continue; }
      if (typeof v !== 'object' || Array.isArray(v)) continue;
      let id = typeof v['@id'] === 'string' ? resolve(v['@id']) : null;
      if (!id) {
        const rk = resolve(k);
        id = rk !== k ? rk : (ctx.vocab ? ctx.vocab + k : null);
      }
      if (!id) continue;
      const t = v['@type'];
      const type = (t === '@id' || t === '@vocab') ? t
        : (typeof t === 'string' ? resolve(t) : null);
      ctx.terms[k] = { id, type }; // @container/@language: bewust genegeerd
    }
  };
  apply(raw);
  return ctx;
}

function addJsonLd(store, content) {
  const doc = typeof content === 'string' ? JSON.parse(content) : content;
  const count = { n: 0 };
  let bnCounter = 0;
  const nextBn = () => blankNode('b' + bnCounter++);

  // Expandeer een term/CURIE/IRI met de actieve context. `vocabFallback`
  // geldt voor predicaat- en @type-posities (en @type:"@vocab"-waarden).
  const expandTerm = (term, ctx, vocabFallback = false) => {
    if (typeof term !== 'string') return term;
    const def = ctx.terms[term];
    if (def && typeof def.id === 'string' && !def.id.startsWith('@')) return def.id;
    if (/^https?:\/\//.test(term) || term.startsWith('urn:')) return term;
    const colon = term.indexOf(':');
    if (colon > 0) {
      const prefix = term.slice(0, colon);
      const pdef = ctx.terms[prefix];
      if (pdef && typeof pdef.id === 'string' && !pdef.id.startsWith('@')) {
        return pdef.id + term.slice(colon + 1);
      }
      if (PREFIXES[prefix]) return PREFIXES[prefix] + term.slice(colon + 1);
      return term;
    }
    if (vocabFallback && ctx.vocab) return ctx.vocab + term;
    return term;
  };

  // Een @id kan een blank-node-label ("_:xxx") zijn (zo levert een
  // RDF->JSON-LD-conversie geneste knopen als vlakke @graph op). Behandel die als
  // blank node, niet als IRI, zodat verwijzingen correct koppelen.
  const termForId = (idStr, ctx, vocabFallback = false) =>
    ((typeof idStr === 'string' && idStr.startsWith('_:'))
      ? blankNode(idStr.slice(2)) : namedNode(expandTerm(idStr, ctx, vocabFallback)));

  // Vind de @id van een knoop, ook via een context-alias (bv. "uid").
  const nodeIdOf = (node, ctx) => {
    if (typeof node['@id'] === 'string') return node['@id'];
    for (const [k, v] of Object.entries(node)) {
      const def = ctx.terms[k];
      if (def && def.id === '@id' && typeof v === 'string') return v;
    }
    return null;
  };

  const toObjectTerm = (val, ctx, def) => {
    if (val === null) return null;
    if (typeof val === 'string') {
      // Term-definitie {"@type": "@id"|"@vocab"}: waarde is een IRI, geen literal.
      if (def && (def.type === '@id' || def.type === '@vocab')) {
        return termForId(val, ctx, def.type === '@vocab');
      }
      if (def && def.type && !def.type.startsWith('@')) {
        return literal(val, namedNode(def.type));
      }
      return literal(val);
    }
    if (typeof val === 'boolean' || typeof val === 'number') {
      const dt = typeof val === 'boolean' ? PREFIXES.xsd + 'boolean'
        : Number.isInteger(val) ? PREFIXES.xsd + 'integer' : PREFIXES.xsd + 'double';
      return literal(String(val), namedNode(dt));
    }
    if (typeof val === 'object') {
      if ('@value' in val) {
        if (val['@language']) return literal(String(val['@value']), val['@language']);
        if (val['@type']) return literal(String(val['@value']), namedNode(expandTerm(val['@type'], ctx, true)));
        return literal(String(val['@value']));
      }
      if ('@id' in val && Object.keys(val).length === 1) {
        return termForId(val['@id'], ctx);
      }
      // Genest object (blank node of node met @id): recurse.
      return emitNode(val, ctx);
    }
    return literal(String(val));
  };

  const emitNode = (node, outerCtx) => {
    // Geneste @context (bv. EDC's "policy": {"@context": ..., ...}) breidt de
    // actieve context voor deze subtree uit.
    const ctx = ('@context' in node) ? extendContext(outerCtx, node['@context']) : outerCtx;
    const idStr = nodeIdOf(node, ctx);
    const subj = idStr != null ? termForId(idStr, ctx) : nextBn();
    for (const [key, value] of Object.entries(node)) {
      if (key === '@context') continue;
      const def = ctx.terms[key] || null;
      const alias = def && typeof def.id === 'string' && def.id.startsWith('@') ? def.id : null;
      if (key === '@id' || alias === '@id') continue;
      if (key === '@type' || alias === '@type') {
        const types = Array.isArray(value) ? value : [value];
        for (const t of types) {
          if (typeof t !== 'string') continue;
          store.addQuad(subj, namedNode(RDF + 'type'), namedNode(expandTerm(t, ctx, true)));
          count.n++;
        }
        continue;
      }
      if (key.startsWith('@')) continue; // overige keywords: buiten subset
      const pred = namedNode(def && !alias ? def.id : expandTerm(key, ctx, true));
      let values = Array.isArray(value) ? value : [value];
      // Expliciete {"@list": [...]} of {"@set": [...]}: platslaan tot
      // herhaalde waarden (containers worden bewust niet als rdf:List gelezen).
      values = values.flatMap((v) => ((v && typeof v === 'object'
        && (Array.isArray(v['@list']) || Array.isArray(v['@set'])))
        ? (v['@list'] || v['@set']) : [v]));
      for (const v of values) {
        const obj = toObjectTerm(v, ctx, def);
        if (obj) {
          store.addQuad(subj, pred, obj);
          count.n++;
        }
      }
    }
    return subj;
  };

  // Topniveau: een array is de standaard expanded vorm (behandel als @graph).
  if (Array.isArray(doc)) {
    for (const node of doc) {
      if (node && typeof node === 'object') emitNode(node, emptyCtx());
    }
    return count.n;
  }
  const rootCtx = extendContext(emptyCtx(), doc['@context']);
  const g = doc['@graph'];
  const isNode = (n) => n && typeof n === 'object'
    && (nodeIdOf(n, rootCtx) != null || '@type' in n
      || Object.keys(n).some((k) => { const d = rootCtx.terms[k]; return d && d.id === '@type'; }));
  const graph = Array.isArray(g) ? g : (g ? [g] : (isNode(doc) ? [doc] : []));
  for (const node of graph) emitNode(node, rootCtx);
  return count.n;
}

// --- Graaf-helpers ----------------------------------------------------------

// Subject-index per store: subject-id -> (predicaat-IRI -> object-termen).
// buildModel doet honderdduizenden kleine (subject, predicaat)-lookups; via
// N3's getQuads kost elke lookup index-afdaling plus quad-materialisatie
// (gemeten top-blocker bij 588k triples). Deze index wordt lui gebouwd met
// één volledige scan en daarna zijn objs/obj/subjectPredMap Map-lookups.
// Invalidatie via een mutatieteller: de muterende store-methoden worden bij
// het eerste indexgebruik éénmalig gewikkeld zodat elke wijziging (ook een
// gelijkblijvende omvang, zoals replaceSubjectClosure in edit.js) de index
// ongeldig maakt. De arrays in de index worden gedeeld teruggegeven —
// callers muteren ze niet (alleen map/filter/spread; afgedwongen per review).
const STORE_VERSION = Symbol('apnl-store-version');
const MUTATORS = ['add', 'addQuad', 'addQuads', 'delete', 'removeQuad',
  'removeQuads', 'remove', 'removeMatches', 'deleteGraph', 'import'];
function storeVersion(store) {
  if (store[STORE_VERSION] === undefined) {
    store[STORE_VERSION] = 0;
    for (const m of MUTATORS) {
      if (typeof store[m] !== 'function') continue;
      const orig = store[m];
      store[m] = function (...args) {
        this[STORE_VERSION]++;
        return orig.apply(this, args);
      };
    }
  }
  return store[STORE_VERSION];
}
const SUBJECT_INDEXES = new WeakMap();
function subjectIndex(store) {
  const version = storeVersion(store);
  let e = SUBJECT_INDEXES.get(store);
  if (!e || e.version !== version) {
    const bySubj = new Map();
    for (const q of store.getQuads(null, null, null, null)) {
      let pm = bySubj.get(q.subject.id);
      if (!pm) { pm = new Map(); bySubj.set(q.subject.id, pm); }
      const arr = pm.get(q.predicate.value);
      if (arr) arr.push(q.object); else pm.set(q.predicate.value, [q.object]);
    }
    e = { version: storeVersion(store), bySubj };
    SUBJECT_INDEXES.set(store, e);
  }
  return e.bySubj;
}
// Alle predicaten+objecten van één subject (of null als het subject geen
// eigen triples heeft) — vervangt hete `store.getQuads(term, null, null,
// null)`-scans in de modelbouw.
function subjectPredMap(store, term) {
  return term ? (subjectIndex(store).get(term.id) || null) : null;
}

const NO_TERMS = Object.freeze([]);
function objs(store, subject, predIri) {
  const pm = subjectPredMap(store, subject);
  return (pm && pm.get(predIri)) || NO_TERMS;
}
function obj(store, subject, predIri) {
  const o = objs(store, subject, predIri);
  return o.length ? o[0] : null;
}
function subs(store, predIri, object) {
  return store.getQuads(null, namedNode(predIri), object, null).map((q) => q.subject);
}

function isLiteral(term) { return term && term.termType === 'Literal'; }

// Kies een taalgevoelige literalwaarde uit meerdere objecten. De
// voorkeursvolgorde staat CENTRAAL in assets/i18n.js (pickLabel): in
// nl-modus @nl -> taal-loos -> @en, in en-modus @en -> @en-* -> taal-loos ->
// @nl. Geen taalkennis meer in dit bestand — dit is de enige plek waar een
// literal gekozen wordt.
function pickLiteral(terms) {
  return pickLabel(terms.filter(isLiteral));
}

// Naam-achtige properties als laatste redmiddel voor anonieme knopen.
const NAME_PREDS = [
  'http://www.w3.org/2006/vcard/ns#fn',
  PREFIXES.foaf + 'name',
  'http://schema.org/name',
  'https://schema.org/name',
];

// De EIGEN naam-literal van een knoop: rdfs:label / skos:prefLabel / dct:title,
// in die volgorde. Apart van labelFor omdat de terugvallen (odrl:source,
// localName, "(anoniem)") juist moeten weten of er een eigen naam ís.
function ownLabel(store, term) {
  return pickLiteral(objs(store, term, RDFS + 'label'))
    || pickLiteral(objs(store, term, PREFIXES.skos + 'prefLabel'))
    || pickLiteral(objs(store, term, DCT + 'title'));
}

// Naam die een naamloze knoop ERFT van zijn odrl:source (en die van diens
// source, …). Alleen een ECHTE naam telt: een bron zonder eigen label geeft
// niets te erven (dan is de localName van de knoop zelf eerlijker), en een
// string-literal als bron is een runtime-sleutel ("urn:user" in DOME-beleid),
// geen naam. De `seen`-set houdt een source-cykel eindig.
function inheritedLabel(store, term, seen = new Set()) {
  const src = obj(store, term, ODRL + 'source');
  if (!src || isLiteral(src) || seen.has(src.value)) return '';
  seen.add(src.value);
  return ownLabel(store, src) || inheritedLabel(store, src, seen);
}

// Label voor een node: rdfs:label (nl) of dct:title (nl) of afgekorte IRI.
// Voor blank nodes NOOIT het interne parser-id ("n3-16") tonen: dat bestaat
// niet in de bron en verschilt per sessie. Fallback-keten: label-properties ->
// naam-achtige properties -> "(anonieme <typelabel>)" -> "(anoniem)".
export function labelFor(store, term) {
  if (!term) return '';
  if (isLiteral(term)) return term.value;
  const own = ownLabel(store, term);
  if (own) return own;
  // Een collectie die met odrl:source uit een GELABELDE verzameling snijdt en
  // zelf geen naam draagt, heet naar die verzameling: "medewerkers van
  // Gemeente Vlierdam" (met de refinement-voorwaarde ernaast) zegt wat de
  // kale localName van de snijknoop — een technisch adres — niet zegt.
  const inherited = inheritedLabel(store, term);
  if (inherited) return inherited;
  if (term.termType === 'BlankNode') {
    for (const p of NAME_PREDS) {
      const name = pickLiteral(objs(store, term, p));
      if (name) return name;
    }
    const ty = typesOf(store, term)[0];
    if (ty) return t('anonTyped', { type: labelFor(store, namedNode(ty)) });
    return t('anon');
  }
  // Laatste terugval vóór een kale localName: de default-weergavenamen
  // (registerLabelKeys hierboven), in de actieve taal.
  const key = propertyLabelKeys[term.value];
  if (key) return t(key);
  // En daarna de MEEGELEVERDE ODRL 2.2-bundel: elke kernterm heeft een nl- en
  // een en-label, zodat "odrl:use" nooit als kale "use" in beeld komt ook als
  // geen enkele geladen bron ODRL labelt (Visualisation Note §1). Zelfde
  // taalvolgorde als pickLabel: de actieve taal eerst, dan de andere.
  const core = odrlCoreLabel(term.value);
  if (core) return core;
  return localName(term.value);
}

// --- Uitleg bij een term (Visualisation Note §1) -----------------------------
// Een label GEEFT EEN NAAM; een definitie zegt wat die naam betekent. De note
// vraagt van elke getoonde term een label (needs) en een korte definitie
// (should); dit is de leeskant daarvan. Bronvolgorde:
//   1. skos:definition  — de begripsdefinitie (NL-SBB/SKOS, wat odrl-ap-nl doet)
//   2. dct:description  — de beschrijving van een ding
//   3. rdfs:comment     — de annotatie op een vocabulaireterm
// Die volgorde is niet willekeurig: hoe specifieker het predicaat voor
// "dit betekent het", hoe eerder het aan de beurt komt.
//
// TAALKEUZE identiek aan die van labels (pickLabel/pickLiteral): de actieve
// taal eerst, dan de keten, met taal-loze literals als terugval — nooit een
// definitie in de verkeerde taal boven een die past.
//
// DE VIEWER LEVERT DEFINITIES MEE. Voor de kerntermen is er vaak geen data om
// een uitleg uit te halen: het woord op het scherm is van de viewer, de term
// erachter een ODRL-/DCMI-/PROV-kernterm die geen beleidsbron zelf definieert.
// Daarvoor levert de viewer definities mee (ODRL_CORE_DEFS, gegenereerd uit
// data/labels-odrl.ttl), net zoals hij dat voor de labels al doet. Dat is geen
// verzinsel: de teksten zijn geparafraseerd uit de specificatie die de term
// definieert.
//
// VOORRANG — EN DAARIN WIJKEN DEFINITIES AF VAN LABELS.
// Bij LABELS wint de geladen data altijd: hoe een bron een term wil NOEMEN is
// aan die bron (labelFor, hieronder). Bij een DEFINITIE van een term in de
// ODRL-NAMESPACE wint juist de BUNDEL. Reden: de uitleg-tooltip van een
// odrl:-kernterm hoort over de ODRL-term zelf te gaan — vocabulaire-neutraal,
// zoals ODRL 2.2 hem vastlegt. Laadt een profiel (odrl-ap-nl) of een
// beleidsbron een eigen skos:definition op bijvoorbeeld odrl:purpose met daarin
// zijn domeininvulling — een wetsartikel, een doelbinding, een AVG-grondslag —
// dan beschrijft die tekst niet meer de ODRL-term, en zou de lezer die op "doel"
// hovert profieltaal krijgen waar hij de kernbetekenis verwacht. Die
// domeininvulling hoort bij de profieltermen zelf, niet bij de kernterm.
// Voor elke NIET-odrl:-IRI blijft het data-eerst: profieltermen, begrippen en
// instanties uit de data leggen hun eigen betekenis vast, en ook de handvol
// dct:/prov:/dcat:/dpv:-veldkoppen mag een bron overschrijven.
const DESCRIPTION_PREDS = [
  PREFIXES.skos + 'definition',
  DCT + 'description',
  RDFS + 'comment',
];

const ODRL_NS = 'http://www.w3.org/ns/odrl/2/';

export function descriptionFor(store, termOrIri, lang) {
  if (termOrIri == null) return '';
  const term = typeof termOrIri === 'string' ? namedNode(termOrIri) : termOrIri;
  if (!term.termType || isLiteral(term)) return '';
  // Een odrl:-kernterm die de bundel kent: die tekst wint, ook als de data een
  // eigen definitie draagt. Kent de bundel hem niet (een profielterm die
  // toevallig in de odrl-namespace zou staan), dan gewoon de data-route.
  if (term.value.startsWith(ODRL_NS)) {
    const kern = odrlCoreDefinition(term.value, lang);
    if (kern) return kern;
  }
  // Zonder store (bronloze endpoint-modus, of een aanroeper die alleen een IRI
  // heeft) is er geen graaf om te bevragen — de bundel blijft wel gelden.
  if (!store) return odrlCoreDefinition(term.value, lang);
  for (const p of DESCRIPTION_PREDS) {
    const v = pickLabel(objs(store, term, p).filter(isLiteral), lang);
    if (v) return v;
  }
  return odrlCoreDefinition(term.value, lang);
}

// De definitie uit de meegeleverde bundel, in de gevraagde taal met terugval
// op de andere (en -> nl, nl -> en): een halve vertaling mag nooit een lege
// uitleg worden. Zelfde vorm als odrlCoreLabel hieronder.
function odrlCoreDefinition(iri, lang) {
  const e = ODRL_CORE_DEFS[iri];
  if (!e) return '';
  return ((lang || getLang()) === 'en' ? (e.en || e.nl) : (e.nl || e.en)) || '';
}

// Dezelfde vraag voor een term die óók een literal kan zijn (een rechterwaarde,
// een odrl:source-sleutel): een literal is zichzelf, en heeft geen uitleg.
function descOfTerm(store, term) {
  return term && !isLiteral(term) ? descriptionFor(store, term) : '';
}

// Het label uit de ingebouwde ODRL 2.2-bundel, in de actieve taal met
// terugval op de andere taal (en -> nl, nl -> en) — een halve vertaling mag
// nooit een kale localName worden. Geen treffer: lege string.
function odrlCoreLabel(iri) {
  const e = ODRL_CORE_LABELS[iri];
  if (!e) return '';
  return (getLang() === 'en' ? (e.en || e.nl) : (e.nl || e.en)) || '';
}

function typesOf(store, term) {
  return objs(store, term, RDF + 'type').map((t) => t.value);
}
function hasType(store, term, typeIri) {
  return typesOf(store, term).includes(typeIri);
}

// --- Constraint-vertaling ---------------------------------------------------

// Zinwoorden voor UITSLUITEND de ODRL 2.2-kernoperatoren (UI-chrome, zoals
// de "én/óf"-voegwoorden). Profieloperatoren — apnl:conformsToPolicy, de
// GeoSPARQL sf*-operatoren, brp:knv, … — krijgen hun zinwoord via rdfs:label
// uit de geladen profiel-ontologie (labelFor-fallback in constraintSentence);
// dat mechanisme bestond al voor de BRP-operatoren en geldt nu voor alle
// profielen gelijk (audit-punt B7). De tabel bevat i18n-KEYS, niet de woorden
// zelf: die staan per taal in assets/i18n.js (B16).
const OPERATOR_KEYS = {
  [ODRL + 'eq']: 'op.eq',
  [ODRL + 'neq']: 'op.neq',
  [ODRL + 'gt']: 'op.gt',
  [ODRL + 'gteq']: 'op.gteq',
  [ODRL + 'lt']: 'op.lt',
  [ODRL + 'lteq']: 'op.lteq',
  [ODRL + 'isA']: 'op.isA',
  [ODRL + 'hasPart']: 'op.hasPart',
  [ODRL + 'isPartOf']: 'op.isPartOf',
  [ODRL + 'isAllOf']: 'op.isAllOf',
  [ODRL + 'isAnyOf']: 'op.isAnyOf',
  [ODRL + 'isNoneOf']: 'op.isNoneOf',
};

// Leftoperand-zinwoorden voor UITSLUITEND ODRL 2.2-kerntermen; profieltermen
// (bv. apnl:verwerkingsverzoek) dragen hun rdfs:label in de profiel-ontologie
// (zelfde regime als OPERATOR_KEYS hierboven, audit-punt B8).
const LEFT_KEYS = {
  [ODRL + 'purpose']: 'left.purpose',
  [ODRL + 'dateTime']: 'left.dateTime',
  [ODRL + 'count']: 'left.count',
  [ODRL + 'spatial']: 'left.spatial',
  [ODRL + 'delayPeriod']: 'left.delayPeriod',
  [ODRL + 'elapsedTime']: 'left.elapsedTime',
  [ODRL + 'event']: 'left.event',
  [ODRL + 'recipient']: 'left.recipient',
  [ODRL + 'media']: 'left.media',
};

// Zinwoord in de ACTIEVE taal, of null als de term geen ODRL-kernterm is
// (dan wint het rdfs:label uit de geladen profielgraaf).
export function operatorWord(iri) {
  const k = OPERATOR_KEYS[iri];
  return k ? t(k) : null;
}
export function leftOperandWord(iri) {
  const k = LEFT_KEYS[iri];
  return k ? t(k) : null;
}

// Alle leftOperand-termen uit de ODRL 2.2-kernvocabulaire. Nodig om de
// ODRL-2.0-kortvorm te herkennen, waarbij de leftOperand als predicaat direct
// op de Constraint-node staat (bv. `odrl:spatial "..."` i.p.v.
// leftOperand/rightOperand).
const ODRL_LEFT_OPERANDS = new Set([
  'absolutePosition', 'absoluteSize', 'absoluteSpatialPosition', 'absoluteTemporalPosition',
  'count', 'dateTime', 'delayPeriod', 'deliveryChannel', 'elapsedTime', 'event',
  'fileFormat', 'industry', 'language', 'media', 'meteredTime', 'payAmount',
  'percentage', 'product', 'purpose', 'recipient', 'relativePosition', 'relativeSize',
  'relativeSpatialPosition', 'relativeTemporalPosition', 'resolution', 'spatial',
  'spatialCoordinates', 'system', 'systemDevice', 'timeInterval', 'unitOfCount',
  'version', 'virtualLocation',
].map((n) => ODRL + n));

// Logische samenstellingen (odrl:LogicalConstraint); het voegwoord komt per
// taal uit de stringtabel ('logical.and' e.d.).
const LOGICAL_OPS = ['and', 'andSequence', 'or', 'xone'];

// Leden van een rdf:List; een niet-lijst-term telt als één lid.
function rdfListItems(store, term) {
  if (!obj(store, term, RDF + 'first')) return [term];
  const out = [];
  const seen = new Set();
  let node = term;
  while (node && node.value !== RDF + 'nil' && !seen.has(node.value)) {
    seen.add(node.value);
    const f = obj(store, node, RDF + 'first');
    if (f) out.push(f);
    node = obj(store, node, RDF + 'rest');
  }
  return out;
}

// Predicaten die de constraint-weergave kent (voor het rapporteren van
// NIET-herkende properties op een constraint-node, bv. het IDSA-achtige
// `odrl:operand` waar `odrl:operator` bedoeld is).
const CONSTRAINT_KNOWN_PREDS = new Set([
  RDF + 'type', RDFS + 'label', RDFS + 'comment', PREFIXES.skos + 'prefLabel',
  DCT + 'title', DCT + 'description', ODRL + 'uid',
  ODRL + 'leftOperand', ODRL + 'operator', ODRL + 'rightOperand',
  ODRL + 'rightOperandReference', PREFIXES.geonl + 'property',
]);

// NIET-herkende properties op een constraint-node, als [{curie, values}] —
// data-gedreven grondstof voor de "ontbreekt"-uitleg in de UI.
function constraintUnknownProps(store, cTerm, extraKnown) {
  const out = [];
  for (const [p, terms] of subjectPredMap(store, cTerm) || []) {
    if (CONSTRAINT_KNOWN_PREDS.has(p) || (extraKnown && extraKnown.has(p))) continue;
    out.push({
      curie: curie(p),
      values: terms.map((o) => (o.termType === 'Literal' ? `"${o.value}"` : curie(o.value))),
    });
  }
  return out;
}

// Bouw een leesbare zin voor een constraint-term.
export function constraintSentence(store, cTerm, depth = 0) {
  // odrl:LogicalConstraint: odrl:and/or/xone/andSequence naar een rdf:List of
  // herhaalde properties -> samengestelde zin uit de zinnen van de leden.
  if (depth < 5) {
    for (const name of LOGICAL_OPS) {
      const joiner = t('logical.' + name);
      const vals = objs(store, cTerm, ODRL + name);
      if (!vals.length) continue;
      const members = vals.flatMap((v) => rdfListItems(store, v));
      // Volledige kind-objecten (recursief, mét term): de UI rendert de
      // geneste en/of-structuur gestructureerd (groepskop + ingesprongen
      // leden) in plaats van één platte zin; de zin blijft als fallback en
      // voor compacte contexten (duty-subregels).
      const children = members.map((m) => ({ term: m, ...constraintSentence(store, m, depth + 1) }));
      const parts = children.map((ch) => ch.sentence);
      const sentence = (name === 'xone' ? t('logical.xonePrefix') : '') + parts.join(joiner);
      return {
        sentence,
        // De IRI van een BENOEMDE voorwaarde: dat is wat haar aanhaalbaar
        // maakt (dekking, protocollering) — zelfde rol als odrl:uid bij een
        // regel. Blank nodes houden null.
        iri: cTerm.termType === 'NamedNode' ? cTerm.value : null,
        label: pickLiteral(objs(store, cTerm, RDFS + 'label')) || null,
        comment: pickLiteral(objs(store, cTerm, RDFS + 'comment')) || null,
        logical: name,
        children,
        left: null, leftIri: null, operator: curie(ODRL + name), property: null,
        right: [], rightRefs: [], rightOperandReference: [],
        // De twee markers gelden ook voor een samengestelde voorwaarde: zij is
        // als GEHEEL de voorwaarde, dus ook als geheel organisatorisch geborgd
        // of juist de technische borging.
        technicalMeasure: isTechnicalMeasure(store, cTerm),
        conformsOp: isConformsOperator(store, cTerm),
        organisational: isOrganisationalMeasure(store, cTerm),
        // Samengestelde constraints hebben geen eigen slot-chips.
        slots: null, unknownProps: [],
      };
    }
  }

  let left = obj(store, cTerm, ODRL + 'leftOperand');
  const op = obj(store, cTerm, ODRL + 'operator');
  // Een rdf:List als rightOperand (bv. odrl:isAnyOf met 14 gemeentecodes)
  // wordt geëxpandeerd naar zijn leden — anders verschijnt de lijstknoop
  // zelf als "(anoniem)". Niet-lijst-waarden blijven één lid.
  let rights = objs(store, cTerm, ODRL + 'rightOperand')
    .flatMap((r) => rdfListItems(store, r));
  // ODRL-2.0-kortvorm: de leftOperand staat als predicaat op de Constraint
  // zelf en draagt de waarde (bv. `odrl:operator odrl:eq ; odrl:spatial <IT>`).
  let shorthand = false;
  if (!left) {
    for (const [p, terms] of subjectPredMap(store, cTerm) || []) {
      if (ODRL_LEFT_OPERANDS.has(p)) {
        left = namedNode(p);
        rights = terms;
        shorthand = true;
        break;
      }
    }
  }
  // rightOperandReference: een verwijzing i.p.v. een letterlijke waarde (bv. een
  // benoemd geo-gebied of een systeemrubriek voor datumrekening). Werd eerder in de
  // constraint-zin genegeerd.
  const refs = objs(store, cTerm, ODRL + 'rightOperandReference');
  // Feature-eigenschap-aanduiding (ODRL-Geo-NL): welk attribuut wordt vergeleken.
  const property = obj(store, cTerm, PREFIXES.geonl + 'property');
  const label = pickLiteral(objs(store, cTerm, RDFS + 'label'));
  // Bij een geonl:featureProperty-constraint noemt geonl:property het attribuut;
  // gebruik dat als leesbare grootheid i.p.v. het generieke "feature-eigenschap".
  const leftStr = property
    ? (isLiteral(property) ? property.value : labelFor(store, property))
    : (left ? (leftOperandWord(left.value) || labelFor(store, left)) : t('unknownQuantity'));
  // In de 2.0-kortvorm zonder expliciete operator is gelijkheid geïmpliceerd.
  const opStr = op ? (operatorWord(op.value) || labelFor(store, op))
    : (shorthand ? operatorWord(ODRL + 'eq') : t('unknownOperator'));
  // Unaire profiel-operator (bv. brp:knv "komt niet voor"): een operator
  // buiten de ODRL-kern zónder rightOperand(Reference) krijgt bewust géén
  // "(waarde?)"/ontbreekt-markering — de bron modelleert dit consequent
  // zonder waarde, dus een waarschuwing zou meer pretenderen dan we weten.
  // ODRL-kernoperatoren vereisen wél een waarde en houden de markering.
  const unaryOperator = !!op && !rights.length && !refs.length
    && !op.value.startsWith(ODRL);
  const rightParts = [
    ...rights.map((r) => (isLiteral(r) ? `"${r.value}"` : labelFor(store, r))),
    ...refs.map((r) => (isLiteral(r) ? `"${r.value}"` : labelFor(store, r))),
  ];
  // Lange waardelijsten (rdf:List-rightOperand, bv. 14 gemeentecodes) in de
  // zin inkorten; de volledige lijst blijft beschikbaar in slots.right.texts.
  const shownParts = rightParts.length > 6
    ? [...rightParts.slice(0, 5), t('valuesTruncated', { n: rightParts.length })]
    : rightParts;
  const rightStr = rightParts.length ? shownParts.join(', ')
    : (unaryOperator ? '' : t('unknownValue'));

  const sentence = `${leftStr} ${opStr} ${rightStr}`.trimEnd();
  // Gestructureerde slot-weergave: per slot de tekst, of null als het slot in
  // de data ontbreekt (de UI toont dan een "ontbreekt"-chip met uitleg).
  const extraKnown = shorthand && left ? new Set([left.value]) : null;
  return {
    sentence,
    // Zie de logische tak hierboven: de IRI van een benoemde voorwaarde.
    iri: cTerm.termType === 'NamedNode' ? cTerm.value : null,
    label: label || null,
    comment: pickLiteral(objs(store, cTerm, RDFS + 'comment')) || null,
    unaryOperator,
    left: left ? curie(left.value) : null,
    // De volle IRI van de leftOperand naast de curie: de groepering (zie
    // groupRules) matcht op IRI, want een curie hangt van de geladen prefixen af.
    leftIri: left ? left.value : null,
    operator: op ? curie(op.value) : (shorthand ? 'odrl:eq' : null),
    property: property ? (isLiteral(property) ? property.value : curie(property.value)) : null,
    right: rights.map((r) => (isLiteral(r) ? r.value : curie(r.value))),
    rightRefs: [...rights, ...refs].filter((r) => !isLiteral(r)).map((r) => r.value),
    rightOperandReference: refs.map((r) => (isLiteral(r) ? r.value : curie(r.value))),
    // DE TWEE MARKERS (dpv), meegegeven omdat de weergave ze
    // niet zelf opzoeken. `technicalMeasure` valt terug op de operator, zodat
    // data zonder markers identiek blijft werken; `conformsOp` zegt of de
    // ODRL-AP-NL-operator er werkelijk staat (dan leest de rij als vaste zin).
    technicalMeasure: isTechnicalMeasure(store, cTerm),
    conformsOp: isConformsOperator(store, cTerm),
    organisational: isOrganisationalMeasure(store, cTerm),
    // Naast de TEKST van elk slot ook de UITLEG bij de term erachter, als de
    // data die geeft (note §1: definities naast labels). Alleen voor termen
    // die een IRI hebben: een letterlijke rechterwaarde is zichzelf.
    slots: {
      left: (left || property)
        ? { text: leftStr, desc: descOfTerm(store, property || left) } : null,
      operator: (op || shorthand)
        ? { text: opStr, desc: op ? descriptionFor(store, op) : '' } : null,
      // `descs` loopt in de PAS met `texts` (eerst de rightOperands, dan de
      // rightOperandReferences) — de weergave koppelt ze op index.
      right: rightParts.length
        ? {
          texts: rightParts,
          descs: [...rights, ...refs].map((r) => descOfTerm(store, r)),
        } : null,
    },
    unknownProps: constraintUnknownProps(store, cTerm, extraKnown),
  };
}

// --- Bron-serialisatie (voor het rechterpaneel) -----------------------------

// Verzamel alle quads van `subject` plus de transitieve sluiting over blank
// nodes, en serialiseer als Turtle-fragment.
// Predicaten waarvan de benoemde (IRI-)objecten inhoudelijk bij de node horen:
// hun eigen triples (o.a. het rdfs:label van een benoemde constraint) worden
// in de WEERGAVE van het bronfragment meegenomen, zodat het paneel niets
// verzwijgt. Het bewerkpad gebruikt de strikte sluiting (zonder deze
// uitbreiding), omdat round-trip-merge alleen de eigen sluiting vervangt.
export const FOLLOW_NAMED_PREDS = [
  ODRL + 'constraint', ODRL + 'refinement', ODRL + 'duty', ODRL + 'obligation',
];

export function subjectTurtle(store, subjectIri, followNamedPreds) {
  const follow = new Set(followNamedPreds || []);
  const start = typeof subjectIri === 'string' ? namedNode(subjectIri) : subjectIri;
  const collected = [];
  const seen = new Set();
  const stack = [start];
  while (stack.length) {
    const s = stack.pop();
    const key = s.termType + ':' + s.value;
    if (seen.has(key)) continue;
    seen.add(key);
    const quads = store.getQuads(s, null, null, null);
    for (const q of quads) {
      collected.push(q);
      if (q.object.termType === 'BlankNode') stack.push(q.object);
      else if (q.object.termType === 'NamedNode' && follow.has(q.predicate.value)
        && q.object.value !== s.value) stack.push(q.object);
    }
  }
  const writer = new N3.Writer({ prefixes: allPrefixes() });
  writer.addQuads(collected);
  let out = '';
  writer.end((err, result) => { if (!err) out = result; });
  return prunePrefixes(out);
}

// Serialiseer dezelfde subject-sluiting als compact JSON-LD-achtig object
// (predicaten als CURIE's, blank nodes genest). subjectJsonLdBody levert het
// kale object (herbruikt door edit.js voor volledige-graaf-export).
export function subjectJsonLdBody(store, subjectIri, followNamedPreds) {
  const follow = new Set(followNamedPreds || []);
  const start = typeof subjectIri === 'string' ? namedNode(subjectIri) : subjectIri;
  const visiting = new Set();

  const termToVal = (t, predIri) => {
    if (t.termType === 'Literal') {
      if (t.language) return { '@value': t.value, '@language': t.language };
      const dt = t.datatype ? t.datatype.value : null;
      if (dt === PREFIXES.xsd + 'boolean') return t.value === 'true';
      if (dt === PREFIXES.xsd + 'integer') return parseInt(t.value, 10);
      if (dt && dt !== PREFIXES.xsd + 'string') return { '@value': t.value, '@type': curie(dt) };
      return t.value;
    }
    if (t.termType === 'BlankNode') {
      if (visiting.has(t.value)) return { '@id': '_:' + t.value };
      return nodeToObj(t);
    }
    // Benoemde bouwstenen (constraints/duties) desgewenst genest tonen,
    // zodat hun inhoud ook in het JSON-LD-fragment zichtbaar is.
    if (follow.has(predIri) && !visiting.has('n:' + t.value)
      && store.getQuads(t, null, null, null).length) {
      return nodeToObj(t, true);
    }
    return { '@id': curie(t.value) };
  };

  const nodeToObj = (s, embedded) => {
    if (s.termType === 'BlankNode') visiting.add(s.value);
    else if (embedded) visiting.add('n:' + s.value);
    const obj = {};
    if (s.termType === 'NamedNode') obj['@id'] = curie(s.value);
    for (const q of store.getQuads(s, null, null, null)) {
      const p = q.predicate.value;
      const key = p === RDF + 'type' ? '@type' : curie(p);
      const val = p === RDF + 'type' ? curie(q.object.value) : termToVal(q.object, p);
      if (key in obj) {
        if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
        obj[key].push(val);
      } else obj[key] = val;
    }
    return obj;
  };

  return nodeToObj(start);
}

// Alleen gebruikte prefixes in de @context (werkt op één body of een array);
// brongedreven registerprefixen (bv. brp:, apdoel:) tellen mee.
export function jsonLdContext(body) {
  const used = new Set();
  const scan = (v) => {
    if (typeof v === 'string') { const m = v.match(/^([\w-]+):/); if (m && prefixNamespace(m[1])) used.add(m[1]); }
    else if (Array.isArray(v)) v.forEach(scan);
    else if (v && typeof v === 'object') Object.entries(v).forEach(([k, w]) => { scan(k); scan(w); });
  };
  scan(body);
  const ctx = {};
  for (const p of [...used].sort()) ctx[p] = prefixNamespace(p);
  return ctx;
}

export function subjectJsonLd(store, subjectIri, followNamedPreds) {
  const body = subjectJsonLdBody(store, subjectIri, followNamedPreds);
  return JSON.stringify({ '@context': jsonLdContext(body), ...body }, null, 2);
}

// Verwijder @prefix-regels die niet in de body voorkomen, zodat het
// bronfragment beknopt blijft.
export function prunePrefixes(ttl) {
  const lines = ttl.split('\n');
  const prefixLines = [];
  const bodyLines = [];
  for (const l of lines) {
    if (/^@prefix\s/.test(l)) prefixLines.push(l);
    else bodyLines.push(l);
  }
  const body = bodyLines.join('\n');
  const kept = prefixLines.filter((l) => {
    const m = l.match(/^@prefix\s+([\w-]*):/);
    if (!m) return true;
    // Ook datatype-posities (^^xsd:date) tellen als gebruik.
    return new RegExp(`(^|[\\s,;\\[(]|\\^\\^)${m[1]}:`, 'm').test(body);
  });
  const header = kept.length ? kept.join('\n') + '\n\n' : '';
  return header + body.replace(/^\n+/, '');
}

// --- Graaf-inspecteur: gedeelde, DOM-vrije logica ---------------------------
// (gebruikt door assets/inspect.js in beide weergaven)

// Turtle-token -> volle IRI: "<https://…>" of "prefix:local" (bekende
// prefixes, statisch én brongedreven). Al het andere (literals, keywords,
// blanknode-labels) -> null.
export function tokenIri(token) {
  if (typeof token !== 'string') return null;
  if (token.startsWith('<') && token.endsWith('>')) return token.slice(1, -1);
  const m = token.match(/^([\w-]+):([\w./#-]*)$/);
  if (m) {
    const ns = prefixNamespace(m[1]);
    if (ns) return ns + m[2];
  }
  return null;
}

// Heeft deze IRI eigen triples in de graaf (komt hij als subject voor)?
export function isGraphSubject(store, iri) {
  return !!iri && store.getQuads(namedNode(iri), null, null, null).length > 0;
}

// Kopgegevens van een node voor de inspecteur (label + curie + typen).
export function nodeSummary(store, term) {
  const t = typeof term === 'string' ? namedNode(term) : term;
  return {
    term: t,
    iri: t.termType === 'NamedNode' ? t.value : null,
    curie: t.termType === 'NamedNode' ? curie(t.value) : null,
    label: labelFor(store, t),
    desc: descOfTerm(store, t),
    types: typesOf(store, t).map(curie),
  };
}

// Inkomende verwijzingen: wie verwijst naar deze node, via welk predicaat?
// Gededupliceerd per (subject, predicaat); zelfverwijzingen (bv. odrl:uid
// naar zichzelf) tellen niet mee. Blank-node-subjecten blijven navigeerbaar
// via hun term (geen parser-id in de weergave; labelFor vat ze samen).
export function incomingRefs(store, term) {
  const t = typeof term === 'string' ? namedNode(term) : term;
  const seen = new Set();
  const out = [];
  for (const q of store.getQuads(null, null, t, null)) {
    if (q.subject.termType === t.termType && q.subject.value === t.value) continue;
    const key = q.subject.termType + ':' + q.subject.value + '|' + q.predicate.value;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      term: q.subject,
      iri: q.subject.termType === 'NamedNode' ? q.subject.value : null,
      curie: q.subject.termType === 'NamedNode' ? curie(q.subject.value) : null,
      label: labelFor(store, q.subject),
      desc: descOfTerm(store, q.subject),
      predicate: {
        iri: q.predicate.value,
        curie: curie(q.predicate.value),
        label: labelFor(store, namedNode(q.predicate.value)),
        desc: descriptionFor(store, q.predicate.value),
      },
    });
  }
  return out;
}

// Goedkope telling van de inkomende verwijzingen (gededupliceerd per
// (subject, predicaat), zelfverwijzingen uitgezonderd) — voor de fold-out-kop
// van de inspecteur, zónder labels op te bouwen.
export function incomingRefCount(store, term) {
  const t = typeof term === 'string' ? namedNode(term) : term;
  const seen = new Set();
  for (const q of store.getQuads(null, null, t, null)) {
    if (q.subject.termType === t.termType && q.subject.value === t.value) continue;
    seen.add(q.subject.termType + ':' + q.subject.value + '|' + q.predicate.value);
  }
  return seen.size;
}

// Uitgaande verwijzingen: naar welke knopen verwijst deze node, via welk
// predicaat? Niet-literal objecten, gededupliceerd per (predicaat, object),
// zonder zelfverwijzing. Bewust VOLLEDIG (ook verwijzingen die al in het
// bronfragment zichtbaar zijn): het fragment toont alleen IRI-tokens en maakt
// alleen graaf-subjecten klikbaar; de lijst geeft élk doel een label + klik,
// en blijft via de lazy fold-out goedkoop zolang hij dicht is.
export function outgoingRefs(store, term) {
  const t = typeof term === 'string' ? namedNode(term) : term;
  const seen = new Set();
  const out = [];
  for (const q of store.getQuads(t, null, null, null)) {
    if (q.object.termType === 'Literal') continue;
    if (q.object.termType === t.termType && q.object.value === t.value) continue;
    const key = q.predicate.value + '|' + q.object.termType + ':' + q.object.value;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      term: q.object,
      iri: q.object.termType === 'NamedNode' ? q.object.value : null,
      curie: q.object.termType === 'NamedNode' ? curie(q.object.value) : null,
      label: labelFor(store, q.object),
      desc: descOfTerm(store, q.object),
      predicate: {
        iri: q.predicate.value,
        curie: curie(q.predicate.value),
        label: labelFor(store, namedNode(q.predicate.value)),
        desc: descriptionFor(store, q.predicate.value),
      },
    });
  }
  return out;
}

// Goedkope telling van de uitgaande verwijzingen (zelfde dedup als
// outgoingRefs, zonder labels).
export function outgoingRefCount(store, term) {
  const t = typeof term === 'string' ? namedNode(term) : term;
  const seen = new Set();
  for (const q of store.getQuads(t, null, null, null)) {
    if (q.object.termType === 'Literal') continue;
    if (q.object.termType === t.termType && q.object.value === t.value) continue;
    seen.add(q.predicate.value + '|' + q.object.termType + ':' + q.object.value);
  }
  return seen.size;
}

// --- Modelopbouw ------------------------------------------------------------

// AP-NL-profielpatronen — bewust AP-NL-aware (besluit eigenaar, aug 2026: het
// Doel-patroon en de Agreement↔Offer-koppeling mogen in de viewer), maar de
// detectie staat op ÉÉN plek in plaats van verspreid over vijf. Dit object is
// de kandidaat voor de toekomstige declaratieve UI-shape-laag (laag 2, zie
// notes/analyse-schema-gedreven-editors.md §8): wat hier hard staat, wordt
// dan een profieldeclaratie die de viewer inleest.
export const PROFILE_PATTERNS = {
  // Doel-patroon: een permission mét action-refinement op deze leftOperand
  // is een "Doel" (drietraps); de detectie zelf is ODRL-kern, de verheffing
  // tot naamgevend begrip is AP-NL.
  purposeLeftOperand: ODRL + 'purpose',
  // Drietraps-koppeling Agreement→Offer: prov:wasDerivedFrom (MOET,
  // niveau-2-shape) — één predicaat, meer niet. Het predicaat draagt óók
  // andere verwijzingen (grondslag, documenten); alleen doelen die een bekend
  // Offer zijn tellen als koppeling. Het historische duplicaat dct:references
  // naar hetzelfde aanbod is uit het profiel geschrapt (zie
  // sections/conformance.md); dct:references blijft elders gewoon in gebruik
  // voor documentverwijzingen, alleen niet als policy-koppeling.
  agreementOfferPreds: [PROV + 'wasDerivedFrom'],
  // Verzoek→Overeenkomst: langs DEZELFDE relatie loopt ook de herkomst uit
  // het VERZOEK (odrl:Request) dat tot de overeenkomst leidde. Een
  // wasDerivedFrom-doelwit kent daarmee drie soorten: een Offer (het
  // ingevulde aanbod), een Request (het verzoek) en al het overige
  // (bron-besluit, wet, PDF). Ze worden GENERIEK uit elkaar gehouden door de
  // rdf:type-check — precies zoals de Offer-route dat al deed — zodat geen van
  // de drie voor een van de andere wordt aangezien.
  agreementRequestPreds: [PROV + 'wasDerivedFrom'],
  // Verzoek→Aanbod: de VIERDE weergave van hetzelfde predicaat, en de derde
  // regel uit de betekenistabel van de note (§4): staat er een odrl:Offer
  // achter de prov:wasDerivedFrom van een odrl:Request, dan betekent die link
  // "het verzoek vraagt dit aanbod aan". Zelfde vorm als agreementOfferPreds —
  // het predicaat zegt niets, de typering van het DOELWIT (odrl:Offer) geeft
  // de link zijn betekenis; wat de BRON is (Agreement of Request) kiest tussen
  // "Vult aanbod in" en "vraagt … aan".
  requestOfferPreds: [PROV + 'wasDerivedFrom'],
  // Alleen voor OPRUIMEN bij het omhangen van de koppeling in de editor:
  // bestanden van vóór de schoning dragen het duplicaat dct:references naar
  // hetzelfde aanbod. Dat wordt bij het herschrijven weggehaald — en nooit
  // meer geschreven. Als LEESroute telt het niet mee.
  legacyAgreementOfferPreds: [DCT + 'references'],
  // Wat als verzoek telt: de ODRL-kernklasse, plus alles wat de graaf er via
  // rdfs:subClassOf onder hangt (zie requestClasses()).
  requestClasses: [ODRL + 'Request'],
  // Dekking (zie sections/conforms-to-policy.md, "Dekking"): een knoop
  // verklaart met prov:wasDerivedFrom van welke LOGISCHE regels hij de
  // uitwerking is — dezelfde richting en hetzelfde predicaat als
  // Agreement→Offer. dct:references telt bewust NIET als dekking (zwakkere
  // verwijzing, zie de spec).
  coveragePreds: [PROV + 'wasDerivedFrom'],
  // Wat als REGEL telt — het doelwit-criterium van de dekking (linkdoctrine
  // van de Visualisatie-note: een link is gedefinieerd door predicaat +
  // typering van het DOELWIT, niet door wat de bron toevallig is). Deze twee
  // lijsten zijn wat de dekkingsdetectie nodig heeft; een klassenlijst van
  // "dekkers" bestaat niet meer.
  ruleClasses: [ODRL + 'Permission', ODRL + 'Prohibition', ODRL + 'Duty'],
  // Regelposities: hangt de knoop hieraan, dan is hij een regel ook zonder
  // eigen rdf:type (ODRL leidt het type uit de positie af).
  rulePreds: [ODRL + 'permission', ODRL + 'prohibition', ODRL + 'obligation', ODRL + 'duty'],
  // Wat als BENOEMDE VOORWAARDE telt — het tweede dekkingsdoel naast de regel.
  // Een bundel werkt in de praktijk vooral VOORWAARDEN uit ("alleen voor dit
  // doel", "hoogstens 30 dagen"); dat de regel bestaat (het KADER: assignee,
  // actie, doelobject) is maar de helft van het verhaal. Zelfde linkdoctrine:
  // predicaat + typering van het doelwit. Een voorwaarde is dekbaar als zij
  // (a) een IRI draagt — anders is zij niet aanhaalbaar in protocollering,
  // precies de eis die odrl:uid bij een regel stelt — én (b) in
  // odrl:constraint-/odrl:refinement-positie hangt (van een regel, een actie
  // of een collectie) én (c) als odrl:Constraint/odrl:LogicalConstraint (of
  // een subklasse daarvan) getypeerd is.
  constraintClasses: [ODRL + 'Constraint', ODRL + 'LogicalConstraint'],
  constraintPreds: [ODRL + 'constraint', ODRL + 'refinement'],
  // Wat als machine-uitvoerbaar artefact telt — UITSLUITEND voor de
  // artefact-sectie ("Machine-uitvoerbaar beleid"): dát is profielkennis over
  // wélke knopen als artefactkaart getoond worden. De DEKKING gebruikt deze
  // lijst sinds aug 2026 niet meer (zie annotateCoverage).
  artifactClasses: [APNL + 'PolicyArtifact', APNL + 'RegoModule', APNL + 'CedarPolicySet', APNL + 'OpenFGAModel'],
  bundleClass: APNL + 'PolicyBundle',
  // GESCHRAPT (aug 2026): apnl:TechnischToetsbaar, de marker op een LEFT
  // OPERAND ("kan een beslispunt deze grootheid uberhaupt zien?"). Zij is uit
  // het profiel verdwenen en het model kent haar niet meer. De vraag "wat mag ik
  // van deze voorwaarde verwachten?" wordt beantwoord door de twee markers
  // hieronder, op de VOORWAARDE zelf: een uitspraak over de grootheid is
  // globaal, terwijl toetsbaarheid per beslispunt verschilt.
  //
  // DE TWEE MARKERS OP EEN VOORWAARDE, geleend uit DPV (Data Privacy
  // Vocabulary, W3C DPVCG). Zelfde punning als qb:DimensionProperty: een extra
  // rdf:type op de constraint-instantie. Zie de Visualisatie-note §7.
  //
  //   dpv:TechnicalMeasure      — deze voorwaarde IS de technische borging: zij
  //                               delegeert naar wat haar IRI-rightOperand
  //                               noemt, draagt daarom de realisatielinks, is
  //                               nooit zelf dekkingsdoel en telt niet mee in
  //                               de status van haar regel;
  //   dpv:OrganisationalMeasure — buiten de techniek geborgd: zij geldt
  //                               onverkort en blijft volledig zichtbaar, maar
  //                               er valt niets uit te werken, dus telt zij
  //                               evenmin mee.
  //
  // Een ONGEMARKEERDE benoemde voorwaarde is gewone normatieve inhoud en telt
  // wél mee: "volledig afgedwongen" betekent daarmee precies "alles wat
  // technisch hoort te kunnen, is gerealiseerd".
  technicalMeasureClass: DPV + 'TechnicalMeasure',
  organisationalMeasureClass: DPV + 'OrganisationalMeasure',
  // TERUGVAL voor data zonder markers: in ODRL-AP-NL is de technische borging
  // de conformsToPolicy-refinement, herkenbaar aan haar operator. Datasets van
  // vóór de markers (Breda, voorbeeld 3 en 7) blijven daarmee identiek werken.
  conformsToOperator: APNL + 'conformsToPolicy',
};

// Actie als string-literal (komt voor in DSP-JSON: `"odrl:action": "odrl:use"`
// zonder geëxpandeerde context): maak er waar mogelijk een IRI van.
function actionIriFromLiteral(value) {
  const v = String(value).trim();
  if (/^https?:\/\//.test(v) || v.startsWith('urn:')) return v;
  const colon = v.indexOf(':');
  if (colon > 0) {
    const ns = prefixNamespace(v.slice(0, colon));
    if (ns) return ns + v.slice(colon + 1);
  }
  return v; // kale naam: toon als naam
}

// rdf:type van een getypeerde actie-knoop (bv. `odrl:action [ a md:Distribute ]`),
// met voorbijgaan aan het generieke odrl:Action-type.
function actionTypeIri(store, actionTerm) {
  return typesOf(store, actionTerm).find((t) => t !== ODRL + 'Action') || null;
}

// Weergavenaam voor een actie-knoop zonder benoembare waarde: labelFor levert
// bij een naamloze, typeloze blanknode "(anoniem)"; in actie-positie is
// "(anonieme actie)" duidelijker.
function anonymousActionLabel(store, nodeTerm) {
  const l = labelFor(store, nodeTerm);
  return l === t('anon') ? t('anonAction') : l;
}

// Lees de action van een permission: kan een IRI zijn, een string-literal, of
// een node met rdf:value + refinement (doelbinding) dan wel alleen een rdf:type.
function readAction(store, permTerm) {
  const actionTerm = obj(store, permTerm, ODRL + 'action');
  if (!actionTerm) return { value: null, refinements: [], nodeTerm: null };
  if (isLiteral(actionTerm)) {
    return { value: actionIriFromLiteral(actionTerm.value), refinements: [], nodeTerm: null };
  }
  if (actionTerm.termType === 'NamedNode') {
    // Kan zowel een directe actie-IRI zijn als een node met eigen triples.
    const rdfVal = obj(store, actionTerm, RDF + 'value');
    if (!rdfVal && !subjectPredMap(store, actionTerm)) {
      return { value: actionTerm.value, refinements: [], nodeTerm: null };
    }
  }
  const rdfVal = obj(store, actionTerm, RDF + 'value');
  const refinements = objs(store, actionTerm, ODRL + 'refinement');
  if (rdfVal || refinements.length) {
    return {
      value: rdfVal ? rdfVal.value : (actionTerm.termType === 'NamedNode' ? actionTerm.value : null),
      refinements,
      nodeTerm: actionTerm,
    };
  }
  // Getypeerde blanknode zonder rdf:value: gebruik de rdf:type als actienaam
  // (`odrl:action [ a md:Distribute ; ... ]`).
  if (actionTerm.termType === 'BlankNode') {
    const typeIri = actionTypeIri(store, actionTerm);
    if (typeIri) return { value: typeIri, refinements: [], nodeTerm: actionTerm };
  }
  return { value: actionTerm.termType === 'NamedNode' ? actionTerm.value : null, refinements: [], nodeTerm: null };
}

// Vind de purpose-refinement (PROFILE_PATTERNS.purposeLeftOperand) van een action.
// `rights` draagt ALLE rechterwaarden van die refinement, niet alleen de eerste:
// de weergave toont er één, maar de groepering moet kunnen zien dat er meer dan
// één staat (een regel met twee doelen heeft geen eenduidige groepswaarde — zie
// dimensionValue).
function purposeOfAction(store, refinements) {
  for (const r of refinements) {
    const left = obj(store, r, ODRL + 'leftOperand');
    if (left && left.value === PROFILE_PATTERNS.purposeLeftOperand) {
      const rights = [
        ...objs(store, r, ODRL + 'rightOperand'),
        ...objs(store, r, ODRL + 'rightOperandReference'),
      ];
      const op = obj(store, r, ODRL + 'operator');
      return { term: r, purpose: rights[0] || null, operator: op, rights };
    }
  }
  return null;
}

// Verzamel de predicaten die als target tellen: odrl:target, alle
// rdfs:subPropertyOf odrl:target uit de graaf (domeinprofiel als data).
// Target-predicaten komen uit de graaf: odrl:target plus alles wat een
// (geladen) domeinprofiel als rdfs:subPropertyOf odrl:target declareert.
// Géén hardcoded domeintermen — die kennis hoort als data mee te komen.
// (Geëxporteerd: ook edit.js gebruikt uitsluitend deze afleiding, C4.)
export function targetPredicates(store) {
  const preds = new Set([ODRL + 'target']);
  for (const q of store.getQuads(null, namedNode(RDFS + 'subPropertyOf'), namedNode(ODRL + 'target'), null)) {
    preds.add(q.subject.value);
  }
  return [...preds];
}

// `caches` (optioneel, { target, action, purpose, agent }: Maps): binnen één
// buildModel-run worden descriptors per uniek term-id gedeeld. BRP deelt
// dezelfde gegevenssets/acties/doelen/afnemers over tienduizenden
// permissions; zonder deling kreeg elke permission zijn eigen kopie
// (ledenlijsten en labels incluis) — zwaar in bouwtijd, geheugen én in de
// structured clone over de worker-grens (die gedeelde referenties juist
// dedupliceert).
// --- Stabiele volgorde van regels binnen een policy -------------------------
// De leesvolgorde mag niet afhangen van de volgorde waarin triples in de store
// belandden: in ?sparql=-modus wordt een detail-CONSTRUCT later bijgeladen, en
// dan wisselden de toestemmings-rijen bij elke versiewissel van plek. Daarom
// sorteren we op wat de gebruiker ziet (de rijnaam), met semantische
// tiebreakers; bij gelijke sleutels blijft de oorspronkelijke volgorde staan.
function ruleName(r) {
  if (!r) return '';
  if (r.title) return r.title;
  const a = r.action;
  if (a) return a.label || a.curie || a.iri || '';
  return '';
}
function ruleSortKey(r) {
  const a = r.action || {};
  const p = r.purpose || {};
  const t = (r.targets && r.targets[0]) || {};
  const naam = ruleName(r).toLocaleLowerCase(getLang());
  return [
    // Regels zonder naam (verse, nog lege regels in de editor) horen achteraan
    // te blijven staan, niet bovenaan de kaart te springen.
    naam ? '0' : '1',
    naam,
    a.iri || '',
    p.iri || p.label || '',
    t.iri || '',
    r.iri || '',
  ];
}
export function sortRules(list) {
  return (list || [])
    .map((r, i) => [r, i])
    .sort((x, y) => {
      const kx = ruleSortKey(x[0]);
      const ky = ruleSortKey(y[0]);
      for (let i = 0; i < kx.length; i++) {
        if (kx[i] !== ky[i]) return kx[i] < ky[i] ? -1 : 1;
      }
      return x[1] - y[1]; // volledig gelijk: bronvolgorde behouden (stabiel)
    })
    .map(([r]) => r);
}

// --- Geneste regelgroepen: gestuurd door qb:DimensionProperty in de BRON -------
// Bij een fijnmazige modellering staan binnen EEN policy tientallen permissions
// naast elkaar die alleen in hun refinements verschillen (de doorsnede
// doel x kanaal x gegevensset, cel voor cel). Plat naast elkaar herhaalt de
// weergave dan n keer hetzelfde doel.
//
// WELKE refinement-dimensie de leesorde bepaalt, is domeinkennis en staat
// daarom in de graaf, niet in deze code. De markering is een BESTAANDE
// W3C-term en geen eigen uitvinding: een odrl:LeftOperand die in de bron
// `a qb:DimensionProperty` (RDF Data Cube, W3C Rec 2014) draagt, declareert
// daarmee dat regels met dezelfde rightOperand-waarde voor die left operand
// samen een niveau vormen. Het is een MERKTEKEN zonder parameters: geen rang,
// geen volgorde, geen drempel. Een bron ZONDER zulke declaraties groepeert
// niet en rendert precies als voorheen. Er zit geen odrl:purpose- of
// BRP-kennis in de groepering; dat odrl:purpose in het proefmateriaal de
// dimensie is, zegt de data.
//
// PUNNING-KANTTEKENING. qb:DimensionProperty is een subklasse van
// rdf:Property, terwijl ODRL-left-operands INDIVIDUEN zijn (de left operand
// staat als object van odrl:leftOperand). De declaratie is dus een bewuste,
// onschadelijke punning: geen OWL-DL-reasoner in deze keten leidt er iets uit
// af, en de bedoeling ("dit is de ordenende dimensie") is precies die van
// qb:DimensionProperty. Overwogen alternatieven: een EIGEN klasse in een
// odrlvis:-vocabulaire (afgevallen — een nieuwe term verzinnen voor iets dat
// een W3C-Recommendation al benoemt, met een namespace die nog niet resolvet)
// en owl:hasKey (afgevallen — identiteitssemantiek waarop een reasoner regels
// juist mag SAMENVOEGEN, klasse-gebonden in plaats van left-operand-gebonden,
// en zonder enige weergavebedoeling).
//
// MEERDERE DIMENSIES: declareert een bron er meer dan één, dan bepaalt
// `sh:order` op de dimensie de NESTVOLGORDE — buitenste niveau = laagste
// order:
//
//     odrl:purpose a qb:DimensionProperty ; sh:order 1 .
//
// Ook dat is weer een BESTAANDE W3C-term (SHACL, W3C Rec 2017), waar hij
// precies hetzelfde doet: de volgorde waarin dingen aan de lezer verschijnen.
// Geen eigen vocabulaire, geen tweede merkteken naast qb:DimensionProperty —
// de declaratie blijft één regel per dimensie.
//
// Dimensies ZONDER sh:order houden het oude gedrag: ze komen ná de geordende
// dimensies, onderling stabiel op IRI. Zo blijft een bron die alleen
// qb:DimensionProperty gebruikt precies renderen zoals voorheen, en is
// sh:order een zuivere toevoeging.
//
// De volgorde die hier uitkomt is de STANDAARD-nestvolgorde van de bron. De
// lezer mag hem in de viewer omdraaien (de pivot-control in de filter-foldout,
// ?groupby=); die keuze is weergave en raakt de bron niet.
//
// Wat de broers binnen een niveau ONDERLING onderscheidt (de niet-gedeclareerde
// refinements, voorwaarden, actie, target) levert het label van de bladrij:
// zie variantLabels.

// Interne scheider in samengestelde sleutels; nooit zichtbaar, alleen bedoeld
// om te voorkomen dat twee losse waarden per ongeluk tot dezelfde sleutel
// aaneenplakken.
const KEY_SEP = String.fromCharCode(1);

// De identiteit van een dimensie: waaraan meten we of twee broers verschillen?
// De leftOperand (of, bij een geonl:featureProperty-constraint, de property);
// bij een samengestelde/logische constraint zonder leftOperand valt hij terug
// op de zin zelf - die is dan het enige stabiele merkteken.
function constraintDimKey(c) {
  if (!c) return '';
  if (c.left) return 'L:' + c.left;
  if (c.property) return 'P:' + c.property;
  return 'S:' + (c.sentence || '');
}
// De WAARDE binnen die dimensie. Operator telt mee: "doel eq X" en
// "doel neq X" zijn niet dezelfde variant.
function constraintDimValue(c) {
  const right = [...(c.right || []), ...(c.rightOperandReference || [])];
  return (c.operator || '') + '|' + (right.length ? right.join(KEY_SEP) : (c.sentence || ''));
}
// De TEKST waarmee de variant in de UI benoemd wordt: bij voorkeur alleen de
// rechterkant ("ad hoc verstrekking"), want de linkerkant is per dimensie
// gelijk en zou in elke rij hetzelfde woord herhalen. Draagt de constraint een
// eigen rdfs:label, dan wint dat (de bron heeft hem dan zelf benoemd).
function constraintDimText(c) {
  const texts = c.slots && c.slots.right && c.slots.right.texts;
  if (texts && texts.length) return texts.join(', ');
  return c.label || c.sentence || '';
}

// Scheider tussen de dimensies in een variantnaam ("kanaal - doelgroep").
// Bewust een middenpunt en geen streepje: een streepje komt in labels zelf voor.
export const VARIANT_SEP = ' · ';

// De naam van een NIVEAU (de left operand zelf, "Doel"/"Verstrekkingskanaal").
// Data wint: het rdfs:label/skos:prefLabel uit de geladen bron. Pas daarna het
// zinwoord uit de stringtabel voor ODRL-kerntermen, en als laatste de
// localName - dezelfde ladder als elders, alleen in deze volgorde omdat een
// bron die een dimensie DECLAREERT hem ook mag benoemen.
function leftOperandLabel(store, term) {
  const lab = pickLiteral(objs(store, term, RDFS + 'label'))
    || pickLiteral(objs(store, term, PREFIXES.skos + 'prefLabel'))
    || pickLiteral(objs(store, term, DCT + 'title'));
  return lab || leftOperandWord(term.value) || localName(term.value);
}

// Lees de groeperingsdimensies uit de graaf: elke term die `a
// qb:DimensionProperty` draagt EN in de graaf ook echt als odrl:leftOperand
// wordt gebruikt. Die tweede eis houdt een graaf die de RDF-Data-Cube-term in
// zijn eigenlijke betekenis gebruikt (een kubusdimensie-property) buiten de
// weergavelogica: alleen een LEFT OPERAND kan regels groeperen.
//
// De volgorde: eerst de dimensies MET sh:order (oplopend — laagste order is het
// buitenste niveau), daarna de dimensies zonder, onderling op IRI. Die tweede
// helft is stabiel (niet afhankelijk van de triple-volgorde in de bron) maar
// verder ongespecificeerd, precies zoals vóór sh:order het hele gedrag was.
// Twee dimensies met dezelfde sh:order vallen ook op IRI terug.
//
// sh:order mag elk numeriek literal zijn (SHACL laat dat vrij: xsd:integer,
// xsd:decimal, …); een onleesbare waarde telt als "geen order".
export function groupingDimensions(store) {
  const isLeftOperand = new Set(
    store.getQuads(null, namedNode(ODRL + 'leftOperand'), null, null)
      .map((q) => q.object.value),
  );
  const seen = new Map();
  for (const q of store.getQuads(null, namedNode(RDF + 'type'), namedNode(QB + 'DimensionProperty'), null)) {
    if (q.subject.termType !== 'NamedNode') continue;
    if (!isLeftOperand.has(q.subject.value)) continue;
    if (seen.has(q.subject.value)) continue;
    seen.set(q.subject.value, {
      iri: q.subject.value, curie: curie(q.subject.value),
      label: leftOperandLabel(store, q.subject),
      order: shOrder(store, q.subject),
    });
  }
  return [...seen.values()].sort(byDeclaredOrder);
}

// De sh:order van een dimensie, of null als de bron er geen (leesbare) geeft.
// Meer dan één sh:order op dezelfde term is een tegenstrijdige bron; de laagste
// wint, zodat het resultaat niet van de triple-volgorde afhangt.
function shOrder(store, term) {
  let best = null;
  for (const o of objs(store, term, SH + 'order')) {
    if (o.termType !== 'Literal') continue;
    const n = Number(o.value);
    if (!Number.isFinite(n)) continue;
    if (best === null || n < best) best = n;
  }
  return best;
}

// Sorteersleutel van de gedeclareerde nestvolgorde; ook de pivot-control in de
// viewer valt hierop terug als de lezer zijn eigen volgorde weer loslaat.
export function byDeclaredOrder(a, b) {
  const ao = a.order == null ? Infinity : a.order;
  const bo = b.order == null ? Infinity : b.order;
  if (ao !== bo) return ao < bo ? -1 : 1;
  return a.iri < b.iri ? -1 : (a.iri > b.iri ? 1 : 0);
}

// --- Pivot: de LEZER kiest de groepering --------------------------------------
// De bron declareert WELKE dimensies groeperen en in welke volgorde (sh:order
// hierboven). De lezer mag daar zijn eigen leesvolgorde van maken: dimensies
// uitzetten (dan verdwijnt dat niveau) en aanzetten in de volgorde die hij wil
// (de activeringsvolgorde is de nestvolgorde). Alles uit is een geldige stand:
// dan is de lijst plat. Dat is puur weergave: dezelfde regels, andere as. De
// keuze reist in de URL (?groupby=) en niet in de bron.

// De ACTIEVE dimensies, in nestvolgorde (buitenste eerst). `wanted` kent drie
// standen, en het onderscheid tussen de eerste twee is precies het verschil
// tussen "de lezer heeft niets gekozen" en "de lezer heeft alles uitgezet":
//   - null/undefined  -> de gedeclareerde volgorde (alles aan);
//   - lege lijst      -> [] : geen groepering, een platte lijst;
//   - een lijst namen -> die dimensies, in die volgorde. Onbekende namen en
//     herhalingen worden genegeerd en wat er NIET in staat, staat uit — het
//     schuift niet meer achteraan.
// Namen mogen curies of IRI's zijn. Levert een NIET-lege wens niets bruikbaars
// op (alleen namen die deze bron niet kent — een verouderde link), dan valt de
// weergave terug op de DECLARATIE: de lezer bedoelde wél te groeperen, dus hem
// een platte lijst geven zou zijn wens juist omkeren. Een verouderde link kan
// de weergave dus niet stukmaken.
export function pivotDimensions(dims, wanted) {
  const list = [...(dims || [])].sort(byDeclaredOrder);
  if (wanted == null) return list;
  const names = [...wanted].map((x) => String(x || '').trim()).filter(Boolean);
  if (!names.length) return [];
  const out = [];
  const taken = new Set();
  for (const n of names) {
    const d = list.find((x) => !taken.has(x.iri) && (x.curie === n || x.iri === n));
    if (!d) continue;
    taken.add(d.iri);
    out.push(d);
  }
  return out.length ? out : list;
}


// De refinement-dimensies van EEN regel. De doelbinding zit in het model in een
// eigen veld (rule.purpose, uit purposeOfAction) en niet meer in rule.refinements;
// voor de dimensiebepaling telt hij gewoon mee als de refinement die hij is.
function ruleDimensions(rule) {
  const list = [...((rule && rule.refinements) || [])];
  const p = rule && rule.purpose;
  if (p && p.iri) {
    list.unshift({
      leftIri: PROFILE_PATTERNS.purposeLeftOperand, left: 'odrl:purpose',
      operator: p.operator || null,
      // ALLE rechterwaarden, niet alleen de getoonde: zie dimensionValue.
      right: (p.rightCuries && p.rightCuries.length) ? p.rightCuries : [p.curie || p.iri],
      rightRefs: (p.rightIris && p.rightIris.length) ? p.rightIris : [p.iri],
      rightOperandReference: [], slots: { right: { texts: [p.label] } },
    });
  }
  return list;
}

// GROEPSLIDMAATSCHAP MOET EENDUIDIG ZIJN. Een regel doet alleen mee aan een
// niveau als zijn waarde op de gedeclareerde dimensie ONBETWISTBAAR is:
//   * precies ÉÉN refinement op die left operand (twee refinements op dezelfde
//     dimensie zeggen niet welke van beide de regel plaatst);
//   * operator odrl:eq (bij isAnyOf, gt, neq … staat er geen waarde maar een
//     verzameling of een grens — daar valt geen groepskop uit af te leiden);
//   * precies ÉÉN rechteroperand (een lijst rechterwaarden hoort in meer dan
//     één groep tegelijk, en dat kan een boom niet).
// Een regel die dat schendt — of de dimensie helemaal mist — blijft ONGEGROEPEERD
// in de gewone lijst staan. Bewust NIET gokken (de eerste waarde nemen) en
// bewust GEEN "overig"-groep: een verzamelbak zou een groep suggereren die de
// bron niet declareert, en de gewone rij is precies wat zo'n regel was voordat
// er ergens gegroepeerd werd.
const EQ_OPERATORS = new Set(['odrl:eq', ODRL + 'eq']);

function dimensionValue(rule, dimIri) {
  const hits = ruleDimensions(rule).filter((c) => c.leftIri === dimIri);
  if (hits.length !== 1) return null;
  const c = hits[0];
  if (!EQ_OPERATORS.has(c.operator)) return null;
  const rights = [...(c.right || []), ...(c.rightOperandReference || [])];
  if (rights.length !== 1) return null;
  return {
    key: constraintDimValue(c),
    iri: (c.rightRefs || [])[0] || null,
    curie: (c.right || [])[0] || null,
    label: constraintDimText(c),
  };
}

// Verzamel per dimensie de waarde van elke broer en houd de dimensies over
// waarin de broers ONDERLING verschillen. Ontbreken telt als eigen waarde: een
// broer zonder kanaal-refinement verschilt van een broer met kanaal.
function varyingDims(rules, extract) {
  const dims = new Map();
  rules.forEach((r, i) => {
    for (const c of extract(r) || []) {
      const k = constraintDimKey(c);
      if (!k) continue;
      if (!dims.has(k)) dims.set(k, { order: dims.size, per: new Map() });
      const d = dims.get(k);
      const prev = d.per.get(i);
      // Twee refinements met dezelfde leftOperand op een regel: samen een waarde.
      d.per.set(i, prev
        ? { value: prev.value + KEY_SEP + constraintDimValue(c), text: `${prev.text}, ${constraintDimText(c)}` }
        : { value: constraintDimValue(c), text: constraintDimText(c) });
    }
  });
  return [...dims.values()]
    .filter((d) => d.per.size < rules.length
      || new Set([...d.per.values()].map((v) => v.value)).size > 1)
    .sort((a, b) => a.order - b.order);
}

// Het label van een variant: de tekst die hij in elke VERSCHIL-dimensie draagt,
// in bronvolgorde, met VARIANT_SEP ertussen. De ladder wordt alleen zo lang als
// nodig - zodra elke broer een eigen naam heeft stopt hij. Zonder die stop zou
// in een corpus met een gegevensset per regel elke rijkop de hele setnaam
// herhalen.
//   1. de verschil-refinements (in het proefmateriaal: de doelgroep);
//   2. daarbij de verschil-voorwaarden (odrl:constraint);
//   3. daarbij de actie, nu voor elke broer;
//   4. daarbij het target - het laatste redmiddel tegen twee gelijke namen.
// Uitzondering op laag 1: een broer die in een verschil-dimensie NIETS heeft
// zou juist door die afwezigheid benoemd worden, en een gat kun je niet lezen.
// Zijn ACTIE vult het gat: wat hij DOET is dan het onderscheid.
// `skip` bevat de left-operand-curies die een omhullend groepsniveau al toont
// (de gedeclareerde dimensies); die horen niet nog eens in de rijnaam.
export function variantLabels(rules, skip) {
  const list = rules || [];
  const skipped = new Set(skip || []);
  const asDim = (key, value, text) => ({
    left: key, operator: '', right: [value || ''], slots: { right: { texts: [text || ''] } },
  });
  const unranked = (r) => (r.refinements || []).filter((c) => !skipped.has(c.leftIri));
  const refDims = varyingDims(list, unranked);
  const conDims = varyingDims(list, (r) => r.constraints || []);
  const actionDim = varyingDims(list, (r) => (r.action
    ? [asDim('action', r.action.iri || r.action.label, r.action.label || r.action.curie)] : []));
  const targetDim = varyingDims(list, (r) => (r.targets || [])
    .map((tg) => asDim('target', tg.iri || tg.label, tg.label || tg.curie)));

  const actionText = (r) => (r.action ? (r.action.label || r.action.curie || '') : '');
  const hasGap = (i) => refDims.some((d) => !d.per.has(i));
  const build = (dims, actionMode) => list.map((r, i) => {
    const parts = [];
    if ((actionMode === 'all' || (actionMode === 'gap' && hasGap(i))) && actionText(r)) {
      parts.push(actionText(r));
    }
    for (const d of dims) {
      const v = d.per.get(i);
      if (v && v.text) parts.push(v.text);
    }
    return parts.join(VARIANT_SEP);
  });
  const unique = (labels) => new Set(labels.filter(Boolean)).size === labels.length;

  const withAction = actionDim.length ? 'all' : 'gap';
  const ladder = [
    [refDims, 'gap'],
    [[...refDims, ...conDims], 'gap'],
    [[...refDims, ...conDims], withAction],
    [[...refDims, ...conDims, ...targetDim], withAction],
  ];
  let labels = build(...ladder[0]);
  for (const step of ladder.slice(1)) {
    if (unique(labels)) break;
    labels = build(...step);
  }
  // Blijft een rij naamloos (geen enkele verschil-dimensie), dan is de eigen
  // titel van de regel de beste naam die de bron heeft.
  return list.map((r, i) => labels[i] || r.title || actionText(r) || '');
}

// Bouw de geneste weergavestructuur voor de regels van EEN policy.
// Retourneert een lijst knopen, in bronvolgorde:
//   { kind: 'rule',  rule, label }   - een bladrij. label is null op het
//                                      buitenste niveau buiten elke groep: dan
//                                      houdt de rij precies de naam die hij
//                                      voorheen had (het ongewijzigde pad).
//   { kind: 'group', dim, value, rules, children }
//                                    - een niveau: `dim` is de gedeclareerde left
//                                      operand (met zijn naam), `value` de
//                                      gedeelde rightOperand-waarde.
// `dims` komt uit groupingDimensions(store); zonder declaraties is het resultaat
// exact de platte lijst van voorheen.
export function groupRules(rules, dims) {
  return buildLevel(rules || [], dims || [], 0, false, []);
}

function leafNodes(rules, inGroup, skip) {
  if (!inGroup) return rules.map((rule) => ({ kind: 'rule', rule, label: null }));
  const labels = variantLabels(rules, skip);
  return rules.map((rule, i) => ({ kind: 'rule', rule, label: labels[i] || null }));
}

const NO_VALUE = String.fromCharCode(0);

function buildLevel(rules, dims, level, inGroup, skip) {
  if (level >= dims.length || !rules.length) return leafNodes(rules, inGroup, skip);
  const dim = dims[level];
  const order = [];
  const by = new Map();
  for (const r of rules) {
    const v = dimensionValue(r, dim.iri);
    const key = v ? v.key : NO_VALUE;
    if (!by.has(key)) { by.set(key, { key, value: v, rules: [] }); order.push(key); }
    by.get(key).rules.push(r);
  }
  // Vóór aug 2026 stond hier een vangrail: een niveau deed alleen mee als de
  // dimensie de regels "echt ordende" (twee waarden, of één waarde met meer dan
  // één regel). Die is VERVALLEN (besluit eigenaar): zodra de bron een dimensie
  // DECLAREERT, is dat de uitspraak dat de regels erlangs geordend horen te
  // worden — dan hoort een doel met één regel dezelfde groepskaart te krijgen
  // als een doel met vijf, anders leest dezelfde structuur op twee manieren.
  // Wat wél een platte rij blijft is een regel ZONDER eenduidige waarde op deze
  // dimensie (key === NO_VALUE hieronder): daar valt niets te koppen.
  const deeper = [...skip, dim.iri];
  const nodes = [];
  for (const key of order) {
    const b = by.get(key);
    // Regels zonder EENDUIDIGE waarde op deze dimensie krijgen geen groepskop
    // (er valt niets te koppen) maar zakken door naar het volgende niveau —
    // dat zijn zowel de regels die de dimensie missen als de regels die haar
    // dubbelzinnig dragen (zie dimensionValue). Ze blijven dus gewone rijen in
    // de lijst, naast de groepen; geen "overig"-verzamelbak.
    if (key === NO_VALUE) {
      nodes.push(...buildLevel(b.rules, dims, level + 1, inGroup, skip));
      continue;
    }
    nodes.push({
      kind: 'group', dim, value: b.value, rules: b.rules,
      children: buildLevel(b.rules, dims, level + 1, true, deeper),
    });
  }
  return nodes;
}

function readPermission(store, permTerm, targetPreds, caches) {
  const preds = targetPreds || targetPredicates(store);
  const action = readAction(store, permTerm);
  const purpose = purposeOfAction(store, action.refinements);
  // De DOELBINDING is óók een voorwaarde, en een BENOEMDE doel-refinement is
  // dus net zo dekbaar as elke andere. Zij staat niet in `refinements` (zij
  // heeft sinds de spec-correctie haar eigen veld `purpose`), en zou daarmee
  // buiten de dekkingsrekening vallen — terwijl juist de doelbinding het
  // beslispunt is dat een bundel als eerste afdwingt. Daarom draagt de regel
  // haar hier apart mee, mét dezelfde zin-/slot-structuur als elke andere
  // voorwaarde, zodat de dekkingsweergave haar kan tekenen.
  const purposeConstraint = purpose && purpose.term && purpose.term.termType === 'NamedNode'
    ? { term: purpose.term, ...constraintSentence(store, purpose.term) } : null;
  // Overige action-refinements naast de doelbinding — sinds de spec-correctie
  // staat óók de conformsToPolicy-toets als refinement op de action.
  const refinements = action.refinements
    .filter((r) => !(purpose && purpose.term === r))
    .map((r) => ({
      term: r, ...constraintSentence(store, r),
      conformsTo: readConformsTo(store, r),
    }));
  const targetSeen = new Set();
  const targets = [];
  for (const pred of preds) {
    for (const t of objs(store, permTerm, pred)) {
      if (targetSeen.has(t.value)) continue;
      targetSeen.add(t.value);
      const cached = caches && caches.target.get(t.id);
      if (cached) { targets.push(cached); continue; }
      // Een target kan een COLLECTIE zijn (odrl:AssetCollection, BRP: de
      // geautoriseerde rubrieken/groepen/categorieën). Zowel de opgesomde
      // leden (extensioneel, zie collectionMembers: odrl:partOf én de oude
      // dct:hasPart-conventie) als een intensionele definitie via
      // odrl:refinement komen hier mee; de UI groepeert de ledenlijst op
      // rdf:type van het lid (groupCollectionMembers, audit-punt C1).
      const desc = {
        iri: t.value, curie: curie(t.value), label: labelFor(store, t),
        desc: descOfTerm(store, t),
        // Anonieme collecties (DOME zet de hele collectie als blanke knoop in
        // de regel) hebben geen bruikbare IRI: de inspecteur moet dan op de
        // TERM aangesproken worden, niet op t.value (een intern parser-id).
        anon: t.termType !== 'NamedNode', term: t,
        ...collectionRef(store, t),
      };
      if (caches && t.termType === 'NamedNode') caches.target.set(t.id, desc);
      targets.push(desc);
    }
  }
  const constraints = objs(store, permTerm, ODRL + 'constraint').map((c) => ({
    term: c, ...constraintSentence(store, c),
    conformsTo: readConformsTo(store, c),
  }));
  const duties = objs(store, permTerm, ODRL + 'duty').map((d) => readDuty(store, d));
  const shown = new Set([
    RDF + 'type', ODRL + 'action', ODRL + 'constraint', ODRL + 'duty',
    ODRL + 'uid', ODRL + 'assignee', ODRL + 'assigner',
    DCT + 'title', DCT + 'description', RDFS + 'label', RDFS + 'comment',
    PROV + 'wasDerivedFrom', DCT + 'references',
    // De vindplaats krijgt hieronder een eigen veld (met paginanummer en
    // brondocument) en een eigen regel op de kaart; als "overige eigenschap"
    // zou hij een kale, onklikbare IRI blijven.
    PROV + 'hadPrimarySource',
    ...preds,
  ]);
  return {
    extraProps: extraProperties(store, permTerm, shown),
    // Vindplaats: waar in het brondocument deze regel staat (zie
    // sourceLocationRef). Meerdere is toegestaan — een regel kan uit meer dan
    // één plek in het besluit zijn afgeleid.
    primarySources: objs(store, permTerm, PROV + 'hadPrimarySource')
      .filter((o) => o.termType === 'NamedNode')
      .map((o) => sourceLocationRef(store, o)),
    // Afnemer op de REGEL zelf (BRP-patroon: odrl:assignee staat op de
    // Permission, niet op de Set). Stond al in `shown` maar werd nergens
    // getoond — afnemers.ttl-labels bleven daardoor onbenut.
    assignee: cachedDesc(caches && caches.agent,
      (t) => t && t.id,
      obj(store, permTerm, ODRL + 'assignee'),
      (t) => partyRef(store, t)),
    // Expliciete herkomst van de regel (bijv. naar het aanbod dat hij invult).
    derivedFrom: PROFILE_PATTERNS.agreementOfferPreds
      .flatMap((pred) => objs(store, permTerm, pred))
      .filter((t) => t.termType === 'NamedNode').map((t) => t.value),
    term: permTerm,
    iri: permTerm.termType === 'NamedNode' ? permTerm.value : null,
    // De regel is ALS GEHEEL organisatorisch geborgd (dpv:OrganisationalMeasure
    // op de regel — zie isOrganisationalRule). Zij telt dan niet als te
    // realiseren regel en haar voorwaarden evenmin.
    organisational: isOrganisationalRule(store, permTerm),
    // Benoemde permissions (met odrl:uid) kunnen een eigen titel dragen.
    title: pickLiteral(objs(store, permTerm, DCT + 'title'))
      || pickLiteral(objs(store, permTerm, RDFS + 'label')) || null,
    // Toelichting bij de regel (zie readDuty): ook hier werd de tekst wel uit
    // extraProps geweerd maar nergens getoond.
    description: pickLiteral(objs(store, permTerm, DCT + 'description'))
      || pickLiteral(objs(store, permTerm, RDFS + 'comment')) || null,
    actionNode: action.nodeTerm,
    refinements,
    // Actie zonder benoembare waarde maar mét eigen knoop (bv. alleen
    // refinements): toon "(anonieme actie)" i.p.v. een leeg streepje —
    // de refinement-zinnen staan ernaast.
    action: action.value
      ? cachedDesc(caches && caches.action, (v) => v, action.value,
        (v) => ({
          iri: v, curie: curie(v), label: labelFor(store, namedNode(v)),
          desc: descriptionFor(store, v),
        }))
      : (action.nodeTerm
        ? { iri: null, curie: null, label: anonymousActionLabel(store, action.nodeTerm) }
        : null),
    purpose: purpose ? cachedDesc(caches && caches.purpose,
      (p) => (p.purpose ? p.purpose.value + '|' + (p.operator ? p.operator.value : '')
        + '|' + (p.rights || []).length : null),
      purpose,
      (p) => ({
        iri: p.purpose ? p.purpose.value : null,
        curie: p.purpose ? curie(p.purpose.value) : null,
        label: p.purpose ? labelFor(store, p.purpose) : t('noPurpose'),
        desc: p.purpose ? descOfTerm(store, p.purpose) : '',
        operator: p.operator ? curie(p.operator.value) : null,
        operatorWord: p.operator ? (operatorWord(p.operator.value) || '') : '',
        // De UITLEG bij die operator (note §1). De weergave bouwt de
        // doelbinding-rij zelf op uit deze velden — zij komt niet langs
        // constraintSentence — en zonder dit veld zou juist die rij als enige
        // voorwaarde-rij een operator-chip zonder tooltip krijgen. Ontbreekt de
        // operator, dan leest de rij als shorthand-odrl:eq en hoort de uitleg
        // daarvan erbij.
        operatorDesc: descriptionFor(store, p.operator || namedNode(ODRL + 'eq')),
        // Alle rechterwaarden van de doel-refinement. De weergave toont er één
        // (label/curie hierboven); dit veld bestaat zodat de groepering een
        // meerwaardige doelbinding als NIET-eenduidig kan herkennen.
        rightCuries: (p.rights || []).map((r) => (r.termType === 'Literal' ? r.value : curie(r.value))),
        rightIris: (p.rights || []).filter((r) => r.termType !== 'Literal').map((r) => r.value),
      })) : null,
    targets,
    constraints,
    purposeConstraint,
    duties,
  };
}

// --- De twee markers op een voorwaarde (dpv) --------------------------------
// IS DEZE VOORWAARDE DE TECHNISCHE BORGING ZELF? Twee vormen, allebei geldig:
//  a) de MARKER dpv:TechnicalMeasure op de voorwaarde — de generieke vorm, en
//     de enige die zonder profielkennis te lezen is;
//  b) de OPERATOR apnl:conformsToPolicy — de ODRL-AP-NL-vorm van vóór de
//     markers. Blijft als TERUGVAL herkend, zodat datasets zonder markers
//     (Breda, voorbeeld 3 en 7) identiek blijven werken.
function isTechnicalMeasure(store, cTerm) {
  if (hasType(store, cTerm, PROFILE_PATTERNS.technicalMeasureClass)) return true;
  const op = obj(store, cTerm, ODRL + 'operator');
  return !!op && op.value === PROFILE_PATTERNS.conformsToOperator;
}

// Draagt de voorwaarde de OPERATOR van het profiel? Alleen dan leest haar rij
// als de vaste zin "het verwerkingsverzoek moet voldoen aan ‹artefact›"; een
// technische borging in een andere vorm toont gewoon haar eigen chips.
function isConformsOperator(store, cTerm) {
  const op = obj(store, cTerm, ODRL + 'operator');
  return !!op && op.value === PROFILE_PATTERNS.conformsToOperator;
}

// Is deze voorwaarde ORGANISATORISCH GEBORGD (dpv:OrganisationalMeasure)?
function isOrganisationalMeasure(store, cTerm) {
  return hasType(store, cTerm, PROFILE_PATTERNS.organisationalMeasureClass);
}

// DEZELFDE MARKER OP EEN REGEL (aug 2026). Een plicht als "vernietig de
// opgehaalde gegevens na afhandeling" is niet pas in haar voorwaarde
// organisatorisch geborgd, maar ALS GEHEEL: ook wie de plicht draagt, welke
// handeling zij voorschrijft en waarop, ziet geen enkel beslispunt. Zo'n regel
// telt niet als te realiseren regel, en haar benoemde voorwaarden evenmin.
//
// ALLEEN DE MARKER, geen operator-terugval: die terugval (isTechnicalMeasure)
// leest odrl:operator, en een REGEL heeft er geen — hem hier meenemen zou
// betekenisloos zijn. Van de twee markers krijgt alleen dpv:OrganisationalMeasure
// eigen weergavelogica: dpv:TechnicalMeasure op een regel is toegestaan in de
// note en de shapes (de regel IS dan de borging), maar een theoretisch geval
// waarvoor de viewer niets aparts hoeft te doen.
function isOrganisationalRule(store, rTerm) {
  return hasType(store, rTerm, PROFILE_PATTERNS.organisationalMeasureClass);
}

// Is de constraint de technische borging, geef dan waar zij naar delegeert: de
// rechterwaarde, oftewel het artefact. Zonder rechterwaarde blijft dit null —
// de voorwaarde is dan wél de borging (isTechnicalMeasure), maar er valt geen
// artefact bij te noemen.
function readConformsTo(store, cTerm) {
  if (!isTechnicalMeasure(store, cTerm)) return null;
  const right = obj(store, cTerm, ODRL + 'rightOperand');
  return right ? right.value : null;
}

// Predicaten die de duty-weergave al elders toont; al het overige verschijnt
// als extraProps ("no silent omission" — bv. md:creditor, md:hasDeadlineDelta,
// odrl:timeInterval, profielspecifieke actionScope).
const DUTY_SHOWN = () => new Set([
  RDF + 'type', ODRL + 'action', ODRL + 'constraint', ODRL + 'duty', ODRL + 'uid',
  // odrl:consequence krijgt een eigen weergaveblok (zie readDuty) en hoort
  // daarom niet meer bij de "overige eigenschappen".
  ODRL + 'consequence',
  RDFS + 'label', PREFIXES.skos + 'prefLabel', DCT + 'title',
  RDFS + 'comment', DCT + 'description',
]);
const DUTY_ACTION_SHOWN = () => new Set([
  RDF + 'type', RDF + 'value', ODRL + 'refinement', ODRL + 'informedParty',
  RDFS + 'label', PREFIXES.skos + 'prefLabel', DCT + 'title',
]);

// EEN BLANK NODE DIE TWEE KEER BINNENKOMT IS EEN KNOOP, GEEN TWEE.
// In ?sparql=-modus wordt dezelfde gedeelde regel door meer dan één
// detail-CONSTRUCT opgehaald (een stelselverplichting hangt aan het aanbod én
// aan de overeenkomst). Elke CONSTRUCT levert zijn eigen blank-node-labels op,
// dus na het samenvoegen staan er twee ONDERSCHEIDEN blank nodes met identiek
// dezelfde inhoud in de store. Een named node dedupliceert vanzelf op zijn
// IRI; een blank node niet — en dan zou "Gevolg bij niet-naleving" twee keer
// dezelfde melding tonen, alsof het er twee waren.
//
// De sleutel is daarom de IRI als die er is, en anders wat de knoop ZEGT
// (naam, actie, geïnformeerde partij). Twee verplichtingen die daar allemaal
// in samenvallen zijn in dit model één verplichting; ODRL kent geen betekenis
// waarin ze samen iets anders zouden zijn dan elk apart.
function dedupeDuties(list) {
  const seen = new Set();
  const out = [];
  for (const d of list || []) {
    const key = d.iri || ['B', d.label || '', d.action || '',
      (d.informedParty && d.informedParty.iri) || ''].join(String.fromCharCode(1));
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(d);
  }
  return out;
}

function readDuty(store, dTerm, depth = 0) {
  const actionTerm = obj(store, dTerm, ODRL + 'action');
  let actionLabel = null;
  let informedParty = null;
  let refinements = [];
  const extraProps = extraProperties(store, dTerm, DUTY_SHOWN());
  if (actionTerm && isLiteral(actionTerm)) {
    // Actie als string-literal (DSP-JSON): toon de (geëxpandeerde) naam.
    actionLabel = labelFor(store, namedNode(actionIriFromLiteral(actionTerm.value)));
  } else if (actionTerm) {
    const rdfVal = obj(store, actionTerm, RDF + 'value');
    let av = rdfVal || actionTerm;
    // Getypeerde blanknode zonder rdf:value: rdf:type als actienaam.
    if (!rdfVal && actionTerm.termType === 'BlankNode') {
      const typeIri = actionTypeIri(store, actionTerm);
      if (typeIri) av = namedNode(typeIri);
    }
    actionLabel = av.termType === 'BlankNode'
      ? anonymousActionLabel(store, av) : labelFor(store, av);
    const ip = obj(store, actionTerm, ODRL + 'informedParty');
    if (ip) informedParty = { iri: ip.value, label: labelFor(store, ip), curie: curie(ip.value) };
    // Duty-action-refinements zijn de parameters van de maatregel (bv.
    // geonl:schaalnoemer >= 50000 = "tot schaal 1:50.000"). Werden eerder niet
    // gelezen, waardoor de parameter onzichtbaar bleef. Zelfde vorm als bij een
    // permission (term + conformsTo), zodat de weergave ze met dezelfde
    // slot-chip-structuur kan tekenen.
    refinements = objs(store, actionTerm, ODRL + 'refinement').map((r) => ({
      term: r, ...constraintSentence(store, r), conformsTo: readConformsTo(store, r),
    }));
    // Overige eigenschappen op de actie-KNOOP zelf (bv. md:creditor op een
    // Compensate-actie) horen bij de duty-weergave; alleen bij een eigen
    // actie-knoop (blank node of rdf:value-structuur), nooit bij een directe
    // actie-IRI — diens ontologie-triples (labels e.d.) zijn geen duty-data.
    if (actionTerm.termType === 'BlankNode' || rdfVal) {
      extraProps.push(...extraProperties(store, actionTerm, DUTY_ACTION_SHOWN()));
    }
  }
  // Expliciet label (rdfs:label/skos:prefLabel/dct:title); een blanknode-id
  // is geen bruikbare titel, dus daar geen localName-fallback.
  const explicitLabel = pickLiteral(objs(store, dTerm, RDFS + 'label'))
    || pickLiteral(objs(store, dTerm, PREFIXES.skos + 'prefLabel'))
    || pickLiteral(objs(store, dTerm, DCT + 'title'));
  return {
    term: dTerm,
    iri: dTerm.termType === 'NamedNode' ? dTerm.value : null,
    // Zie readPermission: de marker mag óók op een verplichting staan, en dat
    // is in de praktijk het gewone geval (vlierdam:plicht-vernietiging).
    organisational: isOrganisationalRule(store, dTerm),
    label: explicitLabel || (dTerm.termType === 'NamedNode' ? labelFor(store, dTerm) : null),
    // Toelichting bij de verplichting (dct:description, anders rdfs:comment).
    // Stond al in DUTY_SHOWN — werd dus uit extraProps geweerd — maar werd
    // nergens gelezen: de uitleg viel daardoor stilzwijgend weg.
    description: pickLiteral(objs(store, dTerm, DCT + 'description'))
      || pickLiteral(objs(store, dTerm, RDFS + 'comment')) || null,
    action: actionLabel,
    informedParty,
    refinements,
    // odrl:constraint op de Duty zelf (een Duty is een Rule en mag ze dragen).
    // Werd eerder niet gelezen: de voorwaarde verscheen dan hooguit als
    // blanknode-samenvatting tussen de overige eigenschappen.
    constraints: objs(store, dTerm, ODRL + 'constraint').map((c) => ({
      term: c, ...constraintSentence(store, c), conformsTo: readConformsTo(store, c),
    })),
    extraProps,
    // odrl:duty op een Duty (duty-naar-duty-verwijzing, bv. Market Data's
    // D1 -> D3): als volwaardig verplichtingen-lijstje, niet als kale curie.
    // Dieptegrens beschermt tegen cycli in de data.
    duties: depth < 3
      ? dedupeDuties(objs(store, dTerm, ODRL + 'duty').map((d) => readDuty(store, d, depth + 1)))
      : [],
    // odrl:consequence: wat er hoort te gebeuren als DEZE verplichting niet
    // wordt nagekomen (ODRL 2.2, §2.6.4 — "the consequence of not fulfilling
    // the duty"). Een consequence is zelf een Duty en wordt dus met precies
    // dezelfde lezer gelezen: actie, geïnformeerde partij, voorwaarden,
    // bronvermelding. Dezelfde dieptegrens als odrl:duty, want een consequence
    // mag op haar beurt weer een duty of consequence dragen.
    consequences: depth < 3
      ? dedupeDuties(objs(store, dTerm, ODRL + 'consequence')
        .map((c) => readDuty(store, c, depth + 1)))
      : [],
  };
}

function agentRef(store, term) {
  if (!term) return null;
  return {
    iri: term.value, curie: curie(term.value), label: labelFor(store, term),
    desc: descOfTerm(store, term),
  };
}

// --- Collecties (odrl:AssetCollection / odrl:PartyCollection) ----------------
// Een collectie kan op twee manieren zeggen wie erin zit:
//   EXTENSIONEEL — de leden staan opgesomd. Het lidmaatschap kent daarbij twee
//     richtingen: de ODRL-kern zet de relatie op het LID (`lid odrl:partOf
//     collectie`), onze eigen conventie zette hem op de COLLECTIE (`collectie
//     dct:hasPart lid`). odrl:partOf is sinds de migratie de primaire route;
//     dct:hasPart blijft meelezen zolang er data van vóór de flip rondgaat.
//     (dct:hasPart op een tpl-versiecontainer betekent iets ánders — het
//     versiepatroon — en loopt via temporal.js, niet via deze route.)
//   INTENSIONEEL — geen opsomming maar een odrl:refinement dat de
//     lidmaatschapsvoorwaarde stelt ("elke partij met rol verkoper"), eventueel
//     met odrl:source als de verzameling waaruit geselecteerd wordt.
// Beide vormen kunnen naast elkaar voorkomen; de weergave toont dan beide.
const COLLECTION_KIND = {
  [ODRL + 'AssetCollection']: 'asset',
  [ODRL + 'PartyCollection']: 'party',
};

function collectionKind(store, term) {
  for (const ty of typesOf(store, term)) {
    if (COLLECTION_KIND[ty]) return COLLECTION_KIND[ty];
  }
  return null;
}

// Eén lid, met het GROEPEERTYPE waarop de ledenlijst kopjes maakt: bij
// meerdere rdf:typen wint het DOMEIN-type boven de ODRL-kern-structuurtypen
// (Asset/AssetCollection zeggen alleen dát iets een verzameling is; brp:Groep
// e.d. zeggen wát). Zonder die voorkeur is de keuze tripel-volgorde-afhankelijk
// en kan een dubbel getypeerd lid onder de kop "AssetCollection" belanden.
function memberDesc(store, m) {
  const ts = typesOf(store, m);
  const typeIri = ts.find((ty) => !ty.startsWith(ODRL)) || ts[0] || null;
  return {
    iri: m.value, curie: curie(m.value), label: labelFor(store, m),
    desc: descriptionFor(store, m),
    typeIri,
    typeLabel: typeIri ? labelFor(store, namedNode(typeIri)) : null,
  };
}

// Opgesomde leden: eerst de ODRL-kernrichting (inverse hop over odrl:partOf),
// daarna de oude conventie. Gededupliceerd op IRI, zodat data die tijdens de
// overgangsperiode BEIDE richtingen draagt geen dubbele leden oplevert.
function collectionMembers(store, collTerm) {
  const seen = new Set();
  const out = [];
  const add = (m) => {
    if (m.termType !== 'NamedNode' || seen.has(m.value)) return;
    seen.add(m.value);
    out.push(memberDesc(store, m));
  };
  for (const m of subs(store, ODRL + 'partOf', collTerm)) add(m);
  for (const m of objs(store, collTerm, DCT + 'hasPart')) add(m);
  return out;
}

// --- Doorlopende boom over de odrl:partOf-keten ------------------------------
// Een collectie-lidmaatschap is in de praktijk zelden één laag diep: een stuk
// zit in een dossier, dat in een serie, die in een archief (note §3), en het
// BRP-informatiemodel kent rubriek -> groep -> categorie. De ledenlijst toont
// daarom niet alleen de DIRECTE leden: een lid dat zélf leden heeft wordt een
// uitklapbare knoop, met op elk niveau dezelfde domein-type-groepering en
// telling als op het eerste.
//
// Drie eigenschappen die deze boom moet hebben, en hoe ze geborgd zijn:
//
//  1. CYKEL-VEILIG. odrl:partOf is niet gegarandeerd acyclisch (en in het wild
//     komen ringen voor). Elk niveau krijgt daarom het PAD naar de wortel mee;
//     een lid dat al in dat pad staat is een terugkeer en wordt een BLAD
//     (`cycle: true`) — geen uitklapknop, dus de opbouw eindigt altijd. Alleen
//     het pad telt, niet "ooit gezien": twee zusters mogen best hetzelfde kind
//     hebben (een gedeelde rubriek onder twee groepen), dat is een DAG en geen
//     cykel, en beide takken mogen hem tonen.
//  2. DIEPTE-LIMIET. Ook zonder cykel kan een keten lang zijn. Onder
//     MEMBER_TREE_MAX_DEPTH niveaus stopt de boom en verwijst hij door naar de
//     graaf-inspecteur ("verder verkennen"), die geen limiet kent. Vier
//     niveaus dekt het archiefvoorbeeld (archief/serie/dossier/stuk) en het
//     BRP-informatiemodel (categorie/groep/rubriek) ruim; dieper wordt een
//     ingesprongen lijst toch onleesbaar.
//  3. LUI PER NIVEAU. Elk niveau wordt pas gelezen bij het uitklappen. In
//     ttl-modus scheelt dat alleen werk; in ?sparql=-modus is het de kern van
//     het ontwerp — één extra CONSTRUCT-hop per uitklap (zie
//     collectionLevelQuery in sparql.js) in plaats van een boom die bij het
//     openen van één kaart de halve graaf binnentrekt.
export const MEMBER_TREE_MAX_DEPTH = 4;

// Heeft deze knoop zélf leden? Bewust een BESTAANS-toets en geen telling: op
// een gegevensset met duizenden rubrieken wordt dit per lid aangeroepen, en
// countQuads over de OPS-index is een indexafdaling zonder materialisatie.
// Beide lidmaatschapsrichtingen tellen, net als in collectionMembers.
function hasMembers(store, term) {
  if (!term) return false;
  if (store.countQuads(null, namedNode(ODRL + 'partOf'), term, null) > 0) return true;
  return objs(store, term, DCT + 'hasPart').some((o) => o.termType === 'NamedNode');
}

// --- Ancestry: dezelfde keten, de ANDERE kant op -----------------------------
// De boom hierboven loopt OMLAAG (welke leden zitten er ín dit lid). Een lid
// heeft daarnaast vaak een keten OMHOOG die niets met deze collectie te maken
// heeft: een BRP-rubriek is `odrl:partOf` een groep, die is `odrl:partOf` een
// categorie — het informatiemodel — terwijl diezelfde rubriek óók `odrl:partOf`
// de gegevensset is waarin we hem tonen. Die tweede keten is de INHOUDELIJKE
// ordening van de leden: zonder haar staat een gegevensset van 69 leden onder
// één platte kop "Rubriek (69)", met haar vallen de vier adres-groepen netjes
// onder hun eigen categorie.
//
// Wat telt als voorouder om op te groeperen? Drie eisen, alle drie generiek —
// geen enkele kent BRP, informatiemodellen of welk domein dan ook:
//
//  1. BUITEN DE BOOM DIE WE TEKENEN. De collectie zelf is per definitie de
//     ouder van al zijn leden; dat is de reden dat ze hier staan, geen
//     ordening. Hetzelfde geldt een laag dieper: een voorouder die zélf onder
//     de WORTEL van deze boom hangt is een ZUSTERTAK, geen laag erboven. Zo
//     krijgt het gedeelde stuk in de archieffixture (stuk10, lid van dossier12
//     én dossier13) onder dossier12 géén kop "Dossier 13": dossier13 hangt
//     onder hetzelfde archief en wordt door de kinder-boom al getoond.
//  2. GECLASSIFICEERD. De voorouder moet een DOMEIN-type dragen — een
//     rdf:type buiten de ODRL-kern. Dat is exact de maatstaf die memberDesc al
//     voor het groepeertype hanteert: `odrl:AssetCollection` zegt alleen DÁT
//     iets een verzameling is, `brp:Groep` zegt WÁT het is. Deze eis doet het
//     zware werk in het wild: in /brp-ap zit één rubriek in honderden ándere
//     gegevenssets, en die dragen alleen het ODRL-type — zonder deze eis kreeg
//     elk lid er honderden zinloze koppen bij.
//  3. BENOEMD. Zonder rdfs:label/skos:prefLabel/dct:title valt er geen kop te
//     schrijven; labelFor zou terugvallen op een localName, en dat is geen
//     naam maar een IRI-staart. Dat maakt de eis meteen taalvast: in
//     ?sparql=-modus komen alleen benoemde voorouders binnen (zie
//     policyDetailQuery tak 4e/4f), en wat niet benoemd is groepeert niet.
//
// Kosten: per lid één doorloop van zijn partOf-triples, en per KANDIDAAT
// (niet per lid!) één keer de drie eisen — gememoïseerd in `ctx.ok`. In
// /brp-ap scheelt dat de factor 350: 350 leden × ~950 ouders zijn 330k
// Map-lookups maar hooguit ~950 echte toetsen.
const ANCESTRY_MAX_CHAIN = 8;
// Twee kopniveaus, niet meer: buitenste kop = de HOOGSTE voorouder (de
// categorie), binnenste = de DIRECTE ouder (de groep). Vallen die samen — een
// keten van één — dan blijft het bij één kop. Een derde niveau zou de leden
// zo ver naar rechts duwen dat de lijst zelf niet meer leest; de rest van de
// keten is één klik verderop in de graaf-inspecteur.
export const MEMBER_ANCESTRY_HEAD_LEVELS = 2;

// Alle ouders van een knoop, in BEIDE lidmaatschapsrichtingen — spiegelbeeld
// van collectionMembers, zodat een graaf die nog de oude dct:hasPart-conventie
// draagt hier net zo goed omhoog te lopen is.
function memberParents(store, term) {
  const seen = new Set();
  const out = [];
  const add = (p) => {
    if (p.termType !== 'NamedNode' || seen.has(p.value)) return;
    seen.add(p.value);
    out.push(p);
  };
  for (const p of objs(store, term, ODRL + 'partOf')) add(p);
  for (const p of subs(store, DCT + 'hasPart', term)) add(p);
  return out;
}

// Hangt `iri` onder de wortel van de boom die we tekenen? Een BREEDTE-zoektocht
// omhoog: partOf is een DAG met vertakkingen (een groep zit in tientallen
// gegevenssets), dus één keten volgen zou takken missen. Iteratief en met een
// bezoekbudget — geen recursie die op een ring in de data omvalt. Het antwoord
// wordt per knoop onthouden in `ctx.inTree`; een NEGATIEF antwoord geldt voor
// álles wat onderweg bezocht is (niets daarboven bereikt de wortel), een
// positief alleen voor het beginpunt.
const ANCESTRY_WALK_BUDGET = 4096;

function underTreeRoot(store, iri, ctx) {
  const memo = ctx.inTree.get(iri);
  if (memo !== undefined) return memo;
  const seen = new Set([iri]);
  const queue = [iri];
  let hit = false;
  let budget = ANCESTRY_WALK_BUDGET;
  while (queue.length && budget > 0 && !hit) {
    const cur = queue.shift();
    budget -= 1;
    for (const p of memberParents(store, namedNode(cur))) {
      if (ctx.roots.has(p.value) || ctx.inTree.get(p.value) === true) { hit = true; break; }
      if (ctx.inTree.get(p.value) === false || seen.has(p.value)) continue;
      seen.add(p.value);
      queue.push(p.value);
    }
  }
  if (hit) ctx.inTree.set(iri, true);
  else if (budget > 0) for (const s of seen) ctx.inTree.set(s, false);
  return hit;
}

// Voldoet deze kandidaat aan de drie eisen? Gememoïseerd per IRI.
function ancestryCandidate(store, term, ctx) {
  const hit = ctx.ok.get(term.value);
  if (hit !== undefined) return hit;
  ctx.ok.set(term.value, null); // cykel-vangnet tijdens de eigen evaluatie
  let desc = null;
  const domain = typesOf(store, term).find((ty) => !ty.startsWith(ODRL));
  if (domain && !ctx.roots.has(term.value) && !underTreeRoot(store, term.value, ctx)) {
    const label = namedLabel(store, term);
    if (label) desc = { iri: term.value, curie: curie(term.value), label, typeIri: domain };
  }
  ctx.ok.set(term.value, desc);
  return desc;
}

// Het label van een knoop, maar ALLEEN als de data er echt één draagt —
// labelFor valt terug op een localName en dat is voor een kop geen naam.
function namedLabel(store, term) {
  return pickLiteral(objs(store, term, RDFS + 'label'))
    || pickLiteral(objs(store, term, PREFIXES.skos + 'prefLabel'))
    || pickLiteral(objs(store, term, DCT + 'title'))
    || null;
}

// De ketens boven één lid, elk als pad van HOOG naar LAAG. Een lid met twee
// kwalificerende ouders levert twee paden op — een DAG, net als omlaag, en het
// lid verschijnt dan onder beide koppen (zie groupMembersByAncestry).
function ancestryPaths(store, iri, ctx) {
  const paths = [];
  for (const p of memberParents(store, namedNode(iri))) {
    const first = ancestryCandidate(store, p, ctx);
    if (!first) continue;
    const chain = [first];
    const seen = new Set([iri, first.iri]);
    let cur = first;
    while (chain.length < ANCESTRY_MAX_CHAIN) {
      let next = null;
      for (const up of memberParents(store, namedNode(cur.iri))) {
        if (seen.has(up.value)) continue;
        next = ancestryCandidate(store, up, ctx);
        if (next) break;
      }
      if (!next) break;
      seen.add(next.iri);
      chain.push(next);
      cur = next;
    }
    chain.reverse(); // hoogste voorouder eerst
    paths.push(chain);
  }
  return paths;
}

// Leden hiërarchisch op hun ancestry. Levert { ancestry, rest }: de groepen
// met koppen, en de leden ZONDER externe voorouder — die vallen eerlijk terug
// op de bestaande type-groepering eronder (in /brp-ap zijn dat de 16
// categorieën, die zelf de top van de keten zijn en dus niets boven zich
// hebben). Pure vorm: de DOM zit in doc.js.
export function groupMembersByAncestry(store, members, { collectionIri, ancestors = [] } = {}) {
  const ctx = {
    roots: new Set([collectionIri, ...ancestors].filter(Boolean)),
    ok: new Map(),
    inTree: new Map(),
  };
  const outers = new Map();
  const rest = [];
  for (const m of members || []) {
    const paths = ancestryPaths(store, m.iri, ctx);
    if (!paths.length) { rest.push(m); continue; }
    for (const path of paths) {
      const top = path[0];
      const direct = path[path.length - 1];
      let g = outers.get(top.iri);
      if (!g) {
        g = { iri: top.iri, curie: top.curie, label: top.label, typeIri: top.typeIri,
          items: [], subgroups: [], count: 0, _subs: new Map() };
        outers.set(top.iri, g);
      }
      g.count += 1;
      if (direct.iri === top.iri) { g.items.push(m); continue; }
      let s = g._subs.get(direct.iri);
      if (!s) {
        s = { iri: direct.iri, curie: direct.curie, label: direct.label,
          typeIri: direct.typeIri, items: [] };
        g._subs.set(direct.iri, s);
        g.subgroups.push(s);
      }
      s.items.push(m);
    }
  }
  const groups = [...outers.values()].sort((a, b) => collate(a.label, b.label));
  for (const g of groups) {
    delete g._subs;
    g.items.sort((a, b) => collate(a.label, b.label));
    g.subgroups.sort((a, b) => collate(a.label, b.label));
    for (const s of g.subgroups) s.items.sort((a, b) => collate(a.label, b.label));
  }
  return { ancestry: groups, rest };
}

// Eén niveau van de boom: de leden van `termOrIri`, gegroepeerd zoals de platte
// ledenlijst, met per lid of het uitklapbaar is (`hasChildren`) of een
// terugkeer in het pad (`cycle`). Pure functie — de fold-out-DOM en het lazy
// bijladen zitten in doc.js.
//   ancestors: de IRI's van de knopen BOVEN dit niveau (wortel eerst).
//   kind: 'asset' | 'party' voor de woordkeuze; zonder waarde uit de data.
// Twee groeperingen naast elkaar, en ze bijten elkaar niet: `ancestry` ordent
// de leden die een keten BUITEN deze collectie boven zich hebben (koppen), en
// `groups` houdt precies wat daarvan overblijft in de vertrouwde
// type-groepering. Samen bevatten ze elk lid één keer — op een DAG-lid na, dat
// bewust onder elk van zijn ouders verschijnt. `members` blijft de platte,
// ontdubbelde lijst en dus de bron van `total`.
export function memberTreeLevel(store, termOrIri, { kind = null, ancestors = [] } = {}) {
  const term = typeof termOrIri === 'string' ? namedNode(termOrIri) : termOrIri;
  if (!term) return { total: 0, groups: [], members: [], ancestry: [] };
  const path = new Set(ancestors);
  path.add(term.value);
  const members = collectionMembers(store, term).map((m) => {
    const cycle = path.has(m.iri);
    return { ...m, cycle, hasChildren: !cycle && hasMembers(store, namedNode(m.iri)) };
  });
  const k = kind || collectionKind(store, term);
  const { ancestry, rest } = groupMembersByAncestry(store, members,
    { collectionIri: term.value, ancestors });
  return {
    total: members.length,
    members,
    ancestry,
    groups: groupCollectionMembers(ancestry.length ? rest : members, k),
  };
}

// Intensionele definitie. Meerdere refinements gelden samen (impliciete EN,
// net als meerdere odrl:constraint op één regel), dus de zinnen worden met het
// EN-voegwoord aaneengeregen — met dezelfde zinbouwer als elke andere
// voorwaarde, zodat operator- en grootheidswoorden overal gelijk luiden.
function collectionIntension(store, term, kind) {
  const refTerms = objs(store, term, ODRL + 'refinement');
  if (!refTerms.length) return null;
  const refinements = refTerms.map((r) => ({ term: r, ...constraintSentence(store, r) }));
  const sentence = refinements.map((r) => r.sentence).join(t('logical.and'));
  const src = obj(store, term, ODRL + 'source');
  return {
    kind: kind || 'asset',
    refinements,
    sentence,
    phrase: t(kind === 'party' ? 'coll.anyParty' : 'coll.anyAsset', { sentence }),
    // odrl:source is in de spec een IRI, maar komt in het wild ook als
    // string-literal voor (DOME zet er runtime-sleutels als "urn:user" in).
    // Een literal is geen verwijzing: dan géén curie en géén verken-knop.
    source: src ? (isLiteral(src)
      ? { iri: null, curie: null, label: src.value }
      : agentRef(store, src)) : null,
  };
}

// Collectie-eigenschappen van een knoop in target-/partij-positie.
// `onlyTyped`: alleen als de knoop ook echt als collectie getypeerd is. Dat
// is de veilige keuze in partij-positie — een gewone partij met een
// dct:hasPart-onderdeel is geen ledenlijst — terwijl een target al sinds
// jaar en dag zijn hasPart-leden toont, ook ongetypeerd.
function collectionRef(store, term, { onlyTyped = false } = {}) {
  const kind = collectionKind(store, term);
  if (onlyTyped && !kind) return null;
  return {
    collKind: kind,
    members: collectionMembers(store, term),
    intension: collectionIntension(store, term, kind),
  };
}

// Partij in odrl:assignee-/odrl:assigner-positie. Een odrl:PartyCollection
// draagt naast zijn label ook zijn leden en/of zijn intensionele definitie;
// een gewone partij blijft een kale verwijzing (geen extra graaflookups).
function partyRef(store, term) {
  if (!term) return null;
  const coll = collectionRef(store, term, { onlyTyped: true });
  if (!coll) return agentRef(store, term);
  return {
    ...agentRef(store, term),
    anon: term.termType !== 'NamedNode', term,
    ...coll,
  };
}

// --- Vindplaats (prov:hadPrimarySource) --------------------------------------
// Waar dpv:hasLegalBasis de GRONDSLAG van een regel geeft (de wet waarop hij
// rust) en dct:source het stuk waaruit de verklaring komt,
// zegt prov:hadPrimarySource wáár die regel te vinden is: het object is een
// ankerobject — de plek in een brondocument. In de brp-ap-data is dat
// <pdf-url#page=n>, een eigen entiteit met een leesbaar rdfs:label
// ("Autorisatiebesluit … (kenmerk …), p. 1") en een verwijzing naar het
// document waarvan het deel is (dct:isPartOf; dct:isFormatOf wanneer het
// anker het bestand zélf is). Twee bewust verschillende predicaten, dus ook
// twee velden in het model — de weergave mag ze nooit door elkaar halen.
const PAGE_FRAGMENT = /#page=(\d+)(?:$|[&#])/;

function sourceLocationRef(store, term) {
  const docTerm = obj(store, term, DCT + 'isPartOf') || obj(store, term, DCT + 'isFormatOf');
  const page = PAGE_FRAGMENT.exec(term.value);
  return {
    ...agentRef(store, term),
    // Paginanummer uit het #page=n-fragment van de anker-IRI: dat fragment
    // is precies wat de link DOET (het opent de PDF op die pagina), dus
    // model en gedrag kunnen niet uiteenlopen. Welk predicaat een dataset
    // daarnaast voor "pagina" gebruikt is datasetkennis — die hoort in de
    // bron (labels als data), niet in deze generieke laag. Een anker zonder
    // fragment wijst naar het document als geheel: dan géén pagina, want er
    // wordt niets geraden.
    page: page ? Number(page[1]) : null,
    document: docTerm && docTerm.termType === 'NamedNode' ? {
      ...agentRef(store, docTerm),
      identifier: pickLiteral(objs(store, docTerm, DCT + 'identifier'))
        || pickLiteral(objs(store, docTerm, PREFIXES.skos + 'notation')) || null,
    } : null,
  };
}

// Descriptor via cache: `key(input)` levert de cachesleutel (null = niet
// cachen), `build(input)` het descriptor-object. Zonder cache (Map) wordt
// altijd gebouwd. Gedeelde descriptors zijn bewust: de UI muteert ze niet.
function cachedDesc(cache, key, input, build) {
  if (input == null) return null;
  const k = cache ? key(input) : null;
  if (k != null) {
    const hit = cache.get(k);
    if (hit !== undefined) return hit;
  }
  const desc = build(input);
  if (k != null) cache.set(k, desc);
  return desc;
}

function readVersionInfo(store, term) {
  const revOf = obj(store, term, PROV + 'wasRevisionOf');
  const specOf = obj(store, term, PROV + 'specializationOf');
  const derived = objs(store, term, PROV + 'wasDerivedFrom');
  // Gelding van deze versie: het schema-paar (schema:validFrom/validThrough),
  // met de dct:valid-knoop en -string als tolerante terugval — zie
  // readValidity voor de rangorde. De velden
  // heten in het weergavemodel nog effectiveFrom/To: dat zijn UI-veldnamen,
  // geen vocabulairetermen (het stopgezette tpl:effectiveFrom/To wordt niet
  // meer gelezen — nul voorkomens in de stores en in testdata/wild/).
  const period = readValidity(store, term);
  // Wie vervangt deze node? (inverse van wasRevisionOf)
  const supersededBy = subs(store, PROV + 'wasRevisionOf', term);
  return {
    revisionOf: revOf ? agentRef(store, revOf) : null,
    specializationOf: specOf ? agentRef(store, specOf) : null,
    derivedFrom: derived.map((d) => agentRef(store, d)),
    effectiveFrom: period.from,
    effectiveTo: period.to,
    supersededBy: supersededBy.map((s) => agentRef(store, s)),
  };
}

// Overige eigenschappen: alle predicaten op een node die het weergavemodel
// niet al elders toont. Reguliere (domein)attributen op policy-elementen —
// bijv. brp:medium op een permission — zijn legitiem ODRL-profielgebruik
// buiten constraints/refinements om; een viewer mag ze nooit stilzwijgend
// weglaten. Labels komen uit de graaf (registerfragment/domeinprofiel).
// Blank-node-waarde in extraProps: één niveau samenvatten tot "typelabel —
// eigenschap: waarde · eigenschap: waarde" (bv. "ProperInterval —
// hasXSDDuration: P30D · timeReference: TimeOfNotification"). Dieper genest
// blijft het aan het bronfragment.
function blankNodeSummary(store, bn) {
  const ty = typesOf(store, bn)[0];
  const typeLabel = ty ? labelFor(store, namedNode(ty)) : null;
  const parts = [];
  for (const [p, terms] of subjectPredMap(store, bn) || []) {
    if (p === RDF + 'type') continue;
    for (const o of terms) {
      const v = o.termType === 'Literal' ? o.value : labelFor(store, o);
      parts.push(`${localName(p)}: ${v}`);
    }
  }
  const head = typeLabel || t('anon');
  return parts.length ? `${head} — ${parts.join(' · ')}` : head;
}

function extraProperties(store, term, known) {
  const byPred = [];
  for (const [p, terms] of subjectPredMap(store, term) || []) {
    if (!known.has(p)) byPred.push([p, terms]);
  }
  return byPred.map(([p, values]) => ({
    predicate: { iri: p, curie: curie(p), label: labelFor(store, namedNode(p)) },
    values: values.map((o) => {
      if (o.termType === 'Literal') return { literal: o.value };
      if (o.termType === 'BlankNode') return { blank: true, label: blankNodeSummary(store, o) };
      return { iri: o.value, curie: curie(o.value), label: labelFor(store, o) };
    }),
  }));
}

// Predicaten die de policy-weergave (Offer/Agreement) al elders toont.
const POLICY_SHOWN = () => new Set([
  RDF + 'type', ODRL + 'permission', ODRL + 'prohibition', ODRL + 'obligation',
  ODRL + 'assigner', ODRL + 'assignee', ODRL + 'uid', ODRL + 'profile',
  DCT + 'references', DCT + 'title', DCT + 'description',
  // dct:identifier = het KENMERK van het besluit(document) waar deze policy
  // uit voortkomt (BZK-briefnummer); readCommon leest het als eigen veld,
  // met skos:notation als gelijkwaardige alternatieve schrijfwijze.
  DCT + 'identifier', PREFIXES.skos + 'notation',
  DCT + 'publisher', DCT + 'issued', RDFS + 'label', RDFS + 'comment', PROV + 'wasRevisionOf',
  // De geldingsperiode van deze versie; readVersionInfo leest hem als
  // effectiveFrom/To en de versieregel toont hem al. Het schema-paar is de
  // eigen vorm, dct:valid de tolerante terugval — beide horen hier, anders
  // zou de niet-gelezen vorm alsnog onder "overige eigenschappen" opduiken.
  PROV + 'specializationOf', PROV + 'wasDerivedFrom', DCT + 'valid',
  SCHEMA_VALID_FROM, SCHEMA_VALID_THROUGH,
  // odrl:inheritFrom heeft sinds de overervings-ondersteuning een eigen plek in
  // de weergave (de "Geërfd van …"-vouwregel); als losse "overige eigenschap"
  // zou hij er dubbel staan.
  ODRL + 'inheritFrom',
]);

function readCommon(store, term) {
  // Blank-node-policies (zonder IRI) hebben geen tonbare identifier: het
  // interne parser-id ("n3-…") bestaat niet in de bron en mag nooit in de UI
  // lekken. `iri` blijft het interne id (navigatie/lookup); `curie` is null en
  // `anon` markeert de node, zodat weergaven de uid-regel weglaten.
  const anon = term.termType !== 'NamedNode';
  return {
    iri: term.value,
    curie: anon ? null : curie(term.value),
    anon,
    title: pickLiteral(objs(store, term, DCT + 'title')) || labelFor(store, term),
    description: pickLiteral(objs(store, term, DCT + 'description')),
    publisher: agentRef(store, obj(store, term, DCT + 'publisher')),
    issued: (obj(store, term, DCT + 'issued') || {}).value || null,
    profile: (obj(store, term, ODRL + 'profile') || {}).value || null,
    uid: (obj(store, term, ODRL + 'uid') || {}).value || null,
    // Kenmerk (dct:identifier): het documentkenmerk waaronder het besluit is
    // vastgesteld — een korte, citeerbare code naast de titel, geen tweede
    // identificatie van de policy (dat is odrl:uid). skos:notation is de
    // gelijkwaardige alternatieve schrijfwijze in dezelfde bronnen.
    identifier: pickLiteral(objs(store, term, DCT + 'identifier'))
      || pickLiteral(objs(store, term, PREFIXES.skos + 'notation')) || null,
    // odrl:inheritFrom (ODRL 2.2, Policy Inheritance): de OUDER(S) waarvan deze
    // policy de regels erft. Meervoud is toegestaan en komt in het wild voor;
    // de volgorde van de bron blijft staan. Een niet-IRI waarde (het wilde
    // odrlapi-sample050 zet er de string "literal" neer) is spec-fout, maar mag
    // niet stilzwijgend verdwijnen: hij komt als { iri: null, literal } mee
    // zodat de weergave hem eerlijk kan tonen.
    inheritFrom: objs(store, term, ODRL + 'inheritFrom').map((o) => (o.termType === 'NamedNode'
      ? { iri: o.value, curie: curie(o.value), literal: null }
      : { iri: null, curie: null, literal: o.value })),
  };
}

function readArtifact(store, term) {
  const common = readCommon(store, term);
  const types = typesOf(store, term);
  return {
    ...common,
    kind: 'artifact',
    types: types.map(curie),
    // De TYPE-pill moet de PROFIELKLASSE noemen (CedarPolicySet, RegoModule,
    // PolicyBundle …), niet de eerste de beste rdf:type. Artefacten dragen in
    // het wild ook schema:SoftwareSourceCode, en de volgorde van de triples is
    // toevallig — dan stond er "SoftwareSourceCode" waar de lezer de soort
    // machine-uitvoerbaar beleid verwacht.
    typeLabel: labelFor(store, namedNode(
      types.find((ty) => ty.startsWith(APNL)) || types[0] || (APNL + 'PolicyArtifact'))),
    format: (obj(store, term, DCT + 'format') || {}).value || null,
    downloadURL: (obj(store, term, DCAT + 'downloadURL') || {}).value || null,
    entrypoint: (obj(store, term, APNL + 'entrypoint') || {}).value || null,
    sha256: (obj(store, term, APNL + 'sha256') || {}).value || null,
    // Velden van het ARTEFACTFORMULIER die de kaart tot aug 2026 liet liggen:
    // de programmeertaal (schema:programmingLanguage — beide schema.org-
    // naamruimten komen in het wild voor), de vindplaats van de broncode
    // (dct:source) en de EERLIJKHEIDSNOOT (rdfs:comment), waarin de auteur
    // vastlegt hoever de implementatie werkelijk is. Die noot hoort bij een
    // artefact in dit profiel tot de kern: zonder haar leest een dekking als
    // een garantie.
    programmingLanguage: (obj(store, term, 'https://schema.org/programmingLanguage')
      || obj(store, term, 'http://schema.org/programmingLanguage') || {}).value || null,
    source: (obj(store, term, DCT + 'source') || {}).value || null,
    comment: pickLiteral(objs(store, term, RDFS + 'comment')),
    bundles: objs(store, term, APNL + 'bundles').map((b) => agentRef(store, b)),
    version: readVersionInfo(store, term),
  };
}

// Afbeelding van policy-typen op hun soort: de ODRL 2.2-kernklassen, plus
// alles wat de geladen graaf via rdfs:subClassOf (transitief) onder een
// bekende policyklasse hangt (profielsubklassen als data, zelfde patroon als
// targetPredicates). Een subklasse van Offer telt als offer, enz.; een
// (onbekende) subklasse van odrl:Policy telt als set.
function policyKinds(store) {
  const kinds = new Map([
    [ODRL + 'Offer', 'offer'], [ODRL + 'Agreement', 'agreement'],
    [ODRL + 'Set', 'set'], [ODRL + 'Policy', 'set'],
    // Overige policytypen uit de ODRL 2.2-kernvocabulaire.
    [ODRL + 'Privacy', 'set'], [ODRL + 'Request', 'set'],
    [ODRL + 'Ticket', 'set'], [ODRL + 'Assertion', 'set'],
  ]);
  let changed = true;
  while (changed) { // fixpunt over de subClassOf-hiërarchie in de graaf
    changed = false;
    for (const q of store.getQuads(null, namedNode(RDFS + 'subClassOf'), null, null)) {
      const superKind = kinds.get(q.object.value);
      if (superKind && !kinds.has(q.subject.value)) {
        kinds.set(q.subject.value, superKind);
        changed = true;
      }
    }
  }
  return kinds;
}

// --- Verzoeken (odrl:Request) -----------------------------------------------
// Een odrl:Request is in de ODRL-kern een volwaardige policy (hij blijft dus
// in policyKinds bij de sets horen), maar hij speelt in de drietrap een eigen
// rol: hij is de AANVRAAG die tot een overeenkomst leidt. De viewer moet hem
// daarom kunnen herkennen los van "set", zowel om hem op de
// overeenkomst-kaart als Verzoek-regel te tonen als om hem in de lijst een
// eigen soort-pil te geven.

// De verzoek-klassen: PROFILE_PATTERNS.requestClasses plus alles wat de
// geladen graaf er via rdfs:subClassOf (transitief) onder hangt — zelfde
// fixpunt-patroon als policyKinds.
function requestClasses(store) {
  const classes = new Set(PROFILE_PATTERNS.requestClasses);
  let changed = classes.size > 0;
  while (changed) {
    changed = false;
    for (const q of store.getQuads(null, namedNode(RDFS + 'subClassOf'), null, null)) {
      if (classes.has(q.object.value) && !classes.has(q.subject.value)) {
        classes.add(q.subject.value);
        changed = true;
      }
    }
  }
  return classes;
}

// Alle IRI's in de store die als verzoek getypeerd zijn.
function requestIris(store) {
  const out = new Set();
  for (const ty of requestClasses(store)) {
    for (const t of subs(store, RDF + 'type', namedNode(ty))) out.add(t.value);
  }
  return out;
}

// Compacte beschrijving van één verzoek, zoals de overeenkomst-kaart hem
// toont: kenmerk (dct:identifier / skos:notation — dezelfde twee schrijfwijzen
// als readCommon), datum (dct:issued) en INDIENER. Die indiener is de
// odrl:assignee: in een mini-verzoek staat die op de ene minimale permission,
// maar een verzoek dat hem op de policy zelf draagt telt net zo goed. De
// indiener kan een bestaande afnemer-IRI zijn óf een eigen partij-node met
// alleen een rdfs:label — beide leveren via agentRef hetzelfde
// { iri, curie, label }.
function readRequestRef(store, term, offerIris) {
  const ruleTerms = [
    ...objs(store, term, ODRL + 'permission'),
    ...objs(store, term, ODRL + 'prohibition'),
    ...objs(store, term, ODRL + 'obligation'),
  ];
  let assignee = obj(store, term, ODRL + 'assignee');
  for (const r of ruleTerms) {
    if (assignee) break;
    assignee = obj(store, r, ODRL + 'assignee');
  }
  return {
    ...agentRef(store, term),
    title: pickLiteral(objs(store, term, DCT + 'title')) || null,
    identifier: pickLiteral(objs(store, term, DCT + 'identifier'))
      || pickLiteral(objs(store, term, PREFIXES.skos + 'notation')) || null,
    issued: (obj(store, term, DCT + 'issued') || {}).value || null,
    requester: assignee ? agentRef(store, assignee) : null,
    // Het AANBOD dat dit verzoek aanvraagt (note §4, Request→Offer). Ook een
    // mini-verzoek onder een overeenkomst mag die betekenis dragen; zonder
    // aanbod-doelwit blijft de lijst leeg en verandert er niets aan de regel.
    asksFor: requestOffers(store, term, offerIris),
  };
}

// De odrl:Offers achter de prov:wasDerivedFrom van een verzoek. `offerIris` is
// de verzameling policy-IRI's die het model als Offer kent — dezelfde toets
// als de Agreement→Offer-route, zodat een verwijzing naar een bron-besluit,
// een PDF of een ander verzoek hier nooit voor een aanbod wordt aangezien.
function requestOffers(store, term, offerIris) {
  if (!offerIris || !offerIris.size) return [];
  const seen = new Set();
  return PROFILE_PATTERNS.requestOfferPreds
    .flatMap((pred) => objs(store, term, pred))
    .filter((v) => v.termType === 'NamedNode' && offerIris.has(v.value)
      && (seen.has(v.value) ? false : (seen.add(v.value), true)))
    .map((v) => agentRef(store, v));
}

// Alle subjecten die (via policyKinds) een policy van soort `kind` zijn,
// gededupliceerd met behoud van volgorde.
function policyTermsOfKind(store, kinds, kind) {
  const seen = new Set();
  const out = [];
  for (const [typeIri, k] of kinds) {
    if (k !== kind) continue;
    for (const t of subs(store, RDF + 'type', namedNode(typeIri))) {
      if (!seen.has(t.value)) { seen.add(t.value); out.push(t); }
    }
  }
  return out;
}

// --- Temporele versie-containers --------------------------------------------
// Versionering-als-containers: een lichtgewicht knoop groepeert de versies
// van één beleid. De vocabulaire-mapping (containerklassen, lid-properties,
// effectiviteits-properties) is DATA en staat in assets/temporal.js — één
// definitie, gedeeld met de SPARQL-querybouwers (sparql.js), zodat model en
// queries niet uiteen kunnen lopen. Zie de toelichting dáár.

// Geldingsperiode van een node. DRIE leesvormen, in vaste RANGORDE (de
// volledige motivering staat in assets/temporal.js):
//   1. het SCHEMA-PAAR `schema:validFrom` / `schema:validThrough` op de node
//      zelf — de EIGEN vorm sinds aug 2026. Twee platte datumliterals; een
//      lopende versie laat validThrough gewoon weg. Deze vorm WINT.
//   2. de DCAT-PERIODEKNOOP achter `dct:valid` (dcat:startDate/endDate) —
//      tolerante terugval voor derden-data en niet-gemigreerde grafen.
//   3. de LITERAL achter `dct:valid` — DCMI-periodestring, ISO-interval of
//      kale datum, via de stringontleding parseValidity hieronder.
// De rangorde is bewust en niet "eerste de beste wint": een bron die tijdens
// een migratie beide vormen draagt moet de eigen vorm te zien krijgen.
// Een node met ALLEEN schema:validThrough (zonder validFrom) telt óók als
// schema-vorm — een halve datering is data, en zou anders stilzwijgend door
// een oude dct:valid overschreven worden.
// Retourneert { from, to } (beide nullable).
export function readValidity(store, term) {
  const sFrom = obj(store, term, SCHEMA_VALID_FROM);
  const sThrough = obj(store, term, SCHEMA_VALID_THROUGH);
  if (sFrom || sThrough) {
    return { from: sFrom ? sFrom.value : null, to: sThrough ? sThrough.value : null };
  }
  let fallback = null;
  for (const o of objs(store, term, DCT + 'valid')) {
    if (o.termType === 'Literal') {
      if (fallback === null) fallback = parseValidity(o.value);
      continue;
    }
    // Periodeknoop. rdf:type dct:PeriodOfTime is NIET vereist: de knoop is al
    // herkenbaar aan zijn plek (object van dct:valid) en aan zijn datums; een
    // ontbrekend type mag de datering niet onzichtbaar maken.
    const start = obj(store, o, PERIOD_START_PRED);
    const end = obj(store, o, PERIOD_END_PRED);
    if (start || end) {
      return { from: start ? start.value : null, to: end ? end.value : null };
    }
  }
  return fallback || { from: null, to: null };
}

// dct:valid als LITERAL: een DCMI-periode ("start=2020-01-01; end=2030-01-01;"),
// een ISO 8601-interval ("2014-01-06/..") of een kale datum (telt als begin).
// Terugval-leesroute naast de DCAT-knoopvorm (zie readValidity).
// Retourneert { from, to } (beide nullable).
export function parseValidity(value) {
  const s = String(value == null ? '' : value).trim();
  if (!s) return { from: null, to: null };
  if (/start\s*=|end\s*=/.test(s)) {
    const pick = (key) => {
      const m = s.match(new RegExp(key + '\\s*=\\s*([^;]+)'));
      return m ? m[1].trim() : null;
    };
    return { from: pick('start'), to: pick('end') };
  }
  // ISO 8601-interval "<begin>/<eind>" (EDTF-stijl), met ".." of leeg voor een
  // open kant — de notatie die /brp-ap gebruikt ("2014-01-06/..",
  // "2012-06-01/2014-01-06"). Zonder deze tak belandde de hele intervalstring
  // als "begindatum" in het model.
  const iv = /^([^/\s]*)\/([^/\s]*)$/.exec(s);
  if (iv) {
    const open = (x) => (!x || x === '..' || x === '*' ? null : x);
    return { from: open(iv[1]), to: open(iv[2]) };
  }
  return { from: s, to: null };
}

// Draagt deze node datering (dct:issued / schema:validFrom / dct:valid /
// prov:wasRevisionOf)?
// Twee gebruiken: containerherkenning langs het PROV-patroon (de VERSIEzijde
// moet gedateerd zijn — anders is prov:specializationOf gewoon een
// abstractie-relatie en geen versielidmaatschap) en stub-herkenning (een lid
// zonder odrl-type dat wél datering draagt is een documentversie).
function hasVersionDating(store, term) {
  return VERSION_DATING_PREDS.some((p) => obj(store, term, p));
}

// Soort-hint op een CONTAINER-identiteit: `dct:type odrl:Agreement` (of Set/
// Offer) op de versieloze identiteit zegt wélke policysoort dit besluit wás.
// Nodig voor containers waarvan GEEN ENKELE versie meer getypeerd in de graaf
// staat — beëindigde besluiten (opgeheven afnemer), waarvan het register
// alleen nog documentversies (stubs) bevat. Zonder hint zou zo'n kaart in de
// generieke Beleidssets-sectie belanden terwijl het besluit een overeenkomst
// was. Bewust dct:type en niet rdf:type: met rdf:type odrl:Agreement zou de
// identiteit zélf een (lege, regelloze) policy worden en de containerroute
// hieronder juist uitschakelen. De mapping komt uit policyKinds (dus inclusief
// domeinsubklassen uit de graaf).
function containerKindHint(store, term, kinds) {
  for (const o of objs(store, term, DCT + 'type')) {
    if (o.termType === 'NamedNode' && kinds.has(o.value)) return kinds.get(o.value);
  }
  return null;
}

// Verzamel de temporele versie-containers uit de graaf. policyByIri koppelt
// leden aan het reeds gebouwde weergavemodel (alleen echte policies tellen als
// versie; een container-van-containers zoals de BRP-rootknoop en lege
// containers — afnemers zonder besluit in de geladen graaf — vallen af).
// Uitzondering op "alleen echte policies": een container met UITSLUITEND
// stub-versies telt wél mee zodra zijn identiteit een soort-hint draagt (zie
// containerKindHint) — zo blijft een beëindigd besluit zichtbaar.
// Versietelling die de skelet-graaf uit de lijst-SELECT op de container zette
// (zie SKELETON_COUNT_PRED in temporal.js). 0 als het feit er niet is — dan
// telt gewoon het aantal echt gelezen versies.
function skeletonVersionCount(store, term) {
  const o = obj(store, term, SKELETON_COUNT_PRED);
  const n = o ? parseInt(o.value, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function readTemporalContainers(store, policyByIri, kinds) {
  const nowIso = new Date().toISOString();
  const seen = new Set();
  const out = [];
  for (const vocab of TEMPORAL_VOCABS) {
    // Kandidaat-containers: langs het PROV-patroon (prov-regel) of op
    // lid-property (document-regel).
    const candidates = [];
    // Klasse-route — alleen nog de VIEWER-INTERNE skeletmarker
    // (SKELETON_CONTAINER_CLASS). De skelet-graaf uit de lijst-SELECT brengt
    // per rij maar ÉÉN versie mee; zou containerschap daar ook van de
    // datering van juist die versie afhangen, dan viel een ongedateerde
    // lijstrij uit haar container. Vocabulaire-containerklassen bestaan niet
    // meer (tpl:TemporalSet e.d. zijn geschrapt — zie temporal.js).
    for (const cls of vocab.containerClasses || []) {
      for (const t of subs(store, RDF + 'type', namedNode(cls))) candidates.push(t);
    }
    if (vocab.inverseMemberPreds.length) {
      // PROV-PATROON — de eigen route. Een node is versiecontainer wanneer
      // ≥1 POLICY er met prov:specializationOf naar wijst ("deze versie is
      // een specialisatie van die besluit-identiteit") ÉN die versiezijde
      // datering draagt. /brp-ap modelleert het zo: de versieloze
      // besluit-identiteit is een kale prov:Entity met alleen een titel.
      // De dateringseis houdt zuivere ABSTRACTIE-relaties buiten: een policy
      // die een generieke variant specialiseert zonder enige datum groepeert
      // geen versies. Doelen die zelf policy zijn vallen sowieso af (een
      // policy is geen groeperingsknoop).
      for (const p of vocab.inverseMemberPreds) {
        for (const q of store.getQuads(null, namedNode(p), null, null)) {
          if (q.object.termType !== 'NamedNode' || policyByIri.has(q.object.value)) continue;
          // Normaal levert een echte policy-versie de container op. Draagt de
          // container een soort-hint, dan volstaat een STUB-versie: bij een
          // beëindigd besluit is er geen getypeerde versie meer.
          const memberOk = policyByIri.has(q.subject.value)
            || containerKindHint(store, q.object, kinds);
          if (memberOk && (!vocab.requireVersionDating || hasVersionDating(store, q.subject))) {
            candidates.push(q.object);
          }
        }
      }
    } else {
      for (const p of vocab.memberPreds) {
        for (const q of store.getQuads(null, namedNode(p), null, null)) candidates.push(q.subject);
      }
    }
    for (const t of candidates) {
      if (t.termType !== 'NamedNode' || seen.has(t.value)) continue;
      if (vocab.requireTemporalData
        && !TEMPORAL_DOC_PREDS.some((p) => obj(store, t, p))) continue;
      seen.add(t.value);

      // Leden verzamelen (vooruit én invers), alleen bekende policies.
      const memberIris = new Set();
      for (const p of vocab.memberPreds) {
        for (const o of objs(store, t, p)) if (o.termType === 'NamedNode') memberIris.add(o.value);
      }
      for (const p of vocab.inverseMemberPreds) {
        for (const s of subs(store, p, t)) if (s.termType === 'NamedNode') memberIris.add(s.value);
      }
      // Leden: de echte policies plus de STUB-versies. Een stub is een lid dat
      // zelf geen policy is maar wel versiegegevens draagt — /brp-ap neemt van
      // een vervangen besluitversie bewust alleen de temporele documentdata op
      // ("Vervangen besluitversie: alleen de temporele documentdata zijn
      // opgenomen": titel, de geldingsdatums en een verwijzing naar de
      // besluit-PDF).
      // Zonder deze leden zou de versienavigator daar één versie zonder pijlen
      // tonen, terwijl de bron een volledige besluithistorie beschrijft.
      const versions = [];
      const stubIris = [];
      for (const iri of memberIris) {
        const pol = policyByIri.get(iri);
        if (pol) { versions.push(pol); continue; }
        if (hasVersionDating(store, namedNode(iri))) stubIris.push(iri);
      }
      // Een container zonder enige echte policy is geen weergavecontainer
      // (lege containers, containers-van-containers) — TENZIJ hij stubs heeft
      // én zijn identiteit zegt welke policysoort hij was: dat is een beëindigd
      // besluit, waarvan alleen nog documentversies bestaan.
      const kindHint = containerKindHint(store, t, kinds);
      if (!versions.length && !(stubIris.length && kindHint)) continue;

      // Geldigheid op de container/het document zelf (CG-document-patroon).
      const docValid = readValidity(store, t);
      const docFrom = docValid.from;
      const docTo = docValid.to;

      // Per versie: de eigen geldingsperiode van die versie (het schema-paar,
      // met dct:valid als terugval), en pas daarna die van de container/het
      // document. Het hele register (brp-odrl én brp-ap) dateert per versie.
      const ownValid = (term) => readValidity(store, term);
      const vs = versions.map((pol) => {
        const own = ownValid(pol.term);
        return {
          iri: pol.iri,
          curie: pol.curie,
          kind: pol.kind,
          title: pol.title,
          // Uitgiftedatum (dct:issued): de datum die de versienavigator toont,
          // met terugval op effectiveFrom.
          issued: pol.issued || null,
          effectiveFrom: (pol.version && pol.version.effectiveFrom) || own.from || docFrom,
          effectiveTo: (pol.version && pol.version.effectiveTo) || own.to || docTo,
          revisionOfIri: (pol.version && pol.version.revisionOf && pol.version.revisionOf.iri) || null,
          stub: false,
        };
      });
      for (const iri of stubIris) {
        const term = namedNode(iri);
        const period = readValidity(store, term);
        const revOf = obj(store, term, PROV + 'wasRevisionOf');
        vs.push({
          iri,
          curie: curie(iri),
          title: pickLiteral(objs(store, term, DCT + 'title')) || labelFor(store, term),
          issued: (obj(store, term, DCT + 'issued') || {}).value || null,
          effectiveFrom: period.from || docFrom,
          effectiveTo: period.to || docTo,
          revisionOfIri: revOf && revOf.termType === 'NamedNode' ? revOf.value : null,
          // Soort van een stub: die van de container-identiteit (zie
          // containerKindHint). Zo weet de weergave dat de kaart van een
          // beëindigd besluit een OVEREENKOMST-kaart is, ook al draagt geen
          // enkele versie nog een odrl:Agreement-type.
          kind: kindHint,
          // Alleen de documentdata van deze versie staan in de bron; de regels
          // zelf niet. De weergave zegt dat er expliciet bij.
          stub: true,
          sources: objs(store, term, PROV + 'wasDerivedFrom')
            .filter((o) => o.termType === 'NamedNode').map((o) => o.value),
          // Alle comments (de stub draagt er meerdere: documentdata-notitie
          // én de obligations-herkomst), niet slechts één.
          comment: objs(store, term, RDFS + 'comment')
            .filter(isLiteral).map((o) => o.value).join('\n\n') || null,
          // Verplichtingen kunnen wél op de stub zelf staan (doorwerking
          // vanuit het aanbod, aangevuld door maak-versiehistorie) — lees ze,
          // zodat de kaart ze niet uit de bronlaag hoeft te halen.
          obligations: sortRules(objs(store, term, ODRL + 'obligation')
            .map((d) => readDuty(store, d))),
        });
      }

      // Sorteer chronologisch: effectiveFrom (ISO-strings sorteren lexicaal),
      // bij gelijke/ontbrekende data de prov:wasRevisionOf-ketenlengte.
      const vByIri = new Map(vs.map((v) => [v.iri, v]));
      const rankMemo = new Map();
      const rank = (v, trail = new Set()) => {
        if (rankMemo.has(v.iri)) return rankMemo.get(v.iri);
        if (trail.has(v.iri)) return 0; // cyclusbescherming
        trail.add(v.iri);
        const prev = v.revisionOfIri ? vByIri.get(v.revisionOfIri) : null;
        const r = prev ? rank(prev, trail) + 1 : 0;
        rankMemo.set(v.iri, r);
        return r;
      };
      vs.sort((a, b) => {
        const af = a.effectiveFrom || '';
        const bf = b.effectiveFrom || '';
        if (af !== bf) return af < bf ? -1 : 1;
        return rank(a) - rank(b);
      });

      // Geldende versie: effectiveFrom <= nu < effectiveTo; binnen de actieve
      // versies wint degene zonder (actieve) opvolger, anders de laatste
      // actieve; zijn er geen actieve versies, dan de laatste in de sortering.
      // STUB-versies (alleen documentdata) kunnen dit nooit worden: de kaart
      // van de container moet een echte policy tonen.
      const real = vs.filter((v) => !v.stub);
      const active = real.filter((v) => (!v.effectiveFrom || v.effectiveFrom <= nowIso)
        && (!v.effectiveTo || v.effectiveTo > nowIso));
      // BEËINDIGD: geen enkele versie is nog actief én ELKE versie (ook de
      // stubs) heeft een expliciet einde in het verleden. Dan is de terugval
      // "de laatste versie geldt" onjuist — het besluit is afgelopen (BRP:
      // opgeheven afnemers, bv. de regiokorpsen per 2001). Ontbreekt ergens
      // een einddatum, dan blijft de oude terugval staan: een container zonder
      // temporele data is niet beëindigd, alleen ongedateerd.
      const terminated = vs.length > 0 && !active.length
        && vs.every((v) => v.effectiveTo && v.effectiveTo <= nowIso);
      const revisedIris = new Set(active.map((v) => v.revisionOfIri).filter(Boolean));
      const unrevised = active.filter((v) => !revisedIris.has(v.iri));
      // Ingang van de kaart: de geldende versie, of — bij een beëindigde of
      // stub-only container — de laatste versie in de chronologie.
      const current = unrevised.length ? unrevised[unrevised.length - 1]
        : (active.length ? active[active.length - 1]
          : ((terminated || !real.length) ? vs[vs.length - 1] : real[real.length - 1]));
      vs.forEach((v, i) => {
        // Neutrale status-enum (B17): het model en de CSS-klassen dragen
        // current/future/superseded/terminated; NL-woorden alleen in de
        // presentatielaag (statusWord).
        v.status = terminated
          ? (v.iri === current.iri ? 'terminated' : 'superseded')
          : (v.iri === current.iri ? 'current'
            : (v.effectiveFrom && v.effectiveFrom > nowIso ? 'future' : 'superseded'));
        // Impliciet einde: expliciete effectiveTo, anders de ingang van de
        // opvolger (zolang een opvolger niet effectief is, geldt de vorige).
        v.until = v.effectiveTo || (vs[i + 1] ? vs[i + 1].effectiveFrom : null);
      });

      out.push({
        vocab: vocab.id,
        term: t,
        iri: t.value,
        curie: curie(t.value),
        title: pickLiteral(objs(store, t, DCT + 'title')) || labelFor(store, t),
        uid: (obj(store, t, ODRL + 'uid') || {}).value || null,
        validFrom: docFrom,
        validTo: docTo,
        versions: vs,
        // Hoeveel versies deze container in de VOLLE graaf heeft. Normaal
        // gewoon vs.length; in ?sparql=-lijstmodus staat het aantal als
        // skeletfeit in de graaf (SKELETON_COUNT_PRED) terwijl `versions` nog
        // maar één lid kent — de historische zusterversies komen pas met het
        // detail-CONSTRUCT mee. De navigator-chip leest dit om te weten dát er
        // te bladeren valt; nooit lager dan wat we echt in handen hebben.
        versionCount: Math.max(vs.length, skeletonVersionCount(store, t)),
        currentIri: current.iri,
        // Policysoort van de container: die van de geldende/laatste ECHTE
        // versie, anders de hint op de identiteit (beëindigde besluiten).
        kind: (current && current.kind) || kindHint || null,
        // Geen enkele versie geldt nog (zie hierboven); de weergave toont dan
        // "beëindigd" in plaats van een geldende-versie-weergave.
        terminated,
        // Alleen documentversies: de regels van elke versie staan in de
        // bron-datalaag, niet op de versie zelf.
        stubOnly: !real.length,
      });
    }
  }
  return out;
}

// Weergavewoord voor de neutrale versiestatus-enum (presentatielaag; model en
// CSS gebruiken de enum-waarden `current`/`future`/`superseded`/`terminated`).
// `terminated` = laatste versie van een besluit dat is afgelopen (geen
// opvolger, einddatum in het verleden) — niet "vervallen" (dat suggereert een
// opvolger). De woorden staan per taal in i18n.js; een onbekende status valt
// terug op de enum-waarde zelf.
const STATUS_KEYS = {
  current: 'status.current', future: 'status.future',
  superseded: 'status.superseded', terminated: 'status.terminated',
};
export function statusWord(status) {
  return STATUS_KEYS[status] ? t(STATUS_KEYS[status]) : String(status || '');
}

// --- Levensfase van een KAART (container of losse policy) --------------------
// De statuschip zegt iets over de GETOONDE VERSIE; voor filteren ("alleen
// actieve") is de vraag een andere: doet dit besluit nog mee? Neutrale enum
// (B17), weergavewoorden via lifecycleWord/lifecyclePluralWord.
//   active     — er is een geldende versie (of geen temporele data: dan is er
//                niets dat het besluit beëindigt)
//   terminated — beëindigd: alle versies zijn afgelopen
//   future     — treedt pas in werking
const LIFECYCLES_ALL = ['active', 'terminated', 'future'];
export function lifecycleWord(phase) {
  return LIFECYCLES_ALL.includes(phase) ? t('lifecycle.' + phase) : String(phase || '');
}
export function lifecyclePluralWord(phase) {
  return LIFECYCLES_ALL.includes(phase) ? t('lifecyclePlural.' + phase) : String(phase || '');
}

// Levensfase van één policy binnen het model: eerst de container (die kent de
// hele versiereeks), anders de eigen temporele data van de policy.
export function policyLifecycle(model, policy, now = new Date().toISOString()) {
  const iri = policy && policy.iri;
  const c = iri ? temporalContainerFor(model, iri) : null;
  if (c) {
    if (c.terminated) return 'terminated';
    const shown = c.versions.find((v) => v.iri === iri);
    if (shown && shown.status === 'future') return 'future';
    return 'active';
  }
  const v = (policy && policy.version) || {};
  if (v.effectiveTo && v.effectiveTo <= now) return 'terminated';
  if (v.effectiveFrom && v.effectiveFrom > now) return 'future';
  return 'active';
}

// Containers waarvan GEEN ENKELE versie een getypeerde policy in het model is
// (alleen documentstubs) én waarvan de identiteit zegt dat hij van soort
// `kind` was — beëindigde besluiten. Ze hebben geen policy-object in
// model.agreements/sets/offers, dus de weergave moet ze apart aan zijn sectie
// toevoegen (de kaart komt uit de LAATSTE versie: currentIri).
export function stubOnlyContainers(model, kind) {
  return (model.temporalContainers || [])
    .filter((c) => c.stubOnly && c.kind === kind);
}

// De OMGEKEERDE richting van de Agreement→Request-relatie: welke
// overeenkomst(en) beantwoorden een verzoek. Levert een Map van verzoek-IRI
// naar { iri, title } van elke overeenkomst die er via
// PROFILE_PATTERNS.agreementRequestPreds naar verwijst (de typecheck op
// odrl:Request is bij het lezen al gedaan, zie model.agreements[].requests).
//
// Waarom omgekeerd: de Verzoeken-sectie toont ELK verzoek, ook een dat nog
// nergens beantwoord is. Op de verzoek-kaart hoort dan de regel "beantwoord
// door ‹overeenkomst›" — en die relatie staat in de data uitsluitend aan de
// overeenkomst-kant. Een verzoek zonder beantwoordende overeenkomst komt in
// deze Map niet voor; de kaart laat de regel dan gewoon weg. Er wordt GEEN
// afwijzing of andere status uit afgeleid: dat de graaf geen antwoord kent
// betekent niet dat het verzoek is afgewezen.
//
// Tot aug 2026 stond hier requestsUnderAgreements(): dezelfde relatie, maar
// gebruikt om verzoek-stubs UIT de lijst te houden (ze stonden alleen als
// regel op de overeenkomst-kaart). Die onderdrukking is vervallen — verzoeken
// hebben nu een eigen top-sectie — en de relatie wordt nu andersom gelezen.
export function agreementsByRequest(model) {
  const out = new Map();
  for (const a of (model && model.agreements) || []) {
    for (const r of a.requests || []) {
      if (!r || !r.iri) continue;
      if (!out.has(r.iri)) out.set(r.iri, []);
      const list = out.get(r.iri);
      if (!list.some((x) => x.iri === a.iri)) list.push({ iri: a.iri, title: a.title });
    }
  }
  return out;
}

// De versie waaruit de kaart van een container gebouwd wordt: de geldende,
// of bij een beëindigd besluit de laatste.
export function containerCardVersion(c) {
  if (!c || !c.versions || !c.versions.length) return null;
  return c.versions.find((v) => v.iri === c.currentIri) || c.versions[c.versions.length - 1];
}

// Container waarvan deze policy-IRI een versie is (of null).
export function temporalContainerFor(model, iri) {
  for (const c of model.temporalContainers || []) {
    if (c.versions.some((v) => v.iri === iri)) return c;
  }
  return null;
}

// Weergavemodel van de versienavigator-chip: de getoonde versie binnen zijn
// temporele container, met de directe buren. `older` is de eerstvolgende
// OUDERE versie (‹-pijl), `newer` de eerstvolgende NIEUWERE (›-pijl); is er
// geen container of maar één versie, dan blijven beide null (de chip toont
// dan alleen de datum). c.versions is chronologisch gesorteerd (oud → nieuw).
export function versionNavModel(model, iri) {
  if (!model || !iri) return null;
  const container = temporalContainerFor(model, iri);
  if (!container) return null;
  const versions = container.versions || [];
  const index = versions.findIndex((v) => v.iri === iri);
  if (index < 0) return null;
  // `total` is wat de graaf ZEGT dat de container telt (skeletfeit uit de
  // lijst-SELECT); `versions` is wat we er echt van gelezen hebben. In
  // ?sparql=-lijstmodus lopen die uiteen zolang het detail niet geladen is:
  // dan is total > versions.length en zijn de buren simpelweg nog onbekend —
  // `complete: false` zegt de chip dat hij die stand niet mag geloven.
  const total = Math.max(versions.length, (container && container.versionCount) || 0);
  return {
    container,
    versions,
    index,
    total,
    complete: versions.length >= total,
    shown: versions[index],
    older: index > 0 ? versions[index - 1] : null,
    newer: index < versions.length - 1 ? versions[index + 1] : null,
  };
}

// Datum van één versie voor de navigator-chip: dct:issued, terugval
// tpl:effectiveFrom, anders "—". Dagnotatie in NL-volgorde (dd-mm-jjjj);
// waarden die geen volledige datum zijn blijven ongewijzigd staan.
export function versionNavDate(v) {
  const raw = compactDate((v && v.issued) || (v && v.effectiveFrom) || null);
  if (!raw) return '—';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(raw));
  return m ? `${m[3]}-${m[2]}-${m[1]}` : String(raw);
}

// --- Dekking: welke logische regels werkt een andere knoop uit? -------------
// Het profiel legt de dekking expliciet als data vast met prov:wasDerivedFrom.
// De detectie volgt sinds aug 2026 de LINKDOCTRINE van de Visualisatie-note:
// een link is gedefinieerd door PREDICAAT + TYPERING VAN HET DOELWIT, nooit
// door een klassenlijst van bronknopen.
//
//   S prov:wasDerivedFrom R,  R is een REGEL met odrl:uid  ⟹  S dekt R
//
// Wat S ís (Rego-module, OPA-bundel, besluitbundel, gematerialiseerde
// autorisatietabel) is profielkennis die S zélf draagt in zijn rdf:type en
// label; de viewer heeft daar geen lijst meer voor nodig. Vóór deze wissel
// keek de detectie naar apnl:PolicyArtifact/RegoModule/… als bron, waardoor
// een net zo geldige dekker buiten het apnl-vocabulaire onzichtbaar bleef.
//
// De ANDERE betekenissen van hetzelfde predicaat blijven ongemoeid, precies
// omdat de typecheck op het doelwit zit: Agreement→Offer, Agreement→Request en
// documentherkomst wijzen naar policies respectievelijk documenten, en die
// zijn geen regel. Zonder odrl:uid is een regel niet dekbaar: dekking moet in
// protocollering herleidbaar zijn aan de uid (zie sections/conforms-to-policy.md).
//
// Twee onafhankelijke feiten, bewust apart:
//  - `coveredBy` hoort bij de REGEL (hij is doelwit van wasDerivedFrom) en
//    geldt overal waar de regel verschijnt, ook op de Offer-kaart;
//  - `uncovered` hoort bij de CONTEXT: alleen binnen een policy die zélf een
//    conformsToPolicy-toets aanhaalt is "niet gedekt" een zinnige mededeling.
//    In een policy zonder machine-uitvoerbare laag zou de melding niets
//    betekenen en blijft hij achterwege.

// Alle klassen die als regel tellen: de ODRL-kernklassen plus wat de graaf er
// via rdfs:subClassOf (transitief) onder hangt — zelfde fixpunt-patroon als
// policyKinds()/requestClasses(), zodat een profielsubklasse van odrl:Duty
// vanzelf meetelt.
function ruleClasses(store) {
  const classes = new Set(PROFILE_PATTERNS.ruleClasses);
  let changed = classes.size > 0;
  while (changed) {
    changed = false;
    for (const q of store.getQuads(null, namedNode(RDFS + 'subClassOf'), null, null)) {
      if (classes.has(q.object.value) && !classes.has(q.subject.value)) {
        classes.add(q.subject.value);
        changed = true;
      }
    }
  }
  return classes;
}

// De IRI's die als DEKBARE REGEL tellen: getypeerd als regel óf in regelpositie
// aan een policy/regel hangend, én voorzien van een odrl:uid.
export function coverableRuleIris(store) {
  const candidates = new Set();
  for (const ty of ruleClasses(store)) {
    for (const t of subs(store, RDF + 'type', namedNode(ty))) {
      if (t.termType === 'NamedNode') candidates.add(t.value);
    }
  }
  for (const pred of PROFILE_PATTERNS.rulePreds) {
    for (const q of store.getQuads(null, namedNode(pred), null, null)) {
      if (q.object.termType === 'NamedNode') candidates.add(q.object.value);
    }
  }
  const out = new Set();
  for (const iri of candidates) {
    if (objs(store, namedNode(iri), ODRL + 'uid').length) out.add(iri);
  }
  return out;
}

// De klassen die als VOORWAARDE tellen: odrl:Constraint/odrl:LogicalConstraint
// plus wat de graaf er via rdfs:subClassOf onder hangt — zelfde fixpunt als
// ruleClasses(), zodat een profielsubklasse vanzelf meetelt.
function constraintClasses(store) {
  const classes = new Set(PROFILE_PATTERNS.constraintClasses);
  let changed = classes.size > 0;
  while (changed) {
    changed = false;
    for (const q of store.getQuads(null, namedNode(RDFS + 'subClassOf'), null, null)) {
      if (classes.has(q.object.value) && !classes.has(q.subject.value)) {
        classes.add(q.subject.value);
        changed = true;
      }
    }
  }
  return classes;
}

// De IRI's die als DEKBARE VOORWAARDE tellen: een IRI-knoop in
// odrl:constraint-/odrl:refinement-positie, getypeerd als (Logical)Constraint.
// Twee uitsluitingen, allebei principieel:
//  - een BLANK NODE is niet dekbaar: er is niets om in protocollering aan te
//    halen (dezelfde eis als odrl:uid bij een regel). Zulke voorwaarden
//    blijven gewoon zichtbaar, ze tellen alleen niet mee in de status;
//  - de TECHNISCHE BORGING zelf (dpv:TechnicalMeasure, of — terugval — de
//    conformsToPolicy-toets) is nooit dekkingsdoel: die WIJST de
//    machine-uitvoerbare laag aan, hij wordt er niet door afgedwongen. Zou hij
//    meetellen, dan zou een regel zichzelf via zijn eigen toets "afgedwongen"
//    kunnen noemen.
// Een dpv:OrganisationalMeasure blijft hier wél in: zij IS een dekkingsdoel
// (een uitwerking mag haar afdwingen), zij telt alleen niet mee in de status —
// dat onderscheid maakt ruleCoverage hieronder.
export function coverableConstraintIris(store) {
  const classes = constraintClasses(store);
  const out = new Set();
  for (const pred of PROFILE_PATTERNS.constraintPreds) {
    for (const q of store.getQuads(null, namedNode(pred), null, null)) {
      const o = q.object;
      if (o.termType !== 'NamedNode' || out.has(o.value)) continue;
      if (!typesOf(store, o).some((ty) => classes.has(ty))) continue;
      if (isTechnicalMeasure(store, o)) continue;
      out.add(o.value);
    }
  }
  return out;
}

// Alles wat in REGEL- of VOORWAARDEPOSITIE hangt, dekbaar of niet. Hiermee
// scheidt de dekkingsdetectie twee soorten "onbekend doelwit" van elkaar: een
// prov:wasDerivedFrom naar een aanbod, een verzoek of een besluit-PDF is een
// van de ANDERE betekenissen van hetzelfde predicaat en hoort te zwijgen —
// maar een verwijzing naar een regel zonder uid, een ongetypeerde voorwaarde
// of een blanke voorwaarde is een dekkingsverklaring die niet aankomt, en die
// hoort de lezer te horen (model.coverageUnresolved).
function coveragePositionValues(store) {
  const out = new Set();
  for (const pred of [...PROFILE_PATTERNS.rulePreds, ...PROFILE_PATTERNS.constraintPreds]) {
    for (const q of store.getQuads(null, namedNode(pred), null, null)) out.add(q.object.value);
  }
  return out;
}

// Compacte beschrijving van een DEKKENDE knoop voor de chip: zijn naam, en zijn
// eigen type-label — dat laatste is precies wat de viewer niet meer zelf hoeft
// te weten ("Rego-module", "beleidsbundel", "prov:Entity"-titel …).
function coverageNodeRef(store, term) {
  const types = typesOf(store, term).filter((ty) => !RULE_TYPE_IRIS.has(ty));
  // Welk type noemt de chip? Niet simpelweg types[0]: een dekker draagt er
  // vaak twee (een profielklasse als apnl:RegoModule naast een algemene als
  // schema:SoftwareSourceCode) en de volgorde van de triples is toevallig —
  // in ttl-modus stond er "RegoModule", in ?sparql=-modus "SoftwareSourceCode",
  // bij dezelfde data. Twee regels, in deze volgorde:
  //   1. een type met een LABEL wint van een type zonder (een label zegt
  //      altijd meer dan de localName-terugval);
  //   2. daarbinnen de alfabetisch eerste curie. Niet omdat die beter is,
  //      maar omdat hij in elke modus dezelfde is.
  const typeIri = [...types]
    .sort((a, b) => (!!namedLabel(store, namedNode(b)) - !!namedLabel(store, namedNode(a)))
      || collate(curie(a), curie(b)))[0] || null;
  return {
    iri: term.value,
    curie: curie(term.value),
    title: pickLiteral(objs(store, term, DCT + 'title')) || labelFor(store, term),
    typeLabel: typeIri ? labelFor(store, namedNode(typeIri)) : null,
    types: types.map(curie),
    kind: 'coverer',
  };
}

const RULE_TYPE_IRIS = new Set([ODRL + 'Permission', ODRL + 'Prohibition', ODRL + 'Duty']);

// WIE KRIJGT DE ATTRIBUTIE? (aug 2026 — twee afzenders, één dekker.)
//
// Dekking is "elke inkomende prov:wasDerivedFrom, ongeacht bron" (note §7, "any
// node"), en dat blijft zo: de detectie hieronder kijkt naar het DOELWIT. Maar
// de weergave noemt ook de DEKKER bij naam ("afgedwongen door ‹bundel›", de
// rijen in het invulling-paneel, de omgekeerde index per knoop), en dan maakt
// het uit wie er stond.
//
// Er zijn twee vormen, allebei geldig:
//   a) HET ARTEFACT is de afzender  — bundle prov:wasDerivedFrom regel  (vb3,
//      vb7, Breda: de oorspronkelijke vorm, blijft werken);
//   b) HET ANKER is de afzender     — anker prov:wasDerivedFrom regel, waarbij
//      het anker de conformsToPolicy-refinement ín de policy is en het artefact
//      in zijn odrl:rightOperand noemt (Vlierdam sinds aug 2026).
//
// Bij vorm (b) is het ANKER de realiserende kant in ODRL-termen, maar wat de
// lezer wil zien is de bundel die hij ook in de conformsToPolicy-rij ziet staan
// — het anker is de meta-voorwaarde, geen ding met een naam, een hash en een
// downloadURL. De attributie loopt daarom door naar de rechterwaarde. Zo levert
// vorm (a) en vorm (b) dezelfde dekking én dezelfde dekkersnaam op, en blijven
// alle plekken die op de artefact-IRI sleutelen (rowsByNode, coverageByNode,
// artefact.covers) ongewijzigd werken.
//
// Zonder rechterwaarde valt de attributie terug op de knoop zelf: dan is er
// niets beters, en zwijgen zou de dekking laten verdwijnen.
function coverageAttribution(store, term) {
  if (term.termType !== 'NamedNode') return term;
  const art = readConformsTo(store, term);
  return art ? namedNode(art) : term;
}

function annotateCoverage(store, model) {
  model.coverageByNode = {};
  // Dekkingsverklaringen die niet aankomen (zie coveragePositionValues).
  model.coverageUnresolved = [];
  const ruleIris = coverableRuleIris(store);
  const condIris = coverableConstraintIris(store);
  if (!ruleIris.size && !condIris.size) return;
  const positioned = coveragePositionValues(store);
  const byRule = new Map(); // regel-IRI -> [coverageNodeRef]
  const byCond = new Map(); // voorwaarde-IRI -> [coverageNodeRef]
  // De KETENSCHAKELS: regel-IRI -> [voorwaarde-IRI's die hem uitwerken]. Zie
  // de toelichting bij `via` verderop.
  const byChain = new Map();
  const refCache = new Map();
  for (const pred of PROFILE_PATTERNS.coveragePreds) {
    for (const q of store.getQuads(null, namedNode(pred), null, null)) {
      const R = q.object;
      const S = q.subject;
      // Een anonieme dekker is niet aanhaalbaar (geen verken-knop, geen uid in
      // protocollering); een zelfverwijzing is geen dekking.
      if (S.termType !== 'NamedNode' || S.value === R.value) continue;
      // KETEN. Is de BRON zelf een benoemde voorwaarde en het doelwit een
      // regel, dan is dit geen artefactdekking maar een SCHAKEL: "deze
      // voorwaarde is de uitwerking van die regel". Dezelfde relatie, dus
      // hetzelfde predicaat — maar een voorwaarde dwingt niets af, zij wordt
      // zelf afgedwongen. Wie haar afdwingt, dwingt de regel mee af; dat
      // wordt hieronder `coverage.via`. Zou deze schakel als gewone dekking
      // meetellen, dan zou de regel "afgedwongen door <voorwaarde>" heten en
      // zou het raderwiel naar een voorwaarde springen in plaats van naar een
      // artefact.
      if (condIris.has(S.value) && R.termType === 'NamedNode' && ruleIris.has(R.value)) {
        if (!byChain.has(R.value)) byChain.set(R.value, []);
        const links = byChain.get(R.value);
        if (!links.includes(S.value)) links.push(S.value);
        continue;
      }
      const target = R.termType === 'NamedNode' && ruleIris.has(R.value) ? byRule
        : (R.termType === 'NamedNode' && condIris.has(R.value) ? byCond : null);
      // De DEKKER zoals de weergave hem noemt: het artefact, ook wanneer het
      // anker de afzender is (zie coverageAttribution).
      const A = coverageAttribution(store, S);
      if (!target) {
        if (positioned.has(R.value)) {
          model.coverageUnresolved.push({
            from: A.value, fromCurie: curie(A.value),
            target: R.value, targetCurie: R.termType === 'NamedNode' ? curie(R.value) : null,
            reason: R.termType !== 'NamedNode' ? 'anon' : 'not-coverable',
          });
        }
        continue;
      }
      if (!refCache.has(A.value)) refCache.set(A.value, coverageNodeRef(store, A));
      if (!target.has(R.value)) target.set(R.value, []);
      const list = target.get(R.value);
      if (!list.some((x) => x.iri === A.value)) list.push(refCache.get(A.value));
    }
  }
  const named = (p) => [...(p.permissions || []), ...(p.prohibitions || [])];
  // Draagt de regel een TECHNISCHE BORGING? Op de marker, met de operator als
  // terugval — zie isTechnicalMeasure. Niet op `conformsTo`: een borging zonder
  // rechterwaarde is nog steeds een borging.
  const carriesConformsTo = (r) => ruleConstraints(r).some((c) => c.technicalMeasure);
  const hasConformsTo = (pol) => named(pol).some(carriesConformsTo);
  const allPolicies = [...model.offers, ...model.agreements, ...model.sets];
  // Een policy die zelf geen uitwerking aanhaalt, kan er tóch een hebben: haar
  // regels werken via odrl:inheritFrom door naar een beslispunt dat dat wél
  // doet (ODRL 2.2 §2.6 — ouder- en kindregels gelden samen). Een
  // stelselverplichting hoort dus dezelfde dekkingsmededelingen te dragen als
  // de regels van het beslispunt dat haar overneemt. `inherited` staat er al:
  // annotateInheritance draait vóór deze functie (zie buildModel).
  const geerfdInContext = new Set();
  for (const pol of allPolicies) {
    if (!hasConformsTo(pol)) continue;
    for (const g of pol.inherited || []) if (g.iri) geerfdInContext.add(g.iri);
  }
  const inContext = (pol) => hasConformsTo(pol) || (!!pol.iri && geerfdInContext.has(pol.iri));
  // De dekking op het voorwaarde-OBJECT zelf: die reist mee naar elke plek waar
  // de voorwaarde verschijnt (regelrij, collectie-afbakening, dekkingsuitklap).
  // Elk benoemd voorwaarde-OBJECT dat we onderweg tegenkomen, op IRI. De
  // ketenstap heeft het nodig: de schakel staat in een ANDERE policy dan de
  // regel die zij uitwerkt, dus de weergave kan hem daar niet zelf vinden.
  // ALLE objecten per IRI, niet alleen het eerste: dezelfde benoemde voorwaarde
  // krijgt per regel een eigen object (readPermission cachet voorwaarden niet),
  // en de omgekeerde link `fulfils` hoort op elk van die objecten te staan.
  const condObjsByIri = new Map();
  // In WELKE policy staat een voorwaarde? De weergave filtert de keten op de
  // omhullende kaart: op de RvIG-kaart alleen de RvIG-keten, op de outway-kaart
  // alleen de outway-ketens — anders zou één gedeelde stelselplicht op elke
  // kaart alle uitwerkingen van alle beslispunten opsommen.
  const condPolicies = new Map();
  let curPol = null;
  const markConstraint = (c, depth = 0) => {
    if (!c || typeof c !== 'object') return;
    // HET ANKER ALS REALISERENDE KNOOP. Draagt de conformsToPolicy-rij zelf
    // uitgaande prov:wasDerivedFrom (de Vlierdam-vorm), dan zegt zij LETTERLIJK
    // wat zij uitwerkt. De weergave leest dat lijstje in plaats van het uit de
    // dekking terug te rekenen; bij een blank anker of de oude artefact-vorm
    // blijft `realises` leeg en valt zij terug op de dekking (zie doc.js).
    if (c.technicalMeasure && c.iri) {
      const eigen = [];
      for (const pred of PROFILE_PATTERNS.coveragePreds) {
        for (const o of objs(store, namedNode(c.iri), pred)) {
          if (o.termType === 'NamedNode' && !eigen.includes(o.value)) eigen.push(o.value);
        }
      }
      if (eigen.length) c.realises = eigen;
    }
    if (c.iri) {
      if (!condObjsByIri.has(c.iri)) condObjsByIri.set(c.iri, []);
      const objs2 = condObjsByIri.get(c.iri);
      if (!objs2.includes(c)) objs2.push(c);
      if (curPol) {
        if (!condPolicies.has(c.iri)) condPolicies.set(c.iri, new Set());
        condPolicies.get(c.iri).add(curPol);
      }
    }
    const cov = c.iri ? byCond.get(c.iri) : null;
    if (cov) c.coveredBy = cov;
    if (depth < 5) for (const ch of c.children || []) markConstraint(ch, depth + 1);
  };
  const markCollection = (desc) => {
    const refs = desc && desc.intension && desc.intension.refinements;
    for (const c of refs || []) markConstraint(c);
  };
  // De BENOEMDE voorwaarden van één regel: de dekbare knopen in haar eigen
  // odrl:constraint-/refinement-posities. De conformsToPolicy-toets valt hier
  // al buiten (coverableConstraintIris laat hem niet toe).
  const ownConditions = (r) => ruleConstraints(r)
    .filter((c) => c && c.iri && condIris.has(c.iri));
  // De regelstatus is AFGELEID, geen apart feit in de data:
  //   full    = de regel zelf gedekt én alle MEETELLENDE voorwaarden gedekt;
  //   partial = de regel gedekt maar niet alles, óf voorwaarden zonder de regel;
  //   none    = niets gedekt.
  // Blank-node-voorwaarden tellen niet mee (niet dekbaar, zie hierboven), en
  // evenmin de twee GEMARKEERDE soorten (zie PROFILE_PATTERNS): de technische
  // borging valt al buiten `ownConditions`, en een dpv:OrganisationalMeasure
  // wordt hieronder overgeslagen. Zo betekent "volledig afgedwongen" precies:
  // alles wat technisch hoort te kunnen, is gerealiseerd.
  const ruleCoverage = (r) => {
    // `rule` = de dekking van de REGEL zelf (assignee/action/target — dat de
    // regel als geheel wordt uitgevoerd), naast de dekking per VOORWAARDE.
    const rule = (r.iri && byRule.get(r.iri)) || [];
    // DE REGEL ALS GEHEEL ORGANISATORISCH GEBORGD (dpv:OrganisationalMeasure op
    // de regel). Dan valt zij buiten de realisatiestatus, en HAAR VOORWAARDEN
    // MET HAAR: van geen van beide wordt technisch iets verwacht, dus er is ook
    // niets blijven liggen. Geen status, geen "niet afgedwongen"-lijst — alleen
    // het gedempte merk op de regelkop (doc.js/coverageStatusChip). Wat er wél
    // gedekt is blijft gewoon staan: markeren is geen manier om data te wissen.
    if (r.organisational) {
      const gedekt = new Map();
      for (const c of ownConditions(r)) {
        const cov = byCond.get(c.iri);
        if (cov && cov.length && !gedekt.has(c.iri)) gedekt.set(c.iri, cov);
      }
      return {
        rule, conditions: gedekt, status: 'organisational',
        organisational: true, uncovered: [], uncoveredReasons: {},
      };
    }
    const conditions = new Map();
    // `uncovered` = alles wat ongedekt is en dus zichtbaar hoort te blijven;
    // `telt` = daarvan het deel dat de STATUS bepaalt.
    const uncovered = [];
    const telt = [];
    const seen = new Set();
    for (const c of ownConditions(r)) {
      if (seen.has(c.iri)) continue;
      seen.add(c.iri);
      const cov = byCond.get(c.iri);
      if (cov && cov.length) conditions.set(c.iri, cov);
      else {
        uncovered.push(c.iri);
        if (!c.organisational) telt.push(c.iri);
      }
    }
    const status = rule.length
      ? (telt.length ? 'partial' : 'full')
      : (conditions.size ? 'partial' : 'none');
    // WAAROM is een voorwaarde ongedekt? Twee gevallen, en de lezer wil ze uit
    // elkaar houden (zie sections/conforms-to-policy.md, "Markers op de
    // voorwaarde"):
    //   not-enforced   — ongemarkeerd, dus gewone normatieve inhoud die
    //                    technisch afgedwongen hoort te worden: hier is een
    //                    uitwerking blijven liggen. Telt mee in de status.
    //   organisational — dpv:OrganisationalMeasure: buiten de techniek
    //                    geborgd, er valt niets uit te werken. Blijft volledig
    //                    zichtbaar, maar telt niet mee.
    const reasons = {};
    for (const c of ownConditions(r)) {
      if (!uncovered.includes(c.iri)) continue;
      reasons[c.iri] = c.organisational ? 'organisational' : 'not-enforced';
    }
    return { rule, conditions, status, uncovered, uncoveredReasons: reasons };
  };
  const mark = (d, relevant, depth = 0) => {
    const cov = d.iri ? byRule.get(d.iri) : null;
    if (cov) d.coveredBy = cov;
    // Een regel die ZELF een conformsToPolicy-toets draagt, is al aan de
    // machine-uitvoerbare laag geknoopt; "niet gedekt" zou daar onwaar zijn.
    // Een ORGANISATORISCH GEBORGDE regel evenmin: daar valt technisch niets uit
    // te werken, dus is er ook niets ongedekt gebleven.
    else if (relevant && d.iri && !carriesConformsTo(d) && !d.organisational) d.uncovered = true;
    for (const c of ruleConstraints(d)) markConstraint(c);
    for (const tgt of d.targets || []) markCollection(tgt);
    markCollection(d.assignee);
    d.coverage = ruleCoverage(d);
    // De statuschip is alleen zinnig binnen een policy die een
    // machine-uitvoerbare laag aanhaalt — zelf of via een erfgenaam;
    // dezelfde afweging als `uncovered`.
    d.coverage.inConformsContext = !!relevant;
    // Wordt in de naloop hieronder gevuld; altijd een lijst, zodat de
    // weergave nooit op undefined hoeft te toetsen.
    d.coverage.via = [];
    if (depth < 3) for (const nested of d.duties || []) mark(nested, relevant, depth + 1);
  };
  // De regels op IRI, met hun soort: de omgekeerde link op een voorwaarde
  // ("geeft invulling aan: <regel>") noemt de regel bij naam en soortwoord.
  const ruleRefByIri = new Map();
  const noteRule = (d, kind) => {
    if (!d.iri || ruleRefByIri.has(d.iri)) return;
    const act = d.action;
    const actWord = (act && typeof act === 'object') ? (act.label || act.curie) : act;
    ruleRefByIri.set(d.iri, {
      iri: d.iri, curie: curie(d.iri), kind,
      title: d.title || d.label || actWord || null,
    });
  };
  for (const pol of allPolicies) {
    const relevant = inContext(pol);
    curPol = pol.anon ? null : pol.iri;
    markCollection(pol.assignee);
    for (const d of pol.obligations || []) { mark(d, relevant); noteRule(d, 'duty'); }
    for (const p of pol.permissions || []) noteRule(p, 'permission');
    for (const p of pol.prohibitions || []) noteRule(p, 'prohibition');
    for (const p of named(pol)) {
      // Ook toestemmingen en verboden zijn regels en dus dekbaar (de doctrine
      // kent één regelbegrip); de ongedekt-melding blijft daar achterwege
      // zolang de regel zelf de conformsToPolicy-toets draagt.
      mark(p, relevant);
      for (const d of p.duties || []) { mark(d, relevant); noteRule(d, 'duty'); }
    }
  }
  curPol = null;
  // DE KETENSTAP, in een naloop: pas nu zijn alle voorwaarde-objecten gezien
  // (condByIri) en alle regels van een `coverage` voorzien. Per regel: welke
  // benoemde voorwaarden werken haar uit, en welke artefacten dwingen díe af?
  // Een schakel die zelf door niemand wordt afgedwongen levert niets op — dan
  // bewijst de keten niets en zou "uitgewerkt via …" een lege belofte zijn.
  if (byChain.size) {
    const viaFor = (iri) => {
      const out = [];
      for (const condIri of byChain.get(iri) || []) {
        const artefacten = byCond.get(condIri) || [];
        if (!artefacten.length) continue;
        out.push({
          constraint: (condObjsByIri.get(condIri) || [])[0]
            || { iri: condIri, curie: curie(condIri), label: null },
          artefacts: artefacten,
          // De policies waarin deze schakel staat — waarop de weergave filtert.
          policies: [...(condPolicies.get(condIri) || [])],
        });
      }
      return out;
    };
    // DE OMGEKEERDE LINK, op de voorwaarde zelf: "geeft invulling aan <regel>".
    // Zij staat op ELK object van deze voorwaarde-IRI, zodat de link overal
    // meereist waar de voorwaarde verschijnt (regelrij, dekkingsuitklap,
    // artefactkaart) — precies zoals `coveredBy` dat doet.
    for (const [ruleIri, condIris] of byChain) {
      const ref = ruleRefByIri.get(ruleIri)
        || { iri: ruleIri, curie: curie(ruleIri), kind: 'duty', title: null };
      for (const condIri of condIris) {
        for (const c of condObjsByIri.get(condIri) || []) {
          if (!c.fulfils) c.fulfils = [];
          if (!c.fulfils.some((x) => x.iri === ref.iri)) c.fulfils.push(ref);
        }
      }
    }
    const withVia = (d, depth = 0) => {
      if (d.iri && d.coverage) d.coverage.via = viaFor(d.iri);
      if (depth < 3) for (const nested of d.duties || []) withVia(nested, depth + 1);
    };
    for (const pol of allPolicies) {
      for (const d of pol.obligations || []) withVia(d);
      for (const p of named(pol)) {
        withVia(p);
        for (const d of p.duties || []) withVia(d);
      }
    }
  }
  // De KETEN ALS NAVIGATIE: per element de volgende stap (annotateNextSteps).
  annotateNextSteps(allPolicies, refCache);
  indexCoverageByNode(store, model, refCache);
  // Het artefact als ingang: wat werkt DEZE knoop uit? (artefactkaart)
  for (const a of [...model.artifacts, ...model.bundles]) {
    const info = a.iri && model.coverageByNode[a.iri];
    if (info) a.covers = { rules: info.covers, conditions: coveredConditions(info) };
  }
}

// --- DE KETEN ALS NAVIGATIE: wat is de VOLGENDE STAP? -----------------------
// De dekking staat als data in het model, maar zij ligt verspreid: de regel
// weet welke artefacten haar afdwingen, de voorwaarde weet wie háár afdwingt,
// en de conformsToPolicy-rij noemt de knoop. Een lezer die wil zien hoe een
// norm technisch landt, moet die stukken nu zelf aan elkaar knopen.
//
// Deze functie legt de keten daarom als ÉÉN STAP PER ELEMENT vast:
//
//   verplichting --> de voorwaarde(n) die haar invullen  (de keten, coverage.via)
//   voorwaarde   --> de conformsToPolicy-rij die het dekkende artefact aanhaalt
//   regel        --> haar eigen conformsToPolicy-rij
//   conformsTo   --> niets                               (einde van de keten)
//
// BINNEN DE ODRL-TERMEN (besluit eigenaar, aug 2026). Het ARTEFACT (een
// Cedar-policyset, een Rego-module) was tot deze slag de laatste knoop van de
// keten. Dat zei twee keer hetzelfde: de conformsToPolicy-rij noemt het
// artefact al als rechterwaarde, en haar uitklap toont zijn velden. De keten
// eindigt daarom bij die RIJ; wie het artefact wil zien, klapt haar open.
//
// Elke stap is een {targetRef, label}: `targetRef` is wat de weergave als
// `data-ref` op het doel stempelt (een IRI, of — voor de conformsToPolicy-rij,
// die een blank node is en dus geen IRI heeft — de samengestelde ref
// hieronder), `label` is hoe de stap heet in het title-attribuut.
//
// WAAROM IN HET MODEL en niet in de weergave: het model reist over de
// worker-grens en moet structured-clone-baar zijn. Functies overleven die
// oversteek niet, platte lijsten wel.

// De ref van een conformsToPolicy-RIJ. Niet de knoop alleen: dezelfde bundel
// wordt door meer regels aangehaald, en dan zou een sprong de verkeerde rij
// aanwijzen. Regel + knoop samen is binnen een kaart eenduidig.
export function conformsRowRef(ruleIri, nodeIri) {
  return (ruleIri || '') + '|conformsTo|' + (nodeIri || '');
}

const NEXT_MAX_DEPTH = 3;

// Alle regels van een policy, inclusief de verplichtingen die onder een regel
// hangen — dezelfde verzameling die mark() van dekking voorziet.
function rulesOfPolicy(pol) {
  const out = [];
  const collect = (d, depth = 0) => {
    if (!d) return;
    out.push(d);
    if (depth < NEXT_MAX_DEPTH) for (const n of d.duties || []) collect(n, depth + 1);
  };
  for (const d of pol.obligations || []) collect(d);
  for (const p of [...(pol.permissions || []), ...(pol.prohibitions || [])]) collect(p);
  return out;
}

function annotateNextSteps(allPolicies, refCache) {
  const naam = (iri) => {
    const r = refCache.get(iri);
    return (r && (r.title || r.curie)) || curie(iri);
  };
  const condWord = (c) => (c && (c.label || c.sentence)) || (c && c.iri ? curie(c.iri) : '');
  // Eerste ronde: alle conformsToPolicy-rijen in beeld brengen. Zij zijn de
  // spil van de keten — elke voorwaarde-stap wijst er een aan.
  const rowsByNode = new Map();
  for (const pol of allPolicies) {
    const polIri = pol.anon ? null : pol.iri;
    for (const rule of rulesOfPolicy(pol)) {
      if (!rule.iri) continue;
      for (const c of ruleConstraints(rule)) {
        if (!c || !c.technicalMeasure || !c.conformsTo) continue;
        const ref = conformsRowRef(rule.iri, c.conformsTo);
        // De rij draagt haar eigen ref mee: de weergave stempelt hem als
        // data-ref, want de rij zelf is een blank node zonder IRI. Een VOLGENDE
        // stap heeft zij niet: zij is het einde van de keten (zie hierboven).
        c.rowRef = ref;
        if (!rowsByNode.has(c.conformsTo)) rowsByNode.set(c.conformsTo, []);
        rowsByNode.get(c.conformsTo).push({ ruleIri: rule.iri, policyIri: polIri, ref });
      }
    }
  }
  // Tweede ronde: de stappen die naar die rijen wijzen.
  for (const pol of allPolicies) {
    const polIri = pol.anon ? null : pol.iri;
    for (const rule of rulesOfPolicy(pol)) {
      const cov = rule.coverage;
      if (!cov) continue;
      // Welke rij haalt dit artefact aan? Eerst in DEZE regel, dan in deze
      // policy, dan waar dan ook: een voorwaarde kan elders worden afgedwongen
      // dan waar zij staat, en dan is díe rij de volgende stap.
      const rowFor = (nodeIri) => {
        const rijen = rowsByNode.get(nodeIri) || [];
        return rijen.find((x) => x.ruleIri === rule.iri)
          || (polIri ? rijen.find((x) => x.policyIri === polIri) : null)
          || rijen[0] || null;
      };
      for (const c of ruleConstraints(rule)) {
        if (!c || !c.iri || c.technicalMeasure) continue;
        const stappen = [];
        for (const a of (cov.conditions && cov.conditions.get(c.iri)) || []) {
          const row = rowFor(a.iri);
          if (!row || stappen.some((x) => x.targetRef === row.ref)) continue;
          stappen.push({ targetRef: row.ref, label: naam(a.iri), kind: 'conformsTo' });
        }
        if (stappen.length) c.next = stappen;
      }
      const eigenRijen = ruleConstraints(rule)
        .filter((c) => c && c.technicalMeasure && c.rowRef)
        .map((c) => ({ targetRef: c.rowRef, label: naam(c.conformsTo), kind: 'conformsTo' }));
      // De KETEN-stap van een verplichting: de voorwaarde die haar invult.
      // `policies` reist mee zodat de weergave op de omhullende kaart kan
      // filteren — dezelfde afweging als bij coverage.via zelf.
      const viaStappen = (cov.via || [])
        .map((v) => ({
          targetRef: (v.constraint && v.constraint.iri) || null,
          label: condWord(v.constraint), kind: 'condition', policies: v.policies || [],
        }))
        .filter((x) => x.targetRef);
      // RECHTSTREEKS GEDEKT, maar zonder eigen conformsToPolicy-rij (een
      // stelselplicht die een artefact afdwingt): dan is de rij die dat
      // artefact aanhaalt de volgende stap. Naar het artefact zelf springen we
      // niet meer — het staat ín die rij.
      //
      // OOK HIER REIST `policies` MEE (aug 2026). Een stelselplicht wordt door
      // ELK beslispunt dat haar overneemt rechtstreeks gerealiseerd — de
      // traceparent-plicht door het RvIG-anker én het RDW-anker — en zonder
      // herkomst kon de weergave die twee niet uit elkaar houden: het paneel
      // toonde op de RvIG-kaart ook de bundel van de RDW-inway, een beslispunt
      // waar deze kaart niets mee te maken heeft. De via-ketens droegen dit
      // veld al; directe dekking bleef achter. De policy van de RIJ is de
      // herkomst, niet die van de regel: de plicht staat op de koppelvlak-Set,
      // maar de rij die haar afdwingt staat in het beslispunt.
      const directe = [];
      for (const a of cov.rule || []) {
        const row = rowFor(a.iri);
        if (!row || directe.some((x) => x.targetRef === row.ref)) continue;
        directe.push({
          targetRef: row.ref, label: naam(a.iri), kind: 'conformsTo',
          policies: row.policyIri ? [row.policyIri] : [],
        });
      }
      cov.next = eigenRijen.length ? eigenRijen : (viaStappen.length ? viaStappen : directe);
    }
  }
}

// De volgende stap(pen) van één element: een regel (dan staat de lijst op haar
// coverage), of een voorwaarde-/conformsToPolicy-rij (dan op de knoop zelf).
// Leeg = einde van de keten, of niets om naartoe te springen.
export function coverageNext(node) {
  if (!node) return [];
  if (Array.isArray(node.next)) return node.next;
  const cov = node.coverage;
  return (cov && Array.isArray(cov.next)) ? cov.next : [];
}

// Alle voorwaarden die één knoop uitwerkt, plat en ontdubbeld — de
// artefactkaart noemt ze in één lijst, los van de regel waar ze onder hangen.
function coveredConditions(info) {
  const out = [];
  const seen = new Set();
  for (const r of [...info.covers, ...info.notCovered]) {
    for (const c of r.conditions || []) {
      if (c.iri && seen.has(c.iri)) continue;
      if (c.iri) seen.add(c.iri);
      out.push(c);
    }
  }
  return out;
}

// --- De DEKKENDE knoop als ingang: welke regels werkt hij uit? ---------------
// annotateCoverage hierboven kijkt vanuit de REGEL ("wie dekt mij?"). Sinds
// aug 2026 is de conformsToPolicy-VOORWAARDE de primaire plek waar de
// machine-uitvoerbare laag in beeld komt (de dekkingstags op de regelkoppen
// zijn vervallen), en die voorwaarde noemt de KNOOP. Daar hoort dus de
// omgekeerde vraag bij: welke regels werkt deze knoop uit, en welke regels van
// dezelfde policy niet?
//
// SCOPE. "Dezelfde policy" is niet af te leiden uit de dekkingstriples alleen —
// een artefact kan in principe regels uit meer dan één policy dekken. De scope
// is daarom: de policies die deze knoop AANHALEN (een conformsToPolicy-
// voorwaarde erop) of waarvan hij een regel dekt. Van die policies tellen alle
// benoemde regels mee; wat de knoop niet dekt, staat in `notCovered`.
//
// GEEN OORDEEL. `notCovered` is een opsomming, geen bevinding: een norm die
// geen beslispunt kan afdwingen (geheimhouding) hoort daar te staan. De
// weergave zet er dan ook geen waarschuwingskleur bij.
//
// Vorm (structured-clone-baar, want het model reist over de worker-grens):
//   model.coverageByNode = {
//     "<knoop-IRI>": { iri, curie, title, typeLabel,
//                      covers: [{ iri, title, kind }],
//                      notCovered: [{ iri, title, kind }] } }
// Alle voorwaarde-objecten die BIJ DE REGEL ZELF horen: haar odrl:constraint,
// haar (action-)refinements én de doelbinding, die een eigen veld heeft.
function ruleConstraints(rule) {
  return [
    ...(rule.constraints || []), ...(rule.refinements || []),
    ...(rule.purposeConstraint ? [rule.purposeConstraint] : []),
  ];
}

function coverageRuleRef(rule, kind, nodeIri) {
  const act = rule.action;
  const actWord = (act && typeof act === 'object') ? (act.label || act.curie) : act;
  // De VOORWAARDEN van deze regel, gesplitst naar wat DEZE knoop uitwerkt en
  // wat door niemand wordt afgedwongen. De voorwaarde-OBJECTEN zelf reizen mee
  // (dezelfde objecten als in de regelrij, dus dezelfde slot-chips): de
  // uitklap toont een voorwaarde zoals de regel hem toont, niet als kale naam.
  const own = ruleConstraints(rule);
  const cov = rule.coverage || { conditions: new Map(), uncovered: [] };
  const uncovered = new Set(cov.uncovered || []);
  const conditions = [];
  const uncoveredConditions = [];
  const seen = new Set();
  for (const c of own) {
    if (!c || !c.iri || seen.has(c.iri)) continue;
    if (uncovered.has(c.iri)) { seen.add(c.iri); uncoveredConditions.push(c); continue; }
    const dekkers = (cov.conditions && cov.conditions.get(c.iri)) || [];
    if (!dekkers.some((a) => a.iri === nodeIri)) continue;
    seen.add(c.iri);
    conditions.push(c);
  }
  return {
    iri: rule.iri || null,
    kind,
    // Naam-terugval zoals de regelrij zelf hem doet: eigen titel, anders het
    // actie-label. Het DOEL van een permission is geen naam (en ook geen
    // regelsoort) — zie doc.js/ruleKind.
    title: rule.title || rule.label || actWord || null,
    conditions,
    uncoveredConditions,
  };
}

function indexCoverageByNode(store, model, refCache) {
  const out = new Map();
  const refOf = (iri) => {
    if (!refCache.has(iri)) refCache.set(iri, coverageNodeRef(store, namedNode(iri)));
    return refCache.get(iri);
  };
  for (const pol of [...model.offers, ...model.agreements, ...model.sets]) {
    // Alle benoemde regels van deze policy, in leesvolgorde en met hun soort —
    // dezelfde verzameling die mark() hierboven van dekking voorziet.
    const rules = [];
    const collect = (d, kind, depth = 0) => {
      if (d.iri) rules.push({ rule: d, kind });
      if (depth < 3) for (const nested of d.duties || []) collect(nested, 'duty', depth + 1);
    };
    for (const d of pol.obligations || []) collect(d, 'duty');
    for (const p of pol.permissions || []) collect(p, 'permission');
    for (const p of pol.prohibitions || []) collect(p, 'prohibition');
    if (!rules.length) continue;
    // De knopen die deze policy in beeld brengt: aangehaald in een
    // conformsToPolicy-voorwaarde, of dekker van een van haar regels.
    const nodes = new Set();
    const citesNode = new Map();   // regel-IRI -> set knopen die de regel zelf toetst
    for (const { rule } of rules) {
      for (const c of ruleConstraints(rule)) {
        if (!c || !c.conformsTo) continue;
        nodes.add(c.conformsTo);
        if (!citesNode.has(rule.iri)) citesNode.set(rule.iri, new Set());
        citesNode.get(rule.iri).add(c.conformsTo);
      }
      for (const a of rule.coveredBy || []) nodes.add(a.iri);
      // Ook een knoop die alleen VOORWAARDEN van deze regel uitwerkt brengt
      // zichzelf in beeld: de dekking zit sinds aug 2026 vooral daar.
      for (const dekkers of ((rule.coverage && rule.coverage.conditions) || new Map()).values()) {
        for (const a of dekkers) nodes.add(a.iri);
      }
    }
    for (const nodeIri of nodes) {
      if (!out.has(nodeIri)) {
        const ref = refOf(nodeIri);
        out.set(nodeIri, {
          iri: nodeIri, curie: ref.curie, title: ref.title, typeLabel: ref.typeLabel,
          covers: [], notCovered: [],
        });
      }
      const info = out.get(nodeIri);
      for (const { rule, kind } of rules) {
        const gedekt = (rule.coveredBy || []).some((a) => a.iri === nodeIri);
        // Een regel die ZELF de toets op deze knoop draagt hoort niet in
        // `notCovered`: hij is al aan de machine-uitvoerbare laag geknoopt, en
        // "de module werkt mij niet uit" zou daar een onwaar contrast maken.
        // Zelfde afweging als bij rule.uncovered in mark() hierboven — de regel
        // waaronder deze uitklap hangt, zou anders in zijn eigen
        // niet-in-deze-lijst staan.
        const zelfGetoetst = (citesNode.get(rule.iri) || new Set()).has(nodeIri);
        // …tenzij deze knoop wél VOORWAARDEN van die regel uitwerkt: dan heeft
        // hij er iets over te zeggen en hoort de regel in de lijst te staan.
        const condsHere = coverageRuleRef(rule, kind, nodeIri).conditions.length;
        if (!gedekt && zelfGetoetst && !condsHere) continue;
        const bucket = gedekt ? info.covers : info.notCovered;
        if (!bucket.some((x) => x.iri === rule.iri)) {
          bucket.push(coverageRuleRef(rule, kind, nodeIri));
        }
      }
    }
  }
  model.coverageByNode = Object.fromEntries(out);
}

// --- Doorwerking: welke regels komen uit het aanbod? ------------------------
// De obligation-set van een Agreement is per profiel gelijk aan die van het
// Offer waaruit hij is afgeleid (compositie/doorwerking, sh:equals in
// shapes/afnemer.ttl). In een register waarin élke overeenkomst dezelfde vier
// stelselverplichtingen herhaalt, is dat vier identieke rijen per kaart; deze
// functie levert de splitsing waarmee een weergave ze kan samenvouwen.
// Het patroon is niet tot verplichtingen beperkt: ook een permission of
// prohibition kan als GEDEELDE NAMED NODE aan zowel het aanbod als de
// overeenkomst hangen. Alle drie de regeltypen splitsen daarom op dezelfde
// manier (een named node telt alleen mee binnen zijn eigen regeltype).
//
// Koppeling: de bestaande Agreement→Offer-relatie (policy.offers, gevuld uit
// PROFILE_PATTERNS.agreementOfferPreds). TERUGVAL: een named regel die
// obligation/permission/prohibition is van enig Offer in het model telt óók
// als "uit het aanbod" — dat vangt de historische stubs, waarvan de
// aanbodkoppeling niet in de (skelet)graaf zit. Op een Offer zelf wordt nooit
// samengevouwen: daar zijn deze regels de bron.
//
// Vorm: { fromOffer: [{ rule, type }], own: { obligations, permissions,
// prohibitions }, offers: [offer] } — `type` is 'obligation' | 'permission' |
// 'prohibition', zodat een weergave elke regel met zijn eigen rijvorm kan
// tekenen. De volgorde binnen fromOffer is die van de regeltypen zelf.
const RULE_BUCKETS = [
  ['obligations', 'obligation'],
  ['permissions', 'permission'],
  ['prohibitions', 'prohibition'],
];

export function offerRuleSplit(model, policy) {
  const out = {
    fromOffer: [],
    own: { obligations: [], permissions: [], prohibitions: [] },
    offers: [],
  };
  const buckets = RULE_BUCKETS.map(([key, type]) => [key, type, (policy && policy[key]) || []]);
  // Niets te splitsen: alles blijft "eigen" (losse rijen).
  const keepAll = () => {
    for (const [key, , list] of buckets) out.own[key] = list.slice();
    return out;
  };
  if (!policy) return out;
  if (policy.kind === 'offer') return keepAll();
  const offers = (model && model.offers) || [];
  if (!offers.length) return keepAll();
  const carriersOf = new Map(); // "type\nregel-IRI" -> [offer]
  for (const o of offers) {
    for (const [key, type] of RULE_BUCKETS) {
      for (const r of o[key] || []) {
        if (!r.iri) continue;
        const k = type + '\n' + r.iri;
        if (!carriersOf.has(k)) carriersOf.set(k, []);
        carriersOf.get(k).push(o);
      }
    }
  }
  const linked = new Set(policy.offers || []);
  const sources = new Map();
  for (const [key, type, list] of buckets) {
    for (const r of list) {
      const carriers = r.iri ? (carriersOf.get(type + '\n' + r.iri) || []) : [];
      // Voorkeur voor het gekoppelde aanbod; anders het eerste aanbod dat deze
      // named regel draagt (terugval voor stubs).
      const pick = carriers.find((o) => linked.has(o.iri)) || carriers[0] || null;
      if (pick) {
        out.fromOffer.push({ rule: r, type });
        if (!sources.has(pick.iri)) sources.set(pick.iri, pick);
      } else out.own[key].push(r);
    }
  }
  out.offers = [...sources.values()];
  return out;
}

// --- Overerving: odrl:inheritFrom (ODRL 2.2, Policy Inheritance) ------------
// NIET te verwarren met de doorwerking hierboven. Doorwerking is één regel die
// als GEDEELDE knoop aan twee policies hangt (dezelfde regel-IRI in aanbod én
// overeenkomst); overerving is een VERWIJZING van kind naar ouder waarna de
// regels van de ouder óók voor het kind gelden. ODRL 2.2 §2.6: "the Policy
// will inherit all the Rules from the referenced Policy" — kind- en
// ouderregels gelden SAMEN (unie), de ouderregels worden niet vervangen.
//
// Drie dingen die de spec toelaat en die hier dus moeten kloppen:
//   1. MEERDERE ouders per policy (odrl:inheritFrom mag herhaald worden);
//   2. KETENS (de ouder erft zelf ook) — dat vergt een fixpunt, geen enkele hop;
//   3. CYKELS zijn spec-ongeldig maar komen in het wild voor
//      (odrlapi-sample048 draait A→B→C→A en zegt dat er zelf bij). De
//      berekening moet dan eindigen, niet vastlopen: elke ouder wordt hoogstens
//      één keer bezocht en de cykel wordt als vlag vastgelegd.
//
// Uitkomst per policy (`policy.inherited`): ÉÉN groep per voorouder, in
// BFS-volgorde (eerst de directe ouders, dan hun ouders):
//   { iri, curie, title, present, depth, cycle, literal, rules: [{rule,type}] }
// `present` is false wanneer de ouder niet in de geladen bron zit — de weergave
// zegt dat dan eerlijk in plaats van de rij weg te laten. Per geërfde regel
// ligt daarmee vast VAN WELKE ouder hij komt (de groep waarin hij staat).
//
// De eigen regellijsten (policy.permissions/…) blijven ONGEWIJZIGD: het kind
// schrijft de ouderregels niet uit maar vouwt ze samen. effectiveRules() levert
// de unie voor wie het volledige beeld nodig heeft.

// Veiligheidsnet onder het fixpunt: ook bij een gestoorde graaf stopt de walk.
export const INHERIT_MAX_DEPTH = 32;

function ruleKey(type, rule) { return rule.iri ? type + '\n' + rule.iri : null; }

// De voorouder-groepen van één policy. `byIri` is de policy-index van het model.
function inheritedGroups(byIri, policy) {
  const groups = [];
  const direct = policy.inheritFrom || [];
  if (!direct.length) return groups;
  // Regels die het kind al ZELF draagt, erft het niet nog eens: dezelfde
  // regel-IRI in ouder en kind is één regel (unie, geen duplicaat).
  const taken = new Set();
  for (const [key, type] of RULE_BUCKETS) {
    for (const r of policy[key] || []) {
      const k = ruleKey(type, r);
      if (k) taken.add(k);
    }
  }
  const seen = new Set([policy.iri]);
  const groupByIri = new Map();
  let queue = direct.map((p) => ({ ...p, depth: 1 }));
  for (let depth = 1; queue.length && depth <= INHERIT_MAX_DEPTH; depth++) {
    const next = [];
    for (const parent of queue) {
      // Spec-fout: inheritFrom met een niet-IRI waarde. Eigen groep, geen ouder.
      if (!parent.iri) {
        groups.push({
          iri: null, curie: null, title: null, literal: parent.literal,
          present: false, depth, cycle: false, rules: [],
        });
        continue;
      }
      if (seen.has(parent.iri)) {
        // Tweede aankomst bij dezelfde voorouder (of terug bij het kind zelf):
        // de keten is cyclisch. Vastleggen op de bestaande groep en NIET nog
        // eens aflopen — dat is precies wat het fixpunt laat eindigen.
        const g = groupByIri.get(parent.iri);
        if (g) g.cycle = true;
        else if (parent.iri === policy.iri && groups.length) groups[groups.length - 1].cycle = true;
        continue;
      }
      seen.add(parent.iri);
      const pol = byIri.get(parent.iri) || null;
      const rules = [];
      if (pol) {
        for (const [key, type] of RULE_BUCKETS) {
          for (const r of pol[key] || []) {
            const k = ruleKey(type, r);
            if (k && taken.has(k)) continue;
            if (k) taken.add(k);
            rules.push({ rule: r, type });
          }
        }
      }
      const group = {
        iri: parent.iri,
        curie: parent.curie || curie(parent.iri),
        title: pol ? pol.title : null,
        literal: null,
        present: !!pol,
        depth,
        cycle: false,
        rules,
      };
      groups.push(group);
      groupByIri.set(parent.iri, group);
      // Fixpunt: de ouder erft zelf mogelijk ook. Alleen een AANWEZIGE ouder
      // heeft een keten die we kunnen aflopen.
      if (pol) for (const gp of pol.inheritFrom || []) next.push({ ...gp, depth: depth + 1 });
    }
    queue = next;
  }
  return groups;
}

// De hele overerving in het model vastleggen. Draait ná het inlezen van álle
// policies: pas dan zijn de ouders (en hun regels) er om naar te wijzen.
function annotateInheritance(model) {
  const all = [...model.offers, ...model.agreements, ...model.sets];
  const byIri = new Map();
  for (const p of all) if (!p.anon) byIri.set(p.iri, p);
  for (const p of all) {
    p.inherited = inheritedGroups(byIri, p);
    p.inheritCycle = p.inherited.some((g) => g.cycle);
  }
}

// De UNIE van eigen en geërfde regels van één policy — wat er volgens ODRL 2.2
// werkelijk geldt. De weergave gebruikt de gesplitste vorm (eigen regels los,
// geërfde samengevouwen per ouder); wie het totaalbeeld nodig heeft (tellingen,
// export, toetsing) neemt deze.
export function effectiveRules(policy) {
  const out = { obligations: [], permissions: [], prohibitions: [] };
  if (!policy) return out;
  for (const [key] of RULE_BUCKETS) out[key] = (policy[key] || []).slice();
  const KEY_OF = { obligation: 'obligations', permission: 'permissions', prohibition: 'prohibitions' };
  for (const g of policy.inherited || []) {
    for (const e of g.rules) out[KEY_OF[e.type]].push(e.rule);
  }
  return out;
}

// Bouw het volledige weergavemodel uit een store.
export function buildModel(store) {
  const model = {
    datasets: [], catalogs: [], offers: [], agreements: [], sets: [],
    artifacts: [], bundles: [], unresolved: [], temporalContainers: [], counts: {},
  };
  const seenPolicies = new Set();
  const targetPreds = targetPredicates(store);
  // De groeperingsdimensies (a qb:DimensionProperty op een left operand) reizen
  // mee in het model: de weergavelagen hebben de store niet (worker-grens), en
  // zonder declaratie in de bron blijft dit een lege lijst en verandert er
  // niets aan de weergave.
  model.groupingDimensions = groupingDimensions(store);
  // Gedeelde descriptors per uniek term-id binnen deze run (zie readPermission).
  const modelCaches = { target: new Map(), action: new Map(), purpose: new Map(), agent: new Map() };
  const kinds = policyKinds(store);

  // Offers (Trap A)
  const offerTerms = policyTermsOfKind(store, kinds, 'offer');
  for (const t of offerTerms) {
    seenPolicies.add(t.value);
    const common = readCommon(store, t);
    const permissions = sortRules(objs(store, t, ODRL + 'permission').map((p) => readPermission(store, p, targetPreds, modelCaches)));
    const prohibitions = sortRules(objs(store, t, ODRL + 'prohibition').map((p) => readPermission(store, p, targetPreds, modelCaches)));
    const obligations = sortRules(objs(store, t, ODRL + 'obligation').map((d) => readDuty(store, d)));
    // dataset dat naar dit offer verwijst via dcat:hasPolicy
    const datasetTerm = subs(store, DCAT + 'hasPolicy', t)[0]
      || subs(store, ODRL + 'hasPolicy', t)[0] || null;
    model.offers.push({
      kind: 'offer', term: t, ...common,
      assigner: partyRef(store, obj(store, t, ODRL + 'assigner')),
      permissions, prohibitions, obligations,
      version: readVersionInfo(store, t),
      datasetIri: datasetTerm ? datasetTerm.value : null,
      extraProps: extraProperties(store, t, POLICY_SHOWN()),
    });
  }

  // Agreements (Trap B/C)
  const agrTerms = policyTermsOfKind(store, kinds, 'agreement')
    .filter((t) => !seenPolicies.has(t.value));
  // De Agreement->Offer-koppeling loopt via PROFILE_PATTERNS.agreementOfferPreds
  // (uitsluitend prov:wasDerivedFrom, MOET). Dat predicaat draagt óók andere
  // verwijzingen (wettelijke grondslag, brondataset, documenten); alleen doelen
  // die een bekend Offer in het model zijn tellen als koppeling.
  const offerIris = new Set(model.offers.map((o) => o.iri));
  // Dezelfde relatie draagt óók het VERZOEK waaruit de overeenkomst
  // voortkwam; de rdf:type-check (odrl:Request + subklassen) houdt die apart
  // van het aanbod en van de bron-documenten.
  const reqIris = requestIris(store);
  for (const t of agrTerms) {
    seenPolicies.add(t.value);
    const common = readCommon(store, t);
    const permissions = sortRules(objs(store, t, ODRL + 'permission').map((p) => readPermission(store, p, targetPreds, modelCaches)));
    const prohibitions = sortRules(objs(store, t, ODRL + 'prohibition').map((p) => readPermission(store, p, targetPreds, modelCaches)));
    const obligations = sortRules(objs(store, t, ODRL + 'obligation').map((d) => readDuty(store, d)));
    const linked = PROFILE_PATTERNS.agreementOfferPreds
      .flatMap((pred) => objs(store, t, pred))
      .filter((v) => v.termType === 'NamedNode' && offerIris.has(v.value))
      .map((v) => v.value);
    const reqSeen = new Set();
    const requests = PROFILE_PATTERNS.agreementRequestPreds
      .flatMap((pred) => objs(store, t, pred))
      .filter((v) => v.termType === 'NamedNode' && reqIris.has(v.value)
        && (reqSeen.has(v.value) ? false : (reqSeen.add(v.value), true)))
      .map((v) => readRequestRef(store, v, offerIris));
    model.agreements.push({
      kind: 'agreement', term: t, ...common,
      assigner: partyRef(store, obj(store, t, ODRL + 'assigner')),
      assignee: partyRef(store, obj(store, t, ODRL + 'assignee')),
      // Een Agreement kan meerdere Offers invullen (bijv. één besluit dat
      // meerdere verstrekkingswijze-aanbiedingen invult).
      offers: [...new Set(linked)],
      // Het verzoek/de verzoeken waaruit deze overeenkomst voortkwam.
      requests,
      permissions, prohibitions, obligations,
      version: readVersionInfo(store, t),
      extraProps: extraProperties(store, t, POLICY_SHOWN()),
    });
  }

  // Sets (odrl:Set, kale odrl:Policy en de overige/onbekende policytypen:
  // beleid zonder aanbod/overeenkomst-rol)
  const setTerms = policyTermsOfKind(store, kinds, 'set')
    .filter((t) => !seenPolicies.has(t.value));
  for (const t of setTerms) {
    if (seenPolicies.has(t.value)) continue;
    seenPolicies.add(t.value);
    model.sets.push({
      kind: 'set', term: t, ...readCommon(store, t),
      // Een odrl:Request is qua weergave-soort een set (regels zonder
      // aanbod-/overeenkomst-rol), maar het IS een verzoek: generieke
      // ODRL-kennis die de kaart als eigen soort-pil toont.
      isRequest: reqIris.has(t.value),
      // Vraagt dit verzoek een AANBOD aan (note §4, Request→Offer)? Alleen op
      // een echt verzoek: dezelfde prov:wasDerivedFrom op een gewone Set is
      // geen aanvraag maar gewone herkomst en blijft in "Afgeleid van" staan.
      asksFor: reqIris.has(t.value) ? requestOffers(store, t, offerIris) : [],
      assigner: partyRef(store, obj(store, t, ODRL + 'assigner')),
      assignee: partyRef(store, obj(store, t, ODRL + 'assignee')),
      permissions: sortRules(objs(store, t, ODRL + 'permission').map((p) => readPermission(store, p, targetPreds, modelCaches))),
      prohibitions: sortRules(objs(store, t, ODRL + 'prohibition').map((p) => readPermission(store, p, targetPreds, modelCaches))),
      obligations: sortRules(objs(store, t, ODRL + 'obligation').map((d) => readDuty(store, d))),
      version: readVersionInfo(store, t),
      extraProps: extraProperties(store, t, POLICY_SHOWN()),
    });
  }

  // Beleidspublicaties (dcat:Catalog met odrl:hasPolicy-leden)
  for (const t of subs(store, RDF + 'type', namedNode(DCAT + 'Catalog'))) {
    const members = [
      ...objs(store, t, ODRL + 'hasPolicy'),
      ...objs(store, t, DCAT + 'hasPolicy'),
    ].map((o) => o.value);
    if (!members.length) continue;
    model.catalogs.push({
      kind: 'catalog', iri: t.value, curie: curie(t.value),
      title: pickLiteral(objs(store, t, DCT + 'title')) || labelFor(store, t),
      description: pickLiteral(objs(store, t, DCT + 'description')),
      policies: members,
    });
  }

  // Datasets
  const dsTerms = subs(store, RDF + 'type', namedNode(DCAT + 'Dataset'));
  for (const t of dsTerms) {
    const distributions = objs(store, t, DCAT + 'distribution').map((d) => ({
      iri: d.value, curie: curie(d.value), label: labelFor(store, d),
      accessURL: (obj(store, d, DCAT + 'accessURL') || {}).value || null,
    }));
    // Zowel odrl:hasPolicy (spec-correctie 2026-08) als het oudere dcat:hasPolicy.
    const polSeen = new Set();
    const policies = [
      ...objs(store, t, ODRL + 'hasPolicy'),
      ...objs(store, t, DCAT + 'hasPolicy'),
    ].map((p) => p.value).filter((v) => (polSeen.has(v) ? false : (polSeen.add(v), true)));
    model.datasets.push({
      kind: 'dataset', term: t, iri: t.value, curie: curie(t.value),
      title: pickLiteral(objs(store, t, DCT + 'title')) || labelFor(store, t),
      description: pickLiteral(objs(store, t, DCT + 'description')),
      distributions, policies,
    });
  }

  // Artefacten & bundels
  const artifactSet = new Set();
  for (const ty of PROFILE_PATTERNS.artifactClasses) {
    for (const t of subs(store, RDF + 'type', namedNode(ty))) artifactSet.add(t.value);
  }
  for (const iri of artifactSet) model.artifacts.push(readArtifact(store, namedNode(iri)));
  for (const t of subs(store, RDF + 'type', namedNode(PROFILE_PATTERNS.bundleClass))) {
    model.bundles.push({ ...readArtifact(store, t), kind: 'bundle' });
  }

  // Overerving (odrl:inheritFrom): pas hier, als álle policies gelezen zijn —
  // een ouder kan later in de bron staan dan zijn kind, en de keten mag over
  // alle drie de soorten (aanbod/overeenkomst/set) heen lopen.
  //
  // VÓÓR de dekking, sinds aug 2026: de dekking moet weten of een policy via
  // OVERERVING in een machine-uitvoerbare context terechtkomt. Een Set met
  // alleen stelselverplichtingen haalt zelf geen artefact aan; haar regels
  // worden pas uitgevoerd bij de beslispunten die haar overnemen. De
  // overerving zelf hangt van de dekking niet af (zij leest alleen
  // inheritFrom en de regelbakken), dus deze volgorde is veilig — en
  // inheritedGroups DEELT de regelobjecten met de ouder, zodat annotaties die
  // hierna volgen vanzelf ook in de kind-policy zichtbaar zijn.
  annotateInheritance(model);

  // Dekking van de logische regels door die artefacten (zie annotateCoverage).
  annotateCoverage(store, model);

  // Temporele versie-containers (vocabulaire-pluggable; zie TEMPORAL_VOCABS).
  const policyByIri = new Map();
  for (const p of [...model.offers, ...model.agreements, ...model.sets]) {
    if (!p.anon) policyByIri.set(p.iri, p);
  }
  model.temporalContainers = readTemporalContainers(store, policyByIri, kinds);

  model.counts = {
    datasets: model.datasets.length, offers: model.offers.length,
    agreements: model.agreements.length, sets: model.sets.length,
    artifacts: model.artifacts.length, bundles: model.bundles.length,
    versionContainers: model.temporalContainers.length,
  };
  return model;
}

// Bouw de navigatieboom: offer (policy) -> agreement -> doel(permission).
// Policies staan op topniveau; de dataset is catalogus-context en wordt in de
// aanbod-weergave als metadata getoond, niet als boomniveau.
export function buildNav(model) {
  const nav = [];

  // --- Versievouw, voor ALLE DRIE de policysoorten ---------------------------
  // Versies in een temporele container verschijnen niet als losse topniveau-
  // knopen: één ingang per container (containerlabel + "n versies") die naar
  // de GELDENDE versie wijst; de overige versies staan als kinderen eronder,
  // zodat deep links (?policy=<oude versie>) blijven werken.
  //
  // Dit gold tot aug 2026 ALLEEN voor de beleidssets, met het commentaar
  // "containers waarvan de geldende versie een Offer/Agreement is … komt in de
  // huidige data niet voor". Die aanname is vervallen: sinds /brp-ap zijn
  // vervangen besluitversies volwaardig odrl:Agreement getypeerd, en zonder
  // vouw toonde de Overeenkomsten-sectie 2.576 losse kaarten waar 1.392
  // besluiten bedoeld zijn. De vouw is nu soort-onafhankelijk.
  const containerByCurrent = new Map(
    (model.temporalContainers || []).map((c) => [c.currentIri, c]));
  const containedIris = new Set();
  for (const c of model.temporalContainers || []) {
    for (const v of c.versions) containedIris.add(v.iri);
  }
  // Hoort deze policy op topniveau? Ja, tenzij zij een NIET-geldende versie van
  // een container is — die hangt als kind onder de geldende versie.
  const topLevel = (p) => containerByCurrent.has(p.iri) || !containedIris.has(p.iri);
  // Kindknopen: de overige versies, recent-first (beslissing eigenaar).
  const versionChildren = (c, kind) => [...c.versions].reverse()
    .filter((v) => v.iri !== c.currentIri)
    .map((v) => ({
      id: v.iri, kind, role: t('role.version'), badge: statusWord(v.status),
      containerIri: c.iri,
      label: v.effectiveFrom ? `${compactDate(v.effectiveFrom)} — ${v.title}` : v.title,
      children: [],
    }));
  const withVersions = (label, c) => (c
    ? `${label} (${t('nav.versionsSuffix', { n: c.versions.length })})` : label);

  const offerById = new Map(model.offers.map((o) => [o.iri, o]));
  const agreementsByOffer = new Map();
  const looseAgreements = [];
  for (const a of model.agreements) {
    if (!topLevel(a)) continue;
    const keys = (a.offers || []).filter((k) => offerById.has(k));
    if (keys.length) {
      // Bij meerdere ingevulde Offers verschijnt de Agreement onder elk.
      for (const key of keys) {
        if (!agreementsByOffer.has(key)) agreementsByOffer.set(key, []);
        agreementsByOffer.get(key).push(a);
      }
    } else {
      looseAgreements.push(a);
    }
  }

  const offerNode = (offer) => {
    const c = containerByCurrent.get(offer.iri);
    const children = (agreementsByOffer.get(offer.iri) || []).map(agreementNode);
    return {
      id: offer.iri, label: withVersions((c && c.title) || offer.title, c),
      kind: 'offer', role: t('role.offer'),
      containerIri: c ? c.iri : undefined,
      // Badge is een type-aanduiding, consistent met 'Dataset' en 'Doel';
      // de partij (aanbieder/afnemer) staat in de titel en het middenpaneel.
      // Oudere/toekomstige versies staan ACHTER de inhoudelijke kinderen: de
      // drietraps-navigatie (aanbod -> overeenkomst -> doel) blijft zo bovenaan
      // staan en de versiehistorie sluit de rij.
      badge: t('kind.offer'),
      children: c ? [...children, ...versionChildren(c, 'offer')] : children,
    };
  };
  const agreementNode = (agr) => {
    const c = containerByCurrent.get(agr.iri);
    const doelen = agr.permissions.map((p, i) => ({
      id: `${agr.iri}#perm${i}`, permIndex: i,
      label: p.title || (p.action ? p.action.label : t('nav.permissionN', { n: i + 1 })),
      // De soort is het ODRL-type: een permission is een Toestemming, ook met
      // doelbinding (die is voorwaarde en groepeerdimensie, geen regelsoort).
      kind: 'permission',
      role: t('title.permission'),
      badge: t('title.permission'),
      agreementIri: agr.iri,
      // Benoemde permission: eigen IRI als bron-subject voor het rechterpaneel.
      sourceIri: p.iri || null,
    }));
    return {
      id: agr.iri, label: withVersions((c && c.title) || agr.title, c),
      kind: 'agreement', role: t('role.agreement'),
      containerIri: c ? c.iri : undefined,
      badge: t('kind.agreement'),
      children: c ? [...doelen, ...versionChildren(c, 'agreement')] : doelen,
    };
  };

  // Offers (policies) op topniveau — met dezelfde versievouw.
  for (const o of model.offers) {
    if (topLevel(o)) nav.push(offerNode(o));
  }

  // Sets: generiek ODRL-beleid zonder aanbod/overeenkomst-rol. Het navlabel
  // zet de afnemersnaam voorop waar de titel generiek is ("Autorisatiebesluit
  // Gemeente X…" → "Gemeente X… — Autorisatiebesluit"), zodat rijen bij
  // afkapping onderscheidbaar blijven (schaaltoets §3.3). Versievouw: zie
  // topLevel/versionChildren bovenaan.
  for (const s of model.sets) {
    if (!topLevel(s)) continue;
    const c = containerByCurrent.get(s.iri);
    nav.push({
      id: s.iri, containerIri: c ? c.iri : undefined,
      label: withVersions(titleWithAssignee((c && c.title) || s.title, policyAssignee(s)), c),
      kind: 'set', role: t('role.policySet'), badge: t('kind.set'),
      children: c ? versionChildren(c, 'set') : [],
    });
  }

  // Agreements zonder (aanwezig) offer: eigen groep.
  if (looseAgreements.length) {
    nav.push({
      id: '__loose-agreements__', label: t('section.looseAgreements'),
      kind: 'group', role: t('role.group'), badge: t('role.group'),
      children: looseAgreements.map(agreementNode),
    });
  }

  // Machine-uitvoerbaar beleid.
  if (model.artifacts.length || model.bundles.length) {
    nav.push({
      id: '__artifacts__', label: t('section.machinePolicy'), kind: 'group',
      role: t('role.group'), badge: 'conformsToPolicy',
      children: [
        ...model.bundles.map((b) => ({ id: b.iri, label: b.title, kind: 'bundle', role: t('role.bundle'), badge: t('role.bundle') })),
        ...model.artifacts.map((a) => ({ id: a.iri, label: a.title, kind: 'artifact', role: t('role.artifact'), badge: a.typeLabel })),
      ],
    });
  }
  return nav;
}

// Snoei de navigatie tot het pad naar één policy (deep link ?policy=<IRI>).
// Voorouders op het pad blijven staan (context), de subtree van de policy
// blijft volledig; zijtakken verdwijnen. Retourneert { nav, node } of null
// als de IRI niet in de boom voorkomt.
export function scopeNavToPolicy(nav, iri) {
  let found = null;
  const prune = (nodes) => {
    const out = [];
    for (const n of nodes || []) {
      if (n.id === iri) { found = n; out.push(n); continue; }
      const kids = prune(n.children);
      if (kids.length) out.push({ ...n, children: kids });
    }
    return out;
  };
  const scoped = prune(nav);
  return found ? { nav: scoped, node: found } : null;
}

// Snoei de navigatie tot de leden van één beleidspublicatie (deep link
// ?set=<IRI>): een dcat:Catalog (of andere node) die zijn policies via
// odrl:hasPolicy opsomt. De dataset zelf is catalogus-vocabulaire en is in de
// viewer bewust géén navigatiebegrip.
export function scopeNavToSet(nav, store, setIri) {
  const t = namedNode(setIri);
  const members = new Set([
    ...objs(store, t, ODRL + 'hasPolicy'),
    ...objs(store, t, DCAT + 'hasPolicy'),
  ].map((o) => o.value));
  if (!members.size) return null;
  const scoped = nav.filter((n) => members.has(n.id));
  return scoped.length ? {
    nav: scoped,
    set: { iri: setIri, title: labelFor(store, t) },
  } : null;
}

// --- Schaal: afnemer-verrijking, indexweergave en filters -------------------
// DOM-vrije bouwstenen voor de BRP-schaal (1.392 beleidssets): een compacte
// indextabel in doc.html en een filterbare navigatieboom in index.html.
// Zie notes/brp-schaaltoets.md (aanbevelingen 2, 3 en 5).

// Afnemer van een policy: de policy-assignee, of anders de assignee van de
// eerste regel die er een draagt (BRP-patroon: odrl:assignee op de Permission).
// Weergavenaam van een partij in een COMPACTE kolom (indextabel, navlabel).
// Een anonieme, intensioneel gedefinieerde collectie heeft geen naam maar een
// voorwaarde: die zin zegt daar meer dan "(anoniem)". Een lange
// voorwaardenreeks (DOME-beleid 3001 rijgt er zes aaneen) wordt wél ingekort —
// een kolom is geen plek voor 300 tekens, en de volledige zin staat een regel
// lager op de kaart zelf.
export const PARTY_LABEL_MAX = 70;
export function partyLabel(agent, max = PARTY_LABEL_MAX) {
  if (!agent) return null;
  if (!(agent.anon && agent.intension)) return agent.label || null;
  const p = agent.intension.phrase;
  return p.length > max ? p.slice(0, max).replace(/\s+\S*$/, '') + '…' : p;
}

export function policyAssignee(policy) {
  if (!policy) return null;
  if (policy.assignee) return policy.assignee;
  for (const rules of [policy.permissions, policy.prohibitions]) {
    for (const r of rules || []) if (r.assignee) return r.assignee;
  }
  return null;
}

// Heeft deze agent een écht label (rdfs:label uit bv. afnemers.ttl), of is
// het slechts de localname-fallback van de IRI? Alleen een echt label is
// "rijker" en mag een titel herschikken.
function richAgentLabel(agent) {
  if (!agent || !agent.label) return null;
  // Een blanke knoop heeft geen naam: zijn label is de "(anonieme X)"-terugval
  // uit labelFor. Dat is geen rijker label en mag dus nooit een titel
  // herschikken of als afnemersnaam in een kolom belanden.
  if (agent.anon) return null;
  return agent.label === localName(agent.iri || '') ? null : agent.label;
}

// Nav-/indexlabel met de afnemersnaam voorop, waar de titel generiek is.
// Concreet en voorspelbaar: alleen wanneer het (echte) afnemerslabel wél in
// de titel voorkomt maar niet vooraan staat, wordt het naar voren gehaald:
//   "Autorisatiebesluit Gemeente X/Burgerzakentaken (versie 5)"
//   → "Gemeente X/Burgerzakentaken — Autorisatiebesluit (versie 5)".
// Titels zonder het label erin blijven ongemoeid (geen dubbelingen).
export function titleWithAssignee(title, assignee) {
  const t = (title || '').trim();
  const label = richAgentLabel(assignee);
  if (!t || !label) return t;
  const idx = t.toLowerCase().indexOf(label.toLowerCase());
  if (idx <= 0) return t;
  const found = t.slice(idx, idx + label.length); // originele casing behouden
  const rest = (t.slice(0, idx) + t.slice(idx + label.length)).replace(/\s+/g, ' ').trim();
  return rest ? `${found} — ${rest}` : found;
}

// Kaartenlijst-drempels voor doc.html (de indextabel-modus is vervangen door
// een gefilterde, lazy kaartenlijst): boven CARD_COLLAPSE_THRESHOLD starten
// kaarten ingeklapt (kaart-body's worden pas bij de eerste uitklap gebouwd)
// en wordt de lijst gechunkt toegevoegd (CARD_CHUNK_SIZE per keer, bijladen
// via een sentinel onderaan). Pure functies; de DOM-kant zit in doc.js.
export const CARD_COLLAPSE_THRESHOLD = 100;
export const CARD_CHUNK_SIZE = 60;
export function cardsStartCollapsed(count) {
  return (count || 0) > CARD_COLLAPSE_THRESHOLD;
}
// Eén chunk uit een rijenlijst: { items, nextOffset, done }. Filteren herstart
// de chunks door opnieuw met offset 0 te beginnen.
export function cardChunk(rows, offset = 0, size = CARD_CHUNK_SIZE) {
  const all = rows || [];
  const start = Math.min(Math.max(0, offset | 0), all.length);
  const items = all.slice(start, start + Math.max(1, size | 0));
  const nextOffset = start + items.length;
  return { items, nextOffset, done: nextOffset >= all.length };
}

// Terugverwijzings-lijsten (bijv. "Overeenkomsten op dit aanbod" op een
// Offer-kaart, of "Aangeroepen door" op een artefact): tot en met
// REF_LIST_INLINE_MAX verwijzingen worden ze direct getoond; daarboven start
// de lijst ingeklapt met alleen een telling en klapt hij uit naar een
// filterveld + gechunkte lijst (zelfde lazy patroon als de kaartenlijst,
// chunkgrootte CARD_CHUNK_SIZE via cardChunk). Pure functies; de DOM-kant
// zit in doc.js en app.js.
export const REF_LIST_INLINE_MAX = 10;
export function refListCollapsed(count) {
  return (count || 0) > REF_LIST_INLINE_MAX;
}
// Client-side filter van verwijzings-items ({ title, sub? }) op titel of
// subtekst (bijv. afnemerslabel) — case-insensitief substring-filter.
export function filterRefItems(items, query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return items || [];
  return (items || []).filter((it) => (it.title || '').toLowerCase().includes(q)
    || (it.sub || '').toLowerCase().includes(q));
}

// Leden van een target-gegevensset (odrl:AssetCollection) gegroepeerd op hun
// rdf:type, met het klasse-label uit de geladen data als groepskop (C1: geen
// hardcoded IRI-namespaces meer; het registerfragment/de detail-CONSTRUCT
// typeert de leden — BRP: brp:Categorie/brp:Groep/brp:Rubriek). Groepen
// alfabetisch op klasse-label; leden binnen een groep alfabetisch op label.
// Zonder type-informatie: één ongegroepeerde alfabetische lijst; gemengd
// getypeerd/ongetypeerd: de ongetypeerde leden onder "Overige leden". Pure
// functies; de fold-out-DOM zit in doc.js/app.js.
// Woordkeuze van de ledenlijst volgt de SOORT collectie: de leden van een
// odrl:PartyCollection zijn partijen, niet doelobjecten. `kind` komt uit
// collectionRef (collKind); zonder kind blijft het asset-woord staan.
function memberKey(base, kind) { return kind === 'party' ? base + 'Party' : base; }

export function groupCollectionMembers(members, kind) {
  const byType = new Map();
  const untyped = [];
  for (const m of members || []) {
    if (m.typeIri) {
      let g = byType.get(m.typeIri);
      if (!g) {
        g = { typed: true, typeIri: m.typeIri, label: m.typeLabel || localName(m.typeIri), items: [] };
        byType.set(m.typeIri, g);
      }
      g.items.push(m);
    } else untyped.push(m);
  }
  const groups = [...byType.values()]
    .sort((a, b) => collate(a.label, b.label));
  if (untyped.length) {
    groups.push({
      typed: false, typeIri: null,
      label: groups.length ? t(memberKey('members.other', kind)) : t(memberKey('members.plain', kind)),
      items: untyped,
    });
  }
  for (const g of groups) {
    g.items = [...g.items].sort((a, b) => collate(a.label, b.label));
  }
  return groups;
}
// Kop-samenvatting voor de ledenlijst-fold-out: "48 leden (6 × Categorie,
// 12 × Groep, 30 × Rubriek)"; één groep korter ("30 leden (Rubriek)" of,
// zonder type-informatie, "30 leden").
export function memberSummary(members, kind) {
  const groups = groupCollectionMembers(members, kind);
  const total = (members || []).length;
  const count = t(memberKey('members.count', kind), { n: total });
  if (!groups.length) return t(memberKey('members.zero', kind));
  if (groups.length === 1) {
    return groups[0].typed ? t('members.countTyped', { count, label: groups[0].label }) : count;
  }
  return t('members.countGroups', {
    count, groups: groups.map((g) => `${g.items.length} × ${g.label}`).join(', '),
  });
}

// Middernacht-tijdstempels ("2019-02-03T00:00:00") zijn ruis in een
// overzichtskolom of navlabel: toon dan alleen de datum. (Gehoist —
// ook gebruikt door buildNav voor de versie-kinderen van een container.)
export function compactDate(v) {
  return v ? String(v).replace(/T00:00:00(?:\.0+)?(?:Z|[+-]\d\d:\d\d)?$/, '') : null;
}

// Dagdatum in de Nederlandse schrijfwijze (dd-mm-jjjj) voor plekken waar de
// datum als LOSSE WAARDE in een compacte regel staat en dus zelf leesbaar moet
// zijn — bv. de Verzoek-regel op een overeenkomst-kaart. Elders (versiechips,
// geldigheidsperiodes) blijft de ISO-notatie staan: die sorteert en is
// machineleesbaar. Wat geen ISO-dagdatum is (een jaartal, een vrije tekst)
// gaat ongewijzigd door de compactDate-route.
export function dayDate(v) {
  const s = compactDate(v);
  if (!s) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ].*)?$/.exec(String(s));
  return m ? `${m[3]}-${m[2]}-${m[1]}` : s;
}

// Compacte rijen voor de indextabel: titel, afnemer (met regel-fallback),
// aantal regels en versie-informatie waar aanwezig. Met temporele containers
// (tweede argument, optioneel): één rij per container — de rij draagt de
// containertitel en het versie-aantal en wijst naar de geldende versie;
// niet-geldende versies krijgen geen eigen rij.
export function setIndexRows(sets, temporalContainers) {
  const byCurrent = new Map((temporalContainers || []).map((c) => [c.currentIri, c]));
  const contained = new Set();
  for (const c of temporalContainers || []) {
    for (const v of c.versions) contained.add(v.iri);
  }
  const rows = [];
  for (const [idx, s] of (sets || []).entries()) {
    const c = byCurrent.get(s.iri);
    if (!c && contained.has(s.iri)) continue; // niet-geldende versie: geen rij
    const a = policyAssignee(s);
    rows.push({
      idx, // positie in de meegegeven sets-lijst (voor kaart-body-lookup)
      iri: s.iri,
      anon: !!s.anon,
      title: c ? c.title : s.title,
      assignee: partyLabel(a),
      rules: (s.permissions || []).length + (s.prohibitions || []).length
        + (s.obligations || []).length,
      versions: c ? c.versions.length : null,
      effectiveFrom: compactDate((s.version && s.version.effectiveFrom) || null),
      // Container-rij = de geldende versie; een (bv. toekomstige) opvolger
      // binnen de container maakt de rij niet "vervangen".
      superseded: c ? false
        : !!(s.version && s.version.supersededBy && s.version.supersededBy.length),
    });
  }
  return rows;
}

// Client-side filter van indexrijen op titel/afnemer (case-insensitief,
// substring). Pure functie; de UI herrendert alleen de tabelbody.
export function filterIndexRows(rows, query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((r) => (r.title || '').toLowerCase().includes(q)
    || (r.assignee || '').toLowerCase().includes(q));
}

// Navigatieboom-filter (drie-panelen-viewer): houd knopen waarvan het label
// matcht (met volledige subtree als context) of die een matchende nazaat
// hebben (de voorouders blijven als pad zichtbaar, zijtakken verdwijnen).
export function filterNav(nav, query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return nav;
  const prune = (nodes) => {
    const out = [];
    for (const n of nodes || []) {
      if ((n.label || '').toLowerCase().includes(q)) { out.push(n); continue; }
      const kids = prune(n.children);
      if (kids.length) out.push({ ...n, children: kids });
    }
    return out;
  };
  return prune(nav);
}

// Totaal aantal rijen in een navigatieboom (voor de "x van y"-teller en de
// initieel-ingeklapt-drempel).
export function countNavRows(nav) {
  let n = 0;
  const walk = (nodes) => { for (const x of nodes || []) { n++; walk(x.children); } };
  walk(nav);
  return n;
}

// Alles-in-één: parse bronnen en bouw model + nav. Het resultaat draagt
// timings (ms) per fase mee voor het performance-profiel (notes/
// performance-profiel.md); verwaarloosbare overhead, ook onder node.
const nowMs = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());
// Optionele voortgangscallback (worker-pad): { phase: 'parse', name, index,
// total } vóór elke bron, daarna { phase: 'model' } vóór de modelbouw.
export function loadSources(sources, onProgress) {
  const store = new Store();
  let total = 0;
  const errors = [];
  const t0 = nowMs();
  let i = 0;
  for (const src of sources) {
    i++;
    if (onProgress) onProgress({ phase: 'parse', name: src.name, index: i, total: sources.length });
    try {
      total += addSource(store, src.content, src.format || detectFormat(src.name, src.content));
    } catch (e) {
      errors.push({ name: src.name, message: e.message });
    }
  }
  if (onProgress) onProgress({ phase: 'model' });
  const t1 = nowMs();
  const model = buildModel(store);
  const t2 = nowMs();
  const nav = buildNav(model);
  const t3 = nowMs();
  const timings = { parseMs: t1 - t0, modelMs: t2 - t1, navMs: t3 - t2 };
  return { store, model, nav, errors, quadCount: total, timings };
}
