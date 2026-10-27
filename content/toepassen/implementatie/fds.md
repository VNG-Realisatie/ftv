---
Title: Federatief Datastelsel
type: 'chapter'
---

{{< chapter/section title="Federatief Datastelsel" >}}

EAM als methode en de standaarden van FTV zijn inzetbaar in een losstaande applicatie, in de context van een gelaagde architectuur, en ook op grotere schaal. De context waarin FTV ontworpen is, dis die van het [Federatief Datastelsel](https://realisatieibds.nl/page/view/8852ee2a-a28a-4b91-9f3e-aab229bbe07f/federatief-datastelsel) (FDS). Op deze pagina wordt die bredere context geschetst.

{{< /chapter/section >}}

{{< chapter/section title="Uitgangspunten" level="3" >}}

Een datastelsel kan gezien worden als een groep afnemers en een groep aanbieders die gegevens met elkaar uitwisselen. Wat een federatief stelsel anders maakt zijn de stelselafspraken die een vertrouwensbasis geven. Alle deelnemers zeggen toe zich aan die afspraken te houden, inclusief afspraken om elkaar te kunnen controleren als dat nodig is. Vertrouwen wordt het uitgangspunt. 

Het FDS schrijft een aantal [technische standaarden](https://realisatieibds.nl/groups/view/0056c9ef-5c2e-44f9-a998-e735f1e9ccaa/federatief-datastelsel/wiki/view/91db63fe-e2dd-4b8d-943f-331c53489757/standaarden-voor-het-fds) voor. In het plaatje hieronder worden een aantal van die standaarden met elkaar in verband gebracht. De blauwe bollen zijn componenten van de FDS-werkwijze.

{{< img-url "diagrams/fds-overzicht.svg" "Overzicht FDS standaarden" >}}

In dit plaatje maakt een applicatie (links) verbinding met een dienst (rechts).

{{< /chapter/section >}}

{{< chapter/section title="Functies" level="3" >}}

**Connectiviteit** beschrijft hoe een verbinding tot stand gebracht kan worden. Dit gaat over aspecten zoals beveiliging en authenticatie. De [FSC-standaard](https://fsc-standaard.nl/) is hiervoor ontworpen. FSC beschrijft dat beide partijen een gateway dienen te hebben, met welke functies, en hoe de data over de lijn gaat.

**Autorisatie** is het werkgebied van FTV. Autorisatieverzoeken kunnen volgens [NLGov AuthZEN](../../../methodiek/authzen-nlgov) gedaan worden door de applicatie en/of de gateway. Vaak zijn er gedetailleerde gegevens nodig om een fijnmazige beslissing te nemen, en wordt ervoor gekozen de applicatie het verzoek te laten samenstellen. Als dat niet nodig is, of bijvoorbeeld als de applicatie niet aangepast kan worden omdat deze ouder is of gesloten, dan kan de gateway hiervoor gebruikt worden. Een combinatie kan ook.

**Logging** gebeurt op drie niveaus:

1. Transactielogging. Hierin wordt gelogd welke pogingen tot verbinding zijn gedaan, en of die verbinding tot stand is gekomen. Hiervoor is de standaard [FSC-logging](https://gitdocumentatie.logius.nl/publicatie/fsc/logging/1.1.0/) ontworpen. 
2. Toegangsbeslissingenlog. Hier worden de uitkomsten van de inhoudelijke verzoeken (autorisatie) bijgehouden. De standaard hiervoor is [Authorisation Decision Log](../../../methodiek/adl) (ADL).
3. Verwerkingenlog. Dit zijn de daadwerkelijke gegevensverwerkingen in de AVG-zin. Hiervoor is [Logboek Dataverwerkingen](https://www.logius.nl/onze-dienstverlening/gegevensuitwisseling/logboek-dataverwerkingen) geschreven.

Elke standaard beschrijft staat welke velden verplicht, optioneel of verboden zijn en het formaat van die velden. Wat er bewust niet in staat is de implementatie: hoe dat schrijven moet gebeuren, en hoe dat uitgelezen kan worden. Dat is bewust vrijgelaten.

Deze drie logs zijn met elkaar verbonden met een trace-context.

{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-donkerbruin-50" nextlink="../stappenplan" nexttitle="Regels opstellen">}}
{{< /chapter/nextprevious >}}
