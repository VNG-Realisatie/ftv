---
type: 'chapter'
title: "PlainID"
---

{{< chapter/section title="PlainID" >}}
PlainID heeft een [presentatie]({{< param baseDirectory >}}documents/plainid.pdf) en demo gegeven.

![plainid]({{< param baseDirectory >}}images/plainid.png)

Ten opzichte van Styra onderscheidt PlainID zich op een aantal vlakken.

- PlainID is een hybrid cloud product waarbij de PAP in een AWS cloud naar keuze leeft. Er is dus geen fully on-site variant; maar de PEP, PIP en logs (en in principe dus alle gevoelige gegevens) worden bij de gebruiker zelf gehost.
- PlainID biedt ondersteuning om attributen en informatiemodellen te definiëren. Hiermee kunnen sets van attributen beschikbaar gemaakt worden voor policy beheerders/schrijvers om mee te werken.
- PlainID biedt tientallen 'pre-made' PEPs aan voor diverse systemen; inclusief informatiemodellen die aansluiten bij de systemen.
- PlainID biedt ook een Policy Orchestration Point. Dit is een service voor applicaties die niet integreren met een PDP; maar waar wel policies voor geprovisioned kunnen worden. De POP kan policies vertalen naar de taal van het doelsysteem en daar provisionen. PowerBI DAX werdt als primair voorbeeld genoemd.
- PlainID werkt intern met een eigen policy representatie maar kan rego importeren en exporteren. Als developer zou je dus met rego als interface moeten kunnen werken. Het is me nog onduidelijk of dit 100% rego compliant is of een best-effort/gedeeltelijke oplossing.
- Voor deployment van de policies worden de bestaande Git deployment pipelines van de organisatie gebruikt. Als ik het goed begrijp kan PlainID dus gezien worden als een 'editor' die synchroniseert met onderliggende Git-repositories.

Zie ook de [PlainID brochure]({{< param baseDirectory >}}documents/plainid.pdf).
{{< /chapter/section >}}
