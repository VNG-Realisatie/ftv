---
type: "chapter"
title: "Elementen van de oplossing"
---
{{< chapter/section title="Elementen van de oplossingsrichting" level="1">}}
We beschrijven hier de elementen van een moderne oplossingsrichting, en bekijken van elk of die tegemoet komt aan de richtlijnen en/of de bezwaren.
{{< /chapter/section >}}

{{< chapter/section title="1. Vertrouwensraamwerken" >}}
Een denkwijze die past bij de toekomstvisie en adresseren van de bezwaren is het concept van een vertrouwensraamwerk of trust framework.

Kern van een vertrouwensraamwerk is een set van afspraken waarin de rechten en plichten van aanbieders en afnemers is vastgelegd. 
Deze afspraken zijn de basis voor een vertrouwen, dat de plaats in kan nemen van strenge maatregelen vanuit wantrouwen.
Door in deze afspraken de verantwoordingsverplichting juist neer te leggen, kunnen aanbieders erop vertrouwen dat afnemers hun
rol genomen hebben in controles voordat een verwerkingsverzoek gedaan worden, hetgeen tegemoet komt aan bezwaar 1 (juridisch).

Een belangrijke rol hierin is weggelegd voor vertrouwde derde partijen. Deze partijen worden door de deelnemers van het netwerk
erkend als handelend vanuit het belang van het netwerk en voldoend aan voorwaarden die het netwerk aan ze stelt. 
Vertrouwde derde partijen geven certificaten uit, waarmee aanbieders de identiteit van afnemers kunnen controleren,
ook als ze de afnemer niet a priori kennen. In deze opzet is het niet nodig voor elke afnemer-aanbieder een vooraf 
vastgelegd contract te hebben. Dit scheelt in beheerslast bij schaalvergroting, en komt daarmee tegemoet aan bezwaar 2 (bewerkelijk).

{{< /chapter/section >}}

{{< chapter/section title="Verifieerbare verklaringen" level="3">}}

Het gebruik van verifieerbare verklaringen (richtlijn 3) past in vertrouwensraamwerken.

In een klassieke API-uitwisseling stuurt de aanvrager bij de vraag aan de resource een identificatie mee van het subject,
en bepaalt de aanbieder aan de hand van die combinatie de regels. De regels worden dus vastgelegd en gecontroleerd door de aanbieder.
Dit vereist dat aanbieder en afnemer dezelfde aanduiding gebruiken voor subject, dus dezelfde lijsten met personen en rollen.
Partijen moeten elkaar dus kennen voordat gegevens uitgewisseld kunnen worden.

{{< img-url "images/2.2verklaringen.png" "Diagram verklaringen" >}}

In een federatief stelsel werkt dit net anders. De afnemer haalt vooraf zogenaamde verifieerbare verklaringen op. 
Deze verklaringen worden afgegeven door een door het stelsel vertrouwde derde partij. De afnemer stuurt de verklaring
mee met een verwerkingsverzoek. De aanbieder kan de verklaringen vervolgens controleren bij de vertrouwde partij, 
zonder de afnemer te kennen. Zoals een agent aan een rijbewijs kan controleren of iemand rijbevoegd is, zonder
de persoon te kennen. Ook dit komt tegemoet aan bezwaar 2 (bewerkelijk). 

Let op dat certificaten en verklaring niet hetzelfde zijn, maar elkaar aanvullen. Certificaten gaan over controleerbare
identiteit, en verklaringen over bevoegdheid. Zoals op een rijbewijs de pasfoto enerzijds en de aantekening 'B' anderzijds.

{{< /chapter/section >}}

{{< chapter/section title="2. Mens én machineleesbare toegangsregels" level="2">}}

Door toegangsregels vast te leggen in een gestandaardiseerd formaat buiten de applicatie-code 
wordt het makkelijker om het beleid aan te passen, omdat er geen applicatie-code aangepast hoeft te worden.

En door toegangsregels tegelijkertijd zodanig inzichtelijk te maken dat ze door niet-ontwikkelaars begrijpelijk en aanpasbaar zijn
wordt de flexibiliteit en verifieerbaarheid beter.

Deze regels komen daarmee tegemoet aan bezwaren 3 (flexibiliteit) en 4 (verifieerbaarheid).

{{< /chapter/section >}}

{{< chapter/section title="3.Externalized Authorization Management" level="2">}}

EAM is een verzamelnaam van methodieken voor toegangsverlening die een aantal elementen combineert, waaronder:
- Toegangsregels worden in aparte machine-uitvoerbare bestanden vastgelegd, dat tegemoet komt aan bezwaren 3 (flexibiliteit) en 4 (verifieerbaarheid) en richtlijn 4 (automatisering contractering).
- De context (locatie, tijd, etc.) kan worden gebruikt in toegangsregels, richtlijn 1 (contextuele toegangscontrole).
  
{{< /chapter/section >}}

{{< chapter/section title="4. Een standaardmethodiek vastleggen en uitleggen" level="2">}}

Bezwaar 5 wordt geadresseerd door een überhaupt een standaard te hebben, die formele status heeft bij de NL overheid.

Aan richtlijn 2, het zero trust principe, zal in de implementatie zelf tegemoet gekomen moeten worden.
{{< /chapter/section >}}