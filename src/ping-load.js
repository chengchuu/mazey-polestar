import { isValidHttpUrl, loadScript } from "mazey";

const PING_TIMEOUT_MS = 200;
const loadedTargets = new Set();
const pendingTargets = new Map();

async function fetchPing (ping) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PING_TIMEOUT_MS);

  try {
    return await fetch(ping, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function loadAfterPing (ping, target) {
  try {
    const response = await fetchPing(ping);
    if (response.status < 200 || response.status > 299) return false;
    return await loadScript(target) === "loaded";
  } catch (error) {
    return false;
  }
}

function pingLoad (options) {
  const ping = options && options.ping;
  const target = options && options.target;

  if (!isValidHttpUrl(ping) || !isValidHttpUrl(target)) {
    return Promise.resolve(false);
  }

  if (loadedTargets.has(target)) return Promise.resolve(true);

  const pendingTarget = pendingTargets.get(target);
  if (pendingTarget) return pendingTarget;

  const operation = loadAfterPing(ping, target).then((loaded) => {
    pendingTargets.delete(target);
    if (loaded) loadedTargets.add(target);
    return loaded;
  });
  pendingTargets.set(target, operation);
  return operation;
}

if (typeof window !== "undefined") {
  window.MAZEY_PING_LOAD = pingLoad;
}
