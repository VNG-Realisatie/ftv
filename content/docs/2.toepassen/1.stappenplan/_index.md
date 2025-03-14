---
Title: Stappenplan
bookCollapseSection: true
weight: 10
---

# Stappenplan

Het opstellen en in productie brengen van regels hoeft niet ingewikkeld te zijn. Onderstaande stappen zijn een manier om
het proces gestructureerd te doorlopen en in elke fase de juiste mensen te betrekken.

**1. Use case**

Formuleer eerst de use cases. Doe dit samen met alle stakeholders, zoals de applicatie/register-eigenaar, beveiligingsverantwoordelijke,
beheerder en ontwikkelaar. Dit geeft een duidelijk afgebakende scope en meetbaar doel

**2. Requirements**

Schrijf de eisen aan de oplossing uit, in een precieze vorm. Dit zijn de regels waaraan de gegevensuitwisseling gebonden
zijn, dus die straks in de regelbestanden gaan komen. Door hier al te kiezen om in de regels de subject, actie, resource en context te
benoemen wordt de

Een voorbeeld: medewerkers (subject) mogen een zaak (resource) afsluiten (actie) als ze afdelingshoofd zijn en de zaakstatus
'klaar om af te sluiten' is.

**3. Attributen**

In de requirements is nu direct te lezen welke attributen nodig zijn. In het voorbeeld is 'afdelingshoofd' een attribuut van het subject 'medewerker',
en 'zaakstatus' een attribuut van de resource 'zaak'. Van elk attribuut moet bepaald worden of het beschikbaar is voor de beslismodule.
Uit deze stap kan blijken dat er additionele koppelingen nodig zijn om de gegevens compleet te hebben.

**4. Policies schrijven**

Met de informatie uit bovenstaande stappen is het schrijven van de policies zelf rechttoe rechtaan geworden.
Er is specialistische kennis nodig van de regeltaal en van de gegevensmodellen van subject, actie, resource en context,
en dus zeker niet eenvoudig, maar specificaties en haalbaarheid is vooraf duidelijk.

**5. Testen**

Het opstellen van goede tests gaat vooral over het slim samenstellen van testdata. De data moet zoveel mogelijk voorkomende gevallen,
zowel positief (mag) als positief (mag niet), afdekken. Dit is een taak van een business analist. Het inregelen van de tests
is wat een ontwikkelaar zal doen door de testdata en verwachte uitkomsten in een systeem te plaatsen. Geautomatiseerd uitvoeren van de tests
kan dan zo vaak uitgevoerd worden als nodig: na het opstellen of wijziging van de regel, maar ook na het aanpassen van andere
regels of een verandering in de API's.

**6. Inrichten van de infrastructuur**

In deze stap wordt de gekozen beslismodule (PDP) neergezet (deployed) en aangesloten op de juiste toegangshekken (PEPs). Zie
eventueel de sectie keuze software om te checken dat de gekozen componenten inderdaad bij elkaar passen en een compleet geheel vormen.

De PEP kan deel uitmaken van een
applicatie, een API, of een API-gateway. Zolang de component volgens de AuthZEN NL Gov standaard gebouwd is zal de aansluiting geen
verdere programmeeractiviteit vergen. Het deployen van de PDP vergt kennis van de infrastructuur (cloud infra, helm, kubernetes).

**7. Distributie van regels**

In deze stap worden de regels van het centrale beheersysteem overgebracht naar de vaak veel beslissystemen in de infrastructuur.
Het systeem weet aan de hand van de doelbinding welk systeem welke regels nodig heeft. De beslissystemen hebben zo alleen relevante regels en
alleen de laatste versie en kunnen in dat vertrouwen beslissingen nemen. Dit is belangrijk voor goede prestaties: regels worden immers
heel vaak uitgevoerd en maar zelden aangepast.