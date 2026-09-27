import{$ as e,At as t,Ct as n,D as r,Dt as i,Et as a,F as o,G as s,I as c,J as l,K as u,N as d,O as f,P as p,S as m,T as h,Tt as g,W as _,_t as v,a as y,bt as ee,c as te,ft as b,h as ne,j as re,jt as ie,k as ae,kt as oe,l as se,lt as ce,mt as le,nt as ue,ot as de,pt as fe,q as pe,st as me,ut as he,v as ge,vt as _e,w as ve,wt as ye,xt as be,y as xe}from"./term-DCU4LV-h.js";var x={context:void 0,registry:void 0,effects:void 0,done:!1,getContextId(){return Se(this.context.count)},getNextContextId(){return Se(this.context.count++)}};function Se(e){let t=String(e),n=t.length-1;return x.context.id+(n?String.fromCharCode(96+n):``)+t}function S(e){x.context=e}var Ce=(e,t)=>e===t,C=Symbol(`solid-proxy`),we=typeof Proxy==`function`,Te=Symbol(`solid-track`),Ee={equals:Ce},De=null,Oe=st,w=1,ke=2,Ae={owned:null,cleanups:null,context:null,owner:null},je={},T=null,E=null,D=null,O=null,k=null,Me=0;function Ne(e,t){let n=D,r=T,i=e.length===0,a=t===void 0?r:t,o=i?Ae:{owned:null,cleanups:null,context:a?a.context:null,owner:a},s=i?e:()=>e(()=>M(()=>P(o)));T=o,D=null;try{return N(s,!0)}finally{D=n,T=r}}function A(e,t){t=t?Object.assign({},Ee,t):Ee;let n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0};return[et.bind(n),e=>(typeof e==`function`&&(e=E&&E.running&&E.sources.has(n)?e(n.tValue):e(n.value)),tt(n,e))]}function Pe(e,t,n){nt(it(e,t,!0,w))}function Fe(e,t,n){nt(it(e,t,!1,w))}function Ie(e,t,n){Oe=ct;let r=it(e,t,!1,w),i=Qe&&Xe(Qe);i&&(r.suspense=i),(!n||!n.render)&&(r.user=!0),k?k.push(r):nt(r)}function j(e,t,n){n=n?Object.assign({},Ee,n):Ee;let r=it(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,nt(r),et.bind(r)}function Le(e){return e&&typeof e==`object`&&`then`in e}function Re(e,t,n){let r,i,a;typeof t==`function`?(r=e,i=t,a=n||{}):(r=!0,i=e,a=t||{});let o=null,s=je,c=null,l=!1,u=!1,d=`initialValue`in a,f=typeof r==`function`&&j(r),p=new Set,[m,h]=(a.storage||A)(a.initialValue),[g,_]=A(void 0),[v,y]=A(void 0,{equals:!1}),[ee,te]=A(d?`ready`:`unresolved`);T&&He(()=>{for(let e of p.keys())e.decrement();p.clear(),E&&o&&E.promises.delete(o),o=null}),x.context&&(c=x.getNextContextId(),a.ssrLoadFrom===`initial`?s=a.initialValue:x.load&&x.has(c)&&(s=x.load(c)));function b(e,t,n,r){return o===e&&(o=null,r!==void 0&&(d=!0),(e===s||t===s)&&a.onHydrated&&queueMicrotask(()=>a.onHydrated(r,{value:t})),s=je,E&&e&&l?(E.promises.delete(e),l=!1,N(()=>{E.running=!0,ne(t,n)},!1)):ne(t,n)),t}function ne(e,t){N(()=>{t===void 0&&h(()=>e),te(t===void 0?d?`ready`:`unresolved`:`errored`),_(t);for(let e of p.keys())e.decrement();p.clear()},!1)}function re(){let e=Qe&&Xe(Qe),t=m(),n=g();if(n!==void 0&&!o)throw n;return D&&!D.user&&e&&Pe(()=>{v(),o&&(e.resolved&&E&&l?E.promises.add(o):p.has(e)||(e.increment(),p.add(e)))}),t}function ie(e=!0){if(e!==!1&&u)return;u=!1;let t=f?f():r;if(l=E&&E.running,t==null||t===!1){b(o,M(m));return}E&&o&&E.promises.delete(o);let n,a=s===je?M(()=>{try{return i(t,{value:m(),refetching:e})}catch(e){n=e}}):s;if(n!==void 0){b(o,void 0,ft(n),t);return}return Le(a)?(o=a,`v`in a?(a.s===1?b(o,a.v,void 0,t):b(o,void 0,ft(a.v),t),a):(u=!0,queueMicrotask(()=>u=!1),N(()=>{te(d?`refreshing`:`pending`),y()},!1),a.then(e=>b(a,e,void 0,t),e=>b(a,void 0,ft(e),t)))):(b(o,a,void 0,t),a)}Object.defineProperties(re,{state:{get:()=>ee()},error:{get:()=>g()},loading:{get(){let e=ee();return e===`pending`||e===`refreshing`}},latest:{get(){if(!d)return re();let e=g();if(e&&!o)throw e;return m()}}});let ae=T;return f?Pe(()=>(ae=T,ie(!1))):ie(!1),[re,{refetch:e=>Ge(ae,()=>ie(e)),mutate:h}]}function ze(e){return N(e,!1)}function M(e){if(D===null)return e();let t=D;D=null;try{return e()}finally{D=t}}function Be(e,t,n){let r=Array.isArray(e),i,a=n&&n.defer;return n=>{let o;if(r){o=Array(e.length);for(let t=0;t<e.length;t++)o[t]=e[t]()}else o=e();if(a)return a=!1,n;let s=M(()=>t(o,i,n));return i=o,s}}function Ve(e){Ie(()=>M(e))}function He(e){return T===null||(T.cleanups===null?T.cleanups=[e]:T.cleanups.push(e)),e}function Ue(){return D}function We(){return T}function Ge(e,t){let n=T,r=D;T=e,D=null;try{return N(t,!0)}catch(e){mt(e)}finally{T=n,D=r}}var[Ke,qe]=A(!1);function Je(e){k.push.apply(k,e),e.length=0}function Ye(e,t){let n=Symbol(`context`);return{id:n,Provider:gt(n),defaultValue:e}}function Xe(e){let t;return T&&T.context&&(t=T.context[e.id])!==void 0?t:e.defaultValue}function Ze(e){let t=j(e),n=j(()=>ht(t()));return n.toArray=()=>{let e=n();return Array.isArray(e)?e:e==null?[]:[e]},n}var Qe;function $e(){return Qe||=Ye()}function et(){let e=E&&E.running;if(this.sources&&(e?this.tState:this.state)){if((e?this.tState:this.state)===w)nt(this);else{let e=O;O=null,N(()=>lt(this),!1),O=e}}if(D){let e=this.observers;if(!e||e[e.length-1]!==D){let t=e?e.length:0;D.sources?(D.sources.push(this),D.sourceSlots.push(t)):(D.sources=[this],D.sourceSlots=[t]),e?(e.push(D),this.observerSlots.push(D.sources.length-1)):(this.observers=[D],this.observerSlots=[D.sources.length-1])}}return e&&E.sources.has(this)?this.tValue:this.value}function tt(e,t,n){let r=E&&E.running&&E.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(r,t)){if(E){let r=E.running;(r||!n&&E.sources.has(e))&&(E.sources.add(e),e.tValue=t),r||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&N(()=>{for(let t=0;t<e.observers.length;t+=1){let n=e.observers[t],r=E&&E.running;r&&E.disposed.has(n)||((r?!n.tState:!n.state)&&(n.pure?O.push(n):k.push(n),n.observers&&ut(n)),r?n.tState=w:n.state=w)}if(O.length>1e6)throw O=[],Error()},!1)}return t}function nt(e){if(!e.fn)return;P(e);let t=Me;rt(e,E&&E.running&&E.sources.has(e)?e.tValue:e.value,t),E&&!E.running&&E.sources.has(e)&&queueMicrotask(()=>{N(()=>{E&&(E.running=!0),D=T=e,rt(e,e.tValue,t),D=T=null},!1)})}function rt(e,t,n){let r,i=T,a=D;D=T=e;try{r=e.fn(t)}catch(t){return e.pure&&(E&&E.running?(e.tState=w,e.tOwned&&e.tOwned.forEach(P),e.tOwned=void 0):(e.state=w,e.owned&&e.owned.forEach(P),e.owned=null)),e.updatedAt=n+1,mt(t)}finally{D=a,T=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&`observers`in e?tt(e,r,!0):E&&E.running&&e.pure?(E.sources.has(e)||(e.value=r),E.sources.add(e),e.tValue=r):e.value=r,e.updatedAt=n)}function it(e,t,n,r=w,i){let a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:T,context:T?T.context:null,pure:n};return E&&E.running&&(a.state=0,a.tState=r),T===null||T!==Ae&&(E&&E.running&&T.pure?T.tOwned?T.tOwned.push(a):T.tOwned=[a]:T.owned?T.owned.push(a):T.owned=[a]),a}function at(e){let t=E&&E.running;if((t?e.tState:e.state)===0)return;if((t?e.tState:e.state)===ke)return lt(e);if(e.suspense&&M(e.suspense.inFallback))return e.suspense.effects.push(e);let n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Me);){if(t&&E.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let r=n.length-1;r>=0;r--){if(e=n[r],t){let t=e,i=n[r+1];for(;(t=t.owner)&&t!==i;)if(E.disposed.has(t))return}if((t?e.tState:e.state)===w)nt(e);else if((t?e.tState:e.state)===ke){let t=O;O=null,N(()=>lt(e,n[0]),!1),O=t}}}function N(e,t){if(O)return e();let n=!1;t||(O=[]),k?n=!0:k=[],Me++;try{let t=e();return ot(n),t}catch(e){n||(k=null),O=null,mt(e)}}function ot(e){if(O&&=(st(O),null),e)return;let t;if(E){if(!E.promises.size&&!E.queue.size){let e=E.sources,n=E.disposed;k.push.apply(k,E.effects),t=E.resolve;for(let e of k)`tState`in e&&(e.state=e.tState),delete e.tState;E=null,N(()=>{for(let e of n)P(e);for(let t of e){if(t.value=t.tValue,t.owned)for(let e=0,n=t.owned.length;e<n;e++)P(t.owned[e]);t.tOwned&&(t.owned=t.tOwned),delete t.tValue,delete t.tOwned,t.tState=0}qe(!1)},!1)}else if(E.running){E.running=!1,E.effects.push.apply(E.effects,k),k=null,qe(!0);return}}let n=k;k=null,n.length&&N(()=>Oe(n),!1),t&&t()}function st(e){for(let t=0;t<e.length;t++)at(e[t])}function ct(e){let t,n=0;for(t=0;t<e.length;t++){let r=e[t];r.user?e[n++]=r:at(r)}if(x.context){if(x.count){x.effects||=[],x.effects.push(...e.slice(0,n));return}S()}for(x.effects&&(x.done||!x.count)&&(e=[...x.effects,...e],n+=x.effects.length,delete x.effects),t=0;t<n;t++)at(e[t])}function lt(e,t){let n=E&&E.running;n?e.tState=0:e.state=0;for(let r=0;r<e.sources.length;r+=1){let i=e.sources[r];if(i.sources){let e=n?i.tState:i.state;e===w?i!==t&&(!i.updatedAt||i.updatedAt<Me)&&at(i):e===ke&&lt(i,t)}}}function ut(e){let t=E&&E.running;for(let n=0;n<e.observers.length;n+=1){let r=e.observers[n];(t?!r.tState:!r.state)&&(t?r.tState=ke:r.state=ke,r.pure?O.push(r):k.push(r),r.observers&&ut(r))}}function P(e){let t;if(e.sources)for(;e.sources.length;){let t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){let e=r.pop(),i=t.observerSlots.pop();n<r.length&&(e.sourceSlots[i]=n,r[n]=e,t.observerSlots[n]=i)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)P(e.tOwned[t]);delete e.tOwned}if(E&&E.running&&e.pure)dt(e,!0);else if(e.owned){for(t=e.owned.length-1;t>=0;t--)P(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}E&&E.running?e.tState=0:e.state=0}function dt(e,t){if(t||(e.tState=0,E.disposed.add(e)),e.owned)for(let t=0;t<e.owned.length;t++)dt(e.owned[t])}function ft(e){return e instanceof Error?e:Error(typeof e==`string`?e:`Unknown error`,{cause:e})}function pt(e,t,n){try{for(let n of t)n(e)}catch(e){mt(e,n&&n.owner||null)}}function mt(e,t=T){let n=De&&t&&t.context&&t.context[De],r=ft(e);if(!n)throw r;k?k.push({fn(){pt(r,n,t)},state:w}):pt(r,n,t)}function ht(e){if(typeof e==`function`&&!e.length)return ht(e());if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++){let r=ht(e[n]);if(Array.isArray(r)){if(r.length<32768)t.push.apply(t,r);else for(let e=0;e<r.length;e++)t.push(r[e])}else t.push(r)}return t}return e}function gt(e,t){return function(t){let n;return Fe(()=>n=M(()=>(T.context={...T.context,[e]:t.value},Ze(()=>t.children))),void 0),n}}var _t=Symbol(`fallback`);function vt(e){for(let t=0;t<e.length;t++)e[t]()}function yt(e,t,n={}){let r=[],i=[],a=[],o=0,s=t.length>1?[]:null;return He(()=>vt(a)),()=>{let c=e()||[],l=c.length,u,d;return c[Te],M(()=>{let e,t,p,m,h,g,_,v,y;if(l===0)o!==0&&(vt(a),a=[],r=[],i=[],o=0,s&&=[]),n.fallback&&(r=[_t],i[0]=Ne(e=>(a[0]=e,n.fallback())),o=1);else if(o===0){for(i=Array(l),d=0;d<l;d++)r[d]=c[d],i[d]=Ne(f);o=l}else{for(p=Array(l),m=Array(l),s&&(h=Array(l)),g=0,_=Math.min(o,l);g<_&&r[g]===c[g];g++);for(_=o-1,v=l-1;_>=g&&v>=g&&r[_]===c[v];_--,v--)p[v]=i[_],m[v]=a[_],s&&(h[v]=s[_]);for(e=new Map,t=Array(v+1),d=v;d>=g;d--)y=c[d],u=e.get(y),t[d]=u===void 0?-1:u,e.set(y,d);for(u=g;u<=_;u++)y=r[u],d=e.get(y),d!==void 0&&d!==-1?(p[d]=i[u],m[d]=a[u],s&&(h[d]=s[u]),d=t[d],e.set(y,d)):a[u]();for(d=g;d<l;d++)d in p?(i[d]=p[d],a[d]=m[d],s&&(s[d]=h[d],s[d](d))):i[d]=Ne(f);i=i.slice(0,o=l),r=c.slice(0)}return i});function f(e){if(a[d]=e,s){let[e,n]=A(d);return s[d]=n,t(c[d],e)}return t(c[d])}}}function bt(e,t){return M(()=>e(t||{}))}function xt(){return!0}var St={get(e,t,n){return t===C?n:e.get(t)},has(e,t){return t===C||e.has(t)},set:xt,deleteProperty:xt,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:xt,deleteProperty:xt}},ownKeys(e){return e.keys()}};function Ct(e){return(e=typeof e==`function`?e():e)?e:{}}function wt(){for(let e=0,t=this.length;e<t;++e){let t=this[e]();if(t!==void 0)return t}}function Tt(...e){let t=!1;for(let n=0;n<e.length;n++){let r=e[n];t||=!!r&&C in r,e[n]=typeof r==`function`?(t=!0,j(r)):r}if(we&&t)return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){let r=Ct(e[n])[t];if(r!==void 0)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in Ct(e[n]))return!0;return!1},keys(){let t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(Ct(e[n])));return[...new Set(t)]}},St);let n={},r=Object.create(null);for(let t=e.length-1;t>=0;t--){let i=e[t];if(!i)continue;let a=Object.getOwnPropertyNames(i);for(let e=a.length-1;e>=0;e--){let t=a[e];if(t===`__proto__`||t===`constructor`)continue;let o=Object.getOwnPropertyDescriptor(i,t);if(!r[t])r[t]=o.get?{enumerable:!0,configurable:!0,get:wt.bind(n[t]=[o.get.bind(i)])}:o.value===void 0?void 0:o;else{let e=n[t];e&&(o.get?e.push(o.get.bind(i)):o.value!==void 0&&e.push(()=>o.value))}}}let i={},a=Object.keys(r);for(let e=a.length-1;e>=0;e--){let t=a[e],n=r[t];n&&n.get?Object.defineProperty(i,t,n):i[t]=n?n.value:void 0}return i}function Et(e,...t){let n=t.length;if(we&&C in e){let r=n>1?t.flat():t[0],i=new Set,a=t.map(t=>{let n=t.filter(e=>!i.has(e)&&(i.add(e),!0));return new Proxy({get(t){return n.includes(t)?e[t]:void 0},has(t){return n.includes(t)&&t in e},keys(){return n.filter(t=>t in e)}},St)});return a.push(new Proxy({get(t){return r.includes(t)?void 0:e[t]},has(t){return!r.includes(t)&&t in e},keys(){return Object.keys(e).filter(e=>!r.includes(e))}},St)),a}let r=[];for(let e=0;e<=n;e++)r[e]={};for(let i of Object.getOwnPropertyNames(e)){let a=n;for(let e=0;e<t.length;e++)if(t[e].includes(i)){a=e;break}let o=Object.getOwnPropertyDescriptor(e,i);!o.get&&!o.set&&o.enumerable&&o.writable&&o.configurable?r[a][i]=o.value:Object.defineProperty(r[a],i,o)}return r}function Dt(e){let t,n,r=()=>{if(!n){let r=n=e();r.then(e=>{t=()=>e.default},()=>{n===r&&(n=void 0)})}return n},i=e=>{let n=x.context;if(n){let[e,i]=A();x.count||=0,x.count++,r().then(e=>{!x.done&&S(n),x.count--,i(()=>e.default),S()},e=>{!x.done&&S(n),x.count--,i(()=>()=>{throw e}),S()}),t=e}else if(!t){let[e]=Re(()=>r().then(e=>e.default));t=e,He(()=>t=void 0)}let i;return j(()=>(i=t?.())?M(()=>{if(!n||x.done)return i(e);let t=x.context;S(n);let r=i(e);return S(t),r}):``)};return i.preload=()=>r(),i}var Ot=e=>`Stale read from <${e}>.`;function kt(e){let t=`fallback`in e&&{fallback:()=>e.fallback};return j(yt(()=>e.each,e.children,t||void 0))}function At(e){let t=e.keyed,n=j(()=>e.when,void 0,void 0),r=t?n:j(n,void 0,{equals:(e,t)=>!e==!t});return j(()=>{let i=r();if(i){let a=e.children;return typeof a==`function`&&a.length>0?M(()=>a(t?i:()=>{if(!M(r))throw Ot(`Show`);return n()})):a}return e.fallback},void 0,void 0)}function jt(e){let t=Ze(()=>e.children),n=j(()=>{let e=t(),n=Array.isArray(e)?e:[e],r=()=>void 0;for(let e=0;e<n.length;e++){let t=e,i=n[e],a=r,o=j(()=>a()?void 0:i.when,void 0,void 0),s=i.keyed?o:j(o,void 0,{equals:(e,t)=>!e==!t});r=()=>a()||(s()?[t,o,i]:void 0)}return r});return j(()=>{let t=n()();if(!t)return e.fallback;let[r,i,a]=t,o=a.children;return typeof o==`function`&&o.length>0?M(()=>o(a.keyed?i():()=>{if(M(n)()?.[0]!==r)throw Ot(`Match`);return i()})):o},void 0,void 0)}function Mt(e){return e}var Nt=Ye();function Pt(e){let t=0,n,r,i,a,o,[s,c]=A(!1),l=$e(),u={increment:()=>{++t===1&&c(!0)},decrement:()=>{--t===0&&c(!1)},inFallback:s,effects:[],resolved:!1},d=We();if(x.context&&x.load){let e=x.getContextId(),t=x.load(e);if(t&&(typeof t!=`object`||t.s!==1?i=t:x.gather(e)),i&&i!==`$$f`){let[t,n]=A(void 0,{equals:!1});a=t,i.then(()=>{if(x.done)return n();x.gather(e),S(r),n(),S()},e=>{o=e,n()})}}let f=Xe(Nt);f&&(n=f.register(u.inFallback));let p;return He(()=>p&&p()),bt(l.Provider,{value:u,get children(){return j(()=>{if(o)throw o;if(r=x.context,a){a(),a=void 0;return}r&&i===`$$f`&&S();let t=j(()=>e.children);return j(a=>{let o=u.inFallback(),{showContent:s=!0,showFallback:c=!0}=n?n():{};if((!o||i&&i!==`$$f`)&&s)return u.resolved=!0,p&&p(),p=r=i=void 0,Je(u.effects),t();if(c)return p?a:Ne(t=>(p=t,r&&=(S({id:r.id+`F`,count:0}),void 0),e.fallback),d)})})}})}var{Store:Ft,termFromId:It}=oe;function Lt(){return new Ft}function Rt(e,{termText:t,termOffsets:n,quadTable:r},{chunkSize:i=25e3,onProgress:a=null}={}){let o=n.length-1,s=Array(o);for(let e=0;e<o;e++)s[e]=It(t.substring(n[e],n[e+1]));let c=e._entityIndex;if(c&&c._termToNewNumericId)for(let e of s)c._termToNewNumericId(e);let l=e=>s[e],u=r.length/4;return new Promise(t=>{let n=0,o=()=>{let s=Math.min(u,n+i);for(;n<s;n++)e.addQuad(l(r[n*4]),l(r[n*4+1]),l(r[n*4+2]),l(r[n*4+3]));a&&a(n,u),n<u?setTimeout(o,0):t(e)};o()})}function zt(e,{setScope:t=null,lang:n=null,onProgress:r=null,onStore:i=null}={}){return new Promise((a,o)=>{let s;try{s=new Worker(new URL(``+new URL(`model-worker-BqMB_wbz.js`,import.meta.url).href,``+import.meta.url),{type:`module`})}catch(e){o(e);return}let c=!1,l=e=>{s.terminate(),c?i&&i(null):o(Error(e))};s.onerror=e=>l(e&&e.message?e.message:`worker failed to start`),s.onmessage=e=>{let t=e.data||{};if(t.type===`progress`){!c&&r&&r(t);return}if(t.type===`model`){c=!0,u(t.prefixes),a(t);return}if(t.type===`store`){s.terminate(),i&&i(t);return}t.type===`error`&&l(t.message)},s.postMessage({sources:e,setScope:t,lang:n,profile:v()})})}var{quad:Bt}=ie,Vt=`http://www.w3.org/ns/odrl/2/`,Ht=`http://purl.org/dc/terms/`,Ut=`https://schema.org/`,Wt=[],F=`PREFIX odrl: <http://www.w3.org/ns/odrl/2/>
PREFIX dct:  <http://purl.org/dc/terms/>
PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX schema: <https://schema.org/>
`;async function Gt(e,t,n,r){let i=await(r||globalThis.fetch)(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`,Accept:n},body:`query=`+encodeURIComponent(t)});if(!i.ok){let e=``;try{e=(await i.text()).slice(0,200)}catch{}throw Error(`SPARQL HTTP ${i.status}${e?` — `+e:``}`)}return i}async function I(e,t,n){let r=await(await Gt(e,t,`application/sparql-results+json`,n)).json();return r&&r.results&&r.results.bindings||[]}async function Kt(e,t,n){return(await Gt(e,t,`text/turtle`,n)).text()}function qt(e){return!!e&&e.termType===`BlankNode`}function Jt(e,t){let n=[],r=0;for(let t of e){if(qt(t.subject)||qt(t.object)){r++;continue}n.push(t)}return r&&console.warn(`SPARQL Update: skipped ${r} ${t} triple(s) with a blank node (DELETE/INSERT DATA allows none)`),{kept:n,skipped:r}}var Yt=/^[A-Za-z]+(-[A-Za-z0-9]+)*$/;function Xt(e){if(!Yt.test(String(e)))throw Error(`invalid language tag for SPARQL: `+e)}function Zt(e){e&&(e.termType===`NamedNode`?L(e.value):e.termType===`Literal`&&(e.language&&Xt(e.language),e.datatype&&Zt(e.datatype)))}function Qt(e){let n=new t,r=e.map(e=>(Zt(e.subject),Zt(e.predicate),Zt(e.object),Bt(e.subject,e.predicate,e.object)));return n.quadsToString(r)}function $t(e){return`DELETE { GRAPH ?g { ?s ?p ?o } }\nWHERE {\n  VALUES (?s ?p ?o) {\n    ${e.map(e=>`(${Qt([e]).trim().replace(/\s*\.$/,``)})`).join(`
    `)}\n  }\n  GRAPH ?g { ?s ?p ?o }\n}`}function en({added:e=[],removed:t=[]}={}){let n=Jt(t,`DELETE`),r=Jt(e,`INSERT`),i=[];return n.kept.length&&(i.push(`DELETE DATA {
`+Qt(n.kept)+`}`),i.push($t(n.kept))),r.kept.length&&i.push(`INSERT DATA {
`+Qt(r.kept)+`}`),{query:i.join(`;
`),skipped:n.skipped+r.skipped}}async function tn(e,t,n){let r=await(n||globalThis.fetch)(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`},body:`update=`+encodeURIComponent(t)}),i=``;try{i=(await r.text()).slice(0,200)}catch{}if(!r.ok)throw Error(`SPARQL update HTTP ${r.status}${i?` — `+i:``}`)}function L(e){let t=String(e||``);if(!/^[^<>"{}|^`\\\s]+$/.test(t))throw Error(`invalid IRI for SPARQL: `+t);return`<`+t+`>`}function R(e,t){return!t||!t.length?``:`FILTER(${e} NOT IN (${t.map(L).join(`, `)}))`}var nn=a.find(e=>e.id===`prov`);function z(e,t){let n=[...nn.memberPreds.map(n=>`{ ${e} <${n}> ${t} }`),...nn.inverseMemberPreds.map(n=>`{ ${t} <${n}> ${e} }`)];return n.length===1?n[0].replace(/^\{ | \}$/g,``)+` .`:n.join(` UNION `)}var rn=i.map(e=>`<${e}>`).join(`|`),an=(e,t,n,r)=>`  OPTIONAL { ${e} schema:validFrom ${n}_s }
  OPTIONAL { ${e} schema:validThrough ${r}_s }
  OPTIONAL {
    ${e} dct:valid ${t} .
    OPTIONAL { ${t} dcat:startDate ${n}_n }
    OPTIONAL { ${t} dcat:endDate ${r}_n }
  }
  BIND(COALESCE(${n}_s, ${n}_n) AS ${n})
  BIND(COALESCE(${r}_s, ${r}_n) AS ${r})`;function on(){return`${F}
SELECT ?policy ?kind
       (SAMPLE(?t)   AS ?title)
       (SAMPLE(?a)   AS ?assignee) (SAMPLE(?al) AS ?assigneeLabel)
       (SAMPLE(?c)   AS ?container) (SAMPLE(?ct) AS ?containerTitle)
       (SAMPLE(?vc)  AS ?versionCount)
       (SAMPLE(?iss) AS ?issued)
       (SAMPLE(?vf)  AS ?validFrom) (SAMPLE(?vt) AS ?validTo)
       (SAMPLE(?vn)  AS ?valid)
       (SAMPLE(?rev) AS ?revisionOf)
       (SAMPLE(?ofX) AS ?offerRef)
       (SAMPLE(?rqX) AS ?requestRef)
       (SAMPLE(?ansX) AS ?answeredByRef)
WHERE {
  VALUES (?type ?kind) { (odrl:Set "set") (odrl:Offer "offer") (odrl:Agreement "agreement") (odrl:Request "request") }
  ?policy a ?type .
  FILTER(isIRI(?policy))
  OPTIONAL { ?policy dct:title ?t }
  OPTIONAL {
    { ?policy odrl:assignee ?a } UNION { ?policy odrl:permission/odrl:assignee ?a }
    OPTIONAL { ?a rdfs:label|skos:prefLabel ?al }
  }
  OPTIONAL {
    { SELECT ?policy (SAMPLE(?cX) AS ?c) (SAMPLE(?ctX) AS ?ct)
             (SAMPLE(?vcX) AS ?vc)
      WHERE {
        { SELECT ?cX (COUNT(DISTINCT ?v) AS ?vcX) WHERE {
            ${z(`?cX`,`?v`)}
            FILTER(isIRI(?v))
            # A version is a TYPED policy OR a document version (stub): a
            # member that carries no ODRL type but does carry version data.
            # The same check as readTemporalContainers. Without the stub branch
            # a register that keeps superseded versions as bare entities counts
            # every agreement as one version, and the arrows stay away on every
            # collapsed card. The type-check alternative without a subquery
            # measured an order of magnitude slower, so this form stays.
            { VALUES ?vt { odrl:Set odrl:Offer odrl:Agreement odrl:Request } ?v a ?vt }
            UNION
            { ?v ${rn} ?vd }
          } GROUP BY ?cX }
        ${z(`?cX`,`?policy`)}
        OPTIONAL { ?cX dct:title ?ctX }
      } GROUP BY ?policy }
  }
  # Dating of the version: dct:issued (what the version navigator shows) and the
  # validity period. Without these branches the chip showed a dash everywhere in
  # list mode.
  OPTIONAL { ?policy dct:issued ?iss }
${an(`?policy`,`?vn`,`?vf`,`?vt`)}
  OPTIONAL { ?policy prov:wasRevisionOf ?rev }
  # Agreement -> Offer link (SAMPLE: one per policy), so the skeleton graph can
  # fill the back-reference list on an offer card. The type check keeps
  # legal-basis and source references out.
  OPTIONAL { ?policy prov:wasDerivedFrom ?ofX . ?ofX a odrl:Offer }
  # Agreement -> Request link, along the same predicate and with the same type
  # check, but in its OWN column: an agreement usually carries BOTH, and one
  # SAMPLE would drop one of them at random. This lets a request card show its
  # decision row without the agreement's detail being loaded; without this
  # branch every request looked unanswered.
  OPTIONAL { ?policy prov:wasDerivedFrom ?rqX . ?rqX a odrl:Request }
  # The same relation once more, but REVERSED: which agreement points at THIS
  # policy? On a request row that is the agreement it was decided in, which is
  # what the fixed row on the request card hangs on.
  #
  # Why the column above is not enough: it is a SAMPLE PER AGREEMENT, and an
  # agreement often comes from SEVERAL requests. The unchosen ones then looked
  # unanswered, while this direction reaches them all. The other way round the
  # SAMPLE is safe: one request leads to one decision.
  # Measured (25-8, Fuseki, 3 rounds, /brp-ap) with/without: 0.47/0.56 s — within
  # the noise, and the answer grows only marginally.
  OPTIONAL { ?ansX prov:wasDerivedFrom ?policy . ?ansX a odrl:Agreement }
}
GROUP BY ?policy ?kind
`}function sn(){return`${F}
SELECT ?policy ?kind ?title ?assignee ?assigneeLabel
WHERE {
  VALUES (?type ?kind) { (odrl:Set "set") (odrl:Offer "offer") (odrl:Agreement "agreement") (odrl:Request "request") }
  ?policy a ?type .
  FILTER(isIRI(?policy))
  OPTIONAL { ?policy dct:title ?title }
  OPTIONAL {
    { ?policy odrl:assignee ?assignee } UNION { ?policy odrl:permission/odrl:assignee ?assignee }
    OPTIONAL { ?assignee rdfs:label|skos:prefLabel ?assigneeLabel }
  }
}
`}function cn(){return`${F}
SELECT ?container ?policy ?containerTitle
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ${z(`?container`,`?policy`)}
  FILTER(isIRI(?container) && isIRI(?policy))
  OPTIONAL { ?container dct:title ?containerTitle }
}
`}function ln(){return`${F}
SELECT ?container (COUNT(DISTINCT ?v) AS ?n)
WHERE {
  ${z(`?container`,`?v`)}
  FILTER(isIRI(?container) && isIRI(?v))
  { VALUES ?vt { odrl:Set odrl:Offer odrl:Agreement odrl:Request } ?v a ?vt }
  UNION
  { ?v ${rn} ?vd }
}
GROUP BY ?container
`}function un(){return`${F}
SELECT ?policy ?issued ?validFrom ?validTo ?valid ?revisionOf
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  FILTER(isIRI(?policy))
  OPTIONAL { ?policy dct:issued ?issued }
${an(`?policy`,`?valid`,`?validFrom`,`?validTo`)}
  OPTIONAL { ?policy prov:wasRevisionOf ?revisionOf }
}
`}function dn(){return`${F}
SELECT DISTINCT ?policy ?offer
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?offer .
  ?offer a odrl:Offer .
  FILTER(isIRI(?policy))
}
`}function fn(){return`${F}
SELECT DISTINCT ?policy ?request
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?request .
  ?request a odrl:Request .
  FILTER(isIRI(?policy))
}
`}function pn(){return`${F}
SELECT DISTINCT ?policy ?agreement
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?agreement prov:wasDerivedFrom ?policy .
  ?agreement a odrl:Agreement .
  FILTER(isIRI(?policy))
}
`}function mn(e,t,n,r,i,{lang:a=null,requestRefs:o=[],answeredByRefs:s=[]}={}){let c=e=>e?e.value:null,l=a||me(),u=(e,t)=>!e||ce(t[`xml:lang`]||``,l)<ce(e[`xml:lang`]||``,l),d=new Map;for(let e of t||[]){let t=c(e&&e.policy);if(!t||!e.container)continue;let n=d.get(t);n||(n={container:e.container,containerTitle:null},d.set(t,n)),e.containerTitle&&e.container.value===n.container.value&&u(n.containerTitle,e.containerTitle)&&(n.containerTitle=e.containerTitle)}let f=new Map;for(let e of n||[]){let t=c(e&&e.container);t&&e.n&&(f.has(t)||f.set(t,e.n))}let p=[`issued`,`validFrom`,`validTo`,`valid`,`revisionOf`],m=new Map;for(let e of r||[]){let t=c(e&&e.policy);if(!t)continue;let n=m.get(t);n||(n={},m.set(t,n));for(let t of p)!n[t]&&e[t]&&(n[t]=e[t])}let h=new Map;for(let e of i||[]){let t=c(e&&e.policy);t&&e.offer&&(h.has(t)||h.set(t,e.offer))}let g=new Map;for(let e of o||[]){let t=c(e&&e.policy);t&&e.request&&(g.has(t)||g.set(t,e.request))}let _=new Map;for(let e of s||[]){let t=c(e&&e.policy);t&&e.agreement&&(_.has(t)||_.set(t,e.agreement))}let v=[],y=new Map;for(let t of e||[]){if(!t||!t.policy)continue;let e=t.policy.value+`\0`+(c(t.kind)||``),n=y.get(e);n||(n={policy:t.policy},t.kind&&(n.kind=t.kind),y.set(e,n),v.push(n)),t.title&&u(n.title,t.title)&&(n.title=t.title),!n.assignee&&t.assignee?(n.assignee=t.assignee,t.assigneeLabel&&(n.assigneeLabel=t.assigneeLabel)):n.assignee&&t.assigneeLabel&&t.assignee&&t.assignee.value===n.assignee.value&&u(n.assigneeLabel,t.assigneeLabel)&&(n.assigneeLabel=t.assigneeLabel)}for(let e of v){let t=e.policy.value,n=d.get(t);if(n){e.container=n.container,n.containerTitle&&(e.containerTitle=n.containerTitle);let t=f.get(n.container.value);t&&(e.versionCount=t)}let r=m.get(t);if(r)for(let t of p)r[t]&&(e[t]=r[t]);let i=h.get(t);i&&(e.offerRef=i);let a=g.get(t);a&&(e.requestRef=a);let o=_.get(t);o&&(e.answeredByRef=o)}return v}function hn(e){let t=String(e&&e.message||e||``);return/SPARQL HTTP 5\d\d/.test(t)||/\btimed out\b|\btimeout\b/i.test(t)}async function gn(e,t,{lang:n=null}={}){let[r,i,a,o,s,c,l]=await Promise.all([I(e,sn(),t),I(e,cn(),t),I(e,ln(),t),I(e,un(),t),I(e,dn(),t),I(e,fn(),t),I(e,pn(),t)]);return mn(r,i,a,o,s,{lang:n,requestRefs:c,answeredByRefs:l})}function _n({limitPerKind:e=60}={}){let t=Math.max(1,e|0),n=(e,n)=>`  {
    { SELECT ?policy WHERE { ?policy a ${e} . FILTER(isIRI(?policy)) } LIMIT ${t} }
    BIND("${n}" AS ?kind)
  }`;return`${F}
SELECT ?policy ?kind
       (SAMPLE(?t)  AS ?title)
       (SAMPLE(?a)  AS ?assignee) (SAMPLE(?al) AS ?assigneeLabel)
WHERE {
${n(`odrl:Set`,`set`)} UNION
${n(`odrl:Offer`,`offer`)} UNION
${n(`odrl:Agreement`,`agreement`)} UNION
${n(`odrl:Request`,`request`)}
  OPTIONAL { ?policy dct:title ?t }
  OPTIONAL {
    { ?policy odrl:assignee ?a } UNION { ?policy odrl:permission/odrl:assignee ?a }
    OPTIONAL { ?a rdfs:label|skos:prefLabel ?al }
  }
}
GROUP BY ?policy ?kind
`}function vn(){return`${F}
SELECT ?container ?kind ?version
       (SAMPLE(?ct)  AS ?containerTitle)
       (SAMPLE(?t)   AS ?title)
       (SAMPLE(?vf)  AS ?validFrom) (SAMPLE(?vt) AS ?validTo)
       (SAMPLE(?vn)  AS ?valid)
       (SAMPLE(?iss) AS ?issued)
WHERE {
  VALUES (?typeHint ?kind) { (odrl:Set "set") (odrl:Offer "offer") (odrl:Agreement "agreement") (odrl:Request "request") }
  ?container dct:type ?typeHint .
  ${z(`?container`,`?version`)}
  FILTER(isIRI(?container) && isIRI(?version))
  OPTIONAL { ?container dct:title ?ct }
  OPTIONAL { ?version dct:title ?t }
${an(`?version`,`?vn`,`?vf`,`?vt`)}
  OPTIONAL { ?version dct:issued ?iss }
}
GROUP BY ?container ?kind ?version
`}var yn=`http://www.w3.org/ns/odrl/2/`,bn=(e,t)=>`${e} rdf:type ?dt${t} .
      FILTER(!STRSTARTS(STR(?dt${t}), "${yn}"))`,B=`(odrl:permission|odrl:prohibition|odrl:obligation|odrl:duty|odrl:remedy|odrl:consequence|odrl:constraint|odrl:refinement|odrl:action|odrl:target|odrl:rightOperand|dct:valid|odrl:and|odrl:or|odrl:xone|odrl:andSequence|rdf:first|rdf:rest)*`,xn=`rdf:type, dct:title, dct:issued, schema:validFrom, schema:validThrough, dct:valid, odrl:uid, prov:wasRevisionOf, prov:specializationOf, prov:wasDerivedFrom`;function Sn(e,{excludeGraphs:t=Wt}={}){let n=L(e),r=(e,r,i,a)=>t&&t.length?`${n} ${B} ${e} .
    GRAPH ${a} { ${e} ${r} ${i} . }
    ${R(a,t)}`:`${n} ${B} ${e} . ${e} ${r} ${i} .`,i=(e,r,i)=>t&&t.length?`${n} ${B}${e} ${r} .
    GRAPH ${i} { ${r} ?lp ?ll . }
    ${R(i,t)}`:`${n} ${B}${e} ${r} . ${r} ?lp ?ll .`,a=`(dct:hasPart|^odrl:partOf)`,o=`(odrl:permission|odrl:prohibition|odrl:obligation|odrl:duty)`,s=`(odrl:constraint|odrl:refinement)`,c=(e,t)=>i(`/`+a,e,t),l=(e,t)=>i(`/`+a+`/rdf:type`,e,t),u=e=>t&&t.length?`${n} ${B} ?ll .
    GRAPH ${e} { ?x odrl:partOf ?ll . }
    ${R(e,t)}`:`${n} ${B} ?ll .
    ?x odrl:partOf ?ll .`,d=`prov:wasDerivedFrom`,f=(e,r)=>t&&t.length?`${n} ${d} ?req . ?req a odrl:Request .
    ?req ${e} ?x .
    GRAPH ${r} { ?x ?lp ?ll . }
    ${R(r,t)}`:`${n} ${d} ?req . ?req a odrl:Request . ?req ${e} ?x . ?x ?lp ?ll .`,p=`(odrl:permission|odrl:prohibition|odrl:obligation)?`,m=`odrl:inheritFrom`,h=(e,r,i,a)=>t&&t.length?`${n} ${m}/${B} ${e} .
    GRAPH ${a} { ${e} ${r} ${i} . }
    ${R(a,t)}`:`${n} ${m}/${B} ${e} . ${e} ${r} ${i} .`;return`${F}
CONSTRUCT {
  ?s ?p ?o .
  ?c ?cp ?co .
  ?v ?vp ?vo .
  ?x ?lp ?ll .
}
WHERE {
  {
    # 1. closure of the policy itself
    ${r(`?s`,`?p`,`?o`,`?g1`)}
  } UNION {
    # 2. temporal container (with membership to every version)
    ${z(`?c`,n)}
    ?c ?cp ?co .
    # Blank objects stay out of view — a container is a flat node — WITH one
    # exception: an unmigrated graph can still carry its validity period as a
    # blank period node. The primary form is flat literals and comes along
    # anyway.
    FILTER(!isBlank(?co) || ?cp = dct:valid)
  } UNION {
    # 3. sibling versions: metadata for the version picker (expired included)
    ${z(`?c2`,n)}
    ${z(`?c2`,`?v`)}
    ?v ?vp ?vo .
    FILTER(?vp IN (${xn}))
  } UNION {
    # 3b. FALLBACK: validity period NODES of the container and of the sibling
    # versions. On data in the primary form this branch does NOTHING — the dates
    # are flat literals there and already come with branches 2 and 3. It stays
    # for unmigrated graphs and third-party data, where the object of dct:valid
    # is a blank period node: branches 2 and 3 then fetch the dct:valid TRIPLE
    # but not the dates behind it, and the version picker stood
    # without data. The policy's own period is already in branch 1 (dct:valid sits in
    # CLOSURE_PATH). Cheap: at most one node of three triples per version, and on
    # primary-form data these variables bind nowhere.
    {
      ${z(`?cp1`,n)}
      ?cp1 dct:valid ?x .
    } UNION {
      ${z(`?cp2`,n)}
      ${z(`?cp2`,`?vp1`)}
      ?vp1 dct:valid ?x .
    }
    ?x ?lp ?ll .
  } UNION {
    # 4a. labels of touched predicates
    ${r(`?sa`,`?x`,`?oa`,`?g4a`)}
    ?x ?lp ?ll .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title))
  } UNION {
    # 4b. labels of touched IRI objects (plus rdf:type, so the model recognises
    # e.g. wasDerivedFrom targets as an odrl:Offer and can show the
    # "fills in offer" row)
    ${r(`?sb`,`?pb`,`?x`,`?g4b`)}
    FILTER(isIRI(?x))
    ?x ?lp ?ll .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))
  } UNION {
    # 4c. labels of the CLASSES of those IRI objects. A member list groups on
    # the member's rdf:type and shows the class label as the group heading.
    # Branch 4b does fetch that rdf:type, but the LABEL of the class itself is
    # one hop further; without this branch the heading fell back on the
    # localName, which is not a label and therefore does not move with the
    # language (B16). Deliberately written as ONE property path and
    # bound to the membership path, the same one the model reads. That is not a
    # style question: measured
    # on /brp this form costs 9 ms, while the same patterns written
    # as separate triples it tempts the engine into a plan an order of magnitude
    # more expensive.
    ${l(`?x`,`?g4c`)}
    FILTER(?lp IN (rdfs:label, skos:prefLabel))
  } UNION {
    # 4d. MEMBERS via the ODRL core direction. If membership hangs on the
    # COLLECTION, every member is an object within the closure and 4b supplies
    # its label and rdf:type. If it hangs on the MEMBER (the core form), the
    # member is an object nowhere and the member list would stay empty in
    # endpoint mode. This branch therefore walks the membership path explicitly —
    # the inverse hop sits IN the property path, for the same reason as 4c — and
    # fetches exactly what the member list needs: the label, the grouping type,
    # and the membership triple itself.
    # Measured on a dataset with thousands of members: with this branch the
    # whole detail query is several times faster than with the hop inside the
    # star group.
    ${c(`?x`,`?g4d`)}
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))
  } UNION {
    # 4e. THE MEMBERSHIP TRIPLE ITSELF — the branch that matters at scale.
    #
    # As part of branch 4d's predicate filter it selected on PREDICATE and not
    # on OBJECT, so every member brought along its membership of EVERY collection
    # in the store — including the thousands of agreements the reader did not
    # open.
    #
    # MEASURED at full scale: the detail of ONE agreement was megabytes and
    # nearly 180k triples, of which 99.7% were membership triples. The smaller
    # corpus the branch-4d measurement used did not show this, because there a
    # member belongs to a handful of collections.
    #
    # THE SEMANTICS STAY. The view reads membership to group the member list of
    # the collection ON SCREEN, and that collection is by definition in this
    # closure. What drops out is membership of collections that do not exist on
    # this card — material the view never
    # aangeraakt.
    ${u(`?g4e`)}
    BIND(odrl:partOf AS ?lp)
  } UNION {
    # 5a. SOURCE LOCATION: the anchor object of prov:hadPrimarySource on a rule.
    # Unlike the legal basis, this points at the PLACE in the source document the
    # rule comes from — typically a page anchor with its own label and a
    # reference to the document. Branch 4b supplies only that anchor's label and
    # type; here its OTHER own triples come along. Deliberately unfiltered on
    # predicate: which term a dataset uses for "page" is dataset knowledge and
    # does not belong in this generic layer. Blank objects stay out of view, as
    # in branch 2 — an anchor is a flat node.
    ${i(`/prov:hadPrimarySource`,`?x`,`?g5a`)}
    FILTER(!isBlank(?ll))
  } UNION {
    # 5b. the SOURCE DOCUMENT one hop behind the location: its reference and
    # title, so the view can name the location without a second query. Limited to
    # identifying fields — the rest of a document description belongs to the
    # document, not to the rule.
    ${i(`/prov:hadPrimarySource/(dct:isPartOf|dct:isFormatOf)`,`?x`,`?g5b`)}
    FILTER(?lp IN (dct:identifier, skos:notation, dct:title, rdfs:label))
  } UNION {
    # 6a. REQUEST: the odrl:Request this agreement came from, as a MINI-STUB —
    # reference, date and one minimal permission with the requester. Branch 4b
    # supplies only its label and rdf:type; this branch fetches the fields the
    # request row shows, plus the rule node the requester hangs on. Deliberately
    # FILTERED on predicate: a request that happens to be a full policy must not
    # let this detail query expand — it has its own card and therefore its own
    # detail CONSTRUCT.
    # Measured (24-8, Fuseki, 5 rounds, median) with/without these two branches,
    # Measured with a store full of requests: within the noise, and the answer
    # grows by the triples of the one request.
    ${f(p,`?g6a`)}
    FILTER(?lp IN (rdf:type, dct:identifier, skos:notation, dct:issued,
                   dct:title, rdfs:label, odrl:uid, odrl:assignee,
                   prov:wasDerivedFrom,
                   odrl:permission, odrl:prohibition, odrl:obligation))
  } UNION {
    # 6b. the REQUESTER of that request: the label of the odrl:assignee. That
    # can be an existing party IRI (whose label lives elsewhere in the graph) or
    # a party node with only an rdfs:label; both arrive here.
    ${f(p+`/odrl:assignee`,`?g6b`)}
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title))
  } UNION {
    # 6c. the OFFER that request asks for. The link itself comes with branch 6a;
    # what was missing is the other SIDE: without an rdf:type on the target the
    # model does not know it is an odrl:Offer, and then the sentence is no longer
    # a request but plain provenance. The title belongs with it because the
    # sentence shows the offer's NAME.
    #
    # Shape rule as in 6a/6b: the path after ?req in ONE property path, only the
    # FETCHING graph-scoped. Deliberately filtered to the identifying fields —
    # the offer has its own card and therefore its own detail query. Measured
    # with and without this branch and the
    # widened 6a filter: /brp-ap 008001-v6 198/193 ms (1,950 KB, the same),
    # request kind: within the noise.
    ${f(`prov:wasDerivedFrom`,`?g6c`)}
    FILTER(?lp IN (rdf:type, dct:title, rdfs:label, skos:prefLabel))
  } UNION {
    # 7a. PARENT POLICY (odrl:inheritFrom, one hop) WITH its rules: the same
    # closure as branch 1, but from the parent. Unfiltered on predicate — the
    # fold row shows the parent's rules as full rule rows and therefore needs the
    # same fields as the own rules. Without inheritFrom in the graph this branch
    # binds nowhere and costs nothing.
    ${h(`?x`,`?lp`,`?ll`,`?g7a`)}
  } UNION {
    # 7b. labels and rdf:type of the IRIs touched in that parent closure:
    # without this branch the parent row reads its rules, but the action, the
    # purpose and the targets stand there as bare localNames. Same shape and
    # same
    # predicaatfilter als tak 4b, één inheritFrom-hop verderop.
    ${h(`?sc`,`?pc`,`?x`,`?g7b`)}
    FILTER(isIRI(?x))
    ?x ?lp ?ll .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))
  } UNION {
    # 8a. COVERAGE: nodes pointing with prov:wasDerivedFrom at a RULE of this
    # policy — the machine-executable layer saying it covers that rule. Every
    # other branch walks the graph OUTwards; coverage is the only INcoming
    # direction the card needs, and without it the coverage chip stayed
    # empty in ?sparql= mode while the same source showed "covered by" five
    # times in ttl mode (found on /breda).
    #
    # The hop to the rule runs through the RULE POSITION and not through
    # "anything with an odrl:uid". That is not a detail: the policy itself also
    # carries an odrl:uid, and with that wider form the inverse hop from the
    # policy would drag in every agreement that fills in its offer (
    # one card). Nothing but a coverer points at a RULE.
    # Shape rule as in 4c/4d: the whole path in ONE property path.
    ${i(`/`+o+`/^prov:wasDerivedFrom`,`?x`,`?g8a`)}
    FILTER(?lp IN (rdf:type, rdfs:label, skos:prefLabel, dct:title,
                   dct:description, prov:wasDerivedFrom))
  } UNION {
    # 8b. the label of the CLASS of that coverer — the chip names the kind
    # beside the name, and without this hop there stood a
    # bare localName. The same relation as 4b to 4c.
    ${i(`/`+o+`/^prov:wasDerivedFrom/rdf:type`,`?x`,`?g8b`)}
    FILTER(?lp IN (rdfs:label, skos:prefLabel))
  } UNION {
    # 8c. COVERAGE AT CONSTRAINT LEVEL: nodes pointing with prov:wasDerivedFrom
    # at a CONSTRAINT of this policy. That is the centre of gravity of coverage —
    # a bundle mostly works out decision points; that the rule as a whole is
    # executed is only half the story. Without this branch the affordance
    # appeared in file mode and not in endpoint mode, on exactly the same
    # source.
    #
    # Same shape and same reasoning as 8a: the hop ends on the CONSTRAINT
    # POSITION and not on "anything with a label" — only what hangs in constraint
    # or refinement position can be a coverage target, and nothing but a coverer
    # points at such a node. The path runs over the whole closure, so rule,
    # action and collection refinements all
    # drie mee.
    ${i(`/`+s+`/^prov:wasDerivedFrom`,`?x`,`?g8c`)}
    FILTER(?lp IN (rdf:type, rdfs:label, skos:prefLabel, dct:title,
                   dct:description, prov:wasDerivedFrom))
  } UNION {
    # 8d. the label of the CLASS of that coverer — the same relation to 8c as 8b
    # has to 8a: without this hop the chip shows a bare localName.
    ${i(`/`+s+`/^prov:wasDerivedFrom/rdf:type`,`?x`,`?g8d`)}
    FILTER(?lp IN (rdfs:label, skos:prefLabel))
  }
}
`}function Cn(e,{excludeGraphs:t=Wt}={}){let n=L(e),r=(e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
    ${R(e,t)}`:n,i=`(dct:hasPart|^odrl:partOf)`;return`${F}
CONSTRUCT {
  ?m odrl:partOf ${n} .
  ?m ?lp ?ll .
  ?ty ?tp ?tl .
  ?gc odrl:partOf ?m .
  ?m odrl:partOf ?an .
  ?an ?ap ?al .
  ?an odrl:partOf ?up .
  ?up ?upp ?upl .
}
WHERE {
  {
    # a. the members themselves, with their label and type
    ${n} ${i} ?m .
    FILTER(isIRI(?m))
    OPTIONAL {
      ${r(`?g1`,`?m ?lp ?ll .
      FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    }
  } UNION {
    # b. the label of the CLASS of each member (this level's group heading)
    ${n} ${i}/rdf:type ?ty .
    ${r(`?g2`,`?ty ?tp ?tl .
    FILTER(?tp IN (rdfs:label, skos:prefLabel))`)}
  } UNION {
    # c. is there a level BELOW this member? The membership triple only.
    ${n} ${i} ?m .
    ?m ${i} ?gc .
    FILTER(isIRI(?m) && isIRI(?gc))
  } UNION {
    # d. the ANCESTORS of the members — this level's ancestry headings.
    #
    # The sub-SELECT is the whole story here. A member of one dataset is also a
    # member of hundreds of others, so a few dozen members can yield tens of
    # thousands of membership triples. Without the sub-SELECT every following
    # pattern carries those bindings; with it — DISTINCT, and the domain-type
    # requirement right INSIDE it — a handful of ancestors remain and the whole
    # level query is an order of magnitude cheaper.
    #
    # That domain-type requirement is not an optimisation but the same one the
    # model makes: only an ancestor with an rdf:type OUTSIDE the ODRL core is a
    # heading members fall under; a bare ODRL collection is another SELECTION of
    # the same members and would
    # honderden zinloze koppen opleveren. Zie groupMembersByAncestry.
    #
    # Both heading levels come from one sub-SELECT (the model's head-level
    # constant is exactly two as well): first the direct ancestor with its label,
    # then through the UNION the ancestor ABOVE it with its own. The membership
    # triples come along, or the model does not know the connection.
    { SELECT DISTINCT ?an WHERE {
        ${n} ${i}/odrl:partOf ?an .
        FILTER(isIRI(?an))
        ${bn(`?an`,`d`)}
      } }
    {
      # the membership triple member -> ancestor: without it the model does not
      # know the connection. As its own branch, AFTER the sub-SELECT, so the join
      # runs over the handful of found ancestors instead of over all
      # membership triples of every member, which measured noticeably cheaper on
      # the largest dataset.
      ${n} ${i} ?m .
      ?m odrl:partOf ?an .
      FILTER(isIRI(?m))
    } UNION {
      ${r(`?g4`,`?an ?ap ?al .
      FILTER(?ap IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    } UNION {
      ?an odrl:partOf ?up .
      FILTER(isIRI(?up))
      ${bn(`?up`,`e`)}
      ${r(`?g5`,`?up ?upp ?upl .
      FILTER(?upp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    }
  }
}
`}var wn=`PREFIX sh:   <http://www.w3.org/ns/shacl#>
PREFIX dash: <http://datashapes.org/dash#>
PREFIX shui: <http://www.w3.org/ns/shacl-ui/>
`,Tn=`(sh:name|sh:description|sh:order|sh:group|dash:viewer|dash:propertyRole|shui:viewer|shui:propertyRole)`,En=`(sh:property|sh:group)*`,Dn=`rdfs:label, skos:prefLabel, dct:title, skos:definition, dct:description, rdfs:comment`;function On({excludeGraphs:e=Wt,limit:t=200}={}){let n=Math.max(1,t|0),r=(t,n)=>e&&e.length?`GRAPH ${t} { ${n} }
    ${R(t,e)}`:n,i=`{ SELECT DISTINCT ?shape ?tc WHERE {
      ?shape a sh:NodeShape .
      ?shape sh:targetClass ?tc .
      ?shape sh:property/${Tn} ?ann .
      FILTER(isIRI(?tc))
    } LIMIT ${n} }`;return`${F}${wn}
CONSTRUCT {
  ?s ?p ?o .
  ?pad ?lp ?ll .
  ?sub rdfs:subClassOf ?super .
}
WHERE {
  {
    # 1+2. the shape itself, its property shapes and their PropertyGroups
    ${i}
    ?shape ${En} ?s .
    ${r(`?g1`,`?s ?p ?o .`)}
  } UNION {
    # 2b. the blank path node of an [ sh:inversePath … ]
    ${i}
    ?shape sh:property/sh:path ?s .
    FILTER(isBlank(?s))
    ${r(`?g2`,`?s ?p ?o .`)}
  } UNION {
    # 3. label and definition of the path predicates (the propLabel fallback)
    ${i}
    ?shape sh:property/sh:path ?pad .
    FILTER(isIRI(?pad))
    ${r(`?g3`,`?pad ?lp ?ll .
    FILTER(?lp IN (${Dn}))`)}
  } UNION {
    # 4. the subclass chains that end at a target class
    ${i}
    ?sub rdfs:subClassOf+ ?tc .
    ?sub rdfs:subClassOf ?super .
  }
}
`}function kn(e,{limit:t=400,excludeGraphs:n=Wt}={}){let r=L(e),i=Math.max(1,t|0),a=(e,t)=>n&&n.length?`GRAPH ${e} { ${t} }
    ${R(e,n)}`:t;return`${F}
CONSTRUCT {
  ${r} ?out ?object .
  ?subject ?in ${r} .
  ?object ?op ?ov .
  ?subject ?sp ?sv .
}
WHERE {
  {
    # a. what this node says itself, with each neighbour's literals and type.
    { SELECT ?out ?object WHERE { ${r} ?out ?object } LIMIT ${i} }
    OPTIONAL { ${a(`?g1`,`?object ?op ?ov .
      FILTER(isLiteral(?ov) || ?op = rdf:type)`)} }
  } UNION {
    # b. who points at this node — the inverse-path rows — with
    #    the same neighbour data.
    { SELECT ?in ?subject WHERE { ?subject ?in ${r} . FILTER(isIRI(?subject)) } LIMIT ${i} }
    OPTIONAL { ${a(`?g2`,`?subject ?sp ?sv .
      FILTER(isLiteral(?sv) || ?sp = rdf:type)`)} }
  }
}
`}var An=1e3;function jn(e,{excludeGraphs:t=Wt,max:n=200,excludeNodes:r=null,maxExclude:i=An}={}){let a=[...e||[]].slice(0,Math.max(1,n|0));if(!a.length)return null;let o=[...r||[]];return o.length>Math.max(0,i|0)?null:`${F}
SELECT (COUNT(DISTINCT ?node) AS ?n)
WHERE {
  VALUES ?class { ${a.map(L).join(` `)} }
  ${((e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
  ${R(e,t)}`:n)(`?g1`,`?node rdf:type ?class .`)}${o.length?`
  FILTER(?node NOT IN (${o.map(L).join(`, `)}))`:``}
}
`}var Mn=1e3;function Nn(e,{excludeGraphs:t=Wt,max:n=Mn}={}){let r=[...e||[]];return!r.length||r.length>Math.max(1,n|0)?null:`${F}
CONSTRUCT { ?n ?lp ?lv }
WHERE {
  VALUES ?n { ${r.map(L).join(` `)} }
  ${((e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
  ${R(e,t)}`:n)(`?g1`,`?n ?lp ?lv .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title))`)}
}
`}function Pn(e){return String(e).replace(/\\/g,`\\\\`).replace(/"/g,`\\"`).replace(/\n/g,`\\n`).replace(/\r/g,`\\r`).replace(/\t/g,`\\t`)}function Fn(e){let t=e&&e[`xml:lang`];return t&&Yt.test(t)?`@`+t:``}function V(e){return e?e.value:null}var In={set:Vt+`Set`,offer:Vt+`Offer`,agreement:Vt+`Agreement`,request:Vt+`Request`};function Ln(e,t,n,r){let i=r&&r.type,a=[];return t||n?(t&&a.push(`<${e}> <${Ut}validFrom> "${Pn(t)}" .`),n&&a.push(`<${e}> <${Ut}validThrough> "${Pn(n)}" .`)):i===`literal`&&a.push(`<${e}> <${Ht}valid> "${Pn(r.value)}" .`),a}function Rn(e){let t=new Set,r=e=>e&&e.type===`uri`&&/^[^<>"{}|^`\\\s]+$/.test(e.value)?e.value:null;for(let i of e||[]){let e=r(i.policy);if(!e)continue;let a=In[V(i.kind)]||In.set;t.add(`<${e}> a <${a}> .`);let o=V(i.title);if(o){let n=Fn(i.title);t.add(`<${e}> <http://purl.org/dc/terms/title> "${Pn(o)}"${n} .`)}let s=V(i.issued);s&&t.add(`<${e}> <${Ht}issued> "${Pn(s)}" .`);for(let n of Ln(e,V(i.validFrom),V(i.validTo),i.valid))t.add(n);let c=r(i.revisionOf);c&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasRevisionOf> <${c}> .`);let l=r(i.offerRef);l&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${l}> .`);let u=r(i.requestRef);u&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${u}> .`);let d=r(i.answeredByRef);d&&t.add(`<${d}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${e}> .`);let f=r(i.assignee);if(f){t.add(`<${e}> <${Vt}assignee> <${f}> .`);let n=V(i.assigneeLabel);if(n){let e=Fn(i.assigneeLabel);t.add(`<${f}> <http://www.w3.org/2000/01/rdf-schema#label> "${Pn(n)}"${e} .`)}}let p=r(i.container);if(p){t.add(`<${p}> a <${n}> .`),t.add(`<${e}> <${g}> <${p}> .`);let r=parseInt(V(i.versionCount)||``,10);Number.isFinite(r)&&r>0&&t.add(`<${p}> <${ye}> "${r}" .`);let a=V(i.containerTitle);if(a){let e=Fn(i.containerTitle);t.add(`<${p}> <http://purl.org/dc/terms/title> "${Pn(a)}"${e} .`)}}}return[...t].join(`
`)+(t.size?`
`:``)}function zn(e){let t=new Set,r=e=>e&&e.type===`uri`&&/^[^<>"{}|^`\\\s]+$/.test(e.value)?e.value:null,i=(e,n,r)=>{let i=V(r);if(!i)return;let a=Fn(r);t.add(`<${e}> <${n}> "${Pn(i)}"${a} .`)};for(let a of e||[]){let e=r(a.container),o=r(a.version);if(!e||!o)continue;let s=In[V(a.kind)];if(s){t.add(`<${e}> a <${n}> .`),t.add(`<${e}> <${Ht}type> <${s}> .`),t.add(`<${o}> <${g}> <${e}> .`),i(e,Ht+`title`,a.containerTitle),i(o,Ht+`title`,a.title);for(let e of Ln(o,V(a.validFrom),V(a.validTo),a.valid))t.add(e);i(o,Ht+`issued`,a.issued)}}return[...t].join(`
`)+(t.size?`
`:``)}var Bn=[];function Vn(e,t){if(t&&t.length)return[...t];if(!e)return[];let n=String(e).replace(/[?#].*$/,``),r=Bn.find(e=>e.match.test(n));return r?[...r.excludeGraphs]:[]}function Hn(e,t){let n=String(e||``).trim();if(!n)return`empty source address`;let r=t||(typeof location<`u`&&location.href?location.href:`https://x.invalid/`),i;try{i=new URL(n,r)}catch{return`not a valid address: `+n}return i.protocol===`http:`||i.protocol===`https:`?null:`source address with an unsupported scheme (${i.protocol}): ${n} — a source has to be reachable over http(s)`}function Un(e){let t=String(e||``).trimStart().slice(0,200).toLowerCase();return t.startsWith(`<!doctype html`)||t.startsWith(`<html`)||t.startsWith(`<?xml-stylesheet`)}function Wn(e){let t=String(e||``).trim().replace(/[?#].*$/,``);return t?/\.(ttl|turtle|nt|jsonld|json)$/i.test(t)?`data`:/\/(sparql|query)$/i.test(t)?`sparql`:null:null}async function Gn(e,t){let n=await t(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`,Accept:`application/sparql-results+json`},body:`query=ASK%20%7B%7D`});if(!n.ok)return!1;try{let e=await n.json();return typeof e==`object`&&!!e&&typeof e.boolean==`boolean`}catch{return!1}}async function Kn(e,t){let n=t||globalThis.fetch,r=Hn(e);if(r)return{kind:`error`,url:e,code:`schema`,message:r};let i=Wn(e);if(i===`sparql`)return{kind:`sparql`,url:e};if(i!==`data`)try{if(await Gn(e,n))return{kind:`sparql`,url:e}}catch{}try{let t=await n(e);if(!t.ok)return{kind:`error`,url:e,code:`unsupported`,message:`HTTP `+t.status+` at `+e};let r=await t.text(),i=xe(e,r);return i===`rdfxml`?{kind:`error`,url:e,code:`unsupported`,message:`format not supported (RDF/XML): `+e}:Un(r)?{kind:`error`,url:e,code:`unsupported`,message:`this address serves a web page, not RDF: `+e}:{kind:`data`,url:e,content:r,format:i}}catch(t){return{kind:`error`,url:e,code:`unreachable`,message:`source not reachable (CORS or offline?): `+e+` — `+t.message}}}var qn=le,Jn=xe,Yn=Kn,Xn=d,Zn=zt,Qn=r,$n=e,er=Lt,tr=Rt,nr=te,rr=ue,ir=se,ar=l,or=pe,sr=ae,cr=f,lr=ne,ur=p,dr=60,fr=10,pr=_,mr=m,hr=y,H=ve,gr=c,_r=h,vr=o,yr=4,br=I,xr=Kt,Sr=on,Cr=_n,wr=vn,Tr=Sn,Er=On,Dr=kn,Or=Nn,kr=jn,Ar=Cn,jr=Rn,Mr=zn,Nr=hn,Pr=gn,Fr=Vn,Ir=u,Lr=s,Rr=`data/`,zr=[`generiek/1-generiek-drietraps.ttl`,`generiek/7-dekking-generiek.ttl`,`generiek/archief-partof.ttl`,`generiek/keten-offer-request-agreement.ttl`,`vlierdam/vocabulaire.ttl`,`vlierdam/velden.ttl`,`vlierdam/beleid.ttl`,`vlierdam/openftv.ttl`];function Br(){let e=_e();return e.length?e:zr}function Vr(){return be()}function Hr(){return`?`+Br().map(e=>`src=${encodeURIComponent(Rr+e)}`).join(`&`)}function Ur(e){let t=String(e||``);return Vr().find(e=>t===`data/`+e||t.endsWith(`/`+e))||null}var{DataFactory:Wr,Store:Gr,Parser:Kr}=oe,{namedNode:U}=Wr,W=`http://www.w3.org/ns/shacl#`,qr=`http://datashapes.org/dash#`,Jr=`http://www.w3.org/ns/shacl-ui/`,Yr=`http://www.w3.org/1999/02/22-rdf-syntax-ns#`,Xr=`http://www.w3.org/2000/01/rdf-schema#`,Zr=`http://www.w3.org/2004/02/skos/core#`,Qr=(e,t,n)=>e.getQuads(t,U(n),null,null).map(e=>e.object),G=(e,t,n)=>Qr(e,t,n)[0]||null,$r=e=>!!e&&e.termType===`Literal`;function ei(e,t,n){let r=G(e,t,qr+n)||G(e,t,Jr+n);return!r||r.termType!==`NamedNode`?null:p(r.value).replace(/^IRIViewer$/,`URIViewer`)}function ti(e,t){let n=G(e,t,W+`path`),r=null,i=!1;if(n&&n.termType===`NamedNode`)r=n.value;else if(n){let t=G(e,n,W+`inversePath`);t&&t.termType===`NamedNode`&&(r=t.value,i=!0)}let a=G(e,t,W+`order`),o=a&&Number.isFinite(parseFloat(a.value))?parseFloat(a.value):null,s=G(e,t,W+`group`);return{path:r,inverse:i,names:Qr(e,t,W+`name`).filter($r),descriptions:Qr(e,t,W+`description`).filter($r),order:o,group:s&&s.termType===`NamedNode`?s.value:null,pattern:(G(e,t,W+`pattern`)||{}).value||null,viewer:ei(e,t,`viewer`),role:ei(e,t,`propertyRole`)}}function ni(e){let t=new Set,n=[];for(let r of e.getQuads(null,U(Yr+`type`),U(W+`NodeShape`),null)){let i=r.subject.value;if(t.has(i))continue;t.add(i);let a=G(e,r.subject,W+`targetClass`);a&&a.termType===`NamedNode`&&n.push({iri:i,store:e,targetClass:a.value,properties:Qr(e,r.subject,W+`property`).map(t=>ti(e,t))})}return n}function ri(e,t){let n=new Set([t]),r=!0;for(;r;){r=!1;for(let t of e.getQuads(null,U(Xr+`subClassOf`),null,null))n.has(t.object.value)&&!n.has(t.subject.value)&&(n.add(t.subject.value),r=!0)}return n}var ii=[`name`,`description`,`order`,`group`];function ai(e){return e.properties.some(e=>e.viewer||e.role||ii.some(t=>t===`name`?e.names.length:t===`description`?e.descriptions.length:e[t]!==null))}var oi=ai;function si(e,t,n,r=[]){let i=typeof t==`string`?U(t):t,a=new Set(Qr(e,i,Yr+`type`).filter(e=>e.termType===`NamedNode`).map(e=>e.value));if(!a.size)return null;let o=[],s=new Set;for(let e of n)s.add(e.targetClass);for(let t of[...n,...r.filter(e=>!s.has(e.targetClass))]){if(a.has(t.targetClass)){o.push([0,+!oi(t),t]);continue}let n=ri(e,t.targetClass);[...a].some(e=>n.has(e))&&o.push([1,+!oi(t),t])}return o.length?(o.sort((e,t)=>e[0]-t[0]||e[1]-t[1]),o[0][2]):null}function ci(e,t,n=[]){let r=new Set;for(let e of t)r.add(e.targetClass);let i=[...t,...n.filter(e=>!r.has(e.targetClass))],a=new Map;return i.forEach((t,n)=>{let r=+!oi(t),i=(e,i)=>{let o=a.get(e);(!o||i<o.rank||i===o.rank&&r<o.formRank)&&a.set(e,{rank:i,formRank:r,idx:n,shape:t})};i(t.targetClass,0);for(let n of ri(e,t.targetClass))n!==t.targetClass&&i(n,1)}),a}function li(e,t,n){if(!n||!n.size)return null;let r=typeof t==`string`?U(t):t;if(!r)return null;let i=null;for(let t of e.getQuads(r,U(Yr+`type`),null,null)){if(t.object.termType!==`NamedNode`)continue;let e=n.get(t.object.value);e&&(!i||e.rank<i.rank||e.rank===i.rank&&e.formRank<i.formRank||e.rank===i.rank&&e.formRank===i.formRank&&e.idx<i.idx)&&(i=e)}return i?i.shape:null}function ui(e,t,n){if(!n)return[];let r=typeof t==`string`?U(t):t;return r&&n.properties.filter(e=>e.role===`KeyInfoRole`).sort((e,t)=>(e.order??1/0)-(t.order??1/0)).map(t=>xi(e,r,t)).find(e=>e.length)||[]}function di(e,t){if(!t||!t.targetClass)return null;let n=U(t.targetClass),r=t.store&&t.store!==e?[e,t.store]:[e],i=e=>{for(let t of r){let r=b(Qr(t,n,e).filter($r));if(r)return r}return null},a=i(Zr+`altLabel`),o=i(Xr+`label`)||i(Zr+`prefLabel`)||i(`http://purl.org/dc/terms/title`)||p(t.targetClass);return o?{text:a||o,full:o,abbreviated:!!a}:null}function fi(e,t){let n=new Set;for(let e of t)ai(e)&&n.add(e.targetClass);if(!n.size)return n;let r=e.getQuads(null,U(Xr+`subClassOf`),null,null),i=!0;for(;i;){i=!1;for(let e of r)n.has(e.object.value)&&!n.has(e.subject.value)&&(n.add(e.subject.value),i=!0)}return n}function pi(e,t,n){if(!n||!n.size)return!1;let r=typeof t==`string`?U(t):t;return r?e.getQuads(r,U(Yr+`type`),null,null).some(e=>e.object.termType===`NamedNode`&&n.has(e.object.value)):!1}function mi(e,t,{skipGraphs:n}={}){let r=new Set,i=new Set;if(!t||!t.size)return{iris:r,blanks:0};let a=n&&n.length?new Set(n):null;for(let n of e.getQuads(null,U(Yr+`type`),null,null))n.object.termType===`NamedNode`&&t.has(n.object.value)&&(a&&n.graph&&a.has(n.graph.value)||(n.subject.termType===`NamedNode`?r:i).add(n.subject.value));return{iris:r,blanks:i.size}}function hi(e,t){let n=mi(e,t);return n.iris.size+n.blanks}function gi(e,t,n){return n.path?n.inverse?e.getQuads(null,U(n.path),t,null).map(e=>e.subject):e.getQuads(t,U(n.path),null,null).map(e=>e.object):[]}function _i(e,t){return b(t.names)||(t.path?re(e,U(t.path)):``)}function vi(e,t){return b(t.descriptions)||(t.path?ge(e,U(t.path)):``)||null}function yi(e,t){return!t||t.termType!==`NamedNode`?!1:e.countQuads(t,null,null,null)===0}function bi(e,t,n){let r=()=>({kind:`label`,text:re(e,t),iri:t.termType===`NamedNode`?t.value:null,external:yi(e,t)});switch(n.viewer){case`URIViewer`:case`HyperlinkViewer`:return{kind:`link`,text:t.value,iri:t.termType===`NamedNode`?t.value:null};case`LabelViewer`:return r();case`LiteralViewer`:return{kind:`text`,text:t.value,iri:null};default:return t.termType===`NamedNode`?r():{kind:`text`,text:t.value,iri:null}}}function xi(e,t,n){let r=gi(e,t,n);if(!r.length)return[];let i=r.filter(e=>$r(e)&&e.language);if(i.length){let t=b(i),a=r.filter(e=>!($r(e)&&e.language));return[...t?[{kind:`text`,text:t,iri:null}]:[],...a.map(t=>bi(e,t,n))]}if(n.viewer===`LangStringViewer`){let e=b(r.filter($r));return e?[{kind:`text`,text:e,iri:null}]:[]}let a=[],o=new Set;for(let t of r){let r=bi(e,t,n),i=r.kind+`\0`+r.text;o.has(i)||(o.add(i),a.push(r))}return a}function Si(e,t,n){let r=typeof t==`string`?U(t):t,i=t=>n.properties.filter(e=>e.role===t).sort((e,t)=>(e.order??1/0)-(t.order??1/0)).map(t=>xi(e,r,t)).find(e=>e.length)||[],a=i(`LabelRole`),o=i(`DescriptionRole`),s=a.length?a[0].text:re(e,r),c=new Set([Xr+`label`,`http://www.w3.org/2004/02/skos/core#prefLabel`,`http://purl.org/dc/terms/title`]),l=(e,t)=>!a.length&&!e.inverse&&c.has(e.path)&&t.length===1&&t[0].text===s,u=n.store||e,d=new Map,f=[];for(let t of n.properties){if(t.role===`LabelRole`||t.role===`DescriptionRole`||t.role===`KeyInfoRole`||!t.path)continue;let n=xi(e,r,t);if(l(t,n))continue;let i={kind:`row`,label:_i(e,t),description:vi(e,t),path:t.path,inverse:t.inverse,pattern:t.pattern,viewer:t.viewer,values:n,order:t.order};if(t.group){let e=d.get(t.group);if(!e){let n=G(u,U(t.group),W+`order`);e={kind:`group`,label:re(u,U(t.group)),rows:[],order:n&&Number.isFinite(parseFloat(n.value))?parseFloat(n.value):null},d.set(t.group,e),f.push(e)}e.rows.push(i)}else f.push(i)}let p=e=>e.map((e,t)=>[e,t]).sort((e,t)=>(e[0].order??1/0)-(t[0].order??1/0)||e[1]-t[1]).map(([e])=>e);for(let e of d.values())e.rows=p(e.rows).filter(e=>e.values.length);let m=p(f).filter(e=>e.kind===`group`?e.rows.length:e.values.length);return{shape:n.iri,title:s,keyInfo:i(`KeyInfoRole`),description:o.length?o[0].text:null,blocks:m}}function Ci(e,t){if(!e||!t)return e;let n=e=>e.iri!==t,r=e=>{let t=e.values.filter(n);return t.length===e.values.length?e:{...e,values:t}},i=[],a=!1;for(let t of e.blocks){if(t.kind===`group`){let e=t.rows.map(r).filter(e=>e.values.length),n=e.length===t.rows.length&&e.every((e,n)=>e===t.rows[n]);n||(a=!0),e.length&&i.push(n?t:{...t,rows:e});continue}let e=r(t);e!==t&&(a=!0),e.values.length&&i.push(e)}return a?{...e,blocks:i}:e}var wi=null,Ti=null;function Ei(e=void 0){let t=e||ee(),n=t.length+`\0`+t.join(`\0`);if(wi&&Ti===n)return wi;let r=new Gr;for(let e of t)r.addQuads(new Kr().parse(e));return Ti=n,wi=ni(r),wi}var Di=Symbol(`store-raw`),Oi=Symbol(`store-node`),K=Symbol(`store-has`),ki=Symbol(`store-self`);function Ai(e){let t=e[C];if(!t&&(Object.defineProperty(e,C,{value:t=new Proxy(e,Ri)}),!Array.isArray(e))){let n=Object.keys(e),r=Object.getOwnPropertyDescriptors(e),i=Object.getPrototypeOf(e),a=i!==null&&typeof e==`object`&&!!e&&!Array.isArray(e)&&i!==Object.prototype;if(a){let e=Object.getOwnPropertyDescriptors(i);n.push(...Object.keys(e)),Object.assign(r,e)}for(let i=0,o=n.length;i<o;i++){let o=n[i];a&&o===`constructor`||r[o].get&&Object.defineProperty(e,o,{configurable:!0,enumerable:r[o].enumerable,get:r[o].get.bind(t)})}}return t}function ji(e){let t;return typeof e==`object`&&!!e&&(e[C]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function Mi(e,t=new Set){let n,r,i,a;if(n=e!=null&&e[Di])return n;if(!ji(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,a=e.length;n<a;n++)i=e[n],(r=Mi(i,t))!==i&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);let n=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let s=0,c=n.length;s<c;s++)a=n[s],!o[a].get&&(i=e[a],(r=Mi(i,t))!==i&&(e[a]=r))}return e}function Ni(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function Pi(e,t,n){if(e[t])return e[t];let[r,i]=A(n,{equals:!1,internal:!0});return r.$=i,e[t]=r}function Fi(e,t){let n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===C||t===Oi?n:(delete n.value,delete n.writable,n.get=()=>e[C][t],n)}function Ii(e){Ue()&&Pi(Ni(e,Oi),ki)()}function Li(e){return Ii(e),Reflect.ownKeys(e)}var Ri={get(e,t,n){if(t===Di)return e;if(t===C)return n;if(t===Te)return Ii(e),n;let r=Ni(e,Oi),i=r[t],a=i?i():e[t];if(t===Oi||t===K||t===`__proto__`)return a;if(!i){let n=Object.getOwnPropertyDescriptor(e,t);Ue()&&(typeof a!=`function`||Object.prototype.hasOwnProperty.call(e,t))&&!(n&&n.get)&&(a=Pi(r,t,a)())}return ji(a)?Ai(a):a},has(e,t){return t===Di||t===C||t===Te||t===Oi||t===K||t===`__proto__`||(Ue()&&Pi(Ni(e,K),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:Li,getOwnPropertyDescriptor:Fi};function zi(e,t,n,r=!1){if(t===`__proto__`||!r&&e[t]===n)return;let i=e[t],a=e.length;n===void 0?(delete e[t],e[K]&&e[K][t]&&i!==void 0&&e[K][t].$()):(e[t]=n,e[K]&&e[K][t]&&i===void 0&&e[K][t].$());let o=Ni(e,Oi),s;if((s=Pi(o,t,i))&&s.$(()=>n),Array.isArray(e)&&e.length!==a){for(let t=e.length;t<a;t++)(s=o[t])&&s.$();(s=Pi(o,`length`,a))&&s.$(e.length)}(s=o[ki])&&s.$()}function Bi(e,t){let n=Object.keys(t);for(let r=0;r<n.length;r+=1){let i=n[r];Vi(i)||zi(e,i,t[i])}}function Vi(e){return e===`__proto__`||e===`constructor`||e===`prototype`}function Hi(e,t){if(typeof t==`function`&&(t=t(e)),t=Mi(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){let r=t[n];e[n]!==r&&zi(e,n,r)}zi(e,`length`,r)}else Bi(e,t)}function Ui(e,t,n=[]){let r,i=e;if(t.length>1){r=t.shift();let a=typeof r,o=Array.isArray(e);if(a===`string`&&(r===`__proto__`||t.length>1&&Vi(r)))return;if(Array.isArray(r)){for(let i=0;i<r.length;i++)Ui(e,[r[i]].concat(t),n);return}if(o&&a===`function`){for(let i=0;i<e.length;i++)r(e[i],i)&&Ui(e,[i].concat(t),n);return}if(o&&a===`object`){let{from:i=0,to:a=e.length-1,by:o=1}=r;for(let r=i;r<=a;r+=o)Ui(e,[r].concat(t),n);return}if(t.length>1){Ui(e[r],t,[r].concat(n));return}i=e[r],n=[r].concat(n)}let a=t[0];typeof a==`function`&&(a=a(i,n),a===i)||(r!==void 0||a!=null)&&(a=Mi(a),r===void 0||ji(i)&&ji(a)&&!Array.isArray(a)?Bi(i,a):zi(e,r,a))}function Wi(...[e,t]){let n=Mi(e||{}),r=Array.isArray(n),i=Ai(n);function a(...e){ze(()=>{r&&e.length===1?Hi(n,e[0]):Ui(n,e)})}return[i,a]}var Gi=[`active`,`terminated`,`future`];function Ki(){return{state:`doc`,src:[],ttl:[],sparql:null,policyScope:null,setScope:null,groupBy:null,lang:de(),langExplicit:!1,editMode:!1,excludeGraphs:[],filters:{status:null,offer:``}}}var[qi,Ji]=Wi(Ki());function Yi(e,t){return qi.lang,qn(e,t)}function Xi(e){if(!e)return null;let t=e.split(`,`).map(e=>e.trim()).filter(e=>Gi.includes(e));return t.length?t:null}function Zi(e){let t=new URLSearchParams(e),n=he(t.get(`lang`));fe(n),Ji({...Ki(),state:`doc`,src:t.getAll(`src`),ttl:t.getAll(`ttl`),sparql:t.get(`sparql`)||null,policyScope:t.get(`policy`)||null,setScope:t.get(`set`)||null,groupBy:t.has(`groupby`)?String(t.get(`groupby`)||``).split(`,`).map(e=>e.trim()).filter(Boolean):null,lang:n,langExplicit:t.has(`lang`),editMode:t.get(`edit`)===`1`,excludeGraphs:t.getAll(`exclude-graph`),filters:{status:Xi(t.get(`status`)),offer:t.get(`offer`)||``}})}var Qi=[`src`,`ttl`,`sparql`,`policy`,`set`,`groupby`,`edit`,`exclude-graph`,`status`,`offer`,`lang`];function $i(e,t){let n=new URLSearchParams(t);for(let e of Qi)n.delete(e);for(let t of e.src)n.append(`src`,t);for(let t of e.ttl)n.append(`ttl`,t);e.sparql&&n.set(`sparql`,e.sparql),e.policyScope&&n.set(`policy`,e.policyScope),e.setScope&&n.set(`set`,e.setScope),e.groupBy&&n.set(`groupby`,e.groupBy.join(`,`)),e.editMode&&n.set(`edit`,`1`);for(let t of e.excludeGraphs)n.append(`exclude-graph`,t);return e.filters.status&&n.set(`status`,Gi.filter(t=>e.filters.status.includes(t)).join(`,`)),e.filters.offer&&n.set(`offer`,e.filters.offer),e.langExplicit&&n.set(`lang`,e.lang),n}function ea(e){if(typeof history>`u`||!history.replaceState)return;let t=$i(e,new URLSearchParams(location.search)).toString();history.replaceState(null,``,t?`?`+t:location.pathname)}function ta(e){let t={...e};if(`lang`in t&&t.lang){let e=he(t.lang);fe(e),t.lang=e,t.langExplicit=!0}t.policyScope?t.setScope=null:t.setScope&&(t.policyScope=null),t.filters&&t.filters.status&&t.filters.status.length===Gi.length&&(t.filters={...t.filters,status:null}),Ji(t),ea(qi)}var na=me,[ra,ia]=A(null),aa=()=>ra()?.key??null,oa=()=>ra()?.vars;function sa(e,t){ia(e?{key:e,vars:t}:null)}function ca(e,t){ia({key:e,vars:t,refusal:!0})}function la(){ra()?.refusal&&ia(null)}function ua(e){ra()?.key===e&&ia(null)}var da=new Set;function fa(e){return da.add(e),()=>{da.delete(e)}}function pa(e){if(!e)return!1;for(let t of[...da])try{if(t(e))return!0}catch{}return!1}var ma=()=>new Promise(e=>{setTimeout(e,0)});function ha(e){if(typeof document>`u`)return null;let t=e.replace(/["\\]/g,`\\$&`);return document.querySelector(`[data-ref="${t}"]`)||document.querySelector(`[data-iri="${t}"]`)}function ga(){if(typeof window>`u`||typeof window.matchMedia!=`function`)return!1;try{return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}catch{return!1}}var _a=24;function va(e){if(typeof window>`u`||typeof e.getBoundingClientRect!=`function`)return!1;let t=window.innerHeight||0;if(!t)return!1;let n=e.getBoundingClientRect();return n.top<_a?!1:n.bottom<=t-_a||n.height>t-48}async function ya(e,t){if(typeof e.scrollIntoView!=`function`||t.ifNeeded&&va(e))return;let n=t.block||`start`,r=t.smooth&&!ga()?`smooth`:`auto`;e.scrollIntoView({behavior:r,block:n});for(let t=0;t<12;t+=1){await new Promise(e=>{setTimeout(e,40)});let t=e.getBoundingClientRect().top,n=typeof window<`u`?window.innerHeight:0;if(t>=-4&&t<Math.max(n,1))return}e.scrollIntoView({behavior:`auto`,block:n})}async function ba(e,t={}){if(!e)return!1;for(let t of[...da])try{if(t(e))break}catch{}await ma();let n=ha(e);if(!n)return!1;for(let e=n;e;e=e.parentElement)e instanceof HTMLDetailsElement&&(e.open=!0);return await ya(n,t),n.classList&&(n.classList.remove(`ui-flash`),n.offsetWidth,n.classList.add(`ui-flash`),setTimeout(()=>n.classList.remove(`ui-flash`),1800)),!0}var[xa,Sa]=A(null),[Ca,q]=A(`empty`),[wa,Ta]=A([]),[Ea,Da]=A([]),[Oa,ka]=A(0),[Aa,ja]=A(null),[Ma,Na]=A(null),[Pa,Fa]=A(null),[Ia,La]=A(null),[J,Ra]=A(null),[za,Y]=A(0),[X,Ba]=A(null),[Va,Ha]=A(!1),[Ua,Wa]=A(null),[Ga,Ka]=A(!1),[qa,Ja]=A(null),[Ya,Xa]=A(`load.sources`),[Za,Qa]=A(null),Z=0,Q=Promise.resolve(),$a=null,eo=null,to=[],no,$=[],ro=[],io=e=>$.length?[...$,...e]:e,ao=e=>ro.length?[...ro,...e]:e;function oo(e){Ba(e),to=Fr(e,no)}function so(e){let t=[...e.src.map(e=>({name:e,url:e,detect:!0})),...(e.ttl||[]).map(e=>({name:e,url:e}))],n=new Set,r=t.filter(e=>!n.has(e.url)&&!!n.add(e.url));if(!r.length)return[];let i=new Set(r.map(e=>Ur(e.url)).filter(Boolean));return[...r,...Vr().filter(e=>!i.has(e)).map(e=>({name:e,url:Rr+e,quiet:!0}))]}async function co(e){let t=[],n=[],r=[],i=await Promise.all(e.map(async({name:e,url:t,detect:n,quiet:r})=>{if(n){let n=await Yn(t);return n.kind===`sparql`?{endpoint:n.url}:n.kind===`data`?{source:{name:e,url:t,content:n.content,format:n.format}}:r?{}:{error:{url:t,message:n.message}}}try{let n=await fetch(t);if(!n.ok)throw Error(`HTTP ${n.status}`);let r=await n.text();return{source:{name:e,url:t,content:r,format:Jn(t,r)}}}catch(e){return r?{}:{error:{url:t,message:e instanceof Error?e.message:String(e)}}}}));for(let e of i)e.source?t.push(e.source):e.endpoint?r.push(e.endpoint):e.error&&n.push(e.error);return{sources:t,errors:n,endpoints:r}}async function lo(e,t){try{let n=er(),r=()=>{};return Q=new Promise(e=>{r=e}),{outcome:await Zn(e,{setScope:t.setScope,lang:t.lang,onStore:e=>{if(!e){r();return}tr(n,e).then(()=>{Ra(()=>n),Y(e=>e+1),r()})}}),engine:`worker`}}catch{let t=Xn(e);return Ra(()=>t.store??null),Y(e=>e+1),Q=Promise.resolve(),{outcome:t,engine:`main-thread`}}}function uo(e,t){if(!e)return null;if(t.policy)return or(e,t.policy)?.nav??null;let n=J();return!t.set||!n?null:ar(e,n,t.set)?.nav??null}var fo=()=>({set:$a,policy:eo});async function po(e={}){let t=Z;if(!xa()||(e.setScope!==void 0&&($a=e.setScope),e.policyScope!==void 0&&(eo=e.policyScope),await Q,t!==Z))return;let n=J();if(!n)return;let r=nr(n),i=ir(r),a=fo();Sa(r),Na(()=>i),Fa(()=>uo(i,a))}var[mo,ho]=A([]),go=[];function _o(e){if(!e)return;let t=e.added||[],n=e.removed||[];(t.length||n.length)&&go.push({added:t,removed:n})}function vo(e){let t=e;for(let e of go)e.removed&&e.removed.length&&t.removeQuads(e.removed),e.added&&e.added.length&&t.addQuads(e.added)}function yo(){let e=J();if(!e||!mo().length&&!go.length)return!1;for(let t of mo())hr(e,t.ttl,`ttl`,H({url:t.ep},0));return vo(e),Y(e=>e+1),!0}async function bo(e,t,n,r){let{outcome:i,engine:a}=await lo(t,r);if(e!==Z)return!1;Da(t),Sa(i.model||null),Na(()=>i.nav??null);let o=i.scopedNav!==void 0&&!r.policyScope?i.scopedNav:uo(i.nav??null,{set:r.setScope,policy:r.policyScope});Fa(()=>o);let s=r.policyScope?`policy`:r.setScope?`set`:null;return La(s&&!o?s:null),ka(i.quadCount||0),ja(a),Ta([...n,...i.errors||[]]),q(i.model?`ready`:`error`),await Q,e===Z&&yo()&&Go(),!!i.model}function xo(e,t){e===Z&&(Ta(ao([t])),q(`error`))}async function So(e,t,n){let r=await co(t);if(e!==Z)return;r.endpoints.length&&oo(r.endpoints[0]);let i=r.sources.filter(e=>!Ur(e.url)),a=X();if(!i.length&&a){Xa(`load.queryEndpointAt`),Ha(!0),await Lo(e,a,n.policyScope,n);return}if(!i.length){Da([]),Sa(null),ka(0),ja(null),Na(null),Fa(null),Ta(r.errors),q(`error`);return}a&&Ha(!0);let o=await ds(r.sources);$=o.list,ro=o.error?[o.error,...r.errors]:r.errors,await bo(e,$,ro,n),e===Z&&a&&await Lo(e,a,n.policyScope,n)}async function Co(e,t,n){try{let r=await fetch(t);if(!r.ok)throw Error(`HTTP ${r.status}`);let i=await r.text();if(e!==Z)return;let a=await ds([{name:t,url:t,content:i,format:Jn(t,i)}]);await bo(e,a.list,a.error?[a.error]:[],n)}catch(n){xo(e,{url:t,message:qn(`err.scopeFetch`,{iri:t,msg:n instanceof Error?n.message:String(n)})})}}async function wo(e){try{return await br(e,Sr())}catch(t){if(!Nr(t))throw t;try{let t=await Pr(e);return Ka(!0),t}catch{throw t}}}async function To(e,t,n){let r=!1;try{let i=await br(t,Cr());if(e!==Z)return;i.length&&(Wa(`first`),r=await bo(e,io([{name:Yi(`src.endpointFirstView`,{ep:t,n:i.length}),url:t,content:jr(i),format:`ttl`,fromSparql:!0}]),ao([]),n),r&&q(`loading`))}catch{Wa(null)}if(e===Z)try{let[r,i]=await Promise.all([wo(t),br(t,wr()).catch(()=>[])]);if(e!==Z)return;Wa(null);let a=jr(r)+Mr(i);if(await bo(e,io([{name:Yi(`src.endpointPolicyList`,{ep:t,n:r.length,more:i.length?Yi(`src.endpointVersionRows`,{m:i.length}):``}),url:t,content:a,format:`ttl`,fromSparql:!0}]),ao([]),n),e!==Z)return;await es(e)}catch(n){if(e!==Z)return;Wa(null);let i=n instanceof Error?n.message:String(n);Ja(r?`fullIndex`:`endpoint`),Ta(ao([{url:t,message:i}])),q(`error`)}}var Eo=`urn:odrlvis:formShapes`,Do=`urn:odrlvis:nodeLabels`,Oo=ni,ko=Ei,Ao=fi,jo=mi,Mo=Qn;function No(e){return xr(e,Er({excludeGraphs:to})).catch(()=>``)}async function Po(e,t,n){let r=await n;if(e!==Z||!r||!r.trim()||(await Q,e!==Z))return;let i=J();if(!i)return;ho(e=>[...e,{iri:Eo,ttl:r,ep:t}]),hr(i,r,`ttl`,H({url:t},0)),Y(e=>e+1);let a=Ao(i,[...Oo(i),...ko()]);await Promise.all([Io(e,t,i,a),Fo(e,t,i,a)])}async function Fo(e,t,n,r){try{let i=Or([...jo(n,r).iris].filter(e=>!Mo(n,e)),{excludeGraphs:to});if(!i)return;let a=await xr(t,i);if(e!==Z||!a||!a.trim()||(await Q,e!==Z))return;ho(e=>[...e,{iri:Do,ttl:a,ep:t}]);let o=J();if(!o)return;hr(o,a,`ttl`,H({url:t},0)),Y(e=>e+1),Go()}catch{}}async function Io(e,t,n,r){try{let i=jo(n,r,{skipGraphs:[String(H({url:t},0))]}),a=kr(r,{excludeGraphs:to,excludeNodes:i.iris});if(!a)return;let o=await br(t,a);if(e!==Z)return;let s=parseInt(o[0]&&o[0].n&&o[0].n.value||``,10);if(!Number.isFinite(s))return;let c=s+i.iris.size+i.blanks;c>0&&Qa(c)}catch{}}async function Lo(e,t,n,r){let i=No(t);try{if(n){let i=await xr(t,Tr(n,{excludeGraphs:to}));if(e!==Z)return;await bo(e,io([{name:`${t} (policy-detail)`,url:t,content:i,format:`ttl`,fromSparql:!0}]),ao([]),r);return}await To(e,t,r)}catch(n){Ja(`endpoint`),xo(e,{url:t,message:n instanceof Error?n.message:String(n)})}finally{await Po(e,t,i)}}async function Ro(e,t){let n=await ds([]);e===Z&&n.list.length&&($=n.list,ro=n.error?[n.error]:[],q(`loading`),await bo(e,$,ro,t))}function zo(e){let t=++Z,n=so({src:e.src||[],ttl:e.ttl||[],sparql:e.sparql??null,scope:e.policyScope??e.setScope??null}),r=e.setScope??null,i=e.policyScope??null,a=e.sparql||null,o={setScope:r,policyScope:i,lang:e.lang??me()};if($a=r,eo=i,no=e.excludeGraphs,Ra(null),Q=Promise.resolve(),Ta([]),$=[],ro=[],oo(a),Ha(!1),Wa(null),Ja(null),Ka(!1),ho([]),go.length=0,ts.clear(),Bo.clear(),Vo.clear(),rs.clear(),Qa(null),!n.length&&!a&&!(i||r)){Sa(null),Da([]),ka(0),ja(null),Na(null),Fa(null),q(`empty`),Ro(t,o);return}if(q(`loading`),n.length){Xa(`load.sources`),So(t,n,o);return}if(a){Xa(`load.queryEndpointAt`),Ha(!0),Lo(t,a,i,o);return}Xa(`load.source`),Co(t,i||r,o)}var Bo=new Set,Vo=new Map;function Ho(e){return!X()||!e||!e.iri||e.anon||e.stub||Bo.has(e.iri)?!1:!(e.permissions&&e.permissions.length||e.prohibitions&&e.prohibitions.length||e.obligations&&e.obligations.length)}async function Uo(e,t={}){let n=X();if(!e||!n||Bo.has(e))return!1;let r=Vo.get(e);if(r)return r;let i=Z,a=(async()=>{let r=await xr(n,Tr(e,{excludeGraphs:to}));if(await Q,i!==Z)return!1;let a=J();if(!a)throw Error(qn(`load.graph`));return ho(t=>[...t,{iri:e,ttl:r,ep:n}]),hr(a,r,`ttl`,H({url:n},0)),Bo.add(e),Y(e=>e+1),t.rebuildModel!==!1&&Go(),!0})();Vo.set(e,a);try{return await a}finally{Vo.delete(e)}}async function Wo(e){let t=[...new Set(e.filter(Boolean))];if(!t.length||!X())return!1;let n=Z,r=await Promise.all(t.map(e=>Uo(e,{rebuildModel:!1})));return n===Z&&(r.some(Boolean)&&Go(),r.some(Boolean))}function Go(){let e=J();if(!e)return;let t=nr(e),n=ir(t);Sa(t),Na(()=>n),Fa(()=>uo(n,fo()))}function Ko(e){let t=new Set;for(let n of[e.offers,e.agreements,e.sets])for(let e of n||[])e.iri&&!e.anon&&t.add(e.iri);return t}var qo=(e,t)=>e.size===t.size&&[...e].every(e=>t.has(e));function Jo(e,t){if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t))return e.length===t.length&&e.every((e,n)=>Jo(e,t[n]));if(!e||!t||typeof e!=`object`||typeof t!=`object`)return!1;let n=e,r=t,i=Object.keys(n);return i.length===Object.keys(r).length&&i.every(e=>Jo(n[e],r[e]))}function Yo(e,t){if(!e||!e.length)return t;let n=new Map;for(let t of e)t&&t.id&&n.set(t.id,t);return t.map(e=>{let t=e&&e.id?n.get(e.id):void 0;if(!t)return e;let r=Yo(t.children||null,e.children||[]),i=r===e.children?e:{...e,children:r};return Jo(t,i)?t:i})}function Xo(e,t){let n=ir(e),r=Array.isArray(t)&&Array.isArray(n)?Yo(t,n):n;Sa(e),Na(()=>r),Fa(()=>uo(r,fo()))}function Zo(e,t){t&&console.warn(`corpus: full rebuild after a mutation — ${e}`);let n=J();return n&&(Xo(nr(n),Ma()),Y(e=>e+1)),{mode:`full`,policies:[],reason:e}}function Qo(e){let t=J(),n=xa();if(!t||!n)return{mode:`full`,policies:[],reason:`no graph or model`};if(![...e.added||[],...e.removed||[]].length)return Zo(`empty delta`,!1);let r=Ko(n),i=rr(t,e,r),a=i.policies;if(!a)return Zo(i.reason===`budget`?`the attribution ran out of its node budget`:`mutation outside the known cards`,!0);let o=nr(t,{reuse:n,only:new Set(a)});return qo(r,Ko(o))?(Xo(o,Ma()),Y(e=>e+1),{mode:`targeted`,policies:a,reason:``}):Zo(`the set of policies changed`,!0)}var $o=20;async function es(e){let t=xa();if(!X()||!t)return;let n=(t.offers||[]).filter(e=>Ho(e)).slice(0,$o),r=(t.agreements||[]).filter(e=>Ho(e)),i=n.length+r.length<=$o?[...n,...r]:n;i.length&&(await Promise.all(i.map(e=>Uo(e.iri,{rebuildModel:!1}).catch(()=>!1))),(e===void 0||e===Z)&&Go())}var ts=new Set;async function ns(e){let t=X();if(!e||!t||ts.has(e))return!1;ts.add(e);try{let n=await xr(t,Ar(e,{excludeGraphs:to}));await Q;let r=J();if(!r)throw Error(qn(`load.graph`));return!n||!n.trim()?!1:(ho(r=>[...r,{iri:e,ttl:n,ep:t}]),hr(r,n,`ttl`,H({url:t},0)),Y(e=>e+1),!0)}catch{return ts.delete(e),!1}}var rs=new Set;async function is(e){let t=X();if(!e||!t||rs.has(e))return!1;rs.add(e);try{let n=await xr(t,Dr(e,{excludeGraphs:to}));await Q;let r=J();if(!r)throw Error(qn(`load.graph`));return!n||!n.trim()?!1:(ho(r=>[...r,{iri:e,ttl:n,ep:t}]),hr(r,n,`ttl`,H({url:t},0)),Y(e=>e+1),!0)}catch{return rs.delete(e),!1}}var as=mo;function os(e){Da(e)}async function ss(e){let t=++Z,n={setScope:$a,policyScope:eo,lang:me()};if(q(`loading`),Ta([]),$=e.filter(e=>!e.fromSparql),ro=[],!e.length&&X()){Da([]),$=[],Xa(`load.queryEndpointAt`),Ha(!0),await Lo(t,X(),eo,n);return}if(!e.length){Da([]),Sa(null),ka(0),ja(null),Na(null),Fa(null),q(`empty`);return}Xa(`load.sources`),await bo(t,e,[],n)}var cs=null;function ls(e){cs=e}var us=8e3;async function ds(e){if(!cs)return{list:e,error:null};let t=null,n=Symbol(`preprocessing too slow`);try{let r=new Promise(e=>{t=setTimeout(()=>e(n),us)}),i=await Promise.race([cs(e),r]);return i===n?{list:e,error:{message:qn(`err.sourceLayerSlow`)}}:{list:i,error:null}}catch{return{list:e,error:null}}finally{t!==null&&clearTimeout(t)}}export{pi as $,os as A,At,ga as B,Ne as Bt,_o as C,Ir as Ct,ss as D,en as Dt,ls as E,tn as Et,na as F,Ye as Ft,ta as G,He as Gt,pa as H,Dt as Ht,ba as I,Ie as It,Ei as J,Et as Jt,Yi as K,Ve as Kt,aa as L,j as Lt,Gi as M,jt as Mt,ua as N,ze as Nt,Ia as O,kt as Ot,la as P,bt as Pt,Si as Q,oa as R,Fe as Rt,Ma as S,Lr as St,po as T,qn as Tt,sa as U,Tt as Ut,fa as V,A as Vt,ca as W,Be as Wt,fi as X,Xe as Xt,hi as Y,M as Yt,Ci as Z,Ua as _,sr as _t,Va as a,di as at,Ca as b,gr as bt,ns as c,Ur as ct,is as d,fr as dt,ui as et,J as f,lr as ft,qa as g,cr as gt,as as h,_r as ht,X as i,ci as it,Ea as j,Pt as jt,Pa as k,Mt as kt,Uo as l,dr as lt,Qo as m,H as mt,Za as n,si as nt,Aa as o,Rr as ot,za as p,mr as pt,qi as q,x as qt,Ho as r,li as rt,wa as s,Hr as st,Ga as t,ni as tt,Wo as u,yr as ut,zo as v,ur as vt,Oa as w,$n as wt,xa as x,pr as xt,Ya as y,vr as yt,Zi as z,Re as zt};
//# sourceMappingURL=corpus-CW4z7f7_.js.map