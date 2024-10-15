---
title: 'Overzicht'
weight: 990
---

# Overzicht

Verzameling van mogelijke use-cases.

---------------------------------

## Identificatie


### Gebruiker
Mag een gebruiker deze actie uitvoeren.

#### Attributen
- identity (JWT-claim/-scope) (*request*)
- actie (CRUD) (*request*)
- resource-id (*request*)
- lijst toegestane combinaties (*PIP*)

#### Condities
- kan door afnemer gecontroleerd worden (*wenselijk*).
- kan door aanbieder gecontroleerd worden als er een standaardisering is van de JWT-claims/-scopes (*niet wenselijk*).


### Proces
Mag een geautomatiseerd proces deze actie uitvoeren.

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


### **TODO**

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

### Bijzonderheden
- Rekening houden met tijdzone (bv. voor overzeese organisaties; Caribisch Nederland)


### IP adres
Een gebruiker mag alleen vanaf een toegestaan IP-adres dataverwerkingen uitvoeren.

#### Attributen
- IP-adres gebruiker (*request*)
- vergelijking (in lijst) (*policy*)
- vaste lijst van toegestane IP-adressen (*PIP*)

#### Condities
- kan alleen door afnemer gecontroleerd worden.


### Browser, OS, versie
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
- aanbieder dient een API ter beschikking te stellen om dit te kunnen.
- afnemer dient de juiste API aan te roepen.
- policy keurt af als de verkeerde API wordt aangeroepen.
