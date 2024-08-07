weight: 10
type: 'docs'
---

# Use cases

## Requirements
- zero trust
- only case related data
- compliance with laws and regulations
- compliance with "Pas toe of leg uit"
- based on open standards

## Identity complexities
- DigiD (BSN)
- JWT with claims (OpenID, eIDAS)
- eHerkenning (OIN)
- machtiging (?)
- nabestaande (?)
- automatic processes (?)
  - statistics
  - digimelding

## Connection complexities
- digikoppeling
- StUF
- FSC
- FDS
- application internals (?)
- batch processes (?)

## Potential target complexities
- data protection
  - hide/disallow address details
  - hide/disallow name details
  - hide/disallow date of birth
- anonymization
  - hide address details
  - hide name details
  - hide date of birth
- pseudonymization
  - hash BSN
  - hash name details
  - hash address details
- regie op gegevens
  - is also data protection
  - possibly requires anonymization/pseudonymization
  - only the permitted data related to the civilian who gave permission
- conversion
  - convert date of birth into age
- mapping
  - convert postcode into gemeente
  - convert gemeente into province
- calculation
  - calculate time period between two events (in days/weeks/months)
  - calculate time period between an event and today (in days/weeks/months)
  - distance of address from a geographic point
- aggregation
  - count number of children
- context
  - only during office hours
  - only from registered IP addresses
  - case related data only
  - only from whitelisted devices
- comparison
  - address is within gemeente bounderies
  - income above/below N
  - age above/below N years
  - married/not married
- regular expression
  - people with part of the first names equal to "piet"

## Potential additional requirements
- verifiable proof that(/which) policies were executed
- add/modify/remove headers from request
- add/modify/remove query parameters from request
- add/modify/remove data fields/records from response

## Potential use cases by organization type

### Gemeenten
- aanvraag recht op inzage
- 1e inschrijving
- vervolg inschrijving
- digimelding adreswijziging
- aanvraag subsidie (2x)
- aanvraag vergunning (2x)
- ...

### Waterschappen
- aanvraag recht op inzage
- ...

### Provincies
- aanvraag recht op inzage
- ...

### Politie
- aanvraag recht op inzage
- ...

### Belastingdienst
- aanvraag recht op inzage
- ...

### Defensie
- ...

### Justitie
- aanvraag recht op inzage
- ...

### Ministeries
- ...

### Inlichtingendiensten
- ...

### Sociale diensten
- aanvraag recht op inzage
- ...

### Overige rijksdiensten
- ...

### GGD
- aanvraag recht op inzage
- ...

### GGZ
- aanvraag recht op inzage
- ...

### Ziekenhuizen
- medisch dossier inzien
- ...

### Universiteiten
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
- ...

### Overzeese gebieden
- ...

### Deurwaarders
- ...

### Notarissen
- ...

### Accountants
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
