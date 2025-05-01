---
bookCollapseSection: false
weight: 10
Title: 3. Introductie EAM
---

# Introductie Externalized Authorization Management (8 april 2025)

## Aanwezigen
- Marc de Boer (FTV)
- Gideon Zegwaard (FDS)
- Elske Derks (MinBZK)
- Frank Terpstra (Geonovum)
- Rens Kievit (Rijk)
- Gerard Juijn (FTV)
- Maikel Hofman (FTV)
- Michiel Trimpe (FTV)
- Karin Hiralal (FTV)
- Nico Spijkers (MinBZK)
- Gerard van der Hoeven (iShare)
- Martin van der Plas (Logius)
- Stas Mironov (Logius)
- Remo van Rest (ZIN)
- Wouter Diephuis (MinBZK)
- Arnoud Quanjer (VNG)
- René Kint (Zicht op Nederland)
- Ronald Koster (FSC)
- Rob Klaver (Idemia)

## Agenda
- Introductie Externalized Authorization Management
- Bepaling scope en werkwijze 
- Agenda volgende werkgroep

## Bijlagen

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20250408-introductie-eam.mp4)
- [Presentatie Introductie EAM]({{< param baseDirectory >}}documents/20250408-introductie-eam.pptx)

## Introductie Externalized Authorization Management

Michiel Trimpe gaf een [presentatie]({{< param baseDirectory >}}documents/20250408-introductie-eam.pptx) over Externalized Authorization Management. Dit is de Engelse term voor het architectuurpatroon dat Federatieve Toegangsverlening wil standaardiseren.

Tijdens de presentatie zijn de volgende opmerkingen gemaakt:
- *Martin van der Plas*: Bij inkoop van applicaties is de opzet van toegang tot applicaties vaak een problematisch aspect omdat applicaties goedkoper aangeboden kunnen worden wanneer daar minder in geïnvesteerd wordt.

  *Michiel Trimpe*: Dat komt overeen met wat Externalized Authorization Management voorstelt. Neem het beheer van toegangsbeleid niet op in tenders en dwing alleen af dat de informatie om toegangsbeslissingen te kunnen nemen door de applicatie beschikbaar gemaakt wordt.

- *Gideon Zegwaard*: Om het beheer van toegangsbeleid uit te kunnen voeren vraagt inhoudelijke kennis van de applicatie. 

  *Michiel Trimpe*: De verantwoordelijkheid voor beheer wil je nog steeds op de beste plek neerleggen; zoals bij het DevOps team van de applicatie. Maar wel als beheersactiviteit en centraal beheerd.

- *René Kint, Martin van der Plas*: Is het mogelijk om Engelse termen te gebruiken? 

  *Gideon Zegwaard*: Waar we precies willen zijn adopteer de gangbare Engelse termen. Wanneer je meer uit wil leggen kan de transitie naar het Nederlands gemaakt worden. 

  **Beslissing**: Team FTV zal Engelse termen adopteren waar mogelijk. De standaard, het NLGov profiel op AuthZEN, zal ook in het Engels geschreven worden.

- *René Kint*: We hebben niet besproken waarom we dit (EAM) zouden willen? 

  *Michiel Trimpe*: Het doel van de presentatie is voor de werkgroep om het domein van Federatieve Toegangsverlening te bepalen. Er zal een andere presentatie komen met de beargumentatie.

- *Martin van der Plas*: De crux is dat er eindeloos veel Enforcement Points kunnen zijn en maar één Decision Point. Dat is een heikel punt binnen de overheid. 

  *Michiel Trimpe*: De Decision Points en alle andere componenten kunnen naar wens gedistribueerd of gecentraliseerd worden. Dat kunnen we als werkgroep in scope opnemen en daar sturing aan geven.

- *Gideon Zegwaard*: Hoe ga je om met een persoon die optreedt namens een organisatie? En als het verzoek naar een andere organisatie gaat; hoe kan die organisatie weten namens wie dit gebeurt? En mag de organisatie dat wel weten? 

  *Michiel Trimpe*: Vanuit FTV zien we dat als de informatiemodellering van het Subject die wij, als overheid, op orde moeten willen krijgen. 

  *René Kint*: Hoe we het subject willen gaan coderen en checken is een patroon dat we goed moeten doordenken voor veel use-cases. 

  *Michiel Trimpe, Gideon Zegwaard, René Kint, Martin van der Plas* brengen diverse voorbeelden naar voren binnen de justitiële keten, zorgketen, transport en machtiging waar dit een belangrijk aspect is.

- *Martin van der Plas* voor eHerkenning is 'Afgewezen, tenzij' (step-up acties) makkelijk. In het geval van machtiging is dit moeilijker. 

  *Michiel Trimpe*: In een ideale wereld is 'Afgewezen, tenzij' de procedure die je moet doorlopen om alsnog toegang verleend te krijgen. Dit kan dus ook een formulier of een verwijzing naar regels.overheid.nl zijn. In sommige gevallen, zoals een hoger eHerkenning niveau, kan de applicatie aan de kant van de aanvrager dit automatisch afhandelen voor de gebruiker.

- *René Kint*: Contracten zijn hier nog niet genoemd. 

  *Michiel Trimpe*: FTV gaat niet over contracten. Vanuit FTV gezien kan een contract de resource in een verzoek zijn; waarbij het dus bijvoorbeeld geaccepteerd of afgewezen kan worden. Als een verzoek plaatsvindt onder voorwaarde van een contract dan is het contract onderdeel van de 'context' van het verzoek. Het gebruik van de contracten in toegangsbeleid is aan organisatie en/of FDS zelf om in te vullen.

- *Gideon Zegwaard*: Je hebt beleid dat vanuit de applicatie ontwikkelaar/leverancier bepaald wordt en beleid dat vanuit de organisatie bepaald wordt. Dat zal ergens bij elkaar moeten komen. 

  **Beslissing:** FTV gaat kijken of dat meegenomen kan worden.

- *Martin van der Plas*: Hoe ga je om met self-service? Gebruikers die zelf rechten aanvragen om toegang tot een applicatie te krijgen. 

  *Gideon Zegwaard*: Applicaties definiëren rollen en als je die koppelt aan de functie die je hebt kun je het automatisch uitrollen. 

  *Michiel Trimpe*: We noemen nog steeds vaak rollen. Binnen EAM draai je het om en begin je van het toegangsbeleid. "Wie zou toegang moeten hebben?" "Alle medewerkers met uitzondering van medewerkers met dit attribuut."

  *Gideon Zegwaard:* Je kunt dus op basis van attributen, bijv. kenmerken in je HR systeem, toegang geven.

## Bepaling scope en werkwijze

- *Michiel Trimpe*: We stellen voor om de volgende interfaces te standaardiseren: tussen PEP en PDP, het informatiemodel van het toegangsverzoek, de step-up acties en residual policies ("Toegestaan, mits", cq. restbeleid.)

- *Gideon Zegwaard*: Is de PAP al gestandaardiseerd? Het liefst wil je iets hebben waarin je alle policies in kunt zien in de verschillende talen waarin ze geschreven zijn. Dat je niet afdwingt hoe je de policy uitdrukt. 

  *Michiel Trimpe*: Dit zal niet internationaal gestandaardiseerd kunnen worden. Dat zou dus een Nederlandse standaard worden. 

  **Beslissing**: Standaardisering van de PAP wordt opgenomen in de FTV scope.

- *Martin van der Plas*: Waar zitten hier de gebruikersinterfaces voor beheer? Kunnen we dat standaardiseren?

  *Michiel Trimpe*: Er is te veel diversiteit in PAP's om de beheersinterfaces te kunnen standaardiseren. De leveranciers van PAP's en PDP's zijn hiermee bezig maar er is nog geen zicht op wanneer en óf dit mogelijk is. Tot die tijd zal de interface tussen de PAP en PDP meestal ook proprietary zijn. 

  **Beslissing**: De standaardisatie voor de PAP zal zich beperken tot het bieden van *inzicht* en de policies. Deze interface zal *naast* de (proprietary) interface tussen PAP en PDP bestaan.

## Agenda volgende werkgroep.

- *Wouter Diephuis*: Wij kijken vanuit beleidsjuridische blik naar het project. Het gaat veel over de operationele invulling. Hoe regelen we de borging naar de behoeftes van de organisatie en de wet- en regelgeving. Veel antwoorden op de vragen die besproken zijn liggen in wet- en regelgeving besloten. 

  *Michiel Trimpe*: Gezien de tijd zullen we dit in het begin van de eerstvolgende werkgroep bespreken. 

  **Beslissing**: Dit wordt volgende sessie besproken.

- *Gerard van der Hoeven*: Deze sessie wilden we kennis delen. Dat is nu voornamelijk vanuit het team zelf gedaan. We zouden de volgende sessie extern kennis kunnen delen. Wat is er al en wat zijn er voor andere opties? 

  *Michiel Trimpe*: We hebben in de andere onderwerpen hierover ook de relatie met OAuth, API Design Rules en Verifiable Credentials. 

  *Martin van der Plas*: Kunnen we ook kijken welke abstracte bouwstenen er gebruikt worden? Identity Providers, DigiD, eHerkenning, Authorization Servers. 

  *Gideon Zegwaard*: Laten we dan ook het bouwblokkenmodel van DSCC erbij pakken. 

  **Beslissing**: We gaan de relatie met andere standaarden en standaard componenten bespreken. 
