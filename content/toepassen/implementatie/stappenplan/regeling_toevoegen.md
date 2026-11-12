---
Title: Regeling toevoegen
type: 'chapter'
---

{{< chapter/section title="Regeling toevoegen" >}}

Als OpenFTV eenmaal geïnstalleerd is en werkt, dan kan er beleid met bijbehorende beleidsregels voor applicaties worden toegevoegd. Hier wordt stapsgewijs uitgelegd hoe beleid om te zetten in formele beleidsregels.

Lees ook hoe de [policies van de OpenFTV beheermodule](/ftv/toepassen/openftv/manager_policies) en de [policies van de demonstratie over laadpalen](/ftv/toepassen/demonstratie/laadpaal_policies) werken.

{{< /chapter/section >}}

{{< chapter/section title="Regeling toevoegen" level="3" >}}

Beleidsregels worden gegroepeerd met een concept 'Regeling'. Dat is ook niet meer dan een groepering, handig om overzicht te houden. 

Om een regeling toe te voegen: log in op OpenFTV als een functioneel beheerder, kies voor regelingen, en voeg er eentje toe, met een passende korte naam.

{{< /chapter/section >}}

{{< chapter/section title="Beslispunt toevoegen" level="3" >}}

Een nieuwe regeling zal worden uitgevoerd door een of meer technische systemen. Een regeling voor parkeervergunningen bijvoorbeeld kan aan een bestaand zaaksysteem worden toegevoegd, of krijgt zijn eigen systeem. Het kan ook zijn dat er meerdere systemen nodig is voor een regeling, zoals een applicatie voor parkeervergunningen en een koppeling naar buiten voor het ophalen van voertuiggegevens.

Elk systeem dat toegang afdwingt noemen we een beslispunt. In OpenFTV wordt elk beslispunt geconfigureerd door een naam, een URL en een type-aanduiding. Dat doet de systeembeheerder in de configuratiebestanden.

{{< /chapter/section >}}

{{< chapter/section title="Gebruikersgroep(en) toevoegen" level="3" >}}

{{< /chapter/section >}}

{{< chapter/section title="Groepen voor toegang tot de toegang" level="4" >}}

Niet iedereen mag toegangsregels zien en aanpassen. Vaak is er een aparte groep mensen die verstand heeft van zowel de regeling als van het schrijven van polices die dit werk mag doen.

Daarom is het verstandig om voor de toegang tot de OpenFTV beheermodule aparte groepen per regeling en per set acties te maken. Een voorbeeld zou kunnen zijn:

| Acties                           | Groepsnaam          |
|----------------------------------|---------------------|
| Lezen                            | parkeren_lezen      |
| Aanmaken, aanpassen, verwijderen | parkeren_wijzigen   |
| Publiceren, depubliceren         | parkeren_publiceren |

De complete set acties is te lezen op [policies van de OpenFTV beheermodule](/ftv/toepassen/openftv/manager_policies)

Groepen worden bijgehouden in een Identity Provider. In een standaard OpenFTV installatie is dat KeyCloak. De functioneel beheerder maakt de gekozen groepen aan, en wijst de juiste personen toe aan de groepen.

{{< /chapter/section >}}

{{< chapter/section title="Groepen voor de toegang tot de regeling" level="4" >}}

Toegangsregels gaan vaak over de plek die de aanvrager heeft in de organisatie. Op welke afdeling iemand werkt, voor welke vestiging, etc. Ook daar zijn gebruikersgroepen voor. We gaan hier niet in detail in op de strategieën voor het maken van de groepen, maar het verstandig omgaan met groepen om wildgroei te voorkomen is een belangrijke vaardigheid in beleid uitwerken. Maak daarom vooraf een matrix van groepen en functies met de juiste granulariteit. Hier een voorbeeld

| Regeling          | Aanvragen                   | Goedkeuren                   | Beleidsregels wijzigen             |
|-------------------|-----------------------------|------------------------------|------------------------------------|
| Parkeervergunning | parkeervergunning-aanvragen | parkeervergunning-goedkeuren | perkeervergunning-beleid-wijzigen  |
| Invalidenkaarten  | invalidenkaart-bekijken     | invalidenkaart-wijzigen      | perkeervergunning-beleid-wijzigen |

{{< /chapter/section >}}


