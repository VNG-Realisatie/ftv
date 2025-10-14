---
type: 'chapter'
Title: Reikwijdte en Verwerkingsregisters
---
{{< chapter/section title="" >}}
# Reikwijdte en Verwerkingsregisters (7 oktober 2025)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Gerard Juijn (FTV)
- Igor van Haren (Vecozo)
- Nico Spijkers (MinBZK)
- Karin Hiralal (FTV)
- Marc de Boer (FTV)
- Rene Vendrig (FTV)
- Maikel Hofman (FTV)
- Danny Greefhorst (FDS)
- Guus van der Meer (Vecozo)
- Stas Mironov (Logius)
- Frank Terpstra (Geonovem)
- Maryse Bucking (NDW)
- Gideon Zegwaard (FDS)


{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking (5m)
- Update subwerkgroepen (10m)
- Verwijzing naar verwerkingsregister (25m)
- Inventarisatie Register Toegangsbeleid (15m)
- Afronding (5m)

  Het onderwerp reikwijdte staat opnieuw op de agenda omdat de vorige keer niet alle werkgroepleden aanwezig konden zijn. 

{{< chapter/section title="Welkom & kennismaking" >}}
Er zijn geen nieuwe werkgroepleden.

{{< /chapter/section >}}

{{< chapter/section title="Update subwerkgroepen" >}}
**Authorization Decision Log (ADL)**

*Michiel Trimpe* meldt dat de deadline van de interne consultatie van ADL is verstreken. Er zijn nog geen reacties ontvangen.
Hij licht toe dat de interne consultatie een onofficiële interne review is, bedoeld om te toetsen of er nog inhoudelijke aandachtspunten (concerns) zijn. Deze procedure is ook toegepast bij voor het AuthZEN NL Gov-profiel. De openbare consultatie van AuthZEN NL Gov start op 14 oktober via Logius. De projectgroep had de start van de openbare consultatie van ADL graag gelijk willen laten lopen met die van AuthZEN NL Gov, maar kiest voor zorgvuldigheid boven snelheid. Daarom wordt de deadline van de interne consultatie verschoven, zodat werkgroepleden nog de gelegenheid hebben hun aandachtspunten of akkoord door te geven.
De informatie over de standaard is te vinden op

**Subwerkgroep Juridisch Kader**

De subwerkgroep Juridisch Kader is afgelopen twee weken niet bij elkaar geweest. 

*Michiel Trimpe* is bezig met een document over machtigingen en delegatie binnen FTV en de vraag hoe je juridische en technisch vastlegt wie iets mag doen namens wie. Hij licht toe: Binnen toegangsverlening is er een subject (de aanvrager als persoon of organisatie) en de context waarin dat gebeurt. Machtigingen zijn het samenspel tussen deze twee. De kernvraag is: wie zien we als het subject en welke machtigingen horen daarbij? Een machtiging wordt vaak in de context geplaatst, maar past in sommige gevallen beter in het subject, bijvoorbeeld als iemand curator is en handelt namens een andere persoon. Binnen FDS is er sprake van uitwisseling tussen systemen. Daar speelt de machtigingsrelatie tussen bijvoorbeeld werkgever en werknemer maar die tussen opdrachtgever en leverancier.

*Igor van Haren* verwijst naar het netwerkmodel van Vecozo waar de zorgaanbieder als formele partij toegang heeft tot bepaalde registers maar de IT-leverancier de feitelijke handeling uitvoert, zoals het ophalen van die gegevens. De zorgaanbieder geeft de IT-leverancier hiervoor een machtiging. Hij benadrukt dat hij dit onderscheid ook graag terugziet in de FTV-standaard.

**Subwerkgroep Autorization Decision Log**

*Michiel Trimpe*: De ontwerpversie van de standaard is klaar en vandaag wordt de interne consultatie gestart. Dat wordt ook aangekondigd in een nieuwsbericht. Er worden nog voorbeelden toegevoegd aan de documentatie om zaken te verduidelijken, maar de tekst zoals die er nu staat is wat de projectgroep betreft compleet. Aan iedereen het verzoek eventuele op- en aanmerkingen door te geven zodat de werkgroep deze punten kan bespreken voordat de standaard wordt aangeboden voor de publieke consultatie. De interne consultatie duurt tot en met dinsdag 7 oktober. 

De standaard is te vinden op: [Authorization Decision Log](https://vng-realisatie.github.io/authorization-decision-log/)
{{< /chapter/section >}}

{{< chapter/section title="Reikwijdte van FTV standaarden" >}}
*Michiel Trimpe* geeft een toelichting op het agendapunt.

Voor de standaard is het belangrijk om te definiëren op welk gebied de standaard van toepassing is. Dit gaat bijvoorbeeld over verplicht of niet-verplicht stellen van de standaard en het gebruik van de standaard binnen overheden, tussen overheden en tussen publiek en private partijen. De projectgroep kan hier een aanbeveling over doen bij het aanbieden van de standaard aan GDI of Forum voor Standaardisatie. 

Vanwege de beperkte opkomst lijkt het niet gepast om hier een beslissing over te nemen.

*Michiel Trimpe* doet een voorzet als basis voor een discussie met de bredere werkgroep. Het idee is om AuthZEN te verplichten voor het EAM- architectuurpatroon, dus wanneer een overheidsinstantie een autorisatie beslissing buiten de eigen applicatie laat evalueren en AuthZEN aan te bevelen voor alle API-aanroepen van- en naar overheidsorganisaties. 

{{< /chapter/section >}}

{{< chapter/section title="Relationship Based Access Control" >}}
Tot slot geeft *Gerard Juijn* (projectgroep FTV) een presentatie over ReBAC: Relation Based Access Control zoals uitgewerkt in OpenFGA. Deze is gebaseerd is op het Zanzibar-project van Google.
[Presentatie ReBAC](/ftv/documents/20250909-rebac.odp)

De werkgroep concludeert dat ReBAC een krachtige methode is voor snelle evaluaties van relationele structuren. Een nadeel is dat er voor de toegangsverlening deze relationele data gerepliceerd moet worden naar alle Policy Enforcement Points. Aangezien deze over de hele IT infrastructuur verspreid zijn kunnen gevoelige gegevens slechts met zeer grote zorg voor ReBAC gebruikt worden. ReBAC is dus vooral geschikt voor het snel evalueren van relaties op basis van openbare of licht gevoelige data.

*Gerard Juijn* en *Michiel Trimpe* zullen namens FTV een artikel hierover schrijven voor de FTV-website. 
{{< /chapter/section >}}
