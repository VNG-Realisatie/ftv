---
weight: 20
title: 'Huidige situatie'
---

# Huidige situatie

De huidige situatie kent vele manieren om van A naar B te komen.
Hier worden de situaties geschetst waarin al een vertrouwensnetwerk beschikbaar is om REST APIs te bevragen.

## Organisatie naar organisatie

De situatie waarbij medewerkers van de afnemer zelf middels een applicatie op een zaakgerichte manier en eventueel vanuit een specifieke rol data bevragen bij een aanbieder.

![Org to Org](/architecture/curr-conn-o2o.png)

## Burger naar organisatie naar organisatie

De situatie waarin een burger via een website/portaal/app toegang verkrijgt tot een applicatie bij een afnemer en langs deze weg eigen data opvraagt bij een aanbieder. 

![Burger to Org to Org](/architecture/curr-conn-p2o2o.png)

## Organisatie naar organisatie naar organisatie

De situatie waarin een medewerker van een organisatie via een website/portaal/app toegang verkrijgt tot een applicatie bij een afnemer en langs deze weg data behorend bij de organisatie opvraagt bij een aanbieder.

![Org to Org to Org](/architecture/curr-conn-o2o2o.png)

## OAuth met bv. OpenID of eIDAS

De situatie waarin een persoon via een open standaard met behulp van een identity provider (IDP) geauthenticeerd wordt door een applicatie van de afnemer en vervolgens data kan bevragen bij de aanbieder.

![OAuth](/architecture/curr-conn-p2o2o-oauth.png)
