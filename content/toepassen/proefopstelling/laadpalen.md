---
Title: Use case laadpalen
type: 'chapter'
---
{{< chapter/section title="" >}}
# Use case: laadpalen
{{< /chapter/section >}}
{{< chapter/section title="Onderwerp" >}}
In deze use case gaan gemeenten bijhouden welke laadpalen er zijn en wie de vergunning daarvoor heeft.
Er mogen niet te veel laadpalen in een gebied zijn, voor de energievoorziening en de omgevingsregels.

{{< img-url "images/4.1laadpaal.png" "Proefopstelling zaaksysteem" >}}

Het zaaksysteem wordt daarvoor ingericht met een zaaktype 'laadpaalvergunning' en een registratie van laadpalen.
Voor zaaktype laadpaalvergunningen kunnen aanvragen worden toegevoegd, goedgekeurd of afgekeurd.
{{< /chapter/section >}}

{{< chapter/section title="Opstelling" >}}
{{< img-url "diagrams/usecase-opstelling.svg" "Proefopstelling zaaksysteem" >}}

De registratie van laadpalen is voor deze opstelling heel simpel gehouden: 
- er is alleen een lijst met laadpalen
- met de velden postcode, huisnummer en kenteken.
- er zit geen toegangscontrole op de service zelf: de medewerkersautorisatie wordt door het zaaksysteem gedaan, en de toegang tot de
registratie als service door de gateway.
  {{< /chapter/section >}}

{{< chapter/section title="Regels" >}}
- Zaaksysteem
    - Doelbinding is de registratie van laadpalen, waarvoor de gemeente een besluit heeft aangenomen.
    - De gemeente heeft ter dataminimalisatie vastgelegd dat voor laadpaalvergunningen een beperkte deelverzameling van persoons- en voertuiggegevens voldoende is:
        - Persoonsgegevens: BSN, NAW en meerderjarigheid
        - Voertuiggegevens: kenteken en uitstootklasse
    - Inzage in de vergunningen is toegestaan aan alle medewerkers van de afdeling burgerzaken
    - Voor het beheer van de vergunningen heeft de gemeente een opleiding gemaakt, en vereist voor aanpassingen aan de registratie dat het bijbehorende examen niet langer dan 1 jaar geleden met goed gevolg is afgelegd.

- BRP:
    - De gemeente heeft per besluit toestemming van RvIG om in de BRP gegevens op te zoeken.
    - Grondslag daarvoor is nummer 5, 'om een taak van algemeen belang uit te voeren'
    - De gemeente mag alleen ingezetenen van de eigen gemeente opzoeken
- RDW
    - De gemeente heeft per besluit toestemming van de RDW om voertuigen in de BRV op te zoeken.
    - Diplomatieke kentekens mogen niet opgezocht worden
{{< /chapter/section >}}
{{< chapter/section title="Scenario 1: vergunning aanvragen" >}}
- Een burger kan een laadpaalvergunning aanvragen. Daarvoor zijn naam, postcode en huisnummer nodig. Een medewerker maakt in het zaaksysteem een zaak met zaaktype 'Aanvragen laadpaal' aan met die gegevens.
- Het zaaksysteem zoekt in de BRP op postcode en huisnummer, en vindt de BSN(s).
- Vervolgens zoekt het systeem de gevonden BSNs op in de BRV de voertuigen die op de persoon geregistreerd staan.
- Als daar minstens 1 elektrisch voertuig bij zit, en de persoon heeft nog geen laadpaal op dat adres, dan wordt de vergunning toegekend, en een laadpaal toegevoegd.

Anders wordt de vergunning afgewezen met een passende melding.

### Testdata

#### Gebruikers zaaksysteem

| Gebruiker | Afdeling     | Laadpaalopleiding | Gemeente |
|-----------|--------------|-------------------|----------|
| Rick      | Secretariaat |                   | 001      |
| Morty     | Burgerzaken  |                   | 001      |
| Beth      | Burgerzaken  | 01-01-2024        | 001      |
| Jerry     | Burgerzaken  | 01-01-2025        | 001      |

#### Laadpalen

| Kenteken | Postcode | Huisnummer  |
|----------|----------|-------------|
|          |          |             |

#### BRP

| BSN | Postcode | Huisnummer | Gemeente van Inschrijving |
|-----|----------|------------|---------------------------|
| 100 | 1000 AA  | 1          | 001                       |
| 200 | 1000 AA  | 1          | 001                       |
| 300 | 1000 AA  | 2          | 001                       |
| 400 | 1000 AA  | 3          | 001                       |
| 500 | 1000 AA  | 5          | 001                       |
| 600 | 2000 AA  | 1          | 002                       |

#### BRV

| Kenteken  | BSN | Uitstootklasse | Diplomatiek kenteken |
|-----------|-----|----------------|----------------------|
| 12-12-12  | 200 | E              | Nee                  |
| 34-34-34  | 300 | B              | Nee                  |
| 56-56-56- | 500 | E              | Ja                   |
|           |     |                |                      |

### Testgevallen

| Gebruiker | Postcode | Huisnummer | Resultaat                                  |
|-----------|----------|------------|--------------------------------------------|
| Rick      | 1000 AA  | 1          | Rick niet geautoriseerd vanwege afdeling   |
| Morty     | 1000 AA  | 1          | Morty niet geautoriseerd vanwege opleiding |
| Beth      | 1000 AA  | 1          | Beth niet geautoriseerd vanwege opleiding  |
| Jerry     | 1000 AA  | 1          | Toegekend                                  |
| Jerry     | 1000 AA  | 2          | Niet toegekend vanwege uitstootklasse      |
| Jerry     | 1000 AA  | 3          | Geen voertuig gevonden                     |
| Jerry     | 1000 AA  | 4          | Geen ingezetene gevonden                   |
| Jerry     | 1000 AA  | 5          | Geen toestemming om voertuig in te zien    |
| Jerry     | 2000 AA  | 1          | Niet ingezetene van eigen gemeente         |
{{< /chapter/section >}}