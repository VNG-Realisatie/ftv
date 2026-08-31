// ODRL-AP-NL viewer — taalregime (audit-punt B16).
//
// Twee onafhankelijke dingen, bewust in één module omdat ze dezelfde
// taalinstelling delen:
//
//   1. `pickLabel(literals, lang)` — de taalvoorkeur voor DATA-labels
//      (rdfs:label/skos:prefLabel/dct:title uit de geladen graaf). Eén
//      centrale functie; parse.js gebruikt hem overal waar een literal
//      gekozen wordt, zodat er nergens losse if-jes op `language === 'nl'`
//      kunnen ontstaan.
//   2. `t(key, vars)` — de stringtabel voor de UI-CHROME (sectiekoppen,
//      badges, knoppen, foutmeldingen). Alles wat de viewer zélf zegt staat
//      hier; alles wat het REGISTER zegt komt uit de data.
//
// Uitdrukkelijk NIET vertaald: registerdata. Afnemersnamen, doelformuleringen
// en besluittitels zijn de facto eigennamen; in EN-modus verschijnt daarvan
// het best-beschikbare label — meestal het Nederlandse. Dat is bewust en
// eerlijk: een verzonnen Engelse vertaling van "Gemeente Tilburg" of
// "Uitvoering Participatiewet" zou een bron suggereren die er niet is.
//
// Datumnotatie blijft in beide talen dd-mm-jjjj (registerconventie, zie
// versionNavDate in parse.js). Getallen volgen wél de taal (1.392 / 1,392):
// dat is chrome, geen registerwaarde.
//
// DOM-vrij en zonder imports, dus bruikbaar in parse.js (ook in de worker) en
// in de node-tests.

export const LANGS = ['nl', 'en'];
export const DEFAULT_LANG = 'nl';

// Terugvalketen per taal. Voluit als voorkeursvolgorde (zie rankOf):
//   nl:  @nl -> @nl-* -> taal-loos -> @en -> @en-* -> rest
//   en:  @en -> @en-* -> taal-loos -> @nl -> @nl-* -> rest
const FALLBACK = { nl: ['nl', 'en'], en: ['en', 'nl'] };

// Locale voor getalopmaak (scheidingstekens). Bewust apart van de taalcode:
// de datumnotatie blijft register-conventie, alleen getallen volgen de taal.
const NUM_LOCALE = { nl: 'nl-NL', en: 'en-GB' };

let current = DEFAULT_LANG;

export function normalizeLang(l) {
  const s = String(l || '').toLowerCase().split('-')[0];
  return LANGS.includes(s) ? s : DEFAULT_LANG;
}

// Zet de actieve taal. Module-globaal en bewust zo: elke render leest hem,
// en een taalwissel is een volledige herrender (doc.js) — geen taal-parameter
// door honderd functies heen rijgen.
export function setLang(l) {
  current = normalizeLang(l);
  return current;
}

export function getLang() { return current; }

// Getalopmaak in de actieve taal (1.392 / 1,392).
export function num(n, lang = current) {
  if (typeof n !== 'number' || !Number.isFinite(n)) return String(n);
  return n.toLocaleString(NUM_LOCALE[lang] || NUM_LOCALE[DEFAULT_LANG]);
}

// Sorteervergelijking in de actieve taal (localeCompare-collatie).
export function collate(a, b, lang = current) {
  return String(a || '').localeCompare(String(b || ''), lang);
}

// --- 1. Taalvoorkeur voor data-labels ---------------------------------------

// Rangorde van één taalmarkering binnen de voorkeursvolgorde: lager = beter.
// Geëxporteerd omdat ook sparql.js ermee kiest (de SELECT-index levert rauwe
// bindings, geen RDF-termen).
export function langRank(tag, lang = current) {
  return rankOf(tag, lang);
}

function rankOf(tag, lang) {
  const t = String(tag || '').toLowerCase();
  const chain = FALLBACK[lang] || FALLBACK[DEFAULT_LANG];
  const primary = chain[0];
  if (t === primary) return 0;
  if (t.startsWith(primary + '-')) return 1;
  if (t === '') return 2;                       // taal-loos literal
  for (let i = 1; i < chain.length; i++) {
    if (t === chain[i]) return 1 + i * 2;       // @en in nl-modus: 3
    if (t.startsWith(chain[i] + '-')) return 2 + i * 2;
  }
  return 1 + chain.length * 2;                  // een taal buiten de keten
}

// Kies uit een reeks RDF-termen (of {language, value}-objecten) de waarde die
// het best bij `lang` past. Bij gelijke rang wint de EERSTE — de volgorde
// waarin de graaf de literals oplevert is dan de tiebreak, precies zoals
// vóór dit taalregime.
export function pickLabel(terms, lang = current) {
  let best = null;
  let bestRank = Infinity;
  for (const t of terms || []) {
    if (!t || (t.termType && t.termType !== 'Literal')) continue;
    if (typeof t.value !== 'string') continue;
    const r = rankOf(t.language, lang);
    if (r < bestRank) { bestRank = r; best = t; }
    if (r === 0) break;
  }
  return best ? best.value : null;
}

// --- 2. Stringtabel voor de UI-chrome ---------------------------------------
//
// Vorm van een waarde:
//   'tekst met {var}'                 — enkelvoudige string
//   { one: '…', other: '… {n} …' }    — meervoudsvorm, gekozen op vars.n
// Placeholders zijn {naam} en worden letterlijk vervangen; {n} wordt door
// num() opgemaakt tenzij vars.n al een string is.
//
// De unit-test bewaakt: elke key in beide talen, geen lege strings, en per
// key dezelfde placeholder-verzameling in nl en en.

const STRINGS = {
  nl: {
    // -- Taalkiezer
    'lang.aria': 'Taal van de weergave',
    'lang.nl': 'NL',
    'lang.en': 'EN',

    // -- Regeltypen: badgewoord op de regel-rij (de CSS-klasse blijft de
    //    neutrale sleutel: toestemming/verbod/duty/aanbod). De regelsoort is
    //    uitsluitend het ODRL-type; het DOEL van een permission is geen soort
    //    maar een voorwaarde (chip + veld) en een groepeerdimensie.
    'rule.permission': 'toestemming',
    'rule.prohibition': 'verbod',
    'rule.duty': 'verplichting',
    'rule.offer': 'aanbod',
    // odrl:inheritFrom — de OUDER-laag. Bewust een ander woord dan "aanbod":
    // doorwerking (gedeelde regel-IRI) en overerving (verwijzing naar een
    // ouderpolicy) zijn twee verschillende dingen.
    'rule.inherited': 'geërfd',
    // -- Telwoorden per regeltype ("Uit het aanbod (4 verplichtingen, 1 toestemming)")
    'noun.permission': { one: '{n} toestemming', other: '{n} toestemmingen' },
    'noun.prohibition': { one: '{n} verbod', other: '{n} verboden' },
    'noun.duty': { one: '{n} verplichting', other: '{n} verplichtingen' },

    // -- Titel-terugval van een regel zonder eigen naam
    'title.permission': 'Toestemming',
    'title.prohibition': 'Verbod',
    'title.duty': 'Verplichting',

    // -- Secties
    'section.offers': 'Aanbod',
    'section.agreements': 'Overeenkomsten',
    // odrl:Request krijgt sinds aug 2026 een EIGEN top-sectie naast Aanbod en
    // Overeenkomsten: ook een verzoek dat (nog) niet beantwoord is hoort
    // zichtbaar te zijn, en dat kan niet als het alleen als regel op een
    // overeenkomst-kaart bestaat.
    'section.requests': 'Verzoeken',
    'section.sets': 'Beleidssets',
    'section.machinePolicy': 'Machine-uitvoerbaar beleid',
    'section.looseAgreements': 'Overeenkomsten (aanbod niet in graaf)',

    // -- Soort-pillen en navigatierollen
    'kind.offer': 'Aanbod',
    'kind.agreement': 'Overeenkomst',
    'kind.set': 'Set',
    // odrl:Request — ODRL-kernvocabulaire: de AANVRAAG die tot een
    // overeenkomst leidt. Een verzoek is qua weergave een set, maar de eigen
    // pil zegt meteen wat voor soort beleidsstuk je voor je hebt.
    'kind.request': 'Verzoek',
    'role.offer': 'Aanbod',
    'role.agreement': 'Overeenkomst',
    'role.policySet': 'Beleidsset',
    'role.version': 'Versie',
    'role.group': 'Groep',
    'role.bundle': 'Bundel',
    'role.artifact': 'Artefact',
    'nav.permissionN': 'Toestemming {n}',
    'nav.versionsSuffix': { one: '{n} versie', other: '{n} versies' },

    // -- Veldlabels
    'field.assignee': 'Afnemer',
    'field.assigner': 'Aanbieder',
    'field.action': 'Actie',
    'field.purpose': 'Doel',
    // odrl:source van een collectie: de verzameling waaruit zij snijdt. Bewust
    // niet "Vindplaats" (dat is prov:hadPrimarySource, papier).
    'field.source': 'Bron',
    // dct:title van een regel, getoond als VELD zodra de rij zelf naar zijn
    // plek in een groep genoemd is (dan is de titel niet meer de kop).
    'field.title': 'Titel',
    // Dit kopje benoemt de PROPERTY odrl:target, niet de klasse odrl:Asset —
    // vandaar "doelobject" en niet "informatieobject" (beslissing eigenaar).
    // "Doel" alleen kon niet: dat is het veld van de doelbinding
    // (field.purpose). Het vroegere "Gegevens" was een eigen benaming die de
    // ODRL-term onzichtbaar maakte.
    'field.target': 'Doelobjecten',
    // Klassevocabulaire voor odrl:Asset/AssetCollection, voor plekken die een
    // KLASSENAAM nodig hebben (niet dit target-kopje).
    'term.asset': 'informatieobject',
    'term.assets': 'informatieobjecten',
    'term.assetCollection': 'informatieobjectcollectie',
    'field.dataset': 'Dataset',
    'field.issued': 'Uitgegeven',
    'field.replaces': 'Vervangt',
    'field.derivedFrom': 'Afgeleid van',
    'field.fulfilsOffer': 'Vult aanbod in',
    'field.profile': 'Profiel',
    // Grondslag (dpv:hasLegalBasis): de wet of het artikel waarop de regel
    // rust. Bron (dct:source): waar de VERKLARING zelf vandaan komt — het
    // besluit, het configuratiebestand, de registerrij. Tot aug 2026 droeg
    // dct:source beide betekenissen; sindsdien alleen de tweede.
    'field.legalBasis': 'Grondslag',
    'field.origin': 'Bron',
    // Vindplaats (prov:hadPrimarySource) is iets ANDERS dan die twee: niet de
    // wet waarop de regel rust en niet het stuk waar hij uit komt, maar de plek
    // in het besluitdocument waar hij staat — met paginanummer waar de bron
    // die kent.
    'field.sourceLocation': 'Vindplaats',
    // Kenmerk (dct:identifier): het documentkenmerk van het besluit.
    'field.reference': 'Kenmerk',
    // Verzoek (odrl:Request achter prov:wasDerivedFrom): de aanvraag waaruit
    // deze overeenkomst voortkwam — kenmerk, datum en indiener op één regel.
    'field.request': 'Verzoek',
    'request.title': 'Het verzoek waaruit deze overeenkomst voortkwam',
    'request.by': 'ingediend door {who}',
    // Request→Offer (note §4, derde regel van de betekenistabel): een
    // prov:wasDerivedFrom van een odrl:Request naar een odrl:Offer BETEKENT
    // "het verzoek vraagt dit aanbod aan" — geen generieke herkomst. Zelfde
    // route als "Vult aanbod in" (Agreement→Offer), eigen zin.
    'askOffer.line': 'vraagt {offer} aan',
    'askOffer.title': 'Het aanbod dat dit verzoek aanvraagt',
    'askOffer.explore': 'Verken het aangevraagde aanbod',
    // De OMGEKEERDE link van de Verzoek-regel: op de verzoek-kaart staat de
    // overeenkomst waarin op het verzoek BESLIST is. Ontbreekt die, dan blijft
    // de regel gewoon weg — er wordt GEEN afwijzing uit afgeleid, want die
    // kent de graaf niet.
    //
    // Bewoording: het register schrijft zelf "Op dit verzoek is beslist in
    // ‹besluit›". "Beantwoord door" leest als een PARTIJ die antwoordt,
    // terwijl het onderwerp hier een besluit is; het idioom van de bron wint.
    'decidedIn.line': 'beslist in {agreement}',
    'decidedIn.title': 'De overeenkomst waarin op dit verzoek is beslist',
    'decidedIn.explore': 'Verken de overeenkomst waarin is beslist',
    // Kruisverwijzing naar een kaart elders op de pagina (Verzoek-regel op de
    // overeenkomst-kaart, "beslist in" op de verzoek-kaart).
    'jump.toRequest': 'Toon dit verzoek in de Verzoeken-sectie',
    'jump.toAgreement': 'Toon deze overeenkomst in de Overeenkomsten-sectie',
    // Weergavenamen voor externe vocabulairetermen zonder label in de bronnen
    // (koppeling IRI -> key: assets/register-labels.js).
    'prop.schemaValidFrom': 'geldig vanaf',
    'prop.schemaValidThrough': 'geldig tot en met',
    'prop.dctValid': 'geldig (periode)',
    'prop.dcatStartDate': 'begindatum',
    'prop.dcatEndDate': 'einddatum',
    'prop.dctSource': 'bron',
    'prop.dpvHasLegalBasis': 'grondslag',
    'prop.skosEditorialNote': 'redactionele notitie',
    // DE VELDNAMEN VAN HET ARTEFACTFORMULIER STAAN HIER NIET MEER (aug 2026).
    // Entrypoint, sha256, Download, Bevat, Programmeertaal, Formaat, Broncode
    // en Noot komen sinds de shape-gedreven formulieren uit sh:name@nl/@en in
    // data/shapes/formulier-artefact.ttl — het formulier komt uit de spec, dus
    // ook zijn labels. Zie assets/forms.js en Visualisation Note §8.
    'head.constraints': 'Voorwaarden',
    'head.duties': 'Verplichtingen',
    // odrl:consequence hoort bij een DUTY en treedt in werking als die
    // verplichting niet wordt nagekomen (ODRL 2.2 §2.6.4). Het kopje zegt dat
    // expliciet: "Gevolg" alleen zou als "en dan gebeurt dit" gelezen worden.
    'head.consequences': 'Gevolg bij niet-naleving',
    'head.otherProps': 'Overige eigenschappen',
    'head.accessPoints': 'Toegangspunten',

    // -- Versiestatus (neutrale enum in model + CSS, woord hier)
    'status.current': 'geldend',
    'status.future': 'toekomstig',
    'status.superseded': 'vervallen',
    'status.terminated': 'beëindigd',
    'lifecycle.active': 'actief',
    'lifecycle.terminated': 'beëindigd',
    'lifecycle.future': 'toekomstig',
    'lifecyclePlural.active': 'actieve',
    'lifecyclePlural.terminated': 'beëindigde',
    'lifecyclePlural.future': 'toekomstige',

    // -- ODRL 2.2-kernoperatoren (zinwoorden)
    'op.eq': 'is gelijk aan',
    'op.neq': 'is niet gelijk aan',
    'op.gt': 'is groter dan',
    'op.gteq': 'is groter dan of gelijk aan',
    'op.lt': 'is kleiner dan',
    'op.lteq': 'is kleiner dan of gelijk aan',
    'op.isA': 'is een',
    'op.hasPart': 'bevat',
    'op.isPartOf': 'maakt deel uit van',
    'op.isAllOf': 'is alle van',
    'op.isAnyOf': 'is één van',
    'op.isNoneOf': 'is geen van',

    // -- ODRL 2.2-kern-leftOperands
    'left.purpose': 'doel',
    'left.dateTime': 'tijdstip',
    'left.count': 'aantal',
    'left.spatial': 'locatie',
    'left.delayPeriod': 'wachttijd',
    'left.elapsedTime': 'verstreken tijd',
    'left.event': 'gebeurtenis',
    'left.recipient': 'ontvanger',
    'left.media': 'medium',

    // -- Logische samenstellingen
    'logical.and': ' én ',
    'logical.andSequence': ' én daarna ',
    'logical.or': ' óf ',
    'logical.xone': ' óf ',
    'logical.xonePrefix': 'precies één van: ',
    'logicalHead.and': 'alle van',
    'logicalHead.andSequence': 'alle van, in volgorde',
    'logicalHead.or': 'één van',
    'logicalHead.xone': 'precies één van',

    // -- Naamloze/onbekende waarden
    'anon': '(anoniem)',
    'anonTyped': '(anonieme {type})',
    'anonAction': '(anonieme actie)',
    'anonNode': '(anonieme node)',
    'noPurpose': '(geen doel)',
    'unknownQuantity': '(onbekende grootheid)',
    'unknownOperator': '(operator?)',
    'unknownValue': '(waarde?)',
    'valuesTruncated': '… ({n} waarden)',

    // -- Voorwaarde-chips
    'slot.leftMissing': 'grootheid ontbreekt',
    'slot.operatorMissing': 'operator ontbreekt',
    'slot.valueMissing': 'waarde ontbreekt',
    'slot.missingTitle': '{pred} ontbreekt op deze voorwaarde.',
    'slot.unknownProps': ' Wel aanwezig maar niet herkend: ',
    'constraint.compound': 'Samengestelde voorwaarde',
    'constraint.foldSummary': { one: '{label} — {head} ({n} voorwaarde)', other: '{label} — {head} ({n} voorwaarden)' },
    'conforms.left': 'verwerkingsverzoek',
    'conforms.op': 'moet voldoen aan',

    // -- Dekking: een knoop verklaart de uitwerking van deze regel te zijn.
    // Bewust NIET meer "technisch afgedwongen": de detectie kijkt sinds de
    // linkdoctrine alleen naar het DOELWIT (regel + uid), niet naar wat de
    // dekker is. Wát er dekt — een Rego-module, een besluitbundel, een
    // gematerialiseerde autorisatietabel — zegt de dekker zelf met zijn
    // type-label; "afdwingen" zou daar een claim overheen leggen die de data
    // niet doet.
    // De dekking staat sinds aug 2026 in de UITKLAP onder de
    // conformsToPolicy-voorwaarde, niet meer als tag op de regelkoppen.
    // Dekking op VOORWAARDE-niveau: een bundel werkt vooral voorwaarden uit.
    // "afgedwongen" is hier wél op zijn plaats (anders dan bij de vervallen
    // regeltag): het gaat om een BESLISPUNT dat de machine-uitvoerbare laag
    // aantoonbaar afdwingt, niet om een norm die zij "dekt".
    // Het paneel op de conformsToPolicy-rij gaat over DEZE ENE REGEL: wat de
    // machine-uitvoerbare laag van haar afdwingt. Een lijst van alles wat een
    // bundel uitwerkt bestaat niet meer — het artefact is geen ketenknoop.
    // De kop van de dekkingsuitklap spreekt sinds aug 2026 dezelfde taal als de
    // omgekeerde link op een voorwaarde-rij: GEEFT INVULLING AAN. Losse stukken,
    // zodat een ontbrekend stuk gewoon wegvalt.
    'cov.ruleHead': 'geeft invulling aan: {parts}',
    'cov.partRule': 'de regel',
    'cov.partConds': '{m} van {n} voorwaarden',
    'cov.partDuties': { one: '{n} verplichting', other: '{n} verplichtingen' },
    'cov.ruleHeadNone': 'werkt niets van deze regel uit',
    // De uitklap in drie blokken: de regel zelf, haar voorwaarden en de
    // verplichtingen van de beleidsset. De items zijn duplicaten van hun
    // bronrij, dus de subkoppen benoemen alleen de SOORT rij.
    'cov.fulfilsHead': 'Geeft invulling aan:',
    'cov.subRule': 'Regel:',
    'cov.subConds': 'Voorwaarden:',
    'cov.subDuties': 'Verplichtingen:',
    'cov.dutyFrom': 'overgenomen van {parent}',
    'cov.dutyViaCond': 'via voorwaarde “{cond}”',
    'cov.enforcedHead': 'Afgedwongen voorwaarden',
    'cov.notEnforcedHead': 'Niet afgedwongen',
    'cov.enforced': 'technisch afgedwongen',
    // De ⚙-keten: het title-attribuut noemt de VOLGENDE STAP, niet het
    // eindpunt — dat is wat de knop doet (parse.js/coverageNext).
    'cov.nextTitle': 'Ingevuld door: {label}',
    // Ongedekte ONGEMARKEERDE voorwaarde: gewone normatieve inhoud, die
    // technisch afgedwongen hoort te worden — hier is een uitwerking blijven
    // liggen. Draagt zij dpv:OrganisationalMeasure, dan is er niets blijven
    // liggen en zegt de weergave dat met een GEDEMPT merk (zie de spec,
    // "Markers op de regel of de voorwaarde"). Dezelfde marker mag op de REGEL
    // staan: dan draagt de REGELKOP hetzelfde merk (eigen hover-tekst) en valt
    // de regel met al haar voorwaarden buiten de status.
    'cov.notEnforced': 'niet uitgewerkt',
    'cov.notEnforcedTitle': 'Deze voorwaarde hoort technisch te worden afgedwongen, maar geen artefact werkt haar uit.',
    'cov.organisational': 'organisatorisch geborgd',
    'cov.organisationalTitle': 'Deze voorwaarde is buiten de techniek geborgd — in een werkinstructie, bij het uitdelen van accounts, in het toezicht. Zij geldt onverkort, maar er valt technisch niets uit te werken en zij telt niet mee in de status.',
    'cov.organisationalRuleTitle': 'Deze regel is als geheel buiten de techniek geborgd — in een werkinstructie, bij het uitdelen van accounts, in het toezicht. Zij geldt onverkort, maar er valt technisch niets uit te werken: de regel zelf niet en haar voorwaarden evenmin. Zij telt daarom niet mee in de realisatiestatus.',
    'cov.status.full': 'afgedwongen',
    'cov.status.partial': 'deels afgedwongen',

    // Sprong vanuit de conformsToPolicy-uitklap naar de rij van de plicht.
    'cov.dutyJump': 'Ga naar deze verplichting',

    // -- De omgekeerde kant van de keten, op de voorwaarde-rij zelf
    'cond.fulfils': 'geeft invulling aan: ',
    'cond.fulfilsTitle': 'Ga naar deze verplichting',

    // --- De technische view: het invulling-paneel rechts --------------------
    'fill.title': 'Invulling',
    'fill.gearTitle': 'Invulling bekijken',
    'fill.up': '\u2191 Wordt ingevuld door',
    'fill.down': '\u2193 Geeft invulling aan',
    'fill.origin': 'Beleidsset: {sets}',
    // Subkop in het ↓-blok van een conformsToPolicy-rij: de stelselplichten die
    // deze knoop invult staan apart van de regel en haar eigen voorwaarden.
    'fill.duties': 'Verplichtingen',
    'fill.this': 'Dit element',
    'fill.jump': 'Toon in de weergave',
    'fill.unknown': 'Dit element staat niet (meer) in de huidige weergave.',

    // -- Doorwerking vanuit het aanbod
    'offerRules.label': 'Uit het aanbod ({parts})',
    'offerRules.note': 'Deze regels komen ongewijzigd uit het aanbod: de overeenkomst neemt '
      + 'ze één-op-één over.',
    'offerRules.extra': 'aanvullend',

    // -- Overerving (odrl:inheritFrom, ODRL 2.2 Policy Inheritance)
    'inheritRules.label': {
      one: 'Geërfd van {parent} ({n} regel)',
      other: 'Geërfd van {parent} ({n} regels)',
    },
    'inheritRules.labelEmpty': 'Geërfd van {parent} (geen regels)',
    'inheritRules.labelLazy': 'Geërfd van {parent} (regels nog niet geladen)',
    'inheritRules.labelMissing': 'Geërfd van {parent} (ouder niet geladen)',
    'inheritRules.labelInvalid': 'Erft van “{value}” (geen geldige beleidsverwijzing)',
    'inheritRules.note': 'Deze regels staan op de ouderpolicy. Volgens ODRL 2.2 gelden ze '
      + 'samen met de eigen regels van dit beleid.',
    'inheritRules.noteMissing': 'De ouderpolicy zit niet in de geladen bron. Welke regels dit '
      + 'beleid erft is daarom niet te zien; de verwijzing zelf staat er wel.',
    'inheritRules.chip': 'geërfd',
    'inheritRules.explore': 'Verken de ouderpolicy',
    'inheritRules.cycle': 'cyclische overerving',
    'inheritRules.cycleTitle': 'De overervingsketen komt bij dit beleid terug. ODRL 2.2 verbiedt '
      + 'dat; de regels zijn hier één keer per voorouder getoond.',
    'inheritRules.head': 'Overerving',

    'duty.inform': 'informeer {party}',
    'duty.noParams': 'Geen nadere parameters.',
    'agr.onOffer': 'Op aanbod: ',
    'agr.otherPermissions': 'Overige toestemmingen',

    // -- Versienavigator
    'vnav.older': 'oudere versie',
    'vnav.newer': 'nieuwere versie',
    'vnav.olderDated': 'oudere versie: {date}',
    'vnav.newerDated': 'nieuwere versie: {date}',
    'vnav.allVersions': 'alle versies ({n})',
    'vnav.versionAria': 'versie {date} — {menu}',
    'vnav.versionDate': 'versiedatum',
    'vnav.loadFailed': ' kon versie niet laden: {msg}',
    'vnav.validity': ' · geldig {from} → {to}',
    'vperiod.from': 'vanaf {date}',
    'vperiod.range': '{from} → {to}',
    'vperiod.present': 'heden',
    'vline.validFrom': 'geldig vanaf {date}',
    'vline.validTo': 'geldig tot {date}',
    'vline.replaces': 'vervangt {refs}',
    'vline.supersededBy': 'vervangen door {refs}',
    'vline.derivedFrom': 'afgeleid van {refs}',

    // -- Stub-versies (alleen documentgegevens in het register)
    'stub.period': 'geldig {from} → {to}',
    'stub.terminated': 'Beëindigd besluit, {period}. Er is geen geldende versie meer.',
    'stub.superseded': 'Vervangen besluitversie, {period}.',
    'stub.fromSourceLayer': '{head} De regels hieronder komen uit de bron-datalaag ({source}); '
      + 'de doelbinding-verrijking van de transformatie is alleen op de geldende versie toegepast.',
    'stub.documentOnly': '{head} Van deze versie zijn in dit register alleen de documentgegevens '
      + 'opgenomen — de geldigheidsperiode en de verwijzing naar het bronbesluit; de regels zelf '
      + 'staan er niet in. De inhoud van deze versie staat in het bronbesluit hieronder.',

    // -- Ledenlijst van een gegevensset
    // De ledenlijst hangt ONDER het target-kopje en telt dus in hetzelfde
    // woord (zie field.target hierboven).
    'members.count': { one: '{n} doelobject', other: '{n} doelobjecten' },
    'members.countTyped': '{count} ({label})',
    'members.countGroups': '{count} ({groups})',
    'members.zero': '0 doelobjecten',
    'members.other': 'Overige doelobjecten',
    'members.plain': 'Doelobjecten',
    // Dezelfde ledenlijst onder een odrl:PartyCollection telt partijen.
    'members.countParty': { one: '{n} partij', other: '{n} partijen' },
    'members.zeroParty': '0 partijen',
    'members.otherParty': 'Overige partijen',
    'members.plainParty': 'Partijen',

    // -- Doorlopende boom over de odrl:partOf-keten (in dezelfde fold-out)
    // Een lid dat zélf leden heeft wordt een uitklapbare knoop; per niveau
    // dezelfde groepering en telling. Zie MEMBER_TREE_MAX_DEPTH in parse.js.
    'tree.expand': 'Toon de leden van deze knoop',
    'tree.loading': 'leden laden…',
    'tree.empty': 'geen leden gevonden',
    // Diepte-limiet: de boom stopt, de graaf-inspecteur gaat verder.
    'tree.deeper': 'verder verkennen',
    'tree.deeperTitle': 'Deze knoop heeft zelf leden, maar valt buiten de diepte '
      + 'van de boom — open hem in de graaf-inspecteur om verder te gaan.',
    // Cykel: dezelfde knoop staat al hoger in dit pad. Neutrale mededeling,
    // geen foutmelding — een ring in odrl:partOf is data, geen crash.
    'tree.cycle': 'komt hierboven al voor',
    'tree.cycleTitle': 'Deze knoop staat al hoger in dezelfde partOf-keten; '
      + 'de boom stopt hier, zodat hij niet blijft rondlopen.',
    // -- Ancestry: dezelfde keten, de andere kant op. De koppen zelf dragen
    // het LABEL uit de data (categorie, groep) plus een telling; alleen de
    // toelichting is UI-tekst. Zie groupMembersByAncestry in parse.js.
    'tree.ancestryTitle': 'Deze leden vallen buiten deze verzameling om onder '
      + 'deze noemer (odrl:partOf).',
    'tree.ancestrySubTitle': 'De naaste noemer waaronder deze leden vallen '
      + '(odrl:partOf).',

    // -- Intensioneel gedefinieerde collectie (odrl:refinement i.p.v. leden)
    'coll.anyAsset': 'alle assets waarvoor geldt: {sentence}',
    'coll.anyParty': 'elke partij waarvoor geldt: {sentence}',
    // De doc-weergave toont de refinements als slot-chips (zelfde vorm als de
    // Voorwaarden van een regel), onder een eigen sectiebalk. De volzinnen
    // hierboven blijven voor de plekken waar alleen TEKST past: de kaarttitel
    // van een anonieme collectie, de indexrij en de tabelgenerator.
    // "Afbakening" en niet "Voorwaarden": een refinement bakent de VERZAMELING
    // af, het stelt geen voorwaarde aan het gebruik.
    'coll.refinementSection': 'Afbakening',
    // Soortchip vóór een collectie-waarde: WAT voor verzameling dit is. Kort
    // en alledaags — de klassenaam (PartyCollection) staat een klik verder in
    // de inspecteur en zegt de lezer niets.
    'coll.kindParty': 'Groep',
    'coll.kindAsset': 'Verzameling',
    // Nog in gebruik in de LIJST-weergave (assets/app.js), die de bron als
    // losse vermelding onder de refinements toont.
    'coll.source': 'bron: {source}',

    // -- Filters
    'filter.title': 'Filters',
    'filter.toggleAria': 'Filters tonen of verbergen',
    'filter.placeholder': 'Filter op titel of afnemer…',
    'filter.aria': 'Filter op titel of afnemer',
    'filter.ariaAgreements': 'Filter overeenkomsten op titel of afnemer',
    'filter.ariaSets': 'Filter beleidssets op titel of afnemer',
    'filter.ariaRequests': 'Filter verzoeken op titel of indiener',
    'filter.offerAria': 'Filter op aanbod',
    'filter.all': '(alle)',
    'filter.clear': 'Wis filters',
    'filter.search': 'Zoek',
    'filter.status': 'Status',
    'filter.offer': 'Aanbod',
    'filter.loading': 'index wordt geladen…',
    'filter.suffixOffer': ' · aanbod: {title}',
    'filter.suffixNoStatus': ' · geen status geselecteerd',
    'filter.suffixOnly': 'alleen {word}',
    // Groepeerpad: de actieve dimensies als chips, met × en een +-chip.
    'pivot.label': 'Groepeer',
    'pivot.remove': 'Groepering op {label} weghalen',
    'pivot.add': 'Dimensie toevoegen',
    'pivot.addItem': 'Groepeer ook op {label}',
    'count.ofTotal': '{n} van {total}',

    // -- Lijsten en uitklappers
    'list.loadMore': 'Meer laden',
    'list.loadMoreRest': 'Meer laden ({n} resterend)',
    'list.showMore': 'Meer tonen',
    'list.showMoreRest': 'Meer tonen ({n} resterend)',
    'text.showMore': 'toon meer ({n} tekens)',
    'text.showLess': 'toon minder',
    'rules.count': { one: '{n} regel', other: '{n} regels' },
    'agreements.count': { one: '{n} overeenkomst', other: '{n} overeenkomsten' },
    'agreements.shown': '{n} overeenkomsten getoond',
    'agreements.countTitle':
      'Toon de overeenkomsten op dit aanbod (gefilterd) in de overeenkomsten-sectie',
    'versions.count': { one: '{n} versie', other: '{n} versies' },
    'summary.from': 'vanaf {date}',
    'summary.superseded': 'vervangen',
    'editor.open': 'Openen in editor',

    // -- Policy-selector (topbar; element optioneel)
    'select.allPolicies': 'Alle policies',
    'select.publications': 'Beleidspublicaties',

    // -- Graaf-inspecteur
    'insp.title': 'Graaf-inspecteur',
    'insp.close': 'Sluiten (Esc)',
    'insp.explore': 'Verkennen',
    'insp.exploreAria': 'Verken in de graaf-inspecteur',
    'insp.showInView': 'Toon in de weergave',
    'insp.showInViewAria': 'Toon deze knoop in de weergave',
    'insp.notInView': 'Niet in de huidige weergave; wel in de graaf.',
    'insp.sourceFragment': 'Bronfragment (Turtle)',
    'insp.serializeError': '# kon bron niet serialiseren: {msg}',
    'insp.noTriples':
      'Deze node heeft geen eigen triples in de geladen graaf (komt alleen als verwijzing voor).',
    'insp.outgoing': '→ Verwijst naar',
    'insp.incoming': '← Verwezen vanuit',
    // De randlabels van de keten-layout: zonder pijl in de tekst, want die zet
    // de weergave er zelf voor (↑ boven het grijze vlak, ↓ eronder) — net als
    // in het Invulling-paneel.
    'insp.edgeIn': 'Verwezen vanuit',
    'insp.edgeOut': 'Verwijst naar',
    'insp.noneInGraph': '{label}: geen in de geladen graaf.',
    'insp.foldCount': '{label} ({n})',
    'insp.countPending': '{label} (…)',
    'insp.countFailed': '{label} (endpoint-telling mislukt)',
    'insp.filterPlaceholder': 'Filter op naam of predicaat…',
    'insp.filterAria': '{label}: filter op naam of predicaat',
    'insp.loadingEndpoint': 'Laden van het endpoint…',
    'insp.loadRefsFailed': 'Kon verwijzingen niet laden van het endpoint: {msg}',
    'insp.noIncoming': 'Geen inkomende verwijzingen op het endpoint.',

    // -- Bronnen-paneel
    'src.toggle': 'Bronnen ▾',
    'src.loaded': 'Geladen bronnen',
    'src.addLabel': 'Bron toevoegen',
    'src.addButton': 'Toevoegen',
    'src.placeholder': 'https://…/beleid.ttl of https://…/sparql',
    'src.remove': 'Bron verwijderen',
    'src.removeEndpoint': 'SPARQL-endpoint verwijderen',
    'src.endpointNote': '  (SPARQL-endpoint: policylijst/detail-bijlaadbron)',
    'src.detecting': 'Bron detecteren… {url}',
    'src.unreachable': 'Bron niet bereikbaar (CORS of offline?): {url}',
    'src.unusable': 'Geen bruikbare bron (geen RDF-bestand of SPARQL-endpoint): {url}',

    // -- Laadmeldingen
    'load.sources': 'Bronnen ophalen…',
    'load.source': 'Bron ophalen…',
    'load.examples': 'Voorbeelden laden…',
    'load.processing': 'Bronnen verwerken…',
    'load.parseSource': 'Bron {i}/{total} inlezen: {name}',
    'load.buildModel': 'Weergavemodel bouwen…',
    'load.graph': 'Graaf laden…',
    'load.cardDetail': 'Details laden van het SPARQL-endpoint…',
    'load.queryEndpoint': 'SPARQL-endpoint bevragen…',
    'load.queryEndpointAt': 'SPARQL-endpoint bevragen… {ep}',

    // -- Statusregel
    // De statusregel is een compacte telregel; hij houdt in beide talen de
    // "(en)"-schrijfwijze aan in plaats van echte meervouden — dat leest als
    // één ritme en scheelt vier tabelvormen per taal.
    'status.sources': '{n} bron(nen)',
    'status.triples': '{n} triples',
    'status.offers': '{n} aanbod',
    'status.agreements': '{n} overeenkomst(en)',
    'status.sets': '{n} beleidsset(ten)',
    'status.requests': '{n} verzoek(en)',
    'status.versionContainers': '{n} versiecontainer(s)',
    'status.artifacts': '{n} artefact(en)',
    'status.errors': ' — {n} fout(en)',
    'status.compatIndex': ' — index geladen via compatibiliteitsmodus',
    'status.firstView': ' — eerste beeld, volledige index wordt geladen…',
    'status.policyNotFound': ' — ?policy niet gevonden in de geladen bronnen',
    'status.setNotFound': ' — ?set niet gevonden in de geladen bronnen',
    'status.examplesFailed': 'voorbeelden niet geladen (file://?)',
    'status.sparqlNote': ' · SPARQL: {ep}',

    // -- Foutmeldingen
    'err.detailLoad': 'Kon het detail niet laden van het SPARQL-endpoint: {msg}',
    'err.noPolicies': 'Geen ODRL-policies gevonden in de opgegeven bronnen.',
    'err.parseErrors': ' Let op — bron(nen) met parse-fouten: {list}.',
    'err.examplesFetch': 'Kon de voorbeelden niet laden via fetch. Dit gebeurt meestal wanneer de '
      + 'pagina via file:// is geopend. Start een lokale webserver in de map '
      + 'odrl-ap-nl/ (bijv. `python3 -m http.server`) en open '
      + 'http://localhost:8000/viewer/doc.html .',
    'err.examplesPartial': '({n} niet geladen)',
    'err.sourcesPartial': '({n} bron(nen) niet geladen)',
    'err.srcLoad': 'Kon ?src niet laden: {msg}',
    'err.httpAt': 'HTTP {status} bij {url}',
    'err.scopeFetch': 'Kon de bron niet ophalen van {iri} ({msg}). '
      + 'Geef de bron(nen) expliciet mee: ?policy=<policy-IRI>&src=<url> (herhaalbaar), '
      + 'bijvoorbeeld de policyset plus registerfragmenten met labels — of geef '
      + 'een SPARQL-endpoint als ?src= mee om het detail live op te halen.',
    'err.endpoint': 'SPARQL-endpoint niet bereikbaar of query mislukt: {ep} — {msg}. '
      + 'Controleer of het endpoint draait, de URL klopt en de server CORS toestaat.',
    'err.sparql': 'SPARQL-fout: {msg}',
    'err.fullIndex': 'De volledige index kon niet geladen worden van {ep} — {msg}. '
      + 'De pagina toont de eerste resultaten per soort.',
    'err.sparqlFullIndex': 'SPARQL-fout bij de volledige index: {msg} — eerste beeld blijft staan',
    'err.unsupportedFormat': 'formaat niet ondersteund (RDF/XML)',
  },

  en: {
    // -- Language switch
    'lang.aria': 'Display language',
    'lang.nl': 'NL',
    'lang.en': 'EN',

    // -- Rule kinds
    'rule.permission': 'permission',
    'rule.prohibition': 'prohibition',
    'rule.duty': 'duty',
    'rule.offer': 'offer',
    'rule.inherited': 'inherited',

    'noun.permission': { one: '{n} permission', other: '{n} permissions' },
    'noun.prohibition': { one: '{n} prohibition', other: '{n} prohibitions' },
    'noun.duty': { one: '{n} duty', other: '{n} duties' },

    'title.permission': 'Permission',
    'title.prohibition': 'Prohibition',
    'title.duty': 'Duty',

    // -- Sections
    'section.offers': 'Offers',
    'section.agreements': 'Agreements',
    'section.requests': 'Requests',
    'section.sets': 'Policy sets',
    'section.machinePolicy': 'Machine-executable policy',
    'section.looseAgreements': 'Agreements (offer not in the graph)',

    'kind.offer': 'Offer',
    'kind.agreement': 'Agreement',
    'kind.set': 'Set',
    'kind.request': 'Request',
    'role.offer': 'Offer',
    'role.agreement': 'Agreement',
    'role.policySet': 'Policy set',
    'role.version': 'Version',
    'role.group': 'Group',
    'role.bundle': 'Bundle',
    'role.artifact': 'Artifact',
    'nav.permissionN': 'Permission {n}',
    'nav.versionsSuffix': { one: '{n} version', other: '{n} versions' },

    // -- Field labels
    'field.assignee': 'Assignee',
    'field.assigner': 'Assigner',
    'field.action': 'Action',
    'field.purpose': 'Purpose',
    'field.source': 'Source',
    'field.title': 'Title',
    'field.target': 'Targets',
    'term.asset': 'asset',
    'term.assets': 'assets',
    'term.assetCollection': 'asset collection',
    'field.dataset': 'Dataset',
    'field.issued': 'Issued',
    'field.replaces': 'Replaces',
    'field.derivedFrom': 'Derived from',
    'field.fulfilsOffer': 'Fulfils offer',
    'field.profile': 'Profile',
    'field.legalBasis': 'Legal basis',
    'field.origin': 'Source',
    'field.sourceLocation': 'Source location',
    'field.reference': 'Reference',
    'field.request': 'Request',
    'request.title': 'The request this agreement originated from',
    'request.by': 'submitted by {who}',
    'askOffer.line': 'asks for {offer}',
    'askOffer.title': 'The offer this request asks for',
    'askOffer.explore': 'Explore the requested offer',
    'decidedIn.line': 'decided in {agreement}',
    'decidedIn.title': 'The agreement in which this request was decided',
    'decidedIn.explore': 'Explore the agreement in which it was decided',
    'jump.toRequest': 'Show this request in the Requests section',
    'jump.toAgreement': 'Show this agreement in the Agreements section',
    'prop.schemaValidFrom': 'valid from',
    'prop.schemaValidThrough': 'valid through',
    'prop.dctValid': 'valid (period)',
    'prop.dcatStartDate': 'start date',
    'prop.dcatEndDate': 'end date',
    'prop.dctSource': 'source',
    'prop.dpvHasLegalBasis': 'legal basis',
    'prop.skosEditorialNote': 'editorial note',
    // Zie de nl-tabel: de veldnamen van het artefactformulier komen uit de shape.
    'head.constraints': 'Constraints',
    'head.duties': 'Duties',
    // odrl:consequence belongs to a DUTY and applies when that duty is not
    // fulfilled (ODRL 2.2 §2.6.4); the heading says so explicitly.
    'head.consequences': 'Consequence if not fulfilled',
    'head.otherProps': 'Other properties',
    'head.accessPoints': 'Access points',

    // -- Version status
    'status.current': 'in force',
    'status.future': 'future',
    'status.superseded': 'superseded',
    'status.terminated': 'terminated',
    'lifecycle.active': 'active',
    'lifecycle.terminated': 'terminated',
    'lifecycle.future': 'future',
    'lifecyclePlural.active': 'active',
    'lifecyclePlural.terminated': 'terminated',
    'lifecyclePlural.future': 'future',

    // -- ODRL 2.2 core operators
    'op.eq': 'equals',
    'op.neq': 'does not equal',
    'op.gt': 'is greater than',
    'op.gteq': 'is greater than or equal to',
    'op.lt': 'is less than',
    'op.lteq': 'is less than or equal to',
    'op.isA': 'is a',
    'op.hasPart': 'has part',
    'op.isPartOf': 'is part of',
    'op.isAllOf': 'is all of',
    'op.isAnyOf': 'is any of',
    'op.isNoneOf': 'is none of',

    // -- ODRL 2.2 core left operands
    'left.purpose': 'purpose',
    'left.dateTime': 'date and time',
    'left.count': 'count',
    'left.spatial': 'location',
    'left.delayPeriod': 'delay period',
    'left.elapsedTime': 'elapsed time',
    'left.event': 'event',
    'left.recipient': 'recipient',
    'left.media': 'medium',

    // -- Logical constraints
    'logical.and': ' and ',
    'logical.andSequence': ' and then ',
    'logical.or': ' or ',
    'logical.xone': ' or ',
    'logical.xonePrefix': 'exactly one of: ',
    'logicalHead.and': 'all of',
    'logicalHead.andSequence': 'all of, in order',
    'logicalHead.or': 'any of',
    'logicalHead.xone': 'exactly one of',

    // -- Nameless / unknown values
    'anon': '(anonymous)',
    'anonTyped': '(anonymous {type})',
    'anonAction': '(anonymous action)',
    'anonNode': '(anonymous node)',
    'noPurpose': '(no purpose)',
    'unknownQuantity': '(unknown quantity)',
    'unknownOperator': '(operator?)',
    'unknownValue': '(value?)',
    'valuesTruncated': '… ({n} values)',

    // -- Constraint chips
    'slot.leftMissing': 'left operand missing',
    'slot.operatorMissing': 'operator missing',
    'slot.valueMissing': 'value missing',
    'slot.missingTitle': '{pred} is missing on this constraint.',
    'slot.unknownProps': ' Present but not recognised: ',
    'constraint.compound': 'Compound constraint',
    'constraint.foldSummary': { one: '{label} — {head} ({n} constraint)', other: '{label} — {head} ({n} constraints)' },
    'conforms.left': 'processing request',
    'conforms.op': 'must conform to',

    // -- Coverage: a node declares it is the working-out of this rule.
    // Deliberately no longer "technically enforced": detection now looks only
    // at the TARGET (a rule carrying a uid), never at what the covering node
    // happens to be. What covers — a Rego module, a decision bundle, a
    // materialised authorisation table — is stated by the node's own type
    // label; "enforced" would add a claim the data does not make.
    // Coverage lives in the fold-out under the conformsToPolicy constraint
    // since Aug 2026, no longer as a tag on the rule headers.
    // Coverage at CONDITION level: a bundle mostly works out conditions.
    // The fold-out under the conformsToPolicy row is about THIS ONE RULE.
    'cov.ruleHead': 'realises: {parts}',
    'cov.partRule': 'the rule',
    'cov.partConds': '{m} of {n} conditions',
    'cov.partDuties': { one: '{n} obligation', other: '{n} obligations' },
    'cov.ruleHeadNone': 'enforces nothing of this rule',
    'cov.fulfilsHead': 'Realises:',
    'cov.subRule': 'Rule:',
    'cov.subConds': 'Conditions:',
    'cov.subDuties': 'Obligations:',
    'cov.dutyFrom': 'inherited from {parent}',
    'cov.dutyViaCond': 'via condition “{cond}”',
    'cov.enforcedHead': 'Enforced conditions',
    'cov.notEnforcedHead': 'Not enforced',
    'cov.enforced': 'technically enforced',
    'cov.nextTitle': 'Realised by: {label}',
    'cov.notEnforced': 'not enforced',
    'cov.notEnforcedTitle': 'This condition is meant to be enforced technically, but no artifact works it out.',
    'cov.organisational': 'organisational measure',
    'cov.organisationalTitle': 'This condition is secured outside the machinery — in a work instruction, when accounts are handed out, in supervision. It applies undiminished, but there is nothing to work out technically and it does not count towards the status.',
    'cov.organisationalRuleTitle': 'This rule is secured as a whole outside the machinery — in a work instruction, when accounts are handed out, in supervision. It applies undiminished, but there is nothing to work out technically: neither the rule itself nor its conditions. It therefore does not count towards the realisation status.',
    'cov.status.full': 'enforced',
    'cov.status.partial': 'partly enforced',

    'cov.dutyJump': 'Go to this obligation',

    'cond.fulfils': 'realises: ',
    'cond.fulfilsTitle': 'Go to this obligation',

    'fill.title': 'Realisation',
    'fill.gearTitle': 'View realisation',
    'fill.up': '\u2191 Realised by',
    'fill.down': '\u2193 Realises',
    'fill.origin': 'Policy set: {sets}',
    'fill.duties': 'Obligations',
    'fill.this': 'This element',
    'fill.jump': 'Show in the view',
    'fill.unknown': 'This element is no longer part of the current view.',

    // -- Rules inherited from the offer
    'offerRules.label': 'From the offer ({parts})',
    'offerRules.note': 'These rules come unchanged from the offer: the agreement adopts '
      + 'them one to one.',
    'offerRules.extra': 'additional',

    // -- Inheritance (odrl:inheritFrom, ODRL 2.2 Policy Inheritance)
    'inheritRules.label': {
      one: 'Inherited from {parent} ({n} rule)',
      other: 'Inherited from {parent} ({n} rules)',
    },
    'inheritRules.labelEmpty': 'Inherited from {parent} (no rules)',
    'inheritRules.labelLazy': 'Inherited from {parent} (rules not loaded yet)',
    'inheritRules.labelMissing': 'Inherited from {parent} (parent not loaded)',
    'inheritRules.labelInvalid': 'Inherits from “{value}” (not a valid policy reference)',
    'inheritRules.note': 'These rules belong to the parent policy. Under ODRL 2.2 they apply '
      + 'together with this policy’s own rules.',
    'inheritRules.noteMissing': 'The parent policy is not in the loaded source, so the rules '
      + 'this policy inherits cannot be shown; the reference itself is.',
    'inheritRules.chip': 'inherited',
    'inheritRules.explore': 'Explore the parent policy',
    'inheritRules.cycle': 'circular inheritance',
    'inheritRules.cycleTitle': 'The inheritance chain loops back to this policy. ODRL 2.2 forbids '
      + 'that; the rules are shown once per ancestor here.',
    'inheritRules.head': 'Inheritance',

    'duty.inform': 'inform {party}',
    'duty.noParams': 'No further parameters.',
    'agr.onOffer': 'On offer: ',
    'agr.otherPermissions': 'Other permissions',

    // -- Version navigator
    'vnav.older': 'older version',
    'vnav.newer': 'newer version',
    'vnav.olderDated': 'older version: {date}',
    'vnav.newerDated': 'newer version: {date}',
    'vnav.allVersions': 'all versions ({n})',
    'vnav.versionAria': 'version {date} — {menu}',
    'vnav.versionDate': 'version date',
    'vnav.loadFailed': ' could not load version: {msg}',
    'vnav.validity': ' · valid {from} → {to}',
    'vperiod.from': 'from {date}',
    'vperiod.range': '{from} → {to}',
    'vperiod.present': 'present',
    'vline.validFrom': 'valid from {date}',
    'vline.validTo': 'valid until {date}',
    'vline.replaces': 'replaces {refs}',
    'vline.supersededBy': 'superseded by {refs}',
    'vline.derivedFrom': 'derived from {refs}',

    // -- Stub versions
    'stub.period': 'valid {from} → {to}',
    'stub.terminated': 'Terminated decision, {period}. There is no version in force any more.',
    'stub.superseded': 'Superseded decision version, {period}.',
    'stub.fromSourceLayer': '{head} The rules below come from the source data layer ({source}); '
      + 'the purpose-binding enrichment of the transformation was applied only to the version in force.',
    'stub.documentOnly': '{head} For this version the register holds the document data only — '
      + 'the validity period and the reference to the source decision; the rules themselves are '
      + 'not included. The content of this version is in the source decision below.',

    // -- Collection members
    'members.count': { one: '{n} target', other: '{n} targets' },
    'members.countTyped': '{count} ({label})',
    'members.countGroups': '{count} ({groups})',
    'members.zero': '0 targets',
    'members.other': 'Other targets',
    'members.plain': 'Targets',
    'members.countParty': { one: '{n} party', other: '{n} parties' },
    'members.zeroParty': '0 parties',
    'members.otherParty': 'Other parties',
    'members.plainParty': 'Parties',

    // -- Continuous tree over the odrl:partOf chain (same fold-out)
    'tree.expand': 'Show the members of this node',
    'tree.loading': 'loading members…',
    'tree.empty': 'no members found',
    'tree.deeper': 'explore further',
    'tree.deeperTitle': 'This node has members of its own but falls outside the depth '
      + 'of the tree — open it in the graph inspector to go further.',
    'tree.cycle': 'already appears above',
    'tree.cycleTitle': 'This node already appears higher up in the same partOf chain; '
      + 'the tree stops here so it does not keep going round.',
    'tree.ancestryTitle': 'Outside this collection, these members belong under '
      + 'this heading (odrl:partOf).',
    'tree.ancestrySubTitle': 'The nearest heading these members belong under '
      + '(odrl:partOf).',

    // -- Intensionally defined collection (odrl:refinement instead of members)
    'coll.anyAsset': 'any asset where: {sentence}',
    'coll.anyParty': 'any party where: {sentence}',
    'coll.refinementSection': 'Refinement',
    'coll.kindParty': 'Group',
    'coll.kindAsset': 'Collection',
    'coll.source': 'source: {source}',

    // -- Filters
    'filter.title': 'Filters',
    'filter.toggleAria': 'Show or hide filters',
    'filter.placeholder': 'Filter by title or assignee…',
    'filter.aria': 'Filter by title or assignee',
    'filter.ariaAgreements': 'Filter agreements by title or assignee',
    'filter.ariaSets': 'Filter policy sets by title or assignee',
    'filter.ariaRequests': 'Filter requests by title or requester',
    'filter.offerAria': 'Filter by offer',
    'filter.all': '(all)',
    'filter.clear': 'Clear filters',
    'filter.search': 'Search',
    'filter.status': 'Status',
    'filter.offer': 'Offer',
    'filter.loading': 'index is loading…',
    'filter.suffixOffer': ' · offer: {title}',
    'filter.suffixNoStatus': ' · no status selected',
    'filter.suffixOnly': '{word} only',
    // Grouping path: the active dimensions as chips, with × and a + chip.
    'pivot.label': 'Group by',
    'pivot.remove': 'Remove grouping by {label}',
    'pivot.add': 'Add a dimension',
    'pivot.addItem': 'Also group by {label}',
    'count.ofTotal': '{n} of {total}',

    // -- Lists and disclosures
    'list.loadMore': 'Load more',
    'list.loadMoreRest': 'Load more ({n} remaining)',
    'list.showMore': 'Show more',
    'list.showMoreRest': 'Show more ({n} remaining)',
    'text.showMore': 'show more ({n} characters)',
    'text.showLess': 'show less',
    'rules.count': { one: '{n} rule', other: '{n} rules' },
    'agreements.count': { one: '{n} agreement', other: '{n} agreements' },
    'agreements.shown': '{n} agreements shown',
    'agreements.countTitle':
      'Show the agreements on this offer (filtered) in the agreements section',
    'versions.count': { one: '{n} version', other: '{n} versions' },
    'summary.from': 'from {date}',
    'summary.superseded': 'superseded',
    'editor.open': 'Open in editor',

    // -- Policy selector
    'select.allPolicies': 'All policies',
    'select.publications': 'Policy publications',

    // -- Graph inspector
    'insp.title': 'Graph inspector',
    'insp.close': 'Close (Esc)',
    'insp.explore': 'Explore',
    'insp.exploreAria': 'Explore in the graph inspector',
    'insp.showInView': 'Show in the view',
    'insp.showInViewAria': 'Show this node in the view',
    'insp.notInView': 'Not in the current view; present in the graph.',
    'insp.sourceFragment': 'Source fragment (Turtle)',
    'insp.serializeError': '# could not serialise source: {msg}',
    'insp.noTriples':
      'This node has no triples of its own in the loaded graph (it only occurs as a reference).',
    'insp.outgoing': '→ References',
    'insp.incoming': '← Referenced from',
    'insp.edgeIn': 'Referenced from',
    'insp.edgeOut': 'References',
    'insp.noneInGraph': '{label}: none in the loaded graph.',
    'insp.foldCount': '{label} ({n})',
    'insp.countPending': '{label} (…)',
    'insp.countFailed': '{label} (endpoint count failed)',
    'insp.filterPlaceholder': 'Filter by name or predicate…',
    'insp.filterAria': '{label}: filter by name or predicate',
    'insp.loadingEndpoint': 'Loading from the endpoint…',
    'insp.loadRefsFailed': 'Could not load references from the endpoint: {msg}',
    'insp.noIncoming': 'No incoming references on the endpoint.',

    // -- Sources panel
    'src.toggle': 'Sources ▾',
    'src.loaded': 'Loaded sources',
    'src.addLabel': 'Add source',
    'src.addButton': 'Add',
    'src.placeholder': 'https://…/policy.ttl or https://…/sparql',
    'src.remove': 'Remove source',
    'src.removeEndpoint': 'Remove SPARQL endpoint',
    'src.endpointNote': '  (SPARQL endpoint: policy list / detail source)',
    'src.detecting': 'Detecting source… {url}',
    'src.unreachable': 'Source unreachable (CORS or offline?): {url}',
    'src.unusable': 'Not a usable source (no RDF file or SPARQL endpoint): {url}',

    // -- Loading messages
    'load.sources': 'Fetching sources…',
    'load.source': 'Fetching source…',
    'load.examples': 'Loading examples…',
    'load.processing': 'Processing sources…',
    'load.parseSource': 'Reading source {i}/{total}: {name}',
    'load.buildModel': 'Building the display model…',
    'load.graph': 'Loading graph…',
    'load.cardDetail': 'Loading details from the SPARQL endpoint…',
    'load.queryEndpoint': 'Querying the SPARQL endpoint…',
    'load.queryEndpointAt': 'Querying the SPARQL endpoint… {ep}',

    // -- Status line
    'status.sources': '{n} source(s)',
    'status.triples': '{n} triples',
    'status.offers': '{n} offer(s)',
    'status.agreements': '{n} agreement(s)',
    'status.sets': '{n} policy set(s)',
    'status.requests': '{n} request(s)',
    'status.versionContainers': '{n} version container(s)',
    'status.artifacts': '{n} artifact(s)',
    'status.errors': ' — {n} error(s)',
    'status.compatIndex': ' — index loaded in compatibility mode',
    'status.firstView': ' — first view, full index is loading…',
    'status.policyNotFound': ' — ?policy not found in the loaded sources',
    'status.setNotFound': ' — ?set not found in the loaded sources',
    'status.examplesFailed': 'examples not loaded (file://?)',
    'status.sparqlNote': ' · SPARQL: {ep}',

    // -- Error messages
    'err.detailLoad': 'Could not load the detail from the SPARQL endpoint: {msg}',
    'err.noPolicies': 'No ODRL policies found in the given sources.',
    'err.parseErrors': ' Note — source(s) with parse errors: {list}.',
    'err.examplesFetch': 'Could not load the examples via fetch. This usually happens when the '
      + 'page is opened over file://. Start a local web server in the '
      + 'odrl-ap-nl/ directory (e.g. `python3 -m http.server`) and open '
      + 'http://localhost:8000/viewer/doc.html .',
    'err.examplesPartial': '({n} not loaded)',
    'err.sourcesPartial': '({n} source(s) not loaded)',
    'err.srcLoad': 'Could not load ?src: {msg}',
    'err.httpAt': 'HTTP {status} at {url}',
    'err.scopeFetch': 'Could not fetch the source from {iri} ({msg}). '
      + 'Pass the source(s) explicitly: ?policy=<policy-IRI>&src=<url> (repeatable), '
      + 'for example the policy set plus register fragments with labels — or pass '
      + 'a SPARQL endpoint as ?src= to fetch the detail live.',
    'err.endpoint': 'SPARQL endpoint unreachable or query failed: {ep} — {msg}. '
      + 'Check that the endpoint is running, the URL is correct and the server allows CORS.',
    'err.sparql': 'SPARQL error: {msg}',
    'err.fullIndex': 'The full index could not be loaded from {ep} — {msg}. '
      + 'The page shows the first results per kind.',
    'err.sparqlFullIndex': 'SPARQL error on the full index: {msg} — the first view stays',
    'err.unsupportedFormat': 'format not supported (RDF/XML)',
  },
};

export const TABLE = STRINGS;

// Placeholders van één tabelwaarde (voor de volledigheidstest).
export function placeholdersOf(value) {
  const texts = typeof value === 'string' ? [value] : Object.values(value || {});
  const set = new Set();
  for (const s of texts) {
    for (const m of String(s).matchAll(/\{(\w+)\}/g)) set.add(m[1]);
  }
  return set;
}

// Meervoudskeuze: Nederlands en Engels hebben dezelfde tweevorm (1 / anders).
// Een taal met meer vormen zou hier zijn eigen regel krijgen; de tabelvorm
// ({ one, other }) hoeft daarvoor niet te veranderen.
function pluralForm(value, vars) {
  if (typeof value === 'string') return value;
  const n = vars && vars.n;
  return (Number(n) === 1 && value.one !== undefined) ? value.one : value.other;
}

// Vertaal één chrome-string. Een onbekende key is een PROGRAMMEERFOUT en
// faalt luid: de tabel is statisch en de volledigheidstest bewaakt hem, dus
// een stille terugval zou een Engelse sleutel in de Nederlandse UI opleveren
// zonder dat iemand het merkt.
export function t(key, vars = null, lang = current) {
  const table = STRINGS[lang] || STRINGS[DEFAULT_LANG];
  const value = table[key];
  if (value === undefined) {
    throw new Error(`i18n: onbekende key "${key}" (taal ${lang})`);
  }
  let out = pluralForm(value, vars);
  if (!vars) return out;
  out = out.replace(/\{(\w+)\}/g, (m, name) => {
    if (!(name in vars)) return m;
    const v = vars[name];
    return typeof v === 'number' ? num(v, lang) : String(v);
  });
  return out;
}
