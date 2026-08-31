// ODRL-AP-NL viewer — bron-autodetectie (DOM-vrij, fetch injecteerbaar).
//
// Eén generieke bron-ingang (?src=<URL>, herhaalbaar, en het "Bron
// toevoegen"-veld in doc.html): een URL kan een RDF-bestand (Turtle/JSON-LD)
// of een SPARQL-endpoint zijn. Detectie is gelaagd:
//   1. goedkope heuristieken (guessSourceKind): bestandsextensie wint als
//      "bestand", een /sparql- of /query-pad wint als "endpoint";
//   2. bij twijfel een ASK{}-probe (POST, sparql-results+json): een geldig
//      SPARQL-resultaat bewijst een endpoint;
//   3. anders GET + formaat-detectie op de inhoud (detectFormat in parse.js —
//      dezelfde route die de gewone laadpaden gebruiken).
// Detectievolgorde bij ambigue URLs (een endpoint dat op GET óók Turtle
// serveert): endpoint-detectie wint uitsluitend op EXPLICIETE signalen — een
// /sparql|/query-pad of een geslaagde ASK-probe. In alle andere gevallen telt
// de URL als bestand; wie zo'n atypisch endpoint wil laden, geeft het een
// /sparql-pad of gebruikt de probe (extensieloos pad zonder Turtle-antwoord).
//
// Foutonderscheid (CORS-valkuil): een endpoint zonder CORS laat élke fetch op
// netwerkniveau falen. Dat wordt gemeld als 'unreachable' ("bron niet
// bereikbaar (CORS?)"), onderscheiden van 'unsupported' (wel bereikbaar,
// geen herkenbaar formaat/endpoint).

import { detectFormat } from './parse.js';

// Pure heuristiek (node-getest): 'data' | 'sparql' | null (onbeslist).
export function guessSourceKind(url) {
  const clean = String(url || '').trim().replace(/[?#].*$/, '');
  if (!clean) return null;
  if (/\.(ttl|turtle|nt|jsonld|json)$/i.test(clean)) return 'data';
  if (/\/(sparql|query)$/i.test(clean)) return 'sparql';
  return null;
}

async function askProbe(url, fetchImpl) {
  const res = await fetchImpl(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-results+json',
    },
    body: 'query=' + encodeURIComponent('ASK {}'),
  });
  if (!res.ok) return false;
  try {
    const json = await res.json();
    return typeof json === 'object' && json !== null && typeof json.boolean === 'boolean';
  } catch { return false; }
}

// Detecteer en (voor bestanden) laad één bron.
// Resultaat: { kind: 'sparql', url }
//         of { kind: 'data', url, content, format }
//         of { kind: 'error', url, code: 'unreachable'|'unsupported', message }
export async function detectSource(url, fetchImpl) {
  const doFetch = fetchImpl || globalThis.fetch;
  const guess = guessSourceKind(url);
  if (guess === 'sparql') return { kind: 'sparql', url };

  let networkFailed = false;
  if (guess !== 'data') {
    // Onbeslist: eerst de ASK-probe (expliciet endpoint-signaal).
    try {
      if (await askProbe(url, doFetch)) return { kind: 'sparql', url };
    } catch { networkFailed = true; }
  }
  // Bestand (of onbeslist zonder geslaagde probe): GET + formaat-detectie.
  try {
    const res = await doFetch(url);
    if (!res.ok) {
      return { kind: 'error', url, code: 'unsupported', message: 'HTTP ' + res.status + ' bij ' + url };
    }
    const content = await res.text();
    const format = detectFormat(url, content);
    if (format === 'rdfxml') {
      return { kind: 'error', url, code: 'unsupported', message: 'formaat niet ondersteund (RDF/XML): ' + url };
    }
    return { kind: 'data', url, content, format };
  } catch (e) {
    // Zowel de (eventuele) probe als de GET faalde op netwerkniveau: meld
    // "niet bereikbaar (CORS?)" — onderscheiden van "geen geldig formaat".
    void networkFailed;
    return {
      kind: 'error', url, code: 'unreachable',
      message: 'bron niet bereikbaar (CORS of offline?): ' + url + ' — ' + e.message,
    };
  }
}

// Verwerk een lijst ?src=-waarden (volgorde behouden) tot databronnen +
// endpoints. Legacy: ?ttl= telt als 'data', ?sparql= als 'sparql' (aliassen
// blijven werken; de URL-sync schrijft alleen nog src=).
export async function partitionSources(urls, fetchImpl) {
  const data = [];
  const endpoints = [];
  const errors = [];
  for (const u of urls || []) {
    const r = await detectSource(u, fetchImpl);
    if (r.kind === 'sparql') endpoints.push(r.url);
    else if (r.kind === 'data') data.push({ name: u, url: u, content: r.content, format: r.format });
    else errors.push({ url: u, code: r.code, message: r.message });
  }
  return { data, endpoints, errors };
}
