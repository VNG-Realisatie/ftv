// De WEERGAVESHAPE die de viewer voor apnl:PolicyArtifact MEELEVERT.
//
// LETTERLIJKE KOPIE van data/shapes/formulier-artefact.ttl — de canonieke bron
// staat in de spec-repo (odrl-ap-nl/shapes/formulier-artefact.ttl) en wordt
// hierheen gesynchroniseerd. viewer/test/forms.test.mjs vergelijkt deze string
// teken voor teken met het TTL-bestand en faalt zodra ze uit elkaar lopen.
//
// Waarom als STRING en niet als fetch: doc.js moet het artefactformulier ook
// kunnen tonen wanneer er geen enkele bron is meegeladen (SPARQL-modus,
// ?src=<endpoint>), en de viewer heeft geen build-step. Zelfde patroon als de
// meegeleverde ODRL-labelbundel (odrl-core-labels.js): RDF als bron, een
// JS-module als vervoermiddel. De shape wordt één keer geparst (forms.js).
//
// Een shape UIT DE GELADEN DATA met dezelfde sh:targetClass WINT hiervan — een
// profiel dat zijn eigen formulier meebrengt, bepaalt hoe het eruitziet.

export const ARTIFACT_FORM_SHAPE_TTL = `# =============================================================================
# ODRL-AP-NL — WEERGAVESHAPE voor het policy-artefact (geen conformiteitstoets)
#
# Dit bestand hoort NIET bij de vier conformiteitsverrijkingen. Het toetst
# niets: het beschrijft hoe een apnl:PolicyArtifact (en zijn subklassen) als
# FORMULIER getoond hoort te worden — welke velden, in welke volgorde, met welk
# label per taal, en in welke vorm (letterlijk, link, label van de doelknoop).
# Zie de Visualisation Note §8 "Domain forms".
#
# WAAROM ALS DATA. Tot augustus 2026 stond deze kennis als code in de viewer
# (doc.js/artifactForm): acht velden, hun volgorde en hun weergavevorm, met de
# hand geschreven. Dan komt het formulier uit de tool in plaats van uit de
# spec, en volgt het niet vanzelf wanneer het profiel een veld toevoegt. Als
# shape werkt dezelfde machinerie voor élke klasse.
#
# VOCABULAIRE. De weergaveannotaties komen uit DASH (datashapes.org/dash),
# de geïmplementeerde de-facto-vocabulaire. De W3C-werkgroepdraft SHACL 1.2
# User Interfaces (http://www.w3.org/ns/shacl-ui/) standaardiseert dezelfde
# termen; een tool MAG shui:viewer/shui:propertyRole als synoniem lezen, met
# shui:IRIViewer == dash:URIViewer. Wij schrijven dash: omdat dat vandaag
# werkt.
#
# SUBSET. Alleen sh:targetClass, sh:property (sh:path, ook sh:inversePath),
# sh:name, sh:description, sh:order, sh:group + sh:PropertyGroup, en van
# DASH: dash:viewer met {Literal,URI,Label,LangString}Viewer en
# dash:propertyRole met {Label,Description,KeyInfo}Role. Alles daarbuiten
# (kleur, monospace, hoe een noot wordt omkaderd) is presentatie en blijft bij
# de tool. sh:pattern staat er als validatiegegeven; een viewer mag hem als
# aanwijzing gebruiken dat de waarde een machinesyntaxis heeft.
#
# VINDPLAATS. Zoals de labels van §1 hoort deze shape in dezelfde dataset of
# hetzelfde endpoint te staan als de knopen die zij beschrijft. De viewer
# levert haar ingebouwd mee (assets/artifact-form-shape.js, letterlijke kopie
# van dit bestand); een shape uit de geladen bronnen met dezelfde
# sh:targetClass wint daarvan.
# =============================================================================
@prefix sh:     <http://www.w3.org/ns/shacl#> .
@prefix dash:   <http://datashapes.org/dash#> .
@prefix rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd:    <http://www.w3.org/2001/XMLSchema#> .
@prefix dct:    <http://purl.org/dc/terms/> .
@prefix dcat:   <http://www.w3.org/ns/dcat#> .
@prefix schema: <https://schema.org/> .
@prefix apnl:   <https://standaarden.overheid.nl/odrl-ap-nl/> .

apnl:PolicyArtifactFormShape
    a sh:NodeShape ;
    sh:targetClass apnl:PolicyArtifact ;
    rdfs:label "Artefactformulier"@nl , "Artifact form"@en ;
    rdfs:comment """Doelklasse apnl:PolicyArtifact; de subklassen CedarPolicySet,
RegoModule, OpenFGAModel en PolicyBundle vallen eronder via rdfs:subClassOf in
de profielontologie — een tool rekent die sluiting uit."""@nl ;

    # ---- Titelregel -------------------------------------------------------
    # Twee kandidaten in de volgorde die de rest van de viewer ook aanhoudt:
    # een eigen dct:title wint van rdfs:label. De taalkeuze is de gewone
    # language resolution (voorkeurstaal, dan de andere).
    sh:property [
        sh:path dct:title ;
        dash:propertyRole dash:LabelRole ;
        sh:order 0 ;
    ] ;
    sh:property [
        sh:path rdfs:label ;
        dash:propertyRole dash:LabelRole ;
        sh:order 1 ;
    ] ;

    # ---- Beschrijving: de gedempte alinea onder de titel -------------------
    sh:property [
        sh:path dct:description ;
        sh:name "Beschrijving"@nl , "Description"@en ;
        dash:propertyRole dash:DescriptionRole ;
        sh:order 2 ;
    ] ;

    # ---- De veldenlijst ----------------------------------------------------
    # SOORT als gewone rij, niet als pill (besluit eigenaar, aug 2026). Beide
    # klassen mogen in beeld: dat een Rego-module ook schema:SoftwareSourceCode
    # is, is informatie en geen ruis. Een tool die alleen de profielklasse wil
    # tonen, doet dat als presentatiekeuze — de shape zegt het niet.
    sh:property [
        sh:path rdf:type ;
        sh:name "Soort"@nl , "Kind"@en ;
        sh:nodeKind sh:IRI ;
        dash:viewer dash:LabelViewer ;
        sh:group apnl:PolicyArtifactFieldsGroup ;
        sh:order 5 ;
    ] ;
    sh:property [
        sh:path schema:programmingLanguage ;
        sh:name "Programmeertaal"@nl , "Programming language"@en ;
        sh:datatype xsd:string ;
        sh:maxCount 1 ;
        dash:viewer dash:LiteralViewer ;
        sh:group apnl:PolicyArtifactFieldsGroup ;
        sh:order 10 ;
    ] ;
    # schema.org komt in het wild in twee naamruimten voor; beide leveren
    # hetzelfde veld met hetzelfde label.
    sh:property [
        sh:path <http://schema.org/programmingLanguage> ;
        sh:name "Programmeertaal"@nl , "Programming language"@en ;
        sh:datatype xsd:string ;
        sh:maxCount 1 ;
        dash:viewer dash:LiteralViewer ;
        sh:group apnl:PolicyArtifactFieldsGroup ;
        sh:order 11 ;
    ] ;
    sh:property [
        sh:path dct:format ;
        sh:name "Formaat"@nl , "Format"@en ;
        sh:datatype xsd:string ;
        sh:pattern "^[^\\\\s]+/[^\\\\s]+$" ;
        sh:maxCount 1 ;
        dash:viewer dash:LiteralViewer ;
        sh:group apnl:PolicyArtifactFieldsGroup ;
        sh:order 20 ;
    ] ;
    sh:property [
        sh:path apnl:entrypoint ;
        sh:name "Entrypoint"@nl , "Entrypoint"@en ;
        sh:datatype xsd:string ;
        sh:pattern "^[A-Za-z0-9_.:@/-]+$" ;
        sh:maxCount 1 ;
        dash:viewer dash:LiteralViewer ;
        sh:group apnl:PolicyArtifactFieldsGroup ;
        sh:order 30 ;
    ] ;
    sh:property [
        sh:path apnl:sha256 ;
        sh:name "sha256"@nl , "sha256"@en ;
        sh:datatype xsd:string ;
        sh:pattern "^[0-9a-f]{64}$" ;
        sh:maxCount 1 ;
        dash:viewer dash:LiteralViewer ;
        sh:group apnl:PolicyArtifactFieldsGroup ;
        sh:order 40 ;
    ] ;
    sh:property [
        sh:path dcat:downloadURL ;
        sh:name "Download"@nl , "Download"@en ;
        sh:description "De rauwe inhoud van het artefact."@nl ,
                       "The raw content of the artifact."@en ;
        sh:nodeKind sh:IRI ;
        dash:viewer dash:URIViewer ;
        sh:group apnl:PolicyArtifactFieldsGroup ;
        sh:order 50 ;
    ] ;
    sh:property [
        sh:path dct:source ;
        sh:name "Broncode"@nl , "Source code"@en ;
        sh:description "De vindplaats van de broncode (het bestand in de repository), naast dcat:downloadURL (de rauwe inhoud)."@nl ,
                       "Where the source code lives (the file in the repository), next to dcat:downloadURL (the raw content)."@en ;
        sh:nodeKind sh:IRI ;
        dash:viewer dash:URIViewer ;
        sh:group apnl:PolicyArtifactFieldsGroup ;
        sh:order 60 ;
    ] ;
    # Het LABEL van het gebundelde artefact, niet zijn IRI: een bundel noemt
    # haar modules bij naam.
    sh:property [
        sh:path apnl:bundles ;
        sh:name "Bevat"@nl , "Contains"@en ;
        sh:nodeKind sh:IRI ;
        dash:viewer dash:LabelViewer ;
        sh:group apnl:PolicyArtifactFieldsGroup ;
        sh:order 70 ;
    ] ;

    # ---- De eerlijkheidsnoot ----------------------------------------------
    # rdfs:comment: hierin legt de auteur vast hoever de implementatie
    # werkelijk is. Zij staat ONGEGROEPEERD en met een hoge sh:order, dus na de
    # veldenlijst: eerst het artefact, dan het voorbehoud.
    sh:property [
        sh:path rdfs:comment ;
        sh:name "Noot"@nl , "Note"@en ;
        dash:viewer dash:LangStringViewer ;
        sh:order 90 ;
    ] .

apnl:PolicyArtifactFieldsGroup
    a sh:PropertyGroup ;
    rdfs:label "Kenmerken"@nl , "Details"@en ;
    sh:order 10 .
`;
