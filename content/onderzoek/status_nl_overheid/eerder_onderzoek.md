---
type: 'chapter'
weight: 60
Title: Bestaand onderzoek
---
{{< chapter/section title="Eerder onderzoek" level="1">}}
Policy Based Access Control (PBAC)/ Externalized Authorization Management (EAM) is niet nieuw. Er is eerder onderzoek gedaan naar hoe deze methodieken kunnen worden toegepast.
{{< /chapter/section >}}

{{< chapter/section title="RAWA" >}}
De VNG heeft namens Common Ground in het project [ReferentieArchitectuur Werken met APIs (RAWA)](https://vng-realisatie.github.io/RAWA/), de architectuurpatronen benoemd en in de GEMMA opgenomen.
Daar zijn Attribute Based Access Control (ABAC) en PBAC genoemd. Er is toen echter niet een keuze voor een product of een standaard gemaakt.

Er is een proef gedaan samen met partner [SonicBee](https://www.sonicbee.eu/zero-trust-architecture-for-common-ground/) bij de gemeente Den Haag.
Daar is de OPA als Policy Decision Point (PDP) aangesloten op het OpenZaak systeem van Maykin.
Dit was een technisch geslaagde proef waarbij de software als geheel draaiende is gekregen. Uitdagingen waren er ook:
- Schrijven en beheren van de policies bleek te complex om door de gemeente zelf uit te voeren
- Door policies ook de dataminimalisatie te laten doen, werd er te veel data overgedragen van aanbieder naar afnemer. Dat was meer dan toegestaan onder de AVG en leidde tot praktische problemen met de prestaties.
  

In een vervolgonderzoek onder de naam '[Zero Trust opschaalplan]({{< param baseDirectory >}}documents/Opschaalplan_Zero_Trust.pdf)' is naar oplossingen gekeken.

- Voor beheer is Styra DAS getest, de beheeromgeving die de leverancier van OPA onder commerciële licentie verkoopt.
  Styra DAS voldoet functioneel aan de wensen. Policies blijven echter nog steeds
  lastig om te schrijven. Het begrijpen en bedienen van DAS vraagt om technische kennis die veel gemeenten niet in huis zullen hebben.
- Dataminimalisatie is onderzocht door een eigen vorm van residual policies te ontwerpen. Dit is gelukt, maar vereist aanpassingen
  aan aanbiederzijde. In de praktijk zal dit niet eenvoudig te realiseren zijn.
{{< /chapter/section >}}

{{< chapter/section title="Position paper PBAC" >}}
Het Federatieve Datastelsel (FDS) heeft een eigen [position paper](https://federatief.datastelsel.nl/kennisbank/pbac/) gepubliceerd waarin de opties van EAM worden verkend.
Hieruit is federatief PBAC naar voren gekomen als beste keus. Deze vorm is gekozen als uitgangspunt en was mede de aanleiding voor het project Federatieve Toegangsverlening (FTV).
{{< /chapter/section >}}
