// ODRL-AP-NL viewer — UI-laag van de EDITOR (index.html): navigatie links,
// documentweergave rechts. Rendert op basis van het weergavemodel uit
// parse.js; bewerken-modus muteert de graaf via edit.js.
// Alle graaf-/modellogica zit in parse.js en edit.js (DOM-vrij).
//
// Het derde paneel (de Turtle-/JSON-LD-bronweergave) is in aug 2026 vervallen:
// machineleesbare weergaven horen niet meer naast de mensleesbare te staan.
// Wat ervoor in de plaats komt: het ⌕ opent de knoop in een generieke
// RDF-verkenner (ander tabblad), en de export-knoppen in de topbalk
// downloaden de volledige graaf als Turtle of JSON-LD.
import {
  loadSources, addSource, curie, detectFormat,
  PREFIXES, buildModel, buildNav, scopeNavToPolicy,
  policyAssignee, filterNav, countNavRows, compactDate, dayDate,
  cardChunk, refListCollapsed, filterRefItems, groupCollectionMembers, memberSummary,
  registerPrefixes, registerLabelKeys, statusWord, versionNavModel, versionNavDate,
  groupRules, PROFILE_PATTERNS,
} from './parse.js';
// GEEN MACHINELEESBARE WEERGAVE MEER IN DE EDITOR (aug 2026, besluit
// eigenaar). Het Turtle-/JSON-LD-bronpaneel naast het document is vervallen;
// de editor is navigatie + documentweergave. Wie de ruwe triples wil zien,
// klikt het ⌕ — een link naar een generieke RDF-verkenner (Comunica) in een
// ander tabblad; wie ze wil meenemen, gebruikt de export-knoppen in de
// topbalk (download). Zie assets/verken.js.
import { verkenHref, verkenLink } from './verken.js';
import {
  sparqlSelect, sparqlConstruct, policyListQuery, policyDetailQuery,
  listSkeletonTurtle,
} from './sparql.js';
// Deze viewer is NL-only (vaste Nederlandse chrome); alleen de gedeelde
// collectie-zinnen komen uit de stringtabel, zodat ze exact gelijk luiden aan
// die in de documentweergave.
import { t } from './i18n.js';
import * as edit from './edit.js';
// Configuratie (data, geen kern-code): default-democorpus, per-endpoint
// graph-uitsluitingen en het default-registerfragment met prefixafkortingen.
import { DEFAULT_EXAMPLES, EXAMPLES_BASE, COMUNICA_BASE } from './default-corpus.js';
import { excludeGraphsFor } from './endpoint-config.js';
import { DEFAULT_REGISTER_PREFIXES } from './register-prefixes.js';
import { DEFAULT_PROPERTY_LABEL_KEYS } from './register-labels.js';
import { partitionSources } from './source-detect.js';

const ODRL = PREFIXES.odrl;
const DCT = PREFIXES.dct;
const RDFS = PREFIXES.rdfs;
const XSD = PREFIXES.xsd;

// Registerprefixen als data (C2): nodig voor curie() in bronloze
// ?src=<endpoint>-modus; bron-@prefix-declaraties zijn identiek en winnen
// niet (eerste registratie wint).
registerPrefixes(DEFAULT_REGISTER_PREFIXES);
// Default-labels als data: NL-labels voor externe vocabulairetermen (dct:,
// skos:) die niet in de geladen bronnen zelf gelabeld worden — zie
// assets/register-labels.js. Bron-rdfs:label/skos:prefLabel/dct:title wint
// altijd (labelFor in parse.js raadpleegt de graaf eerst).
registerLabelKeys(DEFAULT_PROPERTY_LABEL_KEYS);

const el = (id) => document.getElementById(id);
const state = {
  store: null, model: null, nav: null, selected: null,
  // De geladen bronnen van de laatste ingest (naam, URL, formaat) — alleen
  // nodig om de ⌕-link zijn datasources te geven.
  sources: [],
  editMode: false, dirty: false, opts: null,
  // Deep link (?policy=<IRI>): beperk de navigatie tot die ene policy.
  policyScope: null,
  // Zoekveld boven de navigatieboom (schaal: 1.392 identieke BRP-regels).
  navQuery: '',
  // SPARQL-endpoint (?src=<endpoint> of legacy ?sparql=): lijst-/detailbron;
  // details worden bij selectie bijgeladen.
  sparqlEndpoint: null,
  // Graph-uitsluitingen voor detail-CONSTRUCTs: ?exclude-graph=-params of de
  // per-endpoint-config (assets/endpoint-config.js) — zie audit-punt C3.
  excludeGraphs: [],
  detailLoaded: new Set(),
};
// Vaste status-toevoeging vanuit URL-parameters (bijv. ?sparql=...).
let extraNote = '';

// --- Kleine DOM-helper ------------------------------------------------------
function h(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (v != null) node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

// Hang een kind op als het er is. Nodig sinds verkenBtn() null kan geven (een
// blanke knoop heeft geen adres voor de RDF-verkenner).
function appendIf(parent, node) { if (node) parent.appendChild(node); return parent; }

function setStatus(msg) { el('status').textContent = msg; }

// Lange literals (bv. een volledige licentietekst als cc:legalcode) niet
// integraal uitschrijven: kap in de WEERGAVE af met een "toon meer"-uitklap.
// Het model blijft volledig.
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
    text: `toon meer (${s.length.toLocaleString('nl-NL')} tekens)`,
  });
  btn.addEventListener('click', () => {
    open = !open;
    body.textContent = open ? s : short;
    btn.textContent = open ? 'toon minder' : `toon meer (${s.length.toLocaleString('nl-NL')} tekens)`;
  });
  wrap.appendChild(body);
  wrap.appendChild(document.createTextNode(' '));
  wrap.appendChild(btn);
  return wrap;
}

// --- Laden ------------------------------------------------------------------
async function loadFromExamples() {
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
    renderEmpty(
      'Kon de voorbeelden niet laden via fetch. Dit gebeurt meestal wanneer de ' +
      'pagina via file:// is geopend. Start een lokale webserver in de map ' +
      'odrl-ap-nl/ (bijv. `python3 -m http.server`) en open ' +
      'http://localhost:8000/viewer/ , of gebruik "Bestand openen".');
    setStatus('voorbeelden niet geladen (file://?)');
    return;
  }
  ingest(sources, failed.length ? `(${failed.length} niet geladen)` : '');
}

async function loadFromUrl(url) {
  try {
    const res = await fetch(url);
    const content = await res.text();
    ingest([{ name: url, url, content, format: detectFormat(url, content) }], '');
  } catch (e) {
    renderEmpty('Kon ?src niet laden: ' + e.message);
  }
}

function loadFromFiles(fileList) {
  const files = [...fileList];
  Promise.all(files.map((f) => f.text().then((content) => ({
    name: f.name, content, format: detectFormat(f.name, content),
  })))).then((sources) => ingest(sources, ''));
}

// Pas de ?policy=-scope toe op state.nav; retourneert de focus-node of null.
function applyPolicyScope() {
  if (!state.policyScope) return null;
  const scoped = scopeNavToPolicy(state.nav, state.policyScope);
  if (!scoped) return null;
  state.nav = scoped.nav;
  return scoped.node;
}

function ingest(sources, note) {
  const result = loadSources(sources);
  // De bronnenlijst wordt bewaard voor de ⌕-link: die geeft de verkenner
  // precies de bronnen mee die deze pagina zelf geladen heeft (zie
  // verkenSources in assets/verken.js). Lokaal geopende bestanden hebben geen
  // URL en kunnen dus niet mee — het ⌕ levert dan een voorgevulde query zonder
  // datasources.
  state.sources = sources;
  state.store = result.store;
  state.model = result.model;
  state.nav = result.nav;
  state.opts = edit.termOptions(result.store);
  setDirty(false);
  renderDatalist();
  const focus = applyPolicyScope();
  const scopeNote = (state.policyScope && !focus)
    ? ' — ?policy niet gevonden in de geladen bronnen' : '';
  const c = result.model.counts;
  const errNote = result.errors.length ? ` — ${result.errors.length} fout(en)` : '';
  const vcNote = c.versionContainers ? `${c.versionContainers} versiecontainer(s), ` : '';
  setStatus(`${sources.length} bron(nen), ${result.quadCount} triples · ` +
    `${c.offers} aanbod, ${c.agreements} overeenkomst(en), ${c.sets} beleidsset(ten), ${vcNote}${c.artifacts + c.bundles} artefact(en) ${note}${extraNote}${scopeNote}${errNote}`);
  renderNav();
  // Selecteer de deep-link-policy of de eerste zinvolle node (een offer op
  // topniveau zelf; van een groep het eerste kind).
  const first = state.nav[0];
  if (focus) selectNav(focus);
  else if (first) selectNav(first.kind === 'group' && first.children && first.children.length ? first.children[0] : first);
  else {
    // Lege staat: benoem bron-fouten expliciet (o.a. "formaat niet
    // ondersteund (RDF/XML)") in plaats van stilte.
    let msg = 'Geen ODRL-policies gevonden in de opgegeven bronnen.';
    if (result.errors.length) {
      msg += ' Bron(nen) met problemen: '
        + result.errors.map((e) => `${e.name} — ${e.message}`).join('; ') + '.';
    }
    renderEmpty(msg);
  }
}

// --- Wijzigingsbeheer -------------------------------------------------------
function setDirty(v) {
  state.dirty = v;
  const ind = el('dirty-indicator');
  if (!ind) return;
  ind.textContent = state.store ? (v ? '● gewijzigd' : 'ongewijzigd') : '';
  ind.classList.toggle('changed', !!v);
}

// Herbouw model + nav uit de (gemuteerde) store en herstel de selectie.
function rebuild(keepId) {
  state.model = buildModel(state.store);
  state.nav = buildNav(state.model);
  applyPolicyScope();
  state.opts = edit.termOptions(state.store);
  renderDatalist();
  renderNav();
  setDirty(true);
  const c = state.model.counts;
  setStatus(`${state.store.size} triples · ${c.offers} aanbod, ` +
    `${c.agreements} overeenkomst(en), ${c.artifacts + c.bundles} artefact(en) — bewerkt`);
  const node = keepId ? findNav(state.nav, keepId) : null;
  if (node) selectNav(node);
  else if (state.nav.length) {
    const first = state.nav[0];
    selectNav(first.kind === 'group' && first.children && first.children.length ? first.children[0] : first);
  } else {
    renderEmpty('Lege graaf. Gebruik "Nieuw beleid" om te starten.');
  }
}

function findNav(nodes, id) {
  for (const n of nodes || []) {
    if (n.id === id) return n;
    const c = findNav(n.children, id);
    if (c) return c;
  }
  return null;
}

// Vul de gedeelde datalist met alle gelabelde termen (vrij IRI-veld-suggesties).
function renderDatalist() {
  const dl = el('dl-labeled');
  if (!dl || !state.opts) return;
  dl.innerHTML = '';
  for (const o of state.opts.labeled) {
    dl.appendChild(h('option', { value: o.curie, label: o.label }));
  }
}

// --- Navigatie --------------------------------------------------------------
// Boven deze drempel starten groepen ingeklapt: bij duizenden rijen (BRP-
// schaal) is een opengeklapte boom onbruikbaar én onnodig zwaar.
const NAV_COLLAPSE_THRESHOLD = 200;

function renderNav() {
  const tree = el('nav-tree');
  tree.innerHTML = '';
  const total = countNavRows(state.nav);
  const filtered = filterNav(state.nav, state.navQuery);
  // Tijdens het filteren juist openklappen: de treffers moeten zichtbaar zijn.
  const collapsed = !String(state.navQuery || '').trim()
    && total > NAV_COLLAPSE_THRESHOLD;
  for (const node of filtered) tree.appendChild(navNode(node, 0, collapsed));
  const count = el('nav-count');
  if (count) {
    count.textContent = String(state.navQuery || '').trim()
      ? `${countNavRows(filtered).toLocaleString('nl-NL')} van ${total.toLocaleString('nl-NL')}`
      : '';
  }
}

function navNode(node, depth, collapsed = false) {
  const hasChildren = node.children && node.children.length;
  const wrap = h('div', { class: `nav-node depth-${depth}` });
  const row = h('div', {
    class: 'nav-row', 'data-id': node.id, role: 'button', tabindex: '0',
    onclick: (e) => { e.stopPropagation(); selectNav(node); },
    onkeydown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectNav(node); } },
  });
  const childBox = hasChildren
    ? h('div', { class: 'nav-children' + (collapsed ? ' collapsed' : '') }) : null;
  const toggle = h('span', {
    class: 'nav-toggle', text: hasChildren ? (collapsed ? '▸' : '▾') : '',
    onclick: (e) => {
      if (!hasChildren) return;
      e.stopPropagation();
      childBox.classList.toggle('collapsed');
      toggle.textContent = childBox.classList.contains('collapsed') ? '▸' : '▾';
    },
  });
  row.appendChild(toggle);
  row.appendChild(h('span', { class: 'nav-label', title: node.label, text: node.label }));
  if (node.badge) row.appendChild(h('span', { class: `badge ${node.kind}`, text: node.badge }));
  wrap.appendChild(row);
  if (hasChildren) {
    for (const c of node.children) childBox.appendChild(navNode(c, depth + 1, collapsed));
    wrap.appendChild(childBox);
  }
  return wrap;
}

// Zoekveld boven de boom: client-side, case-insensitief substring op het
// label (filterNav in parse.js is puur en node-getest).
function wireNavFilter() {
  const input = el('nav-filter');
  if (!input) return;
  input.addEventListener('input', () => {
    state.navQuery = input.value;
    if (state.nav) renderNav();
  });
}
wireNavFilter();

function selectNav(node) {
  // ?sparql=-modus: een policy uit de skelet-lijst zonder regels in de store
  // krijgt eerst zijn detail (CONSTRUCT) voordat hij gerenderd wordt.
  if (state.sparqlEndpoint && node
    && (node.kind === 'set' || node.kind === 'offer' || node.kind === 'agreement')
    && !state.detailLoaded.has(node.id)) {
    const pol = byIri([].concat(state.model.sets, state.model.offers, state.model.agreements), node.id);
    if (pol && !pol.anon
      && !((pol.permissions && pol.permissions.length)
        || (pol.prohibitions && pol.prohibitions.length)
        || (pol.obligations && pol.obligations.length))) {
      loadDetailAndSelect(node);
      return;
    }
  }
  state.selected = node;
  document.querySelectorAll('.nav-row').forEach((r) => {
    r.classList.toggle('selected', r.getAttribute('data-id') === node.id
      && (node.kind !== 'permission'));
  });
  renderDoc(node);
}

// Detail van één policy bijladen van het SPARQL-endpoint en dan selecteren.
// Bewust géén setDirty: bijladen is geen bewerking.
async function loadDetailAndSelect(node) {
  state.selected = node;
  document.querySelectorAll('.nav-row').forEach((r) => {
    r.classList.toggle('selected', r.getAttribute('data-id') === node.id
      && (node.kind !== 'permission'));
  });
  const doc = el('doc-content');
  doc.innerHTML = '';
  doc.appendChild(h('div', { class: 'empty', text: 'Details laden van het SPARQL-endpoint…' }));
  try {
    const ttl = await sparqlConstruct(state.sparqlEndpoint,
      policyDetailQuery(node.id, { excludeGraphs: state.excludeGraphs }));
    addSource(state.store, ttl, 'ttl');
    state.detailLoaded.add(node.id);
    state.model = buildModel(state.store);
    state.nav = buildNav(state.model);
    applyPolicyScope();
    state.opts = edit.termOptions(state.store);
    renderNav();
    selectNav(findNav(state.nav, node.id) || node);
  } catch (e) {
    doc.innerHTML = '';
    doc.appendChild(h('div', {
      class: 'empty',
      text: 'Kon het detail niet laden van het SPARQL-endpoint: ' + e.message,
    }));
  }
}

// --- Documentweergave (rechterhelft) ----------------------------------------
function renderEmpty(msg) {
  el('doc-content').innerHTML = '';
  el('doc-content').appendChild(h('div', { class: 'empty', text: msg }));
}

function byIri(list, iri) { return list.find((x) => x.iri === iri); }

function renderDoc(node) {
  const doc = el('doc-content');
  doc.innerHTML = '';

  if (node.kind === 'dataset') {
    const ds = byIri(state.model.datasets, node.id);
    doc.appendChild(datasetView(ds));
  } else if (node.kind === 'offer') {
    doc.appendChild(offerView(byIri(state.model.offers, node.id)));
  } else if (node.kind === 'agreement') {
    doc.appendChild(agreementView(byIri(state.model.agreements, node.id)));
  } else if (node.kind === 'set') {
    doc.appendChild(setView(byIri(state.model.sets, node.id)));
  } else if (node.kind === 'permission') {
    const agr = byIri(state.model.agreements, node.agreementIri);
    doc.appendChild(permissionFocusView(agr, node.permIndex));
  } else if (node.kind === 'artifact' || node.kind === 'bundle') {
    const art = byIri(state.model.artifacts.concat(state.model.bundles), node.id);
    doc.appendChild(artifactView(art));
  } else if (node.kind === 'group') {
    doc.appendChild(h('div', { class: 'empty', text: 'Kies een item uit deze groep in de navigatie.' }));
  }
}

function heading(title, role, curieStr, policyIri, inspectTarget) {
  const frag = document.createDocumentFragment();
  const titleRow = h('h1', {}, [title]);
  const sc = versionStatusChip(policyIri);
  if (sc) titleRow.appendChild(sc);
  frag.appendChild(titleRow);
  const line = h('div', { class: 'role-line' });
  if (role) line.appendChild(h('span', { class: 'pill', text: role }));
  if (curieStr) line.appendChild(h('span', { class: 'mono muted', text: curieStr }));
  appendIf(line, verkenBtn(inspectTarget));
  // Versienavigator: alleen zichtbaar als deze policy versie is binnen een
  // temporele container (anders null).
  const vnav = versionNav(policyIri);
  if (vnav) line.appendChild(vnav);
  // Standalone-link (Swagger-UI-patroon): dezelfde viewer, beperkt tot deze
  // policy. Behoudt eventuele ?src/?ttl-bronnen uit de huidige URL.
  if (policyIri) {
    const u = new URLSearchParams(location.search);
    u.set('policy', policyIri);
    line.appendChild(h('a', {
      class: 'permalink', href: '?' + u.toString(),
      title: 'Open de viewer met alleen deze policy (deel- of catalogus-link)',
      text: '¶ standalone',
    }));
  }
  frag.appendChild(line);
  return frag;
}

function kv(pairs) {
  const dl = h('dl', { class: 'kv' });
  for (const [k, v] of pairs) {
    if (v == null || v === '') continue;
    dl.appendChild(h('dt', { text: k }));
    const dd = h('dd');
    if (typeof v === 'string') dd.textContent = v;
    else dd.appendChild(v);
    dl.appendChild(dd);
  }
  return dl;
}

function ref(agent) {
  if (!agent) return null;
  const tag = (iri) => h('span', {}, [
    agent.label && agent.label !== agent.curie ? agent.label + ' ' : '',
    h('span', { class: 'mono muted', text: iri ? agent.curie : '' }),
    // Partijen (en andere verwezen nodes) zijn verkenbaar in de RDF-verkenner.
    verkenBtn(iri || agent.term),
  ]);
  // Een odrl:PartyCollection draagt meer dan een naam: zijn leden en/of de
  // voorwaarde waaraan een partij moet voldoen (zie collectionNodes).
  if (!agent.intension && !(agent.members || []).length) return tag(agent.iri);
  return h('span', { class: 'party-coll' }, collectionNodes(agent, tag));
}

function externalLink(url, label) {
  return h('a', { href: url, target: '_blank', rel: 'noopener', text: label || url });
}

function datasetView(ds) {
  const frag = document.createDocumentFragment();
  frag.appendChild(heading(ds.title, 'Dataset', ds.curie, null, ds.iri));
  if (ds.description) frag.appendChild(h('p', {}, [longText(ds.description)]));
  const pairs = [];
  if (ds.distributions.length) {
    const ul = h('ul', { class: 'clean' });
    for (const d of ds.distributions) {
      ul.appendChild(h('li', {}, [
        d.label + ' ', d.accessURL ? externalLink(d.accessURL) : h('span', { class: 'mono muted', text: d.curie }),
      ]));
    }
    pairs.push(['Distributies', ul]);
  }
  frag.appendChild(kv(pairs));
  return frag;
}

// Regels als kaarten. Declareert de bron groeperingsdimensies (`a
// qb:DimensionProperty` op een left operand, zie parse.js/groupRules), dan
// nestelt de weergave mee: een kaart per doel en daarbinnen de varianten met
// hun gegevenssets. Meer dan één dimensie nest in de volgorde die de bron met
// sh:order declareert (groupingDimensions sorteert daar al op). De editor kent
// geen pivot-control — dat is een leesfunctie en die zit in de doc-weergave.
// Zonder declaratie in de bron is dit exact de platte lijst van voorheen —
// groupRules is dan de identiteit.
function permissionsSection(perms, titleForDoel, owner, ownerAssignee) {
  const frag = document.createDocumentFragment();
  const dims = (state.model && state.model.groupingDimensions) || [];
  groupRules(perms, dims).forEach((node, i) => {
    frag.appendChild(permissionNode(node, {
      titleForDoel, owner, ownerAssignee, index: i, shownDims: [],
    }));
  });
  if (!perms.length) frag.appendChild(h('p', { class: 'muted', text: 'Geen permissions.' }));
  return frag;
}

// Eén kaart voor een regel, of een uitklapbare groepskaart voor een niveau.
function permissionNode(node, opts) {
  const { titleForDoel, owner, ownerAssignee, index, shownDims } = opts;
  if (node.kind === 'rule') {
    return permissionCard(node.rule, {
      titleForDoel, owner, ownerAssignee, index, shownDims,
      // Binnen een groep draagt de kaart haar REGELTYPE als badge; het vroegere
      // "Variant" zei niets over wat de kaart is (en echode de kop erboven).
      name: node.label, badge: node.label ? 'Toestemming' : null,
    });
  }
  const deeper = [...shownDims, node.dim.iri];
  // De vroegere samenvouw "één regel onder dit niveau ⇒ de niveaukaart ÍS de
  // regelkaart" is vervallen (besluit eigenaar): een doel met één toestemming
  // krijgt dezelfde groepskaart als een doel met vijf.
  const kind = node.rules[0] && node.rules[0].purpose ? 'doel' : 'toestemming';
  const det = h('details', { class: 'card ' + kind + ' regelgroep', open: '' });
  const n = node.rules.length;
  det.appendChild(h('summary', { class: 'card-title' }, [
    h('span', { class: 'badge ' + kind, text: node.dim.label }),
    document.createTextNode(node.value.label),
    h('span', { class: 'muted', text: ` (${n} ${n === 1 ? 'toestemming' : 'toestemmingen'})` }),
    verkenBtn(node.value.iri),
  ]));
  for (const child of node.children) {
    det.appendChild(permissionNode(child, { ...opts, shownDims: deeper }));
  }
  return det;
}

function permissionCard(p, { titleForDoel, owner, ownerAssignee, index, shownDims, name, badge, badgeIri }) {
  // Vaste kleur per REGELTYPE (zelfde besluit als in de documentweergave):
  // doel en toestemming zijn onderscheidend maar uit dezelfde familie.
  const kind = p.purpose ? 'doel' : 'toestemming';
  const card = h('div', { class: 'card ' + kind });
  const title = h('div', { class: 'card-title' });
  if (titleForDoel) {
    // Alleen met een purpose-refinement is de permission een "Doel".
    title.appendChild(h('span', { class: 'badge ' + kind, text: badge || (p.purpose ? 'Doel' : 'Toestemming') }));
    title.appendChild(document.createTextNode(
      name || p.title || (p.purpose ? p.purpose.label : (p.action ? p.action.label : `Toestemming ${index + 1}`))));
  } else {
    title.appendChild(document.createTextNode(name || p.title || `Toestemming ${index + 1}`));
  }
  appendIf(title, verkenBtn(badgeIri));
  appendIf(title, verkenBtn(p.iri || p.term));
  card.appendChild(title);
  card.appendChild(permissionBody(p, owner, ownerAssignee, { shownDims, ownName: name }));
  return card;
}

// shownDims: de left-operand-IRI's die een omhullende groepskaart al toont;
// hun samenvattingsveld blijft hier weg. De voorwaardenlijst eronder houdt de
// refinement wél, dus er verdwijnt niets uit het verslag van de regel.
function permissionBody(p, owner, ownerAssignee, { shownDims = null, ownName = null } = {}) {
  const frag = document.createDocumentFragment();
  const pairs = [];
  const shown = new Set(shownDims || []);
  // Draagt de kaart een groepsnaam, dan is zijn eigen dct:title niet meer de
  // kop; die verschijnt als veld, zodat de bron niets stilzwijgend kwijtraakt.
  if (ownName && p.title && p.title !== ownName) pairs.push(['Titel', p.title]);
  // Afnemer op de regel zelf (BRP: odrl:assignee op de Permission) — alleen
  // tonen als hij afwijkt van de (effectieve) policy-afnemer of die ontbreekt.
  if (ownerAssignee === undefined) ownerAssignee = owner ? (owner.assignee || null) : null;
  if (p.assignee && (!ownerAssignee || p.assignee.iri !== ownerAssignee.iri)) {
    pairs.push(['Afnemer', ref(p.assignee)]);
  }
  if (p.action) pairs.push(['Actie', h('span', { class: 'mono', text: p.action.curie })]);
  if (p.purpose && !shown.has(PROFILE_PATTERNS.purposeLeftOperand)) {
    const opWord = p.purpose.operatorWord ? ` (${p.purpose.operatorWord})` : '';
    // Volle URI's zijn ruis naast een goed label: toon alleen een echte
    // curie (brongedreven prefixen, bv. apdoel:); de IRI blijft bereikbaar
    // via de verken-knop.
    const pc = p.purpose.curie && !/^https?:/.test(p.purpose.curie) ? p.purpose.curie : '';
    pairs.push(['Doel', h('span', {}, [
      p.purpose.label, ' ',
      (pc || opWord) ? h('span', { class: 'mono muted', text: pc + opWord }) : null,
      verkenBtn(p.purpose.iri),
    ])]);
  }
  if (p.targets.length) {
    // Leden van een target-gegevensset (dct:hasPart) in te zien via een
    // ingeklapte fold-out met telling, gegroepeerd op rdf:type van de leden.
    const box = h('div');
    for (const t of p.targets) {
      const nodes = collectionNodes(t, (iri) => h('span', { class: 'target-tag', title: iri },
        [t.label, verkenBtn(iri || t.term)]));
      for (const n of nodes) box.appendChild(n);
    }
    pairs.push(['Gegevens', box]);
  }
  frag.appendChild(kv(pairs));
  const extraRefs = p.refinements || [];
  if (p.constraints.length || extraRefs.length) {
    frag.appendChild(h('h3', { text: 'Voorwaarden' }));
    if (p.constraints.length) frag.appendChild(constraintList(p.constraints, p.term));
    // Action-refinements naast de doelbinding (o.a. conformsToPolicy).
    if (extraRefs.length) frag.appendChild(constraintList(extraRefs, p.actionNode, ODRL + 'refinement'));
  }
  if (p.duties && p.duties.length) {
    frag.appendChild(h('h3', { text: 'Verplichtingen' }));
    frag.appendChild(dutyList(p.duties, p.term, ODRL + 'duty'));
  }
  const xp = extraPropsBlock(p.extraProps, true);
  if (xp) frag.appendChild(xp);
  if (state.editMode && owner) frag.appendChild(permissionEditControls(owner, p));
  return frag;
}

// Hover-uitleg bij een ontbrekend constraint-slot: welk ODRL-predicaat
// ontbreekt, plus — data-gedreven — welke niet-herkende properties er wél op
// de constraint-node staan (bv. IDSA's `odrl:operand` i.p.v. `odrl:operator`).
function missingSlotTitle(predCurie, unknownProps) {
  let t = `${predCurie} ontbreekt op deze voorwaarde.`;
  if (unknownProps && unknownProps.length) {
    t += ' Wel aanwezig maar niet herkend: '
      + unknownProps.map((u) => `${u.curie} → ${u.values.join(', ')}`).join('; ') + '.';
  }
  return t;
}

// Gestructureerde weergave van een constraint: chips per slot
// [grootheid] [operator] [waarde]; een ontbrekend slot krijgt een duidelijk
// onderscheiden "ontbreekt"-chip met uitleg in de title. Lange waardelijsten
// (rdf:List-rightOperand) worden ingekort met "… (n waarden)" (volledige
// lijst in de title-hover); een unaire profiel-operator (brp:knv) krijgt
// géén waarde-chip en géén markering.
const RIGHT_CHIP_SHOWN = 5;
function constraintChips(c) {
  const wrap = h('span', { class: 'c-chips' });
  const chip = (cls, text, title) => h('span', { class: 'c-slot ' + cls, text, title: title || null });
  wrap.appendChild(c.slots.left
    ? chip('left', c.slots.left.text)
    : chip('missing', 'grootheid ontbreekt', missingSlotTitle('odrl:leftOperand', c.unknownProps)));
  wrap.appendChild(c.slots.operator
    ? chip('op', c.slots.operator.text)
    : chip('missing', 'operator ontbreekt', missingSlotTitle('odrl:operator', c.unknownProps)));
  if (c.slots.right) {
    const texts = c.slots.right.texts;
    const long = texts.length > RIGHT_CHIP_SHOWN + 1;
    const shown = long
      ? `${texts.slice(0, RIGHT_CHIP_SHOWN).join(', ')}, … (${texts.length} waarden)`
      : texts.join(', ');
    wrap.appendChild(chip('right', shown, long ? texts.join(', ') : null));
  } else if (!c.unaryOperator) {
    wrap.appendChild(chip('missing', 'waarde ontbreekt', missingSlotTitle('odrl:rightOperand', c.unknownProps)));
  }
  return wrap;
}

// Geneste logische constraints (odrl:and/or/xone): gestructureerde weergave
// met groepskop en ingesprongen leden (bladen als chips, rdfs:comment als
// hover); grote bomen starten ingeklapt. Zelfde vorm als de doc-weergave.
const LOGICAL_HEADS = {
  and: 'alle van', andSequence: 'alle van, in volgorde',
  or: 'één van', xone: 'precies één van',
};
const GROUP_COLLAPSE_LEAVES = 10;

function countConstraintLeaves(c) {
  if (!c.children || !c.children.length) return 1;
  return c.children.reduce((n, ch) => n + countConstraintLeaves(ch), 0);
}

function constraintNode(c) {
  if (!c.logical || !c.children || !c.children.length) {
    const row = h('span', { class: 'c-leaf', title: c.comment || null });
    if (c.label) row.appendChild(h('span', { class: 'sentence c-label', text: c.label + ':' }));
    if (c.slots) row.appendChild(constraintChips(c));
    else row.appendChild(h('span', { class: 'sentence', text: c.sentence }));
    return row;
  }
  const group = h('div', { class: 'c-group', title: c.comment || null });
  group.appendChild(h('div', { class: 'c-group-head' }, [
    c.label ? h('span', { class: 'c-label', text: c.label }) : null,
    h('span', { class: 'c-slot op', text: LOGICAL_HEADS[c.logical] || c.logical }),
  ]));
  const ul = h('ul', { class: 'clean c-group-items' });
  for (const ch of c.children) {
    ul.appendChild(h('li', { class: 'c-group-item' }, [constraintNode(ch)]));
  }
  group.appendChild(ul);
  return group;
}

function constraintGroupOrFold(c) {
  const leaves = countConstraintLeaves(c);
  if (leaves <= GROUP_COLLAPSE_LEAVES) return constraintNode(c);
  const det = h('details', { class: 'c-fold' });
  det.appendChild(h('summary', { class: 'vl-summary muted' }, [
    h('span', { class: 'vl-chevron', text: '▸' }),
    h('span', { text: `${c.label || 'Samengestelde voorwaarde'} — ${LOGICAL_HEADS[c.logical] || c.logical} (${leaves} voorwaarden)` }),
  ]));
  const holder = h('div', { class: 'c-fold-body' });
  let built = false;
  det.addEventListener('toggle', () => {
    if (!det.open || built) return;
    built = true;
    holder.appendChild(constraintNode({ ...c, label: null }));
  });
  det.appendChild(holder);
  return det;
}

function constraintList(constraints, ruleTerm, predIri = ODRL + 'constraint') {
  const ul = h('ul', { class: 'clean' });
  for (const c of constraints) {
    const li = h('li', { class: 'constraint' });
    // De vaste zin hoort bij de ODRL-AP-NL-vorm (operator conformsToPolicy);
    // een technische borging die alleen de dpv-marker draagt zegt iets anders
    // en valt hieronder in de gewone chip-tak.
    if (c.conformsOp && c.conformsTo) {
      const art = byIri(state.model.artifacts.concat(state.model.bundles), c.conformsTo);
      li.appendChild(h('span', { class: 'sentence' }, [
        'Verwerkingsverzoek voldoet aan beleid ',
        h('span', {
          class: 'linkish', text: art ? art.title : curie(c.conformsTo),
          onclick: () => { if (art) selectNav({ id: art.iri, kind: art.kind }); },
        }),
      ]));
    } else if (c.slots) {
      if (c.label) li.appendChild(h('span', { class: 'sentence c-label', text: c.label + ':' }));
      li.appendChild(constraintChips(c));
    } else if (c.logical && c.children && c.children.length) {
      // Samengestelde (logische) constraints: geneste groepsweergave.
      li.appendChild(constraintGroupOrFold(c));
    } else {
      li.appendChild(h('span', { class: 'sentence', text: (c.label ? c.label + ': ' : '') + c.sentence }));
    }
    appendIf(li, verkenBtn(c.term));
    if (state.editMode && ruleTerm && c.term) {
      const formBox = h('div', { class: 'constraint-edit' });
      formBox.hidden = true;
      li.appendChild(h('span', {
        class: 'linkish edit-link', text: 'bewerk',
        onclick: () => {
          if (!formBox.children.length) formBox.appendChild(constraintForm(c));
          formBox.hidden = !formBox.hidden;
        },
      }));
      li.appendChild(h('span', {
        class: 'linkish edit-link danger', text: '✕', title: 'voorwaarde verwijderen',
        onclick: () => { edit.removeAttached(state.store, ruleTerm, predIri, c.term); rebuild(currentDocId()); },
      }));
      li.appendChild(formBox);
    }
    ul.appendChild(li);
  }
  return ul;
}

// De dekkings-TAGS op de regelkoppen zijn vervallen (aug 2026, besluit
// eigenaar): de conformsToPolicy-VOORWAARDE is de primaire representatie
// geworden en draagt in de documentweergave de uitklap met de gedekte regels
// (doc.js/coverageFold). De editor toont die voorwaarde als gewone
// voorwaarde-rij; de detectie zelf blijft modelinformatie
// (parse.js/annotateCoverage, model.coverageByNode).

function dutyList(duties, ownerTerm, predIri) {
  const ul = h('ul', { class: 'clean' });
  for (const d of duties) {
    const parts = [d.label || d.action || 'verplichting'];
    if (d.action && d.action !== d.label) parts.push(h('span', { class: 'mono muted', text: ' ' + d.action }));
    if (d.term) parts.push(verkenBtn(d.term));
    if (d.informedParty) parts.push(' — informeer ', ref(d.informedParty));
    // Voorwaarden op de verplichting (odrl:constraint) en de parameters van de
    // maatregel (action-refinements, bv. "schaalnoemer is groter dan of gelijk
    // aan 50000"): dezelfde slot-chip-structuur als bij een toestemming — een
    // voorwaarde is overal hetzelfde ding. Voorheen stond hier één platte zin
    // tussen haakjes, waardoor grootheid/operator/waarde niet af te lezen was.
    const dcs = [...(d.constraints || []), ...(d.refinements || [])];
    if (dcs.length) {
      parts.push(h('div', { class: 'duty-extra' }, [
        h('span', { class: 'muted', text: 'Voorwaarden:' }),
        // Geen eigenaar-term: de refinements hangen aan de actie-knoop, die
        // het model niet als term doorgeeft — dus geen bewerk-/losmaakknop.
        constraintList(dcs, null),
      ]));
    }
    // Overige eigenschappen op de duty en zijn actie-knoop (bv. creditor,
    // hasDeadlineDelta, timeInterval): label+waarde-rijen, nooit verzwegen.
    const dxp = extraPropsBlock(d.extraProps, false);
    if (dxp) parts.push(h('div', { class: 'duty-extra' }, [dxp]));
    // Duty-naar-duty-verwijzingen (odrl:duty op een Duty): als genest
    // verplichtingen-lijstje, niet als kale curie.
    if (d.duties && d.duties.length) {
      parts.push(h('div', { class: 'duty-extra' }, [
        h('span', { class: 'muted', text: 'Verplichtingen:' }),
        dutyList(d.duties, null, null),
      ]));
    }
    if (state.editMode && ownerTerm && d.term) {
      parts.push(h('span', {
        class: 'linkish edit-link', text: 'hernoem',
        onclick: () => {
          const v = typeof prompt === 'function' ? prompt('Label van de verplichting', d.label || '') : null;
          if (v != null) { edit.setLiteral(state.store, d.term, RDFS + 'label', v, { lang: 'nl' }); rebuild(currentDocId()); }
        },
      }));
      parts.push(h('span', {
        class: 'linkish edit-link danger', text: '✕', title: 'verplichting losmaken',
        onclick: () => { edit.removeAttached(state.store, ownerTerm, predIri, d.term); rebuild(currentDocId()); },
      }));
    }
    ul.appendChild(h('li', {}, parts));
  }
  return ul;
}

// --- Bewerken-modus: formulieren --------------------------------------------
function currentDocId() { return state.selected ? state.selected.id : null; }

function btn(label, onclick, cls = '') {
  return h('button', { class: ('btn btn-sm ' + cls).trim(), type: 'button', onclick, text: label });
}

function iriInput(value, placeholder) {
  return h('input', {
    class: 'edit-input', type: 'text', value: value || '',
    list: 'dl-labeled', placeholder: placeholder || 'IRI of prefix:naam',
  });
}

// Select met bekende termen + "anders (IRI)…"-optie die een vrij veld toont.
function iriPicker(options, currentIri) {
  const sel = h('select', { class: 'edit-input' });
  const opts = [...(options || [])];
  if (currentIri && !opts.some((o) => o.iri === currentIri)) {
    opts.unshift({ iri: currentIri, curie: curie(currentIri), label: curie(currentIri) });
  }
  for (const o of opts) {
    const opt = h('option', {
      value: o.iri,
      text: o.label === o.curie || o.label === o.iri ? o.curie : `${o.label} (${o.curie})`,
    });
    if (o.iri === currentIri) opt.setAttribute('selected', '');
    sel.appendChild(opt);
  }
  sel.appendChild(h('option', { value: '__other__', text: 'anders (IRI)…' }));
  const free = iriInput('');
  free.hidden = true;
  sel.addEventListener('change', () => { free.hidden = sel.value !== '__other__'; });
  const root = h('span', { class: 'iri-picker' }, [sel, free]);
  return { root, value: () => (sel.value === '__other__' ? edit.expandIri(free.value) : sel.value) };
}

// Formulier voor Offer-/Agreement-velden + structuurknoppen.
function policyEditSection(p, kind) {
  const isAgr = kind === 'agreement';
  const box = h('div', { class: 'edit-section' });
  box.appendChild(h('div', { class: 'edit-title', text: 'Bewerken — ' + (isAgr ? 'overeenkomst' : 'aanbod') }));
  const title = h('input', { class: 'edit-input', type: 'text', value: p.title || '' });
  const desc = h('textarea', { class: 'edit-input', text: p.description || '' });
  const issued = h('input', { class: 'edit-input', type: 'date', value: (p.issued || '').slice(0, 10) });
  const assigner = iriInput(p.assigner ? p.assigner.curie : '');
  let assignee = null; let inst = null;
  if (isAgr) {
    assignee = iriInput(p.assignee ? p.assignee.curie : '');
    inst = h('select', { class: 'edit-input' });
    inst.appendChild(h('option', { value: '', text: '(geen)' }));
    for (const o of state.model.offers) {
      const opt = h('option', { value: o.iri, text: o.title });
      if ((p.offers || []).includes(o.iri)) opt.setAttribute('selected', '');
      inst.appendChild(opt);
    }
  }
  const msg = h('span', { class: 'form-msg' });
  const form = h('div', { class: 'edit-form' });
  const row = (label, node) => { form.appendChild(h('label', { text: label })); form.appendChild(node); };
  row('Titel *', title);
  row('Beschrijving *', desc);
  row('Uitgegeven', issued);
  row('Aanbieder', assigner);
  if (isAgr) { row('Afnemer', assignee); row('Vult aanbod in', inst); }
  box.appendChild(form);
  box.appendChild(h('div', { class: 'editbar' }, [
    btn('Opslaan', () => {
      if (!title.value.trim() || !desc.value.trim()) {
        msg.textContent = 'Titel en beschrijving zijn verplicht.';
        return;
      }
      const s = state.store; const t = p.term;
      edit.setLiteral(s, t, DCT + 'title', title.value.trim(), { lang: 'nl' });
      edit.setLiteral(s, t, DCT + 'description', desc.value.trim(), { lang: 'nl' });
      edit.setLiteral(s, t, DCT + 'issued', issued.value, { datatype: XSD + 'date' });
      edit.setIri(s, t, ODRL + 'assigner', assigner.value);
      if (isAgr) {
        edit.setIri(s, t, ODRL + 'assignee', assignee.value);
        // Offer-koppeling via prov:wasDerivedFrom; laat niet-Offer-
        // verwijzingen (grondslag e.d.) op dat predicaat staan.
        edit.setAgreementOffer(s, t, inst.value, state.model.offers.map((o) => o.iri));
      }
      rebuild(p.iri);
    }),
    btn(isAgr ? '+ Doel (permission)' : '+ Permission', () => {
      edit.addPermission(state.store, p.term, { withPurpose: isAgr });
      rebuild(p.iri);
    }),
    btn('+ Verplichting', () => { edit.addDuty(state.store, p.term, ODRL + 'obligation'); rebuild(p.iri); }),
    ...(isAgr ? [] : [btn('+ Overeenkomst op dit aanbod', () => {
      const iri = edit.addAgreement(state.store, p.term);
      rebuild(iri);
    })]),
    btn('Dupliceer', () => { const iri = edit.duplicatePolicy(state.store, p.term); rebuild(iri); }),
    btn('Verwijder', () => {
      if (typeof confirm === 'function'
        && !confirm((isAgr ? 'Deze overeenkomst' : 'Dit aanbod') + ' en alle onderliggende onderdelen verwijderen?')) return;
      edit.removePolicy(state.store, p.term);
      rebuild(null);
    }, 'btn-danger'),
    msg,
  ]));
  return box;
}

// Doel-/permission-formulier (purpose, actie, targets) + structuurknoppen.
function permissionEditControls(owner, p) {
  const box = h('div', { class: 'edit-section edit-inline' });
  const purpose = iriInput(p.purpose ? (p.purpose.curie || p.purpose.iri) : '', 'doel-IRI (leeg = geen doelbinding)');
  const opSel = h('select', { class: 'edit-input' });
  for (const [v, txt] of [[ODRL + 'eq', 'odrl:eq (is gelijk aan)'], [ODRL + 'isA', 'odrl:isA (is een)']]) {
    const o = h('option', { value: v, text: txt });
    if (p.purpose && p.purpose.operator === curie(v)) o.setAttribute('selected', '');
    opSel.appendChild(o);
  }
  const action = iriPicker(state.opts ? state.opts.actions : [], p.action ? p.action.iri : null);
  const form = h('div', { class: 'edit-form' });
  const row = (label, node) => { form.appendChild(h('label', { text: label })); form.appendChild(node); };
  row('Doel', purpose);
  row('Doel-operator', opSel);
  row('Actie', action.root);
  const tbox = h('div');
  for (const t of p.targets) {
    tbox.appendChild(h('span', { class: 'target-tag' }, [t.label, h('span', {
      class: 'target-x', title: 'target verwijderen', text: ' ✕',
      onclick: () => { edit.removeTarget(state.store, p.term, t.iri); rebuild(currentDocId()); },
    })]));
  }
  const addT = iriInput('', 'nieuw target (IRI of prefix:naam)');
  tbox.appendChild(h('span', { class: 'add-row' }, [addT, btn('+ target', () => {
    if (addT.value.trim()) { edit.addTarget(state.store, p.term, addT.value); rebuild(currentDocId()); }
  })]));
  row('Gegevens', tbox);
  box.appendChild(form);
  box.appendChild(h('div', { class: 'editbar' }, [
    btn('Opslaan', () => {
      edit.setAction(state.store, p.term, action.value());
      edit.setPurpose(state.store, p.term, { purpose: purpose.value, operator: opSel.value });
      rebuild(currentDocId());
    }),
    btn('+ Voorwaarde', () => { edit.addConstraint(state.store, p.term); rebuild(currentDocId()); }),
    btn('+ Verplichting', () => { edit.addDuty(state.store, p.term, ODRL + 'duty'); rebuild(currentDocId()); }),
    btn('Dupliceer doel', () => { edit.duplicateAttached(state.store, owner.term, ODRL + 'permission', p.term); rebuild(currentDocId()); }),
    btn('Verwijder doel', () => { edit.removeAttached(state.store, owner.term, ODRL + 'permission', p.term); rebuild(owner.iri); }, 'btn-danger'),
  ]));
  return box;
}

// Voorwaarde-formulier: leftOperand/operator uit dropdowns (graaf-gevuld),
// rightOperand als waarde of IRI-verwijzing.
function constraintForm(c) {
  const box = h('div', { class: 'edit-section edit-inline' });
  if (c.term && c.term.termType === 'NamedNode') {
    box.appendChild(h('p', { class: 'form-msg', text: 'Let op: gedeelde bouwsteen (' + curie(c.term.value) + '); wijzigingen gelden overal waar deze wordt gebruikt.' }));
  }
  const left = iriPicker(state.opts ? state.opts.leftOperands : [], c.left ? edit.expandIri(c.left) : null);
  const op = iriPicker(state.opts ? state.opts.operators : [], c.operator ? edit.expandIri(c.operator) : null);
  const firstRight = c.right && c.right.length ? c.right[0] : '';
  const isIri = !!(firstRight && c.rightRefs && c.rightRefs.includes(edit.expandIri(firstRight)));
  const kindSel = h('select', { class: 'edit-input' });
  for (const [v, txt] of [['literal', 'waarde (tekst)'], ['iri', 'verwijzing (IRI)']]) {
    const o = h('option', { value: v, text: txt });
    if ((v === 'iri') === isIri) o.setAttribute('selected', '');
    kindSel.appendChild(o);
  }
  const val = h('input', { class: 'edit-input', type: 'text', value: firstRight, list: 'dl-labeled' });
  const dtSel = h('select', { class: 'edit-input' });
  for (const [v, txt] of [['', '(geen taal/datatype)'], ['nl', '@nl'], [XSD + 'date', 'xsd:date'],
    [XSD + 'dateTime', 'xsd:dateTime'], [XSD + 'integer', 'xsd:integer'],
    [XSD + 'boolean', 'xsd:boolean'], [XSD + 'duration', 'xsd:duration']]) {
    dtSel.appendChild(h('option', { value: v, text: txt }));
  }
  const form = h('div', { class: 'edit-form' });
  const row = (label, node) => { form.appendChild(h('label', { text: label })); form.appendChild(node); };
  row('Grootheid', left.root);
  row('Operator', op.root);
  row('Waarde-soort', kindSel);
  row('Waarde', val);
  row('Taal/datatype', dtSel);
  box.appendChild(form);
  box.appendChild(h('div', { class: 'editbar' }, [btn('Opslaan', () => {
    const kind = kindSel.value;
    const right = kind === 'iri'
      ? { value: val.value, kind: 'iri' }
      : {
        value: val.value, kind: 'literal',
        lang: dtSel.value === 'nl' ? 'nl' : undefined,
        datatype: dtSel.value && dtSel.value !== 'nl' ? dtSel.value : undefined,
      };
    edit.setConstraint(state.store, c.term, { left: left.value(), operator: op.value(), right });
    rebuild(currentDocId());
  })]));
  return box;
}

// Verbods-secties (odrl:prohibition): zelfde opbouw als permissions, maar met een
// "Verbod"-badge en rode kaart.
function prohibitionsSection(prohibitions) {
  const frag = document.createDocumentFragment();
  prohibitions.forEach((p, i) => {
    const card = h('div', { class: 'card verbod' });
    const title = h('div', { class: 'card-title' });
    title.appendChild(h('span', { class: 'badge verbod', text: 'Verbod' }));
    title.appendChild(document.createTextNode(p.action ? p.action.label : `Verbod ${i + 1}`));
    appendIf(title, verkenBtn(p.iri || p.term));
    card.appendChild(title);
    card.appendChild(permissionBody(p));
    frag.appendChild(card);
  });
  return frag;
}

// --- Overerving (odrl:inheritFrom, ODRL 2.2 Policy Inheritance) -------------
// De regels van de ouderpolicy gelden samen met de eigen regels van dit
// beleid. Ze op de kindkaart uitschrijven zou het beeld verdubbelen (en bij
// een keten vervielvoudigen); daarom ÉÉN uitklapbare rij per voorouder, met
// een sprong naar die ouder. Ontbreekt de ouder in de geladen bron, dan blijft
// de rij staan en zegt hij dat eerlijk — de verwijzing is er immers wél.
// Niet te verwarren met de doorwerking vanuit het aanbod (gedeelde regel-IRI).
function inheritRowLabel(g) {
  if (!g.iri) return t('inheritRules.labelInvalid', { value: g.literal });
  const parent = g.title || g.curie || g.iri;
  if (!g.present) return t('inheritRules.labelMissing', { parent });
  return g.rules.length
    ? t('inheritRules.label', { parent, n: g.rules.length })
    : t('inheritRules.labelEmpty', { parent });
}

// De navigatiesoort van de ouder, zodat de sprong in de boom de juiste kaart
// opent (een ouder mag een aanbod, overeenkomst óf set zijn).
function policyNavKind(iri) {
  const m = state.model;
  if (!m) return null;
  if (byIri(m.offers, iri)) return 'offer';
  if (byIri(m.agreements, iri)) return 'agreement';
  if (byIri(m.sets, iri)) return 'set';
  return null;
}

function inheritSection(pol) {
  const groups = (pol && pol.inherited) || [];
  if (!groups.length) return null;
  const frag = document.createDocumentFragment();
  frag.appendChild(h('h2', { text: t('inheritRules.head') }));
  for (const g of groups) {
    const det = h('details', { class: 'card geerfd' + (g.present ? '' : ' ontbreekt') });
    const kind = g.iri ? policyNavKind(g.iri) : null;
    det.appendChild(h('summary', { class: 'card-title' }, [
      h('span', { class: 'badge geerfd', text: t('rule.inherited') }),
      kind
        ? h('span', {
          class: 'linkish', text: inheritRowLabel(g),
          onclick: (e) => { if (e && e.stopPropagation) e.stopPropagation(); selectNav({ id: g.iri, kind }); },
        })
        : h('span', { text: inheritRowLabel(g) }),
      g.cycle ? h('span', { class: 'muted', title: t('inheritRules.cycleTitle'), text: ' — ' + t('inheritRules.cycle') }) : null,
      g.iri ? verkenBtn(g.iri) : null,
    ]));
    det.appendChild(h('p', {
      class: 'muted',
      text: g.present ? t('inheritRules.note') : t('inheritRules.noteMissing'),
    }));
    const duties = g.rules.filter((e) => e.type === 'obligation').map((e) => e.rule);
    const perms = g.rules.filter((e) => e.type === 'permission').map((e) => e.rule);
    const prohs = g.rules.filter((e) => e.type === 'prohibition').map((e) => e.rule);
    // Geen eigenaar-term meegeven: geërfde regels horen bij de OUDER en zijn
    // hier dus niet te bewerken.
    if (duties.length) det.appendChild(dutyList(duties, null, null));
    if (perms.length) det.appendChild(permissionsSection(perms, true, null, null));
    if (prohs.length) det.appendChild(prohibitionsSection(prohs));
    frag.appendChild(det);
  }
  return frag;
}

function versionBlock(v) {
  if (!v) return null;
  const pairs = [];
  if (v.effectiveFrom) pairs.push(['Geldig vanaf', v.effectiveFrom]);
  if (v.effectiveTo) pairs.push(['Geldig tot', v.effectiveTo]);
  if (v.revisionOf) pairs.push(['Vervangt', linkRef(v.revisionOf)]);
  if (v.supersededBy.length) pairs.push(['Vervangen door', spanJoin(v.supersededBy.map(linkRef))]);
  if (v.specializationOf) pairs.push(['Versieloze identiteit', ref(v.specializationOf)]);
  // Puntkomma tussen bronnen (wet-/besluittitels bevatten zelf komma's);
  // externe links met URL-gedecodeerd label (besluit-PDF's).
  if (v.derivedFrom.length) pairs.push(['Afgeleid van (grondslag/bron)', spanJoin(v.derivedFrom.map((d) =>
    /^https?:/.test(d.iri) && !d.curie.includes(':') ? externalLink(d.iri, decodedRefLabel(d)) : refLinkOrExt(d)), '; ')]);
  if (!pairs.length) return null;
  const frag = document.createDocumentFragment();
  frag.appendChild(h('h2', { text: 'Versie & herkomst' }));
  frag.appendChild(kv(pairs));
  return frag;
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

function refLinkOrExt(d) {
  // Externe wet/URI -> link (met verbaliseerd label indien beschikbaar);
  // interne node -> gewone ref.
  if (/^https?:\/\//.test(d.iri) && (d.curie === d.iri || d.curie.startsWith('bwb:') || d.curie.startsWith('http'))) {
    return externalLink(d.iri, decodedRefLabel(d));
  }
  return linkRef(d);
}

function linkRef(agent) {
  if (!agent) return null;
  const known = state.model && [].concat(
    state.model.offers, state.model.agreements, state.model.artifacts, state.model.bundles,
  ).find((x) => x.iri === agent.iri);
  if (known) {
    return h('span', {
      class: 'linkish', text: agent.label || agent.curie,
      onclick: () => selectNav({ id: known.iri, kind: known.kind }),
    });
  }
  return h('span', { class: 'mono muted', text: agent.curie });
}

function spanJoin(nodes, sep = ', ') {
  const wrap = h('span');
  nodes.forEach((n, i) => { if (i) wrap.appendChild(document.createTextNode(sep)); wrap.appendChild(n); });
  return wrap;
}

// Overige eigenschappen: reguliere (domein)attributen buiten het ODRL-model
// om, bijv. brp:medium op een permission. Nooit stilzwijgend weglaten.
function extraPropsBlock(extraProps, asSection) {
  if (!extraProps || !extraProps.length) return null;
  const pairs = extraProps.map((ep) => [
    ep.predicate.label,
    spanJoin(ep.values.map((v) => {
      if (v.literal !== undefined) return longText(v.literal);
      // Blank node: één niveau samengevat (typelabel — eigenschappen).
      if (v.blank) return h('span', { class: 'blank-summary', text: v.label });
      return h('span', { title: v.iri }, [v.label, ' ', h('span', { class: 'mono muted', text: v.curie })]);
    })),
  ]);
  const frag = document.createDocumentFragment();
  if (asSection) frag.appendChild(h('h3', { text: 'Overige eigenschappen' }));
  frag.appendChild(kv(pairs));
  return frag;
}

// --- Schaalbare terugverwijzings-lijst ---------------------------------------
// Voor onbegrensde lijsten van verwijzingen naar andere policies (bijv.
// "Overeenkomsten op dit aanbod" — op BRP-schaal 1.392 stuks op één Offer).
// Fold-out in de stijl van de versie-kiezer: ingeklapt alleen de telling
// (summaryText); de eerste uitklap bouwt lazy een filterveld + de lijst,
// gechunkt toegevoegd met een "Meer tonen"-knop (chunkgrootte via cardChunk).
// items: [{ title, sub?, ... }]; makeNode rendert één item (linkish/ref).
// Alleen aanroepen boven de inline-drempel (refListCollapsed) — daaronder
// blijft de bestaande directe lijstweergave.
function refListBlock({ summaryText, items, makeNode, filterLabel }) {
  const box = h('details', { class: 'ref-list' });
  box.appendChild(h('summary', { class: 'vl-summary muted' }, [
    h('span', { class: 'vl-chevron', text: '▸' }),
    h('span', { text: summaryText }),
  ]));
  let built = false;
  box.addEventListener('toggle', () => {
    if (!box.open || built) return;
    built = true;
    const count = h('span', { class: 'ref-count muted' });
    const input = h('input', {
      type: 'search', class: 'ref-filter',
      placeholder: 'Filter op titel of afnemer…',
      'aria-label': filterLabel || 'Filter verwijzingen op titel of afnemer',
    });
    const list = h('ul', { class: 'clean ref-items' });
    const moreBtn = h('button', { type: 'button', class: 'btn ref-more', text: 'Meer tonen' });
    let visible = items;
    let offset = 0;
    const updateCount = () => {
      count.textContent = visible.length === items.length ? ''
        : `${visible.length.toLocaleString('nl-NL')} van ${items.length.toLocaleString('nl-NL')}`;
    };
    const renderChunk = () => {
      const { items: chunk, nextOffset, done } = cardChunk(visible, offset);
      for (const it of chunk) list.appendChild(h('li', { class: 'ref-item' }, [makeNode(it)]));
      offset = nextOffset;
      moreBtn.hidden = done;
      if (!done) {
        moreBtn.textContent = `Meer tonen (${(visible.length - offset).toLocaleString('nl-NL')} resterend)`;
      }
    };
    const restart = () => {
      list.innerHTML = '';
      offset = 0;
      renderChunk();
      updateCount();
    };
    input.addEventListener('input', () => {
      visible = filterRefItems(items, input.value);
      restart();
    });
    moreBtn.addEventListener('click', renderChunk);
    box.appendChild(h('div', { class: 'ref-bar' }, [input, count]));
    box.appendChild(list);
    box.appendChild(moreBtn);
    restart();
  });
  return box;
}

// Ledenlijst van een target-gegevensset (odrl:AssetCollection): ingeklapte
// fold-out met telling; de eerste uitklap bouwt lazy de gegroepeerde lijst
// (op rdf:type, alfabetisch). Zelfde vorm als de doc-weergave.
function targetMembersFold(t) {
  const det = h('details', { class: 'member-list' });
  det.appendChild(h('summary', { class: 'vl-summary muted' }, [
    h('span', { class: 'vl-chevron', text: '▸' }),
    h('span', { text: memberSummary(t.members, t.collKind) }),
  ]));
  let built = false;
  det.addEventListener('toggle', () => {
    if (!det.open || built) return;
    built = true;
    const groups = groupCollectionMembers(t.members, t.collKind);
    // Eén groep (bv. leden zonder type-informatie): ongegroepeerde lijst
    // zonder groepskop.
    const showHeads = groups.length > 1;
    for (const g of groups) {
      if (showHeads) {
        det.appendChild(h('div', { class: 'member-group-head muted', text: `${g.label} (${g.items.length})` }));
      }
      const ul = h('ul', { class: 'clean member-items' });
      for (const m of g.items) {
        ul.appendChild(h('li', { class: 'member-item', title: m.iri }, [m.label, verkenBtn(m.iri)]));
      }
      det.appendChild(ul);
    }
  });
  return det;
}

// Intensioneel gedefinieerde collectie: de leden staan niet opgesomd maar
// worden BESCHREVEN door een odrl:refinement ("elke partij waarvoor geldt:
// rol bevat verkoper"). De zin komt uit dezelfde zinbouwer als elke andere
// voorwaarde; odrl:source staat er klein als bronvermelding bij.
function collectionIntensionNode(ix, phraseShownElsewhere) {
  if (!ix) return null;
  if (phraseShownElsewhere && !ix.source) return null;
  const box = h('span', { class: 'coll-intension' },
    phraseShownElsewhere ? [] : [h('span', { class: 'coll-phrase', text: ix.phrase })]);
  if (ix.source) {
    box.appendChild(h('span', { class: 'coll-source muted' }, [
      t('coll.source', { source: ix.source.label || ix.source.curie || '' }),
      ix.source.iri ? verkenBtn(ix.source.iri) : null,
    ]));
  }
  return box;
}

// Weergave van een knoop die (ook) een collectie kan zijn — een target of een
// partij: naam-tag, ledenlijst (extensioneel) en/of de intensionele zin. Bij
// een ANONIEME, puur intensionele collectie blijft de naam-tag weg:
// "(anonieme PartyCollection)" naast "elke partij waarvoor geldt: ..." is ruis,
// en de zin draagt dan zelf de verken-knop.
function collectionNodes(desc, tagFn) {
  const ix = desc.intension || null;
  const members = desc.members || [];
  const nameless = !!(desc.anon && ix && !members.length);
  return [
    nameless
      ? h('span', { class: 'target-tag' }, [ix.phrase, verkenBtn(desc.term)])
      : tagFn(desc.anon ? null : desc.iri),
    members.length ? targetMembersFold(desc) : null,
    ix ? collectionIntensionNode(ix, nameless) : null,
  ].filter(Boolean);
}

function policyMeta(p) {
  return kv([
    ['Aanbieder', p.assigner ? ref(p.assigner) : null],
    ['Afnemer', p.assignee ? ref(p.assignee) : null],
    ['Uitgegeven', p.issued],
    ['Publicatie door', p.publisher ? ref(p.publisher) : null],
    ['Profiel', p.profile ? h('span', { class: 'mono muted', text: curie(p.profile) }) : null],
    ['UID', p.uid ? h('span', { class: 'mono muted', text: curie(p.uid) }) : null],
  ]);
}

function offerView(o) {
  const frag = document.createDocumentFragment();
  frag.appendChild(heading(o.title, 'Aanbod', o.curie, o.anon ? null : o.iri, o.anon ? o.term : o.iri));
  if (o.description) frag.appendChild(h('p', {}, [longText(o.description)]));
  // Dataset is catalogus-context: als metadata bij het aanbod, geen boomniveau.
  const ds = state.model.datasets.find((d) => d.iri === o.datasetIri || d.policies.includes(o.iri));
  if (ds) {
    frag.appendChild(kv([['Dataset', h('span', {}, [
      ds.title, ' ', h('span', { class: 'mono muted', text: ds.curie }),
    ])]]));
  }
  frag.appendChild(policyMeta(o));
  const oxp = extraPropsBlock(o.extraProps, false);
  if (oxp) frag.appendChild(oxp);
  if (state.editMode) frag.appendChild(policyEditSection(o, 'offer'));
  const oinh = inheritSection(o);
  if (oinh) frag.appendChild(oinh);
  if (o.obligations.length) {
    frag.appendChild(h('h2', { text: 'Verplichtingen' }));
    frag.appendChild(dutyList(o.obligations, o.term, ODRL + 'obligation'));
  }
  frag.appendChild(h('h2', { text: 'Toestemmingen' }));
  frag.appendChild(permissionsSection(o.permissions, false, o));
  if (o.prohibitions && o.prohibitions.length) {
    frag.appendChild(h('h2', { text: 'Verboden' }));
    frag.appendChild(prohibitionsSection(o.prohibitions));
  }
  const v = versionBlock(o.version);
  if (v) frag.appendChild(v);
  // Overeenkomsten die dit aanbod invullen (prov:wasDerivedFrom).
  const agrs = state.model.agreements.filter((a) => (a.offers || []).includes(o.iri));
  if (agrs.length) {
    frag.appendChild(h('h2', { text: 'Overeenkomsten op dit aanbod' }));
    const makeNode = (it) => h('span', {}, [
      h('span', {
        class: 'linkish', text: it.title,
        onclick: () => selectNav({ id: it.agr.iri, kind: 'agreement' }),
      }),
      it.agr.assignee ? ' — ' : '',
      it.agr.assignee ? ref(it.agr.assignee) : '',
    ]);
    const items = agrs.map((a) => ({
      title: a.title, sub: a.assignee ? a.assignee.label : null, agr: a,
    }));
    // Tot REF_LIST_INLINE_MAX de directe lijst; daarboven (BRP-schaal:
    // 1.392 overeenkomsten) de ingeklapte, filterbare fold-out. In
    // ?sparql=-lijstmodus komt de lijst uit de skelet-graaf en kan hij
    // onvolledig zijn (SAMPLE per agreement) → "n getoond" i.p.v. totaal.
    if (!refListCollapsed(items.length)) {
      const ul = h('ul', { class: 'clean' });
      for (const it of items) ul.appendChild(h('li', {}, [makeNode(it)]));
      frag.appendChild(ul);
    } else {
      const n = items.length.toLocaleString('nl-NL');
      frag.appendChild(refListBlock({
        summaryText: state.sparqlEndpoint
          ? `${n} getoond` : `${n} overeenkomsten`,
        items, makeNode,
        filterLabel: 'Filter overeenkomsten op titel of afnemer',
      }));
    }
  }
  return frag;
}

// Versieperiode als compacte tekst (gedeeld tussen kop en lijstregels).
function versionPeriod(v) {
  return v.status === 'future'
    ? 'vanaf ' + (compactDate(v.effectiveFrom) || '?')
    : `${compactDate(v.effectiveFrom) || '…'} → ${compactDate(v.until) || 'heden'}`;
}

// --- Versienavigator-chip (zelfde patroon als de documentweergave) ----------
// Vervangt de vroegere fold-out versie-kiezer: een compacte chip in de kop
// van de kaart — ‹ datum › — waarin de datum die van de GETOONDE versie is
// (dct:issued, terugval effectiveFrom, anders "—"), met een pijl terug als er
// een oudere versie is en een pijl vooruit bij een nieuwere. Klik op de datum
// opent "alle versies (n)" (recent-first). Wisselen loopt via selectNav, dat
// in ?sparql=-modus het detail eerst bijlaadt (loadDetailAndSelect).
// Statuschip van de getoonde versie, bedoeld direct achter de kaarttitel.
function versionStatusChip(policyIri) {
  const nm = policyIri ? versionNavModel(state.model, policyIri) : null;
  const v = nm && nm.shown;
  if (!v || !v.status || v.status === 'current') return null;
  return h('span', { class: 'vchip ' + v.status, text: statusWord(v.status) });
}

function versionNav(policyIri) {
  if (!policyIri) return null;
  const nm = versionNavModel(state.model, policyIri);
  if (!nm) return null;
  const go = (v) => selectNav({ id: v.iri, kind: v.kind || 'set' });
  const stop = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (e && e.preventDefault) e.preventDefault();
  };
  const wrap = h('span', { class: 'vnav-wrap' });
  const box = h('span', { class: 'vnav' });
  // Beide pijlsleuven staan er altijd: een ontbrekende buur wordt een
  // onzichtbare plaatshouder, zodat datum en pijlen niet verspringen.
  const arrow = (v, back) => {
    const glyph = back ? '‹' : '›';
    if (!v) return h('span', { class: 'vnav-arrow vnav-arrow-off', 'aria-hidden': 'true', text: glyph });
    const label = (back ? 'oudere versie: ' : 'nieuwere versie: ') + versionNavDate(v);
    return h('button', {
      type: 'button', class: 'vnav-arrow', title: label, 'aria-label': label,
      text: glyph, onclick: (e) => { stop(e); go(v); },
    });
  };
  const n = nm.versions.length;
  const menuLabel = `alle versies (${n})`;
  // Eén versie: alleen de datum, niets te kiezen (geen menu, geen pijlen).
  if (n < 2) {
    box.appendChild(h('span', {
      class: 'vnav-date mono', title: 'versiedatum', text: versionNavDate(nm.shown),
    }));
    wrap.appendChild(box);
    return wrap;
  }
  box.appendChild(arrow(nm.older, true));
  const date = h('button', {
    type: 'button', class: 'vnav-date mono', title: menuLabel,
    'aria-label': `versie ${versionNavDate(nm.shown)} — ${menuLabel}`,
    'aria-haspopup': 'true', 'aria-expanded': 'false',
    text: versionNavDate(nm.shown),
  });
  box.appendChild(date);
  box.appendChild(arrow(nm.newer, false));
  wrap.appendChild(box);
  // Uitklapmenu met de volledige lijst (recent-first), lazy gevuld.
  const menu = h('div', { class: 'vnav-menu' });
  menu.hidden = true;
  let filled = false;
  let open = false;
  const setOpen = (v) => {
    open = v;
    menu.hidden = !v;
    date.setAttribute('aria-expanded', v ? 'true' : 'false');
  };
  date.addEventListener('click', (e) => {
    stop(e);
    if (!filled) {
      filled = true;
      const c = nm.container;
      const validity = (c.validFrom || c.validTo)
        ? ` · geldig ${compactDate(c.validFrom) || '…'} → ${compactDate(c.validTo) || '…'}` : '';
      menu.appendChild(h('div', { class: 'vnav-menu-head muted' }, [
        h('span', { text: menuLabel }), verkenBtn(c.iri),
      ]));
      menu.appendChild(h('div', { class: 'vnav-menu-sub muted', text: c.title + validity }));
      for (const v of [...nm.versions].reverse()) {
        const shown = v.iri === policyIri;
        menu.appendChild(h('button', {
          type: 'button', class: 'vnav-mi' + (shown ? ' shown' : ''),
          title: versionPeriod(v), 'aria-current': shown ? 'true' : null,
          onclick: (ev) => { stop(ev); setOpen(false); if (!shown) go(v); },
        }, [
          h('span', { class: 'vnav-mi-date mono', text: versionNavDate(v) }),
          // Neutrale enum als CSS-klasse; NL-woord alleen als weergavetekst (B17).
          h('span', { class: 'vchip ' + v.status, text: statusWord(v.status) }),
          h('span', { class: 'vnav-mi-title', text: v.title }),
        ]));
      }
    }
    setOpen(!open);
    if (open && typeof document.addEventListener === 'function') {
      document.addEventListener('click', () => setOpen(false), { once: true });
    }
  });
  wrap.appendChild(menu);
  return wrap;
}

// Generiek ODRL-beleid zonder aanbod/overeenkomst-rol (odrl:Set).
function setView(s) {
  const frag = document.createDocumentFragment();
  frag.appendChild(heading(s.title, 'Beleidsset', s.curie, s.anon ? null : s.iri, s.anon ? s.term : s.iri));
  if (s.description) frag.appendChild(h('p', {}, [longText(s.description)]));
  // Afnemer-veld op de set-kaart: policy-assignee, of anders die van de
  // eerste regel (BRP-patroon: odrl:assignee op de Permission).
  frag.appendChild(policyMeta({ ...s, assignee: policyAssignee(s) }));
  const sxp = extraPropsBlock(s.extraProps, false);
  if (sxp) frag.appendChild(sxp);
  const sinh = inheritSection(s);
  if (sinh) frag.appendChild(sinh);
  if (s.obligations && s.obligations.length) {
    frag.appendChild(h('h2', { text: 'Verplichtingen' }));
    frag.appendChild(dutyList(s.obligations, s.term, ODRL + 'obligation'));
  }
  frag.appendChild(h('h2', { text: 'Toestemmingen' }));
  // ownerAssignee = effectieve afnemer van de kaart hierboven, zodat de
  // regels hem niet dubbel tonen; owner blijft null (sets niet regel-bewerkbaar).
  frag.appendChild(permissionsSection(s.permissions, true, null, policyAssignee(s)));
  if (s.prohibitions && s.prohibitions.length) {
    frag.appendChild(h('h2', { text: 'Verboden' }));
    frag.appendChild(prohibitionsSection(s.prohibitions));
  }
  const v = versionBlock(s.version);
  if (v) frag.appendChild(v);
  return frag;
}

function agreementView(a) {
  const frag = document.createDocumentFragment();
  frag.appendChild(heading(a.title, 'Overeenkomst', a.curie, a.anon ? null : a.iri, a.anon ? a.term : a.iri));
  if (a.description) frag.appendChild(h('p', {}, [longText(a.description)]));
  frag.appendChild(policyMeta(a));
  const axp = extraPropsBlock(a.extraProps, false);
  if (axp) frag.appendChild(axp);
  if (state.editMode) frag.appendChild(policyEditSection(a, 'agreement'));
  if (a.offers && a.offers.length) {
    frag.appendChild(kv([['Vult aanbod in', spanJoin(a.offers.map((iri) => {
      const off = byIri(state.model.offers, iri);
      return off
        ? h('span', { class: 'linkish', text: off.title, onclick: () => selectNav({ id: off.iri, kind: 'offer' }) })
        : h('span', { class: 'mono muted', text: curie(iri) });
    }))]]));
  }
  // Het VERZOEK waaruit deze overeenkomst voortkwam (odrl:Request achter
  // prov:wasDerivedFrom): kenmerk · datum · indiener op één compacte regel,
  // met verken-knop naar de node. Zelfde bron als de doc-weergave
  // (a.requests uit parse.js).
  if (a.requests && a.requests.length) {
    frag.appendChild(kv([['Verzoek', spanJoin(a.requests.map((r) => {
      const bits = [r.identifier, dayDate(r.issued), r.requester && r.requester.label]
        .filter(Boolean);
      return h('span', {}, [
        bits.length ? bits.join(' · ') : (r.title || r.label || r.curie || r.iri),
        verkenBtn(r.iri),
      ]);
    }), '; ')]]));
  }
  const ainh = inheritSection(a);
  if (ainh) frag.appendChild(ainh);
  if (a.obligations.length) {
    frag.appendChild(h('h2', { text: 'Verplichtingen' }));
    frag.appendChild(dutyList(a.obligations, a.term, ODRL + 'obligation'));
  }
  // "Doelen" alleen als elke permission een purpose-refinement draagt;
  // generieke ODRL-permissions zonder doel heten "Toestemmingen".
  const allePurpose = a.permissions.length && a.permissions.every((p) => p.purpose);
  frag.appendChild(h('h2', { text: allePurpose ? 'Doelen' : 'Toestemmingen' }));
  frag.appendChild(permissionsSection(a.permissions, true, a));
  if (a.prohibitions && a.prohibitions.length) {
    frag.appendChild(h('h2', { text: 'Verboden' }));
    frag.appendChild(prohibitionsSection(a.prohibitions));
  }
  // Het gekoppelde aanbod staat al onder "Vult aanbod in" en het verzoek in
  // zijn eigen regel hierboven; toon ze niet nogmaals bij "Afgeleid van"
  // (daar blijft de grondslag/bron over). Drie soorten
  // wasDerivedFrom-doelwitten, drie weergaven — zie parse.js.
  const reqIris = new Set((a.requests || []).map((r) => r.iri));
  const v = versionBlock({
    ...a.version,
    derivedFrom: (a.version.derivedFrom || [])
      .filter((d) => !(a.offers || []).includes(d.iri) && !reqIris.has(d.iri)),
  });
  if (v) frag.appendChild(v);
  return frag;
}

function permissionFocusView(agr, idx) {
  const frag = document.createDocumentFragment();
  const p = agr.permissions[idx];
  const title = p.title || (p.purpose ? p.purpose.label : (p.action ? p.action.label : 'Toestemming'));
  frag.appendChild(heading(title, p.purpose ? 'Doel' : 'Toestemming', p.iri ? curie(p.iri) : agr.curie, null, p.iri || p.term));
  frag.appendChild(kv([['Binnen overeenkomst', h('span', {
    class: 'linkish', text: agr.title, onclick: () => selectNav({ id: agr.iri, kind: 'agreement' }),
  })], ['Afnemer', agr.assignee ? ref(agr.assignee) : null]]));
  const card = h('div', { class: 'card doel' });
  card.appendChild(permissionBody(p, agr));
  frag.appendChild(card);
  return frag;
}

function artifactView(a) {
  const frag = document.createDocumentFragment();
  const role = a.kind === 'bundle' ? 'Policy-bundel' : (a.typeLabel || 'Policy-artefact');
  frag.appendChild(heading(a.title, role, a.curie, null, a.iri));
  if (a.description) frag.appendChild(h('p', {}, [longText(a.description)]));

  const card = h('div', { class: 'card artifact' });
  card.appendChild(h('div', { class: 'card-title' }, [
    h('span', { class: 'badge artifact', text: role }),
    a.format ? h('span', { class: 'chip', text: a.format }) : '',
  ]));
  const pairs = [];
  if (a.entrypoint) pairs.push(['Entrypoint', h('span', { class: 'mono', text: a.entrypoint })]);
  if (a.sha256) pairs.push(['sha256', h('span', { class: 'hash', text: a.sha256 })]);
  if (a.downloadURL) pairs.push(['Download', externalLink(a.downloadURL, 'ophalen ↗')]);
  card.appendChild(kv(pairs));
  frag.appendChild(card);

  if (a.bundles && a.bundles.length) {
    frag.appendChild(h('h2', { text: 'Bevat artefacten' }));
    const ul = h('ul', { class: 'clean' });
    for (const b of a.bundles) {
      const target = byIri(state.model.artifacts, b.iri);
      ul.appendChild(h('li', {}, [target
        ? h('span', { class: 'linkish', text: target.title, onclick: () => selectNav({ id: target.iri, kind: 'artifact' }) })
        : h('span', { class: 'mono muted', text: b.curie })]));
    }
    frag.appendChild(ul);
  }

  // Waar wordt dit artefact door aangeroepen (conformsToPolicy)? Zelfde
  // onbegrensde terugverwijzings-vorm als "Overeenkomsten op dit aanbod":
  // boven de inline-drempel ingeklapt met telling + filter + chunks.
  const users = [];
  const seenUsers = new Set();
  for (const agr of state.model.agreements) {
    if (seenUsers.has(agr.iri)) continue;
    for (const p of agr.permissions) {
      if ([...p.constraints, ...(p.refinements || [])].some((c) => c.conformsTo === a.iri)) {
        users.push(agr);
        seenUsers.add(agr.iri);
        break;
      }
    }
  }
  if (users.length) {
    frag.appendChild(h('h2', { text: 'Aangeroepen door' }));
    const makeNode = (it) => h('span', {
      class: 'linkish', text: it.title,
      onclick: () => selectNav({ id: it.agr.iri, kind: 'agreement' }),
    });
    const items = users.map((u) => ({
      title: u.title, sub: u.assignee ? u.assignee.label : null, agr: u,
    }));
    if (!refListCollapsed(items.length)) {
      const ul = h('ul', { class: 'clean' });
      for (const it of items) ul.appendChild(h('li', {}, [makeNode(it)]));
      frag.appendChild(ul);
    } else {
      const n = items.length.toLocaleString('nl-NL');
      frag.appendChild(refListBlock({
        summaryText: state.sparqlEndpoint ? `${n} getoond` : `${n} overeenkomsten`,
        items, makeNode,
        filterLabel: 'Filter overeenkomsten op titel of afnemer',
      }));
    }
  }

  const v = versionBlock(a.version);
  if (v) frag.appendChild(v);
  return frag;
}

// --- Het ⌕: uitgang naar de generieke RDF-verkenner -------------------------
// Het bronpaneel rechts (Turtle | JSON-LD | ⌕ Verkennen, plus "Bron bewerken")
// is vervallen: deze pagina toont geen machineleesbare weergave meer. Het ⌕ op
// een node-achtig element is nu een LINK naar een generieke RDF-verkenner
// (Comunica, statisch meegeleverd in ../comunica/), met de bronnen van deze
// pagina als datasources en een query op de aangeklikte knoop — zie
// assets/verken.js. De volledige graaf blijft downloadbaar via de
// Turtle-/JSON-LD-knoppen in de topbalk.
//
// GEEN ⌕ ZONDER ADRES: een blanke knoop heeft buiten dit document geen IRI en
// is in een generieke verkenner niet aan te wijzen; de knop valt dan weg.
function verkenBtn(termOrIri) {
  if (!termOrIri) return null;
  const href = verkenHref(termOrIri, state, {
    base: COMUNICA_BASE,
    pageUrl: (typeof location !== 'undefined' && location.href) ? location.href : null,
  });
  return href ? verkenLink(href) : null;
}

// --- Export -----------------------------------------------------------------
function download(name, text, mime) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// --- Bewerken-modus in/uit ---------------------------------------------------
function setEditMode(onOff) {
  state.editMode = onOff;
  const b = el('btn-edit-toggle');
  if (b) {
    b.setAttribute('aria-pressed', String(onOff));
    b.classList.toggle('active', onOff);
  }
  if (state.selected) renderDoc(state.selected);
}

// --- Boot -------------------------------------------------------------------
const on = (id, ev, fn) => { const n = el(id); if (n) n.addEventListener(ev, fn); };
on('file-input', 'change', (e) => { if (e.target.files.length) loadFromFiles(e.target.files); });
on('reload-examples', 'click', loadFromExamples);
on('btn-edit-toggle', 'click', () => setEditMode(!state.editMode));
on('btn-new-policy', 'click', () => {
  if (!state.store) {
    const r = loadSources([]);
    state.store = r.store; state.model = r.model; state.nav = r.nav;
  }
  const { offerIri } = edit.createSkeleton(state.store);
  if (!state.editMode) setEditMode(true);
  rebuild(offerIri);
});
on('btn-export-ttl', 'click', () => {
  if (state.store) download('beleid.ttl', edit.exportTurtle(state.store), 'text/turtle');
});
on('btn-export-jsonld', 'click', () => {
  if (state.store) download('beleid.jsonld', edit.exportJsonLd(state.store), 'application/ld+json');
});

// ?sparql= zonder ?src/?ttl: het endpoint is dé bron — de navigatie komt uit
// de lijst-SELECT (skelet-graaf), het detail per policy wordt bij selectie
// bijgeladen met een CONSTRUCT (loadDetailAndSelect).
async function loadFromSparql() {
  const ep = state.sparqlEndpoint;
  setStatus('SPARQL-endpoint bevragen… ' + ep);
  try {
    if (state.policyScope) {
      const ttl = await sparqlConstruct(ep,
        policyDetailQuery(state.policyScope, { excludeGraphs: state.excludeGraphs }));
      state.detailLoaded.add(state.policyScope);
      ingest([{ name: ep + ' (policy-detail)', content: ttl, format: 'ttl', fromSparql: true }], '');
    } else {
      const rows = await sparqlSelect(ep, policyListQuery());
      ingest([{
        name: ep + ` (policylijst, ${rows.length.toLocaleString('nl-NL')} rijen)`,
        content: listSkeletonTurtle(rows), format: 'ttl', fromSparql: true,
      }], '');
    }
  } catch (e) {
    // Generieke melding (C6): omgevingsspecifieke aanwijzingen (zoals het
    // starten van een lokale Fuseki) staan in de README, niet in de UI.
    renderEmpty('SPARQL-endpoint niet bereikbaar of query mislukt: ' + ep
      + ' — ' + e.message + '. Controleer of het endpoint draait, de URL '
      + 'klopt en de server CORS toestaat.');
    setStatus('SPARQL-fout: ' + e.message);
  }
}

// URL-parameters (Swagger-UI-patroon: één generieke viewer, aangestuurd met
// een policy-verwijzing en zijn bronnen):
//   ?src=<url>     GENERIEKE bron (herhaalbaar): een RDF-bestand
//                  (Turtle/JSON-LD) óf een SPARQL-endpoint — het type wordt
//                  gedetecteerd (assets/source-detect.js; endpoint alleen op
//                  expliciete signalen: /sparql-pad of geslaagde ASK-probe)
//   ?ttl=<url>     legacy-alias van ?src, telt altijd als bestand
//   ?sparql=<url>  legacy-alias van ?src voor een endpoint
//   ?policy=<IRI>  beperk de weergave tot deze policy en selecteer hem;
//                  zonder bronnen wordt de IRI zelf als bron opgehaald
//   ?exclude-graph=<IRI>  (herhaalbaar) named graphs die detail-CONSTRUCTs
//                  uitsluiten; zonder deze parameter geldt de
//                  per-endpoint-config (assets/endpoint-config.js)
const params = new URLSearchParams(location.search);
const srcParams = params.getAll('src');
const legacyTtl = params.getAll('ttl');
const legacySparql = params.get('sparql');
state.policyScope = params.get('policy') || null;

async function bootFromParams() {
  // Eén detectieroute voor ?src= (bestand of endpoint); legacy-aliassen
  // worden zonder detectie op hun oude betekenis gemapt.
  const { data, endpoints, errors } = await partitionSources(srcParams);
  const dataSources = [...data];
  for (const u of legacyTtl) {
    try {
      const r = await fetch(u);
      if (!r.ok) throw new Error('HTTP ' + r.status + ' bij ' + u);
      const content = await r.text();
      dataSources.push({ name: u, url: u, content, format: detectFormat(u, content) });
    } catch (e) { errors.push({ url: u, message: e.message }); }
  }
  if (legacySparql) endpoints.push(legacySparql);
  state.sparqlEndpoint = endpoints[0] || null;
  state.excludeGraphs = excludeGraphsFor(state.sparqlEndpoint, params.getAll('exclude-graph'));
  if (state.sparqlEndpoint) extraNote = ' · SPARQL: ' + state.sparqlEndpoint;
  if (errors.length) {
    renderEmpty('Kon bron(nen) niet laden: ' + errors.map((e) => e.message).join('; '));
    if (!dataSources.length && !state.sparqlEndpoint) return;
  }
  if (dataSources.length) ingest(dataSources, '');
  else if (state.sparqlEndpoint) loadFromSparql();
}

if (srcParams.length || legacyTtl.length || legacySparql) {
  bootFromParams().catch((e) => renderEmpty('Kon ?src niet laden: ' + e.message));
} else if (state.policyScope) {
  fetch(state.policyScope)
    .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
    .then((content) => ingest([{
      name: state.policyScope, url: state.policyScope, content,
      format: detectFormat(state.policyScope, content),
    }], ''))
    .catch((e) => renderEmpty(
      'Kon de policy niet ophalen van ?policy=' + state.policyScope + ' (' + e.message + '). ' +
      'Geef de bron(nen) expliciet mee: ?policy=<policy-IRI>&src=<url> (herhaalbaar), ' +
      'bijvoorbeeld de policyset plus registerfragmenten met labels.'));
} else {
  loadFromExamples();
}
