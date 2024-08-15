---
weight: 5010
---

# Digikoppeling

## Links
- https://www.logius.nl/domeinen/gegevensuitwisseling/digikoppeling
- https://www.logius.nl/domeinen/gegevensuitwisseling/digikoppeling/documentatie
- https://gitdocumentatie.logius.nl/publicatie/dk/architectuur/
- https://www.logius.nl/domeinen/gegevensuitwisseling/digikoppeling/landelijke-voorzieningen
- https://www.logius.nl/actueel/eenvoudiger-data-delen-door-ondersteuning-van-rest-apis-digikoppeling
- https://logius-standaarden.github.io/Digikoppeling-Koppelvlakstandaard-REST-API/
- https://gitdocumentatie.logius.nl/publicatie/dk/idauth/
- https://www.softwarecatalogus.nl/pakketten?zoek=digikoppeling

## Fragmenten
- Digikoppeling is een set van standaarden, die logistieke afspraken bevat voor elektronisch berichtenverkeer tussen (overheids)organisaties. Zoals een brief in een envelop gaat voor verzending, zo gaat een elektronisch bericht in een digitale verpakking. Deze digitale verpakking is Digikoppeling. Digikoppeling gaat niet over de inhoud van het bericht.
- De vraag is of dat niveau het juiste niveau is voor autorisatie of dat er nog verfijning nodig is. Een serviceaanbieder kan theoretisch op verschillende manieren de autorisatie en de daarvoor benodigde identificatie inrichten. De aanbieder zou bijvoorbeeld kunnen stellen, dat medewerker X van afnemersorganisatie A een service wel mag afnemen en medewerker Y van diezelfde organisatie niet.
- Er bestaat brede consensus (ook in andere landen), dat dit ongewenst is. Enerzijds is namelijk de afnemende organisatie verantwoordelijk voor eigen informatiebeveiliging, dus voor het op de juiste wijze autoriseren van de eigen medewerkers. Anderzijds wordt de organisatie die de service aanbiedt dan niet met medewerkers van een ander geconfronteerd en om dezelfde reden ook niet met 'afdelingen' of informatiesystemen van die organisatie. Het is gewenst is om alleen maar te autoriseren op het niveau van een organisatie.
- Als dat het autorisatieprincipe is, dan stelt dat als eis aan de identificatie, dat alleen de identiteit van de afnemerorganisatie vastgesteld (geauthenticeerd) hoeft te worden.
- De vastlegging van de gebeurtenis van afnemen gebeurt door de aanbieder op het niveau van afnemerorganisatie. Het is niet nodig en niet gewenst om dat te doen op een niveau binnen die afnemer zoals medewerker afdeling, systeem of wettelijke taak.
- WUS = WDSL, UDDI & SOAP
- ebMS2 = ebXML Messaging Services (OASIS)
- REST API
- Grote Berichten

## Observaties
DigiKoppeling REST APIs does not appear to have support for authorization.
