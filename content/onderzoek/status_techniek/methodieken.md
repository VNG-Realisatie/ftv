---
type: 'chapter'
title: "Methodieken"
---
{{< chapter/section title="Methodieken" >}}
In de loop van de jaren is een aantal methodieken ontstaan. Dit zijn werkwijzen, oftewel categorie&euml;n van oplossingen, niet concrete implementaties.
Dit is de gangbare indeling:

{{< img-url "images/2.3.2methodieken.png" "Verantwoordelijkheden diagram" >}}

1. Lijsten van gebruikers: [Access Control Lists (ACL)](https://en.wikipedia.org/wiki/Access-control_list)
2. Rolgebaseerd: [Role based access control (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)
3. Attribuutgebaseerd: [Attribute based access control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control)
4. Policy-gebaseerd: [Policy Based access control (PBAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control)
5. Relatiegebaseerd: [Relationship Based access control (ReBAC)](https://en.wikipedia.org/wiki/Relationship-based_access_control)

We beschrijven de methodieken hier niet; volg de links voor meer informatie.
{{< /chapter/section >}}

{{< chapter/section title="Vergelijking" level="3">}}
Er zijn eerder al goede beschrijvingen en vergelijkingen gemaakt:
- Door het project FDS is een [ position paper](https://federatief.datastelsel.nl/kennisbank/pbac/) gemaakt
- Onder GEMMA is een [vergelijking](https://www.gemmaonline.nl/wiki/WMA_RBAC_ABAC_en_PBAC) gemaakt.

Het is duidelijk dat ACL en RBAC op de schaal en in de filosofie van het FDS niet voldoen.

Dan blijven ABAC, PBAC en ReBAC over. Deze lijken nogal op elkaar.
- De term ABAC is al lang geleden bedacht in het kader van XACML en de 'driepoot'-architectuur zoals in het plaatje boven.
- De term PBAC kwam later en gebruikt het woord policy om te benadrukken dat het om in aparte bestanden geplaatste beleidsregels (policies) gaat. Dit werd in XACML echter ook al gedaan, in XML-bestanden. Volgens Wikipedia  zijn ABAC en PBAC daarom ook hetzelfde.
- ReBAC op zijn beurt schuift relaties naar de voorgrond. Maar in essentie zijn relaties een categorie van eigenschappen, niet een nieuw concept..

De essentie van deze drie methodieken zit in de volgenden overeenkomsten:

- Regels worden apart van broncode geschreven, en met dezelfde zorgvuldigheid beheerd als broncode ('**policy as code**') 
- Regels zijn fijnmazig ('**fine grained access control**'), door gebruik te kunnen maken van eigenschappen van de vrager ('subject'), de vraag ('actie'), de context en het antwoord ('resource')
- Regels worden **real-time** toegepast, dus niet alleen tijdens authenticatie.
{{< /chapter/section >}}

{{< chapter/section title="Externalized access management" level="3">}}
De term 'Externalized access management' kan als overkoepelend begrip gebruikt worden. De toegangscontrole is buiten de applicaties geplaatst,
hetgeen de volgende voor ons belangrijke principes faciliteert:
- '**Zero-trust**'. Controleer toegang op elke plek waar interactie tussen systemen plaatsvindt en er dus een risico op onrechtmatige toegang is. 
- **Centraal beheerd, lokaal toegepast**. Regels kunnen complex zijn en het beheer ervan vraagt kennis en tooling. Tegelijk moet toegang efficient bepaald
worden om te voorkomen dat prestaties belemmerd worden. Door gedistribueerde systemen te gebruiken zijn beide tegelijk mogelijk.

Onderstaande video beschrijft het veld.

{{< /chapter/section >}}

{{< youtube QBs4G2WUP7U >}}
