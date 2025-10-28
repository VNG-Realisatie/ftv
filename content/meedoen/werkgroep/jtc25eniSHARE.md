---
type: 'chapter'
Title: JTC-25 en iSHARE
---

{{< chapter/section title="JTC-25 en iSHARE (21 oktober 2025)" >}}

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Jaap Smit (UWV)
- Gideon Zegwaard (FDS)
- Hugo Mostard (Gemeente Den Haag)
- Gerard van der Hoeven (iSHARE)
- Rajiv Rajani (iSHARE)
- Frank Terpstra (Geonovem)
- Nico Spijkers (MinBZK)
- Stas Mironov (Logius)
- Maryse Bucking (NDW)
- Duuk Calor (Vecozo)
- Marc de Boer (FTV)
- Michiel Trimpe (FTV)
- Gerard Juijn (FTV)
- Maikel Hofman (FTV)
- Rene Vendrig (FTV)
- Karin Hiralal (FTV)
  
{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom
- Update subwerkgroepen
- Data Spaces en JTC-25
- iSHARE
- Afronding


{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}} 
- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20251021-jtc25-en-ishare.mp4)
- [Presentatie iSHARE](/ftv/documents/20251021-ftv-en-ishare.pdf)
- [Diagram klassieke data spaces](/ftv/documents/20251021-classic-data-space.png)
- [Diagram data spaces met DRP](/ftv/documents/20251021-data-space-with-DRP.png)
{{< /chapter/section >}}

{{< chapter/section title="Welkom" >}}

Er zijn geen nieuwe werkgroepleden.

{{< /chapter/section >}}

{{< chapter/section title="Updates subwerkgroepen" >}}

**AuthZEN NL Gov-profiel**

Het AuthZEN NL Gov-profiel staat nu officieel in publieke consultatie via Logius. Vorige week is overeenstemming bereikt over de reikwijdte en het functioneel toepassingsgebied voor de consultatie. De consultatie is aangekondigd via Logius en het Kennisplatform APIs en wordt opgenomen in de FTV-Update van dinsdag 28 oktober.
Functioneel toepassingsgebied: AuthZEN wordt toegepast wanneer de toegangsbeslissing tot een API-aanroep in een ander component wordt afgedwongen (PEP) dan waar de beslissing wordt genomen (PDP).

**Authorization Decision Log (ADL)**

Op ADL is feedback ontvangen. Deze wordt nog verwerkt. Voor het bespreken van de feedback is tijd gereserveerd in de volgende vergadering.

**Juridisch Kader**

De eerste versie van het juridisch kader is opgeleverd. Het raamwerk is duidelijk en er zijn geen conflicten gevonden met de opgeleverde inhoud. De scope omvat alle drie de standaarden: AuthZEN NL Gov, Authorization Decision Log en Register Toegangsbeleid. De verwachting is dat een volgende versie snel beschikbaar komt.


{{< /chapter/section >}}

{{< chapter/section title="Update JTC-25" >}}

**Michiel Trimpe** was aanwezig bij de JTC-25 conferentie in Berlijn. Hij schetst het kader van Europese wetgeving voor datadeling, waaronder de Data Act en de Data Governance Act.
Deze wetgeving wordt uitgewerkt in Europese NEN-standaarden binnen JTC-25. 

De standaarden bestaan uit drie delen: (1) definities, (2) eisen voor vertrouwen en (3) interoperabiliteit.
Het zijn functionele standaarden die geen specifieke technologie voorschrijven. Ze beschrijven het patroon van gegevensuitwisseling in een dataspace, zonder een concrete implementatie voor te schrijven.

**Michiel Trimpe** licht toe dat bij datadeling sprake is van drie rollen: de dataprovider, de dataconsumer en de datarights holder. Binnen de standaarden werken deze rollen met cryptografisch onderbouwde claims als bewijs: bijvoorbeeld een getekend token van de datarights holder, een contract met de dataprovider of een verwijzing naar geldend beleid. De dataprovider kan deze claims zelf verifiëren (reconcilen) en op basis daarvan een verzoek toestaan of weigeren. Dit proces kan ook offline plaatsvinden.
Tot slot laat Michiel zien hoe iSHARE hierin past. Naast lokale PDPs bij de dataprovider en dataconsumer kan er een derde PDP binnen het stelsel bestaan (autorisatieregister) die Digital Rights Policy (DRP) tokens uitgeeft. Deze tokens sluiten qua structuur aan bij het informatiemodel van AuthZEN. Er wordt gewerkt aan een profiel dat beschrijft hoe deze tokens mappen op AuthZEN. Het belang hiervan is een eenduidige interpretatie en hergebruik binnen FTV.

Zie bij Bijlages voor de link naar de presentatie.

{{< /chapter/section >}}

{{< chapter/section title="Presentatie iSHARE" >}}

**Gerard van der Hoeven** (iSHARE Foundation) licht het iSHARE-framework toe.
De oorspronkelijke aanleiding was dat er een methode van gefedereerde toegangsverlening nodig was, zodat bedrijven anderen toegang kunnen geven tot de API’s van hun bestaande systemen zonder data te verplaatsen.
Het iSHARE-framework is daarop ontwikkeld. Kernprincipe is “your data, your rules”: de datarights holder bepaalt wie wanneer toegang krijgt en onder welke voorwaarden.
iSHARE biedt daarbij juridische dekking, zonder dat er voor elke transactie een apart contract hoeft te worden afgesloten.
Het framework werkt met standaard data-rights tokens die de afspraken technisch én juridisch vastleggen. 
Deze tokens worden uitgegeven door gecertificeerde partijen. De iSHARE-foundation bewaakt de standaard maar geeft zelf niets uit. 
iSHARE bouwt voort op bestaande identiteiten (zoals eHerkenning) en is hybride opgezet: zowel geschikt voor de huidige token-stack (OAuth / OIDC) als voor de richting van verifiable credentials en Europese wallets.
In Nederland is iSHARE de basis onder meerdere dataspaces en hetzelfde fundament wordt in Europa gebruikt voor nieuwe domeinen zoals Agri en Green Deal.
De standaard wordt verder afgestemd binnen JTC-25 en de Eclipse-werkgroep Digital Rights, om interoperabiliteit tussen dataspaces te borgen.
Gerard van der Hoeven geeft aan dat iSHARE en FTV elkaar aanvullen. iSHARE richt zich op private partijen en cross-domein datadeling, terwijl FTV vanuit de publieke context werkt met bestaande zekerheden tussen overheden en met beleidsgebaseerde autorisatie (AuthZEN). Michiel voegt toe dat de aansluiting concreet wordt uitgewerkt in een profiel waarin wordt vastgelegd hoe iSHARE-tokens mappen op het AuthZEN-informatiemodel.

Michiel Trimpe bedankt Gerard voor de presentatie.

Zie bij Bijlages voor de link naar de presentatie.

{{< /chapter/section >}}

{{< chapter/section title="Onderwerpen volgende vergaderingen" >}}

Michiel Trimpe toont de eerder gemaakte planning.
Over ADL is feedback ontvangen ter voorbereiding op de publieke consultatie. De werkgroep stemt in om ADL op de agenda van de volgende bijeenkomst te zetten, zodat het functioneel toepassingsgebied kan worden besproken en de feedback kan worden verwerkt. Het onderwerp Register Toegangsbeleid krijgt eerst een apart overleg in een kleinere groep, in afstemming met Gideon.

**Komende agenda-onderwerpen**

-  4 november: Contracten, BRP-policies en feedback ADL
- 18 november: Verifiable credentials
-  2 december: Partial evaluation en residual policies
- 16 december: Informatiemodellering van subjecten


{{< /chapter/section >}}
