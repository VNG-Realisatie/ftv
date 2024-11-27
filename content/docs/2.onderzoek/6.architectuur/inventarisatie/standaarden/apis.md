---
title: 'APIs'
---

# APIs

## Links
- https://geonovum.github.io/KP-APIs/
- https://docs.geostandaarden.nl/api/API-Strategie-mod-access-control/#authorization
- https://docs.geostandaarden.nl/api/API-Strategie-architectuur/#autorisatie
- https://docs.geostandaarden.nl/api/API-Strategie-architectuur/#token-based-autorisatie
- https://docs.geostandaarden.nl/api/API-Strategie-architectuur/#event-driven-architecture-eda

## Fragmenten
- It is RECOMMENDED to use token-based access to APIs. REST APIs SHOULD NOT maintain session state on the server. The authentication and authorization of a request SHOULD NOT depend on sessions. Instead, a token has to be sent with each request.
- In a production environment as little information as possible is to be disclosed. Apply the following rules for returning the status error code 401 Unauthorized, 403 Forbidden, and 404 Not Found.
- Note that authentication in the cases below is typically client authentication, and the Authorization header contains information on the End-User authorization and authentication, if applicable.
- Bij autorisaties op basis van API's wordt vaak onderscheid gemaakt tussen grofmazige, role based, en fijnmazig, domein-specifieke autorisatie. Hierbij worden grofmazige, role based, autorisaties vaak centraal ingeregeld, bijvoorbeeld middels de API Gateway. Dit geeft mede invulling aan de eisen die worden gesteld vanuit wet- en regelgeving, namelijk dat autorisatie is ingericht conform doelbinding.
- API Policy handhaving gaat over het toepassen van de ontwikkelde API policies op API endpoints. Hierbij kan onderscheid worden gemaakt tussen policies die altijd van toepassing zijn en policies die afhankelijk van de aangeroepen API of de afgesproken service levels worden toegepast. Voorbeelden van policies zijn syntactische en semantische validaties van inkomende en uitgaande API aanroepen, maar ook autorisatie en throttling worden veelal geïmplementeerd als verkeersstroom policies.
- Door de toepassing van gedelegeerde identificatie en authenticatie in combinatie met tokens, wordt het ingewikkelder om applicatie-specifieke autorisatie toe te passen. De API aanbieder moet bijvoorbeeld autorisatie beslissingen nemen op basis van de beperkte set aan data in het ontvangen token.
- Voor gevallen dat het token onvoldoende informatie biedt om een autorisatie beslissing op te baseren, kan het benodigd zijn om token introspection toe te passen. In dit geval vraagt de API aanbieder op basis van het ontvangen token meer informatie over de geauthenticeerde gebruiker bij de Identity Provider.
- Een belangrijk component bij autorisaties in de context van API's is de API Gateway. Op basis van een door de Identity Provider afgegeven access token kan de API Gateway beslissen of API aanroepen zijn toegestaan of niet. Hierbij kan de API Gateway role-based access control (RBAC) toepassen; domein-specifieke autorisaties worden over het algemeen toegepast door de back-ends om implementatie van business logica in de API Gateway te voorkomen.
- Voor de implementatie van domein-specifieke autorisaties in de back-ends kunnen tevens microgateways of een service mesh oplossing worden gekozen. Bijkomend voordeel van het gebruik van een service mesh is dat deze standaard werken op basis van zero-trust networking.
- EDA brengt voordelen met zich mee op het gebied van flexibiliteit en robuustheid van de IT-Architectuur van een organisatie door de mate van ontkoppeling en asynchrone verwerking die deze architectuur mogelijk maakt.
