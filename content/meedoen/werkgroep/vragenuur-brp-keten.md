---
type: 'chapter'
Title: Vragenuur BRP-keten met RvIG
---
{{< chapter/section title="" >}}
# Vragenuur BRP-keten met RvIG (12 mei 2026)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Remko Muis (RvIG)
- Hans Hendrikman (RvIG)
- Gideon Zegwaard (FDS)
- Igor van Haren (Vecozo)
- Maria Dziouba (Vecozo)
- Rob van Dort
- Guus van der Meer (Vecozo)
- Remo van Rest (ZIN)
- Hugo Mostard (Gemeente Den Haag)
- Nil Barua (Logius)
- René Kint
- Karl de Boer
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20260512-vragenuur-brp-keten.mp4)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking (5m)
- Presentatie vanuit RvIG (30m)
- Vragenuurtje (20m)
- Planning vervolg (5m)
{{< /chapter/section >}}

{{< chapter/section title="Welkom & kennismaking" >}}

*Michiel Trimpe* opent de werkgroep. Het onderwerp is de BRP-keten met RvIG. Er zijn geen nieuwe gezichten. Het oorspronkelijke vragenuurtje is uitgebreid met een presentatie door RvIG.

*Michiel* licht toe dat dit jaar in het teken staat van het Register Toegangsbeleid. De werkgroep verkent hoe aanbieders en afnemers hun toegangsbeleid inzichtelijk kunnen maken, publiek of binnen een federatief stelsel. Uit eerdere workshops kwam de BRP naar voren als meest volwassen casus. Een register toegangsbeleid voegt functioneel weinig toe aan wat RvIG al doet, maar kan het patroon breder herbruikbaar maken voor andere domeinen.

*Remko Muis* is LO-specialist bij RvIG en beheert samen met een collega de vijf logische ontwerpen, waaronder dat van de BRP. *Hans Hendrikman* is al langer bekend in de werkgroep en sluit later aan op het deel over de toekomst van de BRP.

{{< /chapter/section >}}

{{< chapter/section title="Presentatie BRP-keten en autorisatie" >}}

**Het BRP-stelsel op hoofdlijnen**

Gemeenten en, voor niet-ingezetenen, RNI-loketten houden persoonsgegevens bij. Die worden gesynchroniseerd naar de centrale BRP-Verstrekkingsvoorziening (BRP-V), die verstrekt aan landelijke afnemers. Een aantal afnemers (DUO, Belastingdienst, IND) is aangewezen om zelf rechtstreeks wijzigingen door te voeren in de RNI. Rond de centrale voorziening hangen satellietapplicaties voor kwaliteitscontrole en tabelbeheer.

**De Wet BRP**

Hoofdstuk 2 regelt de bijhouding (rollen, rechten, plichten van gemeenten en colleges van B&W). Hoofdstuk 3 regelt de verstrekking: aan overheidsorganen en aangewezen derden door de minister (RvIG), aan colleges van B&W, en specifieke regels voor binnengemeentelijke afnemers. Een aparte afdeling behandelt de rechten van de burger, die in elke verstrekking moeten worden meegewogen.

**De autorisatietabel**

De autorisatietabel is de technische vertaling van de door de Minister van BZK genomen autorisatiebesluiten. Per afnemer staat er één regel met daarin de spontane verstrekkingen (eventueel conditioneel), de selectieverstrekkingen, de ad-hoc-verstrekkingen en bijbehorende voorwaardenregels.

**Rechten van de burger**

Drie rechten zijn relevant bij verstrekking:

1. Recht op correctie van onjuiste gegevens (via de gemeente).
2. Recht op inzage in de eigen gegevens.
3. Recht op inzage in de verstrekkingen via het protocolleringsoverzicht: aan wie, wanneer en welke gegevens. Te krijgen via de gemeente. Via MijnOverheid is zichtbaar welke afnemers iemand volgen, maar nog niet op welke momenten ze daadwerkelijk gegevens hebben gekregen. Publicatie van het protocolleringsoverzicht via MijnOverheid is voorzien maar ligt nu stil.

**Beperkingen van autorisatie**

Autorisatie is strikt beperkt tot de gegevens die noodzakelijk zijn voor de wettelijke taak, betreffende personen ten aanzien van wie die afnemer die wettelijke taak heeft, en op een wijze die past bij de informatiebehoefte.

**Experimenten onder de Wet BRP**

De Wet BRP staat experimenten toe voor maximaal vier jaar. Op dit moment lopen er drie:

1. Uitbreiding bijhouding niet-ingezetenen door gemeenten.
2. Informeren van ingezetenen over inschrijvingen op het woonadres (verhuisbrief met aantal bewoners).
3. Dataminimalisatie uit de BRP. De minister mag gegevens bewerken tot informatie en verstrekken aan overheidsorganen en aangewezen derden mits convenant. Dit gaat via de BRP API.

Dataminimalisatie betekent in de praktijk bijvoorbeeld een leeftijd in plaats van een geboortedatum, of een aanschrijfnaam in plaats van alle gegevens (partner, ex-partners, eigen naamgebruik) die nodig zijn om die naam zelf samen te stellen. Inmiddels zijn 121 gemeenten en 65 overheidsorganen of aangewezen derden aangesloten. Een wetswijziging om dit definitief toe te staan is in voorbereiding.

Twee inherente beperkingen van de huidige BRP API:

- Informatie wordt on-the-fly afgeleid bij elke vraag. Alleen ad-hoc verstrekking is daarmee mogelijk, geen spontane verstrekking.
- BRP-V is niet real-time up-to-date. Bij een verhuizing kan synchronisatie uren tot dagen duren. Voor binnengemeentelijke afnemers die overstappen op de BRP API kan dat een proces-blokkade vormen.

**Richting de toekomst: gebeurtenis-gebaseerde architectuur**

Om die beperkingen te adresseren wordt gewerkt aan een notificatie-API. Afnemers krijgen een signaal bij gebeurtenissen op een persoonslijst en kunnen daarop een ad-hoc-verstrekking triggeren. BZK ziet dit als de toekomst van de BRP: verdere dataminimalisatie en *halen bij de bron*, waardoor afnemers afscheid kunnen nemen van lokale kopieën. Ook de Belastingdienst denkt mee over een meerjarenplan om de eigen lokale kopie af te schaffen. Het aantal bevragingen zou daarmee aanzienlijk toenemen, wat eisen stelt aan beschikbaarheid en het real-time-karakter van de BRP.

**Twee API-stromen en twee architectuur-varianten**

Aansluitend op het toekomstbeeld licht *Hans Hendrikman* twee API-stromen toe:

- **BRP-berichten-API**: de vervanger van de huidige mailbox. De bestaande autorisatie loopt hierop gewoon mee.
- **BRP-API**: gericht op informatieproducten.

Binnen de BRP-API bestaan twee architectuur-varianten:

1. **Binnengemeentelijke afnemers**. Een gemeente heeft van nature brede toegang vanuit de eigen bijhoudingstaak. Buitengemeentelijke gegevensvragen vereisen wel autorisatie. Onder het experimentbesluit verschuift de autorisatie van binnengemeentelijke afnemers volledig naar de gemeente: de gemeente krijgt volledige toegang tot de BRP-V, met de plicht intern bij te houden aan wie wat verstrekt wordt.
2. **Reguliere afnemer met overheidstaak**. Het blokje "autoriseren/toetsen" schuift naar de aanbiederzijde. Op basis van een notificatie plus informatievraag levert RvIG een informatieproduct. Dat heeft gevolgen voor de protocollering: RvIG moet zelf bijhouden wat verstrekt is.

Het onderscheid zit in de positie van het autoriseren ten opzichte van de aanbieder: bij gemeenten staat het buitenshuis (gemeente regelt zelf), bij landelijke afnemers staat het binnenshuis (RvIG handhaaft).

{{< /chapter/section >}}

{{< chapter/section title="Discussie tijdens en na de presentatie" >}}

**Twee of drie niveaus van toegangsbeleid**

*Gideon Zegwaard* herkent twee niveaus van toegangsbeleid:

- Het algemene toegangsbeleid dat beschrijft hoe je tot een autorisatie komt: welke stappen, welke aanlevering, welke criteria.
- Het specifieke toegangsbeleid per afnemer dat het resultaat van die procedure is, namelijk de autorisatietabelregel zelf.

Op de vraag van *Michiel* of de kruisjeslijsten per taak publiek zijn, bevestigt *Remco* dat alleen de autorisatiebesluiten publiek zijn. Het aanvraagformulier met taakspecifieke kruisjeslijsten is dat niet. *Michiel* leidt daaruit een derde laag af: het afnemersbeleid, dat formeel buiten RvIG valt. Afnemers werken intern vaak met taakspecifieke kruisjeslijsten en zouden dat op hun beurt ook met ODRL inzichtelijk kunnen maken.

**Fijnmazigheid en herleidbaarheid**

*Remco* licht toe dat de autorisatietabel structurele grofmazigheid kent. Sommige afnemers (politie, AIVD) hebben meerdere regels om verschillende vertrouwelijkheidsniveaus en burgerinzagerechten te onderscheiden. Bij afnemers met meerdere wettelijke taken wordt het vaak platgeslagen tot de superset aan gegevens. Fijnmazigere uitsplitsing per taak wordt aan de afnemer overgelaten, maar daar bestaan geen standaard-handvatten voor. Ook frequentie is grofmazig: maandelijkse en jaarlijkse selecties zijn lastig apart te regelen. Op de vraag van *Michiel* of dat bij RvIG of bij de afnemer hoort, antwoordt *Remco* dat dit nu bij de afnemer ligt.

*Gideon* benoemt het dilemma: fijnmazigheid leidt tot herleidbaarheid. Zou RvIG weten voor welke specifieke taak een individuele bevraging plaatsvond, dan ontstaat informatie die je daar misschien niet wilt hebben. *Remco* bevestigt dat fijnmazigheid ook tot herleidbaarheid kan leiden, en dat dit niet altijd wenselijk is. *Gideon* voegt toe dat de tegenovergestelde keuze (altijd alles geven) er ook toe leidt dat afnemers meer ontvangen dan ze op dat moment nodig hebben. Het blijft een afweging.

**Ad-hoc versus selectie en spontaan**

*Gideon* en *Remco* lopen het verschil door: bij selecties en spontane verstrekking ontvangt een afnemer waarvoor hij geautoriseerd is, ongeacht of dat op dat moment nodig is. Bij ad-hoc-bevraging moet de afnemer altijd expliciet aangeven welke rubrieken hij wil. Daar zit dus van nature al fijnmazigheid in.

**Burgerregie en grondslagen**

*Remko* benoemt een verschil tussen registers. Bij het handelsregister kan de burger zelf aangeven of het eigen adres publiek wordt gemaakt; in de BRP is die regie er beperkt. Voor verstrekkingen aan zogenaamde vrije derden (partijen zonder wettelijke grondslag, zoals de Stichting Interkerkelijke Ledenadministratie, SILA) kan de burger via een geheimhoudings-aanvraag de verstrekking laten blokkeren. Voor verstrekking aan overheidsorganen met een wettelijke taak bestaat zo'n opt-out niet. Idealiter zou een burger op MijnOverheid per afnemer kunnen aangeven welke verstrekkingen wel of niet gewenst zijn.

*Gideon* legt het verband met de AVG-grondslagen: bij een wettelijke grondslag heeft de burger weinig zeggenschap; bij een consent-grondslag (zoals bij SILA) wel. In dat laatste geval zou een formeel consent-construct kunnen worden gehanteerd in plaats van de huidige geheimhoudings-route.

**Patroon en gelaagdheid over de keten**

*Gideon* merkt op dat het patroon van interne toegangsbeperking niet beperkt is tot gemeenten. Zodra een afnemer meerdere applicaties heeft die op BRP-gegevens leunen, is intern alweer toegangsbeleid nodig. Bovendien leveren afnemers vaak weer door: DUO is een gewone landelijke afnemer maar levert zelf door aan Studielink, dat weer doorlevert aan universiteiten en hogescholen. Elke schakel moet autoriseren en toetsen. *Remko* merkt op dat de gemeente daarin een uitzondering is door de van-nature bredere toegang ten opzichte van een reguliere afnemer.

*Remko* voegt toe dat RvIG geen zicht heeft op de distributie achter de verstrekking. Wat er bij een afnemer intern mee gebeurt is voor RvIG niet zichtbaar. *Gideon* maakt daarvan een transparantie-punt: ook afnemers zouden hun toegangsbeleid inzichtelijk moeten kunnen maken.

*Michiel* vat samen dat er sprake is van hiërarchische gelaagdheid in toegangsbeleid. Een aanbieder heeft beleid voor zijn afnemer; die afnemer is zelf weer aanbieder met eigen beleid; en zo door over de keten. Het is geen één-staps relatie maar een meerstaps relatie.

**BRP als model voor andere registers**

*Gideon* merkt op dat de BRP volwassen is in toegangsverlening. Andere registraties met persoonsgegevens (polisadministratie, basisregistratie inkomen, handelsregister, eigendomsinformatie) zijn niet zo gestructureerd ingericht. Daar valt veel van te leren. Voor de werkgroep ligt er een opdracht om een ODRL-profiel of voorbeeld neer te zetten dat de BRP-systematiek modelleert, en dezelfde structuur ook bij afnemers neer te leggen. Een concreet voorbeeld is de standaardisatie van doelbinding: hoe schrijf je in ODRL op dat een afnemer gegevens nodig heeft voor een specifieke wettelijke taak, en hoe verbind je dat aan de fijnmazige uitsplitsing bij de afnemer? Daar bestaat nu geen afspraak over.

{{< /chapter/section >}}

{{< chapter/section title="Vragenuurtje — stelselbeleid en handhaving" >}}

*Igor van Haren* stelt de afsluitende vraag. In de zorg willen partijen ODRL-autorisaties op één centrale plek inzichtelijk maken (een IAM-achtige structuur) in plaats van de verantwoordelijkheid voor goede inrichting bij individuele partijen te leggen. Hoe ziet de overheid dat?

*Michiel* trekt de parallel met BRO en met het FDS-perspectief. Een bronhouder kan zijn eigen beleid aanleveren aan een landelijke voorziening, waarna de afdwinging centraal gebeurt. De verantwoordelijkheid voor het beheer blijft bij de bronhouder; de afdwinging kan centraal worden ingericht. Dit is ook een van de cases die in de werkgroep verkend gaat worden.

*Igor* nuanceert dat afdwinging decentraal mag plaatsvinden. Bij de Wlz legt het Zorginstituut Nederland de grondslagen vast, terwijl zorgkantoren die lokaal kunnen toepassen, eventueel hybride. Wel moet er centraal vastgelegd beleid worden gehandhaafd. ODRL helpt daarbij omdat de beschrijving uniform interpreteerbaar is, ongeacht waar de afdwinging plaatsvindt.

*Michiel* introduceert het concept stelselbeleid in ODRL. Een datastelsel publiceert zijn ODRL-beleid; afnemers of handhavers refereren ernaar en "trekken het binnen" in het eigen toegangsbeleid. Een organisatie kan dan zeggen: "ik heb organisatiebeleid A, B en C, maar omdat ik deel uitmaak van stelsel X handhaaf ik ook het stelselbeleid van X." Wel wijst *Michiel* erop dat ODRL van oorsprong gericht is op beschrijven, niet op afdwingen. De koppeling tussen ODRL en technisch afdwingbare regels moet expliciet worden gemaakt en is nu nog niet gestandaardiseerd.

*Rob van Dort* sluit aan met een ander aspect. Om automatische toepassing van regels (STP-achtig) mogelijk te maken, kan het nodig zijn aanvullende metadata vast te leggen over welke gegevens privacygevoelig zijn en welke niet, fijnmaziger dan op datasetniveau, dus op gegevenselement-niveau. *Michiel* erkent dat dit raakt aan de spanning tussen ODRL als beschrijvingsmiddel en de behoefte aan technische afdwinging.

*Igor* en *Michiel* stellen dat dit het werk is voor de aankomende ODRL-workshop in de werkgroep.

{{< /chapter/section >}}

{{< chapter/section title="Planning vervolg" >}}

- **Definitie van de niveaus**. *Gideon* stelt voor de gesignaleerde lagen (algemeen beleid, autorisatiebesluit-beleid, afnemersbeleid, eventueel stelselbeleid) helder te definiëren als gezamenlijke basis.
- **Aansporing**. *Rob van Dort* vraagt aandacht voor de relatief kleine kring vandaag. De opname graag doorzetten naar werkgroep-leden die er niet bij waren.
- **Volgende sessie als workshop**. Gezamenlijke werkgroep-ODRL-workshop. Niet centraal aangestuurd, maar als groep verkennen welke concepten in ODRL passen, wat we kunnen modelleren en hoe we het kunnen toepassen, inclusief de vraag hoe je beleid van de ene partij oplegt aan de volgende in de keten.
- **Klein werkgroepje vrijwilligers**. *Rob van Dort* oppert om een case te laten uitwerken door een klein groepje en de uitwerking in te brengen voor brede bespreking.
- **Werkvorm**. De werkgroep is feitelijk online-only geworden. *Michiel* kondigt aan niet meer elke tweede dinsdag naar Den Haag af te reizen, tenzij we expliciet hybride samenkomen.
- **Vecozo-demo**. *Igor* meldt dat Vecozo (samen met *Guus van der Meer*) bezig is met een demo van de hele keten ODRL → AuthZ → policies → daadwerkelijke autorisatie in een GraphQL-context. Over circa een maand willen ze die intern presenteren. Aanbod om die ook in de werkgroep te tonen.
- **Aanstaande dinsdag**. ODRL-overleg tussen *Michiel* en *Igor*. Bevindingen daarvan komen mee naar de volgende werkgroep.
- *Michiel* dankt *Remco* en *Hans* voor de presentatie en het neerzetten van het brede kader.

{{< /chapter/section >}}
