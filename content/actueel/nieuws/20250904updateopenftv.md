---
type: 'nieuws'
Title: Nieuwe release Open FTV
date: '2025-09-03'
summary: "De nieuwe release van OpenFTV (versie 1.4.1) is beschikbaar."
---

{{< nieuws/header title="Nieuwe release Open FTV (1.4.1)" >}}
De nieuwe release van OpenFTV (versie 1.4.1) is beschikbaar. 
Deze release bouwt voort op de verbeteringen uit 1.4.0 en bevat onder andere uitbreidingen van de testomgeving, verbeterd beheer via de Manager en volledige PostgreSQL-integratie.
{{< /nieuws/header >}}

{{< chapter/section title="Nieuw" level="3">}}
- Uitbreiding van de lokale test-omgeving met Kong (met OpenFTV AuthZEN plugin) als gateway, PIP pull configuraties om run-time attributen op te halen en geïntegreerd bundle-management.
- PAP en (design-time) PIP zijn samengevoegd in de OpenFTV Manager component.
- PDP kan geconfigureerd worden om bij het opstarten de meest recente bundle van policies en (design-time) data bij de Manager op te halen.
- Alle data wordt nu volledig in PostgreSQL beheerd.
- Audit logging voor mutaties op policies/data is geactiveerd.
- Nieuwe livez en readyz endpoints voor liveliness/readiness controles in alle componenten.

  
{{< /chapter/section >}}

{{< chapter/section title="Meer weten?" level="3">}}
- De nieuwe code en verse container images zijn te vinden op de [Gitlab repository van OpenFTV](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv).
- Check [Nieuwe release Open FTV (1.4.0)](https://vng-realisatie.github.io/ftv/actueel/nieuws/20250826updateopenftv/) voor informatie over de vorige release.
 
{{< /chapter/section >}}

