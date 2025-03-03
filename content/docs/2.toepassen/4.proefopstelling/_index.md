---
Title: Proefopstelling
weight: 40
---

# Proefopstelling

De proefopstelling laat zien hoe FTV in de praktijk kan werken, door een eenvoudig federatief datastelsel in te richten,
waarvan in ieder geval de componenten rondom toegangsverlening compleet zijn. Door een aantal use cases te realiseren wordt
de werking geïllustreerd.

## Opstelling

De proefopstelling is een wel heel eenvoudig federatief datastelsel, als volgt:
- Een zaaksysteem voor gemeentemedewerkers
- Een of meer registraties
- De BRP
- De BRV

De stippellijn geeft de grens aan tussen de gemeentescope en het stelsel

![Proefopstelling overzicht](/images/4.1proefopstelling_overzicht.png)

### Opstelling zaaksysteem

![Proefopstelling zaaksysteem](/images/4.1proefopstelling_zaaksysteem.png)

Het zaaksysteem heeft de volgende componenten:
- De zaak-applicatie zelf. 
- Omdat het systeem persoonsgegevens verwerkt (personen en voertuigen opzoekt) moet het een logboek dataverwerkingen bijhouden. Hier wordt de LDV referentie-implementatie gebruikt
- Om te communiceren met registraties, zowel binnen als buiten de gemeente, is er een gateway. We kiezen hier voor de referentie-implementatie van FSC.
  De gateway heeft een Policy Enforcement Point (PEP) die elke verbinding op toegang laat controleren.
- Als Policy Decision Point (PDP) kiezen we Open Policy Agent (OPA)
- Als Policy Administration Point (PAP) kiezen we de FTV referentie. Deze gebruikt het bestandssysteem voor de opslag van policies.
  Er is een command line interface (CLI) om policies toe te voegen, bij te werken en te verwijderen
  De policies worden door een push-interface aan OPA doorgegeven: elke wijziging wordt direct doorgegeven.
- Als PIP wordt de FTV referentie gebruikt.

### Opstelling basisregistraties

![Proefopstelling zaaksysteem](/images/4.1proefopstelling_stelsel.png)

Er zijn twee registraties, BRP en BRV, met de volgende onderdelen:

- Elk een eigen gateway. We kiezen twee verschillende leveranciers, om te laten zien dat deze uitwisselbaar zijn in het stelsel
- Eenvoudige BRP en BRV services, met bijbehorende eenvoudige opslag.
- Elk een eigen LDV referentie om de uitgevoerde verwerkingen bij te houden. Aanroep is de verantwoordelijkheid van de service.
- Elk een residual policy processor, die deelpolicies uitvoert die de afnemer niet kon uitvoeren. Er zijn ook hier twee verschillende
  gekozen, om twee alternatieve methodes te laten zien.

De registraties delen een toegangsverleningssysteem.
Dit is voor het gemak van de proefopstelling, normaliter zal dat niet het geval zijn.
De onderdelen zijn herkenbaar als dezelfde als aan de zaaksysteem kant, maar dan:

- Cerbos als PDP
- Git als opslag, met Gitlab als interface, zowel de service naar de PDP als de web applicatie voor policy beheer.