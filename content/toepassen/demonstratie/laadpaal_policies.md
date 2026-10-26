---
Title: Laadpalen beleid
type: 'chapter'
---


{{< chapter/nextprevious  bg="bg-rhc-color-donkerbruin-50" previouslink="../." previoustitle="OpenFTV algemeen">}}
{{< /chapter/nextprevious >}}

{{< chapter/section title="Van beleid naar beleidsregels" >}}

Het beleid rondom laadpalen bestaat uit een deel gemeentelijk besluit, en deels uit overeenkomsten met RvIG en met de RDW. Hier werken we dat beleid stap voor stap uit in beleidsregels.

{{< /chapter/section >}}

{{< chapter/section title="Gemeentelijk beleid" level="3">}}

Het zaaksysteem is het werkgebied van de gemeente zelf. Zij besluit zelf wat ze aan doelbindingen heeft, welke gegevens bij die doelbindingen gebruikt mogen worden en wie die gegevens mag verwerken. 

{{< /chapter/section >}}

{{< chapter/section title="Doelbinding" level="4">}}

In dit geval heeft de gemeente een nieuwe doelbinding bedacht, die van een laadpaalvergunning. En als actie daarbij in ieder geval het aanvragen van een laadpaalvergunning. Dit kan in een beleidsregel in Cedar als volgt worden opgeschreven:

```cedar

forbid (
    principal,
    action == name::"aanvragen",
    resource is laadpaalVergunning
)
unless {
    context has doelbinding &&
    context.doelbinding == "laadpaal-vergunning"
};

```

{{< /chapter/section >}}

{{< chapter/section title="Dataminimalisatie" level="4">}}

Vervolgens legt de gemeente zich beperkingen op in het kader van dataminimalisatie. 

- Van de persoonsgegevens zijn alleen BSN, NAW en meerderjarigheid relevant. Het RvIG levert meer, maar dat mag niet gebruikt worden door het zaaksysteem als het gaat om laadpaalvergunningen.
- Van de voertuiggegevens zijn alleen kenteken en de uitstootklasse nodig.

Dit wordt gerealiseerd doordat de beleidsregel een obligation toevoegt aan het antwoord die opsomt welke velden behouden moeten worden. Daarmee implicerend dat alle ander velden weggelaten moeten worden. In Rego ziet dat er zo uit:

```rego

allow := true

context := {"obligations": [{
    "type": "custom",
    "id": "laadpaalvelden",
    "properties": {
        "action": "filter_fields",
        "keep": ["bsn", "voornamen", "geslachtsnaam", "gemeente", "volwassen"],
    },
}]}

```

{{< /chapter/section >}}

{{< chapter/section title="Alleen afdeling burgerzaken" level="4">}}

Aanvragen van de vergunningen is alleen toegestaan aan medewerkers van de afdeling burgerzaken. Welke afdelingen iemand werkt is geconfigureerd in het gebruikersbeheer, en kan in de beleidsregel uitgelezen worden als eigenschap van de Principal. 
[Cedar](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/testdata/apps/gemeente-vlierdam/manager/policies/laadpaal-aanvragen-afdeling.cedar). 


```cedar

@reason("afdeling")
forbid (
    principal,
    action == name::"aanvragen",
    resource is laadpaalAanvraag
)
unless {
    principal has afdeling &&
    principal.afdeling == "Burgerzaken"
};  

```

{{< /chapter/section >}}

{{< chapter/section title="Verplichte opleieding" level="4">}}

Voor het beheer van de vergunningen heeft de gemeente een opleiding gemaakt, en vereist voor aanpassingen aan de registratie dat het bijbehorende examen met goed gevolg is afgelegd. [Cedar](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/testdata/apps/gemeente-vlierdam/manager/policies/laadpaal-aanvragen-opleiding.cedar)

```cedar

@reason("opleiding")
forbid (
    principal,
    action == name::"aanvragen",
    resource is laadpaalAanvraag
)
unless {
    principal has "laadpaal-opleiding"
};

```

Daaraanst mag het diploma mag niet meer dan een jaar oud zijn. [Cedar](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/testdata/apps/gemeente-vlierdam/manager/policies/laadpaal-aanvragen-opleiding-verlopen.cedar).

```cedar

@reason("verlopen opleiding")
forbid (
    principal,
    action == name::"aanvragen",
    resource is laadpaalAanvraag
)
unless {
    context has now &&
    datetime(context.now).durationSince(datetime(principal["laadpaal-opleiding"])) <= duration("365d")
};

```


{{< /chapter/section >}}

{{< chapter/section title="RvIG" level="3">}}


- BRP:
    - De gemeente Vlierdam heeft per besluit toestemming van RvIG om in de BRP gegevens op te zoeken.
    - Grondslag daarvoor is 'taak van algemeen belang of uitoefening van openbaar gezag'
    - De gemeente mag alleen ingezetenen van de eigen gemeente opzoeken.
      [Rego](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/testdata/apps/rvig/manager/policies/brp-access.rego).

{{< /chapter/section >}}

{{< chapter/section title="RDW" level="3">}}

- RDW
    - De gemeente heeft per besluit toestemming van de RDW om voertuigen in de BRV op te zoeken.
    - Diplomatieke kentekens mogen niet opgezocht worden.
      [Rego](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/testdata/apps/rdw/manager/policies/brv-access.rego).


{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-donkerbruin-50" previouslink="../." previoustitle="OpenFTV algemeen">}}
{{< /chapter/nextprevious >}}
