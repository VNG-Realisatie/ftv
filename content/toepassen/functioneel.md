---
Title: Functieoverzicht
type: 'chapter'
---

{{< chapter/header title="Toepassen" bg="brown">}}

<div class="sub-navigation-wrapper">
    <div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab">
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
    <div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
       <p>
          <a href="../proefopstelling">Proefopstelling</a>
       </p>
    </div>
</div>
{{< /chapter/header >}}

{{< chapter/section title="Functieoverzicht" >}}

Voor een goed werkende oplossing voor Federatieve Toegangsverlening (FTV) zijn afspraken nodig over beheer en handhaving.
Wat komt er kijken bij het toepassen en beheren van toegangsregels?
{{< /chapter/section >}}

{{< chapter/section title="1. Handhaving" level="3" >}}

Onder handhaving vallen die functies die tijdens het normale gebruik van een applicatie worden uitgevoerd. Dit is het volledig geautomatiseerde proces zoals het bij elk verzoek tot verwerking wordt uitgevoerd. Deze zullen erg snel moeten worden uitgevoerd, omdat ze op het kritieke pad van elk verzoek liggen.

Dit zijn:

- **Beslissingen afdwingen**: het onderscheppen van elk verzoek, en zorgen dat genomen beslissingen ook gegarandeerd nageleefd worden.
- **Beslissingen nemen**: het bepalen of het verzoek gehonoreerd, voorwaardelijk gehonoreerd of afgewezen moet worden. Dit gebeurt op basis van de vrager, de vraag, het onderwerp en de omgeving ([subject, action, resource en context](/ftv/methodiek/standaarden#informatiemodel)) en de beschikbare regels. 
- **Beslissingen loggen**: het vastleggen welke beslissingen zijn genomen. Van belang is om hierbij de juiste hoeveelheid informatie vast te leggen. Enerzijds voldoende om later verantwoording af te leggen en de juistheid van beslissingen te controleren. En anderzijds niet meer dan strikt noodzakelijk, zodat de privacy gerespecteerd blijft.

{{< img-url "diagrams/functies-en-rollen.svg" "Overzicht functies en rollen in EAM" >}}

{{< /chapter/section >}}

{{< chapter/section title="2. Beheer"  level="3" >}}

De beheerfuncties worden gebruikt om het beleid courant te houden en het hele proces van beheer eromheen in goede banen te leiden. Deze functies zijn voor beheerders, zowel technisch en functioneel. Hier ligt de nadruk op overzicht en correctheid, en minder op de snelheid.



#### Beveiliging

Het beheer van de toegangsregels heeft zelf ook goede beveiliging nodig. Hiermee wordt de toegang voor beheerders bepaald, met rollen, rechten en policies. Dit kan hetzelfde systeem zijn als het beveiligt, of een apart systeem.

#### Regels opstellen

Regels moeten gemaakt, aangepast of verwijderd kunnen worden. Dat kan verschillende niveaus van complexiteit zijn: van een uitgebreide editor die is afgestemd op de policytaal tot een eenvoudige oplossing die alleen bestanden aanneemt.

#### Versiebeheer

Regels moeten goed opgeslagen worden. En door niet alleen de laatste versies maar ook de historie van regels op te slaan, is het mogelijk achteraf te zien welke regels wanneer golden. Ook kunnen dan wijzigingen teruggedraaid worden.

#### Testen

Het opstellen van regels in elke taal is complex. Het is bovendien lastig te overzien wat de gevolgen van een kleine wijziging zijn voor de hele set. Daarom is een testfaciliteit nodig. Daarmee kan een regelset worden getest tegen een dataset, zodat zichtbaar wordt welke invloed wijzigingen hebben op beslissingen.

#### Workflow

Goed beheer vraagt om samenwerking. De verschillende taken, zoals het schrijven, testen en goedkeuren van regels, worden vaak door verschillende mensen uitgevoerd, uit veiligheidsoverwegingen. Dat proces wordt door workflow geregeld.

#### Distributie

Vaak beheert een centraal beheerteam de regels, terwijl de uitvoering ervan decentraal en geautomatiseerd plaatsvindt. Een goed distributiemechanisme zorgt ervoor dat elk systeem precies de juiste regels in de juiste versie ontvangt.

#### Monitoring

Goed beheer vraagt om inzicht in hoe de toegang in de praktijk functioneert. Denk aan de beschikbaarheid van runtime-omgevingen en aan statistieken over het aantal aanvragen en beslissingen. Zo kan gemonitord worden of er bijvoorbeeld onverwacht veel aanvragen of afwijzingen zijn. Dat kan wijzen op pogingen tot ongeoorloofde toegang.

#### Verantwoording

Bij een vermoeden van fraude of tijdens een audit moet het systeem inzicht geven in alle relevante informatie over een of meer toegangsbeslissingen. Hierin komen onder andere versiebeheer en logging samen.

{{< /chapter/section >}}

{{< chapter/section title="Authorization Management Platforms" id="amp">}}

Hoe groter de schaal van de uitwisseling, hoe belangrijker het beheer wordt. Waar met een losse applicatie het nog te doen is om beheer in de applicatie zelf te doen, is bij meerdere verbonden systemen centraal beheer nodig. Denk hierbij aan grote bedrijven met een landschap van applicaties, of een vertrouwensnetwerk zoals het Federatief Datastelsel. 

Grote bedrijven hebben deze problematiek al langer, en softwareleveranciers bieden hiervoor complete systemen aan. Authorization Management Platform (AMP) is een relatief nieuwe term voor deze systemen. Onder andere [Gartner](https://www.gartner.com/en/documents/6826834) signaleert de opkomst van AMP's als een belangrijke trend.

{{< /chapter/section >}}
