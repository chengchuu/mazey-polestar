const { formatDate } = require("mazey");

function createUserscriptVersion (date = new Date()) {
  const [year, monthDay, hourMinute] = formatDate(date, "yyyy.MMdd.HHmm").split(".");

  return [
    year.slice(2),
    monthDay.replace(/^0/, ""),
    hourMinute.replace(/^0/, ""),
  ].join(".");
}

const userscriptVersion = createUserscriptVersion();

const userscriptHeaders = {
  webhook: `// ==UserScript==
// @name         Peace Webhook Monitor
// @namespace    https://github.com/chengchuu/webpack-build-demo
// @version      ${userscriptVersion}
// @description  Scan messages and send new readable messages to a webhook relay.
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
  createUserscriptVersion,
  userscriptHeaders,
};
