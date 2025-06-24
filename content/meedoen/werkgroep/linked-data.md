---
type: 'chapter'
Title: 8. SPARQL, GraphQL en Linked Data
---

{{< chapter/section title="SPARQL, GraphQL en Linked Data (17 juni 2025)" >}}

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV) 
- Maikel Hofman (FTV)
- Igor van Haren (Zorginstituut Nederland) 
- Rens Kievit (MinBZK) 
- Marc de Boer (FTV) 
- Karin Hiralal (FTV) 
- Gideon Zegwaard (FDS) 
- Gerard Juijn (FTV) 
- Danny Greefhorst (ArchiXL) 
- Hugo Mostard (Gemeente Den Haag) 
- Karel Hilberdink (JustID) 
- Guus van der Meer (Vecozo) 
- Remo van Rest (Zorginstituut Nederland) 
- Duuk Calor (Vecozo) 
- Arnoud Quanjer (VNG) 
- Hans Schevers (Kadaster) 
- Stas Mironov (Logius) 
- René Kint (Zicht op Nederland) 
- Marc van Andel (Kadaster) 
- Gerard van der Hoeven (iSHARE)
- Martin van der Plas (Logius) 
- Frank Terpstra (Geonovem)
- Rob Klaver (IDEMIA)
{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking (5m)
- Update subwerkgroepen (5m)
- Presentatie GraphQL door iWlz (20m)
- Presentatie SPARQL door Lock/Unlock (20m)
- Voorstel MIM integratie via JSON-LD (5m)
- Bepaling volgende onderwerp (5m)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}} 
- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20250617-linked-data.mp4)
- [Presentatie "Toegang Netwerkmodel iWlz"]({{< param baseDirectory >}}documents/20250617-toegang-netwerkmodel-iwlz.pptx)
- [Presentatie "Linked Data/SPARQL en het FDS Lock/Unlock project"]({{< param baseDirectory >}}documents/20250617-linked-data-sparql-en-fds-lock-unlock.pdf)
{{< /chapter/section >}}

{{< chapter/section title="Welkom & Kennismaking" >}}
De volgende nieuwe deelnemers introduceren zich:
- Duuk Calor als Product Owner van NID.
- Hugo Mostard van het Urban Platform van gemeente Den Haag.
- Karel Hilberdink als Product Manager van Federatieve Service bij JustID.
{{< /chapter/section >}}

{{< chapter/section title="Updates van subwerkgroepen" >}}
- **Decision Log (voorheen Logboek Toegangsbeslissingen)**:    
    - De naam van de werkgroep en standaard is gewijzigd naar het Engelse "Decision Log". 
    - De werkgroep zal elke twee weken bijeenkomen. 
    - Het hoofddoel is het uniform vastleggen van toegangsbeslissingen voor verantwoording binnen organisaties en de overheid, met "replayability" als een belangrijk onderdeel. 
    - Er werd een vraag gesteld aan de bredere werkgroep over de scope: moet deze beperkt blijven tot Nederland of internationaal worden getrokken?
    - **Beslissing**: We ontwikkelen de standaard met de intentie om deze aan te bieden bij de AuthZEN werkgroep. 
- **Juridisch Kader**: *Marc de Boer* meldt dat de notulen van de vorige bijeenkomst zijn uitgewerkt en goedgekeurd. Een volgende bijeenkomst moet nog gepland worden. 
- **AuthZEN**: *Michiel Trimpe* geeft aan dat er afstemming is geweest met Stas Mironov (Logius) over het formaat van het NL Gov-profiel.  Er zal een kopie van de standaard worden gemaakt met aanpassingen, waarbij een delta gegenereerd kan worden om de verschillen met de originele standaard inzichtelijk te maken. 
{{< /chapter/section >}}

{{< chapter/section title="Presentatie GraphQL en Toegangsverlening in de iWlz" >}}
Remo van Rest en Guus van der Meer gaven een [presentatie]({{< param baseDirectory >}}documents/20250617-toegang-netwerkmodel-iwlz.pptx) over de toepassing van toegangsverlening binnen het iWlz netwerkmodel. 

- *Martin van der Plas* deelt een [link](https://github.com/Logius-standaarden/Overleg/tree/main/Digikoppeling/2025-03-19/concepten) naar de positionering van GraphQL in het Technisch Overleg Digikoppeling.

- *Michiel Trimpe* geeft aan dat de implementatie van AuthZEN in het iWlz netwerkmodel neerkomt op het opstellen van een GraphQL profiel voor AuthZEN. Michiel zal met de OpenID AuthZEN werkgroep afstemmen om dit ook aan hen aan te bieden zodat dit daar ook opgenomen kan worden.

- *Gerard Juijn* vraagt of de PDP het GraphQL verzoek inderdaad aanpast. 

  *Guus van der Meer* laat weten dat het verzoek niet aangepast wordt maar nooit bij de GraphQL server terecht komt als het afgewezen wordt.

- *René Kint* geeft aan een patroon van rollen en 'masks' te zien in deze verzoeken. Hij vraagt of het patroon nog eenvoudiger gemaakt kan worden op basis van rollen. 

  *Guus van der Meer* geeft aan dat het beide speelt. Er is soms sprake van role-based access control, maar er zijn ook attribute-based policies zoals verzoeken die alleen gedurende bepaalde tijd toegestaan zijn.

  *Igor van Haren*: Het liefst gebruiken we role based access omdat dat de policies heel simpel houdt, maar de grondslagen in de zorg zijn heel complex en daarmee dus ook de policies.

  *Michiel Trimpe* benadrukt nog dat bij iWlz ook het onderscheid tussen technische en logische policies gemaakt wordt. Dit maakt het mogelijk om technische policies aan te passen en te versimpelen.

  *Igor van Haren* laat weten dat het een bestaande complexe keten moet faciliteren. Wanneer de hele keten herontworpen zou kunnen worden zouden de policies ook simpeler kunnen worden.

  *Gideon Zegwaard* vraagt of er gebruik wordt gemaakt van geparametriseerde queries. 

  *Igor van Haren* laat weten dat hier inderdaad al mee gewerkt wordt om policies te versimpelen.

- *Michiel Trimpe* geeft nog aan dat vanuit AuthZEN gezien het een interessante vraag is wat bij GraphQL als het `resource` gezien kan worden.
  
  *Igor van Haren* geeft aan dat een deel van de query de resource is. Hier is intern al over gebrainstormd en stemt dat graag nog in breder verband af. Scope en audience geven ook vaak wat aan over een resource.

{{< /chapter/section >}}

{{< chapter/section title="Presentatie SPARQL en het FDS Lock/Unlock project" >}}
Hans Schevers gaf een [presentatie]({{< param baseDirectory >}}documents/20250617-linked-data-sparql-en-fds-lock-unlock.pdf) over federatieve toegangsverlening voor Linked Data/SPARQL binnen het Kadaster, gebaseerd op het Lock/Unlock project. 

- *René Kint* geeft aan te twijfelen of we niet te veel in AuthZEN willen verwerken wat ook met patronen opgelost kan worden. Als voorbeeld noemt hij een medewerker van Almere die gegevens opvraagt van gemeente Zwolle.

  *Martin van der Plas* geeft aan dat je vanuit OAuth gezien zou verwachten dat de gemeente een Authorization Server heeft en een authorization token meegeeft conform OAuth bij het API verzoek.

  *Igor van Haren* legt uit dat het feit dat iemand een medewerker is van de gemeente in het verzoek mee komt als claim. Die claims komen aan bij de PEP en die maakt deze middels AuthZEN beschikbaar aan de PDP. De PDP controleert dan of je medewerker bent bij de gemeente waarvoor je gegevens opvraagt.

  *Michiel Trimpe* geeft aan dat er een verwarring van terminologie lijkt te zijn. Gezien de tijdsplanning stelt Michiel voor hier een aparte meeting voor in te plannen. 

  *Gerard van der Hoeven* bevestigt in de chat de feedback van René en vraagt ook om een deepdive wat betreft lagen en termen.

- *Igor van Haren* geeft aan dat de uitdaging voor GraphQL bij iWlz erg lijkt op de uitdagingen bij Lock/Unlock.
{{< /chapter/section >}}

{{< chapter/section title="Voorstel MIM integratie via JSON-LD" >}}
Michiel Trimpe deelt een [voorbeeld](https://json-ld.org/playground/#startTab=tab-expanded&json-ld=%7B%22%40context%22%3A%22https%3A%2F%2Fgist.githubusercontent.com%2Fmtrimpe%2Ffa133e853b3a4166ecc22ea9143f6143%2Fraw%2Ff80107660d47ff7e0cdea5a35da0b91da7996c7c%2Fgistfile1.txt%22%2C%22id%22%3A%220987654321%22%2C%22type%22%3A%22brp.nl%3Ainwoner%22%2C%22properties%22%3A%7B%22firstParent%22%3A%221234567890%22%2C%22secondParent%22%3A%222345678901%22%2C%22gdpr_action%22%3A%22remove%22%7D%7D&context=https%3A%2F%2Fgist.githubusercontent.com%2Fmtrimpe%2Ffa133e853b3a4166ecc22ea9143f6143%2Fraw%2Ff80107660d47ff7e0cdea5a35da0b91da7996c7c%2Fgistfile1.txt) van hoe JSON-LD gebruikt kan worden om met minimale verandering een standaard AuthZEN-verzoek te verrijken met semantische betekenis en te koppelen aan Linked Data-ontologieën zoals het Meta Informatiemodel van de organisatie. 

- *Michiel Trimpe* stelt voor dit als 'recommended' op te nemen in het NLGov AuthZEN profiel. Naast de vereiste dat ID's dan een dubbele punt moeten kunnen bevatten heeft dit minimale impact.

  *Gideon Zegwaard* en *Marc van Andel* geven aan voor het voorstel te zijn.

- *Rens Kievit* vraagt of dit ook helpt bij het serializeren van SPARQL queries.

  *Michiel Trimpe* geeft aan dat dit niet zo is. De SPARQL query zal nog steeds in de `action` opgenomen moeten worden en als JSON geserialiseerd. 

- *Hans Schevers* geeft aan dat de context steeds anders zal zijn en dat je daarmee dus een vraag creëert naar standaardisatie van de modellen en URI's die je gebruikt. Je hebt het dus eigenlijk over het hele bericht naar Linked Data brengen.

  *Michiel Trimpe* bevestigt dat dit inderdaad de verwachting is. Het zal wel een 'SHOULD' in de standaard zijn en niet een 'MUST'.

  *Gideon Zegwaard* raadt wel aan om een generieke AuthZEN JSON-LD context te maken voor de algemene AuthZEN structuur.
{{< /chapter/section >}}

{{< chapter/section title="Planning volgende werkgroepen" >}}
Vanwege de tijd werd besloten om via de chat een peiling te doen voor de onderwerpen voor de komende sessies. Zie onderstaande tabel voor de resultaten: 

| Onderwerp                                                              | Stemmen |
| ---------------------------------------------------------------------- | ------- |
| Informatiemodel van Subject                                            | 6       | 
| Relatie met contracten (BRP autorisaties, FSC contracten, etc.)        | 5       |
| Partial Evaluation & Residual Policy                                   | 5       | 
| Relatie met Nederlandse architectuur (GDI, GEMMA, NORA, API strategie) | 4       | 
| Relatie met Data Spaces en JTC-25                                      | 4       |
{{< /chapter/section >}}
