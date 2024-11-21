# Functionele Specificatie

## Definities

<dfn>Gegevensverwerking</dfn> Een verzoek tot het inzien, zoeken, aanpassen, opslaan of verwijderen van gegevens.

<dfn>Verwerkingsverzoek</dfn> Een verzoek tot verwerking van gegevens van de afnemer aan de aanbieder door middel van een API.

<dfn>Toegangsbeslissing</dfn> Het beslissen tot het geheel of gedeeltelijk toestaan van verwerkingsverzoeken op basis van subject, object, verwerking en context.

<dfn>Autorisatieregel</dfn> Een technisch gespecificeerde regel op basis waarvan de toegangsbeslissing voor een verwerkingsverzoek genomen wordt.

<dfn>Betrokkenen</dfn> De aanbieder, afnemers en toezichthouders die betrokken zijn bij de verwerking.

## Beheer van autorisatieregels

### Autorisatieregels zijn beschikbaar voor alle betrokkenen

De autorisatieregels dienen, op basis van federatief model, beschikbaar gemaakt te worden voor alle betrokkenen.

### Actuele en historische autorisatieregels zijn beschikbaar

Zowel actuele autorisatieregels als historische autorisatieregels dienen beschikbaar te zijn.

De actuele autorisatieregels zijn de regels die gebruikt zullen worden voor een verwerkingsverzoek dat op dit moment ingediend zou worden.

De historische autorisatieregels zijn de regels die gebruikt zijn voor de verwerkingsverzoeken in het verleden. Voor elk historisch verwerkingsverzoek moeten de corresponderende autorisatieregels geïdentificeerd kunnen worden.
 
Documentatie van geïmplementeerde regels volstaat hiervoor niet gezien de mogelijkheid tot afwijking van implementatie en documentatie.

Moet: technische / formele historisering: wat is er echt gebeurd op moment X. Niet zoals het 'had moeten zijn o.b.v. vooruitschreidend inzicht'.  zoals actief in werking op een gegeven moment,
Mag: materiele/formele historisering: wat had het moeten zijn; wat zal het worden

### Autorisatieregels zijn uniform vastgelegd
Voor effectieve validatie van autorisatieregels dient dit binnen een organisatie op uniforme wijze vastgelegd te worden.

Wanneer dit niet het geval is loopt de organisatie het risico dat de diverse vormen van vastlegging niet gelijk geïnterpreteerd worden.

### Afnemers kunnen autorisatieregels zelfstandig evalueren
Het is mogelijk voor afnemers om verwerkingsverzoeken zelfstandig te evalueren op basis van de beschikbare autorisatieregels zonder dat zij daarvoor het verwerkingsverzoek ook echt in moeten dienen.

### Autorisatieregels zijn laagdrempelig aanpasbaar
Autorisatieregel dient consistent aangepast te worden aan de actuele situatie. Om dit te borgen dienen aanpassingen laagdrempelig mogelijk te zijn zonder lange doorlooptijden of complexe aanpassingen in applicaties te vereisen.

## Vastlegging en verantwoording van toegangsbeslissingen

### Toegangsbeslissingen zijn beschikbaar voor alle betrokkenen

Elke toegangsbeslissing dient, op federatieve basis, beschikbaar te zijn voor de betrokkenen. Dit is vereist voor effectieve verantwoording van historisch verwerkingsverzoeken. 

Dit ondersteunt ook effectieve beveiligingsanalyse voor het detecteren van ongewenste toegang waarbij meerdere applicaties betrokken zijn.

<p class="note" title="Preventie">
Gecombineerd met de aanbeveling toegangsbeslissingen centraal uit te voeren biedt dit ook de mogelijkheid om verdachte verwerkingsverzoeken preventief te blokkeren.
</p>

### Toegangsbeslissingen kunnen verantwoord worden

Alle gegevens die gebruikt worden in het maken van de toegangsbeslissingen dienen beschikbaar te zijn voor verantwoording. Alleen wanneer dit wettelijk niet toegestaan is of niet proportioneel gegeven de gevoeligheid van de gegevens kan hier van worden afgeweken.

Dit is vereist aangezien het veelal niet mogelijk is om te bepalen welke gegevens op een gegeven moment beschikbaar waren voor de toegangsbeslissing.  

### Afnemers kunnen aanbieder inzicht in toegangsbeslissingen geven

Indien vereist door de aanbieder kunnen afnemers de aanbieder inzicht bieden tot toegangsbeslissingen.

De exacte vereisten zullen door aanbieder als eis gesteld worden aan het verwerkingsverzoek. Daarin kan bijvoorbeeld de frequentie (op verzoek, periodiek of continu) en de bewaartermijn vastgelegd worden.

TODO:

<ul>
<li>Gezien de verwoording van "Toegangsbeslissingen zijn beschikbaar voor alle betrokkenen" is dit mogelijk dubbel op.</li></ul>

### Afnemers dienen de doelbinding voor verwerkingsverzoeken te specificeren

Afnemers dienen bij elk verwerkingsverzoek de doelbinding voor verwerkingsverzoeken aan te geven. Hierbij kan verwezen worden naar het Register van Verwerkingsactiviteiten.

TODO:
<ul>
<li>Stem af met o.a. Logboek Dataverwerkingen of dit inderdaad in Register van Verwerkingsactiviteiten opgenomen is?</li>
</ul>

## Gegevensminimalisatie (of: toegangsbeslissingen op basis van te verwerken gegevens)

### Afnemers dienen vereiste gegevens te specificeren

Afnemers dienen bij elk verwerkingsverzoek de set van vereiste gegevens te specificeren. Dit geldt voor zowel verticale als horizontale filtering. Hierdoor kan alleen op basis van het verwerkingsverzoek bepaald worden welke gegevens verstrekt werden.

In het geval van REST API dient dit te gebeuren volgens de [Customization extensie](https://docs.geostandaarden.nl/api/API-Strategie-ext/#customization) van de [NLGov REST API Design Rules](https://gitdocumentatie.logius.nl/publicatie/api/adr/)

In het geval van GraphQL API's gebeurt dit automatisch in de specificatie van een GraphQL operatie.

### Aanbieders moeten verstrekte gegevens beperken tot het minimum

Aanbieders moeten verstrekte gegevens beperken tot de minimale set van gegevens waarvan zij weten dat de afnemer gerechtigd is deze te ontvangen.

TODO:
<ol>
    <li>Bevestig of dit gewenst is en/of dit in deze standaard betrokken moet worden</li>
</ol>

### Aanbieders dienen vereiste gegevens voor toegangsbeslissingen gestructureerd aan te bieden

In sommige gevallen kan de toegangsbeslissing alleen genomen worden op basis van de gegevens die het verwerkingsverzoek retourneert.

Het is niet wenselijk dat tijdens de evaluatie van de toegangsbeslissing in de inhoud van het bericht gekeken moet worden. Dit vergroot gevoeligheidsproblematiek en is foutgevoelig indien de structuur wijzigt.

In dat geval dient de aanbieder deze informatie gestructureerd beschikbaar te maken in de metadata van het bericht. 

In het geval van een HTTP verzoek moet hiervoor de header ...TODO... gebruikt worden.

TODO: 
<ol>
    <li>Evalueren of dit ooit echt gewenst is</li>
    <li>Relatie naar AuthZEN standaard opnemen</li>
</ol> 

### Aanbieders moeten aan kunnen tonen welke gegevens aangeboden zijn

Indien de aanbieder verzoeken toe staat zonder specificatie van vereiste gegevens moet de aanbieder in staat zijn aan te tonen welke gegevens aan de afnemer aangeboden zijn.

### Aanbieders mogen alternatieve verwerkingsverzoeken voorstellen

Aanbieders mogen in hun afwijzing suggesties bieden voor alternatieve verwerkingsverzoeken die wel toegestaan zijn. Dit kan afnemers ondersteunen in het gebruik van de API, maar verhoogt mogelijk het risico dat meer gegevens aangevraagd worden dan vereist zijn voor de doelbinding.

TODO:
<ul>
<li>Aanpassen naar Search API voorstel van AuthZEN</li></ul>

### Autorisatieregels mogen gedeeltelijk gedelegeerd worden aan applicaties

Indien mogelijk heeft het de voorkeur om alle toegangsregels voor een toegangsbeslissing gelijktijdig te valideren. Vanuit technische overwegingen kan dit echter onhaalbaar zijn.

Aanbieders mogen de toegangsregels van een verwerkingsverzoek gedeeltelijk evalueren en verdere evaluatie delegeren aan een derde systeem.

In dat geval <b>moet</b> de aanbieder zorgen dat de resterende autorisatieregels doorgegeven worden aan het gedelegeerde systeem én dat het gedelegeerde systeem deze autorisatieregels correct evalueert en afdwingt.

<p class="note" title="Filteren van (zoek-)resultaten">
Het gebruik van gedeeltelijke evaluatie voor het filteren van (zoek-)resultaten wordt <b>afgeraden</b>. Hiervoor kan conform "Afnemers dienen vereiste gegevens te specificeren" de aanwezigheid van de juiste filters in het verwerkingsverzoek worden vereist.
</p>

## Verifieerbare verklaringen

### Aanbieders kunnen eisen stellen aan afnemers

Aanbieders van gegevens kunnen alle gewenste eisen stellen aan verwerkingsverzoek. Deze kunnen van technische aard zijn zoals het stellen van maximale bewaartermijnen, maar ook van niet-technische aard zijn zoals het voldoen aan bepaalde certificaties of standaarden.

### Afnemers kunnen bevestigen of aantonen aan eisen te voldoen

Afnemers kunnen in een verwerkingsverzoek bevestigen of aantonen dat zij aan eisen van de aanbieder voldoen.

### Aanbieder kan eisen via derde partijen valideren

Aanbieders kan de validatie van het voldoen aan eisen voor verwerkingsverzoeken delegeren aan derde partijen.