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

De [AuthZEN Authorization API](https://openid.net/wg/authzen/) is een initiatief van de OpenID foundation, bekend van OpenID Connect. De belangrijkste leveranciers van PDP's en API gateways werken hier samen aan een autorisatiestandaard.

![Het OpenID logo](/ftv/images/logo-openid.png)

AuthZEN gaat uit van de PxP architectuur, en bekijkt stap voor stap welke gebieden zinvol en haalbaar gestandaardiseerd kunnen worden. 

Het eerste gebied dat AuthZEN heeft uitgewerkt is de interface tussen PEP en PDP. Dat zijn de soort vragen die gesteld kunnen worden aan de PDP, en de antwoorden daarop. 

{{< /chapter/header >}}

{{< chapter/section title="Informatiemodel" level="3" id="informatiemodel">}}

Als basis is eerst een informatiemodel uitgewerkt. Dat beschrijft de velden die in een verzoek moeten of kunnen staan, en hun mogelijke waarden. In de PxP-architectuur zijn deze vier onderdelen benoemd:

![diagram s-a-r-c](../methodiek-sarc.png)

1. Subject. De aanvrager. Dit kan een persoon of organisatie zijn.
2. Action. De verwerking die gevraagd wordt. Denk hierbij bijvoorbeeld aan inzien, aanpassen, verwijderen of verstrekken.
3. Resource. De gegevens verwerking op uitgevoerd moet worden.
4. Context. De situatie / omgeving waarin het gegevensverzoek gedaan is. Dit kan gaan over de verbinding, de huidige tijd, de locatie van het subject en meer.

In [hoofdstuk 5 van de AuthZEN specificatie](https://openid.net/specs/authorization-api-1_0-03.html#name-information-model) zijn alle details van het informatiemodel te vinden.

{{< /chapter/section >}}

{{< chapter/section title="APIs" level="3">}}

AuthZEN 1.0 definieert vervolgens aan aantal APIs die gebruik maken van het informatiemodel:

- [Access Evaluation](https://openid.net/specs/authorization-api-1_0-03.html#name-access-evaluation-api). Een enkelvoudige vraag om toegang. Dat is een verzoek met Subject, Action en Resource ingevuld, en optioneel de Context. Het antwoord is in ieder geval een 'ja' of 'nee', en optioneel een onderbouwing van de beslissing.
- [Access Evaluations](https://openid.net/specs/authorization-api-1_0-03.html#name-access-evaluations-api). Hiermee kunnen meerdere aanvragen in een verzoek gedaan worden. Dit kan de afhandeling efficienter maken. Er is ook de optie om eisen dat alle verzoeken geldig moeten zijn of dat een genoeg is.
- [Search APIs](https://openid.net/specs/authorization-api-1_0-03.html#name-subject-search-api). Hiermee wordt gezocht naar opties door telkens Subject, Action of Resource weg te laten. Het ontbreken van een Subject bijvoorbeeld geeft aan dat de vrager wil weten welke Subjecten toegestaan zijn. Als de vragen een bestand en de actie 'inzien' meegeeft, dan vertelt de API welke Subjecten het bestand mogen lezen. En als de Action weggelaten wordt dan is de vraag: 'welke acties mag deze gebruiker op dit bestand uitvoeren?'.

{{< /chapter/section >}}

{{< chapter/section title="Status" level="3">}}

De [AuthZEN standaard versie 1.0](https://openid.net/specs/authorization-api-1_0-01.html) heeft nu de status Implementers Draft. Daarin zit een informatiemodel zoals boven beschreven en de 3 APIs. Deze versie zal midden 2025 aangeboden worden ter consultatie. 

Diverse commerciële toegangsverleningsproducten en API-gateways implementeren deze versie inmiddels. De [AuthZEN interop](https://authzen-interop.net/) laat zien welke partijen dat zijn, en legt uit welk niveau van commitment elke leverancier toezegt.

{{< /chapter/section >}}

{{< chapter/section title="AuthZEN NL Gov" level="3">}}

Voor de Nederlandse overheid wordt een profiel bovenop AuthZEN ontwikkeld. Deze heeft als volledige naam NLGov Profile for OpenID AuthZEN Authorization API. Hierin worden de noodzakelijke toevoegingen opgenomen die de Nederlandse wet, de digitale strategie en de regels van het FDS van toegang vragen.

De FTV werkgroep heeft [een release kandidaat van het profiel](https://vng-realisatie.github.io/authzen-nlgov/) gepubliceerd. Deze wordt nu door de eigen werkgroep beoordeeld.

Na acceptatie door de werkgroep zal deze aangeboden worden bij Logius voor beheer, en voor opname in de GDI domeinarchitectuur Gegevensuitwisseling.

{{< /chapter/section >}}

{{< chapter/section title="En OAuth dan?" level="3">}}

[Open Authorisation (OAuth)](https://en.wikipedia.org/wiki/OAuth) is een bestaande open standaard voor autorisatie. Waarom nu dan nog een standaard? Het antwoord is dat AuthZEN een stuk reikwijdte toevoegt, bovenop OAuth.

OAuth gaat primair over delegatie: een applicatie toestemming geven om namens een gebruiker toegang tot een andere applicatie te verkrijgen. En dat zonder de credentials zelf te delen. Met OAuth scopes zijn daar ook op beperkte rechten aan te koppelen (bijvoorbeeld toestemming voor het 'lezen van bestanden'). Dat is een vorm van grofmazige autorisatie. 

[AuthZEN gaat verder](https://en.wikipedia.org/wiki/OAuth#OAuth_and_XACML): fijnmazige autorisatie, op elk moment, op elke plek. OAuth en AuthZEN kunnen elkaar aanvullen: het OAuth token kan gebruikt worden als een van de attributen in AuthZEN policies.

In [dit artikel](/ftv/actueel/nieuws/20250611oauth-oidc-en-eam/) lees je meer over OAuth en AuthZEN.

{{< /chapter/section >}}

{{< chapter/section title="Zijn er alternatieven?" level="4">}}
FTV is niet het enige project dat werkt aan standaardisatie van toegang. Vind hier [een overzicht van de belangrijkste projecten](/ftv/onderzoek/status_techniek/standaarden/). Dit overzicht is gemaakt in het kader van het vooronderzoek van het project.
{{< /chapter/section >}}


