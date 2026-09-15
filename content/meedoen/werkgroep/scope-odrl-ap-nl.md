---
type: 'chapter'
Title: Scope ODRL-AP-NL
---
{{< chapter/section title="" >}}
# Scope ODRL-AP-NL (15 september 2026)

{{< /chapter/section >}}

{{< chapter/section title="Aanwezigen" >}}
- Michiel Trimpe (FTV)
- Marc de Boer (FTV)
- Hans Hendrikman (RvIG)
- Gideon Zegwaard (FDS)
- Marcel Molenaar (UWV)
- Hans Schevers (BIM-Connected)
- Mark Westbroek (VNG)
- Axel van der Minne (DUO)
- Jan Klopper (OpenKAT)
- Floris Deutekom (Geonovum)
- Rens Kievit (MinBZK)
- Karl de Boer (Not So Common)
- Remo van Rest (Zorginstituut Nederland)
- Joyce Leijen-Kouwenberg (Zorginstituut Nederland)
- Rob van Dort (mapplica)
- Guus van der Meer (Vecozo)
- Stas Mironov (Logius)
- Hugo Mostard (Gemeente Den Haag)
{{< /chapter/section >}}

{{< chapter/section title="Bijlages" >}}

- [Opname](https://github.com/VNG-Realisatie/ftv/raw/refs/heads/main/static/videos/20260915-odrl-ap-nl.mp4)
- [Presentatie](/ftv/documents/20260915-odrl-ap-nl.pdf)
- [ODRL Visualisation Note](/ftv/documents/20260824-odrl-visualisation-note.html)
- [Voorbeeld in de viewer: GLO met W3C-standaarden](/ftv/odrlvis/?src=voorbeelden/glo-voorbeeld.ttl)
- [Voorbeeld in de viewer: GLO met NL-standaarden](/ftv/odrlvis/?src=voorbeelden/glo-mim-voorbeeld.ttl)
- [Voorbeeld in de viewer: hardening als machineleesbare afspraak](/ftv/odrlvis/?src=voorbeelden/hardening-voorbeeld.ttl)

{{< /chapter/section >}}

{{< chapter/section title="Agenda" >}}
- Welkom & kennismaking
- ODRL Visualisation Note en viewer
- Scopebepaling ODRL-AP-NL
- Planning vervolg
{{< /chapter/section >}}

{{< chapter/section title="Welkom en kennismaking" >}}

*Michiel Trimpe* opent de sessie, die in het teken staat van ODRL en linked
data; de volgende sessie richt zich weer op de IAM- en technische kant.
*Jan Klopper* stelt zich voor: hij is implementatieadviseur (OpenKAT), houdt zich bezig met de internetstandaarden op de
pas-toe-of-leg-uitlijst, en sluit aan vanwege zijn werk aan policy as code —
het toetsen of een partij mag meedoen op basis van haar security posture.

{{< /chapter/section >}}

{{< chapter/section title="ODRL Visualisation Note en viewer" >}}

*Michiel* licht de aanleiding toe: ODRL is een degelijk en flexibel formaat
voor toegangsbeleid, maar er bestond geen visualisatie die het toonbaar
maakt — zeker beleidsmakers schrikken terug van ruwe triples. Op de kickoff
van de W3C Digital Policy Working Group in Londen heeft FTV daarom
voorgesteld een Visualisation Note aan de scope van ODRL 3 toe te voegen.
De note is geaccepteerd als "other deliverable": de werkgroep plant er geen
eigen capaciteit voor, maar neemt hem op wanneer FTV hem aanlevert en
afstemt. Dezelfde visualisatie-aspecten dragen ook een editor; viewer en
editor worden samen doorontwikkeld.

*Michiel* demonstreert de onderdelen van de note aan de hand van de viewer;
zie de opname voor de demo. Kern: geïnternationaliseerde labels op URI's,
hergebruik van knopen (een verplichting uit een aanbod die in een
overeenkomst wordt geaccepteerd, houdt dezelfde identifier — de viewer
toont de herkomst en een aanpassing werkt overal door), hiërarchieën op
doelobjecten (series/dossiers/stukken, of de BRP-indeling) via extra
linked-data-elementen binnen de ODRL-syntax, en de relaties tussen aanbod,
overeenkomst en verzoek die in ODRL zelf nog ontbraken.

**Vocabulairekeuze.** Op de vraag van *Gideon Zegwaard* of de
partOf-relatie ODRL-eigen is, antwoordt *Michiel* dat de note bewust
bestaande vocabulaires hergebruikt, zo dicht mogelijk bij de bron: ODRL
waar het bestaat, anders Dublin Core of PROV — de aanbod-overeenkomst-
relatie loopt bijvoorbeeld via prov:wasDerivedFrom. Voor een aantal
elementen doet de note de aanbeveling ze in ODRL 3 als officieel element op
te nemen.

**Labels en taaleisen.** *Hans Schevers* vraagt hoe de labelvereiste zich
verhoudt tot SHACL: wie een taaltag afdwingt, krijgt per taal een eigen
shape. *Michiel* wijst op de voorkeurstalenlijst van de viewer (Nederlands,
Engels, taalloos, rest); *Gideon* stelt dat taaleisen niet in de
internationale note thuishoren maar in een nationaal profiel, dat dan wel
naar de note verwijst. *Hans* oppert als middenweg een taalloos
rdfs:label als vereiste, met de taalkeuze als software-fallback. Het punt
blijft open voor de profieluitwerking.

**Versionering.** *Michiel* licht toe dat het ODRL temporal-profiel is
afgeschaft ten faveure van een documentbenadering: beleid draagt een
ingangsdatum en een geldigheidsperiode, zoals een autorisatiebesluit, met
een versieweergave in de viewer. Op vragen van *Gideon* en *Marcel
Molenaar* wordt het onderscheid scherp: van hetzelfde document kunnen
meerdere versies bestaan, ook met dezelfde geldigheidsperiode —
bijvoorbeeld wanneer gepubliceerd beleid vóór de ingangsdatum wordt
vervangen maar wel geregistreerd is geweest en gebruikt kan zijn. Wie
traceerbaar wil zijn, verwijst daarom naar de gebruikte versie en niet naar
de actuele; de note lost verwijzingen niet actief op maar volgt het
voorgestelde ODRL 3-model.

**Groeperingsdimensies.** Een BRP-autorisatiebesluit kent veel fijnmazige
doelbindingen; als platte lijst is dat niet te overzien. Vereisten met een
enkelvoudige waarde (doel, doelgroep) herkent de viewer en gebruikt hij als
groepering. Op de vraag van *Karl de Boer* hoe de overige kenmerken van
bijvoorbeeld een spontane verstrekking dan gemodelleerd worden, antwoordt
*Michiel* dat alle overige vereisten gewoon blijven staan — alleen de
enkelvoudige waarden dragen de groepering.

**Voorwaarden lezen.** *Marcel* vraagt of de getoonde vergelijkingen
en-relaties of of-relaties zijn. *Michiel* bevestigt dat voorwaarden op dit
niveau conjunctief zijn en toont een of-voorbeeld (functie is
gemeentesecretaris óf diplomatiek kenteken). De werkgroep concludeert dat
de viewer dit expliciet moet maken voor wie ODRL niet kent — een
visualisatiepunt, bijvoorbeeld een "en" tussen de blokken.

**Realisatielinks en formulieren.** *Michiel* toont hoe logisch,
juridisch beleid gekoppeld wordt aan de technische afdwinging: een
verwerkingsverzoek dat een vereiste technisch invult wordt gemarkeerd met
een DPV technical measure, en "geeft invulling aan"-ketens verbinden
vereisten met verplichtingen zoals het registreren van doelbinding. Wat
niet technisch maar organisatorisch geborgd is — archivering
bijvoorbeeld — draagt een DPV organizational measure. Tot slot maken
domeinformulieren met SHACL en DASH gestructureerde, geordende formulieren
per element mogelijk, ook voor de editor.

{{< /chapter/section >}}

{{< chapter/section title="Scope ODRL-AP-NL: het minimale profiel" >}}

*Michiel* stelt voor een basis-ODRL-AP-NL neer te zetten dat primair de
eisen uit de Visualisation Note vereist en daarnaast een aantal zaken
toevoegt: DPV voor doel en grondslag, de aansluiting op DCAT-AP-NL, de
conformsToPolicy-operand voor de koppeling aan technische policies in de
consentketen, en een basisaanbod van filterbare elementen (het doel als
DPV purpose, het verwerkingsverzoek mogelijk als RVvA-identifier).

*Gideon* reageert positief en stelt voor om, zoals DCAT-AP-NL doet, bij
het profiel SHACL-shapes te leveren die de aanbevelingen toetsen; *Michiel*
neemt dat over. Op de vraag uit de werkgroep — ook *Rens Kievit* stelt
hem — wat er eigenlijk Nederlands is aan dit profiel, erkent *Michiel* dat
het in wezen een generiek overheidsprofiel is dat net zo goed op EU-niveau
zou kunnen bestaan; waar dat aan te bieden is, is een positioneringsvraag.
*Gideon* noemt als werkelijk Nederlandse elementen de verwijzingen naar
personen, organisaties en overheden (BSN, KVK, TOOI) en ziet een Europese
route pas als het profiel zich bewezen heeft; het idee is het dan bij
CEN/CENELEC te pitchen voor Europese standaardisatie, waar het via de
werkgroep een keer gepresenteerd kan worden om Europese aandacht te
wekken. *Hans Schevers*
benoemt de balans: zonder de visualisatie-eisen is beleid geldig maar niet
toonbaar, en wie de eisen stelt geeft ODRL daarmee een Nederlands smaakje —
daar is hij overigens voorstander van, omdat het een strakke, gegarandeerd
toonbare dataset oplevert. *Michiel* wijst er tot slot op dat ook de
aansluiting op DCAT-AP-NL het profiel Nederlands kleurt.

{{< /chapter/section >}}

{{< chapter/section title="Uitbreiding: gegevensleveringsovereenkomsten" >}}

*Michiel* introduceert — mede namens *Danny Greefhorst*, die verhinderd
is — het voorstel om de scope uit te breiden met
gegevensleveringsovereenkomsten, op basis van het J&V-informatiemodel voor
gegevensdelingsbeleid: één overeenkomst met code, status en
geldigheidsduur, een verstrekker en ontvanger elk met een eigen rol en
doel, de grondslag tot op artikel en lid, akkoordverklaringen namens beide
rollen (goed te combineren met een digitaal ondertekend FSC-contract) en
een noodzaakbeoordeling als dataminimalisatietoets. Daarnaast kent het
model gegevensleveringsspecificaties — vergelijkbaar met de kruisjeslijst
van de BRP — tot op het niveau van begrippenkader, gegevenstypen en
gegevensvelden.

**Rijksbrede status.** Op de vraag van *Axel van der Minne* of het
gegevensmodel werkelijk rijksbreed wordt — het beleid kent hij, het model
niet — antwoordt *Gideon* dat er naar verluidt een rijksbreed model in
ontwikkeling is dat hierop gebaseerd zou zijn, maar dat het nog nergens
gepubliceerd is; hij wil er vanuit de FDS-afspraken naar kunnen verwijzen
en zit er achteraan. *Axel* meldt dat DUO het gegevensdelingsbeleid heeft
geadopteerd en de invulling van GLP en GLS nu formuliergewijs oppakt, met
de verwachting dat dit naar een gegevensboekhouding toegroeit.

**Bestanden of diensten.** *Marcel* is er geen voorstander van dat
overeenkomsten aan bestandsleveringen hangen — met FSC lever je op
serviceniveau — en vraagt of het model daarin kiest. *Michiel* antwoordt
dat het model neutraal is: een leverset heeft een leveringsmechanisme, en
dat kan een API of een bestand zijn. *Axel* vult aan dat dezelfde
discussie in de beleidsgroep is gevoerd: het beleid staat inmiddels beide
toe, maar "ademt nog redelijk bestandsdelen uit".

**Linked-data-invulling.** *Michiel* schetst hoe het formulier-gebaseerde
model in linked data te vangen is: datasets op DCAT (catalogus, dataset,
datadienst, distributie met beleid), DPROD voor afgeleide dataproducten
zoals de informatieproducten van de BRP API, en voor de veldlaag de
Vocabulary for Variable Description (VVD) die de DCAT-werkgroep op basis
van DDI-CDI ontwikkelt. *Gideon* signaleert een knelpunt: beleid moet ook
op een datadienst kunnen hangen, terwijl DCAT-AP-NL dat nu alleen op de
distributie toestaat — en voor FDS is alles juist een datadienst. De
werkgroep concludeert dat hier het gesprek met DCAT-AP-NL gevoerd moet
worden; het is pas een conflict als DCAT-AP-NL het verbiedt.

Over de relatie met de Nederlandse modelleerstandaarden merkt *Axel* op
dat voor begrippen NL-SBB bestaat; *Michiel* beaamt dat die sowieso in de
basisset hoort. *Gideon* preciseert dat MIM vijf niveaus benoemt maar er
twee uitwerkt; niveau één is het terrein van NL-SBB en SKOS. Op de vraag
van *Hans Schevers* hoe die niveaus überhaupt op linked data passen,
antwoordt *Michiel* dat VVD dat wel doet maar dat het in de praktijk vaak
hand-wavy blijft; als de werkgroep deze kant op gaat, hoort daar een
uitwerking met linked-data-specialisten bij. *Gideon* ziet niveau twee tot
en met vier goed uitdrukbaar in linked data, maar wijst op de missende
schakel naar niet-linked-data-beschrijvingen zoals een OpenAPI-specificatie.
*Michiel* antwoordt dat de AuthZEN-kant is dichtgetikt — het NL-Gov-profiel
schrijft linked-data-context bij API-verzoeken voor — en dat de
OAS-koppeling, die raakt aan de API Design Rules, nog te verkennen is.

{{< /chapter/section >}}

{{< chapter/section title="Scope-peiling en vervolgstappen" >}}

*Michiel* peilt de werkgroep: alleen het minimale profiel neerzetten, of
ook de gegevensleveringsovereenkomsten induiken? *Gideon* wil de basis
eerst echt goed uitwerken en de overige aspecten verkennen voor een
volgende iteratie. *Rens* vindt het juist interessant alvast voor te
sorteren op de dataspace-wereld, met de kanttekening dat hij niet over de
capaciteit gaat. *Mark Westbroek* is voorstander van verder trekken:
Common Ground moet op gegevensmodellen kunnen koppelen, liefst logisch en
eventueel op API-niveau. *Marcel* heeft geen uitgesproken mening, maar
stelt als voorwaarde dat er aan diensten gekoppeld wordt en niet aan
bestanden. *Axel* is geïnteresseerd in de koppeling tussen toegangsregels
en datasets en datadiensten als abstracte leveringen.

*Michiel* benoemt kort dat de scope nog verder opgetrokken zou kunnen
worden, bijvoorbeeld naar machine-hardeningsbeleid in de sfeer van
OpenKAT of naar DQV-kwaliteitseisen — zie het bijgevoegde
[voorbeeld van hardening als machineleesbare afspraak](/ftv/odrlvis/?src=voorbeelden/hardening-voorbeeld.ttl)
— maar dat lijkt hem voor nu te ver gaan. In afstemming met *Jan
Klopper* wordt dit vooruitgeschoven: Jan wil eerst beter zien wat de
werkgroep doet, dan kijken waar het raakvlak met OpenKAT zit, en het
potentieel later in een presentatie aan de groep voorleggen.

**De werkgroep concludeert:** de basis wordt degelijk neergezet — mede
omdat het project op enig moment eindigt — en er is animo om daarnaast de
verdieping in te gaan.

Afspraken: *Michiel* vraagt per mail wie tijd en beschikbaarheid heeft
voor fysieke verdiepingssessies en stuurt een datumprikker. *Marcel* zegt
toe zijn data-architectcollega's bij UWV te betrekken en koppelt terug of
nodigt hen uit voor een volgende sessie over dit onderwerp. De volgende
reguliere sessie gaat over de technische kant; GraphQL-autorisatie staat
op de planning.

{{< /chapter/section >}}

{{< chapter/section title="" >}}
*Dit verslag is met een LLM gegenereerd op basis van de opname en door mensen gereviewd.*
{{< /chapter/section >}}
