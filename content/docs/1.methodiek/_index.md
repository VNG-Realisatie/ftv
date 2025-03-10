---
weight: 10
bookCollapseSection: true
title: "Methodiek"
---

# Methodiek

Het verlenen van toegang tot API's is een essentieel onderdeel van het verantwoord omgaan met gegevens. In tegenstelling tot identificatie en authenticatie is toegangsverlening (c.q. authorisatie) echter nog zeer beperkt gestandaardiseerd. Dit maakt het moeilijk toegangsbeleid en toegangsbeslissingen effectief te verantwoorden. 

Daardoor moeten aanbieders kiezen tussen het *proberen* de rechtmatigheid van elk toegangsverzoek te controleren (**don't trust** but verify) of de afnemers te vertrouwen zonder verantwoording te kunnen vragen (trust but **don't verify**.)

FTV biedt een gestandaardiseerde werkwijze voor het verantwoord verlenen van toegang tot gegevens. Dat maakt het mogelijk om toegangsverzoeken te verantwoorden zonder de rechtmatigheid van elk verzoek vooraf te hoeven bepalen.

Dit maakt het mogelijk om op basis van **trust and verify** de verantwoordelijkheid bij de afnemer te leggen. Dat is waar deze juridisch over het algemeen ook ligt. Dit wordt daarmee ook gezien als één van de drie vereiste standaarden voor een effectief [Federatief Datastelsel] naast [Federated Service Connectivity](https://fsc-standaard.nl/) en [Logboek Dataverwerkingen](https://logius-standaarden.github.io/logboek-dataverwerkingen/).

De methodiek wordt beschreven vanuit twee perspectieven:

2. een [technische architectuur](1.architectuur), waarin zowel de componenten van de toegangsoplossing als de plaatsing in het wijdere IT-landschap wordt geschetst.
3. een [technische standaard](2.standaard) die beschrijft hoe de toegangsoplossing met de omgeving samenwerkt.
