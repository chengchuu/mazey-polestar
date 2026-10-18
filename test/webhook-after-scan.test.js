const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const babel = require("@babel/core");

// Use the production Babel configuration to cover async constructor compilation.
const source = babel.transformFileSync(path.resolve(__dirname, "../src/webhook.js")).code;
const storageKey = "peace-webhook-after-scan:example.com";

function runtime (storage = new Map(), domain = "example.com", allowCompilation = true) {
  const alerts = [];
  const errors = [];
  const scroll = { scrollTop: 0, scrollHeight: 150 };
  let answer = null;
  let failStorage = false;
  const sandbox = {
    require: () => ({ genCustomConsole: () => ({ log () {}, warn () {}, error: (...args) => errors.push(args) }) }),
    document: { title: "Test", readyState: "loading", addEventListener () {}, querySelector: () => scroll },
    window: { location: { hostname: domain }, prompt: () => answer, alert: value => alerts.push(value) },
    GM_getValue: (key, fallback) => storage.has(key) ? storage.get(key) : fallback,
    GM_setValue: (key, value) => {
      if (failStorage) throw new Error("Storage unavailable");
      storage.set(key, value);
    },
  };
  vm.createContext(sandbox, { codeGeneration: { strings: allowCompilation, wasm: false } });
  vm.runInContext(source + `\n globalThis.testing = {
    loadSavedAfterScan, setAfterScanFromMenu, exposeConfigApi, runAfterScan
  };`, sandbox);
  sandbox.testing.exposeConfigApi();
  sandbox.testing.loadSavedAfterScan();
  return {
    sandbox, alerts, errors, scroll,
    configure (value) { answer = value; sandbox.testing.setAfterScanFromMenu(); },
    failStorage () { failStorage = true; },
    run () {
      return sandbox.testing.runAfterScan({
        domain, runId: 1, messageCount: 3, domainConfig: { messageListScrollSelector: ".messages" },
      });
    },
  };
}

test("saved async bodies survive refresh without running until after a scan", async () => {
  const storage = new Map();
  const first = runtime(storage);
  const body = "await Promise.resolve(); window.result = context.messageCount;";
  first.configure(body);
  assert.equal(first.sandbox.window.result, undefined);
  assert.equal(storage.get(storageKey), body);
  const refreshed = runtime(storage);
  assert.equal(refreshed.sandbox.window.result, undefined);
  await refreshed.run();
  assert.equal(refreshed.sandbox.window.result, 3);
  assert.equal(refreshed.scroll.scrollTop, 0);
  const otherDomain = runtime(storage, "other.example");
  await otherDomain.run();
  assert.equal(otherDomain.sandbox.window.result, undefined);
  assert.equal(otherDomain.scroll.scrollTop, 150);
});

test("temporary callbacks override saved bodies and null restores saved behavior", async () => {
  const app = runtime();
  app.configure("window.saved = true;");
  let calls = 0;
  app.sandbox.window.PEACE_WEBHOOK_CONFIG.afterScan = () => { calls += 1; };
  await app.run();
  assert.equal(calls, 1);
  assert.equal(app.sandbox.window.saved, undefined);
  app.sandbox.window.PEACE_WEBHOOK_CONFIG.afterScan = null;
  await app.run();
  assert.equal(app.sandbox.window.saved, true);
  assert.throws(() => { app.sandbox.window.PEACE_WEBHOOK_CONFIG.afterScan = "window.saved = false;"; });
});

test("cancel, invalid syntax and failed storage retain the previous script", async () => {
  const storage = new Map();
  const app = runtime(storage);
  const original = "window.original = true;";
  app.configure(original);
  app.configure(null);
  app.configure("await (");
  // Closing the function body must not execute code during validation.
  app.configure("}; window.injected = true; async function other() {");
  assert.equal(app.sandbox.window.injected, undefined);
  assert.equal(storage.get(storageKey), original);
  app.failStorage();
  app.configure("window.replacement = true;");
  await app.run();
  assert.equal(app.sandbox.window.original, true);
  assert.equal(app.sandbox.window.replacement, undefined);
  assert.equal(storage.get(storageKey), original);
});

test("empty source removes saved behavior and restores scrolling after refresh", async () => {
  const storage = new Map();
  const app = runtime(storage);
  app.configure("window.custom = true;");
  app.configure(" \n ");
  await app.run();
  assert.equal(app.sandbox.window.custom, undefined);
  assert.equal(app.scroll.scrollTop, 150);
  const refreshed = runtime(storage);
  await refreshed.run();
  assert.equal(refreshed.scroll.scrollTop, 150);
});

test("malformed stored source falls back and script rejections remain contained", async () => {
  for (const value of ["await (", { invalid: true }]) {
    const app = runtime(new Map([[storageKey, value]]));
    await app.run();
    assert.equal(app.scroll.scrollTop, 150);
  }
  const app = runtime();
  app.configure("await Promise.reject(new Error('Callback failed'));");
  await app.run();
  await app.run();
  assert.equal(app.errors.length, 2);
});

test("blocked dynamic compilation preserves storage and leaves default scrolling available", async () => {
  const body = "window.custom = true;";
  const storage = new Map([[storageKey, body]]);
  const app = runtime(storage, "example.com", false);
  await app.run();
  assert.equal(app.scroll.scrollTop, 150);
  assert.equal(app.sandbox.window.custom, undefined);
  app.configure("window.replacement = true;");
  assert.equal(storage.get(storageKey), body);
  assert.match(app.alerts.at(-1), /could not be compiled/);
  app.configure("");
  assert.equal(storage.get(storageKey), "");
});

test("awaited callbacks keep after-scan pending until completion", async () => {
  const app = runtime();
  let finish;
  app.sandbox.window.wait = new Promise(resolve => { finish = resolve; });
  app.configure("await window.wait; window.completed = context.messageCount;");
  let settled = false;
  const pending = app.run().then(() => { settled = true; });
  await Promise.resolve();
  assert.equal(settled, false);
  assert.equal(app.sandbox.window.completed, undefined);
  finish();
  await pending;
  assert.equal(app.sandbox.window.completed, 3);
});
