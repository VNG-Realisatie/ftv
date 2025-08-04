---
type: "chapter"
Title: Linked data
---

{{< chapter/section title="Linked Data" level="1">}}

{{< /chapter/section >}}
{{< chapter/section title="Definitie en adoptie" >}}
Een moderne zienswijze op semantiek van gegevens is het semantische web of [Linked Data](https://en.wikipedia.org/wiki/Linked_data).
Door metadata toe te voegen aan de gegevensbronnen en vervolgens die bronnen aan elkaar te koppelen, ontstaat een grotere
samenhangende set gegevens: een dataset. Er zijn eenduidige standaarden om metadata te specificeren
([RDF](https://en.wikipedia.org/wiki/Resource_Description_Framework)), welke metadata er minimaal moet zijn ([DCAT](https://en.wikipedia.org/wiki/Data_Catalog_Vocabulary)), en voor koppelingen ([URIs](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)). 
Ook voor het doorzoeken van de ontstane dataset zijn standaarden ([GraphQL](https://en.wikipedia.org/wiki/GraphQL)).

De Nederlandse overheid heeft deze methodiek omarmd in haar beleid over [Open Data](https://data.overheid.nl/ondersteuning/open-data/beleid),
en een eigen catalogus [DCAT-DONL](https://docs.datacommunities.nl/data-overheid-nl-documentatie/dcat/dcat-ap-donl). Ook het stelsel van basisregistraties heeft een [overkoepelend datamodel](https://data.overheid.nl/community/group/basisregistraties_10) gedefinieerd.

Deze zienswijze past goed in een federatief stelsel: gegevens worden gemodelleerd en aangeboden als een groter
samenhangend geheel, zonder kennis van de delen te vergen.
{{< /chapter/section >}}
{{< chapter/section title="Orkestratie" >}}
Linked data biedt een oplossing voor het concept orkestratie. Dit is het beantwoorden van een vraag op een hoger 
niveau door meerdere aanroepen naar APIs te bundelen. Bijvoorbeeld de vraag: Hoeveel bedrijven met meer dan vijf medewerkers
zijn gevestigd op een perceel van minder dan 100m2? Hiervoor moeten het handelsregister en de Basisregistratie Adressen en Gebouwen (BAG) geraadpleegd worden. 

Hiervoor kan een nieuwe API, of eigenlijk een nieuwe dienst, gemaakt worden die twee vragen combineert tot één.
Een dienst hoeft met linked data niet vooraf gericht te zijn op specifieke vragen, maar kan vrije vragen beantwoorden
op basis van het datamodel en de zoekmethodes als GraphQL. Zo wordt analyse en onderzoek beter mogelijk.
{{< /chapter/section >}}
{{< chapter/section title="Toegangsverlening en linked data" >}}
Toegangsverlening tot linked data kan ook gaan over toegangsverlening bij orkestratie
in het algemeen.

### Datamodellen voor toegangsregels (policies)
Toegangsregels zullen opgesteld worden volgens een of meerdere standaarden.
Ongeacht de gekozen standaard zullen de regels bestaan uit velden, functies en constanten. 
Neem als voorbeeld de regel 'de leeftijd moet minstens 18 zijn'. 
De functies ('minstens') en constanten ('18') worden door de standaard dan wel implementatie bepaald. 
Het veld ('leeftijd') komt uit het domein waarover de regels gaan. 
In dit voorbeeld is 'leeftijd' een veld dat in een persoonsregistratie bepaald kan worden uit de
geboortedatum en de huidige datum. Welke velden er bestaan wordt in een datamodel beschreven en als metadata bij een bron
beschikbaar gesteld.

In een niet-federatief stelsel worden toegangsregels niet uitgewisseld en is er geen noodzaak om een gedeeld model te
hebben van de velden. In een federatief stelsel worden toegangsregels door beide partijen geautomatiseerd gelezen
en is een gedeeld datamodel noodzakelijk om de betekenis van de velden expliciet te maken.

Hier ligt een kans: door toegangsregels op te stellen met hetzelfde linked data model als de diensten hanteren, 
is er maar één model nodig. Ondersteuning van linked data wordt als pré meegenomen bij de keuze van een taal en implementatie.


Het project [lock/unlock](https://kadaster-labs.github.io/lock-unlock-docs/) zocht eerder uit welke haken en ogen er aan toegang op linked data zitten.
{{< /chapter/section >}}

{{< chapter/section title="Kanttekeningen" >}}
Hoewel linked data een logische weg voorwaarts is in federatieve data, maakt het vooralsnog geen onderdeel uit van het project.
De redenen zijn:

1. Linked data is nog geen gemeengoed in het landschap van het Federatieve Datastelsel (FDS) en het is ook niet zeker dat het overal gaat komen. 
Toegangsverlening zal daarom niet eisen dat gegevensbronnen linked data technieken gebruiken. Dat zou praktisch en
gevoelsmatig de adoptie kunnen vertragen.

2. Het lijkt voor de hand te liggen om hetzelfde model te gebruiken voor de gegevens zelf en voor de toegangsregels op die gegevens, maar dat hoeft niet. Als er op een bestaande koppeling verbeterde toegangsverlening wordt geplaatst met linked data, 
hoeft die de dienst zelf nog niet te veranderen. Zo zijn toegangsverlening en dienst los van elkaar te vernieuwen.
{{< /chapter/section >}}
