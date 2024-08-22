---
weight: 40
---

# Positie

Op deze pagina geven we een moment-opname weer van onze positie t.a.v. toegangsverlening in het algemeen en toegangsverlening op API's in het bijzonder.

Dit verhaal zal gedurende het project een veranderd karakter hebben, en zal daarom pas na verloop van tijd het complete plaatje bevatten.

Omdat we nog gedeeltelijk in een inventarisatiserende fase verkeren, maar ook al in een orienterende fase,
is er veel behoefte om deze ideeen en zienswijzen te delen en feedback te vergaren.
Om dat in goede banen te leiden kan deze pagina als één van de uitgangspunten dienen om die discussies aan te gaan.

## Inventarisatie
We hebben gezien dat er al heel veel geschreven is over autorisatie en toegangsverlening.
We zijn al vele richtlijnen op het gebied van autorisatie tegengekomen.
We hebben al diverse projecten gezien op dit gebied, waarbij verschillende aspecten en/of mogelijkheden aan de tand zijn gevoeld.

Hiervoor hebben we een aantal lijsten van links[[1]](/docs/4.links)[[2]](/docs/5.architectuur/inventarisatie) samengesteld.
In de [architectuur links](/docs/5.architectuur/inventarisatie) zijn zoveel mogelijk fragmenten van de diverse websites en projecten
(waar die een raakvlak hebben met of iets vertellen over autorisatie) verzameld, en zijn hier en daar ook observaties vastgelegd.

Omdat er ook steeds weer nieuwe informatie opduikt en aangedragen wordt, heeft ook dit een veranderend karakter,
maar vormt het wel de basis van wat we in deze pagina uiteenzetten.

## Toegangsverlening / autorisatie

Toegangsverlening (letterlijk vertaald naar Engels: access control) is een deelgebied van autorisatie.
Iets krijgt toegang om bijvoorbeeld ergens binnen te komen, iets te doen en/of iets te bekijken.
Dit is de breedste zin van het woord.

In het kader van dit project is
- iets wat toegang krijgt: een persoon, organisatie of geautomatiseerd systeem,
- iets waartoe toegang wordt verleend: een systeem dat een verzameling resources (functies en/of datasets) ter beschikking stelt,
- het binnenkomen: de toegang tot de verzameling resources (bv. via een API),
- het doen: het bevragen van data (ook het bekijken) of uitvoeren van functies, en mogelijk het toevoegen, wijzigen of verwijderen van data.

Autorisatie kent twee belangrijke domeinen:
1. Het vastleggen van de autorisatie.\
   Dit kan op vele manieren:
   - in de applicatiecode; het gebeurt nog steeds, maar is niet wenselijk.
   - in een database.
   - in machine leesbare policies; Policy As Code, losse code die niet in de applicatie gebakken zit.
   - middels verifieerbare credentials; dit levert een deel van de benodigde attributen.
2. Het uitvoeren/controleren van de autorisatie.\
   Een stuk software dat op basis van de vastgelegde autorisatieregels de attributen van een bevraging (request) controleert en toegang verleent of niet.
   Hierbij kan opgemerkt worden dat het toegang verlenen niet alleen een wel of niet resultaat kan zijn,
   maar het soms wenselijk is om ook extra filtering toe te passen op de bevraagde data in zowel horizontale als vertikale richting.

Voor de uitvoering van de toegangsverlening gaan we uit van een geautomatiseerd systeem (een applicatie) dat toegang probeert te krijgen tot een ander geautomatiseerd systeem (een API).
Nu wordt het uitvoeren van toegangsverlening nog vooral bij de aanbieders neergelegd.
Maar omdat niet alle autorisatieregels door de aanbieder uitgevoerd kunnen worden, is het wenselijk om dit deels ook bij de afnemer neer te leggen.
Beide partijen hebben hun verantwoordelijkheid hiervoor, en dienen dus hun deel van de autorisatie-taak uit te voeren.

Hierbij kan aan de kant van het afnemende systeem (de afnemer) een persoon van een organisatie geidentificeerd worden die de verantwoordelijkheid draagt waarbinnen het proces gestart is.
Een kanttekening hierbij is dat er mogelijk ook automatische processen zijn die toegang vragen,
welke echter niet aan een persoon gekoppeld zijn, maar wel aan de organisatie waar het proces plaats vindt.

Aan de kant van het aanbiedende systeem (de aanbieder) is de persoon over het algemeen niet meer te identificeren,
maar wel de organisatie van het toegang zoekende systeem.
Het gebruik van verifieerbare credentials zou wel de mogelijkheid bieden om de verantwoordelijke, die het proces gestart heeft,
te autoriseren zonder de identiteit van die persoon te kennen.

## Toegangsverlening op API's
In de subsidieaanvraag wordt de toegangsverlening expliciet aan API's gekoppeld.
Dit kan gezien worden als een eis dat de toegangsverlening binnen dit project alleen op de API gericht moet zijn.
Dus alleen het wel of niet toegang verlenen tot de gevraagde API.
Niet het extra filteren van de data.

In dat geval wordt de verantwoordelijkheid voor het uitvoeren van de data-autorisatie dus ergens anders neergelegd.

In het kader van auditing zou het echter handig zijn als dit op dezelfde plek gebeurd.
Het kan dan vooraf beter gecontroleerd worden of alle toegangsregels goed gedefinieerd zijn en een samenhangend geheel vormen.
Men wil niet dat een auditer door zowel de applicatiecode als de losse autorisatieregels moet worstelen om de samenhang ervan te doorgronden om dit uiteindelijk te kunnen toetsen.

Ook technisch gezien is het veel handiger om alle autorisatie, die een afnemer of aanbieder moet uitvoeren, op één en dezelfde plek te hebben.
Organisaties die veel verschillende applicaties gebruiken, hoeven het dan ook maar één keer te ontwikkelen, en niet voor iedere applicatie opnieuw.

Hierbij wordt ook meer flexibiliteit geboden voor de regelmatig aan verandering onderhevige wet- en regelgeving, beleidsregels en/of contractafspraken.
Het regelmatig aanpassen van applicatie-code wordt voor veel partijen als een uitermate groot probleem gezien en ervaren.
Een centrale aanpak van alle autorisatie binnen iedere organisatie, middels een geaccepteerde standaard, kan dus heel veel voordeel bieden.

## Logging
Naast het beheren van autorisatieregels en het uitvoeren ervan, speelt ook logging een belangrijke rol.
Middels logging van het gehele toegangsverzoek (request) met de codes van de uitgevoerde policy(ies) en de uitkomst(en),
kan eenvoudig achteraf controle plaatsvinden of alles volgens de regels is verlopen.

## Federatief
Het vastleggen van de autorisatieregels past in een federatief systeem.
Er is overkoepelende wet- en regelgeving en beleidsregels die voor alle partijen gelden.
Er zijn contractafspraken tussen partijen, waarbij er overlap is tussen de autorisatieregels.
Er zijn veel soortgelijke organisaties die dezelfde set toegangsregels moeten toepassen.

Als iedere partij voor zichzelf alle toe te passen toegangsregels moet gaan opstellen en bijhouden, levert dat een veelvoud van hetzelfde werk op.

Het ligt dus voor de hand dat er een federatief stelsel is waarin dit eenduidig en gecontroleerd door de diverse organisaties beheerd wordt.
Hier ligt een behoorlijk ingewikkelde taak, en dient verder onderzoek uitgevoerd te worden.

## Raakvlak met FDS
Het [Federatief Data Stelsel](/docs/5.architectuur/inventarisatie/standaarden/fds) zal dezelfde autorisatieregels moeten hanteren als welke benodigd zijn voor het beveiligen van API's.
Hiervoor is in het [Lock-Unlock project](/docs/5.architectuur/inventarisatie/projecten/lock_unlock) al een heleboel voorbereidend werk gedaan.
Uit het project komen diverse voorstellen naar voren, maar ook nog een hoop aandachtspunten voor verder onderzoek.

Het raakvlak zit vanuit ons project gezien bij het onderdeel van de [poortwachter](/docs/5.architectuur/inventarisatie/standaarden/poortwachter).
Beiden krijgen te maken met autorisatieregels die vanuit dezelfde wet- en regelgeving, beleidsregels en contractafspraken opgesteld en beheerd dienen te worden.
Beiden zouden dus voor het vastleggen van de autorisatieregels van hetzelfde federatieve systeem gebruik moeten maken, om dubbel werk met het beheer te voorkomen.

## Vastleggen van autorisatie
Op dit gebied moet nog veel onderzocht en bedacht worden.
Een federatief systeem ligt voor de hand, maar dat kan op vele verschillende technische manieren ingevuld worden.
Hier is verder onderzoek nodig.

Vanuit dit federatieve systeem zou dan de autorisatie-onthologie van Lock-Unlock gevuld kunnen worden.
Ook de policies voor de diverse organisaties zouden hiervanuit gegenereerd kunnen worden.
Het zou ook kunnen dat de autorisatie-onthologie van Lock-Unlock zelf het federatieve stelsel van autorisatieregels vormt,
en dat hieruit de policies gegenereerd worden.

Naast het vastleggen, is ook het vertalen van wet- en regelgeving naar technische regels een bijkomende factor.
Op dit gebied lijken wel wat (voorzichtige) stappen gezet te zijn. Zie [Regelbeheer](/docs/5.architectuur/inventarisatie/wet_regelgeving/regelbeheer).
Echter, dit lijkt, op een enkel project na, in een vrij prematuur stadium te verkeren.

Op al deze vlakken zal meer onderzoek nopdig zijn.

## Uitvoeren van autorisatie
Het uitvoeren van autorisatie is in diverse [projecten](/docs/5.architectuur/inventarisatie/projecten/projects) al (voor een deel) uitgeprobeerd.
De meeste wegen leiden hier naar Policy Based Access Control ([PBAC](/docs/5.architectuur/inventarisatie/standaarden/pbac)) 
ook wel als Policy As Code (PAC) aangeduidt.

Vanuit dit project lijkt het vooralsnog wenselijk om hier op voort te borduren.
Welke policy taal (of talen) hiervoor in aanmerking komen wordt langzaam duidelijk.
Een belangrijke (nog te bepalen) factor hierin is, of de toegangsverlening puur voor de API moet gaan gelden, of ook, voor de te benaderen functies/data.
