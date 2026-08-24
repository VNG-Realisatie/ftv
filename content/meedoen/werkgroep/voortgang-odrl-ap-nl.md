---
type: 'chapter'
Title: Voortgang ODRL-AP-NL
---
{{< chapter/section title="" >}}
# Voortgang ODRL-AP-NL (18 augustus 2026)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Marc de Boer (FTV)
- Niels Dequeker (FTV)
- Maikel Hofman (FTV)
- Ton van de Ven (FTV)
- Mark Westbroek (VNG)
- Hans Schevers (BIM-Connected)
- Govert Claus (GBO)
- Danny Greefhorst (ArchiXL)
- René Kint (Zicht op Nederland)
- Axel van der Minne (DUO)
- Hugo Mostard (Gemeente Den Haag)
- Stas Mironov (Logius)
- Igor van Haren (Vecozo)
- Guus van der Meer (Vecozo)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20260818-odrl-ap-nl.mp4)
- [Presentatie](/ftv/documents/20260818-odrl-ap-nl.pdf)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Opening en voorstelronde
- Open oproep: waar heeft de werkgroep behoefte aan?
- Verslag ODRL3-workshop (Londen)
- Voorstel Visualisation Note en demo ODRL-visualizer
- ODRL-AP-NL: de Nederlandse toevoegingen
- Vervolgstappen
{{< /chapter/section >}}

{{< chapter/section title="Opening en voorstelronde" >}}

*Michiel Trimpe* opent de eerste werkgroepsessie na de zomerstop. *Govert Claus* stelt zich voor als nieuwe deelnemer: hij is betrokken bij het project **GBO (Gemeenschappelijke Bronontsluiting)**, waar men de Open FTV-software wil gaan toepassen. Toegangsverlening vormt een belangrijk onderdeel van dat project; hij sluit daarom graag aan bij de werkgroep. *Michiel* oppert om de reeks presentaties van deelnemende projecten (zoals vorig jaar) met een GBO-presentatie nieuw leven in te blazen.

{{< /chapter/section >}}

{{< chapter/section title="Open oproep: waar heeft de werkgroep behoefte aan?" >}}

*Marc de Boer* opent met een bredere vraag aan de werkgroep. De werkgroep is dit jaar vooral met ODRL en het register toegangsbeleid bezig — de derde standaard, en misschien wel het verste verwijderd van waar de groep ooit begon. Hij vraagt zich af in hoeverre de werkgroep bij dit onderwerp aan boord is, en doet een open oproep: zijn er — los van het register toegangsbeleid — onderwerpen rond toegang in een federatief stelsel die aandacht behoeven? AuthZEN, ADL en OpenFTV zijn gespecificeerd, maar implementaties zijn er nog weinig; ook implementatie-ervaringen zijn welkom.

**Gegevensleveringsovereenkomsten.** *Danny Greefhorst* vraagt welke afbakening de werkgroep kiest: beperkt het profiel zich tot toegangsaspecten, of kan ODRL ook breder ingezet worden als mechanisme voor het beschrijven van gegevensleveringsovereenkomsten? Hij kan zich voorstellen dat dat twee verschillende profielen worden (ODRL voor toegang en ODRL voor gegevensleveringsovereenkomsten). *Marc* erkent dat de onderwerpen dicht bij elkaar liggen: je levert volgens voorwaarden in een overeenkomst, en die bekrachtig je met je beleid. *Danny* wijst op de "heren van JAGA" bij J&V, die een gegevensleveringsprotocol hanteren met een hele administratie eromheen — interessant om te bekijken wat zij administreren. *Marc* neemt contact op met Danny om die lijntjes over te nemen.

**Gemeentelijk landschap.** *Marc* licht toe wat er bij Common Ground loopt: op verzoek wordt met een aantal leveranciers van gemeentelijke software samengewerkt om AuthZEN en ADL in te bouwen. Concreet: Ritense, leverancier van een zaakafhandelsysteem (zaakgericht werken kent nu vaak grofmazige autorisatie, terwijl er binnen zaakafhandeling veel nuances zijn — bedragen, voorwaarden, rollen), Maykin (Open Klant/Open Zaak) en WeAreFrank (een BRP-client met OPA, idealiter met AuthZEN en ADL). Ook INFO/iCatt en Contezza worden aangehaakt. Autorisatie is voor gemeenten vaak te ingewikkeld om zelf in te regelen; het doel is een model en werkwijze — één centrale set toegangsregels voor taken die elke gemeente heeft (paspoorten, rijbewijzen, vergunningen, toeslagen) — die voor een groot deel van de gemeenten toepasbaar is, ook bij verschillende systemen.

**Ontologieën en informatiemodellen.** *Hans Schevers* vraagt hoe het formaliseren van beleid zich verhoudt tot de definities van zaken, vergunningen en andere objecten in het gemeentelijk landschap. *Marc* wijst op de zaakgericht-werken-API's en de zaaktypecatalogus van VNG als uitgangspunt, met uitbreidingen rond organisatie ("open organisatie": een subject — persoon, geautomatiseerd systeem of AI-agent — heeft een plek in een afdeling, organisatie, vestiging). *Michiel* merkt op dat het ontbreken van RDF-ontologieën bij die API's de koppeling met ODRL bemoeilijkt; daar zal iets voor geregeld moeten worden. *Hans* schetst het perspectief van één ontologie over het gemeentelijke informatie-ecosysteem waarop je vervolgens ODRL toepast, en noemt als concreet voorbeeld de IMBOR-ontologie (beheer openbare ruimte, CROW) die in Utrecht is uitgebreid met werfkelders en riolering — met op de werfkelders een toegangsrestrictie, precies zijn interesse richting ODRL. *Mark Westbroek* meldt dat het GGM (Gemeentelijk Gegevensmodel) bezig is IMBOR in MIM-vorm op te nemen, en dat het GGM binnen Common Ground sterker gepositioneerd wordt (richting pas-toe-of-leg-uit, nu vooral voor BI-toepassingen). Hij ziet het GGM als het canonieke model "waar je je woordenschat uit put voor je ODRL" — om te kunnen aanwijzen wat wel en niet mag en waarom. *Michiel* observeert dat de werkgroep op de scheidslijn zit tussen de linked-data-enthousiastelingen en de authenticatie/autorisatie-focus — twee helften die op verschillende punten aanslaan; *Mark* merkt op dat je elkaar nodig hebt.

{{< /chapter/section >}}

{{< chapter/section title="Verslag ODRL3-workshop" >}}

*Michiel* doet verslag van de ODRL3-workshop, een maand geleden in Londen — de W3C-manier om een nieuwe versie van een standaard aan te kondigen. Een relatief kleine club van zo'n dertig deelnemers, maar met diverse insteken: evaluatie van ODRL, media, legal, data marketplaces. Opvallend weinig vertegenwoordiging vanuit de data spaces. De workshop leek grotendeels afgetrapt doordat **JP Morgan ODRL actief heeft omarmd** voor zijn marktdata. Als afdronk: een sterke academische inslag — vooral academici, mensen van JP Morgan en een drietal consultants die hun geld verdienen met ODRL; de vendor-/productbouwerscultuur van bijvoorbeeld OpenID ontbreekt hier.

Aan het einde van de twee dagen zijn de voorgestelde deliverables voor ODRL 3 uitgewerkt (zie de presentatie voor het overzicht). De belangrijkste voor de werkgroep: een geactualiseerd **Policy Model**, een normatieve **Evaluation**-standaard (zodat ODRL zelf een evalueerbare policytaal wordt) en **Architecture & Protocols** — voor FTV extra relevant omdat NLGov AuthZEN precies zo'n protocol in zo'n architectuur is. Wanneer dat werk start, is het zaak te zorgen dat het protocol dat daar gekozen wordt AuthZEN is, of er één-op-één op te mappen valt.

Omdat *Michiel* aanwezig was, heeft hij een **Visualisation Note** kunnen aandragen; die is geaccepteerd in het proposed charter. Interessante bijvangst: JP Morgan blijkt een octrooi te hebben aangevraagd op een ODRL-visualizer, maar verontschuldigde zich daar min of meer voor; die zou waarschijnlijk vrij gelicenseerd beschikbaar komen. Op de **TPAC in Dublin (26 oktober)** wordt de proposed scope ter besluitvorming gebracht en mogelijk geaccordeerd — daarmee zou ODRL 3 officieel van start gaan.

{{< /chapter/section >}}

{{< chapter/section title="Visualisation Note en demo" >}}

*Michiel* licht het voorstel toe: FTV biedt aan die Visualisation Note te schrijven. Het is geen software maar een specificatie-regime: waar moet ODRL aan voldoen om visualiseerbaar (en indirect bewerkbaar) te zijn. Kern is een **labelling-regime** (elk begrip een label, definitie en de metadata om te kunnen visualiseren), **drie lagen** (generiek ODRL; profiel-gedeclareerd via UI-shapes; en een raw vangnet voor data die nergens getoond wordt) en het verwijzen naar de **registers** waar labels uit voortkomen. De basis wil men internationaal krijgen, zodat het geen Nederlands-specifiek verhaal blijft.

*Hans Schevers* herkent er een SHACL-model in: een toetsbaar regime waarop je vervolgens een visualisator specificeert. *Michiel* bevestigt: SHACL dwingt af welke relaties nodig zijn, en in de middenlaag koppelen DASH en SHUI de SHACL-structuren aan formulierstructuren.

Op vraag van *Mark Westbroek* ("heb je dat al gemaakt?") volgt een demo van de gebouwde visualizer op de BRP-casus: aanbod, overeenkomsten en per doelbinding de gegevensset in groepen en rubrieken — dat laatste BRP-specifiek als domeinlaag. *Mark* vraagt naar de menselijk leesbare tekstvorm die ooit het eerste idee was. *Michiel* laat zien dat de voorwaardenweergave er nog steeds is, maar dat "mensleesbaar" hier geen lap tekst betekent: de weergave in blokjes is mens-interpreteerbaar zonder uitvoerbaar te hoeven zijn. *Mark* toetst het doel: een senior medewerker of functioneel beheerder — iemand uit het domein, geen ontwikkelaar — moet dit kunnen lezen. Dat is precies de bedoeling; via bijvoorbeeld data.overheid.nl zou je vanuit een BRP-entry kunnen doorklikken naar het toegangsbeleid. Ook een geo-voorbeeld komt langs (GMW-meetnet provincie Utrecht, "alleen features met gevoeligheidswaarde kleiner dan vier") — enigszins technisch, maar voor iemand uit het domein te begrijpen.

Ter contrast toont *Michiel* externe, bestaande policies in dezelfde viewer: bij het JP Morgan-voorbeeld verschijnen kale identifiers ("T1", "verplichting O1") zonder betekenisvolle namen, en het officiële dataspace-voorbeeld toont een UUID met een invalide voorwaarde. Precies het probleem dat het labelling-regime moet oplossen: met de juiste labels en registerfragmenten wordt dezelfde data voor een leek begrijpelijk.

{{< /chapter/section >}}

{{< chapter/section title="ODRL-AP-NL: de Nederlandse toevoegingen" >}}

*Michiel* presenteert de drie toevoegingen van het Nederlandse applicatieprofiel bovenop het visualisatie-regime:

- **Doelbinding**: de overheid werkt met doelbindingen; het voorstel is die te definiëren als het patroon *permission met een purpose-refinement* (met het DPV-purpose-veld), in plaats van als eigen element. Elke permission die tot één doel gescoped is, ís een doelbinding.
- **Koppeling naar machine-uitvoerbaar beleid**: in de praktijk werkt vrijwel iedereen met Rego, Cedar en dergelijke. Een `conformsToPolicy`-mechanisme zegt expliciet: modelleer je het verzoek conform dit AuthZEN-verzoek en toets je het aan deze policy bundle, dan voldoe je aan deze eis.
- **Relatie Offer ↔ Agreement**: basis-ODRL kent geen gedefinieerde relatie tussen aanbod en overeenkomst, terwijl je stelselvereisten (zoals de verplichtingen voor BRP-afnemers) juist op het aanbod zet. Het voorstel voegt die relatie toe — kandidaat om ook bij ODRL 3 (of 2.3) aan te dragen.

Over het verder uitbreiden met Europese vocabulaires (org voor rollen, CPSV voor diensten) is *Michiel* zelf aarzelend: moet het profiel arbiter worden van welke ontologieën worden aangeraden? *Danny Greefhorst* merkt op dat een bredere scope (gegevensleveringsovereenkomsten) sowieso meer soorten elementen de scope in trekt, maar vindt dat er in Nederland afspraken gemaakt moeten worden: in het Nederlandse profiel kún je dat doen. *Mark Westbroek* zou het ook doen. *Michiel* ziet het als bruggetje om het Nederlandse linked-data-standaardisatieveld aan te spreken. De begrippenlaag wordt NL-SBB-conform opgezet zodat het internationaal aansluit; of ook juridische verwijzingen gestandaardiseerd moeten worden is onderdeel van de bredere discussie.

*Mark Westbroek* vertelt parallel bezig te zijn geweest met een tekstgeoriënteerde insteek: een tekstdiagram dat geïnterpreteerd wordt, met kleuren voor herkende voorwaarden, werkwoorden en zelfstandige naamwoorden, en een grafische weergave — semantische blokjes die je verbindt volgens het metamodel, met doorklik naar het gegevensmodel. *Danny* ziet er een domeinspecifieke taal in ("een soort RuleSpeak") en vraagt Mark hem erover te mailen; hij is zelf met een domeinspecifieke taal voor gegevenskwaliteit bezig.

{{< /chapter/section >}}

{{< chapter/section title="Scope-discussie en vervolgstappen" >}}

*Danny Greefhorst* stelt de scopevraag: staat visualisatie niet ver af van toegang? *Michiel* beargumenteert van niet: het register toegangsbeleid heeft als doel toegangsbeleid inzichtelijk te maken, en ODRL zonder visualisatie is "maar linked data" — bij eerdere presentaties (onder meer bij iWlz) bleek dat een RDF-weergave de vraag opriep "wat koop ik hiervoor als organisatie?". Zonder ODRL-visualisatie is ODRL gebruiken voor inzicht in toegangsbeleid tussen organisaties niet te doen; het is een harde vereiste. Wel is het een scope-uitbreiding — mede daarom wordt de koppeling met Open FTV gezocht: al het Open FTV-beleid moet in ieder geval naar dit formaat geëxporteerd kunnen worden, en idealiter kan de FTV-editor het direct bewerken.

*Govert Claus* bevestigt dat GBO tegen hetzelfde visualisatievraagstuk aanloopt en het zeer interessant vindt, al staat de gedetailleerde uitwerking verder van zijn bed. Hij licht op vraag van *Mark Westbroek* kort de GBO-aanpak toe: via één GraphQL-API gegevens beschikbaar stellen aan verschillende gegevensstromen — waarbij je qua toegang niet ontkomt aan een FTV-achtige oplossing. Er is een demo (link volgt) en het idee is volgend jaar pilots in te richten.

**Rondvraag.** Op de vraag waar deelnemers nu concreet staan geven *Axel van der Minne* en *Hugo Mostard* aan dat dit voor hun organisaties nog een stap te ver is — het past in het grote plaatje dat zij aan het tekenen zijn, maar concreet werk eraan is er nog niet (inschatting: minstens twee jaar). *René Kint* noemt als meest levende aspect **conditionele toegang**: het aan- en uitzetten van toegang, ook geografisch gebonden — binnen zoveel kilometer van een militaire luchthaven mag bepaalde data wél of juist niet getoond worden, vooral in combinatie met eisen van Defensie die momenteel een grote stempel drukken op toegang. De vraag hoe je die "tenzij" modelleert en dynamisch, real-time uitwisselt is voor hem een interessant onderdeel. Tot slot vraagt *René* of de getoonde tooling ergens anders dan op localhost staat; *Michiel* zegt toe de code te publiceren zodra hij hem zelf voldoende doorgrondt, met een duidelijke LLM-disclaimer.

Afgesproken vervolgstappen:

- **Cadans terug naar de basis**: naast het ODRL-spoor weer sessies over autorisatie in het algemeen en hoe het er bij concrete systemen (zoals GBO) aan toegaat — daar wordt instemmend op gereageerd.
- **Linked-data-spoor deels scheiden**: het diepe linked-data-werk (mede voor Igor, Robert, Hugo, Axel) apart organiseren en de partijen die daarin actief zijn aanhaken, zodat de rest van de werkgroep de aansluiting niet verliest.
- Mogelijk **GBO-presentatie** in een komende sessie; *Govert* deelt alvast een link naar de demo.
- Een **iWlz-update** van Igor en Guus in een komende sessie; afstemming loopt buiten de sessie om.
- *Marc* neemt contact op met *Danny* over de JAGA-gegevensleveringscontacten bij J&V.
- *Mark Westbroek* mailt *Danny* over zijn tekstdiagram-aanpak.
- *Michiel* publiceert de viewer-code (met een duidelijke LLM-disclaimer) op verzoek van *René Kint*.

{{< /chapter/section >}}

{{< chapter/section title="" >}}

*Deze notulen zijn met behulp van een LLM gegenereerd uit de opname en gereviewd door mensen.*

{{< /chapter/section >}}
