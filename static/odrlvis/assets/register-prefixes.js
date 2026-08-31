// ODRL-AP-NL viewer — default-registerfragment: prefixafkortingen (data).
//
// Dit is DATA, geen code: een kleine prefixtabel die de viewer bij het
// opstarten via registerPrefixes() (parse.js) registreert, net zoals
// @prefix-declaraties uit geladen Turtle-bronnen geregistreerd worden.
//
// Waarom nodig: de vaste PREFIXES-tabel in parse.js bevat sinds de
// opschoning (audit-punt C2) alleen nog W3C/kern- en profielprefixen; de
// NL-/BRP-afkortingen hieronder komen normaal uit de @prefix-declaraties van
// de geladen bronnen. In pure ?src=<endpoint>-modus (SPARQL) is er echter
// géén Turtle-bron met declaraties — een detail-CONSTRUCT levert alleen de
// query-prefixen op. Dit fragment vult dat gat, als data-bestand dat per
// register/inzet vervangen kan worden. Bron-declaraties winnen niet (eerste
// registratie wint, zie registerPrefixes), maar zijn identiek.

export const DEFAULT_REGISTER_PREFIXES = {
  // NL-overheid (TOOI-identifiers en wetten.overheid.nl)
  tooi: 'https://identifier.overheid.nl/tooi/id/',
  gem: 'https://identifier.overheid.nl/tooi/id/gemeente/',
  oorg: 'https://identifier.overheid.nl/tooi/id/oorg/',
  bwb: 'https://wetten.overheid.nl/',
  // BRP-register (brp-odrl)
  brp: 'https://data.rijksoverheid.nl/brp/def#',
  brprub: 'https://data.rijksoverheid.nl/brp/rubriek/',
  brpafn: 'https://data.rijksoverheid.nl/brp/afnemer/',
  brpaut: 'https://data.rijksoverheid.nl/brp/autorisatie/',
  // BRP-AP-NL-register (landelijke drietraps-dataset op het /brp-ap-endpoint)
  apaanbod: 'https://data.rijksoverheid.nl/brp/ap-nl/aanbod/',
  apovk: 'https://data.rijksoverheid.nl/brp/ap-nl/overeenkomst/',
  apdoel: 'https://data.rijksoverheid.nl/brp/ap-nl/doel/',
};
