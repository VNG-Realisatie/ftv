import{$ as e,C as t,Ct as n,D as r,F as i,H as a,I as o,L as s,M as c,O as l,P as u,Q as d,R as f,S as p,St as m,T as h,V as g,X as _,Y as v,Z as y,_t as ee,a as te,bt as ne,c as re,dt as ie,h as ae,ht as oe,k as se,l as ce,lt as le,mt as ue,nt as de,pt as fe,ut as pe,v as me,vt as he,w as ge,wt as _e,xt as ve,y as ye,yt as be,z as xe}from"./term-CDSKRE3u.js";var b={context:void 0,registry:void 0,effects:void 0,done:!1,getContextId(){return Se(this.context.count)},getNextContextId(){return Se(this.context.count++)}};function Se(e){let t=String(e),n=t.length-1;return b.context.id+(n?String.fromCharCode(96+n):``)+t}function x(e){b.context=e}var Ce=(e,t)=>e===t,S=Symbol(`solid-proxy`),we=typeof Proxy==`function`,Te=Symbol(`solid-track`),Ee={equals:Ce},De=null,Oe=st,C=1,ke=2,Ae={owned:null,cleanups:null,context:null,owner:null},je={},w=null,T=null,E=null,D=null,O=null,Me=0;function Ne(e,t){let n=E,r=w,i=e.length===0,a=t===void 0?r:t,o=i?Ae:{owned:null,cleanups:null,context:a?a.context:null,owner:a},s=i?e:()=>e(()=>j(()=>N(o)));w=o,E=null;try{return M(s,!0)}finally{E=n,w=r}}function k(e,t){t=t?Object.assign({},Ee,t):Ee;let n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0};return[et.bind(n),e=>(typeof e==`function`&&(e=T&&T.running&&T.sources.has(n)?e(n.tValue):e(n.value)),tt(n,e))]}function Pe(e,t,n){nt(it(e,t,!0,C))}function Fe(e,t,n){nt(it(e,t,!1,C))}function Ie(e,t,n){Oe=ct;let r=it(e,t,!1,C),i=Qe&&Xe(Qe);i&&(r.suspense=i),(!n||!n.render)&&(r.user=!0),O?O.push(r):nt(r)}function A(e,t,n){n=n?Object.assign({},Ee,n):Ee;let r=it(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,nt(r),et.bind(r)}function Le(e){return e&&typeof e==`object`&&`then`in e}function Re(e,t,n){let r,i,a;typeof t==`function`?(r=e,i=t,a=n||{}):(r=!0,i=e,a=t||{});let o=null,s=je,c=null,l=!1,u=!1,d=`initialValue`in a,f=typeof r==`function`&&A(r),p=new Set,[m,h]=(a.storage||k)(a.initialValue),[g,_]=k(void 0),[v,y]=k(void 0,{equals:!1}),[ee,te]=k(d?`ready`:`unresolved`);w&&He(()=>{for(let e of p.keys())e.decrement();p.clear(),T&&o&&T.promises.delete(o),o=null}),b.context&&(c=b.getNextContextId(),a.ssrLoadFrom===`initial`?s=a.initialValue:b.load&&b.has(c)&&(s=b.load(c)));function ne(e,t,n,r){return o===e&&(o=null,r!==void 0&&(d=!0),(e===s||t===s)&&a.onHydrated&&queueMicrotask(()=>a.onHydrated(r,{value:t})),s=je,T&&e&&l?(T.promises.delete(e),l=!1,M(()=>{T.running=!0,re(t,n)},!1)):re(t,n)),t}function re(e,t){M(()=>{t===void 0&&h(()=>e),te(t===void 0?d?`ready`:`unresolved`:`errored`),_(t);for(let e of p.keys())e.decrement();p.clear()},!1)}function ie(){let e=Qe&&Xe(Qe),t=m(),n=g();if(n!==void 0&&!o)throw n;return E&&!E.user&&e&&Pe(()=>{v(),o&&(e.resolved&&T&&l?T.promises.add(o):p.has(e)||(e.increment(),p.add(e)))}),t}function ae(e=!0){if(e!==!1&&u)return;u=!1;let t=f?f():r;if(l=T&&T.running,t==null||t===!1){ne(o,j(m));return}T&&o&&T.promises.delete(o);let n,a=s===je?j(()=>{try{return i(t,{value:m(),refetching:e})}catch(e){n=e}}):s;if(n!==void 0){ne(o,void 0,ft(n),t);return}return Le(a)?(o=a,`v`in a?(a.s===1?ne(o,a.v,void 0,t):ne(o,void 0,ft(a.v),t),a):(u=!0,queueMicrotask(()=>u=!1),M(()=>{te(d?`refreshing`:`pending`),y()},!1),a.then(e=>ne(a,e,void 0,t),e=>ne(a,void 0,ft(e),t)))):(ne(o,a,void 0,t),a)}Object.defineProperties(ie,{state:{get:()=>ee()},error:{get:()=>g()},loading:{get(){let e=ee();return e===`pending`||e===`refreshing`}},latest:{get(){if(!d)return ie();let e=g();if(e&&!o)throw e;return m()}}});let oe=w;return f?Pe(()=>(oe=w,ae(!1))):ae(!1),[ie,{refetch:e=>Ge(oe,()=>ae(e)),mutate:h}]}function ze(e){return M(e,!1)}function j(e){if(E===null)return e();let t=E;E=null;try{return e()}finally{E=t}}function Be(e,t,n){let r=Array.isArray(e),i,a=n&&n.defer;return n=>{let o;if(r){o=Array(e.length);for(let t=0;t<e.length;t++)o[t]=e[t]()}else o=e();if(a)return a=!1,n;let s=j(()=>t(o,i,n));return i=o,s}}function Ve(e){Ie(()=>j(e))}function He(e){return w===null||(w.cleanups===null?w.cleanups=[e]:w.cleanups.push(e)),e}function Ue(){return E}function We(){return w}function Ge(e,t){let n=w,r=E;w=e,E=null;try{return M(t,!0)}catch(e){mt(e)}finally{w=n,E=r}}var[Ke,qe]=k(!1);function Je(e){O.push.apply(O,e),e.length=0}function Ye(e,t){let n=Symbol(`context`);return{id:n,Provider:gt(n),defaultValue:e}}function Xe(e){let t;return w&&w.context&&(t=w.context[e.id])!==void 0?t:e.defaultValue}function Ze(e){let t=A(e),n=A(()=>ht(t()));return n.toArray=()=>{let e=n();return Array.isArray(e)?e:e==null?[]:[e]},n}var Qe;function $e(){return Qe||=Ye()}function et(){let e=T&&T.running;if(this.sources&&(e?this.tState:this.state)){if((e?this.tState:this.state)===C)nt(this);else{let e=D;D=null,M(()=>lt(this),!1),D=e}}if(E){let e=this.observers;if(!e||e[e.length-1]!==E){let t=e?e.length:0;E.sources?(E.sources.push(this),E.sourceSlots.push(t)):(E.sources=[this],E.sourceSlots=[t]),e?(e.push(E),this.observerSlots.push(E.sources.length-1)):(this.observers=[E],this.observerSlots=[E.sources.length-1])}}return e&&T.sources.has(this)?this.tValue:this.value}function tt(e,t,n){let r=T&&T.running&&T.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(r,t)){if(T){let r=T.running;(r||!n&&T.sources.has(e))&&(T.sources.add(e),e.tValue=t),r||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&M(()=>{for(let t=0;t<e.observers.length;t+=1){let n=e.observers[t],r=T&&T.running;r&&T.disposed.has(n)||((r?!n.tState:!n.state)&&(n.pure?D.push(n):O.push(n),n.observers&&ut(n)),r?n.tState=C:n.state=C)}if(D.length>1e6)throw D=[],Error()},!1)}return t}function nt(e){if(!e.fn)return;N(e);let t=Me;rt(e,T&&T.running&&T.sources.has(e)?e.tValue:e.value,t),T&&!T.running&&T.sources.has(e)&&queueMicrotask(()=>{M(()=>{T&&(T.running=!0),E=w=e,rt(e,e.tValue,t),E=w=null},!1)})}function rt(e,t,n){let r,i=w,a=E;E=w=e;try{r=e.fn(t)}catch(t){return e.pure&&(T&&T.running?(e.tState=C,e.tOwned&&e.tOwned.forEach(N),e.tOwned=void 0):(e.state=C,e.owned&&e.owned.forEach(N),e.owned=null)),e.updatedAt=n+1,mt(t)}finally{E=a,w=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&`observers`in e?tt(e,r,!0):T&&T.running&&e.pure?(T.sources.has(e)||(e.value=r),T.sources.add(e),e.tValue=r):e.value=r,e.updatedAt=n)}function it(e,t,n,r=C,i){let a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:w,context:w?w.context:null,pure:n};return T&&T.running&&(a.state=0,a.tState=r),w===null||w!==Ae&&(T&&T.running&&w.pure?w.tOwned?w.tOwned.push(a):w.tOwned=[a]:w.owned?w.owned.push(a):w.owned=[a]),a}function at(e){let t=T&&T.running;if((t?e.tState:e.state)===0)return;if((t?e.tState:e.state)===ke)return lt(e);if(e.suspense&&j(e.suspense.inFallback))return e.suspense.effects.push(e);let n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Me);){if(t&&T.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let r=n.length-1;r>=0;r--){if(e=n[r],t){let t=e,i=n[r+1];for(;(t=t.owner)&&t!==i;)if(T.disposed.has(t))return}if((t?e.tState:e.state)===C)nt(e);else if((t?e.tState:e.state)===ke){let t=D;D=null,M(()=>lt(e,n[0]),!1),D=t}}}function M(e,t){if(D)return e();let n=!1;t||(D=[]),O?n=!0:O=[],Me++;try{let t=e();return ot(n),t}catch(e){n||(O=null),D=null,mt(e)}}function ot(e){if(D&&=(st(D),null),e)return;let t;if(T){if(!T.promises.size&&!T.queue.size){let e=T.sources,n=T.disposed;O.push.apply(O,T.effects),t=T.resolve;for(let e of O)`tState`in e&&(e.state=e.tState),delete e.tState;T=null,M(()=>{for(let e of n)N(e);for(let t of e){if(t.value=t.tValue,t.owned)for(let e=0,n=t.owned.length;e<n;e++)N(t.owned[e]);t.tOwned&&(t.owned=t.tOwned),delete t.tValue,delete t.tOwned,t.tState=0}qe(!1)},!1)}else if(T.running){T.running=!1,T.effects.push.apply(T.effects,O),O=null,qe(!0);return}}let n=O;O=null,n.length&&M(()=>Oe(n),!1),t&&t()}function st(e){for(let t=0;t<e.length;t++)at(e[t])}function ct(e){let t,n=0;for(t=0;t<e.length;t++){let r=e[t];r.user?e[n++]=r:at(r)}if(b.context){if(b.count){b.effects||=[],b.effects.push(...e.slice(0,n));return}x()}for(b.effects&&(b.done||!b.count)&&(e=[...b.effects,...e],n+=b.effects.length,delete b.effects),t=0;t<n;t++)at(e[t])}function lt(e,t){let n=T&&T.running;n?e.tState=0:e.state=0;for(let r=0;r<e.sources.length;r+=1){let i=e.sources[r];if(i.sources){let e=n?i.tState:i.state;e===C?i!==t&&(!i.updatedAt||i.updatedAt<Me)&&at(i):e===ke&&lt(i,t)}}}function ut(e){let t=T&&T.running;for(let n=0;n<e.observers.length;n+=1){let r=e.observers[n];(t?!r.tState:!r.state)&&(t?r.tState=ke:r.state=ke,r.pure?D.push(r):O.push(r),r.observers&&ut(r))}}function N(e){let t;if(e.sources)for(;e.sources.length;){let t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){let e=r.pop(),i=t.observerSlots.pop();n<r.length&&(e.sourceSlots[i]=n,r[n]=e,t.observerSlots[n]=i)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)N(e.tOwned[t]);delete e.tOwned}if(T&&T.running&&e.pure)dt(e,!0);else if(e.owned){for(t=e.owned.length-1;t>=0;t--)N(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}T&&T.running?e.tState=0:e.state=0}function dt(e,t){if(t||(e.tState=0,T.disposed.add(e)),e.owned)for(let t=0;t<e.owned.length;t++)dt(e.owned[t])}function ft(e){return e instanceof Error?e:Error(typeof e==`string`?e:`Unknown error`,{cause:e})}function pt(e,t,n){try{for(let n of t)n(e)}catch(e){mt(e,n&&n.owner||null)}}function mt(e,t=w){let n=De&&t&&t.context&&t.context[De],r=ft(e);if(!n)throw r;O?O.push({fn(){pt(r,n,t)},state:C}):pt(r,n,t)}function ht(e){if(typeof e==`function`&&!e.length)return ht(e());if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++){let r=ht(e[n]);if(Array.isArray(r)){if(r.length<32768)t.push.apply(t,r);else for(let e=0;e<r.length;e++)t.push(r[e])}else t.push(r)}return t}return e}function gt(e,t){return function(t){let n;return Fe(()=>n=j(()=>(w.context={...w.context,[e]:t.value},Ze(()=>t.children))),void 0),n}}var _t=Symbol(`fallback`);function vt(e){for(let t=0;t<e.length;t++)e[t]()}function yt(e,t,n={}){let r=[],i=[],a=[],o=0,s=t.length>1?[]:null;return He(()=>vt(a)),()=>{let c=e()||[],l=c.length,u,d;return c[Te],j(()=>{let e,t,p,m,h,g,_,v,y;if(l===0)o!==0&&(vt(a),a=[],r=[],i=[],o=0,s&&=[]),n.fallback&&(r=[_t],i[0]=Ne(e=>(a[0]=e,n.fallback())),o=1);else if(o===0){for(i=Array(l),d=0;d<l;d++)r[d]=c[d],i[d]=Ne(f);o=l}else{for(p=Array(l),m=Array(l),s&&(h=Array(l)),g=0,_=Math.min(o,l);g<_&&r[g]===c[g];g++);for(_=o-1,v=l-1;_>=g&&v>=g&&r[_]===c[v];_--,v--)p[v]=i[_],m[v]=a[_],s&&(h[v]=s[_]);for(e=new Map,t=Array(v+1),d=v;d>=g;d--)y=c[d],u=e.get(y),t[d]=u===void 0?-1:u,e.set(y,d);for(u=g;u<=_;u++)y=r[u],d=e.get(y),d!==void 0&&d!==-1?(p[d]=i[u],m[d]=a[u],s&&(h[d]=s[u]),d=t[d],e.set(y,d)):a[u]();for(d=g;d<l;d++)d in p?(i[d]=p[d],a[d]=m[d],s&&(s[d]=h[d],s[d](d))):i[d]=Ne(f);i=i.slice(0,o=l),r=c.slice(0)}return i});function f(e){if(a[d]=e,s){let[e,n]=k(d);return s[d]=n,t(c[d],e)}return t(c[d])}}}function bt(e,t){return j(()=>e(t||{}))}function xt(){return!0}var St={get(e,t,n){return t===S?n:e.get(t)},has(e,t){return t===S||e.has(t)},set:xt,deleteProperty:xt,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:xt,deleteProperty:xt}},ownKeys(e){return e.keys()}};function Ct(e){return(e=typeof e==`function`?e():e)?e:{}}function wt(){for(let e=0,t=this.length;e<t;++e){let t=this[e]();if(t!==void 0)return t}}function Tt(...e){let t=!1;for(let n=0;n<e.length;n++){let r=e[n];t||=!!r&&S in r,e[n]=typeof r==`function`?(t=!0,A(r)):r}if(we&&t)return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){let r=Ct(e[n])[t];if(r!==void 0)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in Ct(e[n]))return!0;return!1},keys(){let t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(Ct(e[n])));return[...new Set(t)]}},St);let n={},r=Object.create(null);for(let t=e.length-1;t>=0;t--){let i=e[t];if(!i)continue;let a=Object.getOwnPropertyNames(i);for(let e=a.length-1;e>=0;e--){let t=a[e];if(t===`__proto__`||t===`constructor`)continue;let o=Object.getOwnPropertyDescriptor(i,t);if(!r[t])r[t]=o.get?{enumerable:!0,configurable:!0,get:wt.bind(n[t]=[o.get.bind(i)])}:o.value===void 0?void 0:o;else{let e=n[t];e&&(o.get?e.push(o.get.bind(i)):o.value!==void 0&&e.push(()=>o.value))}}}let i={},a=Object.keys(r);for(let e=a.length-1;e>=0;e--){let t=a[e],n=r[t];n&&n.get?Object.defineProperty(i,t,n):i[t]=n?n.value:void 0}return i}function Et(e,...t){let n=t.length;if(we&&S in e){let r=n>1?t.flat():t[0],i=new Set,a=t.map(t=>{let n=t.filter(e=>!i.has(e)&&(i.add(e),!0));return new Proxy({get(t){return n.includes(t)?e[t]:void 0},has(t){return n.includes(t)&&t in e},keys(){return n.filter(t=>t in e)}},St)});return a.push(new Proxy({get(t){return r.includes(t)?void 0:e[t]},has(t){return!r.includes(t)&&t in e},keys(){return Object.keys(e).filter(e=>!r.includes(e))}},St)),a}let r=[];for(let e=0;e<=n;e++)r[e]={};for(let i of Object.getOwnPropertyNames(e)){let a=n;for(let e=0;e<t.length;e++)if(t[e].includes(i)){a=e;break}let o=Object.getOwnPropertyDescriptor(e,i);!o.get&&!o.set&&o.enumerable&&o.writable&&o.configurable?r[a][i]=o.value:Object.defineProperty(r[a],i,o)}return r}function Dt(e){let t,n,r=()=>{if(!n){let r=n=e();r.then(e=>{t=()=>e.default},()=>{n===r&&(n=void 0)})}return n},i=e=>{let n=b.context;if(n){let[e,i]=k();b.count||=0,b.count++,r().then(e=>{!b.done&&x(n),b.count--,i(()=>e.default),x()},e=>{!b.done&&x(n),b.count--,i(()=>()=>{throw e}),x()}),t=e}else if(!t){let[e]=Re(()=>r().then(e=>e.default));t=e,He(()=>t=void 0)}let i;return A(()=>(i=t?.())?j(()=>{if(!n||b.done)return i(e);let t=b.context;x(n);let r=i(e);return x(t),r}):``)};return i.preload=()=>r(),i}var Ot=e=>`Stale read from <${e}>.`;function kt(e){let t=`fallback`in e&&{fallback:()=>e.fallback};return A(yt(()=>e.each,e.children,t||void 0))}function At(e){let t=e.keyed,n=A(()=>e.when,void 0,void 0),r=t?n:A(n,void 0,{equals:(e,t)=>!e==!t});return A(()=>{let i=r();if(i){let a=e.children;return typeof a==`function`&&a.length>0?j(()=>a(t?i:()=>{if(!j(r))throw Ot(`Show`);return n()})):a}return e.fallback},void 0,void 0)}function jt(e){let t=Ze(()=>e.children),n=A(()=>{let e=t(),n=Array.isArray(e)?e:[e],r=()=>void 0;for(let e=0;e<n.length;e++){let t=e,i=n[e],a=r,o=A(()=>a()?void 0:i.when,void 0,void 0),s=i.keyed?o:A(o,void 0,{equals:(e,t)=>!e==!t});r=()=>a()||(s()?[t,o,i]:void 0)}return r});return A(()=>{let t=n()();if(!t)return e.fallback;let[r,i,a]=t,o=a.children;return typeof o==`function`&&o.length>0?j(()=>o(a.keyed?i():()=>{if(j(n)()?.[0]!==r)throw Ot(`Match`);return i()})):o},void 0,void 0)}function Mt(e){return e}var Nt=Ye();function Pt(e){let t=0,n,r,i,a,o,[s,c]=k(!1),l=$e(),u={increment:()=>{++t===1&&c(!0)},decrement:()=>{--t===0&&c(!1)},inFallback:s,effects:[],resolved:!1},d=We();if(b.context&&b.load){let e=b.getContextId(),t=b.load(e);if(t&&(typeof t!=`object`||t.s!==1?i=t:b.gather(e)),i&&i!==`$$f`){let[t,n]=k(void 0,{equals:!1});a=t,i.then(()=>{if(b.done)return n();b.gather(e),x(r),n(),x()},e=>{o=e,n()})}}let f=Xe(Nt);f&&(n=f.register(u.inFallback));let p;return He(()=>p&&p()),bt(l.Provider,{value:u,get children(){return A(()=>{if(o)throw o;if(r=b.context,a){a(),a=void 0;return}r&&i===`$$f`&&x();let t=A(()=>e.children);return A(a=>{let o=u.inFallback(),{showContent:s=!0,showFallback:c=!0}=n?n():{};if((!o||i&&i!==`$$f`)&&s)return u.resolved=!0,p&&p(),p=r=i=void 0,Je(u.effects),t();if(c)return p?a:Ne(t=>(p=t,r&&=(x({id:r.id+`F`,count:0}),void 0),e.fallback),d)})})}})}var{Store:Ft,termFromId:It}=m;function Lt(){return new Ft}function Rt(e,{termText:t,termOffsets:n,quadTable:r},{chunkSize:i=25e3,onProgress:a=null}={}){let o=n.length-1,s=Array(o);for(let e=0;e<o;e++)s[e]=It(t.substring(n[e],n[e+1]));let c=e._entityIndex;if(c&&c._termToNewNumericId)for(let e of s)c._termToNewNumericId(e);let l=e=>s[e],u=r.length/4;return new Promise(t=>{let n=0,o=()=>{let s=Math.min(u,n+i);for(;n<s;n++)e.addQuad(l(r[n*4]),l(r[n*4+1]),l(r[n*4+2]),l(r[n*4+3]));a&&a(n,u),n<u?setTimeout(o,0):t(e)};o()})}function zt(e,{setScope:t=null,lang:n=null,onProgress:r=null,onStore:i=null}={}){return new Promise((a,o)=>{let s;try{s=new Worker(new URL(``+new URL(`model-worker-CnRitmUR.js`,import.meta.url).href,``+import.meta.url),{type:`module`})}catch(e){o(e);return}let c=!1,l=e=>{s.terminate(),c?i&&i(null):o(Error(e))};s.onerror=e=>l(e&&e.message?e.message:`worker kon niet starten`),s.onmessage=e=>{let t=e.data||{};if(t.type===`progress`){!c&&r&&r(t);return}if(t.type===`model`){c=!0,y(t.prefixes),a(t);return}if(t.type===`store`){s.terminate(),i&&i(t);return}t.type===`error`&&l(t.message)},s.postMessage({sources:e,setScope:t,lang:n})})}var{quad:Bt}=_e,Vt=`http://www.w3.org/ns/odrl/2/`,Ht=`http://purl.org/dc/terms/`,Ut=`https://schema.org/`,Wt=[],P=`PREFIX odrl: <http://www.w3.org/ns/odrl/2/>
PREFIX dct:  <http://purl.org/dc/terms/>
PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX schema: <https://schema.org/>
`;async function Gt(e,t,n,r){let i=await(r||globalThis.fetch)(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`,Accept:n},body:`query=`+encodeURIComponent(t)});if(!i.ok){let e=``;try{e=(await i.text()).slice(0,200)}catch{}throw Error(`SPARQL HTTP ${i.status}${e?` — `+e:``}`)}return i}async function F(e,t,n){let r=await(await Gt(e,t,`application/sparql-results+json`,n)).json();return r&&r.results&&r.results.bindings||[]}async function Kt(e,t,n){return(await Gt(e,t,`text/turtle`,n)).text()}function qt(e){return!!e&&e.termType===`BlankNode`}function Jt(e,t){let n=[],r=0;for(let t of e){if(qt(t.subject)||qt(t.object)){r++;continue}n.push(t)}return r&&console.warn(`SPARQL Update: ${r} ${t}-triple(s) met blank node overgeslagen (DELETE/INSERT DATA staat geen blank nodes toe)`),{kept:n,skipped:r}}var Yt=/^[A-Za-z]+(-[A-Za-z0-9]+)*$/;function Xt(e){if(!Yt.test(String(e)))throw Error(`ongeldige taal-tag voor SPARQL: `+e)}function Zt(e){e&&(e.termType===`NamedNode`?I(e.value):e.termType===`Literal`&&(e.language&&Xt(e.language),e.datatype&&Zt(e.datatype)))}function Qt(e){let t=new n,r=e.map(e=>(Zt(e.subject),Zt(e.predicate),Zt(e.object),Bt(e.subject,e.predicate,e.object)));return t.quadsToString(r)}function $t({added:e=[],removed:t=[]}={}){let n=Jt(t,`DELETE`),r=Jt(e,`INSERT`),i=[];return n.kept.length&&i.push(`DELETE DATA {
`+Qt(n.kept)+`}`),r.kept.length&&i.push(`INSERT DATA {
`+Qt(r.kept)+`}`),{query:i.join(`;
`),skipped:n.skipped+r.skipped}}async function en(e,t,n){let r=await(n||globalThis.fetch)(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`},body:`update=`+encodeURIComponent(t)});if(!r.ok){let e=``;try{e=(await r.text()).slice(0,200)}catch{}throw Error(`SPARQL update HTTP ${r.status}${e?` — `+e:``}`)}}function I(e){let t=String(e||``);if(!/^[^<>"{}|^`\\\s]+$/.test(t))throw Error(`ongeldige IRI voor SPARQL: `+t);return`<`+t+`>`}function L(e,t){return!t||!t.length?``:`FILTER(${e} NOT IN (${t.map(I).join(`, `)}))`}var tn=ne.find(e=>e.id===`prov`);function R(e,t){let n=[...tn.memberPreds.map(n=>`{ ${e} <${n}> ${t} }`),...tn.inverseMemberPreds.map(n=>`{ ${t} <${n}> ${e} }`)];return n.length===1?n[0].replace(/^\{ | \}$/g,``)+` .`:n.join(` UNION `)}var nn=ve.map(e=>`<${e}>`).join(`|`),rn=(e,t,n,r)=>`  OPTIONAL { ${e} schema:validFrom ${n}_s }
  OPTIONAL { ${e} schema:validThrough ${r}_s }
  OPTIONAL {
    ${e} dct:valid ${t} .
    OPTIONAL { ${t} dcat:startDate ${n}_n }
    OPTIONAL { ${t} dcat:endDate ${r}_n }
  }
  BIND(COALESCE(${n}_s, ${n}_n) AS ${n})
  BIND(COALESCE(${r}_s, ${r}_n) AS ${r})`;function an(){return`${P}
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
            ${R(`?cX`,`?v`)}
            FILTER(isIRI(?v))
            # Een versie is een GETYPEERDE policy óf een documentversie (stub):
            # een lid dat zelf geen odrl-type draagt maar wel versiegegevens.
            # Dezelfde toets als readTemporalContainers in parse.js. Zonder de
            # stub-tak telde /brp-ap elke overeenkomst als "1 versie" (de
            # vervangen besluitversies zijn daar kale prov:Entity's) en bleven
            # de pijlen op elke ingeklapte kaart uit. Meetpunt: 3,2 s → 3,8 s
            # op 13,9k policies — het typecheck-alternatief zonder subquery
            # kostte 31 s, dus deze vorm blijft staan.
            { VALUES ?vt { odrl:Set odrl:Offer odrl:Agreement odrl:Request } ?v a ?vt }
            UNION
            { ?v ${nn} ?vd }
          } GROUP BY ?cX }
        ${R(`?cX`,`?policy`)}
        OPTIONAL { ?cX dct:title ?ctX }
      } GROUP BY ?policy }
  }
  # Datering van de versie: dct:issued (de datum die de versienavigator toont)
  # en de geldingsperiode. Zonder deze takken stond in lijstmodus overal een
  # "—" in de chip. Meer dateringsvormen kent het profiel niet.
  OPTIONAL { ?policy dct:issued ?iss }
${rn(`?policy`,`?vn`,`?vf`,`?vt`)}
  OPTIONAL { ?policy prov:wasRevisionOf ?rev }
  # Agreement->Offer-koppeling (SAMPLE: één per policy), zodat de skelet-graaf
  # de terugverwijzings-lijst "overeenkomsten op dit aanbod" kan vullen. De
  # typecheck houdt grondslag-/bronverwijzingen (wetten, datasets) buiten.
  # Gemeten (12,5k policies): geen meetbare vertraging t.o.v. de basisquery.
  OPTIONAL { ?policy prov:wasDerivedFrom ?ofX . ?ofX a odrl:Offer }
  # Agreement->Request-koppeling, langs hetzelfde predicaat en met dezelfde
  # typecheck. Een EIGEN kolom (niet dezelfde ?ofX): een overeenkomst draagt
  # meestal BEIDE — het aanbod dat zij invult en het verzoek dat zij
  # beantwoordt — en één SAMPLE zou er willekeurig één van laten vallen.
  # Hiermee kan de verzoek-kaart de regel "beantwoord door <overeenkomst>"
  # tonen zonder dat het detail van die overeenkomst geladen is; zonder deze
  # tak leek op /brp-ap elk van de 1.151 verzoeken onbeantwoord.
  # Gemeten (25-8, Fuseki, 5 rondes, mediaan) mét/zonder de Request-soort én
  # deze kolom: /brp-ap 436/405 ms (3.733 t.o.v. 2.582 rijen), /brp 2.005/1.754
  # ms (13.706 t.o.v. 12.555 rijen). Fase 1 blijft 10 ms.
  OPTIONAL { ?policy prov:wasDerivedFrom ?rqX . ?rqX a odrl:Request }
  # Dezelfde relatie nog één keer, maar OMGEKEERD: welke overeenkomst wijst
  # naar DEZE policy? Op een verzoek-rij is dat de overeenkomst waarin erop
  # beslist is, en daar hangt de vaste regel op de verzoek-kaart aan.
  #
  # Waarom niet genoeg aan de kolom hierboven: die is een SAMPLE PER
  # OVEREENKOMST, en een overeenkomst komt vaak uit MEERDERE verzoeken voort
  # (890501-v13: drie). De niet-gekozen verzoeken zagen er dan onbeantwoord
  # uit — op /brp-ap bereikte de agreement-kant 880 van de 1.151 verzoeken,
  # deze kant alle 1.151. Andersom is de SAMPLE wél veilig: op een verzoek
  # volgt één beslissing.
  # Gemeten (25-8, Fuseki, 3 rondes, /brp-ap) mét/zonder: 0,47/0,56 s — binnen
  # de ruis; het antwoord groeit met 140 kB.
  OPTIONAL { ?ansX prov:wasDerivedFrom ?policy . ?ansX a odrl:Agreement }
}
GROUP BY ?policy ?kind
`}function on(){return`${P}
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
`}function sn(){return`${P}
SELECT ?container ?policy ?containerTitle
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ${R(`?container`,`?policy`)}
  FILTER(isIRI(?container) && isIRI(?policy))
  OPTIONAL { ?container dct:title ?containerTitle }
}
`}function cn(){return`${P}
SELECT ?container (COUNT(DISTINCT ?v) AS ?n)
WHERE {
  ${R(`?container`,`?v`)}
  FILTER(isIRI(?container) && isIRI(?v))
  { VALUES ?vt { odrl:Set odrl:Offer odrl:Agreement odrl:Request } ?v a ?vt }
  UNION
  { ?v ${nn} ?vd }
}
GROUP BY ?container
`}function ln(){return`${P}
SELECT ?policy ?issued ?validFrom ?validTo ?valid ?revisionOf
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  FILTER(isIRI(?policy))
  OPTIONAL { ?policy dct:issued ?issued }
${rn(`?policy`,`?valid`,`?validFrom`,`?validTo`)}
  OPTIONAL { ?policy prov:wasRevisionOf ?revisionOf }
}
`}function un(){return`${P}
SELECT DISTINCT ?policy ?offer
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?offer .
  ?offer a odrl:Offer .
  FILTER(isIRI(?policy))
}
`}function dn(){return`${P}
SELECT DISTINCT ?policy ?request
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?request .
  ?request a odrl:Request .
  FILTER(isIRI(?policy))
}
`}function fn(){return`${P}
SELECT DISTINCT ?policy ?agreement
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?agreement prov:wasDerivedFrom ?policy .
  ?agreement a odrl:Agreement .
  FILTER(isIRI(?policy))
}
`}function pn(e,t,n,r,i,{lang:a=null,requestRefs:o=[],answeredByRefs:s=[]}={}){let c=e=>e?e.value:null,l=a||le(),u=(e,t)=>!e||pe(t[`xml:lang`]||``,l)<pe(e[`xml:lang`]||``,l),d=new Map;for(let e of t||[]){let t=c(e&&e.policy);if(!t||!e.container)continue;let n=d.get(t);n||(n={container:e.container,containerTitle:null},d.set(t,n)),e.containerTitle&&e.container.value===n.container.value&&u(n.containerTitle,e.containerTitle)&&(n.containerTitle=e.containerTitle)}let f=new Map;for(let e of n||[]){let t=c(e&&e.container);t&&e.n&&(f.has(t)||f.set(t,e.n))}let p=[`issued`,`validFrom`,`validTo`,`valid`,`revisionOf`],m=new Map;for(let e of r||[]){let t=c(e&&e.policy);if(!t)continue;let n=m.get(t);n||(n={},m.set(t,n));for(let t of p)!n[t]&&e[t]&&(n[t]=e[t])}let h=new Map;for(let e of i||[]){let t=c(e&&e.policy);t&&e.offer&&(h.has(t)||h.set(t,e.offer))}let g=new Map;for(let e of o||[]){let t=c(e&&e.policy);t&&e.request&&(g.has(t)||g.set(t,e.request))}let _=new Map;for(let e of s||[]){let t=c(e&&e.policy);t&&e.agreement&&(_.has(t)||_.set(t,e.agreement))}let v=[],y=new Map;for(let t of e||[]){if(!t||!t.policy)continue;let e=t.policy.value+`\0`+(c(t.kind)||``),n=y.get(e);n||(n={policy:t.policy},t.kind&&(n.kind=t.kind),y.set(e,n),v.push(n)),t.title&&u(n.title,t.title)&&(n.title=t.title),!n.assignee&&t.assignee?(n.assignee=t.assignee,t.assigneeLabel&&(n.assigneeLabel=t.assigneeLabel)):n.assignee&&t.assigneeLabel&&t.assignee&&t.assignee.value===n.assignee.value&&u(n.assigneeLabel,t.assigneeLabel)&&(n.assigneeLabel=t.assigneeLabel)}for(let e of v){let t=e.policy.value,n=d.get(t);if(n){e.container=n.container,n.containerTitle&&(e.containerTitle=n.containerTitle);let t=f.get(n.container.value);t&&(e.versionCount=t)}let r=m.get(t);if(r)for(let t of p)r[t]&&(e[t]=r[t]);let i=h.get(t);i&&(e.offerRef=i);let a=g.get(t);a&&(e.requestRef=a);let o=_.get(t);o&&(e.answeredByRef=o)}return v}function mn(e){let t=String(e&&e.message||e||``);return/SPARQL HTTP 5\d\d/.test(t)||/\btimed out\b|\btimeout\b/i.test(t)}async function hn(e,t,{lang:n=null}={}){let[r,i,a,o,s,c,l]=await Promise.all([F(e,on(),t),F(e,sn(),t),F(e,cn(),t),F(e,ln(),t),F(e,un(),t),F(e,dn(),t),F(e,fn(),t)]);return pn(r,i,a,o,s,{lang:n,requestRefs:c,answeredByRefs:l})}function gn({limitPerKind:e=60}={}){let t=Math.max(1,e|0),n=(e,n)=>`  {
    { SELECT ?policy WHERE { ?policy a ${e} . FILTER(isIRI(?policy)) } LIMIT ${t} }
    BIND("${n}" AS ?kind)
  }`;return`${P}
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
`}function _n(){return`${P}
SELECT ?container ?kind ?version
       (SAMPLE(?ct)  AS ?containerTitle)
       (SAMPLE(?t)   AS ?title)
       (SAMPLE(?vf)  AS ?validFrom) (SAMPLE(?vt) AS ?validTo)
       (SAMPLE(?vn)  AS ?valid)
       (SAMPLE(?iss) AS ?issued)
WHERE {
  VALUES (?typeHint ?kind) { (odrl:Set "set") (odrl:Offer "offer") (odrl:Agreement "agreement") (odrl:Request "request") }
  ?container dct:type ?typeHint .
  ${R(`?container`,`?version`)}
  FILTER(isIRI(?container) && isIRI(?version))
  OPTIONAL { ?container dct:title ?ct }
  OPTIONAL { ?version dct:title ?t }
${rn(`?version`,`?vn`,`?vf`,`?vt`)}
  OPTIONAL { ?version dct:issued ?iss }
}
GROUP BY ?container ?kind ?version
`}var vn=`http://www.w3.org/ns/odrl/2/`,yn=(e,t)=>`${e} rdf:type ?dt${t} .
      FILTER(!STRSTARTS(STR(?dt${t}), "${vn}"))`,bn=`(odrl:permission|odrl:prohibition|odrl:obligation|odrl:duty|odrl:remedy|odrl:consequence|odrl:constraint|odrl:refinement|odrl:action|odrl:target|odrl:rightOperand|dct:valid|odrl:and|odrl:or|odrl:xone|odrl:andSequence|rdf:first|rdf:rest)*`,xn=`rdf:type, dct:title, dct:issued, schema:validFrom, schema:validThrough, dct:valid, odrl:uid, prov:wasRevisionOf, prov:specializationOf, prov:wasDerivedFrom`;function Sn(e,{excludeGraphs:t=Wt}={}){let n=I(e),r=(e,r,i,a)=>t&&t.length?`${n} ${bn} ${e} .
    GRAPH ${a} { ${e} ${r} ${i} . }
    ${L(a,t)}`:`${n} ${bn} ${e} . ${e} ${r} ${i} .`,i=(e,r,i)=>t&&t.length?`${n} ${bn}${e} ${r} .
    GRAPH ${i} { ${r} ?lp ?ll . }
    ${L(i,t)}`:`${n} ${bn}${e} ${r} . ${r} ?lp ?ll .`,a=`(dct:hasPart|^odrl:partOf)`,o=`(odrl:permission|odrl:prohibition|odrl:obligation|odrl:duty)`,s=`(odrl:constraint|odrl:refinement)`,c=(e,t)=>i(`/`+a,e,t),l=(e,t)=>i(`/`+a+`/rdf:type`,e,t),u=e=>t&&t.length?`${n} ${bn} ?ll .
    GRAPH ${e} { ?x odrl:partOf ?ll . }
    ${L(e,t)}`:`${n} ${bn} ?ll .
    ?x odrl:partOf ?ll .`,d=`prov:wasDerivedFrom`,f=(e,r)=>t&&t.length?`${n} ${d} ?req . ?req a odrl:Request .
    ?req ${e} ?x .
    GRAPH ${r} { ?x ?lp ?ll . }
    ${L(r,t)}`:`${n} ${d} ?req . ?req a odrl:Request . ?req ${e} ?x . ?x ?lp ?ll .`,p=`(odrl:permission|odrl:prohibition|odrl:obligation)?`,m=`odrl:inheritFrom`,h=(e,r,i,a)=>t&&t.length?`${n} ${m}/${bn} ${e} .
    GRAPH ${a} { ${e} ${r} ${i} . }
    ${L(a,t)}`:`${n} ${m}/${bn} ${e} . ${e} ${r} ${i} .`;return`${P}
CONSTRUCT {
  ?s ?p ?o .
  ?c ?cp ?co .
  ?v ?vp ?vo .
  ?x ?lp ?ll .
}
WHERE {
  {
    # 1. sluiting van de policy zelf
    ${r(`?s`,`?p`,`?o`,`?g1`)}
  } UNION {
    # 2. temporele container (met lidmaatschap naar alle versies)
    ${R(`?c`,n)}
    ?c ?cp ?co .
    # Blanke objecten blijven buiten beeld — een container is een platte knoop —
    # MET één uitzondering: een niet-gemigreerde graaf kan zijn geldingsperiode
    # nog als blanke dct:PeriodOfTime-knoop dragen, en die draagt dan de
    # datering van het CG-documentpatroon. De eigen vorm (schema:validFrom/
    # validThrough) bestaat uit platte literals en komt hier gewoon mee.
    FILTER(!isBlank(?co) || ?cp = dct:valid)
  } UNION {
    # 3. zusterversies: metadata voor de versie-kiezer (incl. vervallen)
    ${R(`?c2`,n)}
    ${R(`?c2`,`?v`)}
    ?v ?vp ?vo .
    FILTER(?vp IN (${xn}))
  } UNION {
    # 3b. TERUGVAL: geldingsperiode-KNOPEN van de container en van de
    # zusterversies. Op schema-data doet deze tak NIETS — daar zijn de datums
    # platte literals op de versie zelf en komen ze al mee met tak 2 (?c ?cp ?co)
    # en tak 3 (VERSION_META_PREDS). Hij blijft staan voor niet-gemigreerde
    # grafen en derden-data, waar het object van dct:valid een blanke
    # dct:PeriodOfTime-knoop is: tak 2 en 3 halen dan wel de dct:valid-TRIPLE op
    # maar niet dcat:startDate/endDate erachter, en stond de versie-kiezer
    # zonder data. De policy's eigen periode zit al in tak 1 (dct:valid staat in
    # CLOSURE_PATH). Goedkoop: hooguit één knoop van drie triples per versie, en
    # op schema-data bindt ?cp1/?vp1 dct:valid nergens aan.
    {
      ${R(`?cp1`,n)}
      ?cp1 dct:valid ?x .
    } UNION {
      ${R(`?cp2`,n)}
      ${R(`?cp2`,`?vp1`)}
      ?vp1 dct:valid ?x .
    }
    ?x ?lp ?ll .
  } UNION {
    # 4a. labels van geraakte predicaten
    ${r(`?sa`,`?x`,`?oa`,`?g4a`)}
    ?x ?lp ?ll .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title))
  } UNION {
    # 4b. labels van geraakte IRI-objecten (plus rdf:type, zodat de modelcode
    # bv. wasDerivedFrom-doelen als odrl:Offer herkent en het "Vult aanbod
    # in"-veld ook in sparql-modus vult)
    ${r(`?sb`,`?pb`,`?x`,`?g4b`)}
    FILTER(isIRI(?x))
    ?x ?lp ?ll .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))
  } UNION {
    # 4c. labels van de KLASSEN van die IRI-objecten. De ledenlijst van een
    # gegevensset groepeert op rdf:type van het lid en toont het klasse-label
    # als groepskop (audit-punt C1). Branch 4b haalt dat rdf:type wél op maar
    # het LABEL van de klasse zelf staat één hop verder; zonder deze tak viel
    # het kopje in endpoint-modus terug op de localName ("Rubriek"), die
    # toevallig Nederlands oogt maar geen label is — en dus ook niet met de
    # taal mee kon wisselen (B16). Bewust als ÉÉN propertypad geschreven en
    # gebonden aan het lidmaatschapspad (MEMBER_HOP, hetzelfde pad dat
    # collectionMembers in parse.js leest). Dat is geen stijlkwestie: gemeten
    # op /brp kost deze vorm 9 ms, terwijl dezelfde patronen als losse triples
    # (?coll dct:hasPart ?xc . ?xc a ?x . ?x ?lp ?ll) ARQ tot een plan
    # verleiden dat 1,0-1,3 s kost.
    ${l(`?x`,`?g4c`)}
    FILTER(?lp IN (rdfs:label, skos:prefLabel))
  } UNION {
    # 4d. LEDEN via de ODRL-kernrichting. Hangt het lidmaatschap aan de
    # COLLECTIE (dct:hasPart), dan is elk lid een object binnen de sluiting en
    # levert 4b zijn label en rdf:type. Hangt het aan het LID (lid odrl:partOf
    # collectie, de kernvorm sinds de migratie), dan is het lid nergens object
    # en zou de ledenlijst in endpoint-modus leeg blijven. Deze tak loopt het
    # lidmaatschapspad daarom expliciet af — de inverse hop staat IN het
    # propertypad, om dezelfde reden als bij 4c — en haalt precies op wat de
    # ledenlijst nodig heeft: het label, het groepeertype, en de
    # lidmaatschapstriple zelf (anders kent de modelcode het verband niet).
    # Meting op /brp-ap, 510228-v13 (3.264 leden): met deze tak duurt de hele
    # detailquery 0,34 s; met de hop in de ster-groep (CLOSURE_PATH) 1,1 s.
    ${c(`?x`,`?g4d`)}
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))
  } UNION {
    # 4e. DE LIDMAATSCHAPSTRIPLE ZELF — en dit is de tak die op schaal telt.
    #
    # Zij stond tot 14 sep 2026 als odrl:partOf in het predicaatfilter van
    # tak 4d hierboven. Dat filter selecteert op PREDICAAT en niet op OBJECT, en
    # dus kwam van elk lid zijn lidmaatschap van ÉLKE collectie in de store mee —
    # ook van de 12.548 andere overeenkomsten die de lezer niet openklapte.
    #
    # GEMETEN op de staande /brp (Fuseki TDB2, 3.411.207 triples, 12.549
    # overeenkomsten), ontleed-detail.mjs/ontleed-triples.log in de
    # dt4-workspace: het detail van ÉÉN overeenkomst (008001-v6) was 4,36 MB en
    # 177.947 triples, waarvan 177.412 odrl:partOf — 99,7% van het antwoord.
    # Eén rubriek als datumOverlijdenOverlijden droeg er in zijn eentje 18.853
    # van. Voor 008001-v5 was hetzelfde antwoord 37,95 MB. De meting die bij tak
    # 4d in de code staat (/brp-ap 510228-v13, 3.264 leden, 0,34 s) zag dit niet:
    # op dat corpus hoort een rubriek bij een handvol gegevenssets.
    #
    # DE SEMANTIEK BLIJFT. De weergave leest het lidmaatschap om de ledenlijst
    # van de collectie in BEELD te kunnen groeperen; die collectie zit per
    # definitie in deze sluiting. Wat wegvalt is het lidmaatschap van collecties
    # die op deze kaart niet bestaan — materiaal dat de weergave nooit heeft
    # aangeraakt.
    ${u(`?g4e`)}
    BIND(odrl:partOf AS ?lp)
  } UNION {
    # 5a. VINDPLAATS: het ankerobject van prov:hadPrimarySource op een regel.
    # Anders dan dpv:hasLegalBasis (de wettelijke grondslag) wijst dit naar de PLEK
    # in het brondocument waar de regel vandaan komt — in de brp-ap-data
    # <pdf-url#page=n>, een eigen entiteit met rdfs:label ("… , p. 1"),
    # dct:isPartOf naar het besluitdocument en een paginanummer. Branch 4b
    # levert alleen label+type van dat anker; hier komen zijn ÓVERIGE eigen
    # triples mee, zodat de weergave de vindplaats compleet kent. Bewust
    # ongefilterd op predicaat: welke term een dataset voor "pagina" gebruikt
    # is datasetkennis en hoort niet in deze generieke laag. Blanke objecten
    # blijven buiten beeld (zoals in tak 2) — een anker is een platte knoop.
    ${i(`/prov:hadPrimarySource`,`?x`,`?g5a`)}
    FILTER(!isBlank(?ll))
  } UNION {
    # 5b. het BRONDOCUMENT één hop achter de vindplaats (dct:isPartOf voor een
    # pagina-anker, dct:isFormatOf wanneer het anker het bestand zelf is):
    # zijn kenmerk en titel, zodat de weergave de vindplaats kan benoemen
    # zonder een tweede query. Beperkt tot identificerende velden — de rest
    # van een documentbeschrijving hoort bij het document, niet bij de regel.
    ${i(`/prov:hadPrimarySource/(dct:isPartOf|dct:isFormatOf)`,`?x`,`?g5b`)}
    FILTER(?lp IN (dct:identifier, skos:notation, dct:title, rdfs:label))
  } UNION {
    # 6a. VERZOEK: de aanvraag (odrl:Request) waaruit deze overeenkomst
    # voortkwam, als MINI-STUB in de data — kenmerk, datum en één minimale
    # permission met de indiener. Branch 4b levert van dat verzoek alleen
    # label + rdf:type (het is een object van de policy); deze tak haalt de
    # velden op die de Verzoek-regel toont, plus de regelknoop waar de
    # indiener aan hangt. Bewust GEFILTERD op predicaat: een verzoek dat
    # toevallig een volledige policy is (de zelfstandige verzoeken in het
    # wilde corpus) mag deze detailquery niet laten uitdijen — die heeft zijn
    # eigen kaart en dus zijn eigen detail-CONSTRUCT.
    # Gemeten (24-8, Fuseki, 5 rondes, mediaan) mét/zonder deze twee takken,
    # op /brp-ap MET 1.151 verzoeken in de store: 008001-v6 (1,6 MB antwoord)
    # 153/182 ms, /odrl 250001-v33 147/159 ms — binnen de ruis; het antwoord
    # groeit met ~500 B (de triples van het ene verzoek).
    ${f(p,`?g6a`)}
    FILTER(?lp IN (rdf:type, dct:identifier, skos:notation, dct:issued,
                   dct:title, rdfs:label, odrl:uid, odrl:assignee,
                   prov:wasDerivedFrom,
                   odrl:permission, odrl:prohibition, odrl:obligation))
  } UNION {
    # 6b. de INDIENER van dat verzoek: het label van de odrl:assignee. Die kan
    # een bestaande afnemer-IRI zijn (label staat elders in de graaf) of een
    # eigen partij-knoop met alleen een rdfs:label; beide komen hier binnen.
    ${f(p+`/odrl:assignee`,`?g6b`)}
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title))
  } UNION {
    # 6c. het AANBOD dat dat verzoek aanvraagt (note §4, Request→Offer). De
    # link zelf komt met tak 6a mee (prov:wasDerivedFrom staat sinds aug 2026
    # in dat predicaatfilter); wat er nog ontbrak is de andere KANT: zonder
    # rdf:type op het doelwit weet de modelcode niet dat het een odrl:Offer is
    # — en dan is de aanvraag-zin "vraagt … aan" geen aanvraag meer maar
    # gewone herkomst, precies het verschil dat de betekenistabel maakt. De
    # titel hoort erbij omdat de zin de aanbodNAAM toont; zonder haar stond er
    # een kale localName. Dit was zichtbaar op /breda: in ttl-modus stond de
    # zin er, in sparql-modus niet.
    #
    # Vormregel als 6a/6b: het pad ná ?req in ÉÉN propertypad, alleen het
    # OPHALEN graph-gescopet. Bewust gefilterd op de identificerende velden —
    # het aanbod heeft zijn eigen kaart en dus zijn eigen detailquery.
    # Gemeten (25-8, Fuseki, 5 rondes, mediaan) mét/zonder tak 6c én het
    # verruimde 6a-filter: /brp-ap 008001-v6 198/193 ms (1.950 KB, gelijk),
    # /brp 250001-v33 844/865 ms (9.448 KB, gelijk) — binnen de ruis.
    ${f(`prov:wasDerivedFrom`,`?g6c`)}
    FILTER(?lp IN (rdf:type, dct:title, rdfs:label, skos:prefLabel))
  } UNION {
    # 7a. OUDERBELEID (odrl:inheritFrom, één hop) MET zijn regels: dezelfde
    # sluiting als tak 1, maar vanaf de ouder. Ongefilterd op predicaat — de
    # vouwrij toont de ouderregels als volwaardige regel-rijen, dus die hebben
    # dezelfde velden nodig als de eigen regels (titel, actie, doel, targets,
    # voorwaarden). Zonder inheritFrom in de graaf bindt ?x nergens aan en kost
    # de tak niets.
    ${h(`?x`,`?lp`,`?ll`,`?g7a`)}
  } UNION {
    # 7b. labels + rdf:type van de IRI's die in die ouder-sluiting geraakt
    # worden: zonder deze tak leest de ouderrij zijn regels wel, maar staan de
    # actie, het doel en de doelobjecten er als kale localName bij (en zou het
    # ouderlabel in de vouwrij zelf ook ontbreken). Zelfde vorm en zelfde
    # predicaatfilter als tak 4b, één inheritFrom-hop verderop.
    ${h(`?sc`,`?pc`,`?x`,`?g7b`)}
    FILTER(isIRI(?x))
    ?x ?lp ?ll .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))
  } UNION {
    # 8a. DEKKING: knopen die met prov:wasDerivedFrom naar een REGEL van deze
    # policy wijzen — de machine-uitvoerbare laag (een Rego-module, een
    # beleidsbundel) die zegt dat zij die regel afdekt. Alle andere takken
    # lopen de graaf UITgaand af; dekking is de enige INkomende richting die
    # de kaart nodig heeft, en zonder haar bleef de dekking-chip in
    # ?sparql=-modus leeg terwijl dezelfde bron in ttl-modus vijf keer "gedekt
    # door" toonde (gevonden op /breda).
    #
    # De hop naar de regel loopt via de REGELPOSITIE
    # (odrl:permission/prohibition/obligation/duty) en niet via "iets met een
    # odrl:uid". Dat is geen detail: de policy zélf draagt ook een odrl:uid, en
    # met die ruimere vorm zou ^prov:wasDerivedFrom vanaf de policy álle
    # overeenkomsten binnentrekken die haar aanbod invullen (op /brp-ap 729 op
    # één kaart). Naar een REGEL wijst niets anders dan een dekker.
    # Vormregel als bij 4c/4d: het hele pad in ÉÉN propertypad.
    ${i(`/`+o+`/^prov:wasDerivedFrom`,`?x`,`?g8a`)}
    FILTER(?lp IN (rdf:type, rdfs:label, skos:prefLabel, dct:title,
                   dct:description, prov:wasDerivedFrom))
  } UNION {
    # 8b. het label van de KLASSE van die dekker ("Rego-module", "bundel") —
    # de chip noemt het soort naast de naam, en zonder deze hop stond daar een
    # kale localName. Zelfde verhouding als 4b tot 4c.
    ${i(`/`+o+`/^prov:wasDerivedFrom/rdf:type`,`?x`,`?g8b`)}
    FILTER(?lp IN (rdfs:label, skos:prefLabel))
  } UNION {
    # 8c. DEKKING OP VOORWAARDE-NIVEAU: knopen die met prov:wasDerivedFrom naar
    # een VOORWAARDE van deze policy wijzen. Sinds aug 2026 is dat het
    # zwaartepunt van de dekking — een bundel werkt vooral beslispunten uit
    # ("alleen voor dit doel", "hoogstens 30 dagen"); dat de regel als geheel
    # wordt uitgevoerd is maar de helft van het verhaal. Zonder deze tak stond
    # het raderwiel bij elke voorwaarde in ttl-modus wél en in ?sparql=-modus
    # niet, bij precies dezelfde bron.
    #
    # Zelfde vorm en zelfde afweging als 8a: de hop eindigt op de
    # VOORWAARDEPOSITIE, niet op "iets met een label" — alleen wat in
    # odrl:constraint-/odrl:refinement-positie hangt kan een dekkingsdoel zijn,
    # en naar zo'n knoop wijst niets anders dan een dekker. Het pad loopt over
    # de hele sluiting, dus regel-, action- en collectie-refinements komen alle
    # drie mee.
    ${i(`/`+s+`/^prov:wasDerivedFrom`,`?x`,`?g8c`)}
    FILTER(?lp IN (rdf:type, rdfs:label, skos:prefLabel, dct:title,
                   dct:description, prov:wasDerivedFrom))
  } UNION {
    # 8d. het label van de KLASSE van die dekker — zelfde verhouding als 8b
    # tot 8a: zonder deze hop staat er een kale localName in de chip.
    ${i(`/`+s+`/^prov:wasDerivedFrom/rdf:type`,`?x`,`?g8d`)}
    FILTER(?lp IN (rdfs:label, skos:prefLabel))
  }
}
`}function Cn(e,{excludeGraphs:t=Wt}={}){let n=I(e),r=(e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
    ${L(e,t)}`:n,i=`(dct:hasPart|^odrl:partOf)`;return`${P}
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
    # a. de leden zelf + hun label/type
    ${n} ${i} ?m .
    FILTER(isIRI(?m))
    OPTIONAL {
      ${r(`?g1`,`?m ?lp ?ll .
      FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    }
  } UNION {
    # b. het label van de KLASSE van elk lid (de groepskop van dit niveau)
    ${n} ${i}/rdf:type ?ty .
    ${r(`?g2`,`?ty ?tp ?tl .
    FILTER(?tp IN (rdfs:label, skos:prefLabel))`)}
  } UNION {
    # c. bestaat er een niveau ONDER dit lid? Alleen de lidmaatschapstriple.
    ${n} ${i} ?m .
    ?m ${i} ?gc .
    FILTER(isIRI(?m) && isIRI(?gc))
  } UNION {
    # d. de VOOROUDERS van de leden — de ancestry-koppen van dit niveau.
    #
    # De sub-SELECT is hier het hele verhaal. Een lid van een gegevensset is
    # in /brp-ap óók lid van honderden ándere gegevenssets: de 69 leden van
    # 890501-v13 leveren samen 65.146 partOf-triples. Zonder de sub-SELECT
    # dragen álle vervolgpatronen die 65k bindingen mee (gemeten: 2,1 s en
    # 120 kB); mét — DISTINCT, en de domein-type-eis er meteen IN — blijven er
    # ~15 voorouders over en kost de hele niveau-query 0,13 s.
    #
    # Die domein-type-eis is geen optimalisatie maar dezelfde eis die de
    # modelcode stelt: alleen een voorouder met een rdf:type BUITEN de
    # ODRL-kern is een noemer waaronder leden vallen; een kale
    # odrl:AssetCollection is een andere SELECTIE van dezelfde leden en zou
    # honderden zinloze koppen opleveren. Zie groupMembersByAncestry.
    #
    # Beide kopniveaus komen uit één sub-SELECT (MEMBER_ANCESTRY_HEAD_LEVELS
    # is er ook precies twee): eerst de directe voorouder met zijn label, dan
    # via de UNION de voorouder DAARboven met de zijne. De lidmaatschapstriple
    # ?m -> ?an gaat mee, anders kent de modelcode het verband niet; ?an -> ?up
    # idem voor de knoop tussen de twee koppen.
    { SELECT DISTINCT ?an WHERE {
        ${n} ${i}/odrl:partOf ?an .
        FILTER(isIRI(?an))
        ${yn(`?an`,`d`)}
      } }
    {
      # de lidmaatschapstriple lid -> voorouder: zonder haar kent de modelcode
      # het verband niet. Als eigen tak, ná de sub-SELECT: dan draait de join
      # over de handvol gevonden voorouders in plaats van over alle
      # partOf-triples van alle leden (op de grootste gegevensset van /brp-ap,
      # 350 leden, scheelde dat 1,2 s -> 0,80 s).
      ${n} ${i} ?m .
      ?m odrl:partOf ?an .
      FILTER(isIRI(?m))
    } UNION {
      ${r(`?g4`,`?an ?ap ?al .
      FILTER(?ap IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    } UNION {
      ?an odrl:partOf ?up .
      FILTER(isIRI(?up))
      ${yn(`?up`,`e`)}
      ${r(`?g5`,`?up ?upp ?upl .
      FILTER(?upp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    }
  }
}
`}function wn(e,{limit:t=400,excludeGraphs:n=Wt}={}){let r=I(e),i=Math.max(1,t|0),a=(e,t)=>n&&n.length?`GRAPH ${e} { ${t} }
    ${L(e,n)}`:t,o=`FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`;return`${P}
CONSTRUCT {
  ${r} ?uit ?object .
  ?subject ?in ${r} .
  ?object ?lp ?ll .
  ?subject ?lp ?ll .
}
WHERE {
  {
    # a. wat deze knoop zelf zegt (literals en verwijzingen), met de labels
    #    van de knopen waarnaar hij wijst.
    { SELECT ?uit ?object WHERE { ${r} ?uit ?object } LIMIT ${i} }
    OPTIONAL { ${a(`?g1`,`?object ?lp ?ll .
      ${o}`)} }
  } UNION {
    # b. wie naar deze knoop verwijst, met hún labels.
    { SELECT ?in ?subject WHERE { ?subject ?in ${r} . FILTER(isIRI(?subject)) } LIMIT ${i} }
    OPTIONAL { ${a(`?g2`,`?subject ?lp ?ll .
      ${o}`)} }
  }
}
`}var Tn=`PREFIX sh:   <http://www.w3.org/ns/shacl#>
PREFIX dash: <http://datashapes.org/dash#>
PREFIX shui: <http://www.w3.org/ns/shacl-ui/>
`,En=`(sh:name|sh:description|sh:order|sh:group|dash:viewer|dash:propertyRole|shui:viewer|shui:propertyRole)`,Dn=`(sh:property|sh:group)*`,On=`rdfs:label, skos:prefLabel, dct:title, skos:definition, dct:description, rdfs:comment`;function kn({excludeGraphs:e=Wt,limit:t=200}={}){let n=Math.max(1,t|0),r=(t,n)=>e&&e.length?`GRAPH ${t} { ${n} }
    ${L(t,e)}`:n,i=`{ SELECT DISTINCT ?shape ?tc WHERE {
      ?shape a sh:NodeShape .
      ?shape sh:targetClass ?tc .
      ?shape sh:property/${En} ?ann .
      FILTER(isIRI(?tc))
    } LIMIT ${n} }`;return`${P}${Tn}
CONSTRUCT {
  ?s ?p ?o .
  ?pad ?lp ?ll .
  ?sub rdfs:subClassOf ?super .
}
WHERE {
  {
    # 1+2. de shape zelf, zijn property-shapes en hun PropertyGroups
    ${i}
    ?shape ${Dn} ?s .
    ${r(`?g1`,`?s ?p ?o .`)}
  } UNION {
    # 2b. de blanke pad-knoop van een [ sh:inversePath … ]
    ${i}
    ?shape sh:property/sh:path ?s .
    FILTER(isBlank(?s))
    ${r(`?g2`,`?s ?p ?o .`)}
  } UNION {
    # 3. label en definitie van de pad-predicaten (de terugval van propLabel)
    ${i}
    ?shape sh:property/sh:path ?pad .
    FILTER(isIRI(?pad))
    ${r(`?g3`,`?pad ?lp ?ll .
    FILTER(?lp IN (${On}))`)}
  } UNION {
    # 4. de subklasse-ketens die bij een doelklasse uitkomen
    ${i}
    ?sub rdfs:subClassOf+ ?tc .
    ?sub rdfs:subClassOf ?super .
  }
}
`}function An(e,{limit:t=400,excludeGraphs:n=Wt}={}){let r=I(e),i=Math.max(1,t|0),a=(e,t)=>n&&n.length?`GRAPH ${e} { ${t} }
    ${L(e,n)}`:t;return`${P}
CONSTRUCT {
  ${r} ?uit ?object .
  ?subject ?in ${r} .
  ?object ?op ?ov .
  ?subject ?sp ?sv .
}
WHERE {
  {
    # a. wat deze knoop zelf zegt, met van elke buur zijn literalen en type.
    { SELECT ?uit ?object WHERE { ${r} ?uit ?object } LIMIT ${i} }
    OPTIONAL { ${a(`?g1`,`?object ?op ?ov .
      FILTER(isLiteral(?ov) || ?op = rdf:type)`)} }
  } UNION {
    # b. wie naar deze knoop verwijst — de [ sh:inversePath … ]-rijen — met
    #    dezelfde buurgegevens.
    { SELECT ?in ?subject WHERE { ?subject ?in ${r} . FILTER(isIRI(?subject)) } LIMIT ${i} }
    OPTIONAL { ${a(`?g2`,`?subject ?sp ?sv .
      FILTER(isLiteral(?sv) || ?sp = rdf:type)`)} }
  }
}
`}var jn=1e3;function Mn(e,{excludeGraphs:t=Wt,max:n=200,excludeNodes:r=null,maxExclude:i=jn}={}){let a=[...e||[]].slice(0,Math.max(1,n|0));if(!a.length)return null;let o=[...r||[]];return o.length>Math.max(0,i|0)?null:`${P}
SELECT (COUNT(DISTINCT ?knoop) AS ?n)
WHERE {
  VALUES ?klasse { ${a.map(I).join(` `)} }
  ${((e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
  ${L(e,t)}`:n)(`?g1`,`?knoop rdf:type ?klasse .`)}${o.length?`
  FILTER(?knoop NOT IN (${o.map(I).join(`, `)}))`:``}
}
`}var Nn=1e3;function Pn(e,{excludeGraphs:t=Wt,max:n=Nn}={}){let r=[...e||[]];return!r.length||r.length>Math.max(1,n|0)?null:`${P}
CONSTRUCT { ?n ?lp ?lv }
WHERE {
  VALUES ?n { ${r.map(I).join(` `)} }
  ${((e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
  ${L(e,t)}`:n)(`?g1`,`?n ?lp ?lv .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title))`)}
}
`}function z(e){return String(e).replace(/\\/g,`\\\\`).replace(/"/g,`\\"`).replace(/\n/g,`\\n`).replace(/\r/g,`\\r`).replace(/\t/g,`\\t`)}function Fn(e){let t=e&&e[`xml:lang`];return t&&Yt.test(t)?`@`+t:``}function B(e){return e?e.value:null}var In={set:Vt+`Set`,offer:Vt+`Offer`,agreement:Vt+`Agreement`,request:Vt+`Request`};function Ln(e,t,n,r){let i=r&&r.type,a=[];return t||n?(t&&a.push(`<${e}> <${Ut}validFrom> "${z(t)}" .`),n&&a.push(`<${e}> <${Ut}validThrough> "${z(n)}" .`)):i===`literal`&&a.push(`<${e}> <${Ht}valid> "${z(r.value)}" .`),a}function Rn(e){let t=new Set,n=e=>e&&e.type===`uri`&&/^[^<>"{}|^`\\\s]+$/.test(e.value)?e.value:null;for(let r of e||[]){let e=n(r.policy);if(!e)continue;let i=In[B(r.kind)]||In.set;t.add(`<${e}> a <${i}> .`);let a=B(r.title);if(a){let n=Fn(r.title);t.add(`<${e}> <http://purl.org/dc/terms/title> "${z(a)}"${n} .`)}let o=B(r.issued);o&&t.add(`<${e}> <${Ht}issued> "${z(o)}" .`);for(let n of Ln(e,B(r.validFrom),B(r.validTo),r.valid))t.add(n);let s=n(r.revisionOf);s&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasRevisionOf> <${s}> .`);let c=n(r.offerRef);c&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${c}> .`);let l=n(r.requestRef);l&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${l}> .`);let u=n(r.answeredByRef);u&&t.add(`<${u}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${e}> .`);let d=n(r.assignee);if(d){t.add(`<${e}> <${Vt}assignee> <${d}> .`);let n=B(r.assigneeLabel);if(n){let e=Fn(r.assigneeLabel);t.add(`<${d}> <http://www.w3.org/2000/01/rdf-schema#label> "${z(n)}"${e} .`)}}let f=n(r.container);if(f){t.add(`<${f}> a <${ee}> .`),t.add(`<${e}> <${be}> <${f}> .`);let n=parseInt(B(r.versionCount)||``,10);Number.isFinite(n)&&n>0&&t.add(`<${f}> <${he}> "${n}" .`);let i=B(r.containerTitle);if(i){let e=Fn(r.containerTitle);t.add(`<${f}> <http://purl.org/dc/terms/title> "${z(i)}"${e} .`)}}}return[...t].join(`
`)+(t.size?`
`:``)}function zn(e){let t=new Set,n=e=>e&&e.type===`uri`&&/^[^<>"{}|^`\\\s]+$/.test(e.value)?e.value:null,r=(e,n,r)=>{let i=B(r);if(!i)return;let a=Fn(r);t.add(`<${e}> <${n}> "${z(i)}"${a} .`)};for(let i of e||[]){let e=n(i.container),a=n(i.version);if(!e||!a)continue;let o=In[B(i.kind)];if(o){t.add(`<${e}> a <${ee}> .`),t.add(`<${e}> <${Ht}type> <${o}> .`),t.add(`<${a}> <${be}> <${e}> .`),r(e,Ht+`title`,i.containerTitle),r(a,Ht+`title`,i.title);for(let e of Ln(a,B(i.validFrom),B(i.validTo),i.valid))t.add(e);r(a,Ht+`issued`,i.issued)}}return[...t].join(`
`)+(t.size?`
`:``)}var Bn=[];function Vn(e,t){if(t&&t.length)return[...t];if(!e)return[];let n=String(e).replace(/[?#].*$/,``),r=Bn.find(e=>e.match.test(n));return r?[...r.excludeGraphs]:[]}function Hn(e,t){let n=String(e||``).trim();if(!n)return`leeg bronadres`;let r=t||(typeof location<`u`&&location.href?location.href:`https://x.invalid/`),i;try{i=new URL(n,r)}catch{return`geen geldig adres: `+n}return i.protocol===`http:`||i.protocol===`https:`?null:`bronadres met een niet-ondersteund schema (${i.protocol}): ${n} — een bron moet via http(s) bereikbaar zijn`}function Un(e){let t=String(e||``).trimStart().slice(0,200).toLowerCase();return t.startsWith(`<!doctype html`)||t.startsWith(`<html`)||t.startsWith(`<?xml-stylesheet`)}function Wn(e){let t=String(e||``).trim().replace(/[?#].*$/,``);return t?/\.(ttl|turtle|nt|jsonld|json)$/i.test(t)?`data`:/\/(sparql|query)$/i.test(t)?`sparql`:null:null}async function Gn(e,t){let n=await t(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`,Accept:`application/sparql-results+json`},body:`query=ASK%20%7B%7D`});if(!n.ok)return!1;try{let e=await n.json();return typeof e==`object`&&!!e&&typeof e.boolean==`boolean`}catch{return!1}}async function Kn(e,t){let n=t||globalThis.fetch,r=Hn(e);if(r)return{kind:`error`,url:e,code:`schema`,message:r};let i=Wn(e);if(i===`sparql`)return{kind:`sparql`,url:e};if(i!==`data`)try{if(await Gn(e,n))return{kind:`sparql`,url:e}}catch{}try{let t=await n(e);if(!t.ok)return{kind:`error`,url:e,code:`unsupported`,message:`HTTP `+t.status+` bij `+e};let r=await t.text(),i=ye(e,r);return i===`rdfxml`?{kind:`error`,url:e,code:`unsupported`,message:`formaat niet ondersteund (RDF/XML): `+e}:Un(r)?{kind:`error`,url:e,code:`unsupported`,message:`dit adres levert een webpagina, geen RDF: `+e}:{kind:`data`,url:e,content:r,format:i}}catch(t){return{kind:`error`,url:e,code:`unreachable`,message:`bron niet bereikbaar (CORS of offline?): `+e+` — `+t.message}}}var V=oe,qn=ye,Jn=Kn,Yn=i,Xn=zt,Zn=r,Qn=de,$n=Lt,er=Rt,tr=re,nr=t,rr=ce,ir=e,ar=d,or=xe,sr=se,cr=l,lr=a,ur=g,dr=u,fr=ae,pr=o,mr=60,hr=10,gr=v,_r=p,vr=te,H=ge,yr=f,br=h,xr=s,Sr=4,Cr=F,wr=Kt,Tr=an,Er=gn,Dr=_n,Or=Sn,kr=wn,Ar=kn,jr=An,Mr=Pn,Nr=Mn,Pr=Cn,Fr=Rn,Ir=zn,Lr=mn,Rr=hn,zr=Vn,Br=y,Vr=_,Hr=`data/`,Ur=`comunica/`,Wr=[`generiek/1-generiek-drietraps.ttl`,`generiek/7-dekking-generiek.ttl`,`generiek/archief-partof.ttl`,`generiek/keten-offer-request-agreement.ttl`,`vlierdam/vocabulaire.ttl`,`vlierdam/velden.ttl`,`vlierdam/beleid.ttl`,`vlierdam/openftv.ttl`],Gr=[`labels-tooi.ttl`,`odrl-ap-nl.ttl`];[...Wr,...Gr];function Kr(){return`?`+Wr.map(e=>`src=${encodeURIComponent(Hr+e)}`).join(`&`)}function qr(e){let t=String(e||``);return Gr.find(e=>t===`data/`+e||t.endsWith(`/`+e))||null}var Jr=`# =============================================================================
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
`,{DataFactory:Yr,Store:Xr,Parser:Zr}=m,{namedNode:U}=Yr,W=`http://www.w3.org/ns/shacl#`,Qr=`http://datashapes.org/dash#`,$r=`http://www.w3.org/ns/shacl-ui/`,ei=`http://www.w3.org/1999/02/22-rdf-syntax-ns#`,ti=`http://www.w3.org/2000/01/rdf-schema#`,ni=`http://www.w3.org/2004/02/skos/core#`,ri=(e,t,n)=>e.getQuads(t,U(n),null,null).map(e=>e.object),G=(e,t,n)=>ri(e,t,n)[0]||null,ii=e=>!!e&&e.termType===`Literal`;function ai(e,t,n){let r=G(e,t,Qr+n)||G(e,t,$r+n);return!r||r.termType!==`NamedNode`?null:o(r.value).replace(/^IRIViewer$/,`URIViewer`)}function oi(e,t){let n=G(e,t,W+`path`),r=null,i=!1;if(n&&n.termType===`NamedNode`)r=n.value;else if(n){let t=G(e,n,W+`inversePath`);t&&t.termType===`NamedNode`&&(r=t.value,i=!0)}let a=G(e,t,W+`order`),o=a&&Number.isFinite(parseFloat(a.value))?parseFloat(a.value):null,s=G(e,t,W+`group`);return{path:r,inverse:i,names:ri(e,t,W+`name`).filter(ii),descriptions:ri(e,t,W+`description`).filter(ii),order:o,group:s&&s.termType===`NamedNode`?s.value:null,pattern:(G(e,t,W+`pattern`)||{}).value||null,viewer:ai(e,t,`viewer`),role:ai(e,t,`propertyRole`)}}function si(e){let t=new Set,n=[];for(let r of e.getQuads(null,U(ei+`type`),U(W+`NodeShape`),null)){let i=r.subject.value;if(t.has(i))continue;t.add(i);let a=G(e,r.subject,W+`targetClass`);a&&a.termType===`NamedNode`&&n.push({iri:i,store:e,targetClass:a.value,properties:ri(e,r.subject,W+`property`).map(t=>oi(e,t))})}return n}function ci(e,t){let n=new Set([t]),r=!0;for(;r;){r=!1;for(let t of e.getQuads(null,U(ti+`subClassOf`),null,null))n.has(t.object.value)&&!n.has(t.subject.value)&&(n.add(t.subject.value),r=!0)}return n}var li=[`name`,`description`,`order`,`group`];function ui(e){return e.properties.some(e=>e.viewer||e.role||li.some(t=>t===`name`?e.names.length:t===`description`?e.descriptions.length:e[t]!==null))}var di=ui;function fi(e,t,n,r=[]){let i=typeof t==`string`?U(t):t,a=new Set(ri(e,i,ei+`type`).filter(e=>e.termType===`NamedNode`).map(e=>e.value));if(!a.size)return null;let o=[],s=new Set;for(let e of n)s.add(e.targetClass);for(let t of[...n,...r.filter(e=>!s.has(e.targetClass))]){if(a.has(t.targetClass)){o.push([0,+!di(t),t]);continue}let n=ci(e,t.targetClass);[...a].some(e=>n.has(e))&&o.push([1,+!di(t),t])}return o.length?(o.sort((e,t)=>e[0]-t[0]||e[1]-t[1]),o[0][2]):null}function pi(e,t,n=[]){let r=new Set;for(let e of t)r.add(e.targetClass);let i=[...t,...n.filter(e=>!r.has(e.targetClass))],a=new Map;return i.forEach((t,n)=>{let r=+!di(t),i=(e,i)=>{let o=a.get(e);(!o||i<o.rang||i===o.rang&&r<o.vorm)&&a.set(e,{rang:i,vorm:r,idx:n,shape:t})};i(t.targetClass,0);for(let n of ci(e,t.targetClass))n!==t.targetClass&&i(n,1)}),a}function mi(e,t,n){if(!n||!n.size)return null;let r=typeof t==`string`?U(t):t;if(!r)return null;let i=null;for(let t of e.getQuads(r,U(ei+`type`),null,null)){if(t.object.termType!==`NamedNode`)continue;let e=n.get(t.object.value);e&&(!i||e.rang<i.rang||e.rang===i.rang&&e.vorm<i.vorm||e.rang===i.rang&&e.vorm===i.vorm&&e.idx<i.idx)&&(i=e)}return i?i.shape:null}function hi(e,t,n){if(!n)return[];let r=typeof t==`string`?U(t):t;return r&&n.properties.filter(e=>e.role===`KeyInfoRole`).sort((e,t)=>(e.order??1/0)-(t.order??1/0)).map(t=>Ei(e,r,t)).find(e=>e.length)||[]}function gi(e,t){if(!t||!t.targetClass)return null;let n=U(t.targetClass),r=t.store&&t.store!==e?[e,t.store]:[e],i=e=>{for(let t of r){let r=fe(ri(t,n,e).filter(ii));if(r)return r}return null},a=i(ni+`altLabel`),s=i(ti+`label`)||i(ni+`prefLabel`)||i(`http://purl.org/dc/terms/title`)||o(t.targetClass);return s?{text:a||s,vol:s,afgekort:!!a}:null}function _i(e,t){let n=new Set;for(let e of t)ui(e)&&n.add(e.targetClass);if(!n.size)return n;let r=e.getQuads(null,U(ti+`subClassOf`),null,null),i=!0;for(;i;){i=!1;for(let e of r)n.has(e.object.value)&&!n.has(e.subject.value)&&(n.add(e.subject.value),i=!0)}return n}function vi(e,t,n){if(!n||!n.size)return!1;let r=typeof t==`string`?U(t):t;return r?e.getQuads(r,U(ei+`type`),null,null).some(e=>e.object.termType===`NamedNode`&&n.has(e.object.value)):!1}function yi(e,t,{skipGraphs:n}={}){let r=new Set,i=new Set;if(!t||!t.size)return{iris:r,blanks:0};let a=n&&n.length?new Set(n):null;for(let n of e.getQuads(null,U(ei+`type`),null,null))n.object.termType===`NamedNode`&&t.has(n.object.value)&&(a&&n.graph&&a.has(n.graph.value)||(n.subject.termType===`NamedNode`?r:i).add(n.subject.value));return{iris:r,blanks:i.size}}function bi(e,t){let n=yi(e,t);return n.iris.size+n.blanks}function xi(e,t,n){return n.path?n.inverse?e.getQuads(null,U(n.path),t,null).map(e=>e.subject):e.getQuads(t,U(n.path),null,null).map(e=>e.object):[]}function Si(e,t){return fe(t.names)||(t.path?c(e,U(t.path)):``)}function Ci(e,t){return fe(t.descriptions)||(t.path?me(e,U(t.path)):``)||null}function wi(e,t){return!t||t.termType!==`NamedNode`?!1:e.countQuads(t,null,null,null)===0}function Ti(e,t,n){let r=()=>({kind:`label`,text:c(e,t),iri:t.termType===`NamedNode`?t.value:null,external:wi(e,t)});switch(n.viewer){case`URIViewer`:case`HyperlinkViewer`:return{kind:`link`,text:t.value,iri:t.termType===`NamedNode`?t.value:null};case`LabelViewer`:return r();case`LiteralViewer`:return{kind:`text`,text:t.value,iri:null};default:return t.termType===`NamedNode`?r():{kind:`text`,text:t.value,iri:null}}}function Ei(e,t,n){let r=xi(e,t,n);if(!r.length)return[];let i=r.filter(e=>ii(e)&&e.language);if(i.length){let t=fe(i),a=r.filter(e=>!(ii(e)&&e.language));return[...t?[{kind:`text`,text:t,iri:null}]:[],...a.map(t=>Ti(e,t,n))]}if(n.viewer===`LangStringViewer`){let e=fe(r.filter(ii));return e?[{kind:`text`,text:e,iri:null}]:[]}let a=[],o=new Set;for(let t of r){let r=Ti(e,t,n),i=r.kind+`\0`+r.text;o.has(i)||(o.add(i),a.push(r))}return a}function Di(e,t,n){let r=typeof t==`string`?U(t):t,i=t=>n.properties.filter(e=>e.role===t).sort((e,t)=>(e.order??1/0)-(t.order??1/0)).map(t=>Ei(e,r,t)).find(e=>e.length)||[],a=i(`LabelRole`),o=i(`DescriptionRole`),s=a.length?a[0].text:c(e,r),l=new Set([ti+`label`,`http://www.w3.org/2004/02/skos/core#prefLabel`,`http://purl.org/dc/terms/title`]),u=(e,t)=>!a.length&&!e.inverse&&l.has(e.path)&&t.length===1&&t[0].text===s,d=n.store||e,f=new Map,p=[];for(let t of n.properties){if(t.role===`LabelRole`||t.role===`DescriptionRole`||t.role===`KeyInfoRole`||!t.path)continue;let n=Ei(e,r,t);if(u(t,n))continue;let i={kind:`row`,label:Si(e,t),description:Ci(e,t),path:t.path,inverse:t.inverse,pattern:t.pattern,viewer:t.viewer,values:n,order:t.order};if(t.group){let e=f.get(t.group);if(!e){let n=G(d,U(t.group),W+`order`);e={kind:`group`,label:c(d,U(t.group)),rows:[],order:n&&Number.isFinite(parseFloat(n.value))?parseFloat(n.value):null},f.set(t.group,e),p.push(e)}e.rows.push(i)}else p.push(i)}let m=e=>e.map((e,t)=>[e,t]).sort((e,t)=>(e[0].order??1/0)-(t[0].order??1/0)||e[1]-t[1]).map(([e])=>e);for(let e of f.values())e.rows=m(e.rows).filter(e=>e.values.length);let h=m(p).filter(e=>e.kind===`group`?e.rows.length:e.values.length);return{shape:n.iri,title:s,keyInfo:i(`KeyInfoRole`),description:o.length?o[0].text:null,blocks:h}}function Oi(e,t){if(!e||!t)return e;let n=e=>e.iri!==t,r=e=>{let t=e.values.filter(n);return t.length===e.values.length?e:{...e,values:t}},i=[],a=!1;for(let t of e.blocks){if(t.kind===`group`){let e=t.rows.map(r).filter(e=>e.values.length),n=e.length===t.rows.length&&e.every((e,n)=>e===t.rows[n]);n||(a=!0),e.length&&i.push(n?t:{...t,rows:e});continue}let e=r(t);e!==t&&(a=!0),e.values.length&&i.push(e)}return a?{...e,blocks:i}:e}var ki=null;function Ai(e){if(ki)return ki;let t=new Xr;for(let n of e)t.addQuads(new Zr().parse(n));return ki=si(t),ki}var[ji,Mi]=k(null),[Ni,K]=k(`leeg`),[Pi,Fi]=k([]),[Ii,Li]=k([]),[Ri,zi]=k(0),[Bi,Vi]=k(null),[Hi,Ui]=k(null),[Wi,Gi]=k(null),[Ki,qi]=k(null),[q,Ji]=k(null),[Yi,J]=k(0),[Y,Xi]=k(null),[Zi,Qi]=k(!1),[$i,ea]=k(null),[ta,na]=k(!1),[ra,ia]=k(!1),[aa,oa]=k(``),[sa,ca]=k(null),[la,ua]=k(`load.sources`),[da,fa]=k(null),X=0,Z=Promise.resolve(),pa=null,ma=null,Q=[],ha,ga=[],_a=[],va=e=>ga.length?[...ga,...e]:e,ya=e=>_a.length?[..._a,...e]:e;function ba(e){Xi(e),Q=zr(e,ha)}function xa(e){let t=[...e.src.map(e=>({name:e,url:e,detecteer:!0})),...(e.ttl||[]).map(e=>({name:e,url:e}))],n=new Set,r=t.filter(e=>!n.has(e.url)&&!!n.add(e.url));if(!r.length)return[];let i=new Set(r.map(e=>qr(e.url)).filter(Boolean));return[...r,...Gr.filter(e=>!i.has(e)).map(e=>({name:e,url:Hr+e,stil:!0}))]}async function Sa(e){let t=[],n=[],r=[],i=await Promise.all(e.map(async({name:e,url:t,detecteer:n,stil:r})=>{if(n){let n=await Jn(t);return n.kind===`sparql`?{endpoint:n.url}:n.kind===`data`?{bron:{name:e,url:t,content:n.content,format:n.format}}:r?{}:{fout:{url:t,message:n.message}}}try{let n=await fetch(t);if(!n.ok)throw Error(`HTTP ${n.status}`);let r=await n.text();return{bron:{name:e,url:t,content:r,format:qn(t,r)}}}catch(e){return r?{}:{fout:{url:t,message:e instanceof Error?e.message:String(e)}}}}));for(let e of i)e.bron?t.push(e.bron):e.endpoint?r.push(e.endpoint):e.fout&&n.push(e.fout);return{bronnen:t,fouten:n,endpoints:r}}async function Ca(e,t){try{let n=$n(),r=()=>{};return Z=new Promise(e=>{r=e}),{bericht:await Xn(e,{setScope:t.setScope,lang:t.lang,onStore:e=>{if(!e){r();return}er(n,e).then(()=>{Ji(()=>n),J(e=>e+1),r()})}}),motor:`worker`}}catch{let t=Yn(e);return Ji(()=>t.store??null),J(e=>e+1),Z=Promise.resolve(),{bericht:t,motor:`hoofddraad`}}}function wa(e,t){if(!e)return null;if(t.policy)return ar(e,t.policy)?.nav??null;let n=q();return!t.set||!n?null:ir(e,n,t.set)?.nav??null}var Ta=()=>({set:pa,policy:ma});async function Ea(e={}){let t=X;if(!ji()||(e.setScope!==void 0&&(pa=e.setScope),e.policyScope!==void 0&&(ma=e.policyScope),await Z,t!==X))return;let n=q();if(!n)return;let r=tr(n),i=rr(r),a=Ta();Mi(r),Ui(()=>i),Gi(()=>wa(i,a))}var[Da,Oa]=k([]);function ka(){let e=q();if(!e||!Da().length)return!1;for(let t of Da())vr(e,t.ttl,`ttl`,H({url:t.ep},0));return J(e=>e+1),!0}async function Aa(e,t,n,r){let{bericht:i,motor:a}=await Ca(t,r);if(e!==X)return!1;Li(t),Mi(i.model||null),Ui(()=>i.nav??null);let o=i.scopedNav!==void 0&&!r.policyScope?i.scopedNav:wa(i.nav??null,{set:r.setScope,policy:r.policyScope});Gi(()=>o);let s=r.policyScope?`policy`:r.setScope?`set`:null;return qi(s&&!o?s:null),zi(i.quadCount||0),Vi(a),Fi([...n,...i.errors||[]]),K(i.model?`klaar`:`fout`),await Z,e===X&&ka()&&eo(),!!i.model}function ja(e,t){e===X&&(Fi(ya([t])),K(`fout`))}async function Ma(e,t,n){let r=await Sa(t);if(e!==X)return;r.endpoints.length&&ba(r.endpoints[0]);let i=r.bronnen.filter(e=>!qr(e.url)),a=Y();if(!i.length&&a){ua(`load.queryEndpointAt`),Qi(!0),await qa(e,a,n.policyScope,n);return}if(!i.length){Li([]),Mi(null),zi(0),Vi(null),Ui(null),Gi(null),Fi(r.fouten),K(`fout`);return}a&&Qi(!0);let o=await Co(r.bronnen);ga=o.lijst,_a=o.fout?[o.fout,...r.fouten]:r.fouten,await Aa(e,ga,_a,n),e===X&&a&&await qa(e,a,n.policyScope,n)}async function Na(e,t,n){try{let r=await fetch(t);if(!r.ok)throw Error(`HTTP ${r.status}`);let i=await r.text();if(e!==X)return;let a=await Co([{name:t,url:t,content:i,format:qn(t,i)}]);await Aa(e,a.lijst,a.fout?[a.fout]:[],n)}catch(n){ja(e,{url:t,message:V(`err.scopeFetch`,{iri:t,msg:n instanceof Error?n.message:String(n)})})}}async function Pa(e){try{return await Cr(e,Tr())}catch(t){if(!Lr(t))throw t;try{let t=await Rr(e);return na(!0),t}catch{throw t}}}async function Fa(e,t,n){let r=!1;try{let i=await Cr(t,Er());if(e!==X)return;i.length&&(ea(`eerste`),r=await Aa(e,va([{name:`${t} (eerste beeld, ${i.length} rijen)`,url:t,content:Fr(i),format:`ttl`,fromSparql:!0}]),ya([]),n),r&&K(`laden`))}catch{ea(null)}if(e===X)try{let[r,i]=await Promise.all([Pa(t),Cr(t,Dr()).catch(()=>[])]);if(e!==X)return;ea(null);let a=Fr(r)+Ir(i);if(await Aa(e,va([{name:`${t} (policylijst, ${r.length} rijen`+(i.length?` + ${i.length} versierijen`:``)+`)`,url:t,content:a,format:`ttl`,fromSparql:!0}]),ya([]),n),e!==X)return;await lo(e)}catch(n){if(e!==X)return;ea(null);let i=n instanceof Error?n.message:String(n);ca(r?`volledigeIndex`:`endpoint`),Fi(ya([{url:t,message:i}])),K(`fout`)}}var Ia=`urn:odrlvis:vormshapes`,La=`urn:odrlvis:knooplabels`,Ra=si,za=Ai,Ba=_i,Va=yi,Ha=Zn;function Ua(e){return wr(e,Ar({excludeGraphs:Q})).catch(()=>``)}async function Wa(e,t,n){let r=await n;if(e!==X||!r||!r.trim()||(await Z,e!==X))return;let i=q();if(!i)return;Oa(e=>[...e,{iri:Ia,ttl:r,ep:t}]),vr(i,r,`ttl`,H({url:t},0)),J(e=>e+1);let a=Ba(i,[...Ra(i),...za([Jr])]);await Promise.all([Ka(e,t,i,a),Ga(e,t,i,a)])}async function Ga(e,t,n,r){try{let i=Mr([...Va(n,r).iris].filter(e=>!Ha(n,e)),{excludeGraphs:Q});if(!i)return;let a=await wr(t,i);if(e!==X||!a||!a.trim()||(await Z,e!==X))return;Oa(e=>[...e,{iri:La,ttl:a,ep:t}]);let o=q();if(!o)return;vr(o,a,`ttl`,H({url:t},0)),J(e=>e+1),eo()}catch{}}async function Ka(e,t,n,r){try{let i=Va(n,r,{skipGraphs:[String(H({url:t},0))]}),a=Nr(r,{excludeGraphs:Q,excludeNodes:i.iris});if(!a)return;let o=await Cr(t,a);if(e!==X)return;let s=parseInt(o[0]&&o[0].n&&o[0].n.value||``,10);if(!Number.isFinite(s))return;let c=s+i.iris.size+i.blanks;c>0&&fa(c)}catch{}}async function qa(e,t,n,r){let i=Ua(t);try{if(n){let i=await wr(t,Or(n,{excludeGraphs:Q}));if(e!==X)return;await Aa(e,va([{name:`${t} (policy-detail)`,url:t,content:i,format:`ttl`,fromSparql:!0}]),ya([]),r);return}await Fa(e,t,r)}catch(n){ca(`endpoint`),ja(e,{url:t,message:n instanceof Error?n.message:String(n)})}finally{await Wa(e,t,i)}}function Ja(e){let t=++X,n=xa({src:e.src||[],ttl:e.ttl||[],sparql:e.sparql??null,scope:e.policyScope??e.setScope??null}),r=e.setScope??null,i=e.policyScope??null,a=e.sparql||null,o={setScope:r,policyScope:i,lang:e.lang??le()};if(pa=r,ma=i,ha=e.excludeGraphs,Ji(null),Z=Promise.resolve(),Fi([]),ga=[],_a=[],ba(a),Qi(!1),ea(null),ca(null),na(!1),ia(!1),oa(``),uo.clear(),Oa([]),po.clear(),Ya.clear(),Xa.clear(),ho.clear(),fa(null),!n.length&&!a&&!(i||r)){Mi(null),Li([]),zi(0),Vi(null),Ui(null),Gi(null),K(`leeg`);return}if(K(`laden`),n.length){ua(`load.sources`),Ma(t,n,o);return}if(a){ua(`load.queryEndpointAt`),Qi(!0),qa(t,a,i,o);return}ua(`load.source`),Na(t,i||r,o)}var Ya=new Set,Xa=new Map;function Za(e){return!Y()||!e||!e.iri||e.anon||e.stub||Ya.has(e.iri)?!1:!(e.permissions&&e.permissions.length||e.prohibitions&&e.prohibitions.length||e.obligations&&e.obligations.length)}async function Qa(e,t={}){let n=Y();if(!e||!n||Ya.has(e))return!1;let r=Xa.get(e);if(r)return r;let i=X,a=(async()=>{let r=await wr(n,Or(e,{excludeGraphs:Q}));if(await Z,i!==X)return!1;let a=q();if(!a)throw Error(V(`load.graph`));return Oa(t=>[...t,{iri:e,ttl:r,ep:n}]),vr(a,r,`ttl`,H({url:n},0)),Ya.add(e),J(e=>e+1),t.herbouwModel!==!1&&eo(),!0})();Xa.set(e,a);try{return await a}finally{Xa.delete(e)}}async function $a(e){let t=[...new Set(e.filter(Boolean))];if(!t.length||!Y())return!1;let n=X,r=await Promise.all(t.map(e=>Qa(e,{herbouwModel:!1})));return n===X&&(r.some(Boolean)&&eo(),r.some(Boolean))}function eo(){let e=q();if(!e)return;let t=tr(e),n=rr(t);Mi(t),Ui(()=>n),Gi(()=>wa(n,Ta()))}function to(e){let t=new Set;for(let n of[e.offers,e.agreements,e.sets])for(let e of n||[])e.iri&&!e.anon&&t.add(e.iri);return t}var no=(e,t)=>e.size===t.size&&[...e].every(e=>t.has(e));function ro(e,t){if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t))return e.length===t.length&&e.every((e,n)=>ro(e,t[n]));if(!e||!t||typeof e!=`object`||typeof t!=`object`)return!1;let n=e,r=t,i=Object.keys(n);return i.length===Object.keys(r).length&&i.every(e=>ro(n[e],r[e]))}function io(e,t){if(!e||!e.length)return t;let n=new Map;for(let t of e)t&&t.id&&n.set(t.id,t);return t.map(e=>{let t=e&&e.id?n.get(e.id):void 0;if(!t)return e;let r=io(t.children||null,e.children||[]),i=r===e.children?e:{...e,children:r};return ro(t,i)?t:i})}function ao(e,t){let n=rr(e),r=Array.isArray(t)&&Array.isArray(n)?io(t,n):n;Mi(e),Ui(()=>r),Gi(()=>wa(r,Ta()))}function oo(e,t){t&&console.warn(`corpus: volledige herbouw na een mutatie — ${e}`);let n=q();return n&&(ao(tr(n),Hi()),J(e=>e+1)),{modus:`volledig`,policies:[],reden:e}}function so(e){let t=q(),n=ji();if(!t||!n)return{modus:`volledig`,policies:[],reden:`geen graaf of model`};if(![...e.added||[],...e.removed||[]].length)return oo(`lege delta`,!1);let r=to(n),i=nr(t,e,r),a=i.policies;if(!a)return oo(i.reden===`budget`?`de toewijzing zakte door haar knopenbudget`:`mutatie buiten de bekende kaarten`,!0);let o=tr(t,{hergebruik:n,alleen:new Set(a)});return no(r,to(o))?(ao(o,Hi()),J(e=>e+1),{modus:`gericht`,policies:a,reden:``}):oo(`de verzameling policies veranderde`,!0)}var co=20;async function lo(e){let t=ji();if(!Y()||!t)return;let n=(t.offers||[]).filter(e=>Za(e)).slice(0,co),r=(t.agreements||[]).filter(e=>Za(e)),i=n.length+r.length<=co?[...n,...r]:n;i.length&&(await Promise.all(i.map(e=>Qa(e.iri,{herbouwModel:!1}).catch(()=>!1))),(e===void 0||e===X)&&eo())}var uo=new Set;async function fo(e){let t=Y();if(!e||!t||uo.has(e))return!1;uo.add(e),ia(!0),oa(``);try{let n=await wr(t,kr(e,{excludeGraphs:Q}));await Z;let r=q();if(!r)throw Error(V(`load.graph`));return Oa(r=>[...r,{iri:e,ttl:n,ep:t}]),vr(r,n,`ttl`,H({url:t},0)),J(e=>e+1),!0}catch(t){return uo.delete(e),oa(V(`verken.loadFailed`,{msg:t instanceof Error?t.message:String(t)})),!1}finally{ia(!1)}}var po=new Set;async function mo(e){let t=Y();if(!e||!t||po.has(e))return!1;po.add(e);try{let n=await wr(t,Pr(e,{excludeGraphs:Q}));await Z;let r=q();if(!r)throw Error(V(`load.graph`));return!n||!n.trim()?!1:(Oa(r=>[...r,{iri:e,ttl:n,ep:t}]),vr(r,n,`ttl`,H({url:t},0)),J(e=>e+1),!0)}catch{return po.delete(e),!1}}var ho=new Set;async function go(e){let t=Y();if(!e||!t||ho.has(e))return!1;ho.add(e);try{let n=await wr(t,jr(e,{excludeGraphs:Q}));await Z;let r=q();if(!r)throw Error(V(`load.graph`));return!n||!n.trim()?!1:(Oa(r=>[...r,{iri:e,ttl:n,ep:t}]),vr(r,n,`ttl`,H({url:t},0)),J(e=>e+1),!0)}catch{return ho.delete(e),!1}}var _o=Da;function vo(e){Li(e)}async function yo(e){let t=++X,n={setScope:pa,policyScope:ma,lang:le()};if(K(`laden`),Fi([]),ga=e.filter(e=>!e.fromSparql),_a=[],!e.length&&Y()){Li([]),ga=[],ua(`load.queryEndpointAt`),Qi(!0),await qa(t,Y(),ma,n);return}if(!e.length){Li([]),Mi(null),zi(0),Vi(null),Ui(null),Gi(null),K(`leeg`);return}ua(`load.sources`),await Aa(t,e,[],n)}var bo=null;function xo(e){bo=e}var So=8e3;async function Co(e){if(!bo)return{lijst:e,fout:null};let t=null,n=Symbol(`voorbewerking te traag`);try{let r=new Promise(e=>{t=setTimeout(()=>e(n),So)}),i=await Promise.race([bo(e),r]);return i===n?{lijst:e,fout:{message:V(`err.bronnenlaagTraag`)}}:{lijst:i,fout:null}}catch{return{lijst:e,fout:null}}finally{t!==null&&clearTimeout(t)}}var wo=Symbol(`store-raw`),To=Symbol(`store-node`),$=Symbol(`store-has`),Eo=Symbol(`store-self`);function Do(e){let t=e[S];if(!t&&(Object.defineProperty(e,S,{value:t=new Proxy(e,Fo)}),!Array.isArray(e))){let n=Object.keys(e),r=Object.getOwnPropertyDescriptors(e),i=Object.getPrototypeOf(e),a=i!==null&&typeof e==`object`&&!!e&&!Array.isArray(e)&&i!==Object.prototype;if(a){let e=Object.getOwnPropertyDescriptors(i);n.push(...Object.keys(e)),Object.assign(r,e)}for(let i=0,o=n.length;i<o;i++){let o=n[i];a&&o===`constructor`||r[o].get&&Object.defineProperty(e,o,{configurable:!0,enumerable:r[o].enumerable,get:r[o].get.bind(t)})}}return t}function Oo(e){let t;return typeof e==`object`&&!!e&&(e[S]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function ko(e,t=new Set){let n,r,i,a;if(n=e!=null&&e[wo])return n;if(!Oo(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,a=e.length;n<a;n++)i=e[n],(r=ko(i,t))!==i&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);let n=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let s=0,c=n.length;s<c;s++)a=n[s],!o[a].get&&(i=e[a],(r=ko(i,t))!==i&&(e[a]=r))}return e}function Ao(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function jo(e,t,n){if(e[t])return e[t];let[r,i]=k(n,{equals:!1,internal:!0});return r.$=i,e[t]=r}function Mo(e,t){let n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===S||t===To?n:(delete n.value,delete n.writable,n.get=()=>e[S][t],n)}function No(e){Ue()&&jo(Ao(e,To),Eo)()}function Po(e){return No(e),Reflect.ownKeys(e)}var Fo={get(e,t,n){if(t===wo)return e;if(t===S)return n;if(t===Te)return No(e),n;let r=Ao(e,To),i=r[t],a=i?i():e[t];if(t===To||t===$||t===`__proto__`)return a;if(!i){let n=Object.getOwnPropertyDescriptor(e,t);Ue()&&(typeof a!=`function`||Object.prototype.hasOwnProperty.call(e,t))&&!(n&&n.get)&&(a=jo(r,t,a)())}return Oo(a)?Do(a):a},has(e,t){return t===wo||t===S||t===Te||t===To||t===$||t===`__proto__`||(Ue()&&jo(Ao(e,$),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:Po,getOwnPropertyDescriptor:Mo};function Io(e,t,n,r=!1){if(t===`__proto__`||!r&&e[t]===n)return;let i=e[t],a=e.length;n===void 0?(delete e[t],e[$]&&e[$][t]&&i!==void 0&&e[$][t].$()):(e[t]=n,e[$]&&e[$][t]&&i===void 0&&e[$][t].$());let o=Ao(e,To),s;if((s=jo(o,t,i))&&s.$(()=>n),Array.isArray(e)&&e.length!==a){for(let t=e.length;t<a;t++)(s=o[t])&&s.$();(s=jo(o,`length`,a))&&s.$(e.length)}(s=o[Eo])&&s.$()}function Lo(e,t){let n=Object.keys(t);for(let r=0;r<n.length;r+=1){let i=n[r];Ro(i)||Io(e,i,t[i])}}function Ro(e){return e===`__proto__`||e===`constructor`||e===`prototype`}function zo(e,t){if(typeof t==`function`&&(t=t(e)),t=ko(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){let r=t[n];e[n]!==r&&Io(e,n,r)}Io(e,`length`,r)}else Lo(e,t)}function Bo(e,t,n=[]){let r,i=e;if(t.length>1){r=t.shift();let a=typeof r,o=Array.isArray(e);if(a===`string`&&(r===`__proto__`||t.length>1&&Ro(r)))return;if(Array.isArray(r)){for(let i=0;i<r.length;i++)Bo(e,[r[i]].concat(t),n);return}if(o&&a===`function`){for(let i=0;i<e.length;i++)r(e[i],i)&&Bo(e,[i].concat(t),n);return}if(o&&a===`object`){let{from:i=0,to:a=e.length-1,by:o=1}=r;for(let r=i;r<=a;r+=o)Bo(e,[r].concat(t),n);return}if(t.length>1){Bo(e[r],t,[r].concat(n));return}i=e[r],n=[r].concat(n)}let a=t[0];typeof a==`function`&&(a=a(i,n),a===i)||(r!==void 0||a!=null)&&(a=ko(a),r===void 0||Oo(i)&&Oo(a)&&!Array.isArray(a)?Lo(i,a):Io(e,r,a))}function Vo(...[e,t]){let n=ko(e||{}),r=Array.isArray(n),i=Do(n);function a(...e){ze(()=>{r&&e.length===1?zo(n,e[0]):Bo(n,e)})}return[i,a]}var Ho=[`active`,`terminated`,`future`];function Uo(){return{stand:`doc`,src:[],ttl:[],sparql:null,policyScope:null,setScope:null,groupBy:null,lang:`nl`,langExpliciet:!1,verkenIri:null,editMode:!1,excludeGraphs:[],filters:{status:null,aanbod:``}}}var[Wo,Go]=Vo(Uo());function Ko(e,t){return Wo.lang,V(e,t)}function qo(e){if(!e)return null;let t=e.split(`,`).map(e=>e.trim()).filter(e=>Ho.includes(e));return t.length?t:null}function Jo(e){let t=new URLSearchParams(e),n=t.get(`verken`)||null,r=ie(t.get(`lang`));ue(r),Go({...Uo(),stand:n?`verken`:`doc`,src:t.getAll(`src`),ttl:t.getAll(`ttl`),sparql:t.get(`sparql`)||null,policyScope:t.get(`policy`)||null,setScope:t.get(`set`)||null,groupBy:t.has(`groupby`)?String(t.get(`groupby`)||``).split(`,`).map(e=>e.trim()).filter(Boolean):null,lang:r,langExpliciet:t.has(`lang`),verkenIri:n,editMode:t.get(`edit`)===`1`,excludeGraphs:t.getAll(`exclude-graph`),filters:{status:qo(t.get(`status`)),aanbod:t.get(`aanbod`)||``}})}var Yo=[`src`,`ttl`,`sparql`,`policy`,`set`,`groupby`,`verken`,`edit`,`exclude-graph`,`status`,`aanbod`,`lang`];function Xo(e,t){let n=new URLSearchParams(t);for(let e of Yo)n.delete(e);for(let t of e.src)n.append(`src`,t);for(let t of e.ttl)n.append(`ttl`,t);e.sparql&&n.set(`sparql`,e.sparql),e.policyScope&&n.set(`policy`,e.policyScope),e.setScope&&n.set(`set`,e.setScope),e.groupBy&&n.set(`groupby`,e.groupBy.join(`,`)),e.verkenIri&&n.set(`verken`,e.verkenIri),e.editMode&&n.set(`edit`,`1`);for(let t of e.excludeGraphs)n.append(`exclude-graph`,t);return e.filters.status&&n.set(`status`,Ho.filter(t=>e.filters.status.includes(t)).join(`,`)),e.filters.aanbod&&n.set(`aanbod`,e.filters.aanbod),e.langExpliciet&&n.set(`lang`,e.lang),n}function Zo(e){if(typeof history>`u`||!history.replaceState)return;let t=Xo(e,new URLSearchParams(location.search)).toString();history.replaceState(null,``,t?`?`+t:location.pathname)}function Qo(e){let t={...e};if(`lang`in t&&t.lang){let e=ie(t.lang);ue(e),t.lang=e,t.langExpliciet=!0}t.policyScope?t.setScope=null:t.setScope&&(t.policyScope=null),`verkenIri`in t&&!(`stand`in t)&&(t.stand=t.verkenIri?`verken`:`doc`),t.filters&&t.filters.status&&t.filters.status.length===Ho.length&&(t.filters={...t.filters,status:null}),Go(t),Zo(Wo)}var $o=le,[es,ts]=k(null),ns=()=>es()?.sleutel??null,rs=()=>es()?.vars;function is(e,t){ts(e?{sleutel:e,vars:t}:null)}var as=new Set;function os(e){return as.add(e),()=>{as.delete(e)}}function ss(e){if(!e)return!1;for(let t of[...as])try{if(t(e))return!0}catch{}return!1}var cs=()=>new Promise(e=>{setTimeout(e,0)});function ls(e){if(typeof document>`u`)return null;let t=e.replace(/["\\]/g,`\\$&`);return document.querySelector(`[data-ref="${t}"]`)||document.querySelector(`[data-iri="${t}"]`)}async function us(e,t){if(typeof e.scrollIntoView==`function`){e.scrollIntoView({behavior:t?`smooth`:`auto`,block:`start`});for(let t=0;t<12;t+=1){await new Promise(e=>{setTimeout(e,40)});let t=e.getBoundingClientRect().top,n=typeof window<`u`?window.innerHeight:0;if(t>=-4&&t<Math.max(n,1))return}e.scrollIntoView({behavior:`auto`,block:`start`})}}async function ds(e,t={}){if(!e)return!1;Wo.stand===`verken`&&(Qo({verkenIri:null,stand:`doc`}),await cs());for(let t of[...as])try{if(t(e))break}catch{}await cs();let n=ls(e);if(!n)return!1;for(let e=n;e;e=e.parentElement)e instanceof HTMLDetailsElement&&(e.open=!0);return await us(n,!!t.smooth),n.classList&&(n.classList.remove(`ui-flash`),n.offsetWidth,n.classList.add(`ui-flash`),setTimeout(()=>n.classList.remove(`ui-flash`),1800)),!0}export{hi as $,j as $t,yo as A,en as At,Ri as B,Ie as Bt,Yi as C,ur as Ct,go as D,Br as Dt,$a as E,Vr as Et,$i as F,Pt as Ft,aa as G,k as Gt,Ki as H,Fe as Ht,sa as I,jt as It,bi as J,Be as Jt,vo as K,Dt as Kt,ji as L,ze as Lt,Ja as M,kt as Mt,la as N,Mt as Nt,fo as O,Qn as Ot,Ni as P,At as Pt,vi as Q,Et as Qt,Bi as R,bt as Rt,q as S,or as St,Qa as T,gr as Tt,Wi as U,Re as Ut,xo as V,A as Vt,ra as W,Ne as Wt,Oi as X,Ve as Xt,_i as Y,He as Yt,Di as Z,b as Zt,Za as _,sr as _t,rs as a,Jr as at,Pi as b,xr as bt,os as c,Kr as ct,Wo as d,hr as dt,Xe as en,si as et,is as f,fr as ft,ta as g,cr as gt,Ii as h,br as ht,ns as i,gi as it,so as j,$t as jt,Ea as k,V as kt,ds as l,mr as lt,_o as m,H as mt,$o as n,mi as nt,Xo as o,Ur as ot,Qo as p,_r as pt,Ai as q,Tt as qt,Jo as r,pi as rt,ss as s,qr as st,Ho as t,fi as tt,Ko as u,Sr as ut,Y as v,dr as vt,mo as w,lr as wt,da as x,yr as xt,Zi as y,pr as yt,Hi as z,Ye as zt};
//# sourceMappingURL=weergave-tdXiC_IP.js.map