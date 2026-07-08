// ==UserScript==
// @name         Telegram Webhook Monitor
// @namespace    https://github.com/chengchuu/webpack-build-demo
// @version      0.1.0
// @description  Scan Telegram Web messages and send new readable messages to a webhook relay.
// @match        https://web.telegram.org/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      i.mazey.net
// ==/UserScript==
/******/ (() => { // webpackBootstrap
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
// ==UserScript==
// @name         Telegram Webhook Monitor
// @namespace    https://github.com/chengchuu/webpack-build-demo
// @version      0.1.0
// @description  Scan Telegram Web messages and send new readable messages to a webhook relay.
// @match        https://web.telegram.org/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      i.mazey.net
// ==/UserScript==

/* global GM_getValue, GM_setValue, GM_xmlhttpRequest */

var CONFIG = {
  endpoint: "",
  messageContentSelector: "div.message-date-group > div.message-date-group div.content-inner",
  compatibilityMessageContentSelector: "div.message-date-group div.content-inner",
  messageTimeSelector: ".message-time",
  intervalMs: 60 * 1000,
  maxStoredHashes: 5000
};
var STORAGE_KEY = "telegram-webhook-processed-hashes-v1";
var ENDPOINT_STORAGE_KEY = "telegram-webhook-endpoint";
var INSTALL_FLAG = "__TELEGRAM_WEBHOOK_SCRIPT_INSTALLED__";
var CONTROL_CONTAINER_ID = "telegram-webhook-controls";
var MASK_ID = "telegram-webhook-mask";
var TITLE_PREFIX = "[Telegram Webhook Running]";
var EMOJI_SEQUENCE_REGEXP = createEmojiSequenceRegExp();
var state = {
  running: false,
  scanning: false,
  runId: 0,
  timerId: null,
  originalTitle: document.title,
  processedRecords: [],
  processedHashes: new Set(),
  controls: null,
  startButton: null,
  stopButton: null
};
function logInfo() {
  var _console;
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  (_console = console).log.apply(_console, ["[Telegram Webhook]"].concat(args));
}
function logWarn() {
  var _console2;
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  (_console2 = console).warn.apply(_console2, ["[Telegram Webhook]"].concat(args));
}
function logError() {
  var _console3;
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }
  (_console3 = console).error.apply(_console3, ["[Telegram Webhook]"].concat(args));
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
  if (typeof GM_getValue === "function") {
    return GM_getValue(key, defaultValue);
  }
  var localValue = window.localStorage.getItem(key);
  return localValue === null ? defaultValue : localValue;
}
function setStoredValue(key, value) {
  if (typeof GM_setValue === "function") {
    GM_setValue(key, value);
    return;
  }
  window.localStorage.setItem(key, value);
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
  setStoredValue(STORAGE_KEY, JSON.stringify(limitedRecords));
}
function hasProcessedHash(hash) {
  return state.processedHashes.has(hash);
}
function recordProcessedHash(hash) {
  if (hasProcessedHash(hash)) return;
  saveProcessedRecords([].concat(_toConsumableArray(state.processedRecords), [{
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
    button.style.opacity = button === state.stopButton && state.running ? "0.2" : "0.05";
  });
  button.addEventListener("focus", function () {
    button.style.opacity = "1";
  });
  button.addEventListener("blur", function () {
    button.style.opacity = button === state.stopButton && state.running ? "0.2" : "0.05";
  });
  return button;
}
function createControls() {
  var existingControls = document.getElementById(CONTROL_CONTAINER_ID);
  if (existingControls) {
    state.controls = existingControls;
    state.startButton = existingControls.querySelector("[data-telegram-webhook-start]");
    state.stopButton = existingControls.querySelector("[data-telegram-webhook-stop]");
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
  startButton.dataset.telegramWebhookStart = "true";
  startButton.addEventListener("click", startMonitoring);
  var stopButton = createButton("Stop");
  stopButton.dataset.telegramWebhookStop = "true";
  stopButton.style.display = "none";
  stopButton.addEventListener("click", stopMonitoring);
  controls.append(startButton, stopButton);
  document.body.appendChild(controls);
  state.controls = controls;
  state.startButton = startButton;
  state.stopButton = stopButton;
}
function updateControls() {
  if (!state.startButton || !state.stopButton) return;
  state.startButton.style.display = state.running ? "none" : "inline-flex";
  state.startButton.disabled = state.running;
  state.stopButton.style.display = state.running ? "inline-flex" : "none";
  state.stopButton.disabled = !state.running;
  state.stopButton.style.opacity = state.running ? "0.2" : "0.05";
}
function createMask() {
  if (document.getElementById(MASK_ID)) return;
  var mask = document.createElement("div");
  mask.id = MASK_ID;
  mask.style.position = "fixed";
  mask.style.inset = "0";
  mask.style.zIndex = "2147483646";
  mask.style.display = "flex";
  mask.style.alignItems = "center";
  mask.style.justifyContent = "center";
  mask.style.background = "rgba(5, 9, 14, 0.18)";
  mask.style.backdropFilter = "blur(1px)";
  mask.style.pointerEvents = "auto";
  mask.style.color = "rgba(255, 255, 255, 0.82)";
  mask.style.font = "14px Arial, sans-serif";
  mask.textContent = "Telegram webhook monitor running";
  document.body.appendChild(mask);
}
function removeMask() {
  var mask = document.getElementById(MASK_ID);
  if (mask) mask.remove();
}
function extractMessageBody(contentElement) {
  var clone = contentElement.cloneNode(true);
  clone.querySelectorAll("img.emoji[alt]").forEach(function (emojiElement) {
    var emojiText = emojiElement.getAttribute("alt") || "";
    emojiElement.replaceWith(document.createTextNode(emojiText));
  });
  clone.querySelectorAll(".MessageMeta, .message-time, .message-views, .message-media-duration, " + "[data-ignore-on-paste=\"true\"], .icon-channelviews").forEach(function (metadataElement) {
    metadataElement.remove();
  });
  return (clone.innerText || clone.textContent || "").replace(/\u00a0/g, " ").trim();
}
function extractMessageTime(contentElement) {
  var messageRoot = contentElement.closest(".Message.message-list-item");
  var messageTimeElement = contentElement.querySelector(CONFIG.messageTimeSelector) || messageRoot && messageRoot.querySelector(CONFIG.messageTimeSelector);
  var messageTime = messageTimeElement && messageTimeElement.getAttribute("title") ? messageTimeElement.getAttribute("title").trim() : "";
  if (!messageTime) {
    logWarn("Skipping message without a full .message-time title timestamp.", contentElement);
  }
  return messageTime;
}
function extractMessageRecord(contentElement) {
  var content = extractMessageBody(contentElement);
  var messageTime = extractMessageTime(contentElement);
  if (!content || !messageTime) {
    if (!content) logWarn("Skipping message without readable content.", contentElement);
    return null;
  }
  return {
    content: content,
    messageTime: messageTime
  };
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
  normalizedContent = normalizedContent.replace(/\s+/g, "");
  normalizedContent = normalizedContent.replace(/(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFE2\uDFE3\uDFF0-\uDFF6]|[\uD840-\uD868\uD86A-\uD86D\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD88C][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEAD\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD88D[\uDC00-\uDC79])+/g, "#");
  normalizedContent = normalizedContent.replace(EMOJI_SEQUENCE_REGEXP, "#");
  normalizedContent = normalizedContent.replace(/#+/g, "#");
  return normalizedContent.trim();
}
function hashContent(_x) {
  return _hashContent.apply(this, arguments);
}
function _hashContent() {
  _hashContent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(content) {
    var encodedContent, hashBuffer, _t2;
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
          _t2 = _context2.v;
          logError("Unable to hash message content.", _t2);
          return _context2.a(2, "");
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return _hashContent.apply(this, arguments);
}
function formatApiContent(record) {
  return "".concat(record.messageTime, "\n\n").concat(record.content);
}
function getConfiguredEndpoint() {
  var storedEndpoint = getStoredValue(ENDPOINT_STORAGE_KEY, "");
  return String(CONFIG.endpoint || storedEndpoint || "").trim();
}
function sendWebhookMessage(content) {
  var endpoint = getConfiguredEndpoint();
  if (!endpoint) {
    return Promise.reject(new Error("CONFIG.endpoint is empty; configure a trusted webhook relay before starting."));
  }
  var requestBody = JSON.stringify({
    content: content
  });
  if (typeof GM_xmlhttpRequest === "function") {
    return new Promise(function (resolve, reject) {
      GM_xmlhttpRequest({
        method: "POST",
        url: endpoint,
        headers: {
          "Content-Type": "application/json"
        },
        data: requestBody,
        timeout: 30000,
        onload: function onload(response) {
          var responseText = response.responseText || "";
          var responseData = null;
          if (responseText) {
            try {
              responseData = JSON.parse(responseText);
            } catch (error) {
              reject(new Error("Invalid JSON response from webhook API: ".concat(error.message)));
              return;
            }
          }
          if (response.status < 200 || response.status >= 300) {
            reject(new Error("Webhook API returned HTTP ".concat(response.status, ": ").concat(responseData && responseData.message || responseText)));
            return;
          }
          resolve(responseData);
        },
        onerror: function onerror() {
          reject(new Error("Network error while sending webhook message."));
        },
        ontimeout: function ontimeout() {
          reject(new Error("Webhook API request timed out."));
        }
      });
    });
  }
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: requestBody
  }).then(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(response) {
      var responseText, responseData, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.n = 1;
            return response.text();
          case 1:
            responseText = _context.v;
            responseData = null;
            if (!responseText) {
              _context.n = 4;
              break;
            }
            _context.p = 2;
            responseData = JSON.parse(responseText);
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            throw new Error("Invalid JSON response from webhook API: ".concat(_t.message));
          case 4:
            if (response.ok) {
              _context.n = 5;
              break;
            }
            throw new Error("Webhook API returned HTTP ".concat(response.status, ": ").concat(responseData && responseData.message || responseText));
          case 5:
            return _context.a(2, responseData);
        }
      }, _callee, null, [[2, 3]]);
    }));
    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }());
}
function getMessageContentElements() {
  var contentElements = Array.from(document.querySelectorAll(CONFIG.messageContentSelector));
  if (contentElements.length > 0) return contentElements;
  var compatibilityElements = Array.from(document.querySelectorAll(CONFIG.compatibilityMessageContentSelector));
  if (compatibilityElements.length > 0) {
    logWarn("Required Telegram selector matched no messages; using date-group compatibility fallback.", CONFIG.messageContentSelector);
  }
  return compatibilityElements;
}
function scanAndSendMessages() {
  return _scanAndSendMessages.apply(this, arguments);
}
function _scanAndSendMessages() {
  _scanAndSendMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var scanRunId, contentElements, _iterator, _step, contentElement, record, normalizedContent, hash, apiContent, _t3, _t4;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (!(!state.running || state.scanning)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2);
        case 1:
          scanRunId = state.runId;
          state.scanning = true;
          _context3.p = 2;
          contentElements = getMessageContentElements();
          logInfo("Scanning ".concat(contentElements.length, " Telegram message candidates."));
          _iterator = _createForOfIteratorHelper(contentElements);
          _context3.p = 3;
          _iterator.s();
        case 4:
          if ((_step = _iterator.n()).done) {
            _context3.n = 15;
            break;
          }
          contentElement = _step.value;
          if (!(!state.running || state.runId !== scanRunId)) {
            _context3.n = 5;
            break;
          }
          return _context3.a(3, 15);
        case 5:
          record = extractMessageRecord(contentElement);
          if (record) {
            _context3.n = 6;
            break;
          }
          return _context3.a(3, 14);
        case 6:
          normalizedContent = normalizeMessageContent(record.content);
          _context3.n = 7;
          return hashContent(normalizedContent);
        case 7:
          hash = _context3.v;
          if (!(!state.running || state.runId !== scanRunId)) {
            _context3.n = 8;
            break;
          }
          return _context3.a(3, 15);
        case 8:
          if (!(!hash || hasProcessedHash(hash))) {
            _context3.n = 9;
            break;
          }
          return _context3.a(3, 14);
        case 9:
          apiContent = formatApiContent(record);
          _context3.p = 10;
          _context3.n = 11;
          return sendWebhookMessage(apiContent);
        case 11:
          if (!(!state.running || state.runId !== scanRunId)) {
            _context3.n = 12;
            break;
          }
          return _context3.a(3, 15);
        case 12:
          recordProcessedHash(hash);
          logInfo("Delivered new Telegram message.", {
            messageTime: record.messageTime,
            hash: hash
          });
          _context3.n = 14;
          break;
        case 13:
          _context3.p = 13;
          _t3 = _context3.v;
          logError("Failed to deliver Telegram message; it will be retried later.", _t3);
        case 14:
          _context3.n = 4;
          break;
        case 15:
          _context3.n = 17;
          break;
        case 16:
          _context3.p = 16;
          _t4 = _context3.v;
          _iterator.e(_t4);
        case 17:
          _context3.p = 17;
          _iterator.f();
          return _context3.f(17);
        case 18:
          _context3.p = 18;
          state.scanning = false;
          if (state.running && state.runId !== scanRunId) {
            window.setTimeout(scanAndSendMessages, 0);
          }
          return _context3.f(18);
        case 19:
          return _context3.a(2);
      }
    }, _callee3, null, [[10, 13], [3, 16, 17, 18], [2,, 18, 19]]);
  }));
  return _scanAndSendMessages.apply(this, arguments);
}
function startMonitoring() {
  if (state.running) return;
  state.originalTitle = document.title;
  state.running = true;
  state.runId += 1;
  document.title = "".concat(TITLE_PREFIX, " ").concat(state.originalTitle);
  createMask();
  updateControls();
  scanAndSendMessages();
  if (!state.timerId) {
    state.timerId = window.setInterval(scanAndSendMessages, CONFIG.intervalMs);
  }
}
function stopMonitoring() {
  if (state.running || state.scanning) {
    state.runId += 1;
  }
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
  if (!state.running) {
    updateControls();
    return;
  }
  state.running = false;
  removeMask();
  document.title = state.originalTitle;
  updateControls();
}
function install() {
  if (window[INSTALL_FLAG]) {
    logWarn("Script is already installed; skipping duplicate installation.");
    return;
  }
  window[INSTALL_FLAG] = true;
  loadProcessedRecords();
  createControls();
  updateControls();
  logInfo("Installed Telegram webhook monitor.");
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