---
Title: Referentie-implementatie
bookCollapseSection: true
weight: 30
---

# Referentie-implementatie

FTV is een toepassing van Externalized Authorization Management (EAM),
een methode om toegangsregels buiten applicaties te beheren.
Om te laten zien hoe dat werkt, is een technische voorbeeldoplossing beschikbaar: de referentie-implementatie.
Deze is open source, gebaseerd op internationale standaarden en bedoeld voor iedereen die FTV wil toepassen,
testen of verder ontwikkelen.

## Over de referentie-implementatie

### EAM in de praktijk
De referentie-implementatie maakt inzichtelijk hoe EAM werkt in de praktijk:
de toegangsbeslissing vindt plaats buiten de applicatie, op basis van extern beheerde regels.
FTV is in deze referentie-implementatie uitgewerkt als concreet voorbeeld en technisch getest op werking en betrouwbaarheid.

### Open source
De referentie-implementatie is open source en gratis bruikbaar.

## Aan de slag met de referentie-implementatie

### Code
De code is geschreven in Golang en vrij beschikbaar via GitLab.

### Internationale standaarden
- EAM is gebaseerd op Attribute Based Access Control (ABAC) en bouwt voort op moderne modellen
  zoals Policy Based Access Control (PBAC) en Relation Based Access Control (ReBAC).
- Het ABAC-model, zoals beschreven door [NIST](https://csrc.nist.gov/pubs/sp/800/162/upd2/final), verdeelt toegangsbeslissingen over vier componenten:
  PEP (Policy Enforcement Point), PDP (Decision Point), PAP (Administration Point) en PIP (Information Point).
  De communicatie tussen deze onderdelen volgt de AuthZEN-standaard.

### Modulair en flexibel
- De GitLab-repository is opgezet als een mono-repo met losse modules die afzonderlijk of in combinatie te gebruiken zijn.
- Elke module is grotendeels configureerbaar en zo flexibel mogelijk ingericht.
- Voor de opslag van policies en attributen kan het DevOps-team kiezen uit verschillende key/value-stores of bijvoorbeeld een relationele database zoals Postgres.
- Ook de policy-taal is flexibel: op dit moment ondersteunt de referentie-implementatie
  [Rego (OPA)](https://www.openpolicyagent.org/docs/latest/policy-language/),
  [Cedar (Amazon-AWS)](https://www.cedarpolicy.com/en), 
  [Cerbos (Google)](https://docs.cerbos.dev/cerbos/latest/policies/)
  en [OpenFGA](https://openfga.dev/docs/fga).

### OpenAPI-specificaties
- Voor alle API endpoints binnen de OpenFTV modules is een OAS v3 specificatie beschikbaar,
  tenzij dit vanuit een ander project vastgesteld is.
- Alle specificaties voldoen aan de REST API Design Rules van developer.overheid.nl.
- Wordt middels de Spectral linter afgedwongen.

### Kant-en-klare micro-services
- De repository bevat meerdere backend microservices, waaronder een PDP en volledige PAP- en PIP-componenten.
  Omdat policies en data vaak door dezelfde gebruikers worden beheerd, is er ook een Manager-service die de PAP en PIP combineert.
- Voor oudere versies van OpenFSC is een aparte autorisatie-plugin beschikbaar die als PDP fungeert.
- Developers kunnen deze services direct inzetten voor een werkende EAM-implementatie. Wie liever zelf bouwt,
  kan de losse modules gebruiken om een of meer EAM-componenten zelf samen te stellen.
- Gateways en andere systemen kunnen met standaard AuthZEN-profielen eenvoudig aansluiten op de generieke PDP-service.
- Ook eigen componenten die in Golang zijn geschreven, kunnen gebruikmaken van de generieke PEP-module.
  Zo hoeven ontwikkelteams niet opnieuw te beginnen bij het bouwen van EAM-functionaliteit.

### Test
- Elke module is voorzien van uitgebreide unit-tests met gemiddeld meer dan 90% code coverage.
- Regressies worden zo vroeg en efficiënt mogelijk gedetecteerd.
- De testvoorzieningen zijn volledig opgenomen in de CI/CD-pipelines.

## Meedenken
Met een gratis GitLab-account is het mogelijk om mee te ontwikkelen, feedback te geven,
de voortgang te volgen en de code vrij te gebruiken.

https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv
