---
weight: 40
title: 'OAuth'
---

# OAuth

## Links
- https://oauth.net/2/
- https://en.wikipedia.org/wiki/OAuth
- https://www.rfc-editor.org/rfc/rfc6749
- https://axiomatics.com/blog/attribute-based-access-control-and-oauth

## Fragmenten
- OAuth 2.0 is the industry-standard protocol for authorization. OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and living room devices.
- The OAuth framework does not go into the finer details of how the actual authorization is implemented at the Service Provider when the Authorization Code is presented by Consumer or later when the Access Token is presented as well.
- The Service Provider needs to implement and enforce the authorization policies that get triggered when an OAuth Customer interacts with it.
- The tokens presented by the OAuth customer can be considered as attribute values that will be used by the Service Provider to make an authorization decision based on the defined ABAC policies.

## Observaties
- OAuth scheidt identificatie van autorisatie.
- OAuth levert claims en scopes aan een process welke als attributen gebruikt kunnen worden om autorisatie uit te voeren.
- OAuth is geen autorisatie mechanisme; het levert alleen de attributen die voor autorisatie kunnen dienen.
- de meest logische autorisatie mehanismen bovenop OAuth zijn ABAC en PBAC, maar RBAC kan ook gesimuleerd worden.
