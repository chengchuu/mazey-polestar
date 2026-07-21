// ==UserScript==
// @name         Peace Multi-Site Webhook Monitor
// @namespace    https://github.com/chengchuu/webpack-build-demo
// @version      2026.722.719
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

;// ./node_modules/mazey/lib/index.esm.js
/*!
 * Mazey v5.2.0 https://github.com/chengchuu/mazey
 * (c) 2018-2026 Cheng
 * Released under the MIT License.
 */
function e(e,t){var r=e.length,n=t.length;if(0===r||0===n)return 0;for(var o=Array.from({length:r},function(){return new Array(n).fill(0)}),i=0,a=0;a<r;++a)for(var u=0;u<n;++u)if(e[a]===t[u]){var c=0;a>0&&u>0&&(c=o[a-1][u-1]),o[a][u]=c+1,i=Math.max(i,o[a][u])}return i}function t(t,r){return e(t,r)}function r(e,t){var r=e.length,n=t.length;if(0===r||0===n)return 0;for(var o=Array.from({length:r},function(){return new Array(n).fill(0)}),i=0;i<r;++i)for(var a=0;a<n;++a)if(e[i]===t[a]){var u=0;i>0&&a>0&&(u=o[i-1][a-1]),o[i][a]=u+1}else{var c=0,s=0;a>0&&(c=o[i][a-1]),i>0&&(s=o[i-1][a]),o[i][a]=Math.max(c,s)}return o[r-1][n-1]}function n(e,t){return r(e,t)}function o(e){return Math.random()<e}function i(e){return o(e)}function a(e,t,r,n,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void r(e)}u.done?t(c):Promise.resolve(c).then(n,o)}function u(e){return function(){var t=this,r=arguments;return new Promise(function(n,o){var i=e.apply(t,r);function u(e){a(i,n,o,u,c,"next",e)}function c(e){a(i,n,o,u,c,"throw",e)}u(void 0)})}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function s(e,t){if(e){if("string"==typeof e)return c(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(e,t):void 0}}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i,a,u=[],c=!0,s=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(u.push(n.value),u.length!==t);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(e,t)||s(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var d,p={exports:{}},v={exports:{}};(d=v).exports=function(e,t){this.v=e,this.k=t},d.exports.__esModule=!0,d.exports.default=d.exports;var h=v.exports,g={exports:{}},y={exports:{}};!function(e){function t(r,n,o,i){var a=Object.defineProperty;try{a({},"",{})}catch(r){a=0}e.exports=t=function(e,r,n,o){function i(r,n){t(e,r,function(e){return this._invoke(r,n,e)})}r?a?a(e,r,{value:n,enumerable:!o,configurable:!o,writable:!o}):e[r]=n:(i("next",0),i("throw",1),i("return",2))},e.exports.__esModule=!0,e.exports.default=e.exports,t(r,n,o,i)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(y);var m=y.exports;!function(e){var t=m;function r(){var n,o,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.toStringTag||"@@toStringTag";function c(e,r,i,a){var u=r&&r.prototype instanceof f?r:f,c=Object.create(u.prototype);return t(c,"_invoke",function(e,t,r){var i,a,u,c=0,f=r||[],l=!1,d={p:0,n:0,v:n,a:p,f:p.bind(n,4),d:function(e,t){return i=e,a=0,u=n,d.n=t,s}};function p(e,t){for(a=e,u=t,o=0;!l&&c&&!r&&o<f.length;o++){var r,i=f[o],p=d.p,v=i[2];e>3?(r=v===t)&&(u=i[(a=i[4])?5:(a=3,3)],i[4]=i[5]=n):i[0]<=p&&((r=e<2&&p<i[1])?(a=0,d.v=t,d.n=i[1]):p<v&&(r=e<3||i[0]>t||t>v)&&(i[4]=e,i[5]=t,d.n=v,a=0))}if(r||e>1)return s;throw l=!0,t}return function(r,f,v){if(c>1)throw TypeError("Generator is already running");for(l&&1===f&&p(f,v),a=f,u=v;(o=a<2?n:u)||!l;){i||(a?a<3?(a>1&&(d.n=-1),p(a,u)):d.n=u:d.v=u);try{if(c=2,i){if(a||(r="next"),o=i[r]){if(!(o=o.call(i,u)))throw TypeError("iterator result is not an object");if(!o.done)return o;u=o.value,a<2&&(a=0)}else 1===a&&(o=i.return)&&o.call(i),a<2&&(u=TypeError("The iterator does not provide a '"+r+"' method"),a=1);i=n}else if((o=(l=d.n<0)?u:e.call(t,d))!==s)break}catch(e){i=n,a=1,u=e}finally{c=1}}return{value:o,done:l}}}(e,i,a),!0),c}var s={};function f(){}function l(){}function d(){}o=Object.getPrototypeOf;var p=[][a]?o(o([][a]())):(t(o={},a,function(){return this}),o),v=d.prototype=f.prototype=Object.create(p);function h(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,d):(e.__proto__=d,t(e,u,"GeneratorFunction")),e.prototype=Object.create(v),e}return l.prototype=d,t(v,"constructor",d),t(d,"constructor",l),l.displayName="GeneratorFunction",t(d,u,"GeneratorFunction"),t(v),t(v,u,"Generator"),t(v,a,function(){return this}),t(v,"toString",function(){return"[object Generator]"}),(e.exports=r=function(){return{w:c,m:h}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports}(g);var w=g.exports,b={exports:{}},x={exports:{}},S={exports:{}};!function(e){var t=h,r=m;e.exports=function e(n,o){function i(e,r,a,u){try{var c=n[e](r),s=c.value;return s instanceof t?o.resolve(s.v).then(function(e){i("next",e,a,u)},function(e){i("throw",e,a,u)}):o.resolve(s).then(function(e){c.value=e,a(c)},function(e){return i("throw",e,a,u)})}catch(e){u(e)}}var a;this.next||(r(e.prototype),r(e.prototype,"function"==typeof Symbol&&Symbol.asyncIterator||"@asyncIterator",function(){return this})),r(this,"_invoke",function(e,t,r){function n(){return new o(function(t,n){i(e,r,t,n)})}return a=a?a.then(n,n):n()},!0)},e.exports.__esModule=!0,e.exports.default=e.exports}(S);var O=S.exports;!function(e){var t=w,r=O;e.exports=function(e,n,o,i,a){return new r(t().w(e,n,o,i),a||Promise)},e.exports.__esModule=!0,e.exports.default=e.exports}(x);var E=x.exports;!function(e){var t=E;e.exports=function(e,r,n,o,i){var a=t(e,r,n,o,i);return a.next().then(function(e){return e.done?e.value:a.next()})},e.exports.__esModule=!0,e.exports.default=e.exports}(b);var _=b.exports,A={exports:{}};!function(e){e.exports=function(e){var t=Object(e),r=[];for(var n in t)r.unshift(n);return function e(){for(;r.length;)if((n=r.pop())in t)return e.value=n,e.done=!1,e;return e.done=!0,e}},e.exports.__esModule=!0,e.exports.default=e.exports}(A);var j=A.exports,T={exports:{}},k={exports:{}};!function(e){function t(r){return e.exports=t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,t(r)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(k);var M=k.exports;!function(e){var t=M.default;e.exports=function(e){if(null!=e){var r=e["function"==typeof Symbol&&Symbol.iterator||"@@iterator"],n=0;if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length))return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}throw new TypeError(t(e)+" is not iterable")},e.exports.__esModule=!0,e.exports.default=e.exports}(T);var P=T.exports;!function(e){var t=h,r=w,n=_,o=E,i=O,a=j,u=P;function c(){var s=r(),f=s.m(c),l=(Object.getPrototypeOf?Object.getPrototypeOf(f):f.__proto__).constructor;function d(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===l||"GeneratorFunction"===(t.displayName||t.name))}var p={throw:1,return:2,break:3,continue:3};function v(e){var t,r;return function(n){t||(t={stop:function(){return r(n.a,2)},catch:function(){return n.v},abrupt:function(e,t){return r(n.a,p[e],t)},delegateYield:function(e,o,i){return t.resultName=o,r(n.d,u(e),i)},finish:function(e){return r(n.f,e)}},r=function(e,r,o){n.p=t.prev,n.n=t.next;try{return e(r,o)}finally{t.next=n.n}}),t.resultName&&(t[t.resultName]=n.v,t.resultName=void 0),t.sent=n.v,t.next=n.n;try{return e.call(this,t)}finally{n.p=t.prev,n.n=t.next}}}return(e.exports=c=function(){return{wrap:function(e,t,r,n){return s.w(v(e),t,r,n&&n.reverse())},isGeneratorFunction:d,mark:s.m,awrap:function(e,r){return new t(e,r)},AsyncIterator:i,async:function(e,t,r,i,a){return(d(t)?o:n)(v(e),t,r,i,a)},keys:a,values:u}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=c,e.exports.__esModule=!0,e.exports.default=e.exports}(p);var N=(0,p.exports)(),C=N;try{regeneratorRuntime=N}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=N:Function("r","regeneratorRuntime = r")(N)}var R=l(C);function D(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return U(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?U(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){u=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw i}}}}function U(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var L=Function.prototype.toString.call(Object);function z(e,t,r){var n,o=null===(n=Object.getOwnPropertyDescriptor(t,r))||void 0===n?void 0:n.get;if(!o)return!1;try{return o.call(e),!0}catch(e){return!1}}function F(e){return null===e||"object"!=typeof e?e:I(e,function(){if("undefined"!=typeof WeakMap)return new WeakMap;var e=[],t=[];return{get:function(r){var n=e.indexOf(r);return-1===n?void 0:t[n]},set:function(r,n){e.push(r),t.push(n)}}}())}function I(e,t){if(null===e||"object"!=typeof e)return e;var r=e,n=t.get(r);if(void 0!==n)return n;var o=function(e){try{return Date.prototype.getTime.call(e)}catch(e){return null}}(r);if(null!==o){var i=new Date(o);return t.set(r,i),i}var a=function(e){var t,r=null===(t=Object.getOwnPropertyDescriptor(RegExp.prototype,"source"))||void 0===t?void 0:t.get;if(!r)return null;try{return r.call(e)}catch(e){return null}}(r);if(null!==a){var u=e,c=new RegExp(a,function(e){if("string"==typeof e.flags)return e.flags;var t=e,r="";return t.hasIndices&&(r+="d"),e.global&&(r+="g"),e.ignoreCase&&(r+="i"),e.multiline&&(r+="m"),e.dotAll&&(r+="s"),e.unicode&&(r+="u"),t.unicodeSets&&(r+="v"),e.sticky&&(r+="y"),r}(u));return c.lastIndex=u.lastIndex,t.set(r,c),c}if("undefined"!=typeof ArrayBuffer&&z(r,ArrayBuffer.prototype,"byteLength")){var s=ArrayBuffer.prototype.slice.call(e,0);return t.set(r,s),s}if("undefined"!=typeof SharedArrayBuffer&&z(r,SharedArrayBuffer.prototype,"byteLength")){var f=SharedArrayBuffer.prototype.slice.call(e,0);return t.set(r,f),f}if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&ArrayBuffer.isView(e)){var l=I(e.buffer,t),d="undefined"!=typeof DataView&&z(r,DataView.prototype,"byteLength")?new DataView(l,e.byteOffset,e.byteLength):new e.constructor(l,e.byteOffset,e.length);return t.set(r,d),d}if("undefined"!=typeof Map&&z(r,Map.prototype,"size")){var p=new Map;return t.set(r,p),Map.prototype.forEach.call(e,function(e,r){p.set(I(r,t),I(e,t))}),p}if("undefined"!=typeof Set&&z(r,Set.prototype,"size")){var v=new Set;return t.set(r,v),Set.prototype.forEach.call(e,function(e){v.add(I(e,t))}),v}var h=Array.isArray(e),g=Object.getPrototypeOf(e),y=function(e){var t=Object.getPrototypeOf(e);if(null===t)return!0;var r=Object.prototype.hasOwnProperty.call(t,"constructor")?t.constructor:null;return"function"==typeof r&&Function.prototype.toString.call(r)===L}(r),m=!h&&!y&&function(e){var t=Object.getPrototypeOf(e),r=null==t?void 0:t.constructor;return"function"==typeof r&&-1===Function.prototype.toString.call(r).indexOf("[native code]")}(r);if(!h&&!y&&!m)return t.set(r,e),e;var w=h?new Array(e.length):Object.create(m?Object.prototype:g);return t.set(r,w),function(e){var t=Object.getOwnPropertyNames(e);return"function"==typeof Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(e)):t}(r).forEach(function(e){if(!h||"length"!==e){var n=Object.getOwnPropertyDescriptor(r,e);n&&("value"in n&&(n.value=I(n.value,t)),Object.defineProperty(w,e,n))}}),w}function B(e){return!e||"object"!=typeof e||Object.isFrozen(e)||(Object.freeze(e),Object.values(e).forEach(B)),e}function $(e){return F(e)}function q(e){var t=e.replace(/([A-Z])/g,"-$1").toLowerCase();return"-"===t[0]?t.substring(1):t}function Z(e){var t=e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()});return t.endsWith("-")?t.slice(0,-1):t}function W(e){return q(e)}function V(e){var t=e.replace(/([A-Z])/g,"_$1").toLowerCase();return"_"===t[0]?t.substring(1):t}function H(e){return e.replace(/_([a-z])/g,function(e,t){return t.toUpperCase()})}function Y(e){return V(e)}function G(e){if("string"!=typeof e)throw new TypeError("value must be a string");var t=e.replace(/[^A-Za-z0-9_$]/g,"_").toUpperCase();return/^[A-Za-z_$]/.test(t)?t:"_".concat(t)}function J(e){for(var t=(e=e.replace(/^\s+/,"")).length-1,r=/\s/;r.test(e.charAt(t));)t--;return e.slice(0,t+1)}function K(e){if("string"!=typeof e)return!1;try{return JSON.parse(e),!0}catch(e){}return!1}function Q(e){return K(e)}function X(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;try{return JSON.parse(e)}catch(e){return t}}function ee(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5;if(!Number.isFinite(e)||e<=0)return"";e=Math.floor(e);for(var t="";e--;)t+=Math.floor(10*Math.random());return t}function te(){return ee(arguments.length>0&&void 0!==arguments[0]?arguments[0]:5)}function re(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3,t=[oe(),te(e||3)];return t[0]+t[1]}function ne(){return re(arguments.length>0&&void 0!==arguments[0]?arguments[0]:3)}function oe(){return Date.now?Date.now():(new Date).getTime()}function ie(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r="";return r=t?(100*e).toFixed(t):String(Math.floor(100*e)),"".concat(r,"%")}function ae(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return parseFloat(String(e)).toFixed(t)}function ue(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};r=Object.assign({},r);var n=null,o=null,i=null,a=null,u=0,c=function(){u=!1===r.leading?0:oe(),i=null,a=e.apply(this,o),i||(n=o=null)};return function(){var s=oe();u||!1!==r.leading||(u=s);var f=t-(s-u);n=this;for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];return o=d,f<=0||f>t?(i&&(clearTimeout(i),i=null),u=s,a=e.apply(n,o),i||(n=o=null)):i||!1===r.trailing||(i=setTimeout(c.bind(n),f)),a}}function ce(e,t,r){var n=null,o=null,i=null,a=null,u=null,c=function(){var s=oe()-i;s<t&&s>=0?o=setTimeout(c,t-s):(o=null,r||(u=e.apply(n,a),o||(n=a=null)))};return function(){n=this;for(var s=arguments.length,f=new Array(s),l=0;l<s;l++)f[l]=arguments[l];a=f,i=oe();var d=r&&!o;return o||(o=setTimeout(c,t)),d&&(u=e.apply(n,a),n=a=null),u}}var se={type:"d"};function fe(e){return"string"==typeof e&&/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(e)?e.replace(" ","T"):e}function le(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:se,n=(r=Object.assign({},se,r)).type;he(e)||(e=new Date(fe(e)).getTime()),he(t)||(t=new Date(fe(t)).getTime());var o=Number(t)-Number(e),i="",a=f(new Array(4).fill(0),4),u=a[0],c=(a[1],a[2],a[3]);if(o>=0)switch(u=Math.floor(o/1e3/60/60/24),Math.floor(o/1e3/60/60),Math.floor(o/1e3/60),c=Math.floor(o/1e3),n){case"d":i=u;break;case"text":i=[{value:u=Math.floor(o/1e3/60/60/24),unit:"day"},{value:Math.floor(o/1e3/60/60%24),unit:"hour"},{value:Math.floor(o/1e3/60%60),unit:"minute"},{value:c=Math.floor(o/1e3%60),unit:"second"}].filter(function(e){return e.value>0}).map(function(e){return pe(e.value,e.unit)}).join(" ")||pe(0,"second");break;default:i=c}return i}function de(){return le(arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,arguments.length>2&&void 0!==arguments[2]?arguments[2]:se)}function pe(e,t){var r=Math.round(10*e)/10,n=1===r?t:"".concat(t,"s");return"".concat(r," ").concat(n)}function ve(e){var t=(Number.isFinite(e)?Math.max(e,0):0)/1e3;return t>=86400?pe(t/24/60/60,"day"):t>=3600?pe(t/60/60,"hour"):t>=60?pe(t/60,"minute"):pe(t,"second")}function he(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.isNaNAsNumber,n=void 0!==r&&r,o=t.isInfinityAsNumber,i=void 0!==o&&o,a=t.isUnFiniteAsNumber;return"number"==typeof e&&(!(!0!==i&&!0!==(void 0!==a&&a)&&!isFinite(e))&&!(!n&&isNaN(e)))}function ge(e){var t=null;if(e&&"function"==typeof e){for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];t=e.apply(void 0,n)}return t}function ye(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return ge.apply(void 0,[e].concat(r))}function me(e){var t=!1;return Array.isArray(e)&&e.length&&(t=!0),t}function we(e){var t=Boolean(e),r="object"==typeof e,n="[object Object]"===Object.prototype.toString.call(e);return t&&r&&n}function be(e){return"function"==typeof e}function xe(e){return"string"==typeof e}function Se(e){return"boolean"==typeof e}function Oe(e){return Se(e)}function Ee(e){return null==e}function _e(e){return"[object Array]"===Object.prototype.toString.call(e)}function Ae(e){return!!we(e)&&0!==Object.keys(e).length}function je(e){if(!e)return"";var t=new RegExp("\\n","g");return e.replace(t,"<br />")}function Te(e){return je(e)}function ke(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).removeNewLine,r=void 0!==t&&t,n="";return e&&(n=e.replace(/<\/?.+?>/g,""),r&&(n=n.replace(/[\r\n]/g,""))),n}function Me(e){return ke(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}function Pe(e){return ke(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}function Ne(e){return ke(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}function Ce(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"};if("string"!=typeof e)throw new Error("Input must be a string");return e.replace(/[&<>"'/]/g,function(e){return t[e]})}function Re(e){var t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#x27;":"'","&#x2F;":"/"};if("string"!=typeof e)throw new Error("Input must be a string");return e.replace(/(&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;)/g,function(e){return t[e]})}function De(e){return Re(e)}function Ue(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{hasDot:!1,dotText:"..."};if(r=Object.assign({hasDot:!1,dotText:"..."},r),""!=e&&e){for(var n=0,o="",i=/[^\x00-\xff]/g,a="",u=e.replace(i,"**").length,c=0;c<u&&(null!=(a=e.charAt(c).toString()).match(i)?n+=2:n++,!(n>t));c++)o+=a;return r.hasDot&&u>t&&(o+=r.dotText),o}return""}function Le(e,t){return Ue(e,t,{hasDot:arguments.length>2&&void 0!==arguments[2]&&arguments[2]})}function ze(e,t){return Le(e,t,arguments.length>2&&void 0!==arguments[2]&&arguments[2])}function Fe(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{validStatusRange:[200,300],validCode:[0]})||{},r=t.validStatusRange,n=void 0===r?[200,300]:r,o=t.validCode,i=void 0===o?[0]:o;2!==n.length&&console.error("valid validStatusRange is required");var a=!1;if(e&&e.status&&2===n.length&&e.status>=n[0]&&e.status<n[1]){var u=e.data;u&&i.includes(u.code)&&(a=!0)}return a}function Ie(e,t,r){if(null===e||"object"!=typeof e)return!1;var n,o=e,i=D(t);try{for(i.s();!(n=i.n()).done;){var a=n.value;if(null===o||"object"!=typeof o&&"function"!=typeof o||!Object.prototype.hasOwnProperty.call(o,a))return!1;o=o[a]}}catch(e){i.e(e)}finally{i.f()}return o===r}function Be(e){var t=function(e){return String(Math.ceil(e))};if(!Number.isFinite(e)||e<=0)return"";var r=1024;return e<r?e+" B":e<Math.pow(r,2)?t(e/r)+" KB":e<Math.pow(r,3)?t(e/Math.pow(r,2))+" MB":e<Math.pow(r,4)?t(e/Math.pow(r,3))+" G":t(e/Math.pow(r,4))+" T"}function $e(e){var t,r=0;for(t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t),r|=0;return r}function qe(e){return Ze.apply(this,arguments)}function Ze(){return(Ze=u(R.mark(function e(t){var r,n,o,i,a,u,c;return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=(r="undefined"==typeof crypto?null:crypto)&&r.subtle&&"function"==typeof r.subtle.digest){e.next=1;break}throw new Error("Web Crypto API is not available.");case 1:if(n=t,"string"!=typeof t){e.next=3;break}if("undefined"!=typeof TextEncoder){e.next=2;break}throw new Error("TextEncoder is not available.");case 2:n=(new TextEncoder).encode(t);case 3:return e.next=4,r.subtle.digest("SHA-256",n);case 4:for(o=e.sent,i="",a=new Uint8Array(o),u=0;u<a.length;u++)c=a[u].toString(16),i+=1===c.length?"0".concat(c):c;return e.abrupt("return",i);case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}var We=/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/,Ve=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})$/;function He(e,t,r,n,o,i){var a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,u=arguments.length>7&&void 0!==arguments[7]&&arguments[7],c=new Date(0);return u?(c.setUTCFullYear(e,t-1,r),c.setUTCHours(n,o,i,a),Number.isFinite(c.getTime())&&c.getUTCFullYear()===e&&c.getUTCMonth()===t-1&&c.getUTCDate()===r&&c.getUTCHours()===n&&c.getUTCMinutes()===o&&c.getUTCSeconds()===i&&c.getUTCMilliseconds()===a):(c.setFullYear(e,t-1,r),c.setHours(n,o,i,a),Number.isFinite(c.getTime())&&c.getFullYear()===e&&c.getMonth()===t-1&&c.getDate()===r&&c.getHours()===n&&c.getMinutes()===o&&c.getSeconds()===i&&c.getMilliseconds()===a)}function Ye(e){if("number"==typeof e)return Number.isFinite(e)&&Number.isFinite(new Date(e).getTime());if("object"==typeof e&&null!==e)try{return Number.isFinite(Date.prototype.getTime.call(e))}catch(e){return!1}if("string"!=typeof e)return!1;var t=e.trim();if(!t)return!1;var r=We.exec(t);if(r){var n=f(r.slice(1),6),o=n[0],i=n[1],a=n[2],u=n[3],c=void 0===u?"0":u,s=n[4],l=void 0===s?"0":s,d=n[5],p=void 0===d?"0":d;return He(Number(o),Number(i),Number(a),Number(c),Number(l),Number(p))}var v=Ve.exec(t);if(!v)return!1;var h=f(v.slice(1),8),g=h[0],y=h[1],m=h[2],w=h[3],b=h[4],x=h[5],S=void 0===x?"0":x,O=h[6],E=void 0===O?"":O,_=h[7],A=Number("".concat(E,"00").slice(0,3));if(!He(Number(g),Number(y),Number(m),Number(w),Number(b),Number(S),A,!0))return!1;if("Z"===_)return!0;var j=Number(_.slice(1,3)),T=Number(_.slice(4,6));return j<=23&&T<=59}function Ge(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy-MM-dd";void 0===e&&(e=new Date);var r=new Date(e);if(!Number.isFinite(r.getTime()))throw new RangeError("Invalid date");var n=r.getHours(),o={yyyy:r.getFullYear(),MM:r.getMonth()+1,dd:r.getDate()<10?"0"+r.getDate():r.getDate(),HH:n<10?"0"+n:n,hh:(n%12||12)<10?"0"+(n%12||12):n%12||12,mm:r.getMinutes()<10?"0"+r.getMinutes():r.getMinutes(),ss:r.getSeconds()<10?"0"+r.getSeconds():r.getSeconds(),a:n<12?"AM":"PM"},i=t||"yyyy-MM-dd";return Object.keys(o).forEach(function(e){var t=o[e];"MM"===e&&Number(t)<=9&&(t="0".concat(t)),i=i.split(e).join(String(t))}),i}function Je(e){return Ge(void 0===e?new Date:new Date(e instanceof Date?e.getTime():e),"yyyy.MMdd.HHmmss").split(".").map(function(e){return String(Number(e))}).join(".")}function Ke(e){return/^1\d{10}$/.test(e)}function Qe(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}function Xe(e){if(!Number.isFinite(e)||e<=0)return"";e=Math.floor(e);for(var t="";e>0;){var r=e%26;0===r&&(r=26),t=String.fromCharCode(r+96)+t,e=(e-r)/26}return t}function et(){return"v4"}function tt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(e){return!0===e},n=t.interval,o=void 0===n?1e3:n,i=t.times,a=void 0===i?10:i,c=t.context,s=t.args;if("function"==typeof e){if(!Number.isFinite(o)||o<0)console.error("Expected a non-negative number for interval.");else if(!Number.isFinite(a)||a<0)console.error("Expected a non-negative number for times.");else if(0!==a){var f=0,l=function(){setTimeout(u(R.mark(function t(){var n;return R.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=1,e.apply(c,s);case 1:if(n=t.sent,!(r(n)||++f>=a)){t.next=2;break}return t.abrupt("return");case 2:l();case 3:case"end":return t.stop()}},t)})),o)};l()}}else console.error("Expected a function.")}function rt(e){return nt.apply(this,arguments)}function nt(){return(nt=u(R.mark(function e(t){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(e){setTimeout(function(){e(t)},t)}));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}function ot(e){return it.apply(this,arguments)}function it(){return(it=u(R.mark(function e(t){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",rt(t));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}var at="";function ut(){if(at)return"browser"===at;var e="undefined"!=typeof window;return e&&(at="browser"),e}function ct(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}}function st(e){var t=e.indexOf("#"),r=-1===t?e:e.slice(0,t),n=r.indexOf("?"),o=/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(r)||"/"===r.charAt(0),i=-1===n?o?"":r:r.slice(n+1);return i?i.split("&").reduce(function(e,t){if(!t||-1===t.indexOf("="))return e;var r=t.indexOf("=");return e.push([ct(t.slice(0,r)),ct(t.slice(r+1))]),e},[]):[]}function ft(e,t){return st(e).filter(function(e){return f(e,1)[0]===t}).map(function(e){return f(e,2)[1]})}var lt=/^(?=.{1,39}$)(?!.*--)[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/,dt=/^(?=.{1,100}$)(?!\.{1,2}$)[A-Za-z0-9_.-]+$/;function pt(){return new Error("The value does not identify one supported GitHub repository")}function vt(e,t){var r=t.replace(/\.git$/i,"");if(!lt.test(e)||!dt.test(r))throw pt();var n="".concat(e,"/").concat(r);return{owner:e,name:r,slug:n,url:"https://github.com/".concat(n)}}function ht(e){if("string"!=typeof e)throw new TypeError("value must be a string");var t=e.trim();if(!t||/[%\\?#]/.test(t)||function(e){for(var t=0;t<e.length;t++){var r=e.charCodeAt(t);if(r<=31||127===r)return!0}return!1}(t))throw pt();var r=t.match(/^(?:github:)?([^/:\s]+)\/([^/\s]+)$/i);if(r)return vt(r[1],r[2]);var n=t.match(/^git@([^:\s]+):([^/\s]+)\/([^/\s]+)$/);if(n&&"github.com"===n[1].toLowerCase())return vt(n[2],n[3]);var o,i=t.replace(/^git\+(?=(?:git|ssh|https?):\/\/)/i,""),a=i.match(/^[a-z][a-z\d+.-]*:\/\/([^/?#]+)/i);if(!a||/(^|\/)\.{1,2}(?:\/|$)/.test(i.slice(a[0].length)))throw pt();if(-1!==a[1].slice(a[1].lastIndexOf("@")+1).indexOf(":")||"function"!=typeof URL)throw pt();try{o=new URL(i)}catch(e){throw pt()}var u=o.protocol.toLowerCase(),c=o.hostname.toLowerCase().replace(/^www\./,"");if(!["git:","ssh:","http:","https:"].includes(u)||"github.com"!==c||""!==o.username&&"git"!==o.username||""!==o.password||""!==o.search||""!==o.hash)throw pt();var s=o.pathname.match(/^\/([^/]+)\/([^/]+)\/?$/);if(!s)throw pt();return vt(s[1],s[2])}function gt(e){return ft(location.search,e)[0]||""}function yt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";""===e&&(e=location.search);var t={};return st(e).forEach(function(e){var r=f(e,2),n=r[0],o=r[1];Object.prototype.hasOwnProperty.call(t,n)||Object.defineProperty(t,n,{configurable:!0,enumerable:!0,value:o,writable:!0})}),t}function mt(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=ft(e,t);return r.returnArray?n:n.length?n[0]:null}function wt(e,t,r){var n=e.indexOf("#"),o=-1===n?"":e.slice(n),i=-1===n?e:e.slice(0,n),a=i.indexOf("?"),u=-1===a?i:i.slice(0,a),c=-1===a?"":i.slice(a+1),s=encodeURIComponent(t),f=encodeURIComponent(r),l=!1,d=(c?c.split("&").filter(Boolean):[]).reduce(function(e,r){var n=r.indexOf("=");return ct(-1===n?r:r.slice(0,n))===t?l||(e.push("".concat(s,"=").concat(f)),l=!0):e.push(r),e},[]);return l||d.push("".concat(s,"=").concat(f)),"".concat(u,"?").concat(d.join("&")).concat(o)}function bt(e){var t=location.hash.split("?");return 1===t.length?"":ft("?".concat(t.slice(1).join("?")),e)[0]||""}function xt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["hostname"];if(Rt(e)){var r=new window.URL(e);return t.reduce(function(e,t){return e+=r[t]},"")}var n=document.createElement("a");return n.href=e,t.reduce(function(e,t){return e+=n[t]},"")}function St(e){return/^[a-zA-Z0-9]+:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\b([-a-zA-Z0-9\u4E00-\u9FA5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b()!@:%_+.~#?&//=]*)$/.test(e)}function Ot(e){return void 0===e||Number(e)<=65535}function Et(e){var t=e.split(".");return 4===t.length&&t.every(function(e){return/^\d{1,3}$/.test(e)&&(1===e.length||"0"!==e.charAt(0))&&Number(e)<=255})}function _t(e){var t=e.split("::");if(t.length>2)return!1;var r=2===t.length,n=[];t.forEach(function(e){e&&(n=n.concat(e.split(":")))});for(var o=0,i=0;i<n.length;i++){var a=n[i];if(-1!==a.indexOf(".")){if(i!==n.length-1||!Et(a))return!1;o+=2}else{if(!/^[0-9a-f]{1,4}$/i.test(a))return!1;o+=1}}return r?o<8:8===o}function At(e){var t=e.match(/^\[([0-9a-f:.]+)\]$/i);if(t)return _t(t[1]);if("."===e.charAt(e.length-1)&&(e=e.slice(0,-1)),Et(e))return!0;var r=e.split(".");return!(r.length<2||r.some(function(e){return!e||!/^[a-z\d-]+$/i.test(e)||"-"===e.charAt(0)||"-"===e.charAt(e.length-1)}))&&!/^\d+$/.test(r[r.length-1])}function jt(e){var t=e.match(/^https?:\/\/([^/?#]+)(?:[/?#][^\s<>"`]*)?$/i);if(!t||-1!==t[1].indexOf("@"))return!1;var r=t[1],n=r.match(/^\[([0-9a-f:.]+)\](?::(\d*))?$/i);if(n)return _t(n[1])&&Ot(n[2]);var o=r.match(/^([^:]+)(?::(\d*))?$/);return!(!o||!Ot(o[2]))&&At(o[1])}function Tt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{strict:!0};if("string"!=typeof e||!e||e.trim()!==e)return!1;var r=/^https?:\/\/[^/\\]/i.test(e),n=/^\/\/[^/\\]/.test(e);if(!r&&(t.strict||!n))return!1;var o=n?"http:".concat(e):e;if(!jt(o))return!1;if("function"!=typeof URL)return!0;try{var i=new URL(o);return("http:"===i.protocol||"https:"===i.protocol)&&At(i.hostname)&&!i.username&&!i.password}catch(e){try{return new URL("http://example.com"),!1}catch(e){return jt(o)}}}function kt(e){var t="";if("string"!=typeof e||""==e)return t;var r=e.split(/[?#]/,1)[0],n=/\.[^/]+$/.exec(r);return n?(n[0].length>1&&(t=n[0].substring(1)),t):t}function Mt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t||(t=".js");for(var r=document.querySelectorAll("script[src]"),n=0;n<r.length;n++){var o=r[n].getAttribute("src");if(o&&-1!==o.indexOf(t)){var i=ft(o,e)[0];if(void 0!==i)return i}}return""}function Pt(e){return e&&0===Object.keys(e).length?"":"?".concat(Object.keys(e).map(function(t){return"".concat(encodeURIComponent(t),"=").concat(encodeURIComponent(e[t]))}).join("&"))}function Nt(e){return e.replace(/^http:/,"https:")}function Ct(e){return Nt(e)}function Rt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=window.URL;if("function"!=typeof t)return!1;try{var r=new t(e);return Boolean(r.href)}catch(e){return!1}}function Dt(e){var t="";(!Tt(e)&&Tt(e,{strict:!1})&&0===e.indexOf("//")&&(e="https:"+e),Rt(e))&&(t=new URL(e).host);return t}function Ut(e){var t="";(!Tt(e)&&Tt(e,{strict:!1})&&0===e.indexOf("//")&&(e="https:"+e),Rt(e))&&(t=new URL(e).pathname);return t}function Lt(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).fireOnInit,r=void 0===t||t,n=history,o=location.href,i=[],a=function(t){var r=location.href;if(r!==o||"load"===t){var n=o;o=r,e({url:r,oldUrl:n,trigger:t})}},u=function(){return a("popstate")},c=function(){return a("hashchange")};window.addEventListener("popstate",u),window.addEventListener("hashchange",c),i.push(function(){return window.removeEventListener("popstate",u)}),i.push(function(){return window.removeEventListener("hashchange",c)}),n.__mazeyUrlChangePatched__||(n.__mazeyUrlChangePatched__=!0,n.__mazeyUrlChangeSubscribers__=new Set,n.__mazeyRawPushState__=history.pushState.bind(history),n.__mazeyRawReplaceState__=history.replaceState.bind(history),history.pushState=function(){n.__mazeyRawPushState__.apply(n,arguments),n.__mazeyUrlChangeSubscribers__.forEach(function(e){return e("pushState")})},history.replaceState=function(){n.__mazeyRawReplaceState__.apply(n,arguments),n.__mazeyUrlChangeSubscribers__.forEach(function(e){return e("replaceState")})});var s=function(e){return a(e)};return n.__mazeyUrlChangeSubscribers__.add(s),i.push(function(){return n.__mazeyUrlChangeSubscribers__.delete(s)}),r&&a("load"),function(){i.forEach(function(e){return e()})}}function zt(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||s(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ft(e){return Ft="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ft(e)}function It(e){var t=function(e,t){if("object"!=Ft(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=Ft(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==Ft(t)?t:t+""}function Bt(e,t,r){return(t=It(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function $t(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function qt(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?$t(Object(r),!0).forEach(function(t){Bt(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):$t(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var Zt={enabled:!0,isClosed:!1,showWrap:!1,showDate:!1,locales:"en-US",isStringifyObject:!1,logFn:function(){},errorFn:function(){}};function Wt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:qt({},Zt),r=Object.assign(qt({},Zt),t),n=r.enabled,o=r.isClosed,i=r.showWrap,a=r.showDate,u=r.locales,c=r.isStringifyObject,s=r.logFn,f=r.errorFn,l=n;!0===o&&(Vt.warn("The options.isClosed is deprecated. Please use options.enabled instead."),l=!1);var d=Object.create(null),p=function(){return(new Date).toLocaleDateString(u,{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})};return["log","info","warn","error"].forEach(function(t){d[t]=function(){for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];if(l){var u,d,v=e,h=e;if("string"==typeof e&&e.length>=2){var g=e.length;v=":"===e[g-1]?e.substring(0,g-1):e}if(i&&console.log("--- ".concat(v," - begin ---")),a&&(h=e?"".concat(p()," ").concat(e):"".concat(p())),c&&(n=n.map(function(e){return we(e)?JSON.stringify(e):e})),e||a)(u=console)[t].apply(u,[h].concat(zt(n)));else(d=console)[t].apply(d,zt(n));"log"===t&&s(),"error"===t&&f(),i&&console.log("--- ".concat(v," - end ---"))}}}),d}var Vt=Wt("[Mazey]"),Ht=Wt("",{showDate:!0,locales:"zh-CN",isStringifyObject:!0});function Yt(e,t){if(!e)return Vt.error("The element is not exist."),!1;for(var r=e.className.split(/\s+/),n=0;n<r.length;n++)if(r[n]===t)return!0;return!1}function Gt(e,t){if(e){if(Array.isArray(t))t.forEach(function(t){t&&e.classList.add(t)});else if(t){for(var r=e.className,n=r.split(/\s+/),o=0;o<n.length;o++)if(n[o]===t)return;var i,a="";""!==r&&(a=" "),i=r+a+t,e.className=i}}else Vt.error("The element is not exist.")}function Jt(e,t){Gt(e,t)}function Kt(e,t){var r;e?(r=(r=(r=(r=" "+e.className+" ").replace(/(\s+)/gi," ")).replace(" "+t+" "," ")).replace(/(^\s+)|(\s+$)/g,""),e.className=r):Vt.error("The element is not exist.")}function Qt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{id:""};if(!e)return!1;var r=document.createDocumentFragment(),n=null,o="",i=document.createElement("style");return t.id?(o="".concat(t.id),(n=document.getElementById(o))?n.innerHTML=e:(i.setAttribute("id",t.id),i.innerHTML=e,r.appendChild(i),document.head.appendChild(r))):(i.innerHTML=e,r.appendChild(i),document.head.appendChild(r)),!0}function Xt(){var e=window.jQuery||window.$;if(e){var t=e("img");return!(!t||!t.length)&&(t.each(function(){var t=e(this);if(t){var r=t.attr("src");if(r&&"string"==typeof r&&r.length){var n=r.match(/[?&]width=([0-9]+[a-z%]*)/),o=r.match(/[?&]height=([0-9]+[a-z%]*)/);n&&me(n)&&n[1]&&t.width(n[1]),o&&me(o)&&o[1]&&t.height(o[1])}}}),!0)}var r=document.getElementsByTagName("img");return r.length>0&&(Array.from(r).forEach(function(e){var t=e;if(t){var r=t.getAttribute("src");if(r&&"string"==typeof r&&r.length){var n=r.match(/[?&]width=([0-9]+[a-z%]*)/),o=r.match(/[?&]height=([0-9]+[a-z%]*)/);n&&me(n)&&n[1]&&(t.style.width=n[1]),o&&me(o)&&o[1]&&(t.style.height=o[1])}}}),!0)}function er(){return Xt()}function tr(e,t){var r="";return t&&t.length>0&&(r=t.join(";")+";"),"".concat(e,"{").concat(r,"}")}function rr(e){for(var t=document.getElementsByTagName("meta"),r=0;r<t.length;r++)if(t[r].getAttribute("name")===e)return t[r].getAttribute("content")||"";return""}function nr(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("string"!=typeof e)return!1;var r=e.trim();if(!r)return!0===t.allowEmpty;var n=t.root||("undefined"==typeof document?null:document);if(!n)return!1;try{return n.querySelector(r),!0}catch(e){return!1}}function or(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.excludeSelector,n=void 0===r?"":r,o=t.replaceImagesWithAlt,i=void 0===o||o,a=t.normalizeWhitespace,u=void 0===a||a,c=e.cloneNode(!0);i&&Array.from(c.querySelectorAll("img[alt]")).forEach(function(e){var t,r=e.getAttribute("alt")||"";null===(t=e.parentNode)||void 0===t||t.replaceChild(c.ownerDocument.createTextNode(r),e)});var s=n.trim();s&&nr(s,{root:c})&&Array.from(c.querySelectorAll(s)).forEach(function(e){var t;return null===(t=e.parentNode)||void 0===t?void 0:t.removeChild(e)});var f=c.innerText||c.textContent||"";return u?f.replace(/\u00a0/g," ").replace(/\s+/g," ").trim():f}function ir(e){var t=e||window.event;t.stopPropagation?t.stopPropagation():t.cancelBubble=!0}function ar(){var e=window.MAZEY_DEFINE_LISTENERS;if(e&&"object"==typeof e)return e;var t=Object.create(null);return window.MAZEY_DEFINE_LISTENERS=t,t}function ur(e,t){var r=ar();Array.isArray(r[e])||Object.defineProperty(r,e,{configurable:!0,enumerable:!0,value:[],writable:!0}),"function"==typeof t&&r[e].push(t)}function cr(e,t){var r=ar()[e];if(Array.isArray(r))for(var n=r.slice(),o=0,i=n.length;o<i;o++)"function"==typeof n[o]&&(void 0===t?n[o]():n[o](t))}function sr(e,t){cr(e,t)}function fr(e,t){var r=ar(),n=r[e];if("string"==typeof e&&Array.isArray(n))if("function"==typeof t){for(var o=0,i=n.length;o<i;o++)if(n[o]===t){r[e].splice(o,1);break}}else delete r[e]}function lr(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(e){var r=JSON.stringify(t);sessionStorage.setItem(e,void 0===r?"null":r)}}function dr(e){var t=null;if(e){var r=sessionStorage.getItem(e);if(r)try{t=JSON.parse(r)}catch(e){t=r}}return t}function pr(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(e){var r=JSON.stringify(t);localStorage.setItem(e,void 0===r?"null":r)}}function vr(e){var t=null;if(e){var r=localStorage.getItem(e);if(r)try{t=JSON.parse(r)}catch(e){t=r}}return t}var hr="__mazey_cookie_name_encoded__-",gr="__mazey_cookie_value_encoded__-";function yr(e){return"".concat(gr).concat(encodeURIComponent(e))}function mr(e){var t=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/.test(e),r=0===e.indexOf(hr)||0===e.indexOf(gr);return t&&!r?e:function(e){return"".concat(hr).concat(encodeURIComponent(e))}(e)}function wr(e){var t=mr(e);return t!==e?[t,e]:[e]}function br(e){for(var t=e+"=",r=document.cookie.split(";"),n=0;n<r.length;n++){var o=r[n].trim();if(0===o.indexOf(t))return o.substring(t.length)}}function xr(e){for(var t=wr(e),r="1"===br(yr(e)),n=0;n<t.length;n++){var o=br(t[n]);if(void 0!==o){if(r)try{return decodeURIComponent(o)}catch(e){return o}return o}}return""}function Sr(e,t,r,n){var o;if(r){var i=new Date;i.setTime(i.getTime()+24*r*60*60*1e3),o="; expires="+i.toUTCString()}else o="";var a=function(e){for(var t=!0,r=0;r<e.length;r++){var n=e.charCodeAt(r);if(!(33===n||n>=35&&n<=43||n>=45&&n<=58||n>=60&&n<=91||n>=93&&n<=126)){t=!1;break}}return{isEncoded:!t,value:t?e:encodeURIComponent(e)}}(t),u=mr(e),c=a.isEncoded?"1":"",s=a.isEncoded?o:"; expires=Thu, 01 Jan 1970 00:00:00 GMT",f=["".concat(u,"=").concat(a.value).concat(o,"; path=/"),"".concat(yr(e),"=").concat(c).concat(s,"; path=/")],l=function(e){var t=e?"; domain=".concat(e):"";f.forEach(function(e){document.cookie="".concat(e).concat(t)})},d=location.hostname;if(n)l(n);else if(-1===d.indexOf("."))l();else{var p=d.split(".");p.shift(),l("."+p.join(".")),xr(e)!==t&&l(".".concat(d))}}function Or(e){var t=wr(e),r=t.concat(yr(e)),n=new Date;n.setTime(n.getTime()-1);var o=t.some(function(e){return void 0!==br(e)});return r.forEach(function(e,t){r.indexOf(e)===t&&void 0!==br(e)&&["".concat(e,"=; expires=").concat(n.toUTCString()),"".concat(e,"=; expires=").concat(n.toUTCString(),"; path=/")].forEach(function(e){document.cookie=e;var t=location.hostname;if(-1!==t.indexOf("."))for(var r=t.split("."),n=0;n<r.length;n++)document.cookie="".concat(e,"; domain=.").concat(r.slice(n).join("."))})}),o&&r.every(function(e){return void 0===br(e)})}function Er(e){Or(e)}function _r(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function Ar(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_r(Object(r),!0).forEach(function(t){Bt(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_r(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function jr(e){var t,r=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{id:""}).id,n=function(){},o=new Promise(function(e,r){t=e,n=r}),i=function(){f(),t("loaded")},a=document.createElement("link");a||n(new Error("Not support create link element"));var u="onload"in a,c=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i,"$1")<536;if(a.rel="stylesheet",a.type="text/css",a.href=e,void 0!==r&&(a.id=r),document.getElementsByTagName("head")[0].appendChild(a),c||!u)return setTimeout(function(){l(a,i,0)},1),o;function s(){i()}function f(){a&&(a.onload=a.onerror=a.onreadystatechange=null),a=null}function l(e,t,r){if(e){var n,o=e.sheet;if((r+=1)>3e5)return n=!0,e&&(e=null),void t();if(c)o&&(n=!0);else if(o)try{o.cssRules&&(n=!0)}catch(e){"NS_ERROR_DOM_SECURITY_ERR"===e.name&&(n=!0)}setTimeout(function(){n?t():l(e,t,r)},20)}}return u?(a.onload=s,a.onerror=function(){f(),n(new Error("Failed to load CSS: ".concat(e)))}):a.onreadystatechange=function(){a&&/loaded|complete/.test(a.readyState)&&s()},o}var Tr={id:"",callback:function(){},timeout:5e3,isDefer:!1,isAsync:!1,isCrossOrigin:!1,attributes:null,cssUrl:""};function kr(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Ar({},Tr),r=Object.assign(Ar({},Tr),t),n=r.id,o=r.callback,i=r.timeout,a=r.isDefer,u=r.isAsync,c=r.isCrossOrigin,s=r.attributes,f=r.cssUrl;if(f){var l=function(e,t){if(!t)return"";if(Tt(t))return t;try{var r=new URL(e,location.href);return new URL(t,r).href}catch(r){var n=e.split("/");return n.pop(),"".concat(n.join("/"),"/").concat(t)}}(e,f);l&&jr(l).catch(function(e){console.error("Failed to load CSS from ".concat(l,": ").concat(null==e?void 0:e.message))})}return new Promise(function(t,r){var f=document.createElement("script"),l=!1,d=null,p=function(){f.onload=null,f.onerror=null,f.onreadystatechange=null,null!==d&&(clearTimeout(d),d=null)},v=function(){if(!l){l=!0,p();try{ye(o),t("loaded")}catch(e){r(e)}}},h=function(e){l||(l=!0,p(),r(e))};f.type="text/javascript",f.defer=Boolean(a),f.async=Boolean(u),c&&(f.crossOrigin="anonymous"),n&&(f.id=n),s&&Object.keys(s).forEach(function(e){f.setAttribute(e,s[e])}),f.readyState?f.onreadystatechange=function(){"loaded"!==f.readyState&&"complete"!==f.readyState||v()}:f.onload=v,f.onerror=function(){return h(new Error("Failed to load script: ".concat(e)))},f.src=e,i&&(d=setTimeout(function(){return h(new Error("timeout"))},i));var g=document.getElementsByTagName("script")[0];null!=g&&g.parentNode?g.parentNode.insertBefore(f,g):(document.head||document.body||document.documentElement).appendChild(f)})}function Mr(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e4;return new Promise(function(t,r){var n=null,o=function(){window.removeEventListener("load",i),null!==n&&(clearTimeout(n),n=null)},i=function(){o(),t("load")};"complete"!==document.readyState?(window.addEventListener("load",i),n=setTimeout(function(){o(),r(new Error("timeout"))},e)):t("complete")})}function Pr(e){return new Promise(function(t,r){var n=new Image;n.onload=function(){t(n)},n.onerror=function(e){r(e)},n.src=e})}function Nr(e,t){var r;if(window[e])return Promise.resolve("defined");var n=Cr.get(e),o=null===(r=n)||void 0===r?void 0:r.get(t);if(o)return o;n||(n=new Map,Cr.set(e,n));var i=function(){var r,o;null===(r=n)||void 0===r||r.delete(t),0===(null===(o=n)||void 0===o?void 0:o.size)&&Cr.delete(e)},a=kr(t).then(function(e){return i(),e},function(e){throw i(),e});return n.set(t,a),a}var Cr=new Map;function Rr(e){if("undefined"==typeof window)return!1;var t=[],r=window.PerformanceObserver;return!!r&&(me(r.supportedEntryTypes)&&(t=r.supportedEntryTypes),t.includes(e))}function Dr(){return Ur.apply(this,arguments)}function Ur(){return(Ur=u(R.mark(function e(){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Rr("paint")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new window.PerformanceObserver(function(r){var n=r.getEntries().find(function(e){return"first-contentful-paint"===e.name});n&&(t.disconnect(),e(Math.round(n.startTime)))});t.observe({type:"paint",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Lr(){return zr.apply(this,arguments)}function zr(){return(zr=u(R.mark(function e(){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Rr("paint")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new window.PerformanceObserver(function(r){var n=r.getEntries().find(function(e){return"first-paint"===e.name});n&&(t.disconnect(),e(Math.round(n.startTime)))});t.observe({type:"paint",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Fr(){return Ir.apply(this,arguments)}function Ir(){return(Ir=u(R.mark(function e(){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Rr("largest-contentful-paint")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new window.PerformanceObserver(function(r){var n=r.getEntries().find(function(e){return"largest-contentful-paint"===e.entryType});n&&(t.disconnect(),e(Math.round(n.startTime)))});t.observe({type:"largest-contentful-paint",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Br(){return $r.apply(this,arguments)}function $r(){return($r=u(R.mark(function e(){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Rr("first-input")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new window.PerformanceObserver(function(r){var n=r.getEntries().find(function(e){return"first-input"===e.entryType});if(n){t.disconnect();var o=n.processingStart;e(o?Math.round(n.processingStart-n.startTime):0)}});t.observe({type:"first-input",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function qr(){return Zr.apply(this,arguments)}function Zr(){return(Zr=u(R.mark(function e(){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Rr("layout-shift")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new window.PerformanceObserver(function(r){var n=r.getEntries().reduce(function(e,t){var r=0;return he(t.value)&&(r=t.value),e+r},0);t.disconnect(),e(n)});t.observe({type:"layout-shift",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Wr(){return Vr.apply(this,arguments)}function Vr(){return(Vr=u(R.mark(function e(){var t,r;return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Rr("navigation")){e.next=1;break}return e.abrupt("return",0);case 1:if(window.performance&&window.performance.getEntriesByType){e.next=2;break}return e.abrupt("return",0);case 2:if(t=window.performance.getEntriesByType("navigation")[0],r=0,t){e.next=3;break}return e.abrupt("return",0);case 3:return r=t.responseStart-t.requestStart,e.abrupt("return",Math.round(r));case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Hr(){return Yr.apply(this,arguments)}function Yr(){return Yr=u(R.mark(function e(){var t,r,n,o,i,a,u,c,s,l,d,p,v,h,g,y,m,w,b,x,S,O,E,_,A,j,T,k,M,P,N,C,D,U,L,z,F,I,B,$,q,Z,W,V=arguments;return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(W=function(e,t){var r=0;return t&&(r=e-t),r},Z=function(){var e="";return window.screen&&window.screen.orientation&&"number"==typeof window.screen.orientation.angle&&(180!==window.screen.orientation.angle&&0!==window.screen.orientation.angle||(e="|"),90!==window.screen.orientation.angle&&-90!==window.screen.orientation.angle||(e="-")),e},q=function(){var e="",t=window.navigator;if(t.connection&&t.connection.effectiveType)switch(t.connection.effectiveType){case"wifi":e="wifi";break;case"4g":e="4g";break;case"2g":e="2g";break;case"3g":e="3g";break;case"ethernet":e="ethernet";break;case"default":e=void 0}return e||(e=""),e},$=function(){var e,t=navigator.userAgent.toLowerCase(),r=t.match(/(ipad)/i)&&"ipad",n=t.match(/iphone os/i)&&"iphone os",o=t.match(/midp/i)&&"midp",i=t.match(/rv:1.2.3.4/i)&&"rv:1.2.3.4",a=t.match(/ucweb/i)&&"ucweb",u=t.match(/android/i)&&"android",c=t.match(/windows ce/i)&&"windows ce",s=t.match(/windows mobile/i)&&"windows mobile";return(e=r||n||o||i||a||u||c||s?n||o||i||a||u||c||s?"phone":r?"ipad":void 0:"pc")||(e=""),e},B=function(){var e="",t=navigator.userAgent,r=t.indexOf("Android")>-1,n=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),o=navigator.userAgent.split(";");if(o.length<2)return e;var i=o[1];return i?(r&&(e=(i.match(/\d+\.\d+/g)||[])[0]),n&&(e=(i.match(/(\d+)_(\d+)_?(\d+)?/)||[])[0]),e||(e=""),e):e},I=function(){return navigator.userAgent.indexOf("Android")>-1?"android":navigator.userAgent.indexOf("iPhone")>-1?"ios":navigator.userAgent.indexOf("Windows Phone")>-1?"wp":"others"},F=function(){if(i){var e=i;j=e.decodedBodySize,T=e.encodedBodySize;var r=i;s=r.unloadEventEnd,l=r.unloadEventStart,d=r.redirectEnd,p=r.redirectStart,v=r.domainLookupEnd,h=r.domainLookupStart,g=r.connectEnd,y=r.connectStart,m=r.secureConnectionStart,w=r.responseStart,b=r.requestStart,x=r.responseEnd,S=r.domContentLoadedEventStart,O=r.loadEventStart,E=r.loadEventEnd,_=r.startTime,A=r.fetchStart}else k&&(s=k.unloadEventEnd,l=k.unloadEventStart,d=k.redirectEnd,p=k.redirectStart,v=k.domainLookupEnd,h=k.domainLookupStart,g=k.connectEnd,y=k.connectStart,m=k.secureConnectionStart,w=k.responseStart,b=k.requestStart,x=k.responseEnd,S=k.domContentLoadedEventStart,O=k.loadEventStart,E=k.loadEventEnd,_=k.navigationStart,A=k.fetchStart);he(_)?C=_:he(A)&&(C=A);var o={source:M,os:I(),osVersion:B(),deviceType:$(),network:q(),screenDirection:Z(),unloadTime:s-l,redirectTime:d-p,dnsTime:v-h,tcpTime:g-y,sslTime:W(g,m),responseTime:w-b,downloadTime:x-w,firstPaintTime:L,firstContentfulPaintTime:z,domReadyTime:S-C,onloadTime:O-C,whiteTime:w-C,renderTime:E-C,decodedBodySize:j,encodedBodySize:T};Object.keys(o).forEach(function(e){he(o[e])&&(o[e]<0?o[e]=0:o[e]=Math.round(o[e]))}),he(o.whiteTime)&&o.whiteTime>o.onloadTime&&(o.whiteTime=0);var a={};t||Object.keys(o).forEach(function(e){a[Y(e)]=o[e]}),Object.keys(a).length?n(a):n(o)},t=V.length>0&&void 0!==V[0]&&V[0],Rr("navigation")){e.next=1;break}return e.abrupt("return",Promise.reject(new Error("navigation is not supported")));case 1:if((r=window.performance)&&"function"==typeof r.getEntries&&"function"==typeof r.getEntriesByType){e.next=2;break}return e.abrupt("return",Promise.reject(new Error("performance is not supported")));case 2:if(o=new Promise(function(e){n=e}),i=null,me(a=r.getEntriesByType("navigation"))&&(i=a[0]),u=new Array(19).fill(0),c=f(u,19),s=c[0],l=c[1],d=c[2],p=c[3],v=c[4],h=c[5],g=c[6],y=c[7],m=c[8],w=c[9],b=c[10],x=c[11],S=c[12],O=c[13],E=c[14],_=c[15],A=c[16],j=c[17],T=c[18],k=r.timing,M="",!i){e.next=3;break}M="PerformanceNavigationTiming",j=(P=i).decodedBodySize,T=P.encodedBodySize,s=(N=i).unloadEventEnd,l=N.unloadEventStart,d=N.redirectEnd,p=N.redirectStart,v=N.domainLookupEnd,h=N.domainLookupStart,g=N.connectEnd,y=N.connectStart,m=N.secureConnectionStart,w=N.responseStart,b=N.requestStart,x=N.responseEnd,S=N.domContentLoadedEventStart,O=N.loadEventStart,E=N.loadEventEnd,_=N.startTime,A=N.fetchStart,e.next=5;break;case 3:if(!k){e.next=4;break}M="PerformanceTiming",s=k.unloadEventEnd,l=k.unloadEventStart,d=k.redirectEnd,p=k.redirectStart,v=k.domainLookupEnd,h=k.domainLookupStart,g=k.connectEnd,y=k.connectStart,m=k.secureConnectionStart,w=k.responseStart,b=k.requestStart,x=k.responseEnd,S=k.domContentLoadedEventStart,O=k.loadEventStart,E=k.loadEventEnd,_=k.navigationStart,A=k.fetchStart,e.next=5;break;case 4:return e.abrupt("return",Promise.reject(new Error("NavigationTiming and Timing are not supported")));case 5:if(C=0,!he(_)){e.next=6;break}C=_,e.next=8;break;case 6:if(!he(A)){e.next=7;break}C=A,e.next=8;break;case 7:return e.abrupt("return",Promise.reject(new Error("startTime, navigationStart or fetchStart are required")));case 8:return e.next=9,Promise.all([Lr(),Dr()]);case 9:return D=e.sent,U=f(D,2),L=U[0],z=U[1],he(E)&&E>0?F():"complete"===document.readyState?window.setTimeout(F,0):window.addEventListener("load",function e(){window.removeEventListener("load",e),window.setTimeout(function(){F()},0)}),e.abrupt("return",o);case 10:case"end":return e.stop()}},e)})),Yr.apply(this,arguments)}function Gr(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function Jr(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Gr(Object(r),!0).forEach(function(t){Bt(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Gr(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function Kr(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if("undefined"==typeof window||"undefined"==typeof navigator)return!1;try{var t;if(null===e||"object"!=typeof e||Array.isArray(e))return!1;var r=e.requireManifest,n=e.scope;if(void 0!==r&&"boolean"!=typeof r||void 0!==n&&"string"!=typeof n)return!1;if(!0!==window.isSecureContext||!("serviceWorker"in navigator))return!1;if(void 0!==n&&!function(e){var t=e.trim();if(!t||/[?#]/.test(t))return!1;try{var r=new URL(window.location.href),n=new URL(t,r);if(n.origin!==r.origin||""!==n.search||""!==n.hash)return!1;if(r.pathname===n.pathname)return!0;var o=n.pathname.endsWith("/")?n.pathname:"".concat(n.pathname,"/");return r.pathname.startsWith(o)}catch(e){return!1}}(n))return!1;if(!1===r)return!0;if("undefined"==typeof document)return!1;var o=document.querySelector('link[rel~="manifest"][href]');return Boolean(null==o||null===(t=o.getAttribute("href"))||void 0===t?void 0:t.trim())}catch(e){return!1}}function Qr(){if("undefined"==typeof window||"undefined"==typeof navigator)return!1;var e=navigator;try{var t=window.matchMedia;if("function"==typeof t&&t.call(window,"(display-mode: standalone)").matches)return!0}catch(e){}try{return!0===e.standalone}catch(e){return!1}}function Xr(){if(window.MAZEY_BROWSER_INFO&&"object"==typeof window.MAZEY_BROWSER_INFO)return window.MAZEY_BROWSER_INFO;var e={engine:"",engineVs:"",platform:"",supporter:"",supporterVs:"",system:"",systemVs:"",shell:"",shellVs:"",appleType:"",colorScheme:""};try{var t=navigator.userAgent.toLowerCase();if(!t)return e;var r=function(e){return e.test(t)},n=function(e){var r="",n=t.match(e);return n&&me(n)&&(r=(r=(r=n.toString()).replace(/[^0-9|_.]/g,"")).replace(/_/g,".")),r},o="",i="";r(/windows|win32|win64|wow32|wow64/g)?o="windows":r(/macintosh|macintel/g)?o="macos":r(/x11/g)?o="linux":r(/android|adr/g)?o="android":r(/ios|iphone|ipad|ipod|iwatch/g)&&(o="ios",r(/ipad/g)?i="ipad":r(/iphone/g)?i="iphone":r(/iwatch/g)?i="iwatch":r(/ipod/g)&&(i="ipod")),e=Jr(Jr({},e),{},{system:o,appleType:i});var a="";"windows"===o?r(/windows nt 5.0|windows 2000/g)?a="2000":r(/windows nt 5.1|windows xp/g)?a="xp":r(/windows nt 5.2|windows 2003/g)?a="2003":r(/windows nt 6.0|windows vista/g)?a="vista":r(/windows nt 6.1|windows 7/g)?a="7":r(/windows nt 6.2|windows 8/g)?a="8":r(/windows nt 6.3|windows 8.1/g)?a="8.1":r(/windows nt 10.0|windows 10/g)&&(a="10"):"macos"===o?a=n(/os x [\d._]+/g):"android"===o?a=n(/android [\d._]+/g):"ios"===o&&(a=n(/os [\d._]+/g)),e=Jr(Jr({},e),{},{systemVs:a});var u="";"windows"===o||"macos"===o||"linux"===o?u="desktop":("android"===o||"ios"===o||r(/mobile/g))&&(u="mobile"),e=Jr(Jr({},e),{},{platform:u});var c="",s="";r(/applewebkit/g)?(c="webkit",r(/edg(?:a|ios)?\//g)||r(/edge\//g)?s="edge":r(/opr/g)?s="opera":r(/chrome/g)?s="chrome":r(/safari/g)&&(s="safari")):r(/gecko/g)&&r(/firefox/g)?(c="gecko",s="firefox"):r(/presto/g)?(c="presto",s="opera"):r(/trident|compatible|msie/g)&&(c="trident",s="iexplore"),e=Jr(Jr({},e),{},{engine:c,supporter:s});var f="";"webkit"===c?f=n(/applewebkit\/[\d._]+/g):"gecko"===c?f=n(/gecko\/[\d._]+/g):"presto"===c?f=n(/presto\/[\d._]+/g):"trident"===c&&(f=n(/trident\/[\d._]+/g)),e=Jr(Jr({},e),{},{engineVs:f});var l="";"chrome"===s?l=n(/chrome\/[\d._]+/g):"safari"===s?l=n(/version\/[\d._]+/g):"firefox"===s?l=n(/firefox\/[\d._]+/g):"opera"===s?l=n(/opr\/[\d._]+/g):"iexplore"===s?l=n(/(msie [\d._]+)|(rv:[\d._]+)/g):"edge"===s&&(l=n(/(?:edge|edg|edga|edgios)\/[\d._]+/g)),e=Jr(Jr({},e),{},{supporterVs:l});var d="",p="";r(/micromessenger/g)?(d="wechat",p=n(/micromessenger\/[\d._]+/g)):r(/qqbrowser/g)?(d="qq_browser",p=n(/qqbrowser\/[\d._]+/g)):r(/\sqq/g)?d="qq_app":r(/ucbrowser/g)?(d="uc",p=n(/ucbrowser\/[\d._]+/g)):r(/qihu 360se/g)?d="360":r(/2345explorer/g)?(d="2345",p=n(/2345explorer\/[\d._]+/g)):r(/metasr/g)?d="sougou":r(/lbbrowser/g)?d="liebao":r(/maxthon/g)?(d="maxthon",p=n(/maxthon\/[\d._]+/g)):r(/biliapp/g)&&(d="bilibili"),e=Jr(Jr({},e),{},{shell:d,shellVs:p});var v="";if(window.matchMedia){var h=window.matchMedia("(prefers-color-scheme: dark)"),g=window.matchMedia("(prefers-color-scheme: light)");h.matches?v="dark":g.matches&&(v="light")}return e=Jr(Jr({},e),{},{colorScheme:v}),window.MAZEY_BROWSER_INFO=e,e}catch(t){return Vt.warn(t),e}}function en(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-",r=Xr(),n=[];return["system","platform","engine","supporter","shell","appleType"].forEach(function(o){var i=r[o];if(i){var a="";e&&e.length>0&&(a="".concat(e).concat(t)),n.push("".concat(a).concat(i))}}),n}var tn="";function rn(){if(tn)return Promise.resolve("webp"===tn);return new Promise(function(e){var t=new Image;t.onload=function(){var r=t.width>0&&t.height>0;tn=r?"webp":"no-webp",e(r)},t.onerror=function(){tn="no-webp",e(!1)},t.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="})}

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
  enableDebug: true
};
var WebhookCon = Wt("[Webhook]");
var DOMAIN_CONFIG_STORAGE_KEY = "peace-webhook-domain-config-map";
var PROCESSED_RECORDS_STORAGE_KEY = "peace-webhook-processed-records-by-domain";
var ENDPOINT_STORAGE_KEY = "peace-webhook-endpoint";
var API_KEY_STORAGE_KEY = "peace-webhook-api-key";
var INSTALL_FLAG = "__PEACE_WEBHOOK_SCRIPT_INSTALLED__";
var DEBUG_GLOBAL_KEY = "PEACE_WEBHOOK_DEBUG";
var CONFIG_GLOBAL_KEY = "PEACE_WEBHOOK_CONFIG";
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
var state = {
  running: false,
  scanning: false,
  runId: 0,
  timerId: null,
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
  return domainAfterScanMap.get(domain) || CONFIG.afterScan;
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
          logInfo("Restored default after-scan behavior.", {
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
  var parsedValue = X(value, parseFailure);
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
      if (!nr(selector, {
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
      if (!nr(domainConfig[field], {
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
  if (!nr(selector, {
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
  state.stopButton.style.display = state.running ? "inline-flex" : "none";
  state.stopButton.disabled = !state.running;
  state.stopButton.style.opacity = state.running ? "0.05" : "0.01";
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
  return String(CONFIG.safeRedirectMessageTemplate || "").replace("{duration}", ve(CONFIG.safeRedirectAfterMs));
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
  var validExcludeSelector = !excludeSelector || nr(excludeSelector, {
    root: contentElement
  });
  if (!validExcludeSelector) {
    logWarn("Unable to apply message exclusion selector; continuing without exclusions.", {
      domain: getCurrentDomainKey(),
      selector: excludeSelector
    });
  }
  return or(contentElement, {
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
          return qe(content);
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
  return X(responseText, responseText);
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
    window.alert("Cannot start monitoring on ".concat(domain, ": ").concat(domainConfigError, ". Configure selectors from the userscript menu."));
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
    intervalMs: ve(CONFIG.intervalMs)
  });
}
function stopMonitoring() {
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
  loadProcessedRecordsByDomain();
  registerStorageChangeListeners();
  syncDebugHelpers();
  exposeConfigApi();
  registerMenuCommands();
  createControls();
  updateControls();
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