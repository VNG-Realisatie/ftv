# ODRL Visualisations — basic version

## Introduction

The requirements below make it possible to visualise ODRL policies
with generic tooling: one viewer that renders any policy as a
readable document, without code per profile or per dataset.

This note assumes valid ODRL 2.2 policies.
It lists only the triples a policy needs on top of that,
so a viewer can name, group, date, link, and trace what it shows.

Examples are Turtle with the usual prefixes;
`ex:` is an example namespace.

Terms used: **needs** = without this triple the functionality
does not work. **should** = it works, but reads worse.
Nothing here is fatal when missing: the failure mode is
always readability. Each section ends with what the triples
enable and what is lost without them.

## 1. Labels

Names come from the data. A tool cannot invent them.

- Every IRI shown to a person **needs** one of:
  `rdfs:label`, `skos:prefLabel`, or `dct:title`.
- This holds for: actions, targets, parties, left operands, operators,
  right-operand values, classes, and policy identities (section 5).
- Labels **should** carry a language tag, so a tool can pick
  the label that matches the reader's language preference.
- Labels **need** to sit in the same dataset or endpoint as the
  policy data: tools resolve them together with the policy,
  not from the open web.
- Terms **should** also carry a short definition
  (`skos:definition`, `dct:description` or `rdfs:comment`, with a
  language tag): tools can reveal it as an explanation on demand.
  Like labels, definitions sit in the same dataset or endpoint as
  the policy data.

Policies may assume that labels for the ODRL core vocabulary itself
are present: for ODRL 2, visualisers ship a standard label bundle.

**Example**

```turtle
ex:policy1 odrl:permission [ odrl:action ex:consult ] .
ex:consult rdfs:label "raadplegen"@nl , "consult"@en .
```

**Enables** — tools can show every part of a policy in human words
instead of IRIs, in the reader's language, and readers can ask what
a term means without leaving the document.

**Without it** — readers see an IRI;
without a language tag, possibly a label in the wrong language;
without a definition, a term is only its name.

> **Recommendation for ODRL 3** — define the core vocabulary's
> labels as part of the vocabulary itself.

## 2. Reusable nodes

- Rule nodes may be blank nodes, but reuse **needs** IRIs:
  a rule shared between policies (for example by an Offer and
  the Agreements that accept it) **needs** to be
  the *same IRI node* in all of them.

**Example**

```turtle
ex:offer1     a odrl:Offer ;     odrl:obligation ex:duty1 .
ex:agreement1 a odrl:Agreement ; odrl:obligation ex:duty1 .

ex:duty1 a odrl:Duty ; odrl:action ex:report .
```

**Enables** — tools can show a shared offer term once,
instead of repeating it in full on every agreement.

**Without it** — the same rule text repeats on every
agreement, and nothing shows that they all rest on
a single offer term.

## 3. Named collection hierarchies

The members of a large collection are rarely a flat list: they sit
in a hierarchy of named levels from the domain, for example
series, files, and records in an archive.

- Each member **should** carry an `rdf:type` for its level,
  next to `odrl:Asset` (for example `ex:Series`, `ex:File`,
  `ex:Record`).
- Each of those domain classes **needs** a label per language
  (for example `ex:File` with "File"@en, "Dossier"@nl).

**Example**

```turtle
ex:series3 a odrl:Asset , ex:Series ; odrl:partOf ex:archive1 .
ex:file12  a odrl:Asset , ex:File ;   odrl:partOf ex:series3 .
ex:record7 a odrl:Asset , ex:Record ; odrl:partOf ex:file12 .

ex:Series rdfs:label "Series"@en .   # labels: section 1
ex:File   rdfs:label "File"@en .
ex:Record rdfs:label "Record"@en .
```

**Enables** — tools can group the members of a large collection
under meaningful headings.

**Without it** — the members can only be shown
as one flat group.

## 4. Links between policies

A link between two policies is a `prov:wasDerivedFrom`
between two nodes that are both typed as policies,
any subclass of `odrl:Policy`: `odrl:Set`, `odrl:Offer`,
`odrl:Agreement`, `odrl:Request`, `odrl:Ticket`,
`odrl:Assertion`. The pair of types gives the link
its meaning:

| From | To | Meaning |
|---|---|---|
| `odrl:Agreement` | `odrl:Offer` | the agreement accepts the offer |
| `odrl:Agreement` | `odrl:Request` | the agreement answers the request |
| `odrl:Request` | `odrl:Offer` | the request asks for the offer |

A pair that is not in this table still reads generically
as "derived from that policy".

**Example**

```turtle
ex:offer1     a odrl:Offer .

ex:request1   a odrl:Request ;
    prov:wasDerivedFrom ex:offer1 .               # asks for the offer

ex:agreement1 a odrl:Agreement ;
    prov:wasDerivedFrom ex:offer1 , ex:request1 . # accepts / answers
```

**Enables** — tools can connect each agreement to the offer
it accepts, to list the agreements under an offer, and to
show where any policy came from.

**Without it** — the reference reads
as a plain document reference.

> **Recommendation for ODRL 3** — define dedicated properties
> for these links.

## 5. Versions and time

Plain ODRL has no version model, so all of this is extra.

- Every version of a policy is itself a full, typed policy.
- Each version points at the version-independent identity of
  the policy with `prov:specializationOf`; that identity node
  carries the `dct:title` shared by the versions.
- `schema:validFrom` / `schema:validThrough` — the period in which
  the version applies, typed `xsd:date`; the version in force
  omits `schema:validThrough`. Status is computed by comparing
  dates, which **needs** typed values.
- `dct:issued` — when the version was published, as `xsd:date`
  (or `xsd:dateTime`).
- `prov:wasRevisionOf` — the previous version, by IRI.
- Status is computed, not stored: current / future / superseded /
  terminated. Terminated = the identity has versions but none applies now.

**Example**

```turtle
ex:policy-v2 a odrl:Agreement ;              # in force
    prov:specializationOf ex:policy ;
    prov:wasRevisionOf ex:policy-v1 ;
    dct:issued "2026-01-15"^^xsd:date ;
    schema:validFrom "2026-02-01"^^xsd:date .

ex:policy-v1 a odrl:Agreement ;              # superseded
    prov:specializationOf ex:policy ;
    dct:issued "2024-05-20"^^xsd:date ;
    schema:validFrom "2024-06-01"^^xsd:date ;
    schema:validThrough "2026-02-01"^^xsd:date .

ex:policy a prov:Entity ;                    # the identity
    dct:title "Access policy"@en .
```

**Enables** — tools can present all versions of a policy as one whole,
let the reader move between them, and show which version applies today.

**Without it** — there is no version navigation
and no status.

> **Recommendation for ODRL 3** — bring versioning into the
> language itself: policies that change over time are the rule,
> not the exception, and today every profile has to assemble
> its own version model from outside vocabularies.

## 6. Grouping dimensions

When a policy's rules vary along a common axis, the data
can declare that axis:

- A left operand may be declared `a qb:DimensionProperty`
  (a deliberate borrowing from the Data Cube vocabulary).
  Tools then group sibling rules by the value of that
  operand's refinement, one group per value.
- The dimension is expressed as a plain refinement on the
  action, with a core left operand where one exists.
- The labels of the operand and its values (section 1)
  become the level name and the group headings.
- Grouping **needs** unambiguous membership: per rule at most
  one refinement on the declared dimension, with operator
  `odrl:eq` and a single right operand.
  Rules without the dimension stay outside the groups.
- With more than one dimension, `sh:order` on the operand
  gives the nesting order, lowest order outermost. Dimensions
  without `sh:order` follow, in a stable but unspecified order.
  A reader may pivot that order in the tool; the declaration
  states the default, not a constraint.

**Example**

```turtle
ex:channel a qb:DimensionProperty ; sh:order 1 ;
    rdfs:label "channel"@en .                    # labels: section 1

ex:rule1 odrl:action ex:distribute-print .
ex:distribute-print rdf:value odrl:distribute ;
    odrl:refinement [
        odrl:leftOperand  ex:channel ;
        odrl:operator     odrl:eq ;
        odrl:rightOperand ex:print ] .

ex:rule2 odrl:action ex:distribute-broadcast .   # same shape, ex:broadcast
```

**Enables** — tools can fold a flat list of rules into a
hierarchy: one group per value of the dimension, with the
variants beneath it.

**Without it** — the rules show as a flat,
repetitive list.

> **Recommendation for ODRL 3** — define a native marker for
> left operands that are single-valued per rule
> (at most one `odrl:eq` refinement with a single value),
> so tools can group on them without the borrowed
> `qb:DimensionProperty` declaration.

## 7. Realisation links

A policy states what must hold; something else realises it,
either a technical artifact outside the policy or another
element of the policy. A realisation link records which node realises
which element, so that relation can be shown instead of guessed.

A realisation link is a `prov:wasDerivedFrom` whose target
gives the link its meaning, the same doctrine as section 4,
one level down, aimed at elements rather than at whole policies:

| From | To | Meaning |
|---|---|---|
| any node | rule with `odrl:uid` | the node realises the rule itself: assignee, action, target |
| any node | named condition | the node enforces that condition |
| named condition | `odrl:Duty` | the condition realises the duty |

- The reading comes from the target, not the source: deriving from a
  rule or a named condition is what makes the link a realisation link.
  The realising node itself needs only a label and, preferably, a type
  and description from its own domain (sections 1 and 3): a policy
  bundle, a rule module, a materialised authorisation table. Which
  classes those are is a matter for profiles, not for this note.
- A **rule** is a Permission, Prohibition or Duty with an `odrl:uid`.
  Those are the three subclasses of `odrl:Rule`. A Duty counts whichever
  property carries it: `odrl:duty` on a permission, a policy-level
  `odrl:obligation`, or a `consequence` or `remedy`.
- A **named condition** is a node typed `odrl:Constraint` or
  `odrl:LogicalConstraint` sitting in `odrl:constraint` or in an
  `odrl:refinement` (on a rule, on its action, or on a party or asset
  collection).
- A derivation that points at a whole **policy** is not a realisation
  link: realisation runs to rules and conditions, one by one. Links
  between policies keep their section 4 meaning, and any other
  derivation stays plain provenance.
- Conditions that are to be realisable **need** an IRI: a blank node
  has no address to point at. Blank conditions stay allowed; they simply
  cannot be pointed at, and tools say nothing about them.
- Both granularities are needed. A realising node mostly enforces
  single conditions, so a link to the rule alone cannot tell a rule with
  one of three conditions enforced from one with all three.

**Markers on a rule or a condition.** What may be *expected* of a rule or of
one of its conditions is a separate question from what is *actually* realised,
and the data can say it. Two markers borrowed from DPV (the W3C Data Privacy
Vocabulary) do that: a deliberate borrowing like `qb:DimensionProperty` in
section 6, and the same punning shape, an extra `rdf:type` on the instance.

- `dpv:TechnicalMeasure` — a rule or condition typed this is the technical
  measure. It delegates: what stands behind it is named by its IRI right
  operand, so it is the natural carrier of the realisation links above. They
  then sit in the policy, next to the rule they are about, and the thing behind
  them stays purely descriptive (name, hash, download URL; how such a node is
  presented: section 8). It is never itself the target of a realisation link
  (that would be circular), and it does not count towards status. In practice a
  condition carries it; on a rule it is the mirror image, and allowed.
- `dpv:OrganisationalMeasure` — a rule or condition typed this is secured
  outside the machinery: in a work instruction, when accounts are handed out, in
  supervision. It applies undiminished and stays fully visible, but nothing has
  been left undone, so it does not count towards status either.
- A **rule** typed with either marker is secured as a whole, not just some
  aspect of it: who bears it, what it prescribes and on what. It therefore falls
  outside the status together with all of its named conditions, of which nothing
  is expected either.
- An **unmarked** rule or named condition is ordinary normative content: it is
  meant to be enforced technically, and it counts.
- Markers state what may be expected; `prov:wasDerivedFrom` stays the only
  thing that records what is actually enforced. Marking something
  organisational is not a way to make it disappear: the requirement stays in
  the policy, only the expectation changes.
- Status per rule is computed, not stored: fully realised = the rule
  itself and every **counting** named condition of it are realised; partly =
  one of the two; not = neither. Counting = unmarked, so "fully realised"
  means that everything that is meant to be enforceable is enforced. A marked
  rule has no status at all, because there is nothing to compute.

**Example**

```turtle
ex:rule1 a odrl:Permission ; odrl:uid ex:rule1 ;
    odrl:action [ rdf:value ex:consult ; odrl:refinement ex:measure1 ] ;
    odrl:constraint ex:cond1 , ex:cond2 ,
        [ odrl:leftOperand ex:trained ] .        # blank: cannot be pointed at

# The realising side, standing in the policy itself. Equally valid: hang the
# same prov:wasDerivedFrom on ex:bundle1 — this section says "any node".
ex:measure1 a odrl:Constraint , dpv:TechnicalMeasure ;
    odrl:leftOperand  ex:request ;
    odrl:operator     ex:conformsTo ;
    odrl:rightOperand ex:bundle1 ;               # what stands behind it
    prov:wasDerivedFrom ex:rule1 , ex:cond1 .

ex:bundle1 a ex:PolicyBundle ;                   # its class is domain
    dct:title "Access bundle"@en .               # vocabulary, not ODRL

ex:cond1 a odrl:Constraint ;                     # unmarked: counts, and is realised
    odrl:leftOperand  ex:searchType ;
    odrl:operator     odrl:eq ;
    odrl:rightOperand ex:byPostcode ;
    prov:wasDerivedFrom ex:duty1 .               # realises the duty

ex:cond2 a odrl:Constraint , dpv:OrganisationalMeasure ;   # applies, does not count
    odrl:leftOperand  ex:timeOfRequest ;
    odrl:operator     ex:within ;
    odrl:rightOperand ex:officeHours .

ex:duty1 a odrl:Duty ; odrl:action ex:restrictSearch .
```

**Enables** — tools can show, per element, what realises it
and what it realises in turn, and walk that chain in both directions:
from a realising node to the rules and conditions it carries, and from
a duty back to the conditions that realise it. Conditions that nothing
enforces stay visible, and the markers let a tool say why: technical
measure, organisational measure, or simply not enforced.

**Without it** — realisation can only be guessed at the level of whole
policies, so a partly enforced rule reads as either fully enforced or
not at all. Without the markers, every unenforced condition reads as an
omission, including the ones nothing was ever going to enforce.

> **Recommendation for ODRL 3** — define a dedicated property for
> realisation links (for example `realizes`, possibly a subproperty of
> `prov:wasDerivedFrom`): derivation is generic provenance, and
> "realises" is load-bearing enough to deserve its own name. Define native
> markers for a rule or condition that delegates to a technical measure and for
> one that is secured organisationally, so the borrowing from DPV is not needed.

## 8. Domain forms

A policy points at domain nodes a generic tool cannot know:
the artifact behind a realisation link (section 7), a field
collection, a register. Labels (section 1) name such a node;
a *form shape* says how to present its properties.

- A domain node **should** come with a `sh:NodeShape` whose
  `sh:targetClass` covers the node's class, so tools can render
  it as a structured form instead of a bare property list.
  Subclasses count: a shape on the profile's base class covers
  the classes derived from it.
- The shape **needs** to sit in the same dataset or endpoint as
  the node it describes: tools resolve it together with the data,
  not from the open web. Labels follow the same rule (section 1).
- Each `sh:property` **needs** `sh:name` per language and
  `sh:order`; groups of fields **should** use `sh:group` with a
  labelled `sh:PropertyGroup`. Groups and ungrouped properties sit
  in one sequence, ordered by `sh:order`; a group takes the order
  of its `sh:PropertyGroup`.
- Each `sh:property` **should** carry a widget hint from this
  subset, using `dash:` terms (their `shui:` equivalents from
  SHACL 1.2 UI are read as synonyms, with `shui:IRIViewer` for
  `dash:URIViewer`):
  `dash:viewer` with `dash:LiteralViewer`,
  `dash:URIViewer`, `dash:LabelViewer` (the node's label,
  rendered as a hyperlink when the IRI points outside the
  loaded data), or
  `dash:LangStringViewer`; and `dash:propertyRole` with
  `dash:LabelRole` (the node's title),
  `dash:DescriptionRole` (its summary), or
  `dash:KeyInfoRole` (shown next to the title).
- `rdf:type` is an ordinary property: a shape that wants to show
  the node's class lists it like any other, with a viewer and an
  order. A tool picking one class over another, or moving it next
  to the title, is presentation.
- A form shape **may** also target a profile subclass of
  `odrl:Policy` (such as an authorisation decision typed next to
  `odrl:Agreement`). A tool that renders the policy in a view of
  its own, such as a card, uses the shape only for the properties
  that view does not already place: their names, order, groups,
  and viewers. The view keeps its own title, version line, and
  rules; property roles are ignored there, and a shape row whose
  path the view already shows **may** be skipped.
- Only a `sh:NodeShape` with at least one presentation term from
  this subset (`sh:name`, `dash:viewer`, `dash:propertyRole`)
  counts as a form shape; a plain validation shape on the same
  class is not a form.
- A tool that names the *kind* of node — a badge on a collapsed
  form, a column header, a breadcrumb — takes that name from the
  shape's `sh:targetClass`, not from the shape: a shape is a view
  of a class and is usually named after the view
  ("GLS form"), while the class carries the name of the thing.
  The reading order on that class is `skos:altLabel` (a short
  form the profile itself writes, such as `"GLS"`), then its
  label per section 1. A profile **should** give a class whose
  name is too long for a badge a `skos:altLabel`; a tool that
  shows the short form **needs** to keep the full name reachable
  (a title, a tooltip). The short form never replaces
  `skos:prefLabel` as the preferred term.
- Anything beyond this subset is presentation and stays with
  the tool: colours, monospace, how a note block is boxed.

**Example**

```turtle
ex:ArtifactShape a sh:NodeShape ;
  sh:targetClass ex:PolicyArtifact ;
  sh:property [ sh:path rdfs:label ;
    dash:propertyRole dash:LabelRole ] ;
  sh:property [ sh:path rdf:type ;
    sh:name "Soort"@nl , "Kind"@en ;
    sh:order 0 ; dash:viewer dash:LabelViewer ] ;
  sh:property [ sh:path dct:format ;
    sh:name "Formaat"@nl , "Format"@en ;
    sh:order 1 ; dash:viewer dash:LiteralViewer ] ;
  sh:property [ sh:path dcat:downloadURL ;
    sh:name "Download"@nl , "Download"@en ;
    sh:order 2 ; dash:viewer dash:URIViewer ] ;
  sh:property [ sh:path rdfs:comment ;
    sh:name "Noot"@nl , "Note"@en ;
    sh:order 9 ; dash:viewer dash:LangStringViewer ] .
```

**Enables** — tools can show unknown domain nodes as a tidy,
ordered, bilingual form (right fields, right order, links as
links) without code per profile; when a profile adds a field,
the form follows the shape.

**Without it** — tools fall back to a bare property list:
every triple of the node, in arbitrary order, labelled by
section 1 at best.

> **Recommendation** — profiles that define domain classes
> (such as policy artifacts) should ship a form shape for them
> alongside the class labels, so every consumer renders the
> same form.
