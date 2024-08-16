---
weight: 40
title: 'Potentiele toekomst'
---

# Potentiele toekomst

## Toekomst

Een potentiele oplossing ligt in het gebruik van Policy Based Access Control (PBAC).
Op basis van policies wordt dan toegang verleend of niet.
Een policy is een set van (beleids-)regels waaraan een dataverzoek moet voldoen.

Een andere aanduiding voor PBAC is Policy As Code (PAC).
De toegangsregels worden uit een softwarepakket gehaald en als losse code (de policies) aangeboden.

Voor een afnemer is de sleutel, om te bepalen welke policy(ies) van toepassing zijn, gekoppeld aan de gebruiker,
eventueel de rol en/of het zaaktype, de te bevragen data (URL) en het soort bevraging (in de meeste gevallen vooralsnog een GET request).

Bij de aanbieder zal de sleutel meest waarschijnlijk aan het OIN van de afnemer en de te bevragen data (URL) en soort bevraging (GET) gekoppeld zijn.

## Toegevoegde waarde van policies

Middels diverse PBAC-standaarden is het mogelijk om extra voorwaarden aan een request te stellen.
Bv. door extra headers of query parameters toe te voegen danwel te wijzigen.

Op dit gebied is voor zover bekend (nog) geen onderzoek verricht.

### Centraliseren van rol/zaaktype gerichte API calls 

Een toegevoegde waarde ligt erin dat veel voorkomende filters op datagegevens en/of transformaties uit de applicatiecode naar policies verplaatst kunnen worden.

Voor software leveranciers is er dan minder druk om, een bevraging naar dezelfde API, van verschillende kenmerken te voorzien, afhankelijk van de rol of zaaktype waarbinnen de vraag wordt gesteld.
Zij kunnen dan volstaan met een generieke API-call, en de verantwoording en beheersbaarheid van de verschillende filters en/of transformaties wordt dan door de met de rol/zaaktype overeenkomende policy uitgevoerd.
Dit maakt het hele proces overzichtelijker, beter beheersbaar en makkelijker te auditen.

### Bevestiging van uitgevoerde policies

Een andere mogelijkheid is het toevoegen van hashes van uitgevoerde policies:
1. De PDP van de afnemer vraagt bij de PAP relevante policies op.
2. De PAP levert de policies en een hash van de inhoud van iedere geleverde policy.
3. De PDP levert aan de PEP de toegevoegde voorwaarde om een header aan de request toe te voegen met deze hashes.
4. Tijdens de afronding van het contract tussen afnemer en aanbieder heeft de aanbieder de relevante policies bij de afnemer opgehaald en de hashes vastgelegd.
5. De PDP van de aanbieder controleert de specifieke header met hashes in combinatie met de OIN van de afnemer of ze overeenkomen met wat er in de contractfase is vastgelegd.

## PBAC

Het PBAC verhaal is al in diverse projecten redelijk succesvol gebleken.
De grootste kanttekeningen die hierbij worden gemeld zijn:
1. wie gaat wat doen? (verantwoording)
2. hoe worden policies samengesteld? (de diverse talen van policies zijn niet heel erg leesbaar voor leken)

PBAC wordt vaak uit 4 componenten samengesteld.

### Policy Enforcement Point (PEP)

Dit is het onderdeel dat de slagboom vormt en op basis van het resultaat van de PDP bepaald of er toegang wordt verleend of niet, 
en mogelijk, indien wel toegang wordt verleend, onder welke toegevoegde voorwaarden.

### Policy Decision Point (PDP)

Dit is het onderdeel dat door de PEP wordt aangestuurd en op basis van (mogelijk door de PIP getransformeerde) attributen de door het PAP uitgekozen policies uitvoert,
en dan aan de PEP doorgeeft of toegang verleend mag worden of niet, en zo ja, onder welke toegevoegde voorwaarden.

### Policy Information Point (PIP)

Dit is het onderdeel dat door de PEP aangeleverde attributen omzet naar voor de PDP te begrijpen waarden.
Bv. het zaaktype wordt omgezet naar een federatief aanvaarde code.

### Policy Administration Point (PAP)

Dit is het onderdeel dat de policies beheerd.
Op verzoek van de PDP bepaalt de PAP op basis van de meegeleverde attributen de sleutel van 1 of meerdere policies,
en geeft deze terug aan het PDP om uit te voeren.

Een PAP kan mogelijk beschikbaar gesteld worden via een publiek toegankelijke API waarmee de policies op te vragen zijn (transparantie).

## PBAC Integratie

Voor de integratie van PBAC zijn twee mogelijkheden.
Het is mogelijk, en wellicht ook wenselijk, om beide mogelijkheden in een toekomstige standaard op te nemen.
Voor het uitvoeren van policies maakt het verder niet uit waar de PEP zich bevindt. 

## PBAC optie 1

In deze schets bevat de API-gateway de PEP en roept vandaaruit de PDP aan.

Deze optie valt te verkiezen indien de API-gateway voldoende ondersteuning heeft om als PEP te fungeren.

![PBAC versie 1](/architecture/modern-auth-pbac1.png)

## PBAC optie 2

In deze schets is de PEP een losse component die tussen de applicatie en de API-gateway geplaatst wordt en vandaaruit de PDP aanroept.

Deze optie valt te verkiezen indien de API-gateway niet voldoende ondersteuning heeft om als PEP te fungeren.

![PBAC versie 2](/architecture/modern-auth-pbac2.png)

## PBAC met poortwachter

De poortwachter stelselfunctie van het FDS kan het federatieve systeem worden,
waarmee wet- en regelgeving, beleidsregels en contractafspraken geadministreerd worden.

Deze door mensen opgestelde regels worden in meer technische toegangsregels vertaald en opgeslagen.

Een policy generator zou op basis van deze toegangsregels policies moeten kunnen genereren in elke gewenste policy taal.
Bv. XACML, ODRL of Rego (OPA).

De poortwachter stelselfunctie verdient duidelijk nog een intensievere inventarisatie en uitwerking.
Hier moeten de beheerders en de techniek samenkomen, 
en het is te voorzien dat dit verreweg de meeste inspanning zal vergen.
Met name om het gebruiksvriendelijk te houden zonder functionaliteit te verliezen,
en om te voorkomen dat de hoeveelheid en complexiteit van alle toegangsregels te overweldigend wordt.

Een notificatie-systeem kan een welkome toevoeging op dit plaatje zijn.
Middels notificaties kunnen de PAPs van de diverse partijen dan op de hoogte gehouden van wijzigingen,
zodat zij in staat zijn hun lokale cache van policies op te frissen.

Er dient nog bepaald te worden hoe dit niet als een single point-of-failure gezien kan worden.
Een ander punt is welke partij(en) de verantwoording voor de juiste invulling op zich dienen te nemen,
en hoe men daar invulling aan moet geven.

![PBAC uitgeklapt](/architecture/pbac1-poortwachter.png)
