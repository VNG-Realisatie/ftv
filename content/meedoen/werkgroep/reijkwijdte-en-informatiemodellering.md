
---
type: 'chapter'
Title: 12. Reikwijdte en Informatiemodellering
---
{{< chapter/section title="" >}}
# Reikwijdte en Informatiemodellering (23 september 2025)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Maikel Hofman (FTV)
- Daoud Urdu, Geonovum
- Igor van Haren (Zorginstituut Nederland)
- Marc de Boer (FTV)
- Karin Hiralal (FTV)
- Gerard Juijn (FTV)
- Danny Greefhorst (ArchiXL)
- Guus van der Meer (Vecozo)
- Remo van Rest (Zorginstituut Nederland)
- Hans Schevers (Kadaster)
- Stas Mironov (Logius)
- Frank Terpstra (Geonovem)
- Maryse Bucking (NDW)
- Nico Spijkers (MinBZK)


{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking (5m)
- Update subwerkgroepen (10m)
- Reikwijdte van FTV-standaarden (15m)
- Informatiemodellering (25m)
- Afronding (5m)
{{< /chapter/section >}}

{{< chapter/section title="Bijlagen" >}}
Opname
{{< /chapter/section >}}

{{< chapter/section title="Welkom & kennismaking" >}}
De werkgroep verwelkomt Daoud Urdu, sinds een maand werkzaam bij Geonovum als informatiemodelleur. 

{{< /chapter/section >}}

{{< chapter/section title="Update subwerkgroepen" >}}
**Subwerkgroep AuthZEN**

*Michiel Trimpe*: Op dit overleg staan de reikwijdte en de informatiemodellering op de agenda. Dit zijn twee onderwerpen die in de interne consultatie naar voren zijn gebracht.

**Subwerkgroep Autorization Decision Log**

*Michiel Trimpe*: De interne consultatie van het Authorization Decision Log is 15 september gestart. Dit biedt werkgroepleden de gelegenheid om suggesties en verbeteringen aan te dragen voordat de publieke consultatie volgt. Tot nu toe is er nog geen feedback ontvangen. De werkgroepleden worden uitgenodigd hun feedback door te geven. Ook is de redacteurplek nog niet ingevuld.

De standaard is te vinden op: [Authorization Decision Log](https://vng-realisatie.github.io/authorization-decision-log/)

**Subwerkgroep Juridisch Kader**

*Marc de Boer* meldt dat de uitwerking van het juridisch kader onder leiding van Wouter Diephuis (BKZ) langer duurt dan verwacht maar dat er vertrouwen is in een goede voortgang. Zodra er een concept gereed is, wordt dit gedeeld met de werkgroep. De subwerkgroep neemt ook de vraag mee hoe mandaat, delegatie en machtigen een plek krijgen binnen toegangsverlening in een federatieve context. Dit raakt aan de keuze van het subject in de autorisatie en aan de vraag hoe identiteit, positie en mandaat in een federatieve context vastgelegd en verantwoord worden.


{{< /chapter/section >}}

{{< chapter/section title="Reikwijdte van FTV-standaarden" >}}
*Michiel Trimpe*  introduceert het onderwerp reikwijdte en verwijst naar voorbeelden van de omschrijving van reikwijde bij standaarden op de ´pas toe of leg uit´-lijst van Forum Standaardisatie.

[Pas toe leg uit standaarden, Forum Standaardisatie](https://www.forumstandaardisatie.nl/open-standaarden/verplicht)
Voorbeeld: [Authenticatie standaarden] (https://www.forumstandaardisatie.nl/open-standaarden/authenticatie-standaarden)
Voorbeeld: [NL GOV Assurance profile for OAuth 2.0 ] (https://www.forumstandaardisatie.nl/open-standaarden/nl-gov-assurance-profile-oauth-20)

*Michiel Trimpe*  stelt de volgende beschrijving van de technische reikwijdte voor:

AuthZEN moet worden toegepast wanneer de toegangsbeslissing tot een API aanroep in een ander component wordt afgedwongen (PEP) dan waar de beslissing gemaakt wordt (PDP), zodat organisaties van beslispunt (PDP) kunnen wisselen.

Forum Standaardisatie neemt uiteindelijk het besluit over de reikwijdte. De standaard wordt aangeboden met een suggestie voor de reikwijdte.

In de discussie komt naar voren dat de voorgestelde reikwijdte relatief dwingend is en mogelijk breder uitpakt dan nodig.
*Frank Terpstra* wijst op het risico dat AuthZEN ook zou worden geëist in situaties waar nog helemaal geen federatieve context is en dat de lijst van Forum Standaardisatie vooral bestaat uit standaarden die interoperabiliteit tussen organisaties bewerkstelligen. 
*Marc de Boer* benadrukt dat leveranciersonafhankelijkheid óók een belangrijk doel is van de standaard, los van federatief gebruik. Het is de vraag of dat voldoende grond is voor een verplichte opname.

Conclusie

De werkgroep vindt dat het huidige voorstel om AuthZEN direct verplicht te stellen mogelijk te zwaar is.
Forum Standaardisatie wordt gezien als vooral gericht is op interoperabiliteit tussen organisaties. Het verplichte karakter sluit mogelijk niet goed aan bij dat perspectief.
In de huidige praktijk wordt AuthZEN daar nog maar beperkt voor ingezet. Wanneer de standaard specifiek wordt gekoppeld aan het federatieve gebruik voor verantwoording en interoperabiliteit, kan een verplichting op termijn wél passend zijn. Voor nu lijkt het verstandiger om te starten met opname op de lijst van aanbevolen standaarden en pas later, bij bredere toepassing, de stap naar de verplichte lijst te zetten.

*Noot: Gideon Zegwaard kon niet aanwezig zijn en gaf aan hier een ander perspectief op te hebben. Er is besloten de reikwijdte ook voor volgende werkgroep weer te agenderen.*

Besluit 

Het is van belang om Forum Standaardisatie over de reikwijdte te raadplegen. Het perspectief van de over de focus op interoperabiliteit tussen organisaties kan dan getoetst worden. Het FTV-team bereidt een gesprek voor. Daarnaast zal in de volgende werkgroep zal de reikwijdte ook weer geagendeerd worden.


{{< /chapter/section >}}

{{< chapter/section title="Informatiemodellering en Linked Data" >}}
*Michiel Trimpe* geeft een update over de manier waarop de AuthZEN-werkgroep omgaat met informatiemodellering en de koppeling met Linked Data (LD).
AuthZEN ondersteunt nu al voorbeelden met JSON Schema en kan ook werken met JSON-LD. Het idee is dat de interpretatie van een toegangsverzoek gespecificeerd wordt in de context zodat duidelijk is wat een subject, resource, action en context precies betekenen. 

De vertaling naar de AuthZEN NL Gov-standaard zou er als volgt uit kunnen zien: 
Elk AuthZEN verzoek zou in zijn context moeten linken naar informatiemodellering in de brede zin die uitlegt wat dit verzoek precies betekent.
Er kan gelinkt worden naar een website met informatie maar dat is generiek. 

*Michiel Trimpe* stelt daarom voor om de aanbeveling op te nemen dat type identifiers in AuthZEN als URIs worden vormgegeven en via een JSON-LD context verwijzen naar het [Meta Informatie Model (MIM)]{https://docs.geostandaarden.nl/mim/mim/) van Geonovum. Hij geeft aan dat vanuit de projectgroep FTV gewerkt wordt aan een MIM-profiel voor AuthZEN met de kernbegrippen toegangsbeslissing, subject, action, resource en context.

De discussie richt zich op de vraag naar welk niveau verwezen moet worden en of MIM dan de juiste keuze is.
*Michiel Trimpe* stelt voor om bij resource type, action en subject type te verwijzen naar LD URIs en daarnaast in de context een link op te nemen naar het MIM-model of documentatie.
*Danny Greefhorst* merkt op dat bij een vertaling van een MIM-model naar Linked Data het MIM in feite verdwijnt en alleen OWL-classes en SHACL node shapes overblijven.
*Hans Schevers* wijst erop dat SHACL een internationale standaard is die duidelijk en strikt beschrijft hoe data gestructureerd is en dat dit goed zou passen bij AuthZEN.
*Frank Terpstra* trekt de vergelijking met NL-SBB, waar een binding naar SKOS beschikbaar is. Dit is niet verplicht, maar wel een stimulans om het te gebruiken. Een vergelijkbare aanpak kan voor AuthZEN kansrijk zijn.
*Igor van Haren* geeft aan dat in de zorg gewerkt wordt met FHIR en dat er nauwelijks sprake is van LD.
Iedereen ziet dat LD een krachtige manier is om data aan elkaar te linken, maar de dekkingsgraad en implementatiegraad van LD is nog niet optimaal. Het is wel goed om vanuit de overheid wel te blijven sturen op het aanbevelen van LD.

Conclusie

- Elk AuthZEN-verzoek zou een URL moeten (should) bevatten die verwijst naar de documentatie van het gebruikte informatiemodel. Er wordt aanbevolen (recommended) om hiervoor MIM te gebruiken.
- Het wordt aanbevolen (recommended) om LD-identifiers te gebruiken voor type identifiers.
- Het wordt aanbevolen om het verzoek middels JSON-LD aan Linked Data modellen te koppelen.
- SHACL-modellen kunnen als aanvulling worden gebruikt om extra precisie te bieden.

Tot slot merkt *Danny Greefhorst* op dat er nog geen standaard voor policy-talen is. *Michiel Trimpe* vertelt dat de projectgroep FTV aan een eenvoudige component werkt.

*Michiel Trimpe* geeft aan gegeven feedback te verwerken in de standaard.


{{< /chapter/section >}}

{{< chapter/section title="Volgende werkgroep" >}}

Voor de volgende werkgroep staat de verwijzing naar registers op de agenda. *Frank Terpstra* verzorgt een presentatie over de aanpak van LDV. * Michiel Trimpe* bereidt een presentatie voor over registertoegangsbeleid.
Donderdag 25 september komt een deel van de weekgroep bijeen om te werken aan de MIM-modellering van het AuthZEN-model samen met Geonovum.



{{< /chapter/section >}}
