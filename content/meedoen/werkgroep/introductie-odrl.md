---
type: 'chapter'
Title: Introductie ODRL voor register toegangsbeleid
---

{{< chapter/section title="Introductie ODRL voor register toegangsbeleid  (4 maart 2026)" >}}

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Frank Terpstra (Geonovum)
- Jaap Smit (UWV)
- Gideon Zegwaard (FDS)
- Hugo Mostard (Gemeente Den Haag)
- Stas Mironov (Logius)
- Duuk Calor (Vecozo)
- Igor van Haren (Vecozo)
- Nick Boxem (MinI&W) 
- Danny Greefhorst (FDS)
- Guus van der Meer (Vecozo)
- Jos Hezemans (MinJenV)
- René Kint (Zicht op Nederland)
- Marc de Boer (FTV)
- Michiel Trimpe (FTV)

{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}} 

- [Presentatie](/ftv/documents/20260303-Introductie-ODRL.pptx)
- Er is geen opname gemaakt dit keer.


{{< /chapter/section >}}


{{< chapter/section title="Introductie ODRL" >}}

Met dank aan Floris voor zijn aantekeningen nu de opname er niet is.

- ODRL lijkt inderdaad een passende, logische match op het bestaande DCAT voor het het definieren van toegangsbeleid 
- ODRL is niet gemaakt voor het opstellen van technisch uitvoerbaar beleid (hoe), wel voor het opstellen van conceptueel beleid en intentie (wat en waarom)
- In Gent wordt er in de academische wereld gewerkt aan een manier om puur op basis van semantiek wel technisch uitvoerbaar beleid in ODRL te kunnen documenteren. Dit als alternatief voor mappings naar andere conceptuele regelsets zoals Rego. Rens gaat hier artikelen over rondsturen
- De problemen in de presentatie zijn dekkend voor wat we als obstakels zien, maar niet alles is een even groot probleem
  - Er zijn complementaire regelsets die prima het "Hoe" kunnen afdekken, los van wat Rens door gaat sturen
  - Hiërarchie is niet per se een issue op verticale conflicten, de vraag hoe we laterale conflicten aan moeten pakken is prangender. Hiervoor zijn binnen ODRL overigens ook mogelijkheden (wat te prioriteren in geval van conflict).
  - Met refinements is het mogelijk om granulaire modellering uit te voeren, de vraag is vooral hoe ver men daar in moet (willen) gaan
  - De oplossing van punt 4 is deels al gegeven: zoveel mogelijk gebruik maken van de Core Vocabulary, wellicht dat daarmee alles wat wij willen al afgedekt wordt
  - Overzicht van "wat willen we allemaal" is nog niet aanwezig, dit gaan we op use-case basis onderzoeken
  - Punt 5 voelde voor sommigen in de call als een non-issue, aangezien dit buiten scope valt van waar ODRL voor bedoeld is
  - Je hoeft in ODRL het "hoe" niet te beschrijven, alleen "dat je ergens aan moet voldoen"
  - Contracten, config e.a. zijn in die zin prima op te nemen, de exacte vorm daarvan zal in een andere beschrijving opgenomen moeten worden
  - Versionering is mogelijk binnen ODRL, maar dat gaat wel via custom velden
  - Sommige partijen lijken met versie nummers te werken, maar het meeste wordt er met supercession gewerkt; zie voorbeeld:
```
      {
        "uid": "policy-dataset-x-v2",
        "supersedes": "policy-dataset-x-v1"
      }
```

De kanttekening bij al deze punten is dat het allemaal valt of staat bij de mate waarin men/wij een duidelijke en breed gedragen vocabulaire hanteren. Een van de beoogde doelen van ODRL is dat het overdraagbaar moet zijn; als we iedereen te pas en te onpas zijn eigen vocabulaire laten opstellen dan schieten we dat doel voorbij.

De conclusie voor nu is dat we aan de hand van een "klassieke" use case gaan onderzoeken wat het opstellen van beleid middels ODRL ons oplevert, hoeveel werk het kost en in welke mate de bestaande vocabulaire vanuit W3C zelf onze behoeftes hierin kan afdekken.


{{< /chapter/section >}}

{{< chapter/section title="Volgende bijeenkomst" >}}
De volgende bijeenkomst vindt plaats op 18 november. Op de agenda staan: Contracten en BRP policies

{{< /chapter/section >}}
