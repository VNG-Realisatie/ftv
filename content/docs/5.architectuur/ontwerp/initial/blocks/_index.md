---
weight: 10
title: 'Bouwstenen'
---

# Bouwstenen

Het ontwerp is (voor een deel) gebaseerd op het principe van vertrouwen tussen de organisaties die data uitwisselen.
De potentiele oplossing zal dus waarschijnlijk op een vertrouwensnetwerk gebaseerd zijn.

## Vertrouwensnetwerk
De basis bouwsteen voor de koppeling tussen organisaties die data uitwisselen, met PKI Overheid certificaten.

Dit is bijvoorbeeld de Digikoppeling REST API standaard of de nieuwere FSC standaard.

![Vertrouwensnetwerk](/architecture/trust-network.png)

De API-gateway van de afnemer stuurt dataverzoeken via een netwerk (bv Diginetwerk) naar de API-gateway van de aanbieder.
Beide partijen maken gebruik van een PKI-certificaat die tijdens de uitwisseling gecontroleerd worden.
Hiermee heeft de afnemer de zekerheid met de juiste aanbieder contact te hebben.
En de aanbieder weet zeker wie de afnemer is (middels het OIN in het PKI-certificaat).
