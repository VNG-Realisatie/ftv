---
type: 'chapter'
Title: 5. Verdieping en Logboek Toegangsverlening
---

{{< chapter/section title="Verdieping en Logboek Toegangsverlening (6 mei 2025)" >}}

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Marc de Boer (FTV)
- Michiel Trimpe (FTV)
- Gerard Juijn (FTV)
- Maikel Hofman (FTV)
- Rene Vendrig (FTV)
- Karin Hiralal (FTV)
- Hans Hendrikman (RiVG)
- Remo van Rest (ZIN)
- Rens Kievit (Rijksoverheid)
- Nico Spijkers  (MinBZK)
- Frank Terpstra (Geonovum)
- Gideon Zegwaard (FDS)
- Jos Hezemans (MinJenV)
- Marc van Andel (Kadaster)
- Arnoud Quanjer (VNG)
- Igor van Haren (Vecozo)
- Wouter Diephuis (MinBZK)
- Ronald Koster (FSC)
- Elske Derks (MinBZK)
- Martin van der Plas (Logius)
{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom 
- Aanpak verdieping onderwerpen
- Introductie Logboek Toegangsverlening
- Keuze volgend onderwerp

{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}} 

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20250506-verdieping-en-logboek.mp4)
- [Verdieping onderwerpen Miro bord]({{< param baseDirectory >}}documents/20250506-verdieping-miro.pdf)
- [Logboek Toegangsverlening Miro bord]({{< param baseDirectory >}}documents/20250506-logboek-miro.pdf)


{{< /chapter/section >}}

{{< chapter/section title="Welkom" >}}

*Jos Hezemans*, *Hans Hendrikman*, *Rens Kievit*, *Igor Haren* en *Nico Spijkers* introduceren zich aan de groep.

{{< /chapter/section >}}

{{< chapter/section title="Aanpak verdieping onderwerpen" >}}

*Michiel Trimpe* heeft een [Miro bord]({{< param baseDirectory >}}documents/20250506-verdieping-miro.pdf) voorbereid met een overzicht van de mogelijke onderwerpen om dieper op in te gaan. Het voorstel is om subwerkgroepen te introduceren in de gezamenlijke werkgroep. De introductie van het juridisch kader in de voorgaande werkgroep wordt gezien als de kick-off van die subwerkgroep. De subwerkgroepen kunnen dan buiten de werkgroep om voortgang boeken en zullen dit terug rapporteren aan de bredere werkgroep.

**Beslissing**: Er zal gewerkt worden met subwerkgroepen op verschillende onderwerpen.

Hierna konden alle deelnemers zich in het [Miro bord]({{< param baseDirectory >}}documents/20250506-verdieping-miro.pdf) aanmelden voor onderwerpen ter verdieping en nieuwe onderwerpen aandragen. Zie de bijlage voor het resultaat hiervan.

- *Frank Terpstra*: Zal er ook een begrippenkader rondom toegangsverlening nodig zijn? Wil je met Linked Data kunnen zeggen waar de definitie staat van het begrip dat je toe wilt passen. Dan kan NL-SBB opgenomen worden voor de relatie met begrippenkaders. 

  *Michiel Trimpe* laten we dat opnemen bij de onderwerpen.

- *Gideon Zegwaard* Hoe bedoel je hier het informatiemodel?

  *Michiel Trimpe* Dit betreft het informatiemodel van de toegangsverzoeken. Hoe modelleer je het subject, de resource, action en context.

  *Gideon Zegwaard* je kan bij toegangsverlening ook het informatiemodel beperken en afnemers tot een beperkt deel van het informatiemodel toegang verlenen.

  *Michiel Trimpe* Dit valt voornamelijk onder contracten en policies en hoe je toegang tot een beperkt deel van het informatiemodel daar definieert.

- *Gideon Zegwaard*: Voor bijvoorbeeld SPARQL en GraphQL wil je in beide gevallen toegang inperken. Wil je niet een soort van kapstok hebben waarop je de toegang definieert en waaronder je verschillende inperkingsvormen en -semantieken kunt toepassen.

  *Michiel Trimpe* Dat valt onder het aspect van policies en het onderscheid tussen logische policies die het beleid definieren en technische policies die het per ontsluitingsvorm afdwingen. Dit zal ik toevoegen aan de onderwerpen daar.

- *Gideon Zegwaard*: Zijn de Eclipse Data Components niet meer een toolkit om data spaces op te zetten? Wat ik heb gezien, richt zich vooral op het downloaden van datasets.

  *Gerard van der Hoeven*: Dat is niet speciek zo. API's worden ook ondersteund.

  *Michiel Trimpe*: We zullen het aspect van data spaces als geheel behandelen; met Gideon en Gerard als contactpersonen daarvoor.

- *Michiel Trimpe* stelt voor om de vorige werkgroepsessie als de kick-off te beschouwen voor het juridisch kader.
  
  *Gideon Zegwaard* vraagt of de relatie gelegd wordt met de juristen die aan de opvolging van de Wdo werken. 

  *Wouter Diephuis* geeft aan dat dit binnen zijn eigen cluster ligt dus dat die relaties zeker gelegd zijn. Indien dit (FTV en AuthZEN) een standaard zou worden en je wil daar wat verplichtends mee doen dan zou dat ook binnen de Wdo vorm gegeven kunnen worden.

{{< /chapter/section >}}

{{< chapter/section title="Logboek Toegangsverlening" >}}

-  *Michiel Trimpe* introduceert het Logboek Toegangsverlening aan de hand van het diagram op het [Miro bord]({{< param baseDirectory >}}documents/20250506-logboek-miro.pdf). Waar de AuthZEN standaard invulling geeft aan verantwoor*de* toegangsverlening, geeft het Logboek Toegangsverlening invulling aan verantwoord*ing* van toegangsverlening. Hier wordt informatie over alle historische verleende toegangsbeslissingen in opgenomen. 

- *Marc van Andel*: betreft het alleen verleende of ook afgewezen beslissingen? 

  *Michiel Trimpe*: Het bevat ook afgewezen beslissingen.

  Logboek Toegangsverzoeken wordt als naam voorgesteld.

- *Michiel Trimpe* legt uit dat Logboek Toegangsverzoek relatief veel gevoelige informatie bevatten. Dit in vergelijking met FSC waarbij er alleen metadata opgeslagen wordt en Logboek Dataverwerking waarbij alle data toegangkelijk dient te zijn voor de burger die het betreft. 
Een aandachtspunt hierbij is ook dat je gevoelige niet onnodig wil dupliceren. Stel dat je op basis van een gegeven BSN een beslissing maakt met behulp van gegevens uit de BRP, dan wil je liever alleen het BSN opslaan en niet alle gebruikte BRP-gegevens.
  
  *Gideon Zegwaard*: Je kan die informatie ook buiten de log houden en alleen de verwijzing opnemen.

  *Michiel Trimpe*: Inderdaad. Maar hoe ga je dan om met de historische verwijzing en hoe doe je dat als je geen betrouwbare bron met historisering hebt?

- *Michiel Trimpe* legt uit welke gegevens de verschillende EAM componenten bieden om in het log op te slaan. Binnen de PIP zijn er twee patronen: een push-verrijking waarbij de data gedupliceerd wordt in de PIP om performant aanwezig te zijn, en een pull-verrijking waarbij op het moment van de beslissing een verzoek gedaan wordt.
   
   *Gideon Zegwaard*: Dit zijn meer de technische constructen.

   *Michien Trimpe*: Inderdaad. Het zijn logisch gezien beide 'de PIP.' In het geval van pull heeft de PIP wel de mogelijkheid om zelf historische versionering toe te voegen.

- *Jos Hezemans*: Deze informatie zit toch al in de subject die je binnenkrijgt bij de PEP?

  *Gideon Zegwaard*: Het kan zijn dat er in het verzoek al een claim meegestuurd wordt die aangeeft dat de gebruiker het recht heeft. Het kan ook zijn dat je alleen een user id krijgt en dat je zelf nog op moet zoeken welke rol deze heeft. Dat is vooral een vraag over hoe je je systeem technisch inricht.

  *Hans Hendrikman*: In het geval van de BRP zou dat de afnemersindicatie kunnen zijn op basis waarvan we nog een keer kijken of het mag of niet.

  *Michiel Trimpe*: Inderdaad. Waarschijnlijk wordt dat binnen EAM een contract.

  *Gideon Zegwaard*: Het contract is een van de vormen van data die door de PIP opgehaald worden. Dus er is een policy *dat* er een contract moet zijn. Dat contract wordt dan opgehaald en geëvalueerd.

  *Hans Hendrikman*: En het contract beschrijft de afspraak. Zoals de autorisatietabel bijvoorbeeld.

- *Michiel Trimpe* Een ander aspect van het Logboek is dat je inzicht wil bieden in je logboek. Anders heeft het geen waarde.

  *Gideon Zegwaard* En wie mogen inzicht hebben en onder welke voorwaarde.
  
  *Jos Hezemans*: Dat zal voor een deel ook juridisch bepaald zijn.

  *Gideon Zegwaard* Het gebruik bepaalt ook wat je op wil nemen; want je wilt niet meer opnemen dan waar een beoogd gebruik voor is.

- *Jos Hezemans*: Dit wordt niet gebruikt voor het analyseren van patronen in toegangsverzoeken om de resilience te verbeteren?

  *Gideon Zegwaard*: Dit kan wel een beoogd gebruik zijn.

  *Michiel Trimpe*: In de markt gebeurt dit veel en wordt het als voordeel van EAM gezien. Of je dat als organisatie wilt kan je zelf bepalen.

- *Jos Hezemans*: Wordt dit dan ook gebruikt voor verantwoording bij datalekken?

  *Marc van Andel*: Daar gaat het Logboek Dataverwerking ook deels over.

  *Michiel Trimpe*: Soms is een datalek iemand die iets doet wat technisch op dat moment toegestaan was. In die gevallen kan dit logboek helpen om te zien op basis waarvan dat verzoek toen is toegestaan.

- *Igor van Haren*: Ik zou graag ook de versie van de policy engine in het logboek opgenomen zien worden.

*Michiel Trimpe* nodigt iedereen uit om eisen en aandachtspunten in het [Miro bord]({{< param baseDirectory >}}documents/20250506-logboek-miro.pdf) op te nemen.

- *Jos Hezemans*: Zouden deelnemers aan het FDS kunnen kiezen of ze het logboek wel of niet implementeren?

  *Gideon Zegwaard*: Ik zou het nog breder willen trekken: definieer aan welke informatiebehoefte het logboek moet voldoen. Is dat ten opzichte van de eigen organisatie of van andere organisaties. Vooral dat laatste geval is het interessant voor FDS.

  *Jos Hezemans*: Je wilt partijen ook niet uitsluiten als ze niet met het logboek kunnen werken.

- *Marc van Andel*: Je wilt zoveel mogelijk informatie uit het logboek houden om het logboek preciezer, kleiner en compacter te maken. Maar dan moet je dus veel verwijzen. 
 
- *Marc van Andel*: Dit kan al snel een heel informatiesysteem op zichzelf worden. Hoe zorgen we dat dit niet te zwaar wordt?

- *Marc van Andel* stelt voor om de wijze van verwijzing naar versies in het logboek op te nemen, maar de invulling voor de applicaties en bronnen om die versie beschikbaar te houden bij de bronnen te laten. 

- *Jos Hezemans*: Ik ging er van uit dat dit een centraal logboek zou zijn, maar ik begrijp dat dit dus niet zo is en dat iedere deelnemer in het stelsel zijn eigen logboek bij zal houden. 

  *Michiel Trimpe*: Inderdaad.

**Beslissing**: Team FTV zal de uitwerking hiervan initieel zelf op zich nemen gezien de beperkte aanmeldingen voor het onderwerp.
{{< /chapter/section >}}

{{< chapter/section title="Keuze volgend onderwerp" >}}

**Beslissing** Op basis van het aantal deelnemers wordt als volgend onderwerp "policies" gekozen. 
{{< /chapter/section >}}
