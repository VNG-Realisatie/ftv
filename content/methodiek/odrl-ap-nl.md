---
Title: ODRL-AP-NL
type: 'chapter'
aliases:
  - /methodiek/register-toegangsbeleid/
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
      <a href="../ADL">ADL</a>
   </p>
</div> 
<div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      ODRL-AP-NL
   </p>
</div> 
</div>

{{< /chapter/header >}}

{{< chapter/section title="ODRL-AP-NL">}}

### Doel

ODRL-AP-NL maakt het mogelijk om toegangsbeleid, dat nu verspreid staat in losse autorisatiebesluiten, convenanten en leveringsovereenkomsten, uit te drukken in een vaste en voorspelbare structuur. Elke regel benoemt op dezelfde manier wie toegang krijgt, tot welke gegevens, onder welke voorwaarden, met welk doel en op welke grondslag.

De basis daarvoor is ODRL. Die standaard biedt één manier van vastleggen, waardoor toegangsbeleid van verschillende systemen, afdelingen en organisaties op dezelfde manier kan worden verzameld en ter inzage aangeboden. Deelnemers van stelsels zoals het Federatief Datastelsel, burgers, juristen en toezichthouders zien zo welk toegangsbeleid geldt zonder de onderliggende documenten te hoeven doorgronden.

ODRL-AP-NL voegt daar twee dingen aan toe. Het profiel koppelt organisatorisch toegangsbeleid aan het technische toegangsbeleid dat het met AuthZEN uitvoert, en het bedt ODRL in in het Nederlandse stelsel van linked-datastandaarden.

### Een sluitende verantwoordingsketen

Met ODRL-AP-NL is de verantwoordingsketen van FTV compleet. De keten begint bij de definitie van een dataset in een datacatalogus. Daaraan is het toegangsbeleid gekoppeld dat voor die dataset geldt, uitgedrukt in ODRL-AP-NL. Dat beleid verwijst naar de definitie van toegangsverzoeken volgens [NLGov AuthZEN](../authzen-nlgov) en naar het technische toegangsbeleid dat die verzoeken beoordeelt. De [Authorization Decision Log](../adl) legt elke beslissing uniform vast, met verwijzing naar het toegepaste beleid.

![Schema van de verantwoordingsketen: dataset, toegangsbeleid, toegangsverzoek, technisch beleid en beslissing](/ftv/diagrams/verantwoordingsketen.svg)

Elke schakel verwijst naar de volgende. Vanaf de beschrijving van een dataset is zo te herleiden welk beleid erop geldt, welke verzoeken daaronder vallen en welke programmacode een specifiek verzoek beoordeelt, tot in de broncode van opensourcesoftware. Omgekeerd is van een vastgelegde beslissing te herleiden op welk beleid en welke dataset ze betrekking had.

### De keuze voor ODRL

[ODRL (Open Digital Rights Language)](https://www.w3.org/TR/odrl-model/) is een W3C-standaard voor het uitdrukken van rechten, plichten en beleid, vanuit het juridische perspectief van wie wat mag, met welk doel en op welke grondslag. ODRL is bovendien verankerd in [DCAT](https://www.w3.org/TR/vocab-dcat-3/), de standaard voor datacatalogi. Toegangsbeleid in ODRL-AP-NL past daardoor in bestaande catalogi die [DCAT-AP-NL](https://geonovum.github.io/DCAT-AP-NL30/) volgen. Wie een dataset vindt, vindt ook het beleid dat erop geldt.

ODRL is machineleesbaar, maar niet zonder meer machine-uitvoerbaar. De technische uitvoering staat los van ODRL-AP-NL. Organisaties kiezen zelf hun beleidstaal, net zoals de overheid niet standaardiseert op een programmeertaal. Wie beleid en uitvoering wil koppelen, legt in het beleid vast met welk [NLGov AuthZEN](../authzen-nlgov)-informatiemodel een toegangsverzoek wordt uitgedrukt en welke technische policy dat verzoek evalueert.

### Opbouw van het profiel

Het profiel herhaalt ODRL niet, maar beschrijft in twee delen wat de Nederlandse overheid eraan toevoegt. Het informatiemodel volgt de indeling van ODRL en voegt per klasse de Nederlandse toevoegingen toe, zoals grondslag en wetsverwijzingen bij een regel, verplichte identificatie en versionering van beleid, en groepen burgers als partij. De inbedding in het linked-dataveld regelt het eigenaarschap van beleid, de aansluiting op DCAT-AP-NL en het gebruik van vocabulaires zoals [DPV (Data Privacy Vocabulary)](https://w3id.org/dpv) voor doel en grondslag. Toetsregels (SHACL) controleren of beleid aan het profiel voldoet.

Beleid moet ook te tonen zijn. Samen met de internationale ODRL-gemeenschap werkt FTV daarom aan een W3C-richtlijn voor de visualisatie van toegangsbeleid, opgenomen in het [voorstel voor ODRL 3](https://w3c.github.io/odrl/w3c-wg-draft-charter-2026/dpwg-draft-charter.html). Lees de [ODRL Visualisation Note](/ftv/odrlvis/note/) of bekijk het [toegangsbeleid van de fictieve gemeente Vlierdam in de ODRL Visualizer](/ftv/odrlvis/?src=voorbeelden/vlierdam-voorbeeld.ttl).

### Status

Een werkgroep van medewerkers van diverse overheidsorganisaties werkt ODRL-AP-NL uit, getoetst aan bestaand toegangsbeleid zoals het autorisatiebesluit voor de Basisregistratie Personen (BRP). Twee subwerkgroepen nemen het informatiemodel en de linked-data-inbedding voor hun rekening. Meedoen kan via de [werkgroep Federatieve Toegangsverlening](/ftv/meedoen/werkgroep/).

{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-groen-25" previouslink="../adl" previoustitle="ADL" >}}
{{< /chapter/nextprevious >}}
