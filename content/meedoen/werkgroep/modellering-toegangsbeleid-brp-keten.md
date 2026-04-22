---
type: 'chapter'
Title: Modellering toegangsbeleid BRP-keten
---
{{< chapter/section title="" >}}
# Modellering toegangsbeleid BRP-keten (31 maart 2026)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Marc de Boer (FTV)
- Gideon Zegwaard (FDS)
- Hans Hendrikman (RvIG)
- Igor van Haren (Vecozo)
- Maria Dziouba (Vecozo)
- Karl de Boer
- Marcel Molenaar (UWV)
- Floris Deutekom (Geonovum)
- Hans Schevers (BIM-Connected)
- Danny Greefhorst (FDS)
- Arnoud Quanjer (VNG)
- Marc van Andel (Kadaster)
- Hugo Mostard (Gemeente Den Haag)
- Stas Mironov (Logius)
- Rens Kievit (MinBZK)
- René Berken (DUO)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20260331-modellering-toegangsbeleid-brp-keten.mp4)
- [Presentatie](/ftv/documents/20260331-modellering-toegangsbeleid-brp-keten.pdf)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking (5m)
- Algemene update FTV (5m)
- Introductie BRP Logisch Ontwerp en autorisatiebesluiten (10m)
- Verkenning autorisatiebesluiten in ODRL (15m)
- Verkenning afnemersbeleid in ODRL (15m)
- Analyse en bepalen vervolgstappen (10m)
{{< /chapter/section >}}

{{< chapter/section title="Welkom & kennismaking" >}}

*Michiel Trimpe* heet iedereen welkom bij de 18e bijeenkomst van de werkgroep. De focus ligt vandaag op het modelleren van het toegangsbeleid van de BRP-keten met behulp van ODRL. Dit volgt op de conclusie van de vorige sessie om een concreet voorbeeld van publiek toegangsbeleid uit te werken. De keuze is op de BRP gevallen als het meest volwassen en best gedocumenteerde voorbeeld.

Er wordt een kennismakingsronde gehouden voor nieuwe deelnemers:
- *Karl de Boer* is zelfstandig softwareontwikkelaar en werkt aan een BRP API-gateway, waarbij doelbinding en filtering een rol spelen. Hij neemt voor het eerst deel.
- *René Berken* is lead data-architect bij DUO en neemt voor het eerst deel. Hij is ook lid van de werkgroep "Data bij de Bron".

{{< /chapter/section >}}

{{< chapter/section title="Algemene update FTV" >}}

*Marc de Boer* geeft een update over een initiatief vanuit Common Ground. De koplopergemeenten en de G4 (met Utrecht en Den Haag als trekkers) hebben een subsidie van VNG Realisatie verkregen om de FTV-standaard en de OpenFTV-referentie-implementatie geschikt te maken als platformcomponent binnen Common Ground.

Het doel is om een concrete implementatie van OpenFTV te realiseren voor het Klantcontactcentrum (KCC) van de gemeente Utrecht, waar complexe autorisatievraagstukken spelen (veel medewerkers, diverse zaaktypen, verschillende vormen van RBAC). Een proof-of-concept heeft vorig jaar aangetoond dat autorisatie vanuit één centrale module voor alle lagen van het Common Ground-model mogelijk is. De opdracht is nu om dit in de praktijk te brengen.

{{< /chapter/section >}}

{{< chapter/section title="Introductie BRP Logisch Ontwerp en autorisatiebesluiten" >}}

*Michiel Trimpe* geeft een inhoudelijke introductie van de BRP en het bijbehorende toegangsbeleid. Hij benadrukt dat hij geen BRP-expert is en nodigt de aanwezige experts uit om aan te vullen.

*Michiel Trimpe* licht het Logisch Ontwerp BRP (LO BRP) toe als systeemspecificatie van RvIG die in feite functioneert als een "beleidsregister avant la lettre". Vervolgens worden het datamodel (de drielaags hiërarchie van Categorie, Groep en Element) en het autorisatiemodel (gebaseerd op wettelijke basis, doelbinding en proportionaliteit) behandeld. Het autorisatiemodel resulteert in formele autorisatiebesluiten die technisch vertaald worden in Tabel 35.

*Gideon Zegwaard* en *Hans Schevers* benadrukken dat de drie genoemde voorwaarden zelf al het toegangsbeleid vormen, en niet alleen de technische vertaling in Tabel 35. Dit zijn de beleidsregels die gemodelleerd moeten worden.

*Gideon Zegwaard* stelt dat wanneer hij in een catalogus een dataset als de BRP ziet, hij direct inzicht wil in het beleid om toegang te krijgen. Dit toegangsbeleid, bij voorkeur in ODRL-formaat, zou in de catalogus beschikbaar moeten zijn en moeten verwijzen naar de correcte informatie om de toegang te implementeren.

{{< /chapter/section >}}

{{< chapter/section title="Verkenning autorisatiebesluiten in ODRL" >}}

**Tabel 35: de autorisatietabel**

*Michiel Trimpe* demonstreert de zoekpagina van publicaties.rvig.nl waar autorisaties opgezocht kunnen worden. Hij opent een voorbeeld-PDF voor Gemeente Appingedam.

*Hans Hendrikman* corrigeert dat het getoonde PDF-document niet het autorisatiebesluit zelf is, maar het resultaat ervan: een technische uitwerking in de vorm van een lijst met gegevenscategorieën en elementen waar de afnemer recht op heeft. Het eigenlijke autorisatiebesluit is een uitgebreid [juridisch document](https://publicaties.rvig.nl/sites/default/files/Besluit/GABA%20BRP/510324%20Gemeente%20Appingedam%20BRP.pdf).

*Michiel Trimpe* licht de velden in de autorisatietabel toe: afnemersindicatie, versienummer, datum ingang/einde, rubrieken per koppelvlak (ad hoc, spontaan, selectie), voorwaarderegels en sleutelrubrieken.

**Drie koppelvlakken**

De BRP kent drie leveringsvormen:
1. **Ad hoc (bevraging)**: Directe vraag-antwoord, bijvoorbeeld via de HaalCentraal BRP API.
2. **Spontaan (push)**: Automatische melding bij een wijziging.
3. **Selectie (bulk)**: Eenmalig of periodiek bestand, bijvoorbeeld via CSV.

**Voorwaarderegels**

Voorwaarderegels zijn Booleaanse expressies die bepalen welke personen binnen de scope van een levering vallen, zoals "Gemeente van inschrijving = Amsterdam" of "Leeftijd tussen 3 en 18 jaar".

*Karl de Boer* vraagt op welke koppelvlakken de werkgroep zich moet richten, aangezien sommige verouderd zijn. *Michiel Trimpe* antwoordt dat zolang een koppelvlak in gebruik is, het relevant is om te modelleren.

*Gideon Zegwaard* geeft aan dat de directe vertaling van de technische voorwaarderegels naar ODRL niet de hoogste prioriteit heeft. De primaire waarde zit in het op een generieke, ontdekbare manier vastleggen van het hogere beleidskader: dát er voorwaarderegels zijn, dat deze voortkomen uit een autorisatiebesluit, en dat dit besluit een invulling is van de wettelijke basis, doelbinding en proportionaliteit.

*Floris Deutekom* vat samen dat de wens is om eerst op een hoger abstractieniveau te beschrijven wat het beleid inhoudt, maar stelt dat de huidige detailverkenning ook nodig is om te zien waar men tegenaan loopt bij de implementatie.

**Leesbaarheid van ODRL**

*Marcel Molenaar* vraagt zich af hoe begrijpelijk ODRL is voor anderen dan programmeurs. Hij had gehoopt dat het een taal zou zijn die voor iedereen makkelijk leesbaar is. *Karl de Boer* is het hiermee eens en noemt dat er ook andere talen zijn (zoals Rego) of visuele manieren om beleid uit te drukken.

*Michiel Trimpe* stelt voor om eerst naar de volledige uitwerking en het eindproduct te kijken voordat dit beoordeeld wordt.

**Uitwerking en demonstratie**

*Michiel Trimpe* presenteert een uitwerking waarbij alle circa 1.400 actuele autorisatiebesluiten uit Tabel 35 zijn omgezet naar ODRL policies, inclusief alle 4.575 voorwaarderegels. Hij licht de mapping toe en demonstreert dit aan de hand van een concreet voorbeeld (Ministerie van Defensie), inclusief een compacte variant op categorie- en groepniveau.

*Gideon Zegwaard* merkt op dat de `target` in dit geval een subset van de BRP is en ziet dit als een modelleringsvraagstuk: hoe definieer je die virtuele subset?

*Michiel Trimpe* benadrukt het ontbreken van een standaard Linked Data informatiemodel vanuit RvIG. Hij heeft zelf URI's voor de concepten moeten bedenken. Voor een betekenisvolle en machineleesbare modellering is een officieel Linked Data informatiemodel van het register essentieel.

*Gideon Zegwaard* maakt een onderscheid tussen twee niveaus van beleid: het beleid voor het verkrijgen van een aansluiting (het proces) en het beleid dat de toegang op die aansluiting regelt (de data-elementen). Het standaardiseren van het procesniveau is eenvoudiger omdat dit een "greenfield"-situatie is.

*Hans Schevers* heeft de gemodelleerde data beschikbaar gemaakt in de [Wistor-visualisatietool](https://app.wistor.nl/projects/fds/DIwTo/), waar de autorisatiebesluiten als graaf verkend kunnen worden. *Rens Kievit* merkt op dat dit er visueel veel beter uitziet en dat dit soort tools beleidsmedewerkers zou kunnen helpen om de complexe autorisatiestructuren te begrijpen.

{{< /chapter/section >}}

{{< chapter/section title="Verkenning afnemersbeleid in ODRL" >}}

*Michiel Trimpe* gebruikt het beleid van de gemeente Amsterdam als voorbeeld.

*Michiel Trimpe* licht toe hoe Amsterdam zijn afnamebeleid heeft gemodelleerd op basis van scopes, met eigen gegevenssets en standaardbeperkingen op de populatie. Een afnemer krijgt standaard deze beperkingen opgelegd; een specifieke scope kan een beperking opheffen.

*Michiel Trimpe* constateert dat dit "opheffen" van een beperking een patroon is dat ODRL standaard niet lijkt te ondersteunen. ODRL-profielen zijn doorgaans gericht op het verder inperken van rechten, niet op het verruimen ervan. *Gideon Zegwaard* bevestigt deze analyse.

**Scope-compositie: het kernprobleem**

Michiel stelt een kernvraag aan de groep: moeten we als doel stellen dat het ODRL-beleid evalueerbaar is door een standaard ODRL-evaluator? Of moeten we ODRL primair zien als een beschrijvingstaal en de evaluatie overlaten aan de implementatie?

*Igor van Haren* suggereert om eerst een aantal stappen te zetten in het modelleren van specifieke patronen voordat de focus op een end-to-end werkende keten wordt gelegd.

*Rens Kievit* geeft aan dat hij graag eerst een uitwerking van de basisfunctionaliteit wil zien.

{{< /chapter/section >}}

{{< chapter/section title="Relatie tot het register toegangsbeleid" >}}

*Karl de Boer* vraagt of alleen de landelijke voorziening in scope is. Hij wijst op het bestaan van binnengemeentelijke afnemers, die vaak subsets van een autorisatiebesluit gebruiken met een eigen doelbinding.

*Michiel Trimpe* geeft aan dat hij dit aspect heeft proberen te analyseren aan de hand van het voorbeeld van Amsterdam en dat dit onderwerp in scope is, maar dat er vandaag geen tijd is om hier dieper op in te gaan.

*Michiel Trimpe* vat samen wat ODRL goed doet voor deze use case: uitbreidbaarheid via profielen, temporeel versiebeheer, het uitdrukken van conceptueel beleid op afnemersniveau, dataminimalisatie via AssetCollections, en leesbare constraints met logische expressies.

{{< /chapter/section >}}

{{< chapter/section title="Open vragen" >}}

**Technisch beleid in ODRL**

*Michiel Trimpe* stelt de vraag hoe beleid dat voor alle afnemers geldt (zoals technische verplichtingen als mTLS en Diginetwerk) gemodelleerd moet worden. ODRL lijkt vooral gericht op het toewijzen van beleid aan een specifieke afnemer.

*Gideon Zegwaard* suggereert dat men dit ongestructureerd in ODRL zou kunnen opnemen. Hij onderscheidt drie beleidsniveaus: toelating tot het stelsel, het verlenen van een aansluiting, en de uitvoering per transactie. Voor aansluitingsbeleid zou de target een anonieme 'prospect' kunnen zijn.

*Karl de Boer* stelt dat het specificeren van zaken als TLS-versies of cipher suites te ver gaat. *Michiel Trimpe* constateert dat het onderwerp veel discussie oproept, wat een indicatie kan zijn om het voor nu buiten scope te plaatsen.

*Marcel Molenaar* geeft aan dat de scope van de werkgroep voor hem niet volledig helder was, wat het lastig maakt om de grens te trekken tussen techniek en beleid. *Michiel Trimpe* erkent dat de werkgroep gezamenlijk de scope aan het verkennen is.

**Temporaliteit**

*Michiel Trimpe* stelt de vraag of de effectieve tijd die ODRL standaard ondersteunt voldoende is, of dat ook materiële en formele tijdsdimensies nodig zijn. Hij neigt naar het antwoord dat effectieve tijd waarschijnlijk volstaat.

**Beleidsverwijzing in de keten**

Moet een afwijzing in de request/response-keten een verwijzing bevatten naar de specifieke ODRL-regel die is overtreden?

*Rens Kievit* acht het lastig om dit te implementeren, omdat de controle (zoals op een mTLS-certificaat) vaak op een lager technisch niveau plaatsvindt. Hij stelt voor vanuit ODRL te bepalen wat er moet gebeuren in een error-scenario, in plaats van de technische error aan een ODRL-regel te koppelen.

{{< /chapter/section >}}

{{< chapter/section title="Vervolgstappen" >}}

- **FORCE evaluatie**: *Michiel Trimpe* zal proberen een presentatie over FORCE (een raamwerk om ODRL-beleid technisch af te dwingen) te regelen voor een volgende werkgroep-sessie, gegeven door een specialist van de Universiteit Gent.
- **Volgende use case**: De werkgroep gaat de iWlz-use case (informatievoorziening Wet langdurige zorg, behandelrelaties) uitwerken, met expliciete aandacht voor het hogerliggende beleidskader, zoals voorgesteld door *Gideon Zegwaard*. *Marc de Boer* benoemt dat de uitdaging bij de iWlz-case juist zal zijn om dat overkoepelende beleid te identificeren en te modelleren.

{{< /chapter/section >}}
