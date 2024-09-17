---
Title: Praktijktest
weight: 10
---

# Praktijktest

Om een indruk te krijgen hoe goed en gemakkelijk een implementatie zou kunnnen werken doen we zelf een
aantal praktijktesten.

## Doel

Het doel is om een kwalitatief en kwantitatief de implementatie te beoordelen op:
- Documentatie: is er online en actuele documentatie van specificaties en software? Is er lesmateriaal?
- Beschikbaarheid van de software: zijn er openbare downloads van goede kwaliteit? Zijn er SaaS oplossingen?
- Testomgeving: zijn er omgevingen waar je de specificatie en software kan testen, online of downloadbaar?
- Complexiteit: hoe moeilijk is het om de software te installeren, op een eigen omgeving of als Saas?
- Functionaliteit: kan het wat we nodig hebben voor het stelsel van basisregistraties en/of FDS?
- Snelheid: hoe zijn de prestaties, hoe schaalt het bij veel bevragingen en regels?

## Testopstelling

We maken testopstellingen met de volgende elementen:
- Een gebruikersapplicatie, van eenvoudig naar uitgebreid:
    - Een aanroep vanuit een opdrachtregel (curl), 
    - Een webapplicatie met een interface voor parameters en/of configuratie
    - Geautomatiseerde tests die parameters en/of configuraties uit een bestand lezen en uitvoeren
- Een connectiviteitslaag. Dat gaat ook van simpel rechtstreeks, naar uitgebreid met FSC
- Een aantal diensten die aangeroepen worden, bv BRP, BRV, BAG en HR
- Een of meerdere PBAC-implementaties die getest worden

## Use cases

### BRP
Zoek in de BRP met de volgende API's:
- Zoek persoon op BSN
- Zoek meerdere personen op postcode en huisnummer

Gebruik daarbij deze regels:
- Geen policy: niets mag
- 'Alles mag' policy
- Verticaal filteren: geboortedatum mag niet, wel leeftijd 
- Horizontaal: personen gevlagd met 'geheimhouding persoonsgegevens' mogen alleen als daarvoor een verklaring is
- Horizontaal: alleen personen in de eigen gemeente; de eigen gemeente staat in een verklaring
- Richting: op BSN mag wel, op postcode en huisnummer mag niet

### BRV
BRV:
- Zoek voertuig op kenteken

Met regels:
- Verticaal filteren: kleur mag niet
- Horizontaal: alleen personenauto's mogen 

### Eigen service
- Met andere operaties: mutaties, verwijderen, opvragen om te delen

## Testmethode
- Eerst handmatig, eventueel met UI, daarna geautomatiseerd de cases uitvoeren.
- Telkens testen of de resultaten kloppen met de verwachting en hoe lang de uitvoering duurt.
- Stresstest om te kijken waar een bottleneck of omslagpunt ligt
