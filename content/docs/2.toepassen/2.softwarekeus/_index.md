---
Title: Softwarekeus
weight: 20
---

# Softwarekeus

## Verdeelde markt

Toegangsverlening heeft de laatste jaren meer aandacht gekregen. Vooral door het gemeengoed worden van cloud
infrastructuur en daarbij passende gedistribueerde architectuur is de voorheen gebruikelijke werkwijze niet meer houdbaar gebleken.
Maatwerk regels, ingebouwd in software is slecht onderhoudbaar, en RBAC oplossingen zijn door 'role explosion' niet
beheersbaar op grote schaal.

De al veel langer bestaande EAM methodiek geniet nu de aandacht en het marktaandeel groeit. Er is echter geen enkel product of policytaal
die de overhand heeft, en er is geen overkoepelende standaard. De grote leveranciers van cloud infrastructuur hebben hun eigen
oplossing, en daarnaast zijn er tientallen nieuwe en bestaanden IAM bedrijven in de markt gestapt.

## Open of closed source

Elke EAM oplossing heeft als kern de beslismodule, de PDP. Daaromheen zijn er beheersmodule voor schrijven, testen, distributie en monitoring.
De meeste PDPs zijn als open source beschikbaar en vaak ook licentievrij. De modules daaromheen worden commercieel aangeboden, vaak naar keus als
uitbestede dienst (SaaS) of om zelf te beheren (on-premises). Er zit hier een duidelijke freemium strategie aan: door een goede gratis
open source PDP aan ontwikkelaars aan te bieden hoopt men een klant aan de eigen policytaal te binden en de overstap naar betaalde EAM 
als makkelijkste weg te bieden.

## Zelfbouw

Er is ook altijd de optie om zelf de software te realiseren. Er zijn libraries zoals Casbin in vrijwel elke programmeertaal
beschikbaar die de kern van ABAC/PBAC bieden. Het is wel goed om te beseffen dat het de beheersaspecten zijn die al snel
uitgroeien tot grote klussen met veel integratie en beveiligingsaspecten. Er zijn goede redenen dat commerciele PAP's 
een verdienmodel zijn.

## Criteria

- Policytaal
- PDP volwassenheid; AuthZEN compliance
- Kwaliteit van elk van de functionele features
- Mogelijkheid om datamodellen te gebruiken bij policy schrijven
- Cloud hosting platform opties
- Self hosting opties
- Prijs

Vragen aan zelf:

- Wie gaat het beheer doen, met wie is het logisch dat samen te doen?
- Om hoeveel PDP's gaat het? En hoeveel autorisatieverzoeken per maand?
- Integreert het met mijn IAM oplossing?
