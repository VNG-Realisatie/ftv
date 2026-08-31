// ODRL viewer — per-endpoint configuration for the SPARQL layer (data).
//
// The query builders in sparql.js are endpoint-agnostic: DEFAULT_EXCLUDE_GRAPHS
// is empty there. Knowledge about a particular endpoint — such as "this store
// mixes two granularities of the same policies in its union default graph" —
// belongs to the DEPLOYMENT and lives here as configuration.
//
// Precedence (excludeGraphsFor):
//   1. explicit ?exclude-graph=<IRI> query parameters (repeatable) win;
//   2. otherwise the first entry below whose `match` fits the endpoint URL;
//   3. otherwise no exclusion at all (flat patterns, works on any endpoint).
//
// The list is empty in this repository: the bundled Fuseki datasets need no
// exclusions. Add an entry when you point the viewer at a store that does.
// See viewer/README.md, "Live register via SPARQL".

export const SPARQL_ENDPOINT_DEFAULTS = [
  // Example of the shape an entry takes:
  // {
  //   match: /\/my-store\/(sparql|query)$/,
  //   excludeGraphs: ['urn:graph:duplicate-granularity'],
  // },
];

// Determine the graph exclusions for an endpoint. `explicit` is the list of
// ?exclude-graph= values from the URL (may be empty or absent).
export function excludeGraphsFor(endpoint, explicit) {
  if (explicit && explicit.length) return [...explicit];
  if (!endpoint) return [];
  const clean = String(endpoint).replace(/[?#].*$/, '');
  const hit = SPARQL_ENDPOINT_DEFAULTS.find((d) => d.match.test(clean));
  return hit ? [...hit.excludeGraphs] : [];
}
