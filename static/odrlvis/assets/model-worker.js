// Web Worker: parse + modelbouw off-thread (grote corpora; zie model-client.js).
//
// Ontvangt { sources, setScope } en antwoordt met:
//   { type: 'progress', phase, ... }   tijdens parse/modelbouw
//   { type: 'model', model, nav, scopedNav, errors, quadCount, timings,
//     prefixes }                       zodra het weergavemodel klaar is
//   { type: 'store', termText, termOffsets, quadTable }
//                                      daarna: de graaf voor de hoofddraad
//   { type: 'error', message }         bij een onverwachte fout
//
// Het model gaat vóór de graaf de deur uit zodat de eerste render niet op de
// (relatief dure) graaf-overdracht wacht. De worker-grens is schoon: het
// model/nav is structured-clone-baar (N3-termen verliezen hun prototype en
// reizen als kale { id }-handles; de enige consument daarvan op de hoofddraad
// — de graaf-inspecteur — hydrateert ze via termFromId, zie asTerm in
// model-client.js). De graaf zelf gaat als termtabel (één string + offsets,
// goedkope clone) + Uint32Array-quadtabel (transferable) over, waaruit de
// hoofddraad zijn eigen N3.Store in stukjes opbouwt (hydrateInto).
import { loadSources, scopeNavToSet, knownSourcePrefixes } from './parse.js';
import { setLang } from './i18n.js';

self.onmessage = (e) => {
  const { sources, setScope, lang } = e.data || {};
  try {
    // De worker bouwt het MODEL, en dat draagt labels + weergavewoorden: hij
    // moet dus dezelfde taal spreken als de pagina (audit-punt B16).
    setLang(lang);
    const result = loadSources(sources || [], (p) => self.postMessage({ type: 'progress', ...p }));
    // ?set=-scoping heeft de graaf nodig; die is hier — de hoofddraad krijgt
    // de gescopete nav kant-en-klaar mee.
    const scoped = setScope ? scopeNavToSet(result.nav, result.store, setScope) : null;
    self.postMessage({
      type: 'model',
      model: result.model,
      nav: result.nav,
      scopedNav: scoped ? scoped.nav : null,
      errors: result.errors,
      quadCount: result.quadCount,
      timings: result.timings,
      prefixes: knownSourcePrefixes(),
    });
    const quads = result.store.getQuads(null, null, null, null);
    const termIds = [];
    const index = new Map();
    const enc = (t) => {
      let i = index.get(t.id);
      if (i === undefined) { i = termIds.length; index.set(t.id, i); termIds.push(t.id); }
      return i;
    };
    const quadTable = new Uint32Array(quads.length * 4);
    let j = 0;
    for (const q of quads) {
      quadTable[j++] = enc(q.subject);
      quadTable[j++] = enc(q.predicate);
      quadTable[j++] = enc(q.object);
      quadTable[j++] = enc(q.graph);
    }
    const termOffsets = new Uint32Array(termIds.length + 1);
    for (let i = 0; i < termIds.length; i++) {
      termOffsets[i + 1] = termOffsets[i] + termIds[i].length;
    }
    const termText = termIds.join('');
    self.postMessage({ type: 'store', termText, termOffsets, quadTable },
      [quadTable.buffer, termOffsets.buffer]);
  } catch (err) {
    self.postMessage({ type: 'error', message: (err && err.message) || String(err) });
  }
};
