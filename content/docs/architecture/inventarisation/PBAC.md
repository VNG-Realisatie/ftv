---
weight: 10
type: 'docs'
---

# References

## eBook
- https://www.oreilly.com/library/view/policy-as-code/9781098139179/


## PBAC / ABAC / PAC
- https://federatief.datastelsel.nl/kennisbank/pbac/
- https://en.wikipedia.org/wiki/Attribute-based_access_control
- https://www.paloaltonetworks.com/cyberpedia/what-is-policy-as-code
- https://www.crowdstrike.com/cybersecurity-101/security-operations/policy-as-code/
- https://www.devopsschool.com/blog/what-is-policy-as-code-a-complete-guide/
- https://www.redhat.com/sysadmin/policy-as-code-automation
- https://github.com/hysnsec/awesome-policy-as-code
- https://gitlab.com/digilab.overheid.nl/ecosystem/pbac


## XACM
- https://groups.oasis-open.org/communities/tc-community-home2?CommunityKey=67afe552-0921-49b7-9a85-018dc7d3ef1d
- XML based
- Golang implementation available
- supports additional attributes besides allow/deny; called 'obligation' / 'advice'
- https://en.wikipedia.org/wiki/XACML
- https://github.com/infobloxopen/themis
- https://github.com/wso2/balana
- https://code.google.com/archive/p/no-xacml/


## ODRL
- https://www.w3.org/2012/09/odrl/archive/odrl.net/index.html
- no (open-source) Golang implementation
- primarily geared towards DRM
- supports additional attributes besides allow/deny; called 'duty'
- https://en.wikipedia.org/wiki/ODRL
- https://www.w3.org/TR/odrl-model/


## OPA
- https://www.openpolicyagent.org/docs/latest/
- no Wikipedia
- open-source
- supports additional attributes besides allow/deny; additional key/value pairs in output JSON
- pure Golang implementation
- https://github.com/open-policy-agent/opa
- https://www.cncf.io/blog/2020/08/13/introducing-policy-as-code-the-open-policy-agent-opa/
- https://www.openpolicyagent.org/docs/latest/policy-performance/
- https://github.com/permitio/opal
- https://github.com/StyraInc/regal
- https://www.topaz.sh/
- https://github.com/fugue/Fregot
- https://github.com/tmobile/magtape


## Cedar - AWS
- https://www.cedarpolicy.com/en
- no Wikipedia
- open-source from AWS
- does not support additional attributes besides allow/deny
- pure Rust implementation
- https://github.com/cedar-policy/cedar
- https://docs.cedarpolicy.com/
- https://github.com/permitio/opal


## ALFA - Axiomatics
- https://alfa.guide/
- commercial
- no (open-source) Golang implementation
- https://en.wikipedia.org/wiki/Abbreviated_Language_for_Authorization
- https://axiomatics.com/
- https://www.kuppingercole.com/blog/kuppinger/simplifying-xacml-the-axiomatics-alfa-plugin-for-eclipse-ide


## NIST policy machine
- https://csrc.nist.gov/Projects/Policy-Machine
- no Wikipedia
- no (open-source) Golang implementation
- virtual machine based


## EPAL - IBM
- https://www.w3.org/2003/p3p-ws/pp/ibm3.html
- old (2003)
- lawsuit about owner rights
- https://en.wikipedia.org/wiki/Enterprise_Privacy_Authorization_Language


## Sentinal - Hashicorp
- https://developer.hashicorp.com/sentinel
- not open-source
- geared towards hashicorp products


## Verified Permissions - Amazon
- https://aws.amazon.com/verified-permissions/
- based on Cedar 
- https://aws.amazon.com/blogs/security/governance-at-scale-enforce-permissions-and-compliance-by-using-policy-as-code/


## Azure PAC - MS
- https://azure.github.io/enterprise-azure-policy-as-code/
- not open-source
- tied into Azure
- https://github.com/Azure/enterprise-azure-policy-as-code?tab=readme-ov-file
- https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/azure-enterprise-policy-as-code-a-new-approach/ba-p/3607843


# Observations
- XACML / ODRL appear to be the oldest and widest used.
- XACML has a Golang implementation; ODRL does not.
- OPA / CEDAR are more modern and implemented in Golang / Rust.
- XACML, ODRL and OPA can return additional attributes besides allow/deny; XACML calls it obligations, ODRL calls it duties and OPA policies can return JSON with additional key/value pairs.
