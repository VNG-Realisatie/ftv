---
title: "Zenit Thunx"
---

# Zenit Thunx

## Links
- https://github.com/xenit-eu/thunx

## Fragmenten
- Thunx is a pluggable Attribute Based Access Control system, with and end-to-end implementation using:
  - OpenPolicyAgent as a policy engine
  - Spring Cloud Gateway as a policy enforcement point
  - Spring Data REST as an API service
- This project uses a distributed authorization architecture, by applying:
  - early access decisions at the API Gateway
  - postponed access decisions in the Spring Data REST service
- When the API Gateway does not have sufficient contextual information to grant or deny access, it delegates the policy decision to the Spring Data REST service. This API Service receives an authorization-predicate, a thunk from the API Gateway and rewrites the database queries to ensure the authorization-predicate is satisfied.

## Observaties
- Java gebaseerd project dat een alles-in-1 pakket wil zijn, dus zowel de gateways als de API service bij de aanbieder.
- data-minimalisatie gebeurt door een deel van de policy vanaf de afnemer in de headers van het request mee te sturen om daarmee de query op de database uit te voeren.
