---
bookCollapseSection: false
weight: 10
Title: 4. Juridisch kader
---

# Juridisch kader (22 april 2025)

## Aanwezigen
- Marc de Boer (FTV)
- Michiel Trimpe (FTV)
- Marc van Andel (Kadaster)
- Arnoud Quanjer (VNG)
- Igor van Haren (Vecozo)
- Wouter Diephuis (MinBZK)
- Danny Greefhorst (ArchiXL)
- Gerard van der Hoeven (iSHARE)
- Rob Klaver (Idemia)
- René Kint (Zicht op Nederland)
- Pim Gaemers (FSC)
- Elske Derks (MinBZK)
- Stas Mironov (Logius)
- Christel van de Wal (ACM)
- Nick Boxem (MinI&W)
- Steven van der Vegt (Nuts)

## Agenda
- Relatie EAM en OAuth
- Presentatie Beleids-juridische verantwoording FTV (Wouter Diephuis)
- Presentatie Juridische Structuur iSHARE (Gerard van der Hoeven)
- Planning volgende werkgroepen

## Bijlages

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20250422-juridisch-kader.mp4)
- [Diagram relatie EAM en OAuth]({{< param baseDirectory >}}documents/20250422-relatie-eam-oauth.pdf)
- [Presentatie Beleids-juridische verantwoording FTV]({{< param baseDirectory >}}documents/20250422-beleids-juridische-verantwoording.pptx)
- [Presentatie Juridische Structuur iSHARE]({{< param baseDirectory >}}documents/20250422-juridische-structuur-iSHARE.pptx)

## Relatie EAM en OAuth 

*Michiel Trimpe* presenteerde een [diagram]({{< param baseDirectory >}}documents/20250422-relatie-eam-oauth.pdf) dat de relatie uitlegde. 

OAuth is een manier om informatie geauthenticeerd beschikbaar te maken door middel van tokens. OAuth kan informatie bieden over:
- identiteit: informatie over de identiteit van de aanvrager
- scopes/rollen: een lijst van waarden (strings) die de rollen van de aanvrager omschrijven 
- authorization_details: een JSON object met instructies over autorisatie.

Dit gebeurt primair tijdens authenticatie en het token wordt meegestuurd met de requests. Hierdoor kan er slechts een beperkte hoeveelheid autorisatie meegestuurd worden en heeft dit beperkte actualiteit (ten tijde van authenticatie.)

EAM is een manier om toegangsbeleid te centraliseren. EAM kan dus gebruikt worden voor:
- het bepalen van OAuth scopes/rollen en authorization_details;
- fijnmazige autorisatie waar veel en/of actuele informatie vereist is;
- autorisatie logica uit verschillende applicaties centraliseren.

OAuth en EAM richten zich dus op verschillende aspecten en kunnen elkaar goed aanvullen.

## Beleids-juridische verantwoording (Wouter Diephuis)

*Wouter Diephuis* gaf een [presentatie]({{< param baseDirectory >}}documents/20250422-beleids-juridische-verantwoording.pptx) over Beleids-juridische verantwoording bij federatieve toegangsverlening.

- *Marc van Andel*: In hoeverre schiet het logboek dataverwerkingen tekort in de verantwoording?

  *Wouter Diephuis*: Dat schiet niet tekort. Het Logboek Dataverwerkingen zorgt ervoor dat vastgelegd wordt welke handelingen verricht worden. De vervolgvraag is vastleggen wie dat heeft gedaan en of diegene daartoe bevoegd is. Het is daarbij dus aanvullend.

  *Marc de Boer*: Logboek Dataverwerking is voor verantwoording naar de burger. Logboek Toegangsverlening is voor verantwoording naar een stelsel toe.

- *René Kint*: (Slide #5) De private sector mag alles tenzij verboden. De overheid mag niks tenzij toegestaan. Hoe werken de kaders tussen publieke en private sectoren? 

  *Wouter Diephuis*: Aan beide kanten moet er een juridische grondslag zijn. De overheid moet een grondslag vinden in het kader van haar taken om informatie aan een private organisatie te leveren. De organisatie moet in het specifieke geval een grondslag hebben.

  *Marc de Boer*: En andersom mag de overheid wel private informatie gebruiken zonder daar grondslag voor te hebben? 

  *Wouter Diephuis*: Om persoonsgegevens te verwerken moet je een grondslag hebben. Dat geldt voor overheden maar ook voor private organisaties. 

  *Elske Derks*: Het gaat hierbij vooral om wat je handelen begrenst. 

  *René Kint*: Wanneer overheidstaken worden uitbesteed aan private partijen kom je daarbij in een grijs gebied.

  **Beslissing**: Hier zal later bij de verdieping van het juridisch kader verder op in worden gegaan.

- *René Kint* vraagt of er een definitie is van een keten. 

  Die is er niet maar het is wel belangrijk om verwerkingen te kunnen volgen over de keten heen. De organisatie is zelf nog steeds verantwoordelijk voor zijn stuk van de keten. Het volgen/koppelen van verwerkingen over de keten is in het Logboek Dataverwerkingen al gestandaardiseerd. Voor Logboek Dataverwerkingen is ook al een [juridisch beleidskader](https://logius-standaarden.github.io/logboek-dataverwerkingen_Juridisch-beleidskader/) opgesteld.

## Juridische Structuur iSHARE (Gerard van der Hoeven)

*Gerard van der Hoeven* geeft een [presentatie]({{< param baseDirectory >}}documents/20250422-juridische-structuur-iSHARE.pptx) over de juridische structuur van iSHARE. De essentie is Your Data Your Choice. Een framework waarbij data rechthebbenden bepalen wat er gebeurt met hun data en wanneer op gefedereerde en gedistribueerde wijze. 

- *Marc de Boer*: Welke overlap en verschillen zien we tussen de twee presentaties over het juridisch aspect?
  
  *Gerard van der Hoeven*: Er zit verschil in de aanvliegroute. Vanuit de overheid is het de vraag waar je rechten toe hebt. Vanuit de private sector gaat het om expliciet toegang geven. 

  *Wouter Diephuis*: De overlap is dat als je informatie verwerkt, of je dat nu privaat of publiek doet, het moet altijd een doel dienen. iSHARE is een gedetailleerde invulling daarvan. Je wilt niet teveel informatie vragen en daar ook je verantwoording over af kunnen leggen.


## Planning volgende werkgroepen

- *Michiel Trimpe*: We hebben een luxeprobleem. Er zijn veel verschillende perspectieven en er is veel animo om bij te dragen. Zullen we kleinere werkgroepen vormen om de diepte in te gaan op individuele onderwerpen? 

  *René Kint*: Ja; maar ik ben wel op zoek naar de leidende principes.

  *Gerard van der Hoeven*: Laten we in de expertgroepen de leidende principes ook naar boven laten komen.

  *Wouter Diephuis*: Laten we multidisciplinair samenwerken. Vanuit het juridisch kader aangeven wat mag. Vanuit beleidsmatig oogpunt kan je er ook naar kijken. Vanuit de techniek kan je aangeven wat kan. Vanuit die drieslag zal je werkbare leidende principes moeten distilleren.

  **Beslissing**: Tijdens de volgende sessie plannen we hoe we de diepte ingaan terwijl we zorgen dat leidende principes duidelijk blijven en/of worden.