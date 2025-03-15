---
title: Introductie
type: docs
weight: 10
---

# {{< figure src="/ftv/images/ftv_logo.png" alt="logo" width="50" height="50" >}}Welkom

Dit is de site van het project Federatieve Toegangsverlening (FTV).

## Waar gaat toegangsverlening over?

> Het project FTV biedt een gestandaardiseerde aanpak voor veilige, verantwoorde en efficiënte toegang bij
> gegevensuitwisseling tussen overheidsorganisaties.

De doelen van de standaardmethodiek zijn onder andere om toegangsverlening veiliger en fijnmaziger te maken, makkelijker te implementeren en leveranciersonafhankelijkheid te behouden.
Lees [hier](/ftv/docs/5.over_het_project) meer over de doelen.

### Een voorbeeld

Denk bijvoorbeeld aan boetes voor rijden in een milieuzone. Dieselcampers van bewoners mogen wel de zone in, van anderen niet.
De gemeente hangt camera's op voor kentekenherkenning, vraagt bij het RDW de categorie en emissieklasse van elk passerend voertuig op,
en op wiens BSN het kenteken staat. Ook vragen ze bij het RvIG op in welke gemeente die BSN is ingeschreven. De combinatie vertelt
of een boete op zijn plaats is.

Toegangsverlening gaat over het opstellen en handhaven van regels zoals:

- kentekens opvragen bij RDW mogen alleen bepaalde gemeenten, op basis van het 'Besluit milieuzones'
- als de emissieklasse al aangeeft dat het goed zit (geen diesel, of geen camper), vraag dan geen BSN op
- wis direct alle gegevens die niet nodig zijn om een boete te innen
- hou een logboek bij van al je opvragingen

## Context

Bij gegevensuitwisseling komt nog veel meer kijken, zoals veilige verbindingen, indentificatie, authenticatie en goed gebruikersbeheer.
FTV gaat alleen over toegangsverlening, ook wel autorisatie. Zie [scope](/ftv/docs/5.over_het_project/1.scope) voor verdere afbakening.

FTV kan op zich staan, maar past ook naadloos in het [Federatief Datastelsel (FDS)](https://federatief.datastelsel.nl/).
Toegang is een van de technische [stelselfuncties](https://federatief.datastelsel.nl/kennisbank/stelselfuncties/) van het FDS. Dit zijn ze allemaal:

![1.1stelselfuncties.png](/ftv/images/1.1stelselfuncties.png)

In [over het project](/ftv/docs/5.over_het_project) is meer te lezen over de opdracht en uitvoeringscontext.

## De methodiek

De voorgestelde [methodiek](/ftv/docs/1.methodiek) is er om toegangsverlening makkelijker te maken. Dit wordt beschreven vanuit drie perspectieven:

1. functioneel
2. architectuur, waarin zowel de componenten van de toegangsoplossing als de plaatsing in het wijdere IT-landschap wordt geschetst.
3. een technische standaard die in detail beschrijft waar een oplossing aan moet voldoen.

Om [aan de slag te gaan](/ftv/docs/2.toepassen) met de methodiek bieden we een aantal hulpmiddelen, zoals een stappenplan, een referentieimplementie en een proefopstelling.

## Status

Een [onderzoek](/ftv/docs/4.onderzoek) naar de status van toegangsverlening in techniek en bij de Nederlandse overheid is afgerond.

Op dit moment wordt aan de [technische standaard](/ftv/docs/1.methodiek/4.standaarden) geschreven. De basis is gereed om ingebouwd te worden , 
en dit wordt nu getest met de FDS connectiviteitsmodule, OpenFSC. Streven is de standaard op 1 juli 2025 aan te bieden voor plaatsing op de 'pas toe of leg uit' lijst.

De referentieimplementate en proefopstelling zijn nog in een vroege fase.

## Meedoen

[Denk mee](/ftv/docs/3.meedoen) met ons door van gedachten te wisselen over de methodiek, individueel of door deel te nemen in de [werkgroep](/ftv/docs/3.meedoen/1.werkgroep).

## Contact

Praat mee over FTV op ons [Mattermost](https://digilab.overheid.nl/chat/digilab/channels/federatieve-toegangsverlening) kanaal, vindt de broncode op [Github](https://github.com/VNG-Realisatie/ftv), 
of neem direct contact op met de product owner [Marc de Boer](mailto:marc.deboer@vng.nl).
