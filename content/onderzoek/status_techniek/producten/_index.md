---
type: 'chapter'
title: "Producten"
---

{{< chapter/section title="Producten" level="1" >}}

Toegangsverlening is een groeimarkt. Gedistribueerde architectuur met microservices en in het algemeen toenemende gegevensuitwisseling maken dat er een sterk toenemende vraag is naar praktische oplossingen. Commerciële partijen zien dat implementatie technisch en organisatorisch lastig is en springen daarop in. Er zijn gesloten implementaties van open standaarden gekomen, open implementaties zijn gesloten en er worden betaalde diensten en extensies op open implementaties geboden.
 
Hier volgt een inventarisatie van de beschikbare producten verdeeld in open en closed source.
{{< /chapter/section >}}

{{< chapter/section title="Open source" id="open" level="3">}} 
Er zijn veel implementaties beschikbaar. Voor de test is gekozen voor de partijen die opvallen als ‘grootste’. Dat begrip is relatief: Amazon Verified Permissions is waarschijnlijk het grootst in aantal transacties, omdat het toegang tot AWS regelt. Open Source Agent (OPA) daarentegen is leidend in aantal downloads en implementaties.
Dit zijn de geteste implementatie met de daarbij behorende regeltalen:

- [Amazon Verified Permissions](https://aws.amazon.com/verified-permissions/) is de policy engine van Amazon en gebruikt de taal Cedar.
- [Cerbos](https://www.cerbos.dev/) is de Policy Based Access Control (PBAC)-oplossing van Google en maakt gebruik van CEL.
- [OPA](https://www.openpolicyagent.org/) is de engine van Styra, de bedenker van Rego.
- [OpenFGA](https://openfga.dev/) is gebaseerd op Zanzibar, het Relationship Based Access Control (ReBAC)-project van Google.
- [KeyCloak](https://www.keycloak.org/docs/latest/authorization_services/index.html), een open source platform.

Van XACML zijn geen stabiele moderne open source implementaties.

Elk van deze opties is getest in het project. Zie het [overzicht van de resultaten](opensource). Alle implementaties zijn in principe geschikt bevonden als Policy Decision Point (PDP). Daarnaast is zelfbouw ook altijd mogelijk zolang dit gebeurt onder de open source-voorwaarden van de overheid.

Een eerste kanttekening is wel dat toegangsregels geschreven in al deze talen lastig zijn te lezen en te schrijven. Een van de doelen is echter dat mensenogen ze moeten kunnen controleren en aanpassen, en dan niet alleen programmeurs. Geen van de bovengenoemde implementaties biedt een oplossing die dit significant eenvoudiger maakt.

Een tweede kanttekening is dat deze implementaties allemaal losse policy engines zijn: in principe alleen een PDP. Een complete oplossing omvat echt ook beheer. Testen, versiebeheer, distributie, monitoring en auditing zijn belangrijke taken die een PDP niet oplost.
{{< /chapter/section >}}

{{< chapter/section title="Closed source" id="closed" level="3">}}
In het commerciële domein zijn completere oplossingen beschikbaar. Een goede recente inventarisatie van de markt is [de inventarisatie van KuppingerCole](https://www.kuppingercole.com/research/lc80819/policy-based-access-management).

Voor dit onderzoek zijn verschillende partijen benaderd met het verzoek om informatie en een demonstratie. In onderstaande tabel een overzicht van de partijen. [Benader ons](mailto:ftv@vng.nl) gerust voor meer informatie over de gevoerde gesprekken. 

| Leverancier                                                                        | Meer informatie                                                   |
|------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| [Styra](styra)                                                                     | [Brochure]({{< param baseDirectory >}}documents/styra.pdf)        |
| [PlainID](plainid)                                                                 | [Brochure]({{< param baseDirectory >}}documents/plainid.pdf)      |
| [Axiomatics](axiomatics)                                                           | [Brochure]({{< param baseDirectory >}}documents/axiomatics.pdf)   |
| [PingID](https://www.pingidentity.com/en/platform/capabilities/authorization.html) | [Brochure]({{< param baseDirectory >}}documents/pingid.pdf)       |
| [NextLabs](https://www.nextlabs.com/products/cloudaz-policy-platform/)             | [Brochure]({{< param baseDirectory >}}documents/nextlabs.pdf)     |
| [Thales](https://cpl.thalesgroup.com/access-management/externalized-authorization) | [Brochure]({{< param baseDirectory >}}documents/thales.pdf)       |
| [Immuta](https://www.immuta.com/)                                                  | [Link](https://www.immuta.com/product/policy-entitlement-engine/) |
| [Okta](https://www.okta.com/)                                                      | https://www.okta.com/products/customer-identity/                  |
| [Poort 8](https://www.poort8.nl/)                                                  | https://www.poort8.nl/                                            |

{{< /chapter/section >}}

{{< chapter/section title="AuthZEN compliance" level="3">}}

De AuthZEN werkgroep houdt een doorlopende test van software die aan de standaard zegt te voldoen. Op de zogenaamde [interop website](https://authzen-interop.net/) is de laatste stand van zaken te zien. Leveranciers brengen de laatste versie van hun software in, die dan via de AuthZEN methode wordt aangesproken. Op die manier is onafhankelijk te checken welke software welke endpoints correct implementeert.

{{< /chapter/section >}}