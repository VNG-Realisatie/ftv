---
Title: Conclusie
type: 'chapter'
---
{{< chapter/section title="" >}}
# Conclusie
{{< /chapter/section >}}

{{< chapter/section title="1. Status van de techniek" >}}
### Methodieken

De architectuur **Externalized Authorization Management (EAM)** is de meest geschikte keus voor FTV.
EAM het voldoet aan de eisen van flexibiliteit en schaalbaarheid. 

PBAC/ABAC en ReBAC vallen beiden onder EAM. Een keus maken tussen die twee opties is op dit moment niet zinvol.

### Regeltalen

Er zijn veel regeltalen, waarvan er niet één intrinsiek beter is, of een groter marktaandeel heeft. Ze willen alleen grotendeels hetzelfde en ontlenen hun bestaansrecht voornamelijk aan het product waaraan ze gekoppeld zijn. 

**FTV zal geen vooralsnog keus maken**. In plaats daarvan wordt op termijn gekeken of een overkoepelend mechanisme haalbaar is die ze met elkaar verbindt.

### Standaarden

De enige open standaard die nu daadwerkelijk toepasbaar is en voet aan de grond heeft bij de grote spelers is AuthZEN van de OpenID foundation.

**FTV sluit zich bij AuthZEN aan**, en specificeert een profiel en/of extensies daarbovenop voor de Nederlandse overheid. 

### Producten

Van de gratis open source producten hebben we er een aantal getest en zijn in principe allen geschikt. 
Het zijn echter alleen voorzieningen waarmee regels runtime toegepast kunnen worden (PDP's). 

Voor een totaaloplossing zit de uitdaging vooral in schaalbaar en gedistribueerd beheer en operatie. 
Hiervoor zijn commerciële producten beschikbaar. Vaak zijn deze om een open source PDP gebouwd, zijn als het ware een freemium.

Lopende het project wordt door FTV een eigen inventarisatie gedaan. Dit gebeurt door eigen tests, en vooral door gesprekken met de leveranciers zelf. Er wordt specifiek gekeken naar toegangsverlening, zowel runtime als beheer, en koppelingen naar aanpalende systemen zoals IAM worden. 
[Het resultaat]({{< param baseDirectory >}}docs/toepassen/softwarekeus) zal geen koopadvies worden, maar een handreiking over hoe tot een keus te komen.
{{< /chapter/section >}}

{{< chapter/section title="2. Status bij de Nederlands overheid" >}}
### Koppelvlakstandaarden

**De bestaande koppelvlakstandaarden bieden geen van allen invulling aan toegangsverlening**, maar vormen ook geen belemmering. Een nieuwe standaard zou prima aan de bestaande koppelvlakken kunnen worden toegevoegd. Dit is dan ook het streven van FTV.

### Aanbieders

Van de aanbieders heeft alleen de BRP een serieuze vorm van toegangsverlening. Dit is een zelfgebouwde oplossing die gelijkenissen met PBAC heeft. Het is op zich niet vreemd dat er weinig gedaan is, omdat aanbieders vaak weinig complexe regels hebben, die liggen eerder bij de afnemers.

### Afnemers

De meeste systemen van afnemers hebben toegangverlening erkend als belangrijk en lastig. De oplossingen zijn heel divers maar over het algemeen RBAC of ad hoc maatwerk. Bij leveranciers van zaaksystemen zoals Maykin en DImpact zijn wel stappen gezet richting PBAC. Het succes daarvan staat of valt bij de beheersbaarheid op schaal.

### Datastelsels

Er zijn een aantal sectorspecifieke en ketenintegratievoorzieningen die heel goed functioneren. Toegangsverlening is daarin vaak al goed meegenomen, ook met EAM.
{{< /chapter/section >}}