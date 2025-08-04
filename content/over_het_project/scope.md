---
type: 'chapter'
Title: Scope
---
{{< chapter/header title="Over het project" bg="yellow">}}
<div class="sub-navigation-wrapper">
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-geel-50">
   <p>
      <a href="../opdracht">Opdracht</a> 
   </p>
</div>
<div class="sub-navigation-tab-selected utrecht-paragraph pt-1 sub-navigation-tab">
   <p>
      <a href="../scope">Scope</a>
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-geel-50">
   <p>
      <a href="../fase1">Fase 1</a> 
   </p>
</div>
<div class="utrecht-paragraph pt-1 sub-navigation-tab bg-rhc-color-geel-50">
   <p>
      <a href="../fase2">Fase 2</a>
   </p>
</div>
</div>
{{< /chapter/header >}}

{{< chapter/section title="Scope" >}}
De originele opdracht is breed geformuleerd:

>  **Definieer een standaardmethodiek voor toegangsverlening tot APIs.**

Voor een scherpere afbakening van de opdracht volgt een toelichting op enkele gebruikte begrippen.
{{< /chapter/section >}}

{{< chapter/section title="Definiëren, niet coderen" level="3">}}
***Definieer*** wil zeggen dat er een methodiek wordt voorgesteld en niet per se gerealiseerd.
Het primaire doel is een goede beschrijving van de methode, een breed begrip, draagvlak en uiteindelijk ook adoptie ervan.
Er zullen ook tastbare technische resultaten zijn om aan te tonen dat de methodiek haalbaar, schaalbaar en veilig is.
Daarnaast wordt een referentie-implementatie ontwikkeld als educatief instrument en als halffabricaat.
Het is echter expliciet niet de bedoeling om een softwareproduct op te leveren dat in productie genomen kan worden.
{{< /chapter/section >}}

{{< chapter/section title="Toegangsverlening, niet identificatie of autorisatie" level="3">}}
Door het aspect ***toegangsverlening***, oftewel autorisatie, uit te lichten worden expliciet andere aspecten zoals
identificatie (wie ben jij), authenticatie (bewijs dat) en encryptie (versleutelen als beveiliging tegen afluisteren) buiten beschouwing gelaten.
Vanzelfsprekend zijn dit wel cruciale aspecten. Ze zijn voorwaardelijk aan verantwoorde gegevensuitwisseling als geheel, maar vallen buiten deze scope.
{{< /chapter/section >}}

{{< chapter/section title="Tot APIs"  level="3">}}
De toevoeging ***tot APIs*** beperkt het project tot geautomatiseerde gegevensuitwisseling.
Het gaat niet over autorisatie via een niet-digitaal medium en ook niet over interacties tussen mens en computer.

Deze toevoeging ***tot APIs*** beperkt de scope ook tot uitwisseling waarbij minstens twee door APIs verbonden systemen betrokken zijn.
Autorisatie binnen een applicatie of dienst, of die niet via APIs verloopt, heeft wel een grote overlap in methode en techniek,
maar is niet het doel hier.

De focus ligt op ***overheidsorganisaties***. Hoewel de methodiek en techniek niet uitsluitend voor de overheid zijn ontwikkeld, moeten de keuzes aansluiten bij geldende overheidsrichtlijnen.
Het streven is brede adoptie binnen de Nederlandse overheid.

{{< /chapter/section >}}
