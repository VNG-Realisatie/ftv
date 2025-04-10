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

## Vragen aan leverancier

- How do you support policy authoring for various audiences such as business users, developers, maintainers, security, etc.?
- Which components of the product can be deployed on-prem, in the cloud or as SaaS? In case of cloud or SaaS solutions, how do you ensure sensitive data can remain within the boundaries of the organization?
- Which Policy Enforcement Points are supported and what functionality do they have? Also in terms of residual policy/obligations.
- What support do you have for defining organization and application specific information models of the subject, action, resource and context of requests?
- How is decentralized self-service policy management handled? Are project or workspace scopes supported? Can these be nested or is it a flat structure? Is access to policy management functinoality also configurable by policy?
- How do you handle separation of duties and approval workflows for policy authoring?
- How do you handle deployment of policies and changes to policies? How is this integrated in deployment workflows for DevOps teams? How is it integrated for maintenance teams without deployment pipelines?
- How do you enable reuse of definitions and logic between policies?
- How do you support 'unit testing' for policies to document behaviour end prevent regressions?
- Does the audit log allow for replay of historical decisions against new policy versinos? How do you address data duplication and sensitive data in your audit log? 
- Do you allow for import from - and export to other policy languages? Which languages are supported? Is it one-way or bidirectional? Is it fully supported or only a subset of the language?
- To what degree do you support data authorization? Do you support residual policy for masking, anonymisation, filtering etc.?
- To what degree is the product based on open standards? Both in terms of open-source and open-governance. (Zie [BOMOS](https://www.logius.nl/onze-dienstverlening/domeinen/infrastructuur/bomos)) 
- Do you support Policy Orchestration Points (POPs) to provision policies to systems that don't support Externalized Authorization? For which systems do you offer POPs?
- Do you support dynamic generation of authorization tokens, such as OAuth Rich Authorization Requests, based on policy?


## Vragen aan eigen organisatie

- Wie gaat het beheer doen, met wie is het logisch dat samen te doen?
- Om hoeveel PDP's gaat het? En hoeveel autorisatieverzoeken per maand?
- Integreert het met mijn IAM oplossing?
