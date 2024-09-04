---
title: 'Use cases'
weight: 30
bookCollapseSection: true
---

# Use cases

## Eisen
- zero trust
- least privilege
- data minimalisatie
- conformerend aan alle wet- en regelgeving
- conformerend aan "Pas toe of leg uit"
- gebaseerd op open standaarden
- [data bij de bron](../inventarisatie/data_bij_de_bron)
- decentraal
- in realtime aan te passen
- ...

## Uitdagingen op gebied van identificatie
- OpenID: verifieerbare claims
- [eIDAS](../inventarisatie/eidas): verifieerbare claims
- eHerkenning: KvK nummer
- DigiD: BSN of hash
- machtigingen (?): BSN of hash
- nabestaanden (?): BSN of hash
- achtergrond processen (?): API key
  - statistieken
  - digimelding
  - digilevering
  - ...

## Uitdaging op het gebied van koppeling
- [digikoppeling](../inventarisatie/digikoppeling)
- [StUF](../inventarisatie/stuf)
- [FSC](../inventarisatie/fsc)
- [FDS](../inventarisatie/fds)
- applicaties intern; bv. vervangen van RBAC/ABAC door policies (?)
- ...

## Gewenste mogelijkheden van policies
- gegevensbeveiliging
  - verberg/blokkeer adresgegevens
  - verberg/blokkeer naamgegevens
  - verberg/blokkeer geboortedatum
  - ...
- anonimiseren
  - verberg adresgegevens
  - verberg naamgegevens
  - verberg geboortedatum
  - verberg geslacht
  - ...
- pseudonimiseren
  - hash BSN
  - hash naamgegevens
  - hash adresgegevens
  - ...
- [regie op gegevens](../inventarisatie/regie_op_gegevens)
  - is ook gegevensbeveiliging
  - vereist wellicht anonimiseren/pseudonimiseren
  - alleen de toegestane data gerelateerd aan de persoon die permissie heeft gegeven
  - ...
- conversies
  - converteer geboortedatum naar leeftijd
  - ...
- mappings
  - converteer postcode naar gemeente
  - converteer gemeente naar provincie
  - ...
- berekeningen
  - bereken tijdsinterval tussen twee gebeurtenissen (in uren/dagen/weken/maanden)
  - bereken tijdsinterval tussen een gebeurtenis en vandaag/selectiedatum (in uren/dagen/weken/maanden)
  - afstand van een adres ten opzichte van een geografisch punt
  - ...
- aggregatie
  - tel aantal kinderen
  - ...
- context
  - alleen tijdens kantooruren
  - alleen vanaf geregistreerde IP addressen
  - alleen zaakgerichte gegevens
  - alleen vanaf toegestane apparaatsoorten
  - bevraging vanuit een machtiging/nabestaande
  - ...
- vergelijkingen
  - adres ligt binnen de gemeente
  - inkomen boven/onder N
  - leeftijd boven/onder N jaren/maanden
  - getrouwd/partnerschap / niet getrouwd/geen partnerschap
  - ...
- reguliere expressies
  - personen met een deel van de voornaam gelijk aan "piet"
  - ...

## Mogelijk aanvullende eisen
- verifieerbaar bewijs dat(/welk) policies zijn uitgevoerd
- toevoegen/wijzigen/verwijderen headers uit de request
- toevoegen/wijzigen/verwijderen query parameters uit de request
- toevoegen/wijzigen/verwijderen velden/records uit de respons
- cache/no cache opties (?)
- zelf-vernietigende berichten (?)
- ...

## Potentiele use cases per soort org

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
