# Functionele Specificatie

## Definities

<dfn>Gegevensverwerking</dfn> Het inzien, zoeken, aanpassen, opslaan of verwijderen van gegevens.

<dfn>Verwerkingsverzoek</dfn> Een verzoek tot verwerking van gegevens van de afnemer aan de aanbieder door middel van een API.

<dfn>Toegangsbeslissing</dfn> Het beslissen tot het geheel of gedeeltelijk toestaan van verwerkingsverzoeken op basis van subject, object, verwerking en context.

<dfn>Autorisatieregel</dfn> Een technisch gespecificeerde regel op basis waarvan de toegangsbeslissing voor een verwerkingsverzoek genomen wordt.

<dfn>Betrokkenen</dfn> De aanbieder, afnemers en toezichthouders die betrokken zijn bij de verwerking.

<dfn>Verwerkende applicaties</dfn> De systemen, zowel bij aanbieder als afnemer, die verwerkingsverzoeken daadwerkelijk indienen, uitvoeren en ontvangen. 

## Beheer van autorisatieregels

### Autorisatieregels horen beschikbaar te zijn voor alle betrokkenen

De autorisatieregels horen, op basis van federatief model, beschikbaar gemaakt te worden voor alle betrokkenen.

### Actuele en historische autorisatieregels moeten beschikbaar zijn

Zowel actuele autorisatieregels als historische autorisatieregels moeten beschikbaar zijn.

De actuele autorisatieregels zijn de regels die gebruikt zullen worden voor een verwerkingsverzoek dat op dit moment ingediend zou worden.

De historische autorisatieregels zijn de regels die gebruikt zijn voor de verwerkingsverzoeken in het verleden. Voor elk historisch verwerkingsverzoek moeten de corresponderende autorisatieregels geïdentificeerd kunnen worden.

<p class="note" title="Documentatie volstaat niet">
Het is van belang dat de autorisatieregels technisch eenduidig gedefinieerd zijn. Documentatie van geïmplementeerde regels volstaat hiervoor dus niet gezien de mogelijkheid tot verschillen tussen de implementatie en documentatie.
</p>

### Autorisatieregels horen uniform vastgelegd te worden
Voor effectieve validatie van autorisatieregels hoort dit binnen een organisatie op uniforme wijze vastgelegd te worden.

Wanneer dit niet het geval is loopt de organisatie het risico dat de diverse vormen van vastlegging niet gelijk geïnterpreteerd worden.

### Betrokkenen moeten autorisatieregels zelfstandig kunnen evalueren
Het moet mogelijk zijn voor betrokkenen om verwerkingsverzoeken zelfstandig te evalueren op basis van de beschikbare autorisatieregels zonder dat zij daarvoor het verwerkingsverzoek ook echt in moeten dienen.

### Autorisatieregels horen laagdrempelig aanpasbaar te zijn

Autorisatieregel horen consequent aangepast te worden aan de actuele situatie. Om dit te borgen horen aanpassingen laagdrempelig mogelijk te zijn zonder lange doorlooptijden of complexe aanpassingen in applicaties te vereisen.

## Vastlegging en verantwoording van toegangsbeslissingen

### Historische toegangsbeslissingen horen beschikbaar te zijn voor betrokkenen

Elke historische toegangsbeslissing hoort beschikbaar gemaakt te kunnen worden voor de betrokkenen. Dit is vereist voor effectieve verantwoording van historisch verwerkingsverzoeken. 

Dit kan op federatieve wijzen gebeuren waarbij historische toegangsbeslissingen proactief of op verzoek gedeeld kunnen worden met de relevante betrokkenen.

<p class="note" title="Preventie en detectie">
Deze werkwijze ondersteunt ook effectieve beveiligingsanalyse voor het detecteren van ongewenste toegang waarbij meerdere applicaties betrokken zijn.
</p>

### Toegangsbeslissingen horen verantwoord te kunnen worden

Alle gegevens die gebruikt worden in het maken van de toegangsbeslissingen horen beschikbaar te zijn voor verantwoording. Alleen wanneer dit wettelijk niet toegestaan is of niet proportioneel gegeven de gevoeligheid van de gegevens kan hier van worden afgeweken.

Dit is vereist aangezien het veelal niet mogelijk is om te bepalen welke gegevens op een gegeven moment beschikbaar waren voor de toegangsbeslissing.

### Afnemers horen de doelbinding voor verwerkingsverzoeken te specificeren

Afnemers horen bij elk verwerkingsverzoek de doelbinding voor verwerkingsverzoeken aan te geven. Hierbij kan verwezen worden naar het Register van Verwerkingsactiviteiten.

TODO:
<ul>
<li>Stem af met o.a. Logboek Dataverwerkingen of dit inderdaad in Register van Verwerkingsactiviteiten opgenomen is?</li>
</ul>

## Aanpassen van verwerkingsverzoeken

### Verwerkingsverzoeken mogen niet inhoudelijk aangepast worden

Autorisatieregels mogen verwerkingsverzoeken inhoudelijk niet aanpassen. Alleen metadata van het verzoek mag weggelaten of uitgebreid worden.

Voor een HTTP verzoek betekent dit bijvoorbeeld dat:
<ul>
<li>een header toegevoegd mag worden; bijvoorbeeld om additionele vereisten (obligations) mee te gegeven vanuit de autorisatieregels</li>; 
<li>een header weggelaten mag worden; bijvoorbeeld indien een authenticatie token gevoelige informatie bevat die niet vereist is voor onderliggende systemen</li>
<li>een header uitgebreid mag worden; bijvoorbeeld door het toevoegen van het huidige verwerkende systeem aan een trace van Logboek Dataverwerkingen of door de PEP-host toe te voegen aan de `X-Forwarded-For' header.</li>
<li>hostname en applicatie path aangepast mag worden; mits dit het gedrag van de onderliggende systemen niet beïnvloedt</li>
</ul>

### Autorisatieregels horen geen gebruik te maken van de inhoud van een antwoord

In sommige gevallen kan de toegangsbeslissing alleen genomen worden op basis van de gegevens die het verwerkingsverzoek retourneert.

Het is niet wenselijk dat tijdens de evaluatie van de toegangsbeslissing in de inhoud van het bericht gekeken moet worden. Dit vergroot gevoeligheidsproblematiek en is foutgevoelig indien de structuur wijzigt.

In dat geval hoort de deze informatie gestructureerd beschikbaar gemaakt te worden in de metadata van het antwoord.

In het geval van een HTTP verzoek mogen dus alleen status codes en headers daar voor gebruikt worden.

### Toegestane verwerkingsverzoeken mogen voorgesteld worden

Aanbieders en afnemers mogen een overzicht geven van toegestane verwerkingsverzoeken.

Dit kan bijvoorbeeld gebeuren op basis van:
<ul>
<li>een standaard verzoek; bijvoorbeeld een voorgesteld "Mijn Zaken" verwerkingsverzoek wat alle zaken toont die toegewezen zijn aan de huidige gebruiker en niet langer dan 30 dagen geleden gesloten zijn.</li>
<li>een afgewezen verzoek; bijvoorbeeld als te veel informatie gevraagd wordt een aangepast verzoek voorstellen dat alleen _toegestane_ velden opvraagt.</li>
<li>een bepaalde context; bijvoorbeeld alle mogelijke toegestane verzoeken voor een gegeven gebruiker</li>
</ul>

<p class="note" title="Mogelijkheid en wenselijkheid">
Niet alle verwerkingsverzoeken die mogelijk zijn, zijn ook wenselijk. Het voorstellen van verwerkingsverzoeken vergemakkelijkt het breder indienen van verwerkingsverzoeken. Daarom is het van belang dat een bewuste overweging gemaakt wordt of het voorstellen van de toegestane verzoeken gewenst is in de gegeven context.  
</p>

### Applicaties mogen functionaliteit aanpassen op basis van de aanvrager

Applicaties mogen gegevens over de aanvrager ontvangen en op basis daarvan functionaliteit aanpassen.

Het is dus bijvoorbeeld toegestaan om een in een verwerkingsverzoek voor "Mijn Zaken" de gebruikersnaam uit een authenticatie token te gebruiken om alleen zijn of haar zaken te tonen.

De verwachting is dat applicaties met het hoogste volwassenheidsniveau van toegangsverlening dit niet nodig zullen hebben.

TODO
<ul>
<li>Is dit echt wenselijk vanuit principe? Het is vanuit praktisch oogpunt niet te voorkomen; maar dat kan ook als "should not" opgenomen worden in de standaard.</li>
</ul>

## Additionele keten-vereisten

### Autorisatieregels mogen vereisten opleggen aan verwerkende applicaties

Waar mogelijk heeft het de voorkeur om alle toegangsregels voor een toegangsbeslissing gelijktijdig te valideren. Het verzoek kan de geheel toegestaan of afgewezen worden.

Vanuit technische overwegingen is dit niet altijd haalbaar. In die gevallen *mogen* additionele vereisten opgelegd worden aan applicaties.

Denk hierbij bijvoorbeeld aan:
<ul>
    <li>een /mijn-zaken endpoint dat vanuit de autorisatieregels beperkt wordt tot de zaken van de vragende gebruiker die niet langer dan 30 dagen geleden gesloten zijn</li>
    <li>het niet cachen of opslaan van gegevens</li>
    <li>het sturen van een notificatie</li>
</ul>.

<p class="note" title="Behoud van verantwoordelijkheid">
De uitvoerder van de autorisatieregel blijft verantwoordelijk voor de uitvoering van het toegangsbeleid. De organisatie als geheel is dus verantwoordelijk dat de verwerkende applicatie de vereiste ook correct implementeert.
</p>

<p class="note" title="Vereisen van bevestiging">
Soms is het risico dat een vereiste niet wordt uitgevoerd zeer groot. Dan kan het eerste verzoek beter afgewezen worden. De applicatie wordt dan gevraagd om een tweede verzoek in te dienen waarin de applicatie expliciet bevestigen te kunnen voldoen aan de vereiste.
</p>

### Eisen aan betrokkenen horen middels verifieerbare verklaringen opgelegd te worden

Voor het opleggen van vereisten aan betrokkenen wordt gebruikt gemaakt van [[W3C Verifiable Credentials]].

Denk hierbij bijvoorbeeld aan het vereisen dat de applicatie in het afgelopen een pen-test heeft doorlopen of dat de aanvragende organisatie ISO 27001 gecertificeerd is.

<p class="note" title="Toestaan van meerdere issuers">
De aanbieder kan kiezen om alleen zichzelf als issuer van de Verifiable Credential te accepteren. Het wordt echter aangeraden om, waar mogelijk, een netwerk van derde partijen te realiseren die de vereisten kunnen verifiëren.
</p>