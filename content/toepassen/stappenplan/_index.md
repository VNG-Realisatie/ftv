---
Title: Stappenplan
type: 'chapter'
---
{{< chapter/section title="Stappenplan" >}}
Het opstellen van toegangsregels vraagt om samenwerking tussen verschillende rollen.
Bestuuders, juristen, IT-architecten en developers kijken ieder vanuit hun eigen perspectief naar wat nodig is.
Door de stappen te volgen, ontstaat een set regels die klopt: juridisch, functioneel én technisch.

Dit stappenplan beschrijft zeven stappen om van een use case tot een goed werkende en uitvoerbare toegangsregel te komen. Het helpt om het proces gestructureerd aan te pakken en in elke fase de juiste keuzes te maken en de juiste rollen te betrekken.

### Voor bestuurders

Een goede toegangsoplossing begint bij duidelijke keuzes. In stap 1 wordt bepaald wie toegang nodig heeft tot welke gegevens en onder welke voorwaarden. Dit vraagt om heldere afspraken, draagvlak en een afbakening van verantwoordelijkheden. Zo ontstaat een stevige basis voor de technische uitwerking van Federatieve Toegangsverlening (FTV).

### Voor juristen

Juristen zijn betrokken bij het formuleren van de use case en het vastleggen van de voorwaarden (requirements). Daarmee wordt duidelijk wie toegang mag krijgen, op basis van welk wetsartikel dat mag en onder welke omstandigheden. Daarna wordt deze input technisch uitgewerkt.


### Voor IT-managers

Van use case tot distributie: IT-managers en architecten zijn betrokken bij alle stappen in dit plan. Denk aan het vertalen van beleid naar eisen, het inrichten van beheerprocessen en het bewaken van samenhang tussen componenten. Het stappenplan helpt om technisch én organisatorisch grip te houden op het geheel.


### Voor developers

Vanaf stap 2 is de rol van developers essentieel. Zij bouwen, testen en implementeren de toegangsregels. Denk aan het schrijven van policies, het samenstellen van testdata en het inrichten van infrastructuur en distributie. Het stappenplan biedt een duidelijke structuur om technisch solide en makkelijk te onderhouden oplossingen op te leveren.

{{< /chapter/section >}}

{{< chapter/section title="Het stappenplan" >}}
#### Stap 1. Formuleer de use case

Formuleer eerst de use case. Doe dit samen met alle stakeholders, zoals de applicatie/register-eigenaar, beveiligingsverantwoordelijke, beheerder en ontwikkelaar. Zo ontstaat een duidelijk afgebakend doel: wie moet welke taak kunnen uitvoeren en wanneer?

Voorbeeld: Bij het beoordelen van een aanvraag voor huurtoeslag haalt een medewerker persoonsgegevens op uit verschillende bronnen. Niet elke medewerker mag dat: alleen degene die de aanvraag behandelt én bevoegd is voor het bedrag, mag de gegevens bekijken.


#### Stap 2. Beschrijf de requirements

Omschrijf welke eisen (requirements) gelden voor toegang tot gegevens. Deze eisen worden straks in de toegangsregels verwerkt.
Gebruik bij de omschrijving de termen:

1.	subject (wie vraagt toegang)
2.	actie (wat wil die persoon doen)
3.	resource (waar gaat het om)
4.	context (onder welke omstandigheden)

Door de regels nu al in deze termen uit te drukken, wordt het schrijven later eenduidig en overzichtelijk.

Voorbeeld: een zaakbehandelaar (subject) mag een huurtoeslagzaak (resource) afsluiten (actie) als de zaakbehandelaar afdelingshoofd is en de zaakstatus ‘klaar om af te sluiten’ is (context).

#### Stap 3. Bepaal de attributen

In stap 2 zijn de eisen voor toegang beschreven. In stap 3 volgt de inventarisatie van de attributen die nodig zijn om die eisen uit te voeren.

Voorbeeld:

1. ‘Afdelingshoofd’ is een attribuut van het subject ‘medewerker’
2. ‘Zaakstatus’ is een attribuut van de resource ‘zaak’

Bepaal per attribuut of de informatie beschikbaar is voor de beslismodule. Soms zijn extra koppelingen nodig om de gegevens op te halen.

#### Stap 4. Schrijf de policies

Als de use case, requirements en attributen beschreven zijn, is duidelijk wat er in de policies moet komen.
Voor deze technische vertaling van de eerdere stappen naar taken die de software moet uitvoeren, is specialistische kennis nodig. Bijvoorbeeld van de regeltaal en van de gegevensmodellen van subject, actie, resource en context. Zijn de specificaties goed uitgewerkt? Dan is vooraf al duidelijk of de policies technisch haalbaar zijn.

#### Stap 5. Test de toegangsregels

Goede tests beginnen met slimme testdata. De testset moet zoveel mogelijk situaties afdekken: gevallen waarin toegang wél toegestaan is en situaties waarin dat niet zo is.
Het samenstellen van die testdata is een taak voor een businessanalist. Een ontwikkelaar zet de testdata en verwachte uitkomsten in een systeem. Daarna is het mogelijk om de tests automatisch uit te voeren, zo vaak als nodig. Bijvoorbeeld na het opstellen of wijziging van de regel, na aanpassingen in andere regels die invloed  hebben of bij een verandering in de APIs.

#### Stap 6. Richt de infrastructuur in

In deze stap wordt de gekozen beslismodule (Policy Decision Point, PDP) neergezet en aangesloten op de juiste toegangshekken (Policy Enforcement Points, PEPs).  Check vooraf of de gekozen componenten goed op elkaar aansluiten. Zie ook de checklist bij [Softwarekeuze](../softwarekeus).

De PEP kan deel uitmaken van een applicatie, een API, of een API-gateway. Als de component is gebouwd volgens de AuthZEN NL Gov-standaard, is er weinig extra programmeerwerk nodig voor de aansluiting.
Het neerzetten (deployen) van de PDP vergt kennis van de infrastructuur (cloud infra, helm, kubernetes).

#### Stap 7. Zorg voor distributie van regels

Regels worden centraal beheerd, maar moeten terechtkomen bij alle systemen die ze gebruiken. De infrastructuur bepaalt op basis van doelbinding welke regels waar nodig zijn.
De beslissystemen krijgen zo alleen relevante regels en altijd de nieuwste versie. Dit is belangrijk voor goede prestaties: regels worden vaak uitgevoerd en veel minder vaak aangepast.
{{< /chapter/section >}}
