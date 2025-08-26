---
type: 'nieuws'
Title: Update Open FTV
date: '2025-08-26'
summary: "Het project Federatieve Toegangsverlening ontwikkelt o.a. de referentie-implementatie OpenFTV."
---

{{< nieuws/header title="Ontwikkeling OpenFTV" >}}
Het project Federatieve Toegangsverlening (FTV) ontwikkelt o.a. de referentie-implementatie OpenFTV.
Deze laat zien hoe toegangsverlening werkt met beheer van toegangsregels buiten de applicatie ([Externalized Authorization Management](/ftv/methodiek/principes/), EAM).
De implementatie is open source en bedoeld voor iedereen die FTV wil begrijpen, testen of verder wil ontwikkelen.  
{{< /nieuws/header >}}

{{< chapter/section title="In stappen" level="3">}}
OpenFTV is in stappen ontwikkeld en inmiddels doorontwikkeld tot versie 1.3.2 met onder meer:
- AuthZEN compatibele adapters voor de open-source OPA-, Cedar-, Cerbos- en OpenFGA-PDPs;
-	PAP- en PIP-backends voor beheren van policies en data;
-	generieke mock dataservice voor het simpel opzetten van een mock registratie.

{{< /chapter/section >}}

{{< chapter/section title="Werk in uitvoering" level="3">}}
De ontwikkeling gaat door. Op dit moment wordt gewerkt aan:
- een applicatie om toegangsregels te beheren;
- een uitbreiding van de docker-compose testomgeving;
- het testen van de mock dataservice door teams van het Federatief Datastelsel (FDS) en Digilab.
 
 {{< /chapter/section >}}

{{< chapter/section title="Zelf aan de slag?" level="3">}}
Alle informatie, inclusief voorbeeldcode en documentatie, is te vinden op de [GitLab-repository](https://gitlab.com/digilab.overheid.nl/ecosystem/ftv/open-ftv) van OpenFTV.
 
{{< /chapter/section >}}


