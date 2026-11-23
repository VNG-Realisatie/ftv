---
type: 'chapter'
Title: GraphQL-autorisatie & ADL
---
{{< chapter/section title="" >}}
# GraphQL-autorisatie & ADL (10 november 2026)

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Gideon Zegwaard (FDS)
- Peter-Jan Karens (GBO)
- Jeroen de Kok (GBO)
- Igor van Haren (Vecozo)
- Marcel Molenaar (UWV)
- Axel van der Minne (DUO)
- Stas Mironov (Logius)
- Rob van Dort (Logius)
- Guus van der Meer (Vecozo)
- Hans Hendrikman (RvIG)
- Hans Schevers (BIM-Connected)
- Hugo Mostard (Gemeente Den Haag)
- Joyce Leijen-Kouwenberg (Zorginstituut Nederland)
- Remo van Rest (Zorginstituut Nederland)
- René Kint (Zicht op Nederland)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20261110-graphql-adl.mp4)
- [Presentatie](/ftv/documents/20261110-graphql-adl.pdf)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking
- Terugkoppeling en vervolg GraphQL
- Openstaande issues in Authorization Decision Log
- Voorstel redactie in Authorization Decision Log
- Planning vervolg
{{< /chapter/section >}}

{{< chapter/section title="Terugkoppeling en vervolg GraphQL" >}}

*Michiel Trimpe* koppelt de afstemsessie over GraphQL-autorisatie terug
die na de werkgroep van 29 september is gehouden met GBO, Vecozo en de
Wlz-keten, BKWI, FDS, Logius, het Kennisplatform API's en FTV. Die sessie
is niet opgenomen; de samenvatting staat in de presentatie. In het kort:
de Wlz-keten heeft het profiel in een proef toegepast en vindt de policies
eenvoudiger en beter te begrijpen, BKWI vindt het passend maar ondersteunt
nog geen dataminimalisatie, en de vraag waar GraphQL in de
overheidsstandaarden thuishoort is open.

**GraphQL of dataminimalisatie als onderwerp.** *Gideon Zegwaard* vult aan
dat de plaats van GraphQL ten opzichte van het REST API-profiel van
Digikoppeling een grijs gebied is. Volgens hem is in de afstemsessie
afgesproken dat het Kennisplatform dataminimalisatie voordraagt, met
GraphQL als goede maar niet per se enige invulling: de functionele
behoefte staat voorop. *Peter-Jan Karens* was bij de latere
kwartaalbijeenkomst van het Kennisplatform, waar een sessie over GraphQL
is gehouden. Daar vroegen meerdere partijen uitdrukkelijk om
standaardisatie van GraphQL zelf, ook partijen buiten GBO, en hij ziet
daarmee voldoende animo voor een werkgroep over dat onderwerp. *Michiel*
bevestigt beide lezingen: de behoefte in de zaal was breder dan
dataminimalisatie en lijkt op die waarmee de REST API Design Rules ooit
begonnen. Het is aan het Kennisplatform om de werkgroep in te richten en
te kaderen.

**Reikwijdte en beveiliging.** *Gideon* geeft mee dat FDS sturing wil
geven op dataminimalisatie. Een GraphQL-traject dat dat doel niet of niet
goed afdekt, of dat zich beperkt tot verkeer tussen een server en een
webapplicatie binnen één toepassing, helpt FDS en GBO niet. Hij wijst op
de zorgpunten in de blogs van Joost Farla, zoals query's die een server
overmatig belasten en een groter aanvalsoppervlak. Komt er een profiel
dat Digikoppeling om beveiligingsredenen niet opneemt, dan is er niets
gewonnen. *Igor van Haren* ziet weinig verschil met REST: dezelfde
beveiligingsmaatregelen zijn toepasbaar, en de zorgpunten zijn af te
vangen als een standaard ze benoemt. *Peter-Jan* is het met *Gideon*
eens over de reikwijdte: de Wlz-keten en GBO wisselen tussen servers uit.
Hij was het niet met alles in de blogs eens en ziet een werkgroep als de
plek om dat samen uit te werken, in fasen. *Rob van Dort* merkt op dat
dataminimalisatie in GraphQL een ingebouwd concept is, terwijl het bij
REST een constructie bovenop de standaard is.

**Besluit** — De werkgroep brengt het volgende standpunt in bij het
traject van het Kennisplatform API's:

- Bij elk verzoek hoort te worden aangegeven welke gegevens worden
  opgevraagd, met goede toegangsverlening daarop.
- Een kleine, gekaderde variant van GraphQL (een eenvoudige bevraging op
  een statisch schema) kan qua veiligheid gelijkwaardig zijn aan REST.
- De werkgroep die er komt, adresseert dataminimalisatie.
- De uitkomst wordt overheidsbreed besproken, getoetst en gedragen, niet
  alleen door de beheerders van standaarden.

**Aanbieden bij OpenID AuthZEN.** *Michiel* legt voor om het
GraphQL-profiel te ontdoen van de Nederlandse context en internationaal
aan te bieden bij de AuthZEN-werkgroep. Een internationale standaard
scheelt beheer en vergroot de adoptie, en de leveranciers in die
werkgroep vormen een brug naar de GraphQL-leveranciers. *Rob* noemt het
een nobel streven. *Igor* stelt voor het eerst te toetsen: wordt het met
open armen ontvangen, dan is het niet te veel werk; moet er hard aan
getrokken worden, dan heroverweegt de werkgroep. Op de vraag van
*Axel van der Minne* hoeveel werk het strippen is, antwoordt *Michiel*
dat hij vooral wegstrepen verwacht en weinig aanpassen, maar dat hij het
werk nog niet heeft gedaan.

**Besluit** — De werkgroep biedt het GraphQL-profiel aan bij OpenID
AuthZEN, zonder het te pushen. *Michiel* zegt toe te bezien of dat binnen
de resterende tijd en capaciteit lukt; het is geen toezegging dat het
gebeurt.

{{< /chapter/section >}}

{{< chapter/section title="Openstaande issues in Authorization Decision Log" >}}

**Normen voor de omgang met logs.** Pim Gaemers (FSC) heeft in een issue
gemeld dat de sectie over beveiliging en integriteit van de log
informatief is en niet normatief, zodat uit "wij implementeren ADL" niet
volgt hoe een organisatie intern met de log omgaat. *Michiel* licht toe
dat dit een bewuste keuze is, mede op aanraden van de IBD: de omgang met
logs is te organisatiespecifiek om te normeren. In het issue heeft Pim
aangegeven daarmee te kunnen leven, en gepleit voor een holistische blik
over de standaarden heen, omdat ook FSC en LDV logs kennen.
*Stas Mironov* meldt dat dit eerder is
voorgelegd en dat partijen het als een eigen aangelegenheid zagen.
*Peter-Jan* verwacht ruis en inconsistenties als standaarden eisen uit
aanpalende standaarden herhalen: in het beste geval is het een
verduidelijking, in het slechtste loopt het uit de pas met de plek waar
het hoort. *Gideon* stelt voor in de sectie op te nemen dat dit een
algemeen vraagstuk is voor alle vormen van logging; dat verantwoordt
meteen waarom de sectie informatief is.

**Besluit** — De werkgroep normeert de omgang met de log niet. De
informatieve sectie blijft staan en krijgt een inleidende zin dat het
vraagstuk voor alle logs geldt en dat ADL daarvoor niet de standaard is.

**Normatieve sleutelwoorden in informatieve tekst.** In dezelfde sectie
stonden sleutelwoorden als MUST in hoofdletters. *Michiel* heeft ze in
kleine letters gezet. *Peter-Jan* wijst op RFC 8174 over het onderscheid
tussen hoofd- en kleine letters. *Michiel* zegt toe de zinnen te
herschrijven zodat de sleutelwoorden er niet meer in voorkomen; de
wijziging gaat mee in versie 1.1.

{{< /chapter/section >}}

{{< chapter/section title="Voorstel redactie in Authorization Decision Log" >}}

*Michiel* licht het voorstel toe (zie de presentatie). De standaard staat
al toe dat gegevens om privacyredenen uit een logrecord worden
weggelaten, maar beschrijft niet hoe dat wordt gemarkeerd. Het voorstel
neemt de conventie van OPA over: het record vermeldt zelf welke velden
zijn gewist of gemaskeerd, zodat een lezer het als bewust onvolledig kan
behandelen.

**Meerdere logs en logdoelen.** *Marcel Molenaar* onderscheidt drie
logdoelen (incidentmanagement, audit en compliance, en operationeel
beheer) die elk andere gegevens vragen, en vraagt of het voorstel bedoeld
is om die te koppelen. *Michiel* antwoordt dat dat niet het doel is maar
wel kan, bijvoorbeeld tussen LDV voor verantwoording aan de burger en ADL
voor verantwoording binnen de organisatie. Een eerdere versie van het
voorstel beschreef dat verschillende componenten hetzelfde record in
verschillende mate kunnen redigeren; die passage is geschrapt en kan op
grond van deze inbreng terugkomen.

**Trace-ID als persoonsgegeven.** *Igor* meldt dat de juristen van zijn
organisatie het trace-ID als persoonsgegeven aanmerken, omdat het via een
andere log tot een persoon te herleiden is. Er zijn maatregelen gevraagd
om die relatie over functies heen zo goed als onmogelijk te maken; hij
verwacht dat andere organisaties hier ook tegenaan lopen. *Gideon*
nuanceert: de conclusie dat het persoonsgegevens zijn, betekent niet dat
de traceerbaarheid moet verdwijnen. Er moeten maatregelen zijn tegen
onjuist gebruik, en het is niet nodig zich in bochten te wringen om iets
geen persoonsgegeven te laten zijn. *Marcel* zoekt de oplossing in
toegangsrechten op de logs en wijst op de plicht om fraude te kunnen
onderzoeken. *Igor* vat de vraag aan de juristen samen als: hoe hoog moet
het muurtje ertussen zijn. *Axel* herkent de discussie uit zijn eigen
organisatie: niet het loggen maar het ontsluiten en gebruiken van logs
wordt scherp bewaakt. Binnen incidentmanagement mag het, tonen aan
burgers is nog ver weg. Op de suggestie van *Marcel* om hier een aparte standaard voor te
maken, verwijst *Michiel* naar het besluit bij het vorige agendapunt: dit
hoort niet in ADL, dat over het logformaat gaat. *Michiel* stelt voor
dat *Stas* het onderwerp bij de beheerder van LDV aankaart, omdat LDV
trace-ID's juist gebruikt voor verantwoording aan de burger.

*Peter-Jan* brengt het terug tot de vraag die voorligt: wie wil maskeren
of wissen, hoe doet die dat. Hij vindt het goed dat dat netjes beschreven
is; *Jeroen de Kok* sluit zich daarbij aan.

**Verplicht of aanbevolen.** Een verplichte vermelding is een breaking
change en vraagt versie 2.0; een aanbeveling past in 1.1. *Stas* vindt
het aan de werkgroep en het technisch overleg en zou voor de harde eis
gaan als nog niemand de standaard heeft geïmplementeerd. *Gideon* is
terughoudend met een breaking change binnen een jaar na de eerste versie,
omdat dat implementeerders onrustig maakt; hij stelt voor het nu niet
brekend te houden en het op de lijst voor 2.0 te zetten. *Rob* vindt dat
verstandig. *Stas* kan zich daarin vinden en ziet het als werkwijze om
vaker te volgen: eerst aanbevelen en beproeven, later brekende
wijzigingen bundelen.

**Besluit** — De vermelding van gewiste en gemaskeerde velden wordt
aanbevolen (RECOMMENDED) in versie 1.1, als oploop naar een verplichting
in versie 2.0.

{{< /chapter/section >}}

{{< chapter/section title="Functioneel toepassingsgebied" >}}

Op verzoek van *Stas* legt *Michiel* het aangepaste functioneel
toepassingsgebied voor de aanmelding bij Forum Standaardisatie voor. De
vorige versie riep de vraag op hoe diep in de organisatie de standaard
geldt. De nieuwe tekst legt de grens bij de verantwoording: ADL wordt
toegepast voor het vastleggen van toegangsbeslissingen op API-verzoeken
om er later verantwoording over af te kunnen leggen, zowel binnen een
organisatie als in organisatie-overstijgende verwerkingsketens zoals het
Federatief Datastelsel.

**Besluit** — De werkgroep gaat akkoord met het aangepaste functioneel
toepassingsgebied.

*Peter-Jan* vraagt of de beperking tot API-verzoeken bewust is. *Michiel*
bevestigt dat: API is bedoeld als application programming interface, niet
als REST- of web-API, in lijn met AuthZEN; ook een databaseaanroep of een
schrijfactie op een bestandssysteem valt eronder. *Marcel* verwacht dat
lezers dat niet vanzelf zo opvatten. *Stas* voegt toe dat wie de lijst
van standaarden leest, de terminologie in de standaard vaak niet
opzoekt. *Peter-Jan* stelt vast dat de zin vrijwel de vertaling is van
de eerste zin van de samenvatting van de standaard. *Michiel* zegt toe
de betekenis van API in de terminologie en de samenvatting van de
standaard te verduidelijken, in versie 1.1.

{{< /chapter/section >}}

{{< chapter/section title="Vervolgstappen" >}}

- *Michiel* werkt het standpunt van de werkgroep over GraphQL uit voor
  het traject van het Kennisplatform API's.
- *Michiel* beziet of het GraphQL-profiel binnen de beschikbare tijd
  kan worden ontdaan van de Nederlandse context en aangeboden bij OpenID
  AuthZEN.
- *Michiel* verwerkt in ADL 1.1: de inleidende zin bij de informatieve
  sectie, het herschrijven van de sleutelwoorden, de aanbevolen
  vermelding van gewiste en gemaskeerde velden, en de verduidelijking
  van API in terminologie en samenvatting.
- *Michiel* legt bij de beheerder van LDV voor of die bij de discussie
  over het trace-ID als persoonsgegeven betrokken wil zijn.

De volgende sessie, op 24 november, staat in het teken van de
subwerkgroepen van ODRL-AP-NL.

{{< /chapter/section >}}

{{< chapter/section title="" >}}
*Dit verslag is met een LLM gegenereerd op basis van de opname en door mensen gereviewd.*
{{< /chapter/section >}}
