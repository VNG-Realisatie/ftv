// UITLEG-TOOLTIP — één gedeelde implementatie voor de hele viewer.
//
// Visualisation Note §1: een term hoort een LABEL te dragen (zijn naam) en
// zou ook een korte DEFINITIE moeten dragen (skos:definition, dct:description
// of rdfs:comment). Het label staat altijd in beeld; de definitie is navraag,
// en verschijnt dus pas als de lezer erom vraagt. Dit bestand is die "op
// verzoek"-laag: de affordance op de term en het paneeltje dat hem toont.
//
// DE UI-KEUZE (besluit eigenaar, aug 2026):
//  * GEEN zichtbare aanduiding vooraf. Er stond eerst een fijne gestippelde
//    onderstreping onder elke gedefinieerde term; dat maakte de pagina
//    streperig zonder iets toe te voegen — een uitleg is navraag, geen
//    waarschuwing. (Iconen waren al afgevallen om dezelfde reden.)
//  * een EIGEN paneeltje op verlengde hover (HOVER_DELAY), niet de native
//    `title=`. Twee redenen: de meeste dragers hebben hun title al bezet (de
//    volle IRI, de complete waardelijst, de "ontbreekt"-uitleg), en de native
//    tooltip is niet te stylen, verschijnt traag en knipt lange tekst af.
//  * TOETSENBORD gelijkwaardig: bij focus verschijnt hij DIRECT (wie tabt
//    heeft de term al gekozen — daar hoort geen wachttijd bij), en Escape
//    sluit hem.
//  * NOOIT NAAST EEN NATIVE `title`. Twee tooltips over hetzelfde element is
//    de klacht die dit bestand juist moet oplossen, dus zet `explained()` een
//    aanwezige title om in een KOPREGEL van het paneeltje en haalt hem van het
//    element af. De aanroeper hoeft daar niets voor te doen: waar een uitleg
//    komt, verdwijnt de native tooltip vanzelf.
//
// ALLEEN ALS ER ECHT UITLEG IS. Geen tekst = geen onderstreping en geen
// tooltip; de affordance mag nooit iets beloven wat de data niet heeft.
//
// Geen DOM bij import: dit bestand wordt ook in node (smoke-tests) geladen,
// waar `window`/`document.body` een stub of afwezig zijn. Alles wat de
// browser nodig heeft staat achter een guard, zodat een ontbrekende
// DOM-faciliteit hooguit betekent dat er geen tooltip verschijnt.

// 600 ms: lang genoeg dat een muis die over een rij chips glijdt niets
// opent, kort genoeg dat "stilstaan op een term" meteen als vraag leest.
export const HOVER_DELAY = 600;
// Een definitie is een KORTE uitleg. Wat langer is hoort in de kaart of in de
// bron, niet in een zwevend paneeltje: afkappen is eerlijker dan een tooltip
// die het halve scherm vult.
const MAX_LEN = 320;
// Zelfde orde als de max-inline-size in de CSS (~40ch); hier alleen nodig om
// het paneel binnen het viewport te houden.
const MAX_W = 320;
const GAP = 8;

let tipEl = null;
let tipSeq = 0;
let timer = null;
let active = null;      // de term die de tooltip nu (of straks) toont
let wired = false;

function doc() {
  return typeof document !== 'undefined' ? document : null;
}
function win() {
  return typeof window !== 'undefined' ? window : null;
}

function reducedMotion() {
  const w = win();
  try {
    return !!(w && w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch { return false; }
}

// Het ene paneel-element, pas gemaakt wanneer er voor het eerst iets te tonen
// is. `null` als er geen echte DOM is (node-testomgeving): elke aanroeper
// hieronder verdraagt dat.
function ensureTip() {
  if (tipEl) return tipEl;
  const d = doc();
  if (!d || !d.body || !d.createElement) return null;
  const node = d.createElement('div');
  node.className = 'term-tip';
  if (node.setAttribute) {
    node.setAttribute('role', 'tooltip');
    node.setAttribute('id', 'term-tip');
    node.setAttribute('hidden', '');
  }
  try { d.body.appendChild(node); } catch { return null; }
  tipEl = node;
  return tipEl;
}

function setStyle(node, props) {
  if (!node || !node.style) return;
  for (const [k, v] of Object.entries(props)) node.style[k] = v;
}

// Plaats het paneel ONDER de term, of erboven als daar meer ruimte is; altijd
// binnen het viewport. Position: fixed, dus in viewport-coördinaten — dan
// hoeft er niets met scrollposities gerekend te worden en klopt het ook in een
// gescrolld zijpaneel.
function place(tip, term) {
  const w = win();
  if (!w || !term.getBoundingClientRect || !tip.getBoundingClientRect) return;
  const r = term.getBoundingClientRect();
  const vw = w.innerWidth || 1024;
  const vh = w.innerHeight || 768;
  // Meten mag pas als het paneel zichtbaar is; de aanroeper zorgt daarvoor.
  const t = tip.getBoundingClientRect();
  const hgt = t.height || 60;
  const wid = Math.min(t.width || MAX_W, MAX_W);
  const onder = vh - r.bottom;
  const above = onder < hgt + GAP && r.top > onder;
  const top = above ? Math.max(GAP, r.top - hgt - GAP) : Math.min(vh - hgt - GAP, r.bottom + GAP);
  let left = r.left;
  if (left + wid > vw - GAP) left = vw - wid - GAP;
  if (left < GAP) left = GAP;
  setStyle(tip, { top: Math.round(top) + 'px', left: Math.round(left) + 'px' });
  if (tip.classList) {
    tip.classList.remove('is-above');
    if (above) tip.classList.add('is-above');
  }
}

function hide() {
  clearTimeout(timer);
  timer = null;
  active = null;
  if (!tipEl) return;
  if (tipEl.classList) tipEl.classList.remove('is-open');
  tipEl.hidden = true;
  if (tipEl.setAttribute) tipEl.setAttribute('hidden', '');
}

function show(term, text, kop) {
  const tip = ensureTip();
  if (!tip) return;
  const d = doc();
  active = term;
  tip.textContent = '';
  // KOPREGEL: de tekst die vroeger als native `title` op dit element stond (de
  // naam van een voorwaarde, een IRI). Zij staat bovenaan, klein en zwaarder,
  // met de uitleg eronder — één paneel in plaats van twee tooltips over
  // elkaar. Zonder kop is het paneel precies wat het was.
  if (kop && d) {
    const k = d.createElement('span');
    k.className = 'term-tip-head';
    k.textContent = kop;
    tip.appendChild(k);
  }
  if (text && d) {
    const b = d.createElement('span');
    b.className = 'term-tip-body';
    b.textContent = text;
    tip.appendChild(b);
  } else if (text) {
    tip.textContent = text;
  }
  tip.hidden = false;
  if (tip.removeAttribute) tip.removeAttribute('hidden');
  // De term wijst NU pas naar het paneel: aria-describedby op een verborgen
  // element zou een schermlezer een beschrijving laten voorlezen die visueel
  // niet bestaat.
  if (term.setAttribute) term.setAttribute('aria-describedby', tip.id || 'term-tip');
  place(tip, term);
  if (tip.classList) {
    if (reducedMotion()) tip.classList.add('is-open', 'no-fade');
    else tip.classList.add('is-open');
  }
}

// Sluiten om redenen die BUITEN de term liggen: Escape, scrollen (het paneel
// zou meeschuiven met niets), en het wegklikken van de pagina. Eén keer
// bedraad, bij het eerste gebruik.
function wireGlobal() {
  if (wired) return;
  const d = doc();
  const w = win();
  if (!d || !d.addEventListener) return;
  wired = true;
  d.addEventListener('keydown', (e) => { if (e && e.key === 'Escape') hide(); });
  if (w && w.addEventListener) {
    w.addEventListener('scroll', hide, true);
    w.addEventListener('resize', hide);
  }
}

// Kap een lange definitie af op een woordgrens — zie MAX_LEN.
function short(text) {
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  if (s.length <= MAX_LEN) return s;
  const cut = s.slice(0, MAX_LEN);
  const sp = cut.lastIndexOf(' ');
  return (sp > MAX_LEN * 0.6 ? cut.slice(0, sp) : cut).trimEnd() + '…';
}

// DE ENIGE PUBLIEKE INGANG. Hangt de affordance en het tooltip-gedrag aan
// `node` en levert diezelfde node terug, zodat hij in een h()-boom kan staan:
//   explained(h('span', { text: label }), desc)
// Zonder uitleg gebeurt er niets — dat is de hele regel van deze laag.
export function explained(node, text, { kop = null, focusable = true } = {}) {
  const uitleg = short(text);
  // De native title van dit element wordt de kopregel — maar alleen als er
  // ook echt een paneel komt. Is er niets uit te leggen, dan verandert er
  // niets en houdt het element zijn gewone browser-tooltip.
  const eigenTitle = (node && node.getAttribute && node.getAttribute('title')) || '';
  const titel = short(kop || eigenTitle);
  if (!node || (!uitleg && !titel)) return node;
  if (eigenTitle && node.removeAttribute) node.removeAttribute('title');
  node.className = [node.className, 'has-tip'].filter(Boolean).join(' ');
  // Focusbaar, zodat de uitleg ook zonder muis te bereiken is. Geen `button`:
  // er valt niets te activeren — de term blijft tekst. `focusable: false` is
  // voor RIJEN (een voorwaarde-regel, een paneelrij): die zijn geen term, hun
  // termen zitten erin, en een extra tabstop per rij zou de tabvolgorde
  // verdubbelen zonder ergens nieuw naartoe te gaan.
  if (focusable && node.setAttribute && !node.getAttribute?.('tabindex')) {
    node.setAttribute('tabindex', '0');
  }
  wireGlobal();
  const open = (direct) => {
    clearTimeout(timer);
    if (direct) { show(node, uitleg, titel); return; }
    timer = setTimeout(() => show(node, uitleg, titel), HOVER_DELAY);
  };
  const dicht = () => {
    clearTimeout(timer);
    timer = null;
    if (node.removeAttribute) node.removeAttribute('aria-describedby');
    if (active === node) hide();
  };
  if (!node.addEventListener) return node;
  node.addEventListener('mouseenter', () => open(false));
  node.addEventListener('mouseleave', dicht);
  node.addEventListener('focus', () => open(true));
  node.addEventListener('blur', dicht);
  return node;
}

// Voor tests en voor een herrender die de pagina leegmaakt: alles dicht.
export function hideTip() { hide(); }
