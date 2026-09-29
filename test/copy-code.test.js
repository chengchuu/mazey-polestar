const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const babel = require("@babel/core");

const sourcePath = path.resolve(__dirname, "../src/copy-code.js");
const source = fs.readFileSync(sourcePath, "utf8");
const compiledSource = babel.transformSync(source, {
  babelrc: false,
  configFile: false,
  filename: sourcePath,
  presets: [[require.resolve("@babel/preset-env"), {
    modules: "commonjs",
    targets: { node: "current" },
  }]],
}).code;

class FakeElement {
  constructor (tagName, text = "") {
    this.nodeType = 1;
    this.tagName = tagName.toUpperCase();
    this.parentElement = null;
    this.children = [];
    this.attributes = new Map();
    this.ownText = text;
  }

  get textContent () {
    return this.ownText + this.children.map((child) => child.textContent).join("");
  }

  set textContent (value) {
    this.ownText = String(value);
    this.children = [];
  }

  appendChild (child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  removeChild (child) {
    const index = this.children.indexOf(child);
    if (index !== -1) this.children.splice(index, 1);
    child.parentElement = null;
    return child;
  }

  hasAttribute (name) {
    return this.attributes.has(name);
  }

  getAttribute (name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  setAttribute (name, value) {
    this.attributes.set(name, String(value));
  }

  removeAttribute (name) {
    this.attributes.delete(name);
  }

  contains (element) {
    let current = element;
    while (current) {
      if (current === this) return true;
      current = current.parentElement;
    }
    return false;
  }

  querySelectorAll (selector) {
    assert.equal(selector, "code");
    const matches = [];
    const visit = (element) => {
      for (const child of element.children) {
        if (child.tagName === "CODE") matches.push(child);
        visit(child);
      }
    };
    visit(this);
    return matches;
  }
}

class FakeDocument {
  constructor (readyState = "complete") {
    this.nodeType = 9;
    this.readyState = readyState;
    this.designMode = "off";
    this.documentElement = new FakeElement("html");
    this.listeners = new Map();
    this.selection = null;
  }

  addEventListener (type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(listener);
  }

  removeEventListener (type, listener) {
    const listeners = this.listeners.get(type);
    if (listeners) listeners.delete(listener);
  }

  querySelectorAll (selector) {
    const matches = [];
    if (selector === "code" && this.documentElement.tagName === "CODE") matches.push(this.documentElement);
    return matches.concat(this.documentElement.querySelectorAll(selector));
  }

  getSelection () {
    return this.selection;
  }

  append (element) {
    return this.documentElement.appendChild(element);
  }

  dispatch (type, options = {}) {
    const event = {
      altKey: false,
      button: 0,
      ctrlKey: false,
      defaultPrevented: false,
      metaKey: false,
      repeat: false,
      shiftKey: false,
      preventDefault () {
        this.defaultPrevented = true;
      },
      ...options,
    };
    for (const listener of this.listeners.get(type) || []) listener(event);
    return event;
  }

  listenerCount (type) {
    return (this.listeners.get(type) || new Set()).size;
  }
}

function createDeferred () {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

async function flushPromises () {
  await Promise.resolve();
  await Promise.resolve();
}

function createRuntime ({ clipboard, copyFallback = async () => false, readyState = "complete", throwMessage = false } = {}) {
  const document = new FakeDocument(readyState);
  const messages = [];
  const closed = [];
  const fallbackCalls = [];
  const fallbackOptions = [];
  const warnings = [];
  const observers = [];
  const timers = new Map();
  let currentTime = 0;
  let nextMessageIndex = 1;
  let nextTimerId = 1;

  function advanceTimersByTime (duration) {
    const targetTime = currentTime + duration;
    while (true) {
      const pending = Array.from(timers.entries())
        .filter(([, timer]) => timer.time <= targetTime)
        .sort((left, right) => left[1].time - right[1].time)[0];
      if (!pending) break;
      const [timerId, timer] = pending;
      timers.delete(timerId);
      currentTime = timer.time;
      timer.callback();
    }
    currentTime = targetTime;
  }

  class FakeMutationObserver {
    constructor (callback) {
      this.callback = callback;
      this.connected = false;
      observers.push(this);
    }

    observe () {
      this.connected = true;
    }

    disconnect () {
      this.connected = false;
    }

    trigger (mutations) {
      if (this.connected) this.callback(mutations);
    }
  }

  const layer = {
    close: (index) => closed.push(index),
    msg: (content, options) => {
      if (throwMessage) throw new Error("Layer unavailable");
      const index = nextMessageIndex;
      nextMessageIndex += 1;
      messages.push({ index, content, options });
      return index;
    },
  };
  const window = {
    document,
    MutationObserver: FakeMutationObserver,
    navigator: clipboard === undefined ? {} : { clipboard },
  };
  Object.defineProperties(window, {
    clearTimeout: {
      value: (timerId) => timers.delete(timerId),
    },
    setTimeout: {
      value: (callback, delay) => {
        const timerId = nextTimerId;
        nextTimerId += 1;
        timers.set(timerId, { callback, time: currentTime + delay });
        return timerId;
      },
    },
  });
  document.defaultView = window;
  const module = { exports: {} };
  const context = {
    console: { warn: (message) => warnings.push(message) },
    exports: module.exports,
    module,
    require: (request) => {
      if (request === "layer-esm") return layer;
      if (request === "copy-to-clipboard") {
        return (text, options) => {
          fallbackCalls.push(text);
          fallbackOptions.push(options);
          return copyFallback(text, options);
        };
      }
      throw new Error(`Unexpected import: ${request}`);
    },
    window,
  };

  vm.runInNewContext(compiledSource, context, { filename: sourcePath });

  return {
    advanceTimersByTime,
    closed,
    document,
    fallbackCalls,
    fallbackOptions,
    messages,
    observers,
    warnings,
    window,
  };
}

function click (document, target, options = {}) {
  return document.dispatch("click", { detail: 1, target, ...options });
}

test("import is inactive and initialization has a reusable cleanup lifecycle", async () => {
  const writes = [];
  const runtime = createRuntime({
    clipboard: { writeText: async (text) => writes.push(text) },
  });
  const code = runtime.document.append(new FakeElement("code", "Dockerfile"));

  assert.deepEqual(Object.keys(runtime.window), ["document", "MutationObserver", "navigator", "MAZEY_COPY_CODE"]);
  assert.equal(runtime.document.listenerCount("click"), 0);
  assert.equal(code.hasAttribute("role"), false);

  const cleanup = runtime.window.MAZEY_COPY_CODE();
  assert.equal(runtime.window.MAZEY_COPY_CODE(), cleanup);
  assert.equal(runtime.document.listenerCount("click"), 1);
  assert.equal(code.getAttribute("role"), "button");
  assert.equal(code.getAttribute("tabindex"), "0");
  assert.equal(code.getAttribute("aria-label"), "Copy code: Dockerfile");

  cleanup();
  assert.equal(runtime.document.listenerCount("click"), 0);
  assert.equal(code.hasAttribute("role"), false);
  assert.equal(code.hasAttribute("tabindex"), false);
  assert.equal(code.hasAttribute("aria-label"), false);

  const nextCleanup = runtime.window.MAZEY_COPY_CODE();
  cleanup();
  click(runtime.document, code);
  runtime.advanceTimersByTime(300);
  await flushPromises();
  assert.deepEqual(writes, ["Dockerfile"]);

  click(runtime.document, code);
  nextCleanup();
  runtime.advanceTimersByTime(300);
  assert.deepEqual(writes, ["Dockerfile"]);
});

test("copying preserves exact text content and uses the required Layer message", async () => {
  const values = [
    "Dockerfile",
    "  const value = 1;\n  return value;\n",
    "<div>escaped</div>",
    "你好, Polestar 🚀",
  ];

  for (const value of values) {
    const writes = [];
    const runtime = createRuntime({
      clipboard: { writeText: async (text) => writes.push(text) },
    });
    const code = runtime.document.append(new FakeElement("code"));
    code.appendChild(new FakeElement("span", value));
    runtime.window.MAZEY_COPY_CODE();

    click(runtime.document, code.children[0]);
    assert.deepEqual(writes, []);
    runtime.advanceTimersByTime(299);
    assert.deepEqual(writes, []);
    runtime.advanceTimersByTime(1);
    await flushPromises();

    assert.deepEqual(writes, [value]);
    assert.deepEqual(runtime.fallbackCalls, []);
    assert.equal(runtime.messages.length, 1);
    assert.equal(runtime.messages[0].content, "Copied");
    assert.equal(runtime.messages[0].options.icon, 1);
    assert.equal(runtime.messages[0].options.time, 2);
    assert.equal(runtime.messages[0].options.offset, "20px");
    assert.equal(runtime.messages[0].options.shade, false);
    assert.equal(runtime.messages[0].options.btn, false);
  }
});

test("later clicks replace or cancel the delayed pointer copy", async () => {
  const writes = [];
  const runtime = createRuntime({
    clipboard: { writeText: async (text) => writes.push(text) },
  });
  const code = runtime.document.append(new FakeElement("code", "selectable"));
  runtime.window.MAZEY_COPY_CODE();

  click(runtime.document, code);
  runtime.advanceTimersByTime(200);
  click(runtime.document, code, { detail: 2 });
  runtime.advanceTimersByTime(300);
  assert.deepEqual(writes, []);

  click(runtime.document, code);
  click(runtime.document, code, { ctrlKey: true, detail: 2 });
  runtime.advanceTimersByTime(300);
  assert.deepEqual(writes, []);

  click(runtime.document, code);
  click(runtime.document, code, { detail: 2 });
  click(runtime.document, code, { detail: 3 });
  runtime.advanceTimersByTime(300);
  assert.deepEqual(writes, []);

  const latest = runtime.document.append(new FakeElement("code", "latest"));
  click(runtime.document, code);
  runtime.advanceTimersByTime(200);
  click(runtime.document, latest);
  runtime.advanceTimersByTime(300);
  await flushPromises();
  assert.deepEqual(writes, ["latest"]);
});

test("non-pointer activation is immediate and detached code does not copy", async () => {
  const writes = [];
  const runtime = createRuntime({
    clipboard: { writeText: async (text) => writes.push(text) },
  });
  const code = runtime.document.append(new FakeElement("code", "value"));
  runtime.window.MAZEY_COPY_CODE();

  click(runtime.document, code);
  click(runtime.document, code, { detail: 0 });
  assert.deepEqual(writes, ["value"]);
  runtime.advanceTimersByTime(300);
  assert.deepEqual(writes, ["value"]);

  const removed = runtime.document.append(new FakeElement("code", "removed"));
  click(runtime.document, removed);
  runtime.document.documentElement.removeChild(removed);
  runtime.advanceTimersByTime(300);
  assert.deepEqual(writes, ["value"]);
});

test("ineligible content and selection gestures do not write", async () => {
  const writes = [];
  const runtime = createRuntime({
    clipboard: { writeText: async (text) => writes.push(text) },
  });
  const empty = runtime.document.append(new FakeElement("code", ""));
  const button = runtime.document.append(new FakeElement("button"));
  const buttonCode = button.appendChild(new FakeElement("code", "button code"));
  const editable = runtime.document.append(new FakeElement("div"));
  editable.setAttribute("contenteditable", "true");
  const editableCode = editable.appendChild(new FakeElement("code", "editable code"));
  const childInteractive = runtime.document.append(new FakeElement("code", "prefix"));
  childInteractive.appendChild(new FakeElement("button", "control"));
  const selectable = runtime.document.append(new FakeElement("code", "selectable"));
  runtime.window.MAZEY_COPY_CODE();

  click(runtime.document, empty);
  click(runtime.document, buttonCode);
  click(runtime.document, editableCode);
  click(runtime.document, childInteractive);
  click(runtime.document, selectable, { button: 1 });
  click(runtime.document, selectable, { ctrlKey: true });
  const emptySpace = runtime.document.dispatch("keydown", { key: " ", target: empty });
  assert.equal(emptySpace.defaultPrevented, false);
  runtime.document.selection = {
    isCollapsed: false,
    rangeCount: 1,
    getRangeAt: () => ({ intersectsNode: (node) => node === selectable }),
  };
  click(runtime.document, selectable);
  runtime.advanceTimersByTime(300);
  await flushPromises();
  assert.deepEqual(writes, []);

  runtime.document.selection = {
    isCollapsed: false,
    rangeCount: 1,
    getRangeAt: () => ({ intersectsNode: () => false }),
  };
  click(runtime.document, selectable);
  runtime.advanceTimersByTime(300);
  await flushPromises();
  assert.deepEqual(writes, ["selectable"]);
});

test("new code elements support delegated pointer and keyboard activation", async () => {
  const writes = [];
  const runtime = createRuntime({
    clipboard: { writeText: async (text) => writes.push(text) },
  });
  runtime.window.MAZEY_COPY_CODE();
  const code = runtime.document.append(new FakeElement("code", "dynamic"));
  runtime.observers[0].trigger([{ addedNodes: [code] }]);

  assert.equal(code.getAttribute("role"), "button");
  assert.equal(code.getAttribute("tabindex"), "0");
  click(runtime.document, code);
  runtime.advanceTimersByTime(300);
  await flushPromises();
  const space = runtime.document.dispatch("keydown", { key: " ", target: code });
  assert.equal(space.defaultPrevented, true);
  await flushPromises();
  const enter = runtime.document.dispatch("keydown", { key: "Enter", target: code });
  assert.equal(enter.defaultPrevented, false);
  await flushPromises();
  runtime.document.dispatch("keydown", { key: "Enter", repeat: true, target: code });
  await flushPromises();

  assert.deepEqual(writes, ["dynamic", "dynamic", "dynamic"]);
});

test("clipboard failures do not show success and later actions can retry", async () => {
  let attempts = 0;
  const copiedText = "private copied value";
  const runtime = createRuntime({
    clipboard: {
      writeText: async () => {
        attempts += 1;
        throw new Error(copiedText);
      },
    },
  });
  const code = runtime.document.append(new FakeElement("code", copiedText));
  runtime.window.MAZEY_COPY_CODE();

  click(runtime.document, code);
  runtime.advanceTimersByTime(300);
  await flushPromises();
  assert.equal(attempts, 1);
  assert.deepEqual(runtime.fallbackCalls, []);
  assert.equal(runtime.messages.length, 0);
  assert.equal(runtime.warnings.some((message) => message.includes(copiedText)), false);

  click(runtime.document, code);
  runtime.advanceTimersByTime(300);
  await flushPromises();
  assert.equal(attempts, 2);
  assert.deepEqual(runtime.fallbackCalls, []);
});

test("a synchronous native clipboard failure does not use the package fallback", async () => {
  const copiedText = "private copied value";
  const runtime = createRuntime({
    clipboard: {
      writeText: () => {
        throw new Error(copiedText);
      },
    },
  });
  const code = runtime.document.append(new FakeElement("code", copiedText));
  runtime.window.MAZEY_COPY_CODE();

  click(runtime.document, code);
  runtime.advanceTimersByTime(300);
  await flushPromises();

  assert.deepEqual(runtime.fallbackCalls, []);
  assert.equal(runtime.messages.length, 0);
  assert.equal(runtime.warnings.length, 1);
  assert.equal(runtime.warnings[0].includes(copiedText), false);
});

test("the package fallback copies exact text and shows success", async () => {
  const copied = [];
  const value = "  <div>你好, Polestar 🚀</div>\n";
  const runtime = createRuntime({
    copyFallback: async (text) => {
      copied.push(text);
      return true;
    },
  });
  const code = runtime.document.append(new FakeElement("code"));
  code.appendChild(new FakeElement("span", value));
  runtime.window.MAZEY_COPY_CODE();

  click(runtime.document, code.children[0]);
  runtime.advanceTimersByTime(300);
  await flushPromises();

  assert.deepEqual(copied, [value]);
  assert.deepEqual(runtime.fallbackCalls, [value]);
  assert.equal(runtime.fallbackOptions.length, 1);
  assert.equal(runtime.fallbackOptions[0].format, "text/plain");
  assert.equal(runtime.messages.length, 1);
  assert.equal(runtime.messages[0].content, "Copied");
  assert.equal(runtime.messages[0].options.time, 2);
});

test("package fallback failures do not show success or expose copied text", async (t) => {
  const copiedText = "private fallback value";
  const failures = [
    ["false result", async () => false],
    ["rejected operation", async () => { throw new Error(copiedText); }],
    ["thrown operation", () => { throw new Error(copiedText); }],
  ];

  for (const [name, copyFallback] of failures) {
    await t.test(name, async () => {
      const runtime = createRuntime({ copyFallback });
      const code = runtime.document.append(new FakeElement("code", copiedText));
      runtime.window.MAZEY_COPY_CODE();

      click(runtime.document, code);
      runtime.advanceTimersByTime(300);
      await flushPromises();

      assert.deepEqual(runtime.fallbackCalls, [copiedText]);
      assert.equal(runtime.messages.length, 0);
      assert.equal(runtime.warnings.length, 1);
      assert.equal(runtime.warnings[0].includes(copiedText), false);
    });
  }
});

test("an unavailable native clipboard uses one pending fallback operation", async () => {
  const deferred = createDeferred();
  const runtime = createRuntime({ copyFallback: () => deferred.promise });
  const code = runtime.document.append(new FakeElement("code", "value"));
  const cleanup = runtime.window.MAZEY_COPY_CODE();

  click(runtime.document, code);
  click(runtime.document, code);
  const space = runtime.document.dispatch("keydown", { key: " ", target: code });
  assert.equal(space.defaultPrevented, true);
  assert.deepEqual(runtime.fallbackCalls, ["value"]);
  runtime.advanceTimersByTime(300);
  assert.deepEqual(runtime.fallbackCalls, ["value"]);

  cleanup();
  deferred.resolve(true);
  await flushPromises();
  assert.equal(runtime.messages.length, 0);
});

test("mutations update owned labels and respect attributes changed by the page", () => {
  const runtime = createRuntime({ clipboard: { writeText: async () => {} } });
  const code = runtime.document.append(new FakeElement("code", "before"));
  const cleanup = runtime.window.MAZEY_COPY_CODE();

  assert.equal(code.getAttribute("aria-label"), "Copy code: before");
  code.ownText = "after";
  runtime.observers[0].trigger([{
    type: "characterData",
    target: { nodeType: 3, parentElement: code },
  }]);
  assert.equal(code.getAttribute("aria-label"), "Copy code: after");

  code.removeAttribute("role");
  code.ownText = "later";
  runtime.observers[0].trigger([{
    type: "characterData",
    target: { nodeType: 3, parentElement: code },
  }]);
  assert.equal(code.hasAttribute("role"), false);
  assert.equal(code.getAttribute("aria-label"), "Copy code: later");

  cleanup();
  assert.equal(code.hasAttribute("role"), false);
  assert.equal(code.hasAttribute("aria-label"), false);
});

test("removing an interactive descendant makes code eligible", () => {
  const runtime = createRuntime({ clipboard: { writeText: async () => {} } });
  const code = runtime.document.append(new FakeElement("code", "value"));
  const button = code.appendChild(new FakeElement("button", "control"));
  runtime.window.MAZEY_COPY_CODE();
  assert.equal(code.hasAttribute("role"), false);

  code.removeChild(button);
  runtime.observers[0].trigger([{
    type: "childList",
    target: code,
    addedNodes: [],
  }]);
  assert.equal(code.getAttribute("role"), "button");
  assert.equal(code.getAttribute("aria-label"), "Copy code: value");
});

test("one pending write blocks races and cleanup suppresses late feedback", async () => {
  const deferred = createDeferred();
  let writes = 0;
  const runtime = createRuntime({
    clipboard: {
      writeText: () => {
        writes += 1;
        return deferred.promise;
      },
    },
  });
  const code = runtime.document.append(new FakeElement("code", "pending"));
  const cleanup = runtime.window.MAZEY_COPY_CODE();

  click(runtime.document, code);
  runtime.advanceTimersByTime(300);
  click(runtime.document, code);
  const pendingSpace = runtime.document.dispatch("keydown", { key: " ", target: code });
  assert.equal(pendingSpace.defaultPrevented, true);
  assert.equal(writes, 1);
  cleanup();
  deferred.resolve();
  await flushPromises();
  assert.equal(runtime.messages.length, 0);
});

test("message replacement and cleanup close only owned indexes", async () => {
  const runtime = createRuntime({
    clipboard: { writeText: async () => {} },
  });
  const code = runtime.document.append(new FakeElement("code", "value"));
  const cleanup = runtime.window.MAZEY_COPY_CODE();

  click(runtime.document, code);
  runtime.advanceTimersByTime(300);
  await flushPromises();
  click(runtime.document, code);
  runtime.advanceTimersByTime(300);
  await flushPromises();
  assert.deepEqual(runtime.closed, [1]);
  runtime.messages[0].options.end();
  cleanup();
  assert.deepEqual(runtime.closed, [1, 2]);
  assert.equal(runtime.closed.includes(999), false);

  const feedbackFailure = createRuntime({
    clipboard: { writeText: async () => {} },
    throwMessage: true,
  });
  const feedbackCode = feedbackFailure.document.append(new FakeElement("code", "copied"));
  feedbackFailure.window.MAZEY_COPY_CODE();
  click(feedbackFailure.document, feedbackCode);
  feedbackFailure.advanceTimersByTime(300);
  await flushPromises();
  assert.match(feedbackFailure.warnings[0], /copy confirmation/);
  assert.doesNotMatch(feedbackFailure.warnings[0], /clipboard/i);
});

test("cleanup preserves page-owned accessibility changes", () => {
  const runtime = createRuntime({ clipboard: { writeText: async () => {} } });
  const preserved = runtime.document.append(new FakeElement("code", "preserved"));
  preserved.setAttribute("role", "note");
  preserved.setAttribute("tabindex", "-1");
  preserved.setAttribute("aria-label", "Existing label");
  const changed = runtime.document.append(new FakeElement("code", "changed"));
  const cleanup = runtime.window.MAZEY_COPY_CODE();

  changed.setAttribute("aria-label", "Page replacement label");
  cleanup();

  assert.equal(preserved.getAttribute("role"), "note");
  assert.equal(preserved.getAttribute("tabindex"), "-1");
  assert.equal(preserved.getAttribute("aria-label"), "Existing label");
  assert.equal(changed.hasAttribute("role"), false);
  assert.equal(changed.hasAttribute("tabindex"), false);
  assert.equal(changed.getAttribute("aria-label"), "Page replacement label");
  assert.equal(runtime.observers[0].connected, false);
});

test("initialization waits for DOM readiness and cleanup can cancel the wait", () => {
  const runtime = createRuntime({
    clipboard: { writeText: async () => {} },
    readyState: "loading",
  });
  const code = runtime.document.append(new FakeElement("code", "waiting"));
  const cleanup = runtime.window.MAZEY_COPY_CODE();
  assert.equal(code.hasAttribute("role"), false);
  assert.equal(runtime.document.listenerCount("click"), 0);

  runtime.document.dispatch("DOMContentLoaded");
  assert.equal(code.getAttribute("role"), "button");
  cleanup();

  const cancelled = createRuntime({ readyState: "loading" });
  const cancelledCode = cancelled.document.append(new FakeElement("code", "cancelled"));
  const cancel = cancelled.window.MAZEY_COPY_CODE();
  cancel();
  cancelled.document.dispatch("DOMContentLoaded");
  assert.equal(cancelledCode.hasAttribute("role"), false);
  assert.equal(cancelled.document.listenerCount("click"), 0);
});
