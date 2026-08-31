// ODRL-AP-NL viewer — edit- & generatiemodule (ESM, DOM-vrij, node-testbaar).
//
// Verantwoordelijkheden (laag 1 + laag 3 uit notes/analyse-schema-gedreven-editors.md):
//   1. Structuurbewerkingen op de drietraps: Offer/Agreement/Permission/Duty
//      toevoegen, dupliceren, verwijderen; velden (literals/IRI's) zetten.
//   2. Skelet-generatie: leeg drietraps-skelet (Offer + Agreement + Permission)
//      met verplichte basiselementen en profieldeclaratie voorgevuld.
//   3. Raw-RDF-vangnet: een subject-sluiting (zoals het bronpaneel toont) als
//      Turtle terug de graaf in mergen, round-trip-veilig.
//   4. Export van de volledige graaf als Turtle en JSON-LD.
//   5. termOptions: dropdown-vulling uit de geladen graaf (bekende odrl/apnl-
//      termen + alles met rdfs:label).
//
// Alle functies muteren de meegegeven N3.Store; wijzigingsbeheer (dirty-vlag,
// her-renderen) is aan de UI-laag (app.js).

import * as N3 from '../vendor/n3.esm.min.js';
import {
  PREFIXES, allPrefixes, prefixNamespace, curie, labelFor, prunePrefixes,
  subjectJsonLdBody, jsonLdContext, targetPredicates, PROFILE_PATTERNS,
} from './parse.js';

const { DataFactory, Parser, Store } = N3;
const { namedNode, blankNode, literal } = DataFactory;

const RDF = PREFIXES.rdf;
const RDFS = PREFIXES.rdfs;
const ODRL = PREFIXES.odrl;
const APNL = PREFIXES.apnl;
const DCT = PREFIXES.dct;
const DCAT = PREFIXES.dcat;
const XSD = PREFIXES.xsd;

// Default-profieldeclaratie voor nieuw gegenereerd beleid (B14): de editor is
// bewust een AP-NL-editor en stempelt skeletten met dit profiel. Wie de
// editor voor een ander profiel inzet, past alléén deze constante aan (of
// leidt hem t.z.t. af uit de geladen profiel-ontologie).
export const DEFAULT_PROFILE = APNL + 'profiel';

const nn = (iri) => (typeof iri === 'string' ? namedNode(iri) : iri);

function objsOf(store, s, p) {
  return store.getQuads(s, namedNode(p), null, null).map((q) => q.object);
}
function objOf(store, s, p) {
  const o = objsOf(store, s, p);
  return o.length ? o[0] : null;
}

// --- Sluitingen -------------------------------------------------------------

// Alle quads van `start` plus de transitieve sluiting over blank nodes
// (zelfde wandeling als subjectTurtle in parse.js).
export function closureQuads(store, start) {
  const collected = [];
  const seen = new Set();
  const stack = [nn(start)];
  while (stack.length) {
    const s = stack.pop();
    const key = s.termType + ':' + s.value;
    if (seen.has(key)) continue;
    seen.add(key);
    for (const q of store.getQuads(s, null, null, null)) {
      collected.push(q);
      if (q.object.termType === 'BlankNode') stack.push(q.object);
    }
  }
  return collected;
}

// --- IRI-hulpjes ------------------------------------------------------------

// Expandeer gebruikersinvoer: "odrl:read" -> volle IRI via bekende prefixes;
// volle IRI's/urn's blijven ongemoeid.
export function expandIri(text) {
  if (typeof text !== 'string') return text;
  const t = text.trim();
  if (!t) return '';
  if (/^https?:\/\//.test(t) || t.startsWith('urn:')) return t;
  const m = t.match(/^([\w-]+):(.*)$/);
  if (m) {
    const ns = prefixNamespace(m[1]); // statisch én brongedreven (bv. brp:)
    if (ns) return ns + m[2];
  }
  return t;
}

// Vind een nog niet gebruikte IRI op basis van baseIri (suffix -2, -3, ...).
export function mintIri(store, baseIri) {
  let iri = baseIri;
  let i = 2;
  while (store.getQuads(namedNode(iri), null, null, null).length
      || store.getQuads(null, null, namedNode(iri), null).length) {
    iri = baseIri + '-' + i++;
  }
  return iri;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

// --- Veldbewerkingen --------------------------------------------------------

export function removeProp(store, subject, predIri) {
  store.removeQuads(store.getQuads(nn(subject), namedNode(predIri), null, null));
}

// Vervang alle waarden van (subject, pred) door één literal; lege waarde = weg.
export function setLiteral(store, subject, predIri, value, opts = {}) {
  removeProp(store, subject, predIri);
  if (value == null || value === '') return;
  const lit = opts.datatype ? literal(String(value), namedNode(opts.datatype))
    : (opts.lang ? literal(String(value), opts.lang) : literal(String(value)));
  store.addQuad(nn(subject), namedNode(predIri), lit);
}

// Vervang alle waarden van (subject, pred) door één IRI; lege waarde = weg.
export function setIri(store, subject, predIri, iri) {
  removeProp(store, subject, predIri);
  const full = expandIri(iri);
  if (!full) return;
  store.addQuad(nn(subject), namedNode(predIri), namedNode(full));
}

// --- Constraint-/refinement-bewerkingen -------------------------------------

// Zet de drie delen van een constraint. right: {value, kind:'iri'|'literal',
// lang?, datatype?}. Laat odrl:rightOperandReference met rust.
export function setConstraint(store, cTerm, { left, operator, right } = {}) {
  if (left !== undefined) setIri(store, cTerm, ODRL + 'leftOperand', left);
  if (operator !== undefined) setIri(store, cTerm, ODRL + 'operator', operator);
  if (right !== undefined) {
    removeProp(store, cTerm, ODRL + 'rightOperand');
    if (right && right.value !== '' && right.value != null) {
      if (right.kind === 'iri') {
        store.addQuad(nn(cTerm), namedNode(ODRL + 'rightOperand'), namedNode(expandIri(right.value)));
      } else {
        const lit = right.datatype ? literal(String(right.value), namedNode(right.datatype))
          : (right.lang ? literal(String(right.value), right.lang) : literal(String(right.value)));
        store.addQuad(nn(cTerm), namedNode(ODRL + 'rightOperand'), lit);
      }
    }
  }
}

// Nieuwe constraint (of refinement) aan een rule hangen; voorgevuld met een
// neutrale tijdvoorwaarde zodat het formulier iets heeft om te tonen.
export function addConstraint(store, ruleTerm, predIri = ODRL + 'constraint') {
  const c = blankNode();
  store.addQuad(c, namedNode(RDF + 'type'), namedNode(ODRL + 'Constraint'));
  store.addQuad(c, namedNode(ODRL + 'leftOperand'), namedNode(ODRL + 'dateTime'));
  store.addQuad(c, namedNode(ODRL + 'operator'), namedNode(ODRL + 'lteq'));
  store.addQuad(c, namedNode(ODRL + 'rightOperand'), literal(today(), namedNode(XSD + 'date')));
  store.addQuad(nn(ruleTerm), namedNode(predIri), c);
  return c;
}

// Vind (of maak) de action-node van een permission en geef die terug als node
// waaraan refinements gehangen kunnen worden (rdf:value-vorm).
function ensureActionNode(store, permTerm) {
  const p = nn(permTerm);
  let action = objOf(store, p, ODRL + 'action');
  if (!action) {
    action = blankNode();
    store.addQuad(action, namedNode(RDF + 'value'), namedNode(ODRL + 'read'));
    store.addQuad(p, namedNode(ODRL + 'action'), action);
    return action;
  }
  const hasValue = objOf(store, action, RDF + 'value');
  const ownQuads = store.getQuads(action, null, null, null).length;
  if (action.termType === 'NamedNode' && !hasValue && ownQuads === 0) {
    // Directe actie-IRI: herstructureer naar [ rdf:value <actie> ] zodat er
    // een refinement aan kan.
    store.removeQuads(store.getQuads(p, namedNode(ODRL + 'action'), action, null));
    const node = blankNode();
    store.addQuad(node, namedNode(RDF + 'value'), action);
    store.addQuad(p, namedNode(ODRL + 'action'), node);
    return node;
  }
  return action;
}

// Zet (of verwijder) de doelbindings-refinement (odrl:purpose) van een permission.
export function setPurpose(store, permTerm, { purpose, operator = ODRL + 'eq' } = {}) {
  const p = nn(permTerm);
  const action = objOf(store, p, ODRL + 'action');
  // Bestaande purpose-refinement zoeken.
  let existing = null;
  if (action) {
    for (const r of objsOf(store, action, ODRL + 'refinement')) {
      const left = objOf(store, r, ODRL + 'leftOperand');
      if (left && left.value === ODRL + 'purpose') { existing = r; break; }
    }
  }
  const full = expandIri(purpose);
  if (!full) {
    if (existing && action) {
      store.removeQuads(store.getQuads(action, namedNode(ODRL + 'refinement'), existing, null));
      if (existing.termType === 'BlankNode') store.removeQuads(closureQuads(store, existing));
    }
    return null;
  }
  const actionNode = ensureActionNode(store, p);
  let c = existing;
  if (!c) {
    c = blankNode();
    store.addQuad(c, namedNode(RDF + 'type'), namedNode(ODRL + 'Constraint'));
    store.addQuad(c, namedNode(ODRL + 'leftOperand'), namedNode(ODRL + 'purpose'));
    store.addQuad(actionNode, namedNode(ODRL + 'refinement'), c);
  }
  setIri(store, c, ODRL + 'operator', operator);
  setIri(store, c, ODRL + 'rightOperand', full);
  return c;
}

// Zet de actie van een permission (behoudt een eventuele rdf:value-structuur
// met refinements).
export function setAction(store, permTerm, actionIri) {
  const p = nn(permTerm);
  const full = expandIri(actionIri);
  if (!full) return;
  const action = objOf(store, p, ODRL + 'action');
  if (action && objOf(store, action, RDF + 'value')) {
    removeProp(store, action, RDF + 'value');
    store.addQuad(action, namedNode(RDF + 'value'), namedNode(full));
  } else {
    removeProp(store, p, ODRL + 'action');
    store.addQuad(p, namedNode(ODRL + 'action'), namedNode(full));
  }
}

// --- Targets ----------------------------------------------------------------

// Target-predicaten uitsluitend data-gedreven (C4): odrl:target plus alles
// wat de geladen graaf als rdfs:subPropertyOf odrl:target declareert —
// dezelfde afleiding als parse.js (bv. brp:verzochteRubriek uit het
// registerfragment examples/labels-brp.ttl).
const targetPreds = targetPredicates;

export function addTarget(store, permTerm, iri) {
  const full = expandIri(iri);
  if (!full) return;
  store.addQuad(nn(permTerm), namedNode(ODRL + 'target'), namedNode(full));
}

export function removeTarget(store, permTerm, iri) {
  const full = expandIri(iri);
  for (const pred of targetPreds(store)) {
    store.removeQuads(store.getQuads(nn(permTerm), namedNode(pred), namedNode(full), null));
  }
}

// --- Structuurbewerkingen ---------------------------------------------------

// Nieuwe (doel-)permission aan een policy hangen.
export function addPermission(store, policyTerm, opts = {}) {
  const p = blankNode();
  store.addQuad(p, namedNode(RDF + 'type'), namedNode(ODRL + 'Permission'));
  store.addQuad(nn(policyTerm), namedNode(ODRL + 'permission'), p);
  if (opts.withPurpose !== false) {
    let doel = opts.purposeIri;
    if (!doel) {
      const base = nn(policyTerm).termType === 'NamedNode'
        ? nn(policyTerm).value.replace(/[#/][^#/]*$/, '/') : 'https://beleid.example.gov.nl/nieuw/';
      doel = mintIri(store, base + 'doel-nieuw');
      store.addQuad(namedNode(doel), namedNode(RDFS + 'label'), literal('(vul doel in)', 'nl'));
    }
    setPurpose(store, p, { purpose: doel, operator: ODRL + 'eq' });
  } else {
    store.addQuad(p, namedNode(ODRL + 'action'), namedNode(ODRL + 'read'));
  }
  if (opts.targetIri) addTarget(store, p, opts.targetIri);
  return p;
}

// Nieuwe duty/obligation aan een policy of permission hangen.
export function addDuty(store, parentTerm, predIri = ODRL + 'obligation') {
  const d = blankNode();
  const a = blankNode();
  store.addQuad(d, namedNode(RDF + 'type'), namedNode(ODRL + 'Duty'));
  store.addQuad(d, namedNode(RDFS + 'label'), literal('Nieuwe verplichting', 'nl'));
  store.addQuad(a, namedNode(RDF + 'value'), namedNode(ODRL + 'inform'));
  store.addQuad(d, namedNode(ODRL + 'action'), a);
  store.addQuad(nn(parentTerm), namedNode(predIri), d);
  return d;
}

// Nieuwe Agreement op een bestaand Offer (assigner en target overgenomen).
export function addAgreement(store, offerTerm, opts = {}) {
  const offer = nn(offerTerm);
  const base = offer.value.replace(/[#/][^#/]*$/, '/');
  const iri = mintIri(store, base + 'overeenkomst-nieuw');
  const agr = namedNode(iri);
  store.addQuad(agr, namedNode(RDF + 'type'), namedNode(ODRL + 'Agreement'));
  store.addQuad(agr, namedNode(DCT + 'title'), literal(opts.title || 'Nieuwe overeenkomst', 'nl'));
  store.addQuad(agr, namedNode(DCT + 'description'), literal('Beschrijf hier de overeenkomst (afnemer, doelen, herleiding).', 'nl'));
  store.addQuad(agr, namedNode(DCT + 'issued'), literal(today(), namedNode(XSD + 'date')));
  store.addQuad(agr, namedNode(ODRL + 'profile'), namedNode(DEFAULT_PROFILE));
  store.addQuad(agr, namedNode(ODRL + 'uid'), agr);
  // Koppeling aan het Offer via de standaardrelatie uit PROFILE_PATTERNS:
  // prov:wasDerivedFrom (MOET; niveau-2-shape). Eén predicaat — het eerdere
  // duplicaat dct:references naar hetzelfde aanbod wordt niet meer geschreven.
  for (const pred of PROFILE_PATTERNS.agreementOfferPreds) {
    store.addQuad(agr, namedNode(pred), offer);
  }
  const assigner = objOf(store, offer, ODRL + 'assigner');
  if (assigner) store.addQuad(agr, namedNode(ODRL + 'assigner'), assigner);
  const afnemer = mintIri(store, base + 'afnemer-nieuw');
  store.addQuad(namedNode(afnemer), namedNode(RDFS + 'label'), literal('(vul afnemer in)', 'nl'));
  store.addQuad(agr, namedNode(ODRL + 'assignee'), namedNode(afnemer));
  // Target van de eerste offer-permission overnemen als die er is.
  let targetIri = null;
  const firstPerm = objOf(store, offer, ODRL + 'permission');
  if (firstPerm) {
    const t = objOf(store, firstPerm, ODRL + 'target');
    if (t && t.termType === 'NamedNode') targetIri = t.value;
  }
  addPermission(store, agr, { withPurpose: true, targetIri });
  return iri;
}

// Zet de Offer-koppeling van een Agreement (prov:wasDerivedFrom). Dat predicaat
// draagt ook ándere verwijzingen (wettelijke grondslag, documenten); daarom
// worden alleen bestaande waarden verwijderd die een bekend Offer zijn
// (knownOfferIris: iterable van Offer-IRI's). Lege offerIri = koppeling
// weghalen. Bij het opruimen loopt óók het historische duplicaat
// dct:references mee (legacyAgreementOfferPreds): bestanden van vóór de
// schoning dragen het nog, en een omgehangen koppeling mag geen wees achterlaten.
export function setAgreementOffer(store, agrTerm, offerIri, knownOfferIris) {
  const known = knownOfferIris instanceof Set ? knownOfferIris : new Set(knownOfferIris || []);
  const opruimen = [...PROFILE_PATTERNS.agreementOfferPreds,
    ...PROFILE_PATTERNS.legacyAgreementOfferPreds];
  for (const pred of opruimen) {
    for (const q of store.getQuads(nn(agrTerm), namedNode(pred), null, null)) {
      if (q.object.termType === 'NamedNode' && known.has(q.object.value)) store.removeQuad(q);
    }
  }
  const full = expandIri(offerIri);
  if (!full) return;
  for (const pred of PROFILE_PATTERNS.agreementOfferPreds) {
    store.addQuad(nn(agrTerm), namedNode(pred), namedNode(full));
  }
}

// Leeg drietraps-skelet: Offer + Agreement + Permission met verplichte
// basiselementen en profieldeclaratie voorgevuld.
export function createSkeleton(store, base = 'https://beleid.example.gov.nl/nieuw/') {
  const offerIri = mintIri(store, base + 'aanbod');
  const offer = namedNode(offerIri);
  const aanbieder = mintIri(store, base + 'aanbieder');
  const bron = mintIri(store, base + 'gegevensbron');
  store.addQuad(namedNode(aanbieder), namedNode(RDFS + 'label'), literal('(vul aanbieder in)', 'nl'));
  store.addQuad(namedNode(bron), namedNode(RDFS + 'label'), literal('(vul gegevensbron in)', 'nl'));

  store.addQuad(offer, namedNode(RDF + 'type'), namedNode(ODRL + 'Offer'));
  store.addQuad(offer, namedNode(DCT + 'title'), literal('Nieuw aanbod', 'nl'));
  store.addQuad(offer, namedNode(DCT + 'description'), literal('Beschrijf hier het aanbod (welke gegevens, aan wie, onder welke standaardvoorwaarden).', 'nl'));
  store.addQuad(offer, namedNode(DCT + 'issued'), literal(today(), namedNode(XSD + 'date')));
  store.addQuad(offer, namedNode(ODRL + 'profile'), namedNode(DEFAULT_PROFILE));
  store.addQuad(offer, namedNode(ODRL + 'uid'), offer);
  store.addQuad(offer, namedNode(ODRL + 'assigner'), namedNode(aanbieder));
  addPermission(store, offer, { withPurpose: false, targetIri: bron });

  const agreementIri = addAgreement(store, offer);
  return { offerIri, agreementIri };
}

// Dupliceer een benoemde policy (Offer/Agreement): sluiting kopiëren met verse
// blank nodes, zelfverwijzingen (uid) herschreven, titel + " (kopie)".
export function duplicatePolicy(store, term, newIri) {
  const t = nn(term);
  const iri = newIri || mintIri(store, t.value + '-kopie');
  const root = namedNode(iri);
  const bmap = new Map();
  const mt = (x) => {
    if (x.termType === 'BlankNode') {
      if (!bmap.has(x.value)) bmap.set(x.value, blankNode());
      return bmap.get(x.value);
    }
    if (x.termType === 'NamedNode' && x.value === t.value) return root;
    return x;
  };
  for (const q of closureQuads(store, t)) store.addQuad(mt(q.subject), q.predicate, mt(q.object));
  for (const q of store.getQuads(root, namedNode(DCT + 'title'), null, null)) {
    store.removeQuad(q);
    store.addQuad(root, q.predicate, literal(q.object.value + ' (kopie)', q.object.language || undefined));
  }
  return iri;
}

// Dupliceer een aangehangen node (permission/duty/constraint) binnen dezelfde ouder.
export function duplicateAttached(store, parentTerm, predIri, term) {
  const t = nn(term);
  const bmap = new Map();
  const mt = (x) => {
    if (x.termType === 'BlankNode') {
      if (!bmap.has(x.value)) bmap.set(x.value, blankNode());
      return bmap.get(x.value);
    }
    return x;
  };
  if (t.termType === 'BlankNode') {
    for (const q of closureQuads(store, t)) store.addQuad(mt(q.subject), q.predicate, mt(q.object));
    const copy = mt(t);
    store.addQuad(nn(parentTerm), namedNode(predIri), copy);
    return copy;
  }
  // Benoemde node: alleen een extra verwijzing is zinloos; kopieer als nieuwe IRI.
  const iri = duplicatePolicy(store, t);
  store.addQuad(nn(parentTerm), namedNode(predIri), namedNode(iri));
  return namedNode(iri);
}

// Verwijder een benoemde policy: sluiting + alle inkomende verwijzingen.
export function removePolicy(store, term) {
  const t = nn(term);
  store.removeQuads(store.getQuads(null, null, t, null));
  store.removeQuads(closureQuads(store, t));
}

// Maak een aangehangen node los; ruim de sluiting op als niets er meer naar
// verwijst (gedeelde benoemde constraints/duties blijven dus staan).
// Zelfverwijzingen (bv. odrl:uid naar zichzelf) tellen niet als verwijzing.
export function removeAttached(store, parentTerm, predIri, term) {
  const t = nn(term);
  store.removeQuads(store.getQuads(nn(parentTerm), namedNode(predIri), t, null));
  const external = store.getQuads(null, null, t, null)
    .filter((q) => !(q.subject.termType === t.termType && q.subject.value === t.value));
  if (external.length === 0) {
    store.removeQuads(store.getQuads(null, null, t, null));
    store.removeQuads(closureQuads(store, t));
  }
}

// --- Raw-RDF-vangnet (laag 3) -----------------------------------------------

// Vervang de subject-sluiting van `subject` door het gegeven Turtle-fragment.
// Alle bekende prefixes worden voorgedeclareerd (het bronpaneel-fragment mag
// dus ongewijzigd terug). Parsefouten laten de graaf onaangetast.
export function replaceSubjectClosure(store, subject, turtleText) {
  const t = nn(subject);
  const header = Object.entries(allPrefixes()).map(([p, iri]) => `@prefix ${p}: <${iri}> .`).join('\n');
  const headerLines = header.split('\n').length;
  let quads;
  try {
    quads = new Parser().parse(header + '\n' + turtleText);
  } catch (e) {
    const msg = String(e.message || e).replace(/line (\d+)/, (_, n) => 'regel ' + Math.max(1, Number(n) - headerLines));
    return { ok: false, error: msg };
  }
  const old = closureQuads(store, t);
  const containsSubject = t.termType !== 'NamedNode'
    || quads.some((q) => q.subject.termType === 'NamedNode' && q.subject.value === t.value);
  store.removeQuads(old);
  store.addQuads(quads);
  return { ok: true, removed: old.length, added: quads.length, containsSubject };
}

// --- Export -----------------------------------------------------------------

export function exportTurtle(store) {
  const writer = new N3.Writer({ prefixes: allPrefixes() });
  writer.addQuads(store.getQuads(null, null, null, null));
  let out = '';
  writer.end((err, result) => { if (!err) out = result; });
  return prunePrefixes(out);
}

export function exportJsonLd(store) {
  const all = store.getQuads(null, null, null, null);
  const asObject = new Set(all.filter((q) => q.object.termType === 'BlankNode')
    .map((q) => q.object.value));
  const tops = new Map();
  for (const q of all) {
    if (q.subject.termType === 'BlankNode' && asObject.has(q.subject.value)) continue;
    const key = q.subject.termType + ':' + q.subject.value;
    if (!tops.has(key)) tops.set(key, q.subject);
  }
  const bodies = [...tops.values()].map((s) => subjectJsonLdBody(store, s));
  return JSON.stringify({ '@context': jsonLdContext(bodies), '@graph': bodies }, null, 2);
}

// --- Dropdown-vulling -------------------------------------------------------

const KNOWN_ACTIONS = ['use', 'read', 'distribute', 'reproduce', 'modify', 'delete', 'inform']
  .map((l) => ODRL + l);
const KNOWN_OPERATORS = ['eq', 'neq', 'gt', 'gteq', 'lt', 'lteq', 'isA', 'hasPart', 'isPartOf', 'isAllOf', 'isAnyOf']
  .map((l) => ODRL + l).concat([APNL + 'conformsToPolicy']);
const KNOWN_LEFT_OPERANDS = [ODRL + 'purpose', ODRL + 'dateTime', ODRL + 'count', APNL + 'verwerkingsverzoek'];

// Opties per rol: bekende odrl/apnl-termen, termen die in de graaf in die rol
// gebruikt worden, en (apart) alles met een rdfs:label als vrije suggestielijst.
export function termOptions(store) {
  const mk = () => new Map();
  const add = (map, iri) => {
    if (!iri || map.has(iri)) return;
    map.set(iri, { iri, curie: curie(iri), label: labelFor(store, namedNode(iri)) });
  };
  const actions = mk(); const operators = mk(); const leftOperands = mk();
  const parties = mk(); const targets = mk(); const purposes = mk(); const labeled = mk();

  KNOWN_ACTIONS.forEach((i) => add(actions, i));
  KNOWN_OPERATORS.forEach((i) => add(operators, i));
  KNOWN_LEFT_OPERANDS.forEach((i) => add(leftOperands, i));

  const typed = [
    [ODRL + 'Action', actions], [ODRL + 'Operator', operators], [ODRL + 'LeftOperand', leftOperands],
  ];
  for (const [ty, map] of typed) {
    for (const q of store.getQuads(null, namedNode(RDF + 'type'), namedNode(ty), null)) {
      if (q.subject.termType === 'NamedNode') add(map, q.subject.value);
    }
  }
  const usedIn = [
    [ODRL + 'operator', operators], [ODRL + 'leftOperand', leftOperands],
    [ODRL + 'action', actions], [RDF + 'value', actions],
    [ODRL + 'assigner', parties], [ODRL + 'assignee', parties],
    [DCT + 'publisher', parties], [ODRL + 'informedParty', parties],
  ];
  for (const [pred, map] of usedIn) {
    for (const q of store.getQuads(null, namedNode(pred), null, null)) {
      if (q.object.termType === 'NamedNode') add(map, q.object.value);
    }
  }
  for (const pred of targetPreds(store)) {
    for (const q of store.getQuads(null, namedNode(pred), null, null)) {
      if (q.object.termType === 'NamedNode') add(targets, q.object.value);
    }
  }
  for (const q of store.getQuads(null, namedNode(RDF + 'type'), namedNode(DCAT + 'Distribution'), null)) {
    add(targets, q.subject.value);
  }
  // Purposes: rightOperand van constraints met leftOperand odrl:purpose.
  for (const q of store.getQuads(null, namedNode(ODRL + 'leftOperand'), namedNode(ODRL + 'purpose'), null)) {
    const right = objOf(store, q.subject, ODRL + 'rightOperand');
    if (right && right.termType === 'NamedNode') add(purposes, right.value);
  }
  // Alles met een rdfs:label (voor het vrije IRI-veld / datalist).
  for (const q of store.getQuads(null, namedNode(RDFS + 'label'), null, null)) {
    if (q.subject.termType === 'NamedNode') add(labeled, q.subject.value);
  }
  const sort = (map) => [...map.values()].sort((a, b) => a.label.localeCompare(b.label, 'nl'));
  return {
    actions: sort(actions), operators: sort(operators), leftOperands: sort(leftOperands),
    parties: sort(parties), targets: sort(targets), purposes: sort(purposes), labeled: sort(labeled),
  };
}

// Lege store (voor "Nieuw beleid" zonder geladen bronnen).
export function newStore() {
  return new Store();
}
