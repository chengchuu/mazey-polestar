/* global GM_getValue, GM_setValue, GM_xmlhttpRequest, GM_registerMenuCommand */
/* eslint max-lines: off */

import { genCustomConsole } from "mazey";

const WebhookCon = genCustomConsole("[Webhook]");

const CONFIG = {
  endpoint: "",
  messageContainerSelector: "div.messages-container > div.message-date-group",
  messageContentSelector: "div.content-inner",
  messageTimeSelector: "span.message-time",
  intervalMs: 60 * 1000,
  titleCheckMinIntervalMs: 10 * 1000,
  maxStoredHashes: 5000,
};

const STORAGE_KEY = "telegram-webhook-processed-hashes-v1";
const ENDPOINT_STORAGE_KEY = "telegram-webhook-endpoint";
const API_KEY_STORAGE_KEY = "telegram-webhook-api-key";
const INSTALL_FLAG = "__TELEGRAM_WEBHOOK_SCRIPT_INSTALLED__";
const DEBUG_GLOBAL_KEY = "TELEGRAM_WEBHOOK_DEBUG";
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
  titleObserver: null,
  titleCheckTimerId: null,
  lastTitleCheckAt: 0,
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

function getDebugStateSnapshot () {
  return {
    running: state.running,
    scanning: state.scanning,
    runId: state.runId,
    hasTimer: Boolean(state.timerId),
    hasTitleObserver: Boolean(state.titleObserver),
    hasTitleCheckTimer: Boolean(state.titleCheckTimerId),
    lastTitleCheckAt: state.lastTitleCheckAt,
    titleCheckMinIntervalMs: CONFIG.titleCheckMinIntervalMs,
    processedRecordCount: state.processedRecords.length,
    processedHashCount: state.processedHashes.size,
    endpointConfigured: Boolean(getConfiguredEndpoint()),
    apiKeyConfigured: Boolean(getConfiguredApiKey()),
  };
}

function exposeDebugHelpers () {
  window[DEBUG_GLOBAL_KEY] = {
    getProcessedRecords: () => state.processedRecords.map(record => ({ ...record })),
    getProcessedHashes: () => Array.from(state.processedHashes),
    getState: getDebugStateSnapshot,
    reloadProcessedRecords: () => {
      loadProcessedRecords();
      return getDebugStateSnapshot();
    },
  };
  logInfo("Exposed webhook debug helpers.", { globalKey: DEBUG_GLOBAL_KEY });
}

function getTitleWithoutPrefix (title) {
  return String(title || "").startsWith(TITLE_PREFIX)
    ? String(title || "").slice(TITLE_PREFIX.length).trim()
    : String(title || "");
}

function ensureRunningTitlePrefix () {
  if (!state.running) return;

  state.lastTitleCheckAt = Date.now();

  const cleanTitle = getTitleWithoutPrefix(document.title);
  const prefixedTitle = `${TITLE_PREFIX} ${cleanTitle}`.trim();

  if (document.title !== prefixedTitle) {
    state.originalTitle = cleanTitle;
    document.title = prefixedTitle;
    logInfo("Restored running title prefix.", { title: prefixedTitle });
  }
}

function clearTitleCheckTimer () {
  if (!state.titleCheckTimerId) return;

  window.clearTimeout(state.titleCheckTimerId);
  state.titleCheckTimerId = null;
}

function scheduleTitlePrefixCheck () {
  if (!state.running) return;

  const elapsedMs = Date.now() - state.lastTitleCheckAt;
  const waitMs = Math.max(CONFIG.titleCheckMinIntervalMs - elapsedMs, 0);

  if (waitMs === 0) {
    clearTitleCheckTimer();
    ensureRunningTitlePrefix();
    return;
  }

  if (state.titleCheckTimerId) return;

  state.titleCheckTimerId = window.setTimeout(() => {
    state.titleCheckTimerId = null;
    ensureRunningTitlePrefix();
  }, waitMs);
}

function startTitleObserver () {
  if (state.titleObserver) return;

  const titleElement = document.querySelector("title");
  if (!titleElement || typeof MutationObserver !== "function") {
    logWarn("Unable to watch title changes; MutationObserver or title element is unavailable.");
    return;
  }

  state.titleObserver = new MutationObserver(scheduleTitlePrefixCheck);
  state.titleObserver.observe(titleElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });
  logInfo("Started title observer.");
}

function stopTitleObserver () {
  clearTitleCheckTimer();
  state.lastTitleCheckAt = 0;

  if (!state.titleObserver) return;

  state.titleObserver.disconnect();
  state.titleObserver = null;
  logInfo("Stopped title observer.");
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

function getEndpointLogLabel (endpoint) {
  try {
    return new URL(endpoint).origin;
  } catch (error) {
    return "(invalid endpoint URL)";
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
    logInfo("Webhook endpoint saved from menu.", { endpoint: getEndpointLogLabel(endpoint) });
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
    logInfo(apiKey ? "Webhook API key saved from menu." : "Webhook API key removed from menu.");
    window.alert(apiKey ? "Webhook API key saved." : "Webhook API key removed.");
  }
}

function showConfigFromMenu () {
  const endpoint = getConfiguredEndpoint() || "(not set)";
  const hasApiKey = getConfiguredApiKey() ? "yes" : "no";

  window.alert(`Endpoint: ${endpoint}\nAPI key saved: ${hasApiKey}`);
}

function registerMenuCommands () {
  if (typeof GM_registerMenuCommand !== "function") {
    logWarn("GM_registerMenuCommand is unavailable; configuration menu was not registered.");
    return;
  }

  GM_registerMenuCommand("Set webhook endpoint", setEndpointFromMenu);
  GM_registerMenuCommand("Set webhook API key", setApiKeyFromMenu);
  GM_registerMenuCommand("Show webhook configuration", showConfigFromMenu);
  logInfo("Registered Tampermonkey menu commands.");
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
  logInfo("Loaded processed hash records.", { count: state.processedRecords.length });
}

function saveProcessedRecords (records) {
  const limitedRecords = records
    .filter(record => record && typeof record.hash === "string" && Number.isFinite(record.processedAt))
    .sort((leftRecord, rightRecord) => leftRecord.processedAt - rightRecord.processedAt)
    .slice(-CONFIG.maxStoredHashes);

  state.processedRecords = limitedRecords;
  state.processedHashes = new Set(limitedRecords.map(record => record.hash));
  logInfo("Saving processed hash records.", { count: limitedRecords.length });
  return setStoredValue(STORAGE_KEY, JSON.stringify(limitedRecords));
}

function hasProcessedHash (hash) {
  return state.processedHashes.has(hash);
}

function recordProcessedHash (hash) {
  if (hasProcessedHash(hash)) return true;

  logInfo("Recording processed message hash.", { hash });
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
    logInfo("Reused existing webhook controls.");
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
  logInfo("Created webhook controls.");
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
  if (document.getElementById(MASK_ID)) {
    logInfo("Webhook mask already exists; skipping duplicate mask.");
    return;
  }

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
  logInfo("Created webhook running mask.");
}

function removeMask () {
  const mask = document.getElementById(MASK_ID);
  if (mask) {
    mask.remove();
    logInfo("Removed webhook running mask.");
  }
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

function findRelatedMessageTimeElement (contentElement, containerElement) {
  let messageBoxElement = contentElement.parentElement;

  while (messageBoxElement && containerElement.contains(messageBoxElement)) {
    const messageTimeElement = messageBoxElement.querySelector(CONFIG.messageTimeSelector);

    if (messageTimeElement) {
      logInfo("Found message time in containing message box.", {
        timeSelector: CONFIG.messageTimeSelector,
      });
      return messageTimeElement;
    }

    if (messageBoxElement === containerElement) break;
    messageBoxElement = messageBoxElement.parentElement;
  }

  logWarn("No containing message box has a matched time element.", {
    timeSelector: CONFIG.messageTimeSelector,
    contentElement,
  });
  return null;
}

function extractMessageTime (contentElement, containerElement) {
  const messageTimeElement = findRelatedMessageTimeElement(contentElement, containerElement);
  const messageTime = messageTimeElement && messageTimeElement.getAttribute("title")
    ? messageTimeElement.getAttribute("title").trim()
    : "";

  if (!messageTime) {
    logWarn("Skipping message without a full .message-time title timestamp.", contentElement);
  }

  return messageTime;
}

function extractMessageRecord (contentElement, containerElement) {
  const content = extractMessageBody(contentElement);
  const messageTime = extractMessageTime(contentElement, containerElement);

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
  const endpointLogLabel = getEndpointLogLabel(endpoint);
  logInfo("Sending webhook message.", {
    endpoint: endpointLogLabel,
    contentLength: content.length,
    hasApiKey: Boolean(getConfiguredApiKey()),
  });

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
            logWarn("Webhook API returned non-success status.", {
              endpoint: endpointLogLabel,
              status: response.status,
            });
            reject(new Error(
              `Webhook API returned HTTP ${response.status}: ${getResponseMessage(responseData, responseText)}`,
            ));
            return;
          }

          logInfo("Webhook API accepted message.", {
            endpoint: endpointLogLabel,
            status: response.status,
          });
          resolve(responseData);
        },
        onerror: () => {
          logError("Network error while sending webhook message.", { endpoint: endpointLogLabel });
          reject(new Error("Network error while sending webhook message."));
        },
        ontimeout: () => {
          logError("Webhook API request timed out.", { endpoint: endpointLogLabel });
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
      logWarn("Webhook API returned non-success status.", {
        endpoint: endpointLogLabel,
        status: response.status,
      });
      throw new Error(
        `Webhook API returned HTTP ${response.status}: ${getResponseMessage(responseData, responseText)}`,
      );
    }

    logInfo("Webhook API accepted message.", {
      endpoint: endpointLogLabel,
      status: response.status,
    });
    return responseData;
  });
}

function getMessageContentEntries () {
  const containerElements = Array.from(document.querySelectorAll(CONFIG.messageContainerSelector));

  if (!containerElements.length) {
    logWarn("No Telegram message containers matched selector.", CONFIG.messageContainerSelector);
    return [];
  }

  return containerElements.flatMap(containerElement => {
    const contentElements = Array.from(containerElement.querySelectorAll(CONFIG.messageContentSelector));

    if (!contentElements.length) {
      logWarn("Message container has no matched content elements.", containerElement);
    }

    return contentElements.map(contentElement => ({
      containerElement,
      contentElement,
    }));
  });
}

async function scanAndSendMessages () {
  if (!state.running) {
    logInfo("Scan skipped because monitoring is stopped.");
    return;
  }

  if (state.scanning) {
    logInfo("Scan skipped because another scan is already running.");
    return;
  }

  const scanRunId = state.runId;
  state.scanning = true;
  logInfo("Started scan.", { runId: scanRunId });

  try {
    const messageEntries = getMessageContentEntries();
    logInfo("Scanning Telegram message candidates.", {
      count: messageEntries.length,
      containerSelector: CONFIG.messageContainerSelector,
      contentSelector: CONFIG.messageContentSelector,
      timeSelector: CONFIG.messageTimeSelector,
    });

    for (const { contentElement, containerElement } of messageEntries) {
      if (!state.running || state.runId !== scanRunId) {
        logInfo("Stopping scan because monitoring state changed.", { runId: scanRunId, currentRunId: state.runId });
        break;
      }

      const record = extractMessageRecord(contentElement, containerElement);
      if (!record) continue;

      const normalizedContent = normalizeMessageContent(record.content);
      if (!normalizedContent) {
        logWarn("Skipping message with empty normalized content.", contentElement);
        continue;
      }

      const hash = await hashContent(normalizedContent);
      if (!state.running || state.runId !== scanRunId) {
        logInfo("Stopping scan after hash because monitoring state changed.", {
          runId: scanRunId,
          currentRunId: state.runId,
        });
        break;
      }
      if (!hash) continue;
      if (hasProcessedHash(hash)) {
        logInfo("Skipping already processed message hash.", { hash });
        continue;
      }

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
    logInfo("Finished scan.", { runId: scanRunId });
    if (state.running && state.runId !== scanRunId) {
      logInfo("Scheduling follow-up scan for newer run.", { runId: state.runId });
      window.setTimeout(scanAndSendMessages, 0);
    }
  }
}

function startMonitoring () {
  if (state.running) {
    logInfo("Start ignored because monitoring is already running.", { runId: state.runId });
    return;
  }

  state.originalTitle = getTitleWithoutPrefix(document.title);
  state.running = true;
  state.runId += 1;
  ensureRunningTitlePrefix();
  startTitleObserver();

  createMask();
  updateControls();
  scanAndSendMessages();

  if (!state.timerId) {
    state.timerId = window.setInterval(scanAndSendMessages, CONFIG.intervalMs);
  }
  logInfo("Started monitoring.", { runId: state.runId, intervalMs: CONFIG.intervalMs });
}

function stopMonitoring () {
  if (state.running || state.scanning) {
    state.runId += 1;
  }

  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
    logInfo("Cleared monitoring interval.");
  }

  if (!state.running) {
    logInfo("Stop ignored because monitoring is already stopped.", { runId: state.runId });
    updateControls();
    return;
  }

  state.running = false;
  stopTitleObserver();
  removeMask();
  document.title = state.originalTitle;
  updateControls();
  logInfo("Stopped monitoring.", { runId: state.runId });
}

function install () {
  if (window[INSTALL_FLAG]) {
    logWarn("Script is already installed; skipping duplicate installation.");
    return;
  }

  window[INSTALL_FLAG] = true;
  logInfo("Installing Telegram webhook monitor.");
  loadProcessedRecords();
  exposeDebugHelpers();
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
