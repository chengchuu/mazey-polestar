// ==UserScript==
// @name         Telegram Webhook Monitor
// @namespace    https://github.com/chengchuu/webpack-build-demo
// @version      0.1.0
// @description  Scan Telegram Web messages and send new readable messages to a webhook relay.
// @match        https://web.telegram.org/*
// @updateURL    https://raw.githubusercontent.com/chengchuu/webpack-build-demo/main/lib/webhook.user.js
// @downloadURL  https://raw.githubusercontent.com/chengchuu/webpack-build-demo/main/lib/webhook.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @connect      *
// ==/UserScript==

/* global GM_getValue, GM_setValue, GM_xmlhttpRequest, GM_registerMenuCommand */

import { genCustomConsole } from "mazey";

const WebhookCon = genCustomConsole("[Webhook]");

const CONFIG = {
  endpoint: "",
  messageContentSelector: "div.messages-container > div.message-date-group div.content-inner",
  messageTimeSelector: ".message-time",
  intervalMs: 60 * 1000,
  maxStoredHashes: 5000,
};

const STORAGE_KEY = "telegram-webhook-processed-hashes-v1";
const ENDPOINT_STORAGE_KEY = "telegram-webhook-endpoint";
const API_KEY_STORAGE_KEY = "telegram-webhook-api-key";
const INSTALL_FLAG = "__TELEGRAM_WEBHOOK_SCRIPT_INSTALLED__";
const CONTROL_CONTAINER_ID = "telegram-webhook-controls";
const MASK_ID = "telegram-webhook-mask";
const TITLE_PREFIX = "[Telegram Webhook Running]";
const HAN_REGEXP = createHanRegExp();
const EMOJI_SEQUENCE_REGEXP = createEmojiSequenceRegExp();

const state = {
  running: false,
  scanning: false,
  runId: 0,
  timerId: null,
  originalTitle: document.title,
  processedRecords: [],
  processedHashes: new Set(),
  controls: null,
  startButton: null,
  stopButton: null,
};

function logInfo (...args) {
  WebhookCon.log(...args);
}

function logWarn (...args) {
  WebhookCon.warn(...args);
}

function logError (...args) {
  WebhookCon.error(...args);
}

function safeJsonParse (value, fallback) {
  try {
    return JSON.parse(value);
  } catch (error) {
    logWarn("Stored hash data is malformed; using an empty history.", error);
    return fallback;
  }
}

function getStoredValue (key, defaultValue) {
  try {
    if (typeof GM_getValue === "function") {
      return GM_getValue(key, defaultValue);
    }

    const localValue = window.localStorage.getItem(key);
    return localValue === null ? defaultValue : localValue;
  } catch (error) {
    logError(`Unable to read storage key "${key}".`, error);
    return defaultValue;
  }
}

function setStoredValue (key, value) {
  try {
    if (typeof GM_setValue === "function") {
      GM_setValue(key, value);
      return true;
    }

    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    logError(`Unable to persist storage key "${key}".`, error);
    return false;
  }
}

function setEndpointFromMenu () {
  const currentEndpoint = getConfiguredEndpoint();
  const nextEndpoint = window.prompt(
    "Webhook endpoint URL, for example https://example.com/api/gee/webhook-message",
    currentEndpoint,
  );

  if (nextEndpoint === null) return;

  const endpoint = nextEndpoint.trim();
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
    window.alert("Webhook endpoint saved.");
  }
}

function setApiKeyFromMenu () {
  const currentApiKey = getConfiguredApiKey();
  const placeholder = currentApiKey ? "Existing API key is saved. Enter a new value to replace it." : "";
  const nextApiKey = window.prompt("Webhook API key. Leave empty to remove the saved key.", placeholder);

  if (nextApiKey === null) return;

  const apiKey = nextApiKey.trim();
  if (setStoredValue(API_KEY_STORAGE_KEY, apiKey)) {
    window.alert(apiKey ? "Webhook API key saved." : "Webhook API key removed.");
  }
}

function showConfigFromMenu () {
  const endpoint = getConfiguredEndpoint() || "(not set)";
  const hasApiKey = getConfiguredApiKey() ? "yes" : "no";

  window.alert(`Endpoint: ${endpoint}\nAPI key saved: ${hasApiKey}`);
}

function registerMenuCommands () {
  if (typeof GM_registerMenuCommand !== "function") return;

  GM_registerMenuCommand("Set webhook endpoint", setEndpointFromMenu);
  GM_registerMenuCommand("Set webhook API key", setApiKeyFromMenu);
  GM_registerMenuCommand("Show webhook configuration", showConfigFromMenu);
}

function loadProcessedRecords () {
  const rawRecords = getStoredValue(STORAGE_KEY, "[]");
  const parsedRecords = typeof rawRecords === "string" ? safeJsonParse(rawRecords, []) : rawRecords;
  const records = Array.isArray(parsedRecords) ? parsedRecords : [];

  state.processedRecords = records
    .filter(record => record && typeof record.hash === "string" && Number.isFinite(record.processedAt))
    .sort((leftRecord, rightRecord) => leftRecord.processedAt - rightRecord.processedAt)
    .slice(-CONFIG.maxStoredHashes);
  state.processedHashes = new Set(state.processedRecords.map(record => record.hash));

  saveProcessedRecords(state.processedRecords);
}

function saveProcessedRecords (records) {
  const limitedRecords = records
    .filter(record => record && typeof record.hash === "string" && Number.isFinite(record.processedAt))
    .sort((leftRecord, rightRecord) => leftRecord.processedAt - rightRecord.processedAt)
    .slice(-CONFIG.maxStoredHashes);

  state.processedRecords = limitedRecords;
  state.processedHashes = new Set(limitedRecords.map(record => record.hash));
  return setStoredValue(STORAGE_KEY, JSON.stringify(limitedRecords));
}

function hasProcessedHash (hash) {
  return state.processedHashes.has(hash);
}

function recordProcessedHash (hash) {
  if (hasProcessedHash(hash)) return true;

  return saveProcessedRecords([
    ...state.processedRecords,
    {
      hash,
      processedAt: Date.now(),
    },
  ]);
}

function createButton (text) {
  const button = document.createElement("button");
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

  button.addEventListener("mouseenter", () => {
    button.style.opacity = "1";
  });
  button.addEventListener("mouseleave", () => {
    button.style.opacity = button === state.stopButton && state.running ? "0.2" : "0.05";
  });
  button.addEventListener("focus", () => {
    button.style.opacity = "1";
  });
  button.addEventListener("blur", () => {
    button.style.opacity = button === state.stopButton && state.running ? "0.2" : "0.05";
  });

  return button;
}

function createControls () {
  const existingControls = document.getElementById(CONTROL_CONTAINER_ID);
  if (existingControls) {
    state.controls = existingControls;
    state.startButton = existingControls.querySelector("[data-telegram-webhook-start]");
    state.stopButton = existingControls.querySelector("[data-telegram-webhook-stop]");
    return;
  }

  const controls = document.createElement("div");
  controls.id = CONTROL_CONTAINER_ID;
  controls.style.position = "fixed";
  controls.style.right = "16px";
  controls.style.bottom = "16px";
  controls.style.zIndex = "2147483647";
  controls.style.display = "flex";
  controls.style.gap = "8px";

  const startButton = createButton("Start");
  startButton.dataset.telegramWebhookStart = "true";
  startButton.addEventListener("click", startMonitoring);

  const stopButton = createButton("Stop");
  stopButton.dataset.telegramWebhookStop = "true";
  stopButton.style.display = "none";
  stopButton.addEventListener("click", stopMonitoring);

  controls.append(startButton, stopButton);
  document.body.appendChild(controls);

  state.controls = controls;
  state.startButton = startButton;
  state.stopButton = stopButton;
}

function updateControls () {
  if (!state.startButton || !state.stopButton) return;

  state.startButton.style.display = state.running ? "none" : "inline-flex";
  state.startButton.disabled = state.running;
  state.stopButton.style.display = state.running ? "inline-flex" : "none";
  state.stopButton.disabled = !state.running;
  state.stopButton.style.opacity = state.running ? "0.2" : "0.05";
}

function createMask () {
  if (document.getElementById(MASK_ID)) return;

  const mask = document.createElement("div");
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

function removeMask () {
  const mask = document.getElementById(MASK_ID);
  if (mask) mask.remove();
}

function extractMessageBody (contentElement) {
  const clone = contentElement.cloneNode(true);

  clone.querySelectorAll("img.emoji[alt]").forEach((emojiElement) => {
    const emojiText = emojiElement.getAttribute("alt") || "";
    emojiElement.replaceWith(document.createTextNode(emojiText));
  });

  clone.querySelectorAll(
    ".MessageMeta, .message-time, .message-views, .message-media-duration, " +
    "[data-ignore-on-paste=\"true\"], .icon-channelviews",
  ).forEach((metadataElement) => {
    metadataElement.remove();
  });

  return (clone.innerText || clone.textContent || "")
    .replace(/\u00a0/g, " ")
    .trim();
}

function extractMessageTime (contentElement) {
  const messageRoot = contentElement.closest(".Message.message-list-item");
  const messageTimeElement =
    contentElement.querySelector(CONFIG.messageTimeSelector) ||
    (messageRoot && messageRoot.querySelector(CONFIG.messageTimeSelector));
  const messageTime = messageTimeElement && messageTimeElement.getAttribute("title")
    ? messageTimeElement.getAttribute("title").trim()
    : "";

  if (!messageTime) {
    logWarn("Skipping message without a full .message-time title timestamp.", contentElement);
  }

  return messageTime;
}

function extractMessageRecord (contentElement) {
  const content = extractMessageBody(contentElement);
  const messageTime = extractMessageTime(contentElement);

  if (!content || !messageTime) {
    if (!content) logWarn("Skipping message without readable content.", contentElement);
    return null;
  }

  return {
    content,
    messageTime,
  };
}

function createHanRegExp () {
  try {
    // eslint-disable-next-line prefer-regex-literals
    return new RegExp("\\p{Script=Han}+", "gu");
  } catch (error) {
    logWarn("Unicode Han matching is not fully supported; using fallback ranges.", error);
    return /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]+/g;
  }
}

function createEmojiSequenceRegExp () {
  try {
    return new RegExp(
      "(?:[\\p{Emoji_Presentation}\\p{Extended_Pictographic}\\u{1F1E6}-\\u{1F1FF}]" +
      "(?:\\uFE0F|\\p{Emoji_Modifier})?" +
      "(?:\\u200d[\\p{Emoji_Presentation}\\p{Extended_Pictographic}]" +
      "(?:\\uFE0F|\\p{Emoji_Modifier})?)*)+",
      "gu",
    );
  } catch (error) {
    logWarn("Unicode emoji matching is not fully supported; using fallback emoji ranges.", error);
    return /(?:[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF])+/g;
  }
}

function normalizeMessageContent (content) {
  let normalizedContent = String(content || "").normalize("NFKC");

  normalizedContent = normalizedContent.replace(/\s+/g, "");
  normalizedContent = normalizedContent.replace(HAN_REGEXP, "#");
  normalizedContent = normalizedContent.replace(EMOJI_SEQUENCE_REGEXP, "#");
  normalizedContent = normalizedContent.replace(/#+/g, "#");

  return normalizedContent.trim();
}

async function hashContent (content) {
  try {
    const encodedContent = new TextEncoder().encode(content);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedContent);

    return Array.from(new Uint8Array(hashBuffer))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  } catch (error) {
    logError("Unable to hash message content.", error);
    return "";
  }
}

function formatApiContent (record) {
  return `${record.messageTime}\n\n${record.content}`;
}

function getConfiguredEndpoint () {
  const storedEndpoint = getStoredValue(ENDPOINT_STORAGE_KEY, "");
  return String(CONFIG.endpoint || storedEndpoint || "").trim();
}

function getConfiguredApiKey () {
  return String(getStoredValue(API_KEY_STORAGE_KEY, "") || "").trim();
}

function parseResponseBody (responseText) {
  if (!responseText) return null;

  try {
    return JSON.parse(responseText);
  } catch (error) {
    return responseText;
  }
}

function getWebhookHeaders () {
  const headers = {
    "Content-Type": "application/json",
  };
  const apiKey = getConfiguredApiKey();

  if (apiKey) {
    headers["X-Webhook-API-Key"] = apiKey;
  }

  return headers;
}

function getResponseMessage (responseData, responseText) {
  if (responseData && typeof responseData === "object" && responseData.message) {
    return responseData.message;
  }

  return responseText;
}

function sendWebhookMessage (content) {
  const endpoint = getConfiguredEndpoint();

  if (!endpoint) {
    return Promise.reject(new Error("CONFIG.endpoint is empty; configure a trusted webhook relay before starting."));
  }

  const requestBody = JSON.stringify({ content });

  if (typeof GM_xmlhttpRequest === "function") {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "POST",
        url: endpoint,
        headers: getWebhookHeaders(),
        data: requestBody,
        timeout: 30000,
        onload: (response) => {
          const responseText = response.responseText || "";
          const responseData = parseResponseBody(responseText);

          if (response.status < 200 || response.status >= 300) {
            reject(new Error(
              `Webhook API returned HTTP ${response.status}: ${getResponseMessage(responseData, responseText)}`,
            ));
            return;
          }

          resolve(responseData);
        },
        onerror: () => {
          reject(new Error("Network error while sending webhook message."));
        },
        ontimeout: () => {
          reject(new Error("Webhook API request timed out."));
        },
      });
    });
  }

  return fetch(endpoint, {
    method: "POST",
    headers: getWebhookHeaders(),
    body: requestBody,
  }).then(async response => {
    const responseText = await response.text();
    const responseData = parseResponseBody(responseText);

    if (!response.ok) {
      throw new Error(
        `Webhook API returned HTTP ${response.status}: ${getResponseMessage(responseData, responseText)}`,
      );
    }

    return responseData;
  });
}

function getMessageContentElements () {
  return Array.from(document.querySelectorAll(CONFIG.messageContentSelector));
}

async function scanAndSendMessages () {
  if (!state.running || state.scanning) return;

  const scanRunId = state.runId;
  state.scanning = true;

  try {
    const contentElements = getMessageContentElements();
    logInfo(`Scanning ${contentElements.length} Telegram message candidates.`);

    for (const contentElement of contentElements) {
      if (!state.running || state.runId !== scanRunId) break;

      const record = extractMessageRecord(contentElement);
      if (!record) continue;

      const normalizedContent = normalizeMessageContent(record.content);
      if (!normalizedContent) {
        logWarn("Skipping message with empty normalized content.", contentElement);
        continue;
      }

      const hash = await hashContent(normalizedContent);
      if (!state.running || state.runId !== scanRunId) break;
      if (!hash || hasProcessedHash(hash)) continue;

      const apiContent = formatApiContent(record);

      try {
        await sendWebhookMessage(apiContent);
      } catch (error) {
        logError("Failed to deliver Telegram message; it will be retried later.", error);
        continue;
      }

      const isPersisted = recordProcessedHash(hash);
      logInfo("Delivered new Telegram message.", { messageTime: record.messageTime, hash });

      if (!isPersisted) {
        logError("Message was delivered, but its hash could not be persisted.", { hash });
      }

      if (!state.running || state.runId !== scanRunId) break;
    }
  } finally {
    state.scanning = false;
    if (state.running && state.runId !== scanRunId) {
      window.setTimeout(scanAndSendMessages, 0);
    }
  }
}

function startMonitoring () {
  if (state.running) return;

  state.originalTitle = document.title;
  state.running = true;
  state.runId += 1;
  document.title = `${TITLE_PREFIX} ${state.originalTitle}`;

  createMask();
  updateControls();
  scanAndSendMessages();

  if (!state.timerId) {
    state.timerId = window.setInterval(scanAndSendMessages, CONFIG.intervalMs);
  }
}

function stopMonitoring () {
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

function install () {
  if (window[INSTALL_FLAG]) {
    logWarn("Script is already installed; skipping duplicate installation.");
    return;
  }

  window[INSTALL_FLAG] = true;
  loadProcessedRecords();
  registerMenuCommands();
  createControls();
  updateControls();
  logInfo("Installed Telegram webhook monitor.");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", install, { once: true });
} else {
  install();
}
