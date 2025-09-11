---
type: 'chapter'
Title: 11. Reikwijdte en ReBAC
---
{{< chapter/section title="" >}}
# Reikwijdte en ReBAC (9 september 2025)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Gerard Juijn (FTV)
- Hans Schevers (Kadaster)
- Igor van Haren (Vecozo)
- Nico Spijkers (MinBZK)
- Karin Hiralal (FTV)
- Marc de Boer (FTV)
- Rene Vendrig (FTV)
- Maikel Hofman (FTV)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking (5m)
- Update subwerkgroepen incl. planning consultatie (10m)
- Reikwijdte van FTV standaarden (15m)
- Relationship Based Access Control (25m)
- Afronding (5m)
{{< /chapter/section >}}

{{< chapter/section title="Bijlagen" >}}
- [Opname (ReBAC presentatie vanaf 24:30)](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20250909-reikwijdte-en-rebac.mp4)
- [Presentatie ReBAC](/ftv/documents/20250909-rebac.odp)
{{< /chapter/section >}}

{{< chapter/section title="Welkom & kennismaking" >}}
Er zijn geen nieuwe werkgroepleden.

**Noot:** *Gerard van der Hoeven* heeft gepoogd deel te nemen aan de werkgroep maar zijn verzoek tot toelating is niet ontvangen. Hij heeft dus niet deel kunnen nemen. 
{{< /chapter/section >}}

{{< chapter/section title="Update subwerkgroepen incl. planning consultatie" >}}
**Subwerkgroep AuthZEN**

*Michiel Trimpe*: Voor de interne consultatie zijn er geen additionele punten meer ontvangen. De punten die eerder werden aangegeven, worden met de werkgroep verder uitgewerkt. Dat zijn de reikwijdte, de informatie modellering en verwijzingen naar registers voor grondslag en doelbinding. De openbare consultatie loopt via Logius.

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

De werkgroep concludeert dat ReBAC een krachtige methode is voor snelle evaluaties van relationele structuren. Een nadeel is dat er voor de toegangsverlening deze relationele data gerepliceerd moet worden naar alle Policy Enforcement Points. Aangezien deze over de hele IT infrastructuur verspreid zijn kunnen gevoelige gegevens slechts met zeer grote zorg voor ReBAC gebruikt worden. ReBAC is dus vooral geschikt voor het snel evalueren van relaties op basis van openbare of lichtgevoelige data.

*Gerard Juijn* en *Michiel Trimpe* zullen namens FTV een artikel hierover schrijven voor de FTV-website. 
{{< /chapter/section >}}