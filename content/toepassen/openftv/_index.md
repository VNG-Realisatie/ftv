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

{{< chapter/section title="OpenFTV architectuur" level="3" >}}

{{< img-url "diagrams/openftv-architectuur.png" "OpenFTV architectuur" >}}
*van links naar rechts:*
- De OpenFTV Management Interface service bevat de UI voor de OpenFTV manager.
- De OpenFTV Manager service beheert de technische beleidsregels (policies) en bijbehorende (design-time) data (attributen).
- De OpenFTV PDP service vormt het beslispunt van technische beleidsregels.

#### OpenFTV Management Interface service
- Deze service bevat een gestileerde en moderne web-interface die de functionaliteit van de OpenFTV Manager service ontsluit.
- Met deze service kunnen technische policies bekeken, toegevoegd, gewijzigd en verwijderd worden.
- Met deze service kan design-time data bekeken, toegevoegd, gewijzigd en verwijderd worden.
- De service biedt de mogelijkheid de Authorization Decision Log te raadplegen.
- De service biedt de mogelijkheid tot inzage van de audit-log.
- De service geeft inzage in het bundel-management, en kan een nieuwe 'deployment' starten.
- De service geeft inzage in PDP configuraties.

#### OpenFTV Manager service
- Deze service implementeert binnen de PxP architectuur de PAP- en PIP-functionaliteit.
- De PAP is policy-taal agnostisch.
  Het ondersteunt dezelfde policy talen als de OpenFTV PDP service, maar kan makkelijk uitgebreid worden om andere policy talen te ondersteunen.
- De service gebruikt een PostgreSQL database voor persistence en de audit-log van alle mutaties op beleidsregels en data.

#### OpenFTV PDP service
- De service ondersteunt alle endpoints uit de AuthZEN 1.0 standaard.
  Deze worden vanuit externe componenten (PEP, het afdwing-punt) aangeroepen.
- De service communiceert met de OpenFTV Manager om van de meest recente policies en design-time data bij de beslissingen gebruik te maken:
  het OpenFTV bundel-management.
- De service ondersteunt 4 verschillende policy talen, OPA/Rego, Cedar, Cerbos/CEL en OpenFGA.
  Middels de service configuratie wordt 1 van de talen gekozen.
  Het OpenFTV bundel-management stuurt alleen policies in de juiste taal naar de PDP.
- De service kan (at runtime) gebruik maken van externe PIPs (denk aan IAM-systeem, HR-systeem, etc.) om de voor een beslissing benodigde (externe) attributen op te halen.
- De service schrijft genomen beslissingen naar een Authorization Decision Log middels OpenTelemetry.
  Dit kan geconfigureerd worden als een PostgreSQL database of een ander logging-systeem dat een OpenTelemetry adapter ondersteunt.

#### OpenFTV bundel-management
Het OpenFTV bundel-management is gebaseerd op OPA-bundels.

Een bundel bevat alle relevante policies en bijhorende design-time data om een specifieke PDP te laten functioneren.

Een beheerder van de policies en data in de OpenFTV Manager service kan bepalen wanneer een nieuwe 'deployment' gestart kan worden.
Met functionaliteit in de OpenFTV Management Interface kan dit proces in gang gezet worden.
Middels de configuratie van de OpenFTV Manager worden dan de bundels samengesteld.
De OpenFTV PDP wordt op de hoogte gebracht, en deze laadt en activeert de nieuwste bundel die voor die PDP van toepassing is.

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
- Policies, attributen en andere beheergegevens worden in een PostgreSQL database opgeslagen.
- Voor de opslag van de Authorization Decision Log kan het DevOps-team voor PostgreSQL kiezen,
  of middels OpenTelemetry versturen naar een logging-systeem naar eigen keuze.
- Ook de policy-taal is flexibel: op dit moment ondersteunt OpenFTV
  [Rego (OPA)](https://www.openpolicyagent.org/docs/latest/policy-language/),
  [Cedar (Amazon)](https://www.cedarpolicy.com/en),
  [Cerbos (Zenauth Ltd)](https://docs.cerbos.dev/cerbos/latest/policies/)
  en [OpenFGA](https://openfga.dev/docs/fga).

#### OpenAPI-specificaties
- Voor alle API endpoints binnen de OpenFTV modules is een OAS v3 specificatie beschikbaar,
  tenzij dit vanuit een ander project vastgesteld is.
- Alle specificaties voldoen aan de REST API Design Rules van [developer.overheid.nl](https://developer.overheid.nl/kennisbank/apis/api-design-rules/).
  * enige uitzondering hierop zijn bepaalde properties in de AuthZEN standaard die met *kebab-case* zijn gedefinieerd.
- Wordt middels de Spectral linter afgedwongen.

#### Kant-en-klare micro-services
- De repository bevat meerdere backend microservices, waaronder een PDP en volledige PAP- en PIP-services.
  Omdat policies en data vaak door dezelfde gebruikers worden beheerd, is er ook een Manager-service die de PAP en PIP combineert.
- Developers kunnen deze services direct inzetten voor een werkende EAM-implementatie. Wie liever zelf bouwt,
  kan de losse modules gebruiken om één of meer EAM-componenten zelf samen te stellen.
- Gateways en andere systemen kunnen met standaard AuthZEN-profielen eenvoudig aansluiten op de generieke PDP-service.
- Ook eigen componenten die in Golang zijn geschreven, kunnen gebruikmaken van de generieke PEP-module.
  Zo hoeven ontwikkelteams niet opnieuw te beginnen bij het bouwen van EAM-functionaliteit.

#### Test
- Elke module is voorzien van uitgebreide unit-tests met een code coverage van rond de 80%.
- Regressies worden zo vroeg en efficiënt mogelijk gedetecteerd.
- De testvoorzieningen zijn volledig opgenomen in de CI/CD-pipelines.

### Meedoen
Met een gratis GitLab-account is het mogelijk om mee te ontwikkelen, feedback te geven,
de voortgang te volgen en de code vrij te gebruiken.

https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv
{{< /chapter/section >}}
