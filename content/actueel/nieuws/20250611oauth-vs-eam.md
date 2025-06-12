---
type: 'nieuws'
Title: Het verschil tussen autorisatie in OAuth, OpenID Connect en EAM
date: '2025-06-11'
summary: "Binnen IAM is autorisatie een sleutelbegrip maar betekent het niet altijd hetzelfde. De autorisaties van OAuth en OpenID Connect zijn niet hetzelfde als het autoriseren van Externalized Authorization Management (EAM)."
---

{{< nieuws/header title="Het verschil tussen autorisatie in OAuth, OpenID Connect en EAM" >}}
Binnen  Identity and Access Management (IAM) is autorisatie, of toegangsverlening, een sleutelbegrip. Maar het betekent niet in elke context hetzelfde. De autorisaties van OAuth zijn niet hetzelfde als het autoriseren van Externalized Authorization Management (EAM).
{{< /nieuws/header >}}

{{< chapter/section>}}
In OAuth 2.0 verwijst autorisatie bijvoorbeeld naar een vooraf verleende toestemming: een autorisatie. Bij Externalized Authorization Management (EAM) gaat het juist om het beslissen op het moment: het proces van autoriseren. Dat subtiele verschil heeft grote gevolgen voor de manier waarop toegang wordt 
geregeld in digitale systemen. Zeker wanneer meerdere organisaties samenwerken en verantwoordelijkheden zorgvuldig gescheiden moeten blijven.
{{< /chapter/section >}}

{{< chapter/section title="Delegeren van autorisaties met OAuth">}}
OAuth is een framework voor **gedelegeerde autorisatie**. Het maakt het mogelijk dat een applicatie namens een gebruiker toegang krijgt tot gegevens die zijn opgeslagen in een andere applicatie, de *resource server*.)

*Bijvoorbeeld: Een medewerker van de gemeente (de gebruiker) verleent toestemming aan het zaaksysteem (de applicatie) om afspraken in te plannen in zijn Outlook kalender (de resource server). Deze toestemming wordt vaak bij het inloggen verpakt in een access token met scopes die de rijkweidte van de toestemming aangeven, zoals alleen aanmaken of ook verwijderen. Dit token is een digitaal bewijs dat de applicatie namens de gebruiker toegang mag vragen.*

OAuth geeft dus antwoord op de vraag: "Heeft *deze applicatie* toestemming gekregen van de gebruiker om namens hen bepaalde acties uit te voeren of toegang te krijgen tot bepaalde data?" Autorisatie is bij OAuth 2.0 een gegeven: een vooraf verleend recht, vastgelegd in een token met scopes. De *resource server* controleert het token en beoordeelt of het verzoek binnen de toegestane scopes valt.
{{< /chapter/section >}}

{{< chapter/section title="Authenticatie met OpenID Connect">}}
OAuth wordt vaak gecombineerd met OpenID Connect om ook authenticatie en identificatie mogelijk te maken. Hierbij wordt OAuth gebruikt om namens de gebruiker de applicatie (Relying Party) te *autoriseren* om de *identificatie token* van de OpenID Provider te ontvangen. 

*Bijvoorbeeld: Een medewerker van de gemeente geeft de planningsapplicatie (Relying Party) toestemming tot de 'openid' scope bij Microsoft EntraID (de cloud login van Microsoft.) De planningsapplicatie ontvangt geauthenticeerde gebruikergegevens zonder dat hij login gegevens van de gebruiker weet.*

Hiermee wordt de traditionele login dus gezien als de *autorisatie* dat de applicatie de gebruiker *mag* identificeren.
{{< /chapter/section >}}

{{< chapter/section title="Autoriseren van toegangsverzoeken met EAM">}}
EAM werkt fundamenteel anders dan OAuth 2.0. In plaats van vooraf verleende toestemming, draait EAM om toegangsbeslissingen die real-time worden genomen op basis van beleidsregels en context. Bij EAM worden autorisatieregels niet in de applicatiecode opgenomen, maar centraal opgeslagen en beheerd. Dit maakt het mogelijk om beheer en uitvoering te scheiden.

EAM maakt gebruik van modellen zoals Attribute-, Policy en Relationship-based Access Control (ABAC, PBAC, ReBAC). Deze modellen maken het mogelijk om toegangsbeslissingen te baseren op kenmerken van de gebruiker, beleidsregels of relaties met het betreffende gegeven.

EAM maakt dus fijnmazige autorisatie mogelijk. Daarbij wordt elke toegangsbeslissing real-time genomen, op basis van:
- kenmerken van de gebruiker
- beleidsregels
- context

In plaats van een vooraf verleend recht, is autorisatie hier een proces: een 
concrete beslissing op het moment van handelen. De communicatie tussen 
applicaties en EAM-componenten is gestandaardiseerd via [OpenID AuthZEN](/methodiek/standaarden/) 
door de interfaces tussen applicaties en EAM-oplossingen te specificeren.
{{< /chapter/section >}}

{{< chapter/section title="Samenwerking: Een gelaagde beveiligingsstrategie">}}
Het is een veelvoorkomende misvatting dat complexe toegangsregels volledig in OAuth kunnen worden ondergebracht. In de praktijk blijkt dat scopes daarvoor niet toereikend zijn en het leidt vaak tot een wildgroei aan scopes (scopes explosion) of tot te ruime toegang.

OAuth laat de resource server weten dat een applicatie namens een gebruiker een bepaald type verzoek mag doen. Maar het bepaalt niet of die specifieke handeling op dat specifieke moment is toegestaan. EAM voegt daar 
een extra laag aan toe: het controleert per handeling, per gegeven en op basis van context of toegang werkelijk mag worden verleend.

*OAuth beheert de ‘voordeur’ voor applicaties, terwijl EAM-systemen - met AuthZEN als standaard voor communicatie - de specifieke acties achter de voordeur controleren.*

OAuth en EAM zijn dus geen concurrerende oplossingen, maar vullen elkaar aan. Samen vormen ze een gelaagde beveiligingsstrategie, onmisbaar voor het ontwikkelen van veilige, flexibele en schaalbare systemen die voldoen aan de complexe autorisatie-eisen van moderne applicatielandschappen.
{{< /chapter/section >}}
