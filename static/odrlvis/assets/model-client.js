// Hoofddraad-kant van de parse/modelbouw-worker (model-worker.js).
//
// Grote corpora bevriezen de UI seconden lang wanneer n3-parse + modelbouw op
// de hoofddraad draaien (gemeten: één taak van ±10 s bij 588k triples vóór de
// optimalisaties, ±3 s erna). Dit module laat dat werk in een Web Worker doen
// en bouwt de hoofddraad-store daarna in stukjes op, zodat de pagina
// responsief blijft en voortgang kan tonen. Node-tests raken dit pad niet:
// zonder Worker (of onder de byte-drempel) blijft het synchrone
// loadSources-pad in gebruik.
import * as N3 from '../vendor/n3.esm.min.js';
import { registerPrefixes } from './parse.js';

const { Store, termFromId } = N3;

// Onder deze totale brongrootte is synchroon parsen sneller dan de
// worker-overhead (opstart + clone); ruim onder de ±100 ms-freezegrens.
export const WORKER_BYTE_THRESHOLD = 1_500_000;

export function totalSourceBytes(sources) {
  return (sources || []).reduce((n, s) => n + (s && s.content ? s.content.length : 0), 0);
}

export function useWorkerFor(sources) {
  return typeof Worker !== 'undefined' && totalSourceBytes(sources) > WORKER_BYTE_THRESHOLD;
}

export function createStore() { return new Store(); }

// Draai loadSources in de worker. Resolvet met het model-bericht (zie
// model-worker.js) zodra het weergavemodel er is; de graaf-overdracht volgt
// daarna via `onStore(payload)` (payload null wanneer de overdracht faalde —
// de aanroeper laat de store dan leeg in plaats van te blokkeren).
// Bron-prefixen worden meteen ook hier geregistreerd zodat curie() op de
// hoofddraad dezelfde afkortingen kent.
export function loadSourcesInWorker(sources, { setScope = null, lang = null, onProgress = null, onStore = null } = {}) {
  return new Promise((resolve, reject) => {
    let worker;
    try {
      worker = new Worker(new URL('./model-worker.js', import.meta.url), { type: 'module' });
    } catch (e) { reject(e); return; }
    let modelSeen = false;
    const fail = (message) => {
      worker.terminate();
      if (modelSeen) { if (onStore) onStore(null); } // model is er al: niet meer rejecten
      else reject(new Error(message));
    };
    worker.onerror = (e) => fail(e && e.message ? e.message : 'worker kon niet starten');
    worker.onmessage = (ev) => {
      const msg = ev.data || {};
      if (msg.type === 'progress') { if (!modelSeen && onProgress) onProgress(msg); return; }
      if (msg.type === 'model') {
        modelSeen = true;
        registerPrefixes(msg.prefixes);
        resolve(msg);
        return;
      }
      if (msg.type === 'store') {
        worker.terminate(); // klaar: geheugen van de worker-store meteen vrij
        if (onStore) onStore(msg);
        return;
      }
      if (msg.type === 'error') fail(msg.message);
    };
    worker.postMessage({ sources, setScope, lang });
  });
}

// Vul een (lege) N3.Store uit de graaf-overdracht, in stukjes
// (setTimeout-slices) zodat de hoofddraad responsief blijft; resolvet als de
// store vol is. De termtabel komt als één string + offsets binnen (goedkope
// clone); de losse term-id's worden hier pas — chunk voor chunk — uitgesneden.
export function hydrateInto(store, { termText, termOffsets, quadTable }, { chunkSize = 25000, onProgress = null } = {}) {
  const terms = new Array(termOffsets.length - 1);
  const term = (ix) => {
    let t = terms[ix];
    if (t === undefined) {
      t = termFromId(termText.substring(termOffsets[ix], termOffsets[ix + 1]));
      terms[ix] = t;
    }
    return t;
  };
  const totalQuads = quadTable.length / 4;
  return new Promise((resolve) => {
    let i = 0;
    const step = () => {
      const end = Math.min(totalQuads, i + chunkSize);
      for (; i < end; i++) {
        store.addQuad(term(quadTable[i * 4]), term(quadTable[i * 4 + 1]),
          term(quadTable[i * 4 + 2]), term(quadTable[i * 4 + 3]));
      }
      if (onProgress) onProgress(i, totalQuads);
      if (i < totalQuads) setTimeout(step, 0);
      else resolve(store);
    };
    step();
  });
}

// Een model uit de worker draagt kale { id }-handles waar op de hoofddraad
// N3-termen stonden (structured clone verliest het prototype). De inspecteur
// is de enige plek die echte termen nodig heeft: normaliseer daar.
export function asTerm(termOrIri) {
  if (termOrIri && typeof termOrIri === 'object' && !termOrIri.termType
      && typeof termOrIri.id === 'string') {
    return termFromId(termOrIri.id);
  }
  return termOrIri;
}
