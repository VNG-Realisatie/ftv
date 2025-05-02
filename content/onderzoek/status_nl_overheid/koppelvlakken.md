---
type: 'chapter'
weight: 20
title: "Koppelvlakken"
---
{{< chapter/section title="Koppelvlakstandaarden" level="1" >}}
Koppelvlakstandaarden beschrijven methodieken van koppelen. Onder koppelen wordt veel meer verstaan dan toegangsverlening:
ze beschrijven ook diepere lagen van het [OSI-model](https://nl.wikipedia.org/wiki/OSI-model).
FTV zal geen nieuwe koppelvlakstandaard voorstellen, maar alleen een nieuwe invulling van het aspect autorisatie daarbovenop.

De volgende koppelstandaarden zijn relevant:
- **[Digikoppeling](https://www.logius.nl/domeinen/gegevensuitwisseling/digikoppeling/documentatie)**. Een set van standaarden en afspraken over koppelvlakken die o.a. de encryptie regelt (de sessielaag).
  Digikoppeling omvat, bovenop een encryptielaag, de standaarden ebMS, WUS, REST en Grote Berichten, die elk een berichtenstandaard beschrijven (de applicatielaag).
  - WUS is een samentrekking van drie wat oudere standaarden: WSDL, UDDI en SOAP, en digikoppeling beschrijft de Nederlandse regels over het gebruik daarvan.
  - ebMS gaat over asynchroon uitwisselen met betrouwbare aflevering.
  - Grote Berichten gaat, zoals de naam al zegt, over het uitwisselen van grote berichten, en dan over WUS of ebMS2.
  - REST is een standaard die wereldwijd voor alle moderne API's gebruikt wordt. De beschrijving onder digikoppeling zegt meer over hoe de Nederlandse overheid REST toepast.
- **[StUF](https://standaarden.vng.nl/StUF-standaarden)**. Een standaard bovenop WUS die een XML-formaat voor berichtenuitwisseling beschrijft.
- **[HaalCentraal](https://vng-realisatie.github.io/Haal-Centraal/)**. Een set van afspraken en standaarden bovenop Digikoppeling REST, specifiek voor basisregistraties.
- **[FSC](https://gitlab.com/commonground/nlx/fsc-nlx)**. Een recente koppelvlakstandaard die in het FDS programma ontwikkeld is.

Voor dit project stellen we dat ebMS2, WUS en Grote Berichten een oudere generatie zijn en niet als API's gezien worden
in onze terminologie. StUF, REST, HaalCentraal en FSC zijn wel in scope.
{{< /chapter/section >}}
{{< chapter/section title="Autorisatie in de koppelvlakstandaarden" >}}
### Stuf

[StUF](https://standaarden.vng.nl/StUF-standaarden) is een oudere generatie die niet meer wordt doorontwikkeld, maar nog wel volop in gebruik is.
Qua autorisatie is in de generieke onderlaag van StUF ruimte voorzien om 4 gegevens mee te geven van zowel de afzender als de ontvanger:
organisatie, applicatie, administratie en gebruiker. Expliciet staat in de handleiding, pagina 45:
> StUF bevat geen voorschriften met betrekking tot autorisatie, maar het biedt dankzij dit stuurgegeven wel de mogelijkheid om
autorisatiemechanismen in te bouwen in de berichtverwerkende software.

Er zijn daarnaast foutcodes om aan te geven dat een bericht niet ontvankelijk is vanwege autorisatie.
Bovenop StUF basis zijn er een aantal registratie- of sectorspecifieke standaarden gedefinieerd.
Ook hierin is geen autorisatie-functionaliteit beschreven.

### REST

[Digikoppeling REST API](https://gitdocumentatie.logius.nl/publicatie/dk/restapi/) is de huidige standaard voor API's. Daarin zijn geen voorzieningen voor autorisatie opgenomen,
anders dan de grofmazigste in de vorm van authenticatie. 

### HaalCentraal

[HaalCentraal](https://haalcentraal.pleio.nl/) is een verder uitwerking van REST met een volledige architectuur inclusief gateway, IAM en logging.
Er zijn een [viertal koppelingen](https://vng-realisatie.github.io/Haal-Centraal/aansluiten-op-apis) gebouwd op HaalCentraal (WOZ, BAG, BRK en BRP), maar na onderzoek is 
besloten dat nut en noodzaak onvoldoende herkend worden, waarna de ontwikkeling is stopgezet. 
De opgeleverde koppelingen zijn nog in gebruik en daarom relevant voor dit onderzoek.

HaalCentraal heeft in de koppelvlakstandaard een minimale voorziening voor toegangsverlening: er is een API key voorgeschreven.
Daarmee kunnen implementaties zelf aan de slag. 

### FSC

[Federatieve Service Connectiviteit (FSC)](https://commonground.nl/page/view/736309a1-739a-47fc-abfd-67e71f1d9e59/consultatie-fsc) is het nieuwste profiel in Digikoppeling, speciaal ontwikkeld voor federatief werken.
In de [FSC standaard](https://commonground.gitlab.io/standards/fsc/core/draft-fsc-core-00.html) wordt toegansverlening niet beschreven, maar in de referentie-implementatie is een plek ingeruimd voor toekomstige
PBAC oplossingen. FTV zal in nauwe samenwerking met FSC ontwikkeld worden zodat deze naadloos gaan aansluiten.
{{< /chapter/section >}}