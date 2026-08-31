// ODRL-AP-NL viewer — graaf-inspecteur + gedeelde syntax-highlighting (ESM).
//
// Eén uniforme "verken"-leesweergave voor een willekeurige node in de graaf,
// gebruikt door BEIDE weergaven (drie-panelen index.html en documentweergave
// doc.html). Per node toont de inspecteur:
//   - een breadcrumb vanaf het vertrekpunt (elk kruimelpad-item klikbaar);
//   - label + curie van de huidige node als kopje;
//   - DIRECT het bronfragment (subjectTurtle met FOLLOW_NAMED_PREDS) met
//     syntax-kleuring, waarin elke IRI/CURIE die als subject in de graaf
//     voorkomt klikbaar is (uitgaande navigatie);
//   - daaronder "→ Verwijst naar (n)" en "← Verwezen vanuit (n)" als
//     INGEKLAPTE, lazy fold-outs: de lijst wordt pas bij openklappen gebouwd,
//     gechunkt (CARD_CHUNK_SIZE) en boven REF_LIST_INLINE_MAX met filterveld;
//     in ?src=<endpoint>-modus komen de inkomende verwijzingen gepagineerd
//     (LIMIT/OFFSET) van het endpoint.
//
// De graaf-logica (sluiting, inkomende verwijzingen, term-tokenisatie) zit
// DOM-vrij in parse.js; het inspecteur-model hieronder (createInspector) is
// eveneens puur en node-testbaar. Alleen renderInspector/verkenButton maken
// DOM-elementen — dit module-topniveau raakt `document` niet aan, zodat het
// onder node importeerbaar blijft.
import {
  subjectTurtle, FOLLOW_NAMED_PREDS, incomingRefs, incomingRefCount,
  outgoingRefs, outgoingRefCount, nodeSummary, tokenIri, isGraphSubject,
  curie, localName, CARD_CHUNK_SIZE, REF_LIST_INLINE_MAX, filterRefItems,
} from './parse.js';
// Chrome-strings via de gedeelde stringtabel (B16); de inspecteur wordt door
// beide weergaven gebruikt en volgt dus dezelfde taalinstelling.
import { t } from './i18n.js';
// Uitleg-tooltip op termen met een definitie (Visualisation Note §1); gedeeld
// met doc.js, en daarom een eigen module — inspect.js wordt door beide
// weergaven geladen.
import { explained } from './tooltip.js';

// --- Syntax-highlighting (verplaatst uit app.js; gedeeld met doc.html) ------

export function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function attrEscape(s) {
  return escapeHtml(s).replace(/"/g, '&quot;');
}

export function highlightJson(json) {
  return escapeHtml(json)
    .replace(/(&quot;|")(@?[\w:@./#-]*?)\1(?=\s*:)/g, '<span class="tok-pname">"$2"</span>')
    .replace(/: ("(?:[^"\\]|\\.)*")/g, ': <span class="tok-string">$1</span>')
    .replace(/: (true|false|-?\d+\.?\d*)/g, ': <span class="tok-num">$1</span>');
}

// Eenvoudige Turtle syntax-highlight (regel voor regel, met tokenisatie).
// opts.linkIri: (iri) => boolean — IRI-/CURIE-tokens waarvoor dit true geeft
// krijgen class "tok-link" + data-iri, zodat de inspecteur ze klikbaar maakt.
export function highlightTurtle(ttl, opts = {}) {
  const linkIri = opts.linkIri || null;
  const wrap = (cls, token) => {
    const esc = escapeHtml(token);
    const iri = linkIri ? tokenIri(token) : null;
    if (iri && linkIri(iri)) {
      return `<span class="${cls} tok-link" data-iri="${attrEscape(iri)}">${esc}</span>`;
    }
    return `<span class="${cls}">${esc}</span>`;
  };
  const lines = ttl.split('\n');
  return lines.map((line) => {
    // Naïef: comments beginnen in onze serialisatie aan het begin van een regel.
    if (/^\s*#/.test(line)) { return `<span class="tok-comment">${escapeHtml(line)}</span>`; }
    const code = line;
    let out = '';
    const re = /(@prefix|@base|\ba\b(?=\s))|(<[^>]*>)|("(?:[^"\\]|\\.)*"(?:@[\w-]+|\^\^[^\s,;.]+)?)|(\b[\w-]+:[\w./#-]*)|(\b\d+\.?\d*\b)|([;,.\[\]()])/g;
    let last = 0, m;
    while ((m = re.exec(code)) !== null) {
      out += escapeHtml(code.slice(last, m.index));
      if (m[1]) out += `<span class="tok-kw">${escapeHtml(m[1])}</span>`;
      else if (m[2]) out += wrap('tok-iri', m[2]);
      else if (m[3]) out += `<span class="tok-string">${escapeHtml(m[3])}</span>`;
      else if (m[4]) out += wrap('tok-pname', m[4]);
      else if (m[5]) out += `<span class="tok-num">${escapeHtml(m[5])}</span>`;
      else if (m[6]) out += `<span class="tok-punct">${escapeHtml(m[6])}</span>`;
      last = re.lastIndex;
    }
    out += escapeHtml(code.slice(last));
    return out;
  }).join('\n');
}

// --- Inspecteur-model (puur; node-testbaar) ---------------------------------

// Breadcrumb-model: een trail van nodeSummary's vanaf het vertrekpunt.
//   goTo(termOrIri)  navigeer verder (trail groeit);
//   jump(index)      spring terug naar een kruimelpad-item (trail krimpt);
//   current()        de huidige node.
export function createInspector(store, startTerm) {
  const trail = [nodeSummary(store, startTerm)];
  return {
    store,
    get trail() { return trail; },
    current() { return trail[trail.length - 1]; },
    goTo(termOrIri) {
      trail.push(nodeSummary(store, termOrIri));
      return this.current();
    },
    jump(index) {
      trail.length = Math.max(1, Math.min(index + 1, trail.length));
      return this.current();
    },
  };
}

// --- DOM-rendering ----------------------------------------------------------

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

// Kleine, uniforme verken-knop (affordance op elk node-achtig element):
// een cirkel met alleen het vergrootglas-glyph, tooltip "Verkennen".
// De handler krijgt géén event-details nodig; preventDefault/stopPropagation
// zitten ingebakken zodat de knop ook binnen <summary> en links veilig is.
export function verkenButton(onClick, title) {
  return h('button', {
    type: 'button', class: 'verken-btn',
    title: title || t('insp.explore'),
    'aria-label': t('insp.exploreAria'),
    text: '⌕',
    onclick: (e) => {
      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();
      onClick();
    },
  });
}

// Spiegelbeeld van de verken-knop: van de graaf terug NAAR de weergave. Zelfde
// ronde affordance en afmeting, andere glyph (pijl naar de hoek = "spring
// hierheen in de pagina").
export function toonButton(onClick) {
  return h('button', {
    type: 'button', class: 'verken-btn toon-btn',
    title: t('insp.showInView'),
    'aria-label': t('insp.showInViewAria'),
    text: '⇱',
    onclick: (e) => {
      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();
      onClick();
    },
  });
}

// Eén verwijzings-rij (subject of object + predicaat), klikbaar.
// `desc`/`predDesc`: de definitie van de knoop en van het predicaat, als de
// data die geeft (Visualisation Note §1). De RIJ houdt haar native title (de
// IRI plus het predicaat — dat is navigatie-informatie, geen betekenis); de
// uitleg hangt aan de twee tekstdelen binnenin.
function refRow({ title, pred, hoverIri, onPick, desc = '', predDesc = '' }) {
  // De IRI stond hier als native `title`; met een uitleg-tooltip op de twee
  // tekstdelen erbinnen gaf dat twee tooltips over dezelfde plek. explained()
  // neemt hem over als kopregel — zie doc.js/titleAsTip.
  return explained(h('li', {
    class: 'insp-in', role: 'button', tabindex: '0',
    title: (hoverIri || t('anonNode')) + (pred ? ' — ' + pred : ''),
    onclick: onPick,
    onkeydown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(); }
    },
  }, [
    explained(h('span', { class: 'insp-in-subj', text: title }), desc),
    pred ? explained(
      h('span', { class: 'insp-in-pred mono muted', text: ' ' + pred }), predDesc) : null,
  ]), '', { focusable: false });
}

function predText(p) {
  return p.label !== p.curie ? `${p.label} (${p.curie})` : p.curie;
}

// Lazy fold-out voor een verwijzingslijst uit de GELADEN graaf: dicht bij
// render (alleen de telling in de kop, goedkoop via *RefCount); de eerste
// uitklap bouwt de lijst — boven REF_LIST_INLINE_MAX met filterveld, altijd
// gechunkt (CARD_CHUNK_SIZE per keer, "Meer tonen") zodat duizenden
// verwijzingen (BRP: 1.392 wasDerivedFrom's op één Offer) de UI nooit meer
// plattrekken.
// `countInto`: de weergave draagt de telling zélf al (het randlabel van een
// richtingblok in de keten-layout). De fold-out levert hem dan daar af en laat
// haar eigen summary weg — het blok wordt van buitenaf open- en dichtgeklapt,
// en twee chevrons boven elkaar zou onzin zijn. De LAZY opbouw blijft precies
// zoals zij was: de lijst wordt pas gebouwd bij de eerste keer open.
function localRefsFoldout({ label, count, buildRefs, onPick, countInto = null }) {
  if (!count) {
    return h('p', { class: 'insp-none muted', text: t('insp.noneInGraph', { label }) });
  }
  const det = h('details', { class: 'insp-fold' + (countInto ? ' insp-fold-bare' : '') });
  // De summary blijft ALTIJD bestaan, ook als het randlabel de kop draagt: een
  // <details> zonder summary krijgt van de browser zijn eigen "Details"-regel
  // terug. CSS verbergt hem (.insp-fold-bare > summary).
  det.appendChild(h('summary', { class: 'vl-summary muted' }, [
    h('span', { class: 'vl-chevron', text: '▸' }),
    h('span', { text: t('insp.foldCount', { label, n: count }) }),
  ]));
  if (countInto) countInto.textContent = t('insp.foldCount', { label, n: count });
  let built = false;
  det.addEventListener('toggle', () => {
    if (!det.open || built) return;
    built = true;
    const refs = buildRefs(); // labels e.d. pas nu (lazy)
    const items = refs.map((r) => ({
      title: r.label || r.curie || t('anon'),
      sub: predText(r.predicate),
      // De uitleg reist mee met de rij; filterRefItems raakt haar niet aan.
      desc: r.desc || '',
      predDesc: (r.predicate && r.predicate.desc) || '',
      ref: r,
    }));
    const list = h('ul', { class: 'insp-in-list' });
    const moreBtn = h('button', { type: 'button', class: 'btn ref-more', text: t('list.showMore') });
    let visible = items;
    let offset = 0;
    const renderChunk = () => {
      const chunk = visible.slice(offset, offset + CARD_CHUNK_SIZE);
      for (const it of chunk) {
        list.appendChild(refRow({
          title: it.title, pred: it.sub, hoverIri: it.ref.iri,
          desc: it.desc, predDesc: it.predDesc,
          onPick: () => onPick(it.ref.term),
        }));
      }
      offset += chunk.length;
      const done = offset >= visible.length;
      moreBtn.hidden = done;
      if (!done) moreBtn.textContent = t('list.showMoreRest', { n: visible.length - offset });
    };
    const restart = () => { list.innerHTML = ''; offset = 0; renderChunk(); };
    if (items.length > REF_LIST_INLINE_MAX) {
      const input = h('input', {
        type: 'search', class: 'ref-filter insp-filter',
        placeholder: t('insp.filterPlaceholder'),
        'aria-label': t('insp.filterAria', { label }),
        oninput: () => { visible = filterRefItems(items, input.value); restart(); },
      });
      det.appendChild(input);
    }
    det.appendChild(list);
    det.appendChild(moreBtn);
    moreBtn.addEventListener('click', renderChunk);
    restart();
  });
  return det;
}

// Fold-out voor inkomende verwijzingen die (ook) op het SPARQL-endpoint
// leven (?src=<endpoint>-modus): de telling komt uit een apart COUNT (async
// in de kop), de lijst wordt met LIMIT/OFFSET-pagina's opgehaald — één klik
// haalt dus nooit tienduizenden rijen. `remote` levert de host (doc.js/
// app.js): { count: async () => n, page: async (offset, limit) => rows }.
function remoteRefsFoldout({ label, remote, onPickIri, countInto = null }) {
  const det = h('details', { class: 'insp-fold' + (countInto ? ' insp-fold-bare' : '') });
  const countSpan = countInto || h('span', {});
  countSpan.textContent = t('insp.countPending', { label });
  // Zie localRefsFoldout: de summary blijft staan (en wordt door CSS verborgen),
  // anders zet de browser er zijn eigen "Details"-regel voor in de plaats.
  det.appendChild(h('summary', { class: 'vl-summary muted' }, [
    h('span', { class: 'vl-chevron', text: '▸' }),
    countInto ? h('span', { text: t('insp.countPending', { label }) }) : countSpan,
  ]));
  let total = null;
  remote.count().then((n) => {
    total = n;
    countSpan.textContent = t('insp.foldCount', { label, n });
  }).catch(() => { countSpan.textContent = t('insp.countFailed', { label }); });
  let built = false;
  det.addEventListener('toggle', async () => {
    if (!det.open || built) return;
    built = true;
    const list = h('ul', { class: 'insp-in-list' });
    const moreBtn = h('button', { type: 'button', class: 'btn ref-more', text: t('list.loadMore'), hidden: '' });
    const status = h('p', { class: 'insp-none muted', text: t('insp.loadingEndpoint') });
    det.appendChild(status);
    det.appendChild(list);
    det.appendChild(moreBtn);
    let offset = 0;
    const loadPage = async () => {
      moreBtn.hidden = true;
      status.hidden = false;
      status.textContent = t('insp.loadingEndpoint');
      let rows;
      try { rows = await remote.page(offset, CARD_CHUNK_SIZE); }
      catch (e) {
        status.textContent = t('insp.loadRefsFailed', { msg: e.message });
        return;
      }
      status.hidden = true;
      for (const r of rows) {
        list.appendChild(refRow({
          title: r.label || localName(r.iri), pred: curie(r.predicate), hoverIri: r.iri,
          onPick: () => onPickIri(r.iri),
        }));
      }
      offset += rows.length;
      const done = rows.length < CARD_CHUNK_SIZE || (total != null && offset >= total);
      moreBtn.hidden = done;
      if (!done) {
        moreBtn.textContent = total != null
          ? t('list.loadMoreRest', { n: total - offset }) : t('list.loadMore');
      }
      if (!rows.length && offset === 0) {
        status.hidden = false;
        status.textContent = t('insp.noIncoming');
      }
    };
    moreBtn.addEventListener('click', loadPage);
    await loadPage();
  });
  return det;
}

// Render de inspecteur in `container` en herrender bij navigatie. De
// breadcrumb blijft persistent: het model leeft buiten deze functie.
//
// Indeling (herstructurering aug 2026, feedback eigenaar): bovenaan ALTIJD
// direct het bronfragment van de knoop zelf; daaronder "Verwijst naar (n)" en
// "Verwezen vanuit (n)" als ingeklapte, lazy fold-outs. Voorheen stond de
// volledige inkomende lijst boven het fragment en trok hij bij duizenden
// verwijzingen de UI plat.
//
// opts (optioneel):
//   remoteIncoming: { count: async (iri) => n, page: async (iri, offset,
//     limit) => [{iri, predicate, label}] } — ?src=<endpoint>-modus: de
//     inkomende verwijzingen komen dan gepagineerd van het endpoint (de
//     geladen graaf is daar per definitie onvolledig).
//   ensureNode: async (iri) => void — host-hook om een aangeklikte node
//     eerst bij te laden (detail-CONSTRUCT) voordat de trail verder gaat.
export function renderInspector(container, model, opts = {}) {
  const { store } = model;
  const cur = model.current();
  container.innerHTML = '';
  const rerender = () => renderInspector(container, model, opts);
  const goTo = (termOrIri) => {
    const iri = typeof termOrIri === 'string' ? termOrIri
      : (termOrIri && termOrIri.termType === 'NamedNode' ? termOrIri.value : null);
    if (opts.ensureNode && iri && !isGraphSubject(store, iri)) {
      Promise.resolve(opts.ensureNode(iri))
        .catch(() => { /* toon wat er wél is */ })
        .then(() => { model.goTo(termOrIri); rerender(); });
      return;
    }
    model.goTo(termOrIri);
    rerender();
  };

  // Breadcrumb: vertrekpunt › … › huidig (alles behalve het laatste klikbaar).
  const crumbs = h('div', { class: 'insp-crumbs' });
  model.trail.forEach((n, i) => {
    if (i) crumbs.appendChild(h('span', { class: 'insp-sep', text: ' › ' }));
    const text = n.label || n.curie || t('anon');
    if (i === model.trail.length - 1) {
      crumbs.appendChild(h('span', { class: 'crumb current', text, title: n.iri || undefined }));
    } else {
      crumbs.appendChild(h('span', {
        class: 'crumb', role: 'button', tabindex: '0', text, title: n.iri || undefined,
        onclick: () => { model.jump(i); rerender(); },
        onkeydown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); model.jump(i); rerender(); }
        },
      }));
    }
  });
  container.appendChild(crumbs);

  // Kopje: label + curie (+ typen), met rechts de "toon in de weergave"-knop:
  // de terugweg naar de pagina voor de knoop waar je nu staat. De inspecteur
  // blijft daarbij gewoon openstaan, zodat je heen en weer kunt.
  const head = h('div', { class: 'insp-node-head' });
  const revealMsg = h('p', { class: 'insp-reveal-msg muted' });
  revealMsg.hidden = true;
  const titleRow = h('div', { class: 'insp-label-row' }, [
    explained(h('div', { class: 'insp-label', text: cur.label || t('anon') }), cur.desc),
    opts.revealInUi && cur.iri ? toonButton(async () => {
      revealMsg.hidden = true;
      let ok = false;
      try { ok = await opts.revealInUi(cur.iri); } catch { ok = false; }
      if (!ok) {
        revealMsg.textContent = t('insp.notInView');
        revealMsg.hidden = false;
      }
    }) : null,
  ]);
  head.appendChild(titleRow);
  if (cur.curie) head.appendChild(h('div', { class: 'insp-curie mono', text: cur.curie, title: cur.iri }));
  if (cur.types && cur.types.length) {
    head.appendChild(h('div', { class: 'insp-types muted', text: cur.types.join(' · ') }));
  }
  head.appendChild(revealMsg);
  container.appendChild(head);

  // 1. Bronfragment: onderdeel van het CENTRALE VLAK (klikbare subject-termen
  // blijven de snelste uitgaande navigatie).
  head.appendChild(h('div', { class: 'insp-sec', text: t('insp.sourceFragment') }));
  let ttl = '';
  try { ttl = subjectTurtle(store, cur.term, FOLLOW_NAMED_PREDS).trimEnd(); }
  catch (e) { ttl = t('insp.serializeError', { msg: e.message }); }
  if (ttl) {
    const code = h('code');
    code.innerHTML = highlightTurtle(ttl, {
      linkIri: (iri) => iri !== cur.iri && isGraphSubject(store, iri),
    });
    const pre = h('pre', {
      class: 'insp-ttl',
      onclick: (e) => {
        let t = e && e.target;
        if (t && t.closest) t = t.closest('.tok-link');
        const iri = t && t.getAttribute && t.getAttribute('data-iri');
        if (iri) goTo(iri);
      },
    }, [code]);
    head.appendChild(pre);
  } else {
    head.appendChild(h('p', {
      class: 'insp-none muted',
      text: t('insp.noTriples'),
    }));
  }

  // --- DE KETEN-LAYOUT (aug 2026, besluit eigenaar) -------------------------
  // Dezelfde visuele taal als het Invulling-paneel: het element waar je staat
  // is een grijs vlak over de volle breedte, met de twee richtingen als blokken
  // erboven en eronder en het randlabel ÓP de rand van dat vlak. Boven staat
  // wat NAAR deze knoop wijst (subject → dit element), eronder waar deze knoop
  // zelf naar wijst — dezelfde leesrichting als ↑/↓ in het andere paneel.
  //
  // Beide blokken zijn INKLAPBAAR via het randlabel; de open-stand onthoudt de
  // host per paneelmodus (opts.folds). De fold-outs zelf blijven de <details>
  // die ze waren — hun summary is alleen verborgen (insp-fold-bare) en het
  // randlabel zet `open`. Zo blijft de lazy opbouw, de paginering en het
  // filterveld ongewijzigd werken.
  const inLabel = h('span', {});
  const uitLabel = h('span', {});
  const remoteIn = !!(opts.remoteIncoming && cur.iri);
  // Endpoint-modus: de telling komt pas ná een COUNT-query, dus hier telt de
  // veilige kant — het blok begint dicht en de lezer haalt hem zelf op.
  const inCount = remoteIn ? Infinity : incomingRefCount(store, cur.term);
  const uitCount = outgoingRefCount(store, cur.term);
  const inkomend = remoteIn
    ? remoteRefsFoldout({
      label: t('insp.edgeIn'),
      remote: {
        count: () => opts.remoteIncoming.count(cur.iri),
        page: (offset, limit) => opts.remoteIncoming.page(cur.iri, offset, limit),
      },
      onPickIri: goTo,
      countInto: inLabel,
    })
    : refsBlok(localRefsFoldout({
      label: t('insp.edgeIn'),
      count: inCount,
      buildRefs: () => incomingRefs(store, cur.term),
      onPick: goTo,
      countInto: inLabel,
    }));
  // Uitgaand is bewust VOLLEDIG (ook wat het fragment al toont) — zie de
  // toelichting bij outgoingRefs.
  const uitgaand = refsBlok(localRefsFoldout({
    label: t('insp.edgeOut'),
    count: uitCount,
    buildRefs: () => outgoingRefs(store, cur.term),
    onPick: goTo,
    countInto: uitLabel,
  }));
  // Het grijze vlak is een OMHULSEL om de kop: de twee randlabels moeten er
  // los van de inhoud op kunnen liggen (absoluut, op de rand), en de kop zelf
  // houdt zijn eigen ritme. Zo hoeft er ook niets vóór bestaande kinderen
  // geschoven te worden — alles wordt in leesvolgorde opgebouwd.
  const curBox = h('div', { class: 'insp-cur' });
  if (inkomend) {
    container.appendChild(dirBlok(inkomend, 'insp-in'));
    curBox.appendChild(edgeLabel('in', inLabel, inkomend, opts, inCount));
  }
  curBox.appendChild(head);
  if (uitgaand) curBox.appendChild(edgeLabel('out', uitLabel, uitgaand, opts, uitCount));
  container.appendChild(curBox);
  if (uitgaand) container.appendChild(dirBlok(uitgaand, 'insp-out'));
}

// Een leeg richtingblok valt weg, randlabel en al — dezelfde regel als in het
// Invulling-paneel. localRefsFoldout geeft bij nul verwijzingen een <p> terug
// in plaats van een <details>; dat is het signaal.
function refsBlok(node) {
  return (node && String(node.tagName || '').toLowerCase() === 'details') ? node : null;
}

function dirBlok(det, cls) {
  return h('div', { class: 'insp-dir ' + cls }, [det]);
}

// Het randlabel op de rand van het grijze vlak: pijl, telling en een chevron
// die het blok open- en dichtklapt. De stand komt van de host (opts.folds) en
// wordt daar ook bewaard, zodat een stap door de graaf hem niet vergeet.
// `count` reist mee zodat de host kan besluiten of dit blok ongevraagd open
// mag: een lijst die in één keer te overzien is hoort meteen te staan, een
// lijst van duizenden niet (zie doc.js/PANEL_FOLDS).
// Zonder host-stand (index.html geeft er geen mee) geldt dezelfde regel als in
// doc.js: open zolang de lijst in één keer te overzien is.
const AUTO_OPEN_MAX = CARD_CHUNK_SIZE;
function edgeLabel(richting, countSpan, det, opts, count = null) {
  const folds = opts.folds || null;
  const vanzelf = count == null || count <= AUTO_OPEN_MAX;
  const open = folds ? !!folds.get('inspect', richting, count) : vanzelf;
  det.open = open;
  // De chevron komt uit CSS (::after, gestuurd door aria-expanded) — zie
  // doc.js/foldEdge, waar dezelfde afweging staat.
  const p = h('p', {
    class: 'fill-edge insp-edge fill-edge-' + (richting === 'in' ? 'up' : 'down') + ' is-foldable',
    role: 'button', tabindex: '0', 'aria-expanded': String(open),
  }, [h('span', { text: richting === 'in' ? '\u2191 ' : '\u2193 ' }), countSpan]);
  const toggle = () => {
    const nu = !det.open;
    det.open = nu;
    p.setAttribute('aria-expanded', String(nu));
    if (folds) folds.set('inspect', richting, nu);
  };
  p.addEventListener('click', toggle);
  p.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
  return p;
}
