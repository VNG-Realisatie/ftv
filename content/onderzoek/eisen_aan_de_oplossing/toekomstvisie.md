---
type: "chapter"
title: "Toekomstvisie"
---
{{< chapter/section title="De toekomstvisie " >}}

Federatieve Toegangsverlening (FTV) ls een overheidsbreed initiatief en valt onder de Generieke Digitale Infrastructuur (GDI). Twee domeinarchitecturen daarvan zij in het bijzonder relevant, namelijk die van [toegang](https://minbzk.github.io/gdi-toegang/content/views/Domeinarchitectuur%20toegang.html) en van [gegevensuitwisseling](https://minbzk.github.io/gdi-gegevensuitwisseling/content/views/Domeinarchitectuur%20gegevensuitwisseling.html).

Dit zijn de relevante ontwikkelingen rondom toegangsverlening die vanuit de GDI zijn gesignaleerd:
1. **[Contextuele toegangscontrole](https://minbzk.github.io/gdi-toegang/content/elements/id-7f4dc8e8532147a7bcaa8b5846799154.html)**: maak gebruik van gegevens uit de context, zoals locatie, apparaat, tijd etc. om toegangsverlening dynamisch te maken.
2. **[Het zero-trust principe](https://minbzk.github.io/gdi-toegang/content/elements/id-be3e1d7fce8c415190791ff10295f078.html)**: geef niet automatisch volledige toegang na controle aan de buitengrens. Verdeel het systeem in compartimenten en herhaal de toegangscontrole per onderdeel.
3. **[Verklaringen](https://minbzk.github.io/gdi-toegang/content/elements/id-44448c40cae246fb9a87e33446f0c0d4.html)**:
   maak gebruik van verifieerbare  verklaringen in plaats van rollen, waardoor afgifte en gebruik van attributen van elkaar losgekoppeld worden. Beide partijen kennen en erkennen de verklaringen, en kunnen op basis daarvan toegang verlenen. Dit kan de toegangsverlening significant eenvoudiger maken, omdat de dienst en de toegang niet op voorhand elkaar hoeven te kennen.
4. **[Wissel alleen strikt noodzakelijke gegevens uit](https://minbzk.github.io/gdi-toegang/content/views/Domeinarchitectuur%20toegang.html#:~:text=3.%20Partijen%20wisselen%20alleen%20strikt%20noodzakelijke%20gegevens%20uit)**.
   Dit principe heeft een tweetal voor toegangsverlening relevante implicaties:

     - De grondslag en doelbinding van elke uitwisseling moet op voorhand bekend zijn;
     - Per dienst moet bekend zijn welke gegevens noodzakelijk zijn.
   
     Beide punten kunnen zowel door afnemers als aanbieders gecontroleerd worden. Kanttekening hierbij is dat voor bevoegde autoriteiten, zoals opsporing, het wel mogelijk moet zijn pseudoniemen te herleiden naar personen of organisaties.

5. **[Onderzoek automatisering contractering van afnemers](https://minbzk.github.io/gdi-toegang/id-3b66eec68cbc4ed8a552deca4e788391/elements/id-dd07b5c0a2b74ce78e00c000687f637e.html)**.
   Door contractvoorwaarden in toegangsregels (policies) om te zetten kunnen deze geautomatiseerd gecontroleerd worden. Dit is een veranderinitiatief, geen principe. Dat wil zeggen dat het onderzoeken van de mogelijkheid aangemoedigd wordt, maar dat niet gezegd is dat het ook wenselijk is. 

{{< /chapter/section >}}
