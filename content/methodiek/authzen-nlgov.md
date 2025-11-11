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

{{< chapter/section title="AuthZEN">}}

De [AuthZEN Authorization API](https://openid.net/wg/authzen/) is een initiatief van de OpenID Foundation, bekend van OpenID Connect. De belangrijkste leveranciers van Policy Decision Points (PDPs) en API gateways werken hier samen aan een autorisatiestandaard.

![Het OpenID logo](/ftv/images/logo-openid.png)

{{< /chapter/section >}}

{{< chapter/section title="Over AuthZEN" level="3">}}

AuthZEN standaardiseert stap voor stap onderdelen van de PxP-architectuur die in de praktijk haalbaar en nuttig zijn.

De eerste stap is de standaardisering van de interface tussen het Policy Enforcement Point (PEP) en het Policy Decision Point (PDP): de vragen die een PEP stelt en de antwoorden die het PDP geeft.

{{< /chapter/section >}}

{{< chapter/section title="Informatiemodel" level="4" id="informatiemodel">}}

Als basis is eerst een informatiemodel uitgewerkt. Dat beschrijft de velden die in een verzoek moeten of kunnen staan, en hun mogelijke waarden. 

![diagram s-a-r-c](../methodiek-sarc.png)

In de PxP-architectuur zijn deze vier velden benoemd:
1. Subject. De aanvrager. Dit kan een persoon of organisatie zijn.
2. Action. De verwerking die gevraagd wordt. Denk hierbij bijvoorbeeld aan inzien, aanpassen, verwijderen of verstrekken.
3. Resource. De gegevens waarop de verwerking uitgevoerd wordt.
4. Context. De situatie/ omgeving waarin het gegevensverzoek gedaan is. Dit kan gaan over de verbinding, de huidige tijd, de locatie van het subject en meer.

In hoofdstuk 5 van de [AuthZEN specificatie](https://openid.net/specs/authorization-api-1_0-03.html#name-information-model) zijn alle details van het informatiemodel te vinden.

{{< /chapter/section >}}

{{< chapter/section title="APIs" level="4">}}

AuthZEN 1.0 definieert een aantal APIs die gebruik maken van het informatiemodel:

- [Access Evaluation](https://openid.net/specs/authorization-api-1_0-03.html#name-access-evaluation-api). Een enkelvoudige vraag om toegang. Dat is een verzoek met Subject, Action en Resource ingevuld en, optioneel, de Context. Het antwoord is in ieder geval een 'ja' of 'nee' en optioneel een onderbouwing van de beslissing.
- [Access Evaluations](https://openid.net/specs/authorization-api-1_0-03.html#name-access-evaluations-api). Hiermee kunnen meerdere aanvragen in een verzoek gedaan worden. Dit kan de afhandeling efficiënter maken. Er is ook de optie om te eisen dat alle verzoeken geldig moeten zijn of dat een genoeg is.
- [Search APIs](https://openid.net/specs/authorization-api-1_0-03.html#name-subject-search-api). Hiermee wordt gezocht naar opties door telkens Subject, Action of Resource weg te laten. Het ontbreken van een Subject bijvoorbeeld geeft aan dat de vrager wil weten welke Subjecten toegestaan zijn. Als de vraag een bestand en de actie 'inzien' meegeeft, dan vertelt de API welke Subjecten het bestand mogen lezen. En als de Action weggelaten wordt, dan is de vraag: 'welke acties mag deze gebruiker op dit bestand uitvoeren?'.

{{< /chapter/section >}}

{{< chapter/section title="Status" level="4">}}

De [AuthZEN standaard versie 1.0](https://openid.net/specs/authorization-api-1_0-01.html) heeft nu de status Implementers Draft. Deze versie bevat een informatiemodel zoals boven beschreven en de drie APIs. Deze versie zal eind 2025 aangeboden worden ter consultatie. 

Diverse commerciële toegangsverleningsproducten en API-gateways implementeren deze versie inmiddels. De [AuthZEN interop](https://authzen-interop.net/) laat zien welke partijen dat zijn, en legt uit welk niveau van commitment elke leverancier toezegt.

{{< /chapter/section >}}

{{< chapter/section title="Profielen" level="3">}}

De AuthZEN standaard beschrijft de basis die op elke uitwisseling van toepassing is. Daarbovenop kunnen er voor meer specifieke situatie aanvullende afspraken vastgelegd worden in een zogenaamd profiel. 

{{< /chapter/section >}}

{{< chapter/section title="AuthZEN NL Gov" id="nlgov" level="4">}}

Voor de Nederlandse overheid ontwikkelt FTV een profiel bovenop AuthZEN: het NLGov Profile for OpenID AuthZEN Authorization API. Dit profiel bevat de aanvullingen die nodig zijn om te voldoen aan de Nederlandse wetgeving, de digitale strategie en regels van het Federatieve Datastelsel (FDS).

De FTV werkgroep heeft versie 1.0 van het profiel goedgekeurd. Deze versie is in beheer genomen door Logius, en is nu in [openbare consultatie](https://github.com/Logius-standaarden/Openbare-Consultaties/tree/master/2025-10-15-Authzen).

<a href="https://logius-standaarden.github.io/Openbare-Consultaties/2025-10-15-Authzen" class="utrecht-button utrecht-button--primary-action">
            Bekijk de consultatieversie van AuthZEN NL GOV
</a>

In de consultatieperiode staat het eenieder vrij om feedback te geven. Deze feedback zal worden verwerkt en nadat de werkgroep en Logius concensus hebben bereikt over de juiste verwerking van de feedback is de versie definitief. Vervolgstappen van de vaststelling zijn opname in de GDI en beoordeling door Forum Standaardisatie. Het hele proces kan tot ver in 2026 duren.

In de tussentijd wordt er doorgewerkt aan verbeteringen in de [werkversie](https://logius-standaarden.github.io/authzen-nlgov/). 

{{< /chapter/section >}}

{{< chapter/section title="API Gateway profiel" level="4">}}

Een PEP kan grofweg op twee logische plekken zitten: in een applicatie/API of in een API Gateway. Als de PEP in een applicatie of API zit, dan is het aan de ontwikkelaars om het informatiemodel te vullen vanuit de code. Zij weten waar de informatie vandaan komt en geven aan welk veld waar moet. 

Een andere optie is om de aanroep te onderscheppen in de API Gateway. Dit kan zijn vanuit een bewuste keus om dat deel ook te externaliseren, maar ook om een bestaande applicatie of API niet aan te hoeven passen. Bijvoorbeeld omdat deze ouder is en er geen ontwikkelteam meer voor is, of dat het een extern systeem is dat niet meer kan worden aangepast. De API-gateway vangt dan het HTTP-verzoek af en vult het informatiemodel met gegevens uit de aanvraag. Ook hier is een standaard op zijn plaats. AuthZEN schrijft hiervoor het [AuthZEN REST API Gateway profiel](https://hackmd.io/@oidf-wg-authzen/apigateway). Dit profiel is nog een voorstel. Het streven is dit aan versie 1.1 toe te voegen.

{{< /chapter/section >}}

{{< chapter/section title="Zijn er alternatieven?" level="3">}}
FTV is niet het enige project dat werkt aan standaardisatie van toegangsverlening. Bekijk een [overzicht van de belangrijkste projecten](/ftv/onderzoek/status_techniek/standaarden/) dat is opgesteld tijdens het vooronderzoek van het project.
{{< /chapter/section >}}

{{< chapter/section title="En OAuth dan?" level="4">}}

[Open Authorization (OAuth)](https://en.wikipedia.org/wiki/OAuth) is een bestaande open standaard voor autorisatie. Waarom dan nog een standaard? Omdat AuthZEN een bredere reikwijdte biedt, bovenop OAuth.

OAuth gaat primair over delegatie: een applicatie toestemming geven om namens een gebruiker toegang tot een andere applicatie te verkrijgen. En dat zonder de credentials zelf te delen. Met OAuth scopes zijn daar ook op beperkte rechten aan te koppelen (bijvoorbeeld toestemming voor het 'lezen van bestanden'). Dat is een vorm van grofmazige autorisatie. 

[AuthZEN gaat verder](https://en.wikipedia.org/wiki/OAuth#OAuth_and_XACML): het ondersteunt fijnmazige autorisatie, op elk moment, op elke plek. OAuth en AuthZEN kunnen elkaar aanvullen: het OAuth token kan gebruikt worden als een van de attributen in AuthZEN policies.


Lees meer in het nieuwsartikel [Het verschil tussen autorisatie in OAuth en EAM](/ftv/actueel/nieuws/20250611oauth-oidc-en-eam/).

{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-groen-25" previouslink="../principes" previoustitle="Principes" nextlink="../logboek-toegangsbeslissingen" nexttitle="Logboek">}}
{{< /chapter/nextprevious >}}

