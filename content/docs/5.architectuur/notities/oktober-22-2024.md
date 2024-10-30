---
title: 'De Toekomst Van Federatieve Toegang'
---

# De Toekomst Van Federatieve Toegang

## Notities MvA
- In het technische spoor hebben geprobeerd om de verschillende standaarden die er zijn te verzamelen en te bespreken. Voorbereid door Marc van Andel en Gerard Juijn hebben we de volgende standaarden besproken, met speciale dank aan Maarten Kollenstart voor zijn toelichting op ODRL:
  - XACML
  - ODRL
  - Lock-Unlock (of eigenlijk: een Authorization Ontology )
  - Open Policy Agent (OPA) met Rego-lang
  - Cedar Policy
  - Cerbos/CEL
  - ad hoc toegevoegd door de zaal (en niet echt besproken):
    - LegalRuleML
    - Zanzibar
    - 'AI-powered' -> straks kunnen we onze policies gewoon in het Nederlands beschrijven en AI 'rekent' wel uit wat de policies dan precies moeten zijn 😄 #whoknows
- In de presentatie staan de korte introducties, voorbeelden en voor- en nadelen opgesomt
- De bedoeling was om daar vervolgens over in discussie te gaan en om gevoel te krijgen bij de verschillen ... maar bij slide 2 kwam de discussie al op gang! 💪 -> dank aan jullie actieve bijdragen en deelname hieraan! Dit was precies het doel ... en dat kwam sneller en gemakkelijker tot stand dat we van tevoren hadden verwacht 🙂
- Overall kernpunten die besproken zijn:
  - Policies:
    - Is het wel handig, mogelijk, beheersbaar, transparant om stelselpolicies te ontwikkelen en beheren? Is dat niet veel te complex? Zijn de toepassing van policies niet veel te custum build ín applicaties?
    - Bestaan stelselpolicies eigenlijk wel? Policies voor afnemers zijn toch niet hetzelfde als policies voor aanbieders? Die zijn helemaal niet herbruikbaar ... en dus hoeven deze ook niet op stelsel niveau te bestaan. En toch ... er is wél samenhang tussen de policies die een afnemer toepast en die een aanbieder toepast om over het totaal tot een goede afweging te komen of een verwerking wel is toegestaan NOTE Verwerking zoals in AVG wordt gebruikt en dat duidt (dus) zowel op verstrekking of bevraging als op wijzigen, opvoeren, verwijderen en zo
    - Zijn stelselpolicies niet van een hoger niveau en meer als afspraken van een vertrouwensraamwerk ipv detail en uitvoerbare policies in een Policy Enforcement Point, zoals XACML dat benoemt? -> wellicht ... of misschien beide? Ja, er zijn generiek(ere) of algemene (juridische?) constructen en afspraken (policies) nodig tbv het vertrouwen in een federatief datastelsel ... én er zijn uitvoerbare en in samenhang policies nodig om autorisaties goed te organiseren
  - Policy talen / standaarden:
    - Eigenlijk bestaat er - helaas - geen silver bullet voor policies tbv federatieve toegangsverlening 💥 Wat hadden we anders verwacht? 😄
    - Maar, nog sterker, geen enkele standaard lijkt zich ook prettig te lenen om snel, gemakkelijk en toepasbaar autorisatie policies te kunnen bieden:
      - Vrijwel alle standaarden zijn minder open dan het lijkt
        - Er is bij elke standaard een commercieel belang van een partij ... waar we vrij direct van afhankelijk worden bij toepassing van die standaard
        - Er zijn wel Open Source projecten bij elke standaard ... maar direct gebruik is toch niet mogelijk zonder extra werk of de betrokken commerciële partij
      - Vrijwel alle standaarden bieden niet direct mogelijkheden voor interoperabiliteit. In ieder geval niet zonder werk
  - Omgeving, context en voorwaarden:
    - Autorisatie is toch wel sterk verbonden met de omgeving en context waarin dat wordt toegepast
    - Hoe identiteiten worden beheerd, bepaald mogelijkheden voor autorisatie ... en standaarden zijn daar vaak vrij direct mee verbonden. Dat betekent dat autorisatiestandaarden niet direct uitwisselbaar zijn omdat identiteiten niet interoperabel zijn.
    - Autorisaties zijn een onderdeel van een groter geheel en 'slechts' een stukje van de puzzel
      - In hoeverre partijen elkaar vertrouwen of een (data-)contract hebben opgesteld, stelt eisen en voorwaarden aan autorisatie
      - Hoe de (technische) beveiliging is ingericht, bepaalt voorwaarden voor autorisatie
- In de zoektocht naar 'De toekomst van Federatieve Toegang' is er geen duidelijke kandidaat voor 'one standard to rule them all', moeten de voorwaarden en context waarin autorisatie wordt toegepast en beheerd preciezer worden beschreven / gekozen / beperkt en zijn we al snel afhankelijk van externe actoren, met name marktpartijen ... 😏
  - We eindigden daarom met een oproep: -
    "Zullen we de regie rondom autorisaties naar ons toe trekken? Laten we een project starten om te bepalen wat we precies nodig hebben en laten we dat gaan uitwerken. Dat moet toch te doen zijn in 1,5 jaar?!?!"  
    - Suggesties:
      - De Authorization Ontology van Lock-Unlock lijkt dan het meest geschikt ...
      - Zou ODRL dan niet een goede beweging zijn om bij aan te sluiten en die beter en passend te maken?
      - Project federatieve toegangsverlening succes!! 😁 Go, go, go!

## Aanvullende notities GJ
- Er zijn bij Logius al enkele standaarden ten aanzien van autorisatie; wel goed om hier ook wat meer aandacht aan te besteden en te bepalen in hoeverre hier op voortgeborduurd kan worden.
- Hoe verhoudt ons verhaal zich tot identificatie en authenticatie, bv OAuth. OAuth zet zichzelf in de markt als een autorisatie techniek. Het is echter alleen een beschrijving van de authenticatie en autorisatie flows. Daar zijn wel allerlei (open) implementaties van, maar het is vooral als RBAC ingericht, en voor PBAC levert het naar mijn inzicht alleen een paar van de attributen, maar zeker niet de gehele context.
- Er werd de zorg geuit dat we het juridische deel zwaar belichten en dan in 1 keer naar de techniek springen. Maar hoe kom je nu van wet- en regelgeving naar policies?
- De genoemde policy talen zijn inderdaad geen van allen een silver bullet. Het klinkt als het kiezen uit 7 kwaden... Kan er niet een overkoepelende taal bedacht worden, waaruit policies in de andere talen gegenereerd kunnen worden?

## Aanvullende notities MT
- Wat valt er precies onder "Toegangsverlening"?
  - Identificatie wordt niet meegenomen. Maar hoe komen we dan tot gebruikers met attributen? Is dat al een gegeven?
  - Betreft het ook gebruik van API's door eindgebruikers? Of gaat het alleen overheid2overheid API's binnen het FDS?
- XACML en ODRL zijn wel standaarden; maar met nog veel vrijheidsgraden. Dus in de praktijk kunnen policies geschreven voor de ene PDP/engine vaak niet uitgevoerd worden in de andere PDP/engine.
- Sommige policies kan je niet in de PDP afdwingen. Bijvoorbeeld wanneer je de resultaten in een database query moet filteren. Hoe werkt dat in de praktijk?
- Voor policies wil je soms juist het bestaande en goed beveiligde en bestaande uitrolproces rondom de bestaande applicatie gebruiken. Hoe zou dat werken met een centrale policy store?

## Aanvullende notities RJvV

| Criterium                 | XACML | ODRL | Lock/Unlock | Rego | Cedar | Cerbos |
|---------------------------|-------|------|-------------|------|-------|--------|
| Open standaard            | ja    | ja   | nee         | ja   | ja    | ja     |
| Leesbaar voor mensen      | nee   | nee  | nee         | nee  | nee   | nee    |
| Open source               | nee   | nee  | ja          | ja   | ja    | ja     |
| Compleetheid voor FTV     | ?     | ?    | ?           | ?    | nee   | ?      |
| Adoptie wereld            | ja    | ja   | nee         | ja   | ja    | ja     |
| Adoptie NL                | ?     | ?    | nee         | ja   | ?     | ?      |
| Geen eigenaardigheden     | nee   | nee  | nee         | nee  | nee   | nee    |
| Lage leercurve            | nee   | nee  | nee         | nee  | nee   | nee    |
| Levende gemeenschap       | nee   | nee  | nee         | ja   | ja    | ja     |
| Leverancier onafhankelijk | ja    | ja   | ja          | nee  | nee   | nee    |
| PBAC waardig              | ja    | ja   | ?           | ja   | ja    | ja     |
| RBAC waardig              | ja    | ja   | ?           | ja   | ja    | ja     |
| Europese oorsprong        | nee   | nee  | nee         | nee  | nee   | nee    |

- Conclusie van een ander was: je schotelt ons gewoon 5 kwaden voor?! Waarom?
- Mijn Conclusie: inderdaad veel te veel "nee". Maar je must-have criteria zijn wel helder.
- Veel gehoorde opmerking: beter vertrekken vanuit een bestaand kwaad dan vanuit een Europees consortium.
- Die krijgen enorme bedragen, maar daar komt weinig uit, want het meandert alle kanten op, politiceert, etc.
- Mijn voorstel voor de standaard:
  - Vindt de 3 handson europese landen die concreet onderweg zijn
  - Identificeer de 3 handson onderzoekgroepen of schrijf een Europese wedstrijd uit
  - Maak een verzoek tot proposal en contract, waarbij de criteria uitgangspunt zijn
  - Geef heldere tijdboxen daarin: december 2024 concreet, handson voorstel, december 2025 een in alles compleet werkende oplossing,
- Conform de tijdslijnen van het project, met opleveringen in Q1, Q2, Q3, etc.
- Op deze manier krijgen we een europese standaard, open source, open standaard, leesbaar, lage leercurve, PBAC en RBAC waardig.
- Het model is niet veel anders dan de Kadaster PoC. Maar dan met veel meer denkkracht, grootschaliger.
- Mijn voorstel voor de adoptie in Nederland (en de andere 2 landen):
  - Ga inderdaad aan de slag met gemeente Rotterdam in concrete beproeving met 3 gemeentes
  - Gemeente Rotterdam in verbinding met de G4 gemeentes en Dimpact (40 middelgrote gemeentes), met PoCs en Hackaton’s
  - Verbind dat in het sociaal domein met Zorgpartners (via Nictiz, Vecozo, VWS)
  - Verbind dat in het sociaal domein met Justitiepartners (via J&V, zodat je politie, OM, 3RO, VT, COA, IND, CJIB, etc. aan boord krijgt)
- Dan kan het snel geadopteerd worden.

(als ik het zo opschrijf, klinkt het veel te makkelijk, hoop dat je je daar niet aan stoort).

## Samenvatting
In het technische spoor is kort samengevat wat PBAC is, en uit welke componenten het bestaat, hoe policies werken en de context waarin ze hun werk moeten doen.
We hebben de policy-talen, alsmede de voor- en nadelen van, XACML, ODRL, Rego, Cedar en Cerbos de revue laten passeren, alsmede het Lock/Unlock project van Kadaster.
Een aantal talen die vanuit de zaal naar voren zijn gebracht, en die nader bekeken moeten worden, zijn LegalRuleML, Zanzibar, en wellicht zelfs AI powered access control.
Ook al valt identificatie/authenticatie buiten de scope van het project, dient wel de koppeling naar autorisatie verder verdiept te worden, rekening houdend met reeds bestaande standaarden.
Wat er nog miste in de presentatie, hoe we van wet- en regelgeving tot policies moeten komen, is een belangrijk en onderkend aandachtspunt, dat in het project meegenomen zal worden.
Iedereen onderkent dat er veel baat is bij een standaard voor autorisatie, dat er geen makkelijke weg is, dat het juridisch nu niet goed zit, maar dat er toch snel een oplossing moet komen.
Het voorstel vanuit de zaal is eigenlijk "waarom niet een eigen, door niet technische mensen te lezen, federatieve, policy-taal bedenken", met mogelijke vertaal-modules naar bestaande policy-talen, en vooral niet te wachten op Europese richtlijnen.
