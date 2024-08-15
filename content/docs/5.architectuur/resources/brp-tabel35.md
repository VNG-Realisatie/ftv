---
weight: 20
type: 'docs'
title: 'RvIG / BRP - tabel 35'
---

# Tabel 35 - voorwaarden uitvergroot

## Belastingkantoor
### Belastingkantoor BghU/Gemeentelijke en waterschapsbelastingen (252603)
#### selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 252601 ) && ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) )
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0310 || 0312 || 0321 || 0331 || 0335 || 0340 || 0344 || 0352 || 0353 || 0355 || 0356 || 0589 || 0632 || 1581 || 1904 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor BsGW Limburg/Gemeentelijke en waterschapsbelastingen (250103)
#### selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 250101 ) && ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) )
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0882 || 0888 || 0889 || 0893 || 0899 || 0907 || 0917 || 0928 || 0935 || 0938 || 0944 || 0946 || 0957 || 0965 || 0971 || 0981 || 0983 || 0984 || 0986 || 0988 || 0994 || 1507 || 1640 || 1641 || 1669 || 1711 || 1729 || 1883 || 1894 || 1903 || 1954 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor Cocensus/Gemeentelijke belastingen (254201)
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0361 || 0373 || 0375 || 0383 || 0392 || 0394 || 0399 || 0400 || 0431 || 0450 || 0534 || 0880 || 1980 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor GBLT/Gemeentelijke en waterschapsbelastingen (254001)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 254001
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0034 || 0050 || 0109 || 0118 || 0119 || 0141 || 0147 || 0148 || 0150 || 0153 || 0158 || 0160 || 0163 || 0164 || 0166 || 0168 || 0171 || 0173 || 0175 || 0177 || 0180 || 0183 || 0184 || 0189 || 0193 || 0197 || 0200 || 0203 || 0213 || 0221 || 0222 || 0226 || 0228 || 0230 || 0232 || 0233 || 0243 || 0244 || 0246 || 0262 || 0267 || 0269 || 0273 || 0274 || 0275 || 0277 || 0279 || 0285 || 0289 || 0293 || 0294 || 0299 || 0301 || 0302 || 0303 || 0307 || 0308 || 0313 || 0317 || 0327 || 0339 || 0342 || 0345 || 0351 || 0995 || 1509 || 1586 || 1690 || 1700 || 1701 || 1708 || 1731 || 1735 || 1742 || 1773 || 1774 || 1859 || 1876 || 1896 || 1955 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0106 && '08.11.60 Verblijfsplaats:Postcode' == "9405C/*" || "9405P/*" || "9405R/*" || "9406X/*" || "9408/*" || "9489T/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0114 && '08.11.60 Verblijfsplaats:Postcode' == "776/*" || "781/*" || "782/*" || "7831/*" || "7833/*" || "7844/*" || "7885/*" || "7887/*" || "7891/*" || "7892A/*" || "7894/*" || "7895/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0202 && '08.11.60 Verblijfsplaats:Postcode' == "681/*" || "682/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0340 && '08.11.60 Verblijfsplaats:Postcode' == "3911/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0355 && '08.11.60 Verblijfsplaats:Postcode' == "3734D/*" || "3734M/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1581 && '08.11.60 Verblijfsplaats:Postcode' == "3951/*" || "3953/*" || "3956K/*" || "3959A/*" || "3959B/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1680 && '08.11.60 Verblijfsplaats:Postcode' == "9443P/*" || "9443T/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1681 && '08.11.60 Verblijfsplaats:Postcode' == "7858/*" || "7859/*" || "7871/*" || "7872/*" || "7873/*" || "7874/*" || "7875/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1699 && '08.11.60 Verblijfsplaats:Postcode' == "9336T/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1940 && '08.11.60 Verblijfsplaats:Postcode' == "8531/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor Gouwe-Rijnland/Gemeentelijke en waterschapsbelastingen (250901)
#### selectie
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0453 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0377 || 0392 || 0394 || 0397 || 0453 || 0473 || 0484 || 0513 || 0534 || 0537 || 0546 || 0547 || 0553 || 0569 || 0575 || 0579 || 0626 || 0627 || 0629 || 0638 || 1525 || 1884 || 1901 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0358 && '08.11.60 Verblijfsplaats:Postcode' == "1431/*" || "1432/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0363 && '08.11.60 Verblijfsplaats:Postcode' == "106/*" || "1076/*" || "1081/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0637 && '08.11.60 Verblijfsplaats:Postcode' == "2711/*" || "2713/*" || "2714/*" || "2715/*" || "2716/*" || "2717/*" || "2722/*" || "2723/*" || "2724/*" || "2725/*" || "2726/*" || "2727/*" || "2728/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1916 && '08.11.60 Verblijfsplaats:Postcode' == "226/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor Oost-Brabant/Gemeentelijke en waterschapsbelastingen (252004)
#### selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 252001 ) && ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) )
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0743 || 0755 || 0762 || 0794 || 0796 || 0797 || 0828 || 0847 || 1652 || 1659 || 1721 || 1948 || 1982 || 1991 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0845 && '08.11.60 Verblijfsplaats:Postcode' == "5258/*" || "5271TB" || "5271TE" || "5271TH" || "5271TJ" || "5271TK" || "5271VZ" || "5271X/*" || "5271ZB" || "5271ZC" || "5275/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0865 && '08.11.60 Verblijfsplaats:Postcode' == "5264NZ" || "5264PB" || "5266AZ" || "5266LZ" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0867 && '08.11.60 Verblijfsplaats:Postcode' == "5145/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1771 && '08.11.60 Verblijfsplaats:Postcode' == "5731/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor RBG/Gemeentelijke en waterschapsbelastingen (1) (250701)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 250701
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0502 || 0503 || 0518 || 0542 || 0556 || 0603 || 0606 || 0622 || 1621 || 1783 || 1842 || 1892 || 1926 || 1931 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0599 && '08.11.60 Verblijfsplaats:Postcode' == "2761/*" || "2913/*" || "301/*" || "302/*" || "303/*" || "304/*" || "305/*" || "306/*" || "3071/*" || "3151/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0637 && '08.11.60 Verblijfsplaats:Postcode' == "2712/*" || "2718/*" || "2719/*" || "2721/*" || "2722/*" || "2723/*" || "2728/*" || "2729/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1916 && '08.11.60 Verblijfsplaats:Postcode' == "227/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor RBG/Gemeentelijke en waterschapsbelastingen (2) (250702)
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0513 && '08.11.60 Verblijfsplaats:Postcode' == "2802/*" || "2807/*" || "2808/*" || "2809/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0627 && '08.11.60 Verblijfsplaats:Postcode' == "2741/*" || "2742/*" || "2743/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1916 && '08.11.60 Verblijfsplaats:Postcode' == "2261/*" || "2262/*" || "2264/*" || "2265/*" || "2266/*" || "2267/*" ) ) && '14.40.10 Afnemersindicatie:Afnemersindicatie' != 250701 && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor Rivierenland/Gemeentelijke en waterschapsbelastingen (252901)
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0209 || 0214 || 0216 || 0225 || 0252 || 0263 || 0268 || 0281 || 0296 || 0297 || 0335 || 0352 || 0353 || 0482 || 0512 || 0523 || 0590 || 0610 || 0668 || 1705 || 1734 || 1740 || 1945 || 1959 || 1960 || 1961 || 1978 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0202 && '08.11.60 Verblijfsplaats:Postcode' == "683/*" || "684/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor SaBeWa Zeeland/Gemeentelijke en waterschapsbelastingen (254401)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0654 || 0664 || 0677 || 0678 || 0687 || 0703 || 0715 || 0716 || 0717 || 0718 || 1676 || 1695 || 1714 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor SVHW/Gemeentelijke en waterschapsbelastingen (250201)
#### selectie
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1719 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0482 || 0489 || 0505 || 0523 || 0531 || 0569 || 0597 || 0613 || 0642 || 1621 || 1719 || 1924 || 1930 || 1931 || 1959 || 1963 || 1992 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0599 && '08.11.60 Verblijfsplaats:Postcode' == "307/*" || "308/*" || "318/*" || "319/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor Tribuut/Gemeentelijke belastingen (255203)
#### selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 255201 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0200 || 0213 || 0232 || 0262 || 0285 || 0301 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor Twente/Gemeentelijke belastingen (251503)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 251501
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0141 || 0147 || 0153 || 0158 || 0164 || 0168 || 0173 || 1700 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Belastingkantoor West-Brabant/Gemeentelijke en waterschapsbelastingen (250402)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 250402
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0744 || 0748 || 0758 || 0766 || 0777 || 0779 || 0784 || 0809 || 0826 || 0840 || 0851 || 0867 || 0873 || 0879 || 1655 || 1674 || 1709 || 1719 || 1723 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0785 && '08.11.60 Verblijfsplaats:Postcode' == "5051/*" || "5052/*" || "5133/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0855 && '08.11.60 Verblijfsplaats:Postcode' == "5011/*" || "5015/*" || "5017/*" || "5018/*" || "502/*" || "503/*" || "504/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Noordelijk Belastingkantoor/Gemeentelijke en waterschapsbelastingen (253103)
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0014 || 0037 || 0047 || 0059 || 0060 || 0072 || 0074 || 0080 || 0085 || 0086 || 0088 || 0090 || 0093 || 0096 || 0098 || 0737 || 0765 || 1680 || 1699 || 1730 || 1891 || 1895 || 1900 || 1940 || 1949 || 1950 || 1952 || 1966 || 1969 || 1970 || 1979 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0106 && '08.11.60 Verblijfsplaats:Postcode' == "9401/*" || "9402/*" || "9403/*" || "9404/*" || "9405/*" || "9406/*" || "9407/*" || "9409/*" || "9486/*" || "9487/*" || "9488/*" || "9489/*" || "9492/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0109 && '08.11.60 Verblijfsplaats:Postcode' == "7849/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0114 && '08.11.60 Verblijfsplaats:Postcode' == "7826/*" || "7831/*" || "7881/*" || "7884/*" || "7889/*" || "7895/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1681 && '08.11.60 Verblijfsplaats:Postcode' == "7858/*" || "7859/*" || "7872/*" || "7875/*" || "7876/*" || "7877/*" || "952/*" || "953/*" || "9564/*" || "957/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1731 && '08.11.60 Verblijfsplaats:Postcode' == "9414/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
## Bevolkingsonderzoek
### Bevolkingsonderzoek Nederland (624001)
#### selectie
( ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "O" || "V" ) && ( ( '01.03.10 Persoon:Geboortedatum' == SELECTION-DATE - 0029 ) || ( '01.03.10 Persoon:Geboortedatum' == SELECTION-DATE - 0049 ) ) ) || ( '01.03.10 Persoon:Geboortedatum' == SELECTION-DATE - 0054 ) ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'
#### spontaan
( ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "O" || "V" ) && ( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0029 ) ) || ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "M" ) && ( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0054 ) ) ) && ( '01.03.10 Persoon:Geboortedatum' >= TODAY - 0075 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'
## Bureau
### Bureau Financieel Toezicht (701701)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
## CBS
### CBS11: Toerismestatistieken Caribisch Nederland (BES) (400120)
#### adhoc
( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) || ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" )
### CBS1: Structuurtelling (selectie) (400101)
#### selectie
ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.10 Inschrijving:Datum opschorting bijhouding' >= 19941001 )
### CBS2: Vestiging en Verhuizing (400112)
#### spontaan
'01.03.10 Persoon:Geboortedatum' != '08.10.30 Verblijfsplaats:Datum aanvang adreshouding'
### CBS3: Geboorte en Afstamming (kind) (400113)
#### spontaan
( ( '01.03.10 Persoon:Geboortedatum' == '08.10.30 Verblijfsplaats:Datum aanvang adreshouding' ) || ( '02.62.10 Ouder1:Datum ingang familierechtelijke betrekking' > '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) || ( '03.62.10 Ouder2:Datum ingang familierechtelijke betrekking' > '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) || ( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999 )
### CBS4: Geb. & Afstamming (ouder) (400114)
#### spontaan
( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' || '09.85.10 Kind:Ingangsdatum geldigheid' > '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) && '09.85.10 Kind:Ingangsdatum geldigheid' > '07.68.10 Inschrijving:Datum eerste inschrijving BRP'
### CBS6: Huwelijk/gereg.partnerschap (400116)
#### spontaan
( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' || '05.85.10 Huwelijk/geregistreerd partnerschap:Ingangsdatum geldigheid' >= '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) && '05.85.10 Huwelijk/geregistreerd partnerschap:Ingangsdatum geldigheid' >= '07.68.10 Inschrijving:Datum eerste inschrijving BRP'
### CBS7: Nationaliteit (400117)
#### spontaan
( '04.85.10 Nationaliteit:Ingangsdatum geldigheid' > '07.68.10 Inschrijving:Datum eerste inschrijving BRP' ) && ( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' || ( '04.85.10 Nationaliteit:Ingangsdatum geldigheid' > '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' ) )
### CBS9: A-nummer/Burgerservicenummer (400119)
#### spontaan
( NOT ISNULL '51.01.10 Persoon*:A-nummer' && ( '01.01.10 Persoon:A-nummer' != '51.01.10 Persoon*:A-nummer' ) ) || ( NOT ISNULL '51.01.20 Persoon*:Burgerservicenumer' && ( '01.01.20 Persoon:Burgerservicenumer' != '51.01.20 Persoon*:Burgerservicenumer' ) )
## Centraal
### Centraal Bureau voor Genealogie (CBG) (400201)
#### adhoc
( NOT ISNULL '06.08.10 Overlijden:Datum overlijden' ) && ( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999 ) || ( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1999 ) && ( ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) || ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) ) ) )
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 400201
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999 ) || ( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1999 ) && ( ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) || ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) ) )
## Centrum
### Centrum voor Jeugd en Gezin Apeldoorn (622001)
#### selectie
( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 00180000 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0200 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 00180000 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0200 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'
## Dienst
### Dienst Gezondheid & Jeugd Zuid-Holland Zuid (EPI) (610903)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0482 || 0505 || 0512 || 0523 || 0531 || 0590 || 0610 || 0642 || 1963 || 1978 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Dienst Gezondheid & Jeugd Zuid-Holland Zuid (JGZ/overig) (610902)
#### selectie
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1961
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0482 || 0505 || 0512 || 0523 || 0531 || 0590 || 0610 || 0642 || 1963 || 1978 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
## DSW
### DSW Zorgverzekeraar (601101)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 601101
## DUO/Inning
### DUO/Inning en Incasso (890203)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
## eFormulieren
### eFormulieren - Gemeente Hoorn (450601)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
## Fiom
### Fiom (300401)
#### selectie
( '01.03.10 Persoon:Geboortedatum' > 19741231 && '01.03.10 Persoon:Geboortedatum' <= 19831209 ) && ( '01.03.30 Persoon:Geboorteland' == /5021|5038|6015|7015|7038/ ) && ( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' || '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' <= 20011231 || '58.14.20 Verblijfsplaats*:Datum vestiging in Nederland' <= 20011231 )
## Gemeenschappelijke
### Gemeenschappelijke regeling Drechtsteden (254301)
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0505 || 0531 || 0590 || 0610 || 0642 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Gemeenschappelijke regeling Meerinzicht belastingsamenwerking (255401)
#### selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer' && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0050 || 0233 || 0243 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
## Gemeente
### Gemeente 's-Gravenhage/Algemene gemeentetaken (1) (510048)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510048
### Gemeente 's-Gravenhage/Algemene gemeentetaken (2) (510188)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0518 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente 's-Gravenhage/Landelijke Taken/Kiezers buiten Nederland  (2) (451702)
#### selectie
( '01.03.10 Persoon:Geboortedatum' == SELECTION-DATE - 001701 ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 || '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) && ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" || "R" ) && ( NOT ISNULL '08.13.40 Verblijfsplaats:Regel 2 adres buitenland' )
#### spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 00170000 ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) && ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" || "R" ) && ( NOT ISNULL '08.13.40 Verblijfsplaats:Regel 2 adres buitenland' )
### Gemeente 's-Gravenhage/Landelijke Taken/Kiezers buiten Nederland (1) (451701)
#### adhoc
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 00170000 ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) && ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" || "R" )
#### selectie
( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) && ( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 451701 )
### Gemeente 's-Hertogenbosch/Algemene gemeentetaken (510312)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0796 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Aalsmeer via Belastingkantoor Amstelland/Gemeentelijke belastingen (256203)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0358 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Gemeente Aalsmeer/Algemene gemeentetaken (510314)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0358 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Aalten/Algemene gemeentetaken (510215)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510215
### Gemeente Altena/Algemene gemeentetaken (510453)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1959 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Amstelveen via Belastingkantoor Amstelland/Gemeentelijke belastingen (256303)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0362 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Gemeente Amstelveen/Algemene gemeentetaken (510256)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0362 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Amsterdam/Algemene gemeentetaken (510193)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0363 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Berkelland via Belastingkantoor Twente/Gemeentelijke belastingen (257003)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 257001
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1859 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Gemeente Bernheze/Algemene gemeentetaken (510437)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1721 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Borne/Algemene gemeentetaken (510250)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0147 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Boxtel/Algemene gemeentetaken (510244)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0757 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Bronckhorst via Belastingkantoor Twente/Gemeentelijke belastingen (257103)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 257101
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1876 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Gemeente De Ronde Venen via Belastingkantoor Amstelland/Gem. belastingen (256103)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0736 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Gemeente Deventer/Algemene gemeentetaken (510082)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0150 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Diemen via Belastingkantoor Amstelland/Gemeentelijke belastingen (256503)
#### selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 256501 ) && ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) )
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0384 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Gemeente Doetinchem/Algemene gemeentetaken (510303)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0222 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Geldrop-Mierlo/Algemene gemeentetaken (510077)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510077
### Gemeente Gouda/Algemene gemeentetaken (510331)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0513 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Groningen/Algemene gemeentetaken (510014)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0014 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Haarlemmermeer/Algemene gemeentetaken (510053)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0394 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Helmond/Algemene gemeentetaken (510245)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0794 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Hilversum/Algemene gemeentetaken (510226)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510226
### Gemeente Hof van Twente/Burgerzakentaken (173501)
#### selectie
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0142 || 0151 || 0156 || 0169 || 0179 || 1735
### Gemeente Hollands Kroon/Algemene gemeentetaken (510413)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1911 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Horst aan de Maas/Algemene gemeentetaken (510260)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1507 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Katwijk/Algemene gemeentetaken (510270)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510270
### Gemeente Koggenland/Algemene gemeentetaken (510173)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1598 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Lelystad/Algemene gemeentetaken (510330)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0995 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Leudal/Algemene gemeentetaken (510182)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1640 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Lingewaard/Algemene gemeentetaken (510230)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1705 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Maassluis/Algemene gemeentetaken (510419)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0556 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Medemblik/Algemene gemeentetaken (510163)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0420 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Midden-Groningen/Algemene gemeentetaken (510197)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1952 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Montferland/Algemene gemeentetaken (510049)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1955 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Montfoort/Algemene gemeentetaken (510410)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0335 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Noordwijk/Algemene gemeentetaken (510058)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510058
### Gemeente Nuenen, Gerwen en Nederwetten/Algemene gemeentetaken (510138)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510138
### Gemeente Opmeer/Algemene gemeentetaken (510274)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510274
### Gemeente Ouder-Amstel via Belastingkantoor Amstelland/Gemeentelijke belastingen (256003)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0437 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Gemeente Peel en Maas/Algemene gemeentetaken (510266)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1894 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Purmerend/Algemene gemeentetaken (510186)
#### selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 510305 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 0439 )
### Gemeente Raalte/Algemene gemeentetaken (510391)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510391
### Gemeente Rotterdam/Algemene gemeentetaken (510001)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0599 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Schiedam/Algemene gemeentetaken (510358)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0606 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Sint-Michielsgestel/Algemene gemeentetaken (510287)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0845 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Son en Breugel/Algemene gemeentetaken (510365)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510365
### Gemeente Uithoorn via Belastingkantoor Amstelland/Gemeentelijke belastingen (256403)
#### selectie
( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 256401 ) && ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) )
#### spontaan
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0451 ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Gemeente Venlo/Algemene gemeentetaken (510228)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0983 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Voorschoten/Algemene gemeentetaken (510221)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 510221
### Gemeente Westland/Algemene gemeentetaken (510278)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1783 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Zaanstad/Algemene gemeentetaken (510123)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0479 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Zaltbommel/Algemene gemeentetaken (510209)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0297 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Zoetermeer/Algemene gemeentetaken (510352)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 0637 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
### Gemeente Zwartewaterland/Algemene gemeentetaken (510247)
#### selectie
ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '16.09.10 Tijdelijk verblijfadres:Gemeente van inschrijving' == 1896 ) && ( ISNULL '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' || ( '16.18.10 Tijdelijk verblijfadres:Einddatum geldigheid' > SELECTION-DATE - 00000000 ) )
## Gemeenten
### Gemeenten en samenwerkingsverbanden via Inlichtingenbureau/Werk en inkomen (651001)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
## GGD
### GGD Amsterdam-Amstelland (EPI) (613002)
#### selectie
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0358 || 0362 || 0363 || 0384 || 0437 || 0451 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Amsterdam-Amstelland (JGZ/overig) (613001)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0358 || 0362 || 0363 || 0384 || 0437 || 0451 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Brabant-Zuidoost (EPI) (614803)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0743 || 0753 || 0762 || 0770 || 0772 || 0794 || 0820 || 0823 || 0847 || 0848 || 0858 || 0861 || 0866 || 1652 || 1658 || 1659 || 1667 || 1706 || 1724 || 1728 || 1771 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Brabant-Zuidoost (JGZ/overig) (614802)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0743 || 0753 || 0762 || 0770 || 0772 || 0794 || 0820 || 0823 || 0847 || 0848 || 0858 || 0861 || 0866 || 1652 || 1658 || 1659 || 1667 || 1706 || 1724 || 1728 || 1771 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Den Haag (JGZ/overig) (614701)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0518 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Den Haag (OGGZ) (614702)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
### GGD Drenthe (615102)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0106 || 0109 || 0114 || 0118 || 0119 || 1680 || 1681 || 1690 || 1699 || 1701 || 1730 || 1731 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Flevoland (JGZ/overig) (611902)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0034 || 0050 || 0171 || 0184 || 0303 || 0995 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Fryslân (JGZ/overig) (610202)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0059 || 0060 || 0072 || 0074 || 0080 || 0085 || 0086 || 0088 || 0090 || 0093 || 0096 || 0098 || 0737 || 1891 || 1900 || 1940 || 1949 || 1970 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Gelderland-Zuid (EPI) (610502)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0209 || 0214 || 0216 || 0225 || 0252 || 0263 || 0268 || 0281 || 0296 || 0297 || 0668 || 0944 || 1740 || 1945 || 1960 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Gelderland-Zuid (JGZ/overig) (610501)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0018 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0209 || 0214 || 0216 || 0225 || 0252 || 0263 || 0268 || 0281 || 0296 || 0297 || 0668 || 0944 || 1740 || 1945 || 1960 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Gooi en Vechtstreek (JGZ/overig) (613303)
#### selectie
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0457
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0376 || 0402 || 0406 || 0417 || 1696 || 1942 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Groningen (JGZ/overig) (612002)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0014 || 0037 || 0047 || 0765 || 1895 || 1950 || 1952 || 1966 || 1969 || 1979 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Hart voor Brabant (EPI) (613602)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0755 || 0757 || 0766 || 0784 || 0785 || 0796 || 0797 || 0798 || 0809 || 0824 || 0828 || 0845 || 0855 || 0865 || 0867 || 1721 || 1948 || 1982 || 1991 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Hart voor Brabant (JGZ/overig) (613603)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0755 || 0757 || 0766 || 0784 || 0785 || 0796 || 0797 || 0798 || 0809 || 0824 || 0828 || 0845 || 0855 || 0865 || 0867 || 1721 || 1948 || 1982 || 1991 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Hollands Noorden (EPI) (614403)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0361 || 0373 || 0383 || 0388 || 0399 || 0400 || 0405 || 0420 || 0432 || 0441 || 0448 || 0498 || 0532 || 1598 || 1911 || 1980 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Hollands Noorden (JGZ/overig) (612301)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0361 || 0373 || 0383 || 0388 || 0399 || 0400 || 0405 || 0420 || 0432 || 0441 || 0448 || 0498 || 0532 || 1598 || 1911 || 1980 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD IJsselland (EPI) (611102)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0148 || 0150 || 0160 || 0166 || 0175 || 0177 || 0180 || 0193 || 1708 || 1773 || 1896 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD IJsselland (JGZ/overig) (611101)
#### selectie
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0244
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0148 || 0150 || 0160 || 0166 || 0175 || 0177 || 0180 || 0193 || 1708 || 1773 || 1896 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Kennemerland (EPI) (614202)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0375 || 0377 || 0392 || 0394 || 0396 || 0397 || 0450 || 0453 || 0473 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Kennemerland (JGZ/overig) (614102)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0375 || 0377 || 0392 || 0394 || 0396 || 0397 || 0450 || 0453 || 0473 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Limburg-Noord (EPI) (612503)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0889 || 0893 || 0907 || 0946 || 0957 || 0983 || 0984 || 0988 || 1507 || 1640 || 1641 || 1669 || 1711 || 1894 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Limburg-Noord (JGZ/overig) (612502)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0889 || 0893 || 0907 || 0946 || 0957 || 0983 || 0984 || 0988 || 1507 || 1640 || 1641 || 1669 || 1711 || 1894 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Midden-Nederland (EPI) (611002)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0307 || 0308 || 0310 || 0312 || 0313 || 0317 || 0321 || 0327 || 0331 || 0335 || 0339 || 0340 || 0342 || 0345 || 0351 || 0352 || 0353 || 0355 || 0356 || 0589 || 0632 || 0736 || 1581 || 1904 || 1961 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Midden-Nederland (JGZ/overig) (611501)
#### selectie
( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1961 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0307 || 0308 || 0310 || 0312 || 0313 || 0317 || 0321 || 0327 || 0331 || 0335 || 0339 || 0340 || 0342 || 0345 || 0351 || 0352 || 0353 || 0355 || 0356 || 0589 || 0632 || 0736 || 1581 || 1904 || 1961 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Noord- en Oost-Gelderland (EPI) (610302)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0197 || 0200 || 0213 || 0222 || 0230 || 0232 || 0233 || 0243 || 0244 || 0246 || 0262 || 0269 || 0273 || 0285 || 0294 || 0301 || 0302 || 1509 || 1586 || 1859 || 1876 || 1955 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Nrd- en Oost-Gelderland (JGZ/overig) (612201)
#### selectie
( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0244 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0197 || 0200 || 0213 || 0222 || 0230 || 0232 || 0233 || 0243 || 0244 || 0246 || 0262 || 0269 || 0273 || 0285 || 0294 || 0301 || 0302 || 1509 || 1586 || 1859 || 1876 || 1955 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Regio Twente (EPI) (613502)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0141 || 0147 || 0153 || 0158 || 0163 || 0164 || 0168 || 0173 || 0183 || 0189 || 1700 || 1735 || 1742 || 1774 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Rotterdam-Rijnmond (EPI) (612702)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0489 || 0502 || 0542 || 0556 || 0597 || 0599 || 0606 || 0613 || 0622 || 1621 || 1924 || 1930 || 1992 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Rotterdam-Rijnmond (JGZ/overig) (612703)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0489 || 0502 || 0542 || 0556 || 0597 || 0599 || 0606 || 0613 || 0622 || 1621 || 1924 || 1930 || 1992 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Twente (JGZ/overig) (613503)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0141 || 0147 || 0153 || 0158 || 0163 || 0164 || 0168 || 0173 || 0183 || 0189 || 1700 || 1735 || 1742 || 1774 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Utrecht (JGZ/overig) (614601)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0344 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD West-Brabant (EPI) (611402)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0744 || 0748 || 0758 || 0777 || 0779 || 0826 || 0840 || 0851 || 0873 || 0879 || 1655 || 1674 || 1709 || 1719 || 1723 || 1959 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD West-Brabant (JGZ/overig) (611403)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0744 || 0748 || 0758 || 0777 || 0779 || 0826 || 0840 || 0851 || 0873 || 0879 || 1655 || 1674 || 1709 || 1719 || 1723 || 1959 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Zaanstreek-Waterland (EPI) (614302)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0385 || 0415 || 0431 || 0439 || 0479 || 0852 || 0880 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Zaanstreek-Waterland (JGZ/overig) (614301)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0385 || 0415 || 0431 || 0439 || 0479 || 0852 || 0880 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Zeeland (EPI) (610703)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0654 || 0664 || 0677 || 0678 || 0687 || 0703 || 0715 || 0716 || 0717 || 0718 || 1676 || 1695 || 1714 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Zeeland (JGZ/overig) (610702)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0654 || 0664 || 0677 || 0678 || 0687 || 0703 || 0715 || 0716 || 0717 || 0718 || 1676 || 1695 || 1714 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Zuid-Holland West (611301)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0503 || 0603 || 0629 || 0637 || 1783 || 1842 || 1916 || 1926 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Zuid-Holland West (EPI) (611303)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0503 || 0603 || 0629 || 0637 || 1783 || 1842 || 1916 || 1926 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### GGD Zuid-Limburg (JGZ/overig) (610601)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0882 || 0888 || 0899 || 0917 || 0928 || 0935 || 0938 || 0965 || 0971 || 0981 || 0986 || 0994 || 1729 || 1883 || 1903 || 1954 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### RDOG GGD Hollands Midden (JGZ/overig) (610401)
#### selectie
( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0484 || 0513 || 0534 || 0537 || 0546 || 0547 || 0553 || 0569 || 0575 || 0579 || 0626 || 0627 || 0638 || 1525 || 1884 || 1892 || 1901 || 1931 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0484 || 0513 || 0534 || 0537 || 0546 || 0547 || 0553 || 0569 || 0575 || 0579 || 0626 || 0627 || 0638 || 1525 || 1884 || 1892 || 1901 || 1931 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
## Hoogheemraadschap
### Hoogheemraadschap Hollands Noorderkwartier (251101)
#### selectie
( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0363 && '08.11.60 Verblijfsplaats:Postcode' == "1022K/*" || "1022L/*" ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0361 || 0373 || 0375 || 0383 || 0385 || 0388 || 0396 || 0399 || 0400 || 0405 || 0415 || 0420 || 0431 || 0432 || 0439 || 0441 || 0448 || 0450 || 0479 || 0498 || 0532 || 0852 || 0880 || 1598 || 1911 || 1980 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0363 && '08.11.60 Verblijfsplaats:Postcode' == "1022K/*" || "1022L/*" || "1023/*" || "1024/*" || "1025/*" || "1026/*" || "1027/*" || "1028/*" || "1033/*" || "1034/*" || "1035/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0453 && '08.11.60 Verblijfsplaats:Postcode' == "1951/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
## Hulpverleningsdienst
### Hulpverleningsdienst Gelderland-Midden (EPI) (611602)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0202 || 0203 || 0221 || 0226 || 0228 || 0267 || 0274 || 0275 || 0277 || 0279 || 0289 || 0293 || 0299 || 1705 || 1734 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Hulpverleningsdienst Gelderland-Midden (JGZ/overig) (611601)
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 0019 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0202 || 0203 || 0221 || 0226 || 0228 || 0267 || 0274 || 0275 || 0277 || 0279 || 0289 || 0293 || 0299 || 1705 || 1734 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
## Integraal
### Integraal Kankercentrum Nederland (IKNL) (605301)
#### adhoc
( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" ) || ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "O" && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999 || ( NOT ISNULL '58.09.10 Verblijfsplaats*:Gemeente van inschrijving' && '58.09.10 Verblijfsplaats*:Gemeente van inschrijving' != 1999 ) ) )
#### selectie
( ( '07.67.10 Inschrijving:Datum opschorting bijhouding' >= SELECTION-DATE - 0001 ) && ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" ) ) || ( ( '07.67.10 Inschrijving:Datum opschorting bijhouding' >= SELECTION-DATE - 0001 ) && '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "O" && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999 || ( NOT ISNULL '58.09.10 Verblijfsplaats*:Gemeente van inschrijving' && '58.09.10 Verblijfsplaats*:Gemeente van inschrijving' != 1999 ) ) )
## Kadaster
### Kadaster (650101)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 650101
## Kamer
### Kamer van Koophandel (450101)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 450101
## KNAW
### KNAW/Meertens Instituut/Voornamen-onderzoek (400301)
#### selectie
( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) || ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" )
### Koninklijke Nederlandse Akademie van Wetenschappen (KNAW)/NIDI/GGS-onderzoek (607505)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '07.70.10 Inschrijving:Indicatie geheim' == 0 )
## Ministerie
### Ministerie van BZK/Logius/MijnOverheid Berichtenbox (1) (451501)
#### selectie
( ( '01.03.10 Persoon:Geboortedatum' < SELECTION-DATE - 001309 ) && ( '01.03.10 Persoon:Geboortedatum' != 00000000 ) ) && ( ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' ) || ( ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" || "R" ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 || '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) ) )
#### spontaan
( ( '01.03.10 Persoon:Geboortedatum' < TODAY - 001309 ) && ( '01.03.10 Persoon:Geboortedatum' != 00000000 ) ) && ( ( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' ) || ( ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M" || "R" ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 || '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" ) ) )
### Ministerie van BZK/Logius/Overheidstoegangsvoorziening DigiD (1) (250002)
#### selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'
### Ministerie van BZK/Logius/Overheidstoegangsvoorziening DigiD (2) (250005)
#### selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && ISNULL '06.08.10 Overlijden:Datum overlijden'
### Ministerie van BZK/RvIG/Aanpak adreskwaliteit/Raadpleging voor gemeenten (op A-nummer) (451403)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
### Ministerie van BZK/RvIG/Aanpak adreskwaliteit/Raadpleging voor gemeenten (op BSN) (451402)
#### selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer'
### Ministerie van BZK/RvIG/Authenticatie publieke dienstverlening Nederland (vanuit EER) (451901)
#### selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer'
### Ministerie van BZK/RvIG/Basisregister reisdocumenten (1) (891901)
#### selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer'
#### spontaan
KLOPT1: ( '12.35.10@A' != "RD" && "RM" && "RV" && "R1" && "R2" ) && NOT ISNULL '12.35.70@A'
### Ministerie van BZK/RvIG/Basisregister reisdocumenten (2) (891902)
#### spontaan
NOT ISNULL '06.08.10 Overlijden:Datum overlijden'
### Ministerie van BZK/RvIG/Basisregister reisdocumenten (3) (891903)
#### selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer'
### Ministerie van BZK/RvIG/PIVA-GBA Koppeling (PGK) (300002)
#### spontaan
( ( '07.67.10 Inschrijving:Datum opschorting bijhouding' >= TODAY - 000001 ) && ( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" ) && ( '08.13.10 Verblijfsplaats:Land adres buitenland' == 5095 || 5106 || 5107 || 5108 || 5109 || 5110 ) ) || ( '08.14.10 Verblijfsplaats:Land vanwaar ingeschreven' == 5095 || 5106 || 5107 || 5108 || 5109 || 5110 )
### Ministerie van BZK/RvIG/Register paspoortsignaleringen (891701)
#### selectie
( kolom1 == '01.01.20 Persoon:Burgerservicenumer' ) && NOT ISNULL '01.01.20 Persoon:Burgerservicenumer'
### Ministerie van BZK/RvIG/Register vermiste of vervallen reisdocumenten (1) (891801)
#### selectie
'12.35.70 Reisdocument:Aanduiding inhouding dan wel vermissing Nederlands reisdocument' == "I" || "R" || "V" || "."
#### spontaan
( '12.35.70 Reisdocument:Aanduiding inhouding dan wel vermissing Nederlands reisdocument' == "R" || "V" ) && ( '12.35.10 Reisdocument:Soort Nederlands reisdocument' != "RD" && "RM" && "RV" && "R1" && "R2" )
### Ministerie van BZK/RvIG/Register vermiste of vervallen reisdocumenten (2) (891802)
#### selectie
( '06.08.10 Overlijden:Datum overlijden' >= 20090101 ) && ( '12.35.50 Reisdocument:Datum einde geldigheid Nederlands reisdocument' > '06.08.10 Overlijden:Datum overlijden' )
#### spontaan
( NOT ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '12.35.50 Reisdocument:Datum einde geldigheid Nederlands reisdocument' > TODAY - 00000000 ) ) && ( '12.35.10 Reisdocument:Soort Nederlands reisdocument' != "RD" && "RM" && "RV" && "R1" && "R2" )
### Ministerie van BZK/RvIG/Register vermiste of vervallen reisdocumenten (3) (891803)
#### spontaan
( NOT ISNULL '51.01.10 Persoon*:A-nummer' && ( '01.01.10 Persoon:A-nummer' != '51.01.10 Persoon*:A-nummer' ) && NOT ISNULL '12.35.10 Reisdocument:Soort Nederlands reisdocument' ) && ( '12.35.10 Reisdocument:Soort Nederlands reisdocument' != "RD" && "RM" && "RV" && "R1" && "R2" )
### Ministerie van BZK/Verkiezingen Europees Parlement (450902)
#### selectie
( '04.05.10 Nationaliteit:Nationaliteit' == 0027 || 0028 || 0042 || 0043 || 0044 || 0045 || 0046 || 0052 || 0053 || 0054 || 0055 || 0056 || 0057 || 0059 || 0061 || 0062 || 0064 || 0067 || 0068 || 0071 || 0072 || 0073 || 0074 || 0077 || 0080 || 0308 ) && ( '13.31.10 Kiesrecht:Aanduiding Europees kiesrecht' == 2 ) && ( '13.31.20 Kiesrecht:Datum verzoek of mededeling Europees kiesrecht' < 20240424 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'
### Ministerie van Defensie/Taken inzake dienstplicht en veteranenzorg (890001)
#### adhoc
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0017 ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 )
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0017 ) && ( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0035 ) && ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "M" ) || ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "O" || "V" ) && ( '01.03.10 Persoon:Geboortedatum' >= 20030000 ) ) ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '64.40.10 Afnemersindicatie*:Afnemersindicatie' != 890001 )
#### spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0017 ) && ( '01.03.10 Persoon:Geboortedatum' > TODAY - 0035 ) && ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "M" ) || ( ( '01.04.10 Persoon:Geslachtsaanduiding' == "O" || "V" ) && ( '01.03.10 Persoon:Geboortedatum' >= 20030000 ) ) ) && ( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '64.40.10 Afnemersindicatie*:Afnemersindicatie' != 890001 )
### Ministerie van EL&I
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
### Ministerie van Financiën/Belastingdienst (250001)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 250001
### Ministerie van I&M
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
### Ministerie van JenV via DSW Zorgverzekeraar/Zorgverzekering ontheemden Oekraïne (700005)
#### selectie
'10.39.10 Verblijfstitel:Aanduiding verblijfstitel' == 46 && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding'
#### spontaan
'10.39.10 Verblijfstitel:Aanduiding verblijfstitel' == 46
### Ministerie van JenV/Immigratie- en Naturalisatiedienst/Taken inzake Nederlanders (700301)
#### adhoc
( '04.05.10 Nationaliteit:Nationaliteit' == 0001 ) || ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' == "B" )
### Ministerie van JenV/Immigratie- en Naturalisatiedienst/Taken inzake vreemdelingen (700302)
#### adhoc
( '04.05.10 Nationaliteit:Nationaliteit' != 0001 ) && ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' != "B" )
#### spontaan
( '04.05.10 Nationaliteit:Nationaliteit' != 0001 ) && ( '04.65.10 Nationaliteit:Aanduiding bijzonder Nederlanderschap' != "B" ) && ( '04.82.30 Nationaliteit:Beschrijving document' != "proba/*" && "Proba/*" && "PRoba/*" && "PROba/*" && "PROBa/*" && "PROBA/*" && "pROBA/*" && "/?proba/*" && "/?Proba/*" && "/?PRoba/*" && "/?PROba/*" && "/?PROBa/*" && "/?PROBA/*" && "/?pROBA/*" ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Ministerie van JenV/Justitiële Informatiedienst/Taken inzake casus-overleggen (700003)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
### Ministerie van JenV/Taken inzake beleid tijdelijke bescherming ontheemden Oekraïne (700004)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
### Ministerie van OCW/Dienst Uitvoering Onderwijs (DUO) (890201)
#### selectie
( ( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 000206 ) && ( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 00180000 ) ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( ( '01.03.10 Persoon:Geboortedatum' <= TODAY - 00020600 ) && ( '01.03.10 Persoon:Geboortedatum' > TODAY - 00180000 ) ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Ministerie van VWS
#### adhoc
( '01.03.10 Persoon:Geboortedatum' > TODAY - 00230000 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 609901 && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Ministerie van VWS/CIBG/Taken inzake donorregistratie (602201)
#### adhoc
'01.03.10 Persoon:Geboortedatum' <= TODAY - 00120000
#### selectie
( ( '01.03.10 Persoon:Geboortedatum' == SELECTION-DATE - 001801 ) || ( ( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 001901 ) && ( ISNULL '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' || ( '08.14.20 Verblijfsplaats:Datum vestiging in Nederland' <= SELECTION-DATE - 000301 ) ) ) ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Ministerie van VWS/Jodiumdistributie (620104)
#### selectie
( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 004100 ) && ( ISNULL '06.08.10 Overlijden:Datum overlijden' ) && ( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0654 || 0664 || 0677 || 0678 || 0687 || 0703 || 0715 || 0717 || 0718 || 0873 || 1695 || 1714 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0168 && '08.11.60 Verblijfsplaats:Postcode' == "7587/*" || "7588/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1674 && '08.11.60 Verblijfsplaats:Postcode' == "4725/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1774 && '08.11.60 Verblijfsplaats:Postcode' == "7591/*" || "7635/*" ) ) && ( '08.10.10 Verblijfsplaats:Functie adres' == "W" )
### Ministerie van VWS/RIVM/Onderzoek en crisissituaties (601201)
#### selectie
ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding' && ( '07.70.10 Inschrijving:Indicatie geheim' == 0 )
### Ministerie van VWS/RIVM/Rijksvaccinatieprogramma en neonatale screening (601202)
#### selectie
( ( '01.03.10 Persoon:Geboortedatum' < SELECTION-DATE - 0018 ) && ( '01.03.10 Persoon:Geboortedatum' >= SELECTION-DATE - 0026 ) ) && ( '14.40.10 Afnemersindicatie:Afnemersindicatie' == 601202 )
#### spontaan
( '01.03.10 Persoon:Geboortedatum' > TODAY - 00190000 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Ministerie van VWS/RIVM/Vaccinatie Covid (601205)
#### spontaan
( ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' || ( ISNULL '06.08.10 Overlijden:Datum overlijden' && ( '08.13.10 Verblijfsplaats:Land adres buitenland' == 6030 ) ) ) && ( '64.40.10 Afnemersindicatie*:Afnemersindicatie' != 601205 )
## MN
### MN Services (800401)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 800401
## Nederlandse
### Nederlandse Zorgautoriteit (NZa) (640002)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
## Pensioenuitvoerder
### Pensioenuitvoerder HaskoningDHV (807101)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 807101
### Pensioenuitvoerder Ondernemingspensioenfonds MN Services (815801)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 815801
### Pensioenuitvoerder Sagittarius (806201)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 806201
### Pensioenuitvoerder SRLEV/Reaal Levensverzekeringen (804301)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 804301
### Pensioenuitvoerder SRLEV/Zwitserleven (808601)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
### Pensioenuitvoerder Wolters Kluwer Nederland (802301)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 802301
### Pensioenuitvoerders via Achmea Pensioenservices (805001)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
### Pensioenuitvoerders via APG Rechtenbeheer (880101)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
### Pensioenuitvoerders via AZL (802001)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 819001
### Pensioenuitvoerders via Dion Pensioen Services (815201)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 815201
### Pensioenuitvoerders via TKP Pensioen (803901)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
## Premiepensioeninstelling
### Premiepensioeninstelling Aegon Cappital via TKP Pensioen (819901)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
## Raad
### Raad van State/Bestuursrechtspraak (703301)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
## Rijksdienst
### Rijksdienst voor het Wegverkeer (RDW) (870201)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 870201
## Rivierduinen
### Rivierduinen Servicebedrijf (605401)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
## Samenwerkingsverband
### Samenwerkingsverband GGD Brabant-Zuidoost/Leerlingzaken (201601)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 000300 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0743 || 0753 || 0762 || 0770 || 0772 || 0794 || 0820 || 0823 || 0847 || 0848 || 0858 || 0861 || 0866 || 1652 || 1658 || 1659 || 1667 || 1706 || 1724 || 1728 || 1771 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 000300 && '01.03.10 Persoon:Geboortedatum' > TODAY - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0743 || 0753 || 0762 || 0770 || 0772 || 0794 || 0820 || 0823 || 0847 || 0848 || 0858 || 0861 || 0866 || 1652 || 1658 || 1659 || 1667 || 1706 || 1724 || 1728 || 1771 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Samenwerkingsverband Holland Rijnland/Leerlingzaken (201301)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 000300 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0534 || 0537 || 0546 || 0547 || 0553 || 0575 || 0579 || 0626 || 0638 || 1525 || 1884 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 000300 && '01.03.10 Persoon:Geboortedatum' > TODAY - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0534 || 0537 || 0546 || 0547 || 0553 || 0575 || 0579 || 0626 || 0638 || 1525 || 1884 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Samenwerkingsverband Laborijn/Sociale werkvoorziening (415002)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 415002
### Samenwerkingsverband Regio Gooi en Vechtstreek/Leerlingzaken (200901)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0003 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0023 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0317 || 0376 || 0402 || 0406 || 0417 || 1696 || 1942 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0003 && '01.03.10 Persoon:Geboortedatum' > TODAY - 0023 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0317 || 0376 || 0402 || 0406 || 0417 || 1696 || 1942 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Samenwerkingsverband WerkSaam Westfriesland/Sociale voorzieningen (414701)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 414701
### Samenwerkingsverband Zuid-Holland Zuid/Leerlingzaken (201201)
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 000300 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0482 || 0505 || 0512 || 0523 || 0531 || 0590 || 0610 || 0642 || 1963 || 1978 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( '01.03.10 Persoon:Geboortedatum' <= TODAY - 000300 && '01.03.10 Persoon:Geboortedatum' > TODAY - 001800 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0482 || 0505 || 0512 || 0523 || 0531 || 0590 || 0610 || 0642 || 1963 || 1978 ) && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
## Sociale
### Sociale Verzekeringsbank (SVB)/Basisadministratie Volksverzekeringen (852102)
#### selectie
( '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' != "O" ) && ( '14.40.10 Afnemersindicatie:Afnemersindicatie' != 852102 )
## Stichting
### Stichting Interkerkelijke Ledenadministratie (850001)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
#### selectie
'07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' == "E" || "M"
### Stichting VAM (IBKI) (701501)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
## Universiteit
### Universiteit Erasmus MC/Afdeling Maatschappelijke Gezondheidszorg/ROBINSCA-studie (616601)
#### adhoc
( '01.04.10 Persoon:Geslachtsaanduiding' == "V" && ( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0055 ) ) || ( '01.04.10 Persoon:Geslachtsaanduiding' == "M" && ( '01.03.10 Persoon:Geboortedatum' <= TODAY - 0045 ) )
#### selectie
( ( '01.04.10 Persoon:Geslachtsaanduiding' == "V" && ( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0055 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0075 ) ) || ( '01.04.10 Persoon:Geslachtsaanduiding' == "M" && ( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0045 && '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0075 ) ) ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0005 || 0009 || 0014 || 0017 || 0018 || 0022 || 0025 || 0040 || 0053 || 0056 || 1699 || 1730 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Universiteit Erasmus MC/Proefbevolkingsonderzoek longkanker (607602)
#### adhoc
'01.03.10 Persoon:Geboortedatum' <= TODAY - 0060
#### selectie
( '01.03.10 Persoon:Geboortedatum' <= SELECTION-DATE - 0060 ) && ( '01.03.10 Persoon:Geboortedatum' > SELECTION-DATE - 0080 ) && ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0059 || 0074 || 0080 || 0085 || 0086 || 0090 || 0307 || 0308 || 0310 || 0342 || 0344 || 0355 || 0362 || 0363 || 0402 || 0737 || 1900 || 1940 ) && ISNULL '07.66.20 Inschrijving:Datum ingang blokkering PL' && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Universiteit MC Utrecht/ALS onderzoek (607102)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
### Radboud Universiteit Nijmegen/Gastro-oesofageale refluxziekte (GORZ)-onderzoek (607506)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '07.70.10 Inschrijving:Indicatie geheim' == 0 )
### Radboud Universiteit Nijmegen/Nederlandse levensloop studie (NELLS)-onderzoek (607504)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '07.70.10 Inschrijving:Indicatie geheim' == 0 )
### Universiteit Utrecht/TransExpo-onderzoek (607105)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && NOT ISNULL '01.01.10 Persoon:A-nummer'
### Universiteit van Amsterdam/EDAN-onderzoek (607006)
#### selectie
( kolom1 == '01.01.10 Persoon:A-nummer' ) && ISNULL '07.67.20 Inschrijving:Omschrijving reden opschorting bijhouding' && ( '07.70.10 Inschrijving:Indicatie geheim' == 0 )
### Wageningen Universiteit/COLON-studie (615801)
#### adhoc
'08.09.10 Verblijfsplaats:Gemeente van inschrijving' != 1999
## Waterschap
### Waterschap Amstel, Gooi en Vecht (250301)
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0362 || 0376 || 0384 || 0402 || 0406 || 0417 || 0437 || 0451 || 0736 || 1696 || 1904 || 1942 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0358 && '08.11.60 Verblijfsplaats:Postcode' == "1433/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0363 && '08.11.60 Verblijfsplaats:Postcode' != "1024/*" && "1025/*" && "1026/*" && "1027/*" && "1028/*" && "1034/*" && "1035/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Waterschap De Dommel/Waterschapsbelastingen (1) (256601)
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0753 || 0757 || 0770 || 0772 || 0785 || 0798 || 0820 || 0823 || 0824 || 0848 || 0855 || 0858 || 0861 || 0865 || 0866 || 1658 || 1667 || 1706 || 1724 || 1728 || 1771 ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0744 && '08.11.60 Verblijfsplaats:Postcode' == "5111/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0794 && '08.11.60 Verblijfsplaats:Postcode' == "5706KB" || "5707DC" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0796 && '08.11.60 Verblijfsplaats:Postcode' == "5211CM" || "5216HH" || "5216PZ" || "5216VT" || "5216VV" || "5216VW" || "5216VX" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0797 && '08.11.60 Verblijfsplaats:Postcode' == "5151RB" || "5151RD" || "5151RE" || "5151RG" || "5151RH" || "5151RK" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0809 && '08.11.60 Verblijfsplaats:Postcode' == "5175NW" || "5175NX" || "5175NZ" || "5175PB" || "5175PC" || "5175PS" || "5175PT" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0845 && '08.11.60 Verblijfsplaats:Postcode' == "527/*" || "529/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0847 && '08.11.60 Verblijfsplaats:Postcode' == "5711PX" || "5711RJ" || "5711RL" || "5712/*" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1659 && '08.11.60 Verblijfsplaats:Postcode' == "5737P/*" || "5737SG" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1948 && '08.11.60 Verblijfsplaats:Postcode' == "5466PZ" || "5481JD" || "5481JG" || "5481S/*" || "5481V/*" || "5481X/*" || "5482/*" || "549/*" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Waterschap De Dommel/Waterschapsbelastingen (2) (256603)
#### selectie
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0794 && '08.11.60 Verblijfsplaats:Postcode' == "5707DA" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0809 && '08.11.60 Verblijfsplaats:Postcode' == "5175BC" || "5175BD" || "5175NV" || "5175PJ" || "5175RV" || "5175RW" || "5175RX" || "5175RZ" || "5175SV" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0847 && '08.11.60 Verblijfsplaats:Postcode' == "5711PV" || "5711PZ" || "5711RA" || "5711RD" || "5711RG" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1659 && '08.11.60 Verblijfsplaats:Postcode' == "5737RM" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1723 && '08.11.60 Verblijfsplaats:Postcode' == "5131RN" || "5131RP" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1948 && '08.11.60 Verblijfsplaats:Postcode' == "5465LA" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
#### spontaan
( ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0794 && '08.11.60 Verblijfsplaats:Postcode' == "5707DA" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0809 && '08.11.60 Verblijfsplaats:Postcode' == "5175BC" || "5175BD" || "5175NV" || "5175PJ" || "5175RV" || "5175RW" || "5175RX" || "5175RZ" || "5175SV" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 0847 && '08.11.60 Verblijfsplaats:Postcode' == "5711PV" || "5711PZ" || "5711RA" || "5711RD" || "5711RG" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1659 && '08.11.60 Verblijfsplaats:Postcode' == "5737RM" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1723 && '08.11.60 Verblijfsplaats:Postcode' == "5131RN" || "5131RP" ) || ( '08.09.10 Verblijfsplaats:Gemeente van inschrijving' == 1948 && '08.11.60 Verblijfsplaats:Postcode' == "5465LA" ) ) && '08.10.10 Verblijfsplaats:Functie adres' != "B" && ISNULL '07.67.10 Inschrijving:Datum opschorting bijhouding'
### Waterschap Scheldestromen/Beheertaken (251001)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 251001
## Zorgverzekeraar
### Zorgverzekeraar CZ Groep (603101)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 603101
### Zorgverzekeraar Eno (602501)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 602501
### Zorgverzekeraar Zorg en Zekerheid (603901)
#### selectie
'14.40.10 Afnemersindicatie:Afnemersindicatie' == 603901
