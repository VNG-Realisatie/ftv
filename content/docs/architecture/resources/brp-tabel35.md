---
weight: 10
type: 'docs'
title: 'RvIG / BRP - tabel 35'
---

# Tabel 35 - voorwaarden uitvergroot

GGD Gooi en Vechtstreek (JGZ/overig):5 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0376 || 0402 || 0406 || 0417 || 1696 || 1942 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Gooi en Vechtstreek (JGZ/overig):5 - selectie
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0457

Gemeente Sint-Michielsgestel/Algemene gemeentetaken:10 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0845 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Zorgverzekeraar Eno:10 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 602501

Min. van JenV/Immigratie- en Naturalisatiedienst/Taken inzake vreemdelingen:18 - spontaan
( '04.05.10 Nationaliteit:Nationaliteit' != 0001 ) && ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' != "B" ) && ( '04.82.30 Nationaliteit:Beschrijving document' != "proba/*" && "Proba/*" && "PRoba/*" && "PROba/*" && "PROBa/*" && "PROBA/*" && "pROBA/*" && "/?proba/*" && "/?Proba/*" && "/?PRoba/*" && "/?PROba/*" && "/?PROBa/*" && "/?PROBA/*" && "/?pROBA/*" ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van JenV/Immigratie- en Naturalisatiedienst/Taken inzake vreemdelingen:18 - ad hoc
( '04.05.10 Nationaliteit:Nationaliteit' != 0001 ) && ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' != "B" )

Universiteit Utrecht/TransExpo-onderzoek:1 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

Gemeente Leudal/Algemene gemeentetaken:12 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1640 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

GGD Brabant-Zuidoost (EPI):1 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0743 || 0753 || 0762 || 0770 || 0772 || 0794 || 0820 || 0823 || 0847 || 0848 || 0858 || 0861 || 0866 || 1652 || 1658 || 1659 || 1667 || 1706 || 1724 || 1728 || 1771 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van BZK/Logius/MijnOverheid Berichtenbox (1):7 - spontaan
( ( '01.03.10 Persoon:Geboortedatum' < TODAY - 001309 ) && ( '01.03.10 Persoon:Geboortedatum' != 00000000 ) ) && ( ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' ) || ( ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" || "R" ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 || '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) ) )

Min. van BZK/Logius/MijnOverheid Berichtenbox (1):7 - selectie
( ( '01.03.10 Persoon:Geboortedatum' < SELECTION-DATE - 001309 ) && ( '01.03.10 Persoon:Geboortedatum' != 00000000 ) ) && ( ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' ) || ( ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" || "R" ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 || '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) ) )

GGD Noord- en Oost-Gelderland (EPI):10 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0197 || 0200 || 0213 || 0222 || 0230 || 0232 || 0233 || 0243 || 0244 || 0246 || 0262 || 0269 || 0273 || 0285 || 0294 || 0301 || 0302 || 1509 || 1586 || 1859 || 1876 || 1955 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van JenV/Taken inzake beleid tijdelijke bescherming ontheemden Oekraïne:3 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

Gemeente Zaltbommel/Algemene gemeentetaken:11 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0297 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Erasmus MC/Proefbevolkingsonderzoek longkanker:1 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0060 ) && ( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0080 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0059 || 0074 || 0080 || 0085 || 0086 || 0090 || 0307 || 0308 || 0310 || 0342 || 0344 || 0355 || 0362 || 0363 || 0402 || 0737 || 1900 || 1940 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Erasmus MC/Proefbevolkingsonderzoek longkanker:1 - ad hoc
'01.03.10 Persoon:Geboortedatum' <= TODAY - 0060

GGD Brabant-Zuidoost (JGZ/overig):3 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0743 || 0753 || 0762 || 0770 || 0772 || 0794 || 0820 || 0823 || 0847 || 0848 || 0858 || 0861 || 0866 || 1652 || 1658 || 1659 || 1667 || 1706 || 1724 || 1728 || 1771 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Dienst Gezondheid & Jeugd Zuid-Holland Zuid (EPI):1 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0482 || 0505 || 0512 || 0523 || 0531 || 0590 || 0610 || 0642 || 1963 || 1978 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Uithoorn via Belastingkantoor Amstelland/Gemeentelijke belastingen:1 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0451 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Uithoorn via Belastingkantoor Amstelland/Gemeentelijke belastingen:1 - selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 256401 ) && ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) )

Gemeente Montferland/Algemene gemeentetaken:14 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1955 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

GGD Hart voor Brabant (JGZ/overig):7 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0755 || 0757 || 0766 || 0784 || 0785 || 0796 || 0797 || 0798 || 0809 || 0824 || 0828 || 0845 || 0855 || 0865 || 0867 || 1721 || 1948 || 1982 || 1991 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Amstelveen via Belastingkantoor Amstelland/Gemeentelijke belastingen:3 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0362 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Amstelveen via Belastingkantoor Amstelland/Gemeentelijke belastingen:3 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

Rivierduinen Servicebedrijf:4 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

Belastingkantoor SVHW/Gemeentelijke en waterschapsbelastingen:21 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0482 || 0489 || 0505 || 0523 || 0531 || 0569 || 0597 || 0613 || 0642 || 1621 || 1719 || 1924 || 1930 || 1931 || 1959 || 1963 || 1992 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0599 && '08.11.60 Verblijfsplaats:Postcode' == "307/*" || "308/*" || "318/*" || "319/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor SVHW/Gemeentelijke en waterschapsbelastingen:21 - selectie
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1719 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente 's-Gravenhage/Landelijke Taken/Kiezers buiten Nederland (1):6 - selectie
( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) && ( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 451701 )

Gemeente 's-Gravenhage/Landelijke Taken/Kiezers buiten Nederland (1):6 - ad hoc
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 00170000 ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) && ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" || "R" )

GGD Twente (JGZ/overig):3 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0141 || 0147 || 0153 || 0158 || 0163 || 0164 || 0168 || 0173 || 0183 || 0189 || 1700 || 1735 || 1742 || 1774 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van Defensie/Taken inzake dienstplicht en veteranenzorg:11 - spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0017 ) && ( '01.03.10 Persoon:Geboortedatum' > TODAY - 0035 ) && ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "M" ) || ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "O" || "V" ) && ( '01.03.10 Persoon:Geboortedatum' >= 20030000 ) ) ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '64.40.10 Afnemersindicatie*:Afnemersindicatie' != 890001 )

Min. van Defensie/Taken inzake dienstplicht en veteranenzorg:11 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0035 ) && ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "M" ) || ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "O" || "V" ) && ( '01.03.10 Persoon:Geboortedatum' >= 20030000 ) ) ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '64.40.10 Afnemersindicatie*:Afnemersindicatie' != 890001 )

Min. van Defensie/Taken inzake dienstplicht en veteranenzorg:11 - ad hoc
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0017 ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 )

CBS1: Structuurtelling (selectie):15 - selectie
ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.10 Inschrijving:Datum opschorting bijhouding' >= 19941001 )

Min. van OCW/Dienst Uitvoering Onderwijs (DUO):34 - spontaan
( ( '01.03.10 Persoon:Geboortedatum' <= TODAY - 00020600 ) && ( '01.03.10 Persoon:Geboortedatum' > TODAY - 00180000 ) ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van OCW/Dienst Uitvoering Onderwijs (DUO):34 - selectie
( ( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 000206 ) && ( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 00180000 ) ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van VWS/CIBG/Taken inzake donorregistratie:16 - selectie
( ( '01.03.10 Persoon:Geboortedatum' == SELECTION-DATE - 001801 ) || ( ( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 001901 ) && ( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' || ( '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' <= SELECTION-DATE - 000301 ) ) ) ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van VWS/CIBG/Taken inzake donorregistratie:16 - ad hoc
'01.03.10 Persoon:Geboortedatum' <= TODAY - 00120000

Premiepensioeninstelling Aegon Cappital via TKP Pensioen:3 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

Gemeente Gouda/Algemene gemeentetaken:9 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0513 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente 's-Gravenhage/Landelijke Taken/Kiezers buiten Nederland  (2):2 - spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 00170000 ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) && ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" || "R" ) && ( NOT ISNULL '08.13.40 Verblijfsplaats:Regel 2 adres buitenland' )

Gemeente 's-Gravenhage/Landelijke Taken/Kiezers buiten Nederland  (2):2 - selectie
( '01.03.10 Persoon:Geboortedatum' == SELECTION-DATE - 001701 ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 || '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) && ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" || "R" ) && ( NOT ISNULL '08.13.40 Verblijfsplaats:Regel 2 adres buitenland' )

Min. van JenV/Immigratie- en Naturalisatiedienst/Taken inzake Nederlanders:11 - ad hoc
( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) || ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" )

CBS4: Geb. & Afstamming (ouder):2 - spontaan
( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' || '09.85.10 Kind:Ingangsdatum geldigheid' > '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) && '09.85.10 Kind:Ingangsdatum geldigheid' > '07.68.10 Inschrijving:Datum eerste inschrijving BRP'

Min. van BZK/RvIG/Register vermiste of vervallen reisdocumenten (2):5 - spontaan
( NOT ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '12.35.50 Reisdocument:Datum einde geldigheid Nederlands reisdocument' > TODAY - 00000000 ) ) && ( '12.35.10 Reisdocument:Soort Nederlands reisdocument' != "RD" && "RM" && "RV" && "R1" && "R2" )

Min. van BZK/RvIG/Register vermiste of vervallen reisdocumenten (2):5 - selectie
( '06.08.10 Overlijden:Datum overlijden' >= 20090101 ) && ( '12.35.50 Reisdocument:Datum einde geldigheid Nederlands reisdocument' > '06.08.10 Overlijden:Datum overlijden' )

Gemeente Haarlemmermeer/Algemene gemeentetaken:14 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0394 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Min. van JenV/Justitiële Informatiedienst/Taken inzake casus-overleggen:6 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

Min. van BZK/RvIG/Register paspoortsignaleringen:9 - selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer'

Gemeente Raalte/Algemene gemeentetaken:9 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510391

Centraal Bureau voor Genealogie (CBG):9 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999 ) || ( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1999 ) && ( ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) || ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) ) )

Centraal Bureau voor Genealogie (CBG):9 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 400201

Centraal Bureau voor Genealogie (CBG):9 - ad hoc
( NOT ISNULL '06.08.10 Overlijden:Datum overlijden' ) && ( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999 ) || ( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1999 ) && ( ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) || ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) ) ) )

Pensioenuitvoerders via Dion Pensioen Services:6 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 815201

Gemeente Boxtel/Algemene gemeentetaken:10 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0757 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente Borne/Algemene gemeentetaken:10 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0147 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeenschappelijke regeling Drechtsteden:4 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0505 || 0531 || 0590 || 0610 || 0642 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Nuenen, Gerwen en Nederwetten/Algemene gemeentetaken:11 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510138

Hulpverleningsdienst Gelderland-Midden (EPI):3 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0202 || 0203 || 0221 || 0226 || 0228 || 0267 || 0274 || 0275 || 0277 || 0279 || 0289 || 0293 || 0299 || 1705 || 1734 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Schiedam/Algemene gemeentetaken:9 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0606 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente Aalten/Algemene gemeentetaken:12 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510215

CBS9: A-nummer/Burgerservicenummer:5 - spontaan
( NOT ISNULL '51.01.10 Persoon*:A-nummer' && ( '01.01.10 Persoon:A-nummer' != '51.01.10 Persoon*:A-nummer' ) ) || ( NOT ISNULL '51.01.20 Persoon*:Burgerservicenumer' && ( '01.01.20 Persoon:Burgerservicenumer' != '51.01.20 Persoon*:Burgerservicenumer' ) )

Belastingkantoor RBG/Gemeentelijke en waterschapsbelastingen (2):11 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0513 && '08.11.60 Verblijfsplaats:Postcode' == "2802/*" || "2807/*" || "2808/*" || "2809/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0627 && '08.11.60 Verblijfsplaats:Postcode' == "2741/*" || "2742/*" || "2743/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1916 && '08.11.60 Verblijfsplaats:Postcode' == "2261/*" || "2262/*" || "2264/*" || "2265/*" || "2266/*" || "2267/*" ) ) && '14.40.10 Afnemersindicatie:Afnemersindicatie' != 250701 && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Amsterdam-Amstelland (EPI):6 - selectie
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0358 || 0362 || 0363 || 0384 || 0437 || 0451 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Son en Breugel/Algemene gemeentetaken:9 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510365

Min. van JenV via DSW Zorgverzekeraar/Zorgverzekering ontheemden Oekraïne:1 - spontaan
'10.39.10 Verblijfstitel:Aanduiding verblijfstitel' == 46

Min. van JenV via DSW Zorgverzekeraar/Zorgverzekering ontheemden Oekraïne:1 - selectie
'10.39.10 Verblijfstitel:Aanduiding verblijfstitel' == 46 && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'

Pensioenuitvoerder Wolters Kluwer Nederland:7 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 802301

Gemeente Koggenland/Algemene gemeentetaken:12 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1598 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente Lingewaard/Algemene gemeentetaken:11 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1705 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente Bronckhorst via Belastingkantoor Twente/Gemeentelijke belastingen:1 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1876 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Bronckhorst via Belastingkantoor Twente/Gemeentelijke belastingen:1 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 257101

Belastingkantoor West-Brabant/Gemeentelijke en waterschapsbelastingen:3 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0744 || 0748 || 0758 || 0766 || 0777 || 0779 || 0784 || 0809 || 0826 || 0840 || 0851 || 0867 || 0873 || 0879 || 1655 || 1674 || 1709 || 1719 || 1723 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0785 && '08.11.60 Verblijfsplaats:Postcode' == "5051/*" || "5052/*" || "5133/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0855 && '08.11.60 Verblijfsplaats:Postcode' == "5011/*" || "5015/*" || "5017/*" || "5018/*" || "502/*" || "503/*" || "504/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor West-Brabant/Gemeentelijke en waterschapsbelastingen:3 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 250402

Hoogheemraadschap Hollands Noorderkwartier:17 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0361 || 0373 || 0375 || 0383 || 0385 || 0388 || 0396 || 0399 || 0400 || 0405 || 0415 || 0420 || 0431 || 0432 || 0439 || 0441 || 0448 || 0450 || 0479 || 0498 || 0532 || 0852 || 0880 || 1598 || 1911 || 1980 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0363 && '08.11.60 Verblijfsplaats:Postcode' == "1022K/*" || "1022L/*" || "1023/*" || "1024/*" || "1025/*" || "1026/*" || "1027/*" || "1028/*" || "1033/*" || "1034/*" || "1035/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0453 && '08.11.60 Verblijfsplaats:Postcode' == "1951/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Hoogheemraadschap Hollands Noorderkwartier:17 - selectie
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0363 && '08.11.60 Verblijfsplaats:Postcode' == "1022K/*" || "1022L/*" ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Nrd- en Oost-Gelderland (JGZ/overig):15 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0197 || 0200 || 0213 || 0222 || 0230 || 0232 || 0233 || 0243 || 0244 || 0246 || 0262 || 0269 || 0273 || 0285 || 0294 || 0301 || 0302 || 1509 || 1586 || 1859 || 1876 || 1955 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Nrd- en Oost-Gelderland (JGZ/overig):15 - selectie
( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0244 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Kamer van Koophandel:11 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 450101

Samenwerkingsverband Zuid-Holland Zuid/Leerlingzaken:9 - spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 000300 && '01.03.10 Persoon:Geboortedatum' > TODAY - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0482 || 0505 || 0512 || 0523 || 0531 || 0590 || 0610 || 0642 || 1963 || 1978 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Samenwerkingsverband Zuid-Holland Zuid/Leerlingzaken:9 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 000300 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0482 || 0505 || 0512 || 0523 || 0531 || 0590 || 0610 || 0642 || 1963 || 1978 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van Financiën/Belastingdienst:30 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 250001

Gemeente Diemen via Belastingkantoor Amstelland/Gemeentelijke belastingen:1 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0384 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Diemen via Belastingkantoor Amstelland/Gemeentelijke belastingen:1 - selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 256501 ) && ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) )

Waterschap De Dommel/Waterschapsbelastingen (1):2 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0753 || 0757 || 0770 || 0772 || 0785 || 0798 || 0820 || 0823 || 0824 || 0848 || 0855 || 0858 || 0861 || 0865 || 0866 || 1658 || 1667 || 1706 || 1724 || 1728 || 1771 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0744 && '08.11.60 Verblijfsplaats:Postcode' == "5111/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0794 && '08.11.60 Verblijfsplaats:Postcode' == "5706KB" || "5707DC" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0796 && '08.11.60 Verblijfsplaats:Postcode' == "5211CM" || "5216HH" || "5216PZ" || "5216VT" || "5216VV" || "5216VW" || "5216VX" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0797 && '08.11.60 Verblijfsplaats:Postcode' == "5151RB" || "5151RD" || "5151RE" || "5151RG" || "5151RH" || "5151RK" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0809 && '08.11.60 Verblijfsplaats:Postcode' == "5175NW" || "5175NX" || "5175NZ" || "5175PB" || "5175PC" || "5175PS" || "5175PT" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0845 && '08.11.60 Verblijfsplaats:Postcode' == "527/*" || "529/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0847 && '08.11.60 Verblijfsplaats:Postcode' == "5711PX" || "5711RJ" || "5711RL" || "5712/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1659 && '08.11.60 Verblijfsplaats:Postcode' == "5737P/*" || "5737SG" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1948 && '08.11.60 Verblijfsplaats:Postcode' == "5466PZ" || "5481JD" || "5481JG" || "5481S/*" || "5481V/*" || "5481X/*" || "5482/*" || "549/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Hollands Noorden (EPI):11 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0361 || 0373 || 0383 || 0388 || 0399 || 0400 || 0405 || 0420 || 0432 || 0441 || 0448 || 0498 || 0532 || 1598 || 1911 || 1980 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van BZK/Logius/Overheidstoegangsvoorziening DigiD (1):9 - selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'

KNAW/Meertens Instituut/Voornamen-onderzoek:7 - selectie
( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) || ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" )

eFormulieren - Gemeente Hoorn:3 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

CBS2: Vestiging en Verhuizing:5 - spontaan
'01.03.10 Persoon:Geboortedatum' != '08.10.30 Verblijfsplaats:Datum aanvang adreshouding'

Raad van State/Bestuursrechtspraak:1 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

Gemeente Ouder-Amstel via Belastingkantoor Amstelland/Gemeentelijke belastingen:3 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0437 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Ouder-Amstel via Belastingkantoor Amstelland/Gemeentelijke belastingen:3 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

Gemeente Katwijk/Algemene gemeentetaken:10 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510270

GGD IJsselland (JGZ/overig):20 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0148 || 0150 || 0160 || 0166 || 0175 || 0177 || 0180 || 0193 || 1708 || 1773 || 1896 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD IJsselland (JGZ/overig):20 - selectie
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0244

Pensioenuitvoerder HaskoningDHV:7 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 807101

CBS11: Toerismestatistieken Caribisch Nederland (BES):1 - ad hoc
( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) || ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" )

Radboud Universiteit Nijmegen/Nederlandse levensloop studie (NELLS)-onderzoek:1 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '07.70.10 Inschrijving:Indicatie geheim' == 0 )

Nederlandse Zorgautoriteit (NZa):4 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

Radboud Universiteit Nijmegen/Gastro-oesofageale refluxziekte (GORZ)-onderzoek:1 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '07.70.10 Inschrijving:Indicatie geheim' == 0 )

Belastingkantoor Cocensus/Gemeentelijke belastingen:11 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0361 || 0373 || 0375 || 0383 || 0392 || 0394 || 0399 || 0400 || 0431 || 0450 || 0534 || 0880 || 1980 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Hollands Noorden (JGZ/overig):7 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0361 || 0373 || 0383 || 0388 || 0399 || 0400 || 0405 || 0420 || 0432 || 0441 || 0448 || 0498 || 0532 || 1598 || 1911 || 1980 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor Twente/Gemeentelijke belastingen:1 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0141 || 0147 || 0153 || 0158 || 0164 || 0168 || 0173 || 1700 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor Twente/Gemeentelijke belastingen:1 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 251501

Belastingkantoor Rivierenland/Gemeentelijke en waterschapsbelastingen:24 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0209 || 0214 || 0216 || 0225 || 0252 || 0263 || 0268 || 0281 || 0296 || 0297 || 0335 || 0352 || 0353 || 0482 || 0512 || 0523 || 0590 || 0610 || 0668 || 1705 || 1734 || 1740 || 1945 || 1959 || 1960 || 1961 || 1978 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0202 && '08.11.60 Verblijfsplaats:Postcode' == "683/*" || "684/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor RBG/Gemeentelijke en waterschapsbelastingen (1):23 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0502 || 0503 || 0518 || 0542 || 0556 || 0603 || 0606 || 0622 || 1621 || 1783 || 1842 || 1892 || 1926 || 1931 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0599 && '08.11.60 Verblijfsplaats:Postcode' == "2761/*" || "2913/*" || "301/*" || "302/*" || "303/*" || "304/*" || "305/*" || "306/*" || "3071/*" || "3151/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0637 && '08.11.60 Verblijfsplaats:Postcode' == "2712/*" || "2718/*" || "2719/*" || "2721/*" || "2722/*" || "2723/*" || "2728/*" || "2729/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1916 && '08.11.60 Verblijfsplaats:Postcode' == "227/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor RBG/Gemeentelijke en waterschapsbelastingen (1):23 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 250701

Gemeente Noordwijk/Algemene gemeentetaken:12 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510058

Pensioenuitvoerder Ondernemingspensioenfonds MN Services:5 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 815801

GGD Amsterdam-Amstelland (JGZ/overig):11 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0358 || 0362 || 0363 || 0384 || 0437 || 0451 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

DUO/Inning en Incasso:3 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

Gemeente Geldrop-Mierlo/Algemene gemeentetaken:10 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510077

GGD West-Brabant (EPI):5 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0744 || 0748 || 0758 || 0777 || 0779 || 0826 || 0840 || 0851 || 0873 || 0879 || 1655 || 1674 || 1709 || 1719 || 1723 || 1959 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Zorgverzekeraar CZ Groep:7 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 603101

Integraal Kankercentrum Nederland (IKNL):4 - selectie
( ( '07.67.10 Inschrijving:Datum opschorting bijhouding' >= SELECTION-DATE - 0001 ) && ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" ) ) || ( ( '07.67.10 Inschrijving:Datum opschorting bijhouding' >= SELECTION-DATE - 0001 ) && '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "O" && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999 || ( NOT ISNULL '58.09.10 Verblijfsplaats*:Gemeente van inschrijving' && '58.09.10 Verblijfsplaats*:Gemeente van inschrijving' != 1999 ) ) )

Integraal Kankercentrum Nederland (IKNL):4 - ad hoc
( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" ) || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "O" && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999 || ( NOT ISNULL '58.09.10 Verblijfsplaats*:Gemeente van inschrijving' && '58.09.10 Verblijfsplaats*:Gemeente van inschrijving' != 1999 ) ) )

Sociale Verzekeringsbank (SVB)/Basisadministratie Volksverzekeringen:23 - selectie
( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) && ( '14.40.10 Afnemersindicatie:Afnemersindicatie' != 852102 )

UMC Utrecht/ALS onderzoek:2 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

RDOG GGD Hollands Midden (JGZ/overig):18 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0484 || 0513 || 0534 || 0537 || 0546 || 0547 || 0553 || 0569 || 0575 || 0579 || 0626 || 0627 || 0638 || 1525 || 1884 || 1892 || 1901 || 1931 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

RDOG GGD Hollands Midden (JGZ/overig):18 - selectie
( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0484 || 0513 || 0534 || 0537 || 0546 || 0547 || 0553 || 0569 || 0575 || 0579 || 0626 || 0627 || 0638 || 1525 || 1884 || 1892 || 1901 || 1931 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Samenwerkingsverband Laborijn/Sociale werkvoorziening:2 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 415002

GGD Zeeland (EPI):2 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0654 || 0664 || 0677 || 0678 || 0687 || 0703 || 0715 || 0716 || 0717 || 0718 || 1676 || 1695 || 1714 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van BZK/Logius/Overheidstoegangsvoorziening DigiD (2):2 - selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && ISNULL '06.08.10 Overlijden:Datum overlijden'

Belastingkantoor Gouwe-Rijnland/Gemeentelijke en waterschapsbelastingen:21 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0377 || 0392 || 0394 || 0397 || 0453 || 0473 || 0484 || 0513 || 0534 || 0537 || 0546 || 0547 || 0553 || 0569 || 0575 || 0579 || 0626 || 0627 || 0629 || 0638 || 1525 || 1884 || 1901 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0358 && '08.11.60 Verblijfsplaats:Postcode' == "1431/*" || "1432/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0363 && '08.11.60 Verblijfsplaats:Postcode' == "106/*" || "1076/*" || "1081/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0637 && '08.11.60 Verblijfsplaats:Postcode' == "2711/*" || "2713/*" || "2714/*" || "2715/*" || "2716/*" || "2717/*" || "2722/*" || "2723/*" || "2724/*" || "2725/*" || "2726/*" || "2727/*" || "2728/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1916 && '08.11.60 Verblijfsplaats:Postcode' == "226/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor Gouwe-Rijnland/Gemeentelijke en waterschapsbelastingen:21 - selectie
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0453 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

St. Interkerkelijke Ledenadministratie:12 - selectie
'07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M"

St. Interkerkelijke Ledenadministratie:12 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

CBS6: Huwelijk/gereg.partnerschap:2 - spontaan
( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' || '05.85.10 Huwelijk/geregistreerd partnerschap:Ingangsdatum geldigheid' >= '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) && '05.85.10 Huwelijk/geregistreerd partnerschap:Ingangsdatum geldigheid' >= '07.68.10 Inschrijving:Datum eerste inschrijving BRP'

Gemeente Voorschoten/Algemene gemeentetaken:10 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510221

CBS3: Geboorte en Afstamming (kind):4 - spontaan
( ( '01.03.10 Persoon:Geboortedatum' == '08.10.30 Verblijfsplaats:Datum aanvang adreshouding' ) || ( '02.62.10 Ouder1:Datum ingang familierechtelijke betrekking' > '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) || ( '03.62.10 Ouder2:Datum ingang familierechtelijke betrekking' > '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) || ( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999 )

Fiom:6 - selectie
( '01.03.10 Persoon:Geboortedatum' > 19741231 && '01.03.10 Persoon:Geboortedatum' <= 19831209 ) && ( '01.03.30 Persoon:Geboorteland' == /5021|5038|6015|7015|7038/ ) && ( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' || '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' <= 20011231 || '58.14.20 Verblijfsplaats*:Datum vestiging in Nederland' <= 20011231 )

Pensioenuitvoerders via AZL:12 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 819001

GGD Utrecht (JGZ/overig):3 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0344 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

MvI&M/Rijkswaterstaat/BOA-taak:1 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

DSW Zorgverzekeraar:11 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 601101

Min. van BZK/Verkiezingen Europees Parlement:5 - selectie
( '04.05.10 Nationaliteit:Nationaliteit' == 0027 || 0028 || 0042 || 0043 || 0044 || 0045 || 0046 || 0052 || 0053 || 0054 || 0055 || 0056 || 0057 || 0059 || 0061 || 0062 || 0064 || 0067 || 0068 || 0071 || 0072 || 0073 || 0074 || 0077 || 0080 || 0308 ) && ( '13.31.10 Kiesrecht:Aanduiding Europees kiesrecht' == 2 ) && ( '13.31.20 Kiesrecht:Datum verzoek of mededeling Europees kiesrecht' < 20240424 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'

Gemeente Midden-Groningen/Algemene gemeentetaken:14 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1952 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Belastingkantoor BsGW Limburg/Gemeentelijke en waterschapsbelastingen:1 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0882 || 0888 || 0889 || 0893 || 0899 || 0907 || 0917 || 0928 || 0935 || 0938 || 0944 || 0946 || 0957 || 0965 || 0971 || 0981 || 0983 || 0984 || 0986 || 0988 || 0994 || 1507 || 1640 || 1641 || 1669 || 1711 || 1729 || 1883 || 1894 || 1903 || 1954 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor BsGW Limburg/Gemeentelijke en waterschapsbelastingen:1 - selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 250101 ) && ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) )

Noordelijk Belastingkantoor/Gemeentelijke en waterschapsbelastingen:3 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0014 || 0037 || 0047 || 0059 || 0060 || 0072 || 0074 || 0080 || 0085 || 0086 || 0088 || 0090 || 0093 || 0096 || 0098 || 0737 || 0765 || 1680 || 1699 || 1730 || 1891 || 1895 || 1900 || 1940 || 1949 || 1950 || 1952 || 1966 || 1969 || 1970 || 1979 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0106 && '08.11.60 Verblijfsplaats:Postcode' == "9401/*" || "9402/*" || "9403/*" || "9404/*" || "9405/*" || "9406/*" || "9407/*" || "9409/*" || "9486/*" || "9487/*" || "9488/*" || "9489/*" || "9492/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0109 && '08.11.60 Verblijfsplaats:Postcode' == "7849/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0114 && '08.11.60 Verblijfsplaats:Postcode' == "7826/*" || "7831/*" || "7881/*" || "7884/*" || "7889/*" || "7895/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1681 && '08.11.60 Verblijfsplaats:Postcode' == "7858/*" || "7859/*" || "7872/*" || "7875/*" || "7876/*" || "7877/*" || "952/*" || "953/*" || "9564/*" || "957/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1731 && '08.11.60 Verblijfsplaats:Postcode' == "9414/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van BZK/RvIG/PIVA-GBA Koppeling (PGK):10 - spontaan
( ( '07.67.10 Inschrijving:Datum opschorting bijhouding' >= TODAY - 000001 ) && ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" ) && ( '08.13.10 Verblijfsplaats:Land adres buitenland' == 5095 || 5106 || 5107 || 5108 || 5109 || 5110 ) ) || ( '08.14.10 Verblijfsplaats:Land vanwaar ingeschreven' == 5095 || 5106 || 5107 || 5108 || 5109 || 5110 )

Gemeente Venlo/Algemene gemeentetaken:12 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0983 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente Groningen/Algemene gemeentetaken:13 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0014 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

GGD West-Brabant (JGZ/overig):4 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0744 || 0748 || 0758 || 0777 || 0779 || 0826 || 0840 || 0851 || 0873 || 0879 || 1655 || 1674 || 1709 || 1719 || 1723 || 1959 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Midden-Nederland (EPI):6 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0307 || 0308 || 0310 || 0312 || 0313 || 0317 || 0321 || 0327 || 0331 || 0335 || 0339 || 0340 || 0342 || 0345 || 0351 || 0352 || 0353 || 0355 || 0356 || 0589 || 0632 || 0736 || 1581 || 1904 || 1961 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Rotterdam/Algemene gemeentetaken:13 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0599 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Stichting VAM (IBKI):4 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

Gemeente Bernheze/Algemene gemeentetaken:9 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1721 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

GGD Zuid-Holland West:9 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0503 || 0603 || 0629 || 0637 || 1783 || 1842 || 1916 || 1926 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Bevolkingsonderzoek Nederland:8 - spontaan
( ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "O" || "V" ) && ( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0029 ) ) || ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "M" ) && ( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0054 ) ) ) && ( '01.03.10 Persoon:Geboortedatum' >= TODAY - 0075 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'

Bevolkingsonderzoek Nederland:8 - selectie
( ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "O" || "V" ) && ( ( '01.03.10 Persoon:Geboortedatum' == SELECTION-DATE - 0029 ) || ( '01.03.10 Persoon:Geboortedatum' == SELECTION-DATE - 0049 ) ) ) || ( '01.03.10 Persoon:Geboortedatum' == SELECTION-DATE - 0054 ) ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'

Gemeente Amsterdam/Algemene gemeentetaken:12 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0363 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Waterschap De Dommel/Waterschapsbelastingen (2):1 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0794 && '08.11.60 Verblijfsplaats:Postcode' == "5707DA" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0809 && '08.11.60 Verblijfsplaats:Postcode' == "5175BC" || "5175BD" || "5175NV" || "5175PJ" || "5175RV" || "5175RW" || "5175RX" || "5175RZ" || "5175SV" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0847 && '08.11.60 Verblijfsplaats:Postcode' == "5711PV" || "5711PZ" || "5711RA" || "5711RD" || "5711RG" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1659 && '08.11.60 Verblijfsplaats:Postcode' == "5737RM" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1723 && '08.11.60 Verblijfsplaats:Postcode' == "5131RN" || "5131RP" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1948 && '08.11.60 Verblijfsplaats:Postcode' == "5465LA" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Waterschap De Dommel/Waterschapsbelastingen (2):1 - selectie
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0794 && '08.11.60 Verblijfsplaats:Postcode' == "5707DA" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0809 && '08.11.60 Verblijfsplaats:Postcode' == "5175BC" || "5175BD" || "5175NV" || "5175PJ" || "5175RV" || "5175RW" || "5175RX" || "5175RZ" || "5175SV" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0847 && '08.11.60 Verblijfsplaats:Postcode' == "5711PV" || "5711PZ" || "5711RA" || "5711RD" || "5711RG" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1659 && '08.11.60 Verblijfsplaats:Postcode' == "5737RM" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1723 && '08.11.60 Verblijfsplaats:Postcode' == "5131RN" || "5131RP" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1948 && '08.11.60 Verblijfsplaats:Postcode' == "5465LA" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Drenthe:4 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0106 || 0109 || 0114 || 0118 || 0119 || 1680 || 1681 || 1690 || 1699 || 1701 || 1730 || 1731 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van BZK/RvIG/Register vermiste of vervallen reisdocumenten (1):6 - spontaan
( '12.35.70 Reisdocument:Aanduiding inhouding dan wel vermissing Nederlands reisdocument' == "R" || "V" ) && ( '12.35.10 Reisdocument:Soort Nederlands reisdocument' != "RD" && "RM" && "RV" && "R1" && "R2" )

Min. van BZK/RvIG/Register vermiste of vervallen reisdocumenten (1):6 - selectie
'12.35.70 Reisdocument:Aanduiding inhouding dan wel vermissing Nederlands reisdocument' == "I" || "R" || "V" || "."

Pensioenuitvoerder SRLEV/Reaal Levensverzekeringen:9 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 804301

Gemeente Horst aan de Maas/Algemene gemeentetaken:10 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1507 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeenschappelijke regeling Meerinzicht belastingsamenwerking:2 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0050 || 0233 || 0243 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeenschappelijke regeling Meerinzicht belastingsamenwerking:2 - selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer' && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Altena/Algemene gemeentetaken:11 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1959 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Bureau Financieel Toezicht:4 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

Gemeente Amstelveen/Algemene gemeentetaken:10 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0362 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente 's-Hertogenbosch/Algemene gemeentetaken:9 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0796 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Rijksdienst voor het Wegverkeer (RDW):11 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 870201

Gemeente Deventer/Algemene gemeentetaken:11 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0150 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente Doetinchem/Algemene gemeentetaken:10 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0222 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Centrum voor Jeugd en Gezin Apeldoorn:1 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 00180000 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0200 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'

Centrum voor Jeugd en Gezin Apeldoorn:1 - selectie
( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 00180000 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0200 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'

Pensioenuitvoerders via TKP Pensioen:12 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

Pensioenuitvoerders via APG Rechtenbeheer:7 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

Samenwerkingsverband GGD Brabant-Zuidoost/Leerlingzaken:5 - spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 000300 && '01.03.10 Persoon:Geboortedatum' > TODAY - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0743 || 0753 || 0762 || 0770 || 0772 || 0794 || 0820 || 0823 || 0847 || 0848 || 0858 || 0861 || 0866 || 1652 || 1658 || 1659 || 1667 || 1706 || 1724 || 1728 || 1771 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Samenwerkingsverband GGD Brabant-Zuidoost/Leerlingzaken:5 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 000300 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0743 || 0753 || 0762 || 0770 || 0772 || 0794 || 0820 || 0823 || 0847 || 0848 || 0858 || 0861 || 0866 || 1652 || 1658 || 1659 || 1667 || 1706 || 1724 || 1728 || 1771 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Flevoland (JGZ/overig):3 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0034 || 0050 || 0171 || 0184 || 0303 || 0995 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Montfoort/Algemene gemeentetaken:9 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0335 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Belastingkantoor Tribuut/Gemeentelijke belastingen:1 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0200 || 0213 || 0232 || 0262 || 0285 || 0301 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor Tribuut/Gemeentelijke belastingen:1 - selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 255201 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'

Waterschap Amstel, Gooi en Vecht:17 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0362 || 0376 || 0384 || 0402 || 0406 || 0417 || 0437 || 0451 || 0736 || 1696 || 1904 || 1942 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0358 && '08.11.60 Verblijfsplaats:Postcode' == "1433/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0363 && '08.11.60 Verblijfsplaats:Postcode' != "1024/*" && "1025/*" && "1026/*" && "1027/*" && "1028/*" && "1034/*" && "1035/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

MN Services:11 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 800401

Pensioenuitvoerder SRLEV/Zwitserleven:7 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

Samenwerkingsverband Holland Rijnland/Leerlingzaken:7 - spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 000300 && '01.03.10 Persoon:Geboortedatum' > TODAY - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0534 || 0537 || 0546 || 0547 || 0553 || 0575 || 0579 || 0626 || 0638 || 1525 || 1884 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Samenwerkingsverband Holland Rijnland/Leerlingzaken:7 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 000300 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0534 || 0537 || 0546 || 0547 || 0553 || 0575 || 0579 || 0626 || 0638 || 1525 || 1884 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Rotterdam-Rijnmond (JGZ/overig):8 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0489 || 0502 || 0542 || 0556 || 0597 || 0599 || 0606 || 0613 || 0622 || 1621 || 1924 || 1930 || 1992 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Berkelland via Belastingkantoor Twente/Gemeentelijke belastingen:1 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1859 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Berkelland via Belastingkantoor Twente/Gemeentelijke belastingen:1 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 257001

Gemeente Lelystad/Algemene gemeentetaken:9 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0995 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente Hollands Kroon/Algemene gemeentetaken:11 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1911 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Min. van BZK/RvIG/Basisregister reisdocumenten (3):4 - selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer'

Pensioenuitvoerder Sagittarius:6 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 806201

Gemeente Peel en Maas/Algemene gemeentetaken:10 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1894 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente De Ronde Venen via Belastingkantoor Amstelland/Gem. belastingen:3 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0736 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente De Ronde Venen via Belastingkantoor Amstelland/Gem. belastingen:3 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

GGD Regio Twente (EPI):6 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0141 || 0147 || 0153 || 0158 || 0163 || 0164 || 0168 || 0173 || 0183 || 0189 || 1700 || 1735 || 1742 || 1774 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Maassluis/Algemene gemeentetaken:9 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0556 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Belastingkantoor SaBeWa Zeeland/Gemeentelijke en waterschapsbelastingen:6 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0654 || 0664 || 0677 || 0678 || 0687 || 0703 || 0715 || 0716 || 0717 || 0718 || 1676 || 1695 || 1714 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor SaBeWa Zeeland/Gemeentelijke en waterschapsbelastingen:6 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

GGD Limburg-Noord (EPI):1 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0889 || 0893 || 0907 || 0946 || 0957 || 0983 || 0984 || 0988 || 1507 || 1640 || 1641 || 1669 || 1711 || 1894 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Fryslân (JGZ/overig):9 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0059 || 0060 || 0072 || 0074 || 0080 || 0085 || 0086 || 0088 || 0090 || 0093 || 0096 || 0098 || 0737 || 1891 || 1900 || 1940 || 1949 || 1970 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Zuid-Limburg (JGZ/overig):9 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0882 || 0888 || 0899 || 0917 || 0928 || 0935 || 0938 || 0965 || 0971 || 0981 || 0986 || 0994 || 1729 || 1883 || 1903 || 1954 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Rotterdam-Rijnmond (EPI):9 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0489 || 0502 || 0542 || 0556 || 0597 || 0599 || 0606 || 0613 || 0622 || 1621 || 1924 || 1930 || 1992 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van BZK/RvIG/Basisregister reisdocumenten (2):2 - spontaan
NOT ISNULL '06.08.10 Overlijden:Datum overlijden'

GGD Groningen (JGZ/overig):7 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0014 || 0037 || 0047 || 0765 || 1895 || 1950 || 1952 || 1966 || 1969 || 1979 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Waterschap Scheldestromen/Beheertaken:15 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 251001

GGD Zuid-Holland West (EPI):6 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0503 || 0603 || 0629 || 0637 || 1783 || 1842 || 1916 || 1926 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

CBS7: Nationaliteit:5 - spontaan
( '04.85.10 Nationaliteit:Ingangsdatum geldigheid' > '07.68.10 Inschrijving:Datum eerste inschrijving BRP' ) && ( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' || ( '04.85.10 Nationaliteit:Ingangsdatum geldigheid' > '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) )

Gemeente 's-Gravenhage/Algemene gemeentetaken (2):5 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0518 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Min. van BZK/RvIG/Basisregister reisdocumenten (1):5 - spontaan
KLOPT1: ( '12.35.10@A' != "RD" && "RM" && "RV" && "R1" && "R2" ) && NOT ISNULL '12.35.70@A'

Min. van BZK/RvIG/Basisregister reisdocumenten (1):5 - selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer'

GGD Gelderland-Zuid (JGZ/overig):12 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0018 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0209 || 0214 || 0216 || 0225 || 0252 || 0263 || 0268 || 0281 || 0296 || 0297 || 0668 || 0944 || 1740 || 1945 || 1960 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van BZK/RvIG/Authenticatie publieke dienstverlening Nederland (vanuit EER):3 - selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer'

GGD Hart voor Brabant (EPI):7 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0755 || 0757 || 0766 || 0784 || 0785 || 0796 || 0797 || 0798 || 0809 || 0824 || 0828 || 0845 || 0855 || 0865 || 0867 || 1721 || 1948 || 1982 || 1991 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Universiteit van Amsterdam/EDAN-onderzoek:1 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '07.70.10 Inschrijving:Indicatie geheim' == 0 )

Gemeente Zaanstad/Algemene gemeentetaken:11 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0479 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

GGD Kennemerland (JGZ/overig):5 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0375 || 0377 || 0392 || 0394 || 0396 || 0397 || 0450 || 0453 || 0473 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Den Haag (OGGZ):3 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

Belastingkantoor BghU/Gemeentelijke en waterschapsbelastingen:1 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0310 || 0312 || 0321 || 0331 || 0335 || 0340 || 0344 || 0352 || 0353 || 0355 || 0356 || 0589 || 0632 || 1581 || 1904 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor BghU/Gemeentelijke en waterschapsbelastingen:1 - selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 252601 ) && ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) )

GGD Limburg-Noord (JGZ/overig):5 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0889 || 0893 || 0907 || 0946 || 0957 || 0983 || 0984 || 0988 || 1507 || 1640 || 1641 || 1669 || 1711 || 1894 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van VWS/RIVM/Vaccinatie Covid:3 - spontaan
( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '08.13.10 Verblijfsplaats:Land adres buitenland' == 6030 ) ) ) && ( '64.40.10 Afnemersindicatie*:Afnemersindicatie' != 601205 )

GGD Gelderland-Zuid (EPI):6 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0209 || 0214 || 0216 || 0225 || 0252 || 0263 || 0268 || 0281 || 0296 || 0297 || 0668 || 0944 || 1740 || 1945 || 1960 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Hof van Twente/Burgerzakentaken:6 - selectie
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0142 || 0151 || 0156 || 0169 || 0179 || 1735

Dienst Gezondheid & Jeugd Zuid-Holland Zuid (JGZ/overig):8 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0482 || 0505 || 0512 || 0523 || 0531 || 0590 || 0610 || 0642 || 1963 || 1978 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Dienst Gezondheid & Jeugd Zuid-Holland Zuid (JGZ/overig):8 - selectie
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1961

Gemeente 's-Gravenhage/Algemene gemeentetaken (1):18 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510048

GGD Zaanstreek-Waterland (EPI):4 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0385 || 0415 || 0431 || 0439 || 0479 || 0852 || 0880 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Zaanstreek-Waterland (JGZ/overig):10 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0385 || 0415 || 0431 || 0439 || 0479 || 0852 || 0880 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Westland/Algemene gemeentetaken:10 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1783 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente Helmond/Algemene gemeentetaken:11 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0794 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

GGD IJsselland (EPI):6 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0148 || 0150 || 0160 || 0166 || 0175 || 0177 || 0180 || 0193 || 1708 || 1773 || 1896 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Zeeland (JGZ/overig):3 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0654 || 0664 || 0677 || 0678 || 0687 || 0703 || 0715 || 0716 || 0717 || 0718 || 1676 || 1695 || 1714 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van VWS/RIVM/Onderzoek en crisissituaties:12 - selectie
ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding' && ( '07.70.10 Inschrijving:Indicatie geheim' == 0 )

Gemeenten en samenwerkingsverbanden via Inlichtingenbureau/Werk en inkomen:4 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

Min. van VWS/Jodiumdistributie:1 - selectie
( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 004100 ) && ( ISNULL '06.08.10 Overlijden:Datum overlijden' ) && ( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0654 || 0664 || 0677 || 0678 || 0687 || 0703 || 0715 || 0717 || 0718 || 0873 || 1695 || 1714 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0168 && '08.11.60 Verblijfsplaats:Postcode' == "7587/*" || "7588/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1674 && '08.11.60 Verblijfsplaats:Postcode' == "4725/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1774 && '08.11.60 Verblijfsplaats:Postcode' == "7591/*" || "7635/*" ) ) && ( '08.10.10 Verblijfsplaats:Functie adres' == "W" )

GGD Kennemerland (EPI):6 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0375 || 0377 || 0392 || 0394 || 0396 || 0397 || 0450 || 0453 || 0473 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van BZK/RvIG/Aanpak adreskwaliteit/Raadpleging voor gemeenten (op A-nummer):2 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

Gemeente Hilversum/Algemene gemeentetaken:10 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510226

Gemeente Opmeer/Algemene gemeentetaken:10 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510274

Gemeente Aalsmeer/Algemene gemeentetaken:10 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0358 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Gemeente Zwartewaterland/Algemene gemeentetaken:10 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1896 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Zorgverzekeraar Zorg en Zekerheid:9 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 603901

Koninklijke Nederlandse Akademie van Wetenschappen (KNAW)/NIDI/GGS-onderzoek:1 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '07.70.10 Inschrijving:Indicatie geheim' == 0 )

Pensioenuitvoerders via Achmea Pensioenservices:10 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

Samenwerkingsverband Regio Gooi en Vechtstreek/Leerlingzaken:9 - spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0003 && '01.03.10 Persoon:Geboortedatum' > TODAY - 0023 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0317 || 0376 || 0402 || 0406 || 0417 || 1696 || 1942 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Samenwerkingsverband Regio Gooi en Vechtstreek/Leerlingzaken:9 - selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0003 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0023 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0317 || 0376 || 0402 || 0406 || 0417 || 1696 || 1942 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van BZK/RvIG/Aanpak adreskwaliteit/Raadpleging voor gemeenten (op BSN):8 - selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer'

Min. van BZK/RvIG/Register vermiste of vervallen reisdocumenten (3):2 - spontaan
( NOT ISNULL '51.01.10 Persoon*:A-nummer' && ( '01.01.10 Persoon:A-nummer' != '51.01.10 Persoon*:A-nummer' ) && NOT ISNULL '12.35.10 Reisdocument:Soort Nederlands reisdocument' ) && ( '12.35.10 Reisdocument:Soort Nederlands reisdocument' != "RD" && "RM" && "RV" && "R1" && "R2" )

Hulpverleningsdienst Gelderland-Midden (JGZ/overig):16 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0202 || 0203 || 0221 || 0226 || 0228 || 0267 || 0274 || 0275 || 0277 || 0279 || 0289 || 0293 || 0299 || 1705 || 1734 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Den Haag (JGZ/overig):3 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0518 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Medemblik/Algemene gemeentetaken:11 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0420 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

Erasmus MC/Afdeling Maatschappelijke Gezondheidszorg/ROBINSCA-studie:3 - selectie
( ( '01.04.10 Persoon:Geslachtsaanduiding' == "V" && ( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0055 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0075 ) ) || ( '01.04.10 Persoon:Geslachtsaanduiding' == "M" && ( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0045 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0075 ) ) ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0005 || 0009 || 0014 || 0017 || 0018 || 0022 || 0025 || 0040 || 0053 || 0056 || 1699 || 1730 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Erasmus MC/Afdeling Maatschappelijke Gezondheidszorg/ROBINSCA-studie:3 - ad hoc
( '01.04.10 Persoon:Geslachtsaanduiding' == "V" && ( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0055 ) ) || ( '01.04.10 Persoon:Geslachtsaanduiding' == "M" && ( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0045 ) )

Wageningen Universiteit/COLON-studie:2 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

Samenwerkingsverband WerkSaam Westfriesland/Sociale voorzieningen:3 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 414701

Belastingkantoor Oost-Brabant/Gemeentelijke en waterschapsbelastingen:1 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0743 || 0755 || 0762 || 0794 || 0796 || 0797 || 0828 || 0847 || 1652 || 1659 || 1721 || 1948 || 1982 || 1991 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0845 && '08.11.60 Verblijfsplaats:Postcode' == "5258/*" || "5271TB" || "5271TE" || "5271TH" || "5271TJ" || "5271TK" || "5271VZ" || "5271X/*" || "5271ZB" || "5271ZC" || "5275/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0865 && '08.11.60 Verblijfsplaats:Postcode' == "5264NZ" || "5264PB" || "5266AZ" || "5266LZ" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0867 && '08.11.60 Verblijfsplaats:Postcode' == "5145/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1771 && '08.11.60 Verblijfsplaats:Postcode' == "5731/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor Oost-Brabant/Gemeentelijke en waterschapsbelastingen:1 - selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 252001 ) && ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) )

Gemeente Zoetermeer/Algemene gemeentetaken:9 - selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0637 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )

MvEL&I/REBUS:6 - ad hoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999

GGD Midden-Nederland (JGZ/overig):15 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0307 || 0308 || 0310 || 0312 || 0313 || 0317 || 0321 || 0327 || 0331 || 0335 || 0339 || 0340 || 0342 || 0345 || 0351 || 0352 || 0353 || 0355 || 0356 || 0589 || 0632 || 0736 || 1581 || 1904 || 1961 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

GGD Midden-Nederland (JGZ/overig):15 - selectie
( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1961 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van VWS/RIVM/Rijksvaccinatieprogramma en neonatale screening:14 - spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 00190000 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Min. van VWS/RIVM/Rijksvaccinatieprogramma en neonatale screening:14 - selectie
( ( '01.03.10 Persoon:Geboortedatum' < SELECTION-DATE - 0018 ) && ( '01.03.10 Persoon:Geboortedatum' >= SELECTION-DATE - 0026 ) ) && ( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 601202 )

Gemeente Aalsmeer via Belastingkantoor Amstelland/Gemeentelijke belastingen:3 - spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0358 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Gemeente Aalsmeer via Belastingkantoor Amstelland/Gemeentelijke belastingen:3 - selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'

Kadaster:13 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 650101

Belastingkantoor GBLT/Gemeentelijke en waterschapsbelastingen:21 - spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0034 || 0050 || 0109 || 0118 || 0119 || 0141 || 0147 || 0148 || 0150 || 0153 || 0158 || 0160 || 0163 || 0164 || 0166 || 0168 || 0171 || 0173 || 0175 || 0177 || 0180 || 0183 || 0184 || 0189 || 0193 || 0197 || 0200 || 0203 || 0213 || 0221 || 0222 || 0226 || 0228 || 0230 || 0232 || 0233 || 0243 || 0244 || 0246 || 0262 || 0267 || 0269 || 0273 || 0274 || 0275 || 0277 || 0279 || 0285 || 0289 || 0293 || 0294 || 0299 || 0301 || 0302 || 0303 || 0307 || 0308 || 0313 || 0317 || 0327 || 0339 || 0342 || 0345 || 0351 || 0995 || 1509 || 1586 || 1690 || 1700 || 1701 || 1708 || 1731 || 1735 || 1742 || 1773 || 1774 || 1859 || 1876 || 1896 || 1955 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0106 && '08.11.60 Verblijfsplaats:Postcode' == "9405C/*" || "9405P/*" || "9405R/*" || "9406X/*" || "9408/*" || "9489T/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0114 && '08.11.60 Verblijfsplaats:Postcode' == "776/*" || "781/*" || "782/*" || "7831/*" || "7833/*" || "7844/*" || "7885/*" || "7887/*" || "7891/*" || "7892A/*" || "7894/*" || "7895/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0202 && '08.11.60 Verblijfsplaats:Postcode' == "681/*" || "682/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0340 && '08.11.60 Verblijfsplaats:Postcode' == "3911/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0355 && '08.11.60 Verblijfsplaats:Postcode' == "3734D/*" || "3734M/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1581 && '08.11.60 Verblijfsplaats:Postcode' == "3951/*" || "3953/*" || "3956K/*" || "3959A/*" || "3959B/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1680 && '08.11.60 Verblijfsplaats:Postcode' == "9443P/*" || "9443T/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1681 && '08.11.60 Verblijfsplaats:Postcode' == "7858/*" || "7859/*" || "7871/*" || "7872/*" || "7873/*" || "7874/*" || "7875/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1699 && '08.11.60 Verblijfsplaats:Postcode' == "9336T/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1940 && '08.11.60 Verblijfsplaats:Postcode' == "8531/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

Belastingkantoor GBLT/Gemeentelijke en waterschapsbelastingen:21 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 254001

Gemeente Purmerend/Algemene gemeentetaken:11 - selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 510305 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 0439 )

MvVWS/Verwijsindex Risicojongeren:5 - selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 609901 && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'

MvVWS/Verwijsindex Risicojongeren:5 - ad hoc
( '01.03.10 Persoon:Geboortedatum' > TODAY - 00230000 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
