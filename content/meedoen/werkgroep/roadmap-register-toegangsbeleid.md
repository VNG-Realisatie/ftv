---
type: 'chapter'
Title: Roadmap register toegangsbeleid
---
{{< chapter/section title="" >}}
# Roadmap register toegangsbeleid (9 juni 2026)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Marc de Boer (FTV)
- Gideon Zegwaard (FDS)
- Rob van Dort (mapplica)
- Guus van der Meer (Vecozo)
- Axel van der Minne (DUO)
- Nico Spijkers (MinBZK)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20260609-roadmap-register-toegangsbeleid.mp4)
- [Presentatie](/ftv/documents/20260609-roadmap-register-toegangsbeleid.pdf)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Karakter van de werkgroep dit jaar en wat we willen opleveren
- Bruikbaarheid van bestaande ODRL-profielen
- Verkenning van mogelijke deliverables
- Concrete simulatiecases (BRP en BRO)
{{< /chapter/section >}}

{{< chapter/section title="Karakter van de werkgroep dit jaar" >}}

*Michiel Trimpe* opent met een observatie over het karakter van de werkgroep. Vorig jaar ging het vooral om afstemmen: veel meningen en perspectieven op EAM samenbrengen. Dit jaar is dat karakter gekanteld. De keuze voor **ODRL** is duidelijk, maar binnen de Nederlandse overheid is er nog nauwelijks iemand actief mee bezig. Daarmee verschuift de werkgroep van *"meningen samenbrengen"* naar *"wat gaan we met z'n allen bouwen"*. Deze sessie is bedoeld als open verkenning van wat er concreet opgeleverd zou kunnen worden en waar hij tegenaan loopt.

*Michiel* laat kort een aantal bestaande ODRL-profielen zien (Data Sovereignty, IPTC RightsML, Market Data, Big Data, OAC, Gaia-X, Regulatory Compliance, PPOP, TOSL, OpenPermissions) om te illustreren wat er zoal bestaat: profielen definiëren doorgaans domeinspecifieke informatiemodellen — acties, constraints, party-typen — voor finance, media, healthcare en dergelijke.

{{< /chapter/section >}}

{{< chapter/section title="Big picture — Rob van Dort" >}}

*Rob van Dort* onderbreekt en vraagt om eerst de big picture te schetsen voordat in ODRL-details wordt gedoken. Hij zet als denkkader het federatief datastelsel neer: aanbieders, afnemers en assets/datasets. Op het federatieniveau staan overheidspartijen geregistreerd; daaronder liggen dataspaces waar het echte werk gebeurt — daar wordt per dataspace toegang tot datasets geregeld.

*Michiel* nuanceert dat het onderliggende domein- of sectordatastelsel binnen FDS nog niet als zodanig is geformaliseerd. Nu zit het op het niveau van aangeboden datasets en datadiensten; die kunnen weliswaar in een domeindatastelsel georganiseerd zijn, maar dat is geen vereiste.

{{< /chapter/section >}}

{{< chapter/section title="Drie niveaus van toegangsbeleid" >}}

*Michiel* onderscheidt **drie niveaus** waarop toegangsbeleid speelt:

1. Toelating als **deelnemer** tot het datastelsel.
2. Aangaan van een **datadeelrelatie** tussen afnemer en aanbieder.
3. Een **individueel request** binnen een lopende datadeelrelatie.

De volumes op het eerste niveau zijn nu niet groot genoeg om primair op te sturen. Het inzichtelijk maken van de voorwaarden om een datadeelrelatie aan te gaan is dat wel — puur al vanuit informatie-delen.

*Gideon Zegwaard* vult het derde niveau concreet in vanuit de BRP-context: als je toegang toegewezen krijgt, worden er aanvullende voorwaarden gesteld via een autorisatietabelregel die de attributen of objecten beperkt die je mag ontvangen. Beide onderste niveaus zijn interessant om expliciet uit te drukken en inzichtelijk te maken.

*Axel van der Minne* brengt een nuancering aan: aan de ene kant praat je over een **gegevensverzameling** (bijvoorbeeld het register onderwijsinstellingen), aan de andere kant over de **datasets of gegevensproducten** die daaronder ontsloten worden. Het bovenste niveau is te abstract om op te sturen; het onderste is waar sturing moet zitten.

*Gideon* herkent het onderscheid en trekt het door naar de BRO: een basisregistratie ondergrond die feitelijk een strik is om zo'n twaalftal datasets, elk met eigen datadiensten. De BRP is daarmee vergeleken juist een uitzondering — één of twee registraties, afhankelijk van hoe je ernaar kijkt.

*Axel* en *Gideon* zoeken vervolgens naar het aansluitpunt. Een dienst kent verwerkingen; één dienst kan meerdere verwerkingen hebben, en één dataset kan via meerdere datadiensten ontsloten worden. Vanuit DCAT zit `hasPolicy` op de distribution; binnen FDS zijn **data service** en **dataset** de aanknopingspunten voor beleid (datadiensten ontsluiten de datasets). *Axel* wijst er ook op dat een aanbieder van nature meerdere bronhouders kan hebben, wat weer een eigen laag toegangsbeleid oproept. *Michiel* herkent dat als iets wat bij de BRO speelt en later terugkomt.

*Axel* legt daarnaast een link naar het **register van verwerkingsactiviteiten**: dat speelt hierin ook een rol. *Michiel* haakt aan en licht toe dat op de datadeel-overeenkomst een specifieke policy zit die aangeeft voor welke doelbinding de overeenkomst geldt — daar komt de verbinding met het register van verwerkingen tot stand.

{{< /chapter/section >}}

{{< chapter/section title="Wat standaardiseren we eigenlijk?" >}}

*Axel* schetst het huidige aanvraagproces: zwaar handmatig. Een afnemer vraagt op basis van grondslagen en doelbindingen iets aan bij een aanbieder, waarna DPIA-processen volgen. Zelfs binnen DUO is het al een uitdaging om een eenduidige kapstok voor dit soort toegangsbeleid te scheppen. De ambitie is dat op termijn gestructureerd te administreren, uiteindelijk zonder menselijke tussenkomst — maar zover zijn we voorlopig niet.

De eerste concrete stap is daarom **standaardiseren van het toegangsbeleid zoals het nu al bestaat**, zodat het vindbaar is. Nu staat het toegangsbeleid van basisregistraties her en der: in PDF's, op websites, in aparte formulieren. Het feit dát je bepaalde informatie moet aanleveren via een bepaald formulier ís al een toegangsbeleid — dat kan uniform vindbaar gemaakt worden.

*Michiel* verscherpt daarop de vraag: **wat** standaardiseren we dan precies? ODRL-profielen zeggen doorgaans iets over de semantische elementen in je beleid. Is dat wel wat we nodig hebben?

*Michiel* schuift zelf een andere richting naar voren: we standaardiseren *datgene waarmee we het aan de data koppelen*, zodat het in een catalogus vindbaar is. *Axel* vertaalt dat concreet: als je een catalogus-entry vindt (op data.overheid.nl, [catalogus.datastelsel.nl](https://catalogus.datastelsel.nl)), zie je daar ook alle regels en criteria waaraan je moet voldoen om toegang te krijgen tot die dataset.

*Gideon* voegt daaraan een basispatroon toe: er zijn een paar **basiselementen** die in elke ODRL-policy aanwezig zouden moeten zijn — identifier, titel, mensleesbare tekst. Pas als die vastliggen kun je breed toepassen én kun je vervolgens zicht krijgen op welke policies er allemaal zijn, gemene delers vinden en adviseren over hoe je ze uitdrukt. Zijn concrete vertrekpunt: kijk op **data.overheid.nl** naar de gesloten datasets en werk uit onder welke condities je erbij mag.

{{< /chapter/section >}}

{{< chapter/section title="Bestaande ODRL-profielen — bruikbaarheid" >}}

Terugkomend op de eerder getoonde profielen: *Michiel* observeert dat de meeste een domeinspecifiek informatiemodel definiëren (finance, media, healthcare) dat niet één-op-één past in een Nederlands overheidsprofiel. *Marc de Boer* nuanceert dat sommige profielen — **Data Sovereignty** en **Big Data** — juist horizontaler zijn en over dataspaces heen relevant kunnen zijn, en dus niet direct af te schrijven. **Gaia-X** wordt ook genoemd; dat definieert vrij technisch hoe je ODRL op verifiable credentials mapt.

De conclusie is dat een klassiek "ODRL-profiel" met domeinelementen niet het juiste vehikel is voor wat de werkgroep beoogt. Er zijn hooguit een paar kleine dingen die aanknopen bij datasets. **Doelbinding** is een kandidaat-concept om toe te voegen, maar strikt genomen niet overheidsspecifiek — en past mogelijk beter bij TOOI dan in een FDS-profiel.

{{< /chapter/section >}}

{{< chapter/section title="Richting van de deliverables" >}}

Uit de discussie komt een richting naar voren die uit een viertal samenhangende deliverables bestaat.

**Applicatieprofiel, pragmatisch van opzet**

Geen zwaar profiel met veel semantische domeinelementen, maar een profiel dat definieert hoe je binnen het FDS-model (aanbieders, afnemers, datasets, datadiensten) beleid koppelt en beschrijft. Toegespitst op overheidscases — bijvoorbeeld door concreet uit te werken hoe doelbindingen als refinement op een rule set worden gemodelleerd. *Gideon* opperde eerder daarbij om een lijstje **archetype-policies** te definiëren waarvan afnemers en aanbieders instanties aanmaken (een doelbindings-policy is dan een classificatie); en om verwijzingsconstructen (via [PROV] naar wet- en regelgeving) uit te werken zodat een toegangsbeleid ook herleidbaar wordt.

**Modelleringshandleiding en volwassenheidsniveaus**

Een handleiding met vaste patronen voor terugkerende gevallen (bijvoorbeeld *offer + assignment + refinement* voor doelbinding), gecombineerd met kwaliteits- of volwassenheidsniveaus voor beleid.

- Basisniveau: titel, mensleesbare omschrijving, identifier.
- Hogere niveaus: keteninformatie (doorlevering vanuit een afnemer naar de eigen achterban), koppeling aan het AuthZEN-informatiemodel, provenance-verwijzingen naar wet- en regelgeving.

*Michiel* benoemt twee mogelijke vertrekpunten voor die niveaus: enerzijds wat deelname aan FDS met zich meebrengt, anderzijds wat vanuit AVG of Woo vereist is aan toegangsbeleid. Op basis daarvan valt bijvoorbeeld al aan te wijzen wat een AVG-toegangsverlening moet regelen (notificatie, dataminimalisatie, verantwoording).

**Inzichtelijk maken in catalogi**

De standaard moet ervoor zorgen dat toegangsbeleid **bruikbaar** inzichtelijk wordt in catalogi — niet alleen een link naar RDF, maar interpreteerbaar voor een menselijke afnemer. *Gideon*: op het moment dat je de basiselementen breed toepast, ontstaat zicht op wat er allemaal aan policies is, welke gemene delers erin zitten en waar advies nodig is.

**Visualisatietooling**

Wanneer er weer ontwikkelcapaciteit is, ook eigen visualisatietooling maken voor complexer ODRL-beleid. *Gideon* waarschuwt tegelijk om er niet te veel energie in te steken zolang er nog weinig complexe ODRL-policies in het veld zijn. In de catalogus wordt gezocht naar een *happy middle*: een structuur die visualiseerbaar is, met daarnaast een RDF-view voor complexere constructies die niet direct te tonen zijn.

*Rob* haakt vervolgens aan met een gerelateerd punt over **doelgerichte dataspaces**: hoe heterogener een dataspace, hoe bonter de ODRL-voorwaarden. Een opdeling in doelgerichte dataspaces werkt dus als beheersmaatregel — bepaalde regels (bijvoorbeeld "leesbaar voor alle deelnemers in deze dataspace") kun je op dataspace-niveau vaststellen en hoef je niet steeds in fijnere regels te vatten. *Gideon* trekt dat door: er ontstaan waarschijnlijk **FDS-policies** die naast domeinspecifieke policies bestaan — een organisatie die deelneemt aan FDS handhaaft dan naast eigen beleid ook het gedeelde FDS-beleid.

{{< /chapter/section >}}

{{< chapter/section title="Vocabularium en verhouding tot TOOI/Nora" >}}

*Rob* onderstreept dat het vocabularium waar het eerst om draait. Doelbinding, wettelijke taak, type overheidsorganisatie (ministerie, ZBO, provincie): dat zijn de bouwstenen waarin rechten worden uitgedrukt. Mens-interpreteerbaar en uitlegbaar — dat je "in eerste instantie term voor term" bekijkt wat er nodig is.

*Michiel* legt daar de rol van FTV tegenaan: FTV moet niet eigenaar worden van generieke concepten als *doelbinding*, maar mogelijk wel van de specifieke ODRL-mappings — bijvoorbeeld de definitie van een left operand als subklasse van een bestaand TOOI-begrip. **TOOI** definieert al veel van dit soort termen; als eigen aanvullingen nodig zijn, kunnen die daarnaast bij TOOI belegd worden.

*Gideon* haakt aan met **NL-SBB** als voorbeeld: daar wordt niet alleen SKOS gebruikt, maar ook actief aandacht besteed aan uitleg en leesbaarheid — hoe leg je een begrip uit, wat betekent het. Verder verdient **Nora** ook een plek: die heeft eveneens begrippenkaders die hergebruikt kunnen worden. De aanpak analoog aan FDS: **primair kijken bij Nora en TOOI, hergebruiken wat al autoriteit heeft, en alleen aanvullen wat er echt niet is**.

*Guus van der Meer* stelt voor te kijken hoe **DCAT-AP-NL** en **NL-SBB** dit soort exercities hebben aangepakt: welke standaarden hebben zich beperkt tot mapping en afspraken zonder een eigen domeinmodel op te tuigen? Dat kan houvast geven voor hoe zwaar het eigen profiel moet worden.

{{< /chapter/section >}}

{{< chapter/section title="Simulatiecases" >}}

Er komen weer ontwikkelaars in het team; het is tijd om te gaan simuleren. *Michiel* brengt twee kandidaat-cases in.

**Case 1 — BRP-keten**

De ambitieuze variant: de afnemer definieert zelf zijn toegangsbeleid, zijn gegevensset en zijn doelbindingen, en biedt dat aan aan RvIG. RvIG dwingt technisch alleen de superset af. Als parallel spoor kan een tweede variant lopen die dicht bij de huidige situatie blijft, maar veel beter inzichtelijk maakt wat er nu geregistreerd is en wat er gebeurt — voorwaarderegels en doelbindingen ontsluiten zoals ze nu al bestaan, maar dan goed vindbaar.

De ambitieuze variant is inhoudelijk het interessantst. Zo'n afnemer weet immers veel meer dan de BRP nu weet: welke medewerker een vraag stelt, voor welk proces. Die controles zitten er ook nu al vaak in bij de applicaties die de BRP bevragen — alleen niet zichtbaar. *Gideon* deelt de voorkeur voor de ambitieuze variant en ziet de lagere variant als de parallel-lijn waar duidelijke patronen uit voortkomen.

**Case 2 — BRO-keten**

Floris Deutekom is er vandaag niet bij, maar *Michiel* geeft aan al met hem gesparred te hebben: de BRO is ook een interessante kandidaat. De opzet: de bronhouder definieert zijn toegangsbeleid en biedt dat aan een centraal ontsluitingspunt aan, dat het namens de bronhouder handhaaft. Dat opent de mogelijkheid om:

- Van afnemers te vereisen dat ze inzichtelijk maken welke maatregelen ze nemen — een klassieke ODRL-**obligation** die pas toegang verleent onder voorwaarden. De bronhouder blijft beoordelen of dat overtuigend genoeg is.
- Geografisch toegangsbeleid te toetsen (bijvoorbeeld "actuele stand van waterputten alleen als niet in veiligheidsrisicogebied") en te kijken of dat performant te ontsluiten valt op tile- of map-gebaseerde API's met grote feature counts.

**Categorieën van toegangsbeleid**

*Rob* legt aparte lijn neer: hoe gaan we om met verschillende **categorieën** van toegangsbeleid? Van pure open data via "toegankelijk voor alle overheidspartijen" tot scherpe categorieën (justitieel, opsporingsdiensten, militaire veiligheid, terrorismebestrijding). Alleen al door FDS in te richten zit er een voorfiltering — je bent tenslotte een overheidsgerelateerde partij — maar daarbinnen zit nog een bonte verzameling van organisatietypes.

*Axel* wijst erop dat "open" in de praktijk vaak minder open is dan het lijkt: gemeenten willen bij open data soms juist beperkingen zetten vanwege de **wet van kleine aantallen** (identificeringsproblemen bij kleine populaties). *Rob* haakt daarop aan met een verwante categorie: eigenaarschap-per-dataset — als gemeente mag je andere dingen met je eigen deel van de BRP dan met de rest. Een sleutel op instantieniveau die ook geadresseerd moet worden.

*Michiel* voegt open data zelf ook toe als aandachtspunt: daar zit vaak nog wél toegangsbeleid op — availability, rate limiting — dat mee kan in de simulaties. Uiteraard is wat er gebouwd wordt afhankelijk van de ontwikkelcapaciteit; dit zijn ideeën en doelen om op af te sturen.

{{< /chapter/section >}}

{{< chapter/section title="Sluiting" >}}

*Michiel* vat samen wat zich als richting aftekent voor het komende half jaar:

- **Standaard**: applicatieprofiel + modelleringshandleiding + volwassenheidsniveaus, gericht op het bruikbaar inzichtelijk maken van toegangsbeleid in catalogi. Geen semantisch zwaar profiel, wel duidelijke patronen en basiselementen.
- **Simulaties**: BRP-keten (ambitieuze variant, mogelijk met een tweede die dichter bij huidig blijft) en BRO-keten (bronhouder-gestuurd, met geografisch beleid en obligations).

Deelnemers bevestigen dat dit de goede richtingen zijn. Verdere uitwerking van de BRO-lijn gebeurt in gesprek met Floris Deutekom en mogelijk met de BRO zelf.

{{< /chapter/section >}}
