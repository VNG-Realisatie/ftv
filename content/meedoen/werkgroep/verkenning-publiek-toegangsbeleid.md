---
type: 'chapter'
Title: Verkenning Publiek Toegangsbeleid
---
{{< chapter/section title="" >}}
# Verkenning Publiek Toegangsbeleid (17 maart 2026)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Marc de Boer (FTV)
- Gideon Zegwaard (FDS)
- Maria Dziouba (Vecozo)
- Igor van Haren (Vecozo)
- Guus van der Meer (Vecozo)
- Remo van Rest (Zorginstituut Nederland)
- Floris Deutekom (Geonovum)
- Hans Hendrikman (RvIG)
- Hugo Mostard (Gemeente Den Haag)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20260317-verkenning-publiek-toegangsbeleid.mp4)
- [Miro-bord](/ftv/documents/20260317-verkenning-publiek-toegangsbeleid.pdf)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking (5m)
- Update NLGov AuthZEN  & Authorization Decision Log (5m)
- Verkenning gepubliceerd toegangsbeleid (25m)
- Evaluatie en analyse gevonden toegangsbeleid (15m)
- Bepalen vervolgstappen (10m)
{{< /chapter/section >}}

{{< chapter/section title="Update NL Gov AuthZEN en Authorization Decision Log" >}}

**NL Gov AuthZEN**

*Michiel Trimpe* meldt dat NL Gov AuthZEN is aangeboden bij Forum Standaardisatie. Het formulier is ingevuld en ingediend. Als Forum Standaardisatie voldoende capaciteit heeft, wordt het de tweede helft van het jaar opgepakt. Er wordt vanmiddag nog gesproken met UWV over expliciete ondersteuning van de standaard. Daarnaast zijn er al meerdere organisaties die de standaard ondersteunen.

De internationale AuthZEN-standaard heeft de status 1.0 final bereikt (sinds 16 januari 2026). Er zijn geen grote wijzigingen uitgekomen; de standaard is as-is gepubliceerd. De internationale werkgroep is inmiddels aan versie 1.1 begonnen. De focus ligt op profielen, waaronder een profiel voor AI-agents en een profiel voor obligations.

De werkgroep spreekt af om de internationale ontwikkelingen af en toe (circa eens per kwartaal) in highlights te bespreken.

**Authorization Decision Log (ADL)**

De ADL loopt een stap achter op AuthZEN. Er is besloten om het nog niet in te dienen voor deze ronde bij Forum Standaardisatie. Eerst moet de technische consultatie vanuit Logius worden gestart. Zodra Stas Mironov beschikbaar is, zal hij dit in gang zetten. Daarna volgt bespreking in de PGDI en kan de ADL over een kwartaal of half jaar aangeboden worden bij Forum Standaardisatie.

{{< /chapter/section >}}

{{< chapter/section title="Verkenning gepubliceerd toegangsbeleid" >}}

*Michiel Trimpe* presenteert een analyse van publiek toegankelijk toegangsbeleid van diverse overheidsinstanties. Het doel is om te verkennen wat er al beschikbaar is op het internet en wat we daarvan kunnen leren.

**Analysedimensies**

Het toegangsbeleid is geanalyseerd op de volgende dimensies:
- **Mens- en machineleesbaarheid**: In hoeverre is het beleid leesbaar voor mensen en/of machines?
- **Hiërarchie**: Hoe is het beleid opgebouwd? (per registratie, per afnemer, per systeem, per stelsel)
- **Granulariteit**: Hoe fijnmazig is het beleid? (op veldniveau, op bevragingstype, met filters)
- **Historisering**: Hoe wordt de historie van het beleid bijgehouden? (effectief, materieel, formeel/technisch)
- **Semantiek**: In hoeverre is de betekenis van termen vastgelegd, inclusief juridische grondslagen?

**BRP Autorisatiebesluiten**

Als voorbeeld is het BRP (Basisregistratie Personen) autorisatiebeleid in detail geanalyseerd. Dit is het meest volwassen voorbeeld van gepubliceerd toegangsbeleid dat gevonden kon worden.

De BRP-structuur is opgebouwd per registratie (BRP, PIVA, etc.), vervolgens per afnemer met een besluit, en binnen het besluit per koppelvlak (bevraging, spontaan, selectie) met autorisatie op zowel regel- als attribuutniveau. *Gideon Zegwaard* wijst erop dat de drie koppelvlakken elk apart geautoriseerd worden, en dat per koppelvlak zowel op regel (via voorwaarderegels) als op attribuut (via opsomming) wordt beperkt.

De historisering van BRP-besluiten omvat effectieve werking en materiële historie, waarbij de technisch cq. formele historisering impliciet is.

Als verbetering wordt genoteerd dat de relatie naar het semantisch model (wat de velden precies betekenen) makkelijker te volgen zou kunnen zijn.

*Marc de Boer* merkt op dat als je van meerdere registraties het beleid kent, je ook relaties kunt leggen via gedeelde semantiek (bijv. dezelfde definitie van "geboortedatum" of "land van herkomst"). Dit is relevant voor de koppelbaarheid in het stelsel. *Gideon Zegwaard* benadrukt dat dit ook kan via Linked Data-referenties, bijvoorbeeld naar de EU Core Vocabularies.

**Overige voorbeelden**

In de zorg gebruiken zowel iMZ als KIK-V het concept van "zorgkantoor", wat laat zien dat gedeelde semantiek al voorkomt.

{{< /chapter/section >}}

{{< chapter/section title="Workshop: analyse gepubliceerd toegangsbeleid" >}}

De deelnemers analyseren individueel verschillende voorbeelden van gepubliceerd toegangsbeleid in een Miro-board.

{{< /chapter/section >}}

{{< chapter/section title="Plenaire bespreking" >}}

**Algemene observaties**

*Igor van Haren* constateert dat het overal heel verschillend is. Er zijn weinig overeenkomsten tussen de verschillende opstellingen van toegangsbeleid.

*Gideon Zegwaard* merkt op dat er veel mensleesbare aspecten zijn, maar dat dit mogelijk ook komt doordat via websites is gezocht. Het machineleesbare beleid kan er ook zijn maar is niet direct vindbaar.

*Michiel Trimpe* bevestigt dat hij expliciet heeft geprobeerd ook technisch beleid te zoeken, maar dat dit alles was wat hij kon vinden. Het technische beleid is vermoedelijk nog moeilijker te vinden.

*Gideon Zegwaard* vermoedt dat er overal een technische representatie is van wat je leest, met alle foutgevoeligheid van dien.

**California**

*Maria Dziouba* heeft het voorbeeld van California bekeken. Zij vond het relatief oppervlakkig: het is meer een afspraak over data delen en hoe dat er ongeveer uit moet zien. De technische aspecten en specifieke afspraken waren lastig te vinden. Er wordt vaak verwezen naar de Data Sharing Agreement (DSA), maar die is vervolgens onvindbaar.

**Amsterdam**

*Marc de Boer* heeft het stuk van de Gemeente Amsterdam bekeken. Zij hebben enorm hun best gedaan om gelijkvormige registraties te modelleren en daar toegangsbeleid op te hebben. Het is heel gedetailleerd en voornamelijk machineleesbaar. *Marc de Boer* bevestigt dat Amsterdam overal descriptions heeft bijgezet in een boomstructuur, met uitgeschreven beschrijvingen van rollen en profielen (bijv. "burgerservicenummer van een natuurlijke persoon", "parkeerwachter niet in dienst van de gemeente"). Het is duidelijk vanuit de techniek naar boven gekomen.

**WOZ**

*Gideon Zegwaard* heeft naar de WOZ gekeken. Dat was een Excel die wel gestructureerd was, maar met textuele verfijningen die niet machineleesbaar zijn (bijv. "ja'tjes tussen haakjes met dingen erachter"). Dit roept de vraag op of er nog een andere, machineleesbare representatie bestaat.

**ALB**

*Michiel Trimpe* noemt het ALB-voorbeeld als interessant. De vraag is of dit echt toegangsbeleid is of een attribuut voor toegangsbeleid. Opvallend is dat zij een soort Linked Data-referentie naar wetten hebben geprobeerd te lijnen, wat lijkt op de grondslagen.

**Suwinet**

Het Suwinet-voorbeeld toont autorisatieniveaus per pagina binnen Suwinet. Opvallend is dat zij expliciet zeggen dat de afnemer het zelf moet inrichten, maar hoe de afnemers dat hebben ingericht is niet beschikbaar. De opzet suggereert een webapplicatie voor menselijke consumptie.

**Abstractieniveau**

*Floris Deutekom* merkt op dat het abstractieniveau van duiding zeer wisselend is: soms verwijst het naar een wet, soms naar "zoek maar hier ergens".

**Gecombineerde gegevens**

*Marc de Boer* wijst op het probleem van gecombineerde gegevens: de combinatie van een persoon, een auto en een observatie kan informatie geven die de afzonderlijke gegevens niet geven. Andersom geldt dat je soms op groepsniveau of geanonimiseerd niveau wel kunt delen, maar op individueel niveau niet (pseudo-anonimisering).

{{< /chapter/section >}}

{{< chapter/section title="Conclusies en vervolgstappen" >}}

- Gepubliceerd toegangsbeleid is overal zeer verschillend ingericht
- Het is voornamelijk mensleesbaar; machineleesbaar beleid is zeldzaam
- De BRP is het meest volwassen voorbeeld, met gedetailleerd en gestructureerd beleid
- Semantische koppelbaarheid (bijv. via Linked Data, EU Core Vocabularies) is een belangrijk aandachtspunt
- DSA's en technische representaties zijn vaak niet publiek vindbaar
- Als volgende stap wordt voorgesteld om één van de analysedimensies verder uit te diepen en te onderzoeken hoe het in een informatiemodel past, met aansluiting op ODRL

*Gideon Zegwaard* stelt voor te kijken wat er in de ODRL past bij wat we voorbij zien komen.

{{< /chapter/section >}}