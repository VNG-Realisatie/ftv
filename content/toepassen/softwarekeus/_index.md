---
Title: Softwarekeus
weight: 20
type: 'chapter'
---

{{< chapter/section title="" >}}
# Softwarekeus

Een passende softwarekeuze is belangrijk voor een werkende FTV-oplossing. De markt is in beweging en de verschillen tussen producten zijn groot. Van open source tot commerciële pakketten, van zelf bouwen tot volledig uitbesteden: er zijn meerdere routes mogelijk. Welke keuze past, hangt af van de situatie, de technische wensen en de manier waarop het beheer wordt ingericht.
{{< /chapter/section >}}

{{< chapter/section title="Verdeelde markt" >}}
Toegangsverlening krijgt steeds meer aandacht. Door de overstap naar cloud en gedistribueerde architecturen is de vroegere werkwijze niet meer houdbaar. Maatwerk regels, ingebouwd in software, zijn slecht te onderhouden. RBAC oplossingen zijn door ‘role explosion’ niet beheersbaar op grote schaal.

EAM-methodes (Externalized Authorization Management) zijn in opkomst. Maar er is (nog) geen standaardoplossing. De grote leveranciers van cloud infrastructuur hebben hun eigen oplossing, en daarnaast zijn er tientallen EAM-bedrijven in de markt gestapt.
{{< /chapter/section >}}

{{< chapter/section title="Open of closed source" >}}
Elke EAM-oplossing draait om de beslismodule: de PDP. Daaromheen zitten modules voor beheer, zoals voor schrijven, testen, distributie en monitoring en standaard integraties met bestaande applicaties (PEP's). De meeste PDPs zijn open source en vaak ook licentievrij. De andere modules worden commercieel aangeboden, als uitbestede dienst (SaaS) of voor eigen beheer(on-premises). Vaak zit hier een duidelijke freemium strategie achter: door een goede gratis open source PDP aan te bieden, hoopt de leverancier een klant aan de eigen policytaal te binden waarna de overstap naar betaalde EAM een logische weg is.
{{< /chapter/section >}}

{{< chapter/section title="Zelfbouw of uitbesteden" >}}
Een andere optie is zelf software ontwikkelen. Er zijn libraries in vrijwel elke programmeertaal beschikbaar die de kern van ABAC/PBAC bieden.

Zelfbouw geeft maximale vrijheid, maar brengt ook risico’s. Vooral het beheer, de integratie en de beveiliging vragen veel tijd en kennis.
{{< /chapter/section >}}

{{< chapter/section title="Criteria voor keuze" >}}

De juiste softwarekeuze hangt af van meer dan alleen techniek. Belangrijke punten om mee te nemen in de afweging zijn

- **Policytaal**

  Hoe krachtig en leesbaar is de policytaal? Past deze bij de werkwijze van de organisatie?
- **PDP en standaardisering**

  Is de gekozen PDP volwassen en voldoet deze aan de AuthZEN NL Gov-standaard?
- **Integratie met bestaande applicaties**

  Voor welke applicaties biedt de leverancier standaard PEPs om beslissingen af te dwingen?

- **Functionele kwaliteit**

  Hoe goed werken de onderdelen voor schrijven, testen, distributie en monitoring?

- **Gebruik van datamodellen**

  Ondersteunt de oplossing het gebruik van eigen modellen voor subject, action, resource en context?

- **Hostingopties**

  Kan de software in de cloud draaien, in eigen omgeving ('on-premises') of allebei?

- **Kosten**

  Wat zijn de licentiekosten en wat betekent dat voor schaalbaarheid en beheer?
{{< /chapter/section >}}

{{< chapter/section title="Vragen aan leverancier" >}}
Bij het kiezen van software voor FTV is het belangrijk om de juiste vragen te stellen aan leveranciers. Denk aan onderwerpen als beheer, integratie, policytaal en dataveiligheid.

In deze [checklist](vragen) staan voorbeeldvragen, in het Engels, die helpen om oplossingen goed te beoordelen.
{{< /chapter/section >}}

{{< chapter/section title="Vragen aan eigen organisatie" >}}
Niet alleen de leverancier, ook de eigen organisatie moet goed voorbereid zijn. Denk vooraf na over inrichting, beheer en schaalbaarheid.

- Wie gaat het beheer doen en  met wie wordt daarbij samengewerkt?
- Om hoeveel PDP’s gaat het? En om hoeveel autorisatieverzoeken per maand?
- Binnen welke applicaties moeten beslissingen afgedwongen worden (PEPs)?
- Integreert de gekozen oplossing het met de bestaande IAM-oplossing?
{{< /chapter/section >}}
