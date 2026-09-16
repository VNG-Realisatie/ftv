import{C as e,D as t,F as n,G as r,I as i,J as a,K as o,N as s,O as c,P as l,S as u,T as d,W as f,Z as p,_t as m,a as h,at as g,c as _,ct as v,ft as y,gt as ee,h as te,ht as b,it as ne,j as re,k as ie,l as ae,lt as oe,mt as se,ot as ce,pt as le,q as ue,ut as de,v as fe,vt as pe,w as me,y as he,yt as ge}from"./term-DHHeejUK.js";var x={context:void 0,registry:void 0,effects:void 0,done:!1,getContextId(){return _e(this.context.count)},getNextContextId(){return _e(this.context.count++)}};function _e(e){let t=String(e),n=t.length-1;return x.context.id+(n?String.fromCharCode(96+n):``)+t}function S(e){x.context=e}var ve=(e,t)=>e===t,C=Symbol(`solid-proxy`),ye=typeof Proxy==`function`,be=Symbol(`solid-track`),xe={equals:ve},Se=null,Ce=nt,w=1,we=2,Te={owned:null,cleanups:null,context:null,owner:null},Ee={},T=null,E=null,D=null,O=null,k=null,De=0;function Oe(e,t){let n=D,r=T,i=e.length===0,a=t===void 0?r:t,o=i?Te:{owned:null,cleanups:null,context:a?a.context:null,owner:a},s=i?e:()=>e(()=>M(()=>P(o)));T=o,D=null;try{return N(s,!0)}finally{D=n,T=r}}function A(e,t){t=t?Object.assign({},xe,t):xe;let n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0};return[Ye.bind(n),e=>(typeof e==`function`&&(e=E&&E.running&&E.sources.has(n)?e(n.tValue):e(n.value)),Xe(n,e))]}function ke(e,t,n){Ze($e(e,t,!0,w))}function Ae(e,t,n){Ze($e(e,t,!1,w))}function je(e,t,n){Ce=rt;let r=$e(e,t,!1,w),i=qe&&Ge(qe);i&&(r.suspense=i),(!n||!n.render)&&(r.user=!0),k?k.push(r):Ze(r)}function j(e,t,n){n=n?Object.assign({},xe,n):xe;let r=$e(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,Ze(r),Ye.bind(r)}function Me(e){return e&&typeof e==`object`&&`then`in e}function Ne(e,t,n){let r,i,a;typeof t==`function`?(r=e,i=t,a=n||{}):(r=!0,i=e,a=t||{});let o=null,s=Ee,c=null,l=!1,u=!1,d=`initialValue`in a,f=typeof r==`function`&&j(r),p=new Set,[m,h]=(a.storage||A)(a.initialValue),[g,_]=A(void 0),[v,y]=A(void 0,{equals:!1}),[ee,te]=A(d?`ready`:`unresolved`);T&&Le(()=>{for(let e of p.keys())e.decrement();p.clear(),E&&o&&E.promises.delete(o),o=null}),x.context&&(c=x.getNextContextId(),a.ssrLoadFrom===`initial`?s=a.initialValue:x.load&&x.has(c)&&(s=x.load(c)));function b(e,t,n,r){return o===e&&(o=null,r!==void 0&&(d=!0),(e===s||t===s)&&a.onHydrated&&queueMicrotask(()=>a.onHydrated(r,{value:t})),s=Ee,E&&e&&l?(E.promises.delete(e),l=!1,N(()=>{E.running=!0,ne(t,n)},!1)):ne(t,n)),t}function ne(e,t){N(()=>{t===void 0&&h(()=>e),te(t===void 0?d?`ready`:`unresolved`:`errored`),_(t);for(let e of p.keys())e.decrement();p.clear()},!1)}function re(){let e=qe&&Ge(qe),t=m(),n=g();if(n!==void 0&&!o)throw n;return D&&!D.user&&e&&ke(()=>{v(),o&&(e.resolved&&E&&l?E.promises.add(o):p.has(e)||(e.increment(),p.add(e)))}),t}function ie(e=!0){if(e!==!1&&u)return;u=!1;let t=f?f():r;if(l=E&&E.running,t==null||t===!1){b(o,M(m));return}E&&o&&E.promises.delete(o);let n,a=s===Ee?M(()=>{try{return i(t,{value:m(),refetching:e})}catch(e){n=e}}):s;if(n!==void 0){b(o,void 0,st(n),t);return}return Me(a)?(o=a,`v`in a?(a.s===1?b(o,a.v,void 0,t):b(o,void 0,st(a.v),t),a):(u=!0,queueMicrotask(()=>u=!1),N(()=>{te(d?`refreshing`:`pending`),y()},!1),a.then(e=>b(a,e,void 0,t),e=>b(a,void 0,st(e),t)))):(b(o,a,void 0,t),a)}Object.defineProperties(re,{state:{get:()=>ee()},error:{get:()=>g()},loading:{get(){let e=ee();return e===`pending`||e===`refreshing`}},latest:{get(){if(!d)return re();let e=g();if(e&&!o)throw e;return m()}}});let ae=T;return f?ke(()=>(ae=T,ie(!1))):ie(!1),[re,{refetch:e=>Be(ae,()=>ie(e)),mutate:h}]}function Pe(e){return N(e,!1)}function M(e){if(D===null)return e();let t=D;D=null;try{return e()}finally{D=t}}function Fe(e,t,n){let r=Array.isArray(e),i,a=n&&n.defer;return n=>{let o;if(r){o=Array(e.length);for(let t=0;t<e.length;t++)o[t]=e[t]()}else o=e();if(a)return a=!1,n;let s=M(()=>t(o,i,n));return i=o,s}}function Ie(e){je(()=>M(e))}function Le(e){return T===null||(T.cleanups===null?T.cleanups=[e]:T.cleanups.push(e)),e}function Re(){return D}function ze(){return T}function Be(e,t){let n=T,r=D;T=e,D=null;try{return N(t,!0)}catch(e){lt(e)}finally{T=n,D=r}}var[Ve,He]=A(!1);function Ue(e){k.push.apply(k,e),e.length=0}function We(e,t){let n=Symbol(`context`);return{id:n,Provider:dt(n),defaultValue:e}}function Ge(e){let t;return T&&T.context&&(t=T.context[e.id])!==void 0?t:e.defaultValue}function Ke(e){let t=j(e),n=j(()=>ut(t()));return n.toArray=()=>{let e=n();return Array.isArray(e)?e:e==null?[]:[e]},n}var qe;function Je(){return qe||=We()}function Ye(){let e=E&&E.running;if(this.sources&&(e?this.tState:this.state)){if((e?this.tState:this.state)===w)Ze(this);else{let e=O;O=null,N(()=>it(this),!1),O=e}}if(D){let e=this.observers;if(!e||e[e.length-1]!==D){let t=e?e.length:0;D.sources?(D.sources.push(this),D.sourceSlots.push(t)):(D.sources=[this],D.sourceSlots=[t]),e?(e.push(D),this.observerSlots.push(D.sources.length-1)):(this.observers=[D],this.observerSlots=[D.sources.length-1])}}return e&&E.sources.has(this)?this.tValue:this.value}function Xe(e,t,n){let r=E&&E.running&&E.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(r,t)){if(E){let r=E.running;(r||!n&&E.sources.has(e))&&(E.sources.add(e),e.tValue=t),r||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&N(()=>{for(let t=0;t<e.observers.length;t+=1){let n=e.observers[t],r=E&&E.running;r&&E.disposed.has(n)||((r?!n.tState:!n.state)&&(n.pure?O.push(n):k.push(n),n.observers&&at(n)),r?n.tState=w:n.state=w)}if(O.length>1e6)throw O=[],Error()},!1)}return t}function Ze(e){if(!e.fn)return;P(e);let t=De;Qe(e,E&&E.running&&E.sources.has(e)?e.tValue:e.value,t),E&&!E.running&&E.sources.has(e)&&queueMicrotask(()=>{N(()=>{E&&(E.running=!0),D=T=e,Qe(e,e.tValue,t),D=T=null},!1)})}function Qe(e,t,n){let r,i=T,a=D;D=T=e;try{r=e.fn(t)}catch(t){return e.pure&&(E&&E.running?(e.tState=w,e.tOwned&&e.tOwned.forEach(P),e.tOwned=void 0):(e.state=w,e.owned&&e.owned.forEach(P),e.owned=null)),e.updatedAt=n+1,lt(t)}finally{D=a,T=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&`observers`in e?Xe(e,r,!0):E&&E.running&&e.pure?(E.sources.has(e)||(e.value=r),E.sources.add(e),e.tValue=r):e.value=r,e.updatedAt=n)}function $e(e,t,n,r=w,i){let a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:T,context:T?T.context:null,pure:n};return E&&E.running&&(a.state=0,a.tState=r),T===null||T!==Te&&(E&&E.running&&T.pure?T.tOwned?T.tOwned.push(a):T.tOwned=[a]:T.owned?T.owned.push(a):T.owned=[a]),a}function et(e){let t=E&&E.running;if((t?e.tState:e.state)===0)return;if((t?e.tState:e.state)===we)return it(e);if(e.suspense&&M(e.suspense.inFallback))return e.suspense.effects.push(e);let n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<De);){if(t&&E.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let r=n.length-1;r>=0;r--){if(e=n[r],t){let t=e,i=n[r+1];for(;(t=t.owner)&&t!==i;)if(E.disposed.has(t))return}if((t?e.tState:e.state)===w)Ze(e);else if((t?e.tState:e.state)===we){let t=O;O=null,N(()=>it(e,n[0]),!1),O=t}}}function N(e,t){if(O)return e();let n=!1;t||(O=[]),k?n=!0:k=[],De++;try{let t=e();return tt(n),t}catch(e){n||(k=null),O=null,lt(e)}}function tt(e){if(O&&=(nt(O),null),e)return;let t;if(E){if(!E.promises.size&&!E.queue.size){let e=E.sources,n=E.disposed;k.push.apply(k,E.effects),t=E.resolve;for(let e of k)`tState`in e&&(e.state=e.tState),delete e.tState;E=null,N(()=>{for(let e of n)P(e);for(let t of e){if(t.value=t.tValue,t.owned)for(let e=0,n=t.owned.length;e<n;e++)P(t.owned[e]);t.tOwned&&(t.owned=t.tOwned),delete t.tValue,delete t.tOwned,t.tState=0}He(!1)},!1)}else if(E.running){E.running=!1,E.effects.push.apply(E.effects,k),k=null,He(!0);return}}let n=k;k=null,n.length&&N(()=>Ce(n),!1),t&&t()}function nt(e){for(let t=0;t<e.length;t++)et(e[t])}function rt(e){let t,n=0;for(t=0;t<e.length;t++){let r=e[t];r.user?e[n++]=r:et(r)}if(x.context){if(x.count){x.effects||=[],x.effects.push(...e.slice(0,n));return}S()}for(x.effects&&(x.done||!x.count)&&(e=[...x.effects,...e],n+=x.effects.length,delete x.effects),t=0;t<n;t++)et(e[t])}function it(e,t){let n=E&&E.running;n?e.tState=0:e.state=0;for(let r=0;r<e.sources.length;r+=1){let i=e.sources[r];if(i.sources){let e=n?i.tState:i.state;e===w?i!==t&&(!i.updatedAt||i.updatedAt<De)&&et(i):e===we&&it(i,t)}}}function at(e){let t=E&&E.running;for(let n=0;n<e.observers.length;n+=1){let r=e.observers[n];(t?!r.tState:!r.state)&&(t?r.tState=we:r.state=we,r.pure?O.push(r):k.push(r),r.observers&&at(r))}}function P(e){let t;if(e.sources)for(;e.sources.length;){let t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){let e=r.pop(),i=t.observerSlots.pop();n<r.length&&(e.sourceSlots[i]=n,r[n]=e,t.observerSlots[n]=i)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)P(e.tOwned[t]);delete e.tOwned}if(E&&E.running&&e.pure)ot(e,!0);else if(e.owned){for(t=e.owned.length-1;t>=0;t--)P(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}E&&E.running?e.tState=0:e.state=0}function ot(e,t){if(t||(e.tState=0,E.disposed.add(e)),e.owned)for(let t=0;t<e.owned.length;t++)ot(e.owned[t])}function st(e){return e instanceof Error?e:Error(typeof e==`string`?e:`Unknown error`,{cause:e})}function ct(e,t,n){try{for(let n of t)n(e)}catch(e){lt(e,n&&n.owner||null)}}function lt(e,t=T){let n=Se&&t&&t.context&&t.context[Se],r=st(e);if(!n)throw r;k?k.push({fn(){ct(r,n,t)},state:w}):ct(r,n,t)}function ut(e){if(typeof e==`function`&&!e.length)return ut(e());if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++){let r=ut(e[n]);if(Array.isArray(r)){if(r.length<32768)t.push.apply(t,r);else for(let e=0;e<r.length;e++)t.push(r[e])}else t.push(r)}return t}return e}function dt(e,t){return function(t){let n;return Ae(()=>n=M(()=>(T.context={...T.context,[e]:t.value},Ke(()=>t.children))),void 0),n}}var ft=Symbol(`fallback`);function pt(e){for(let t=0;t<e.length;t++)e[t]()}function mt(e,t,n={}){let r=[],i=[],a=[],o=0,s=t.length>1?[]:null;return Le(()=>pt(a)),()=>{let c=e()||[],l=c.length,u,d;return c[be],M(()=>{let e,t,p,m,h,g,_,v,y;if(l===0)o!==0&&(pt(a),a=[],r=[],i=[],o=0,s&&=[]),n.fallback&&(r=[ft],i[0]=Oe(e=>(a[0]=e,n.fallback())),o=1);else if(o===0){for(i=Array(l),d=0;d<l;d++)r[d]=c[d],i[d]=Oe(f);o=l}else{for(p=Array(l),m=Array(l),s&&(h=Array(l)),g=0,_=Math.min(o,l);g<_&&r[g]===c[g];g++);for(_=o-1,v=l-1;_>=g&&v>=g&&r[_]===c[v];_--,v--)p[v]=i[_],m[v]=a[_],s&&(h[v]=s[_]);for(e=new Map,t=Array(v+1),d=v;d>=g;d--)y=c[d],u=e.get(y),t[d]=u===void 0?-1:u,e.set(y,d);for(u=g;u<=_;u++)y=r[u],d=e.get(y),d!==void 0&&d!==-1?(p[d]=i[u],m[d]=a[u],s&&(h[d]=s[u]),d=t[d],e.set(y,d)):a[u]();for(d=g;d<l;d++)d in p?(i[d]=p[d],a[d]=m[d],s&&(s[d]=h[d],s[d](d))):i[d]=Oe(f);i=i.slice(0,o=l),r=c.slice(0)}return i});function f(e){if(a[d]=e,s){let[e,n]=A(d);return s[d]=n,t(c[d],e)}return t(c[d])}}}function ht(e,t){return M(()=>e(t||{}))}function gt(){return!0}var _t={get(e,t,n){return t===C?n:e.get(t)},has(e,t){return t===C||e.has(t)},set:gt,deleteProperty:gt,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:gt,deleteProperty:gt}},ownKeys(e){return e.keys()}};function vt(e){return(e=typeof e==`function`?e():e)?e:{}}function yt(){for(let e=0,t=this.length;e<t;++e){let t=this[e]();if(t!==void 0)return t}}function bt(...e){let t=!1;for(let n=0;n<e.length;n++){let r=e[n];t||=!!r&&C in r,e[n]=typeof r==`function`?(t=!0,j(r)):r}if(ye&&t)return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){let r=vt(e[n])[t];if(r!==void 0)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in vt(e[n]))return!0;return!1},keys(){let t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(vt(e[n])));return[...new Set(t)]}},_t);let n={},r=Object.create(null);for(let t=e.length-1;t>=0;t--){let i=e[t];if(!i)continue;let a=Object.getOwnPropertyNames(i);for(let e=a.length-1;e>=0;e--){let t=a[e];if(t===`__proto__`||t===`constructor`)continue;let o=Object.getOwnPropertyDescriptor(i,t);if(!r[t])r[t]=o.get?{enumerable:!0,configurable:!0,get:yt.bind(n[t]=[o.get.bind(i)])}:o.value===void 0?void 0:o;else{let e=n[t];e&&(o.get?e.push(o.get.bind(i)):o.value!==void 0&&e.push(()=>o.value))}}}let i={},a=Object.keys(r);for(let e=a.length-1;e>=0;e--){let t=a[e],n=r[t];n&&n.get?Object.defineProperty(i,t,n):i[t]=n?n.value:void 0}return i}function xt(e,...t){let n=t.length;if(ye&&C in e){let r=n>1?t.flat():t[0],i=new Set,a=t.map(t=>{let n=t.filter(e=>!i.has(e)&&(i.add(e),!0));return new Proxy({get(t){return n.includes(t)?e[t]:void 0},has(t){return n.includes(t)&&t in e},keys(){return n.filter(t=>t in e)}},_t)});return a.push(new Proxy({get(t){return r.includes(t)?void 0:e[t]},has(t){return!r.includes(t)&&t in e},keys(){return Object.keys(e).filter(e=>!r.includes(e))}},_t)),a}let r=[];for(let e=0;e<=n;e++)r[e]={};for(let i of Object.getOwnPropertyNames(e)){let a=n;for(let e=0;e<t.length;e++)if(t[e].includes(i)){a=e;break}let o=Object.getOwnPropertyDescriptor(e,i);!o.get&&!o.set&&o.enumerable&&o.writable&&o.configurable?r[a][i]=o.value:Object.defineProperty(r[a],i,o)}return r}function St(e){let t,n,r=()=>{if(!n){let r=n=e();r.then(e=>{t=()=>e.default},()=>{n===r&&(n=void 0)})}return n},i=e=>{let n=x.context;if(n){let[e,i]=A();x.count||=0,x.count++,r().then(e=>{!x.done&&S(n),x.count--,i(()=>e.default),S()},e=>{!x.done&&S(n),x.count--,i(()=>()=>{throw e}),S()}),t=e}else if(!t){let[e]=Ne(()=>r().then(e=>e.default));t=e,Le(()=>t=void 0)}let i;return j(()=>(i=t?.())?M(()=>{if(!n||x.done)return i(e);let t=x.context;S(n);let r=i(e);return S(t),r}):``)};return i.preload=()=>r(),i}var Ct=e=>`Stale read from <${e}>.`;function wt(e){let t=`fallback`in e&&{fallback:()=>e.fallback};return j(mt(()=>e.each,e.children,t||void 0))}function Tt(e){let t=e.keyed,n=j(()=>e.when,void 0,void 0),r=t?n:j(n,void 0,{equals:(e,t)=>!e==!t});return j(()=>{let i=r();if(i){let a=e.children;return typeof a==`function`&&a.length>0?M(()=>a(t?i:()=>{if(!M(r))throw Ct(`Show`);return n()})):a}return e.fallback},void 0,void 0)}function Et(e){let t=Ke(()=>e.children),n=j(()=>{let e=t(),n=Array.isArray(e)?e:[e],r=()=>void 0;for(let e=0;e<n.length;e++){let t=e,i=n[e],a=r,o=j(()=>a()?void 0:i.when,void 0,void 0),s=i.keyed?o:j(o,void 0,{equals:(e,t)=>!e==!t});r=()=>a()||(s()?[t,o,i]:void 0)}return r});return j(()=>{let t=n()();if(!t)return e.fallback;let[r,i,a]=t,o=a.children;return typeof o==`function`&&o.length>0?M(()=>o(a.keyed?i():()=>{if(M(n)()?.[0]!==r)throw Ct(`Match`);return i()})):o},void 0,void 0)}function Dt(e){return e}var Ot=We();function kt(e){let t=0,n,r,i,a,o,[s,c]=A(!1),l=Je(),u={increment:()=>{++t===1&&c(!0)},decrement:()=>{--t===0&&c(!1)},inFallback:s,effects:[],resolved:!1},d=ze();if(x.context&&x.load){let e=x.getContextId(),t=x.load(e);if(t&&(typeof t!=`object`||t.s!==1?i=t:x.gather(e)),i&&i!==`$$f`){let[t,n]=A(void 0,{equals:!1});a=t,i.then(()=>{if(x.done)return n();x.gather(e),S(r),n(),S()},e=>{o=e,n()})}}let f=Ge(Ot);f&&(n=f.register(u.inFallback));let p;return Le(()=>p&&p()),ht(l.Provider,{value:u,get children(){return j(()=>{if(o)throw o;if(r=x.context,a){a(),a=void 0;return}r&&i===`$$f`&&S();let t=j(()=>e.children);return j(a=>{let o=u.inFallback(),{showContent:s=!0,showFallback:c=!0}=n?n():{};if((!o||i&&i!==`$$f`)&&s)return u.resolved=!0,p&&p(),p=r=i=void 0,Ue(u.effects),t();if(c)return p?a:Oe(t=>(p=t,r&&=(S({id:r.id+`F`,count:0}),void 0),e.fallback),d)})})}})}var{Store:At,termFromId:jt}=m;function Mt(){return new At}function Nt(e,{termText:t,termOffsets:n,quadTable:r},{chunkSize:i=25e3,onProgress:a=null}={}){let o=n.length-1,s=Array(o);for(let e=0;e<o;e++)s[e]=jt(t.substring(n[e],n[e+1]));let c=e._entityIndex;if(c&&c._termToNewNumericId)for(let e of s)c._termToNewNumericId(e);let l=e=>s[e],u=r.length/4;return new Promise(t=>{let n=0,o=()=>{let s=Math.min(u,n+i);for(;n<s;n++)e.addQuad(l(r[n*4]),l(r[n*4+1]),l(r[n*4+2]),l(r[n*4+3]));a&&a(n,u),n<u?setTimeout(o,0):t(e)};o()})}function Pt(e,{setScope:t=null,lang:n=null,onProgress:r=null,onStore:i=null}={}){return new Promise((a,s)=>{let c;try{c=new Worker(new URL(``+new URL(`model-worker-BkOzcq5T.js`,import.meta.url).href,``+import.meta.url),{type:`module`})}catch(e){s(e);return}let l=!1,u=e=>{c.terminate(),l?i&&i(null):s(Error(e))};c.onerror=e=>u(e&&e.message?e.message:`worker kon niet starten`),c.onmessage=e=>{let t=e.data||{};if(t.type===`progress`){!l&&r&&r(t);return}if(t.type===`model`){l=!0,o(t.prefixes),a(t);return}if(t.type===`store`){c.terminate(),i&&i(t);return}t.type===`error`&&u(t.message)},c.postMessage({sources:e,setScope:t,lang:n})})}var{quad:Ft}=ge,It=`http://www.w3.org/ns/odrl/2/`,Lt=`http://purl.org/dc/terms/`,Rt=`https://schema.org/`,zt=[],F=`PREFIX odrl: <http://www.w3.org/ns/odrl/2/>
PREFIX dct:  <http://purl.org/dc/terms/>
PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX schema: <https://schema.org/>
`;async function Bt(e,t,n,r){let i=await(r||globalThis.fetch)(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`,Accept:n},body:`query=`+encodeURIComponent(t)});if(!i.ok){let e=``;try{e=(await i.text()).slice(0,200)}catch{}throw Error(`SPARQL HTTP ${i.status}${e?` — `+e:``}`)}return i}async function I(e,t,n){let r=await(await Bt(e,t,`application/sparql-results+json`,n)).json();return r&&r.results&&r.results.bindings||[]}async function Vt(e,t,n){return(await Bt(e,t,`text/turtle`,n)).text()}function Ht(e){return!!e&&e.termType===`BlankNode`}function Ut(e,t){let n=[],r=0;for(let t of e){if(Ht(t.subject)||Ht(t.object)){r++;continue}n.push(t)}return r&&console.warn(`SPARQL Update: ${r} ${t}-triple(s) met blank node overgeslagen (DELETE/INSERT DATA staat geen blank nodes toe)`),{kept:n,skipped:r}}var Wt=/^[A-Za-z]+(-[A-Za-z0-9]+)*$/;function Gt(e){if(!Wt.test(String(e)))throw Error(`ongeldige taal-tag voor SPARQL: `+e)}function Kt(e){e&&(e.termType===`NamedNode`?L(e.value):e.termType===`Literal`&&(e.language&&Gt(e.language),e.datatype&&Kt(e.datatype)))}function qt(e){let t=new pe,n=e.map(e=>(Kt(e.subject),Kt(e.predicate),Kt(e.object),Ft(e.subject,e.predicate,e.object)));return t.quadsToString(n)}function Jt({added:e=[],removed:t=[]}={}){let n=Ut(t,`DELETE`),r=Ut(e,`INSERT`),i=[];return n.kept.length&&i.push(`DELETE DATA {
`+qt(n.kept)+`}`),r.kept.length&&i.push(`INSERT DATA {
`+qt(r.kept)+`}`),{query:i.join(`;
`),skipped:n.skipped+r.skipped}}async function Yt(e,t,n){let r=await(n||globalThis.fetch)(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`},body:`update=`+encodeURIComponent(t)});if(!r.ok){let e=``;try{e=(await r.text()).slice(0,200)}catch{}throw Error(`SPARQL update HTTP ${r.status}${e?` — `+e:``}`)}}function L(e){let t=String(e||``);if(!/^[^<>"{}|^`\\\s]+$/.test(t))throw Error(`ongeldige IRI voor SPARQL: `+t);return`<`+t+`>`}function R(e,t){return!t||!t.length?``:`FILTER(${e} NOT IN (${t.map(L).join(`, `)}))`}var Xt=b.find(e=>e.id===`prov`);function z(e,t){let n=[...Xt.memberPreds.map(n=>`{ ${e} <${n}> ${t} }`),...Xt.inverseMemberPreds.map(n=>`{ ${t} <${n}> ${e} }`)];return n.length===1?n[0].replace(/^\{ | \}$/g,``)+` .`:n.join(` UNION `)}var Zt=ee.map(e=>`<${e}>`).join(`|`),Qt=(e,t,n,r)=>`  OPTIONAL { ${e} schema:validFrom ${n}_s }
  OPTIONAL { ${e} schema:validThrough ${r}_s }
  OPTIONAL {
    ${e} dct:valid ${t} .
    OPTIONAL { ${t} dcat:startDate ${n}_n }
    OPTIONAL { ${t} dcat:endDate ${r}_n }
  }
  BIND(COALESCE(${n}_s, ${n}_n) AS ${n})
  BIND(COALESCE(${r}_s, ${r}_n) AS ${r})`;function $t(){return`${F}
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
            { ?v ${Zt} ?vd }
          } GROUP BY ?cX }
        ${z(`?cX`,`?policy`)}
        OPTIONAL { ?cX dct:title ?ctX }
      } GROUP BY ?policy }
  }
  # Datering van de versie: dct:issued (de datum die de versienavigator toont)
  # en de geldingsperiode. Zonder deze takken stond in lijstmodus overal een
  # "—" in de chip. Meer dateringsvormen kent het profiel niet.
  OPTIONAL { ?policy dct:issued ?iss }
${Qt(`?policy`,`?vn`,`?vf`,`?vt`)}
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
`}function en(){return`${F}
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
`}function tn(){return`${F}
SELECT ?container ?policy ?containerTitle
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ${z(`?container`,`?policy`)}
  FILTER(isIRI(?container) && isIRI(?policy))
  OPTIONAL { ?container dct:title ?containerTitle }
}
`}function nn(){return`${F}
SELECT ?container (COUNT(DISTINCT ?v) AS ?n)
WHERE {
  ${z(`?container`,`?v`)}
  FILTER(isIRI(?container) && isIRI(?v))
  { VALUES ?vt { odrl:Set odrl:Offer odrl:Agreement odrl:Request } ?v a ?vt }
  UNION
  { ?v ${Zt} ?vd }
}
GROUP BY ?container
`}function rn(){return`${F}
SELECT ?policy ?issued ?validFrom ?validTo ?valid ?revisionOf
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  FILTER(isIRI(?policy))
  OPTIONAL { ?policy dct:issued ?issued }
${Qt(`?policy`,`?valid`,`?validFrom`,`?validTo`)}
  OPTIONAL { ?policy prov:wasRevisionOf ?revisionOf }
}
`}function an(){return`${F}
SELECT DISTINCT ?policy ?offer
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?offer .
  ?offer a odrl:Offer .
  FILTER(isIRI(?policy))
}
`}function on(){return`${F}
SELECT DISTINCT ?policy ?request
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?request .
  ?request a odrl:Request .
  FILTER(isIRI(?policy))
}
`}function sn(){return`${F}
SELECT DISTINCT ?policy ?agreement
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?agreement prov:wasDerivedFrom ?policy .
  ?agreement a odrl:Agreement .
  FILTER(isIRI(?policy))
}
`}function cn(e,t,n,r,i,{lang:a=null,requestRefs:o=[],answeredByRefs:s=[]}={}){let c=e=>e?e.value:null,l=a||ne(),u=(e,t)=>!e||g(t[`xml:lang`]||``,l)<g(e[`xml:lang`]||``,l),d=new Map;for(let e of t||[]){let t=c(e&&e.policy);if(!t||!e.container)continue;let n=d.get(t);n||(n={container:e.container,containerTitle:null},d.set(t,n)),e.containerTitle&&e.container.value===n.container.value&&u(n.containerTitle,e.containerTitle)&&(n.containerTitle=e.containerTitle)}let f=new Map;for(let e of n||[]){let t=c(e&&e.container);t&&e.n&&(f.has(t)||f.set(t,e.n))}let p=[`issued`,`validFrom`,`validTo`,`valid`,`revisionOf`],m=new Map;for(let e of r||[]){let t=c(e&&e.policy);if(!t)continue;let n=m.get(t);n||(n={},m.set(t,n));for(let t of p)!n[t]&&e[t]&&(n[t]=e[t])}let h=new Map;for(let e of i||[]){let t=c(e&&e.policy);t&&e.offer&&(h.has(t)||h.set(t,e.offer))}let _=new Map;for(let e of o||[]){let t=c(e&&e.policy);t&&e.request&&(_.has(t)||_.set(t,e.request))}let v=new Map;for(let e of s||[]){let t=c(e&&e.policy);t&&e.agreement&&(v.has(t)||v.set(t,e.agreement))}let y=[],ee=new Map;for(let t of e||[]){if(!t||!t.policy)continue;let e=t.policy.value+`\0`+(c(t.kind)||``),n=ee.get(e);n||(n={policy:t.policy},t.kind&&(n.kind=t.kind),ee.set(e,n),y.push(n)),t.title&&u(n.title,t.title)&&(n.title=t.title),!n.assignee&&t.assignee?(n.assignee=t.assignee,t.assigneeLabel&&(n.assigneeLabel=t.assigneeLabel)):n.assignee&&t.assigneeLabel&&t.assignee&&t.assignee.value===n.assignee.value&&u(n.assigneeLabel,t.assigneeLabel)&&(n.assigneeLabel=t.assigneeLabel)}for(let e of y){let t=e.policy.value,n=d.get(t);if(n){e.container=n.container,n.containerTitle&&(e.containerTitle=n.containerTitle);let t=f.get(n.container.value);t&&(e.versionCount=t)}let r=m.get(t);if(r)for(let t of p)r[t]&&(e[t]=r[t]);let i=h.get(t);i&&(e.offerRef=i);let a=_.get(t);a&&(e.requestRef=a);let o=v.get(t);o&&(e.answeredByRef=o)}return y}function ln(e){let t=String(e&&e.message||e||``);return/SPARQL HTTP 5\d\d/.test(t)||/\btimed out\b|\btimeout\b/i.test(t)}async function un(e,t,{lang:n=null}={}){let[r,i,a,o,s,c,l]=await Promise.all([I(e,en(),t),I(e,tn(),t),I(e,nn(),t),I(e,rn(),t),I(e,an(),t),I(e,on(),t),I(e,sn(),t)]);return cn(r,i,a,o,s,{lang:n,requestRefs:c,answeredByRefs:l})}function dn({limitPerKind:e=60}={}){let t=Math.max(1,e|0),n=(e,n)=>`  {
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
`}function fn(){return`${F}
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
${Qt(`?version`,`?vn`,`?vf`,`?vt`)}
  OPTIONAL { ?version dct:issued ?iss }
}
GROUP BY ?container ?kind ?version
`}var pn=`http://www.w3.org/ns/odrl/2/`,mn=(e,t)=>`${e} rdf:type ?dt${t} .
      FILTER(!STRSTARTS(STR(?dt${t}), "${pn}"))`,B=`(odrl:permission|odrl:prohibition|odrl:obligation|odrl:duty|odrl:remedy|odrl:consequence|odrl:constraint|odrl:refinement|odrl:action|odrl:target|odrl:rightOperand|dct:valid|odrl:and|odrl:or|odrl:xone|odrl:andSequence|rdf:first|rdf:rest)*`,hn=`rdf:type, dct:title, dct:issued, schema:validFrom, schema:validThrough, dct:valid, odrl:uid, prov:wasRevisionOf, prov:specializationOf, prov:wasDerivedFrom`;function gn(e,{excludeGraphs:t=zt}={}){let n=L(e),r=(e,r,i,a)=>t&&t.length?`${n} ${B} ${e} .
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
    # 1. sluiting van de policy zelf
    ${r(`?s`,`?p`,`?o`,`?g1`)}
  } UNION {
    # 2. temporele container (met lidmaatschap naar alle versies)
    ${z(`?c`,n)}
    ?c ?cp ?co .
    # Blanke objecten blijven buiten beeld — een container is een platte knoop —
    # MET één uitzondering: een niet-gemigreerde graaf kan zijn geldingsperiode
    # nog als blanke dct:PeriodOfTime-knoop dragen, en die draagt dan de
    # datering van het CG-documentpatroon. De eigen vorm (schema:validFrom/
    # validThrough) bestaat uit platte literals en komt hier gewoon mee.
    FILTER(!isBlank(?co) || ?cp = dct:valid)
  } UNION {
    # 3. zusterversies: metadata voor de versie-kiezer (incl. vervallen)
    ${z(`?c2`,n)}
    ${z(`?c2`,`?v`)}
    ?v ?vp ?vo .
    FILTER(?vp IN (${hn}))
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
      ${z(`?cp1`,n)}
      ?cp1 dct:valid ?x .
    } UNION {
      ${z(`?cp2`,n)}
      ${z(`?cp2`,`?vp1`)}
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
`}function _n(e,{excludeGraphs:t=zt}={}){let n=L(e),r=(e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
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
        ${mn(`?an`,`d`)}
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
      ${mn(`?up`,`e`)}
      ${r(`?g5`,`?up ?upp ?upl .
      FILTER(?upp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    }
  }
}
`}var vn=`PREFIX sh:   <http://www.w3.org/ns/shacl#>
PREFIX dash: <http://datashapes.org/dash#>
PREFIX shui: <http://www.w3.org/ns/shacl-ui/>
`,yn=`(sh:name|sh:description|sh:order|sh:group|dash:viewer|dash:propertyRole|shui:viewer|shui:propertyRole)`,bn=`(sh:property|sh:group)*`,xn=`rdfs:label, skos:prefLabel, dct:title, skos:definition, dct:description, rdfs:comment`;function Sn({excludeGraphs:e=zt,limit:t=200}={}){let n=Math.max(1,t|0),r=(t,n)=>e&&e.length?`GRAPH ${t} { ${n} }
    ${R(t,e)}`:n,i=`{ SELECT DISTINCT ?shape ?tc WHERE {
      ?shape a sh:NodeShape .
      ?shape sh:targetClass ?tc .
      ?shape sh:property/${yn} ?ann .
      FILTER(isIRI(?tc))
    } LIMIT ${n} }`;return`${F}${vn}
CONSTRUCT {
  ?s ?p ?o .
  ?pad ?lp ?ll .
  ?sub rdfs:subClassOf ?super .
}
WHERE {
  {
    # 1+2. de shape zelf, zijn property-shapes en hun PropertyGroups
    ${i}
    ?shape ${bn} ?s .
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
    FILTER(?lp IN (${xn}))`)}
  } UNION {
    # 4. de subklasse-ketens die bij een doelklasse uitkomen
    ${i}
    ?sub rdfs:subClassOf+ ?tc .
    ?sub rdfs:subClassOf ?super .
  }
}
`}function Cn(e,{limit:t=400,excludeGraphs:n=zt}={}){let r=L(e),i=Math.max(1,t|0),a=(e,t)=>n&&n.length?`GRAPH ${e} { ${t} }
    ${R(e,n)}`:t;return`${F}
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
`}var wn=1e3;function Tn(e,{excludeGraphs:t=zt,max:n=200,excludeNodes:r=null,maxExclude:i=wn}={}){let a=[...e||[]].slice(0,Math.max(1,n|0));if(!a.length)return null;let o=[...r||[]];return o.length>Math.max(0,i|0)?null:`${F}
SELECT (COUNT(DISTINCT ?knoop) AS ?n)
WHERE {
  VALUES ?klasse { ${a.map(L).join(` `)} }
  ${((e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
  ${R(e,t)}`:n)(`?g1`,`?knoop rdf:type ?klasse .`)}${o.length?`
  FILTER(?knoop NOT IN (${o.map(L).join(`, `)}))`:``}
}
`}var En=1e3;function Dn(e,{excludeGraphs:t=zt,max:n=En}={}){let r=[...e||[]];return!r.length||r.length>Math.max(1,n|0)?null:`${F}
CONSTRUCT { ?n ?lp ?lv }
WHERE {
  VALUES ?n { ${r.map(L).join(` `)} }
  ${((e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
  ${R(e,t)}`:n)(`?g1`,`?n ?lp ?lv .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title))`)}
}
`}function V(e){return String(e).replace(/\\/g,`\\\\`).replace(/"/g,`\\"`).replace(/\n/g,`\\n`).replace(/\r/g,`\\r`).replace(/\t/g,`\\t`)}function On(e){let t=e&&e[`xml:lang`];return t&&Wt.test(t)?`@`+t:``}function H(e){return e?e.value:null}var kn={set:It+`Set`,offer:It+`Offer`,agreement:It+`Agreement`,request:It+`Request`};function An(e,t,n,r){let i=r&&r.type,a=[];return t||n?(t&&a.push(`<${e}> <${Rt}validFrom> "${V(t)}" .`),n&&a.push(`<${e}> <${Rt}validThrough> "${V(n)}" .`)):i===`literal`&&a.push(`<${e}> <${Lt}valid> "${V(r.value)}" .`),a}function jn(e){let t=new Set,n=e=>e&&e.type===`uri`&&/^[^<>"{}|^`\\\s]+$/.test(e.value)?e.value:null;for(let r of e||[]){let e=n(r.policy);if(!e)continue;let i=kn[H(r.kind)]||kn.set;t.add(`<${e}> a <${i}> .`);let a=H(r.title);if(a){let n=On(r.title);t.add(`<${e}> <http://purl.org/dc/terms/title> "${V(a)}"${n} .`)}let o=H(r.issued);o&&t.add(`<${e}> <${Lt}issued> "${V(o)}" .`);for(let n of An(e,H(r.validFrom),H(r.validTo),r.valid))t.add(n);let s=n(r.revisionOf);s&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasRevisionOf> <${s}> .`);let c=n(r.offerRef);c&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${c}> .`);let l=n(r.requestRef);l&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${l}> .`);let u=n(r.answeredByRef);u&&t.add(`<${u}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${e}> .`);let d=n(r.assignee);if(d){t.add(`<${e}> <${It}assignee> <${d}> .`);let n=H(r.assigneeLabel);if(n){let e=On(r.assigneeLabel);t.add(`<${d}> <http://www.w3.org/2000/01/rdf-schema#label> "${V(n)}"${e} .`)}}let f=n(r.container);if(f){t.add(`<${f}> a <${y}> .`),t.add(`<${e}> <${se}> <${f}> .`);let n=parseInt(H(r.versionCount)||``,10);Number.isFinite(n)&&n>0&&t.add(`<${f}> <${le}> "${n}" .`);let i=H(r.containerTitle);if(i){let e=On(r.containerTitle);t.add(`<${f}> <http://purl.org/dc/terms/title> "${V(i)}"${e} .`)}}}return[...t].join(`
`)+(t.size?`
`:``)}function Mn(e){let t=new Set,n=e=>e&&e.type===`uri`&&/^[^<>"{}|^`\\\s]+$/.test(e.value)?e.value:null,r=(e,n,r)=>{let i=H(r);if(!i)return;let a=On(r);t.add(`<${e}> <${n}> "${V(i)}"${a} .`)};for(let i of e||[]){let e=n(i.container),a=n(i.version);if(!e||!a)continue;let o=kn[H(i.kind)];if(o){t.add(`<${e}> a <${y}> .`),t.add(`<${e}> <${Lt}type> <${o}> .`),t.add(`<${a}> <${se}> <${e}> .`),r(e,Lt+`title`,i.containerTitle),r(a,Lt+`title`,i.title);for(let e of An(a,H(i.validFrom),H(i.validTo),i.valid))t.add(e);r(a,Lt+`issued`,i.issued)}}return[...t].join(`
`)+(t.size?`
`:``)}var Nn=[];function Pn(e,t){if(t&&t.length)return[...t];if(!e)return[];let n=String(e).replace(/[?#].*$/,``),r=Nn.find(e=>e.match.test(n));return r?[...r.excludeGraphs]:[]}function Fn(e,t){let n=String(e||``).trim();if(!n)return`leeg bronadres`;let r=t||(typeof location<`u`&&location.href?location.href:`https://x.invalid/`),i;try{i=new URL(n,r)}catch{return`geen geldig adres: `+n}return i.protocol===`http:`||i.protocol===`https:`?null:`bronadres met een niet-ondersteund schema (${i.protocol}): ${n} — een bron moet via http(s) bereikbaar zijn`}function In(e){let t=String(e||``).trimStart().slice(0,200).toLowerCase();return t.startsWith(`<!doctype html`)||t.startsWith(`<html`)||t.startsWith(`<?xml-stylesheet`)}function Ln(e){let t=String(e||``).trim().replace(/[?#].*$/,``);return t?/\.(ttl|turtle|nt|jsonld|json)$/i.test(t)?`data`:/\/(sparql|query)$/i.test(t)?`sparql`:null:null}async function Rn(e,t){let n=await t(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`,Accept:`application/sparql-results+json`},body:`query=ASK%20%7B%7D`});if(!n.ok)return!1;try{let e=await n.json();return typeof e==`object`&&!!e&&typeof e.boolean==`boolean`}catch{return!1}}async function zn(e,t){let n=t||globalThis.fetch,r=Fn(e);if(r)return{kind:`error`,url:e,code:`schema`,message:r};let i=Ln(e);if(i===`sparql`)return{kind:`sparql`,url:e};if(i!==`data`)try{if(await Rn(e,n))return{kind:`sparql`,url:e}}catch{}try{let t=await n(e);if(!t.ok)return{kind:`error`,url:e,code:`unsupported`,message:`HTTP `+t.status+` bij `+e};let r=await t.text(),i=he(e,r);return i===`rdfxml`?{kind:`error`,url:e,code:`unsupported`,message:`formaat niet ondersteund (RDF/XML): `+e}:In(r)?{kind:`error`,url:e,code:`unsupported`,message:`dit adres levert een webpagina, geen RDF: `+e}:{kind:`data`,url:e,content:r,format:i}}catch(t){return{kind:`error`,url:e,code:`unreachable`,message:`bron niet bereikbaar (CORS of offline?): `+e+` — `+t.message}}}var Bn=de,Vn=he,Hn=zn,Un=s,Wn=Pt,Gn=t,Kn=p,qn=Mt,Jn=Nt,Yn=_,Xn=e,Zn=ae,Qn=a,$n=ue,er=ie,tr=c,nr=te,rr=l,ir=60,ar=10,or=f,sr=u,cr=h,U=me,lr=i,ur=d,dr=n,fr=4,pr=I,mr=Vt,hr=$t,gr=dn,_r=fn,vr=gn,yr=Sn,br=Cn,xr=Dn,Sr=Tn,Cr=_n,wr=jn,Tr=Mn,Er=ln,Dr=un,Or=Pn,kr=o,Ar=r,jr=`data/`,Mr=[`generiek/1-generiek-drietraps.ttl`,`generiek/7-dekking-generiek.ttl`,`generiek/archief-partof.ttl`,`generiek/keten-offer-request-agreement.ttl`,`vlierdam/vocabulaire.ttl`,`vlierdam/velden.ttl`,`vlierdam/beleid.ttl`,`vlierdam/openftv.ttl`],Nr=[`labels-tooi.ttl`,`odrl-ap-nl.ttl`];[...Mr,...Nr];function Pr(){return`?`+Mr.map(e=>`src=${encodeURIComponent(jr+e)}`).join(`&`)}function Fr(e){let t=String(e||``);return Nr.find(e=>t===`data/`+e||t.endsWith(`/`+e))||null}var Ir=`# =============================================================================
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
`,{DataFactory:Lr,Store:Rr,Parser:zr}=m,{namedNode:W}=Lr,G=`http://www.w3.org/ns/shacl#`,Br=`http://datashapes.org/dash#`,Vr=`http://www.w3.org/ns/shacl-ui/`,Hr=`http://www.w3.org/1999/02/22-rdf-syntax-ns#`,Ur=`http://www.w3.org/2000/01/rdf-schema#`,Wr=`http://www.w3.org/2004/02/skos/core#`,Gr=(e,t,n)=>e.getQuads(t,W(n),null,null).map(e=>e.object),K=(e,t,n)=>Gr(e,t,n)[0]||null,Kr=e=>!!e&&e.termType===`Literal`;function qr(e,t,n){let r=K(e,t,Br+n)||K(e,t,Vr+n);return!r||r.termType!==`NamedNode`?null:l(r.value).replace(/^IRIViewer$/,`URIViewer`)}function Jr(e,t){let n=K(e,t,G+`path`),r=null,i=!1;if(n&&n.termType===`NamedNode`)r=n.value;else if(n){let t=K(e,n,G+`inversePath`);t&&t.termType===`NamedNode`&&(r=t.value,i=!0)}let a=K(e,t,G+`order`),o=a&&Number.isFinite(parseFloat(a.value))?parseFloat(a.value):null,s=K(e,t,G+`group`);return{path:r,inverse:i,names:Gr(e,t,G+`name`).filter(Kr),descriptions:Gr(e,t,G+`description`).filter(Kr),order:o,group:s&&s.termType===`NamedNode`?s.value:null,pattern:(K(e,t,G+`pattern`)||{}).value||null,viewer:qr(e,t,`viewer`),role:qr(e,t,`propertyRole`)}}function Yr(e){let t=new Set,n=[];for(let r of e.getQuads(null,W(Hr+`type`),W(G+`NodeShape`),null)){let i=r.subject.value;if(t.has(i))continue;t.add(i);let a=K(e,r.subject,G+`targetClass`);a&&a.termType===`NamedNode`&&n.push({iri:i,store:e,targetClass:a.value,properties:Gr(e,r.subject,G+`property`).map(t=>Jr(e,t))})}return n}function Xr(e,t){let n=new Set([t]),r=!0;for(;r;){r=!1;for(let t of e.getQuads(null,W(Ur+`subClassOf`),null,null))n.has(t.object.value)&&!n.has(t.subject.value)&&(n.add(t.subject.value),r=!0)}return n}var Zr=[`name`,`description`,`order`,`group`];function Qr(e){return e.properties.some(e=>e.viewer||e.role||Zr.some(t=>t===`name`?e.names.length:t===`description`?e.descriptions.length:e[t]!==null))}var $r=Qr;function ei(e,t,n,r=[]){let i=typeof t==`string`?W(t):t,a=new Set(Gr(e,i,Hr+`type`).filter(e=>e.termType===`NamedNode`).map(e=>e.value));if(!a.size)return null;let o=[],s=new Set;for(let e of n)s.add(e.targetClass);for(let t of[...n,...r.filter(e=>!s.has(e.targetClass))]){if(a.has(t.targetClass)){o.push([0,+!$r(t),t]);continue}let n=Xr(e,t.targetClass);[...a].some(e=>n.has(e))&&o.push([1,+!$r(t),t])}return o.length?(o.sort((e,t)=>e[0]-t[0]||e[1]-t[1]),o[0][2]):null}function ti(e,t,n=[]){let r=new Set;for(let e of t)r.add(e.targetClass);let i=[...t,...n.filter(e=>!r.has(e.targetClass))],a=new Map;return i.forEach((t,n)=>{let r=+!$r(t),i=(e,i)=>{let o=a.get(e);(!o||i<o.rang||i===o.rang&&r<o.vorm)&&a.set(e,{rang:i,vorm:r,idx:n,shape:t})};i(t.targetClass,0);for(let n of Xr(e,t.targetClass))n!==t.targetClass&&i(n,1)}),a}function ni(e,t,n){if(!n||!n.size)return null;let r=typeof t==`string`?W(t):t;if(!r)return null;let i=null;for(let t of e.getQuads(r,W(Hr+`type`),null,null)){if(t.object.termType!==`NamedNode`)continue;let e=n.get(t.object.value);e&&(!i||e.rang<i.rang||e.rang===i.rang&&e.vorm<i.vorm||e.rang===i.rang&&e.vorm===i.vorm&&e.idx<i.idx)&&(i=e)}return i?i.shape:null}function ri(e,t,n){if(!n)return[];let r=typeof t==`string`?W(t):t;return r&&n.properties.filter(e=>e.role===`KeyInfoRole`).sort((e,t)=>(e.order??1/0)-(t.order??1/0)).map(t=>mi(e,r,t)).find(e=>e.length)||[]}function ii(e,t){if(!t||!t.targetClass)return null;let n=W(t.targetClass),r=t.store&&t.store!==e?[e,t.store]:[e],i=e=>{for(let t of r){let r=v(Gr(t,n,e).filter(Kr));if(r)return r}return null},a=i(Wr+`altLabel`),o=i(Ur+`label`)||i(Wr+`prefLabel`)||i(`http://purl.org/dc/terms/title`)||l(t.targetClass);return o?{text:a||o,vol:o,afgekort:!!a}:null}function ai(e,t){let n=new Set;for(let e of t)Qr(e)&&n.add(e.targetClass);if(!n.size)return n;let r=e.getQuads(null,W(Ur+`subClassOf`),null,null),i=!0;for(;i;){i=!1;for(let e of r)n.has(e.object.value)&&!n.has(e.subject.value)&&(n.add(e.subject.value),i=!0)}return n}function oi(e,t,n){if(!n||!n.size)return!1;let r=typeof t==`string`?W(t):t;return r?e.getQuads(r,W(Hr+`type`),null,null).some(e=>e.object.termType===`NamedNode`&&n.has(e.object.value)):!1}function si(e,t,{skipGraphs:n}={}){let r=new Set,i=new Set;if(!t||!t.size)return{iris:r,blanks:0};let a=n&&n.length?new Set(n):null;for(let n of e.getQuads(null,W(Hr+`type`),null,null))n.object.termType===`NamedNode`&&t.has(n.object.value)&&(a&&n.graph&&a.has(n.graph.value)||(n.subject.termType===`NamedNode`?r:i).add(n.subject.value));return{iris:r,blanks:i.size}}function ci(e,t){let n=si(e,t);return n.iris.size+n.blanks}function li(e,t,n){return n.path?n.inverse?e.getQuads(null,W(n.path),t,null).map(e=>e.subject):e.getQuads(t,W(n.path),null,null).map(e=>e.object):[]}function ui(e,t){return v(t.names)||(t.path?re(e,W(t.path)):``)}function di(e,t){return v(t.descriptions)||(t.path?fe(e,W(t.path)):``)||null}function fi(e,t){return!t||t.termType!==`NamedNode`?!1:e.countQuads(t,null,null,null)===0}function pi(e,t,n){let r=()=>({kind:`label`,text:re(e,t),iri:t.termType===`NamedNode`?t.value:null,external:fi(e,t)});switch(n.viewer){case`URIViewer`:case`HyperlinkViewer`:return{kind:`link`,text:t.value,iri:t.termType===`NamedNode`?t.value:null};case`LabelViewer`:return r();case`LiteralViewer`:return{kind:`text`,text:t.value,iri:null};default:return t.termType===`NamedNode`?r():{kind:`text`,text:t.value,iri:null}}}function mi(e,t,n){let r=li(e,t,n);if(!r.length)return[];let i=r.filter(e=>Kr(e)&&e.language);if(i.length){let t=v(i),a=r.filter(e=>!(Kr(e)&&e.language));return[...t?[{kind:`text`,text:t,iri:null}]:[],...a.map(t=>pi(e,t,n))]}if(n.viewer===`LangStringViewer`){let e=v(r.filter(Kr));return e?[{kind:`text`,text:e,iri:null}]:[]}let a=[],o=new Set;for(let t of r){let r=pi(e,t,n),i=r.kind+`\0`+r.text;o.has(i)||(o.add(i),a.push(r))}return a}function hi(e,t,n){let r=typeof t==`string`?W(t):t,i=t=>n.properties.filter(e=>e.role===t).sort((e,t)=>(e.order??1/0)-(t.order??1/0)).map(t=>mi(e,r,t)).find(e=>e.length)||[],a=i(`LabelRole`),o=i(`DescriptionRole`),s=a.length?a[0].text:re(e,r),c=new Set([Ur+`label`,`http://www.w3.org/2004/02/skos/core#prefLabel`,`http://purl.org/dc/terms/title`]),l=(e,t)=>!a.length&&!e.inverse&&c.has(e.path)&&t.length===1&&t[0].text===s,u=n.store||e,d=new Map,f=[];for(let t of n.properties){if(t.role===`LabelRole`||t.role===`DescriptionRole`||t.role===`KeyInfoRole`||!t.path)continue;let n=mi(e,r,t);if(l(t,n))continue;let i={kind:`row`,label:ui(e,t),description:di(e,t),path:t.path,inverse:t.inverse,pattern:t.pattern,viewer:t.viewer,values:n,order:t.order};if(t.group){let e=d.get(t.group);if(!e){let n=K(u,W(t.group),G+`order`);e={kind:`group`,label:re(u,W(t.group)),rows:[],order:n&&Number.isFinite(parseFloat(n.value))?parseFloat(n.value):null},d.set(t.group,e),f.push(e)}e.rows.push(i)}else f.push(i)}let p=e=>e.map((e,t)=>[e,t]).sort((e,t)=>(e[0].order??1/0)-(t[0].order??1/0)||e[1]-t[1]).map(([e])=>e);for(let e of d.values())e.rows=p(e.rows).filter(e=>e.values.length);let m=p(f).filter(e=>e.kind===`group`?e.rows.length:e.values.length);return{shape:n.iri,title:s,keyInfo:i(`KeyInfoRole`),description:o.length?o[0].text:null,blocks:m}}function gi(e,t){if(!e||!t)return e;let n=e=>e.iri!==t,r=e=>{let t=e.values.filter(n);return t.length===e.values.length?e:{...e,values:t}},i=[],a=!1;for(let t of e.blocks){if(t.kind===`group`){let e=t.rows.map(r).filter(e=>e.values.length),n=e.length===t.rows.length&&e.every((e,n)=>e===t.rows[n]);n||(a=!0),e.length&&i.push(n?t:{...t,rows:e});continue}let e=r(t);e!==t&&(a=!0),e.values.length&&i.push(e)}return a?{...e,blocks:i}:e}var _i=null;function vi(e){if(_i)return _i;let t=new Rr;for(let n of e)t.addQuads(new zr().parse(n));return _i=Yr(t),_i}var[yi,bi]=A(null),[xi,q]=A(`leeg`),[Si,Ci]=A([]),[wi,Ti]=A([]),[Ei,Di]=A(0),[Oi,ki]=A(null),[Ai,ji]=A(null),[Mi,Ni]=A(null),[Pi,Fi]=A(null),[J,Ii]=A(null),[Li,Y]=A(0),[X,Ri]=A(null),[zi,Bi]=A(!1),[Vi,Hi]=A(null),[Ui,Wi]=A(!1),[Gi,Ki]=A(null),[qi,Ji]=A(`load.sources`),[Yi,Xi]=A(null),Z=0,Q=Promise.resolve(),Zi=null,Qi=null,$i=[],ea,ta=[],na=[],ra=e=>ta.length?[...ta,...e]:e,ia=e=>na.length?[...na,...e]:e;function aa(e){Ri(e),$i=Or(e,ea)}function oa(e){let t=[...e.src.map(e=>({name:e,url:e,detecteer:!0})),...(e.ttl||[]).map(e=>({name:e,url:e}))],n=new Set,r=t.filter(e=>!n.has(e.url)&&!!n.add(e.url));if(!r.length)return[];let i=new Set(r.map(e=>Fr(e.url)).filter(Boolean));return[...r,...Nr.filter(e=>!i.has(e)).map(e=>({name:e,url:jr+e,stil:!0}))]}async function sa(e){let t=[],n=[],r=[],i=await Promise.all(e.map(async({name:e,url:t,detecteer:n,stil:r})=>{if(n){let n=await Hn(t);return n.kind===`sparql`?{endpoint:n.url}:n.kind===`data`?{bron:{name:e,url:t,content:n.content,format:n.format}}:r?{}:{fout:{url:t,message:n.message}}}try{let n=await fetch(t);if(!n.ok)throw Error(`HTTP ${n.status}`);let r=await n.text();return{bron:{name:e,url:t,content:r,format:Vn(t,r)}}}catch(e){return r?{}:{fout:{url:t,message:e instanceof Error?e.message:String(e)}}}}));for(let e of i)e.bron?t.push(e.bron):e.endpoint?r.push(e.endpoint):e.fout&&n.push(e.fout);return{bronnen:t,fouten:n,endpoints:r}}async function ca(e,t){try{let n=qn(),r=()=>{};return Q=new Promise(e=>{r=e}),{bericht:await Wn(e,{setScope:t.setScope,lang:t.lang,onStore:e=>{if(!e){r();return}Jn(n,e).then(()=>{Ii(()=>n),Y(e=>e+1),r()})}}),motor:`worker`}}catch{let t=Un(e);return Ii(()=>t.store??null),Y(e=>e+1),Q=Promise.resolve(),{bericht:t,motor:`hoofddraad`}}}function la(e,t){if(!e)return null;if(t.policy)return $n(e,t.policy)?.nav??null;let n=J();return!t.set||!n?null:Qn(e,n,t.set)?.nav??null}var ua=()=>({set:Zi,policy:Qi});async function da(e={}){let t=Z;if(!yi()||(e.setScope!==void 0&&(Zi=e.setScope),e.policyScope!==void 0&&(Qi=e.policyScope),await Q,t!==Z))return;let n=J();if(!n)return;let r=Yn(n),i=Zn(r),a=ua();bi(r),ji(()=>i),Ni(()=>la(i,a))}var[fa,pa]=A([]);function ma(){let e=J();if(!e||!fa().length)return!1;for(let t of fa())cr(e,t.ttl,`ttl`,U({url:t.ep},0));return Y(e=>e+1),!0}async function ha(e,t,n,r){let{bericht:i,motor:a}=await ca(t,r);if(e!==Z)return!1;Ti(t),bi(i.model||null),ji(()=>i.nav??null);let o=i.scopedNav!==void 0&&!r.policyScope?i.scopedNav:la(i.nav??null,{set:r.setScope,policy:r.policyScope});Ni(()=>o);let s=r.policyScope?`policy`:r.setScope?`set`:null;return Fi(s&&!o?s:null),Di(i.quadCount||0),ki(a),Ci([...n,...i.errors||[]]),q(i.model?`klaar`:`fout`),await Q,e===Z&&ma()&&za(),!!i.model}function ga(e,t){e===Z&&(Ci(ia([t])),q(`fout`))}async function _a(e,t,n){let r=await sa(t);if(e!==Z)return;r.endpoints.length&&aa(r.endpoints[0]);let i=r.bronnen.filter(e=>!Fr(e.url)),a=X();if(!i.length&&a){Ji(`load.queryEndpointAt`),Bi(!0),await Ma(e,a,n.policyScope,n);return}if(!i.length){Ti([]),bi(null),Di(0),ki(null),ji(null),Ni(null),Ci(r.fouten),q(`fout`);return}a&&Bi(!0);let o=await ao(r.bronnen);ta=o.lijst,na=o.fout?[o.fout,...r.fouten]:r.fouten,await ha(e,ta,na,n),e===Z&&a&&await Ma(e,a,n.policyScope,n)}async function va(e,t,n){try{let r=await fetch(t);if(!r.ok)throw Error(`HTTP ${r.status}`);let i=await r.text();if(e!==Z)return;let a=await ao([{name:t,url:t,content:i,format:Vn(t,i)}]);await ha(e,a.lijst,a.fout?[a.fout]:[],n)}catch(n){ga(e,{url:t,message:Bn(`err.scopeFetch`,{iri:t,msg:n instanceof Error?n.message:String(n)})})}}async function ya(e){try{return await pr(e,hr())}catch(t){if(!Er(t))throw t;try{let t=await Dr(e);return Wi(!0),t}catch{throw t}}}async function ba(e,t,n){let r=!1;try{let i=await pr(t,gr());if(e!==Z)return;i.length&&(Hi(`eerste`),r=await ha(e,ra([{name:`${t} (eerste beeld, ${i.length} rijen)`,url:t,content:wr(i),format:`ttl`,fromSparql:!0}]),ia([]),n),r&&q(`laden`))}catch{Hi(null)}if(e===Z)try{let[r,i]=await Promise.all([ya(t),pr(t,_r()).catch(()=>[])]);if(e!==Z)return;Hi(null);let a=wr(r)+Tr(i);if(await ha(e,ra([{name:`${t} (policylijst, ${r.length} rijen`+(i.length?` + ${i.length} versierijen`:``)+`)`,url:t,content:a,format:`ttl`,fromSparql:!0}]),ia([]),n),e!==Z)return;await Ja(e)}catch(n){if(e!==Z)return;Hi(null);let i=n instanceof Error?n.message:String(n);Ki(r?`volledigeIndex`:`endpoint`),Ci(ia([{url:t,message:i}])),q(`fout`)}}var xa=`urn:odrlvis:vormshapes`,Sa=`urn:odrlvis:knooplabels`,Ca=Yr,wa=vi,Ta=ai,Ea=si,Da=Gn;function Oa(e){return mr(e,yr({excludeGraphs:$i})).catch(()=>``)}async function ka(e,t,n){let r=await n;if(e!==Z||!r||!r.trim()||(await Q,e!==Z))return;let i=J();if(!i)return;pa(e=>[...e,{iri:xa,ttl:r,ep:t}]),cr(i,r,`ttl`,U({url:t},0)),Y(e=>e+1);let a=Ta(i,[...Ca(i),...wa([Ir])]);await Promise.all([ja(e,t,i,a),Aa(e,t,i,a)])}async function Aa(e,t,n,r){try{let i=xr([...Ea(n,r).iris].filter(e=>!Da(n,e)),{excludeGraphs:$i});if(!i)return;let a=await mr(t,i);if(e!==Z||!a||!a.trim()||(await Q,e!==Z))return;pa(e=>[...e,{iri:Sa,ttl:a,ep:t}]);let o=J();if(!o)return;cr(o,a,`ttl`,U({url:t},0)),Y(e=>e+1),za()}catch{}}async function ja(e,t,n,r){try{let i=Ea(n,r,{skipGraphs:[String(U({url:t},0))]}),a=Sr(r,{excludeGraphs:$i,excludeNodes:i.iris});if(!a)return;let o=await pr(t,a);if(e!==Z)return;let s=parseInt(o[0]&&o[0].n&&o[0].n.value||``,10);if(!Number.isFinite(s))return;let c=s+i.iris.size+i.blanks;c>0&&Xi(c)}catch{}}async function Ma(e,t,n,r){let i=Oa(t);try{if(n){let i=await mr(t,vr(n,{excludeGraphs:$i}));if(e!==Z)return;await ha(e,ra([{name:`${t} (policy-detail)`,url:t,content:i,format:`ttl`,fromSparql:!0}]),ia([]),r);return}await ba(e,t,r)}catch(n){Ki(`endpoint`),ga(e,{url:t,message:n instanceof Error?n.message:String(n)})}finally{await ka(e,t,i)}}function Na(e){let t=++Z,n=oa({src:e.src||[],ttl:e.ttl||[],sparql:e.sparql??null,scope:e.policyScope??e.setScope??null}),r=e.setScope??null,i=e.policyScope??null,a=e.sparql||null,o={setScope:r,policyScope:i,lang:e.lang??ne()};if(Zi=r,Qi=i,ea=e.excludeGraphs,Ii(null),Q=Promise.resolve(),Ci([]),ta=[],na=[],aa(a),Bi(!1),Hi(null),Ki(null),Wi(!1),pa([]),Ya.clear(),Pa.clear(),Fa.clear(),Za.clear(),Xi(null),!n.length&&!a&&!(i||r)){bi(null),Ti([]),Di(0),ki(null),ji(null),Ni(null),q(`leeg`);return}if(q(`laden`),n.length){Ji(`load.sources`),_a(t,n,o);return}if(a){Ji(`load.queryEndpointAt`),Bi(!0),Ma(t,a,i,o);return}Ji(`load.source`),va(t,i||r,o)}var Pa=new Set,Fa=new Map;function Ia(e){return!X()||!e||!e.iri||e.anon||e.stub||Pa.has(e.iri)?!1:!(e.permissions&&e.permissions.length||e.prohibitions&&e.prohibitions.length||e.obligations&&e.obligations.length)}async function La(e,t={}){let n=X();if(!e||!n||Pa.has(e))return!1;let r=Fa.get(e);if(r)return r;let i=Z,a=(async()=>{let r=await mr(n,vr(e,{excludeGraphs:$i}));if(await Q,i!==Z)return!1;let a=J();if(!a)throw Error(Bn(`load.graph`));return pa(t=>[...t,{iri:e,ttl:r,ep:n}]),cr(a,r,`ttl`,U({url:n},0)),Pa.add(e),Y(e=>e+1),t.herbouwModel!==!1&&za(),!0})();Fa.set(e,a);try{return await a}finally{Fa.delete(e)}}async function Ra(e){let t=[...new Set(e.filter(Boolean))];if(!t.length||!X())return!1;let n=Z,r=await Promise.all(t.map(e=>La(e,{herbouwModel:!1})));return n===Z&&(r.some(Boolean)&&za(),r.some(Boolean))}function za(){let e=J();if(!e)return;let t=Yn(e),n=Zn(t);bi(t),ji(()=>n),Ni(()=>la(n,ua()))}function Ba(e){let t=new Set;for(let n of[e.offers,e.agreements,e.sets])for(let e of n||[])e.iri&&!e.anon&&t.add(e.iri);return t}var Va=(e,t)=>e.size===t.size&&[...e].every(e=>t.has(e));function Ha(e,t){if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t))return e.length===t.length&&e.every((e,n)=>Ha(e,t[n]));if(!e||!t||typeof e!=`object`||typeof t!=`object`)return!1;let n=e,r=t,i=Object.keys(n);return i.length===Object.keys(r).length&&i.every(e=>Ha(n[e],r[e]))}function Ua(e,t){if(!e||!e.length)return t;let n=new Map;for(let t of e)t&&t.id&&n.set(t.id,t);return t.map(e=>{let t=e&&e.id?n.get(e.id):void 0;if(!t)return e;let r=Ua(t.children||null,e.children||[]),i=r===e.children?e:{...e,children:r};return Ha(t,i)?t:i})}function Wa(e,t){let n=Zn(e),r=Array.isArray(t)&&Array.isArray(n)?Ua(t,n):n;bi(e),ji(()=>r),Ni(()=>la(r,ua()))}function Ga(e,t){t&&console.warn(`corpus: volledige herbouw na een mutatie — ${e}`);let n=J();return n&&(Wa(Yn(n),Ai()),Y(e=>e+1)),{modus:`volledig`,policies:[],reden:e}}function Ka(e){let t=J(),n=yi();if(!t||!n)return{modus:`volledig`,policies:[],reden:`geen graaf of model`};if(![...e.added||[],...e.removed||[]].length)return Ga(`lege delta`,!1);let r=Ba(n),i=Xn(t,e,r),a=i.policies;if(!a)return Ga(i.reden===`budget`?`de toewijzing zakte door haar knopenbudget`:`mutatie buiten de bekende kaarten`,!0);let o=Yn(t,{hergebruik:n,alleen:new Set(a)});return Va(r,Ba(o))?(Wa(o,Ai()),Y(e=>e+1),{modus:`gericht`,policies:a,reden:``}):Ga(`de verzameling policies veranderde`,!0)}var qa=20;async function Ja(e){let t=yi();if(!X()||!t)return;let n=(t.offers||[]).filter(e=>Ia(e)).slice(0,qa),r=(t.agreements||[]).filter(e=>Ia(e)),i=n.length+r.length<=qa?[...n,...r]:n;i.length&&(await Promise.all(i.map(e=>La(e.iri,{herbouwModel:!1}).catch(()=>!1))),(e===void 0||e===Z)&&za())}var Ya=new Set;async function Xa(e){let t=X();if(!e||!t||Ya.has(e))return!1;Ya.add(e);try{let n=await mr(t,Cr(e,{excludeGraphs:$i}));await Q;let r=J();if(!r)throw Error(Bn(`load.graph`));return!n||!n.trim()?!1:(pa(r=>[...r,{iri:e,ttl:n,ep:t}]),cr(r,n,`ttl`,U({url:t},0)),Y(e=>e+1),!0)}catch{return Ya.delete(e),!1}}var Za=new Set;async function Qa(e){let t=X();if(!e||!t||Za.has(e))return!1;Za.add(e);try{let n=await mr(t,br(e,{excludeGraphs:$i}));await Q;let r=J();if(!r)throw Error(Bn(`load.graph`));return!n||!n.trim()?!1:(pa(r=>[...r,{iri:e,ttl:n,ep:t}]),cr(r,n,`ttl`,U({url:t},0)),Y(e=>e+1),!0)}catch{return Za.delete(e),!1}}var $a=fa;function eo(e){Ti(e)}async function to(e){let t=++Z,n={setScope:Zi,policyScope:Qi,lang:ne()};if(q(`laden`),Ci([]),ta=e.filter(e=>!e.fromSparql),na=[],!e.length&&X()){Ti([]),ta=[],Ji(`load.queryEndpointAt`),Bi(!0),await Ma(t,X(),Qi,n);return}if(!e.length){Ti([]),bi(null),Di(0),ki(null),ji(null),Ni(null),q(`leeg`);return}Ji(`load.sources`),await ha(t,e,[],n)}var no=null;function ro(e){no=e}var io=8e3;async function ao(e){if(!no)return{lijst:e,fout:null};let t=null,n=Symbol(`voorbewerking te traag`);try{let r=new Promise(e=>{t=setTimeout(()=>e(n),io)}),i=await Promise.race([no(e),r]);return i===n?{lijst:e,fout:{message:Bn(`err.bronnenlaagTraag`)}}:{lijst:i,fout:null}}catch{return{lijst:e,fout:null}}finally{t!==null&&clearTimeout(t)}}var oo=Symbol(`store-raw`),so=Symbol(`store-node`),$=Symbol(`store-has`),co=Symbol(`store-self`);function lo(e){let t=e[C];if(!t&&(Object.defineProperty(e,C,{value:t=new Proxy(e,vo)}),!Array.isArray(e))){let n=Object.keys(e),r=Object.getOwnPropertyDescriptors(e),i=Object.getPrototypeOf(e),a=i!==null&&typeof e==`object`&&!!e&&!Array.isArray(e)&&i!==Object.prototype;if(a){let e=Object.getOwnPropertyDescriptors(i);n.push(...Object.keys(e)),Object.assign(r,e)}for(let i=0,o=n.length;i<o;i++){let o=n[i];a&&o===`constructor`||r[o].get&&Object.defineProperty(e,o,{configurable:!0,enumerable:r[o].enumerable,get:r[o].get.bind(t)})}}return t}function uo(e){let t;return typeof e==`object`&&!!e&&(e[C]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function fo(e,t=new Set){let n,r,i,a;if(n=e!=null&&e[oo])return n;if(!uo(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,a=e.length;n<a;n++)i=e[n],(r=fo(i,t))!==i&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);let n=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let s=0,c=n.length;s<c;s++)a=n[s],!o[a].get&&(i=e[a],(r=fo(i,t))!==i&&(e[a]=r))}return e}function po(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function mo(e,t,n){if(e[t])return e[t];let[r,i]=A(n,{equals:!1,internal:!0});return r.$=i,e[t]=r}function ho(e,t){let n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===C||t===so?n:(delete n.value,delete n.writable,n.get=()=>e[C][t],n)}function go(e){Re()&&mo(po(e,so),co)()}function _o(e){return go(e),Reflect.ownKeys(e)}var vo={get(e,t,n){if(t===oo)return e;if(t===C)return n;if(t===be)return go(e),n;let r=po(e,so),i=r[t],a=i?i():e[t];if(t===so||t===$||t===`__proto__`)return a;if(!i){let n=Object.getOwnPropertyDescriptor(e,t);Re()&&(typeof a!=`function`||Object.prototype.hasOwnProperty.call(e,t))&&!(n&&n.get)&&(a=mo(r,t,a)())}return uo(a)?lo(a):a},has(e,t){return t===oo||t===C||t===be||t===so||t===$||t===`__proto__`||(Re()&&mo(po(e,$),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:_o,getOwnPropertyDescriptor:ho};function yo(e,t,n,r=!1){if(t===`__proto__`||!r&&e[t]===n)return;let i=e[t],a=e.length;n===void 0?(delete e[t],e[$]&&e[$][t]&&i!==void 0&&e[$][t].$()):(e[t]=n,e[$]&&e[$][t]&&i===void 0&&e[$][t].$());let o=po(e,so),s;if((s=mo(o,t,i))&&s.$(()=>n),Array.isArray(e)&&e.length!==a){for(let t=e.length;t<a;t++)(s=o[t])&&s.$();(s=mo(o,`length`,a))&&s.$(e.length)}(s=o[co])&&s.$()}function bo(e,t){let n=Object.keys(t);for(let r=0;r<n.length;r+=1){let i=n[r];xo(i)||yo(e,i,t[i])}}function xo(e){return e===`__proto__`||e===`constructor`||e===`prototype`}function So(e,t){if(typeof t==`function`&&(t=t(e)),t=fo(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){let r=t[n];e[n]!==r&&yo(e,n,r)}yo(e,`length`,r)}else bo(e,t)}function Co(e,t,n=[]){let r,i=e;if(t.length>1){r=t.shift();let a=typeof r,o=Array.isArray(e);if(a===`string`&&(r===`__proto__`||t.length>1&&xo(r)))return;if(Array.isArray(r)){for(let i=0;i<r.length;i++)Co(e,[r[i]].concat(t),n);return}if(o&&a===`function`){for(let i=0;i<e.length;i++)r(e[i],i)&&Co(e,[i].concat(t),n);return}if(o&&a===`object`){let{from:i=0,to:a=e.length-1,by:o=1}=r;for(let r=i;r<=a;r+=o)Co(e,[r].concat(t),n);return}if(t.length>1){Co(e[r],t,[r].concat(n));return}i=e[r],n=[r].concat(n)}let a=t[0];typeof a==`function`&&(a=a(i,n),a===i)||(r!==void 0||a!=null)&&(a=fo(a),r===void 0||uo(i)&&uo(a)&&!Array.isArray(a)?bo(i,a):yo(e,r,a))}function wo(...[e,t]){let n=fo(e||{}),r=Array.isArray(n),i=lo(n);function a(...e){Pe(()=>{r&&e.length===1?So(n,e[0]):Co(n,e)})}return[i,a]}var To=[`active`,`terminated`,`future`];function Eo(){return{stand:`doc`,src:[],ttl:[],sparql:null,policyScope:null,setScope:null,groupBy:null,lang:`nl`,langExpliciet:!1,editMode:!1,excludeGraphs:[],filters:{status:null,aanbod:``}}}var[Do,Oo]=wo(Eo());function ko(e,t){return Do.lang,Bn(e,t)}function Ao(e){if(!e)return null;let t=e.split(`,`).map(e=>e.trim()).filter(e=>To.includes(e));return t.length?t:null}function jo(e){let t=new URLSearchParams(e),n=ce(t.get(`lang`));oe(n),Oo({...Eo(),stand:`doc`,src:t.getAll(`src`),ttl:t.getAll(`ttl`),sparql:t.get(`sparql`)||null,policyScope:t.get(`policy`)||null,setScope:t.get(`set`)||null,groupBy:t.has(`groupby`)?String(t.get(`groupby`)||``).split(`,`).map(e=>e.trim()).filter(Boolean):null,lang:n,langExpliciet:t.has(`lang`),editMode:t.get(`edit`)===`1`,excludeGraphs:t.getAll(`exclude-graph`),filters:{status:Ao(t.get(`status`)),aanbod:t.get(`aanbod`)||``}})}var Mo=[`src`,`ttl`,`sparql`,`policy`,`set`,`groupby`,`edit`,`exclude-graph`,`status`,`aanbod`,`lang`];function No(e,t){let n=new URLSearchParams(t);for(let e of Mo)n.delete(e);for(let t of e.src)n.append(`src`,t);for(let t of e.ttl)n.append(`ttl`,t);e.sparql&&n.set(`sparql`,e.sparql),e.policyScope&&n.set(`policy`,e.policyScope),e.setScope&&n.set(`set`,e.setScope),e.groupBy&&n.set(`groupby`,e.groupBy.join(`,`)),e.editMode&&n.set(`edit`,`1`);for(let t of e.excludeGraphs)n.append(`exclude-graph`,t);return e.filters.status&&n.set(`status`,To.filter(t=>e.filters.status.includes(t)).join(`,`)),e.filters.aanbod&&n.set(`aanbod`,e.filters.aanbod),e.langExpliciet&&n.set(`lang`,e.lang),n}function Po(e){if(typeof history>`u`||!history.replaceState)return;let t=No(e,new URLSearchParams(location.search)).toString();history.replaceState(null,``,t?`?`+t:location.pathname)}function Fo(e){let t={...e};if(`lang`in t&&t.lang){let e=ce(t.lang);oe(e),t.lang=e,t.langExpliciet=!0}t.policyScope?t.setScope=null:t.setScope&&(t.policyScope=null),t.filters&&t.filters.status&&t.filters.status.length===To.length&&(t.filters={...t.filters,status:null}),Oo(t),Po(Do)}var Io=ne,[Lo,Ro]=A(null),zo=()=>Lo()?.sleutel??null,Bo=()=>Lo()?.vars;function Vo(e,t){Ro(e?{sleutel:e,vars:t}:null)}var Ho=new Set;function Uo(e){return Ho.add(e),()=>{Ho.delete(e)}}function Wo(e){if(!e)return!1;for(let t of[...Ho])try{if(t(e))return!0}catch{}return!1}var Go=()=>new Promise(e=>{setTimeout(e,0)});function Ko(e){if(typeof document>`u`)return null;let t=e.replace(/["\\]/g,`\\$&`);return document.querySelector(`[data-ref="${t}"]`)||document.querySelector(`[data-iri="${t}"]`)}async function qo(e,t){if(typeof e.scrollIntoView==`function`){e.scrollIntoView({behavior:t?`smooth`:`auto`,block:`start`});for(let t=0;t<12;t+=1){await new Promise(e=>{setTimeout(e,40)});let t=e.getBoundingClientRect().top,n=typeof window<`u`?window.innerHeight:0;if(t>=-4&&t<Math.max(n,1))return}e.scrollIntoView({behavior:`auto`,block:`start`})}}async function Jo(e,t={}){if(!e)return!1;for(let t of[...Ho])try{if(t(e))break}catch{}await Go();let n=Ko(e);if(!n)return!1;for(let e=n;e;e=e.parentElement)e instanceof HTMLDetailsElement&&(e.open=!0);return await qo(n,!!t.smooth),n.classList&&(n.classList.remove(`ui-flash`),n.offsetWidth,n.classList.add(`ui-flash`),setTimeout(()=>n.classList.remove(`ui-flash`),1800)),!0}export{ti as $,Na as A,We as At,Pi as B,Le as Bt,Xa as C,wt as Ct,da as D,Et as Dt,Qa as E,kt as Et,yi as F,Oe as Ft,ai as G,Ge as Gt,eo as H,x as Ht,Oi as I,A as It,oi as J,gi as K,Ai as L,St as Lt,xi as M,j as Mt,Vi as N,Ae as Nt,to as O,Pe as Ot,Gi as P,Ne as Pt,ni as Q,Ei as R,bt as Rt,Li as S,Jt as St,Ra as T,Tt,vi as U,xt as Ut,Mi as V,Ie as Vt,ci as W,M as Wt,Yr as X,ri as Y,ei as Z,X as _,Ar as _t,Bo as a,fr as at,Yi as b,Bn as bt,Jo as c,sr as ct,Vo as d,tr as dt,ii as et,Fo as f,er as ft,Ia as g,or as gt,Ui as h,lr as ht,zo as i,ir as it,qi as j,je as jt,Ka as k,ht as kt,ko as l,U as lt,wi as m,dr as mt,Io as n,Fr as nt,Wo as o,ar as ot,$a as p,rr as pt,hi as q,jo as r,Pr as rt,Uo as s,nr as st,To as t,Ir as tt,Do as u,ur as ut,zi as v,kr as vt,La as w,Dt as wt,J as x,Yt as xt,Si as y,Kn as yt,ro as z,Fe as zt};
//# sourceMappingURL=weergave-BLKAREPI.js.map