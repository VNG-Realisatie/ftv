---
Title: OpenFTV beleid
type: 'chapter'
---


{{< chapter/nextprevious  bg="bg-rhc-color-donkerbruin-50" previouslink="../." previoustitle="OpenFTV algemeen">}}
{{< /chapter/nextprevious >}}

{{< chapter/section title="OpenFTV beleid" >}}


De beheermodule van OpenFTV is zelf ook een applicatie, en ook een applicatie met functies die niet iedereen zomaar mag. Op deze pagina eordt het beleid en bijbehorende polices uitgelegd. Om te begrijpen hoe de beheermodule werkt, en ook als voorbeeld van hoe beleid en policies eruit kunnen zien.
{{< /chapter/section >}}

{{< chapter/section title="1. Beleid" level="3" >}}

Als we de functies van de beheermodule en de rollen die we erkennen in een autorisatiematrix zetten krijgen we het volgende:

| Functie                                          | Systeembeheerder | Functioneel beheerder | Auditor |   |
|--------------------------------------------------|------------------|-----------------------|---------|---|
| Regels inzien                                    | X                | X                     | X       |   |
| Regels maken, wijzigen en verwijderen            |                  | X                     |         |   |
| Regels distribueren                              |                  | X                     |         |   |
| Context-attributen inzien                        | X                | X                     | X       |   |
| Context-attributen maken, wijzigen en verwijderen |                  | X                     |         |   |
| Beslispunten inzien                              | X                | X                     | X       |   |
| Beslispunten maken, wijzigen en verwijderen      |                  | X                     |         |   |
| Audit-log inzien                                 | X                | X                     | X       |   |
| Audit-log leegmaken                              |                  | X                     |         |   |
| OpenFTV beheerapplicatie instellingen inzien     | X                | X                     |         |   |
| OpenFTV beheerapplicatie instellingen wijzigen   | X                |                       |         |   |

De functies zijn vast, dat is wat er beschikbaar is in de software. De rollen zijn arbitrair, die zijn gekozen als startset en in de identity provider gezet. Door meer rollen bij te maken en daar in policies rechten aan te geven kan de toegang fijnmaziger worden gemaakt.
{{< /chapter/section >}}

{{< chapter/section title="2. Attributen" level="3" >}}

Policies maken gebruik van gegevens uit het AuthZEN request. Om policies te kunnen schrijven voor een applicatie, in dit geval OpenFTV manager, is nodig om te weten welke gegevens er beschikbaar (kunnen) zijn. Hieronder een tabel van de  gegevens die de OpenFTV manager meegeeft in een AuthZEN verzoek,

| subject   | action     | resource | context |
|-----------|------------|----------|---------|
| principal | read       | policy   |         |
|           | edit       | context  |         |
|           | create     | pdp      |         |
|           | delete     | auditlog |         |
|           | distribute | setting  |         |

Rollen liggen niet vast, deze komen uit de Identity Provider. In ons geval is dat standaard KeyCloack. Bij levering worden de volgende rollen aangemaakt, met bij elk een enkele gebruiker.

| rol     | gebruiker    |
|---------|--------------|
| admin   | admin-user   |
| author  | author-user  |
| auditor | auditor-user |

In de praktijk zullen er meer gebruikers zijn, met een persoonsnaam of een applicatienaam. En de relatie tussen rol en gebruiker is niet een op een, dat is veel op veel.

{{< /chapter/section >}}

{{< chapter/section title="3. Policies" level="3" >}}

Het beleid kan hiermee worden omgezet in policies. Er is gekozen voor een policy per rol. Onderstaande voorbeelden zijn in Cedar geschreven, omdat dit deze PDP standaard wordt geleverd. Dit had ook elke andere PDP met bijbehorende taal kunnen zijn.

Voor systeembeheerders geldt dat ze alles mogen zien en daarbovenop instellingen mogen wijzigen. In Cedar:

```cedar
 permit (
    principal is user,
    action,
    resource is service
)
when {
    principal has roles &&
    (principal.roles == "admin" || principal.roles.contains("admin"))
};`

```

Functioneel beheerders mogen alles behalve instellingen wijzigen:

```cedar
 permit (
    ...
)
when {
    principal has roles &&
    (principal.roles == "author" || principal.roles.contains("author"))
};`

```

Auditors alles zien, behalve instellingen:

```cedar
 permit (
    ...
)
when {
    principal has roles &&
    (principal.roles == "auditor" || principal.roles.contains("auditor"))
};`

```


{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-donkerbruin-50" previouslink="../." previoustitle="OpenFTV algemeen">}}
{{< /chapter/nextprevious >}}
