# Gevendorde JSON-LD-contexts

Deze map bevat twee elders gepubliceerde JSON-LD-contexts, ongewijzigd
gedownload, zodat de viewer JSON-LD-documenten met een remote `@context`-URL
**offline** kan expanderen (geen netwerkverkeer vanuit de viewer).

| bestand | bron-URL | gedownload | licentie |
| --- | --- | --- | --- |
| `odrl.jsonld` | <http://www.w3.org/ns/odrl.jsonld> | 2026-08-17 | © W3C — [W3C Software and Document License](https://www.w3.org/copyright/software-license/) |
| `rightsml.jsonld` | <https://iptc.org/std/RightsML/odrl-profile/rightsml.jsonld> | 2026-08-17 | © IPTC — RightsML-standaard, gepubliceerd door IPTC ([iptc.org/std/RightsML/](https://iptc.org/std/RightsML/)) |

`known-contexts.js` is een **gegenereerde** module (URL → `@context`-object)
zodat `assets/parse.js` de contexts als gewone ESM-import kan gebruiken, in
node én browser, zonder fetch of JSON-import-attributes. Niet met de hand
bewerken; hergenereren na een nieuwe download:

```
node viewer/vendor/contexts/generate.mjs
```
