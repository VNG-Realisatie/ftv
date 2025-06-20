---
type: 'chapter'
title: "Regeltalen"
---
{{< chapter/section title="Regeltalen" level="1" >}}
Externalized Authorization Management (EAM) is een methodiek waarbij toegangsbeslissingen buiten de applicatie plaatsvinden. Binnen EAM bestaan verschillende modellen voor toegangscontrole, zoals Attribute-Based Access Control (ABAC), Policy-Based Access Control (PBAC) en Relationship-Based Access Control (ReBAC).
EAM beschrijft dus de manier van werken, maar laat veel ruimte voor eigen invulling. Een van die invullingen is hoe toegangsregels precies worden opgesteld.


Toegangsregels moeten leesbaar en beheersbaar zijn voor mensen en uitvoerbaar voor machines. Daar is een rechtenexpressietaal ([Rights Expression Language](https://en.wikipedia.org/wiki/Rights_Expression_Language) of REL) voor nodig.

De programmatuur, die toegangsbeslissingen kan nemen op basis van de regels, wordt een policy engine of ook wel zero trust engine genoemd. Deze moet passen in de architectuur en infrastructuur van de applicatie of dienst.
{{< /chapter/section >}}

{{< chapter/section title="Een voorkeur voor open source" >}}
De Nederlandse overheid schrijft voor dat zowel [standaarden](https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/open-standaarden/) als [programmatuur](https://opensourcewerken.nl/) zoveel mogelijk open moeten zijn. Dit aspect is meegenomen in een vergelijking van regeltalen en standaarden.

Merk op dat open source nog niet wil zeggen dat de software gratis is. Aan hosting, ondersteuning of geavanceerde functies kunnen kosten verbonden zijn.
{{< /chapter/section >}}

{{< chapter/section title="De regeltalen" >}}
Dit zijn de bekendste talen voor het vastleggen van toegangsregels met bijbehorende open implementaties:

- [XACML](https://en.wikipedia.org/wiki/XACML) was de eerste open source standaard, onder beheer bij OASIS.
  Het beschrijft de algemeen aanvaarde architectuur van een PBAC-oplossing in Policy Enforcement Point (PEP), Policy Decision Point (PDP),Policy Administration Point (PAP) en Policy Information Point (PIP).

  Daarnaast bevat XACML een op XML-gebaseerde regeltaal; met bijna 300 functies is deze heel compleet.
  Regels in XML kennen ook nadelen: het is niet eenvoudig te schrijven en te lezen en de verwerking presteert vaak niet goed. Als alternatief is er [ALFA](https://en.wikipedia.org/wiki/Abbreviated_Language_for_Authorization), een verkorte notatie van XACML, ontwikkeld door Axiomatics en gedoneerd aan OASIS. ALFA is echter nog niet als standaard geaccepteerd en de enige implementatie is die van Axiomatics zelf.

  XACML wordt actief gebruikt, al verliest het terrein aan nieuwere talen en implementaties.

- [Open Digital Rights Language (ODRL)](https://en.wikipedia.org/wiki/ODRL) is een W3C-beheerde standaard, specifiek ontworpen om rechten vast te leggen op digitale media, zoals muziek en film. De notatie is compact,
  er zijn vele implementaties van, waarvan een aantal open source. Daar is het W3C-referentie-model in RDF en OWL de bekendste van.
  De functies zijn vrij specifiek voor mediarechten, maar als ze voldoen aan de behoefte is het een serieuze optie.
  Nadeel is dat er geen optie is om voorwaarden (obligations) te verbinden aan toestemming.

- [Cedar](https://github.com/cedar-policy) is een open source taal die door Amazon wordt beheerd en intensief gebruikt in AWS.
  Het is een compacte notatie en kan geautomatiseerd worden omgezet in JSON voor machineverwerking.

- [Common Expression Language (CEL)](https://github.com/google/cel-spec/blob/master/doc/intro.md) is door Google ontwikkeld als meer generieke taal om relatief eenvoudige expressies te schrijven.
  Meerdere partijen hebben engines gebouwd die CEL lezen.

- [Rego](https://www.openpolicyagent.org/docs/latest/#rego) is een taal die ontwikkeld is door Styra, een commerciële partij, en daarna gedoneerd aan de [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/).
  Rego is speciaal ontworpen om gebruikt te worden in Styra's [Open Policy Agent (OPA)](https://www.openpolicyagent.org/). Rego ligt dichter bij een programmeertaal dan bij specificatie-achtige talen zoals XACML en ODRL, waardoor het maken van tools voor schrijven, lezen en analyseren moeilijker is. Rego is vooral populair bij programmeurs.

Andere talen zoals [EPAL](https://www.w3.org/2003/p3p-ws/pp/ibm3.html) en [Sentinal](https://developer.hashicorp.com/sentinel) zijn niet-open source, en vallen daarom af.
{{< /chapter/section >}}

{{< chapter/section title="Uitwisselbaarheid talen onderling" >}}
Alle regeltalen proberen hetzelfde te doen, maar elk op hun eigen manier. De verschillen zijn vaak historisch gegroeid of
ingegeven door andere visies op bestandsformaten. En de verschillen worden in stand gehouden door commerciële belangen.

Voorlopig is er geen convergentie te zien, aangezien de grote technologiewerelden (Google, Amazon, Microsoft en
CNCF) elk hun eigen oplossing stevig gevestigd hebben en er vanuit die hoek weinig belang is bij standaardisatie.

Tegelijk zijn er wel degelijk grote overeenkomsten en is een overkoepelende taal in theorie goed mogelijk.
{{< /chapter/section >}}
