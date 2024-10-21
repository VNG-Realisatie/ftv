---
title: 'XACML'
---

# XACML

## Links
- https://groups.oasis-open.org/communities/tc-community-home2?CommunityKey=67afe552-0921-49b7-9a85-018dc7d3ef1d
- https://en.wikipedia.org/wiki/XACML
- https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html
- https://github.com/authzforce/core
- https://github.com/wso2/balana
- https://github.com/infobloxopen/themis (helaas dood project)

## Fragmenten

## Observaties
- eXtensible Access Control Markup Language
- in 2003 gestandaardiseerd door OASIS
- policies bevatten een op XML-gebaseerde expressietaal
- laatste update van 2020 (time extensions)
- open-source is vrijwel uitsluitend JAVA (Authz-project OASIS)
- krachtige functies om attributen te vergelijken
- gebruikt (net als ODRL) het XSD XML-schema (2001) voor het typeren van attributen
- veel ingebouwde functies, echter wel uit te breiden; dit kan wel leiden tot implementaties waarvan de policies niet uitwisselbaar zijn
- ondersteunt extra attributen naast ja/nee als antwoord, middels obligations en advice
- heeft de definities van PEP, PDP, PAP & PIP onder de aandacht gebracht
- de communicatie tussen de PEP & PDP kan middels XML of JSON
- is in januari 2014 uitgebreid beschreven in NIST SP 800-162; in die tijd als ABAC standaard
- met de hand samenstellen van policies is zeer technisch werk
- er zijn wel veel commerciële implementaties met uitgebreide editors beschikbaar
