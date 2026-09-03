// ODRL-AP-NL viewer — temporele versie-container-declaratie (data, gedeeld).
//
// Eén definitie voor BEIDE consumenten: parse.js (modelbouw:
// readTemporalContainers) en sparql.js (querybouwers: memberUnion,
// listSkeletonTurtle). Voorheen stond de lidmaatschaps-mapping dubbel — in
// TEMPORAL_VOCABS (parse.js) én hardcoded in de SPARQL-strings — en konden
// beide uiteenlopen (audit-punt B13).
//
// Versionering-als-containers: een lichtgewicht knoop groepeert de versies van
// één beleid; de container is GEEN policy maar een groeperingsknoop.
//
// HET EIGEN MODEL (definitief, aug 2026 — zie sections/versioning.md) is
// PROV/DCT en NIETS anders:
//   <versie> prov:specializationOf <versieloze identiteit> ;   # lidmaatschap
//            prov:wasRevisionOf   <vorige versie> ;            # opvolging
//            dct:issued        "…"^^xsd:date ;                 # uitgifte
//            schema:validFrom  "…"^^xsd:date ;                 # ingang
//            schema:validThrough "…"^^xsd:date .               # einde (alleen
//                                                              # op VERVALLEN
//                                                              # versies)
// De hele registerketen (brp-odrl, brp-ap-nl) schrijft dat patroon; alle drie
// de SPARQL-stores zijn erop gemigreerd.
//
// WAT HIER NIET MEER STAAT — en waarom: de leesroutes van het STOPGEZETTE
// ODRL Temporal Profile (tpl:TemporalSet/-Policy/-Offer/-Agreement,
// tpl:effectiveFrom/To) en het draft-lidmaatschap pav:hasVersion /
// dct:hasPart. Ze zijn geschrapt na een corpus-brede telling: in de 311
// bestanden van testdata/wild/ komt GEEN ENKELE tpl-triple, geen
// pav:hasVersion en geen dct:hasPart-als-versielidmaatschap voor (de vier
// hasPart-treffers daar zijn `odrl:hasPart` als constraint-OPERATOR — een
// heel ander predicaat), en de stores tellen er 0. Het waren dus dode
// UNION-takken in elke query en dode kandidaat-lussen in elke modelbouw.
// Blijft een derde partij ooit tpl schrijven, dan is dat één extra regel in
// deze tabel plus examples/labels-tpl.ttl als registerfragment — geen herbouw.
//
// WAT WEL BLIJFT als tweede route: het document-patroon uit het ODRL-CG-besluit
// ("Policy is attached to a document, which has the temporal data"). LET OP het
// onderscheid: het CG-besluit legt alleen het PATROON vast en noemt géén
// vocabulaire; dat wij schema:validFrom (en als terugval dct:valid) op de
// documentnode als temporele data lezen is ónze werkversie-/toolingkeuze en
// per regel verwisselbaar.
//
// Dit bestand is bewust dependency-vrij (geen import van parse.js), zodat de
// SPARQL-laag er zonder N3-vendor bij kan.

const ODRL = 'http://www.w3.org/ns/odrl/2/';
const DCT = 'http://purl.org/dc/terms/';
const DCAT = 'http://www.w3.org/ns/dcat#';
const PROV = 'http://www.w3.org/ns/prov#';
// schema.org met HTTPS-namespace. Dat is de vorm die schema.org zelf sinds
// 2019 canoniek uitgeeft (de http://-variant blijft als alias bestaan); de
// registerketen schrijft https:. Wie derden-data met de http-vorm inleest,
// leest die niet als geldingspaar — dat is bewust: één vorm per bewering,
// en de tolerante terugvallen hieronder vangen zulke data alsnog op.
const SCHEMA = 'https://schema.org/';

// Containerklasse van de SKELET-graaf uit de lijst-SELECT (sparql.js). Bewust
// een EIGEN urn: en geen vocabulaireterm: de skelet-graaf is een viewer-intern
// tussenformaat, geen bewering over de brondata, en zo kan de marker nooit
// botsen met een echte triple. (Stond hier tot aug 2026 als tpl:TemporalSet —
// dat typeerde skeletcontainers met een term uit een stopgezet profiel dat in
// de brondata niet meer voorkomt.) Zie SKELETON_MEMBER_PRED hieronder: het
// LIDMAATSCHAP in het skelet is wél gewoon de echte term.
export const SKELETON_CONTAINER_CLASS = 'urn:odrl-ap-nl:viewer:versionContainer';

// Datering op de VERSIEZIJDE. Twee rollen tegelijk:
//   1. containerherkenning — een node is pas een versiecontainer wanneer de
//      versie die er met prov:specializationOf naar wijst ook echt gedateerd
//      is (anders is specializationOf gewoon een abstractie-relatie);
//   2. stub-herkenning — een lid zonder odrl-type dat wél datering draagt is
//      een DOCUMENTVERSIE (/brp-ap publiceert vervangen besluitversies zo).
// Zelfde lijst in de SPARQL-laag (versietelling), afgeleid uit deze constante.
export const VERSION_DATING_PREDS = [
  DCT + 'issued', SCHEMA + 'validFrom', DCT + 'valid', PROV + 'wasRevisionOf',
];

export const TEMPORAL_VOCABS = [
  {
    id: 'prov',
    // GEEN vocabulaire-containerklasse meer: containerschap volgt uit het
    // PROV-patroon (zie inverseMemberPreds + requireVersionDating), niet uit
    // een rdf:type. De enige klasse die nog telt is de viewer-interne
    // skeletmarker — die typeert containers in de lijst-SELECT-skeletgraaf,
    // waar de zusterversies (en dus hun datering) nog niet mee zijn gekomen.
    containerClasses: [SKELETON_CONTAINER_CLASS],
    // Lidmaatschap staat op de VERSIE en wijst naar de container; de
    // modelbouw volgt hem dus invers. Voorwaartse routes zijn er niet meer:
    // dct:hasPart is te generiek om versielidmaatschap uit af te leiden (in
    // het /odrl-register is het uitsluitend de registerwortel die er zijn
    // 2.622 besluit-identiteiten mee opsomt — nul policies).
    memberPreds: [],
    inverseMemberPreds: [PROV + 'specializationOf'],
    // Containers worden niet op hun klasse herkend maar op het patroon: ≥1
    // policy wijst er met prov:specializationOf naar ÉN die versiezijde
    // draagt datering (VERSION_DATING_PREDS).
    requireTemporalData: false,
    requireVersionDating: true,
  },
  {
    id: 'document',
    // CG-document-patroon: geen klasse-eis; een node is container wanneer hij
    // policies opsomt (odrl:hasPolicy) ÉN zelf temporele data draagt. Dat
    // "temporele data" schema:validFrom of dct:valid is (en dct:issued alleen
    // bewust NIET — anders zou elke beleidspublicatie (?set=) een
    // versie-container worden) is onze detectieheuristiek, geen
    // CG-voorschrift.
    containerClasses: null,
    memberPreds: [ODRL + 'hasPolicy', DCAT + 'hasPolicy'],
    inverseMemberPreds: [],
    requireTemporalData: true,
    requireVersionDating: false,
  },
];

// Temporele data op de CONTAINER/het document zelf (CG-document-patroon), en
// tegelijk de terugval-geldigheid voor versies die zelf niets dateren.
export const TEMPORAL_DOC_PREDS = [SCHEMA + 'validFrom', DCT + 'valid'];

// --- Geldingsperiode: het schema.org-PAAR -------------------------------------
// De EIGEN vorm van de geldingsperiode (besluit Michiel, aug 2026) is een PAAR
// van twee platte datumliterals op de versie zelf — geen knoop, geen string om
// te ontleden:
//   <versie> schema:validFrom    "2024-11-01"^^xsd:date ;
//            schema:validThrough "2026-02-01"^^xsd:date .   # alleen VERVALLEN
// Elke versie draagt schema:validFrom; schema:validThrough staat ALLEEN op een
// versie die vervallen is. Een LOPENDE versie laat hem gewoon weg — geen
// ".."-sentinel, geen open-einde-conventie om af te spreken, en "is deze versie
// nog geldend?" is één ASK op de afwezigheid van één triple.
//
// WAAROM DIT PAAR EN NIET DE PERIODEKNOOP. Tot aug 2026 stond hier
// dct:valid -> [ a dct:PeriodOfTime ; dcat:startDate … ; dcat:endDate … ]. Die
// vorm was machineleesbaar maar duur in gebruik: elke datum kostte een extra
// hop over een blanke knoop, in SPARQL een geneste OPTIONAL, in het
// detail-CONSTRUCT een eigen tak om de knoop überhaupt mee te krijgen, en in
// elke graafweergave een tussenknoop zonder eigen betekenis. Het paar zet de
// twee datums waar ze horen: op de versie.
//
// RANGORDE BIJ HET LEZEN (readValidity in parse.js), van sterk naar zwak:
//   1. het SCHEMA-PAAR op de node zelf (schema:validFrom/validThrough) — de
//      eigen vorm; hij WINT altijd, ook als de node daarnaast nog een
//      dct:valid draagt (een bron kan halverwege een migratie staan);
//   2. de DCAT-PERIODEKNOOP achter dct:valid (dcat:startDate/endDate) —
//      tolerante terugval voor derden-data en voor grafen die nog niet
//      gemigreerd zijn;
//   3. de LITERAL achter dct:valid — een DCMI-periodestring
//      ("start=…; end=…;"), een ISO-interval ("2014-01-06/..") of een kale
//      datum. dct:valid is een DCMI-term met een eigen encoding-schema, en het
//      CG-documentpatroon kan hem gewoon als string dragen; die data mag niet
//      onzichtbaar worden.
// Die volgorde is bewust en niet "eerste de beste wint": een bron die tijdens
// een migratie beide vormen draagt moet de eigen vorm te zien krijgen.
export const SCHEMA_VALID_FROM = SCHEMA + 'validFrom';
export const SCHEMA_VALID_THROUGH = SCHEMA + 'validThrough';
// Terugval-vocabulaire (tolerantie, zie rangorde hierboven).
export const PERIOD_CLASS = DCT + 'PeriodOfTime';
export const PERIOD_START_PRED = DCAT + 'startDate';
export const PERIOD_END_PRED = DCAT + 'endDate';
export const VALIDITY_PRED = DCT + 'valid';

// De skelet-graaf uit de lijst-SELECT (sparql.js) legt het lidmaatschap met de
// ECHTE term: versie -> container, dezelfde richting als in de brondata. Alleen
// de containerklasse is een eigen marker (zie boven) — die is nodig omdat het
// skelet per rij maar één versie meebrengt en de PROV-patroonherkenning anders
// van de datering van juist die ene versie zou afhangen.
export const SKELETON_MEMBER_PRED = PROV + 'specializationOf';

// Versietelling uit de lijst-SELECT: hoevéél versies de container in de VOLLE
// graaf heeft. Nodig omdat het skelet per lijstrij maar ÉÉN lid meebrengt (de
// getoonde versie) en de historische zusterversies pas met het detail-CONSTRUCT
// binnenkomen — zonder deze telling kan een ingeklapte kaart niet weten of er
// überhaupt iets te bladeren valt. Bewust een EIGEN urn-predicaat en geen
// bestaande vocabulaireterm: dit is een viewer-intern skeletfeit, geen bewering
// over de brondata, en zo kan het nooit botsen met een echte triple.
export const SKELETON_COUNT_PRED = 'urn:odrl-ap-nl:viewer:skeletonVersionCount';
