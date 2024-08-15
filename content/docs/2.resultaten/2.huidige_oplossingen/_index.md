---
bookCollapseSection: false
weight: 20
title: "Huidige oplossingen"
---

# Inventarisatie van huidige oplossingen

Toegangsverlening is niet nieuw. Alle basisregistraties hebben nu een vorm van toegangsverlening. 
Zelfs de open API's gebruiken meestal een API key om grip te houden op wie hoe vaak welke data opvraagt.
In deze sectie doen we een inventarisatie van de huidige oplossingen. Dit kan ons vertellen wat er nu goed gaat en welke uitdagingen er zijn. 
En geeft ons ook een vorm van minimale requirements: FTV moet minstens kunnen bieden wat nu al bestaat. 

## Aanpak

Dit is het stappenplan van de inventarisatie:
1. Scope bepaling
2. Inventarisatie methodieken
3. Inventarisatie koppelvlakstandaarden
4. Inventarisatie individuele aanbieders en afnemers

## 1. Scope
Als we gaan kijken naar 'huidige oplossingen' dan beperken we ons tot in productie zijnde API's
binnen het stelsel van basisregistraties, inclusief sectorale registraties. En dan zowel aanbieder- als afnemerszijde.

Daarnaast zijn er voorgestelde oplossingen die niet uitgevoerd zijn,
oplossingen buiten het stelsel, open API's, en oplossingen die niet met API's te maken hebben. 
Die laten we buiten beschouwing.

## 2. Methodieken van toegangsverlening
Eerst kijken we naar de methodieken. Dan zijn werkwijzen, oftewel categorie&euml;n van oplossingen, niet concrete implementaties.
Een gangbare indeling is:
1. Lijsten van gebruikers ([ACL](https://en.wikipedia.org/wiki/Access-control_list))
2. Rolgebaseerd ([RBAC](https://en.wikipedia.org/wiki/Role-based_access_control))
3. Attribuutgebaseerd ([ABAC](https://en.wikipedia.org/wiki/Attribute-based_access_control))
4. Policy-gebaseerd (PBAC)

Er zijn al goede beschrijvingen en vergelijkingen beschikbaar:
- Door het project FDS is een [ position paper](https://federatief.datastelsel.nl/kennisbank/pbac/) gemaakt 
- Onder GEMMA is een [vergelijking](https://www.gemmaonline.nl/wiki/WMA_RBAC_ABAC_en_PBAC) gemaakt.

De gebruikte methodiek is aan de buitenkant, aan de API niet te zien.
Neem als voorbeeld een REST API waar geen expliciete toegangsverleningsinformatie wordt meegegeven.
De toegang zal dan zijn afgeleid uit de identificatie. De dienst kan dan een lijst van identiteiten 
hebben, en als de identiteit op de lijst staat wordt volledige toegang verleend. Dan noemen
we de methodiek Access Control List (ACL). Maar het kan ook zijn dat aan elke identiteit op de lijst
weer een lijst van rollen is gekoppeld, waarmee een vorm van RBAC is bereikt. En het kan evengoed
zijn dat de dienst per identiteit een lijst van attributen of toegangsregels heeft die intern uitgevoerd, en dus
ABAC of PBAC genoemd mag worden. 

We zullen daarom voor een inventarisatie direct bij de aanbieders en afnemers moeten informeren hoe het gerealiseerd is.

## 3. Koppelvlakstandaarden
Koppelvlakstandaarden bepalen methodieken van koppelen. Onder koppelen wordt veel meer verstaan dan toegangsverlening: 
ze beschrijven ook diepere lagen van het [OSI-model](https://nl.wikipedia.org/wiki/OSI-model). 
FTV zal geen nieuwe koppelvlakstandaard voorstellen, maar alleen een nieuwe invulling van het aspect autorisatie daarbovenop.

De volgende koppelstandaarden zijn relevant:
- **Diginetwerk**. Een afsprakenstelsel op infrastructuurniveau dat een besloten netwerk realiseert voor de overheid (de transportlaag).
- **Digikoppeling**. Een set van standaarden en afspraken over koppelvlakken die o.a. de encryptie regelt (de sessielaag). 

  Digikoppeling omvat, bovenop een encryptielaag, de standaarden ebMS, WUS, REST en Grote Berichten, die elk een berichtenstandaard 
  beschrijven (de applicatielaag).
  - WUS is een samentrekking van drie wat oudere standaarden: WSDL, UDDI en SOAP, en digikoppeling beschrijft de Nederlandse regels over het gebruik daarvan.
  - ebMS gaat over asynchroon uitwisselen met betrouwbare aflevering.
  - Grote Berichten gaat, zoals de naam al zegt, over het uitwisselen van grote berichten, en dan over WUS of ebMS2.
  - REST is een standaard die wereldwijd voor alle moderne API's gebruikt wordt. De beschrijving onder digikoppeling zegt meer over hoe
de Nederlandse overheid REST toepast. 
- **StUF**. Een standaard bovenop WUS die een XML-formaat voor berichtenuitwisseling beschrijft.
- **HaalCentraal**. Een set van afspraken en standaarden bovenop Digikoppeling REST, specifiek voor basisregistraties.

Voor dit project stellen we dat ebMS2, WUS en Grote Berichten een oudere generatie zijn en niet als API's gezien worden 
in onze terminologie. StUF, REST en HaalCentraal zijn wel in scope.

Het is goed hier nog expliciet **FSC** te vermelden: de nieuwe koppelvlakstandaard die in het FDS programma ontwikkeld wordt.
Daar zal de FTV oplossing sowieso in moeten passen. Er zijn echter nog geen productieimplementaties van FSC, en valt daarom
buiten scope van deze inventarisatie.

### Autorisatie in de koppelvlakstandaarden

#### Stuf
StUF is een oudere generatie die niet meer wordt doorontwikkeld, maar nog wel volop in gebruik is.
Qua autorisatie is in de generieke onderlaag van StUF in ruimte voorzien om 4 gegevens mee te geven van zowel de afzender als de ontvanger: 
organisatie, applicatie, administratie en gebruiker. Expliciet staat in de handleiding, pagina 45: 
> StUF bevat geen voorschriften met betrekking tot autorisatie, maar het biedt dankzij dit stuurgegeven wel de mogelijkheid om
autorisatiemechanismen in te bouwen in de berichtverwerkende software. 

Er zijn daarnaast foutcodes om aan te geven dat een 
bericht niet ontvankelijk is vanwege autorisatie. Bovenop StUF basis zijn er een aantal registratie- of sectorspecifieke 
standaarden gedefinieerd. Ook hierin is geen autorisatiefunctionaliteit beschreven.

#### HaalCentraal

Digikoppeling met REST is de huidige standaard voor basisregistratie-API's.
HaalCentraal is een uitwerking daarvan met een gateway, IAM en logging.

Er zijn een [viertal koppelingen](https://vng-realisatie.github.io/Haal-Centraal/aansluiten-op-apis)) gebouwd op HaalCentraal (WOZ, BAG, BRK en BRP). 
Na [onderzoek](https://haalcentraal.pleio.nl/blog/view/f27ce9be-32c0-415b-89a6-5fff97956d3c/van-haal-centraal-naar-regie-op-apis) is gebleken dat nut en noodzaak onvoldoende herkend worden, waarna de ontwikkeling is stopgezet. 
De opgeleverde koppelingen zijn nog in gebruik en daarom relevant voor dit onderzoek.

HaalCentraal heeft in de koppelvlakstandaard geen voorzieningen voor toegangsverlening.
Er is een enkele API key waarmee individuele implementaties zelf aan de slag kunnen.


