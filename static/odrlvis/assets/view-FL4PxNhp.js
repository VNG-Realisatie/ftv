import{Ct as e,D as t,Dt as n,Et as r,F as i,G as a,I as o,J as s,K as c,N as l,O as u,P as d,S as f,St as p,T as m,Tt as h,W as g,Z as _,_t as v,a as y,bt as ee,c as te,dt as ne,et as re,gt as ie,h as ae,it as oe,j as se,k as ce,l as le,lt as ue,mt as de,ot as fe,q as pe,st as me,ut as he,v as ge,w as _e,xt as ve,y as ye,yt as be}from"./term-ooNu0LbA.js";var b={context:void 0,registry:void 0,effects:void 0,done:!1,getContextId(){return xe(this.context.count)},getNextContextId(){return xe(this.context.count++)}};function xe(e){let t=String(e),n=t.length-1;return b.context.id+(n?String.fromCharCode(96+n):``)+t}function x(e){b.context=e}var Se=(e,t)=>e===t,S=Symbol(`solid-proxy`),Ce=typeof Proxy==`function`,we=Symbol(`solid-track`),Te={equals:Se},Ee=null,De=ot,C=1,Oe=2,ke={owned:null,cleanups:null,context:null,owner:null},Ae={},w=null,T=null,E=null,D=null,O=null,je=0;function Me(e,t){let n=E,r=w,i=e.length===0,a=t===void 0?r:t,o=i?ke:{owned:null,cleanups:null,context:a?a.context:null,owner:a},s=i?e:()=>e(()=>j(()=>N(o)));w=o,E=null;try{return M(s,!0)}finally{E=n,w=r}}function k(e,t){t=t?Object.assign({},Te,t):Te;let n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0};return[$e.bind(n),e=>(typeof e==`function`&&(e=T&&T.running&&T.sources.has(n)?e(n.tValue):e(n.value)),et(n,e))]}function Ne(e,t,n){tt(rt(e,t,!0,C))}function Pe(e,t,n){tt(rt(e,t,!1,C))}function Fe(e,t,n){De=st;let r=rt(e,t,!1,C),i=Ze&&Ye(Ze);i&&(r.suspense=i),(!n||!n.render)&&(r.user=!0),O?O.push(r):tt(r)}function A(e,t,n){n=n?Object.assign({},Te,n):Te;let r=rt(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,tt(r),$e.bind(r)}function Ie(e){return e&&typeof e==`object`&&`then`in e}function Le(e,t,n){let r,i,a;typeof t==`function`?(r=e,i=t,a=n||{}):(r=!0,i=e,a=t||{});let o=null,s=Ae,c=null,l=!1,u=!1,d=`initialValue`in a,f=typeof r==`function`&&A(r),p=new Set,[m,h]=(a.storage||k)(a.initialValue),[g,_]=k(void 0),[v,y]=k(void 0,{equals:!1}),[ee,te]=k(d?`ready`:`unresolved`);w&&Ve(()=>{for(let e of p.keys())e.decrement();p.clear(),T&&o&&T.promises.delete(o),o=null}),b.context&&(c=b.getNextContextId(),a.ssrLoadFrom===`initial`?s=a.initialValue:b.load&&b.has(c)&&(s=b.load(c)));function ne(e,t,n,r){return o===e&&(o=null,r!==void 0&&(d=!0),(e===s||t===s)&&a.onHydrated&&queueMicrotask(()=>a.onHydrated(r,{value:t})),s=Ae,T&&e&&l?(T.promises.delete(e),l=!1,M(()=>{T.running=!0,re(t,n)},!1)):re(t,n)),t}function re(e,t){M(()=>{t===void 0&&h(()=>e),te(t===void 0?d?`ready`:`unresolved`:`errored`),_(t);for(let e of p.keys())e.decrement();p.clear()},!1)}function ie(){let e=Ze&&Ye(Ze),t=m(),n=g();if(n!==void 0&&!o)throw n;return E&&!E.user&&e&&Ne(()=>{v(),o&&(e.resolved&&T&&l?T.promises.add(o):p.has(e)||(e.increment(),p.add(e)))}),t}function ae(e=!0){if(e!==!1&&u)return;u=!1;let t=f?f():r;if(l=T&&T.running,t==null||t===!1){ne(o,j(m));return}T&&o&&T.promises.delete(o);let n,a=s===Ae?j(()=>{try{return i(t,{value:m(),refetching:e})}catch(e){n=e}}):s;if(n!==void 0){ne(o,void 0,dt(n),t);return}return Ie(a)?(o=a,`v`in a?(a.s===1?ne(o,a.v,void 0,t):ne(o,void 0,dt(a.v),t),a):(u=!0,queueMicrotask(()=>u=!1),M(()=>{te(d?`refreshing`:`pending`),y()},!1),a.then(e=>ne(a,e,void 0,t),e=>ne(a,void 0,dt(e),t)))):(ne(o,a,void 0,t),a)}Object.defineProperties(ie,{state:{get:()=>ee()},error:{get:()=>g()},loading:{get(){let e=ee();return e===`pending`||e===`refreshing`}},latest:{get(){if(!d)return ie();let e=g();if(e&&!o)throw e;return m()}}});let oe=w;return f?Ne(()=>(oe=w,ae(!1))):ae(!1),[ie,{refetch:e=>We(oe,()=>ae(e)),mutate:h}]}function Re(e){return M(e,!1)}function j(e){if(E===null)return e();let t=E;E=null;try{return e()}finally{E=t}}function ze(e,t,n){let r=Array.isArray(e),i,a=n&&n.defer;return n=>{let o;if(r){o=Array(e.length);for(let t=0;t<e.length;t++)o[t]=e[t]()}else o=e();if(a)return a=!1,n;let s=j(()=>t(o,i,n));return i=o,s}}function Be(e){Fe(()=>j(e))}function Ve(e){return w===null||(w.cleanups===null?w.cleanups=[e]:w.cleanups.push(e)),e}function He(){return E}function Ue(){return w}function We(e,t){let n=w,r=E;w=e,E=null;try{return M(t,!0)}catch(e){pt(e)}finally{w=n,E=r}}var[Ge,Ke]=k(!1);function qe(e){O.push.apply(O,e),e.length=0}function Je(e,t){let n=Symbol(`context`);return{id:n,Provider:ht(n),defaultValue:e}}function Ye(e){let t;return w&&w.context&&(t=w.context[e.id])!==void 0?t:e.defaultValue}function Xe(e){let t=A(e),n=A(()=>mt(t()));return n.toArray=()=>{let e=n();return Array.isArray(e)?e:e==null?[]:[e]},n}var Ze;function Qe(){return Ze||=Je()}function $e(){let e=T&&T.running;if(this.sources&&(e?this.tState:this.state)){if((e?this.tState:this.state)===C)tt(this);else{let e=D;D=null,M(()=>ct(this),!1),D=e}}if(E){let e=this.observers;if(!e||e[e.length-1]!==E){let t=e?e.length:0;E.sources?(E.sources.push(this),E.sourceSlots.push(t)):(E.sources=[this],E.sourceSlots=[t]),e?(e.push(E),this.observerSlots.push(E.sources.length-1)):(this.observers=[E],this.observerSlots=[E.sources.length-1])}}return e&&T.sources.has(this)?this.tValue:this.value}function et(e,t,n){let r=T&&T.running&&T.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(r,t)){if(T){let r=T.running;(r||!n&&T.sources.has(e))&&(T.sources.add(e),e.tValue=t),r||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&M(()=>{for(let t=0;t<e.observers.length;t+=1){let n=e.observers[t],r=T&&T.running;r&&T.disposed.has(n)||((r?!n.tState:!n.state)&&(n.pure?D.push(n):O.push(n),n.observers&&lt(n)),r?n.tState=C:n.state=C)}if(D.length>1e6)throw D=[],Error()},!1)}return t}function tt(e){if(!e.fn)return;N(e);let t=je;nt(e,T&&T.running&&T.sources.has(e)?e.tValue:e.value,t),T&&!T.running&&T.sources.has(e)&&queueMicrotask(()=>{M(()=>{T&&(T.running=!0),E=w=e,nt(e,e.tValue,t),E=w=null},!1)})}function nt(e,t,n){let r,i=w,a=E;E=w=e;try{r=e.fn(t)}catch(t){return e.pure&&(T&&T.running?(e.tState=C,e.tOwned&&e.tOwned.forEach(N),e.tOwned=void 0):(e.state=C,e.owned&&e.owned.forEach(N),e.owned=null)),e.updatedAt=n+1,pt(t)}finally{E=a,w=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&`observers`in e?et(e,r,!0):T&&T.running&&e.pure?(T.sources.has(e)||(e.value=r),T.sources.add(e),e.tValue=r):e.value=r,e.updatedAt=n)}function rt(e,t,n,r=C,i){let a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:w,context:w?w.context:null,pure:n};return T&&T.running&&(a.state=0,a.tState=r),w===null||w!==ke&&(T&&T.running&&w.pure?w.tOwned?w.tOwned.push(a):w.tOwned=[a]:w.owned?w.owned.push(a):w.owned=[a]),a}function it(e){let t=T&&T.running;if((t?e.tState:e.state)===0)return;if((t?e.tState:e.state)===Oe)return ct(e);if(e.suspense&&j(e.suspense.inFallback))return e.suspense.effects.push(e);let n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<je);){if(t&&T.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let r=n.length-1;r>=0;r--){if(e=n[r],t){let t=e,i=n[r+1];for(;(t=t.owner)&&t!==i;)if(T.disposed.has(t))return}if((t?e.tState:e.state)===C)tt(e);else if((t?e.tState:e.state)===Oe){let t=D;D=null,M(()=>ct(e,n[0]),!1),D=t}}}function M(e,t){if(D)return e();let n=!1;t||(D=[]),O?n=!0:O=[],je++;try{let t=e();return at(n),t}catch(e){n||(O=null),D=null,pt(e)}}function at(e){if(D&&=(ot(D),null),e)return;let t;if(T){if(!T.promises.size&&!T.queue.size){let e=T.sources,n=T.disposed;O.push.apply(O,T.effects),t=T.resolve;for(let e of O)`tState`in e&&(e.state=e.tState),delete e.tState;T=null,M(()=>{for(let e of n)N(e);for(let t of e){if(t.value=t.tValue,t.owned)for(let e=0,n=t.owned.length;e<n;e++)N(t.owned[e]);t.tOwned&&(t.owned=t.tOwned),delete t.tValue,delete t.tOwned,t.tState=0}Ke(!1)},!1)}else if(T.running){T.running=!1,T.effects.push.apply(T.effects,O),O=null,Ke(!0);return}}let n=O;O=null,n.length&&M(()=>De(n),!1),t&&t()}function ot(e){for(let t=0;t<e.length;t++)it(e[t])}function st(e){let t,n=0;for(t=0;t<e.length;t++){let r=e[t];r.user?e[n++]=r:it(r)}if(b.context){if(b.count){b.effects||=[],b.effects.push(...e.slice(0,n));return}x()}for(b.effects&&(b.done||!b.count)&&(e=[...b.effects,...e],n+=b.effects.length,delete b.effects),t=0;t<n;t++)it(e[t])}function ct(e,t){let n=T&&T.running;n?e.tState=0:e.state=0;for(let r=0;r<e.sources.length;r+=1){let i=e.sources[r];if(i.sources){let e=n?i.tState:i.state;e===C?i!==t&&(!i.updatedAt||i.updatedAt<je)&&it(i):e===Oe&&ct(i,t)}}}function lt(e){let t=T&&T.running;for(let n=0;n<e.observers.length;n+=1){let r=e.observers[n];(t?!r.tState:!r.state)&&(t?r.tState=Oe:r.state=Oe,r.pure?D.push(r):O.push(r),r.observers&&lt(r))}}function N(e){let t;if(e.sources)for(;e.sources.length;){let t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){let e=r.pop(),i=t.observerSlots.pop();n<r.length&&(e.sourceSlots[i]=n,r[n]=e,t.observerSlots[n]=i)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)N(e.tOwned[t]);delete e.tOwned}if(T&&T.running&&e.pure)ut(e,!0);else if(e.owned){for(t=e.owned.length-1;t>=0;t--)N(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}T&&T.running?e.tState=0:e.state=0}function ut(e,t){if(t||(e.tState=0,T.disposed.add(e)),e.owned)for(let t=0;t<e.owned.length;t++)ut(e.owned[t])}function dt(e){return e instanceof Error?e:Error(typeof e==`string`?e:`Unknown error`,{cause:e})}function ft(e,t,n){try{for(let n of t)n(e)}catch(e){pt(e,n&&n.owner||null)}}function pt(e,t=w){let n=Ee&&t&&t.context&&t.context[Ee],r=dt(e);if(!n)throw r;O?O.push({fn(){ft(r,n,t)},state:C}):ft(r,n,t)}function mt(e){if(typeof e==`function`&&!e.length)return mt(e());if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++){let r=mt(e[n]);if(Array.isArray(r)){if(r.length<32768)t.push.apply(t,r);else for(let e=0;e<r.length;e++)t.push(r[e])}else t.push(r)}return t}return e}function ht(e,t){return function(t){let n;return Pe(()=>n=j(()=>(w.context={...w.context,[e]:t.value},Xe(()=>t.children))),void 0),n}}var gt=Symbol(`fallback`);function _t(e){for(let t=0;t<e.length;t++)e[t]()}function vt(e,t,n={}){let r=[],i=[],a=[],o=0,s=t.length>1?[]:null;return Ve(()=>_t(a)),()=>{let c=e()||[],l=c.length,u,d;return c[we],j(()=>{let e,t,p,m,h,g,_,v,y;if(l===0)o!==0&&(_t(a),a=[],r=[],i=[],o=0,s&&=[]),n.fallback&&(r=[gt],i[0]=Me(e=>(a[0]=e,n.fallback())),o=1);else if(o===0){for(i=Array(l),d=0;d<l;d++)r[d]=c[d],i[d]=Me(f);o=l}else{for(p=Array(l),m=Array(l),s&&(h=Array(l)),g=0,_=Math.min(o,l);g<_&&r[g]===c[g];g++);for(_=o-1,v=l-1;_>=g&&v>=g&&r[_]===c[v];_--,v--)p[v]=i[_],m[v]=a[_],s&&(h[v]=s[_]);for(e=new Map,t=Array(v+1),d=v;d>=g;d--)y=c[d],u=e.get(y),t[d]=u===void 0?-1:u,e.set(y,d);for(u=g;u<=_;u++)y=r[u],d=e.get(y),d!==void 0&&d!==-1?(p[d]=i[u],m[d]=a[u],s&&(h[d]=s[u]),d=t[d],e.set(y,d)):a[u]();for(d=g;d<l;d++)d in p?(i[d]=p[d],a[d]=m[d],s&&(s[d]=h[d],s[d](d))):i[d]=Me(f);i=i.slice(0,o=l),r=c.slice(0)}return i});function f(e){if(a[d]=e,s){let[e,n]=k(d);return s[d]=n,t(c[d],e)}return t(c[d])}}}function yt(e,t){return j(()=>e(t||{}))}function bt(){return!0}var xt={get(e,t,n){return t===S?n:e.get(t)},has(e,t){return t===S||e.has(t)},set:bt,deleteProperty:bt,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:bt,deleteProperty:bt}},ownKeys(e){return e.keys()}};function St(e){return(e=typeof e==`function`?e():e)?e:{}}function Ct(){for(let e=0,t=this.length;e<t;++e){let t=this[e]();if(t!==void 0)return t}}function wt(...e){let t=!1;for(let n=0;n<e.length;n++){let r=e[n];t||=!!r&&S in r,e[n]=typeof r==`function`?(t=!0,A(r)):r}if(Ce&&t)return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){let r=St(e[n])[t];if(r!==void 0)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in St(e[n]))return!0;return!1},keys(){let t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(St(e[n])));return[...new Set(t)]}},xt);let n={},r=Object.create(null);for(let t=e.length-1;t>=0;t--){let i=e[t];if(!i)continue;let a=Object.getOwnPropertyNames(i);for(let e=a.length-1;e>=0;e--){let t=a[e];if(t===`__proto__`||t===`constructor`)continue;let o=Object.getOwnPropertyDescriptor(i,t);if(!r[t])r[t]=o.get?{enumerable:!0,configurable:!0,get:Ct.bind(n[t]=[o.get.bind(i)])}:o.value===void 0?void 0:o;else{let e=n[t];e&&(o.get?e.push(o.get.bind(i)):o.value!==void 0&&e.push(()=>o.value))}}}let i={},a=Object.keys(r);for(let e=a.length-1;e>=0;e--){let t=a[e],n=r[t];n&&n.get?Object.defineProperty(i,t,n):i[t]=n?n.value:void 0}return i}function Tt(e,...t){let n=t.length;if(Ce&&S in e){let r=n>1?t.flat():t[0],i=new Set,a=t.map(t=>{let n=t.filter(e=>!i.has(e)&&(i.add(e),!0));return new Proxy({get(t){return n.includes(t)?e[t]:void 0},has(t){return n.includes(t)&&t in e},keys(){return n.filter(t=>t in e)}},xt)});return a.push(new Proxy({get(t){return r.includes(t)?void 0:e[t]},has(t){return!r.includes(t)&&t in e},keys(){return Object.keys(e).filter(e=>!r.includes(e))}},xt)),a}let r=[];for(let e=0;e<=n;e++)r[e]={};for(let i of Object.getOwnPropertyNames(e)){let a=n;for(let e=0;e<t.length;e++)if(t[e].includes(i)){a=e;break}let o=Object.getOwnPropertyDescriptor(e,i);!o.get&&!o.set&&o.enumerable&&o.writable&&o.configurable?r[a][i]=o.value:Object.defineProperty(r[a],i,o)}return r}function Et(e){let t,n,r=()=>{if(!n){let r=n=e();r.then(e=>{t=()=>e.default},()=>{n===r&&(n=void 0)})}return n},i=e=>{let n=b.context;if(n){let[e,i]=k();b.count||=0,b.count++,r().then(e=>{!b.done&&x(n),b.count--,i(()=>e.default),x()},e=>{!b.done&&x(n),b.count--,i(()=>()=>{throw e}),x()}),t=e}else if(!t){let[e]=Le(()=>r().then(e=>e.default));t=e,Ve(()=>t=void 0)}let i;return A(()=>(i=t?.())?j(()=>{if(!n||b.done)return i(e);let t=b.context;x(n);let r=i(e);return x(t),r}):``)};return i.preload=()=>r(),i}var Dt=e=>`Stale read from <${e}>.`;function Ot(e){let t=`fallback`in e&&{fallback:()=>e.fallback};return A(vt(()=>e.each,e.children,t||void 0))}function kt(e){let t=e.keyed,n=A(()=>e.when,void 0,void 0),r=t?n:A(n,void 0,{equals:(e,t)=>!e==!t});return A(()=>{let i=r();if(i){let a=e.children;return typeof a==`function`&&a.length>0?j(()=>a(t?i:()=>{if(!j(r))throw Dt(`Show`);return n()})):a}return e.fallback},void 0,void 0)}function At(e){let t=Xe(()=>e.children),n=A(()=>{let e=t(),n=Array.isArray(e)?e:[e],r=()=>void 0;for(let e=0;e<n.length;e++){let t=e,i=n[e],a=r,o=A(()=>a()?void 0:i.when,void 0,void 0),s=i.keyed?o:A(o,void 0,{equals:(e,t)=>!e==!t});r=()=>a()||(s()?[t,o,i]:void 0)}return r});return A(()=>{let t=n()();if(!t)return e.fallback;let[r,i,a]=t,o=a.children;return typeof o==`function`&&o.length>0?j(()=>o(a.keyed?i():()=>{if(j(n)()?.[0]!==r)throw Dt(`Match`);return i()})):o},void 0,void 0)}function jt(e){return e}var Mt=Je();function Nt(e){let t=0,n,r,i,a,o,[s,c]=k(!1),l=Qe(),u={increment:()=>{++t===1&&c(!0)},decrement:()=>{--t===0&&c(!1)},inFallback:s,effects:[],resolved:!1},d=Ue();if(b.context&&b.load){let e=b.getContextId(),t=b.load(e);if(t&&(typeof t!=`object`||t.s!==1?i=t:b.gather(e)),i&&i!==`$$f`){let[t,n]=k(void 0,{equals:!1});a=t,i.then(()=>{if(b.done)return n();b.gather(e),x(r),n(),x()},e=>{o=e,n()})}}let f=Ye(Mt);f&&(n=f.register(u.inFallback));let p;return Ve(()=>p&&p()),yt(l.Provider,{value:u,get children(){return A(()=>{if(o)throw o;if(r=b.context,a){a(),a=void 0;return}r&&i===`$$f`&&x();let t=A(()=>e.children);return A(a=>{let o=u.inFallback(),{showContent:s=!0,showFallback:c=!0}=n?n():{};if((!o||i&&i!==`$$f`)&&s)return u.resolved=!0,p&&p(),p=r=i=void 0,qe(u.effects),t();if(c)return p?a:Me(t=>(p=t,r&&=(x({id:r.id+`F`,count:0}),void 0),e.fallback),d)})})}})}var{Store:Pt,termFromId:Ft}=h;function It(){return new Pt}function Lt(e,{termText:t,termOffsets:n,quadTable:r},{chunkSize:i=25e3,onProgress:a=null}={}){let o=n.length-1,s=Array(o);for(let e=0;e<o;e++)s[e]=Ft(t.substring(n[e],n[e+1]));let c=e._entityIndex;if(c&&c._termToNewNumericId)for(let e of s)c._termToNewNumericId(e);let l=e=>s[e],u=r.length/4;return new Promise(t=>{let n=0,o=()=>{let s=Math.min(u,n+i);for(;n<s;n++)e.addQuad(l(r[n*4]),l(r[n*4+1]),l(r[n*4+2]),l(r[n*4+3]));a&&a(n,u),n<u?setTimeout(o,0):t(e)};o()})}function Rt(e,{setScope:t=null,lang:n=null,onProgress:r=null,onStore:i=null}={}){return new Promise((a,o)=>{let s;try{s=new Worker(new URL(``+new URL(`model-worker-hHeqh3h9.js`,import.meta.url).href,``+import.meta.url),{type:`module`})}catch(e){o(e);return}let l=!1,u=e=>{s.terminate(),l?i&&i(null):o(Error(e))};s.onerror=e=>u(e&&e.message?e.message:`worker failed to start`),s.onmessage=e=>{let t=e.data||{};if(t.type===`progress`){!l&&r&&r(t);return}if(t.type===`model`){l=!0,c(t.prefixes),a(t);return}if(t.type===`store`){s.terminate(),i&&i(t);return}t.type===`error`&&u(t.message)},s.postMessage({sources:e,setScope:t,lang:n,profile:de()})})}var{quad:zt}=n,Bt=`http://www.w3.org/ns/odrl/2/`,Vt=`http://purl.org/dc/terms/`,Ht=`https://schema.org/`,Ut=[],P=`PREFIX odrl: <http://www.w3.org/ns/odrl/2/>
PREFIX dct:  <http://purl.org/dc/terms/>
PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX schema: <https://schema.org/>
`;async function Wt(e,t,n,r){let i=await(r||globalThis.fetch)(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`,Accept:n},body:`query=`+encodeURIComponent(t)});if(!i.ok){let e=``;try{e=(await i.text()).slice(0,200)}catch{}throw Error(`SPARQL HTTP ${i.status}${e?` — `+e:``}`)}return i}async function F(e,t,n){let r=await(await Wt(e,t,`application/sparql-results+json`,n)).json();return r&&r.results&&r.results.bindings||[]}async function Gt(e,t,n){return(await Wt(e,t,`text/turtle`,n)).text()}function Kt(e){return!!e&&e.termType===`BlankNode`}function qt(e,t){let n=[],r=0;for(let t of e){if(Kt(t.subject)||Kt(t.object)){r++;continue}n.push(t)}return r&&console.warn(`SPARQL Update: skipped ${r} ${t} triple(s) with a blank node (DELETE/INSERT DATA allows none)`),{kept:n,skipped:r}}var Jt=/^[A-Za-z]+(-[A-Za-z0-9]+)*$/;function Yt(e){if(!Jt.test(String(e)))throw Error(`ongeldige taal-tag voor SPARQL: `+e)}function Xt(e){e&&(e.termType===`NamedNode`?I(e.value):e.termType===`Literal`&&(e.language&&Yt(e.language),e.datatype&&Xt(e.datatype)))}function Zt(e){let t=new r,n=e.map(e=>(Xt(e.subject),Xt(e.predicate),Xt(e.object),zt(e.subject,e.predicate,e.object)));return t.quadsToString(n)}function Qt({added:e=[],removed:t=[]}={}){let n=qt(t,`DELETE`),r=qt(e,`INSERT`),i=[];return n.kept.length&&i.push(`DELETE DATA {
`+Zt(n.kept)+`}`),r.kept.length&&i.push(`INSERT DATA {
`+Zt(r.kept)+`}`),{query:i.join(`;
`),skipped:n.skipped+r.skipped}}async function $t(e,t,n){let r=await(n||globalThis.fetch)(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`},body:`update=`+encodeURIComponent(t)});if(!r.ok){let e=``;try{e=(await r.text()).slice(0,200)}catch{}throw Error(`SPARQL update HTTP ${r.status}${e?` — `+e:``}`)}}function I(e){let t=String(e||``);if(!/^[^<>"{}|^`\\\s]+$/.test(t))throw Error(`ongeldige IRI voor SPARQL: `+t);return`<`+t+`>`}function L(e,t){return!t||!t.length?``:`FILTER(${e} NOT IN (${t.map(I).join(`, `)}))`}var en=p.find(e=>e.id===`prov`);function R(e,t){let n=[...en.memberPreds.map(n=>`{ ${e} <${n}> ${t} }`),...en.inverseMemberPreds.map(n=>`{ ${t} <${n}> ${e} }`)];return n.length===1?n[0].replace(/^\{ | \}$/g,``)+` .`:n.join(` UNION `)}var tn=e.map(e=>`<${e}>`).join(`|`),nn=(e,t,n,r)=>`  OPTIONAL { ${e} schema:validFrom ${n}_s }
  OPTIONAL { ${e} schema:validThrough ${r}_s }
  OPTIONAL {
    ${e} dct:valid ${t} .
    OPTIONAL { ${t} dcat:startDate ${n}_n }
    OPTIONAL { ${t} dcat:endDate ${r}_n }
  }
  BIND(COALESCE(${n}_s, ${n}_n) AS ${n})
  BIND(COALESCE(${r}_s, ${r}_n) AS ${r})`;function rn(){return`${P}
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
            # A version is a TYPED policy OR a document version (stub): a
            # member that carries no ODRL type but does carry version data.
            # The same check as readTemporalContainers. Without the stub branch
            # a register that keeps superseded versions as bare entities counts
            # every agreement as one version, and the arrows stay away on every
            # collapsed card. The type-check alternative without a subquery
            # measured an order of magnitude slower, so this form stays.
            { VALUES ?vt { odrl:Set odrl:Offer odrl:Agreement odrl:Request } ?v a ?vt }
            UNION
            { ?v ${tn} ?vd }
          } GROUP BY ?cX }
        ${R(`?cX`,`?policy`)}
        OPTIONAL { ?cX dct:title ?ctX }
      } GROUP BY ?policy }
  }
  # Dating of the version: dct:issued (what the version navigator shows) and the
  # validity period. Without these branches the chip showed a dash everywhere in
  # list mode.
  OPTIONAL { ?policy dct:issued ?iss }
${nn(`?policy`,`?vn`,`?vf`,`?vt`)}
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
  # SAMPLE is safe: on a request
  # volgt één beslissing.
  # Gemeten (25-8, Fuseki, 3 rondes, /brp-ap) mét/zonder: 0,47/0,56 s — binnen
  # the noise, and the answer grows only marginally.
  OPTIONAL { ?ansX prov:wasDerivedFrom ?policy . ?ansX a odrl:Agreement }
}
GROUP BY ?policy ?kind
`}function an(){return`${P}
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
`}function on(){return`${P}
SELECT ?container ?policy ?containerTitle
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ${R(`?container`,`?policy`)}
  FILTER(isIRI(?container) && isIRI(?policy))
  OPTIONAL { ?container dct:title ?containerTitle }
}
`}function sn(){return`${P}
SELECT ?container (COUNT(DISTINCT ?v) AS ?n)
WHERE {
  ${R(`?container`,`?v`)}
  FILTER(isIRI(?container) && isIRI(?v))
  { VALUES ?vt { odrl:Set odrl:Offer odrl:Agreement odrl:Request } ?v a ?vt }
  UNION
  { ?v ${tn} ?vd }
}
GROUP BY ?container
`}function cn(){return`${P}
SELECT ?policy ?issued ?validFrom ?validTo ?valid ?revisionOf
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  FILTER(isIRI(?policy))
  OPTIONAL { ?policy dct:issued ?issued }
${nn(`?policy`,`?valid`,`?validFrom`,`?validTo`)}
  OPTIONAL { ?policy prov:wasRevisionOf ?revisionOf }
}
`}function ln(){return`${P}
SELECT DISTINCT ?policy ?offer
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?offer .
  ?offer a odrl:Offer .
  FILTER(isIRI(?policy))
}
`}function un(){return`${P}
SELECT DISTINCT ?policy ?request
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?request .
  ?request a odrl:Request .
  FILTER(isIRI(?policy))
}
`}function dn(){return`${P}
SELECT DISTINCT ?policy ?agreement
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?agreement prov:wasDerivedFrom ?policy .
  ?agreement a odrl:Agreement .
  FILTER(isIRI(?policy))
}
`}function fn(e,t,n,r,i,{lang:a=null,requestRefs:o=[],answeredByRefs:s=[]}={}){let c=e=>e?e.value:null,l=a||oe(),u=(e,t)=>!e||fe(t[`xml:lang`]||``,l)<fe(e[`xml:lang`]||``,l),d=new Map;for(let e of t||[]){let t=c(e&&e.policy);if(!t||!e.container)continue;let n=d.get(t);n||(n={container:e.container,containerTitle:null},d.set(t,n)),e.containerTitle&&e.container.value===n.container.value&&u(n.containerTitle,e.containerTitle)&&(n.containerTitle=e.containerTitle)}let f=new Map;for(let e of n||[]){let t=c(e&&e.container);t&&e.n&&(f.has(t)||f.set(t,e.n))}let p=[`issued`,`validFrom`,`validTo`,`valid`,`revisionOf`],m=new Map;for(let e of r||[]){let t=c(e&&e.policy);if(!t)continue;let n=m.get(t);n||(n={},m.set(t,n));for(let t of p)!n[t]&&e[t]&&(n[t]=e[t])}let h=new Map;for(let e of i||[]){let t=c(e&&e.policy);t&&e.offer&&(h.has(t)||h.set(t,e.offer))}let g=new Map;for(let e of o||[]){let t=c(e&&e.policy);t&&e.request&&(g.has(t)||g.set(t,e.request))}let _=new Map;for(let e of s||[]){let t=c(e&&e.policy);t&&e.agreement&&(_.has(t)||_.set(t,e.agreement))}let v=[],y=new Map;for(let t of e||[]){if(!t||!t.policy)continue;let e=t.policy.value+`\0`+(c(t.kind)||``),n=y.get(e);n||(n={policy:t.policy},t.kind&&(n.kind=t.kind),y.set(e,n),v.push(n)),t.title&&u(n.title,t.title)&&(n.title=t.title),!n.assignee&&t.assignee?(n.assignee=t.assignee,t.assigneeLabel&&(n.assigneeLabel=t.assigneeLabel)):n.assignee&&t.assigneeLabel&&t.assignee&&t.assignee.value===n.assignee.value&&u(n.assigneeLabel,t.assigneeLabel)&&(n.assigneeLabel=t.assigneeLabel)}for(let e of v){let t=e.policy.value,n=d.get(t);if(n){e.container=n.container,n.containerTitle&&(e.containerTitle=n.containerTitle);let t=f.get(n.container.value);t&&(e.versionCount=t)}let r=m.get(t);if(r)for(let t of p)r[t]&&(e[t]=r[t]);let i=h.get(t);i&&(e.offerRef=i);let a=g.get(t);a&&(e.requestRef=a);let o=_.get(t);o&&(e.answeredByRef=o)}return v}function pn(e){let t=String(e&&e.message||e||``);return/SPARQL HTTP 5\d\d/.test(t)||/\btimed out\b|\btimeout\b/i.test(t)}async function mn(e,t,{lang:n=null}={}){let[r,i,a,o,s,c,l]=await Promise.all([F(e,an(),t),F(e,on(),t),F(e,sn(),t),F(e,cn(),t),F(e,ln(),t),F(e,un(),t),F(e,dn(),t)]);return fn(r,i,a,o,s,{lang:n,requestRefs:c,answeredByRefs:l})}function hn({limitPerKind:e=60}={}){let t=Math.max(1,e|0),n=(e,n)=>`  {
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
`}function gn(){return`${P}
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
${nn(`?version`,`?vn`,`?vf`,`?vt`)}
  OPTIONAL { ?version dct:issued ?iss }
}
GROUP BY ?container ?kind ?version
`}var _n=`http://www.w3.org/ns/odrl/2/`,vn=(e,t)=>`${e} rdf:type ?dt${t} .
      FILTER(!STRSTARTS(STR(?dt${t}), "${_n}"))`,z=`(odrl:permission|odrl:prohibition|odrl:obligation|odrl:duty|odrl:remedy|odrl:consequence|odrl:constraint|odrl:refinement|odrl:action|odrl:target|odrl:rightOperand|dct:valid|odrl:and|odrl:or|odrl:xone|odrl:andSequence|rdf:first|rdf:rest)*`,yn=`rdf:type, dct:title, dct:issued, schema:validFrom, schema:validThrough, dct:valid, odrl:uid, prov:wasRevisionOf, prov:specializationOf, prov:wasDerivedFrom`;function bn(e,{excludeGraphs:t=Ut}={}){let n=I(e),r=(e,r,i,a)=>t&&t.length?`${n} ${z} ${e} .
    GRAPH ${a} { ${e} ${r} ${i} . }
    ${L(a,t)}`:`${n} ${z} ${e} . ${e} ${r} ${i} .`,i=(e,r,i)=>t&&t.length?`${n} ${z}${e} ${r} .
    GRAPH ${i} { ${r} ?lp ?ll . }
    ${L(i,t)}`:`${n} ${z}${e} ${r} . ${r} ?lp ?ll .`,a=`(dct:hasPart|^odrl:partOf)`,o=`(odrl:permission|odrl:prohibition|odrl:obligation|odrl:duty)`,s=`(odrl:constraint|odrl:refinement)`,c=(e,t)=>i(`/`+a,e,t),l=(e,t)=>i(`/`+a+`/rdf:type`,e,t),u=e=>t&&t.length?`${n} ${z} ?ll .
    GRAPH ${e} { ?x odrl:partOf ?ll . }
    ${L(e,t)}`:`${n} ${z} ?ll .
    ?x odrl:partOf ?ll .`,d=`prov:wasDerivedFrom`,f=(e,r)=>t&&t.length?`${n} ${d} ?req . ?req a odrl:Request .
    ?req ${e} ?x .
    GRAPH ${r} { ?x ?lp ?ll . }
    ${L(r,t)}`:`${n} ${d} ?req . ?req a odrl:Request . ?req ${e} ?x . ?x ?lp ?ll .`,p=`(odrl:permission|odrl:prohibition|odrl:obligation)?`,m=`odrl:inheritFrom`,h=(e,r,i,a)=>t&&t.length?`${n} ${m}/${z} ${e} .
    GRAPH ${a} { ${e} ${r} ${i} . }
    ${L(a,t)}`:`${n} ${m}/${z} ${e} . ${e} ${r} ${i} .`;return`${P}
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
    ${R(`?c`,n)}
    ?c ?cp ?co .
    # Blank objects stay out of view — a container is a flat node — WITH one
    # exception: an unmigrated graph can still carry its validity period as a
    # blank period node. The primary form is flat literals and comes along
    # anyway.
    FILTER(!isBlank(?co) || ?cp = dct:valid)
  } UNION {
    # 3. sibling versions: metadata for the version picker (expired included)
    ${R(`?c2`,n)}
    ${R(`?c2`,`?v`)}
    ?v ?vp ?vo .
    FILTER(?vp IN (${yn}))
  } UNION {
    # 3b. FALLBACK: validity period NODES of the container and of the sibling
    # versions. On data in the primary form this branch does NOTHING — the dates
    # are flat literals there and already come with branches 2 and 3. It stays
    # for unmigrated graphs and third-party data, where the object of dct:valid
    # is a blank period node: branches 2 and 3 then fetch the dct:valid TRIPLE
    # but not the dates behind it, and the version picker stood
    # zonder data. De policy's eigen periode zit al in tak 1 (dct:valid staat in
    # CLOSURE_PATH). Cheap: at most one node of three triples per version, and on
    # primary-form data these variables bind nowhere.
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
    # taal mee kon wisselen (B16). Bewust als ÉÉN propertypad geschreven en
    # bound to the membership path, the same one the model reads. That is not a
    # style question: measured
    # op /brp kost deze vorm 9 ms, terwijl dezelfde patronen als losse triples
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
    # Gemeten (24-8, Fuseki, 5 rondes, mediaan) mét/zonder deze twee takken,
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
    # verruimde 6a-filter: /brp-ap 008001-v6 198/193 ms (1.950 KB, gelijk),
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
    # ?sparql=-modus leeg terwijl dezelfde bron in ttl-modus vijf keer "gedekt
    # door" toonde (gevonden op /breda).
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
    # kale localName. Zelfde verhouding als 4b tot 4c.
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
`}function xn(e,{excludeGraphs:t=Ut}={}){let n=I(e),r=(e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
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
        ${vn(`?an`,`d`)}
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
      ${vn(`?up`,`e`)}
      ${r(`?g5`,`?up ?upp ?upl .
      FILTER(?upp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    }
  }
}
`}var Sn=`PREFIX sh:   <http://www.w3.org/ns/shacl#>
PREFIX dash: <http://datashapes.org/dash#>
PREFIX shui: <http://www.w3.org/ns/shacl-ui/>
`,Cn=`(sh:name|sh:description|sh:order|sh:group|dash:viewer|dash:propertyRole|shui:viewer|shui:propertyRole)`,wn=`(sh:property|sh:group)*`,Tn=`rdfs:label, skos:prefLabel, dct:title, skos:definition, dct:description, rdfs:comment`;function En({excludeGraphs:e=Ut,limit:t=200}={}){let n=Math.max(1,t|0),r=(t,n)=>e&&e.length?`GRAPH ${t} { ${n} }
    ${L(t,e)}`:n,i=`{ SELECT DISTINCT ?shape ?tc WHERE {
      ?shape a sh:NodeShape .
      ?shape sh:targetClass ?tc .
      ?shape sh:property/${Cn} ?ann .
      FILTER(isIRI(?tc))
    } LIMIT ${n} }`;return`${P}${Sn}
CONSTRUCT {
  ?s ?p ?o .
  ?pad ?lp ?ll .
  ?sub rdfs:subClassOf ?super .
}
WHERE {
  {
    # 1+2. the shape itself, its property shapes and their PropertyGroups
    ${i}
    ?shape ${wn} ?s .
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
    FILTER(?lp IN (${Tn}))`)}
  } UNION {
    # 4. the subclass chains that end at a target class
    ${i}
    ?sub rdfs:subClassOf+ ?tc .
    ?sub rdfs:subClassOf ?super .
  }
}
`}function Dn(e,{limit:t=400,excludeGraphs:n=Ut}={}){let r=I(e),i=Math.max(1,t|0),a=(e,t)=>n&&n.length?`GRAPH ${e} { ${t} }
    ${L(e,n)}`:t;return`${P}
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
    #    dezelfde buurgegevens.
    { SELECT ?in ?subject WHERE { ?subject ?in ${r} . FILTER(isIRI(?subject)) } LIMIT ${i} }
    OPTIONAL { ${a(`?g2`,`?subject ?sp ?sv .
      FILTER(isLiteral(?sv) || ?sp = rdf:type)`)} }
  }
}
`}var On=1e3;function kn(e,{excludeGraphs:t=Ut,max:n=200,excludeNodes:r=null,maxExclude:i=On}={}){let a=[...e||[]].slice(0,Math.max(1,n|0));if(!a.length)return null;let o=[...r||[]];return o.length>Math.max(0,i|0)?null:`${P}
SELECT (COUNT(DISTINCT ?node) AS ?n)
WHERE {
  VALUES ?klasse { ${a.map(I).join(` `)} }
  ${((e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
  ${L(e,t)}`:n)(`?g1`,`?node rdf:type ?klasse .`)}${o.length?`
  FILTER(?node NOT IN (${o.map(I).join(`, `)}))`:``}
}
`}var An=1e3;function jn(e,{excludeGraphs:t=Ut,max:n=An}={}){let r=[...e||[]];return!r.length||r.length>Math.max(1,n|0)?null:`${P}
CONSTRUCT { ?n ?lp ?lv }
WHERE {
  VALUES ?n { ${r.map(I).join(` `)} }
  ${((e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
  ${L(e,t)}`:n)(`?g1`,`?n ?lp ?lv .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title))`)}
}
`}function B(e){return String(e).replace(/\\/g,`\\\\`).replace(/"/g,`\\"`).replace(/\n/g,`\\n`).replace(/\r/g,`\\r`).replace(/\t/g,`\\t`)}function Mn(e){let t=e&&e[`xml:lang`];return t&&Jt.test(t)?`@`+t:``}function V(e){return e?e.value:null}var Nn={set:Bt+`Set`,offer:Bt+`Offer`,agreement:Bt+`Agreement`,request:Bt+`Request`};function Pn(e,t,n,r){let i=r&&r.type,a=[];return t||n?(t&&a.push(`<${e}> <${Ht}validFrom> "${B(t)}" .`),n&&a.push(`<${e}> <${Ht}validThrough> "${B(n)}" .`)):i===`literal`&&a.push(`<${e}> <${Vt}valid> "${B(r.value)}" .`),a}function Fn(e){let t=new Set,n=e=>e&&e.type===`uri`&&/^[^<>"{}|^`\\\s]+$/.test(e.value)?e.value:null;for(let r of e||[]){let e=n(r.policy);if(!e)continue;let i=Nn[V(r.kind)]||Nn.set;t.add(`<${e}> a <${i}> .`);let a=V(r.title);if(a){let n=Mn(r.title);t.add(`<${e}> <http://purl.org/dc/terms/title> "${B(a)}"${n} .`)}let o=V(r.issued);o&&t.add(`<${e}> <${Vt}issued> "${B(o)}" .`);for(let n of Pn(e,V(r.validFrom),V(r.validTo),r.valid))t.add(n);let s=n(r.revisionOf);s&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasRevisionOf> <${s}> .`);let c=n(r.offerRef);c&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${c}> .`);let l=n(r.requestRef);l&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${l}> .`);let u=n(r.answeredByRef);u&&t.add(`<${u}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${e}> .`);let d=n(r.assignee);if(d){t.add(`<${e}> <${Bt}assignee> <${d}> .`);let n=V(r.assigneeLabel);if(n){let e=Mn(r.assigneeLabel);t.add(`<${d}> <http://www.w3.org/2000/01/rdf-schema#label> "${B(n)}"${e} .`)}}let f=n(r.container);if(f){t.add(`<${f}> a <${be}> .`),t.add(`<${e}> <${ve}> <${f}> .`);let n=parseInt(V(r.versionCount)||``,10);Number.isFinite(n)&&n>0&&t.add(`<${f}> <${ee}> "${n}" .`);let i=V(r.containerTitle);if(i){let e=Mn(r.containerTitle);t.add(`<${f}> <http://purl.org/dc/terms/title> "${B(i)}"${e} .`)}}}return[...t].join(`
`)+(t.size?`
`:``)}function In(e){let t=new Set,n=e=>e&&e.type===`uri`&&/^[^<>"{}|^`\\\s]+$/.test(e.value)?e.value:null,r=(e,n,r)=>{let i=V(r);if(!i)return;let a=Mn(r);t.add(`<${e}> <${n}> "${B(i)}"${a} .`)};for(let i of e||[]){let e=n(i.container),a=n(i.version);if(!e||!a)continue;let o=Nn[V(i.kind)];if(o){t.add(`<${e}> a <${be}> .`),t.add(`<${e}> <${Vt}type> <${o}> .`),t.add(`<${a}> <${ve}> <${e}> .`),r(e,Vt+`title`,i.containerTitle),r(a,Vt+`title`,i.title);for(let e of Pn(a,V(i.validFrom),V(i.validTo),i.valid))t.add(e);r(a,Vt+`issued`,i.issued)}}return[...t].join(`
`)+(t.size?`
`:``)}var Ln=[];function Rn(e,t){if(t&&t.length)return[...t];if(!e)return[];let n=String(e).replace(/[?#].*$/,``),r=Ln.find(e=>e.match.test(n));return r?[...r.excludeGraphs]:[]}function zn(e,t){let n=String(e||``).trim();if(!n)return`leeg bronadres`;let r=t||(typeof location<`u`&&location.href?location.href:`https://x.invalid/`),i;try{i=new URL(n,r)}catch{return`geen geldig adres: `+n}return i.protocol===`http:`||i.protocol===`https:`?null:`bronadres met een niet-ondersteund schema (${i.protocol}): ${n} — een bron moet via http(s) bereikbaar zijn`}function Bn(e){let t=String(e||``).trimStart().slice(0,200).toLowerCase();return t.startsWith(`<!doctype html`)||t.startsWith(`<html`)||t.startsWith(`<?xml-stylesheet`)}function Vn(e){let t=String(e||``).trim().replace(/[?#].*$/,``);return t?/\.(ttl|turtle|nt|jsonld|json)$/i.test(t)?`data`:/\/(sparql|query)$/i.test(t)?`sparql`:null:null}async function Hn(e,t){let n=await t(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`,Accept:`application/sparql-results+json`},body:`query=ASK%20%7B%7D`});if(!n.ok)return!1;try{let e=await n.json();return typeof e==`object`&&!!e&&typeof e.boolean==`boolean`}catch{return!1}}async function Un(e,t){let n=t||globalThis.fetch,r=zn(e);if(r)return{kind:`error`,url:e,code:`schema`,message:r};let i=Vn(e);if(i===`sparql`)return{kind:`sparql`,url:e};if(i!==`data`)try{if(await Hn(e,n))return{kind:`sparql`,url:e}}catch{}try{let t=await n(e);if(!t.ok)return{kind:`error`,url:e,code:`unsupported`,message:`HTTP `+t.status+` bij `+e};let r=await t.text(),i=ye(e,r);return i===`rdfxml`?{kind:`error`,url:e,code:`unsupported`,message:`formaat niet ondersteund (RDF/XML): `+e}:Bn(r)?{kind:`error`,url:e,code:`unsupported`,message:`dit adres levert een webpagina, geen RDF: `+e}:{kind:`data`,url:e,content:r,format:i}}catch(t){return{kind:`error`,url:e,code:`unreachable`,message:`bron niet bereikbaar (CORS of offline?): `+e+` — `+t.message}}}var Wn=ne,Gn=ye,Kn=Un,qn=l,Jn=Rt,Yn=t,Xn=_,Zn=It,Qn=Lt,$n=te,er=re,tr=le,nr=s,rr=pe,ir=ce,ar=u,or=ae,sr=d,cr=60,lr=10,ur=g,dr=f,fr=y,H=_e,pr=o,mr=m,hr=i,gr=4,_r=F,vr=Gt,yr=rn,br=hn,xr=gn,Sr=bn,Cr=En,wr=Dn,Tr=jn,Er=kn,Dr=xn,Or=Fn,kr=In,Ar=pn,jr=mn,Mr=Rn,Nr=c,Pr=a,Fr=`data/`,Ir=[`generiek/1-generiek-drietraps.ttl`,`generiek/7-dekking-generiek.ttl`,`generiek/archief-partof.ttl`,`generiek/keten-offer-request-agreement.ttl`,`vlierdam/vocabulaire.ttl`,`vlierdam/velden.ttl`,`vlierdam/beleid.ttl`,`vlierdam/openftv.ttl`];function Lr(){return v()}function Rr(){return`?`+Ir.map(e=>`src=${encodeURIComponent(Fr+e)}`).join(`&`)}function zr(e){let t=String(e||``);return Lr().find(e=>t===`data/`+e||t.endsWith(`/`+e))||null}var{DataFactory:Br,Store:Vr,Parser:Hr}=h,{namedNode:U}=Br,W=`http://www.w3.org/ns/shacl#`,Ur=`http://datashapes.org/dash#`,Wr=`http://www.w3.org/ns/shacl-ui/`,Gr=`http://www.w3.org/1999/02/22-rdf-syntax-ns#`,Kr=`http://www.w3.org/2000/01/rdf-schema#`,qr=`http://www.w3.org/2004/02/skos/core#`,Jr=(e,t,n)=>e.getQuads(t,U(n),null,null).map(e=>e.object),G=(e,t,n)=>Jr(e,t,n)[0]||null,Yr=e=>!!e&&e.termType===`Literal`;function Xr(e,t,n){let r=G(e,t,Ur+n)||G(e,t,Wr+n);return!r||r.termType!==`NamedNode`?null:d(r.value).replace(/^IRIViewer$/,`URIViewer`)}function Zr(e,t){let n=G(e,t,W+`path`),r=null,i=!1;if(n&&n.termType===`NamedNode`)r=n.value;else if(n){let t=G(e,n,W+`inversePath`);t&&t.termType===`NamedNode`&&(r=t.value,i=!0)}let a=G(e,t,W+`order`),o=a&&Number.isFinite(parseFloat(a.value))?parseFloat(a.value):null,s=G(e,t,W+`group`);return{path:r,inverse:i,names:Jr(e,t,W+`name`).filter(Yr),descriptions:Jr(e,t,W+`description`).filter(Yr),order:o,group:s&&s.termType===`NamedNode`?s.value:null,pattern:(G(e,t,W+`pattern`)||{}).value||null,viewer:Xr(e,t,`viewer`),role:Xr(e,t,`propertyRole`)}}function Qr(e){let t=new Set,n=[];for(let r of e.getQuads(null,U(Gr+`type`),U(W+`NodeShape`),null)){let i=r.subject.value;if(t.has(i))continue;t.add(i);let a=G(e,r.subject,W+`targetClass`);a&&a.termType===`NamedNode`&&n.push({iri:i,store:e,targetClass:a.value,properties:Jr(e,r.subject,W+`property`).map(t=>Zr(e,t))})}return n}function $r(e,t){let n=new Set([t]),r=!0;for(;r;){r=!1;for(let t of e.getQuads(null,U(Kr+`subClassOf`),null,null))n.has(t.object.value)&&!n.has(t.subject.value)&&(n.add(t.subject.value),r=!0)}return n}var ei=[`name`,`description`,`order`,`group`];function ti(e){return e.properties.some(e=>e.viewer||e.role||ei.some(t=>t===`name`?e.names.length:t===`description`?e.descriptions.length:e[t]!==null))}var ni=ti;function ri(e,t,n,r=[]){let i=typeof t==`string`?U(t):t,a=new Set(Jr(e,i,Gr+`type`).filter(e=>e.termType===`NamedNode`).map(e=>e.value));if(!a.size)return null;let o=[],s=new Set;for(let e of n)s.add(e.targetClass);for(let t of[...n,...r.filter(e=>!s.has(e.targetClass))]){if(a.has(t.targetClass)){o.push([0,+!ni(t),t]);continue}let n=$r(e,t.targetClass);[...a].some(e=>n.has(e))&&o.push([1,+!ni(t),t])}return o.length?(o.sort((e,t)=>e[0]-t[0]||e[1]-t[1]),o[0][2]):null}function ii(e,t,n=[]){let r=new Set;for(let e of t)r.add(e.targetClass);let i=[...t,...n.filter(e=>!r.has(e.targetClass))],a=new Map;return i.forEach((t,n)=>{let r=+!ni(t),i=(e,i)=>{let o=a.get(e);(!o||i<o.rank||i===o.rank&&r<o.formRank)&&a.set(e,{rank:i,formRank:r,idx:n,shape:t})};i(t.targetClass,0);for(let n of $r(e,t.targetClass))n!==t.targetClass&&i(n,1)}),a}function ai(e,t,n){if(!n||!n.size)return null;let r=typeof t==`string`?U(t):t;if(!r)return null;let i=null;for(let t of e.getQuads(r,U(Gr+`type`),null,null)){if(t.object.termType!==`NamedNode`)continue;let e=n.get(t.object.value);e&&(!i||e.rank<i.rank||e.rank===i.rank&&e.formRank<i.formRank||e.rank===i.rank&&e.formRank===i.formRank&&e.idx<i.idx)&&(i=e)}return i?i.shape:null}function oi(e,t,n){if(!n)return[];let r=typeof t==`string`?U(t):t;return r&&n.properties.filter(e=>e.role===`KeyInfoRole`).sort((e,t)=>(e.order??1/0)-(t.order??1/0)).map(t=>_i(e,r,t)).find(e=>e.length)||[]}function si(e,t){if(!t||!t.targetClass)return null;let n=U(t.targetClass),r=t.store&&t.store!==e?[e,t.store]:[e],i=e=>{for(let t of r){let r=ue(Jr(t,n,e).filter(Yr));if(r)return r}return null},a=i(qr+`altLabel`),o=i(Kr+`label`)||i(qr+`prefLabel`)||i(`http://purl.org/dc/terms/title`)||d(t.targetClass);return o?{text:a||o,vol:o,afgekort:!!a}:null}function ci(e,t){let n=new Set;for(let e of t)ti(e)&&n.add(e.targetClass);if(!n.size)return n;let r=e.getQuads(null,U(Kr+`subClassOf`),null,null),i=!0;for(;i;){i=!1;for(let e of r)n.has(e.object.value)&&!n.has(e.subject.value)&&(n.add(e.subject.value),i=!0)}return n}function li(e,t,n){if(!n||!n.size)return!1;let r=typeof t==`string`?U(t):t;return r?e.getQuads(r,U(Gr+`type`),null,null).some(e=>e.object.termType===`NamedNode`&&n.has(e.object.value)):!1}function ui(e,t,{skipGraphs:n}={}){let r=new Set,i=new Set;if(!t||!t.size)return{iris:r,blanks:0};let a=n&&n.length?new Set(n):null;for(let n of e.getQuads(null,U(Gr+`type`),null,null))n.object.termType===`NamedNode`&&t.has(n.object.value)&&(a&&n.graph&&a.has(n.graph.value)||(n.subject.termType===`NamedNode`?r:i).add(n.subject.value));return{iris:r,blanks:i.size}}function di(e,t){let n=ui(e,t);return n.iris.size+n.blanks}function fi(e,t,n){return n.path?n.inverse?e.getQuads(null,U(n.path),t,null).map(e=>e.subject):e.getQuads(t,U(n.path),null,null).map(e=>e.object):[]}function pi(e,t){return ue(t.names)||(t.path?se(e,U(t.path)):``)}function mi(e,t){return ue(t.descriptions)||(t.path?ge(e,U(t.path)):``)||null}function hi(e,t){return!t||t.termType!==`NamedNode`?!1:e.countQuads(t,null,null,null)===0}function gi(e,t,n){let r=()=>({kind:`label`,text:se(e,t),iri:t.termType===`NamedNode`?t.value:null,external:hi(e,t)});switch(n.viewer){case`URIViewer`:case`HyperlinkViewer`:return{kind:`link`,text:t.value,iri:t.termType===`NamedNode`?t.value:null};case`LabelViewer`:return r();case`LiteralViewer`:return{kind:`text`,text:t.value,iri:null};default:return t.termType===`NamedNode`?r():{kind:`text`,text:t.value,iri:null}}}function _i(e,t,n){let r=fi(e,t,n);if(!r.length)return[];let i=r.filter(e=>Yr(e)&&e.language);if(i.length){let t=ue(i),a=r.filter(e=>!(Yr(e)&&e.language));return[...t?[{kind:`text`,text:t,iri:null}]:[],...a.map(t=>gi(e,t,n))]}if(n.viewer===`LangStringViewer`){let e=ue(r.filter(Yr));return e?[{kind:`text`,text:e,iri:null}]:[]}let a=[],o=new Set;for(let t of r){let r=gi(e,t,n),i=r.kind+`\0`+r.text;o.has(i)||(o.add(i),a.push(r))}return a}function vi(e,t,n){let r=typeof t==`string`?U(t):t,i=t=>n.properties.filter(e=>e.role===t).sort((e,t)=>(e.order??1/0)-(t.order??1/0)).map(t=>_i(e,r,t)).find(e=>e.length)||[],a=i(`LabelRole`),o=i(`DescriptionRole`),s=a.length?a[0].text:se(e,r),c=new Set([Kr+`label`,`http://www.w3.org/2004/02/skos/core#prefLabel`,`http://purl.org/dc/terms/title`]),l=(e,t)=>!a.length&&!e.inverse&&c.has(e.path)&&t.length===1&&t[0].text===s,u=n.store||e,d=new Map,f=[];for(let t of n.properties){if(t.role===`LabelRole`||t.role===`DescriptionRole`||t.role===`KeyInfoRole`||!t.path)continue;let n=_i(e,r,t);if(l(t,n))continue;let i={kind:`row`,label:pi(e,t),description:mi(e,t),path:t.path,inverse:t.inverse,pattern:t.pattern,viewer:t.viewer,values:n,order:t.order};if(t.group){let e=d.get(t.group);if(!e){let n=G(u,U(t.group),W+`order`);e={kind:`group`,label:se(u,U(t.group)),rows:[],order:n&&Number.isFinite(parseFloat(n.value))?parseFloat(n.value):null},d.set(t.group,e),f.push(e)}e.rows.push(i)}else f.push(i)}let p=e=>e.map((e,t)=>[e,t]).sort((e,t)=>(e[0].order??1/0)-(t[0].order??1/0)||e[1]-t[1]).map(([e])=>e);for(let e of d.values())e.rows=p(e.rows).filter(e=>e.values.length);let m=p(f).filter(e=>e.kind===`group`?e.rows.length:e.values.length);return{shape:n.iri,title:s,keyInfo:i(`KeyInfoRole`),description:o.length?o[0].text:null,blocks:m}}function yi(e,t){if(!e||!t)return e;let n=e=>e.iri!==t,r=e=>{let t=e.values.filter(n);return t.length===e.values.length?e:{...e,values:t}},i=[],a=!1;for(let t of e.blocks){if(t.kind===`group`){let e=t.rows.map(r).filter(e=>e.values.length),n=e.length===t.rows.length&&e.every((e,n)=>e===t.rows[n]);n||(a=!0),e.length&&i.push(n?t:{...t,rows:e});continue}let e=r(t);e!==t&&(a=!0),e.values.length&&i.push(e)}return a?{...e,blocks:i}:e}var bi=null,xi=null;function Si(e=void 0){let t=e||ie(),n=t.length+`\0`+t.join(`\0`);if(bi&&xi===n)return bi;let r=new Vr;for(let e of t)r.addQuads(new Hr().parse(e));return xi=n,bi=Qr(r),bi}var[Ci,wi]=k(null),[Ti,K]=k(`leeg`),[Ei,Di]=k([]),[Oi,ki]=k([]),[Ai,ji]=k(0),[Mi,Ni]=k(null),[Pi,Fi]=k(null),[Ii,Li]=k(null),[Ri,zi]=k(null),[q,Bi]=k(null),[Vi,J]=k(0),[Y,Hi]=k(null),[Ui,Wi]=k(!1),[Gi,Ki]=k(null),[qi,Ji]=k(!1),[Yi,Xi]=k(null),[Zi,Qi]=k(`load.sources`),[$i,ea]=k(null),X=0,Z=Promise.resolve(),ta=null,na=null,Q=[],ra,ia=[],aa=[],oa=e=>ia.length?[...ia,...e]:e,sa=e=>aa.length?[...aa,...e]:e;function ca(e){Hi(e),Q=Mr(e,ra)}function la(e){let t=[...e.src.map(e=>({name:e,url:e,detecteer:!0})),...(e.ttl||[]).map(e=>({name:e,url:e}))],n=new Set,r=t.filter(e=>!n.has(e.url)&&!!n.add(e.url));if(!r.length)return[];let i=new Set(r.map(e=>zr(e.url)).filter(Boolean));return[...r,...Lr().filter(e=>!i.has(e)).map(e=>({name:e,url:Fr+e,stil:!0}))]}async function ua(e){let t=[],n=[],r=[],i=await Promise.all(e.map(async({name:e,url:t,detecteer:n,stil:r})=>{if(n){let n=await Kn(t);return n.kind===`sparql`?{endpoint:n.url}:n.kind===`data`?{source:{name:e,url:t,content:n.content,format:n.format}}:r?{}:{error:{url:t,message:n.message}}}try{let n=await fetch(t);if(!n.ok)throw Error(`HTTP ${n.status}`);let r=await n.text();return{source:{name:e,url:t,content:r,format:Gn(t,r)}}}catch(e){return r?{}:{error:{url:t,message:e instanceof Error?e.message:String(e)}}}}));for(let e of i)e.source?t.push(e.source):e.endpoint?r.push(e.endpoint):e.error&&n.push(e.error);return{sources:t,errors:n,endpoints:r}}async function da(e,t){try{let n=Zn(),r=()=>{};return Z=new Promise(e=>{r=e}),{bericht:await Jn(e,{setScope:t.setScope,lang:t.lang,onStore:e=>{if(!e){r();return}Qn(n,e).then(()=>{Bi(()=>n),J(e=>e+1),r()})}}),motor:`worker`}}catch{let t=qn(e);return Bi(()=>t.store??null),J(e=>e+1),Z=Promise.resolve(),{bericht:t,motor:`hoofddraad`}}}function fa(e,t){if(!e)return null;if(t.policy)return rr(e,t.policy)?.nav??null;let n=q();return!t.set||!n?null:nr(e,n,t.set)?.nav??null}var pa=()=>({set:ta,policy:na});async function ma(e={}){let t=X;if(!Ci()||(e.setScope!==void 0&&(ta=e.setScope),e.policyScope!==void 0&&(na=e.policyScope),await Z,t!==X))return;let n=q();if(!n)return;let r=$n(n),i=tr(r),a=pa();wi(r),Fi(()=>i),Li(()=>fa(i,a))}var[ha,ga]=k([]);function _a(){let e=q();if(!e||!ha().length)return!1;for(let t of ha())fr(e,t.ttl,`ttl`,H({url:t.ep},0));return J(e=>e+1),!0}async function va(e,t,n,r){let{bericht:i,motor:a}=await da(t,r);if(e!==X)return!1;ki(t),wi(i.model||null),Fi(()=>i.nav??null);let o=i.scopedNav!==void 0&&!r.policyScope?i.scopedNav:fa(i.nav??null,{set:r.setScope,policy:r.policyScope});Li(()=>o);let s=r.policyScope?`policy`:r.setScope?`set`:null;return zi(s&&!o?s:null),ji(i.quadCount||0),Ni(a),Di([...n,...i.errors||[]]),K(i.model?`klaar`:`fout`),await Z,e===X&&_a()&&Ha(),!!i.model}function ya(e,t){e===X&&(Di(sa([t])),K(`fout`))}async function ba(e,t,n){let r=await ua(t);if(e!==X)return;r.endpoints.length&&ca(r.endpoints[0]);let i=r.sources.filter(e=>!zr(e.url)),a=Y();if(!i.length&&a){Qi(`load.queryEndpointAt`),Wi(!0),await Fa(e,a,n.policyScope,n);return}if(!i.length){ki([]),wi(null),ji(0),Ni(null),Fi(null),Li(null),Di(r.errors),K(`fout`);return}a&&Wi(!0);let o=await co(r.sources);ia=o.list,aa=o.error?[o.error,...r.errors]:r.errors,await va(e,ia,aa,n),e===X&&a&&await Fa(e,a,n.policyScope,n)}async function xa(e,t,n){try{let r=await fetch(t);if(!r.ok)throw Error(`HTTP ${r.status}`);let i=await r.text();if(e!==X)return;let a=await co([{name:t,url:t,content:i,format:Gn(t,i)}]);await va(e,a.list,a.error?[a.error]:[],n)}catch(n){ya(e,{url:t,message:Wn(`err.scopeFetch`,{iri:t,msg:n instanceof Error?n.message:String(n)})})}}async function Sa(e){try{return await _r(e,yr())}catch(t){if(!Ar(t))throw t;try{let t=await jr(e);return Ji(!0),t}catch{throw t}}}async function Ca(e,t,n){let r=!1;try{let i=await _r(t,br());if(e!==X)return;i.length&&(Ki(`eerste`),r=await va(e,oa([{name:`${t} (eerste beeld, ${i.length} rijen)`,url:t,content:Or(i),format:`ttl`,fromSparql:!0}]),sa([]),n),r&&K(`laden`))}catch{Ki(null)}if(e===X)try{let[r,i]=await Promise.all([Sa(t),_r(t,xr()).catch(()=>[])]);if(e!==X)return;Ki(null);let a=Or(r)+kr(i);if(await va(e,oa([{name:`${t} (policylijst, ${r.length} rijen`+(i.length?` + ${i.length} versierijen`:``)+`)`,url:t,content:a,format:`ttl`,fromSparql:!0}]),sa([]),n),e!==X)return;await Za(e)}catch(n){if(e!==X)return;Ki(null);let i=n instanceof Error?n.message:String(n);Xi(r?`volledigeIndex`:`endpoint`),Di(sa([{url:t,message:i}])),K(`fout`)}}var wa=`urn:odrlvis:formShapes`,Ta=`urn:odrlvis:nodeLabels`,Ea=Qr,Da=Si,Oa=ci,ka=ui,Aa=Yn;function ja(e){return vr(e,Cr({excludeGraphs:Q})).catch(()=>``)}async function Ma(e,t,n){let r=await n;if(e!==X||!r||!r.trim()||(await Z,e!==X))return;let i=q();if(!i)return;ga(e=>[...e,{iri:wa,ttl:r,ep:t}]),fr(i,r,`ttl`,H({url:t},0)),J(e=>e+1);let a=Oa(i,[...Ea(i),...Da()]);await Promise.all([Pa(e,t,i,a),Na(e,t,i,a)])}async function Na(e,t,n,r){try{let i=Tr([...ka(n,r).iris].filter(e=>!Aa(n,e)),{excludeGraphs:Q});if(!i)return;let a=await vr(t,i);if(e!==X||!a||!a.trim()||(await Z,e!==X))return;ga(e=>[...e,{iri:Ta,ttl:a,ep:t}]);let o=q();if(!o)return;fr(o,a,`ttl`,H({url:t},0)),J(e=>e+1),Ha()}catch{}}async function Pa(e,t,n,r){try{let i=ka(n,r,{skipGraphs:[String(H({url:t},0))]}),a=Er(r,{excludeGraphs:Q,excludeNodes:i.iris});if(!a)return;let o=await _r(t,a);if(e!==X)return;let s=parseInt(o[0]&&o[0].n&&o[0].n.value||``,10);if(!Number.isFinite(s))return;let c=s+i.iris.size+i.blanks;c>0&&ea(c)}catch{}}async function Fa(e,t,n,r){let i=ja(t);try{if(n){let i=await vr(t,Sr(n,{excludeGraphs:Q}));if(e!==X)return;await va(e,oa([{name:`${t} (policy-detail)`,url:t,content:i,format:`ttl`,fromSparql:!0}]),sa([]),r);return}await Ca(e,t,r)}catch(n){Xi(`endpoint`),ya(e,{url:t,message:n instanceof Error?n.message:String(n)})}finally{await Ma(e,t,i)}}function Ia(e){let t=++X,n=la({src:e.src||[],ttl:e.ttl||[],sparql:e.sparql??null,scope:e.policyScope??e.setScope??null}),r=e.setScope??null,i=e.policyScope??null,a=e.sparql||null,o={setScope:r,policyScope:i,lang:e.lang??oe()};if(ta=r,na=i,ra=e.excludeGraphs,Bi(null),Z=Promise.resolve(),Di([]),ia=[],aa=[],ca(a),Wi(!1),Ki(null),Xi(null),Ji(!1),ga([]),Qa.clear(),La.clear(),Ra.clear(),eo.clear(),ea(null),!n.length&&!a&&!(i||r)){wi(null),ki([]),ji(0),Ni(null),Fi(null),Li(null),K(`leeg`);return}if(K(`laden`),n.length){Qi(`load.sources`),ba(t,n,o);return}if(a){Qi(`load.queryEndpointAt`),Wi(!0),Fa(t,a,i,o);return}Qi(`load.source`),xa(t,i||r,o)}var La=new Set,Ra=new Map;function za(e){return!Y()||!e||!e.iri||e.anon||e.stub||La.has(e.iri)?!1:!(e.permissions&&e.permissions.length||e.prohibitions&&e.prohibitions.length||e.obligations&&e.obligations.length)}async function Ba(e,t={}){let n=Y();if(!e||!n||La.has(e))return!1;let r=Ra.get(e);if(r)return r;let i=X,a=(async()=>{let r=await vr(n,Sr(e,{excludeGraphs:Q}));if(await Z,i!==X)return!1;let a=q();if(!a)throw Error(Wn(`load.graph`));return ga(t=>[...t,{iri:e,ttl:r,ep:n}]),fr(a,r,`ttl`,H({url:n},0)),La.add(e),J(e=>e+1),t.rebuildModel!==!1&&Ha(),!0})();Ra.set(e,a);try{return await a}finally{Ra.delete(e)}}async function Va(e){let t=[...new Set(e.filter(Boolean))];if(!t.length||!Y())return!1;let n=X,r=await Promise.all(t.map(e=>Ba(e,{rebuildModel:!1})));return n===X&&(r.some(Boolean)&&Ha(),r.some(Boolean))}function Ha(){let e=q();if(!e)return;let t=$n(e),n=tr(t);wi(t),Fi(()=>n),Li(()=>fa(n,pa()))}function Ua(e){let t=new Set;for(let n of[e.offers,e.agreements,e.sets])for(let e of n||[])e.iri&&!e.anon&&t.add(e.iri);return t}var Wa=(e,t)=>e.size===t.size&&[...e].every(e=>t.has(e));function Ga(e,t){if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t))return e.length===t.length&&e.every((e,n)=>Ga(e,t[n]));if(!e||!t||typeof e!=`object`||typeof t!=`object`)return!1;let n=e,r=t,i=Object.keys(n);return i.length===Object.keys(r).length&&i.every(e=>Ga(n[e],r[e]))}function Ka(e,t){if(!e||!e.length)return t;let n=new Map;for(let t of e)t&&t.id&&n.set(t.id,t);return t.map(e=>{let t=e&&e.id?n.get(e.id):void 0;if(!t)return e;let r=Ka(t.children||null,e.children||[]),i=r===e.children?e:{...e,children:r};return Ga(t,i)?t:i})}function qa(e,t){let n=tr(e),r=Array.isArray(t)&&Array.isArray(n)?Ka(t,n):n;wi(e),Fi(()=>r),Li(()=>fa(r,pa()))}function Ja(e,t){t&&console.warn(`corpus: full rebuild after a mutation — ${e}`);let n=q();return n&&(qa($n(n),Pi()),J(e=>e+1)),{modus:`volledig`,policies:[],reden:e}}function Ya(e){let t=q(),n=Ci();if(!t||!n)return{modus:`volledig`,policies:[],reden:`geen graaf of model`};if(![...e.added||[],...e.removed||[]].length)return Ja(`lege delta`,!1);let r=Ua(n),i=er(t,e,r),a=i.policies;if(!a)return Ja(i.reden===`budget`?`the attribution ran out of its node budget`:`mutation outside the known cards`,!0);let o=$n(t,{reuse:n,only:new Set(a)});return Wa(r,Ua(o))?(qa(o,Pi()),J(e=>e+1),{modus:`gericht`,policies:a,reden:``}):Ja(`the set of policies changed`,!0)}var Xa=20;async function Za(e){let t=Ci();if(!Y()||!t)return;let n=(t.offers||[]).filter(e=>za(e)).slice(0,Xa),r=(t.agreements||[]).filter(e=>za(e)),i=n.length+r.length<=Xa?[...n,...r]:n;i.length&&(await Promise.all(i.map(e=>Ba(e.iri,{rebuildModel:!1}).catch(()=>!1))),(e===void 0||e===X)&&Ha())}var Qa=new Set;async function $a(e){let t=Y();if(!e||!t||Qa.has(e))return!1;Qa.add(e);try{let n=await vr(t,Dr(e,{excludeGraphs:Q}));await Z;let r=q();if(!r)throw Error(Wn(`load.graph`));return!n||!n.trim()?!1:(ga(r=>[...r,{iri:e,ttl:n,ep:t}]),fr(r,n,`ttl`,H({url:t},0)),J(e=>e+1),!0)}catch{return Qa.delete(e),!1}}var eo=new Set;async function to(e){let t=Y();if(!e||!t||eo.has(e))return!1;eo.add(e);try{let n=await vr(t,wr(e,{excludeGraphs:Q}));await Z;let r=q();if(!r)throw Error(Wn(`load.graph`));return!n||!n.trim()?!1:(ga(r=>[...r,{iri:e,ttl:n,ep:t}]),fr(r,n,`ttl`,H({url:t},0)),J(e=>e+1),!0)}catch{return eo.delete(e),!1}}var no=ha;function ro(e){ki(e)}async function io(e){let t=++X,n={setScope:ta,policyScope:na,lang:oe()};if(K(`laden`),Di([]),ia=e.filter(e=>!e.fromSparql),aa=[],!e.length&&Y()){ki([]),ia=[],Qi(`load.queryEndpointAt`),Wi(!0),await Fa(t,Y(),na,n);return}if(!e.length){ki([]),wi(null),ji(0),Ni(null),Fi(null),Li(null),K(`leeg`);return}Qi(`load.sources`),await va(t,e,[],n)}var ao=null;function oo(e){ao=e}var so=8e3;async function co(e){if(!ao)return{list:e,error:null};let t=null,n=Symbol(`preprocessing te traag`);try{let r=new Promise(e=>{t=setTimeout(()=>e(n),so)}),i=await Promise.race([ao(e),r]);return i===n?{list:e,error:{message:Wn(`err.sourceLayerSlow`)}}:{list:i,error:null}}catch{return{list:e,error:null}}finally{t!==null&&clearTimeout(t)}}var lo=Symbol(`store-raw`),uo=Symbol(`store-node`),$=Symbol(`store-has`),fo=Symbol(`store-self`);function po(e){let t=e[S];if(!t&&(Object.defineProperty(e,S,{value:t=new Proxy(e,xo)}),!Array.isArray(e))){let n=Object.keys(e),r=Object.getOwnPropertyDescriptors(e),i=Object.getPrototypeOf(e),a=i!==null&&typeof e==`object`&&!!e&&!Array.isArray(e)&&i!==Object.prototype;if(a){let e=Object.getOwnPropertyDescriptors(i);n.push(...Object.keys(e)),Object.assign(r,e)}for(let i=0,o=n.length;i<o;i++){let o=n[i];a&&o===`constructor`||r[o].get&&Object.defineProperty(e,o,{configurable:!0,enumerable:r[o].enumerable,get:r[o].get.bind(t)})}}return t}function mo(e){let t;return typeof e==`object`&&!!e&&(e[S]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function ho(e,t=new Set){let n,r,i,a;if(n=e!=null&&e[lo])return n;if(!mo(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,a=e.length;n<a;n++)i=e[n],(r=ho(i,t))!==i&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);let n=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let s=0,c=n.length;s<c;s++)a=n[s],!o[a].get&&(i=e[a],(r=ho(i,t))!==i&&(e[a]=r))}return e}function go(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function _o(e,t,n){if(e[t])return e[t];let[r,i]=k(n,{equals:!1,internal:!0});return r.$=i,e[t]=r}function vo(e,t){let n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===S||t===uo?n:(delete n.value,delete n.writable,n.get=()=>e[S][t],n)}function yo(e){He()&&_o(go(e,uo),fo)()}function bo(e){return yo(e),Reflect.ownKeys(e)}var xo={get(e,t,n){if(t===lo)return e;if(t===S)return n;if(t===we)return yo(e),n;let r=go(e,uo),i=r[t],a=i?i():e[t];if(t===uo||t===$||t===`__proto__`)return a;if(!i){let n=Object.getOwnPropertyDescriptor(e,t);He()&&(typeof a!=`function`||Object.prototype.hasOwnProperty.call(e,t))&&!(n&&n.get)&&(a=_o(r,t,a)())}return mo(a)?po(a):a},has(e,t){return t===lo||t===S||t===we||t===uo||t===$||t===`__proto__`||(He()&&_o(go(e,$),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:bo,getOwnPropertyDescriptor:vo};function So(e,t,n,r=!1){if(t===`__proto__`||!r&&e[t]===n)return;let i=e[t],a=e.length;n===void 0?(delete e[t],e[$]&&e[$][t]&&i!==void 0&&e[$][t].$()):(e[t]=n,e[$]&&e[$][t]&&i===void 0&&e[$][t].$());let o=go(e,uo),s;if((s=_o(o,t,i))&&s.$(()=>n),Array.isArray(e)&&e.length!==a){for(let t=e.length;t<a;t++)(s=o[t])&&s.$();(s=_o(o,`length`,a))&&s.$(e.length)}(s=o[fo])&&s.$()}function Co(e,t){let n=Object.keys(t);for(let r=0;r<n.length;r+=1){let i=n[r];wo(i)||So(e,i,t[i])}}function wo(e){return e===`__proto__`||e===`constructor`||e===`prototype`}function To(e,t){if(typeof t==`function`&&(t=t(e)),t=ho(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){let r=t[n];e[n]!==r&&So(e,n,r)}So(e,`length`,r)}else Co(e,t)}function Eo(e,t,n=[]){let r,i=e;if(t.length>1){r=t.shift();let a=typeof r,o=Array.isArray(e);if(a===`string`&&(r===`__proto__`||t.length>1&&wo(r)))return;if(Array.isArray(r)){for(let i=0;i<r.length;i++)Eo(e,[r[i]].concat(t),n);return}if(o&&a===`function`){for(let i=0;i<e.length;i++)r(e[i],i)&&Eo(e,[i].concat(t),n);return}if(o&&a===`object`){let{from:i=0,to:a=e.length-1,by:o=1}=r;for(let r=i;r<=a;r+=o)Eo(e,[r].concat(t),n);return}if(t.length>1){Eo(e[r],t,[r].concat(n));return}i=e[r],n=[r].concat(n)}let a=t[0];typeof a==`function`&&(a=a(i,n),a===i)||(r!==void 0||a!=null)&&(a=ho(a),r===void 0||mo(i)&&mo(a)&&!Array.isArray(a)?Co(i,a):So(e,r,a))}function Do(...[e,t]){let n=ho(e||{}),r=Array.isArray(n),i=po(n);function a(...e){Re(()=>{r&&e.length===1?To(n,e[0]):Eo(n,e)})}return[i,a]}var Oo=[`active`,`terminated`,`future`];function ko(){return{state:`doc`,src:[],ttl:[],sparql:null,policyScope:null,setScope:null,groupBy:null,lang:`nl`,langExpliciet:!1,editMode:!1,excludeGraphs:[],filters:{status:null,offer:``}}}var[Ao,jo]=Do(ko());function Mo(e,t){return Ao.lang,Wn(e,t)}function No(e){if(!e)return null;let t=e.split(`,`).map(e=>e.trim()).filter(e=>Oo.includes(e));return t.length?t:null}function Po(e){let t=new URLSearchParams(e),n=me(t.get(`lang`));he(n),jo({...ko(),state:`doc`,src:t.getAll(`src`),ttl:t.getAll(`ttl`),sparql:t.get(`sparql`)||null,policyScope:t.get(`policy`)||null,setScope:t.get(`set`)||null,groupBy:t.has(`groupby`)?String(t.get(`groupby`)||``).split(`,`).map(e=>e.trim()).filter(Boolean):null,lang:n,langExpliciet:t.has(`lang`),editMode:t.get(`edit`)===`1`,excludeGraphs:t.getAll(`exclude-graph`),filters:{status:No(t.get(`status`)),offer:t.get(`aanbod`)||``}})}var Fo=[`src`,`ttl`,`sparql`,`policy`,`set`,`groupby`,`edit`,`exclude-graph`,`status`,`aanbod`,`lang`];function Io(e,t){let n=new URLSearchParams(t);for(let e of Fo)n.delete(e);for(let t of e.src)n.append(`src`,t);for(let t of e.ttl)n.append(`ttl`,t);e.sparql&&n.set(`sparql`,e.sparql),e.policyScope&&n.set(`policy`,e.policyScope),e.setScope&&n.set(`set`,e.setScope),e.groupBy&&n.set(`groupby`,e.groupBy.join(`,`)),e.editMode&&n.set(`edit`,`1`);for(let t of e.excludeGraphs)n.append(`exclude-graph`,t);return e.filters.status&&n.set(`status`,Oo.filter(t=>e.filters.status.includes(t)).join(`,`)),e.filters.offer&&n.set(`aanbod`,e.filters.offer),e.langExpliciet&&n.set(`lang`,e.lang),n}function Lo(e){if(typeof history>`u`||!history.replaceState)return;let t=Io(e,new URLSearchParams(location.search)).toString();history.replaceState(null,``,t?`?`+t:location.pathname)}function Ro(e){let t={...e};if(`lang`in t&&t.lang){let e=me(t.lang);he(e),t.lang=e,t.langExpliciet=!0}t.policyScope?t.setScope=null:t.setScope&&(t.policyScope=null),t.filters&&t.filters.status&&t.filters.status.length===Oo.length&&(t.filters={...t.filters,status:null}),jo(t),Lo(Ao)}var zo=oe,[Bo,Vo]=k(null),Ho=()=>Bo()?.key??null,Uo=()=>Bo()?.vars;function Wo(e,t){Vo(e?{key:e,vars:t}:null)}var Go=new Set;function Ko(e){return Go.add(e),()=>{Go.delete(e)}}function qo(e){if(!e)return!1;for(let t of[...Go])try{if(t(e))return!0}catch{}return!1}var Jo=()=>new Promise(e=>{setTimeout(e,0)});function Yo(e){if(typeof document>`u`)return null;let t=e.replace(/["\\]/g,`\\$&`);return document.querySelector(`[data-ref="${t}"]`)||document.querySelector(`[data-iri="${t}"]`)}async function Xo(e,t){if(typeof e.scrollIntoView==`function`){e.scrollIntoView({behavior:t?`smooth`:`auto`,block:`start`});for(let t=0;t<12;t+=1){await new Promise(e=>{setTimeout(e,40)});let t=e.getBoundingClientRect().top,n=typeof window<`u`?window.innerHeight:0;if(t>=-4&&t<Math.max(n,1))return}e.scrollIntoView({behavior:`auto`,block:`start`})}}async function Zo(e,t={}){if(!e)return!1;for(let t of[...Go])try{if(t(e))break}catch{}await Jo();let n=Yo(e);if(!n)return!1;for(let e=n;e;e=e.parentElement)e instanceof HTMLDetailsElement&&(e.open=!0);return await Xo(n,!!t.smooth),n.classList&&(n.classList.remove(`ui-flash`),n.offsetWidth,n.classList.add(`ui-flash`),setTimeout(()=>n.classList.remove(`ui-flash`),1800)),!0}export{ii as $,Zi as A,Je as At,Ii as B,Ve as Bt,q as C,Ot as Ct,Yi as D,At as Dt,no as E,Nt as Et,Ai as F,Me as Ft,ci as G,Ye as Gt,Oi as H,b as Ht,ma as I,k as It,li as J,yi as K,oo as L,Et as Lt,Ci as M,A as Mt,Mi as N,Pe as Nt,Gi as O,Re as Ot,Pi as P,Le as Pt,ai as Q,io as R,wt as Rt,to as S,Qt as St,Ya as T,kt as Tt,Si as U,Tt as Ut,ro as V,Be as Vt,di as W,j as Wt,Qr as X,oi as Y,ri as Z,Ui as _,Pr as _t,Uo as a,gr as at,Ba as b,Wn as bt,qo as c,dr as ct,Mo as d,ar as dt,si as et,Ao as f,ir as ft,Y as g,ur as gt,za as h,pr as ht,Ho as i,cr as it,Ti as j,Fe as jt,Ia as k,yt as kt,Wo as l,H as lt,$i as m,hr as mt,zo as n,Rr as nt,Po as o,lr as ot,qi as p,sr as pt,vi as q,Zo as r,zr as rt,Ko as s,or as st,Oo as t,Fr as tt,Ro as u,mr as ut,Ei as v,Nr as vt,Vi as w,jt as wt,Va as x,$t as xt,$a as y,Xn as yt,Ri as z,ze as zt};
//# sourceMappingURL=view-FL4PxNhp.js.map