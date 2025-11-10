---
Title: Demonstratie
type: 'chapter'
---

{{< chapter/header title="Toepassen" bg="brown">}}

<div class="sub-navigation-wrapper">
    <div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
       <p>
          <a href="../implementatie">Implementatie</a> 
       </p>
    </div>
    <div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
       <p>
          <a href="../openftv">OpenFTV</a>
       </p>
    </div>
    <div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-donkerbruin-50">
       <p>
          <a href="../proefopstelling">Proefopstelling</a> 
       </p>
    </div>
    <div class="utrecht-paragraph pt-1 sub-navigation-tab  sub-navigation-tab-selected">
       <p>
          <a href="">Demonstratie</a>
       </p>
    </div>
</div>

{{< /chapter/header >}}

{{< chapter/section title="Demonstratie" >}}

{{< /chapter/section >}}

{{< chapter/section title="Onderwerp" level="3">}}
In deze use case ziet de gemeente Vlierdam dat er veel laadpalen bijkomen, en maakt zich zorgen over de capaciteit van het elektriciteitsnet en de impact op de omgeving.
Daarom wordt er een vergunning vereist voor het plaatsen. Burgers kunnen een vergunning aanvragen. 

{{< img-url "images/4.1laadpaal.png" "Proefopstelling zaaksysteem" >}}

Het zaaksysteem wordt daarvoor ingericht met een zaaktype 'laadpaalvergunning' en een registratie van vergunningen.
De enige handeling op het zaaktype is vooralsnog 'aanvragen', en de vergunning kan worden toegekend of afgewezen.

{{< /chapter/section >}}

{{< chapter/section title="Opstelling" level="3"  >}}

De basis is de [proefopstelling](../proefopstelling). Daar voegen we een registratie aan toe, namelijk die van laadpalen. Daarvoor wordt een database gebruikt met een bijpassende service waarmee laadpalen kunnen worden toegevoegd.

{{< img-url "diagrams/usecase-opstelling.svg" "Proefopstelling zaaksysteem" >}}

De gegevens die we bijhouden zijn voor deze opstelling heel simpel gehouden:
- Een lijst met vergunningen
- Van elke vergunning de postcode, het huisnummer en het kenteken.
- De service heeft maar een ingang: met de bovengenoemde 3 gegevens een vergunning toevoegen. Controle op geldige postcodes, huisnummers en kentekens doen we niet. Dat er maar 1 vergunning per adres mag bestaan zijn controleert het zaaksysteem.
- Er zit geen toegangscontrole op de service zelf: de medewerkersautorisatie wordt door het zaaksysteem gedaan, en de toegang tot de
  registratie als service door de gateway.

{{< /chapter/section >}}

{{< chapter/section title="Regels" level="3">}}

- Zaaksysteem
    - Doelbinding is de registratie van vergunningen, waarvoor de gemeente een besluit heeft aangenomen.
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

{{< chapter/section title="Scenarios" level="3">}}

{{< /chapter/section >}}

{{< chapter/section title="Scenario 1: vergunning aanvragen (handhaving)" level="4">}}

- Een burger kan een laadpaalvergunning aanvragen. Daarvoor zijn postcode en huisnummer (met eventueel huisnummertoevoeging) nodig. Een medewerker maakt in het zaaksysteem een zaak met zaaktype 'Aanvragen laadpaal' aan met die gegevens.
- Het zaaksysteem zoekt in de BRP op postcode en huisnummer, en vindt een of meerdere BSNs.
- Vervolgens zoekt het systeem met de gevonden BSNs in de BRV naar de voertuigen die op die personen geregistreerd staan.
- Als daar minstens 1 elektrisch voertuig bij zit, en de persoon heeft nog geen vergunning op dat adres, dan wordt de vergunning toegekend en aan de registratie toegevoegd.

Anders wordt de vergunning afgewezen met een passende melding.

##### Testgevallen

| Nr | Gebruiker | Postcode | Huisnummer | Resultaat                                          |
|:---|-----------|----------|------------|----------------------------------------------------|
| 1  | Rick      | 1111AA   | 1          | Rick niet geautoriseerd vanwege afdeling           |
| 2  | Morty     | 1111AA   | 1          | Morty niet geautoriseerd vanwege opleiding         |
| 3  | Beth      | 1111AA   | 1          | Beth niet geautoriseerd vanwege verlopen opleiding |
| 4  | Jerry     | 1111FF   | 11         | Geen ingezetene gevonden                           |
| 5  | Jerry     | 2222JJ   | 101        | Geen ingezetene gevonden (andere gemeente)         |
| 6  | Jerry     | 1111DD   | 4          | Geen voertuig gevonden                             |
| 7  | Jerry     | 1111CC   | 3          | Niet toegekend vanwege uitstootklasse              |
| 8  | Jerry     | 1111EE   | 5          | Geen toestemming om voertuig in te zien            |
| 9  | Jerry     | 1111AA   | 1          | Reeds laadpaal aanwezig                            |
| 10 | Jerry     | 1111BB   | 2          | Toegekend                                          |

Stappenplan demo:

- Open twee tabbladen:

  1. De laadpalenapplicatie van gemeente Vlierdam
  2. De OpenFTV manager interface van gemeente Vlierdam
  
- Testcase 1: 
  - in de laadpalenapplicatie:
    - selecteer gebruiker Rick
    - ga naar het scherm 'aanvragen vergunning'
    - voer de postcode en het huisnummer in
    - controleer dat een melding komt: gebruiker rick werkt niet op de afdeling burgerzaken
  - in de OpenFTV manager: 
    - selecteer gebruiker Rick
    - ga naar de audit log
    - controleer dat er een regel is bijgekomen met de tijd van zojuist, als afwijzing, en met dezelfde publieke melding
    - controleer ook dat er een niet-publieke melding is waarbij het nummer van de policy staat die de aanvraag heeft afgewezen
- Testcase 2: 
  - Kies in de laadpalenapplicatie gebruik Morty en herhaal de aanvraag
  - Melding dat Morty geen opleiding heeft
- Testcase 3:
  - Herhaal als Beth, en de melding zegt dat haar opleiding verlopen is.
- Testcase 4:
  - in de laadpalenapplicatie:
    - Selecteer Jerry en voer de aanvraag in. De aanvraag wordt geaccepteerd.
    - Ga naar het scherm 'beoordelen aanvraag'
    - Druk op 'Controle BRP'
    - Melding dat de persoon niet gevonden is
  - in de OpenFTV manager
    - controleer dat er een regel is bijgekomen dat de toegang tot de BRP verleend is
- Testcase 5:
  - In de laadpalenapplicatie:
    - Voer een nieuwe aanvraag in met het andere adres
    - Controleer BRP
    - Melding dat het adres niet in de gemeente ligt
  - In de OpenFTV manager:
    - Controleer dat er een regel is bijgekomen dat de toegang tot de BRP verleend is
    - En een regel dat het BRP-antwoord niet doorgegeven wordt omdat het adres niet in de gemeente is
- Testcase 6:
  - In de laadpalenapplicatie:
    - Voer de aanvraag in en controleer BRP. Dat gaat goed.
    - Controleer BRV, en er is een melding dat er geen voertuig gevonden is
  - In de OpenFTV manager:
    - Controleer dat er een regel is bijgekomen dat de toegang tot de BRV verleend is.
- Testcase 7:
  - In de laadpalenapplicatie:
    - Voer de aanvraag, controleer BRP.
    - Controleer BRV, en er is een melding dat er geen voertuig is met de juiste uitstootklasse
- Testcase 8:
  - In de laadpalenapplicatie:
    - Voer de aanvraag in en controleer BRP.
    - Controleer BRV, en er is een melding dat het voertuig afgeschermd is.
  - In de OpenFTV manager:
    - Controleer dat er een regel is bijgekomen dat de toegang tot de BRV verleend is.
    - En een regel dat het BRV-antwoord niet doorgegeven wordt vanwege het diplomatieke kenteken
- Testcase 9:
  - De aanvraag wordt direct afgewezen omdat er al een vergunning is op dat adres
- Testcase 10:
  - De aanvraag lukt en kan worden goedgekeurd


{{< /chapter/section >}}

{{< chapter/section title="Scenario 2: diplomatieke kentekens toelaten (beheer)" level="4" >}}

In de gemeente zijn een aantal diplomatieke voertuigen gekomen, en het is niet meer houdbaar dat daar geen laadpaal op aangevraagd kan worden. Tegelijk wil de gemeente de identiteit van de diplomaten blijven beschermen.

Daarom wordt besloten dat vergunningen voor diplomatieke voertuigen alleen door de gemeentesecretaris ingevoerd mogen worden. De concrete regel is
- Diplomatieke kentekens mogen alleen opgezocht worden als de afdeling van de gebruiker 'Gemeentesecretaris' zijn.

Het scenario is dat in het beheersysteem de regel wordt veranderd en de wijziging actief wordt gemaakt. Dit zijn de concrete stappen:

**Beheer**

- Gebruiker meldt zich aan op de OpenFTV beheersinterface
- Zoek de BRV regel die gaat over diplomatieke kentekens
- Verwijder de regel
- Maak een nieuwe gemeenteregel conform bovenstaande tekst
- Publiceer beide regels:
    - Eerste keer met ingangsdatum in de toekomst, dan lukt het nog steeds niet
    - Tweede keer met ingangsdatum vandaag, dan lukt het de gemeentesecretaris wel
- Zet de testdata terug, draai de regel terug, dan lukt het niet meer

**Handhaving**

- Vraag vergunning aan; zie testgevallen onder.

##### Testgevallen

**Beheer**

| Gebruiker | Ingangsdatum | Resultaat                                    |
|-----------|--------------|----------------------------------------------|
| Morty     |              | Morty mag geen regels aanpassen              |
| Rick      | vorige week  | Ingangsdatum mag niet in het verleden liggen |
| Rick      | vandaag      | Lukt                                         |

**Handhaving**

| Gebruiker | Postcode | Huisnummer | Resultaat                                   |
|-----------|----------|------------|---------------------------------------------|
| Jerry     | 1111EE   | 5          | Niet toegekend vanwege diplomatiek kenteken |
| Diane     | 1111EE   | 5          | Lukt                                        |

{{< /chapter/section >}}

{{< chapter/section title="Scenario 3: Audit" level="4">}}

Deze scenario's beschrijven taken die een auditor zou kunnen uitvoeren, zowel als reactie op een gebeurtenis als in de vorm van  routinecontrole.

**3a. Onderzoek naar een specifiek geval**

_Achtergrond_

Een burger heeft bij de gemeente gevraagd naar alle verwerkingen die er gedaan zijn op zijn gegevens. Daarbij zit een raadplegen van het BRV, maar de burger heeft geen auto en geen vergunning aangevraagd. Hoe kan dat?

_Scenario_

De auditor zoekt in de audit log op het betreffende tijdstempel en het beslispunt BRV. Op die manier vindt hij de naam van de medewerker die de aanvraag gedaan heeft en de regeling. Zo kan navraag gedaan worden bij de medewerker.

**3b. Verloop van afwijzingen over de tijd**

_Achtergrond_

In normaal gebruik zijn er geen afwijzingen. Een medewerker zou niet moeten proberen een vergunning aan te vragen terwijl hij daar niet toe bevoegd is, en het zaaksysteem zou ook niet moeten aanbieden wat niet mag. Daarom kan het zinvol zijn om periodiek alle afwijzingen na te lopen, en te bekijken hoe die ontstaan. Ook kunnen de aantallen afwijzingen per periode vergeleken worden om te zien of er significante veranderingen zijn.

_Scenario_

Auditor filtert de audit log op afwijzingen en de periode die hij wil onderzoeken, en exporteert de data naar Excelformaat.

**3c. Het lukt een medewerker niet om een aanvraag in te dienen.**

_Achtergrond_

Een nieuwe medewerker is toegevoegd als gebruiker maar het lukt niet om een laadpaalvergunning aan te vragen. De beheerder wil weten waarom.

_Scenario_

De beheerder filtert de audit log op de naam van de medewerker, en kiest een afwijzing op regeling Laadpalen. Op het detailscherm ziet hij het id en de titel van de regel die leidde tot de afwijzing.

{{< /chapter/section >}}

{{< chapter/section title="Testdata" level="4">}}

#### Gebruikers zaaksysteem

| Gebruiker | Afdeling           | Laadpaalopleiding | Gemeente |
|-----------|--------------------|-------------------|----------|
| Rick      | Beheerder          |                   | 001      |
| Morty     | Burgerzaken        |                   | 001      |
| Beth      | Burgerzaken        | 01-01-2024        | 001      |
| Jerry     | Burgerzaken        | 01-01-2025        | 001      |
| Diane     | Gemeentesecretaris | 01-06-2025        | 001      |

#### Laadpalen

| Postcode | Huisnummer |
|----------|------------|
| 1111AA   | 1          |

#### BRP

| BSN       | Postcode | Huisnummer | Gemeente van Inschrijving |
|-----------|----------|------------|---------------------------|
| 999990251 | 1111AA   | 1          | 001                       |
| 999990263 | 1111BB   | 2          | 001                       |
| 999990275 | 1111CC   | 3          | 001                       |
| 999990287 | 1111DD   | 4          | 001                       |
| 999990299 | 1111EE   | 5          | 001                       |
| 999990305 | 1111FF   | 6          | 001                       |
| 999990317 | 1111GG   | 7          | 001                       |
| 999990329 | 1111HH   | 8          | 001                       |
| 999990330 | 1111II   | 9          | 001                       |
| 999990342 | 2222JJ   | 101        | 002                       |

#### BRV

| Kenteken | BSN       | Uitstootklasse | Diplomatiek kenteken |
|----------|-----------|----------------|----------------------|
| 12-12-12 | 999990263 | E              | Nee                  |
| 34-34-34 | 999990275 | B              | Nee                  |
| 56-56-56 | 999990299 | E              | Ja                   |


{{< /chapter/section >}}