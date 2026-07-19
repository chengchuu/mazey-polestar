const { generateCalendarVersion } = require("mazey");

const userscriptVersion = generateCalendarVersion();

const userscriptHeaders = {
  webhook: `// ==UserScript==
// @name         Peace Multi-Site Webhook Monitor
// @namespace    https://github.com/chengchuu/webpack-build-demo
// @version      ${userscriptVersion}
// @description  Scan configured website messages and send new readable content to a webhook relay.
// @icon         https://i.mazey.net/icon/fav/logo-dark-circle-32x32.png
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
