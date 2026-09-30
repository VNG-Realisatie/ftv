---
type: 'chapter'
Title: AuthZEN & GraphQL
---
{{< chapter/section title="" >}}
# AuthZEN & GraphQL (29 september 2026)

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Marc de Boer (FTV)
- Gideon Zegwaard (FDS)
- Daniel Kapitan (Dutch Hospital Data)
- Peter-Jan Karens (GBO)
- Govert Claus (GBO)
- Jeroen de Kok (GBO)
- Thijs Rijpert (BKWI)
- Thom Kusse (BKWI)
- Wessel Schollmeijer (Logius)
- Nil Barua (Logius)
- Kees Wuister (Vecozo)
- Igor van Haren (Vecozo)
- Guus van der Meer (Vecozo)
- Mark Westbroek (VNG)
- Karl de Boer (Not So Common)
- Floris Deutekom (Geonovum)
- Hugo Mostard (Gemeente Den Haag)
- Remo van Rest (Zorginstituut Nederland)
- Joyce Leijen-Kouwenberg (Zorginstituut Nederland)
- Maryse Bücking (NDW)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20260929-authzen-graphql.mp4)
- [Presentatie AuthZEN & GraphQL](/ftv/documents/20260929-authzen-graphql.pdf)
- [Presentatie Introductie GBO](/ftv/documents/20260929-intro-gbo.pdf)
- [FTV GraphQL Profile for the NLgov AuthZEN Authorization API (specificatie)](/ftv/documents/20260928-ftv-graphql-profile.html)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking
- Openstaande issues AuthZEN NLGov
- GraphQL autorisatie
- Planning vervolg
{{< /chapter/section >}}

{{< chapter/section title="Welkom en kennismaking" >}}

*Michiel Trimpe* opent de sessie, die met de IAM-focus van de werkgroep de
technische kant opzoekt; de volgende sessie richt zich weer op ODRL en
linked data. Er zijn veel nieuwe gezichten.

*Daniel Kapitan* is architect bij Dutch Hospital Data voor een programma
dat op een federatief netwerk van 35 ziekenhuizen draait. Eén van de grote
vraagstukken daar is via welke standaarden toegangsverlening plaatsvindt.
Hij wil het zorgveld richting de federatieve aanpak bewegen en vooral
voorkomen dat de zorg het wiel opnieuw uitvindt; hij nodigt de werkgroep
uit om elkaar daarvoor te gebruiken.

*Wessel Schollmeijer* is content architect bij Logius in het domein
publicaties en sluit op verzoek van de collega's van de stelselcatalogus
aan; zijn interesse ligt vooral bij ODRL en datastandaarden. *Michiel*
licht toe dat de werkgroep om en om een IAM- en een ODRL-focus hanteert.

*Thom Kusse* is product owner bij BKWI (Bureau Keteninformatisering Werk
en Inkomen), dat de gegevensuitwisseling tussen overheidsinstanties in het
domein werk en inkomen verzorgt. Naast hem zit zijn collega *Thijs
Rijpert*, ontwikkelaar. BKWI kende de werkgroep al langer, heeft ervaring
met GraphQL en is via het Digilab-evenement bij deze sessie beland.

*Kees Wuister* is informatieanalist bij Vecozo, richt zich op het
schrijven van policies en policy-based access control en vervangt Maria,
die tot nu toe deelnam. *Jeroen de Kok* is ontwikkelaar bij het project
GBO en zal vandaag niet presenteren.

{{< /chapter/section >}}

{{< chapter/section title="Draagvlak Authorization Decision Log" >}}

*Michiel* meldt dat de aanmelding van de Authorization Decision Log bij
Forum Standaardisatie loopt. Eén van de vragen daarbij is welke
organisaties de standaard al ondersteunen; hij inventariseert in de
werkgroep wie dat voor zijn organisatie kan zeggen of daarover het
gesprek wil voeren.

- *Igor van Haren* geeft aan dat Vecozo de standaard in het beleid
  opneemt. Op zijn vraag of Vecozo als uitvoeringsorganisatie meetelt,
  bevestigt *Michiel* dat de definitie overheid, semi-overheid en
  uitvoeringsorganisaties omvat.
- *Peter-Jan Karens* meldt dat GBO de standaard in de architectuur heeft
  opgenomen en in de huidige simulaties toepast.
- *Karl de Boer* heeft een eigen implementatie gemaakt, maar met een
  behoorlijke afwijking omdat hij met de standaard zelf niet goed uit de
  voeten kon. *Michiel* hoort graag welke lessen daaruit te trekken zijn.
- *Thijs Rijpert* geeft aan dat BKWI nog in een verkennende fase zit:
  geïnteresseerd, maar nog aan het kijken hoe FTV toe te passen is.
- *Hugo Mostard* vindt het interessant, maar wijst erop dat de gemeente
  geen ontwikkelorganisatie is; Den Haag wacht tot de markt of een
  open-sourceoplossing zich aandient.
- *Mark Westbroek* geeft aan dat VNG vanuit Common Ground volgt wat het
  FTV-project maakt en FTV aanbeveelt zodra het er volledig is; capaciteit
  om zelf te bouwen is er nog niet.

Aan het einde van de sessie licht *Nil Barua* toe waarom deze vraag nu
speelt: Logius beheert de standaarden en moet voor het aanmeldformulier —
dat zowel de Authorization Decision Log als AuthZEN NLGov betreft —
draagvlak vanuit stakeholders aantonen. Hij vraagt of hij de leden van de
werkgroep in het formulier mag noemen als ondersteuners van de aanmelding,
de adoptie en een mogelijke verplichting. Wie bezwaar heeft kan dat
melden, ook achteraf via de mail; *Thijs* geeft aan dat BKWI er later op
terugkomt. *Wessel* onthoudt zich vooralsnog van een standpunt omdat hij
nog onvoldoende achtergrondinformatie heeft; hij komt erop terug en zijn
naam blijft voorlopig buiten het formulier. Zonder tegenbericht vult Nil
de overige namen alvast in.

{{< /chapter/section >}}

{{< chapter/section title="GraphQL-autorisatie (GBO)" >}}

De hoofdpresentatie wordt verzorgd door GBO. *Michiel* introduceert het
onderwerp: hoe pas je autorisatie toe op GraphQL, juist in situaties
waarin verkeer generiek ontsloten wordt — meerdere partijen binnen de
overheid (iWlz, BKWI, GBO) zijn hiermee bezig, en het voorstel raakt
mogelijk ook het OpenFTV-product zelf.

**Gemeenschappelijke Bronontsluiting.** *Govert Claus* schetst wat GBO
(Gemeenschappelijke Bronontsluiting) is: een samenhangende set afspraken,
standaarden en waar nodig voorzieningen waarmee overheidsbronhouders hun
gegevens op één gestandaardiseerde manier ontsluiten voor drie
gegevensstromen — de EDI-wallet, SDG/OOTS en het delen van gegevens met
private dienstverleners op basis van toestemming (DVTP). De bronhouder
implementeert de afspraken zelf en houdt de regie; GBO helpt met een
referentie-implementatie en richt centrale voorzieningen in waar dat
nodig is, zoals een toestemmingsvoorziening en pseudonimisering op basis
van de bestaande BSNk-voorziening van Logius. Het ontwerp hergebruikt
bestaande bouwstenen, waaronder AuthZEN en de Authorization Decision Log,
en kiest GraphQL als bevragingsmechanisme. Na een globaal ontwerp werkt
het programma nu aan een projectstartarchitectuur en technisch ontwerp;
via pilots moet de aanpak eind volgend jaar preproductioneel beschikbaar
komen. Zie de opname en de presentatie voor het volledige verhaal.

In de discussie vraagt *Karl* waarom GraphQL en niet REST met een
veldselectiemechanisme; hij voorziet GraphQL-naar-REST-adapters en wijst
erop dat Digikoppeling al veel standaarden ondersteunt. *Govert* en
*Peter-Jan* lichten toe dat GraphQL als gestandaardiseerd protocol de
flexibiliteit en dataminimalisatie biedt die met REST op twintig
verschillende manieren opgelost zou worden; GraphQL komt naast REST te
staan, niet ervoor in de plaats, en de pilots kunnen uitwijzen dat een
REST-oplossing alsnog nodig is. Op de vraag van *Daniel* of ook naar
gezondheidsgegevens is gekeken antwoordt *Govert* dat GBO niet
domeinspecifiek is en de pilots geen zorgvoorbeelden bevatten; het
sociaal domein kan er in theorie wel overheen lopen. *Igor* vult aan dat
binnen de Wlz al met GraphQL-gebaseerde uitwisseling wordt gewerkt en dat
wordt onderzocht of het datamodel en het netwerkmodel naar de Wmo en
jeugdzorg verbreed kunnen worden — dat loopt al, maar vergt jaren.
*Wessel* vraagt naar de semantiek bij het samenbrengen van meerdere
GraphQL-endpoints, omdat een schema nog geen betekenis draagt; *Govert*
antwoordt dat semantiek een eigen onderwerp in het globaal ontwerp is,
zonder dat er al een oplossing ligt. *Nil* wijst op de bijeenkomst van
het Kennisplatform API's op 5 november over het standaardiseren van
GraphQL binnen Digikoppeling en roept geïnteresseerden op daaraan deel te
nemen.

**Voorstel: AuthZEN toepassen op GraphQL.** *Peter-Jan Karens*, lead
architect van het programma GBO, presenteert een eerste voorstel voor
autorisatie op GraphQL met FTV-standaarden, beproefd in een
simulatieomgeving die op de FDS-simulatieomgeving draait. De kern van het
probleem: alle GraphQL-verzoeken gaan naar één endpoint en de query zit
als tekst in het bericht, dus aan de URL valt niet te zien wat er
gevraagd wordt — een AuthZEN-koppeling zoals in OpenFSC zou daarmee de
volledige GraphQL-logica naar de PDP verschuiven. Het voorstel plaatst
daarom een *mapper* vóór het endpoint die het schema en de query ontleedt
en het AuthZEN-verzoek verrijkt met een lijst van gevraagde typen, velden
en argumenten. De PDP hoeft daardoor geen GraphQL te begrijpen en het
ontwerp werkt met elke policy-engine; een OPA-plugin bleek ongeveer
duizend regels boilerplate-Rego te vergen en de recent voorgestelde
COAZ-standaard is als één-op-één-mappingtaal te beperkt. Bewuste
ontwerpkeuzes: de policies bepalen de toegang (de API blijft de API),
deny by default omdat GraphQL versieloos is en er dus velden bij kunnen
komen, alles-of-niets per query met duidelijke foutcodes — ook voor de
decision log — en geen standaardwaarden voor parameters, omdat de query
dan ambigu wordt. Policies zijn op type- en veldniveau te schrijven, met
condities op argumenten; wat niet beschreven is, is niet opvraagbaar.
Peter-Jan heeft er een eerste specificatie voor geschreven die hij met de
werkgroep deelt, en nodigt uit om er samen verder aan te werken.

{{< /chapter/section >}}

{{< chapter/section title="Vervolgstappen" >}}

De werkgroep gaat een verdiepingsslag op het GraphQL-voorstel doen;
*Michiel* stelt voor dat in ieder geval BKWI en de Wlz-keten er
inhoudelijk naar kijken, en wie interesse heeft meldt zich zodat die in
het vervolg wordt meegenomen. Over vier weken staat het vervolg gepland.

Afspraken: *Peter-Jan* stuurt de presentatie en de onderliggende
specificatie naar *Michiel*, die ze met een link naar het
Mattermost-kanaal rondmailt, zodat vragen en antwoorden voor iedereen
leesbaar zijn. *Nil* vult het aanmeldformulier voor Forum Standaardisatie
in met de werkgroepleden als ondersteuners; BKWI komt daar nog op terug.
*Michiel* organiseert komende week dinsdag de ODRL-workshop in Den Haag,
mogelijk ook in Utrecht; wie de datumprikker nog niet invulde maar wil
aansluiten, meldt zich bij hem.

{{< /chapter/section >}}

{{< chapter/section title="" >}}
*Dit verslag is met een LLM gegenereerd op basis van de opname en door mensen gereviewd.*
{{< /chapter/section >}}
