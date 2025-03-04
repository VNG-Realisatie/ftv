---
Title: Standaard
weight: 20
---

# Standaard

De standaard beschrijft hoe een PBAC-oplossing moet werken. Dit is beschreven vanuit de perspectieven 
van architectuur, functioneel en technische invulling met informatiemodel en API's.
De standaard is in detail beschreven op een aparte site: [Standaard voor Federatieve Toegangsverlening](https://ftv-standaard-2f223b.gitlab.io/).

## AuthZEN

Er is voor gekozen om de Nederlandse standaard te baseren op de [AuthZEN Authorization API](https://openid.net/wg/authzen/) 
van de OpenID foundation.
Deze standaard beschrijft de wijze waarop een toegangsverleningsmodule interactie heeft met de aanroepende
en ondersteunende modules.

Het eerste endpoint, [de Acces Evaluation API](https://openid.net/specs/authorization-api-1_0-01.html#name-access-evaluation-api), beschrijft hoe een toegangsbeslissing gevraagd moet worden,
en hoe het antwoord eruit moet zien. Dit is de interactie tussen de PEP en de PDP. Andere endpoints zijn in ontwikkeling.

AuthZEN 1.0 versie 01 heeft de 'Implementer's draft' status. De eerst commerciële toegangsverleningsproducten en gateways
implementeren deze versie inmiddels.

## AuthZEN NL Gov

De Nederlandse standaard is een uitbreiding op AuthZEN, en heeft daarom als volledige naam 
**NLGov Assurance Profile for OpenID AuthZEN Authorization API** gekregen
kortweg "AuthZEN NL Gov"
