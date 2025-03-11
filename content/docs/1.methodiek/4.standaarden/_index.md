---
Title: Standaarden
weight: 40
---


# Standaarden

FTV richt zich op standaarden om verantwoorde toegangsverlening mogelijk te maken. Naar dit nodig blijkt kunnen meerdere standaarden hiervoor gedefinieerd worden. Momenteel zijn reeds twee standaarden geidentificeerd die hiervoor ontwikkeld zullen worden

## NLGov profile for OpenID AuthZEN Authorization API.

De eerste standaard richt zich op het standaardiseren van toegangsverzoeken. Hiervoor is gekozen om een NLGov profiel te definieren voor de [OpenID AuthZEN Authorization API](https://openid.net/wg/authzen/). Dit is een initiatief van de OpenID foundation waarin meerdere grote leveranciers van External Authorization Management API's rondom toegangsverlening standaardiseren. 

De AuthZEN standaard heeft reeds een Implementers Draft voor het standaardiseren van toegangsverzoeken (de interface tussen de PEP en PDP) en zal midden 2025 aangeboden worden ter consultatie. Diverse commerciële toegangsverleningsproducten en API gateways implementeren deze versie inmiddels.

De Nederlandse standaard is een uitbreiding op AuthZEN, en heeft daarom als volledige naam **NLGov Profile for OpenID AuthZEN Authorization API** gekregen; kortweg "AuthZEN NLGov"

Er is reeds gewerkt aan een document genaamd "[Standaard voor Federatieve Toegangsverlening](https://ftv-standaard-2f223b.gitlab.io/)." Dit geeft momenteel het beste de voortgang van de standaardisering weer; echter zal deze nog verdeeld moeten worden over functionele aspecten van de gewenste architectuur, het NLGov profiel voor AuthZEN en de FTV Logging Standaard.

## Toegangslogging

De tweede standaard richt zich op het verantwoorden van toegangsverzoeken. Deze standaard maakt het mogelijk om historische toegangsverzoeken beschikbaar te maken. Hierbij gaat speciaal aandacht uit naar het voorkomen van ongewenste gegevensduplicatie ([data bij de bron](https://www.digitaleoverheid.nl/data-bij-de-bron/)) met behulp van [betrouwbare bronnen](https://website-digilab-overheid-nl-research-uit-betrouw-e1f39021ce924c.gitlab.io/).

## Toekomstige standaarden

Er worden nog een aantal toekomstige standaarden voorzien zoals
- de interface voor het Policy Administration Point waarin toegangsbeleid beschikbaar gemaakt zal worden.
- diverse extensies op de AuthZEN Authorization API zoals [API gateways](https://hackmd.io/@oidf-wg-authzen/apigateway) en SPARQL endpoints (zie [Lock/Unlock](https://kadaster-labs.github.io/lock-unlock-docs/).)