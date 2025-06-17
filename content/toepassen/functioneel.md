---
Title: Functioneel
type: 'chapter'
---

{{< chapter/header title="Toepassen" bg="brown">}}

<div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../functioneel">Functies en rollen</a> 
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../stappenplan">Stappenplan</a>
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../openftv">OpenFTV</a> 
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../proefopstelling">Proefopstelling</a>
   </p>
</div>
{{< /chapter/header >}}

{{< chapter/section title="Functioneel" >}}

Voor een goed werkende oplossing voor Federatieve Toegangsverlening (FTV) zijn afspraken nodig over beheer en uitvoering (runtime).
Wat komt er kijken bij het toepassen en beheren van toegangsregels?
{{< /chapter/section >}}

{{< chapter/section title="1. Tijdens gebruik (runtime)" level="3" >}}

Zodra toegang wordt gevraagd, voert de software automatisch taken uit om de regels voor verwerking toe te passen.

- **Beslissingen afdwingen**: zorgen dat genomen beslissingen ook gegarandeerd nageleefd worden.
- **Beslissingen nemen**: uitrekenen of het verzoek gehonoreerd, voorwaardelijk gehonoreerd of afgewezen moet worden. Dit gebeurt op basis van informatie (over subject, action, resource en context) en de beschikbare regels.
- **Beslissingen loggen**: vastleggen welke beslissingen zijn genomen, met de juiste hoeveelheid informatie om later verantwoording af te leggen en de juistheid van beslissingen te controleren.

Deze functies draaien bij elk verwerkingsverzoek. Daarom moeten ze snel afgehandeld kunnen worden.

{{< img-url "images/functioneel.svg" "Functioneel" >}}
{{< /chapter/section >}}

{{< chapter/section title="2. Beheer"  level="3" >}}

De beheersfuncties worden gebruikt voor het opstellen en onderhouden van regels.

#### Beveiliging

Het beheer van toegangsregels vraagt om goede beveiliging. Een gedeeld of apart systeem voor identiteits- en toegangsbeheer (Identity and Access Management, IAM) regelt de toegang voor beheerders, met rollen, rechten en policies.

#### Regels opstellen

Regels kunnen gemaakt, aangepast of verwijderd worden. Dat kan met een uitgebreide editor die is afgestemd op de policytaal of met een eenvoudige oplossing die alleen bestanden aanneemt.

#### Versiebeheer

Door de historie van regels op te slaan, is het mogelijk achteraf te zien welke regels wanneer golden. Ook kunnen wijzigingen teruggedraaid worden.

#### Testen

Het opstellen van regels in elke taal is complex. Het is bovendien lastig om handmatig te overzien wat de gevolgen van een wijziging zijn voor de hele set. Daarom is een testfaciliteit nodig. Daarmee kan een regelset worden getest tegen een dataset, zodat zichtbaar wordt welke invloed wijzigingen hebben op beslissingen.

#### Workflow

Goed beheer vraagt om samenwerking. Verschillende mensen moeten een rol kunnen vervullen, zoals het schrijven, testen en goedkeuren van regels.

#### Distributie

Vaak beheert een centraal team de regels, terwijl de uitvoering ervan decentraal en geautomatiseerd plaatsvindt. Een goed distributiemechanisme zorgt ervoor dat elk systeem precies de juiste versie ontvangt.

#### Monitoring

Goed beheer begint met inzicht in hoe de toegang in de praktijk functioneert. Denk aan de beschikbaarheid van runtime-omgevingen en aan statistieken over het aantal aanvragen en beslissingen. Zo kan gemonitord worden of er bijvoorbeeld onverwacht veel aanvragen of afwijzingen zijn. Dat kan wijzen op pogingen tot ongeoorloofde toegang.

#### Verantwoording

Bij een vermoeden van fraude of tijdens een audit moet het systeem inzicht geven in alle relevante informatie over een of meer toegangsbeslissingen.
{{< /chapter/section >}}
