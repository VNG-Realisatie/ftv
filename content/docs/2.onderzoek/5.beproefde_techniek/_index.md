---
weight: 50
bookCollapseSection: true
title: "Beproefde techniek"
---

# Beproefde technieken binnen het FTV-project

Tijdens het bouwen van de [referentie-implementatie](../../4.implementatie) zijn al diverse toegangsverlening technieken 
op het gebied van ABAC, PBAC en ReBAC beproefd.

## Cedar
Cedar is afkomstig uit de AWS-keuken, en als [open-source](https://www.cedarpolicy.com/en) beschikbaar gesteld.

De Cedar policy-taal is (vooralsnog) relatief simpel.
Het ondersteunt op dit moment nog geen residual policies,
en levert in principe alleen een ja/nee antwoord op.

Het Cedar data-schema gaat uit van policies, attributen en entiteiten.
Entiteiten worden gekenmerkt door een type (bv.: "gebruiker", "resource" of "applicatie")
en een identificatie-code die uniek moet zijn voor het type entiteit.
Opgemerkt kan worden dat deze kenmerken (type + ID) in de [AuthZEN](https://openid.net/wg/authzen/) specificatie voor PEP/PDP-interactie
zijn opgenomen als de sleutel-elementen voor subject en resource.

Cedar kan als library of als container gebruikt worden.
In principe is Cedar in Rust geschreven,
maar er is ook een volledige Golang implementatie (die echter wel iets achter loopt op de Rust implementatie).
Omdat het nog volop in ontwikkeling is, kunnen bepaalde interfaces wijzigen.
Tijdens het bouwen van de referentie-implementatie is het al een keer voorgekomen
dat een deel van de code herschreven moest worden om met een nieuwere versie van de library te werken.

## OPA en Rego
OPA is in eerste instantie ontwikkeld door Styra.
Een [open-source versie](https://github.com/open-policy-agent/opa) is in 20xx overgedragen aan het [CNCF](https://www.cncf.io/projects/open-policy-agent-opa/).
Deze versie is in 20xx op tot niveau van xxxx gepromoveerd, en zit daarmee op hetzelfde niveau als bv. Kubernetes.

De Rego-taal welke OPA hanteert is relatief complex.
Het vormt eerder een mini-programmeertaal dan een taal voor het opstellen van toegangsregels.
Met behulp van de importfunctie kunnen generieke stukken Rego in een Rego-policy opgenomen worden,
vergelijkbaar met het importeren van libraries in een programmeertaal.

Rego levert een JSON antwoord op, waar in principe van alles in kan staan.
Het ondersteunt dus residual policies, al is dit (nog) niet geformaliseerd in de taal zelf.

OPA is in Golang geschreven.
Het kan als library (vooralsnog) dan wel als container gebruikt worden.

## Cerbos
Cerbos komt uit de keuken van Google.
Het project is als open-source beschikbaar op [Github](https://github.com/cerbos/cerbos).

De policy-taal is relatief eenvoudig.
Voor expressies binnen policies wordt de [CEL](https://cel.dev/) taal gebruikt, welke ook uit de keuken van Google komt.

Cerbos policies kunnen in principe residual policies opleveren, als is dit niet geformaliseerd in de taal zelf.

Cerbos is in Golang geschreven, maar kan door de interne opzet van de code alleen als container gebruikt worden.

## OpenFGA
OpenFGA is een [open-source](https://openfga.dev/) ReBAC implementatie welke is gebaseerd op het [Zanzibar](https://zanzibar.academy/) project van Google.

De policy-taal is zeer eenvoudig.
Het principe van toegang is gebaseerd op het bestaan van de benodigde relaties.
Aan relaties kunnen wel optionele expressies toegevoegd worden, 
waarmee data uit de context een rol kan spelen bij de beslissing (dus eigenlijk ReBAC+ABAC).

OpenFGA policies kunnen in principe residual policies opleveren, als is dit niet geformaliseerd in de taal zelf.

OpenFGA kan als library of container gebruikt worden.
Het is in Golang geschreven.

## Conclusies
Iedere beproefde techniek hanteert een eigen policy-taal, welke niet uitwisselbaar is met de andere talen.
Indien policies (of generieke delen van policies) op federatief niveau vastgelegd dienen te worden,
wordt het heel lastig als partijen een eigen keuze maken voor de policy-taal.

De beproefde open-source implementaties bestaan eigenlijk alleen uid de PDP en een interne cache voor policies en data.
Het ondersteunt niet het gebruik als aparte PAP of PIP.

Geen van de projecten bevat een makkelijk te hanteren hulpmiddel voor het opstellen van policies.
Er zijn wel zogenaamde playgrounds beschikbaar, maar daar is nog steeds een gedegen kennis van de taal voor nodig.
