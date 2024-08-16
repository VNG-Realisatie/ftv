---
weight: 30
title: 'Autorisatie - van oud naar nieuw'
---

# Autorisatie - van oud naar nieuw

In de diverse huidige situaties wordt de authenticatie en autorisatie van een gebruiker veelal door de applicatie(s) van de afnemer gedaan.

Hierbij kan aangemerkt worden dat autorisatie op veel plaatsen in de applicatie ingebakken kan zitten.
Het blijft natuurlijk nog steeds nodig om de beschikbaarheid van functies in de gebruikersinterface af te stemmen op de rol van de gebruiker.
Daarnaast zou het kunnen dat de applicatie in de aanloop naar de bevraging van data bij aanbieders al enige vorm van autorisatie uitvoert.

Dit alles zit in code gebakken en is redelijk statisch.
Wijzigingen in wet, regelgeving, contract of andere inzichten, kunnen niet snel toegepast worden.
En een dergelijke wijziging het moet mogelijk ook nog voor meerdere (vele) applicaties uitgevoerd worden.

Het heeft dan ook voorkeur om de autorisatie naar externe bronnen uit de applicatie(s) te halen en op een gestandaardiseerde manier uit te voeren.
In feite de kern van dit project dus.

Het toevoegen van generieke autorisatie in of rond de API-gateway kan zelfs bovenop de autorisatie van bestaande applicatie(s) geimplementeerd worden.
Aangezien het dezelfde (of wellicht meer) functionailiteit bevat, zal de werking van de applicatie(s) niet belemmerd worden.
Het kan wel beter aan de huidige wet en regelgeving voldoen, en daardoor mogelijk ongezien misbruik voorkomen.
Op deze manier wordt echter wel het belang van een gefaseerde invoering gewaarborgd.

Bij autorisatie hoort ook logging.
Hiermee wordt gewaarborgd dat er een audit trail is om achteraf misstanden of vergissingen op te sporen en op te lossen.
Een andere toepassing op de logging kan het (in real-time) analyseren (evt. via AI-modellen) van de logs om ongebruikelijke bevragingen te signaleren.
Dit valt echter buiten de scope van dit project.

## Oud

In de oude situatie is de autorisatie vooralsnog in de applicatie(s) van de afnemer verweven.
Aan de kant van de aanbieder is het waarschijnlijk binnen de API(s) opgenomen.

![Huidige autorisatie](/architecture/curr-conn-o2o-auth.png)

## Nieuw

In de toekomst willen we de autorisatie op of naast de API-gateway brengen, omdat het dan op 1 plek ingericht kan worden en veel werk bespaart.
Het is vanuit de techniek gezien ook een logische plek.
In verschillende projecten is de wenselijkheid en werkbaarheid hiervan al aangetoond.

![Nieuwe autorisatie](/architecture/modern-auth-o2o.png)

## FDS

Binnen een fedratief datastelsel blijft de techniek identiek.
Wat er in data bevragingen veranderd is dat de data van meerdere aanbieders gekoppeld kan worden in een enkele bevraging.
Het principe van linked data.
Het project toegangsverlening past prima in dit plaatje, maar kan ook los ervan bestaan.

![Binnen FDS](/architecture/modern-auth-fds.png)
