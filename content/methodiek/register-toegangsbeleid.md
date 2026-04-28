---
Title: Register Toegangsbeleid
type: 'chapter'
---

{{< chapter/header title="Methodiek" bg="green">}}

<div class="sub-navigation-wrapper" role="navigation">
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-groen-25">
   <p>
      <a href="../principes">De principes</a> 
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-groen-25">
   <p>
      <a href="../authzen-nlgov">AuthZEN</a>
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-groen-25">
   <p>
      <a href="../logboek-toegangsbeslissingen">Logboek</a>
   </p>
</div> 
<div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      Register Toegangsbeleid
   </p>
</div> 
</div>

{{< /chapter/header >}}

{{< chapter/section title="Register Toegangsbeleid">}}

### Doel

Het Register Toegangsbeleid heeft als doel om inzicht te bieden in het toegangsbeleid dat van toepassing is op gegevensuitwisselingen. Het gaat om het publiceren en ontdekbaar maken van beleid: welke regels gelden er, voor wie, en op basis van welke grondslagen?

Met een goede standaard worden policies begrijpelijk, uitlegbaar en traceerbaar. Policies worden ook ontdekbaar en uitwisselbaar tussen verschillende organisaties. Dit zijn belangrijke voorwaarden voor het Federatieve Datastelsel als vertrouwensraamwerk.

### Een standaard

Er is nog geen open standaard voor het publiceren van toegangsbeleid. Daarom stelt FTV deze zelf op, voortbouwend op bestaande W3C-standaarden.

De standaard zal beschrijven:
- Hoe toegangsbeleid machineleesbaar wordt vastgelegd
- Welke metadata een policy moet en mag hebben
- Hoe versies van policies over tijd gerelateerd worden
- Hoe beleid ontdekbaar wordt gemaakt via datacatalogi

### ODRL als basis

Als taal voor het vastleggen van toegangsbeleid wordt [ODRL (Open Digital Rights Language)](https://www.w3.org/TR/odrl-model/) onderzocht. ODRL is een W3C-standaard die breed toepasbaar is voor het uitdrukken van rechten, plichten en beleid.

De werkgroep heeft vastgesteld dat ODRL goed past voor het vastleggen van logisch toegangsbeleid: het *wat* en *waarom* van toegangsregels. Voor technisch uitvoerbaar beleid (het *hoe*) is ODRL nog niet toereikend; daarvoor bestaan talen zoals Rego en Cedar. Een belangrijk aandachtspunt is hoe vanuit het logisch toegangsbeleid in ODRL effectief verwezen kan worden naar het technisch toegangsbeleid, dat ook in andere talen geschreven kan zijn.

Ook de integratie en koppeling van ODRL met [AuthZEN](../authzen-nlgov) voor het modelleren van individuele toegangsverzoeken zal worden verkend.

ODRL sluit aan bij [DCAT-AP](https://joinup.ec.europa.eu/collection/semic-support-centre/solution/dcat-application-profile-data-portals-europe), de standaard voor datacatalogi. Hierdoor kan toegangsbeleid gekoppeld worden aan de datasets in een catalogus en zo ontdekbaar worden voor potentiële afnemers.

### Aanpak

De standaard wordt op use-case basis ontwikkeld door de [werkgroep Federatieve Toegangsverlening](/ftv/meedoen/werkgroep/), waarbij concrete voorbeelden van bestaand toegangsbeleid worden geanalyseerd en gemodelleerd in ODRL. Denk hierbij aan de BRP-autorisatiebesluiten, het gemeentelijk afnamebeleid en het toegangsbeleid rond de iWlz.

### Status

De standaard is in ontwikkeling. Sinds februari 2026 werkt de werkgroep aan de vormgeving van het register. Het doel is om in de loop van 2026 een eerste versie van de standaard op te leveren.

{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-groen-25" previouslink="../logboek-toegangsbeslissingen" previoustitle="Logboek" >}}
{{< /chapter/nextprevious >}}
