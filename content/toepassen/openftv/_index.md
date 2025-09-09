---
Title: OpenFTV
type: 'chapter'
---

{{< chapter/header title="Toepassen" bg="brown">}}

<div class="sub-navigation-wrapper">
    <div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
       <p>
          <a href="../implementatie">Implementatie</a> 
       </p>
    </div>
    <div class="utrecht-paragraph pt-1 sub-navigation-tab sub-navigation-tab-selected">
       <p>
          <a href="../openftv">OpenFTV</a>
       </p>
    </div>
    <div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
       <p>
          <a href="../proefopstelling">Proefopstelling</a> 
       </p>
    </div>
    <div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
       <p>
          <a href="../demonstratie">Demonstratie</a>
       </p>
    </div>
</div>

{{< /chapter/header >}}

{{< chapter/section title="OpenFTV" >}}

Federatieve toegangsverlening (FTV) is een toepassing van Externalized Authorization Management (EAM), een methode om toegangsregels buiten applicaties te beheren. Om te laten zien hoe dat werkt, is een technische voorbeeldoplossing beschikbaar: de referentie-implementatie OpenFTV. Deze implementatie is open source, gebaseerd op internationale standaarden en bedoeld voor iedereen die FTV wil toepassen, testen of verder ontwikkelen.

De referentie-implementatie maakt inzichtelijk hoe EAM werkt in de praktijk: de toegangsbeslissing vindt plaats buiten de applicatie, op basis van extern beheerde regels. FTV is in OpenFTV uitgewerkt als concreet voorbeeld en technisch getest op werking en betrouwbaarheid.

> **OpenFTV is niet bedoeld voor productiesituaties**. OpenFTV wordt ontwikkeld vanuit het project FTV. Dat project eindigt, en er is nog geen beheer gepland voor daarna. 
> De verwachting is dat op termijn voldoende van de bestaande EAM-producten aan AuthZEN NL Gov zullen gaan voldoen. OpenFTV zal wel beschikbaar blijven voor experimenten.  

{{< /chapter/section >}}

{{< chapter/section title="Aan de slag met OpenFTV" level="3" >}}

#### Open source
OpenFTV is open source en gratis bruikbaar.

#### Code
De code is geschreven in Golang en vrij beschikbaar via GitLab.

#### Internationale standaarden
- EAM is gebaseerd op Attribute Based Access Control (ABAC) en bouwt voort op moderne modellen
  zoals Policy Based Access Control (PBAC) en Relation Based Access Control (ReBAC).
- Het ABAC-model, zoals beschreven door [NIST](https://csrc.nist.gov/pubs/sp/800/162/upd2/final), verdeelt toegangsbeslissingen over vier componenten:
  PEP (Policy Enforcement Point), PDP (Policy Decision Point), PAP (Policy Administration Point) en PIP (Policy Information Point).
  De communicatie tussen deze onderdelen volgt de AuthZEN-standaard.

#### Modulair en flexibel
- De GitLab-repository is opgezet als een mono-repo met losse modules die afzonderlijk of in combinatie te gebruiken zijn.
- Elke module is grotendeels configureerbaar en zo flexibel mogelijk ingericht.
- Voor de opslag van policies en attributen kan het DevOps-team kiezen uit verschillende key/value-stores of bijvoorbeeld een relationele database zoals Postgres.
- Ook de policytaal is flexibel: op dit moment ondersteunt OpenFTV
  [Rego (OPA)](https://www.openpolicyagent.org/docs/latest/policy-language/),
  [Cedar (Amazon-AWS)](https://www.cedarpolicy.com/en),
  [Cerbos (Google)](https://docs.cerbos.dev/cerbos/latest/policies/)
  en [OpenFGA](https://openfga.dev/docs/fga).

#### OpenAPI-specificaties
- Voor alle API endpoints binnen de OpenFTV modules is een OAS v3 specificatie beschikbaar,
  tenzij dit vanuit een ander project vastgesteld is.
- Alle specificaties voldoen aan de REST API Design Rules van developer.overheid.nl.
- Wordt middels de Spectral linter afgedwongen.

#### Kant-en-klare micro-services
- De repository bevat meerdere backend microservices, waaronder een PDP en volledige PAP- en PIP-componenten.
  Omdat policies en data vaak door dezelfde gebruikers worden beheerd, is er ook een Manager-service die de PAP en PIP combineert.
- Voor oudere versies van OpenFSC is een aparte autorisatie-plugin beschikbaar die als PDP fungeert.
- Developers kunnen deze services direct inzetten voor een werkende EAM-implementatie. Wie liever zelf bouwt,
  kan de losse modules gebruiken om één of meer EAM-componenten zelf samen te stellen.
- Gateways en andere systemen kunnen met standaard AuthZEN-profielen eenvoudig aansluiten op de generieke PDP-service.
- Ook eigen componenten die in Golang zijn geschreven, kunnen gebruikmaken van de generieke PEP-module.
  Zo hoeven ontwikkelteams niet opnieuw te beginnen bij het bouwen van EAM-functionaliteit.

#### Test
- Elke module is voorzien van uitgebreide unit-tests met een code coverage van meer dan 90%.
- Regressies worden zo vroeg en efficiënt mogelijk gedetecteerd.
- De testvoorzieningen zijn volledig opgenomen in de CI/CD-pipelines.

### Meedenken
Met een gratis GitLab-account is het mogelijk om mee te ontwikkelen, feedback te geven,
de voortgang te volgen en de code vrij te gebruiken.

https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv
{{< /chapter/section >}}
