// ODRL-AP-NL viewer — default-weergavenamen voor externe vocabulairetermen.
//
// Dit is een KOPPELTABEL (IRI -> i18n-key), geen labeltabel: de woorden zelf
// staan per taal in assets/i18n.js onder de `prop.*`-keys. Zo is er één
// stringtabel voor alles wat de viewer zelf zegt en kan een weergavenaam niet
// in één taal blijven hangen (audit-punt B16; de volledigheidstest bewaakt dat
// elke key hier in nl én en bestaat).
//
// De viewer volgt verder de registerfilosofie "labels als data": een
// predicaat/klasse krijgt zijn label uit rdfs:label/skos:prefLabel/dct:title in
// de geladen bronnen — registerfragmenten (labels-tooi.ttl, labels-brp.ttl,
// labels-tpl.ttl, …) of de odrl-ap-nl-ontologie doen dat al voor de NL-/BRP-/
// TOOI-/tpl-termen, en die route is óók meertalig: pickLabel kiest daar het
// literal in de actieve taal zodra het fragment een @en-variant draagt. Voor
// een paar veelgebruikte EXTERNE W3C-vocabulairetermen (dct:, skos:) ontbreekt
// zo'n label echter in alle standaardbronnen; zonder deze tabel valt de viewer
// voor die termen terug op de kale localName ("valid", "editorialNote") onder
// "Overige eigenschappen" — vooral zichtbaar in bronloze
// ?src=<endpoint>-modus (SPARQL), waar geen registerfragment-TTL meegeladen
// wordt.
//
// Alleen termen die daadwerkelijk kaal kunnen verschijnen staan hieronder
// (geverifieerd tegen testdata/brp-ap/*.ttl — buildModel + extraProps-scan);
// dit is bewust GEEN volledige DCMI/SKOS-vertaaltabel. Een bron-label wint
// altijd: deze tabel is puur de laatste terugval vóór localName.

export const DEFAULT_PROPERTY_LABEL_KEYS = {
  // De geldigheidsperiode op een document-/versienode. De EIGEN vorm is het
  // schema-PAAR schema:validFrom/validThrough (zie temporal.js); schema.org
  // publiceert geen rdfs:labels in een van onze bronnen, dus zonder deze twee
  // regels staat er in de weergave kaal "validFrom".
  'https://schema.org/validFrom': 'prop.schemaValidFrom',
  'https://schema.org/validThrough': 'prop.schemaValidThrough',
  // dct:valid + dcat:startDate/endDate — de TOLERANTE terugvalvorm (een
  // dct:PeriodOfTime-knoop). Blijft in de tabel zolang de viewer die vorm
  // leest: derden-data en niet-gemigreerde grafen tonen hem nog.
  'http://purl.org/dc/terms/valid': 'prop.dctValid',
  'http://www.w3.org/ns/dcat#startDate': 'prop.dcatStartDate',
  'http://www.w3.org/ns/dcat#endDate': 'prop.dcatEndDate',
  // dct:source — de HERKOMST van de verklaring: het besluit, het
  // configuratiebestand of de registerrij waar zij uit komt. De leesweergave
  // (doc.js) toont hem als "Bron" (field.origin); dit is de terugval elders
  // (bv. in de editor-app).
  'http://purl.org/dc/terms/source': 'prop.dctSource',
  // dpv:hasLegalBasis — de WETTELIJKE GRONDSLAG waarop een regel rust (DPV
  // 2.0). Sinds aug 2026 gescheiden van dct:source; doc.js toont hem als
  // "Grondslag" (field.legalBasis), hier staat de kale terugval.
  'https://w3id.org/dpv#hasLegalBasis': 'prop.dpvHasLegalBasis',
  // skos:editorialNote — redactionele kanttekening bij een begrip/term.
  'http://www.w3.org/2004/02/skos/core#editorialNote': 'prop.skosEditorialNote',
};
