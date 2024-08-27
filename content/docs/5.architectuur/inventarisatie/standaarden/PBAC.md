---
weight: 140
title: 'Access Control'
---

# Access Control

## Links

### eBook
- https://www.oreilly.com/library/view/policy-as-code/9781098139179/


### Access Control
- https://en.wikipedia.org/wiki/Attribute-based_access_control
- https://bok.idpro.org/article/id/42/
- https://bok.idpro.org/article/id/61/
- https://www.paloaltonetworks.com/cyberpedia/what-is-policy-as-code
- https://www.crowdstrike.com/cybersecurity-101/security-operations/policy-as-code/
- https://www.devopsschool.com/blog/what-is-policy-as-code-a-complete-guide/
- https://www.redhat.com/sysadmin/policy-as-code-automation
- https://github.com/hysnsec/awesome-policy-as-code
- https://federatief.datastelsel.nl/kennisbank/pbac/
- https://gitlab.com/digilab.overheid.nl/ecosystem/pbac


### AI Access Control
- https://www.spica.com/blog/access-control-and-ai
- https://fpc-security.com/blogs/articles/artificial-intelligence-ai-in-access-control


### Autorisatie
- https://en.wikipedia.org/wiki/Authorization


### XACML
- https://groups.oasis-open.org/communities/tc-community-home2?CommunityKey=67afe552-0921-49b7-9a85-018dc7d3ef1d
- XML gebaseerd
- Golang implementatie beschikbaar
- ondersteunt extra attributen naast ja/nee; onder de noemer 'obligation' / 'advice'
- https://en.wikipedia.org/wiki/XACML
- https://github.com/infobloxopen/themis
- https://github.com/wso2/balana
- https://code.google.com/archive/p/no-xacml/


### ODRL
- https://www.w3.org/2012/09/odrl/archive/odrl.net/index.html
- geen (open-source) Golang implementatie
- vooral gericht op DRM
- ondersteunt extra attributen naast ja/nee; onder de noemer 'duty'
- https://en.wikipedia.org/wiki/ODRL
- https://www.w3.org/TR/odrl-model/


### OPA
- https://www.openpolicyagent.org/docs/latest/
- geen Wikipedia
- open-source
- ondersteunt extra attributen naast ja/nee; extra sleutels en waarden in de uitvoer JSON
- pure Golang implementatie
- https://github.com/open-policy-agent/opa
- https://www.cncf.io/blog/2020/08/13/introducing-policy-as-code-the-open-policy-agent-opa/
- https://www.openpolicyagent.org/docs/latest/policy-performance/
- https://github.com/permitio/opal
- https://github.com/StyraInc/regal
- https://www.topaz.sh/
- https://github.com/fugue/Fregot
- https://github.com/tmobile/magtape


### Cedar - AWS
- https://www.cedarpolicy.com/en
- geen Wikipedia
- open-source vanuit AWS
- ondersteunt geen extra attributen, dus alleen ja/nee
- pure Rust implementatie
- https://github.com/cedar-policy/cedar
- https://docs.cedarpolicy.com/
- https://github.com/permitio/opal


### ALFA - Axiomatics
- https://alfa.guide/
- commercieel
- geen (open-source) Golang implementatie
- https://en.wikipedia.org/wiki/Abbreviated_Language_for_Authorization
- https://axiomatics.com/
- https://www.kuppingercole.com/blog/kuppinger/simplifying-xacml-the-axiomatics-alfa-plugin-for-eclipse-ide


### NIST policy machine
- https://csrc.nist.gov/Projects/Policy-Machine
- geen Wikipedia
- geen (open-source) Golang implementatie
- virtuele machine gebaseerd


### EPAL - IBM
- https://www.w3.org/2003/p3p-ws/pp/ibm3.html
- oud (2003)
- rechtszaak omtrent gebruiksrechten
- https://en.wikipedia.org/wiki/Enterprise_Privacy_Authorization_Language


### Sentinal - Hashicorp
- https://developer.hashicorp.com/sentinel
- niet open-source
- gericht op hashicorp produkten


### Verified Permissions - Amazon
- https://aws.amazon.com/verified-permissions/
- gebaseerd op Cedar 
- https://aws.amazon.com/blogs/security/governance-at-scale-enforce-permissions-and-compliance-by-using-policy-as-code/


### Azure PAC - MS
- https://azure.github.io/enterprise-azure-policy-as-code/
- niet open-source
- gekoppeld aan Azure
- https://github.com/Azure/enterprise-azure-policy-as-code?tab=readme-ov-file
- https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/azure-enterprise-policy-as-code-a-new-approach/ba-p/3607843


## Observaties
- XACML / ODRL lijken de oudste en wijdst verspreide opties te zijn.
- XACML heeft een Golang implementatie; ODRL niet.
- OPA / CEDAR zijn moderner en geimplementeerd in Golang / Rust.
- XACML, ODRL en OPA kunnen extra attributen opleveren naast ja/nee; XACML noemt dit obligations, ODRL noemt het duties en OPA policies kunnen extra data aan de opgeleverde JSON meegeven.
