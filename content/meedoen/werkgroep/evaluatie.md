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

{{< /chapter/section >}}
