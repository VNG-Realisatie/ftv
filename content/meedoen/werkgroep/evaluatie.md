---
type: 'chapter'
Title: 9. Evaluatie
---

{{< chapter/section title="Update en evaluatie (1 juli 2025)" >}}

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV) 
- Lexi Rowland (Kadaster)
- Hans Hendrikman (RvIG)
- Maryse Bücking (NDW)
- Wouter Diephuis (MinBZK)
- Rens Kievit (MinBZK) 
- Marc de Boer (FTV) 
- Karin Hiralal (FTV) 
- Gerard Juijn (FTV) 
- Guus van der Meer (Vecozo) 
- Remo van Rest (Zorginstituut Nederland) 
- Duuk Calor (Vecozo) 
- Hans Schevers (Kadaster) 
- Stas Mironov (Logius) 
- Nico Spijkers (MinBZK)
- Gerard van der Hoeven (iSHARE)
- Frank Terpstra (Geonovem)
{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom 
- Update subwerkgroepen
- Evaluatie
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}} 
- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20250701-evaluatie.mp4)
{{< /chapter/section >}}

{{< chapter/section title="Welkom" >}}
*Maryse Bücking* stelt zich voor. Ze is informatiearchitect Nationaal Dataportaal Wegverkeer en werkt onder andere aan federatieve dataspaces van mobiliteit en logistiek.
{{< /chapter/section >}}

{{< chapter/section title="Update subwerkgroepen" >}}
De subwerkgroep Juridisch Kader heeft met MinBZK de exacte reikwijdte van het juridisch kader nogmaals afgestemd. Wouter Diephuis zal samen met zijn collega's een voorstel doen voor de hoofdstukstructuur en dit voorleggen aan de werkgroep.

De subwerkgroep Authorization Decision Log heeft de voortgang van de [standaard](https://vng-realisatie.github.io/authorization-decision-log/) getoond. Deze is nog deels in het Nederlands geschreven en zal stapsgewijs naar het Engels vertaald worden. De [scope](https://vng-realisatie.github.io/authorization-decision-log/#scope) werd gedeeld en hier waren geen opmerkingen over. Daarna werd de [berichtdefinitie](https://vng-realisatie.github.io/authorization-decision-log/#interface) gedeeld.

*Gerard van der Hoeven* vraagt waarom niet gewoon het iSHARE berichtformaat wordt gebruikt. *Michiel Trimpe* geeft aan dat de laatste helft van de werkgroep gewijd wordt aan een retrospective waar dit ook gedeeld kan worden.

*Frank Terpstra* vraagt of er al een alternatief is gevonden voor het gebruik van het AVG-verwerkingenregister om aan te geven waar een logregel voor weggeschreven wordt. *Michiel Trimpe* laat hierop de [Action properties in AuthZEN NLGov](https://vng-realisatie.github.io/authzen-nlgov/#action-properties) zien die in het `request` opgenomen zullen worden. *Frank Terpstra* geeft aan dat dit ook nog niet helemaal werkt wanneer het algoritmeregister hierbij betrokken wordt. De voornaamste les uit [Logboek Dataverwerkingen voor (geo)objecten](https://geonovum.github.io/logboek-dataverwerkingen-voor-objecten/) was dat het algoritmeregister te grofmazig is voor deze toepassing.

**Beslissing** Er zal, in afstemming met Logboek Dataverwerkingen, gekeken worden naar een gepaste manier van verwijzing naar de juridische basis van de gegevensverwerking.

De subwerkgroep AuthZEN NLGov deelt de eerste versie van [AuthZEN NLGov](https://vng-realisatie.github.io/authzen-nlgov/) ter review. Alle aanpassingen op AuthZEN worden voorgelegd aan de werkgroep. 

*Frank Terpstra* geeft aan dat hij het X-Request-ID ziet als een ander type identifier dan de W3C Trace Context. Request Identification hoeft dus wellicht niet uit de standaard verwijderd te worden.

**Beslissing** Er zal met Logboek Dataverwerkingen afgestemd worden of zij X-Request-ID als conflicterend of aanvullend zien.

*Michiel Trimpe* stelt voor om tijdens de vakantieperiode geen werkgroepen te houden maar de subwerkgroepen wel door te laten gaan. 

*Michiel Trimpe* geeft aan dat het moeilijk is om de notulen en de chat aan elkaar te koppelen en vraagt of deze mondeling gedeeld kunnen worden.

*Gerard van der Hoeven* geeft aan dat AuthZEN niet voor inter-organisatorisch gebruik bedoeld is, terwijl iSHARE dat wel heeft. De structuur die iSHARE nu gebruikt voor policies is rudimentair. iSHARE heeft door de jaren heen allerlei doorontwikkelingen gedaan op policystructuren. Daar valt juist heel veel van te gebruiken. Zeker als er cross-organisatorisch ook juridische dekking voor moet zijn. Daar zitten stevige verschillen in en AuthZEN gebruiken en er stukken aanbouwen die ontbreken, is opnieuw ontwikkelen.

*Michiel Trimpe* geeft aan dat AuthZEN gekozen is omdat het een initiatief is van een groep van Policy Decision Point leveranciers. Die leveranciers bemerkten dat het inderdaad moeilijk was om policies tussen leveranciers te standaardiseren. Ze hebben toen gekozen om een klein stuk 'consensus af te pellen.' Dit was dat iedereen het er mee eens was dat toegangsverzoeken en -beslissingen daarop goed gemodelleerd moeten kunnen worden en dat ze dit allen delen. Dat is dus ook alles wat AuthZEN zegt en we zien dus ook geen reden waarom dit niet samen kan gaan met iSHARE.
{{< /chapter/section >}}

{{< chapter/section title="Evaluatie" >}}
De evaluatie gebeurt via een Miro-bord. Werkgroepleden plaatsen sticky notes om aan te geven:
1.  Wat gaat goed.
2.  Wat kan beter.
3.  Wat kunnen we veranderen.
4.  Wat gaan we anders doen.

Met sticky stemmen geven de leden aan welke punten zij steunen.

**Wat gaat goed:**

- De werkgroep en subwerkgroepen houden het tempo erin. (Nico Spijkers)
- De onderwerpen worden goed geïdentificeerd. (Nico Spijkers).
- Gezamenlijke discussies. (3 stemmen)
- Uitgave van de FTV-nieuwsbrief. (Guus van der Meer, 1 stem)
- Het werken in subwerkgroepen.
- Aansluiting op internationale standaarden. (Rens Kievit, 3 stemmen)

**Wat kan beter:**

- Meer ruimte bieden voor lessons learned uit de praktijk. (Nico Spijkers)
- Het werk is zeer specialistisch. Het kennisniveau van mensen is daarom niet altijd gelijk en besluiten zijn niet altijd volledig geïnformeerd. (Gerard van der Hoeven, 3 stemmen)
- Er is vaak een voorkeur voor bekende of eigen oplossingen. (Frank Terpstra)
- Documentatie vooraf delen wanneer deze mogelijk wordt besproken. (Guus van der Meer).

*Michiel Trimpe* merkt op dat de agenda soms krap is en vraagt of dit ertoe leidt dat discussies worden afgekapt of uitlopen. Dit wordt door werkgroepleden niet herkend.

**Wat kunnen we veranderen:**

- Expertteams inzetten die zich verdiepen in een specifiek onderwerp. (Gerard van der Hoeven, 1 stem)
- Er is naast dit project een brede ontwikkeling gaande rond Verifiable Credentials (VC’s). Het is belangrijk om daar open voor te staan, ook met het oog op de langere termijn. (Gerard van der Hoeven, 1 stem)
- Meer samenwerken met iSHARE-specificatieteams en daar feedback of wensen indienen. (Gerard van der Hoeven, 1 stem)
- Praktische toepassingen als startpunt gebruiken om de aanpak aan te toetsen, naast de consensusaanpak hier. (4 stemmen)
- Het breder trekken naar andere ministeries die hier gebruik van willen maken, zoals I&W, en specifiek naar cross-organisatie-datastelsels. (1 stem)
- Bewust zijn van eigen bias en waken voor not invented here.

**Wat gaan we anders doen:**

*Michiel Trimpe* geeft op het Miro-bord de verbeteracties aan:

- Evaluatie van standaarden op not invented here.
- Na de zomervakantie praktische toepassingen ophalen en uitdiepen in de werkgroep.
- Een iSHARE deep dive uitvoeren,
- Iteratief werken: de standaard opstellen, implementeren en verbeteren op basis van feedback.

*Marc de Boer* nodigt de werkgroepleden uit om praktische datastelsels en toegangsverleningsoplossingen aan te dragen die nog niet bekend zijn, zodat de projectgroep hiermee in gesprek kan gaan.

*Gerard van der Hoeven* wijst op de Digitale Voorziening Uitwisseling (DVU), een platform bij de Dienst ICT Uitvoering (DICTU). Dit werkt al met federatiecomponenten en loopt over publieke en private infrastructuren heen.

*Gerard van der Hoeven*  geeft een toelichting op zijn eerdere opmerking over VC’s. Die sorteren voor op een wereld met wallets, waarin meerdere credentials gecombineerd kunnen worden met expliciete machtigingen voor toegang. iSHARE sluit hierop aan; de nieuwe versie (september) ondersteunt zowel OAuth als wallets. Met die ontwikkelingen zou de werkgroep rekening moeten houden.

*Michiel Trimpe* merkt op dat wallets vooral bij authenticatie horen, terwijl FTV juist het autorisatiegedeelte afbakent. Hij stelt voor om een deep dive over VC’s te organiseren. Ook benadrukt hij dat AuthZEN niet alle aspecten dekt; wat Gerard schetst kan een vervolgstap zijn.

*Marc de Boer* vraagt of er naast inhoudelijke feedback ook opmerkingen zijn over proces of organisatie, zoals de samenstelling van de groep, communicatie of praktische zaken. De werkgroep geeft aan dat dit goed geregeld is.
{{< /chapter/section >}}

{{< chapter/section title="Afsluiting" >}}
*Michiel Trimpe* meldt dat er een zomerstop is en dat de werkgroep op 26 augustus weer bijeenkomt. De subwerkgroepen gaan door; hij vraagt de meetings in het Mattermost-kanaal te delen en roept iedereen op daar lid van te worden. In dit kanaal kunnen ook vragen worden gesteld.
{{< /chapter/section >}}
