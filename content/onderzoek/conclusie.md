---
Title: Conclusie
type: 'chapter'
---
{{< chapter/header title="Onderzoek" link="/ftv/onderzoek" bg="blue">}}

<div class="sub-navigation-wrapper">
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-blauw-25">
   <p>
      <a href="../status_techniek">Status techniek</a> 
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-blauw-25">
   <p>
      <a href="../status_nl_overheid">Status overheid</a>
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-blauw-25">
   <p>
      <a href="../eisen_aan_de_oplossing">Eisen</a>
   </p>
</div><div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../conclusie">Conclusie</a>
   </p>
</div> 
</div>

{{< /chapter/header >}}

{{< chapter/section title="Conclusie" >}}

Toegangsverlening wordt volwassen. Schaalvergroting, gedistribueerde architectuur en federatief werken hebben de noodzaak van betere oplossingen duidelijk gemaakt. Er is een serieuze markt van producten ontstaan, die samenhangt met IAM in bredere zin.

{{< /chapter/section >}}    

{{< chapter/section title="1. Status van de techniek" level="3">}}


{{< /chapter/section >}}

{{< chapter/section title="Methodieken" link="../status_techniek/methodieken" level="4">}}

De architectuur van **[Externalized Authorization Management (EAM)](/ftv/methodiek/principes/)** is de meest geschikte keus voor Federatieve Toegangsverlening (FTV).
EAM voldoet aan de eisen van flexibiliteit en schaalbaarheid. 

Policy-Based Access Control (PBAC), Attribute-Based Access Control (ABAC) en Relationship-Based Access Control (ReBAC) zijn verschillende vormen van Externalized Authorization Management (EAM).
Er hoeft geen keus gemaakt te worden hiertussen, omdat de meeste systemen allen ondersteunen en ze elkaar kunnen aanvullen.

{{< /chapter/section >}}

{{< chapter/section title="Regeltalen" level="4">}}

Er zijn veel [regeltalen](/ftv/onderzoek/status_techniek/regeltalen), waarvan er niet één intrinsiek beter is of een groter marktaandeel heeft. Ze willen allen grotendeels hetzelfde en ontlenen hun bestaansrecht voornamelijk aan het product waaraan ze gekoppeld zijn. 

**FTV zal vooralsnog geen keus maken**. In plaats daarvan wordt gekeken of op termijn de sterkste naar voren komt of een overkoepelende taal of mechanisme ontstaat.

{{< /chapter/section >}}

{{< chapter/section title="Standaarden" level="4">}}

Er zijn pogingen gedaan producten tot standaard te verheffen en daarnaast een aantal meer onafhankelijke initiatieven. De enige open standaard voor EAM die nu daadwerkelijk toepasbaar is en voet aan de grond heeft bij de grote spelers is [AuthZEN](/ftv/methodiek/standaarden#authzen) van de OpenID Foundation.

**FTV sluit zich bij AuthZEN aan**, en specificeert een profiel en/of extensies daarbovenop voor de Nederlandse overheid. 

AuthZEN spreekt zich niet uit over logging of over de opslag van policies. Dit deel neemt FTV daarom zelf voor haar rekening.

{{< /chapter/section >}}

{{< chapter/section title="Producten" level="4">}}

Er zijn veel [open source producten](/ftv/onderzoek/status_techniek/producten#open) beschikbaar, waarvan een aantal belangrijke getest en in principe geschikt zijn bevonden. 

Dit zijn echter alleen deelvoorzieningen waarmee regels runtime toegepast kunnen worden (Policy Decision points, PDPs). Voor een totaaloplossing zit de uitdaging in schaalbaar en gedistribueerd beheer en operatie. Hiervoor zijn commerciële producten beschikbaar. Vaak zijn deze om een open source PDP gebouwd, als het ware een freemium model.

Lopende het project wordt door FTV een marktonderzoek van [commerciële oplossingen](/ftv/onderzoek/status_techniek/producten#closed) gedaan. Dit gebeurt door eigen tests en vooral door gesprekken met de leveranciers zelf. Er wordt gekeken naar compleetheid, adoptie van standaarden en koppelingen naar aanpalende systemen zoals Identity and Access Management (IAM). [Het resultaat van het onderzoek]({{< param baseDirectory >}}toepassen/softwarekeus) zal geen koopadvies worden, maar een handreiking over hoe tot een keus te komen.
{{< /chapter/section >}}

{{< chapter/section title="2. Status bij de Nederlandse overheid" >}}

{{< /chapter/section >}}

{{< chapter/section title="Koppelvlakstandaarden" level="4">}}

De bestaande [koppelvlakstandaarden](/ftv/onderzoek/status_nl_overheid/koppelvlakken/) bieden **geen van allen** invulling aan toegangsverlening, maar vormen ook geen belemmering. Een nieuwe standaard zou prima aan de bestaande koppelvlakken kunnen worden toegevoegd. Dit is dan ook het streven van FTV.

{{< /chapter/section >}}

{{< chapter/section title="Aanbieders" level="4">}}

Van de [aanbieders](/ftv/onderzoek/status_nl_overheid/aanbieders/) heeft alleen de BRP een serieuze vorm van toegangsverlening. Dit is een zelfgebouwde oplossing die gelijkenissen met PBAC heeft. Het is op zich niet vreemd dat er weinig gedaan is, omdat aanbieders vaak weinig complexe regels hebben. Deze liggen eerder bij de afnemers.
{{< /chapter/section >}}

{{< chapter/section title="Afnemers" level="4">}}

De meeste systemen van [afnemers](/ftv/onderzoek/status_nl_overheid/afnemers/) hebben toegangsverlening erkend als belangrijk en lastig. De oplossingen zijn heel divers maar over het algemeen RBAC of ad hoc maatwerk. Bij leveranciers van zaaksystemen zoals Maykin en Dimpact zijn wel stappen gezet richting PBAC. 

Het succes daarvan staat of valt met de beheersbaarheid op schaal. Tot nu toe zijn traagheid en de complexiteit van de policies nog struikelblokken.
{{< /chapter/section >}}

{{< chapter/section title="Datastelsels" level="4">}}

Er zijn een aantal [sectorspecifieke en ketenintegratievoorzieningen](/ftv/onderzoek/status_nl_overheid/platforms/) die goed functioneren. Toegangsverlening is daarin vaak goed meegenomen, ook met EAM. Deze stelsels hebben ook de grootste noodzaak gezien de schaal van uitwisseling en diversiteit van deelnemers.

Deze stelsels zijn een kansrijke plek voor FTV om de eerste adoptie te verkrijgen.
{{< /chapter/section >}}

{{< chapter/section title="Eindconclusie" level="3">}}
De tijd is rijp voor FTV. Er zijn goede oplossingen beschikbaar, maar nog geen standaarden, waardoor AuthZEN op het juiste moment komt.

Bij de Nederlandse overheid worden de eerste serieuze stappen naar EAM gezet door vernieuwende datastelsels. Doordat dit naar verhouding nog in de kinderschoenen staat is er nog veel ruimte om te sturen.
{{< /chapter/section >}}
