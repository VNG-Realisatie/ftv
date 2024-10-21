---
title: 'OPA/Rego'
---

# OPA/Rego

## Links
- https://www.cncf.io/projects/open-policy-agent-opa/
- https://www.cncf.io/blog/2020/08/13/introducing-policy-as-code-the-open-policy-agent-opa/
- https://www.openpolicyagent.org/docs/latest/
- https://www.openpolicyagent.org/docs/latest/policy-performance/
- https://github.com/open-policy-agent/opa
- https://github.com/permitio/opal
- https://github.com/StyraInc/regal
- https://www.topaz.sh/
- https://github.com/fugue/Fregot
- https://github.com/tmobile/magtape
- https://gitlab.com/digilab.overheid.nl/platform/fsc-policy-builder
- https://gitlab.com/digilab.overheid.nl/platform/fsc-opa-integration

## Fragmenten
- Stop using a different policy language, policy model, and policy API for every product and service you use. Use OPA for a unified toolset and framework for policy across the cloud native stack.
- Whether for one service or for all your services, use OPA to decouple policy from the service's code so you can release, analyze, and review policies (which security and compliance teams love) without sacrificing availability or performance.
- Express policy in a high-level, declarative language that promotes safe, performant, fine-grained controls. Use a language purpose-built for policy in a world where JSON is pervasive. Iterate, traverse hierarchies, and apply 150+ built-ins like string manipulation and JWT decoding to declare the policies you want enforced.
- Leverage external information to write the policies you really care about. Stop inventing roles that represent complex relationships that years down the road no one will understand. Instead, write logic that adapts to the world around it and attach that logic to the systems that need it.

## Observaties
- Open Policy Agent
- begonnen als commercieel product (Styra)
- open-source sinds 2018 bij CNCF; in januari 2021 tot 'Graduated' verklaard (zelfde niveau als bv. Kubernetes)
- OPA is het product, rego de taal
- is een declaratieve policy taal; redelijk leesbaar voor mensen
- min of meer free-format; heeft veel weg van een programmeer-taal; hierdoor zijn niet om te zetten naar een andere policy taal
- voor vele doeleinden bruikbaar; dus niet alleen voor API-autorisatie
- ondersteunt extra attributen naast ja/nee; kan extra attributen aan de response toevoegen
- pure Golang implementatie
- kan als library of als container gebruikt worden
- is voornamelijk een PDP-implementatie
- ondersteunende software kan middels commerciële licenties van Styra
- een playground is beschikbaar om er mee te spelen
- Slack community; GitHub project; Stack Overflow community
- met de hand samenstellen van policies is wel technisch werk
