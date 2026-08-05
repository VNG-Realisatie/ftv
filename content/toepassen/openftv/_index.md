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

{{< /chapter/section >}}

{{< chapter/section title="Van standaarden naar software" level="3" >}}

Het project FTV definieert een drietal standaarden die de werkwijze Externalised Authorisation Management (EAM) nader specificeren. Dit is echter nog geen software, en zegt ook niets over hoe die software intern zou moeten werken.

Om van de standaarden te komen tot een werkend systeem zijn er softwarecomponenten nodig die de nodige [functies](../implementatie/functioneel) vervullen. Er bestaat al software die een deel van de functies voor hun rekening kunnen nemen, met verschillende licenties en prijskaartjes. Zo bestaan er PDP's die voldoen aan de AuthZEN standaard. Er zijn echter geen oplossingen die volledig voldoen. Zo is voor de ADL-standaard nog geen implementatie door derden, omdat deze standaard door die project recent is opgesteld.

OpenFTV is een door het project FTV gebouwde oplossing, open source en onder EUPL-licentie. OpenFTV kan zelfstandig worden ingezet als complete oplossing, en de componenten kunnen ook los worden gebruikt als bouwsteen van een ander systeem.

{{< /chapter/section >}}

{{< chapter/section title="Architectuur" level="3" >}}

Onderstaand diagram toont de componenten van OpenFTV. De gekozen indeling is gebaseerd de principes van [PxP](../../methodiek/principes/#pxp) en de [functies](../implementatie/functioneel). 

- De blauwe componenten zijn onderdeel van OpenFTV. 
- De oranje cirkels geven aan waar een keus te maken is. 
- De pijlen geven de flow van informatie aan, inclusief de richting.

{{< img-url "diagrams/openftv-architectuur.svg" "OpenFTV architectuur" >}}

Hieronder volgt een korte beschrijving van elk van de componenten:

- **Applicatie**. Dit is het component waarvoor de toegang geregeld moet worden. Dit kan daadwerkelijk een applicatie zijn, maar ook een bijvoorbeeld een API-gateway of een service. Van belang in deze context is dat daar een Policy Enforcement Point (PEP) onderdeel van uitmaakt, die een NLGov AuthZEN aanroep kan doen als verzoek tot toegangsbeslissing.

  Een aantal bekende gateway producten ondersteunen standaard AuthZEN. Voor een aantal anderen levert OpenFTV plugins. Daarnaast levert OpenFTV een basiscomponent waarmee een PEP naar eigen inzicht gebouwd kan worden.

- **Handhaving**. Dit blok zorgt dat beslissingen genomen en gelogd worden. De onderdelen daarbinnen zijn:

  - Het Policy Decision Point (PDP) is hier een omhulsel die de AuthZEN verzoeken aanneemt en de verwerking coördineert. Het echte werk gebeurt door een engine naar keuze. OpenFTV ondersteunt [OPA (Rego)](https://www.openpolicyagent.org/docs/latest/policy-language/), [Cedar](https://www.cedarpolicy.com/en), [Cerbos](https://docs.cerbos.dev/cerbos/latest/policies/) en [OpenFGA](https://openfga.dev/docs/fga). 
  - Het Policy Administration Point (PAP) voorziet de PDP van regels, door deze op te halen uit een opslag. Hiervoor biedt OpenFTV de keus uit Git, PostgreSQL en het bestandssysteem.
  - Het Policy Information Point (PIP) haalt dynamische informatie op. Dit kan komen uit de OpenFTV opslag, die dezelfde methodes ondersteunt als de PAP, of uit een extern systeem zoals KeyCloak of EntraID.
  - De logging zorgt dat genomen beslissingen volgens de Authorization Decision Log (ADL) standaard geschreven worden. De opslag daarvoor kan in elk OpenTelemetry systeem gebeuren.

- **Beheerapplicatie**. Een zelfstandige webapplicatie waarmee gebruikers:

  - Policies kunnen inzien en aanpassen
  - Policies kunnen distribueren naar beslispunten
  - Statische contextinformatie kunnen inzien en aanpassen
  - De auditlog kunnen raadplegen  
  - Het logboek toegangsbeslissing kunnen raadplegen


{{< /chapter/section >}}

{{< chapter/section title="Deployment en distributie" level="3" >}}

Volgens het principe van [lokaal handhaven en centraal beheren](../../methodiek/principes/#lokaalcentraal) is het mogelijk om meerdere handhavingsblokken aan een centrale beheerapplicatie te koppelen:

{{< img-url "diagrams/openftv-deployment-architectuur.svg" "OpenFTV deployment" >}}

In de beheerapplicatie worden nieuwe versies van policies en dynamische informatie gebundeld en aangeven welke beslispunten welke bundels moeten gebruiken. OpenFTV zorgt dan dat elke handhaving beschikt over de juiste informatie.

{{< /chapter/section >}}

{{< chapter/section title="Autorisatie op autorisatie" level="3" >}}

Voor de beheerapplicatie zelf wordt ook OpenFTV gebruikt om de toegang te beheren. Daarom is er naast de applicaties meestal een aparte handhavingsinstantie voor de beheerapplicatie.

{{< img-url "diagrams/openftv-deployment-architectuur-2.svg" "OpenFTV deployment met beheerapplicatie" >}}

{{< /chapter/section >}}

{{< chapter/section title="Aan de slag met OpenFTV" level="3" >}}

#### Open source
OpenFTV is geschreven in Golang en vrij beschikbaar in [Gitlab](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv).

#### Modulair en flexibel
- De GitLab-repository is opgezet als een mono-repo met losse modules die afzonderlijk of in combinatie te gebruiken zijn.
- Elke module is grotendeels configureerbaar en zo flexibel mogelijk ingericht.

#### OpenAPI-specificaties
- Voor alle API endpoints binnen de OpenFTV modules is een OAS v3 specificatie beschikbaar,
  tenzij dit vanuit een ander project vastgesteld is.
- Alle specificaties voldoen aan de REST API Design Rules van [developer.overheid.nl](https://developer.overheid.nl/kennisbank/apis/api-design-rules/). De enige uitzondering hierop zijn bepaalde properties in de AuthZEN standaard die met *kebab-case* zijn gedefinieerd.
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
