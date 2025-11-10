---
type: 'chapter'
Title: Authorization Decision Log en OpenFTV 
---

{{< chapter/section title="Authorization Decision Log en OpenFTV (4 november 2025)" >}}

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Frank Terpstra (Geonovum)
- Jaap Smit (UWV)
- Gideon Zegwaard (FDS)
- Hugo Mostard (Gemeente Den Haag)
- Stas Mironov (Logius)
- Duuk Calor (Vecozo)
- Igor van Haren (Vecozo)
- Nick Boxem (MinI&W) 
- Danny Greefhorst (FDS)
- Guus van der Meer (Vecozo)
- Jos Hezemans (MinJenV)
- René Kint (Zicht op Nederland)
- Marc de Boer (FTV)
- Michiel Trimpe (FTV)
- Gerard Juijn (FTV)
- Maikel Hofman (FTV)
- René Vendrig (FTV)
- Karin Hiralal (FTV)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom
- Update subwerkgroepen
- Feedback interne consultatie Authorization Decision Log (ADL)
- Update project FTV
- Demo OpenFTV
- Afronding
Het onderwerp Contracten dat voor deze bijeenkomst op de agenda stond, is verplaatst naar de volgende bijeenkomst (18 november). Alle werkgroepleden hebben hierover een email ontvangen.

{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}} 
- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20251104-authorization-decision-log-en-open-ftv.mp4) Zie vanaf 49:30 voor de presentatie OpenFTV.
{{< /chapter/section >}}

{{< chapter/section title="Welkom" >}}

Er zijn geen nieuwe werkgroepleden.

{{< /chapter/section >}}

{{< chapter/section title="Updates subwerkgroepen" >}}

**AuthZEN NL Gov-profiel**
De publieke consultatie is gestart via Logius. Er is nog geen feedback binnengekomen.
Het team FTV heeft presentatie gegeven bij de GDI-werkgroep Gegevensuitwisseling. Daarbij werd toegelicht dat AuthZEN NL Gov richting Logius en beheer ging. De standaard kan opgenomen worden in de domeinarchitectuur gegevensuitwisseling. Het is nog niet duidelijk wat de formele vervolgstappen zijn om dit te realiseren. Dit wordt verder afgestemd met BZK.
In de Access Control Module van Geonovum is een verwijzing naar AuhtZEN NL Gov opgenomen.

**Juridisch kader**
Er is de afgelopen periode geen afstemming geweest met BZK over de oplevering van de final draft van het juridisch kader. Een eerste versie is eerder besproken in de subwerkgroep.

**Authorization Decision Log (ADL)**
De interne consultatie is gesloten. Zie verder bij het volgende agendapunt.

{{< /chapter/section >}}

{{< chapter/section title="Feedback interne consultatie Authorization Decision Log (ADL)" >}}

De informatie over de standaard is te vinden op: [Github](https://vng-realisatie.github.io/authorization-decision-log/)

*Gideon Zegwaard* vraagt of er al een API bestaat om ADL-logs te ontsluiten. 
*Michiel Trimpe* laat weten dat dit onderwerp nog open staat. De verwachting is dat er LDV voor het eind van dit jaar een API beschikbaar komt.
FSC heeft al wel een API-specificatie, daarom wordt bekeken of ADL daarbij kan aansluiten of een extensie op die standaard wordt. 

*Michiel Trimpe* geeft een toelichting op het ADL en bespreekt de verwerking van de gegeven feedback aan de hand van de documentatie over de standaard. 
- ADL legt vast hoe organisaties toegangsbeslissingen kunnen loggen. Daarbij gaat het niet alleen om het verzoek en de beslissing, maar ook om de context: welk beleid gold, welke informatie is gebruikt en welke componenten hebben de beslissing genomen. Zo kunnen beslissingen later worden nagekeken en verantwoord.
- Een decision log werkt in een federatieve situatie aan beide kanten van een verzoek. De afnemer logt eerst de beslissing om een verzoek te versturen (FSC Outway). Daarna logt de aanbieder de beslissing om het verzoek toe te staan (FSC Inway). Zo ontstaat aan beide kanten inzicht in de toegangsbeslissing.
- ADL bepaalt wat gelogd wordt, niet hoe dat wordt gedaan.
- In paragraaf 3.3 van de documentatie staan de velden van een logrecord beschreven. Er wordt aangeraden een trace-context te gebruiken met trace-id en span-id. Bij koppeling met FSC-log zou (should) ook het FSC-transaction-id opgenomen moeten worden. De basis bestaat uit tijdstip, type verzoek, request en response. Optioneel kunnen organisaties extra context vastleggen, zoals de policies of het toegangsbeleid waarop de beslissing gebaseerd is, de informatiebronnen (PIP) en de configuratie van het Policy Decision Point (PDP). 
- ADL ondersteunt geen situaties waarbij een verzoek lang openstaat. Het log wordt pas geschreven zodra de beslissing is genomen en teruggestuurd. De werkgroep concludeert dat dit nog duidelijker in de standaard kan worden beschreven.
- De identifiers zijn verder uitgewerkt en opgesplitst in drie delen: identifiers, request-en-response en bronnen (policies en informatie). Ook zijn voorbeelden toegevoegd om te laten zien hoe de logging werkt. Het voorbeeld toont de basis van ADL. Er is ook de mogelijkheid om complexere verwijzingen op te nemen.
- In paragraaf 3.3.4.1 wordt beschreven hoe ondersteunende informatie wordt gelogd. Kleine, niet-gevoelige responses kunnen direct worden opgeslagen, maar meestal wordt verwezen naar externe bronnen via sources en referencing.
- Paragraaf 3.3.5 beschrijft het veld waarin de configuratie van het beslissingsmechanisme wordt vastgelegd (voorheen engine). Dit kan zowel de PDP als betrokken PIPs omvatten, bijvoorbeeld een versie van OPA of een configuratie van een HR-PIP. De term engine zorgde voor verwarring bleek uit de feedback. Engine kan zowel kan verwijzen naar de PDP als naar een PIP (afhankelijk van de situatie). Daarom wordt voorgesteld om de term te wijzigen naar configuration of dit eventueel in twee velden te splitsen. In de praktijk wil een organisatie deze informatie meestal niet in elk logrecord opnemen en is het handiger om te verwijzen naar een versie of bron (bijvoorbeeld een Git-hash). Dat wordt in de standaard nader toegelicht met een noot.
- Bij 3.4 staan Sources en Referencing beschreven. Informatiebronnen kun je direct in het log opnemen, maar dat is meestal niet wenselijk vanwege opslag en beveiliging. Daarom verwijst ADL liever naar versies van bronnen, bijvoorbeeld via een Git-hash of een versie-ID. Ook kan gebruik worden gemaakt van temporal sources: je legt vast welke informatie gold op het moment van de beslissing, zodat je die later kunt terughalen zonder de gegevens zelf op te slaan. In een noot wordt aandacht gegeven aan de tijdsklokken van de systemen.
- In paragraaf 3.4.3 wordt beschreven hoe je kunt verwijzen naar een ander log waarin de requests zijn vastgelegd. Hiervoor wordt de trace-context gebruikt als identifier en wordt WARC voorgesteld als formaat, zodat verzoeken en antwoorden later exact kunnen worden teruggespeeld.
- In paragraaf 4 (Information Management) staat dat vooraf bepaald moet worden welke informatie gelogd moet worden en welke informatie later terug gevonden moeten worden. Het doel van het log bepaalt welke gegevens er worden vastgelegd: niet alles maar alleen wat nodig is voor verantwoording en toezicht.

Alle aanpassingen op de eerste versie van de standaard zijn verwerkt in de [documentatie](https://services.w3.org/htmldiff?doc1=https%3A%2F%2Fvng-realisatie.github.io%2Fauthorization-decision-log%2F20250825.html&doc2=https%3A%2F%2Fvng-realisatie.github.io%2Fauthorization-decision-log%2F).

Er is ook feedback ontvangen van Jule Hintzbergen van de VNG. 
- ADL kan worden gebruikt als auditlog, maar organisaties kunnen ook kiezen voor een apart auditlog. Het is een inrichtingkeuze. ADL kan alleen als volledig auditlog dienen wanneer alle beslissingen via het AuthZEN-mechanisme verlopen. Als er besluiten binnen een applicatie zelf worden genomen, en dus geen berichten worden uitgewisseld, is een aanvullend auditlog nodig.
- De feedback ging vooral over privacy en AVG-compliance. ADL beschrijft hoe je beslissingen logt, maar organisaties moeten zelf zorgen dat dit AVG-proof gebeurt, bijvoorbeeld door doelbinding vast te leggen, dataminimalisatie toe te passen en toegangsregels op het log te zetten. Ook werd technisch feedback gegeven: het wachten op een ACK totdat het log is weggeschreven kan risico’s geven voor beschikbaarheid. De werkgroep stelt daarom voor om het vereiste aan te passen: doorgaan zodra er durable storage is bereikt in plaats van pas na volledige log-opslag. 
Deze punten worden ook afgestemd met het LDV-team.

*Igor van Haren* vraagt tot slot nog aandacht voor bewaartermijnen in het kader van de Archiefwet. Dit wordt nagevraagd bij de subwerkgroep Juridisch Kader.

**Conclusie**
De werkgroep concludeert dat de gegeven feedback voldoende verwerkt is. De feedback van Jule Hintzbergen wordt als eerste externe reactie meegenomen. Kleine verbeterpunten worden, waar mogelijk, nog verwerkt voordat Logius start met de publieke consultatie.

{{< /chapter/section >}}

{{< chapter/section title="Update projectgroep FTV" >}}
*Marc de Boer* geeft een projectupdate. 
De subsidie voor 2026 is toegekend aan de VNG. De inzet op architectuur en development wordt verkleind. De focus blijft op het afronden en formaliseren van de standaarden. 
Communicatie en betrokkenheid bij relevante trajecten blijven belangrijk.
OpenFTV wordt afgerond en gebruikt in pilots/PoC’s. 
Ook zal in 2026 het Register Toegangsbeleid worden ontwikkeld en ter consultatie worden aangeboden bij Logius. 
Er kan een wijziging in de teamsamenstelling komen, maar de continuïteit van het project is gewaarborgd.

{{< /chapter/section >}}

{{< chapter/section title="Demo OpenFTV" >}}
OpenFTV is de referentie implementatie en laat zien hoe de FTV-standaarden in de praktijk kunnen werken.
Op de FTV-website staat een eenvoudige proefopstelling met een gemeente die een zaaksysteem gebruikt en data ophaalt bij twee basisregistraties. 
Kijk voor meer informatie op de [FTV-website](https://vng-realisatie.github.io/ftv/toepassen/openftv/).
*Marc de Boer* licht toe: OpenFTV bevat meer dan alleen een PDP: het biedt ook een beheerinterface om policies en attributen te bekijken, aan te passen en te deployen. Dat soort tooling is meestal niet gratis beschikbaar bij bestaande PDP-implementaties. 

*Maikel Hofman* toont hoe de beheerinterface eruit ziet.
- Beleidsregels toont de beleidsregels die kunnen worden bewerkt en als bundle kunnen worden gestuurd naar de PDP. Er is ondersteuning voor meerdere PDPs.
- Bronnen toont de attributen. Statische attributen (zoals een postcode) worden als parameters bij een policy-bundle meegestuurd naar de PDP. Daarnaast kunnen via PIPs dynamisch gegevens worden opgehaald op het moment van een verzoek. Zo combineert OpenFTV vaste beleidsparameters met actuele informatie tijdens de besluitvorming.
- In OpenFTV is ADL-logging ingebouwd. Hierdoor kun je zien welke beslissingen zijn genomen en snel inzicht krijgen in wat er in het systeem gebeurt. Het is geen analysetool. Het is wel mogelijk te filteren en te exporteren voor verdere analyse.

Naar aanleiding van de vraag of policies kunnen controleren of de benodigde PIPs beschikbaar zijn, laat *Gerard Juijn* weten dat dat afhangt af van de gekozen policy-taal. In OpenFTV is hiervoor een oplossing gemaakt binnen de PDP, waarbij zowel pull- als push-mechanismen worden gebruikt om vooraf de benodigde gegevens op te halen.
*Michiel Trimpe* benadrukt tot slot dat OpenFTV een referentie-implementatie. Het bevat geen geavanceerde functies zoals uitgebreide policy-beheerinterfaces. Daarvoor kan men terecht bij commerciële leveranciers.


{{< /chapter/section >}}

{{< chapter/section title="Volgende bijeenkomst" >}}
De volgende bijeenkomst vindt plaats op 18 november. Op de agenda staan: Contracten en BRP policies

{{< /chapter/section >}}
