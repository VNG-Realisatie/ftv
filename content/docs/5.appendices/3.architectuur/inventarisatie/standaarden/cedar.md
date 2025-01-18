---
title: 'Cedar'
---

# Cedar

## Links
- https://www.cedarpolicy.com/en
- https://github.com/cedar-policy/cedar
- https://docs.cedarpolicy.com/
- https://github.com/permitio/opal
- https://aws.amazon.com/verified-permissions/
- https://aws.amazon.com/blogs/security/governance-at-scale-enforce-permissions-and-compliance-by-using-policy-as-code/

## Fragmenten
- Cedar is a language for defining permissions as policies, which describe who should have access to what. It is also a specification for evaluating those policies. Use Cedar policies to control what each user of your application is permitted to do and what resources they may access.
- Cedar is a simple yet expressive language that is purpose-built to support authorization use cases for common authorization models such as RBAC and ABAC.
- Cedar is fast and scalable. The policy structure is designed to be indexed for quick retrieval and to support fast and scalable real-time evaluation, with bounded latency.
- Cedar is designed for analysis using Automated Reasoning. This enables analyzer tools capable of optimizing your policies and proving that your security model is what you believe it is.

## Observaties
- Amazon, sinds 2023 open-source
- binnen AWS gebruikt voor Verified Access & Verified Permissions
- open-source vanuit AWS
- Cedar is een vrije expressie-taal voor policies en de implementatie
- relatief makkelijk te lezen door mensen
- ondersteunt geen extra attributen, dus alleen ja/nee
- als library en als container beschikbaar
- is pure Rust implementatie, maar ook als een (nog niet volledige) Golang implementatie beschikbaar
- er is een online playground om met policies te spelen
- Slack community; GitHub project
- met de hand samenstellen van policies is technisch werk
 