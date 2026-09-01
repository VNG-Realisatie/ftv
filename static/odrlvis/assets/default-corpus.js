// ODRL viewer — het standaardcorpus van DEZE deployment (FTV-site).
//
// Deze site-kopie wijkt bewust af van de repo-versie in odrlvis: daar staan de
// bronbestanden los in ../data/, hier zijn ze samengevoegd tot drie bundels in
// data/ naast deze pagina's. Zonder URL-parameters laat de viewer het
// Vlierdam-voorbeeld zien; het Breda-voorbeeld hangt aan een ?src=-deeplink:
//
//   doc.html?src=data/gedeeld.ttl&src=data/vlierdam.ttl
//   doc.html?src=data/gedeeld.ttl&src=data/breda.ttl
//
// Het is demomateriaal plus vocabulairefragmenten — geen kerncode.

export const EXAMPLES_BASE = 'data/';

export const DEFAULT_EXAMPLES = [
  // Profielontologie (apnl:) plus de labelbundels voor ODRL-kernbegrippen en
  // TOOI-URI's, zodat de viewer "gemeente Vlierdam" toont in plaats van een code.
  'gedeeld.ttl',
  // Vlierdam: vocabulaire, velden, beleid en OpenFTV in vijf Sets.
  'vlierdam.ttl',
];

// AFWIJKING VAN DE REPO-VERSIE (site-kopie, FTV-site): daar staat de
// Comunica-bundel een niveau boven de viewer (`../comunica/`, want de pagina's
// zitten in viewer/); hier liggen doc.html en index.html náást comunica/.
export const COMUNICA_BASE = 'comunica/';
