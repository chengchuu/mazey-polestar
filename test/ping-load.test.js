const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const artifactPath = path.resolve(__dirname, "../lib/ping-load.js");
const artifact = fs.readFileSync(artifactPath, "utf8");

function createRuntime ({ fetch, onScript, setTimeoutImpl = setTimeout } = {}) {
  const scripts = [];
  const appendScript = (script) => {
    scripts.push(script);
    if (onScript) onScript(script);
  };
  const scriptParent = { insertBefore: appendScript };
  const document = {
    createElement: () => ({ setAttribute: () => {} }),
    getElementsByTagName: () => [{ parentNode: scriptParent }],
    head: { appendChild: appendScript },
    body: { appendChild: appendScript },
    documentElement: { appendChild: appendScript },
  };
  const window = {};

  vm.runInNewContext(artifact, {
    AbortController,
    URL,
    clearTimeout,
    console,
    document,
    fetch,
    setTimeout: setTimeoutImpl,
    window,
  });

  assert.equal(typeof window.MAZEY_PING_LOAD, "function");
  return { pingLoad: window.MAZEY_PING_LOAD, scripts };
}

test("the browser entry imports without touching document", async () => {
  const window = {};

  vm.runInNewContext(artifact, {
    AbortController,
    URL,
    clearTimeout,
    console,
    fetch: async () => ({ status: 200 }),
    setTimeout,
    window,
  });

  assert.deepEqual(Object.keys(window), ["MAZEY_PING_LOAD"]);
  assert.equal(await window.MAZEY_PING_LOAD({
    ping: "/relative-health",
    target: "javascript:alert(1)",
  }), false);
});

test("a 2xx ping loads and retains one target script", async () => {
  const requests = [];
  const { pingLoad, scripts } = createRuntime({
    fetch: async (url, options) => {
      requests.push({ url, options });
      return { status: 204 };
    },
    onScript: (script) => Promise.resolve().then(() => script.onload()),
  });
  const input = {
    ping: "https://example.com/health",
    target: "https://example.com/library.js",
  };

  assert.equal(await pingLoad(input), true);
  assert.equal(await pingLoad(input), true);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, input.ping);
  assert.equal(requests[0].options.method, "GET");
  assert.equal(requests[0].options.cache, "no-store");
  assert.equal(requests[0].options.signal instanceof AbortSignal, true);
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, input.target);
});

test("a non-2xx ping does not insert the target script", async () => {
  const { pingLoad, scripts } = createRuntime({
    fetch: async () => ({ status: 503 }),
  });

  assert.equal(await pingLoad({
    ping: "https://example.com/health",
    target: "https://example.com/library.js",
  }), false);
  assert.equal(scripts.length, 0);
});

test("fetch and CORS failures do not insert the target script", async (t) => {
  for (const failure of [new Error("network failure"), new TypeError("CORS failure")]) {
    await t.test(failure.message, async () => {
      const { pingLoad, scripts } = createRuntime({
        fetch: async () => { throw failure; },
      });

      assert.equal(await pingLoad({
        ping: "https://example.com/health",
        target: "https://example.com/library.js",
      }), false);
      assert.equal(scripts.length, 0);
    });
  }
});

test("the ping aborts after 200 ms without inserting the target script", async () => {
  const delays = [];
  const { pingLoad, scripts } = createRuntime({
    setTimeoutImpl: (callback, delay) => {
      delays.push(delay);
      Promise.resolve().then(callback);
      return 1;
    },
    fetch: (url, { signal }) => new Promise((resolve, reject) => {
      if (signal.aborted) reject(new Error("aborted"));
      else signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
    }),
  });

  assert.equal(await pingLoad({
    ping: "https://example.com/slow-health",
    target: "https://example.com/library.js",
  }), false);
  assert.deepEqual(delays, [200]);
  assert.equal(scripts.length, 0);
});

test("a target load error returns false", async () => {
  const { pingLoad, scripts } = createRuntime({
    fetch: async () => ({ status: 200 }),
    onScript: (script) => Promise.resolve().then(() => script.onerror()),
  });

  assert.equal(await pingLoad({
    ping: "https://example.com/health",
    target: "https://example.com/broken.js",
  }), false);
  assert.equal(scripts.length, 1);
});

test("invalid URLs return false without a network request", async () => {
  let requests = 0;
  const { pingLoad, scripts } = createRuntime({
    fetch: async () => {
      requests += 1;
      return { status: 200 };
    },
  });
  const invalidInputs = [
    undefined,
    null,
    {},
    { ping: "/health", target: "https://example.com/library.js" },
    { ping: "ftp://example.com/health", target: "https://example.com/library.js" },
    { ping: "https://example.com/health", target: "javascript:alert(1)" },
  ];

  for (const input of invalidInputs) assert.equal(await pingLoad(input), false);
  assert.equal(requests, 0);
  assert.equal(scripts.length, 0);
});

test("concurrent calls for one target share one operation", async () => {
  let resolvePing;
  let requests = 0;
  const { pingLoad, scripts } = createRuntime({
    fetch: () => {
      requests += 1;
      return new Promise((resolve) => { resolvePing = resolve; });
    },
    onScript: (script) => Promise.resolve().then(() => script.onload()),
  });
  const input = {
    ping: "https://example.com/health",
    target: "https://example.com/library.js",
  };

  const first = pingLoad(input);
  const second = pingLoad(input);
  assert.equal(requests, 1);
  resolvePing({ status: 200 });
  assert.deepEqual(await Promise.all([first, second]), [true, true]);
  assert.equal(scripts.length, 1);
});

test("failed operations retry only after another explicit call", async () => {
  let requests = 0;
  const { pingLoad, scripts } = createRuntime({
    fetch: async () => {
      requests += 1;
      throw new Error("offline");
    },
  });
  const input = {
    ping: "https://example.com/health",
    target: "https://example.com/library.js",
  };

  assert.equal(await pingLoad(input), false);
  await Promise.resolve();
  assert.equal(requests, 1);
  assert.equal(await pingLoad(input), false);
  assert.equal(requests, 2);
  assert.equal(scripts.length, 0);
});
