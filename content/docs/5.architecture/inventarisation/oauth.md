---
weight: 5130
title: 'OAuth'
---

# OAuth

## References
- https://oauth.net/2/
- https://en.wikipedia.org/wiki/OAuth
- https://www.rfc-editor.org/rfc/rfc6749
- https://axiomatics.com/blog/attribute-based-access-control-and-oauth

## Snippets
- The OAuth framework does not go into the finer details of how the actual authorization is implemented at the Service Provider when the Authorization Code is presented by Consumer or later when the Access Token is presented as well.
- The Service Provider needs to implement and enforce the authorization policies that get triggered when an OAuth Customer interacts with it.
- The tokens presented by the OAuth customer can be considered as attribute values that will be used by the Service Provider to make an authorization decision based on the defined ABAC policies.

## Observations
- OAuth provides claims and scopes to a consumer which are merely attributes that can be used to perform authorization.
- OAuth != PBAC.
