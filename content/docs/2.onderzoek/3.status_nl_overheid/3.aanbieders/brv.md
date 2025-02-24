---
title: 'BRV (RDW)'
weight: 80
---

# BRV (RDW)

## Contacten
Gesprek met Michiel en Marc 05.11
- Jan Willem Spee <JWSpee@rdw.nl> ICT Architect met specialisatie Security
- Sander Jager <sjager@rdw.nl> Business Architect vanuit de divisie R&I\Registratie voertuigen
- Doelgroepen:
  - Overheidsorganisaties
    - Alle koppelingen worden vooraf door afdeling informatieverstrekking beoordeeld op doelbinding
  - Erkenninghouders
    - Garages die tenaamstellingen en keuringen doen
    - Krijgen een certificaat van RDW, die geven ze zelf uit, zelf handhaving
  - Gemeenten
    - Eigen applicatie en hardware voor aanvraag en uitgifte van rijbewijzen
  - Burgers
    - Buiten scope
- Soorten koppelingen
  - API
  - Portalen
  - Leveringen

Vervolggesprek Michiel en Marc 04.12
- Sander Jager
- Alfred Velthuis, IT arch
- Gerard Hekkelman, adviseur. Zit in strategisch FDS overleg met Mike en Ronald

- Volume is groot, 10 miljoen per dag, miljarden per jaar, 40.000 identiteiten. belang is groot. 'veel te verdedigen'
- Werken vooral met Microsoft, aangevuld waar nodig. Layer7, Anogio. RBAC.
- Hebben al actief gekeken naar PBAC. Bezwaar dat maakbaarheid laag
- Willen vooral opruimen voordat/als er iets nieuws komt. Er is al heel veel, en het komt er alleen maar bij

Zijn bezig met vernieuwing rondom access control, component IGA (Identity Governance & administration?). Er gaat in 
februari een aanbesteding de markt op. We gaan kijken of onze specificatie en hun aanbesteding uitlijnen. 

Vervolgafspraak de diepte in met Alfred, Michiel plant.

## Links
- https://www.rdw.nl
- https://www.rdw.nl/over-rdw/dienstverlening/betaald-toegang-tot-ongevoelige-kentekengegevens
- https://www.rdw.nl/over-rdw/dienstverlening/open-data
- https://opendata.rdw.nl/

## Fragmenten
- .

## Observaties
- Open Data is een set van (te downloaden) bestanden, en via https (Socrata Open Data API) te bevragen met een API-key
- de digitale berichtenuitwisseling maakt gebruik van XML-berichten via https; aan beide zijden beveiligd met certificaten
