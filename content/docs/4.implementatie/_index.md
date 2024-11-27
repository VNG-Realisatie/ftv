---
Title: Implementatie
weight: 40
---

# Implementatie 

Implementatie van FTV, vanuit de situatie waar de meeste koppeling nu staan, gaat over twee veranderingen: PBAC en federatief werken.
In een overgang naar FTV kunnen deze twee apart worden opgepakt, hetgeen de transitie makkelijker kan maken.

## PBAC stappenplan

Voor de implementatie van PBAC kan het volgende stappenplan gevolgd worden:
- Kiezen en inrichten van PBAC-software
- Aanpassen van de bestaande koppelsoftware (gateway, applicatie of API) om PBAC aan te roepen, 
en de beslissing daarvan op te volgen
- Identificeren van de toegangsregels die (zouden moeten) gelden
- Testscenario's schrijven die het correct toepassen van de regels kunnen toetsen
- In kaart brengen of en hoe de regels nu in de applicatie of API zijn ingebouwd
- Ingebouwde regels noteren in de gekozen formele taal, en eventueel verwijderen uit code. Per regel kan met de testscenario's
worden vastgesteld of dit correct is gebeurd.

Veelal zal dit voor aanbieders en afnemers verschillend uitpakken. 

**Aanbieders** hebben vaak al regels, en zullen die vervangen of verwijderen. 
Regels die niet de verantwoordelijkheid zijn van de aanbieder kunnen verwijderd worden. Op voorwaarde natuurlijk
dat de afspraken in het stelsel gemaakt zijn.

**Afnemers** kunnen merken dat ze meer regels krijgen dan voorheen. Het identificeren van de regels kan discussie
oproepen: meer verantwoordelijkheid betekent meer procedures en die verantwoordelijkheid beleggen bij medewerkers.
Ook is het realistisch te verwachten dat de applicaties zelf aangepast moeten worden. 
Als er nu een aanroep wordt gedaan waarmee te veel gegevens worden verwerkt, dan vergt terugbrengen daarvan
een inhoudelijke aanpassing, die meer voeten in de aarde zal hebben dan alleen techniek. Ook zal er meer informatie
met aanroepen meegegeven moeten worden, zodat zowel de PIP van de afnemer en de aanbieder kunnen regels kunnen valideren.

## Federatief stappenplan

Federatief gaan werken heeft een ander stappenplan:
- De organisatie moet zich kunnen vinden in de voorwaarden van het federatief stelsel. Daarbij komen rechten en plichten
kijken die nieuw zijn, en dat zal organisatorisch, beleidsmatig en juridisch gevolgen hebben.
Denk hierbij ook aan het accepteren van een vertrouwde partij om verklaring mee te verifiëren.
- Identificeren op basis van welke kenmerken (API keys, gebruikerscerticaten, rollen, etc) nu toegang verleend wordt
- Voor deze kenmerken vervanging vinden in de vorm van verifieerbare verklaringen
- Software aanpassen zodat de PIP/PDP de nodige informatie hebben, en dat de vertrouwde partijen kunnen worden
geraadpleegd om verklaringen te verifiëren.

## Logging

Hoewel geen onderdeel van toegangsverlening, gaat het wel hand in hand met logging omdat de verantwoording van de toegang 
in een logboek dataverwerkingen moet komen.

> TO DO

## FDS

> Welke gemeenschappelijke verzieningen zouden we kunnen bieden?
> TO DO