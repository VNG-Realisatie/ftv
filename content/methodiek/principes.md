---
type: 'chapter'
title: "De principes van EAM"
---

{{< chapter/header title="Methodiek" bg="green">}}

<div class="sub-navigation-wrapper">
<div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      De principes
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-groen-25">
   <p>
      <a href="../authzen-nlgov">AuthZEN</a>
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-groen-25">
   <p>
      <a href="../logboek-toegangsbeslissingen">Logboek</a>
   </p>
</div> 
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-groen-25">
   <p>
      <a href="../register-toegangsbeleid">Register toegangsbeleid</a>
   </p>
</div> 
</div>

{{< /chapter/header >}}

{{< chapter/section title="De principes van EAM">}}

Federatieve Toegangsverlening (FTV) maakt gebruik van Externalized Authorization Management (EAM). Dit is een methode waarbij toegangsverzoeken, -beslissingen en -beleid buiten applicaties worden beheerd. Toegang wordt bepaald op basis van duidelijke regels, actuele informatie en de situatie waarin toegang wordt gevraagd. Deze aanpak maakt toegangsverlening schaalbaar, flexibel, traceerbaar en leveranciersonafhankelijk.

**EAM in het kort**

Een overzicht van EAM in 2:30.

<video width="640" height="480" controls>
  <source src="https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/content/methodiek/methodiek-slidecast.mp4" type="video/mp4">
</video>

<a href="methodiek-slidecast-transcript.txt" download>Transcript downloaden</a>

{{< /chapter/header >}}

{{< chapter/section title="Separation of concerns" level="3">}}

![Drie iconen van die concerns](../methodiek_soc.png)

De kern van EAM is het scheiden van verantwoordelijkheden (separation of concerns). Regels staan los van de applicatiecode in zogenoemde policies. En het beheer van de policies is gescheiden van het handhaven ervan.

{{< /chapter/header >}}

{{< chapter/section title="De drie kenmerken" level="3">}}

![Drie iconen van drie kenmerken](../methodiek-3-kenmerken.png)

De drie belangrijkste kenmerken van EAM zijn:

1. **Fijnmazige** toegangscontrole.
Er zijn drie niveaus van toegangscontrole:

     - Grofmazige toegangscontrole vindt plaats tijdens login en gebruikt informatie over de gebruiker en de te gebruiken diensten om te bepalen welke toegang mogelijk is.  Het bekendste mechanisme hiervoor is OAuth met zogenoemde scopes.
     - Middelmazige toegangscontrole filtert toegang tijdens het aanroepen van een API op basis van de gebruiker, gevraagde API en gevraagde verwerking. OpenAPI routes zijn hiervoor een bekende standaard.
     - Fijnmazige toegangscontrole maakt gebruik van nog meer kenmerken, waaronder de context van het verzoek. Voorbeelden zijn datum en tijd, de beveiliging van de verbinding en het IP-adres van de gebruiker. Ook situatiespecifieke gegevens (attributen) en berekeningen kunnen meetellen. In de overheidscontext spelen bijvoorbeeld doelbinding en de juridische grondslag een belangrijke rol.

3. **Policy as code**.
De policies worden beheerd met dezelfde zorgvuldigheid als broncode. Er wordt versiebeheer gebruikt, zodat de historie inzichtelijk is en eerdere versies eenvoudig teruggezet kunnen worden. Een duidelijke workflow verdeelt de taken zoals schrijven, controleren en vrijgeven van policies. Ook is er toegangscontrole op de policies zelf.

3. **Realtime**.
Policies worden niet alleen tijdens login uitgevoerd, maar op elk moment wanneer toegang gevraagd wordt (zero trust) en op elke plek in de keten waar toegang gevraagd wordt (defense in depth).

{{< /chapter/header >}}

{{< chapter/section title="Lokale handhaving, centraal beheer" level="3">}}

In een architectuurplaat zijn de gescheiden verantwoordelijkheden goed zichtbaar.

![Een diagram van toegang in een gedistribueerd systeem](/ftv/diagrams/methodiek-gedistribueerd.svg)

In dit voorbeeld zien we links een gegevensuitwisseling. Een client haalt een token op bij de Identity Provider en benadert via de API-Gateway twee applicaties. Toegangscontrole vindt plaats op elke plek in het systeem. In de client, in de identity provider, de gateway en nogmaals in elk van de applicaties. Op elke plek worden alleen de toegangsregels geëvalueerd die daar van toepassing zijn.

Rechts zien we het beheer en de opslag van de policies, centraal. Policies worden daar opgesteld, gecontroleerd en voorzien van versiebeheer. Zodra een wijziging van kracht moet zijn, gaat de juiste versie van de policy automatisch naar de plekken waar deze gehandhaafd moet worden.

De verantwoordelijkheden die onder handhaving en beheer vallen zijn verder uitgewerkt in de [functionele beschrijving](/ftv/toepassen/functioneel).

{{< /chapter/section >}}

{{< chapter/section title="De PxP-architectuur" id="pxp">}}

De verantwoordelijkheden binnen toegangsverlening zijn ruim twintig jaar geleden al uitgewerkt in de XACML-standaard voor autorisatie. Deze standaard introduceerde onder andere een policytaal gebaseerd op XML. Hoewel XML inmiddels minder vaak wordt gebruikt, zijn de onderliggende principes nog steeds relevant. Ze vormen de basis van de PxP-architectuur, waarin verantwoordelijkheden helder van elkaar zijn gescheiden.

![Diagram van de PxP-architectuur](/ftv/diagrams/methodiek-pxp.svg)

De flow van informatie volgt de nummers op de afbeelding:

1. Het Policy Enforcement Point (**PEP**) onderschept een verwerkingsverzoek en handhaaft (enforces) daarmee de toegang op de verwerking 
2. Het PEP stuurt een verzoek aan het Policy Decision Point (**PDP**) om een beslissing te nemen.
3. Het Policy Administration Point (**PAP**) voorziet het PDP van de policies.
4. Het Policy Information Point (**PIP**) haalt additionele informatie op wanneer dat nodig is voor het maken van de toegangsbeslissing.
5. Het PDP stuurt de genomen beslissing naar het PEP.
6. Als de beslissing positief is, gaat het verzoek door naar de verwerking. Het PEP voert de beslissing van het PDP uit. Als toegang is toegestaan, wordt het verzoek doorgestuurd voor verwerking.

De aanvrager ontvangt het antwoord: dit is óf de gewenste verwerking óf een melding dat toegang is geweigerd.
{{< /chapter/section >}}

{{< chapter/section title="EAM als paraplu voor moderne toegangsmodellen" level="3">}}

EAM is een verzamelnaam voor moderne methoden van toegangscontrole, zoals:
- Policy Based Access Control (PBAC)
- Attribute Based Access Control (ABAC)
- Relationship Based Access Control (ReBAC)

**ABAC** en **PBAC** zijn in essentie hetzelfde. ABAC gaat uit van een vaste set kenmerken (attributen) die bepalen of toegang wordt verleend. PBAC legt de nadruk op organisatiebrede regels (policies) die lokaal vertaald worden naar een flexibele set attributen. In de praktijk zijn de verschillen vervaagd.

**ReBAC** introduceert autorisatie op basis van relaties: tussen subject en object ligt een relatie die de actie voorstelt. Bijvoorbeeld: een gebruiker heeft een ’lees’-relatie met een specifiek bestand en mag daarom het bestand lezen. Deze manier van werken past goed bij rechten verlenen aan bestanden en mappenstructuur. In essentie zijn de relaties een nieuw soort attribuut waardoor ReBAC een uitbreiding is op ABAC.

Omdat de verschillen tussen ABAC, PBAC en ReBAC in de praktijk klein zijn, gebruikt FTV de overkoepelende term EAM. Bij het kiezen van software is het belangrijk om te kijken naar de gewenste policies en werkwijzen en dan een product te kiezen dat daar ondersteuning voor biedt.

Wel essentieel is het onderscheid met Role Based Access Control (RBAC). Dat gaat alleen uit van gebruikers(groepen) en rollen tijdens authenticatie en schiet daarmee te kort in fijnmazigheid en flexibiliteit als enige oplossing. RBAC heeft vaak een goede plek naast EAM. Ze vullen elkaar goed aan.

{{< /chapter/header >}}

{{< chapter/section title="Standaardisatie" >}}

De principes van Externalized Authorization Management (EAM) en de PxP-architectuur bieden een goede basis voor de implementatie. Maar om systemen goed met elkaar te laten samenwerken, zijn meer details nodig. Ook het aspect van traceerbaarheid wordt in EAM en de PxP-architectuur niet geadresseerd. Daarom ontwikkelt FTV drie standaarden:

![Schema van de drie FTV-standaarden](/ftv/diagrams/methodiek-pxp-standaardisatie.svg)

1. **[AuthZEN](../authzen-nlgov)**. Deze standaard omschrijft hoe een toegangsverzoek via de PEP wordt gedaan en hoe het antwoord van de PDP wordt teruggegeven. FTV gebruikt de AuthZEN-standaard als basis.
2. **[Logboek toegangsbeslissingen](../logboek-toegangsbeslissingen)**. Een standaard voor het bijhouden van genomen toegangsbeslissingen.
3. **[Register toegangsbeleid](../register-toegangsbeleid)**. Deze standaard beschrijft de eisen die gesteld worden aan de PAP zodat policies goed opgeslagen en opgehaald worden, inclusief versiebeheer.

{{< /chapter/section >}}

{{< chapter/nextprevious  bg="bg-rhc-color-groen-25" nextlink="../authzen-nlgov" nexttitle="AuthZEN">}}
{{< /chapter/nextprevious >}}
