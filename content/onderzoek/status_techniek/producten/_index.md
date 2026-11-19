---
type: 'chapter'
title: "Producten"
---

{{< chapter/section title="Producten" level="1" >}}

Toegangsverlening is een groeimarkt. Gedistribueerde architectuur met microservices en in het algemeen toenemende gegevensuitwisseling maken dat er een sterk toenemende vraag is naar praktische oplossingen. Commerciële partijen zien dat implementatie technisch en organisatorisch lastig is en springen daarop in. Er zijn gesloten implementaties van open standaarden gekomen, open implementaties zijn gesloten en er worden betaalde diensten en extensies op open implementaties geboden.
 
Hier volgt een inventarisatie van de beschikbare producten verdeeld in open en closed source, gevolgd door de [API-gateways](#gateways) die als Policy Enforcement Point (PEP) kunnen dienen.
{{< /chapter/section >}}

{{< chapter/section title="Open source" id="open" level="3">}} 
Er zijn veel implementaties beschikbaar. Voor de test is gekozen voor de partijen die opvallen als ‘grootste’. Dat begrip is relatief: Amazon Verified Permissions is waarschijnlijk het grootst in aantal transacties, omdat het toegang tot AWS regelt. Open Source Agent (OPA) daarentegen is leidend in aantal downloads en implementaties.
Dit zijn de geteste implementaties met de daarbij behorende regeltalen:

- [Amazon Verified Permissions](https://aws.amazon.com/verified-permissions/) is de policy engine van Amazon en gebruikt de taal Cedar.
- [Cerbos](https://www.cerbos.dev/) is de Policy Based Access Control (PBAC)-oplossing van Google en maakt gebruik van CEL.
- [OPA](https://www.openpolicyagent.org/) is de engine van Styra, de bedenker van Rego.
- [OpenFGA](https://openfga.dev/) is gebaseerd op Zanzibar, het Relationship Based Access Control (ReBAC)-project van Google.
- [Keycloak](https://www.keycloak.org/docs/latest/authorization_services/index.html), een open source platform.

Van XACML zijn geen stabiele moderne open source implementaties.

Elk van deze opties is getest in het project. Zie het [overzicht van de resultaten](opensource). Alle implementaties zijn in principe geschikt bevonden als Policy Decision Point (PDP). Daarnaast is zelfbouw ook altijd mogelijk zolang dit gebeurt onder de open source-voorwaarden van de overheid.

Een eerste kanttekening is wel dat toegangsregels geschreven in al deze talen lastig zijn te lezen en te schrijven. Een van de doelen is echter dat mensenogen ze moeten kunnen controleren en aanpassen, en dan niet alleen programmeurs. Geen van de bovengenoemde implementaties biedt een oplossing die dit significant eenvoudiger maakt.

Een tweede kanttekening is dat deze implementaties allemaal losse policy engines zijn: in principe alleen een PDP. Een complete oplossing omvat echt ook [beheer](/ftv/toepassen/functioneel). Testen, versiebeheer, distributie, monitoring en auditing zijn belangrijke taken die een PDP niet oplost.
{{< /chapter/section >}}

{{< chapter/section title="Closed source" id="closed" level="3">}}
In het commerciële domein zijn completere oplossingen beschikbaar. Een goede recente inventarisatie van de markt is [de inventarisatie van KuppingerCole](https://www.kuppingercole.com/research/lc80819/policy-based-access-management).

Voor dit onderzoek zijn verschillende partijen benaderd met het verzoek om informatie en een demonstratie. In onderstaande tabel een overzicht van de partijen. Neem voor meer informatie over de gevoerde gesprekken contact op met [ftv@ictu.nl](mailto:ftv@ictu.nl). 

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

Naast PDP's test de interop ook [API-gateways](https://authzen-interop.net/docs/intro#api-gateways) als PEP. Aan die test, tijdens Gartner IAM Londen 2025, deden zeven gateways mee: AWS API Gateway, Envoy, Kong, Layer7, Tyk, WSO2 en Zuplo. Van de PDP's die FTV heeft getest, deden Amazon Verified Permissions, Cerbos en OpenFGA daaraan mee, OPA en Keycloak niet.

{{< /chapter/section >}}

{{< chapter/section title="API-gateways" id="gateways" level="3">}}
Een PDP beslist, maar de beslissing moet ook worden afgedwongen. Bij API's gebeurt dat meestal in de API-gateway. De [Proefopstelling](/ftv/toepassen/proefopstelling) gebruikt Kong, met een eigen plug-in van [OpenFTV](/ftv/toepassen/openftv) die de PDP via AuthZEN aanroept. Voor de gateways die bij overheidsorganisaties gangbaar zijn, is nagegaan of ze AuthZEN al ondersteunen en hoe dat anders toe te voegen is:

| Gateway | Ondersteunt AuthZEN? | Toe te voegen via |
|---|---|---|
| OpenFSC | Ja, in inway en outway, alleen het verzoek | Aanpassing in OpenFSC (RINIS) |
| Broadcom Layer7 | Niet openbaar, wel in de interop | Policies, Java-assertions (licentie nodig) |
| Tyk | Plug-in uit de interop | Go-plug-ins |
| Envoy en Istio | Nee | `ext_authz` en `ext_proc` |
| Amazon API Gateway | Nee | Lambda, het antwoord alleen buiten de gateway |
| WSO2 | Nee | Go-policies (API Platform), Java (API Manager) |
| Zuplo | Ja, alleen Enterprise | TypeScript-policies |
| Azure API Management | Nee | Policies met C#-expressies |
| Google Apigee | Nee | Policies met JavaScript |
| Gravitee | Alleen voor de eigen PDP (Enterprise) | Java- en Groovy-policies |
| Apache APISIX | Community-plug-in (bèta) | Go-plug-ins |
| NGINX | Nee | njs (JavaScript) |
| Traefik | Ja in Traefik Hub (commercieel) | Go-plug-ins |

Geen van de bestaande AuthZEN-koppelingen kijkt naar het antwoord van de dienst of voert verplichtingen uit, zoals het weglaten van velden. Dat kan alleen met een eigen uitbreiding. OpenFSC verdient daarbij de meeste aandacht: het is al in gebruik en spreekt al AuthZEN, maar laat een toestemming met verplichtingen ongemerkt door.

Zie [API-gateways als PEP](gateways) voor de uitwerking per gateway en het advies voor de Proefopstelling.
{{< /chapter/section >}}
