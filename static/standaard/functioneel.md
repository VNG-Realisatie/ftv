# Functionele Specificatie

## Definities

<dfn>Gegevensverwerking</dfn> Een verzoek tot het inzien, zoeken, aanpassen, opslaan of verwijderen van gegevens.

<dfn>Verwerkingsverzoek</dfn> Een verzoek tot verwerking van gegevens van de afnemer aan de aanbieder door middel van een API.

<dfn>Toegangsbeslissing</dfn> Het beslissen tot het geheel of gedeeltelijk toestaan van verwerkingsverzoeken op basis van subject, object, verwerking en context.

<dfn>Autorisatieregel</dfn> Een technisch gespecificeerde regel op basis waarvan de toegangsbeslissing voor een verwerkingsverzoek genomen wordt.

## Beheer en inspectie van autorisatieregels

### Actuele autorisatieregels zijn centraal beschikbaar
De actuele autorisatieregels, zoals actief in werking op een gegeven moment, dienen centraal beschikbaar te zijn voor zowel de aanbieder als afnemers.

Documentatie van geïmplementeerde regels volstaat hiervoor niet gezien de mogelijkheid tot afwijking van implementatie en documentatie.

### Autorisatieregels zijn uniform vastgelegd
Voor effectieve validatie van autorisatieregels dient dit binnen een organisatie op uniforme wijze vastgelegd te worden.

Wanneer dit niet het geval is loopt de organisatie het risico dat de diverse vormen van vastlegging niet gelijk geïnterpreteerd worden.

### Afnemers kunnen autorisatieregels zelfstandig evalueren
Het is mogelijk voor afnemers om verwerkingsverzoeken zelfstandig te evalueren op basis van de beschikbare autorisatieregels zonder dat zij daarvoor het verwerkingsverzoek ook echt in moeten dienen.

### Autorisatieregels zijn laagdrempelig aanpasbaar
Autorisatieregels dienen consistent aangepast te worden aan de actuele situatie. Om dit te borgen moeten aanpassingen laagdrempelig mogelijk zijn zonder lange doorlooptijden of complexe aanpassingen in applicaties te vereisen.

## Vastlegging voor verantwoording en detectie

### Toegangsbeslissingen zijn centraal beschikbaar

Elke toegangsbeslissing dient centraal beschikbaar te zijn binnen de organisatie. Dit is vereist voor effectieve verantwoording van historisch verwerkingsverzoeken. 

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

## Verantwoording in verwerkingsketen

### Aanbieders kunnen eisen stellen aan afnemers

Aanbieders van gegevens kunnen alle gewenste eisen stellen aan verwerkingsverzoek. Deze kunnen van technische aard zijn zoals het stellen van maximale bewaartermijnen, maar ook van niet-technische aard zijn zoals het voldoen aan bepaalde certificaties of standaarden.

### Afnemers kunnen bevestigen of aantonen aan eisen te voldoen

Afnemers kunnen in een verwerkingsverzoek bevestigen of aantonen dat zij aan eisen van de aanbieder voldoen.

### Aanbieder kan eisen via derde partijen valideren

Aanbieders kan de validatie van het voldoen aan eisen voor verwerkingsverzoeken delegeren aan derde partijen.

## Gegevensminimalisatie (of: toegangsbeslissingen op basis van te verwerken gegevens)

### Afnemers dienen vereiste gegevens te specificeren

Afnemers dienen bij elk verwerkingsverzoek de minimale set van vereiste gegevens te specificeren. Hierdoor kan alleen op basis van het verwerkingsverzoek bepaald worden welke gegevens verstrekt werden.

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

## Borging van doelbinding en grondslag

### Afnemer dient de doelbinding of grondslag voor verwerkingsverzoeken te specificeren

Afnemers dienen bij elk verwerkingsverzoek de doelbinding of grondslag voor verwerkingsverzoeken aan te geven. Hierbij kan verwezen worden naar het Register van Verwerkingsactiviteiten. De aanbieder dient te verifiëren of het verwerkingsverzoek is toegestaan voor de doelbinding.

### Afnemers moet hiërarchie van doelbinding bijhouden bij verdere verwerking

Indien de afnemer van gegevens deze elders in de keten hergebruikt dient de afnemer de hiërarchie van doelbinding te behouden. Indien een gemeente volledige toegang heeft tot een registratie om zijn taken uit te voeren en een geminimaliseerde set van deze gegevens beschikbaar maakt voor een interne verwerkingsactiviteit dienen beide doelbindingen opgenomen te worden.


## Gedeeltelijke validatie

### Aanbieders mogen autorisatieregels gedeeltelijk delegeren

Indien mogelijk heeft het de voorkeur om alle toegangsregels voor een toegangsbeslissing gelijktijdig te valideren. Vanuit technische overwegingen kan dit echter onhaalbaar zijn.

Aanbieders mogen de toegangsregels van een verwerkingsverzoek gedeeltelijk evalueren en verdere evaluatie delegeren aan een derde systeem.

In dat geval <b>moet</b> de aanbieder zorgen dat de resterende autorisatieregels doorgegeven worden aan het gedelegeerde systeem én dat het gedelegeerde systeem deze autorisatieregels correct evalueert en afdwingt.

<p class="note" title="Filteren van (zoek-)resultaten">
Het gebruik van gedeeltelijke evaluatie voor het filteren van (zoek-)resultaten wordt <b>afgeraden</b>. Hiervoor kan conform "Afnemers dienen vereiste gegevens te specificeren" de aanwezigheid van de juiste filters in het verwerkingsverzoek worden vereist.
</p>