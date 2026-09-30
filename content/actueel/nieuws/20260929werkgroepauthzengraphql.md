---
type: 'nieuws'
Title: 'FTV Werkgroep #28: AuthZEN & GraphQL'
date: '2026-09-29'
summary: "GBO presenteerde een voorstel om AuthZEN-autorisatie op GraphQL toe te passen: een mapper vóór het endpoint die query's vertaalt naar velden waar policies over kunnen beslissen."
---

{{< nieuws/header title="FTV Werkgroep #28: AuthZEN & GraphQL" >}}

{{< /nieuws/header >}}

{{< chapter/section title="Autorisatie op GraphQL" level="3">}}

Steeds meer overheidspartijen ontsluiten gegevens via GraphQL — in de Wlz-keten,
bij BKWI en bij het programma Gemeenschappelijke Bronontsluiting (GBO). Maar
GraphQL-verzoeken gaan allemaal naar één endpoint, met de query als tekst in het
bericht: aan de buitenkant valt niet te zien wat er gevraagd wordt, en dat maakt
standaard-autorisatie lastig.

GBO presenteerde in de werkgroep een eerste voorstel om dit met de
FTV-standaarden op te lossen: een *mapper* vóór het endpoint die het schema en
de query parseert en het AuthZEN-verzoek verrijkt met de gevraagde typen, velden
en argumenten. Policies beslissen vervolgens per type en veld, deny by default
en alles-of-niets per query — en de policy-engine hoeft zelf geen GraphQL te
begrijpen. De specificatie wordt met de werkgroep gedeeld voor een
verdiepingsslag, samen met onder meer BKWI en de Wlz-keten. Lees het volledige
verslag in [de notulen](/ftv/meedoen/werkgroep/authzen-graphql).

{{< /chapter/section >}}

{{< chapter/section title="Draagvlak voor de Authorization Decision Log" level="3">}}

De aanmelding van de Authorization Decision Log bij Forum Standaardisatie
loopt. De werkgroep inventariseerde wie de standaard al ondersteunt: van
opname in beleid en architectuur tot eigen implementaties en verkennende
gesprekken.

{{< /chapter/section >}}

{{< chapter/section title="Volgende bijeenkomsten" level="3">}}

Op 13 oktober staat [ODRL-AP-NL](https://realisatieibds.nl/groups/view/0056c9ef-5c2e-44f9-a998-e735f1e9ccaa/federatief-datastelsel/events/view/b88d64d6-8c6a-426e-a5cf-2510833dbcc9/werkgroep-federatieve-toegangsverlening-odrl-linked-data)
op de agenda; twee weken later, op [27 oktober](https://realisatieibds.nl/groups/view/0056c9ef-5c2e-44f9-a998-e735f1e9ccaa/federatief-datastelsel/events/view/b12fba4a-b56b-4a12-8124-f453d3ebf3f8/werkgroep-federatieve-toegangsverlening-iam-editie), volgt weer een
sessie met de IAM-focus.

{{< /chapter/section >}}
