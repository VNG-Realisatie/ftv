---
type: 'chapter'
Title: 13. Contracten
---

{{< chapter/section title="Contracten (2 december 2025)" >}}

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}

- Danny Greefhorst (FDS)
-	Jaap Smit (UWV)
- Gideon Zegwaard (FDS)
- Hugo Mostard (Gemeente Den Haag)
- Igor van Haren (Vecozo)
- René Kint (Zicht op Nederland)
- Niels Boek (KIK-V)
- René Houwen (KIK-V)
- Hans Hendrikman (RvIG)
- Axel van Minne (DUO)
- Remo van Rest (ZIN)
- Nico Spijkers (Geonovum)
- Michiel Trimpe (FTV)
- Gerard Juijn (FTV)
- Maikel Hofman (FTV)
- Karin Hiralal (FTV)

  {{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom 
- Update subwerkgroepen
- Contracten
- Evaluatie
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}} 
- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20250701-evaluatie.mp4)
- [Consultatiereactie Geo-basisregistraties organisaties](/ftv/documents/20251015-authzen-nlgov-consultatiereactie-geo-basisregistratie-organisaties.docx)
- [KIK-V: Waarom en wat houdt het in?](https://www.youtube.com/watch?v=QRtHhH_lHPE)
- [Logisch Ontwerp BRP](https://www.rvig.nl/sites/default/files/2024-04/Logisch%20Ontwerp%20BRP%202024.Q2_0.pdf)
- [Zoekpagina Tabel 35 Autorisatietabel](https://publicaties.rvig.nl/zoekpagina-tabel-35-autorisatietabel?code=200901&omschrijving=&sector=All&pubdate_op=%3E%3D&pubdate%5Bvalue%5D=&most_recent=1)
{{< /chapter/section >}}

{{< chapter/section title="Welkom" >}}

Michiel Trimpe verwelkomt de nieuwe deelnemer Axel van Minne, gegevensarchitect bij DUO én de gasten Niels Boek en René Houwen van KIK-V. Zij geven een presentatie over hoe architectuur voor data uitwisseling tussen zorgaanbieders en ketenpartners in de zorg is ingericht.
{{< /chapter/section >}}

{{< chapter/section title="Update subwerkgroepen" >}}

**Juridisch kader**

Er is geen nieuws.

**Authorization Decision Log**

De werkgroep heeft de interne consultatie in het vorige overleg afgerond. Alle feedback is verwerkt en de standaard is aangeboden aan Logius voor beheer. De financiering van het beheer is nog onduidelijk. De verwachting is dat dit in de loop van 2026 wordt opgepakt.

**AuthZEN NL Gov**

De publieke consultatie is afgerond. Er is een reactie ontvangen namens de Geo-basisregistraties, te weten Ministerie van Volkshuisvesting en Ruimtelijke Ordening (DGRO, afdeling Geo-informatie), Kadaster (Directie Bestuur en Strategie), TNO (Geologische Dienst Nederland) en Geonovum. 

Nico Spijkers licht de reactie toe. De feedback bevat geen technische opmerkingen, maar richt zich op het vervolgproces. 
De betrokken organisaties benadrukken dat meer praktijkervaring nodig is om te zien hoe de standaard zich ontwikkelt en hoe deze aansluit bij hun eigen werk aan de data space fysieke leefomgeving. 
Hergebruik van bestaande onderdelen is daarbij een belangrijk aandachtspunt. Ook vragen zij aandacht voor de status van de standaard, nu en in de toekomst. Ook daarvoor willen zij ervaring opdoen in pilots en implementaties.

Michiel Trimpe geeft een eerste reactie namens het project FTV. Volgens hem is het functioneel toepassingsgebied van AuthZEN al bewust klein gehouden. De ontvangen feedback lijkt vooral gericht op vragen die ontstaan wanneer de standaard later breder wordt gebruikt. Frank Terpstra stelt voor om deze punten binnen het FDS-verband verder op te pakken. FTV wil volgend jaar graag in concrete cases verkennen waar AuthZEN goed werkt en waar minder goed.

Michiel Trimpe reageert inhoudelijk op één passage uit de feedback. Daarin staat dat er weinig geo-datasets zijn die fijnmazige autorisatie nodig hebben. Hij denkt dat dit juist andersom is: omdat fijnmazige autorisatie nu lastig is, wordt data meestal grofmazig ontsloten. Juist daarom heeft FTV meerwaarde en kan helpen om fijnmazige autorisatie mogelijk te maken voor grote datasets. Logius geeft nog een officiële reactie op de gegeven feedback. Hij sluit af met de conclusie dat er behoefte is aan een iteratieve verkenning van het toepassingsgebied. Vanuit het FDS ligt de focus nu vooral op het Register Toegangsbeleid, omdat dat deelnemers helpt om onderlinge afspraken te maken binnen het stelsel.

Het document met de feedback wordt met de leden van de werkgroep gedeeld.

{{< /chapter/section >}}

{{< chapter/section title="Contracten" >}}

**Presentatie KIK-V**

René Houwen toont een kort filmpje waarin uitgelegd wordt wat KIK-V is en welk probleem het oplost. 
[KIK-V: Waarom en wat houdt het in?](https://www.youtube.com/watch?v=QRtHhH_lHPE)

Daarna geeft Niels Boek een toelichting op de applicatie. (zie opname vanaf 24:42 minuten). In zijn presentatie komen aan bod:
- KIK-V ontwikkelplatform, GitLab een vorm van github, waar de ontologie wordt ontwikkeld. Dat is de gegevensset waarop alle data bij de zorgaanbieder wordt op gebaseerd met daarin ook de gemaakte afsprakensets, technische specificaties en overzicht van uitwisselprofielen.
- KIK-V Publicatieplatform (Publicatieplatform).
- KIK-V Kickstarter waarop zorgaanbieders zich kunnen registeren en vragende partijen data kunnen aanvragen en antwoorden kunnen ophalen.
- Verificatieproces zorgaanbieders na registratie
- Inrichten van de toegangsrechten
- Demo met het testdatastation. Deze zal er per zorgaanbieder anders uitzien, afhankelijk wat er is afgesproken met de zorgaanbieder. Zorgaanbieders kunnen het gegeven antwoord altijd goedkeuren voordat het verzonden wordt naar de aanvrager.
- Duur van het proces van aanvraag en verzenden. De zorgaanbieder heeft een bepaalde afgesproken tijd om data goed te keuren en te verzenden.
- Ophalen van antwoorden door de vragende partij (via Excel of een API).
- Opzet credentials in SPARQL

De discussie spitst zich toe op de handmatige handeling voor het goedkeuren voor verzending. René Houwen licht toe dat zo ingericht is op basis van de wensen van de zorgaanbieder. Voor sommige aanvragen is ook een bestuurlijk akkoord nodig en dat wordt dan meegestuurd. De verwachting is dat in de loop van de tijd sommige antwoorden geautomatiseerd zullen worden verzonden.
Michiel Trimpe voegt toe dat contracten bij toegangsverlening vaak volgens een vast patroon verlopen. Ze bestaan als afspraken tussen partijen en staan meestal los van een individueel verzoek. Je kunt ze wel aan een verzoek koppelen als bewijs. In systemen zoals KIK-V en de BRP is het cruciaal om goed vast te leggen hoe zo’n contract eruitziet. Daarvoor is een degelijk informatiemodel nodig.

**BRP**

Bij de BRP of RviG zijn er autorisatiebesluiten en voorwaarderegels met een gedetailleerde uitleg wat er mag gebeuren met de onderliggende dataset. Michiel Trimpe concludeert dat er drie hoofdcomponenten voor contracten voor toegang zijn:
1.	De definitie van het contract
2.	De taal van het contract
3.	Het contract op technisch vlak
Michiel Trimpe laat de documentatie over BRP met voorbeelden van leveringsovereenkomsten en zoomt in op de beschrijving van voorwaarderegels (zie bij Bijlages en Opname vanaf 49:36 minuten). Omdat het niet gelukt een presentatie voor te bereiden over BRP in samenwerking met RvIG, wordt dit onderwerp globaal besproken.


{{< /chapter/section >}}

{{< chapter/section title="Vogende werkgroep" >}}

De volgende werkgroep vindt plaats op dinsdag 16 december. Op de agenda staan residual policies. Het onderwerp verifiable credentials wordt in 2026 opgepakt, eventueel met partijen zoals NUTS. De groep stemt hiermee in.
De komende werkgroep is waarschijnlijk de laatste officiële werkgroep vanuit het huidige FTV-project. Het project gaat in 2026 over naar ICTU. Wanneer een nieuwe reeks werkgroepen start, is nog niet bekend.


{{< /chapter/section >}}
