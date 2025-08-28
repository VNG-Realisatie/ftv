---
type: 'chapter'
Title: 6. Policies
---

{{< chapter/section title="Policies (20 mei 2025)" >}}

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Marc de Boer (FTV)
- Michiel Trimpe (FTV)
- Gerard Juijn (FTV)
- Maikel Hofman (FTV)
- René Vendrig (FTV)
- Karin Hiralal (FTV)
- Danny Greefhorst (ArchiXL)
- Guus van der Meer (Vecozo)
- René Kint (Zicht op Nederland)
- Rens Kievit (MinBZK)
- Hans Schevers (BIM Connected)
- Frank Terpstra (Geonovum)
- Lexi Rowland (Kadaster)
- Remo van Rest (Zorginstituut Nederland)
- Elske Derks (MinBZK)
- Gideon Zegwaard (FDS)
- Christel van de Wal (ACM)
- Hans Hendrikman (RvIG)
- Nico Spijkers (MinBZK)
- Karel Hiberdink (Justid)
- Marc van Andel (Kadaster)
- Martin van der Plas (Logius)
{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking 
- Updates van subwerkgroepen 
- Introductie (stelsel-) policies door Gideon Zegwaard 
- Workshop Register Toegangsbeleid 
- Acties en onderwerp volgende werkgroep 
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}} 
- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20250520-policies.mp4)
- [Presentatie Toegang in FDS]({{< param baseDirectory >}}documents/20250520-toegang-in-fds.pptx)
- [Register Toegangsbeleid Miro-bord]({{< param baseDirectory >}}documents/20250520-register-toegangsbeleid-miro.pdf)

{{< /chapter/section >}}

{{< chapter/section title="Welkom & kennismaking" >}}
De volgende nieuwe deelnemers introduceren zich:
- Hans Schevers, R&D Manager bij BIM Connected en werkzaam bij Kadaster en heeft gewerkt aan Lock-Unlock.
- Lexi Rowland, Data Science team bij Kadaster. Werkzaam aan de knowledge graphs en werkt aan een PhD bij Universiteit Twente over 'Security & Privacy Awareness in Virtual Knowledge Graphs'.
- Guus van der Meer, Vecozo. Werkt aan het netwerkmodel iWlz en vervangt Igor van Haren tijdens zijn vakantie.
{{< /chapter/section >}}

{{< chapter/section title="Updates van subwerkgroepen" >}}

De subwerkgroep Juridisch Kader komt 22 mei 2025 samen op het Ministerie van BZK in Den Haag onder leiding van Wouter en Elske. Alle werkgroep deelnemers worden uitgenodigd. Rens Kievit geeft aan ook deel te willen nemen.

De subwerkgroep Logboek Toegangsbeslissingen (Guus, Maikel en Michiel) heeft gewerkt aan het opzetten van de hoofdstukstructuur en een eerste versie van [het specificatiedocument](https://vng-realisatie.github.io/authorization-decision-log/) gebouwd. 

- *Gideon Zegwaard*: Waarom is gekozen voor Nederlands als voertaal?

  *Michiel Trimpe*: Om overeen te komen met Logboek Dataverwerkingen.

  *Gideon Zegwaard*: Dit kan verwarring veroorzaken over termen en maakt internationale adoptie moeilijker.

  *Marc van Andel*: Maar het zal Nederlandse adoptie makkelijker maken.

  *Michiel Trimpe*: We staan open om het te veranderen. We zullen kijken hoe we deze beslissing willen maken.

Er wordt gevraagd of er nog meer deelnemers interesse hebben om aan de subwerkgroep deel te nemen. Niemand meldt zich aan.
{{< /chapter/section >}}

{{< chapter/section title="Introductie (stelsel-)policies" >}}

Gideon Zegwaard deelt de presentatie [Toegang in FDS]({{< param baseDirectory >}}documents/20250520-toegang-in-fds.pptx)

- *Martin van der Plas*: Hoe worden hier keuzes in gemaakt en vastgelegd? Het kan handig zijn om keuzes zoals gebruik van JSON en XML aan te raden en hetzelfde geldt voor uitwisselingsprotocollen.

  *Gideon Zegwaard*: Daar gaat deze werkgroep over, als het gaat over toegang middels policies. Hier kunnen we beslissen wat handig is en wat we op welk niveau vast willen leggen. Je kan bijvoorbeeld op NLGov niveau iets aanraden, maar dit in het FDS profiel daarop verplichten.

- *René Kint*: Zijn er ook specifieke policies nodig voor eventmechanismes? 

  *Gideon Zegwaard*: Die vallen onder gerelateerde standaarden. Je moet de policies daar ook op toe kunnen passen.

  *Martin van der Plas*: Vandaar ook mijn vraag; want als je protocollen als AMQP of MQTT kiest wordt het lastiger dan wanneer je standaardiseert op HTTP calls.

  *Michiel Trimpe*: In de brede AuthZEN standaard kan je elke call instrumenteren, maar dwing je dus ook minder af. In de FDS-profielen daarop kunnen we inderdaad aannames maken die de complexiteit versimpelen.

Vragen na de presentatie:

- *Hans Hendrikman*: Ik moet nog kijken hoe dit binnen RvIG landt. De filtering is binnen BRP al in aantal dingen ingeregeld. Aan de ene kant de voorwaardenregels en aan de andere kant autorisatiebesluiten. Die moeten op elkaar ingrijpen.

  *Gideon Zegwaard*: We moeten dus een structuur kiezen die aansluit op die manier van werken. Hoe kunnen we de praktijk van de BRP plotten op wat we hier bedenken?

- *Marc van Andel*: Ik heb je geen verschil horen maken tussen control plane en data plane. Moeten we dat nog meenemen in de policies?

  *Gideon Zegwaard*: Je moet ze sowieso verbinden. Als een policy in de data plane bestaat moet je die ook in de control plane benoemen. Dat is een goede aanvulling. Wellicht dat we daar in de categorisering van policies iets mee kunnen.

- *Martin van der Plas*: Zijn er mechanismes om een policy te ondertekenen of de echtheid kan waarmerken zodat je zeker weet dat als je die policy implementeert je ook de correcte policy hebt? Of wordt dat vrijgelaten zodat elke organisatie zelf een interpretatie moet doen van de functionele policy in een technische configuratie.

  *Michiel Trimpe*: Dat is wel de fall-back waar we waarschijnlijk op uitkomen. Mogelijk kunnen we stelselpolicies echt technisch definiëren, maar dat hangt af van de hoeveelheid aannames en beperkingen we af kunnen dwingen.

  *Martin van der Plas*: Het doet me ook denken aan de Verifiable Credentials standaard.

  *Marc van Andel*: Daar leunt het Dataspaces protocol ook op voor de control plane.

  *Michiel Trimpe*: De vraag is ook hoe je de policies dan in de payload van Verifiable Credentials opneemt. Vanuit de OpenID wereld wordt juist ook gekeken naar standaarden als CAEP en het Shared Signals Framework.

{{< /chapter/section >}}

{{< chapter/section title="Workshop Register Toegangsbeleid" >}}
*Michiel Trimpe* heeft een [Miro-bord]({{< param baseDirectory >}}documents/20250520-register-toegangsbeleid-miro.pdf) voorbereid met verwachtingen en aandachtspunten voor de standaard Register Toegangsbeleid.

*Gideon Zegwaard* deelt dat hij deze verwachtingen zojuist in zijn presentatie heeft gedeeld. Die zal hij niet alsnog in de Miro herhalen.

*Hans Hendrikman* deelt dat hij zijn initialen erbij heeft gezet. *Michiel Trimpe* deelt voor degenen die met naam aangemeld zijn, wordt dit automatisch getoond. Anonieme deelnemers kunnen inderdaad hun initialen toevoegen.

{{< /chapter/section >}}

{{< chapter/section title="Acties en onderwerp volgende werkgroep" >}}

- *Michiel Trimpe* vraagt of er bezwaren zijn om de volgende werkgroep het NLGov profiel voor AuthZEN te bespreken. Hoe we dat aan willen pakken; welke structuur; hoe veel we in NLGov op willen nemen.

  *Gideon Zegwaard*: Wellicht willen we ook dingen prioriteren binnen AuthZEN NLGov.

  **Beslissing**: We bespreken de volgende werkgroep het NLGov AuthZEN profiel.

- *Michiel Trimpe*: Het daarna meest besproken onderwerp is SPARQL / Linked Data. Zullen we dit voor de werkgroep daarna al inplannen? En zijn er nog meer geïnteresseerden?

  *Hans Schevers* meldt zich aan.

  **Beslissing**: De werkgroep over 4 weken gaat over de relatie met Linked Data.

- Voor de subwerkgroep policies zijn verder geen nieuwe aanmeldingen.

- *Elske Derks*: Worden de slides gedeeld?

  *Karin Hiralal*: De slides worden op de website gedeeld in de notulen. Op het Mattermost-kanaal en in de FTV Update wordt hier een link naartoe opgenomen.

  *Michiel Trimpe*: We hebben inderdaad ook een Mattermost-kanaal voor laagdrempelige communicatie. Hierbij het verzoek of iedereen zich daar voor kan aanmelden.

{{< /chapter/section >}}
