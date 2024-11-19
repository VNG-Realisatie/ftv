---
Title: Referentie-implementatie
weight: 50
---

# Referentie-implementatie

De referentie-implementatie is work-in-progress.

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

## Repository

De repository bevindt zich op [Gitlab](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/ftv-implementatie).

### Structuur

- /oas = OAS-specs & gegenereerde code
- /oas/fsc/auth = FSC Autorisatie plugin API structures
- /pbac = PBAC specific modulen
- /pbac/fsc/plugin/generic = generieke FSC Autorisatie plugin service
- /pbac/shared = herbruikbare PBAC modules
- /pbac/shared/control = herbruikbare modules voor het aanroepen van een PDP
- /pbac/shared/control/cedar = herbruikbare generieke wrapper voor Cedar PDP
- /pbac/shared/control/cerbos = herbruikbare generieke wrapper voor Cerbos/CEL PDP (TODO)
- /pbac/shared/control/odrl = herbruikbare generieke ODRL PDP module (TODO)
- /pbac/shared/control/opa = herbruikbare generieke wrapper voor OPA/Rego PDP
- /pbac/shared/control/xacml = herbruikbare generieke XACML PDP module (TODO)
- /pbac/shared/pap = herbruikbare generieke PAP
- /pbac/shared/pip = herbruikbare generieke PIP
- /pbac/shared/types = herbruikbare module met generieke models & enums
- /pbac/standards = definities gerelateerd aan de FTV-standaard
- /scripts = diverse scripts
- /testdata = test data
- /testdata/pip = test attributen en entiteiten voor de generieke PIP
- /testdata/policies = test policies
- /testdata/policies/cedar = Cedar policies
- /testdata/policies/cerbos = Cerbos/CEL policies (TODO)
- /testdata/policies/odrl = ODRL policies (TODO)
- /testdata/policies/opa = OPA/Rego policies
- /testdata/policies/xacml = XACML policies (TODO)
- /testdata/unittest = test data voor unit tests
- /utilities = verzameling ondersteunende modulen

### OAS

Externe OAS-specificaties worden middels een script uit een relevante git-repo opgehaald,
en vervolgens met een code-generator naar request/response structs vertaald.

### PBAC

#### FSC plugin

#### shared modules

##### controller - PDP (wrappers)

##### PAP

##### PIP

##### types

#### standards

### Utilities