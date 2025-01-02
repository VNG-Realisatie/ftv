---
Title: Proefopstelling
weight: 10
---

# Proefopstelling

De proefopstelling laat zien hoe FTV in de praktijk kan werken, door een aantal use cases te realiseren.

## Doel

De proefopstelling dient als:
- instructiemateriaal
- bewijsmateriaal
- discussiestuk
- eventueel als testomgeving voor prestatietests

## Testopstelling

We maken testopstellingen met de volgende elementen:
- Een gebruikersapplicatie, van eenvoudig naar uitgebreid:
  - Een aanroep vanuit een opdrachtregel (curl)
  - Geautomatiseerde tests die parameters en/of configuraties uit een bestand lezen en uitvoeren
  - Een webapplicatie met een interface voor parameters en/of configuratie
- Een connectiviteitslaag. Dat gaat ook van simpel rechtstreeks, naar uitgebreid met FSC
- Een aantal diensten die aangeroepen worden, bv BRP, BRV, BAG en HR
- Een of meerdere PBAC-implementaties die getest worden

![4.1proefopstelling.png](/images/4.1proefopstelling.png)

## Use cases

1. BghU (Belastingsamenwerking gemeenten en hoogheemraadschap Utrecht) raadpleegt BRP. 
   - RvIG Policy zegt dat alleen personen met 
     - afnemersindicatie=252601
     - reden opschorting = blanco 
     - gemeente van inschrijving in (0310 || 0312 || 0321 || 0331 || 0335 || 0340 || 0344 || 0352 || 0353 || 0355 || 0356 || 0589 || 0632 || 1581 || 1904)
     - functie adres != B
     - teruggegeven mogen worden.
   - BghU policy zegt dat alleen medewerkers van afdeling X tijdens kantooruren mogen zoeken
    
   a. zoek op BSN, geef wel of niet terug

   b. zoek vrij, geef alleen gevonden terug


2. TBD