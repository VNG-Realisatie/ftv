---
weight: 120
title: 'RAWA'
---

# RAWA

## Links
- https://vng-realisatie.github.io/RAWA/
- https://vng-realisatie.github.io/RAWA/uitwerking/achtergrond/
- https://vng-realisatie.github.io/RAWA/uitwerking/terminologie/

## Fragmenten
- De wens om te komen tot een referentiearchitectuur rondom het werken met API’s is ontstaan vanuit de realisatie dat de huidige manier waarop veel gemeenten hun identiteiten en toegangsbeheer hebben ingericht niet voldoet in een informatievoorziening die is gebaseerd op een API-landschap.
- Identiteitenbeheer en toegangsbeheer zijn verschillende vakgebieden die een onderlinge relatie kennen maar afzonderlijk beschouwd en behandeld kunnen worden. Het onderscheid tussen identiteiten- en toegangsbeheer is relevant als we het hebben over moderne technologieën rondom API’s.
- Het RBAC-model kent zijn mogelijkheden, maar ook zijn beperkingen. Het grote voordeel van dit model is dat het autorisatiebeheer door slim gebruik te maken van rollen grotendeels geautomatiseerd worden.
- Het eerste knelpunt is geneste rollen en groepen. Denk hierbij bijvoorbeeld aan groepen die lid zijn van een andere groep. Het zicht op de autorisaties raakt door deze nesting snel verloren. De vraag wie mag wat, en waarom iemand iets mag is bij het nesten van rollen al snel onduidelijk.
- Het is bijvoorbeeld goed mogelijk dat iemand vanuit verschillende toegekende rollen dezelfde autorisatie heeft. Bij het gebruik van de autorisatie is dan niet te herleiden vanuit welke specifieke rol iemand handelt. Het is wel bekend dat de persoon een autorisatie heeft, maar waarom diegene de autorisatie gebruikt is onduidelijk.
- Functiescheiding is feitelijk een risicomanagement methodiek om fraude, misbruik en fouten bij het uitvoeren van processen te voorkomen.
- In dat geval is de context (een eigen aanvraag) dus bepalend voor de toegang. Het RBAC-model voorziet niet in deze contextbeperking.
- Dus als bijvoorbeeld iemand alleen onder kantooruren mag werken, of alleen vanaf een bepaalde locatie voorziet het RBAC-model niet in deze context beperking.
- Binnen de overheid zijn de providers die gebruikt mogen worden gelimiteerd vanuit wetgeving. De Wet digitale overheid (Wdo) beschrijft de eisen die gesteld worden aan identity providers die in het publieke domein gebruikt mogen worden. Tot op heden zijn dit DigiD, eHerkenning en eIDAS. In de toekomst ontstaat ook de mogelijkheid voor private partijen (zoals IRMA en Itsme) om als identity provider voor de overheidsdiensten op te treden.
- In de volgende evolutie van informatiesystemen die momenteel plaats aan het vinden is wordt de toegang tot applicaties (APIs) geregeld via een API-gateway. In deze situatie wordt door de applicatie zelf nog steeds de autorisatie uitgevoerd. De API-gateway kan bepalen of een identiteit de API mag aanroepen maar de API zelf bevat nog toegangsregels die (nader) bepalen of de functie door de identiteit uitgevoerd mag worden. Een laatste stap die in de komende jaren genomen zal worden is het verwijderen van de toegangsregels uit de APIs en het centraal definiëren en afdwingen van deze regels.

## Observaties
- dit project heeft uitgangspunten die voor ons project identitiek zijn
