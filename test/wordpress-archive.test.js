const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const projectRoot = path.resolve(__dirname, "..");
const migrationStatement = "console.log(\"[mazey-polestar] WordPress runtime has been " +
  "migrated to the Polestar theme.\");";

test("WordPress compatibility entry and artifact remain log-only", () => {
  const source = fs.readFileSync(path.join(projectRoot, "src/wordpress.js"), "utf8");
  const artifact = fs.readFileSync(path.join(projectRoot, "lib/wordpress.js"), "utf8");

  assert.equal(source, `${migrationStatement}\n`);
  assert.equal(artifact.trim(), migrationStatement);
});

test("legacy WordPress source remains outside active build paths", () => {
  const packageJson = require(path.join(projectRoot, "package.json"));
  const npmIgnore = fs.readFileSync(path.join(projectRoot, ".npmignore"), "utf8");

  assert.equal(
    packageJson.scripts["build:wordpress"],
    "cross-env ENTRY=wordpress webpack --mode=production --config webpack.config.lib.js",
  );
  assert.equal(fs.existsSync(path.join(projectRoot, "src/pages/wordpress")), false);
  assert.equal(fs.existsSync(path.join(projectRoot, "archive/wordpress/index.js")), true);
  assert.equal(fs.existsSync(path.join(projectRoot, "archive/wordpress/previous.js")), true);
  assert.equal(fs.existsSync(path.join(projectRoot, "archive/wordpress/README.md")), true);
  assert.match(npmIgnore, /^archive\/$/m);
  assert.equal(packageJson.dependencies.fingerprintjs2, undefined);
  assert.equal(packageJson.dependencies["mazey-wordpress-utils"], undefined);
});
