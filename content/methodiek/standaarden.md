---
Title: Standaarden
type: 'chapter'
---

{{< chapter/section title="Standaarden" >}}
Om toegangsverlening te beheren waar meerdere applicaties, afdelingen en organisaties bij betrokken zijn is standaardisering essentieel.

Federatieve Toegangsverlening ontwikkelt hiervoor waar mogelijk Nederlandse profielen op reeds bestaande (internationale) standaarden.

Voor het verantwoorden van historische beslissingen tussen organisaties binnen het Federatief Datastelsel zal een Nederlandse standaard ontwikkeld worden.
{{< /chapter/section >}}

{{< chapter/section title="NLGov profile for OpenID AuthZEN Authorization API." >}}
De [OpenID AuthZEN Authorization API](https://openid.net/wg/authzen/) is een initiatief van de OpenID foundation waarin meerdere grote leveranciers van External Authorization Management API's rondom toegangsverlening standaardiseren.

De AuthZEN standaard heeft reeds een Implementers Draft voor het standaardiseren van toegangsverzoeken (de interface tussen de PEP en PDP.) Deze zal midden 2025 aangeboden worden ter consultatie. Diverse commerciële toegangsverleningsproducten en API gateways implementeren deze versie inmiddels.

De Nederlandse standaard is een uitbreiding op AuthZEN, en heeft daarom als volledige naam **NLGov Profile for OpenID AuthZEN Authorization API** gekregen; kortweg "AuthZEN NLGov"

De huidige werkversie is te vinden op "[Standaard voor Federatieve Toegangsverlening](https://ftv-standaard-2f223b.gitlab.io/).".
{{< /chapter/section >}}

{{< chapter/section title="Logboek Toegangsverlening" >}}
Het Logboek Toegangsverlening richt zich op het verantwoorden van toegangsverzoeken. Met behulp van de standaard kunnen historische toegangsverzoeken uniform beschikbaar gemaakt worden. Hierbij gaat speciaal aandacht uit naar het voorkomen van ongewenste gegevensduplicatie ([data bij de bron](https://www.digitaleoverheid.nl/data-bij-de-bron/)) met behulp van [betrouwbare bronnen](https://website-digilab-overheid-nl-research-uit-betrouw-e1f39021ce924c.gitlab.io/) en integratie met het [Logboek Dataverwerkingen](https://logius-standaarden.github.io/logboek-dataverwerkingen/) en [FSC - Logging](https://commonground.gitlab.io/standards/fsc/logging/draft-fsc-logging-00.html).
{{< /chapter/section >}}


{{< chapter/section title="Toekomstige standaarden" >}}
Binnen de OpenID AuthZEN werkgroep worden nog een aantal toekomstige standaarden voorzien. Wanneer deze beschikbaar komen zullen deze ook opgenomen worden in de standaarden.
Momenteel zijn de volgende koppelvlakken en extensies reeds gepland:
- de interface voor het Policy Administration Point waarin toegangsbeleid beschikbaar gemaakt zal worden.
- [REST API Gateway profiel](https://hackmd.io/@oidf-wg-authzen/apigateway) op de AuthZEN Authorization API

Binnen de werkgroepen kunnen ook additionele extensies gedefinieerd worden en aangedragen aan de AuthZEN werkgroep. Mogelijke kandidaten hiervoor zijn:
- SPARQL endpoints (zie [Lock/Unlock](https://kadaster-labs.github.io/lock-unlock-docs/).)
{{< /chapter/section >}}