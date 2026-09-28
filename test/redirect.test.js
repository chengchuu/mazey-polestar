const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const babel = require("@babel/core");
const mazey = require("mazey");

const root = path.resolve(__dirname, "..");
const source = babel.transformFileSync(path.join(root, "src/redirect.js"), {
  configFile: false,
  babelrc: false,
  presets: [["@babel/preset-env", { targets: { node: "22" }, modules: "commonjs" }]],
}).code;

function render (code, query) {
  const classes = new Set(["base", "base-error"]);
  const attributes = {};
  const destinationAttributes = {};
  const elements = {
    redirect: { classList: { replace: (from, to) => { classes.delete(from); classes.add(to); } } },
    "redirect-status": { textContent: "" },
    "redirect-destination": {
      textContent: "",
      setAttribute: (name, value) => { destinationAttributes[name] = value; },
    },
    "redirect-continue": {
      hidden: true,
      setAttribute: (name, value) => { attributes[name] = value; },
    },
  };
  // Location writes, timers, HTML insertion, and programmatic clicks are not
  // available: initialization must only render text and enable the anchor.
  const location = Object.freeze({
    href: `https://example.test/redirect/${query}`,
    search: query.split("#")[0],
  });
  vm.runInNewContext(code, {
    require: (name) => { assert.equal(name, "mazey"); return mazey; },
    window: Object.freeze({ location }),
    document: { getElementById: (id) => elements[id] },
    URL, URLSearchParams, console,
  });
  return { classes, attributes, destinationAttributes, elements };
}

for (const [name, code] of [
  ["source", source],
  ["artifact", fs.readFileSync(path.join(root, "lib/redirect.js"), "utf8")],
]) {
  test(`${name}: missing, empty, and duplicate destinations stay non-navigable`, () => {
    for (const query of [
      "", "?url", "?url=", "?url=https://example.com&url=https://other.test",
      "?url&url=https://example.com", "?url=https://example.com&url",
      "?%75rl&url=https://example.com",
    ]) {
      const result = render(code, query);
      assert.ok(result.classes.has("base-error"));
      assert.equal(result.attributes.href, undefined);
      assert.equal(result.destinationAttributes.href, undefined);
      assert.equal(result.elements["redirect-continue"].hidden, true);
      assert.match(result.elements["redirect-status"].textContent, /exactly one nonempty/);
    }
  });

  test(`${name}: destination acceptance follows Mazey exactly`, () => {
    for (const [destination, valid] of [
      ["https://example.com/path?a=1&next=%2Fhome#part", true],
      ["https://example.com/?q=%3Cscript%3E", true],
      ["ftp://example.com/file.txt", true],
      ["file://localhost/path", true],
      ["file:///path", false],
      ["mailto:user@example.com", false],
      ["tel:+123456789", false],
      ["magnet:?xt=abc", false],
      ["custom://example.com/path", true],
      ["javascript://alert(1)", true],
      ["data://text/html/example", true],
      ["about://blank", true],
      [" https://example.com", false],
      ["<img src=x onerror=alert(1)>", false],
    ]) {
      assert.equal(mazey.isValidUrl(destination), valid, destination);
      const result = render(code, `?url=${encodeURIComponent(destination)}`);
      assert.ok(result.classes.has(valid ? "base-info" : "base-error"), destination);
      assert.equal(result.elements["redirect-continue"].hidden, !valid);
      assert.equal(result.attributes.href, valid ? destination : undefined);
      assert.equal(result.destinationAttributes.href, valid ? destination : undefined);
      assert.equal(result.elements["redirect-destination"].textContent, valid ? destination : "");
      assert.match(result.elements["redirect-status"].textContent, valid ? /Review/ : /invalid/);
    }
  });
}
