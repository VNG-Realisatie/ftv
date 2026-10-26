---
Title: OpenFTV beleid
type: 'chapter'
---


{{< chapter/nextprevious  bg="bg-rhc-color-donkerbruin-50" previouslink="../." previoustitle="OpenFTV algemeen">}}
{{< /chapter/nextprevious >}}

{{< chapter/section title="OpenFTV beleid" >}}


De beheermodule van OpenFTV is zelf ook een applicatie. Deze bevat functionaliteit die niet voor iedereen toegankelijk is. 
Op deze pagina leggen we het beleid en de bijbehorende policies uit. Dit illustreert hoe de beheermodule werkt en is ook een voorbeeld van hoe beleid en policies eruit kunnen zien.
{{< /chapter/section >}}

{{< chapter/section title="1. Beleid" level="3" >}}

Als we de functies van de beheermodule en de rollen die we erkennen in een autorisatiematrix zetten krijgen we het volgende:

| Functie                                           | Regelbeheerder | Auditor | Systeembeheerder |   |
|---------------------------------------------------|----------------|---------|------------------|---|
| Regels inzien                                     | X              | X       | X                |   |
| Regels maken, wijzigen en verwijderen             | X              |         |                  |   |
| Regels distribueren                               | X              |         |                  |   |
| Context-attributen inzien                         | X              | X       | X                |   |
| Context-attributen maken, wijzigen en verwijderen | X              |         |                  |   |
| Beslispunten inzien                               | X              | X       | X                |   |
| Audit-log inzien                                  | X              | X       | X                |   |
| Audit-log leegmaken                               |                | X       |                  |   |
| OpenFTV beheerapplicatie instellingen inzien      | X              |         | X                |   |
| OpenFTV beheerapplicatie instellingen wijzigen    |                |         | X                |   |

De functies liggen vast, dat is wat er beschikbaar is in de software. 

De rollen zijn arbitrair, deze zijn gekozen als startset en in de identity provider gezet. 
Door meer rollen bij te maken en daar in policies rechten aan te geven kan de toegang fijnmaziger worden gemaakt.
{{< /chapter/section >}}

{{< chapter/section title="2. Attributen" level="3" >}}

Policies maken gebruik van gegevens uit het AuthZEN-verzoek. Om policies te kunnen schrijven voor een applicatie, in dit geval OpenFTV manager, is nodig om te weten welke gegevens er beschikbaar (kunnen) zijn. 
Hieronder een tabel van de gegevens die de OpenFTV manager meegeeft in een AuthZEN-verzoek.

| subject   | action  | resource      | context |
|-----------|---------|---------------|---------|
| principal | read    | policy        | reason  |
|           | create  | decisionpoint |         |
|           | update  | deployment    |         |
|           | delete  | setting       |         |
|           | accept  | attribute     |         |
|           | revert  | entity        |         |
|           | deploy  | principal     |         |
|           | restore | decision      |         |

De rollen liggen zoals gezegd niet vast, die worden beheer in de Identity Provider. In ons geval is dat KeyCloak. Initieel worden de volgende rollen aangemaakt, met de bijhorende gebruikers.

| rol             | gebruiker    |
|-----------------|--------------|
| openftv-author  | author-user  |
| openftv-auditor | auditor-user |
| openftv-admin   | admin-user   |

In de praktijk zullen er meer gebruikers zijn, met een persoonsnaam of een applicatienaam. En de relatie tussen rol en gebruiker is niet een-op-een maar meer-op-meer.

{{< /chapter/section >}}

{{< chapter/section title="3. Policies" level="3" >}}

Het beleid kan hiermee worden omgezet in policies. We gaan stap voor stap de matrix boven omzetten in policies.

De policies zijn geschreven in Cedar, waarmee de demonstratieomgeving standaard geleverd wordt. In de OpenFTV repository zijn al deze policies te vinden in de map [/testdata/apps/manager/policies/cedar](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/tree/205-e2e-laadpalen/testdata/apps/manager/policies/cedar). Dit had ook een andere taal zoals Rego kunnen zijn, als een andere PDP gekozen was.

**Beleidsregels**

Om te beginnen mogen beleidsregels ingezien worden door alle gebruikers met een van de OpenFTV-rollen. Onderstaande policy geld voor aanvragen met:

- de identiteit waarmee aangemeld wordt een gebruiker is (`user`), en niet een applicatie ('`app`'). De app-identiteiten zijn bedoeld voor toegang door externe applicaties.
- de actie lezen (`read`)
- een policy als datgene dat gelezen wil worden ('`policy`')

En dan als voorwaarde dat de identiteit minstens een van de drie FTV rollen toegewezen heeft gekregen. Het is nodig hier de rollen op te sommen, en niet op 'alle rollen' te vertrouwen, omdat er andere rollen zullen zijn die niet met OpenFTV of de beheermodule te maken hebben.

```cedar

permit (
    principal is user,
    action == Action::"read",
    resource is policy
)
when {
    principal has roles &&
    (
        principal.roles == "admin" || principal.roles == "author" || principal.roles == "auditor" ||
        principal.roles.contains("admin") || principal.roles.contains("author") || principal.roles.contains("auditor")
    )
};
```

Dan de tweede en derde regel van de autorisatiematrix, die zegt dat regelbeheerders alle andere acties mogen op policies. Ook hier worden alle acties genoemd, om te voorkomen dat een toekomstige nieuwe actie automatisch toegestaan zou zijn. 

```cedar

permit (
    principal is user,
    action in [Action::"create", Action::"update", Action::"delete", Action::"accept", Action::"revert", Action::"deploy", Action::"restore"],
    resource is policy
)
when {
    principal has roles &&
    (principal.roles == "author" || principal.roles.contains("author"))
};

```

Er is hier wel een uitzondering op: policies moeten status '`concept`' hebben om ze te mogen wijzigen. Als een policy-versie wordt gedepoyed is deze definitief, en moet er een eerst een concept gemaakt worden om wijzigingen te kunnen doen. 

```cedar

forbid (
    principal,
    action == Action::"update",
    resource is policy
)
when {
    resource has status && resource.status != "concept"
};

```

**Context-attributen**

Voor context-attributen zijn er soortgelijke policies, eentje voor lezen en eentje voor de andere acties. De uitzondering voor concept is alleen niet van toepassing.

**Beslispunten**

Beslispunten worden niet aangemaakt, gewijzigd of verwijderd in de manager, dat doet een systeembeheerder buiten het systeem. Daarom is er alleen een lees-policy.

**Auditlog**

Voor de auditlog is er ook eenzelfde lees-policy. De wijzig-policy is simpeler: alleen verwijderen is een zinvolle actie.

```cedar

permit (
    principal is user,
    action == Action::"delete",
    resource is decision
)
when {
    principal has roles &&
    (principal.roles == "auditor" || principal.roles.contains("auditor"))
};

```

**Instellingen**

Tenslotte de instellingen, die gelezen mogen worden door alle rollen, dus eenzelfde policy als boven, maar dan alleen wijzigen toegestaan aan de rol systeenbeheerders.

```cedar

permit (
    principal is user,
    action in [Action::"create", Action::"update", Action::"delete"],
    resource is setting
)
when {
    principal has roles &&
    (principal.roles == "admin" || principal.roles.contains("admin"))
};

```

{{< /chapter/section >}}

{{< chapter/section title="4. Toepassen van policies" level="3" >}}

Nu we ons beleid expliciet en uitvoerbaar hebben gemaakt, kan de manager daar gebruik van maken. De web-applicatie zal bij het opbouwen van de schermen aan de PDP vragen welke rechten de gebruiker heeft. 

Als bijvoorbeeld de knop 'instellingen' getoond moet worden, stuurt de manager dit verzoek eerst naar de PDP: 
```json
{
  "subject": {
    "type": "user",
    "id": "author-user",
    "roles": ["author"]
  },
  "resource": { 
    "type": "settings"
  },
  "action": {
    "name": "edit"
  }
}

```

Omdat functioneel beheerders geen rechten hebben om de instellingen te wijzigen, wordt dit verzoek afgewezen:

```json
{
  "decision": false
}

```

De applicatie zal de knop 'wijzigen' bij instellingen grijs kleuren en niet klikbaar maken.

{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-donkerbruin-50" previouslink="../." previoustitle="OpenFTV algemeen">}}
{{< /chapter/nextprevious >}}
