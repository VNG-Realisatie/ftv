import{C as e,Ct as t,D as n,Dt as r,Et as i,F as a,G as o,I as s,J as c,K as l,N as u,O as d,P as f,S as p,St as m,T as h,Tt as g,W as _,Z as v,_t as y,a as ee,at as te,bt as ne,c as re,ct as b,gt as ie,h as ae,it as oe,j as se,k as ce,l as le,lt as ue,mt as de,ot as fe,q as pe,ut as me,v as he,w as ge,xt as _e,y as ve,yt as ye}from"./term-CZwtuhWv.js";var x={context:void 0,registry:void 0,effects:void 0,done:!1,getContextId(){return be(this.context.count)},getNextContextId(){return be(this.context.count++)}};function be(e){let t=String(e),n=t.length-1;return x.context.id+(n?String.fromCharCode(96+n):``)+t}function S(e){x.context=e}var xe=(e,t)=>e===t,C=Symbol(`solid-proxy`),Se=typeof Proxy==`function`,Ce=Symbol(`solid-track`),we={equals:xe},Te=null,Ee=at,w=1,De=2,Oe={owned:null,cleanups:null,context:null,owner:null},ke={},T=null,E=null,D=null,O=null,k=null,Ae=0;function je(e,t){let n=D,r=T,i=e.length===0,a=t===void 0?r:t,o=i?Oe:{owned:null,cleanups:null,context:a?a.context:null,owner:a},s=i?e:()=>e(()=>M(()=>P(o)));T=o,D=null;try{return N(s,!0)}finally{D=n,T=r}}function A(e,t){t=t?Object.assign({},we,t):we;let n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0};return[Qe.bind(n),e=>(typeof e==`function`&&(e=E&&E.running&&E.sources.has(n)?e(n.tValue):e(n.value)),$e(n,e))]}function Me(e,t,n){et(nt(e,t,!0,w))}function Ne(e,t,n){et(nt(e,t,!1,w))}function Pe(e,t,n){Ee=ot;let r=nt(e,t,!1,w),i=Xe&&Je(Xe);i&&(r.suspense=i),(!n||!n.render)&&(r.user=!0),k?k.push(r):et(r)}function j(e,t,n){n=n?Object.assign({},we,n):we;let r=nt(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,et(r),Qe.bind(r)}function Fe(e){return e&&typeof e==`object`&&`then`in e}function Ie(e,t,n){let r,i,a;typeof t==`function`?(r=e,i=t,a=n||{}):(r=!0,i=e,a=t||{});let o=null,s=ke,c=null,l=!1,u=!1,d=`initialValue`in a,f=typeof r==`function`&&j(r),p=new Set,[m,h]=(a.storage||A)(a.initialValue),[g,_]=A(void 0),[v,y]=A(void 0,{equals:!1}),[ee,te]=A(d?`ready`:`unresolved`);T&&Be(()=>{for(let e of p.keys())e.decrement();p.clear(),E&&o&&E.promises.delete(o),o=null}),x.context&&(c=x.getNextContextId(),a.ssrLoadFrom===`initial`?s=a.initialValue:x.load&&x.has(c)&&(s=x.load(c)));function ne(e,t,n,r){return o===e&&(o=null,r!==void 0&&(d=!0),(e===s||t===s)&&a.onHydrated&&queueMicrotask(()=>a.onHydrated(r,{value:t})),s=ke,E&&e&&l?(E.promises.delete(e),l=!1,N(()=>{E.running=!0,re(t,n)},!1)):re(t,n)),t}function re(e,t){N(()=>{t===void 0&&h(()=>e),te(t===void 0?d?`ready`:`unresolved`:`errored`),_(t);for(let e of p.keys())e.decrement();p.clear()},!1)}function b(){let e=Xe&&Je(Xe),t=m(),n=g();if(n!==void 0&&!o)throw n;return D&&!D.user&&e&&Me(()=>{v(),o&&(e.resolved&&E&&l?E.promises.add(o):p.has(e)||(e.increment(),p.add(e)))}),t}function ie(e=!0){if(e!==!1&&u)return;u=!1;let t=f?f():r;if(l=E&&E.running,t==null||t===!1){ne(o,M(m));return}E&&o&&E.promises.delete(o);let n,a=s===ke?M(()=>{try{return i(t,{value:m(),refetching:e})}catch(e){n=e}}):s;if(n!==void 0){ne(o,void 0,ut(n),t);return}return Fe(a)?(o=a,`v`in a?(a.s===1?ne(o,a.v,void 0,t):ne(o,void 0,ut(a.v),t),a):(u=!0,queueMicrotask(()=>u=!1),N(()=>{te(d?`refreshing`:`pending`),y()},!1),a.then(e=>ne(a,e,void 0,t),e=>ne(a,void 0,ut(e),t)))):(ne(o,a,void 0,t),a)}Object.defineProperties(b,{state:{get:()=>ee()},error:{get:()=>g()},loading:{get(){let e=ee();return e===`pending`||e===`refreshing`}},latest:{get(){if(!d)return b();let e=g();if(e&&!o)throw e;return m()}}});let ae=T;return f?Me(()=>(ae=T,ie(!1))):ie(!1),[b,{refetch:e=>Ue(ae,()=>ie(e)),mutate:h}]}function Le(e){return N(e,!1)}function M(e){if(D===null)return e();let t=D;D=null;try{return e()}finally{D=t}}function Re(e,t,n){let r=Array.isArray(e),i,a=n&&n.defer;return n=>{let o;if(r){o=Array(e.length);for(let t=0;t<e.length;t++)o[t]=e[t]()}else o=e();if(a)return a=!1,n;let s=M(()=>t(o,i,n));return i=o,s}}function ze(e){Pe(()=>M(e))}function Be(e){return T===null||(T.cleanups===null?T.cleanups=[e]:T.cleanups.push(e)),e}function Ve(){return D}function He(){return T}function Ue(e,t){let n=T,r=D;T=e,D=null;try{return N(t,!0)}catch(e){ft(e)}finally{T=n,D=r}}var[We,Ge]=A(!1);function Ke(e){k.push.apply(k,e),e.length=0}function qe(e,t){let n=Symbol(`context`);return{id:n,Provider:mt(n),defaultValue:e}}function Je(e){let t;return T&&T.context&&(t=T.context[e.id])!==void 0?t:e.defaultValue}function Ye(e){let t=j(e),n=j(()=>pt(t()));return n.toArray=()=>{let e=n();return Array.isArray(e)?e:e==null?[]:[e]},n}var Xe;function Ze(){return Xe||=qe()}function Qe(){let e=E&&E.running;if(this.sources&&(e?this.tState:this.state)){if((e?this.tState:this.state)===w)et(this);else{let e=O;O=null,N(()=>st(this),!1),O=e}}if(D){let e=this.observers;if(!e||e[e.length-1]!==D){let t=e?e.length:0;D.sources?(D.sources.push(this),D.sourceSlots.push(t)):(D.sources=[this],D.sourceSlots=[t]),e?(e.push(D),this.observerSlots.push(D.sources.length-1)):(this.observers=[D],this.observerSlots=[D.sources.length-1])}}return e&&E.sources.has(this)?this.tValue:this.value}function $e(e,t,n){let r=E&&E.running&&E.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(r,t)){if(E){let r=E.running;(r||!n&&E.sources.has(e))&&(E.sources.add(e),e.tValue=t),r||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&N(()=>{for(let t=0;t<e.observers.length;t+=1){let n=e.observers[t],r=E&&E.running;r&&E.disposed.has(n)||((r?!n.tState:!n.state)&&(n.pure?O.push(n):k.push(n),n.observers&&ct(n)),r?n.tState=w:n.state=w)}if(O.length>1e6)throw O=[],Error()},!1)}return t}function et(e){if(!e.fn)return;P(e);let t=Ae;tt(e,E&&E.running&&E.sources.has(e)?e.tValue:e.value,t),E&&!E.running&&E.sources.has(e)&&queueMicrotask(()=>{N(()=>{E&&(E.running=!0),D=T=e,tt(e,e.tValue,t),D=T=null},!1)})}function tt(e,t,n){let r,i=T,a=D;D=T=e;try{r=e.fn(t)}catch(t){return e.pure&&(E&&E.running?(e.tState=w,e.tOwned&&e.tOwned.forEach(P),e.tOwned=void 0):(e.state=w,e.owned&&e.owned.forEach(P),e.owned=null)),e.updatedAt=n+1,ft(t)}finally{D=a,T=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&`observers`in e?$e(e,r,!0):E&&E.running&&e.pure?(E.sources.has(e)||(e.value=r),E.sources.add(e),e.tValue=r):e.value=r,e.updatedAt=n)}function nt(e,t,n,r=w,i){let a={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:T,context:T?T.context:null,pure:n};return E&&E.running&&(a.state=0,a.tState=r),T===null||T!==Oe&&(E&&E.running&&T.pure?T.tOwned?T.tOwned.push(a):T.tOwned=[a]:T.owned?T.owned.push(a):T.owned=[a]),a}function rt(e){let t=E&&E.running;if((t?e.tState:e.state)===0)return;if((t?e.tState:e.state)===De)return st(e);if(e.suspense&&M(e.suspense.inFallback))return e.suspense.effects.push(e);let n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Ae);){if(t&&E.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let r=n.length-1;r>=0;r--){if(e=n[r],t){let t=e,i=n[r+1];for(;(t=t.owner)&&t!==i;)if(E.disposed.has(t))return}if((t?e.tState:e.state)===w)et(e);else if((t?e.tState:e.state)===De){let t=O;O=null,N(()=>st(e,n[0]),!1),O=t}}}function N(e,t){if(O)return e();let n=!1;t||(O=[]),k?n=!0:k=[],Ae++;try{let t=e();return it(n),t}catch(e){n||(k=null),O=null,ft(e)}}function it(e){if(O&&=(at(O),null),e)return;let t;if(E){if(!E.promises.size&&!E.queue.size){let e=E.sources,n=E.disposed;k.push.apply(k,E.effects),t=E.resolve;for(let e of k)`tState`in e&&(e.state=e.tState),delete e.tState;E=null,N(()=>{for(let e of n)P(e);for(let t of e){if(t.value=t.tValue,t.owned)for(let e=0,n=t.owned.length;e<n;e++)P(t.owned[e]);t.tOwned&&(t.owned=t.tOwned),delete t.tValue,delete t.tOwned,t.tState=0}Ge(!1)},!1)}else if(E.running){E.running=!1,E.effects.push.apply(E.effects,k),k=null,Ge(!0);return}}let n=k;k=null,n.length&&N(()=>Ee(n),!1),t&&t()}function at(e){for(let t=0;t<e.length;t++)rt(e[t])}function ot(e){let t,n=0;for(t=0;t<e.length;t++){let r=e[t];r.user?e[n++]=r:rt(r)}if(x.context){if(x.count){x.effects||=[],x.effects.push(...e.slice(0,n));return}S()}for(x.effects&&(x.done||!x.count)&&(e=[...x.effects,...e],n+=x.effects.length,delete x.effects),t=0;t<n;t++)rt(e[t])}function st(e,t){let n=E&&E.running;n?e.tState=0:e.state=0;for(let r=0;r<e.sources.length;r+=1){let i=e.sources[r];if(i.sources){let e=n?i.tState:i.state;e===w?i!==t&&(!i.updatedAt||i.updatedAt<Ae)&&rt(i):e===De&&st(i,t)}}}function ct(e){let t=E&&E.running;for(let n=0;n<e.observers.length;n+=1){let r=e.observers[n];(t?!r.tState:!r.state)&&(t?r.tState=De:r.state=De,r.pure?O.push(r):k.push(r),r.observers&&ct(r))}}function P(e){let t;if(e.sources)for(;e.sources.length;){let t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){let e=r.pop(),i=t.observerSlots.pop();n<r.length&&(e.sourceSlots[i]=n,r[n]=e,t.observerSlots[n]=i)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)P(e.tOwned[t]);delete e.tOwned}if(E&&E.running&&e.pure)lt(e,!0);else if(e.owned){for(t=e.owned.length-1;t>=0;t--)P(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}E&&E.running?e.tState=0:e.state=0}function lt(e,t){if(t||(e.tState=0,E.disposed.add(e)),e.owned)for(let t=0;t<e.owned.length;t++)lt(e.owned[t])}function ut(e){return e instanceof Error?e:Error(typeof e==`string`?e:`Unknown error`,{cause:e})}function dt(e,t,n){try{for(let n of t)n(e)}catch(e){ft(e,n&&n.owner||null)}}function ft(e,t=T){let n=Te&&t&&t.context&&t.context[Te],r=ut(e);if(!n)throw r;k?k.push({fn(){dt(r,n,t)},state:w}):dt(r,n,t)}function pt(e){if(typeof e==`function`&&!e.length)return pt(e());if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++){let r=pt(e[n]);if(Array.isArray(r)){if(r.length<32768)t.push.apply(t,r);else for(let e=0;e<r.length;e++)t.push(r[e])}else t.push(r)}return t}return e}function mt(e,t){return function(t){let n;return Ne(()=>n=M(()=>(T.context={...T.context,[e]:t.value},Ye(()=>t.children))),void 0),n}}var ht=Symbol(`fallback`);function gt(e){for(let t=0;t<e.length;t++)e[t]()}function _t(e,t,n={}){let r=[],i=[],a=[],o=0,s=t.length>1?[]:null;return Be(()=>gt(a)),()=>{let c=e()||[],l=c.length,u,d;return c[Ce],M(()=>{let e,t,p,m,h,g,_,v,y;if(l===0)o!==0&&(gt(a),a=[],r=[],i=[],o=0,s&&=[]),n.fallback&&(r=[ht],i[0]=je(e=>(a[0]=e,n.fallback())),o=1);else if(o===0){for(i=Array(l),d=0;d<l;d++)r[d]=c[d],i[d]=je(f);o=l}else{for(p=Array(l),m=Array(l),s&&(h=Array(l)),g=0,_=Math.min(o,l);g<_&&r[g]===c[g];g++);for(_=o-1,v=l-1;_>=g&&v>=g&&r[_]===c[v];_--,v--)p[v]=i[_],m[v]=a[_],s&&(h[v]=s[_]);for(e=new Map,t=Array(v+1),d=v;d>=g;d--)y=c[d],u=e.get(y),t[d]=u===void 0?-1:u,e.set(y,d);for(u=g;u<=_;u++)y=r[u],d=e.get(y),d!==void 0&&d!==-1?(p[d]=i[u],m[d]=a[u],s&&(h[d]=s[u]),d=t[d],e.set(y,d)):a[u]();for(d=g;d<l;d++)d in p?(i[d]=p[d],a[d]=m[d],s&&(s[d]=h[d],s[d](d))):i[d]=je(f);i=i.slice(0,o=l),r=c.slice(0)}return i});function f(e){if(a[d]=e,s){let[e,n]=A(d);return s[d]=n,t(c[d],e)}return t(c[d])}}}function vt(e,t){return M(()=>e(t||{}))}function yt(){return!0}var bt={get(e,t,n){return t===C?n:e.get(t)},has(e,t){return t===C||e.has(t)},set:yt,deleteProperty:yt,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:yt,deleteProperty:yt}},ownKeys(e){return e.keys()}};function xt(e){return(e=typeof e==`function`?e():e)?e:{}}function St(){for(let e=0,t=this.length;e<t;++e){let t=this[e]();if(t!==void 0)return t}}function Ct(...e){let t=!1;for(let n=0;n<e.length;n++){let r=e[n];t||=!!r&&C in r,e[n]=typeof r==`function`?(t=!0,j(r)):r}if(Se&&t)return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){let r=xt(e[n])[t];if(r!==void 0)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in xt(e[n]))return!0;return!1},keys(){let t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(xt(e[n])));return[...new Set(t)]}},bt);let n={},r=Object.create(null);for(let t=e.length-1;t>=0;t--){let i=e[t];if(!i)continue;let a=Object.getOwnPropertyNames(i);for(let e=a.length-1;e>=0;e--){let t=a[e];if(t===`__proto__`||t===`constructor`)continue;let o=Object.getOwnPropertyDescriptor(i,t);if(!r[t])r[t]=o.get?{enumerable:!0,configurable:!0,get:St.bind(n[t]=[o.get.bind(i)])}:o.value===void 0?void 0:o;else{let e=n[t];e&&(o.get?e.push(o.get.bind(i)):o.value!==void 0&&e.push(()=>o.value))}}}let i={},a=Object.keys(r);for(let e=a.length-1;e>=0;e--){let t=a[e],n=r[t];n&&n.get?Object.defineProperty(i,t,n):i[t]=n?n.value:void 0}return i}function wt(e,...t){let n=t.length;if(Se&&C in e){let r=n>1?t.flat():t[0],i=new Set,a=t.map(t=>{let n=t.filter(e=>!i.has(e)&&(i.add(e),!0));return new Proxy({get(t){return n.includes(t)?e[t]:void 0},has(t){return n.includes(t)&&t in e},keys(){return n.filter(t=>t in e)}},bt)});return a.push(new Proxy({get(t){return r.includes(t)?void 0:e[t]},has(t){return!r.includes(t)&&t in e},keys(){return Object.keys(e).filter(e=>!r.includes(e))}},bt)),a}let r=[];for(let e=0;e<=n;e++)r[e]={};for(let i of Object.getOwnPropertyNames(e)){let a=n;for(let e=0;e<t.length;e++)if(t[e].includes(i)){a=e;break}let o=Object.getOwnPropertyDescriptor(e,i);!o.get&&!o.set&&o.enumerable&&o.writable&&o.configurable?r[a][i]=o.value:Object.defineProperty(r[a],i,o)}return r}function Tt(e){let t,n,r=()=>{if(!n){let r=n=e();r.then(e=>{t=()=>e.default},()=>{n===r&&(n=void 0)})}return n},i=e=>{let n=x.context;if(n){let[e,i]=A();x.count||=0,x.count++,r().then(e=>{!x.done&&S(n),x.count--,i(()=>e.default),S()},e=>{!x.done&&S(n),x.count--,i(()=>()=>{throw e}),S()}),t=e}else if(!t){let[e]=Ie(()=>r().then(e=>e.default));t=e,Be(()=>t=void 0)}let i;return j(()=>(i=t?.())?M(()=>{if(!n||x.done)return i(e);let t=x.context;S(n);let r=i(e);return S(t),r}):``)};return i.preload=()=>r(),i}var Et=e=>`Stale read from <${e}>.`;function Dt(e){let t=`fallback`in e&&{fallback:()=>e.fallback};return j(_t(()=>e.each,e.children,t||void 0))}function Ot(e){let t=e.keyed,n=j(()=>e.when,void 0,void 0),r=t?n:j(n,void 0,{equals:(e,t)=>!e==!t});return j(()=>{let i=r();if(i){let a=e.children;return typeof a==`function`&&a.length>0?M(()=>a(t?i:()=>{if(!M(r))throw Et(`Show`);return n()})):a}return e.fallback},void 0,void 0)}function kt(e){let t=Ye(()=>e.children),n=j(()=>{let e=t(),n=Array.isArray(e)?e:[e],r=()=>void 0;for(let e=0;e<n.length;e++){let t=e,i=n[e],a=r,o=j(()=>a()?void 0:i.when,void 0,void 0),s=i.keyed?o:j(o,void 0,{equals:(e,t)=>!e==!t});r=()=>a()||(s()?[t,o,i]:void 0)}return r});return j(()=>{let t=n()();if(!t)return e.fallback;let[r,i,a]=t,o=a.children;return typeof o==`function`&&o.length>0?M(()=>o(a.keyed?i():()=>{if(M(n)()?.[0]!==r)throw Et(`Match`);return i()})):o},void 0,void 0)}function At(e){return e}var jt=qe();function Mt(e){let t=0,n,r,i,a,o,[s,c]=A(!1),l=Ze(),u={increment:()=>{++t===1&&c(!0)},decrement:()=>{--t===0&&c(!1)},inFallback:s,effects:[],resolved:!1},d=He();if(x.context&&x.load){let e=x.getContextId(),t=x.load(e);if(t&&(typeof t!=`object`||t.s!==1?i=t:x.gather(e)),i&&i!==`$$f`){let[t,n]=A(void 0,{equals:!1});a=t,i.then(()=>{if(x.done)return n();x.gather(e),S(r),n(),S()},e=>{o=e,n()})}}let f=Je(jt);f&&(n=f.register(u.inFallback));let p;return Be(()=>p&&p()),vt(l.Provider,{value:u,get children(){return j(()=>{if(o)throw o;if(r=x.context,a){a(),a=void 0;return}r&&i===`$$f`&&S();let t=j(()=>e.children);return j(a=>{let o=u.inFallback(),{showContent:s=!0,showFallback:c=!0}=n?n():{};if((!o||i&&i!==`$$f`)&&s)return u.resolved=!0,p&&p(),p=r=i=void 0,Ke(u.effects),t();if(c)return p?a:je(t=>(p=t,r&&=(S({id:r.id+`F`,count:0}),void 0),e.fallback),d)})})}})}var{Store:Nt,termFromId:Pt}=g;function Ft(){return new Nt}function It(e,{termText:t,termOffsets:n,quadTable:r},{chunkSize:i=25e3,onProgress:a=null}={}){let o=n.length-1,s=Array(o);for(let e=0;e<o;e++)s[e]=Pt(t.substring(n[e],n[e+1]));let c=e._entityIndex;if(c&&c._termToNewNumericId)for(let e of s)c._termToNewNumericId(e);let l=e=>s[e],u=r.length/4;return new Promise(t=>{let n=0,o=()=>{let s=Math.min(u,n+i);for(;n<s;n++)e.addQuad(l(r[n*4]),l(r[n*4+1]),l(r[n*4+2]),l(r[n*4+3]));a&&a(n,u),n<u?setTimeout(o,0):t(e)};o()})}function Lt(e,{setScope:t=null,lang:n=null,onProgress:r=null,onStore:i=null}={}){return new Promise((a,o)=>{let s;try{s=new Worker(new URL(``+new URL(`model-worker-Ci9MfcHE.js`,import.meta.url).href,``+import.meta.url),{type:`module`})}catch(e){o(e);return}let c=!1,u=e=>{s.terminate(),c?i&&i(null):o(Error(e))};s.onerror=e=>u(e&&e.message?e.message:`worker kon niet starten`),s.onmessage=e=>{let t=e.data||{};if(t.type===`progress`){!c&&r&&r(t);return}if(t.type===`model`){c=!0,l(t.prefixes),a(t);return}if(t.type===`store`){s.terminate(),i&&i(t);return}t.type===`error`&&u(t.message)},s.postMessage({sources:e,setScope:t,lang:n,profiel:de()})})}var{quad:Rt}=r,zt=`http://www.w3.org/ns/odrl/2/`,Bt=`http://purl.org/dc/terms/`,Vt=`https://schema.org/`,Ht=[],F=`PREFIX odrl: <http://www.w3.org/ns/odrl/2/>
PREFIX dct:  <http://purl.org/dc/terms/>
PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX schema: <https://schema.org/>
`;async function Ut(e,t,n,r){let i=await(r||globalThis.fetch)(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`,Accept:n},body:`query=`+encodeURIComponent(t)});if(!i.ok){let e=``;try{e=(await i.text()).slice(0,200)}catch{}throw Error(`SPARQL HTTP ${i.status}${e?` — `+e:``}`)}return i}async function I(e,t,n){let r=await(await Ut(e,t,`application/sparql-results+json`,n)).json();return r&&r.results&&r.results.bindings||[]}async function Wt(e,t,n){return(await Ut(e,t,`text/turtle`,n)).text()}function Gt(e){return!!e&&e.termType===`BlankNode`}function Kt(e,t){let n=[],r=0;for(let t of e){if(Gt(t.subject)||Gt(t.object)){r++;continue}n.push(t)}return r&&console.warn(`SPARQL Update: ${r} ${t}-triple(s) met blank node overgeslagen (DELETE/INSERT DATA staat geen blank nodes toe)`),{kept:n,skipped:r}}var qt=/^[A-Za-z]+(-[A-Za-z0-9]+)*$/;function Jt(e){if(!qt.test(String(e)))throw Error(`ongeldige taal-tag voor SPARQL: `+e)}function Yt(e){e&&(e.termType===`NamedNode`?L(e.value):e.termType===`Literal`&&(e.language&&Jt(e.language),e.datatype&&Yt(e.datatype)))}function Xt(e){let t=new i,n=e.map(e=>(Yt(e.subject),Yt(e.predicate),Yt(e.object),Rt(e.subject,e.predicate,e.object)));return t.quadsToString(n)}function Zt({added:e=[],removed:t=[]}={}){let n=Kt(t,`DELETE`),r=Kt(e,`INSERT`),i=[];return n.kept.length&&i.push(`DELETE DATA {
`+Xt(n.kept)+`}`),r.kept.length&&i.push(`INSERT DATA {
`+Xt(r.kept)+`}`),{query:i.join(`;
`),skipped:n.skipped+r.skipped}}async function Qt(e,t,n){let r=await(n||globalThis.fetch)(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`},body:`update=`+encodeURIComponent(t)});if(!r.ok){let e=``;try{e=(await r.text()).slice(0,200)}catch{}throw Error(`SPARQL update HTTP ${r.status}${e?` — `+e:``}`)}}function L(e){let t=String(e||``);if(!/^[^<>"{}|^`\\\s]+$/.test(t))throw Error(`ongeldige IRI voor SPARQL: `+t);return`<`+t+`>`}function R(e,t){return!t||!t.length?``:`FILTER(${e} NOT IN (${t.map(L).join(`, `)}))`}var $t=m.find(e=>e.id===`prov`);function z(e,t){let n=[...$t.memberPreds.map(n=>`{ ${e} <${n}> ${t} }`),...$t.inverseMemberPreds.map(n=>`{ ${t} <${n}> ${e} }`)];return n.length===1?n[0].replace(/^\{ | \}$/g,``)+` .`:n.join(` UNION `)}var en=t.map(e=>`<${e}>`).join(`|`),tn=(e,t,n,r)=>`  OPTIONAL { ${e} schema:validFrom ${n}_s }
  OPTIONAL { ${e} schema:validThrough ${r}_s }
  OPTIONAL {
    ${e} dct:valid ${t} .
    OPTIONAL { ${t} dcat:startDate ${n}_n }
    OPTIONAL { ${t} dcat:endDate ${r}_n }
  }
  BIND(COALESCE(${n}_s, ${n}_n) AS ${n})
  BIND(COALESCE(${r}_s, ${r}_n) AS ${r})`;function nn(){return`${F}
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
            { ?v ${en} ?vd }
          } GROUP BY ?cX }
        ${z(`?cX`,`?policy`)}
        OPTIONAL { ?cX dct:title ?ctX }
      } GROUP BY ?policy }
  }
  # Datering van de versie: dct:issued (de datum die de versienavigator toont)
  # en de geldingsperiode. Zonder deze takken stond in lijstmodus overal een
  # "—" in de chip. Meer dateringsvormen kent het profiel niet.
  OPTIONAL { ?policy dct:issued ?iss }
${tn(`?policy`,`?vn`,`?vf`,`?vt`)}
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
`}function rn(){return`${F}
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
`}function an(){return`${F}
SELECT ?container ?policy ?containerTitle
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ${z(`?container`,`?policy`)}
  FILTER(isIRI(?container) && isIRI(?policy))
  OPTIONAL { ?container dct:title ?containerTitle }
}
`}function on(){return`${F}
SELECT ?container (COUNT(DISTINCT ?v) AS ?n)
WHERE {
  ${z(`?container`,`?v`)}
  FILTER(isIRI(?container) && isIRI(?v))
  { VALUES ?vt { odrl:Set odrl:Offer odrl:Agreement odrl:Request } ?v a ?vt }
  UNION
  { ?v ${en} ?vd }
}
GROUP BY ?container
`}function sn(){return`${F}
SELECT ?policy ?issued ?validFrom ?validTo ?valid ?revisionOf
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  FILTER(isIRI(?policy))
  OPTIONAL { ?policy dct:issued ?issued }
${tn(`?policy`,`?valid`,`?validFrom`,`?validTo`)}
  OPTIONAL { ?policy prov:wasRevisionOf ?revisionOf }
}
`}function cn(){return`${F}
SELECT DISTINCT ?policy ?offer
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?offer .
  ?offer a odrl:Offer .
  FILTER(isIRI(?policy))
}
`}function ln(){return`${F}
SELECT DISTINCT ?policy ?request
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?policy prov:wasDerivedFrom ?request .
  ?request a odrl:Request .
  FILTER(isIRI(?policy))
}
`}function un(){return`${F}
SELECT DISTINCT ?policy ?agreement
WHERE {
  VALUES ?type { odrl:Set odrl:Offer odrl:Agreement odrl:Request }
  ?policy a ?type .
  ?agreement prov:wasDerivedFrom ?policy .
  ?agreement a odrl:Agreement .
  FILTER(isIRI(?policy))
}
`}function dn(e,t,n,r,i,{lang:a=null,requestRefs:o=[],answeredByRefs:s=[]}={}){let c=e=>e?e.value:null,l=a||oe(),u=(e,t)=>!e||te(t[`xml:lang`]||``,l)<te(e[`xml:lang`]||``,l),d=new Map;for(let e of t||[]){let t=c(e&&e.policy);if(!t||!e.container)continue;let n=d.get(t);n||(n={container:e.container,containerTitle:null},d.set(t,n)),e.containerTitle&&e.container.value===n.container.value&&u(n.containerTitle,e.containerTitle)&&(n.containerTitle=e.containerTitle)}let f=new Map;for(let e of n||[]){let t=c(e&&e.container);t&&e.n&&(f.has(t)||f.set(t,e.n))}let p=[`issued`,`validFrom`,`validTo`,`valid`,`revisionOf`],m=new Map;for(let e of r||[]){let t=c(e&&e.policy);if(!t)continue;let n=m.get(t);n||(n={},m.set(t,n));for(let t of p)!n[t]&&e[t]&&(n[t]=e[t])}let h=new Map;for(let e of i||[]){let t=c(e&&e.policy);t&&e.offer&&(h.has(t)||h.set(t,e.offer))}let g=new Map;for(let e of o||[]){let t=c(e&&e.policy);t&&e.request&&(g.has(t)||g.set(t,e.request))}let _=new Map;for(let e of s||[]){let t=c(e&&e.policy);t&&e.agreement&&(_.has(t)||_.set(t,e.agreement))}let v=[],y=new Map;for(let t of e||[]){if(!t||!t.policy)continue;let e=t.policy.value+`\0`+(c(t.kind)||``),n=y.get(e);n||(n={policy:t.policy},t.kind&&(n.kind=t.kind),y.set(e,n),v.push(n)),t.title&&u(n.title,t.title)&&(n.title=t.title),!n.assignee&&t.assignee?(n.assignee=t.assignee,t.assigneeLabel&&(n.assigneeLabel=t.assigneeLabel)):n.assignee&&t.assigneeLabel&&t.assignee&&t.assignee.value===n.assignee.value&&u(n.assigneeLabel,t.assigneeLabel)&&(n.assigneeLabel=t.assigneeLabel)}for(let e of v){let t=e.policy.value,n=d.get(t);if(n){e.container=n.container,n.containerTitle&&(e.containerTitle=n.containerTitle);let t=f.get(n.container.value);t&&(e.versionCount=t)}let r=m.get(t);if(r)for(let t of p)r[t]&&(e[t]=r[t]);let i=h.get(t);i&&(e.offerRef=i);let a=g.get(t);a&&(e.requestRef=a);let o=_.get(t);o&&(e.answeredByRef=o)}return v}function fn(e){let t=String(e&&e.message||e||``);return/SPARQL HTTP 5\d\d/.test(t)||/\btimed out\b|\btimeout\b/i.test(t)}async function pn(e,t,{lang:n=null}={}){let[r,i,a,o,s,c,l]=await Promise.all([I(e,rn(),t),I(e,an(),t),I(e,on(),t),I(e,sn(),t),I(e,cn(),t),I(e,ln(),t),I(e,un(),t)]);return dn(r,i,a,o,s,{lang:n,requestRefs:c,answeredByRefs:l})}function mn({limitPerKind:e=60}={}){let t=Math.max(1,e|0),n=(e,n)=>`  {
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
`}function hn(){return`${F}
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
${tn(`?version`,`?vn`,`?vf`,`?vt`)}
  OPTIONAL { ?version dct:issued ?iss }
}
GROUP BY ?container ?kind ?version
`}var gn=`http://www.w3.org/ns/odrl/2/`,_n=(e,t)=>`${e} rdf:type ?dt${t} .
      FILTER(!STRSTARTS(STR(?dt${t}), "${gn}"))`,B=`(odrl:permission|odrl:prohibition|odrl:obligation|odrl:duty|odrl:remedy|odrl:consequence|odrl:constraint|odrl:refinement|odrl:action|odrl:target|odrl:rightOperand|dct:valid|odrl:and|odrl:or|odrl:xone|odrl:andSequence|rdf:first|rdf:rest)*`,vn=`rdf:type, dct:title, dct:issued, schema:validFrom, schema:validThrough, dct:valid, odrl:uid, prov:wasRevisionOf, prov:specializationOf, prov:wasDerivedFrom`;function yn(e,{excludeGraphs:t=Ht}={}){let n=L(e),r=(e,r,i,a)=>t&&t.length?`${n} ${B} ${e} .
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
    FILTER(?vp IN (${vn}))
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
`}function bn(e,{excludeGraphs:t=Ht}={}){let n=L(e),r=(e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
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
        ${_n(`?an`,`d`)}
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
      ${_n(`?up`,`e`)}
      ${r(`?g5`,`?up ?upp ?upl .
      FILTER(?upp IN (rdfs:label, skos:prefLabel, dct:title, rdf:type))`)}
    }
  }
}
`}var xn=`PREFIX sh:   <http://www.w3.org/ns/shacl#>
PREFIX dash: <http://datashapes.org/dash#>
PREFIX shui: <http://www.w3.org/ns/shacl-ui/>
`,Sn=`(sh:name|sh:description|sh:order|sh:group|dash:viewer|dash:propertyRole|shui:viewer|shui:propertyRole)`,Cn=`(sh:property|sh:group)*`,wn=`rdfs:label, skos:prefLabel, dct:title, skos:definition, dct:description, rdfs:comment`;function Tn({excludeGraphs:e=Ht,limit:t=200}={}){let n=Math.max(1,t|0),r=(t,n)=>e&&e.length?`GRAPH ${t} { ${n} }
    ${R(t,e)}`:n,i=`{ SELECT DISTINCT ?shape ?tc WHERE {
      ?shape a sh:NodeShape .
      ?shape sh:targetClass ?tc .
      ?shape sh:property/${Sn} ?ann .
      FILTER(isIRI(?tc))
    } LIMIT ${n} }`;return`${F}${xn}
CONSTRUCT {
  ?s ?p ?o .
  ?pad ?lp ?ll .
  ?sub rdfs:subClassOf ?super .
}
WHERE {
  {
    # 1+2. de shape zelf, zijn property-shapes en hun PropertyGroups
    ${i}
    ?shape ${Cn} ?s .
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
    FILTER(?lp IN (${wn}))`)}
  } UNION {
    # 4. de subklasse-ketens die bij een doelklasse uitkomen
    ${i}
    ?sub rdfs:subClassOf+ ?tc .
    ?sub rdfs:subClassOf ?super .
  }
}
`}function En(e,{limit:t=400,excludeGraphs:n=Ht}={}){let r=L(e),i=Math.max(1,t|0),a=(e,t)=>n&&n.length?`GRAPH ${e} { ${t} }
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
`}var Dn=1e3;function On(e,{excludeGraphs:t=Ht,max:n=200,excludeNodes:r=null,maxExclude:i=Dn}={}){let a=[...e||[]].slice(0,Math.max(1,n|0));if(!a.length)return null;let o=[...r||[]];return o.length>Math.max(0,i|0)?null:`${F}
SELECT (COUNT(DISTINCT ?knoop) AS ?n)
WHERE {
  VALUES ?klasse { ${a.map(L).join(` `)} }
  ${((e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
  ${R(e,t)}`:n)(`?g1`,`?knoop rdf:type ?klasse .`)}${o.length?`
  FILTER(?knoop NOT IN (${o.map(L).join(`, `)}))`:``}
}
`}var kn=1e3;function An(e,{excludeGraphs:t=Ht,max:n=kn}={}){let r=[...e||[]];return!r.length||r.length>Math.max(1,n|0)?null:`${F}
CONSTRUCT { ?n ?lp ?lv }
WHERE {
  VALUES ?n { ${r.map(L).join(` `)} }
  ${((e,n)=>t&&t.length?`GRAPH ${e} { ${n} }
  ${R(e,t)}`:n)(`?g1`,`?n ?lp ?lv .
    FILTER(?lp IN (rdfs:label, skos:prefLabel, dct:title))`)}
}
`}function V(e){return String(e).replace(/\\/g,`\\\\`).replace(/"/g,`\\"`).replace(/\n/g,`\\n`).replace(/\r/g,`\\r`).replace(/\t/g,`\\t`)}function jn(e){let t=e&&e[`xml:lang`];return t&&qt.test(t)?`@`+t:``}function H(e){return e?e.value:null}var Mn={set:zt+`Set`,offer:zt+`Offer`,agreement:zt+`Agreement`,request:zt+`Request`};function Nn(e,t,n,r){let i=r&&r.type,a=[];return t||n?(t&&a.push(`<${e}> <${Vt}validFrom> "${V(t)}" .`),n&&a.push(`<${e}> <${Vt}validThrough> "${V(n)}" .`)):i===`literal`&&a.push(`<${e}> <${Bt}valid> "${V(r.value)}" .`),a}function Pn(e){let t=new Set,n=e=>e&&e.type===`uri`&&/^[^<>"{}|^`\\\s]+$/.test(e.value)?e.value:null;for(let r of e||[]){let e=n(r.policy);if(!e)continue;let i=Mn[H(r.kind)]||Mn.set;t.add(`<${e}> a <${i}> .`);let a=H(r.title);if(a){let n=jn(r.title);t.add(`<${e}> <http://purl.org/dc/terms/title> "${V(a)}"${n} .`)}let o=H(r.issued);o&&t.add(`<${e}> <${Bt}issued> "${V(o)}" .`);for(let n of Nn(e,H(r.validFrom),H(r.validTo),r.valid))t.add(n);let s=n(r.revisionOf);s&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasRevisionOf> <${s}> .`);let c=n(r.offerRef);c&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${c}> .`);let l=n(r.requestRef);l&&t.add(`<${e}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${l}> .`);let u=n(r.answeredByRef);u&&t.add(`<${u}> <http://www.w3.org/ns/prov#wasDerivedFrom> <${e}> .`);let d=n(r.assignee);if(d){t.add(`<${e}> <${zt}assignee> <${d}> .`);let n=H(r.assigneeLabel);if(n){let e=jn(r.assigneeLabel);t.add(`<${d}> <http://www.w3.org/2000/01/rdf-schema#label> "${V(n)}"${e} .`)}}let f=n(r.container);if(f){t.add(`<${f}> a <${ye}> .`),t.add(`<${e}> <${_e}> <${f}> .`);let n=parseInt(H(r.versionCount)||``,10);Number.isFinite(n)&&n>0&&t.add(`<${f}> <${ne}> "${n}" .`);let i=H(r.containerTitle);if(i){let e=jn(r.containerTitle);t.add(`<${f}> <http://purl.org/dc/terms/title> "${V(i)}"${e} .`)}}}return[...t].join(`
`)+(t.size?`
`:``)}function Fn(e){let t=new Set,n=e=>e&&e.type===`uri`&&/^[^<>"{}|^`\\\s]+$/.test(e.value)?e.value:null,r=(e,n,r)=>{let i=H(r);if(!i)return;let a=jn(r);t.add(`<${e}> <${n}> "${V(i)}"${a} .`)};for(let i of e||[]){let e=n(i.container),a=n(i.version);if(!e||!a)continue;let o=Mn[H(i.kind)];if(o){t.add(`<${e}> a <${ye}> .`),t.add(`<${e}> <${Bt}type> <${o}> .`),t.add(`<${a}> <${_e}> <${e}> .`),r(e,Bt+`title`,i.containerTitle),r(a,Bt+`title`,i.title);for(let e of Nn(a,H(i.validFrom),H(i.validTo),i.valid))t.add(e);r(a,Bt+`issued`,i.issued)}}return[...t].join(`
`)+(t.size?`
`:``)}var In=[];function Ln(e,t){if(t&&t.length)return[...t];if(!e)return[];let n=String(e).replace(/[?#].*$/,``),r=In.find(e=>e.match.test(n));return r?[...r.excludeGraphs]:[]}function Rn(e,t){let n=String(e||``).trim();if(!n)return`leeg bronadres`;let r=t||(typeof location<`u`&&location.href?location.href:`https://x.invalid/`),i;try{i=new URL(n,r)}catch{return`geen geldig adres: `+n}return i.protocol===`http:`||i.protocol===`https:`?null:`bronadres met een niet-ondersteund schema (${i.protocol}): ${n} — een bron moet via http(s) bereikbaar zijn`}function zn(e){let t=String(e||``).trimStart().slice(0,200).toLowerCase();return t.startsWith(`<!doctype html`)||t.startsWith(`<html`)||t.startsWith(`<?xml-stylesheet`)}function Bn(e){let t=String(e||``).trim().replace(/[?#].*$/,``);return t?/\.(ttl|turtle|nt|jsonld|json)$/i.test(t)?`data`:/\/(sparql|query)$/i.test(t)?`sparql`:null:null}async function Vn(e,t){let n=await t(e,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`,Accept:`application/sparql-results+json`},body:`query=ASK%20%7B%7D`});if(!n.ok)return!1;try{let e=await n.json();return typeof e==`object`&&!!e&&typeof e.boolean==`boolean`}catch{return!1}}async function Hn(e,t){let n=t||globalThis.fetch,r=Rn(e);if(r)return{kind:`error`,url:e,code:`schema`,message:r};let i=Bn(e);if(i===`sparql`)return{kind:`sparql`,url:e};if(i!==`data`)try{if(await Vn(e,n))return{kind:`sparql`,url:e}}catch{}try{let t=await n(e);if(!t.ok)return{kind:`error`,url:e,code:`unsupported`,message:`HTTP `+t.status+` bij `+e};let r=await t.text(),i=ve(e,r);return i===`rdfxml`?{kind:`error`,url:e,code:`unsupported`,message:`formaat niet ondersteund (RDF/XML): `+e}:zn(r)?{kind:`error`,url:e,code:`unsupported`,message:`dit adres levert een webpagina, geen RDF: `+e}:{kind:`data`,url:e,content:r,format:i}}catch(t){return{kind:`error`,url:e,code:`unreachable`,message:`bron niet bereikbaar (CORS of offline?): `+e+` — `+t.message}}}var Un=me,Wn=ve,Gn=Hn,Kn=u,qn=Lt,Jn=n,Yn=v,Xn=Ft,Zn=It,Qn=re,$n=e,er=le,tr=c,nr=pe,rr=ce,ir=d,ar=ae,or=f,sr=60,cr=10,lr=_,ur=p,dr=ee,U=ge,fr=s,pr=h,mr=a,hr=4,gr=I,_r=Wt,vr=nn,yr=mn,br=hn,xr=yn,Sr=Tn,Cr=En,wr=An,Tr=On,Er=bn,Dr=Pn,Or=Fn,kr=fn,Ar=pn,jr=Ln,Mr=l,Nr=o,Pr=`data/`,Fr=[`generiek/1-generiek-drietraps.ttl`,`generiek/7-dekking-generiek.ttl`,`generiek/archief-partof.ttl`,`generiek/keten-offer-request-agreement.ttl`,`vlierdam/vocabulaire.ttl`,`vlierdam/velden.ttl`,`vlierdam/beleid.ttl`,`vlierdam/openftv.ttl`];function Ir(){return y()}function Lr(){return`?`+Fr.map(e=>`src=${encodeURIComponent(Pr+e)}`).join(`&`)}function Rr(e){let t=String(e||``);return Ir().find(e=>t===`data/`+e||t.endsWith(`/`+e))||null}var{DataFactory:zr,Store:Br,Parser:Vr}=g,{namedNode:W}=zr,G=`http://www.w3.org/ns/shacl#`,Hr=`http://datashapes.org/dash#`,Ur=`http://www.w3.org/ns/shacl-ui/`,Wr=`http://www.w3.org/1999/02/22-rdf-syntax-ns#`,Gr=`http://www.w3.org/2000/01/rdf-schema#`,Kr=`http://www.w3.org/2004/02/skos/core#`,qr=(e,t,n)=>e.getQuads(t,W(n),null,null).map(e=>e.object),K=(e,t,n)=>qr(e,t,n)[0]||null,Jr=e=>!!e&&e.termType===`Literal`;function Yr(e,t,n){let r=K(e,t,Hr+n)||K(e,t,Ur+n);return!r||r.termType!==`NamedNode`?null:f(r.value).replace(/^IRIViewer$/,`URIViewer`)}function Xr(e,t){let n=K(e,t,G+`path`),r=null,i=!1;if(n&&n.termType===`NamedNode`)r=n.value;else if(n){let t=K(e,n,G+`inversePath`);t&&t.termType===`NamedNode`&&(r=t.value,i=!0)}let a=K(e,t,G+`order`),o=a&&Number.isFinite(parseFloat(a.value))?parseFloat(a.value):null,s=K(e,t,G+`group`);return{path:r,inverse:i,names:qr(e,t,G+`name`).filter(Jr),descriptions:qr(e,t,G+`description`).filter(Jr),order:o,group:s&&s.termType===`NamedNode`?s.value:null,pattern:(K(e,t,G+`pattern`)||{}).value||null,viewer:Yr(e,t,`viewer`),role:Yr(e,t,`propertyRole`)}}function Zr(e){let t=new Set,n=[];for(let r of e.getQuads(null,W(Wr+`type`),W(G+`NodeShape`),null)){let i=r.subject.value;if(t.has(i))continue;t.add(i);let a=K(e,r.subject,G+`targetClass`);a&&a.termType===`NamedNode`&&n.push({iri:i,store:e,targetClass:a.value,properties:qr(e,r.subject,G+`property`).map(t=>Xr(e,t))})}return n}function Qr(e,t){let n=new Set([t]),r=!0;for(;r;){r=!1;for(let t of e.getQuads(null,W(Gr+`subClassOf`),null,null))n.has(t.object.value)&&!n.has(t.subject.value)&&(n.add(t.subject.value),r=!0)}return n}var $r=[`name`,`description`,`order`,`group`];function ei(e){return e.properties.some(e=>e.viewer||e.role||$r.some(t=>t===`name`?e.names.length:t===`description`?e.descriptions.length:e[t]!==null))}var ti=ei;function ni(e,t,n,r=[]){let i=typeof t==`string`?W(t):t,a=new Set(qr(e,i,Wr+`type`).filter(e=>e.termType===`NamedNode`).map(e=>e.value));if(!a.size)return null;let o=[],s=new Set;for(let e of n)s.add(e.targetClass);for(let t of[...n,...r.filter(e=>!s.has(e.targetClass))]){if(a.has(t.targetClass)){o.push([0,+!ti(t),t]);continue}let n=Qr(e,t.targetClass);[...a].some(e=>n.has(e))&&o.push([1,+!ti(t),t])}return o.length?(o.sort((e,t)=>e[0]-t[0]||e[1]-t[1]),o[0][2]):null}function ri(e,t,n=[]){let r=new Set;for(let e of t)r.add(e.targetClass);let i=[...t,...n.filter(e=>!r.has(e.targetClass))],a=new Map;return i.forEach((t,n)=>{let r=+!ti(t),i=(e,i)=>{let o=a.get(e);(!o||i<o.rang||i===o.rang&&r<o.vorm)&&a.set(e,{rang:i,vorm:r,idx:n,shape:t})};i(t.targetClass,0);for(let n of Qr(e,t.targetClass))n!==t.targetClass&&i(n,1)}),a}function ii(e,t,n){if(!n||!n.size)return null;let r=typeof t==`string`?W(t):t;if(!r)return null;let i=null;for(let t of e.getQuads(r,W(Wr+`type`),null,null)){if(t.object.termType!==`NamedNode`)continue;let e=n.get(t.object.value);e&&(!i||e.rang<i.rang||e.rang===i.rang&&e.vorm<i.vorm||e.rang===i.rang&&e.vorm===i.vorm&&e.idx<i.idx)&&(i=e)}return i?i.shape:null}function ai(e,t,n){if(!n)return[];let r=typeof t==`string`?W(t):t;return r&&n.properties.filter(e=>e.role===`KeyInfoRole`).sort((e,t)=>(e.order??1/0)-(t.order??1/0)).map(t=>gi(e,r,t)).find(e=>e.length)||[]}function oi(e,t){if(!t||!t.targetClass)return null;let n=W(t.targetClass),r=t.store&&t.store!==e?[e,t.store]:[e],i=e=>{for(let t of r){let r=b(qr(t,n,e).filter(Jr));if(r)return r}return null},a=i(Kr+`altLabel`),o=i(Gr+`label`)||i(Kr+`prefLabel`)||i(`http://purl.org/dc/terms/title`)||f(t.targetClass);return o?{text:a||o,vol:o,afgekort:!!a}:null}function si(e,t){let n=new Set;for(let e of t)ei(e)&&n.add(e.targetClass);if(!n.size)return n;let r=e.getQuads(null,W(Gr+`subClassOf`),null,null),i=!0;for(;i;){i=!1;for(let e of r)n.has(e.object.value)&&!n.has(e.subject.value)&&(n.add(e.subject.value),i=!0)}return n}function ci(e,t,n){if(!n||!n.size)return!1;let r=typeof t==`string`?W(t):t;return r?e.getQuads(r,W(Wr+`type`),null,null).some(e=>e.object.termType===`NamedNode`&&n.has(e.object.value)):!1}function li(e,t,{skipGraphs:n}={}){let r=new Set,i=new Set;if(!t||!t.size)return{iris:r,blanks:0};let a=n&&n.length?new Set(n):null;for(let n of e.getQuads(null,W(Wr+`type`),null,null))n.object.termType===`NamedNode`&&t.has(n.object.value)&&(a&&n.graph&&a.has(n.graph.value)||(n.subject.termType===`NamedNode`?r:i).add(n.subject.value));return{iris:r,blanks:i.size}}function ui(e,t){let n=li(e,t);return n.iris.size+n.blanks}function di(e,t,n){return n.path?n.inverse?e.getQuads(null,W(n.path),t,null).map(e=>e.subject):e.getQuads(t,W(n.path),null,null).map(e=>e.object):[]}function fi(e,t){return b(t.names)||(t.path?se(e,W(t.path)):``)}function pi(e,t){return b(t.descriptions)||(t.path?he(e,W(t.path)):``)||null}function mi(e,t){return!t||t.termType!==`NamedNode`?!1:e.countQuads(t,null,null,null)===0}function hi(e,t,n){let r=()=>({kind:`label`,text:se(e,t),iri:t.termType===`NamedNode`?t.value:null,external:mi(e,t)});switch(n.viewer){case`URIViewer`:case`HyperlinkViewer`:return{kind:`link`,text:t.value,iri:t.termType===`NamedNode`?t.value:null};case`LabelViewer`:return r();case`LiteralViewer`:return{kind:`text`,text:t.value,iri:null};default:return t.termType===`NamedNode`?r():{kind:`text`,text:t.value,iri:null}}}function gi(e,t,n){let r=di(e,t,n);if(!r.length)return[];let i=r.filter(e=>Jr(e)&&e.language);if(i.length){let t=b(i),a=r.filter(e=>!(Jr(e)&&e.language));return[...t?[{kind:`text`,text:t,iri:null}]:[],...a.map(t=>hi(e,t,n))]}if(n.viewer===`LangStringViewer`){let e=b(r.filter(Jr));return e?[{kind:`text`,text:e,iri:null}]:[]}let a=[],o=new Set;for(let t of r){let r=hi(e,t,n),i=r.kind+`\0`+r.text;o.has(i)||(o.add(i),a.push(r))}return a}function _i(e,t,n){let r=typeof t==`string`?W(t):t,i=t=>n.properties.filter(e=>e.role===t).sort((e,t)=>(e.order??1/0)-(t.order??1/0)).map(t=>gi(e,r,t)).find(e=>e.length)||[],a=i(`LabelRole`),o=i(`DescriptionRole`),s=a.length?a[0].text:se(e,r),c=new Set([Gr+`label`,`http://www.w3.org/2004/02/skos/core#prefLabel`,`http://purl.org/dc/terms/title`]),l=(e,t)=>!a.length&&!e.inverse&&c.has(e.path)&&t.length===1&&t[0].text===s,u=n.store||e,d=new Map,f=[];for(let t of n.properties){if(t.role===`LabelRole`||t.role===`DescriptionRole`||t.role===`KeyInfoRole`||!t.path)continue;let n=gi(e,r,t);if(l(t,n))continue;let i={kind:`row`,label:fi(e,t),description:pi(e,t),path:t.path,inverse:t.inverse,pattern:t.pattern,viewer:t.viewer,values:n,order:t.order};if(t.group){let e=d.get(t.group);if(!e){let n=K(u,W(t.group),G+`order`);e={kind:`group`,label:se(u,W(t.group)),rows:[],order:n&&Number.isFinite(parseFloat(n.value))?parseFloat(n.value):null},d.set(t.group,e),f.push(e)}e.rows.push(i)}else f.push(i)}let p=e=>e.map((e,t)=>[e,t]).sort((e,t)=>(e[0].order??1/0)-(t[0].order??1/0)||e[1]-t[1]).map(([e])=>e);for(let e of d.values())e.rows=p(e.rows).filter(e=>e.values.length);let m=p(f).filter(e=>e.kind===`group`?e.rows.length:e.values.length);return{shape:n.iri,title:s,keyInfo:i(`KeyInfoRole`),description:o.length?o[0].text:null,blocks:m}}function vi(e,t){if(!e||!t)return e;let n=e=>e.iri!==t,r=e=>{let t=e.values.filter(n);return t.length===e.values.length?e:{...e,values:t}},i=[],a=!1;for(let t of e.blocks){if(t.kind===`group`){let e=t.rows.map(r).filter(e=>e.values.length),n=e.length===t.rows.length&&e.every((e,n)=>e===t.rows[n]);n||(a=!0),e.length&&i.push(n?t:{...t,rows:e});continue}let e=r(t);e!==t&&(a=!0),e.values.length&&i.push(e)}return a?{...e,blocks:i}:e}var yi=null,bi=null;function xi(e=void 0){let t=e||ie(),n=t.length+`\0`+t.join(`\0`);if(yi&&bi===n)return yi;let r=new Br;for(let e of t)r.addQuads(new Vr().parse(e));return bi=n,yi=Zr(r),yi}var[Si,Ci]=A(null),[wi,q]=A(`leeg`),[Ti,Ei]=A([]),[Di,Oi]=A([]),[ki,Ai]=A(0),[ji,Mi]=A(null),[Ni,Pi]=A(null),[Fi,Ii]=A(null),[Li,Ri]=A(null),[J,zi]=A(null),[Bi,Y]=A(0),[X,Vi]=A(null),[Hi,Ui]=A(!1),[Wi,Gi]=A(null),[Ki,qi]=A(!1),[Ji,Yi]=A(null),[Xi,Zi]=A(`load.sources`),[Qi,$i]=A(null),Z=0,Q=Promise.resolve(),ea=null,ta=null,na=[],ra,ia=[],aa=[],oa=e=>ia.length?[...ia,...e]:e,sa=e=>aa.length?[...aa,...e]:e;function ca(e){Vi(e),na=jr(e,ra)}function la(e){let t=[...e.src.map(e=>({name:e,url:e,detecteer:!0})),...(e.ttl||[]).map(e=>({name:e,url:e}))],n=new Set,r=t.filter(e=>!n.has(e.url)&&!!n.add(e.url));if(!r.length)return[];let i=new Set(r.map(e=>Rr(e.url)).filter(Boolean));return[...r,...Ir().filter(e=>!i.has(e)).map(e=>({name:e,url:Pr+e,stil:!0}))]}async function ua(e){let t=[],n=[],r=[],i=await Promise.all(e.map(async({name:e,url:t,detecteer:n,stil:r})=>{if(n){let n=await Gn(t);return n.kind===`sparql`?{endpoint:n.url}:n.kind===`data`?{bron:{name:e,url:t,content:n.content,format:n.format}}:r?{}:{fout:{url:t,message:n.message}}}try{let n=await fetch(t);if(!n.ok)throw Error(`HTTP ${n.status}`);let r=await n.text();return{bron:{name:e,url:t,content:r,format:Wn(t,r)}}}catch(e){return r?{}:{fout:{url:t,message:e instanceof Error?e.message:String(e)}}}}));for(let e of i)e.bron?t.push(e.bron):e.endpoint?r.push(e.endpoint):e.fout&&n.push(e.fout);return{bronnen:t,fouten:n,endpoints:r}}async function da(e,t){try{let n=Xn(),r=()=>{};return Q=new Promise(e=>{r=e}),{bericht:await qn(e,{setScope:t.setScope,lang:t.lang,onStore:e=>{if(!e){r();return}Zn(n,e).then(()=>{zi(()=>n),Y(e=>e+1),r()})}}),motor:`worker`}}catch{let t=Kn(e);return zi(()=>t.store??null),Y(e=>e+1),Q=Promise.resolve(),{bericht:t,motor:`hoofddraad`}}}function fa(e,t){if(!e)return null;if(t.policy)return nr(e,t.policy)?.nav??null;let n=J();return!t.set||!n?null:tr(e,n,t.set)?.nav??null}var pa=()=>({set:ea,policy:ta});async function ma(e={}){let t=Z;if(!Si()||(e.setScope!==void 0&&(ea=e.setScope),e.policyScope!==void 0&&(ta=e.policyScope),await Q,t!==Z))return;let n=J();if(!n)return;let r=Qn(n),i=er(r),a=pa();Ci(r),Pi(()=>i),Ii(()=>fa(i,a))}var[ha,ga]=A([]);function _a(){let e=J();if(!e||!ha().length)return!1;for(let t of ha())dr(e,t.ttl,`ttl`,U({url:t.ep},0));return Y(e=>e+1),!0}async function va(e,t,n,r){let{bericht:i,motor:a}=await da(t,r);if(e!==Z)return!1;Oi(t),Ci(i.model||null),Pi(()=>i.nav??null);let o=i.scopedNav!==void 0&&!r.policyScope?i.scopedNav:fa(i.nav??null,{set:r.setScope,policy:r.policyScope});Ii(()=>o);let s=r.policyScope?`policy`:r.setScope?`set`:null;return Ri(s&&!o?s:null),Ai(i.quadCount||0),Mi(a),Ei([...n,...i.errors||[]]),q(i.model?`klaar`:`fout`),await Q,e===Z&&_a()&&Ha(),!!i.model}function ya(e,t){e===Z&&(Ei(sa([t])),q(`fout`))}async function ba(e,t,n){let r=await ua(t);if(e!==Z)return;r.endpoints.length&&ca(r.endpoints[0]);let i=r.bronnen.filter(e=>!Rr(e.url)),a=X();if(!i.length&&a){Zi(`load.queryEndpointAt`),Ui(!0),await Fa(e,a,n.policyScope,n);return}if(!i.length){Oi([]),Ci(null),Ai(0),Mi(null),Pi(null),Ii(null),Ei(r.fouten),q(`fout`);return}a&&Ui(!0);let o=await co(r.bronnen);ia=o.lijst,aa=o.fout?[o.fout,...r.fouten]:r.fouten,await va(e,ia,aa,n),e===Z&&a&&await Fa(e,a,n.policyScope,n)}async function xa(e,t,n){try{let r=await fetch(t);if(!r.ok)throw Error(`HTTP ${r.status}`);let i=await r.text();if(e!==Z)return;let a=await co([{name:t,url:t,content:i,format:Wn(t,i)}]);await va(e,a.lijst,a.fout?[a.fout]:[],n)}catch(n){ya(e,{url:t,message:Un(`err.scopeFetch`,{iri:t,msg:n instanceof Error?n.message:String(n)})})}}async function Sa(e){try{return await gr(e,vr())}catch(t){if(!kr(t))throw t;try{let t=await Ar(e);return qi(!0),t}catch{throw t}}}async function Ca(e,t,n){let r=!1;try{let i=await gr(t,yr());if(e!==Z)return;i.length&&(Gi(`eerste`),r=await va(e,oa([{name:`${t} (eerste beeld, ${i.length} rijen)`,url:t,content:Dr(i),format:`ttl`,fromSparql:!0}]),sa([]),n),r&&q(`laden`))}catch{Gi(null)}if(e===Z)try{let[r,i]=await Promise.all([Sa(t),gr(t,br()).catch(()=>[])]);if(e!==Z)return;Gi(null);let a=Dr(r)+Or(i);if(await va(e,oa([{name:`${t} (policylijst, ${r.length} rijen`+(i.length?` + ${i.length} versierijen`:``)+`)`,url:t,content:a,format:`ttl`,fromSparql:!0}]),sa([]),n),e!==Z)return;await Za(e)}catch(n){if(e!==Z)return;Gi(null);let i=n instanceof Error?n.message:String(n);Yi(r?`volledigeIndex`:`endpoint`),Ei(sa([{url:t,message:i}])),q(`fout`)}}var wa=`urn:odrlvis:vormshapes`,Ta=`urn:odrlvis:knooplabels`,Ea=Zr,Da=xi,Oa=si,ka=li,Aa=Jn;function ja(e){return _r(e,Sr({excludeGraphs:na})).catch(()=>``)}async function Ma(e,t,n){let r=await n;if(e!==Z||!r||!r.trim()||(await Q,e!==Z))return;let i=J();if(!i)return;ga(e=>[...e,{iri:wa,ttl:r,ep:t}]),dr(i,r,`ttl`,U({url:t},0)),Y(e=>e+1);let a=Oa(i,[...Ea(i),...Da()]);await Promise.all([Pa(e,t,i,a),Na(e,t,i,a)])}async function Na(e,t,n,r){try{let i=wr([...ka(n,r).iris].filter(e=>!Aa(n,e)),{excludeGraphs:na});if(!i)return;let a=await _r(t,i);if(e!==Z||!a||!a.trim()||(await Q,e!==Z))return;ga(e=>[...e,{iri:Ta,ttl:a,ep:t}]);let o=J();if(!o)return;dr(o,a,`ttl`,U({url:t},0)),Y(e=>e+1),Ha()}catch{}}async function Pa(e,t,n,r){try{let i=ka(n,r,{skipGraphs:[String(U({url:t},0))]}),a=Tr(r,{excludeGraphs:na,excludeNodes:i.iris});if(!a)return;let o=await gr(t,a);if(e!==Z)return;let s=parseInt(o[0]&&o[0].n&&o[0].n.value||``,10);if(!Number.isFinite(s))return;let c=s+i.iris.size+i.blanks;c>0&&$i(c)}catch{}}async function Fa(e,t,n,r){let i=ja(t);try{if(n){let i=await _r(t,xr(n,{excludeGraphs:na}));if(e!==Z)return;await va(e,oa([{name:`${t} (policy-detail)`,url:t,content:i,format:`ttl`,fromSparql:!0}]),sa([]),r);return}await Ca(e,t,r)}catch(n){Yi(`endpoint`),ya(e,{url:t,message:n instanceof Error?n.message:String(n)})}finally{await Ma(e,t,i)}}function Ia(e){let t=++Z,n=la({src:e.src||[],ttl:e.ttl||[],sparql:e.sparql??null,scope:e.policyScope??e.setScope??null}),r=e.setScope??null,i=e.policyScope??null,a=e.sparql||null,o={setScope:r,policyScope:i,lang:e.lang??oe()};if(ea=r,ta=i,ra=e.excludeGraphs,zi(null),Q=Promise.resolve(),Ei([]),ia=[],aa=[],ca(a),Ui(!1),Gi(null),Yi(null),qi(!1),ga([]),Qa.clear(),La.clear(),Ra.clear(),eo.clear(),$i(null),!n.length&&!a&&!(i||r)){Ci(null),Oi([]),Ai(0),Mi(null),Pi(null),Ii(null),q(`leeg`);return}if(q(`laden`),n.length){Zi(`load.sources`),ba(t,n,o);return}if(a){Zi(`load.queryEndpointAt`),Ui(!0),Fa(t,a,i,o);return}Zi(`load.source`),xa(t,i||r,o)}var La=new Set,Ra=new Map;function za(e){return!X()||!e||!e.iri||e.anon||e.stub||La.has(e.iri)?!1:!(e.permissions&&e.permissions.length||e.prohibitions&&e.prohibitions.length||e.obligations&&e.obligations.length)}async function Ba(e,t={}){let n=X();if(!e||!n||La.has(e))return!1;let r=Ra.get(e);if(r)return r;let i=Z,a=(async()=>{let r=await _r(n,xr(e,{excludeGraphs:na}));if(await Q,i!==Z)return!1;let a=J();if(!a)throw Error(Un(`load.graph`));return ga(t=>[...t,{iri:e,ttl:r,ep:n}]),dr(a,r,`ttl`,U({url:n},0)),La.add(e),Y(e=>e+1),t.herbouwModel!==!1&&Ha(),!0})();Ra.set(e,a);try{return await a}finally{Ra.delete(e)}}async function Va(e){let t=[...new Set(e.filter(Boolean))];if(!t.length||!X())return!1;let n=Z,r=await Promise.all(t.map(e=>Ba(e,{herbouwModel:!1})));return n===Z&&(r.some(Boolean)&&Ha(),r.some(Boolean))}function Ha(){let e=J();if(!e)return;let t=Qn(e),n=er(t);Ci(t),Pi(()=>n),Ii(()=>fa(n,pa()))}function Ua(e){let t=new Set;for(let n of[e.offers,e.agreements,e.sets])for(let e of n||[])e.iri&&!e.anon&&t.add(e.iri);return t}var Wa=(e,t)=>e.size===t.size&&[...e].every(e=>t.has(e));function Ga(e,t){if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t))return e.length===t.length&&e.every((e,n)=>Ga(e,t[n]));if(!e||!t||typeof e!=`object`||typeof t!=`object`)return!1;let n=e,r=t,i=Object.keys(n);return i.length===Object.keys(r).length&&i.every(e=>Ga(n[e],r[e]))}function Ka(e,t){if(!e||!e.length)return t;let n=new Map;for(let t of e)t&&t.id&&n.set(t.id,t);return t.map(e=>{let t=e&&e.id?n.get(e.id):void 0;if(!t)return e;let r=Ka(t.children||null,e.children||[]),i=r===e.children?e:{...e,children:r};return Ga(t,i)?t:i})}function qa(e,t){let n=er(e),r=Array.isArray(t)&&Array.isArray(n)?Ka(t,n):n;Ci(e),Pi(()=>r),Ii(()=>fa(r,pa()))}function Ja(e,t){t&&console.warn(`corpus: volledige herbouw na een mutatie — ${e}`);let n=J();return n&&(qa(Qn(n),Ni()),Y(e=>e+1)),{modus:`volledig`,policies:[],reden:e}}function Ya(e){let t=J(),n=Si();if(!t||!n)return{modus:`volledig`,policies:[],reden:`geen graaf of model`};if(![...e.added||[],...e.removed||[]].length)return Ja(`lege delta`,!1);let r=Ua(n),i=$n(t,e,r),a=i.policies;if(!a)return Ja(i.reden===`budget`?`de toewijzing zakte door haar knopenbudget`:`mutatie buiten de bekende kaarten`,!0);let o=Qn(t,{hergebruik:n,alleen:new Set(a)});return Wa(r,Ua(o))?(qa(o,Ni()),Y(e=>e+1),{modus:`gericht`,policies:a,reden:``}):Ja(`de verzameling policies veranderde`,!0)}var Xa=20;async function Za(e){let t=Si();if(!X()||!t)return;let n=(t.offers||[]).filter(e=>za(e)).slice(0,Xa),r=(t.agreements||[]).filter(e=>za(e)),i=n.length+r.length<=Xa?[...n,...r]:n;i.length&&(await Promise.all(i.map(e=>Ba(e.iri,{herbouwModel:!1}).catch(()=>!1))),(e===void 0||e===Z)&&Ha())}var Qa=new Set;async function $a(e){let t=X();if(!e||!t||Qa.has(e))return!1;Qa.add(e);try{let n=await _r(t,Er(e,{excludeGraphs:na}));await Q;let r=J();if(!r)throw Error(Un(`load.graph`));return!n||!n.trim()?!1:(ga(r=>[...r,{iri:e,ttl:n,ep:t}]),dr(r,n,`ttl`,U({url:t},0)),Y(e=>e+1),!0)}catch{return Qa.delete(e),!1}}var eo=new Set;async function to(e){let t=X();if(!e||!t||eo.has(e))return!1;eo.add(e);try{let n=await _r(t,Cr(e,{excludeGraphs:na}));await Q;let r=J();if(!r)throw Error(Un(`load.graph`));return!n||!n.trim()?!1:(ga(r=>[...r,{iri:e,ttl:n,ep:t}]),dr(r,n,`ttl`,U({url:t},0)),Y(e=>e+1),!0)}catch{return eo.delete(e),!1}}var no=ha;function ro(e){Oi(e)}async function io(e){let t=++Z,n={setScope:ea,policyScope:ta,lang:oe()};if(q(`laden`),Ei([]),ia=e.filter(e=>!e.fromSparql),aa=[],!e.length&&X()){Oi([]),ia=[],Zi(`load.queryEndpointAt`),Ui(!0),await Fa(t,X(),ta,n);return}if(!e.length){Oi([]),Ci(null),Ai(0),Mi(null),Pi(null),Ii(null),q(`leeg`);return}Zi(`load.sources`),await va(t,e,[],n)}var ao=null;function oo(e){ao=e}var so=8e3;async function co(e){if(!ao)return{lijst:e,fout:null};let t=null,n=Symbol(`voorbewerking te traag`);try{let r=new Promise(e=>{t=setTimeout(()=>e(n),so)}),i=await Promise.race([ao(e),r]);return i===n?{lijst:e,fout:{message:Un(`err.bronnenlaagTraag`)}}:{lijst:i,fout:null}}catch{return{lijst:e,fout:null}}finally{t!==null&&clearTimeout(t)}}var lo=Symbol(`store-raw`),uo=Symbol(`store-node`),$=Symbol(`store-has`),fo=Symbol(`store-self`);function po(e){let t=e[C];if(!t&&(Object.defineProperty(e,C,{value:t=new Proxy(e,xo)}),!Array.isArray(e))){let n=Object.keys(e),r=Object.getOwnPropertyDescriptors(e),i=Object.getPrototypeOf(e),a=i!==null&&typeof e==`object`&&!!e&&!Array.isArray(e)&&i!==Object.prototype;if(a){let e=Object.getOwnPropertyDescriptors(i);n.push(...Object.keys(e)),Object.assign(r,e)}for(let i=0,o=n.length;i<o;i++){let o=n[i];a&&o===`constructor`||r[o].get&&Object.defineProperty(e,o,{configurable:!0,enumerable:r[o].enumerable,get:r[o].get.bind(t)})}}return t}function mo(e){let t;return typeof e==`object`&&!!e&&(e[C]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function ho(e,t=new Set){let n,r,i,a;if(n=e!=null&&e[lo])return n;if(!mo(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let n=0,a=e.length;n<a;n++)i=e[n],(r=ho(i,t))!==i&&(e[n]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);let n=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let s=0,c=n.length;s<c;s++)a=n[s],!o[a].get&&(i=e[a],(r=ho(i,t))!==i&&(e[a]=r))}return e}function go(e,t){let n=e[t];return n||Object.defineProperty(e,t,{value:n=Object.create(null)}),n}function _o(e,t,n){if(e[t])return e[t];let[r,i]=A(n,{equals:!1,internal:!0});return r.$=i,e[t]=r}function vo(e,t){let n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===C||t===uo?n:(delete n.value,delete n.writable,n.get=()=>e[C][t],n)}function yo(e){Ve()&&_o(go(e,uo),fo)()}function bo(e){return yo(e),Reflect.ownKeys(e)}var xo={get(e,t,n){if(t===lo)return e;if(t===C)return n;if(t===Ce)return yo(e),n;let r=go(e,uo),i=r[t],a=i?i():e[t];if(t===uo||t===$||t===`__proto__`)return a;if(!i){let n=Object.getOwnPropertyDescriptor(e,t);Ve()&&(typeof a!=`function`||Object.prototype.hasOwnProperty.call(e,t))&&!(n&&n.get)&&(a=_o(r,t,a)())}return mo(a)?po(a):a},has(e,t){return t===lo||t===C||t===Ce||t===uo||t===$||t===`__proto__`||(Ve()&&_o(go(e,$),t)(),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:bo,getOwnPropertyDescriptor:vo};function So(e,t,n,r=!1){if(t===`__proto__`||!r&&e[t]===n)return;let i=e[t],a=e.length;n===void 0?(delete e[t],e[$]&&e[$][t]&&i!==void 0&&e[$][t].$()):(e[t]=n,e[$]&&e[$][t]&&i===void 0&&e[$][t].$());let o=go(e,uo),s;if((s=_o(o,t,i))&&s.$(()=>n),Array.isArray(e)&&e.length!==a){for(let t=e.length;t<a;t++)(s=o[t])&&s.$();(s=_o(o,`length`,a))&&s.$(e.length)}(s=o[fo])&&s.$()}function Co(e,t){let n=Object.keys(t);for(let r=0;r<n.length;r+=1){let i=n[r];wo(i)||So(e,i,t[i])}}function wo(e){return e===`__proto__`||e===`constructor`||e===`prototype`}function To(e,t){if(typeof t==`function`&&(t=t(e)),t=ho(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){let r=t[n];e[n]!==r&&So(e,n,r)}So(e,`length`,r)}else Co(e,t)}function Eo(e,t,n=[]){let r,i=e;if(t.length>1){r=t.shift();let a=typeof r,o=Array.isArray(e);if(a===`string`&&(r===`__proto__`||t.length>1&&wo(r)))return;if(Array.isArray(r)){for(let i=0;i<r.length;i++)Eo(e,[r[i]].concat(t),n);return}if(o&&a===`function`){for(let i=0;i<e.length;i++)r(e[i],i)&&Eo(e,[i].concat(t),n);return}if(o&&a===`object`){let{from:i=0,to:a=e.length-1,by:o=1}=r;for(let r=i;r<=a;r+=o)Eo(e,[r].concat(t),n);return}if(t.length>1){Eo(e[r],t,[r].concat(n));return}i=e[r],n=[r].concat(n)}let a=t[0];typeof a==`function`&&(a=a(i,n),a===i)||(r!==void 0||a!=null)&&(a=ho(a),r===void 0||mo(i)&&mo(a)&&!Array.isArray(a)?Co(i,a):So(e,r,a))}function Do(...[e,t]){let n=ho(e||{}),r=Array.isArray(n),i=po(n);function a(...e){Le(()=>{r&&e.length===1?To(n,e[0]):Eo(n,e)})}return[i,a]}var Oo=[`active`,`terminated`,`future`];function ko(){return{stand:`doc`,src:[],ttl:[],sparql:null,policyScope:null,setScope:null,groupBy:null,lang:`nl`,langExpliciet:!1,editMode:!1,excludeGraphs:[],filters:{status:null,aanbod:``}}}var[Ao,jo]=Do(ko());function Mo(e,t){return Ao.lang,Un(e,t)}function No(e){if(!e)return null;let t=e.split(`,`).map(e=>e.trim()).filter(e=>Oo.includes(e));return t.length?t:null}function Po(e){let t=new URLSearchParams(e),n=fe(t.get(`lang`));ue(n),jo({...ko(),stand:`doc`,src:t.getAll(`src`),ttl:t.getAll(`ttl`),sparql:t.get(`sparql`)||null,policyScope:t.get(`policy`)||null,setScope:t.get(`set`)||null,groupBy:t.has(`groupby`)?String(t.get(`groupby`)||``).split(`,`).map(e=>e.trim()).filter(Boolean):null,lang:n,langExpliciet:t.has(`lang`),editMode:t.get(`edit`)===`1`,excludeGraphs:t.getAll(`exclude-graph`),filters:{status:No(t.get(`status`)),aanbod:t.get(`aanbod`)||``}})}var Fo=[`src`,`ttl`,`sparql`,`policy`,`set`,`groupby`,`edit`,`exclude-graph`,`status`,`aanbod`,`lang`];function Io(e,t){let n=new URLSearchParams(t);for(let e of Fo)n.delete(e);for(let t of e.src)n.append(`src`,t);for(let t of e.ttl)n.append(`ttl`,t);e.sparql&&n.set(`sparql`,e.sparql),e.policyScope&&n.set(`policy`,e.policyScope),e.setScope&&n.set(`set`,e.setScope),e.groupBy&&n.set(`groupby`,e.groupBy.join(`,`)),e.editMode&&n.set(`edit`,`1`);for(let t of e.excludeGraphs)n.append(`exclude-graph`,t);return e.filters.status&&n.set(`status`,Oo.filter(t=>e.filters.status.includes(t)).join(`,`)),e.filters.aanbod&&n.set(`aanbod`,e.filters.aanbod),e.langExpliciet&&n.set(`lang`,e.lang),n}function Lo(e){if(typeof history>`u`||!history.replaceState)return;let t=Io(e,new URLSearchParams(location.search)).toString();history.replaceState(null,``,t?`?`+t:location.pathname)}function Ro(e){let t={...e};if(`lang`in t&&t.lang){let e=fe(t.lang);ue(e),t.lang=e,t.langExpliciet=!0}t.policyScope?t.setScope=null:t.setScope&&(t.policyScope=null),t.filters&&t.filters.status&&t.filters.status.length===Oo.length&&(t.filters={...t.filters,status:null}),jo(t),Lo(Ao)}var zo=oe,[Bo,Vo]=A(null),Ho=()=>Bo()?.sleutel??null,Uo=()=>Bo()?.vars;function Wo(e,t){Vo(e?{sleutel:e,vars:t}:null)}var Go=new Set;function Ko(e){return Go.add(e),()=>{Go.delete(e)}}function qo(e){if(!e)return!1;for(let t of[...Go])try{if(t(e))return!0}catch{}return!1}var Jo=()=>new Promise(e=>{setTimeout(e,0)});function Yo(e){if(typeof document>`u`)return null;let t=e.replace(/["\\]/g,`\\$&`);return document.querySelector(`[data-ref="${t}"]`)||document.querySelector(`[data-iri="${t}"]`)}async function Xo(e,t){if(typeof e.scrollIntoView==`function`){e.scrollIntoView({behavior:t?`smooth`:`auto`,block:`start`});for(let t=0;t<12;t+=1){await new Promise(e=>{setTimeout(e,40)});let t=e.getBoundingClientRect().top,n=typeof window<`u`?window.innerHeight:0;if(t>=-4&&t<Math.max(n,1))return}e.scrollIntoView({behavior:`auto`,block:`start`})}}async function Zo(e,t={}){if(!e)return!1;for(let t of[...Go])try{if(t(e))break}catch{}await Jo();let n=Yo(e);if(!n)return!1;for(let e=n;e;e=e.parentElement)e instanceof HTMLDetailsElement&&(e.open=!0);return await Xo(n,!!t.smooth),n.classList&&(n.classList.remove(`ui-flash`),n.offsetWidth,n.classList.add(`ui-flash`),setTimeout(()=>n.classList.remove(`ui-flash`),1800)),!0}export{ri as $,Ia as A,qe as At,Li as B,Be as Bt,$a as C,Dt as Ct,ma as D,kt as Dt,to as E,Mt as Et,Si as F,je as Ft,si as G,Je as Gt,ro as H,x as Ht,ji as I,A as It,ci as J,vi as K,Ni as L,Tt as Lt,wi as M,j as Mt,Wi as N,Ne as Nt,io as O,Le as Ot,Ji as P,Ie as Pt,ii as Q,ki as R,Ct as Rt,Bi as S,Zt as St,Va as T,Ot as Tt,xi as U,wt as Ut,Fi as V,ze as Vt,ui as W,M as Wt,Zr as X,ai as Y,ni as Z,X as _,Nr as _t,Uo as a,hr as at,Qi as b,Un as bt,Zo as c,ur as ct,Wo as d,ir as dt,oi as et,Ro as f,rr as ft,za as g,lr as gt,Ki as h,fr as ht,Ho as i,sr as it,Xi as j,Pe as jt,Ya as k,vt as kt,Mo as l,U as lt,Di as m,mr as mt,zo as n,Rr as nt,qo as o,cr as ot,no as p,or as pt,_i as q,Po as r,Lr as rt,Ko as s,ar as st,Oo as t,Pr as tt,Ao as u,pr as ut,Hi as v,Mr as vt,Ba as w,At as wt,J as x,Qt as xt,Ti as y,Yn as yt,oo as z,Re as zt};
//# sourceMappingURL=weergave-OurPwqLk.js.map