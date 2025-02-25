---
Title: Referentie-implementatie
weight: 50
---

# Referentie-implementatie

**De referentie-implementatie is work-in-progress.**

## Repository

De repository bevindt zich op [Gitlab](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/ftv-implementatie).

## Uitgangspunten

- We proberen een redelijk assortiment use-cases uit te voeren
- We proberen zo veel mogelijk verschillende policy-talen te testen
- We proberen een verscheidenheid aan API's te testen
- We proberen de policies leesbaar te houden
- We doen ons best alles modulair op te bouwen, zodat hergebruik, volledig of deels, mogelijk blijft
- We gebruiken Golang als programmeertaal
- We gebruiken YAML voor configuratiebestanden
- We bouwen micro-services als containers met behulp van Docker
- We gebruiken Helm charts voor het deployen van de containers
- We bouwen meerdere oplossingen, met en zonder FSC, voor JSON REST en XML/SOAP
- We verwerken verifieerbare verklaringen middels JWT
- We bouwen zoveel mogelijk unit-tests
- We bouwen zoveel mogelijk integratie-tests
- We bouwen zoveel mogelijk benchmarks

### Structuur

- /oas = OAS-specs & gegenereerde code
- /oas/fsc/auth = FSC Autorisatie plugin API structures
- /pbac = PBAC gerelateerde modules
- /pbac/components = herbruikbare PBAC componenten
- /pbac/components/pdp = herbruikbare componenten voor het aanroepen van een PDP
- /pbac/components/pdp/cedar = herbruikbare generieke wrapper voor Cedar PDP
- /pbac/components/pdp/opa = herbruikbare generieke wrapper voor OPA/Rego PDP
- /pbac/components/pdp/openfga = herbruikbare generieke wrapper voor OpenFGA PDP (**WIP**)
- /pbac/components/pdp/cerbos = herbruikbare generieke wrapper voor Cerbos/CEL PDP (**TODO**)
- /pbac/components/pdp/odrl = herbruikbare generieke engine voor ODRL (**TODO**)
- /pbac/components/pdp/xacml = herbruikbare generieke engine voor XACML (**TODO**)
- /pbac/components/pap = herbruikbare generieke PAP
- /pbac/components/pip = herbruikbare generieke PIP
- /pbac/models = generieke PBAC definities
- /pbac/fsc/plugin/generic = generieke FSC Autorisatie plugin service
- /scripts = diverse scripts
- /testdata = test data
- /testdata/pip = test attributen en entiteiten voor de generieke PIP
- /testdata/policies = test policies
- /testdata/policies/cedar = Cedar policies
- /testdata/policies/cerbos = Cerbos/CEL policies (**TODO**)
- /testdata/policies/odrl = ODRL policies (**TODO**)
- /testdata/policies/opa = OPA/Rego policies
- /testdata/policies/xacml = XACML policies (**TODO**)
- /testdata/unittest = test data voor unit tests
- /utilities = herbruikbare generieke functies

### OAS
[/oas](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/ftv-implementatie/-/tree/main/oas?ref_type=heads)

Externe OAS-specificaties worden middels een script uit een relevante git-repo opgehaald,
en vervolgens met een code-generator naar request/response structs vertaald.

### PBAC
[/pbac](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/ftv-implementatie/-/tree/main/pbac?ref_type=heads)

Verzameling van alles wat PBAC gerelateerd is.
PEP, PDP, PIP, PAP, en ondersteunende generieke modellen, types en enums.

#### FSC plugin
[/pbac/fsc/plugin/generic](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/ftv-implementatie/-/tree/main/pbac/fsc/plugin/generic?ref_type=heads)

Een minimale service, gebaseerd op de FSC autorisatie-plugin API.
De configuratie van de service bepaald welke policy taal gekozen wordt,
en dus welke taal-specifieke PDP en policies gebruikt worden voor het autorisatieproces.

#### Shared modules
[/pbac/components](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/ftv-implementatie/-/tree/main/pbac/components?ref_type=heads)

Verzameling van herbruikbare PBAC-modules.

##### PDP - sdk wrappers
[/pbac/components/pdp](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/ftv-implementatie/-/tree/main/pbac/components/pdp?ref_type=heads)

Verzameling van PDP-wrappers (Cedar, OPA/Rego & **TODO**: Cerbos/CEL) en PDP-implementaties (**TODO**: ODRL & XACML).

Alle controllers worden geïmplementeerd middels een interface, zodat ze uitwisselbaar zijn.
Een PEP die een PDP wil gebruiken hoeft dan alleen de interface te kennen, en kan, op basis van een configuratie parameter,
beslissen welk soort PDP (en bijhorende policy taal) het wil gebruiken.

##### PAP
[/pbac/components/pap](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/ftv-implementatie/-/tree/main/pbac/components/pap?ref_type=heads)

Een generieke PAP, die (op dit moment) policies uit het file-systeem op kan halen, en hiermee de PDP kan voeden. 

##### PIP
[/pbac/components/pip](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/ftv-implementatie/-/tree/main/pbac/components/pip?ref_type=heads)

Een generieke PIP, die (op dit moment) attributen en entities uit het file-systeem op kan halen, en hiermee de PDP kan voeden.
Afhankelijk van het soort PDP, kunnen deze gegevens ook apart, tijdens iedere request, aan de PDP meegegeven worden.

#### Models
[/pbac/models](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/ftv-implementatie/-/tree/main/pbac/models?ref_type=heads)

Constanten en modellen welke aan de FTV-standaard voldoen.

### Utilities
[/utilities](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/ftv-implementatie/-/tree/main/utilities?ref_type=heads)

Gevarieerd aanbod van simpele, generiek herbruikbare functies.
