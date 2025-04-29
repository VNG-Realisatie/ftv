---
weight: 30
title: "Standaarden"
---

# Bestaande standaarden

In dit project zijn we op zoek naar een standaard die er voor zorgt dat de interoperabiliteit verbeterd
wordt en de leveranciersafhankelijkheid afneemt. Dat wil zeggen dat systemen die dezelfde standaard implementeren onderling
uitwisselbaar zijn, zonder significante aanpassingen aan de rest van het landschap.
Daarvoor is het nodig dat de in- en uitgaande interfaces van een EAM-oplossing zijn bepaald.

De eerder beschreven regeltalen zijn geen complete standaarden voor de EAM-manier van werken,
maar beschrijven hooguit een deel van de PAP. Er zijn echter wel initiatieven om tot een complete te standaard te komen.

Dit zijn de belangrijkste:

## OpenID AuthZEN

OpenID heeft een werkgroep opgericht onder de naam [AuthZEN](https://openid.net/wg/authzen/).
Deze heeft inmiddels een definitie van de PEP/PDP interface-aangenomen, en deze is geïmplementeerd door een aantal
van de grote leveranciers van gateways en toegangsproducten. Daarmee is dit het enige project met concreet werkende implementaties van een
open standaard. De groep werkt verder aan uitbreiding met de DPD/PIP interface.

## Europese standaarden

De Europese datastrategie is de originele aanjager van het hele federatieve werken. De Nederlandse IBDS komt daar ook uit voort.

Naast de initiatieven in de lidstaten zijn er ook een aantal initiatieven die direct onder de EU-vlag en met EU-financiering aan de slag zijn gegaan.

De [International Data Spaces Association](https://internationaldataspaces.org/) aan een serie standaarden, waarvan [IDSA Usage Control Language](https://international-data-spaces-association.github.io/DataspaceConnector/Documentation/v5/UsageControl) specifiek gaat over toegangsverlening. Daarnaast wordt er aan een voorziening gewerkt, de [IDS connector](https://international-data-spaces-association.github.io/DataspaceConnector/Introduction).

Op soortgelijke wijze is [Gaia-X Federated Data Infrastructure (GFDI)](https://gaia-x.eu/) een architectuur en set standaarden. 
De [Gaia-X Federation (GXFS)](https://www.gxfs.eu/) is een set van dataspace-specifieke implementaties van GFDI .

Vanuit de Europese Unie is het programma [Smart Middleware Platform (Simpl)](https://simpl-programme.ec.europa.eu/) gestart, dat een complete infrastructuur beoogt te realiseren, gebaseerd op de IDSA standaarden en geïntegreerd met GXFS.

Dan is er nog de Eclipse Foundation die een grote rol als facilitator speelt van het werk van SIMPL, IDS en Gaia-X.

Het hele collectief heeft nog weinig concrete resultaten opgeleverd. De voortgang is langzaam, deels door de grote en politieke ambities en deels door de grote groep die eraan werkt.

FTV houdt de ontwikkelingen van afstand in de gaten, maar neemt niet actief deel.

## NEN JTC 25

Tegelijk heeft NEN een begin gemaakt met een comité om ook aan standaardisatie van de Europese datastrategie te werken,
de [CEN-CENELEC JTC25](https://www.nen.nl/nieuws/data-verzamelen-opslaan-en-uitwisselen/nieuwe-europese-normalisatiegroep-voor-data-en-cloud-van-start/). JTC 25 is nog in een vroeg stadium. FDS neemt deel aan de JTC, FTV niet.

## iSHARE

[iSHARE](https://ishare.eu/) is een standaard voor gegevensuitwisseling die van origine uit de transportsector komt, met betrokkenheid van het Ministerie van Infrastructuur en Waterstaat (MinIenW). [Toegangsverlening met EAM is onderdeel van de standaard](https://trustbok.ishare.eu/apply-ishare/authorisation). De principes van iSHARE en FTV zijn vrijwel in lijn, waardoor samenwerking voor de hand ligt. iSHARE zelf is een open standaard, maar wordt bestuurd door iSHARE foundation, een niet-open governance structuur.

Er zijn een heel aantal initiatieven die iSHARE gebruiken, in productie. Deze gaan vooral over de transportsector, maar ook bij een aantal overheidsinitiatieven (DSGO, DVU).

## FHIR

De [HL7 international](https://www.hl7.org/index.cfm) stichting beheert de FHIR standaard, een uitwisselingsstandaard specifiek voor de zorgsector. Hierin zitten [Data Access Policies](https://build.fhir.org/ig/HL7/data-access-policies/index.html), een vorm van PBAC.