---
title: 'BRP'
weight: 20
---

# BRP

## Horizontale dataminimalisatie

### Inschrijving
- 'Omschrijving reden opschorting bijhouding' ==|!= NULL 
- 'Omschrijving reden opschorting bijhouding' ==|!= {code}
- 'Omschrijving reden opschorting bijhouding' (NOT) IN {lijst}
- 'Datum opschorting bijhouding' ==|!= NULL
- 'Datum ingang blokkering PL' ==|!= NULL
- 'Indicatie geheim' ==|!= {code}

### Afnemersindicatie
- 'Afnemersindicatie' ==|!= {nummer}

### Verblijfsplaats
- 'Gemeente van inschrijving' ==|!= {nummer}
- 'Gemeente van inschrijving' (NOT) IN {lijst}
- 'Functie adres' ==|!= {code}
- 'Postcode' (NOT) IN {lijst}
- 'Postcode' ==|!= {regex}
- 'Datum vestiging IN Nederland' ==|!= NULL
- 'Datum vestiging IN Nederland' <|<=|==|>=|> {datum} 
- 'Regel 2 adres buitenland' ==|!= NULL
- 'Land adres buitenland' (NOT) IN {lijst}
- 'Land vanwaar ingeschreven' (NOT) IN {lijst}

### Persoon
- 'A-nummer' ==|!= NULL
- 'A-nummer' ==|!= {veld}
- 'A-nummer' == {parameter}
- 'Geslachtsaanduiding' (NOT) IN {lijst}
- 'Geslachtsaanduiding' ==|!= {code}
- 'Geboortedatum' -> 'leeftijd' <|<=|==|>=|> {tijdsinterval}
- 'Geboortdatum' ==|!= {veld}
- 'Geboortdatum' <|<=|==|>=|> {datum}
- 'Geboorteland' (NOT) IN {lijst}
- 'Burgerservicenummer' ==|!= NULL
- 'Burgerservicenummer' ==|!= {veld}
- 'Burgerservicenummer' ==|!= {parameter}

### Nationaliteit
- 'Nationaliteit' ==|!= {nummer}
- 'Nationaliteit' (NOT) IN {lijst}
- 'Aanduiding bijzonder Nederlanderschap' ==|!= {code}
- 'Beschrijving document' ==|!= {regex}

### Kind
- 'Ingangsdatum geldigheid' <|<=|==|>=|> {veld}

### Huwelijk/Geregistreerd partnerschap
- 'Ingangsdatum geldigheid' <|<=|==|>=|> {veld}

### Overlijden
- 'Datum overlijden' ==|!= NULL

### Tijdelijk verblijfsadres
- 'Gemeente van inschrijving' ==|!= {nummer}
- 'Einddatum geldigheid' ==|!= NULL
- 'Einddatum geldigheid' <|<=|==|>=|> {veld}

### Reisdocument
- 'Aanduiding inhouding dan wel vermissing Nederlands reisdocument' (NOT) IN {lijst}
- 'Soort Nederlands reisdocument' (NOT) IN {lijst}
- 'Datum einde geldigheid Nederlands reisdocument' <|<=|==|>=|> {veld}
- 'Datum einde geldigheid Nederlands reisdocument' <|<=|==|>=|> {parameter}

### Kiesrecht
- 'Aanduiding Europees kierecht' ==|!= {code}
- 'Datum verzoek of mededeling Europees kiesrecht' <|<=|==|>=|> {datum}

## Soorten vergelijkingen
- gelijk aan (==)
- ongelijk aan (!=)
- kleiner dan (<)
- kleiner of gelijk aan (<=)
- groter of gelijk aan (>=)
- groter dan (>)
- in lijst (IN)
- niet in lijst (NOT IN)

## Soorten waarden
- onbekend / niet gevuld (NULL)
- numeriek ({nummer})
- numerieke/alfanumerieke code ({code})
- specifieke datum ({datum})
- aantal jaren/maanden/dagen ({tijdsinterval})
- lijst van waarden ({lijst})
- regular expression ({regex})
- ander database-veld ({veld})
- parameter uit de request ({parameter})
