---
bookCollapseSection: false
weight: 10
Title: 20-11-'24 Gegevensminimalisatie
---

# Werkgroep Gegevensminimalisatie (20 november 2024)

## Aanwezigen
- Marc van Andel
- Marc de Boer
- Joost Farla
- Pim Gaemers
- Eelco Hotting
- Gerard Juijn
- Eduard Renger
- Michiel Trimpe

## Agenda
- Introductie
- Benaming
- Vragen en domein
- Vervolg proces

## Introductie

Het kader van het project en de ontwikkelen standaard werd geïntroduceerd door Marc de Boer.

## Vragen en domein

### Vragen

Ter introductie legde Michiel Trimpe de volgende vragen neer om het domein van de vraag duidelijk te maken:

- Mogen verzoeken aangepast worden vanuit een policy?
    - Mogen request query en body aangepast worden?
    - Mogen request headers aangepast worden? En toegevoegd?  En verwijderen?
    - Mogen redirects naar toegestane verzoeken gegeven worden?
    - Mogen alternatieve toegestane verzoeken gesuggereerd worden?
- Mogen antwoorden aangepast worden vanuit een policy?
    - Mag het response body aangepast worden? 
    - Mogen response headers aangepast worden? En toegevoegd?
- Mogen policies beslissingen nemen op basis van antwoorden?
    - Mogen policies response bodies parsen om daar informatie uit te gebruiken?
    - Mogen policies informatie uit response headers gebruiken?
- Mogen partial evaluation & residual policies / claims & obligations toegevoegd worden?
    - Worden deze in downstream request header toegevoegd?
    - Mag downstream response dan een ACK daarvoor retourneren?

### Antwoorden

In de discussie zijn de volgende antwoorden gegeven.

- Mogen verzoeken aangepast worden vanuit een policy?
  - **Marc van Andel**: Ja
  - **Eduard Renger, Pim Gaemers, Joost Farla**: Nee
- Mogen request query en body aangepast worden?
  - **Pim Gaemers**: Dit heeft als nadeel dat de afnemers op de 'onjuiste' manier verzoeken blijven doen. Het is ook minder transparant wat voor antwoord er gegeven worden.
  - **Eelco Hotting**: In verschillende toepassingen kunnen verschillende keuzes gemaakt worden. In een open vraag zoals in Lock/Unlock is het wel logisch (exploratief en browsend verkennen) \[Dit betrof het automatisch aanpassen van verzoeken om zoveel mogelijk beschikbare gegevens te bevragen\]. Voor rigide transactionele processen is het wel logisch. Daar zou de standaard zich ook op moeten richten.
    Verantwoording is ook belangrijk aspect aangezien dat moeilijker wordt wanneer aanpassingen mogelijk zijn?
  - **Gerard Juijn**: Dit maakt het voor afnemende applicaties erg moeilijk om steeds aangepast te moeten worden om de 'juiste' verzoeken te versturen. 
  - **Joost Farla, Marc van Andel, Eelco Hotting, Pim Gaemers**: Je wil niet dat een endpoint zoals 'mijn-zaken' naar verplicht omgezet moet worden naar een endpoint als 'zaken?assigned=GebruikerX'.
  - **Michiel Trimpe**: Er kan ook op basis van redirects van de ene naar de andere endpoint verwezen worden.
- Mogen request headers aangepast worden? 
  - **Marc van Andel**: In principe niet.
  - **Michiel Trimpe**: Logboek Dataverwerkingen vereist dat bijvoorbeeld om je eigen id aan een trace toe te voegen.
  - **Allen**: Dit moet verder gedetailleerd worden.
- Mogen request headers toegevoegd worden?
  - **Allen**: Ja. 
- Mogen request headers verwijderd worden?
  - **Marc van Andel**: Je wil soms authenticatie tokens niet doorgeven aan achterliggende systemen.
  - **Allen**: Ja
- Mag het response body aangepast worden? 
  - **Allen**: Nee

## Benaming

De benaming van het onderwerp als "gegevensminimalisatie" werd door o.a. Edward van Gelderen als problematisch ervaren aangezien dit ongewenst breed geïnterpreteerd kon worden.

In de werkgroep is benoemd dat gegevensminimalisatie eerder een use-case is of een symptoom van een onderliggend probleem. Toegangsverlening betreft uiteindelijk gewoon de beslissing of een verzoek mag of niet. (**Marc van Andel**, **Eelco Hotting**)
De zorgen m.b.t. het precies opvragen van gewenste velden (**Gerard Juijn**) gaat vooral over het ondersteunen van clients bij het bepalen van toegestane verzoeken gegeven mogelijk complex autorisatiebeleid. Dit is vergelijkbaar met een frontend applicatie die autorisatie logica moet dupliceren om de gebruiker geen functionaliteit aan te bieden die de backend niet toe zal staan. (**Michiel Trimpe**.)

Er is besloten gegevensminimalisatie als term uit de standaard te verwijderen.

## Vervolg proces

Er is besloten om de volgende werkgroep te richten op het thema "Verantwoording". Michiel Trimpe zal met Eelco Hotting de kadering van dit onderwerp voorbereiden om de volgende werkgroep additionele sturing te geven.

## Nabespreking

**Gerard Juijn** droeg het alternatief van een "Slimme PEP" aan die wel requests mag herschrijven. Dit werd door o.a. **Eelco Hotting** gezien als een component van de applicatie gezien. **Michiel Trimpe** benoemde dat dit in combinatie met een Search API ook gezien kan worden als een proxy die de 2 stappen (zoek het correcte verzoek op en voer het uit) in één actie uitvoert. Dat kan dus als een wrapper om om bestaande applicaties gezien worden indien die niet aangepast kunnen worden.  
