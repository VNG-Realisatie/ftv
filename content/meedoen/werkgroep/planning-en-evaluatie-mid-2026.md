---
type: 'chapter'
Title: Planning en evaluatie mid 2026
---
{{< chapter/section title="" >}}
# Planning en evaluatie mid 2026 (23 juni 2026)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Gideon Zegwaard (FDS)
- Axel van der Minne (DUO)
- Hans Hendrikman (RvIG)
- Hans Schevers (Kadaster)
- Igor van Haren (Vecozo)
- Marcel Molenaar (UWV)
- Remo van Rest (ZIN)
- René Kint (ZoN)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20260623-planning-en-evaluatie-mid-2026.mp4)
- [Presentatie](/ftv/documents/20260623-planning-en-evaluatie-mid-2026.pdf)
- [Evaluatie 2026H1](/ftv/documents/20260623-evaluatie-2026h1.pdf)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Roadmap FTV — samenvatting vorige werkgroep en voorstel werkprogramma tweede helft 2026
- Evaluatie eerste helft 2026 (Miro-bord)
{{< /chapter/section >}}

{{< chapter/section title="Opening en scope van deze sessie" >}}

*Michiel Trimpe* opent. De agenda is laat rondgestuurd; er staan vandaag twee punten op de rol: de roadmap voor het tweede halfjaar en een evaluatiepunt. Dit is waarschijnlijk de laatste sessie vóór de vakantieperiode.

*Michiel* markeert dat het woord *deliverables* in zijn presentatie geen commitment aanduidt maar de **roadmap** — hij toetst met de werkgroep of de richting klopt en de juiste snaar wordt geraakt. Uit de vorige werkgroep is de rode draad blijven staan: een eigen **ODRL-applicatieprofiel** toegespitst op het Nederlandse stelsel, beproefd aan twee concrete cases (**BRP** en **BRO**).

{{< /chapter/section >}}

{{< chapter/section title="Basis: OpenFTV en het ODRL-applicatieprofiel" >}}

*Michiel* schetst de basis onder de roadmap: het ODRL-applicatieprofiel wordt tegelijk het uitwisselformaat van OpenFTV. De structuur van het toegangsbeleid in OpenFTV wordt afgestemd op het applicatieprofiel, en andersom. Beleid is daarmee export- en importeerbaar van en naar ODRL. OpenFTV blijft de authoring-omgeving; ODRL is het machine-leesbare uitwisselformaat.

**Uitvoerbaar beleid**

Om de uitvoerbaarheid van OpenFTV te behouden wordt ODRL uitgebreid met een `conformsToPolicy`-operand die naar concrete policy-engines verwijst (Rego, CEL, Cedar), zoals OpenFTV die vandaag al ondersteunt. Voor domeinspecifieke uitbreidingen — bijvoorbeeld een geografisch profiel of een complexe tijdrelatie in het iWlz-domein — komt een pluginarchitectuur, zodat nieuw geïntroduceerde termen ook technisch afdwingbaar gemaakt kunnen worden.

*Gideon Zegwaard* stelt voor om ook de **voorwaarderegel-systematiek uit het LOBRP** via zo'n plugin een plek te geven. In het gedefinieerde concept hang je dan een enforcement-regel die technisch gecheckt wordt, uitgedrukt als LOBRP-voorwaarderegel.

**Drie-trapsstructuur voor beleid per dataset**

*Michiel* schetst drie beleidslagen die per dataset gedeeld en gescheiden kunnen worden:

- **Algemeen beleid** per dataset — bijvoorbeeld de standaardvoorwaarden vanuit het LOBRP.
- **Afnemer-specifiek beleid** — zoals de autorisatiebesluiten die de BRP nu kent.
- **Scheiding per doel, algoritme of verwerking** — de doelbinding, zoals in de BRP nu in uitgeschreven tekst per doelbinding beschreven staat wat wel of niet mag. Deze scheiding kan zowel aan afnemers- als aan aanbiederskant belegd worden.

**Licentiemodel — een externe wereld die in licenties praat**

*René Kint* haakt aan met een openstaande vraag. In andere stelsels — open source-projecten, of DSGO in de gebouwde omgeving — wordt gewerkt met **licenties** als standaardvorm van uitwisseling. Moet FTV zich daar expliciet op voorbereiden, om juridische interoperabiliteit te bewijzen tussen ODRL en die licentie-praktijk?

*Michiel* licht toe dat een licentiemodel binnen ODRL een klassiek uitbreidingspatroon is: precies het type profiel waarbij het informatiemodel van ODRL wordt uitgebreid met nieuwe concepten. Dat is niet waar FTV op wil standaardiseren, omdat het per organisatie of use case invulbaar is; het FTV-applicatieprofiel richt zich op het pragmatische deel — envelop, structuur, mapping van doelbinding op refinements, uitwisselbaarheid en visualisatie. De inhoud (welke licenties) blijft uitbreidbaar via standaard ODRL.

*René* accepteert dat maar ziet in de volgende fase wél een use case: een bestaande licentie uit een DSGO-achtig stelsel oppakken en aantonen dat de interoperabiliteit inderdaad werkt. *Michiel* neemt dat expliciet op in de roadmap en stelt voor het mogelijk als één van de simulatiecases mee te nemen.

**Viewer**

OpenFTV gaat een ODRL-viewer leveren, vergelijkbaar met [Redoc](https://redocly.com/), die herbruikbaar is in datacatalogi zoals [catalogus.datastelsel.nl](https://catalogus.datastelsel.nl) en data.overheid.nl.

**Doel van ODRL als uitwisselstandaard — relatie met IAM**

*Marcel Molenaar* (UWV) stelt de vraag waarvoor de standaard is bedoeld: in welke gevallen ga je daadwerkelijk uitwisselen, en hoe past dit binnen het rijksbrede **IAM-afsprakenstelsel** waar nu aan gewerkt wordt (samenvoeging van eerder twee afzonderlijke stelsels voor identiteit en toegang)?

*Gideon* geeft het eerste niveau: een **basisbehoefte** is dat je in de catalogus per aanbod inzichtelijk hebt onder welke voorwaarden het beschikbaar is. *Michiel* vult aan met het volgende niveau: bij een concrete aansluiting tussen aanbieder en afnemer worden de specifieke condities expliciet vastgelegd — zowel aan de aanbieders- als aan de afnemerskant. Aan aanbiederskant kan dat gaan over welke gegevens onder welke voorwaarden geleverd worden; aan afnemerskant bijvoorbeeld dat toegang alleen via een beperkt aantal applicaties of gebruikersgroepen loopt. Hij plaatst dat in de FDS-context van organisatie-organisatie-uitwisseling: toegang van individuele medewerkers wordt door de afnemende organisatie ingericht en is zelf onderdeel van wat een afnemer expliciet kan maken naar de aanbieder.

*Marcel* zou autorisatie liever zo dicht mogelijk bij de bron houden — anders is een hack van een afnemer effectief een hack op alle aanbieders. *Michiel* erkent dat en wijst op de spanning met doelbinding: de aanbieder mag vaak niet weten voor welke doelbinding iets specifiek gebruikt wordt, want dan lekt via de bevraging al de reden van het gebruik. Ook wil je geen medewerkersinformatie of beheer-op-functiewijzigingen bij elke aanbieder opnieuw moeten inrichten. Het BRP-voorstel zoekt precies in die spanning naar een werkbaar evenwicht.

{{< /chapter/section >}}

{{< chapter/section title="Case 1 — BRP-keten: contouren van een experiment" >}}

**Autorisatiebesluiten bij de afnemer**

*Michiel* schetst de contouren van een BRP-experiment: verleg de autorisatiebesluiten naar de afnemer. De afnemer beheert zelf zijn autorisatiebesluiten en definieert per doelbinding een fijnmazige bevraging en eigen toegangsregels. Eén afnemer kan meerdere doelbindingen hebben; een gemeente definieert bijvoorbeeld een set fijnmazige doelbindingen per wettelijke taak (opsporing van strafbare feiten, Huisvestingswet 2014, waardering onroerende zaken). Het beleid wordt via ODRL inzichtelijk; het gebruik via de Authorization Decision Log.

**Samenstelling publieke autorisatiebesluit door RvIG**

RvIG krijgt inzage in de doelbindingen die de afnemer definieert en stelt op basis daarvan de publieke autorisatiematrix samen — de unie van de vinkjes per veld over alle doelbindingen van die afnemer. Functioneel is dat hetzelfde als wat er nu gebeurt, maar geautomatiseerd en met fijnmazige onderbouwing per subdoelbinding.

**De term doelbinding — begripsverwarring uitlijnen**

*Marcel* signaleert een misverstand rond de term *doelbinding*. Hij gebruikt hem voor de afscherming op recordniveau: een arts mag medische gegevens van zijn eigen patiënten zien, niet van willekeurige burgers. *Michiel* erkent dat de term geladen is (vandaar de toevoeging *doel / algoritme / verwerking*) en licht toe dat in deze context de fijnmazigheid op veld- en doelniveau zit. Hij illustreert dat een afnemer intern nog eigen voorwaarden hangt aan de toegang: alleen na training X voor gevoeligheidsniveau Y, of alleen voor medewerkers van afdeling X.

*Axel van der Minne* brengt een treffend voorbeeld in: een rechercheur mag bij bepaalde data, maar alleen voor de casussen waaraan hij is toegewezen — twee onafhankelijke regels die samen de resultatenset beperken. *Michiel* bevestigt dat beide regels expliciet in het ODRL-beleid horen, en *Gideon* voegt toe dat het juist regels zijn die de aanbieder niet kan beoordelen: die informatie stel je niet aan de aanbieder ter beschikking.

**Vertrouwensrelatie en verantwoordelijkheid**

*Marcel* worstelt met de gedachte dat de aanbieder gaat vertrouwen op wat de afnemer heeft ingeregeld: als beheerder van data heb je nu eenmaal eigen verantwoordelijkheden. *Michiel*: precies dat is wat dit voorstel faciliteert. In de praktijk zit dat vertrouwen er nu al vaak, alleen zonder inzicht — het experiment maakt expliciet wat in de keten gehandhaafd wordt, zodat toezicht überhaupt mogelijk is. *Gideon* draait de vraag scherper: waar ligt de verantwoordelijkheid voor het controleren dat het inderdaad een rechercheur is die aan die zaak is toegewezen — bij aanbieder of afnemer? Dat moet expliciet gemaakt worden.

*Marcel* zegt toe de aanpak beter te kunnen volgen nu de intentie helder is, maar houdt aan dat er verantwoordelijkheden aan beide kanten zitten en dat aan de vertrouwensrelatie stevige voorwaarden gesteld moeten worden.

**Verantwoording via geaggregeerde statistieken**

Naast het ODRL-beleid stelt *Michiel* voor om ook **geaggregeerde statistieken** te delen — bijvoorbeeld het aantal bevragingen per doelbinding per dag — als vorm van verantwoording zonder dat individuele gebruikersdata gedeeld hoeft te worden. *Gideon* bevestigt: precies zo geef je het vertrouwen vorm — als afnemer bied je een validatie waarin je aan de aanbieder verantwoordt dat je doet wat je zegt dat je doet.

**Inzage-API voor concrete ADL-records**

Voor situaties zoals een vermoeden van misbruik zou een inzage-API opgezet moeten worden waarmee individuele ADL-records bevraagd kunnen worden. Daar hoort waarschijnlijk een approval-stap bij: als aanbieder mag je niet zomaar alles bij een afnemer bevragen — je vraagt de afnemer of het mag. *Marcel* onderschrijft dat: fraudeonderzoek moet mogelijk zijn, maar vereist sterke afspraken en een goede vertrouwensrelatie.

**Reactie vanuit RvIG**

*Hans Hendrikman* (RvIG) sluit aan het einde van het onderwerp aan en geeft akkoord op de richting: "Een prima plan om het gewoon eens te proberen en te kijken wat eruit komt. Als je niet begint, blijft het een papierexercitie. En misschien levert het ook nog verrassende inzichten op." *Michiel* bevestigt dat het experimentele karakter precies de afdronk was van de vorige werkgroep — minder op het droge werken.

{{< /chapter/section >}}

{{< chapter/section title="Case 2 — BRO-keten: geografisch toegangsbeleid" >}}

De tweede case is de BRO-keten, met als focus geografisch toegangsbeleid van bronhouder naar landelijke voorziening. Het idee: een aantal bronhouders simuleren die hun eigen geografische toegangsbeleid definiëren op de eigen dataset, dat als ODRL aanleveren aan een centrale LV, en dat de LV dit beleid namens de bronhouder handhaaft. De bronhouder blijft verantwoordelijk en kan wijzigingen direct doorvoeren.

Aan de uitvoerende kant betekent dit dat er een policy enforcement point voor de geo-API geschreven moet worden. Dat willen we beproeven op tile- of map-gebaseerde API's met grote feature counts — schaal is een van de klassieke uitdagingen in het geo-domein. Concreet bestaat de roadmap voor deze case uit een ODRL-vocabulaire voor geo-toegangsbeleid (geen standaard, voor de simulatie), gesimuleerde bronhouders met concrete policies, een centraal ontsluitingspunt dat ODRL ontvangt en verwerkt, en geo-API PEPs die performance op grote feature counts laten zien.

*René Kint* heeft daar direct een suggestie: **defensie** loopt binnen de dataspace fysieke leefomgeving tegen ditzelfde vraagstuk aan. Hij heeft een contact en kan ze snel bij dit traject betrekken. *Gideon* onderstreept dat het ook echt belangrijk is dat de policies uit het veld komen — niet theoretisch, maar concrete policies die je ook echt tegenkomt. *René* bevestigt: die policies hebben en kennen we. *Michiel* omarmt dat en trekt de parallel voor BRP: aan RvIG-kant is er al een contact voor de aanbieders­zijde, aan de afnemerskant is een gemeente (Utrecht of Amsterdam) de logische partner.

Met instemming van de aanwezigen worden deze drie sporen — basis, BRP en BRO — de contouren voor wat in de tweede helft van het jaar beproefd wordt.

{{< /chapter/section >}}

{{< chapter/section title="Evaluatie eerste helft 2026" >}}

*Michiel* verzamelt input via een Miro-bord, met links *wat ging er goed* en *wat kan er beter*, en rechts *wat gaan we anders doen*.

**Wat ging er goed**

De MIDO-route verloopt soepel: twee standaarden zijn door de PTGU heen, waarvan de laatste vrijwel een hamerstuk. Werkgroepen online blijken te voldoen. Verder: organisatie en voortgang, een breed kennisniveau in de groep, nieuwe inzichten, open gesprekken en een constructieve houding, en het lukt om een complex probleemgebied behoorlijk concreet te krijgen.

**Wat kan er beter**

- **Kennisniveau en catch-up.** De werkgroep loopt al lang; niet iedereen heeft het geheel kunnen volgen. *Gideon* oppert een **catch-up-sessie** — de term blijft hangen.
- **End-to-end denken.** Meer denken en schetsen in de keten, met een gezamenlijk beeld van de eindarchitectuur inclusief werking. De vertrouwensrelatie tussen afnemers en aanbieders moet expliciet gemanaged worden.
- **Praktische oplossingen.** De stap van theorie naar praktijk moet gemaakt worden.
- **Informatievoorziening.** Terugvinden van informatie en agenda's eerder ontvangen. *Michiel* erkent dat hij de laatste weken steekjes heeft laten vallen: de gebruikelijke donderdagmail met de notulen van de vorige werkgroep en de agenda voor de komende ging een paar keer niet uit. *Marcel* bevestigt dat juist die mail belangrijk is om bij te blijven als je een keer niet kan deelnemen — hij heeft het gevoel op punten wat achter te lopen bij de rest.
- **Doel huidige sessie nog onduidelijk.** Ingebracht door *Remo van Rest*: binnen iWlz is het nog zoeken hoe ODRL daadwerkelijk in te zetten; het AuthZEN-deel slokt op dit moment veel op. *Michiel* komt naar aanleiding daarvan terug op zijn eerdere terughoudendheid over een iWlz-tijdrelatie in ODRL — hij ziet nu juist sterk dat die kant op gegaan kan worden en zal dat met ZIN/iWlz verder oppakken.

**Wat gaan we anders doen**

Het sterkste signaal uit de groep: **veel meer hands-on**. Het werd dit halfjaar te droog en te theoretisch. Per 1 juli komen er twee ontwikkelaars bij; het is tijd om te gaan klussen.

- **Hackathon** als concrete actie om het ontwikkelen op gang te brengen.
- **Betere agenda's en notulen** rondsturen — gewoon weer netjes oppakken.
- **Samenhang met andere gerelateerde stelsels.** *Marcel* benoemt het rijksbrede **IAM-afsprakenstelsel** (samenvoeging van wat eerder twee afzonderlijke stelsels waren voor identiteit en toegang; momenteel een 0.4-versie, contactpersonen zijn Anne Schreijer en Niels Overbeek). Hij doet komende week een review en zal vragen of ze een keer bij de werkgroep kunnen aansluiten — juist omdat hij in dat stelsel zijn vorm van doelbinding mist en beide stelsels op deze onderwerpen bijeen moeten komen. *René* is ook geïnteresseerd vanuit de dataspace fysieke leefomgeving; daar is IAM plateau 1.
- **Aansluiten op andere FDS-werkgroepen.** *Axel* gooit het idee in de groep: is het zinvol om te kijken wat andere FDS-werkgroepen doen, bijvoorbeeld de werkgroep **data inzicht**? Die werkt met metadata die dezelfde randvoorwaarden nodig heeft. *Gideon* zal een keer kletsen met de algemene FDS-contacten (André van Brussel en Danny), die het meest bij die werkgroepen betrokken zijn.

{{< /chapter/section >}}

{{< chapter/section title="Vervolgstappen" >}}

- **Vakantiestop:** de sessies van 7 juli, 21 juli en 4 augustus vallen weg; de werkgroep komt weer bijeen op **18 augustus**. Dit valt samen met de start van de twee nieuwe ontwikkelaars (1 juli) en biedt ruimte om in de vakantieperiode alvast te beginnen met klussen.
- *Michiel* pakt de contacten op voor de BRP-case (RvIG aan aanbiederszijde, Utrecht of Amsterdam aan afnemerszijde) en voor de BRO-case (via *René* defensie aanhaken).
- ZIN/iWlz-spoor rond de tijdrelatie in ODRL weer opnemen.
- Verkennen of de werkgroepen **data inzicht** en het rijksbrede **IAM-afsprakenstelsel** structureel meegenomen kunnen worden.
- Licentiemodel-interoperabiliteit (zoals DSGO) als mogelijke aanvullende case op de roadmap zetten.
- Catch-up-sessie inplannen om kennisachterstand bij deelnemers in te lopen.
- Agenda's en notulen weer consequent op donderdag vóór de werkgroep rondsturen.

{{< /chapter/section >}}
