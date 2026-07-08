const userscriptHeaders = {
  webhook: `// ==UserScript==
// @name         Telegram Webhook Monitor
// @namespace    https://github.com/chengchuu/webpack-build-demo
// @version      0.8.0
// @description  Scan Telegram Web messages and send new readable messages to a webhook relay.
// @match        https://web.telegram.org/*
// @updateURL    https://raw.githubusercontent.com/chengchuu/webpack-build-demo/preview/lib/webhook.user.js
// @downloadURL  https://raw.githubusercontent.com/chengchuu/webpack-build-demo/preview/lib/webhook.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// @connect      *
// ==/UserScript==`,
};

module.exports = {
  userscriptHeaders,
};
