---
type: 'chapter'
title: "API-gateways"
---

{{< chapter/section title="API-gateways als PEP" level="1" >}}
Een Policy Decision Point (PDP) beslist, maar iemand moet die beslissing ook afdwingen: de Policy Enforcement Point (PEP). Bij gegevensuitwisseling via API's ligt het voor de hand om de PEP in de API-gateway te leggen, die toch al elk verzoek ziet. De [Proefopstelling](/ftv/toepassen/proefopstelling) gebruikt daarvoor Kong, met een eigen plug-in van [OpenFTV](/ftv/toepassen/openftv) die de PDP via [AuthZEN](/ftv/methodiek/authzen-nlgov) aanroept.

Overheidsorganisaties gebruiken ook andere gateways. Daarom is onderzocht welke gateways AuthZEN al ondersteunen, hoe dat anders toe te voegen is, en wat er nodig is om Kong in de Proefopstelling te vervangen. Het gaat om de gateways die het project als gangbaar heeft aangemerkt: OpenFSC, Broadcom Layer7, Tyk, Envoy, Amazon API Gateway, WSO2 en Zuplo. Daarnaast zijn Azure API Management, Google Apigee, Gravitee, Istio, Apache APISIX, NGINX en Traefik bekeken.

Dit is een bureauonderzoek uit november 2026, op basis van documentatie van leveranciers, de [AuthZEN interop](https://authzen-interop.net/docs/intro#api-gateways) en, voor OpenFSC, de broncode. Geen van de gateways is al in de Proefopstelling beproefd. Een bewering met *(niet geverifieerd)* is een eigen inschatting, geen bewering van een bron. De technische uitwerking voor OpenFTV staat in de [repository van OpenFTV](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/docs/gateways.md).
{{< /chapter/section >}}

{{< chapter/section title="Wat moet een gateway kunnen?" level="3" >}}
De OpenFTV-plug-in voor Kong doet vier dingen. Een gateway die Kong vervangt, moet hetzelfde kunnen:

1. **Het token controleren**: de uitgever, de sleutels (JWKS), de doelgroep en de rollen van de gebruiker.
2. **De PDP vragen vóór het doorsturen**: een AuthZEN-evaluatie per verzoek. Een weigering geeft 403 met de reden, een storing van de PDP geeft 500.
3. **De PDP vragen over het antwoord**: een tweede evaluatie met de status en de inhoud van het antwoord van de achterliggende dienst. Sommige regels hangen af van wat er teruggegeven wordt, niet van wat er gevraagd is.
4. **Verplichtingen (obligations) uitvoeren**: de PDP kan een toestemming onder voorwaarden geven, bijvoorbeeld dat velden uit het antwoord weggelaten worden. Zo houdt de Laadpalen-applicatie de geboortedatum uit de BRP buiten beeld. Een PEP die een verplichting niet kan uitvoeren, moet weigeren, zoals het [AuthZEN Obligations Profile](https://openid.github.io/authzen/authzen-obligations-profile-1_0.html) voorschrijft.

Punt 3 en 4 zijn waar de meeste gateways tekortschieten. Hun koppeling voor autorisatie ziet alleen het verzoek, niet het antwoord.
{{< /chapter/section >}}

{{< chapter/section title="Stand van AuthZEN" level="3" >}}
- De [Authorization API 1.0](https://openid.net/specs/authorization-api-1_0.html) is sinds januari 2026 een definitieve OpenID-standaard.
- Het Obligations Profile is een concept van de werkgroep. Het kent geen verplichting om velden weg te laten; OpenFTV gebruikt daarvoor een eigen (`custom`) verplichting.
- Een API Gateway Profile bestaat alleen als [voorstel](https://hackmd.io/@oidf-wg-authzen/apigateway) en staat op de planning van de werkgroep voor 2026. Het beschrijft hoe een HTTP-verzoek in een evaluatie terechtkomt, maar zegt niets over het antwoord of over verplichtingen.
- Zeven gateways deden mee aan de [interop voor API-gateways](https://authzen-interop.net/docs/scenarios/api-gateway/) tijdens Gartner IAM Londen 2025: AWS API Gateway, Envoy, Kong, Layer7, Tyk, WSO2 en Zuplo. Die test gebruikte een concept van de API van vóór 1.0 en controleerde alleen per route. De meeste deelnemers zijn demo's, en geen ervan kijkt naar het antwoord of naar verplichtingen. Meedoen zegt dus weinig over ondersteuning in productie.
{{< /chapter/section >}}

{{< chapter/section title="Overzicht" level="3" >}}
| Gateway | AuthZEN nu | Antwoord beoordelen en velden weglaten | Zelf te draaien voor een demo | Inspanning |
|---|---|---|---|---|
| OpenFSC | Ja, alleen het verzoek | Nee, vraagt een aanpassing in OpenFSC | Ja, EUPL-1.2 | Middel |
| Envoy | Nee | Ja, met een eigen `ext_proc`-dienst | Ja, Apache-2.0 | Middel |
| WSO2 API Platform | Nee | Ja, met Go-policies | Ja, Apache-2.0 | Klein tot middel |
| Tyk | Plug-in uit de interop | Ja, met een response-plug-in | Ja, MPL-2.0 | Klein tot middel |
| Zuplo | Ja, alleen Enterprise | Ja, met een eigen policy | Nee, alleen Enterprise | Klein, maar licentie |
| Broadcom Layer7 | Niet openbaar | Ja, met policies *(niet geverifieerd)* | Nee, licentie nodig | Middel, maar licentie |
| Amazon API Gateway | Nee | Niet in de gateway zelf | Nee, AWS-account nodig | Middel tot groot |
| Azure API Management | Nee | Ja, met policies *(niet geverifieerd)* | Nee, Azure-abonnement nodig | Middel |
| Google Apigee | Nee | Ja, met policies *(niet geverifieerd)* | Nee, Google Cloud nodig | Middel |
| Gravitee | Alleen voor de eigen PDP (Enterprise) | Ja, met Groovy- of Java-policies | Ja, open source editie | Klein tot middel |
| Istio | Nee | Ja, met dezelfde dienst als Envoy | Ja, alleen Kubernetes | Klein, met de Envoy-dienst |
| Apache APISIX | Community-plug-in (bèta) | Ja, met een Go-plug-in | Ja, Apache-2.0 | Klein tot middel |
| NGINX | Nee | Alleen als NGINX de dienst zelf aanroept | Ja, BSD-2 | Middel tot groot |
| Traefik | Ja in Traefik Hub, alleen het verzoek | Ja, met een plug-in in Traefik Proxy | Proxy ja, Hub met licentie | Middel |
{{< /chapter/section >}}

{{< chapter/section title="OpenFSC" level="3" >}}
[OpenFSC](https://gitlab.com/rinis-oss/fsc/open-fsc) is de referentie-implementatie van de [FSC-standaard](https://gitdocumentatie.logius.nl/publicatie/fsc/core/2.0.0/) en de opvolger van NLX. RINIS beheert het. De PEP van de aanbieder hoort in de inway, die van de afnemer in de outway.

- Sinds versie 1.19.0 (maart 2025) kunnen de inway en de outway een AuthZEN-PDP raadplegen voordat ze een verzoek doorsturen. Het onderwerp (subject) is de afnemende organisatie, met gegevens uit het FSC-token. De eindgebruiker komt alleen mee als ongecontroleerde header.
- Van een beslissing leest OpenFSC alleen het oordeel en de reden. Verplichtingen worden genegeerd en er is geen koppeling voor het antwoord. Voor een regel die velden laat weglaten, laat OpenFSC dus het volledige antwoord door. Dat is precies wat het Obligations Profile verbiedt.
- Om dat op te lossen moet OpenFSC een toestemming met verplichtingen weigeren, het antwoord kunnen laten beoordelen en het token van de eindgebruiker controleren. Dat vraagt een aanpassing bij RINIS.

Afnemers en aanbieders gebruiken FSC al, en OpenFSC spreekt al AuthZEN. Daarmee is het de belangrijkste gateway uit dit overzicht.
{{< /chapter/section >}}

{{< chapter/section title="Envoy en Istio" level="3" >}}
[Envoy](https://www.envoyproxy.io) (CNCF, Apache-2.0) ondersteunt AuthZEN niet zelf; de deelnemer aan de interop is een demo van Cerbos. Met [`ext_proc`](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_proc_filter) stuurt Envoy verzoek en antwoord naar een eigen dienst, die het antwoord ook kan aanpassen. Een `ext_proc`-dienst op basis van de OpenFTV-code kan alle vier de punten afdekken.

Istio is op Envoy gebouwd. Dezelfde dienst werkt daar via een `EnvoyFilter` *(niet geverifieerd)*, maar niet in de ambient-modus, waar Istio dat niet ondersteunt.
{{< /chapter/section >}}

{{< chapter/section title="WSO2" level="3" >}}
WSO2 staat in de interop, maar als PDP (WSO2 Identity Server), niet als gateway. Er is geen AuthZEN-PEP gevonden in de gateways van WSO2. Het nieuwe [WSO2 API Platform](https://wso2.com/about/news/wso2-launches-api-platform/) (sinds maart 2026, Apache-2.0) is Envoy met Go-policies die verzoek en antwoord kunnen bewerken. Dat sluit goed aan op de OpenFTV-code *(niet geverifieerd)*. De oudere API Manager werkt met Java-uitbreidingen.
{{< /chapter/section >}}

{{< chapter/section title="Tyk" level="3" >}}
[Tyk](https://tyk.io) schreef een [AuthZEN-plug-in](https://tyk.io/blog/authzen-standards-based-api-authorisation-for-api-gateways/) voor de interop. Het model van Tyk lijkt het meest op dat van Kong: Go-plug-ins werken in de open source gateway, en een response-plug-in kan het antwoord aanpassen. Een Go-plug-in moet wel bij elke nieuwe versie van Tyk opnieuw gebouwd worden. De interop-plug-in controleert het token niet en is dus een beginpunt, geen kant-en-klare PEP.
{{< /chapter/section >}}

{{< chapter/section title="Zuplo" level="3" >}}
[Zuplo](https://zuplo.com) heeft als enige een ingebouwde [AuthZEN-policy](https://zuplo.com/docs/policies/authzen-inbound), maar alleen in de Enterprise-versie. Over verplichtingen zegt de documentatie niets. Zuplo is een clouddienst; zelf hosten kan alleen als Enterprise-uitbreiding. Daarmee valt Zuplo af voor een open source Proefopstelling.
{{< /chapter/section >}}

{{< chapter/section title="Broadcom Layer7" level="3" >}}
Broadcom deed met Layer7 mee aan de interop, maar de implementatie is niet openbaar. Met de policies van Layer7 lijken alle vier de punten mogelijk *(niet geverifieerd)*: een JWT controleren, de PDP via HTTP aanroepen, na het doorsturen opnieuw beoordelen en JSON herschrijven. Layer7 is commercieel; het image vraagt een licentie via een supportcontract. Zonder licentie is Layer7 niet in de Proefopstelling te beproeven.
{{< /chapter/section >}}

{{< chapter/section title="Amazon API Gateway" level="3" >}}
Amazon API Gateway ondersteunt AuthZEN niet; de deelnemer aan de interop is een kleine Lambda. Een Lambda-authorizer kan de PDP vragen, maar ziet het antwoord nooit, en de gateway kan de inhoud van een antwoord niet aanpassen. Het antwoord beoordelen en velden weglaten vraagt dus een eigen Lambda tussen de gateway en elke dienst. Een demo kan alleen in AWS draaien.
{{< /chapter/section >}}

{{< chapter/section title="Azure API Management en Google Apigee" level="3" >}}
Geen van beide ondersteunt AuthZEN. Met hun eigen policies lijken alle vier de punten haalbaar *(niet geverifieerd)*: in Azure met `validate-jwt`, [`send-request`](https://learn.microsoft.com/en-us/azure/api-management/send-request-policy) en `set-body`, in Apigee met VerifyJWT, ServiceCallout en JavaScript. De PEP wordt dan wel geschreven in de policytaal van de leverancier, en een demo vraagt een account bij Microsoft of Google. De zelf te hosten gateway van Azure haalt zijn configuratie nog steeds uit Azure.
{{< /chapter/section >}}

{{< chapter/section title="Gravitee" level="3" >}}
Gravitee werkt aan AuthZEN, maar rond de eigen PDP: zowel de PDP als de [PEP-policy](https://www.gravitee.io/blog/pep-vs-pdp-in-gravitee) zijn Enterprise en raadplegen alleen de PDP van Gravitee. Een PEP voor een externe AuthZEN-PDP is er niet. In de open source editie kan het wel met de HTTP Callout-, Groovy- of een eigen Java-policy.
{{< /chapter/section >}}

{{< chapter/section title="Apache APISIX, NGINX en Traefik" level="3" >}}
- **Apache APISIX** heeft een [community-plug-in voor AuthZEN](https://github.com/twogenidentity/apisix-authzen), een bèta die alleen het verzoek controleert. Met de Go-plug-in-runner kan het antwoord wel beoordeeld en aangepast worden.
- **NGINX** ondersteunt AuthZEN niet. Het verzoek laten beoordelen kan met `auth_request` of njs (JavaScript). Het antwoord laten beoordelen kan alleen als NGINX de dienst zelf aanroept, en het controleren van een JWT tegen een JWKS zit alleen in het commerciële NGINX Plus.
- **Traefik Hub**, de commerciële versie, heeft een [AuthZEN-middleware](https://doc.traefik.io/traefik-hub/api-gateway/reference/routing/http/middlewares/ref-authzen) (early access) die alleen het verzoek controleert. In de open source Traefik Proxy kan een Go-plug-in het antwoord beoordelen en aanpassen.
{{< /chapter/section >}}

{{< chapter/section title="Vervolg" level="3" >}}
Het advies is om als volgende stap twee gateways in de Proefopstelling te beproeven, als vervanging van Kong bij één organisatie:

1. **De inway van OpenFSC**, omdat die al in gebruik is en al AuthZEN spreekt. Daarvoor wordt het ontbreken van verplichtingen eerst bij RINIS aangekaart: een toestemming met verplichtingen mag niet ongemerkt doorgelaten worden.
2. **Envoy met een eigen `ext_proc`-dienst** op basis van de OpenFTV-code. Die dienst is ook bruikbaar voor Istio en het WSO2 API Platform.

Voor de andere gateways geldt: Tyk en APISIX kunnen de OpenFTV-code met weinig werk hergebruiken, Gravitee, Azure API Management en Apigee vragen een PEP in hun eigen policytaal, en voor Zuplo en Layer7 is eerst een licentie nodig.

Werkt je organisatie met een gateway die hier ontbreekt, of heb je ervaring met een van deze gateways? Neem dan contact op met [ftv@ictu.nl](mailto:ftv@ictu.nl).
{{< /chapter/section >}}
