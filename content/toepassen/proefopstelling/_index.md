---
Title: Proefopstelling
type: 'chapter'
---

{{< chapter/header title="Toepassen" bg="brown">}}

<div class="sub-navigation-wrapper">
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
   <p>
      <a href="../functioneel">Functieoverzicht</a> 
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
   <p>
      <a href="../stappenplan">Stappenplan</a>
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
   <p>
      <a href="../openftv">OpenFTV</a> 
   </p>
</div>
<div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../proefopstelling">Proefopstelling</a>
   </p>
</div>
{{< /chapter/header >}}
</div>

{{< chapter/section title="Proefopstelling" >}}

De proefopstelling laat zien hoe Federatieve Toegangsverlening (FTV) in de praktijk kan werken. Daarvoor is een eenvoudig en werkend federatief datastelsel ingericht. De componenten rondom toegangsverlening zijn in deze opstelling volledig uitgewerkt.

Benieuwd hoe een concrete use case er in deze proefopstelling uitziet? Lees dan verder bij [het aanvragen van laadpaalvergunningen](laadpalen).
{{< /chapter/section >}}

{{< chapter/section title="Overzicht opstelling" level="3">}}
De proefopstelling is een eenvoudig federatief datastelsel met als onderdelen:

- Bij de gemeente:
  - Een zaaksysteem voor gemeentemedewerkers
  - Een of meer gemeentelijke registraties
- De Basisregistratie Personen (BRP), een service van de Rijksdienst voor Identiteitsgegevens (RvIG)
- De Basisregistratie Voertuigen (BRV), een service van de Rijksdienst voor het Wegverkeer (RDW)

{{< img-url "diagrams/proefopstelling-overzicht.svg" "Proefopstelling overzicht" >}}
{{< /chapter/section >}}

{{< chapter/section title="Opstelling gemeente"  level="3">}}
De opstelling bij de gemeente kunnen we verder detailleren als volgt:
{{< img-url "diagrams/proefopstelling-zaaksysteem.svg" "Proefopstelling zaaksysteem" >}}

- **De zaak-applicatie**

  De applicatie waarmee medewerkers zaken afhandelen.

- **Logging (LDV)**

  Omdat het systeem persoonsgegevens verwerkt (personen en voertuigen opzoekt) moet het een logboek dataverwerkingen bijhouden. Hier wordt de referentie-implementatie van Logboek Dataverwerking (LDV) gebruikt.

- **Gateway (FSC)**

  Om te communiceren met registraties, zowel binnen als buiten de gemeente, is er een gateway. Hier wordt de referentie-implementatie van Federatieve Service Connectiviteit (OpenFSC) gebruikt. Deze heeft een Policy Enforcement Point (PEP) die elke verbinding op toegang controleert.

- **Policy Decision Point (PDP)**

  Hier is gekozen voor Cedar, die bepaalt of toegang wordt verleend op basis van ingestelde regels.

- **Policy Administration Point (PAP)**

  De FTV-referentie wordt gebruikt als PAP. Deze gebruikt het bestandssysteem voor de opslag van policies. Er is een command line interface (CLI) om policies toe te voegen, bij te werken en te verwijderen. De policies worden door een push-interface aan OPA (Open Policy Agent) doorgegeven: elke wijziging wordt direct doorgegeven.

- **Policy Information Point (PIP)**

  Als PIP wordt de FTV-referentie gebruikt.

{{< /chapter/section >}}

{{< chapter/section title="Opstelling basisregistraties"  level="3">}}
{{< img-url "diagrams/proefopstelling-stelsel.svg" "Proefopstelling stelsel" >}}
{{< /chapter/section >}}

{{< chapter/section title="Registraties" level="4">}}

Er zijn twee registraties: BRP en BRV. Ze bevatten allebei de volgende onderdelen:

- **Gateway**

  Elke registratie heeft een eigen gateway. Er zijn twee verschillende leveranciers gekozen om aan te tonen dat gateways uitwisselbaar zijn binnen het stelsel.

- **Service**

  Eenvoudige BRP en BRV services, met bijbehorende eenvoudige opslag.

- **Logging**

  Elke registratie maakt gebruik van een eigen logboek voor het bijhouden van de uitgevoerde verwerkingen. De aanroep is de verantwoordelijkheid van de service.

- **Residual policy processor (RPP)**

  Elk een RPP, die deelpolicies toepast die de afnemer niet kon uitvoeren. Er zijn ook hier twee verschillende gekozen, om twee alternatieve methodes te laten zien.

{{< /chapter/section >}}
{{< chapter/section title="Gedeeld EAM" level="4">}}

De registraties delen in deze proefopstelling voor de eenvoud één toegangsverleningsysteem. In de praktijk zal dat meestal niet het geval zijn. De onderdelen zijn herkenbaar als dezelfde als bij de gemeente, maar dan:
- Cerbos als **PDP**
- Git als **PAP**, met GitLab als interface, zowel de service naar de PDP als de webapplicatie voor policybeheer.
- OpenFTV als **PIP**
{{< /chapter/section >}}
