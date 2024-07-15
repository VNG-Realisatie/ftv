# references
- https://nlx.io/
- https://digilab.overheid.nl/projecten/federatieve-service-connectiviteit-fsc/
- https://federatief.datastelsel.nl/kennisbank/fsc/
- https://commonground.nl/page/view/736309a1-739a-47fc-abfd-67e71f1d9e59/consultatie-fsc
- https://commonground.nl/page/view/272a6103-4c0a-46c3-a597-5d7199aca983/architectuur
- https://gitlab.com/commonground/nlx/fsc-nlx
- https://docs.fsc.nlx.io/introduction
- https://commonground.gitlab.io/standards/fsc/core/draft-fsc-core-00.html

# snippets
- FSC heeft zijn wortels in NLX, een eerder project met hetzelfde doel dat gericht was op gegevensuitwisseling tussen overheidsinstanties. Tot september 2022 volgde het NLX-team een pad waarbij verplichte NLX gateway-software werd gebruikt voor gegevensuitwisseling. Dit riep echter weerstand op en vormde de aanleiding voor een objectiveringsonderzoek wat uitgevoerd is door Gartner.
- De Federatieve Service Connectiviteit standaard (FSC) is een cruciale ontwikkeling binnen de informatiekundige visie Common Ground. Deze standaard stelt gemeenten en overheidsorganisaties in staat om op een gestandaardiseerde en geautomatiseerde manier koppelingen te leggen binnen en tussen (overheids)organisaties.
- FSC richt zich op het ondersteunen en bevorderen van technische interoperabiliteit tussen verschillende (overheids)organisaties door een uniforme werkwijze voor gegevensuitwisseling te bieden. Dit bevordert naadloze samenwerking en gegevensdeling.
- FSC legt de nadruk op het uniformeren van gegevensuitwisseling, niet op het uniformeren van de gegevens zelf. Het biedt een uniforme werkmethode voor gegevensuitwisseling op basis van organisatie-identiteit.
- FSC bevat transparante gedelegeerde toegangsfunctionaliteit, waardoor organisaties hun rechten kunnen delegeren aan derden om gegevens te gebruiken zonder hun PKI-Overheid certificaten af te staan. Het biedt ook interoperabele logging voor transparantie en regie op gegevens,  waarbij over organisatiegrenzen heen inzicht is in het gebruik van gegevens.
- FSC is ontworpen met het oog op bestaande gateway-software en biedt een laagdrempelige adoptie voor bestaande systemen. 

# observations
FSC already contains an authorization chain, which is handled through "plugins", which translate to https requests to other services.
This mechanism can be used to plug in a PEP based on some policy engine (e.g. OPA/rego or Cedar).
However, currently, the authorization chain only accepts yes/no and a reason string.
There are no options to inject, transform or remove headers, query parameters or the body of the original request.
It is also not possible to perform any modification of the eventual response.
- https://gitlab.com/commonground/nlx/fsc-nlx/-/blob/main/docs/docs/fsc-in-production/setup-authorization.md?ref_type=heads
