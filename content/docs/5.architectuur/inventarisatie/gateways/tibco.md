---
title: 'Tibco'
---

## Links
- https://www.tibco.com/
- https://www.tibco.com/platform/integration
- https://docs.tibco.com/pub/amsg/3.4.2/doc/html/Default.htm#Administration/displaying-a-policy.htm?TocPath=Administration%257CTIBCO%2520ActiveMatrix%2520Policy%2520Director%2520Governance%257CGovernance%2520Control%2520Management%257C_____5
- https://docs.tibco.com/pub/amsg/3.4.2/doc/html/Default.htm#Concepts/governance-control-templates.htm?Highlight=Governance%20Control%20Templates

## Fragmenten
- Your enterprise applications and data do not always work together to create complete business solutions. Integration enables these disparate systems to work together using a common language and to function as a single collaborative unit.
- With the TIBCO Platform–Integration, you can connect your diverse business solutions, data sources, and devices into a single, seamless system.
- Governance control management involves creating resource templates, object groups, governance controls, and deploying them appropriately.
- Policy Action:
  - A policy action defines an action to perform to enforce a policy rule when the conditions of the rule are met.
  - When a policy is enforced, it may result in one or more actions executed to fulfill the requirements of the policy. For example, when you define and deploy a WS-Security policy, the Governance Agent may run decryption, authentication, and signature verification actions.

## Observaties
- JAVA based (BusinessWorks) en een Golang framewerk (Flogo).
- Flogo heeft geen voorzieningen voor policies.
- BusinessWorks benoemt policies, maar het ondersteunt alleen de meest basale policies (hardcoded) en heeft dus geen policy-taal voor fijnmazige autorisatie.
- de API gateway Mashery is overgenomen door [Boomi](../boomi).
