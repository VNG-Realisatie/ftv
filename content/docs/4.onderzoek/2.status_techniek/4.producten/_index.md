---
weight: 40
bookCollapseSection: true
title: "Producten"
---

# Producten

Toegangsverlening is een groeimarkt. Gedistribueerde architectuur met microservices, vertrouwensraamwerken en meer
gegevensuitwisseling tussen partijen in het algemeen maken dat er een sterk toenemende vraag is naar praktische oplossingen.
Commerciële partijen zien dat implementatie moeilijk is, technisch en organisatorisch, en zijn in de ruimte gestapt.
Er zijn gesloten implementaties van open standaarden gekomen, open implementaties zijn gesloten, en er worden
betaalde diensten en extensies op open implementaties geboden. Hieronder de resultaten van onze inventarisatie.

## Open source

Er zijn veel implementaties beschikbaar. We hebben de 'grootste' uitgekozen om te testen.
Het begrip 'grootste' is relatief: waar AVP waarschijnlijk de grootste is in aantal transacties, want het regelt toegang
tot AWS, is OPA verreweg de grootste in het aantal downloads en implementaties.

- [Amazon Verified Permissions](https://aws.amazon.com/verified-permissions/) is de policy engine van Amazon, en gebruikt de taal Cedar
- [Cerbos](https://www.cerbos.dev/), de PBAC oplossing van Google, gebruik makend van CEL.
- [Open Policy Agent (OPA)](https://www.openpolicyagent.org/) is de engine van Styra, de bedenker van Rego.
- [OpenFGA](https://openfga.dev/) is gebaseerd op Zanzibar, het ReBAC project van Google.

Van XACML en Rego zijn geen stabiele moderne open source implementaties.

Elk van deze opties is getest in het project, zie [hier](1.opensource) de resultaten, en in principe geschikt als PDP.
Daarnaast is zelfbouw ook altijd mogelijk zolang dat onder overheids-open source-voorwaarden gebeurt.

Kanttekening is wel dat toegangsregels geschreven in al deze talen lastig zijn te lezen en te schrijven. Een van onze doelen is
echter wel dat mensenogen ze moeten kunnen controleren en aanpassen, en niet alleen programmeurs. Geen van de
bovengenoemde implementaties biedt een oplossing die dit significant eenvoudiger maakt. 

Andere kanttekening is dat deze implementaties allemaal losse policy engines zijn: in principe alleen een PDP.
Het schrijven en uitvoeren van policies weliswaar de kern van toegangsverlening, maar er is veel meer. 
Testen, versiebeheer, distributies, monitoring en auditing zijn belangrijke taken die een PDP niet oplost.

### Commerciële implementaties

In het commerciële domein zijn completere oplossingen beschikbaar. Een goede recente inventarisatie van de markt is [deze](https://www.kuppingercole.com/research/lc80819/policy-based-access-management) van KuppingerCole.
Wij hebben in dit onderzoek een aantal partijen benaderd en om informatie en demonstratie gevraagd. Hier kort onze bevindingen.

- [Styra DAS](2.styra)
- [PlainID](3.plainid)
- [Axiomatics](4.axiomatics)

