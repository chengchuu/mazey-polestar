const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const projectRoot = path.resolve(__dirname, "..");

test("Link development server uses the sibling-project contract", () => {
  const previousEntry = process.env.ENTRY;
  process.env.ENTRY = "link";
  const config = require("../webpack.config.dev");
  if (previousEntry === undefined) delete process.env.ENTRY;
  else process.env.ENTRY = previousEntry;

  const packageJson = require("../package.json");
  assert.equal(
    packageJson.scripts["dev:link"],
    "cross-env ENTRY=link webpack-dev-server --config webpack.config.dev.js",
  );
  assert.equal(packageJson.scripts["serve:link"], undefined);
  assert.equal(config.devServer.host, "127.0.0.1");
  assert.equal(config.devServer.port, 4131);
  assert.equal(config.devServer.hot, false);
  assert.equal(config.devServer.liveReload, true);
  assert.equal(config.devServer.client.webSocketURL, "ws://127.0.0.1:4131/ws");
});

test("Link source has no legacy development port", () => {
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
  assert.match(examples, /http:\/\/127\.0\.0\.1:4130\/link\//);
});
