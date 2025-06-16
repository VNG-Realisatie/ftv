---
type: 'chapter'
title: "Methodieken"
---
{{< chapter/section title="Methodieken" >}}
In de loop van de jaren is een aantal methodieken ontstaan. Dit zijn werkwijzen, oftewel categorie&euml;n van oplossingen, niet concrete implementaties.
Dit is de gangbare indeling:

{{< img-url "images/2.3.2methodieken.png" "Verantwoordelijkheden diagram" >}}

1. Lijsten van gebruikers: [Access Control Lists (ACL)](https://en.wikipedia.org/wiki/Access-control_list)
2. Rolgebaseerd: [Role Based Access Control (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)
3. Attribuutgebaseerd: [Attribute Based Access Control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control)
4. Policy-gebaseerd: [Policy Based Access Control (PBAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control)
5. Relatiegebaseerd: [Relationship Based Access Control (ReBAC)](https://en.wikipedia.org/wiki/Relationship-based_access_control)

{{< /chapter/section >}}

{{< chapter/section title="Vergelijking" level="3">}}
Er zijn eerder al goede beschrijvingen en vergelijkingen gemaakt:
- Door het project Federatief Datastelsel (FDS) DS is een [ position paper](https://federatief.datastelsel.nl/kennisbank/pbac/) gemaakt
- Onder GEMMA is een [vergelijking](https://www.gemmaonline.nl/wiki/WMA_RBAC_ABAC_en_PBAC) gemaakt.

Het is duidelijk dat ACL en RBAC op de schaal en in de filosofie van het FDS niet voldoen.

Dan blijven ABAC, PBAC en ReBAC over. Deze lijken nogal op elkaar.
- De term ABAC is al lang geleden bedacht in het kader van XACML en de 'driepoot'-architectuur zoals in het plaatje boven.
- De term PBAC kwam later en gebruikt het woord policy om te benadrukken dat het om in aparte bestanden geplaatste beleidsregels (policies) gaat. Dit werd in XACML echter ook al gedaan, in XML-bestanden. Volgens [Wikipedia](https://en.wikipedia.org/wiki/Attribute-based_access_control) zijn ABAC en PBAC daarom ook hetzelfde.
- ReBAC op zijn beurt schuift relaties naar de voorgrond. Maar in essentie zijn relaties een categorie van eigenschappen, niet een nieuw concept.

De essentie van deze drie methodieken zit in de volgende overeenkomsten:

- Regels worden apart van broncode geschreven en met dezelfde zorgvuldigheid beheerd als broncode (**policy as code**).
- Regels zijn fijnmazig (**fine grained access control**), door gebruik te kunnen maken van eigenschappen van de vrager (subject), de vraag (actie), de context en het antwoord (resource).
- Regels worden **real-time** toegepast, dus niet alleen tijdens authenticatie.
{{< /chapter/section >}}

{{< chapter/section title="Externalized Authorization Management" level="3">}}
De term Externalized Authorization Management (EAM) kan als overkoepelend begrip gebruikt worden. De toegangscontrole is buiten de applicaties geplaatst, waardoor de volgende belangrijke principes mogelijk worden gemaakt:
- **Zero-trust**. Controleer toegang op elke plek waar interactie tussen systemen plaatsvindt en er dus een risico op onrechtmatige toegang is. 
- **Centraal beheerd, lokaal toegepast**. Regels kunnen complex zijn en het beheer ervan vraagt kennis en tooling. Tegelijk moet toegang efficiënt bepaald
worden om te voorkomen dat prestaties belemmerd worden. Door gedistribueerde systemen te gebruiken, zijn beide tegelijk mogelijk.

Onderstaande video toont het veld.

<iframe width="560" height="315" src="https://www.youtube.com/embed/QBs4G2WUP7U?si=CALnZ-582uDPCmug" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


{{< /chapter/section >}}
