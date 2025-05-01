---
type: 'chapter'
Title: Scope
---
{{< chapter/section title="" >}}
# Scope
De originele opdracht is vrij breed geformuleerd:

>  **Definieer een standaardmethodiek voor toegangsverlening tot API's**

Om dat beter af te kaderen lichten we een aantal woorden uit de opdracht eruit.
{{< /chapter/section >}}

{{< chapter/section title="Definiëren, niet coderen" >}}
***Definieer*** wil zeggen dat er methodiek wordt voorgesteld, en niet per se gerealiseerd.
Een goede beschrijving van de methode, een breed begrip en draagvlak, en uiteindelijk ook adoptie ervan, dat is het primaire doel.
Er zullen ook tastbare technische resultaten zijn, om aan te tonen dat de methodiek haalbaar, schaalbaar en veilig is.
Daarnaast zal een referentie-implementatie gemaakt worden als educatief instrument en als half-fabricaat.
Het is echter expliciet niet de bedoeling om een softwareproduct op te leveren dat in productie genomen kan worden.
{{< /chapter/section >}}

{{< chapter/section title="Toegangsverlening, niet identificatie of autorisatie" >}}
Door het aspect ***toegangsverlening***, oftewel autorisatie, uit te lichten worden expliciet andere aspecten zoals
identificatie (wie ben jij), authenticatie (bewijs dat) en encryptie (versleutelen als beveiliging tegen afluisteren) buiten beschouwing gelaten.
Vanzelfsprekend zijn dit wel cruciale aspecten, en daarmee voorwaardelijk aan verantwoorde gegevensuitwisseling als geheel, maar vallen buiten deze scope.
{{< /chapter/section >}}

{{< chapter/section title="Tot API's" >}}
De toevoeging ***tot API's*** beperkt het project tot geautomatiseerde gegevensuitwisseling.
Het gaat niet over autorisatie via een niet-digitaal medium en ook niet over interacties tussen mens en computer.

Ook beperkt ***tot API's*** de scope tot uitwisseling waarbij minstens twee door API's verbonden systemen betrokken zijn.
Autorisatie binnen een applicatie of dienst, of die niet via API's verloopt heeft wel een grote overlap in methode en techniek,
maar is niet het doel hier.

Daarnaast richten we ons op overheidsorganisaties. De methodiek en techniek zullen niet altijd specifiek voor de overheid zijn,
maar onze keuzes zullen in lijn moeten zijn met de overheidsrichtlijnen, en we streven naar brede adoptie bij de Nederlandse
overheid.
{{< /chapter/section >}}
