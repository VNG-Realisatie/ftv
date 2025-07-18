---
type: 'nieuws'
Title: Werkgroep FTV over linked data 
date: '2025-06-17'
summary: "Op dinsdag 17 juni verdiepte de werkgroep Federatieve Toegangsverlening (FTV) zich in het thema linked data aan de hand van twee praktijkvoorbeelden."
---

{{< nieuws/header title="Werkgroep over linked data " >}}
Op dinsdag 17 juni verdiepte de werkgroep Federatieve Toegangsverlening (FTV) zich in het thema linked data aan de hand van twee praktijkvoorbeelden.
De presentaties riepen vragen op over de rol van AuthZEN en de aansluiting op linked data. Ook gaven twee subwerkgroepen een update.  
{{< /nieuws/header >}}

{{< chapter/section title="Fijnmazige autorisatie in de zorg" level="3">}}
Remo van Rest en Guus van der Meer (Actieprogramma iWlz) presenteerden hoe binnen het netwerkmodel voor langdurige zorg wordt gewerkt aan toegangsverlening.
Nu worden data gedeeld via berichtenverkeer. Het actieprogramma iWlz werkt aan een nieuw model met registers, waarbij elke partij eigen gegevens registreert in een bronregistratie.
Die registers kunnen geraadpleegd worden door andere partijen in de keten.
De toegangsregels zijn vastgelegd in een informatiemodel en vertaald naar technische autorisatieregels.
Er wordt gebruik gemaakt van GraphQL om gegevens gericht op te vragen en met een Policy Enforcement Point (PEP) om de toegang technisch af te dwingen. Nu wordt Envoy Proxy ingezet als PEP, maar dat is geen standaard. Actieprogramma iWlz onderzoekt hoe AuthZEN bij zal dragen aan de standaardisatie tussen PEP en het Policy Decision Point (PDP).  
{{< /chapter/section >}}

{{< chapter/section title="Fijnmazige autorisatie bij het Kadaster" level="3">}}
Hans Schevers (Kadaster) liet in zijn presentatie zien hoe in het project Lock/Unlock is gewerkt aan fijnmazige toegangscontrole.
In dit project is verkend hoe toegangsregels afgedwongen kunnen worden bij bevragingen over meerdere bronnen heen.  Deze toegang wordt verleend via een SPARQL Endpoint.  

**De projectgroep bedankt Remo, Guus en Hans voor hun presentaties!** 
 {{< /chapter/section >}}

{{< chapter/section title="Linked data en AuthZEN" level="3">}}
Tot slot besprak de werkgroep hoe AuthZEN verzoeken zelf geschikt gemaakt kunnen worden voor gebruik als linked data.
Bevragingen via AuthZEN kunnen weliswaar worden beschouwd als linked data, maar dat zijn ze nog niet: ze verwijzen niet automatisch naar andere bronnen. Met behulp van JSON-LD kan kan AuthZEN daar met beperkte inspanning voor geschikt worden gemaakt.
Michiel Trimpe (architect FTV) zal dit voorstel bespreken met de AuthZEN werkgroep van de OpenID Foundation. 
{{< /chapter/section >}}

{{< chapter/section title="Updates uit de subwerkgroepen" level="3">}}
De werkgroep kreeg korte terugkoppelingen van twee subwerkgroepen: 
-	**Authorization Decision Log** (voorheen: Logboek Toegangsverlening) werkt aan de verdere uitwerking van de standaard, waarbij Engels de voertaal is. De documentatie wordt vertaald en gepubliceerd op een aparte website. Binnen de werkgroep is discussie over het al dan niet verbreden van de scope naar Europees of internationaal niveau. Michiel Trimpe zal dit onderwerp inbrengen bij de werkgroep AuthZEN van de OpenID Foundation. 
- **AuthZEN NL Gov-profiel** heeft gesproken over de opbouw van het NL Gov profiel in de internationale standaard. Het voorstel is om te werken met een kopie met aanpassingen. Met behulp van tooling kan een delta getoond worden die zichtbaar maakt welke onderdelen voor Nederland worden aangepast of aangevuld. 
{{< /chapter/section >}}

{{< chapter/section title="Volgende bijeenkomst" level="3">}}
De volgende bijeenkomst is op dinsdag 1 juli van 10:00 tot 11:00 uur. Op de agenda staat het bespreken van de AuthZEN NL Gov-profiel, Decision Log standaard en de informatiemodellering van subjecten.  
Kijk voor aanmelden op de [website van IBDS](https://realisatieibds.nl/groups/view/0056c9ef-5c2e-44f9-a998-e735f1e9ccaa/federatief-datastelsel/events/view/3a2f79a8-e4ed-4a6b-aa52-1d88f2498e7f/werkgroep-federatieve-toegangsverlening). 
{{< /chapter/section >}}

{{< chapter/section title="Meer weten of meedoen?" level="3">}}
Wil je meer weten? Kijk dan op de FTV-webste voor de [notulen](/ftv/meedoen/werkgroep/linked-data/) van de werkgroep.

Wil je ook meedenken? Sluit je dan aan bij de [werkgroep](/ftv/meedoen/werkgroep/).
{{< /chapter/section >}}
