---
Title: Vragen aan leverancier
weight: 30
---

## Vragen aan leverancier

Bij het benaderen van leveranciers van EAM software raden wij aan de onderstaande vragen te stellen:

- How do you support policy authoring for various audiences such as business users, developers, maintainers, security, etc.?
- Which components of the product can be deployed on-premises, in the cloud or as SaaS? In case of cloud or SaaS solutions, how do you ensure sensitive data can remain within the boundaries of the organization? And also for cloud or SaaS, is it possible to host under European privacy laws?
- Which Policy Enforcement Points are supported and what functionality do they have? Also in terms of residual policy/obligations.
- What support do you have for defining organization and application specific information models of the subject, action, resource and context of requests?
- How is decentralized self-service policy management handled? Are project or workspace scopes supported? Can these be nested or is it a flat structure? Is access to policy management functionality also configurable by policy?
- How do you handle separation of duties and approval workflows for policy authoring?
- How do you handle deployment of policies and changes to policies? How is this integrated in deployment workflows for DevOps teams? How is it integrated for maintenance teams without deployment pipelines?
- How do you enable reuse of definitions and logic between policies?
- How do you support 'unit testing' for policies to document behaviour end prevent regressions?
- Does the audit log allow for replay of historical decisions against new policy versions? How do you address data duplication and sensitive data in your audit log? 
- Do you allow for import from - and export to other policy languages? Which languages are supported? Is it one-way or bidirectional? Is it fully supported or only a subset of the language?
- To what degree do you support data authorization? Do you support residual policy for masking, anonymisation, filtering etc.?
- To what degree is the product based on open standards? Both in terms of open-source and open-governance. (See [BOMOS](https://www.logius.nl/onze-dienstverlening/domeinen/infrastructuur/bomos)) . Specifically, what is your position towards [AuthZEN](https://openid.net/wg/authzen/)?
- Do you support Policy Orchestration Points (POPs) to provision policies to systems that don't support Externalized Authorization? For which systems do you offer POPs?
- Do you support dynamic generation of authorization tokens, such as OAuth Rich Authorization Requests, based on policy?