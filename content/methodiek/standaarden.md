---
Title: De FTV-standaarden
type: 'chapter'
---

{{< chapter/header bg="gray">}}

<div class="utrecht-paragraph pt-1 section-navigation">
   <p>
      <a href="../">De EAM principes</a>
   </p>
</div>
<div class="section-navigation-selected utrecht-paragraph pt-1 section-navigation">
   <p>
      De FTV-standaarden
   </p>
</div>
<div class="utrecht-paragraph pt-1 section-navigation">
   <p>
      <a href="../federatief">Federatief EAM</a>
   </p>
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

![logo-openid.png](/ftv/images/logo-openid.png)

Het eerste gebied dat AuthZEN heeft uitgewerkt is de interface tussen PEP en PDP. Dat zijn de soort vragen die gesteld kunnen worden aan de PDP, en de antwoorden daarop. 

{{< /chapter/section >}}

{{< chapter/section title="Informatiemodel" level="4">}}

Als basis is eerst een informatiemodel uitgewerkt. Dat beschrijft de velden die in een verzoek moeten of kunnen staan, en hun mogelijke waarden. In de PxP-architectuur zijn deze vier onderdelen benoemd:

![diagram s-a-r-c](../methodiek-sarc.png)

1. Subject. De aanvrager. Dit kan een persoon of organisatie zijn.
2. Action. De verwerking die gevraagd wordt. Denk hierbij bijvoorbeeld1 aan inzien, aanpassen, verwijderen of verstrekken.
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

De AuthZEN standaard versie 1.0 is een Implementers Draft voor het standaardiseren van toegangsverzoeken (de interface tussen de PEP en PDP.) Deze zal midden 2025 aangeboden worden ter consultatie. Diverse commerciële toegangsverleningsproducten en API-gateways implementeren deze versie inmiddels.

{{< /chapter/section >}}

{{< chapter/section title="AuthZEN NL Gov" level="4">}}

De Nederlandse standaard is een uitbreiding op AuthZEN en heeft als volledige naam **NLGov Profile for OpenID AuthZEN Authorization API** gekregen; kortweg "AuthZEN NL Gov". Er wordt momenteel door de werkgroep FTV gewerkt aan de gewenste invulling daarvan.

De huidige werkversie is te vinden op "[Standaard voor Federatieve Toegangsverlening](https://ftv-standaard-2f223b.gitlab.io/).".
{{< /chapter/section >}}

{{< chapter/section title="En OAUth dan?" level="4">}}

OAuth gaat primair over delegatie: een applicatie toestemming geven om jouw credentials te gebruiken om toegang tot een andere applicatie te verkrijgen, zonder de credentials zelf te delen. Met scopes zijn daaraan beperkte rechten te koppelen ('lees bestanden'). Dat is een vorm van grofmazige autorisatie. AuthZEN gaat verder: fijnmazige autorisatie, op elk moment, op elke plek. Het OAuth token kan gebruikt worden als een van de attributen in AuthZEN policies.

{{< /chapter/section >}}

{{< chapter/section title="2. Logboek Toegangsverlening" level="3">}}
Het Logboek Toegangsverlening richt zich op het verantwoorden van toegangsverzoeken. Met behulp van de standaard kunnen historische toegangsverzoeken uniform beschikbaar gemaakt worden. Hierbij gaat speciaal aandacht uit naar het voorkomen van ongewenste gegevensduplicatie ([data bij de bron](https://www.digitaleoverheid.nl/data-bij-de-bron/)) met behulp van [betrouwbare bronnen](https://website-digilab-overheid-nl-research-uit-betrouw-e1f39021ce924c.gitlab.io/) en integratie met het [Logboek Dataverwerkingen](https://logius-standaarden.github.io/logboek-dataverwerkingen/) en [FSC - Logging](https://commonground.gitlab.io/standards/fsc/logging/draft-fsc-logging-00.html).
{{< /chapter/section >}}

{{< chapter/section title="3. Register toegangsbeleid" level="3">}}
Het Register Toegangsbeleid gaat definieren welke eisen er aan een PAP gesteld worden. Denk hierbij aan dat de versies van policies over tijd bewaard blijven en de metadata die die een policy moet en mag hebben.
{{< /chapter/section >}}

{{< chapter/section title="Andere standaarden" level="2">}}
FTV is bepaald niet het enige project dat werkt aan standaardisatie van toegang. Vind hier [een overzicht van de belangrijkste](/ftv/onderzoek/status_techniek/standaarden/).
{{< /chapter/section >}}

