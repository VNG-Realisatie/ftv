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

{{< chapter/section title="2. Policies" level="3" >}}

Het bovenstaande beleid is omgezet in policies. Er is gekozen voor een policy per rol. Onderstaande voorbeelden zijn in Cedar geschreven.

Voor systeembeheerders geldt dat :

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

{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-donkerbruin-50" previouslink="../." previoustitle="OpenFTV algemeen">}}
{{< /chapter/nextprevious >}}
