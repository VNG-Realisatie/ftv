---
weight: 30
title: "Inventarisatie"
---

# Inventarisatie 

Hieronder volgt een overzicht van de registraties, systemen en partijen waarnaar gekeken is. 
Aangezien aan de buitenkant, aan een API, niet te zien is welke toegangsverlening gebruikt is, 
komt de meeste informatie hier van gesprekken. Daarvan is hier verslag gedaan.

## 1. Aanbieders

### a. Basisregistraties

Zie hier een complete [lijst van basisregistraties](https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/stelsel-van-basisregistraties/10-basisregistraties/)

| Registratie                                                                    | Houder          | Dienst                   | Koppelvlak   | 
|--------------------------------------------------------------------------------|-----------------|--------------------------|--------------|
| [BRP](registraties/brp)                                                     | RvIG            | Personen                 | HaalCentraal |
| [HR](registraties/kvk)                                                      | KvK             | Handelsregister          | REST         |
| [BAG](registraties/bag)                                                     | Kadaster        | Adressen en Gebouwen     | REST         |
| [BGT](registraties/bgt)                                                     | Kadaster        | Grootschalige Topografie | REST         | 
| [BRT](registraties/brt)                                                     | Kadaster        | Topografie               | StUF         |
| [BRK](registraties/brk)                                                     | Kadaster        | Kadaster                 | REST         |
| [WOZ](registraties/woz)                                                     | Kadaster        | Waarde Onroerende Zaken  | HaalCentraal |
| [BRV](registraties/brv)                                                     | RDW             | Voertuigen               | HaalCentraal | 
| [BRI](registraties/bri)                                                     | Belastingdienst | Inkomen                  | Geen         |
| [BRO](registraties/bro)                                                     | TNO             | Ondergrond               | SOAP en REST | 
| [Digimelding](https://www.logius.nl/domeinen/gegevensuitwisseling/digimelding) | Logius          | Digimelding              | SOAP         |  

### b. Sectorregistraties

Zie hier een complete [lijst van sectorregistraties](https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/stelsel-van-basisregistraties/sectorregistraties/)

| Registratie | Houder                     |                                                                                          
|-------------|----------------------------|
| Rijexamens  | [CBR](registraties/cbr) |      
| ?           | [UWV](registraties/uwv) |      



## 2.Afnemers / implementatiepartners

| Leverancier                                                                                  | Systeem  | Toegangsmethodiek(en)                                                                                                                  |  
|----------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------|
| [Maykin](/docs/5.architectuur/inventarisatie/software_leveranciers/maykin)                   | OpenZaak | [Eigen](https://github.com/open-zaak/open-zaak/blob/d9c14e1257d6ec6751b218b18cdd9eae4b8f9b63/docs/manual/general.rst#api-autorisaties) |
| [Enable-U](/docs/5.architectuur/inventarisatie/software_leveranciers/enable-u)               |          |                                                                                                                                        |
| [Centric](/docs/5.architectuur/inventarisatie/software_leveranciers/centric)                 |          |                                                                                                                                        |
| [Dimpact](/docs/5.architectuur/inventarisatie/software_leveranciers/dimpact)                 |          |                                                                                                                                        |
| [Open Web Concept](/docs/5.architectuur/inventarisatie/software_leveranciers/openwebconcept) |          |                                                                                                                                        |
| [Pink Roccade](/docs/5.architectuur/inventarisatie/software_leveranciers/pink_roccade)       |          |                                                                                                                                        |
| [SonicBee](/docs/5.architectuur/inventarisatie/software_leveranciers/sonicbee)               |          |                                                                                                                                        |

## 3.Uitwisselingsplatforms

| Naam                                                              | Leverancier     | 
|-------------------------------------------------------------------|-----------------|
| [SUWI net](/docs/5.architectuur/inventarisatie/platforms/suwinet) | BKWI            |
| [RINIS](/docs/5.architectuur/inventarisatie/platforms/rinis)      | Stichting RINIS |
| [Nuts](/docs/5.architectuur/inventarisatie/platforms/nuts)        | Stichting Nuts  |
| [JustID](/docs/5.architectuur/inventarisatie/platforms/justid)    | MinJenV         |
| [VECOZO](/docs/5.architectuur/inventarisatie/platforms/vecozo)    | VECOZO          |
| [iShare](/docs/5.architectuur/inventarisatie/platforms/ishare)    | iShare          |


## 4.Commerciële IAM oplossingen

| Naam                                                 |             |  |
|------------------------------------------------------|-------------|--|
| [Okta](https://www.okta.com/nl)                      |             |  |   
| [PingIdentity](https://www.pingidentity.com/en.html) |             |  |
| [PlainID](https://www.plainid.com/)                  |             |  |
| [Strata Identity](https://www.strata.io/)            |             |  |
| [AWS](https://aws.amazon.com/verified-permissions/)  |             |  |
| [Nextlabs](https://www.strata.io/)                   |             |  |

## 5.Commerciële Gateway & API Management oplossingen

| Naam  |Leverancier | Link  |
|-------|-------------|--------|
| [Tibco](https://www.tibco.com/)  |Tibco| [Link](/docs/5.architectuur/inventarisatie/gateways/tibco)  |
| [Layer7](https://www.broadcom.com/products/software/api-management/layer7-api-gateways)  | Broadcom | [Link](/docs/5.architectuur/inventarisatie/gateways/layer7) |
| [Kong](https://konghq.com/) | Kong | |
| [Azure API Management](https://azure.microsoft.com/en-us/products/api-management) | Microsoft| |