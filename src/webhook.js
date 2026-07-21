/* global GM_getValue, GM_setValue, GM_xmlhttpRequest, GM_registerMenuCommand, GM_addValueChangeListener, unsafeWindow */
/* eslint-disable max-lines, max-len */

import {
  extractElementText,
  formatDurationFromMs,
  genCustomConsole,
  isValidCssSelector,
  parseJsonSafe,
  sha256Hex,
} from "mazey";

const CONFIG = {
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
  enableDebug: true,
};

const WebhookCon = genCustomConsole("[Webhook]");
const DOMAIN_CONFIG_STORAGE_KEY = "peace-webhook-domain-config-map";
const PROCESSED_RECORDS_STORAGE_KEY = "peace-webhook-processed-records-by-domain";
const ENDPOINT_STORAGE_KEY = "peace-webhook-endpoint";
const API_KEY_STORAGE_KEY = "peace-webhook-api-key";
const INSTALL_FLAG = "__PEACE_WEBHOOK_SCRIPT_INSTALLED__";
const DEBUG_GLOBAL_KEY = "PEACE_WEBHOOK_DEBUG";
const CONFIG_GLOBAL_KEY = "PEACE_WEBHOOK_CONFIG";
const CONTROL_CONTAINER_ID = "peace-webhook-controls";
const MASK_ID = "peace-webhook-mask";
const TITLE_PREFIX = "[Webhook Running]";
const DOMAIN_CONFIG_FIELDS = [
  "messageContainerSelector",
  "messageKeySelector",
  "messageExcludeSelector",
  "messageListScrollSelector",
];
const HAN_REGEXP = createHanRegExp();
const EMOJI_SEQUENCE_REGEXP = createEmojiSequenceRegExp();
const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\u4E00-\u9FA5()!@:%_+.~#?&//=]*)/g;
const USERNAME_REGEXP = /(^|[^\w])@[A-Za-z]+/g;
const SPECIFIC_CHARACTERS_REGEXP = /[()]+/g;
const domainConfigMap = new Map();
const domainAfterScanMap = new Map();

const state = {
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
  stopButton: null,
};

function logInfo (...args) {
  if (CONFIG.enableDebug) {
    WebhookCon.log(...args);
  }
}

function logWarn (...args) {
  WebhookCon.warn(...args);
}

function logError (...args) {
  WebhookCon.error(...args);
}

function getDebugStateSnapshot () {
  const domain = getCurrentDomainKey();
  const processedRecords = getProcessedRecordsForDomain(domain);
  const processedHashes = getProcessedHashesForDomain(domain);

  return {
    domain,
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
    apiKeyConfigured: Boolean(getConfiguredApiKey()),
  };
}

function getPageWindow () {
  if (typeof unsafeWindow === "object" && unsafeWindow) {
    return unsafeWindow;
  }

  return window;
}

function exposeDebugHelpers () {
  const debugTarget = getPageWindow();

  debugTarget[DEBUG_GLOBAL_KEY] = {
    getProcessedRecords: () => getProcessedRecordsForDomain().map(record => ({ ...record })),
    getProcessedHashes: () => Array.from(getProcessedHashesForDomain()),
    getState: getDebugStateSnapshot,
    normalizeContent: content => normalizeMessageContent(content),
    clearProcessedRecords: () => clearCurrentDomainProcessedRecords(),
    reloadProcessedRecords: () => {
      loadProcessedRecordsByDomain();
      return getDebugStateSnapshot();
    },
  };

  logInfo("Exposed webhook debug helpers.", {
    globalKey: DEBUG_GLOBAL_KEY,
    target: debugTarget === window ? "window" : "unsafeWindow",
  });
}

function removeDebugHelpers () {
  const debugTarget = getPageWindow();

  if (debugTarget[DEBUG_GLOBAL_KEY]) {
    delete debugTarget[DEBUG_GLOBAL_KEY];
  }
}

function syncDebugHelpers () {
  if (CONFIG.enableDebug) {
    exposeDebugHelpers();
    return;
  }

  removeDebugHelpers();
}

function getAfterScanForDomain (domain = getCurrentDomainKey()) {
  return domainAfterScanMap.get(domain) || CONFIG.afterScan;
}

function exposeConfigApi () {
  const configTarget = getPageWindow();
  const configApi = {};

  Object.defineProperties(configApi, {
    domain: {
      enumerable: true,
      get: getCurrentDomainKey,
    },
    afterScan: {
      enumerable: true,
      get: () => domainAfterScanMap.get(getCurrentDomainKey()) || null,
      set: (callback) => {
        const domain = getCurrentDomainKey();

        if (callback === null) {
          domainAfterScanMap.delete(domain);
          logInfo("Restored default after-scan behavior.", { domain });
          return;
        }

        if (typeof callback !== "function") {
          throw new TypeError("PEACE_WEBHOOK_CONFIG.afterScan must be a function or null.");
        }

        domainAfterScanMap.set(domain, callback);
        logInfo("Updated after-scan callback.", { domain });
      },
    },
    getSelectors: {
      enumerable: true,
      value: () => Object.freeze(getCurrentDomainConfig()),
    },
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
    target: configTarget === window ? "window" : "unsafeWindow",
  });
  return true;
}

function getTitleWithoutPrefix (title) {
  return String(title || "").startsWith(TITLE_PREFIX)
    ? String(title || "").slice(TITLE_PREFIX.length).trim()
    : String(title || "");
}

function ensureRunningTitlePrefix () {
  if (!state.running) return;

  const cleanTitle = getTitleWithoutPrefix(document.title);
  const prefixedTitle = `${TITLE_PREFIX} ${cleanTitle}`.trim();

  if (document.title !== prefixedTitle) {
    state.originalTitle = cleanTitle;
    document.title = prefixedTitle;
    logInfo("Applied running title prefix:", prefixedTitle);
  }
}

function parseStoredJson (value, fallback) {
  const parseFailure = {};
  const parsedValue = parseJsonSafe(value, parseFailure);

  if (parsedValue !== parseFailure) return parsedValue;

  logWarn("Stored JSON data is malformed; using a safe default.");
  return fallback;
}

function getStoredValue (key, defaultValue, allowPageStorage = true) {
  try {
    if (typeof GM_getValue === "function") {
      return GM_getValue(key, defaultValue);
    }

    if (!allowPageStorage) return defaultValue;

    const localValue = window.localStorage.getItem(key);
    return localValue === null ? defaultValue : localValue;
  } catch (error) {
    logError(`Unable to read storage key "${key}".`, error);
    return defaultValue;
  }
}

function setStoredValue (key, value, allowPageStorage = true) {
  try {
    if (typeof GM_setValue === "function") {
      GM_setValue(key, value);
      return true;
    }

    if (!allowPageStorage) {
      logError(`Unable to securely persist storage key "${key}" because GM_setValue is unavailable.`);
      return false;
    }

    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    logError(`Unable to persist storage key "${key}".`, error);
    return false;
  }
}

function createEmptyDomainConfig () {
  return {
    messageContainerSelector: "",
    messageKeySelector: "",
    messageExcludeSelector: "",
    messageListScrollSelector: "",
  };
}

function getCurrentDomainKey () {
  return window.location.hostname.toLowerCase();
}

function isValidDomainKey (domain) {
  return typeof domain === "string" &&
    Boolean(domain) &&
    domain === domain.trim().toLowerCase() &&
    !/[/?#]/.test(domain);
}

function normalizeDomainConfig (value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const domainConfig = createEmptyDomainConfig();

  for (const field of DOMAIN_CONFIG_FIELDS) {
    if (typeof value[field] !== "string") return null;

    const selector = value[field].trim();
    if (!isValidCssSelector(selector, { allowEmpty: true })) return null;
    domainConfig[field] = selector;
  }

  return domainConfig;
}

function createDomainConfigMapFromStoredValue (rawConfigMap) {
  const storedConfigMap = typeof rawConfigMap === "string"
    ? parseStoredJson(rawConfigMap, {})
    : rawConfigMap;
  const nextDomainConfigMap = new Map();

  if (!storedConfigMap || typeof storedConfigMap !== "object" || Array.isArray(storedConfigMap)) {
    logWarn("Stored domain configuration map is malformed; using an empty map.");
    return nextDomainConfigMap;
  }

  Object.entries(storedConfigMap).forEach(([domain, value]) => {
    const domainConfig = normalizeDomainConfig(value);
    if (!isValidDomainKey(domain) || !domainConfig) {
      logWarn("Ignoring malformed domain configuration entry.", { domain });
      return;
    }

    nextDomainConfigMap.set(domain, domainConfig);
  });

  return nextDomainConfigMap;
}

function replaceDomainConfigMap (nextDomainConfigMap) {
  domainConfigMap.clear();
  nextDomainConfigMap.forEach((domainConfig, domain) => {
    domainConfigMap.set(domain, domainConfig);
  });
}

function readDomainConfigMapFromStorage () {
  const rawConfigMap = getStoredValue(DOMAIN_CONFIG_STORAGE_KEY, "{}", false);
  return createDomainConfigMapFromStoredValue(rawConfigMap);
}

function loadDomainConfigMap () {
  replaceDomainConfigMap(readDomainConfigMapFromStorage());
  logInfo("Loaded domain configurations, count:", domainConfigMap.size);
}

function saveDomainConfigMap (configMap = domainConfigMap) {
  const serializableConfigMap = Object.fromEntries(
    Array.from(configMap, ([domain, domainConfig]) => [domain, { ...domainConfig }]),
  );

  return setStoredValue(DOMAIN_CONFIG_STORAGE_KEY, JSON.stringify(serializableConfigMap), false);
}

function getCurrentDomainConfig () {
  const domainConfig = domainConfigMap.get(getCurrentDomainKey()) || createEmptyDomainConfig();
  return { ...domainConfig };
}

function updateCurrentDomainConfig (updates) {
  const domain = getCurrentDomainKey();
  const latestDomainConfigMap = readDomainConfigMapFromStorage();
  const latestDomainConfig = latestDomainConfigMap.get(domain);
  const nextConfig = normalizeDomainConfig({
    ...createEmptyDomainConfig(),
    ...latestDomainConfig,
    ...updates,
  });

  if (!nextConfig) return false;

  latestDomainConfigMap.set(domain, nextConfig);
  if (!saveDomainConfigMap(latestDomainConfigMap)) return false;

  replaceDomainConfigMap(latestDomainConfigMap);
  return true;
}

function removeCurrentDomainConfig () {
  const domain = getCurrentDomainKey();
  const latestDomainConfigMap = readDomainConfigMapFromStorage();

  if (!latestDomainConfigMap.has(domain)) return false;

  latestDomainConfigMap.delete(domain);
  if (!saveDomainConfigMap(latestDomainConfigMap)) return false;

  replaceDomainConfigMap(latestDomainConfigMap);
  domainAfterScanMap.delete(domain);
  if (state.running) stopMonitoring();

  return true;
}

function getCurrentDomainConfigError () {
  const domainConfig = getCurrentDomainConfig();

  if (!domainConfig.messageContainerSelector) return "message container selector is required";
  if (!domainConfig.messageKeySelector) return "message key selector is required";

  for (const field of DOMAIN_CONFIG_FIELDS) {
    if (!isValidCssSelector(domainConfig[field], { allowEmpty: true })) {
      return `${field} is not a valid CSS selector`;
    }
  }

  return "";
}

function hasValidCurrentDomainConfig () {
  return !getCurrentDomainConfigError();
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
  const promptMessage = currentApiKey
    ? "An API key is already saved. Enter a new value to replace it, or leave empty to remove it."
    : "Webhook API key. Leave empty to keep it unset.";
  const nextApiKey = window.prompt(promptMessage, "");

  if (nextApiKey === null) return;

  const apiKey = nextApiKey.trim();
  if (setStoredValue(API_KEY_STORAGE_KEY, apiKey, false)) {
    logInfo(apiKey ? "Webhook API key saved from menu." : "Webhook API key removed from menu.");
    window.alert(apiKey ? "Webhook API key saved." : "Webhook API key removed.");
  } else {
    window.alert("The API key was not saved because secure userscript storage is unavailable.");
  }
}

function setCurrentDomainSelectorFromMenu ({ field, label, required }) {
  const domain = getCurrentDomainKey();
  const currentValue = getCurrentDomainConfig()[field];
  const nextValue = window.prompt(
    `${label} for ${domain}.${required ? " This selector is required." : " Leave empty to disable it."}`,
    currentValue,
  );

  if (nextValue === null) return;

  const selector = nextValue.trim();
  if (required && !selector) {
    window.alert(`${label} for ${domain} cannot be empty.`);
    return;
  }

  if (!isValidCssSelector(selector, { allowEmpty: !required })) {
    window.alert(`${label} for ${domain} is not a valid CSS selector.`);
    return;
  }

  if (!updateCurrentDomainConfig({ [field]: selector })) {
    window.alert(`Unable to save ${label.toLowerCase()} for ${domain}.`);
    return;
  }

  logInfo("Updated domain selector.", { domain, field });
  window.alert(`${label} saved for ${domain}.`);
}

function showCurrentDomainConfigFromMenu () {
  const domain = getCurrentDomainKey();
  const domainConfig = getCurrentDomainConfig();
  const endpoint = getConfiguredEndpoint() || "(not set)";
  const hasApiKey = getConfiguredApiKey() ? "yes" : "no";

  window.alert([
    `Domain: ${domain}`,
    `Message container selector: ${domainConfig.messageContainerSelector || "(not set)"}`,
    `Message key selector: ${domainConfig.messageKeySelector || "(not set)"}`,
    `Message exclusion selector: ${domainConfig.messageExcludeSelector || "(disabled)"}`,
    `Message list scroll selector: ${domainConfig.messageListScrollSelector || "(disabled)"}`,
    `Global endpoint: ${endpoint}`,
    `API key saved: ${hasApiKey}`,
  ].join("\n"));
}

function removeCurrentDomainConfigFromMenu () {
  const domain = getCurrentDomainKey();

  if (!domainConfigMap.has(domain)) {
    window.alert(`No selector configuration is saved for ${domain}.`);
    return;
  }

  if (!window.confirm(`Remove the selector configuration for ${domain}?`)) return;

  if (removeCurrentDomainConfig()) {
    logInfo("Removed domain configuration.", { domain });
    window.alert(`Selector configuration removed for ${domain}.`);
    return;
  }

  window.alert(`Unable to remove the selector configuration for ${domain}.`);
}

function showConfiguredDomainsFromMenu () {
  const domains = Array.from(domainConfigMap.keys()).sort();
  window.alert(domains.length ? `Configured domains:\n${domains.join("\n")}` : "No domains are configured.");
}

function clearCurrentDomainProcessedRecordsFromMenu () {
  const domain = getCurrentDomainKey();
  if (!window.confirm(`Clear processed-message records for ${domain}?`)) return;

  const result = clearCurrentDomainProcessedRecords();
  window.alert(result.persisted
    ? `Processed-message records cleared for ${domain}.`
    : `Records were cleared in memory for ${domain}, but persistence failed.`);
}

function registerMenuCommands () {
  if (typeof GM_registerMenuCommand !== "function") {
    logWarn("GM_registerMenuCommand is unavailable; configuration menu was not registered.");
    return;
  }

  GM_registerMenuCommand("Set webhook endpoint", setEndpointFromMenu);
  GM_registerMenuCommand("Set webhook API key", setApiKeyFromMenu);
  const domain = getCurrentDomainKey();
  GM_registerMenuCommand(`Set message container selector for ${domain}`, () => {
    setCurrentDomainSelectorFromMenu({
      field: "messageContainerSelector",
      label: "Message container selector",
      required: true,
    });
  });
  GM_registerMenuCommand(`Set message key selector for ${domain}`, () => {
    setCurrentDomainSelectorFromMenu({
      field: "messageKeySelector",
      label: "Message key selector",
      required: true,
    });
  });
  GM_registerMenuCommand(`Set message exclusion selector for ${domain}`, () => {
    setCurrentDomainSelectorFromMenu({
      field: "messageExcludeSelector",
      label: "Message exclusion selector",
      required: false,
    });
  });
  GM_registerMenuCommand(`Set message list scroll selector for ${domain}`, () => {
    setCurrentDomainSelectorFromMenu({
      field: "messageListScrollSelector",
      label: "Message list scroll selector",
      required: false,
    });
  });
  GM_registerMenuCommand(`Show configuration for ${domain}`, showCurrentDomainConfigFromMenu);
  GM_registerMenuCommand(`Remove configuration for ${domain}`, removeCurrentDomainConfigFromMenu);
  GM_registerMenuCommand("Show configured domains", showConfiguredDomainsFromMenu);
  GM_registerMenuCommand(`Clear processed records for ${domain}`, clearCurrentDomainProcessedRecordsFromMenu);
  logInfo("Registered Tampermonkey menu commands.");
}

function normalizeProcessedRecords (records) {
  if (!Array.isArray(records)) return [];

  const recordsByHash = new Map();

  records
    .filter(record => record && typeof record.hash === "string" && Number.isFinite(record.processedAt))
    .forEach((record) => {
      const existingRecord = recordsByHash.get(record.hash);
      if (!existingRecord || record.processedAt > existingRecord.processedAt) {
        recordsByHash.set(record.hash, {
          hash: record.hash,
          processedAt: record.processedAt,
        });
      }
    });

  return Array.from(recordsByHash.values())
    .sort((leftRecord, rightRecord) => leftRecord.processedAt - rightRecord.processedAt)
    .slice(-CONFIG.maxStoredHashes);
}

function createProcessedRecordsMapFromStoredValue (rawRecordsMap) {
  const storedRecordsMap = typeof rawRecordsMap === "string"
    ? parseStoredJson(rawRecordsMap, {})
    : rawRecordsMap;
  const nextProcessedRecordsByDomain = new Map();

  if (!storedRecordsMap || typeof storedRecordsMap !== "object" || Array.isArray(storedRecordsMap)) {
    logWarn("Stored processed-record map is malformed; using an empty map.");
    return nextProcessedRecordsByDomain;
  }

  Object.entries(storedRecordsMap).forEach(([domain, records]) => {
    if (!isValidDomainKey(domain) || !Array.isArray(records)) {
      logWarn("Ignoring malformed processed-record entry.", { domain });
      return;
    }

    const normalizedRecords = normalizeProcessedRecords(records);
    nextProcessedRecordsByDomain.set(domain, normalizedRecords);
  });

  return nextProcessedRecordsByDomain;
}

function replaceProcessedRecordsByDomain (nextProcessedRecordsByDomain) {
  state.processedRecordsByDomain.clear();
  state.processedHashesByDomain.clear();

  nextProcessedRecordsByDomain.forEach((records, domain) => {
    const normalizedRecords = normalizeProcessedRecords(records);
    state.processedRecordsByDomain.set(domain, normalizedRecords);
    state.processedHashesByDomain.set(domain, new Set(normalizedRecords.map(record => record.hash)));
  });
}

function readProcessedRecordsMapFromStorage () {
  const rawRecordsMap = getStoredValue(PROCESSED_RECORDS_STORAGE_KEY, "{}", false);
  return createProcessedRecordsMapFromStoredValue(rawRecordsMap);
}

function loadProcessedRecordsByDomain () {
  replaceProcessedRecordsByDomain(readProcessedRecordsMapFromStorage());
  logInfo("Loaded processed-record domains, count:", state.processedRecordsByDomain.size);
}

function saveProcessedRecordsByDomain (recordsMap = state.processedRecordsByDomain) {
  const serializableRecordsMap = Object.fromEntries(
    Array.from(recordsMap, ([domain, records]) => [domain, records.map(record => ({ ...record }))]),
  );

  return setStoredValue(PROCESSED_RECORDS_STORAGE_KEY, JSON.stringify(serializableRecordsMap), false);
}

function getProcessedRecordsForDomain (domain = getCurrentDomainKey()) {
  return state.processedRecordsByDomain.get(domain) || [];
}

function getProcessedHashesForDomain (domain = getCurrentDomainKey()) {
  return state.processedHashesByDomain.get(domain) || new Set();
}

function setProcessedRecordsForDomain (domain, records) {
  const latestRecordsMap = readProcessedRecordsMapFromStorage();
  const normalizedRecords = normalizeProcessedRecords(records);

  latestRecordsMap.set(domain, normalizedRecords);
  replaceProcessedRecordsByDomain(latestRecordsMap);
  // logInfo("Saving processed hash records.", { domain, count: normalizedRecords.length });
  return saveProcessedRecordsByDomain(latestRecordsMap);
}

function clearCurrentDomainProcessedRecords () {
  const domain = getCurrentDomainKey();
  const persisted = setProcessedRecordsForDomain(domain, []);

  logInfo("Cleared processed hash records.", { domain, persisted });
  return { domain, persisted };
}

function hasProcessedHash (hash, domain = getCurrentDomainKey()) {
  return getProcessedHashesForDomain(domain).has(hash);
}

function recordProcessedHash (hash, domain = getCurrentDomainKey()) {
  const latestRecordsMap = readProcessedRecordsMapFromStorage();
  const latestDomainRecords = latestRecordsMap.get(domain) || [];
  const latestDomainHashes = new Set(latestDomainRecords.map(record => record.hash));

  if (latestDomainHashes.has(hash)) {
    replaceProcessedRecordsByDomain(latestRecordsMap);
    return true;
  }

  // logInfo("Recording processed message hash:", hash);
  const mergedRecords = normalizeProcessedRecords([
    ...latestDomainRecords,
    ...getProcessedRecordsForDomain(domain),
    {
      hash,
      processedAt: Date.now(),
    },
  ]);

  latestRecordsMap.set(domain, mergedRecords);
  replaceProcessedRecordsByDomain(latestRecordsMap);
  return saveProcessedRecordsByDomain(latestRecordsMap);
}

function registerStorageChangeListeners () {
  if (typeof GM_addValueChangeListener !== "function") {
    logWarn("GM_addValueChangeListener is unavailable; cross-tab storage updates will refresh before each write.");
    return;
  }

  try {
    GM_addValueChangeListener(DOMAIN_CONFIG_STORAGE_KEY, (...changeArgs) => {
      const newValue = changeArgs[2];
      const storedValue = newValue === undefined ? "{}" : newValue;
      replaceDomainConfigMap(createDomainConfigMapFromStoredValue(storedValue));
      logInfo("Synchronized domain configurations from userscript storage.");
      if (state.running && !hasValidCurrentDomainConfig()) {
        logWarn("Stopping monitoring because the current domain configuration was removed or became invalid.");
        stopMonitoring();
      }
    });
    GM_addValueChangeListener(PROCESSED_RECORDS_STORAGE_KEY, (...changeArgs) => {
      const newValue = changeArgs[2];
      const storedValue = newValue === undefined ? "{}" : newValue;
      replaceProcessedRecordsByDomain(createProcessedRecordsMapFromStoredValue(storedValue));
      logInfo("Synchronized processed records from userscript storage.");
    });
  } catch (error) {
    logWarn("Unable to register cross-tab storage listeners; storage will refresh before each write.", error);
  }
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
    button.style.opacity = button === state.stopButton && state.running ? "0.05" : "0.01";
  });
  button.addEventListener("focus", () => {
    button.style.opacity = "1";
  });
  button.addEventListener("blur", () => {
    button.style.opacity = button === state.stopButton && state.running ? "0.05" : "0.01";
  });

  return button;
}

function createControls () {
  const existingControls = document.getElementById(CONTROL_CONTAINER_ID);
  if (existingControls) {
    state.controls = existingControls;
    state.startButton = existingControls.querySelector("[data-peace-webhook-start]");
    state.stopButton = existingControls.querySelector("[data-peace-webhook-stop]");
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
  startButton.dataset.peaceWebhookStart = "true";
  startButton.addEventListener("click", startMonitoring);

  const stopButton = createButton("Stop");
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

function updateControls () {
  if (!state.startButton || !state.stopButton) return;

  state.startButton.style.display = state.running ? "none" : "inline-flex";
  state.startButton.disabled = state.running;
  state.stopButton.style.display = state.running ? "inline-flex" : "none";
  state.stopButton.disabled = !state.running;
  state.stopButton.style.opacity = state.running ? "0.05" : "0.01";
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

function removeMask () {
  const mask = document.getElementById(MASK_ID);
  if (mask) {
    mask.remove();
    logInfo("Removed webhook running mask.");
  }
}

function clearSafeRedirectTimer () {
  if (!state.safeRedirectTimerId) return;

  window.clearTimeout(state.safeRedirectTimerId);
  state.safeRedirectTimerId = null;
  logInfo("Cleared safe redirect timer.");
}

function getSafeRedirectMessage () {
  return String(CONFIG.safeRedirectMessageTemplate || "")
    .replace("{duration}", formatDurationFromMs(CONFIG.safeRedirectAfterMs));
}

function scheduleSafeRedirect () {
  clearSafeRedirectTimer();

  const redirectUrl = String(CONFIG.safeRedirectUrl || "").trim();
  if (!redirectUrl) {
    logInfo("Safe redirect is disabled because safeRedirectUrl is empty.");
    return;
  }

  const redirectRunId = state.runId;

  state.safeRedirectTimerId = window.setTimeout(async () => {
    state.safeRedirectTimerId = null;

    if (!state.running || state.runId !== redirectRunId) return;

    try {
      await sendWebhookMessage(getSafeRedirectMessage());
      logInfo("Sent safe redirect message.");
    } catch (error) {
      logError("Failed to send safe redirect message before redirecting.", error);
    }

    if (!state.running || state.runId !== redirectRunId) {
      logInfo("Safe redirect canceled because monitoring state changed.", {
        runId: redirectRunId,
        currentRunId: state.runId,
      });
      return;
    }

    logInfo("Safe redirect timer elapsed; redirecting:", redirectUrl);
    window.location.replace(redirectUrl);
  }, CONFIG.safeRedirectAfterMs);

  logInfo("Scheduled safe redirect.", {
    redirectUrl,
    delayMs: CONFIG.safeRedirectAfterMs,
    runId: redirectRunId,
    message: getSafeRedirectMessage(),
  });
}

function extractMessageBody (contentElement, domainConfig = getCurrentDomainConfig()) {
  const excludeSelector = domainConfig.messageExcludeSelector;
  const validExcludeSelector = !excludeSelector || isValidCssSelector(excludeSelector, { root: contentElement });

  if (!validExcludeSelector) {
    logWarn("Unable to apply message exclusion selector; continuing without exclusions.", {
      domain: getCurrentDomainKey(),
      selector: excludeSelector,
    });
  }

  return extractElementText(contentElement, {
    excludeSelector: validExcludeSelector ? excludeSelector : "",
    normalizeWhitespace: false,
  })
    .replace(/\u00a0/g, " ")
    .trim();
}

function extractMessageKey (keyElement, logMissing = true) {
  if (!keyElement) return "";

  const title = (keyElement.getAttribute("title") || "").trim();
  if (title) return title;

  const formValue = "value" in keyElement ? String(keyElement.value || "").trim() : "";
  if (formValue) return formValue;

  const visibleText = (keyElement.innerText || keyElement.textContent || "").trim();
  if (!visibleText && logMissing) {
    logWarn("Skipping message without a readable message key.", keyElement);
  }

  return visibleText;
}

function extractMessageRecord (contentElement, keyElement, domainConfig) {
  const content = extractMessageBody(contentElement, domainConfig);
  const messageKey = extractMessageKey(keyElement);

  if (!content || !messageKey) {
    if (!content) logWarn("Skipping message without readable content.", contentElement);
    return null;
  }

  return {
    content,
    messageKey,
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

  normalizedContent = normalizedContent.replace(URL_REGEXP, "#");
  normalizedContent = normalizedContent.replace(USERNAME_REGEXP, "$1#");
  normalizedContent = normalizedContent.replace(SPECIFIC_CHARACTERS_REGEXP, "#");
  normalizedContent = normalizedContent.replace(HAN_REGEXP, "#");
  normalizedContent = normalizedContent.replace(EMOJI_SEQUENCE_REGEXP, "#");
  normalizedContent = normalizedContent.replace(/\s+/g, "#");
  normalizedContent = normalizedContent.replace(/#+/g, "#");

  return normalizedContent.trim();
}

async function hashContent (content) {
  try {
    return await sha256Hex(content);
  } catch (error) {
    logError("Unable to hash message content.", error);
    return "";
  }
}

function formatApiContent (record) {
  const messageBody = CONFIG.filterApiMessageBody
    ? normalizeMessageContent(record.content)
    : record.content;

  return `${record.messageKey}\n${messageBody}`;
}

function getConfiguredEndpoint () {
  const storedEndpoint = getStoredValue(ENDPOINT_STORAGE_KEY, "");
  return String(CONFIG.endpoint || storedEndpoint || "").trim();
}

function getConfiguredApiKey () {
  return String(getStoredValue(API_KEY_STORAGE_KEY, "", false) || "").trim();
}

function parseResponseBody (responseText) {
  if (!responseText) return null;
  return parseJsonSafe(responseText, responseText);
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
    return Promise.reject(new Error("Webhook endpoint is not configured; set it via the Tampermonkey menu before starting."));
  }

  const requestBody = JSON.stringify({ content });
  const endpointLogLabel = getEndpointLogLabel(endpoint);

  if (typeof GM_xmlhttpRequest === "function") {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "POST",
        url: endpoint,
        headers: getWebhookHeaders(),
        data: requestBody,
        timeout: CONFIG.requestTimeoutMs,
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

          // logInfo("Webhook API accepted message, status:", response.status);
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

  const abortController = new AbortController();
  const timeoutId = window.setTimeout(() => abortController.abort(), CONFIG.requestTimeoutMs);

  return fetch(endpoint, {
    method: "POST",
    headers: getWebhookHeaders(),
    body: requestBody,
    signal: abortController.signal,
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

    logInfo("Webhook API accepted message, status:", response.status);
    return responseData;
  }).catch(error => {
    if (error && error.name === "AbortError") {
      logError("Webhook API request timed out.", { endpoint: endpointLogLabel });
      throw new Error("Webhook API request timed out.");
    }

    throw error;
  }).finally(() => {
    window.clearTimeout(timeoutId);
  });
}

function getMessageContentEntries (domainConfig = getCurrentDomainConfig()) {
  let containerElements;

  try {
    containerElements = Array.from(document.querySelectorAll(domainConfig.messageContainerSelector));
  } catch (error) {
    logError("Unable to query message containers.", {
      domain: getCurrentDomainKey(),
      selector: domainConfig.messageContainerSelector,
      error,
    });
    return [];
  }

  if (!containerElements.length) {
    logWarn("No message containers matched selector.", {
      domain: getCurrentDomainKey(),
      selector: domainConfig.messageContainerSelector,
    });
    return [];
  }

  return containerElements.flatMap(containerElement => {
    let keyElements;

    try {
      keyElements = [
        ...(containerElement.matches(domainConfig.messageKeySelector) ? [containerElement] : []),
        ...containerElement.querySelectorAll(domainConfig.messageKeySelector),
      ];
    } catch (error) {
      logError("Unable to query a message key.", {
        domain: getCurrentDomainKey(),
        selector: domainConfig.messageKeySelector,
        error,
      });
      return [];
    }

    const keyElement = keyElements.find(candidateElement => extractMessageKey(candidateElement, false));

    if (!keyElement) {
      logWarn("Message container has no usable matched key element.", {
        matchedKeyCount: keyElements.length,
        containerElement,
      });
      return [];
    }

    return [{
      contentElement: containerElement,
      keyElement,
    }];
  });
}

function scrollMessageListToBottom (domainConfig = getCurrentDomainConfig()) {
  const scrollSelector = domainConfig.messageListScrollSelector;
  if (!scrollSelector) {
    logInfo("Default after-scan scrolling is disabled for the current domain.");
    return;
  }

  let scrollElement;

  try {
    scrollElement = document.querySelector(scrollSelector);
  } catch (error) {
    logWarn("Unable to query the message list scroll element.", {
      domain: getCurrentDomainKey(),
      selector: scrollSelector,
      error,
    });
    return;
  }

  if (!scrollElement) {
    logWarn("No message list scroll element matched selector.", {
      domain: getCurrentDomainKey(),
      selector: scrollSelector,
    });
    return;
  }

  scrollElement.scrollTop = scrollElement.scrollHeight;
  logInfo("Scrolled message list to bottom, scrollHeight:", scrollElement.scrollHeight);
}

async function runAfterScan ({ domain, runId, messageCount, domainConfig }) {
  const callback = getAfterScanForDomain(domain);

  if (typeof callback !== "function") {
    scrollMessageListToBottom(domainConfig);
    return;
  }

  const context = Object.freeze({
    domain,
    runId,
    running: state.running,
    messageCount,
  });

  try {
    await callback(context);
  } catch (error) {
    logError("After-scan callback failed; future scans will continue.", { domain, error });
  }
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
  const scanDomain = getCurrentDomainKey();
  const domainConfig = getCurrentDomainConfig();
  const domainConfigError = getCurrentDomainConfigError();

  if (domainConfigError) {
    logWarn("Scan skipped because the current domain configuration is invalid.", {
      domain: scanDomain,
      error: domainConfigError,
    });
    return;
  }

  let messageCount = 0;
  state.scanning = true;
  logInfo("Started scan.", { domain: scanDomain, runId: scanRunId });

  try {
    const messageEntries = getMessageContentEntries(domainConfig);
    messageCount = messageEntries.length;
    logInfo("Scanning message candidates.", { domain: scanDomain, count: messageCount });

    for (const { contentElement, keyElement } of messageEntries) {
      if (!state.running || state.runId !== scanRunId) {
        logInfo("Stopping scan because monitoring state changed.", { runId: scanRunId, currentRunId: state.runId });
        break;
      }

      const record = extractMessageRecord(contentElement, keyElement, domainConfig);
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
      if (hasProcessedHash(hash, scanDomain)) {
        continue;
      }

      const apiContent = formatApiContent(record);

      try {
        await sendWebhookMessage(apiContent);
      } catch (error) {
        logError("Failed to deliver message; it will be retried later.", error);
        continue;
      }

      const isPersisted = recordProcessedHash(hash, scanDomain);
      logInfo("Delivered new message:", hash);

      if (!isPersisted) {
        logError("Message was delivered, but its hash could not be persisted.", { hash });
      }

      if (!state.running || state.runId !== scanRunId) break;
    }
  } finally {
    if (state.running && state.runId === scanRunId) {
      await runAfterScan({
        domain: scanDomain,
        runId: scanRunId,
        messageCount,
        domainConfig,
      });
    }

    state.scanning = false;
    logInfo("Finished scan.", { domain: scanDomain, runId: scanRunId });
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

  const domain = getCurrentDomainKey();
  const domainConfigError = getCurrentDomainConfigError();
  if (domainConfigError) {
    logWarn("Monitoring was not started because the current domain configuration is invalid.", {
      domain,
      error: domainConfigError,
    });
    window.alert(`Cannot start monitoring on ${domain}: ${domainConfigError}. Configure selectors from the userscript menu.`);
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
  logInfo("Started monitoring.", { runId: state.runId, intervalMs: formatDurationFromMs(CONFIG.intervalMs) });
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

  clearSafeRedirectTimer();

  if (!state.running) {
    logInfo("Stop ignored because monitoring is already stopped.", { runId: state.runId });
    updateControls();
    return;
  }

  state.running = false;
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
  document.addEventListener("DOMContentLoaded", install, { once: true });
} else {
  install();
}
