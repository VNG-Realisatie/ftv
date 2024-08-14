---
weight: 5020
---

# Haal Centraal

## References
- https://vng.nl/projecten/haal-centraal-gegevens-ophalen-bij-basisregistraties
- https://github.com/VNG-Realisatie/Haal-Centraal
- https://vng-realisatie.github.io/Haal-Centraal/
- https://haalcentraal.pleio.nl/blog/view/f27ce9be-32c0-415b-89a6-5fff97956d3c/van-haal-centraal-naar-regie-op-apis
- https://github.com/VNG-Realisatie/Haal-Centraal-common/blob/master/docs/design_decisions.md

## Snippets
- Het programma Haal Centraal is afgerond. Vanuit het programma zijn API’s (Application Programming Interfaces) ontwikkeld waarmee een gemeente basisgegevens rechtstreeks bij de landelijke registraties kan bevragen.
- De kans op fouten wordt kleiner doordat de landelijke registraties de gegevens kant -en-klaar aanleveren. Dit kan leiden tot betere dienstverlening aan burgers en bedrijven.
- Uw organisatie kan sneller inspelen op ontwikkelingen. Een aanpassing bij de landelijke registratie is direct zichtbaar voor uw afnemers.
- De beheerkosten zijn lager. U kunt eenvoudig aansluiten, u maakt minder of geen kopieën en u hoeft geen gegevensmagazijn meer te beheren.
- Het beheer van de API's is eenvoudiger: de API's worden zo ontwikkeld dat afnemers meestal niets hoeven aan te passen als er nieuwe functionaliteiten bijkomen. Uw leveranciers kunnen zich volledig richten op het toevoegen van waarde voor uw burgers, bedrijven en medewerkers.
- BAG, BGT, BRK, BRP, HR, WOZ

## Observations
- HaalCentraal is a set of APIs at the side of the basic registrations (basisregistraties). It supports authentication & authorization, but only on the side of the data suppliers.
- HaalCentraal only defines GET requests.
