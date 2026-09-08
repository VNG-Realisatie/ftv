---
type: 'nieuws'
Title: 'FTV Werkgroep #26: Internationale ontwikkelingen bij AuthZEN'
date: '2026-09-01'
summary: "De werkgroep praatte bij over het recente werk bij OpenID AuthZEN voor AI en MCP, integratie met OAuth providers en aanvraagbare toegang, zoals bevestigen met DigiD."
---

{{< nieuws/header title="FTV Werkgroep #26: Internationale ontwikkelingen bij AuthZEN" >}}

{{< /nieuws/header >}}

{{< chapter/section title="Nieuwe voorstellen bij OpenID AuthZEN" level="3">}}

Na het uitbrengen van AuthZEN 1.0 final zijn er binnen de internationale AuthZEN-werkgroep verschillende voorstellen neergelegd voor profielen op en naast AuthZEN 1.0. Deze voorstellen zijn recent opgenomen in de scope van AuthZEN. Daarmee bevestigt de werkgroep een standaard te willen opleveren voor de *functionaliteit* die de voorgestelde specificaties mogelijk maken. FTV kan namens de Nederlandse overheid inspraak bieden op de manier waarop deze specificaties die functionaliteit invullen. In de werkgroep van 1 september zijn de voorstellen langsgelopen; lees het volledige verslag in [de notulen](/ftv/meedoen/werkgroep/authzen-update).

{{< /chapter/section >}}

{{< chapter/section title="COAZ: Bestaande verzoeken, incl AI calls, dynamisch mappen naar AuthZEN" level="3">}}

[COAZ](https://openid.github.io/authzen/authzen-coaz-framework-1_0.html) biedt een declaratieve mapping-taal om bestaande verzoeken om te zetten in AuthZEN-verzoeken, zodat een applicatie geen eigen, domeinspecifiek koppelpunt (PEP) hoeft te bouwen. De [MCP-binding](https://openid.github.io/authzen/authzen-coaz-mcp-binding-1_0.html) past dit toe op het Model Context Protocol, de standaard waarmee AI-agents externe tools aanroepen. Zo kan AuthZEN-gebaseerde autorisatie-infrastructuur organisatiebreed AI gebruik autoriseren.

{{< /chapter/section >}}

{{< chapter/section title="ARAP en AROP: toegang aanvragen na een afwijzing" level="3">}}

Een afwijzing hoeft niet definitief te zijn. Met een extra stap, zoals goedkeuring door een manager, een formulier of een extra bevestiging met bijvoorbeeld DigiD, kan een verzoek alsnog worden toegekend. Dat is nu overal maatwerk. Het [Access Request AuthZEN Profile en het Access Request OAuth Profile](https://github.com/openid/authzen/pull/531) standaardiseren dit patroon. Bij een afwijzing krijgt de aanvrager een access request token en een vervolgroute mee, waarmee het oorspronkelijke verzoek na goedkeuring alsnog wordt toegekend.

{{< /chapter/section >}}

{{< chapter/section title="OAuth-uitgifte op basis van AuthZEN" level="3">}}

Drie voorstellen halen de beslislogica van de authorization server van OAuth naar een centraal beslispunt (PDP). [Issuance](https://ogazitt.github.io/oauth-authzen/draft-gazitt-oauth-authzen-issuance.html) laat beleid bepalen óf er een token wordt uitgegeven en wat erin komt: scope, geldigheidsduur en audience. [Token exchange](https://ogazitt.github.io/oauth-authzen/draft-gazitt-oauth-authzen-token-exchange.html) doet hetzelfde bij het doorgeven van een token naar de volgende stap in een keten. [Claims](https://ogazitt.github.io/oauth-authzen/draft-gazitt-oauth-authzen-claims.html) bepaalt op basis van beleid welke claims een token in mogen, zoals rollen en groepen en andere kwalificaties. Zo geeft elke authorization server tokens uit volgens hetzelfde, centraal beheerde beleid.

{{< /chapter/section >}}

{{< chapter/section title="Volgende bijeenkomsten" level="3">}}

Op 15 september houdt de werkgroep een verdiepende sessie over ODRL. Twee weken later, op 29 september, staan AuthZEN en identity and access management (IAM) weer op de agenda.

{{< /chapter/section >}}
