---
type: "chapter"
title: "Elementen van de oplossing"
---
{{< chapter/section title="Elementen van de oplossingsrichting" level="1">}}
Een moderne oplossingsrichting bestaat uit verschillende elementen. Per element is aangegeven in hoeverre deze aansluit bij de gestelde [richtlijnen](/ftv/onderzoek/eisen_aan_de_oplossing/toekomstvisie/) en benoemde [bezwaren](/ftv/onderzoek/eisen_aan_de_oplossing/bezwaren/).
{{< /chapter/section >}}

{{< chapter/section title="1. Vertrouwensraamwerken" >}}
Het concept van een vertrouwensraamwerk (of: trust framework) is een denkwijze die past bij de toekomstvisie en het adresseren van de bezwaren.

De kern van een vertrouwensraamwerk is een set van afspraken waarin de rechten en de plichten van aanbieders en afnemers zijn vastgelegd. 
Deze afspraken zijn de basis voor een vertrouwen, dat de plaats kan innemen van strenge maatregelen vanuit wantrouwen.
Door in deze afspraken de verantwoordingsverplichting juist neer te leggen, kunnen aanbieders erop vertrouwen dat afnemers hun
rol genomen hebben in controles voordat een verwerkingsverzoek gedaan wordt. Dit komt tegemoet aan het juridische bezwaar (punt 1 bij [bezwaren](/ftv/onderzoek/eisen_aan_de_oplossing/bezwaren/)).

Een belangrijke rol hierin is weggelegd voor vertrouwde derde partijen. Deze partijen worden door de deelnemers van het netwerk
erkend als handelend vanuit het belang van het netwerk en moeten voldoen aan voorwaarden die het netwerk aan ze stelt. 
Vertrouwde derde partijen geven certificaten uit, waarmee aanbieders de identiteit van afnemers kunnen controleren,
ook als ze de afnemer niet vooraf kennen. In deze opzet is het niet nodig voor elke afnemer-aanbieder een vooraf 
vastgelegd contract te hebben. Dit scheelt in beheerslast bij schaalvergroting en komt daarmee tegemoet aan het bezwaar tegen de bewerkelijkheid (punt 2 bij [bezwaren](/ftv/onderzoek/eisen_aan_de_oplossing/bezwaren/)).

{{< /chapter/section >}}

{{< chapter/section title="Verifieerbare verklaringen" level="3">}}

Het gebruik van [verifieerbare verklaringen](/ftv/onderzoek/eisen_aan_de_oplossing/elementen/) is element van de oplossing en past in vertrouwensraamwerken.

In een klassieke API-uitwisseling stuurt de aanvrager bij de vraag aan de resource een identificatie mee van het subject
en bepaalt de aanbieder aan de hand van die combinatie de regels. De aanbieder legt de regels vast en controleert ze.
Dit vereist dat aanbieder en afnemer dezelfde aanduiding gebruiken voor subject, dus dezelfde lijsten met personen en rollen.
Partijen moeten elkaar dus kennen voordat ze gegevens kunnen uitwisselen.

{{< img-url "images/2.2verklaringen.png" "Diagram verklaringen" >}}

In een federatief stelsel werkt dit net anders. De afnemer haalt vooraf zogenaamde verifieerbare verklaringen op. 
Een  door een door het stelsel vertrouwde derde partij geeft deze verklaringen af. De afnemer stuurt de verklaring
mee met een verwerkingsverzoek. De aanbieder kan de verklaringen vervolgens controleren bij de vertrouwde partij, 
zonder de afnemer te kennen. Zoals een agent aan een rijbewijs kan controleren of iemand rijbevoegd is, zonder
de persoon te kennen. Ook dit komt tegemoet aan het bezwaar tegen de bewerkelijkheid (punt 2 bij [bezwaren](/ftv/onderzoek/eisen_aan_de_oplossing/bezwaren/)). 

Certificaten en verklaringen zijn niet hetzelfde, maar elkaar aanvullen. Certificaten gaan over controleerbare
identiteit, terwijl verklaringen gaan over bevoegdheid. Zoals op een rijbewijs zowel een pasfoto als een bevoegdheidsaantekening staat.

{{< /chapter/section >}}

{{< chapter/section title="2. Mens én machineleesbare toegangsregels" level="2">}}

Door toegangsregels vast te leggen in een gestandaardiseerd formaat buiten de applicatie-code 
wordt het makkelijker om het beleid aan te passen. Er hoeft immers geen applicatie-code aangepast te worden.

Door toegangsregels tegelijkertijd zodanig inzichtelijk te maken dat ze door niet-ontwikkelaars begrijpelijk en aanpasbaar zijn,
wordt de flexibiliteit en verifieerbaarheid beter.

Deze regels komen daarmee tegemoet aan bezwaren over flexibiliteit en verifieerbaarheid (punt 3 en 4 bij [bezwaren](/ftv/onderzoek/eisen_aan_de_oplossing/bezwaren/)).

{{< /chapter/section >}}

{{< chapter/section title="3. Externalized Authorization Management (EAM)" level="2">}}

EAM is een verzamelnaam van methodieken voor toegangsverlening die een aantal elementen combineert, waaronder:
- Toegangsregels worden in aparte machine-uitvoerbare bestanden vastgelegd. Deze methode komt tegemoet aan bezwaren over flexibiliteit en verifieerbaarheid en sluit aan bij de [toekomstvisie](/ftv/onderzoek/eisen_aan_de_oplossing/toekomstvisie/) van de Generieke Digitale Infrastructuur (GDI) over automatisering contractering.
- De context (locatie, tijd, etc.) kan worden gebruikt in toegangsregels. Dit sluit aan bij de [toekomstvisie](/ftv/onderzoek/eisen_aan_de_oplossing/toekomstvisie/) van de GDI over contextuele toegangscontrole.
  
{{< /chapter/section >}}

{{< chapter/section title="4. Een standaardmethodiek vastleggen en uitleggen" level="2">}}

Het bezwaar beperkte standaardisatie (punt 5 bij [bezwaren](/ftv/onderzoek/eisen_aan_de_oplossing/bezwaren/)) wordt geadresseerd door het ontwikkelen van een standaard met een formele status binnen de Nederlandse overheid.

Het zero-trust principe, onderdeel van de [toekomstvisie](/ftv/onderzoek/eisen_aan_de_oplossing/toekomstvisie/) van de GDI, krijgt in de implementatie verdere invulling.
{{< /chapter/section >}}
