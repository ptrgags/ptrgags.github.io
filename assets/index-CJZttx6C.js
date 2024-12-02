const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ProjectView-K-1qbqPm.js","assets/ProjectView-CwBWAFR-.css","assets/MusicAlbumView-_evq75Ln.js","assets/MusicAlbumView-rz_HNcK6.css"])))=>i.map(i=>d[i]);
var Kr=Object.defineProperty;var $r=(e,t,i)=>t in e?Kr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var te=(e,t,i)=>$r(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function so(e,t){const i=new Set(e.split(","));return o=>i.has(o)}const Y={},vt=[],Ae=()=>{},Qr=()=>!1,bi=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),ao=e=>e.startsWith("onUpdate:"),ue=Object.assign,lo=(e,t)=>{const i=e.indexOf(t);i>-1&&e.splice(i,1)},Jr=Object.prototype.hasOwnProperty,D=(e,t)=>Jr.call(e,t),F=Array.isArray,It=e=>wi(e)==="[object Map]",On=e=>wi(e)==="[object Set]",W=e=>typeof e=="function",re=e=>typeof e=="string",Ot=e=>typeof e=="symbol",Z=e=>e!==null&&typeof e=="object",jn=e=>(Z(e)||W(e))&&W(e.then)&&W(e.catch),Mn=Object.prototype.toString,wi=e=>Mn.call(e),Yr=e=>wi(e).slice(8,-1),Bn=e=>wi(e)==="[object Object]",co=e=>re(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,ni=so(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ki=e=>{const t=Object.create(null);return i=>t[i]||(t[i]=e(i))},Xr=/-(\w)/g,Le=ki(e=>e.replace(Xr,(t,i)=>i?i.toUpperCase():"")),Zr=/\B([A-Z])/g,jt=ki(e=>e.replace(Zr,"-$1").toLowerCase()),vi=ki(e=>e.charAt(0).toUpperCase()+e.slice(1)),Mi=ki(e=>e?`on${vi(e)}`:""),et=(e,t)=>!Object.is(e,t),Bi=(e,t)=>{for(let i=0;i<e.length;i++)e[i](t)},di=(e,t,i)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:i})},es=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Oo;const Fn=()=>Oo||(Oo=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function uo(e){if(F(e)){const t={};for(let i=0;i<e.length;i++){const o=e[i],n=re(o)?ns(o):uo(o);if(n)for(const r in n)t[r]=n[r]}return t}else if(re(e)||Z(e))return e}const ts=/;(?![^(]*\))/g,is=/:([^]+)/,os=/\/\*[^]*?\*\//g;function ns(e){const t={};return e.replace(os,"").split(ts).forEach(i=>{if(i){const o=i.split(is);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function ho(e){let t="";if(re(e))t=e;else if(F(e))for(let i=0;i<e.length;i++){const o=ho(e[i]);o&&(t+=o+" ")}else if(Z(e))for(const i in e)e[i]&&(t+=i+" ");return t.trim()}const rs="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",ss=so(rs);function Hn(e){return!!e||e===""}const jo=e=>re(e)?e:e==null?"":F(e)||Z(e)&&(e.toString===Mn||!W(e.toString))?JSON.stringify(e,Wn,2):String(e),Wn=(e,t)=>t&&t.__v_isRef?Wn(e,t.value):It(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((i,[o,n],r)=>(i[Fi(o,r)+" =>"]=n,i),{})}:On(t)?{[`Set(${t.size})`]:[...t.values()].map(i=>Fi(i))}:Ot(t)?Fi(t):Z(t)&&!F(t)&&!Bn(t)?String(t):t,Fi=(e,t="")=>{var i;return Ot(e)?`Symbol(${(i=e.description)!=null?i:t})`:e};/**
* @vue/reactivity v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Te;class as{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Te,!t&&Te&&(this.index=(Te.scopes||(Te.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const i=Te;try{return Te=this,t()}finally{Te=i}}}on(){Te=this}off(){Te=this.parent}stop(t){if(this._active){let i,o;for(i=0,o=this.effects.length;i<o;i++)this.effects[i].stop();for(i=0,o=this.cleanups.length;i<o;i++)this.cleanups[i]();if(this.scopes)for(i=0,o=this.scopes.length;i<o;i++)this.scopes[i].stop(!0);if(!this.detached&&this.parent&&!t){const n=this.parent.scopes.pop();n&&n!==this&&(this.parent.scopes[this.index]=n,n.index=this.index)}this.parent=void 0,this._active=!1}}}function ls(e,t=Te){t&&t.active&&t.effects.push(e)}function cs(){return Te}let lt;class fo{constructor(t,i,o,n){this.fn=t,this.trigger=i,this.scheduler=o,this.active=!0,this.deps=[],this._dirtyLevel=2,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,ls(this,n)}get dirty(){if(this._dirtyLevel===1){ft();for(let t=0;t<this._depsLength;t++){const i=this.deps[t];if(i.computed&&(us(i.computed),this._dirtyLevel>=2))break}this._dirtyLevel<2&&(this._dirtyLevel=0),pt()}return this._dirtyLevel>=2}set dirty(t){this._dirtyLevel=t?2:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=Xe,i=lt;try{return Xe=!0,lt=this,this._runnings++,Mo(this),this.fn()}finally{Bo(this),this._runnings--,lt=i,Xe=t}}stop(){var t;this.active&&(Mo(this),Bo(this),(t=this.onStop)==null||t.call(this),this.active=!1)}}function us(e){return e.value}function Mo(e){e._trackId++,e._depsLength=0}function Bo(e){if(e.deps&&e.deps.length>e._depsLength){for(let t=e._depsLength;t<e.deps.length;t++)Ln(e.deps[t],e);e.deps.length=e._depsLength}}function Ln(e,t){const i=e.get(t);i!==void 0&&t._trackId!==i&&(e.delete(t),e.size===0&&e.cleanup())}let Xe=!0,qi=0;const Nn=[];function ft(){Nn.push(Xe),Xe=!1}function pt(){const e=Nn.pop();Xe=e===void 0?!0:e}function po(){qi++}function mo(){for(qi--;!qi&&Gi.length;)Gi.shift()()}function Vn(e,t,i){if(t.get(e)!==e._trackId){t.set(e,e._trackId);const o=e.deps[e._depsLength];o!==t?(o&&Ln(o,e),e.deps[e._depsLength++]=t):e._depsLength++}}const Gi=[];function Dn(e,t,i){po();for(const o of e.keys())if(o._dirtyLevel<t&&e.get(o)===o._trackId){const n=o._dirtyLevel;o._dirtyLevel=t,n===0&&(o._shouldSchedule=!0,o.trigger())}Un(e),mo()}function Un(e){for(const t of e.keys())t.scheduler&&t._shouldSchedule&&(!t._runnings||t.allowRecurse)&&e.get(t)===t._trackId&&(t._shouldSchedule=!1,Gi.push(t.scheduler))}const zn=(e,t)=>{const i=new Map;return i.cleanup=e,i.computed=t,i},Ki=new WeakMap,ct=Symbol(""),$i=Symbol("");function we(e,t,i){if(Xe&&lt){let o=Ki.get(e);o||Ki.set(e,o=new Map);let n=o.get(i);n||o.set(i,n=zn(()=>o.delete(i))),Vn(lt,n)}}function De(e,t,i,o,n,r){const s=Ki.get(e);if(!s)return;let a=[];if(t==="clear")a=[...s.values()];else if(i==="length"&&F(e)){const l=Number(o);s.forEach((h,d)=>{(d==="length"||!Ot(d)&&d>=l)&&a.push(h)})}else switch(i!==void 0&&a.push(s.get(i)),t){case"add":F(e)?co(i)&&a.push(s.get("length")):(a.push(s.get(ct)),It(e)&&a.push(s.get($i)));break;case"delete":F(e)||(a.push(s.get(ct)),It(e)&&a.push(s.get($i)));break;case"set":It(e)&&a.push(s.get(ct));break}po();for(const l of a)l&&Dn(l,2);mo()}const ds=so("__proto__,__v_isRef,__isVue"),qn=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Ot)),Fo=hs();function hs(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...i){const o=z(this);for(let r=0,s=this.length;r<s;r++)we(o,"get",r+"");const n=o[t](...i);return n===-1||n===!1?o[t](...i.map(z)):n}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...i){ft(),po();const o=z(this)[t].apply(this,i);return mo(),pt(),o}}),e}function fs(e){const t=z(this);return we(t,"has",e),t.hasOwnProperty(e)}class Gn{constructor(t=!1,i=!1){this._isReadonly=t,this._shallow=i}get(t,i,o){const n=this._isReadonly,r=this._shallow;if(i==="__v_isReactive")return!n;if(i==="__v_isReadonly")return n;if(i==="__v_isShallow")return r;if(i==="__v_raw")return o===(n?r?Ts:Jn:r?Qn:$n).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(o)?t:void 0;const s=F(t);if(!n){if(s&&D(Fo,i))return Reflect.get(Fo,i,o);if(i==="hasOwnProperty")return fs}const a=Reflect.get(t,i,o);return(Ot(i)?qn.has(i):ds(i))||(n||we(t,"get",i),r)?a:ke(a)?s&&co(i)?a:a.value:Z(a)?n?Xn(a):Ai(a):a}}class Kn extends Gn{constructor(t=!1){super(!1,t)}set(t,i,o,n){let r=t[i];if(!this._shallow){const l=Tt(r);if(!hi(o)&&!Tt(o)&&(r=z(r),o=z(o)),!F(t)&&ke(r)&&!ke(o))return l?!1:(r.value=o,!0)}const s=F(t)&&co(i)?Number(i)<t.length:D(t,i),a=Reflect.set(t,i,o,n);return t===z(n)&&(s?et(o,r)&&De(t,"set",i,o):De(t,"add",i,o)),a}deleteProperty(t,i){const o=D(t,i);t[i];const n=Reflect.deleteProperty(t,i);return n&&o&&De(t,"delete",i,void 0),n}has(t,i){const o=Reflect.has(t,i);return(!Ot(i)||!qn.has(i))&&we(t,"has",i),o}ownKeys(t){return we(t,"iterate",F(t)?"length":ct),Reflect.ownKeys(t)}}class ps extends Gn{constructor(t=!1){super(!0,t)}set(t,i){return!0}deleteProperty(t,i){return!0}}const ms=new Kn,gs=new ps,ys=new Kn(!0),go=e=>e,Ii=e=>Reflect.getPrototypeOf(e);function Xt(e,t,i=!1,o=!1){e=e.__v_raw;const n=z(e),r=z(t);i||(et(t,r)&&we(n,"get",t),we(n,"get",r));const{has:s}=Ii(n),a=o?go:i?bo:qt;if(s.call(n,t))return a(e.get(t));if(s.call(n,r))return a(e.get(r));e!==n&&e.get(t)}function Zt(e,t=!1){const i=this.__v_raw,o=z(i),n=z(e);return t||(et(e,n)&&we(o,"has",e),we(o,"has",n)),e===n?i.has(e):i.has(e)||i.has(n)}function ei(e,t=!1){return e=e.__v_raw,!t&&we(z(e),"iterate",ct),Reflect.get(e,"size",e)}function Ho(e){e=z(e);const t=z(this);return Ii(t).has.call(t,e)||(t.add(e),De(t,"add",e,e)),this}function Wo(e,t){t=z(t);const i=z(this),{has:o,get:n}=Ii(i);let r=o.call(i,e);r||(e=z(e),r=o.call(i,e));const s=n.call(i,e);return i.set(e,t),r?et(t,s)&&De(i,"set",e,t):De(i,"add",e,t),this}function Lo(e){const t=z(this),{has:i,get:o}=Ii(t);let n=i.call(t,e);n||(e=z(e),n=i.call(t,e)),o&&o.call(t,e);const r=t.delete(e);return n&&De(t,"delete",e,void 0),r}function No(){const e=z(this),t=e.size!==0,i=e.clear();return t&&De(e,"clear",void 0,void 0),i}function ti(e,t){return function(o,n){const r=this,s=r.__v_raw,a=z(s),l=t?go:e?bo:qt;return!e&&we(a,"iterate",ct),s.forEach((h,d)=>o.call(n,l(h),l(d),r))}}function ii(e,t,i){return function(...o){const n=this.__v_raw,r=z(n),s=It(r),a=e==="entries"||e===Symbol.iterator&&s,l=e==="keys"&&s,h=n[e](...o),d=i?go:t?bo:qt;return!t&&we(r,"iterate",l?$i:ct),{next(){const{value:f,done:m}=h.next();return m?{value:f,done:m}:{value:a?[d(f[0]),d(f[1])]:d(f),done:m}},[Symbol.iterator](){return this}}}}function Ge(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function _s(){const e={get(r){return Xt(this,r)},get size(){return ei(this)},has:Zt,add:Ho,set:Wo,delete:Lo,clear:No,forEach:ti(!1,!1)},t={get(r){return Xt(this,r,!1,!0)},get size(){return ei(this)},has:Zt,add:Ho,set:Wo,delete:Lo,clear:No,forEach:ti(!1,!0)},i={get(r){return Xt(this,r,!0)},get size(){return ei(this,!0)},has(r){return Zt.call(this,r,!0)},add:Ge("add"),set:Ge("set"),delete:Ge("delete"),clear:Ge("clear"),forEach:ti(!0,!1)},o={get(r){return Xt(this,r,!0,!0)},get size(){return ei(this,!0)},has(r){return Zt.call(this,r,!0)},add:Ge("add"),set:Ge("set"),delete:Ge("delete"),clear:Ge("clear"),forEach:ti(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{e[r]=ii(r,!1,!1),i[r]=ii(r,!0,!1),t[r]=ii(r,!1,!0),o[r]=ii(r,!0,!0)}),[e,i,t,o]}const[bs,ws,ks,vs]=_s();function yo(e,t){const i=t?e?vs:ks:e?ws:bs;return(o,n,r)=>n==="__v_isReactive"?!e:n==="__v_isReadonly"?e:n==="__v_raw"?o:Reflect.get(D(i,n)&&n in o?i:o,n,r)}const Is={get:yo(!1,!1)},As={get:yo(!1,!0)},Ss={get:yo(!0,!1)},$n=new WeakMap,Qn=new WeakMap,Jn=new WeakMap,Ts=new WeakMap;function xs(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Es(e){return e.__v_skip||!Object.isExtensible(e)?0:xs(Yr(e))}function Ai(e){return Tt(e)?e:_o(e,!1,ms,Is,$n)}function Yn(e){return _o(e,!1,ys,As,Qn)}function Xn(e){return _o(e,!0,gs,Ss,Jn)}function _o(e,t,i,o,n){if(!Z(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const r=n.get(e);if(r)return r;const s=Es(e);if(s===0)return e;const a=new Proxy(e,s===2?o:i);return n.set(e,a),a}function At(e){return Tt(e)?At(e.__v_raw):!!(e&&e.__v_isReactive)}function Tt(e){return!!(e&&e.__v_isReadonly)}function hi(e){return!!(e&&e.__v_isShallow)}function Zn(e){return At(e)||Tt(e)}function z(e){const t=e&&e.__v_raw;return t?z(t):e}function er(e){return di(e,"__v_skip",!0),e}const qt=e=>Z(e)?Ai(e):e,bo=e=>Z(e)?Xn(e):e;class tr{constructor(t,i,o,n){this._setter=i,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new fo(()=>t(this._value),()=>ri(this,1),()=>this.dep&&Un(this.dep)),this.effect.computed=this,this.effect.active=this._cacheable=!n,this.__v_isReadonly=o}get value(){const t=z(this);return(!t._cacheable||t.effect.dirty)&&et(t._value,t._value=t.effect.run())&&ri(t,2),ir(t),t.effect._dirtyLevel>=1&&ri(t,1),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function Cs(e,t,i=!1){let o,n;const r=W(e);return r?(o=e,n=Ae):(o=e.get,n=e.set),new tr(o,n,r||!n,i)}function ir(e){Xe&&lt&&(e=z(e),Vn(lt,e.dep||(e.dep=zn(()=>e.dep=void 0,e instanceof tr?e:void 0))))}function ri(e,t=2,i){e=z(e);const o=e.dep;o&&Dn(o,t)}function ke(e){return!!(e&&e.__v_isRef===!0)}function Rs(e){return or(e,!1)}function Ps(e){return or(e,!0)}function or(e,t){return ke(e)?e:new Os(e,t)}class Os{constructor(t,i){this.__v_isShallow=i,this.dep=void 0,this.__v_isRef=!0,this._rawValue=i?t:z(t),this._value=i?t:qt(t)}get value(){return ir(this),this._value}set value(t){const i=this.__v_isShallow||hi(t)||Tt(t);t=i?t:z(t),et(t,this._rawValue)&&(this._rawValue=t,this._value=i?t:qt(t),ri(this,2))}}function He(e){return ke(e)?e.value:e}const js={get:(e,t,i)=>He(Reflect.get(e,t,i)),set:(e,t,i,o)=>{const n=e[t];return ke(n)&&!ke(i)?(n.value=i,!0):Reflect.set(e,t,i,o)}};function nr(e){return At(e)?e:new Proxy(e,js)}/**
* @vue/runtime-core v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ze(e,t,i,o){let n;try{n=o?e(...o):e()}catch(r){Si(r,t,i)}return n}function Ee(e,t,i,o){if(W(e)){const r=Ze(e,t,i,o);return r&&jn(r)&&r.catch(s=>{Si(s,t,i)}),r}const n=[];for(let r=0;r<e.length;r++)n.push(Ee(e[r],t,i,o));return n}function Si(e,t,i,o=!0){const n=t?t.vnode:null;if(t){let r=t.parent;const s=t.proxy,a=`https://vuejs.org/error-reference/#runtime-${i}`;for(;r;){const h=r.ec;if(h){for(let d=0;d<h.length;d++)if(h[d](e,s,a)===!1)return}r=r.parent}const l=t.appContext.config.errorHandler;if(l){Ze(l,null,10,[e,s,a]);return}}Ms(e,i,n,o)}function Ms(e,t,i,o=!0){console.error(e)}let Gt=!1,Qi=!1;const he=[];let Fe=0;const St=[];let $e=null,st=0;const rr=Promise.resolve();let wo=null;function sr(e){const t=wo||rr;return e?t.then(this?e.bind(this):e):t}function Bs(e){let t=Fe+1,i=he.length;for(;t<i;){const o=t+i>>>1,n=he[o],r=Kt(n);r<e||r===e&&n.pre?t=o+1:i=o}return t}function ko(e){(!he.length||!he.includes(e,Gt&&e.allowRecurse?Fe+1:Fe))&&(e.id==null?he.push(e):he.splice(Bs(e.id),0,e),ar())}function ar(){!Gt&&!Qi&&(Qi=!0,wo=rr.then(cr))}function Fs(e){const t=he.indexOf(e);t>Fe&&he.splice(t,1)}function Hs(e){F(e)?St.push(...e):(!$e||!$e.includes(e,e.allowRecurse?st+1:st))&&St.push(e),ar()}function Vo(e,t,i=Gt?Fe+1:0){for(;i<he.length;i++){const o=he[i];if(o&&o.pre){if(e&&o.id!==e.uid)continue;he.splice(i,1),i--,o()}}}function lr(e){if(St.length){const t=[...new Set(St)].sort((i,o)=>Kt(i)-Kt(o));if(St.length=0,$e){$e.push(...t);return}for($e=t,st=0;st<$e.length;st++)$e[st]();$e=null,st=0}}const Kt=e=>e.id==null?1/0:e.id,Ws=(e,t)=>{const i=Kt(e)-Kt(t);if(i===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return i};function cr(e){Qi=!1,Gt=!0,he.sort(Ws);try{for(Fe=0;Fe<he.length;Fe++){const t=he[Fe];t&&t.active!==!1&&Ze(t,null,14)}}finally{Fe=0,he.length=0,lr(),Gt=!1,wo=null,(he.length||St.length)&&cr()}}function Ls(e,t,...i){if(e.isUnmounted)return;const o=e.vnode.props||Y;let n=i;const r=t.startsWith("update:"),s=r&&t.slice(7);if(s&&s in o){const d=`${s==="modelValue"?"model":s}Modifiers`,{number:f,trim:m}=o[d]||Y;m&&(n=i.map(b=>re(b)?b.trim():b)),f&&(n=i.map(es))}let a,l=o[a=Mi(t)]||o[a=Mi(Le(t))];!l&&r&&(l=o[a=Mi(jt(t))]),l&&Ee(l,e,6,n);const h=o[a+"Once"];if(h){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,Ee(h,e,6,n)}}function ur(e,t,i=!1){const o=t.emitsCache,n=o.get(e);if(n!==void 0)return n;const r=e.emits;let s={},a=!1;if(!W(e)){const l=h=>{const d=ur(h,t,!0);d&&(a=!0,ue(s,d))};!i&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!r&&!a?(Z(e)&&o.set(e,null),null):(F(r)?r.forEach(l=>s[l]=null):ue(s,r),Z(e)&&o.set(e,s),s)}function Ti(e,t){return!e||!bi(t)?!1:(t=t.slice(2).replace(/Once$/,""),D(e,t[0].toLowerCase()+t.slice(1))||D(e,jt(t))||D(e,t))}let le=null,xi=null;function fi(e){const t=le;return le=e,xi=e&&e.type.__scopeId||null,t}function Ns(e){xi=e}function Vs(){xi=null}function ut(e,t=le,i){if(!t||e._n)return e;const o=(...n)=>{o._d&&en(-1);const r=fi(t);let s;try{s=e(...n)}finally{fi(r),o._d&&en(1)}return s};return o._n=!0,o._c=!0,o._d=!0,o}function Hi(e){const{type:t,vnode:i,proxy:o,withProxy:n,props:r,propsOptions:[s],slots:a,attrs:l,emit:h,render:d,renderCache:f,data:m,setupState:b,ctx:E,inheritAttrs:j}=e;let M,R;const H=fi(e);try{if(i.shapeFlag&4){const q=n||o,oe=q;M=Be(d.call(oe,q,f,r,b,m,E)),R=l}else{const q=t;M=Be(q.length>1?q(r,{attrs:l,slots:a,emit:h}):q(r,null)),R=t.props?l:Ds(l)}}catch(q){Dt.length=0,Si(q,e,1),M=ie(tt)}let L=M;if(R&&j!==!1){const q=Object.keys(R),{shapeFlag:oe}=L;q.length&&oe&7&&(s&&q.some(ao)&&(R=Us(R,s)),L=xt(L,R))}return i.dirs&&(L=xt(L),L.dirs=L.dirs?L.dirs.concat(i.dirs):i.dirs),i.transition&&(L.transition=i.transition),M=L,fi(H),M}const Ds=e=>{let t;for(const i in e)(i==="class"||i==="style"||bi(i))&&((t||(t={}))[i]=e[i]);return t},Us=(e,t)=>{const i={};for(const o in e)(!ao(o)||!(o.slice(9)in t))&&(i[o]=e[o]);return i};function zs(e,t,i){const{props:o,children:n,component:r}=e,{props:s,children:a,patchFlag:l}=t,h=r.emitsOptions;if(t.dirs||t.transition)return!0;if(i&&l>=0){if(l&1024)return!0;if(l&16)return o?Do(o,s,h):!!s;if(l&8){const d=t.dynamicProps;for(let f=0;f<d.length;f++){const m=d[f];if(s[m]!==o[m]&&!Ti(h,m))return!0}}}else return(n||a)&&(!a||!a.$stable)?!0:o===s?!1:o?s?Do(o,s,h):!0:!!s;return!1}function Do(e,t,i){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let n=0;n<o.length;n++){const r=o[n];if(t[r]!==e[r]&&!Ti(i,r))return!0}return!1}function qs({vnode:e,parent:t},i){for(;t;){const o=t.subTree;if(o.suspense&&o.suspense.activeBranch===e&&(o.el=e.el),o===e)(e=t.vnode).el=i,t=t.parent;else break}}const Gs="components";function dr(e,t){return $s(Gs,e,!0,t)||e}const Ks=Symbol.for("v-ndc");function $s(e,t,i=!0,o=!1){const n=le||fe;if(n){const r=n.type;{const a=Da(r,!1);if(a&&(a===t||a===Le(t)||a===vi(Le(t))))return r}const s=Uo(n[e]||r[e],t)||Uo(n.appContext[e],t);return!s&&o?r:s}}function Uo(e,t){return e&&(e[t]||e[Le(t)]||e[vi(Le(t))])}const Qs=e=>e.__isSuspense;function Js(e,t){t&&t.pendingBranch?F(e)?t.effects.push(...e):t.effects.push(e):Hs(e)}const Ys=Symbol.for("v-scx"),Xs=()=>We(Ys),oi={};function si(e,t,i){return hr(e,t,i)}function hr(e,t,{immediate:i,deep:o,flush:n,once:r,onTrack:s,onTrigger:a}=Y){if(t&&r){const N=t;t=(...pe)=>{N(...pe),oe()}}const l=fe,h=N=>o===!0?N:at(N,o===!1?1:void 0);let d,f=!1,m=!1;if(ke(e)?(d=()=>e.value,f=hi(e)):At(e)?(d=()=>h(e),f=!0):F(e)?(m=!0,f=e.some(N=>At(N)||hi(N)),d=()=>e.map(N=>{if(ke(N))return N.value;if(At(N))return h(N);if(W(N))return Ze(N,l,2)})):W(e)?t?d=()=>Ze(e,l,2):d=()=>(b&&b(),Ee(e,l,3,[E])):d=Ae,t&&o){const N=d;d=()=>at(N())}let b,E=N=>{b=L.onStop=()=>{Ze(N,l,4),b=L.onStop=void 0}},j;if(Pi)if(E=Ae,t?i&&Ee(t,l,3,[d(),m?[]:void 0,E]):d(),n==="sync"){const N=Xs();j=N.__watcherHandles||(N.__watcherHandles=[])}else return Ae;let M=m?new Array(e.length).fill(oi):oi;const R=()=>{if(!(!L.active||!L.dirty))if(t){const N=L.run();(o||f||(m?N.some((pe,Ie)=>et(pe,M[Ie])):et(N,M)))&&(b&&b(),Ee(t,l,3,[N,M===oi?void 0:m&&M[0]===oi?[]:M,E]),M=N)}else L.run()};R.allowRecurse=!!t;let H;n==="sync"?H=R:n==="post"?H=()=>_e(R,l&&l.suspense):(R.pre=!0,l&&(R.id=l.uid),H=()=>ko(R));const L=new fo(d,Ae,H),q=cs(),oe=()=>{L.stop(),q&&lo(q.effects,L)};return t?i?R():M=L.run():n==="post"?_e(L.run.bind(L),l&&l.suspense):L.run(),j&&j.push(oe),oe}function Zs(e,t,i){const o=this.proxy,n=re(e)?e.includes(".")?fr(o,e):()=>o[e]:e.bind(o,o);let r;W(t)?r=t:(r=t.handler,i=t);const s=Jt(this),a=hr(n,r.bind(o),i);return s(),a}function fr(e,t){const i=t.split(".");return()=>{let o=e;for(let n=0;n<i.length&&o;n++)o=o[i[n]];return o}}function at(e,t,i=0,o){if(!Z(e)||e.__v_skip)return e;if(t&&t>0){if(i>=t)return e;i++}if(o=o||new Set,o.has(e))return e;if(o.add(e),ke(e))at(e.value,t,i,o);else if(F(e))for(let n=0;n<e.length;n++)at(e[n],t,i,o);else if(On(e)||It(e))e.forEach(n=>{at(n,t,i,o)});else if(Bn(e))for(const n in e)at(e[n],t,i,o);return e}function _u(e,t){if(le===null)return e;const i=Oi(le)||le.proxy,o=e.dirs||(e.dirs=[]);for(let n=0;n<t.length;n++){let[r,s,a,l=Y]=t[n];r&&(W(r)&&(r={mounted:r,updated:r}),r.deep&&at(s),o.push({dir:r,instance:i,value:s,oldValue:void 0,arg:a,modifiers:l}))}return e}function nt(e,t,i,o){const n=e.dirs,r=t&&t.dirs;for(let s=0;s<n.length;s++){const a=n[s];r&&(a.oldValue=r[s].value);let l=a.dir[o];l&&(ft(),Ee(l,i,8,[e.el,a,e,t]),pt())}}/*! #__NO_SIDE_EFFECTS__ */function it(e,t){return W(e)?ue({name:e.name},t,{setup:e}):e}const Nt=e=>!!e.type.__asyncLoader,pr=e=>e.type.__isKeepAlive;function ea(e,t){mr(e,"a",t)}function ta(e,t){mr(e,"da",t)}function mr(e,t,i=fe){const o=e.__wdc||(e.__wdc=()=>{let n=i;for(;n;){if(n.isDeactivated)return;n=n.parent}return e()});if(Ei(t,o,i),i){let n=i.parent;for(;n&&n.parent;)pr(n.parent.vnode)&&ia(o,t,i,n),n=n.parent}}function ia(e,t,i,o){const n=Ei(t,e,o,!0);gr(()=>{lo(o[t],n)},i)}function Ei(e,t,i=fe,o=!1){if(i){const n=i[e]||(i[e]=[]),r=t.__weh||(t.__weh=(...s)=>{if(i.isUnmounted)return;ft();const a=Jt(i),l=Ee(t,i,e,s);return a(),pt(),l});return o?n.unshift(r):n.push(r),r}}const Ue=e=>(t,i=fe)=>(!Pi||e==="sp")&&Ei(e,(...o)=>t(...o),i),oa=Ue("bm"),na=Ue("m"),ra=Ue("bu"),sa=Ue("u"),aa=Ue("bum"),gr=Ue("um"),la=Ue("sp"),ca=Ue("rtg"),ua=Ue("rtc");function da(e,t=fe){Ei("ec",e,t)}function zo(e,t,i,o){let n;const r=i;if(F(e)||re(e)){n=new Array(e.length);for(let s=0,a=e.length;s<a;s++)n[s]=t(e[s],s,void 0,r)}else if(typeof e=="number"){n=new Array(e);for(let s=0;s<e;s++)n[s]=t(s+1,s,void 0,r)}else if(Z(e))if(e[Symbol.iterator])n=Array.from(e,(s,a)=>t(s,a,void 0,r));else{const s=Object.keys(e);n=new Array(s.length);for(let a=0,l=s.length;a<l;a++){const h=s[a];n[a]=t(e[h],h,a,r)}}else n=[];return n}function qo(e,t,i={},o,n){if(le.isCE||le.parent&&Nt(le.parent)&&le.parent.isCE)return ie("slot",i,o);let r=e[t];r&&r._c&&(r._d=!1),be();const s=r&&yr(r(i)),a=ht(ge,{key:i.key||s&&s.key||`_${t}`},s||[],s&&e._===1?64:-2);return a.scopeId&&(a.slotScopeIds=[a.scopeId+"-s"]),r&&r._c&&(r._d=!0),a}function yr(e){return e.some(t=>gi(t)?!(t.type===tt||t.type===ge&&!yr(t.children)):!0)?e:null}const Ji=e=>e?Cr(e)?Oi(e)||e.proxy:Ji(e.parent):null,Vt=ue(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ji(e.parent),$root:e=>Ji(e.root),$emit:e=>e.emit,$options:e=>vo(e),$forceUpdate:e=>e.f||(e.f=()=>{e.effect.dirty=!0,ko(e.update)}),$nextTick:e=>e.n||(e.n=sr.bind(e.proxy)),$watch:e=>Zs.bind(e)}),Wi=(e,t)=>e!==Y&&!e.__isScriptSetup&&D(e,t),ha={get({_:e},t){const{ctx:i,setupState:o,data:n,props:r,accessCache:s,type:a,appContext:l}=e;let h;if(t[0]!=="$"){const b=s[t];if(b!==void 0)switch(b){case 1:return o[t];case 2:return n[t];case 4:return i[t];case 3:return r[t]}else{if(Wi(o,t))return s[t]=1,o[t];if(n!==Y&&D(n,t))return s[t]=2,n[t];if((h=e.propsOptions[0])&&D(h,t))return s[t]=3,r[t];if(i!==Y&&D(i,t))return s[t]=4,i[t];Yi&&(s[t]=0)}}const d=Vt[t];let f,m;if(d)return t==="$attrs"&&we(e,"get",t),d(e);if((f=a.__cssModules)&&(f=f[t]))return f;if(i!==Y&&D(i,t))return s[t]=4,i[t];if(m=l.config.globalProperties,D(m,t))return m[t]},set({_:e},t,i){const{data:o,setupState:n,ctx:r}=e;return Wi(n,t)?(n[t]=i,!0):o!==Y&&D(o,t)?(o[t]=i,!0):D(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(r[t]=i,!0)},has({_:{data:e,setupState:t,accessCache:i,ctx:o,appContext:n,propsOptions:r}},s){let a;return!!i[s]||e!==Y&&D(e,s)||Wi(t,s)||(a=r[0])&&D(a,s)||D(o,s)||D(Vt,s)||D(n.config.globalProperties,s)},defineProperty(e,t,i){return i.get!=null?e._.accessCache[t]=0:D(i,"value")&&this.set(e,t,i.value,null),Reflect.defineProperty(e,t,i)}};function Go(e){return F(e)?e.reduce((t,i)=>(t[i]=null,t),{}):e}let Yi=!0;function fa(e){const t=vo(e),i=e.proxy,o=e.ctx;Yi=!1,t.beforeCreate&&Ko(t.beforeCreate,e,"bc");const{data:n,computed:r,methods:s,watch:a,provide:l,inject:h,created:d,beforeMount:f,mounted:m,beforeUpdate:b,updated:E,activated:j,deactivated:M,beforeDestroy:R,beforeUnmount:H,destroyed:L,unmounted:q,render:oe,renderTracked:N,renderTriggered:pe,errorCaptured:Ie,serverPrefetch:mt,expose:Re,inheritAttrs:ze,components:ot,directives:Pe,filters:Mt}=t;if(h&&pa(h,o,null),s)for(const Q in s){const G=s[Q];W(G)&&(o[Q]=G.bind(i))}if(n){const Q=n.call(i,i);Z(Q)&&(e.data=Ai(Q))}if(Yi=!0,r)for(const Q in r){const G=r[Q],Ne=W(G)?G.bind(i,i):W(G.get)?G.get.bind(i,i):Ae,qe=!W(G)&&W(G.set)?G.set.bind(i):Ae,Oe=ce({get:Ne,set:qe});Object.defineProperty(o,Q,{enumerable:!0,configurable:!0,get:()=>Oe.value,set:ye=>Oe.value=ye})}if(a)for(const Q in a)_r(a[Q],o,i,Q);if(l){const Q=W(l)?l.call(i):l;Reflect.ownKeys(Q).forEach(G=>{ai(G,Q[G])})}d&&Ko(d,e,"c");function se(Q,G){F(G)?G.forEach(Ne=>Q(Ne.bind(i))):G&&Q(G.bind(i))}if(se(oa,f),se(na,m),se(ra,b),se(sa,E),se(ea,j),se(ta,M),se(da,Ie),se(ua,N),se(ca,pe),se(aa,H),se(gr,q),se(la,mt),F(Re))if(Re.length){const Q=e.exposed||(e.exposed={});Re.forEach(G=>{Object.defineProperty(Q,G,{get:()=>i[G],set:Ne=>i[G]=Ne})})}else e.exposed||(e.exposed={});oe&&e.render===Ae&&(e.render=oe),ze!=null&&(e.inheritAttrs=ze),ot&&(e.components=ot),Pe&&(e.directives=Pe)}function pa(e,t,i=Ae){F(e)&&(e=Xi(e));for(const o in e){const n=e[o];let r;Z(n)?"default"in n?r=We(n.from||o,n.default,!0):r=We(n.from||o):r=We(n),ke(r)?Object.defineProperty(t,o,{enumerable:!0,configurable:!0,get:()=>r.value,set:s=>r.value=s}):t[o]=r}}function Ko(e,t,i){Ee(F(e)?e.map(o=>o.bind(t.proxy)):e.bind(t.proxy),t,i)}function _r(e,t,i,o){const n=o.includes(".")?fr(i,o):()=>i[o];if(re(e)){const r=t[e];W(r)&&si(n,r)}else if(W(e))si(n,e.bind(i));else if(Z(e))if(F(e))e.forEach(r=>_r(r,t,i,o));else{const r=W(e.handler)?e.handler.bind(i):t[e.handler];W(r)&&si(n,r,e)}}function vo(e){const t=e.type,{mixins:i,extends:o}=t,{mixins:n,optionsCache:r,config:{optionMergeStrategies:s}}=e.appContext,a=r.get(t);let l;return a?l=a:!n.length&&!i&&!o?l=t:(l={},n.length&&n.forEach(h=>pi(l,h,s,!0)),pi(l,t,s)),Z(t)&&r.set(t,l),l}function pi(e,t,i,o=!1){const{mixins:n,extends:r}=t;r&&pi(e,r,i,!0),n&&n.forEach(s=>pi(e,s,i,!0));for(const s in t)if(!(o&&s==="expose")){const a=ma[s]||i&&i[s];e[s]=a?a(e[s],t[s]):t[s]}return e}const ma={data:$o,props:Qo,emits:Qo,methods:Lt,computed:Lt,beforeCreate:me,created:me,beforeMount:me,mounted:me,beforeUpdate:me,updated:me,beforeDestroy:me,beforeUnmount:me,destroyed:me,unmounted:me,activated:me,deactivated:me,errorCaptured:me,serverPrefetch:me,components:Lt,directives:Lt,watch:ya,provide:$o,inject:ga};function $o(e,t){return t?e?function(){return ue(W(e)?e.call(this,this):e,W(t)?t.call(this,this):t)}:t:e}function ga(e,t){return Lt(Xi(e),Xi(t))}function Xi(e){if(F(e)){const t={};for(let i=0;i<e.length;i++)t[e[i]]=e[i];return t}return e}function me(e,t){return e?[...new Set([].concat(e,t))]:t}function Lt(e,t){return e?ue(Object.create(null),e,t):t}function Qo(e,t){return e?F(e)&&F(t)?[...new Set([...e,...t])]:ue(Object.create(null),Go(e),Go(t??{})):t}function ya(e,t){if(!e)return t;if(!t)return e;const i=ue(Object.create(null),e);for(const o in t)i[o]=me(e[o],t[o]);return i}function br(){return{app:null,config:{isNativeTag:Qr,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let _a=0;function ba(e,t){return function(o,n=null){W(o)||(o=ue({},o)),n!=null&&!Z(n)&&(n=null);const r=br(),s=new WeakSet;let a=!1;const l=r.app={_uid:_a++,_component:o,_props:n,_container:null,_context:r,_instance:null,version:za,get config(){return r.config},set config(h){},use(h,...d){return s.has(h)||(h&&W(h.install)?(s.add(h),h.install(l,...d)):W(h)&&(s.add(h),h(l,...d))),l},mixin(h){return r.mixins.includes(h)||r.mixins.push(h),l},component(h,d){return d?(r.components[h]=d,l):r.components[h]},directive(h,d){return d?(r.directives[h]=d,l):r.directives[h]},mount(h,d,f){if(!a){const m=ie(o,n);return m.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),d&&t?t(m,h):e(m,h,f),a=!0,l._container=h,h.__vue_app__=l,Oi(m.component)||m.component.proxy}},unmount(){a&&(e(null,l._container),delete l._container.__vue_app__)},provide(h,d){return r.provides[h]=d,l},runWithContext(h){mi=l;try{return h()}finally{mi=null}}};return l}}let mi=null;function ai(e,t){if(fe){let i=fe.provides;const o=fe.parent&&fe.parent.provides;o===i&&(i=fe.provides=Object.create(o)),i[e]=t}}function We(e,t,i=!1){const o=fe||le;if(o||mi){const n=o?o.parent==null?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:mi._context.provides;if(n&&e in n)return n[e];if(arguments.length>1)return i&&W(t)?t.call(o&&o.proxy):t}}function wa(e,t,i,o=!1){const n={},r={};di(r,Ri,1),e.propsDefaults=Object.create(null),wr(e,t,n,r);for(const s in e.propsOptions[0])s in n||(n[s]=void 0);i?e.props=o?n:Yn(n):e.type.props?e.props=n:e.props=r,e.attrs=r}function ka(e,t,i,o){const{props:n,attrs:r,vnode:{patchFlag:s}}=e,a=z(n),[l]=e.propsOptions;let h=!1;if((o||s>0)&&!(s&16)){if(s&8){const d=e.vnode.dynamicProps;for(let f=0;f<d.length;f++){let m=d[f];if(Ti(e.emitsOptions,m))continue;const b=t[m];if(l)if(D(r,m))b!==r[m]&&(r[m]=b,h=!0);else{const E=Le(m);n[E]=Zi(l,a,E,b,e,!1)}else b!==r[m]&&(r[m]=b,h=!0)}}}else{wr(e,t,n,r)&&(h=!0);let d;for(const f in a)(!t||!D(t,f)&&((d=jt(f))===f||!D(t,d)))&&(l?i&&(i[f]!==void 0||i[d]!==void 0)&&(n[f]=Zi(l,a,f,void 0,e,!0)):delete n[f]);if(r!==a)for(const f in r)(!t||!D(t,f))&&(delete r[f],h=!0)}h&&De(e,"set","$attrs")}function wr(e,t,i,o){const[n,r]=e.propsOptions;let s=!1,a;if(t)for(let l in t){if(ni(l))continue;const h=t[l];let d;n&&D(n,d=Le(l))?!r||!r.includes(d)?i[d]=h:(a||(a={}))[d]=h:Ti(e.emitsOptions,l)||(!(l in o)||h!==o[l])&&(o[l]=h,s=!0)}if(r){const l=z(i),h=a||Y;for(let d=0;d<r.length;d++){const f=r[d];i[f]=Zi(n,l,f,h[f],e,!D(h,f))}}return s}function Zi(e,t,i,o,n,r){const s=e[i];if(s!=null){const a=D(s,"default");if(a&&o===void 0){const l=s.default;if(s.type!==Function&&!s.skipFactory&&W(l)){const{propsDefaults:h}=n;if(i in h)o=h[i];else{const d=Jt(n);o=h[i]=l.call(null,t),d()}}else o=l}s[0]&&(r&&!a?o=!1:s[1]&&(o===""||o===jt(i))&&(o=!0))}return o}function kr(e,t,i=!1){const o=t.propsCache,n=o.get(e);if(n)return n;const r=e.props,s={},a=[];let l=!1;if(!W(e)){const d=f=>{l=!0;const[m,b]=kr(f,t,!0);ue(s,m),b&&a.push(...b)};!i&&t.mixins.length&&t.mixins.forEach(d),e.extends&&d(e.extends),e.mixins&&e.mixins.forEach(d)}if(!r&&!l)return Z(e)&&o.set(e,vt),vt;if(F(r))for(let d=0;d<r.length;d++){const f=Le(r[d]);Jo(f)&&(s[f]=Y)}else if(r)for(const d in r){const f=Le(d);if(Jo(f)){const m=r[d],b=s[f]=F(m)||W(m)?{type:m}:ue({},m);if(b){const E=Zo(Boolean,b.type),j=Zo(String,b.type);b[0]=E>-1,b[1]=j<0||E<j,(E>-1||D(b,"default"))&&a.push(f)}}}const h=[s,a];return Z(e)&&o.set(e,h),h}function Jo(e){return e[0]!=="$"}function Yo(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function Xo(e,t){return Yo(e)===Yo(t)}function Zo(e,t){return F(t)?t.findIndex(i=>Xo(i,e)):W(t)&&Xo(t,e)?0:-1}const vr=e=>e[0]==="_"||e==="$stable",Io=e=>F(e)?e.map(Be):[Be(e)],va=(e,t,i)=>{if(t._n)return t;const o=ut((...n)=>Io(t(...n)),i);return o._c=!1,o},Ir=(e,t,i)=>{const o=e._ctx;for(const n in e){if(vr(n))continue;const r=e[n];if(W(r))t[n]=va(n,r,o);else if(r!=null){const s=Io(r);t[n]=()=>s}}},Ar=(e,t)=>{const i=Io(t);e.slots.default=()=>i},Ia=(e,t)=>{if(e.vnode.shapeFlag&32){const i=t._;i?(e.slots=z(t),di(t,"_",i)):Ir(t,e.slots={})}else e.slots={},t&&Ar(e,t);di(e.slots,Ri,1)},Aa=(e,t,i)=>{const{vnode:o,slots:n}=e;let r=!0,s=Y;if(o.shapeFlag&32){const a=t._;a?i&&a===1?r=!1:(ue(n,t),!i&&a===1&&delete n._):(r=!t.$stable,Ir(t,n)),s=t}else t&&(Ar(e,t),s={default:1});if(r)for(const a in n)!vr(a)&&s[a]==null&&delete n[a]};function eo(e,t,i,o,n=!1){if(F(e)){e.forEach((m,b)=>eo(m,t&&(F(t)?t[b]:t),i,o,n));return}if(Nt(o)&&!n)return;const r=o.shapeFlag&4?Oi(o.component)||o.component.proxy:o.el,s=n?null:r,{i:a,r:l}=e,h=t&&t.r,d=a.refs===Y?a.refs={}:a.refs,f=a.setupState;if(h!=null&&h!==l&&(re(h)?(d[h]=null,D(f,h)&&(f[h]=null)):ke(h)&&(h.value=null)),W(l))Ze(l,a,12,[s,d]);else{const m=re(l),b=ke(l),E=e.f;if(m||b){const j=()=>{if(E){const M=m?D(f,l)?f[l]:d[l]:l.value;n?F(M)&&lo(M,r):F(M)?M.includes(r)||M.push(r):m?(d[l]=[r],D(f,l)&&(f[l]=d[l])):(l.value=[r],e.k&&(d[e.k]=l.value))}else m?(d[l]=s,D(f,l)&&(f[l]=s)):b&&(l.value=s,e.k&&(d[e.k]=s))};n||E?j():(j.id=-1,_e(j,i))}}}const _e=Js;function Sa(e){return Ta(e)}function Ta(e,t){const i=Fn();i.__VUE__=!0;const{insert:o,remove:n,patchProp:r,createElement:s,createText:a,createComment:l,setText:h,setElementText:d,parentNode:f,nextSibling:m,setScopeId:b=Ae,insertStaticContent:E}=e,j=(c,u,p,_=null,g=null,v=null,S=void 0,k=null,I=!!u.dynamicChildren)=>{if(c===u)return;c&&!Ft(c,u)&&(_=y(c),ye(c,g,v,!0),c=null),u.patchFlag===-2&&(I=!1,u.dynamicChildren=null);const{type:w,ref:x,shapeFlag:O}=u;switch(w){case Ci:M(c,u,p,_);break;case tt:R(c,u,p,_);break;case li:c==null&&H(u,p,_,S);break;case ge:ot(c,u,p,_,g,v,S,k,I);break;default:O&1?oe(c,u,p,_,g,v,S,k,I):O&6?Pe(c,u,p,_,g,v,S,k,I):(O&64||O&128)&&w.process(c,u,p,_,g,v,S,k,I,C)}x!=null&&g&&eo(x,c&&c.ref,v,u||c,!u)},M=(c,u,p,_)=>{if(c==null)o(u.el=a(u.children),p,_);else{const g=u.el=c.el;u.children!==c.children&&h(g,u.children)}},R=(c,u,p,_)=>{c==null?o(u.el=l(u.children||""),p,_):u.el=c.el},H=(c,u,p,_)=>{[c.el,c.anchor]=E(c.children,u,p,_,c.el,c.anchor)},L=({el:c,anchor:u},p,_)=>{let g;for(;c&&c!==u;)g=m(c),o(c,p,_),c=g;o(u,p,_)},q=({el:c,anchor:u})=>{let p;for(;c&&c!==u;)p=m(c),n(c),c=p;n(u)},oe=(c,u,p,_,g,v,S,k,I)=>{u.type==="svg"?S="svg":u.type==="math"&&(S="mathml"),c==null?N(u,p,_,g,v,S,k,I):mt(c,u,g,v,S,k,I)},N=(c,u,p,_,g,v,S,k)=>{let I,w;const{props:x,shapeFlag:O,transition:P,dirs:B}=c;if(I=c.el=s(c.type,v,x&&x.is,x),O&8?d(I,c.children):O&16&&Ie(c.children,I,null,_,g,Li(c,v),S,k),B&&nt(c,null,_,"created"),pe(I,c,c.scopeId,S,_),x){for(const J in x)J!=="value"&&!ni(J)&&r(I,J,null,x[J],v,c.children,_,g,de);"value"in x&&r(I,"value",null,x.value,v),(w=x.onVnodeBeforeMount)&&Me(w,_,c)}B&&nt(c,null,_,"beforeMount");const V=xa(g,P);V&&P.beforeEnter(I),o(I,u,p),((w=x&&x.onVnodeMounted)||V||B)&&_e(()=>{w&&Me(w,_,c),V&&P.enter(I),B&&nt(c,null,_,"mounted")},g)},pe=(c,u,p,_,g)=>{if(p&&b(c,p),_)for(let v=0;v<_.length;v++)b(c,_[v]);if(g){let v=g.subTree;if(u===v){const S=g.vnode;pe(c,S,S.scopeId,S.slotScopeIds,g.parent)}}},Ie=(c,u,p,_,g,v,S,k,I=0)=>{for(let w=I;w<c.length;w++){const x=c[w]=k?Qe(c[w]):Be(c[w]);j(null,x,u,p,_,g,v,S,k)}},mt=(c,u,p,_,g,v,S)=>{const k=u.el=c.el;let{patchFlag:I,dynamicChildren:w,dirs:x}=u;I|=c.patchFlag&16;const O=c.props||Y,P=u.props||Y;let B;if(p&&rt(p,!1),(B=P.onVnodeBeforeUpdate)&&Me(B,p,u,c),x&&nt(u,c,p,"beforeUpdate"),p&&rt(p,!0),w?Re(c.dynamicChildren,w,k,p,_,Li(u,g),v):S||G(c,u,k,null,p,_,Li(u,g),v,!1),I>0){if(I&16)ze(k,u,O,P,p,_,g);else if(I&2&&O.class!==P.class&&r(k,"class",null,P.class,g),I&4&&r(k,"style",O.style,P.style,g),I&8){const V=u.dynamicProps;for(let J=0;J<V.length;J++){const X=V[J],ae=O[X],Se=P[X];(Se!==ae||X==="value")&&r(k,X,ae,Se,g,c.children,p,_,de)}}I&1&&c.children!==u.children&&d(k,u.children)}else!S&&w==null&&ze(k,u,O,P,p,_,g);((B=P.onVnodeUpdated)||x)&&_e(()=>{B&&Me(B,p,u,c),x&&nt(u,c,p,"updated")},_)},Re=(c,u,p,_,g,v,S)=>{for(let k=0;k<u.length;k++){const I=c[k],w=u[k],x=I.el&&(I.type===ge||!Ft(I,w)||I.shapeFlag&70)?f(I.el):p;j(I,w,x,null,_,g,v,S,!0)}},ze=(c,u,p,_,g,v,S)=>{if(p!==_){if(p!==Y)for(const k in p)!ni(k)&&!(k in _)&&r(c,k,p[k],null,S,u.children,g,v,de);for(const k in _){if(ni(k))continue;const I=_[k],w=p[k];I!==w&&k!=="value"&&r(c,k,w,I,S,u.children,g,v,de)}"value"in _&&r(c,"value",p.value,_.value,S)}},ot=(c,u,p,_,g,v,S,k,I)=>{const w=u.el=c?c.el:a(""),x=u.anchor=c?c.anchor:a("");let{patchFlag:O,dynamicChildren:P,slotScopeIds:B}=u;B&&(k=k?k.concat(B):B),c==null?(o(w,p,_),o(x,p,_),Ie(u.children||[],p,x,g,v,S,k,I)):O>0&&O&64&&P&&c.dynamicChildren?(Re(c.dynamicChildren,P,p,g,v,S,k),(u.key!=null||g&&u===g.subTree)&&Sr(c,u,!0)):G(c,u,p,x,g,v,S,k,I)},Pe=(c,u,p,_,g,v,S,k,I)=>{u.slotScopeIds=k,c==null?u.shapeFlag&512?g.ctx.activate(u,p,_,S,I):Mt(u,p,_,g,v,S,I):gt(c,u,I)},Mt=(c,u,p,_,g,v,S)=>{const k=c.component=Ha(c,_,g);if(pr(c)&&(k.ctx.renderer=C),Wa(k),k.asyncDep){if(g&&g.registerDep(k,se),!c.el){const I=k.subTree=ie(tt);R(null,I,u,p)}}else se(k,c,u,p,g,v,S)},gt=(c,u,p)=>{const _=u.component=c.component;if(zs(c,u,p))if(_.asyncDep&&!_.asyncResolved){Q(_,u,p);return}else _.next=u,Fs(_.update),_.effect.dirty=!0,_.update();else u.el=c.el,_.vnode=u},se=(c,u,p,_,g,v,S)=>{const k=()=>{if(c.isMounted){let{next:x,bu:O,u:P,parent:B,vnode:V}=c;{const bt=Tr(c);if(bt){x&&(x.el=V.el,Q(c,x,S)),bt.asyncDep.then(()=>{c.isUnmounted||k()});return}}let J=x,X;rt(c,!1),x?(x.el=V.el,Q(c,x,S)):x=V,O&&Bi(O),(X=x.props&&x.props.onVnodeBeforeUpdate)&&Me(X,B,x,V),rt(c,!0);const ae=Hi(c),Se=c.subTree;c.subTree=ae,j(Se,ae,f(Se.el),y(Se),c,g,v),x.el=ae.el,J===null&&qs(c,ae.el),P&&_e(P,g),(X=x.props&&x.props.onVnodeUpdated)&&_e(()=>Me(X,B,x,V),g)}else{let x;const{el:O,props:P}=u,{bm:B,m:V,parent:J}=c,X=Nt(u);if(rt(c,!1),B&&Bi(B),!X&&(x=P&&P.onVnodeBeforeMount)&&Me(x,J,u),rt(c,!0),O&&ee){const ae=()=>{c.subTree=Hi(c),ee(O,c.subTree,c,g,null)};X?u.type.__asyncLoader().then(()=>!c.isUnmounted&&ae()):ae()}else{const ae=c.subTree=Hi(c);j(null,ae,p,_,c,g,v),u.el=ae.el}if(V&&_e(V,g),!X&&(x=P&&P.onVnodeMounted)){const ae=u;_e(()=>Me(x,J,ae),g)}(u.shapeFlag&256||J&&Nt(J.vnode)&&J.vnode.shapeFlag&256)&&c.a&&_e(c.a,g),c.isMounted=!0,u=p=_=null}},I=c.effect=new fo(k,Ae,()=>ko(w),c.scope),w=c.update=()=>{I.dirty&&I.run()};w.id=c.uid,rt(c,!0),w()},Q=(c,u,p)=>{u.component=c;const _=c.vnode.props;c.vnode=u,c.next=null,ka(c,u.props,_,p),Aa(c,u.children,p),ft(),Vo(c),pt()},G=(c,u,p,_,g,v,S,k,I=!1)=>{const w=c&&c.children,x=c?c.shapeFlag:0,O=u.children,{patchFlag:P,shapeFlag:B}=u;if(P>0){if(P&128){qe(w,O,p,_,g,v,S,k,I);return}else if(P&256){Ne(w,O,p,_,g,v,S,k,I);return}}B&8?(x&16&&de(w,g,v),O!==w&&d(p,O)):x&16?B&16?qe(w,O,p,_,g,v,S,k,I):de(w,g,v,!0):(x&8&&d(p,""),B&16&&Ie(O,p,_,g,v,S,k,I))},Ne=(c,u,p,_,g,v,S,k,I)=>{c=c||vt,u=u||vt;const w=c.length,x=u.length,O=Math.min(w,x);let P;for(P=0;P<O;P++){const B=u[P]=I?Qe(u[P]):Be(u[P]);j(c[P],B,p,null,g,v,S,k,I)}w>x?de(c,g,v,!0,!1,O):Ie(u,p,_,g,v,S,k,I,O)},qe=(c,u,p,_,g,v,S,k,I)=>{let w=0;const x=u.length;let O=c.length-1,P=x-1;for(;w<=O&&w<=P;){const B=c[w],V=u[w]=I?Qe(u[w]):Be(u[w]);if(Ft(B,V))j(B,V,p,null,g,v,S,k,I);else break;w++}for(;w<=O&&w<=P;){const B=c[O],V=u[P]=I?Qe(u[P]):Be(u[P]);if(Ft(B,V))j(B,V,p,null,g,v,S,k,I);else break;O--,P--}if(w>O){if(w<=P){const B=P+1,V=B<x?u[B].el:_;for(;w<=P;)j(null,u[w]=I?Qe(u[w]):Be(u[w]),p,V,g,v,S,k,I),w++}}else if(w>P)for(;w<=O;)ye(c[w],g,v,!0),w++;else{const B=w,V=w,J=new Map;for(w=V;w<=P;w++){const ve=u[w]=I?Qe(u[w]):Be(u[w]);ve.key!=null&&J.set(ve.key,w)}let X,ae=0;const Se=P-V+1;let bt=!1,Co=0;const Bt=new Array(Se);for(w=0;w<Se;w++)Bt[w]=0;for(w=B;w<=O;w++){const ve=c[w];if(ae>=Se){ye(ve,g,v,!0);continue}let je;if(ve.key!=null)je=J.get(ve.key);else for(X=V;X<=P;X++)if(Bt[X-V]===0&&Ft(ve,u[X])){je=X;break}je===void 0?ye(ve,g,v,!0):(Bt[je-V]=w+1,je>=Co?Co=je:bt=!0,j(ve,u[je],p,null,g,v,S,k,I),ae++)}const Ro=bt?Ea(Bt):vt;for(X=Ro.length-1,w=Se-1;w>=0;w--){const ve=V+w,je=u[ve],Po=ve+1<x?u[ve+1].el:_;Bt[w]===0?j(null,je,p,Po,g,v,S,k,I):bt&&(X<0||w!==Ro[X]?Oe(je,p,Po,2):X--)}}},Oe=(c,u,p,_,g=null)=>{const{el:v,type:S,transition:k,children:I,shapeFlag:w}=c;if(w&6){Oe(c.component.subTree,u,p,_);return}if(w&128){c.suspense.move(u,p,_);return}if(w&64){S.move(c,u,p,C);return}if(S===ge){o(v,u,p);for(let O=0;O<I.length;O++)Oe(I[O],u,p,_);o(c.anchor,u,p);return}if(S===li){L(c,u,p);return}if(_!==2&&w&1&&k)if(_===0)k.beforeEnter(v),o(v,u,p),_e(()=>k.enter(v),g);else{const{leave:O,delayLeave:P,afterLeave:B}=k,V=()=>o(v,u,p),J=()=>{O(v,()=>{V(),B&&B()})};P?P(v,V,J):J()}else o(v,u,p)},ye=(c,u,p,_=!1,g=!1)=>{const{type:v,props:S,ref:k,children:I,dynamicChildren:w,shapeFlag:x,patchFlag:O,dirs:P}=c;if(k!=null&&eo(k,null,p,c,!0),x&256){u.ctx.deactivate(c);return}const B=x&1&&P,V=!Nt(c);let J;if(V&&(J=S&&S.onVnodeBeforeUnmount)&&Me(J,u,c),x&6)Yt(c.component,p,_);else{if(x&128){c.suspense.unmount(p,_);return}B&&nt(c,null,u,"beforeUnmount"),x&64?c.type.remove(c,u,p,g,C,_):w&&(v!==ge||O>0&&O&64)?de(w,u,p,!1,!0):(v===ge&&O&384||!g&&x&16)&&de(I,u,p),_&&yt(c)}(V&&(J=S&&S.onVnodeUnmounted)||B)&&_e(()=>{J&&Me(J,u,c),B&&nt(c,null,u,"unmounted")},p)},yt=c=>{const{type:u,el:p,anchor:_,transition:g}=c;if(u===ge){_t(p,_);return}if(u===li){q(c);return}const v=()=>{n(p),g&&!g.persisted&&g.afterLeave&&g.afterLeave()};if(c.shapeFlag&1&&g&&!g.persisted){const{leave:S,delayLeave:k}=g,I=()=>S(p,v);k?k(c.el,v,I):I()}else v()},_t=(c,u)=>{let p;for(;c!==u;)p=m(c),n(c),c=p;n(u)},Yt=(c,u,p)=>{const{bum:_,scope:g,update:v,subTree:S,um:k}=c;_&&Bi(_),g.stop(),v&&(v.active=!1,ye(S,c,u,p)),k&&_e(k,u),_e(()=>{c.isUnmounted=!0},u),u&&u.pendingBranch&&!u.isUnmounted&&c.asyncDep&&!c.asyncResolved&&c.suspenseId===u.pendingId&&(u.deps--,u.deps===0&&u.resolve())},de=(c,u,p,_=!1,g=!1,v=0)=>{for(let S=v;S<c.length;S++)ye(c[S],u,p,_,g)},y=c=>c.shapeFlag&6?y(c.component.subTree):c.shapeFlag&128?c.suspense.next():m(c.anchor||c.el);let T=!1;const A=(c,u,p)=>{c==null?u._vnode&&ye(u._vnode,null,null,!0):j(u._vnode||null,c,u,null,null,null,p),T||(T=!0,Vo(),lr(),T=!1),u._vnode=c},C={p:j,um:ye,m:Oe,r:yt,mt:Mt,mc:Ie,pc:G,pbc:Re,n:y,o:e};let K,ee;return{render:A,hydrate:K,createApp:ba(A,K)}}function Li({type:e,props:t},i){return i==="svg"&&e==="foreignObject"||i==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:i}function rt({effect:e,update:t},i){e.allowRecurse=t.allowRecurse=i}function xa(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Sr(e,t,i=!1){const o=e.children,n=t.children;if(F(o)&&F(n))for(let r=0;r<o.length;r++){const s=o[r];let a=n[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=n[r]=Qe(n[r]),a.el=s.el),i||Sr(s,a)),a.type===Ci&&(a.el=s.el)}}function Ea(e){const t=e.slice(),i=[0];let o,n,r,s,a;const l=e.length;for(o=0;o<l;o++){const h=e[o];if(h!==0){if(n=i[i.length-1],e[n]<h){t[o]=n,i.push(o);continue}for(r=0,s=i.length-1;r<s;)a=r+s>>1,e[i[a]]<h?r=a+1:s=a;h<e[i[r]]&&(r>0&&(t[o]=i[r-1]),i[r]=o)}}for(r=i.length,s=i[r-1];r-- >0;)i[r]=s,s=t[s];return i}function Tr(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Tr(t)}const Ca=e=>e.__isTeleport,ge=Symbol.for("v-fgt"),Ci=Symbol.for("v-txt"),tt=Symbol.for("v-cmt"),li=Symbol.for("v-stc"),Dt=[];let xe=null;function be(e=!1){Dt.push(xe=e?null:[])}function Ra(){Dt.pop(),xe=Dt[Dt.length-1]||null}let $t=1;function en(e){$t+=e}function xr(e){return e.dynamicChildren=$t>0?xe||vt:null,Ra(),$t>0&&xe&&xe.push(e),e}function dt(e,t,i,o,n,r){return xr(ne(e,t,i,o,n,r,!0))}function ht(e,t,i,o,n){return xr(ie(e,t,i,o,n,!0))}function gi(e){return e?e.__v_isVNode===!0:!1}function Ft(e,t){return e.type===t.type&&e.key===t.key}const Ri="__vInternal",Er=({key:e})=>e??null,ci=({ref:e,ref_key:t,ref_for:i})=>(typeof e=="number"&&(e=""+e),e!=null?re(e)||ke(e)||W(e)?{i:le,r:e,k:t,f:!!i}:e:null);function ne(e,t=null,i=null,o=0,n=null,r=e===ge?0:1,s=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Er(t),ref:t&&ci(t),scopeId:xi,slotScopeIds:null,children:i,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:o,dynamicProps:n,dynamicChildren:null,appContext:null,ctx:le};return a?(Ao(l,i),r&128&&e.normalize(l)):i&&(l.shapeFlag|=re(i)?8:16),$t>0&&!s&&xe&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&xe.push(l),l}const ie=Pa;function Pa(e,t=null,i=null,o=0,n=null,r=!1){if((!e||e===Ks)&&(e=tt),gi(e)){const a=xt(e,t,!0);return i&&Ao(a,i),$t>0&&!r&&xe&&(a.shapeFlag&6?xe[xe.indexOf(e)]=a:xe.push(a)),a.patchFlag|=-2,a}if(Ua(e)&&(e=e.__vccOpts),t){t=Oa(t);let{class:a,style:l}=t;a&&!re(a)&&(t.class=ho(a)),Z(l)&&(Zn(l)&&!F(l)&&(l=ue({},l)),t.style=uo(l))}const s=re(e)?1:Qs(e)?128:Ca(e)?64:Z(e)?4:W(e)?2:0;return ne(e,t,i,o,n,s,r,!0)}function Oa(e){return e?Zn(e)||Ri in e?ue({},e):e:null}function xt(e,t,i=!1){const{props:o,ref:n,patchFlag:r,children:s}=e,a=t?Ma(o||{},t):o;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:a,key:a&&Er(a),ref:t&&t.ref?i&&n?F(n)?n.concat(ci(t)):[n,ci(t)]:ci(t):n,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ge?r===-1?16:r|16:r,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&xt(e.ssContent),ssFallback:e.ssFallback&&xt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function Et(e=" ",t=0){return ie(Ci,null,e,t)}function bu(e,t){const i=ie(li,null,e);return i.staticCount=t,i}function ja(e="",t=!1){return t?(be(),ht(tt,null,e)):ie(tt,null,e)}function Be(e){return e==null||typeof e=="boolean"?ie(tt):F(e)?ie(ge,null,e.slice()):typeof e=="object"?Qe(e):ie(Ci,null,String(e))}function Qe(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:xt(e)}function Ao(e,t){let i=0;const{shapeFlag:o}=e;if(t==null)t=null;else if(F(t))i=16;else if(typeof t=="object")if(o&65){const n=t.default;n&&(n._c&&(n._d=!1),Ao(e,n()),n._c&&(n._d=!0));return}else{i=32;const n=t._;!n&&!(Ri in t)?t._ctx=le:n===3&&le&&(le.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else W(t)?(t={default:t,_ctx:le},i=32):(t=String(t),o&64?(i=16,t=[Et(t)]):i=8);e.children=t,e.shapeFlag|=i}function Ma(...e){const t={};for(let i=0;i<e.length;i++){const o=e[i];for(const n in o)if(n==="class")t.class!==o.class&&(t.class=ho([t.class,o.class]));else if(n==="style")t.style=uo([t.style,o.style]);else if(bi(n)){const r=t[n],s=o[n];s&&r!==s&&!(F(r)&&r.includes(s))&&(t[n]=r?[].concat(r,s):s)}else n!==""&&(t[n]=o[n])}return t}function Me(e,t,i,o=null){Ee(e,t,7,[i,o])}const Ba=br();let Fa=0;function Ha(e,t,i){const o=e.type,n=(t?t.appContext:e.appContext)||Ba,r={uid:Fa++,vnode:e,type:o,parent:t,appContext:n,root:null,next:null,subTree:null,effect:null,update:null,scope:new as(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(n.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:kr(o,n),emitsOptions:ur(o,n),emit:null,emitted:null,propsDefaults:Y,inheritAttrs:o.inheritAttrs,ctx:Y,data:Y,props:Y,attrs:Y,slots:Y,refs:Y,setupState:Y,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:i,suspenseId:i?i.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=Ls.bind(null,r),e.ce&&e.ce(r),r}let fe=null,yi,to;{const e=Fn(),t=(i,o)=>{let n;return(n=e[i])||(n=e[i]=[]),n.push(o),r=>{n.length>1?n.forEach(s=>s(r)):n[0](r)}};yi=t("__VUE_INSTANCE_SETTERS__",i=>fe=i),to=t("__VUE_SSR_SETTERS__",i=>Pi=i)}const Jt=e=>{const t=fe;return yi(e),e.scope.on(),()=>{e.scope.off(),yi(t)}},tn=()=>{fe&&fe.scope.off(),yi(null)};function Cr(e){return e.vnode.shapeFlag&4}let Pi=!1;function Wa(e,t=!1){t&&to(t);const{props:i,children:o}=e.vnode,n=Cr(e);wa(e,i,n,t),Ia(e,o);const r=n?La(e,t):void 0;return t&&to(!1),r}function La(e,t){const i=e.type;e.accessCache=Object.create(null),e.proxy=er(new Proxy(e.ctx,ha));const{setup:o}=i;if(o){const n=e.setupContext=o.length>1?Va(e):null,r=Jt(e);ft();const s=Ze(o,e,0,[e.props,n]);if(pt(),r(),jn(s)){if(s.then(tn,tn),t)return s.then(a=>{on(e,a,t)}).catch(a=>{Si(a,e,0)});e.asyncDep=s}else on(e,s,t)}else Rr(e,t)}function on(e,t,i){W(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Z(t)&&(e.setupState=nr(t)),Rr(e,i)}let nn;function Rr(e,t,i){const o=e.type;if(!e.render){if(!t&&nn&&!o.render){const n=o.template||vo(e).template;if(n){const{isCustomElement:r,compilerOptions:s}=e.appContext.config,{delimiters:a,compilerOptions:l}=o,h=ue(ue({isCustomElement:r,delimiters:a},s),l);o.render=nn(n,h)}}e.render=o.render||Ae}{const n=Jt(e);ft();try{fa(e)}finally{pt(),n()}}}function Na(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,i){return we(e,"get","$attrs"),t[i]}}))}function Va(e){const t=i=>{e.exposed=i||{}};return{get attrs(){return Na(e)},slots:e.slots,emit:e.emit,expose:t}}function Oi(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(nr(er(e.exposed)),{get(t,i){if(i in t)return t[i];if(i in Vt)return Vt[i](e)},has(t,i){return i in t||i in Vt}}))}function Da(e,t=!0){return W(e)?e.displayName||e.name:e.name||t&&e.__name}function Ua(e){return W(e)&&"__vccOpts"in e}const ce=(e,t)=>Cs(e,t,Pi);function Pr(e,t,i){const o=arguments.length;return o===2?Z(t)&&!F(t)?gi(t)?ie(e,null,[t]):ie(e,t):ie(e,null,t):(o>3?i=Array.prototype.slice.call(arguments,2):o===3&&gi(i)&&(i=[i]),ie(e,t,i))}const za="3.4.15";/**
* @vue/runtime-dom v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const qa="http://www.w3.org/2000/svg",Ga="http://www.w3.org/1998/Math/MathML",Je=typeof document<"u"?document:null,rn=Je&&Je.createElement("template"),Ka={insert:(e,t,i)=>{t.insertBefore(e,i||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,i,o)=>{const n=t==="svg"?Je.createElementNS(qa,e):t==="mathml"?Je.createElementNS(Ga,e):Je.createElement(e,i?{is:i}:void 0);return e==="select"&&o&&o.multiple!=null&&n.setAttribute("multiple",o.multiple),n},createText:e=>Je.createTextNode(e),createComment:e=>Je.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Je.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,i,o,n,r){const s=i?i.previousSibling:t.lastChild;if(n&&(n===r||n.nextSibling))for(;t.insertBefore(n.cloneNode(!0),i),!(n===r||!(n=n.nextSibling)););else{rn.innerHTML=o==="svg"?`<svg>${e}</svg>`:o==="mathml"?`<math>${e}</math>`:e;const a=rn.content;if(o==="svg"||o==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,i)}return[s?s.nextSibling:t.firstChild,i?i.previousSibling:t.lastChild]}},$a=Symbol("_vtc");function Qa(e,t,i){const o=e[$a];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):i?e.setAttribute("class",t):e.className=t}const So=Symbol("_vod"),wu={beforeMount(e,{value:t},{transition:i}){e[So]=e.style.display==="none"?"":e.style.display,i&&t?i.beforeEnter(e):Ht(e,t)},mounted(e,{value:t},{transition:i}){i&&t&&i.enter(e)},updated(e,{value:t,oldValue:i},{transition:o}){!t!=!i&&(o?t?(o.beforeEnter(e),Ht(e,!0),o.enter(e)):o.leave(e,()=>{Ht(e,!1)}):Ht(e,t))},beforeUnmount(e,{value:t}){Ht(e,t)}};function Ht(e,t){e.style.display=t?e[So]:"none"}const Ja=Symbol("");function Ya(e,t,i){const o=e.style,n=o.display,r=re(i);if(i&&!r){if(t&&!re(t))for(const s in t)i[s]==null&&io(o,s,"");for(const s in i)io(o,s,i[s])}else if(r){if(t!==i){const s=o[Ja];s&&(i+=";"+s),o.cssText=i}}else t&&e.removeAttribute("style");So in e&&(o.display=n)}const sn=/\s*!important$/;function io(e,t,i){if(F(i))i.forEach(o=>io(e,t,o));else if(i==null&&(i=""),t.startsWith("--"))e.setProperty(t,i);else{const o=Xa(e,t);sn.test(i)?e.setProperty(jt(o),i.replace(sn,""),"important"):e[o]=i}}const an=["Webkit","Moz","ms"],Ni={};function Xa(e,t){const i=Ni[t];if(i)return i;let o=Le(t);if(o!=="filter"&&o in e)return Ni[t]=o;o=vi(o);for(let n=0;n<an.length;n++){const r=an[n]+o;if(r in e)return Ni[t]=r}return t}const ln="http://www.w3.org/1999/xlink";function Za(e,t,i,o,n){if(o&&t.startsWith("xlink:"))i==null?e.removeAttributeNS(ln,t.slice(6,t.length)):e.setAttributeNS(ln,t,i);else{const r=ss(t);i==null||r&&!Hn(i)?e.removeAttribute(t):e.setAttribute(t,r?"":i)}}function el(e,t,i,o,n,r,s){if(t==="innerHTML"||t==="textContent"){o&&s(o,n,r),e[t]=i??"";return}const a=e.tagName;if(t==="value"&&a!=="PROGRESS"&&!a.includes("-")){e._value=i;const h=a==="OPTION"?e.getAttribute("value"):e.value,d=i??"";h!==d&&(e.value=d),i==null&&e.removeAttribute(t);return}let l=!1;if(i===""||i==null){const h=typeof e[t];h==="boolean"?i=Hn(i):i==null&&h==="string"?(i="",l=!0):h==="number"&&(i=0,l=!0)}try{e[t]=i}catch{}l&&e.removeAttribute(t)}function tl(e,t,i,o){e.addEventListener(t,i,o)}function il(e,t,i,o){e.removeEventListener(t,i,o)}const cn=Symbol("_vei");function ol(e,t,i,o,n=null){const r=e[cn]||(e[cn]={}),s=r[t];if(o&&s)s.value=o;else{const[a,l]=nl(t);if(o){const h=r[t]=al(o,n);tl(e,a,h,l)}else s&&(il(e,a,s,l),r[t]=void 0)}}const un=/(?:Once|Passive|Capture)$/;function nl(e){let t;if(un.test(e)){t={};let o;for(;o=e.match(un);)e=e.slice(0,e.length-o[0].length),t[o[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):jt(e.slice(2)),t]}let Vi=0;const rl=Promise.resolve(),sl=()=>Vi||(rl.then(()=>Vi=0),Vi=Date.now());function al(e,t){const i=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=i.attached)return;Ee(ll(o,i.value),t,5,[o])};return i.value=e,i.attached=sl(),i}function ll(e,t){if(F(t)){const i=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{i.call(e),e._stopped=!0},t.map(o=>n=>!n._stopped&&o&&o(n))}else return t}const dn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,cl=(e,t,i,o,n,r,s,a,l)=>{const h=n==="svg";t==="class"?Qa(e,o,h):t==="style"?Ya(e,i,o):bi(t)?ao(t)||ol(e,t,i,o,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):ul(e,t,o,h))?el(e,t,o,r,s,a,l):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),Za(e,t,o,h))};function ul(e,t,i,o){if(o)return!!(t==="innerHTML"||t==="textContent"||t in e&&dn(t)&&W(i));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const n=e.tagName;if(n==="IMG"||n==="VIDEO"||n==="CANVAS"||n==="SOURCE")return!1}return dn(t)&&re(i)?!1:t in e}const dl=ue({patchProp:cl},Ka);let hn;function hl(){return hn||(hn=Sa(dl))}const fl=(...e)=>{const t=hl().createApp(...e),{mount:i}=t;return t.mount=o=>{const n=ml(o);if(!n)return;const r=t._component;!W(r)&&!r.render&&!r.template&&(r.template=n.innerHTML),n.innerHTML="";const s=i(n,!1,pl(n));return n instanceof Element&&(n.removeAttribute("v-cloak"),n.setAttribute("data-v-app","")),s},t};function pl(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function ml(e){return re(e)?document.querySelector(e):e}/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const kt=typeof window<"u";function gl(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const $=Object.assign;function Di(e,t){const i={};for(const o in t){const n=t[o];i[o]=Ce(n)?n.map(e):e(n)}return i}const Ut=()=>{},Ce=Array.isArray,yl=/\/$/,_l=e=>e.replace(yl,"");function Ui(e,t,i="/"){let o,n={},r="",s="";const a=t.indexOf("#");let l=t.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(o=t.slice(0,l),r=t.slice(l+1,a>-1?a:t.length),n=e(r)),a>-1&&(o=o||t.slice(0,a),s=t.slice(a,t.length)),o=vl(o??t,i),{fullPath:o+(r&&"?")+r+s,path:o,query:n,hash:s}}function bl(e,t){const i=t.query?e(t.query):"";return t.path+(i&&"?")+i+(t.hash||"")}function fn(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function wl(e,t,i){const o=t.matched.length-1,n=i.matched.length-1;return o>-1&&o===n&&Ct(t.matched[o],i.matched[n])&&Or(t.params,i.params)&&e(t.query)===e(i.query)&&t.hash===i.hash}function Ct(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Or(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const i in e)if(!kl(e[i],t[i]))return!1;return!0}function kl(e,t){return Ce(e)?pn(e,t):Ce(t)?pn(t,e):e===t}function pn(e,t){return Ce(t)?e.length===t.length&&e.every((i,o)=>i===t[o]):e.length===1&&e[0]===t}function vl(e,t){if(e.startsWith("/"))return e;if(!e)return t;const i=t.split("/"),o=e.split("/"),n=o[o.length-1];(n===".."||n===".")&&o.push("");let r=i.length-1,s,a;for(s=0;s<o.length;s++)if(a=o[s],a!==".")if(a==="..")r>1&&r--;else break;return i.slice(0,r).join("/")+"/"+o.slice(s-(s===o.length?1:0)).join("/")}var Qt;(function(e){e.pop="pop",e.push="push"})(Qt||(Qt={}));var zt;(function(e){e.back="back",e.forward="forward",e.unknown=""})(zt||(zt={}));function Il(e){if(!e)if(kt){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),_l(e)}const Al=/^[^#]+#/;function Sl(e,t){return e.replace(Al,"#")+t}function Tl(e,t){const i=document.documentElement.getBoundingClientRect(),o=e.getBoundingClientRect();return{behavior:t.behavior,left:o.left-i.left-(t.left||0),top:o.top-i.top-(t.top||0)}}const ji=()=>({left:window.pageXOffset,top:window.pageYOffset});function xl(e){let t;if("el"in e){const i=e.el,o=typeof i=="string"&&i.startsWith("#"),n=typeof i=="string"?o?document.getElementById(i.slice(1)):document.querySelector(i):i;if(!n)return;t=Tl(n,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function mn(e,t){return(history.state?history.state.position-t:-1)+e}const oo=new Map;function El(e,t){oo.set(e,t)}function Cl(e){const t=oo.get(e);return oo.delete(e),t}let Rl=()=>location.protocol+"//"+location.host;function jr(e,t){const{pathname:i,search:o,hash:n}=t,r=e.indexOf("#");if(r>-1){let a=n.includes(e.slice(r))?e.slice(r).length:1,l=n.slice(a);return l[0]!=="/"&&(l="/"+l),fn(l,"")}return fn(i,e)+o+n}function Pl(e,t,i,o){let n=[],r=[],s=null;const a=({state:m})=>{const b=jr(e,location),E=i.value,j=t.value;let M=0;if(m){if(i.value=b,t.value=m,s&&s===E){s=null;return}M=j?m.position-j.position:0}else o(b);n.forEach(R=>{R(i.value,E,{delta:M,type:Qt.pop,direction:M?M>0?zt.forward:zt.back:zt.unknown})})};function l(){s=i.value}function h(m){n.push(m);const b=()=>{const E=n.indexOf(m);E>-1&&n.splice(E,1)};return r.push(b),b}function d(){const{history:m}=window;m.state&&m.replaceState($({},m.state,{scroll:ji()}),"")}function f(){for(const m of r)m();r=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",d)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",d,{passive:!0}),{pauseListeners:l,listen:h,destroy:f}}function gn(e,t,i,o=!1,n=!1){return{back:e,current:t,forward:i,replaced:o,position:window.history.length,scroll:n?ji():null}}function Ol(e){const{history:t,location:i}=window,o={value:jr(e,i)},n={value:t.state};n.value||r(o.value,{back:null,current:o.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function r(l,h,d){const f=e.indexOf("#"),m=f>-1?(i.host&&document.querySelector("base")?e:e.slice(f))+l:Rl()+e+l;try{t[d?"replaceState":"pushState"](h,"",m),n.value=h}catch(b){console.error(b),i[d?"replace":"assign"](m)}}function s(l,h){const d=$({},t.state,gn(n.value.back,l,n.value.forward,!0),h,{position:n.value.position});r(l,d,!0),o.value=l}function a(l,h){const d=$({},n.value,t.state,{forward:l,scroll:ji()});r(d.current,d,!0);const f=$({},gn(o.value,l,null),{position:d.position+1},h);r(l,f,!1),o.value=l}return{location:o,state:n,push:a,replace:s}}function jl(e){e=Il(e);const t=Ol(e),i=Pl(e,t.state,t.location,t.replace);function o(r,s=!0){s||i.pauseListeners(),history.go(r)}const n=$({location:"",base:e,go:o,createHref:Sl.bind(null,e)},t,i);return Object.defineProperty(n,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(n,"state",{enumerable:!0,get:()=>t.state.value}),n}function Ml(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),jl(e)}function Bl(e){return typeof e=="string"||e&&typeof e=="object"}function Mr(e){return typeof e=="string"||typeof e=="symbol"}const Ke={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Br=Symbol("");var yn;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(yn||(yn={}));function Rt(e,t){return $(new Error,{type:e,[Br]:!0},t)}function Ve(e,t){return e instanceof Error&&Br in e&&(t==null||!!(e.type&t))}const _n="[^/]+?",Fl={sensitive:!1,strict:!1,start:!0,end:!0},Hl=/[.+*?^${}()[\]/\\]/g;function Wl(e,t){const i=$({},Fl,t),o=[];let n=i.start?"^":"";const r=[];for(const h of e){const d=h.length?[]:[90];i.strict&&!h.length&&(n+="/");for(let f=0;f<h.length;f++){const m=h[f];let b=40+(i.sensitive?.25:0);if(m.type===0)f||(n+="/"),n+=m.value.replace(Hl,"\\$&"),b+=40;else if(m.type===1){const{value:E,repeatable:j,optional:M,regexp:R}=m;r.push({name:E,repeatable:j,optional:M});const H=R||_n;if(H!==_n){b+=10;try{new RegExp(`(${H})`)}catch(q){throw new Error(`Invalid custom RegExp for param "${E}" (${H}): `+q.message)}}let L=j?`((?:${H})(?:/(?:${H}))*)`:`(${H})`;f||(L=M&&h.length<2?`(?:/${L})`:"/"+L),M&&(L+="?"),n+=L,b+=20,M&&(b+=-8),j&&(b+=-20),H===".*"&&(b+=-50)}d.push(b)}o.push(d)}if(i.strict&&i.end){const h=o.length-1;o[h][o[h].length-1]+=.7000000000000001}i.strict||(n+="/?"),i.end?n+="$":i.strict&&(n+="(?:/|$)");const s=new RegExp(n,i.sensitive?"":"i");function a(h){const d=h.match(s),f={};if(!d)return null;for(let m=1;m<d.length;m++){const b=d[m]||"",E=r[m-1];f[E.name]=b&&E.repeatable?b.split("/"):b}return f}function l(h){let d="",f=!1;for(const m of e){(!f||!d.endsWith("/"))&&(d+="/"),f=!1;for(const b of m)if(b.type===0)d+=b.value;else if(b.type===1){const{value:E,repeatable:j,optional:M}=b,R=E in h?h[E]:"";if(Ce(R)&&!j)throw new Error(`Provided param "${E}" is an array but it is not repeatable (* or + modifiers)`);const H=Ce(R)?R.join("/"):R;if(!H)if(M)m.length<2&&(d.endsWith("/")?d=d.slice(0,-1):f=!0);else throw new Error(`Missing required param "${E}"`);d+=H}}return d||"/"}return{re:s,score:o,keys:r,parse:a,stringify:l}}function Ll(e,t){let i=0;for(;i<e.length&&i<t.length;){const o=t[i]-e[i];if(o)return o;i++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function Nl(e,t){let i=0;const o=e.score,n=t.score;for(;i<o.length&&i<n.length;){const r=Ll(o[i],n[i]);if(r)return r;i++}if(Math.abs(n.length-o.length)===1){if(bn(o))return 1;if(bn(n))return-1}return n.length-o.length}function bn(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Vl={type:0,value:""},Dl=/[a-zA-Z0-9_]/;function Ul(e){if(!e)return[[]];if(e==="/")return[[Vl]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(b){throw new Error(`ERR (${i})/"${h}": ${b}`)}let i=0,o=i;const n=[];let r;function s(){r&&n.push(r),r=[]}let a=0,l,h="",d="";function f(){h&&(i===0?r.push({type:0,value:h}):i===1||i===2||i===3?(r.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`),r.push({type:1,value:h,regexp:d,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),h="")}function m(){h+=l}for(;a<e.length;){if(l=e[a++],l==="\\"&&i!==2){o=i,i=4;continue}switch(i){case 0:l==="/"?(h&&f(),s()):l===":"?(f(),i=1):m();break;case 4:m(),i=o;break;case 1:l==="("?i=2:Dl.test(l)?m():(f(),i=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+l:i=3:d+=l;break;case 3:f(),i=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,d="";break;default:t("Unknown state");break}}return i===2&&t(`Unfinished custom RegExp for param "${h}"`),f(),s(),n}function zl(e,t,i){const o=Wl(Ul(e.path),i),n=$(o,{record:e,parent:t,children:[],alias:[]});return t&&!n.record.aliasOf==!t.record.aliasOf&&t.children.push(n),n}function ql(e,t){const i=[],o=new Map;t=vn({strict:!1,end:!0,sensitive:!1},t);function n(d){return o.get(d)}function r(d,f,m){const b=!m,E=Gl(d);E.aliasOf=m&&m.record;const j=vn(t,d),M=[E];if("alias"in d){const L=typeof d.alias=="string"?[d.alias]:d.alias;for(const q of L)M.push($({},E,{components:m?m.record.components:E.components,path:q,aliasOf:m?m.record:E}))}let R,H;for(const L of M){const{path:q}=L;if(f&&q[0]!=="/"){const oe=f.record.path,N=oe[oe.length-1]==="/"?"":"/";L.path=f.record.path+(q&&N+q)}if(R=zl(L,f,j),m?m.alias.push(R):(H=H||R,H!==R&&H.alias.push(R),b&&d.name&&!kn(R)&&s(d.name)),E.children){const oe=E.children;for(let N=0;N<oe.length;N++)r(oe[N],R,m&&m.children[N])}m=m||R,(R.record.components&&Object.keys(R.record.components).length||R.record.name||R.record.redirect)&&l(R)}return H?()=>{s(H)}:Ut}function s(d){if(Mr(d)){const f=o.get(d);f&&(o.delete(d),i.splice(i.indexOf(f),1),f.children.forEach(s),f.alias.forEach(s))}else{const f=i.indexOf(d);f>-1&&(i.splice(f,1),d.record.name&&o.delete(d.record.name),d.children.forEach(s),d.alias.forEach(s))}}function a(){return i}function l(d){let f=0;for(;f<i.length&&Nl(d,i[f])>=0&&(d.record.path!==i[f].record.path||!Fr(d,i[f]));)f++;i.splice(f,0,d),d.record.name&&!kn(d)&&o.set(d.record.name,d)}function h(d,f){let m,b={},E,j;if("name"in d&&d.name){if(m=o.get(d.name),!m)throw Rt(1,{location:d});j=m.record.name,b=$(wn(f.params,m.keys.filter(H=>!H.optional).map(H=>H.name)),d.params&&wn(d.params,m.keys.map(H=>H.name))),E=m.stringify(b)}else if("path"in d)E=d.path,m=i.find(H=>H.re.test(E)),m&&(b=m.parse(E),j=m.record.name);else{if(m=f.name?o.get(f.name):i.find(H=>H.re.test(f.path)),!m)throw Rt(1,{location:d,currentLocation:f});j=m.record.name,b=$({},f.params,d.params),E=m.stringify(b)}const M=[];let R=m;for(;R;)M.unshift(R.record),R=R.parent;return{name:j,path:E,params:b,matched:M,meta:$l(M)}}return e.forEach(d=>r(d)),{addRoute:r,resolve:h,removeRoute:s,getRoutes:a,getRecordMatcher:n}}function wn(e,t){const i={};for(const o of t)o in e&&(i[o]=e[o]);return i}function Gl(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:Kl(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function Kl(e){const t={},i=e.props||!1;if("component"in e)t.default=i;else for(const o in e.components)t[o]=typeof i=="object"?i[o]:i;return t}function kn(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function $l(e){return e.reduce((t,i)=>$(t,i.meta),{})}function vn(e,t){const i={};for(const o in e)i[o]=o in t?t[o]:e[o];return i}function Fr(e,t){return t.children.some(i=>i===e||Fr(e,i))}const Hr=/#/g,Ql=/&/g,Jl=/\//g,Yl=/=/g,Xl=/\?/g,Wr=/\+/g,Zl=/%5B/g,ec=/%5D/g,Lr=/%5E/g,tc=/%60/g,Nr=/%7B/g,ic=/%7C/g,Vr=/%7D/g,oc=/%20/g;function To(e){return encodeURI(""+e).replace(ic,"|").replace(Zl,"[").replace(ec,"]")}function nc(e){return To(e).replace(Nr,"{").replace(Vr,"}").replace(Lr,"^")}function no(e){return To(e).replace(Wr,"%2B").replace(oc,"+").replace(Hr,"%23").replace(Ql,"%26").replace(tc,"`").replace(Nr,"{").replace(Vr,"}").replace(Lr,"^")}function rc(e){return no(e).replace(Yl,"%3D")}function sc(e){return To(e).replace(Hr,"%23").replace(Xl,"%3F")}function ac(e){return e==null?"":sc(e).replace(Jl,"%2F")}function _i(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function lc(e){const t={};if(e===""||e==="?")return t;const o=(e[0]==="?"?e.slice(1):e).split("&");for(let n=0;n<o.length;++n){const r=o[n].replace(Wr," "),s=r.indexOf("="),a=_i(s<0?r:r.slice(0,s)),l=s<0?null:_i(r.slice(s+1));if(a in t){let h=t[a];Ce(h)||(h=t[a]=[h]),h.push(l)}else t[a]=l}return t}function In(e){let t="";for(let i in e){const o=e[i];if(i=rc(i),o==null){o!==void 0&&(t+=(t.length?"&":"")+i);continue}(Ce(o)?o.map(r=>r&&no(r)):[o&&no(o)]).forEach(r=>{r!==void 0&&(t+=(t.length?"&":"")+i,r!=null&&(t+="="+r))})}return t}function cc(e){const t={};for(const i in e){const o=e[i];o!==void 0&&(t[i]=Ce(o)?o.map(n=>n==null?null:""+n):o==null?o:""+o)}return t}const uc=Symbol(""),An=Symbol(""),xo=Symbol(""),Eo=Symbol(""),ro=Symbol("");function Wt(){let e=[];function t(o){return e.push(o),()=>{const n=e.indexOf(o);n>-1&&e.splice(n,1)}}function i(){e=[]}return{add:t,list:()=>e.slice(),reset:i}}function Ye(e,t,i,o,n){const r=o&&(o.enterCallbacks[n]=o.enterCallbacks[n]||[]);return()=>new Promise((s,a)=>{const l=f=>{f===!1?a(Rt(4,{from:i,to:t})):f instanceof Error?a(f):Bl(f)?a(Rt(2,{from:t,to:f})):(r&&o.enterCallbacks[n]===r&&typeof f=="function"&&r.push(f),s())},h=e.call(o&&o.instances[n],t,i,l);let d=Promise.resolve(h);e.length<3&&(d=d.then(l)),d.catch(f=>a(f))})}function zi(e,t,i,o){const n=[];for(const r of e)for(const s in r.components){let a=r.components[s];if(!(t!=="beforeRouteEnter"&&!r.instances[s]))if(dc(a)){const h=(a.__vccOpts||a)[t];h&&n.push(Ye(h,i,o,r,s))}else{let l=a();n.push(()=>l.then(h=>{if(!h)return Promise.reject(new Error(`Couldn't resolve component "${s}" at "${r.path}"`));const d=gl(h)?h.default:h;r.components[s]=d;const m=(d.__vccOpts||d)[t];return m&&Ye(m,i,o,r,s)()}))}}return n}function dc(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Sn(e){const t=We(xo),i=We(Eo),o=ce(()=>t.resolve(He(e.to))),n=ce(()=>{const{matched:l}=o.value,{length:h}=l,d=l[h-1],f=i.matched;if(!d||!f.length)return-1;const m=f.findIndex(Ct.bind(null,d));if(m>-1)return m;const b=Tn(l[h-2]);return h>1&&Tn(d)===b&&f[f.length-1].path!==b?f.findIndex(Ct.bind(null,l[h-2])):m}),r=ce(()=>n.value>-1&&pc(i.params,o.value.params)),s=ce(()=>n.value>-1&&n.value===i.matched.length-1&&Or(i.params,o.value.params));function a(l={}){return fc(l)?t[He(e.replace)?"replace":"push"](He(e.to)).catch(Ut):Promise.resolve()}return{route:o,href:ce(()=>o.value.href),isActive:r,isExactActive:s,navigate:a}}const hc=it({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Sn,setup(e,{slots:t}){const i=Ai(Sn(e)),{options:o}=We(xo),n=ce(()=>({[xn(e.activeClass,o.linkActiveClass,"router-link-active")]:i.isActive,[xn(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:i.isExactActive}));return()=>{const r=t.default&&t.default(i);return e.custom?r:Pr("a",{"aria-current":i.isExactActive?e.ariaCurrentValue:null,href:i.href,onClick:i.navigate,class:n.value},r)}}}),ui=hc;function fc(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function pc(e,t){for(const i in t){const o=t[i],n=e[i];if(typeof o=="string"){if(o!==n)return!1}else if(!Ce(n)||n.length!==o.length||o.some((r,s)=>r!==n[s]))return!1}return!0}function Tn(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const xn=(e,t,i)=>e??t??i,mc=it({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:i}){const o=We(ro),n=ce(()=>e.route||o.value),r=We(An,0),s=ce(()=>{let h=He(r);const{matched:d}=n.value;let f;for(;(f=d[h])&&!f.components;)h++;return h}),a=ce(()=>n.value.matched[s.value]);ai(An,ce(()=>s.value+1)),ai(uc,a),ai(ro,n);const l=Rs();return si(()=>[l.value,a.value,e.name],([h,d,f],[m,b,E])=>{d&&(d.instances[f]=h,b&&b!==d&&h&&h===m&&(d.leaveGuards.size||(d.leaveGuards=b.leaveGuards),d.updateGuards.size||(d.updateGuards=b.updateGuards))),h&&d&&(!b||!Ct(d,b)||!m)&&(d.enterCallbacks[f]||[]).forEach(j=>j(h))},{flush:"post"}),()=>{const h=n.value,d=e.name,f=a.value,m=f&&f.components[d];if(!m)return En(i.default,{Component:m,route:h});const b=f.props[d],E=b?b===!0?h.params:typeof b=="function"?b(h):b:null,M=Pr(m,$({},E,t,{onVnodeUnmounted:R=>{R.component.isUnmounted&&(f.instances[d]=null)},ref:l}));return En(i.default,{Component:M,route:h})||M}}});function En(e,t){if(!e)return null;const i=e(t);return i.length===1?i[0]:i}const Dr=mc;function gc(e){const t=ql(e.routes,e),i=e.parseQuery||lc,o=e.stringifyQuery||In,n=e.history,r=Wt(),s=Wt(),a=Wt(),l=Ps(Ke);let h=Ke;kt&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=Di.bind(null,y=>""+y),f=Di.bind(null,ac),m=Di.bind(null,_i);function b(y,T){let A,C;return Mr(y)?(A=t.getRecordMatcher(y),C=T):C=y,t.addRoute(C,A)}function E(y){const T=t.getRecordMatcher(y);T&&t.removeRoute(T)}function j(){return t.getRoutes().map(y=>y.record)}function M(y){return!!t.getRecordMatcher(y)}function R(y,T){if(T=$({},T||l.value),typeof y=="string"){const u=Ui(i,y,T.path),p=t.resolve({path:u.path},T),_=n.createHref(u.fullPath);return $(u,p,{params:m(p.params),hash:_i(u.hash),redirectedFrom:void 0,href:_})}let A;if("path"in y)A=$({},y,{path:Ui(i,y.path,T.path).path});else{const u=$({},y.params);for(const p in u)u[p]==null&&delete u[p];A=$({},y,{params:f(u)}),T.params=f(T.params)}const C=t.resolve(A,T),K=y.hash||"";C.params=d(m(C.params));const ee=bl(o,$({},y,{hash:nc(K),path:C.path})),c=n.createHref(ee);return $({fullPath:ee,hash:K,query:o===In?cc(y.query):y.query||{}},C,{redirectedFrom:void 0,href:c})}function H(y){return typeof y=="string"?Ui(i,y,l.value.path):$({},y)}function L(y,T){if(h!==y)return Rt(8,{from:T,to:y})}function q(y){return pe(y)}function oe(y){return q($(H(y),{replace:!0}))}function N(y){const T=y.matched[y.matched.length-1];if(T&&T.redirect){const{redirect:A}=T;let C=typeof A=="function"?A(y):A;return typeof C=="string"&&(C=C.includes("?")||C.includes("#")?C=H(C):{path:C},C.params={}),$({query:y.query,hash:y.hash,params:"path"in C?{}:y.params},C)}}function pe(y,T){const A=h=R(y),C=l.value,K=y.state,ee=y.force,c=y.replace===!0,u=N(A);if(u)return pe($(H(u),{state:typeof u=="object"?$({},K,u.state):K,force:ee,replace:c}),T||A);const p=A;p.redirectedFrom=T;let _;return!ee&&wl(o,C,A)&&(_=Rt(16,{to:p,from:C}),Oe(C,C,!0,!1)),(_?Promise.resolve(_):Re(p,C)).catch(g=>Ve(g)?Ve(g,2)?g:qe(g):G(g,p,C)).then(g=>{if(g){if(Ve(g,2))return pe($({replace:c},H(g.to),{state:typeof g.to=="object"?$({},K,g.to.state):K,force:ee}),T||p)}else g=ot(p,C,!0,c,K);return ze(p,C,g),g})}function Ie(y,T){const A=L(y,T);return A?Promise.reject(A):Promise.resolve()}function mt(y){const T=_t.values().next().value;return T&&typeof T.runWithContext=="function"?T.runWithContext(y):y()}function Re(y,T){let A;const[C,K,ee]=yc(y,T);A=zi(C.reverse(),"beforeRouteLeave",y,T);for(const u of C)u.leaveGuards.forEach(p=>{A.push(Ye(p,y,T))});const c=Ie.bind(null,y,T);return A.push(c),de(A).then(()=>{A=[];for(const u of r.list())A.push(Ye(u,y,T));return A.push(c),de(A)}).then(()=>{A=zi(K,"beforeRouteUpdate",y,T);for(const u of K)u.updateGuards.forEach(p=>{A.push(Ye(p,y,T))});return A.push(c),de(A)}).then(()=>{A=[];for(const u of ee)if(u.beforeEnter)if(Ce(u.beforeEnter))for(const p of u.beforeEnter)A.push(Ye(p,y,T));else A.push(Ye(u.beforeEnter,y,T));return A.push(c),de(A)}).then(()=>(y.matched.forEach(u=>u.enterCallbacks={}),A=zi(ee,"beforeRouteEnter",y,T),A.push(c),de(A))).then(()=>{A=[];for(const u of s.list())A.push(Ye(u,y,T));return A.push(c),de(A)}).catch(u=>Ve(u,8)?u:Promise.reject(u))}function ze(y,T,A){a.list().forEach(C=>mt(()=>C(y,T,A)))}function ot(y,T,A,C,K){const ee=L(y,T);if(ee)return ee;const c=T===Ke,u=kt?history.state:{};A&&(C||c?n.replace(y.fullPath,$({scroll:c&&u&&u.scroll},K)):n.push(y.fullPath,K)),l.value=y,Oe(y,T,A,c),qe()}let Pe;function Mt(){Pe||(Pe=n.listen((y,T,A)=>{if(!Yt.listening)return;const C=R(y),K=N(C);if(K){pe($(K,{replace:!0}),C).catch(Ut);return}h=C;const ee=l.value;kt&&El(mn(ee.fullPath,A.delta),ji()),Re(C,ee).catch(c=>Ve(c,12)?c:Ve(c,2)?(pe(c.to,C).then(u=>{Ve(u,20)&&!A.delta&&A.type===Qt.pop&&n.go(-1,!1)}).catch(Ut),Promise.reject()):(A.delta&&n.go(-A.delta,!1),G(c,C,ee))).then(c=>{c=c||ot(C,ee,!1),c&&(A.delta&&!Ve(c,8)?n.go(-A.delta,!1):A.type===Qt.pop&&Ve(c,20)&&n.go(-1,!1)),ze(C,ee,c)}).catch(Ut)}))}let gt=Wt(),se=Wt(),Q;function G(y,T,A){qe(y);const C=se.list();return C.length?C.forEach(K=>K(y,T,A)):console.error(y),Promise.reject(y)}function Ne(){return Q&&l.value!==Ke?Promise.resolve():new Promise((y,T)=>{gt.add([y,T])})}function qe(y){return Q||(Q=!y,Mt(),gt.list().forEach(([T,A])=>y?A(y):T()),gt.reset()),y}function Oe(y,T,A,C){const{scrollBehavior:K}=e;if(!kt||!K)return Promise.resolve();const ee=!A&&Cl(mn(y.fullPath,0))||(C||!A)&&history.state&&history.state.scroll||null;return sr().then(()=>K(y,T,ee)).then(c=>c&&xl(c)).catch(c=>G(c,y,T))}const ye=y=>n.go(y);let yt;const _t=new Set,Yt={currentRoute:l,listening:!0,addRoute:b,removeRoute:E,hasRoute:M,getRoutes:j,resolve:R,options:e,push:q,replace:oe,go:ye,back:()=>ye(-1),forward:()=>ye(1),beforeEach:r.add,beforeResolve:s.add,afterEach:a.add,onError:se.add,isReady:Ne,install(y){const T=this;y.component("RouterLink",ui),y.component("RouterView",Dr),y.config.globalProperties.$router=T,Object.defineProperty(y.config.globalProperties,"$route",{enumerable:!0,get:()=>He(l)}),kt&&!yt&&l.value===Ke&&(yt=!0,q(n.location).catch(K=>{}));const A={};for(const K in Ke)Object.defineProperty(A,K,{get:()=>l.value[K],enumerable:!0});y.provide(xo,T),y.provide(Eo,Yn(A)),y.provide(ro,l);const C=y.unmount;_t.add(y),y.unmount=function(){_t.delete(y),_t.size<1&&(h=Ke,Pe&&Pe(),Pe=null,l.value=Ke,yt=!1,Q=!1),C()}}};function de(y){return y.reduce((T,A)=>T.then(()=>mt(A)),Promise.resolve())}return Yt}function yc(e,t){const i=[],o=[],n=[],r=Math.max(t.matched.length,e.matched.length);for(let s=0;s<r;s++){const a=t.matched[s];a&&(e.matched.find(h=>Ct(h,a))?o.push(a):i.push(a));const l=e.matched[s];l&&(t.matched.find(h=>Ct(h,l))||n.push(l))}return[i,o,n]}function ku(){return We(Eo)}const _c="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABbmlDQ1BpY2MAACiRdZE7SwNBFIW/JIqvSAotRCwCRhFRCApiKRFMoxYxglGb7JpNhCQuuxtEbAUbC8FCtPFV+A+0FWwVBEERRCytfTUi6x1XSJBkltn7cWbOZeYM+CfzesGui0Kh6FiJeCw8l5oPN7zgp4kg3fSndducmplIUnN83uFT9XZQ9aq9r+poWcrYOvgahUd003KEx4QnVx1T8ZZwu55LLwkfCg9YckDhK6VrHj8rznr8rthKJsbBr3qGsxWsVbCeswrCfcKRQr6k/51H3SSYKc7OSO2U2YVNgjgxwmiUWCaPw6DUomRW3Rf99U2zIh5d/iZrWOLIkhPvgKgl6ZqRaoiekS/Pmsr9f562MTzkdQ/GoP7Jdd96oGEHvrdd9+vIdb+PIfAIF8Wyf0VyGv0QfbusRQ4gtAFnl2VN24XzTeh4MNNW+lcKyPQbBryeQmsK2m6gecHL6m+dk3tIrssTXcPePvTK/tDiDwXRaA2Tj7ixAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAKHpUWHRUaXRsZQAACJkzMjAy0TUw0jWwjPfJT893yy8KT00qzixJBQBVpwfYgxoUHwAAB8ZJREFUWEedV2tsW+UZfs7FdmzHaRI7beIkTS8QSjtEY0IiUlpWpm5FovsDq9CkTaObtu6ibT+GpmqdgA7BQJOmSSA6MfjJYANpXYs2AWuhRXQta5q0kLKULmltJ2luTuI4Tmyfc/a8x3ZsJ06G9kqfj893ed/ne+9Hweck6wk08/FFjp0cW2EhyGfQXlQwxF8ZfRxnON5TnkC4PKdSUv7XButxhKDiIAXu47OeAzBzJy0Og0Pm9Ny7aY8Rrh/n86jyJLpXZI5VAFi/RA00HOKOg3z6bEFmbpEChxJOvDawFn1TXqRMBV/fOIq9zZPZPQJIg4CLE9SLBPdr5TBi5eRo5SYjjznvrKowXufB/WTosoVbuUVCDidc+Mm5W/H2kB8jSSeGky6cvlmNVl8SG6rm81oQcsGBHbGEY/cNx20XPh4cH1kqS106EQrdde/hi5tPpAytAxkUBOeJAF7pb8CVaS88ugGHasGlmtSCipc4n0wXsZSzaR5RlI5YynlceC/hVgqg8+5Qm6oqr3dP+preiVaXgUetGgo+nfFQsIlicigmBmbdGKVGSs4R8PSCikRGayTv13Z0tG0vPre4taujrdawlJeJNmhZJo6F/UhnlruIxhs3e+aRNkvRJQ0Vt1QlEXCnS7XGbefGqzCVUkUTjQuG+nLrHR01RctZMkzlF4qitpmmaau1Z9KHT2Le5VogpgOtI2ipnMdcRrUFp+mEnXVxPL59EF6HkQUg2BkZPaOV+MPVemh8T2UI3pcOvbXn8qEidsC9HW2hBVM9bVrw5hfmyfj7tw3hh9ui2VArJoKKzLpwcrgG8bSGbdUJ3LN2Bi7dzArneiKl4Ti1ePTfQUwt6FAVi36p4JnQAB5omZilf+1kiPZI9EoY/QiK6oVVsKscuEQNWEaZWOW2Ju8Cvtmac+qiCBlLOvDOUC2O3fDj02kP+Qh+hRqw8OMtUextmpB9ldz9A47vKvd1bm+mg3RbihKAVTAe/QH17hRe3dWHGldmeTQUE28c540lL7x5vQ5RhqmQHBFz3lkziwO3jmBXw1QhT5gY5W9IZ/h8SVGVgGWWShANTFJ1Euc1FasAYCbpGa/Es5fX43Isa0HRWNCzgB00y/0NMXQEZuDUrUIiM+1za6ma3bphMbcr+bxaIJkRPxiec+H22jmUJd7k7+FaPH1pPcbmnXAyNLesmcO+5gnsCcawzpPK7iskppKzBLBLcG21rPLXEzNMpvSya8Lg2PUAjvS22EDv8sfxCNPx/VSzx2mUF1pMWZHbdN60abV99I/lk5x6f6gaR3paUEHP/+nWCB7eMAa3w8wKzUeN3DLvwcVClNzQEBQAQdHASlUpYy5ZIdNw3GXfvJbO+Vz7NbTVzZYKJkCJns+m3bg0WYlrcTcm6E+iKbG2RzPp2Gk0uFPBFfRbIEUpNQ8TFn7zcTNSZPbiPf34gj9RcmOT66ci1fgzo6GXwmeZJ+y8pBSUIRbPRYguPjDEFNmEFfzAUQxAVB9dg7NjVfjt3deWCR+MV+B3fU14b6Ta1pzUC5e2goGJSIMZFQAR8YOVosyjFxikmHpfudqAR28ZwY6G6RLhvROVOHRhI24kKlBBoZq2WuJY7Geikqj6FKW8B0j2qnGmcy/AqeFqTDMqvrH5Zklz8p8ZN37+r02IMmRFuIXV85aQyBTZKoWcKbddZpzMYoGKbHUzWYb/NFhnJ5VKl7F4RHzihStBhClcsl6+Dsl/CWNWP7tXyPB/qRRLCtRp3ecw/hFLqWOEVFfsBxYPeBwZ+CUN85b9MTcrZCW+1jJW4EFJo3MOXGDldOWEC+in2gawaU0Sw2zbrrJ3uMKa0M+ICNM8EgkumoeZd8yhmyf1tz+8FO5oD51QFfVRswiAZOY63t7vyprgJB3LJKgNLMPFVxGBMrLZNRu258d9aGCx6mIq7mqYsc2VYDRcmfLgLzcCeHckwMbGOn76XE9YzTF5npASKCJRnzQYFUwuJpVwYcIHt2bA5yioX55+NiAPUSsiWMwhS38cWIdvnbmdYws+o+Zk0sv2rZ09w1PtA/jV9muJamfmeWFhA/jg/MVuFp+jqlroPsQvO2nvbKXTMUQb66plO2YJ8XbfaR3Gk22D2EzAAly0l2DESLhKErKlWFishHuaJ19492zvRTm+mIiYnZ5OZJTdBBHKGKat+s5A3D6YoN2SZCj2ixFMvTdVYgZJNQ9tHMOXGyZZEStxneV4jilczLVzXVG4OiBN6kf8fSZ/dhHAqX/2TLIzOrBg4q0MtMZ2/xSCtKOgNnMeLHWhm6YoWx0pxMci1FU/ja7FlIdCuOr2ngh/v81OaCp/rKTjoyl62d0+4tWM6P5N44u5U1fskLE3n4j4kWSDWbZ45AUauZEX7rD/hzm3n8IvFx9Z1nh/+NHFDx5uuflgqCZ+3nZrCnIzubjpROIDffTkv0Vry7bsy8hOCBAw5zj2KUdwdumWsmx+9kakR9PNvWwcn+NrfI3HwDqGpDiXpM6X+oMYYkVcEYTMi2CFn2bCI4MHKLy33NaVqvAi2R+nDnzv8PlNXz0RCdQ7mUTmmRXvWzuFZ1mKPY6ch+Vrf+Hj9K98/v7//jhdSge/0rqe3wq7qYSdzFfbCKLxwaaJxsfuCKcZ0/nP80+Q/Tx///N+nv8XfYo4VjJ56aYAAAAASUVORK5CYII=",bc="data:image/svg+xml,%3csvg%20width='98'%20height='96'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.854%200C21.839%200%200%2022%200%2049.217c0%2021.756%2013.993%2040.172%2033.405%2046.69%202.427.49%203.316-1.059%203.316-2.362%200-1.141-.08-5.052-.08-9.127-13.59%202.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015%204.934.326%207.523%205.052%207.523%205.052%204.367%207.496%2011.404%205.378%2014.235%204.074.404-3.178%201.699-5.378%203.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283%200-5.378%201.94-9.778%205.014-13.2-.485-1.222-2.184-6.275.486-13.038%200%200%204.125-1.304%2013.426%205.052a46.97%2046.97%200%200%201%2012.214-1.63c4.125%200%208.33.571%2012.213%201.63%209.302-6.356%2013.427-5.052%2013.427-5.052%202.67%206.763.97%2011.816.485%2013.038%203.155%203.422%205.015%207.822%205.015%2013.2%200%2018.905-11.404%2023.06-22.324%2024.283%201.78%201.548%203.316%204.481%203.316%209.126%200%206.6-.08%2011.897-.08%2013.526%200%201.304.89%202.853%203.316%202.364%2019.412-6.52%2033.405-24.935%2033.405-46.691C97.707%2022%2075.788%200%2048.854%200z'%20fill='%23fff'/%3e%3c/svg%3e",Ur=e=>(Ns("data-v-1baf9ae8"),e=e(),Vs(),e),wc={class:"title"},kc=Ur(()=>ne("div",{class:"align-logo"},[ne("img",{class:"logo",src:_c,alt:"PG monogram logo"}),Et("Peter Gagliardi ")],-1)),vc=Ur(()=>ne("li",null,[ne("a",{href:"https://github.com/ptrgags"},[ne("img",{width:"32px",src:bc})])],-1)),Ic=it({__name:"Navbar",setup(e){return(t,i)=>(be(),dt("header",null,[ne("div",wc,[ie(He(ui),{to:"/"},{default:ut(()=>[kc]),_:1})]),ne("nav",null,[ne("ul",null,[ne("li",null,[ie(He(ui),{to:"/gallery"},{default:ut(()=>[Et("Gallery")]),_:1})]),ne("li",null,[ie(He(ui),{to:"/projects"},{default:ut(()=>[Et("Projects")]),_:1})]),vc])])]))}}),Ac=(e,t)=>{const i=e.__vccOpts||e;for(const[o,n]of t)i[o]=n;return i},Sc=Ac(Ic,[["__scopeId","data-v-1baf9ae8"]]),Tc={class:"content"},xc=it({__name:"App",setup(e){return(t,i)=>(be(),dt(ge,null,[ie(Sc),ne("div",Tc,[ie(He(Dr))])],64))}}),Ec="modulepreload",Cc=function(e){return"/"+e},Cn={},wt=function(t,i,o){let n=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),a=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));n=Promise.allSettled(i.map(l=>{if(l=Cc(l),l in Cn)return;Cn[l]=!0;const h=l.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":Ec,h||(f.as="script"),f.crossOrigin="",f.href=l,a&&f.setAttribute("nonce",a),document.head.appendChild(f),h)return new Promise((m,b)=>{f.addEventListener("load",m),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return n.then(s=>{for(const a of s||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},Rc={key:1},Pc=it({__name:"MaybeLink",props:{url:{}},setup(e){const t=e;return(i,o)=>{const n=dr("RouterLink");return t.url?(be(),ht(n,{key:0,to:t.url},{default:ut(()=>[qo(i.$slots,"default")]),_:3},8,["to"])):(be(),dt("span",Rc,[qo(i.$slots,"default")]))}}}),Oc=["src","alt"],jc=it({__name:"CardImage",props:{image:{}},setup(e){const t=e,i=ce(()=>t.image.size??"thumbnail"),o=ce(()=>`/assets/placeholder-${i.value}.png`),n=ce(()=>t.image.url?t.image.url:o.value),r=ce(()=>t.image.alt_text??"");function s(a){const l=a.target;l.src=o.value}return(a,l)=>(be(),ht(Pc,{url:t.image.link},{default:ut(()=>[ne("img",{src:n.value,alt:r.value,onError:s},null,40,Oc)]),_:1},8,["url"]))}}),Mc={class:"card-frame"},Bc={class:"card-text centered"},Fc=ne("br",null,null,-1),Rn=it({__name:"ThumbnailCard",props:{card:{}},setup(e){const t=e;return(i,o)=>{const n=dr("RouterLink");return be(),dt("div",Mc,[ie(jc,{image:t.card.thumbnail},null,8,["image"]),ne("div",Bc,[t.card.link?(be(),ht(n,{key:0,to:t.card.link},{default:ut(()=>[Et(jo(t.card.title),1)]),_:1},8,["to"])):ja("",!0),Fc,Et(" ("+jo(t.card.dates)+") ",1)])])}}}),Pt="https://assets.ptrgags.dev/file/ptrgags-website-assets";class zr{constructor(t){te(this,"id");te(this,"title");te(this,"years");te(this,"description");te(this,"github_url");te(this,"demo_url");te(this,"thumbnail");te(this,"card");te(this,"updates");this.id=t.id,this.title=t.title,this.years=t.years,this.demo_url=t.demo_link,this.description=t.description,this.updates=t.updates??[],this.github_url=t.github_repo?`https://github.com/ptrgags/${t.github_repo}`:void 0;const i=t.img_format,o=`${Pt}/project-thumbnails/${this.id}.${i}`;this.thumbnail={title:this.title,dates:this.years,link:this.url,sort_key:t.sort_key,thumbnail:{url:o,size:"thumbnail"},hide:t.hide,featured:t.featured};const n=`${Pt}/project-cards/${this.id}.${i}`;this.card={url:n,size:"card"}}get url(){return`/project/${this.id}`}}function U(e,t){return`${Pt}/project-updates/${e}/${t}`}const Hc={id:"hyperbolic-crochet",title:"Making of Hyperbolic Crochet",years:"2021-2023",sort_key:"2023-07-00:01",img_format:"jpg",description:`
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
        `}]},Vc={id:"math-notebook",title:"Math Notebook",years:"2024",sort_key:"2024-10-30:01",github_repo:"math-notebook",img_format:"png",description:`
    <p>
        A Rust project for me to explore mathematical ideas with code.
        More on this project at a later date. For now, enjoy some
        spooky math art for Halloween! 🎃👻
    </p>
  `},Dc={id:"next-1000-cards",title:"Next 1000 Cards",years:"2024",sort_key:"2024-11-11:01",description:`
    <p>A long-term project to draw 1000 more trading-card sized doodles.</p>
    <p>
        In recent months, I've revisited doodling with fountain pen on paper.
        During college, I was drawing often. See for example my 
        <a href="https://www.deviantart.com/ptrgags/gallery">DeviantArt gallery</a>.
    </p>
    <p>
        One of the key things that kept me drawing often was my art trading
        card binder. I would make trading-card sized artworks (2.5x3.5 inches)
        and store them in a binder with trading card sleeves. It was exciting
        to see the binder fill up over time. Somewhere in the lockdown years I
        reached the big milestone of drawing 1000 cards for my binder!
    </p>
    <p>
        After that, I put drawing on the shelf for a long while. However,
        a couple months ago I found myself using fountain pens again for
        journaling. I decied to doodle again, but more passively this time.
        I start most journaling sessions by making a doodle.
    </p>
    <p>
        A doodle a day quickly adds up to a large collection. It would
        be tedious to post every single card, and the quality of cards varies
        from day to day. Instead, I'll periodically post batches of my
        favorites.
    </p>
  `,img_format:"jpg",updates:[{title:"Accidental Inktober",date:"2024-10-31",description:`
        <p>
            While documenting this first batch of cards, I realized that I drew
            a lot of cards in october! On 10-01 I drew card #11. On 10-31 I drew
            card #42. That's 32 cards in total, a hair over 1 card per day!
        <p>
        <p>
            In the past years, I've done the <a href="https://inktober.com/">Inktober drawing challenge</a>.
            See my sketches from 
            <a href="https://www.deviantart.com/ptrgags/gallery/64663431/inktober-2017">2017</a> 
            and 
            <a href="https://www.deviantart.com/ptrgags/gallery/67366134/inktober-2018">2018</a> 
            for example.
            I find it amusing that I did the equivalent of an Inktober without
            intending to this year!
        </p>
      `,sort_key:"2024-10-31:01"}]},Uc={id:"holiday-shaders",title:"Holiday Shaders",years:"2016",sort_key:"2016-12-00:01",github_repo:"holiday-shaders",demo_link:"https://holiday.shaders.dev",description:`
    <p>
        In the middle of college, I found myself interested in graphics on
        the GPU. In particular, I found GLSL pixel shaders fascinating. I 
        learned a lot from <a href="https://thebookofshaders.com/">The Book of Shaders</a>,
        <a href="https://www.shadertoy.com/">ShaderToy</a>,
        <a href="https://iquilezles.org/articles/">Inigo Quilez's aticles</a>, 
        and other resources.
    </p>
    <p>
        Around the holidays that year, I used what I learned to make this
        creative project to share with friends and family.
    </p>
    <p>
        The following year, I made a better version of this project.
        See <a href="#/project/holiday-shaders2">Holiday Shaders 2</a>.
    </p>
  `,img_format:"png"},zc={id:"holiday-shaders2",title:"Holiday Shaders 2",years:"2017",sort_key:"2017-12-00:01",github_repo:"holiday-shaders2",demo_link:"https://holiday2.shaders.dev",description:`
      <p>
        The year after making <a href="#/project/holiday-shaders">Holiday Shaders</a>,
        I made this sequel. I added many new shaders, and a more polished UI.
      </p>
      <p>
        To allow great variation in the imagery, I found a neat trick.
        a hashing algorithm (in this case SHA-256) takes text of any length
        and produces a scrambled sequence of bytes of a fixed size. This means
        the user can type <em>any</em> text in the box and produce a sequence of
        numbers. These numbers are sent to the shader to control the shapes,
        colors and other settings.
      </p>
      <p>
        For the example artworks below, I chose various foods and items you 
        might find in a kitchen as the input words for the algorithm.
      </p>
    `,img_format:"png"},qc=[{id:"paper-toaster",title:"Paper Toaster",years:"2022-2024",sort_key:"2024-01-00:01",github_repo:"paper-toaster",img_format:"png",description:`
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
        `,github_repo:"stretchy-blocks",demo_link:"https://ptrgags.dev/stretchy-blocks"},Wc,Hc,Nc,Vc,Dc,Uc,zc],Gc=qc.map(e=>new zr(e));class Kc{constructor(t){te(this,"project_id");te(this,"id");te(this,"title");te(this,"date");te(this,"description");te(this,"url");te(this,"thumbnail");te(this,"card");te(this,"timeline_entry");this.id=t.id,this.project_id=t.project_id,this.title=t.title,this.date=t.date,this.description=t.description??t.timeline_desc,this.url=`/artwork/${this.project_id}/${this.id}`;const i=t.img_format,o=`${Pt}/artwork-thumbnails/${this.project_id}/${this.id}.${i}`,n=`${Pt}/artwork-cards/${this.project_id}/${this.id}.${i}`,r=t.sort_key;this.thumbnail={title:this.title,dates:this.date,link:this.url,sort_key:r,thumbnail:{url:o,size:"thumbnail"}},this.card={url:n,size:"card"},this.timeline_entry={sort_key:r,title:`Artwork: ${this.title}`,title_link:this.url,date:this.date,image:{url:o,size:"thumbnail"},description:t.timeline_desc}}}const $c=[{id:"2024-04-05_StarBow",title:"Star Bow",date:"2024-04-05",sort_key:"2024-04-05:01",project_id:"symmetry-sketchbook",timeline_desc:"An example parametric curve for my website. It has 5-fold rotation symmetry.",img_format:"png",description:`
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
    `}],Qc=[{id:"2022-06-27_TurtleDances",title:"Turtle Dances",date:"2022-06-27",sort_key:"2022-06-27:01",project_id:"paper-toaster",img_format:"png",timeline_desc:"Artwork inspired by a Bridges math art paper about turtle graphics. It modifies an integer sequence to compute turn angles",description:`
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
    `}],Jc=[{id:"2021-06-23_SeashellTexture",title:"Seashell Texture",date:"2021-06-23",sort_key:"2021-06-23:01",project_id:"p5-sketchbook",img_format:"png",timeline_desc:"A sketch that simulates the patterns on certain cone snail shells",description:`
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
    `}],Yc=[{id:"2024-10-30_GhostOctahedral",title:"Ghost Octahedral Tour",date:"2024-10-30",timeline_desc:"A ghost takes a spin around the octahedral rotation group.",description:`
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
        </p>`,sort_key:"2024-10-30:01",project_id:"math-notebook",img_format:"png"}],Xc=[{id:"2024-09-23_Card0003",title:"Card 3/1000",date:"2024-09-23",timeline_desc:"Yet another doodle.",sort_key:"2024-09-23:01",project_id:"next-1000-cards",img_format:"jpg"},{id:"2024-10-02_Card0012",title:"Card 12/1000",date:"2024-10-12",timeline_desc:`
        I was reading <cite><a href="https://www.google.com/books/edition/The_Algorithmic_Beauty_of_Plants/4F7lBwAAQBAJ?hl=en&gbpv=0">The Algorithmic Beauty of Plants</a></cite>
        around this time. This inspired the tree-shaped motifs.
    `,sort_key:"2024-10-02:01",project_id:"next-1000-cards",img_format:"jpg"},{id:"2024-10-12_Card0019",title:"Card 19/1000",date:"2024-10-12",timeline_desc:`
        This doodle inspired the "nacho" fractal I made in 
        <a href="#/project/math-notebook">Math Notebook</a>. I was trying to
        match the general structure of the classic
        <a href="https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle">Sierpiński triangle</a>
        fractal, but using curved triangles instead.
    `,sort_key:"2024-10-12:01",project_id:"next-1000-cards",img_format:"jpg"},{id:"2024-10-18_Card0027",title:"Card 27/1000",date:"2024-10-18",timeline_desc:"Yet another doodle.",sort_key:"2024-10-18:01",project_id:"next-1000-cards",img_format:"jpg"},{id:"2024-11-03_Card0044",title:"Card 44/1000",date:"2024-11-03",timeline_desc:"Yet another doodle.",sort_key:"2024-11-03:01",project_id:"next-1000-cards",img_format:"jpg"}],Zc=[{id:"2024-11-21_Toast",title:'Voronoi Doodle - "Toast"',date:"2024-11-21",timeline_desc:"A combination of a Voronoi diagram and my abstract doodles. This image was generated from the input text <kbd>Toast</kbd>.",description:`
        <p>
            This shader combined my typical geometric art style with
            <a href="https://en.wikipedia.org/wiki/Voronoi_diagram">Voronoi diagrams</a>.
            To make this shader, I created a collection of pattern fills that
            are directly inspired by patterns I draw on paper. These patterns
            are reused in a few different shaders in this collection.
        </p>
        </p>
            The input text for this artwork was <kbd>Toast</kbd>.
        <p>
    `,sort_key:"2024-11-21:01",project_id:"holiday-shaders2",img_format:"png"},{id:"2024-11-21_Pomegranate",title:'Shell - "Pomegranate"',date:"2024-11-21",timeline_desc:"A twisty pattern in polar coordinates generated from the input text <kbd>Pomegranate</kbd>.",description:`
        <p>
            This shader was a happy accident. I had originally intended to make
            a snowflake shape. However, halfway through, I had an image
            that looked like this. It made me think of spider webs, or the
            cross-section of a nautilus shell. This is why the shader was
            titled "Shell".
        </p>
        <p>
            The input text for this artwork was <kbd>Cup</kbd>.
        </p>
    `,sort_key:"2024-11-21:02",project_id:"holiday-shaders2",img_format:"png"},{id:"2024-11-21_Cup",title:'Mandala - "Cup"',date:"2024-11-21",timeline_desc:"Artistic pattern in polar coordinates generated from the input text <kbd>Cup</kbd>.",description:`
        <p>
            A common theme in many of these shaders is working in polar coordinates.
            This is one of the more intricate examples. Here I'm using the
            same collection of patterns from  <a href="#/artwork/holiday-shaders2/2024-11-21_Toast">Voronoi Doodle</a>
            and a few other shaders in Holiday Shaders 2. In this case, the
            patterns are bent into curved regions.
        </p>
        <p>
            The input text for this artwork was <kbd>Cup</kbd>.
        </p>
    `,sort_key:"2024-11-21:03",project_id:"holiday-shaders2",img_format:"png"},{id:"2024-11-21_Blueberry",title:'Liquid Metal - "Blueberry"',date:"2024-11-21",timeline_desc:"Fractal Brownian motion image generated from the input text <kbd>Blueberry</kbd>.",description:`
        <p>
            This shader was the result of trying out a tutorial on fractal 
            Brownian motion from <a href="https://thebookofshaders.com/13/">The 
            Book of Shaders</a>. Somehow (more by accident than intention), I
            found settings that looked like liquid metal.
        </p>
        <p>
            The input text for this artwork was <kbd>Blueberry</kbd>.
        </p>
    `,sort_key:"2024-11-21:04",project_id:"holiday-shaders2",img_format:"png"},{id:"2024-11-21_Eggshell",title:'Newton Mosaic - "Eggshell"',date:"2024-11-21",timeline_desc:"A fractal generated from the input text <kbd>Eggshell</kbd>.",description:`
        <p>
            In Holiday Shaders 2 I made a few different variations on the 
            <a href="https://en.wikipedia.org/wiki/Newton_fractal">Newton Fractal</a>
            technique. This "mosaic" style is by far my favorite one, as the
            shading feels most polished.
        </p>
        <p>
            The input text for this artwork was <kbd>Eggshell</kbd>.
        </p>
    `,sort_key:"2024-11-21:05",project_id:"holiday-shaders2",img_format:"png"}],eu=[...Qc,{id:"2024-02-04_BlueVelvetScarf",title:"Blue Velvet Scarf",date:"2024-02-04",sort_key:"2024-02-04:01",project_id:"blue-velvet-scarf",timeline_desc:"The finished scarf. In total, it took about a month and a half and 25 pattern repeats",img_format:"jpg",description:`
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
    `},...$c,...Jc,...Yc,...Xc,...Zc],qr=eu.map(e=>new Kc(e));function tu(){const e={};for(const t of qr){const i=t.project_id;e[i]===void 0&&(e[i]=[]),e[i].push(t)}return e}const vu=tu();function Pn(e,t){return t.sort_key.localeCompare(e.sort_key)}class iu extends zr{constructor(i){super({id:i.id,title:`${i.title} 🎵`,years:i.release_date,sort_key:i.sort_key,description:i.description,img_format:"png",featured:i.featured,hide:i.hide});te(this,"tracks");te(this,"play_style");te(this,"album_url");this.album_url=`${Pt}/music-albums/${this.id}`,this.tracks=i.tracks,this.play_style=i.play_style}get url(){return`/album/${this.id}`}get first_track(){return this.tracks[0]}get_track_url(i){return`${this.album_url}/${i.filename}`}}const ou={id:"boo",title:"boo.",release_date:"2020-10-31",sort_key:"2020-10-31:00",play_style:"advance",description:`
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
      `},{filename:"13_2020-10-21_13MinutesOfSpooky.flac",title:"13 minutes of spooky",date:"2020-10-21",description:"Made with a Roland System-1."},{filename:"14_2020-10-23_SirensCalling.flac",title:"Sirens Calling",date:"2020-10-23",description:"Made with a Roland System-1."}]},nu={id:"loops",title:"Loops",release_date:"2024-05-01",sort_key:"2024-05-01:00",description:`
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
      `}]},ru={id:"improvised-vol2",title:"Improvised Volume 2",release_date:"2021-10-31",sort_key:"2021-10-31:02",description:`
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
      `},{filename:"10_2021-10-25_SubterraneanMachines.flac",title:"Subterranean Machines",date:"2021-10-25",description:"They hum to themselves, but no one is around to hear..."},{filename:"11_2021-10-27_WailingSignal.flac",title:"Wailing Signal",date:"2021-10-27",description:"I made this with a guitar and an Arturia Microfreak."},{filename:"12_2021-10-27_WhatDoTheNumbersMean.flac",title:"What Do the Numbers Mean",date:"2021-10-27",description:"I don't even know..."},{filename:"13_2021-10-29_EntropyStones.flac",title:"Entropy Stones",date:"2021-10-29",description:"Experimenting with dice as a percussion instrument."},{filename:"14_2021-10-29_ExpandingUniverse.flac",title:"Expanding Universe",date:"2021-10-29",description:"<code>U n i v e r s e</code>"}]},su={id:"improvised-vol1",title:"Improvised Volume 1",release_date:"2021-10-31",sort_key:"2021-10-31:01",description:`
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
      `}]},au={id:"improvised-vol3",title:"Improvised Volume 3",release_date:"2024-07-15",sort_key:"2024-07-15:01",description:`
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
    `,tracks:[{filename:"01_2024-03-07_InclementWeather.flac",title:"Inclement Weather",date:"2024-03-07",description:"<i>The wind was howling outside, but inside it was nice and comfy.</i>"},{filename:"02_2024-03-09_DesolateSpaceport.flac",title:"Desolate Spaceport",date:"2024-03-09",description:"<i>You arrived to the asteroid spaceport 5 minutes too late. Next launch: two years from now...</i>"},{filename:"03_2024-03-09_HiddenCove.flac",title:"Hidden Cove",date:"2024-03-09",description:"<i>A hideout away from the waves</i>"},{filename:"04_2024-03-24_PleasantWhine.flac",title:"Pleasant Whine",date:"2024-03-24",description:"<i>It wasn't the words but the way it was said that had a nice ebb and flow.</i>"},{filename:"05_2024-03-24_SquareBells.flac",title:"Square Bells",date:"2024-03-24",description:"<i>They sound nice and are stackable too!</i>"},{filename:"06_2024-03-09_SleepInertia.flac",title:"Sleep Inertia",date:"2024-03-09",description:"<i>That awful feeling when you oversleep and wake up feeling disoriented</i>"},{filename:"07_2024-03-07_Punchy.flac",title:"Punchy",date:"2024-03-07",description:"<i>8-bit training montage anyone?</i>"},{filename:"08_2024-05-02_TimeMachine.flac",title:"Time Machine",date:"2024-05-02",description:"<i>Whether it goes forwards or backwards in time, no one knows...</i>"},{filename:"09_2024-05-07_SleepyEP.flac",title:"Sleepy EP",date:"2024-05-07",description:"<i>yawn</i>"},{filename:"10_2024-05-07_DeepEP.flac",title:"Deep EP",date:"2024-05-07",description:"<i>The piano was in the basement for so long it forgot how to play high notes</i>"},{filename:"11_2024-05-07_WobblyEP.flac",title:"Wobbly EP",date:"2024-05-07",description:"<i>The keys were just a blur</i>"},{filename:"12_2024-05-07_AnotherEP.flac",title:"Another EP",date:"2024-05-07",description:"<i>One more couldn't hurt</i>"},{filename:"13_2024-03-24_EchoEchoEcho.flac",title:"Echo Echo Echo",date:"2024-03-24",description:"<i>Enter the echoic chamber</i>"},{filename:"14_2024-03-24_Spontaneity.flac",title:"Spontaneity",date:"2024-03-24",description:"<i>Sometimes you need to have fun to change things up.</i>"},{filename:"15_2024-03-24_ElectricRaindrops.flac",title:"Electric Raindrops",date:"2024-03-24",description:"<i>pitter patter zap</i>"}],play_style:"advance"},lu={id:"rewind-and-ffwd",title:"REW/FFWD",release_date:"2024-07-15",sort_key:"2024-07-15:02",description:`
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
    `,tracks:[{filename:"01_2024-05-10_LeakyPipes.flac",title:"Leaky Pipes",date:"2024-05-10",description:"This was an experiment with driving the tape pretty hard so it distorts. Tape saturation has different characteristics than when digital audio clips."},{filename:"02_2024-05-10_SaturatedSines.flac",title:"Saturated Sines",date:"2024-05-10",description:'Again, I drove the audio hard to get that tape saturation sound. The sound is harsh, but a very unique texture. While editing, I realized that this sound reminds me of <a href="https://youtu.be/KkiJWsV-eDI">Desparately Safe</a> from the 2008 indie game OFF</a>.'},{filename:"03_2024-05-10_StringlikePlucks.flac",title:"Stringlike Plucks",date:"2024-05-10",description:'For some reason this track reminds me of <a href="https://en.wikipedia.org/wiki/Switched-On_Bach">Switched-on Bach</a> and other works by Wendy Carlos.'},{filename:"04_2024-05-16_SpaceBass.flac",title:"Space Bass",date:"2024-05-16",description:"This is a Korg Monologue... I think fed through a delay pedal? I don't quite remember. "},{filename:"05_2024-05-16_Quindicesima.flac",title:"Quindicesima",date:"2024-05-16",description:'Italian for "fifteenth." In sheet music, 15ma means play the music two octaves (a perfect 15th) above what is written. This is a fancy way of saying that I took the synth patch from the previous track and bumped it up 2 octaves.'},{filename:"06_2024-05-18_HauntedTownOfPurple.flac",title:"Haunted Town of Purple",date:"2024-05-18",description:'The percussion of an organ emulator I have reminds me a lot of a <a href="https://youtu.be/JNJJ-QkZ8cM">certain spooky tune</a> from a Pokémon game.'},{filename:"07_2024-05-18_FamiliarHaunts.flac",title:"Familiar Haunts",date:"2024-05-18",description:'Years ago I tried to learn the spooky tune <a href="https://youtu.be/MjkkKPqikdo">Dancing Calbrena</a> from Final Fantasy IV, but ended up making this hypnotic chord progression. But this is the first time I actually recorded it.'},{filename:"08_2024-06-07_RingMod.flac",title:"Ring Mod",date:"2024-06-07",description:"After studying the math of ring modulation and amplitude modulation, I realized that integer pitch ratios produce the most coherent results. This was my first experiment with that."},{filename:"09_2024-06-27_EWIRevisited.flac",title:"EWI Revisited",date:"2024-06-27",description:"I was organizing my things and found my electronic wind instrument (EWI). And somehow I found renewed joy for it. It lets me control my synths with a woodwind-like interface."},{filename:"10_2024-06-29_EWILead.flac",title:"EWI Lead",date:"2024-06-29",description:"I made a nicer lead synth patch to use with my EWI."},{filename:"11_2024-06-27_BluesyEWI.flac",title:"Bluesy EWI",date:"2024-06-27",description:"Here I'm using the chords mode of my MiniFreak, configured to a blues scale. I then controled the melody with my EWI."},{filename:"12_2024-06-28_ElectricLayers.flac",title:"Electric Layers",date:"2024-06-28",description:"This is a combination of an electric piano emulator layered with a synth connected via MIDI."},{filename:"13_2024-06-28_WurliArpeggiated.flac",title:"Wurli Arpeggiated",date:"2024-06-28",description:"After making the previous track, I realized that driving the wurli with the synth's arpeggiator I could make more intricate melodies."},{filename:"14_2024-06-29_HVACWhileAway.flac",title:"HVAC While Away",date:"2024-06-29",description:"<i>Oh the sounds that will play when the humans are away...</i>"},{filename:"15_2024-06-30_FourSquare.flac",title:"Four Square",date:"2024-06-30",description:"Square waves tuned to perfect fourths. If this was in a video game, this feels like it would be a good match for a tranquil temple setting."},{filename:"16_2024-07-01_Locrian5ths.flac",title:"Locrian 5ths",date:"2024-07-01",description:"This was a fun experiment: I took a synth patch tuned to perfect fifths but played only notes from the B Locrian mode. Technically this produces notes outside of the mode, but I think it made it more musical. Locrian is more difficult to work with compared with the other modes."},{filename:"17_2024-07-01_SubOrgan.flac",title:"Sub Organ",date:"2024-07-01",description:"I find the tape saturation helps add to the low-fi organ vibe."}],play_style:"advance"},cu=[ou,su,ru,nu,au,lu],uu=cu.map(e=>new iu(e)),du=ne("h1",{class:"centered"},"Featured Projects",-1),hu={class:"tableau"},fu=ne("h1",{class:"centered"},"Featured Artworks",-1),pu={class:"tableau"},mu=it({__name:"HomeView",setup(e){function t(n){const r=n.filter(a=>a.featured).sort(Pn),s=n.filter(a=>!a.featured).sort(Pn);return[...r,...s].slice(0,5)}const i=ce(()=>{const n=qr.map(r=>r.thumbnail).filter(r=>!r.hide);return t(n)}),o=ce(()=>{const n=Gc.map(a=>a.thumbnail),r=uu.map(a=>a.thumbnail),s=[...n,...r].filter(a=>!a.hide);return t(s)});return(n,r)=>(be(),dt(ge,null,[du,ne("div",hu,[(be(!0),dt(ge,null,zo(o.value,s=>(be(),ht(Rn,{key:s.sort_key,card:s},null,8,["card"]))),128))]),fu,ne("div",pu,[(be(!0),dt(ge,null,zo(i.value,s=>(be(),ht(Rn,{key:s.sort_key,card:s},null,8,["card"]))),128))])],64))}}),gu=gc({history:Ml(),routes:[{path:"/",name:"home",component:mu},{path:"/gallery",name:"gallery",component:()=>wt(()=>import("./GalleryView-H0xXLO2n.js"),[])},{path:"/artwork/:project_id/:artwork_id",name:"artwork",component:()=>wt(()=>import("./ArtworkView-DmsQHpZb.js"),[])},{path:"/projects",name:"projects",component:()=>wt(()=>import("./ProjectsView-DEzSoP3s.js"),[])},{path:"/project/:project_id",name:"project",component:()=>wt(()=>import("./ProjectView-K-1qbqPm.js"),__vite__mapDeps([0,1]))},{path:"/album/:album_id",name:"album",component:()=>wt(()=>import("./MusicAlbumView-_evq75Ln.js"),__vite__mapDeps([2,3]))},{path:"/library",name:"library",component:()=>wt(()=>import("./LibraryView-CNTYezTa.js"),[])}]}),Gr=fl(xc);Gr.use(gu);Gr.mount("#app");export{qr as A,ge as F,Gc as P,Rn as _,dt as a,ne as b,ce as c,it as d,ht as e,ie as f,jc as g,Et as h,ja as i,dr as j,_u as k,bu as l,uu as m,ho as n,be as o,Pc as p,Ac as q,zo as r,Pn as s,jo as t,ku as u,wu as v,ut as w,vu as x,Rs as y,si as z};
