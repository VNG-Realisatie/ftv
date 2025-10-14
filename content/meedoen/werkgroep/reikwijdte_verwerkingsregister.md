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
{{< /chapter/section >}}
{{< chapter/section title="Welkom & kennismaking" >}}
Er zijn geen nieuwe werkgroepleden.

{{< /chapter/section >}}

{{< chapter/section title="Update subwerkgroepen" >}}
**Authorization Decision Log (ADL)**

*Michiel Trimpe* meldt dat de deadline van de interne consultatie van ADL is verstreken. Er zijn nog geen reacties ontvangen.
Hij licht toe dat de interne consultatie een onofficiële interne review is, bedoeld om te toetsen of er nog inhoudelijke aandachtspunten (concerns) zijn. Deze procedure is ook toegepast bij voor het AuthZEN NL Gov-profiel. De openbare consultatie van AuthZEN NL Gov start op 14 oktober via Logius. De projectgroep had de start van de openbare consultatie van ADL graag gelijk willen laten lopen met die van AuthZEN NL Gov, maar kiest voor zorgvuldigheid boven snelheid. Daarom wordt de deadline van de interne consultatie verschoven, zodat werkgroepleden nog de gelegenheid hebben hun aandachtspunten of akkoord door te geven.
De informatie over de standaard is te vinden op [GitHub](https://vng-realisatie.github.io/authorization-decision-log/)


**Subwerkgroep Juridisch Kader**

*Marc de Boer* meldt dat het juridisch kader in concept gereed is en vrijdag  10 oktober wordt besproken met Wouter Broekhuis (BZK). Het concept zal ook met de werkgroep worden gedeeld.
Hij benadrukt dat het van belang is dat het juridisch kader tegelijk met de standaard beschikbaar is bij de openbare consultatie omdat reikwijdte en juridisch kader bij elkaar horen. Voor het ADL is ook een juridisch kader nodig.

**Subwerkgroep AuthZEN**

*Michiel Trimpe* meldt dat de internationale AuthZEN-standaard inmiddels de status final draft heeft bereikt. Deze versie gaat nog een interne review van twee weken in. Als er geen grote wijzigingen meer komen, volgt daarna de 60-daagse officiële reviewperiode. Zonder grote bezwaren wordt AuthZEN 1.0 dan internationaal vastgesteld.
Dat sluit goed aan bij de Nederlandse planning: de publieke consultatie van het NL Gov-profiel start eveneens half oktober, zodat Nederlandse feedback nog in de internationale standaard kan worden verwerkt. Het is van groot belang dat de AuthZEN 1.0 final en het NL Gov-profiel precies op elkaar aansluiten.

{{< /chapter/section >}}

{{< chapter/section title="Reikwijdte" >}}
Er is een gesprek geweest met Forum Standaardisatie over de actuele voorwaarden voor opname van het AuthZEN NL Gov-profiel op de pas-toe-of-leg-uit-lijst. 
Deze zijn:
1.	Het opnemen van de standaard op de lijst dient in substantiële mate bij te dragen aan het bevorderen van de interoperabiliteit, van een toekomstbestendige gegevensopslag, en/of van een verminderde leveranciersafhankelijkheid.
2.	Het beoogde functioneel toepassingsgebied en het organisatorisch werkingsgebied van de standaard dient voldoende breed te zijn en betrekking te hebben op gebruik door de (semi-) overheid.
3.	Het uitvragen of gebruiken van de standaard moet niet al verplicht zijn op grond van een bestaande (Europees) wettelijke verplichting die gelijk dan wel groter is dan het voor de lijst beoogde functioneel toepassingsgebied en het organisatorisch werkingsgebied.
4.	De standaard dient bij te dragen aan de oplossing van een bestaand, relevant probleem.
De werkgroep vindt dat het AuthZEN NL Gov wat betreft het eerste criterium voldoet aan de punten 1 en 3 (het bevorderen van de interoperabiliteit en/of van een verminderde leveranciersafhankelijkheid). De standaard voldoet aan de overige criteria.

**Discussie**

*Michiel Trimpe* geeft aan wat het voorstel voor de reikwijdte was: wanneer een toegangsbeslissing buiten de applicatie wordt gelegd, moet AuthZEN NL Gov worden gebruikt.
In de vorige vergadering is dat als volgt verwoord: AuthZEN NL Gov moet worden toegepast wanneer de toegangsbeslissing tot een API-aanroep in een ander component wordt afgedwongen (PEP) dan waar de beslissing wordt gemaakt (PDP), zodat organisaties van beslispunt (PDP) kunnen wisselen.

*Gideon Zegwaard* vindt dat de voorgestelde reikwijdte te smal en te vrijblijvend is. Dit is nog geen gangbare praktijk: de meeste organisaties regelen toegangsbeslissingen binnen de applicatie.
Als de standaard niet actiever aanstuurt op het externaliseren van autorisatie, blijft implementatie uit. In deze vorm beschrijft AuthZEN NL Gov vooral de interne inrichting van autorisatie binnen één organisatie en draagt het onvoldoende bij aan interoperabiliteit tussen organisaties. Hij neigt daarom naar een bredere reikwijdte, maar dan in de vorm van een aanbeveling.

*Marc de Boer* herkent dat punt: als AuthZEN NL Gov alleen de interne inrichting van autorisatie beschrijft, gaat het niet over het stelsel (zoals FDS) maar over hoe een organisatie de toegangsverlening intern inricht. Wat betreft de sturing vraagt hij zich af of dit thuishoort bij FS of eerder bij architectuurrichtlijnen binnen GDI of FDS.

*Gideon Zegwaard* benadrukt dat FDS zich richt op afspraken tussen deelnemers, terwijl de inrichting van toegangsverlening vooral een interne aangelegenheid is binnen organisaties. Dat past eerder bij de GDI dan bij FDS.

*Danny Greefhorts* wijst erop dat Forum Standaardisatie zich vooral richt op positionering en interoperabiliteit, niet op architectuurkeuzes. Ook hij vindt  dat de huidige formulering voor de reikwijdte zich te veel richt op een intern proces en dus niet vanzelfsprekend past op de pas-toe-of-leg-uit-lijst.

*Igor van Haren* geeft aan dat er bij gegevensuitwisseling vaak meerdere controlepunten aanwezig zijn: zowel aan de kant van de bevrager als aan de kant van de aanbieder.
Dat betekent dat er twee PDPs (Policy Decision Points) kunnen bestaan die allebei een beslissing nemen over toegang. Dat impliceert eigenlijk altijd een EAM-achtige manier van werken: als je op meerdere plekken beslissingen neemt, moet je het beleid en de policies centraal kunnen beheren.

*Gideon Zegwaard* merkt op dat organisaties ook zonder technische koppeling kunnen afspreken wie welke policies uitvoert. Dat kan logisch of tekstueel worden vastgelegd, zonder direct een gezamenlijke technische oplossing te hoeven gebruiken.

*Igor van Haren* vindt dat een te beperkte invulling. In de praktijk, zegt hij, leidt dit tot uiteenlopende interpretaties van policies en verminderde transparantie.
Hij ziet het als een afzwakking van de standaard, omdat zonder centrale afstemming niet meer duidelijk is op welke policy een beslissing is gebaseerd. 

*Michiel Trimpe* merkt op dat leveranciersonafhankelijkheid ook een zwaarwegend argument is voor opname: zonder standaard ontstaat vendor lock-in. Hij stelt voor de argumenten interoperabiliteit en leveranciersonafhankelijkheid te gebruiken richting FS voor AuthZEN. Voor ADL kan gekeken worden naar een verplichting binnen het FDS, waar die standaard beter past.

*Gideon Zegwaard*  vindt dat ADL binnen FDS thuishoort, maar niet als directe verplichting.
FDS werkt met plateaus van implementatie, waarbij standaarden geleidelijk breder worden ingevoerd. Volgens hem is het logisch om ADL in zo’n plateau te positioneren, zodat organisaties ervaring kunnen opdoen zonder dat het formeel verplicht wordt.

*Igor van Haren* begrijpt de plateau-aanpak binnen FDS, maar wijst erop dat te late afstemming het risico vergroot dat organisaties de standaard verschillend interpreteren. Dat kan de beoogde interoperabiliteit ondermijnen.

**Conclusie**
De werkgroep concludeert dat er meer tijd nodig is om dit onderwerp te bespreken. Er wordt een apart overleg georganiseerd. Ook de leden die niet bij dit overleg aanwezig waren, worden geïnformeerd.


{{< /chapter/section >}}

{{< chapter/section title="Verwerkingsregister en Register Toegangsbeleid" >}}
*Michiel Trimpe* licht toe dat dit het laatste inhoudelijke punt is uit de interne consultatie. De vraag is hoe binnen AuthZEN NL Gov kan worden verwezen naar het Register van Verwerkingsactiviteiten (RvV) en het Algoritmeregister (AR). AuthZEN NL Gov beschrijft hoe toegangsbeslissingen worden genomen, maar legt nog geen directe koppeling met de juridische verantwoording daarvan. Die verantwoording hoort vastgelegd te zijn in registers zoals bijvoorbeeld het Logboek Dataverwerkingen (LDV).

De projectgroep FTV heeft Frank Terpstra (LDV) geconsulteerd. Hij deelt zijn conclusies met de werkgroep. Hij legt uit dat LDV verwerkingen van persoonsgegevens registreert: doelen, grondslagen, verantwoordelijke partijen en relaties tussen gegevensstromen. LDV biedt nog niet het  detailniveau waarmee je per toegangsbeslissing kunt zien wat de juridische basis was. Dat is iets voor latere uitbreiding. Hij gaat ook in op het AR. Elk algoritme in het AR heeft een unieke URI die kan worden opgenomen in logging. Daarbij kunnen ook verwijzingen naar wettelijke grondslagen worden toegevoegd, bijvoorbeeld via links naar wetten.nl. In de praktijk is dat nog niet precies genoeg: één algoritme kan meerdere wettelijke grondslagen hebben, waardoor niet duidelijk is welke bij een specifieke toepassing geldt. Om dat op te lossen zijn aanpassingen van het AR nodig. Het verlenen van toegang verloopt bovendien niet altijd via een algoritme. Daarom is mogelijk een apart register voor toegang nodig, waarin organisaties hun redenen voor toegang kunnen vastleggen.

**Discussie**
*Gideon Zegwaard* merkt op dat een verwerking breder is dan alleen een persoonsgegevensverwerking. Hij pleit voor een hiërarchische structuur waarin hoofd- en subverwerkingen worden onderscheiden, zodat toegangsbeslissingen traceerbaar zijn binnen een groter proces.

*Frank Terpstra* bevestigt dat LDV zulke hiërarchie technisch kan ondersteunen. Belangrijk is dat de wettelijke grondslag in de logging wordt opgenomen.
Michiel Trimpe geeft aan dat dit een leemte is die nog moet worden ingevuld. Mogelijk hoort dit in een Register Toegangsbeleid (RT), maar dat moet verder worden uitgewerkt. Hij stelt voor om  in AuthZEN NL Gov voorlopig te verwijzen naar het RvV en het AR. Volgend jaar kan dan de uitwerking van een RT worden opgepakt.

**Voor Reikwijdte en  Register Toegangsbeleid worden aparte meeting georganiseerd.**

{{< /chapter/section >}}
