const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const sass = require("sass");
const test = require("node:test");

const projectRoot = path.resolve(__dirname, "..");

function sassLoader (config) {
  const rule = config.module.rules.find(({ test }) => test.test("index.scss"));
  return rule.use.find((loader) => loader.loader === "sass-loader");
}

test("development server exposes every maintained source-backed library", () => {
  const config = require("../webpack.config.dev");
  const packageJson = require("../package.json");
  assert.equal(
    packageJson.scripts.dev,
    "webpack serve --mode development --config webpack.config.dev.js",
  );
  assert.equal(packageJson.scripts["dev:link"], undefined);
  assert.equal(packageJson.scripts["serve:link"], undefined);
  const expectedEntries = {
    addstyle: "src/addstyle.js",
    cdn: "src/pages/cdn/index.js",
    confluence: "src/confluence.js",
    index: "src/pages/index/index.js",
    list: "src/list.js",
    obfuscator: "src/pages/obfuscator/index.js",
    webhook: "src/webhook.js",
    wordpress: "src/wordpress.js",
  };
  assert.deepEqual(Object.keys(config.entry), [
    "addstyle",
    "cdn",
    "confluence",
    "index",
    "link",
    "list",
    "obfuscator",
    "webhook",
    "wordpress",
  ]);
  for (const [name, source] of Object.entries(expectedEntries)) {
    assert.equal(config.entry[name], path.join(projectRoot, source));
    assert.equal(config.output.filename({ chunk: { name } }), name === "webhook"
      ? "webhook.user.js"
      : `${name}.js`);
  }
  assert.equal(config.entry.index, path.join(projectRoot, "src/pages/index/index.js"));
  assert.notEqual(config.entry.index, path.join(projectRoot, "src/index.js"));
  assert.match(config.entry.link[0], /webpack-dev-server\/client\/index\.js/);
  assert.match(config.entry.link[0], /hostname=127\.0\.0\.1&port=4131/);
  assert.equal(config.entry.link[1], path.join(projectRoot, "src/pages/link/index.js"));
  assert.equal(config.output.filename({ chunk: { name: "link" } }), "link.js");
  const banner = config.plugins.find((plugin) => plugin.constructor.name === "BannerPlugin");
  assert.ok(banner);
  assert.match(banner.options.banner, /^\/\/ ==UserScript==/);
  assert.equal(banner.options.include.test("webhook.user.js"), true);
  assert.equal(config.devServer.host, "127.0.0.1");
  assert.equal(config.devServer.port, 4131);
  assert.equal(config.devServer.static, false);
  assert.equal(config.devServer.hot, false);
  assert.equal(config.devServer.liveReload, true);
  assert.equal(config.devServer.client, false);
  assert.equal(config.devServer.devMiddleware.publicPath, "/");
  assert.equal(sassLoader(config).options.api, "modern");
});

test("Sass compilation avoids deprecated APIs and syntax", () => {
  const previousEntry = process.env.ENTRY;
  process.env.ENTRY = "index";
  const configPath = require.resolve("../webpack.config.base");
  delete require.cache[configPath];
  const productionConfig = require(configPath);
  if (previousEntry === undefined) delete process.env.ENTRY;
  else process.env.ENTRY = previousEntry;
  delete require.cache[configPath];

  assert.equal(sassLoader(productionConfig).options.api, "modern");
  const warnings = [];
  const pageStylesPath = path.join(projectRoot, "src/pages/index/index.scss");
  sass.compile(pageStylesPath, {
    logger: {
      warn: (message) => warnings.push(message),
    },
  });
  assert.deepEqual(warnings, []);
  const pageStyles = fs.readFileSync(
    pageStylesPath,
    "utf8",
  );
  const sharedStyles = fs.readFileSync(
    path.join(projectRoot, "src/style/extend/index.scss"),
    "utf8",
  );
  assert.doesNotMatch(pageStyles, /@import\b/);
  assert.match(pageStyles, /@use "\.\.\/\.\.\/style\/extend\/index" as extend;/);
  assert.doesNotMatch(pageStyles, /@use [^;]+ as \*;/);
  assert.match(sharedStyles, /@use "sass:color";/);
  assert.match(sharedStyles, /color\.adjust\(#EEEEEE, \$lightness: -10%\)/);
  assert.doesNotMatch(sharedStyles, /\bdarken\(/);
});

test("Link source uses current development and QR code targets", () => {
  const source = fs.readFileSync(
    path.join(projectRoot, "src/pages/link/index.js"),
    "utf8",
  );
  const examples = fs.readFileSync(
    path.join(projectRoot, "src/pages/link/testExamples.txt"),
    "utf8",
  );
  assert.doesNotMatch(source, /localhost:9202/);
  assert.match(source, /tempMsgLinkRet\.startsWith\(`\$\{location\.origin\}\/`\)/);
  assert.match(source, /convertUrlStringToQRCode\(realOriLink\)/);
  assert.doesNotMatch(source, /convertUrlStringToQRCode\(tinyLink\)/);
  assert.match(examples, /http:\/\/127\.0\.0\.1:4130\/link\//);
});
