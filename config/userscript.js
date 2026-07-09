function padTwoDigits (value) {
  return String(value).padStart(2, "0");
}

function createUserscriptVersion (date = new Date()) {
  const year = padTwoDigits(date.getFullYear() % 100);
  const monthDay = `${date.getMonth() + 1}${padTwoDigits(date.getDate())}`;
  const hourMinute = `${date.getHours()}${padTwoDigits(date.getMinutes())}`;

  return `${year}.${monthDay}.${hourMinute}`;
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
