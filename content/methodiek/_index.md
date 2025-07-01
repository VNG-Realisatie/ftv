---
type: 'chapter'
title: "Methodiek"
---

{{< chapter/header title="Methodiek" bg="green" icon="images/sectie-methodiek.svg">}}

De kern van het project is de gekozen methodiek, oftewel de voorgestelde werkwijze. De methodiek beschrijft vanuit technisch en functioneel perspectief hoe een oplossing voor toegang eruit moet zien om de voordelen van Federatieve Toegangsverlening (FTV) te behalen.

{{< /chapter/header >}}

{{< chapter/header bg="lightgreen" customclass="section-box-banner">}}

### In deze sectie
<div class="section-home-wrapper" role="navigation">
    <div class="section-home-box">
        <a href="principes">
            <h2 class="nl-heading nl-heading--level-4 rhc-heading">
                De principes van EAM
            </h2>
            <p class="utrecht-paragraph">
                De basisprincipes van Externalized Authorization Management (EAM)
            </p>
        </a>
    </div>
    <div class="section-home-box">
        <a href="authzen-nlgov">
           <h2 class="nl-heading nl-heading--level-4 rhc-heading">
              AuthZEN NLGov
           </h2>
            <p class="utrecht-paragraph">
                Het Nederlands profiel op de OpenID standaard voor EAM
            </p>
        </a>
    </div>
    <div class="section-home-box">
        <a href="logboek-toegangsbeslissingen">
           <h2 class="nl-heading nl-heading--level-4 rhc-heading">
              Logboek Toegangs- beslissingen
           </h2>
            <p class="utrecht-paragraph">
                Verantwoording van toegangsverlening op basis van AuthZEN
            </p>
        </a>
    </div>
    <div class="section-home-box">
        <a href="register-toegangsbeleid">
           <h2 class="nl-heading nl-heading--level-4 rhc-heading">
              Register Toegangsbeleid
           </h2>
            <p class="utrecht-paragraph">
                Wederzijds inzicht bieden in toegangsbeleid.
            </p>
        </a>
    </div>
</div>
{{< /chapter/header >}}

{{< chapter/section title="FTV-methodiek" >}}
FTV kiest voor het architectuurpatroon van [Externalized Authorization Management](principes) (EAM) voor toegangsverlening. 

Standaardisatie is bij uitstek het middel om aansluiting en uitwisseling tussen systemen te vergemakkelijken. [Open standaarden](https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/open-standaarden/) hebben daarbij de sterke voorkeur, alsmede het voortbouwen op bestaande internationale standaarden.

Daarvoor werkt FTV aan het [AuthZEN NLGov profiel](authzen-nlgov). Een Nederlands profiel op de internationale OpenID standaard genaamd AuthZEN die het EAM architectuurpatroon standaardiseert.

Om het mogelijk te maken om verleende toegangsbeslissingen te verantwoorden werkt FTV ook aan het [Logboek Toegangsbeslissingen](logboek-toegangsbeslissingen) (Decision Log.) Deze gebruikt het AuthZEN informatiemodel om historische beslissingen te kunnen verantwoorden zonder onnodig beslisgegevens te dupliceren.

Om organistaties, afdelingen en deelnemers aan (federatieve) stelsels inzicht te bieden in wederzijds toegangsbeleid zal FTV in 2026 ook de standaard [Register Toegangsbeleid](register-toegangsbeleid) ontwikkelen.
{{< /chapter/section >}}