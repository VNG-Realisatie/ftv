---
weight: 40
title: "Axiomatics"
---

# Axiomatics

- Axiomatics heeft een sterke focus op standaarden. Ze zijn mede-ontwikkelaar geweest van XACML, ALFA en nu ook AuthZEN.
- Heeft een sterke focus op het samenwerken tussen tech en non-tech users door het bieden van een GUI voor policy creation én een code-based view die goed samen werkt.
- Ze ondersteunen ook token-based authorization waarbij je bij de PDP op kan vragen welke acties/claims beschikbaar zijn en dat in short-lived tokens mee kan geven (en dus bijv. compatibel met OAuth Rich Authentication Requests)
- Ze bieden ook ondersteuning voor het provisionen van policies naar andere systemen. Microsoft Conditional Access Policies (in EntraID) werd als voorbeeld genoemd.
- Ze zijn een stateless oplossing en ondersteunen PIP caching patronen om performance te verbeteren
- Ze ondersteunen meerdere projecten/workspaces zodat je een afgeschermde omgeving per applicatie/afdeling kan gebruiken.
- Deployment over de DTAP keten gaat via de standaard deployment pipelines m.b.v. policy as code.
- In tegenstelling tot PlainID werkt Axiomatics volledig on-prem en heeft het geen SaaS ondersteuning.
- Ze hebben ondersteuning voor een gedetailleerd audit-log. De view daarop is simpel/beperkt en het wordt aangeraden die middels een SIEM te ontsluiten.

Zie ook het Axiomatics rapport '[state of authorization]({{< param baseDirectory >}}documents/axiomatics.pdf)'.