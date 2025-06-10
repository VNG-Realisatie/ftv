---
type: 'chapter'
Title: 7. AuthZEN
---

{{< chapter/section title="AuthZEN (3 juni 2025)" >}}

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Marc de Boer (FTV)
- Gideon Zegwaard (FDS)
- Gerard Juijn (FTV)
- Karin Hiralal (FTV)
- Michiel Trimpe (FTV)
- Guus van der Meer (Vecozo)
- Stas Mironov (Logius)
- Danny Greefhorst (ArchiXL)
- Remo van Rest (Zorginstituut Nederland)
- Hans Schevers (BIM Connected)
- Rens Kievit (MinBZK)
- Frank Terpstra (Geonovum)
- Igor van Haren (Zorginstituut Nederland)
- Nico Spijkers (MinBZK)
- René Kint (Zicht op Nederland)
{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom
- Update subwerkgroepen 
- Verkenning AuthZEN NLGov
- Planning volgende werkgroepen 
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}} 
- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20250603-authzen.mp4)
- [Notulen eerste subwerkgroep juridisch kader]({{% relref "juridisch-kader-sub1" %}})
- [OpenID AuthZEN Authorization API - draft 04](https://openid.github.io/authzen/)
- [Werkversie FTV standaard](https://ftv-standaard-2f223b.gitlab.io/)
{{< /chapter/section >}}

{{< chapter/section title="Welkom" >}}
Er zijn geen nieuwe deelnemers.
{{< /chapter/section >}}

{{< chapter/section title="Updates van subwerkgroepen" >}}

- De juridische subwerkgroep is bijeengekomen op 22 mei. 

  *Marc de Boer* geeft een korte mondelinge samenvatting van de notulen. 

  *Nico Spijkers* voegt toe dat ook gesproken is over hoe we omgaan met data die ingekocht wordt van private partijen. Dit is niet alleen een onderwerp voor Federatieve Toegangsverlening (FTV) zelf, maar ook het bredere Federatieve Datastelsel (FDS).

  *Gideon Zegwaard* bevestigt dat het omgaan met private data een onderwerp is dat verder uitgewerkt kan worden binnen het FDS. 

- Voor de werkgroepen Logboek Toegangsbeslissingen en Register Toegangsbeleid heeft *Michiel Trimpe* Logboek Dataverwerkingen gevraagd naar hun perspectief op de keuze voor Nederlands. Zij geven aan over het geheel nog steeds blij mee te zijn met die keuze.  

  *Michiel Trimpe* vraagt de groep om een beslissing over de voertaal voor deze standaarden: Nederlands of Engels. Hij geeft aan dat beide opties acceptabel zijn voor team FTV. 

  *Marc de Boer* deelt de kanttekening dat de standaarden wel opgenomen moeten worden in de GDI-domeinarchitecturen Toegang en Gegevensuitwisseling. De taalkeuze moet daar dus ook op afgestemd worden. 

  *Frank Terpstra*: Kennisplatform API heeft gekozen voor Engels bij de standaarden die zij ontwikkelen met als redenering dat veel programmeurs en aanbestedingspartners geen Nederlands spreken.

  *Gideon Zegwaard* beaamt dit en geeft aan dat het ook afhankelijk is van hoe technisch de standaard is.

  *Michiel Trimpe* geeft aan dat beide standaarden een relatief hoog technisch gehalte hebben.

  *René Kint* is van mening dat het gaat over Nederlandse wetgeving en afsprakenstelsels. De voertaal binnen de overheid is nog steeds Nederlands. Programmeerhandleidingen zouden wel naar het Engels vertaald kunnen worden. Ook de architecturen van DSO en DMI zijn in het Nederlands geschreven.

  *Gideon Zegwaard* vraagt of het mogelijk is beide talen te gebruiken voor technische en juridische aspecten. *Michiel Trimpe* geeft aan dat FTV wel één taal voor de standaard wil.

  *Igor van Haren* geeft ook aan dat we vooral met Engelse standaarden werken waar we naar moeten verwijzen. Voor consistentie is Engels dan een handigere keuze.

  *Gideon Zegwaard* is van mening dat de inbedding in de architectuur kan wel in het Nederlands gebeuren. *Michiel Trimpe* geeft aan dat dit sowieso zal gebeuren aangezien GDI ook in het Nederlands wordt geschreven.

  **Beslissing**: De voordelen van het Engels wegen zwaarder dan de nadelen. Voor het AuthZEN NL Gov-profiel, Logboek Toegangsbeslissingen en Register Toegangsbeleid zal de voertaal Engels worden. Logboek Toegangsbeslissingen en Register Toegangsbeleid zullen een nieuwe Engelse naam krijgen.

  *Marc de Boer* vraagt of er nog meer deelnemers interesse hebben om aan de subwerkgroepen deel te nemen. Niemand meldt zich aan.
{{< /chapter/section >}}

{{< chapter/section title="Verkenning AuthZEN NL Gov" >}}
*Michiel Trimpe* introduceert de verwachte [kandidaat voor AuthZEN 1.0 Final](https://openid.github.io/authzen/) (draft 04).

- *Gideon Zegwaard* geeft bij de context van het verzoek (5.4) aan dat hier ontbreekt wat de termen, zoals de action `name`, betekenen.
  
  *Michiel Trimpe* bevestigt dit en geeft aan dat dit ook niet in AuthZEN zelf opgenomen zal worden. Hoe deze metadatering wel toe te voegen aan AuthZEN zal een van de belangrijkste punten in het NL Gov-profiel op AuthZEN worden.

  *Gideon Zegwaard* geeft aan dat als je voor type identifiers bijvoorbeeld IRIs gebruikt, je direct meer context krijgt om te bepalen wat het betekent.

  *Michiel Trimpe* zegt dat dat inderdaad een beslissing is die we hier kunnen en willen maken. Of de identifiers URIs, URNs of reverse dot notation moet zijn bijvoorbeeld.

- *Michiel Trimpe*: Voor de informatiemodellering van het Subject (5.1) geeft de GDI-tafel Toegang aan dat dit binnen hun domein valt. Daar willen we een of meerdere profielen voor de overheid realiseren. Hier moeten we bepalen of we een profiel voor alles willen of profielen voor bijv. machine-to-machine en burger-to-overheid. Hierbij moeten we ook kijken hoe machtigingen en delegatie hierin modelleren (of dat dit in de context moet gebeuren.)

- *Igor van Haren*: Hoe zit de vertrouwensband tussen de PEP en PDP bij AuthZEN? Wordt de data die de PDP ontvangt gevalideerd?

  *Michiel Trimpe*: Daar is geen harde regel voor. De verbinding tussen PEP en PDP moet je wel als vertrouwd kanaal beschouwen. Over het *algemeen* wil je dat de data die de PDP ontvangt al geauthenticeerd is. Dit legt echter meer functionaliteit en verantwoordelijkheid bij de PEP neer én de PEP moet op veel plekken in je landschap gerealiseerd worden. Soms wordt dus ook de hele claim aan de PDP beschikbaar gesteld en de PDP moet die dan valideren.

  *Igor van Haren*: Voor logging kan het makkelijker zijn om de claim mee te nemen zodat het beter weerlegbaar is.

  *Michiel Trimpe*: Dat klopt, maar logging kan je ook apart zien. Je kunt ook de gevalideerde waarde in het subject opnemen en alsnog de hele claim in de context beschikbaar stellen. 

  *Igor van Haren*: Ik vind dat we daar iets over moeten zeggen.

  **Beslissing**: Dit zal opgenomen worden in het profiel.

  *Gideon Zegwaard*: De mate van 'level of assurance' speelt hier ook nog bij mee. Of iets met API-key of mTLS is binnen gekomen maakt ook nog een verschil.

- *Michiel Trimpe* laat de context van het Evaluation response zien en geeft aan dat dit is waar step-up actions, residual policies, obligations & advice, zoals filtering en aangepaste bewaartermijnen, in opgenomen dienen te worden.
Deze stonden oorspronkelijk gepland voor het NL Gov-profiel, maar de AuthZEN-werkgroep heeft aangegeven deze onderwerpen in de tweede helft van 2025 te willen bespreken. Kunnen we beslissen of we dit nu al in het NLGov profiel op willen nemen of wachten op AuthZEN om divergentie te voorkomen.

  *Gideon Zegwaard* geeft aan dat we wel al de functionele behoefte kunnen inventariseren. *Michiel Trimpe* geeft aan dat dit sowieso al gebeurt.

  *Marc de Boer* vraagt verdere uitleg over de drie behoeftes en herformuleert de vraag naar: is er grote urgentie voor deze functionaliteit waardoor we niet kunnen wachten?

  *Gideon Zegwaard* geeft aan dat we ook al een draft vooruit kunnen schrijven in anticipatie van wat er zal komen en die aanpassen naarmate AuthZEN verder duidelijk wordt.

  **Beslissing**: We nemen dit niet op in NL Gov AuthZEN 1.0 en zullen voor deze onderwerpen conceptversies voorbereiden die gelijktijdig ontwikkeld worden met de OpenID AuthZEN-werkgroepen. 

- *Michiel Trimpe* toont de Evaluations API voor batch requests. *Marc de Boer* geeft aan dat dit ook voor tonen in UIs gebruikt kan worden. *Michiel Trimpe* geeft aan dat dit wel kan, maar dat de Search APIs hier ook vaak voor gebruikt zullen worden.

  De werkgroep ziet hier geen punten in voor opname in het Nederlands profiel.

- *Michiel Trimpe* toont de Search API's waarbij verzoeken gedaan kunnen worden met een ontbrekend Subject, Action of Resource en waarbij een lijst wordt geretourneerd van de Subjects, Actions of Resources waarvoor dit verzoek toegestaan zou zijn.

  *Gideon Zegwaard* deelt dat dit hele zware verzoeken kunnen zijn.

  *Michiel Trimpe* bevestigt dit en geeft aan dat niet elke PDP dit ondersteunt en dat je dit ook niet altijd toe wil staan. In de PDP Discovery API kun je ook aangeven of de endpoints ondersteunen of niet. Je kunt de PEP ook zo inrichten dat ze deze queries simpelweg niet uitvoeren.

  *Gideon Zegwaard* geeft aan dat voor het NLGov profiel wat voorbeelden toegevoegd zouden kunnen worden.
  *Frank Terpstra* geeft aan voorzichtig te willen zijn met voorbeelden.
  *Michiel Trimpe* beaamt dat aangezien het voorbeeld van de `action` naam beginnend met `can_` in AuthZEN al voor veel verwarring heeft gezorgd.

  De werkgroep ziet voor de Search APIs verder geen punten voor opname in het Nederlands profiel.

- *Michiel Trimpe* toont de PDP metadata waarin de beschikbare endpoints opgenomen kunnen worden in de Well-Known-URIs structuur. 
  
  *René Kint* vraagt of dit hetzelfde is als een capabilities end-point. *Michiel Trimpe* bevestigt dat het een variant/implementatie is van een capability endpoint.

  *Frank Terpstra* geeft verdere uitleg bij het concept.

  De werkgroep ziet voor de PDP Metadata ook geen verdere punten voor opname in het Nederlands profiel.

- *Michiel Trimpe* toont de [werkversie van de FTV standaard](https://ftv-standaard-2f223b.gitlab.io/) waarin de drie nieuwe standaarden verwoven waren. Het wordt bekeken om te zien of er nog aspecten gemist waren.

  *Michiel Trimpe* deelt dat we de AVG verwerkingsactie onder `action` kunnen specificeren (4.2.1). *René Kint* merkt op dat dit dan in het Engels vertaald zal moeten worden. *Frank Terpstra* merkt op dat dit al vertalingen van GDPR zijn en dat er officiële vertalingen van zijn.

  *Michiel Trimpe* stelt voor een verwijzing naar een verwerkingsactiviteit op te nemen in overeenstemming met de wijze waarop Logboek Dataverwerkingen werkt.

  *Frank Terpstra* geeft aan dat, op basis van zijn werk bij Logboek Dataverwerking, niet elke verwerking onder de AVG valt. Voor die verwerkingen gebruiken ze daar nu het algoritme-register maar er worden nog enkele aanpassingen verwacht zoals verwijzingen naar de wettelijke basis.

  *Michiel Trimpe* geeft aan dat de intentie is om de aanpak bij Logboek Dataverwerkingen hiervoor te volgen en dat dit daar dus op aangepast moet worden.

  **Beslissing**: Het AuthZEN NL Gov-profiel volgt de aanpak van Logboek Dataverwerking hierin.

  *Michiel Trimpe* geeft aan dat zaken die voor logging belangrijk zijn niet in de PEP-PDP interface opgenomen zullen worden maar in de Logboek Toegangsbeslissingen standaard.

- *Michiel Trimpe*: Wat betreft de vorm van de standaard moet gekozen worden voor een kopie met aanpassingen of opnoemen van de wijzigingen ten opzichte van de standaard. Gezien de ervaring van *Stas Mironov* hiermee stellen we voor zijn inzicht hierin te volgen. 

  **Beslissing**: We volgen de vorm-voorstellen van Stas en het bredere team dat de NL Gov profielen op de OAuth/OIDC standaarden bij Logius beheert.
{{< /chapter/section >}}

{{< chapter/section title="Planning volgende werkgroepen " >}}

Wegens tijdsgebrek worden geen nieuwe onderwerpen voor latere werkgroepen bepaald. De volgende werkgroep zal over Linked Data gaan.

{{< /chapter/section >}}
