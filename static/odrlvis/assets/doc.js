// ODRL Visualizer (doc.html) — Swagger-UI-achtige leesweergave.
// Eén kolom: per aanbod een header (titel, beschrijving, metadata,
// toegangspunten), daaronder inklapbare overeenkomst-groepen met
// kleurgecodeerde toestemmings-rijen; onderaan het machine-uitvoerbare beleid.
// Uitsluitend lezen — bewerken gebeurt in de drie-panelen-viewer (index.html).
// Alle graaf-/modellogica komt uit parse.js; dit bestand bevat alleen DOM-code.
// ?sparql=<endpoint> maakt van de pagina een live register-viewer: de
// policylijst komt uit een SELECT (skelet-graaf), details worden per kaart
// bijgeladen met een CONSTRUCT (zie assets/sparql.js).
import {
  loadSources, addSource, buildModel, buildNav, curie, detectFormat,
  scopeNavToPolicy, scopeNavToSet, policyAssignee, setIndexRows,
  filterIndexRows, cardChunk, cardsStartCollapsed, isGraphSubject, CARD_CHUNK_SIZE,
  compactDate, dayDate, refListCollapsed, filterRefItems,
  groupCollectionMembers, memberSummary, memberTreeLevel, MEMBER_TREE_MAX_DEPTH,
  descriptionFor,
  registerPrefixes, registerLabelKeys, statusWord,
  offerRuleSplit, groupRules, pivotDimensions, PROFILE_PATTERNS,
  versionNavModel, versionNavDate,
  stubOnlyContainers, containerCardVersion, policyLifecycle,
  lifecyclePluralWord, agreementsByRequest, coverageNext,
} from './parse.js';
// Taalregime (B16): t() levert elke gebruikerszichtbare chrome-string, setLang
// zet de actieve taal (?lang=, taalkiezer in de topbar). De DATA-labels volgen
// dezelfde taal via pickLabel in parse.js.
import { t, num, setLang, getLang, normalizeLang, LANGS } from './i18n.js';
import {
  sparqlSelect, sparqlConstruct, policyListQuery, policyListFirstQuery, policyDetailQuery,
  listSkeletonTurtle,
  containerListQuery, containerSkeletonTurtle, collectionLevelQuery,
  decomposedIndexRows, isEndpointTimeout, nodeRefsQuery,
} from './sparql.js';
// TWEE STANDEN, NOOIT TEGELIJK (sep 2026, besluit eigenaar). De weergave van
// deze pagina is mensleesbaar; de machineleesbare graaf mag er niet naast
// staan — geen paneel, geen tweede kolom. Het ⌕ zet de pagina daarom in de
// VERKENNER-STAND: #doc-main gaat op hidden en #verken-main komt ervoor in de
// plaats. Dat gebeurt zonder herladen (de bronnen blijven staan) en met
// pushState, zodat de URL (?verken=<IRI>) deelbaar is en browser-terug/vooruit
// over beide standen heen werkt. Zie assets/verken-view.js.
//
// De EXTERNE client (Comunica, meegeleverd in ../comunica/) blijft bestaan als
// hulpmiddel: de verkenner biedt hem per knoop aan als "Bevraag met SPARQL",
// in een nieuw tabblad. verken.js bouwt die URL (verkenHref/verkenSources).
import { verkenHref, verkenLink, iriOf } from './verken.js';
import {
  verkenNode, renderVerken, verkenIriFromSearch, verkenSearch, resetVerkenFolds,
} from './verken-view.js';
// UITLEG OP VERZOEK (note §1): termen die een definitie in de data dragen
// krijgen een gestippelde onderstreping en een tooltip. Zie assets/tooltip.js.
import { explained } from './tooltip.js';
import { useWorkerFor, loadSourcesInWorker, hydrateInto, createStore, asTerm } from './model-client.js';
// Configuratie (data, geen kern-code): default-democorpus (gedeeld met
// index.html/app.js), per-endpoint graph-uitsluitingen en het
// default-registerfragment met prefixafkortingen.
import { DEFAULT_EXAMPLES, EXAMPLES_BASE, COMUNICA_BASE } from './default-corpus.js';
import { excludeGraphsFor } from './endpoint-config.js';
import { DEFAULT_REGISTER_PREFIXES } from './register-prefixes.js';
import { DEFAULT_PROPERTY_LABEL_KEYS } from './register-labels.js';
// SHAPE-GEDREVEN DOMEINFORMULIEREN (Visualisation Note §8). De generieke
// renderer leest een sh:NodeShape met DASH/SHUI-weergaveannotaties en levert
// een weergavemodel; de meegeleverde artefact-shape is de terugval wanneer geen
// enkele geladen bron er een meebrengt.
import { readShapes, shapeForNode, formModel, builtinShapes } from './forms.js';
import { ARTIFACT_FORM_SHAPE_TTL } from './artifact-form-shape.js';
import { detectSource, partitionSources } from './source-detect.js';

// Registerprefixen als data (C2): nodig voor curie() in bronloze
// ?src=<endpoint>-modus; bron-@prefix-declaraties zijn identiek en winnen
// niet (eerste registratie wint).
registerPrefixes(DEFAULT_REGISTER_PREFIXES);
// Default-labels als data: NL-labels voor externe vocabulairetermen (dct:,
// skos:) die niet in de geladen bronnen zelf gelabeld worden — zie
// assets/register-labels.js. Bron-rdfs:label/skos:prefLabel/dct:title wint
// altijd (labelFor in parse.js raadpleegt de graaf eerst).
registerLabelKeys(DEFAULT_PROPERTY_LABEL_KEYS);

// Taalkeuze (audit-punt B16). ?lang=nl|en, default nl — BEWUST géén
// browser-taaldetectie: expliciet is voorspelbaar, en een gedeelde URL toont
// bij iedereen hetzelfde. Meteen zetten, vóór de eerste render: parse.js leest
// dezelfde instelling voor zijn labelvoorkeur en zijn weergavewoorden.
setLang(new URLSearchParams(location.search).get('lang'));

const el = (id) => document.getElementById(id);
const state = {
  store: null, model: null, nav: null,
  fullNav: null,            // ongescopete nav van de laatste lading (rescope-cache)
  storeReady: null,         // worker-pad: promise tot de hoofddraad-store vol is
  storeHydrated: true,      // false zolang de store nog in stukjes opgebouwd wordt
  quadCount: 0,             // triples van de laatste lading (statusregel)
  baseNote: '',             // note van de laatste lading (statusregel)
  policyScope: null,        // ?policy=<IRI>: beperk tot die policy
  setScope: null,           // ?set=<IRI>: de leden van één beleidspublicatie
  sparqlEndpoint: null,     // SPARQL-endpoint (?src= of legacy ?sparql=)
  excludeGraphs: [],        // graph-uitsluitingen (?exclude-graph= of endpoint-config)
  detailLoaded: new Set(),  // policy-IRI's waarvan het detail al is geCONSTRUCT
  detailPending: new Map(), // policy-IRI -> lopende detail-promise
  // De KETEN als opzoektabel voor het invulling-paneel: data-ref -> element
  // (regel, voorwaarde, conformsToPolicy-rij). Wordt bij elke render opnieuw
  // gebouwd (buildFillIndex).
  fillIndex: new Map(),
  // Wat er in het rechterpaneel staat: { mode: 'fill', ref, scope } of null.
  // Overleeft een herrender/taalwissel via
  // captureListUi/restoreListUi.
  panel: null,
  // Sprong naar een kaart elders in de pagina (revealInUi): per hoofdsectie een
  // resolver die de kaart van een IRI tevoorschijn haalt (sectie openen, filter
  // wissen, lazy chunks doorrenderen). Wordt bij elke render opnieuw gevuld.
  revealSections: [],
  offerCards: new Map(),    // offer-IRI -> gerenderde aanbod-kaart
  // Tweefasige ?sparql=-lijstlading (zie loadFromSparql): 'first' zolang de
  // pagina op de goedkope eerste slag draait (echte kaarten, maar een
  // onvolledige index: tellers "…", filters gedempt, skeleton-staart), null
  // zodra de volledige index binnen is (of buiten lijstmodus).
  listPhase: null,
  // true zodra de volledige index NIET via policyListQuery maar via de vijf
  // platte deelqueries is opgehaald (endpoint dat geneste aggregaties niet
  // aankan; zie indexRows). Alleen zichtbaar als notitie in de statusregel.
  compatIndex: false,
  sectionFilters: new Map(), // sectie-id -> filtercontrol van de laatste render
  carryFilterText: null,     // sectie-id -> tekstfilter, mee over de fasewissel
  // Pivot: de door de LEZER gekozen groepering, als lijst curies/IRI's in
  // nestvolgorde (buitenste eerst). null = geen keuze gemaakt, dus de volgorde
  // die de bron declareert (sh:order); een LEGE lijst = alles uitgezet, dus een
  // platte lijst. Wordt bij boot uit ?groupby= gevuld en daarna hier bijgehouden
  // — zelfde patroon als de filterkeuzes, die ook in de control leven en de URL
  // alleen als deelbare weerslag gebruiken.
  groupBy: null,
  // DE VERKENNER-STAND (?verken=<IRI>). null = documentweergave. Zolang deze
  // gevuld is, staat #doc-main op hidden en #verken-main in beeld — nooit
  // allebei. Zie openVerken/showDoc.
  verkenIri: null,
  verkenLoaded: new Set(),  // IRI's waarvan de knoop-CONSTRUCT al is opgehaald
  verkenBusy: false,        // endpoint-modus: er loopt een knoop-CONSTRUCT
  verkenError: '',          // laatste ophaalfout, als mededeling in de weergave
};
let extraNote = '';

// --- Kleine DOM-helper (zelfde patroon als app.js) ---------------------------
function h(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (v != null) node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null || c === '') continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

// --- Kaart-kopregel: te lezen ÉN te kopiëren --------------------------------
// Een <summary> klapt bij elke klik om, en dat botst met selecteren: wie een
// kaarttitel dubbelklikt of doorheen sleept om hem te kopiëren, ziet de kaart
// open- en dichtklappen in plaats van tekst geselecteerd te krijgen. De ene
// helft van de oplossing staat in doc.css (user-select: text op de titeltekst
// zelf, terwijl de kopregel eromheen onselecteerbaar blijft — anders sleept
// een klik naast de titel de halve kop mee); dit is de andere helft: de omklap
// ONDERDRUKKEN zodra er echt geselecteerd is.
//
// Waarom niet gewoon "meer dan één klik => niet omklappen"? Bij een dubbelklik
// is de EERSTE klik al langsgeweest en heeft de kaart al omgeklapt. Daarom
// twee dingen: bij het indrukken van de eerste klik de stand onthouden, en die
// bij de vervolgklik terugzetten. Een gewone klik merkt hier niets van — dan
// is er geen selectie en gaat de <details> zijn eigen gang — en de knoppen in
// de kopregel (verken, versienavigator, aanbodtelling) stoppen hun eigen klik
// al af voordat hij hier komt.
function selectionWithin(node) {
  const sel = (typeof window !== 'undefined' && window.getSelection)
    ? window.getSelection() : null;
  if (!sel || !String(sel).trim()) return false;
  const anchor = sel.anchorNode;
  const el = anchor && anchor.nodeType === 1 ? anchor : (anchor && anchor.parentNode);
  return !!(el && node.contains && node.contains(el));
}

// ELKE <summary> IN DEZE WEERGAVE (aug 2026). De klik-onderdrukker zat eerst
// alleen op de kaartkoppen; hij hoort op álle kopregels, want sinds de chips
// en rijteksten overal selecteerbaar zijn (doc.css) kun je overal in een kop
// tekst slepen — en dan mag de vouw niet omklappen. summaryEl() is daarom de
// enige plek waar deze weergave nog een <summary> maakt.
function summaryEl(attrs, kids) {
  const sum = h('summary', attrs, kids);
  let openAtPress = null;
  sum.addEventListener('mousedown', (e) => {
    if (((e && e.detail) || 1) <= 1) openAtPress = sum.parentNode ? !!sum.parentNode.open : null;
  });
  sum.addEventListener('click', (e) => {
    if (!selectionWithin(sum)) return;
    e.preventDefault();
    if (((e && e.detail) || 1) > 1 && openAtPress !== null && sum.parentNode) {
      sum.parentNode.open = openAtPress;
    }
  });
  return sum;
}

function cardSummary(cls, kids) {
  return summaryEl({ class: cls }, kids);
}

// --- Uitklap-chevron (Swagger-stijl) -----------------------------------------
// ÉÉN driehoekje voor álle inklapbare koppen — aanbod-, overeenkomst- en
// set-kaarten, de regel-rijen en de sectiekoppen. Het staat ALTIJD als laatste
// element in de kopregel (dus helemaal rechts, ná de versiechip, de telling en
// de verken-knop) en is fors groter dan de vroegere 11px-glyphs. De vorm zelf
// tekent doc.css met een CSS-chevron (geen tekstglyph: die verschilt per font
// en blijft te klein); het draaien bij open/dicht loopt via dezelfde
// transform-regel als voorheen. size 'sm' = de geneste maat (fold-outs).
function chevron(size) {
  return h('span', { class: 'chev' + (size ? ' chev-' + size : ''), 'aria-hidden': 'true' });
}

// --- Laadstatus: één spinner-component + skeletons ---------------------------
// Alle laadmomenten (initiële lijst-SELECT, detail-CONSTRUCT bij kaart-uitklap
// of versiewissel, bron toevoegen) tonen dezelfde
// klassieke ronde spinner naast een korte statustekst. De bestaande
// voortgangsinformatie ("policylijst, 12.561 rijen", worker-voortgang per
// bron) blijft dus staan — alleen de presentatie is rustiger dan de vroegere
// losse tekstregel die bij elke fase omsprong.
function loadStatus(msg) {
  return h('div', { class: 'load-status', role: 'status', 'aria-live': 'polite' }, [
    h('span', { class: 'spinner', 'aria-hidden': 'true' }),
    h('span', { class: 'load-status-text', text: msg }),
  ]);
}

// Skeleton-kaart: de gemiddelde kaartvorm (kind-pill, titelbalk,
// ondertitelbalk, chip rechts) als grijze placeholder. De rij is exact even
// hoog als een echte ingeklapte kaartregel (.agr-summary = 36,8px), zodat de
// wissel skeleton -> echte kaarten geen layout-sprong geeft.
const SKELETON_CARDS = 7;
function skeletonCard(i) {
  return h('div', { class: 'skel-card skel-v' + (i % 3) }, [
    h('div', { class: 'skel-row' }, [
      h('span', { class: 'skel skel-pill' }),
      h('span', { class: 'skel skel-title' }),
      h('span', { class: 'skel skel-sub' }),
      h('span', { class: 'skel skel-chip' }),
    ]),
  ]);
}

function skeletonList(n = SKELETON_CARDS) {
  const box = h('div', { class: 'skel-list', 'aria-hidden': 'true' });
  for (let i = 0; i < n; i++) box.appendChild(skeletonCard(i));
  return box;
}

// Kleinere variant voor de BODY van één kaart terwijl zijn detail-CONSTRUCT
// loopt: een paar regelbalkjes in plaats van een halve kaartenlijst.
function skeletonLines(n = 3) {
  const box = h('div', { class: 'skel-lines', 'aria-hidden': 'true' });
  for (let i = 0; i < n; i++) box.appendChild(h('span', { class: 'skel skel-line skel-v' + (i % 3) }));
  return box;
}

// De laadweergave in een kaart-body: spinner + statustekst + skeletonregels.
function cardLoading(msg = t('load.cardDetail')) {
  const sr = h('span', { class: 'sr-only', role: 'status', 'aria-live': 'polite', text: msg });
  return h('div', { class: 'card-loading' }, [sr, skeletonLines(3)]);
}

// busy=true zet de spinner vóór de statustekst; de tekst zelf blijft gelijk
// (de statusregel is óók de eindtelling na het laden).
function setStatus(msg, busy) {
  const p = el('doc-status');
  if (!p) return;
  p.textContent = '';
  if (busy) p.appendChild(loadStatus(msg));
  else p.textContent = msg;
}

// Lange literals (bv. een volledige licentietekst als cc:legalcode) niet
// integraal uitschrijven: kap in de WEERGAVE af met een "toon meer"-uitklap.
// Het model en het bronfragment blijven volledig.
const LONG_TEXT_LIMIT = 600;
function longText(text) {
  const s = String(text ?? '');
  if (s.length <= LONG_TEXT_LIMIT) return h('span', { text: s });
  const short = s.slice(0, LONG_TEXT_LIMIT).trimEnd() + '…';
  const wrap = h('span', { class: 'longtext' });
  const body = h('span', { text: short });
  let open = false;
  const btn = h('button', {
    type: 'button', class: 'toggle-more',
    text: t('text.showMore', { n: s.length }),
  });
  btn.addEventListener('click', () => {
    open = !open;
    body.textContent = open ? s : short;
    btn.textContent = open ? t('text.showLess') : t('text.showMore', { n: s.length });
  });
  wrap.appendChild(body);
  wrap.appendChild(document.createTextNode(' '));
  wrap.appendChild(btn);
  return wrap;
}

function renderEmpty(msg) {
  const main = el('doc-main');
  main.innerHTML = '';
  main.appendChild(h('div', { class: 'empty', text: msg }));
}

function byIri(list, iri) { return list.find((x) => x.iri === iri); }

// --- Invulling-paneel: zijpaneel rechts --------------------------------------
// Geopend via het ⚙ op een regel/voorwaarde of een dubbelklik op zo'n rij.
// Sluiten: ✕-knop of Esc.
// ÉÉN PANEEL, ÉÉN MODUS (aug 2026). Het paneel had er twee: de INVULLING van
// een element (⚙) en de graaf-inspecteur (⌕). Die tweede is vervallen — de
// machineleesbare weergaven horen niet meer in deze pagina thuis; het ⌕ is nu
// een link naar de verkenner-stand van deze pagina (verken-view.js).
// Wat bleef: de kop, de positie, de breedte, en dat het paneel HET DOCUMENT
// NIET AFDEKT maar opzij duwt — zie setPanelOpen() hieronder. De klassenamen
// (insp-*) zijn de oude gebleven: ze horen bij de paneelvórm, niet bij de
// inspecteur, en zitten zo ook in de CSS.
let inspEls = null;   // { overlay, body, title }

function ensureInspOverlay() {
  if (inspEls) return inspEls;
  const body = h('div', { class: 'insp-body insp' });
  const close = h('button', { class: 'insp-close', type: 'button', title: t('panel.close'), text: '✕' });
  close.addEventListener('click', () => closePanel());
  const title = h('span', { class: 'insp-title', text: t('fill.title') });
  // GEEN GEDELEGEERDE DUBBELKLIK OP DE BODY (besluit eigenaar, aug 2026). Hij
  // ving alles op wat geen rij is — randlabels, de herkomst-regel, kopjes,
  // witruimte — en deed daar iets met het centrale element.
  // Een dubbelklik NAAST een rij hoort niets te doen: er is geen element om
  // heen te gaan.
  const overlay = h('aside', {
    class: 'insp-overlay', role: 'dialog', 'aria-label': t('fill.title'),
  }, [
    h('div', { class: 'insp-head' }, [title, close]),
    body,
  ]);
  overlay.hidden = true;
  if (document.body) document.body.appendChild(overlay);
  if (document.addEventListener) {
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });
  }
  inspEls = { overlay, body, title };
  return inspEls;
}

// --- INKLAPBARE RICHTINGEN IN HET PANEEL ------------------------------------
// De ↑/↓-blokken van het Invulling-paneel klappen open en dicht via hun
// randlabel. De stand hoort bij de MODUS, niet bij het element: wie een
// richting dichtklapt en dan een ander element opent, wil hem dicht houden.
//
// KEUZE: de stand staat in een gewone module-variabele, niet in
// captureListUi/restoreListUi. Die twee bewaren de open-staat van <details> in
// het DOCUMENT over een herrender heen (op data-open-key); het paneel rendert
// zichzelf uit een eigen functie en heeft er niets aan. Twee sleutels is te
// weinig om er een mechaniek voor op te tuigen — en zo overleeft de stand ook
// een taalwissel, wat captureListUi niet zou doen.
// Sessiegebonden: een herladen van de pagina begint weer bij de standaard.
//
// STANDAARD: beide blokken OPEN — de keten is de inhoud van het paneel.
//
// `null` = de lezer heeft dit blok in deze paneelsessie nog niet zelf gezet;
// daarna wint zijn keuze, ongeacht de lengte.
const REF_AUTO_OPEN_MAX = CARD_CHUNK_SIZE;
const PANEL_FOLDS = {
  fill: { up: true, down: true },
};
function panelFoldOpen(mode, key, count = null) {
  const m = PANEL_FOLDS[mode];
  if (!m) return false;
  if (m[key] != null) return !!m[key];
  return count == null || count <= REF_AUTO_OPEN_MAX;
}
function setPanelFold(mode, key, open) {
  if (PANEL_FOLDS[mode]) PANEL_FOLDS[mode][key] = !!open;
}

// Het randlabel op de rand van het grijze vlak, met chevron: klikken klapt het
// bijbehorende blok open of dicht. `blok` is het element dat verborgen wordt.
function foldEdge(labelText, blok, mode, key, cls) {
  const open = panelFoldOpen(mode, key);
  if (blok) blok.hidden = !open;
  // DE CHEVRON KOMT UIT CSS (::after op .is-foldable, gestuurd door
  // aria-expanded). Een echt element zou in de TEKST van het randlabel gaan
  // zitten — en dat label is een leesbare zin, geen knoppenbalk.
  const p = h('p', {
    class: 'fill-edge ' + cls + ' is-foldable',
    role: 'button', tabindex: '0', 'aria-expanded': String(open),
    text: labelText,
  });
  const toggle = () => {
    const nu = !panelFoldOpen(mode, key);
    setPanelFold(mode, key, nu);
    if (blok) blok.hidden = !nu;
    p.setAttribute('aria-expanded', String(nu));
  };
  p.addEventListener('click', toggle);
  p.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
  return p;
}

// Zet de kop van het paneel op de modus waarin het nu staat.
function panelMode(key) {
  const { overlay, title } = ensureInspOverlay();
  title.textContent = t(key);
  overlay.setAttribute('aria-label', t(key));
}

// ZIJPANEEL, GEEN OVERLAY (aug 2026, besluit eigenaar). Het paneel dekte het
// document af: wie de invulling van een voorwaarde las, kon niet tegelijk in
// de regel kijken waar die voorwaarde bij hoort. Zolang het openstaat krijgt
// de pagina daarom een rechterkolom ter breedte van het paneel
// (body.panel-open in doc.css) en schuift het document opzij in plaats van
// eronder te verdwijnen — scrollen, uitklappen en een ⚙ op een ander element
// blijven gewoon werken. Geen backdrop, geen scroll-lock, geen focus-trap:
// een klik in het document sluit het paneel NIET, alleen ✕ en Esc doen dat.
// Onder ~900px viewport valt de CSS terug op de oude overlay-vorm (mobiel).
function setPanelOpen(open) {
  const { overlay } = ensureInspOverlay();
  overlay.hidden = !open;
  const b = (typeof document !== 'undefined') ? document.body : null;
  if (b && b.classList) b.classList[open ? 'add' : 'remove']('panel-open');
}

// --- Sprong binnen de pagina: naar de kaart/rij van een IRI ------------------
// Best-effort, van specifiek naar generiek:
//   a. de IRI is een policy met een eigen kaart -> de omvattende (inklapbare)
//      sectie openen, de kaart laten renderen (lazy chunks doorrenderen; een
//      filter dat hem verbergt wordt gewist en de teller bijgewerkt), de kaart
//      openklappen, ernaartoe scrollen en kort laten oplichten;
//   b. de IRI is een REGEL met uid (permission/prohibition/duty) -> eerst de
//      omvattende policy-kaart als in (a), daarna de rij zelf;
//   c. anders (partij, doel-concept, artefact, gegevensset) -> het eerste
//      element in de weergave met die data-iri-stempel.
// Niets gevonden -> false; de aanroeper (een kruisverwijzing in de pagina)
// laat de lezer dan gewoon staan waar hij stond. Er wordt NOOIT automatisch
// van scope gewisseld (?policy=): in sparql-modus kan een knoop buiten de
// geladen kaarten vallen (bv. een onderdrukte bron-Set) en dat zou de context
// van de gebruiker weggooien.
function findPathByDataIri(root, iri) {
  if (!root || !iri) return null;
  const path = [];
  const walk = (n) => {
    path.push(n);
    const v = n.getAttribute ? n.getAttribute('data-iri') : null;
    if (n !== root && v === iri) return true;
    for (const k of (n.children || [])) if (walk(k)) return true;
    path.pop();
    return false;
  };
  return walk(root) ? path : null;
}

// Zelfde zoektocht, maar op de sleutel waarop de OPEN/DICHT-staat hersteld
// wordt. Die mag breder zijn dan data-iri: fold-outs zonder eigen identiteit
// (een ledenlijst, een tak in de partOf-boom) krijgen een data-open-key, en
// die mag niet meetellen voor de sprong zelf — anders landt een sprong naar
// een regel in de ledenlijst eronder.
function findPathByOpenKey(root, key) {
  if (!root || !key) return null;
  const path = [];
  const walk = (n) => {
    path.push(n);
    if (n !== root && n.getAttribute
      && (n.getAttribute('data-iri') === key || n.getAttribute('data-open-key') === key)) return true;
    for (const k of (n.children || [])) if (walk(k)) return true;
    path.pop();
    return false;
  };
  return walk(root) ? path : null;
}

function openDetails(node) {
  if (!node || !node.tagName) return;
  if (String(node.tagName).toLowerCase() !== 'details') return;
  node.open = true;
  if (node.setAttribute) node.setAttribute('open', '');
}

// Toegankelijkheidsnorm: wie prefers-reduced-motion aan heeft staan krijgt
// elke sprong INSTANT. Eén plek, gedeeld door het meescrollen bij uitklappen
// (applyExpandScroll) en de kruisverwijzings-sprong (flashNode/jumpAnchor).
function prefersReducedMotion() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Verste afstand die nog geanimeerd wordt, in schermhoogtes. Daarboven is een
// smooth scroll geen leesbeweging meer maar een wachttijd: de browser doet er
// (gemeten op /brp-ap, 1.151 verzoeken onder 1.392 overeenkomsten) seconden
// over om tienduizenden pixels af te leggen, en de highlight is dan allang
// weer uit vóór je aankomt.
const MAX_SMOOTH_JUMP_SCREENS = 4;

// `smooth`: geanimeerd scrollen (het eased gedrag van applyExpandScroll), met
// dezelfde reduced-motion-uitzondering én het afstandsplafond hierboven.
// Default UIT — een sprong naar een willekeurige kaart kan overal landen. De
// KRUISVERWIJZING binnen de pagina (Verzoek-regel → verzoek-kaart en terug)
// zet hem wél aan: daar is de sprong een leesbeweging langs de keten, en
// zonder animatie verliest de lezer waar hij vandaan kwam.
function flashNode(node, { smooth = false } = {}) {
  if (!node || !node.classList) return;
  node.classList.remove('ui-flash');
  void (node.offsetWidth || 0);   // reflow, zodat de animatie opnieuw start
  node.classList.add('ui-flash');
  setTimeout(() => { if (node.classList) node.classList.remove('ui-flash'); }, 1800);
  scrollToNode(node, { smooth });
}

// HET DOCUMENT NAAR EEN ELEMENT BRENGEN. Losgemaakt uit flashNode omdat het
// →-pijltje in het zijpaneel dezelfde beweging nodig heeft met een ándere
// markering (is-ref-hl in plaats van ui-flash). Scrolt het venster, nooit het
// paneel: dat staat er fixed naast.
// EIGEN EASING IN PLAATS VAN scrollIntoView({behavior:'smooth'}) (aug 2026).
// De vloeiende sprong OOGDE instant, en dat was geen browserfout maar deze
// functie zelf: `naar('smooth')` start de animatie, waarna settleScroll
// hieronder al in het eerstvolgende frame constateert dat het doel nog niet in
// het midden staat en met `naar('auto')` ingrijpt — de animatie was daarmee
// afgebroken vóór hij één frame had gelopen. Bovendien wisselt de layout
// tijdens een sprong (het pad wordt opengeklapt), en dan mikt een
// browser-animatie op een positie die intussen verschoven is.
//
// Wat er nu gebeurt: het pad is al open (de aanroeper doet dat eerst), we
// meten één keer waar het doel heen moet, en lopen daar in ~360 ms met een
// ease-in-out naartoe. PAS DAARNA gaat het nascrollen aan — dat blijft instant
// en corrigeert alleen wat de lazy lijsten intussen hebben bijgeladen.
const SMOOTH_MS = 360;
// Klassieke ease-in-out (cubic): rustig weg, rustig aankomen. Bewust geen
// lineaire beweging — die leest als een sprong met vertraging, niet als een
// leesbeweging.
const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - ((-2 * p + 2) ** 3) / 2);

function animateScrollTo(node, klaar) {
  const vh = window.innerHeight || 0;
  const r = node.getBoundingClientRect();
  const start = window.scrollY || window.pageYOffset || 0;
  const doel = Math.max(0, start + r.top + (r.height || 0) / 2 - vh / 2);
  if (Math.abs(doel - start) < 1) { klaar(); return; }
  const nu = () => ((typeof performance !== 'undefined' && performance.now)
    ? performance.now() : Date.now());
  const t0 = nu();
  const raf = typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame : (fn) => setTimeout(fn, 16);
  const step = () => {
    if (typeof window === 'undefined' || typeof window.scrollTo !== 'function') { klaar(); return; }
    const p = Math.min(1, (nu() - t0) / SMOOTH_MS);
    window.scrollTo(0, start + (doel - start) * easeInOut(p));
    if (p < 1) raf(step); else klaar();
  };
  raf(step);
}

// Kan deze omgeving de eigen animatie draaien? De teststub heeft geen
// meetbare viewport, en zonder scrollTo valt er niets te animeren.
function canAnimateScroll(node) {
  return typeof window !== 'undefined' && typeof window.scrollTo === 'function'
    && !!window.innerHeight && !!node.getBoundingClientRect;
}

// `then`: wat er ná aankomst gebeurt (de highlight-puls van een sprong). Bij
// een geanimeerde scroll wacht dat op het einde van de animatie, zodat de puls
// aangaat waar de lezer aankomt en niet waar hij vandaan kwam.
function scrollToNode(node, { smooth = false, then = null } = {}) {
  if (!node || !node.scrollIntoView) { if (then) then(); return; }
  const naar = (b) => {
    try { node.scrollIntoView({ block: 'center', behavior: b }); }
    catch { node.scrollIntoView({ block: 'center' }); }
  };
  let geanimeerd = smooth && !prefersReducedMotion() && canAnimateScroll(node);
  if (geanimeerd) {
    const vh = window.innerHeight || 0;
    const r = node.getBoundingClientRect();
    // Viewport-relatieve afstand: hoe ver buiten beeld ligt het doel?
    const weg = r.top > vh ? r.top - vh : (r.bottom < 0 ? -r.bottom : 0);
    if (weg > MAX_SMOOTH_JUMP_SCREENS * vh) geanimeerd = false;
  }
  if (!geanimeerd) { naar('auto'); settleScroll(node, naar); if (then) then(); return; }
  animateScrollTo(node, () => { settleScroll(node, naar); if (then) then(); });
}

// NASCROLLEN. De pagina GROEIT tijdens een sprong: de lazy kaartenlijsten
// laden onderweg nieuwe chunks bij (de IntersectionObserver-sentinel komt
// tijdens het scrollen in beeld), waardoor het doel ná de scroll weer verderop
// ligt. Gemeten op /brp-ap: de klik scrolde naar 3.187 px, maar de
// Overeenkomsten-sectie groeide daarbij van 65 naar 125 kaarten en de
// doelkaart stond toen nog 3.686 px lager — de lezer landde midden in een
// andere sectie. Daarom corrigeren tot het doel stilligt (zelfde gedachte als
// scheduleExpandScroll, dat op de kaarthoogte wacht). Correcties gaan altijd
// INSTANT: de leesbeweging is dan al gemaakt, dit is alleen nog bijstellen.
const SETTLE_TRIES = 24;          // ~1,5 s bij 60 fps met de stapgrootte hieronder
const SETTLE_TOLERANCE = 48;      // px afwijking van het midden die we accepteren
function settleScroll(node, naar) {
  if (typeof window === 'undefined' || !node.getBoundingClientRect) return;
  const raf = typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame : (fn) => setTimeout(fn, 16);
  let tries = 0;
  let stil = 0;
  let vorige = null;
  const step = () => {
    // De omgeving kan tussen twee frames verdwijnen (een herrender, of een
    // test die zijn window-stub opruimt); dan valt er niets meer bij te stellen.
    if (typeof window === 'undefined') return;
    const vh = window.innerHeight || 0;
    if (!vh) return;
    const r = node.getBoundingClientRect();
    const afwijking = Math.abs((r.top + r.height / 2) - vh / 2);
    const top = Math.round(r.top);
    stil = (top === vorige) ? stil + 1 : 0;
    vorige = top;
    // Op zijn plek én de layout ligt stil: klaar.
    if (afwijking <= SETTLE_TOLERANCE && stil >= 2) return;
    if (tries++ >= SETTLE_TRIES) return;
    if (afwijking > SETTLE_TOLERANCE) naar('auto');
    raf(step);
  };
  raf(step);
}

// De policy waarvan een regel-IRI deel uitmaakt (generiek over het model;
// geen AP-NL-specifieke kennis).
function policyOfRule(iri) {
  const m = state.model;
  if (!m) return null;
  for (const p of [...m.offers, ...m.agreements, ...m.sets]) {
    const rules = [...(p.permissions || []), ...(p.prohibitions || []), ...(p.obligations || [])];
    for (const r of rules) {
      if (r.iri === iri) return p.iri;
      for (const d of (r.duties || [])) if (d.iri === iri) return p.iri;
    }
  }
  return null;
}

async function resolveCardFor(iri) {
  for (const s of (state.revealSections || [])) {
    const card = s.resolve ? s.resolve(iri) : null;
    if (card) return card;
  }
  return null;
}

// GEËXPORTEERD VOOR DE TESTS (zoals expandScrollTarget). Sinds de
// graaf-inspecteur weg is, is de enige UI-route hiernaartoe de
// kruisverwijzing binnen de pagina (jumpAnchor: Verzoek-regel → verzoek-kaart,
// dekkingsuitklap → regel-rij). Die route is corpus-afhankelijk; de
// machinerie zelf — sectie openen, filter wissen, lazy chunks doorrenderen,
// de rij binnen de kaart vinden — is te belangrijk om alleen indirect te
// toetsen, dus de test drijft haar rechtstreeks aan.
export async function revealInUi(iri, { smooth = false } = {}) {
  if (!iri || !state.model) return false;
  const ownerIri = policyOfRule(iri);   // niet-null als de IRI een REGEL is
  const card = await resolveCardFor(ownerIri || iri);
  if (card) {
    openDetails(card);
    if (card.odrlOpenBody) { try { await card.odrlOpenBody(); } catch { /* toon wat er is */ } }
    if (ownerIri && ownerIri !== iri) {
      const path = findPathByDataIri(card, iri);
      if (path) {
        for (const n of path) openDetails(n);
        flashNode(path[path.length - 1], { smooth });
        return true;
      }
    }
    flashNode(card, { smooth });
    return true;
  }
  // (c) generiek: het eerste element in de weergave met deze IRI.
  const path = findPathByDataIri(el('doc-main'), iri);
  if (path) {
    for (const n of path) openDetails(n);
    flashNode(path[path.length - 1], { smooth });
    return true;
  }
  return false;
}

// --- Kruisverwijzing naar een andere KAART op deze pagina --------------------
// De keten aanbod → verzoek → overeenkomst loopt over drie top-secties, dus de
// verwijzingen ertussen moeten een SPRONG zijn en geen paginawissel. Deze
// anker-fabriek levert een gewone <a href="?policy=…"> — middelklik, "openen
// in nieuw tabblad" en kopiëren blijven dus werken, en zonder JavaScript
// landt de lezer alsnog op de detailpagina — maar bij een gewone klik
// navigeert hij NIET: revealInUi opent de omvattende sectie, laat de kaart
// renderen (lazy chunks doorrenderen; een filter dat hem verbergt wordt
// gewist), klapt hem open, scrolt er geanimeerd naartoe en laat hem kort
// oplichten.
//
// GEEN FILTER-ZETTEN (afweging aug 2026): de sprong wijst één kaart aan, geen
// selectie. Het filter van de doelsectie op die ene kaart zetten zou de
// filterstand van de lezer weggooien én in de URL (?status=/?aanbod=) achter-
// blijven — een neveneffect dat hij niet vroeg en dat "1 van 1.151" op de
// sectiekop zet. resolveCard wist een filter alleen als dat de doelkaart
// écht verbergt en zet het daarna terug; de kaart is dus altijd bereikbaar.
// (Vergelijk de telling-link op een aanbod-kaart, die de aanbod-dropdown WEL
// zet: die link betekent "de n overeenkomsten op dit aanbod" — een selectie.)
//
// Kan de pagina de kaart niet vinden (?policy=-scope, of nog niet geladen in
// ?sparql=-modus), dan volgt de link alsnog. De aanroeper vult de inhoud van
// het anker zelf, zodat er ook een samengestelde regel in kan.
function jumpAnchor(iri, title) {
  const u = new URLSearchParams(location.search);
  u.set('policy', iri);
  const href = '?' + u.toString();
  const a = h('a', { href, class: 'card-jump', title: title || null });
  a.addEventListener('click', (ev) => {
    // Modifier-klik (nieuw tabblad/venster) en middelklik blijven van de
    // browser; alleen de gewone linkerklik wordt een sprong.
    if (ev && (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button)) return;
    if (ev && ev.preventDefault) ev.preventDefault();
    Promise.resolve(revealInUi(iri, { smooth: true })).then((ok) => {
      if (!ok && typeof location !== 'undefined') location.href = href;
    }).catch(() => { /* de link blijft staan */ });
  });
  return a;
}

// Idem, maar met kale tekst als inhoud.
// `cls` zet een klasse op de tekst-span: een sprong die de PLEK van een rij
// nabootst (de titel in de dekkingsuitklap) hoort er hetzelfde uit te zien als
// die rij, niet als een losse link.
function jumpLink(iri, text, title, cls = null) {
  const a = jumpAnchor(iri, title);
  a.appendChild(h('span', { class: cls, text }));
  return a;
}

function closePanel() {
  if (inspEls) setPanelOpen(false);
  state.panel = null;
}

// Het ⌕ op een node-achtig element: een LINK naar de VERKENNER-STAND van deze
// pagina (?verken=<IRI>), in hetzelfde tabblad. De href is een echte,
// deelbare URL — middelklik en "openen in nieuw tabblad" werken gewoon — maar
// een gewone klik wisselt de pagina van stand zónder te herladen: de store
// blijft staan, dus heen en weer springen is instant.
//
// GEEN ⌕ ZONDER ADRES. Een blanke knoop (een naamloze regel, een anonieme
// policy) heeft buiten dit document geen IRI en is dus niet aan te wijzen —
// niet in een externe verkenner en niet in een deelbare URL; daar valt de knop
// weg in plaats van dood te staan. De aanroepers hangen hem daarom met
// appendIf() op, nooit blind.
function verkenBtn(termOrIri, title) {
  if (!termOrIri) return null;
  const iri = iriOf(termOrIri);
  if (!iri) return null;
  return verkenLink(verkenUrl(iri), title, () => openVerken(iri));
}

// De deelbare URL van de verkenner-stand op één knoop, resp. van de
// documentweergave. Alle overige parameters van deze pagina (?src=, ?policy=,
// ?lang=, filters) reizen mee: een gedeelde verkenner-link laadt dus dezelfde
// bronnen als de pagina waar hij vandaan komt.
function verkenUrl(iri) {
  return verkenSearch(typeof location !== 'undefined' ? location.search : '', iri);
}

function docUrl() {
  const s = verkenSearch(typeof location !== 'undefined' ? location.search : '', null);
  return s || (typeof location !== 'undefined' ? location.pathname : '');
}

// De URL van deze pagina, als basis voor het absoluut maken van bron-URL's en
// van het pad naar de verkenner. Onder node (tests) is er geen location.href.
function pageUrl() {
  return (typeof location !== 'undefined' && location.href) ? location.href : null;
}

// --- DE VERKENNER-STAND ------------------------------------------------------
// Twee <main>'s in doc.html, waarvan er altijd precies ÉÉN zichtbaar is. Dat
// is geen vormvoorkeur maar de dragende eis: de mensleesbare weergave en de
// machineleesbare graaf mogen niet samen op het scherm staan. Daarom gaat bij
// het openen van de verkenner ook het Invulling-zijpaneel dicht — dat toont
// documentinhoud en zou anders naast de graaf blijven hangen.

function showDocPane(verken) {
  const doc = el('doc-main');
  const vk = el('verken-main');
  if (doc) doc.hidden = !!verken;
  if (vk) vk.hidden = !verken;
  if (!verken && vk) vk.innerHTML = '';
}

// Naar de verkenner, op één knoop. `push`: een nieuwe stap in de
// browsergeschiedenis (elke klik in de verkenner is er een), zodat terug en
// vooruit over document én verkenner heen lopen.
function openVerken(iri, { push = true } = {}) {
  if (!iri) return Promise.resolve(false);
  const eerste = !state.verkenIri;
  state.verkenIri = iri;
  state.verkenError = '';
  // Een NIEUWE verkennersessie begint met de standaardstand van de twee
  // richtingblokken; binnen één sessie wint de keuze van de lezer.
  if (eerste) resetVerkenFolds();
  closePanel();
  if (push && typeof history !== 'undefined' && history.pushState) {
    history.pushState({ verken: iri }, '', verkenUrl(iri));
  }
  showDocPane(true);
  if (typeof window !== 'undefined' && window.scrollTo) window.scrollTo(0, 0);
  renderVerkenNow();
  return ensureVerkenNode(iri);
}

// Terug naar het document, bij deze knoop. Geen herlading: het document staat
// er nog, alleen verborgen — dus dit is een tonen plus een sprong (revealInUi).
function showInDoc(iri) {
  state.verkenIri = null;
  if (typeof history !== 'undefined' && history.pushState) {
    history.pushState(null, '', docUrl());
  }
  showDocPane(false);
  if (!iri) return;
  Promise.resolve(revealInUi(iri, { smooth: false })).then((ok) => {
    // Niet elke knoop heeft een eigen plek in het document (een partij, een
    // gegevensveld, of in ?src=<endpoint>-modus een kaart die niet geladen is).
    // Dan blijft de weergave staan waar zij stond en zegt de statusregel dat.
    if (!ok) setStatus(t('verken.notInDoc'));
  }).catch(() => { /* de weergave blijft staan */ });
}

// De stand die de URL beschrijft aanzetten. Wordt aangeroepen bij het laden
// (?verken= in de adresbalk) en bij browser-terug/vooruit.
function applyVerkenFromUrl() {
  const iri = verkenIriFromSearch(typeof location !== 'undefined' ? location.search : '');
  if (iri === state.verkenIri) return;
  if (iri) openVerken(iri, { push: false });
  else { state.verkenIri = null; showDocPane(false); }
}

if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('popstate', () => applyVerkenFromUrl());
}

// De verkenner opnieuw tekenen uit de huidige store. Goedkoop: het model van
// één knoop is een paar store-scans, en de twee richtingblokken bouwen hun
// lijst pas bij het openklappen.
function renderVerkenNow() {
  const box = el('verken-main');
  if (!box || !state.verkenIri || !state.store) return;
  renderVerken(box, verkenNode(state.store, state.verkenIri), {
    onNavigate: (iri) => openVerken(iri),
    hrefFor: (iri) => verkenUrl(iri),
    onShowInDoc: (iri) => showInDoc(iri),
    docHref: docUrl(),
    comunicaHref: verkenHref(state.verkenIri, state, {
      base: COMUNICA_BASE, pageUrl: pageUrl(),
    }),
    status: { loading: state.verkenBusy, error: state.verkenError },
  });
}

// ?src=<endpoint>-modus: de geladen graaf is op POLICIES gericht en zegt over
// een willekeurige knoop hooguit dat er naar verwezen wordt. Per navigatiestap
// halen we daarom beide richtingen van die ene knoop op (één CONSTRUCT, zie
// sparql.js/nodeRefsQuery) en MENGEN we het resultaat in de store vóór het
// renderen. Eén keer per knoop: daarna staat hij er.
async function ensureVerkenNode(iri) {
  if (!iri || !state.sparqlEndpoint || state.verkenLoaded.has(iri)) return false;
  state.verkenLoaded.add(iri);
  state.verkenBusy = true;
  state.verkenError = '';
  renderVerkenNow();
  try {
    const ttl = await sparqlConstruct(state.sparqlEndpoint,
      nodeRefsQuery(iri, { excludeGraphs: state.excludeGraphs }));
    // Worker-pad: wacht tot de hoofddraad-store vol is (zelfde voorwaarde als
    // bij ensureDetail) voordat we er iets bij mengen.
    if (state.storeReady && !state.storeHydrated) await state.storeReady;
    addSource(state.store, ttl, 'ttl');
    // Ook in state.sources, zodat een her-ingest (bron toevoegen/verwijderen)
    // de reeds opgehaalde knopen niet kwijtraakt.
    if (state.sources) {
      state.sources.push({
        name: iri + ' (SPARQL-knoop)', content: ttl, format: 'ttl', fromSparql: true,
      });
    }
  } catch (e) {
    // Opnieuw proberen mag: de knoop is niet geladen.
    state.verkenLoaded.delete(iri);
    state.verkenError = t('verken.loadFailed', { msg: e.message });
  } finally {
    state.verkenBusy = false;
  }
  if (state.verkenIri === iri) renderVerkenNow();
  return !state.verkenError;
}

// --- Laden (zelfde URL-parameters als de viewer) -----------------------------
async function loadFromExamples() {
  setStatus(t('load.examples'), true);
  renderLoading(t('load.examples'));
  const sources = [];
  const failed = [];
  for (const name of DEFAULT_EXAMPLES) {
    try {
      const res = await fetch(EXAMPLES_BASE + name);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      sources.push({ name, url: EXAMPLES_BASE + name, content: await res.text(), format: detectFormat(name) });
    } catch (e) { failed.push(name); }
  }
  if (!sources.length) {
    renderEmpty(t('err.examplesFetch'));
    setStatus(t('status.examplesFailed'));
    return;
  }
  ingest(sources, failed.length ? t('err.examplesPartial', { n: failed.length }) : '');
}

// Grote corpora gaan door de parse/modelbouw-worker (model-worker.js) zodat
// de pagina responsief blijft en voortgang per bron toont; kleine corpora en
// omgevingen zonder Worker (node-tests, file://) nemen het synchrone pad.
// Een oplopend volgnummer laat een verouderde worker-lading (er kwam intussen
// een nieuwe ingest) stilletjes vervallen.
let ingestSeq = 0;
async function ingest(sources, note) {
  state.sources = sources;
  const seq = ++ingestSeq;
  const tIngest0 = performance.now();
  let result = null;
  if (useWorkerFor(sources)) {
    try {
      result = await ingestViaWorker(sources);
    } catch (e) {
      result = null; // worker stuk of niet toegestaan: val terug op synchroon
    }
    if (seq !== ingestSeq) return;
  }
  if (!result) {
    result = loadSources(sources);
    result.ready = null;
    result.scopedNav = undefined;
  }
  applyResult(result, note, tIngest0);
}

// Voortgang tijdens het laden: statusregel én een melding in de hoofdkolom
// (de bronnenbalk kan ingeklapt zijn). De hoofdkolom toont spinner +
// statustekst met daaronder skeleton-kaarten, zodat de pagina tijdens het
// laden al de vorm van het resultaat heeft in plaats van omspringende tekst.
function renderLoading(msg) {
  const main = el('doc-main');
  if (!main) return;
  // Al een skeleton in beeld? Dan alleen de statustekst bijwerken — de
  // skeletons opnieuw opbouwen zou de pulsatie bij elke voortgangsstap
  // laten herstarten.
  const cur = main.children && main.children[0];
  if (cur && cur.className === 'doc-loading') {
    const txt = cur.children && cur.children[0] && cur.children[0].children
      && cur.children[0].children[1];
    if (txt) { txt.textContent = msg; return; }
  }
  // Staat er al een gerenderde lijst (bv. het eerste beeld van de tweefasige
  // lading, of bestaande inhoud bij een her-ingest)? Die NIET wegvegen voor
  // een paginabrede skeleton: de kaarten blijven staan en de voortgang loopt
  // via de statusregel; de skeleton-staart onder de secties signaleert al
  // "hier komt meer". Wegvegen gaf een flits lijst -> skeleton -> lijst.
  if (main.querySelector('.page-section')) return;
  main.innerHTML = '';
  // Alleen de shimmerende skeletons (beslissing eigenaar): geen spinner of
  // statustekst in beeld; de voortgang blijft beschikbaar in de status van
  // het bronnenpaneel. aria-live-melding behouden voor schermlezers.
  const sr = h('span', { class: 'sr-only', role: 'status', 'aria-live': 'polite', text: msg });
  main.appendChild(h('div', { class: 'doc-loading' }, [sr, skeletonList()]));
}

async function ingestViaWorker(sources) {
  const progress = (txt) => { setStatus(txt, true); renderLoading(txt); };
  progress(t('load.processing'));
  // De hoofddraad-store (detail-bijlaadbron) begint leeg en wordt
  // ná de eerste render in stukjes gevuld vanuit de graaf-overdracht; de
  // eerste render wacht alleen op het model.
  const store = createStore();
  let resolveReady;
  const ready = new Promise((r) => { resolveReady = r; });
  const msg = await loadSourcesInWorker(sources, {
    setScope: state.setScope,
    lang: getLang(),
    onProgress: (p) => {
      if (p.phase === 'parse') {
        progress(t('load.parseSource', { i: p.index, total: p.total, name: p.name }));
      } else if (p.phase === 'model') progress(t('load.buildModel'));
    },
    onStore: (payload) => {
      if (!payload) { resolveReady(store); return; } // overdracht faalde: leeg verder
      const tH0 = performance.now();
      hydrateInto(store, payload).then(() => {
        if (typeof window !== 'undefined' && window.__perf) {
          window.__perf.hydrateMs = performance.now() - tH0;
        }
        resolveReady(store);
      });
    },
  });
  return {
    store, ready, model: msg.model, nav: msg.nav, scopedNav: msg.scopedNav,
    errors: msg.errors, quadCount: msg.quadCount, timings: msg.timings,
  };
}

function applyResult(result, note, tIngest0) {
  // Bronnenlijst mét eventuele fouten per bron (o.a. "formaat niet
  // ondersteund (RDF/XML)") — geen stilte bij onleesbare bronnen.
  renderSources(state.sources, result.errors);
  state.store = result.store;
  state.model = result.model;
  state.fullNav = result.nav;
  state.storeReady = result.ready || null;
  state.storeHydrated = !result.ready;
  if (result.ready) {
    const store = result.store;
    result.ready.then(() => { if (state.store === store) state.storeHydrated = true; });
  }
  state.lastErrors = result.errors;
  state.quadCount = result.quadCount;
  state.baseNote = note;
  const tRender0 = performance.now();
  applyScopeAndRender(result.scopedNav);
  const tEnd = performance.now();
  // Profiel-instrumentatie (zie notes/performance-profiel.md): fasetimings
  // van de laatste ingest, uitleesbaar via window.__perf in de console.
  if (typeof window !== 'undefined') {
    window.__perf = {
      ...(result.timings || {}),
      renderMs: tEnd - tRender0,
      ingestMs: tEnd - tIngest0,
      quadCount: result.quadCount,
      sinceNavMs: tEnd,
    };
  }
}

// Scoping (?policy=/?set=) toepassen op de gecachete volledige nav en alles
// (her)renderen. `scopedNavFromWorker` is de door de worker meegegeven
// ?set=-scoping bij de initiële lading (de graaf zat toen alleen dáár);
// bij undefined wordt op de hoofddraad-store gescopet.
function applyScopeAndRender(scopedNavFromWorker) {
  state.nav = state.fullNav;
  let scopeNote = '';
  if (state.policyScope) {
    const scoped = scopeNavToPolicy(state.fullNav, state.policyScope);
    if (scoped) state.nav = scoped.nav;
    else scopeNote = t('status.policyNotFound');
  } else if (state.setScope) {
    if (scopedNavFromWorker !== undefined) {
      if (scopedNavFromWorker) state.nav = scopedNavFromWorker;
      else scopeNote = t('status.setNotFound');
    } else {
      const scoped = scopeNavToSet(state.fullNav, state.store, state.setScope);
      if (scoped) state.nav = scoped.nav;
      else scopeNote = t('status.setNotFound');
    }
  }
  const c = state.model.counts;
  const errors = state.lastErrors || [];
  const errNote = errors.length ? t('status.errors', { n: errors.length }) : '';
  const vcNote = c.versionContainers
    ? t('status.versionContainers', { n: c.versionContainers }) + ', ' : '';
  // De statusregel telt wat de pagina TOONT: beëindigde besluiten hebben geen
  // policy-object in het model maar wel een kaart, en verzoeken staan sinds de
  // eigen Verzoeken-sectie niet meer bij de beleidssets (ze zitten in
  // model.sets — ODRL-kern — maar krijgen hun eigen teller, zodat het getal
  // op de sectiekop en dat in de statusregel gelijk lopen).
  const beeindigd = stubOnlyContainers(state.model, 'agreement').length;
  const verzoeken = ((state.model.sets || []).filter((s) => s.isRequest)).length;
  const setNote = t('status.sets', { n: c.sets - verzoeken }) + ', '
    + (verzoeken ? t('status.requests', { n: verzoeken }) + ', ' : '');
  // Eerste-beeld-fase (tweefasige ?sparql=-lading): de getallen hieronder zijn
  // die van de afgekapte eerste slag — dat moet erbij staan, mét spinner,
  // anders leest de statusregel als een eindtelling.
  const eersteBeeld = state.listPhase === 'first';
  // Terugval-signaal: het endpoint kon de volledige-indexquery niet aan en de
  // index is via de vijf platte deelqueries opgebouwd (zie indexRows). Klein
  // en feitelijk — de pagina toont dezelfde gegevens, alleen anders opgehaald.
  const compatNote = (!eersteBeeld && state.compatIndex) ? t('status.compatIndex') : '';
  setStatus(t('status.sources', { n: state.sources.length }) + ', '
    + t('status.triples', { n: state.quadCount }) + ' · '
    + t('status.offers', { n: c.offers }) + ', '
    + t('status.agreements', { n: c.agreements + beeindigd }) + ', ' + setNote
    + vcNote + `${t('status.artifacts', { n: c.artifacts + c.bundles })} `
    + `${state.baseNote}${extraNote}${scopeNote}`.trim()
    + errNote + compatNote
    + (eersteBeeld ? t('status.firstView') : ''),
  eersteBeeld);
  renderPolicySelect();
  renderAll();
}

// Scope-wissel (policy-selector) zónder her-parse: hergebruik model + volle
// nav van de laatste lading. Vroeger herliep dit het volledige ingest-pad —
// bij 588k triples een seconden lange bevriezing per dropdown-keuze.
async function rescope() {
  if (!state.model) return;
  if (state.setScope && state.storeReady && !state.storeHydrated) {
    setStatus(t('load.graph'), true);
    renderLoading(t('load.graph'));
    await state.storeReady;
  }
  applyScopeAndRender(undefined);
}

// --- Policy-selector (topbar) ------------------------------------------------
// ?policy= selecteert één policy binnen de geladen bronnen; deze dropdown is
// daarvan de zichtbare bediening (petstore's definition-keuze).
function renderPolicySelect() {
  const sel = el('policy-select');
  if (!sel) return;
  sel.innerHTML = '';
  sel.appendChild(h('option', { value: '', text: t('select.allPolicies') }));
  const group = (label, items) => {
    if (!items.length) return;
    const og = h('optgroup', { label });
    for (const x of items) og.appendChild(h('option', { value: x.iri, text: x.title }));
    sel.appendChild(og);
  };
  const pubGroup = h('optgroup', { label: t('select.publications') });
  for (const d of state.model.catalogs) {
    pubGroup.appendChild(h('option', { value: 'set:' + d.iri, text: d.title }));
  }
  if (state.model.catalogs.length) sel.appendChild(pubGroup);
  group(t('section.offers'), state.model.offers);
  // Beëindigde besluiten staan niet in model.agreements (geen getypeerde
  // versie meer); hun laatste versie is de ingang, net als op de kaart.
  group(t('section.agreements'), [
    ...state.model.agreements,
    ...stubOnlyContainers(state.model, 'agreement')
      .map((c) => ({ iri: c.currentIri, title: c.title }))
      .filter((x) => x.iri),
  ]);
  const want = state.policyScope || (state.setScope ? 'set:' + state.setScope : '');
  sel.value = want;
  if (sel.value !== want) sel.value = ''; // scope niet in lijst
}

function wirePolicySelect() {
  const sel = el('policy-select');
  if (!sel) return;
  sel.addEventListener('change', () => {
    const v = sel.value;
    const u = new URLSearchParams(location.search);
    u.delete('policy'); u.delete('set');
    if (v.startsWith('set:')) {
      state.setScope = v.slice(4); state.policyScope = null;
      u.set('set', state.setScope);
    } else if (v) {
      state.policyScope = v; state.setScope = null;
      u.set('policy', v);
    } else {
      state.policyScope = null; state.setScope = null;
    }
    history.replaceState(null, '', u.toString() ? '?' + u.toString() : location.pathname);
    rescope();
  });
}
wirePolicySelect();

// --- Taalkiezer (topbar) -----------------------------------------------------
// "NL | EN" rechtsboven. De statische chrome van doc.html (knoplabels van het
// bronnen-paneel, placeholders) staat niet als NL-tekst in de HTML maar wordt
// hier gezet, zodat er één stringtabel is en de wissel niets kan overslaan.
// Een wissel herrendert de weergave volledig; de STORE blijft staan (bronnen
// worden niet opnieuw opgehaald), alleen model + nav worden opnieuw gebouwd —
// die dragen de labels en de rolwoorden.
function applyChrome() {
  if (typeof document !== 'undefined' && document.documentElement
      && document.documentElement.setAttribute) {
    document.documentElement.setAttribute('lang', getLang());
  }
  const set = (id, prop, value) => { const n = el(id); if (n) n[prop] = value; };
  set('btn-sources', 'textContent', t('src.toggle'));
  set('label-sources-loaded', 'textContent', t('src.loaded'));
  set('label-sources-add', 'textContent', t('src.addLabel'));
  set('btn-add-src', 'textContent', t('src.addButton'));
  const input = el('input-src');
  if (input && input.setAttribute) input.setAttribute('placeholder', t('src.placeholder'));
  const box = el('lang-switch');
  if (box && box.setAttribute) box.setAttribute('aria-label', t('lang.aria'));
  for (const b of (box && box.children) || []) {
    const l = b.getAttribute && b.getAttribute('data-lang');
    if (!l) continue;
    b.textContent = t('lang.' + l);
    b.className = 'lang-btn' + (l === getLang() ? ' on' : '');
    if (b.setAttribute) b.setAttribute('aria-pressed', l === getLang() ? 'true' : 'false');
  }
}

// ?lang= in de adresbalk (zelfde replaceState-patroon als ?src=/?status=).
// Ook `nl` wordt uitgeschreven: de taal is een expliciete keuze en een
// gedeelde link hoort hem te dragen, ook als hij toevallig de default is.
function langToUrl(lang) {
  if (typeof history === 'undefined' || !history.replaceState) return;
  const u = new URLSearchParams(location.search);
  u.set('lang', lang);
  history.replaceState(null, '', u.toString() ? '?' + u.toString() : location.pathname);
}

async function switchLang(lang) {
  const next = normalizeLang(lang);
  if (next === getLang()) return;
  setLang(next);
  langToUrl(next);
  applyChrome();
  if (!state.model || !state.store) return;
  // Worker-pad: het model wordt hier opnieuw gebouwd, dus de hoofddraad-store
  // moet vol zijn (zelfde voorwaarde als bij rescope met ?set=).
  if (state.storeReady && !state.storeHydrated) {
    setStatus(t('load.graph'), true);
    renderLoading(t('load.graph'));
    await state.storeReady;
  }
  // Een taalwissel bouwt model én DOM opnieuw op. Zonder deze twee regels
  // klapte daarbij alles dicht: precies wat captureListUi/restoreListUi al
  // voor de fasewissel van de tweetraps-lading oplossen. Dezelfde machinerie,
  // dezelfde volgorde — vastleggen vóór de herrender, terugzetten erna.
  const ui = captureListUi();
  state.model = buildModel(state.store);
  state.fullNav = buildNav(state.model);
  renderSources(state.sources || [], state.lastErrors || []);
  applyScopeAndRender(undefined);
  await restoreListUi(ui);
}

function wireLangSwitch() {
  const box = el('lang-switch');
  if (!box) return;
  for (const b of box.children || []) {
    const l = b.getAttribute && b.getAttribute('data-lang');
    if (!l || !b.addEventListener) continue;
    b.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      switchLang(l);
    });
  }
}
wireLangSwitch();
applyChrome();

// --- Kleurcodering ----------------------------------------------------------
// ÉÉN vaste kleur per REGELTYPE (beslissing eigenaar, aug 2026). De eerdere
// deterministische kleur per ACTIE (een kleurhash uit een palet van zes, naar
// het Swagger-methodekleur-idee) is vervallen: in een register met tientallen
// acties werd dat een regenboog waarin de kleur niets meer bétekende — twee
// rijen met dezelfde kleur zeiden "zelfde actie", wat de lezer als "zelfde
// soort regel" las. Nu draagt de kleur precies dat: het type van de regel.
// De klassenaam is de NEUTRALE sleutel (toestemming/verbod/duty/aanbod);
// het WOORD op de badge komt per taal uit de stringtabel (B16). De kleuren
// staan als semantische variabelen in doc.css.
//
// De soort is UITSLUITEND het ODRL-type. Tot aug 2026 kende deze weergave een
// vijfde, profielspecifieke soort: een permission met een purpose-refinement
// heette "doel" (het AP-NL-patroon "Doel = Permission + odrl:purpose"). Dat
// verstopte een profielpatroon in generieke code: zette de lezer de groepering
// uit, dan stond er nog steeds "doel" waar ODRL "toestemming" zegt. Het doel
// hoort thuis waar het vandaan komt — de GROEPSRIJ (die het label van de
// dimensie draagt), het Doel-veld en de voorwaarde-chip.
function ruleKind(rule, prohibition) {
  if (prohibition) return 'verbod';
  return rule && rule.kind === 'duty' ? 'duty' : 'toestemming';
}

// Sleutel -> i18n-key voor het badgewoord resp. het telwoord.
const RULE_WORD_KEYS = {
  toestemming: 'rule.permission',
  verbod: 'rule.prohibition', duty: 'rule.duty', aanbod: 'rule.offer',
};
const RULE_NOUN_KEYS = {
  duty: 'noun.duty',
  toestemming: 'noun.permission', verbod: 'noun.prohibition',
};
function ruleWord(kind) { return t(RULE_WORD_KEYS[kind]); }

// De BADGE op een regelrij: het woord ("toestemming", "verbod",
// "verplichting") plus de uitleg van de ODRL-klasse waar dat woord voor staat.
// Één functie, want dezelfde badge staat op een regelrij, op een
// verplichting-rij, in een groepskop en in het zijpaneel — en de uitleg hoort
// overal dezelfde te zijn.
function ruleBadge(kind, tekst = null) {
  return explainKey(
    h('span', { class: 'method ' + kind, text: tekst == null ? ruleWord(kind) : tekst }),
    RULE_WORD_KEYS[kind],
  );
}

// Naam van een regel die geen dct:title heeft: het actie-label, en daarachter
// de gegevensset als er precies één target is ("Verstrekken · Gegevensset 1").
// Bij meer targets zou die opsomming de kop laten uitwaaieren; ze staan dan
// gewoon in het Doelobjecten-veld van de body.
function actionTitle(p) {
  if (!p.action || !p.action.label) return null;
  const tg = p.targets || [];
  return tg.length === 1 && tg[0].label
    ? `${p.action.label} · ${tg[0].label}`
    : p.action.label;
}

// --- Bouwstenen -------------------------------------------------------------
// --- DE TERM ACHTER EEN VELDKOP (Visualisation Note §1) ---------------------
// De veldkoppen, sectiekoppen en soort-pills van deze weergave zijn EIGEN
// woorden (i18n.js): "Afnemer" staat er waar de data odrl:assignee zegt,
// "Voorwaarden" boven de odrl:constraints, "Toestemming" op een
// odrl:Permission. Die woorden zijn een vertaling, geen definitie — en de
// lezer die wil weten wát een aanbieder is, of waarom een verbod iets anders
// is dan een ontbrekende toestemming, heeft nergens iets om aan te klikken.
//
// Deze tabel legt de brug: per i18n-key de ODRL-/DCMI-/PROV-term waar de kop
// voor staat. De uitleg komt daarna langs de gewone weg — descriptionFor op
// dat IRI, dus eerst uit de geladen data (een profiel dat odrl:purpose
// preciezer definieert wint) en anders uit de meegeleverde definitiebundel.
//
// NIET ELKE KOP STAAT HIER, en dat is de bedoeling: "Overige eigenschappen",
// "Verzoek" en "Dataset" zijn samenvattingen van de weergave zelf, geen enkele
// term. Een kop zonder term krijgt gewoon geen uitleg — liever niets dan een
// verband dat de data niet legt.
const ODRL_NS = 'http://www.w3.org/ns/odrl/2/';
const DCT_NS = 'http://purl.org/dc/terms/';
const PROV_NS = 'http://www.w3.org/ns/prov#';
const DPV_NS = 'https://w3id.org/dpv#';
const TERM_OF_KEY = {
  // Partijen
  'field.assigner': ODRL_NS + 'assigner',
  'field.assignee': ODRL_NS + 'assignee',
  // Wat de regel toestaat
  'field.action': ODRL_NS + 'action',
  'field.target': ODRL_NS + 'target',
  'field.purpose': ODRL_NS + 'purpose',
  'left.purpose': ODRL_NS + 'purpose',
  'field.source': ODRL_NS + 'source',
  'field.profile': ODRL_NS + 'profile',
  // Herkomst en vindplaats
  'field.issued': DCT_NS + 'issued',
  'field.reference': DCT_NS + 'identifier',
  // GRONDSLAG EN BRON ZIJN TWEE DINGEN (besluit aug 2026). De wettelijke
  // grondslag is dpv:hasLegalBasis — de wet/het artikel waarop de regel rust.
  // dct:source is de HERKOMST van de verklaring zelf: het besluit, de
  // configuratie of de registerrij waaruit zij is overgenomen. Tot aug 2026
  // droeg dct:source beide betekenissen; sindsdien draagt het alleen de tweede.
  'field.legalBasis': DPV_NS + 'hasLegalBasis',
  'field.origin': DCT_NS + 'source',
  'field.derivedFrom': PROV_NS + 'wasDerivedFrom',
  'field.fulfilsOffer': PROV_NS + 'wasDerivedFrom',
  'field.replaces': PROV_NS + 'wasRevisionOf',
  'field.sourceLocation': PROV_NS + 'hadPrimarySource',
  // Sectiekoppen
  'head.constraints': ODRL_NS + 'constraint',
  'head.duties': ODRL_NS + 'duty',
  'head.consequences': ODRL_NS + 'consequence',
  'head.accessPoints': 'http://www.w3.org/ns/dcat#accessURL',
  'coll.refinementSection': ODRL_NS + 'refinement',
  // De left-operand-chip van de doelbinding-rij: de viewer schrijft daar zelf
  // "Doel"/"Purpose", de term erachter is odrl:purpose.
  'left.purpose': ODRL_NS + 'purpose',
  // Soort-pills: beleidssoort, regelsoort, verzamelingssoort
  'kind.set': ODRL_NS + 'Set',
  'kind.offer': ODRL_NS + 'Offer',
  'kind.agreement': ODRL_NS + 'Agreement',
  'kind.request': ODRL_NS + 'Request',
  'rule.permission': ODRL_NS + 'Permission',
  'rule.prohibition': ODRL_NS + 'Prohibition',
  'rule.duty': ODRL_NS + 'Duty',
  'rule.offer': ODRL_NS + 'Offer',
  'rule.inherited': ODRL_NS + 'inheritFrom',
  'coll.kindParty': ODRL_NS + 'PartyCollection',
  'coll.kindAsset': ODRL_NS + 'AssetCollection',
};

// De uitleg bij een i18n-key, of '' als de kop geen term achter zich heeft.
function keyDesc(key) {
  const iri = TERM_OF_KEY[key];
  return iri ? descriptionFor(state.store, iri) : '';
}

// Het WOORD van een kop, met zijn uitleg eraan. Levert een string terug als er
// niets uit te leggen valt, zodat kv() en h() hun gewone, goedkope pad houden.
function term(key, vars = null) {
  const tekst = t(key, vars);
  const uitleg = keyDesc(key);
  return uitleg ? explained(h('span', { text: tekst }), uitleg) : tekst;
}

// Dezelfde uitleg, maar op een AL GEBOUWDE node (een pill met eigen klassen).
function explainKey(node, key) {
  return explained(node, keyDesc(key));
}

// GEEN TWEE TOOLTIPS OVER ÉÉN PLEK. Een rij die zelf een native `title` droeg
// (de naam van een voorwaarde, de IRI van een doelobject) en die BINNENIN
// termen met een uitleg-tooltip heeft, gaf er twee tegelijk: de browser toonde
// zijn eigen gele kader over ons paneeltje heen. De titel verhuist daarom naar
// het paneeltje — als KOPREGEL, boven de uitleg. `focusable: false`: een rij
// is geen term, haar termen zitten erin, en een tabstop per rij zou de
// tabvolgorde verdubbelen zonder ergens nieuw naartoe te gaan.
function titleAsTip(node) {
  return explained(node, '', { focusable: false });
}

// Een kop (h4, sectielabel) met de uitleg van zijn term. Zonder uitleg blijft
// het de kale tekstnode die het was — geen extra <span> om niets.
function termHead(tag, key, attrs = {}) {
  const v = term(key);
  return typeof v === 'string' ? h(tag, { ...attrs, text: v }) : h(tag, attrs, [v]);
}

// `k` mag een string zijn (het gewone geval) of een al gebouwde node — dat
// laatste gebruikt het shape-formulier voor een veldlabel met uitleg.
function kv(pairs) {
  const dl = h('dl', { class: 'kv' });
  for (const [k, v] of pairs) {
    if (v == null || v === '') continue;
    dl.appendChild(typeof k === 'string' ? h('dt', { text: k }) : h('dt', {}, [k]));
    const dd = h('dd');
    if (typeof v === 'string') dd.textContent = v;
    else dd.appendChild(v);
    dl.appendChild(dd);
  }
  return dl;
}

function ref(agent) {
  if (!agent) return null;
  const tag = (iri) => h('span', { 'data-iri': iri || null }, [
    // De naam draagt de uitleg; de spatie erachter blijft erbuiten, anders
    // loopt de gestippelde streep door onder wit.
    ...(agent.label && agent.label !== agent.curie
      ? [explained(h('span', { text: agent.label }), agent.desc), ' '] : []),
    h('span', { class: 'mono muted', text: iri ? agent.curie : '' }),
    // Partijen (en andere verwezen nodes) zijn verkenbaar in de RDF-verkenner.
    verkenBtn(iri || agent.term),
  ]);
  // Een odrl:PartyCollection is meer dan een naam: hij draagt zijn leden
  // en/of de voorwaarde waaraan een partij moet voldoen (zie collectionNodes).
  if (!agent.intension && !(agent.members || []).length) {
    // data-iri: zie revealInUi — een partij is zo in de weergave terug te
    // vinden.
    return tag(agent.iri);
  }
  return h('span', { class: 'party-coll' }, collectionNodes(agent, tag));
}

// Leesbaar label voor een herkomstverwijzing: URL-gecodeerde padsegmenten
// (besluit-PDF's op publicaties.rvig.nl) worden gedecodeerd getoond.
function decodedRefLabel(d) {
  let label = d.label || d.curie || d.iri;
  if (/%[0-9A-Fa-f]{2}/.test(label)) {
    try { label = decodeURIComponent(label); } catch { /* laat de tekst staan */ }
  }
  return label;
}

// Eén herkomst-/versieverwijzing (prov:wasRevisionOf / wasDerivedFrom):
// externe http(s)-objecten zónder eigen triples in de store zijn beter af
// als échte link (nieuw tabblad) dan als tekst; interne verwijzingen
// (bron-besluit, andere policies) blijven tekst + verken-knop.
function provRefNode(d) {
  if (!d) return null;
  // Externe http(s)-verwijzing die géén policy in het model is: altijd een
  // échte link. Ook mét registerfragment-label (bv. de Tabel 35-regels, die
  // rdfs:label dragen en dus graaf-subject zijn): het label maakt de link
  // leesbaar, maar het blijft een extern document dat je wilt kunnen openen.
  // De verken-knop blijft ernaast wanneer er triples over bekend zijn.
  if (/^https?:/.test(d.iri) && !(state.model && (byIri(state.model.sets, d.iri)
      || byIri(state.model.offers, d.iri) || byIri(state.model.agreements, d.iri)))) {
    return h('span', {}, [
      h('a', { href: d.iri, target: '_blank', rel: 'noopener', text: decodedRefLabel(d) }),
      isGraphSubject(state.store, d.iri) ? verkenBtn(d.iri) : null,
    ]);
  }
  // Interne verwijzing: label + curie. De curie draagt het versie-onderscheid
  // sinds titels geen "(versie x)"-suffix meer hebben ("Vervangt: Gemeente
  // Tilburg/… apovk:510004-v9") — versies onderscheiden zich in de data via
  // uid en geldigheid, dus die tonen we hier.
  const label = decodedRefLabel(d);
  const c = d.curie && d.curie !== label && !/^https?:/.test(d.curie) ? d.curie : null;
  // Wijst de verwijzing naar een policy die we zélf in het model hebben (de
  // vervangen versie, het bronbesluit in de bron-datalaag), dan is hij ook te
  // ÓPENEN — niet alleen te inspecteren. Zo is een stub-versie die naar zijn
  // volledige registerversie wijst één klik van de inhoud verwijderd.
  const isPolicy = state.model && (byIri(state.model.sets, d.iri)
    || byIri(state.model.offers, d.iri) || byIri(state.model.agreements, d.iri));
  if (isPolicy) {
    const u = new URLSearchParams(location.search);
    u.set('policy', d.iri);
    return h('span', {}, [
      h('a', { href: '?' + u.toString(), text: label }),
      c ? ' ' : null, c ? h('span', { class: 'mono muted', text: c }) : null,
      verkenBtn(d.iri),
    ]);
  }
  return h('span', {}, [
    label,
    c ? ' ' : null, c ? h('span', { class: 'mono muted', text: c }) : null,
    verkenBtn(d.iri),
  ]);
}

// "Afgeleid van"-veldwaarde: verwijzingen met '; ' gescheiden (titels
// bevatten zelf komma's), elk getypeerd via provRefNode.
function derivedFromValue(list) {
  if (!list || !list.length) return null;
  return h('span', {}, list.flatMap((d, i) => [i ? '; ' : '', provRefNode(d)]));
}

// "Vindplaats"-veldwaarde (prov:hadPrimarySource): waar in het brondocument
// deze regel staat. Dezelfde route als de andere herkomstverwijzingen —
// provRefNode maakt van een externe http(s)-IRI een échte link, en doordat
// de anker-IRI het fragment #page=n draagt opent die de PDF meteen op de
// juiste pagina. Bewust een EIGEN veld met eigen opmaak naast de Grondslag:
// dpv:hasLegalBasis zegt waaróp de regel rust (de wet), dct:source uit welk
// stuk de verklaring komt, prov:hadPrimarySource wáár in dat stuk hij staat. Een anker zonder pagina (de tekst is niet letterlijk in
// het besluit teruggevonden) wijst eerlijk naar het document als geheel;
// dat blijkt uit het label, er wordt geen pagina bij verzonnen.
function sourceLocationValue(list) {
  if (!list || !list.length) return null;
  return h('span', { class: 'src-loc' },
    list.flatMap((d, i) => [i ? '; ' : '', provRefNode(d)]));
}

// "Kenmerk"-veldwaarde (dct:identifier): het documentkenmerk waaronder een
// besluit is vastgesteld — een korte, citeerbare code. Bewust klein en
// monospace tussen de kaartdetails: het is een vindhulp naast de titel, geen
// tweede titel en geen identificatie van de policy (dat is odrl:uid).
function identifierValue(p) {
  return p && p.identifier
    ? h('span', { class: 'mono muted doc-ref', text: p.identifier }) : null;
}

// "Verzoek"-veldwaarde: de aanvraag (odrl:Request) waaruit deze overeenkomst
// voortkwam, als COMPACTE regel — kenmerk, datum (dd-mm-jjjj) en indiener,
// gescheiden door '·'. Bewust hetzelfde gewicht als de Kenmerk- en
// Vindplaats-regels: het verzoek is herkomst-context bij het besluit, geen
// tweede beleidsstuk op de kaart. De verken-knop opent de verzoek-node in de
// RDF-verkenner, zodat de volledige aanvraag altijd één klik weg is —
// ook als hij (als mini-stub) geen eigen kaart in de lijst heeft.
// Het kenmerk staat monospace (zoals identifierValue), de rest gewoon.
//
// SPRONG (aug 2026): kenmerk · datum · indiener zitten samen in één
// jump-anker. Het verzoek heeft sinds de eigen Verzoeken-sectie altijd een
// eigen kaart, dus een klik hoeft de pagina niet te verlaten: de sectie gaat
// open, de kaart wordt gerenderd en opengeklapt, en de pagina scrolt er
// geanimeerd naartoe. De verken-knop ernaast blijft de route naar de RAUWE
// knoop in de RDF-verkenner — twee verschillende vragen, twee knoppen.
function requestValue(list) {
  const items = (list || []).filter(Boolean);
  if (!items.length) return null;
  const one = (r) => {
    const bits = [];
    if (r.identifier) bits.push(h('span', { class: 'mono muted doc-ref', text: r.identifier }));
    const d = dayDate(r.issued);
    if (d) bits.push(h('span', { class: 'muted', text: d }));
    // Indiener: het label van de odrl:assignee. Draagt de node geen label,
    // dan valt agentRef terug op de localname — dan is die naam nog altijd
    // informatiever dan niets, maar hij mag de regel niet dubbel vullen.
    const who = r.requester && r.requester.label;
    if (who) bits.push(h('span', { text: who }));
    // Geen enkel veld ingevuld: toon dan tenminste de titel/naam van het
    // verzoek, zodat de regel nooit leeg oogt.
    if (!bits.length) bits.push(h('span', { text: r.title || r.label || r.curie || r.iri }));
    // Request→Offer (note §4): vraagt dit verzoek een AANBOD aan, dan hoort
    // die betekenis ook hier — de overeenkomst laat dan in één regel zien
    // waar de aanvraag om ging. Alleen zichtbaar waar de data hem draagt;
    // in de BRP-registerdata verwijst een mini-verzoek nergens heen en
    // verandert de regel niet.
    const row = h('span', { class: 'req-line', title: t('request.title') });
    // Alleen de identificerende bits gaan IN het anker; de aanvraag-zin heeft
    // zijn eigen link + verken-knop en mag niet in een link genest raken.
    const jump = jumpAnchor(r.iri, t('jump.toRequest'));
    bits.forEach((b, i) => {
      if (i) jump.appendChild(document.createTextNode(' · '));
      jump.appendChild(b);
    });
    row.appendChild(jump);
    const vraagt = asksForNodes(r.asksFor);
    if (vraagt) {
      row.appendChild(document.createTextNode(' · '));
      row.appendChild(vraagt);
    }
    appendIf(row, verkenBtn(r.iri, t('request.title')));
    return row;
  };
  return h('span', {}, items.flatMap((r, i) => [i ? '; ' : '', one(r)]));
}

// --- Request→Offer: "vraagt <aanbod> aan" -----------------------------------
// De derde regel uit de betekenistabel van de note (§4). Eén predicaat
// (prov:wasDerivedFrom) draagt vier verschillende betekenissen, en elk heeft
// zijn eigen weergave — nooit de generieke "Afgeleid van"-regel:
//   Agreement -> Offer    "Vult aanbod in"  (field.fulfilsOffer)
//   Agreement -> Request  de Verzoek-regel  (requestValue)
//   Request   -> Offer    "vraagt … aan"    (hier)
//   regel     -> regel    de dekking (het invulling-paneel, zie fillGear)
// en al het overige (bron-besluit, wet, PDF) blijft "Afgeleid van".
// De keuze wordt GENERIEK gemaakt: de typering van bron én doelwit bepaalt de
// betekenis, niet het predicaat en niet de dataset. De aanbodtitel komt uit
// het model als het aanbod een eigen kaart heeft (dan is de zin ook een LINK
// naar die kaart), anders uit het label van de knoop zelf.
const ASK_SLOT = '\u0000';

function asksForNode(a) {
  const off = state.model && byIri(state.model.offers, a.iri);
  const naam = (off && off.title) || a.label || a.curie || a.iri;
  const u = new URLSearchParams(location.search); u.set('policy', a.iri);
  // t() levert een string; de aanbodnaam moet als eigen (klikbaar) element IN
  // die zin staan, dus wordt de zin om een sentinel heen gesplitst. Zo blijft
  // de woordvolgorde die van de stringtabel: NL "vraagt X aan" heeft een
  // staart achter de naam, EN "asks for X" niet.
  const [voor, na] = t('askOffer.line', { offer: ASK_SLOT }).split(ASK_SLOT);
  return h('span', { class: 'asks-for', title: t('askOffer.title') }, [
    h('span', { text: voor }),
    off ? h('a', { href: '?' + u.toString(), text: naam })
      : h('span', { class: 'asks-offer', text: naam }),
    na ? h('span', { text: na }) : null,
    verkenBtn(a.iri, t('askOffer.explore')),
  ].filter(Boolean));
}

// Alle aanvraag-zinnen van een verzoek als een inline reeks (puntkomma tussen
// meerdere aanbiedingen, zoals overal in de kaartdetails).
function asksForNodes(list) {
  const items = (list || []).filter((a) => a && a.iri);
  if (!items.length) return null;
  return h('span', { class: 'asks-for-line' },
    items.flatMap((a, i) => [i ? '; ' : '', asksForNode(a)]).filter((x) => x !== ''));
}

// De IRI's van de aanbiedingen die een verzoek AANVRAAGT — de "Afgeleid
// van"-regel van datzelfde verzoek moet ze overslaan (ze hebben hun eigen zin).
function asksForIriSet(pol) {
  return new Set(((pol && pol.asksFor) || []).map((a) => a.iri));
}

// --- Request←Agreement: "beslist in <overeenkomst>" -------------------------
// De OMGEKEERDE weergave van de Verzoek-regel, op de verzoek-kaart. De relatie
// staat in de data uitsluitend aan de overeenkomst-kant (Agreement →
// prov:wasDerivedFrom → Request); agreementsByRequest() draait hem om.
//
// VASTE PLEK: deze regel hoort in de kaart-BODY en nergens anders. In de
// kopregel zou hij er soms wel en soms niet staan (afhankelijk van wat er
// toevallig geladen is), en juist bij een verzoek is de uitkomst het eerste
// wat je wilt kunnen vinden. Dat hij er altijd kán staan, ook zonder dat de
// overeenkomst uitgeklapt is, komt van de omgekeerde skelet-kolom
// (answeredByRef in sparql.js).
//
// EERLIJKHEID: staat er geen beslissende overeenkomst in de graaf, dan blijft
// deze regel weg. Er wordt GEEN "afgewezen"- of "in behandeling"-status
// verzonnen — die kent het profiel niet en de afwezigheid van een beslissing
// in de geladen bronnen zegt er niets over.
function decidedInNode(a) {
  const agr = state.model && byIri(state.model.agreements, a.iri);
  const naam = (agr && agr.title) || a.title || curie(a.iri) || a.iri;
  // Zelfde sentinel-truc als asksForNode: de zin komt uit de stringtabel, de
  // NAAM moet als eigen (klikbaar) element in die zin staan.
  const [voor, na] = t('decidedIn.line', { agreement: ASK_SLOT }).split(ASK_SLOT);
  return h('span', { class: 'answered-by', title: t('decidedIn.title') }, [
    h('span', { text: voor }),
    jumpLink(a.iri, naam, t('jump.toAgreement')),
    na ? h('span', { text: na }) : null,
    verkenBtn(a.iri, t('decidedIn.explore')),
  ].filter(Boolean));
}

function decidedInNodes(list) {
  const items = (list || []).filter((a) => a && a.iri);
  if (!items.length) return null;
  return h('span', { class: 'answered-by-line' },
    items.flatMap((a, i) => [i ? '; ' : '', decidedInNode(a)]).filter((x) => x !== ''));
}

// De beantwoordende overeenkomst(en) van één verzoek. De omkeermap wordt per
// render één keer gebouwd (renderAll wist hem) — hij loopt over álle
// overeenkomsten en zou anders per kaart opnieuw berekend worden.
function answeredByOf(iri) {
  if (!state.model || !iri) return null;
  if (!state.answeredBy) state.answeredBy = agreementsByRequest(state.model);
  return state.answeredBy.get(iri) || null;
}

// De IRI's van de verzoeken aan één overeenkomst — de "Afgeleid van"-regel
// moet ze overslaan: ze hebben hun eigen Verzoek-regel (drie soorten
// wasDerivedFrom-doelwitten: aanbod, verzoek, bron-document).
function requestIriSet(agr) {
  return new Set(((agr && agr.requests) || []).map((r) => r.iri));
}

// Compacte versie-/herkomstregel (geen aparte sectie zoals in de viewer).
function versionLine(v) {
  if (!v) return null;
  const parts = [];
  if (v.effectiveFrom) parts.push(t('vline.validFrom', { date: v.effectiveFrom }));
  if (v.effectiveTo) parts.push(t('vline.validTo', { date: v.effectiveTo }));
  if (v.revisionOf) parts.push(t('vline.replaces', { refs: v.revisionOf.label || v.revisionOf.curie }));
  if (v.supersededBy && v.supersededBy.length) {
    // Puntkomma tussen items: wet-/besluittitels bevatten zelf komma's
    // ("Wet basisregistratie personen, artikel 3.1").
    parts.push(t('vline.supersededBy', {
      refs: v.supersededBy.map((s) => s.label || s.curie).join('; '),
    }));
  }
  if (v.derivedFrom && v.derivedFrom.length) {
    parts.push(t('vline.derivedFrom', {
      refs: v.derivedFrom.map((d) => d.label || d.curie).join('; '),
    }));
  }
  if (!parts.length) return null;
  return h('p', { class: 'version-line muted', text: parts.join(' · ') });
}

// --- Dekking: de VOORWAARDE is de plek, niet de regelkop --------------------
// Tot aug 2026 droeg elke regelKOP een dekkingstag ("gedekt door …" / "niet
// gedekt"). Die zijn VERVALLEN (besluit eigenaar). Twee redenen:
//   * de tag herhaalde op elke rij dezelfde artefactnaam — in de Breda-proef
//     vijf keer dezelfde module naast vijf koppen — terwijl de kop juist de
//     ruimte moet houden voor wat die ene regel onderscheidt;
//   * "niet gedekt" is een oordeel-achtige mededeling op een plek waar de
//     lezer niets kan nakijken: er stond geen enkele ingang naar wát er dan
//     wél gedekt was.
// In plaats daarvan is de conformsToPolicy-VOORWAARDE de primaire
// representatie: die staat toch al in de voorwaardenlijst van de regel, noemt
// de module bij naam, en is nu UITKLAPBAAR — opengeklapt vertelt zij wat er
// van DEZE regel wordt afgedwongen: de regel zelf, en welke van haar benoemde
// voorwaarden wel en niet. Sinds de technische view (aug 2026) staat dat
// verhaal niet meer in de uitklap maar in het rechterpaneel (fillGear/⚙); de
// uitklap toont het ARTEFACT zelf, en de regelkop draagt hetzelfde raderwiel
// als opener — groen als alles is ingevuld, amber bij een deel.
//
// De DETECTIE blijft ongewijzigd bestaan als modelinformatie
// (parse.js/annotateCoverage: rule.coveredBy en rule.uncovered, plus de
// omgekeerde index model.coverageByNode). Alleen de kop-presentatie verviel.

// Eén regel in de dekkingslijst: zijn soortwoord, zijn naam als SPRONG naar de
// rij in de weergave (jumpLink → revealInUi opent de kaart, klapt de rij open
// en laat hem oplichten), en de verken-knop naar de knoop in de graaf. Dezelfde
// twee uitgangen als elke andere regelrij op deze pagina.
// --- BRON <-> DUPLICAAT: hover markeert de rij waar het vandaan komt --------
// De dekkingsuitklap toont dezelfde rijen nog een keer: de voorwaarde-chiprij
// zoals zij in de Voorwaarden-sectie staat, de verplichting zoals zij in de
// Verplichtingen-sectie (of de geërfd-vouw) staat. Een duplicaat is pas
// begrijpelijk als de lezer ziet WAAR het vandaan komt; daarom dragen bron en
// duplicaat dezelfde `data-ref` (de IRI van de knoop), en licht hoveren of
// focussen van het duplicaat alle rijen met die ref in DEZELFDE kaart op.
// Bewust niets openklappen: zit de bron in een dichte geërfd-vouw, dan
// markeren we alleen wat zichtbaar is — een uitklap laten omspringen bij een
// muisbeweging is erger dan geen markering.
const REF_HL = 'is-ref-hl';

// De kaart waarbinnen we markeren: verder omhoog zou een gedeelde
// stelselplicht op ALLE kaarten tegelijk oplichten.
function refRoot(node) {
  let laatste = node;
  for (let cur = node; cur; cur = cur.parentNode) {
    if (/\b(set-card|offer-group)\b/.test(String(cur.className || ''))) return cur;
    laatste = cur;
  }
  return laatste;
}

// Handmatig aflopen in plaats van querySelectorAll: een attribuutselector is
// meer DOM dan deze weergave elders nodig heeft (en dan de teststub biedt).
function refNodes(root, ref) {
  const out = [];
  const walk = (n) => {
    for (const c of n.children || []) {
      if (c.getAttribute && c.getAttribute('data-ref') === ref) out.push(c);
      walk(c);
    }
  };
  walk(root);
  return out;
}

// DE PLAATS VAN EEN ARTEFACT (aug 2026). Een artefact-ref hoorde bij de kaart
// in "Machine-uitvoerbaar beleid"; die sectie bestaat niet meer. Het artefact
// staat nu op de conformsToPolicy-RIJEN die het aanhalen (data-art). Van
// meerdere rijen wint de rij in de kaart waar de lezer vandaan komt — dat is
// wat refRoot/gearTarget met hun zoekvolgorde al regelen.
function artNodes(root, ref) {
  const out = [];
  const walk = (n) => {
    for (const c of n.children || []) {
      if (c.getAttribute && c.getAttribute('data-art') === ref) out.push(c);
      walk(c);
    }
  };
  walk(root);
  return out;
}

// Waar een ref in het document te vinden is: eerst de rijen die hem letterlijk
// dragen, anders — voor een artefact — de conformsToPolicy-rijen die ernaar
// verwijzen.
function refTargets(root, ref) {
  const direct = refNodes(root, ref);
  return direct.length ? direct : artNodes(root, ref);
}

function refHighlight(el, ref, aan) {
  for (const n of refNodes(refRoot(el), ref)) {
    if (aan) n.classList.add(REF_HL); else n.classList.remove(REF_HL);
  }
}

// Een DUPLICAAT-rij: de gedeelde ref plus de markeer-handlers. De bronrijen
// krijgen alleen de ref (refSource) — hoveren over een gewone regelrij hoort
// niets te laten oplichten, dat zou de kaart onrustig maken.
function refDuplicate(el, iri) {
  if (!el || !iri) return el;
  el.setAttribute('data-ref', iri);
  el.setAttribute('tabindex', '0');
  const aan = () => refHighlight(el, iri, true);
  const uit = () => refHighlight(el, iri, false);
  el.addEventListener('mouseenter', aan);
  el.addEventListener('mouseleave', uit);
  el.addEventListener('focusin', aan);
  el.addEventListener('focusout', uit);
  return el;
}

function refSource(el, iri) {
  if (el && iri) el.setAttribute('data-ref', iri);
  return el;
}

// ELKE VOORWAARDE IS DEZELFDE RIJ. Benoemd of blank: links de slot-chips
// (grootheid · operator · waarde), en verder niets wat de vorm verstoort. Een
// rdfs:label van een benoemde voorwaarde is CONTEXT, geen inhoud: hij stond
// als "naam: " vóór de chips, waardoor benoemde en blanke rijen niet meer
// onder elkaar uitlijnden en het verschil op inhoud leek te slaan. Hij staat nu
// als tooltip op de rij én als klein gedempt bijschrift RECHTS, vlak vóór de
// ⌕/⚙-knoppen. Het enige zichtbare verschil tussen benoemd en blank blijft
// daarmee wat het is: een benoemde rij is aanhaalbaar (⌕) en kan afgedwongen
// zijn (⚙).
function constraintNote(c) {
  return c && c.label ? h('span', { class: 'c-note muted', text: c.label }) : null;
}

function constraintTitle(c) {
  return [c && c.label, c && c.comment].filter(Boolean).join(' \u2014 ') || null;
}

// Eén voorwaarde in een dekkingslijst: EXACT dezelfde chip-rij als in de
// Voorwaarden-sectie van de regel (inclusief het naam-bijschrift), want dat is
// precies wat zij is — een duplicaat van die rij. Geen eigen ⌕ en geen
// "geeft invulling aan"-link: die staan op de bron, en twee keer dezelfde
// uitgang naast elkaar leest als twee verschillende dingen. `off` dempt de
// rij: dat is de niet-uitgewerkte variant.
// De INHOUD van een voorwaarde-rij, los van de rij zelf: chips, of een
// logische voorwaarde als geneste rijen (niet als platte zin). Gedeeld door de
// voorwaardenlijst van een regel, het blok "Niet afgedwongen" en de rijen in
// het invulling-paneel — een voorwaarde leest overal hetzelfde.
function condContent(c) {
  if (c.logical && c.children && c.children.length) return constraintNode({ ...c, label: null });
  if (c.slots) return constraintChips(c);
  return h('span', { class: 'sentence', text: c.sentence || curie(c.iri) });
}

function coverageCondLine(c, { off = false, reasons = null, global = false, scope = null } = {}) {
  const li = h('li', {
    class: 'cov-cond' + (off ? ' cov-cond-off muted' : ''), title: constraintTitle(c),
  });
  li.appendChild(condContent(c));
  appendIf(li, constraintNote(c));
  // WAAROM staat deze voorwaarde hier? Twee mogelijkheden, en het model levert
  // ze aan (coverage.uncoveredReasons), zodat de weergave niet zelf hoeft af te
  // leiden wat er van deze voorwaarde geldt:
  //   not-enforced   — ongemarkeerd: zij hoort technisch te worden afgedwongen
  //                    en dat is niet gebeurd. Telt mee in de status.
  //   organisational — dpv:OrganisationalMeasure: buiten de techniek geborgd.
  //                    Een GEDEMPT merk, want er is niets blijven liggen; zij
  //                    telt niet mee in de status.
  const reason = reasons && c.iri ? reasons[c.iri] : null;
  if (reason === 'not-enforced') {
    li.appendChild(h('span', {
      class: 'cov-not-enforced', text: t('cov.notEnforced'), title: t('cov.notEnforcedTitle'),
    }));
  } else if (reason === 'organisational') {
    li.appendChild(h('span', {
      class: 'cov-organisational muted',
      text: t('cov.organisational'), title: t('cov.organisationalTitle'),
    }));
  }
  // In het PANEEL markeert een duplicaat over de hele weergave (de bron kan in
  // een andere kaart staan); in een kaart blijft de markering binnen die kaart.
  return global ? fillDuplicate(li, c.iri, scope) : refDuplicate(li, c.iri);
}

function coverageCondList(list, opts) {
  const ul = h('ul', { class: 'clean cov-conds' });
  for (const c of list) ul.appendChild(coverageCondLine(c, opts));
  return ul;
}

// --- Raderwiel: DE OPENER VAN DE TECHNISCHE VIEW ---------------------------
// Op elk element dat wordt ingevuld staat hetzelfde gedempte raderwiel, in
// dezelfde maat en vorm als de ⌕-verkenknop ernaast. Bewust een ICOON en geen
// woorden: "✓ technisch afgedwongen" op elke rij verdubbelde de rijhoogte en
// herhaalde bij elke voorwaarde dezelfde zin.
//
// KLIKKEN OPENT HET RECHTERPANEEL op dit element (besluit eigenaar, aug 2026).
// Tot deze slag sprong elke klik één stap verder DOOR HET DOCUMENT — eerst naar
// het eindpunt, later per schakel. Beide varianten lieten de pagina bij elke
// klik verspringen, en de lezer raakte zijn plek in het beleid kwijt. De keten
// hoort naast het document te lopen, niet erdoorheen; wat een klik nu doet
// staat bij fillGear en renderFill hieronder.
//
// De HULPJES hieronder blijven wel bestaan: het sprong-linkje in het paneel
// (fill-jump) gebruikt ze om de bron in het document aan te wijzen.

// Hoe lang het doel oplicht na aankomst. Zelfde orde als de ui-flash van een
// kruisverwijzing: lang genoeg om te zien waar je landde, kort genoeg om niet
// als selectie te blijven staan.
const GEAR_HL_MS = 1800;

// De KAART van één beleidsset in de weergave: het set-card/offer-group-element
// met haar IRI als data-iri. Nodig omdat het paneel naast het document staat:
// een rij in het paneel heeft geen DOM-ouder in de kaart waar zij vandaan komt,
// dus refRoot() kan de kaart niet uit de boom afleiden. De SCOPE van het paneel
// zegt het wel, en die is het enige wat "dezelfde kaart" hier kan betekenen.
function cardForScope(scope) {
  const main = el('doc-main');
  if (!main || !scope) return null;
  let gevonden = null;
  const walk = (n) => {
    for (const c of n.children || []) {
      if (gevonden) return;
      if (c.getAttribute && c.getAttribute('data-iri') === scope
        && /\b(set-card|offer-group)\b/.test(String(c.className || ''))) { gevonden = c; return; }
      walk(c);
    }
  };
  walk(main);
  return gevonden;
}

// Het doel van een stap: de eerste knoop met deze data-ref. Eerst BINNEN de
// eigen kaart — en pas daarna in de hele weergave, want een voorwaarde kan in
// een andere kaart worden afgedwongen.
//
// WAAROM DE SCOPE ERBIJ MOET (aug 2026). Eén gedeelde knoop staat op meer dan
// één plek in het document: een stelselverplichting staat op haar eigen
// koppelvlak-kaart én, via odrl:inheritFrom, in de "Geërfd van …"-vouw van elk
// beslispunt dat haar overneemt — allemaal met dezelfde data-ref. De sprong
// pakte daarvan de EERSTE in het document, en dat is de ouder-Set helemaal
// bovenaan: de lezer sprong weg uit de kaart waar hij stond, naar een rij die
// dezelfde plicht toont maar niet zijn plek is. Het paneel kent de omhullende
// beleidsset; die krijgt daarom voorrang, en openPathTo klapt de geërfd-vouw
// onderweg open. Staat de knoop niet in die kaart (een voorwaarde die elders
// wordt afgedwongen), dan valt de sprong terug op de hele weergave.
function gearTarget(fromEl, ref, scope = null) {
  const roots = [];
  const kaart = cardForScope(scope);
  if (kaart) roots.push(kaart);
  if (fromEl) {
    const eigen = refRoot(fromEl);
    if (eigen && !roots.includes(eigen)) roots.push(eigen);
  }
  const main = el('doc-main');
  if (main && !roots.includes(main)) roots.push(main);
  for (const root of roots) {
    const found = refTargets(root, ref)[0];
    if (found) return found;
  }
  return null;
}

// Aankomst: kort oplichten met dezelfde markering die bron en duplicaat delen
// (is-ref-hl). Geen eigen animatie erbij — één taal voor "dit bedoel ik".
function gearFlash(node) {
  if (!node || !node.classList) return;
  node.classList.add(REF_HL);
  node.classList.add(REF_PULSE);
  setTimeout(() => {
    if (!node.classList) return;
    node.classList.remove(REF_HL);
    node.classList.remove(REF_PULSE);
  }, GEAR_HL_MS);
}

// DE WEG NAAR DE BRON VRIJMAKEN. Elke dichte <details> boven het doel open:
// de kaart, de geërfd-vouw, de Groep-definitie, de ledenlijst, de
// conformsToPolicy-uitklap. Van buiten naar binnen, want een kind bestaat pas
// (of meet pas) als zijn ouder open is. Lazy kaartbody's krijgen meteen hun
// hook — het toggle-event vuurt in de browser pas ná deze tick, en dan zou de
// sprong op een lege kaart mikken.
function openPathTo(target) {
  const pad = [];
  for (let cur = target; cur; cur = cur.parentNode) pad.push(cur);
  pad.reverse();
  for (const n of pad) {
    if (!n.tagName || String(n.tagName).toLowerCase() !== 'details') continue;
    openDetails(n);
    if (n.odrlOpenBody) {
      try { Promise.resolve(n.odrlOpenBody()).catch(() => {}); } catch { /* de kaart meldt het zelf */ }
    }
  }
}

// DE SPRONG (het → in het paneel): de weg vrijmaken, het DOCUMENT ernaartoe
// scrollen, de bron kort laten pulsen — en het paneel gewoon open laten
// staan. Vindt de weergave de ref niet (een nog niet gerenderd stuk, of een
// kaart buiten de scope), dan valt hij terug op revealInUi, de bestaande
// route voor kruisverwijzingen.
//
// WAAROM NIET scheduleExpandScroll (de bug van aug 2026): dat rekent uit
// hoeveel er bij moet om de ONDERKANT van een zojuist uitgeklapte kaart in
// beeld te krijgen en geeft per definitie null terug zodra het doel al in
// beeld staat óf erboven ligt (expandScrollTarget: `bottom <= viewportHeight`
// -> null). Elke sprong omhoog leverde daardoor geen enkele beweging op. Een
// SPRONG stelt een andere vraag — zet dít element in beeld — en dat is
// scrollIntoView (scrollToNode), met dezelfde reduced-motion-uitzondering en
// hetzelfde nascrollen als elke andere sprong in deze weergave.
function gearGo(fromEl, ref, { scope = null } = {}) {
  // EERST DE HOVER-SPOREN WEG. De rand-pulsbalk en de markering op de bron
  // horen bij "de muis staat op deze paneelrij"; zodra je klikt is dat voorbij.
  // De mouseleave die ze normaal opruimt komt er niet altijd — de rij verdwijnt
  // onder de muis vandaan bij een herrender, of de balk hoort na de sprong bij
  // een positie die niet meer bestaat — en dan bleef de balk aan de rand staan
  // wijzen naar iets waar je net naartoe bent gesprongen.
  clearRefIndicators();
  const target = gearTarget(fromEl, ref, scope);
  if (!target) {
    Promise.resolve(revealInUi(ref, { smooth: true })).catch(() => { /* blijf staan */ });
    return;
  }
  // VOLGORDE (besluit eigenaar, aug 2026): eerst het pad openklappen, dán één
  // vloeiende scroll, en PAS bij aankomst de puls. Andersom mikt de scroll op
  // een positie die het openklappen daarna verschuift, en pulst het doel al
  // terwijl het nog buiten beeld staat.
  openPathTo(target);
  openArtFold(target);
  scrollToNode(target, { smooth: true, then: () => gearFlash(target) });
}

// De conformsToPolicy-rij is het EINDE van de keten, en het artefact staat in
// háár uitklap (artifactForm). Wie er vanuit het paneel naartoe springt, zoekt
// meestal juist dat artefact — dus klapt de sprong die vouw meteen open. Alleen
// deze ene vouw, en alleen op het doel zelf: openPathTo hierboven doet de
// vouwen erbóven.
function openArtFold(target) {
  for (const c of (target && target.children) || []) {
    if (c && c.classList && c.classList.contains('art-fold')) openDetails(c);
  }
}

// De volgende stappen van één element, GEFILTERD op de kaart waar het staat —
// dezelfde afweging als viaEntries: een gedeelde stelselplicht staat in drie
// Sets, en zonder filter zou elke kaart alle uitwerkingen van alle
// beslispunten aanbieden. Staat er in DEZE policy geen stap, dan spreken ze
// allemaal (de eigenaar-kaart van de plicht, die zelf niets uitwerkt).
function nextSteps(node, scope = null) {
  const alle = coverageNext(node).filter((x) => x && x.targetRef);
  if (!scope || !alle.length) return alle;
  const eigen = alle.filter((x) => !x.policies || !x.policies.length || x.policies.includes(scope));
  return eigen.length ? eigen : alle;
}

// Het raderwiel is geen SPRONG meer maar een OPENER (aug 2026, besluit
// eigenaar): hij zet het rechterpaneel op DIT element (zie renderFill). Tot nu
// verplaatste elke klik de pagina één stap verder, en raakte de lezer bij elke
// stap zijn plek in het document kwijt; de keten hoort in het paneel te lopen,
// naast het document in plaats van erdoorheen.
//
// KLEUR = STAND: groen-gedempt als alles is ingevuld, amber als er iets
// ontbreekt. Geen raderwiel als er niets in te vullen valt — "niet ingevuld"
// zou een oordeel zijn op een plek waar de lezer niets kan nakijken (zelfde
// afweging als bij de vervallen dekkingstags). Op een ARTEFACT staat hij
// helemaal niet meer: de keten in het paneel blijft binnen de ODRL-termen en
// eindigt bij de conformsToPolicy-rij die het artefact aanhaalt.
function fillGear(ref, { scope = null, status = 'full' } = {}) {
  if (!ref) return null;
  const hint = t('fill.gearTitle');
  // Exact dezelfde ronde knop als de ⌕-verkenknop (klasse `verken-btn`:
  // maat, rand, hover, dark-mode) — alleen een ander glyph. Twee knoppen naast
  // elkaar op één rij horen één familie te zijn.
  const btn = h('button', {
    type: 'button',
    class: 'verken-btn cov-gear cov-status ' + (status === 'partial' ? 'partial' : 'full'),
    title: hint, 'aria-label': hint, text: '\u2699',
  });
  btn.addEventListener('click', (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    fillGo(btn, ref, scope);
  });
  return btn;
}

// ÉÉN ROUTE NAAR HET PANEEL (aug 2026): het ⚙ en de dubbelklik op een rij doen
// precies hetzelfde, en kunnen dus ook niet uit elkaar gaan lopen. `from` is de
// plek waar de lezer vandaan kwam; ligt die in het paneel zelf, dan verhuist de
// rij zichtbaar naar het centrale vlak (fillFlip).
function fillGo(from, ref, scope = null) {
  closeDimMenu();
  openFill(ref, scope, { from: fillRowOf(from) });
}

// De paneelrij waar een klik vandaan komt: het ⚙ zit ín de rij, de dubbelklik
// IS de rij. Buiten het paneel — het ⚙ in het document — is er geen rij om
// vandaan te animeren; dan gaat het paneel gewoon open.
function fillRowOf(node) {
  for (let cur = node; cur; cur = cur.parentNode) {
    if (cur.classList && cur.classList.contains && cur.classList.contains('fill-row')) return cur;
  }
  return null;
}

// --- De KETEN: uitgewerkt via een voorwaarde elders --------------------------
// Een verplichting op stelselniveau ("vermeld de doelbinding") wordt door geen
// enkel artefact rechtstreeks afgedwongen — geen PDP toetst haar als losse
// regel. Wat de PDP's wél toetsen is de SCHERPERE voorwaarde op hun eigen
// regel ("doel = registratie van laadpalen"), en die voorwaarde verklaart in
// de data dat zij de uitwerking van de plicht is. Twee stappen, hetzelfde
// predicaat: bundle -> voorwaarde -> plicht (parse.js/coverage.via).
//
// RICHTING (besluit eigenaar, aug 2026). De relatie loopt van de UITWERKENDE
// VOORWAARDE naar de plicht, niet andersom: zij staat dus op de voorwaarde-rij
// ("geeft invulling aan") en in de conformsToPolicy-uitklap ("Verplichtingen
// van deze beleidsset … via voorwaarde"). In de body van de verplichting zelf
// staat niets meer, en het raderwiel op de duty-kop spreekt alleen bij
// RECHTSTREEKSE dekking: de plicht zelf wordt bij een keten immers niet
// afgedwongen, haar uitwerking wel.

// De keten-ingangen van één regel, GEFILTERD op de kaart waar hij staat.
// Een gedeelde stelselplicht staat in drie Sets; zonder filter zou elke kaart
// alle uitwerkingen van alle beslispunten opsommen. Regel: staat er in DEZE
// policy een schakel, dan spreekt alleen die; staat er geen (de eigenaar-kaart
// van de plicht, die zelf niets uitwerkt), dan spreken ze allemaal — daar is
// het totaalbeeld juist de bedoeling.
function viaEntries(rule, scope) {
  const via = (rule && rule.coverage && rule.coverage.via) || [];
  if (!scope || !via.length) return via;
  const eigen = via.filter((v) => (v.policies || []).includes(scope));
  return eigen.length ? eigen : via;
}


// Het raderwiel bij één voorwaarde-object: één stap verder in de keten — naar
// de conformsToPolicy-rij die het artefact aanhaalt dat haar afdwingt. Null
// als er geen volgende stap is (een voorwaarde die niemand uitwerkt, of een
// blanke voorwaarde: die is niet dekbaar).
function conditionGear(c, scope = null) {
  if (!c) return null;
  // Een blanke voorwaarde is niet dekbaar en zwijgt dus altijd. Enige
  // uitzondering: de rij van de technische borging, die blank mag zijn en juist
  // de spil van de keten vormt — zij is altijd ingevuld (door haar artefact).
  if (!c.iri && !c.technicalMeasure) return null;
  if (c.technicalMeasure) return fillGear(c.rowRef, { scope });
  if (!coverageNext(c).length) return null;
  return fillGear(c.iri, { scope });
}

// Alle voorwaarden die bij de regel ZELF horen — inclusief de doelbinding, die
// in het model een eigen veld heeft (parse.js/purposeConstraint) maar gewoon
// een voorwaarde is, en vaak juist het beslispunt dat als eerste wordt
// afgedwongen.
//
// DE VOLGORDE IS DIE VAN HET DOCUMENT (aug 2026): doelbinding eerst, dan de
// eigen voorwaarden, dan de refinements — precies zoals constraintsSection de
// rijen op de kaart zet. Zij stond hier andersom (de doelbinding achteraan),
// waardoor het invulling-paneel dezelfde voorwaarden in een ándere volgorde
// toonde dan de kaart ernaast. Eén volgorde, op één plek: wie de kaart leest en
// het paneel opent, ziet dezelfde rijen in dezelfde volgorde.
//
// RDF kent geen volgorde; wat de volgorde hier draagt is de bronvolgorde van de
// odrl:constraint-/odrl:refinement-tripels, en die is stabiel omdat de parser
// haar bewaart. Een expliciete sh:order op voorwaarden is dus NIET nodig om
// paneel en kaart gelijk te trekken — dat zou pas nodig zijn als een bron de
// leesvolgorde bewust wil vastleggen los van hoe zij is opgeschreven.
function ruleOwnConstraints(rule) {
  return [
    ...(rule.purposeConstraint ? [rule.purposeConstraint] : []),
    ...(rule.constraints || []), ...(rule.refinements || []),
  ];
}

// De drie getallen achter de kop van deze rij, en de kop zelf.
function coverageRuleSummary(rule, nDuties = 0) {
  const cov = rule && rule.coverage;
  if (!cov) return null;
  // IN DE VOLGORDE VAN DE KAART (aug 2026). Tot dan liep `gedekt` in de
  // volgorde van de dekkingsindex (de prov-tripels) en `ongedekt` in die van
  // cov.uncovered — twee volgordes die niets met de leesvolgorde te maken
  // hebben. Nu lopen we de eigen voorwaarden van de regel af zoals de kaart ze
  // toont en verdelen we ze onderweg, zodat het paneel dezelfde rijen in
  // dezelfde volgorde laat zien.
  const own = ruleOwnConstraints(rule);
  const isGedekt = new Set(cov.conditions.keys());
  const isOngedekt = new Set(cov.uncovered || []);
  const gedekt = [];
  const ongedekt = [];
  const gezien = new Set();
  for (const c of own) {
    if (!c || !c.iri || gezien.has(c.iri)) continue;
    if (isGedekt.has(c.iri)) { gezien.add(c.iri); gedekt.push(c); }
    else if (isOngedekt.has(c.iri)) { gezien.add(c.iri); ongedekt.push(c); }
  }
  const n = gedekt.length + ongedekt.length;
  // De kop somt op wat DEZE knoop van DEZE regel invult: de regel zelf, hoeveel
  // van haar voorwaarden, en hoeveel verplichtingen van de omhullende
  // beleidsset. Eén zin uit losse stukken, zodat een ontbrekend stuk gewoon
  // wegvalt in plaats van een aparte formulering te vragen.
  const parts = [];
  if (cov.rule.length) parts.push(t('cov.partRule'));
  if (n) parts.push(t('cov.partConds', { m: gedekt.length, n }));
  if (nDuties) parts.push(t('cov.partDuties', { n: nDuties }));
  const kop = parts.length ? t('cov.ruleHead', { parts: parts.join(', ') }) : t('cov.ruleHeadNone');
  return { cov, gedekt, ongedekt, n, kop };
}

// De SET-NIVEAU VERPLICHTINGEN die deze knoop invult en die op DEZE regel van
// toepassing zijn. Een conformsToPolicy-rij zegt "het verwerkingsverzoek moet
// voldoen aan deze bundel"; wat die bundel dan invult is niet alleen de regel
// en haar voorwaarden, maar ook de plichten die bij elke regel van de
// beleidsset gelden — rechtstreeks gedekt, of via een voorwaarde van DEZE
// regel. Zonder dit zou een bundel die de stelselplicht afdwingt daar in de
// uitklap niets over zeggen, terwijl het precies de vraag van de lezer is.
//
// RECHTSTREEKS OF VIA — DAT VERSCHIL REIST MEE (aug 2026). `direct` zegt of
// DEZE knoop de plicht zelf realiseert (prov:wasDerivedFrom van de knoop naar
// de plicht). Zo niet, dan komt zij hier alleen binnen omdat een VOORWAARDE
// van deze regel haar uitwerkt, en dan hoort de weergave die tussenstap te
// tonen — zie fillFulfils. De vlag staat hier en niet in de weergave, zodat
// "is dit een keten?" één antwoord heeft en niet uit een lege lijst hoeft te
// worden afgeleid.
function foldDuties(entries, nodeIri, scope) {
  const out = [];
  for (const { duty, from } of entries || []) {
    const direct = (duty.coveredBy || []).some((a) => a.iri === nodeIri);
    const via = viaEntries(duty, scope)
      .filter((v) => v.artefacts.some((a) => a.iri === nodeIri));
    if (!direct && !via.length) continue;
    out.push({ duty, from, direct, via: direct ? [] : via });
  }
  return out;
}


// ============================================================================
// DE TECHNISCHE VIEW: het invulling-paneel rechts
// ============================================================================
// Tot aug 2026 stond de invulling IN het document: een "geeft invulling aan"-
// link op elke voorwaarde-rij, een merk "niet uitgewerkt" ernaast,
// en een uitklap onder de conformsToPolicy-rij die opsomde wat die bundel van
// deze ene regel afdwong. Drie verschillende plekken, elk met een stukje van
// hetzelfde verhaal, en alle drie in de leesregel van iemand die alleen het
// BELEID wilde lezen.
//
// Sinds deze slag staat het verhaal op ÉÉN plek: het rechterpaneel, in
// het rechterpaneel (zie ensureInspOverlay). Het ⚙ op
// een element is de opener; het paneel toont de keten rond dat element:
//
//     ↑ Wordt ingevuld door     (wat dit element uitwerkt)
//     ── het element zelf ──    (duplicaat-rij + herkomst)
//     ↓ Geeft invulling aan     (wat dit element zelf invult)
//
// ONDER ELKAAR, niet in twee kolommen (besluit eigenaar): het paneel is
// daarvoor te smal, en van boven naar beneden leest de keten als een keten.
// DE UITWERKING BOVEN, DE GRONDSLAG ONDER (besluit eigenaar, aug 2026): de
// keten leest van TECHNISCH (boven) naar JURIDISCH (onder), dus wat dit
// element uitwerkt staat erboven en wat het invult eronder. De pijl in een
// randlabel wijst dan ook altijd naar de rijen die erbij horen.
// Elke rij in een blok is een DUPLICAAT van een rij in het document: hoveren
// markeert de bron (is-ref-hl, alleen waar zij zichtbaar is), "→" springt
// erheen, en het eigen ⚙ zet het paneel op DAT element — zo loop je de keten
// af zonder de pagina kwijt te raken.

// --- De opzoektabel ---------------------------------------------------------
// Het paneel werkt met REFS, niet met objecten: dezelfde `data-ref` waarmee een
// element in de weergave te vinden is (een IRI, of de samengestelde ref van een
// conformsToPolicy-rij — die is een blank node). Deze index maakt van zo'n ref
// het element terug. Hij wordt per render opnieuw gebouwd, uit het model.
//
// Vorm per ingang:
//   { type: 'rule' | 'condition' | 'conforms',
//     ref, rule?, constraint?, nodeIri?, duties?, kind, scopes: [] }
// `scopes` is de HERKOMST: een gedeelde stelselplicht staat in meer beleidssets
// en dat mag de kop van het paneel gewoon zeggen.
//
// GEEN ARTEFACT-INGANG (besluit eigenaar, aug 2026): het paneel gaat over de
// ODRL-termen. Er is dus ook geen route meer die het paneel op een Cedar- of
// Rego-artefact zet, en de per-beleidsset-groepering die die kaart voedde is
// vervallen — het artefact staat in de uitklap van de conformsToPolicy-rij.
function buildFillIndex(model) {
  const ix = new Map();
  if (!model) return ix;
  const add = (ref, desc) => {
    if (!ref) return;
    const cur = ix.get(ref);
    if (!cur) { ix.set(ref, desc); return; }
    for (const sc of desc.scopes || []) {
      if (!cur.scopes.some((x) => x.iri === sc.iri)) cur.scopes.push(sc);
    }
  };
  for (const pol of [...model.offers, ...model.agreements, ...model.sets]) {
    const scope = { iri: pol.anon ? null : pol.iri, title: pol.title || curie(pol.iri) };
    const duties = policyLevelDuties(pol);
    const walk = (rule, kind, depth = 0) => {
      if (!rule) return;
      add(rule.iri, { type: 'rule', ref: rule.iri, rule, kind, scopes: [scope] });
      for (const c of ruleOwnConstraints(rule)) {
        if (!c) continue;
        if (c.technicalMeasure && c.rowRef) {
          add(c.rowRef, {
            type: 'conforms', ref: c.rowRef, constraint: c, rule, kind,
            nodeIri: c.conformsTo, duties, scopes: [scope],
          });
        } else if (c.iri) {
          add(c.iri, { type: 'condition', ref: c.iri, constraint: c, rule, kind, scopes: [scope] });
        }
      }
      if (depth < 3) for (const n of rule.duties || []) walk(n, 'duty', depth + 1);
    };
    for (const d of pol.obligations || []) walk(d, 'duty');
    for (const pm of pol.permissions || []) walk(pm, ruleKind(pm, false));
    for (const pb of pol.prohibitions || []) walk(pb, 'verbod');
  }
  return ix;
}

// --- De twee richtingen -----------------------------------------------------
// De functienamen zeggen WAT de richting is, niet waar zij in het paneel staat:
// de STAND is een weergavebesluit (zie renderFill) en is al een keer gedraaid.
//
// WORDT INGEVULD DOOR (↑, boven het centrale vlak): wat werkt dit element uit?
// Precies de stappen die het model al kent (parse.js/coverageNext) — de
// weergave verzint hier niets bij.
//   verplichting -> de voorwaarde(n) die haar invullen
//   voorwaarde   -> de conformsToPolicy-rij die haar afdwingt
//   regel        -> haar eigen conformsToPolicy-rij
//   conformsTo   -> niets (einde van de keten): het artefact is geen ketenknoop
//                   meer, het staat in de uitklap van deze rij
function fillFulfilledBy(desc, scope) {
  if (!desc) return [];
  if (desc.type === 'conforms') return [];
  if (desc.type === 'condition') {
    return [{ title: null, refs: coverageNext(desc.constraint).map((x) => x.targetRef).filter(Boolean) }];
  }
  const alle = coverageNext(desc.rule).filter((x) => x && x.targetRef);
  if (!alle.length) return [];
  const eigen = scope ? alle.filter((x) => (x.policies || []).includes(scope)) : [];
  if (eigen.length) return [{ title: null, refs: eigen.map((x) => x.targetRef) }];
  // GEEN SCHAKEL IN DEZE POLICY — dat is de kaart waar de plicht is GEDEFINIEERD
  // (de stelselset): daar werkt zij zelf niets uit, maar elders wel. Dan tonen
  // we alles, en dan MOET de herkomst erbij: vier keer dezelfde voorwaarde
  // onder elkaar zonder te zeggen uit welke beleidsset zij komt, was precies
  // de klacht — je zag de relatie wel, maar niet waarheen.
  const perSet = new Map();
  for (const x of alle) {
    for (const pol of (x.policies || []).length ? x.policies : [null]) {
      const titel = policyTitle(pol);
      if (!perSet.has(titel)) perSet.set(titel, []);
      const refs = perSet.get(titel);
      if (!refs.includes(x.targetRef)) refs.push(x.targetRef);
    }
  }
  return [...perSet].map(([title, refs]) => ({ title, refs }));
}

// De titel van een policy uit het model, voor de subkoppen in het paneel.
function policyTitle(iri) {
  if (!iri || !state.model) return null;
  const pol = byIri([...state.model.offers, ...state.model.agreements, ...state.model.sets], iri);
  return (pol && pol.title) || curie(iri) || null;
}

// De HERKOMST van de stelselplichten van één beleidsset: plicht-IRI -> de
// ouderpolicy waaruit zij is overgenomen (null als zij van de set zelf is).
// Zonder dit staat een geërfde plicht in het paneel als een plicht van deze
// set, terwijl zij op de koppelvlak-set hoort.
function dutyOrigins(scopeIri) {
  const map = new Map();
  if (!scopeIri || !state.model) return map;
  const pol = byIri([...state.model.offers, ...state.model.agreements, ...state.model.sets], scopeIri);
  for (const { duty, from } of policyLevelDuties(pol)) {
    if (duty && duty.iri && from) map.set(duty.iri, from);
  }
  return map;
}

// GEEFT INVULLING AAN (↓, onder het centrale vlak): wat vult dit element zelf
// in? De omgekeerde richting, als een lijst blokken ({ title, refs }) zodat het
// artefact zijn uitwerking per beleidsset kan groeperen.
//   voorwaarde   -> de verplichting/regel die zij uitwerkt (coverage.via)
//   conformsTo   -> de regel, haar afgedwongen voorwaarden en de
//                   stelselverplichtingen die deze knoop invult
//   regel        -> niets: een regel vult zelf niets in, zij wordt ingevuld
function fillFulfils(desc, scope) {
  if (!desc) return [];
  if (desc.type === 'condition') {
    const refs = (desc.constraint.fulfils || []).map((r) => r.iri).filter(Boolean);
    // De plicht die deze voorwaarde uitwerkt staat vaak op de OUDERSET (een
    // stelselplicht via odrl:inheritFrom). Dat hoort op de rij te staan: zonder
    // die herkomst leest zij als een plicht van deze set.
    const van = dutyOrigins(scope);
    const notes = {};
    for (const r of refs) if (van.has(r)) notes[r] = t('cov.dutyFrom', { parent: van.get(r) });
    return [{ title: null, refs, notes }];
  }
  if (desc.type === 'conforms') {
    const refs = [];
    const sum = coverageRuleSummary(desc.rule, 0);
    // DE RIJ LEEST HAAR EIGEN LINKS (aug 2026). Draagt het anker zelf
    // prov:wasDerivedFrom — de Vlierdam-vorm, waarin de realisatielinks in de
    // policy staan en niet bij het artefact — dan zegt `realises` letterlijk wat
    // DEZE rij uitwerkt, en dat is wat hier hoort te staan. Ontbreekt het
    // lijstje (een blank anker, of de oudere vorm waarin het ARTEFACT de
    // afzender is: Breda, voorbeeld 7), dan blijft de afleiding uit de dekking
    // staan — die datasets horen te blijven werken.
    const realises = desc.constraint && desc.constraint.realises;
    const noemt = (iri) => !realises || realises.includes(iri);
    if (sum && sum.cov.rule.length && desc.rule.iri && noemt(desc.rule.iri)) refs.push(desc.rule.iri);
    if (sum) for (const c of sum.gedekt) {
      if (c.iri && noemt(c.iri) && !refs.includes(c.iri)) refs.push(c.iri);
    }
    const eigen = scope || (desc.scopes[0] || {}).iri || null;
    const blokken = [{ title: null, refs }];
    // DE STELSELPLICHTEN APART, met hun herkomst. Ze horen niet bij de regel en
    // haar eigen voorwaarden: ze gelden voor élke regel van de beleidsset, en
    // deze knoop vult ze soms rechtstreeks in en soms VIA een voorwaarde van
    // déze regel. Dat verschil ("via voorwaarde ‘…’") is de hele reden dat de
    // keten leesbaar is; in één platte lijst viel het weg.
    const plichten = [];
    const notes = {};
    for (const { duty, from, via, direct } of foldDuties(desc.duties, desc.nodeIri, eigen)) {
      if (!duty.iri || plichten.includes(duty.iri)) continue;
      plichten.push(duty.iri);
      const delen = [];
      if (from) delen.push(t('cov.dutyFrom', { parent: from }));
      // DE TUSSENSTAP IS NIET OPTIONEEL (besluit eigenaar, aug 2026). Een
      // plicht die deze knoop alleen VIA een voorwaarde invult, mag nooit als
      // kale rij tussen de rechtstreekse invullingen staan: dan leest zij als
      // een realisatieclaim die in de data niet staat \u2014 precies de klacht
      // "het anker lijkt de doelbindingsplicht zelf te realiseren". Ontdubbelen
      // hoort erbij: dezelfde voorwaarde kan via meer artefacten schakelen, en
      // dan stond zij drie keer in dezelfde notitie. En kan de tussenstap niet
      // bij naam worden genoemd (een voorwaarde zonder label, zonder grootheid
      // en zonder zin), dan zegt de rij nog steeds D\u00c1T er een stap tussen zit:
      // liever een naamloze tussenstap dan een stilzwijgend platgeslagen keten.
      if (!direct) {
        const namen = [...new Set(via.map((v) => condWordOf(v.constraint)).filter(Boolean))];
        for (const naam of namen) delen.push(t('cov.dutyViaCond', { cond: naam }));
        if (!namen.length) delen.push(t('cov.dutyViaCondAnon'));
      }
      if (delen.length) notes[duty.iri] = delen.join(' \u00b7 ');
    }
    if (plichten.length) blokken.push({ title: t('fill.duties'), refs: plichten, notes });
    return blokken;
  }
  return [];
}

// De naam van een voorwaarde in één woord, voor de "via voorwaarde ‘…’"-notitie:
// haar rdfs:label, anders de grootheid waar zij over gaat.
function condWordOf(c) {
  if (!c) return null;
  if (c.label) return c.label;
  const slot = (c.slots || [])[0];
  return (slot && (slot.label || slot.text)) || c.sentence || null;
}

// --- Duplicaat-rijen in het paneel ------------------------------------------
// Zelfde afspraak als binnen een kaart (refDuplicate): bron en duplicaat delen
// een `data-ref`, en hoveren over het duplicaat markeert de bron. Verschil: het
// paneel staat BUITEN de kaarten, dus het zoekgebied is de hele weergave. Staat
// de bron in een dichte vouw of buiten de scope, dan licht er niets op — er
// wordt bewust niets opengeklapt bij een muisbeweging.
// AANWIJZEN WAT NIET ZICHTBAAR IS (besluit eigenaar, aug 2026). "Staat de bron
// in een dichte vouw, dan licht er niets op" was eerlijk maar onbruikbaar: de
// lezer kreeg geen enkel signaal en dacht dat de rij nergens vandaan kwam. De
// regel is nu: hoveren wijst ALTIJD iets aan, zonder ooit zelf te scrollen of
// open te klappen (dat blijft aan de → -knop).
//   * de bron is zichtbaar          -> gewone markering op de bron zelf;
//   * de bron zit in een dichte vouw -> de KOP van de buitenste dichte vouw
//     (kaartkop, "Geërfd van …"-rij, ledenlijst) krijgt dezelfde markering
//     plus een gestippeld omhulsel-accent: "hij zit hierin";
//   * het aan te wijzen element staat buiten het scrollvenster -> een
//     pulserende accentbalk aan de boven- of onderrand van het venster:
//     "hij staat daarboven/daaronder".
// De laatste twee gevallen combineren: een dicht omhulsel dat zelf buiten
// beeld staat levert de omhulsel-markering én de randindicator.
const REF_BOX = 'is-ref-box';
// Korte puls bij AANKOMST na een →-sprong (zie gearFlash).
const REF_PULSE = 'is-ref-pulse';

// De buitenste DICHTE <details> boven een knoop: daarbinnen is niets zichtbaar
// behalve de <summary> zelf. Teruggegeven wordt de kop (summary) van die vouw
// — dat is de rij die de lezer wél ziet. null als de knoop gewoon zichtbaar is.
function collapsedWrapper(node) {
  const tag = (n) => String((n && n.tagName) || '').toLowerCase();
  let box = null;
  for (let cur = node; cur && cur.parentNode; cur = cur.parentNode) {
    const p = cur.parentNode;
    if (tag(p) === 'details' && !p.open && tag(cur) !== 'summary') box = p;
  }
  if (!box) return null;
  // Let op: in de browser is `children` een HTMLCollection (geen array-methoden
  // zoals find) — de teststub levert wél een array. Dus gewoon doorlopen.
  for (const c of box.children || []) if (tag(c) === 'summary') return c;
  return box;
}

// Staat dit element in het scrollvenster, of erboven/eronder? Zonder
// getBoundingClientRect (de teststub levert hem alleen waar een test hem zet)
// gaan we uit van 'in': liever geen indicator dan een verkeerde.
function anchorPosition(node) {
  if (!node || typeof node.getBoundingClientRect !== 'function') return 'in';
  const r = node.getBoundingClientRect();
  const hoogte = (typeof window !== 'undefined' && window.innerHeight) || 0;
  if (!r || !hoogte) return 'in';
  if (r.bottom <= 0) return 'above';
  if (r.top >= hoogte) return 'below';
  return 'in';
}

// Wat er voor deze ref aangewezen moet worden:
//   { element, exact: bron zelf of omhulsel, position: 'in'|'above'|'below' }
// Van meer bronnen met dezelfde ref wint een ZICHTBARE: hetzelfde element in
// een open kaart is een betere aanwijzing dan hetzelfde element in een dichte.
// `scope`: dezelfde voorkeursregel als gearTarget — van meer voorkomens van
// dezelfde gedeelde knoop wint die in de kaart van de beleidsset waar het
// paneel op staat. Zonder dat wees de hover een andere rij aan dan de klik
// erna, en dat is precies wat een aanwijzing onbruikbaar maakt.
function visibleAnchorFor(ref, scope = null) {
  const main = el('doc-main');
  if (!main || !ref) return null;
  const kaart = cardForScope(scope);
  const eigen = kaart ? refTargets(kaart, ref) : [];
  const nodes = eigen.length ? eigen : refTargets(main, ref);
  if (!nodes.length) return null;
  const vrij = nodes.find((n) => !collapsedWrapper(n));
  const node = vrij || nodes[0];
  const box = vrij ? null : collapsedWrapper(node);
  const element = box || node;
  return { element, exact: !box, position: anchorPosition(element) };
}

// De randindicator: één vaste balk onder in of boven aan het venster, met een
// pijltje. Hij pulst een paar keer en blijft dan staan zolang de muis op de
// rij staat; bij prefers-reduced-motion staat hij meteen stil (zie doc.css).
let edgeEl = null;
function ensureEdgeHint() {
  if (edgeEl) return edgeEl;
  if (typeof document === 'undefined' || !document.body) return null;
  edgeEl = h('div', { class: 'ref-edge', 'aria-hidden': 'true' },
    [h('span', { class: 'ref-edge-arrow' })]);
  edgeEl.hidden = true;
  document.body.appendChild(edgeEl);
  return edgeEl;
}

function edgeHint(pos) {
  const n = ensureEdgeHint();
  if (!n) return;
  if (!pos) { n.hidden = true; n.className = 'ref-edge'; return; }
  // hidden -> zichtbaar (display: none -> block) herstart de puls-animatie.
  n.hidden = true;
  n.className = 'ref-edge ' + (pos === 'above' ? 'edge-top' : 'edge-bottom');
  const pijl = (n.children || [])[0];
  if (pijl) pijl.textContent = pos === 'above' ? '\u25B2' : '\u25BC';
  n.hidden = false;
}

// Wat er nú opgelicht is — precies terugdraaien is nodig omdat de markering
// op een OMHULSEL kan staan dat de ref zelf niet draagt.
let fillHl = [];

// ALLE HOVER-SPOREN WEG: de markering op de bron én de rand-pulsbalk. Eigen
// functie omdat niet alleen mouseleave hem nodig heeft: een SPRONG ruimt ze op
// vóór hij vertrekt (zie gearGo), en het paneel doet het bij elke herrender —
// beide gevallen waarin de mouseleave nooit komt omdat de rij onder de muis
// vandaan verdwijnt.
function clearRefIndicators() {
  for (const n of fillHl) {
    if (n && n.classList) { n.classList.remove(REF_HL); n.classList.remove(REF_BOX); }
  }
  fillHl = [];
  edgeHint(null);
}

function fillHighlight(ref, aan, scope = null) {
  clearRefIndicators();
  if (!aan) return;
  const anchor = visibleAnchorFor(ref, scope);
  if (!anchor) return;
  if (anchor.exact) {
    // Alle zichtbare voorkomens van de bron, zoals voorheen — maar binnen de
    // kaart van de scope als de knoop daar staat (zie visibleAnchorFor).
    const root = cardForScope(scope) || el('doc-main');
    const in_scope = refTargets(root, ref);
    for (const n of (in_scope.length ? in_scope : refTargets(el('doc-main'), ref))) {
      if (collapsedWrapper(n)) continue;
      n.classList.add(REF_HL);
      fillHl.push(n);
    }
  } else {
    anchor.element.classList.add(REF_HL);
    anchor.element.classList.add(REF_BOX);
    fillHl.push(anchor.element);
  }
  if (anchor.position !== 'in') edgeHint(anchor.position);
}

function fillDuplicate(node, ref, scope = null) {
  if (!node || !ref) return node;
  node.setAttribute('data-ref', ref);
  node.setAttribute('tabindex', '0');
  const aan = () => fillHighlight(ref, true, scope);
  const uit = () => fillHighlight(ref, false, scope);
  node.addEventListener('mouseenter', aan);
  node.addEventListener('mouseleave', uit);
  node.addEventListener('focusin', aan);
  node.addEventListener('focusout', uit);
  return node;
}

// De naam van een regel zoals haar eigen rij hem draagt: eigen titel, anders
// het actie-label (bij een verplichting is `action` een string, bij een
// toestemming een object).
function fillRuleTitle(rule, kind) {
  if (!rule) return '';
  const act = rule.action;
  const actWord = (act && typeof act === 'object') ? act.label : act;
  return rule.title || rule.label || actWord
    || t(kind === 'duty' ? 'title.duty' : 'title.permission');
}

function fillStatus(desc) {
  if (desc && desc.type === 'rule') {
    const cov = desc.rule && desc.rule.coverage;
    return cov && cov.status === 'partial' ? 'partial' : 'full';
  }
  return 'full';
}

// Eén rij in een blok: de duplicaat-render van het element, plus de twee
// uitgangen (→ spring erheen in de weergave, ⚙ zet het paneel erop). De
// HUIDIGE rij — het element waar het paneel op staat — draagt die uitgangen
// niet: springen naar jezelf en het paneel op jezelf zetten doen niets.
function fillRow(ref, { scope = null, current = false, note = null } = {}) {
  const desc = state.fillIndex && state.fillIndex.get(ref);
  const li = h('li', { class: 'fill-row' + (current ? ' is-current' : '') });
  // INHOUD LINKS, UITGANGEN RECHTS. De inhoud is een eigen vak dat mag
  // afbreken (chips van een lange voorwaarde); de twee knoppen staan in een
  // vak dat dat niet doet — anders zakt het raderwiel bij elke lange rij naar
  // een eigen regel en verliest de lijst haar kolom.
  const inhoud = h('span', { class: 'fill-content' });
  li.appendChild(inhoud);
  if (!desc) {
    // Een ref die niet in de index zit: eerlijk tonen wat we weten, geen lege
    // rij en geen verzonnen naam.
    inhoud.appendChild(h('span', { class: 'muted', text: curie(ref) || ref }));
    return li;
  }
  if (desc.type === 'rule') {
    const kind = desc.kind || 'toestemming';
    inhoud.appendChild(ruleBadge(kind));
    inhoud.appendChild(h('span', { class: 'op-name', text: fillRuleTitle(desc.rule, kind) }));
  } else if (desc.type === 'condition') {
    inhoud.appendChild(condContent(desc.constraint));
    appendIf(inhoud, constraintNote(desc.constraint));
    li.setAttribute('title', constraintTitle(desc.constraint) || '');
  } else if (desc.type === 'conforms') {
    // Dezelfde chip-rij als in het document — inclusief de naam van het
    // artefact als rechterwaarde. Dat is meteen de reden dat het artefact geen
    // eigen ketenknoop meer is: zijn naam staat hier al.
    inhoud.appendChild(conformsChips(desc.constraint));
  }
  // De HERKOMST-notitie ("overgenomen van …", "via voorwaarde ‘…’"): klein en
  // gedempt ónder de inhoud, niet ernaast — de rij is al vol.
  if (note) inhoud.appendChild(h('span', { class: 'fill-note muted', text: note }));
  if (!current) {
    const acts = h('span', { class: 'fill-acts' });
    const jump = h('button', {
      type: 'button', class: 'fill-jump',
      title: t('fill.jump'), 'aria-label': t('fill.jump'), text: '\u2192',
    });
    jump.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();
      gearGo(null, ref, { scope });
    });
    acts.appendChild(jump);
    // ⌕ NAAST → EN ⚙ (aug 2026): dezelfde drie uitgangen als een rij in het
    // document. Het ⌕ is de enige weg naar de graaf (de verkenner-stand van
    // deze pagina) — dus moet hij op elke rij staan, ook op het
    // centrale vlak hieronder.
    appendIf(acts, verkenBtn(fillVerkenTarget(desc)));
    appendIf(acts, fillGear(ref, { scope, status: fillStatus(desc) }));
    li.appendChild(acts);
    fillRowClicks(li, ref, scope, desc);
  } else {
    // HET CENTRALE VLAK: geen → en geen ⚙ (naar jezelf springen en het paneel
    // op jezelf zetten doen niets), maar wél het ⌕ — "verken dit element" is
    // hier zinnig, en het is de enige route naar de RDF-verkenner. Een
    // dubbelklik doet hier niets: hercentreren op jezelf is een no-op.
    const acts = h('span', { class: 'fill-acts' });
    const verken = verkenBtn(fillVerkenTarget(desc));
    if (verken) { acts.appendChild(verken); li.appendChild(acts); }
  }
  // titleAsTip ALS LAATSTE: hij hangt eigen hover-listeners op de rij, en de
  // markering van bron <-> duplicaat (fillDuplicate) hoort de eerste te zijn
  // die op een mouseenter reageert.
  return titleAsTip(fillDuplicate(li, ref, scope));
}

// De knoop waar de ⌕ van een paneelrij naartoe gaat. Een voorwaarde mag blank
// zijn (de technische borging is dat vaak): dan de TERM, niet de IRI.
function fillVerkenTarget(desc) {
  if (!desc) return null;
  if (desc.type === 'rule') return (desc.rule && (desc.rule.iri || desc.rule.term)) || null;
  const c = desc.constraint;
  return (c && (c.term || c.iri)) || null;
}

// KLIKKEN OP EEN PANEELRIJ (besluit eigenaar, aug 2026):
//   ENKELKLIK  = het → : verzet het DOCUMENT naar dit element; het paneel
//                blijft staan waar het staat;
//   DUBBELKLIK = het ⚙ : verzet het PANEEL naar dit element (hercentreren).
// Twee keer dezelfde beweging, één keer in het document en één keer in het
// paneel. Een dubbelklik haalt je dus nooit uit de invulling weg; de ruwe
// triples zijn een aparte pagina, en die stap zet je bewust met het ⌕. Tot
// aug 2026 opende de dubbelklik een graaf-inspecteur in hetzelfde paneel, en
// dan stond je na een gebaar dat "ga hierheen" bedoelde ineens in iets
// anders, met de keten kwijt.
//
// SELECTIE WINT, MAAR ALLEEN ALS ZIJ ER AL LAG. Een dubbelklik op een woord
// selecteert dat woord — dus "is er een selectie?" op het moment van de
// dubbelklik zou de navigatie altijd afketsen. Daarom kijken we, net als
// summaryEl hierboven, naar de stand bij de EERSTE mousedown: lag er toen al
// een selectie in deze rij, dan was de lezer aan het slepen en gebeurt er
// niets; anders navigeren we en ruimen we het per ongeluk geselecteerde woord
// meteen op.
function fillRowClicks(li, ref, scope, desc) {
  let selAtPress = false;
  li.addEventListener('mousedown', (e) => {
    if (((e && e.detail) || 1) <= 1) selAtPress = selectionWithin(li);
  });
  li.addEventListener('click', (e) => {
    if (isButtonTarget(e)) return;      // de knop heeft zijn eigen klik al gedaan
    if (selectionWithin(li)) return;    // de lezer is tekst aan het selecteren
    // DE TWEEDE KLIK VAN EEN DUBBELKLIK SPRINGT NIET NÓG EENS. Hij komt hier
    // binnen met detail 2, en zonder deze regel scrolde het document twee keer
    // achter elkaar terwijl de lezer een dubbelklik-gebaar maakte — de
    // "verrassingssprong". De eerste klik heeft zijn werk al gedaan.
    if (((e && e.detail) || 1) > 1) return;
    if (e && e.preventDefault) e.preventDefault();
    gearGo(null, ref, { scope });
  });
  panelDblclickOn(li, () => fillGo(li, ref, scope), () => selAtPress,
    () => { selAtPress = false; });
}

// DE AFSPRAAK, IN ÉÉN REGEL: in het Invulling-paneel is enkelklik op een rij
// = → (het document gaat erheen, het paneel blijft staan) en dubbelklik = ⚙
// (het paneel gaat erheen). Beide blijven binnen de modus van het paneel;
// naast een rij — randlabel, herkomst-regel, witruimte, het centrale vlak —
// doet een dubbelklik NIETS, want er is dan geen element om heen te gaan.
// Knoppen houden hun eigen klik, en het ⌕ is de enige weg naar de ruwe
// triples (de verkenner-stand van deze pagina).
//
// WAT ER MIS WAS. De dubbelklik opende een graaf-inspecteur in hetzelfde
// paneel: één gebaar dat "ga hierheen" bedoelt, wisselde het hele paneel van
// soort. Erger nog: dat gold ook voor het centrale vlak en (via een
// gedelegeerde luisteraar op de paneelbody) voor alles eromheen, dus je kon de
// invulling-weergave kwijtraken door naast een rij te dubbelklikken. Alles
// daarvan is weg; wie de graaf in wil, klikt het ⌕ van de rij (of van het
// centrale vlak, dat er zelf één draagt).
function panelDblclickOn(node, actie, selAtPress, resetSel) {
  node.addEventListener('dblclick', (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    if (isButtonTarget(e)) return;
    if (selAtPress && selAtPress()) { if (resetSel) resetSel(); return; }
    clearSelection();
    actie();
  });
}

// Kwam de dubbelklik op een van de knoppen in de rij terecht? Die hebben hun
// eigen klik al afgehandeld (twee keer dezelfde openFill is onschuldig, maar
// het → zou dan óók nog eens verzetten).
function isButtonTarget(e) {
  for (let cur = e && e.target; cur; cur = cur.parentNode) {
    if (String(cur.tagName || '').toLowerCase() === 'button') return true;
  }
  return false;
}

// Het woord dat de dubbelklik zelf selecteerde weer loslaten: anders blijft er
// een blauw blokje achter in een paneel dat intussen ergens anders over gaat.
function clearSelection() {
  const sel = (typeof window !== 'undefined' && window.getSelection)
    ? window.getSelection() : null;
  if (sel && typeof sel.removeAllRanges === 'function') sel.removeAllRanges();
}

// Alleen de blokken met inhoud tellen: een leeg ↑ of ↓ wordt niet gerenderd
// (zie renderFill), dus filteren we hier één keer voor beide.
function fillFilled(blocks) {
  return (blocks || []).filter((b) => b && b.refs && b.refs.length);
}

// Eén blok (↑ of ↓): de rijen. De KOP van het blok staat sinds aug 2026 niet
// meer hier maar op de rand van het grijze vlak van het centrale element (zie
// renderFill) — zo markeert hij de grens tussen "wat dit invullen" (erboven)
// en "wat dit invult" (eronder).
function fillBlock(blocks, { scope = null, cls = '' } = {}) {
  const box = h('div', { class: ('fill-block ' + cls).trim() });
  for (const b of blocks || []) {
    if (b.title) box.appendChild(h('p', { class: 'fill-subhead muted', text: b.title }));
    const ul = h('ul', { class: 'clean fill-list' });
    for (const r of b.refs) ul.appendChild(fillRow(r, { scope, note: (b.notes || {})[r] || null }));
    box.appendChild(ul);
  }
  return box;
}

// "Niet afgedwongen", onder de twee blokken: de benoemde voorwaarden van deze
// regel die geen enkel artefact uitwerkt, met de tweedeling die het model
// meelevert (ongemarkeerd -> hier is iets blijven liggen; organisatorisch
// geborgd -> er valt niets uit te werken en de rij blijft gedempt). Eerlijke
// leegte, geen bevinding: organisatorisch geborgd is een geldige stand van zaken.
function fillNotEnforced(desc, scope = null) {
  const rule = desc && (desc.type === 'rule' || desc.type === 'conforms') ? desc.rule : null;
  if (!rule) return null;
  const sum = coverageRuleSummary(rule, 0);
  if (!sum || !sum.ongedekt.length) return null;
  const box = h('div', { class: 'fill-block fill-off' });
  box.appendChild(h('p', { class: 'fill-head', text: t('cov.notEnforcedHead') }));
  box.appendChild(coverageCondList(sum.ongedekt, {
    off: true, reasons: sum.cov.uncoveredReasons || {}, global: true, scope,
  }));
  return box;
}

// De inhoud van het paneel in de invulling-modus. `fromRect` is de plek waar de
// gekozen rij stónd (zie fillFlip): het paneel rendert opnieuw, maar dat ene
// element hoort zichtbaar te blijven bestaan.
function renderFill(container, ref, scope, { fromRect = null } = {}) {
  // Het paneel bouwt zichzelf opnieuw op: elke rij waar de muis op stond
  // verdwijnt, dus haar mouseleave komt nooit. Zonder dit bleven de markering
  // op de bron en de rand-pulsbalk staan wijzen naar een rij die er niet meer
  // is (zie clearRefIndicators).
  clearRefIndicators();
  container.innerHTML = '';
  const desc = state.fillIndex && state.fillIndex.get(ref);
  if (!desc) {
    container.appendChild(h('p', { class: 'insp-none muted', text: t('fill.unknown') }));
    return;
  }
  const eigen = scope || (desc.scopes && desc.scopes[0] && desc.scopes[0].iri) || null;
  const box = h('div', { class: 'fill' });
  // VOLGORDE (besluit eigenaar, aug 2026): boven het centrale vlak staat de
  // UITWERKING ("↑ Wordt ingevuld door"), eronder de GRONDSLAG ("↓ Geeft
  // invulling aan"). Zo leest de keten van boven naar beneden van technisch
  // naar juridisch, met het element waar je staat op zijn plek daartussen.
  // Eerder stond het andersom; wat blijft is dat de pijl in een randlabel wijst
  // naar de kant waar zijn rijen staan.
  //
  // HET CENTRALE ELEMENT ALS VLAK (besluit eigenaar, aug 2026). Het stond
  // tussen de andere rijen als "gewoon nog een rij", en dan is niet te zien
  // waar het paneel eigenlijk op staat. Nu is het een grijs vlak over de VOLLE
  // breedte van het paneel (randloos, van paneelrand tot paneelrand), met de
  // twee bloklabels ÓP de boven- en onderrand ervan: zo is het label meteen de
  // grens tussen wat erboven staat (wat dit element invullen) en wat eronder
  // staat (wat dit element invult). Een apart kopje "Dit element" is daarmee
  // overbodig — het vlak zegt het zelf.
  //
  // EEN LEEG BLOK VALT WEG, LABEL EN AL (besluit eigenaar, aug 2026). Er stond
  // "— einde van de keten" als lege-staat, met het randlabel er nog boven: twee
  // regels om te zeggen dat er niets is. Nu volgt de STAND van het centrale
  // vlak de keten zelf — geen ↑ dan staat het bovenaan, geen ↓ dan sluit het de
  // inhoud af — en dat is precies waar het element in de keten zit.
  const boven = fillFilled(fillFulfilledBy(desc, eigen));
  const onder = fillFilled(fillFulfils(desc, eigen));
  let bovenBlok = null;
  if (boven.length) {
    bovenBlok = fillBlock(boven, { scope: eigen, cls: 'fill-up' });
    box.appendChild(bovenBlok);
  }
  const kop = h('div', { class: 'fill-cur' });
  if (boven.length) {
    kop.appendChild(foldEdge(t('fill.up'), bovenBlok, 'fill', 'up', 'fill-edge-up'));
  }
  const curRow = fillRow(ref, { scope: eigen, current: true });
  kop.appendChild(h('ul', { class: 'clean fill-list' }, [curRow]));
  const herkomst = (desc.scopes || []).map((sc) => sc.title).filter(Boolean);
  if (herkomst.length) {
    kop.appendChild(h('p', {
      class: 'fill-origin muted', text: t('fill.origin', { sets: herkomst.join('; ') }),
    }));
  }
  let onderBlok = null;
  if (onder.length) onderBlok = fillBlock(onder, { scope: eigen, cls: 'fill-down' });
  if (onder.length) {
    kop.appendChild(foldEdge(t('fill.down'), onderBlok, 'fill', 'down', 'fill-edge-down'));
  }
  box.appendChild(kop);
  if (onderBlok) box.appendChild(onderBlok);
  appendIf(box, fillNotEnforced(desc, eigen));
  container.appendChild(box);
  // Doorlopen van de keten (→ of ⚙): het NIEUWE centrale element pulst kort,
  // zodat je ziet dat het paneel is verzet — het staat immers stil naast een
  // document dat niet beweegt. Kwam de lezer uit een rij in dit paneel, dan
  // schuift die rij eerst naar haar nieuwe plek en pulst daarna pas: eerst
  // "dit is hetzelfde element", dan "en hier staat het nu".
  if (fillFlip(curRow, fromRect)) setTimeout(() => gearFlashPanel(kop), FLIP_MS);
  else gearFlashPanel(kop);
}

// DE OVERGANG (besluit eigenaar, aug 2026). Zonder animatie is een verzetting
// een harde wissel: het hele paneel rendert opnieuw en de lezer moet zelf
// geloven dat de rij die hij aanwees hetzelfde element is als het vlak dat er
// nu staat. FLIP lost dat op met de goedkoopste beweging die er is — meet waar
// de rij stond (vóór de render) en waar zij nu staat, zet haar met een
// transform terug op haar oude plek en laat die transform in FLIP_MS naar nul
// lopen. Geen layout-animatie, dus geen gehannes met de rest van het paneel.
//
// Geeft terug of er echt iets beweegt: bij prefers-reduced-motion, zonder
// meetbare rechthoeken (de headless stub) of bij nul verplaatsing gebeurt er
// niets en pulst het vlak meteen.
const FLIP_MS = 200;
function fillFlip(node, fromRect) {
  if (!node || !node.style || !fromRect || prefersReducedMotion()) return false;
  const naar = nodeRect(node);
  if (!naar) return false;
  const dx = fromRect.left - naar.left;
  const dy = fromRect.top - naar.top;
  if (!dx && !dy) return false;
  node.style.transition = 'none';
  node.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
  const los = () => {
    node.style.transition = 'transform ' + FLIP_MS + 'ms ease-out';
    node.style.transform = 'translate(0, 0)';
    setTimeout(() => {
      if (!node.style) return;
      node.style.transition = '';
      node.style.transform = '';
    }, FLIP_MS + 60);
  };
  // Twee frames: één om de beginstand te laten landen, één om ervan weg te
  // animeren. In één frame ziet de browser alleen de eindstand.
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => requestAnimationFrame(los));
  } else setTimeout(los, 16);
  return true;
}

// De plek van een node op het scherm, of null als er niets te meten valt (de
// headless stub kent geen layout).
function nodeRect(node) {
  if (!node || typeof node.getBoundingClientRect !== 'function') return null;
  try {
    const r = node.getBoundingClientRect();
    return r && (r.width || r.height) ? r : null;
  } catch { return null; }
}

// Dezelfde puls als bij aankomst in het document, maar op het centrale vlak van
// het paneel. Aparte functie omdat het vlak geen is-ref-hl hoort te krijgen:
// die markering betekent "dit is de bron in het document".
function gearFlashPanel(node) {
  if (!node || !node.classList) return;
  node.classList.add(REF_PULSE);
  setTimeout(() => { if (node.classList) node.classList.remove(REF_PULSE); }, GEAR_HL_MS);
}

// Het paneel openen (of, als het al openstaat, verzetten naar een ander
// element). Het rechterpaneel van de pagina; zie ensureInspOverlay.
function openFill(ref, scope = null, { from = null } = {}) {
  if (!ref) return;
  const { body } = ensureInspOverlay();
  panelMode('fill.title');
  state.panel = { mode: 'fill', ref, scope: scope || null };
  // Meten vóór de render: daarna bestaat de oude rij niet meer.
  renderFill(body, ref, scope, { fromRect: nodeRect(from) });
  setPanelOpen(true);
}

// --- Statuschip op de regelkop ----------------------------------------------
// De dekkingstags van vóór aug 2026 waren een ARTEFACTNAAM op elke kop ("gedekt
// door OPA-bundel burgerzaken", vijf keer dezelfde naam onder elkaar) en een
// oordeel-achtig "niet gedekt". Wat hier terugkomt is iets anders: één woord
// over de STAND van deze ene regel, uit haar eigen dekking + die van haar voorwaarden.
//   * "afgedwongen"       — de regel gedekt én alle benoemde voorwaarden;
//   * "deels afgedwongen" — de regel staat er, maar niet elk beslispunt;
//   * niets bij `none`    — zwijgen, precies zoals bij een voorwaarde zonder
//     badge: er valt niets te bevestigen, en "niet afgedwongen" zou een oordeel
//     zijn over een norm die organisatorisch geborgd kan zijn.
// Alleen binnen een policy die zélf een machine-uitvoerbare laag aanhaalt
// (coverage.inConformsContext); elders zou de mededeling betekenisloos zijn.
// De hover somt op wat er precies wel en niet is afgedwongen.
function coverageStatusChip(rule, { scope = null } = {}) {
  const cov = rule && rule.coverage;
  if (!cov || !cov.inConformsContext) return null;
  // DE REGEL ALS GEHEEL ORGANISATORISCH GEBORGD (dpv:OrganisationalMeasure op
  // de regel, aug 2026). Dan is er geen status en geen volgende stap: precies
  // hetzelfde gedempte merk als bij zo'n voorwaarde, op de regelkop, en géén
  // raderwiel — er valt niets open te klappen. Haar voorwaarden krijgen geen
  // "niet afgedwongen" (parse.js/ruleCoverage laat ze uit `uncovered`): het
  // merk op de kop zegt het al voor de regel als geheel.
  if (cov.organisational) {
    return h('span', {
      class: 'cov-organisational muted',
      text: t('cov.organisational'), title: t('cov.organisationalRuleTitle'),
    });
  }
  // De VOLGENDE STAP bepaalt of er een raderwiel staat, niet de status. Sinds
  // aug 2026 telt daardoor ook de TRANSITIEVE invulling mee: een
  // stelselverplichting die geen enkel artefact rechtstreeks afdwingt, maar
  // die door een scherpere voorwaarde elders wordt ingevuld, heeft wel degelijk
  // een volgende stap — en dat is precies wat de lezer zoekt. Voorheen zweeg
  // zij, en was de keten alleen via de uitklap te vinden.
  const steps = nextSteps(rule, scope);
  if (!steps.length) return null;
  return fillGear(rule.iri, {
    scope, status: cov.status === 'partial' ? 'partial' : 'full',
  });
}

// Voorwaarden-sectie in de body van een regel-rij: kopje + de gestructureerde
// slot-chips (constraintItem). Gedeeld door toestemmings-, verbods- én
// verplichting-rijen: een voorwaarde is overal hetzelfde ding en hoort er dus
// overal hetzelfde uit te zien (geneste en/of-groepen, rdfs:comment als hover,
// ingekorte lijstwaarden). constraintItem staat verderop; functiedeclaraties
// worden gehoist, dus de volgorde maakt niet uit.
function constraintsSection(list, { rule = null, ctx = null } = {}) {
  if (!list || !list.length) return null;
  const frag = document.createDocumentFragment();
  frag.appendChild(termHead('h4', 'head.constraints'));
  const ul = h('ul', { class: 'clean constraints' });
  for (const c of list) ul.appendChild(constraintItem(c, { rule, ctx }));
  frag.appendChild(ul);
  return frag;
}

// Verplichting als operation-rij (zelfde leaf-vorm als toestemmingen, eigen
// badge): individuele permissions/obligations zijn de "routes" van deze doc.
// `mark`: klein herkomst-woordje achter de naam (bv. "geërfd" binnen een
// overervings-vouw) — zelfde vorm als het "aanvullend" van `extra`.
function obligationRow(d, { extra = false, mark = null, scope = null } = {}) {
  // data-iri: generieke stempel waarop een sprong binnen de pagina
  // (revealInUi) een regel-rij in de weergave terugvindt.
  const row = h('details', { class: 'op-row duty', 'data-iri': d.iri || null });
  // Compacte parameterregel: WAT de maatregel is (actie, geïnformeerde
  // partij). De voorwaarden zelf staan niet meer in deze zin maar als
  // slot-chips onder "Voorwaarden" — zelfde structuur als bij toestemmingen.
  const sub = [];
  if (d.action && d.action !== d.label) sub.push(d.action);
  if (d.informedParty) sub.push(t('duty.inform', { party: d.informedParty.label || d.informedParty.curie }));
  const dutyConstraints = [...(d.constraints || []), ...(d.refinements || [])];
  row.appendChild(refSource(summaryEl({ class: 'op-summary' }, [
    ruleBadge('duty'),
    h('span', { class: 'op-title' }, [
      h('span', { class: 'op-name', text: d.label || d.action || t('title.duty') }),
      // Verplichting die NIET uit het aanbod doorwerkt terwijl er wél een
      // doorwerkende set is: markeren als aanvullend (afnemerspecifiek).
      extra ? h('span', { class: 'op-path muted', text: t('offerRules.extra') }) : null,
      mark ? h('span', { class: 'op-path muted herkomst', text: mark }) : null,
    ]),
    coverageStatusChip(d, { scope }),
    verkenBtn(d.term || d.iri),
    chevron(),
  ].filter(Boolean)), d.iri));
  const body = h('div', { class: 'op-body' });
  // Toelichting bij de verplichting: de inhoudelijke uitleg (en, via de
  // extraProps hieronder, de Grondslag) — voorheen las het model die wel maar
  // toonde de weergave hem niet.
  if (d.description) body.appendChild(h('p', { class: 'rule-desc' }, [longText(d.description)]));
  if (sub.length) body.appendChild(h('p', { class: 'duty-sub', text: sub.join(' · ') }));
  else if (!dutyConstraints.length && !(d.extraProps && d.extraProps.length)
    && !(d.duties && d.duties.length)) {
    body.appendChild(h('p', { class: 'duty-sub muted', text: t('duty.noParams') }));
  }
  // Voorwaarden op de verplichting (odrl:constraint) en parameters van de
  // maatregel (action-refinements): dezelfde slot-chip-structuur als bij een
  // toestemming — een voorwaarde leest overal hetzelfde.
  const dcs = constraintsSection(dutyConstraints, {
    rule: d, ctx: { kind: 'duty', title: d.label || d.action || t('title.duty') },
  });
  if (dcs) body.appendChild(dcs);
  // Overige eigenschappen op de duty en zijn actie-knoop (creditor,
  // hasDeadlineDelta, timeInterval, actionScope, …): label+waarde-rijen.
  const dxp = extraPropsBlock(d.extraProps);
  if (dxp) body.appendChild(dxp);
  // Duty-naar-duty-verwijzingen (odrl:duty): genest verplichtingen-lijstje.
  if (d.duties && d.duties.length) {
    body.appendChild(termHead('h4', 'head.duties'));
    body.appendChild(dutyList(d.duties));
  }
  // GEVOLG BIJ NIET-NALEVING (odrl:consequence). Semantiek van ODRL 2.2: een
  // consequence hoort bij een duty en treedt in werking als DIE VERPLICHTING
  // NIET WORDT NAGEKOMEN — het is geen gevolg van de toestemming en geen
  // gevolg van het gebruik. Het kopje zegt dat dan ook letterlijk, want
  // "Gevolg" alleen zou als "en dan gebeurt dit" gelezen kunnen worden.
  // Een consequence is zelf een Duty (parse.js/readDuty leest hem met dezelfde
  // lezer), dus hij krijgt hier de gewone verplichting-rij: actie,
  // geïnformeerde partij, voorwaarden, bron, verken-knop. Meerdere
  // consequences = meerdere rijen.
  if (d.consequences && d.consequences.length) {
    body.appendChild(termHead('h4', 'head.consequences'));
    body.appendChild(dutyList(d.consequences));
  }
  row.appendChild(body);
  return row;
}

function dutyList(duties, scope = null) {
  const box = h('div', { class: 'op-list' });
  for (const d of duties) box.appendChild(obligationRow(d, { scope }));
  return box;
}

// --- Doorwerking van de aanbod-regels (samengevouwen) -----------------------
// In een register herhaalt élke overeenkomst dezelfde stelselregels (gedeelde
// named nodes, doorwerking vanuit het aanbod). Die identieke rijen per kaart
// voegen niets toe; ze staan hier als ÉÉN ingeklapte rij die naar het aanbod
// linkt en na uitklappen de gewone rijen toont — elk met zijn eigen rijvorm
// (verplichting/toestemming/verbod). Bewuste woordkeuze: "uit het
// aanbod" (doorwerking), niet "overgeërfd" — odrl:inheritFrom is in ODRL iets
// anders. Op de Offer-kaart gebeurt dit niet: daar zijn deze regels de bron
// (offerRuleSplit geeft ze daar als `own` terug).

// Volgorde van de telwoorden in het aanbod-label; de sleutels zijn precies die
// van ruleKind() (zie RULE_NOUN_KEYS).
const RULE_NOUN_ORDER = ['duty', 'toestemming', 'verbod'];

// Het rijtype van een split-item: duties zijn verplichting, permissions
// toestemming, prohibitions verbod — dezelfde indeling die de rijen dragen.
function splitEntryKind(e) {
  return e.type === 'obligation' ? 'duty' : ruleKind(e.rule, e.type === 'prohibition');
}

// "Uit het aanbod (4 verplichtingen, 1 toestemming)" — alleen de aanwezige
// typen, enkelvoud/meervoud correct. Het label veronderstelt geen duties: het
// aanbod kan net zo goed een gedeelde toestemming of een verbod leveren.
function offerRulesLabel(entries) {
  const counts = new Map();
  for (const e of entries) {
    const k = splitEntryKind(e);
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  const parts = RULE_NOUN_ORDER.filter((k) => counts.get(k))
    .map((k) => t(RULE_NOUN_KEYS[k], { n: counts.get(k) }));
  return t('offerRules.label', { parts: parts.join(', ') });
}

function offerRulesRow(split, offerLink, { ownerAssignee = null } = {}) {
  // Geen regeltype-klasse: de rij is de AANBOD-laag, niet één soort regel.
  const row = h('details', { class: 'op-row aanbod' });
  const titles = h('span', { class: 'op-title' }, [
    h('span', { class: 'op-name', text: offerRulesLabel(split.fromOffer) }),
  ]);
  split.offers.forEach((off, i) => {
    titles.appendChild(document.createTextNode(i ? ', ' : ' '));
    titles.appendChild(offerLink
      ? offerLink(off)
      : h('span', { class: 'muted', text: off.title }));
  });
  row.appendChild(summaryEl({ class: 'op-summary' }, [
    h('span', { class: 'method aanbod', text: ruleWord('aanbod') }),
    titles,
    chevron(),
  ]));
  const body = h('div', { class: 'op-body' });
  body.appendChild(h('p', {
    class: 'duty-sub muted',
    text: t('offerRules.note'),
  }));
  const list = h('div', { class: 'op-list' });
  for (const e of split.fromOffer) {
    list.appendChild(e.type === 'obligation'
      ? obligationRow(e.rule)
      : permissionRow(e.rule, { prohibition: e.type === 'prohibition', ownerAssignee }));
  }
  body.appendChild(list);
  row.appendChild(body);
  return row;
}

// Kop van een overeenkomst/beleidsset-regelblok: de doorwerkende regels
// samengevouwen in één rij, daaronder de eigen verplichtingen als losse rijen
// (gemarkeerd "aanvullend" zodra het aanbod zélf verplichtingen levert).
function offerFoldBlock(split, offerLink, { ownerAssignee = null, scope = null } = {}) {
  const box = h('div', { class: 'op-list' });
  if (split.fromOffer.length) box.appendChild(offerRulesRow(split, offerLink, { ownerAssignee }));
  const foldedDuties = split.fromOffer.some((e) => e.type === 'obligation');
  for (const d of split.own.obligations) {
    box.appendChild(obligationRow(d, { extra: foldedDuties, scope }));
  }
  return box;
}

// --- Overerving (odrl:inheritFrom) samengevouwen ----------------------------
// ODRL 2.2 §2.6: een policy met odrl:inheritFrom erft de regels van de
// ouder(s); kind- en ouderregels gelden SAMEN. Uitschrijven op de kindkaart
// zou het beeld verdubbelen (en bij een keten vervielvoudigen), dus geldt hier
// hetzelfde patroon als bij de doorwerking hierboven: ÉÉN rij per ouder,
// uitklapbaar naar de regels zelf.
//
// Twee dingen die dit NIET is:
//   - de aanbod-vouw hierboven (doorwerking via een GEDEELDE regel-IRI). Die
//     houdt zijn eigen chip "aanbod"; deze rij zegt "geërfd" en linkt naar de
//     OUDERPOLICY, niet naar het aanbod.
//   - een stilzwijgende weglating: is de ouder niet in de bron geladen, dan
//     blijft de rij staan mét verken-knop en zegt hij dat eerlijk.

// Het label van één ouder-vouwrij: vijf gevallen, elk een eigen zin. `lazy`
// onderscheidt "de ouder hééft geen regels" van "zijn regels staan nog niet in
// de store" — in ?sparql=-modus is dat een wezenlijk verschil (zie hieronder).
function inheritRowLabel(g, { lazy = false } = {}) {
  if (!g.iri) return t('inheritRules.labelInvalid', { value: g.literal });
  const parent = g.title || g.curie || g.iri;
  if (!g.present) return t('inheritRules.labelMissing', { parent });
  if (g.rules.length) return t('inheritRules.label', { parent, n: g.rules.length });
  return lazy ? t('inheritRules.labelLazy', { parent }) : t('inheritRules.labelEmpty', { parent });
}

// Alle regels van een policy als split-items, in de vaste bucketvolgorde.
function policyRuleEntries(pol) {
  return [
    ...(pol.obligations || []).map((r) => ({ rule: r, type: 'obligation' })),
    ...(pol.permissions || []).map((r) => ({ rule: r, type: 'permission' })),
    ...(pol.prohibitions || []).map((r) => ({ rule: r, type: 'prohibition' })),
  ];
}

function inheritRulesRow(g, { ownerAssignee = null, scope = null } = {}) {
  // ?sparql=-modus haalt de overerving ÉÉN hop op (policyDetailQuery, tak 7a).
  // Een voorouder verderop in de keten is dan wél bekend (label + type komen
  // als object mee) maar heeft nog geen regels in de store. Dat is geen
  // "ouder zonder regels": het is "nog niet geladen", en de rij laadt hem lui
  // bij zodra de lezer hem openklapt.
  const lazy = !!(state.sparqlEndpoint && g.iri && g.present && !g.rules.length
    && !state.detailLoaded.has(g.iri));
  // Geen regeltype-klasse: de rij is de OUDER-laag, niet één soort regel.
  const row = h('details', {
    class: 'op-row geerfd' + (g.present ? '' : ' ontbreekt'),
    // Zie de art-fold: een →-sprong kan deze vouw openzetten, en dan hoort hij
    // een herrender te overleven.
    'data-open-key': g.iri ? 'geerfd:' + g.iri : null,
  });
  const name = h('span', { class: 'op-name', text: inheritRowLabel(g, { lazy }) });
  row.appendChild(summaryEl({ class: 'op-summary' }, [
    explainKey(h('span', { class: 'method geerfd', text: t('rule.inherited') }), 'rule.inherited'),
    h('span', { class: 'op-title' }, [
      name,
      // De curie alleen als hij écht afkort en niet al de naam in het label ís:
      // een onafgekorte IRI naast "Geërfd van http://…" zou hem verdubbelen.
      g.present && g.curie && !/^https?:/.test(g.curie) && g.curie !== g.title
        ? h('span', { class: 'op-path mono muted', text: g.curie }) : null,
      // Cyclische keten (odrlapi-sample048): benoemen, niet verzwijgen — de
      // bron is spec-ongeldig en dat mag de lezer weten.
      g.cycle
        ? h('span', { class: 'op-path muted', title: t('inheritRules.cycleTitle'), text: t('inheritRules.cycle') })
        : null,
    ]),
    // Ook bij een ontbrekende ouder: de verwijzing is een knoop in de graaf en
    // blijft dus te verkennen.
    verkenBtn(g.iri, t('inheritRules.explore')),
    chevron(),
  ]));
  const body = h('div', { class: 'op-body' });
  body.appendChild(h('p', {
    class: 'duty-sub muted',
    text: g.present ? t('inheritRules.note') : t('inheritRules.noteMissing'),
  }));
  const list = h('div', { class: 'op-list' });
  // GEEN "geërfd"-merk MEER OP DE RIJEN ZELF (besluit eigenaar, aug 2026). De
  // vouw waarin ze staan heet al "Geërfd van ‹ouder›" en draagt de chip
  // Geërfd; hetzelfde woord nog eens achter elke naam zei niets extra's en
  // maakte elke rij een regel langer. De herkomst blijft wél staan waar zij
  // niet uit de omgeving blijkt — de herkomstregel in het zijpaneel ("van
  // ‹set›") staat los van deze vouw en verandert niet.
  const fill = (entries) => {
    for (const e of entries) {
      list.appendChild(e.type === 'obligation'
        ? obligationRow(e.rule, { scope })
        : permissionRow(e.rule, { prohibition: e.type === 'prohibition', ownerAssignee }));
    }
  };
  if (g.rules.length) fill(g.rules);
  body.appendChild(list);
  row.appendChild(body);
  if (lazy) {
    let started = false;
    row.addEventListener('toggle', async () => {
      if (started || !row.open) return;
      started = true;
      const spin = h('p', { class: 'duty-sub muted', text: t('load.cardDetail') });
      list.appendChild(spin);
      await ensureDetail(g.iri);
      list.innerHTML = '';
      const pol = byIri(state.model.sets, g.iri) || byIri(state.model.offers, g.iri)
        || byIri(state.model.agreements, g.iri);
      const entries = pol ? policyRuleEntries(pol) : [];
      fill(entries);
      name.textContent = inheritRowLabel({ ...g, rules: entries });
    });
  }
  return row;
}

// De vouwrijen van álle voorouders van één policy (leeg als er niets geërfd
// wordt). Eén rij per ouder, in de volgorde van de keten: eerst de directe
// ouders, dan hun ouders.
function inheritFoldRows(pol, { ownerAssignee = null } = {}) {
  // De KAART waarop deze rij staat is de scope voor de keten-mededelingen: een
  // gedeelde stelselplicht laat hier alleen zien hoe DIT beslispunt haar invult.
  const scope = pol && !pol.anon ? pol.iri : null;
  return ((pol && pol.inherited) || []).map((g) => inheritRulesRow(g, { ownerAssignee, scope }));
}

// Sectiekop in Swagger-tag-stijl, met optioneel aantal.
function secHead(label, count) {
  return h('div', { class: 'doc-sec' }, [
    h('h3', { text: label }),
    count != null ? h('span', { class: 'sec-count muted', text: String(count) }) : null,
  ]);
}

// Overige eigenschappen: reguliere (domein)attributen buiten het getoonde
// model om — nooit stilzwijgend weglaten (zelfde principe als de viewer).
// GRONDSLAG EN BRON: twee eigenschappen, twee koppen, allebei als link.
//   dpv:hasLegalBasis — "Grondslag": de wet of het artikel waarop de regel rust.
//   dct:source        — "Bron": waar de verklaring zelf vandaan komt (een
//                       besluit, een configuratiebestand, een registerrij).
// Ze kunnen naast elkaar staan; de Grondslag komt dan eerst (zie
// orderLegalFirst). Beide krijgen een eigen i18n-kop met eigen uitleg, en
// puntkomma's tussen de waarden: wettitels bevatten zelf komma's.
const LEGAL_BASIS_IRI = 'https://w3id.org/dpv#hasLegalBasis';
const ORIGIN_IRI = 'http://purl.org/dc/terms/source';
const LINKED_KEY = { [LEGAL_BASIS_IRI]: 'field.legalBasis', [ORIGIN_IRI]: 'field.origin' };

// Grondslag boven Bron, zonder de rest van de lijst te herschikken: beide
// worden uit de rij gelicht en op de vroegste van hun twee posities in de
// gewenste volgorde teruggezet.
function orderLegalFirst(extraProps) {
  const lb = extraProps.filter((ep) => ep.predicate.iri === LEGAL_BASIS_IRI);
  const src = extraProps.filter((ep) => ep.predicate.iri === ORIGIN_IRI);
  if (!lb.length || !src.length) return extraProps;
  const rest = extraProps.filter((ep) => !lb.includes(ep) && !src.includes(ep));
  const at = Math.min(extraProps.indexOf(lb[0]), extraProps.indexOf(src[0]));
  const before = extraProps.slice(0, at).filter((ep) => rest.includes(ep));
  return [...before, ...lb, ...src, ...rest.slice(before.length)];
}

// Overige eigenschappen: reguliere (domein)attributen buiten het getoonde
// model om — nooit stilzwijgend weglaten (zelfde principe als de viewer).
function extraPropsBlock(extraProps) {
  if (!extraProps || !extraProps.length) return null;
  return kv(orderLegalFirst(extraProps).map((ep) => {
    const linkedKey = LINKED_KEY[ep.predicate.iri];
    const isSource = !!linkedKey;
    // De naam van een OVERIGE eigenschap komt uit de graaf (of uit de
    // koppeltabel register-labels.js); haar uitleg dus ook, langs dezelfde
    // route als elke andere term — descriptionFor op het predicaat-IRI.
    return [
      linkedKey ? term(linkedKey)
        : explained(h('span', { text: ep.predicate.label }),
          descriptionFor(state.store, ep.predicate.iri)),
      h('span', {}, ep.values.flatMap((v, i) => [
        i ? (isSource ? '; ' : ', ') : '',
        v.literal !== undefined
          ? longText(v.literal)
          // Blank node: één niveau samengevat (typelabel — eigenschappen).
          : (v.blank
            ? h('span', { class: 'blank-summary', text: v.label })
            : (isSource && /^https?:/.test(v.iri)
              ? h('a', { href: v.iri, target: '_blank', rel: 'noopener', text: v.label })
              : h('span', { title: v.iri }, [v.label, ' ', h('span', { class: 'mono muted', text: v.curie })]))),
      ])),
    ];
  }));
}

// Hover-uitleg bij een ontbrekend constraint-slot (zelfde tekst als de
// drie-panelen-viewer): welk ODRL-predicaat ontbreekt, plus welke
// niet-herkende properties er wél op de constraint-node staan.
function missingSlotTitle(predCurie, unknownProps) {
  let txt = t('slot.missingTitle', { pred: predCurie });
  if (unknownProps && unknownProps.length) {
    txt += t('slot.unknownProps')
      + unknownProps.map((u) => `${u.curie} → ${u.values.join(', ')}`).join('; ') + '.';
  }
  return txt;
}

// Gestructureerde slot-chips [grootheid] [operator] [waarde]; ontbrekende
// slots krijgen een waarschuwings-chip met uitleg in de title. Lange
// waardelijsten (bv. 14 gemeentecodes uit een rdf:List) worden ingekort met
// "… (n waarden)"; de volledige lijst staat in de title-hover. Een unaire
// profiel-operator (brp:knv) krijgt géén waarde-chip en géén markering.
const RIGHT_CHIP_SHOWN = 5;

// De slots waarop de chips gebouwd worden. Kwam de zinbouwer niet tot slots
// (een samengestelde constraint waarvan de leden niet uitgelezen konden
// worden), dan worden ze hier alsnog uit de RAUWE velden gemaakt: de curie van
// de grootheid, de operator en de waarden.
//
// Dat is de hele regel van deze weergave: degradeer in WOORDEN, niet in VORM.
// Een profieloperator zonder rdfs:label hoort "ex:opX" in de operator-chip te
// zetten — niet de hele voorwaarde terug te laten vallen op één platte zin,
// want dan verspringt de structuur van de kaart bij data die alleen wat
// magerder is. Een slot dat écht ontbreekt houdt zijn "ontbreekt"-chip; dat is
// een ander feit dan "wel aanwezig, geen woord voor".
function chipSlots(c) {
  if (c.slots) return c.slots;
  const rights = [...(c.right || []), ...(c.rightOperandReference || [])];
  return {
    left: c.left ? { text: c.left } : null,
    operator: c.operator ? { text: c.operator } : null,
    right: rights.length ? { texts: rights } : null,
  };
}

// Waarschuwings-chip voor een ontbrekend slot. Draagt unknownProps een
// kandidaat (een eigenschap die we niet herkenden), dan toont de chip diens
// curie/staart in plaats van alleen "ontbreekt" — de lezer ziet dan wát er
// staat, met de uitleg in de title. Geel driehoek-icoon als signaal.
function warnIcon() {
  const i = h('span', { class: 'c-warn', 'aria-hidden': 'true' });
  i.innerHTML = '<svg viewBox="0 0 16 16" width="11" height="11"><path d="M8 1.5 15 14H1z" fill="#e3b341" stroke="#a97a10" stroke-width="1"/><rect x="7.3" y="6" width="1.4" height="4" rx=".7" fill="#5c4304"/><circle cx="8" cy="11.8" r=".9" fill="#5c4304"/></svg>';
  return i;
}
function missingChip(fallbackKey, predCurie, unknownProps) {
  const kandidaat = (unknownProps || []).find((u) => u && u.curie);
  const tekst = kandidaat ? kandidaat.curie : t(fallbackKey);
  const el = h('span', {
    class: 'c-slot missing', title: missingSlotTitle(predCurie, unknownProps),
  }, [warnIcon(), h('span', { text: tekst })]);
  return el;
}

// De slot-chips van één voorwaarde: [grootheid][operator][waarde]. Dezelfde
// vorm overal — in de Voorwaarden van een regel én in de afbakening van een
// collectie. (Tot aug 2026 kon er een gedempt inleidwoord vóór staan
// ("waarvoor geldt", "én"); die rol is overgenomen door de sectiebalk boven de
// rijen.)
function constraintChips(c) {
  const slots = chipSlots(c);
  const wrap = h('span', { class: 'c-chips' });
  // `desc` = de definitie van de term áchter de chip (note §1). Is die er,
  // dan draagt de chip de affordance en de tooltip; anders verandert er niets.
  // Draagt de chip al een NATIVE title (de volledige waardelijst achter een
  // ingekorte reeks), dan blijft die en komt de tooltip niet: twee panelen
  // over hetzelfde element is precies de botsing die we vermijden.
  const chip = (cls, text, title, desc) => explained(
    h('span', { class: 'c-slot ' + cls, text, title: title || null }),
    title ? '' : desc);
  wrap.appendChild(slots.left
    ? chip('left', slots.left.text, null, slots.left.desc)
    : missingChip('slot.leftMissing', 'odrl:leftOperand', c.unknownProps));
  wrap.appendChild(slots.operator
    ? chip('op', slots.operator.text, null, slots.operator.desc)
    : missingChip('slot.operatorMissing', 'odrl:operator', c.unknownProps));
  if (slots.right) {
    // ELKE LIJSTWAARDE EEN EIGEN CHIP (besluit eigenaar, aug 2026). Een
    // rdf:List als rechterwaarde ("zoeken met postcode en huisnummer,
    // raadplegen met burgerservicenummer") stond als ÉÉN chip met kommatekst;
    // dan leest een opsomming van losse waarden als één lange waarde, en breekt
    // zij ook nog op willekeurige plekken af. Zelfde maat en stijl, naast
    // elkaar, en de rij mag afbreken (.c-chips is flex-wrap).
    const texts = slots.right.texts;
    const descs = slots.right.descs || [];
    const long = texts.length > RIGHT_CHIP_SHOWN + 1;
    const alles = long ? texts.join(', ') : null;
    const getoond = long ? texts.slice(0, RIGHT_CHIP_SHOWN) : texts;
    // Een waarde-chip krijgt haar uitleg alleen als de waarde een IRI is met
    // een definitie: `descs` loopt in de pas met `texts` (zie parse.js).
    getoond.forEach((tekst, i) => wrap.appendChild(chip('right', tekst, alles, descs[i])));
    // Ingekort: één gedempte chip die zegt hoeveel waarden er in totaal zijn,
    // met de volledige lijst in de hover — zoals de losse chips.
    if (long) wrap.appendChild(chip('right more', t('valuesTruncated', { n: texts.length }), alles));
  } else if (!c.unaryOperator) {
    wrap.appendChild(missingChip('slot.valueMissing', 'odrl:rightOperand', c.unknownProps));
  }
  return wrap;
}

// --- Geneste logische constraints (odrl:and/or/xone) -------------------------
// De en/of-boom wordt gestructureerd gerenderd: een groepskop ("alle van"/
// "één van") met ingesprongen leden; bladen tonen de bestaande slot-chips en
// dragen hun rdfs:comment als hover. Boven GROUP_COLLAPSE_LEAVES bladen start
// de groep ingeklapt (alleen label + samenvatting).
const LOGICAL_OP_NAMES = ['and', 'andSequence', 'or', 'xone'];
const logicalHead = (op) => (LOGICAL_OP_NAMES.includes(op) ? t('logicalHead.' + op) : op);
const GROUP_COLLAPSE_LEAVES = 10;

function countConstraintLeaves(c) {
  if (!c.children || !c.children.length) return 1;
  return c.children.reduce((n, ch) => n + countConstraintLeaves(ch), 0);
}

function constraintNode(c) {
  if (!c.logical || !c.children || !c.children.length) {
    // Blad: chips (of zin als er geen slots zijn); rdfs:comment als hover.
    const row = titleAsTip(h('span', { class: 'c-leaf', title: constraintTitle(c) }));
    row.appendChild(constraintChips(c));
    appendIf(row, constraintNote(c));
    return row;
  }
  const group = titleAsTip(h('div', { class: 'c-group', title: constraintTitle(c) }));
  group.appendChild(h('div', { class: 'c-group-head' }, [
    // De operator-chip vóóraan, de naam als gedempt bijschrift erachter:
    // zelfde volgorde als een blad-rij (inhoud eerst, context erna).
    h('span', { class: 'c-slot op', text: logicalHead(c.logical) }),
    constraintNote(c),
  ].filter(Boolean)));
  const ul = h('ul', { class: 'clean c-group-items' });
  for (const ch of c.children) {
    ul.appendChild(h('li', { class: 'c-group-item' }, [constraintNode(ch)]));
  }
  group.appendChild(ul);
  return group;
}

// De chip-rij van een conformsToPolicy-voorwaarde: zelfde structuur als elke
// andere constraint (links/operator/rechts), met de rechter chip als link naar
// het artefact-kaartje. Eigen functie omdat het paneel dezelfde rij als
// duplicaat tekent — bron en duplicaat horen letterlijk hetzelfde te zijn.
function conformsChips(c) {
  // ANDERE VORM, EIGEN CHIPS. De vaste zin hieronder is de ODRL-AP-NL-vorm
  // (leftOperand apnl:verwerkingsverzoek, operator apnl:conformsToPolicy). Een
  // technische borging die alleen de marker dpv:TechnicalMeasure draagt zegt
  // iets anders, en dan zou die zin liegen: toon dan gewoon haar eigen chips.
  if (!c.conformsOp || !c.conformsTo) return condContent(c);
  const art = byIri(state.model.artifacts.concat(state.model.bundles), c.conformsTo);
  const naam = art ? art.title : curie(c.conformsTo);
  const wrap = h('span', { class: 'c-chips' });
  const chip = (cls, node) => h('span', { class: 'c-slot ' + cls },
    typeof node === 'string' ? [document.createTextNode(node)] : [node]);
  wrap.appendChild(chip('left', t('conforms.left')));
  wrap.appendChild(chip('op', t('conforms.op')));
  // GEEN LINK MEER op de artefactnaam: de sectie "Machine-uitvoerbaar beleid"
  // is vervallen (besluit eigenaar, aug 2026), dus er is geen kaart om naartoe
  // te springen. Het artefact staat ÍN deze rij — uitklappen toont het
  // formulier, het ⚙ opent de keten in het zijpaneel.
  wrap.appendChild(chip('right', h('span', { text: naam })));
  return wrap;
}

// Eén voorwaarde-regel: label + slot-chips, of een geneste groepsweergave bij
// logische constraints (grote bomen starten ingeklapt).
// conformsToPolicy-voorwaarden klappen het ARTEFACT open (artifactForm).
function constraintItem(c, { rule = null, ctx = null } = {}) {
  const li = h('li', { class: 'constraint' });
  // BRON-rij: de dekkingsuitklap toont deze voorwaarde nog een keer; met
  // dezelfde ref licht zij op als de lezer over dat duplicaat gaat.
  refSource(li, c.iri);
  // DE TECHNISCHE BORGING (dpv:TechnicalMeasure, met de conformsToPolicy-
  // operator als terugval — zie parse.js/isTechnicalMeasure). Zij is geen
  // gewone voorwaarde-rij: zij delegeert, en wat erachter staat noemt zij als
  // rechterwaarde. Die rechterwaarde klapt hier open als artefactformulier.
  if (c.technicalMeasure) {
    const scope = ctx && ctx.scope;
    const art = byIri(state.model.artifacts.concat(state.model.bundles), c.conformsTo);
    const wrap = conformsChips(c);
    // DE RIJ ALS KETENSTAP: zij is zelf een blank node en heeft dus geen IRI
    // om op te hangen. Het model geeft haar daarom een samengestelde ref
    // (regel + knoop, zie parse.js/conformsRowRef); die stempelen we hier als
    // data-ref, zodat een duplicaat in het paneel haar kan aanwijzen.
    refSource(li, c.rowRef);
    const gear = fillGear(c.rowRef, { scope });
    // UITKLAPPEN TOONT HET ARTEFACT ZELF (besluit eigenaar, aug 2026). Tot nu
    // klapte hier de INVULLING open: wat deze bundel van deze ene regel
    // afdwong. Dat is de vraag van het invulling-paneel geworden (⚙); wat een
    // lezer hier openklapt is het ding waarnaar de rij verwijst — het
    // artefact, met dezelfde velden als zijn kaart onder "Machine-uitvoerbaar
    // beleid". Eén functie, twee plekken (artifactForm).
    if (art) {
      // data-open-key: captureListUi/restoreListUi houdt deze uitklap open na
      // een herrender — ook als de →-sprong hem zojuist heeft opengezet.
      const det = h('details', {
        class: 'c-fold art-fold', 'data-open-key': c.rowRef ? 'art:' + c.rowRef : null,
      });
      const sum = summaryEl({ class: 'vl-summary' }, [
        wrap,
        c.term ? verkenBtn(c.term) : null,
        gear,
        h('span', { class: 'vl-chevron', text: '\u25b8' }),
      ].filter(Boolean));
      // data-art: DE PLAATS VAN HET ARTEFACT IN HET DOCUMENT. Sinds de sectie
      // "Machine-uitvoerbaar beleid" verviel, is deze KOPREGEL het enige punt
      // in de weergave waar dit artefact staat; sprongen en markeringen die
      // vroeger op de artefactkaart landden, zoeken hem hierop terug
      // (refTargets). Op de kopregel en niet op de <details>: een sprong hoort
      // op de RIJ te landen, en de summary blijft zichtbaar als de vouw dicht is.
      sum.setAttribute('data-art', c.conformsTo);
      det.appendChild(sum);
      det.appendChild(h('div', { class: 'c-fold-body art-fold-body' },
        [artifactForm(art)]));
      li.appendChild(det);
      return li;
    }
    // Het artefact zit niet in de geladen graaf: dan blijft het de gewone
    // chip-rij — er valt niets te openen en we verzinnen geen leeg formulier.
    li.appendChild(wrap);
    appendIf(li, verkenBtn(c.term));
    appendIf(li, gear);
    return li;
  }
  if (c.slots) {
    if (c.label) li.setAttribute('title', constraintTitle(c));
    li.appendChild(constraintChips(c));
    appendIf(li, constraintNote(c));
    // De omgekeerde kant van de keten ("geeft invulling aan …") en het merk
    // "niet uitgewerkt" stonden hier tot aug 2026 als kleine
    // gedempte bijschriften. Ze zijn VERHUISD naar het invulling-paneel: in de
    // leesregel van het beleid hoorden twee mededelingen over de technische
    // laag niet thuis, en samen met de uitklap vertelden ze het verhaal drie
    // keer half. De rij houdt haar twee uitgangen: ⌕ naar de graaf, ⚙ naar de
    // invulling.
    appendIf(li, verkenBtn(c.term));
    appendIf(li, conditionGear(c, ctx && ctx.scope));
    return li;
  }
  if (c.logical && c.children && c.children.length) {
    const leaves = countConstraintLeaves(c);
    if (leaves > GROUP_COLLAPSE_LEAVES) {
      // Grote boom: ingeklapt starten met label + samenvatting.
      const det = h('details', { class: 'c-fold' });
      det.appendChild(summaryEl({ class: 'vl-summary muted' }, [
        h('span', { class: 'vl-chevron', text: '▸' }),
        h('span', {
          text: t('constraint.foldSummary', {
            label: c.label || t('constraint.compound'),
            head: logicalHead(c.logical), n: leaves,
          }),
        }),
      ]));
      const holder = h('div', { class: 'c-fold-body' });
      let built = false;
      det.addEventListener('toggle', () => {
        if (!det.open || built) return;
        built = true;
        holder.appendChild(constraintNode({ ...c, label: null }));
      });
      det.appendChild(holder);
      li.appendChild(det);
    } else {
      li.appendChild(constraintNode(c));
    }
    appendIf(li, verkenBtn(c.term));
    appendIf(li, conditionGear(c, ctx && ctx.scope));
    return li;
  }
  // Laatste geval: geen slots, geen leden — een samengestelde voorwaarde die
  // de zinbouwer niet kon uitpakken. Ook die houdt de chip-structuur (zie
  // chipSlots): wat er aan woorden is staat in de chips, de rest is een
  // ontbreekt-chip.
  if (c.label) li.setAttribute('title', constraintTitle(c));
  li.appendChild(constraintChips(c));
  appendIf(li, constraintNote(c));
  appendIf(li, verkenBtn(c.term));
  appendIf(li, conditionGear(c, ctx && ctx.scope));
  return li;
}

// Kleine hulp: alleen toevoegen wat er is (de badge is meestal null).
function appendIf(parent, node) { if (node) parent.appendChild(node); return parent; }

// --- Ledenlijst als doorlopende partOf-boom ---------------------------------
// De fold-out van een collectie toont niet één laag maar de hele keten: een lid
// dat zelf leden heeft (stuk in dossier in serie in archief; rubriek in groep
// in categorie) wordt een uitklapbare knoop met op elk niveau dezelfde
// domein-type-groepering en telling. Het modelwerk — groepering, cykeldetectie,
// "heeft dit lid zelf leden" — zit in memberTreeLevel (parse.js); hier staat
// alleen de DOM en het lui bijladen.
//
// LUI PER NIVEAU, in beide modi:
//   ttl-modus     — de store is compleet; "laden" is alleen even wachten tot
//                   de worker-overdracht klaar is (state.storeReady).
//   ?sparql=-modus — elk uitklappen kost ÉÉN CONSTRUCT (collectionLevelQuery):
//                   de leden met label/type, hun klasselabels, en de
//                   lidmaatschapstriples één niveau dieper zodat de boom weet
//                   wélke leden opnieuw uitklapbaar zijn. Gemeten op /brp
//                   (urn:graph:brp:informatiemodel) staat het resultaat in de
//                   README bij "Collectieboom".
// Per fold-out wordt onthouden welke knopen al bijgeladen zijn, zodat
// dichtklappen en opnieuw openen geen tweede ronde naar het endpoint kost.
const levelLoaded = new Set();

async function loadCollectionLevel(iri) {
  // Worker-pad: de hoofddraad-store wordt ná de eerste render gevuld. Zonder
  // deze wacht zou een vroege uitklap een lege boom tonen.
  if (state.storeReady && !state.storeHydrated) await state.storeReady;
  if (!iri || !state.sparqlEndpoint || levelLoaded.has(iri)) return;
  levelLoaded.add(iri);
  const ttl = await sparqlConstruct(state.sparqlEndpoint,
    collectionLevelQuery(iri, { excludeGraphs: state.excludeGraphs }));
  if (ttl && ttl.trim()) {
    addSource(state.store, ttl, 'ttl');
    if (state.sources) {
      state.sources.push({ name: iri + ' (SPARQL-collectieniveau)', content: ttl, format: 'ttl', fromSparql: true });
    }
  }
}

// Eén lid als BLAD: naam + verken-knop, en waar van toepassing de reden dat de
// boom hier stopt (cykel of diepte-limiet). Beide zijn neutrale mededelingen
// met een uitgang naar de RDF-verkenner — die kent geen diepte-limiet.
function memberLeaf(m, { deeper = false } = {}) {
  // De rij houdt de IRI als native title; de naam draagt de uitleg.
  const li = titleAsTip(h('li', { class: 'member-item', title: m.iri },
    [explained(h('span', { class: 'member-name', text: m.label }), m.desc)]));
  if (m.cycle) {
    li.appendChild(h('span', { class: 'tree-note muted', title: t('tree.cycleTitle'), text: t('tree.cycle') }));
  } else if (deeper) {
    li.appendChild(h('span', { class: 'tree-note muted', title: t('tree.deeperTitle'), text: t('tree.deeper') }));
  }
  appendIf(li, verkenBtn(m.iri));
  return li;
}

// Eén lid als KNOOP: een geneste fold-out die bij de eerste uitklap het
// volgende niveau bijlaadt en rendert.
function memberBranch(m, { kind, ancestors, depth }) {
  // data-open-key: waarop captureListUi/restoreListUi deze tak terugvindt na
  // een herrender (taalwissel, fasewissel). Het hele PAD zit erin, niet alleen
  // de IRI van het lid: hetzelfde lid kan onder twee ouders hangen (een DAG,
  // en sinds de ancestry-koppen ook onder twee koppen), en die takken zijn
  // afzonderlijk open of dicht.
  const det = h('details', { class: 'member-node',
    'data-open-key': 'tree:' + [...ancestors, m.iri].join('|') });
  det.appendChild(summaryEl({ class: 'member-summary', title: t('tree.expand') }, [
    h('span', { class: 'vl-chevron', text: '▸' }),
    explained(h('span', { class: 'member-name', text: m.label }), m.desc),
    verkenBtn(m.iri),
  ]));
  const holder = h('div', { class: 'member-level' });
  det.appendChild(holder);
  let built = false;
  det.addEventListener('toggle', () => {
    if (!det.open || built) return;
    built = true;
    openMemberLevel(holder, m.iri, { kind, ancestors: [...ancestors, m.iri], depth });
  });
  return det;
}

// Vul één niveau van de boom in `holder`. Async: in ?sparql=-modus zit hier de
// ene extra hop. Toont zolang een korte laadregel, zodat een trage endpoint
// niet als lege lijst leest.
// Moet er voor dit niveau iets BIJ voordat het te tekenen is? Alleen dan gaat
// de weergave door de async route met zijn laadregel; in ttl-modus (store
// compleet, geen endpoint) blijft het uitklappen synchroon en flitst er dus
// geen "leden laden…" voorbij.
function memberLevelNeedsLoad(termOrIri) {
  if (state.storeReady && !state.storeHydrated) return true;
  return typeof termOrIri === 'string' && !!state.sparqlEndpoint && !levelLoaded.has(termOrIri);
}

function openMemberLevel(holder, termOrIri, opts) {
  if (memberLevelNeedsLoad(termOrIri)) { fillMemberLevel(holder, termOrIri, opts); return; }
  renderMemberLevel(holder,
    memberTreeLevel(state.store, termOrIri, { kind: opts.kind, ancestors: opts.ancestors }), opts);
}

// `termOrIri` is een IRI-string (het normale geval) of een blanke TERM: een
// anonieme collectie is niet op het endpoint na te vragen, dus daar blijft het
// bij wat de store al heeft.
async function fillMemberLevel(holder, termOrIri, { kind, ancestors, depth }) {
  holder.appendChild(h('div', { class: 'member-loading muted', text: t('tree.loading') }));
  try {
    if (typeof termOrIri === 'string') await loadCollectionLevel(termOrIri);
    else if (state.storeReady && !state.storeHydrated) await state.storeReady;
  } catch (e) { /* toon wat er wél in de store zit */ }
  holder.innerHTML = '';
  const level = memberTreeLevel(state.store, termOrIri, { kind, ancestors });
  renderMemberLevel(holder, level, { kind, ancestors, depth });
}

// De leden van één groep als <ul>. Gedeeld door de type-groepen en de
// ancestry-groepen, zodat een lid er overal hetzelfde uitziet — en, belangrijk
// voor het samenspel van de twee richtingen: een lid dat zélf leden heeft
// blijft ook BINNEN een ancestry-kop een uitklapbare knoop. De kinder-boom
// (omlaag) en de ancestry-koppen (omhoog) raken elkaar dus niet.
function memberItemsUl(items, { kind, ancestors, depth }) {
  const ul = h('ul', { class: 'clean member-items' });
  for (const m of items) {
    // Diepte-limiet: onder MEMBER_TREE_MAX_DEPTH stopt de boom en verwijst
    // hij door naar de RDF-verkenner (zie tree.deeper).
    const li = (m.hasChildren && depth < MEMBER_TREE_MAX_DEPTH)
      ? h('li', { class: 'member-item branch' },
        [memberBranch(m, { kind, ancestors, depth: depth + 1 })])
      : memberLeaf(m, { deeper: m.hasChildren });
    ul.appendChild(li);
  }
  return ul;
}

// De groepen van één niveau als DOM. Gedeeld door de wortel (de fold-out zelf)
// en elk dieper niveau, zodat groepskop, telling en sortering overal gelijk
// zijn. `depth` is het niveau dat hier getekend wordt (1 = de directe leden).
//
// Twee soorten koppen, in deze volgorde:
//   1. ANCESTRY-koppen — de keten BOVEN de leden, buiten deze collectie om
//      (BRP: categorie, daaronder groep). Twee niveaus diep, met de telling
//      van wat eronder valt. Zie groupMembersByAncestry in parse.js.
//   2. de vertrouwde TYPE-koppen voor alles wat geen zulke keten heeft — een
//      eerlijke terugval, niet een restcategorie die iets verzwijgt.
function renderMemberLevel(holder, level, { kind, ancestors, depth }) {
  if (!level.total) {
    holder.appendChild(h('div', { class: 'member-empty muted', text: t('tree.empty') }));
    return;
  }
  const head = (cls, label, n, title) => h('div',
    { class: cls + ' muted', title, text: `${label} (${n})` });
  for (const g of level.ancestry || []) {
    holder.appendChild(head('member-ancestry-head', g.label, g.count, t('tree.ancestryTitle')));
    if (g.items.length) holder.appendChild(memberItemsUl(g.items, { kind, ancestors, depth }));
    for (const s of g.subgroups) {
      holder.appendChild(head('member-ancestry-sub', s.label, s.items.length,
        t('tree.ancestrySubTitle')));
      holder.appendChild(memberItemsUl(s.items, { kind, ancestors, depth }));
    }
  }
  // Groepskop tonen zodra de leden getypeerd zijn — óók bij één groep:
  // "Dossier (2)" vertelt wat de leden zijn, en uniformiteit tussen niveaus
  // wint van de slimmigheid om een enkele kop te onderdrukken. Alleen een
  // niveau dat uitsluitend uit typeloze leden bestaat blijft koploos (een
  // kop "overig" boven alles zou ruis zijn).
  const showHeads = level.groups.some((g) => g.typed);
  for (const g of level.groups) {
    if (showHeads) {
      holder.appendChild(h('div', { class: 'member-group-head muted', text: `${g.label} (${g.items.length})` }));
    }
    holder.appendChild(memberItemsUl(g.items, { kind, ancestors, depth }));
  }
}

// Ledenlijst van een target-gegevensset (odrl:AssetCollection): ingeklapte
// fold-out met telling ("48 leden (6 categorieën, …)"); de eerste uitklap
// bouwt lazy het EERSTE niveau van de boom (zie renderMemberLevel).
// De telling in de kop blijft die van de directe leden — dat is wat er in het
// model staat zonder ook maar één extra hop, en de boom vertelt de rest.
function targetMembersFold(tgt) {
  const det = h('details', { class: 'member-list',
    'data-open-key': tgt.iri ? 'coll:' + tgt.iri : null });
  det.appendChild(summaryEl({ class: 'vl-summary muted' }, [
    h('span', { class: 'vl-chevron', text: '▸' }),
    h('span', { text: memberSummary(tgt.members, tgt.collKind) }),
  ]));
  const holder = h('div', { class: 'member-tree' });
  det.appendChild(holder);
  let built = false;
  det.addEventListener('toggle', () => {
    if (!det.open || built) return;
    built = true;
    // Een ANONIEME collectie heeft geen IRI om op na te vragen; daar leest de
    // boom alleen wat de store al heeft (de blanke term uit het model).
    const wortel = tgt.anon ? asTerm(tgt.term) : tgt.iri;
    if (!wortel) {
      renderMemberLevel(holder,
        { total: tgt.members.length, groups: groupCollectionMembers(tgt.members, tgt.collKind) },
        { kind: tgt.collKind, ancestors: [], depth: MEMBER_TREE_MAX_DEPTH });
      return;
    }
    openMemberLevel(holder, wortel, { kind: tgt.collKind, ancestors: [], depth: 1 });
  });
  return det;
}

// Intensioneel gedefinieerde collectie: de leden staan niet opgesomd maar
// worden BESCHREVEN door een odrl:refinement. Zo'n refinement IS een
// voorwaarde, dus krijgt hij precies de slot-chips van de Voorwaarden-rijen
// van een regel ([grootheid][operator][waarde]) in plaats van de lopende zin
// die hier tot aug 2026 stond ("elke partij waarvoor geldt: rol bevat
// verkoper"): dezelfde soort informatie hoort er overal hetzelfde uit te zien,
// en de zin verborg welk deel de grootheid en welk deel de waarde was.
// De rijen staan onder een eigen SECTIEBALK — dezelfde h4-strip als
// "Voorwaarden" bij een regel, maar met een eigen naam ("Afbakening"): een
// refinement bakent de verzameling af, hij stelt geen voorwaarde aan het
// gebruik. Dat de refinements SAMEN gelden zegt de balk; daarom geen
// inleidwoord vóór de eerste rij en geen "én" tussen de volgende.
// De ZIN-variant (coll.anyParty/anyAsset in parse.js) blijft bestaan voor de
// plekken waar alleen tekst past: kaarttitel, indexrij, tabelgenerator.
function collectionRefinementSection(ix) {
  const refs = ix.refinements || [];
  const frag = document.createDocumentFragment();
  if (!refs.length) {
    // Vangnet: een intensie zonder uitgepakte refinements houdt de zin.
    frag.appendChild(h('span', { class: 'coll-phrase', text: ix.phrase }));
    return frag;
  }
  frag.appendChild(termHead('h4', 'coll.refinementSection'));
  const ul = h('ul', { class: 'clean coll-refinements' });
  for (const r of refs) {
    ul.appendChild(titleAsTip(h('li', { class: 'coll-refinement', title: constraintTitle(r) }, [
      constraintChips(r), constraintNote(r),
      r.iri ? verkenBtn(r.iri) : null, conditionGear(r),
    ].filter(Boolean))));
  }
  frag.appendChild(ul);
  return frag;
}

// Soortchip vóór een collectie-waarde: "Groep" (partijen) / "Verzameling"
// (assets). Klein en woordelijk — hij zegt de lezer WAT voor ding hier staat,
// zodat een naam als "medewerkers Burgerzaken" niet voor één partij wordt
// aangezien. De klassenaam zelf (odrl:PartyCollection) staat een verken-klik
// verder.
function collKindChip(kind) {
  const key = kind === 'party' ? 'coll.kindParty' : 'coll.kindAsset';
  return explainKey(h('span', { class: 'kind-pill coll', text: t(key) }), key);
}

// De verzameling WAARUIT een intensionele collectie snijdt (odrl:source), als
// waarde van het VELD "Bron": "‹soortchip› medewerkers van Gemeente Vlierdam".
// Zo'n bron is een gewoon gegeven van de collectie en leest daarom als elk
// ander veld van een regel-body (kopje links, waarde rechts) — vóór aug 2026
// was het een kopregel die de definitie inleidde.
// Zonder odrl:source is er niets te tonen: de collectie zelf ís dan de
// verzameling, en die staat al in de kop. Dan blijft het veld weg in plaats van
// de eigen naam te herhalen.
// odrl:source mag ook een string-literal zijn (DOME zet er runtime-sleutels
// als "urn:user" in): dan geen verken-knop op de bron.
function collectionSourceValue(src, kind) {
  return h('span', { class: 'coll-source-line' }, [
    collKindChip(kind),
    explained(h('span', { class: 'coll-source-name', text: src.label || src.curie || '' }),
      src.desc),
    src.iri ? verkenBtn(src.iri) : null,
  ].filter(Boolean));
}

// De body van een intensionele collectie: dezelfde opbouw als de body van een
// regelrij — eerst het WAT als veld (de bron), dan de sectiebalk met de
// afbakening, en tot slot een eventuele ledenlijst.
function collectionBody(desc, ix, kind, members, extraCls = '') {
  const box = h('div', { class: 'coll-body' + (extraCls ? ' ' + extraCls : '') });
  if (ix.source) box.appendChild(kv([[term('field.source'), collectionSourceValue(ix.source, kind)]]));
  box.appendChild(collectionRefinementSection(ix));
  if (members.length) box.appendChild(targetMembersFold(desc));
  return box;
}

// Weergave van een knoop die (ook) een collectie kan zijn — een target of een
// partij. Drie lagen, elk alleen als de data hem heeft:
//   1. de naam-tag. Bij een ANONIEME, puur intensionele collectie staat daar
//      het soortwoord ("elke partij"/"alle assets") in plaats van een naam:
//      "(anonieme PartyCollection)" was ruis, en de tag draagt dan zelf de
//      verken-knop.
//   2. de ledenlijst-fold-out bij opgesomde leden (extensioneel);
//   3. de refinement-chips met hun bronvermelding (intensioneel).
// Draagt de data beide vormen, dan verschijnen ze onder elkaar — er valt er
// nooit stilzwijgend één weg.
function collectionNodes(desc, tagFn) {
  const ix = desc.intension || null;
  const members = desc.members || [];
  const kind = desc.collKind || (ix && ix.kind) || 'asset';
  // Geen intensie: precies zoals voorheen — naam-tag met (bij leden) de
  // bestaande ledenuitklap eronder.
  if (!ix) {
    return [tagFn(desc.anon ? null : desc.iri),
      ...(members.length ? [targetMembersFold(desc)] : [])];
  }
  // ANONIEM: er is geen naam om een uitklap achter weg te klappen, dus staat de
  // body er direct — met de soortchip ervoor, want die zegt WAT hier staat.
  if (desc.anon) {
    return [collKindChip(kind), verkenBtn(desc.term),
      collectionBody(desc, ix, kind, members)].filter(Boolean);
  }
  // BENOEMD: de naam is wat de lezer hier zoekt; de afbakening eronder is
  // navraag. Dus ingeklapt, met dezelfde chevron-conventie als de ledenlijst
  // en een data-open-key zodat captureListUi/restoreListUi de open-staat
  // meeneemt over een herrender (taalwissel, filter, versiewissel).
  // Kop en body hebben de vorm van een regelrij: soortchip (het "regeltype" van
  // deze waarde), naam, IRI-chip, chevron — en daaronder velden en secties.
  const det = h('details', { class: 'coll-fold',
    'data-open-key': desc.iri ? 'colldef:' + desc.iri : null });
  det.appendChild(summaryEl({ class: 'vl-summary coll-summary' }, [
    collKindChip(kind),
    tagFn(desc.iri),
    h('span', { class: 'vl-chevron', text: '▸' }),
  ]));
  det.appendChild(collectionBody(desc, ix, kind, members, 'coll-fold-body'));
  return [det];
}

// --- De verplichtingen op SET-niveau, als context bij één regel -------------
// Een odrl:obligation op de POLICY geldt bij elke regel eronder; hij staat op
// de kaart één keer, als eigen rij of (bij odrl:inheritFrom) in de
// geërfd-vouw. Die lijst reist mee met elke regelrij, zodat de
// conformsToPolicy-uitklap op een voorwaarde kan vertellen wélke
// stelselverplichtingen die bundel invult (zie foldDuties).

// De verplichtingen die bij ELKE regel van deze policy gelden: haar eigen
// odrl:obligations plus die van haar voorouders (odrl:inheritFrom; ODRL 2.2
// §2.6 — ouder- en kindregels gelden samen). Per plicht reist de HERKOMST
// mee, zodat de regel kan zeggen dat zij van het stelsel komt en niet van dit
// beslispunt zelf.
function policyLevelDuties(pol) {
  if (!pol) return [];
  const out = (pol.obligations || []).map((duty) => ({ duty, from: null }));
  for (const g of pol.inherited || []) {
    for (const e of g.rules || []) {
      if (e.type !== 'obligation') continue;
      out.push({ duty: e.rule, from: g.title || g.curie || g.iri });
    }
  }
  return out;
}

// --- Toestemmings-rij (operation-rij) ---------------------------------------
// ownerAssignee: de (effectieve) afnemer van de omvattende policy; de rij
// toont zijn eigen odrl:assignee alleen als die daarvan afwijkt of de policy
// er geen heeft (BRP-patroon: assignee op de Permission).
// nameOverride/levelIri: gezet door de geneste weergave (zie ruleNodes). De
// rij heet dan naar zijn plek in de groep — de variantnaam of de waarde van het
// niveau. Het WOORD op de chip blijft altijd het regeltype.
// shownDims: de left-operand-IRI's die een omhullende groepsrij al toont; hun
// samenvattingsveld blijft hier weg (de voorwaardenlijst eronder houdt ze wél,
// dus er verdwijnt niets uit het verslag van de regel).
function permissionRow(p, {
  prohibition = false, ownerAssignee = null, mark = null,
  nameOverride = null, nameCurie = null,
  levelIri = null, levelName = null, shownDims = null,
  // De verplichtingen die bij élke regel van de omvattende policy gelden
  // (eigen of geërfd) — zie policyLevelDuties — en de IRI van die policy, de
  // scope waarop de keten-mededelingen filteren. Beide reizen door naar de
  // conformsToPolicy-uitklap op de voorwaarde-rijen.
  setDuties = null, scope = null,
} = {}) {
  // Titel-terugval, generiek: eerst de eigen dct:title, dan (in een groep) de
  // waarde van het binnenste niveau, dan het ACTIE-label — met de gegevensset
  // erbij als er precies één target is. Vóór aug 2026 stond hier het
  // doel-label; dat liet de doelbinding twee keer spreken (kop én Doel-veld)
  // en vertelde nooit wát de regel toestaat. Een eigen dct:title wint van de
  // afgeleide variantnaam uit de groepering: de auteur formuleerde die naam
  // voor de lezer ("… zonder diplomatieke kentekens"), de variantnaam is een
  // machinale samenvatting van refinement-waarden ("… · false").
  const title = p.title || nameOverride || actionTitle(p)
    || (prohibition ? t('title.prohibition') : t('title.permission'));
  // Rijtype = kleur = badgewoord: één begrip, drie verschijningsvormen.
  const kind = ruleKind(p, prohibition);
  const shown = new Set(shownDims || []);
  const purposeShown = !!(p.purpose && shown.has(PURPOSE_LEFT_OPERAND));
  const row = h('details', { class: 'op-row ' + kind, 'data-iri': p.iri || null });
  // De chip benoemt het RIJTYPE (zoals "verplichting" bij duties) — de actie
  // zelf staat als veld in de body. Voorheen stond hier het actie-label, wat
  // bij BRP de kanaalnaam uit de titel dupliceerde.
  // data-ref op de KOP (niet op de hele rij): de dekkingsuitklap dupliceert
  // precies deze kop, dus dat is ook wat oplicht.
  row.appendChild(refSource(summaryEl({ class: 'op-summary' }, [
    ruleBadge(kind),
    h('span', { class: 'op-title', title }, [
      h('span', { class: 'op-name', text: title }),
      // De curie hoort bij de naam die de rij DRAAGT: in een groep is dat de
      // waarde van het niveau. Daarbuiten draagt de rij haar eigen titel of het
      // actielabel, en is er geen curie die daar iets aan toevoegt.
      nameCurie && !/^https?:/.test(nameCurie)
        ? h('span', { class: 'op-path mono muted', text: nameCurie }) : null,
      mark ? h('span', { class: 'op-path muted herkomst', text: mark }) : null,
    ]),
    coverageStatusChip(p, { scope }),
    levelIri ? verkenBtn(levelIri, levelName) : null,
    verkenBtn(p.iri || p.term),
    chevron(),
  ].filter(Boolean)), p.iri));

  const body = h('div', { class: 'op-body' });
  if (p.description) body.appendChild(h('p', { class: 'rule-desc' }, [longText(p.description)]));
  // Eerst het WAT (doel + gegevens), daarna de voorwaarden — zo scheiden de
  // secties visueel en leest de rij van boven naar beneden.
  const pairs = [];
  if (p.assignee && (!ownerAssignee || p.assignee.iri !== ownerAssignee.iri)) {
    pairs.push([term('field.assignee'), ref(p.assignee)]);
  }
  // De actie expliciet in de body (de chip toont sinds de rijtype-wissel
  // niet meer het actie-label); alleen als hij niet al de titel ís.
  if (p.action && p.action.label !== title) {
    pairs.push([term('field.action'), h('span', {}, [
      explained(h('span', { text: p.action.label }), p.action.desc),
      p.action.iri ? verkenBtn(p.action.iri) : null,
    ])]);
  }
  if (p.purpose && !purposeShown) {
    // Volle URI's zijn ruis naast een goed label: toon alleen een echte
    // curie (brongedreven prefixen, bv. apdoel:); anders blijft de IRI
    // bereikbaar via de verken-knop.
    const pc = p.purpose.curie && !/^https?:/.test(p.purpose.curie) ? p.purpose.curie : '';
    pairs.push([term('field.purpose'), h('span', { 'data-iri': p.purpose.iri || null }, [
      explained(h('span', { text: p.purpose.label }), p.purpose.desc), ' ',
      pc ? h('span', { class: 'mono muted', text: pc }) : null,
      verkenBtn(p.purpose.iri),
    ])]);
  }
  if (p.targets.length) {
    // Naast de collectietitel zijn ook de LEDEN van een target-gegevensset
    // in te zien (dct:hasPart, BRP: rubrieken/groepen/categorieën): een
    // ingeklapte fold-out met telling, gegroepeerd op rdf:type van de leden.
    const val = h('span', { class: 'targets' });
    for (const tgt of p.targets) {
      // Een anonieme collectie (DOME zet hem als blanke knoop in de regel)
      // heeft geen IRI om op te hangen: dan de TERM, en
      // geen data-iri/title met een intern parser-id.
      // De naam-tag houdt haar native title (de volle IRI); de UITLEG hangt
      // aan de naamtekst binnenin, zodat de twee elkaar niet in de weg zitten.
      const nodes = collectionNodes(tgt, (iri) => titleAsTip(h('span',
        { class: 'target-tag', title: iri, 'data-iri': iri || null },
        [explained(h('span', { text: tgt.label }), tgt.desc), verkenBtn(iri || tgt.term)])));
      for (const n of nodes) val.appendChild(n);
    }
    pairs.push([term('field.target'), val]);
  }
  // De vindplaats sluit de rij af: eerst WAT de regel toestaat, dan waar hij
  // in het besluit staat.
  const vindplaats = sourceLocationValue(p.primarySources);
  if (vindplaats) pairs.push([term('field.sourceLocation'), vindplaats]);
  if (pairs.length) body.appendChild(kv(pairs));
  const allConstraints = [...(p.constraints || []), ...(p.refinements || [])];
  // De doelbinding is óók een voorwaarde (het is een purpose-refinement) —
  // toon hem daarom bovenaan tussen de voorwaarden, naast het Doel-veld dat
  // de identiteit van de rij geeft.
  if (p.purpose) {
    // De doelbinding als voorwaarde-rij. Is de doel-refinement BENOEMD, dan is
    // zij ook aanhaalbaar en dekbaar: iri/term/coveredBy komen mee, zodat deze
    // rij net als elke andere haar ⌕- en ⚙-knop krijgt.
    const pc = p.purposeConstraint || {};
    allConstraints.unshift({
      // De doelbinding is een gewone voorwaarde-rij, dus dragen haar DRIE chips
      // alle drie hun uitleg (note §1) — net als bij een rij die wél door
      // constraintSentence is gebouwd. Links odrl:purpose uit de meegeleverde
      // kernbundel (vocabulaire-neutraal: de ODRL-betekenis van "doel", niet de
      // invulling die dit profiel eraan geeft), rechts het doel zelf uit de data.
      slots: {
        left: { text: t('left.purpose'), desc: keyDesc('left.purpose') },
        operator: {
          text: p.purpose.operatorWord || t('op.eq'),
          desc: p.purpose.operatorDesc || '',
        },
        right: { texts: [p.purpose.label], descs: [p.purpose.desc || ''] },
      },
      iri: pc.iri || null, term: pc.term || null,
      label: pc.label || null, comment: pc.comment || null,
      coveredBy: pc.coveredBy || null, fulfils: pc.fulfils || null,
      // …en de volgende stap in de keten. Zonder dat veld zou juist de
      // DOELBINDING — het beslispunt dat het vaakst wordt afgedwongen — de
      // enige voorwaarde-rij zijn zonder raderwiel.
      next: pc.next || null,
      // …en de marker: een doel-refinement MAG organisatorisch geborgd zijn, en
      // dan hoort deze rij hetzelfde gedempte merk te dragen als elke andere.
      organisational: !!pc.organisational,
      unknownProps: [],
    });
  }
  const cs = constraintsSection(allConstraints, {
    rule: p, ctx: { duties: setDuties, scope, kind, title },
  });
  if (cs) body.appendChild(cs);
  if (p.duties && p.duties.length) {
    body.appendChild(termHead('h4', 'head.duties'));
    body.appendChild(dutyList(p.duties));
  }
  const xp = extraPropsBlock(p.extraProps);
  if (xp) {
    body.appendChild(h('h4', { text: t('head.otherProps') }));
    body.appendChild(xp);
  }

  // Het vroegere inklapbare "Bronfragment (Turtle)"-blok is vervangen door de
  // verken-knop (RDF-verkenner) op de rij-kop.
  // Niets uit te klappen (bv. een kale prohibition waarvan de actie al de
  // titel is): markeer als blad — CSS verbergt de chevron en de klik-preventer
  // hieronder houdt de loze toggle tegen.
  if (!body.children || !body.children.length) row.className += ' op-leaf';
  row.appendChild(body);
  return row;
}

// --- Meescrollen bij uitklappen ---------------------------------------------
// Klap je onderin het scherm een kaart of groepsrij open, dan valt de nieuwe
// inhoud onder de vouw en zie je niets gebeuren. De pagina schuift daarom mee —
// maar nooit zó ver dat de KOP van wat je net opende uit beeld raakt. Bij een
// lange kaart zie je dus de bovenkant plus zoveel mogelijk inhoud; bij een
// korte kaart precies genoeg om de onderkant binnen te halen.
//
//   doel = min(kaarttop − marge onder een sticky topbar,
//              huidige scroll + (kaartonderkant − viewportonderkant))
//
// en er wordt alléén gescrold als die onderkant daadwerkelijk buiten beeld valt.
const EXPAND_SCROLL_MARGIN = 12;

// Het rekenwerk apart en zuiver, zodat de unit-test hem zonder DOM kan toetsen.
// `top`/`bottom` zijn viewport-relatief (getBoundingClientRect). Retourneert de
// gewenste scrollY, of null als er niets te doen is.
export function expandScrollTarget({
  top, bottom, scrollY = 0, viewportHeight = 0,
  headerOffset = 0, margin = EXPAND_SCROLL_MARGIN,
}) {
  if (!viewportHeight || bottom <= viewportHeight) return null;
  const wantTop = scrollY + top - headerOffset - margin;
  const wantBottom = scrollY + (bottom - viewportHeight);
  const target = Math.max(0, Math.min(wantTop, wantBottom));
  return Math.abs(target - scrollY) < 2 ? null : target;
}

// Waarvoor het geldt: de hoofdkaarten (aanbod/overeenkomst/set) en de
// groepsrijen van de dimensieweergave. Losse regelrijen niet: die zijn klein
// genoeg om zonder sprong te lezen.
function isExpandScrollTarget(el) {
  const cls = String((el && el.className) || '').split(/\s+/);
  return cls.includes('agr-group') || cls.includes('offer-group')
    || (cls.includes('op-row') && cls.includes('niveau'));
}

// Hoogte van een eventuele STICKY/vaste topbar: die dekt de bovenkant van de
// kaart af en telt dus mee in de marge. Staat de topbar gewoon in de flow
// (huidige doc.css), dan is de offset 0.
function stickyHeaderOffset() {
  if (typeof document === 'undefined' || !document.querySelector) return 0;
  const bar = document.querySelector('.doc-topbar');
  if (!bar || !bar.getBoundingClientRect) return 0;
  const pos = typeof getComputedStyle === 'function' ? getComputedStyle(bar).position : '';
  if (pos !== 'sticky' && pos !== 'fixed') return 0;
  const r = bar.getBoundingClientRect();
  return r.bottom > 0 ? r.bottom : 0;
}

function applyExpandScroll(el) {
  const r = el.getBoundingClientRect();
  const target = expandScrollTarget({
    top: r.top,
    bottom: r.bottom,
    scrollY: window.scrollY || 0,
    viewportHeight: window.innerHeight || 0,
    headerOffset: stickyHeaderOffset(),
  });
  if (target == null) return;
  // Altijd geanimeerd — een instant sprong laat de lezer zoeken waar hij is
  // gebleven. Enige uitzondering is de toegankelijkheidsnorm: wie
  // prefers-reduced-motion aan heeft staan, krijgt de sprong wél instant.
  const reduce = prefersReducedMotion();
  try {
    window.scrollTo({ top: target, left: window.scrollX || 0, behavior: reduce ? 'auto' : 'smooth' });
  } catch (e) {
    window.scrollTo(0, target);
  }
}

// De lazy routes (ensureStubContent/ensureDetail) vullen de body pas ná het
// toggle-event; zolang de skeleton-spinner draait of de hoogte nog groeit, is
// de kaart niet af en zou er op een verkeerde maat gescrold worden. Wachten dus
// tot de hoogte twee frames stilstaat en er geen spinner meer in staat.
function scheduleExpandScroll(el) {
  if (typeof window === 'undefined' || !window.scrollTo || !el.getBoundingClientRect) return;
  const raf = typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame : (fn) => setTimeout(fn, 16);
  let last = -1;
  let tries = 0;
  const step = () => {
    const height = el.getBoundingClientRect().height;
    const busy = el.querySelector && el.querySelector('.card-loading');
    if ((height !== last || busy) && tries < 60) { last = height; tries++; raf(step); return; }
    applyExpandScroll(el);
  };
  raf(step);
}

// `toggle` bubbelt niet: vangen in de CAPTURE-fase, één listener voor de hele
// pagina in plaats van één per kaart.
if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('toggle', (ev) => {
    const el = ev && ev.target;
    if (!el || !el.open || !isExpandScrollTarget(el)) return;
    scheduleExpandScroll(el);
  }, true);
  // Blad-regels (op-leaf): niets uit te klappen — houd de loze toggle tegen,
  // maar laat knoppen/links op de rij gewoon werken.
  document.addEventListener('click', (ev) => {
    const t0 = ev && ev.target;
    if (!t0 || !t0.closest) return;
    if (t0.closest('button, a')) return;
    const sum = t0.closest('.op-row.op-leaf > summary');
    if (sum) ev.preventDefault();
  }, true);
}

// --- Geneste regelweergave (qb:DimensionProperty) ------------------------------
// De bron zegt welke refinement-dimensies de regels ordenen (parse.js:
// groupRules); hier worden de knopen die dat oplevert rijen. Zonder declaratie
// in de bron is `groupRules` de identiteit en verandert er niets: elke regel
// blijft de rij die hij was.
const PURPOSE_LEFT_OPERAND = PROFILE_PATTERNS.purposeLeftOperand;

// --- Pivot: welke dimensies groeperen, en in welke volgorde ------------------
// De BRON declareert welke refinement-dimensies de regels ordenen en in welke
// volgorde ze nesten (sh:order, zie parse.js). De LEZER bepaalt wat hij daarvan
// aanzet: elke dimensie kan uit (dan verdwijnt dat niveau) en de volgorde
// waarin hij ze aanzet is de nestvolgorde — "per doel de doelgroepen" of "per
// doelgroep de doelen", of gewoon een platte lijst. Dezelfde regels, andere as.
//
// Die keuze staat in de adresbalk (?groupby=<curie>,<curie>, buitenste eerst),
// volgens hetzelfde replaceState-patroon als ?src=/?status=/?lang=, zodat een
// gefilterde en anders gegroepeerde tabel deelbaar is. Drie standen, en het
// verschil tussen de eerste twee is precies wat de lezer bedoelde:
//   - parameter AFWEZIG      -> de gedeclareerde volgorde (alles aan);
//   - parameter LEEG (?groupby=) -> alles uit: platte lijst;
//   - parameter met namen    -> die dimensies, in die nestvolgorde.
//
// De parameter is ADVIES, geen bevel: onbekende namen worden genegeerd
// (pivotDimensions). Een verouderde link maakt de lijst hooguit platter, nooit
// stuk.
//
// De keuze zelf leeft in state.groupBy, niet in de adresbalk: de URL wordt bij
// boot ÉÉN keer gelezen en daarna alleen beschreven. Dat is hetzelfde patroon
// als de filterkeuzes (die in hun control leven) en het is wat de keuze een
// taalwissel of herrender laat overleven — die bouwen de DOM opnieuw op maar
// laten state staan.
function groupByFromUrl() {
  const p = new URLSearchParams(location.search);
  if (!p.has('groupby')) return null;
  return String(p.get('groupby') || '').split(',').map((s) => s.trim()).filter(Boolean);
}

// Alle dimensies die de bron declareert, in gedeclareerde volgorde — dat is de
// rij chips, ongeacht wat er aanstaat.
function declaredDimensions() {
  return pivotDimensions((state.model && state.model.groupingDimensions) || [], null);
}

// De dimensies die NU nesten, in nestvolgorde. Leeg = platte lijst.
function activeDimensions() {
  const dims = (state.model && state.model.groupingDimensions) || [];
  return pivotDimensions(dims, state.groupBy);
}

// De leeskeuze naar de URL. Is hij gelijk aan de bronvolgorde, dan verdwijnt de
// parameter weer: de adresbalk draagt alleen wat de lezer ECHT anders wilde.
// Alles uit schrijft de parameter LEEG weg — anders zou een gedeelde platte
// lijst bij de ontvanger weer gegroepeerd opengaan.
function groupByToUrl(dims) {
  if (typeof history === 'undefined' || !history.replaceState) return;
  const decl = declaredDimensions();
  const same = decl.length === dims.length && decl.every((d, i) => d.iri === dims[i].iri);
  const u = new URLSearchParams(location.search);
  if (same) u.delete('groupby');
  else u.set('groupby', dims.map((d) => d.curie || d.iri).join(','));
  history.replaceState(null, '', u.toString() ? '?' + u.toString() : location.pathname);
}

// Een dimensie aan- of uitzetten en de pagina opnieuw opbouwen. Uitzetten haalt
// hem uit de volgorde (de rest schuift op); aanzetten hangt hem achteraan, dus
// als binnenste niveau — de activeringsvolgorde IS de nestvolgorde.
//
// De regelrijen zitten diep in de kaarten en worden lui gebouwd; een gerichte
// hertekening zou de helft missen. Daarom dezelfde route als de taalwissel:
// gebruikersstaat vastleggen, alles hertekenen, staat terugzetten
// (captureListUi/restoreListUi). Het model blijft staan — er verandert niets
// aan de data, alleen aan de leesorde.
async function applyGroupBy(next) {
  state.groupBy = next.map((d) => d.curie || d.iri);
  groupByToUrl(next);
  const ui = captureListUi();
  applyScopeAndRender(undefined);
  await restoreListUi(ui);
}

// Eén niveau weghalen (de rest schuift op) of er een achteraan hangen (als
// binnenste niveau) — de twee handelingen die het leespad aanbiedt.
function removeGroupDim(dim) {
  return applyGroupBy(activeDimensions().filter((d) => d.iri !== dim.iri));
}
function addGroupDim(dim) {
  const active = activeDimensions();
  if (active.some((d) => d.iri === dim.iri)) return Promise.resolve();
  return applyGroupBy([...active, dim]);
}

// Wijkt de groepering af van wat de bron declareert? Bepaalt of het
// wis-kruisje van het filterpaneel verschijnt en of de trechter accent kleurt:
// een afwijkende weergave mag niet onzichtbaar zijn in een dichtgeklapt paneel.
function groupByIsCustom() {
  const decl = declaredDimensions();
  const act = activeDimensions();
  return decl.length !== act.length || decl.some((d, i) => d.iri !== act[i].iri);
}

// Terug naar de bronvolgorde (het wis-kruisje wist ook de groepering).
function resetGroupBy() {
  return applyGroupBy(declaredDimensions());
}

// Het telwoord bij een groepskop: in het regeltype-woord zelf ("5
// toestemmingen"), zodat de kop meteen zegt hoeveel van WAT eronder hangt.
// Vóór aug 2026 stond hier "5 varianten" — een woord dat niets zei over wat de
// rijen zijn en dat bij één regel helemaal wegviel. Is een groep gemengd, dan
// valt het terug op het neutrale "n regels".
function groupCount(rules, prohibition) {
  const list = rules || [];
  if (!list.length) return null;
  const kinds = new Set(list.map((r) => ruleKind(r, prohibition)));
  return kinds.size === 1
    ? t(RULE_NOUN_KEYS[[...kinds][0]], { n: list.length })
    : t('rules.count', { n: list.length });
}

// Eén knoop uit groupRules als DOM. `shownDims` zijn de dimensies die de
// omhullende rijen al tonen.
function ruleNode(node, opts, shownDims) {
  if (node.kind === 'rule') {
    return permissionRow(node.rule, {
      ...opts,
      // Alleen de NAAM komt uit de groep (de waarde van het binnenste niveau);
      // het woord op de chip is en blijft het regeltype.
      nameOverride: node.label,
      shownDims,
    });
  }
  const deeper = [...shownDims, node.dim.iri];
  // Vóór aug 2026 vouwde een niveau met precies één regel samen tot één rij.
  // Dat is VERVALLEN (besluit eigenaar): een groep met één regel krijgt
  // dezelfde groepskaart als een groep met vijf, zodat dezelfde structuur er
  // overal hetzelfde uitziet.
  // De GROEPSRIJ benoemt het niveau met het label van de DIMENSIE (dat komt uit
  // de data, niet uit code) en draagt de kleur van het regeltype eronder.
  const kind = ruleKind(node.rules[0], opts.prohibition);
  const row = h('details', { class: 'op-row ' + kind + ' niveau', 'data-iri': node.value.iri || null });
  const count = groupCount(node.rules, opts.prohibition);
  row.appendChild(summaryEl({ class: 'op-summary' }, [
    h('span', { class: 'method ' + kind, text: node.dim.label }),
    h('span', { class: 'op-title', title: node.value.label }, [
      h('span', { class: 'op-name', text: node.value.label }),
      node.value.curie && !/^https?:/.test(node.value.curie)
        ? h('span', { class: 'op-path mono muted', text: node.value.curie }) : null,
    ]),
    count ? h('span', { class: 'op-sum muted', text: count }) : null,
    verkenBtn(node.value.iri),
    chevron(),
  ]));
  const body = h('div', { class: 'op-body' });
  const list = h('div', { class: 'op-list' });
  for (const child of node.children) list.appendChild(ruleNode(child, opts, deeper));
  body.appendChild(list);
  row.appendChild(body);
  return row;
}

// De regels van één policy als (eventueel geneste) rijen.
function ruleRows(rules, opts = {}) {
  return groupRules(rules, activeDimensions()).map((n) => ruleNode(n, opts, []));
}

// Regels van een overeenkomst, gegroepeerd per overeengekomen aanbod:
// subsecties wanneer de overeenkomst meer dan één aanbod invult (de
// kanaal-action van elke permission bepaalt bij welk aanbod hij hoort).
function agreementOps(agr, offerLink) {
  const frag = document.createDocumentFragment();
  const ops = (rows) => { const box = h('div', { class: 'op-list' }); rows.forEach((n) => box.appendChild(n)); return box; };
  // De doorwerkende regels (alle typen) vouwen samen in één aanbodrij; wat
  // overblijft zijn de eigen regels van deze overeenkomst.
  const split = offerRuleSplit(state.model, agr);
  const inh = inheritFoldRows(agr, { ownerAssignee: agr.assignee });
  if (inh.length) {
    const box = h('div', { class: 'op-list' });
    for (const r of inh) box.appendChild(r);
    frag.appendChild(box);
  }
  if (split.fromOffer.length || split.own.obligations.length) {
    frag.appendChild(offerFoldBlock(split, offerLink, { ownerAssignee: agr.assignee }));
  }
  const instOffers = (agr.offers || [])
    .map((iri) => byIri(state.model.offers, iri)).filter(Boolean);
  const perms = split.own.permissions;
  if (instOffers.length > 1) {
    const rest = new Set(perms);
    for (const off of instOffers) {
      // Eerst de EXPLICIETE herkomst (prov:wasDerivedFrom van de regel naar
      // het aanbod of naar een regel daarin) — dat is de idiomatische
      // route: de relatie als data. De action-match is slechts een fallback voor
      // grafen zonder regel-herkomst (betrouwbaar onder de kanaal-conventie).
      const offRuleIris = new Set((off.permissions || []).map((op) => op.iri).filter(Boolean));
      const actions = new Set((off.permissions || [])
        .map((op) => op.action && op.action.iri).filter(Boolean));
      const mine = perms.filter((pp) => {
        const df = pp.derivedFrom || [];
        if (df.includes(off.iri) || df.some((iri) => offRuleIris.has(iri))) return true;
        if (df.length) return false; // expliciete herkomst wijst elders heen
        return pp.action && actions.has(pp.action.iri);
      });
      if (!mine.length) continue;
      mine.forEach((pp) => rest.delete(pp));
      frag.appendChild(h('div', { class: 'agr-offer-sec' }, [t('agr.onOffer'), offerLink(off)]));
      frag.appendChild(ops(ruleRows(mine, { ownerAssignee: agr.assignee })));
    }
    if (rest.size) {
      frag.appendChild(h('div', { class: 'agr-offer-sec', text: t('agr.otherPermissions') }));
      frag.appendChild(ops(ruleRows([...rest], { ownerAssignee: agr.assignee })));
    }
  } else if (perms.length) {
    frag.appendChild(ops(ruleRows(perms, { ownerAssignee: agr.assignee })));
  }
  if (split.own.prohibitions.length) {
    frag.appendChild(ops(ruleRows(split.own.prohibitions, { prohibition: true, ownerAssignee: agr.assignee })));
  }
  return frag;
}

// --- Overeenkomst-groep (Swagger-tag-stijl: kop, geen kaart-in-kaart) --------

// De body van één overeenkomst-groep (metadata + regels), los van de summary,
// zodat hij ook lazy gebouwd kan worden (grote corpora, ?sparql=-modus).
function agreementBody(agr, offerLink) {
  const body = h('div', { class: 'agr-body' });
  if (agr.description) body.appendChild(h('p', { class: 'agr-desc muted' }, [longText(agr.description)]));
  // Vervangt (prov:wasRevisionOf) en Afgeleid van (prov:wasDerivedFrom) als
  // aparte velden; besluit-PDF's als klikbare links met gedecodeerd label.
  // Het gekoppelde aanbod staat al in de aanbod-sectie zelf; laat het uit
  // "Afgeleid van" (daar blijft het bron-besluit/de grondslag over).
  // Drie soorten wasDerivedFrom-doelwitten, elk met een eigen weergave: het
  // ingevulde AANBOD (eigen sectie), het VERZOEK (de Verzoek-regel hieronder)
  // en al het overige — het bron-besluit/de grondslag, die in "Afgeleid van"
  // overblijft.
  const reqIris = requestIriSet(agr);
  const df = (agr.version.derivedFrom || [])
    .filter((d) => !(agr.offers || []).includes(d.iri) && !reqIris.has(d.iri));
  body.appendChild(kv([
    [term('field.assignee'), agr.assignee ? ref(agr.assignee) : null],
    [term('field.issued'), agr.issued],
    [term('field.replaces'), provRefNode(agr.version.revisionOf)],
    [term('field.derivedFrom'), derivedFromValue(df)],
    [t('field.request'), requestValue(agr.requests)],
    [term('field.reference'), identifierValue(agr)],
  ]));
  const vl = versionLine({ ...agr.version, revisionOf: null, derivedFrom: [] });
  if (vl) body.appendChild(vl);
  const xp = extraPropsBlock(agr.extraProps);
  if (xp) body.appendChild(xp);
  body.appendChild(agreementOps(agr, offerLink));
  return body;
}

// lazy: false (kleine corpora) = open groep met direct gebouwde body (de
// oorspronkelijke weergave); lazy: true (sectie op schaal) = ingeklapte groep
// waarvan de body pas bij de eerste uitklap gebouwd wordt — in ?sparql=-modus
// wordt dan eerst het detail geCONSTRUCT (zelfde route als de set-kaarten).
function agreementGroup(agr, anchorId, offerLink, { lazy = false } = {}) {
  const group = h('details', { class: 'agr-group', id: anchorId, 'data-iri': agr.iri || null });
  if (!lazy) group.setAttribute('open', '');
  let shown = agr;      // de getoonde versie (wisselbaar via de navigator)
  let built = false;    // lazy: is de body van de getoonde versie er al?

  const buildBody = async () => {
    if (built) return;
    built = true;
    const holder = h('div', { class: 'card-body-holder' });
    group.appendChild(holder);
    let pol = shown;
    // Kaart van een beëindigd besluit: de kaart zelf IS een stub-versie, dus
    // zijn regels komen uit de bron-datalaag (zie ensureStubContent).
    if (stubNeedsContent(pol)) {
      holder.appendChild(cardLoading());
      try {
        const v = await ensureStubContent(pol.iri);
        holder.innerHTML = '';
        if (v) { fill(stubPolicy(v)); return; }
      } catch (e) {
        holder.innerHTML = '';
        holder.appendChild(h('p', { class: 'src-err', text: t('err.detailLoad', { msg: e.message }) }));
        built = false; // opnieuw proberen bij de volgende uitklap
        return;
      }
    }
    if (needsSparqlDetail(pol)) {
      holder.appendChild(cardLoading());
      try {
        await ensureDetail(pol.iri);
        pol = byIri(state.model.agreements, pol.iri) || pol;
      } catch (e) {
        holder.innerHTML = '';
        holder.appendChild(h('p', { class: 'src-err', text: t('err.detailLoad', { msg: e.message }) }));
        built = false; // opnieuw proberen bij de volgende uitklap
        return;
      }
      holder.innerHTML = '';
      // Het detail bracht óók de versiehistorie van deze policy mee: herbouw
      // de KOP, zodat de versienavigator zijn pijlen krijgt (de skelet-graaf
      // uit de lijst-SELECT kent alleen de getoonde versie).
      if (shown.iri === pol.iri) { fill(pol); return; }
    }
    if (shown.iri === pol.iri) holder.appendChild(agreementBody(pol, offerLink));
  };

  // (Her)vul de groep voor één versie: kop + body. Zo wisselt de
  // versienavigator de kaart zonder de open/dicht-stand kwijt te raken.
  const fill = (a) => {
    shown = a;
    built = false;
    group.innerHTML = '';
    // De kaart draagt de IRI van de GETOONDE versie (revealInUi zoekt hierop).
    if (a.iri) group.setAttribute('data-iri', a.iri);
    // Geen regeltelling in de kop (beslissing eigenaar): "3 regels"/"1
    // toestemming" leidt af van titel, afnemer en versie — de regels staan er
    // direct onder.
    group.appendChild(cardSummary('agr-summary', [
      h('span', { class: 'agr-titles' }, [
        h('span', { class: 'agr-title', text: a.title }),
        a.anon ? null : versionStatusChip(a.iri),
        // Alleen tonen als de titel de afnemersnaam niet al draagt — sinds de
        // titelopschoning ÍS de agreement-titel vaak de afnemersnaam.
        a.assignee && a.assignee.label && !a.title.includes(a.assignee.label)
          ? h('span', { class: 'agr-assignee muted', text: a.assignee.label }) : null,
      ]),
      verkenBtn(a.anon ? a.term : a.iri),
      a.anon ? null : versionNav(a.iri, (iri, v) => {
        const next = byIri(state.model.agreements, iri) || (v && v.stub ? stubPolicy(v) : null);
        if (next) fill(next);
      }),
      chevron(),
    ]));
    if (!lazy) { built = true; group.appendChild(agreementBody(a, offerLink)); }
    else if (group.open) buildBody();
  };

  if (lazy) group.addEventListener('toggle', () => { if (group.open) buildBody(); });
  // Hook voor revealInUi (zie setsCardsView): body direct bouwen, niet via het
  // toggle-event dat in de browser pas async vuurt.
  group.odrlOpenBody = buildBody;
  fill(agr);
  return group;
}

// --- Sectiefilter: ALLE filters van een lijstsectie achter één trechter ------
// Ontwerp (aug 2026, beslissing eigenaar). Voorheen stond een trechtertje voor
// het STATUSfilter náást een altijd zichtbaar tekstveld — dubbelop. Nu draagt
// de SECTIEKOP rechts één trechter-icoon; dat toont/verbergt een filterpaneel
// direct onder de kop waarin alle filters van die sectie bijeen staan:
//   - een tekstveld (titel/afnemer, pure filterIndexRows/filterRefItems);
//   - bij de Overeenkomsten-sectie een AANBOD-keuze (dropdown) — voorheen werd
//     de aanbodtitel in het tekstveld gepropt door de telling-link op een
//     Offer-kaart; dat veld is nu weer vrij voor echte zoekopdrachten;
//   - een LEVENSFASE-keuze (dropdown): "(alle)" plus actief / beëindigd /
//     toekomstig — de neutrale enum uit parse.js, zie policyLifecycle. Sinds
//     aug 2026 een select in plaats van drie selectievakjes: die namen met hun
//     drie meervoudswoorden de halve paneelbreedte voor een keuze die in de
//     praktijk één van vier standen is. Zie sectionFilterControl voor wat dat
//     doet met de ?status=-combinaties (kort: bestaande links blijven werken);
//   - de GROEPEER-chips, als de bron groeperingsdimensies declareert: één
//     aan/uit-chip per dimensie, met het niveaunummer op wat aanstaat
//     (zie pivotItem).
// De filters combineren met EN. Het paneel staat standaard DICHT; het icoon
// kleurt accent zodra er een filter aanstaat en de "x van y"-teller staat
// ALTIJD op de sectiekop (ook als het paneel dicht is en zelfs als de sectie
// zelf is ingeklapt), inclusief het "· aanbod: …"/"· alleen actieve"-suffix.
// Rechtsboven in het paneel zit het ×-knopje dat alles wist, alleen zichtbaar
// als er iets te wissen valt.
// URL-persistentie (zelfde replaceState-patroon als ?src=): ?status=active,
// terminated voor de levensfasen, ?aanbod=<IRI> voor de aanbodkeuze en
// ?groupby=<curie>,<curie> voor de groepering, zodat een gefilterde en anders
// gegroepeerde lijst deelbaar is; ontbreken ze, dan staat alles aan en geldt de
// bronvolgorde.
const LIFECYCLES = ['active', 'terminated', 'future'];

function statusFromUrl() {
  const raw = new URLSearchParams(location.search).get('status');
  if (!raw) return null;
  const want = raw.split(',').map((s) => s.trim()).filter((s) => LIFECYCLES.includes(s));
  return want.length ? new Set(want) : null;
}

function offerFromUrl() {
  return new URLSearchParams(location.search).get('aanbod') || '';
}

// Filterkeuzes naar de URL. `withOffer` zegt of DEZE sectie de ?aanbod=-
// parameter beheert (alleen de Overeenkomsten-sectie heeft die dropdown); de
// Beleidssets-sectie mag hem dus niet wegschrijven.
function filterToUrl(selected, offerIri, withOffer) {
  if (typeof history === 'undefined' || !history.replaceState) return;
  const u = new URLSearchParams(location.search);
  if (selected.size === LIFECYCLES.length) u.delete('status');
  else u.set('status', LIFECYCLES.filter((s) => selected.has(s)).join(','));
  if (withOffer) {
    if (offerIri) u.set('aanbod', offerIri); else u.delete('aanbod');
  }
  history.replaceState(null, '', u.toString() ? '?' + u.toString() : location.pathname);
}

// Trechter als kleine inline-SVG (currentColor, dus themavariabelen volgen).
const FUNNEL_SVG = '<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" '
  + 'focusable="false"><path d="M1.5 2.5h13L9.5 8.6v4.3l-3 1.6V8.6z" fill="currentColor"/></svg>';

// --- Groepeerpad in het filterpaneel -----------------------------------------
// Het filterpaneel bepaalt WELKE kaarten je ziet; dit pad bepaalt hoe de regels
// BINNEN die kaarten genest zijn. Dat hoort bij elkaar: het is dezelfde vraag
// ("wat wil ik zien, en hoe geordend?") en het is de enige fold-out op de
// sectiekop, dus de lezer hoeft er geen tweede te leren kennen.
//
// Achter "Groepeer" staat het LEESPAD: alleen de ACTIEVE dimensies, als chips
// in nestvolgorde met "›" ertussen — links is buitenste. Elke chip draagt een
// klein × dat hem uit het pad haalt (de rest schuift op). Daarachter een
// +-chip zolang er dimensies uitstaan: die hangt er een achteraan, dus als
// binnenste niveau. Alles weggehaald is een geldige stand: de platte lijst,
// en dan staat er alleen nog de +.
//
// Waarom een pad en geen rij aan/uit-knoppen met volgnummers (aug 2026, na de
// draaiknop en na de genummerde chips): de VOLGORDE is de helft van de
// betekenis, en die lees je het snelst als hij er ook als volgorde staat.
// Nummers naast uitgezette knoppen dwongen de lezer het pad zelf in elkaar te
// zetten.
//
// Bij meer dan één uitgezette dimensie opent de + een klein menu met hun
// labels; bij precies één valt er niets te kiezen en voegt de + hem meteen toe.
// Escape en een klik buiten sluiten het menu (zie closeDimMenu).
//
// Bij NUL gedeclareerde dimensies staat er niets: een gewone ODRL-bron zonder
// qb:DimensionProperty ziet het paneel precies zoals het was.

// Er kan er maar ÉÉN open zijn: het menu hangt aan de +-chip van een paneel en
// een tweede paneel is een tweede sectie. Module-breed, zodat Escape en een
// klik buiten het weten te sluiten zonder dat elke chip zijn eigen
// document-listener aanmaakt.
let openDimMenu = null;
let openDimMenuBox = null;

function closeDimMenu() {
  if (!openDimMenu) return false;
  const fn = openDimMenu;
  openDimMenu = null;
  fn();
  return true;
}

if (typeof document !== 'undefined' && document.addEventListener) {
  // Capture-fase: de klik die het menu OPENT is op dat moment nog niet
  // geregistreerd (openDimMenu is dan nog leeg), dus die sluit zichzelf niet.
  document.addEventListener('click', (e) => {
    if (!openDimMenu) return;
    const box = openDimMenuBox;
    const target = e && e.target;
    if (box && target && box.contains && box.contains(target)) return;
    closeDimMenu();
  }, true);
}

// Eén actieve dimensie in het pad: het label plus het × dat hem eruit haalt.
function pivotChip(dim) {
  const label = dim.label || dim.curie || dim.iri;
  const naam = t('pivot.remove', { label });
  const x = h('button', {
    type: 'button', class: 'sec-filter-dim-x', text: '×',
    title: naam, 'aria-label': naam,
  });
  x.addEventListener('click', (e) => {
    if (e && e.preventDefault) e.preventDefault();
    closeDimMenu();
    removeGroupDim(dim);
  });
  return h('span', { class: 'sec-filter-dim' }, [
    h('span', { class: 'sec-filter-dim-lab', text: label }), x,
  ]);
}

// De +-chip met (bij meer dan één keuze) zijn menu.
function pivotAddChip(rest) {
  const btn = h('button', {
    type: 'button', class: 'sec-filter-dim-add', text: '+',
    title: t('pivot.add'), 'aria-label': t('pivot.add'),
    'aria-expanded': 'false', 'aria-haspopup': 'menu',
  });
  const box = h('span', { class: 'sec-filter-dim-wrap' }, [btn]);
  if (rest.length === 1) {
    btn.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      closeDimMenu();
      addGroupDim(rest[0]);
    });
    return box;
  }
  const menu = h('div', { class: 'sec-filter-dim-menu', role: 'menu' });
  menu.hidden = true;
  for (const d of rest) {
    const label = d.label || d.curie || d.iri;
    const opt = h('button', {
      type: 'button', class: 'sec-filter-dim-opt', role: 'menuitem', text: label,
      title: t('pivot.addItem', { label }), 'aria-label': t('pivot.addItem', { label }),
    });
    opt.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      closeDimMenu();
      addGroupDim(d);
    });
    menu.appendChild(opt);
  }
  box.appendChild(menu);
  const setOpen = (open) => {
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', String(!!open));
  };
  btn.addEventListener('click', (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    const wasOpen = !menu.hidden;
    closeDimMenu();
    if (wasOpen) return;
    setOpen(true);
    openDimMenuBox = box;
    openDimMenu = () => { setOpen(false); openDimMenuBox = null; };
  });
  return box;
}

function pivotItem() {
  const all = declaredDimensions();
  if (!all.length) return null;
  const active = activeDimensions();
  const kids = [];
  active.forEach((d, i) => {
    if (i) kids.push(h('span', { class: 'sec-filter-sep', text: '›', 'aria-hidden': 'true' }));
    kids.push(pivotChip(d));
  });
  const rest = all.filter((d) => !active.some((a) => a.iri === d.iri));
  if (rest.length) kids.push(pivotAddChip(rest));
  return h('div', { class: 'sec-filter-item' }, [
    h('span', { class: 'sec-filter-lab', text: t('pivot.label') }),
    h('div', { class: 'sec-filter-pivot' }, kids),
  ]);
}

// opts: { placeholder, ariaLabel, offers (of null), onChange(bron) } waarbij
// bron ∈ 'text' | 'offer' | 'status' | 'clear'. De aanroeper bepaalt zelf hoe
// hij op elke bron reageert (het tekstfilter herberekent de basisselectie, het
// aanbod-filter een andere; de status zeeft daar overheen).
function sectionFilterControl(opts = {}) {
  const { placeholder, ariaLabel, offers = null, onChange = () => {}, id = null,
    withStatus = true } = opts;
  const selected = new Set(withStatus ? (statusFromUrl() || LIFECYCLES) : LIFECYCLES);
  const withOffer = !!(offers && offers.length);

  const btn = h('button', {
    type: 'button', class: 'sec-filter-btn', 'aria-expanded': 'false',
    'aria-haspopup': 'true', title: t('filter.title'),
    'aria-label': t('filter.toggleAria'),
  });
  btn.innerHTML = FUNNEL_SVG;
  const count = h('span', { class: 'set-index-count muted' });

  const input = h('input', {
    type: 'search', class: 'set-index-filter',
    placeholder: placeholder || t('filter.placeholder'),
    'aria-label': ariaLabel || t('filter.aria'),
  });
  // Tweefasige lading (?sparql=): een tekst die de gebruiker tijdens de
  // eerste-beeld-fase al intikte, wordt door de wissel naar de volledige index
  // heen gedragen (carryFilterText wordt bij de wissel gevuld en daarna
  // gewist — een gewone herrender laat het filterveld dus gewoon leeg, zoals
  // altijd).
  const carry = id && state.carryFilterText ? state.carryFilterText[id] : '';
  if (carry) input.value = carry;

  // Aanbod-keuze als eigen filterelement: "(alle)" + één optie per aanbod.
  const offerTitle = new Map();
  let offerSel = null;
  if (withOffer) {
    offerSel = h('select', { class: 'sec-filter-offer', 'aria-label': t('filter.offerAria') });
    offerSel.appendChild(h('option', { value: '', text: t('filter.all') }));
    for (const o of offers) {
      offerTitle.set(o.iri, o.title || o.iri);
      offerSel.appendChild(h('option', { value: o.iri, text: o.title || o.iri }));
    }
    const want = offerFromUrl();
    offerSel.value = offerTitle.has(want) ? want : '';
  }

  const textVal = () => String(input.value == null ? '' : input.value).trim();
  const offerVal = () => (offerSel ? String(offerSel.value == null ? '' : offerSel.value) : '');
  // "Er staat iets aan" telt óók een afwijkende GROEPERING mee: die verandert
  // de weergave net zo goed, en zonder dit zou een gedeelde ?groupby=-link in
  // een dichtgeklapt paneel onzichtbaar zijn.
  const anyActive = () => selected.size !== LIFECYCLES.length || !!textVal() || !!offerVal()
    || groupByIsCustom();

  // "Wis filters" is een ×-KNOP rechtsboven in het paneel geworden. Als volle
  // knop stond hij achteraan in de rij filters — dus op een wisselende plek,
  // afhankelijk van hoeveel filters de sectie heeft, en met een woordbreedte
  // die de rij liet verspringen zodra hij verscheen. Het kruisje is de
  // standaardplek voor "leegmaken" in een paneel, kost geen regel, en houdt
  // zijn toegankelijke naam ("Wis filters") als aria-label; verschijnen doet
  // hij nog steeds alleen als er iets te wissen valt.
  const clearBtn = h('button', {
    type: 'button', class: 'sec-filter-clear', text: '×',
    title: t('filter.clear'), 'aria-label': t('filter.clear'),
  });

  const syncActive = () => {
    btn.className = 'sec-filter-btn' + (anyActive() ? ' on' : '');
    clearBtn.hidden = !anyActive();
  };

  // STATUS als dropdown in plaats van drie selectievakjes naast elkaar. Die
  // vakjes namen met hun drie meervoudswoorden ("actieve · beëindigde ·
  // toekomstige") de halve paneelbreedte, terwijl er in de praktijk één van de
  // vier standen wordt gekozen. Gekozen vorm: één select met "(alle)" plus de
  // drie enkelvoudige fasen — dezelfde vorm als de aanbod-keuze ernaast, dus
  // één patroon in het paneel in plaats van twee.
  //
  // De ?status=-SEMANTIEK blijft ongemoeid: de parameter is nog steeds een
  // komma-lijst en een gedeelde link met een COMBINATIE (?status=active,
  // terminated) verliest niets — die combinatie wordt als extra optie aan de
  // lijst toegevoegd en staat geselecteerd. Zo kan de dropdown een bestaande
  // URL nooit stil verbouwen; wat je niet meer kunt is een nieuwe combinatie
  // samenstellen, en dat is precies de ruimte die dit oplevert.
  const statusValue = () => (selected.size === LIFECYCLES.length ? ''
    : LIFECYCLES.filter((s) => selected.has(s)).join(','));
  const statusSel = withStatus
    ? h('select', { class: 'sec-filter-status', 'aria-label': t('filter.status') })
    : null;
  if (statusSel) {
    statusSel.appendChild(h('option', { value: '', text: t('filter.all') }));
    for (const s of LIFECYCLES) {
      statusSel.appendChild(h('option', { value: s, text: lifecyclePluralWord(s) }));
    }
    const want = statusValue();
    if (want && !LIFECYCLES.includes(want)) {
      statusSel.appendChild(h('option', {
        value: want,
        text: want.split(',').map((s) => lifecyclePluralWord(s)).join(' + '),
      }));
    }
    statusSel.value = want;
    statusSel.addEventListener('change', () => {
      const v = String(statusSel.value == null ? '' : statusSel.value);
      const next = v ? v.split(',') : LIFECYCLES;
      selected.clear();
      for (const s of next) if (LIFECYCLES.includes(s)) selected.add(s);
      syncActive();
      filterToUrl(selected, offerVal(), withOffer);
      onChange('status');
    });
  }

  const item = (label, control) => h('div', { class: 'sec-filter-item' }, [
    h('span', { class: 'sec-filter-lab', text: label }), control,
  ]);
  const panel = h('div', { class: 'sec-filter-panel', role: 'group', 'aria-label': t('filter.title') }, [
    item(t('filter.search'), input),
    offerSel ? item(t('filter.offer'), offerSel) : null,
    statusSel ? item(t('filter.status'), statusSel) : null,
    pivotItem(),
    clearBtn,
  ]);
  panel.hidden = true;

  input.addEventListener('input', () => { syncActive(); onChange('text'); });
  if (offerSel) {
    offerSel.addEventListener('change', () => {
      syncActive();
      filterToUrl(selected, offerVal(), withOffer);
      onChange('offer');
    });
  }
  const resetAll = () => {
    input.value = '';
    if (offerSel) offerSel.value = '';
    for (const s of LIFECYCLES) selected.add(s);
    if (statusSel) statusSel.value = '';
    syncActive();
    filterToUrl(selected, '', withOffer);
  };
  // Wissen wist ALLES wat de lezer aan de weergave heeft gedraaid, dus ook de
  // groepering. Dat gaat via de herrender-route (resetGroupBy) en dus ná
  // onChange: de sectie wordt daarbij opnieuw opgebouwd, inclusief dit paneel.
  clearBtn.addEventListener('click', () => {
    const regroup = groupByIsCustom();
    resetAll();
    onChange('clear');
    if (regroup) resetGroupBy();
  });

  const setOpen = (open) => {
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(!!open));
  };
  // De knop zit in een <summary>: klikken mag de SECTIE niet in-/uitklappen
  // (zelfde truc als de versienavigator-chip en de telling-link).
  btn.addEventListener('click', (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    setOpen(panel.hidden);
  });
  btn.addEventListener('pointerdown', (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
  });
  // Escape sluit het paneel. Een klik buiten het paneel doet dat NIET meer: het
  // paneel is nu een inline blok onder de sectiekop (geen zwevende pop-over) en
  // moet blijven staan terwijl je in de gefilterde lijst klikt.
  // Staat het dimensiemenu open, dan sluit Escape ÉÉRST dat — anders zou één
  // toets twee lagen tegelijk wegvouwen en is het paneel weg voordat je je
  // vergissing kunt herstellen.
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('keydown', (e) => {
      if (!e || e.key !== 'Escape') return;
      if (closeDimMenu()) return;
      setOpen(false);
    });
  }
  syncActive();

  // Fase 1 van de tweefasige lading: het paneel staat er al (de vorm van de
  // pagina klopt meteen), maar de index is nog onvolledig. De filters die op
  // die index steunen — de aanbod-keuze (kent nog niet alle aanbod) en de
  // levensfasen (die uit de versiecontainers komen, die er nog niet zijn) —
  // gaan uit; het ZOEKVELD blijft bedienbaar, zodat wie meteen begint te typen
  // niet geblokkeerd wordt: die tekst reist met de wissel mee (carryFilterText)
  // en filtert daarna de volledige index. Het paneel is zichtbaar gedempt en
  // draagt de uitleg als title.
  const LOADING_TITLE = t('filter.loading');
  let loading = false;
  // De EIGEN title van een gedempt element, zodat hij na het laden terugkomt.
  // Zonder dit verloor de ×-knop ("Wis filters") zijn hover zodra de lijst één
  // keer geladen had — de melding overschreef hem en er stond niets voor terug.
  const eigenTitle = new WeakMap();
  const setLoading = (on) => {
    loading = !!on;
    const dim = (node, disable) => {
      if (!node) return;
      if (!eigenTitle.has(node)) eigenTitle.set(node, node.getAttribute('title') ?? null);
      node.className = String(node.className || '').replace(/\s*\bis-loading\b/, '')
        + (loading ? ' is-loading' : '');
      const eigen = eigenTitle.get(node);
      if (loading) node.setAttribute('title', LOADING_TITLE);
      else if (eigen != null) node.setAttribute('title', eigen);
      else if (node.removeAttribute) node.removeAttribute('title');
      if (disable) {
        node.disabled = loading;
        if (loading) node.setAttribute('disabled', '');
        else if (node.removeAttribute) node.removeAttribute('disabled');
      }
    };
    dim(panel, false);
    if (statusSel) dim(statusSel, true);
    if (offerSel) dim(offerSel, true);
    dim(clearBtn, true);
    // De trechterknop blijft klikbaar (het paneel moet open kunnen), maar zegt
    // wél wat er aan de hand is.
    if (loading) btn.setAttribute('title', LOADING_TITLE);
    else btn.setAttribute('title', t('filter.title'));
  };

  return {
    btn, panel, count, input, offerSelect: offerSel, setLoading,
    isLoading: () => loading,
    open: () => setOpen(true),
    close: () => setOpen(false),
    isOpen: () => !panel.hidden,
    text: () => textVal(),
    offerIri: () => offerVal(),
    setOffer: (iri) => {
      if (!offerSel) return;
      offerSel.value = offerTitle.has(iri) ? iri : '';
      syncActive();
      filterToUrl(selected, offerVal(), withOffer);
    },
    active: () => anyActive(),
    // Alles wissen zonder onChange (de aanroeper herstelt zelf; gebruikt door
    // een sprong binnen de pagina, die een verborgen kaart moet tonen).
    reset: resetAll,
    matches: (status) => selected.has(status || 'active'),
    // Achtervoegsel voor de teller: "· aanbod: X · alleen actieve".
    suffix: () => {
      let out = '';
      const off = offerVal();
      if (off) out += t('filter.suffixOffer', { title: offerTitle.get(off) || off });
      if (selected.size === LIFECYCLES.length) return out;
      if (!selected.size) return out + t('filter.suffixNoStatus');
      const woorden = LIFECYCLES.filter((s) => selected.has(s)).map((s) => lifecyclePluralWord(s));
      return out + ' · ' + (woorden.length === 1
        ? t('filter.suffixOnly', { word: woorden[0] }) : woorden.join(' + '));
    },
  };
}

// --- Inklapbare paginasectie -------------------------------------------------
// De hoofdsecties (Aanbod, Overeenkomsten, Beleidssets, Machine-uitvoerbaar
// beleid) zijn <details> met de h2 als summary-kop en hetzelfde chevron-patroon
// als de kaarten; standaard OPEN. De kop draagt de telling compact
// ("Overeenkomsten · 1.392"), zodat een ingeklapte sectie informatief blijft,
// en bij de lijstsecties rechts het filtericoon. Het id blijft op de sectie
// staan, dus ankers en kruisverwijzingen (#sectie-overeenkomsten) blijven
// werken — de telling-link opent de sectie zo nodig eerst (openPageSection).
// De teller op een sectiekop. In de eerste-beeld-fase van de tweefasige
// lading is het echte aantal nog onbekend (de lijst is per soort afgekapt):
// dan staat er "…" in plaats van een getal dat zou liegen.
function sectionCountText(n) {
  return state.listPhase === 'first' ? '· …' : '· ' + num(n);
}

// Skeleton-staart onder de eerste kaarten: het signaal "hier komt nog meer".
// Alleen in de eerste-beeld-fase; dezelfde .skel-card als de laadweergave.
const FIRST_TAIL_CARDS = 3;
function listTail() {
  return state.listPhase === 'first' ? skeletonList(FIRST_TAIL_CARDS) : null;
}

function pageSection(id, title, { filter = null, count = null, body = [] } = {}) {
  const sec = h('details', { class: 'page-section', id });
  sec.setAttribute('open', '');
  sec.open = true;
  const countEl = filter ? filter.count : h('span', { class: 'set-index-count muted' });
  if (!filter && count != null) countEl.textContent = sectionCountText(count);
  sec.appendChild(summaryEl({ class: 'page-sec-summary' }, [
    h('h2', { class: 'page-sec-title', text: title }),
    countEl,
    filter ? filter.btn : null,
    chevron('lg'),
  ]));
  if (filter) {
    sec.appendChild(filter.panel);
    // De chevron vouwt de KAARTENLIJST op, niet de filterrij: zie
    // placeFilterPanel.
    sec.addEventListener('toggle', () => placeFilterPanel(sec, filter.panel));
  }
  for (const b of [].concat(body)) if (b) sec.appendChild(b);
  return sec;
}

// Het filterpaneel klapt NIET mee met de sectie. Wie een filter of een
// groepering heeft gezet en (per ongeluk) de sectie dichtklapt, zag zijn hele
// filterrij verdwijnen — inclusief het bewijs dát er iets aanstond. Een
// <details> verbergt echter al zijn kinderen behalve de <summary>, dus het
// paneel VERHUIST: bij inklappen naar de plek direct ná de sectie (visueel nog
// altijd onder de kop, want daar houdt de sectie dan op), bij uitklappen weer
// terug onder de summary. Het is telkens dezelfde node, dus de open-staat, de
// ingetikte tekst, de keuzes en de luisteraars blijven ongemoeid.
function placeFilterPanel(sec, panel) {
  if (!sec || !panel || !sec.insertBefore) return;
  const host = sec.parentNode;
  if (sec.open) {
    if (panel.parentNode !== sec) sec.insertBefore(panel, sec.children[1] || null);
  } else if (host && panel.parentNode !== host) {
    host.insertBefore(panel, sec.nextSibling);
  }
  if (sec.classList) {
    if (sec.open) sec.classList.remove('has-detached-filter');
    else sec.classList.add('has-detached-filter');
  }
}

function openPageSection(sec) {
  if (!sec) return;
  sec.open = true;
  if (sec.setAttribute) sec.setAttribute('open', '');
}

// --- Lazy lijst voor de Overeenkomsten-sectie (zelfde patroon als de
// kaartenlijst van de beleidssets): GECHUNKT toegevoegde, ingeklapte groepen
// (body lazy bij de eerste uitklap; bijladen via sentinel/knop). De filters
// (tekst, aanbod, status) zitten in het paneel achter het trechter-icoon op de
// sectiekop — zie sectionFilterControl; de "x van y"-teller staat op de kop.
// De telling-link op een Offer-kaart springt hierheen en zet via
// state.agrFilterByOffer de AANBOD-dropdown (niet meer de aanbodtitel in het
// tekstveld), opent de sectie én het filterpaneel, zodat de gebruiker ziet
// wélk filter er aanstaat en het met één handeling kan wissen.
// Herkomst van een overeenkomst = agr.offers (prov:wasDerivedFrom in
// ttl-modus, offerRef uit de skelet-SELECT in sparql-modus).
function agreementsListView(agrs, agrAnchor, offerLink, offers) {
  const box = h('div', { class: 'agr-cards' });
  const list = h('div', { class: 'agr-card-list' });
  const sentinel = h('div', { class: 'card-sentinel', 'aria-hidden': 'true' });
  const moreBtn = h('button', { type: 'button', class: 'btn card-more', text: t('list.loadMore') });
  const items = agrs.map((a) => ({
    title: a.title, sub: a.assignee ? a.assignee.label : null,
    offers: a.offers || [], agr: a,
    // Levensfase van de kaart (actief/beëindigd/toekomstig) voor het
    // statusfilter; komt uit de versiecontainer, zie policyLifecycle.
    status: policyLifecycle(state.model, a),
  }));
  const rendered = new Map(); // agreement-IRI -> gerenderde kaart (voor revealInUi)
  let visible = items;
  let offset = 0;
  // Tekst-, aanbod- en statusfilter combineren met EN: het zoekveld en de
  // aanbodkeuze bepalen samen de basisselectie, de status zeeft daar de fasen
  // uit.
  let base = items;
  const recomputeBase = () => {
    const q = filter.text();
    const off = filter.offerIri();
    base = q ? filterRefItems(items, q) : items;
    if (off) base = base.filter((it) => it.offers.includes(off));
  };
  const applyFilters = () => {
    visible = base.filter((it) => filter.matches(it.status));
    restart();
  };

  const updateCount = () => {
    const total = items.length;
    // Eerste-beeld-fase: het totaal is nog onbekend (afgekapte lijst).
    if (state.listPhase === 'first') { filter.count.textContent = sectionCountText(total); return; }
    filter.count.textContent = '· ' + (visible.length === total
      ? num(total)
      : t('count.ofTotal', { n: visible.length, total }))
      + filter.suffix();
  };
  const filter = sectionFilterControl({
    id: 'sectie-overeenkomsten',
    placeholder: t('filter.placeholder'),
    ariaLabel: t('filter.ariaAgreements'),
    offers,
    onChange: () => { recomputeBase(); applyFilters(); },
  });
  // Kleine corpora (≤ inline-drempel) starten open met directe body's; op
  // schaal ingeklapt met lazy body's.
  // Idem als bij de set-kaarten: in de eerste-beeld-fase altijd ingeklapt, om
  // geen regen van detail-CONSTRUCTs te ontketenen op het moment dat de pagina
  // juist snel moet zijn.
  const lazy = refListCollapsed(items.length) || state.listPhase === 'first';
  const renderChunk = () => {
    const { items: chunk, nextOffset, done } = cardChunk(visible, offset);
    for (const it of chunk) {
      const card = agreementGroup(it.agr, agrAnchor.get(it.agr.iri), offerLink, { lazy });
      rendered.set(it.agr.iri, card);
      list.appendChild(card);
    }
    offset = nextOffset;
    sentinel.hidden = done;
    moreBtn.hidden = done;
    if (!done) {
      const rest = visible.length - offset;
      moreBtn.textContent = t('list.loadMoreRest', { n: rest });
    }
  };
  const restart = () => {
    list.innerHTML = '';
    rendered.clear();
    offset = 0;
    renderChunk();
    updateCount();
  };
  moreBtn.addEventListener('click', renderChunk);
  if (typeof IntersectionObserver !== 'undefined') {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting) && offset < visible.length) renderChunk();
    }, { rootMargin: '600px 0px' });
    io.observe(sentinel);
  }

  const api = { box, filter, onReveal: null };

  // Programmatschakelbaar aanbod-filter (voor de telling-link op de
  // Offer-kaart): zet de dropdown, opent sectie + filterpaneel.
  state.agrFilterByOffer = (offer) => {
    if (api.onReveal) api.onReveal();
    filter.setOffer(offer.iri);
    recomputeBase();
    applyFilters();
    filter.open();
  };

  // Haal de kaart van één overeenkomst tevoorschijn (terugsprong vanuit de
  // pagina): sectie openen, een filter dat hem verbergt wissen en de lazy
  // chunks doorrenderen tot de kaart in de DOM staat.
  api.resolveCard = (iri) => {
    if (!items.some((it) => it.agr.iri === iri)) return null;
    if (api.onReveal) api.onReveal();
    if (!visible.some((it) => it.agr.iri === iri)) {
      filter.reset();
      recomputeBase();
      applyFilters();
    }
    let guard = 0;
    while (!rendered.has(iri) && offset < visible.length && guard++ < 10000) renderChunk();
    return rendered.get(iri) || null;
  };

  box.appendChild(list);
  box.appendChild(sentinel);
  box.appendChild(moreBtn);
  recomputeBase();  // ?aanbod= uit de URL geldt meteen
  applyFilters();   // en ?status= ook
  return api;
}

// --- Overeenkomst-pagina (?policy= wijst naar een Agreement) -----------------
// Ook hier vult de sectie zichzelf opnieuw wanneer de versienavigator in de
// kop naar een andere versie wisselt (de pagina blijft staan; alleen de
// inhoud wisselt).
function agreementPage(agr) {
  const sec = h('section', { class: 'offer-section' });
  const fill = (a) => {
    sec.innerHTML = '';
    fillAgreementPage(sec, a, (iri, v) => {
      const next = byIri(state.model.agreements, iri) || (v && v.stub ? stubPolicy(v) : null);
      if (next) fill(next);
    });
  };
  fill(agr);
  return sec;
}

function fillAgreementPage(sec, agr, onVersion) {
  const head = h('header', { class: 'offer-head' });
  head.appendChild(h('div', { class: 'title-row' }, [
    h('h1', { text: agr.title }),
    explainKey(h('span', { class: 'kind-pill agreement', text: t('kind.agreement') }), 'kind.agreement'),
    agr.anon ? null : versionStatusChip(agr.iri),
    verkenBtn(agr.anon ? agr.term : agr.iri),
    agr.anon ? null : versionNav(agr.iri, onVersion),
    (agr.anon || agr.stub) ? null : editorButton(agr.iri),
  ]));
  // Blank-node-policy: geen uid/curie-regel (het parser-id is geen identifier).
  if (agr.curie) head.appendChild(h('div', { class: 'mono muted uid', text: agr.curie }));
  if (agr.description) head.appendChild(h('p', { class: 'offer-desc' }, [longText(agr.description)]));
  // Zie agreementBody: aanbod, verzoek en bron-document zijn drie soorten
  // wasDerivedFrom-doelwitten met elk hun eigen weergave.
  const reqIris = requestIriSet(agr);
  const afgeleid = (agr.version && agr.version.derivedFrom || [])
    .filter((d) => !(agr.offers || []).includes(d.iri)
      && !reqIris.has(d.iri)
      && !state.model.offers.some((o) => o.iri === d.iri));
  head.appendChild(kv([
    [term('field.assignee'), agr.assignee ? ref(agr.assignee) : null],
    [term('field.assigner'), agr.assigner ? ref(agr.assigner) : null],
    [term('field.issued'), agr.issued],
    [term('field.replaces'), provRefNode(agr.version && agr.version.revisionOf)],
    // Puntkomma tussen bronnen (wettitels bevatten zelf komma's); externe
    // objecten als link met gedecodeerd label, interne met verken-knop.
    // NB: dit is prov:wasDerivedFrom (bron-besluit, besluit-PDF's) — de
    // wettelijke Grondslag (dpv:hasLegalBasis) staat per permission.
    [term('field.derivedFrom'), derivedFromValue(afgeleid)],
    [term('field.fulfilsOffer'), agr.offers && agr.offers.length
      ? h('span', {}, agr.offers.flatMap((iri, i) => {
        const off = byIri(state.model.offers, iri);
        const u = new URLSearchParams(location.search); u.set('policy', iri);
        return [i ? ', ' : '', h('a', { href: '?' + u.toString(), text: off ? off.title : curie(iri) })];
      })) : null],
    [t('field.request'), requestValue(agr.requests)],
    [term('field.profile'), agr.profile ? h('span', { class: 'mono muted', text: curie(agr.profile) }) : null],
    [term('field.reference'), identifierValue(agr)],
  ]));
  const xp = extraPropsBlock(agr.extraProps);
  if (xp) head.appendChild(xp);
  sec.appendChild(head);

  sec.appendChild(agreementOps(agr, (off) => {
    const u = new URLSearchParams(location.search);
    u.set('policy', off.iri);
    return h('a', { href: '?' + u.toString(), text: off.title });
  }));
  return sec;
}

// Knop naar de drie-panelen-editor met behoud van de huidige query.
//
// AFWIJKING VAN DE REPO-VERSIE (site-kopie, FTV-site): zonder bronparameters
// draait deze pagina op het standaardcorpus, en dat corpus moet de editor
// expliciet meekrijgen — anders opent hij leeg. De repo-versie hoeft dat niet:
// daar laadt de editor zonder parameters hetzelfde default-corpus.
function editorButton(policyIri) {
  const u = new URLSearchParams(location.search);
  if (!u.getAll('src').length && !u.getAll('ttl').length && !u.get('sparql')) {
    for (const name of DEFAULT_EXAMPLES) u.append('src', EXAMPLES_BASE + name);
  }
  u.set('policy', policyIri);
  return h('a', { class: 'editor-btn', href: './?' + u.toString(), text: t('editor.open') });
}

// --- Aanbod-groep: de bovenste collapsible laag (eigen, grootste kopstijl) ---
// De sectie is één DOM-node die zichzelf opnieuw vult (fill): de
// versienavigator in de kop wisselt zo naar een andere versie zonder de
// open/dicht-stand of de positie in de pagina te verliezen.
function offerSection(offer, agreements, anchorId) {
  // Aanbod-kaarten starten INGEKLAPT (beslissing eigenaar): sinds de
  // tweefasige lading renderen ze vóórdat hun detail binnen is, en een open
  // kaart toont dan zichtbaar "missende" inhoud. Alleen een ?policy=-scope
  // op dít aanbod opent de kaart direct.
  const sec = h('details', { class: 'offer-group', id: anchorId, 'data-iri': offer.iri || null });
  if (state.policyScope === offer.iri) sec.setAttribute('open', '');
  const fill = (o, agrs) => {
    sec.innerHTML = '';
    if (o.iri) sec.setAttribute('data-iri', o.iri);
    fillOfferSection(sec, o, agrs, (iri, v) => {
      const next = byIri(state.model.offers, iri) || (v && v.stub ? stubPolicy(v) : null);
      if (next) fill(next, state.model.agreements.filter((a) => (a.offers || []).includes(iri)));
    });
  };
  fill(offer, agreements);
  // Zelfde laadgedrag als de overeenkomst-kaarten: wordt de kaart geopend
  // terwijl het detail in ?sparql=-modus nog niet binnen is (fase 1 of vóór
  // de eager-lading), toon dan de skeletonregels en laad bij; daarna de
  // kaart hervullen met de volledige inhoud.
  let loading = false;
  sec.addEventListener('toggle', async () => {
    const cur = byIri(state.model.offers, offer.iri) || offer;
    if (!sec.open || loading || !needsSparqlDetail(cur)) return;
    loading = true;
    const holder = h('div', { class: 'card-body-holder' });
    holder.appendChild(cardLoading());
    sec.appendChild(holder);
    try {
      await ensureDetail(cur.iri);
      const next = byIri(state.model.offers, cur.iri) || cur;
      fill(next, state.model.agreements.filter((a) => (a.offers || []).includes(cur.iri)));
      sec.setAttribute('open', '');
    } catch (e) {
      holder.innerHTML = '';
      holder.appendChild(h('p', { class: 'src-err', text: t('err.detailLoad', { msg: e.message }) }));
    } finally {
      loading = false;
    }
  });
  return sec;
}

function fillOfferSection(sec, offer, agreements, onVersion) {
  const nOps = offer.obligations.length + offer.permissions.length
    + (offer.prohibitions ? offer.prohibitions.length : 0);

  // De telling "n overeenkomsten" rechtsboven ís de ingang naar de
  // overeenkomsten van dit aanbod (beslissing eigenaar): een link naar de
  // Overeenkomsten-sectie die daar het filter op dit aanbod voorzet. De
  // vroegere aparte "Overeenkomsten op dit aanbod"-opsomming in de kaartbody
  // is vervallen — ook voor kleine aantallen: één mechanisme oogt het strakst
  // en de sectie toont kleine corpora toch al volledig.
  const opSum = h('span', { class: 'op-sum muted' });
  if (nOps) opSum.appendChild(document.createTextNode(t('rules.count', { n: nOps })));
  if (agreements.length) {
    if (nOps) opSum.appendChild(document.createTextNode(' · '));
    const n = agreements.length;
    // ?sparql=-lijstmodus: de koppeling komt uit de skelet-graaf en kan
    // onvolledig zijn (SAMPLE per agreement) → "getoond" i.p.v. totaal.
    const label = state.sparqlEndpoint
      ? t('agreements.shown', { n })
      : t('agreements.count', { n });
    const link = h('a', {
      class: 'agr-count-link', href: '#sectie-overeenkomsten', text: label,
      title: t('agreements.countTitle'),
    });
    link.addEventListener('click', (e) => {
      e.stopPropagation(); // niet ook de kaart in-/uitklappen
      if (state.agrFilterByOffer) state.agrFilterByOffer(offer);
    });
    opSum.appendChild(link);
  }

  sec.appendChild(cardSummary('offer-summary', [
    explainKey(h('span', { class: 'kind-pill offer', text: t('kind.offer') }), 'kind.offer'),
    h('span', { class: 'offer-title', text: offer.title }),
    offer.anon ? null : versionStatusChip(offer.iri),
    verkenBtn(offer.anon ? offer.term : offer.iri),
    opSum,
    offer.anon ? null : versionNav(offer.iri, onVersion),
    chevron(),
  ]));

  // Header-info binnen de groep: uid, beschrijving, metadata (incl. de
  // wettelijke grondslag — geen zwevende regels), toegangspunten.
  const head = h('header', { class: 'offer-head' });
  if (!offer.anon && !offer.stub) head.appendChild(editorButton(offer.iri));
  // Blank-node-policy: geen uid/curie-regel (het parser-id is geen identifier).
  if (offer.curie) head.appendChild(h('div', { class: 'mono muted uid', text: offer.curie }));
  if (offer.description) head.appendChild(h('p', { class: 'offer-desc' }, [longText(offer.description)]));

  const ds = state.model.datasets.find((d) => d.iri === offer.datasetIri || d.policies.includes(offer.iri));
  const afgeleid = (offer.version && offer.version.derivedFrom) || [];
  head.appendChild(kv([
    [term('field.assigner'), offer.assigner ? ref(offer.assigner) : null],
    [t('field.dataset'), ds ? h('span', {}, [ds.title, ' ', h('span', { class: 'mono muted', text: ds.curie })]) : null],
    [term('field.issued'), offer.issued],
    // Puntkomma tussen bronnen (wettitels bevatten zelf komma's); externe
    // objecten als link met gedecodeerd label, interne met verken-knop.
    [term('field.derivedFrom'), derivedFromValue(afgeleid)],
    [term('field.profile'), offer.profile ? h('span', { class: 'mono muted', text: curie(offer.profile) }) : null],
    [term('field.reference'), identifierValue(offer)],
  ]));

  // "Server"-blokje: toegangspunten (distributie-accessURL's van de dataset).
  const urls = ds ? ds.distributions.filter((d) => d.accessURL) : [];
  if (urls.length) {
    const box = h('div', { class: 'servers' });
    box.appendChild(termHead('div', 'head.accessPoints', { class: 'servers-label' }));
    for (const d of urls) {
      box.appendChild(h('div', { class: 'server-row' }, [
        h('a', { class: 'mono', href: d.accessURL, target: '_blank', rel: 'noopener', text: d.accessURL }),
        h('span', { class: 'muted', text: ' — ' + d.label }),
      ]));
    }
    head.appendChild(box);
  }

  const xp = extraPropsBlock(offer.extraProps);
  if (xp) head.appendChild(xp);
  sec.appendChild(head);

  // De routes van deze doc: verplichtingen en toestemmingen als uniforme
  // operation-rijen direct onder de header (badges onderscheiden de soort).
  const ops = h('div', { class: 'op-list' });
  // Geërfde regels (odrl:inheritFrom) eerst, samengevouwen per ouder: ze zijn
  // de laag ONDER de eigen regels, net als de aanbod-vouw elders.
  for (const r of inheritFoldRows(offer)) ops.appendChild(r);
  for (const d of offer.obligations) ops.appendChild(obligationRow(d));
  for (const r of ruleRows(offer.permissions)) ops.appendChild(r);
  for (const r of ruleRows(offer.prohibitions || [], { prohibition: true })) ops.appendChild(r);
  if (ops.children.length) sec.appendChild(ops);

  return sec;
}

// Versieperiode als compacte tekst (gedeeld tussen kop en lijstregels).
function versionPeriod(v) {
  return v.status === 'future'
    ? t('vperiod.from', { date: compactDate(v.effectiveFrom) || '?' })
    : t('vperiod.range', {
      from: compactDate(v.effectiveFrom) || '…',
      to: compactDate(v.until) || t('vperiod.present'),
    });
}

// Statuschip van een versie (alleen zinvol als die NIET de geldende is:
// "vervallen"/"toekomstig"). Neutrale enum als CSS-klasse, NL-woord als
// weergavetekst (B17).
function statusChip(v) {
  if (!v || !v.status || v.status === 'current') return null;
  return h('span', { class: 'vchip ' + v.status, text: statusWord(v.status) });
}

// Een STUB-versie: een vervangen besluitversie waarvan de bron alleen de
// documentgegevens bevat (titel, geldigheidsperiode, verwijzing naar het
// bron-besluit) en niet de regels — zo publiceert /brp-ap zijn historie. De
// versienavigator moet er wél heen kunnen; daarom krijgt elke kaartsoort een
// policy-VORMIG object met lege regelsets, zodat er geen aparte kaartcode
// nodig is. De beschrijving zegt expliciet wat er ontbreekt en waarom.
// De bron-policy van een stub-versie: de verwijzing (prov:wasDerivedFrom) die
// wél een policy in het model is — bij /brp de versie uit de bron-datalaag,
// die de werkelijke regels draagt.
function stubSourcePolicy(v) {
  for (const iri of (v && v.sources) || []) {
    const p = byIri(state.model.sets, iri) || byIri(state.model.offers, iri)
      || byIri(state.model.agreements, iri);
    if (p) return p;
  }
  return null;
}

function stubPolicy(v) {
  const bron = stubSourcePolicy(v);
  const periode = t('stub.period', {
    from: compactDate(v.effectiveFrom) || '…',
    to: compactDate(v.effectiveTo) || compactDate(v.until) || '…',
  });
  // De LAATSTE versie van een beëindigd besluit is niet "vervangen" (er kwam
  // niets voor in de plaats): het besluit is afgelopen. Dat is precies wat de
  // lezer moet weten, dus staat het vooraan in de beschrijving.
  const kop = v.status === 'terminated'
    ? t('stub.terminated', { period: periode })
    : t('stub.superseded', { period: periode });
  return {
    iri: v.iri, term: null, anon: false, stub: true,
    kind: v.kind || 'set',
    curie: v.curie || curie(v.iri),
    title: v.title || v.curie || v.iri,
    description: (bron
      // De regels van deze versie komen uit de bron-datalaag; zeg dat erbij,
      // anders lijken ze bij de ap-nl-overeenkomst zelf te horen.
      ? t('stub.fromSourceLayer', { head: kop, source: bron.curie || curie(bron.iri) })
      : t('stub.documentOnly', { head: kop }))
      // Herkomstnotities uit de data zelf (o.a. de obligations-doorwerking).
      + (v.comment ? '\n\n' + v.comment : ''),
    issued: v.issued || null,
    assigner: bron ? bron.assigner : null,
    assignee: bron ? bron.assignee : null,
    profile: null, uid: null,
    permissions: bron ? bron.permissions : [],
    prohibitions: bron ? (bron.prohibitions || []) : [],
    // Verplichtingen: de stub-eigen set (doorwerking vanuit het aanbod,
    // op de stub gematerialiseerd) wint; anders die van de bronlaag.
    obligations: (v.obligations && v.obligations.length)
      ? v.obligations
      : (bron ? (bron.obligations || []) : []),
    offers: [],
    extraProps: [],
    version: {
      effectiveFrom: v.effectiveFrom || null,
      effectiveTo: v.effectiveTo || null,
      revisionOf: null,
      derivedFrom: (v.sources || []).map((iri) => ({ iri, curie: curie(iri), label: null })),
      supersededBy: [],
    },
  };
}

// Statuschip van de GETOONDE versie van een policy, bedoeld om direct achter
// de kaarttitel te staan ("Besluit X  [vervallen]") — daar hoort hij: hij zegt
// iets over de tekst ernaast. De navigator-chip rechts blijft zo een blok van
// vaste breedte, zodat de pijlen niet verspringen.
function versionStatusChip(policyIri) {
  const nm = policyIri ? versionNavModel(state.model, policyIri) : null;
  return nm ? statusChip(nm.shown) : null;
}

// --- Versienavigator-chip ----------------------------------------------------
// Zit rechtsboven in de KOP van elke kaartsoort (aanbod-sectie,
// overeenkomst-groep, set-kaart en de ?policy=-detailpagina's) en vervangt de
// vroegere fold-out versie-kiezer, die op schaal in ingeklapte kaart-body's
// verstopt zat. Vorm (schets eigenaar):
//     ‹ 12-12-2012      nieuwste versie: alleen terug
//     ‹ 11-11-2011 ›    tussenversie: beide richtingen
//       10-10-2010 ›    oudste versie: alleen vooruit
// De datum is die van de GETOONDE versie (dct:issued, terugval
// effectiveFrom, anders "—"); klikken op de datum opent de volledige lijst
// ("alle versies (n)", recent-first). Een pijl/lijstregel wisselt de kaart
// naar die versie: `apply(iri)` herbouwt de kaart uit het model — in
// ?sparql=-modus wordt het detail eerst geCONSTRUCT (ensureDetail), dezelfde
// route die de oude kiezer gebruikte.
//
// UNIFORM (beslissing eigenaar, aug 2026): ELKE kaartkop draagt de chip, in
// exact dezelfde vorm en breedte — ook een policy zonder versiecontainer. Die
// krijgt zijn eigen datum met twee UITGESCHAKELDE pijlen. Voorheen leverde
// deze functie `null` zodra er geen container was, en tekende zij bij één
// versie alleen een kale datum zonder sleuven; in de BRP-lijst zag je daardoor
// drie verschillende koppen naast elkaar (chip met pijlen op de uitgeklapte
// kaart, kale datum op de ingeklapte, niets op een aanbod) terwijl er niets
// wezenlijks verschilde. Uniform betekent ook: de kaartregel houdt altijd
// dezelfde hoogte, of er nu versies zijn of niet.
//
// SKELETMODUS (?sparql=): de lijst-SELECT levert per kaart maar ÉÉN lid van de
// container; de zusterversies komen pas met het detail-CONSTRUCT. De TELLING
// kent het skelet wel (SKELETON_COUNT_PRED, zie temporal.js), de RICHTING
// niet. Eerlijke tussenvorm: zijn er aantoonbaar meer versies maar zijn de
// buren nog onbekend, dan staan BEIDE pijlen aan. Een klik laadt eerst het
// detail (ensureDetail) en corrigeert de stand: is er in die richting toch
// niets, dan wordt de kaart met de nu bekende buren opnieuw getekend en dooft
// die pijl. Beter dan gokken op "de getoonde versie is vast de nieuwste" —
// dat klopt in /brp-ap meestal, maar niet altijd.
// Datering van een policy die GEEN versiecontainer heeft, in de vorm die
// versionNavDate leest. Levert altijd een object: is er niets te dateren, dan
// toont de chip "—" (en blijft de kop even hoog als bij de buurkaarten).
function policyOwnVersion(iri) {
  const pol = byIri(state.model.sets, iri) || byIri(state.model.offers, iri)
    || byIri(state.model.agreements, iri);
  return {
    iri,
    issued: (pol && pol.issued) || null,
    effectiveFrom: (pol && pol.version && pol.version.effectiveFrom) || null,
  };
}

function versionNav(policyIri, apply) {
  if (!policyIri) return null;
  const nm = versionNavModel(state.model, policyIri);
  // Zonder container is er geen versie-object; de chip toont dan de datering
  // van de policy zelf (dct:issued, terugval tpl:effectiveFrom — dezelfde
  // bronnen die versionNavDate voor een echte versie leest).
  const shown = nm ? nm.shown : policyOwnVersion(policyIri);
  // Geen datum én niets te bladeren (beslissing eigenaar): dan geen chip —
  // een "—" met twee dode pijlen voegt niets toe (bv. de RvIG-aanbiedingen,
  // die bewust geen dct:issued dragen).
  const navigable = nm && (nm.total > 1 || nm.older || nm.newer);
  if (!navigable && versionNavDate(shown) === '—') return null;
  const wrap = h('span', { class: 'vnav-wrap' });
  const box = h('span', { class: 'vnav' });
  // De chip zit in een <summary>: klikken mag de kaart niet mee in-/uitklappen
  // (zelfde truc als de telling-link agr-count-link).
  const stop = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (e && e.preventDefault) e.preventDefault();
  };
  // Vangnet voor de hele chip: ook een randklik (tussen de knoppen, op de
  // rand van de pil) mag de kaart nooit in-/uitklappen. Pointerdown erbij,
  // zodat er niets van de interactie de <summary> bereikt.
  wrap.addEventListener('click', stop);
  wrap.addEventListener('pointerdown', (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
  });
  let busy = false;
  const go = async (v) => {
    if (!v || busy) return;
    busy = true;
    box.className = 'vnav busy';
    try {
      // ?sparql=-modus: eerst het detail bijladen, anders wisselt de kaart
      // naar een skelet zonder regels. Bij een STUB-versie zit de inhoud niet
      // op de versie zelf maar op zijn bron in de bron-datalaag: laad díe bij,
      // dan toont de kaart de regels van die historische versie.
      if (state.sparqlEndpoint) {
        const doelen = v.stub
          ? (v.sources || []).filter((iri) => !/publicaties\.rvig\.nl|\.pdf$/i.test(iri))
          : [v.iri];
        for (const iri of doelen) {
          if (!state.detailLoaded.has(iri)) await ensureDetail(iri);
        }
      }
      apply(v.iri, v);
    } catch (e) {
      box.className = 'vnav';
      wrap.appendChild(h('span', {
        class: 'src-err', text: t('vnav.loadFailed', { msg: e.message }),
      }));
    } finally {
      busy = false;
    }
  };

  // Beide pijlsleuven staan er ALTIJD: een ontbrekende buur levert een
  // onzichtbare plaatshouder van dezelfde breedte op. Zo blijven de datum en
  // de pijlen op exact dezelfde plek staan terwijl je door de versies loopt
  // (anders schuift de hele chip zodra de eerste of laatste versie in beeld
  // komt en mis je de pijl waar je net op klikte).
  //
  // Die plaatshouder is een ECHTE, uitgeschakelde <button> — geen span met
  // visibility:hidden, en zeker geen weggelaten element. Een onzichtbare span
  // vangt geen klik: die viel door naar de <summary> eronder, zodat de kaart
  // in- en uitklapte precies op de plek waar je zojuist nog aan het bladeren
  // was (meldpunt eigenaar). Een disabled button genereert géén click-event
  // en laat er dus ook geen bubbelen; de klik dooft daar stilletjes uit.

  // Zijn de buren betrouwbaar bekend? Ja zodra de container volledig gelezen
  // is, en ook zodra we het detail van deze policy hebben opgehaald (dan is er
  // niets meer bij te laden en zou een te hoge skelet-telling de pijlen
  // eeuwig aan houden).
  const known = !nm || nm.complete
    || !state.sparqlEndpoint || state.detailLoaded.has(policyIri);
  const older = known && nm ? nm.older : null;
  const newer = known && nm ? nm.newer : null;
  const total = nm ? nm.total : 1;
  // Skeletstand: meer versies dan we buren kennen → beide pijlen aan.
  const openEnded = !known && total > 1;

  // Buur nog onbekend (skeletstand): eerst het detail van DEZE policy laden,
  // dan pas kijken wat er in die richting ligt. Ligt er niets, dan wordt de
  // kop opnieuw getekend — met de nu bekende (en dus gedoofde) stand.
  const resolve = async (back) => {
    if (busy) return;
    busy = true;
    box.className = 'vnav busy';
    let v = null;
    try {
      if (state.sparqlEndpoint && !state.detailLoaded.has(policyIri)) {
        await ensureDetail(policyIri);
      }
      const fresh = versionNavModel(state.model, policyIri);
      v = fresh && (back ? fresh.older : fresh.newer);
      if (!v) apply(policyIri, fresh ? fresh.shown : null);
    } catch (e) {
      box.className = 'vnav';
      wrap.appendChild(h('span', {
        class: 'src-err', text: t('vnav.loadFailed', { msg: e.message }),
      }));
      busy = false;
      return;
    }
    busy = false;
    if (v) await go(v);
  };

  const arrow = (v, back) => {
    const glyph = back ? '‹' : '›';
    const live = !!v || openEnded;
    const label = v
      ? t(back ? 'vnav.olderDated' : 'vnav.newerDated', { date: versionNavDate(v) })
      : (live ? t(back ? 'vnav.older' : 'vnav.newer') : null);
    const b = h('button', {
      type: 'button', class: 'vnav-arrow' + (live ? '' : ' vnav-arrow-off'),
      title: label, 'aria-label': label, text: glyph,
    });
    if (!live) {
      b.disabled = true;
      b.setAttribute('disabled', '');
      // Buiten de tab- en voorleesvolgorde: er valt hier niets te kiezen.
      b.setAttribute('aria-hidden', 'true');
      b.setAttribute('tabindex', '-1');
      return b;
    }
    b.addEventListener('click', (e) => { stop(e); if (v) go(v); else resolve(back); });
    return b;
  };

  const menuLabel = t('vnav.allVersions', { n: total });
  box.appendChild(arrow(older, true));
  // Eén versie: de datum is geen knop (er valt geen lijst te openen), maar de
  // twee dode pijlsleuven staan er wél — zie de uniform-notitie hierboven.
  const date = total < 2
    ? h('span', { class: 'vnav-date mono', title: t('vnav.versionDate'), text: versionNavDate(shown) })
    : h('button', {
      type: 'button', class: 'vnav-date mono', title: menuLabel,
      'aria-label': t('vnav.versionAria', { date: versionNavDate(shown), menu: menuLabel }),
      'aria-haspopup': 'true', 'aria-expanded': 'false',
      text: versionNavDate(shown),
    });
  box.appendChild(date);
  box.appendChild(arrow(newer, false));
  wrap.appendChild(box);
  if (total < 2) return wrap;

  // Menu met de volledige lijst (recent-first) — zo blijft alles bereikbaar
  // wat de fold-out toonde. Pas gebouwd bij de eerste opening: op BRP-schaal
  // hangt er anders per kaart een lijst van tientallen regels in de DOM.
  const menu = h('div', { class: 'vnav-menu' });
  menu.hidden = true;
  let filled = false;
  let open = false;
  const setOpen = (v) => {
    open = v;
    menu.hidden = !v;
    date.setAttribute('aria-expanded', v ? 'true' : 'false');
  };
  const fill = () => {
    // Verse stand: in skeletmodus is de container tussen het bouwen van de
    // chip en het openen van het menu aangevuld met zijn zusterversies.
    const cur = versionNavModel(state.model, policyIri) || nm;
    const c = cur.container;
    const validity = (c.validFrom || c.validTo)
      ? t('vnav.validity', {
        from: compactDate(c.validFrom) || '…', to: compactDate(c.validTo) || '…',
      }) : '';
    menu.appendChild(h('div', { class: 'vnav-menu-head muted' }, [
      h('span', { text: t('vnav.allVersions', { n: cur.versions.length }) }),
      verkenBtn(c.iri),
    ]));
    menu.appendChild(h('div', { class: 'vnav-menu-sub muted', text: c.title + validity }));
    for (const v of [...cur.versions].reverse()) {
      const isShown = v.iri === policyIri;
      const row = h('button', {
        type: 'button', class: 'vnav-mi' + (isShown ? ' shown' : ''),
        title: versionPeriod(v), 'aria-current': isShown ? 'true' : null,
      }, [
        h('span', { class: 'vnav-mi-date mono', text: versionNavDate(v) }),
        h('span', { class: 'vchip ' + v.status, text: statusWord(v.status) }),
        h('span', { class: 'vnav-mi-title', text: v.title }),
      ]);
      row.addEventListener('click', (e) => { stop(e); setOpen(false); if (!isShown) go(v); });
      menu.appendChild(row);
    }
  };
  date.addEventListener('click', async (e) => {
    stop(e);
    if (!filled) {
      // Skeletstand: de zusterversies zitten nog niet in het model, dus zou
      // het menu één regel tonen terwijl de kop "alle versies (6)" belooft.
      // Eerst het detail bijladen (dat brengt de hele container mee).
      if (!known && state.sparqlEndpoint && !state.detailLoaded.has(policyIri)) {
        box.className = 'vnav busy';
        try { await ensureDetail(policyIri); } catch (err) { /* menu toont wat er is */ }
        box.className = 'vnav';
      }
      filled = true;
      fill();
    }
    setOpen(!open);
    // Buiten de chip klikken sluit het menu weer.
    if (open && typeof document.addEventListener === 'function') {
      document.addEventListener('click', () => setOpen(false), { once: true });
    }
  });
  wrap.appendChild(menu);
  return wrap;
}

// NIETS MEER TE VERBERGEN. Hier stond hiddenSetIris(): IRI's die uit de
// lijstsecties (en uit de telling in de statusregel) gehouden werden.
// Twee gevallen zijn er in de loop van 2026 uit verdwenen:
//   1. de BRON-SET naast elke overeenkomst — het register beschreef ieder
//      besluit twee keer (odrl:Set in de bronlaag + odrl:Agreement). Sinds de
//      ont-policying draagt /odrl alleen nog registerentiteiten en /brp
//      precies één beleidsrepresentatie per besluit;
//   2. het MINI-VERZOEK dat als stub aan een overeenkomst hangt. Dat kreeg
//      geen eigen kaart omdat het al als Verzoek-REGEL op de overeenkomst
//      stond — maar daarmee bleef een verzoek waar (nog) geen overeenkomst op
//      volgde óók onzichtbaar. Verzoeken hebben nu een EIGEN top-sectie; de
//      Verzoek-regel op de overeenkomst blijft, als sprong naar die kaart.
// Er is dus geen onderdrukking meer, en dus ook geen functie.

// --- Beleidsset (odrl:Set: generiek beleid zonder aanbod/overeenkomst-rol) ---

// Soort-pil van een set-kaart. Een odrl:Request krijgt dezelfde kaartvorm (het
// is beleid zonder aanbod-/overeenkomst-rol), maar hij staat in zijn eigen
// sectie en de pil zegt het ook: generieke ODRL-kernkennis, geen profiel- of
// datasetkennis. Is de policy (nog) niet in het model — de lijstindex kan aan
// een kaart vooruitlopen — dan blijft het de neutrale set-pil.
function kindPill(pol) {
  return pol && pol.isRequest
    ? explainKey(h('span', { class: 'kind-pill set request', text: t('kind.request') }), 'kind.request')
    : explainKey(h('span', { class: 'kind-pill set', text: t('kind.set') }), 'kind.set');
}

// De compacte kop-regel van een VERZOEK-kaart: kenmerk · datum · indiener,
// precies de drie velden die de Verzoek-regel op de overeenkomst-kaart ook
// toont — zodat je aan beide kanten van de sprong hetzelfde leest. Ze
// verhuizen daarmee uit de definitielijst naar de subtitel: op een verzoek
// zijn dit de identificerende gegevens, niet zomaar drie velden tussen tien
// andere. Levert null als geen van de drie er is (dan blijft de kop leeg en
// draagt alleen de titel in de summary de identiteit).
function requestSubtitle(s) {
  const bits = [];
  if (s.identifier) bits.push(h('span', { class: 'mono muted doc-ref', text: s.identifier }));
  const d = dayDate(s.issued);
  if (d) bits.push(h('span', { class: 'muted', text: d }));
  const who = policyAssignee(s);
  const naam = who && (who.label || who.curie || who.iri);
  if (naam) bits.push(h('span', { text: naam }));
  if (!bits.length) return null;
  const row = h('p', { class: 'req-sub' });
  bits.forEach((b, i) => {
    if (i) row.appendChild(document.createTextNode(' · '));
    row.appendChild(b);
  });
  return row;
}

// De volledige kaart-inhoud (header + regels) van één beleidsset. Wordt lazy
// gebouwd: pas bij de eerste uitklap van de kaart (of direct, bij kleine
// corpora waar de kaarten open starten).
//
// `compact` (de Verzoeken-sectie): kenmerk, datum en indiener staan als
// subtitel bovenaan en niet nóg een keer in de definitielijst.
// `answeredBy`: de overeenkomst(en) waarin op dit verzoek beslist is — leeg of
// null laat de regel gewoon weg (zie decidedInNodes: geen verzonnen status).
function setCardBody(s, { compact = false, answeredBy = null } = {}) {
  const frag = document.createDocumentFragment();
  // Effectieve afnemer: policy-assignee, of anders die van de eerste regel
  // (BRP: odrl:assignee staat op de Permission) — het veld blijft dan niet
  // langer leeg terwijl afnemers.ttl wél geladen is.
  const assignee = policyAssignee(s);
  const head = h('header', { class: 'offer-head' });
  if (!s.anon && !s.stub) head.appendChild(editorButton(s.iri));
  // Blank-node-policy: geen uid/curie-regel (het parser-id is geen identifier).
  if (s.curie) head.appendChild(h('div', { class: 'mono muted uid', text: s.curie }));
  if (s.description) head.appendChild(h('p', { class: 'offer-desc' }, [longText(s.description)]));
  // Request→Offer (note §4): het aanbod dat dit verzoek AANVRAAGT krijgt zijn
  // eigen betekenis-zin ("vraagt … aan") en valt daarmee uit "Afgeleid van" —
  // net zoals het ingevulde aanbod van een overeenkomst daar niet in staat.
  const asks = (s.asksFor || []).filter((a) => a && a.iri);
  const askIris = asksForIriSet(s);
  const overigeHerkomst = ((s.version && s.version.derivedFrom) || [])
    .filter((d) => !askIris.has(d.iri));
  const sub = compact ? requestSubtitle(s) : null;
  if (sub) head.appendChild(sub);
  if (asks.length) head.appendChild(h('p', { class: 'ask-line' }, [asksForNodes(asks)]));
  // De omgekeerde keten-link: in welke overeenkomst is op dit verzoek beslist.
  const beantwoord = decidedInNodes(answeredBy);
  if (beantwoord) head.appendChild(h('p', { class: 'answer-line' }, [beantwoord]));
  head.appendChild(kv([
    [term('field.assigner'), s.assigner ? ref(s.assigner) : null],
    [term('field.assignee'), (compact || !assignee) ? null : ref(assignee)],
    [term('field.issued'), compact ? null : s.issued],
    [term('field.replaces'), provRefNode(s.version && s.version.revisionOf)],
    [term('field.derivedFrom'), derivedFromValue(overigeHerkomst)],
    [term('field.profile'), s.profile ? h('span', { class: 'mono muted', text: curie(s.profile) }) : null],
    [term('field.reference'), compact ? null : identifierValue(s)],
  ]));
  const vl = versionLine({ ...s.version, revisionOf: null, derivedFrom: [] });
  if (vl) head.appendChild(vl);
  const xp = extraPropsBlock(s.extraProps);
  if (xp) head.appendChild(xp);
  frag.appendChild(head);
  const ops = h('div', { class: 'op-list' });
  // Ook hier de doorwerking samenvouwen: de historische besluit-stubs dragen
  // dezelfde vier stelselverplichtingen als het aanbod (zonder eigen
  // aanbodkoppeling — de terugval in offerRuleSplit vangt dat).
  for (const r of inheritFoldRows(s, { ownerAssignee: assignee })) ops.appendChild(r);
  const split = offerRuleSplit(state.model, s);
  if (split.fromOffer.length || split.own.obligations.length) {
    ops.appendChild(offerFoldBlock(split, null,
      { ownerAssignee: assignee, scope: s.anon ? null : s.iri }));
  }
  // De verplichtingen van deze Set (eigen én geërfd) gelden bij elke regel
  // eronder; ze reizen mee zodat de conformsToPolicy-uitklap ze kan noemen.
  const setDuties = policyLevelDuties(s);
  const opts = { ownerAssignee: assignee, setDuties, scope: s.anon ? null : s.iri };
  for (const r of ruleRows(split.own.permissions, opts)) ops.appendChild(r);
  for (const r of ruleRows(split.own.prohibitions, { ...opts, prohibition: true })) ops.appendChild(r);
  if (ops.children.length) frag.appendChild(ops);
  return frag;
}

// De kaart-inhoud van één VERZOEK: compacte kop + de omgekeerde keten-link.
function requestCardBody(s) {
  return setCardBody(s, { compact: true, answeredBy: answeredByOf(s.iri) });
}

// Eén volledig geopende set-kaart (gebruikt op de ?policy=-detailpagina).
// De versienavigator in de kop wisselt de kaart naar een andere versie.
// `bare`: dezelfde vaste kopopbouw als de verzoek-kaarten in de lijst — geen
// regeltelling. Zie setsCardsView voor waarom.
function setSection(s, anchorId, bodyFn = setCardBody, { bare = false } = {}) {
  const sec = h('details', { class: 'offer-group set-section', id: anchorId, open: '' });
  const fill = (pol) => {
    sec.innerHTML = '';
    const nOps = pol.obligations.length + pol.permissions.length
      + (pol.prohibitions ? pol.prohibitions.length : 0);
    sec.appendChild(cardSummary('offer-summary', [
      kindPill(pol),
      h('span', { class: 'offer-title', text: pol.title }),
      pol.anon ? null : versionStatusChip(pol.iri),
      verkenBtn(pol.anon ? pol.term : pol.iri),
      h('span', { class: 'op-sum muted', text: (nOps && !bare) ? t('rules.count', { n: nOps }) : '' }),
      pol.anon ? null : versionNav(pol.iri, (iri, v) => {
        const next = byIri(state.model.sets, iri) || (v && v.stub ? stubPolicy(v) : null);
        if (next) fill(next);
      }),
      chevron(),
    ]));
    sec.appendChild(bodyFn(pol));
  };
  fill(s);
  return sec;
}

// Heeft deze policy in ?sparql=-modus nog geen detail (regels) in de store?
function needsSparqlDetail(pol) {
  // Een stub-versie heeft per definitie geen regels in de bron: niets bij te
  // laden (en een CONSTRUCT erop zou telkens leeg terugkomen).
  if (!state.sparqlEndpoint || !pol || pol.anon || pol.stub) return false;
  if (state.detailLoaded.has(pol.iri)) return false;
  return !((pol.permissions && pol.permissions.length)
    || (pol.prohibitions && pol.prohibitions.length)
    || (pol.obligations && pol.obligations.length));
}

// CONSTRUCT het detail van één policy van het endpoint en werk store + model
// bij (zonder volledige herrender: de aanroeper vult alleen zijn kaart-body).
// rebuild: false laat het model met rust (batchgebruik: één rebuild na afloop).
async function ensureDetail(iri, { rebuild = true } = {}) {
  if (!iri || !state.sparqlEndpoint || state.detailLoaded.has(iri)) return false;
  if (state.detailPending.has(iri)) return state.detailPending.get(iri);
  const p = (async () => {
    const ttl = await sparqlConstruct(state.sparqlEndpoint,
      policyDetailQuery(iri, { excludeGraphs: state.excludeGraphs }));
    // Worker-pad: wacht tot de store vol is voordat we bijladen/herbouwen —
    // een model uit een half opgebouwde store zou policies laten verdwijnen.
    if (state.storeReady && !state.storeHydrated) await state.storeReady;
    addSource(state.store, ttl, 'ttl');
    // Ook in state.sources, zodat een her-ingest (bv. bron toevoegen) de
    // reeds geladen details niet kwijtraakt.
    if (state.sources) state.sources.push({ name: iri + ' (SPARQL-detail)', content: ttl, format: 'ttl', fromSparql: true });
    state.detailLoaded.add(iri);
    if (rebuild) {
      state.model = buildModel(state.store);
      state.fullNav = state.nav = buildNav(state.model);
      // Afgeleide indexen die aan het OUDE model hingen ongeldig maken. Het
      // bijgeladen detail kan een Agreement→Request-relatie meebrengen die er
      // nog niet was; zonder dit zou de verzoek-kaart die pas na de volgende
      // volledige render zien (answeredByOf).
      state.answeredBy = null;
    }
    return true;
  })();
  state.detailPending.set(iri, p);
  try { return await p; } finally { state.detailPending.delete(iri); }
}

// Bronnen van een stub-versie die als DATA bij te laden zijn: de gepubliceerde
// PDF-verwijzingen (Tabel 35, besluit-PDF's) zijn documenten, geen policies.
function stubDataSources(v) {
  return ((v && v.sources) || []).filter((iri) => !/publicaties\.rvig\.nl|\.pdf$/i.test(iri));
}

// De inhoud van een STUB-kaart staat niet op de versie zelf maar op zijn bron
// in de bron-datalaag. In ?sparql=-modus is die nog niet geladen — bij een
// beëindigd besluit geldt dat óók voor de kaart die de sectie meteen toont
// (er is geen geldende, getypeerde versie die het lijst-skelet zou opleveren).
// Deze route laadt eerst het detail van de stub zelf (dat brengt zijn
// prov:wasDerivedFrom mee) en daarna de bron(nen), en geeft de bijgewerkte
// versie uit het model terug. Levert null als er niets te laden viel.
async function ensureStubContent(iri) {
  if (!state.sparqlEndpoint) return null;
  const versionOf = (x) => {
    const nm = versionNavModel(state.model, x);
    return nm ? nm.shown : null;
  };
  let v = versionOf(iri);
  let bij = false;
  if (!state.detailLoaded.has(iri)) {
    bij = (await ensureDetail(iri)) || bij;
    v = versionOf(iri) || v;
  }
  for (const s of stubDataSources(v)) {
    if (!state.detailLoaded.has(s)) bij = (await ensureDetail(s, { rebuild: false })) || bij;
  }
  if (!bij) return null;
  state.model = buildModel(state.store);
  state.fullNav = state.nav = buildNav(state.model);
  return versionOf(iri) || v;
}

// Is er voor deze stub nog inhoud bij te laden? (Voorkomt dat een kaart die na
// het bijladen opnieuw gevuld wordt, meteen weer gaat laden.)
function stubNeedsContent(pol) {
  if (!state.sparqlEndpoint || !pol || !pol.stub) return false;
  if (!state.detailLoaded.has(pol.iri)) return true;
  const nm = versionNavModel(state.model, pol.iri);
  return stubDataSources(nm && nm.shown).some((s) => !state.detailLoaded.has(s));
}

// --- Lazy kaartenlijst voor de beleidssets-sectie ----------------------------
// De sectie rendert ALTIJD kaarten (de vroegere indextabel-modus is
// vervallen). Twee lazy-dimensies houden de DOM klein op BRP-schaal:
//   1. kaart-BODY's worden pas gebouwd bij de eerste uitklap (de summary-kop
//      is licht); boven CARD_COLLAPSE_THRESHOLD starten kaarten ingeklapt;
//   2. de kaartenlijst wordt GECHUNKT toegevoegd (CARD_CHUNK_SIZE per keer),
//      bijladen via een IntersectionObserver-sentinel onderaan (met een
//      "Meer laden"-knop als fallback). Filteren herstart de chunks.
// Erboven het filterveld (titel/afnemer, pure filterIndexRows) met een
// "x van y"-teller. Temporele containers: één kaart per container
// ("(n versies)"), de kaart toont de geldende versie.
//
// Dezelfde lijst bedient sinds aug 2026 TWEE secties: Beleidssets en
// Verzoeken. Ze verschillen alleen in sectie-id (waar het filter zijn
// meegedragen tekst vandaan haalt), aria-label en de body-bouwer van de
// kaart — de lazy/chunk/filter-mechaniek is identiek, dus die staat hier één
// keer.
function setsCardsView(sets, {
  id = 'sectie-sets', ariaLabel = null, body = setCardBody, withStatus = true,
  kind = null,
} = {}) {
  // VERZOEK-kaarten hebben één vaste kopopbouw: pil, titel, verken-knop,
  // datumchip, chevron — en verder niets. Twee dingen vielen daar bewust uit:
  //   - de REGELTELLING. Een verzoek draagt in dit profiel één minimale
  //     permission omdat een policy nu eenmaal een regel moet hebben; "1 regel"
  //     is dus een technisch feit, geen informatie. Erger nog: hij verscheen
  //     alleen bij een al geladen kaart, waardoor de ene kop anders oogde dan
  //     de andere.
  //   - de AFNEMER naast de titel. Op een verzoek is dat de indiener, en die
  //     staat al — mét kenmerk en datum — in de subtitel van de kaart, waar
  //     hij ontworpen is. Naast de titel las hij bovendien als een verwijzing
  //     naar de overeenkomst, wat hij niet is.
  const bare = kind === 'request';
  const rows = setIndexRows(sets, state.model.temporalContainers);
  // Levensfase per rij (voor het statusfilter, zie sectionFilterControl).
  for (const r of rows) r.status = policyLifecycle(state.model, sets[r.idx]);
  // Eerste-beeld-fase: ALTIJD ingeklapt starten. Open kaarten bouwen hun body
  // meteen, en in ?sparql=-modus haalt die body per kaart een detail-CONSTRUCT
  // op — precies de bui van n queries die deze fase wil vermijden. (Onder de
  // gewone drempel starten kaarten open; dat blijft zo zodra de volledige
  // index er is.)
  const collapsed = cardsStartCollapsed(rows.length) || state.listPhase === 'first';
  const box = h('div', { class: 'set-cards' });
  const rendered = new Map(); // set-IRI -> gerenderde kaart (voor revealInUi)
  const list = h('div', { class: 'set-card-list' });
  const sentinel = h('div', { class: 'card-sentinel', 'aria-hidden': 'true' });
  const moreBtn = h('button', { type: 'button', class: 'btn card-more', text: t('list.loadMore') });
  let visible = rows;
  let offset = 0;

  const buildCard = (r) => {
    // Kaart op basis van de (lichte) indexrij; de body komt uit het model.
    // De kaart van een temporele container toont de GELDENDE versie; de
    // versienavigator in de kop wisselt naar een oudere/nieuwere versie
    // (shownIri) en herbouwt kop + body.
    const sec = h('details', { class: 'offer-group set-card', 'data-iri': r.iri });
    if (!collapsed) sec.setAttribute('open', '');
    let shownIri = r.iri;
    let shownStub = null;   // gezet als de navigator naar een stub-versie wisselt
    let built = false;

    const shownPolicy = () => byIri(state.model.sets, shownIri)
      || (shownStub ? stubPolicy(shownStub) : null)
      || (shownIri === r.iri ? sets[r.idx] : null);

    const build = async () => {
      if (built) return;
      built = true;
      const want = shownIri;
      const holder = h('div', { class: 'card-body-holder' });
      sec.appendChild(holder);
      let pol = shownPolicy();
      if (pol && needsSparqlDetail(pol)) {
        holder.appendChild(cardLoading());
        try {
          await ensureDetail(pol.iri);
          pol = byIri(state.model.sets, want) || pol;
        } catch (e) {
          holder.innerHTML = '';
          holder.appendChild(h('p', { class: 'src-err', text: t('err.detailLoad', { msg: e.message }) }));
          built = false; // opnieuw proberen bij de volgende uitklap
          return;
        }
        holder.innerHTML = '';
        // Zie agreementGroup: het bijgeladen detail kent de versiehistorie,
        // dus de kop (met de navigator) moet mee herbouwd worden.
        if (shownIri === want) { fill(); return; }
      }
      if (pol && shownIri === want) holder.appendChild(body(pol));
    };

    const summaryFor = () => {
      const pol = shownPolicy();
      const nm = versionNavModel(state.model, shownIri);
      const rules = pol
        ? (pol.permissions || []).length + (pol.prohibitions || []).length
          + (pol.obligations || []).length
        : (shownIri === r.iri ? r.rules : 0);
      const from = nm ? compactDate(nm.shown.effectiveFrom) : r.effectiveFrom;
      // "vanaf …" alleen als de navigator-chip een ANDERE datum toont (die
      // toont dct:issued, met terugval op effectiveFrom) — anders zou
      // dezelfde datum twee keer in de kop staan.
      // (Ook zonder container draagt de kop nu een chip — dan is de datering
      // van de policy zelf de chipdatum.)
      const fromShownInChip = !!from
        && versionNavDate(nm ? nm.shown : policyOwnVersion(shownIri))
          === versionNavDate({ effectiveFrom: from });
      const sumBits = [];
      if (r.versions != null && r.versions > 1) sumBits.push(t('versions.count', { n: r.versions }));
      if (rules && !bare) sumBits.push(t('rules.count', { n: rules }));
      if (from && !fromShownInChip) sumBits.push(t('summary.from', { date: from }));
      if (r.superseded) sumBits.push(t('summary.superseded'));
      return cardSummary('offer-summary', [
        kindPill(pol),
        h('span', { class: 'offer-title', text: r.title }),
        versionStatusChip(shownIri),
        (!bare && r.assignee && !r.title.includes(r.assignee))
          ? h('span', { class: 'agr-assignee muted', text: r.assignee }) : null,
        verkenBtn(pol ? (pol.anon ? pol.term : pol.iri) : shownIri),
        h('span', { class: 'op-sum muted', text: sumBits.join(' · ') }),
        (pol && pol.anon) ? null : versionNav(shownIri, (iri, v) => {
          shownIri = iri;
          shownStub = v && v.stub ? v : null;
          fill();
        }),
        chevron(),
      ]);
    };

    const fill = () => {
      const wasBuilt = built;
      built = false;
      sec.innerHTML = '';
      sec.appendChild(summaryFor());
      if (wasBuilt || !collapsed) build();
    };

    if (collapsed) sec.addEventListener('toggle', () => { if (sec.open) build(); });
    // Hook voor revealInUi: het toggle-event vuurt in de browser pas async, dus
    // de terugsprong bouwt de body rechtstreeks (en kan er dan in zoeken).
    sec.odrlOpenBody = build;
    fill();
    return sec;
  };

  const updateCount = () => {
    const total = rows.length;
    // Eerste-beeld-fase: het totaal is nog onbekend (afgekapte lijst).
    if (state.listPhase === 'first') { filter.count.textContent = sectionCountText(total); return; }
    filter.count.textContent = '· ' + (visible.length === total
      ? num(total)
      : t('count.ofTotal', { n: visible.length, total }))
      + filter.suffix();
  };
  // Tekstfilter EN statusfilter (zie sectionFilterControl); deze sectie heeft
  // geen aanbod-dropdown (beleidssets hangen niet aan een aanbod).
  let base = rows;
  const applyFilters = () => {
    visible = base.filter((r) => filter.matches(r.status));
    restart();
  };
  const filter = sectionFilterControl({
    id,
    withStatus,
    placeholder: t('filter.placeholder'),
    ariaLabel: ariaLabel || t('filter.ariaSets'),
    onChange: () => {
      base = filterIndexRows(rows, filter.text());
      applyFilters();
    },
  });
  // Een over de fasewissel meegedragen tekstfilter geldt meteen (zie
  // sectionFilterControl); zonder dat is base gewoon alles.
  if (filter.text()) base = filterIndexRows(rows, filter.text());

  const renderChunk = () => {
    const { items, nextOffset, done } = cardChunk(visible, offset);
    for (const r of items) {
      const card = buildCard(r);
      rendered.set(r.iri, card);
      list.appendChild(card);
    }
    offset = nextOffset;
    sentinel.hidden = done;
    moreBtn.hidden = done;
    if (!done) {
      const rest = visible.length - offset;
      moreBtn.textContent = t('list.loadMoreRest', { n: rest });
    }
  };
  const restart = () => {
    list.innerHTML = '';
    rendered.clear();
    offset = 0;
    renderChunk();
    updateCount();
  };

  moreBtn.addEventListener('click', renderChunk);
  if (typeof IntersectionObserver !== 'undefined') {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting) && offset < visible.length) renderChunk();
    }, { rootMargin: '600px 0px' });
    io.observe(sentinel);
  }

  const api = { box, filter, onReveal: null };
  api.resolveCard = (iri) => {
    if (!rows.some((r) => r.iri === iri)) return null;
    if (api.onReveal) api.onReveal();
    if (!visible.some((r) => r.iri === iri)) {
      filter.reset();
      base = rows;
      applyFilters();
    }
    let guard = 0;
    while (!rendered.has(iri) && offset < visible.length && guard++ < 10000) renderChunk();
    return rendered.get(iri) || null;
  };

  box.appendChild(list);
  box.appendChild(sentinel);
  box.appendChild(moreBtn);
  applyFilters(); // eerste render: ook ?status= uit de URL geldt meteen
  return api;
}

// --- Machine-uitvoerbaar beleid (de "schemas"-sectie) ------------------------

// HET ARTEFACTFORMULIER — SINDS AUG 2026 SHAPE-GEDREVEN, NIET MEER GESCHREVEN.
//
// Tot dan stond hier als code welke velden een apnl:PolicyArtifact toont, in
// welke volgorde, met welk label per taal en in welke vorm. Die kennis hoort
// niet in een viewer maar in de spec: zij staat nu als SHACL-shape met
// DASH-weergaveannotaties in data/shapes/formulier-artefact.ttl, meegeleverd
// als assets/artifact-form-shape.js (zelfde patroon als de ODRL-labelbundel).
// Het formulier volgt daarmee vanzelf wanneer het profiel een veld toevoegt, en
// dezelfde machinerie werkt voor élke domeinklasse — een bron die haar eigen
// sh:NodeShape meebrengt, krijgt haar eigen formulier zonder een regel code
// hier (zie forms.js en Visualisation Note §8).
//
// GEEN TYPE-PILL MEER (besluit eigenaar, aug 2026). rdf:type was een chip naast
// de titel, gekozen door een heuristiek die de profielklasse voorrang gaf. In
// het generieke pad is het een gewone rij "Soort", en beide klassen mogen
// erin — een pill-heuristiek in de renderer zou precies de domeinkennis
// terugbrengen die uit de code weg moest.
//
// WAT HIER WÉL BLIJFT is presentatie, en niets anders: monospace (afgeleid uit
// sh:pattern — een waarde met een machinesyntaxis leest beter in mono),
// afbreekbaarheid van één lange token, links die in een nieuw tabblad openen,
// en de noot als aparte alinea onder de velden.
//
// ÉÉN PLEK sinds aug 2026: de uitklap van een conformsToPolicy-rij. De sectie
// "Machine-uitvoerbaar beleid" met dezelfde velden in kaartvorm is vervallen —
// een artefact is geen zelfstandig hoofdstuk van het beleid maar het ding
// waarnaar één voorwaarde verwijst, en het stond er twee keer.
// GEEN EIGEN UITGANGEN OP DE TITELREGEL. De ⌕- en ⚙-knoppen staan al op de
// SUMMARY erboven (de conformsToPolicy-rij); ze hier nog een keer zetten gaf
// twee identieke knopparen onder elkaar. En een ⚙ zou het paneel op een
// ARTEFACT zetten — dat bestaat sinds aug 2026 niet meer: de keten in het
// paneel blijft binnen de ODRL-termen en eindigt bij de rij die dit formulier
// draagt.

// De shapes uit de GELADEN bronnen, één keer per store gelezen. Zij winnen van
// de meegeleverde shape zodra hun sh:targetClass dezelfde is.
let loadedShapesCache = null;
function loadedFormShapes() {
  if (loadedShapesCache && loadedShapesCache.store === state.store) return loadedShapesCache.shapes;
  loadedShapesCache = {
    store: state.store,
    shapes: state.store ? readShapes(state.store) : [],
  };
  return loadedShapesCache.shapes;
}

// Eén lange token (een hash, een URL zonder spaties) mag overal afbreken,
// anders duwt hij de kolom uit beeld. Zuiver presentatie, geen vocabulaire.
const LONG_TOKEN = 40;
function longToken(text) {
  return String(text).length >= LONG_TOKEN && !/\s/.test(text);
}

// De waarden van één rij. `kind` komt uit de shape (dash:viewer), de klassen
// eromheen zijn van de viewer.
//
// MEERWAARDIG -> ELKE WAARDE EEN EIGEN CHIP (besluit eigenaar, aug 2026).
// Een property met meer dan één waarde stond als kommatekst op één regel
// ("Soort: SoftwareSourceCode, Cedar-policyset"), en dan leest een opsomming
// van losse waarden als één lange waarde — precies de klacht die bij de
// rechterwaarde van een voorwaarde al is opgelost. Dezelfde oplossing, dezelfde
// stijl: .c-chips (flex-wrap) met een .c-slot.right per waarde, naast elkaar en
// afbrekend waar de kolom ophoudt. GENERIEK, dus voor élke viewer
// (Label/Literal/URI): het is een eigenschap van het AANTAL waarden, niet van
// het widget-type.
//
// ENKELVOUDIG BLIJFT TEKST. Één waarde in een chip zou een rustige veldrij in
// een badge veranderen zonder dat er iets te onderscheiden valt; en een lange
// hash of URL leest in een chip slechter dan als gewone (mono) tekst.
function formValueNode(v, { mono = false } = {}) {
  if (v.kind === 'link') {
    return h('a', { href: v.text, target: '_blank', rel: 'noopener', text: v.text });
  }
  // dash:LabelViewer = "a hyperlink to that URI based on the display label":
  // de linktekst is het label, de bestemming de IRI. Alleen voor een knoop die
  // buiten de geladen data ligt (forms.js zet `external`), en alleen voor een
  // schema dat een browser kan volgen — dezelfde regel en dezelfde vorm als de
  // Bron-rij in extraPropsBlock.
  if (v.kind === 'label' && v.external && /^https?:/.test(v.iri || '')) {
    return h('a', { href: v.iri, target: '_blank', rel: 'noopener', text: v.text });
  }
  const cls = [mono ? 'mono' : '', longToken(v.text) ? 'hash' : ''].filter(Boolean).join(' ');
  return h('span', cls ? { class: cls, text: v.text } : { text: v.text });
}

// Het label van één formulierrij. Heeft de rij een uitleg, dan is het label
// een <span> met de affordance; anders blijft het de kale tekst die het was.
function formLabel(row) {
  return row.description
    ? explained(h('span', { text: row.label }), row.description)
    : row.label;
}

function formValues(row) {
  const mono = !!row.pattern;
  if (row.values.length > 1) {
    return h('span', { class: 'c-chips' }, row.values.map((v) => h('span',
      { class: 'c-slot right' }, [formValueNode(v, { mono })])));
  }
  return h('span', {}, row.values.map((v) => formValueNode(v, { mono })));
}

// Het weergavemodel uit forms.js naar DOM. GROEPSKOP: alleen bij MEER DAN ÉÉN
// blok met rijen — bij één groep ís het kv-blok de groep, en een kopje erboven
// zou ruis zijn. Een ONGEGROEPEERDE rij wordt een alinea met haar label ervoor;
// zo staat de eerlijkheidsnoot (rdfs:comment, sh:order 90) onder de velden.
function formBox(m, { head = true } = {}) {
  const box = h('div', { class: 'artifact-form' });
  if (head) {
    box.appendChild(h('div', { class: 'artifact-title' }, [
      h('span', { text: m.title }),
      // dash:KeyInfoRole: wat naast de titel hoort. De meegeleverde
      // artefact-shape gebruikt hem niet (zie hierboven); een eigen shape mag.
      ...m.keyInfo.map((it) => h('span', { class: 'chip type', text: it.text })),
    ]));
  }
  if (m.description) box.appendChild(h('p', { class: 'muted' }, [longText(m.description)]));
  const groepen = m.blocks.filter((b) => b.kind === 'group');
  for (const b of m.blocks) {
    if (b.kind === 'group') {
      if (groepen.length > 1 && b.label) {
        box.appendChild(h('div', { class: 'form-group-label', text: b.label }));
      }
      // VELDLABEL MET UITLEG: sh:description van de property-shape, met de
      // definitie van het pad-predicaat als terugval (zie forms.js).
      box.appendChild(kv(b.rows.map((r) => [formLabel(r), formValues(r)])));
    } else {
      box.appendChild(h('p', { class: 'artifact-note muted' }, [
        h('span', { class: 'artifact-note-label', text: b.label + ': ' }),
        longText(b.values.map((v) => v.text).join(', ')),
      ]));
    }
  }
  return box;
}

// Het formulier van een willekeurige domeinknoop, of null als geen enkele shape
// hem dekt. `fallback` is de shape die geldt wanneer de knoop geen passend
// rdf:type draagt maar de aanroeper wél weet wat hij is (het artefactpad).
function shapeFormFor(iri, { head = true, fallback = null } = {}) {
  if (!state.store || !iri) return null;
  const ingebouwd = builtinShapes([ARTIFACT_FORM_SHAPE_TTL]);
  const shape = shapeForNode(state.store, iri, loadedFormShapes(), ingebouwd) || fallback;
  if (!shape) return null;
  return formBox(formModel(state.store, iri, shape), { head });
}

function artifactForm(a, { head = true } = {}) {
  const ingebouwd = builtinShapes([ARTIFACT_FORM_SHAPE_TTL]);
  // Een anonieme knoop heeft geen adres om de graaf mee te bevragen; die valt
  // meteen op de kale titel terug (komt in de praktijk niet voor: een artefact
  // wordt aan zijn IRI herkend).
  const vorm = a.anon ? null : shapeFormFor(a.iri, { head, fallback: ingebouwd[0] || null });
  // Geen store (of geen shape): dan blijft er de kale titel over. Dat kan
  // alleen in een half-gehydrateerde endpoint-modus voorkomen.
  return vorm || h('div', { class: 'artifact-form' }, [
    head ? h('div', { class: 'artifact-title' }, [h('span', { text: a.title })]) : null,
  ].filter(Boolean));
}

// DE SECTIE "MACHINE-UITVOERBAAR BELEID" IS VERVALLEN (besluit eigenaar, aug
// 2026). Zij zette elk artefact nog een keer als losse kaart onderaan het
// document — dezelfde velden als in de conformsToPolicy-uitklap, plus een
// opsomming van wat het uitwerkt. Beide horen ergens anders: het artefact bij
// de voorwaarde die ernaar verwijst (uitklappen = artifactForm), en de vraag
// "wat werkt dit uit?" in het zijpaneel (⚙). Het parse-model houdt
// model.artifacts/model.bundles gewoon bij — de nav-groep in parse.js dient
// nog de andere weergave (index.html).

// --- Renderen ---------------------------------------------------------------
// NB: het vroegere sticky ankermenu (#doc-anchors) is verwijderd (beslissing
// eigenaar — zelfs bij 15 containers al te groot). Navigatie loopt via de
// policy-selector in de topbar, het filterveld van de kaartenlijst en de
// sectiekoppen; de section-/kaart-id's blijven bestaan als ankerdoelen voor
// interne kruisverwijzingen ("Op aanbod:", artefact-links).
// Eén render van de PAGINA: het document opnieuw opbouwen en daarna de stand
// waarin de pagina staat aanzetten. Staat de verkenner aan (een taalwissel,
// een bron erbij, een bijgeladen detail), dan blijft het document verborgen en
// tekent de verkenner zichzelf opnieuw — anders zou de lezer bij elke
// herrender terug in het document staan.
function renderAll() {
  renderDoc();
  showDocPane(!!state.verkenIri);
  if (!state.verkenIri) return;
  renderVerkenNow();
  // Endpoint-modus: de knoop uit de URL is bij het opstarten nog niet
  // opgehaald. ensureVerkenNode doet per knoop precies één CONSTRUCT en is
  // verder een no-op, dus dit mag bij elke herrender langskomen.
  ensureVerkenNode(state.verkenIri).catch(() => { /* de weergave meldt het */ });
}

function renderDoc() {
  const main = el('doc-main');
  main.innerHTML = '';
  state.revealSections = [];
  state.offerCards = new Map();
  state.sectionFilters = new Map();
  // De keten als opzoektabel voor het rechterpaneel. Vóór het renderen, want
  // elk ⚙ dat we zo tekenen draagt alleen een ref — de rest zoekt het paneel
  // bij een klik hierin op.
  state.fillIndex = buildFillIndex(state.model);
  // Omkeermap verzoek -> beantwoordende overeenkomst(en); lazy opgebouwd bij
  // de eerste verzoek-kaart, per render één keer (answeredByOf).
  state.answeredBy = null;


  // ?policy= wijst naar een STUB-versie (een vervangen versie waarvan alleen
  // de documentdata in de bron staan). Zonder deze tak viel de weergave terug
  // op de geldende versie van de container — je kreeg dus een andere versie
  // dan je opvroeg.
  const scopeNav = state.policyScope && !byIri(state.model.agreements, state.policyScope)
    && !byIri(state.model.sets, state.policyScope) && !byIri(state.model.offers, state.policyScope)
    ? versionNavModel(state.model, state.policyScope) : null;
  if (scopeNav && scopeNav.shown.stub) {
    const huidig = scopeNav.versions.find((v) => v.status === 'current');
    const pol = stubPolicy(scopeNav.shown);
    // Soort van de kaart: die van de container (bij een beëindigd besluit is
    // er geen geldende versie die het kon zeggen), anders die van de geldende.
    const soort = (scopeNav.container && scopeNav.container.kind)
      || (huidig && huidig.kind) || null;
    main.appendChild(soort === 'agreement'
      ? agreementPage(pol) : setSection(pol, 'versie-0'));
    return;
  }

  // ?policy= wijst naar een Agreement: één overeenkomst-pagina.
  const scopedAgr = state.policyScope
    ? byIri(state.model.agreements, state.policyScope) : null;
  if (scopedAgr) {
    main.appendChild(agreementPage(scopedAgr));
    return;
  }

  // Twee topsecties: Aanbod en Overeenkomsten (uit de eventueel gescopete nav).
  const offers = [];
  const agrs = [];
  const agrSeen = new Set();
  const addAgr = (id) => {
    if (agrSeen.has(id)) return;
    agrSeen.add(id);
    const a = byIri(state.model.agreements, id);
    if (a) agrs.push(a);
  };
  for (const node of state.nav) {
    if (node.kind === 'offer') {
      const offer = byIri(state.model.offers, node.id);
      if (offer) offers.push(offer);
      for (const child of node.children || []) {
        if (child.kind === 'agreement') addAgr(child.id);
      }
    } else if (node.id === '__loose-agreements__') {
      for (const child of node.children || []) addAgr(child.id);
    }
  }

  // Beëindigde besluiten: containers waarvan geen enkele versie nog een
  // getypeerde policy is (alleen documentstubs). Ze staan niet in
  // model.agreements — hun kaart komt uit de laatste versie — maar het besluit
  // WAS een overeenkomst (dct:type op de identiteit), dus het hoort in deze
  // sectie en niet bij de Beleidssets.
  for (const c of stubOnlyContainers(state.model, 'agreement')) {
    const v = containerCardVersion(c);
    if (!v || agrSeen.has(v.iri)) continue;
    agrSeen.add(v.iri);
    agrs.push(stubPolicy(v));
  }

  const offerAnchor = new Map(offers.map((o, i) => [o.iri, 'aanbod-' + i]));
  const agrAnchor = new Map(agrs.map((a, i) => [a.iri, 'overeenkomst-' + i]));
  // Aanbod op deze pagina -> ankerlink; aanbod buiten de huidige scope
  // (wel in de data) -> ?policy=-link naar zijn eigen pagina.
  const offerLink = (off) => {
    if (offerAnchor.has(off.iri)) {
      return h('a', { href: '#' + offerAnchor.get(off.iri), text: off.title });
    }
    const u = new URLSearchParams(location.search);
    u.set('policy', off.iri);
    return h('a', { href: '?' + u.toString(), text: off.title });
  };

  // De telling-links op de Offer-kaarten kunnen alleen filteren wanneer de
  // sectie de lijstweergave (met filterveld) gebruikt; agreementsListView
  // registreert de filterfunctie hieronder. Reset bij elke render.
  state.agrFilterByOffer = null;

  if (offers.length) {
    const cards = [];
    for (const o of offers) {
      const offerAgrs = agrs.filter((a) => (a.offers || []).includes(o.iri));
      const card = offerSection(o, offerAgrs, offerAnchor.get(o.iri));
      state.offerCards.set(o.iri, card);
      cards.push(card);
    }
    const sec = pageSection('sectie-aanbod', t('section.offers'), {
      count: offers.length, body: [...cards, listTail()],
    });
    state.revealSections.push({ sec, resolve: (iri) => state.offerCards.get(iri) || null });
    main.appendChild(sec);
  }

  if (agrs.length) {
    // De lijstweergave is permanent; alleen het inklapgedrag schaalt: kleine
    // corpora (≤ inline-drempel) starten open met direct gebouwde body's, op
    // schaal (BRP: 1.392) ingeklapt met lazy body's en chunks. Hier springt ook
    // de telling-link van een Offer-kaart heen — die zet de aanbod-dropdown in
    // het filterpaneel en opent sectie + paneel.
    const view = agreementsListView(agrs, agrAnchor, offerLink, offers);
    view.filter.setLoading(state.listPhase === 'first');
    state.sectionFilters.set('sectie-overeenkomsten', view.filter);
    const sec = pageSection('sectie-overeenkomsten', t('section.agreements'), {
      filter: view.filter, body: [view.box, listTail()],
    });
    view.onReveal = () => openPageSection(sec);
    state.revealSections.push({ sec, resolve: view.resolveCard });
    main.appendChild(sec);
  }

  // Beleidssets én VERZOEKEN. Beide zijn in ODRL-termen policies zonder
  // aanbod-/overeenkomst-rol en staan dus samen in model.sets/state.nav;
  // isRequest splitst ze in twee secties. Topniveau-knopen zijn (bij temporele
  // containers) de geldende versies; oudere of toekomstige versies hangen als
  // kinderen onder hun container. Is de weergave gescopet (?policy=) op zo'n
  // versie, toon dan díe versie.
  const sets = [];
  const requests = [];
  const addPolicy = (s) => { if (s) (s.isRequest ? requests : sets).push(s); };
  for (const node of state.nav) {
    if (node.kind !== 'set') continue;
    if (state.policyScope && node.id !== state.policyScope) {
      const child = (node.children || []).find((ch) => ch.id === state.policyScope);
      if (child) { addPolicy(byIri(state.model.sets, child.id)); continue; }
    }
    addPolicy(byIri(state.model.sets, node.id));
  }

  // Eén lijstsectie-bouwer voor beide: dezelfde mechaniek (teller, filter,
  // inklapbaar, skeletons, "meer tonen"), alleen een andere id/titel/body.
  const listSection = (id, title, items, opts) => {
    let sec;
    if (state.policyScope) {
      // ?policy=-detail: de gevraagde versie als volledig geopende kaart
      // (setIndexRows zou een niet-geldende versie juist wegfilteren).
      sec = pageSection(id, title, {
        count: items.length,
        body: items.map((s, i) => setSection(s, opts.anchor + i, opts.body,
          { bare: opts.kind === 'request' })),
      });
      state.revealSections.push({ sec, resolve: () => null });
    } else {
      // Altijd de (lazy, gefilterde, gechunkte) kaartenlijst — de vroegere
      // indextabel-omklap boven een drempel is vervallen.
      const view = setsCardsView(items, {
        id, ariaLabel: opts.ariaLabel, body: opts.body,
        withStatus: opts.withStatus !== false, kind: opts.kind || null,
      });
      view.filter.setLoading(state.listPhase === 'first');
      state.sectionFilters.set(id, view.filter);
      sec = pageSection(id, title, { filter: view.filter, body: [view.box, listTail()] });
      view.onReveal = () => openPageSection(sec);
      state.revealSections.push({ sec, resolve: view.resolveCard });
    }
    main.appendChild(sec);
  };

  // VERZOEKEN als derde hoofdsectie, direct ná Overeenkomsten. De volgorde is
  // die van het belang voor de lezer (aanbod → besluit → aanvraag), niet die
  // van de keten; de keten-leesvolgorde staat op de kaarten zelf, als
  // "vraagt … aan" en "beantwoord door …". Een eigen sectie is nodig omdat
  // een verzoek waar (nog) geen overeenkomst op volgde anders nergens staat.
  if (requests.length) {
    listSection('sectie-verzoeken', t('section.requests'), requests, {
      anchor: 'verzoek-', ariaLabel: t('filter.ariaRequests'), body: requestCardBody,
      kind: 'request',
      // Verzoeken kennen geen levensfase (geen geldigheidsperiode): het
      // statusfilter zou drie loze vinkjes tonen.
      withStatus: false,
    });
  }

  if (sets.length) {
    listSection('sectie-sets', t('section.sets'), sets, {
      anchor: 'set-', ariaLabel: t('filter.ariaSets'), body: setCardBody,
    });
  }

  if (!main.children.length) {
    let msg = t('err.noPolicies');
    if (state.lastErrors && state.lastErrors.length) {
      msg += t('err.parseErrors', {
        list: state.lastErrors.map((e) => `${e.name} (${e.message})`).join('; '),
      });
    }
    renderEmpty(msg);
  }
}

// --- Bronnen-fold-out (petstore's explore-balk, maar voor RDF-bronnen) -------

// URL-sync: de adresbalk weerspiegelt de actuele bronnenlijst met UITSLUITEND
// de generieke ?src=-parameter (canoniek; ?ttl=/?sparql= zijn leesbare
// legacy-aliassen die hier opgeruimd worden). Alleen aangeroepen na een
// gebruikersactie (bron toevoegen/verwijderen) — een binnenkomende legacy-URL
// blijft ongemoeid tot de gebruiker de bronnen wijzigt.
function syncSrcParams() {
  const u = new URLSearchParams(location.search);
  u.delete('src'); u.delete('ttl'); u.delete('sparql');
  for (const s of state.sources || []) {
    if (s.url && !s.fromSparql) u.append('src', s.url);
  }
  if (state.sparqlEndpoint) u.append('src', state.sparqlEndpoint);
  history.replaceState(null, '', u.toString() ? '?' + u.toString() : location.pathname);
}

// Verwijder één bron uit de lijst. Triples zijn niet per bron getagd in de
// store; de betrouwbare route is opnieuw opbouwen uit de resterende bronnen
// (via de bestaande ingest-/workerroute — acceptabel bij de huidige
// laadtijden). Een verwijderde SPARQL-bijlaadbron mag later opnieuw geladen
// worden: de "al opgehaald"-administratie moet dan mee opgeruimd, anders zou
// de viewer denken dat de triples er nog zijn. Twee soorten bijlaadbron, met
// elk hun eigen administratie: het policy-detail (detailLoaded) en één niveau
// van een collectieboom (levelLoaded).
function removeSourceAt(idx) {
  const removed = (state.sources || [])[idx];
  const remaining = (state.sources || []).filter((s, i) => i !== idx);
  if (removed && removed.fromSparql) {
    const naam = String(removed.name || '');
    state.detailLoaded.delete(naam.replace(/ \(SPARQL-detail\)$/, ''));
    levelLoaded.delete(naam.replace(/ \(SPARQL-collectieniveau\)$/, ''));
  }
  syncAfterChange(remaining);
}

// Het SPARQL-endpoint zelf als bron verwijderen: terug naar puur-bestanden-
// weergave; alle van het endpoint afkomstige pseudo-bronnen (policylijst-
// skelet, detail-CONSTRUCTs) gaan mee.
function removeEndpoint() {
  state.sparqlEndpoint = null;
  state.excludeGraphs = [];
  state.detailLoaded = new Set();
  state.detailPending = new Map();
  levelLoaded.clear();
  extraNote = '';
  syncAfterChange((state.sources || []).filter((s) => !s.fromSparql));
}

function syncAfterChange(sources) {
  state.sources = sources;
  syncSrcParams();
  if (!sources.length && state.sparqlEndpoint) loadFromSparql();
  else ingest(sources, '');
}

function renderSources(sources, errors) {
  const list = el('sources-list');
  if (!list) return;
  list.innerHTML = '';
  const errByName = new Map((errors || []).map((e) => [e.name, e.message]));
  // (doc.js' h() kent geen on*-attributen: listeners expliciet aanhaken.)
  const removeBtn = (title, onclick) => {
    const b = h('button', { type: 'button', class: 'src-remove', title, 'aria-label': title, text: '✕' });
    b.addEventListener('click', onclick);
    return b;
  };
  // Doorklikbaar naar het ruwe bronbestand (nieuw tabblad); bronnen die niet
  // gelezen konden worden krijgen hun foutmelding erachter; elke bron is
  // verwijderbaar (×) — de store wordt dan herbouwd uit de rest.
  sources.forEach((s, i) => {
    // Pseudo-bronnen van het endpoint (policylijst/eerste beeld/detail-
    // CONSTRUCTs) niet als losse regels tonen: het endpoint staat al als
    // eigen regel onderaan — anders lijkt dezelfde bron dubbel te staan.
    if (s.fromSparql) return;
    const err = errByName.get(s.name);
    list.appendChild(h('li', { class: err ? 'src-error-li' : null }, [
      removeBtn(t('src.remove'), () => removeSourceAt(i)),
      ' ',
      s.url
        ? h('a', { href: s.url, target: '_blank', rel: 'noopener', text: s.name })
        : h('span', { text: s.name }),
      err ? h('span', { class: 'src-err muted', text: ' — ' + err }) : null,
    ]));
  });
  if (state.sparqlEndpoint) {
    list.appendChild(h('li', { class: 'muted src-endpoint-li' }, [
      removeBtn(t('src.removeEndpoint'), () => removeEndpoint()),
      ' ' + state.sparqlEndpoint + t('src.endpointNote'),
    ]));
  }
}

// Eén "Bron toevoegen"-veld met autodetectie (bestand of endpoint) — zie
// assets/source-detect.js voor de detectielagen en de CORS-foutafhandeling.
async function addDetectedSource(url) {
  const msg = el('src-detect-msg');
  // busy=true: dezelfde spinner als elders, hier naast de detectiemelding.
  const note = (txt, busy) => {
    if (!msg) return;
    msg.hidden = !txt;
    msg.textContent = '';
    if (txt && busy) msg.appendChild(loadStatus(txt));
    else if (txt) msg.textContent = txt;
  };
  note(t('src.detecting', { url }), true);
  const r = await detectSource(url);
  if (r.kind === 'error') {
    note(r.code === 'unreachable'
      ? t('src.unreachable', { url })
      : t('src.unusable', { url }));
    return false;
  }
  note('');
  if (r.kind === 'sparql') {
    state.sparqlEndpoint = r.url;
    state.excludeGraphs = excludeGraphsFor(r.url, params.getAll('exclude-graph'));
    extraNote = t('status.sparqlNote', { ep: r.url });
    const data = (state.sources || []).filter((s) => !s.fromSparql);
    state.sources = data;
    syncSrcParams();
    // Zonder bestanden is het endpoint dé bron (lijst + details); mét
    // bestanden is het de bijlaadbron voor ontbrekende details.
    if (data.length) ingest(data, ''); else loadFromSparql();
    return true;
  }
  const next = [...(state.sources || []), { name: r.url, url: r.url, content: r.content, format: r.format }];
  state.sources = next;
  syncSrcParams();
  ingest(next, '');
  return true;
}

function wireSourcesPanel() {
  const btn = el('btn-sources');
  const panel = el('sources-panel');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const open = panel.hidden;
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  });
  const addForm = el('form-add-src');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = el('input-src');
      const v = input.value.trim();
      if (!v) return;
      addDetectedSource(v).then((ok) => { if (ok) input.value = ''; });
    });
  }
}
wireSourcesPanel();

// --- ?sparql=-modus ----------------------------------------------------------
// Zonder ?ttl-bronnen is het endpoint dé bron: de policylijst komt uit een
// SELECT (als skelet-graaf door de bestaande modelcode), details per kaart
// uit een CONSTRUCT. Met ?policy= wordt alléén dat detail geladen (de schone
// detailroute). Aanbod/overeenkomsten zijn er doorgaans weinig — hun details
// worden na de lijst meteen bijgeladen zodat de drietraps-secties leesbaar
// blijven (begrensd tot 20 om een pathologisch endpoint niet plat te fetchen).
const EAGER_DETAIL_MAX = 20;

async function eagerOfferAgreementDetails() {
  // Offers altijd bijladen (begrensd): hun sectie staat open en zou anders
  // alleen het skelet (titel + uid) tonen — zoals bij /brp-ap, waar de 1.392
  // agreements het gecombineerde plafond overschreden en er daardoor óók
  // geen enkel offer-detail geladen werd. Agreements alleen eager als het
  // er weinig zijn; op schaal laadt hun kaart-uitklap het detail lazy.
  const offers = state.model.offers
    .filter((p) => needsSparqlDetail(p))
    .slice(0, EAGER_DETAIL_MAX);
  const agrs = state.model.agreements.filter((p) => needsSparqlDetail(p));
  const pols = offers.length + agrs.length <= EAGER_DETAIL_MAX
    ? [...offers, ...agrs] : offers;
  if (!pols.length) return;
  // Parallel ophalen, één model-rebuild en herrender na afloop.
  await Promise.all(pols.map((p) => ensureDetail(p.iri, { rebuild: false })
    .catch(() => { /* sectie blijft dan skelet; uitklap meldt de fout */ })));
  if (state.storeReady && !state.storeHydrated) await state.storeReady;
  state.model = buildModel(state.store);
  state.fullNav = state.nav = buildNav(state.model);
  renderPolicySelect();
  renderAll();
}

async function loadFromSparql() {
  const ep = state.sparqlEndpoint;
  setStatus(t('load.queryEndpointAt', { ep }), true);
  renderLoading(t('load.queryEndpoint'));
  try {
    if (state.policyScope) {
      const ttl = await sparqlConstruct(ep,
        policyDetailQuery(state.policyScope, { excludeGraphs: state.excludeGraphs }));
      state.detailLoaded.add(state.policyScope);
      await ingest([{ name: ep + ' (policy-detail)', content: ttl, format: 'ttl', fromSparql: true }], '');
      // Is de gevraagde policy een stub-versie, dan staan zijn regels op de
      // bron in de bron-datalaag: die er meteen bij halen, anders opent de
      // deeplink een kaart zonder inhoud.
      const nm = versionNavModel(state.model, state.policyScope);
      if (nm && nm.shown.stub) {
        const bronnen = (nm.shown.sources || [])
          .filter((iri) => !/publicaties\.rvig\.nl|\.pdf$/i.test(iri));
        let bij = false;
        for (const iri of bronnen) bij = (await ensureDetail(iri, { rebuild: false })) || bij;
        if (bij) {
          state.model = buildModel(state.store);
          state.fullNav = state.nav = buildNav(state.model);
          applyScopeAndRender(undefined);
        }
      }
    } else {
      await loadPolicyList(ep);
    }
  } catch (e) {
    // Generieke melding (C6): omgevingsspecifieke aanwijzingen (zoals het
    // starten van een lokale Fuseki) staan in de README, niet in de UI.
    renderEmpty(t('err.endpoint', { ep, msg: e.message }));
    setStatus(t('err.sparql', { msg: e.message }));
  }
}

// --- Tweefasige lijstlading --------------------------------------------------
// De volledige index (policyListQuery + containers + herkomst) kost op /brp
// 4–5,5 s; al die tijd stond de pagina op skeletons. Daarom in twee slagen:
//
//   Fase 1 (~0,1 s): policyListFirstQuery — per soort de eerste 60 titels met
//     afnemer, zonder aggregaties. Daarmee renderen meteen ECHTE kaarten. Wat
//     nog onbekend is, wordt ook als onbekend getoond: tellers "…", filters
//     gedempt, geen versiechips (het skelet draagt geen datering, dus de
//     bestaande chip-verbergregel doet dat vanzelf) en een skeleton-staart
//     onder de kaarten als signaal "er komt meer".
//   Fase 2 (achtergrond): de drie volledige queries PARALLEL (ze zijn
//     onafhankelijk; sequentieel kostte dat de som van de drie), daarna
//     dezelfde skelet-ingest als voorheen. De gebruikersstaat gaat mee over de
//     wissel: opengeklapte kaarten (op data-iri), scrollpositie en een al
//     ingetikt tekstfilter.
//
// Foutpad: faalt fase 1, dan gaat fase 2 gewoon door (dan is er simpelweg geen
// eerste beeld); faalt fase 2 terwijl fase 1 stond, dan blijven die kaarten
// staan en komt de foutmelding erbij — beter iets dan niets.
// De volledige index, met automatische terugval. Eerst het SNELLE pad
// (policyListQuery): één query, getuned voor ARQ, en op Fuseki verreweg het
// zuinigst in rondjes en bandbreedte. Loopt die in een servertimeout of 5xx —
// wat op een streaming-evaluator structureel gebeurt, óók op een kleine
// dataset, omdat die geneste aggregaties niet materialiseert — dan de
// COMPATIBILITEITSMODUS: vijf platte queries parallel, client-side gemergd tot
// dezelfde rijen (zie de toelichting boven flatPolicyRowsQuery in sparql.js).
// Andere fouten (4xx, CORS, netwerk) gaan meteen door naar de foutafhandeling:
// die zouden op het platte pad identiek stuklopen.
// Faalt ook het platte pad, dan telt de OORSPRONKELIJKE fout — die beschrijft
// wat er met de bedoelde query misging.
async function indexRows(ep) {
  try {
    return await sparqlSelect(ep, policyListQuery());
  } catch (e) {
    if (!isEndpointTimeout(e)) throw e;
    try {
      const rows = await decomposedIndexRows(ep);
      state.compatIndex = true;
      return rows;
    } catch {
      throw e;
    }
  }
}

async function loadPolicyList(ep) {
  const t0 = performance.now();
  state.compatIndex = false;
  let eersteBeeld = false;
  try {
    // Fase 1 is sinds de ont-policying van het bronregister (aug 2026) ÉÉN
    // query. Er reisden twee platte herkomst-SELECTs mee om te voorkomen dat
    // het eerste beeld bron-Sets toonde die fase 2 daarna wegdedupliceerde
    // (een flits van verdwijnende kaarten); die bron-Sets bestaan niet meer —
    // een besluit heeft nog één beleidsrepresentatie — dus de dedup en haar
    // twee voorlopers zijn met wortel en tak verdwenen.
    const rows = await sparqlSelect(ep, policyListFirstQuery());
    if (rows.length) {
      state.listPhase = 'first';
      await ingest([{
        name: ep + ` (eerste beeld, ${num(rows.length)} rijen)`,
        content: listSkeletonTurtle(rows),
        format: 'ttl', fromSparql: true,
      }], '');
      eersteBeeld = true;
      // Profiel-instrumentatie naast window.__perf (zie
      // notes/performance-profiel.md): tijd tot het eerste beeld resp. tot de
      // volledige index, gerekend vanaf het begin van de lijstlading.
      if (typeof window !== 'undefined') window.__firstPaintMs = performance.now() - t0;
    }
  } catch (e) {
    state.listPhase = null;   // geen eerste beeld; fase 2 doet het werk
  }

  try {
    // Twee onafhankelijke lijsten, parallel:
    //   - de volledige policylijst (titels, afnemers, containerinfo, telling);
    //   - versiecontainers waarvan de identiteit haar policysoort declareert
    //     (dct:type) — beëindigde besluiten zonder getypeerde versie vallen
    //     buiten de eerste SELECT.
    // De tweede mag falen (endpoint zonder die data of te traag): dan blijft
    // de gewone lijst gewoon staan.
    const [rows, cRows] = await Promise.all([
      indexRows(ep),
      sparqlSelect(ep, containerListQuery()).catch(() => []),
    ]);
    const ttl = listSkeletonTurtle(rows) + containerSkeletonTurtle(cRows);
    const ui = captureListUi();
    state.listPhase = null;
    // Details die tijdens de eerste fase al zijn opgehaald (de gebruiker klapte
    // een kaart uit) gaan mee de her-ingest in: state.detailLoaded blijft dan
    // kloppen bij een store die vanaf nul herbouwd wordt.
    // Beide soorten bijlaadbron gaan mee: policy-details én de al opgehaalde
    // niveaus van een collectieboom. Anders zou hun administratie
    // (detailLoaded/levelLoaded) na de her-ingest naar triples wijzen die er
    // niet meer zijn.
    const details = (state.sources || []).filter((s) => s.fromSparql
      && / \(SPARQL-(detail|collectieniveau)\)$/.test(String(s.name || '')));
    await ingest([{
      name: ep + ` (policylijst, ${num(rows.length)} rijen`
        + (cRows.length ? ` + ${num(cRows.length)} versierijen` : '') + ')',
      content: ttl, format: 'ttl', fromSparql: true,
    }, ...details], '');
    if (typeof window !== 'undefined') window.__fullIndexMs = performance.now() - t0;
    // Eerst de eager offer-/agreement-details (die herrenderen nog een keer),
    // dán de gebruikersstaat terugzetten — anders veegt die laatste herrender
    // de zojuist herstelde open kaarten en het filter weer weg.
    await eagerOfferAgreementDetails();
    await restoreListUi(ui);
  } catch (e) {
    state.listPhase = null;
    if (!eersteBeeld) throw e;   // niets in beeld: de gewone foutmelding
    // Wél een eerste beeld: dat blijft staan, met de fout eronder.
    const main = el('doc-main');
    if (main) {
      main.appendChild(h('p', {
        class: 'src-err', text: t('err.fullIndex', { ep, msg: e.message }),
      }));
    }
    setStatus(t('err.sparqlFullIndex', { msg: e.message }));
  }
}

// Het bovenste ZICHTBARE element met een eigen sleutel, plus hoe ver het onder
// de bovenrand van het venster staat. Dat is een robuuster ankerpunt voor de
// scrollpositie dan een pixelgetal: bij een taalwissel verandert de tekst van
// lengte (en dus de regelval en de hoogte van alles erboven), waardoor
// dezelfde window.scrollY een heel ander stuk pagina toont. Het anker vraagt
// niet "hoe ver was ik", maar "wat stond er bovenin" — en dat is precies wat
// de lezer terug wil zien.
function captureScrollAnchor(main) {
  if (typeof window === 'undefined' || !main || !main.querySelectorAll) return null;
  const hoog = window.innerHeight || 0;
  let best = null;
  // Niet het eerste zichtbare element, maar het element waarvan de bovenrand
  // het DICHTST bij de bovenrand van het venster ligt. Het eerste zichtbare is
  // altijd de buitenste kaart — die begint honderden pixels hoger dan wat de
  // lezer werkelijk voor zich heeft, en dan verschuift het beeld alsnog zodra
  // de inhoud daarbóven van lengte verandert. Een regel-rij vlak onder de
  // bovenrand is een veel scherper anker.
  for (const n of main.querySelectorAll('[data-iri], [data-open-key]')) {
    if (!n.getBoundingClientRect) return null;
    const r = n.getBoundingClientRect();
    if (r.bottom <= 0 || r.top > hoog) continue;
    if (!best || Math.abs(r.top) < Math.abs(best.top)) {
      best = { key: n.getAttribute('data-iri') || n.getAttribute('data-open-key'), top: r.top };
    }
  }
  return best;
}

// Zet het anker terug op zijn plek. HERHAALD, want de weergave vult zich nog:
// lazy kaart-body's en bijgeladen details laten de pagina ná de herrender nog
// groeien, en elke groei bóven het anker duwt het weer weg. Elke ronde
// corrigeert het verschil; zodra er niets meer beweegt is het klaar. Zonder
// die herhaling sprong de pagina bij een taalwissel alsnog naar een ander stuk.
const SCROLL_SETTLE_ROUNDS = 6;

async function settleScrollAnchor(main, anchor) {
  if (!anchor || typeof window === 'undefined' || !window.scrollBy) return false;
  let raakt = false;
  for (let i = 0; i < SCROLL_SETTLE_ROUNDS; i += 1) {
    const path = findPathByOpenKey(main, anchor.key);
    const node = path && path[path.length - 1];
    if (!node || !node.getBoundingClientRect) return raakt;
    const delta = node.getBoundingClientRect().top - anchor.top;
    raakt = true;
    if (Math.abs(delta) < 1) return true;
    window.scrollBy(0, delta);
    await new Promise((r) => setTimeout(r, 40));
  }
  return raakt;
}

// Gebruikersstaat die de fasewissel — en de taalwissel — moet overleven: welke
// kaarten open staan (op data-iri — de kaarten zelf worden opnieuw gebouwd),
// waar de pagina staat en wat er in de tekstfilters getypt is.
function captureListUi() {
  const open = new Set();
  const walk = (n) => {
    if (n && n.getAttribute && n.open) {
      // Twee soorten sleutel, in documentvolgorde verzameld zodat een ouder
      // altijd vóór zijn kind in de Set staat: de IRI van een kaart of
      // regel-rij, en de data-open-key van een fold-out die geen eigen
      // identiteit heeft (ledenlijst, tak in de partOf-boom).
      const iri = n.getAttribute('data-iri');
      if (iri) open.add(iri);
      const key = n.getAttribute('data-open-key');
      if (key) open.add(key);
    }
    for (const c of (n && n.children) || []) walk(c);
  };
  walk(el('doc-main'));
  const filters = {};
  // Welke filterPANELEN openstonden. Een herrender bouwt ze dicht op, en dat
  // is precies verkeerd voor wat er ín zo'n paneel gebeurt: wie een
  // groepeer-chip aanzet, zet er meestal nog een aan of uit. Hetzelfde geldt
  // voor de taalwissel — de lezer stond met het paneel open te werken.
  const openFilters = [];
  for (const [id, f] of state.sectionFilters || []) {
    const txt = f.text();
    if (txt) filters[id] = txt;
    if (f.isOpen && f.isOpen()) openFilters.push(id);
  }
  const scrollY = (typeof window !== 'undefined' && typeof window.scrollY === 'number')
    ? window.scrollY : 0;
  state.carryFilterText = Object.keys(filters).length ? filters : null;
  // Het rechterpaneel hoort een herrender (fasewissel, taalwissel, rescope) te
  // overleven: het staat naast het document, niet erin. De verwijzing is een
  // REF plus scope — na de herrender wijst dezelfde ref het (nieuw gebouwde)
  // element weer aan.
  return {
    open, openFilters, scrollY, anchor: captureScrollAnchor(el('doc-main')),
    panel: state.panel ? { ...state.panel } : null,
  };
}

// Meer dan één RONDE, want de weergave is lui: een tak van de partOf-boom
// bestaat pas in de DOM nadat zijn ouder is opengeklapt én zijn niveau gebouwd
// is (dat gebeurt op het toggle-event, dat in de browser ná deze tick vuurt).
// Elke ronde opent wat er nú te vinden is en laat de rest liggen; zolang een
// ronde nog iets opent, is er een volgende. Zonder deze herhaling herstelde
// alleen de bovenste laag en klapte de rest alsnog dicht.
const RESTORE_MAX_ROUNDS = MEMBER_TREE_MAX_DEPTH + 2;

async function restoreListUi(ui) {
  state.carryFilterText = null;   // gold alleen voor de zojuist gebouwde render
  if (!ui) return;
  // Stond het invulling-paneel open, zet het dan terug op hetzelfde element —
  // met de nieuwe index en, na een taalwissel, in de nieuwe taal.
  if (ui.panel && ui.panel.mode === 'fill' && ui.panel.ref) {
    openFill(ui.panel.ref, ui.panel.scope);
  }
  const main = el('doc-main');
  // De filterpanelen die openstonden weer open (zie captureListUi).
  for (const id of ui.openFilters || []) {
    const f = (state.sectionFilters || new Map()).get(id);
    if (f && f.open) f.open();
  }
  let todo = [...ui.open];
  for (let ronde = 0; ronde < RESTORE_MAX_ROUNDS && todo.length; ronde += 1) {
    const rest = [];
    for (const key of todo) {
      const path = findPathByOpenKey(main, key);
      if (!path) { rest.push(key); continue; }   // (nog) niet in de DOM
      for (const n of path) openDetails(n);
      const card = path[path.length - 1];
      // Kaart-body's zijn lazy: direct bouwen (het toggle-event vuurt in de
      // browser pas async) — dat haalt zo nodig ook het detail-CONSTRUCT op.
      if (card.odrlOpenBody) {
        try { await card.odrlOpenBody(); } catch { /* de kaart meldt het zelf */ }
      }
    }
    if (rest.length === todo.length) break;      // geen voortgang meer
    todo = rest;
    // Even de beurt teruggeven, zodat de zojuist geopende fold-outs hun
    // toggle-handler draaien en hun niveau bouwen.
    await new Promise((r) => setTimeout(r, 0));
  }
  // Eerst het anker (het bovenste element dat in beeld stond), met de
  // pixelpositie als terugval voor het geval dat element weggefilterd of nog
  // niet gebouwd is.
  if (await settleScrollAnchor(main, ui.anchor)) return;
  if (ui.scrollY && typeof window !== 'undefined' && window.scrollTo) {
    window.scrollTo(0, ui.scrollY);
  }
}

// --- Boot: URL-parameters identiek aan de viewer -----------------------------
//   ?src=<url>     GENERIEKE bron (herhaalbaar, volgorde behouden): een
//                  RDF-bestand (Turtle/JSON-LD) óf een SPARQL-endpoint — het
//                  type wordt per bron gedetecteerd (assets/source-detect.js;
//                  endpoint alleen op expliciete signalen: /sparql-pad of
//                  geslaagde ASK-probe)
//   ?ttl=<url>     legacy-alias van ?src, telt altijd als bestand
//   ?sparql=<url>  legacy-alias van ?src voor een endpoint
//   ?policy=<IRI>  beperk de weergave tot deze policy; zonder bronnen wordt
//                  de IRI opgehaald: via het endpoint (CONSTRUCT) of als bron
//   ?set=<IRI>     de leden van één beleidspublicatie
//   ?groupby=<curie>,<curie>
//                  de ACTIEVE groeperingsdimensies in nestvolgorde (buitenste
//                  eerst); zonder deze parameter geldt de bronvolgorde
//                  (sh:order), leeg (?groupby=) is een platte lijst
//   ?exclude-graph=<IRI>  (herhaalbaar) named graphs die detail-CONSTRUCTs
//                  uitsluiten; zonder deze parameter geldt de
//                  per-endpoint-config (assets/endpoint-config.js)
const params = new URLSearchParams(location.search);
const srcParams = params.getAll('src');
const legacyTtl = params.getAll('ttl');
const legacySparql = params.get('sparql');
state.policyScope = params.get('policy') || null;
state.setScope = params.get('set') || null;
state.groupBy = groupByFromUrl();
// ?verken=<IRI>: de pagina start in de VERKENNER-STAND. De bronnen worden
// gewoon geladen (het document staat er dus, verborgen), zodat "Toon in
// document" meteen werkt en een gedeelde verkenner-link geen tweede lading
// nodig heeft. renderAll() zet de stand aan zodra het model er is.
state.verkenIri = params.get('verken') || null;

async function bootFromParams() {
  const tFetch0 = performance.now();
  // Meteen de skeletonweergave neerzetten: het brondetectie-/fetchdeel
  // hieronder kan al seconden duren en liet de pagina vroeger leeg.
  setStatus(t('load.sources'), true);
  renderLoading(t('load.sources'));
  // Eén detectieroute voor alle ?src=-waarden; legacy-aliassen worden zonder
  // detectie op hun oude betekenis gemapt (bestaande links blijven werken).
  const { data, endpoints, errors } = await partitionSources(srcParams);
  const dataSources = [...data];
  for (const u of legacyTtl) {
    try {
      const r = await fetch(u);
      if (!r.ok) throw new Error(t('err.httpAt', { status: r.status, url: u }));
      const content = await r.text();
      dataSources.push({ name: u, url: u, content, format: detectFormat(u, content) });
    } catch (e) { errors.push({ url: u, message: e.message }); }
  }
  if (legacySparql) endpoints.push(legacySparql);
  state.sparqlEndpoint = endpoints[0] || null;
  state.excludeGraphs = excludeGraphsFor(state.sparqlEndpoint, params.getAll('exclude-graph'));
  if (state.sparqlEndpoint) extraNote = t('status.sparqlNote', { ep: state.sparqlEndpoint });
  if (errors.length && !dataSources.length && !state.sparqlEndpoint) {
    renderEmpty(t('err.srcLoad', { msg: errors.map((e) => e.message).join('; ') }));
    return;
  }
  if (dataSources.length) {
    const fetchMs = performance.now() - tFetch0;
    await ingest(dataSources, errors.length ? t('err.sourcesPartial', { n: errors.length }) : '');
    if (typeof window !== 'undefined' && window.__perf) window.__perf.fetchMs = fetchMs;
  } else {
    await loadFromSparql();
  }
}

if (srcParams.length || legacyTtl.length || legacySparql) {
  bootFromParams().catch((e) => renderEmpty(t('err.srcLoad', { msg: e.message })));
} else if (state.policyScope || state.setScope) {
  const scopeIri = state.policyScope || state.setScope;
  setStatus(t('load.source'), true);
  renderLoading(t('load.source'));
  fetch(scopeIri)
    .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
    .then((content) => ingest([{
      name: scopeIri, url: scopeIri, content,
      format: detectFormat(scopeIri, content),
    }], ''))
    .catch((e) => renderEmpty(t('err.scopeFetch', { iri: scopeIri, msg: e.message })));
} else {
  loadFromExamples();
}
