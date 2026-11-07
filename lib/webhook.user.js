// ==UserScript==
// @name         Peace Multi-Site Webhook Monitor
// @namespace    https://github.com/chengchuu/webpack-build-demo
// @version      2026.1018.225156
// @description  Scan configured website messages and send new readable content to a webhook relay.
// @icon         https://i.mazey.net/icon/fav/logo-peace-circle-transparent-200x200.png
// @match        https://web.telegram.org/*
// @updateURL    https://raw.githubusercontent.com/chengchuu/webpack-build-demo/preview/lib/webhook.user.js
// @downloadURL  https://raw.githubusercontent.com/chengchuu/webpack-build-demo/preview/lib/webhook.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_addValueChangeListener
// @grant        unsafeWindow
// @connect      *
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./node_modules/.pnpm/mazey@5.10.1/node_modules/mazey/lib/index.esm.js
/*!
 * Mazey v5.10.1 https://github.com/chengchuu/mazey
 * (c) 2018-2026 Cheng
 * Released under the MIT License.
 */
function e(e){try{return Date.prototype.getTime.call(e)}catch(e){return null}}const t=/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/,n=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})$/;function r(e,t,n,r,o,i,s=0,c=!1){const u=new Date(0);return c?(u.setUTCFullYear(e,t-1,n),u.setUTCHours(r,o,i,s),Number.isFinite(u.getTime())&&u.getUTCFullYear()===e&&u.getUTCMonth()===t-1&&u.getUTCDate()===n&&u.getUTCHours()===r&&u.getUTCMinutes()===o&&u.getUTCSeconds()===i&&u.getUTCMilliseconds()===s):(u.setFullYear(e,t-1,n),u.setHours(r,o,i,s),Number.isFinite(u.getTime())&&u.getFullYear()===e&&u.getMonth()===t-1&&u.getDate()===n&&u.getHours()===r&&u.getMinutes()===o&&u.getSeconds()===i&&u.getMilliseconds()===s)}function o(e,t,n,r,o,i,s=0){const c=new Date(0);return c.setFullYear(e,t-1,n),c.setHours(r,o,i,s),c}function i(i){if("number"==typeof i){const e=new Date(i);return Number.isFinite(i)&&Number.isFinite(e.getTime())?e:null}if("object"==typeof i&&null!==i){const t=e(i);return null!==t&&Number.isFinite(t)?new Date(t):null}if("string"!=typeof i)return null;const s=i.trim();if(!s)return null;const c=t.exec(s);if(c){const[e,t,n,i="0",s="0",u="0"]=c.slice(1),[a,l,f,d,p,m]=[e,t,n,i,s,u].map(Number);return r(a,l,f,d,p,m)?o(a,l,f,d,p,m):null}const u=n.exec(s);if(!u)return null;const[a,l,f,d,p,m="0",g="",h]=u.slice(1),w=Number(`${g}00`.slice(0,3));if(!r(Number(a),Number(l),Number(f),Number(d),Number(p),Number(m),w,!0))return null;if("Z"!==h){const e=Number(h.slice(1,3)),t=Number(h.slice(4,6));if(e>23||t>59)return null}return function(e,t,n,r,o,i,s,c){const u=new Date(0);if(u.setUTCFullYear(e,t-1,n),u.setUTCHours(r,o,i,s),"Z"===c)return u;const a="+"===c[0]?1:-1,l=60*Number(c.slice(1,3))+Number(c.slice(4,6));return new Date(u.getTime()-a*l*60*1e3)}(Number(a),Number(l),Number(f),Number(d),Number(p),Number(m),w,h)}const s=/^(\d{4,})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$/;function c(e,t){const n=String(e);return n.length>=t?n:`${"0".repeat(t-n.length)}${n}`}function u(e){if("string"!=typeof e)return null;const t=s.exec(e);if(!t)return null;const[n,i,c,u,a,l="0",f=""]=t.slice(1),d=Number(n),p=Number(i),m=Number(c),g=Number(u),h=Number(a),w=Number(l),y=Number(`${f}00`.slice(0,3));return d<1||!r(d,p,m,g,h,w,y)?null:o(d,p,m,g,h,w,y)}function a(t,n={}){const r="object"==typeof t&&null!==t?e(t):null;if(null===r)throw new TypeError("date must be a Date");if(!Number.isFinite(r))throw new RangeError("Invalid date");const o=n.precision??"minute";if("minute"!==o&&"second"!==o&&"millisecond"!==o)throw new TypeError("precision must be minute, second, or millisecond");const i=new Date(r),s=i.getFullYear();if(s<1)throw new RangeError("Date year must be greater than zero");const u=[c(s,4),c(i.getMonth()+1,2),c(i.getDate(),2)].join("-"),a=[c(i.getHours(),2),c(i.getMinutes(),2)];"minute"!==o&&a.push(c(i.getSeconds(),2));let l=`${u}T${a.join(":")}`;return"millisecond"===o&&(l+=`.${c(i.getMilliseconds(),3)}`),l}function l(t,n){const r="number"==typeof t?t:"object"==typeof t&&null!==t?e(t):null,o=new Date(r??NaN),i="number"==typeof n?n<0?Math.ceil(n):Math.floor(n):NaN;if(!Number.isFinite(o.getTime())||!Number.isFinite(i))return new Date(NaN);if(0===i)return o;const s=o.getMonth(),c=o.getDate(),u=o.getFullYear()-i,a=new Date(o.getTime());a.setFullYear(u,s+1,0);return c>=a.getDate()?a:(o.setFullYear(u,s,c),o)}function f(){return Date.now()}const d=(/* unused pure expression or super */ null && ({type:"d"}));function p(e){return"string"==typeof e&&/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(e)?e.replace(" ","T"):e}function m(e=0,t=0,n=d){n=Object.assign({},d,n);const{type:r}=n;"number"==typeof e&&Number.isFinite(e)||(e=new Date(p(e)).getTime()),"number"==typeof t&&Number.isFinite(t)||(t=new Date(p(t)).getTime());const o=Number(t)-Number(e);let i="",[s,c,u,a]=new Array(4).fill(0);if(o>=0)switch(s=Math.floor(o/1e3/60/60/24),c=Math.floor(o/1e3/60/60),u=Math.floor(o/1e3/60),a=Math.floor(o/1e3),r){case"d":i=s;break;case"text":s=Math.floor(o/1e3/60/60/24),c=Math.floor(o/1e3/60/60%24),u=Math.floor(o/1e3/60%60),a=Math.floor(o/1e3%60),i=[{value:s,unit:"day"},{value:c,unit:"hour"},{value:u,unit:"minute"},{value:a,unit:"second"}].filter(({value:e})=>e>0).map(({value:e,unit:t})=>h(e,t)).join(" ")||h(0,"second");break;default:i=a}return i}function g(e=0,t=0,n=d){return m(e,t,n)}function h(e,t){const n=Math.round(10*e)/10;return`${n} ${1===n?t:`${t}s`}`}function w(e){const t=(Number.isFinite(e)?Math.max(e,0):0)/1e3;return t>=86400?h(t/24/60/60,"day"):t>=3600?h(t/60/60,"hour"):t>=60?h(t/60,"minute"):h(t,"second")}function y(e){return null!==i(e)}function b(e){const t=i(e);if(!t)return!1;const n=new Date;return t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()&&t.getDate()===n.getDate()}function v(e){const t=i(e);return null!==t&&t.getFullYear()===(new Date).getFullYear()}function E(e){const t=i(e);if(!t)return!1;const n=new Date;return t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()}function T(e){const t=i(e);if(!t)return!1;const n=new Date,r=(n.getDay()+6)%7;n.setHours(0,0,0,0),n.setDate(n.getDate()-r);const o=new Date(n.getTime());o.setDate(o.getDate()+7);const s=t.getTime();return s>=n.getTime()&&s<o.getTime()}function A(e){const t=i(e);if(!t)return!1;const n=new Date;return t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()&&t.getDate()===n.getDate()&&t.getHours()===n.getHours()}function S(e,t){const n=Math.max(1,Math.round(e));return`about ${n} ${t}${1===n?"":"s"}`}function $(e){const t=i(e);if(!t)return"";const n=6e4,r=36e5,o=864e5,s=Math.abs(t.getTime()-Date.now());return s<3e4?"less than a minute":s<9e4?"about 1 minute":s<27e5?S(s/n,"minute"):s<54e5?"about 1 hour":s<864e5?S(s/r,"hour"):s<1512e5?"about 1 day":s<30*o?S(s/o,"day"):s<45*o?"about 1 month":s<365*o?S(s/(30*o),"month"):s<545*o?"about 1 year":S(s/(365*o),"year")}function N(e,t="yyyy-MM-dd"){void 0===e&&(e=new Date);const n=new Date(e);if(!Number.isFinite(n.getTime()))throw new RangeError("Invalid date");const r=n.getHours(),o={yyyy:n.getFullYear(),MM:n.getMonth()+1,dd:n.getDate()<10?"0"+n.getDate():n.getDate(),HH:r<10?"0"+r:r,hh:(r%12||12)<10?"0"+(r%12||12):r%12||12,mm:n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes(),ss:n.getSeconds()<10?"0"+n.getSeconds():n.getSeconds(),a:r<12?"AM":"PM"};let i=t||"yyyy-MM-dd";return Object.keys(o).forEach(e=>{let t=o[e];"MM"===e&&Number(t)<=9&&(t=`0${t}`),i=i.split(e).join(String(t))}),i}function _(e){return N(void 0===e?new Date:new Date(e instanceof Date?e.getTime():e),"yyyy.MMdd.HHmmss").split(".").map(e=>String(Number(e))).join(".")}function x(e,t){if(!Number.isSafeInteger(e))throw new TypeError("width must be a safe integer.");if(!Number.isSafeInteger(t))throw new TypeError("height must be a safe integer.");if(e<=0||t<=0)throw new RangeError("width and height must be greater than zero.");const n=function(e,t){for(;0!==t;){const n=e%t;e=t,t=n}return e}(e,t);return`${e/n}x${t/n}`}function O(e,t,n){const r=i(e);if(!r)throw new TypeError("startDate must be a valid date.");const o=i(t);if(!o)throw new TypeError("endDate must be a valid date.");const s=o.getTime()-r.getTime();if(s<=0)throw new RangeError("endDate must be later than startDate.");const c=function(e){if("number"==typeof e){if(!Number.isFinite(e))throw new TypeError("totalReturnRate must be a finite number or percentage string.");return e}if("string"!=typeof e)throw new TypeError("totalReturnRate must be a finite number or percentage string.");const t=e.trim();if(!t)throw new TypeError("totalReturnRate must not be empty.");const n=t.endsWith("%")?t.slice(0,-1).trim():t;if(!n)throw new TypeError("totalReturnRate must be a valid percentage string.");const r=Number(n);if(!Number.isFinite(r))throw new TypeError("totalReturnRate must be a valid percentage string.");return r/100}(n);if(c<=-1)throw new RangeError("totalReturnRate must be greater than -1.");const u=s/864e5,a=Math.pow(1+c,365/u)-1;if(!Number.isFinite(a))throw new RangeError("calculated CAGR must be finite.");return a}function j(e,t){const n=e.length,r=t.length;if(0===n||0===r)return 0;const o=Array.from({length:n},()=>new Array(r).fill(0));let i=0;for(let s=0;s<n;++s)for(let n=0;n<r;++n)if(e[s]===t[n]){let e=0;s>0&&n>0&&(e=o[s-1][n-1]),o[s][n]=e+1,i=Math.max(i,o[s][n])}return i}function C(e,t){return j(e,t)}function M(e,t){const n=e.length,r=t.length;if(0===n||0===r)return 0;const o=Array.from({length:n},()=>new Array(r).fill(0));for(let i=0;i<n;++i)for(let n=0;n<r;++n)if(e[i]===t[n]){let e=0;i>0&&n>0&&(e=o[i-1][n-1]),o[i][n]=e+1}else{let[e,t]=[0,0];n>0&&(e=o[i][n-1]),i>0&&(t=o[i-1][n]),o[i][n]=Math.max(e,t)}return o[n-1][r-1]}function D(e,t){return M(e,t)}function k(e){return Math.random()<e}function F(e){return k(e)}function L(e){return k(e)}const R=Function.prototype.toString.call(Object);function z(e,t,n){const r=Object.getOwnPropertyDescriptor(t,n)?.get;if(!r)return!1;try{return r.call(e),!0}catch(e){return!1}}function P(e){return null===e||"object"!=typeof e?e:U(e,new WeakMap)}function U(t,n){if(null===t||"object"!=typeof t)return t;const r=t,o=n.get(r);if(void 0!==o)return o;const i=e(r);if(null!==i){const e=new Date(i);return n.set(r,e),e}const s=function(e){const t=Object.getOwnPropertyDescriptor(RegExp.prototype,"source")?.get;if(!t)return null;try{return t.call(e)}catch(e){return null}}(r);if(null!==s){const e=t,o=new RegExp(s,function(e){return e.flags}(e));return o.lastIndex=e.lastIndex,n.set(r,o),o}if("undefined"!=typeof ArrayBuffer&&z(r,ArrayBuffer.prototype,"byteLength")){const e=ArrayBuffer.prototype.slice.call(t,0);return n.set(r,e),e}if("undefined"!=typeof SharedArrayBuffer&&z(r,SharedArrayBuffer.prototype,"byteLength")){const e=SharedArrayBuffer.prototype.slice.call(t,0);return n.set(r,e),e}if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&ArrayBuffer.isView(t)){const e=U(t.buffer,n),o="undefined"!=typeof DataView&&z(r,DataView.prototype,"byteLength")?new DataView(e,t.byteOffset,t.byteLength):new t.constructor(e,t.byteOffset,t.length);return n.set(r,o),o}if("undefined"!=typeof Map&&z(r,Map.prototype,"size")){const e=new Map;return n.set(r,e),Map.prototype.forEach.call(t,(t,r)=>{e.set(U(r,n),U(t,n))}),e}if("undefined"!=typeof Set&&z(r,Set.prototype,"size")){const e=new Set;return n.set(r,e),Set.prototype.forEach.call(t,t=>{e.add(U(t,n))}),e}const c=Array.isArray(t),u=Object.getPrototypeOf(t),a=function(e){const t=Object.getPrototypeOf(e);if(null===t)return!0;const n=Object.hasOwn(t,"constructor")?t.constructor:null;return"function"==typeof n&&Function.prototype.toString.call(n)===R}(r),l=!c&&!a&&function(e){const t=Object.getPrototypeOf(e),n=t?.constructor;return"function"==typeof n&&-1===Function.prototype.toString.call(n).indexOf("[native code]")}(r);if(!c&&!a&&!l)return n.set(r,t),t;const f=c?new Array(t.length):Object.create(l?Object.prototype:u);return n.set(r,f),function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}(r).forEach(e=>{if(c&&"length"===e)return;const t=Object.getOwnPropertyDescriptor(r,e);t&&("value"in t&&(t.value=U(t.value,n)),Object.defineProperty(f,e,t))}),f}function I(e){return!e||"object"!=typeof e||Object.isFrozen(e)||(Object.freeze(e),Object.values(e).forEach(I)),e}function B(e,...t){return t.forEach(t=>{void 0!==t&&Object.keys(t).forEach(n=>{const r=t[n];if(void 0!==r){const t=e;"__proto__"!==n||Object.hasOwn(e,n)?t[n]=r:Object.defineProperty(e,n,{configurable:!0,enumerable:!0,value:r,writable:!0})}})}),e}function q(e){return P(e)}function Y(e){const t=e.replace(/([A-Z])/g,"-$1").toLowerCase();return"-"===t[0]?t.substring(1):t}function W(e){const t=e.replace(/-([a-z])/g,(e,t)=>t.toUpperCase());return t.endsWith("-")?t.slice(0,-1):t}function Z(e){return Y(e)}function H(e){const t=e.replace(/([A-Z])/g,"_$1").toLowerCase();return"_"===t[0]?t.substring(1):t}function V(e){return e.replace(/_([a-z])/g,(e,t)=>t.toUpperCase())}function J(e){return H(e)}function G(e){if("string"!=typeof e)throw new TypeError("value must be a string");const t=e.replace(/[^A-Za-z0-9_$]/g,"_").toUpperCase();return/^[A-Za-z_$]/.test(t)?t:`_${t}`}function Q(e){return e.trim()}function K(e){if("string"!=typeof e)return!1;try{return JSON.parse(e),!0}catch(e){}return!1}function X(e){return K(e)}function ee(e,t=null){try{return JSON.parse(e)}catch(e){return t}}function te(e=5){if(!Number.isFinite(e)||e<=0)return"";e=Math.floor(e);let t="";for(;e--;)t+=Math.floor(10*Math.random());return t}function ne(e=5){return te(e)}function re(e=3){const[t,n]=[Date.now(),ne(e||3)];return t+n}function oe(e=3){return re(e)}function ie(e,t=0){let n="";return n=t?(100*e).toFixed(t):String(Math.floor(100*e)),`${n}%`}function se(e,t=0){return parseFloat(String(e)).toFixed(t)}function ce(e,t,n={}){n=Object.assign({},n);let r=null,o=null,i=null,[s,c]=[null,0];const u=function(){c=!1===n.leading?0:Date.now(),i=null,s=e.apply(this,o),i||(r=o=null)};return function(...a){const l=Date.now();c||!1!==n.leading||(c=l);const f=t-(l-c);return r=this,o=a,f<=0||f>t?(i&&(clearTimeout(i),i=null),c=l,s=e.apply(r,o),i||(r=o=null)):i||!1===n.trailing||(i=setTimeout(u.bind(r),f)),s}}function ue(e,t,n){let r=null,o=null,i=null,s=null,c=null;const u=function(){const a=Date.now()-i;a<t&&a>=0?o=setTimeout(u,t-a):(o=null,n||(c=e.apply(r,s),o||(r=s=null)))};return function(...a){r=this,s=a,i=Date.now();const l=n&&!o;return o||(o=setTimeout(u,t)),l&&(c=e.apply(r,s),r=s=null),c}}function ae(e,t={}){const{isNaNAsNumber:n=!1,isInfinityAsNumber:r=!1,isUnFiniteAsNumber:o=!1,integer:i=!1,min:s,max:c}=t;return"number"==typeof e&&(!(!0!==r&&!0!==o&&!isFinite(e))&&(!(!n&&isNaN(e))&&((void 0===s||"number"==typeof s&&!Number.isNaN(s))&&((void 0===c||"number"==typeof c&&!Number.isNaN(c))&&(!(void 0!==s&&void 0!==c&&s>c)&&(!(!0===i&&!Number.isInteger(e))&&((void 0===s&&void 0===c||!Number.isNaN(e))&&!(void 0!==s&&e<s||void 0!==c&&e>c))))))))}function le(e,...t){let n=null;return e&&"function"==typeof e&&(n=e(...t)),n}function fe(e,...t){return le(e,...t)}function de(e){let t=!1;return Array.isArray(e)&&e.length&&(t=!0),t}function pe(e){const t=Boolean(e),n="object"==typeof e,r="[object Object]"===Object.prototype.toString.call(e);return t&&n&&r}function me(e){return"function"==typeof e}function ge(e){return"string"==typeof e}function he(e){return"boolean"==typeof e}function we(e){return he(e)}function ye(e){return null==e}function be(e){return ye(e)}function ve(e){return"[object Array]"===Object.prototype.toString.call(e)}function Ee(e){return!!pe(e)&&0!==Object.keys(e).length}function Te(e){if(!e)return"";const t=new RegExp("\\n","g");return e.replace(t,"<br />")}function Ae(e){return Te(e)}function Se(e,t={}){const{removeNewLine:n=!1}=t;let r="";return e&&(r=e.replace(/<\/?.+?>/g,""),n&&(r=r.replace(/[\r\n]/g,""))),r}function $e(e,t={}){return Se(e,t)}function Ne(e,t={}){return Se(e,t)}function _e(e,t={}){return Se(e,t)}function xe(e,t={}){if("string"!=typeof e)throw new TypeError("value must be a string.");const n=t.preserveEntities?/&(?!(?:#[0-9]+|#x[0-9a-f]+|[a-z][a-z0-9]+);)/gi:/&/g,r={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return e.replace(n,"&amp;").replace(/[<>"']/g,e=>r[e])}function Oe(e){const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"};if("string"!=typeof e)throw new Error("Input must be a string");return e.replace(/[&<>"'/]/g,e=>t[e])}const je=(/* unused pure expression or super */ null && (Oe));function Ce(e){const t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#x27;":"'","&#x2F;":"/"};if("string"!=typeof e)throw new Error("Input must be a string");return e.replace(/(&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;)/g,e=>t[e])}const Me=(/* unused pure expression or super */ null && (Ce));function De(e){return Ce(e)}function ke(e,t,n={hasDot:!1,dotText:"..."}){if(n=Object.assign({hasDot:!1,dotText:"..."},n),""!=e&&e){let r=0,o="";const i=/[^\x00-\xff]/g;let s="";const c=e.replace(i,"**").length;for(let n=0;n<c&&(s=e.charAt(n).toString(),null!=s.match(i)?r+=2:r++,!(r>t));n++)o+=s;return n.hasDot&&c>t&&(o+=n.dotText),o}return""}const Fe=(/* unused pure expression or super */ null && (ke));function Le(e,t,n=!1){return ke(e,t,{hasDot:n})}function Re(e,t,n=!1){return Le(e,t,n)}function ze(e,t={validStatusRange:[200,300],validCode:[0]}){const n=t||{},{validStatusRange:r=[200,300],validCode:o=[0]}=n;2!==r.length&&console.error("valid validStatusRange is required");let i=!1;if(e&&e.status&&2===r.length&&e.status>=r[0]&&e.status<r[1]){const t=e.data;t&&o.includes(t.code)&&(i=!0)}return i}function Pe(e,t,n){if(null===e||"object"!=typeof e)return!1;let r=e;for(const e of t){if(null===r||"object"!=typeof r&&"function"!=typeof r||!Object.hasOwn(r,e))return!1;r=r[e]}return r===n}const Ue=(/* unused pure expression or super */ null && (["B","KB","MB","GB","TB"]));function Ie(e,t={}){const{base:n=1024,fractionDigits:r=1,invalidValue:o=""}=t;if(!Number.isFinite(e)||e<0||1e3!==n&&1024!==n||!Number.isInteger(r)||r<0||r>20)return o;let i=e,s=0;for(;i>=n&&s<Ue.length-1;)i/=n,s+=1;return 0===s?`${Number(i.toFixed(r))} ${Ue[s]}`:`${i.toFixed(r)} ${Ue[s]}`}function Be(e,t={}){return Ie(e,t)}function qe(e){let t,n,r=0;for(t=0;t<e.length;t++)n=e.charCodeAt(t),r=(r<<5)-r+n,r|=0;return r}async function Ye(e){const t="undefined"==typeof crypto?null:crypto;if(!t?.subtle||"function"!=typeof t.subtle.digest)throw new Error("Web Crypto API is not available.");let n=e;if("string"==typeof e){if("undefined"==typeof TextEncoder)throw new Error("TextEncoder is not available.");n=(new TextEncoder).encode(e)}const r=await t.subtle.digest("SHA-256",n);let o="";const i=new Uint8Array(r);for(let e=0;e<i.length;e++){const t=i[e].toString(16);o+=1===t.length?`0${t}`:t}return o}function We(e){return/^1\d{10}$/.test(e)}const Ze=(/* unused pure expression or super */ null && (We)),He=(/* unused pure expression or super */ null && (We));function Ve(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}function Je(e){if(!Number.isFinite(e)||e<=0)return"";e=Math.floor(e);let t="";for(;e>0;){let n=e%26;0===n&&(n=26),t=String.fromCharCode(n+96)+t,e=(e-n)/26}return t}function Ge(){return"v4"}function Qe(e,t={},n=e=>!0===e){const{interval:r=1e3,times:o=10,context:i,args:s}=t;if("function"!=typeof e)return void console.error("Expected a function.");if(!Number.isFinite(r)||r<0)return void console.error("Expected a non-negative number for interval.");if(!Number.isFinite(o)||o<0)return void console.error("Expected a non-negative number for times.");if(0===o)return;let c=0;const u=()=>{setTimeout(async()=>{const t=await e.apply(i,s);n(t)||++c>=o||u()},r)};u()}async function Ke(e){return new Promise(t=>{setTimeout(()=>{t(e)},e)})}async function Xe(e){return Ke(e)}let et="";function tt(){if(et)return"browser"===et;const e="undefined"!=typeof window;return e&&(et="browser"),e}function nt(e,t){const n=e[t];if(void 0!==n&&"string"!=typeof n)throw new TypeError(`manifest.${t} must be a string when provided`);return n}function rt(e){if(void 0===e)return{name:""};if("string"==typeof e)return{name:e.trim()};if(null===e||"object"!=typeof e||Array.isArray(e))throw new TypeError("manifest.author must be a string or object");const t=e,n={name:""};for(const e of["name","email","url"]){const r=t[e];if(void 0!==r&&"string"!=typeof r)throw new TypeError(`manifest.author.${e} must be a string when provided`);if("string"==typeof r){const t=r.trim();("name"===e||t)&&(n[e]=t)}}return n}function ot(e,t={}){if(null===e||"object"!=typeof e||Array.isArray(e))throw new TypeError("manifest must be an object");if(null===t||"object"!=typeof t||Array.isArray(t))throw new TypeError("options must be an object when provided");const n=e;if("string"!=typeof n.name||!n.name.trim())throw new TypeError("manifest.name must be a non-empty string");const r=n.name.trim(),o=function(e){if(/\s/.test(e))throw new TypeError("manifest.name must not contain whitespace");if(e.startsWith("@")){const t=e.split("/");if(2!==t.length||t[0].length<2||!t[1])throw new TypeError("manifest.name must be a valid scoped package name");return t[1]}if(e.includes("/"))throw new TypeError("manifest.name must be an unscoped or scoped package name");return e}(r),i=t.packageManager??"npm";if("npm"!==i&&"pnpm"!==i&&"yarn"!==i)throw new TypeError('packageManager must be "npm", "pnpm", or "yarn"');const s="npm"===i?"npm install":`${i} add`;return{name:r,version:nt(n,"version"),description:nt(n,"description"),license:nt(n,"license"),author:rt(n.author),unscopedName:o,iifeGlobal:G(o),installCommand:`${s} ${r}`}}function it(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}}function st(e){const t=e.indexOf("#"),n=-1===t?e:e.slice(0,t),r=n.indexOf("?"),o=/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(n)||"/"===n.charAt(0),i=-1===r?o?"":n:n.slice(r+1);return i?i.split("&").reduce((e,t)=>{if(!t||-1===t.indexOf("="))return e;const n=t.indexOf("=");return e.push([it(t.slice(0,n)),it(t.slice(n+1))]),e},[]):[]}function ct(e,t){return st(e).filter(([e])=>e===t).map(([,e])=>e)}const ut=/^(?=.{1,39}$)(?!.*--)[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/,at=/^(?=.{1,100}$)(?!\.{1,2}$)[A-Za-z0-9_.-]+$/;function lt(){return new Error("The value does not identify one supported GitHub repository")}function ft(e,t){const n=t.replace(/\.git$/i,"");if(!ut.test(e)||!at.test(n))throw lt();const r=`${e}/${n}`;return{owner:e,name:n,slug:r,url:`https://github.com/${r}`}}function dt(e){if("string"!=typeof e)throw new TypeError("value must be a string");const t=e.trim();if(!t||/[%\\?#]/.test(t)||function(e){for(let t=0;t<e.length;t++){const n=e.charCodeAt(t);if(n<=31||127===n)return!0}return!1}(t))throw lt();const n=t.match(/^(?:github:)?([^/:\s]+)\/([^/\s]+)$/i);if(n)return ft(n[1],n[2]);const r=t.match(/^git@([^:\s]+):([^/\s]+)\/([^/\s]+)$/);if(r&&"github.com"===r[1].toLowerCase())return ft(r[2],r[3]);const o=t.replace(/^git\+(?=(?:git|ssh|https?):\/\/)/i,""),i=o.match(/^[a-z][a-z\d+.-]*:\/\/([^/?#]+)/i);if(!i||/(^|\/)\.{1,2}(?:\/|$)/.test(o.slice(i[0].length)))throw lt();if(-1!==i[1].slice(i[1].lastIndexOf("@")+1).indexOf(":"))throw lt();let s;try{s=new URL(o)}catch(e){throw lt()}const c=s.protocol.toLowerCase(),u=s.hostname.toLowerCase().replace(/^www\./,"");if(!["git:","ssh:","http:","https:"].includes(c)||"github.com"!==u||""!==s.username&&"git"!==s.username||""!==s.password||""!==s.search||""!==s.hash)throw lt();const a=s.pathname.match(/^\/([^/]+)\/([^/]+)\/?$/);if(!a)throw lt();return ft(a[1],a[2])}function pt(e){return ct(location.search,e)[0]||""}function mt(e=""){""===e&&(e=location.search);const t={};return st(e).forEach(([e,n])=>{Object.hasOwn(t,e)||Object.defineProperty(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0})}),t}function gt(e,t,n={}){const r=ct(e,t);return n.returnArray?r:r.length?r[0]:null}function ht(e,t,n){const r=e.indexOf("#"),o=-1===r?"":e.slice(r),i=-1===r?e:e.slice(0,r),s=i.indexOf("?"),c=-1===s?i:i.slice(0,s),u=-1===s?"":i.slice(s+1),a=encodeURIComponent(t),l=encodeURIComponent(n);let f=!1;const d=(u?u.split("&").filter(Boolean):[]).reduce((e,n)=>{const r=n.indexOf("=");return it(-1===r?n:n.slice(0,r))===t?f||(e.push(`${a}=${l}`),f=!0):e.push(n),e},[]);return f||d.push(`${a}=${l}`),`${c}?${d.join("&")}${o}`}function wt(e){const t=location.hash.split("?");return 1===t.length?"":ct(`?${t.slice(1).join("?")}`,e)[0]||""}function yt(e,t=["hostname"]){try{const n=new URL(e,document.baseURI);return t.reduce((e,t)=>e+=n[t],"")}catch(n){const r=document.createElement("a");return r.href=e,t.reduce((e,t)=>e+=r[t],"")}}function bt(e){return/^[a-zA-Z0-9]+:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\b([-a-zA-Z0-9\u4E00-\u9FA5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b()!@:%_+.~#?&//=]*)$/.test(e)}function vt(e){return void 0===e||Number(e)<=65535}function Et(e){const t=e.split(".");return 4===t.length&&t.every(e=>/^\d{1,3}$/.test(e)&&(1===e.length||"0"!==e.charAt(0))&&Number(e)<=255)}function Tt(e){const t=e.split("::");if(t.length>2)return!1;const n=2===t.length;let r=[];t.forEach(e=>{e&&(r=r.concat(e.split(":")))});let o=0;for(let e=0;e<r.length;e++){const t=r[e];if(-1!==t.indexOf(".")){if(e!==r.length-1||!Et(t))return!1;o+=2}else{if(!/^[0-9a-f]{1,4}$/i.test(t))return!1;o+=1}}return n?o<8:8===o}function At(e){const t=e.match(/^\[([0-9a-f:.]+)\]$/i);if(t)return Tt(t[1]);if("."===e.charAt(e.length-1)&&(e=e.slice(0,-1)),Et(e))return!0;const n=e.split(".");return!(n.length<2||n.some(e=>!e||!/^[a-z\d-]+$/i.test(e)||"-"===e.charAt(0)||"-"===e.charAt(e.length-1)))&&!/^\d+$/.test(n[n.length-1])}function St(e,t={strict:!0}){if("string"!=typeof e||!e||e.trim()!==e)return!1;const n=/^https?:\/\/[^/\\]/i.test(e),r=/^\/\/[^/\\]/.test(e);if(!n&&(t.strict||!r))return!1;const o=r?`http:${e}`:e;if(!function(e){const t=e.match(/^https?:\/\/([^/?#]+)(?:[/?#][^\s<>"`]*)?$/i);if(!t||-1!==t[1].indexOf("@"))return!1;const n=t[1],r=n.match(/^\[([0-9a-f:.]+)\](?::(\d*))?$/i);if(r)return Tt(r[1])&&vt(r[2]);const o=n.match(/^([^:]+)(?::(\d*))?$/);return!(!o||!vt(o[2]))&&At(o[1])}(o))return!1;try{const e=new URL(o);return("http:"===e.protocol||"https:"===e.protocol)&&At(e.hostname)&&!e.username&&!e.password}catch(e){return!1}}function $t(e){let t="";if("string"!=typeof e||""==e)return t;const n=e.split(/[?#]/,1)[0],r=/\.[^/]+$/.exec(n);return r?(r[0].length>1&&(t=r[0].substring(1)),t):t}const Nt=(/* unused pure expression or super */ null && ($t));function _t(e,t=""){t||(t=".js");const n=document.querySelectorAll("script[src]");for(let r=0;r<n.length;r++){const o=n[r].getAttribute("src");if(o&&-1!==o.indexOf(t)){const t=ct(o,e)[0];if(void 0!==t)return t}}return""}function xt(e){return e&&0===Object.keys(e).length?"":`?${Object.keys(e).map(t=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join("&")}`}function Ot(e){return e.replace(/^http:/,"https:")}function jt(e){return Ot(e)}function Ct(e){!St(e)&&St(e,{strict:!1})&&e.startsWith("//")&&(e="https:"+e);try{return new URL(e).host}catch(e){return""}}function Mt(e){!St(e)&&St(e,{strict:!1})&&e.startsWith("//")&&(e="https:"+e);try{return new URL(e).pathname}catch(e){return""}}function Dt(e,t={}){const{fireOnInit:n=!0}=t,r=history;let o=location.href;const i=[],s=t=>{const n=location.href;if(n===o&&"load"!==t)return;const r=o;o=n,e({url:n,oldUrl:r,trigger:t})},c=()=>s("popstate"),u=()=>s("hashchange");window.addEventListener("popstate",c),window.addEventListener("hashchange",u),i.push(()=>window.removeEventListener("popstate",c)),i.push(()=>window.removeEventListener("hashchange",u)),r.__mazeyUrlChangePatched__||(r.__mazeyUrlChangePatched__=!0,r.__mazeyUrlChangeSubscribers__=new Set,r.__mazeyRawPushState__=history.pushState.bind(history),r.__mazeyRawReplaceState__=history.replaceState.bind(history),history.pushState=function(...e){r.__mazeyRawPushState__(...e),r.__mazeyUrlChangeSubscribers__.forEach(e=>e("pushState"))},history.replaceState=function(...e){r.__mazeyRawReplaceState__(...e),r.__mazeyUrlChangeSubscribers__.forEach(e=>e("replaceState"))});const a=e=>s(e);return r.__mazeyUrlChangeSubscribers__.add(a),i.push(()=>r.__mazeyUrlChangeSubscribers__.delete(a)),n&&s("load"),()=>{i.forEach(e=>e())}}const kt={enabled:!0,isClosed:!1,showWrap:!1,showDate:!1,locales:"en-US",isStringifyObject:!1,logFn:()=>{},errorFn:()=>{}};function Ft(e="",t={...kt}){const{enabled:n,isClosed:r,showWrap:o,showDate:i,locales:s,isStringifyObject:c,logFn:u,errorFn:a}=Object.assign({...kt},t);let l=n;!0===r&&(Lt.warn("The options.isClosed is deprecated. Please use options.enabled instead."),l=!1);const f=Object.create(null),d=()=>(new Date).toLocaleDateString(s,{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"});return["log","info","warn","error"].forEach(t=>{f[t]=function(...n){if(!l)return;let r=e,s=e;if("string"==typeof e&&e.length>=2){const t=e.length;r=":"===e[t-1]?e.substring(0,t-1):e}o&&console.log(`--- ${r} - begin ---`),i&&(s=e?`${d()} ${e}`:`${d()}`),c&&(n=n.map(e=>pe(e)?JSON.stringify(e):e)),e||i?console[t](s,...n):console[t](...n),"log"===t&&u(),"error"===t&&a(),o&&console.log(`--- ${r} - end ---`)}}),f}const Lt=Ft("[Mazey]"),Rt=Ft("",{showDate:!0,locales:"zh-CN",isStringifyObject:!0});function zt(e,t){if(!e)return Lt.error("The element is not exist."),!1;const n=e.className.split(/\s+/);for(let e=0;e<n.length;e++)if(n[e]===t)return!0;return!1}function Pt(e,t){if(!e)return void Lt.error("The element is not exist.");if(Array.isArray(t))return void t.forEach(t=>{t&&e.classList.add(t)});if(!t)return;const n=e.className,r=n.split(/\s+/);for(let e=0;e<r.length;e++)if(r[e]===t)return;let o="",i="";""!==n&&(o=" "),i=n+o+t,e.className=i}function Ut(e,t){Pt(e,t)}function It(e,t){if(!e)return void Lt.error("The element is not exist.");let n;n=" "+e.className+" ",n=n.replace(/(\s+)/gi," "),n=n.replace(" "+t+" "," "),n=n.replace(/(^\s+)|(\s+$)/g,""),e.className=n}function Bt(e,t={id:""}){if(!e)return!1;const n=document.createDocumentFragment();let r=null,o="";const i=document.createElement("style");return t.id?(o=`${t.id}`,r=document.getElementById(o),r?r.innerHTML=e:(i.setAttribute("id",t.id),i.innerHTML=e,n.appendChild(i),document.head.appendChild(n))):(i.innerHTML=e,n.appendChild(i),document.head.appendChild(n)),!0}const qt=(/* unused pure expression or super */ null && (Bt));function Yt(){const e=window.jQuery||window.$;if(e){const t=e("img");return!(!t||!t.length)&&(t.each(function(){const t=e(this);if(!t)return;const n=t.attr("src");if(!(n&&"string"==typeof n&&n.length))return;const r=n.match(/[?&]width=([0-9]+[a-z%]*)/),o=n.match(/[?&]height=([0-9]+[a-z%]*)/);r&&de(r)&&r[1]&&t.width(r[1]),o&&de(o)&&o[1]&&t.height(o[1])}),!0)}{const e=document.getElementsByTagName("img");if(e.length>0)return Array.from(e).forEach(function(e){const t=e;if(!t)return;const n=t.getAttribute("src");if(!(n&&"string"==typeof n&&n.length))return;const r=n.match(/[?&]width=([0-9]+[a-z%]*)/),o=n.match(/[?&]height=([0-9]+[a-z%]*)/);r&&de(r)&&r[1]&&(t.style.width=r[1]),o&&de(o)&&o[1]&&(t.style.height=o[1])}),!0}return!1}function Wt(){return Yt()}function Zt(e,t){let n="";return t&&t.length>0&&(n=t.join(";")+";"),`${e}{${n}}`}const Ht=(/* unused pure expression or super */ null && (Zt));function Vt(e){const t=document.getElementsByTagName("meta");for(let n=0;n<t.length;n++)if(t[n].getAttribute("name")===e)return t[n].getAttribute("content")||"";return""}function Jt(e,t={}){if("string"!=typeof e)return!1;const n=e.trim();if(!n)return!0===t.allowEmpty;const r=t.root||("undefined"==typeof document?null:document);if(!r)return!1;try{return r.querySelector(n),!0}catch(e){return!1}}function Gt(e){return Boolean(e&&"object"==typeof e&&1===e.nodeType&&"string"==typeof e.nodeName&&"function"==typeof e.getAttribute)}const Qt=new WeakMap,Kt=new WeakMap,Xt=(/* unused pure expression or super */ null && ({button:"inline-block",input:"inline-block",select:"inline-block",textarea:"inline-block",table:"table",caption:"table-caption",colgroup:"table-column-group",col:"table-column",thead:"table-header-group",tbody:"table-row-group",tfoot:"table-footer-group",tr:"table-row",td:"table-cell",th:"table-cell",li:"list-item",summary:"list-item"})),en=new Set(["address","article","aside","blockquote","body","dd","details","dialog","div","dl","dt","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","main","nav","ol","p","pre","section","ul"]);function tn(e){if(!Gt(e))return null;const t=e.style;return t&&"string"==typeof t.display?e:null}function nn(e){const t=new Set,n=e=>{const n=tn(e);n&&t.add(n)};if("string"==typeof e){if("undefined"==typeof document)return[];try{document.querySelectorAll(e).forEach(n)}catch(e){return[]}return Array.from(t)}const r=tn(e);if(r)return[r];if(!e||"object"!=typeof e)return[];if("function"==typeof e[Symbol.iterator]){for(const t of e)n(t);return Array.from(t)}const o=e.length;if(!Number.isSafeInteger(o)||o<0)return[];for(let t=0;t<o;t+=1)n(e[t]);return Array.from(t)}function rn(e){const t=e.ownerDocument.defaultView;return t?t.getComputedStyle(e).display:null}function on(e){const t=e.ownerDocument,n=e.localName.toLowerCase();let r=Kt.get(t);r||(r=new Map,Kt.set(t,r));const o=e.namespaceURI||"",i=`${o}:${n}`,s=r.get(i);if(s)return s;let c="";const u="http://www.w3.org/1999/xhtml"===o&&n.includes("-"),a=t.body||t.documentElement;if(a&&!u){const e=o&&"http://www.w3.org/1999/xhtml"!==o?t.createElementNS(o,n):t.createElement(n);a.appendChild(e);try{c=rn(e)||""}finally{a.removeChild(e)}}return c&&"none"!==c||(c=function(e){return Xt[e]?Xt[e]:en.has(e)?"block":"inline"}(n)),r.set(i,c),c}function sn(e){return nn(e).forEach(e=>{"none"!==rn(e)&&"none"!==e.style.display&&Qt.set(e,e.style.display),e.style.display="none"}),e}function cn(e){return nn(e).forEach(e=>{Qt.has(e)?(e.style.display=Qt.get(e),Qt.delete(e)):"none"===e.style.display&&(e.style.display=""),""===e.style.display&&"none"===rn(e)&&(e.style.display=on(e))}),e}function un(e){return sn(e)}function an(e){return cn(e)}function ln(e,t){if(void 0===e)return Gt(t.defaultElement)?t.defaultElement:null;let n=t.unwrap?t.unwrap(e):e;if(null==n)return null;if("string"==typeof n)try{return t.root.querySelector(n)}catch(e){return null}return"object"==typeof n&&"$el"in n&&(n=n.$el),Gt(n)?n:null}function fn(e,t={}){const{excludeSelector:n="",replaceImagesWithAlt:r=!0,normalizeWhitespace:o=!0}=t,i=e.cloneNode(!0);r&&Array.from(i.querySelectorAll("img[alt]")).forEach(e=>{const t=e.getAttribute("alt")||"";e.parentNode?.replaceChild(i.ownerDocument.createTextNode(t),e)});const s=n.trim();s&&Jt(s,{root:i})&&Array.from(i.querySelectorAll(s)).forEach(e=>e.parentNode?.removeChild(e));const c=i.innerText||i.textContent||"";return o?c.replace(/\u00a0/g," ").replace(/\s+/g," ").trim():c}function dn(e){e.stopPropagation()}function pn(){const e=window.MAZEY_DEFINE_LISTENERS;if(e&&"object"==typeof e)return e;const t=Object.create(null);return window.MAZEY_DEFINE_LISTENERS=t,t}function mn(e,t){const n=pn();Array.isArray(n[e])||Object.defineProperty(n,e,{configurable:!0,enumerable:!0,value:[],writable:!0}),"function"==typeof t&&n[e].push(t)}const gn=(/* unused pure expression or super */ null && (mn));function hn(e,t){const n=pn()[e];if(Array.isArray(n)){const e=n.slice();for(let n=0,r=e.length;n<r;n++)"function"==typeof e[n]&&(void 0===t?e[n]():e[n](t))}}function wn(e,t){hn(e,t)}function yn(e,t){const n=pn(),r=n[e];if("string"==typeof e&&Array.isArray(r))if("function"==typeof t){for(let o=0,i=r.length;o<i;o++)if(r[o]===t){n[e].splice(o,1);break}}else delete n[e]}function bn(e,t=null){if(e){const n=JSON.stringify(t);sessionStorage.setItem(e,void 0===n?"null":n)}}function vn(e){let t=null;if(e){const n=sessionStorage.getItem(e);if(n)try{t=JSON.parse(n)}catch(e){t=n}}return t}function En(e,t=null){if(e){const n=JSON.stringify(t);localStorage.setItem(e,void 0===n?"null":n)}}function Tn(e){let t=null;if(e){const n=localStorage.getItem(e);if(n)try{t=JSON.parse(n)}catch(e){t=n}}return t}const An=(/* unused pure expression or super */ null && (bn)),Sn=(/* unused pure expression or super */ null && (vn)),$n=(/* unused pure expression or super */ null && (En)),Nn=(/* unused pure expression or super */ null && (Tn)),_n="__mazey_cookie_name_encoded__-",xn="__mazey_cookie_value_encoded__-";function On(e){return`${xn}${encodeURIComponent(e)}`}function jn(e){const t=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/.test(e),n=0===e.indexOf(_n)||0===e.indexOf(xn);return t&&!n?e:function(e){return`${_n}${encodeURIComponent(e)}`}(e)}function Cn(e){const t=jn(e);return t!==e?[t,e]:[e]}function Mn(e){const t=e+"=",n=document.cookie.split(";");for(let e=0;e<n.length;e++){const r=n[e].trim();if(0===r.indexOf(t))return r.substring(t.length)}}function Dn(e){const t=Cn(e),n="1"===Mn(On(e));for(let e=0;e<t.length;e++){const r=Mn(t[e]);if(void 0!==r){if(n)try{return decodeURIComponent(r)}catch(e){return r}return r}}return""}function kn(e,t,n,r){let o;if(n){const e=new Date;e.setTime(e.getTime()+24*n*60*60*1e3),o="; expires="+e.toUTCString()}else o="";const i=function(e){let t=!0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);if(!(33===r||r>=35&&r<=43||r>=45&&r<=58||r>=60&&r<=91||r>=93&&r<=126)){t=!1;break}}return{isEncoded:!t,value:t?e:encodeURIComponent(e)}}(t),s=jn(e),c=i.isEncoded?"1":"",u=i.isEncoded?o:"; expires=Thu, 01 Jan 1970 00:00:00 GMT",a=[`${s}=${i.value}${o}; path=/`,`${On(e)}=${c}${u}; path=/`],l=e=>{const t=e?`; domain=${e}`:"";a.forEach(e=>{document.cookie=`${e}${t}`})},f=location.hostname;if(r)l(r);else if(-1===f.indexOf("."))l();else{const n=f.split(".");n.shift();l("."+n.join(".")),Dn(e)!==t&&l(`.${f}`)}}function Fn(e){const t=Cn(e),n=t.concat(On(e)),r=new Date;r.setTime(r.getTime()-1);const o=t.some(e=>void 0!==Mn(e));return n.forEach((e,t)=>{if(n.indexOf(e)===t&&void 0!==Mn(e)){[`${e}=; expires=${r.toUTCString()}`,`${e}=; expires=${r.toUTCString()}; path=/`].forEach(e=>{document.cookie=e;const t=location.hostname;if(-1!==t.indexOf(".")){const n=t.split(".");for(let t=0;t<n.length;t++)document.cookie=`${e}; domain=.${n.slice(t).join(".")}`}})}}),o&&n.every(e=>void 0===Mn(e))}function Ln(e){Fn(e)}function Rn(e,t={id:""}){const{id:n}=t;return new Promise((t,r)=>{const o=document.createElement("link");let i=!1;const s=()=>{o.onload=null,o.onerror=null};o.rel="stylesheet",o.type="text/css",o.href=e,void 0!==n&&(o.id=n),o.onload=()=>{i||(i=!0,s(),t("loaded"))},o.onerror=()=>{i||(i=!0,s(),r(new Error(`Failed to load CSS: ${e}`)))},document.head.appendChild(o)})}const zn=(/* unused pure expression or super */ null && ({id:"",callback:function(){},timeout:5e3,isDefer:!1,isAsync:!1,isCrossOrigin:!1,attributes:null,cssUrl:""}));function Pn(e,t={...zn}){const{id:n,callback:r,timeout:o,isDefer:i,isAsync:s,isCrossOrigin:c,attributes:u,cssUrl:a}=Object.assign({...zn},t);if(a){const t=function(e,t){if(!t)return"";if(St(t))return t;try{const n=new URL(e,location.href);return new URL(t,n).href}catch(n){const r=e.split("/");return r.pop(),`${r.join("/")}/${t}`}}(e,a);t&&Rn(t).catch(e=>{console.error(`Failed to load CSS from ${t}: ${e?.message}`)})}return new Promise((t,a)=>{const l=document.createElement("script");let f=!1,d=null;const p=()=>{l.onload=null,l.onerror=null,null!==d&&(clearTimeout(d),d=null)},m=e=>{f||(f=!0,p(),a(e))};l.type="text/javascript",l.defer=Boolean(i),l.async=Boolean(s),c&&(l.crossOrigin="anonymous"),n&&(l.id=n),u&&Object.keys(u).forEach(e=>{l.setAttribute(e,u[e])}),l.onload=()=>{if(!f){f=!0,p();try{fe(r),t("loaded")}catch(e){a(e)}}},l.onerror=()=>m(new Error(`Failed to load script: ${e}`)),l.src=e,o&&(d=setTimeout(()=>m(new Error("timeout")),o));const g=document.getElementsByTagName("script")[0];if(g?.parentNode)g.parentNode.insertBefore(l,g);else{(document.head||document.body||document.documentElement).appendChild(l)}})}function Un(e=3e4){return new Promise((t,n)=>{let r=null;const o=()=>{window.removeEventListener("load",i),null!==r&&(clearTimeout(r),r=null)},i=()=>{o(),t("load")};"complete"!==document.readyState?(window.addEventListener("load",i),r=setTimeout(()=>{o(),n(new Error("timeout"))},e)):t("complete")})}function In(e){return new Promise((t,n)=>{const r=new Image;r.onload=()=>{t(r)},r.onerror=e=>{n(e)},r.src=e})}function Bn(e,t){if(window[e])return Promise.resolve("defined");let n=qn.get(e);const r=n?.get(t);if(r)return r;n||(n=new Map,qn.set(e,n));const o=()=>{n?.delete(t),0===n?.size&&qn.delete(e)},i=Pn(t).then(e=>(o(),e),e=>{throw o(),e});return n.set(t,i),i}const qn=new Map;function Yn(e){if("undefined"==typeof window)return!1;let t=[];const n=window.PerformanceObserver;return!!n&&(de(n.supportedEntryTypes)&&(t=n.supportedEntryTypes),t.includes(e))}async function Wn(){return Yn("paint")?new Promise(e=>{const t=new window.PerformanceObserver(n=>{const r=n.getEntries().find(e=>"first-contentful-paint"===e.name);r&&(t.disconnect(),e(Math.round(r.startTime)))});t.observe({type:"paint",buffered:!0})}):0}async function Zn(){return Yn("paint")?new Promise(e=>{const t=new window.PerformanceObserver(n=>{const r=n.getEntries().find(e=>"first-paint"===e.name);r&&(t.disconnect(),e(Math.round(r.startTime)))});t.observe({type:"paint",buffered:!0})}):0}async function Hn(){return Yn("largest-contentful-paint")?new Promise(e=>{const t=new window.PerformanceObserver(n=>{const r=n.getEntries().find(e=>"largest-contentful-paint"===e.entryType);r&&(t.disconnect(),e(Math.round(r.startTime)))});t.observe({type:"largest-contentful-paint",buffered:!0})}):0}async function Vn(){return Yn("first-input")?new Promise(e=>{const t=new window.PerformanceObserver(n=>{const r=n.getEntries().find(e=>"first-input"===e.entryType);if(r){t.disconnect();const n=r.processingStart;e(n?Math.round(r.processingStart-r.startTime):0)}});t.observe({type:"first-input",buffered:!0})}):0}async function Jn(){return Yn("layout-shift")?new Promise(e=>{const t=new window.PerformanceObserver(n=>{const r=n.getEntries().reduce((e,t)=>{let n=0;return ae(t.value)&&(n=t.value),e+n},0);t.disconnect(),e(r)});t.observe({type:"layout-shift",buffered:!0})}):0}async function Gn(){if(!Yn("navigation"))return 0;if(!window.performance||!window.performance.getEntriesByType)return 0;const e=window.performance.getEntriesByType("navigation")[0];let t=0;return e?(t=e.responseStart-e.requestStart,Math.round(t)):0}async function Qn(e=!1){if(!Yn("navigation"))return Promise.reject(new Error("navigation is not supported"));const t=window.performance;if(!t||"function"!=typeof t.getEntriesByType)return Promise.reject(new Error("performance is not supported"));let n;const r=new Promise(e=>{[n]=[e]}),o=t.getEntriesByType("navigation");if(!de(o))return Promise.reject(new Error("NavigationTiming is not supported"));const i=o[0];let[s,c,u,a,l,f,d,p,m,g,h,w,y,b,v,E,T,A,S]=new Array(19).fill(0);({decodedBodySize:A,encodedBodySize:S}=i),({unloadEventEnd:s,unloadEventStart:c,redirectEnd:u,redirectStart:a,domainLookupEnd:l,domainLookupStart:f,connectEnd:d,connectStart:p,secureConnectionStart:m,responseStart:g,requestStart:h,responseEnd:w,domContentLoadedEventStart:y,loadEventStart:b,loadEventEnd:v,startTime:E,fetchStart:T}=i);let $=0;if(ae(E))$=E;else{if(!ae(T))return Promise.reject(new Error("startTime, navigationStart or fetchStart are required"));$=T}const[N,_]=await Promise.all([Zn(),Wn()]);function x(){({decodedBodySize:A,encodedBodySize:S}=i),({unloadEventEnd:s,unloadEventStart:c,redirectEnd:u,redirectStart:a,domainLookupEnd:l,domainLookupStart:f,connectEnd:d,connectStart:p,secureConnectionStart:m,responseStart:g,requestStart:h,responseEnd:w,domContentLoadedEventStart:y,loadEventStart:b,loadEventEnd:v,startTime:E,fetchStart:T}=i),ae(E)?$=E:ae(T)&&($=T);const t={source:"PerformanceNavigationTiming",os:O(),osVersion:j(),deviceType:C(),network:M(),screenDirection:D(),unloadTime:s-c,redirectTime:u-a,dnsTime:l-f,tcpTime:d-p,sslTime:k(d,m),responseTime:g-h,downloadTime:w-g,firstPaintTime:N,firstContentfulPaintTime:_,domReadyTime:y-$,onloadTime:b-$,whiteTime:g-$,renderTime:v-$,decodedBodySize:A,encodedBodySize:S};Object.keys(t).forEach(e=>{ae(t[e])&&(t[e]<0?t[e]=0:t[e]=Math.round(t[e]))}),ae(t.whiteTime)&&t.whiteTime>t.onloadTime&&(t.whiteTime=0);const r={};e||Object.keys(t).forEach(e=>{r[J(e)]=t[e]}),Object.keys(r).length?n(r):n(t)}function O(){let e;return e=navigator.userAgent.indexOf("Android")>-1?"android":navigator.userAgent.indexOf("iPhone")>-1?"ios":navigator.userAgent.indexOf("Windows Phone")>-1?"wp":"others",e}function j(){let e="";const t=navigator.userAgent,n=t.indexOf("Android")>-1,r=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),o=navigator.userAgent.split(";");if(o.length<2)return e;const i=o[1];return i?(n&&(e=(i.match(/\d+\.\d+/g)||[])[0]),r&&(e=(i.match(/(\d+)_(\d+)_?(\d+)?/)||[])[0]),e||(e=""),e):e}function C(){let e;const t=navigator.userAgent.toLowerCase(),n=t.match(/(ipad)/i)&&"ipad",r=t.match(/iphone os/i)&&"iphone os",o=t.match(/midp/i)&&"midp",i=t.match(/rv:1.2.3.4/i)&&"rv:1.2.3.4",s=t.match(/ucweb/i)&&"ucweb",c=t.match(/android/i)&&"android",u=t.match(/windows ce/i)&&"windows ce",a=t.match(/windows mobile/i)&&"windows mobile";return e=n||r||o||i||s||c||u||a?r||o||i||s||c||u||a?"phone":n?"ipad":void 0:"pc",e||(e=""),e}function M(){let e="";const t=window.navigator;if(t.connection&&t.connection.effectiveType)switch(t.connection.effectiveType){case"wifi":e="wifi";break;case"4g":e="4g";break;case"2g":e="2g";break;case"3g":e="3g";break;case"ethernet":e="ethernet";break;case"default":e=void 0}return e||(e=""),e}function D(){let e="";return window.screen&&window.screen.orientation&&"number"==typeof window.screen.orientation.angle&&(180!==window.screen.orientation.angle&&0!==window.screen.orientation.angle||(e="|"),90!==window.screen.orientation.angle&&-90!==window.screen.orientation.angle||(e="-")),e}function k(e,t){let n=0;return t&&(n=e-t),n}return ae(v)&&v>0?x():"complete"===document.readyState?window.setTimeout(x,0):window.addEventListener("load",function e(){window.removeEventListener("load",e),window.setTimeout(function(){x()},0)}),r}function Kn(e,t=e.userAgent.trim().toLowerCase()){return/\bmacintosh\b/.test(t)&&"macintel"===e.platform.toLowerCase()&&e.maxTouchPoints>1}const Xn=Object.freeze(["adsbot-google","ahrefsbot","amazonbot","applebot","baiduspider","bingbot","bingpreview","bytespider","ccbot","chatgpt-user","claudebot","discordbot","dotbot","duckduckbot","facebookexternalhit","facebot","google-inspectiontool","googlebot","googleother","gptbot","linkedinbot","mediapartners-google","mj12bot","perplexitybot","petalbot","semrushbot","slackbot","slurp","storebot-google","telegrambot","twitterbot","whatsapp","yandexbot"]),er=Object.freeze(["headlesschrome","phantomjs","slimerjs","selenium","puppeteer","playwright"]);function tr(){try{return"undefined"==typeof navigator?null:navigator}catch(e){return null}}function nr(){const e=tr();if(!e)return{userAgent:"",platform:"",maxTouchPoints:0};let t="",n="",r=0;try{const n=e.userAgent;t="string"==typeof n?n:""}catch(e){return{userAgent:"",platform:"",maxTouchPoints:0}}try{const t=e.platform;n="string"==typeof t?t:""}catch(e){n=""}try{const t=e.maxTouchPoints;r=Number.isFinite(t)?t:0}catch(e){r=0}return{userAgent:t,platform:n,maxTouchPoints:r}}function rr(e){const t=e.userAgent.trim().toLowerCase();return t?/\bandroid\b|\badr\b/.test(t)?"android":/\bios\b|\biphone\b|\bipad\b|\bipod\b|\biwatch\b/.test(t)||Kn(e,t)?"ios":/\bwindows\b|\bwin32\b|\bwin64\b|\bwow32\b|\bwow64\b/.test(t)?"windows":/\bmacintosh\b|\bmacintel\b|\bmac os x\b/.test(t)?"macos":/\blinux\b/.test(t)?"linux":"":""}function or(e){const t=e.userAgent.trim().toLowerCase();if(!t)return"";if(/\biwatch\b|\bapple watch\b/.test(t))return"";if(/\bipad\b|\btablet\b/.test(t)||Kn(e,t))return"tablet";const n=rr(e);return"android"===n?/\bmobile\b/.test(t)?"mobile":"tablet":"ios"===n&&/\biphone\b|\bipod\b/.test(t)?"mobile":"windows"===n||"macos"===n||"linux"===n||/\bcros\b/.test(t)?"desktop":/\bmobile\b/.test(t)?"mobile":""}function ir(e){if(void 0!==e&&"string"!=typeof e)throw new TypeError("userAgent must be a string when provided.");return or(void 0!==e?{userAgent:e,platform:"",maxTouchPoints:0}:nr())}function sr(e){if(void 0!==e&&"string"!=typeof e)throw new TypeError("userAgent must be a string when provided.");return rr(void 0!==e?{userAgent:e,platform:"",maxTouchPoints:0}:nr())}function cr(e){return"mobile"===ir(e)}function ur(e){return"desktop"===ir(e)}function ar(e){return"tablet"===ir(e)}function lr(e){return"ios"===sr(e)}function fr(e){return"android"===sr(e)}function dr(e){return"macos"===sr(e)}function pr(e){return"windows"===sr(e)}function mr(e){return"linux"===sr(e)}function gr(e,t){const n=e.trim().toLowerCase();return t.some(e=>n.includes(e))}function hr(e){if(void 0!==e&&"string"!=typeof e)throw new TypeError("userAgent must be a string when provided.");const t=void 0===e?function(){const e=tr();if(!e)return"";try{const t=e.userAgent;return"string"==typeof t?t:""}catch(e){return""}}():e;return gr(t,Xn)?"crawler":gr(t,er)||function(){const e=tr();if(!e)return!1;try{return!0===e.webdriver}catch(e){return!1}}()?"automation":"unknown"}function wr(e){if(void 0===e)return function(){try{return"undefined"==typeof window||"undefined"==typeof navigator?null:{window:window,navigator:navigator,document:"undefined"==typeof document?void 0:document}}catch(e){return null}}();if(null===e||"object"!=typeof e||Array.isArray(e))return null;try{const t=e.window,n=e.navigator,r=e.document;return null===t||"object"!=typeof t||null===n||"object"!=typeof n||void 0!==r&&(null===r||"object"!=typeof r)?null:{window:t,navigator:n,document:r}}catch(e){return null}}function yr(e={}){try{if(null===e||"object"!=typeof e||Array.isArray(e))return!1;const t=e.requireManifest,n=e.scope,r=e.environment;if(void 0!==t&&"boolean"!=typeof t||void 0!==n&&"string"!=typeof n)return!1;const o=wr(r);if(!o)return!1;const{window:i,navigator:s,document:c}=o,u=s.serviceWorker;if(!0!==i.isSecureContext||null===u||"object"!=typeof u)return!1;if(void 0!==n&&!function(e,t){const n=e.trim();if(!n||/[?#]/.test(n))return!1;try{const e=new URL(t.location.href),r=new URL(n,e);if(r.origin!==e.origin||""!==r.search||""!==r.hash)return!1;if(e.pathname===r.pathname)return!0;const o=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;return e.pathname.startsWith(o)}catch(e){return!1}}(n,i))return!1;if(!1===t)return!0;if(!c)return!1;const a=c.querySelector('link[rel~="manifest"][href]');return Boolean(a?.getAttribute("href")?.trim())}catch(e){return!1}}function br(e={}){let t;try{if(null===e||"object"!=typeof e||Array.isArray(e))return!1;t=e.environment}catch(e){return!1}const n=wr(t);if(!n)return!1;const{window:r,navigator:o}=n;try{const e=r.matchMedia;if("function"==typeof e&&e.call(r,"(display-mode: standalone)").matches)return!0}catch(e){}try{return!0===o.standalone}catch(e){return!1}}function vr(){if(window.MAZEY_BROWSER_INFO&&"object"==typeof window.MAZEY_BROWSER_INFO)return window.MAZEY_BROWSER_INFO;let e={engine:"",engineVs:"",platform:"",supporter:"",supporterVs:"",system:"",systemVs:"",shell:"",shellVs:"",appleType:"",colorScheme:""};try{const t=nr(),n=t.userAgent.toLowerCase();if(!n)return e;const r=e=>e.test(n),o=e=>{let t="";const r=n.match(e);return r&&de(r)&&(t=r.toString(),t=t.replace(/[^0-9|_.]/g,""),t=t.replace(/_/g,".")),t},i=rr(t);let s="";"ios"===i&&(r(/ipad/g)?s="ipad":r(/iphone/g)?s="iphone":r(/iwatch/g)?s="iwatch":r(/ipod/g)?s="ipod":"macintel"===t.platform.toLowerCase()&&t.maxTouchPoints>1&&(s="ipad")),e={...e,system:i,appleType:s};let c="";"windows"===i?r(/windows nt 5.0|windows 2000/g)?c="2000":r(/windows nt 5.1|windows xp/g)?c="xp":r(/windows nt 5.2|windows 2003/g)?c="2003":r(/windows nt 6.0|windows vista/g)?c="vista":r(/windows nt 6.1|windows 7/g)?c="7":r(/windows nt 6.2|windows 8/g)?c="8":r(/windows nt 6.3|windows 8.1/g)?c="8.1":r(/windows nt 10.0|windows 10/g)&&(c="10"):"macos"===i?c=o(/os x [\d._]+/g):"android"===i?c=o(/android [\d._]+/g):"ios"===i&&(c=o(/os [\d._]+/g)),e={...e,systemVs:c};let u="";"windows"===i||"macos"===i||"linux"===i?u="desktop":("android"===i||"ios"===i||r(/mobile/g))&&(u="mobile"),e={...e,platform:u};let a="",l="";r(/applewebkit/g)?(a="webkit",r(/edg(?:a|ios)?\//g)||r(/edge\//g)?l="edge":r(/opr/g)?l="opera":r(/chrome/g)?l="chrome":r(/safari/g)&&(l="safari")):r(/gecko/g)&&r(/firefox/g)?(a="gecko",l="firefox"):r(/presto/g)?(a="presto",l="opera"):r(/trident|compatible|msie/g)&&(a="trident",l="iexplore"),e={...e,engine:a,supporter:l};let f="";"webkit"===a?f=o(/applewebkit\/[\d._]+/g):"gecko"===a?f=o(/gecko\/[\d._]+/g):"presto"===a?f=o(/presto\/[\d._]+/g):"trident"===a&&(f=o(/trident\/[\d._]+/g)),e={...e,engineVs:f};let d="";"chrome"===l?d=o(/chrome\/[\d._]+/g):"safari"===l?d=o(/version\/[\d._]+/g):"firefox"===l?d=o(/firefox\/[\d._]+/g):"opera"===l?d=o(/opr\/[\d._]+/g):"iexplore"===l?d=o(/(msie [\d._]+)|(rv:[\d._]+)/g):"edge"===l&&(d=o(/(?:edge|edg|edga|edgios)\/[\d._]+/g)),e={...e,supporterVs:d};let p="",m="";r(/micromessenger/g)?(p="wechat",m=o(/micromessenger\/[\d._]+/g)):r(/qqbrowser/g)?(p="qq_browser",m=o(/qqbrowser\/[\d._]+/g)):r(/\sqq/g)?p="qq_app":r(/ucbrowser/g)?(p="uc",m=o(/ucbrowser\/[\d._]+/g)):r(/qihu 360se/g)?p="360":r(/2345explorer/g)?(p="2345",m=o(/2345explorer\/[\d._]+/g)):r(/metasr/g)?p="sougou":r(/lbbrowser/g)?p="liebao":r(/maxthon/g)?(p="maxthon",m=o(/maxthon\/[\d._]+/g)):r(/biliapp/g)&&(p="bilibili"),e={...e,shell:p,shellVs:m};let g="";if(window.matchMedia){const e=window.matchMedia("(prefers-color-scheme: dark)"),t=window.matchMedia("(prefers-color-scheme: light)");e.matches?g="dark":t.matches&&(g="light")}return e={...e,colorScheme:g},window.MAZEY_BROWSER_INFO=e,e}catch(t){return Lt.warn(t),e}}function Er(e="",t="-"){const n=vr(),r=[];return["system","platform","engine","supporter","shell","appleType"].forEach(o=>{const i=n[o];if(i){let n="";e&&e.length>0&&(n=`${e}${t}`),r.push(`${n}${i}`)}}),r}const Tr=(/* unused pure expression or super */ null && (Er));let Ar="";function Sr(){if(Ar)return Promise.resolve("webp"===Ar);return new Promise(e=>{const t=new Image;t.onload=()=>{const n=t.width>0&&t.height>0;Ar=n?"webp":"no-webp",e(n)},t.onerror=()=>{Ar="no-webp",e(!1)},t.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="})}function $r(e,t){if("function"!=typeof t)throw new TypeError("listener must be a function");if(null===e)return()=>{};if("object"!=typeof e)throw new TypeError("media must be a MediaQueryList or null");const n=e.addEventListener,r=e.removeEventListener;let o=null;if("function"==typeof n&&"function"==typeof r){const i=t;n.call(e,"change",i),o=()=>r.call(e,"change",i)}let i=!1;return()=>{i||(i=!0,o?.())}}function Nr(e,t,n){if(null===e||"object"!=typeof e||"function"!=typeof e.addEventListener||"function"!=typeof e.removeEventListener)throw new TypeError("registration must support event listeners");if(null===t||"object"!=typeof t||"function"!=typeof t.addEventListener||"function"!=typeof t.removeEventListener)throw new TypeError("container must support event listeners");if(null===n||"object"!=typeof n||"function"!=typeof n.onUpdateAvailable||void 0!==n.onControllerChange&&"function"!=typeof n.onControllerChange)throw new TypeError("callbacks must provide onUpdateAvailable");let r=!1,o=null,i=null,s=!1,c=!1;const u=e=>{r||i===e||(i=e,n.onUpdateAvailable(e))},a=()=>{!r&&"installed"===o?.state&&t.controller&&u(o)},l=()=>{r||(o?.removeEventListener("statechange",a),o=e.installing,o?.addEventListener("statechange",a),a())},f=()=>{r||n.onControllerChange?.()},d=()=>{if(s){try{e.removeEventListener("updatefound",l)}catch(e){}s=!1}try{o?.removeEventListener("statechange",a)}catch(e){}if(c){try{t.removeEventListener("controllerchange",f)}catch(e){}c=!1}};try{e.addEventListener("updatefound",l),s=!0,t.addEventListener("controllerchange",f),c=!0,e.waiting&&t.controller&&u(e.waiting),e.installing&&l()}catch(e){throw r=!0,d(),o=null,i=null,e}return{activateWaiting(e={type:"SKIP_WAITING"}){if(r||!i)return!1;try{return i.postMessage(e),!0}catch(e){return!1}},dispose(){r||(r=!0,d(),o=null,i=null)}}}function _r(e){if("string"!=typeof e||""===e.trim())throw new TypeError("storageKey must be a non-empty string.")}function xr(e){if("undefined"==typeof window)return null;try{return new URL(window.location.href).searchParams.get(e)}catch(e){return null}}function Or(e){if("undefined"==typeof window)return null;try{const t=window.localStorage;return t&&"function"==typeof t.getItem?t.getItem(e):null}catch(e){return null}}function jr(e,t){if("undefined"==typeof window)return!1;try{const n=window.localStorage;return!(!n||"function"!=typeof n.setItem)&&(n.setItem(e,t),!0)}catch(e){return!1}}const Cr=Object.freeze({system:"System",light:"Light",dark:"Dark"});function Mr(e){return"light"===e||"dark"===e}function Dr(){if("undefined"==typeof window)return null;try{const e=window.matchMedia;return"function"!=typeof e?null:e.call(window,"(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){return null}}function kr(e,t){return{value:e,label:Cr[t]}}function Fr(e){_r(e);const t=xr(e);if(Mr(t))return kr(t,t);const n=Or(e);if(Mr(n))return kr(n,n);const r=Dr();return"system"===n&&r||r?kr(r,"system"):kr("light","light")}function Lr(e,t){if(_r(e),!function(e){return"system"===e||Mr(e)}(t))throw new TypeError('value must be "system", "light", or "dark".');return jr(e,t)}function Rr(e){const t=e.split("-");if(!/^[a-z]{2,8}$/i.test(t[0]))return null;const n=[t[0].toLowerCase()];let r=1;if(r<t.length&&/^[a-z]{4}$/i.test(t[r])){const e=t[r].toLowerCase();n.push(`${e[0].toUpperCase()}${e.slice(1)}`),r++}for(r<t.length&&(/^[a-z]{2}$/i.test(t[r])||/^\d{3}$/.test(t[r]))&&(n.push(/^[a-z]{2}$/i.test(t[r])?t[r].toUpperCase():t[r]),r++);r<t.length;r++){const e=t[r];if(!/^(?:[a-z0-9]{5,8}|\d[a-z0-9]{3})$/i.test(e))return null;n.push(e.toLowerCase())}return n.join("-")}function zr(e){if("string"!=typeof e)return null;const t=e.trim().replace(/_/g,"-");if(!t)return null;if("undefined"!=typeof Intl)try{const e=Intl,n=e.getCanonicalLocales;if("function"==typeof n){const r=n.call(e,t)[0];return"string"==typeof r&&r?r:null}}catch(e){return e instanceof RangeError||"object"==typeof e&&null!==e&&"name"in e&&"RangeError"===e.name?null:Rr(t)}return Rr(t)}function Pr(e){if("undefined"==typeof Intl)return e;try{const t=Intl.DisplayNames;if("function"!=typeof t)return e;const n=new t([e],{type:"language"}).of(e);return"string"==typeof n&&n.trim()?n:e}catch(t){return e}}function Ur(e){return{value:e,label:Pr(e)}}function Ir(e){_r(e);const t=zr(xr("lang"));if(t)return Ur(t);const n=zr(Or(e));if(n)return Ur(n);return Ur(zr(function(){if("undefined"==typeof window||"undefined"==typeof navigator)return null;try{return"string"==typeof navigator.language?navigator.language:null}catch(e){return null}}())??"en")}function Br(e,t){_r(e);const n=zr(t);if(!n)throw new TypeError("language must be a valid language tag.");return jr(e,n)}

;// ./src/webhook.js
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/* global GM_getValue, GM_setValue, GM_xmlhttpRequest, GM_registerMenuCommand, GM_addValueChangeListener, unsafeWindow */
/* eslint-disable max-lines, max-len */

;
var CONFIG = {
  endpoint: "",
  intervalMs: 30 * 60 * 1000,
  requestTimeoutMs: 30 * 1000,
  afterScan: null,
  safeRedirectUrl: "https://www.bing.com/search?q=peace",
  safeRedirectAfterMs: 7 * 24 * 60 * 60 * 1000,
  // safeRedirectAfterMs: 2 * 60 * 1000, // for testing
  safeRedirectMessageTemplate: "Peace monitor stopped automatically after running continuously for {duration}.",
  filterApiMessageBody: true,
  maxStoredHashes: 5000,
  enableDebug: false
};
var WebhookCon = Ft("[Webhook]");
var DOMAIN_CONFIG_STORAGE_KEY = "peace-webhook-domain-config-map";
var PROCESSED_RECORDS_STORAGE_KEY = "peace-webhook-processed-records-by-domain";
var ENDPOINT_STORAGE_KEY = "peace-webhook-endpoint";
var API_KEY_STORAGE_KEY = "peace-webhook-api-key";
var INSTALL_FLAG = "__PEACE_WEBHOOK_SCRIPT_INSTALLED__";
var DEBUG_GLOBAL_KEY = "PEACE_WEBHOOK_DEBUG";
var CONFIG_GLOBAL_KEY = "PEACE_WEBHOOK_CONFIG";
var AFTER_SCAN_STORAGE_PREFIX = "peace-webhook-after-scan:";
var AUTO_START_STORAGE_PREFIX = "peace-webhook-auto-start:";
var CONTROL_CONTAINER_ID = "peace-webhook-controls";
var MASK_ID = "peace-webhook-mask";
var TITLE_PREFIX = "[Webhook Running]";
var DOMAIN_CONFIG_FIELDS = ["messageContainerSelector", "messageKeySelector", "messageExcludeSelector", "messageListScrollSelector"];
var HAN_REGEXP = createHanRegExp();
var EMOJI_SEQUENCE_REGEXP = createEmojiSequenceRegExp();
var URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\u4E00-\u9FA5()!@:%_+.~#?&//=]*)/g;
var USERNAME_REGEXP = /(^|[^\w])@[A-Za-z]+/g;
var SPECIFIC_CHARACTERS_REGEXP = /[()]+/g;
var domainConfigMap = new Map();
var domainAfterScanMap = new Map();
var savedAfterScanMap = new Map();
var state = {
  running: false,
  scanning: false,
  runId: 0,
  timerId: null,
  autoStartTimerId: null,
  safeRedirectTimerId: null,
  originalTitle: document.title,
  processedRecordsByDomain: new Map(),
  processedHashesByDomain: new Map(),
  controls: null,
  startButton: null,
  stopButton: null
};
function logInfo() {
  if (CONFIG.enableDebug) {
    WebhookCon.log.apply(WebhookCon, arguments);
  }
}
function logWarn() {
  WebhookCon.warn.apply(WebhookCon, arguments);
}
function logError() {
  WebhookCon.error.apply(WebhookCon, arguments);
}
function getDebugStateSnapshot() {
  var domain = getCurrentDomainKey();
  var processedRecords = getProcessedRecordsForDomain(domain);
  var processedHashes = getProcessedHashesForDomain(domain);
  return {
    domain: domain,
    enableDebug: CONFIG.enableDebug,
    running: state.running,
    scanning: state.scanning,
    runId: state.runId,
    hasTimer: Boolean(state.timerId),
    hasAutoStartTimer: state.autoStartTimerId !== null,
    hasSafeRedirectTimer: Boolean(state.safeRedirectTimerId),
    safeRedirectAfterMs: CONFIG.safeRedirectAfterMs,
    filterApiMessageBody: CONFIG.filterApiMessageBody,
    configuredDomainCount: domainConfigMap.size,
    currentDomainConfigured: hasValidCurrentDomainConfig(),
    processedRecordCount: processedRecords.length,
    processedHashCount: processedHashes.size,
    endpointConfigured: Boolean(getConfiguredEndpoint()),
    apiKeyConfigured: Boolean(getConfiguredApiKey())
  };
}
function getPageWindow() {
  if ((typeof unsafeWindow === "undefined" ? "undefined" : _typeof(unsafeWindow)) === "object" && unsafeWindow) {
    return unsafeWindow;
  }
  return window;
}
function exposeDebugHelpers() {
  var debugTarget = getPageWindow();
  debugTarget[DEBUG_GLOBAL_KEY] = {
    getProcessedRecords: function getProcessedRecords() {
      return getProcessedRecordsForDomain().map(function (record) {
        return _objectSpread({}, record);
      });
    },
    getProcessedHashes: function getProcessedHashes() {
      return Array.from(getProcessedHashesForDomain());
    },
    getState: getDebugStateSnapshot,
    normalizeContent: function normalizeContent(content) {
      return normalizeMessageContent(content);
    },
    clearProcessedRecords: function clearProcessedRecords() {
      return clearCurrentDomainProcessedRecords();
    },
    reloadProcessedRecords: function reloadProcessedRecords() {
      loadProcessedRecordsByDomain();
      return getDebugStateSnapshot();
    }
  };
  logInfo("Exposed webhook debug helpers.", {
    globalKey: DEBUG_GLOBAL_KEY,
    target: debugTarget === window ? "window" : "unsafeWindow"
  });
}
function removeDebugHelpers() {
  var debugTarget = getPageWindow();
  if (debugTarget[DEBUG_GLOBAL_KEY]) {
    delete debugTarget[DEBUG_GLOBAL_KEY];
  }
}
function syncDebugHelpers() {
  if (CONFIG.enableDebug) {
    exposeDebugHelpers();
    return;
  }
  removeDebugHelpers();
}
function getAfterScanForDomain() {
  var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getCurrentDomainKey();
  return domainAfterScanMap.get(domain) || savedAfterScanMap.get(domain) || CONFIG.afterScan;
}
function compileAfterScan(source) {
  // Keep native async syntax inside a string so Babel cannot transform the constructor.
  // Compilation validates the body without executing user code.
  // eslint-disable-next-line no-new-func
  var AsyncFunction = new Function("return Object.getPrototypeOf(async function () {}).constructor;")();
  return new AsyncFunction("context", "\"use strict\";\n".concat(source));
}
function parseAutoStartSeconds(value) {
  if (typeof value !== "string" || !/^\d+$/.test(value.trim())) return null;
  var seconds = Number(value.trim());
  return Number.isInteger(seconds) && seconds >= 1 && seconds <= 2147483 ? seconds : null;
}
function clearAutoStartTimer() {
  if (state.autoStartTimerId === null) return;
  window.clearTimeout(state.autoStartTimerId);
  state.autoStartTimerId = null;
}
function scheduleAutoStart() {
  clearAutoStartTimer();
  var seconds = parseAutoStartSeconds(getStoredValue(AUTO_START_STORAGE_PREFIX + getCurrentDomainKey(), "", false));
  if (!state.running && seconds !== null) {
    state.autoStartTimerId = window.setTimeout(function () {
      state.autoStartTimerId = null;
      startMonitoring(true);
    }, seconds * 1000);
  }
  updateControls();
}
function setAutoStartFromMenu() {
  var domain = getCurrentDomainKey();
  var key = AUTO_START_STORAGE_PREFIX + domain;
  var value = window.prompt("Auto-start delay in seconds for ".concat(domain, " (1\u20132147483, whole seconds). Empty or invalid input disables auto-start."), getStoredValue(key, "", false));
  if (value === null) return;
  var seconds = parseAutoStartSeconds(value);
  if (!setStoredValue(key, seconds === null ? "" : String(seconds), false)) {
    window.alert("Unable to save the auto-start delay in userscript storage.");
    return;
  }
  scheduleAutoStart();
  window.alert(seconds === null ? "Auto-start disabled for ".concat(domain, ".") : "Auto-start delay saved for ".concat(domain, ": ").concat(seconds, " seconds."));
}
function loadSavedAfterScan() {
  var domain = getCurrentDomainKey();
  var source = getStoredValue(AFTER_SCAN_STORAGE_PREFIX + domain, "", false);
  savedAfterScanMap["delete"](domain);
  if (source === "") return;
  try {
    if (typeof source !== "string") throw new TypeError("After-scan source must be a string.");
    savedAfterScanMap.set(domain, compileAfterScan(source));
  } catch (error) {
    logWarn("Unable to compile the saved after-scan script; using default behavior.", error);
  }
}
function setAfterScanFromMenu() {
  var domain = getCurrentDomainKey();
  var key = AFTER_SCAN_STORAGE_PREFIX + domain;
  var source = window.prompt("After-scan script body for ".concat(domain, ". Enter one line; use context and await directly. Leave empty to clear the saved script. Only enter trusted code."), getStoredValue(key, "", false));
  if (source === null) return;
  var callback = null;
  if (source.trim()) {
    try {
      callback = compileAfterScan(source);
    } catch (error) {
      window.alert("After-scan script could not be compiled. The saved setting was not changed.");
      return;
    }
  }
  if (!setStoredValue(key, callback ? source : "", false)) {
    window.alert("Unable to save the after-scan script in userscript storage.");
    return;
  }
  if (callback) savedAfterScanMap.set(domain, callback);else savedAfterScanMap["delete"](domain);
  window.alert(callback ? "After-scan script saved for ".concat(domain, ".") : "Saved after-scan script cleared for ".concat(domain, "."));
}
function exposeConfigApi() {
  var configTarget = getPageWindow();
  var configApi = {};
  Object.defineProperties(configApi, {
    domain: {
      enumerable: true,
      get: getCurrentDomainKey
    },
    afterScan: {
      enumerable: true,
      get: function get() {
        return domainAfterScanMap.get(getCurrentDomainKey()) || null;
      },
      set: function set(callback) {
        var domain = getCurrentDomainKey();
        if (callback === null) {
          domainAfterScanMap["delete"](domain);
          logInfo("Cleared temporary after-scan override.", {
            domain: domain
          });
          return;
        }
        if (typeof callback !== "function") {
          throw new TypeError("PEACE_WEBHOOK_CONFIG.afterScan must be a function or null.");
        }
        domainAfterScanMap.set(domain, callback);
        logInfo("Updated after-scan callback.", {
          domain: domain
        });
      }
    },
    getSelectors: {
      enumerable: true,
      value: function value() {
        return Object.freeze(getCurrentDomainConfig());
      }
    }
  });
  try {
    configTarget[CONFIG_GLOBAL_KEY] = Object.freeze(configApi);
  } catch (error) {
    logWarn("Unable to expose the domain configuration API; installation will continue.", error);
    return false;
  }
  logInfo("Exposed domain configuration API.", {
    domain: getCurrentDomainKey(),
    globalKey: CONFIG_GLOBAL_KEY,
    target: configTarget === window ? "window" : "unsafeWindow"
  });
  return true;
}
function getTitleWithoutPrefix(title) {
  return String(title || "").startsWith(TITLE_PREFIX) ? String(title || "").slice(TITLE_PREFIX.length).trim() : String(title || "");
}
function ensureRunningTitlePrefix() {
  if (!state.running) return;
  var cleanTitle = getTitleWithoutPrefix(document.title);
  var prefixedTitle = "".concat(TITLE_PREFIX, " ").concat(cleanTitle).trim();
  if (document.title !== prefixedTitle) {
    state.originalTitle = cleanTitle;
    document.title = prefixedTitle;
    logInfo("Applied running title prefix:", prefixedTitle);
  }
}
function parseStoredJson(value, fallback) {
  var parseFailure = {};
  var parsedValue = ee(value, parseFailure);
  if (parsedValue !== parseFailure) return parsedValue;
  logWarn("Stored JSON data is malformed; using a safe default.");
  return fallback;
}
function getStoredValue(key, defaultValue) {
  var allowPageStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  try {
    if (typeof GM_getValue === "function") {
      return GM_getValue(key, defaultValue);
    }
    if (!allowPageStorage) return defaultValue;
    var localValue = window.localStorage.getItem(key);
    return localValue === null ? defaultValue : localValue;
  } catch (error) {
    logError("Unable to read storage key \"".concat(key, "\"."), error);
    return defaultValue;
  }
}
function setStoredValue(key, value) {
  var allowPageStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  try {
    if (typeof GM_setValue === "function") {
      GM_setValue(key, value);
      return true;
    }
    if (!allowPageStorage) {
      logError("Unable to securely persist storage key \"".concat(key, "\" because GM_setValue is unavailable."));
      return false;
    }
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    logError("Unable to persist storage key \"".concat(key, "\"."), error);
    return false;
  }
}
function createEmptyDomainConfig() {
  return {
    messageContainerSelector: "",
    messageKeySelector: "",
    messageExcludeSelector: "",
    messageListScrollSelector: ""
  };
}
function getCurrentDomainKey() {
  return window.location.hostname.toLowerCase();
}
function isValidDomainKey(domain) {
  return typeof domain === "string" && Boolean(domain) && domain === domain.trim().toLowerCase() && !/[/?#]/.test(domain);
}
function normalizeDomainConfig(value) {
  if (!value || _typeof(value) !== "object" || Array.isArray(value)) return null;
  var domainConfig = createEmptyDomainConfig();
  var _iterator = _createForOfIteratorHelper(DOMAIN_CONFIG_FIELDS),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var field = _step.value;
      if (typeof value[field] !== "string") return null;
      var selector = value[field].trim();
      if (!Jt(selector, {
        allowEmpty: true
      })) return null;
      domainConfig[field] = selector;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return domainConfig;
}
function createDomainConfigMapFromStoredValue(rawConfigMap) {
  var storedConfigMap = typeof rawConfigMap === "string" ? parseStoredJson(rawConfigMap, {}) : rawConfigMap;
  var nextDomainConfigMap = new Map();
  if (!storedConfigMap || _typeof(storedConfigMap) !== "object" || Array.isArray(storedConfigMap)) {
    logWarn("Stored domain configuration map is malformed; using an empty map.");
    return nextDomainConfigMap;
  }
  Object.entries(storedConfigMap).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      domain = _ref2[0],
      value = _ref2[1];
    var domainConfig = normalizeDomainConfig(value);
    if (!isValidDomainKey(domain) || !domainConfig) {
      logWarn("Ignoring malformed domain configuration entry.", {
        domain: domain
      });
      return;
    }
    nextDomainConfigMap.set(domain, domainConfig);
  });
  return nextDomainConfigMap;
}
function replaceDomainConfigMap(nextDomainConfigMap) {
  domainConfigMap.clear();
  nextDomainConfigMap.forEach(function (domainConfig, domain) {
    domainConfigMap.set(domain, domainConfig);
  });
}
function readDomainConfigMapFromStorage() {
  var rawConfigMap = getStoredValue(DOMAIN_CONFIG_STORAGE_KEY, "{}", false);
  return createDomainConfigMapFromStoredValue(rawConfigMap);
}
function loadDomainConfigMap() {
  replaceDomainConfigMap(readDomainConfigMapFromStorage());
  logInfo("Loaded domain configurations, count:", domainConfigMap.size);
}
function saveDomainConfigMap() {
  var configMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : domainConfigMap;
  var serializableConfigMap = Object.fromEntries(Array.from(configMap, function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      domain = _ref4[0],
      domainConfig = _ref4[1];
    return [domain, _objectSpread({}, domainConfig)];
  }));
  return setStoredValue(DOMAIN_CONFIG_STORAGE_KEY, JSON.stringify(serializableConfigMap), false);
}
function getCurrentDomainConfig() {
  var domainConfig = domainConfigMap.get(getCurrentDomainKey()) || createEmptyDomainConfig();
  return _objectSpread({}, domainConfig);
}
function updateCurrentDomainConfig(updates) {
  var domain = getCurrentDomainKey();
  var latestDomainConfigMap = readDomainConfigMapFromStorage();
  var latestDomainConfig = latestDomainConfigMap.get(domain);
  var nextConfig = normalizeDomainConfig(_objectSpread(_objectSpread(_objectSpread({}, createEmptyDomainConfig()), latestDomainConfig), updates));
  if (!nextConfig) return false;
  latestDomainConfigMap.set(domain, nextConfig);
  if (!saveDomainConfigMap(latestDomainConfigMap)) return false;
  replaceDomainConfigMap(latestDomainConfigMap);
  return true;
}
function removeCurrentDomainConfig() {
  var domain = getCurrentDomainKey();
  var latestDomainConfigMap = readDomainConfigMapFromStorage();
  if (!latestDomainConfigMap.has(domain)) return false;
  latestDomainConfigMap["delete"](domain);
  if (!saveDomainConfigMap(latestDomainConfigMap)) return false;
  replaceDomainConfigMap(latestDomainConfigMap);
  domainAfterScanMap["delete"](domain);
  if (state.running) stopMonitoring();
  return true;
}
function getCurrentDomainConfigError() {
  var domainConfig = getCurrentDomainConfig();
  if (!domainConfig.messageContainerSelector) return "message container selector is required";
  if (!domainConfig.messageKeySelector) return "message key selector is required";
  var _iterator2 = _createForOfIteratorHelper(DOMAIN_CONFIG_FIELDS),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var field = _step2.value;
      if (!Jt(domainConfig[field], {
        allowEmpty: true
      })) {
        return "".concat(field, " is not a valid CSS selector");
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return "";
}
function hasValidCurrentDomainConfig() {
  return !getCurrentDomainConfigError();
}
function getEndpointLogLabel(endpoint) {
  try {
    return new URL(endpoint).origin;
  } catch (error) {
    return "(invalid endpoint URL)";
  }
}
function setEndpointFromMenu() {
  var currentEndpoint = getConfiguredEndpoint();
  var nextEndpoint = window.prompt("Webhook endpoint URL, for example https://example.com/api/gee/webhook-message", currentEndpoint);
  if (nextEndpoint === null) return;
  var endpoint = nextEndpoint.trim();
  if (!endpoint) {
    logWarn("Webhook endpoint was not changed because the value is empty.");
    window.alert("Webhook endpoint was not changed because the value is empty.");
    return;
  }
  if (!/^https?:\/\//i.test(endpoint)) {
    logWarn("Webhook endpoint must start with http:// or https://.");
    window.alert("Webhook endpoint must start with http:// or https://.");
    return;
  }
  if (setStoredValue(ENDPOINT_STORAGE_KEY, endpoint)) {
    logInfo("Webhook endpoint saved from menu.", {
      endpoint: getEndpointLogLabel(endpoint)
    });
    window.alert("Webhook endpoint saved.");
  }
}
function setApiKeyFromMenu() {
  var currentApiKey = getConfiguredApiKey();
  var promptMessage = currentApiKey ? "An API key is already saved. Enter a new value to replace it, or leave empty to remove it." : "Webhook API key. Leave empty to keep it unset.";
  var nextApiKey = window.prompt(promptMessage, "");
  if (nextApiKey === null) return;
  var apiKey = nextApiKey.trim();
  if (setStoredValue(API_KEY_STORAGE_KEY, apiKey, false)) {
    logInfo(apiKey ? "Webhook API key saved from menu." : "Webhook API key removed from menu.");
    window.alert(apiKey ? "Webhook API key saved." : "Webhook API key removed.");
  } else {
    window.alert("The API key was not saved because secure userscript storage is unavailable.");
  }
}
function setCurrentDomainSelectorFromMenu(_ref5) {
  var field = _ref5.field,
    label = _ref5.label,
    required = _ref5.required;
  var domain = getCurrentDomainKey();
  var currentValue = getCurrentDomainConfig()[field];
  var nextValue = window.prompt("".concat(label, " for ").concat(domain, ".").concat(required ? " This selector is required." : " Leave empty to disable it."), currentValue);
  if (nextValue === null) return;
  var selector = nextValue.trim();
  if (required && !selector) {
    window.alert("".concat(label, " for ").concat(domain, " cannot be empty."));
    return;
  }
  if (!Jt(selector, {
    allowEmpty: !required
  })) {
    window.alert("".concat(label, " for ").concat(domain, " is not a valid CSS selector."));
    return;
  }
  if (!updateCurrentDomainConfig(_defineProperty({}, field, selector))) {
    window.alert("Unable to save ".concat(label.toLowerCase(), " for ").concat(domain, "."));
    return;
  }
  logInfo("Updated domain selector.", {
    domain: domain,
    field: field
  });
  window.alert("".concat(label, " saved for ").concat(domain, "."));
}
function showCurrentDomainConfigFromMenu() {
  var domain = getCurrentDomainKey();
  var domainConfig = getCurrentDomainConfig();
  var endpoint = getConfiguredEndpoint() || "(not set)";
  var hasApiKey = getConfiguredApiKey() ? "yes" : "no";
  window.alert(["Domain: ".concat(domain), "Message container selector: ".concat(domainConfig.messageContainerSelector || "(not set)"), "Message key selector: ".concat(domainConfig.messageKeySelector || "(not set)"), "Message exclusion selector: ".concat(domainConfig.messageExcludeSelector || "(disabled)"), "Message list scroll selector: ".concat(domainConfig.messageListScrollSelector || "(disabled)"), "Global endpoint: ".concat(endpoint), "API key saved: ".concat(hasApiKey)].join("\n"));
}
function removeCurrentDomainConfigFromMenu() {
  var domain = getCurrentDomainKey();
  if (!domainConfigMap.has(domain)) {
    window.alert("No selector configuration is saved for ".concat(domain, "."));
    return;
  }
  if (!window.confirm("Remove the selector configuration for ".concat(domain, "?"))) return;
  if (removeCurrentDomainConfig()) {
    logInfo("Removed domain configuration.", {
      domain: domain
    });
    window.alert("Selector configuration removed for ".concat(domain, "."));
    return;
  }
  window.alert("Unable to remove the selector configuration for ".concat(domain, "."));
}
function showConfiguredDomainsFromMenu() {
  var domains = Array.from(domainConfigMap.keys()).sort();
  window.alert(domains.length ? "Configured domains:\n".concat(domains.join("\n")) : "No domains are configured.");
}
function clearCurrentDomainProcessedRecordsFromMenu() {
  var domain = getCurrentDomainKey();
  if (!window.confirm("Clear processed-message records for ".concat(domain, "?"))) return;
  var result = clearCurrentDomainProcessedRecords();
  window.alert(result.persisted ? "Processed-message records cleared for ".concat(domain, ".") : "Records were cleared in memory for ".concat(domain, ", but persistence failed."));
}
function registerMenuCommands() {
  if (typeof GM_registerMenuCommand !== "function") {
    logWarn("GM_registerMenuCommand is unavailable; configuration menu was not registered.");
    return;
  }
  GM_registerMenuCommand("Set webhook endpoint", setEndpointFromMenu);
  GM_registerMenuCommand("Set webhook API key", setApiKeyFromMenu);
  var domain = getCurrentDomainKey();
  GM_registerMenuCommand("Set message container selector for ".concat(domain), function () {
    setCurrentDomainSelectorFromMenu({
      field: "messageContainerSelector",
      label: "Message container selector",
      required: true
    });
  });
  GM_registerMenuCommand("Set message key selector for ".concat(domain), function () {
    setCurrentDomainSelectorFromMenu({
      field: "messageKeySelector",
      label: "Message key selector",
      required: true
    });
  });
  GM_registerMenuCommand("Set message exclusion selector for ".concat(domain), function () {
    setCurrentDomainSelectorFromMenu({
      field: "messageExcludeSelector",
      label: "Message exclusion selector",
      required: false
    });
  });
  GM_registerMenuCommand("Set message list scroll selector for ".concat(domain), function () {
    setCurrentDomainSelectorFromMenu({
      field: "messageListScrollSelector",
      label: "Message list scroll selector",
      required: false
    });
  });
  GM_registerMenuCommand("Show configuration for ".concat(domain), showCurrentDomainConfigFromMenu);
  GM_registerMenuCommand("Set after-scan script for ".concat(domain), setAfterScanFromMenu);
  GM_registerMenuCommand("Set auto-start delay for ".concat(domain), setAutoStartFromMenu);
  GM_registerMenuCommand("Remove configuration for ".concat(domain), removeCurrentDomainConfigFromMenu);
  GM_registerMenuCommand("Show configured domains", showConfiguredDomainsFromMenu);
  GM_registerMenuCommand("Clear processed records for ".concat(domain), clearCurrentDomainProcessedRecordsFromMenu);
  logInfo("Registered Tampermonkey menu commands.");
}
function normalizeProcessedRecords(records) {
  if (!Array.isArray(records)) return [];
  var recordsByHash = new Map();
  records.filter(function (record) {
    return record && typeof record.hash === "string" && Number.isFinite(record.processedAt);
  }).forEach(function (record) {
    var existingRecord = recordsByHash.get(record.hash);
    if (!existingRecord || record.processedAt > existingRecord.processedAt) {
      recordsByHash.set(record.hash, {
        hash: record.hash,
        processedAt: record.processedAt
      });
    }
  });
  return Array.from(recordsByHash.values()).sort(function (leftRecord, rightRecord) {
    return leftRecord.processedAt - rightRecord.processedAt;
  }).slice(-CONFIG.maxStoredHashes);
}
function createProcessedRecordsMapFromStoredValue(rawRecordsMap) {
  var storedRecordsMap = typeof rawRecordsMap === "string" ? parseStoredJson(rawRecordsMap, {}) : rawRecordsMap;
  var nextProcessedRecordsByDomain = new Map();
  if (!storedRecordsMap || _typeof(storedRecordsMap) !== "object" || Array.isArray(storedRecordsMap)) {
    logWarn("Stored processed-record map is malformed; using an empty map.");
    return nextProcessedRecordsByDomain;
  }
  Object.entries(storedRecordsMap).forEach(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
      domain = _ref7[0],
      records = _ref7[1];
    if (!isValidDomainKey(domain) || !Array.isArray(records)) {
      logWarn("Ignoring malformed processed-record entry.", {
        domain: domain
      });
      return;
    }
    var normalizedRecords = normalizeProcessedRecords(records);
    nextProcessedRecordsByDomain.set(domain, normalizedRecords);
  });
  return nextProcessedRecordsByDomain;
}
function replaceProcessedRecordsByDomain(nextProcessedRecordsByDomain) {
  state.processedRecordsByDomain.clear();
  state.processedHashesByDomain.clear();
  nextProcessedRecordsByDomain.forEach(function (records, domain) {
    var normalizedRecords = normalizeProcessedRecords(records);
    state.processedRecordsByDomain.set(domain, normalizedRecords);
    state.processedHashesByDomain.set(domain, new Set(normalizedRecords.map(function (record) {
      return record.hash;
    })));
  });
}
function readProcessedRecordsMapFromStorage() {
  var rawRecordsMap = getStoredValue(PROCESSED_RECORDS_STORAGE_KEY, "{}", false);
  return createProcessedRecordsMapFromStoredValue(rawRecordsMap);
}
function loadProcessedRecordsByDomain() {
  replaceProcessedRecordsByDomain(readProcessedRecordsMapFromStorage());
  logInfo("Loaded processed-record domains, count:", state.processedRecordsByDomain.size);
}
function saveProcessedRecordsByDomain() {
  var recordsMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : state.processedRecordsByDomain;
  var serializableRecordsMap = Object.fromEntries(Array.from(recordsMap, function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
      domain = _ref9[0],
      records = _ref9[1];
    return [domain, records.map(function (record) {
      return _objectSpread({}, record);
    })];
  }));
  return setStoredValue(PROCESSED_RECORDS_STORAGE_KEY, JSON.stringify(serializableRecordsMap), false);
}
function getProcessedRecordsForDomain() {
  var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getCurrentDomainKey();
  return state.processedRecordsByDomain.get(domain) || [];
}
function getProcessedHashesForDomain() {
  var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getCurrentDomainKey();
  return state.processedHashesByDomain.get(domain) || new Set();
}
function setProcessedRecordsForDomain(domain, records) {
  var latestRecordsMap = readProcessedRecordsMapFromStorage();
  var normalizedRecords = normalizeProcessedRecords(records);
  latestRecordsMap.set(domain, normalizedRecords);
  replaceProcessedRecordsByDomain(latestRecordsMap);
  // logInfo("Saving processed hash records.", { domain, count: normalizedRecords.length });
  return saveProcessedRecordsByDomain(latestRecordsMap);
}
function clearCurrentDomainProcessedRecords() {
  var domain = getCurrentDomainKey();
  var persisted = setProcessedRecordsForDomain(domain, []);
  logInfo("Cleared processed hash records.", {
    domain: domain,
    persisted: persisted
  });
  return {
    domain: domain,
    persisted: persisted
  };
}
function hasProcessedHash(hash) {
  var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentDomainKey();
  return getProcessedHashesForDomain(domain).has(hash);
}
function recordProcessedHash(hash) {
  var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentDomainKey();
  var latestRecordsMap = readProcessedRecordsMapFromStorage();
  var latestDomainRecords = latestRecordsMap.get(domain) || [];
  var latestDomainHashes = new Set(latestDomainRecords.map(function (record) {
    return record.hash;
  }));
  if (latestDomainHashes.has(hash)) {
    replaceProcessedRecordsByDomain(latestRecordsMap);
    return true;
  }

  // logInfo("Recording processed message hash:", hash);
  var mergedRecords = normalizeProcessedRecords([].concat(_toConsumableArray(latestDomainRecords), _toConsumableArray(getProcessedRecordsForDomain(domain)), [{
    hash: hash,
    processedAt: Date.now()
  }]));
  latestRecordsMap.set(domain, mergedRecords);
  replaceProcessedRecordsByDomain(latestRecordsMap);
  return saveProcessedRecordsByDomain(latestRecordsMap);
}
function registerStorageChangeListeners() {
  if (typeof GM_addValueChangeListener !== "function") {
    logWarn("GM_addValueChangeListener is unavailable; cross-tab storage updates will refresh before each write.");
    return;
  }
  try {
    GM_addValueChangeListener(DOMAIN_CONFIG_STORAGE_KEY, function () {
      var newValue = arguments.length <= 2 ? undefined : arguments[2];
      var storedValue = newValue === undefined ? "{}" : newValue;
      replaceDomainConfigMap(createDomainConfigMapFromStoredValue(storedValue));
      logInfo("Synchronized domain configurations from userscript storage.");
      if (state.running && !hasValidCurrentDomainConfig()) {
        logWarn("Stopping monitoring because the current domain configuration was removed or became invalid.");
        stopMonitoring();
      }
    });
    GM_addValueChangeListener(PROCESSED_RECORDS_STORAGE_KEY, function () {
      var newValue = arguments.length <= 2 ? undefined : arguments[2];
      var storedValue = newValue === undefined ? "{}" : newValue;
      replaceProcessedRecordsByDomain(createProcessedRecordsMapFromStoredValue(storedValue));
      logInfo("Synchronized processed records from userscript storage.");
    });
  } catch (error) {
    logWarn("Unable to register cross-tab storage listeners; storage will refresh before each write.", error);
  }
}
function createButton(text) {
  var button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.style.position = "relative";
  button.style.zIndex = "2147483647";
  button.style.display = "inline-flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.minWidth = "74px";
  button.style.height = "34px";
  button.style.border = "1px solid rgba(255, 255, 255, 0.7)";
  button.style.borderRadius = "6px";
  button.style.background = "rgba(0, 0, 0, 0.82)";
  button.style.color = "#fff";
  button.style.cursor = "pointer";
  button.style.fontSize = "13px";
  button.style.fontFamily = "Arial, sans-serif";
  button.style.opacity = "0.05";
  button.style.transition = "opacity 160ms ease";
  button.addEventListener("mouseenter", function () {
    button.style.opacity = "1";
  });
  button.addEventListener("mouseleave", function () {
    button.style.opacity = button === state.stopButton && state.running ? "0.05" : "0.01";
  });
  button.addEventListener("focus", function () {
    button.style.opacity = "1";
  });
  button.addEventListener("blur", function () {
    button.style.opacity = button === state.stopButton && state.running ? "0.05" : "0.01";
  });
  return button;
}
function createControls() {
  var existingControls = document.getElementById(CONTROL_CONTAINER_ID);
  if (existingControls) {
    state.controls = existingControls;
    state.startButton = existingControls.querySelector("[data-peace-webhook-start]");
    state.stopButton = existingControls.querySelector("[data-peace-webhook-stop]");
    logInfo("Reused existing webhook controls.");
    return;
  }
  var controls = document.createElement("div");
  controls.id = CONTROL_CONTAINER_ID;
  controls.style.position = "fixed";
  controls.style.right = "16px";
  controls.style.bottom = "16px";
  controls.style.zIndex = "2147483647";
  controls.style.display = "flex";
  controls.style.gap = "8px";
  var startButton = createButton("Start");
  startButton.dataset.peaceWebhookStart = "true";
  startButton.addEventListener("click", startMonitoring);
  var stopButton = createButton("Stop");
  stopButton.dataset.peaceWebhookStop = "true";
  stopButton.style.display = "none";
  stopButton.addEventListener("click", stopMonitoring);
  controls.append(startButton, stopButton);
  document.body.appendChild(controls);
  state.controls = controls;
  state.startButton = startButton;
  state.stopButton = stopButton;
  logInfo("Created webhook controls.");
}
function updateControls() {
  if (!state.startButton || !state.stopButton) return;
  state.startButton.style.display = state.running ? "none" : "inline-flex";
  state.startButton.disabled = state.running;
  var canStop = state.running || state.autoStartTimerId !== null;
  state.stopButton.style.display = canStop ? "inline-flex" : "none";
  state.stopButton.disabled = !canStop;
  state.stopButton.style.opacity = canStop ? "0.05" : "0.01";
}
function createMask() {
  if (document.getElementById(MASK_ID)) {
    logInfo("Webhook mask already exists; skipping duplicate mask.");
    return;
  }
  var mask = document.createElement("div");
  mask.id = MASK_ID;
  mask.style.position = "fixed";
  mask.style.inset = "0";
  mask.style.zIndex = "2147483646";
  mask.style.display = "flex";
  mask.style.alignItems = "center";
  mask.style.justifyContent = "center";
  mask.style.background = "rgba(0, 0, 0, 0.99)";
  mask.style.backdropFilter = "blur(16px)";
  mask.style.webkitBackdropFilter = "blur(16px)";
  mask.style.pointerEvents = "auto";
  mask.style.color = "rgba(255, 255, 255, 0.2)";
  mask.style.font = "14px Arial, sans-serif";
  mask.style.textShadow = "0 1px 2px rgba(0, 0, 0, 0.8)";
  mask.textContent = "Webhook Monitor Running";
  document.body.appendChild(mask);
  logInfo("Created webhook running mask.");
}
function removeMask() {
  var mask = document.getElementById(MASK_ID);
  if (mask) {
    mask.remove();
    logInfo("Removed webhook running mask.");
  }
}
function clearSafeRedirectTimer() {
  if (!state.safeRedirectTimerId) return;
  window.clearTimeout(state.safeRedirectTimerId);
  state.safeRedirectTimerId = null;
  logInfo("Cleared safe redirect timer.");
}
function getSafeRedirectMessage() {
  return String(CONFIG.safeRedirectMessageTemplate || "").replace("{duration}", w(CONFIG.safeRedirectAfterMs));
}
function scheduleSafeRedirect() {
  clearSafeRedirectTimer();
  var redirectUrl = String(CONFIG.safeRedirectUrl || "").trim();
  if (!redirectUrl) {
    logInfo("Safe redirect is disabled because safeRedirectUrl is empty.");
    return;
  }
  var redirectRunId = state.runId;
  state.safeRedirectTimerId = window.setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          state.safeRedirectTimerId = null;
          if (!(!state.running || state.runId !== redirectRunId)) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          _context.p = 1;
          _context.n = 2;
          return sendWebhookMessage(getSafeRedirectMessage());
        case 2:
          logInfo("Sent safe redirect message.");
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          logError("Failed to send safe redirect message before redirecting.", _t);
        case 4:
          if (!(!state.running || state.runId !== redirectRunId)) {
            _context.n = 5;
            break;
          }
          logInfo("Safe redirect canceled because monitoring state changed.", {
            runId: redirectRunId,
            currentRunId: state.runId
          });
          return _context.a(2);
        case 5:
          logInfo("Safe redirect timer elapsed; redirecting:", redirectUrl);
          window.location.replace(redirectUrl);
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[1, 3]]);
  })), CONFIG.safeRedirectAfterMs);
  logInfo("Scheduled safe redirect.", {
    redirectUrl: redirectUrl,
    delayMs: CONFIG.safeRedirectAfterMs,
    runId: redirectRunId,
    message: getSafeRedirectMessage()
  });
}
function extractMessageBody(contentElement) {
  var domainConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentDomainConfig();
  var excludeSelector = domainConfig.messageExcludeSelector;
  var validExcludeSelector = !excludeSelector || Jt(excludeSelector, {
    root: contentElement
  });
  if (!validExcludeSelector) {
    logWarn("Unable to apply message exclusion selector; continuing without exclusions.", {
      domain: getCurrentDomainKey(),
      selector: excludeSelector
    });
  }
  return fn(contentElement, {
    excludeSelector: validExcludeSelector ? excludeSelector : "",
    normalizeWhitespace: false
  }).replace(/\u00a0/g, " ").trim();
}
function extractMessageKey(keyElement) {
  var logMissing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (!keyElement) return "";
  var title = (keyElement.getAttribute("title") || "").trim();
  if (title) return title;
  var formValue = "value" in keyElement ? String(keyElement.value || "").trim() : "";
  if (formValue) return formValue;
  var visibleText = (keyElement.innerText || keyElement.textContent || "").trim();
  if (!visibleText && logMissing) {
    logWarn("Skipping message without a readable message key.", keyElement);
  }
  return visibleText;
}
function extractMessageRecord(contentElement, keyElement, domainConfig) {
  var content = extractMessageBody(contentElement, domainConfig);
  var messageKey = extractMessageKey(keyElement);
  if (!content || !messageKey) {
    if (!content) logWarn("Skipping message without readable content.", contentElement);
    return null;
  }
  return {
    content: content,
    messageKey: messageKey
  };
}
function createHanRegExp() {
  try {
    // eslint-disable-next-line prefer-regex-literals
    return new RegExp("\\p{Script=Han}+", "gu");
  } catch (error) {
    logWarn("Unicode Han matching is not fully supported; using fallback ranges.", error);
    return /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]+/g;
  }
}
function createEmojiSequenceRegExp() {
  try {
    return new RegExp("(?:[\\p{Emoji_Presentation}\\p{Extended_Pictographic}\\u{1F1E6}-\\u{1F1FF}]" + "(?:\\uFE0F|\\p{Emoji_Modifier})?" + "(?:\\u200d[\\p{Emoji_Presentation}\\p{Extended_Pictographic}]" + "(?:\\uFE0F|\\p{Emoji_Modifier})?)*)+", "gu");
  } catch (error) {
    logWarn("Unicode emoji matching is not fully supported; using fallback emoji ranges.", error);
    return /(?:[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF])+/g;
  }
}
function normalizeMessageContent(content) {
  var normalizedContent = String(content || "").normalize("NFKC");
  normalizedContent = normalizedContent.replace(URL_REGEXP, "#");
  normalizedContent = normalizedContent.replace(USERNAME_REGEXP, "$1#");
  normalizedContent = normalizedContent.replace(SPECIFIC_CHARACTERS_REGEXP, "#");
  normalizedContent = normalizedContent.replace(HAN_REGEXP, "#");
  normalizedContent = normalizedContent.replace(EMOJI_SEQUENCE_REGEXP, "#");
  normalizedContent = normalizedContent.replace(/\s+/g, "#");
  normalizedContent = normalizedContent.replace(/#+/g, "#");
  return normalizedContent.trim();
}
function hashContent(_x) {
  return _hashContent.apply(this, arguments);
}
function _hashContent() {
  _hashContent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(content) {
    var _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return Ye(content);
        case 1:
          return _context3.a(2, _context3.v);
        case 2:
          _context3.p = 2;
          _t2 = _context3.v;
          logError("Unable to hash message content.", _t2);
          return _context3.a(2, "");
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return _hashContent.apply(this, arguments);
}
function formatApiContent(record) {
  var messageBody = CONFIG.filterApiMessageBody ? normalizeMessageContent(record.content) : record.content;
  return "".concat(record.messageKey, "\n").concat(messageBody);
}
function getConfiguredEndpoint() {
  var storedEndpoint = getStoredValue(ENDPOINT_STORAGE_KEY, "");
  return String(CONFIG.endpoint || storedEndpoint || "").trim();
}
function getConfiguredApiKey() {
  return String(getStoredValue(API_KEY_STORAGE_KEY, "", false) || "").trim();
}
function parseResponseBody(responseText) {
  if (!responseText) return null;
  return ee(responseText, responseText);
}
function getWebhookHeaders() {
  var headers = {
    "Content-Type": "application/json"
  };
  var apiKey = getConfiguredApiKey();
  if (apiKey) {
    headers["X-Webhook-API-Key"] = apiKey;
  }
  return headers;
}
function getResponseMessage(responseData, responseText) {
  if (responseData && _typeof(responseData) === "object" && responseData.message) {
    return responseData.message;
  }
  return responseText;
}
function sendWebhookMessage(content) {
  var endpoint = getConfiguredEndpoint();
  if (!endpoint) {
    return Promise.reject(new Error("Webhook endpoint is not configured; set it via the Tampermonkey menu before starting."));
  }
  var requestBody = JSON.stringify({
    content: content
  });
  var endpointLogLabel = getEndpointLogLabel(endpoint);
  if (typeof GM_xmlhttpRequest === "function") {
    return new Promise(function (resolve, reject) {
      GM_xmlhttpRequest({
        method: "POST",
        url: endpoint,
        headers: getWebhookHeaders(),
        data: requestBody,
        timeout: CONFIG.requestTimeoutMs,
        onload: function onload(response) {
          var responseText = response.responseText || "";
          var responseData = parseResponseBody(responseText);
          if (response.status < 200 || response.status >= 300) {
            logWarn("Webhook API returned non-success status.", {
              endpoint: endpointLogLabel,
              status: response.status
            });
            reject(new Error("Webhook API returned HTTP ".concat(response.status, ": ").concat(getResponseMessage(responseData, responseText))));
            return;
          }

          // logInfo("Webhook API accepted message, status:", response.status);
          resolve(responseData);
        },
        onerror: function onerror() {
          logError("Network error while sending webhook message.", {
            endpoint: endpointLogLabel
          });
          reject(new Error("Network error while sending webhook message."));
        },
        ontimeout: function ontimeout() {
          logError("Webhook API request timed out.", {
            endpoint: endpointLogLabel
          });
          reject(new Error("Webhook API request timed out."));
        }
      });
    });
  }
  var abortController = new AbortController();
  var timeoutId = window.setTimeout(function () {
    return abortController.abort();
  }, CONFIG.requestTimeoutMs);
  return fetch(endpoint, {
    method: "POST",
    headers: getWebhookHeaders(),
    body: requestBody,
    signal: abortController.signal
  }).then(/*#__PURE__*/function () {
    var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(response) {
      var responseText, responseData;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return response.text();
          case 1:
            responseText = _context2.v;
            responseData = parseResponseBody(responseText);
            if (response.ok) {
              _context2.n = 2;
              break;
            }
            logWarn("Webhook API returned non-success status.", {
              endpoint: endpointLogLabel,
              status: response.status
            });
            throw new Error("Webhook API returned HTTP ".concat(response.status, ": ").concat(getResponseMessage(responseData, responseText)));
          case 2:
            logInfo("Webhook API accepted message, status:", response.status);
            return _context2.a(2, responseData);
        }
      }, _callee2);
    }));
    return function (_x2) {
      return _ref1.apply(this, arguments);
    };
  }())["catch"](function (error) {
    if (error && error.name === "AbortError") {
      logError("Webhook API request timed out.", {
        endpoint: endpointLogLabel
      });
      throw new Error("Webhook API request timed out.");
    }
    throw error;
  })["finally"](function () {
    window.clearTimeout(timeoutId);
  });
}
function getMessageContentEntries() {
  var domainConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getCurrentDomainConfig();
  var containerElements;
  try {
    containerElements = Array.from(document.querySelectorAll(domainConfig.messageContainerSelector));
  } catch (error) {
    logError("Unable to query message containers.", {
      domain: getCurrentDomainKey(),
      selector: domainConfig.messageContainerSelector,
      error: error
    });
    return [];
  }
  if (!containerElements.length) {
    logWarn("No message containers matched selector.", {
      domain: getCurrentDomainKey(),
      selector: domainConfig.messageContainerSelector
    });
    return [];
  }
  return containerElements.flatMap(function (containerElement) {
    var keyElements;
    try {
      keyElements = [].concat(_toConsumableArray(containerElement.matches(domainConfig.messageKeySelector) ? [containerElement] : []), _toConsumableArray(containerElement.querySelectorAll(domainConfig.messageKeySelector)));
    } catch (error) {
      logError("Unable to query a message key.", {
        domain: getCurrentDomainKey(),
        selector: domainConfig.messageKeySelector,
        error: error
      });
      return [];
    }
    var keyElement = keyElements.find(function (candidateElement) {
      return extractMessageKey(candidateElement, false);
    });
    if (!keyElement) {
      logWarn("Message container has no usable matched key element.", {
        matchedKeyCount: keyElements.length,
        containerElement: containerElement
      });
      return [];
    }
    return [{
      contentElement: containerElement,
      keyElement: keyElement
    }];
  });
}
function scrollMessageListToBottom() {
  var domainConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getCurrentDomainConfig();
  var scrollSelector = domainConfig.messageListScrollSelector;
  if (!scrollSelector) {
    logInfo("Default after-scan scrolling is disabled for the current domain.");
    return;
  }
  var scrollElement;
  try {
    scrollElement = document.querySelector(scrollSelector);
  } catch (error) {
    logWarn("Unable to query the message list scroll element.", {
      domain: getCurrentDomainKey(),
      selector: scrollSelector,
      error: error
    });
    return;
  }
  if (!scrollElement) {
    logWarn("No message list scroll element matched selector.", {
      domain: getCurrentDomainKey(),
      selector: scrollSelector
    });
    return;
  }
  scrollElement.scrollTop = scrollElement.scrollHeight;
  logInfo("Scrolled message list to bottom, scrollHeight:", scrollElement.scrollHeight);
}
function runAfterScan(_x3) {
  return _runAfterScan.apply(this, arguments);
}
function _runAfterScan() {
  _runAfterScan = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref10) {
    var domain, runId, messageCount, domainConfig, callback, context, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          domain = _ref10.domain, runId = _ref10.runId, messageCount = _ref10.messageCount, domainConfig = _ref10.domainConfig;
          callback = getAfterScanForDomain(domain);
          if (!(typeof callback !== "function")) {
            _context4.n = 1;
            break;
          }
          scrollMessageListToBottom(domainConfig);
          return _context4.a(2);
        case 1:
          context = Object.freeze({
            domain: domain,
            runId: runId,
            running: state.running,
            messageCount: messageCount
          });
          _context4.p = 2;
          _context4.n = 3;
          return callback(context);
        case 3:
          _context4.n = 5;
          break;
        case 4:
          _context4.p = 4;
          _t3 = _context4.v;
          logError("After-scan callback failed; future scans will continue.", {
            domain: domain,
            error: _t3
          });
        case 5:
          return _context4.a(2);
      }
    }, _callee4, null, [[2, 4]]);
  }));
  return _runAfterScan.apply(this, arguments);
}
function scanAndSendMessages() {
  return _scanAndSendMessages.apply(this, arguments);
}
function _scanAndSendMessages() {
  _scanAndSendMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    var scanRunId, scanDomain, domainConfig, domainConfigError, messageCount, messageEntries, _iterator3, _step3, _step3$value, contentElement, keyElement, record, normalizedContent, hash, apiContent, isPersisted, _t4, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          if (state.running) {
            _context5.n = 1;
            break;
          }
          logInfo("Scan skipped because monitoring is stopped.");
          return _context5.a(2);
        case 1:
          if (!state.scanning) {
            _context5.n = 2;
            break;
          }
          logInfo("Scan skipped because another scan is already running.");
          return _context5.a(2);
        case 2:
          scanRunId = state.runId;
          scanDomain = getCurrentDomainKey();
          domainConfig = getCurrentDomainConfig();
          domainConfigError = getCurrentDomainConfigError();
          if (!domainConfigError) {
            _context5.n = 3;
            break;
          }
          logWarn("Scan skipped because the current domain configuration is invalid.", {
            domain: scanDomain,
            error: domainConfigError
          });
          return _context5.a(2);
        case 3:
          messageCount = 0;
          state.scanning = true;
          logInfo("Started scan.", {
            domain: scanDomain,
            runId: scanRunId
          });
          _context5.p = 4;
          messageEntries = getMessageContentEntries(domainConfig);
          messageCount = messageEntries.length;
          logInfo("Scanning message candidates.", {
            domain: scanDomain,
            count: messageCount
          });
          _iterator3 = _createForOfIteratorHelper(messageEntries);
          _context5.p = 5;
          _iterator3.s();
        case 6:
          if ((_step3 = _iterator3.n()).done) {
            _context5.n = 19;
            break;
          }
          _step3$value = _step3.value, contentElement = _step3$value.contentElement, keyElement = _step3$value.keyElement;
          if (!(!state.running || state.runId !== scanRunId)) {
            _context5.n = 7;
            break;
          }
          logInfo("Stopping scan because monitoring state changed.", {
            runId: scanRunId,
            currentRunId: state.runId
          });
          return _context5.a(3, 19);
        case 7:
          record = extractMessageRecord(contentElement, keyElement, domainConfig);
          if (record) {
            _context5.n = 8;
            break;
          }
          return _context5.a(3, 18);
        case 8:
          normalizedContent = normalizeMessageContent(record.content);
          if (normalizedContent) {
            _context5.n = 9;
            break;
          }
          logWarn("Skipping message with empty normalized content.", contentElement);
          return _context5.a(3, 18);
        case 9:
          _context5.n = 10;
          return hashContent(normalizedContent);
        case 10:
          hash = _context5.v;
          if (!(!state.running || state.runId !== scanRunId)) {
            _context5.n = 11;
            break;
          }
          logInfo("Stopping scan after hash because monitoring state changed.", {
            runId: scanRunId,
            currentRunId: state.runId
          });
          return _context5.a(3, 19);
        case 11:
          if (hash) {
            _context5.n = 12;
            break;
          }
          return _context5.a(3, 18);
        case 12:
          if (!hasProcessedHash(hash, scanDomain)) {
            _context5.n = 13;
            break;
          }
          return _context5.a(3, 18);
        case 13:
          apiContent = formatApiContent(record);
          _context5.p = 14;
          _context5.n = 15;
          return sendWebhookMessage(apiContent);
        case 15:
          _context5.n = 17;
          break;
        case 16:
          _context5.p = 16;
          _t4 = _context5.v;
          logError("Failed to deliver message; it will be retried later.", _t4);
          return _context5.a(3, 18);
        case 17:
          isPersisted = recordProcessedHash(hash, scanDomain);
          logInfo("Delivered new message:", hash);
          if (!isPersisted) {
            logError("Message was delivered, but its hash could not be persisted.", {
              hash: hash
            });
          }
          if (!(!state.running || state.runId !== scanRunId)) {
            _context5.n = 18;
            break;
          }
          return _context5.a(3, 19);
        case 18:
          _context5.n = 6;
          break;
        case 19:
          _context5.n = 21;
          break;
        case 20:
          _context5.p = 20;
          _t5 = _context5.v;
          _iterator3.e(_t5);
        case 21:
          _context5.p = 21;
          _iterator3.f();
          return _context5.f(21);
        case 22:
          _context5.p = 22;
          if (!(state.running && state.runId === scanRunId)) {
            _context5.n = 23;
            break;
          }
          _context5.n = 23;
          return runAfterScan({
            domain: scanDomain,
            runId: scanRunId,
            messageCount: messageCount,
            domainConfig: domainConfig
          });
        case 23:
          state.scanning = false;
          logInfo("Finished scan.", {
            domain: scanDomain,
            runId: scanRunId
          });
          if (state.running && state.runId !== scanRunId) {
            logInfo("Scheduling follow-up scan for newer run.", {
              runId: state.runId
            });
            window.setTimeout(scanAndSendMessages, 0);
          }
          return _context5.f(22);
        case 24:
          return _context5.a(2);
      }
    }, _callee5, null, [[14, 16], [5, 20, 21, 22], [4,, 22, 24]]);
  }));
  return _scanAndSendMessages.apply(this, arguments);
}
function startMonitoring() {
  var automatic = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  clearAutoStartTimer();
  updateControls();
  if (state.running) {
    logInfo("Start ignored because monitoring is already running.", {
      runId: state.runId
    });
    return;
  }
  var domain = getCurrentDomainKey();
  var domainConfigError = getCurrentDomainConfigError();
  if (domainConfigError) {
    logWarn("Monitoring was not started because the current domain configuration is invalid.", {
      domain: domain,
      error: domainConfigError
    });
    if (automatic !== true) {
      window.alert("Cannot start monitoring on ".concat(domain, ": ").concat(domainConfigError, ". Configure selectors from the userscript menu."));
    }
    return;
  }
  state.originalTitle = getTitleWithoutPrefix(document.title);
  state.running = true;
  state.runId += 1;
  ensureRunningTitlePrefix();
  scheduleSafeRedirect();
  createMask();
  updateControls();
  scanAndSendMessages();
  if (!state.timerId) {
    state.timerId = window.setInterval(scanAndSendMessages, CONFIG.intervalMs);
  }
  logInfo("Started monitoring.", {
    runId: state.runId,
    intervalMs: w(CONFIG.intervalMs)
  });
}
function stopMonitoring() {
  clearAutoStartTimer();
  if (state.running || state.scanning) {
    state.runId += 1;
  }
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
    logInfo("Cleared monitoring interval.");
  }
  clearSafeRedirectTimer();
  if (!state.running) {
    logInfo("Stop ignored because monitoring is already stopped.", {
      runId: state.runId
    });
    updateControls();
    return;
  }
  state.running = false;
  removeMask();
  document.title = state.originalTitle;
  updateControls();
  logInfo("Stopped monitoring.", {
    runId: state.runId
  });
}
function install() {
  if (window[INSTALL_FLAG]) {
    logWarn("Script is already installed; skipping duplicate installation.");
    return;
  }
  window[INSTALL_FLAG] = true;
  logInfo("Installing webhook monitor.");
  loadDomainConfigMap();
  loadSavedAfterScan();
  loadProcessedRecordsByDomain();
  registerStorageChangeListeners();
  syncDebugHelpers();
  exposeConfigApi();
  registerMenuCommands();
  createControls();
  scheduleAutoStart();
  logInfo("Installed webhook monitor.");
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", install, {
    once: true
  });
} else {
  install();
}
/******/ })()
;