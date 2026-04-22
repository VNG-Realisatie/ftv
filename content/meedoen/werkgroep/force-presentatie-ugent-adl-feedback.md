---
type: 'chapter'
Title: FORCE presentatie UGent & ADL feedback
---
{{< chapter/section title="" >}}
# FORCE presentatie UGent & ADL feedback (14 april 2026)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Marc de Boer (FTV)
- Stas Mironov (Logius)
- Wout Slabbinck (UGent-imec)
- Gideon Zegwaard (FDS)
- Floris Deutekom (Geonovum)
- Guus van der Meer (Vecozo)
- Igor van Haren (Vecozo)
- Maria Dziouba (Vecozo)
- Danny Greefhorst (FDS)
- Remo van Rest (Zorginstituut Nederland)
- René Kint (Zicht op Nederland)
- Hugo Mostard (Gemeente Den Haag)
- Axel van der Minne (DUO)
- Rob van Dort (mapplica)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20260414-force-presentatie-ugent-adl-feedback.mp4)
- [Presentatie](/ftv/documents/20260414-force-presentatie-ugent.pdf)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking (5m)
- FORCE: ODRL-evaluatie (Wout Slabbinck, UGent-imec) (35m)
- Feedback Authorization Decision Log (15m)
- Planning volgende werkgroep (5m)
{{< /chapter/section >}}

{{< chapter/section title="Welkom & kennismaking" >}}

*Michiel Trimpe* heet iedereen welkom bij de 19e bijeenkomst van de werkgroep. De agenda bestaat uit een presentatie over ODRL-evaluatie via FORCE door Wout Slabbinck van de Universiteit Gent, gevolgd door feedback op het Authorization Decision Log en planning voor de volgende werkgroep.

*Michiel Trimpe* introduceert Wout Slabbinck als onderzoeker bij KNoWS (IDLab, UGent-imec) en contributor aan de W3C ODRL Community Group. Hij is een van de ontwikkelaars van het FORCE-framework en heeft al langere tijd onderzoek gedaan naar ODRL-evaluatie en -visualisatie. De werkgroep had in de vorige sessie geconcludeerd dat evaluatie en visualisatie van ODRL belangrijke aandachtspunten waren bij het modelleren van toegangsbeleid.

{{< /chapter/section >}}

{{< chapter/section title="FORCE: ODRL-evaluatie" >}}

*Wout Slabbinck* presenteert zijn onderzoek naar het representeren en afdwingen van ODRL-policies in gedecentraliseerde systemen. De presentatie behandelt vier onderwerpen: achtergrond (Solid/decentralisatie), het representeren van policies met ODRL, deterministische evaluatie van policies, en toepassing in de praktijk.

**Vragen en discussie**

*René Kint* vraagt of er gekeken is naar het automatisch genereren van ODRL-policies, bijvoorbeeld via API's als policy management methode. *Wout Slabbinck* geeft aan dat hier onderzoek naar gedaan is, onder meer naar het omzetten van natural language naar ODRL-policies. Binnen het eigen lab is gewerkt aan het automatisch koppelen van standaard policies bij het aanmaken van resources, maar dit vergt nog verdere uitwerking.

*Danny Greefhorst* vraagt hoe het onderzoek zich verhoudt tot de International Data Spaces Association (IDSA), waar ook met ODRL gewerkt wordt. *Wout Slabbinck* bevestigt dat er goede contacten zijn met onder andere het team van Stefan Decker, Fraunhofer en Gaia-X. De onderzoekers proberen elkaars werk te volgen en af te stemmen, onder meer via de W3C ODRL Community Group. Er wordt ook gekeken naar een gezamenlijke ODRL 3.0 workshop op een data space event.

*Gideon Zegwaard* stelt twee vragen. Ten eerste over hiërarchische policies: is er een construct voor het laten prevaleren van specifiekere policies boven algemenere? *Wout Slabbinck* antwoordt dat dit nog niet gedefinieerd is binnen ODRL en dat er formele semantiek voor nodig is. Er zijn wel onderzoeksgroepen die hier papers over geschreven hebben, waaronder een oplossing met SHACL. Ten tweede vraagt *Gideon Zegwaard* over gelaagde policies in data spaces (deelnemerschap, datadeelrelatie, individuele request). *Wout Slabbinck* geeft aan dat het huidige onderzoek vooral op het request-niveau zit, maar dat een collega werkt aan procesmodellering met ODRL-policies in het Pilots-project (physical internet).

*René Kint* vraagt of er al use cases zijn voor autorisatie op basis van locatie. *Wout Slabbinck* antwoordt dat er binnen de huidige projecten geen concrete use cases zijn, maar dat locatie als constraint wel ondersteund wordt. Hij merkt op dat geo-operaties (zoals "valt binnen gebied") buiten de scope van ODRL vallen, maar via profielen wel combineerbaar zouden zijn met bestaande geo-standaarden.

*Stas Mironov* vraagt of User Managed Access (UMA) ook buiten Solid wordt gebruikt en of het internationaal aanslaat. Hij merkt op dat de standaard geen brede adoptie heeft gekregen. *Wout Slabbinck* verwijst naar een collega die hier meer van weet en noemt dat er ook vergelijkbare protocollen zijn onderzocht. *Michiel Trimpe* voegt toe dat Eve Mahler, een van de initiators van UMA, nog steeds enthousiast is, maar dat de standaard maatschappelijk nooit voldoende is gaan leven.

*Michiel Trimpe* legt een link naar de FTV-standaarden: het request-model en de State of the World in FORCE corresponderen met het AuthZEN-informatiemodel. In AuthZEN is afgesproken dat JSON-LD-definities mogelijk zijn, waardoor er potentieel automatische conversie mogelijk is tussen AuthZEN-requests en FORCE evaluation requests. Dit moet nog verder onderzocht worden.

*Floris Deutekom* bedankt Wout en merkt op dat het technische detailniveau van de presentatie juist heel waardevol was, omdat het abstracte hierdoor is gaan leven.

{{< /chapter/section >}}

{{< chapter/section title="Feedback Authorization Decision Log" >}}

*Michiel Trimpe* licht de stand van zaken toe rond het Authorization Decision Log (ADL). De standaard is in beheer genomen door Logius, die ter voorbereiding van de openbare consultatie een review heeft laten uitvoeren door Tim van der Lippe. Daaruit zijn een aantal feedbackpunten gekomen.

**Kleinere feedbackpunten**

- De introductiesecties waren zelfstandig geschreven in plaats van op elkaar voortbouwend, waardoor er herhaling in zat.
- De voorbeelden die bij de detailniveaus horen moeten verplaatst worden naar het detailniveau-hoofdstuk.
- Het woord "request" werd op twee plekken in verschillende betekenissen gebruikt: soms als AuthZEN API request, soms als gelogd HTTP request.
- Op een aantal plekken stond een combinatie van MUST en MAY waar een SHOULD met toelichting passender is.

**Source verwijzingen (dataminimalisatie)**

De standaard bevat een sectie over hoe je via verwijzingen dataminimalisatie kunt toepassen (geversioneerde, temporele en log-verwijzingen). De feedback van Tim was dat deze sectie niet ver genoeg is uitgeschreven om normatief te zijn en suggereerde om het eventueel te verplaatsen naar developer.overheid.nl.

*Michiel Trimpe* stelt dat het uitschrijven tot normatieve kwaliteit te veel werk is voor de komende twee weken en dat het onderwerp eigenlijk een eigen standaard verdient.

*Floris Deutekom* is het ermee eens dat het terrein nog te onbekend is om al normatief te maken. Hij stelt voor om de sectie niet-normatief in de standaard te houden: zonde om weg te gooien, en het levert mogelijk waardevolle feedback op tijdens de consultatie. *Stas Mironov* beaamt dat. De werkgroep stemt hiermee in.

**W3C Trace Context verplichten**

*Michiel Trimpe* stelt voor om W3C Trace Context verplicht te maken in de standaard. Momenteel is de trace context optioneel met een verwarrende tekst over de relatie met FSC transaction IDs. Tim stelde voor om een steviger statement neer te zetten, in lijn met Logboek Dataverwerkingen en FSC.

*Gideon Zegwaard* stemt voor.

*Guus van der Meer* merkt op dat als FSC trace context gaat gebruiken, het logisch is om het ook hier te verplichten.

*Stas Mironov* geeft aan dat hij de trekker is van FSC en dat het eigenlijk altijd al op MUST had moeten staan. FSC heeft de intentie uitgesproken om trace context te gaan gebruiken, maar dat is nog niet zeker en kan nog even duren.

*Michiel Trimpe* benadrukt dat je los van FSC altijd zelf een trace ID kunt starten, dus de verplichting kan onafhankelijk van FSC bestaan. De werkgroep bereikt consensus: trace ID en span ID worden van RECOMMENDED naar REQUIRED verhoogd. De transaction ID blijft optioneel beschikbaar.

**Van event naar span**

*Michiel Trimpe* presenteert het zwaarste feedbackpunt: het ADL is nu gemodelleerd als een event binnen trace context, maar een PDP-verzoek is eigenlijk een span (met een begin- en eindtijd) binnen de grotere trace. Verzoeken naar PIPs zijn op hun beurt sub-spans van het PDP-verzoek. Tim heeft hierin gelijk.

De consequentie is dat de timestamp vervangen wordt door een start- en eindtijd, en dat de huidige velden (type, request, response, policies) in een attributen-map komen met een prefix (ADL.type, ADL.request, etc.), conform de trace context span-structuur. Ook moet een parent span ID worden toegevoegd.

*Floris Deutekom* vraagt of de timestamp dan uit de MUST-lijst gehaald wordt of helemaal verdwijnt. *Michiel Trimpe* legt uit dat timestamp vervangen wordt door from en to, en dat alle andere velden als span-attributen worden opgenomen met een ADL-prefix.

*Guus van der Meer* voegt toe dat er dan ook een parent ID bij moet voor de verwijzing naar de bovenliggende span.

De werkgroep stemt in. *Michiel Trimpe* stelt voor om dit samen met Stas en Tim in de komende twee weken uit te werken en roept geïnteresseerden op om aan te haken.

{{< /chapter/section >}}

{{< chapter/section title="Planning volgende werkgroep" >}}

- **RvIG vragenuurtje**: Voor de volgende werkgroep (28 april) zal RvIG beschikbaar zijn voor een vragenuurtje over het RvIG beleid. 
- **iWlz bovenliggend beleid**: *Remo van Rest* gaat de komende twee weken met *Michiel Trimpe* kijken of het bovenliggende beleid van de iWlz in ODRL gemodelleerd kan worden, met als doel de voortgang te presenteren in de volgende werkgroep.
- **ADL herstructurering**: *Michiel Trimpe* werkt samen met *Stas Mironov* en Tim van der Lippe aan de herstructurering van het ADL naar trace context spans.

{{< /chapter/section >}}
