| Eigenaar | Ingevuld door |
| --- | --- |
| Kennis centrum Architectuur | Marc de Boer |
<hr/>

# Federatieve toegangsverlening

## Welkom
Deze Gitlab omgeving hoort bij het project Federatieve Toegangsverlening. 

De documentatie hier is het best te lezen op deze locatie:<br>
https://vng-realisatie.github.io/ftv/

## Contact

Alle informatie en resultaten zijn open source beschikbaar voor iedereen.
Praat mee over FTV op ons [Mattermost](https://digilab.overheid.nl/chat/digilab/channels/federatieve-toegangsverlening) kanaal.

Neem voor meer informatie contact op met:

**Product owner**  
Marc de Boer  
[marc.deboer@vng.nl](mailto:marc.deboer@vng.nl)  
06-14460350

## Development
Gebruik voor het lokaal draaien van de site het volgende commando:

```bash
hugo server --baseURL "http://localhost:1313/ftv/" --appendPort=false
```

Het thema voor de website is te vinden in de map `themes/ftv`. Het thema is gebouwd met:

- [Tailwind CSS](http://www.tailwindcss.com)
- [Rijkshuisstijl Community](https://rijkshuisstijl-community.vercel.app/)

Om het uiteindelijke CSS bestand te genereren kan je het volgende commando gebruiken vanuit de theme folder.

```shell
npm run watch
```

