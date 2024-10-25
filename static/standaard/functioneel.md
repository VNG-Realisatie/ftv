# Functionele Specificatie

## Definities

<dfn>Gegevensverwerking</dfn> Een verzoek tot het inzien, zoeken, aanpassen, opslaan of verwijderen van gegevens.

<dfn>Toegangsverzoek</dfn> Een verzoek tot verwerking van gegevens van de afnemer aan de aanbieder door middel van een API.

<dfn>Toegangsbeslissing</dfn> Het beslissen tot het geheel of gedeeltelijk toestaan van verwerkingsverzoeken op basis van subject, object, verwerking en context.

<dfn>Toegangsbeleid</dfn> Het technisch gespecificeerde beleid op basis waarvan de toegangsbeslissen voor een toegangsverzoek genomen wordt.

## Inzicht en beheer van toegangsbeleid

### Toegangsbeleid is laagdrempelig aanpasbaar
Toegangsbeleid dient consistent aangepast te worden aan de actuele situatie. Om dit te borgen dienen aanpassingen laagdrempelig mogelijk te zijn zonder lange doorlooptijden of complexe aanpassingen in applicaties te vereisen.


### Actueel toegangsbeleid is centraal beschikbaar
Het actuele toegangsbeleid, zoals actief in werking op een gegeven moment, dient centraal beschikbaar te zijn ter validatie en controle.

Documentatie van geïmplementeerd beleid volstaat hiervoor niet gezien de mogelijkheid tot afwijking van implementatie en documentatie.

### Toegangsbeleid is uniform vastgelegd
Voor effectieve validatie van toegangsbeleid dient dit binnen een organisatie uniform vastgelegd te worden. 

Wanneer dit niet het geval is loopt de organisatie het risico dat de diverse vormen van vastlegging niet gelijk geïnterpreteerd worden.


## Vastlegging voor verantwoording en detectie

### Toegangsbeslissingenen zijn centraal beschikbaar

Elke toegangsbeslissing dient centraal beschikbaar te zijn binnen de organisatie. Dit is vereist voor effectieve verantwoording van historisch toegangsverzoeken. 

Dit ondersteunt ook effectieve beveilingsanalyse om misbruik te kunnen detecteren wanneer meerdere applicaties betrokken zijn.

<p class="note" title="Preventie">
Gecombineerd met de aanbeveling toegangsbeslissingen centraal uit te voeren biedt dit ook de mogelijkheid om verdachte toegangsverzoeken preventief te blokkeren.
</p>

### Toegangsbeslissingen kunnen verantwoord worden

Alle gegevens die gebruikt worden in het maken van de toegangsbeslissingen dienen beschikbaar te zijn voor verantwoording. Alleen wanneer dit wettelijk niet toegestaan is of niet proportioneel gegeven de gevoeligheid van de gegevens kan hier van worden afgeweken.

Dit is vereist aangezien het veelal niet mogelijk is om te bepalen welke gegevens op een gegeven moment beschikbaar waren voor de toegangsbeslissing.  


## Verantwoording in verwerkingsketen

### Aanbieders kunnen eisen stellen aan afnemers

Aanbieders van gegevens kunnen alle gewenste eisen stellen aan verwerkingsverzoek. Deze kunnen van technische aard zijn zoals het stellen van maximale bewaartermijnen, maar ook van niet-technische aard zijn zoals het voldoen aan bepaalde certificaties of standaarden.

### Afnemers kunnen bevestigen of aantonen aan eisen te voldoen

Afnemers kunnen in een verwerkingsverzoek bevestigen of aantonen dat zij aan eisen van de aanbieder voldoen.

### Aanbieder kan eisen via derde partijen valideren

Aanbieders kan de validatie van het voldoen aan eisen voor verwerkingsverzoeken delegeren aan derde partijen.

### Afnemers kunnen aanbieder inzicht in toegangsbeslissingen geven

Indien vereist door de aanbieder kunnen afnemers de aanbieder inzicht bieden tot toegangsbeslissingen. 

De exacte vereisten zullen door aanbieder als eis gesteld worden aan het verwerkingsverzoek. Daarin kan bijvoorbeeld de frequentie (op verzoek, periodiek of continu,) de bewaartermijn en de aanleiding tot verzoeken tot inzicht vastgelegd worden.


## Borging van doelbinding en grondslag

### Afnemer specificeert de doelbinding of grondslag voor verwerkingsverzoeken

Afnemers dienen bij elk verwerkingsverzoek de doelbinding of grondslag voor verwerkingsverzoeken aan te geven. Hierbij kan verwezen worden naar het Register van Verwerkingsactiviteiten. De aanbieder dient te verifieren of de het verwerkingsverzoek toegestaan voor de doelbinding.

### Afnemers behouden hierarchie van doelbinding bij verdere verwerking

Indien de afnemer van gegevens deze elders in de keten hergebruikt dient de afnemer de hierarchie van doelbinding te behouden. Indien een gemeente volledige toegang heeft tot een registratie om zijn taken uit te voeren en een geminimaliseerde set van deze gegevens beschikbaar maakt voor een interne verwerkingsactiviteit dienen beide doelbindingen opgenomen te worden.
