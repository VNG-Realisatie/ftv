---
Title: Laadpalen beleid
type: 'chapter'
---


{{< chapter/nextprevious  bg="bg-rhc-color-donkerbruin-50" previouslink="../." previoustitle="OpenFTV algemeen">}}
{{< /chapter/nextprevious >}}

{{< chapter/section title="Van beleid naar beleidsregels" >}}

Het beleid rondom laadpalen bestaat uit een deel gemeentelijk besluit, en deels uit overeenkomsten met de Rijksdienst voor Identiteitsgegevens (RvIG) en met de Rijksdient voor het Wegverkeer (RDW). 

Hier werken we het complete fictieve beleid stap voor stap uit in beleidsregels. Onder elke beleidsregel staat een link naar het overeenkomstige bestand in de OpenFTV repository.

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

[Link naar repository](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/demo/gemeente-vlierdam/manager/policies/laadpaal-aanvragen-doelbinding.cedar)

{{< /chapter/section >}}

{{< chapter/section title="Dataminimalisatie" level="4">}}

Vervolgens legt de gemeente zich beperkingen op in het kader van dataminimalisatie. 

- Van de persoonsgegevens zijn alleen BSN, NAW en meerderjarigheid relevant. Het RvIG levert meer, maar dat mag niet gebruikt worden door het zaaksysteem als het gaat om laadpaalvergunningen.
- Van de voertuiggegevens zijn alleen kenteken en de uitstootklasse nodig.

Dit wordt gerealiseerd doordat de beleidsregel een obligation toevoegt aan het antwoord die opsomt welke velden behouden moeten worden. En dat impliceert dat alle ander velden weggelaten moeten worden. 

In Rego ziet dat er zo uit:

```rego

context := {"obligations": [{
    "type": "custom",
    "id": "laadpaalvelden",
    "properties": {
        "action": "filter_fields",
        "keep": ["bsn", "voornamen", "geslachtsnaam", "gemeente", "volwassen"],
    },
}]}

```

[Link naar repository](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/demo/gemeente-vlierdam/manager/policies/brp-velden.rego)

{{< /chapter/section >}}

{{< chapter/section title="Afdeling" level="4">}}

Aanvragen van de laadpaalvergunningen is alleen toegestaan aan medewerkers van de afdeling burgerzaken. Welke afdelingen iemand werkt is geconfigureerd in het gebruikersbeheer, en kan in de beleidsregel uitgelezen worden als eigenschap van de Principal.

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

[Link naar repository](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/demo/gemeente-vlierdam/manager/policies/laadpaal-aanvragen-afdeling.cedar?ref_type=heads).

{{< /chapter/section >}}

{{< chapter/section title="Verplichte opleiding" level="4">}}

Voor het beheer van de vergunningen heeft de gemeente een opleiding gemaakt, en het met goed gevold afleggen van het bijbehorende examen is vereist voor het aanvragen van een vergunning.

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

[Link naar repository](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/testdata/apps/gemeente-vlierdam/manager/policies/laadpaal-aanvragen-opleiding.cedar).

Daarnaast mag het diploma mag niet meer dan een jaar oud zijn. 

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

[Link naar repository](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/testdata/apps/gemeente-vlierdam/manager/policies/laadpaal-aanvragen-opleiding-verlopen.cedar).

{{< /chapter/section >}}

{{< chapter/section title="RvIG" level="3">}}

In deze demonstratie komen de persoonsgegevens van een fictieve verschijning van de RvIG. Deze beheert onder andere de landelijke voorziening BRP. 

Toegang tot de BRP wordt in eerste instantie verleend via een zogenaamd besluit. Elke gemeente dient 'een taak van algemeen belang of uitoefening van openbaar gezag', en heeft daarvoor persoonsgegevens nodig. Als basis is er een [landelijk besluit](https://wetten.overheid.nl/BWBR0034306/2026-10-01/0), en per gemeente wordt een specifiek autorisatiebesluit genomen, hier een [voorbeeld van de gemeente Utrecht](https://zoek.officielebekendmakingen.nl/stcrt-2025-1670.pdf). Als bijlage bij elk besluit is er een autorisatietabel, ook wel 'kruisjeslijst', waarin staat welke velden die gemeente voor welk soort bevraging gaat ontvangen. Hier als voorbeeld de [kruisjeslijst van Utrecht](https://publicaties.rvig.nl/media/11313/download).

Dit besluit is op gemeenteniveau, niet op doelbindingniveau. De gemeente moet zelf in de gaten houden dat de gegevens beperkt worden tot wat nodig is voor een specifieke doelbinding. De volgende beleidsregel voldoet daarom:

```rego

package doelbinding["identificatie-en-ingezetenschap"]

import rego.v1

allow := true

```

[Link naar repository](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/demo/rvig/manager/policies/brp-access.rego?ref_type=heads).

Een beperking die wel opgelegd wordt is dat alleen ingezetenen van de eigen gemeente mogen worden ingezien. RvIG controleert daarop door de 'afnemersindicatie', een unieke nummering van afnemers waarvan Vlierdam er een is, te vergelijken met de 'gemeentecode' die bij elke burger is opgenomen.

```rego

package doelbinding["identificatie-en-ingezetenschap"]

import rego.v1

allow := true

```

[Link naar repository](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/demo/rvig/manager/policies/brp-access.rego?ref_type=heads).

{{< /chapter/section >}}

{{< chapter/section title="RDW" level="3">}}

De fictieve versie van de RDW beheert de Basisregistratie Voertuigen (RDW). Toegang werkt net als bij de BRP via een algemeen landelijk besluit en een specifiek besluit per afnemer. 

De meeste gemeenten, waaronder Vlierdam, mogen niet de kentekens van diplomatieke voertuigen inzien. Deze personen zijn beschermd en mogen alleen door afnemers zoals de marechaussee ingezien worden. 

```rego

package doelbinding["laadinfra-verificatie"]

import rego.v1

default allow := false

default reason := ""

allow if not input.context.response

allow if input.context.response.status >= 300

# Scenario 1: RDW doesn't share diplomatic vehicles. Scenario 2 replaces this rule and the next with
# `allow if input.context.response`, leaving it to the gemeente to show them to the Gemeentesecretaris only.
allow if {
is_array(input.context.response.body)
not has_diplomatic_vehicle
}

has_diplomatic_vehicle if {
some voertuig in input.context.response.body
voertuig.diplomatiek == true
}

reason := "RDW verstrekt geen gegevens over diplomatieke voertuigen" if not allow

context := {"reason": reason} if reason != ""

```

[Link naar repository](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv/-/blob/main/testdata/apps/rdw/manager/policies/brv-access.rego).


{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-donkerbruin-50" previouslink="../." previoustitle="OpenFTV algemeen">}}
{{< /chapter/nextprevious >}}
