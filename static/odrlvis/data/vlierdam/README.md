# Gemeente Vlierdam — het laadpalenbeleid als ODRL

**Gemeente Vlierdam is fictief.** Het is de demonstratiecasus van
[OpenFTV](https://vng-realisatie.github.io/ftv/): een gemeente wil laadpalen
plaatsen bij bewoners met een elektrische auto, en moet daarvoor de BRP (RvIG)
en de BRV (RDW) bevragen. OpenFTV draagt in die casus het technisch
uitvoerbare beleid — Cedar-bundles per PDP. Dit voorbeeld laat zien welke rol
ODRL(-AP-NL) daarnáást kan spelen: hetzelfde beleid publiceren als **leesbare,
juridisch geformuleerde laag**, en per regel verwijzen naar het OpenFTV-beleid
dat hem hoort uit te voeren. Het beleid staat hier als **vijf `odrl:Set`s** —
drie AuthZEN-beslispunten (PDP's), de laadpalenapplicatie zelf (intern, in de
stack geen beslispunt) en één Set *boven* de beslispunten met de
koppelvlakvoorwaarden van het OpenFTV-afsprakenstelsel — zonder
Offer/Agreement-structuur. Wat
dit voorbeeld nadrukkelijk *niet* doet, is ODRL computeerbaar maken: ODRL heeft
geen evaluatiesemantiek, de evaluatie hoort bij Cedar of Rego.

## Bestanden

| Bestand | Wat het is |
|---|---|
| [`vocabulaire.ttl`](vocabulaire.ttl) | Domeinontologie: left operands, twee profiel-operatoren, partijen, begrippen en targets — elk met NL+EN label en `skos:definition`. |
| [`velden.ttl`](velden.ttl) | De toegestane BRP- en BRV-velden als `odrl:AssetCollection` met leden via `odrl:partOf` (dataminimalisatie als target). |
| [`beleid.ttl`](beleid.ttl) | De vijf Sets: vier beslissings-Sets met samen vijf permissions (elk met `assigner`, `dct:source` en een benoemd `conformsToPolicy`-**anker**) plus `set-openftv-koppelvlak` met één stelselverplichting. De ankers dragen de realisatielinks (`prov:wasDerivedFrom`). |
| [`openftv.ttl`](openftv.ttl) | De artefactlaag: drie Cedar-bundles (één per PDP) plus één Rego-module (de laadpalenapplicatie) — hier 1-op-1 op de Sets. Puur beschrijvend: naam, bron, formaat, entrypoint, hash en eerlijkheidsnoot. |
| [`context.jsonld`](context.jsonld) | JSON-LD-context die een AuthZEN-request op de IRI's uit `vocabulaire.ttl` mapt. |
| [`request-beth.jsonld`](request-beth.jsonld) | Voorbeeldverzoek: Beth (Burgerzaken) bevraagt de BRP met postcode/huisnummer voor de doelbinding. |
| [`glo-vocabulaire.ttl`](glo-vocabulaire.ttl) | Het **generieke, casusneutrale vocabulaire** van de gegevensleveringsovereenkomst: klassen, properties en zes waardelijsten onder `https://gegevensdeling.example/def/`. Alleen wat ODRL, DCAT, DPROD, DDI-CDI, DPV, ORG en SKOS niet dragen. |
| [`vlierdam-glo.ttl`](vlierdam-glo.ttl) | De **gegevensleveringsovereenkomst** onder de bestaande BRP-levering, met de specificatie eronder tot op veldniveau. Zie [De gegevensleveringsovereenkomst](#de-gegevensleveringsovereenkomst). De kop van het bestand draagt de **mappingtabel**: welke IRI's uit `beleid.ttl` en `velden.ttl` hergebruikt worden en in welke rol. |
| [`glo-shapes.ttl`](glo-shapes.ttl) | De formulier-shapes bij de klassen van `glo-vocabulaire.ttl` — zonder die shapes staan de knopen er wel, maar zonder veldkoppen en zonder vouwen. Apart bestand, zodat het beleidscorpus zonder GLO-lading er geen last van heeft. |
| [`vlierdam-glo-brv.ttl`](vlierdam-glo-brv.ttl) | De tweede gegevensleveringsovereenkomst: de **push**-levering van technische voertuigkenmerken door de RDW (BRV) aan de gemeente, voor de inventarisatie van de benodigde laadcapaciteit. Volle GLO-stapel — rollen, grondslagen, doelen als verwerkingsregister-vermeldingen, geldigheid, status — met een gegevensleveringsspecificatie tot op veldniveau (tien gegevenstypen). De levering bevat **geen BSN en geen kenteken**: de koppeling kenteken–houder–verblijfsobject ligt bij de bron, en dat staat als verbod, als technische borging én in de veldenlijst. |
| [`glo-brv-shapes.ttl`](glo-brv-shapes.ttl) | Twee aanvullende formulier-shapes bij de BRV-overeenkomst — eenheidstype en logisch record — voor de twee klassen die `glo-shapes.ttl` niet dekt. |
| [`vlierdam-mim-bronmodel.ttl`](vlierdam-mim-bronmodel.ttl) | De MIM-instantiegraaf van de BRP-bevraging: één objecttype met de zeven velden als attribuutsoorten (naam, definitie, type, kardinaliteit, lengte, patroon als platte Nederlandstalige properties), plus het administratiemodel van de overeenkomst zelf. |
| [`vlierdam-mim-extensie.ttl`](vlierdam-mim-extensie.ttl) | Een minimale MIM-extensie met twee metagegevens op de attribuutsoort: de noodzaak per veld en de classificatie. Hiermee staat de noodzaak voor het eerst op een eigen term in plaats van in een `skos:scopeNote`. |
| [`vlierdam-mim-afleiding.ttl`](vlierdam-mim-afleiding.ttl) | Per element van de structuurlaag een `prov:wasDerivedFrom` naar zijn MIM-tegenhanger — én de aanhechting (`dct:conformsTo`) die de MIM-graaf in de viewer bereikbaar maakt. Voor de vier andere lagen staat er niets, en dát ontbreken is het punt: sectie 3 noemt elke ontbrekende knoop bij naam. |
| [`glo-mim-shapes.ttl`](glo-mim-shapes.ttl) | De formulier-shapes voor de MIM-laag — elf `sh:NodeShape`s, één per gebruikte MIM-klasse, in dezelfde SHACL/DASH-conventies en dezelfde acht kopgroepen als `glo-shapes.ttl`. Plus de Nederlandse en Engelse labels van de 99 gebruikte `mim:`-termen, want de MIM-namespace dereferenceert niet en de labels moeten dus met de data meereizen. |
| [`hardening-beleid.ttl`](hardening-beleid.ttl) | Het **hardeningsvoorbeeld**: een tweede soort beleid naast het gegevensdelingsbeleid. Eén Set met een HSTS-plicht op de drie OpenFTV-koppelvlakken (settings als refinement) en een verbod op poort 22 voor de pods van de laadpalenapplicatie, plus de uitzondering daarop met een **verifieerbaar bewijsstuk** — uitgever, kenmerk, doelwit en geldigheidsvenster. De ankers wijzen naar de OSCAL-laag; hun linkerkant is `vlierdam:waargenomenToestand` en niet `apnl:verwerkingsverzoek`, want een configuratienorm heeft geen verzoek. Voorbeeld bij de prior-artverkenning naar technische beveiligingspolicies — geen onderdeel van ODRL-AP-NL en geen voorstel daartoe. |
| [`oscal/component-definition-hardening.json`](oscal/component-definition-hardening.json) | **De norm als data**: een NIST OSCAL component-definition (schema v1.1.3, gevalideerd) met de Compliance-to-Policy-conventies — één component, twee `Rule_Id`/`Rule_Description`, twee `Check_Id`/`Check_Description` die naar **fictieve OpenKAT-boefjes** wijzen, en twee afstelbare parameters. Geen Rego en geen CEL: de check staat er als verwijzing. |
| [`hardening-shapes.ttl`](hardening-shapes.ttl) | De formulier-shapes bij de **niet-ODRL-knopen** van het hardeningsvoorbeeld: het OSCAL-artefact, het bewijsstuk, het koppelvlak, de pod en de doelwitverzameling. De ODRL-regels zelf toont de viewer natief; zonder dit bestand staan die vijf knopen er als kaal label (gemeten: 0 knoopvouwen tegen 9, en 6 artefactrijen tegen 10). |

## Vijf Sets: drie beslispunten, de applicatie zelf, en het stelsel erboven

Een beleidstabel zoals een team hem opschrijft — één rij per beleidsregel —
kent OpenFTV niet. Wat OpenFTV wél draait is de infrastructuur: de Kong-plugin
`openftv` stuurt per route een AuthZEN-request naar
`http://<org>-pdp1:8443/authzen/v1/evaluation`, en een PIP vult dat verzoek aan
met de IAM-gegevens van de `medewerker` (`afdeling`, `laadpaal-opleiding`) en
met `activiteit` en `doelbinding` uit het RvVA. De Cedar-bundles áchter die
beslispunten zijn op 25 augustus 2026 nog permit-everything. De enige
granulariteit die de stack dus echt heeft, is **één AuthZEN-beslispunt per
PDP**: de Vlierdam-outway, de RvIG-inway (BRP) en de RDW-inway (BRV). Drie van
de vier Sets zijn daarop gesneden: elke Set beantwoordt de vraag "wat hoort
deze PDP te beslissen als er een AuthZEN-request binnenkomt?".

De vierde Set staat er los van, en dat is een bewuste keuze. De
**laadpalenapplicatie is een interne applicatie van Vlierdam**. De outway
beslist alleen over *uitgaande* bevragingen — het verkeer naar RvIG en RDW —
en heeft over het gebruik van de applicatie zelf niets te zeggen. Wie de
applicatie mag openen is een eigen beslissing van Vlierdam, en die beslissing
heeft in de OpenFTV-stack **geen beslispunt**: geen Kong-route, geen
AuthZEN-request, geen PDP. Ze in `set-vlierdam-outway` proppen zou de outway
iets laten beslissen wat hij niet beslist. Daarom een eigen Set — en daarom
wijst haar dekking niet naar een Cedar-bundle maar naar de `access.rego` van de
applicatie, het enige artefact dat deze regel werkelijk uitvoert.

De vijfde Set staat er niet naast maar **boven**: `set-openftv-koppelvlak`
draagt de verplichting die het afsprakenstelsel aan elk koppelvlak
stelt, en de twee inway-Sets nemen haar over met `odrl:inheritFrom`. Zie
[Verplichtingen van hoger niveau](#verplichtingen-van-hoger-niveau).

| Set | Waar het over gaat | Assigner | Regels | Uitgevoerd door |
|---|---|---|---|---|
| `set-openftv-koppelvlak` | de koppelvlakvoorwaarde van het stelsel (geen PDP) | OpenFTV-afsprakenstelsel | `plicht-traceparent` (1 obligation) | de bundles van de Sets die haar overnemen |
| `set-laadpalenapplicatie` | de interne applicatie (geen PDP) | Gemeente Vlierdam | `regel-app-gebruik` (1 permission) | `beleid-laadpalen-frontend` (Rego) |
| `set-vlierdam-outway` | outway Gemeente Vlierdam | Gemeente Vlierdam | `regel-outway-brp`, `regel-outway-brv` (2 permissions) + `plicht-doelbinding` (eigen) | `bundle-vlierdam-pdp1` |
| `set-rvig-inway` | inway RvIG (BRP) | RvIG | `regel-inway-brp` (1 permission) | `bundle-rvig-pdp1` |
| `set-rdw-inway` | inway RDW (BRV) | RDW | `regel-inway-brv` (1 permission) | `bundle-rdw-pdp1` |

De `dct:description` van elke Set is bewust burgertaal — wat mag er, en onder
welke voorwaarden, zonder jargon:

> **Laadpalenapplicatie.** Alleen medewerkers van Burgerzaken die in het
> afgelopen jaar de laadpaalopleiding hebben gevolgd, mogen tijdens werktijd de
> laadpalenapplicatie gebruiken.

> **Vlierdam-outway.** Voor de registratie van laadpalen mag Gemeente Vlierdam
> van iemand het burgerservicenummer opzoeken bij de bevolkingsregistratie, en
> daarmee de kentekens en uitstootklasse van diens auto's opvragen. Auto's met
> een diplomatiek kenteken blijven daarbij buiten beeld, tenzij de
> gemeentesecretaris zelf de vraag stelt.

> **RvIG-inway.** Gemeente Vlierdam mag in de bevolkingsregistratie gegevens
> opvragen van mensen die in Vlierdam wonen, en alleen de gegevens die voor een
> laadpaal nodig zijn. Zoeken mag op postcode met huisnummer of op
> burgerservicenummer, en niet op iets anders.

> **RDW-inway.** Gemeente Vlierdam mag van de auto's van iemand het kenteken en
> de uitstootklasse opvragen, op basis van het burgerservicenummer.

De losse beleidsvoorwaarden zijn bij deze snit niet verdwenen maar naar binnen
gevouwen: de opleidingseis en de werktijdvoorwaarde staan als `odrl:constraint`
op `regel-app-gebruik` (met een `skos:editorialNote` op die Set dat de
werktijdregel uit het OpenFGA-demomodel `vlierdam3` komt, niet uit de casus),
de zoektypen en de gemeentegrens op `regel-inway-brp`. Dataminimalisatie zit in
`regel-outway-brp` zelfs in het doelobject: die regel heeft **alleen het
burgerservicenummer** (`veld-brp-burgerservicenummer`) als `odrl:target` en
eist als refinement het zoektype **postcode/huisnummer** — een bevraging die
meer velden teruggeeft of op iets anders zoekt, valt buiten de permission. Wat
je bij deze snit verliest, is dat elke beleidsregel een eigen aanspreekbare Set
is; wat je wint, is dat je per Set precies één artefact en één beslissing
aanwijst.

**De uitzondering voor de gemeentesecretaris is geen tweede regel.** Eerder
stonden er twee bijna identieke BRV-regels naast elkaar: één met een
`diplomatiek = false`-refinement en één zonder, met een assignee
`de-gemeentesecretaris`. Dat is nu één permission `regel-outway-brv` met de
uitzondering als **materiële implicatie**: "wie geen gemeentesecretaris is,
moet met `diplomatiek=false` filteren". ODRL kent geen if-then, dus staat die
implicatie in haar equivalente of-vorm — een `odrl:LogicalConstraint` met
`odrl:or` over *functie is gemeentesecretaris* en *diplomatiekKenteken is
false*. De regel is daarmee één ding dat je kunt aanwijzen, en de uitzondering
is zichtbaar als uitzondering in plaats van als duplicaat.

## Verplichtingen van hoger niveau

Niet elke regel hoort bij één beslispunt. Het OpenFTV-afsprakenstelsel stelt
één voorwaarde aan **elke** bevraging over een koppelvlak, ongeacht wie
bevraagt en wat er wordt opgevraagd:

> Elke bevraging over een OpenFTV-koppelvlak draagt een trace-identificatie,
> zodat verzoeken door de keten heen te volgen zijn.

Die staat als `odrl:obligation` op een eigen Set,
`set-openftv-koppelvlak`, met `vlierdam:OpenFTV` (het afsprakenstelsel zelf)
als assigner. De twee inway-Sets nemen haar over met **`odrl:inheritFrom`** —
ODRL 2.2 §2.6: ouder- en kindregels gelden samen. Zo staat de stelselregel één
keer in de bron in plaats van overgeschreven per beslispunt, en is zichtbaar
*van wie* zij is. De verplichting draagt bewust **geen `assignee`**: de
plicht rust op wie de bevraging doet, en dat is per kind-Set een andere partij.

**Waarom de doelbinding hier niet staat.** Tot deze slag droeg de koppelvlak-Set
een tweede plicht, *doelbinding vermelden*. Die is eruit. Het trace-id reist de
hele keten door — het is zonder de logs eromheen betekenisloos, en juist daarom
mag elke schakel het zien. Het **doel** van een bevraging is dat niet: wie het
doel kent, weet waarom een gemeente naar déze burger vraagt, en dat is precies
wat RvIG en RDW niet horen te weten. Dataminimalisatie werkt hier richting de
*verstrekker*. De doelbindingsplicht is daarom de **eigen** verplichting van de
Vlierdam-outway: het doel staat in het uitgaande verzoek, wordt daar getoetst,
en steekt het koppelvlak niet over.

| Verplichting | Van wie | Actie | Voorwaarde | Afgedwongen door |
|---|---|---|---|---|
| `plicht-traceparent` | stelsel (geërfd door beide inways) | `vlierdam:traceren` | `vw-traceparent` (`traceparent` *is opgegeven* `true`) | `pdp1@rvig`, `pdp1@rdw` — rechtstreeks |
| `plicht-doelbinding` | Vlierdam-outway (eigen) | `vlierdam:vermelden` | — (ingevuld door de twee doel-voorwaarden op de outway) | via `vw-brp-doel` en `vw-brv-doel` (zie hieronder) |
| `plicht-vernietiging` | gedeeld door de twee inways | `odrl:delete` | `vw-vernietiging-moment` (`odrl:event` = *afhandeling afgerond*, `dpv:OrganisationalMeasure`) | niets — organisatorisch geborgd |

**Een derde gedeelde plicht, maar niet van het stelsel.**
`plicht-vernietiging` staat níet op de koppelvlak-Set: zij geldt voor wat er
*is opgehaald*, en dat gebeurt alleen over de twee inways. Zij hangt daarom als
**dezelfde knoop** aan `set-rvig-inway` én `set-rdw-inway` — hergebruik van één
node, zonder `inheritFrom`, want er is geen Set boven
deze twee die alleen over inways gaat. Haar doelwitten zijn beide
veldencollecties (`brp-velden-laadpalen`, `brv-velden-laadpalen`).

Zij is het **klassieke organisatorische geval**: wat de gemeente met de
opgehaalde gegevens doet nadat het koppelvlak ze heeft geleverd, ziet geen
enkel beslispunt — het gebeurt in het zaaksysteem van Vlierdam, buiten elk
AuthZEN-verzoek om. De voorwaarde draagt daarom `dpv:OrganisationalMeasure` en
er zijn bewust géén realisatielinks: er valt technisch niets uit te werken, dus
is er ook niets blijven liggen. De voorwaardedekkingstoets zwijgt erover; de
*regel*dekkingstoets meldt de plicht wél als `sh:Warning`, want de markers
zitten (nog) alleen op voorwaarden en niet op regels. Dat is een KAN-melding en
staat zo ook in het bericht van die shape.

**Eén Set, en dat is het punt.** `plicht-doelbinding` staat sinds deze slag
alléén op `set-vlierdam-outway`, als *eigen* `odrl:obligation` zonder
`inheritFrom`: de gemeente stelt de bevraging op, dus de plicht is daar van
haarzelf — en daar hoort zij ook op te houden. De viewer laat dat verschil
zien: op de outway-kaart staat zij als gewone rij in de Verplichtingen, op de
inway-kaarten staat in de vouw *"Geërfd van Koppelvlakvoorwaarden OpenFTV"*
alleen nog `plicht-traceparent`.

**De keten.** `plicht-traceparent` is één toets — `context has traceparent` —
en beide inway-bundles dekken haar rechtstreeks, samen met haar voorwaarde.
`plicht-doelbinding` niet: geen PDP toetst "er staat een doelbinding in het
verzoek" als losse regel. Wat de outway-PDP wél toetst is de **scherpere**
doel-voorwaarde van zijn eigen regels (`odrl:purpose = doelbinding-registratie-laadpalen`),
en wie die afdwingt, dwingt de plicht mee af. Dat staat als data in
`beleid.ttl`, met hetzelfde predicaat als de gewone dekking — het is immers
dezelfde relatie, "X is de uitwerking van Y":

```
anker-outway-brp --prov:wasDerivedFrom--> vw-brp-doel
                      vw-brp-doel --prov:wasDerivedFrom--> plicht-doelbinding
```

Twee van zulke schakels bestaan er: `vw-brp-doel` en `vw-brv-doel`, allebei op
de outway. **Elke kaart toont alleen haar eigen schakel.** De keten loopt niet
langs de inways, en dat is geen omissie maar het uitgangspunt: RvIG en RDW
zien het doel niet, dus valt er voor hun bundles niets uit te werken.

**SHACL.** `apnl:RegelDekkingShape` telt sinds augustus 2026 **elke inkomende
`prov:wasDerivedFrom`**, van welke knoop dan ook — de "any node"-doctrine van
Visualisatie-note §7. Dat dekt beide gevallen in één tak: het anker dat de regel
realiseert, én de scherpere voorwaarde die een stelselplicht uitwerkt. De aparte
ketentak (een sequence-pad van twee inverse stappen, die eiste dat het eindpunt
een *artefact* was) kon daarmee vervallen; de uitkomst is dezelfde en er staat
één regel minder in de shape. `apnl:VoorwaardeDekkingShape` volgt dezelfde lijn.
`apnl:DekkingsdoelShape` moest wél worden **hertarget**: zij ging uit van
artefactklassen als afzender, en het anker is een `odrl:Constraint`. Zij target
nu de link zelf (`sh:targetSubjectsOf prov:wasDerivedFrom`), zodat elke afzender
— artefact, anker of voorwaarde — een volgbaar adres moet noemen zodra het
doelwit een regel of voorwaarde is.

Twee stappen, hetzelfde predicaat, elke stap met een adres. De viewer leest de
keten terug en zet op de verplichting hetzelfde ⚙ als op elke afgedwongen
regel, met de zin *"Uitgewerkt via voorwaarde ‹…› — afgedwongen door ‹…›"*.
Onder elke toestemming van een inway-Set staat bovendien een compacte
**"Geldt ook"**-regel die naar de geldende verplichtingen springt, met de
markering *overgenomen van Koppelvlakvoorwaarden OpenFTV* bij wat geërfd is (op
de outway-kaart zonder die markering — daar is de plicht eigen).

De keten is ook **van de andere kant** leesbaar. Eén link-component, drie plekken,
overal dezelfde woorden — zodat de lezer de relatie één keer hoeft te leren:

| Waar | Wat er staat |
|---|---|
| op de voorwaarde-rij | *doel · is gelijk aan · Registratie van laadpalen* — **geeft invulling aan: Doelbinding vermelden** |
| in de `conformsToPolicy`-uitklap | dezelfde chip-rijen onder de kop **"Geeft invulling aan"**, plus een sectie *"Verplichtingen van deze beleidsset"* |
| in de "Geldt ook"-regel | de verplichting zelf, met ⚙ als zij wordt afgedwongen |

De `conformsToPolicy`-rij is in diezelfde taal degene die invulling geeft aan
wat de bundel dekt. Haar kop telt dat nu ook zo op — *"geeft invulling aan: de
regel, 2 van 2 voorwaarden, 1 verplichting"* op de RvIG-inway — en haar uitklap
noemt onder de verplichtingen of de bundel ze rechtstreeks dekt
(`Trace-identificatie meegeven (verplichting, overgenomen van
Koppelvlakvoorwaarden OpenFTV)`) of via een voorwaarde van déze regel
(`Doelbinding vermelden … — via voorwaarde "Doel is registratie van
laadpalen"`, op de outway). Wat niemand afdwingt blijft eronder staan onder
*"Niet afgedwongen"*: eerlijke leegte, geen bevinding.

Waarom niet gewoon `plicht-doelbinding` door de bundles laten dekken? Omdat dat
onwaar zou zijn: geen Cedar-regel in de bundle heet "er staat een doel in het
verzoek". Dekking is in dit voorbeeld overal een claim over wat een artefact
werkelijk uitwerkt, en die eerlijkheid is het hele punt van de dekkingslaag —
zie [`Dekking per voorwaarde`](#dekking-per-voorwaarde).

## Beleidstabel

Afgeleid uit de ODRL: één rij per Set.

| # | Set | Assigner | Type | Uitgevoerd door |
|---|---|---|---|---|
| 1 | Koppelvlakvoorwaarden OpenFTV | OpenFTV-afsprakenstelsel | obligation | pdp1@rvig, pdp1@rdw |
| 2 | Laadpalenapplicatie: toegang voor medewerkers | Gemeente Vlierdam | permission | laadpalen/frontend/access.rego |
| 3 | Beslispunt Vlierdam-outway: uitgaande bevragingen | Gemeente Vlierdam | obligation + permission | pdp1@gemeente-vlierdam |
| 4 | Beslispunt RvIG-inway: bevraging van de BRP | Rijksdienst voor Identiteitsgegevens (RvIG) | obligation + permission | pdp1@rvig |
| 5 | Beslispunt RDW-inway: bevraging van de BRV | RDW | obligation + permission | pdp1@rdw |

De kolom "Uitgevoerd door" is niet in de
Sets ingetypt maar teruggezocht via `prov:wasDerivedFrom` vanaf de **ankers** in
`beleid.ttl`, waarna de bundel uit hun `odrl:rightOperand` komt — de tabel is dus
een *afgeleide van de dekking*, en valt leeg zodra een regel ongedekt raakt.

## Dekking per voorwaarde

De tabel hierboven zegt per Set *wie* haar uitvoert. Dat is nog te grof: een
Cedar-bundle werkt vooral **voorwaarden** uit, en "regel gedekt" zegt alleen dat
**de regel zelf** (wie mag wat met welk doelwit) in de uitwerking bekend is.
Daarom is elke inhoudelijke voorwaarde in `beleid.ttl` een eigen IRI-knoop
(`vlierdam:vw-…`), zodat de uitwerking haar afzonderlijk kan dekken. De
`conformsToPolicy`-refinement is sinds augustus 2026 óók een IRI-knoop
(`vlierdam:anker-…`), maar om de omgekeerde reden: zij is nooit dekkingsdoel —
zij *is* de realiserende kant en draagt de links. De kolom "Regel gedekt door"
hieronder toont daarom nog steeds de bundel, alleen bereikt via het anker.

De dekking hieronder is **eerlijk ten opzichte van wat elke bron kan zien**.

| Regel | Regel gedekt door | Voorwaarden gedekt | Voorwaarden ongedekt | Status |
|---|---|---|---|---|
| `regel-app-gebruik` | `laadpalen/frontend/access.rego` | — | `vw-app-opleiding`, `vw-app-werktijd` | deels |
| `regel-outway-brp` | `pdp1@gemeente-vlierdam` | `vw-brp-doel`, `vw-brp-zoektype` | — | volledig |
| `regel-outway-brv` | `pdp1@gemeente-vlierdam` | `vw-brv-doel`, `vw-brv-zoektype`, `vw-brv-diplomatiek-of-secretaris` | — | volledig |
| `regel-inway-brp` | `pdp1@rvig` | `vw-inway-brp-zoektype`, `vw-inway-brp-ingezetene` | — | volledig |
| `regel-inway-brv` | `pdp1@rdw` | — *(geen benoemde voorwaarden)* | — | volledig |
| `plicht-traceparent` (stelsel) | `pdp1@rvig`, `pdp1@rdw` | `vw-traceparent` | — | volledig |
| `plicht-doelbinding` (eigen op de outway) | — *(via de keten, 2 schakels)* | — | — | via de twee doel-voorwaarden op de outway |
| `plicht-vernietiging` (gedeeld door de twee inways) | — | — | — *(`vw-vernietiging-moment` is `dpv:OrganisationalMeasure`)* | organisatorisch geborgd |

De statuskolom staat nergens in de data: hij wordt berekend. Volledig gedekt =
de regel zelf gedekt én elke benoemde voorwaarde gedekt; deels = het een wel en
het ander niet.

Waarom de outway alle vier zijn voorwaarden kan dekken en de frontend geen
enkele: de outway-PDP ziet het uitgaande verzoek in zijn geheel — doel,
zoektype én het `diplomatiek`-filter staan erin — terwijl de `access.rego` van
de frontend alleen ziet wie er inlogt. De `vw-brv-diplomatiek-of-secretaris` is
een `odrl:LogicalConstraint` en wordt als geheel gedekt; haar twee `odrl:or`-
leden blijven blank nodes, want los van elkaar dragen ze de implicatie niet.

De ingezetene-eis staat bij RvIG en niet bij Vlierdam omdat RvIG de gemeente
van inschrijving zelf houdt — hij is de enige partij die daarop kán toetsen.
De diplomatiek-eis staat om dezelfde reden andersom: het RDW kent de Vlierdamse
functie "gemeentesecretaris" niet.

**En de doelbinding staat alleen bij de outway.** Dat de twee inway-regels geen
doel-voorwaarde hebben, is geen gat in de dekking maar een uitgangspunt van FTV:
RvIG en RDW mogen niet weten *waarom* een verzoek wordt gedaan. Het doel staat
in het uitgaande verzoek, de outway-PDP toetst het, en het reist niet mee over
het koppelvlak. Wat de verstrekker wél krijgt, krijgt hij omdat hij het nodig
heeft om te beslissen of hij mag leveren: wie vraagt, welke velden, welk
zoektype, en bij RvIG welke ingezetenen. `regel-inway-brv` houdt daardoor
helemaal geen benoemde voorwaarde over — de regel zelf (wie, welke handeling,
welke velden) is alles wat het RDW nodig heeft. Dat is dataminimalisatie
richting de verstrekker, het spiegelbeeld van de dataminimalisatie op de velden.

## Hoe de brug werkt

**Eén domeinontologie als ontmoetingspunt.** Begrippen als `vlierdam:afdeling`
en `vlierdam:laadpaalopleiding` zijn IRI's met label en definitie, niet losse
strings. De ODRL-voorwaarden in `beleid.ttl` gebruiken ze als left operand; de
JSON-LD-context in `context.jsonld` mapt `subject.properties.afdeling` uit het
AuthZEN-verzoek op diezelfde IRI. Daarmee is aantoonbaar dat "afdeling" in het
beleid en "afdeling" in het verzoek hetzelfde begrip zijn — niet doordat de
namen toevallig gelijk zijn, maar doordat beide naar één IRI expanderen.
Dat geldt voor `vlierdam:afdeling`,
`vlierdam:laadpaalopleiding`, `vlierdam:zoektype` en `odrl:purpose`. Het
verzoek toont de begripsgelijkheid, niet de uitkomst: Beths opleiding van
2024-01-01 is ten opzichte van de uitgiftedatum van deze Sets zelf verlopen, en
onder de opleidingsvoorwaarde van `regel-app-gebruik` ("niet ouder dan
P1Y") zou het verzoek vandaag dus worden geweigerd.

**Het `conformsToPolicy`-anker is de enige brug naar OpenFTV.** Het verzoek zelf
komt in de ODRL alleen voor als `apnl:verwerkingsverzoek` in de voorwaarde "voldoet
aan beleid ‹artefact›" (`apnl:conformsToPolicy`, één refinement op de actie van
elke regel). Datzelfde anker verklaart met `prov:wasDerivedFrom` wélke regel en
welke voorwaarden daarmee zijn uitgewerkt. Die twee uitspraken staan sinds
augustus 2026 op één knoop, en vormen samen het generieke realisatiepatroon uit
de Visualisation Note (§7): de Set zegt *wat* de regel is, het anker zegt
*dat de aangehaalde uitwerking hem uitvoert*. Het artefact zelf blijft
beschrijvend. Het verschil tussen die twee is precies wat dit voorbeeld
zichtbaar wil maken. Merk op dat het artefact niet per se een Cedar-bundle
hoeft te zijn: `set-laadpalenapplicatie` wijst naar een Rego-module, omdat dat
daar de vorm is waarin het beleid draait.

**Dataminimalisatie als target, niet als voorwaarde.** De toegestane velden
staan in `velden.ttl` als `odrl:AssetCollection` met leden via `odrl:partOf`
(inclusief geneste velden als `naam.voornamen`). De permissions
`regel-inway-brp` en `regel-inway-brv` richten zich op die collecties, en
`regel-outway-brp` op het losse veld `veld-brp-burgerservicenummer`: een
bevraging die een veld daarbuiten opvraagt, valt simpelweg buiten de
permission. Dat is hetzelfde patroon als de BRP-gegevenssets elders in dit
profiel, en het scheelt een voorwaarde die je anders per veld zou moeten
uitschrijven.

**De `@nest`/`@vocab`-toelichting.** In `context.jsonld` is de mapping van
`type` → `vlierdam:zoektype` **plat** gedefinieerd, niet gescoped binnen `body`.
Dat is geen esthetische keuze: rdflib 7.6 negeert een gescopeerde `@context` op
een `@nest`-term, waardoor de gescopeerde variant stilzwijgend niets mapt.
Daarom is de mapping plat en is `type` in het voorbeeldverzoek weggehaald uit
`subject` en `resource` — anders zou hun `type` óók als zoektype expanderen.
Velden waarvoor geen mapping bestaat (`id`, `name`, `owner`, `postcode`,
`huisnummer`) vallen via `@vocab` in de `vlierdam:`-namespace. Ze krijgen dus
wél een IRI, maar zijn **niet in de ontologie gedeclareerd**: ze bestaan in de
graaf zonder label of definitie. Dat is bewust — het verzoek mag meer bevatten
dan het beleid toetst — maar het betekent ook dat je aan die IRI's geen
betekenis mag ontlenen. Dat is tegelijk een bewuste afwijking van het ontwerp:
de spec vraagt in §8 om `resource.properties.code` en `owner` te mappen op de
registerbegrippen, en die twee termen zijn hier niet in de context opgenomen.

**Eerlijkheidsnoot over de Cedar.** De vier artefacten in `openftv.ttl` dragen
`dct:format`, `dcat:downloadURL`, `apnl:entrypoint` en `apnl:sha256`, omdat
`apnl:PolicyArtifactShape` die vereist. Die hashes zijn echt. Voor de drie
Cedar-bundles is het de SHA-256 van `pdp1/policies/generic.cedar` op 25 augustus
2026 — en hij is voor alle drie de PDP's **identiek**, want dat bestand is bij
alle drie hetzelfde permit-everything-fragment. De Cedar in OpenFTV is op dat
moment dus een placeholder. De dekkingsrelatie zegt daarom welke PDP deze regels
*hoort* te handhaven, niet dat hij dat al doet; dat staat ook in `rdfs:comment`
op elk artefact. En dat `apnl:entrypoint` bij de Cedar-bundles "pdp1" is, is een
interpretatie: de ontologie omschrijft entrypoint als het querypad van de
evaluator (`ontology/odrl-ap-nl.ttl:202-209`, Rego-vormig), en Cedar kent zo'n
begrip niet — "pdp1" is de naam van de PDP/bundle die daarvoor in de plaats
staat.

**Eerlijkheidsnoot over de Rego.** Het vierde artefact,
`beleid-laadpalen-frontend`, is wél echte code die echt draait:
`beleid/policies/laadpalen/frontend/access.rego`, met `apnl:entrypoint
"data.authz.allow"` (het package heet `authz`, de regel `allow`) en de
werkelijke SHA-256 van dat bestand. Het is de enige plek in open-ftv waar de
medewerkerregel daadwerkelijk wordt uitgevoerd — maar het bestand codeert het
**oordeel per gebruiker**, niet de regel:

```rego
allow if { input.subject.type == "user"; input.subject.id == "Beth" }
reason := "certification expired" if { ... input.subject.id == "Jerry" }
reason := "not certified" if { ... input.subject.id == "Morty" }
```

Nergens staat *afdeling Burgerzaken*, *opleiding niet ouder dan een jaar* of
*binnen werktijd*; er staat welke drie demogebruikers welk antwoord krijgen.
Dekking betekent hier dus, net als bij de Cedar, de **beoogde
verantwoordelijkheid**: dit is het artefact dat `regel-app-gebruik` hoort uit te
voeren. Dat het dat op dit moment als hardgecodeerde uitkomstenlijst doet, staat
in `rdfs:comment` op het artefact. Let er ook op dat dit artefact **náást** de
OpenFTV-stack staat: het hoort bij geen PDP en zit in geen bundle.

## Schetsen per Set

Schetsen, geen uitgerolde bundles: ze laten zien hoe elke Set geïmplementeerd
zou kunnen worden, en vooral waar dat wringt. De drie beslispunten krijgen een
**Cedar**-schets; de laadpalenapplicatie een **Rego**-schets, want daar is het
uitvoerende artefact een Rego-module en geen Cedar-bundle. Eén voorwaarde komt
niet uit de casusbeschrijving maar uit een OpenFGA-demomodel naast de
OpenFTV-stack: de **werktijdvoorwaarde** op `regel-app-gebruik` komt uit
`vlierdam3.model.json`, waar hij als conditie `werktijd_check` staat. De
**opleidingsvoorwaarde** op dezelfde regel komt wél uit de casus (de IAM-kolom
`laadpaal-opleiding` en `access.rego`) en staat daarnáást ook in `vlierdam2`,
als een `opleiding`-relatie. Die modellen draaien niet in de OpenFTV-stack
zelf; ze zijn hier genoemd omdat het precies de twee gevallen zijn waar de
vertaling niet vanzelf gaat.

### De laadpalenapplicatie — `beleid-laadpalen-frontend` (Rego)

Zo zou `access.rego` eruitzien als hij `regel-app-gebruik` echt uitsprak:

```rego
package authz

default allow := false

allow if {
	input.subject.type == "user"
	input.subject.properties.afdeling == "Burgerzaken"
	time.parse_rfc3339_ns(input.subject.properties["laadpaal-opleiding"]) >=
		time.now_ns() - ((365 * 24) * 1000000000 * 3600)   # ODRL zegt alleen "niet ouder dan één jaar"
	input.context.binnenWerktijden == true                     # venster uit de PIP, gereduceerd tot ja/nee
	input.context.doelbinding == "7fc3d429-2435-4d5f-864e-62e444fcd906"
}
```

En zo ziet hij er vandaag werkelijk uit — het oordeel per gebruiker in plaats
van de regel:

```rego
package authz

default allow := false

allow if {
	input.subject.type == "user"
	input.subject.id == "Beth"
}
```

Het verschil tussen die twee blokken is precies wat de dekkingsrelatie
overbrugt: de ODRL spreekt de regel uit, het artefact voert (vooralsnog) de
uitkomst uit.

### De drie beslispunten (Cedar)

```cedar
// ---- outway Gemeente Vlierdam — bundle-vlierdam-pdp1 -----------------------

// regel-outway-brp — BSN bepalen: alleen zoeken op postcode/huisnummer, alleen het BSN terug
permit (principal, action == Action::"POST", resource == Service::"BRP")
// de activiteit-toets is vw-brp-doel — en daarmee, via de keten, ook de eigen
// verplichting plicht-doelbinding van deze Set
when { context.activiteit == "372ddc5d-d093-4272-b485-d7f158775909"
    && context.body.type == "ZoekMetPostcodeEnHuisnummer"
    && ["burgerservicenummer"].containsAll(context.body.fields) };

// regel-outway-brv — kentekens opvragen met het gevonden BSN; Vlierdams eigen
// eis: de bevraging moet diplomatieke kentekens uitfilteren, tenzij de
// gemeentesecretaris hem stelt. Eén permit; de || is de odrl:or uit de ODRL.
permit (principal, action == Action::"GET", resource == Service::"BRV")
when { context.activiteit == "b4911124-e92a-482f-80b4-eb02383378ae"
    && context.body.type == "KentekensOpBsn"
    && (principal.functie == "gemeentesecretaris" || context.body.diplomatiek == false) };

// ---- inway RvIG (BRP) — bundle-rvig-pdp1 ----------------------------------

// regel-inway-brp — toegestane zoektypen, dataminimalisatie, en alleen eigen
// ingezetenen (toets op het antwoord of via PIP)
permit (principal == Organisatie::"gemeente-vlierdam", action == Action::"POST", resource == Service::"BRP")
when { ["ZoekMetPostcodeEnHuisnummer", "RaadpleegMetBurgerservicenummer"].contains(context.body.type)
    && ["burgerservicenummer","naam","adressering","geboorte.datum","gemeenteVanInschrijving"].containsAll(context.body.fields)
    && context.body has gemeenteVanInschrijving && context.body.gemeenteVanInschrijving == "001"
    // GEEN doeltoets: het doel staat niet in het verzoek dat RvIG ziet
    // plicht-traceparent / vw-traceparent — de stelselplicht, één toets
    && context has traceparent };

// ---- inway RDW (BRV) — bundle-rdw-pdp1 ------------------------------------

// regel-inway-brv — dataminimalisatie BRV; ook hier geen doeltoets
permit (principal == Organisatie::"gemeente-vlierdam", action == Action::"GET", resource == Service::"BRV")
when { ["kenteken","klasse"].containsAll(context.fields)
    // plicht-traceparent / vw-traceparent
    && context has traceparent };
```

De Cedar-schets van `regel-outway-brp` staat hierboven zonder de
`use`-permission die er eerder bij hoorde: die is naar de Rego-schets verhuisd,
omdat de outway-PDP over het gebruik van de applicatie niet beslist.

De stelselverplichting is in de Cedar-schetsen géén aparte policy maar één extra
`when`-clausule op de bestaande inway-permits: `context has traceparent` — de
zwakste toets die er is, de header moet er zijn, over de waarde zegt zij niets.
De doel-gelijkheid staat alleen in de twee outway-permits, en maakt daar
tegelijk de zwakkere "er ís een doelbinding" waar. Precies daarom kán
`plicht-doelbinding` niet rechtstreeks gedekt worden: er is geen regel die
alléén haar uitwerkt.

Let op dat `regel-inway-brp` in de ODRL zijn zoektypen als **rdf:List** opsomt
(`odrl:isAnyOf` met `( vlierdam:ZoekMetPostcodeEnHuisnummer
vlierdam:RaadpleegMetBurgerservicenummer )`) — een geordende lijst van IRI's,
waar de Cedar-schets een array van strings gebruikt.

## Waar het wringt

- **Opleiding en werktijd worden door niets afgedwongen
  (`vw-app-opleiding`, `vw-app-werktijd`).** Dit is de enige plek in de casus
  waar de tweekorrelige dekking iets blootlegt dat op regelniveau onzichtbaar
  bleef. `regel-app-gebruik` is zelf gedekt — `access.rego` beslist
  wie de laadpalenapplicatie mag gebruiken — maar die module codeert een
  **oordeel per gebruiker** (Beth toegestaan, Jerry "certification expired",
  Morty "not certified") en rekent noch de opleidingsdatum, noch het
  werktijdvenster uit. Op regelniveau alleen zou de regel volledig gedekt
  lijken; per voorwaarde is zichtbaar dat beide inhoudelijke eisen buiten de
  techniek vallen. Ze gelden onverkort, en ze zijn allebei **ongemarkeerd**:
  bij allebei is een uitwerking blijven liggen. De PIP levert de
  opleidingsdatum aan (`vw-app-opleiding`), en de planningsapp van de gemeente
  is de PIP die zegt of de vragende medewerker op dat moment werkelijk aan het
  werk is (`vw-app-werktijd`) — beide eisen hóren dus technisch te worden
  afgedwongen, en beide tellen mee in de status. Wie de melding wil laten
  verdwijnen door de voorwaarden te schrappen — of door "organisatorisch" te
  markeren wat gewoon niet is uitgewerkt — handelt non-conform: de eis verdwijnt
  dan uit het beleid en niet uit de werkelijkheid. Het échte organisatorische
  geval in deze casus is `vw-vernietiging-moment` op de vernietigingsplicht van
  de twee inways: daar kán geen koppelvlak bij.
- **De interne applicatie valt buiten de AuthZEN-flow.** `regel-app-gebruik`
  is de enige regel in dit voorbeeld waar geen AuthZEN-request langskomt: de
  laadpalenapplicatie is intern, er zit geen Kong-route en geen PDP tussen, en
  de outway ziet pas verkeer wanneer de applicatie *naar buiten* bevraagt. De
  regel wordt dus door de applicatie zelf gehandhaafd (`access.rego`), en de
  hele infrastructuur van PIP-verrijking, `activiteit` en `doelbinding` uit het
  RvVA — waar de outway op leunt — is hier niet beschikbaar. Dat
  betekent ook dat de dekkingsketen hier van vorm verandert: geen bundle en
  geen entrypoint "pdp1", maar een Rego-module met `data.authz.allow`. Het
  patroon `conformsToPolicy` + `prov:wasDerivedFrom` houdt stand, de
  infrastructuur eronder niet.
- **De datumrekensom (opleiding, `regel-app-gebruik`).** De ODRL zegt wat de
  regel *zegt*: "een laadpaalopleiding niet ouder dan één jaar", met
  `vlierdam:nietOuderDan` en `"P1Y"^^xsd:duration`. De uitvoering moet daar een
  som van maken: `opleidingsdatum >= nu - 1y`, in de praktijk met een
  benadering als 365 dagen. Dat is de klassieke kloof: de leesvorm noemt een
  periode, de uitvoering rekent met een peildatum, en wie het peilmoment is
  (verzoek? antwoord?) staat in geen van beide. De `access.rego` waar de Set
  naar verwijst ontloopt de som helemaal: die codeert per gebruiker het
  *oordeel* ("certification expired" voor Jerry), waar de ODRL de *regel*
  uitspreekt.
- **Weekdag en PIP (werktijden, `regel-app-gebruik`).** Cedar noch de huidige
  Rego kent een dag-van-de-week-begrip dat je zomaar in een policy schrijft.
  "Binnen werktijden" (`vlierdam:momentVanBevraging binnen
  vlierdam:werktijden`, met de vensters uit
  `testdata/pip/attributes/werktijden.yaml`) moet dus vóór de evaluatie tot een
  boolean worden gereduceerd: een PIP-attribuut of een context-veld
  `binnenWerktijden`. Precies wat OpenFGA v3 met een conditie deed. De ODRL
  houdt het venster als begrip vast; de evaluator krijgt alleen nog ja of nee.
- **Het handhavingsmoment bij de gemeentegrens (`regel-inway-brp`).** "Alleen
  eigen ingezetenen" is een eigenschap van het *antwoord*: pas als de BRP een
  persoon teruggeeft, weet je diens gemeente van inschrijving. Cedar kan dat
  vooraf alleen als een PIP het aanlevert, of achteraf op het responsobject. De
  ODRL formuleert de regel zonder dat onderscheid — leesbaar, maar het laat
  open op welk moment hij bijt.
- **Wiens beleid is de diplomatiek-regel? (`regel-outway-brv`).** Dat
  diplomatieke kentekens buiten beeld blijven, is Vlierdams eigen beleid op zijn
  *uitgaande* bevraging, niet dat van het RDW: het RDW kent de Vlierdamse
  functie "gemeentesecretaris" niet en kan er dus ook niet op toetsen. De
  outway-PDP kan dat wél, omdat het filter `diplomatiek` in het verzoek zelf
  staat — daarom staat het hier op de outway-regel en niet als verbod aan de
  RDW-kant.
- **ODRL kent geen if-then (`regel-outway-brv`).** "Tenzij de
  gemeentesecretaris het vraagt" is een implicatie, en ODRL heeft daar geen
  operator voor. De constraint staat daarom in haar equivalente of-vorm
  (`odrl:LogicalConstraint` met `odrl:or`), die de Cedar-schets één op één als
  `||` overneemt. Logisch klopt dat, maar het leest niet als de uitzondering
  die het is — de lezer moet de materiële implicatie zelf terugvertalen.
- **De attribuutnamen zijn geen toeval.** `principal.afdeling` en
  `principal.functie` in de Cedar heten zo omdat `context.jsonld` diezelfde
  velden op `vlierdam:afdeling` en `vlierdam:functie` mapt — dezelfde IRI's die
  `beleid.ttl` als left operand gebruikt. Dat is de enige plek waar de twee
  werelden elkaar echt raken, en het is een afspraak, geen afdwingbare koppeling.

## De gegevensleveringsovereenkomst

De vijf Sets hierboven beschrijven **beslispunten**: wat hoort deze PDP te
beslissen als er een verzoek binnenkomt? Wat daarin niet staat, is de laag
erboven — de afspraak tussen de twee organisaties dát er geleverd wordt, waarom
dat mag, wie ervoor tekent en wélke gegevens er precies over het koppelvlak
gaan. Dat is de **gegevensleveringsovereenkomst** (GLO), met daaronder de
**gegevensleveringsspecificatie** (GLS) tot op veldniveau.

[`vlierdam-glo.ttl`](vlierdam-glo.ttl) werkt die laag uit voor één levering die
hier al liep: de bevraging van de BRP door Gemeente Vlierdam bij RvIG, voor de
registratie van laadpalen. RvIG is verstrekker, Vlierdam ontvanger, en de
doelbinding is dezelfde `vlierdam:doelbinding-registratie-laadpalen` die
`beleid.ttl` op de outway al afdwingt.

### Wat erin zit

| Laag | Wat er staat |
|---|---|
| Aanbod | Eén `odrl:Offer` met de standaardafsprakenset; de overeenkomst accepteert hem met `prov:wasDerivedFrom`. |
| Overeenkomst | `odrl:Agreement` + `gd:Gegevensleveringsovereenkomst`: partijen, geldigheidsduur, status, noodzaakbeoordeling, één toestemming met doelbinding, één doorleververbod en acht afspraken over zeven van de acht onderwerpen. |
| Rollen | Twee rol-objecten (verstrekker, ontvanger), elk met partij, doel, grondslag, eindverantwoordelijke functie en akkoordverklaring. |
| Grondslagen | Aan de verstrekkerskant het **autorisatiebesluit** als één grondslagknoop, met zijn kenmerk, zijn uitgever en de wettelijke bepaling waarop het berust; aan de ontvangerskant een wettelijke taak en een grondslag op basis van vrijwilligheid. |
| Specificatie | De GLS als dataproduct: populatie, begrippenkader, classificaties, contactpersonen, leverkanaal en zeven GLS-afspraken. Daaronder de leverset met drie leversetafspraken en het gegevensmiddel met negen gegevensmiddelafspraken. |
| Veldlaag | Zeven gegevenstypen met begrip, waardetype, waardedomein en gegevensveld, in een logisch en een technisch gegevensmodel — waaronder één categorisch type met codelijst en één datumtype met ontbrekendwaarden. |

### Het klikt vast aan het bestaande beleid

Dat is het punt van dit voorbeeld. De overeenkomst verzint geen nieuwe partijen,
doelen of velden:

- `vlierdam:brp-velden-laadpalen` is in `beleid.ttl` het **doelwit van de
  regels** en in de GLS de **gegevensleverset**. Eén IRI, twee rollen.
- De zeven veldknopen uit [`velden.ttl`](velden.ttl) zijn de **gegevenstypen**
  van de specificatie. Er komt geen veld bij dat `velden.ttl` niet al kent.
- `gd:filtertOpGegevenstype` wijst naar `vlierdam:veld-brp-gemeenteVanInschrijving`
  — precies het gegeven waarop `vw-inway-brp-ingezetene` in `beleid.ttl` toetst.
- De vernietigingsafspraak verwijst naar `vlierdam:plicht-vernietiging`: waar het
  beleid zegt "dit wordt niet technisch afgedwongen", zegt de overeenkomst waar
  de gemeente zich toe verbindt.
- Het leverkanaal draagt `vlierdam:set-rvig-inway` als `odrl:hasPolicy`: wie bij
  het koppelvlak aanklopt krijgt die Set als beslispunt.

De aanvullingen op bestaande knopen staan alle in `vlierdam-glo.ttl` zelf (zie
sectie 9 van dat bestand); `beleid.ttl`, `velden.ttl`, `vocabulaire.ttl` en
`openftv.ttl` zijn ongewijzigd.

### De specificatie is de machineleesbare vorm van de besluitbijlage

Een autorisatiebesluit benoemt de taak en somt in een bijlage op welke gegevens
het geautoriseerde orgaan voor die taak mag ontvangen. Precies die opsomming is
de veldlaag hierboven — niet als tekstbijlage, maar tot op veldniveau met per
gegeven zijn begrip, zijn waardetype en zijn plaats in het bericht. Een controle
of de levering binnen het besluit blijft, wordt daarmee een vergelijking van twee
lijsten. Het besluit zelf blijft in het voorbeeld één knoop; de structuur van het
besluit wordt niet nagebouwd.

### Het vocabulaire is generiek, de casus is Vlierdams

`glo-vocabulaire.ttl` staat onder een eigen, neutrale namespace
(`https://gegevensdeling.example/def/`) en beschrijft de overeenkomst zoals elke
keten haar nodig heeft; `vlierdam-glo.ttl` is de Vlierdamse invulling. Het
vocabulaire is bovendien **leveringsvorm-neutraal**: geen klasse en geen property
veronderstelt dat de ontvanger de levering initieert (bevraging) dan wel de
verstrekker (bestandslevering). Wie begint staat in één
gegevensmiddelafspraak — in deze casus: de gemeente vraagt, er is geen leverritme.

## Bekijken

Serveer de repo (`docker compose up`, of `npm start`) en open de vier bestanden
plus de profielontologie als één graaf in de viewer:

```
http://localhost:8000/viewer/?src=../data/vlierdam/vocabulaire.ttl&src=../data/vlierdam/velden.ttl&src=../data/vlierdam/beleid.ttl&src=../data/vlierdam/openftv.ttl&src=../data/odrl-ap-nl.ttl
```

`?src=` is herhaalbaar en de volgorde blijft behouden; de vijf bronnen worden
samengevoegd, zodat de Sets hun labels uit `vocabulaire.ttl` krijgen en de
ankers in `beleid.ttl` de artefacten uit `openftv.ttl` kunnen aanwijzen.
Wil je de **gegevensleveringsovereenkomst** erbij, voeg dan de drie GLO-bestanden
toe — acht bronnen in totaal:

```
http://localhost:8000/viewer/?src=../data/vlierdam/vocabulaire.ttl&src=../data/vlierdam/velden.ttl&src=../data/vlierdam/beleid.ttl&src=../data/vlierdam/openftv.ttl&src=../data/vlierdam/glo-vocabulaire.ttl&src=../data/vlierdam/vlierdam-glo.ttl&src=../data/vlierdam/glo-shapes.ttl&src=../data/odrl-ap-nl.ttl
```

De overeenkomst verschijnt dan als eigen beleidskaart naast de vijf Sets, en de
rij *Gegevensleveringsspecificatie* klapt uit tot de specificatie, de leverset,
het gegevensmiddel en de veldlaag. Laat je `glo-shapes.ttl` weg, dan staan die
knopen er wel maar klapt er niets uit: de shapes zijn wat een generieke viewer
vertelt welke velden hij van een knoop moet tonen.

Hetzelfde beleid staat ook op het Fuseki-endpoint
`/vlierdam` van deze repo; open hem met
`?src=http://localhost:3030/vlierdam/sparql` in dezelfde viewer. De loader pakt
de hele map (`docker/fuseki/load.sh`, regel `load vlierdam … data/vlierdam/*.ttl`),
dus de drie GLO-bestanden gaan daar vanzelf in mee — in SPARQL-modus zie je het
beleid en de overeenkomst dus altijd samen. De scheiding tussen wel en niet
GLO-lading is een keuze in bestandsmodus, niet in het endpoint.

## Verifiëren

```bash
npx vitest run model/test/vlierdam.test.mjs  # parse, 5 Sets, 5 regels, dekking compleet
                                            # (was viewer-bevroren/test/vlierdam.test.mjs,
                                            #  meeverhuisd bij de sloop van golf 4)
```

De SHACL bewaakt de dekking sinds de tweekorrelige versie zelf:
`apnl:RegelDekkingShape` target ook `odrl:permission` en `odrl:prohibition`
(regeldekking, `sh:Warning`), `apnl:VoorwaardeDekkingShape` meldt per ongedekte
ONGEMARKEERDE benoemde voorwaarde een `sh:Info`, en `apnl:DekkingsdoelShape`
is een violation
zodra een realisatieclaim geen adres heeft — sinds de verhuizing naar de ankers
target zij `sh:targetSubjectsOf prov:wasDerivedFrom`, dus élke afzender. Voor
Vlierdam betekent dat: precies drie info-meldingen (`vw-app-doel`,
`vw-app-opleiding` en `vw-app-werktijd` — alle drie ongemarkeerd, alle drie een
uitwerking die is blijven liggen) en één regelwarning (`plicht-vernietiging`,
die niets afdwingt omdat zij organisatorisch is geborgd). Over
`vw-vernietiging-moment` zwijgt de shape, want die voorwaarde draagt
`dpv:OrganisationalMeasure`; over de vijf ankers zwijgt zij omdat die
`dpv:TechnicalMeasure` dragen — zij zijn de technische borging zelf.
De JS-test houdt de lijst "bewust ongedekt" bij, zodat een
voorwaarde die erbij of af raakt meteen opvalt.


### De MIM-bron van de structuurlaag

Vier bestanden tonen wat het Metamodel Informatie Modellering (MIM 1.2,
Geonovum) van een gegevensleveringsovereenkomst kan dragen, en waar het ophoudt.
Zij zijn de uitwerking van de aanbevolen gedaante uit `mim-synthese.md`: MIM als
BRONMODEL van de structuurlaag, met de gepubliceerde overeenkomst ongewijzigd
ernaast. De drie datalagen staan hierboven in de tabel; `glo-mim-shapes.ttl` is
de weergavelaag eromheen.

Van de vijf lagen van een gegevensleveringsovereenkomst heeft er precies **één**
een MIM-bron. De andere vier — de overeenkomstlaag, de normatieve laag, de
leveringslaag en de technische ontsluiting — worden in sectie 3 van
`vlierdam-mim-afleiding.ttl` bij naam genoemd, met de grond uit de standaard
zelf erbij, zodat een lezer het verschil kan zien in plaats van moeten geloven.

De MIM-graaf valideert tegen `mim.ttl` en `mim-shapes.ttl` uit de
MIM-Werkomgeving (commit `4f3fc35`). De MIM-namespace zelf dereferenceert per
14 september 2026 niet; de Nederlandse labels op de gebruikte `mim:`-termen
reizen daarom met de dataset mee.

### En hoe je die bron leest

Een MIM-graaf is een instantiegraaf van de MIM-ontologie, en een generieke
viewer weet van zichzelf niet welke metagegevens hij van een `mim:Objecttype`
moet tonen, in welke volgorde, of wat `mim:kardinaliteit` in het Nederlands
heet. MIM levert zelf wel een SHACL-shapegraph, maar die *valideert*: zij zegt
welke metagegevens een attribuutsoort mag en moet dragen, niet hoe je ze toont.
`glo-mim-shapes.ttl` is die tweede laag — met de hand geschreven in dezelfde
conventies als `glo-shapes.ttl` aan de kant van de gepubliceerde stapel. Dat het
aan beide kanten handwerk is, is precies de weging: op dit punt is het een
gelijk speelveld.

Wat de formulieren toevoegen is de DOORKLIK. Naam, definitie, type,
kardinaliteit, lengte en patroon staan in MIM als platte properties op de knoop
zelf, waar de gepubliceerde veldlaag ze één hop diep achter gestructureerde
DDI-CDI-datatypen legt; en omgekeerde paden hangen elke attribuutsoort terug aan
haar objecttype, elke enumeratiewaarde aan haar enumeratie, en elk MIM-element
aan de gepubliceerde knoop die eruit is afgeleid — de rij *Gepubliceerd als*.
Blijft die rij leeg, dan zegt dat iets: daar is geen MIM-bron.

Wil je de MIM-gedaante erbij, dan worden het twaalf bronnen:

```
http://localhost:8000/viewer/?src=../data/vlierdam/vocabulaire.ttl&src=../data/vlierdam/velden.ttl&src=../data/vlierdam/beleid.ttl&src=../data/vlierdam/openftv.ttl&src=../data/vlierdam/glo-vocabulaire.ttl&src=../data/vlierdam/vlierdam-glo.ttl&src=../data/vlierdam/glo-shapes.ttl&src=../data/vlierdam/vlierdam-mim-bronmodel.ttl&src=../data/vlierdam/vlierdam-mim-extensie.ttl&src=../data/vlierdam/vlierdam-mim-afleiding.ttl&src=../data/vlierdam/glo-mim-shapes.ttl&src=../data/odrl-ap-nl.ttl
```

De ingang is de rij *Voldoet aan* op de gegevensleveringsspecificatie: naast het
begrippenkader en het logisch gegevensmodel staat daar nu het
MIM-informatiemodel. Die klapt uit naar het objecttype, de zeven
attribuutsoorten, hun datatypen, de codelijst, de keuze en de
enumeratiewaarden — 37 MIM-knopen, elk met een Nederlandse kop. Laat je
`glo-mim-shapes.ttl` weg, dan is de MIM-graaf er wel maar is er niets van te
zien: gemeten 37 uitklapbare MIM-knopen mét het bestand, nul zonder.
