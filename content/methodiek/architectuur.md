---
type: 'chapter'
title: "Architectuur"
---
{{< chapter/section title="Architectuur" >}}
FTV introduceert Externalized Access Management (EAM) als standaard methodiek voor toegangsverlening. Dit omvat onder andere architectuurpatronen zoals PBAC, ABAC en ReBAC.
{{< /chapter/section >}}

{{< chapter/section title="Huidige situatie" >}}
Momenteel zijn zowel de toegangslogica als de informatie voor het maken van toegangsbeslissingen (beslisgegevens) vaak versnipperd over het IT-landschap.

{{< img-url "images/1.3.huidige_situatie.png" "Huidige situatie" >}}

Dit veroorzaakt een grote diversiteit van talen, configuraties, build en deployment processen voor toegangslogica. Dat maakt het moeilijk om toegangsbeleid centraal te overzien, laat staan dit verantwoord te beheren.

Voor de beslisgegevens worden ook diverse bronnen gebruikt. Deze hebben vaak geen historie of logging waardoor beslissingen achteraf niet meer verantwoord kunnen.
{{< /chapter/section >}}


{{< chapter/section title="Nieuwe situatie" >}}
In een EAM stellen componenten op gestandaardiseerde wijze toegangsverzoeken en worden vereiste beslisgegevens op een uniforme en herleidbare wijze verzameld.

{{< img-url "images/1.3.nieuwe_situatie.png" "Nieuwe situatie" >}}

Hierdoor wordt toegangslogica centraal inzichtelijk en beheersbaar en kunnen historische beslissingen verantwoord worden.
{{< /chapter/section >}}

{{< chapter/section title="EAM architectuur Nederlandse overheid" >}}
Voor gebruik door de Nederlandse overheid stelt FTV de volgende architectuur voor.

{{< img-url "images/1.3.standaard_componenten.png" "Standaard componenten" >}}

- Het Policy Enforcement Point (**PEP**) vat een ontvangen verzoek samen in een toegangsverzoek en zorgt dat de ontvangen toegangsbeslissing correct uitgevoerd wordt (enforcement.)
- Het Policy Decision Point (**PDP**) ontvangt het toegangsverzoek en neemt een toegangsbeslissing op basis van het toegangsbeleid en additionele informatie.
- Het Policy Access Point (**PAP**) beheert het toegangsbeleid en maakt deze beschikbaar aan de PDP.
- Het Policy Information Point (**PIP**) haalt additionele informatie op wanneer dat nodig is voor het maken van de toegangsbeslissing.
- Betrouwbare bronnen met ondersteuning voor historie kunnen direct door de PIP bevraagd worden. Deze informatie hoeft dan niet gelogd te worden voor verantwoording.
- Om historische toegangsbeslissingen te kunnen verantwoorden moet informatie uit andere bronnen gelogd worden.
{{< /chapter/section >}}

{{< chapter/section title="Informatiemodel van toegangsverzoeken" >}}
Eén van de belangrijkste aspecten van de meerwaarde van Externalized Access Management is het modelleren van het informatiemodel voor toegangsverzoeken.

Binnen Externalized Access Management worden hiervoor vier basis entiteiten gedefinieerd:

{{< img-url "images/1.3.informatiemodel.png" "Entiteiten informatiemodel" >}}

1. Subject. De aanvrager van het verzoek.
2. Action. De gegevensverwerking die aangevraagd wordt.
3. Resource. De gegevens of het object waar de gegevensverwerking op uitgevoerd moet worden.
4. Context. De bredere omgeving waarin het gegevensverzoek gedaan is. Zoals de tijd bijvoorbeeld.

Binnen deze basis entiteiten kan elke organisatie zijn eigen informatiemodel definieren met behulp van [Metamodel Informatiemodellering (MIM)](https://www.geonovum.nl/geo-standaarden/metamodel-informatiemodellering-mim).
{{< /chapter/section >}}

{{< chapter/section title="EAM in een federatief stelsel" >}}
In een federatief stelsel worden toegangsregels op [logisch niveau](https://docs.geostandaarden.nl/mim/mim/#beschouwingsniveau-3-logisch-informatie-of-gegevensmodel) gedefinieerd. Deze worden dan per organisatie vertaald naar [technisch niveau](https://docs.geostandaarden.nl/mim/mim/#beschouwingsniveau-3-logisch-informatie-of-gegevensmodel).

{{< img-url "images/1.3.federatieve_toegangsregels.png" "Federatieve toegangsregels" >}}

Zo kunnen organisaties zelf een EAM implementatie kiezen en toch voldoen aan de regels van een federatief stelsel..

Verder kunnen met behulp van gestandaardiseerde API's toegangsregels en historische toegangsbeslissingen worden ingezien bij deelnemers aan het federatieve stelsel.

{{< img-url "images/1.3.federatieve_verantwoording.png" "Federatieve EAM" >}}

De toegangsregels voor de inzage API's kunnen binnen het stelsel afgesproken worden of door organisaties individueel bepaald worden.
{{< /chapter/section >}}