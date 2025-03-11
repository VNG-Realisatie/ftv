---
weight: 40
---

# Positie

Op deze pagina geven we een moment-opname weer van onze positie t.a.v. toegangsverlening in het algemeen en toegangsverlening op API's in het bijzonder.

Dit verhaal zal gedurende het project een veranderd karakter hebben, en zal daarom pas na verloop van tijd het complete plaatje bevatten.

Omdat we nog gedeeltelijk in de inventarisatiefase verkeren, maar ook al in een oriënterende fase,
is er veel behoefte om deze ideeën en zienswijzen te delen en feedback te vergaren.
Om dat in goede banen te leiden kan deze pagina als één van de uitgangspunten dienen om die discussies aan te gaan.

## Inventarisatie
We hebben gezien dat er al heel veel geschreven is over autorisatie en toegangsverlening.
We zijn al vele richtlijnen op het gebied van autorisatie tegengekomen.
We hebben al diverse projecten gezien op dit gebied, waarbij verschillende aspecten en/of mogelijkheden aan de tand zijn gevoeld.

Hiervoor hebben we een aantal lijsten van links[[1]](/ftv/docs/4.links)[[2]](/ftv/docs/5.architectuur/inventarisatie) samengesteld.
In de [architectuur links](/ftv/docs/5.architectuur/inventarisatie) zijn zoveel mogelijk fragmenten van de diverse websites en projecten
(waar die een raakvlak hebben met of iets vertellen over autorisatie) verzameld, en zijn hier en daar ook observaties vastgelegd.

Omdat er ook steeds weer nieuwe informatie opduikt en aangedragen wordt, heeft ook dit een veranderend karakter,
maar vormt het wel de basis van wat we in deze pagina uiteenzetten.

## Toegangsverlening / autorisatie

Toegangsverlening (letterlijk vertaald naar Engels: access control) is een onderdeel van autorisatie.
Iets krijgt toegang om bijvoorbeeld ergens binnen te komen, iets te doen en/of iets te bekijken.
Dit is de breedste zin van het woord.

In het kader van dit project is
- iets wat toegang krijgt: een persoon, organisatie of geautomatiseerd systeem,
- iets waartoe toegang wordt verleend: een systeem dat een verzameling resources (functies en/of datasets) ter beschikking stelt,
- ergens binnenkomen: toegang verkrijgen tot een verzameling resources (bv. via een API),
- het doen: het bevragen van data (ook het bekijken) of uitvoeren van functies, en mogelijk het toevoegen, wijzigen of verwijderen van data.

Het ergens binnenkomen of iets doen/bekijken zullen we in het verdere verloop van deze pagina **een verzoek** noemen.

Autorisatie kent twee belangrijke domeinen:
1. Het vastleggen van de autorisatie.\
   Het beheer van de technische autorisatieregels die gebruikt kunnen worden om te bepalen of een verzoek geoorloofd is.
   Dit kan op vele manieren:
   - in de applicatiecode; het gebeurt nog steeds, maar is niet wenselijk
   - in een database
   - in machine leesbare policies; Policy As Code, losse code die niet in de applicatie gebakken zit
   - middels verifieerbare credentials; hiermee kan een deel van de benodigde attributen vastgelegd zijn
2. Het uitvoeren/controleren van de autorisatie.\
   Het ophalen en controleren van een set autorisatieregels die voor een bepaald verzoek gelden.
   Een stuk software dat op basis van de vastgelegde autorisatieregels de attributen van een verzoek controleert en toegang verleent of niet.
   De attributen van een verzoek zijn bv. de request headers, query parameters en de data in de request body.
   Hierbij kan opgemerkt worden dat het toegang verlenen niet alleen een wel of niet resultaat kan zijn,
   maar het soms wenselijk is om ook extra filtering toe te passen op de bevraagde data, in horizontale en/of verticale richting.

Het verlenen van toegang is duidelijk het uitvoeren van de autorisatie, maar kan niet plaatsvinden zonder dat de autorisatieregels ergens zijn vastgelegd en bereikbaar zijn.

Voor de uitvoering van de autorisatie gaan we uit van een geautomatiseerd systeem (een applicatie) dat toegang probeert te krijgen tot een ander geautomatiseerd systeem (een API).
Nu wordt het uitvoeren van autorisatie nog vooral bij het aanbiedende systeem (de aanbieder) neergelegd.
Maar omdat niet alle autorisatieregels door de aanbieder uitgevoerd kunnen worden, 
is het wenselijk om dit deels ook bij het afnemende systeem (de afnemer) neer te leggen.
Beide partijen hebben hun verantwoordelijkheid hiervoor, en dienen dus hun deel van de autorisatie-taak uit te voeren.

Hierbij kan aan de kant van de afnemer een persoon van een organisatie geïdentificeerd worden die het verzoek gestart heeft.
Een kanttekening hierbij is dat er mogelijk ook automatische processen zijn die toegang vragen,
welke echter niet aan een persoon gekoppeld zijn, maar wel aan de organisatie waar het proces plaats vindt.

Aan de kant van de aanbieder is de persoon over het algemeen niet meer te identificeren,
maar wel de organisatie van het toegang zoekende systeem.
Het gebruik van verifieerbare credentials zou wel de mogelijkheid bieden om de verantwoordelijke, die het verzoek gestart heeft,
te autoriseren zonder de identiteit van die persoon te kennen.

## Toegangsverlening op API's
In de subsidieaanvraag wordt de toegangsverlening expliciet aan API's gekoppeld.
Dit kan gezien worden als een eis dat de toegangsverlening binnen dit project alleen op de API gericht moet zijn.
Dus alleen het wel of niet toegang verlenen tot de gevraagde API.
Niet het extra filteren van de data.

In dat geval wordt de verantwoordelijkheid voor het uitvoeren van de data-autorisatie dus ergens anders neergelegd.

In het kader van auditing zou het echter handig zijn als dit op dezelfde plek gebeurd.
Het kan dan vooraf beter gecontroleerd worden of alle toegangsregels goed gedefinieerd zijn en een samenhangend geheel vormen.
Men wil niet dat een auditor door zowel de applicatiecode als de losse autorisatieregels moet worstelen om de samenhang ervan te doorgronden om dit uiteindelijk te kunnen toetsen.

Ook technisch gezien is het veel handiger om alle autorisatie, die een afnemer of aanbieder moet uitvoeren, op één en dezelfde plek te hebben.
Organisaties die veel verschillende applicaties gebruiken, hoeven het dan ook maar één keer te ontwikkelen, en niet voor iedere applicatie opnieuw.

Hierbij wordt ook meer flexibiliteit geboden voor de regelmatig aan verandering onderhevige wet- en regelgeving, beleidsregels en/of contractafspraken.
Het regelmatig aanpassen van applicatie-code wordt voor veel partijen als een uitermate groot probleem gezien en ervaren.
Een centrale aanpak van alle autorisatie binnen iedere organisatie, middels een geaccepteerde standaard, kan dus heel veel voordeel bieden.

## Doelbinding
Met doelbinding wordt bedoeld dat het duidelijk moet zijn waarom een verzoek uitgevoerd wordt.
Dit heeft een koppeling naar zaakgericht werken, waarbij het zaaktype het waarom aan kan geven.
In het geval er geen zaak-type bekend is, zou de rol van de gebruiker een indicatie kunnen vormen voor de doelbinding.

## Context
In diverse documentatie wordt de wens geopperd om ook de context van een verzoek te controleren tijdens de toegangsverlening.
Dit kan bijvoorbeeld zijn:
- de tijd van het verzoek
- het IP-adres van de gebruiker
- het soort device dat gebruikt wordt
- mogelijk het besturingssysteem, soort browser, specifieke versies hiervan
- de applicatie waaruit het verzoek voortkomt

Bepaalde context is automatisch aanwezig in een request, of zijn er inherent aan verbonden.
Bijvoorbeeld, de tijd van het verzoek is het moment op de klok dat het verzoek gecontroleerd wordt.
Andere gegevens zullen door de applicatie zelf meegegeven moeten worden.
De autorisatieregels kunnen dan de aanwezigheid van contextgegevens afdwingen, maar indien gewenst, ook inhoudelijk controleren.

De aanwezigheid en juistheid van contextgegevens is ook belangrijk voor de logging.

## Verifieerbare credentials
Eerder werd al aangegeven dat verifieerbare credentials een deel van de attributen kunnen bevatten die voor het uitvoeren van autorisatie benodigd zijn.
Het hebben van deze credentials (bv. in de vorm van OAuth claims) geeft aan dat authenticatie van de gebruiker succesvol heeft plaatsgevonden.
Vanuit het authenticatieproces zijn de credentials van de gebruiker bepaald, die aan kunnen geven welke verzoeken de gebruiker mag uitvoeren.
De credentials zijn vastgelegde gegevens die te controleren zijn.

Maar het moet nog steeds gecontroleerd worden om daadwerkelijk de toegang te verlenen, en het zijn niet de enige gegevens die gecontroleerd moeten worden.

Een credential is te vergelijken met een fysiek bewijs, bv. een rijbewijs.
Het rijbewijs geeft iemand de bevoegdheid om in een auto te rijden.
Dat is een gegeven.

Maar op het moment dat men aangehouden wordt door een agent (in de rol van controleur), zal deze niet alleen het rijbewijs controleren, 
maar ook één of meerdere van de volgende condities:
- of de eigenaar of huurder van de auto aanwezig is
- of het kentekenbewijs in orde is
- of de verzekeringspapieren nog kloppen
- of het kenteken niet als gestolen is opgegeven
- of de auto rijvaardig lijkt
- of er geen verboden voorwerpen in de auto aanwezig zijn
- of de bestuurder niet onder (teveel) invloed van alcohol of drugs is
- of de bestuurder geen rijontzegging opgelegd is
- ...

Het rijbewijs geeft aan dat men in een auto mag rijden, maar niet onder willekeurige condities (de context).
Het rijbewijs op zich is dus slechts een onderdeel van het autorisatiemechanisme voor het besturen van een auto.

## Logging
Naast het beheren van autorisatieregels en het uitvoeren ervan, speelt ook logging een belangrijke rol.
Middels logging van het verzoek met de codes van de uitgevoerde policy(ies) en de uitkomst(en) ervan,
kan eenvoudig achteraf controle plaatsvinden of alles volgens de regels is verlopen.

Omdat logging een flinke omvang aan kan nemen, is het noodzakelijk dat er voldoende kenmerken in iedere request aanwezig zijn, 
zodat er gerichte selecties op de log-regels plaats kunnen vinden. 

## Federatief
Het vastleggen van de autorisatieregels past in een federatief systeem.
Er is overkoepelende wet- en regelgeving en beleidsregels die voor alle partijen gelden.
Er zijn contractafspraken tussen partijen, waarbij er overlap is tussen de autorisatieregels die vanuit het contract opgesteld worden.
Er zijn veel soortgelijke organisaties die dezelfde set toegangsregels moeten toepassen.
Bv. gemeenten mogen alleen verzoeken op persoonsgegevens uitvoeren van personen die binnen de gemeentegrenzen wonen.

Als iedere partij voor zichzelf alle toe te passen toegangsregels moet gaan opstellen en bijhouden, levert dat een veelvoud van hetzelfde werk op.

Het ligt dus voor de hand dat er een federatief stelsel is waarin dit eenduidig en gecontroleerd door de diverse organisaties beheerd wordt.
Hier ligt echter wel een behoorlijk ingewikkelde taak, en is zeker verder onderzoek benodigd.

## Raakvlak met FDS
Het [Federatief Data Stelsel](/ftv/docs/5.architectuur/inventarisatie/standaarden/fds) zal dezelfde autorisatieregels moeten hanteren als welke benodigd zijn voor het beveiligen van API's.
Hiervoor is in het [Lock-Unlock project](/ftv/docs/5.architectuur/inventarisatie/projecten/lock_unlock) al een heleboel voorbereidend werk gedaan.
Uit het project komen diverse voorstellen naar voren, maar ook nog een hoop aandachtspunten voor verder onderzoek.

Het raakvlak zit vanuit ons project gezien bij het onderdeel van de [poortwachter](/ftv/docs/5.architectuur/inventarisatie/standaarden/poortwachter).
Beiden krijgen te maken met autorisatieregels die vanuit dezelfde wet- en regelgeving, beleidsregels en contractafspraken opgesteld en beheerd dienen te worden.
Beiden zouden dus voor het vastleggen van de autorisatieregels van hetzelfde federatieve systeem gebruik moeten maken.
Dit voorkomt dubbel werk met het beheer, en dwingt tevens uniformiteit af.
Een bevraging via API of via FDS is dan aan dezelfde autorisatieregels gebonden.

## Vastleggen van autorisatie
Een federatief systeem ligt, zoals eerder beschreven, voor de hand.
Maar het kan op vele verschillende technische manieren ingevuld worden.

Vanuit dit federatieve systeem zou dan de autorisatie-ontologie van Lock-Unlock gevuld kunnen worden.
Ook de policies voor de diverse organisaties, t.b.v. toegangsverlening op API's, zouden hieruit gegenereerd kunnen worden.
Het zou ook kunnen dat de autorisatie-ontologie van Lock-Unlock zelf het federatieve stelsel van autorisatieregels vormt,
en dat hieruit de policies gegenereerd worden.

Naast het vastleggen, is ook het vertalen van wet- en regelgeving naar technische regels een onderkende uitdaging.
Op dit gebied zijn wel wat (voorzichtige) stappen gezet. Zie [Regelbeheer](/ftv/docs/5.architectuur/inventarisatie/wet_regelgeving/regelbeheer).
Echter, dit lijkt, op een enkel project na, in een vrij prematuur stadium te verkeren.

Op al deze vlakken zal meer onderzoek nodig zijn.

## Uitvoeren van autorisatie
Het uitvoeren van autorisatie is in diverse [projecten](/ftv/docs/5.architectuur/inventarisatie/projecten/projects) al (voor een deel) uitgetest.
De meeste wegen leiden hier naar Policy Based Access Control ([PBAC](/ftv/docs/5.architectuur/inventarisatie/standaarden/pbac)) 
ook wel als Policy As Code (PAC) en een vorm van Attribute Based Access Control (ABAC).

Vanuit dit project lijkt het vooralsnog wenselijk om hier op voort te borduren.
Welke policy taal (of talen) hiervoor in aanmerking komen wordt zo langzaamaan duidelijk.
Een belangrijke (nog te bepalen) factor hierin is, of de toegangsverlening puur voor de API moet gaan gelden, of ook voor de te benaderen functies/data.

## Technologie

Voor het vastleggen en uitvoeren van autorisatie zijn verschillende standaarden, methodieken, implementaties en ideeën beschikbaar.
Hier geven we in het kort een overzicht van een aantal technieken, zodat de overeenkomsten en verschillen vergeleken kunnen worden.
Tevens wordt de mogelijke bruikbaarheid ervan binnen dit project aangegeven.

### ACL - Access Control Lists
Relatief simpele en zeer grofmazige manier voor autorisatie en daardoor binnen dit project niet bruikbaar.

### RBAC - Role-Based Access Control
Moderner dan ACL, en iets minder grofmazig, maar nog steeds niet geschikt.

### ABAC/PBAC - Attribute/Policy Based Access Control
ABAC en PBAC zijn namen voor dezelfde methodiek.
PBAC is een vorm van ABAC. Technisch gezien doen beiden attributen matchen met een set autorisatieregels om toegang te verlenen of niet.
Het wordt ook wel als Policy As Code (PAC) aangeduid.

Er lijkt soms het misverstand te zijn dat ABAC en PBAC twee verschillende methodieken zijn.
Het enige verschil dat mogelijk tot dit misverstand zou kunnen leiden, ligt wellicht in het soort policy taal en of deze taal al dan niet leesbaar is.
De term ABAC is wel wat ouder, en PBAC is een wat modernere naamgeving ([Wikipedia](https://en.wikipedia.org/wiki/Attribute-based_access_control)).

De talen en implementaties (zoals XACML, Alfa, ODRL, OPA en Cedar) zijn policy based, waarbij sets van autorisatieregels in een policy bestand zijn beschreven.
Het controleren van de policy gebeurd door een engine, die de gebruikte policy taal interpreteert, en de controles uitvoert op basis van in het verzoek meegeleverde attributen.

Deze methodiek sluit zeer goed aan op de eisen die in dit project gesteld worden.

### Autorisatie ontologie
Dit is een manier om de autorisatieregels, volgens een vast schema, in een database vast te leggen.
Hierdoor kan dit bv. als metadata binnen een federatief data stelsel beschikbaar gesteld worden (linked data), en gebruikt worden om data autorisatie te beheren en af te dwingen.

Deze methodiek is al via het [Lock-Unlock project](/ftv/docs/5.architectuur/inventarisatie/projecten/lock_unlock) voorgesteld voor het FDS.

### ReBAC - Relation Based Access Control
Deze methodiek legt relaties vast tussen verschillende objecten (resources) en kan gebruikt worden om (op een hoog niveau) bepaalde autorisatie toe te passen.
Men mag alleen de verschillende objecten gelijktijdig bevragen indien er een relatie tussen is.
Het wordt dan ook gezien als een toevoeging op ABAC/PBAC.

Het zou voor dit project een welkome aanvulling kunnen zijn.

### AIAC - AI Access Control
Er wordt reeds onderzoek gedaan om AI in te zetten voor toegangsverlening:
- middels AI modellen de audit-log analyseren en afwijkingen ontdekken
- met generatieve AI een policy beheerder de mogelijkheid bieden om middels natuurlijke taal autorisatieregels vast te leggen

## PBAC matrix

|                    | XACML                 | ODRL             | OPA            | Cedar       | Cerbos       |
|--------------------|-----------------------|------------------|----------------|-------------|--------------|
| type               | standaard             | standaard        | open           | open        | open         |
| org                | OASIS [^1]            | W3C [^2]         | CNCF [^3]      | Amazon [^4] | Google [^23] |
| docs               | [^5]                  | [^6]             | [^7]           | [^8]        | [^24]        |
| taal/fmt           | XML                   | Turtle           | rego           | cedar       | yaml+cel     |
|                    |                       | JSON             |                |             |              |
|                    |                       | XML              |                |             |              |
| gestructureerd     | ja                    | ja               | nee            | nee         | ja           |
| pol. sleutel       | +subject              | uid              | id             | +principal  | +principal   |
|                    | +resource             |                  |                | +action     | +action      |
|                    | +action               |                  |                | +resource   | +resource    |
| sinds              | 06-02-2003            | 19-09-2002       | 29-01-2021     | 29-06-2023  | 18-05-2021   |
| Github top project | 122 *                 | 32 *             | 9.6k *         | 4.5k *      | 3k *         |
| - contr.           | 43                    | 13               | 447            | 53          | 31           |
| extra output       | obligation            | permission       | JSON data      | geen        | ?            |
|                    | advice                | duty             |                |             |              |
|                    |                       | prohibition      |                |             |              |
| bouwen             | per policy            | per policy       | per policy     | per policy  | per policy   |
| beheer             | per policy            | per policy       | per policy     | per policy  | per policy   |
| engines            | Java [^9] [^10] [^11] | Javascript [^14] | Go [^17] [^18] | Rust [^20]  | Go [^25]     |
|                    | .NET [^12]            | Java [^15] [^16] | WASM [^19]     | Go [^21]    | Java [^26]   |
|                    | Rest API [^13]        |                  |                | Java [^22]  | .NET [^27]   |
|                    |                       |                  |                |             | PHP [^28]    |
|                    |                       |                  |                |             | Python [^29] |
|                    |                       |                  |                |             | Rust [^30]   |
| data entiteiten    | policy                | policy           | policy         | policy      | policy       |
|                    | target                | asset            |                | principal   | rule         |
|                    | rule                  | rule             |                | resource    |              |
|                    | condition             | action           |                | session     |              |
|                    | effect                | constraint       |                |             |              |
|                    | obligation            | operand          |                |             |              |
|                    | advice                | permission       |                |             |              |
|                    |                       | duty             |                |             |              |
|                    |                       | prohibition      |                |             |              |
|                    |                       | party            |                |             |              |

[^1]: https://groups.oasis-open.org/communities/tc-community-home2?CommunityKey=67afe552-0921-49b7-9a85-018dc7d3ef1da
[^2]: https://www.w3.org/
[^3]: https://www.cncf.io/
[^4]: https://aws.amazon.com/
[^5]: https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html
[^6]: https://www.w3.org/TR/odrl-model/
[^7]: https://www.openpolicyagent.org/docs/latest/policy-reference/
[^8]: https://docs.cedarpolicy.com/
[^9]: https://github.com/authzforce/core/
[^10]: http://www.openliberty.org/wiki/index.php/Main_Page#OpenAz
[^11]: http://xacmlpdp.sourceforge.net/
[^12]: http://mvpos.sourceforge.net/
[^13]: https://github.com/authzforce/server
[^14]: https://github.com/iptc/rightsml-dev/tree/master/rightsml-lib-js
[^15]: http://oeg-upm.github.io/odrlapi/
[^16]: https://github.com/xmljim/w3odrl21
[^17]: https://github.com/open-policy-agent/opa
[^18]: https://github.com/open-policy-agent/frameworks
[^19]: https://github.com/open-policy-agent/npm-opa-wasm
[^20]: https://github.com/cedar-policy/cedar
[^21]: https://github.com/cedar-policy/cedar-go
[^22]: https://github.com/cedar-policy/cedar-java
[^23]: https://google.com/
[^24]: https://github.com/google/cel-spec/blob/master/doc/langdef.md
[^25]: https://github.com/cerbos/cerbos-sdk-go
[^26]: https://github.com/cerbos/cerbos-sdk-java
[^27]: https://github.com/cerbos/cerbos-sdk-net
[^28]: https://github.com/cerbos/cerbos-sdk-php
[^29]: https://github.com/cerbos/cerbos-sdk-python
[^30]: https://github.com/cerbos/cerbos-sdk-rust
