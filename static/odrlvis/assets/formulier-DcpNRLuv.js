const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./formulier-bewerk-B2HJ0qRa.js","./term-Bf9Hay9m.js","./weergave-CzkVctiP.js","./web-BnbvtCw3.js","./bronbeheer-DEc52LXM.js","./edit-CE46qVb-.js","./velden-T2m5-dAn.js","./scrollanker-DoaQ7H6P.js","./scrollanker-B819f4ck.css","./velden-C8OiaRFG.css"])))=>i.map(i=>d[i]);
import{lt as e}from"./term-Bf9Hay9m.js";import{$ as t,$t as n,Bt as r,C as i,D as a,Gt as o,J as s,Kt as c,Lt as l,Nt as u,Q as d,Rt as f,S as p,Vt as m,Wt as h,X as g,Y as _,Z as v,d as y,et as b,it as x,jt as S,nt as C,q as ee,rt as te,tt as ne,u as w,v as T,x as re,zt as ie}from"./weergave-CzkVctiP.js";import{a as E,c as D,d as O,f as ae,i as oe,o as k,r as se,u as ce}from"./web-BnbvtCw3.js";import{_ as le}from"./bronbeheer-DEc52LXM.js";import{a as ue,f as de,u as fe}from"./scrollanker-DoaQ7H6P.js";import{t as pe}from"./kopselectie-CSC_6VT1.js";var me=`# =============================================================================
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
`,he=b,A=ee,ge=ne,j=v,_e=_,ve=d,ye=s,be=te,M=C,xe=t,Se=x,N=null;function P(e){let t=i();return(!N||N.g!==e||N.v!==t)&&(N={g:e,v:t,shapes:he(e)}),N.shapes}function Ce(){return A([me])[0]||null}function F(e,t){i();let n=p();if(!n||!e)return null;let r=ge(n,e,P(n),A([me]))||t;return r?j(n,e,r):null}function we(e){return F(e,null)}var I=null;function L(e){let t=i();if(I&&I.g===e&&I.v===t)return I.klassen;let n=_e(e,P(e));return I={g:e,v:t,klassen:n},n}function R(e){let t=p();return!t||!e?!1:ve(t,e,L(t))}var z=null;function B(e){let t=i();if(z&&z.g===e&&z.v===t)return z.ix;let n=be(e,P(e));return z={g:e,v:t,ix:n},n}function Te(e){let t=p();return!t||!e?[]:xe(t,e,M(t,e,B(t)))}var Ee=g;function De(e,t){i();let n=p();if(!n||!e)return null;let r=e+`\0`+(t||``),a=Oe(n),o=a.get(r);if(o!==void 0)return o;let s=M(n,e,B(n)),c=s?j(n,e,s):we(e),l=c?Ee(c,t):null;return a.set(r,l),l}var V=null;function Oe(t){let n=i(),r=e();return V&&V.g===t&&V.v===n&&V.taal===r||(V={g:t,v:n,taal:r,m:new Map}),V.m}function ke(e){return!!e&&(e.blocks.length>0||!!e.description)}function Ae(e){return e.length>=2?e[e.length-2]:null}function je(e){let t=p();return!t||!e?null:Se(t,M(t,e,B(t)))}function Me(){let e=re();if(e!==null)return e;let t=p();return t?ye(t,L(t)):0}function Ne(e){return F(e,Ce())}var H=`odrlvis.`;function Pe(e,t){try{let n=globalThis.localStorage?.getItem(H+e);return n==null?t:JSON.parse(n)}catch{return t}}function Fe(e,t){try{globalThis.localStorage?.setItem(H+e,JSON.stringify(t))}catch{}}function U(){return`open:`+[...y.src,...y.ttl,...y.sparql?[y.sparql]:[]].sort().join(`|`)}var[Ie,Le]=h(0),Re=null,W=null;function ze(e){if(W===null||Re!==e){let t=Pe(e,[]);W=new Set(Array.isArray(t)?t:[]),Re=e}return W}var Be=new Map,[Ve,He]=h(0),Ue=null;function We(){let e=U();return Ue!==e&&(Be.clear(),Ue=e),Be}function Ge(e){if(!e)return null;Ve();let t=We().get(e);return t===void 0?null:t}function Ke(e){return Ge(e)===!0}function qe(e,t){if(!e)return;let n=We();n.get(e)!==t&&(n.set(e,t),He(e=>e+1))}function Je(e){return Ie(),e?ze(U()).has(e):!1}function Ye(e,t){if(!e)return;let n=U(),r=ze(n),i=r.has(e);t?r.add(e):r.delete(e),r.has(e)!==i&&(Fe(n,[...r]),Le(e=>e+1))}var Xe=O(`<span class=longtext><span></span> <button type=button class=toggle-more>`),Ze=O(`<span>`);function Qe(e){return e.slice(0,600).trimEnd()+`…`}function G(e){let[t,n]=h(!1),r=()=>String(e.tekst??``),i=()=>r().length>600;return l(u,{get when(){return i()},get fallback(){return(()=>{var e=Ze();return E(e,r),e})()},get children(){var e=Xe(),i=e.firstChild,a=i.nextSibling.nextSibling;return E(i,(()=>{var e=k(()=>!!t());return()=>e()?r():Qe(r())})()),a.$$click=()=>n(e=>!e),E(a,(()=>{var e=k(()=>!!t());return()=>e()?w(`text.showLess`):w(`text.showMore`,{n:r().length})})()),m(()=>D(a,`aria-expanded`,t()?`true`:`false`)),e}})}oe([`click`]);var $e=12,et=40,tt=600,K=[],q=!1,nt=()=>typeof performance>`u`?Date.now():performance.now();function rt(){if(q)return;q=!0;let e=globalThis;typeof e.requestIdleCallback==`function`?e.requestIdleCallback(at,{timeout:250}):setTimeout(at,0)}function it(){let e=typeof window>`u`?0:window.innerHeight;if(!e)return 0;let t=Math.min(K.length,et);for(let n=0;n<t;n+=1){let t=K[n].el();if(!t||!t.isConnected)continue;let r=t.getBoundingClientRect();if(r.bottom>=-600&&r.top<=e+tt)return n}return 0}function at(){q=!1;let e=nt()+$e;for(;K.length;){let t=K.splice(it(),1)[0],n=t.el();if(n&&n.isConnected&&t.bouw(),nt()>=e)break}K.length&&rt()}function ot(e){K.push(e),rt()}var J=O(`<span>`),st=O(`<a target=_blank rel=noopener>`),ct=O(`<span class=c-chips>`),lt=O(`<div class=knoop-vouwen>`),Y=O(`<span class=c-ruimte> `),ut=O(`<span class="c-slot right">`),dt=O(`<span class=knoop-regel>`),ft=O(`<span class="chip type knoop-kenmerk">`),pt=O(`<span class="method knoop-type">`),mt=O(`<div class="knoop-fold knoop-fold-plat"><div class="knoop-summary knoop-kop-plat">`),ht=O(`<p class="muted knoop-laden">`),gt=O(`<details class="c-fold knoop-fold"><summary class="vl-summary knoop-summary"></summary><div class="c-fold-body knoop-fold-body">`),_t=O(`<div class=artifact-title><span>`),vt=O(`<div class=artifact-form>`),yt=O(`<span class="chip type">`),bt=O(`<p class=muted>`),xt=O(`<div class="artifact-note muted"><span class=artifact-note-label>`),St=O(`<p class="artifact-note muted"><span class=artifact-note-label>`),Ct=O(`<div class=form-group-label>`),wt=o(()=>le(()=>import(`./formulier-bewerk-B2HJ0qRa.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]),import.meta.url)),Tt=40,Et=e=>String(e).length>=Tt&&!/\s/.test(e);function X(e){let t=()=>e.v,n=()=>[e.mono?`mono`:``,Et(t().text)?`hash`:``].filter(Boolean).join(` `),r=()=>de(t().kind===`link`?t().text:t().iri);return l(u,{get when(){return k(()=>!!(t().kind===`link`||t().kind===`label`&&t().external))()?r():null},get fallback(){return l(u,{get when(){return n()},get fallback(){return(()=>{var e=J();return E(e,()=>t().text),e})()},get children(){var e=J();return E(e,()=>t().text),m(()=>se(e,n())),e}})},children:e=>(()=>{var n=st();return E(n,()=>t().text),m(()=>D(n,`href`,e())),n})()})}function Dt(e){let t=()=>!!e.rij.pattern,r=()=>e.rij.values.some(e=>e.iri&&R(e.iri)),i=n(Z),a=()=>`#${e.rij.path||e.rij.label}${e.rij.inverse?`^`:``}`;return l(u,{get when(){return!r()},get fallback(){return(()=>{var n=lt();return E(n,l(Z.Provider,{get value(){return[...i,a()]},get children(){return l(S,{get each(){return e.rij.values},children:e=>l(Ot,{get iri(){return e.iri},get children(){return l(X,{v:e,get mono(){return t()}})}})})}})),n})()},get children(){return l(u,{get when(){return e.rij.values.length>1},get fallback(){return(()=>{var n=J();return E(n,l(S,{get each(){return e.rij.values},children:e=>l(X,{v:e,get mono(){return t()}})})),n})()},get children(){var n=ct();return E(n,l(S,{get each(){return e.rij.values},children:(e,n)=>[l(u,{get when(){return n()>0},get children(){return Y()}}),(()=>{var n=ut();return E(n,l(X,{v:e,get mono(){return t()}})),n})()]})),n}})}})}var Z=f([]);function Ot(e){let t=n(Z),r=()=>e.iri||``,i=()=>!!r()&&!t.includes(r())&&R(r()),a=()=>`vorm:`+[...t,r()].join(`>`);return l(u,{get when(){return i()},get fallback(){return e.children},get children(){return l(kt,{get iri(){return r()},get sleutel(){return a()},keten:t,get children(){return e.children}})}})}function kt(e){let t=Je(e.sleutel),[n,i]=h(t),[o,s]=h(!t),d;t&&ot({el:()=>d,bouw:()=>s(!0)});let[f,p]=h(!1),[g,_]=h(!1);ie(()=>{n()&&T()&&(p(!0),a(e.iri).finally(()=>{p(!1),_(!0)}))});let v=()=>Te(e.iri).map(e=>e.text).join(` `),y=()=>je(e.iri),b=r(()=>De(e.iri,Ae(e.keten))),x=()=>!T()||g(),S=r(()=>{if(!x())return!0;let e=b();return e===null||ke(e)}),C=()=>[l(u,{get when(){return y()},children:e=>[(()=>{var t=pt();return E(t,()=>e().text),m(()=>D(t,`title`,e().afgekort?e().vol:void 0)),t})(),Y()]}),(()=>{var t=dt();return E(t,()=>e.children),t})(),l(u,{get when(){return v()},get children(){return[Y(),(()=>{var e=ft();return E(e,v),e})()]}})];return l(u,{get when(){return S()},get fallback(){return(()=>{var t=mt(),n=t.firstChild;return E(n,C),m(()=>D(t,`data-knoop`,e.iri)),t})()},children:t=>(()=>{var t=gt(),r=t.firstChild,a=r.nextSibling;t.addEventListener(`toggle`,t=>{let n=t.currentTarget.open;s(!0),i(n),Ye(e.sleutel,n)});var p=d;return typeof p==`function`?ae(p,t):d=t,ce(r,c(pe),!1,!0),E(r,C,null),E(r,l(ue,{klein:!0}),null),E(a,l(u,{get when(){return n()},get children(){return[l(u,{get when(){return f()},get children(){var e=ht();return E(e,()=>w(`vorm.loading`)),e}}),l(u,{get when(){return o()},get children(){return l(u,{get when(){return b()},children:t=>l(Z.Provider,{get value(){return[...e.keten,e.iri]},get children(){return l($,{get m(){return t()},get term(){return e.iri},kop:!1})}})})}})]}})),m(r=>{var i=e.sleutel,a=e.iri,o=n();return i!==r.e&&D(t,`data-open-key`,r.e=i),a!==r.t&&D(t,`data-knoop`,r.t=a),o!==r.a&&(t.open=r.a=o),r},{e:void 0,t:void 0,a:void 0}),t})()})}var At=e=>e.values.map(e=>e.text).join(`, `),jt=e=>e.kind===`row`&&e.values.some(e=>e.iri&&R(e.iri));function Q(e){let t=()=>e.meerregelig?l(G,{get tekst(){return At(e.rij)}}):l(Dt,{get rij(){return e.rij}});return l(u,{get when(){return k(()=>!!y.editMode)()&&e.term},get fallback(){return t()},get children(){return l(wt,{get rij(){return e.rij},get term(){return e.term},get meerregelig(){return e.meerregelig}})}})}function $(e){let t=()=>e.kop!==!1,n=()=>e.m.blocks.filter(e=>e.kind===`group`),r=t=>t.map(t=>({label:t.label,desc:t.description,waarde:l(Q,{rij:t,get term(){return e.term}})}));return(()=>{var i=vt();return E(i,l(u,{get when(){return t()},get children(){var t=_t(),n=t.firstChild;return E(n,()=>e.m.title),E(t,l(S,{get each(){return e.m.keyInfo},children:e=>[Y(),(()=>{var t=yt();return E(t,()=>e.text),t})()]}),null),t}}),null),E(i,l(u,{get when(){return e.m.description},children:e=>(()=>{var t=bt();return E(t,l(G,{get tekst(){return e()}})),t})()}),null),E(i,l(S,{get each(){return e.m.blocks},children:t=>l(u,{get when(){return t.kind===`group`?t:null},get fallback(){return l(u,{get when(){return jt(t)},get fallback(){return(()=>{var n=St(),r=n.firstChild;return E(r,()=>t.label+`: `),E(n,l(Q,{rij:t,get term(){return e.term},meerregelig:!0}),null),n})()},get children(){var n=xt(),r=n.firstChild;return E(r,()=>t.label+`: `),E(n,l(Q,{rij:t,get term(){return e.term}}),null),n}})},children:e=>[l(u,{get when(){return k(()=>n().length>1)()&&t.label},get children(){var e=Ct();return E(e,()=>t.label),e}}),l(fe,{get rijen(){return r(e().rows)}})]})}),null),i})()}export{G as a,Ke as c,qe as d,Pe as f,Me as g,R as h,Ot as i,Ge as l,Ne as m,Dt as n,U as o,Fe as p,Z as r,Je as s,$ as t,Ye as u};
//# sourceMappingURL=formulier-DcpNRLuv.js.map