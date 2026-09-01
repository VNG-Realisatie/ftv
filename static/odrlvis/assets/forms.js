// ODRL-viewer — GENERIEKE, SHAPE-GEDREVEN FORMULIEREN ("domain forms").
//
// Een policy wijst naar knopen die een generieke tool niet kent: het artefact
// achter een realisatielink, een veldencollectie, een register. Labels
// (Visualisation Note §1) geven zo'n knoop een naam; een FORMULIERSHAPE zegt
// hoe zijn eigenschappen getoond horen te worden. Zie note §8 "Domain forms".
//
// Dit bestand leest zo'n shape en levert een WEERGAVEMODEL — geen DOM. De
// scheiding is met opzet: het model is in node te testen zonder DOM-stub, en
// doc.js beslist hoe een rij eruitziet (kv-blok, link met target=_blank,
// monospace). Alles wat presentatie is, staat dus NIET hier.
//
// SUBSET (precies wat de note §8 vastlegt):
//   SHACL   sh:NodeShape + sh:targetClass (met rdfs:subClassOf-sluiting),
//           sh:property met sh:path (ook [ sh:inversePath … ]), sh:name,
//           sh:description, sh:order, sh:group + sh:PropertyGroup
//   DASH    dash:viewer   {Literal,URI,Label,LangString}Viewer
//           dash:propertyRole {Label,Description,KeyInfo}Role
//   SHUI    dezelfde termen uit de W3C-draft SHACL 1.2 UI worden als SYNONIEM
//           gelezen (shui:viewer/shui:propertyRole; shui:IRIViewer ==
//           dash:URIViewer). Annoteren doen we in dash:, want dat werkt vandaag.
//
// Wat NIET in de subset zit is geen gebrek maar presentatie: kleuren,
// monospace, hoe een noot wordt omkaderd. sh:pattern staat in een shape als
// validatiegegeven; een tool MAG hem lezen als "deze waarde heeft een
// machinesyntaxis" — dat doet doc.js, en het is een tool-keuze, geen
// vocabulaireterm.
//
// VOLGORDE (SHUI §Grouping): groepen en ongegroepeerde properties staan in ÉÉN
// reeks, gesorteerd op sh:order; een groep neemt de sh:order van haar
// sh:PropertyGroup. Zonder order: achteraan, in bronvolgorde.

import * as N3 from '../vendor/n3.esm.min.js';
import { pickLabel } from './i18n.js';
import { labelFor, localName, descriptionFor } from './parse.js';

const { DataFactory, Store, Parser } = N3;
const { namedNode } = DataFactory;

const SH = 'http://www.w3.org/ns/shacl#';
const DASH = 'http://datashapes.org/dash#';
const SHUI = 'http://www.w3.org/ns/shacl-ui/';
const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const RDFS = 'http://www.w3.org/2000/01/rdf-schema#';

// --- Kleine graaf-helpers ---------------------------------------------------
const objs = (store, s, p) => store.getQuads(s, namedNode(p), null, null).map((q) => q.object);
const obj = (store, s, p) => objs(store, s, p)[0] || null;
const isLiteral = (term) => !!term && term.termType === 'Literal';

// dash: en shui: zijn uitwisselbaar; shui:IRIViewer heet bij DASH URIViewer.
function annotation(store, node, pred) {
  const v = obj(store, node, DASH + pred) || obj(store, node, SHUI + pred);
  if (!v || v.termType !== 'NamedNode') return null;
  return localName(v.value).replace(/^IRIViewer$/, 'URIViewer');
}

// --- Het shapes-model -------------------------------------------------------

// Eén sh:property. `path` is null wanneer het pad iets is dat deze subset niet
// kent (een sequence path bijvoorbeeld) — zo'n property wordt overgeslagen in
// plaats van half getoond.
function readPropertyShape(store, node) {
  const pathTerm = obj(store, node, SH + 'path');
  let path = null;
  let inverse = false;
  if (pathTerm && pathTerm.termType === 'NamedNode') {
    path = pathTerm.value;
  } else if (pathTerm) {
    const inv = obj(store, pathTerm, SH + 'inversePath');
    if (inv && inv.termType === 'NamedNode') { path = inv.value; inverse = true; }
  }
  const orderTerm = obj(store, node, SH + 'order');
  const order = orderTerm && Number.isFinite(parseFloat(orderTerm.value))
    ? parseFloat(orderTerm.value) : null;
  const groupTerm = obj(store, node, SH + 'group');
  return {
    path,
    inverse,
    names: objs(store, node, SH + 'name').filter(isLiteral),
    descriptions: objs(store, node, SH + 'description').filter(isLiteral),
    order,
    group: groupTerm && groupTerm.termType === 'NamedNode' ? groupTerm.value : null,
    // sh:pattern is een validatiegegeven; de weergave mag het als aanwijzing
    // gebruiken (zie de kop van dit bestand).
    pattern: (obj(store, node, SH + 'pattern') || {}).value || null,
    viewer: annotation(store, node, 'viewer'),
    role: annotation(store, node, 'propertyRole'),
  };
}

// Alle sh:NodeShapes met een sh:targetClass uit een graaf.
export function readShapes(store) {
  const seen = new Set();
  const out = [];
  for (const q of store.getQuads(null, namedNode(RDF + 'type'), namedNode(SH + 'NodeShape'), null)) {
    const iri = q.subject.value;
    if (seen.has(iri)) continue;
    seen.add(iri);
    const target = obj(store, q.subject, SH + 'targetClass');
    if (!target || target.termType !== 'NamedNode') continue;
    out.push({
      iri,
      store,
      targetClass: target.value,
      properties: objs(store, q.subject, SH + 'property').map((n) => readPropertyShape(store, n)),
    });
  }
  return out;
}

// --- Doelklasse-matching ----------------------------------------------------
// Zelfde patroon als policyKinds in parse.js: een fixpunt over rdfs:subClassOf
// in de GEGEVENSgraaf, zodat een profiel zijn subklassen als data kan meebrengen
// (apnl:RegoModule rdfs:subClassOf apnl:PolicyArtifact).
function subclassClosure(dataStore, cls) {
  const seen = new Set([cls]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const q of dataStore.getQuads(null, namedNode(RDFS + 'subClassOf'), null, null)) {
      if (seen.has(q.object.value) && !seen.has(q.subject.value)) {
        seen.add(q.subject.value);
        changed = true;
      }
    }
  }
  return seen;
}

// De shape die bij deze knoop hoort, of null. Een shape uit `shapes` WINT van
// een gelijke uit `fallbacks` (zelfde sh:targetClass): een bron die haar eigen
// formulier meebrengt, bepaalt hoe het eruitziet. Bij meer dan één passende
// shape wint de meest SPECIFIEKE doelklasse — die het minst ver van de knoop
// af staat in de subklasse-hiërarchie — en anders de eerst gevonden.
export function shapeForNode(dataStore, termOrIri, shapes, fallbacks = []) {
  const term = typeof termOrIri === 'string' ? namedNode(termOrIri) : termOrIri;
  const types = new Set(objs(dataStore, term, RDF + 'type')
    .filter((o) => o.termType === 'NamedNode').map((o) => o.value));
  if (!types.size) return null;
  const kandidaten = [];
  const overridden = new Set();
  for (const s of shapes) overridden.add(s.targetClass);
  for (const s of [...shapes, ...fallbacks.filter((f) => !overridden.has(f.targetClass))]) {
    if (types.has(s.targetClass)) { kandidaten.push([0, s]); continue; }
    const closure = subclassClosure(dataStore, s.targetClass);
    if ([...types].some((ty) => closure.has(ty))) kandidaten.push([1, s]);
  }
  if (!kandidaten.length) return null;
  kandidaten.sort((a, b) => a[0] - b[0]);
  return kandidaten[0][1];
}

// --- Waarden ophalen --------------------------------------------------------
function valuesFor(dataStore, term, ps) {
  if (!ps.path) return [];
  return ps.inverse
    ? dataStore.getQuads(null, namedNode(ps.path), term, null).map((q) => q.subject)
    : dataStore.getQuads(term, namedNode(ps.path), null, null).map((q) => q.object);
}

// Het label van een veld: sh:name in de actieve taal, anders het label van het
// predicaat zelf (SHUI §Label Resolution), anders de localName.
function propLabel(dataStore, ps) {
  const named = pickLabel(ps.names);
  if (named) return named;
  if (ps.path) return labelFor(dataStore, namedNode(ps.path));
  return '';
}

// De UITLEG bij een veld — spiegelbeeld van propLabel. sh:description is de
// uitleg die de SHAPE geeft: zij is voor dít formulier geschreven en gaat dus
// vóór de algemene definitie van het pad-predicaat (note §1). Ontbreekt zij,
// dan valt de rij terug op wat het vocabulaire over het predicaat zegt —
// dezelfde route als de label-resolutie hierboven.
function propDescription(dataStore, ps) {
  return pickLabel(ps.descriptions)
    || (ps.path ? descriptionFor(dataStore, namedNode(ps.path)) : '')
    || null;
}

// Wijst deze IRI BUITEN het geladen corpus? Dat is de vraag of de knoop hier
// beschreven wordt: staat hij als SUBJECT in de store, dan leeft hij in de
// data en heeft de weergave er zelf al een plek voor. Staat hij er niet, dan is
// de IRI alles wat we van hem hebben en mag hij als verwijzing naar buiten
// gelezen worden.
//
// Deze vraag hoort HIER en niet in de weergave: het is een uitspraak over de
// GRAAF, geen presentatiekeuze. Wat de weergave er vervolgens mee doet — er een
// anker van maken, en alleen voor schema's die een browser kan volgen — blijft
// aan doc.js.
function pointsOutside(dataStore, term) {
  if (!term || term.termType !== 'NamedNode') return false;
  return dataStore.countQuads(term, null, null, null) === 0;
}

// Eén waarde als weergave-item. `kind` zegt hoe doc.js hem tekent:
//   text  — letterlijk (dash:LiteralViewer)
//   link  — de IRI zelf, als link (dash:URIViewer / shui:IRIViewer)
//   label — het label van de doelknoop (dash:LabelViewer), met de IRI erbij
//           zodat een weergave er desgewenst naartoe kan springen
//
// LABEL ALS HYPERLINK. DASH omschrijft dash:LabelViewer als "a hyperlink to
// that URI based on the display label of the resource" — linktekst het label,
// bestemming de IRI. Dat geldt alléén voor een knoop die hier niet beschreven
// wordt: interne IRI's staan in deze viewer nergens als naakte link, want
// daarvoor is de weergave zelf de plek. Het item draagt daarom `external`; de
// tekst blijft in beide gevallen het label.
function valueItem(dataStore, term, ps) {
  const labelItem = () => ({
    kind: 'label',
    text: labelFor(dataStore, term),
    iri: term.termType === 'NamedNode' ? term.value : null,
    external: pointsOutside(dataStore, term),
  });
  switch (ps.viewer) {
    case 'URIViewer':
    case 'HyperlinkViewer':
      return { kind: 'link', text: term.value, iri: term.termType === 'NamedNode' ? term.value : null };
    case 'LabelViewer':
      return labelItem();
    case 'LiteralViewer':
      return { kind: 'text', text: term.value, iri: null };
    default:
      // Geen widget aangewezen: een IRI leest als label, een literal letterlijk.
      return term.termType === 'NamedNode'
        ? labelItem()
        : { kind: 'text', text: term.value, iri: null };
  }
}

// De waarden van één property, al gekozen en al ontdubbeld.
//
// TAALRESOLUTIE (SHUI §Label and Language Resolution, en het taalregime dat de
// rest van deze viewer al aanhoudt): meerdere literals met een taalmarkering
// zijn vertalingen van elkaar, geen aparte waarden — er blijft er ÉÉN over, die
// het best bij de voorkeurstaal past (met terugval op de andere taal). Literals
// zonder taalmarkering en IRI's blijven allemaal staan. dash:LangStringViewer
// zegt dit expliciet; zonder die widget geldt hetzelfde, want twee talen naast
// elkaar tonen is nooit de bedoeling.
function itemsFor(dataStore, term, ps) {
  const values = valuesFor(dataStore, term, ps);
  if (!values.length) return [];
  const getagd = values.filter((v) => isLiteral(v) && v.language);
  if (getagd.length) {
    const one = pickLabel(getagd);
    const rest = values.filter((v) => !(isLiteral(v) && v.language));
    return [
      ...(one ? [{ kind: 'text', text: one, iri: null }] : []),
      ...rest.map((v) => valueItem(dataStore, v, ps)),
    ];
  }
  if (ps.viewer === 'LangStringViewer') {
    const one = pickLabel(values.filter(isLiteral));
    return one ? [{ kind: 'text', text: one, iri: null }] : [];
  }
  const out = [];
  const seen = new Set();
  for (const v of values) {
    const item = valueItem(dataStore, v, ps);
    const key = item.kind + '\u0000' + item.text;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

// --- Het formuliermodel -----------------------------------------------------
//
// { title, keyInfo: [item], description, blocks: [ group | row ] }
//   group = { kind: 'group', label, rows: [row] }
//   row   = { kind: 'row', label, description, pattern, viewer, values: [item] }
//
// Lege properties komen er niet in: een viewer laat weg wat niet in de data
// staat (net als het handgeschreven formulier deed). Een groep zonder gevulde
// rijen verdwijnt in haar geheel.
export function formModel(dataStore, termOrIri, shape) {
  const term = typeof termOrIri === 'string' ? namedNode(termOrIri) : termOrIri;
  const roleItems = (role) => shape.properties
    .filter((ps) => ps.role === role)
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
    .map((ps) => itemsFor(dataStore, term, ps))
    .find((items) => items.length) || [];

  const titleItems = roleItems('LabelRole');
  const descItems = roleItems('DescriptionRole');

  const shapeStore = shape.store || dataStore;
  const groups = new Map();
  const seq = [];
  for (const ps of shape.properties) {
    if (ps.role === 'LabelRole' || ps.role === 'DescriptionRole' || ps.role === 'KeyInfoRole') continue;
    if (!ps.path) continue;
    const row = {
      kind: 'row',
      label: propLabel(dataStore, ps),
      description: propDescription(dataStore, ps),
      pattern: ps.pattern,
      viewer: ps.viewer,
      values: itemsFor(dataStore, term, ps),
      order: ps.order,
    };
    if (ps.group) {
      let g = groups.get(ps.group);
      if (!g) {
        const gOrder = obj(shapeStore, namedNode(ps.group), SH + 'order');
        g = {
          kind: 'group',
          label: labelFor(shapeStore, namedNode(ps.group)),
          rows: [],
          order: gOrder && Number.isFinite(parseFloat(gOrder.value)) ? parseFloat(gOrder.value) : null,
        };
        groups.set(ps.group, g);
        seq.push(g);
      }
      g.rows.push(row);
    } else {
      seq.push(row);
    }
  }
  // Stabiel sorteren op order; zonder order achteraan, in bronvolgorde.
  const byOrder = (list) => list
    .map((x, i) => [x, i])
    .sort((a, b) => ((a[0].order ?? Infinity) - (b[0].order ?? Infinity)) || (a[1] - b[1]))
    .map(([x]) => x);
  for (const g of groups.values()) g.rows = byOrder(g.rows).filter((r) => r.values.length);
  const blocks = byOrder(seq)
    .filter((b) => (b.kind === 'group' ? b.rows.length : b.values.length));

  return {
    shape: shape.iri,
    title: titleItems.length ? titleItems[0].text : labelFor(dataStore, term),
    keyInfo: roleItems('KeyInfoRole'),
    description: descItems.length ? descItems[0].text : null,
    blocks,
  };
}

// --- De meegeleverde shapes -------------------------------------------------
// Eén keer parsen, daarna hergebruiken. Zelfde rol als de meegeleverde
// ODRL-labelbundel: er is altijd een formulier, ook als geen enkele bron er een
// meebrengt — en een shape uit de data wint (zie shapeForNode).
let builtinCache = null;
export function builtinShapes(ttlSources) {
  if (builtinCache) return builtinCache;
  const store = new Store();
  for (const ttl of ttlSources) {
    store.addQuads(new Parser().parse(ttl));
  }
  builtinCache = readShapes(store);
  return builtinCache;
}
