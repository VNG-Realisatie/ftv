---
type: 'chapter'
title: "Methodiek"
---

{{< chapter/header title="Methodiek" bg="blue" icon="images/api-icon.svg">}}
De kern van het project is de gekozen methodiek, oftewel de voorgestelde werkwijze. De methodiek beschrijft vanuit technisch en functioneel perspectief hoe een oplossing voor toegang eruit moet zien om de voordelen van Federatieve Toegangsverlening (FTV) te behalen.

{{< /chapter/header >}}

{{< chapter/header bg="gray">}}

<div class="section-navigation-selected utrecht-paragraph pt-1 section-navigation">
   <p>
      De EAM principes
   </p>
</div>
<div class="utrecht-paragraph pt-1 section-navigation">
   <p>
      <a href="standaarden">De FTV-standaarden</a>
   </p>
</div>
<div class="utrecht-paragraph pt-1 section-navigation">
   <p>
      <a href="federatief">Federatief EAM</a>
   </p>
</div>

{{< /chapter/header >}}


{{< chapter/section title="Externalized Authorization Management (EAM)" >}}
De term voor de gekozen methodiek is Externalized Authorization Management (soms ook wel Externalized Access Management).
In deze methodiek worden toegangsverzoeken, -beslissingen en -beleid op gestandaardiseerde wijze gemodelleerd
en buiten de applicaties gebracht zodat deze centraal beheerd kunnen worden.

**EAM in vogelvlucht**

Een overzicht van EAM in 2:30.

<video width="640" height="480" controls>
  <source src="https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/content/methodiek/methodiek-slidecast.mp4" type="video/mp4">
</video>

<a href="methodiek-slidecast-transcript.txt" download>Transcript downloaden</a>

{{< /chapter/header >}}

{{< chapter/section title="Separation of concerns" level="3">}}

![img.png](methodiek_soc.png)

De basisgedachte is het scheiden van verantwoordelijkheden (separation of concerns). Regels worden gescheiden van code in zogenaamde policies, en het beheer van policies wordt gescheiden van het handhaven ervan.

{{< /chapter/header >}}

{{< chapter/section title="De drie kenmerken" level="3">}}

![img_1.png](methodiek-3-kenmerken.png)

De drie belangrijkste kenmerken van EAM zijn:

1. **Fijnmazige** toegangscontrole. We onderscheiden drie niveaus van fijnheid: 

     - Grofmazige toegangscontrole vindt plaats tijdens login en gebruikt informatie over de gebruiker en de te gebruiken diensten om te bepalen welke toegang mogelijk is. Hier is OAuth met scopes het meest bekende mechanisme.
     - Middelmazige toegangscontrole filtert toegang tijdens het aanroepen van een API op basis van de gebruiker, gevraagde API en gevraagde verwerking. OpenAPI routes is daar een bekende standaard in.
     - Fijnmazige toegangscontrole maakt gebruik van nog meer kenmerken. Die komen behalve voorgenoemde bronnen ook uit de context, de omstandigheden van de aanroep. Daaronder rekenen we o.a. de datum/tijd, de beveiliging van de verbinding en het IP-adres van de aanroeper. En daarnaast kunnen allerlei situatiespecifieke attributen en berekeningen gebruikt worden. In de overheidscontext kan je denken aan doelbinding en grondslag.

3. **Policy as code**. De policies worden beheerd met dezelfde zorgvuldigheid als broncode. Er wordt versiebeheer gebruikt, zodat de historie bekend en teruggegaan kan worden naar vorige versies. Er is workflow zodat bijvoorbeeld schrijven, controleren en vrijgeven van policies aparte taken zijn. En er is toegangscontrole op de policies zelf.
3. **Real time**. Policies worden niet alleen tijdens login uitgevoerd, maar op elk moment wanneer toegang gevraagd wordt (zero trust) en op elke plek in de keten waar toegang gevraagd wordt (defense in depth).

{{< /chapter/header >}}

{{< chapter/section title="Gedistribueerd model" level="3">}}

![Een diagram van toegang in een gedistribueerd systeem](methodiek-gedistribueerd.png)

In de fysieke architectuur zien we de scheiding van verantwoordelijkheden terug. In dit voorbeeld haalt een client een token op bij de Identity Provider en benadert via de API-Gateway twee applicaties.

Toegangscontrole vindt plaats op elke plek in het systeem. Op elke plek worden alleen die policies die daar gehandhaafd dienen te worden geëvalueerd.

De policies worden echter op een centrale plek beheerd. Daar worden ze geschreven, gecontroleerd en worden versies beheerd. Op het moment dat wijzigingen effectief moeten worden, wordt de juiste versie naar de juiste plek overgebracht.

In de [technische architectuursectie](architectuur) omschrijven we de gangbare componenten van de toegangsoplossing en plaatsen we deze in het wijdere IT-landschap.
{{< /chapter/section >}}

{{< chapter/section title="De PxP-architectuur" >}}

Welke verantwoordelijkheden precies gescheiden moeten worden is al meer dan 20 jaar geleden bedacht als onderdeel van de XACML autorisatiestandaard. Deze standaard bevat nog veel meer, waaronder een XML-gebaseerde policy-taal. Hoewel XML goeddeels uit de gratie is gevallen, zijn de basisverantwoordelijkheden algemeen geaccepteerd in de zogenaamde PxP-architectuur.

![Diagram van de PxP-architectuur](methodiek-pxp-architectuur.png)

De flow van informatie volgt de nummers, als volgt:

1. Het Policy Enforcement Point (**PEP**) onderschept een verwerkingsverzoek en handhaaft (enforced) daarmee de toegang op de verwerking 
2. Het PEP stuurt een verzoek aan het Policy Decision Point (**PDP**), een beslissing te nemen.
3. Het Policy Administration Point (**PAP**) voorziet het PDP van de policies
4. Het Policy Information Point (**PIP**) haalt additionele informatie op wanneer dat nodig is voor het maken van de toegangsbeslissing.
5. Het PDP communiceert terug welke beslissing genomen is
6. Als de beslissing positief is gaat het verzoek door naar de verwerking
7. Het antwoord, zijnde hetzij de gewenste verwerking, hetzij een afwijzing, gaat terug naar de aanvrager.
{{< /chapter/section >}}

{{< chapter/section title="PBAC, ABAC of ReBAC?" level="3">}}

EAM is een overkoepelend begrip waaronder Policy-, Attribute-, en Relationship Based Access Control (PBAC, ABAC en ReBAC) vallen.

**ABAC** en **PBAC** zijn in essentie hetzelfde. ABAC is de originele term, en werd gezien als uitgaand van een vaste set attributen, niet geharmoniseerd over de organisatie heen. De term PBAC werd later geïntroduceerd om nadruk te leggen op policies op organisatie-niveau die lokaal vertaald kunnen worden naar een flexibele set aan attributen. Ondertussen ondersteunen veel ABAC-oplossingen ook dynamische/virtuele attributen en worden die ook op organisatie-niveau geharmoniseerd, en is er geen echt verschil meer.

**ReBAC** introduceert autorisatie op basis van relaties: tussen subject en object ligt een relatie die de actie voorstelt. In een voorbeeld: een gebruiker heeft een 'lees'-relatie met een specifiek bestand, en mag daarom het bestand lezen. Deze manier van werken past goed bij rechten verlenen aan bestanden en mappenstructuur. In essentie zijn de relaties een nieuw soort attribuut, en daarmee is ReBAC een uitbreiding op ABAC.

Omdat ABAC, PBAC en ReBAC geen duidelijk onderscheid bieden, kiest FTV voor EAM als paraplu-term. Het advies is om bij het kiezen van een softwareproduct primair te kijken naar de gewenste policies en werkwijzen, en dan een product te kiezen dat daar ondersteuning voor biedt. 

Wel essentieel is het onderscheid met Role Based Access Control (**RBAC**). Dat gaat alleen uit van gebruikers(groepen) en rollen tijdens authenticatie, en schiet daarmee te kort in fijnmazigheid en flexibiliteit als enige oplossing. RBAC heeft vaak een goede plek naast EAM, de twee vullen elkaar goed aan.

{{< /chapter/header >}}

{{< chapter/section title="Standaardisatie" >}}

De principes van EAM en de PxP architectuur geven goede richtlijnen voor implementatie. Om het doelen van uitwisselbaarheid te behalen is echter meer detail nodig. En daarnaast wordt het doel van traceerbaarheid niet geadresseerd door deze principes. In FTV werken we daarom aan een drietal standaarden:

![Schema van de drie FTV-standaarden](methodiek-3-standaarden.png)

1. **AuthZEN**. De wijze waarop de PEP het toegangsverzoek stelt en de wijze waarop de PDP het antwoord geeft. Kern daarvan is een informatiemodel. Er is gekozen voor de AuthZEN standaard als basis.
2. **Register toegangsbeleid**. Dit gaat over de eisen die gesteld worden aan het PAP zodat policies goed opgeslagen en opgehaald worden, inclusief versiebeheer.
3. **Logboek toegangsbeslissingen**. Een logboek waarin genomen toegangsbeslissingen worden bijgehouden.

[Deze standaarden](standaarden) zijn op de volgende pagina verder uitgewerkt.

{{< /chapter/section >}}
