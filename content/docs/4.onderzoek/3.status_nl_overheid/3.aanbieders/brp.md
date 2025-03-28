---
title: 'BRP'
---

# Basis Registratie Personen (RvIG)

## Contact
Cathy Dingemanse

## Links
- https://publicaties.rvig.nl/Besluiten_en_modelautorisaties/Besluiten/BRP_besluiten
- https://www.rvig.nl/lo-brp
- https://www.rvig.nl/landelijke-tabellen-en-besluiten
- https://publicaties.rvig.nl/Landelijke_tabellen
- https://publicaties.rvig.nl/Landelijke_tabellen/Landelijke_tabellen_32_t_m_61_excl_tabel_35/Landelijke_Tabellen_32_t_m_61_in_csv_formaat
- https://publicaties.rvig.nl/Landelijke_tabellen/Zoekpagina_tabel_35_autorisatietabel
- https://www.rvig.nl/w172-lo-brp-toelichting-apis-fase-ii-informatievragen
- https://brp-api.github.io/Haal-Centraal-BRP-bevragen/
- https://brp-api.github.io/Haal-Centraal-BRP-bevragen/v2/redoc

## Observaties
- tabellen in de BRP dataset hebben unieke 2-cijferige numerieke codes toegekend. Bv. tabel 34 = landen, 35 = autorisatieregels.
- kolommen in een tabel hebben een unieke code, bestaande uit twee 2-cijferige numerieke waarden, gekoppeld aan de tabelcode. Bv. 34.94.12 = landen tabel / ISO3166 alpha2 code.

## Publiekelijk beschikbare tabellen
- 32 nationaliteiten
- 33 gemeenten
- 34 landen
- **35 autorisatieregels**
- 36 voorvoegsels
- 37 redenen opnemen/beëindigen nationaliteit
- 38 adellijke titels
- 39 akteaanduidingen
- 41 redenen ontbinden/nietigverklaren huwelijk/partnerschap
- 48 nederlandse reisdocumenten
- 49 autoriteiten afgifte nederlandse reisdocumenten
- 56 verblijfstitels
- 59 GBA deelnemers
- 60 RNI deelnemers
- 61 gezagsverhoudingen

## Nieuw BRP model
- incompleet project; lijkt een volledig nieuwe implementatie voor de BRP te zijn
- documentatie stamt (voor een groot deel) uit 2017
- zeer uitgebreid autorisatie model gebaseerd op organisaties, rollen, personen, regels, regel groeperingen, leveringscondities, etc.
- er is alleen een aantal beschrijvende documenten beschikbaar gesteld, dus niet geschikt om use-cases uit samen te stellen
- autorisatie model zou de basis kunnen vormen voor een federatieve verzameling van toegangsregels, maar dient mogelijk wel verder uitgebreid te worden

# TMV

## Links
- Logisch Ontwerp BRP 2024 - 6.3 (PDF)

## Fragmenten
- TMV2.0 is een applicatie die beheerd wordt door RvIG. Met die applicatie beheert RvIG de (gegevens over) terugmeldingen. Afnemers (de terugmelders) moeten terugmeldingen doen aan Digimelding. Digimelding stuurt de meldingen betreffende de BRP door aan TMV2.0. In TMV2.0 kunnen gemeenten en RNI (de bijhouders) die terugmeldingen bekijken, afhandelen en de resultaten daarvan bijwerken. Terugmelders moeten via Digimelding de status van de terugmelding ophalen uit TMV2.0.
- Op de website van Logius (http://www.logius.nl/diensten/digimelding) is de Digimeldingkoppelvlak-standaard beschreven [20].
- Gemeenten en RNI (de bijhouders) kunnen voor het benaderen van TMV 2.0 gebruik maken van de van toepassing zijnde TMV 2.0-webservice zoals beschreven in de Handleiding Aansluiten TMV 2.0 of van het TMV 2.0-portaal. De handleiding wordt gepubliceerd op de website van RvIG.
