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

{{< chapter/directnaar bg="bg-rhc-color-geel-neon">}}
<a href="https://logius-standaarden.github.io/authorization-decision-log/" target="_blank">
    <div class="mt-2">
        <h3 style="text-decoration:underline" class="nl-heading nl-heading--level-3 rhc-heading">Authorization decision log</h3>
    </div>
    <div class="mt-2">
        <p class="utrecht-paragraph-small">Standaard voor Federatieve Toegangsverlening</p>
        <p class="utrecht-paragraph-small">Logius Standaard</p>
        <p class="utrecht-paragraph-small">Draft 20 april 2025</p>
    </div>
</a>

{{< /chapter/directnaar >}}

{{< chapter/section title="Authorization Decision Log">}}

### Doel

Het Authorization Decision Log (Logboek Toegangsbeslissingen) legt vast welke toegangsbeslissingen zijn genomen. Het maakt die beslissingen traceerbaar en is daarmee een belangrijk verantwoordingsinstrument. Bij audits kan achteraf worden aangetoond welke beslissing wanneer is genomen, op basis van welke regels en gegevens. En daarmee vastgesteld kan worden of de beslissing terecht was.

Waar [AuthZEN](../authzen-nlgov) invulling geeft aan verantwoor*de* toegangsverlening, geeft het Authorization Decision Log invulling aan verantwoord*ing* van toegangsverlening. Het log werkt daarbij aan beide kanten van een federatief verzoek: de afnemer logt de beslissing om een verzoek te versturen en de aanbieder logt de beslissing om het verzoek toe te staan.

### Een standaard

Er is nog geen open standaard voor het vastleggen van toegangsbeslissingen. Daarom stelt FTV deze zelf op.

De standaard beschrijft wat er gelogd wordt bij een toegangsbeslissing, niet hoe het log die gegevens op moet slaan. Het [AuthZEN-informatiemodel](../authzen-nlgov#informatiemodel) vormt de basis: elk logrecord bevat het oorspronkelijke verzoek en het antwoord in AuthZEN-formaat. De standaard beschrijft welke gegevens verplicht zijn en welke optioneel.

### Vier niveaus van detail

De standaard definieert vier niveaus van vastlegging, van minimaal tot volledig:

1. **Niveau 1**: Alleen het verzoek en de beslissing
2. **Niveau 2**: Aangevuld met de versies van het gebruikte toegangsbeleid
3. **Niveau 3**: Aangevuld met verwijzingen naar gebruikte informatiebronnen (PIPs)
4. **Niveau 4**: Aangevuld met de configuratie van het beslissingsmechanisme (PDP)

Hogere niveaus maken het beter mogelijk om beslissingen achteraf te reproduceren, maar vragen meer opslag en zorgvuldigere afweging rond dataminimalisatie. Organisaties kiezen zelf welk niveau past bij hun verantwoordingsbehoeften.

### Dataminimalisatie

Om verantwoording af te leggen moeten de verzoeken, regels en gegevens die aan een beslissing ten grondslag lagen beschikbaar zijn. Tegelijkertijd moeten er niet meer gegevens opgeslagen worden dan strikt noodzakelijk.

Hier geldt het principe van [data bij de bron](https://www.digitaleoverheid.nl/data-bij-de-bron/). In plaats van gegevens te kopiëren verwijst het logboek naar [betrouwbare bronnen](https://website-digilab-overheid-nl-research-uit-betrouw-e1f39021ce924c.gitlab.io/) waar de gebruikte informatie is vastgelegd. De standaard biedt hiervoor drie verwijsmechanismen:
- **Versioned sources**: verwijzingen naar specifieke versies (bijvoorbeeld een git-hash of versie-ID van een policy)
- **Temporal sources**: verwijzingen naar gegevens die golden op het moment van de beslissing, zodat die later teruggehaald kunnen worden zonder de gegevens zelf op te slaan
- **Logged sources**: verwijzingen via W3C Trace Context naar externe logs, bijvoorbeeld in WARC-formaat

### Logging in het FDS

Toegangsbeslissingen zijn deel van het grotere proces van gegevensuitwisseling. Om een compleet beeld te hebben van de uitwisseling in het Federatief Datastelsel (FDS) zijn er ook het [Logboek Dataverwerkingen](https://logius-standaarden.github.io/logboek-dataverwerkingen/) en het logboek Federatieve Service Connectiviteit [FSC-Logging](https://commonground.gitlab.io/standards/fsc/logging/draft-fsc-logging-00.html).

Deze drie logboeken zijn met elkaar verbonden door een zogenaamde trace: een gedeelde identifier ([W3C Trace Context](https://www.w3.org/TR/trace-context/)) die het mogelijk maakt om alle logregels die bij dezelfde uitwisseling horen aan elkaar te koppelen.

### Status
De huidige [versie van de standaard](https://logius-standaarden.github.io/authorization-decision-log/) is aangenomen door de eigen werkgroep, en voor beheer overgedragen aan Logius. Momenteel loopt de openbare consultatieperiode tot 29 mei 2026.

<br>

<a href="https://logius-standaarden.github.io/authorization-decision-log/" class="utrecht-button utrecht-button--primary-action" target="_blank">
            Bekijk de consultatieversie van Authorization Decision Log
</a>

{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-groen-25" previouslink="../authzen-nlgov" previoustitle="AuthZEN" nextlink="../register-toegangsbeleid" nexttitle="Register toegangsbeleid">}}
{{< /chapter/nextprevious >}}
