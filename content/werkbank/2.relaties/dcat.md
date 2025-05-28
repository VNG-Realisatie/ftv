---
Title: DCAT
weight: 30
---

# DCAT

DCAT is een standaard voor het catalogiseren van, primair publieke, datasets. Binnen DCAT kunnen op enkele verschillende plekken annotaties geboden worden voor toegangsverlening. Er is echter geen eenduidige wijze voor het definiëren van fijnmazige toegangsverlening zoals in deze standaard is beoogd. Hieronder bespreken we enkele beoogde de integratie punten.

## ODRL Policy op Distribution

Op het niveau van een Distribution is het mogelijk om een ODRL Policy te definiëren. Een Distribution kan echter op meerdere manieren ontsloten worden en is dus niet het gewenste niveau om fijnmazige toegangsverlening op te documenteren.

ODRL Policies op dit niveau kunnen wel gebruikt worden voor het definiëren van wederzijdse vereisten op organisatie niveau. 

### Extensie d.m.v. custom Operator

Een mogelijk extensie punt voor integratie van fijnmazige toegangsregels is het definiëren van een eigen operator binnen de ODRL Policy.

Hierbij kan bijvoorbeeld een `conformsToPolicy` operator gedefinieerd worden die verwijsty naar toegangsregels voor fijnmazige toegangsverlening. Deze kan met behulp van andere ODRL operator ook toegespitst worden op specifieke dataservices of ontsluitingsvormen.

Het nadeel hiervan is dat dit geen internationaal erkend patroon is. Het ontbreken van een gevestigde ODRL policy engine maakt het ook moeilijk in te schatten of dit patroon zal passen in de uiteindelijke policy engine.

## OpenAPI Specification on Dataservice

Een ander integratiepunt is de OpenAPI Specification van een gegeven Dataservice. Zie voor verdere detaillering daarvan de [OpenAPI Specificatie pagina](./oas).

