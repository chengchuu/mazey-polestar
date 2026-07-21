// ==UserScript==
// @name         Peace Multi-Site Webhook Monitor
// @namespace    https://github.com/chengchuu/webpack-build-demo
// @version      2026.721.102325
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
 * Mazey v5.1.1 https://github.com/chengchuu/mazey
 * (c) 2018-2026 Cheng
 * Released under the MIT License.
 */
function e(e,t){var n=e.length,r=t.length;if(0===n||0===r)return 0;for(var o=Array.from({length:n},function(){return new Array(r).fill(0)}),i=0,a=0;a<n;++a)for(var u=0;u<r;++u)if(e[a]===t[u]){var c=0;a>0&&u>0&&(c=o[a-1][u-1]),o[a][u]=c+1,i=Math.max(i,o[a][u])}return i}function t(t,n){return e(t,n)}function n(e,t){var n=e.length,r=t.length;if(0===n||0===r)return 0;for(var o=Array.from({length:n},function(){return new Array(r).fill(0)}),i=0;i<n;++i)for(var a=0;a<r;++a)if(e[i]===t[a]){var u=0;i>0&&a>0&&(u=o[i-1][a-1]),o[i][a]=u+1}else{var c=0,s=0;a>0&&(c=o[i][a-1]),i>0&&(s=o[i-1][a]),o[i][a]=Math.max(c,s)}return o[n-1][r-1]}function r(e,t){return n(e,t)}function o(e){return Math.random()<e}function i(e){return o(e)}function a(e,t,n,r,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,o)}function u(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function u(e){a(i,r,o,u,c,"next",e)}function c(e){a(i,r,o,u,c,"throw",e)}u(void 0)})}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function s(e,t){if(e){if("string"==typeof e)return c(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,a,u=[],c=!0,s=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(u.push(r.value),u.length!==t);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(e,t)||s(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var d,p={exports:{}},v={exports:{}};(d=v).exports=function(e,t){this.v=e,this.k=t},d.exports.__esModule=!0,d.exports.default=d.exports;var h=v.exports,g={exports:{}},m={exports:{}};!function(e){function t(n,r,o,i){var a=Object.defineProperty;try{a({},"",{})}catch(n){a=0}e.exports=t=function(e,n,r,o){function i(n,r){t(e,n,function(e){return this._invoke(n,r,e)})}n?a?a(e,n,{value:r,enumerable:!o,configurable:!o,writable:!o}):e[n]=r:(i("next",0),i("throw",1),i("return",2))},e.exports.__esModule=!0,e.exports.default=e.exports,t(n,r,o,i)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(m);var y=m.exports;!function(e){var t=y;function n(){var r,o,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.toStringTag||"@@toStringTag";function c(e,n,i,a){var u=n&&n.prototype instanceof f?n:f,c=Object.create(u.prototype);return t(c,"_invoke",function(e,t,n){var i,a,u,c=0,f=n||[],l=!1,d={p:0,n:0,v:r,a:p,f:p.bind(r,4),d:function(e,t){return i=e,a=0,u=r,d.n=t,s}};function p(e,t){for(a=e,u=t,o=0;!l&&c&&!n&&o<f.length;o++){var n,i=f[o],p=d.p,v=i[2];e>3?(n=v===t)&&(u=i[(a=i[4])?5:(a=3,3)],i[4]=i[5]=r):i[0]<=p&&((n=e<2&&p<i[1])?(a=0,d.v=t,d.n=i[1]):p<v&&(n=e<3||i[0]>t||t>v)&&(i[4]=e,i[5]=t,d.n=v,a=0))}if(n||e>1)return s;throw l=!0,t}return function(n,f,v){if(c>1)throw TypeError("Generator is already running");for(l&&1===f&&p(f,v),a=f,u=v;(o=a<2?r:u)||!l;){i||(a?a<3?(a>1&&(d.n=-1),p(a,u)):d.n=u:d.v=u);try{if(c=2,i){if(a||(n="next"),o=i[n]){if(!(o=o.call(i,u)))throw TypeError("iterator result is not an object");if(!o.done)return o;u=o.value,a<2&&(a=0)}else 1===a&&(o=i.return)&&o.call(i),a<2&&(u=TypeError("The iterator does not provide a '"+n+"' method"),a=1);i=r}else if((o=(l=d.n<0)?u:e.call(t,d))!==s)break}catch(e){i=r,a=1,u=e}finally{c=1}}return{value:o,done:l}}}(e,i,a),!0),c}var s={};function f(){}function l(){}function d(){}o=Object.getPrototypeOf;var p=[][a]?o(o([][a]())):(t(o={},a,function(){return this}),o),v=d.prototype=f.prototype=Object.create(p);function h(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,d):(e.__proto__=d,t(e,u,"GeneratorFunction")),e.prototype=Object.create(v),e}return l.prototype=d,t(v,"constructor",d),t(d,"constructor",l),l.displayName="GeneratorFunction",t(d,u,"GeneratorFunction"),t(v),t(v,u,"Generator"),t(v,a,function(){return this}),t(v,"toString",function(){return"[object Generator]"}),(e.exports=n=function(){return{w:c,m:h}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports}(g);var w=g.exports,b={exports:{}},x={exports:{}},S={exports:{}};!function(e){var t=h,n=y;e.exports=function e(r,o){function i(e,n,a,u){try{var c=r[e](n),s=c.value;return s instanceof t?o.resolve(s.v).then(function(e){i("next",e,a,u)},function(e){i("throw",e,a,u)}):o.resolve(s).then(function(e){c.value=e,a(c)},function(e){return i("throw",e,a,u)})}catch(e){u(e)}}var a;this.next||(n(e.prototype),n(e.prototype,"function"==typeof Symbol&&Symbol.asyncIterator||"@asyncIterator",function(){return this})),n(this,"_invoke",function(e,t,n){function r(){return new o(function(t,r){i(e,n,t,r)})}return a=a?a.then(r,r):r()},!0)},e.exports.__esModule=!0,e.exports.default=e.exports}(S);var O=S.exports;!function(e){var t=w,n=O;e.exports=function(e,r,o,i,a){return new n(t().w(e,r,o,i),a||Promise)},e.exports.__esModule=!0,e.exports.default=e.exports}(x);var E=x.exports;!function(e){var t=E;e.exports=function(e,n,r,o,i){var a=t(e,n,r,o,i);return a.next().then(function(e){return e.done?e.value:a.next()})},e.exports.__esModule=!0,e.exports.default=e.exports}(b);var _=b.exports,A={exports:{}};!function(e){e.exports=function(e){var t=Object(e),n=[];for(var r in t)n.unshift(r);return function e(){for(;n.length;)if((r=n.pop())in t)return e.value=r,e.done=!1,e;return e.done=!0,e}},e.exports.__esModule=!0,e.exports.default=e.exports}(A);var j=A.exports,T={exports:{}},M={exports:{}};!function(e){function t(n){return e.exports=t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,t(n)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(M);var k=M.exports;!function(e){var t=k.default;e.exports=function(e){if(null!=e){var n=e["function"==typeof Symbol&&Symbol.iterator||"@@iterator"],r=0;if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length))return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}}}throw new TypeError(t(e)+" is not iterable")},e.exports.__esModule=!0,e.exports.default=e.exports}(T);var P=T.exports;!function(e){var t=h,n=w,r=_,o=E,i=O,a=j,u=P;function c(){var s=n(),f=s.m(c),l=(Object.getPrototypeOf?Object.getPrototypeOf(f):f.__proto__).constructor;function d(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===l||"GeneratorFunction"===(t.displayName||t.name))}var p={throw:1,return:2,break:3,continue:3};function v(e){var t,n;return function(r){t||(t={stop:function(){return n(r.a,2)},catch:function(){return r.v},abrupt:function(e,t){return n(r.a,p[e],t)},delegateYield:function(e,o,i){return t.resultName=o,n(r.d,u(e),i)},finish:function(e){return n(r.f,e)}},n=function(e,n,o){r.p=t.prev,r.n=t.next;try{return e(n,o)}finally{t.next=r.n}}),t.resultName&&(t[t.resultName]=r.v,t.resultName=void 0),t.sent=r.v,t.next=r.n;try{return e.call(this,t)}finally{r.p=t.prev,r.n=t.next}}}return(e.exports=c=function(){return{wrap:function(e,t,n,r){return s.w(v(e),t,n,r&&r.reverse())},isGeneratorFunction:d,mark:s.m,awrap:function(e,n){return new t(e,n)},AsyncIterator:i,async:function(e,t,n,i,a){return(d(t)?o:r)(v(e),t,n,i,a)},keys:a,values:u}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=c,e.exports.__esModule=!0,e.exports.default=e.exports}(p);var N=(0,p.exports)(),C=N;try{regeneratorRuntime=N}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=N:Function("r","regeneratorRuntime = r")(N)}var R=l(C);function D(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return U(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?U(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){u=!0,i=e},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw i}}}}function U(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var L=Function.prototype.toString.call(Object);function F(e,t,n){var r,o=null===(r=Object.getOwnPropertyDescriptor(t,n))||void 0===r?void 0:r.get;if(!o)return!1;try{return o.call(e),!0}catch(e){return!1}}function z(e){return null===e||"object"!=typeof e?e:I(e,function(){if("undefined"!=typeof WeakMap)return new WeakMap;var e=[],t=[];return{get:function(n){var r=e.indexOf(n);return-1===r?void 0:t[r]},set:function(n,r){e.push(n),t.push(r)}}}())}function I(e,t){if(null===e||"object"!=typeof e)return e;var n=e,r=t.get(n);if(void 0!==r)return r;var o=function(e){try{return Date.prototype.getTime.call(e)}catch(e){return null}}(n);if(null!==o){var i=new Date(o);return t.set(n,i),i}var a=function(e){var t,n=null===(t=Object.getOwnPropertyDescriptor(RegExp.prototype,"source"))||void 0===t?void 0:t.get;if(!n)return null;try{return n.call(e)}catch(e){return null}}(n);if(null!==a){var u=e,c=new RegExp(a,function(e){if("string"==typeof e.flags)return e.flags;var t=e,n="";return t.hasIndices&&(n+="d"),e.global&&(n+="g"),e.ignoreCase&&(n+="i"),e.multiline&&(n+="m"),e.dotAll&&(n+="s"),e.unicode&&(n+="u"),t.unicodeSets&&(n+="v"),e.sticky&&(n+="y"),n}(u));return c.lastIndex=u.lastIndex,t.set(n,c),c}if("undefined"!=typeof ArrayBuffer&&F(n,ArrayBuffer.prototype,"byteLength")){var s=ArrayBuffer.prototype.slice.call(e,0);return t.set(n,s),s}if("undefined"!=typeof SharedArrayBuffer&&F(n,SharedArrayBuffer.prototype,"byteLength")){var f=SharedArrayBuffer.prototype.slice.call(e,0);return t.set(n,f),f}if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&ArrayBuffer.isView(e)){var l=I(e.buffer,t),d="undefined"!=typeof DataView&&F(n,DataView.prototype,"byteLength")?new DataView(l,e.byteOffset,e.byteLength):new e.constructor(l,e.byteOffset,e.length);return t.set(n,d),d}if("undefined"!=typeof Map&&F(n,Map.prototype,"size")){var p=new Map;return t.set(n,p),Map.prototype.forEach.call(e,function(e,n){p.set(I(n,t),I(e,t))}),p}if("undefined"!=typeof Set&&F(n,Set.prototype,"size")){var v=new Set;return t.set(n,v),Set.prototype.forEach.call(e,function(e){v.add(I(e,t))}),v}var h=Array.isArray(e),g=Object.getPrototypeOf(e),m=function(e){var t=Object.getPrototypeOf(e);if(null===t)return!0;var n=Object.prototype.hasOwnProperty.call(t,"constructor")?t.constructor:null;return"function"==typeof n&&Function.prototype.toString.call(n)===L}(n),y=!h&&!m&&function(e){var t=Object.getPrototypeOf(e),n=null==t?void 0:t.constructor;return"function"==typeof n&&-1===Function.prototype.toString.call(n).indexOf("[native code]")}(n);if(!h&&!m&&!y)return t.set(n,e),e;var w=h?new Array(e.length):Object.create(y?Object.prototype:g);return t.set(n,w),function(e){var t=Object.getOwnPropertyNames(e);return"function"==typeof Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(e)):t}(n).forEach(function(e){if(!h||"length"!==e){var r=Object.getOwnPropertyDescriptor(n,e);r&&("value"in r&&(r.value=I(r.value,t)),Object.defineProperty(w,e,r))}}),w}function B(e){return!e||"object"!=typeof e||Object.isFrozen(e)||(Object.freeze(e),Object.values(e).forEach(B)),e}function $(e){return z(e)}function q(e){var t=e.replace(/([A-Z])/g,"-$1").toLowerCase();return"-"===t[0]?t.substring(1):t}function Z(e){var t=e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()});return t.endsWith("-")?t.slice(0,-1):t}function V(e){return q(e)}function W(e){var t=e.replace(/([A-Z])/g,"_$1").toLowerCase();return"_"===t[0]?t.substring(1):t}function H(e){return e.replace(/_([a-z])/g,function(e,t){return t.toUpperCase()})}function Y(e){return W(e)}function G(e){if("string"!=typeof e)throw new TypeError("value must be a string");var t=e.replace(/[^A-Za-z0-9_$]/g,"_").toUpperCase();return/^[A-Za-z_$]/.test(t)?t:"_".concat(t)}function J(e){for(var t=(e=e.replace(/^\s+/,"")).length-1,n=/\s/;n.test(e.charAt(t));)t--;return e.slice(0,t+1)}function K(e){if("string"!=typeof e)return!1;try{return JSON.parse(e),!0}catch(e){}return!1}function Q(e){return K(e)}function X(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5;if(!Number.isFinite(e)||e<=0)return"";e=Math.floor(e);for(var t="";e--;)t+=Math.floor(10*Math.random());return t}function ee(){return X(arguments.length>0&&void 0!==arguments[0]?arguments[0]:5)}function te(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3,t=[re(),ee(e||3)];return t[0]+t[1]}function ne(){return te(arguments.length>0&&void 0!==arguments[0]?arguments[0]:3)}function re(){return Date.now?Date.now():(new Date).getTime()}function oe(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n="";return n=t?(100*e).toFixed(t):String(Math.floor(100*e)),"".concat(n,"%")}function ie(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return parseFloat(String(e)).toFixed(t)}function ae(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};n=Object.assign({},n);var r=null,o=null,i=null,a=null,u=0,c=function(){u=!1===n.leading?0:re(),i=null,a=e.apply(this,o),i||(r=o=null)};return function(){var s=re();u||!1!==n.leading||(u=s);var f=t-(s-u);r=this;for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];return o=d,f<=0||f>t?(i&&(clearTimeout(i),i=null),u=s,a=e.apply(r,o),i||(r=o=null)):i||!1===n.trailing||(i=setTimeout(c.bind(r),f)),a}}function ue(e,t,n){var r=null,o=null,i=null,a=null,u=null,c=function(){var s=re()-i;s<t&&s>=0?o=setTimeout(c,t-s):(o=null,n||(u=e.apply(r,a),o||(r=a=null)))};return function(){r=this;for(var s=arguments.length,f=new Array(s),l=0;l<s;l++)f[l]=arguments[l];a=f,i=re();var d=n&&!o;return o||(o=setTimeout(c,t)),d&&(u=e.apply(r,a),r=a=null),u}}var ce=(/* unused pure expression or super */ null && ({type:"d"}));function se(e){return"string"==typeof e&&/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(e)?e.replace(" ","T"):e}function fe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ce,r=(n=Object.assign({},ce,n)).type;ve(e)||(e=new Date(se(e)).getTime()),ve(t)||(t=new Date(se(t)).getTime());var o=Number(t)-Number(e),i="",a=f(new Array(4).fill(0),4),u=a[0],c=(a[1],a[2],a[3]);if(o>=0)switch(u=Math.floor(o/1e3/60/60/24),Math.floor(o/1e3/60/60),Math.floor(o/1e3/60),c=Math.floor(o/1e3),r){case"d":i=u;break;case"text":i=[{value:u=Math.floor(o/1e3/60/60/24),unit:"day"},{value:Math.floor(o/1e3/60/60%24),unit:"hour"},{value:Math.floor(o/1e3/60%60),unit:"minute"},{value:c=Math.floor(o/1e3%60),unit:"second"}].filter(function(e){return e.value>0}).map(function(e){return de(e.value,e.unit)}).join(" ")||de(0,"second");break;default:i=c}return i}function le(){return fe(arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,arguments.length>2&&void 0!==arguments[2]?arguments[2]:ce)}function de(e,t){var n=Math.round(10*e)/10,r=1===n?t:"".concat(t,"s");return"".concat(n," ").concat(r)}function pe(e){var t=(Number.isFinite(e)?Math.max(e,0):0)/1e3;return t>=86400?de(t/24/60/60,"day"):t>=3600?de(t/60/60,"hour"):t>=60?de(t/60,"minute"):de(t,"second")}function ve(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.isNaNAsNumber,r=void 0!==n&&n,o=t.isInfinityAsNumber,i=void 0!==o&&o,a=t.isUnFiniteAsNumber;return"number"==typeof e&&(!(!0!==i&&!0!==(void 0!==a&&a)&&!isFinite(e))&&!(!r&&isNaN(e)))}function he(e){var t=null;if(e&&"function"==typeof e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];t=e.apply(void 0,r)}return t}function ge(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return he.apply(void 0,[e].concat(n))}function me(e){var t=!1;return Array.isArray(e)&&e.length&&(t=!0),t}function ye(e){var t=Boolean(e),n="object"==typeof e,r="[object Object]"===Object.prototype.toString.call(e);return t&&n&&r}function we(e){return"function"==typeof e}function be(e){return"string"==typeof e}function xe(e){return"boolean"==typeof e}function Se(e){return xe(e)}function Oe(e){return null==e}function Ee(e){return"[object Array]"===Object.prototype.toString.call(e)}function _e(e){return!!ye(e)&&0!==Object.keys(e).length}function Ae(e){if(!e)return"";var t=new RegExp("\\n","g");return e.replace(t,"<br />")}function je(e){return Ae(e)}function Te(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).removeNewLine,n=void 0!==t&&t,r="";return e&&(r=e.replace(/<\/?.+?>/g,""),n&&(r=r.replace(/[\r\n]/g,""))),r}function Me(e){return Te(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}function ke(e){return Te(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}function Pe(e){return Te(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}function Ne(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"};if("string"!=typeof e)throw new Error("Input must be a string");return e.replace(/[&<>"'/]/g,function(e){return t[e]})}function Ce(e){var t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#x27;":"'","&#x2F;":"/"};if("string"!=typeof e)throw new Error("Input must be a string");return e.replace(/(&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;)/g,function(e){return t[e]})}function Re(e){return Ce(e)}function De(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{hasDot:!1,dotText:"..."};if(n=Object.assign({hasDot:!1,dotText:"..."},n),""!=e&&e){for(var r=0,o="",i=/[^\x00-\xff]/g,a="",u=e.replace(i,"**").length,c=0;c<u&&(null!=(a=e.charAt(c).toString()).match(i)?r+=2:r++,!(r>t));c++)o+=a;return n.hasDot&&u>t&&(o+=n.dotText),o}return""}function Ue(e,t){return De(e,t,{hasDot:arguments.length>2&&void 0!==arguments[2]&&arguments[2]})}function Le(e,t){return Ue(e,t,arguments.length>2&&void 0!==arguments[2]&&arguments[2])}function Fe(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{validStatusRange:[200,300],validCode:[0]})||{},n=t.validStatusRange,r=void 0===n?[200,300]:n,o=t.validCode,i=void 0===o?[0]:o;2!==r.length&&console.error("valid validStatusRange is required");var a=!1;if(e&&e.status&&2===r.length&&e.status>=r[0]&&e.status<r[1]){var u=e.data;u&&i.includes(u.code)&&(a=!0)}return a}function ze(e,t,n){if(null===e||"object"!=typeof e)return!1;var r,o=e,i=D(t);try{for(i.s();!(r=i.n()).done;){var a=r.value;if(null===o||"object"!=typeof o&&"function"!=typeof o||!Object.prototype.hasOwnProperty.call(o,a))return!1;o=o[a]}}catch(e){i.e(e)}finally{i.f()}return o===n}function Ie(e){var t=function(e){return String(Math.ceil(e))};if(!Number.isFinite(e)||e<=0)return"";var n=1024;return e<n?e+" B":e<Math.pow(n,2)?t(e/n)+" KB":e<Math.pow(n,3)?t(e/Math.pow(n,2))+" MB":e<Math.pow(n,4)?t(e/Math.pow(n,3))+" G":t(e/Math.pow(n,4))+" T"}function Be(e){var t,n=0;for(t=0;t<e.length;t++)n=(n<<5)-n+e.charCodeAt(t),n|=0;return n}var $e=/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/,qe=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})$/;function Ze(e,t,n,r,o,i){var a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:0,u=arguments.length>7&&void 0!==arguments[7]&&arguments[7],c=new Date(0);return u?(c.setUTCFullYear(e,t-1,n),c.setUTCHours(r,o,i,a),Number.isFinite(c.getTime())&&c.getUTCFullYear()===e&&c.getUTCMonth()===t-1&&c.getUTCDate()===n&&c.getUTCHours()===r&&c.getUTCMinutes()===o&&c.getUTCSeconds()===i&&c.getUTCMilliseconds()===a):(c.setFullYear(e,t-1,n),c.setHours(r,o,i,a),Number.isFinite(c.getTime())&&c.getFullYear()===e&&c.getMonth()===t-1&&c.getDate()===n&&c.getHours()===r&&c.getMinutes()===o&&c.getSeconds()===i&&c.getMilliseconds()===a)}function Ve(e){if("number"==typeof e)return Number.isFinite(e)&&Number.isFinite(new Date(e).getTime());if("object"==typeof e&&null!==e)try{return Number.isFinite(Date.prototype.getTime.call(e))}catch(e){return!1}if("string"!=typeof e)return!1;var t=e.trim();if(!t)return!1;var n=$e.exec(t);if(n){var r=f(n.slice(1),6),o=r[0],i=r[1],a=r[2],u=r[3],c=void 0===u?"0":u,s=r[4],l=void 0===s?"0":s,d=r[5],p=void 0===d?"0":d;return Ze(Number(o),Number(i),Number(a),Number(c),Number(l),Number(p))}var v=qe.exec(t);if(!v)return!1;var h=f(v.slice(1),8),g=h[0],m=h[1],y=h[2],w=h[3],b=h[4],x=h[5],S=void 0===x?"0":x,O=h[6],E=void 0===O?"":O,_=h[7],A=Number("".concat(E,"00").slice(0,3));if(!Ze(Number(g),Number(m),Number(y),Number(w),Number(b),Number(S),A,!0))return!1;if("Z"===_)return!0;var j=Number(_.slice(1,3)),T=Number(_.slice(4,6));return j<=23&&T<=59}function We(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy-MM-dd";void 0===e&&(e=new Date);var n=new Date(e);if(!Number.isFinite(n.getTime()))throw new RangeError("Invalid date");var r=n.getHours(),o={yyyy:n.getFullYear(),MM:n.getMonth()+1,dd:n.getDate()<10?"0"+n.getDate():n.getDate(),HH:r<10?"0"+r:r,hh:(r%12||12)<10?"0"+(r%12||12):r%12||12,mm:n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes(),ss:n.getSeconds()<10?"0"+n.getSeconds():n.getSeconds(),a:r<12?"AM":"PM"},i=t||"yyyy-MM-dd";return Object.keys(o).forEach(function(e){var t=o[e];"MM"===e&&Number(t)<=9&&(t="0".concat(t)),i=i.split(e).join(String(t))}),i}function He(e){return We(void 0===e?new Date:new Date(e instanceof Date?e.getTime():e),"yyyy.MMdd.HHmmss").split(".").map(function(e){return String(Number(e))}).join(".")}function Ye(e){return/^1\d{10}$/.test(e)}function Ge(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}function Je(e){if(!Number.isFinite(e)||e<=0)return"";e=Math.floor(e);for(var t="";e>0;){var n=e%26;0===n&&(n=26),t=String.fromCharCode(n+96)+t,e=(e-n)/26}return t}function Ke(){return"v4"}function Qe(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(e){return!0===e},r=t.interval,o=void 0===r?1e3:r,i=t.times,a=void 0===i?10:i,c=t.context,s=t.args;if("function"==typeof e){if(!Number.isFinite(o)||o<0)console.error("Expected a non-negative number for interval.");else if(!Number.isFinite(a)||a<0)console.error("Expected a non-negative number for times.");else if(0!==a){var f=0,l=function(){setTimeout(u(R.mark(function t(){var r;return R.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=1,e.apply(c,s);case 1:if(r=t.sent,!(n(r)||++f>=a)){t.next=2;break}return t.abrupt("return");case 2:l();case 3:case"end":return t.stop()}},t)})),o)};l()}}else console.error("Expected a function.")}function Xe(e){return et.apply(this,arguments)}function et(){return(et=u(R.mark(function e(t){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(e){setTimeout(function(){e(t)},t)}));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}function tt(e){return nt.apply(this,arguments)}function nt(){return(nt=u(R.mark(function e(t){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Xe(t));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}var rt="";function ot(){if(rt)return"browser"===rt;var e="undefined"!=typeof window;return e&&(rt="browser"),e}function it(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}}function at(e){var t=e.indexOf("#"),n=-1===t?e:e.slice(0,t),r=n.indexOf("?"),o=/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(n)||"/"===n.charAt(0),i=-1===r?o?"":n:n.slice(r+1);return i?i.split("&").reduce(function(e,t){if(!t||-1===t.indexOf("="))return e;var n=t.indexOf("=");return e.push([it(t.slice(0,n)),it(t.slice(n+1))]),e},[]):[]}function ut(e,t){return at(e).filter(function(e){return f(e,1)[0]===t}).map(function(e){return f(e,2)[1]})}var ct=/^(?=.{1,39}$)(?!.*--)[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/,st=/^(?=.{1,100}$)(?!\.{1,2}$)[A-Za-z0-9_.-]+$/;function ft(){return new Error("The value does not identify one supported GitHub repository")}function lt(e,t){var n=t.replace(/\.git$/i,"");if(!ct.test(e)||!st.test(n))throw ft();var r="".concat(e,"/").concat(n);return{owner:e,name:n,slug:r,url:"https://github.com/".concat(r)}}function dt(e){if("string"!=typeof e)throw new TypeError("value must be a string");var t=e.trim();if(!t||/[%\\?#]/.test(t)||function(e){for(var t=0;t<e.length;t++){var n=e.charCodeAt(t);if(n<=31||127===n)return!0}return!1}(t))throw ft();var n=t.match(/^(?:github:)?([^/:\s]+)\/([^/\s]+)$/i);if(n)return lt(n[1],n[2]);var r=t.match(/^git@([^:\s]+):([^/\s]+)\/([^/\s]+)$/);if(r&&"github.com"===r[1].toLowerCase())return lt(r[2],r[3]);var o,i=t.replace(/^git\+(?=(?:git|ssh|https?):\/\/)/i,""),a=i.match(/^[a-z][a-z\d+.-]*:\/\/([^/?#]+)/i);if(!a||/(^|\/)\.{1,2}(?:\/|$)/.test(i.slice(a[0].length)))throw ft();if(-1!==a[1].slice(a[1].lastIndexOf("@")+1).indexOf(":")||"function"!=typeof URL)throw ft();try{o=new URL(i)}catch(e){throw ft()}var u=o.protocol.toLowerCase(),c=o.hostname.toLowerCase().replace(/^www\./,"");if(!["git:","ssh:","http:","https:"].includes(u)||"github.com"!==c||""!==o.username&&"git"!==o.username||""!==o.password||""!==o.search||""!==o.hash)throw ft();var s=o.pathname.match(/^\/([^/]+)\/([^/]+)\/?$/);if(!s)throw ft();return lt(s[1],s[2])}function pt(e){return ut(location.search,e)[0]||""}function vt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";""===e&&(e=location.search);var t={};return at(e).forEach(function(e){var n=f(e,2),r=n[0],o=n[1];Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{configurable:!0,enumerable:!0,value:o,writable:!0})}),t}function ht(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=ut(e,t);return n.returnArray?r:r.length?r[0]:null}function gt(e,t,n){var r=e.indexOf("#"),o=-1===r?"":e.slice(r),i=-1===r?e:e.slice(0,r),a=i.indexOf("?"),u=-1===a?i:i.slice(0,a),c=-1===a?"":i.slice(a+1),s=encodeURIComponent(t),f=encodeURIComponent(n),l=!1,d=(c?c.split("&").filter(Boolean):[]).reduce(function(e,n){var r=n.indexOf("=");return it(-1===r?n:n.slice(0,r))===t?l||(e.push("".concat(s,"=").concat(f)),l=!0):e.push(n),e},[]);return l||d.push("".concat(s,"=").concat(f)),"".concat(u,"?").concat(d.join("&")).concat(o)}function mt(e){var t=location.hash.split("?");return 1===t.length?"":ut("?".concat(t.slice(1).join("?")),e)[0]||""}function yt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["hostname"];if(Pt(e)){var n=new window.URL(e);return t.reduce(function(e,t){return e+=n[t]},"")}var r=document.createElement("a");return r.href=e,t.reduce(function(e,t){return e+=r[t]},"")}function wt(e){return/^[a-zA-Z0-9]+:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\b([-a-zA-Z0-9\u4E00-\u9FA5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b()!@:%_+.~#?&//=]*)$/.test(e)}function bt(e){return void 0===e||Number(e)<=65535}function xt(e){var t=e.split(".");return 4===t.length&&t.every(function(e){return/^\d{1,3}$/.test(e)&&(1===e.length||"0"!==e.charAt(0))&&Number(e)<=255})}function St(e){var t=e.split("::");if(t.length>2)return!1;var n=2===t.length,r=[];t.forEach(function(e){e&&(r=r.concat(e.split(":")))});for(var o=0,i=0;i<r.length;i++){var a=r[i];if(-1!==a.indexOf(".")){if(i!==r.length-1||!xt(a))return!1;o+=2}else{if(!/^[0-9a-f]{1,4}$/i.test(a))return!1;o+=1}}return n?o<8:8===o}function Ot(e){var t=e.match(/^\[([0-9a-f:.]+)\]$/i);if(t)return St(t[1]);if("."===e.charAt(e.length-1)&&(e=e.slice(0,-1)),xt(e))return!0;var n=e.split(".");return!(n.length<2||n.some(function(e){return!e||!/^[a-z\d-]+$/i.test(e)||"-"===e.charAt(0)||"-"===e.charAt(e.length-1)}))&&!/^\d+$/.test(n[n.length-1])}function Et(e){var t=e.match(/^https?:\/\/([^/?#]+)(?:[/?#][^\s<>"`]*)?$/i);if(!t||-1!==t[1].indexOf("@"))return!1;var n=t[1],r=n.match(/^\[([0-9a-f:.]+)\](?::(\d*))?$/i);if(r)return St(r[1])&&bt(r[2]);var o=n.match(/^([^:]+)(?::(\d*))?$/);return!(!o||!bt(o[2]))&&Ot(o[1])}function _t(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{strict:!0};if("string"!=typeof e||!e||e.trim()!==e)return!1;var n=/^https?:\/\/[^/\\]/i.test(e),r=/^\/\/[^/\\]/.test(e);if(!n&&(t.strict||!r))return!1;var o=r?"http:".concat(e):e;if(!Et(o))return!1;if("function"!=typeof URL)return!0;try{var i=new URL(o);return("http:"===i.protocol||"https:"===i.protocol)&&Ot(i.hostname)&&!i.username&&!i.password}catch(e){try{return new URL("http://example.com"),!1}catch(e){return Et(o)}}}function At(e){var t="";if("string"!=typeof e||""==e)return t;var n=e.split(/[?#]/,1)[0],r=/\.[^/]+$/.exec(n);return r?(r[0].length>1&&(t=r[0].substring(1)),t):t}function jt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t||(t=".js");for(var n=document.querySelectorAll("script[src]"),r=0;r<n.length;r++){var o=n[r].getAttribute("src");if(o&&-1!==o.indexOf(t)){var i=ut(o,e)[0];if(void 0!==i)return i}}return""}function Tt(e){return e&&0===Object.keys(e).length?"":"?".concat(Object.keys(e).map(function(t){return"".concat(encodeURIComponent(t),"=").concat(encodeURIComponent(e[t]))}).join("&"))}function Mt(e){return e.replace(/^http:/,"https:")}function kt(e){return Mt(e)}function Pt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=window.URL;if("function"!=typeof t)return!1;try{var n=new t(e);return Boolean(n.href)}catch(e){return!1}}function Nt(e){var t="";(!_t(e)&&_t(e,{strict:!1})&&0===e.indexOf("//")&&(e="https:"+e),Pt(e))&&(t=new URL(e).host);return t}function Ct(e){var t="";(!_t(e)&&_t(e,{strict:!1})&&0===e.indexOf("//")&&(e="https:"+e),Pt(e))&&(t=new URL(e).pathname);return t}function Rt(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).fireOnInit,n=void 0===t||t,r=history,o=location.href,i=[],a=function(t){var n=location.href;if(n!==o||"load"===t){var r=o;o=n,e({url:n,oldUrl:r,trigger:t})}},u=function(){return a("popstate")},c=function(){return a("hashchange")};window.addEventListener("popstate",u),window.addEventListener("hashchange",c),i.push(function(){return window.removeEventListener("popstate",u)}),i.push(function(){return window.removeEventListener("hashchange",c)}),r.__mazeyUrlChangePatched__||(r.__mazeyUrlChangePatched__=!0,r.__mazeyUrlChangeSubscribers__=new Set,r.__mazeyRawPushState__=history.pushState.bind(history),r.__mazeyRawReplaceState__=history.replaceState.bind(history),history.pushState=function(){r.__mazeyRawPushState__.apply(r,arguments),r.__mazeyUrlChangeSubscribers__.forEach(function(e){return e("pushState")})},history.replaceState=function(){r.__mazeyRawReplaceState__.apply(r,arguments),r.__mazeyUrlChangeSubscribers__.forEach(function(e){return e("replaceState")})});var s=function(e){return a(e)};return r.__mazeyUrlChangeSubscribers__.add(s),i.push(function(){return r.__mazeyUrlChangeSubscribers__.delete(s)}),n&&a("load"),function(){i.forEach(function(e){return e()})}}function Dt(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||s(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ut(e){return Ut="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ut(e)}function Lt(e){var t=function(e,t){if("object"!=Ut(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=Ut(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==Ut(t)?t:t+""}function Ft(e,t,n){return(t=Lt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function zt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function It(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?zt(Object(n),!0).forEach(function(t){Ft(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):zt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Bt={enabled:!0,isClosed:!1,showWrap:!1,showDate:!1,locales:"en-US",isStringifyObject:!1,logFn:function(){},errorFn:function(){}};function $t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:It({},Bt),n=Object.assign(It({},Bt),t),r=n.enabled,o=n.isClosed,i=n.showWrap,a=n.showDate,u=n.locales,c=n.isStringifyObject,s=n.logFn,f=n.errorFn,l=r;!0===o&&(qt.warn("The options.isClosed is deprecated. Please use options.enabled instead."),l=!1);var d=Object.create(null),p=function(){return(new Date).toLocaleDateString(u,{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})};return["log","info","warn","error"].forEach(function(t){d[t]=function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];if(l){var u,d,v=e,h=e;if("string"==typeof e&&e.length>=2){var g=e.length;v=":"===e[g-1]?e.substring(0,g-1):e}if(i&&console.log("--- ".concat(v," - begin ---")),a&&(h=e?"".concat(p()," ").concat(e):"".concat(p())),c&&(r=r.map(function(e){return ye(e)?JSON.stringify(e):e})),e||a)(u=console)[t].apply(u,[h].concat(Dt(r)));else(d=console)[t].apply(d,Dt(r));"log"===t&&s(),"error"===t&&f(),i&&console.log("--- ".concat(v," - end ---"))}}}),d}var qt=$t("[Mazey]"),Zt=$t("",{showDate:!0,locales:"zh-CN",isStringifyObject:!0});function Vt(e,t){if(!e)return qt.error("The element is not exist."),!1;for(var n=e.className.split(/\s+/),r=0;r<n.length;r++)if(n[r]===t)return!0;return!1}function Wt(e,t){if(e){if(Array.isArray(t))t.forEach(function(t){t&&e.classList.add(t)});else if(t){for(var n=e.className,r=n.split(/\s+/),o=0;o<r.length;o++)if(r[o]===t)return;var i,a="";""!==n&&(a=" "),i=n+a+t,e.className=i}}else qt.error("The element is not exist.")}function Ht(e,t){Wt(e,t)}function Yt(e,t){var n;e?(n=(n=(n=(n=" "+e.className+" ").replace(/(\s+)/gi," ")).replace(" "+t+" "," ")).replace(/(^\s+)|(\s+$)/g,""),e.className=n):qt.error("The element is not exist.")}function Gt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{id:""};if(!e)return!1;var n=document.createDocumentFragment(),r=null,o="",i=document.createElement("style");return t.id?(o="".concat(t.id),(r=document.getElementById(o))?r.innerHTML=e:(i.setAttribute("id",t.id),i.innerHTML=e,n.appendChild(i),document.head.appendChild(n))):(i.innerHTML=e,n.appendChild(i),document.head.appendChild(n)),!0}function Jt(){var e=window.jQuery||window.$;if(e){var t=e("img");return!(!t||!t.length)&&(t.each(function(){var t=e(this);if(t){var n=t.attr("src");if(n&&"string"==typeof n&&n.length){var r=n.match(/[?&]width=([0-9]+[a-z%]*)/),o=n.match(/[?&]height=([0-9]+[a-z%]*)/);r&&me(r)&&r[1]&&t.width(r[1]),o&&me(o)&&o[1]&&t.height(o[1])}}}),!0)}var n=document.getElementsByTagName("img");return n.length>0&&(Array.from(n).forEach(function(e){var t=e;if(t){var n=t.getAttribute("src");if(n&&"string"==typeof n&&n.length){var r=n.match(/[?&]width=([0-9]+[a-z%]*)/),o=n.match(/[?&]height=([0-9]+[a-z%]*)/);r&&me(r)&&r[1]&&(t.style.width=r[1]),o&&me(o)&&o[1]&&(t.style.height=o[1])}}}),!0)}function Kt(){return Jt()}function Qt(e,t){var n="";return t&&t.length>0&&(n=t.join(";")+";"),"".concat(e,"{").concat(n,"}")}function Xt(e){for(var t=document.getElementsByTagName("meta"),n=0;n<t.length;n++)if(t[n].getAttribute("name")===e)return t[n].getAttribute("content")||"";return""}function en(e){var t=e||window.event;t.stopPropagation?t.stopPropagation():t.cancelBubble=!0}function tn(){var e=window.MAZEY_DEFINE_LISTENERS;if(e&&"object"==typeof e)return e;var t=Object.create(null);return window.MAZEY_DEFINE_LISTENERS=t,t}function nn(e,t){var n=tn();Array.isArray(n[e])||Object.defineProperty(n,e,{configurable:!0,enumerable:!0,value:[],writable:!0}),"function"==typeof t&&n[e].push(t)}function rn(e,t){var n=tn()[e];if(Array.isArray(n))for(var r=n.slice(),o=0,i=r.length;o<i;o++)"function"==typeof r[o]&&(void 0===t?r[o]():r[o](t))}function on(e,t){rn(e,t)}function an(e,t){var n=tn(),r=n[e];if("string"==typeof e&&Array.isArray(r))if("function"==typeof t){for(var o=0,i=r.length;o<i;o++)if(r[o]===t){n[e].splice(o,1);break}}else delete n[e]}function un(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(e){var n=JSON.stringify(t);sessionStorage.setItem(e,void 0===n?"null":n)}}function cn(e){var t=null;if(e){var n=sessionStorage.getItem(e);if(n)try{t=JSON.parse(n)}catch(e){t=n}}return t}function sn(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(e){var n=JSON.stringify(t);localStorage.setItem(e,void 0===n?"null":n)}}function fn(e){var t=null;if(e){var n=localStorage.getItem(e);if(n)try{t=JSON.parse(n)}catch(e){t=n}}return t}var ln="__mazey_cookie_name_encoded__-",dn="__mazey_cookie_value_encoded__-";function pn(e){return"".concat(dn).concat(encodeURIComponent(e))}function vn(e){var t=/^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/.test(e),n=0===e.indexOf(ln)||0===e.indexOf(dn);return t&&!n?e:function(e){return"".concat(ln).concat(encodeURIComponent(e))}(e)}function hn(e){var t=vn(e);return t!==e?[t,e]:[e]}function gn(e){for(var t=e+"=",n=document.cookie.split(";"),r=0;r<n.length;r++){var o=n[r].trim();if(0===o.indexOf(t))return o.substring(t.length)}}function mn(e){for(var t=hn(e),n="1"===gn(pn(e)),r=0;r<t.length;r++){var o=gn(t[r]);if(void 0!==o){if(n)try{return decodeURIComponent(o)}catch(e){return o}return o}}return""}function yn(e,t,n,r){var o;if(n){var i=new Date;i.setTime(i.getTime()+24*n*60*60*1e3),o="; expires="+i.toUTCString()}else o="";var a=function(e){for(var t=!0,n=0;n<e.length;n++){var r=e.charCodeAt(n);if(!(33===r||r>=35&&r<=43||r>=45&&r<=58||r>=60&&r<=91||r>=93&&r<=126)){t=!1;break}}return{isEncoded:!t,value:t?e:encodeURIComponent(e)}}(t),u=vn(e),c=a.isEncoded?"1":"",s=a.isEncoded?o:"; expires=Thu, 01 Jan 1970 00:00:00 GMT",f=["".concat(u,"=").concat(a.value).concat(o,"; path=/"),"".concat(pn(e),"=").concat(c).concat(s,"; path=/")],l=function(e){var t=e?"; domain=".concat(e):"";f.forEach(function(e){document.cookie="".concat(e).concat(t)})},d=location.hostname;if(r)l(r);else if(-1===d.indexOf("."))l();else{var p=d.split(".");p.shift(),l("."+p.join(".")),mn(e)!==t&&l(".".concat(d))}}function wn(e){var t=hn(e),n=t.concat(pn(e)),r=new Date;r.setTime(r.getTime()-1);var o=t.some(function(e){return void 0!==gn(e)});return n.forEach(function(e,t){n.indexOf(e)===t&&void 0!==gn(e)&&["".concat(e,"=; expires=").concat(r.toUTCString()),"".concat(e,"=; expires=").concat(r.toUTCString(),"; path=/")].forEach(function(e){document.cookie=e;var t=location.hostname;if(-1!==t.indexOf("."))for(var n=t.split("."),r=0;r<n.length;r++)document.cookie="".concat(e,"; domain=.").concat(n.slice(r).join("."))})}),o&&n.every(function(e){return void 0===gn(e)})}function bn(e){wn(e)}function xn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Sn(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?xn(Object(n),!0).forEach(function(t){Ft(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):xn(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function On(e){var t,n=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{id:""}).id,r=function(){},o=new Promise(function(e,n){t=e,r=n}),i=function(){f(),t("loaded")},a=document.createElement("link");a||r(new Error("Not support create link element"));var u="onload"in a,c=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i,"$1")<536;if(a.rel="stylesheet",a.type="text/css",a.href=e,void 0!==n&&(a.id=n),document.getElementsByTagName("head")[0].appendChild(a),c||!u)return setTimeout(function(){l(a,i,0)},1),o;function s(){i()}function f(){a&&(a.onload=a.onerror=a.onreadystatechange=null),a=null}function l(e,t,n){if(e){var r,o=e.sheet;if((n+=1)>3e5)return r=!0,e&&(e=null),void t();if(c)o&&(r=!0);else if(o)try{o.cssRules&&(r=!0)}catch(e){"NS_ERROR_DOM_SECURITY_ERR"===e.name&&(r=!0)}setTimeout(function(){r?t():l(e,t,n)},20)}}return u?(a.onload=s,a.onerror=function(){f(),r(new Error("Failed to load CSS: ".concat(e)))}):a.onreadystatechange=function(){a&&/loaded|complete/.test(a.readyState)&&s()},o}var En=(/* unused pure expression or super */ null && ({id:"",callback:function(){},timeout:5e3,isDefer:!1,isAsync:!1,isCrossOrigin:!1,attributes:null,cssUrl:""}));function _n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Sn({},En),n=Object.assign(Sn({},En),t),r=n.id,o=n.callback,i=n.timeout,a=n.isDefer,u=n.isAsync,c=n.isCrossOrigin,s=n.attributes,f=n.cssUrl;if(f){var l=function(e,t){if(!t)return"";if(_t(t))return t;try{var n=new URL(e,location.href);return new URL(t,n).href}catch(n){var r=e.split("/");return r.pop(),"".concat(r.join("/"),"/").concat(t)}}(e,f);l&&On(l).catch(function(e){console.error("Failed to load CSS from ".concat(l,": ").concat(null==e?void 0:e.message))})}return new Promise(function(t,n){var f=document.createElement("script"),l=!1,d=null,p=function(){f.onload=null,f.onerror=null,f.onreadystatechange=null,null!==d&&(clearTimeout(d),d=null)},v=function(){if(!l){l=!0,p();try{ge(o),t("loaded")}catch(e){n(e)}}},h=function(e){l||(l=!0,p(),n(e))};f.type="text/javascript",f.defer=Boolean(a),f.async=Boolean(u),c&&(f.crossOrigin="anonymous"),r&&(f.id=r),s&&Object.keys(s).forEach(function(e){f.setAttribute(e,s[e])}),f.readyState?f.onreadystatechange=function(){"loaded"!==f.readyState&&"complete"!==f.readyState||v()}:f.onload=v,f.onerror=function(){return h(new Error("Failed to load script: ".concat(e)))},f.src=e,i&&(d=setTimeout(function(){return h(new Error("timeout"))},i));var g=document.getElementsByTagName("script")[0];null!=g&&g.parentNode?g.parentNode.insertBefore(f,g):(document.head||document.body||document.documentElement).appendChild(f)})}function An(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e4;return new Promise(function(t,n){var r=null,o=function(){window.removeEventListener("load",i),null!==r&&(clearTimeout(r),r=null)},i=function(){o(),t("load")};"complete"!==document.readyState?(window.addEventListener("load",i),r=setTimeout(function(){o(),n(new Error("timeout"))},e)):t("complete")})}function jn(e){return new Promise(function(t,n){var r=new Image;r.onload=function(){t(r)},r.onerror=function(e){n(e)},r.src=e})}function Tn(e,t){var n;if(window[e])return Promise.resolve("defined");var r=Mn.get(e),o=null===(n=r)||void 0===n?void 0:n.get(t);if(o)return o;r||(r=new Map,Mn.set(e,r));var i=function(){var n,o;null===(n=r)||void 0===n||n.delete(t),0===(null===(o=r)||void 0===o?void 0:o.size)&&Mn.delete(e)},a=_n(t).then(function(e){return i(),e},function(e){throw i(),e});return r.set(t,a),a}var Mn=new Map;function kn(e){if("undefined"==typeof window)return!1;var t=[],n=window.PerformanceObserver;return!!n&&(me(n.supportedEntryTypes)&&(t=n.supportedEntryTypes),t.includes(e))}function Pn(){return Nn.apply(this,arguments)}function Nn(){return(Nn=u(R.mark(function e(){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(kn("paint")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new window.PerformanceObserver(function(n){var r=n.getEntries().find(function(e){return"first-contentful-paint"===e.name});r&&(t.disconnect(),e(Math.round(r.startTime)))});t.observe({type:"paint",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Cn(){return Rn.apply(this,arguments)}function Rn(){return(Rn=u(R.mark(function e(){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(kn("paint")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new window.PerformanceObserver(function(n){var r=n.getEntries().find(function(e){return"first-paint"===e.name});r&&(t.disconnect(),e(Math.round(r.startTime)))});t.observe({type:"paint",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Dn(){return Un.apply(this,arguments)}function Un(){return(Un=u(R.mark(function e(){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(kn("largest-contentful-paint")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new window.PerformanceObserver(function(n){var r=n.getEntries().find(function(e){return"largest-contentful-paint"===e.entryType});r&&(t.disconnect(),e(Math.round(r.startTime)))});t.observe({type:"largest-contentful-paint",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Ln(){return Fn.apply(this,arguments)}function Fn(){return(Fn=u(R.mark(function e(){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(kn("first-input")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new window.PerformanceObserver(function(n){var r=n.getEntries().find(function(e){return"first-input"===e.entryType});if(r){t.disconnect();var o=r.processingStart;e(o?Math.round(r.processingStart-r.startTime):0)}});t.observe({type:"first-input",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function zn(){return In.apply(this,arguments)}function In(){return(In=u(R.mark(function e(){return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(kn("layout-shift")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new window.PerformanceObserver(function(n){var r=n.getEntries().reduce(function(e,t){var n=0;return ve(t.value)&&(n=t.value),e+n},0);t.disconnect(),e(r)});t.observe({type:"layout-shift",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Bn(){return $n.apply(this,arguments)}function $n(){return($n=u(R.mark(function e(){var t,n;return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(kn("navigation")){e.next=1;break}return e.abrupt("return",0);case 1:if(window.performance&&window.performance.getEntriesByType){e.next=2;break}return e.abrupt("return",0);case 2:if(t=window.performance.getEntriesByType("navigation")[0],n=0,t){e.next=3;break}return e.abrupt("return",0);case 3:return n=t.responseStart-t.requestStart,e.abrupt("return",Math.round(n));case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}function qn(){return Zn.apply(this,arguments)}function Zn(){return Zn=u(R.mark(function e(){var t,n,r,o,i,a,u,c,s,l,d,p,v,h,g,m,y,w,b,x,S,O,E,_,A,j,T,M,k,P,N,C,D,U,L,F,z,I,B,$,q,Z,V,W=arguments;return R.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(V=function(e,t){var n=0;return t&&(n=e-t),n},Z=function(){var e="";return window.screen&&window.screen.orientation&&"number"==typeof window.screen.orientation.angle&&(180!==window.screen.orientation.angle&&0!==window.screen.orientation.angle||(e="|"),90!==window.screen.orientation.angle&&-90!==window.screen.orientation.angle||(e="-")),e},q=function(){var e="",t=window.navigator;if(t.connection&&t.connection.effectiveType)switch(t.connection.effectiveType){case"wifi":e="wifi";break;case"4g":e="4g";break;case"2g":e="2g";break;case"3g":e="3g";break;case"ethernet":e="ethernet";break;case"default":e=void 0}return e||(e=""),e},$=function(){var e,t=navigator.userAgent.toLowerCase(),n=t.match(/(ipad)/i)&&"ipad",r=t.match(/iphone os/i)&&"iphone os",o=t.match(/midp/i)&&"midp",i=t.match(/rv:1.2.3.4/i)&&"rv:1.2.3.4",a=t.match(/ucweb/i)&&"ucweb",u=t.match(/android/i)&&"android",c=t.match(/windows ce/i)&&"windows ce",s=t.match(/windows mobile/i)&&"windows mobile";return(e=n||r||o||i||a||u||c||s?r||o||i||a||u||c||s?"phone":n?"ipad":void 0:"pc")||(e=""),e},B=function(){var e="",t=navigator.userAgent,n=t.indexOf("Android")>-1,r=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),o=navigator.userAgent.split(";");if(o.length<2)return e;var i=o[1];return i?(n&&(e=(i.match(/\d+\.\d+/g)||[])[0]),r&&(e=(i.match(/(\d+)_(\d+)_?(\d+)?/)||[])[0]),e||(e=""),e):e},I=function(){return navigator.userAgent.indexOf("Android")>-1?"android":navigator.userAgent.indexOf("iPhone")>-1?"ios":navigator.userAgent.indexOf("Windows Phone")>-1?"wp":"others"},z=function(){if(i){var e=i;j=e.decodedBodySize,T=e.encodedBodySize;var n=i;s=n.unloadEventEnd,l=n.unloadEventStart,d=n.redirectEnd,p=n.redirectStart,v=n.domainLookupEnd,h=n.domainLookupStart,g=n.connectEnd,m=n.connectStart,y=n.secureConnectionStart,w=n.responseStart,b=n.requestStart,x=n.responseEnd,S=n.domContentLoadedEventStart,O=n.loadEventStart,E=n.loadEventEnd,_=n.startTime,A=n.fetchStart}else M&&(s=M.unloadEventEnd,l=M.unloadEventStart,d=M.redirectEnd,p=M.redirectStart,v=M.domainLookupEnd,h=M.domainLookupStart,g=M.connectEnd,m=M.connectStart,y=M.secureConnectionStart,w=M.responseStart,b=M.requestStart,x=M.responseEnd,S=M.domContentLoadedEventStart,O=M.loadEventStart,E=M.loadEventEnd,_=M.navigationStart,A=M.fetchStart);ve(_)?C=_:ve(A)&&(C=A);var o={source:k,os:I(),osVersion:B(),deviceType:$(),network:q(),screenDirection:Z(),unloadTime:s-l,redirectTime:d-p,dnsTime:v-h,tcpTime:g-m,sslTime:V(g,y),responseTime:w-b,downloadTime:x-w,firstPaintTime:L,firstContentfulPaintTime:F,domReadyTime:S-C,onloadTime:O-C,whiteTime:w-C,renderTime:E-C,decodedBodySize:j,encodedBodySize:T};Object.keys(o).forEach(function(e){ve(o[e])&&(o[e]<0?o[e]=0:o[e]=Math.round(o[e]))}),ve(o.whiteTime)&&o.whiteTime>o.onloadTime&&(o.whiteTime=0);var a={};t||Object.keys(o).forEach(function(e){a[Y(e)]=o[e]}),Object.keys(a).length?r(a):r(o)},t=W.length>0&&void 0!==W[0]&&W[0],kn("navigation")){e.next=1;break}return e.abrupt("return",Promise.reject(new Error("navigation is not supported")));case 1:if((n=window.performance)&&"function"==typeof n.getEntries&&"function"==typeof n.getEntriesByType){e.next=2;break}return e.abrupt("return",Promise.reject(new Error("performance is not supported")));case 2:if(o=new Promise(function(e){r=e}),i=null,me(a=n.getEntriesByType("navigation"))&&(i=a[0]),u=new Array(19).fill(0),c=f(u,19),s=c[0],l=c[1],d=c[2],p=c[3],v=c[4],h=c[5],g=c[6],m=c[7],y=c[8],w=c[9],b=c[10],x=c[11],S=c[12],O=c[13],E=c[14],_=c[15],A=c[16],j=c[17],T=c[18],M=n.timing,k="",!i){e.next=3;break}k="PerformanceNavigationTiming",j=(P=i).decodedBodySize,T=P.encodedBodySize,s=(N=i).unloadEventEnd,l=N.unloadEventStart,d=N.redirectEnd,p=N.redirectStart,v=N.domainLookupEnd,h=N.domainLookupStart,g=N.connectEnd,m=N.connectStart,y=N.secureConnectionStart,w=N.responseStart,b=N.requestStart,x=N.responseEnd,S=N.domContentLoadedEventStart,O=N.loadEventStart,E=N.loadEventEnd,_=N.startTime,A=N.fetchStart,e.next=5;break;case 3:if(!M){e.next=4;break}k="PerformanceTiming",s=M.unloadEventEnd,l=M.unloadEventStart,d=M.redirectEnd,p=M.redirectStart,v=M.domainLookupEnd,h=M.domainLookupStart,g=M.connectEnd,m=M.connectStart,y=M.secureConnectionStart,w=M.responseStart,b=M.requestStart,x=M.responseEnd,S=M.domContentLoadedEventStart,O=M.loadEventStart,E=M.loadEventEnd,_=M.navigationStart,A=M.fetchStart,e.next=5;break;case 4:return e.abrupt("return",Promise.reject(new Error("NavigationTiming and Timing are not supported")));case 5:if(C=0,!ve(_)){e.next=6;break}C=_,e.next=8;break;case 6:if(!ve(A)){e.next=7;break}C=A,e.next=8;break;case 7:return e.abrupt("return",Promise.reject(new Error("startTime, navigationStart or fetchStart are required")));case 8:return e.next=9,Promise.all([Cn(),Pn()]);case 9:return D=e.sent,U=f(D,2),L=U[0],F=U[1],ve(E)&&E>0?z():"complete"===document.readyState?window.setTimeout(z,0):window.addEventListener("load",function e(){window.removeEventListener("load",e),window.setTimeout(function(){z()},0)}),e.abrupt("return",o);case 10:case"end":return e.stop()}},e)})),Zn.apply(this,arguments)}function Vn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Wn(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Vn(Object(n),!0).forEach(function(t){Ft(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Vn(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Hn(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if("undefined"==typeof window||"undefined"==typeof navigator)return!1;try{var t;if(null===e||"object"!=typeof e||Array.isArray(e))return!1;var n=e.requireManifest,r=e.scope;if(void 0!==n&&"boolean"!=typeof n||void 0!==r&&"string"!=typeof r)return!1;if(!0!==window.isSecureContext||!("serviceWorker"in navigator))return!1;if(void 0!==r&&!function(e){var t=e.trim();if(!t||/[?#]/.test(t))return!1;try{var n=new URL(window.location.href),r=new URL(t,n);if(r.origin!==n.origin||""!==r.search||""!==r.hash)return!1;if(n.pathname===r.pathname)return!0;var o=r.pathname.endsWith("/")?r.pathname:"".concat(r.pathname,"/");return n.pathname.startsWith(o)}catch(e){return!1}}(r))return!1;if(!1===n)return!0;if("undefined"==typeof document)return!1;var o=document.querySelector('link[rel~="manifest"][href]');return Boolean(null==o||null===(t=o.getAttribute("href"))||void 0===t?void 0:t.trim())}catch(e){return!1}}function Yn(){if("undefined"==typeof window||"undefined"==typeof navigator)return!1;var e=navigator;try{var t=window.matchMedia;if("function"==typeof t&&t.call(window,"(display-mode: standalone)").matches)return!0}catch(e){}try{return!0===e.standalone}catch(e){return!1}}function Gn(){if(window.MAZEY_BROWSER_INFO&&"object"==typeof window.MAZEY_BROWSER_INFO)return window.MAZEY_BROWSER_INFO;var e={engine:"",engineVs:"",platform:"",supporter:"",supporterVs:"",system:"",systemVs:"",shell:"",shellVs:"",appleType:"",colorScheme:""};try{var t=navigator.userAgent.toLowerCase();if(!t)return e;var n=function(e){return e.test(t)},r=function(e){var n="",r=t.match(e);return r&&me(r)&&(n=(n=(n=r.toString()).replace(/[^0-9|_.]/g,"")).replace(/_/g,".")),n},o="",i="";n(/windows|win32|win64|wow32|wow64/g)?o="windows":n(/macintosh|macintel/g)?o="macos":n(/x11/g)?o="linux":n(/android|adr/g)?o="android":n(/ios|iphone|ipad|ipod|iwatch/g)&&(o="ios",n(/ipad/g)?i="ipad":n(/iphone/g)?i="iphone":n(/iwatch/g)?i="iwatch":n(/ipod/g)&&(i="ipod")),e=Wn(Wn({},e),{},{system:o,appleType:i});var a="";"windows"===o?n(/windows nt 5.0|windows 2000/g)?a="2000":n(/windows nt 5.1|windows xp/g)?a="xp":n(/windows nt 5.2|windows 2003/g)?a="2003":n(/windows nt 6.0|windows vista/g)?a="vista":n(/windows nt 6.1|windows 7/g)?a="7":n(/windows nt 6.2|windows 8/g)?a="8":n(/windows nt 6.3|windows 8.1/g)?a="8.1":n(/windows nt 10.0|windows 10/g)&&(a="10"):"macos"===o?a=r(/os x [\d._]+/g):"android"===o?a=r(/android [\d._]+/g):"ios"===o&&(a=r(/os [\d._]+/g)),e=Wn(Wn({},e),{},{systemVs:a});var u="";"windows"===o||"macos"===o||"linux"===o?u="desktop":("android"===o||"ios"===o||n(/mobile/g))&&(u="mobile"),e=Wn(Wn({},e),{},{platform:u});var c="",s="";n(/applewebkit/g)?(c="webkit",n(/edg(?:a|ios)?\//g)||n(/edge\//g)?s="edge":n(/opr/g)?s="opera":n(/chrome/g)?s="chrome":n(/safari/g)&&(s="safari")):n(/gecko/g)&&n(/firefox/g)?(c="gecko",s="firefox"):n(/presto/g)?(c="presto",s="opera"):n(/trident|compatible|msie/g)&&(c="trident",s="iexplore"),e=Wn(Wn({},e),{},{engine:c,supporter:s});var f="";"webkit"===c?f=r(/applewebkit\/[\d._]+/g):"gecko"===c?f=r(/gecko\/[\d._]+/g):"presto"===c?f=r(/presto\/[\d._]+/g):"trident"===c&&(f=r(/trident\/[\d._]+/g)),e=Wn(Wn({},e),{},{engineVs:f});var l="";"chrome"===s?l=r(/chrome\/[\d._]+/g):"safari"===s?l=r(/version\/[\d._]+/g):"firefox"===s?l=r(/firefox\/[\d._]+/g):"opera"===s?l=r(/opr\/[\d._]+/g):"iexplore"===s?l=r(/(msie [\d._]+)|(rv:[\d._]+)/g):"edge"===s&&(l=r(/(?:edge|edg|edga|edgios)\/[\d._]+/g)),e=Wn(Wn({},e),{},{supporterVs:l});var d="",p="";n(/micromessenger/g)?(d="wechat",p=r(/micromessenger\/[\d._]+/g)):n(/qqbrowser/g)?(d="qq_browser",p=r(/qqbrowser\/[\d._]+/g)):n(/\sqq/g)?d="qq_app":n(/ucbrowser/g)?(d="uc",p=r(/ucbrowser\/[\d._]+/g)):n(/qihu 360se/g)?d="360":n(/2345explorer/g)?(d="2345",p=r(/2345explorer\/[\d._]+/g)):n(/metasr/g)?d="sougou":n(/lbbrowser/g)?d="liebao":n(/maxthon/g)?(d="maxthon",p=r(/maxthon\/[\d._]+/g)):n(/biliapp/g)&&(d="bilibili"),e=Wn(Wn({},e),{},{shell:d,shellVs:p});var v="";if(window.matchMedia){var h=window.matchMedia("(prefers-color-scheme: dark)"),g=window.matchMedia("(prefers-color-scheme: light)");h.matches?v="dark":g.matches&&(v="light")}return e=Wn(Wn({},e),{},{colorScheme:v}),window.MAZEY_BROWSER_INFO=e,e}catch(t){return qt.warn(t),e}}function Jn(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-",n=Gn(),r=[];return["system","platform","engine","supporter","shell","appleType"].forEach(function(o){var i=n[o];if(i){var a="";e&&e.length>0&&(a="".concat(e).concat(t)),r.push("".concat(a).concat(i))}}),r}var Kn="";function Qn(){if(Kn)return Promise.resolve("webp"===Kn);return new Promise(function(e){var t=new Image;t.onload=function(){var n=t.width>0&&t.height>0;Kn=n?"webp":"no-webp",e(n)},t.onerror=function(){Kn="no-webp",e(!1)},t.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="})}

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
  intervalMs: 1 * 60 * 1000,
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
var WebhookCon = $t("[Webhook]");
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
function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch (error) {
    logWarn("Stored JSON data is malformed; using a safe default.", error);
    return fallback;
  }
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
function isValidCssSelector(selector) {
  var allowEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var normalizedSelector = String(selector || "").trim();
  if (!normalizedSelector) return allowEmpty;
  try {
    document.querySelector(normalizedSelector);
    return true;
  } catch (error) {
    return false;
  }
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
      if (!isValidCssSelector(selector)) return null;
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
  var storedConfigMap = typeof rawConfigMap === "string" ? safeJsonParse(rawConfigMap, {}) : rawConfigMap;
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
      if (!isValidCssSelector(domainConfig[field])) return "".concat(field, " is not a valid CSS selector");
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
  if (!isValidCssSelector(selector, !required)) {
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
  var storedRecordsMap = typeof rawRecordsMap === "string" ? safeJsonParse(rawRecordsMap, {}) : rawRecordsMap;
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
  return String(CONFIG.safeRedirectMessageTemplate || "").replace("{duration}", pe(CONFIG.safeRedirectAfterMs));
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
  var clone = contentElement.cloneNode(true);
  clone.querySelectorAll("img[alt]").forEach(function (imageElement) {
    var imageText = imageElement.getAttribute("alt") || "";
    imageElement.replaceWith(document.createTextNode(imageText));
  });
  var excludeSelector = domainConfig.messageExcludeSelector;
  if (excludeSelector) {
    try {
      clone.querySelectorAll(excludeSelector).forEach(function (excludedElement) {
        excludedElement.remove();
      });
    } catch (error) {
      logWarn("Unable to apply message exclusion selector; continuing without exclusions.", {
        domain: getCurrentDomainKey(),
        selector: excludeSelector,
        error: error
      });
    }
  }
  return (clone.innerText || clone.textContent || "").replace(/\u00a0/g, " ").trim();
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
    var encodedContent, hashBuffer, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          encodedContent = new TextEncoder().encode(content);
          _context3.n = 1;
          return crypto.subtle.digest("SHA-256", encodedContent);
        case 1:
          hashBuffer = _context3.v;
          return _context3.a(2, Array.from(new Uint8Array(hashBuffer)).map(function (_byte) {
            return _byte.toString(16).padStart(2, "0");
          }).join(""));
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
  try {
    return JSON.parse(responseText);
  } catch (error) {
    return responseText;
  }
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
    intervalMs: CONFIG.intervalMs
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