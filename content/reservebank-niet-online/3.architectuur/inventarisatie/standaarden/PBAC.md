---
title: 'Access Control'
---

# Access Control

## Links

### eBook
- https://www.oreilly.com/library/view/policy-as-code/9781098139179/


### Access Control
- https://en.wikipedia.org/wiki/Attribute-based_access_control
- https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-95.pdf
- https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-162.pdf
- https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-205.pdf
- https://nvlpubs.nist.gov/nistpubs/ir/2018/NIST.IR.8112.pdf
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
Zie [XACML](../xacml).


### ODRL
Zie [ODRL](../odrl).


### OPA / rego
Zie [OPA](../opa).


### Cerbos / CEL
Zie [Cerbos/CEL](../cerbos).


### Cedar - AWS
Zie [Cedar](../cedar).


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
- virtuele-machine gebaseerd


### EPAL - IBM
- https://www.w3.org/2003/p3p-ws/pp/ibm3.html
- oud (2003)
- rechtszaak omtrent gebruiksrechten
- https://en.wikipedia.org/wiki/Enterprise_Privacy_Authorization_Language


### Sentinal - Hashicorp
- https://developer.hashicorp.com/sentinel
- niet open-source
- gericht op hashicorp producten


### Azure PAC - MS
- https://azure.github.io/enterprise-azure-policy-as-code/
- niet open-source
- gekoppeld aan Azure
- https://github.com/Azure/enterprise-azure-policy-as-code?tab=readme-ov-file
- https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/azure-enterprise-policy-as-code-a-new-approach/ba-p/3607843


## Observaties
- XACML, ODRL lijken de oudste en wijdst verspreide opties te zijn.
- XACML, ODRL hebben geen Golang implementatie.
- OPA, CEDAR, CERBOS zijn moderner en geimplementeerd in Golang / Rust.
- XACML, ODRL, OPA, CERBOS kunnen extra attributen opleveren naast ja/nee
