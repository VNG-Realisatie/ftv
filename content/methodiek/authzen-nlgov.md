---
Title: AuthZEN
type: 'chapter'
---

{{< chapter/header title="Methodiek" bg="green">}}

<div class="sub-navigation-wrapper" role="navigation">
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-groen-25">
   <p>
      <a href="../principes">De principes</a> 
   </p>
</div>
<div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      AuthZEN
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-groen-25">
   <p>
      <a href="../logboek-toegangsbeslissingen">Logboek</a>
   </p>
</div> 
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-groen-25">
   <p>
      <a href="../register-toegangsbeleid">Register toegangsbeleid</a>
   </p>
</div> 
</div>

{{< /chapter/header >}}

{{< chapter/directnaar bg="bg-rhc-color-geel-neon">}}
<a href="https://logius-standaarden.github.io/Openbare-Consultaties/2025-10-15-Authzen/">
    <div class="mt-2">
        <h3 style="text-decoration:underline" class="nl-heading nl-heading--level-3 rhc-heading">NLGov AuthZEN</h3>
    </div>
    <div class="mt-2">
        <p class="utrecht-paragraph-small">Standaard voor Federatieve Toegangsverlening</p>
        <p class="utrecht-paragraph-small">Logius Standaard</p>
        <p class="utrecht-paragraph-small">Consultatieversie 15 oktober 2025</p>
    </div>
</a>

{{< /chapter/directnaar >}}

{{< chapter/section title="AuthZEN">}}

### Doel

AuthZEN standaardiseert de communicatie tussen applicaties en autorisatiediensten. Concreet gaat het om de interface tussen het Policy Enforcement Point (PEP) en het Policy Decision Point (PDP): de vragen die een PEP stelt en de antwoorden die het PDP geeft. Door deze interface te standaardiseren worden applicaties en autorisatiediensten uitwisselbaar, ook als ze van verschillende leveranciers komen.

De [AuthZEN Authorization API](https://openid.net/wg/authzen/) is een initiatief van de OpenID Foundation, bekend van OpenID Connect. De belangrijkste leveranciers van Policy Decision Points (PDPs) en API gateways werken hier samen aan deze autorisatiestandaard.

### Informatiemodel

AuthZEN definieert een informatiemodel dat beschrijft welke velden in een toegangsverzoek moeten of kunnen staan.

![diagram s-a-r-c](../methodiek-sarc.png)

De vier velden zijn:
1. **Subject**. De aanvrager. Dit kan een persoon of organisatie zijn.
2. **Action**. De verwerking die gevraagd wordt. Denk hierbij aan inzien, aanpassen, verwijderen of verstrekken.
3. **Resource**. De gegevens waarop de verwerking uitgevoerd wordt.
4. **Context**. De situatie waarin het verzoek gedaan is. Dit kan gaan over de verbinding, de huidige tijd, de locatie van het subject en meer.

Het antwoord op een verzoek is in ieder geval een ‘ja’ of ‘nee’ en optioneel een onderbouwing van de beslissing.

### APIs

AuthZEN 1.0 definieert drie APIs:

- **[Access Evaluation](https://openid.net/specs/authorization-api-1_0.html#name-access-evaluation-api)**. Een enkelvoudige vraag om toegang met Subject, Action, Resource en optioneel Context ingevuld.
- **[Access Evaluations](https://openid.net/specs/authorization-api-1_0.html#name-access-evaluations-api)**. Meerdere aanvragen in een verzoek, voor een efficiëntere afhandeling.
- **[Search APIs](https://openid.net/specs/authorization-api-1_0.html#name-subject-search-api)**. Zoeken naar opties door Subject, Action of Resource weg te laten. Bijvoorbeeld: welke gebruikers mogen dit bestand lezen? Of: welke acties mag deze gebruiker op dit bestand uitvoeren?

### Status van AuthZEN

De [AuthZEN standaard versie 1.0](https://openid.net/specs/authorization-api-1_0.html) heeft de status Final. Diverse commerciële toegangsverleningsproducten en API-gateways implementeren deze versie. De [AuthZEN interop](https://authzen-interop.net/) laat zien welke partijen dat zijn. AuthZEN is ook [ingebouwd in OpenFSC](/ftv/actueel/nieuws/20250408authzeninopenfsc/), de gateway van het Federatief Datastelsel.

Door de OpenID werkgroep wordt doorgewerkt aan de volgende versies; de notulen daarvan zijn [openbaar](https://hackmd.io/@oidf-wg-authzen).

{{< /chapter/section >}}

{{< chapter/section title="NLGov AuthZEN" id="nlgov">}}

### Een Nederlands profiel

De AuthZEN standaard beschrijft de basis die op elke uitwisseling van toepassing is. Daarbovenop kunnen voor specifieke situaties aanvullende afspraken vastgelegd worden in een profiel. Voor de Nederlandse overheid ontwikkelt FTV zo’n profiel: het **NLGov Profile for OpenID AuthZEN Authorization API**.

Dit profiel bevat de aanvullingen die nodig zijn om te voldoen aan de Nederlandse wetgeving, de digitale strategie en de regels van het Federatieve Datastelsel (FDS). Het profiel voegt onder meer toe:
- Verwijzingen naar **verwerkingsactiviteiten** voor AVG-compliance, in lijn met de aanpak van [Logboek Dataverwerkingen](https://logius-standaarden.github.io/logboek-dataverwerkingen/)
- Verwijzingen naar het **Algoritmeregister** voor algoritmische transparantie
- Aanbevelingen voor **semantische identificatie** van subjects, resources en actions via het Meta-Informatiemodel (MIM) en JSON-LD

### Aanpak

Het profiel is ontwikkeld door de [werkgroep Federatieve Toegangsverlening](/ftv/meedoen/werkgroep/) in samenwerking met Logius, die de standaard in beheer heeft genomen. De werkgroep heeft de internationale AuthZEN-specificatie doorlopen en per onderdeel beoordeeld waar aanvullingen nodig zijn voor de Nederlandse context. Daarbij is de vorm afgestemd op de bestaande NLGov-profielen op OAuth en OpenID Connect die Logius beheert.

### Status

Versie 1.0 van het NLGov AuthZEN-profiel is goedgekeurd door de werkgroep en heeft de [openbare consultatie](https://github.com/Logius-standaarden/Openbare-Consultaties/tree/master/2025-10-15-Authzen) bij Logius doorlopen.

<br/><br>

<a href="https://logius-standaarden.github.io/Openbare-Consultaties/2025-10-15-Authzen" class="utrecht-button utrecht-button--primary-action">
      Bekijk de consultatieversie van NLGov AuthZEN
</a>

<br/><br>

Het profiel is in maart 2026 aangemeld bij [Forum Standaardisatie](https://www.forumstandaardisatie.nl/). Het proces van beoordeling zal enkele maanden in beslag nemen. In de tussentijd wordt doorgewerkt aan verbeteringen in de [werkversie](https://logius-standaarden.github.io/authzen-nlgov/).

Het profiel is ook opgenomen in het [Common Ground Technische Specificaties-register](https://commonground.nl/page/view/09342b57-f764-4e41-9d8e-16d8e780bac4/groundrules) en er is een verwijzing opgenomen in de Access Control Module van Geonovum.

{{< /chapter/section >}}

{{< chapter/section title="En OAuth dan?">}}

[Open Authorization (OAuth)](https://en.wikipedia.org/wiki/OAuth) is een bestaande open standaard voor autorisatie. Waarom dan nog een standaard? Omdat AuthZEN een bredere reikwijdte biedt, bovenop OAuth.

OAuth gaat primair over delegatie: een applicatie toestemming geven om namens een gebruiker toegang tot een andere applicatie te verkrijgen, zonder credentials te delen. Met OAuth scopes zijn daar beperkte rechten aan te koppelen. Dat is een vorm van grofmazige autorisatie.

[AuthZEN gaat verder](https://en.wikipedia.org/wiki/OAuth#OAuth_and_XACML): het ondersteunt fijnmazige autorisatie, op elk moment, op elke plek. OAuth en AuthZEN vullen elkaar aan: het OAuth token kan gebruikt worden als een van de attributen in AuthZEN policies. Lees meer in het nieuwsartikel [Het verschil tussen autorisatie in OAuth en EAM](/ftv/actueel/nieuws/20250611oauth-oidc-en-eam/).

{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-groen-25" previouslink="../principes" previoustitle="Principes" nextlink="../logboek-toegangsbeslissingen" nexttitle="Logboek">}}
{{< /chapter/nextprevious >}}

