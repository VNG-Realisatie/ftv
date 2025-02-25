---
title: 'Broadcom - Layer 7'
---

## Links
- https://techdocs.broadcom.com/us/en/ca-enterprise-software/layer7-api-management/api-gateway/11-1.html
- https://techdocs.broadcom.com/us/en/ca-enterprise-software/layer7-api-management/api-gateway/11-1/services-and-policies/working-with-policies.html
- https://techdocs.broadcom.com/us/en/ca-enterprise-software/layer7-api-management/api-gateway/11-1/services-and-policies/working-with-policies/policy-fragments.html
- https://techdocs.broadcom.com/us/en/ca-enterprise-software/layer7-api-management/api-gateway/11-1/policy-assertions.html
- https://techdocs.broadcom.com/us/en/ca-enterprise-software/layer7-api-management/api-gateway/11-1/policy-assertions/custom-assertions.html
- https://techdocs.broadcom.com/us/en/ca-enterprise-software/layer7-api-management/api-gateway/11-1/policy-assertions/assertion-palette.html
- https://github.com/Layer7-Community/Sample-Policies

## Fragmenten
- A policy defines restrictions for the consumption of a published service that is protected by the Layer7 API Gateway. Policy assertions are the building blocks for policies in the Policy Manager.
- Unless specified otherwise, all assertions can be used in a web service and XML application policy.
- Policy fragments provide a convenient way to create a group of assertions that can be used in any published service. These "fragments" behave as boilerplate text to help maintain consistency when constructing a policy: once a fragment is created, it can be added to any service policy only as a "read only" entity. This allows you to enforce global rules across any number of services. Maintenance is also simplified: when the active version of a fragment is updated, the changes are instantly applied in every policy where the fragment is used. When a policy is exported or imported, any fragments present are also included.

## Observaties
- op dit moment bij zo'n 80-90 overheidsorganisaties in gebruik.
- meeste organisaties werken met versie 11.1; anderen zijn bezig met migratie naar 11.1.
- l7 bevat een eigen policy taal; kan in XML en JSON uitgedrukt worden, maar is geen XACML!
- policies kunnen opgebouwd worden uit 1 of meer policy fragmenten; dus hergebruik van generieke componenten mogelijk.
- laagste niveau (de regels) van policies/policy fragmenten zijn assertions.
- l7 biedt mogelijkheid voor custom assertions middels JAVA SDK of regex; indien goed herbruikbaar wordt het soms door Broadcom opgenomen in het standaard assortiment!
- import en export van policies en/of policy fragmenten is in voorzien.
