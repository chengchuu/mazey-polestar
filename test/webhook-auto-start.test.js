const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const babel = require("@babel/core");

const source = babel.transformFileSync(path.resolve(__dirname, "../src/webhook.js")).code;
const key = "peace-webhook-auto-start:example.com";

function runtime (storage = new Map(), domain = "example.com", validSelectors = true) {
  let now = 0;
  let nextId = 0;
  let answer = null;
  let failStorage = false;
  const timers = new Map();
  const intervals = new Map();
  const menus = new Map();
  const elements = new Map();
  const alerts = [];
  const warnings = [];
  function element () {
    return {
      style: {}, dataset: {}, listeners: {},
      addEventListener (name, callback) { this.listeners[name] = callback; },
      append (...children) { children.forEach(child => elements.set(child.id, child)); },
      appendChild (child) { elements.set(child.id, child); },
      remove () { elements.delete(this.id); },
    };
  }
  const sandbox = {
    require: () => ({
      genCustomConsole: () => ({ log () {}, warn: (...args) => warnings.push(args), error () {} }),
      parseJsonSafe: (value) => JSON.parse(value),
      isValidCssSelector: () => true,
      formatDurationFromMs: String,
    }),
    document: {
      title: "Test", readyState: "complete", body: element(), createElement: element,
      getElementById: id => elements.get(id), querySelectorAll: () => [],
    },
    window: {
      location: { hostname: domain }, prompt: () => answer, alert: value => alerts.push(value),
      setTimeout (callback, delay) { const id = ++nextId; timers.set(id, { callback, at: now + delay }); return id; },
      clearTimeout: id => timers.delete(id),
      setInterval (callback, delay) { const id = ++nextId; intervals.set(id, { callback, delay }); return id; },
      clearInterval: id => intervals.delete(id),
    },
    GM_getValue: (name, fallback) => {
      if (name === "peace-webhook-domain-config-map") return validSelectors ? JSON.stringify({
        [domain]: { messageContainerSelector: ".message", messageKeySelector: ".key", messageExcludeSelector: "", messageListScrollSelector: "" },
      }) : "{}";
      return storage.has(name) ? storage.get(name) : fallback;
    },
    GM_setValue: (name, value) => { if (failStorage) throw new Error("Storage unavailable"); storage.set(name, value); },
    GM_registerMenuCommand: (name, callback) => menus.set(name, callback),
    GM_addValueChangeListener () {},
  };
  vm.createContext(sandbox);
  vm.runInContext(source + "\nglobalThis.testing = { state, startMonitoring, stopMonitoring, install };", sandbox);
  return {
    state: sandbox.testing.state, alerts, warnings, timers, intervals,
    start: () => sandbox.testing.startMonitoring(), stop: () => sandbox.testing.stopMonitoring(),
    install: () => sandbox.testing.install(),
    configure (value) { answer = value; menus.get(`Set auto-start delay for ${domain}`)(); },
    failStorage () { failStorage = true; },
    async advance (ms) {
      now += ms;
      for (const [id, timer] of [...timers]) {
        if (timer.at <= now && timers.has(id)) { timers.delete(id); timer.callback(); }
      }
      await Promise.resolve();
      await Promise.resolve();
    },
  };
}

test("initialization starts once at the delay boundary and exposes Stop while waiting", async () => {
  const app = runtime(new Map([[key, "10"]]));
  app.install(); // Duplicate installation must not schedule another timer.
  assert.equal(app.timers.size, 1);
  assert.equal(app.state.stopButton.disabled, false);
  assert.equal(app.state.stopButton.style.display, "inline-flex");
  await app.advance(9999);
  assert.equal(app.state.running, false);
  await app.advance(1);
  assert.equal(app.state.running, true);
  assert.equal(app.state.runId, 1);
  assert.equal(app.state.autoStartTimerId, null);
  assert.equal(app.intervals.size, 1);
  assert.equal(app.timers.size, 1); // Safety timer starts only with monitoring.
});

test("unset, invalid and out-of-range stored values never auto-start", async () => {
  for (const value of [undefined, "", " ", "0", "-1", "1.5", "1e2", "0x10", "10s", "Infinity", "2147484", "9".repeat(400), 10, null]) {
    const app = runtime(new Map([[key, value]]));
    assert.equal(app.timers.size, 0, String(value));
    await app.advance(30000);
    assert.equal(app.state.running, false);
    assert.equal(app.state.stopButton.disabled, true);
  }
  const app = runtime(new Map([[key, " 2147483 "]]));
  assert.equal([...app.timers.values()][0].at, 2147483000);
});

test("menu saves by hostname, restarts countdown and preserves it on Cancel", async () => {
  const storage = new Map();
  const app = runtime(storage);
  app.configure("10");
  await app.advance(5000);
  app.configure(" 20 ");
  assert.equal(storage.get(key), "20");
  app.configure(null);
  await app.advance(19999);
  assert.equal(app.state.running, false);
  await app.advance(1);
  assert.equal(app.state.running, true);
  assert.equal(runtime(storage).timers.size, 1);
  assert.equal(runtime(storage, "other.example").timers.size, 0);
});

test("empty or invalid menu input disables a saved countdown", async () => {
  for (const value of ["", " ", "abc", "0", "1.5", "2147484"]) {
    const storage = new Map([[key, "10"]]);
    const app = runtime(storage);
    app.configure(value);
    assert.equal(storage.get(key), "");
    await app.advance(10000);
    assert.equal(app.state.running, false);
    assert.equal(app.state.stopButton.disabled, true);
    assert.equal(runtime(storage).timers.size, 0);
  }
});

test("manual Start and Stop cancel pending auto-start without later restart", async () => {
  const app = runtime(new Map([[key, "10"]]));
  app.start();
  assert.equal(app.state.autoStartTimerId, null);
  app.stop();
  await app.advance(10000);
  assert.equal(app.state.running, false);
  assert.equal(app.timers.size, 0);
  const waiting = runtime(new Map([[key, "10"]]));
  waiting.state.stopButton.listeners.click();
  await waiting.advance(10000);
  assert.equal(waiting.state.running, false);
});

test("invalid selectors prevent automatic startup silently and without retry", async () => {
  const app = runtime(new Map([[key, "1"]]), "example.com", false);
  await app.advance(1000);
  assert.equal(app.state.running, false);
  assert.equal(app.timers.size, 0);
  assert.equal(app.alerts.length, 0);
  assert.ok(app.warnings.length > 0);
  app.start();
  assert.equal(app.alerts.length, 1);
});

test("saving while running applies on refresh, and failed writes preserve the prior setting", async () => {
  const storage = new Map([[key, "10"]]);
  const app = runtime(storage);
  app.failStorage();
  app.configure("20");
  assert.equal(storage.get(key), "10");
  await app.advance(10000);
  assert.equal(app.state.running, true);
  const running = runtime(storage);
  running.start();
  running.configure("30");
  assert.equal(running.state.autoStartTimerId, null);
  running.stop();
  await running.advance(30000);
  assert.equal(running.state.running, false);
  const refreshed = runtime(storage);
  await refreshed.advance(30000);
  assert.equal(refreshed.state.running, true);
});
