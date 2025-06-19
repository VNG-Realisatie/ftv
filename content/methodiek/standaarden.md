---
Title: De FTV-standaarden
type: 'chapter'
---

{{< chapter/header title="Methodiek" bg="green">}}

<div class="sub-navigation-wrapper" role="navigation">
<div class="utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../principes">De principes van EAM</a> 
   </p>
</div>
<div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      De FTV-standaarden
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../federatief">Federatief EAM</a>
   </p>
</div> 
</div>

{{< /chapter/header >}}

{{< chapter/section title="De FTV-standaarden" >}}
Standaardisatie is bij uitstek het middel om aansluiting en uitwisseling tussen systemen te vergemakkelijken. [Open standaarden](https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/open-standaarden/) hebben daarbij de sterke voorkeur, alsmede het voortbouwen op bestaande internationale standaarden.

Het project FTV werkt aan drie standaarden:

1. AuthZEN
2. Logboek toegangsbeslissingen
3. Register toegangsbeleid

![Schema van de drie FTV-standaarden](../methodiek-3-standaarden.png)

{{< /chapter/section >}}

{{< chapter/section title="1. AuthZEN" level="3">}}

De [AuthZEN Authorization API](https://openid.net/wg/authzen/) is een initiatief van de OpenID foundation, bekend van OpenID Connect. De belangrijkste  leveranciers van PDP's en API gateways werken hier samen aan een autorisatiestandaard.

![Het OpenID logo](/ftv/images/logo-openid.png)

Het eerste gebied dat AuthZEN heeft uitgewerkt is de interface tussen PEP en PDP. Dat zijn de soort vragen die gesteld kunnen worden aan de PDP, en de antwoorden daarop. 

{{< /chapter/section >}}

{{< chapter/section title="Informatiemodel" level="4">}}

Als basis is eerst een informatiemodel uitgewerkt. Dat beschrijft de velden die in een verzoek moeten of kunnen staan, en hun mogelijke waarden. In de PxP-architectuur zijn deze vier onderdelen benoemd:

![diagram s-a-r-c](../methodiek-sarc.png)

1. Subject. De aanvrager. Dit kan een persoon of organisatie zijn.
2. Action. De verwerking die gevraagd wordt. Denk hierbij bijvoorbeeld aan inzien, aanpassen, verwijderen of verstrekken.
3. Resource. De gegevens verwerking op uitgevoerd moet worden.
4. Context. De situatie / omgeving waarin het gegevensverzoek gedaan is. Dit kan gaan over de verbinding, de huidige tijd, de locatie van het subject en meer.

In [hoofdstuk 5 van de AuthZEN specificatie](https://openid.net/specs/authorization-api-1_0-03.html#name-information-model) zijn alle details te vinden.

{{< /chapter/section >}}

{{< chapter/section title="APIs" level="4">}}

AuthZEN 1.0 definieert de volgende APIs:

- [Access Evaluation](https://openid.net/specs/authorization-api-1_0-03.html#name-access-evaluation-api). Een enkelvoudige vraag om toegang. Dat is een verzoek met Subject, Action en Resource ingevuld, en optioneel de Context. Het antwoord is in ieder geval een 'ja' of 'nee', en optioneel een onderbouwing van de beslissing.
- [Access Evaluations](https://openid.net/specs/authorization-api-1_0-03.html#name-access-evaluations-api). Hiermee kunnen meerdere aanvragen in een verzoek gedaan worden. Dit kan de afhandeling efficienter maken. Er is ook de optie om eisen dat alle verzoeken geldig moeten zijn of dat een genoeg is.
- [Search APIs](https://openid.net/specs/authorization-api-1_0-03.html#name-subject-search-api). Hiermee wordt gezocht naar opties door telkens Subject, Action of Resource weg te laten. Het ontbreken van een Subject bijvoorbeeld geeft aan dat de vrager wil weten welke Subjecten toegestaan zijn. Als de vragen een bestand en de actie 'inzien' meegeeft, dan vertelt de API welke Subjecten het bestand mogen lezen. En als de Action weggelaten wordt dan is de vraag: 'welke acties mag deze gebruiker op dit bestand uitvoeren?'.

{{< /chapter/section >}}

{{< chapter/section title="Status" level="4">}}

De [AuthZEN standaard versie 1.0](https://openid.net/specs/authorization-api-1_0-01.html) heeft nu de status Implementers Draft. Daarin zit een informatiemodel zoals boven beschreven en de 3 APIs. Deze versie zal midden 2025 aangeboden worden ter consultatie. 

Diverse commerciële toegangsverleningsproducten en API-gateways implementeren deze versie inmiddels. De [AuthZEN interop](https://authzen-interop.net/) laat zien welke partijen dat zijn, en legt uit wat dat precies inhoudt.

{{< /chapter/section >}}

{{< chapter/section title="AuthZEN NL Gov" level="4">}}

De Nederlandse standaard is een uitbreiding op AuthZEN en heeft als volledige naam **NLGov Profile for OpenID AuthZEN Authorization API** gekregen; kortweg "AuthZEN NL Gov". Er wordt momenteel door de werkgroep FTV gewerkt aan de gewenste invulling daarvan.

De huidige werkversie is te vinden op "[Standaard voor Federatieve Toegangsverlening](https://ftv-standaard-2f223b.gitlab.io/).".
{{< /chapter/section >}}

{{< chapter/section title="En OAuth dan?" level="4">}}

[Open Authorisation (OAuth)](https://en.wikipedia.org/wiki/OAuth) is een bestaande open standaard voor autorisatie. Waarom nu dan nog een standaard? Het antwoord is dat AuthZEN een stuk reikwijdte toevoegt, bovenop OAuth.

OAuth gaat primair over delegatie: een applicatie toestemming geven om namens een gebruiker toegang tot een andere applicatie te verkrijgen. En dat zonder de credentials zelf te delen. Met OAuth scopes zijn daar ook op beperkte rechten aan te koppelen (bijvoorbeeld toestemming voor het 'lezen van bestanden'). Dat is een vorm van grofmazige autorisatie. 

[AuthZEN gaat verder](https://en.wikipedia.org/wiki/OAuth#OAuth_and_XACML): fijnmazige autorisatie, op elk moment, op elke plek. OAuth en AuthZEN kunnen elkaar aanvullen: het OAuth token kan gebruikt worden als een van de attributen in AuthZEN policies.

In [dit artikel](/ftv/actueel/nieuws/20250611oauth-oidc-en-eam/) lees je meer over OAuth en AuthZEN.

{{< /chapter/section >}}


{{< chapter/section title="Zijn er alternatieven?" level="4">}}
FTV is niet het enige project dat werkt aan standaardisatie van toegang. Vind hier [een overzicht van de belangrijkste projecten](/ftv/onderzoek/status_techniek/standaarden/).
{{< /chapter/section >}}

{{< chapter/section title="2. Logboek Toegangsverlening" level="3">}}
Het Logboek Toegangsverlening richt zich op het verantwoorden van toegangsverzoeken. Met behulp van de standaard kunnen historische toegangsverzoeken uniform beschikbaar gemaakt worden. Hierbij gaat speciaal aandacht uit naar het voorkomen van ongewenste gegevensduplicatie ([data bij de bron](https://www.digitaleoverheid.nl/data-bij-de-bron/)) met behulp van [betrouwbare bronnen](https://website-digilab-overheid-nl-research-uit-betrouw-e1f39021ce924c.gitlab.io/) en integratie met het [Logboek Dataverwerkingen](https://logius-standaarden.github.io/logboek-dataverwerkingen/) en [FSC - Logging](https://commonground.gitlab.io/standards/fsc/logging/draft-fsc-logging-00.html).
{{< /chapter/section >}}

{{< chapter/section title="3. Register toegangsbeleid" level="3">}}
Het Register Toegangsbeleid gaat definiëren welke eisen er aan een PAP gesteld worden. Denk hierbij aan dat de versies van policies over tijd bewaard blijven en de metadata die die een policy moet en mag hebben.
{{< /chapter/section >}}


