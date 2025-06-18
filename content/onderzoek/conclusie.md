---
Title: Conclusie
type: 'chapter'
---
{{< chapter/header title="Onderzoek" bg="blue">}}

<div class="utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../status_techniek">Status techniek</a> 
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../status_nl_overheid">Status overheid</a>
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../eisen_aan_de_oplossing">Eisen</a>
   </p>
</div><div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../conclusie">Conclusie</a>
   </p>
</div> 

{{< /chapter/header >}}

{{< chapter/section title="Conclusie" >}}

{{< /chapter/section >}}    

{{< chapter/section title="1. Status van de techniek" level="3">}}

{{< /chapter/section >}}

{{< chapter/section title="Methodieken" level="4">}}

De architectuur **Externalized Authorization Management (EAM)** is de meest geschikte keus voor Federatieve Toegangsverlening (FTV).
EAM voldoet aan de eisen van flexibiliteit en schaalbaarheid. 

Policy-Based Access Control (PBAC), Attribute-Based Access Control (ABAC) en Relationship-Based Access Control (ReBAC) zijn verschillende vormen van Externalized Authorization Management (EAM).
Een keuze tussen deze vormen is op dit moment niet zinvol.

{{< /chapter/section >}}

{{< chapter/section title="Regeltalen" level="4">}}

Er zijn veel regeltalen, waarvan er niet één intrinsiek beter is, of een groter marktaandeel heeft. Ze willen alleen grotendeels hetzelfde en ontlenen hun bestaansrecht voornamelijk aan het product waaraan ze gekoppeld zijn. 

**FTV zal vooralsnog geen keus maken**. In plaats daarvan wordt op termijn gekeken of een overkoepelend mechanisme haalbaar is dat voldoende verbindt.

{{< /chapter/section >}}

{{< chapter/section title="Standaarden" level="4">}}

De enige open standaard die nu daadwerkelijk toepasbaar is en voet aan de grond heeft bij de grote spelers is AuthZEN van de OpenID foundation.

**FTV sluit zich bij AuthZEN aan**, en specificeert een profiel en/of extensies daarbovenop voor de Nederlandse overheid. 

{{< /chapter/section >}}

{{< chapter/section title="Producten" level="4">}}

Van de gratis open source producten zijn er een aantal getest en zijn in principe allen geschikt. Het zijn echter alleen deelvoorzieningen waarmee regels runtime toegepast kunnen worden (Policy Decision points, PDPs). 

Voor een totaaloplossing zit de uitdaging vooral in schaalbaar en gedistribueerd beheer en operatie. Hiervoor zijn commerciële producten beschikbaar. Vaak zijn deze om een open source PDP gebouwd, zijn als het ware een freemium.

Lopende het project wordt door FTV een eigen marktonderzoek van commerciële oplossingen gedaan. Dit gebeurt door eigen tests en vooral door gesprekken met de leveranciers zelf. Er wordt specifiek gekeken naar toegangsverlening, zowel runtime als beheer. Koppelingen naar aanpalende systemen zoals Identity and Access Management (IAM) worden meegenomen. 

[Het resultaat]({{< param baseDirectory >}}toepassen/softwarekeus) zal geen koopadvies worden, maar een handreiking over hoe tot een keus te komen.
{{< /chapter/section >}}

{{< chapter/section title="2. Status bij de Nederlands overheid" >}}

{{< /chapter/section >}}

{{< chapter/section title="Koppelvlakstandaarden" level="4">}}

De bestaande koppelvlakstandaarden bieden **geen van allen** invulling aan toegangsverlening, maar vormen ook geen belemmering. Een nieuwe standaard zou prima aan de bestaande koppelvlakken kunnen worden toegevoegd. Dit is dan ook het streven van FTV.

{{< /chapter/section >}}

{{< chapter/section title="Aanbieders" level="4">}}

Van de aanbieders heeft alleen de BRP een serieuze vorm van toegangsverlening. Dit is een zelfgebouwde oplossing die gelijkenissen met PBAC heeft. Het is op zich niet vreemd dat er weinig gedaan is, omdat aanbieders vaak weinig complexe regels hebben, die liggen eerder bij de afnemers.
{{< /chapter/section >}}

{{< chapter/section title="Afnemers" level="4">}}

De meeste systemen van afnemers hebben toegangsverlening erkend als belangrijk en lastig. De oplossingen zijn heel divers maar over het algemeen RBAC of ad hoc maatwerk. Bij leveranciers van zaaksystemen zoals Maykin en DImpact zijn wel stappen gezet richting PBAC. Het succes daarvan staat of valt bij de beheersbaarheid op schaal.
{{< /chapter/section >}}

{{< chapter/section title="Datastelsel" level="4">}}

Er zijn een aantal sectorspecifieke en ketenintegratievoorzieningen die heel goed functioneren. Toegangsverlening is daarin vaak al goed meegenomen, ook met EAM.
{{< /chapter/section >}}
