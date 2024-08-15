---
weight: 5120
title: 'ADR'
---

# Architecture Design Rules

## Links
- https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- https://gitlab.com/commonground/nlx/adr

## Fragmenten
- Architecture for agile projects has to be described and defined differently. Not all decisions will be made at once, nor will all of them be done when the project begins. 
- Agile methods are not opposed to documentation, only to valueless documentation. Documents that assist the team itself can have value, but only if they are kept up to date. Large documents are never kept up to date. Small, modular documents have at least a chance at being updated.
- Nobody ever reads large documents, either. Most developers have been on at least one project where the specification document was larger (in bytes) than the total source code size. Those documents are too large to open, read, or update. Bite sized pieces are easier for for all stakeholders to consume.
- One of the hardest things to track during the life of a project is the motivation behind certain decisions. A new person coming on to a project may be perplexed, baffled, delighted, or infuriated by some past decision.
- We will keep ADRs in the project repository under doc/arch/adr-NNN.md. We should use a lightweight text formatting language like Markdown or Textile. ADRs will be numbered sequentially and monotonically. Numbers will not be reused.