---
title: 'Overzicht'
weight: 990
---

# Overzicht

Verzameling van mogelijke use-cases.

---------------------------------

## Identificatie


### Natuurlijk persoon
Mag een burger een bepaalde resource benaderen.

#### Attributen
- identity (DigiD of JWT met BSN) (*request*)
- burger-ID (BSN) (*request*)
- actie (CRUD) (*request*)
- resource-id (*request*)
- lijst toegestane combinaties (*PIP*)

#### Condities
- dient door afnemer gecontroleerd te worden.
- policy keurt af als het BSN in DigiD/JWT niet overeenkomt met het BSN in de zoekopdracht.


### Niet-natuurlijk persoon
Mag een medewerker van een niet-natuurlijk persoon een bepaalde resource benaderen.

#### Attributen
- identity (eHerkenning KvK-nr) (*request*)
- KvK-nr (*request*)
- actie (CRUD) (*request*)
- resource-id (*request*)
- lijst toegestane combinaties (*PIP*)

#### Condities
- dient door afnemer gecontroleerd te worden.
- policy keurt af als KvK-nr in eHerkenning niet overeenkomt met het KvK-nr in de zoekopdracht.


### Medewerker
Mag een medewerker een bepaalde resource benaderen.

#### Attributen
- identity (JWT-claim/-scope) (*request*)
- actie (CRUD) (*request*)
- resource-id (*request*)
- lijst toegestane combinaties (*PIP*)

#### Condities
- kan door afnemer gecontroleerd worden (*wenselijk*).
- kan door aanbieder gecontroleerd worden als er een standaardisering is van de JWT-claims/-scopes (*niet wenselijk*).


### Geautomatiseerd proces
Mag een geautomatiseerd proces een bepaalde resource benaderen.

#### Attributen
- identity (apikey?) (*request*)
- actie (CRUD) (*request*)
- resource-id (*request*)
- lijst toegestane combinaties (*PIP*)

#### Condities
- kan door afnemer gecontroleerd worden (*wenselijk*).
- kan door aanbieder gecontroleerd worden als aanbieder de apikey uitgeeft en beheerd (*niet wenselijk*).

---------------------------------

## Doelbinding


### Resource bescherming
Het afschermen van resources welke niet benodigd zijn om een specifieke taak uit te voeren.

#### Attributen
- zaaktype (*request*)
- taak (*request*)
- resource-id (API) (*request*)
- lijst toegestane combinaties (*PIP*)

#### Condities
- kan door afnemer gecontroleerd worden (*wenselijk*).
- kan door aanbieder gecontroleerd worden als er een standaardisering is van zaaktypes en taken (*niet wenselijk*).

---------------------------------

## Context


### Werktijd
Een gebruiker mag alleen tijdens werktijd dataverwerkingen uitvoeren.

#### Attributen
- tijdstip van dataverwerking (*klok*)
- vaste lijst van werktijden (*PIP*)
- niet tijdens feestdagen (?) (*PIP*)
- niet tijdens vrije uren/vakantie (?) (*PIP*)

#### Condities
- kan alleen door afnemer gecontroleerd worden.
- voor feestdagen is een jaarlijks veranderende lijst nodig (open API beschikbaar?).
- voor vrije uren/vakantie is koppeling met HR-systeem nodig.

#### Bijzonderheden
- Rekening houden met tijdzone (bv. voor overzeese organisaties; Caribisch Nederland)


### IP adres
Een gebruiker mag alleen vanaf een toegestaan IP-adres dataverwerkingen uitvoeren.

#### Attributen
- IP-adres gebruiker (*request*)
- vergelijking (in lijst) (*policy*)
- vaste lijst van toegestane IP-adressen (*PIP*)

#### Condities
- kan alleen door afnemer gecontroleerd worden.


### Browser, OS, (soort) apparaat, versie
Vergelijkbaar met IP-adres.

---------------------------------

## Horizontale dataminimalisatie


### Gemeentegrens
Woont een persoon (of personen) binnen de gemeente.

#### Attributen
- zoekcriteria (*request*)
  - persoon-id (BSN), en/of
  - postcode, en/of
  - (deel van) adresgegevens, en/of
  - (deel van) naamgegevens
- binnen gemeente (*PIP*)
  - postcode prefix, en/of
  - postcodereeks, en/of
  - reguliere expressie postcode

#### Condities
- alleen aanbieder kan dit afdwingen (bv. nu BRP via tabel 35).


### Leeftijd
Organisatie mag alleen jongeren opvragen.

#### Attributen
- zoekcriteria (*request*)
  - persoon-id (BSN), en/of
  - postcode, en/of
  - (deel van) adresgegevens, en/of
  - (deel van) naamgegevens
- minimum & maximum leeftijd (bv. x > 24 maanden && x < 18 jaar) (*PIP*)
- vergelijking (<, <=, ==, !=, >=, >) (*policy*)
- leeftijd (*geboortedatum uit db*)

#### Condities
- alleen aanbieder kan dit afdwingen (bv. nu BRP via tabel 35).


### Speciale condities
Alleen personen waar specifieke kenmerken een bepaalde waarde hebben of niet hebben.

Zie ook [BRP-tabel 35](../brp).

#### Attributen
- zoekcriteria (*request*)
  - persoon-id (BSN), en/of
  - postcode, en/of
  - (deel van) adresgegevens, en/of
  - (deel van) naamgegevens
- kenmerk (*policy*)
- vergelijking (<, <=, ==, !=, >=, >, in lijst, niet in lijst, reguliere expressie) (*policy*)
- waarde of lijst van waarden (*PIP*)

#### Condities
- alleen aanbieder kan dit afdwingen (bv. nu BRP via tabel 35).

---------------------------------

## Verticale dataminimalisatie


### Beperken geleverde data
Alleen data die voor het doel benodigd is, mag geleverd worden.

#### Attributen
- zaaktype & taak (*request*)
- actie (CRUD) (*request*)
- resource-id (specifieke API) (*request*)

#### Condities
- aanbieder dient een API ter beschikking te stellen om dit te kunnen.
- afnemer dient de juiste API aan te roepen.
- policy keurt af als de verkeerde API wordt aangeroepen.


### Leeftijdsgrens
Is iemand jonger of ouder dan een vast bepaalde leeftijd.

#### Attributen
- persoon-id (BSN) (*request*)
- resource-id (specifieke API) (*request*)
- vergelijking (<, <=, ==, !=, >=, >) (*policy*)
- leeftijdsgrens (*PIP*)
- leeftijd (*geboortedatum uit db*)

#### Condities
- aanbieder dient een API ter beschikking te stellen om dit te kunnen.
- afnemer dient de juiste API aan te roepen.
- policy keurt af als de verkeerde API wordt aangeroepen.


### Inkomensgrens
Heeft iemand een inkomen boven of onder een vast bepaalde grenswaarde.

#### Attributen
- persoon-id (BSN) (*request*)
- resource-id (specifieke API) (*request*)
- vergelijking (<, <=, ==, !=, >=, >) (*policy*)
- inkomensgrens (*PIP*)
- inkomen (*db*)

#### Condities
- aanbieder dient een specifieke API ter beschikking te stellen om dit te kunnen.
- afnemer dient de juiste API aan te roepen.
- policy keurt af als de verkeerde API wordt aangeroepen.

---------------------------------

## Richting beperken


### Eigenaar van woning
Voor een kapvergunning mag wel de eigenaar van de betreffende woning gecontroleerd worden, maar niet andere woningen van de eigenaar.

#### Attributen
- zaaktype (*request*)
- taak (*request*)
- adres (*request*)

#### Condities
- aanbieder dient een specifieke API ter beschikking te stellen om dit te kunnen.
- afnemer dient de juiste API aan te roepen.
- policy keurt af als de verkeerde API wordt aangeroepen, of adres dan wel eigenaar-id ontbreken in request.

**of**

- policy keurt af als adres ontbreekt in request; n.b. er mag niet op naam gezocht worden.


### Eigenaar van voertuig
Voor het controleren van rijbevoegdheid mag wel de eigenaar van het betreffende voertuig gecontroleerd worden, maar niet andere voertuigen van de eigenaar.

#### Attributen
- zaaktype (*request*)
- taak (*request*)
- voertuigkenteken (*request*)
- eigenaar-id (BSN) (*request*)
- resource-id (specifieke API) (*request*)

#### Condities
- aanbieder dient een specifieke API ter beschikking te stellen om dit te kunnen.
- afnemer dient de juiste API aan te roepen.
- policy keurt af als de verkeerde API wordt aangeroepen, of voertuigkenteken dan wel eigenaar-id ontbreken in request.

**of**

- policy keurt af als voertuigkenteken ontbreekt in request; n.b. er mag niet op naam gezocht worden.

---------------------------------

## Misbruik


### Opvragen gegevens van bekende Nederlander(s)
Een gebruiker mag niet willekeurig gegevens opvragen, bv. om adressen van BN'ers door te verkopen.

Dit is ook een vorm van [resource bescherming](#resource-bescherming).


### Herhalen specifieke toets
Een gebruiker mag niet, herhaaldelijk, in oplopende stappen, het inkomen (van dezelfde BSN) toetsen aan een ondergrens.
Op den duur zal de bevraging een inschatting geven tussen welke grenzen het inkomen ligt.

#### Attributen
- identity (DigiD of JWT met BSN) (*request*)
- burger-ID (BSN) (*request*)
- actie (CRUD) (*request*)
- resource-id (*request*)
- lijst gevoelige combinaties van burger-id/actie/resource-id (*PIP*)
- teller van gelijksoortige bevragingen (*PIP*)
- maximum aantal gelijksoortige bevragingen van een gelijke combinatie (*PIP*)

#### Condities
- ergens zal per identity en per gevoelige combinatie een teller bijgehouden moeten worden (stateful)
