---
type: 'blogs'
Title: OAuth vs EAM
date: '2025-06-11'
summary: "Sinds begin april is AuthZEN ingebouwd in OpenFSC (Federatieve Service Connectiviteit), de gateway van het Federatief Datastelsel (FDS). Organisaties die werken met Open FSC gebruiken nu AuthZEN om de toegang tot gegevens te regelen."
---

{{< nieuws/header title="OAuth versus EAM: twee kanten van dezelfde medaille?" >}}
Binnen Identity and Access Management (IAM) is "autorisatie", of "toegangsverlening" een sleutelbegrip. Maar spreken we altijd over hetzelfde concept? Wanneer we `OAuth 2.0` bespreken en dit vervolgens relateren aan `Externalized Authorization Management (EAM)` of `Fine Grained Authorization (FGA)`, verwijst het woord "autorisatie" naar verschillende dingen: het zelfstandig naamwoord en het werkwoord. 
{{< /nieuws/header >}}

{{< chapter/section title="OAuth 2.0: Gedelegeerde Autorisaties voor Applicaties">}}
`OAuth 2.0` is fundamenteel een framework voor **gedelegeerde autorisatie**. Het stelt een gebruiker in staat om een externe applicatie beperkte toegang te verlenen tot hun `resources` (gehost op een `resource server`) zonder hun primaire inloggegevens te hoeven delen. 

De kerncomponenten hierbij zijn:

* **`Access Tokens`**: Dit zijn de digitale bewijzen die de `client application` gebruikt om toegang tot `resources` te vragen. Ze vertegenwoordigen de specifieke, vaak tijdelijke, toestemming die is verleend.
* **`Scopes`**: Deze definiëren de *omvang* van de toegang die de `client application` aanvraagt (bijvoorbeeld `read_profile` of `write_calendar`). [4, 2] De gebruiker geeft expliciet toestemming voor deze `scopes`.

`OAuth` beantwoordt dus de vraag: "Heeft *deze applicatie* toestemming gekregen van de gebruiker om namens hen bepaalde acties uit te voeren of toegang te krijgen tot bepaalde data?" Het draait om het delegeren van rechten aan een applicatie. Men kan dit zien als autorisatie als een **resultaat** of een verkregen recht (een zelfstandig naamwoord). Hoewel `scopes` de algemene permissies van de *applicatie* definiëren, zijn ze doorgaans te algemeen om te bepalen wat een *specifieke gebruiker* mag doen met een *specifiek resource-exemplaar* onder *specifieke, dynamische omstandigheden* binnen de `resource server` zelf. [1, 2]
{{< /chapter/section >}}

{{< chapter/section title="Externalized Authorization Management (EAM): Real-time toegangsbeslissingen">}}
Dit is waar `Externalized Authorization Management (EAM)` systemen, die vaak gebruikmaken van modellen zoals `Attribute-, Policy en Relationship-based Access Control (ABAC, PBAC, ReBAC)`, `Policy-Based Access Control (PBAC)` en `Relationship-Based Access` een rol spelen. `EAM` legt de nadruk op het architectuurpatroon waarbij de toegangsbeslissing buiten de applicatie wordt geplaatst – een aanpak die de `OpenID AuthZEN` standaard beoogt te standaardiseren door de communicatie tussen deze componenten te specificeren. `EAM` is het **proces** van het `real-time` nemen van contextbewuste beslissingen op het moment dat een subject (gebruiker of service) een actie probeert uit te voeren op een `resource`.

`EAM` beantwoordt de vraag: "Mag *deze gebruiker/service* op *dit exacte moment*, onder *deze specifieke omstandigheden*, *deze specifieke actie* uitvoeren op *deze specifieke resource*?" Dit is autorisatie als een **actie** of een proces (een werkwoord).
{{< /chapter/section >}}

{{< chapter/section title="Het cruciale onderscheid: Gedelegeerde toestemming versus dynamische handhaving">}}
| Kenmerk | `OAuth 2.0` (Gedelegeerde autorisatie) | `Externalized Authorization Management (EAM)` |
| :--------------------------- | :---------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **Primaire Focus** | Toestemming verlenen aan de *`client application`* namens een gebruiker. | `Real-time` beslissen of een *subject* een specifieke *actie* mag uitvoeren op een *resource*`. |
| **Granulariteit** | Grofmazig (via `scopes` die algemene permissies definiëren). | Fijnmazig (via policies die attributen en context evalueren). |
| **Basis van Beslissing** | Gebruikerstoestemming voor aangevraagde `scopes`. | Policies die attributen van subject, resource, actie en omgeving evalueren. |
| **Timing van Beslissing** | Voornamelijk bij aanvang van delegatie (uitgifte `token`). | `Real-time`, voor elk relevant toegangsverzoek. |
| **Kernmechanisme** | `Access Tokens`, `Refresh Tokens`, `Scopes`. | `Policies`, `Attributes`, `PEP`, `PDP`, `PIP`, `PAP`. |
| **Architectonisch Patroon** | Delegatie van autoriteit. | Externalisatie van autorisatielogica. |
{{< /chapter/section >}}

{{< chapter/section title="Samenwerking: Een gelaagde beveiligingsstrategie">}}
`OAuth` en `EAM` zijn geen concurrenten, maar partners die elkaar versterken in een gelaagd beveiligingsmodel.

Het is een veelvoorkomend misverstand om te proberen gedetailleerde, dynamische en contextspecifieke autorisatielogica volledig binnen OAuth scopes te implementeren. Dit leidt vaak tot een wildgroei aan scopes ("scope explosion") of tot te ruime permissies. `OAuth` informeert de `resource server` dat de *applicatie* gemachtigd is om een bepaald *type* verzoek te doen; `EAM` bepaalt vervolgens of de *geauthenticeerde gebruiker* die via die applicatie handelt, daadwerkelijk gerechtigd is om die *specifieke operatie* op die *specifieke data* op dat *exacte moment* uit te voeren.
{{< /chapter/section >}}

{{< chapter/section title="Kernboodschap voor IAM-Professionals">}}

Het is essentieel om het onderscheid te erkennen tussen de gedelegeerde *autorisaties* die `OAuth` biedt aan applicaties, en het dynamische, real-time *autoriseren* van `Externalized Authorization Management`. `OAuth` beheert de "voordeur" voor applicaties, terwijl EAM-systemen (met `AuthZEN` als standaard voor communicatie) de specifieke acties binnen die deur controleren. Deze gelaagde aanpak is fundamenteel voor het bouwen van veilige, flexibele en schaalbare systemen die voldoen aan de complexe autorisatie-eisen van moderne applicatielandschappen.
{{< /chapter/section >}}