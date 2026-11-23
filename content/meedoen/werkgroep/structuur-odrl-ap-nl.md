---
type: 'chapter'
Title: Structuur ODRL-AP-NL
---
{{< chapter/section title="" >}}
# Structuur ODRL-AP-NL (27 oktober 2026)

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Marc de Boer (FTV)
- Gideon Zegwaard (FDS)
- Lennart van Bergen (Belastingdienst)
- Stas Mironov (Logius)
- Wessel Schollmeijer (Logius)
- Peter-Jan Karens (GBO)
- Govert Claus (GBO)
- Jeroen de Kok (GBO)
- Igor van Haren (Vecozo)
- Guus van der Meer (Vecozo)
- Remo van Rest (Zorginstituut Nederland)
- Joyce Leijen-Kouwenberg (Zorginstituut Nederland)
- Axel van der Minne (DUO)
- Mark Westbroek (VNG)
- Hans Schevers (BIM-Connected)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20261027-structuur-odrl-ap-nl.mp4)
- [ODRL-AP-NL (werkversie, ReSpec)](https://digilab.overheid.nl.gitlab.io/ecosystem/ftv/odrl-ap-nl/)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking
- Vervolg GraphQL-autorisatie
- Toepassingsgebied Authorization Decision Log
- Terugkoppeling kick-off ODRL-AP-NL van 6 oktober
- Subwerkgroepen, beheer en naam
- Scope en structuur van ODRL-AP-NL
- Planning vervolg
{{< /chapter/section >}}

{{< chapter/section title="Welkom en kennismaking" >}}

*Michiel Trimpe* opent de sessie. Door ziekte is de sessie van 13 oktober
vervallen en heeft hij de afgelopen weken weinig kunnen oppakken; daarom
staat vandaag alsnog ODRL op het programma in plaats van de geplande
IAM-editie, met een provisorische agenda: de kick-off van 6 oktober
bespreken, een structuurvoorstel voor ODRL-AP-NL en de Forum-aanmelding
van de Authorization Decision Log.

*Lennart van Bergen* werkt bij het CDO Office van de Belastingdienst en
houdt zich bezig met standaarden. Hij is mede-auteur van het metamodel
voor informatiemodellen (MIM) en beheert een metadata-administratie
waarin gegevens-, kennis- en SBB-modellen worden opgeslagen voor
hergebruik. ODRL is nieuw voor hem, maar de vraag wanneer welke gegevens
waarvoor gebruikt mogen worden speelt bij de Belastingdienst steeds
meer; *Wessel* wees hem op de werkgroep.

*Wessel Schollmeijer* is content architect bij Logius in het domein
publicaties, waar linked data en standaarden centraal staan. Hij was bij
de workshop in Utrecht en wil meewerken aan het linked-dataprofiel.
*Jeroen de Kok* werkt voor het project GBO en was, net als meer
aanwezigen, gekomen voor het IAM-onderwerp.

{{< /chapter/section >}}

{{< chapter/section title="Vervolg GraphQL-autorisatie" >}}

*Peter-Jan Karens* merkt op dat collega's uit de Wlz-keten
(Zorginstituut, Vecozo) en GBO specifiek voor het IAM-onderwerp zijn
aangeschoven en vraagt hoe het vervolg op het GraphQL-voorstel wordt
opgepakt. *Michiel* licht toe dat de afstemming die tijdens zijn ziekte
had moeten plaatsvinden er nog niet van is gekomen. Hij stelt voor om
binnen twee weken een aparte sessie te organiseren waarin de betrokken
partijen hun perspectief op het GraphQL-autorisatieprofiel geven: iWlz,
GBO, FDS, BKWI en Logius. Daarbij hoort ook de vraag wie zo'n standaard
beheert en hoe die zich verhoudt tot bredere standaarden zoals
Digikoppeling; *Stas Mironov* brengt daarvoor het Logius-perspectief en
mogelijk dat van de API-standaarden in. De uitkomst komt terug in de
werkgroep, zodat daar de bredere besluiten genomen kunnen worden.
*Peter-Jan* vindt dat een redelijk voorstel.

**Afspraak** — *Michiel* stuurt vandaag een datumprikker aan alle
betrokkenen.

{{< /chapter/section >}}

{{< chapter/section title="Toepassingsgebied Authorization Decision Log" >}}

*Stas* deelt het aanmeldformulier voor Forum Standaardisatie. Logius meldt
de standaarden die het beheert in het domein gegevensuitwisseling aan bij
het Forum, als aanbevolen standaard of voor de
pas-toe-of-leg-uit-lijst. Het formulier vraagt om een toepassingsgebied
en om use cases; het toepassingsgebied geeft gebruikers die de standaard
voor het eerst op een lijst zien houvast over wanneer ze hem toepassen of
uitvragen bij een aanbesteding. Voor de Authorization Decision Log is dat
toepassingsgebied in de werkgroep nooit expliciet vastgesteld; *Michiel*
verwacht hier minder gevoeligheid dan destijds bij AuthZEN.

Op de vraag van *Gideon Zegwaard* of de tekst bewust niet aan AuthZEN is
gekoppeld, bevestigt *Michiel* dat het informatiemodel ook zonder AuthZEN
bruikbaar is; *Gideon* beaamt dat ook een in de applicatie ingebouwde
autorisatie op deze manier gelogd kan worden.

*Lennart* vraagt of de standaard meereist als een API-verzoek verder de
organisatie in gaat, of alleen geldt op het grensvlak waar de API leeft.
*Gideon* leest de tekst zo dat hij geldt overal waar een
toegangsbeslissing wordt genomen waarover verantwoording moet worden
afgelegd, en dat kan gelaagd zijn: een externe API die onderliggende
API's aanroept, met telkens een eigen beslissing. *Igor van Haren* vult
aan dat elk record alleen de eigen beslissing verantwoordt; latere
acties krijgen aparte records, anders is het technisch niet af te
dwingen. *Michiel* benoemt de grens: een databasequery is technisch ook
een API-verzoek, maar zo'n intern detail hoeft niet verantwoord te
worden; de verantwoordingsbehoefte zit aan de buitenkant, bij de vraag op
grond van welk toegangsbeleid toegang is verleend. *Stas* vraagt waarom
de trace context dan wordt meegegeven, als het niet om de keten gaat;
*Michiel* antwoordt dat doorgeven wel de bedoeling is, maar dat niemand
verplicht is dat tot in de diepte van de technische infrastructuur te
doen. *Gideon* vat samen dat dit deel van de standaard alleen over het
loggen van de beslissing gaat en niet over wat verder in de keten wordt
doorgegeven; dat is het terrein van AuthZEN zelf. *Lennart* kan met beide
lezingen leven, zolang duidelijk is welke het is.

*Michiel* stelt voor de omschrijving in te korten tot "toegangsbeslissingen
op API-verzoeken", zonder de uitsplitsing naar geheel, gedeeltelijk of
geweigerd, en de tekst expliciet te maken over vanaf waar hij geldt.
*Gideon* wijst nog op een tikfout.

**Besluit** — De werkgroep gaat akkoord met het toepassingsgebied,
mits de reikwijdte binnen de keten explicieter wordt verwoord. *Michiel*
en *Stas* scherpen de tekst aan.

*Stas* vraagt daarnaast om use cases: wie de Authorization Decision Log
al gebruikt of wil gebruiken meldt dat bij hem, want een standaard
zonder gebruikers is niet breed gedragen. Dat wordt offline en in een
volgende sessie opgehaald. Hij stelt voor dezelfde exercitie voor
ODRL-AP-NL te doen vóórdat het profiel wordt geschreven; dat staat
vandaag op de agenda.

{{< /chapter/section >}}

{{< chapter/section title="Terugkoppeling kick-off ODRL-AP-NL van 6 oktober" >}}

*Michiel* vat de kick-off in Utrecht samen; de volledige uitwerking staat
in de werkversie van het profiel (zie bijlagen). Uitgangspunt was het
standaard ODRL-informatiemodel, met de vraag wat de Nederlandse
overheidscontext daar bovenop nodig heeft. Genoemd zijn de grondslag,
de aanvraagcyclus (vergelijkbaar met autorisatiebesluiten), het
modelleren van toegestane acties zoals AVG-verwerkingen,
weigeringsgronden, groepen partijen (niet alleen technische rollen maar
ook burgers met bepaalde attributen), machtigingen en agents, en
standaardomschrijvingen voor verboden en plichten. Een terugkerend punt
was het niveau van beleid: stelselafspraken over hoe je tot
gegevensdeling komt, juridisch toegangsbeleid per dataset en technisch
beleid op attribuutniveau lopen in gesprekken door elkaar, en het
profiel moet duidelijk maken over welk niveau het gaat.

Het tweede thema was de inbedding in het bredere linked-dataveld:
hoe ODRL-AP-NL aansluit op DCAT-AP-NL en vindbaar is, en hoe het zich
verhoudt tot vocabulaires als DPV, ELI, CPSV en CPRMV, Verifiable
Credentials, NL-SBB, TOOI, DQV en de NORA-rollen. Als algemeen principe
kwam het eigenaarschap van waardelijsten naar voren: eerst een bestaande
term zoeken, dan de term aandragen bij de logische eigenaar en pas als
laatste optie zelf iets definiëren. Aan normatieve keuzes (wat wordt
MUST, SHOULD of MAY) is de workshop niet toegekomen.

*Gideon* voegt de relatie met informatie- en gegevensmodellen (MIM) toe:
policies verwijzen vaak naar gegevensmodellen, zeker als ze die willen
inperken. De aanwezigen die bij de workshop waren herkennen de
samenvatting.

{{< /chapter/section >}}

{{< chapter/section title="Subwerkgroepen, beheer en naam" >}}

**Subwerkgroepen.** De workshop stelde twee subwerkgroepen voor: één voor
het informatiemodel en één voor linked data. Voor het informatiemodel
hebben *Mark*, Maryse, Rens en Rob zich opgegeven, voor linked data
*Wessel* en Rens. *Hans Schevers* sluit alsnog aan. *Gideon* wil
reviewen als zijn tijd het toelaat. *Govert Claus* legt de vraag neer
bij een GBO-collega die dit als aandachtsgebied heeft; *Michiel* spreekt
hem komende maandag. *Michiel* nodigt de subwerkgroepen uit voor
concrete werksessies.

**Beheer.** *Michiel* heeft een ReSpec-document als kapstok opgezet,
voorlopig op de GitLab van Digilab, en vraagt of dat ook bij Logius kan
staan. *Stas* antwoordt dat technisch alles kan, maar dat Logius nog
geen officiële opdracht voor ODRL-AP-NL heeft; hij kan daarom alleen
reviewen en niet meeschrijven. Hij kijkt of de repository alvast bij
Logius op GitHub kan worden ingericht en zet het administratieve proces
in gang; de overdracht zelf kan wanneer er tijd voor is.

**Naam.** Op de vraag van *Stas* of de naam ODRL-AP-NL vaststaat, ook
met het oog op de website, licht *Michiel* toe dat de werkgroep aan het
begin heeft besloten de standaarden in het Engels te schrijven en
termen zorgvuldig te vertalen. Het is bewust een applicatieprofiel: een
klassiek ODRL-profiel modelleert een domein in ODRL, terwijl dit, net
als DCAT-AP-NL, een profiel voor toepassing binnen de Nederlandse
overheid is. Bezwaren of suggesties zijn welkom, liever eerder dan
later; er worden er geen ingebracht.

{{< /chapter/section >}}

{{< chapter/section title="Scope en structuur van ODRL-AP-NL" >}}

**Scope.** De scope is in feite het toepassingsgebied dat ook het Forum
vraagt. *Michiel* legt een randgeval voor: het Dataspace Protocol
gebruikt ODRL-fragmenten in de contractonderhandeling, zonder een
volledig beleid te definiëren. Op verzoek van *Stas* zoekt hij daar
later een voorbeeld bij. Zijn insteek is dat ODRL-AP-NL bedoeld is voor
inzicht in toegangsbeleid tussen overheidsorganisaties en richting
burgers. *Gideon* schetst het FDS-perspectief: het primaire belang is
onderlinge transparantie tussen aanbieders en afnemers over het
toegangsbeleid dat zij toepassen, liefst zo dicht mogelijk op de
technische uitvoering. Transparantie naar derden en betrokkenen is een
breder doel waarvoor andere partijen eisen bij het FDS neerleggen.
*Michiel* vult aan dat een juridisch specialist eerder heeft bevestigd
dat dit onder de Woo valt, maar niet onder de proactieve
openbaarmakingsplicht: een organisatie hoeft het niet uit zichzelf te
ontsluiten, maar moet het op verzoek wel delen.

**Besluit** — ODRL-AP-NL richt zich op twee verplichtingen:
verantwoording en inzicht tussen overheidsorganisaties, zoals het FDS
dat benoemt, en verantwoording en inzicht naar derden en burgers vanuit
het open-overheidsperspectief. De technische contractonderhandeling van
het Dataspace Protocol valt buiten de scope. De doelgroep zijn
FDS-deelnemers en burgers of belanghebbenden.

**Structuur.** *Michiel* presenteert de kapstok van het document. Het
volgt het delta-principe: niet ODRL herhalen, maar beschrijven wat
Nederland eraan toevoegt. Een eigen sectie benoemt het niveau van
toegangsbeleid. Daarna volgen twee hoofdstukken. Het informatiemodel
houdt dezelfde indeling als ODRL aan en voegt per klasse de delta's toe,
zoals grondslag, verwijzingen naar wetgeving, verplichte identifiers en
versionering bij de policy, en bij partijen de uitleg hoe een party
collection met refinement een groep als "alle burgers met attributen X,
Y en Z" uitdrukt. De linked-data-integratie begint met de best
practices over eigenaarschap, krijgt een aparte sectie voor DCAT-AP-NL
en loopt dan langs Nederlandse, Europese en internationale
vocabulaires. Open vraag is waar de eigen URI's van de toevoegingen
komen: bij het informatiemodel of in het linked-datahoofdstuk. Het
document gaat nog naar het Engels.

*Gideon* stelt voor in elke stap één of twee concrete casussen mee te
nemen, zoals het BRP-autorisatiebesluit, desnoods versimpeld, zodat de
tekst steeds te toetsen is; bij meerdere niveaus liefst twee casussen
op verschillende niveaus. *Michiel* neemt dat over, zoals ook bij de
Authorization Decision Log is gedaan.

*Lennart* vraagt of hoofdstuk 4 een MIM-model wordt, of dat het gaat om
verwijzen naar de gegevens waarop een policy betrekking heeft. *Gideon*
en *Michiel* lichten toe dat het hoofdstuk het informatiemodel van de
policyregistratie zelf beschrijft, zoals ODRL dat definieert; verwijzen
naar gegevensmodellen is een ander aspect. *Lennart* houdt zich
beschikbaar voor vragen over MIM. *Mark Westbroek* wijst erop dat het
ODRL-metamodel maar één kleine klasse heeft voor de data waarop beleid
betrekking heeft, zonder standaard om ernaar te verwijzen; dat deel wil
hij uitbreiden met handvatten voor wie een profiel schrijft, of dat nu
met MIM of een ander model is. *Michiel* merkt op dat de DCAT-werkgroep
daaraan werkt met de Vocabulary for Variable Descriptions, dat ODRL 3
net is gestart en dat de werkgroep daar een visualisation note aan wil
bijdragen. Hoe ODRL-AP-NL zich tot die rijdende treinen verhoudt, is
een onderwerp voor de sessie over vier weken.

{{< /chapter/section >}}

{{< chapter/section title="Vervolgstappen" >}}

- *Michiel* stuurt vandaag een datumprikker voor de afstemsessie over
  GraphQL-autorisatie met iWlz, GBO, FDS, BKWI en Logius; de uitkomst
  komt terug in de werkgroep van 10 november.
- *Michiel* en *Stas* scherpen het toepassingsgebied van de Authorization
  Decision Log aan voor de Forum-aanmelding; wie de standaard gebruikt
  of wil gebruiken meldt dat bij *Stas*.
- *Michiel* nodigt de subwerkgroepen informatiemodel en linked data uit
  voor werksessies; *Stas* zet het proces voor beheer bij Logius in gang.
- *Michiel* plant een gesprek met *Lennart* over zijn bijdrage.
- Over vier weken bespreekt de werkgroep de eerste resultaten van de
  subwerkgroepen en de verhouding tot ODRL 3, de visualisation note en
  het DCAT-werk aan verwijzingen naar gegevensmodellen.

{{< /chapter/section >}}

{{< chapter/section title="" >}}
*Dit verslag is met een LLM gegenereerd op basis van de opname en door mensen gereviewd.*
{{< /chapter/section >}}
