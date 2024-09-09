---
weight: 20
bookCollapseSection: true
---

# Terminologie

--- ***WERK IN UITVOERING (vullingsgraad: 35%)*** ---

De communicatie in en rond een project is altijd een uitdaging.
Wat voor de één duidelijk is, is voor de ander een groot vraagteken.

Wat wij vanuit het project beschrijven komt voort uit de informatie die tijdens het project verzameld is, en uit onze voorgaande ervaringen.
Het kan geregeld voorkomen dat het voor ons duidelijk is wat we beschreven hebben, maar voor een ander (totaal) niet.
Om nu alles zo uitgebreid mogelijk te beschrijven heeft dan weer de keerzijde dat het misschien niet of nauwelijks gelezen wordt.

Om dit te voorkomen willen we deze pagina, en onderliggende pagina's, gebruiken, om zoveel mogelijk terminologie, zo begrijpelijk mogelijk te beschrijven.
Tevens zullen we hier aangeven waarom voor een bepaalde term is gekozen.

Op deze pagina worden de termen summier uitgelegd, en daar waar verduidelijking nodig lijkt, een link naar een verdieping van de term.
De reden hiervoor is dat we de pagina niet al te lang willen maken, en sommigen aan de korte versie al voldoende hebben.

Mochten er toch nog vragen zijn, schroom niet om contact op te nemen via [de gebruikelijke kanalen.](/docs/1.over_het_project/1.introductie)

Diverse beschrijvingen zijn (voor een deel) uit andere projecten overgenomen, 
zoals RAWA[^1] en Lock/Unlock[^2].
Daar waar de overgenomen beschrijving in het Engels is, hebben we deze zo goed als mogelijk naar het Nederlands vertaald.
Als we de overgenomen beschrijving iets anders invullen, om het duidelijker binnen het kader van Federatieve Toegangsverlening te trekken,
zullen we dat ook zo goed als mogelijk verdedigen.

## Wie, wat, waar

![Domeinen](/architecture/domeinen.png)

## Termen

### Access Control
Het controleren van wie toegang mag hebben tot data, systemen, services, resources, locaties.
De 'Wie' kan zijn een gebruiker, een apparaat of ding, of een service.
In het kader van dit project zullen we de term gebruiken als het verlenen van toegang tot een resource.

[Meer.](access_control)

### Attribuut
Een attribuut is een gegeven met een gedefinieerde code en een variabele waarde (in het Engels een key/value pair).
De code is een vereiste on te bepalen waar het gegeven over gaat, en op basis hiervan kan de waarde op de één of andere manier voor autorisatie gebruikt worden.
Ook de aanwezigheid of afwezigheid van een attribuut kan voor autorisatie gebruikt worden.

[Meer.](attribuut)

### Audit
Audit is het process om controles uit te voeren op de geldigheid van verwerkingen.
Dit gebeurt, al dan niet door externe partijen, op basis van de logboeken van de te controleren verwerkingen,
bij alle relevante organisaties die bij de verwerking betrokken waren.

[Meer.](audit)

### Authenticatie
RAWA[^1]: Authenticatie is het proces om te bewijzen dat een gebruiker, welke middels een digitale identiteit om toegang verzoekt, de gerechtigde eigenaar van die identiteit is.
Afhankelijk van de use-case, kan een 'identiteit' een natuurlijk persoon of niet-natuurlijk persoon zijn.

[Meer.](authenticatie)

### Autorisatie
RAWA[^1]: Het bepalen van de rechten van een gebruiker om functionaliteit te benaderen met een computer-systeem, en het niveau waartoe de toegang mag worden verleend.
Over het algemeen, zal een 'autoriteit' de toegang definiëren en toekennen, echter in sommige gevallen, wordt toegang verleend op basis van inherente rechten (bv. een patient krijgt toegang tot eigen gegevens).

[Meer.](autorisatie)

### Autorisatieregel
Een autorisatieregel is een regel die gebruikt wordt om toegang te verlenen of niet.
Het is meestal een, al dan niet complexe, vergelijking van één of meer attributen, met specifieke waarden of lijsten van waarden.

[Meer.](autorisatieregel)

### Context
RAWA[^1]: Condities waaronder een verwerking op een resource is toegestaan voor een gebruiker, zoals de tijd van de verwerking, locatie van de verwerking, of het niveau van compliance.

[Meer.](context)

### Dataminimalisatie
Het beperken van opgevraagde resources d.m.v. horizontale of verticale filtering. 

[Meer.](dataminimalisatie)

### Data-spaces

[Meer.](dataspaces)

### Federatief
Een bond van samenwerkende organisaties met als doel het delen van resources en functies.

[Meer.](federatief)

### Gateway
Een software component welke gebruikt wordt om verbindingen van of naar een organisatie middels één punt te bundelen en beveiligen.
Zie ook [inway](#inway) en [outway](#outway).

[Meer.](gateway)

### Identificatie

[Meer.](identificatie)

### Inway
FSC: Een [gateway](#gateway) welke gebruikt wordt om verbindingen van andere organisaties middels één punt te bundelen en beveiligen.
Zie ook [outway](#outway).

[Meer.](gateway)

### Linked data

[Meer.](linked_data)

### Logging
Logging is de technische term voor het vastleggen van verwerkingen in een logboek.

[Meer.](audit)

### Ontologie
Een beschrijving van zaken (dingen) en hun koppelingen.

[Meer.](ontologie)

### Outway
FSC: Een [gateway](#gateway) welke gebruikt wordt om verbindingen naar andere organisaties middels één punt te bundelen en beveiligen.
Zie ook [inway](#inway).

[Meer.](gateway)

### Policy
Policy kent veel betekenissen:
- Een wet of beleidsregel kun je als een policy beschouwen.
- Een bedrijf heeft policies voor de verschillende taken die binnen het bedrijf uitgevoerd worden.
- Binnen dit project wordt policy gebruikt als een samenhangende set van autorisatieregels.

[Meer.](policy)

### Request
Een verzoek om een resource of functie te benaderen.

[Meer.](verwerking)

### Resource
Een adresseerbaar gegeven. Bv. een regel uit een database.

[Meer.](resource)

### Standaard
Een algemeen aanvaarde set van regels en/of aanbevelingen voor een bepaald vakgebied.

[Meer.](standaard)

### Toegangsregel
Toegangsregel is uitwisselbaar met autorisatieregel.
Binnen dit project zullen we de term autorisatieregel gebruiken.

[Meer.](autorisatieregel)

### Toegangsverlening
Het verlenen van toegang tot een [resource](#resource) of functie.

[Meer.](access_control)

### Usage Control
Het bepalen van gebruiksregels en het controleren van de uitvoering ervan.

[Meer.](usage_control)

### Verifieerbare verklaring
Een verklaring dat iemand of iets daadwerkelijk is wie het zegt te zijn, wat middels een cryptografisch sterke manier te verifiëren is.

[Meer.](verifieerbare_verklaring)

### Vertrouwensnetwerk

[Meer.](vertrouwensnetwerk)

### Verwerking
Het opvragen of manipuleren van een [resource](#resource).

[Meer.](verwerking)

### Zero Trust
Het principe om niets en niemand te vertrouwen, zonder dit goed to controleren.

[Meer.](zero_trust)

## Afkortingen

### ABAC
Attribute Based Access Control.

Het verlenen van toegang middles het controleren of meegeleverde en bijgezochte attributen aan de voorwaarden van policies voldoen.

[Meer.](abac)

### ACL
RAWA[^1]: An Access Control List (ACL) is a definition around who or what are allowed or denied access to a resource.
For example, a file share may have an Access Control List that allows Marketing Department users to read and write,
IT Department users to read-only, and denies all other users' access.

[Meer.](autorisatie)

### ADR
Architecture Decision Records.

[Meer.](adr)

### API
Application Programming Interface.

[Meer.](api)

### IdP
Identity Provider.

[Meer.](oauth)

### JSON
JavaScript Object Notation.

[Meer.](json)

### OAuth


[Meer.](oauth)

### OpenID

[Meer.](openid)

### PAC
Policy As Code.

[Meer.](pbac)

### PAP
Policy Administration Point.

[Meer.](pbac)

### PBAC
Policy Based Access Control.

[Meer.](autorisatie)

### PDP
Policy Decision Point.

[Meer.](pbac)

### PEP
Policy Enforcement Point.

[Meer.](pbac)

### PIP
Policy Information Point.

[Meer.](pbac)

### PBAM
Policy Based Access Management.

[Meer.](pbam)

### RBAC
Role Based Access Control.

[Meer.](autorisatie)

### REST
REpresentational State Transfer.

[Meer.](api)

### SOAP
Simple Object Access Protocol.

[Meer.](api)

### XML
eXtensible Markup Language.

[Meer.](xml)

## Referenties
[^1]: RAWA terminologie\
  https://vng-realisatie.github.io/RAWA/uitwerking/terminologie
[^2]: Lock/Unlock glossary\
  https://kadaster-labs.github.io/lock-unlock-docs/achtergrond/glossary
