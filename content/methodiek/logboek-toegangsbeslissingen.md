---
Title: Authorization Decision Log
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
<div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-groen-25">
   <p>
      Logboek
   </p>
</div> 
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-groen-25">
   <p>
      <a href="../register-toegangsbeleid">Register Toegangsbeleid</a>
   </p>
</div> 
</div>

{{< /chapter/header >}}

{{< chapter/section title="Authorization Decision Log">}}

### Doel

Het Authorization Decision Log (Logboek Toegangsbeslissingen) legt vast welke toegangsbeslissingen zijn genomen. Het maakt die beslissingen traceerbaar en is daarmee een belangrijk verantwoordingsinstrument. Bij audits kan achteraf worden aangetoond welke beslissing wanneer is genomen op basis van welke regels en gegevens. En daarmee vastgesteld kan worden of de beslissing terecht was.

### Een standaard

Er is nog geen open standaard voor het vastleggen van toegangsbeslissingen. Daarom stelt FTV deze zelf op.

De standaard beschrijft hoe een opdracht tot het opslaan van een toegangsbeslissing eruit moet zien. Het logboek gebruikt daarom het AuthZEN-informatiemodel als basis. Belangrijk is welke gegevens er verplicht zijn en welke optioneel. 

De standaard legt niet vast hoe het log daadwerkelijk deze gegevens op moet slaan. Daarvoor zijn er al veel goede oplossingen beschikbaar, ook open source. Ook legt de standaard niet vast hoe opgeslagen beslissingen beveiligd, teruggelezen en opgeruimd worden. Deze zaken zal elke implementatie zelf invullen.

### Dataminimalisatie 

Om goed verantwoording af te kunnen leggen is het nodig dat de verzoeken, regels en gegevens die aan de beslissing ten grondslag hebben gelegen beschikbaar zijn. Tegelijkertijd moeten er niet meer gegevens opgeslagen worden dan strikt noodzakelijk.

Hier geldt het principe van [data bij de bron](https://www.digitaleoverheid.nl/data-bij-de-bron/). In plaats van gegevens te kopiëren, verwijst het logboek naar [betrouwbare bronnen](https://website-digilab-overheid-nl-research-uit-betrouw-e1f39021ce924c.gitlab.io/) waar de gebruikte informatie is vastgelegd. Dit voorkomt onnodige gegevensduplicatie en maakt het logboek transparanter en beter beheersbaar. Een van de belangrijke voorwaarde voor een betrouwbare bron is dat de historische gegevens bewaard blijven.

### Logging in het FDS
Toegangsbeslissingen zijn deel van het grotere proces van gegevensuitwisseling. Om een compleet beeld te hebben van de uitwisseling in het Federatief Datastelsel (FDS) zijn er ook het [Logboek Dataverwerkingen](https://logius-standaarden.github.io/logboek-dataverwerkingen/) en het logboek Federatieve Service Connectiviteit [FSC-Logging](https://commonground.gitlab.io/standards/fsc/logging/draft-fsc-logging-00.html). 

Deze drie zijn met elkaar verbonden door een zogenaamde trace.

### Status
De huidige [versie van de standaard](https://vng-realisatie.github.io/authorization-decision-log/) is aangenomen door de eigen werkgroep. Momenteel worden de voorbereidingen gedaan om de standaard over te dragen naar Logius voor beheer en de openbare consultatie te starten.

<a href="https://vng-realisatie.github.io/authorization-decision-log" class="utrecht-button utrecht-button--primary-action">
            Bekijk de consultatieversie van Authorization Decision Log
</a>

{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-groen-25" previouslink="../authzen-nlgov" previoustitle="AuthZEN" nextlink="../register-toegangsbeleid" nexttitle="Register toegangsbeleid">}}
{{< /chapter/nextprevious >}}
