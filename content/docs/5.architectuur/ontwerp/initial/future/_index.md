---
weight: 40
title: 'Potentiele toekomst'
---

# Potentiele toekomst

Een potentiele oplossing ligt in het gebruik van Policy Based Access Control (PBAC).
Op basis van policies wordt dan toegang verleend of niet.
Een policy is een set van (beleids-)regels waaraan een dataverzoek moet voldoen.

Voor een afnemer is de sleutel om te bepalen welke policy(ies) van toepassing zijn, gekoppeld aan de gebruiker,
eventueel de rol en/of het zaaktype, de te bevragen data (URL) en het soort bevraging (in de meeste gevallen vooralsnog een GET request).

Bij de aanbieder zal de sleutel meest waarschijnlijk aan het OIN van de afnemer en de te bevragen data (URL) en soort bevraging (GET) gekoppeld zijn.

## PBAC

Het PBAC verhaal is al in diverse projecten redelijk succesvol gebleken.
De grootste kanttekeningen die hierbij worden gemeld zijn:
1. wie gaat wat doen? (verantwoording)
2. hoe worden policies samengesteld? (de diverse talen van policies zijn niet heel erg leesbaar voor leken)

PBAC wordt vaak uit 4 componenten samengesteld.

### Policy Enforcement Point (PEP)

Dit is het onderdeel dat de slagboom vormt en op basis van het resultaat van de PDP bepaald of er toegang wordt verleend, en mogelijk ook onder welke voorwaarden.

### Policy Decision Point (PDP)

Dit is het onderdeel dat door de PEP wordt aangestuurd en op basis van (mogelijk door de PIP getransformeerde) attributen de door het PAP uitgekozen policies uitvoert,
en dan aan de PEP doorgeeft of toegang verleend mag worden of niet, en zo ja onder welke condities.

### Policy Information Point (PIP)

Dit is het onderdeel dat door de PEP aangeleverde attributen omzet naar voor de PDP te begrijpen waarden.
Bv. het zaaktype wordt omgezet naar een federatief aanvaarde code.

### Policy Administration Point (PAP)

Dit is het onderdeel dat de policies beheerd.
Op verzoek van de PDP bepaalt de PAP op basis van de meegeleverde attributen de sleutel van 1 of meerdere policies,
en geeft deze terug aan het PDP om uit te voeren.

## PBAC versie 1

In deze schets bevat de API-gateway het PEP onderdeel en roept vandaaruit de PDP aan.

![PBAC versie 1](/architecture/modern-auth-pbac1.png)

## PBAC versie 2

In deze schets is de PEP een losse component die tussen de App en de API-gateway geplaatst wordt en vandaaruit de PDP aanroept.

![PBAC versie 2](/architecture/modern-auth-pbac2.png)

## PBAC met poortwachter

De poortwachter stelselfunctie van het FDS kan het federatieve systeem worden,
waarmee wet- en regelgeving, beleidsregels en contractafspraken geadministreerd worden.

Deze door mensen opgestelde regels worden in meer technische toegangsregels vertaald en opgeslagen.

Een policy generator zou op basis van deze toegangsregels policies moeten kunnen genereren in elke gewenste policy taal.
Bv. XACML, ODRL of Rego (OPA).

De poortwachter stelselfunctie verdient duidelijk nog een intensievere inventarisatie en uitwerking.
Hier moeten de beheerders en de techniek samenkomen, en het is te voorzien dat dit verreweg de meeste inspanning gaat vergen.

![PBAC uitgeklapt](/architecture/pbac1-poortwachter.png)
