---
weight: 30
type: 'docs'
---

# Use cases

## Requirements
- zero trust
- least privilege
- only case related data
- compliance with laws and regulations
- compliance with "Pas toe of leg uit"
- based on open standards
- [data bij de bron](../inventarisation/data_bij_de_bron)
- decentralized
- modifyable in real time
- ...

## Identity challenges
- OpenID: verifiable claims
- [eIDAS](../inventarisation/eidas): verifiable claims
- eHerkenning: KvK number
- DigiD: BSN or hash
- machtiging: BSN or hash (?)
- nabestaande: BSN or hash (?)
- automatic (batch) processes: API key (?)
  - statistics
  - digimelding
  - digilevering
  - ...

## Connection challenges
- [digikoppeling](../inventarisation/digikoppeling)
- [StUF](../inventarisation/stuf)
- [FSC](../inventarisation/fsc)
- [FDS](../inventarisation/fds)
- application internals; e.g. replace RBAC/ABAC with policies (?)
- ...

## Desirable policy coverage
- data protection
  - hide/disallow address details
  - hide/disallow name details
  - hide/disallow date of birth
  - ...
- anonymization
  - hide address details
  - hide name details
  - hide date of birth
  - hide gender
  - ...
- pseudonymization
  - hash BSN
  - hash name details
  - hash address details
  - ...
- [regie op gegevens](../inventarisation/regie_op_gegevens)
  - is also data protection
  - possibly requires anonymization/pseudonymization
  - only the permitted data related to the civilian who gave permission
  - ...
- conversions
  - convert date of birth into age
  - ...
- mappings
  - convert postcode into gemeente
  - convert gemeente into province
  - ...
- calculations
  - calculate time period between two events (in days/weeks/months)
  - calculate time period between an event and today (in days/weeks/months)
  - distance of address from a geographic point
  - ...
- aggregation
  - count number of children
  - ...
- context
  - only during office hours
  - only from registered IP addresses
  - case related data only
  - only from whitelisted devices
  - request from machtiging/nabestaande
  - ...
- comparisons
  - address is within gemeente bounderies
  - income above/below N
  - age above/below N years
  - married/not married
  - ...
- regular expression
  - people with part of the first names equal to "piet"
  - ...

## Potential additional requirements
- verifiable proof that(/which) policies were executed
- add/modify/remove headers from request
- add/modify/remove query parameters from request
- add/modify/remove data fields/records from response
- cache/no cache options (?)
- self-destruct messages (?)
- ...

## Potential use cases by org type

### Gemeenten
- aanvraag recht op inzage
- 1e inschrijving
- vervolg inschrijving
- digimelding adreswijziging
- aanvraag subsidie (2x)
- aanvraag vergunning (2x)
- bezwaar gemeentelijke heffingen
- ...

### Waterschappen
- aanvraag recht op inzage
- bezwaar waterschapsbelasting
- ...

### Provincies
- aanvraag recht op inzage
- ...

### Politie
- aanvraag recht op inzage
- ...

### Belastingdienst
- aanvraag recht op inzage
- aanvraag uitstel
- aangifte inkomstenbelasting
- aangifte omzetbelasting
- aangifte VPB
- ...

### Defensie
- aanvraag recht op inzage
- ...

### Justitie
- aanvraag recht op inzage
- ...

### Ministeries
- aanvraag recht op inzage
- ...

### Inlichtingendiensten
- aanvraag recht op inzage
- ...

### Sociale diensten
- aanvraag recht op inzage
- ...

### Overige rijksdiensten
- aanvraag recht op inzage
- ...

### GGD
- aanvraag recht op inzage
- gezondheidstest
- vaccinatie
- inenting
- ...

### GGZ
- aanvraag recht op inzage
- ...

### Ziekenhuizen
- aanvraag recht op inzage
- medisch dossier inzien
- ...

### Universiteiten
- aanvraag recht op inzage
- ...

### Verzekeringsmaatschappijen
- aanvraag recht op inzage
- verzekering aanvragen
- verzekering wijzigen
- schade/verlies/diefstal melden
- verzekering opzeggen
- ...

### Pensioenfondsen
- aanvraag recht op inzage
- aanmelding
- jaarlijks overzicht
- ...

### Agentschappen
- aanvraag recht op inzage
- ...

### Overzeese gebieden
- aanvraag recht op inzage
- ...

### Deurwaarders
- aanvraag recht op inzage
- ...

### Notarissen
- aanvraag recht op inzage
- ...

### Accountants
- aanvraag recht op inzage
- ...

### Openbaar vervoer
- aanvraag recht op inzage
- ...

### Bedrijfsverenigingen
- aanvraag recht op inzage
- ...

### Fondsenbeheer
- aanvraag recht op inzage
- ...

### Sociale instellingen
- aanvraag recht op inzage
- ...

### Statistisch onderzoek

#### CBS
-  ...
