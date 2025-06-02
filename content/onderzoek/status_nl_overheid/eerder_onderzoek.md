---
type: 'chapter'
weight: 60
Title: Bestaand onderzoek
---
{{< chapter/section title="Eerder onderzoek" level="1">}}
Policy Based Access Control (PBAC) / Externalized Authorization Management (EAM) is niet nieuw en er is al eerder onderzoek naar de inzet gedaan.
{{< /chapter/section >}}

{{< chapter/section title="RAWA" >}}
De VNG heeft namens Common Ground in het project [ReferentieArchitectuur Werken met APIs (RAWA)](https://vng-realisatie.github.io/RAWA/), de architectuurpatronen benoemd en in de GEMMA opgenomen.
Daar zijn Attribute Bases Access Control (ABAC) en PBAC genoemd, maar er is toen niet een concrete keus voor een product of een standaard gemaakt.

Er is een proef gedaan samen met partner [SonicBee](https://www.sonicbee.eu/zero-trust-architecture-for-common-ground/) bij de gemeente Den Haag.
Daar is de OPA Policy Decision Point (PDP) aangesloten op het OpenZaak systeem van Maykin.
Dit was een technisch geslaagde proef, de software is als geheel draaiende gekregen. Uitdagingen waren er ook:
- Schrijven en beheren van de policies bleek te complex om door de gemeente zelf uit te voeren
- Door policies ook de dataminimalisatie te laten doen ging werd er te veel data overgedragen van aanbieder naar afnemer,
  meer dan de bedoeling is vanuit AVG-wetgeving en praktisch uitvoerbaar is qua prestaties.

In een vervolgonderzoek onder de naam '[Zero Trust opschaalplan]({{< param baseDirectory >}}documents/Opschaalplan_Zero_Trust.pdf)' is naar oplossingen gekeken.

- Voor beheer is Styra DAS getest, de beheeromgeving die de leverancier van OPA onder commerciële licentie verkoopt.
  Dat blijkt een goed product dat functioneel tegemoetkomt aan de wensen. Policies blijven echter nog steeds
  lastig om te schrijven en het begrijpen en bedienen van DAS vraagt technische kennis die veel gemeenten niet zullen hebben.
- Dataminimalisatie is onderzocht door een eigen vorm van residual policies te ontwerpen. Dit is gelukt, maar vereist aanpassingen
  aan aanbiederzijde, hetgeen in de praktijk nog veel voeten in de aarde zal hebben.
{{< /chapter/section >}}

{{< chapter/section title="Position paper PBAC" >}}
Het Federatieve Datastelsel (FDS) heeft een eigen [position paper](https://federatief.datastelsel.nl/kennisbank/pbac/) geschreven om de opties van EAM te verkennen.
Hieruit is federatief PBAC naar voren gekomen als beste keus, min of meer de vorm die dit project als basis heeft gekozen.
Dit resultaat was mede de aanleiding voor het project Federatieve Toegangsverlening (FTV).
{{< /chapter/section >}}
