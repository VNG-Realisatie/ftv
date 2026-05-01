---
type: 'chapter'
Title: Consultatie Authorization Decision Log
---
{{< chapter/section title="" >}}
# Consultatie Authorization Decision Log (28 april 2026)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Marc de Boer (FTV)
- Nil Barua (Logius)
- Marcel Molenaar (UWV)
- Floris Deutekom (Geonovum)
- Igor van Haren (Vecozo)
- Hugo Mostard (Gemeente Den Haag)
- René Kint (Zicht op Nederland)
- Arnoud Quanjer (VNG)
- Axel van der Minne (DUO)
- Rob van Dort (mapplica)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20260428-consultatie-adl.mp4)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking (5m)
- Voortgang FTV (5m)
- Consultatie Authorization Decision Log (30m)
- Inventarisatie vragen BRP-keten (15m)
- Planning vervolg (5m)
{{< /chapter/section >}}

{{< chapter/section title="Welkom & kennismaking" >}}

*Michiel Trimpe* heet iedereen welkom bij de twintigste werkgroep. Het oorspronkelijk geplande vragenuurtje van RvIG kon vandaag niet doorgaan en wordt verplaatst naar de volgende werkgroep, die fysiek bij ICTU in Den Haag zal plaatsvinden. RvIG heeft daarbij aangegeven het op prijs te stellen als er meer mensen fysiek aanwezig zijn voor het nagesprek. Er wordt een ruimte en gratis lunch in de bedrijfskantine voor de deelnemers geregeld.

*Nil Barua* introduceert zich als nieuw lid: hij werkt bij Logius en is intern de tijdelijke vervanger van *Stas Mironov*, die de komende weken met vakantie is. Hij is daarnaast betrokken bij het core team voor het beheer van de FTV-standaarden.

{{< /chapter/section >}}

{{< chapter/section title="Voortgang FTV" >}}

*Marc de Boer* deelt een update over OpenFTV. Eind vorig jaar is in een Digilab-fieldlab samen met de gemeente Utrecht een proef gedaan om OpenFTV in te zetten in de zaakafhandelstack. Op basis daarvan heeft Utrecht een subsidie gekregen (één van acht binnen de regeling Pilot Uitvoeringskracht) om het ook werkelijk live te brengen. De stack waarin OpenFTV wordt ingepast omvat onder meer het GZAC van Ritense, Open Zaak/Open Product/Open Klant van Maykin, een procescomponent van Ritense en een Envoy-gateway.

De opdracht betekent ook dat OpenFTV als productiewaardige software wordt opgeleverd, in plaats van het MVP-niveau van vorig jaar. *Marc* benadrukt dat dit een belangrijke extra impuls geeft en roept werkgroepleden op om in contact te blijven; aansluiting met afdelingen die OpenFTV in de praktijk willen brengen is gewenst zodra de nieuwe ontwikkelaars zijn geworven.

*Hugo Mostard* vraagt of er ook ontwikkeling komt op het administreren en versioneren van policies in OpenFTV; in de MVP was dat nog een technische uitdaging. *Marc* bevestigt dat een policy-beheerscherm met versionering en distributie naar PDP's al werkt, maar dat de architectuur daarvan een professionaliseringsslag krijgt — onder andere door OPAL als framework te overwegen. Ook komt er autorisatie-op-autorisatie ("eat your own dog food"), zodat het beheer van policies zelf via beleid wordt geregeld. Geautomatiseerde tests die het effect van policy-wijzigingen tonen vallen voor nu out of scope wegens tijdsdruk.

{{< /chapter/section >}}

{{< chapter/section title="Consultatie Authorization Decision Log" >}}

*Michiel Trimpe* leidt deze sessie met als concreet doel om vandaag, namens de werkgroep, akkoord te krijgen op de aangepaste versie van de standaard zodat de openbare consultatie via Logius kan starten.

**Aanleiding voor de aanpassing**

De interne consultatie was eerder afgerond. De zwaarste feedback betrof de relatie tot OpenTelemetry: de standaard beval het gebruik van OpenTelemetry aan, maar de eigen datastructuur was niet OTel-compatibel by default. Logboek Dataverwerkingen had zijn structuur juist heel bewust wél OTel-compatibel gespecificeerd. Wat aanvankelijk een kleine aanpassing leek, bleek een stevige refactoring. ADL hangt zich op aan het OTel *LogRecord*, terwijl Logboek Dataverwerkingen zich aan de OTel *Span* hangt.

**Bespreking van de wijzigingen**

*Michiel* loopt op hoofdlijnen door de aanpassingen, voor de details wordt verwezen naar de [diff van de standaard](https://services.w3.org/htmldiff?doc1=https%3A%2F%2Flogius-standaarden.github.io%2Fauthorization-decision-log%2F&doc2=https://logius-standaarden.github.io/Publicatie-Preview/authorization-decision-log/otel-refactor/). 

Op de inhoud zijn er, naast het verplicht maken van Trace Context, geen semantische verschuivingen; in de structuur en de presentatie wel veel:

- Abstract is sterk verkort.
- De reikwijdte als aparte sectie is uit de standaard gehaald — die hoort thuis in de aanmelding bij Forum Standaardisatie, niet in de tekst zelf. 
- Terminologie is uitgebreid: onderscheid tussen *authorization* als werkwoord en als attribuut van een verzoek, expliciete definitie van *authorization decision* als de eenheid waarin gewerkt wordt, en losse definities van *trace*, *span* en *trace context* met verwijzing naar [trace-context]. *Reconstruct* en *replay* zijn gescheiden en uniform gemaakt (eerder was er door elkaar reconstitute/recreate/reconstruct).
- De flow-diagrammen zijn gesplitst in twee plaatjes: één voor het maken van een decision (de algemene PxP-flow) en één voor het schrijven van het log record. Daardoor is ook de uitleg over *durable storage* expliciet — de standaard schrijft niet voor wat dat is, maar verplicht organisaties dat zelf in hun loggingbeleid vast te leggen.
- De relatie met OpenTelemetry is expliciet gemaakt: ADL gebruikt het OTel-informatiemodel en de OTel-vorm, maar verplicht het gebruik van OTel niet. Wel maakt de standaard adoptie van OTel makkelijker.
- Het hoofdstuk Behavior is fors uitgewerkt met regels voor TLS, Tracing, Generation en Ingestion. Voor tracing is per request-hop voorgeschreven hoe componenten de trace context moeten doorgeven; tracing geldt op elke stap (PEP→PDP, PDP→PIP, PDP→PAP). Het *sampled*-bit uit OpenTelemetry mag de logging niet beïnvloeden — ADL moet altijd loggen — maar de sampled-bit mag bij doorgeven ook niet worden aangepast. Idempotentie van ingestion is normatief vastgelegd.
- De interface is uitgebreid met een aantal velden uit het OTel-LogRecord-model: `parent_span_id`, `event_name`, `status` en `resource`. Het tijdformaat is veranderd naar milliseconden sinds Unix-epoch (was RFC3339-string), en velden worden verdeeld over `attributes` (kleine, doorzoekbare metadata; in OTel met grootte-limieten) en `body` (ruwe data zoals het volledige request en response; geen grootte-limiet).
- De `adl.*`-attributen hebben nu een `adl.core.*` namespace voor het kerndomein en een aparte `adl.fsc.*` voor FSC-specifieke verwijzingen. Het `event_name` is in een tabel gemapt op de AuthZEN API-endpoints; voor implementaties die niet via de AuthZEN-API werken moet de conceptueel meest passende waarde gekozen worden. 
- Een `status`-enum (Unset/Ok/Error) onderscheidt een mislukte evaluatie van een beslissing (dus niet beslissingen met een negatief besluit.)
- De levels of detail zijn niet-normatief gemaakt en de eerder verspreid staande voorbeelden zijn naar dat hoofdstuk verhuisd, met de juiste trace-context-structuur. De claim dat ADL als audit log kan dienen is genuanceerd: een audit log kan ook systeem-events (start/stop, configuratiewijzigingen) bevatten, dus ADL kan daar wel aan bijdragen maar is op zichzelf niet voldoende.
- *Sources and referencing* heeft een normatieve definitie van een *source reference* gekregen; de drie patroon-uitwerkingen (Versioned, Temporal, Logged) zijn informatief gemaakt.
- In het hoofdstuk Information Management zijn verwijzingen naar AVG-artikelen, ISO/IEC 27002:2022, BIO en de Archiefwet aangevuld, met name rondom retentie, data-integriteit en tijdsynchronisatie.

**Discussie**

*Marcel Molenaar* vraagt — voordat *Michiel* aan de wijzigingen begint — of de relatie met andere logs (PBAC, autorisatieserver, identity provider) als doel in de standaard is opgenomen. Hij is binnen UWV druk bezig om ADL als basis over te nemen, en wil het zo ongewijzigd mogelijk gebruiken; relaties met centrale voorzieningen zijn daarbij essentieel. *Michiel* antwoordt dat dit precies is waar de hele refactoring over gaat: door het gebruik van [trace-context] (gedeelde `trace_id` plus `parent_span_id`) zijn records uit verschillende logs over de keten heen aan elkaar te koppelen. Dit punt wordt expliciet aan de *purpose* en de *abstract* toegevoegd.

Bij de tracing-regels stelt *Marcel* een vraag over AI-agents die hun eigen sub-agents kunnen aanroepen: kan dat ook netjes in de trace context worden meegenomen, of is dat een latere uitbreiding? *Michiel* legt uit dat de aanroeper de parent-span aanlevert en de aangeroepen component daar gewoon onder hangt — dat werkt voor AI-agents niet anders. De AuthZEN werkgroep bereidt een MCP-profiel voor waarin de aanroep door een AI-agent ook autorisatie krijgt. *Marcel* sluit aan met een eigen scenario: token-exchange in elke stap met de autorisatieserver, die zo ook zichtbaar wordt in de keten. Onderwerp parkeert de groep voor een andere sessie; voor de standaard zelf hoeft er nu niets bij.

**Akkoord voor de openbare consultatie**

Na het doorlopen van de wijzigingen vraagt *Michiel* of de werkgroep zich erin kan vinden om met deze versie de openbare (Logius-)consultatie in te gaan. *Floris Deutekom* wijst er op dat het uitblijven van inhoudelijke vragen of bezwaren tijdens de toelichting al een teken van instemming is en geeft expliciet zijn akkoord; er is geen tegenspraak vanuit de overige werkgroepleden. *Michiel* verduidelijkt nog dat dit de Logius-consultatie betreft en niet de Forum Standaardisatie-consultatie. Daarmee kan de aanmelding voor de Logius-consultatie de molen in.

**Voorstel: ADL als OpenTelemetry semantic convention**

*Igor van Haren* doet vanuit zijn ervaring met ketenmonitoring in de zorg (iWlz) een voorstel: in zijn omgeving wordt OpenTelemetry-data uitgewisseld volgens *semantic conventions* zoals die van CloudEvents en GraphQL. Hij stelt voor om voor decision logging zo'n semantic convention toe te voegen, eventueel op een internationaal niveau (in de AuthZEN-context). Een groot deel van wat ADL beschrijft kan daarin opgenomen worden. *Michiel* vindt het een sterk idee en zegt toe het in de internationale AuthZEN-werkgroep aan te dragen; dat zou ook de positie van ADL versterken.

{{< /chapter/section >}}

{{< chapter/section title="Inventarisatie vragen BRP-keten" >}}

Volgende werkgroep komt RvIG zelf langs voor een presentatie en vragenuurtje over de BRP-keten. *Michiel* haalt op wat de werkgroep daar graag over zou willen horen, zodat RvIG daar de presentatie op kan inrichten. 

- *Marc* opent met een richting: het is interessant te horen waar RvIG zich in de hele keten mee bemoeit — enerzijds wat zij zelf doen (het BRP beschikbaar maken via API en informatiegerichte producten), anderzijds welke eisen zij aan afnemers stellen om de gegevens te mogen gebruiken, en hoe RvIG zijn rol ziet in het sturen of keuren van afnemers. Aanvullend: hoe wordt de HaalCentraal-API versus de informatiegerichte producten in de praktijk gebruikt en bevalt dat?
- *Arnoud Quanjer* wijst er op dat RvIG autorisaties nu uitgeeft via centrale autorisatiebesluiten — een gesloten systeem. De vraag is in hoeverre RvIG dat wil omzetten naar policies en hoe zij de overgang naar federatieve toegangsverlening voor zich zien.
- *René Kint* sluit aan bij die lijn: hoe wil RvIG bij breder gebruik het *gebruik* van BRP-gegevens monitoren — niet alleen wie de afnemers zijn, maar ook in welk proces zij de data inzetten? *Arnoud* bevestigt dat dat nu niet bekend is bij RvIG; alleen wie de afnemers zijn (via de autorisatiebesluiten). *René* merkt op dat BRP zich qua afgifte fundamenteel anders gedraagt dan veel andere bronnen; "iedereen die data graag deelt" geldt hier nadrukkelijk niet.
- *Michiel* sluit aan dat deze keten voor het FTV-team zeer interessant is omdat RvIG vanuit wettelijke verplichtingen al veel doet wat het FTV standaardentraject nu probeert te beschrijven.
- *Nil Barua* meldt dat ze bij Logboek Dataverwerkingen al vragen krijgen over BRP-protocollering, omdat BRP zowel audit-logging als verwerkingslogging doet. Een eerder gesprek met RvIG had laten zien dat het logische ontwerp van BRP-protocollering te breed is om in één keer te kunnen plaatsen, maar het document is wel een nuttige aanvulling voor de werkgroep om vooraf te bekijken: [Logisch Ontwerp BRP](https://developer.rvig.nl/lo-brp/LO-BRP/).
- *Axel van der Minne* en *Marcel Molenaar* geven aan vooral nieuwsgierig te zijn naar het algemene beeld; 
- *Rob van Dort* wil zich in eerste instantie graag laten informeren over het algehele proces, met detailvragen die later vanuit zijn cases kunnen komen.

{{< /chapter/section >}}

{{< chapter/section title="Vervolgstappen" >}}

- De aangepaste versie van de Authorization Decision Log gaat in openbare (Logius-)consultatie.
- De toegevoegde abstract en purpose worden op het punt van logs-correlatie via trace context aangevuld.
- *Michiel* draagt het voorstel voor een OpenTelemetry semantic convention voor decision logging aan in de internationale AuthZEN-werkgroep.
- Volgende werkgroep (over twee weken) is fysiek bij ICTU in Den Haag (Laan van NOI, Beatrixpark) met RvIG-presentatie en vragenuurtje. Aanmelden vooraf, lunch in de bedrijfskantine.
{{< /chapter/section >}}