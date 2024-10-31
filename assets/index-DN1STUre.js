const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ProjectView-CX85VlTA.js","assets/ProjectView-CwBWAFR-.css","assets/MusicAlbumView-t5YCNQ3Q.js","assets/MusicAlbumView-rz_HNcK6.css"])))=>i.map(i=>d[i]);
var Gr=Object.defineProperty;var $r=(e,t,i)=>t in e?Gr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var te=(e,t,i)=>$r(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function an(e,t){const i=new Set(e.split(","));return n=>i.has(n)}const X={},vt=[],Ae=()=>{},Qr=()=>!1,_i=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),ln=e=>e.startsWith("onUpdate:"),ue=Object.assign,cn=(e,t)=>{const i=e.indexOf(t);i>-1&&e.splice(i,1)},Jr=Object.prototype.hasOwnProperty,D=(e,t)=>Jr.call(e,t),F=Array.isArray,It=e=>bi(e)==="[object Map]",Oo=e=>bi(e)==="[object Set]",W=e=>typeof e=="function",re=e=>typeof e=="string",Ot=e=>typeof e=="symbol",Z=e=>e!==null&&typeof e=="object",jo=e=>(Z(e)||W(e))&&W(e.then)&&W(e.catch),Mo=Object.prototype.toString,bi=e=>Mo.call(e),Xr=e=>bi(e).slice(8,-1),Bo=e=>bi(e)==="[object Object]",un=e=>re(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,oi=an(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),wi=e=>{const t=Object.create(null);return i=>t[i]||(t[i]=e(i))},Yr=/-(\w)/g,Le=wi(e=>e.replace(Yr,(t,i)=>i?i.toUpperCase():"")),Zr=/\B([A-Z])/g,jt=wi(e=>e.replace(Zr,"-$1").toLowerCase()),ki=wi(e=>e.charAt(0).toUpperCase()+e.slice(1)),ji=wi(e=>e?`on${ki(e)}`:""),et=(e,t)=>!Object.is(e,t),Mi=(e,t)=>{for(let i=0;i<e.length;i++)e[i](t)},ui=(e,t,i)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:i})},es=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let On;const Fo=()=>On||(On=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function fn(e){if(F(e)){const t={};for(let i=0;i<e.length;i++){const n=e[i],o=re(n)?os(n):fn(n);if(o)for(const r in o)t[r]=o[r]}return t}else if(re(e)||Z(e))return e}const ts=/;(?![^(]*\))/g,is=/:([^]+)/,ns=/\/\*[^]*?\*\//g;function os(e){const t={};return e.replace(ns,"").split(ts).forEach(i=>{if(i){const n=i.split(is);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function dn(e){let t="";if(re(e))t=e;else if(F(e))for(let i=0;i<e.length;i++){const n=dn(e[i]);n&&(t+=n+" ")}else if(Z(e))for(const i in e)e[i]&&(t+=i+" ");return t.trim()}const rs="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",ss=an(rs);function Ho(e){return!!e||e===""}const jn=e=>re(e)?e:e==null?"":F(e)||Z(e)&&(e.toString===Mo||!W(e.toString))?JSON.stringify(e,Wo,2):String(e),Wo=(e,t)=>t&&t.__v_isRef?Wo(e,t.value):It(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((i,[n,o],r)=>(i[Bi(n,r)+" =>"]=o,i),{})}:Oo(t)?{[`Set(${t.size})`]:[...t.values()].map(i=>Bi(i))}:Ot(t)?Bi(t):Z(t)&&!F(t)&&!Bo(t)?String(t):t,Bi=(e,t="")=>{var i;return Ot(e)?`Symbol(${(i=e.description)!=null?i:t})`:e};/**
* @vue/reactivity v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ee;class as{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Ee,!t&&Ee&&(this.index=(Ee.scopes||(Ee.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const i=Ee;try{return Ee=this,t()}finally{Ee=i}}}on(){Ee=this}off(){Ee=this.parent}stop(t){if(this._active){let i,n;for(i=0,n=this.effects.length;i<n;i++)this.effects[i].stop();for(i=0,n=this.cleanups.length;i<n;i++)this.cleanups[i]();if(this.scopes)for(i=0,n=this.scopes.length;i<n;i++)this.scopes[i].stop(!0);if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0,this._active=!1}}}function ls(e,t=Ee){t&&t.active&&t.effects.push(e)}function cs(){return Ee}let lt;class hn{constructor(t,i,n,o){this.fn=t,this.trigger=i,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=2,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,ls(this,o)}get dirty(){if(this._dirtyLevel===1){ht();for(let t=0;t<this._depsLength;t++){const i=this.deps[t];if(i.computed&&(us(i.computed),this._dirtyLevel>=2))break}this._dirtyLevel<2&&(this._dirtyLevel=0),pt()}return this._dirtyLevel>=2}set dirty(t){this._dirtyLevel=t?2:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=Ye,i=lt;try{return Ye=!0,lt=this,this._runnings++,Mn(this),this.fn()}finally{Bn(this),this._runnings--,lt=i,Ye=t}}stop(){var t;this.active&&(Mn(this),Bn(this),(t=this.onStop)==null||t.call(this),this.active=!1)}}function us(e){return e.value}function Mn(e){e._trackId++,e._depsLength=0}function Bn(e){if(e.deps&&e.deps.length>e._depsLength){for(let t=e._depsLength;t<e.deps.length;t++)Lo(e.deps[t],e);e.deps.length=e._depsLength}}function Lo(e,t){const i=e.get(t);i!==void 0&&t._trackId!==i&&(e.delete(t),e.size===0&&e.cleanup())}let Ye=!0,qi=0;const No=[];function ht(){No.push(Ye),Ye=!1}function pt(){const e=No.pop();Ye=e===void 0?!0:e}function pn(){qi++}function mn(){for(qi--;!qi&&Ki.length;)Ki.shift()()}function Vo(e,t,i){if(t.get(e)!==e._trackId){t.set(e,e._trackId);const n=e.deps[e._depsLength];n!==t?(n&&Lo(n,e),e.deps[e._depsLength++]=t):e._depsLength++}}const Ki=[];function Do(e,t,i){pn();for(const n of e.keys())if(n._dirtyLevel<t&&e.get(n)===n._trackId){const o=n._dirtyLevel;n._dirtyLevel=t,o===0&&(n._shouldSchedule=!0,n.trigger())}Uo(e),mn()}function Uo(e){for(const t of e.keys())t.scheduler&&t._shouldSchedule&&(!t._runnings||t.allowRecurse)&&e.get(t)===t._trackId&&(t._shouldSchedule=!1,Ki.push(t.scheduler))}const zo=(e,t)=>{const i=new Map;return i.cleanup=e,i.computed=t,i},Gi=new WeakMap,ct=Symbol(""),$i=Symbol("");function we(e,t,i){if(Ye&&lt){let n=Gi.get(e);n||Gi.set(e,n=new Map);let o=n.get(i);o||n.set(i,o=zo(()=>n.delete(i))),Vo(lt,o)}}function De(e,t,i,n,o,r){const s=Gi.get(e);if(!s)return;let a=[];if(t==="clear")a=[...s.values()];else if(i==="length"&&F(e)){const l=Number(n);s.forEach((d,f)=>{(f==="length"||!Ot(f)&&f>=l)&&a.push(d)})}else switch(i!==void 0&&a.push(s.get(i)),t){case"add":F(e)?un(i)&&a.push(s.get("length")):(a.push(s.get(ct)),It(e)&&a.push(s.get($i)));break;case"delete":F(e)||(a.push(s.get(ct)),It(e)&&a.push(s.get($i)));break;case"set":It(e)&&a.push(s.get(ct));break}pn();for(const l of a)l&&Do(l,2);mn()}const fs=an("__proto__,__v_isRef,__isVue"),qo=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Ot)),Fn=ds();function ds(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...i){const n=z(this);for(let r=0,s=this.length;r<s;r++)we(n,"get",r+"");const o=n[t](...i);return o===-1||o===!1?n[t](...i.map(z)):o}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...i){ht(),pn();const n=z(this)[t].apply(this,i);return mn(),pt(),n}}),e}function hs(e){const t=z(this);return we(t,"has",e),t.hasOwnProperty(e)}class Ko{constructor(t=!1,i=!1){this._isReadonly=t,this._shallow=i}get(t,i,n){const o=this._isReadonly,r=this._shallow;if(i==="__v_isReactive")return!o;if(i==="__v_isReadonly")return o;if(i==="__v_isShallow")return r;if(i==="__v_raw")return n===(o?r?Es:Jo:r?Qo:$o).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const s=F(t);if(!o){if(s&&D(Fn,i))return Reflect.get(Fn,i,n);if(i==="hasOwnProperty")return hs}const a=Reflect.get(t,i,n);return(Ot(i)?qo.has(i):fs(i))||(o||we(t,"get",i),r)?a:ke(a)?s&&un(i)?a:a.value:Z(a)?o?Yo(a):Ii(a):a}}class Go extends Ko{constructor(t=!1){super(!1,t)}set(t,i,n,o){let r=t[i];if(!this._shallow){const l=Et(r);if(!fi(n)&&!Et(n)&&(r=z(r),n=z(n)),!F(t)&&ke(r)&&!ke(n))return l?!1:(r.value=n,!0)}const s=F(t)&&un(i)?Number(i)<t.length:D(t,i),a=Reflect.set(t,i,n,o);return t===z(o)&&(s?et(n,r)&&De(t,"set",i,n):De(t,"add",i,n)),a}deleteProperty(t,i){const n=D(t,i);t[i];const o=Reflect.deleteProperty(t,i);return o&&n&&De(t,"delete",i,void 0),o}has(t,i){const n=Reflect.has(t,i);return(!Ot(i)||!qo.has(i))&&we(t,"has",i),n}ownKeys(t){return we(t,"iterate",F(t)?"length":ct),Reflect.ownKeys(t)}}class ps extends Ko{constructor(t=!1){super(!0,t)}set(t,i){return!0}deleteProperty(t,i){return!0}}const ms=new Go,gs=new ps,ys=new Go(!0),gn=e=>e,vi=e=>Reflect.getPrototypeOf(e);function Yt(e,t,i=!1,n=!1){e=e.__v_raw;const o=z(e),r=z(t);i||(et(t,r)&&we(o,"get",t),we(o,"get",r));const{has:s}=vi(o),a=n?gn:i?bn:qt;if(s.call(o,t))return a(e.get(t));if(s.call(o,r))return a(e.get(r));e!==o&&e.get(t)}function Zt(e,t=!1){const i=this.__v_raw,n=z(i),o=z(e);return t||(et(e,o)&&we(n,"has",e),we(n,"has",o)),e===o?i.has(e):i.has(e)||i.has(o)}function ei(e,t=!1){return e=e.__v_raw,!t&&we(z(e),"iterate",ct),Reflect.get(e,"size",e)}function Hn(e){e=z(e);const t=z(this);return vi(t).has.call(t,e)||(t.add(e),De(t,"add",e,e)),this}function Wn(e,t){t=z(t);const i=z(this),{has:n,get:o}=vi(i);let r=n.call(i,e);r||(e=z(e),r=n.call(i,e));const s=o.call(i,e);return i.set(e,t),r?et(t,s)&&De(i,"set",e,t):De(i,"add",e,t),this}function Ln(e){const t=z(this),{has:i,get:n}=vi(t);let o=i.call(t,e);o||(e=z(e),o=i.call(t,e)),n&&n.call(t,e);const r=t.delete(e);return o&&De(t,"delete",e,void 0),r}function Nn(){const e=z(this),t=e.size!==0,i=e.clear();return t&&De(e,"clear",void 0,void 0),i}function ti(e,t){return function(n,o){const r=this,s=r.__v_raw,a=z(s),l=t?gn:e?bn:qt;return!e&&we(a,"iterate",ct),s.forEach((d,f)=>n.call(o,l(d),l(f),r))}}function ii(e,t,i){return function(...n){const o=this.__v_raw,r=z(o),s=It(r),a=e==="entries"||e===Symbol.iterator&&s,l=e==="keys"&&s,d=o[e](...n),f=i?gn:t?bn:qt;return!t&&we(r,"iterate",l?$i:ct),{next(){const{value:h,done:m}=d.next();return m?{value:h,done:m}:{value:a?[f(h[0]),f(h[1])]:f(h),done:m}},[Symbol.iterator](){return this}}}}function Ke(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function _s(){const e={get(r){return Yt(this,r)},get size(){return ei(this)},has:Zt,add:Hn,set:Wn,delete:Ln,clear:Nn,forEach:ti(!1,!1)},t={get(r){return Yt(this,r,!1,!0)},get size(){return ei(this)},has:Zt,add:Hn,set:Wn,delete:Ln,clear:Nn,forEach:ti(!1,!0)},i={get(r){return Yt(this,r,!0)},get size(){return ei(this,!0)},has(r){return Zt.call(this,r,!0)},add:Ke("add"),set:Ke("set"),delete:Ke("delete"),clear:Ke("clear"),forEach:ti(!0,!1)},n={get(r){return Yt(this,r,!0,!0)},get size(){return ei(this,!0)},has(r){return Zt.call(this,r,!0)},add:Ke("add"),set:Ke("set"),delete:Ke("delete"),clear:Ke("clear"),forEach:ti(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{e[r]=ii(r,!1,!1),i[r]=ii(r,!0,!1),t[r]=ii(r,!1,!0),n[r]=ii(r,!0,!0)}),[e,i,t,n]}const[bs,ws,ks,vs]=_s();function yn(e,t){const i=t?e?vs:ks:e?ws:bs;return(n,o,r)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?n:Reflect.get(D(i,o)&&o in n?i:n,o,r)}const Is={get:yn(!1,!1)},As={get:yn(!1,!0)},Ss={get:yn(!0,!1)},$o=new WeakMap,Qo=new WeakMap,Jo=new WeakMap,Es=new WeakMap;function Ts(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function xs(e){return e.__v_skip||!Object.isExtensible(e)?0:Ts(Xr(e))}function Ii(e){return Et(e)?e:_n(e,!1,ms,Is,$o)}function Xo(e){return _n(e,!1,ys,As,Qo)}function Yo(e){return _n(e,!0,gs,Ss,Jo)}function _n(e,t,i,n,o){if(!Z(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const r=o.get(e);if(r)return r;const s=xs(e);if(s===0)return e;const a=new Proxy(e,s===2?n:i);return o.set(e,a),a}function At(e){return Et(e)?At(e.__v_raw):!!(e&&e.__v_isReactive)}function Et(e){return!!(e&&e.__v_isReadonly)}function fi(e){return!!(e&&e.__v_isShallow)}function Zo(e){return At(e)||Et(e)}function z(e){const t=e&&e.__v_raw;return t?z(t):e}function er(e){return ui(e,"__v_skip",!0),e}const qt=e=>Z(e)?Ii(e):e,bn=e=>Z(e)?Yo(e):e;class tr{constructor(t,i,n,o){this._setter=i,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new hn(()=>t(this._value),()=>ri(this,1),()=>this.dep&&Uo(this.dep)),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=n}get value(){const t=z(this);return(!t._cacheable||t.effect.dirty)&&et(t._value,t._value=t.effect.run())&&ri(t,2),ir(t),t.effect._dirtyLevel>=1&&ri(t,1),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function Rs(e,t,i=!1){let n,o;const r=W(e);return r?(n=e,o=Ae):(n=e.get,o=e.set),new tr(n,o,r||!o,i)}function ir(e){Ye&&lt&&(e=z(e),Vo(lt,e.dep||(e.dep=zo(()=>e.dep=void 0,e instanceof tr?e:void 0))))}function ri(e,t=2,i){e=z(e);const n=e.dep;n&&Do(n,t)}function ke(e){return!!(e&&e.__v_isRef===!0)}function Cs(e){return nr(e,!1)}function Ps(e){return nr(e,!0)}function nr(e,t){return ke(e)?e:new Os(e,t)}class Os{constructor(t,i){this.__v_isShallow=i,this.dep=void 0,this.__v_isRef=!0,this._rawValue=i?t:z(t),this._value=i?t:qt(t)}get value(){return ir(this),this._value}set value(t){const i=this.__v_isShallow||fi(t)||Et(t);t=i?t:z(t),et(t,this._rawValue)&&(this._rawValue=t,this._value=i?t:qt(t),ri(this,2))}}function He(e){return ke(e)?e.value:e}const js={get:(e,t,i)=>He(Reflect.get(e,t,i)),set:(e,t,i,n)=>{const o=e[t];return ke(o)&&!ke(i)?(o.value=i,!0):Reflect.set(e,t,i,n)}};function or(e){return At(e)?e:new Proxy(e,js)}/**
* @vue/runtime-core v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ze(e,t,i,n){let o;try{o=n?e(...n):e()}catch(r){Ai(r,t,i)}return o}function xe(e,t,i,n){if(W(e)){const r=Ze(e,t,i,n);return r&&jo(r)&&r.catch(s=>{Ai(s,t,i)}),r}const o=[];for(let r=0;r<e.length;r++)o.push(xe(e[r],t,i,n));return o}function Ai(e,t,i,n=!0){const o=t?t.vnode:null;if(t){let r=t.parent;const s=t.proxy,a=`https://vuejs.org/error-reference/#runtime-${i}`;for(;r;){const d=r.ec;if(d){for(let f=0;f<d.length;f++)if(d[f](e,s,a)===!1)return}r=r.parent}const l=t.appContext.config.errorHandler;if(l){Ze(l,null,10,[e,s,a]);return}}Ms(e,i,o,n)}function Ms(e,t,i,n=!0){console.error(e)}let Kt=!1,Qi=!1;const de=[];let Fe=0;const St=[];let $e=null,st=0;const rr=Promise.resolve();let wn=null;function sr(e){const t=wn||rr;return e?t.then(this?e.bind(this):e):t}function Bs(e){let t=Fe+1,i=de.length;for(;t<i;){const n=t+i>>>1,o=de[n],r=Gt(o);r<e||r===e&&o.pre?t=n+1:i=n}return t}function kn(e){(!de.length||!de.includes(e,Kt&&e.allowRecurse?Fe+1:Fe))&&(e.id==null?de.push(e):de.splice(Bs(e.id),0,e),ar())}function ar(){!Kt&&!Qi&&(Qi=!0,wn=rr.then(cr))}function Fs(e){const t=de.indexOf(e);t>Fe&&de.splice(t,1)}function Hs(e){F(e)?St.push(...e):(!$e||!$e.includes(e,e.allowRecurse?st+1:st))&&St.push(e),ar()}function Vn(e,t,i=Kt?Fe+1:0){for(;i<de.length;i++){const n=de[i];if(n&&n.pre){if(e&&n.id!==e.uid)continue;de.splice(i,1),i--,n()}}}function lr(e){if(St.length){const t=[...new Set(St)].sort((i,n)=>Gt(i)-Gt(n));if(St.length=0,$e){$e.push(...t);return}for($e=t,st=0;st<$e.length;st++)$e[st]();$e=null,st=0}}const Gt=e=>e.id==null?1/0:e.id,Ws=(e,t)=>{const i=Gt(e)-Gt(t);if(i===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return i};function cr(e){Qi=!1,Kt=!0,de.sort(Ws);try{for(Fe=0;Fe<de.length;Fe++){const t=de[Fe];t&&t.active!==!1&&Ze(t,null,14)}}finally{Fe=0,de.length=0,lr(),Kt=!1,wn=null,(de.length||St.length)&&cr()}}function Ls(e,t,...i){if(e.isUnmounted)return;const n=e.vnode.props||X;let o=i;const r=t.startsWith("update:"),s=r&&t.slice(7);if(s&&s in n){const f=`${s==="modelValue"?"model":s}Modifiers`,{number:h,trim:m}=n[f]||X;m&&(o=i.map(b=>re(b)?b.trim():b)),h&&(o=i.map(es))}let a,l=n[a=ji(t)]||n[a=ji(Le(t))];!l&&r&&(l=n[a=ji(jt(t))]),l&&xe(l,e,6,o);const d=n[a+"Once"];if(d){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,xe(d,e,6,o)}}function ur(e,t,i=!1){const n=t.emitsCache,o=n.get(e);if(o!==void 0)return o;const r=e.emits;let s={},a=!1;if(!W(e)){const l=d=>{const f=ur(d,t,!0);f&&(a=!0,ue(s,f))};!i&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!r&&!a?(Z(e)&&n.set(e,null),null):(F(r)?r.forEach(l=>s[l]=null):ue(s,r),Z(e)&&n.set(e,s),s)}function Si(e,t){return!e||!_i(t)?!1:(t=t.slice(2).replace(/Once$/,""),D(e,t[0].toLowerCase()+t.slice(1))||D(e,jt(t))||D(e,t))}let le=null,Ei=null;function di(e){const t=le;return le=e,Ei=e&&e.type.__scopeId||null,t}function Ns(e){Ei=e}function Vs(){Ei=null}function ut(e,t=le,i){if(!t||e._n)return e;const n=(...o)=>{n._d&&eo(-1);const r=di(t);let s;try{s=e(...o)}finally{di(r),n._d&&eo(1)}return s};return n._n=!0,n._c=!0,n._d=!0,n}function Fi(e){const{type:t,vnode:i,proxy:n,withProxy:o,props:r,propsOptions:[s],slots:a,attrs:l,emit:d,render:f,renderCache:h,data:m,setupState:b,ctx:x,inheritAttrs:j}=e;let M,C;const H=di(e);try{if(i.shapeFlag&4){const q=o||n,ie=q;M=Be(f.call(ie,q,h,r,b,m,x)),C=l}else{const q=t;M=Be(q.length>1?q(r,{attrs:l,slots:a,emit:d}):q(r,null)),C=t.props?l:Ds(l)}}catch(q){Dt.length=0,Ai(q,e,1),M=oe(tt)}let L=M;if(C&&j!==!1){const q=Object.keys(C),{shapeFlag:ie}=L;q.length&&ie&7&&(s&&q.some(ln)&&(C=Us(C,s)),L=Tt(L,C))}return i.dirs&&(L=Tt(L),L.dirs=L.dirs?L.dirs.concat(i.dirs):i.dirs),i.transition&&(L.transition=i.transition),M=L,di(H),M}const Ds=e=>{let t;for(const i in e)(i==="class"||i==="style"||_i(i))&&((t||(t={}))[i]=e[i]);return t},Us=(e,t)=>{const i={};for(const n in e)(!ln(n)||!(n.slice(9)in t))&&(i[n]=e[n]);return i};function zs(e,t,i){const{props:n,children:o,component:r}=e,{props:s,children:a,patchFlag:l}=t,d=r.emitsOptions;if(t.dirs||t.transition)return!0;if(i&&l>=0){if(l&1024)return!0;if(l&16)return n?Dn(n,s,d):!!s;if(l&8){const f=t.dynamicProps;for(let h=0;h<f.length;h++){const m=f[h];if(s[m]!==n[m]&&!Si(d,m))return!0}}}else return(o||a)&&(!a||!a.$stable)?!0:n===s?!1:n?s?Dn(n,s,d):!0:!!s;return!1}function Dn(e,t,i){const n=Object.keys(t);if(n.length!==Object.keys(e).length)return!0;for(let o=0;o<n.length;o++){const r=n[o];if(t[r]!==e[r]&&!Si(i,r))return!0}return!1}function qs({vnode:e,parent:t},i){for(;t;){const n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.el=e.el),n===e)(e=t.vnode).el=i,t=t.parent;else break}}const Ks="components";function fr(e,t){return $s(Ks,e,!0,t)||e}const Gs=Symbol.for("v-ndc");function $s(e,t,i=!0,n=!1){const o=le||he;if(o){const r=o.type;{const a=Da(r,!1);if(a&&(a===t||a===Le(t)||a===ki(Le(t))))return r}const s=Un(o[e]||r[e],t)||Un(o.appContext[e],t);return!s&&n?r:s}}function Un(e,t){return e&&(e[t]||e[Le(t)]||e[ki(Le(t))])}const Qs=e=>e.__isSuspense;function Js(e,t){t&&t.pendingBranch?F(e)?t.effects.push(...e):t.effects.push(e):Hs(e)}const Xs=Symbol.for("v-scx"),Ys=()=>We(Xs),ni={};function si(e,t,i){return dr(e,t,i)}function dr(e,t,{immediate:i,deep:n,flush:o,once:r,onTrack:s,onTrigger:a}=X){if(t&&r){const N=t;t=(...pe)=>{N(...pe),ie()}}const l=he,d=N=>n===!0?N:at(N,n===!1?1:void 0);let f,h=!1,m=!1;if(ke(e)?(f=()=>e.value,h=fi(e)):At(e)?(f=()=>d(e),h=!0):F(e)?(m=!0,h=e.some(N=>At(N)||fi(N)),f=()=>e.map(N=>{if(ke(N))return N.value;if(At(N))return d(N);if(W(N))return Ze(N,l,2)})):W(e)?t?f=()=>Ze(e,l,2):f=()=>(b&&b(),xe(e,l,3,[x])):f=Ae,t&&n){const N=f;f=()=>at(N())}let b,x=N=>{b=L.onStop=()=>{Ze(N,l,4),b=L.onStop=void 0}},j;if(Ci)if(x=Ae,t?i&&xe(t,l,3,[f(),m?[]:void 0,x]):f(),o==="sync"){const N=Ys();j=N.__watcherHandles||(N.__watcherHandles=[])}else return Ae;let M=m?new Array(e.length).fill(ni):ni;const C=()=>{if(!(!L.active||!L.dirty))if(t){const N=L.run();(n||h||(m?N.some((pe,Ie)=>et(pe,M[Ie])):et(N,M)))&&(b&&b(),xe(t,l,3,[N,M===ni?void 0:m&&M[0]===ni?[]:M,x]),M=N)}else L.run()};C.allowRecurse=!!t;let H;o==="sync"?H=C:o==="post"?H=()=>_e(C,l&&l.suspense):(C.pre=!0,l&&(C.id=l.uid),H=()=>kn(C));const L=new hn(f,Ae,H),q=cs(),ie=()=>{L.stop(),q&&cn(q.effects,L)};return t?i?C():M=L.run():o==="post"?_e(L.run.bind(L),l&&l.suspense):L.run(),j&&j.push(ie),ie}function Zs(e,t,i){const n=this.proxy,o=re(e)?e.includes(".")?hr(n,e):()=>n[e]:e.bind(n,n);let r;W(t)?r=t:(r=t.handler,i=t);const s=Jt(this),a=dr(o,r.bind(n),i);return s(),a}function hr(e,t){const i=t.split(".");return()=>{let n=e;for(let o=0;o<i.length&&n;o++)n=n[i[o]];return n}}function at(e,t,i=0,n){if(!Z(e)||e.__v_skip)return e;if(t&&t>0){if(i>=t)return e;i++}if(n=n||new Set,n.has(e))return e;if(n.add(e),ke(e))at(e.value,t,i,n);else if(F(e))for(let o=0;o<e.length;o++)at(e[o],t,i,n);else if(Oo(e)||It(e))e.forEach(o=>{at(o,t,i,n)});else if(Bo(e))for(const o in e)at(e[o],t,i,n);return e}function hu(e,t){if(le===null)return e;const i=Pi(le)||le.proxy,n=e.dirs||(e.dirs=[]);for(let o=0;o<t.length;o++){let[r,s,a,l=X]=t[o];r&&(W(r)&&(r={mounted:r,updated:r}),r.deep&&at(s),n.push({dir:r,instance:i,value:s,oldValue:void 0,arg:a,modifiers:l}))}return e}function ot(e,t,i,n){const o=e.dirs,r=t&&t.dirs;for(let s=0;s<o.length;s++){const a=o[s];r&&(a.oldValue=r[s].value);let l=a.dir[n];l&&(ht(),xe(l,i,8,[e.el,a,e,t]),pt())}}/*! #__NO_SIDE_EFFECTS__ */function it(e,t){return W(e)?ue({name:e.name},t,{setup:e}):e}const Nt=e=>!!e.type.__asyncLoader,pr=e=>e.type.__isKeepAlive;function ea(e,t){mr(e,"a",t)}function ta(e,t){mr(e,"da",t)}function mr(e,t,i=he){const n=e.__wdc||(e.__wdc=()=>{let o=i;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(Ti(t,n,i),i){let o=i.parent;for(;o&&o.parent;)pr(o.parent.vnode)&&ia(n,t,i,o),o=o.parent}}function ia(e,t,i,n){const o=Ti(t,e,n,!0);gr(()=>{cn(n[t],o)},i)}function Ti(e,t,i=he,n=!1){if(i){const o=i[e]||(i[e]=[]),r=t.__weh||(t.__weh=(...s)=>{if(i.isUnmounted)return;ht();const a=Jt(i),l=xe(t,i,e,s);return a(),pt(),l});return n?o.unshift(r):o.push(r),r}}const Ue=e=>(t,i=he)=>(!Ci||e==="sp")&&Ti(e,(...n)=>t(...n),i),na=Ue("bm"),oa=Ue("m"),ra=Ue("bu"),sa=Ue("u"),aa=Ue("bum"),gr=Ue("um"),la=Ue("sp"),ca=Ue("rtg"),ua=Ue("rtc");function fa(e,t=he){Ti("ec",e,t)}function zn(e,t,i,n){let o;const r=i;if(F(e)||re(e)){o=new Array(e.length);for(let s=0,a=e.length;s<a;s++)o[s]=t(e[s],s,void 0,r)}else if(typeof e=="number"){o=new Array(e);for(let s=0;s<e;s++)o[s]=t(s+1,s,void 0,r)}else if(Z(e))if(e[Symbol.iterator])o=Array.from(e,(s,a)=>t(s,a,void 0,r));else{const s=Object.keys(e);o=new Array(s.length);for(let a=0,l=s.length;a<l;a++){const d=s[a];o[a]=t(e[d],d,a,r)}}else o=[];return o}function qn(e,t,i={},n,o){if(le.isCE||le.parent&&Nt(le.parent)&&le.parent.isCE)return oe("slot",i,n);let r=e[t];r&&r._c&&(r._d=!1),be();const s=r&&yr(r(i)),a=dt(ge,{key:i.key||s&&s.key||`_${t}`},s||[],s&&e._===1?64:-2);return a.scopeId&&(a.slotScopeIds=[a.scopeId+"-s"]),r&&r._c&&(r._d=!0),a}function yr(e){return e.some(t=>mi(t)?!(t.type===tt||t.type===ge&&!yr(t.children)):!0)?e:null}const Ji=e=>e?Rr(e)?Pi(e)||e.proxy:Ji(e.parent):null,Vt=ue(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ji(e.parent),$root:e=>Ji(e.root),$emit:e=>e.emit,$options:e=>vn(e),$forceUpdate:e=>e.f||(e.f=()=>{e.effect.dirty=!0,kn(e.update)}),$nextTick:e=>e.n||(e.n=sr.bind(e.proxy)),$watch:e=>Zs.bind(e)}),Hi=(e,t)=>e!==X&&!e.__isScriptSetup&&D(e,t),da={get({_:e},t){const{ctx:i,setupState:n,data:o,props:r,accessCache:s,type:a,appContext:l}=e;let d;if(t[0]!=="$"){const b=s[t];if(b!==void 0)switch(b){case 1:return n[t];case 2:return o[t];case 4:return i[t];case 3:return r[t]}else{if(Hi(n,t))return s[t]=1,n[t];if(o!==X&&D(o,t))return s[t]=2,o[t];if((d=e.propsOptions[0])&&D(d,t))return s[t]=3,r[t];if(i!==X&&D(i,t))return s[t]=4,i[t];Xi&&(s[t]=0)}}const f=Vt[t];let h,m;if(f)return t==="$attrs"&&we(e,"get",t),f(e);if((h=a.__cssModules)&&(h=h[t]))return h;if(i!==X&&D(i,t))return s[t]=4,i[t];if(m=l.config.globalProperties,D(m,t))return m[t]},set({_:e},t,i){const{data:n,setupState:o,ctx:r}=e;return Hi(o,t)?(o[t]=i,!0):n!==X&&D(n,t)?(n[t]=i,!0):D(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(r[t]=i,!0)},has({_:{data:e,setupState:t,accessCache:i,ctx:n,appContext:o,propsOptions:r}},s){let a;return!!i[s]||e!==X&&D(e,s)||Hi(t,s)||(a=r[0])&&D(a,s)||D(n,s)||D(Vt,s)||D(o.config.globalProperties,s)},defineProperty(e,t,i){return i.get!=null?e._.accessCache[t]=0:D(i,"value")&&this.set(e,t,i.value,null),Reflect.defineProperty(e,t,i)}};function Kn(e){return F(e)?e.reduce((t,i)=>(t[i]=null,t),{}):e}let Xi=!0;function ha(e){const t=vn(e),i=e.proxy,n=e.ctx;Xi=!1,t.beforeCreate&&Gn(t.beforeCreate,e,"bc");const{data:o,computed:r,methods:s,watch:a,provide:l,inject:d,created:f,beforeMount:h,mounted:m,beforeUpdate:b,updated:x,activated:j,deactivated:M,beforeDestroy:C,beforeUnmount:H,destroyed:L,unmounted:q,render:ie,renderTracked:N,renderTriggered:pe,errorCaptured:Ie,serverPrefetch:mt,expose:Ce,inheritAttrs:ze,components:nt,directives:Pe,filters:Mt}=t;if(d&&pa(d,n,null),s)for(const Q in s){const K=s[Q];W(K)&&(n[Q]=K.bind(i))}if(o){const Q=o.call(i,i);Z(Q)&&(e.data=Ii(Q))}if(Xi=!0,r)for(const Q in r){const K=r[Q],Ne=W(K)?K.bind(i,i):W(K.get)?K.get.bind(i,i):Ae,qe=!W(K)&&W(K.set)?K.set.bind(i):Ae,Oe=ce({get:Ne,set:qe});Object.defineProperty(n,Q,{enumerable:!0,configurable:!0,get:()=>Oe.value,set:ye=>Oe.value=ye})}if(a)for(const Q in a)_r(a[Q],n,i,Q);if(l){const Q=W(l)?l.call(i):l;Reflect.ownKeys(Q).forEach(K=>{ai(K,Q[K])})}f&&Gn(f,e,"c");function se(Q,K){F(K)?K.forEach(Ne=>Q(Ne.bind(i))):K&&Q(K.bind(i))}if(se(na,h),se(oa,m),se(ra,b),se(sa,x),se(ea,j),se(ta,M),se(fa,Ie),se(ua,N),se(ca,pe),se(aa,H),se(gr,q),se(la,mt),F(Ce))if(Ce.length){const Q=e.exposed||(e.exposed={});Ce.forEach(K=>{Object.defineProperty(Q,K,{get:()=>i[K],set:Ne=>i[K]=Ne})})}else e.exposed||(e.exposed={});ie&&e.render===Ae&&(e.render=ie),ze!=null&&(e.inheritAttrs=ze),nt&&(e.components=nt),Pe&&(e.directives=Pe)}function pa(e,t,i=Ae){F(e)&&(e=Yi(e));for(const n in e){const o=e[n];let r;Z(o)?"default"in o?r=We(o.from||n,o.default,!0):r=We(o.from||n):r=We(o),ke(r)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>r.value,set:s=>r.value=s}):t[n]=r}}function Gn(e,t,i){xe(F(e)?e.map(n=>n.bind(t.proxy)):e.bind(t.proxy),t,i)}function _r(e,t,i,n){const o=n.includes(".")?hr(i,n):()=>i[n];if(re(e)){const r=t[e];W(r)&&si(o,r)}else if(W(e))si(o,e.bind(i));else if(Z(e))if(F(e))e.forEach(r=>_r(r,t,i,n));else{const r=W(e.handler)?e.handler.bind(i):t[e.handler];W(r)&&si(o,r,e)}}function vn(e){const t=e.type,{mixins:i,extends:n}=t,{mixins:o,optionsCache:r,config:{optionMergeStrategies:s}}=e.appContext,a=r.get(t);let l;return a?l=a:!o.length&&!i&&!n?l=t:(l={},o.length&&o.forEach(d=>hi(l,d,s,!0)),hi(l,t,s)),Z(t)&&r.set(t,l),l}function hi(e,t,i,n=!1){const{mixins:o,extends:r}=t;r&&hi(e,r,i,!0),o&&o.forEach(s=>hi(e,s,i,!0));for(const s in t)if(!(n&&s==="expose")){const a=ma[s]||i&&i[s];e[s]=a?a(e[s],t[s]):t[s]}return e}const ma={data:$n,props:Qn,emits:Qn,methods:Lt,computed:Lt,beforeCreate:me,created:me,beforeMount:me,mounted:me,beforeUpdate:me,updated:me,beforeDestroy:me,beforeUnmount:me,destroyed:me,unmounted:me,activated:me,deactivated:me,errorCaptured:me,serverPrefetch:me,components:Lt,directives:Lt,watch:ya,provide:$n,inject:ga};function $n(e,t){return t?e?function(){return ue(W(e)?e.call(this,this):e,W(t)?t.call(this,this):t)}:t:e}function ga(e,t){return Lt(Yi(e),Yi(t))}function Yi(e){if(F(e)){const t={};for(let i=0;i<e.length;i++)t[e[i]]=e[i];return t}return e}function me(e,t){return e?[...new Set([].concat(e,t))]:t}function Lt(e,t){return e?ue(Object.create(null),e,t):t}function Qn(e,t){return e?F(e)&&F(t)?[...new Set([...e,...t])]:ue(Object.create(null),Kn(e),Kn(t??{})):t}function ya(e,t){if(!e)return t;if(!t)return e;const i=ue(Object.create(null),e);for(const n in t)i[n]=me(e[n],t[n]);return i}function br(){return{app:null,config:{isNativeTag:Qr,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let _a=0;function ba(e,t){return function(n,o=null){W(n)||(n=ue({},n)),o!=null&&!Z(o)&&(o=null);const r=br(),s=new WeakSet;let a=!1;const l=r.app={_uid:_a++,_component:n,_props:o,_container:null,_context:r,_instance:null,version:za,get config(){return r.config},set config(d){},use(d,...f){return s.has(d)||(d&&W(d.install)?(s.add(d),d.install(l,...f)):W(d)&&(s.add(d),d(l,...f))),l},mixin(d){return r.mixins.includes(d)||r.mixins.push(d),l},component(d,f){return f?(r.components[d]=f,l):r.components[d]},directive(d,f){return f?(r.directives[d]=f,l):r.directives[d]},mount(d,f,h){if(!a){const m=oe(n,o);return m.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),f&&t?t(m,d):e(m,d,h),a=!0,l._container=d,d.__vue_app__=l,Pi(m.component)||m.component.proxy}},unmount(){a&&(e(null,l._container),delete l._container.__vue_app__)},provide(d,f){return r.provides[d]=f,l},runWithContext(d){pi=l;try{return d()}finally{pi=null}}};return l}}let pi=null;function ai(e,t){if(he){let i=he.provides;const n=he.parent&&he.parent.provides;n===i&&(i=he.provides=Object.create(n)),i[e]=t}}function We(e,t,i=!1){const n=he||le;if(n||pi){const o=n?n.parent==null?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:pi._context.provides;if(o&&e in o)return o[e];if(arguments.length>1)return i&&W(t)?t.call(n&&n.proxy):t}}function wa(e,t,i,n=!1){const o={},r={};ui(r,Ri,1),e.propsDefaults=Object.create(null),wr(e,t,o,r);for(const s in e.propsOptions[0])s in o||(o[s]=void 0);i?e.props=n?o:Xo(o):e.type.props?e.props=o:e.props=r,e.attrs=r}function ka(e,t,i,n){const{props:o,attrs:r,vnode:{patchFlag:s}}=e,a=z(o),[l]=e.propsOptions;let d=!1;if((n||s>0)&&!(s&16)){if(s&8){const f=e.vnode.dynamicProps;for(let h=0;h<f.length;h++){let m=f[h];if(Si(e.emitsOptions,m))continue;const b=t[m];if(l)if(D(r,m))b!==r[m]&&(r[m]=b,d=!0);else{const x=Le(m);o[x]=Zi(l,a,x,b,e,!1)}else b!==r[m]&&(r[m]=b,d=!0)}}}else{wr(e,t,o,r)&&(d=!0);let f;for(const h in a)(!t||!D(t,h)&&((f=jt(h))===h||!D(t,f)))&&(l?i&&(i[h]!==void 0||i[f]!==void 0)&&(o[h]=Zi(l,a,h,void 0,e,!0)):delete o[h]);if(r!==a)for(const h in r)(!t||!D(t,h))&&(delete r[h],d=!0)}d&&De(e,"set","$attrs")}function wr(e,t,i,n){const[o,r]=e.propsOptions;let s=!1,a;if(t)for(let l in t){if(oi(l))continue;const d=t[l];let f;o&&D(o,f=Le(l))?!r||!r.includes(f)?i[f]=d:(a||(a={}))[f]=d:Si(e.emitsOptions,l)||(!(l in n)||d!==n[l])&&(n[l]=d,s=!0)}if(r){const l=z(i),d=a||X;for(let f=0;f<r.length;f++){const h=r[f];i[h]=Zi(o,l,h,d[h],e,!D(d,h))}}return s}function Zi(e,t,i,n,o,r){const s=e[i];if(s!=null){const a=D(s,"default");if(a&&n===void 0){const l=s.default;if(s.type!==Function&&!s.skipFactory&&W(l)){const{propsDefaults:d}=o;if(i in d)n=d[i];else{const f=Jt(o);n=d[i]=l.call(null,t),f()}}else n=l}s[0]&&(r&&!a?n=!1:s[1]&&(n===""||n===jt(i))&&(n=!0))}return n}function kr(e,t,i=!1){const n=t.propsCache,o=n.get(e);if(o)return o;const r=e.props,s={},a=[];let l=!1;if(!W(e)){const f=h=>{l=!0;const[m,b]=kr(h,t,!0);ue(s,m),b&&a.push(...b)};!i&&t.mixins.length&&t.mixins.forEach(f),e.extends&&f(e.extends),e.mixins&&e.mixins.forEach(f)}if(!r&&!l)return Z(e)&&n.set(e,vt),vt;if(F(r))for(let f=0;f<r.length;f++){const h=Le(r[f]);Jn(h)&&(s[h]=X)}else if(r)for(const f in r){const h=Le(f);if(Jn(h)){const m=r[f],b=s[h]=F(m)||W(m)?{type:m}:ue({},m);if(b){const x=Zn(Boolean,b.type),j=Zn(String,b.type);b[0]=x>-1,b[1]=j<0||x<j,(x>-1||D(b,"default"))&&a.push(h)}}}const d=[s,a];return Z(e)&&n.set(e,d),d}function Jn(e){return e[0]!=="$"}function Xn(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function Yn(e,t){return Xn(e)===Xn(t)}function Zn(e,t){return F(t)?t.findIndex(i=>Yn(i,e)):W(t)&&Yn(t,e)?0:-1}const vr=e=>e[0]==="_"||e==="$stable",In=e=>F(e)?e.map(Be):[Be(e)],va=(e,t,i)=>{if(t._n)return t;const n=ut((...o)=>In(t(...o)),i);return n._c=!1,n},Ir=(e,t,i)=>{const n=e._ctx;for(const o in e){if(vr(o))continue;const r=e[o];if(W(r))t[o]=va(o,r,n);else if(r!=null){const s=In(r);t[o]=()=>s}}},Ar=(e,t)=>{const i=In(t);e.slots.default=()=>i},Ia=(e,t)=>{if(e.vnode.shapeFlag&32){const i=t._;i?(e.slots=z(t),ui(t,"_",i)):Ir(t,e.slots={})}else e.slots={},t&&Ar(e,t);ui(e.slots,Ri,1)},Aa=(e,t,i)=>{const{vnode:n,slots:o}=e;let r=!0,s=X;if(n.shapeFlag&32){const a=t._;a?i&&a===1?r=!1:(ue(o,t),!i&&a===1&&delete o._):(r=!t.$stable,Ir(t,o)),s=t}else t&&(Ar(e,t),s={default:1});if(r)for(const a in o)!vr(a)&&s[a]==null&&delete o[a]};function en(e,t,i,n,o=!1){if(F(e)){e.forEach((m,b)=>en(m,t&&(F(t)?t[b]:t),i,n,o));return}if(Nt(n)&&!o)return;const r=n.shapeFlag&4?Pi(n.component)||n.component.proxy:n.el,s=o?null:r,{i:a,r:l}=e,d=t&&t.r,f=a.refs===X?a.refs={}:a.refs,h=a.setupState;if(d!=null&&d!==l&&(re(d)?(f[d]=null,D(h,d)&&(h[d]=null)):ke(d)&&(d.value=null)),W(l))Ze(l,a,12,[s,f]);else{const m=re(l),b=ke(l),x=e.f;if(m||b){const j=()=>{if(x){const M=m?D(h,l)?h[l]:f[l]:l.value;o?F(M)&&cn(M,r):F(M)?M.includes(r)||M.push(r):m?(f[l]=[r],D(h,l)&&(h[l]=f[l])):(l.value=[r],e.k&&(f[e.k]=l.value))}else m?(f[l]=s,D(h,l)&&(h[l]=s)):b&&(l.value=s,e.k&&(f[e.k]=s))};o||x?j():(j.id=-1,_e(j,i))}}}const _e=Js;function Sa(e){return Ea(e)}function Ea(e,t){const i=Fo();i.__VUE__=!0;const{insert:n,remove:o,patchProp:r,createElement:s,createText:a,createComment:l,setText:d,setElementText:f,parentNode:h,nextSibling:m,setScopeId:b=Ae,insertStaticContent:x}=e,j=(c,u,p,_=null,g=null,v=null,S=void 0,k=null,I=!!u.dynamicChildren)=>{if(c===u)return;c&&!Ft(c,u)&&(_=y(c),ye(c,g,v,!0),c=null),u.patchFlag===-2&&(I=!1,u.dynamicChildren=null);const{type:w,ref:T,shapeFlag:O}=u;switch(w){case xi:M(c,u,p,_);break;case tt:C(c,u,p,_);break;case Li:c==null&&H(u,p,_,S);break;case ge:nt(c,u,p,_,g,v,S,k,I);break;default:O&1?ie(c,u,p,_,g,v,S,k,I):O&6?Pe(c,u,p,_,g,v,S,k,I):(O&64||O&128)&&w.process(c,u,p,_,g,v,S,k,I,R)}T!=null&&g&&en(T,c&&c.ref,v,u||c,!u)},M=(c,u,p,_)=>{if(c==null)n(u.el=a(u.children),p,_);else{const g=u.el=c.el;u.children!==c.children&&d(g,u.children)}},C=(c,u,p,_)=>{c==null?n(u.el=l(u.children||""),p,_):u.el=c.el},H=(c,u,p,_)=>{[c.el,c.anchor]=x(c.children,u,p,_,c.el,c.anchor)},L=({el:c,anchor:u},p,_)=>{let g;for(;c&&c!==u;)g=m(c),n(c,p,_),c=g;n(u,p,_)},q=({el:c,anchor:u})=>{let p;for(;c&&c!==u;)p=m(c),o(c),c=p;o(u)},ie=(c,u,p,_,g,v,S,k,I)=>{u.type==="svg"?S="svg":u.type==="math"&&(S="mathml"),c==null?N(u,p,_,g,v,S,k,I):mt(c,u,g,v,S,k,I)},N=(c,u,p,_,g,v,S,k)=>{let I,w;const{props:T,shapeFlag:O,transition:P,dirs:B}=c;if(I=c.el=s(c.type,v,T&&T.is,T),O&8?f(I,c.children):O&16&&Ie(c.children,I,null,_,g,Wi(c,v),S,k),B&&ot(c,null,_,"created"),pe(I,c,c.scopeId,S,_),T){for(const J in T)J!=="value"&&!oi(J)&&r(I,J,null,T[J],v,c.children,_,g,fe);"value"in T&&r(I,"value",null,T.value,v),(w=T.onVnodeBeforeMount)&&Me(w,_,c)}B&&ot(c,null,_,"beforeMount");const V=Ta(g,P);V&&P.beforeEnter(I),n(I,u,p),((w=T&&T.onVnodeMounted)||V||B)&&_e(()=>{w&&Me(w,_,c),V&&P.enter(I),B&&ot(c,null,_,"mounted")},g)},pe=(c,u,p,_,g)=>{if(p&&b(c,p),_)for(let v=0;v<_.length;v++)b(c,_[v]);if(g){let v=g.subTree;if(u===v){const S=g.vnode;pe(c,S,S.scopeId,S.slotScopeIds,g.parent)}}},Ie=(c,u,p,_,g,v,S,k,I=0)=>{for(let w=I;w<c.length;w++){const T=c[w]=k?Qe(c[w]):Be(c[w]);j(null,T,u,p,_,g,v,S,k)}},mt=(c,u,p,_,g,v,S)=>{const k=u.el=c.el;let{patchFlag:I,dynamicChildren:w,dirs:T}=u;I|=c.patchFlag&16;const O=c.props||X,P=u.props||X;let B;if(p&&rt(p,!1),(B=P.onVnodeBeforeUpdate)&&Me(B,p,u,c),T&&ot(u,c,p,"beforeUpdate"),p&&rt(p,!0),w?Ce(c.dynamicChildren,w,k,p,_,Wi(u,g),v):S||K(c,u,k,null,p,_,Wi(u,g),v,!1),I>0){if(I&16)ze(k,u,O,P,p,_,g);else if(I&2&&O.class!==P.class&&r(k,"class",null,P.class,g),I&4&&r(k,"style",O.style,P.style,g),I&8){const V=u.dynamicProps;for(let J=0;J<V.length;J++){const Y=V[J],ae=O[Y],Se=P[Y];(Se!==ae||Y==="value")&&r(k,Y,ae,Se,g,c.children,p,_,fe)}}I&1&&c.children!==u.children&&f(k,u.children)}else!S&&w==null&&ze(k,u,O,P,p,_,g);((B=P.onVnodeUpdated)||T)&&_e(()=>{B&&Me(B,p,u,c),T&&ot(u,c,p,"updated")},_)},Ce=(c,u,p,_,g,v,S)=>{for(let k=0;k<u.length;k++){const I=c[k],w=u[k],T=I.el&&(I.type===ge||!Ft(I,w)||I.shapeFlag&70)?h(I.el):p;j(I,w,T,null,_,g,v,S,!0)}},ze=(c,u,p,_,g,v,S)=>{if(p!==_){if(p!==X)for(const k in p)!oi(k)&&!(k in _)&&r(c,k,p[k],null,S,u.children,g,v,fe);for(const k in _){if(oi(k))continue;const I=_[k],w=p[k];I!==w&&k!=="value"&&r(c,k,w,I,S,u.children,g,v,fe)}"value"in _&&r(c,"value",p.value,_.value,S)}},nt=(c,u,p,_,g,v,S,k,I)=>{const w=u.el=c?c.el:a(""),T=u.anchor=c?c.anchor:a("");let{patchFlag:O,dynamicChildren:P,slotScopeIds:B}=u;B&&(k=k?k.concat(B):B),c==null?(n(w,p,_),n(T,p,_),Ie(u.children||[],p,T,g,v,S,k,I)):O>0&&O&64&&P&&c.dynamicChildren?(Ce(c.dynamicChildren,P,p,g,v,S,k),(u.key!=null||g&&u===g.subTree)&&Sr(c,u,!0)):K(c,u,p,T,g,v,S,k,I)},Pe=(c,u,p,_,g,v,S,k,I)=>{u.slotScopeIds=k,c==null?u.shapeFlag&512?g.ctx.activate(u,p,_,S,I):Mt(u,p,_,g,v,S,I):gt(c,u,I)},Mt=(c,u,p,_,g,v,S)=>{const k=c.component=Ha(c,_,g);if(pr(c)&&(k.ctx.renderer=R),Wa(k),k.asyncDep){if(g&&g.registerDep(k,se),!c.el){const I=k.subTree=oe(tt);C(null,I,u,p)}}else se(k,c,u,p,g,v,S)},gt=(c,u,p)=>{const _=u.component=c.component;if(zs(c,u,p))if(_.asyncDep&&!_.asyncResolved){Q(_,u,p);return}else _.next=u,Fs(_.update),_.effect.dirty=!0,_.update();else u.el=c.el,_.vnode=u},se=(c,u,p,_,g,v,S)=>{const k=()=>{if(c.isMounted){let{next:T,bu:O,u:P,parent:B,vnode:V}=c;{const bt=Er(c);if(bt){T&&(T.el=V.el,Q(c,T,S)),bt.asyncDep.then(()=>{c.isUnmounted||k()});return}}let J=T,Y;rt(c,!1),T?(T.el=V.el,Q(c,T,S)):T=V,O&&Mi(O),(Y=T.props&&T.props.onVnodeBeforeUpdate)&&Me(Y,B,T,V),rt(c,!0);const ae=Fi(c),Se=c.subTree;c.subTree=ae,j(Se,ae,h(Se.el),y(Se),c,g,v),T.el=ae.el,J===null&&qs(c,ae.el),P&&_e(P,g),(Y=T.props&&T.props.onVnodeUpdated)&&_e(()=>Me(Y,B,T,V),g)}else{let T;const{el:O,props:P}=u,{bm:B,m:V,parent:J}=c,Y=Nt(u);if(rt(c,!1),B&&Mi(B),!Y&&(T=P&&P.onVnodeBeforeMount)&&Me(T,J,u),rt(c,!0),O&&ee){const ae=()=>{c.subTree=Fi(c),ee(O,c.subTree,c,g,null)};Y?u.type.__asyncLoader().then(()=>!c.isUnmounted&&ae()):ae()}else{const ae=c.subTree=Fi(c);j(null,ae,p,_,c,g,v),u.el=ae.el}if(V&&_e(V,g),!Y&&(T=P&&P.onVnodeMounted)){const ae=u;_e(()=>Me(T,J,ae),g)}(u.shapeFlag&256||J&&Nt(J.vnode)&&J.vnode.shapeFlag&256)&&c.a&&_e(c.a,g),c.isMounted=!0,u=p=_=null}},I=c.effect=new hn(k,Ae,()=>kn(w),c.scope),w=c.update=()=>{I.dirty&&I.run()};w.id=c.uid,rt(c,!0),w()},Q=(c,u,p)=>{u.component=c;const _=c.vnode.props;c.vnode=u,c.next=null,ka(c,u.props,_,p),Aa(c,u.children,p),ht(),Vn(c),pt()},K=(c,u,p,_,g,v,S,k,I=!1)=>{const w=c&&c.children,T=c?c.shapeFlag:0,O=u.children,{patchFlag:P,shapeFlag:B}=u;if(P>0){if(P&128){qe(w,O,p,_,g,v,S,k,I);return}else if(P&256){Ne(w,O,p,_,g,v,S,k,I);return}}B&8?(T&16&&fe(w,g,v),O!==w&&f(p,O)):T&16?B&16?qe(w,O,p,_,g,v,S,k,I):fe(w,g,v,!0):(T&8&&f(p,""),B&16&&Ie(O,p,_,g,v,S,k,I))},Ne=(c,u,p,_,g,v,S,k,I)=>{c=c||vt,u=u||vt;const w=c.length,T=u.length,O=Math.min(w,T);let P;for(P=0;P<O;P++){const B=u[P]=I?Qe(u[P]):Be(u[P]);j(c[P],B,p,null,g,v,S,k,I)}w>T?fe(c,g,v,!0,!1,O):Ie(u,p,_,g,v,S,k,I,O)},qe=(c,u,p,_,g,v,S,k,I)=>{let w=0;const T=u.length;let O=c.length-1,P=T-1;for(;w<=O&&w<=P;){const B=c[w],V=u[w]=I?Qe(u[w]):Be(u[w]);if(Ft(B,V))j(B,V,p,null,g,v,S,k,I);else break;w++}for(;w<=O&&w<=P;){const B=c[O],V=u[P]=I?Qe(u[P]):Be(u[P]);if(Ft(B,V))j(B,V,p,null,g,v,S,k,I);else break;O--,P--}if(w>O){if(w<=P){const B=P+1,V=B<T?u[B].el:_;for(;w<=P;)j(null,u[w]=I?Qe(u[w]):Be(u[w]),p,V,g,v,S,k,I),w++}}else if(w>P)for(;w<=O;)ye(c[w],g,v,!0),w++;else{const B=w,V=w,J=new Map;for(w=V;w<=P;w++){const ve=u[w]=I?Qe(u[w]):Be(u[w]);ve.key!=null&&J.set(ve.key,w)}let Y,ae=0;const Se=P-V+1;let bt=!1,Rn=0;const Bt=new Array(Se);for(w=0;w<Se;w++)Bt[w]=0;for(w=B;w<=O;w++){const ve=c[w];if(ae>=Se){ye(ve,g,v,!0);continue}let je;if(ve.key!=null)je=J.get(ve.key);else for(Y=V;Y<=P;Y++)if(Bt[Y-V]===0&&Ft(ve,u[Y])){je=Y;break}je===void 0?ye(ve,g,v,!0):(Bt[je-V]=w+1,je>=Rn?Rn=je:bt=!0,j(ve,u[je],p,null,g,v,S,k,I),ae++)}const Cn=bt?xa(Bt):vt;for(Y=Cn.length-1,w=Se-1;w>=0;w--){const ve=V+w,je=u[ve],Pn=ve+1<T?u[ve+1].el:_;Bt[w]===0?j(null,je,p,Pn,g,v,S,k,I):bt&&(Y<0||w!==Cn[Y]?Oe(je,p,Pn,2):Y--)}}},Oe=(c,u,p,_,g=null)=>{const{el:v,type:S,transition:k,children:I,shapeFlag:w}=c;if(w&6){Oe(c.component.subTree,u,p,_);return}if(w&128){c.suspense.move(u,p,_);return}if(w&64){S.move(c,u,p,R);return}if(S===ge){n(v,u,p);for(let O=0;O<I.length;O++)Oe(I[O],u,p,_);n(c.anchor,u,p);return}if(S===Li){L(c,u,p);return}if(_!==2&&w&1&&k)if(_===0)k.beforeEnter(v),n(v,u,p),_e(()=>k.enter(v),g);else{const{leave:O,delayLeave:P,afterLeave:B}=k,V=()=>n(v,u,p),J=()=>{O(v,()=>{V(),B&&B()})};P?P(v,V,J):J()}else n(v,u,p)},ye=(c,u,p,_=!1,g=!1)=>{const{type:v,props:S,ref:k,children:I,dynamicChildren:w,shapeFlag:T,patchFlag:O,dirs:P}=c;if(k!=null&&en(k,null,p,c,!0),T&256){u.ctx.deactivate(c);return}const B=T&1&&P,V=!Nt(c);let J;if(V&&(J=S&&S.onVnodeBeforeUnmount)&&Me(J,u,c),T&6)Xt(c.component,p,_);else{if(T&128){c.suspense.unmount(p,_);return}B&&ot(c,null,u,"beforeUnmount"),T&64?c.type.remove(c,u,p,g,R,_):w&&(v!==ge||O>0&&O&64)?fe(w,u,p,!1,!0):(v===ge&&O&384||!g&&T&16)&&fe(I,u,p),_&&yt(c)}(V&&(J=S&&S.onVnodeUnmounted)||B)&&_e(()=>{J&&Me(J,u,c),B&&ot(c,null,u,"unmounted")},p)},yt=c=>{const{type:u,el:p,anchor:_,transition:g}=c;if(u===ge){_t(p,_);return}if(u===Li){q(c);return}const v=()=>{o(p),g&&!g.persisted&&g.afterLeave&&g.afterLeave()};if(c.shapeFlag&1&&g&&!g.persisted){const{leave:S,delayLeave:k}=g,I=()=>S(p,v);k?k(c.el,v,I):I()}else v()},_t=(c,u)=>{let p;for(;c!==u;)p=m(c),o(c),c=p;o(u)},Xt=(c,u,p)=>{const{bum:_,scope:g,update:v,subTree:S,um:k}=c;_&&Mi(_),g.stop(),v&&(v.active=!1,ye(S,c,u,p)),k&&_e(k,u),_e(()=>{c.isUnmounted=!0},u),u&&u.pendingBranch&&!u.isUnmounted&&c.asyncDep&&!c.asyncResolved&&c.suspenseId===u.pendingId&&(u.deps--,u.deps===0&&u.resolve())},fe=(c,u,p,_=!1,g=!1,v=0)=>{for(let S=v;S<c.length;S++)ye(c[S],u,p,_,g)},y=c=>c.shapeFlag&6?y(c.component.subTree):c.shapeFlag&128?c.suspense.next():m(c.anchor||c.el);let E=!1;const A=(c,u,p)=>{c==null?u._vnode&&ye(u._vnode,null,null,!0):j(u._vnode||null,c,u,null,null,null,p),E||(E=!0,Vn(),lr(),E=!1),u._vnode=c},R={p:j,um:ye,m:Oe,r:yt,mt:Mt,mc:Ie,pc:K,pbc:Ce,n:y,o:e};let G,ee;return{render:A,hydrate:G,createApp:ba(A,G)}}function Wi({type:e,props:t},i){return i==="svg"&&e==="foreignObject"||i==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:i}function rt({effect:e,update:t},i){e.allowRecurse=t.allowRecurse=i}function Ta(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Sr(e,t,i=!1){const n=e.children,o=t.children;if(F(n)&&F(o))for(let r=0;r<n.length;r++){const s=n[r];let a=o[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=o[r]=Qe(o[r]),a.el=s.el),i||Sr(s,a)),a.type===xi&&(a.el=s.el)}}function xa(e){const t=e.slice(),i=[0];let n,o,r,s,a;const l=e.length;for(n=0;n<l;n++){const d=e[n];if(d!==0){if(o=i[i.length-1],e[o]<d){t[n]=o,i.push(n);continue}for(r=0,s=i.length-1;r<s;)a=r+s>>1,e[i[a]]<d?r=a+1:s=a;d<e[i[r]]&&(r>0&&(t[n]=i[r-1]),i[r]=n)}}for(r=i.length,s=i[r-1];r-- >0;)i[r]=s,s=t[s];return i}function Er(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Er(t)}const Ra=e=>e.__isTeleport,ge=Symbol.for("v-fgt"),xi=Symbol.for("v-txt"),tt=Symbol.for("v-cmt"),Li=Symbol.for("v-stc"),Dt=[];let Te=null;function be(e=!1){Dt.push(Te=e?null:[])}function Ca(){Dt.pop(),Te=Dt[Dt.length-1]||null}let $t=1;function eo(e){$t+=e}function Tr(e){return e.dynamicChildren=$t>0?Te||vt:null,Ca(),$t>0&&Te&&Te.push(e),e}function ft(e,t,i,n,o,r){return Tr(ne(e,t,i,n,o,r,!0))}function dt(e,t,i,n,o){return Tr(oe(e,t,i,n,o,!0))}function mi(e){return e?e.__v_isVNode===!0:!1}function Ft(e,t){return e.type===t.type&&e.key===t.key}const Ri="__vInternal",xr=({key:e})=>e??null,li=({ref:e,ref_key:t,ref_for:i})=>(typeof e=="number"&&(e=""+e),e!=null?re(e)||ke(e)||W(e)?{i:le,r:e,k:t,f:!!i}:e:null);function ne(e,t=null,i=null,n=0,o=null,r=e===ge?0:1,s=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&xr(t),ref:t&&li(t),scopeId:Ei,slotScopeIds:null,children:i,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:n,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:le};return a?(An(l,i),r&128&&e.normalize(l)):i&&(l.shapeFlag|=re(i)?8:16),$t>0&&!s&&Te&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&Te.push(l),l}const oe=Pa;function Pa(e,t=null,i=null,n=0,o=null,r=!1){if((!e||e===Gs)&&(e=tt),mi(e)){const a=Tt(e,t,!0);return i&&An(a,i),$t>0&&!r&&Te&&(a.shapeFlag&6?Te[Te.indexOf(e)]=a:Te.push(a)),a.patchFlag|=-2,a}if(Ua(e)&&(e=e.__vccOpts),t){t=Oa(t);let{class:a,style:l}=t;a&&!re(a)&&(t.class=dn(a)),Z(l)&&(Zo(l)&&!F(l)&&(l=ue({},l)),t.style=fn(l))}const s=re(e)?1:Qs(e)?128:Ra(e)?64:Z(e)?4:W(e)?2:0;return ne(e,t,i,n,o,s,r,!0)}function Oa(e){return e?Zo(e)||Ri in e?ue({},e):e:null}function Tt(e,t,i=!1){const{props:n,ref:o,patchFlag:r,children:s}=e,a=t?Ma(n||{},t):n;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:a,key:a&&xr(a),ref:t&&t.ref?i&&o?F(o)?o.concat(li(t)):[o,li(t)]:li(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ge?r===-1?16:r|16:r,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Tt(e.ssContent),ssFallback:e.ssFallback&&Tt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function xt(e=" ",t=0){return oe(xi,null,e,t)}function ja(e="",t=!1){return t?(be(),dt(tt,null,e)):oe(tt,null,e)}function Be(e){return e==null||typeof e=="boolean"?oe(tt):F(e)?oe(ge,null,e.slice()):typeof e=="object"?Qe(e):oe(xi,null,String(e))}function Qe(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Tt(e)}function An(e,t){let i=0;const{shapeFlag:n}=e;if(t==null)t=null;else if(F(t))i=16;else if(typeof t=="object")if(n&65){const o=t.default;o&&(o._c&&(o._d=!1),An(e,o()),o._c&&(o._d=!0));return}else{i=32;const o=t._;!o&&!(Ri in t)?t._ctx=le:o===3&&le&&(le.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else W(t)?(t={default:t,_ctx:le},i=32):(t=String(t),n&64?(i=16,t=[xt(t)]):i=8);e.children=t,e.shapeFlag|=i}function Ma(...e){const t={};for(let i=0;i<e.length;i++){const n=e[i];for(const o in n)if(o==="class")t.class!==n.class&&(t.class=dn([t.class,n.class]));else if(o==="style")t.style=fn([t.style,n.style]);else if(_i(o)){const r=t[o],s=n[o];s&&r!==s&&!(F(r)&&r.includes(s))&&(t[o]=r?[].concat(r,s):s)}else o!==""&&(t[o]=n[o])}return t}function Me(e,t,i,n=null){xe(e,t,7,[i,n])}const Ba=br();let Fa=0;function Ha(e,t,i){const n=e.type,o=(t?t.appContext:e.appContext)||Ba,r={uid:Fa++,vnode:e,type:n,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,scope:new as(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:kr(n,o),emitsOptions:ur(n,o),emit:null,emitted:null,propsDefaults:X,inheritAttrs:n.inheritAttrs,ctx:X,data:X,props:X,attrs:X,slots:X,refs:X,setupState:X,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:i,suspenseId:i?i.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=Ls.bind(null,r),e.ce&&e.ce(r),r}let he=null,gi,tn;{const e=Fo(),t=(i,n)=>{let o;return(o=e[i])||(o=e[i]=[]),o.push(n),r=>{o.length>1?o.forEach(s=>s(r)):o[0](r)}};gi=t("__VUE_INSTANCE_SETTERS__",i=>he=i),tn=t("__VUE_SSR_SETTERS__",i=>Ci=i)}const Jt=e=>{const t=he;return gi(e),e.scope.on(),()=>{e.scope.off(),gi(t)}},to=()=>{he&&he.scope.off(),gi(null)};function Rr(e){return e.vnode.shapeFlag&4}let Ci=!1;function Wa(e,t=!1){t&&tn(t);const{props:i,children:n}=e.vnode,o=Rr(e);wa(e,i,o,t),Ia(e,n);const r=o?La(e,t):void 0;return t&&tn(!1),r}function La(e,t){const i=e.type;e.accessCache=Object.create(null),e.proxy=er(new Proxy(e.ctx,da));const{setup:n}=i;if(n){const o=e.setupContext=n.length>1?Va(e):null,r=Jt(e);ht();const s=Ze(n,e,0,[e.props,o]);if(pt(),r(),jo(s)){if(s.then(to,to),t)return s.then(a=>{io(e,a,t)}).catch(a=>{Ai(a,e,0)});e.asyncDep=s}else io(e,s,t)}else Cr(e,t)}function io(e,t,i){W(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Z(t)&&(e.setupState=or(t)),Cr(e,i)}let no;function Cr(e,t,i){const n=e.type;if(!e.render){if(!t&&no&&!n.render){const o=n.template||vn(e).template;if(o){const{isCustomElement:r,compilerOptions:s}=e.appContext.config,{delimiters:a,compilerOptions:l}=n,d=ue(ue({isCustomElement:r,delimiters:a},s),l);n.render=no(o,d)}}e.render=n.render||Ae}{const o=Jt(e);ht();try{ha(e)}finally{pt(),o()}}}function Na(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,i){return we(e,"get","$attrs"),t[i]}}))}function Va(e){const t=i=>{e.exposed=i||{}};return{get attrs(){return Na(e)},slots:e.slots,emit:e.emit,expose:t}}function Pi(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(or(er(e.exposed)),{get(t,i){if(i in t)return t[i];if(i in Vt)return Vt[i](e)},has(t,i){return i in t||i in Vt}}))}function Da(e,t=!0){return W(e)?e.displayName||e.name:e.name||t&&e.__name}function Ua(e){return W(e)&&"__vccOpts"in e}const ce=(e,t)=>Rs(e,t,Ci);function Pr(e,t,i){const n=arguments.length;return n===2?Z(t)&&!F(t)?mi(t)?oe(e,null,[t]):oe(e,t):oe(e,null,t):(n>3?i=Array.prototype.slice.call(arguments,2):n===3&&mi(i)&&(i=[i]),oe(e,t,i))}const za="3.4.15";/**
* @vue/runtime-dom v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const qa="http://www.w3.org/2000/svg",Ka="http://www.w3.org/1998/Math/MathML",Je=typeof document<"u"?document:null,oo=Je&&Je.createElement("template"),Ga={insert:(e,t,i)=>{t.insertBefore(e,i||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,i,n)=>{const o=t==="svg"?Je.createElementNS(qa,e):t==="mathml"?Je.createElementNS(Ka,e):Je.createElement(e,i?{is:i}:void 0);return e==="select"&&n&&n.multiple!=null&&o.setAttribute("multiple",n.multiple),o},createText:e=>Je.createTextNode(e),createComment:e=>Je.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Je.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,i,n,o,r){const s=i?i.previousSibling:t.lastChild;if(o&&(o===r||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),i),!(o===r||!(o=o.nextSibling)););else{oo.innerHTML=n==="svg"?`<svg>${e}</svg>`:n==="mathml"?`<math>${e}</math>`:e;const a=oo.content;if(n==="svg"||n==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,i)}return[s?s.nextSibling:t.firstChild,i?i.previousSibling:t.lastChild]}},$a=Symbol("_vtc");function Qa(e,t,i){const n=e[$a];n&&(t=(t?[t,...n]:[...n]).join(" ")),t==null?e.removeAttribute("class"):i?e.setAttribute("class",t):e.className=t}const Sn=Symbol("_vod"),pu={beforeMount(e,{value:t},{transition:i}){e[Sn]=e.style.display==="none"?"":e.style.display,i&&t?i.beforeEnter(e):Ht(e,t)},mounted(e,{value:t},{transition:i}){i&&t&&i.enter(e)},updated(e,{value:t,oldValue:i},{transition:n}){!t!=!i&&(n?t?(n.beforeEnter(e),Ht(e,!0),n.enter(e)):n.leave(e,()=>{Ht(e,!1)}):Ht(e,t))},beforeUnmount(e,{value:t}){Ht(e,t)}};function Ht(e,t){e.style.display=t?e[Sn]:"none"}const Ja=Symbol("");function Xa(e,t,i){const n=e.style,o=n.display,r=re(i);if(i&&!r){if(t&&!re(t))for(const s in t)i[s]==null&&nn(n,s,"");for(const s in i)nn(n,s,i[s])}else if(r){if(t!==i){const s=n[Ja];s&&(i+=";"+s),n.cssText=i}}else t&&e.removeAttribute("style");Sn in e&&(n.display=o)}const ro=/\s*!important$/;function nn(e,t,i){if(F(i))i.forEach(n=>nn(e,t,n));else if(i==null&&(i=""),t.startsWith("--"))e.setProperty(t,i);else{const n=Ya(e,t);ro.test(i)?e.setProperty(jt(n),i.replace(ro,""),"important"):e[n]=i}}const so=["Webkit","Moz","ms"],Ni={};function Ya(e,t){const i=Ni[t];if(i)return i;let n=Le(t);if(n!=="filter"&&n in e)return Ni[t]=n;n=ki(n);for(let o=0;o<so.length;o++){const r=so[o]+n;if(r in e)return Ni[t]=r}return t}const ao="http://www.w3.org/1999/xlink";function Za(e,t,i,n,o){if(n&&t.startsWith("xlink:"))i==null?e.removeAttributeNS(ao,t.slice(6,t.length)):e.setAttributeNS(ao,t,i);else{const r=ss(t);i==null||r&&!Ho(i)?e.removeAttribute(t):e.setAttribute(t,r?"":i)}}function el(e,t,i,n,o,r,s){if(t==="innerHTML"||t==="textContent"){n&&s(n,o,r),e[t]=i??"";return}const a=e.tagName;if(t==="value"&&a!=="PROGRESS"&&!a.includes("-")){e._value=i;const d=a==="OPTION"?e.getAttribute("value"):e.value,f=i??"";d!==f&&(e.value=f),i==null&&e.removeAttribute(t);return}let l=!1;if(i===""||i==null){const d=typeof e[t];d==="boolean"?i=Ho(i):i==null&&d==="string"?(i="",l=!0):d==="number"&&(i=0,l=!0)}try{e[t]=i}catch{}l&&e.removeAttribute(t)}function tl(e,t,i,n){e.addEventListener(t,i,n)}function il(e,t,i,n){e.removeEventListener(t,i,n)}const lo=Symbol("_vei");function nl(e,t,i,n,o=null){const r=e[lo]||(e[lo]={}),s=r[t];if(n&&s)s.value=n;else{const[a,l]=ol(t);if(n){const d=r[t]=al(n,o);tl(e,a,d,l)}else s&&(il(e,a,s,l),r[t]=void 0)}}const co=/(?:Once|Passive|Capture)$/;function ol(e){let t;if(co.test(e)){t={};let n;for(;n=e.match(co);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):jt(e.slice(2)),t]}let Vi=0;const rl=Promise.resolve(),sl=()=>Vi||(rl.then(()=>Vi=0),Vi=Date.now());function al(e,t){const i=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=i.attached)return;xe(ll(n,i.value),t,5,[n])};return i.value=e,i.attached=sl(),i}function ll(e,t){if(F(t)){const i=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{i.call(e),e._stopped=!0},t.map(n=>o=>!o._stopped&&n&&n(o))}else return t}const uo=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,cl=(e,t,i,n,o,r,s,a,l)=>{const d=o==="svg";t==="class"?Qa(e,n,d):t==="style"?Xa(e,i,n):_i(t)?ln(t)||nl(e,t,i,n,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):ul(e,t,n,d))?el(e,t,n,r,s,a,l):(t==="true-value"?e._trueValue=n:t==="false-value"&&(e._falseValue=n),Za(e,t,n,d))};function ul(e,t,i,n){if(n)return!!(t==="innerHTML"||t==="textContent"||t in e&&uo(t)&&W(i));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const o=e.tagName;if(o==="IMG"||o==="VIDEO"||o==="CANVAS"||o==="SOURCE")return!1}return uo(t)&&re(i)?!1:t in e}const fl=ue({patchProp:cl},Ga);let fo;function dl(){return fo||(fo=Sa(fl))}const hl=(...e)=>{const t=dl().createApp(...e),{mount:i}=t;return t.mount=n=>{const o=ml(n);if(!o)return;const r=t._component;!W(r)&&!r.render&&!r.template&&(r.template=o.innerHTML),o.innerHTML="";const s=i(o,!1,pl(o));return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),s},t};function pl(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function ml(e){return re(e)?document.querySelector(e):e}/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const kt=typeof window<"u";function gl(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const $=Object.assign;function Di(e,t){const i={};for(const n in t){const o=t[n];i[n]=Re(o)?o.map(e):e(o)}return i}const Ut=()=>{},Re=Array.isArray,yl=/\/$/,_l=e=>e.replace(yl,"");function Ui(e,t,i="/"){let n,o={},r="",s="";const a=t.indexOf("#");let l=t.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(n=t.slice(0,l),r=t.slice(l+1,a>-1?a:t.length),o=e(r)),a>-1&&(n=n||t.slice(0,a),s=t.slice(a,t.length)),n=vl(n??t,i),{fullPath:n+(r&&"?")+r+s,path:n,query:o,hash:s}}function bl(e,t){const i=t.query?e(t.query):"";return t.path+(i&&"?")+i+(t.hash||"")}function ho(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function wl(e,t,i){const n=t.matched.length-1,o=i.matched.length-1;return n>-1&&n===o&&Rt(t.matched[n],i.matched[o])&&Or(t.params,i.params)&&e(t.query)===e(i.query)&&t.hash===i.hash}function Rt(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Or(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const i in e)if(!kl(e[i],t[i]))return!1;return!0}function kl(e,t){return Re(e)?po(e,t):Re(t)?po(t,e):e===t}function po(e,t){return Re(t)?e.length===t.length&&e.every((i,n)=>i===t[n]):e.length===1&&e[0]===t}function vl(e,t){if(e.startsWith("/"))return e;if(!e)return t;const i=t.split("/"),n=e.split("/"),o=n[n.length-1];(o===".."||o===".")&&n.push("");let r=i.length-1,s,a;for(s=0;s<n.length;s++)if(a=n[s],a!==".")if(a==="..")r>1&&r--;else break;return i.slice(0,r).join("/")+"/"+n.slice(s-(s===n.length?1:0)).join("/")}var Qt;(function(e){e.pop="pop",e.push="push"})(Qt||(Qt={}));var zt;(function(e){e.back="back",e.forward="forward",e.unknown=""})(zt||(zt={}));function Il(e){if(!e)if(kt){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),_l(e)}const Al=/^[^#]+#/;function Sl(e,t){return e.replace(Al,"#")+t}function El(e,t){const i=document.documentElement.getBoundingClientRect(),n=e.getBoundingClientRect();return{behavior:t.behavior,left:n.left-i.left-(t.left||0),top:n.top-i.top-(t.top||0)}}const Oi=()=>({left:window.pageXOffset,top:window.pageYOffset});function Tl(e){let t;if("el"in e){const i=e.el,n=typeof i=="string"&&i.startsWith("#"),o=typeof i=="string"?n?document.getElementById(i.slice(1)):document.querySelector(i):i;if(!o)return;t=El(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function mo(e,t){return(history.state?history.state.position-t:-1)+e}const on=new Map;function xl(e,t){on.set(e,t)}function Rl(e){const t=on.get(e);return on.delete(e),t}let Cl=()=>location.protocol+"//"+location.host;function jr(e,t){const{pathname:i,search:n,hash:o}=t,r=e.indexOf("#");if(r>-1){let a=o.includes(e.slice(r))?e.slice(r).length:1,l=o.slice(a);return l[0]!=="/"&&(l="/"+l),ho(l,"")}return ho(i,e)+n+o}function Pl(e,t,i,n){let o=[],r=[],s=null;const a=({state:m})=>{const b=jr(e,location),x=i.value,j=t.value;let M=0;if(m){if(i.value=b,t.value=m,s&&s===x){s=null;return}M=j?m.position-j.position:0}else n(b);o.forEach(C=>{C(i.value,x,{delta:M,type:Qt.pop,direction:M?M>0?zt.forward:zt.back:zt.unknown})})};function l(){s=i.value}function d(m){o.push(m);const b=()=>{const x=o.indexOf(m);x>-1&&o.splice(x,1)};return r.push(b),b}function f(){const{history:m}=window;m.state&&m.replaceState($({},m.state,{scroll:Oi()}),"")}function h(){for(const m of r)m();r=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",f)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",f,{passive:!0}),{pauseListeners:l,listen:d,destroy:h}}function go(e,t,i,n=!1,o=!1){return{back:e,current:t,forward:i,replaced:n,position:window.history.length,scroll:o?Oi():null}}function Ol(e){const{history:t,location:i}=window,n={value:jr(e,i)},o={value:t.state};o.value||r(n.value,{back:null,current:n.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function r(l,d,f){const h=e.indexOf("#"),m=h>-1?(i.host&&document.querySelector("base")?e:e.slice(h))+l:Cl()+e+l;try{t[f?"replaceState":"pushState"](d,"",m),o.value=d}catch(b){console.error(b),i[f?"replace":"assign"](m)}}function s(l,d){const f=$({},t.state,go(o.value.back,l,o.value.forward,!0),d,{position:o.value.position});r(l,f,!0),n.value=l}function a(l,d){const f=$({},o.value,t.state,{forward:l,scroll:Oi()});r(f.current,f,!0);const h=$({},go(n.value,l,null),{position:f.position+1},d);r(l,h,!1),n.value=l}return{location:n,state:o,push:a,replace:s}}function jl(e){e=Il(e);const t=Ol(e),i=Pl(e,t.state,t.location,t.replace);function n(r,s=!0){s||i.pauseListeners(),history.go(r)}const o=$({location:"",base:e,go:n,createHref:Sl.bind(null,e)},t,i);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function Ml(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),jl(e)}function Bl(e){return typeof e=="string"||e&&typeof e=="object"}function Mr(e){return typeof e=="string"||typeof e=="symbol"}const Ge={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Br=Symbol("");var yo;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(yo||(yo={}));function Ct(e,t){return $(new Error,{type:e,[Br]:!0},t)}function Ve(e,t){return e instanceof Error&&Br in e&&(t==null||!!(e.type&t))}const _o="[^/]+?",Fl={sensitive:!1,strict:!1,start:!0,end:!0},Hl=/[.+*?^${}()[\]/\\]/g;function Wl(e,t){const i=$({},Fl,t),n=[];let o=i.start?"^":"";const r=[];for(const d of e){const f=d.length?[]:[90];i.strict&&!d.length&&(o+="/");for(let h=0;h<d.length;h++){const m=d[h];let b=40+(i.sensitive?.25:0);if(m.type===0)h||(o+="/"),o+=m.value.replace(Hl,"\\$&"),b+=40;else if(m.type===1){const{value:x,repeatable:j,optional:M,regexp:C}=m;r.push({name:x,repeatable:j,optional:M});const H=C||_o;if(H!==_o){b+=10;try{new RegExp(`(${H})`)}catch(q){throw new Error(`Invalid custom RegExp for param "${x}" (${H}): `+q.message)}}let L=j?`((?:${H})(?:/(?:${H}))*)`:`(${H})`;h||(L=M&&d.length<2?`(?:/${L})`:"/"+L),M&&(L+="?"),o+=L,b+=20,M&&(b+=-8),j&&(b+=-20),H===".*"&&(b+=-50)}f.push(b)}n.push(f)}if(i.strict&&i.end){const d=n.length-1;n[d][n[d].length-1]+=.7000000000000001}i.strict||(o+="/?"),i.end?o+="$":i.strict&&(o+="(?:/|$)");const s=new RegExp(o,i.sensitive?"":"i");function a(d){const f=d.match(s),h={};if(!f)return null;for(let m=1;m<f.length;m++){const b=f[m]||"",x=r[m-1];h[x.name]=b&&x.repeatable?b.split("/"):b}return h}function l(d){let f="",h=!1;for(const m of e){(!h||!f.endsWith("/"))&&(f+="/"),h=!1;for(const b of m)if(b.type===0)f+=b.value;else if(b.type===1){const{value:x,repeatable:j,optional:M}=b,C=x in d?d[x]:"";if(Re(C)&&!j)throw new Error(`Provided param "${x}" is an array but it is not repeatable (* or + modifiers)`);const H=Re(C)?C.join("/"):C;if(!H)if(M)m.length<2&&(f.endsWith("/")?f=f.slice(0,-1):h=!0);else throw new Error(`Missing required param "${x}"`);f+=H}}return f||"/"}return{re:s,score:n,keys:r,parse:a,stringify:l}}function Ll(e,t){let i=0;for(;i<e.length&&i<t.length;){const n=t[i]-e[i];if(n)return n;i++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function Nl(e,t){let i=0;const n=e.score,o=t.score;for(;i<n.length&&i<o.length;){const r=Ll(n[i],o[i]);if(r)return r;i++}if(Math.abs(o.length-n.length)===1){if(bo(n))return 1;if(bo(o))return-1}return o.length-n.length}function bo(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Vl={type:0,value:""},Dl=/[a-zA-Z0-9_]/;function Ul(e){if(!e)return[[]];if(e==="/")return[[Vl]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(b){throw new Error(`ERR (${i})/"${d}": ${b}`)}let i=0,n=i;const o=[];let r;function s(){r&&o.push(r),r=[]}let a=0,l,d="",f="";function h(){d&&(i===0?r.push({type:0,value:d}):i===1||i===2||i===3?(r.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`),r.push({type:1,value:d,regexp:f,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),d="")}function m(){d+=l}for(;a<e.length;){if(l=e[a++],l==="\\"&&i!==2){n=i,i=4;continue}switch(i){case 0:l==="/"?(d&&h(),s()):l===":"?(h(),i=1):m();break;case 4:m(),i=n;break;case 1:l==="("?i=2:Dl.test(l)?m():(h(),i=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?f[f.length-1]=="\\"?f=f.slice(0,-1)+l:i=3:f+=l;break;case 3:h(),i=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,f="";break;default:t("Unknown state");break}}return i===2&&t(`Unfinished custom RegExp for param "${d}"`),h(),s(),o}function zl(e,t,i){const n=Wl(Ul(e.path),i),o=$(n,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function ql(e,t){const i=[],n=new Map;t=vo({strict:!1,end:!0,sensitive:!1},t);function o(f){return n.get(f)}function r(f,h,m){const b=!m,x=Kl(f);x.aliasOf=m&&m.record;const j=vo(t,f),M=[x];if("alias"in f){const L=typeof f.alias=="string"?[f.alias]:f.alias;for(const q of L)M.push($({},x,{components:m?m.record.components:x.components,path:q,aliasOf:m?m.record:x}))}let C,H;for(const L of M){const{path:q}=L;if(h&&q[0]!=="/"){const ie=h.record.path,N=ie[ie.length-1]==="/"?"":"/";L.path=h.record.path+(q&&N+q)}if(C=zl(L,h,j),m?m.alias.push(C):(H=H||C,H!==C&&H.alias.push(C),b&&f.name&&!ko(C)&&s(f.name)),x.children){const ie=x.children;for(let N=0;N<ie.length;N++)r(ie[N],C,m&&m.children[N])}m=m||C,(C.record.components&&Object.keys(C.record.components).length||C.record.name||C.record.redirect)&&l(C)}return H?()=>{s(H)}:Ut}function s(f){if(Mr(f)){const h=n.get(f);h&&(n.delete(f),i.splice(i.indexOf(h),1),h.children.forEach(s),h.alias.forEach(s))}else{const h=i.indexOf(f);h>-1&&(i.splice(h,1),f.record.name&&n.delete(f.record.name),f.children.forEach(s),f.alias.forEach(s))}}function a(){return i}function l(f){let h=0;for(;h<i.length&&Nl(f,i[h])>=0&&(f.record.path!==i[h].record.path||!Fr(f,i[h]));)h++;i.splice(h,0,f),f.record.name&&!ko(f)&&n.set(f.record.name,f)}function d(f,h){let m,b={},x,j;if("name"in f&&f.name){if(m=n.get(f.name),!m)throw Ct(1,{location:f});j=m.record.name,b=$(wo(h.params,m.keys.filter(H=>!H.optional).map(H=>H.name)),f.params&&wo(f.params,m.keys.map(H=>H.name))),x=m.stringify(b)}else if("path"in f)x=f.path,m=i.find(H=>H.re.test(x)),m&&(b=m.parse(x),j=m.record.name);else{if(m=h.name?n.get(h.name):i.find(H=>H.re.test(h.path)),!m)throw Ct(1,{location:f,currentLocation:h});j=m.record.name,b=$({},h.params,f.params),x=m.stringify(b)}const M=[];let C=m;for(;C;)M.unshift(C.record),C=C.parent;return{name:j,path:x,params:b,matched:M,meta:$l(M)}}return e.forEach(f=>r(f)),{addRoute:r,resolve:d,removeRoute:s,getRoutes:a,getRecordMatcher:o}}function wo(e,t){const i={};for(const n of t)n in e&&(i[n]=e[n]);return i}function Kl(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:Gl(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function Gl(e){const t={},i=e.props||!1;if("component"in e)t.default=i;else for(const n in e.components)t[n]=typeof i=="object"?i[n]:i;return t}function ko(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function $l(e){return e.reduce((t,i)=>$(t,i.meta),{})}function vo(e,t){const i={};for(const n in e)i[n]=n in t?t[n]:e[n];return i}function Fr(e,t){return t.children.some(i=>i===e||Fr(e,i))}const Hr=/#/g,Ql=/&/g,Jl=/\//g,Xl=/=/g,Yl=/\?/g,Wr=/\+/g,Zl=/%5B/g,ec=/%5D/g,Lr=/%5E/g,tc=/%60/g,Nr=/%7B/g,ic=/%7C/g,Vr=/%7D/g,nc=/%20/g;function En(e){return encodeURI(""+e).replace(ic,"|").replace(Zl,"[").replace(ec,"]")}function oc(e){return En(e).replace(Nr,"{").replace(Vr,"}").replace(Lr,"^")}function rn(e){return En(e).replace(Wr,"%2B").replace(nc,"+").replace(Hr,"%23").replace(Ql,"%26").replace(tc,"`").replace(Nr,"{").replace(Vr,"}").replace(Lr,"^")}function rc(e){return rn(e).replace(Xl,"%3D")}function sc(e){return En(e).replace(Hr,"%23").replace(Yl,"%3F")}function ac(e){return e==null?"":sc(e).replace(Jl,"%2F")}function yi(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function lc(e){const t={};if(e===""||e==="?")return t;const n=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<n.length;++o){const r=n[o].replace(Wr," "),s=r.indexOf("="),a=yi(s<0?r:r.slice(0,s)),l=s<0?null:yi(r.slice(s+1));if(a in t){let d=t[a];Re(d)||(d=t[a]=[d]),d.push(l)}else t[a]=l}return t}function Io(e){let t="";for(let i in e){const n=e[i];if(i=rc(i),n==null){n!==void 0&&(t+=(t.length?"&":"")+i);continue}(Re(n)?n.map(r=>r&&rn(r)):[n&&rn(n)]).forEach(r=>{r!==void 0&&(t+=(t.length?"&":"")+i,r!=null&&(t+="="+r))})}return t}function cc(e){const t={};for(const i in e){const n=e[i];n!==void 0&&(t[i]=Re(n)?n.map(o=>o==null?null:""+o):n==null?n:""+n)}return t}const uc=Symbol(""),Ao=Symbol(""),Tn=Symbol(""),xn=Symbol(""),sn=Symbol("");function Wt(){let e=[];function t(n){return e.push(n),()=>{const o=e.indexOf(n);o>-1&&e.splice(o,1)}}function i(){e=[]}return{add:t,list:()=>e.slice(),reset:i}}function Xe(e,t,i,n,o){const r=n&&(n.enterCallbacks[o]=n.enterCallbacks[o]||[]);return()=>new Promise((s,a)=>{const l=h=>{h===!1?a(Ct(4,{from:i,to:t})):h instanceof Error?a(h):Bl(h)?a(Ct(2,{from:t,to:h})):(r&&n.enterCallbacks[o]===r&&typeof h=="function"&&r.push(h),s())},d=e.call(n&&n.instances[o],t,i,l);let f=Promise.resolve(d);e.length<3&&(f=f.then(l)),f.catch(h=>a(h))})}function zi(e,t,i,n){const o=[];for(const r of e)for(const s in r.components){let a=r.components[s];if(!(t!=="beforeRouteEnter"&&!r.instances[s]))if(fc(a)){const d=(a.__vccOpts||a)[t];d&&o.push(Xe(d,i,n,r,s))}else{let l=a();o.push(()=>l.then(d=>{if(!d)return Promise.reject(new Error(`Couldn't resolve component "${s}" at "${r.path}"`));const f=gl(d)?d.default:d;r.components[s]=f;const m=(f.__vccOpts||f)[t];return m&&Xe(m,i,n,r,s)()}))}}return o}function fc(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function So(e){const t=We(Tn),i=We(xn),n=ce(()=>t.resolve(He(e.to))),o=ce(()=>{const{matched:l}=n.value,{length:d}=l,f=l[d-1],h=i.matched;if(!f||!h.length)return-1;const m=h.findIndex(Rt.bind(null,f));if(m>-1)return m;const b=Eo(l[d-2]);return d>1&&Eo(f)===b&&h[h.length-1].path!==b?h.findIndex(Rt.bind(null,l[d-2])):m}),r=ce(()=>o.value>-1&&pc(i.params,n.value.params)),s=ce(()=>o.value>-1&&o.value===i.matched.length-1&&Or(i.params,n.value.params));function a(l={}){return hc(l)?t[He(e.replace)?"replace":"push"](He(e.to)).catch(Ut):Promise.resolve()}return{route:n,href:ce(()=>n.value.href),isActive:r,isExactActive:s,navigate:a}}const dc=it({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:So,setup(e,{slots:t}){const i=Ii(So(e)),{options:n}=We(Tn),o=ce(()=>({[To(e.activeClass,n.linkActiveClass,"router-link-active")]:i.isActive,[To(e.exactActiveClass,n.linkExactActiveClass,"router-link-exact-active")]:i.isExactActive}));return()=>{const r=t.default&&t.default(i);return e.custom?r:Pr("a",{"aria-current":i.isExactActive?e.ariaCurrentValue:null,href:i.href,onClick:i.navigate,class:o.value},r)}}}),ci=dc;function hc(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function pc(e,t){for(const i in t){const n=t[i],o=e[i];if(typeof n=="string"){if(n!==o)return!1}else if(!Re(o)||o.length!==n.length||n.some((r,s)=>r!==o[s]))return!1}return!0}function Eo(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const To=(e,t,i)=>e??t??i,mc=it({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:i}){const n=We(sn),o=ce(()=>e.route||n.value),r=We(Ao,0),s=ce(()=>{let d=He(r);const{matched:f}=o.value;let h;for(;(h=f[d])&&!h.components;)d++;return d}),a=ce(()=>o.value.matched[s.value]);ai(Ao,ce(()=>s.value+1)),ai(uc,a),ai(sn,o);const l=Cs();return si(()=>[l.value,a.value,e.name],([d,f,h],[m,b,x])=>{f&&(f.instances[h]=d,b&&b!==f&&d&&d===m&&(f.leaveGuards.size||(f.leaveGuards=b.leaveGuards),f.updateGuards.size||(f.updateGuards=b.updateGuards))),d&&f&&(!b||!Rt(f,b)||!m)&&(f.enterCallbacks[h]||[]).forEach(j=>j(d))},{flush:"post"}),()=>{const d=o.value,f=e.name,h=a.value,m=h&&h.components[f];if(!m)return xo(i.default,{Component:m,route:d});const b=h.props[f],x=b?b===!0?d.params:typeof b=="function"?b(d):b:null,M=Pr(m,$({},x,t,{onVnodeUnmounted:C=>{C.component.isUnmounted&&(h.instances[f]=null)},ref:l}));return xo(i.default,{Component:M,route:d})||M}}});function xo(e,t){if(!e)return null;const i=e(t);return i.length===1?i[0]:i}const Dr=mc;function gc(e){const t=ql(e.routes,e),i=e.parseQuery||lc,n=e.stringifyQuery||Io,o=e.history,r=Wt(),s=Wt(),a=Wt(),l=Ps(Ge);let d=Ge;kt&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const f=Di.bind(null,y=>""+y),h=Di.bind(null,ac),m=Di.bind(null,yi);function b(y,E){let A,R;return Mr(y)?(A=t.getRecordMatcher(y),R=E):R=y,t.addRoute(R,A)}function x(y){const E=t.getRecordMatcher(y);E&&t.removeRoute(E)}function j(){return t.getRoutes().map(y=>y.record)}function M(y){return!!t.getRecordMatcher(y)}function C(y,E){if(E=$({},E||l.value),typeof y=="string"){const u=Ui(i,y,E.path),p=t.resolve({path:u.path},E),_=o.createHref(u.fullPath);return $(u,p,{params:m(p.params),hash:yi(u.hash),redirectedFrom:void 0,href:_})}let A;if("path"in y)A=$({},y,{path:Ui(i,y.path,E.path).path});else{const u=$({},y.params);for(const p in u)u[p]==null&&delete u[p];A=$({},y,{params:h(u)}),E.params=h(E.params)}const R=t.resolve(A,E),G=y.hash||"";R.params=f(m(R.params));const ee=bl(n,$({},y,{hash:oc(G),path:R.path})),c=o.createHref(ee);return $({fullPath:ee,hash:G,query:n===Io?cc(y.query):y.query||{}},R,{redirectedFrom:void 0,href:c})}function H(y){return typeof y=="string"?Ui(i,y,l.value.path):$({},y)}function L(y,E){if(d!==y)return Ct(8,{from:E,to:y})}function q(y){return pe(y)}function ie(y){return q($(H(y),{replace:!0}))}function N(y){const E=y.matched[y.matched.length-1];if(E&&E.redirect){const{redirect:A}=E;let R=typeof A=="function"?A(y):A;return typeof R=="string"&&(R=R.includes("?")||R.includes("#")?R=H(R):{path:R},R.params={}),$({query:y.query,hash:y.hash,params:"path"in R?{}:y.params},R)}}function pe(y,E){const A=d=C(y),R=l.value,G=y.state,ee=y.force,c=y.replace===!0,u=N(A);if(u)return pe($(H(u),{state:typeof u=="object"?$({},G,u.state):G,force:ee,replace:c}),E||A);const p=A;p.redirectedFrom=E;let _;return!ee&&wl(n,R,A)&&(_=Ct(16,{to:p,from:R}),Oe(R,R,!0,!1)),(_?Promise.resolve(_):Ce(p,R)).catch(g=>Ve(g)?Ve(g,2)?g:qe(g):K(g,p,R)).then(g=>{if(g){if(Ve(g,2))return pe($({replace:c},H(g.to),{state:typeof g.to=="object"?$({},G,g.to.state):G,force:ee}),E||p)}else g=nt(p,R,!0,c,G);return ze(p,R,g),g})}function Ie(y,E){const A=L(y,E);return A?Promise.reject(A):Promise.resolve()}function mt(y){const E=_t.values().next().value;return E&&typeof E.runWithContext=="function"?E.runWithContext(y):y()}function Ce(y,E){let A;const[R,G,ee]=yc(y,E);A=zi(R.reverse(),"beforeRouteLeave",y,E);for(const u of R)u.leaveGuards.forEach(p=>{A.push(Xe(p,y,E))});const c=Ie.bind(null,y,E);return A.push(c),fe(A).then(()=>{A=[];for(const u of r.list())A.push(Xe(u,y,E));return A.push(c),fe(A)}).then(()=>{A=zi(G,"beforeRouteUpdate",y,E);for(const u of G)u.updateGuards.forEach(p=>{A.push(Xe(p,y,E))});return A.push(c),fe(A)}).then(()=>{A=[];for(const u of ee)if(u.beforeEnter)if(Re(u.beforeEnter))for(const p of u.beforeEnter)A.push(Xe(p,y,E));else A.push(Xe(u.beforeEnter,y,E));return A.push(c),fe(A)}).then(()=>(y.matched.forEach(u=>u.enterCallbacks={}),A=zi(ee,"beforeRouteEnter",y,E),A.push(c),fe(A))).then(()=>{A=[];for(const u of s.list())A.push(Xe(u,y,E));return A.push(c),fe(A)}).catch(u=>Ve(u,8)?u:Promise.reject(u))}function ze(y,E,A){a.list().forEach(R=>mt(()=>R(y,E,A)))}function nt(y,E,A,R,G){const ee=L(y,E);if(ee)return ee;const c=E===Ge,u=kt?history.state:{};A&&(R||c?o.replace(y.fullPath,$({scroll:c&&u&&u.scroll},G)):o.push(y.fullPath,G)),l.value=y,Oe(y,E,A,c),qe()}let Pe;function Mt(){Pe||(Pe=o.listen((y,E,A)=>{if(!Xt.listening)return;const R=C(y),G=N(R);if(G){pe($(G,{replace:!0}),R).catch(Ut);return}d=R;const ee=l.value;kt&&xl(mo(ee.fullPath,A.delta),Oi()),Ce(R,ee).catch(c=>Ve(c,12)?c:Ve(c,2)?(pe(c.to,R).then(u=>{Ve(u,20)&&!A.delta&&A.type===Qt.pop&&o.go(-1,!1)}).catch(Ut),Promise.reject()):(A.delta&&o.go(-A.delta,!1),K(c,R,ee))).then(c=>{c=c||nt(R,ee,!1),c&&(A.delta&&!Ve(c,8)?o.go(-A.delta,!1):A.type===Qt.pop&&Ve(c,20)&&o.go(-1,!1)),ze(R,ee,c)}).catch(Ut)}))}let gt=Wt(),se=Wt(),Q;function K(y,E,A){qe(y);const R=se.list();return R.length?R.forEach(G=>G(y,E,A)):console.error(y),Promise.reject(y)}function Ne(){return Q&&l.value!==Ge?Promise.resolve():new Promise((y,E)=>{gt.add([y,E])})}function qe(y){return Q||(Q=!y,Mt(),gt.list().forEach(([E,A])=>y?A(y):E()),gt.reset()),y}function Oe(y,E,A,R){const{scrollBehavior:G}=e;if(!kt||!G)return Promise.resolve();const ee=!A&&Rl(mo(y.fullPath,0))||(R||!A)&&history.state&&history.state.scroll||null;return sr().then(()=>G(y,E,ee)).then(c=>c&&Tl(c)).catch(c=>K(c,y,E))}const ye=y=>o.go(y);let yt;const _t=new Set,Xt={currentRoute:l,listening:!0,addRoute:b,removeRoute:x,hasRoute:M,getRoutes:j,resolve:C,options:e,push:q,replace:ie,go:ye,back:()=>ye(-1),forward:()=>ye(1),beforeEach:r.add,beforeResolve:s.add,afterEach:a.add,onError:se.add,isReady:Ne,install(y){const E=this;y.component("RouterLink",ci),y.component("RouterView",Dr),y.config.globalProperties.$router=E,Object.defineProperty(y.config.globalProperties,"$route",{enumerable:!0,get:()=>He(l)}),kt&&!yt&&l.value===Ge&&(yt=!0,q(o.location).catch(G=>{}));const A={};for(const G in Ge)Object.defineProperty(A,G,{get:()=>l.value[G],enumerable:!0});y.provide(Tn,E),y.provide(xn,Xo(A)),y.provide(sn,l);const R=y.unmount;_t.add(y),y.unmount=function(){_t.delete(y),_t.size<1&&(d=Ge,Pe&&Pe(),Pe=null,l.value=Ge,yt=!1,Q=!1),R()}}};function fe(y){return y.reduce((E,A)=>E.then(()=>mt(A)),Promise.resolve())}return Xt}function yc(e,t){const i=[],n=[],o=[],r=Math.max(t.matched.length,e.matched.length);for(let s=0;s<r;s++){const a=t.matched[s];a&&(e.matched.find(d=>Rt(d,a))?n.push(a):i.push(a));const l=e.matched[s];l&&(t.matched.find(d=>Rt(d,l))||o.push(l))}return[i,n,o]}function mu(){return We(xn)}const _c="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABbmlDQ1BpY2MAACiRdZE7SwNBFIW/JIqvSAotRCwCRhFRCApiKRFMoxYxglGb7JpNhCQuuxtEbAUbC8FCtPFV+A+0FWwVBEERRCytfTUi6x1XSJBkltn7cWbOZeYM+CfzesGui0Kh6FiJeCw8l5oPN7zgp4kg3fSndducmplIUnN83uFT9XZQ9aq9r+poWcrYOvgahUd003KEx4QnVx1T8ZZwu55LLwkfCg9YckDhK6VrHj8rznr8rthKJsbBr3qGsxWsVbCeswrCfcKRQr6k/51H3SSYKc7OSO2U2YVNgjgxwmiUWCaPw6DUomRW3Rf99U2zIh5d/iZrWOLIkhPvgKgl6ZqRaoiekS/Pmsr9f562MTzkdQ/GoP7Jdd96oGEHvrdd9+vIdb+PIfAIF8Wyf0VyGv0QfbusRQ4gtAFnl2VN24XzTeh4MNNW+lcKyPQbBryeQmsK2m6gecHL6m+dk3tIrssTXcPePvTK/tDiDwXRaA2Tj7ixAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAKHpUWHRUaXRsZQAACJkzMjAy0TUw0jWwjPfJT893yy8KT00qzixJBQBVpwfYgxoUHwAAB8ZJREFUWEedV2tsW+UZfs7FdmzHaRI7beIkTS8QSjtEY0IiUlpWpm5FovsDq9CkTaObtu6ibT+GpmqdgA7BQJOmSSA6MfjJYANpXYs2AWuhRXQta5q0kLKULmltJ2luTuI4Tmyfc/a8x3ZsJ06G9kqfj893ed/ne+9Hweck6wk08/FFjp0cW2EhyGfQXlQwxF8ZfRxnON5TnkC4PKdSUv7XButxhKDiIAXu47OeAzBzJy0Og0Pm9Ny7aY8Rrh/n86jyJLpXZI5VAFi/RA00HOKOg3z6bEFmbpEChxJOvDawFn1TXqRMBV/fOIq9zZPZPQJIg4CLE9SLBPdr5TBi5eRo5SYjjznvrKowXufB/WTosoVbuUVCDidc+Mm5W/H2kB8jSSeGky6cvlmNVl8SG6rm81oQcsGBHbGEY/cNx20XPh4cH1kqS106EQrdde/hi5tPpAytAxkUBOeJAF7pb8CVaS88ugGHasGlmtSCipc4n0wXsZSzaR5RlI5YynlceC/hVgqg8+5Qm6oqr3dP+preiVaXgUetGgo+nfFQsIlicigmBmbdGKVGSs4R8PSCikRGayTv13Z0tG0vPre4taujrdawlJeJNmhZJo6F/UhnlruIxhs3e+aRNkvRJQ0Vt1QlEXCnS7XGbefGqzCVUkUTjQuG+nLrHR01RctZMkzlF4qitpmmaau1Z9KHT2Le5VogpgOtI2ipnMdcRrUFp+mEnXVxPL59EF6HkQUg2BkZPaOV+MPVemh8T2UI3pcOvbXn8qEidsC9HW2hBVM9bVrw5hfmyfj7tw3hh9ui2VArJoKKzLpwcrgG8bSGbdUJ3LN2Bi7dzArneiKl4Ti1ePTfQUwt6FAVi36p4JnQAB5omZilf+1kiPZI9EoY/QiK6oVVsKscuEQNWEaZWOW2Ju8Cvtmac+qiCBlLOvDOUC2O3fDj02kP+Qh+hRqw8OMtUextmpB9ldz9A47vKvd1bm+mg3RbihKAVTAe/QH17hRe3dWHGldmeTQUE28c540lL7x5vQ5RhqmQHBFz3lkziwO3jmBXw1QhT5gY5W9IZ/h8SVGVgGWWShANTFJ1Euc1FasAYCbpGa/Es5fX43Isa0HRWNCzgB00y/0NMXQEZuDUrUIiM+1za6ma3bphMbcr+bxaIJkRPxiec+H22jmUJd7k7+FaPH1pPcbmnXAyNLesmcO+5gnsCcawzpPK7iskppKzBLBLcG21rPLXEzNMpvSya8Lg2PUAjvS22EDv8sfxCNPx/VSzx2mUF1pMWZHbdN60abV99I/lk5x6f6gaR3paUEHP/+nWCB7eMAa3w8wKzUeN3DLvwcVClNzQEBQAQdHASlUpYy5ZIdNw3GXfvJbO+Vz7NbTVzZYKJkCJns+m3bg0WYlrcTcm6E+iKbG2RzPp2Gk0uFPBFfRbIEUpNQ8TFn7zcTNSZPbiPf34gj9RcmOT66ci1fgzo6GXwmeZJ+y8pBSUIRbPRYguPjDEFNmEFfzAUQxAVB9dg7NjVfjt3deWCR+MV+B3fU14b6Ta1pzUC5e2goGJSIMZFQAR8YOVosyjFxikmHpfudqAR28ZwY6G6RLhvROVOHRhI24kKlBBoZq2WuJY7Geikqj6FKW8B0j2qnGmcy/AqeFqTDMqvrH5Zklz8p8ZN37+r02IMmRFuIXV85aQyBTZKoWcKbddZpzMYoGKbHUzWYb/NFhnJ5VKl7F4RHzihStBhClcsl6+Dsl/CWNWP7tXyPB/qRRLCtRp3ecw/hFLqWOEVFfsBxYPeBwZ+CUN85b9MTcrZCW+1jJW4EFJo3MOXGDldOWEC+in2gawaU0Sw2zbrrJ3uMKa0M+ICNM8EgkumoeZd8yhmyf1tz+8FO5oD51QFfVRswiAZOY63t7vyprgJB3LJKgNLMPFVxGBMrLZNRu258d9aGCx6mIq7mqYsc2VYDRcmfLgLzcCeHckwMbGOn76XE9YzTF5npASKCJRnzQYFUwuJpVwYcIHt2bA5yioX55+NiAPUSsiWMwhS38cWIdvnbmdYws+o+Zk0sv2rZ09w1PtA/jV9muJamfmeWFhA/jg/MVuFp+jqlroPsQvO2nvbKXTMUQb66plO2YJ8XbfaR3Gk22D2EzAAly0l2DESLhKErKlWFishHuaJ19492zvRTm+mIiYnZ5OZJTdBBHKGKat+s5A3D6YoN2SZCj2ixFMvTdVYgZJNQ9tHMOXGyZZEStxneV4jilczLVzXVG4OiBN6kf8fSZ/dhHAqX/2TLIzOrBg4q0MtMZ2/xSCtKOgNnMeLHWhm6YoWx0pxMci1FU/ja7FlIdCuOr2ngh/v81OaCp/rKTjoyl62d0+4tWM6P5N44u5U1fskLE3n4j4kWSDWbZ45AUauZEX7rD/hzm3n8IvFx9Z1nh/+NHFDx5uuflgqCZ+3nZrCnIzubjpROIDffTkv0Vry7bsy8hOCBAw5zj2KUdwdumWsmx+9kakR9PNvWwcn+NrfI3HwDqGpDiXpM6X+oMYYkVcEYTMi2CFn2bCI4MHKLy33NaVqvAi2R+nDnzv8PlNXz0RCdQ7mUTmmRXvWzuFZ1mKPY6ch+Vrf+Hj9K98/v7//jhdSge/0rqe3wq7qYSdzFfbCKLxwaaJxsfuCKcZ0/nP80+Q/Tx///N+nv8XfYo4VjJ56aYAAAAASUVORK5CYII=",bc="data:image/svg+xml,%3csvg%20width='98'%20height='96'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.854%200C21.839%200%200%2022%200%2049.217c0%2021.756%2013.993%2040.172%2033.405%2046.69%202.427.49%203.316-1.059%203.316-2.362%200-1.141-.08-5.052-.08-9.127-13.59%202.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015%204.934.326%207.523%205.052%207.523%205.052%204.367%207.496%2011.404%205.378%2014.235%204.074.404-3.178%201.699-5.378%203.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283%200-5.378%201.94-9.778%205.014-13.2-.485-1.222-2.184-6.275.486-13.038%200%200%204.125-1.304%2013.426%205.052a46.97%2046.97%200%200%201%2012.214-1.63c4.125%200%208.33.571%2012.213%201.63%209.302-6.356%2013.427-5.052%2013.427-5.052%202.67%206.763.97%2011.816.485%2013.038%203.155%203.422%205.015%207.822%205.015%2013.2%200%2018.905-11.404%2023.06-22.324%2024.283%201.78%201.548%203.316%204.481%203.316%209.126%200%206.6-.08%2011.897-.08%2013.526%200%201.304.89%202.853%203.316%202.364%2019.412-6.52%2033.405-24.935%2033.405-46.691C97.707%2022%2075.788%200%2048.854%200z'%20fill='%23fff'/%3e%3c/svg%3e",Ur=e=>(Ns("data-v-1baf9ae8"),e=e(),Vs(),e),wc={class:"title"},kc=Ur(()=>ne("div",{class:"align-logo"},[ne("img",{class:"logo",src:_c,alt:"PG monogram logo"}),xt("Peter Gagliardi ")],-1)),vc=Ur(()=>ne("li",null,[ne("a",{href:"https://github.com/ptrgags"},[ne("img",{width:"32px",src:bc})])],-1)),Ic=it({__name:"Navbar",setup(e){return(t,i)=>(be(),ft("header",null,[ne("div",wc,[oe(He(ci),{to:"/"},{default:ut(()=>[kc]),_:1})]),ne("nav",null,[ne("ul",null,[ne("li",null,[oe(He(ci),{to:"/gallery"},{default:ut(()=>[xt("Gallery")]),_:1})]),ne("li",null,[oe(He(ci),{to:"/projects"},{default:ut(()=>[xt("Projects")]),_:1})]),vc])])]))}}),Ac=(e,t)=>{const i=e.__vccOpts||e;for(const[n,o]of t)i[n]=o;return i},Sc=Ac(Ic,[["__scopeId","data-v-1baf9ae8"]]),Ec={class:"content"},Tc=it({__name:"App",setup(e){return(t,i)=>(be(),ft(ge,null,[oe(Sc),ne("div",Ec,[oe(He(Dr))])],64))}}),xc="modulepreload",Rc=function(e){return"/"+e},Ro={},wt=function(t,i,n){let o=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),a=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));o=Promise.allSettled(i.map(l=>{if(l=Rc(l),l in Ro)return;Ro[l]=!0;const d=l.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":xc,d||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),d)return new Promise((m,b)=>{h.addEventListener("load",m),h.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return o.then(s=>{for(const a of s||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},Cc={key:1},Pc=it({__name:"MaybeLink",props:{url:{}},setup(e){const t=e;return(i,n)=>{const o=fr("RouterLink");return t.url?(be(),dt(o,{key:0,to:t.url},{default:ut(()=>[qn(i.$slots,"default")]),_:3},8,["to"])):(be(),ft("span",Cc,[qn(i.$slots,"default")]))}}}),Oc=["src","alt"],jc=it({__name:"CardImage",props:{image:{}},setup(e){const t=e,i=ce(()=>t.image.size??"thumbnail"),n=ce(()=>`/assets/placeholder-${i.value}.png`),o=ce(()=>t.image.url?t.image.url:n.value),r=ce(()=>t.image.alt_text??"");function s(a){const l=a.target;l.src=n.value}return(a,l)=>(be(),dt(Pc,{url:t.image.link},{default:ut(()=>[ne("img",{src:o.value,alt:r.value,onError:s},null,40,Oc)]),_:1},8,["url"]))}}),Mc={class:"card-frame"},Bc={class:"card-text centered"},Fc=ne("br",null,null,-1),Co=it({__name:"ThumbnailCard",props:{card:{}},setup(e){const t=e;return(i,n)=>{const o=fr("RouterLink");return be(),ft("div",Mc,[oe(jc,{image:t.card.thumbnail},null,8,["image"]),ne("div",Bc,[t.card.link?(be(),dt(o,{key:0,to:t.card.link},{default:ut(()=>[xt(jn(t.card.title),1)]),_:1},8,["to"])):ja("",!0),Fc,xt(" ("+jn(t.card.dates)+") ",1)])])}}}),Pt="https://assets.ptrgags.dev/file/ptrgags-website-assets";class zr{constructor(t){te(this,"id");te(this,"title");te(this,"years");te(this,"description");te(this,"github_url");te(this,"demo_url");te(this,"thumbnail");te(this,"card");te(this,"updates");this.id=t.id,this.title=t.title,this.years=t.years,this.demo_url=t.demo_link,this.description=t.description,this.updates=t.updates??[],this.github_url=t.github_repo?`https://github.com/ptrgags/${t.github_repo}`:void 0;const i=t.img_format,n=`${Pt}/project-thumbnails/${this.id}.${i}`;this.thumbnail={title:this.title,dates:this.years,link:this.url,sort_key:t.sort_key,thumbnail:{url:n,size:"thumbnail"},hide:t.hide,featured:t.featured};const o=`${Pt}/project-cards/${this.id}.${i}`;this.card={url:o,size:"card"}}get url(){return`/project/${this.id}`}}function U(e,t){return`${Pt}/project-updates/${e}/${t}`}const Hc={id:"hyperbolic-crochet",title:"Making of Hyperbolic Crochet",years:"2021-2023",sort_key:"2023-07-00:01",img_format:"jpg",description:`
        <p>
            This crocheting project was inspired by the TED talk <a href="https://youtu.be/w1TBZhd-sN0?si=XsH01B6DCeU8LoqT">"Crocheting Hyperbolic Planes"</a>
            by Daina Taimiņa. Hyperbolic crocheting is pretty simple, you just
            keep doing increases and the fabric will naturally curl up into
            organic-looking patterns. The video mentions using a slow growth
            rate such as 11/10. However, I used a much faster growth rate of
            2.
        </p>
        <p>
            I kept my pattern very simple, essentially the same stitch over
            and over. It was nice as a way to keep my hands busy when watching
            or listening to something.
        </p>
        <ul>
            <li>Row 0: Chain 10</li>
            <li>Row 1, 2, ..., N-2: inc in every stitch</li>
            <li>Row N-2: dc in every stitch.</li>
            <li>Row N-1: sc in  different color</li>
        </ul>
        <p>
            I worked on this project off and on over the span of a little over
            2 years. Some months I would work on it often, other times I
            wouldn't work on it at all.
        </p>
    `,updates:[{sort_key:"2021-07-26",date:"2021-07-26",title:"Starting Out",description:"A picture after my first crocheting session. Here you can see the spool of crochet thread. My intent was to go through the entire spool.",image:{url:U("hyperbolic-crochet","2021-07-26_Update1.jpg"),alt_text:"Picture of a spool of crochet thread and the first couple rows of stitches"}},{sort_key:"2021-08-12",date:"2021-08-12",title:"Update 2",description:"",image:{url:U("hyperbolic-crochet","2021-08-12_Update2.jpg")}},{sort_key:"2021-10-25",date:"2021-10-25",title:"Update 3",description:"",image:{url:U("hyperbolic-crochet","2021-10-25_Update3.jpg")}},{sort_key:"2022-07-27",date:"2022-07-27",title:"Update 4",description:"I put the project aside at the end of 2021, and only returned to it the next summer.",image:{url:U("hyperbolic-crochet","2022-07-27_Update4.jpg"),alt_text:""}},{sort_key:"2023-01-25",date:"2023-01-25",title:"Update 5",description:"Again, I put the project aside, and only picked it up again in early 2023. This time, I was more serious about seeing the project to completion, though it still would take months.",image:{url:U("hyperbolic-crochet","2023-01-25_Update5.jpg"),alt_text:""}},{sort_key:"2023-07-23",date:"2023-07-23",title:"Update 6",description:"",image:{url:U("hyperbolic-crochet","2023-07-23_Update6.jpg"),alt_text:""}},{sort_key:"2023-08-01",date:"2023-08-01",title:"End of Spool",description:"This was the last picture I have before reaching the end of the spool.",image:{url:U("hyperbolic-crochet","2023-08-01_Update7.jpg"),alt_text:""}},{sort_key:"2023-08-17",date:"2023-08-17",title:"Spool Change",description:"I got a second spool of thread to finish the last couple rows of stitches.",image:{url:U("hyperbolic-crochet","2023-08-17_Update8.jpg"),alt_text:""}},{sort_key:"2023-08-19",date:"2023-08-19",title:"Last Blue Stitch",description:"This picture shows me stitching the last double crochet stitch in blue before I switched to orange.",image:{url:U("hyperbolic-crochet","2023-08-19_Update9.jpg"),alt_text:""}},{sort_key:"2023-08-23",date:"2023-08-23",title:"Update 10",description:"Here I am mid-way through the last row of orange stitches. Interestingly, though the orange section is only one stitch thick, it mostly obscures the blue stitches underneath. This is similar to how the grey matter of the brain covers the white matter underneath, despite there being much more white matter by volume.",image:{url:U("hyperbolic-crochet","2023-08-23_Update10.jpg"),alt_text:""}}]},Wc={id:"symmetry-sketchbook",title:"Symmetry Sketchbook",years:"2019-2020, 2024",sort_key:"2024-03-00:00",img_format:"png",description:`
        <p>
            This project is an exploration of the symmetric mathematical 
            patterns described in the book <a href="https://www.google.com/books/edition/Creating_Symmetry/blGUBgAAQBAJ?hl=en&gbpv=0"><cite>Creating Symmetry</cite></a>
            by Frank A. Farris. From this book I implemented the symmetric curves, as well as the rosette, frieze, and wallpaper patterns.
        </p>
        <p>
            This uses <a href="https://p5js.org/">p5.js</a> (including WebGL
            mode) for the visuals, and Vue.js for the website UI.
        </p>
        <p>
            <a href="https://ptrgags.dev/symmetry-sketchbook/#/wallpaper_symmetry?custom_pattern=H4sIAAAAAAAACo2QQQrCMBBF7/LXkzCT2CC5ioirULqIDYm6Kb27GLVYGoqbWcybeR/%2BhEfIZRiv8EIoIQ%2BhwE%2B4hRwL/AlKNDOTqVOxtsLktDl0IPyiNVG2LuX71dULFvdismYihoy27rgYm2jP%2BGYfcTNtYdu0JvrDuFOJ2nZyngl9Hu8JHin2lxQxPwEs2KB4fQEAAA==&custom_palette=H4sIAAAAAAAAClXKQQqAIBRF0b28pg4qgtCtRIT5vyWJRkoQ0d6jGnVHZ3BP7LwlFwNUJbBqzznzkI%2BVoWoBcnqKQfshz84sgVN6PxN93BJUh0JyPVIDgUKaxhr7qHz7y1qiTxVRqyX66wY8E%2B3wfAAAAA==">View this wallpaper in Symmetry Sketchbook</a>
        </p>
        `,github_repo:"symmetry-sketchbook",demo_link:"https://ptrgags.dev/symmetry-sketchbook",updates:[{sort_key:"2020-06-06:01",date:"2019-2020",title:"Original Version",image:{url:U("symmetry-sketchbook","2020-06-06_OldVersion.png")},description:`
        <p>
            I originally read <cite>Creating Symmetry</cite> in 2019, and wanted
            to try out some of the techniques described in the book. I made a
            sketchbook of p5.js sketches to experiment.
        </p>
        <p>
            By the time I got to rosette patterns, I realized that using a
            WebGL shader would be the best way to implement the patterns. This
            is because the patterns require calculations at every pixel.
            Since each calculation is independent, this works nicely.
        </p>
        <p>
            One downside with the old version was the UI had gotten clunky. I
            tried to do too many things on one page, and that made it hard to
            use.
        </p>
        `},{sort_key:"2024-02-13:01",date:"2024-02-13",title:"Symmetry, Repeated",description:`
        <p>
            When I went to clean up Symmetry Sketchbook to feature on this
            portfolio website, I felt disatisfied with the old UI. After
            thinking about it for a while, I had some ideas for a better
            way to present this project. My new design goals included:
        </p>
        <ul>
            <li>
                Instead of one big page that does too much, split into several
                smaller sections based on the type of pattern (curve, rosette,
                frieze, wallpaper) to make the UI look less busy.
            </li>
            <li>
                In each section, make a gallery with a simple interface for
                a general audience, but then have a more advanced interface for
                me to design patterns.
            </li>
            <li>
                I had some ideas to make the editor more visual. I never enjoyed
                typing in numbers for the coefficients.
            </li>
            <li>
                I wanted to change how I did the color palettes. When using
                the old version I found that simple solid color palettes work
                better than complex images, so I wanted to lean into this
                more.
            </li>
            <li>
                For the UI, I figured <a href="https://vuejs.org/">Vue.js</a>
                would be helpful. Before I was using custom Web Components.
                That was a good learning experience, but too tedious.
            </li>
            <li>
                Given the complexity of the code and math in this project,
                I decided to switch to TypeScript for my sanity.
            </li>
        </ul>
        <p>
            In mid-February, I started putting these ideas to code.
        </p>
        `},{sort_key:"2024-02-24:01",date:"2024-02-24",title:"Rosette Editor",description:`
            By the end of February, I had gotten the UI mostly rewritten in Vue,
            and had the rosette editor working. This image is an early
            screenshot, back when I was hard-coding the palette colors.
        `,image:{url:U("symmetry-sketchbook","2024-02-24_ThreefoldSwirl.png")}},{sort_key:"2024-02-24:02",date:"2024-02-24",title:"Inversions Threefold",description:`
            This image was me testing some of the symmetry that involves circle
            inversions. I modified the color palette so points that land within
            the unit circle are shaded darker.
        `,image:{url:U("symmetry-sketchbook","2024-02-24_InversionsThreefold.png")}},{sort_key:"2024-02-24:03",date:"2024-02-24",title:"Swirly Donut",description:"",image:{url:U("symmetry-sketchbook","2024-02-25_SwirlyDonut.png")}},{sort_key:"2024-02-26:01",date:"2024-02-26",title:"Better Rosette Palettes",description:`
            I changed the palettes to be a single hue, with value increasing as
            you go around the color wheel. I also apply a gradient as you move
            away from the unit circle, this adds a lot of depth.
        `,image:{url:U("symmetry-sketchbook","2024-02-26_Ghosty.png")}},{sort_key:"2024-02-27:01",date:"2024-02-27",title:"Bestagon",description:"",image:{url:U("symmetry-sketchbook","2024-02-27_Bestagon.png")}},{sort_key:"2024-02-27:02",date:"2024-02-27",title:"HexGear",description:"",image:{url:U("symmetry-sketchbook","2024-02-27_HexGear.png")}},{sort_key:"2024-02-29:01",date:"2024-02-29",title:"Secondary Color",description:`
            I modified the palette again to allow a second color. This greatly
            expands the artistic possibilities, while still keeping the colors
            simple.
        `,image:{url:U("symmetry-sketchbook","2024-02-29_SecondaryColor.png")}},{sort_key:"2024-03-01:01",date:"2024-03-01",title:"Burning Propeller",description:`
            I added some reference geometry (axes, unit circle, grid lines, etc)
            to the color palettes. This is partly to help the mathematically curious
            explore the patterns, but it also adds some artistic flair.
        `,image:{url:U("symmetry-sketchbook","2024-03-01_BurningPropeller.png")}},{sort_key:"2024-03-01:02",date:"2024-03-01",title:"Down the Drain",description:"",image:{url:U("symmetry-sketchbook","2024-03-01_DownTheDrain.png")}},{sort_key:"2024-03-02:01",date:"2024-03-02",title:"Wallpaper Basics",description:"I ported the wallpaper patterns from my old shader. I found that simple striped palettes worked nicely.",image:{url:U("symmetry-sketchbook","2024-03-02_HoldingHands.png")}},{sort_key:"2024-03-04:01",date:"2024-03-04",title:"Palette Experiment",description:`
            I experimented with taking horizontal and vertical stripes
            and multiplying the colors together. I didn't end up using this
            technique since it's not very intuitive to use, but it did look
            cool.`,image:{url:U("symmetry-sketchbook","2024-03-04_MultiplicationPalette.png")}},{sort_key:"2024-03-04:02",date:"2024-03-04",title:"Oxygen",description:"",image:{url:U("symmetry-sketchbook","2024-03-04_Oxygen.png")}},{sort_key:"2024-03-04:03",date:"2024-03-04",title:"Orbital Motion",description:`
            As I was working on this project, I realized that the code for the
            curves section could easily be reused to make an animation of the
            motion of a solar system from the perspective of an orbiting
            planet. I added it as a fun extra.
        `,image:{url:U("symmetry-sketchbook","2024-03-04_OrbitalMotion.png")}},{sort_key:"2024-03-18:01",date:"2024-03-18",title:"A Little Offset",description:"",image:{url:U("symmetry-sketchbook","2024-03-18_ALittleOffset.png")}},{sort_key:"2024-03-18:02",date:"2024-03-18",title:"Plaid",description:`
            To add more variety in wallpaper palettes, I added a mode that lets you
            combine horizontal and vertical stripes into a plaid pattern. In
            practice it can be used to give wallpapers a dithered look.
        `,image:{url:U("symmetry-sketchbook","2024-03-18_PlaidWallpaper.png")}}]},Lc={id:"blue-velvet-scarf",title:"Knitting a Blue Velvet Scarf",years:"2023-2024",sort_key:"2024-02-00:02",img_format:"jpg",description:`
        <p>
            This is the second scarf I've ever knit. This one used velvet
            yarn in two colors to make it extra soft. The blue yarn is
            a tiny bit thicker, which gives the scarf extra thickness.
        </p>
        <p>
            I kept the pattern simple so I could knit while watching a show
            or spending time with friends. The pattern is as follows:
        </p>
        <ul>
            <li>Row 0: Cast on 32 stitches in blue.</li>
            <li>Rows 1-10: Stockinette stitch. Start with blue and switch color every 5 stitches</li>
            <li>Rows 11-12: Stockinette stitch in blue only</li>
            <li>Repeat rows 1-12 until you reach the desired length. I did 25 repeats total</li>
        </ul>
        <p>
            The interesting zig-zag pattern happens for two reasons. First, 
            switching colors every 5 stitches (which does not divide evenly into the
            32 columns), this produces a stripe pattern. However, since knitting
            flat involves going back and forth, every other row is flipped
            horizontally.
        </p>
    `,updates:[{sort_key:"2023-12-18:01",date:"2023-12-18",title:"Starting Out",image:{url:U("blue-velvet-scarf","2023-12-18_StartingOut.jpg")},description:"I started the scarf. I did 3 repeats in the first sitting."},{sort_key:"2023-12-29:01",date:"2023-12-29",title:"5/25 Pattern Repeats",image:{url:U("blue-velvet-scarf","2023-12-29_AFewMoreRepeats.jpg")},description:""},{sort_key:"2024-01-07:01",date:"2024-01-07",title:"7/25 Pattern Repeats",image:{url:U("blue-velvet-scarf","2024-01-07_ABitLonger.jpg")},description:""},{sort_key:"2024-01-31:01",date:"2024-01-31",title:"19/25 Pattern Repeats",image:{url:U("blue-velvet-scarf","2024-01-31_AlmostDone.jpg")},description:""},{sort_key:"2024-02-02:01",date:"2024-02-02",title:"23/25 Pattern Repeats",image:{url:U("blue-velvet-scarf","2024-02-02_NearlyFinished.jpg")},description:"Nearly finished at 23/25 repeats. Here I folded the scarf in half and compared with another scarf I had made. The blue velvet scarf is a little shorter"}]},Nc={id:"p5-sketchbook",title:"p5 Sketchbook",years:"2016, 2021, 2023-2024",sort_key:"2024-04-00:01",description:`
    <p>
        This project is a repo where I keep a variety of small art experiments
        made using <a href="https://p5js.org/">p5.js</a>.
    </p>
    <p>
        Each sketch is a little different. Some are for learning new things
        about math, others are purely for artistic reasons. Some are
        interactive, others just generate a random image.
    </p>
    <p>
        The screenshot for this project is one from the sketch <a href="https://ptrgags.dev/p5-sketchbook/HyperbolicConnections/">Hyperbolic Connections</a>.
    </p>
  `,github_repo:"p5-sketchbook",demo_link:"https://ptrgags.dev/p5-sketchbook/",img_format:"png",updates:[{sort_key:"2016-06-01:01",date:"2016-06",title:"Processing Sketchbook",description:`
            <p>
                I started the repo in 2016 (originally called
                <code>processing-sketchbook</code>). Originally it
                had a mix of Processing, Processing.py and p5.js sketches,
                though most were rough around the edges and later removed.
            </p>
        `},{sort_key:"2024-01-15:01",date:"2024-01",title:"p5 Sketchbook",description:`
            <p>
                Lately I only ever use p5.js, not the other modes of Processing,
                so I started the process of cleaning up the repo to be focused
                on JavaScript sketches. I renamed the repo
                <code>p5-sketchbook</code> to match this goal.
            </p>
        `},{sort_key:"2024-04-09:01",date:"2024-04-09",title:"Cleanup",description:`
            <p>
                As I added more sketches, I was slowly cleaning up old
                sketches for consistency. I finally caught up and published
                a nicer version of the sketchbook.
            </p>
            <p>
                I suppose I can't really call it a "sketchbook" in the sense
                that it's outgrown the format that the Processing IDE works.
                Oh well.
            </p>
        `}]},Vc={id:"math-notebook",title:"Math Notebook",years:"2024-10-31",sort_key:"2024-10-30:01",github_repo:"math-notebook",img_format:"png",description:`
    <p>
        A Rust project for me to explore mathematical ideas with code.
        More on this project at a later date. For now, enjoy some
        spooky math art for Halloween! 🎃👻
    </p>
  `},Dc=[{id:"paper-toaster",title:"Paper Toaster",years:"2022-2024",sort_key:"2024-01-00:01",github_repo:"paper-toaster",img_format:"png",description:`
        <p>Generative art for thermal printers</p>
        <p>
            A long time ago I saw someone on Twitter make generative art on
            a receipt printer. I sadly didn't bookmark the post, but the
            concept stuck with me. Eventually I decided to get myself a
            receipt printer of myself and make my own art.
        </p>
        <p>
            This project is written in Python. It generates PostScript code
            representing a document that draws the art. I then use GhostScript
            to convert this to PDF since that's easier to print from.
        </p>
        <p>
            Why PostScript? Even though it's old, I like it for its simplicity.
            It's a stack-based language for drawing documents, so commands like
            drawing paths, rectangles, etc are all built-in. To learn more, see
            the <a href="https://www.adobe.com/jp/print/postscript/pdfs/PLRM.pdf">PostScript Language Reference Manual</a>
        </p>
        <p>
            One goal for this project was to make a simple sketchbook-like
            format, inspired by <a href="https://processing.org/">Processing</a>.
            I've always liked that Processing makes it very easy to start
            drawing on the screen. I realized that adopting such a goal in
            projects like this one would make it easier for me to create more
            art. For this project, that felt successful. I managed to make
            many artworks, and it's very easy to add more over time if I so
            choose.
        </p>
    `,updates:[{sort_key:"2022-06-15:01",date:"2022-06-15",title:"Start of Project",description:"I started making a sketchbook format and made a few simple patterns as a warm-up."},{sort_key:"2024-01-22:01",date:"2024-01-22",title:"Public on GitHub",description:"In preparation for this website, I finally got around to cleaning up the README, taking screenshots and making the repo public on GitHub"},{sort_key:"2024-09-23:01",date:"2024-09-23",title:"Add Docker Support",description:`I've been learning more about Docker recently. To practice, I reorganized this repo to use Docker, see the <a href="https://github.com/ptrgags/paper-toaster/releases/tag/v1.0.0">Release Notes</a>`}]},{id:"eloquent",title:"Eloquent",years:"2023-2024",sort_key:"2024-02-00:01",img_format:"png",description:`
        <p>
            A tool for the indecisive. This web app lets you make a list of ideas
            and rank them using an <a href="https://en.wikipedia.org/wiki/Elo_rating_system">Elo rating system</a> like in chess.
        </p>
        <p>
            I've always found it unusually difficult to pick favorites from a long list. So I decided to make myself
            a tool for myself to make it easier. I saw some videos about the math of the Elo rating system, and
            realized it would be a good fit. See the GitHub project for more details.
        </p>
        <p>
            This project served as a learning exercise to learn <a href="https://vuejs.org/">Vue.js</a> in advance
            of updating my website.
        </p>
        `,github_repo:"eloquent",demo_link:"https://ptrgags.dev/eloquent"},Lc,{id:"stretchy-blocks",title:"Stretchy Blocks",years:"2024",sort_key:"2024-02-00:03",img_format:"png",description:`
        <div class="warning">
            ⚠ Compatibility Note: The live demo linked above requires WebGPU. This is a recent
            browser feature, and not all browsers support it. As of 2024-02-15,
            this is known to work in Chrome and Edge for Windows, but not Firefox or
            on mobile devices. Check <a href="https://caniuse.com/webgpu">Can I use...</a>
            for up-to-date compatibility information.
        </div>
        <p>
            This project was a warm-up exercise to learn about <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API">WebGPU</a>.
            I made an animation of cubes that stretch and shrink. See the Demo
            link above for the animated version.
        </p>
        <p>
            The animation is done completely procedurally in the shader. I make use of
            GPU instancing so I only have to upload a single cube to the GPU. All the
            shapes, colors, animations and so on are done mathematically in the shader.
        </p>
        `,github_repo:"stretchy-blocks",demo_link:"https://ptrgags.dev/stretchy-blocks"},Wc,Hc,Nc,Vc],Uc=Dc.map(e=>new zr(e));class zc{constructor(t){te(this,"project_id");te(this,"id");te(this,"title");te(this,"date");te(this,"description");te(this,"url");te(this,"thumbnail");te(this,"card");te(this,"timeline_entry");this.id=t.id,this.project_id=t.project_id,this.title=t.title,this.date=t.date,this.description=t.description,this.url=`/artwork/${this.project_id}/${this.id}`;const i=t.img_format,n=`${Pt}/artwork-thumbnails/${this.project_id}/${this.id}.${i}`,o=`${Pt}/artwork-cards/${this.project_id}/${this.id}.${i}`,r=t.sort_key;this.thumbnail={title:this.title,dates:this.date,link:this.url,sort_key:r,thumbnail:{url:n,size:"thumbnail"}},this.card={url:o,size:"card"},this.timeline_entry={sort_key:r,title:`Artwork: ${this.title}`,title_link:this.url,date:this.date,image:{url:n,size:"thumbnail"},description:t.timeline_desc}}}const qc=[{id:"2024-04-05_StarBow",title:"Star Bow",date:"2024-04-05",sort_key:"2024-04-05:01",project_id:"symmetry-sketchbook",timeline_desc:"An example parametric curve for my website. It has 5-fold rotation symmetry.",img_format:"png",description:`
        <p>
            A parametric curve I made using Symmetry Sketchbook for this portfolio website. This pattern uses 5-fold symmetry of type 2. In other words, there are 5 petals, and the path moves 2 petals at a time.
        </p>
        <p>
            <a href="https://ptrgags.dev/symmetry-sketchbook/#/curve_symmetry?custom_pattern=H4sIAAAAAAAACjXKMQ6AIAxG4bv8c2lawIpcxTg6OKgJGBfj3Q0Jrt97D%2B611O08kJVwrWWvyDOcRhYREvYqpDypgOCmjmqJPAeLDf8zpZGUgxkI1i3EoRXxWN4PQev%2BsmsAAAA=">View in Symmetry Sketchbook</a>
        </p>
    `},{id:"2024-04-05_OctoShock",title:"Octo Shock",date:"2024-04-05",sort_key:"2024-04-05:02",project_id:"symmetry-sketchbook",timeline_desc:"An example rosette pattern. It uses 8-fold rotation symmetry.",img_format:"png",description:`
        <p>
            A rosette pattern I made using Symmetry Sketchbook for this portfolio website. This pattern uses 8-fold rotation symmetry along with complex inversions. The pattern looked like lightning bolts, so I picked a color palette to match.
        </p>
        <p>
            <a href="https://ptrgags.dev/symmetry-sketchbook/#/point_symmetry?custom_pattern=H4sIAAAAAAAACm2PwQoDIQxE/2XOUaI1buuvlFIK9eChK6j0suy/L1291UuGzGOGZMM3lpryimAINZYUK8KGFsunItyhvGZmMtzlnKJlsSDYc7ODXERItLM3EJQZbhfWXpi8tsI/6E7TjbQ1Qk4bXkDonpqhUaXmlQPObvEj9//BYyeU3F4t5fWZyzsWhOt%2BAIgMQOMTAQAA&custom_palette=H4sIAAAAAAAACkXKQQqDMBBG4bv8biMkpQXNZWS0MyikThiDJUjv7qaQ7ffehZPt2HRHDA6ZEpfCU6mZEXHwovubrPYrJYFDtu1DVqdFkxoiOmYR7%2BHa2prMIo8nHISs6TC/fBj%2BmvXLhhjG3w302E1qiAAAAA==">View in Symmetry Sketchbook</a>
            to try visualizing this with different color palettes.
        </p>
    `},{id:"2024-04-05_Treflora",title:"Treflora",date:"2024-04-05",sort_key:"2024-04-05:03",project_id:"symmetry-sketchbook",timeline_desc:"An example wallpaper with 3-fold rotation symmetry. I used a palette with greens, dark magentas and orange to make it look like flowers.",img_format:"png",description:`
        <p>
            A wallpaper pattern I made using Symmetry sketchbook for this portfolio website. This design uses 3-fold rotation symmetry and a green and pink color palette to make it look like flowers.
        </p>
        <p>
            <a href="https://ptrgags.dev/symmetry-sketchbook/#/wallpaper_symmetry?custom_pattern=H4sIAAAAAAAACnWPSw7CMAxE7zJrJ7IdNWlzFcQyQl1AqwTYVL07Kp9KgbDxwk8zz15wT7mM0wVRCCXlMRXEBdeUzwXxAOMsM5M%2BJ1vpA4kdxIMgNXGB2LLvQZ%2BQtJBWSHVDXec2JDXyQmzD4HZVK1TX/Z7HjbbXzvwXGW2Y3sg1VPqF9n%2BPK%2BGUp9uMiNlhfQCxz/2ybwEAAA==&custom_palette=H4sIAAAAAAAACiXGQQrDIBAF0Lv8bF3oWCV4lVKCMWMrFQ1RCqXk7kH6Vu%2BHDx8t1QKnBHafuXde%2BndnOCmwJf%2Bsxeelv1J4F24N7iYQaq5Hg7tjIj1LbSEwGWWCobEY1/jfSsRejc1WabuNEWlFEo/zAoypoxJ8AAAA">View in Symmetry Sketchbook</a>
            to try visualizing this with different color palettes.
        </p>
    `}],Kc=[{id:"2022-06-27_TurtleDances",title:"Turtle Dances",date:"2022-06-27",sort_key:"2022-06-27:01",project_id:"paper-toaster",img_format:"png",timeline_desc:"Artwork inspired by a Bridges math art paper about turtle graphics. It modifies an integer sequence to compute turn angles",description:`
        <p>
            This artwork was inspired by the <a href="https://www.bridgesmathart.org/">Bridges</a> math art paper,
            <a href="https://archive.bridgesmathart.org/2017/bridges2017-139.pdf">"Let the Numbers Do the Walking: Generating Turtle Dances on the Plane from Integer Sequences"</a>
            by Adam Colestock. It uses <a href="https://en.wikipedia.org/wiki/Turtle_graphics">turtle graphics</a>
            to generate patterns.
        </p>
        <p>
            The paper talks about taking an integer sequence, modifying it, 
            and using it to determine how much the turtle should turn after
            each step. The sequence is modified by taking the sequence,
            dividing it by two different divisors, and subtracting the
            remainders. The complexity of the pattern depends on the choice
            of divisors as well as the angular step size when the turtle
            turns.
        </p>
        <p>
            The original paper only used the natural numbers, but I also
            included some other sequences (square, triangle and Fibonacci
            numbers)
        </p>
        <p>
            As a bonus, here are some Desmos graphs exploring the math of
            these patterns:
        </p>
        <ul>
            <li><a href="https://www.desmos.com/calculator/uvvgysw7xt">Visualization of the modified integer sequences</a></li>
            <li><a href="https://www.desmos.com/calculator/wcmvohdoxt">It looks cooler in polar coordinates</a></li>
        </ul>
        `},{id:"2022-07-09_ElementaryCA",title:"Elementary Cellular Automaton",date:"2022-07-09",sort_key:"2022-07-09:01",project_id:"paper-toaster",img_format:"png",timeline_desc:"The classic cellular automaton, now in printable form",description:`
        <p>
            Looking for more pattern ideas to make on my receipt printer, I returned to the classic
            <a href="https://mathworld.wolfram.com/ElementaryCellularAutomaton.html">elementary cellular automaton</a>.
        </p>
        <p>
            The automaton is 1-dimensional, so the vertical direction (in this case from bottom to top) represents time.
            To compute a pixel in the next row, you examine a neighborhood of 3 pixels from the previous row. There
            are 8 possible combinations of 3 bits. The rule number (from 0 to 255) acts as a table of 8 bit flags that
            determines the result for the corresponding input pattern.
        </p>
        <p>
            Fun fact: Certain elementary CA patterns also serve as a simplified model of the patterns
            on sea snail shells. See <a href="https://en.wikipedia.org/wiki/Oliva_porphyria"><i>Olivia Porphyria</i></a>
            for example.
        </p>
        `},{id:"2022-07-24_Braids",title:"Braids",date:"2022-07-24",sort_key:"2022-07-24:01",project_id:"paper-toaster",img_format:"png",timeline_desc:"A tiling that looks like braided strands of rope",description:`
        <p>
            I like making tilings and I like drawing braided rope, so I
            figured I'd combine the two into this artwork.
        </p>
        <p>
            This tiling is very simple. Each grid cell contains two strands.
            They either can be crossed, or they can remain parallel. I
            randomly choose which should happen.
        </p>
        <p>
            To ensure the pattern looks like a weave pattern, it's important
            to alternate the crossing direction on each row. Furthermore,
            the crossings will be offset by one strand each row. This means
            there's an edge case to handle on the left and right boundaries,
            but by forcing such edges to be parallel and letting it draw
            off-canvas, it's easy to make it look consistent.
        </p>
        `},{id:"2022-07-24_IsoGrid",title:"Isometric Grid",date:"2022-07-24",sort_key:"2022-07-24:02",project_id:"paper-toaster",img_format:"png",timeline_desc:"A simple isometric scene, rendered with some 2D graphics trickery",description:`
        <p>
            I like the look of isometric projection a lot, it gives a nice
            view of a 3D scene while keeping the lines nice and parallel. I
            decided to make a simple artwork based on this.
        </p>
        <p>
            Since paper-toaster uses 2D, not 3D graphics, I had to use some
            trickery to get this to work. I could have used a tile-based approach
            like video games sometimes use (especially for older 2D consoles),
            but I found a simpler way.
        </p>
        <p>
            First, the scene is constructed carefully so taller cells
            are towards the back and short cells are towards the front. This
            ensures that something in the foreground won't interfere with
            something behind it.
        </p>
        <p>
            Second, I kept the rendered shapes as simple as possible. A single
            cell is a tall cuboid shape. When drawn in isometric projection,
            shading the top, left and right sides, it looks like 3
            parallelograms.
        </p>
        <p>
            Third, I kept the visual style simple. I made the top, left and
            right sides solid color. I used 3 shades of grey. That's sufficient
            to simulate diffuse lighting for a flat-shaded cuboid using a
            directional light, without any of the lighting calculations!
        </p>
        <p>
            Finally, I render from back to front. Since this is a square grid,
            this just means iterating over the minor diagonals. This ensures
            that my long parallelograms are hidden behind stuff in the
            foreground. In 3D graphics, this would be undesireable since this
            involves a lot of overdraw, but this is a small artwork and only
            needs to be rendered once, so I did what I could get away with.
        </p>
        `},{id:"2022-08-23_ColoredBraids",title:"Colored Braids",date:"2022-08-23",sort_key:"2022-08-23:01",project_id:"paper-toaster",timeline_desc:"Braids, now in technicolor!",img_format:"png",description:`
        <p>
            After I had made the earlier artwork <a href="#/artwork/paper-toaster/2022-07-24_Braids">Braids</a>,
            a friend told me that it would look nice in color for fabric. So I
            made a different script to allow specifying a color palette and
            other improvements. This one isn't designed for the receipt printer,
            as it will print it in grayscale.
        </p>
        <p>
            One difference is where Braids just randomly placed tiles, this
            one actually tracks the path of each strand. Essentially I
            take a list of strands and do an odd-even shuffle row by row. After
            each iteration, I record the new state of the strands. This informs
            where to put the crossings and what colors to make them.
        </p>
        <p>
            This particular example used the grouping option to ensure the
            braids happen in groups of 2 and 3.
        </p>
        `},{id:"2024-06-11_RobotWalks",title:"Robot Walks",date:"2024-06-11",sort_key:"2024-06-11:01",project_id:"paper-toaster",timeline_desc:'I added a new artwork inspired by Project Euler puzzle <a href="https://projecteuler.net/problem=208">#208 Robot Walks</a>.',img_format:"png",description:`
        <p>
            This artwork is inspired by Project Euler puzzle
            <a href="https://projecteuler.net/problem=208">#208 Robot Walks</a>.
            Project Euler is a website with many math puzzles that require
            programming to solve. This one had an interesting visualization,
            so I thought I'd use it to make art.
        </p>
        <p>
            Imagine a robot that can only move in circular arcs to the left
            or right, always 1/5 of a turn each step. What paths are possible?
            How many paths return to the start?
        </p>
        <p>
            I haven't completely solved the Project Euler puzzle, but I did
            learn that most of the time, repeating a sequence of left/right
            commands 5 times will return the robot to the start. This is what I
            do to make these nice patterns with 5-fold symmetry.
        </p>
    `},{id:"2024-06-11_FanGear",title:"Fan Gear",date:"2024-06-11",sort_key:"2024-06-11:02",project_id:"paper-toaster",timeline_desc:"Another artwork using the Robot Walks script",img_format:"png",description:`
        <p>
            This is another artwork made with the Robot Walks script in
            Paper Toaster. For this one, I rendered the robot's path with
            straight lines instead of circular arcs. This gives it a more
            angular appearance. It looks to me like a cross between a fan
            and a gear.
        </p>
    `}],Gc=[{id:"2021-06-23_SeashellTexture",title:"Seashell Texture",date:"2021-06-23",sort_key:"2021-06-23:01",project_id:"p5-sketchbook",img_format:"png",timeline_desc:"A sketch that simulates the patterns on certain cone snail shells",description:`
        <p>
            A simulation of how the triangular pigmentation patterns on
            seashells are formed. This is based on the paper <a href="http://algorithmicbotany.org/papers/shells.sig92.pdf"><cite>Modeling Seashells</cite></a>
            by Fowler, Meinhardt and Prusinkiewicz.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/SeashellTexture/">p5 sketch</a>
            for the animated version and a more detailed description.
        </p>
    `},{id:"2023-12-23_GrowingFlowers",title:"Growing Flowers",date:"2023-12-23",sort_key:"2023-12-23:01",project_id:"p5-sketchbook",img_format:"png",timeline_desc:"A satisfying animation of a plant that grows and flowers",description:`
        <p>
            A simulation of plant growth using a modified random depth-first-search maze generation algorithm.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/GrowingFlowers/">p5 sketch</a>
            for the animated version and a more detailed description.
        </p>
    `},{id:"2024-03-12_PentagTiling",title:"Pentag Tiling",date:"2024-03-12",sort_key:"2024-03-12:01",project_id:"p5-sketchbook",img_format:"png",timeline_desc:"An artistic tiling on a grid of pentagons",description:`
        <p>
            An artistic pattern made on a tiling of tag-shaped pentagons.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/PentagTiling/">p5 sketch</a> for the interactive
            version and a more detailed description.
        </p>
        <p>
            This was an experiment in making generative art with just a little
            bit of user interaction to make it feel more satisfying.
        </p>
    `},{id:"2024-04-09_HyperbolicConnections",title:"Hyperbolic Connections",date:"2024-04-09",sort_key:"2024-04-09:02",project_id:"p5-sketchbook",img_format:"png",timeline_desc:"A swirly pattern made in the hyperbolic plane. This was originally made in 2021, but I tweaked it a bit when cleaning up p5-sketchbook.",description:`
        <p>
            A swirly pattern made on the Poincaré model of the hyperbolic plane.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/HyperbolicConnections/">p5 sketch</a> for the interactive
            version and a more detailed description.
        </p>
        <p>
            I first made this sketch in 2021. It just generated the image
            and masked out the background. I removed the masking, just because
            it looks cool. I also enabled warping the image with the mouse,
            since that leads to some neat swirly patterns.
        </p>
    `},{id:"2024-04-09_Refill",title:"Refill",date:"2024-04-09",sort_key:"2024-04-09:03",project_id:"p5-sketchbook",img_format:"png",timeline_desc:"An impossible game about trying to keep a bunch of meters full.",description:`
        <p>
            An impossible "game" about trying to keep all the meters filled.
            It serves as an analogy for trying to keep up with the never-ending
            list of tasks in day-to-day life.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/Refill/">p5 sketch</a> for the interactive
            version and a more detailed description.
        </p>
    `},{id:"2024-09-25_InkBlocks",title:"Ink Blocks",date:"2024-09-25",sort_key:"2024-09-25:01",project_id:"p5-sketchbook",img_format:"png",timeline_desc:"A silly automaton inspired by fountain pens and sunflowers.",description:`
        <p>
            In my fountain pen case, I keep a number of pens of different colors
            for journaling and drawing. I cycle through the pens one by one.
            When a pen runs out of ink, I remove it from the case for cleaning.
            The remaining pens slide to the left, and refilled pens are added
            on the right.
        </p>
        <p>
            I was curious what pattern you get if you repeat this process
            over a long period of time. So I made this automaton to simulate it.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/InkBlocks/">p5 sketch</a>
            for the animated version and a more detailed description.
        </p>
    `},{id:"2024-09-25_InfiniteSunflower",title:"Infinite Sunflower",date:"2024-09-25",sort_key:"2024-09-25:02",project_id:"p5-sketchbook",img_format:"png",timeline_desc:"An artistic depiction of the growth of sunflower spirals.",description:`
        <p>
            Recently I read about the math of spiral pyllotaxis, the spiral
            patterns of florets you see in sunflowers and other plants.
            Most notably, the paper 
            <a href="https://www.sciencedirect.com/science/article/pii/S007961072300038X">"Towards solving the mystery of spiral phyllotaxis"</a>
            which illustrates how this pattern emerges from very simple rules.
        </p>
        <p>
            This sketch is my artistic animation of the creation of these
            spirals, except mine continues forever. New florets are added
            in the center, and the oldest petals are removed after a while.
        </p>
        <p>
            See the <a href="https://ptrgags.dev/p5-sketchbook/InfiniteSunflower/">p5 sketch</a> 
            for the animated version and a more detailed description.
        </p>
    `}],$c=[{id:"2024-10-30_GhostOctahedral",title:"Ghost Octahedral Tour",date:"2024-10-30",timeline_desc:"A ghost takes a spin around the octahedral rotation group.",description:`
    <p>
        <i>Our ghostly friend got too close to a mathematician's sphere and was sent
        for a spin. A rather symmetric spin...</i>
    </p>
    <p>
        This tiling was created with two 90 degree elliptic Möbius 
        transformations, one swirling around +/- 1, the other around +/- i.
        However, it's easier to think about on a sphere. Take a sphere
        and perform any combination of quarter turns around the x axis or
        y-axis. After a while, you will find that you create 24 unique rotations.
        As it turns out, this is the same as the 24 rotation symmetries of
        an octahedron of cube. In math this is called the 
        <a href="https://en.wikipedia.org/wiki/Octahedral_symmetry#Chiral_octahedral_symmetry">(chiral) octahedral symmetry group</a>,
        O. This image is just a stereographic projection of that sphere
        onto the complex plane.
    </p>
    <p>
        Each pair of overlapping ghosts represents the two ways of orienting
        the edge of a cube (forward or reversed). The size of the ghosts
        represents how near they were to the north pole before projecting.
        There are 3 rings of 4 ghosts. From largest to smallest, we have
        the top 4 edges of the cube, the 4 vertical edges, and 4 bottom edges.
    </p>
    `,sort_key:"2024-10-30:08",project_id:"math-notebook",img_format:"png"},{id:"2024-10-30_CandyCorners",title:"Candy Corners",date:"2024-10-30",timeline_desc:"Candy corn at the corners of a hyperbolic tiling",description:`
        <p>Candy corn at the corners of a <a href="https://en.wikipedia.org/wiki/Order-7_triangular_tiling">{3, 7}-hyperbolic tiling</a>.</p>
        <p>
            I finally figured out how to represent regular hyperbolic tilings
            using Möbius transforms after reading
            <a href="https://dl.acm.org/doi/10.1145/965161.806808">"Creating repeating hyperbolic patterns"</a> by Dunham, 
            Lidgren and Witte, found through the article
            <a href="https://medium.com/@philogb/an-overview-of-symmetry-papers-f21f12bc08f7">"An Overview of Symmetry Papers"</a> by Nicolas Belmonte.
            This was a big breakthrough for me, as I've been wondering how to make such Escher-esque patterns for years.
        </p>
    `,sort_key:"2024-10-30:07",project_id:"math-notebook",img_format:"png"},{id:"2024-10-30_GhostDoubleSpiral",title:"Ghost Double Spiral",date:"2024-10-30",timeline_desc:"Ghost sailors, navigating from pole to pole.",description:`
        <p>
            Here the ghosts are following 4
            <a href="https://en.wikipedia.org/wiki/Rhumb_line">loxodromic paths</a>
            around the globe. These are paths with a constant bearing relative 
            to north. Stereographic projection from the equator makes them
            look like double spirals instead.
        </p>
    `,sort_key:"2024-10-30:06",project_id:"math-notebook",img_format:"png"},{id:"2024-10-30_RibCage",title:"Rib Cage",date:"2024-10-30",timeline_desc:"Infinite ribs.",description:"<p>Here I'm using hyperbolic Möbius transformations to make a rib cage that can fit any number of ribs</p>",sort_key:"2024-10-30:05",project_id:"math-notebook",img_format:"png"},{id:"2024-10-30_HexTiles",title:"Hex Tiles",date:"2024-10-30",timeline_desc:"A Halloween pun.",description:"<p>A Halloween pun.</p>",sort_key:"2024-10-30:04",project_id:"math-notebook",img_format:"png"},{id:"2024-10-30_BoneTree",title:"Bone Tree",date:"2024-10-30",timeline_desc:"Money doesn't grow on trees. But skulls grow on this one.",description:"<p>I wanted to do a classic tree fractal, but make it spooky for Halloween.</p>",sort_key:"2024-10-30:03",project_id:"math-notebook",img_format:"png"},{id:"2024-10-30_GhostGasket",title:"Ghost Gasket",date:"2024-10-30",timeline_desc:"A ghost takes a dizzying tour of the Apollonian gasket fractal.",description:`
        <p>
            This image is based on a diagram from Chapter 7 of
            <cite>Indra's Pearls</cite> by Mumford, Series, and Wright. That
            chapter talks about the <a href="https://en.wikipedia.org/wiki/Apollonian_gasket">Apollonian gasket</a>
            and how to create the pattern from 2 Möbius transformations.
        </p>
        <p>
            This image is not the full gasket, but the tiling within one of
            its circles. The geometry here is peculiar, so it's no wonder it
            took me a while to understand. Not only are the tiles unusual
            shapes (ideal quadrilaterals), but up doesn't point the same
            way in adjacent tiles! I used to be as dizzy as our ghost pal here.
        </p>
        `,sort_key:"2024-10-30:02",project_id:"math-notebook",img_format:"png"},{id:"2024-10-30_Warpedpaper",title:"Warpedpaper",date:"2024-10-30",timeline_desc:"Sweet wallpaper bent into circles with math.",description:`
        <p>
        I took the candy corn motif, and made a wallpaper tiling out of it. To
        make it more interesting, I applied a hyperbolic Möbius transformation to
        bend the vertical columns into the circular arcs you see here.
        </p>`,sort_key:"2024-10-30:01",project_id:"math-notebook",img_format:"png"}],Qc=[...Kc,{id:"2024-02-04_BlueVelvetScarf",title:"Blue Velvet Scarf",date:"2024-02-04",sort_key:"2024-02-04:01",project_id:"blue-velvet-scarf",timeline_desc:"The finished scarf. In total, it took about a month and a half and 25 pattern repeats",img_format:"jpg",description:`
        <p>
            A scarf knitted with blue and black velvet yarn. From start to
            finish, it took me about a month and a half, faster than the previous
            scarf I made.
        </p>
        <p>
            See the project page for more details.
        </p>
        `},{id:"2023-09-01_HyperbolicCrochet",title:"Hyperbolic Crochet",date:"2023-09-01",sort_key:"2023-09:01",project_id:"hyperbolic-crochet",timeline_desc:"After about two years and one month, I finally finished making this crochet pattern.",img_format:"jpg",description:`
        <p>
            This crochet pattern was inspired by the TED talk <a href="https://youtu.be/w1TBZhd-sN0?si=XsH01B6DCeU8LoqT">"Crocheting Hyperbolic Planes"</a>
            by Daina Taimiņa. Every stitch is an increase.
        </p>
        <p>
            Since each additional row is twice the length of the previous one,
            there is no way for the fabric to lay flat. Instead, it curls
            up in 3D space.
        </p>
        <p>
            This type of growth happens often in nature. For example, think
            of brains, coral, or lettuce.
        </p>
    `},...qc,...Gc,...$c],qr=Qc.map(e=>new zc(e));function Jc(){const e={};for(const t of qr){const i=t.project_id;e[i]===void 0&&(e[i]=[]),e[i].push(t)}return e}const gu=Jc();function Po(e,t){return t.sort_key.localeCompare(e.sort_key)}class Xc extends zr{constructor(i){super({id:i.id,title:`${i.title} 🎵`,years:i.release_date,sort_key:i.sort_key,description:i.description,img_format:"png",featured:i.featured,hide:i.hide});te(this,"tracks");te(this,"play_style");te(this,"album_url");this.album_url=`${Pt}/music-albums/${this.id}`,this.tracks=i.tracks,this.play_style=i.play_style}get url(){return`/album/${this.id}`}get first_track(){return this.tracks[0]}get_track_url(i){return`${this.album_url}/${i.filename}`}}const Yc={id:"boo",title:"boo.",release_date:"2020-10-31",sort_key:"2020-10-31:00",play_style:"advance",description:`
    <p>
        This Halloween-themed album was my first time making music with
        my own hardware synthesizers. I explored a variety of ways of making
        spooky music.
    </p>
  `,tracks:[{filename:"01_2020-10-11_October.flac",title:"October",date:"2020-10-11",description:"Made in Waveform Pro. I started composing this on October 1."},{filename:"02_2020-10-25_SkeletonsInAHurry.flac",title:"Skeletons in a Hurry",date:"2020-10-25",description:"Made with a Novation Circuit."},{filename:"03_2020-10-24_OcarinaHaunt.flac ",title:"Ocarina Haunt",date:"2020-10-24",description:"Composed in MuseScore, played in Waveform Pro using Tracktion Collective Ocarina samples."},{filename:"04_2020-10-11_WeekOldLeftovers.flac",title:"Week Old Leftovers",date:"2020-10-11",description:"Made with a Novation Circuit."},{filename:"05_2020-10-23_TheBoxThatPlaysSongsInTheNight.flac",title:"The Box That Plays Songs in the Night",date:"2020-10-23",description:"Composed in MuseScore, converted to music box punch card and recorded with a contact mic."},{filename:"06_2020-10-24_Crosstalk.flac",title:"Crosstalk",date:"2020-10-24",description:"Roland System-1, playing with the vowel oscillator setting."},{filename:"07_2020-10-11_RustingSteel.flac",title:"Rusting Steel",date:"2020-10-11",description:"Made with a Novation Circuit."},{filename:"08_2020-10-11_GhostJam.flac",title:"Ghost Jam",date:"2020-10-11",description:"Made with a Novation Circuit."},{filename:"09_2020-10-24_SudokuBass.flac",title:"Sudoku Bass",date:"2020-10-24",description:`
        Made with a Novation Circuit. Bassline is routed through Korg Monologue. 
        I started this one by solving a sudoku puzzle and using the numbers to
        pick notes. The fact that this is track 9 is not a coincidence.
      `},{filename:"10_2020-10-25_Falling.flac",title:"Falling",date:"2020-10-25",description:"Made with a Novation Circuit."},{filename:"11_2020-10-23_HelluvaTrainRide.flac",title:"Helluva Train Ride",date:"2020-10-23",description:"Here I was experimenting with the noise channel of a Roland System-1."},{filename:"12_2020-10-11_TwelveToneHorror.flac",title:"Twelve Tone Horror",date:"2020-10-11",description:`
        Made with Waveform Pro using various plugins. 
        I was trying out <a href="https://en.wikipedia.org/wiki/Twelve-tone_technique">12-tone composition</a>
        technique. This is also why this is track 12.
      `},{filename:"13_2020-10-21_13MinutesOfSpooky.flac",title:"13 minutes of spooky",date:"2020-10-21",description:"Made with a Roland System-1."},{filename:"14_2020-10-23_SirensCalling.flac",title:"Sirens Calling",date:"2020-10-23",description:"Made with a Roland System-1."}]},Zc={id:"loops",title:"Loops",release_date:"2024-05-01",sort_key:"2024-05-01:00",description:`
  <p>
    It's been about two and a half years since I last made music (see
    <a href="#/album/improvised-vol2">Improvised Volume 2</a>).
    I wanted to get more comfortable writing music in
    a digital audio workstation (DAW), so I tried my hand at making background
    music loops. I used more synth presets so I could focus on composition.
  </p>
  <p>
    One big inspiration for this album was the soundtrack from the game 
    <a href="https://en.wikipedia.org/wiki/Golden_Sun">Golden Sun</a> for 
    Gameboy Advance. It was my favorite RPG as a kid. I studied
    the soundtrack and re-watched <a href="https://youtu.be/9yxEPZ1vCnM?si=KxZP08nysqhKlruk">8-bit Music Theory's video</a>
    about the game's music. I learned quite a few things about the structure
    of background music (often a simple AB loop is enough!), the choice
    of instruments (e.g. mallet percussion + delay makes nice ethereal vibes),
    and use of unusual time signatures.
  </p>
  <p>
    Also, thanks to <a href="https://www.youtube.com/@KeygenGirl">@KeygenGirl</a> 
    for our discussions about music production, that helped me get enthusiastic
    about making music again. And she provided some tips about mixing that
    came in handy!
  </p>
  `,play_style:"loop",tracks:[{filename:"01_2024-04-18_SkylineStroll.flac",title:"Skyline Stroll",date:"2024-04-18",description:"This track gave me a fun vibe of walking around a city."},{filename:"02_2024-04-14_Bouncy.flac",title:"Bouncy",date:"2024-04-14",description:`
        <p>This was an exercise in metric modulation from 3/4 to 4/4 time.</p>
        <p>
          Thanks <a href="https://www.youtube.com/@KeygenGirl">@KeygenGirl</a>
          for your advice about mixing this track! It sounds way clearer
          now compared to what I originally had.
        </p>
      `},{filename:"03_2024-04-26_OnePitchEach.flac",title:"One Pitch Each",date:"2024-04-26",description:`
        I challenged myself to make a track where each instrument plays only a 
        single pitch (though different octaves are allowed). It turned into a 
        fun jazzy number!
      `},{filename:"04_2024-04-10_JupiterIcehouse.flac",title:"Jupiter Icehouse",date:"2024-04-10",description:`
        <p>
        This was the first track I made for this album. I call it a "structure 
        parody" of the <a href="https://youtu.be/N9hfd28ezfQ?si=bE-T7egB3HkQnKZO">Jupiter Lighthouse theme</a>
        from Golden Sun: The Lost Age. I mimicked the following details of the
        track:
        </p>
        <ul>
          <li>Structure - The track is a short AB loop.</li>
          <li>
            Contours - The mallet percussion arpeggiates upwards except for the 
            last chord of each section where it arpeggiates downwards.
          </li>
          <li>
            Instruments - I tried to find similar-sounding synths.
          </li>
          <li>
            Effects - Several of the instruments have a delay (echo) effect
            which helps give an ethereal sound. Only later did I realize that
            I used a longer delay that's not quite the same as the slapback
            delay of the original.
          </li>
        </ul>
        <p>However, everything else was written from scratch:</p>
        <ul>
          <li>Chords - I made up a new chord progression.</li>
          <li>
            Melodies - All the melodies and arpeggios were written based
            on the new chord progression.
          </li>
          <li>
            Rhythm - For the flute chord, I repeated the stacatto chord
            a few times to give it more motion than in the original.
          </li>
        </ul>
        <p>
          Where the original has a mysterious, ethereal vibe, my experiment
          had a brighter, wintertime vibe. I think this has to do with the
          change in chord progression and the metallic percussion.
        </p>
      `},{filename:"05_2024-04-25_WhileTheRiceCooks.flac",title:"While the Rice Cooks",date:"2024-04-25",description:`
        I started making this track while I was waiting for my rice cooker to 
        finish, hence the name.
      `},{filename:"06_2024-04-26_DiceArp.flac",title:"Dice Arp",date:"2024-04-26",description:`
        I made several clips for the arpeggios, and sequenced them into longer
        patterns using some dice. I then layered other tracks on top.
      `},{filename:"07_2024-04-28_DialingTheVoid.flac",title:"Dialing the Void",date:"2024-04-28",description:`
        I detuned a synth to produce the frequencies of a phone's 
        number pad (<a href="https://en.wikipedia.org/wiki/DTMF">DTMF</a> tones). 
        I then sequenced it as if each button is a different drum hit.
      `},{filename:"08_2024-04-30_BouncyBallOrchestra.flac",title:"Bouncy Ball Orchestra",date:"2024-04-30",description:`
        This one is a bit chaotic. I made some samples that sound like a ball
        bouncing increasingly fast, then played arbitrary notes with the sample.
      `},{filename:"09_2024-04-29_OceanMysteries.flac",title:"Ocean Mysteries",date:"2024-04-29",description:`
        This was a low-effort track. I just took a big chord and let the voices
        meander smoothly. With the synths I used, it gave me underwater vibes.
      `},{filename:"10_2024-04-29_Xylotheque1.flac",title:"Xylotheque I",date:"2024-04-29",description:`
        <a href="https://en.wikipedia.org/wiki/Xylotheque">"Xylotheque"</a> refers
        to a library of wood samples. However, here I'm using the word jokingly 
        to mean "a repository of xylophones".
      `},{filename:"11_2024-04-29_Xylotheque2.flac",title:"Xylotheque II",date:"2024-04-29",description:`
       Originally I intended Xylotheque I and II to be the A and B sections of
       the same track, but I split them up since I thought they each sounded
       good independently.
      `},{filename:"12_2024-04-14_Warehouse54.flac",title:"Warehouse 54",date:"2024-04-14",description:`
        I saved the best for last. The title comes from Ableton's "Warehouse 
        Stutter" kit + the 5/4 time signature. However, the sound evokes "boss 
        battle in Warehouse 54" vibes.
      `}]},eu={id:"improvised-vol2",title:"Improvised Volume 2",release_date:"2021-10-31",sort_key:"2021-10-31:02",description:`
    <p>
      This album was released alongside <a href="#/album/improvised-vol1">Improvised Volume 1</a>
      on Halloween 2021.
    </p>
    <p>
      This second volume was almost completely recorded in the month of October.
      The goal of releasing new music by Halloween helped keep me motivated.
    </p>
  `,play_style:"advance",tracks:[{filename:"01_2021-08-06_AHauntingTimeOfYear.flac",title:"A Haunting Time of Year",date:"2021-08-06",description:`
        Ironically, this track was recorded in August even though it's the most
        Halloween-themed one.
      `},{filename:"02_2021-10-17_SomberTranquility.flac",title:"Somber Tranquility",date:"2021-10-17",description:"Steel tongue drum + reverb = tranquil soundscapes."},{filename:"03_2021-10-19_SwaySlowly.flac",title:"Sway Slowly",date:"2021-10-19",description:`
        I'm very new to guitar, so just picked a chord and did arpeggios and a
        melody. I angled the capo such that the higher strings are detuned 
        slightly.
      `},{filename:"04_2021-10-19_TuesdayInDystopia.flac",title:"Tuesday in Dystopia",date:"2021-10-19",description:"I picked a chord shape and moved it around the neck."},{filename:"05_2021-10-21_TwoEars.flac",title:"Two Ears",date:"2021-10-21",description:`
        A different timbre in each ear. I recommend wearing headphones/earbuds 
        for this one.`},{filename:"06_2021-10-21_TheVisitor.flac",title:"The Visitor",date:"2021-10-21",description:"This visitor is not from Earth..."},{filename:"07_2021-10-22_Deflect.flac",title:"Deflect",date:"2021-10-22",description:"For this one I was experimenting with the pitch bend wheel."},{filename:"08_2021-10-22_MetallicSkids.flac",title:"Metallic Skids",date:"2021-10-22",description:`
        Here I was experimenting with a steel slide on guitar. It produces a 
        metallic, spacy vibe.
      `},{filename:"09_2021-10-23_DigitalWind.flac",title:"Digital Wind",date:"2021-10-23",description:`
        Experimenting with an electronic wind instrument (EWI) and a synth.
      `},{filename:"10_2021-10-25_SubterraneanMachines.flac",title:"Subterranean Machines",date:"2021-10-25",description:"They hum to themselves, but no one is around to hear..."},{filename:"11_2021-10-27_WailingSignal.flac",title:"Wailing Signal",date:"2021-10-27",description:"I made this with a guitar and an Arturia Microfreak."},{filename:"12_2021-10-27_WhatDoTheNumbersMean.flac",title:"What Do the Numbers Mean",date:"2021-10-27",description:"I don't even know..."},{filename:"13_2021-10-29_EntropyStones.flac",title:"Entropy Stones",date:"2021-10-29",description:"Experimenting with dice as a percussion instrument."},{filename:"14_2021-10-29_ExpandingUniverse.flac",title:"Expanding Universe",date:"2021-10-29",description:"<code>U n i v e r s e</code>"}]},tu={id:"improvised-vol1",title:"Improvised Volume 1",release_date:"2021-10-31",sort_key:"2021-10-31:01",description:`
    <p>
      This album was released alongside <a href="#/album/improvised-vol2">Improvised Volume 2</a>
      on Halloween 2021.
    </p>
    <p>
      In the lockdown years, making music was a big hobby. I fell pretty far down the 
      rabbit hole of buying hardware synthesizers and other music equipment.
      I wanted to get away from my computer, so I got a digital recorder and
      just recorded me improvising on keyboard.
    </p>
    <p>
      This first volume is a collection of the better improvisations I had
      recorded in the first half of 2021.
    </p>
  `,play_style:"advance",tracks:[{filename:"01_2021-01-11_Introduction.flac",title:"Introduction",date:"2021-01-11",description:`
        This was a test of recording from various instruments with a portable
        recording device.
      `},{filename:"02_2021-01-13_Waaaah.flac",title:"Waaaah",date:"2021-01-13",description:"The title says it all."},{filename:"03_2021-01-14_MultiOrgans.flac",title:"MultiOrgans",date:"2021-01-14",description:`
        I recorded my Yamaha Reface YC organ several times with different
        settings.
      `},{filename:"04_2021-01-18_WorkingInTheWind.flac",title:"Working in the Wind",date:"2021-01-18",description:`
       These experiments with a noise generator sounded industrial in nature.
      `},{filename:"05_2021-01-26_Stable.flac",title:"Stable",date:"2021-01-26",description:"A more stable sound than Unstable."},{filename:"06_2021-01-26_Unstable.flac",title:"Unstable",date:"2021-01-26",description:"A more unstable sound than Stable."},{filename:"07_2021-01-31_WithoutPower.flac",title:"Without Power",date:"2021-01-31",description:`
        <p>
          It was a dark and stormy night. The power went out. Not to fear, this 
          organ has batteries!
        </p>
      `},{filename:"08_2021-02-05_AndroidsCrying.flac",title:"Androids Crying",date:"2021-02-05",description:"Pocket Operator PO-28 Robot doesn't just sing, it <em>laments</em>."},{filename:"09_2021-03-24_Vincent.flac",title:"Vincent",date:"2021-03-24",description:`
        My Roland System-1 is named "Vincent" because I once referred to the
        synth as "Green Synth" too fast in a call with a friend. My mumbling
        probably sounded like "grinsinth". My friend misheard this as
        "Vincent" and so that synth has been named that ever since.
      `},{filename:"10_2021-03-25_VincentsLair.flac",title:"Vincent's Lair",date:"2021-03-25",description:"I never said Vincent was the hero of the story..."},{filename:"11_2021-03-31_Jagged.flac",title:"Jagged",date:"2021-03-31",description:"Careful, it's sharp!"},{filename:"12_2021-05-19_PitOfScience.flac",title:"Pit of Science",date:"2021-05-19",description:"Here I was experimenting with an Arturia MicroFreak."},{filename:"13_2021-05-19_Rotunda.flac",title:"Rotunda",date:"2021-05-19",description:"Spacious."},{filename:"14_2021-05-27_Precipice.flac",title:"Precipice",date:"2021-05-27",description:`
        <p>A world on the brink of disaster. Sounds familiar...<p>
        <p>
          [EDIT 2024: Wow, looking back at these liner notes from 2021 and the
          moody tracks of this album, I see how much the pandemic and lockdown
          was affecting my mental health at the time 😢. In comparison, 
          my 2024 album <a href="#/album/loops">Loops</a> is a lot brighter
          and lively overall.]
        </p>
      `}]},iu={id:"improvised-vol3",title:"Improvised Volume 3",release_date:"2024-07-15",sort_key:"2024-07-15:01",description:`
        <p>
            I keep a digital recorder near my synth keyboards so I can record
            my synth jams. I wait until I fill up the SD card and then
            edit them in bulk. These improvisations were recorded this spring, 
            but edited much later.
        </p>
        <p>
            The first half of the album is a collection of miscellaneous
            synthesizer tracks. The second half is a number of electric piano
            tracks. I used my Yamaha Reface CP which emulates classic EPs like
            Rhodes and Wurlitzers.
        </p>
    `,tracks:[{filename:"01_2024-03-07_InclementWeather.flac",title:"Inclement Weather",date:"2024-03-07",description:"<i>The wind was howling outside, but inside it was nice and comfy.</i>"},{filename:"02_2024-03-09_DesolateSpaceport.flac",title:"Desolate Spaceport",date:"2024-03-09",description:"<i>You arrived to the asteroid spaceport 5 minutes too late. Next launch: two years from now...</i>"},{filename:"03_2024-03-09_HiddenCove.flac",title:"Hidden Cove",date:"2024-03-09",description:"<i>A hideout away from the waves</i>"},{filename:"04_2024-03-24_PleasantWhine.flac",title:"Pleasant Whine",date:"2024-03-24",description:"<i>It wasn't the words but the way it was said that had a nice ebb and flow.</i>"},{filename:"05_2024-03-24_SquareBells.flac",title:"Square Bells",date:"2024-03-24",description:"<i>They sound nice and are stackable too!</i>"},{filename:"06_2024-03-09_SleepInertia.flac",title:"Sleep Inertia",date:"2024-03-09",description:"<i>That awful feeling when you oversleep and wake up feeling disoriented</i>"},{filename:"07_2024-03-07_Punchy.flac",title:"Punchy",date:"2024-03-07",description:"<i>8-bit training montage anyone?</i>"},{filename:"08_2024-05-02_TimeMachine.flac",title:"Time Machine",date:"2024-05-02",description:"<i>Whether it goes forwards or backwards in time, no one knows...</i>"},{filename:"09_2024-05-07_SleepyEP.flac",title:"Sleepy EP",date:"2024-05-07",description:"<i>yawn</i>"},{filename:"10_2024-05-07_DeepEP.flac",title:"Deep EP",date:"2024-05-07",description:"<i>The piano was in the basement for so long it forgot how to play high notes</i>"},{filename:"11_2024-05-07_WobblyEP.flac",title:"Wobbly EP",date:"2024-05-07",description:"<i>The keys were just a blur</i>"},{filename:"12_2024-05-07_AnotherEP.flac",title:"Another EP",date:"2024-05-07",description:"<i>One more couldn't hurt</i>"},{filename:"13_2024-03-24_EchoEchoEcho.flac",title:"Echo Echo Echo",date:"2024-03-24",description:"<i>Enter the echoic chamber</i>"},{filename:"14_2024-03-24_Spontaneity.flac",title:"Spontaneity",date:"2024-03-24",description:"<i>Sometimes you need to have fun to change things up.</i>"},{filename:"15_2024-03-24_ElectricRaindrops.flac",title:"Electric Raindrops",date:"2024-03-24",description:"<i>pitter patter zap</i>"}],play_style:"advance"},nu={id:"rewind-and-ffwd",title:"REW/FFWD",release_date:"2024-07-15",sort_key:"2024-07-15:02",description:`
        <p>
            My latest experiment with music mixes old and modern tech.
            I got a small cassette recorder to try making a low-fi album.
            Magnetic tape has unique sonic qualities that I wanted to capture.
        </p>
        <p>
            Over the course of about a month and a half, I recorded synth
            jams to a cassette tape. Once filled, I digitized the tape
            and edited it down to the best improvisations.
        </p>
        <p>
            I tried to keep my edits minimal to retain the low-fi vibe. I
            mostly normalized the volume level. However, there were a few
            places where noise reduction was helpful in making sure the
            melody is audible.
        </p>
    `,tracks:[{filename:"01_2024-05-10_LeakyPipes.flac",title:"Leaky Pipes",date:"2024-05-10",description:"This was an experiment with driving the tape pretty hard so it distorts. Tape saturation has different characteristics than when digital audio clips."},{filename:"02_2024-05-10_SaturatedSines.flac",title:"Saturated Sines",date:"2024-05-10",description:'Again, I drove the audio hard to get that tape saturation sound. The sound is harsh, but a very unique texture. While editing, I realized that this sound reminds me of <a href="https://youtu.be/KkiJWsV-eDI">Desparately Safe</a> from the 2008 indie game OFF</a>.'},{filename:"03_2024-05-10_StringlikePlucks.flac",title:"Stringlike Plucks",date:"2024-05-10",description:'For some reason this track reminds me of <a href="https://en.wikipedia.org/wiki/Switched-On_Bach">Switched-on Bach</a> and other works by Wendy Carlos.'},{filename:"04_2024-05-16_SpaceBass.flac",title:"Space Bass",date:"2024-05-16",description:"This is a Korg Monologue... I think fed through a delay pedal? I don't quite remember. "},{filename:"05_2024-05-16_Quindicesima.flac",title:"Quindicesima",date:"2024-05-16",description:'Italian for "fifteenth." In sheet music, 15ma means play the music two octaves (a perfect 15th) above what is written. This is a fancy way of saying that I took the synth patch from the previous track and bumped it up 2 octaves.'},{filename:"06_2024-05-18_HauntedTownOfPurple.flac",title:"Haunted Town of Purple",date:"2024-05-18",description:'The percussion of an organ emulator I have reminds me a lot of a <a href="https://youtu.be/JNJJ-QkZ8cM">certain spooky tune</a> from a Pokémon game.'},{filename:"07_2024-05-18_FamiliarHaunts.flac",title:"Familiar Haunts",date:"2024-05-18",description:'Years ago I tried to learn the spooky tune <a href="https://youtu.be/MjkkKPqikdo">Dancing Calbrena</a> from Final Fantasy IV, but ended up making this hypnotic chord progression. But this is the first time I actually recorded it.'},{filename:"08_2024-06-07_RingMod.flac",title:"Ring Mod",date:"2024-06-07",description:"After studying the math of ring modulation and amplitude modulation, I realized that integer pitch ratios produce the most coherent results. This was my first experiment with that."},{filename:"09_2024-06-27_EWIRevisited.flac",title:"EWI Revisited",date:"2024-06-27",description:"I was organizing my things and found my electronic wind instrument (EWI). And somehow I found renewed joy for it. It lets me control my synths with a woodwind-like interface."},{filename:"10_2024-06-29_EWILead.flac",title:"EWI Lead",date:"2024-06-29",description:"I made a nicer lead synth patch to use with my EWI."},{filename:"11_2024-06-27_BluesyEWI.flac",title:"Bluesy EWI",date:"2024-06-27",description:"Here I'm using the chords mode of my MiniFreak, configured to a blues scale. I then controled the melody with my EWI."},{filename:"12_2024-06-28_ElectricLayers.flac",title:"Electric Layers",date:"2024-06-28",description:"This is a combination of an electric piano emulator layered with a synth connected via MIDI."},{filename:"13_2024-06-28_WurliArpeggiated.flac",title:"Wurli Arpeggiated",date:"2024-06-28",description:"After making the previous track, I realized that driving the wurli with the synth's arpeggiator I could make more intricate melodies."},{filename:"14_2024-06-29_HVACWhileAway.flac",title:"HVAC While Away",date:"2024-06-29",description:"<i>Oh the sounds that will play when the humans are away...</i>"},{filename:"15_2024-06-30_FourSquare.flac",title:"Four Square",date:"2024-06-30",description:"Square waves tuned to perfect fourths. If this was in a video game, this feels like it would be a good match for a tranquil temple setting."},{filename:"16_2024-07-01_Locrian5ths.flac",title:"Locrian 5ths",date:"2024-07-01",description:"This was a fun experiment: I took a synth patch tuned to perfect fifths but played only notes from the B Locrian mode. Technically this produces notes outside of the mode, but I think it made it more musical. Locrian is more difficult to work with compared with the other modes."},{filename:"17_2024-07-01_SubOrgan.flac",title:"Sub Organ",date:"2024-07-01",description:"I find the tape saturation helps add to the low-fi organ vibe."}],play_style:"advance"},ou=[Yc,tu,eu,Zc,iu,nu],ru=ou.map(e=>new Xc(e)),su=ne("h1",{class:"centered"},"Featured Projects",-1),au={class:"tableau"},lu=ne("h1",{class:"centered"},"Featured Artworks",-1),cu={class:"tableau"},uu=it({__name:"HomeView",setup(e){function t(o){const r=o.filter(a=>a.featured).sort(Po),s=o.filter(a=>!a.featured).sort(Po);return[...r,...s].slice(0,5)}const i=ce(()=>{const o=qr.map(r=>r.thumbnail).filter(r=>!r.hide);return t(o)}),n=ce(()=>{const o=Uc.map(a=>a.thumbnail),r=ru.map(a=>a.thumbnail),s=[...o,...r].filter(a=>!a.hide);return t(s)});return(o,r)=>(be(),ft(ge,null,[su,ne("div",au,[(be(!0),ft(ge,null,zn(n.value,s=>(be(),dt(Co,{key:s.sort_key,card:s},null,8,["card"]))),128))]),lu,ne("div",cu,[(be(!0),ft(ge,null,zn(i.value,s=>(be(),dt(Co,{key:s.sort_key,card:s},null,8,["card"]))),128))])],64))}}),fu=gc({history:Ml(),routes:[{path:"/",name:"home",component:uu},{path:"/gallery",name:"gallery",component:()=>wt(()=>import("./GalleryView-DKj3gFh4.js"),[])},{path:"/artwork/:project_id/:artwork_id",name:"artwork",component:()=>wt(()=>import("./ArtworkView-CgwcvEzl.js"),[])},{path:"/projects",name:"projects",component:()=>wt(()=>import("./ProjectsView-D3GY3J_v.js"),[])},{path:"/project/:project_id",name:"project",component:()=>wt(()=>import("./ProjectView-CX85VlTA.js"),__vite__mapDeps([0,1]))},{path:"/album/:album_id",name:"album",component:()=>wt(()=>import("./MusicAlbumView-t5YCNQ3Q.js"),__vite__mapDeps([2,3]))},{path:"/library",name:"library",component:()=>wt(()=>import("./LibraryView-BixaL8Dw.js"),[])}]}),Kr=hl(Tc);Kr.use(fu);Kr.mount("#app");export{qr as A,ge as F,Uc as P,Co as _,ft as a,ne as b,ce as c,it as d,dt as e,oe as f,jc as g,xt as h,ut as i,ja as j,fr as k,ru as l,Pc as m,dn as n,be as o,Ac as p,gu as q,zn as r,Po as s,jn as t,mu as u,pu as v,hu as w,Cs as x,si as y};
