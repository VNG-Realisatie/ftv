---
type: 'chapter'
Title: 10. Planning najaar
---

{{< chapter/section title="Planning najaar 2025 (26 augustus 2025)" >}}

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Duuk Calor (Vecozo)
- Danny Greefhorst (ArchiXL)
- Frank Terpstra (Geonovum)
- Gerard  van der Hoeven (iSHARE)
- Gerard Juijn (FTV)
- Hans Schevers (Kadaster)
- Igor van Haren (Vecozo)
- Karel Hilberdink (Justid)
- Rens Kievit (MinBZK)
- Guus van der Meer (Vecozo)
- Marcel  Molenaar (UWV)
- Jaap  Smit (UWV)
- Nico Spijkers (MinBZK)
- Karin Hiralal (FTV)
- Marc de Boer (FTV)
- Gideon Zegwaard (ICTU)
- Rene Vendrig (FTV)
{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking
- Update subwerkgroepen
- Planning najaar 2025
- Onderwerp volgende werkgroep
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}} 
- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20250826-planning-najaar.mp4)
- [Planning Miro bord]({{< param baseDirectory >}}documents/20250826-planning-miro.pdf)
{{< /chapter/section >}}

{{< chapter/section title="Welkom & kennismaking" >}}
De volgende nieuwe deelnemers introduceren zich:
- Jaap Smit (UWV)
- Marcel Molenaar (UWV)

Beiden zijn betrokken bij het programma MIAMI van het UWV dat zich richt op de modernisering van EAM bij het UWV.
{{< /chapter/section >}}

{{< chapter/section title="Update subwerkgroepen" >}}
**Juridisch Kader**

*Marc de Boer* vertelt dat er binnen de subwerkgroep Juridisch Kader een wisseling van de bezetting zal plaatsvinden. De twee juristen van het ministerie van BZK zijn niet langer beschikbaar. BZK ondersteunt het project FTV onverminderd en zoekt, ondanks beperkte capaciteit, naar vervangers. Hierdoor zal de voortgang van deze subwerkgroep vertraging oplopen.

**AuthZEN NL Gov**

*Michiel Trimpe* geeft aan dat er voor de vakantie een eerste versie van de standaard gedeeld voor interne consultatie. Daarop zijn opmerkingen ontvangen:
- Verdere uitwerking van het gebruik van het Logboek Dataverwerkingen als verwijzing voor het activiteiten- en doelbindingsregister.
- Verduidelijking van de reikwijdte.
- Meer gedetailleerde uitwerking van de sectie Informatiemodellering, zodat de standaard ook bij een verplichtend karakter uitvoerbaar blijft.
De werkgroepleden kunnen tot de volgende bijeenkomst (dinsdag 7 september) nog opmerkingen doorgeven.

**Logboek Dataverwerking**

Voor de vakantie is gewerkt aan de standaard Authorization Decision Log. Deze is bijna klaar voor interne consultatie, die naar verwachting binnen een week start.

*Marcel Molenaar* wijst op het bestaan van Shared Signals en het CAEP-protocol (Continuous Access Evaluation Profile). Hiermee kunnen systemen realtime signalen uitwisselen, bijvoorbeeld om een gebruiker direct uit te loggen bij het verlies van een rol of bij opvallende patronen in een sessie. Hij ziet raakvlakken met logging en vraagt of er een koppeling moet worden gemaakt.

*Michiel Trimpe* licht toe dat Shared Signals (SSF) en CAEP andere aandachtspunten hebben. Ze richten zich vooral op tokens en realtime signalering, terwijl de logging-standaard vooral bedoeld is voor accountability en transparantie. Voor de log ziet hij daarom geen directe link. Wel is er een relatie met de plannen van de AuthZEN-werkgroep. Zij willen volgend jaar een PIP-standaard ontwikkelen om informatie veilig naar beslispunten (PDP’s) te distribueren. Daarin kan Shared Signals een rol spelen.
*Igor van Haren* vult aan dat Shared Signals nuttig kan zijn om PDP’s te informeren wanneer een policy niet meer geldig is of vernieuwd moet worden. *Michiel Trimpe* bevestigt dit en geeft aan dat de AuthZEN-werkgroep dit later ook op zal gaan pakken.

**Register Toegangsbeleid**

Er is geen update vanuit de werkgroep. *Marc de Boer* legt uit dat er geen financiering beschikbaar is. Wel zal tijdens het project FTV  werkingsgebied, doelstelling en de relatie met bestaande standaarden beschreven worden.
{{< /chapter/section >}}

{{< chapter/section title="Planning najaar 2025" >}}
*Michiel Trimpe* geeft aan dat er nog acht bijeenkomsten zijn tot het eind van het jaar en stelt voor een inhoudelijke planning te maken gebaseerd op de uitkomsten van de interne consultatie van de AuthZEN Gov NL standaard, de onderwerpen ter verdieping die eerder door de werkgroep zijn aangedragen én de resultaten uit de evaluatie in juli.

De in te plannen onderwerpen zijn:
1.	AuthZEN NL Gov: reikwijdte van de standaard, informatiemodellering standaarden en verwijzing Logboek Dataverwerking. 
2.	Authorization Decision Log: start interne consultatie.
3.	Registertoegangsbeleid: inventarisatie, scope en voorstel.
4.	Informatiemodellering van het subject: hoe worden gebruikersgegevens gemodelleerd? Bijvoorbeeld bij delegatie en het gebruik van verschillende inlogmiddelen zoals eHerkenning en DigiD.
5.	Relatie met contracten: omgang met FSC-contracten en autorisatiebeslissingen vanuit de BRP.
6.	Sessie over Partial Evaluation Policies en Residual Policies. 
7.	Relatie met Nederlandse architectuur: dit komt met name aan bod tijdens de consultatie en bij het in beheer nemen.
8.	Relatie met Dataspaces en JTC-25.
9.	Evaluatie van standaarden vanuit het principe Not Invented Here: nagaan of er standaarden zijn die gemist zijn en beter geïntegreerd, gebruikt of vermeld kunnen worden.
10.	Praktische toepassingen ophalen en in de werkgroep verder uitdiepen. Alle werkgroep leden zijn expliciet uitgenodigd voorbeelden aan te dragen.
11.	Een iSHARE deep dive om de relatie met FTV te verduidelijken.
12.	Een deep dive over Verifiable Credentials en de verhouding tot FTV.

De werkgroepleden vullen aan:

- *Rens Kievit* wil aandacht voor de rol van Linked Data en linked policies binnen de scope van AuthZEN. *Michiel Trimpe* stelt voor een aparte sessie over Linked Data te plannen. 

- *Marcel Molenaar* signaleert dat er al veel platform zijn  die eigen voorzieningen hebben voor het centraal beheren van policies. Dit geeft overzicht geven, maar brengt ook uitdagingen met verschillende policy-talen. 
*Michiel Trimpe* legt uit dat dit onderwerp onder de werktitel Register Toegangsbeleid valt. Vanuit FDS is hierom gevraagd, maar er is nog geen financiering beschikbaar. Het doel is het onderwerp dit jaar zo goed mogelijk te kaderen en te definiëren.

- *Gideon Zegwaard* vraagt aandacht voor het juridische kader. Hij vindt het belangrijk om expliciet te maken waarvoor juridische dekking nodig is en wat de relatie is tussen het juridisch beleidskader en de deliverables is. 
  
  *Michiel Trimpe* geeft aan dat er voor alle FTV-standaarden een juridisch beleidskader noodzakelijk om verdere invulling te kunnen geven aan de standaarden en benadrukt dat ook BZK het juridisch kader parallel wilde laten ontwikkelen, maar dat is vertraagd. 
  De aspecten waar juridisch kader voor gewenst is zijn:
    - Hoe onderbouwing van de grondslag opgenomen zou moeten worden in toegangsverzoeken en toegangsbeleid. (Zie feedback over gebruik van Logboek Dataverwerking hiervoor.)
    - De aanname dat het Authorization Decision Log invulling geeft een de juridische verplichting tot verantwoording van toegangsverlening.
    - De informatie-huishouding van gegevens in het Authorization Decision Log: welke gegevens mogen verzameld, opgeslagen en gedeeld worden.
{{< /chapter/section >}}

{{< chapter/section title="Onderwerp volgende werkgroep" >}}
Op basis van de input werd een prioritering gemaakt voor de komende drie vergaderingen.

**8 september**
- Interne consultatie Authorization Decision Log
- Slot interne consultatie AuthZen NL Gov
- Reikwijdte
- Relationship Based Access Control

**23 september**
- Linked Data
- Informatiemodellering

**7 oktober**
- Verwijzing naar Logboek Dataverwerking (mits juridisch kader beschikbaar is)

De deepdive over iSHARE zal ook z.s.m. worden ingepland. 
{{< /chapter/section >}}











