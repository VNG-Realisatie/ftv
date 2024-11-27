---
weight: 60
---

# Lock/Unlock

## Links
- https://federatief.datastelsel.nl/kennisbank/lock-unlock/

## Fragmenten
- Het Lock–Unlock project is uitgevoerd door het Kadaster Data Science Team in opdracht van het Federatief Datastelsel, programmaonderdeel van Realisatie IBDS. Binnen het Federatief Datastelsel is het kunnen delen van data uiteraard de kern, maar dit moet ook op een verantwoorde manier gebeuren, waarbij bescherming van data en autorisatie belangrijk zijn.
- Lock-Unlock richt zich op Linked Data omdat dit in de basis bij uitstek geschikt zou moeten zijn voor integrale federatieve bevragingen van data: het doel van FDS. Het project is voortbouwend op [de Integrale Gebruiksoplossing](igo) en de [Kadaster Knowledge Graph](kkg) ontwikkelt door het Kadaster.
- Binnen dit project is onderzocht hoe data afgeschermd kan worden binnen een federatief datastelsel en dan specifiek in Linked Data. Er zijn weinig gestandaardiseerde mogelijkheden voor autorisatie van data in het Linked Data domein. Dit project is uitgevoerd om de (on)mogelijkheden te onderzoeken en te testen.
- Autorisatie oplossingen zouden de volgende afschermingspatronen moeten ondersteunen:
  - verticale subsets: objecten en/of kenmerken en/of relaties zijn afgeschermd, zoals bijv. koopsom of eigenaar.
  - horizontale subsets: delen van de data zijn afgeschermd, waar je wel toegang toe hebt is volledig en dus niet verticaal afgeschermd. Een voorbeeld hiervan is dat je alleen toegang hebt tot de data van een specifieke regio.
  - afscherming relatie-richting: het opvragen van informatie in een bepaalde richting is mogelijk, maar het opvragen van de omgekeerde richting is niet mogelijk. Bijvoorbeeld: het zou mogelijk moeten zijn om te zoeken naar de eigenaar van een specifiek perceel op basis van het perceelnummer, maar niet alle perceelnummers die iemand in eigendom heeft op basis van naam.
  - aggregatie mogelijkheden: het kan zijn dat gebruikers geen toegang hebben tot de micro data maar wel tot aggregaties (onder bepaalde voorwaarden). Denk bijvoorbeeld aan de gemiddelde transactieprijzen van woningen in een bepaald gebied.
  - vrije query mogelijkheiden ondersteunen: de kracht van Linked Data is dat je zonder een vooraf gedefinieerd schema het endpoint kunt bevragen. Die optie wil je blijven behouden.
- Het is mogelijk om fijnmazig autorisatieregels declaratief te modelleren op basis van een autorisatie ontologie voor federatieve bevragingen op basis van Linked Data. We hebben dit aan kunnen tonen in onze demonstrators, waarin we een eerste toepassing van een door ons ontwikkelde autorisatie ontologie hebben uitgewerkt. Hieruit blijkt dat het mogelijk is om een sparql-endpoint op te zetten die alleen informatie teruggeeft waarvoor je de benodigde rechten hebt.
- De autorisatieregels kunnen worden gestandaardiseerd in een autorisatie ontologie. Dat betekent dat een software implementatie van deze ontologie als engine gebruikt kan worden om de data van de autorisatieregels uit te voeren. Doordat een ontologie programmeertaal onafhankelijk is, kunnen er meerdere implementaties gemaakt worden voor de autorisatie ontologie.
- Het afschermen van gegevens zo dicht mogelijk bij de triplestore biedt grotere zekerheid dan afscherming van gegevens door applicaties.
- In dit project hebben we uitgewerkt en beproefd hoe verticale en horizontale subsets afgeschermd of juist ontsloten kunnen worden. We hebben geen aandacht kunnen besteden aan het beperken van de richting. Hier dient extra (vervolg)onderzoek op gedaan te worden.
- Het blijkt echter onmogelijk om volledig van tevoren te kunnen bepalen of de grondslag voldoende is om toegang te kunnen verlenen. Dat heeft te maken met de gedeelde verantwoordelijkheid van die toegang als dat een koppeling tussen twee organisaties betreft. Het punt is dat de doelbinding per casus gebonden is. Het is voor de data-leverende organisatie echter niet mogelijk om te beoordelen of de specifieke casus waar de betreffende gebruiker van de data-vragende organisatie mee bezig is, passend is voor het doel dat beoogd is. Sterker nog, het weten van die specifieke casus gaat juist in tegen de regels van doelbinding, juridische grondslag en AVG. Vooraf specifieke doelbinding controleren is daarom niet (volledig) mogelijk.
- **Autorisatie is de controle en het proces van toegang geven tot een Resource. Het doel van autorisatie is dat alleen vastgestelde toegang verleend wordt aan Subjecten. Dat is een proces van afscherming vóóraf.**

## Observaties
- autorisatie is een complex gegeven; autorisatie moet beschreven worden en uitgevoerd
- autorisatie houdt niet op bij toegang tot een API, maar vereist mogelijk ook filtering op vertikale en horizontale data-befeiliging
- uitvoering van autorisatie kan op vele manieren; voor linked data bv. middels een autorisatie ontology waarbij de toegangsregels in een datamodel zitten en als linked metadata aan een bevraging toegevoegd kunnen worden; voor REST API's is PBAC de modernste oplossing, zodat policies losgekoppeld worden van de code en makkelijker te auditen op juistheid.
