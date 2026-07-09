// ==UserScript==
// @name         Peace Webhook Monitor
// @namespace    https://github.com/chengchuu/webpack-build-demo
// @version      0.17.7
// @description  Scan Peace messages and send new readable messages to a webhook relay.
// @match        https://web.telegram.org/*
// @updateURL    https://raw.githubusercontent.com/chengchuu/webpack-build-demo/preview/lib/webhook.user.js
// @downloadURL  https://raw.githubusercontent.com/chengchuu/webpack-build-demo/preview/lib/webhook.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// @connect      *
// ==/UserScript==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./node_modules/mazey/lib/index.esm.js
/*!
 * Mazey v4.11.1 https://github.com/chengchuu/mazey
 * (c) 2018-2026 Cheng
 * Released under the MIT License.
 */
function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n){if(t){if("string"==typeof t)return e(t,n);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}function n(n){return function(t){if(Array.isArray(t))return e(t)}(n)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||t(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t,n,r,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise(function(o,i){var a=e.apply(t,n);function u(e){r(a,o,i,u,c,"next",e)}function c(e){r(a,o,i,u,c,"throw",e)}u(void 0)})}}function i(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,a,u=[],c=!0,s=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(u.push(r.value),u.length!==t);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(e,n)||t(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function u(e){var t=function(e,t){if("object"!=a(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=a(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==a(t)?t:t+""}function c(e,t,n){return(t=u(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var f,l={exports:{}},p={exports:{}};(f=p).exports=function(e,t){this.v=e,this.k=t},f.exports.__esModule=!0,f.exports.default=f.exports;var d=p.exports,v={exports:{}},h={exports:{}};!function(e){function t(n,r,o,i){var a=Object.defineProperty;try{a({},"",{})}catch(n){a=0}e.exports=t=function(e,n,r,o){function i(n,r){t(e,n,function(e){return this._invoke(n,r,e)})}n?a?a(e,n,{value:r,enumerable:!o,configurable:!o,writable:!o}):e[n]=r:(i("next",0),i("throw",1),i("return",2))},e.exports.__esModule=!0,e.exports.default=e.exports,t(n,r,o,i)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(h);var g=h.exports;!function(e){var t=g;function n(){var r,o,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.toStringTag||"@@toStringTag";function c(e,n,i,a){var u=n&&n.prototype instanceof f?n:f,c=Object.create(u.prototype);return t(c,"_invoke",function(e,t,n){var i,a,u,c=0,f=n||[],l=!1,p={p:0,n:0,v:r,a:d,f:d.bind(r,4),d:function(e,t){return i=e,a=0,u=r,p.n=t,s}};function d(e,t){for(a=e,u=t,o=0;!l&&c&&!n&&o<f.length;o++){var n,i=f[o],d=p.p,v=i[2];e>3?(n=v===t)&&(u=i[(a=i[4])?5:(a=3,3)],i[4]=i[5]=r):i[0]<=d&&((n=e<2&&d<i[1])?(a=0,p.v=t,p.n=i[1]):d<v&&(n=e<3||i[0]>t||t>v)&&(i[4]=e,i[5]=t,p.n=v,a=0))}if(n||e>1)return s;throw l=!0,t}return function(n,f,v){if(c>1)throw TypeError("Generator is already running");for(l&&1===f&&d(f,v),a=f,u=v;(o=a<2?r:u)||!l;){i||(a?a<3?(a>1&&(p.n=-1),d(a,u)):p.n=u:p.v=u);try{if(c=2,i){if(a||(n="next"),o=i[n]){if(!(o=o.call(i,u)))throw TypeError("iterator result is not an object");if(!o.done)return o;u=o.value,a<2&&(a=0)}else 1===a&&(o=i.return)&&o.call(i),a<2&&(u=TypeError("The iterator does not provide a '"+n+"' method"),a=1);i=r}else if((o=(l=p.n<0)?u:e.call(t,p))!==s)break}catch(e){i=r,a=1,u=e}finally{c=1}}return{value:o,done:l}}}(e,i,a),!0),c}var s={};function f(){}function l(){}function p(){}o=Object.getPrototypeOf;var d=[][a]?o(o([][a]())):(t(o={},a,function(){return this}),o),v=p.prototype=f.prototype=Object.create(d);function h(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,t(e,u,"GeneratorFunction")),e.prototype=Object.create(v),e}return l.prototype=p,t(v,"constructor",p),t(p,"constructor",l),l.displayName="GeneratorFunction",t(p,u,"GeneratorFunction"),t(v),t(v,u,"Generator"),t(v,a,function(){return this}),t(v,"toString",function(){return"[object Generator]"}),(e.exports=n=function(){return{w:c,m:h}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports}(v);var m=v.exports,y={exports:{}},w={exports:{}},b={exports:{}};!function(e){var t=d,n=g;e.exports=function e(r,o){function i(e,n,a,u){try{var c=r[e](n),s=c.value;return s instanceof t?o.resolve(s.v).then(function(e){i("next",e,a,u)},function(e){i("throw",e,a,u)}):o.resolve(s).then(function(e){c.value=e,a(c)},function(e){return i("throw",e,a,u)})}catch(e){u(e)}}var a;this.next||(n(e.prototype),n(e.prototype,"function"==typeof Symbol&&Symbol.asyncIterator||"@asyncIterator",function(){return this})),n(this,"_invoke",function(e,t,n){function r(){return new o(function(t,r){i(e,n,t,r)})}return a=a?a.then(r,r):r()},!0)},e.exports.__esModule=!0,e.exports.default=e.exports}(b);var x=b.exports;!function(e){var t=m,n=x;e.exports=function(e,r,o,i,a){return new n(t().w(e,r,o,i),a||Promise)},e.exports.__esModule=!0,e.exports.default=e.exports}(w);var O=w.exports;!function(e){var t=O;e.exports=function(e,n,r,o,i){var a=t(e,n,r,o,i);return a.next().then(function(e){return e.done?e.value:a.next()})},e.exports.__esModule=!0,e.exports.default=e.exports}(y);var S=y.exports,_={exports:{}};!function(e){e.exports=function(e){var t=Object(e),n=[];for(var r in t)n.unshift(r);return function e(){for(;n.length;)if((r=n.pop())in t)return e.value=r,e.done=!1,e;return e.done=!0,e}},e.exports.__esModule=!0,e.exports.default=e.exports}(_);var E=_.exports,j={exports:{}},A={exports:{}};!function(e){function t(n){return e.exports=t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,t(n)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(A);var P=A.exports;!function(e){var t=P.default;e.exports=function(e){if(null!=e){var n=e["function"==typeof Symbol&&Symbol.iterator||"@@iterator"],r=0;if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length))return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}}}throw new TypeError(t(e)+" is not iterable")},e.exports.__esModule=!0,e.exports.default=e.exports}(j);var T=j.exports;!function(e){var t=d,n=m,r=S,o=O,i=x,a=E,u=T;function c(){var s=n(),f=s.m(c),l=(Object.getPrototypeOf?Object.getPrototypeOf(f):f.__proto__).constructor;function p(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===l||"GeneratorFunction"===(t.displayName||t.name))}var d={throw:1,return:2,break:3,continue:3};function v(e){var t,n;return function(r){t||(t={stop:function(){return n(r.a,2)},catch:function(){return r.v},abrupt:function(e,t){return n(r.a,d[e],t)},delegateYield:function(e,o,i){return t.resultName=o,n(r.d,u(e),i)},finish:function(e){return n(r.f,e)}},n=function(e,n,o){r.p=t.prev,r.n=t.next;try{return e(n,o)}finally{t.next=r.n}}),t.resultName&&(t[t.resultName]=r.v,t.resultName=void 0),t.sent=r.v,t.next=r.n;try{return e.call(this,t)}finally{r.p=t.prev,r.n=t.next}}}return(e.exports=c=function(){return{wrap:function(e,t,n,r){return s.w(v(e),t,n,r&&r.reverse())},isGeneratorFunction:p,mark:s.m,awrap:function(e,n){return new t(e,n)},AsyncIterator:i,async:function(e,t,n,i,a){return(p(t)?o:r)(v(e),t,n,i,a)},keys:a,values:u}},e.exports.__esModule=!0,e.exports.default=e.exports)()}e.exports=c,e.exports.__esModule=!0,e.exports.default=e.exports}(l);var k=(0,l.exports)(),M=k;try{regeneratorRuntime=k}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=k:Function("r","regeneratorRuntime = r")(k)}var N=s(M);function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function C(e){if("object"!=typeof e)return e;var t=["string","number","boolean","undefined"];return Object.values(e).every(function(e){return t.includes(typeof e)})?function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach(function(t){c(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},e):JSON.parse(JSON.stringify(e))}function D(e){return C(e)}function z(e){var t=e.replace(/([A-Z])/g,"-$1").toLowerCase();return"-"===t[0]?t.substring(1):t}function I(e){var t=e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()});return t.endsWith("-")?t.slice(0,-1):t}function L(e){return z(e)}function U(e){var t=e.replace(/([A-Z])/g,"_$1").toLowerCase();return"_"===t[0]?t.substring(1):t}function B(e){return e.replace(/_([a-z])/g,function(e,t){return t.toUpperCase()})}function F(e){return U(e)}function q(e){for(var t=(e=e.replace(/^\s+/,"")).length-1,n=/\s/;n.test(e.charAt(t));)t--;return e.slice(0,t+1)}function Z(e){try{if("object"==typeof JSON.parse(e))return!0}catch(e){}return!1}function $(e){return Z(e)}function W(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,t="";e--;)t+=Math.floor(10*Math.random());return t}function G(){return W(arguments.length>0&&void 0!==arguments[0]?arguments[0]:5)}function V(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3,t=[Y(),G(e||3)];return t[0]+t[1]}function J(){return V(arguments.length>0&&void 0!==arguments[0]?arguments[0]:3)}function Y(){return Date.now?Date.now():(new Date).getTime()}function H(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n="";return n=t?(100*e).toFixed(t):String(Math.floor(100*e)),"".concat(n,"%")}function K(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return parseFloat(e).toFixed(t)}function Q(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};n=Object.assign({},n);var r=null,o=null,i=null,a=null,u=0,c=function(){u=!1===n.leading?0:Y(),i=null,a=e.apply(this,o),i||(r=o=null)};return function(){var s=Y();u||!1!==n.leading||(u=s);var f=t-(s-u);r=this;for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];return o=p,f<=0||f>t?(i&&(clearTimeout(i),i=null),u=s,a=e.apply(r,o),i||(r=o=null)):i||!1===n.trailing||(i=setTimeout(c.bind(r),f)),a}}function X(e,t,n){var r=null,o=null,i=null,a=null,u=null,c=function(){var s=Y()-i;s<t&&s>=0?o=setTimeout(c,t-s):(o=null,n||(u=e.apply(r,a),o||(r=a=null)))};return function(){r=this;for(var s=arguments.length,f=new Array(s),l=0;l<s;l++)f[l]=arguments[l];a=f,i=Y();var p=n&&!o;return o||(o=setTimeout(c,t)),p&&(u=e.apply(r,a),r=a=null),u}}var ee=(/* unused pure expression or super */ null && ({type:"d"}));function te(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ee,r=(n=Object.assign(ee,n)).type,o=decodeURIComponent;ne(e)||(e=new Date(e).getTime()),ne(t)||(t=new Date(t).getTime());var a=Number(t)-Number(e),u="",c=i(new Array(4).fill(0),4),s=c[0],f=(c[1],c[2],c[3]),l=o("%20%E5%A4%A9%20"),p=o("%20%E6%97%B6%20"),d=o("%20%E5%88%86%20"),v=o("%20%E7%A7%92");if(a>=0)switch(s=Math.floor(a/1e3/60/60/24),Math.floor(a/1e3/60/60),Math.floor(a/1e3/60),f=Math.floor(a/1e3),r){case"d":u=s;break;case"text":u=(s=Math.floor(a/1e3/60/60/24))+l+Math.floor(a/1e3/60/60%24)+p+Math.floor(a/1e3/60%60)+d+(f=Math.floor(a/1e3%60))+v;break;default:u=f}return u}function ne(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.isNaNAsNumber,r=void 0!==n&&n,o=t.isInfinityAsNumber,i=void 0!==o&&o,a=t.isUnFiniteAsNumber;return"number"==typeof e&&(!(!0!==i&&!0!==(void 0!==a&&a)&&!isFinite(e))&&!(!r&&isNaN(e)))}function re(e){var t=null;if(e&&"function"==typeof e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];t=e.apply(void 0,r)}return t}function oe(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return re.apply(void 0,[e].concat(n))}function ie(e){var t=!1;return Array.isArray(e)&&e.length&&(t=!0),t}function ae(e){var t=Boolean(e),n="object"==typeof e,r="[object Object]"===Object.prototype.toString.call(e);return t&&n&&r}function ue(e){return"function"==typeof e}function ce(e){return"string"==typeof e}function se(e){return"boolean"==typeof e}function fe(e){return se(e)}function le(e){return null==e}function pe(e){return"[object Array]"===Object.prototype.toString.call(e)}function de(e){return!!ae(e)&&0!==Object.keys(e).length}function ve(e){if(!e)return"";var t=new RegExp("\\n","g");return e.replace(t,"<br />")}function he(e){return ve(e)}function ge(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).removeNewLine,n=void 0!==t&&t,r="";return e&&(r=e.replace(/<\/?.+?>/g,""),n&&(r=r.replace(/[\r\n]/g,""))),r}function me(e){return ge(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}function ye(e){return ge(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}function we(e){return ge(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{})}function be(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"};if("string"!=typeof e)throw new Error("Input must be a string");return e.replace(/[&<>"'/]/g,function(e){return t[e]})}function xe(e){var t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#x27;":"'","&#x2F;":"/"};if("string"!=typeof e)throw new Error("Input must be a string");return e.replace(/(&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;)/g,function(e){return t[e]})}function Oe(e){return xe(e)}function Se(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{hasDot:!1,dotText:"..."};if(n=Object.assign({hasDot:!1,dotText:"..."},n),""!=e&&e){for(var r=0,o="",i=/[^\x00-\xff]/g,a="",u=e.replace(i,"**").length,c=0;c<u&&(null!=(a=e.charAt(c).toString()).match(i)?r+=2:r++,!(r>t));c++)o+=a;return n.hasDot&&u>t&&(o+=n.dotText),o}return""}function _e(e,t){return Se(e,t,{hasDot:arguments.length>2&&void 0!==arguments[2]&&arguments[2]})}function Ee(e,t){return _e(e,t,arguments.length>2&&void 0!==arguments[2]&&arguments[2])}function je(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{validStatusRange:[200,300],validCode:[0]},n=Object.assign({validStatusRange:[200,300],validCode:[0]},t),r=n.validStatusRange,o=n.validCode;2!==r.length&&console.error("valid validStatusRange is required");var i=!1;if(e&&e.status&&2===r.length&&e.status>=r[0]&&e.status<r[1]){var a=e.data;a&&o.includes(a.code)&&(i=!0)}return i}function Ae(e,t,n){var r=!1;return"object"!=typeof e||t.reduce(function(e,t){return void 0===e[t]?Object.create(null):e=e[t]},e)===n&&(r=!0),r}function Pe(e){var t=function(e){return String(Math.ceil(e))};if(!e||e<0)return"";var n=1024;return e<n?e+" B":e<Math.pow(n,2)?t(e/n)+" KB":e<Math.pow(n,3)?t(e/Math.pow(n,2))+" MB":e<Math.pow(n,4)?t(e/Math.pow(n,3))+" G":t(e/Math.pow(n,4))+" T"}function Te(e){var t,n=0;for(t=0;t<e.length;t++)n=(n<<5)-n+e.charCodeAt(t),n|=0;return n}function ke(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy-MM-dd";e||(e=new Date);var n=new Date(e),r=n.getHours(),o={yyyy:n.getFullYear(),MM:n.getMonth()+1,dd:n.getDate()<10?"0"+n.getDate():n.getDate(),HH:r<10?"0"+r:r,hh:(r%12||12)<10?"0"+(r%12||12):r%12||12,mm:n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes(),ss:n.getSeconds()<10?"0"+n.getSeconds():n.getSeconds(),a:r<12?"AM":"PM"},i=t||"yyyy-MM-dd";return Object.keys(o).forEach(function(e){var t=o[e];"MM"===e&&Number(t)<=9&&(t="0".concat(t)),i=i.replace(e,String(t))}),i}function Me(e){return/^1\d{10}$/.test(e)}function Ne(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}function Re(e){for(var t="";e>0;){var n=e%26;0===n&&(n=26),t=String.fromCharCode(n+96)+t,e=(e-n)/26}return t}function Ce(){return"v4"}function De(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(e){return!0===e},r=t.interval,i=void 0===r?1e3:r,a=t.times,u=void 0===a?10:a,c=t.context,s=t.args,f=0,l=function(){setTimeout(o(N.mark(function t(){var r;return N.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=1,e.apply(c,s);case 1:if(r=t.sent,!(n(r)||++f>=u)){t.next=2;break}return t.abrupt("return");case 2:l();case 3:case"end":return t.stop()}},t)})),i)};"function"!=typeof e&&console.error("Expected a function."),("number"!=typeof i||i<0)&&console.error("Expected a non-negative number for interval."),("number"!=typeof u||u<0)&&console.error("Expected a non-negative number for times."),l()}function ze(e){return Ie.apply(this,arguments)}function Ie(){return(Ie=o(N.mark(function e(t){return N.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(e){setTimeout(function(){e(t)},t)}));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Le(e){return Ue.apply(this,arguments)}function Ue(){return(Ue=o(N.mark(function e(t){return N.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ze(t));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}var Be="";function Fe(){if(Be)return"browser"===Be;var e="undefined"!=typeof window;return e&&(Be="browser"),e}function qe(e,t){for(var r=e.length,o=t.length,i=C(new Array(r).fill(new Array(o).fill(0))),a=0;a<r;++a)for(var u=0;u<o;++u)if(e[a]===t[u]){var c=0;a>0&&u>0&&(c=i[a-1][u-1]),i[a][u]=c+1}var s=Array.prototype.concat.apply([],i);return Math.max.apply(Math,n(s))}function Ze(e,t){return qe(e,t)}function $e(e,t){for(var r=e.length,o=t.length,i=C(new Array(r).fill(new Array(o).fill(0))),a=0;a<r;++a)for(var u=0;u<o;++u)if(e[a]===t[u]){var c=0;a>0&&u>0&&(c=i[a-1][u-1]),i[a][u]=c+1}else{var s=0,f=0;u>0&&(s=i[a][u-1]),a>0&&(f=i[a-1][u]),i[a][u]=Math.max(s,f)}var l=Array.prototype.concat.apply([],i);return Math.max.apply(Math,n(l))}function We(e,t){return $e(e,t)}function Ge(e){return Math.random()<e}function Ve(e){return Ge(e)}function Je(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=location.search.substring(1).match(t);return null!==n?decodeURIComponent(n[2]):""}function Ye(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";""===e&&(e=location.search);var t={};return e.replace(/\??(\w+)=([^&]*)&?/g,function(e,n,r){return void 0===t[n]&&(t[n]=decodeURIComponent(r)),""}),t}function He(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=null;if(e.includes("#")){r=new URL(e).searchParams.getAll(t)}else{var o={};e.replace(/\??(\w+)=([^&]*)&?/g,function(e,t,n){return void 0!==o[t]?o[t].push(n):o[t]=[n],""}),r=o[t]||[]}return n.returnArray?r:r.length?r[0]:null}function Ke(e,t,n){if(e.includes("#")){var r=new URL(e);return r.searchParams.set(t,n),r.toString()}var o=new RegExp("([?&])"+t+"=.*?(&|$)","i"),i=-1!==e.indexOf("?")?"&":"?";return e.match(o)?e.replace(o,"$1"+t+"="+n+"$2"):e+i+t+"="+n}function Qe(e){var t=location.hash.split("?");if(1===t.length)return"";var n=new RegExp("(^|&)".concat(e,"=([^&]*)(&|$)")),r=t[1].match(n);return r?r[2]:""}function Xe(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["hostname"];if(ut(e)){var n=new window.URL(e);return t.reduce(function(e,t){return e+=n[t]},"")}var r=document.createElement("a");return r.href=e,t.reduce(function(e,t){return e+=r[t]},"")}function et(e){return/^[a-zA-Z0-9]+:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\b([-a-zA-Z0-9\u4E00-\u9FA5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b()!@:%_+.~#?&//=]*)$/.test(e)}function tt(e){var t=/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\u4E00-\u9FA5()!@:%_+.~#?&//=]*)/;return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{strict:!0}).strict||(t=/^(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\u4E00-\u9FA5()!@:%_+.~#?&//=]*)/),t.test(e)}function nt(e){var t="";if("string"!=typeof e||""==e)return t;var n=/\.[^/?#]+$/.exec(e);return n?(n[0].length>1&&(t=n[0].substring(1)),t):t}function rt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t||(t=".js");for(var n=new RegExp("[?&]".concat(e,"=([^&]*)")),r=document.querySelectorAll('script[src*="'.concat(t,'"]')),o=0;o<r.length;o++){var i=r[o].getAttribute("src");if(i&&-1!==i.indexOf(t)){var a=i.match(n);if(a)return decodeURIComponent(a[1])}}return""}function ot(e){if(e&&0===Object.keys(e).length)return"";var t="?";for(var n in e)t+="".concat(n,"=").concat(e[n],"&");return t.slice(0,-1)}function it(e){return e.replace(/^http:/,"https:")}function at(e){return it(e)}function ut(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=window.URL;if(!t)return!1;if(!t.canParse)return!1;if("function"!=typeof t.canParse)return!1;try{var n=new t("b","http://a");return n.pathname="c d","http://a/c%20d"===n.href&&Boolean(n.searchParams)&&t.canParse(e)}catch(e){return!1}}function ct(e){var t="";(!tt(e)&&tt(e,{strict:!1})&&0===e.indexOf("//")&&(e="https:"+e),ut(e))&&(t=new URL(e).host);return t}function st(e){var t="";(!tt(e)&&tt(e,{strict:!1})&&0===e.indexOf("//")&&(e="https:"+e),ut(e))&&(t=new URL(e).pathname);return t}function ft(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).fireOnInit,n=void 0===t||t,r=history,o=location.href,i=[],a=function(t){var n=location.href;if(n!==o||"load"===t){var r=o;o=n,e({url:n,oldUrl:r,trigger:t})}},u=function(){return a("popstate")},c=function(){return a("hashchange")};window.addEventListener("popstate",u),window.addEventListener("hashchange",c),i.push(function(){return window.removeEventListener("popstate",u)}),i.push(function(){return window.removeEventListener("hashchange",c)}),r.__mazeyUrlChangePatched__||(r.__mazeyUrlChangePatched__=!0,r.__mazeyUrlChangeSubscribers__=new Set,r.__mazeyRawPushState__=history.pushState.bind(history),r.__mazeyRawReplaceState__=history.replaceState.bind(history),history.pushState=function(){r.__mazeyRawPushState__.apply(r,arguments),r.__mazeyUrlChangeSubscribers__.forEach(function(e){return e("pushState")})},history.replaceState=function(){r.__mazeyRawReplaceState__.apply(r,arguments),r.__mazeyUrlChangeSubscribers__.forEach(function(e){return e("replaceState")})});var s=function(e){return a(e)};return r.__mazeyUrlChangeSubscribers__.add(s),i.push(function(){return r.__mazeyUrlChangeSubscribers__.delete(s)}),n&&a("load"),function(){i.forEach(function(e){return e()})}}function lt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function pt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?lt(Object(n),!0).forEach(function(t){c(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):lt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var dt={enabled:!0,isClosed:!1,showWrap:!1,showDate:!1,locales:"en-US",isStringifyObject:!1,logFn:function(){},errorFn:function(){}};function vt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:pt({},dt),r=Object.assign(pt({},dt),t),o=r.enabled,i=r.isClosed,a=r.showWrap,u=r.showDate,c=r.locales,s=r.isStringifyObject,f=r.logFn,l=r.errorFn,p=o;!0===i&&(ht.warn("The options.isClosed is deprecated. Please use options.enabled instead."),p=!1);var d=Object.create(null),v=function(){return(new Date).toLocaleDateString(c,{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})};return["log","info","warn","error"].forEach(function(t){d[t]=function(){for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];if(p){var c,d,h=e,g=e;if("string"==typeof e&&e.length>=2){var m=e.length;h=":"===e[m-1]?e.substring(0,m-1):e}if(a&&console.log("--- ".concat(h," - begin ---")),u&&(g=e?"".concat(v()," ").concat(e):"".concat(v())),s&&(o=o.map(function(e){return ae(e)?JSON.stringify(e):e})),e||u)(c=console)[t].apply(c,[g].concat(n(o)));else(d=console)[t].apply(d,n(o));"log"===t&&f(),"error"===t&&l(),a&&console.log("--- ".concat(h," - end ---"))}}}),d}var ht=vt("[Mazey]"),gt=vt("",{showDate:!0,locales:"zh-CN",isStringifyObject:!0});function mt(e,t){if(!e)return ht.error("The element is not exist."),!1;for(var n=e.className.split(/\s+/),r=0;r<n.length;r++)if(n[r]===t)return!0;return!1}function yt(e,t){if(e)if(Array.isArray(t))t.forEach(function(t){e.classList.add(t)});else{for(var n=e.className,r=n.split(/\s+/),o=0;o<r.length;o++)if(r[o]===t)return;var i,a="";""!==n&&(a=" "),i=n+a+t,e.className=i}else ht.error("The element is not exist.")}function wt(e,t){yt(e,t)}function bt(e,t){var n;e?(n=(n=(n=(n=" "+e.className+" ").replace(/(\s+)/gi," ")).replace(" "+t+" "," ")).replace(/(^\s+)|(\s+$)/g,""),e.className=n):ht.error("The element is not exist.")}function xt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{id:""};if(!e)return!1;var n=document.createDocumentFragment(),r=null,o="",i=document.createElement("style");return t.id?(o="".concat(t.id),(r=document.getElementById(o))?r.innerHTML=e:(i.setAttribute("id",t.id),i.innerHTML=e,n.appendChild(i),document.head.appendChild(n))):(i.innerHTML=e,n.appendChild(i),document.head.appendChild(n)),!0}function Ot(){var e=window.jQuery||window.$;if(e){var t=e("img");return!(!t||!t.length)&&(t.each(function(){var t=e(this);if(t){var n=t.attr("src");if(n&&"string"==typeof n&&n.length){var r=n.match(/width=([0-9]+[a-z%]*)/),o=n.match(/height=([0-9]+[a-z%]*)/);r&&ie(r)&&r[1]&&t.width(r[1]),o&&ie(o)&&o[1]&&t.height(o[1])}}}),!0)}var n=document.getElementsByTagName("img");return n.length>0&&(Array.from(n).forEach(function(e){var t=e;if(t){var n=t.getAttribute("src");if(n&&"string"==typeof n&&n.length){var r=n.match(/width=([0-9]+[a-z%]*)/),o=n.match(/height=([0-9]+[a-z%]*)/);r&&ie(r)&&r[1]&&(t.style.width=r[1]),o&&ie(o)&&o[1]&&(t.style.height=o[1])}}}),!0)}function St(){return Ot()}function _t(e,t){var n="";return t&&t.length>0&&(n=t.join(";")+";"),"".concat(e,"{").concat(n,"}")}function Et(e){var t;return document.querySelector&&(null===(t=document.querySelector('meta[name="'.concat(e,'"]')))||void 0===t?void 0:t.getAttribute("content"))||""}function jt(e){var t=e||window.event;t.stopPropagation?t.stopPropagation():t.cancelBubble=!0}function At(){var e=window.MAZEY_DEFINE_LISTENERS;return"object"!=typeof e&&(e={},window.MAZEY_DEFINE_LISTENERS=e),e}function Pt(e,t){var n=At();void 0===n[e]&&(n[e]=[]),"function"==typeof t&&n[e].push(t)}function Tt(e,t){var n=At()[e];if(n instanceof Array)for(var r=0,o=n.length;r<o;r++)"function"==typeof n[r]&&(void 0===t?n[r]():n[r](t))}function kt(e){Tt(e)}function Mt(e,t){var n=At(),r=n[e];if("string"==typeof e&&r instanceof Array)if("function"==typeof t){for(var o=0,i=r.length;o<i;o++)if(r[o]===t){n[e].splice(o,1);break}}else delete n[e]}function Nt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;e&&sessionStorage.setItem(e,JSON.stringify(t))}function Rt(e){var t=null;if(e){var n=sessionStorage.getItem(e);n&&(t=JSON.parse(n))}return t}function Ct(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;e&&localStorage.setItem(e,JSON.stringify(t))}function Dt(e){var t=null;if(e){var n=localStorage.getItem(e);n&&(t=JSON.parse(n))}return t}function zt(e){for(var t=e+"=",n=document.cookie.split(";"),r=0;r<n.length;r++){for(var o=n[r];" "==o.charAt(0);)o=o.substring(1,o.length);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return""}function It(e,t,n,r){var o,i;if(n){var a=new Date;a.setTime(a.getTime()+24*n*60*60*1e3),i="; expires="+a.toUTCString()}else i="";var u=location.host;1===u.split(".").length?document.cookie=e+"="+t+i+"; path=/":((o=u.split(".")).shift(),r=r||"."+o.join("."),document.cookie=e+"="+t+i+"; path=/; domain="+r,null!==zt(e)&&zt(e)===t||(r=r||"."+u,document.cookie=e+"="+t+i+"; path=/; domain="+r))}function Lt(e){for(var t=document.cookie.split(";"),n=0;n<t.length;n++){var r=t[n].trim();if(r.startsWith("".concat(e,"="))){var o=r.split("=")[0],i=new Date;return i.setTime(i.getTime()-1),document.cookie="".concat(o,"=;expires=").concat(i.toUTCString()),!0}}return!1}function Ut(e){Lt(e)}function Bt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Ft(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Bt(Object(n),!0).forEach(function(t){c(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Bt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function qt(e){var t,n=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{id:""}).id,r=function(){},o=new Promise(function(e,n){t=e,r=n}),i=function(){t("loaded")},a=document.createElement("link");a||r(new Error("Not support create link element"));var u="onload"in a,c=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i,"$1")<536;if(a.rel="stylesheet",a.type="text/css",a.href=e,void 0!==n&&(a.id=n),document.getElementsByTagName("head")[0].appendChild(a),c||!u)return setTimeout(function(){f(a,i,0)},1),o;function s(){a&&(a.onload=a.onerror=a.onreadystatechange=null),a=null,i()}function f(e,t,n){if(e){var r,o=e.sheet;if((n+=1)>3e5)return r=!0,e&&(e=null),void t();if(c)o&&(r=!0);else if(o)try{o.cssRules&&(r=!0)}catch(e){var i=e;if(!i.name)return;"NS_ERROR_DOM_SECURITY_ERR"===i.name&&(r=!0)}setTimeout(function(){r?t():f(e,t,n)},20)}}return u?(a.onload=s,a.onerror=function(){s()}):a.onreadystatechange=function(){a&&/loaded|complete/.test(a.readyState)&&s()},o}var Zt=(/* unused pure expression or super */ null && ({id:"",callback:function(){},timeout:5e3,isDefer:!1,isAsync:!1,isCrossOrigin:!1,attributes:null,cssUrl:""}));function $t(e){var t,n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Ft({},Zt),o=Object.assign(Ft({},Zt),r),i=o.id,a=o.callback,u=o.timeout,c=o.isDefer,s=o.isAsync,f=o.isCrossOrigin,l=o.attributes,p=o.cssUrl,d=document.createElement("script");if(d||Promise.reject("Not support create script element"),p){var v=function(e,t){if(!t)return"";if(tt(t))return t;var n=e.split("/");n.pop();var r=n.join("/");return"".concat(r,"/").concat(t)}(e,p);v&&qt(v).catch(function(e){console.error("Failed to load CSS from ".concat(v,": ").concat(null==e?void 0:e.message))})}var h=document.getElementsByTagName("script")[0];return d.type="text/javascript",c&&(d.defer=!0),s&&(d.async=!0),f&&(d.crossOrigin="anonymous"),i&&(d.id=i),l&&Object.keys(l).forEach(function(e){d.setAttribute(e,l[e])}),d.readyState?d.onreadystatechange=function(){"loaded"!==d.readyState&&"complete"!==d.readyState||(d.onreadystatechange=null,oe(a),oe(t,"loaded"))}:d.onload=function(){oe(a),oe(t,"loaded")},d.src=e,h&&h.parentNode.insertBefore(d,h),new Promise(function(e,r){t=e,n=r,u&&setTimeout(n.bind(null,"timeout"),u)})}function Wt(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e4,n=function(){},r=new Promise(function(t,r){n=t,e=r});return"complete"===document.readyState?n("complete"):window.addEventListener("load",function(){return n("load")}),setTimeout(function(){return e(Error("timeout"))},t),r}function Gt(e){return new Promise(function(t,n){var r=new Image;r.onload=function(){t(r)},r.onerror=function(e){n(e)},r.src=e})}function Vt(e,t){return window[e]?Promise.resolve("defined"):$t(t)}function Jt(e){var t=[],n=window.PerformanceObserver;return!!n&&(ie(n.supportedEntryTypes)&&(t=n.supportedEntryTypes),t.includes(e))}function Yt(){return Ht.apply(this,arguments)}function Ht(){return(Ht=o(N.mark(function e(){return N.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Jt("paint")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new PerformanceObserver(function(n){var r=n.getEntries().find(function(e){return"first-contentful-paint"===e.name});r&&(t.disconnect(),e(Math.round(r.startTime)))});t.observe({type:"paint",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Kt(){return Qt.apply(this,arguments)}function Qt(){return(Qt=o(N.mark(function e(){return N.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Jt("paint")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new PerformanceObserver(function(n){var r=n.getEntries().find(function(e){return"first-paint"===e.name});r&&(t.disconnect(),e(Math.round(r.startTime)))});t.observe({type:"paint",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function Xt(){return en.apply(this,arguments)}function en(){return(en=o(N.mark(function e(){return N.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Jt("largest-contentful-paint")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new PerformanceObserver(function(n){var r=n.getEntries().find(function(e){return"largest-contentful-paint"===e.entryType});r&&(t.disconnect(),e(Math.round(r.startTime)))});t.observe({type:"largest-contentful-paint",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function tn(){return nn.apply(this,arguments)}function nn(){return(nn=o(N.mark(function e(){return N.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Jt("first-input")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new PerformanceObserver(function(n){var r=n.getEntries().find(function(e){return"first-input"===e.entryType});if(r){t.disconnect();var o=r.processingStart;e(o?Math.round(r.processingStart-r.startTime):0)}});t.observe({type:"first-input",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function rn(){return on.apply(this,arguments)}function on(){return(on=o(N.mark(function e(){return N.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Jt("layout-shift")){e.next=1;break}return e.abrupt("return",0);case 1:return e.abrupt("return",new Promise(function(e){var t=new PerformanceObserver(function(n){var r=n.getEntries().reduce(function(e,t){var n=0;return ne(t.value)&&(n=t.value),e+n},0);t.disconnect(),e(r)});t.observe({type:"layout-shift",buffered:!0})}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function an(){return un.apply(this,arguments)}function un(){return(un=o(N.mark(function e(){var t,n;return N.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(Jt("navigation")){e.next=1;break}return e.abrupt("return",0);case 1:if(window.performance&&window.performance.getEntriesByType){e.next=2;break}return e.abrupt("return",0);case 2:if(t=performance.getEntriesByType("navigation")[0],n=0,t){e.next=3;break}return e.abrupt("return",0);case 3:return n=t.responseStart-t.requestStart,e.abrupt("return",Math.round(n));case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}function cn(){return sn.apply(this,arguments)}function sn(){return sn=o(N.mark(function e(){var t,n,r,o,a,u,c,s,f,l,p,d,v,h,g,m,y,w,b,x,O,S,_,E,j,A,P,T,k,M,R,C,D,z,I,L,U,B,q,Z,$,W,G,V=arguments;return N.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(G=function(e,t){var n=0;return t&&(n=e-t),n},W=function(){var e="";return window.screen&&window.screen.orientation&&window.screen.orientation.angle&&(180!==window.screen.orientation.angle&&0!==window.screen.orientation.angle||(e="|"),90!==window.screen.orientation.angle&&-90!==window.screen.orientation.angle||(e="-")),e},$=function(){var e="",t=window.navigator;if(t.connection&&t.connection.effectiveType)switch(t.connection.effectiveType){case"wifi":e="wifi";break;case"4g":e="4g";break;case"2g":e="2g";break;case"3g":e="3g";break;case"ethernet":e="ethernet";break;case"default":e=void 0}return e||(e=""),e},Z=function(){var e,t=navigator.userAgent.toLowerCase(),n=t.match(/(ipad)/i)&&"ipad",r=t.match(/iphone os/i)&&"iphone os",o=t.match(/midp/i)&&"midp",i=t.match(/rv:1.2.3.4/i)&&"rv:1.2.3.4",a=t.match(/ucweb/i)&&"ucweb",u=t.match(/android/i)&&"android",c=t.match(/windows ce/i)&&"windows ce",s=t.match(/windows mobile/i)&&"windows mobile";return(e=n||r||o||i||a||u||c||s?r||o||i||a||u||c||s?"phone":n?"ipad":void 0:"pc")||(e=""),e},q=function(){var e="",t=navigator.userAgent,n=t.indexOf("Android")>-1||t.indexOf("Linux")>-1,r=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),o=navigator.userAgent.split(";");if(o.length<2)return e;var i=o[1];return i?(n&&(e=(i.match(/\d+\.\d+/g)||[])[0]),r&&(e=(i.match(/(\d+)_(\d+)_?(\d+)?/)||[])[0]),e||(e=""),e):e},B=function(){return navigator.userAgent.indexOf("Android")>-1||navigator.userAgent.indexOf("Linux")>-1?"android":navigator.userAgent.indexOf("iPhone")>-1?"ios":navigator.userAgent.indexOf("Windows Phone")>-1?"wp":"others"},U=function(){var e={source:k,os:B(),osVersion:q(),deviceType:Z(),network:$(),screenDirection:W(),unloadTime:f-l,redirectTime:p-d,dnsTime:v-h,tcpTime:g-m,sslTime:G(g,y),responseTime:w-b,downloadTime:x-w,firstPaintTime:I,firstContentfulPaintTime:L,domReadyTime:O-C,onloadTime:S-C,whiteTime:w-C,renderTime:_-C,decodedBodySize:A,encodedBodySize:P};Object.keys(e).forEach(function(t){ne(e[t])&&(e[t]<0?e[t]=0:e[t]=Math.round(e[t]))}),ne(e.whiteTime)&&e.whiteTime>e.onloadTime&&(e.whiteTime=0);var n={};t||Object.keys(e).forEach(function(t){n[F(t)]=e[t]}),Object.keys(n).length?r(n):r(e)},t=V.length>0&&void 0!==V[0]&&V[0],Jt("navigation")){e.next=1;break}return e.abrupt("return",Promise.reject(new Error("navigation is not supported")));case 1:if((n=window.performance)&&"function"==typeof n.getEntries&&"function"==typeof n.getEntriesByType){e.next=2;break}return e.abrupt("return",Promise.reject(new Error("performance is not supported")));case 2:if(o=new Promise(function(e){r=e}),a=null,ie(u=n.getEntriesByType("navigation"))&&(a=u[0]),c=new Array(19).fill(0),s=i(c,19),f=s[0],l=s[1],p=s[2],d=s[3],v=s[4],h=s[5],g=s[6],m=s[7],y=s[8],w=s[9],b=s[10],x=s[11],O=s[12],S=s[13],_=s[14],E=s[15],j=s[16],A=s[17],P=s[18],T=n.timing,k="",!a){e.next=3;break}k="PerformanceNavigationTiming",A=(M=a).decodedBodySize,P=M.encodedBodySize,f=(R=a).unloadEventEnd,l=R.unloadEventStart,p=R.redirectEnd,d=R.redirectStart,v=R.domainLookupEnd,h=R.domainLookupStart,g=R.connectEnd,m=R.connectStart,y=R.secureConnectionStart,w=R.responseStart,b=R.requestStart,x=R.responseEnd,O=R.domContentLoadedEventStart,S=R.loadEventStart,_=R.loadEventEnd,E=R.startTime,j=R.fetchStart,e.next=5;break;case 3:if(!T){e.next=4;break}k="PerformanceTiming",f=T.unloadEventEnd,l=T.unloadEventStart,p=T.redirectEnd,d=T.redirectStart,v=T.domainLookupEnd,h=T.domainLookupStart,g=T.connectEnd,m=T.connectStart,y=T.secureConnectionStart,w=T.responseStart,b=T.requestStart,x=T.responseEnd,O=T.domContentLoadedEventStart,S=T.loadEventStart,_=T.loadEventEnd,E=T.navigationStart,j=T.fetchStart,e.next=5;break;case 4:return e.abrupt("return",Promise.reject(new Error("NavigationTiming and Timing are not supported")));case 5:if(C=0,!ne(E)){e.next=6;break}C=E,e.next=8;break;case 6:if(!ne(j)){e.next=7;break}C=j,e.next=8;break;case 7:return e.abrupt("return",Promise.reject(new Error("startTime, navigationStart or fetchStart are required")));case 8:return e.next=9,Promise.all([Kt(),Yt()]);case 9:return D=e.sent,z=i(D,2),I=z[0],L=z[1],ne(_)&&_>0?U():window.addEventListener("load",function(){window.setTimeout(function(){U()},0)}),e.abrupt("return",o);case 10:case"end":return e.stop()}},e)})),sn.apply(this,arguments)}function fn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function ln(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?fn(Object(n),!0).forEach(function(t){c(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):fn(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var pn="";function dn(){if(pn)return"pwa"===pn;var e=vn();return"serviceWorker"in navigator&&function(){var e;try{return e=new Function("return async function(){};")(),null!=Object.getPrototypeOf(e).constructor}catch(e){return!1}}()&&"undefined"!=typeof Promise&&-1!==Promise.toString().indexOf("[native code]")&&Boolean(window.fetch)&&Boolean(window.indexedDB)&&Boolean(window.caches)&&!e.shell&&"https:"===window.location.protocol?(pn="pwa",!0):(pn="no-pwa",!1)}function vn(){if(window.MAZEY_BROWSER_INFO&&"object"==typeof window.MAZEY_BROWSER_INFO)return window.MAZEY_BROWSER_INFO;var e={engine:"",engineVs:"",platform:"",supporter:"",supporterVs:"",system:"",systemVs:"",shell:"",shellVs:"",appleType:"",colorScheme:""};try{var t=navigator.userAgent.toLowerCase();if(!t)return e;var n=function(e){return e.test(t)},r=function(e){var n="",r=t.match(e);return r&&ie(r)&&(n=(n=(n=r.toString()).replace(/[^0-9|_.]/g,"")).replace(/_/g,".")),n},o="",i="";n(/windows|win32|win64|wow32|wow64/g)?o="windows":n(/macintosh|macintel/g)?o="macos":n(/x11/g)?o="linux":n(/android|adr/g)?o="android":n(/ios|iphone|ipad|ipod|iwatch/g)&&(o="ios",n(/ipad/g)?i="ipad":n(/iphone/g)?i="iphone":n(/iwatch/g)?i="iwatch":n(/ipod/g)&&(i="ipod")),e=ln(ln({},e),{},{system:o,appleType:i});var a="";"windows"===o?n(/windows nt 5.0|windows 2000/g)?a="2000":n(/windows nt 5.1|windows xp/g)?a="xp":n(/windows nt 5.2|windows 2003/g)?a="2003":n(/windows nt 6.0|windows vista/g)?a="vista":n(/windows nt 6.1|windows 7/g)?a="7":n(/windows nt 6.2|windows 8/g)?a="8":n(/windows nt 6.3|windows 8.1/g)?a="8.1":n(/windows nt 10.0|windows 10/g)&&(a="10"):"macos"===o?a=r(/os x [\d._]+/g):"android"===o?a=r(/android [\d._]+/g):"ios"===o&&(a=r(/os [\d._]+/g)),e=ln(ln({},e),{},{systemVs:a});var u="";"windows"===o||"macos"===o||"linux"===o?u="desktop":("android"===o||"ios"===o||n(/mobile/g))&&(u="mobile"),e=ln(ln({},e),{},{platform:u});var c="",s="";n(/applewebkit/g)?(c="webkit",n(/edge/g)?s="edge":n(/opr/g)?s="opera":n(/chrome/g)?s="chrome":n(/safari/g)&&(s="safari")):n(/gecko/g)&&n(/firefox/g)?(c="gecko",s="firefox"):n(/presto/g)?(c="presto",s="opera"):n(/trident|compatible|msie/g)&&(c="trident",s="iexplore"),e=ln(ln({},e),{},{engine:c,supporter:s});var f="";"webkit"===c?f=r(/applewebkit\/[\d._]+/g):"gecko"===c?f=r(/gecko\/[\d._]+/g):"presto"===c?f=r(/presto\/[\d._]+/g):"trident"===c&&(f=r(/trident\/[\d._]+/g)),e=ln(ln({},e),{},{engineVs:f});var l="";"chrome"===s?l=r(/chrome\/[\d._]+/g):"safari"===s?l=r(/version\/[\d._]+/g):"firefox"===s?l=r(/firefox\/[\d._]+/g):"opera"===s?l=r(/opr\/[\d._]+/g):"iexplore"===s?l=r(/(msie [\d._]+)|(rv:[\d._]+)/g):"edge"===s&&(l=r(/edge\/[\d._]+/g)),e=ln(ln({},e),{},{supporterVs:l});var p="",d="";n(/micromessenger/g)?(p="wechat",d=r(/micromessenger\/[\d._]+/g)):n(/qqbrowser/g)?(p="qq_browser",d=r(/qqbrowser\/[\d._]+/g)):n(/\sqq/g)?p="qq_app":n(/ucbrowser/g)?(p="uc",d=r(/ucbrowser\/[\d._]+/g)):n(/qihu 360se/g)?p="360":n(/2345explorer/g)?(p="2345",d=r(/2345explorer\/[\d._]+/g)):n(/metasr/g)?p="sougou":n(/lbbrowser/g)?p="liebao":n(/maxthon/g)?(p="maxthon",d=r(/maxthon\/[\d._]+/g)):n(/biliapp/g)&&(p="bilibili"),e=ln(ln({},e),{},{shell:p,shellVs:d});var v="";if(window.matchMedia){var h=window.matchMedia("(prefers-color-scheme: dark)"),g=window.matchMedia("(prefers-color-scheme: light)");h.matches?v="dark":g.matches&&(v="light")}return e=ln(ln({},e),{},{colorScheme:v}),window.MAZEY_BROWSER_INFO=e,e}catch(t){return ht.warn(t),e}}function hn(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-",n=vn(),r=[];return["system","platform","engine","supporter","shell","appleType"].forEach(function(o){var i=n[o];if(i){var a="";e&&e.length>0&&(a="".concat(e).concat(t)),r.push("".concat(a).concat(i))}}),r}var gn="";function mn(){if(gn)return Promise.resolve("webp"===gn);return new Promise(function(e){var t=new Image;t.onload=function(){var n=t.width>0&&t.height>0;gn=n?"webp":"no-webp",e(n)},t.onerror=function(){gn="no-webp",e(!1)},t.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="})}

;// ./src/webhook.js
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/* global GM_getValue, GM_setValue, GM_xmlhttpRequest, GM_registerMenuCommand, unsafeWindow */
/* eslint-disable max-lines, max-len */


var WebhookCon = vt("[Webhook]");
var CONFIG = {
  endpoint: "",
  messageContainerSelector: "div.messages-container div.text-content",
  messageContentSelector: "div.text-content",
  // deprecated, kept for backward compatibility
  messageTimeSelector: "span.message-time",
  messageListScrollSelector: "div.MessageList.custom-scroll",
  intervalMs: 60 * 1000,
  safeRedirectUrl: "https://www.bing.com/search?q=peace",
  safeRedirectAfterMs: 7 * 24 * 60 * 60 * 1000,
  // 2 * 60 * 1000, //
  filterApiMessageBody: true,
  maxStoredHashes: 5000,
  enableDebug: true
};
var STORAGE_KEY = "peace-webhook-processed-hashes-v1";
var ENDPOINT_STORAGE_KEY = "peace-webhook-endpoint";
var API_KEY_STORAGE_KEY = "peace-webhook-api-key";
var INSTALL_FLAG = "__PEACE_WEBHOOK_SCRIPT_INSTALLED__";
var DEBUG_GLOBAL_KEY = "PEACE_WEBHOOK_DEBUG";
var CONTROL_CONTAINER_ID = "peace-webhook-controls";
var MASK_ID = "peace-webhook-mask";
var TITLE_PREFIX = "[Webhook Running]";
var HAN_REGEXP = createHanRegExp();
var EMOJI_SEQUENCE_REGEXP = createEmojiSequenceRegExp();
var URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\u4E00-\u9FA5()!@:%_+.~#?&//=]*)/g;
var USERNAME_REGEXP = /(^|[^\w])@[A-Za-z]+/g;
var SPECIFIC_CHARACTERS_REGEXP = /[()]+/g;
var state = {
  running: false,
  scanning: false,
  runId: 0,
  timerId: null,
  safeRedirectTimerId: null,
  originalTitle: document.title,
  processedRecords: [],
  processedHashes: new Set(),
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
  return {
    enableDebug: CONFIG.enableDebug,
    running: state.running,
    scanning: state.scanning,
    runId: state.runId,
    hasTimer: Boolean(state.timerId),
    hasSafeRedirectTimer: Boolean(state.safeRedirectTimerId),
    safeRedirectAfterMs: CONFIG.safeRedirectAfterMs,
    filterApiMessageBody: CONFIG.filterApiMessageBody,
    processedRecordCount: state.processedRecords.length,
    processedHashCount: state.processedHashes.size,
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
      return state.processedRecords.map(function (record) {
        return _objectSpread({}, record);
      });
    },
    getProcessedHashes: function getProcessedHashes() {
      return Array.from(state.processedHashes);
    },
    getState: getDebugStateSnapshot,
    normalizeContent: function normalizeContent(content) {
      return normalizeMessageContent(content);
    },
    clearProcessedRecords: function clearProcessedRecords() {
      return _clearProcessedRecords();
    },
    reloadProcessedRecords: function reloadProcessedRecords() {
      loadProcessedRecords();
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
    logWarn("Stored hash data is malformed; using an empty history.", error);
    return fallback;
  }
}
function getStoredValue(key, defaultValue) {
  try {
    if (typeof GM_getValue === "function") {
      return GM_getValue(key, defaultValue);
    }
    var localValue = window.localStorage.getItem(key);
    return localValue === null ? defaultValue : localValue;
  } catch (error) {
    logError("Unable to read storage key \"".concat(key, "\"."), error);
    return defaultValue;
  }
}
function setStoredValue(key, value) {
  try {
    if (typeof GM_setValue === "function") {
      GM_setValue(key, value);
      return true;
    }
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    logError("Unable to persist storage key \"".concat(key, "\"."), error);
    return false;
  }
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
  var placeholder = currentApiKey ? "Existing API key is saved. Enter a new value to replace it." : "";
  var nextApiKey = window.prompt("Webhook API key. Leave empty to remove the saved key.", placeholder);
  if (nextApiKey === null) return;
  var apiKey = nextApiKey.trim();
  if (setStoredValue(API_KEY_STORAGE_KEY, apiKey)) {
    logInfo(apiKey ? "Webhook API key saved from menu." : "Webhook API key removed from menu.");
    window.alert(apiKey ? "Webhook API key saved." : "Webhook API key removed.");
  }
}
function showConfigFromMenu() {
  var endpoint = getConfiguredEndpoint() || "(not set)";
  var hasApiKey = getConfiguredApiKey() ? "yes" : "no";
  window.alert("Endpoint: ".concat(endpoint, "\nAPI key saved: ").concat(hasApiKey));
}
function registerMenuCommands() {
  if (typeof GM_registerMenuCommand !== "function") {
    logWarn("GM_registerMenuCommand is unavailable; configuration menu was not registered.");
    return;
  }
  GM_registerMenuCommand("Set webhook endpoint", setEndpointFromMenu);
  GM_registerMenuCommand("Set webhook API key", setApiKeyFromMenu);
  GM_registerMenuCommand("Show webhook configuration", showConfigFromMenu);
  logInfo("Registered Tampermonkey menu commands.");
}
function loadProcessedRecords() {
  var rawRecords = getStoredValue(STORAGE_KEY, "[]");
  var parsedRecords = typeof rawRecords === "string" ? safeJsonParse(rawRecords, []) : rawRecords;
  var records = Array.isArray(parsedRecords) ? parsedRecords : [];
  state.processedRecords = records.filter(function (record) {
    return record && typeof record.hash === "string" && Number.isFinite(record.processedAt);
  }).sort(function (leftRecord, rightRecord) {
    return leftRecord.processedAt - rightRecord.processedAt;
  }).slice(-CONFIG.maxStoredHashes);
  state.processedHashes = new Set(state.processedRecords.map(function (record) {
    return record.hash;
  }));
  saveProcessedRecords(state.processedRecords);
  logInfo("Loaded processed hash records, count:", state.processedRecords.length);
}
function saveProcessedRecords(records) {
  var limitedRecords = records.filter(function (record) {
    return record && typeof record.hash === "string" && Number.isFinite(record.processedAt);
  }).sort(function (leftRecord, rightRecord) {
    return leftRecord.processedAt - rightRecord.processedAt;
  }).slice(-CONFIG.maxStoredHashes);
  state.processedRecords = limitedRecords;
  state.processedHashes = new Set(limitedRecords.map(function (record) {
    return record.hash;
  }));
  logInfo("Saving processed hash records, count:", limitedRecords.length);
  return setStoredValue(STORAGE_KEY, JSON.stringify(limitedRecords));
}
function _clearProcessedRecords() {
  var isPersisted = saveProcessedRecords([]);
  logInfo("Cleared processed hash records.", {
    persisted: isPersisted
  });
  return getDebugStateSnapshot();
}
function hasProcessedHash(hash) {
  return state.processedHashes.has(hash);
}
function recordProcessedHash(hash) {
  if (hasProcessedHash(hash)) return true;
  logInfo("Recording processed message hash:", hash);
  return saveProcessedRecords([].concat(_toConsumableArray(state.processedRecords), [{
    hash: hash,
    processedAt: Date.now()
  }]));
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
function scheduleSafeRedirect() {
  clearSafeRedirectTimer();
  var redirectUrl = String(CONFIG.safeRedirectUrl || "").trim();
  if (!redirectUrl) {
    logInfo("Safe redirect is disabled because safeRedirectUrl is empty.");
    return;
  }
  state.safeRedirectTimerId = window.setTimeout(function () {
    state.safeRedirectTimerId = null;
    if (!state.running) return;
    logInfo("Safe redirect timer elapsed; redirecting:", redirectUrl);
    window.location.replace(redirectUrl);
  }, CONFIG.safeRedirectAfterMs);
  logInfo("Scheduled safe redirect.", {
    redirectUrl: redirectUrl,
    delayMs: CONFIG.safeRedirectAfterMs
  });
}
function extractMessageBody(contentElement) {
  var clone = contentElement.cloneNode(true);

  // logInfo("Extracted message body HTML - innerHTML", clone.innerHTML);

  clone.querySelectorAll("img.emoji[alt]").forEach(function (emojiElement) {
    var emojiText = emojiElement.getAttribute("alt") || "";
    emojiElement.replaceWith(document.createTextNode(emojiText));
  });
  clone.querySelectorAll(".message-signature, .message-views, .message-media-duration, .message-reaction, " +
  //  .message-time, [data-ignore-on-paste=\"true\"] .MessageMeta, , .Reactions
  ".icon-channelviews").forEach(function (metadataElement) {
    metadataElement.remove();
  });

  // logInfo("Extracted message body text - innerText", clone.innerText);
  // logInfo("Extracted message body text - textContent", clone.textContent);

  return (clone.innerText || clone.textContent || "").replace(/\u00a0/g, " ").trim();
}
function extractMessageTime(timeElement) {
  var messageTimeElement = timeElement;
  var titleTime = messageTimeElement && messageTimeElement.getAttribute("title") ? messageTimeElement.getAttribute("title").trim() : "";
  var visibleTime = messageTimeElement ? (messageTimeElement.innerText || messageTimeElement.textContent || "").trim() : "";
  var messageTime = titleTime || visibleTime;
  if (!messageTime) {
    logWarn("Skipping message without readable .message-time text.", timeElement);
  }
  return messageTime;
}
function extractMessageRecord(contentElement, timeElement) {
  var content = extractMessageBody(contentElement);
  var messageTime = extractMessageTime(timeElement);
  if (!content || !messageTime) {
    if (!content) logWarn("Skipping message without readable content.", contentElement);
    return null;
  }
  return {
    content: content,
    messageTime: messageTime
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
  _hashContent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(content) {
    var encodedContent, hashBuffer, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          encodedContent = new TextEncoder().encode(content);
          _context2.n = 1;
          return crypto.subtle.digest("SHA-256", encodedContent);
        case 1:
          hashBuffer = _context2.v;
          return _context2.a(2, Array.from(new Uint8Array(hashBuffer)).map(function (_byte) {
            return _byte.toString(16).padStart(2, "0");
          }).join(""));
        case 2:
          _context2.p = 2;
          _t = _context2.v;
          logError("Unable to hash message content.", _t);
          return _context2.a(2, "");
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return _hashContent.apply(this, arguments);
}
function formatApiContent(record) {
  // logInfo("Original message content:", record.content);
  var messageBody = CONFIG.filterApiMessageBody ? normalizeMessageContent(record.content) : record.content;
  return "".concat(record.messageTime, "\n").concat(messageBody);
}
function getConfiguredEndpoint() {
  var storedEndpoint = getStoredValue(ENDPOINT_STORAGE_KEY, "");
  return String(CONFIG.endpoint || storedEndpoint || "").trim();
}
function getConfiguredApiKey() {
  return String(getStoredValue(API_KEY_STORAGE_KEY, "") || "").trim();
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
  logInfo("Sending webhook message.", {
    endpoint: endpointLogLabel,
    contentLength: content.length,
    hasApiKey: Boolean(getConfiguredApiKey())
  });
  if (typeof GM_xmlhttpRequest === "function") {
    return new Promise(function (resolve, reject) {
      GM_xmlhttpRequest({
        method: "POST",
        url: endpoint,
        headers: getWebhookHeaders(),
        data: requestBody,
        timeout: 30000,
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
          logInfo("Webhook API accepted message, status:", response.status);
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
  return fetch(endpoint, {
    method: "POST",
    headers: getWebhookHeaders(),
    body: requestBody
  }).then(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(response) {
      var responseText, responseData;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return response.text();
          case 1:
            responseText = _context.v;
            responseData = parseResponseBody(responseText);
            if (response.ok) {
              _context.n = 2;
              break;
            }
            logWarn("Webhook API returned non-success status.", {
              endpoint: endpointLogLabel,
              status: response.status
            });
            throw new Error("Webhook API returned HTTP ".concat(response.status, ": ").concat(getResponseMessage(responseData, responseText)));
          case 2:
            logInfo("Webhook API accepted message, status:", response.status);
            return _context.a(2, responseData);
        }
      }, _callee);
    }));
    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }());
}
function getMessageContentEntries() {
  var containerElements = Array.from(document.querySelectorAll(CONFIG.messageContainerSelector));
  if (!containerElements.length) {
    logWarn("No Peace message containers matched selector.", CONFIG.messageContainerSelector);
    return [];
  }
  return containerElements.flatMap(function (containerElement) {
    var timeElements = Array.from(containerElement.querySelectorAll(CONFIG.messageTimeSelector));
    if (timeElements.length !== 1) {
      logWarn("Message container has no matched time elements.", timeElements);
      return [];
    }
    return [{
      contentElement: containerElement,
      timeElement: timeElements[0]
    }];
  });
}
function scrollMessageListToBottom() {
  var scrollElement = document.querySelector(CONFIG.messageListScrollSelector);
  if (!scrollElement) {
    logWarn("No Peace message list scroll element matched selector.", CONFIG.messageListScrollSelector);
    return;
  }
  scrollElement.scrollTop = scrollElement.scrollHeight;
  logInfo("Scrolled Peace message list to bottom, scrollHeight:", scrollElement.scrollHeight);
  // {
  //   scrollSelector: CONFIG.messageListScrollSelector,
  //   scrollTop: scrollElement.scrollTop,
  //   scrollHeight: scrollElement.scrollHeight,
  // }
}
function scanAndSendMessages() {
  return _scanAndSendMessages.apply(this, arguments);
}
function _scanAndSendMessages() {
  _scanAndSendMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var scanRunId, messageEntries, _iterator, _step, _step$value, contentElement, timeElement, record, normalizedContent, hash, apiContent, isPersisted, _t2, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (state.running) {
            _context3.n = 1;
            break;
          }
          logInfo("Scan skipped because monitoring is stopped.");
          return _context3.a(2);
        case 1:
          if (!state.scanning) {
            _context3.n = 2;
            break;
          }
          logInfo("Scan skipped because another scan is already running.");
          return _context3.a(2);
        case 2:
          scanRunId = state.runId;
          state.scanning = true;
          logInfo("Started scan, runId:", scanRunId);
          _context3.p = 3;
          messageEntries = getMessageContentEntries();
          logInfo("Scanning Peace message candidates, count:", messageEntries.length);
          // {
          //   count: messageEntries.length,
          //   containerSelector: CONFIG.messageContainerSelector,
          //   timeSelector: CONFIG.messageTimeSelector,
          //   messageEntries,
          // }
          _iterator = _createForOfIteratorHelper(messageEntries);
          _context3.p = 4;
          _iterator.s();
        case 5:
          if ((_step = _iterator.n()).done) {
            _context3.n = 18;
            break;
          }
          _step$value = _step.value, contentElement = _step$value.contentElement, timeElement = _step$value.timeElement;
          if (!(!state.running || state.runId !== scanRunId)) {
            _context3.n = 6;
            break;
          }
          logInfo("Stopping scan because monitoring state changed.", {
            runId: scanRunId,
            currentRunId: state.runId
          });
          return _context3.a(3, 18);
        case 6:
          record = extractMessageRecord(contentElement, timeElement);
          if (record) {
            _context3.n = 7;
            break;
          }
          return _context3.a(3, 17);
        case 7:
          normalizedContent = normalizeMessageContent(record.content);
          if (normalizedContent) {
            _context3.n = 8;
            break;
          }
          logWarn("Skipping message with empty normalized content.", contentElement);
          return _context3.a(3, 17);
        case 8:
          _context3.n = 9;
          return hashContent(normalizedContent);
        case 9:
          hash = _context3.v;
          if (!(!state.running || state.runId !== scanRunId)) {
            _context3.n = 10;
            break;
          }
          logInfo("Stopping scan after hash because monitoring state changed.", {
            runId: scanRunId,
            currentRunId: state.runId
          });
          return _context3.a(3, 18);
        case 10:
          if (hash) {
            _context3.n = 11;
            break;
          }
          return _context3.a(3, 17);
        case 11:
          if (!hasProcessedHash(hash)) {
            _context3.n = 12;
            break;
          }
          return _context3.a(3, 17);
        case 12:
          apiContent = formatApiContent(record);
          _context3.p = 13;
          _context3.n = 14;
          return sendWebhookMessage(apiContent);
        case 14:
          _context3.n = 16;
          break;
        case 15:
          _context3.p = 15;
          _t2 = _context3.v;
          logError("Failed to deliver Peace message; it will be retried later.", _t2);
          return _context3.a(3, 17);
        case 16:
          isPersisted = recordProcessedHash(hash);
          logInfo("Delivered new Peace message:", hash);
          if (!isPersisted) {
            logError("Message was delivered, but its hash could not be persisted.", {
              hash: hash
            });
          }
          if (!(!state.running || state.runId !== scanRunId)) {
            _context3.n = 17;
            break;
          }
          return _context3.a(3, 18);
        case 17:
          _context3.n = 5;
          break;
        case 18:
          _context3.n = 20;
          break;
        case 19:
          _context3.p = 19;
          _t3 = _context3.v;
          _iterator.e(_t3);
        case 20:
          _context3.p = 20;
          _iterator.f();
          return _context3.f(20);
        case 21:
          _context3.p = 21;
          state.scanning = false;
          logInfo("Finished scan, runId:", scanRunId);
          if (state.running && state.runId !== scanRunId) {
            logInfo("Scheduling follow-up scan for newer run.", {
              runId: state.runId
            });
            window.setTimeout(scanAndSendMessages, 0);
          }
          scrollMessageListToBottom();
          return _context3.f(21);
        case 22:
          return _context3.a(2);
      }
    }, _callee3, null, [[13, 15], [4, 19, 20, 21], [3,, 21, 22]]);
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
  logInfo("Installing Peace webhook monitor.");
  loadProcessedRecords();
  syncDebugHelpers();
  registerMenuCommands();
  createControls();
  updateControls();
  logInfo("Installed Peace webhook monitor.");
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