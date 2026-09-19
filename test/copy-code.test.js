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

function createRuntime ({ clipboard, readyState = "complete", throwMessage = false } = {}) {
  const document = new FakeDocument(readyState);
  const messages = [];
  const closed = [];
  const warnings = [];
  const observers = [];
  let nextMessageIndex = 1;

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
  document.defaultView = window;
  const module = { exports: {} };
  const context = {
    console: { warn: (message) => warnings.push(message) },
    exports: module.exports,
    module,
    require: (request) => {
      assert.equal(request, "layer-esm");
      return layer;
    },
    window,
  };

  vm.runInNewContext(compiledSource, context, { filename: sourcePath });

  return { closed, document, messages, observers, warnings, window };
}

function click (document, target, options = {}) {
  return document.dispatch("click", { target, ...options });
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
  await flushPromises();
  assert.deepEqual(writes, ["Dockerfile"]);
  nextCleanup();
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
    await flushPromises();

    assert.deepEqual(writes, [value]);
    assert.equal(runtime.messages.length, 1);
    assert.equal(runtime.messages[0].content, "Copied");
    assert.equal(runtime.messages[0].options.icon, 1);
    assert.equal(runtime.messages[0].options.time, 2);
    assert.equal(runtime.messages[0].options.shade, false);
    assert.equal(runtime.messages[0].options.btn, false);
  }
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
  await flushPromises();
  assert.deepEqual(writes, []);

  runtime.document.selection = {
    isCollapsed: false,
    rangeCount: 1,
    getRangeAt: () => ({ intersectsNode: () => false }),
  };
  click(runtime.document, selectable);
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
  await flushPromises();
  assert.equal(attempts, 1);
  assert.equal(runtime.messages.length, 0);
  assert.equal(runtime.warnings.some((message) => message.includes(copiedText)), false);

  click(runtime.document, code);
  await flushPromises();
  assert.equal(attempts, 2);

  const unavailable = createRuntime();
  const unavailableCode = unavailable.document.append(new FakeElement("code", "value"));
  unavailable.window.MAZEY_COPY_CODE();
  click(unavailable.document, unavailableCode);
  const unavailableSpace = unavailable.document.dispatch("keydown", { key: " ", target: unavailableCode });
  assert.equal(unavailableSpace.defaultPrevented, true);
  assert.equal(unavailable.messages.length, 0);
  assert.match(unavailable.warnings[0], /Clipboard API is unavailable/);
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
  await flushPromises();
  click(runtime.document, code);
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
