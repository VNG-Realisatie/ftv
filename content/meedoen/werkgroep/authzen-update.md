---
type: 'chapter'
Title: AuthZEN update
---
{{< chapter/section title="" >}}
# AuthZEN update (1 september 2026)
{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Niels Dequeker (FTV)
- Marc de Boer (FTV)
- Ton van de Ven (FTV)
- Gideon Zegwaard (FDS)
- Mark Westbroek (VNG)
- Marcel Molenaar (UWV)
- Igor van Haren (Vecozo)
- Frank Terpstra (Geonovum)
- Joyce Leijen-Kouwenberg (Zorginstituut Nederland)
- Remo van Rest (Zorginstituut Nederland)
- Stas Mironov (Logius)
- Nil Barua (Logius)
- Maria Dziouba (Vecozo)
- Guus van der Meer (Vecozo)
- Arnoud Quanjer (VNG)
- Rens Kievit (MinBZK)
- Hugo Mostard (Gemeente Den Haag)
- Rob van Dort (mapplica)
- Danny Greefhorst (FDS)
- Govert Claus (GBO)
- Karl de Boer
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20260901-authzen-update.mp4)
- [Presentatie](/ftv/documents/20260901-authzen-update.pdf)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Opening en kennismaking
- Voortgang AuthZEN Working Group: de zeven voorstellen
- Rondvraag en updates van deelnemers
{{< /chapter/section >}}

{{< chapter/section title="Opening en kennismaking" >}}

*Michiel Trimpe* opent de 26e werkgroepsessie. Deze sessie richt zich op IAM (klassieke toegangsverlening); de volgende sessie gaat over ODRL en linked data. *Joyce Leijen-Kouwenberg* stelt zich voor als nieuwe deelnemer: zij werkt bij het Zorginstituut als informatieanalist in het iWlz-team, is collega van Remo van Rest en gaat hem ondersteunen bij de technische kant van het netwerkmodel.

*Michiel* nodigt deelnemers uit om ook eens fysiek aan te sluiten bij de werkgroep in Utrecht (Hoog Catharijne); graag vooraf even aangeven, zodat een passende zaal geregeld kan worden.

{{< /chapter/section >}}

{{< chapter/section title="Voortgang AuthZEN Working Group: de zeven voorstellen" >}}

*Michiel Trimpe* presenteert de stand van zaken in de AuthZEN-werkgroep van de OpenID Foundation. Sinds AuthZEN 1.0 eind vorig jaar final werd, is de werkgroep sterk gegroeid en zijn er zeven voorstellen ingebracht: COAZ ('Cozy') en COAZ-MCP, ARAP en AROP, en drie OAuth-gerichte voorstellen (issuance, token exchange en claims).

**Status van de voorstellen**

Naar aanleiding van vragen uit de groep licht *Michiel* de status toe: het zijn allemaal losse profielen bovenop AuthZEN 1.0, geen wijzigingen eraan. Ze leiden dus niet tot een AuthZEN 2.0 of een breaking change en kunnen onafhankelijk van elkaar worden goedgekeurd. Voor elk voorstel heeft de werkgroep het *aandachtsgebied* omarmd, maar de documenten zelf en hun structuur staan nog ter discussie. COAZ is daarop de uitzondering: daar is al brede consensus over en er wordt naar verwachting weinig meer aan veranderd. Bij de drie OAuth-voorstellen komen vrijwel zeker nog stevige veranderingen: samenvoegen, uitsplitsen of anders aanpakken.

Wat wel tot een nieuwe basisdiscussie leidt is capability negotiation: die zat niet in 1.0 (daar is bewust het contextveld voor aangewezen), maar er is inmiddels besloten dit als apart profiel uit te werken: hoe dwingt een PDP af dat de PEP een capability ondersteunt. De verwachting is dat obligations daarna relatief eenvoudig toegevoegd kunnen worden.

*Igor van Haren* vraagt of dit alles een theoretisch vraagstuk is of breder gedragen wordt. *Michiel* schetst het draagvlak: Keycloak ondersteunt AuthZEN al vanuit de rol van PDP en praat mee, en op een Gartner-conferentie demonstreerden zo'n acht authentication-providers vorig jaar dat dit patroon met AuthZEN in hun producten te bouwen is, ieder nog op zijn eigen, niet-gestandaardiseerde manier. Dat een leverancier vervolgens zijn eigen puntoplossing ter standaardisatie voorlegt, zegt iets over de bereidheid in de werkgroep om hier gezamenlijk aan te werken; voor grote leveranciers is brede PDP-integratie bovendien gewoon een gewild vinkje.

**ARAP en AROP: toegang vragen na een afwijzing**

*Michiel* legt het patroon uit: een deny is vaak geen definitieve afwijzing: met een extra stap (goedkeuring van een manager, een formulier, extra authenticatie) kan het verzoek alsnog worden toegekend. Dat is nu overal maatwerk; een leverancier heeft daarom een standaard voorgesteld. Bij een afwijzing krijgt de PEP een access request token mee, met daarbij een template, een formulier-URL of een JSON-schema (dat laatste vooral met AI-agents in gedachten). Het vervolgverzoek gaat naar een access request service; de PEP kan met backoff pollen tot er een approval token komt, waarmee het oorspronkelijke verzoek alsnog wordt goedgekeurd.

Op een vraag van *Marcel Molenaar* verduidelijkt *Michiel* de verhouding tussen de twee: ARAP is het generieke profiel voor het patroon, AROP de invulling ervan binnen OAuth. AROP benoemt daarvoor drie transports: CIBA (back-channel, bijvoorbeeld een melding op de telefoon om met DigiD te bevestigen), transaction authorization (de resource server geeft vooraf een gesigneerd token mee) en de deferred token response — dat laatste is een OAuth-voorstel van dezelfde indiener en loopt via de OAuth-werkgroep; ARAP en AROP zelf lopen via AuthZEN.

*Stas Mironov* vraagt waarom het approval token alleen sender-constrained (DPoP/mTLS) is gespecificeerd. *Michiel* antwoordt dat het patroon bewust binnen één domein blijft: het token is geen cryptografisch zelfverifieerbaar token, maar een identifier die de service tegen de eigen administratie controleert. Federeren zou een geheel nieuwe problematiek opentrekken.

**COAZ en COAZ-MCP: mappen in plaats van maatwerk-PEP's**

Het onderliggende probleem: elke applicatie heeft nu een eigen, domeinspecifieke PEP nodig. Dat is niet per se slecht (het dwingt tot nadenken over het informatiemodel, iets wat de FTV-standaard ook eist), maar het is werk, en bij aangeleverde applicaties valt er weinig te kiezen. Waar de input al netjes op een AuthZEN-verzoek te mappen is, biedt COAZ daarvoor een declaratieve mapping-taal. *Marcel Molenaar* vraagt wanneer dat zinvol is; hij denkt aan integratieplatforms. *Michiel* bevestigt: integratieplatforms (zoals Boomi, dat bij UWV in gebruik komt) hebben hier vaak al eigen mapping-tooling voor; COAZ is juist voor situaties zonder zo'n platform, waar de mapping technisch eenvoudig uit te drukken is.

COAZ-MCP past dit toe op het Model Context Protocol, de standaard waarmee AI-agents externe tools aanroepen. De MCP-gemeenschap wilde AuthZEN niet zelf integreren; de oplossing gebruikt daarom uitsluitend standaard MCP-functionaliteit: de MCP-server geeft in zijn toolcatalogus een X-AuthZEN-mapping-header mee, de client stuurt die bij elke tool call door, en een MCP-gateway zet de call daarmee om in een AuthZEN-verzoek aan de PDP. Zo is AI-toolgebruik organisatiebreed te autoriseren met de bestaande autorisatie-infrastructuur. Op vragen van *Marcel* wordt de verantwoordelijkheidsverdeling scherpgesteld: de gateway dwingt af op basis van de mapping uit de catalogus, en achterliggende tools en applicaties houden hun eigen verantwoordelijkheid voor fijnmazige autorisatie.

Besproken wordt nog of zulke mappings gedeeld zouden moeten worden: voor de werkgroep is interessant dat overheidsdomein-specifieke mappings herbruikbaar zouden zijn als iemand ze eenmaal maakt, al wringt dat mogelijk met de eis in het eigen [NL GOV-profiel voor AuthZEN, hoofdstuk 5 (Information Model)](https://gitdocumentatie.logius.nl/publicatie/ftv/authzen/#information-model) om alles netjes te informatiemodelleren.

**Issuance, token exchange en claims: de PDP in de authorization server**

De drie OAuth-voorstellen halen de beslislogica van de authorization server naar een PDP. Issuance gaat over het initiële token: de OAuth-spec zegt nu slechts dat uitgifte 'volgens het beleid van de organisatie' gebeurt; het voorstel maakt daar een AuthZEN-aanroep van, met vaste semantiek voor de belangrijke velden: granted scope, token lifetime, audience en authorization details mag de PDP versmallen, nooit verbreden. Token exchange doet hetzelfde voor het doorgeven van een token naar de volgende stap in de keten, waarbij het token getransformeerd wordt (kleinere scope, ander audience, bijvoorbeeld de gebruikersidentiteit eraf strippen). Claims regelt claim enrichment: op basis van policies dynamisch bepalen welke claims (groups, roles, entitlements) in het token komen.

Op een vraag van *Marcel* onderscheidt *Michiel* de eerste twee: bij issuance is er nog geen token en gaat het om het eerste token uit een OAuth-verzoek; bij token exchange is er al een geldig token dat voor de volgende hop moet worden omgezet. Voor alle drie geldt: de scope is omarmd, maar over de voorgestelde structuur (aparte evaluations-calls met eigen action types) is de werkgroep het nog niet eens. *Marcel* geeft aan dit patroon binnen UWV te willen toepassen rond de eigen autorisatieserver, en vindt vooral het idee aantrekkelijk dat policies bepalen welke claims een token in mogen.

{{< /chapter/section >}}

{{< chapter/section title="Rondvraag en updates van deelnemers" >}}

*Mark Westbroek* had een ODRL-onderwerp klaarstaan; in overleg wordt dat doorgeschoven naar de volgende sessie, over ODRL, zodat hij het rustig kan voorbereiden.

**Update UWV: modernisering IAM**

*Marcel Molenaar* toont de doelarchitectuur van het UWV-programma voor externalized authorization management (EAM), cloud en federatie. Kern is een identity broker die aan de buitenkant SAML/OpenID Connect praat met DigiD, eHerkenning en eventuele andere IdP's, en aan de binnenkant OAuth/OpenID Connect. Omdat OAuth de keten van machtigingen en vertegenwoordiging (DigiD Machtigen, eHerkenning) niet oplost, houdt de broker daarvoor mogelijk een sessie bij; of die informatie uiteindelijk toch in een token belandt, is nog niet besloten. Elke stap in de keten vereist een token exchange bij de autorisatieserver; precies het patroon uit de eerder besproken voorstellen, en voor *Marcel* de directe aanleiding voor zijn vragen. PEP's komen in alle componenten terug, ook in de API-gateways, het iPaaS (Boomi) en een eventuele datavirtualisatielaag; de technologiekeuze voor het PBAC-mechanisme loopt nog. Op een vraag van *Stas Mironov* bevestigt *Marcel* dat maximaal wordt ingezet op open standaarden (aan de buitenkant het NL GOV-profiel), zodat producten uitwisselbaar blijven. Het gekozen product (Ping) dateert van vóór het besef dat Amerikaanse afhankelijkheid een reëel probleem is.

*Mark Westbroek* vraagt naar logging en het Logboek Dataverwerkingen. *Marcel* antwoordt dat UWV werkt aan een observability-doelarchitectuur met zes à zeven onderscheiden logdoelen; het compliance-log daarin gaat hieraan voldoen. De PAP ontbreekt bewust in de plaat: die levert policies aan de PDP maar speelt geen rol op runtime. *Frank Terpstra* biedt aan om samen met Logius langs te komen om de uitwerkingen en referentie-implementaties rond het Logboek Dataverwerkingen te laten zien.

*Frank Terpstra* vraagt of het UWV zou helpen als DigiD en eHerkenning direct OpenID Connect zouden leveren in plaats van alleen SAML. Voor UWV maakt het weinig meer uit: de broker is er juist om onafhankelijk te zijn van wat er aan de buitenkant gebeurt. De bestaande OIDC-mogelijkheid blijkt bovendien een paarse krokodil die alleen voor de Belastingdienst beschikbaar is; *Marcel* herinnert zich uit zijn eHerkenning-tijd dat een OAuth-specificatie daar ook al bestond maar niet gebruikt werd.

{{< /chapter/section >}}

{{< chapter/section title="Vervolgstappen" >}}

- De volgende sessie, over twee weken, gaat over ODRL/linked data; *Mark Westbroek* presenteert daar zijn ODRL-onderwerp. Twee weken daarna staat weer een AuthZEN/IAM-sessie gepland.
- *Marcel Molenaar* deelt de getoonde UWV-architectuurplaat met de werkgroep.
- UWV kijkt naar het aanbod van *Frank Terpstra* om met Logius de referentie-implementaties rond het Logboek Dataverwerkingen te komen toelichten.
{{< /chapter/section >}}

*Deze notulen zijn met behulp van een LLM gegenereerd uit de opname en gereviewd door mensen.*
