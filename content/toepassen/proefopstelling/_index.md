---
Title: Proefopstelling
type: 'chapter'
---

{{< chapter/header title="Toepassen" bg="brown">}}

<div class="sub-navigation-wrapper">
    <div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
       <p>
          <a href="../implementatie">Implementatie</a> 
       </p>
    </div>
    <div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
       <p>
          <a href="../openftv">OpenFTV</a>
       </p>
    </div>
    <div class="utrecht-paragraph pt-1 sub-navigation-tab sub-navigation-tab-selected">
       <p>
          <a href="../proefopstelling">Proefopstelling</a> 
       </p>
    </div>
    <div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
       <p>
          <a href="../demonstratie">Demonstratie</a>
       </p>
    </div>
</div>

{{< /chapter/header >}}

{{< chapter/section title="Proefopstelling" >}}

De proefopstelling laat zien hoe Federatieve Toegangsverlening (FTV) in de praktijk kan werken. Daarvoor is een eenvoudig en werkend federatief datastelsel ingericht. De componenten rondom toegangsverlening zijn in deze opstelling volledig uitgewerkt.

Benieuwd hoe een concrete use case er in deze proefopstelling uitziet? Lees dan de [demonstratie laadpaalvergunningen](../demonstratie).
{{< /chapter/section >}}

{{< chapter/section title="Overzicht opstelling" level="3">}}
De proefopstelling is een eenvoudig federatief datastelsel met als onderdelen:

- Bij een gemeente:
  - Een zaaksysteem voor gemeentemedewerkers
  - Een of meer gemeentelijke registraties
- De Basisregistratie Personen (BRP), een service van de Rijksdienst voor Identiteitsgegevens (RvIG)
- De Basisregistratie Voertuigen (BRV), een service van de Rijksdienst voor het Wegverkeer (RDW)

We laten hier nog in het midden wat voor zaken het zaaksysteem behandelt, dat kan in use cases ingevuld worden. 

{{< img-url "diagrams/proefopstelling-overzicht.svg" "Proefopstelling overzicht" >}}
{{< /chapter/section >}}

{{< chapter/section title="Opstelling gemeente"  level="3">}}
De opstelling bij de gemeente kunnen we verder detailleren als volgt:
{{< img-url "diagrams/proefopstelling-zaaksysteem.svg" "Proefopstelling zaaksysteem" >}}

- **Het zaaksysteem**

  De applicatie waarmee medewerkers zaken invoeren en afhandelen.

- **Gemeentelijke registraties**

  Een of meerdere lokale registraties, waarin de gemeente gegevens opslaat over de eigen zaken.

- **API Gateway**

  Om te communiceren met registraties, zowel binnen als buiten de gemeente, is er een gateway nodig. Deze heeft een Policy Enforcement Point (PEP) die elke verbinding op toegang controleert. In dit voorbeeld is voor Kong gekozen, een populaire en AuthZEN compliant gateway. 

- **Policy Decision Point (PDP)**

  Het component dat bepaalt of toegang wordt verleend, op basis van ingestelde regels. Hier is gekozen voor Cedar, een open source PDP van Amazon.

- **Policy Administration Point (PAP)**

  De FTV referentieimplementatie OpenFTV wordt gebruikt als PAP. Deze gebruikt een PostgreSQL database voor de opslag van policies, en heeft een eigen applicatie met gebruikersinterface voor het inzien en wijzigen.

- **Policy Information Point (PIP)**

  Als PIP wordt ook OpenFTV gebruikt, met het bestandssyteem voor opslag.

- **Authorization decision log (ADL)**

  De PDP stuurt alle genomen toegangsbeslissingen, zowel positief als negatief, door aan een gekoppeld logsysteem. Hier wordt de standaard OpenFTV implementatie gebruikt op basis van OpenTelemetry.

{{< /chapter/section >}}

{{< chapter/section title="Opstelling basisregistraties"  level="3">}}
{{< img-url "diagrams/proefopstelling-stelsel.svg" "Proefopstelling stelsel" >}}
{{< /chapter/section >}}

{{< chapter/section title="Registraties" level="4">}}

Er zijn twee registraties: BRP en BRV. Ze bevatten allebei dezelfde onderdelen als de gemeente-opstelling. 

Om te testen dat AuthZEN compliant gateways en PDPs uitwisselbaar zijn is er gekozen voor een andere gateway, Tyk, en een andere PDP, Cerbos. 

{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-donkerbruin-50" nextlink="../demonstratie" nexttitle="Demonstratie">}}
{{< /chapter/nextprevious >}}