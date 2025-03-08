---
Title: Logboek Dataverwerking
weight: 80
---

# Logboek Dataverwerking

De standaard Logboek Dataverwerking definieert de wijze waarop _werkelijk uitgevoerde_ dataverwerkingen gelogd worden.

Dit verschilt fundamenteel van het loggen/administreren van _toegangsbeslissingen_ voor verwerkings*verzoeken*. Denk hierbij bijvoorbeeld aan afgewezen verwerkingsverzoeken of verwerkingsverzoeken die geen persoonsgevens bevatten en dus niet onder het domein van de standaard Logboek Dataverwerking vallen.

# Toegangsbeslissing als dataverwerking

Het is mogelijk dat bij het maken van een toegangsbeslissing persoonsgegevens verwerkt worden. In deze gevallen zou de toegangsbeslissing zelf ook opgenomen kunnen worden in het logboek dataverwerking. Indien de onderliggende verwerking ook in het logboek opgenomen wordt, biedt dit alleen meerwaarde voor afgewezen verwerkingsverzoeken. Gezien de duplicatie van logboekregels en de performance implicaties daarvan is dit vaak ongewenst. Daarom dient bewust overwogen te worden of het afgewezen verwerkingsverzoeken vanuit juridisch oogpunt ook in het logboek dataverwerking opgenomen moeten worden.

# Opname van W3C Trace Context in logboek toegangsbeslissingen

Het is echter wel aangeraden om, indien mogelijk, de Trace Context behorende bij de toegangsbeslissing op te nemen in het logboek van toegangsbeslissingen. Dit vergemakkelijkt de verantwoording van toegangsbeslissingen voor specifieke dataverwerkingen indien nodig. Het kan zijn dat de PEP hiervoor de W3C Trace Context dient te starten.