---
weight: 20
bookCollapseSection: true
---

# Terminologie

--- ***WERK IN UITVOERING (vullingsgraad: 45%)*** ---

## Communicatie

De communicatie in en rond een project is altijd een uitdaging.
Wat voor de één duidelijk is, is voor de ander een groot vraagteken.

Wat wij vanuit het project beschrijven komt voort uit de informatie die tijdens het project verzameld is, en uit onze voorgaande ervaringen.
Het kan geregeld voorkomen dat het voor ons duidelijk is wat we beschreven hebben, maar voor een ander (totaal) niet.
Om nu alles zo uitgebreid mogelijk te beschrijven heeft dan weer de keerzijde dat het misschien niet of nauwelijks gelezen wordt.

Om dit te voorkomen willen we deze pagina, en onderliggende pagina's, gebruiken, om zoveel mogelijk terminologie, zo begrijpelijk mogelijk te beschrijven.
Tevens zullen we hier aangeven waarom voor een bepaalde term is gekozen.

Op deze pagina worden de termen summier uitgelegd, en daar waar verduidelijking nodig lijkt, een link naar een verdieping van de term.
De reden hiervoor is dat we de pagina niet te lang willen maken, en sommige lezers aan de korte versie al over voldoende uitleg beschikken.

Mochten er toch nog vragen zijn, schroom niet om contact op te nemen via [de gebruikelijke kanalen.](/ftv/docs/1.over_het_project/1.introductie)

Diverse beschrijvingen zijn (voor een deel) uit andere projecten overgenomen,
zoals RAWA [^1] en Lock/Unlock [^2].
Daar waar de overgenomen beschrijving in het Engels is, hebben we deze zo goed als mogelijk naar het Nederlands vertaald.
Als we de overgenomen beschrijving iets anders invullen, om het duidelijker binnen het kader van Federatieve Toegangsverlening te trekken,
zullen we dat ook zo goed als mogelijk verdedigen.

## Wie, wat, waar

![domeinen](/architecture/domeinen.png)

## Termen

### Access Control
Het controleren van wie toegang mag hebben tot data, systemen, services, resources, locaties.
De 'Wie' kan zijn een gebruiker, een apparaat of ding, of een service.
In het kader van dit project zullen we de term gebruiken als het verlenen van toegang tot een resource of functie.\
[Meer.](access_control)

### Attribuut
Een attribuut is een gegeven met een gedefinieerde code en een variabele waarde (in het Engels een key/value pair).
De code is een vereiste on te bepalen waar het gegeven over gaat, en op basis hiervan kan de waarde op de één of andere manier voor autorisatie gebruikt worden.
Ook de aanwezigheid of afwezigheid van een attribuut kan voor autorisatie gebruikt worden.\
[Meer.](attribuut)

### Audit
Audit is het process om controles uit te voeren op de geldigheid van verwerkingen.
Dit gebeurt, al dan niet door externe partijen, op basis van de logboeken van de te controleren verwerkingen,
bij alle relevante organisaties die bij de verwerking betrokken waren.\
[Meer.](audit)

### Authenticatie
RAWA [^1]: Authenticatie is het proces om te bewijzen dat een gebruiker, welke middels een digitale identiteit om toegang verzoekt, de gerechtigde eigenaar van die identiteit is.
Afhankelijk van de use-case, kan een 'identiteit' een natuurlijk persoon of niet-natuurlijk persoon zijn.\
[Meer.](authenticatie)

### Autorisatie
RAWA [^1]: Het bepalen van de rechten van een gebruiker om functionaliteit te benaderen met een computer-systeem, en het niveau waartoe de toegang mag worden verleend.
Over het algemeen, zal een 'autoriteit' de toegang definiëren en toekennen, echter in sommige gevallen, wordt toegang verleend op basis van inherente rechten (bv. een patient krijgt toegang tot eigen gegevens).\
[Meer.](autorisatie)

### Autorisatieregel
Een autorisatieregel is een regel die gebruikt wordt om toegang te verlenen of niet.
Het is meestal een, al dan niet complexe, vergelijking van één of meer attributen, met specifieke waarden of lijsten van waarden.\
[Meer.](autorisatieregel)

### Context
RAWA [^1]: Condities waaronder een verwerking op een resource is toegestaan voor een gebruiker,
zoals de tijd van de verwerking, locatie van de verwerking, of het niveau van compliance.\
[Meer.](context)

### Dataminimalisatie
Het beperken van opgevraagde resources d.m.v. horizontale of verticale filtering.\
[Meer.](dataminimalisatie)

### Data-spaces
[Meer.](dataspaces)

### Federatief
Een bond van samenwerkende organisaties met als doel het delen van resources en functies.\
[Meer.](federatief)

### Gateway
Een software component welke gebruikt wordt om verbindingen van of naar een organisatie middels één punt te bundelen en beveiligen.
Zie ook [inway](#inway) en [outway](#outway).\
[Meer.](gateway)

### Identificatie
[Meer.](identificatie)

### Inway
FSC: Een [gateway](#gateway) welke gebruikt wordt om verbindingen van andere organisaties middels één punt te bundelen en beveiligen.
Zie ook [outway](#outway).\
[Meer.](gateway)

### Linked data
Lock/Unlock [^2]: Linked data is een manier om data te structureren en te verbinden over het web en maakt gebruik van standaarden zoals URI's,
RDF en ontologieën gedefinieerd in RDF zoals RDFS, OWL en SHACL.\
[Meer.](linked_data)

### Logging
Logging is de technische term voor het vastleggen van verwerkingen in een logboek.\
[Meer.](audit)

### Ontologie
Een beschrijving van zaken (dingen) en hun koppelingen.\
[Meer.](ontologie)

### Outway
FSC: Een [gateway](#gateway) welke gebruikt wordt om verbindingen naar andere organisaties middels één punt te bundelen en beveiligen.
Zie ook [inway](#inway).\
[Meer.](gateway)

### Policy
Policy kent veel betekenissen:
- Een wet of beleidsregel kun je als een policy beschouwen.
- Een bedrijf heeft policies voor de verschillende taken die binnen het bedrijf uitgevoerd worden.
- Binnen dit project wordt policy gebruikt als een samenhangende set van autorisatieregels.\

[Meer.](policy)

### Request
Een verzoek om een resource of functie te benaderen.\
[Meer.](verwerking)

### Resource (NL: bron)
Een adresseerbaar gegeven. Bv. een regel uit een database.\
[Meer.](resource)

### Standaard
Een algemeen aanvaarde set van regels en/of aanbevelingen voor een bepaald vakgebied.\
[Meer.](standaard)

### Toegangsregel
Toegangsregel is uitwisselbaar met [autorisatieregel](#autorisatieregel).
Binnen dit project zullen we de term autorisatieregel gebruiken.\
[Meer.](autorisatieregel)

### Toegangsverlening
Het verlenen van toegang tot een [resource](#resource) of functie.
Zie ook het Engelse [Access Control](#access-control)\
[Meer.](access_control)

### Usage Control
Het bepalen van gebruiksregels en het controleren van de uitvoering ervan.\
[Meer.](usage_control)

### Verifieerbare verklaring
Een verklaring dat iemand of iets daadwerkelijk is wie het zegt te zijn, wat middels een cryptografisch sterke manier te verifiëren is.\
[Meer.](verifieerbare_verklaring)

### Vertrouwensnetwerk
[Meer.](vertrouwensnetwerk)

### Verwerking
Het opvragen of manipuleren van een [resource](#resource).\
[Meer.](verwerking)

### Zero Trust
Het principe om niets en niemand te vertrouwen, zonder dit goed to controleren.\
[Meer.](zero_trust)

## Afkortingen

### ABAC
*Attribute Based Access Control*\
RAWA [^2]: een patroon van toegangsverlening, die gebruik maakt van dynamische definities of permissies, op basis van informatie ("attributen", of "claims"), zoals functie, afdeling, of rol.\
[Meer.](abac)

### ACL
*Access Control List*\
RAWA[^1]: Een ACL is een definitie die aangeeft wie of wat toegang mag hebben of niet tot een [resource](#resource).
Bv. een bestand kan aan een ACL gekoppeld zijn die medewerkers van de Marketing Afdeling toestemming geeft te lezen en te schrijven,
de IT Afdeling alleen lezen, en alle anderen de toegang ontzegt.\
[Meer.](autorisatie)

### ADR
*Architecture Decision Records*\
[Meer.](adr)

### API
*Application Programming Interface*\
[Meer.](api)

### IdP
*Identity Provider*\
RAWA [^1]: Een IdP Voert een dienst uit welke informatie over een gebruiker naar een applicatie kan sturen.
Deze informatie wordt veelal vastgelegd in een gebruikersregister,
en een IdP zal deze information ophalen en omzetten in een formaat dat door Service Providers (SP, bv. applicaties) gebruikt kan worden.
De OASIS organisatie, welke verantwoordelijk is voor de SAML-specificatie, definieert een IdP als
"Een soort SP welke identiteitsinformatie vastlegt, onderhoud, en beheerd voor gebruikers,
en biedt gebruikersauthenticatie aan voor andere SP's binnen een federatief stelsel, zoals bv. webbrowser profielen."\
[Meer.](oauth)

### JSON
*JavaScript Object Notation*\
[Meer.](json)

### OAuth
*Open Authorization*\
RAWA [^1]: OAuth 2.0 is een open-source protocol, welke aanbieders (bv. applicaties) de mogelijkheid biedt om data te delen met afnemers,
d.m.v. het faciliteren van de communicatie met een autorisatie service.
deze data, in de vorm van verklaringen, wordt aan applicaties gegeven om informatie/data uit andere applicaties op te halen.
De Autorisatie service is meestal de [Identity Provider (IdP)](#idp).
The Authorization Server (AS) may provide authorization directly or indirectly. For example,
the AS may supply attributes or profile data of the Resource Owner or provide access to data,
that can later be used for authorization purposes, such as entitlements from an Identity Management or Governance Solution.\
[Meer.](oauth)

### OpenID
Wikipedia [^3]: OpenID is een open standaard voor een gedecentraliseerd [authenticatie](#authenticatie) protocol dat door de non-profit OpenID Foundation [^4] onderhouden wordt.
Het geeft gebruikers de mogelijkheid zich te authenticeren aan ondersteunende websites, middels een [identity provider (IDP)](#idp) service.
Hierdoor wordt de noodzaak, voor webmasters, om een eigen login-systeem te onderhouden, geëlimineerd.
Tevens geeft het gebruikers toegang tot vele ongerelateerde websites, zonder dat dit afzonderlijke naam/wachtwoord combinaties vereist.\
[Meer.](openid)

### PAC
*Policy As Code*\
[Meer.](pbac)

### PAP
*Policy Administration Point*\
Component van een [ABAC](#abac)- / [PBAC](#pbac)-systeem, welke verantwoordelijk is voor het vastleggen, onderhouden en opvragen van policies.\
[Meer.](pbac)

### PBAC
*Policy Based Access Control*\
RAWA [^1]: een patroon van toegangsverlening gebaseerd op dynamische definities van toegang en attributen (zoals in [ABAC](#abac)),
alsmede de context van de verwerking.\
[Meer.](autorisatie)

### PDP
*Policy Decision Point*\
Component van een [ABAC](#abac)- / [PBAC](#pbac)-systeem, welke verantwoordelijk is voor het uitvoeren van de [autorisatieregels](#autorisatieregel) in policies.\
[Meer.](pbac)

### PEP
*Policy Enforcement Point*\
Component van een [ABAC](#abac)- / [PBAC](#pbac)-systeem, welke verantwoordelijk is voor het verlenen van toegang op basis van een besluit van de [PDP](#pdp).\
[Meer.](pbac)

### PIP
*Policy Information Point*\
Component van een [ABAC](#abac)- / [PBAC](#pbac)-systeem, welke verantwoordelijk is voor het omzetten, ophalen, vertalen en leveren van [attributen](#attribuut) voor de [PDP](#pdp).\
[Meer.](pbac)

### PBAM
*Policy Based Access Management*\
[Meer.](pbam)

### RBAC
*Role Based Access Control*\
[Meer.](autorisatie)

### REST
*Representational State Transfer*\
[Meer.](api)

### SOAP
*Simple Object Access Protocol*\
[Meer.](api)

### XML
*Extensible Markup Language*\
[Meer.](xml)

## Referenties
[^1]: RAWA terminologie\
https://vng-realisatie.github.io/RAWA/uitwerking/terminologie
[^2]: Lock/Unlock glossary\
https://kadaster-labs.github.io/lock-unlock-docs/achtergrond/glossary
[^3]: Wikipedia\
https://en.wikipedia.org/wiki/OpenID
[^4]" OpenID Foundation\
https://openid.net/
