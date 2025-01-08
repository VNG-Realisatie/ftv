---
Title: Proefopstelling
weight: 10
---

# Proefopstelling

De proefopstelling laat zien hoe FTV in de praktijk kan werken, door een aantal use cases te realiseren.

## Doel

Voor het project dient de proefopstelling als:
- instructiemateriaal
- bewijsmateriaal
- discussiestuk
- eventueel als testomgeving voor prestatietests

## Onderwerp

Doel van dit stelsel is dat de gemeente bij kan houden welke laadpalen er zijn en wie de vergunning daarvoor heeft.
Er mogen niet te veel laadpalen in een gebied zijn, voor de energievoorziening en de omgevingsregels. 
 
## Regels
- De gemeente heeft per besluit toestemming van RvIG om in de BRP gegevens op te zoeken, en van de RDW om voertuigen in de BRV op te zoeken. Grondslag daarvoor is nummer 5, 'om een taak van algemeen belang uit te voeren'. Doelbinding is de registratie van laadpalen, waarvoor de gemeente een besluit heeft aangenomen.
- De gemeente heeft vastgelegd dat voor laadpaalvergunningen een beperkte deelverzameling van persoons- en voertuiggegevens voldoende is:
    - Persoonsgegevens: BSN, NAW en meerderjarigheid
    - Voertuiggegevens: kenteken, uitstootklasse 
- Inzage in de vergunningen is toegestaan aan alle medewerkers van de afdeling burgerzaken
- De gemeente heeft voor het beheer van de vergunningen een opleiding gemaakt, en vereist voor aanpassingen aan de registratie dat het bijbehorende examen niet langer dan 1 jaar geleden met goed gevolg is afgelegd.

## Use case 1: vergunning aanvragen

- Een burger kan een laadpaalvergunning aanvragen. Daarvoor zijn naam, postcode en huisnummer nodig. Een medewerker maakt in het zaaksysteem een zaak met zaaktype 'Aanvragen laadpaal' aan met die gegevens.
- Het zaaksysteem zoekt de persoon op in de BRP met postcode en huisnummer, en vindt het BSN.
- Vervolgens zoekt het systeem op BSN in de BRV de voertuigen die op de persoon geregistreerd staan. 
- Als daar minstens 1 elektrisch voertuig bij zit, en de persoon heeft nog geen laadpaal op dat adres, dan wordt de vergunning toegekend.

## Opstelling

De proefopstelling is een wel heel eenvoudig federatief datastelsel, als volgt:

![Proefopstelling overzicht](/images/4.1proefopstelling_overzicht.png)

## Opstelling zaaksysteem

![Proefopstelling zaaksysteem](/images/4.1proefopstelling_zaaksysteem.png)

De opstelling heeft de volgende componenten:
- Het zaaksysteem is een applicatie die zelf geen gegevens bijhoudt. Voor laadpalen kunnen aanvragen worden toegevoegd, goedgekeurd of afgekeurd.
- Omdat het systeem persoonsgegevens verwerkt (personen en voertuigen opzoekt) moet het een logboek dataverwerkingen bijhouden. Hier wordt de LDV referentie-implementatie gebruikt
- Om te communiceren met registraties, zowel binnen als buiten de gemeente, is er een gateway.
De gateway heeft een Policy Enforcement Point (PEP) om van elke verbinding de toegang te controleren. We kiezen hier voor de referentie-implementatie van FSC.
- Als Policy Decision Point (PDP) kiezen we Open Policy Agent (OPA)
- Als Policy Administration Point (PAP) kiezen we de FTV referentie. Deze gebruikt het bestandssysteem voor de opslag van policies. 
Er is een command line interface (CLI) om policies toe te voegen, bij te werken en te verwijderen
De policies worden door een push-interface aan OPA doorgegeven: elke wijziging wordt direct doorgegeven.
- Als PIP wordt de FTV referentie gebruikt.

## Opstelling registratie laadpalen

De registratie van laadpalen is voor deze opstelling heel simpel gehouden: er is alleen een lijst met palen, met velden:
 
- Postcode
- Huisnummer
- Kenteken

Er zit geen toegangscontrole op: de medewerkersautorisatie wordt door het zaaksysteem gedaan, en de toegang tot de 
registratie als service door de gateway.

## Opstelling basisregistraties

![Proefopstelling zaaksysteem](/images/4.1proefopstelling_stelsels.png)

Er zijn twee registraties, BRP en BRV, met de volgende onderdelen:

- Elk een eigen gateway. We kiezen twee verschillende leveranciers, om te laten zien dat deze uitwisselbaar zijn in het stelsel
- Eenvoudige BRP en BRV services, met bijbehorende eenvoudige opslag. De 
- Elk een eigen LDV referentie om de uitgevoerde verwerkingen bij te houden. Aanroep is de verantwoordelijkheid van de service.
- Elk een residual policy processor, die deelpolicies uitvoert die de afnemer niet kon uitvoeren. Er zijn ook hier twee verschillende 
gekozen, om twee alternatieve methodes te laten zien.

De registraties delen een toegangsverleningssysteem. 
Dit is voor het gemak van de proefopstelling, normaliter zal dat niet het geval zijn. 
De onderdelen zijn herkenbaar als dezelfde als aan de zaaksysteem kant, maar dan:
- Cerbos als PDP
- Git als opslag, met Gitlab als interface, zowel de service naar de PDP als de web applicatie voor policy beheer.