// ODRL viewer — DE VERKENNER: de tweede FULL-PAGE weergave van doc.html.
//
// WAAROM DIT GEEN PANEEL IS (en ook geen tweede kolom). De weergaven van deze
// viewer zijn mensleesbaar; de machineleesbare graaf mag er NIET naast staan.
// Document en verkenner zijn daarom twee standen van dezelfde pagina: staat de
// verkenner aan, dan is de documentweergave volledig verborgen (doc.js zet
// #doc-main op hidden en sluit het zijpaneel), en andersom. Nooit allebei
// tegelijk in beeld — dat is de dragende eis, niet een vormvoorkeur.
//
// WAAROM HET GEEN LOSSE PAGINA IS. Een eigen verken.html zou bij elke wissel
// alle bronnen opnieuw ophalen en parsen. Als modus binnen doc.html blijft de
// store staan: heen en weer springen tussen document en verkenner is instant,
// en de URL (?verken=<IRI>) blijft deelbaar — pushState houdt browser-terug en
// -vooruit over beide standen heen werkend.
//
// DE WEERGAVE PER KNOOP is het keten-ontwerp van de vroegere graaf-inspecteur:
// de knoop zelf als grijs vlak in het midden (label, typen, curie, en zijn
// eigen waarden), daarboven wat NAAR hem verwijst en daaronder waar hij zélf
// naar verwijst — dezelfde leesrichting en dezelfde randlabels als het
// Invulling-paneel. Elke IRI is een klik naar diezelfde weergave van die
// knoop.
//
// Alles boven "DOM-rendering" is puur en node-testbaar; het module-topniveau
// raakt `document` niet aan.
import {
  incomingRefs, incomingRefCount, outgoingRefs, outgoingRefCount,
  literalValues, nodeSummary, curie, localName,
  CARD_CHUNK_SIZE, REF_LIST_INLINE_MAX, filterRefItems,
} from './parse.js';
import { t } from './i18n.js';
import { explained } from './tooltip.js';

// --- De URL: ?verken=<IRI> ---------------------------------------------------
// Dezelfde vorm als de andere standen van deze pagina (?policy=, ?set=,
// ?status=): een gewone queryparameter naast de ?src=-bronnen, zodat een
// verkenner-URL precies zo deelbaar is als een document-URL en dezelfde
// bronnen laadt. De parameter draagt ALLEEN een IRI — een blanke knoop heeft
// buiten dit document geen adres en is dus niet deelbaar (zelfde regel als
// "geen ⌕ zonder bestemming", zie verken.js/iriOf).
export const VERKEN_PARAM = 'verken';

export function verkenIriFromSearch(search) {
  const raw = String(search || '');
  const q = raw.startsWith('?') ? raw.slice(1) : raw;
  const v = new URLSearchParams(q).get(VERKEN_PARAM);
  return v || null;
}

// De querystring van deze pagina mét (of, met iri = null, zónder) de
// verkenner-stand. Alle overige parameters blijven staan en houden hun
// volgorde: de bronnen van de pagina reizen dus mee.
export function verkenSearch(search, iri) {
  const raw = String(search || '');
  const u = new URLSearchParams(raw.startsWith('?') ? raw.slice(1) : raw);
  if (iri) u.set(VERKEN_PARAM, iri); else u.delete(VERKEN_PARAM);
  const s = u.toString();
  return s ? '?' + s : '';
}

// --- Het knoopmodel (puur) ---------------------------------------------------
// De twee richtingen komen als LAZY bouwers mee: incomingRefs/outgoingRefs
// bouwen per verwijzing een label, en dat is bij een druk bezochte knoop
// (BRP: 1.392 wasDerivedFrom's op één Offer) te duur om te doen voor een blok
// dat dicht staat. De TELLINGEN zijn wel meteen goedkoop beschikbaar — die
// bepalen de kop én of het blok vanzelf open mag.
export function verkenNode(store, termOrIri) {
  const node = nodeSummary(store, termOrIri);
  const inCount = incomingRefCount(store, node.term);
  const outCount = outgoingRefCount(store, node.term);
  const values = literalValues(store, node.term);
  return {
    node,
    values,
    inCount,
    outCount,
    // Een knoop die alleen als VERWIJZING in de graaf voorkomt heeft niets
    // eigens: geen waarden, geen uitgaande verwijzingen. Dat is geen fout maar
    // een mededeling — de weergave zegt het met zoveel woorden.
    bare: !values.length && !outCount,
    incoming: () => incomingRefs(store, node.term),
    outgoing: () => outgoingRefs(store, node.term),
  };
}

// De tekst van één verwijzingsrij: naam (of curie, of "(anoniem)") plus het
// predicaat. Puur, zodat de volgorde en de terugval getest kunnen worden
// zonder DOM.
export function refRowText(ref) {
  return {
    title: ref.label || ref.curie || (ref.iri ? localName(ref.iri) : t('anon')),
    pred: predText(ref.predicate),
  };
}

function predText(p) {
  if (!p) return '';
  return p.label && p.label !== p.curie ? `${p.label} (${p.curie})` : p.curie;
}

// De weergavewaarde van een literal: de tekst, met taalmarkering of datatype
// als klein achtervoegsel. xsd:string en een taalloze literal krijgen er geen
// — dat zou ruis zijn op de meest voorkomende vorm.
const XSD_STRING = 'http://www.w3.org/2001/XMLSchema#string';
export function valueText(v) {
  if (!v) return '';
  if (v.lang) return `${v.value} @${v.lang}`;
  if (v.datatype && v.datatype !== XSD_STRING) return `${v.value} (${curie(v.datatype)})`;
  return v.value;
}

// --- DOM-rendering -----------------------------------------------------------

function h(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (v != null) node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null || c === '') continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

// De open/dicht-stand van de twee richtingblokken hoort bij de VERKENNER, niet
// bij de knoop: wie een richting dichtklapt en dan doorklikt, wil hem dicht
// houden. Zelfde afweging (en zelfde `null`-betekenis) als PANEL_FOLDS in
// doc.js: null = de lezer heeft niets gezegd, dan telt de lengte.
const VERKEN_FOLDS = { up: null, down: null };
export function resetVerkenFolds() { VERKEN_FOLDS.up = null; VERKEN_FOLDS.down = null; }
function foldOpen(key, count) {
  if (VERKEN_FOLDS[key] != null) return !!VERKEN_FOLDS[key];
  return count != null && count <= CARD_CHUNK_SIZE;
}

// Eén verwijzingsrij. Een IRI is een gewone LINK (deelbaar, middelklik en
// "openen in nieuw tabblad" blijven werken) die bij een gewone klik binnen de
// pagina navigeert. Een BLANKE KNOOP krijgt geen link: hij heeft buiten dit
// document geen adres, en een dode link is erger dan gewone tekst.
function refRow(ref, hooks) {
  const { title, pred } = refRowText(ref);
  const naam = explained(h('span', { class: 'verken-ref-name', text: title }), ref.desc || '');
  const predSpan = pred
    ? explained(h('span', { class: 'verken-ref-pred mono muted', text: pred }),
      (ref.predicate && ref.predicate.desc) || '')
    : null;
  if (!ref.iri) {
    return h('li', { class: 'verken-ref verken-ref-anon', title: t('verken.anonTitle') },
      [naam, predSpan]);
  }
  const a = h('a', {
    class: 'verken-ref-link', href: hooks.hrefFor ? hooks.hrefFor(ref.iri) : null,
    title: ref.iri,
  }, [naam, predSpan]);
  a.addEventListener('click', (e) => {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button)) return;
    if (e && e.preventDefault) e.preventDefault();
    if (hooks.onNavigate) hooks.onNavigate(ref.iri);
  });
  return h('li', { class: 'verken-ref' }, [a]);
}

// Eén richtingblok: lazy (de lijst wordt pas bij het eerste openklappen
// gebouwd), gechunkt (CARD_CHUNK_SIZE per keer) en boven REF_LIST_INLINE_MAX
// met een filterveld. Precies de mechaniek van de vroegere inspecteur — die
// was er om duizenden verwijzingen niet de UI te laten plattrekken, en dat
// probleem is niet weg.
function refsBlock({ label, count, build, hooks, countInto }) {
  const det = h('details', { class: 'verken-fold' });
  det.appendChild(h('summary', { class: 'verken-fold-sum muted', text: t('verken.foldCount', { label, n: count }) }));
  if (countInto) countInto.textContent = t('verken.foldCount', { label, n: count });
  let built = false;
  const buildOnce = () => {
    if (built) return;
    built = true;
    const items = build().map((r) => {
      const txt = refRowText(r);
      return { title: txt.title, sub: txt.pred, ref: r };
    });
    const list = h('ul', { class: 'clean verken-ref-list' });
    const moreBtn = h('button', { type: 'button', class: 'btn ref-more', text: t('list.showMore') });
    let visible = items;
    let offset = 0;
    const renderChunk = () => {
      for (const it of visible.slice(offset, offset + CARD_CHUNK_SIZE)) {
        list.appendChild(refRow(it.ref, hooks));
      }
      offset = Math.min(offset + CARD_CHUNK_SIZE, visible.length);
      const done = offset >= visible.length;
      moreBtn.hidden = done;
      if (!done) moreBtn.textContent = t('list.showMoreRest', { n: visible.length - offset });
    };
    const restart = () => { list.innerHTML = ''; offset = 0; renderChunk(); };
    if (items.length > REF_LIST_INLINE_MAX) {
      const input = h('input', {
        type: 'search', class: 'ref-filter verken-filter',
        placeholder: t('verken.filterPlaceholder'),
        'aria-label': t('verken.filterAria', { label }),
        oninput: () => { visible = filterRefItems(items, input.value); restart(); },
      });
      det.appendChild(input);
    }
    det.appendChild(list);
    det.appendChild(moreBtn);
    moreBtn.addEventListener('click', renderChunk);
    restart();
  };
  det.addEventListener('toggle', () => { if (det.open) buildOnce(); });
  return { det, buildOnce };
}

// Het randlabel op de rand van het grijze vlak: dezelfde vorm en dezelfde
// chevron-uit-CSS als in het Invulling-paneel (.fill-edge), want het is
// hetzelfde gebaar op hetzelfde soort blok.
function edgeLabel(richting, countSpan, det, count) {
  const open = foldOpen(richting === 'in' ? 'up' : 'down', count);
  det.open = open;
  const p = h('p', {
    class: 'fill-edge verken-edge fill-edge-' + (richting === 'in' ? 'up' : 'down') + ' is-foldable',
    role: 'button', tabindex: '0', 'aria-expanded': String(open),
  }, [h('span', { text: richting === 'in' ? '↑ ' : '↓ ' }), countSpan]);
  const toggle = () => {
    const nu = !det.open;
    det.open = nu;
    p.setAttribute('aria-expanded', String(nu));
    VERKEN_FOLDS[richting === 'in' ? 'up' : 'down'] = nu;
  };
  p.addEventListener('click', toggle);
  p.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
  return p;
}

// De WAARDEN van de knoop: zijn literals, als label/waarde-rijen. Dit is wat
// een knoop over zichzelf zegt en dus de inhoud van het centrale vlak.
function valuesList(values) {
  if (!values.length) return null;
  const dl = h('dl', { class: 'verken-values' });
  for (const v of values) {
    dl.appendChild(explained(h('dt', { class: 'verken-val-key', text: predText(v.predicate) }),
      (v.predicate && v.predicate.desc) || ''));
    dl.appendChild(h('dd', { class: 'verken-val', text: valueText(v) }));
  }
  return dl;
}

// De hele verkenner-weergave voor één knoop.
//
// hooks:
//   onNavigate(iri)   klik op een verwijzing: naar die knoop (doc.js doet de
//                     pushState en het eventuele bijladen);
//   hrefFor(iri)      de deelbare URL van een knoop (voor de <a href>);
//   onShowInDoc(iri)  "Toon in document": terug naar de documentweergave, op
//                     deze knoop;
//   docHref           de deelbare URL van de documentweergave;
//   comunicaHref      de externe SPARQL-client voor deze knoop (nieuw tabblad);
//   status            { loading, error } — endpoint-modus haalt de knoop op.
export function renderVerken(container, model, hooks = {}) {
  container.innerHTML = '';
  const { node } = model;
  const box = h('div', { class: 'verken' });

  // 1. INKOMEND, bovenaan: wat naar deze knoop wijst. Zelfde leesrichting als
  //    het Invulling-paneel (↑ boven het vlak, ↓ eronder).
  const inLabel = h('span', {});
  const outLabel = h('span', {});
  const inBlok = model.inCount
    ? refsBlock({
      label: t('verken.edgeIn'), count: model.inCount, hooks,
      build: model.incoming, countInto: inLabel,
    })
    : null;
  const outBlok = model.outCount
    ? refsBlock({
      label: t('verken.edgeOut'), count: model.outCount, hooks,
      build: model.outgoing, countInto: outLabel,
    })
    : null;
  if (inBlok) box.appendChild(h('div', { class: 'verken-dir verken-dir-in' }, [inBlok.det]));

  // 2. HET CENTRALE VLAK: de knoop zelf.
  const cur = h('div', { class: 'verken-cur' });
  if (inBlok) cur.appendChild(edgeLabel('in', inLabel, inBlok.det, model.inCount));

  const titleRow = h('div', { class: 'verken-title-row' }, [
    explained(h('h1', { class: 'verken-label', text: node.label || t('anon') }), node.desc || ''),
  ]);
  // DE TERUGWEG. Een gewone link naar dezelfde pagina zonder ?verken=, zodat
  // hij deelbaar is en in een nieuw tabblad geopend kan worden; bij een gewone
  // klik wisselt de pagina van stand zónder te herladen en springt zij naar de
  // kaart/rij van deze knoop (revealInUi).
  if (hooks.onShowInDoc && node.iri) {
    const back = h('a', {
      class: 'btn verken-back', href: hooks.docHref || null, title: t('verken.backTitle'),
      text: t('verken.back'),
    });
    back.addEventListener('click', (e) => {
      if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button)) return;
      if (e && e.preventDefault) e.preventDefault();
      hooks.onShowInDoc(node.iri);
    });
    titleRow.appendChild(back);
  }
  cur.appendChild(titleRow);
  if (node.types && node.types.length) {
    cur.appendChild(h('div', { class: 'verken-types muted', text: node.types.join(' · ') }));
  }
  cur.appendChild(h('div', { class: 'verken-curie mono', text: node.curie || t('anon'), title: node.iri || null }));

  if (hooks.status && hooks.status.loading) {
    cur.appendChild(h('p', { class: 'verken-status muted', text: t('verken.loading') }));
  }
  if (hooks.status && hooks.status.error) {
    cur.appendChild(h('p', { class: 'verken-status verken-err', text: hooks.status.error }));
  }

  const vals = valuesList(model.values);
  if (vals) cur.appendChild(vals);
  else if (model.bare) cur.appendChild(h('p', { class: 'verken-none muted', text: t('verken.noTriples') }));

  // DE EXTERNE CLIENT blijft bestaan, als hulpmiddel en niet als weergave: wie
  // een echte query wil draaien (of de ruwe Turtle wil zien) gaat naar de
  // meegeleverde Comunica-bundel. Dat is een ANDERE pagina in een ander
  // tabblad — nooit iets wat naast het document komt te staan.
  if (hooks.comunicaHref) {
    cur.appendChild(h('p', { class: 'verken-tools' }, [
      h('a', {
        class: 'verken-sparql', href: hooks.comunicaHref, target: '_blank', rel: 'noopener',
        title: t('verken.sparqlTitle'), text: t('verken.sparql'),
      }),
    ]));
  }
  if (outBlok) cur.appendChild(edgeLabel('out', outLabel, outBlok.det, model.outCount));
  box.appendChild(cur);

  // 3. UITGAAND, eronder.
  if (outBlok) box.appendChild(h('div', { class: 'verken-dir verken-dir-out' }, [outBlok.det]));
  container.appendChild(box);
  // Een blok dat OPEN begint moet zijn lijst ook echt hebben: het
  // toggle-event vuurt in de browser pas asynchroon, en bij een blok dat al
  // open gerenderd wordt vuurt het helemaal niet.
  if (inBlok && inBlok.det.open) inBlok.buildOnce();
  if (outBlok && outBlok.det.open) outBlok.buildOnce();
  return box;
}
