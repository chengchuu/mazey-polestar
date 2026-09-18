# Repository Guidelines

## Project Structure & Module Organization

This repository is a Webpack build demo/package named `mazey-polestar`. Source files live in `src/`. Page entries are under `src/pages/<entry>/`, including `index`, `link`, `cdn`, and `obfuscator`. Library and userscript entries are `src/*.js`, including `src/webhook.js`. `src/wordpress.js` is a log-only compatibility notice for the runtime migrated to the Polestar theme. Shared helpers are in `src/helpers/`, Sass is in `src/style/`, and userscript metadata is in `config/userscript.js`. Selected generated JavaScript files are tracked in `lib/`; edit source/config first, then rebuild the affected entry. The tracked `lib/tiny.js` and `lib/tiny.css` are legacy artifacts without maintained source entries. Read `src/pages/link/AGENTS.md` before changing that page.

The files under `archive/wordpress/` are read-only historical material. They are not active source: do not build, import, deploy, lint, or maintain them. Current WordPress runtime changes belong in the Polestar theme.

## Build, Test, and Development Commands

- `npm run dev`: compiles and serves the configured page, library, compatibility, and userscript JavaScript entries in memory on `127.0.0.1:4131`. It does not serve HTML or CSS. Develop the integrated Link page with the sibling `pages` server at `127.0.0.1:4130/link/` and the sibling `mazey.css` server on port `4132`.
- `npm run build:link`: builds the production `lib/link.js` bundle and an ignored compatibility `lib/link.html`.
- `npm run build:index`, `build:cdn`, `build:obfuscator`: build individual page entries.
- `npm run build:wordpress`: rebuilds the log-only `lib/wordpress.js` compatibility notice from `src/wordpress.js`.
- `npm run build:webhook`: builds `src/webhook.js` to `lib/webhook.user.js` with the Tampermonkey banner.
- `npm run build:addstyle`, `build:confluence`, `build:list`: build other library-style entries with `webpack.config.lib.js`.
- `npm run watch:confluence`: watches the `confluence` library entry during development.
- `npm run build`: prints `Nothing to build!` and does not compile an entry. Select a relevant `build:<entry>` script instead.
- `npm run lint:fix`: runs ESLint on `src/**/*.js` and applies safe fixes.
- `npm test`: runs the Node.js regression tests, including the archived WordPress runtime boundary.

For local dependency operations, use pnpm; run project scripts and inspect packages with npm. `pnpm-lock.yaml` is tracked, while `package-lock.json` is ignored. `package.json` lists `lib/` as its only allowlisted content directory; there is no `.npmignore`. Do not change the lockfile policy or add a `packageManager` field merely to enforce the local/CI command split.

`.github/workflows/publish-npm.yml` uses Node.js 22 and `npm install` without npm dependency caching. It runs `npm run build --if-present` and `npm test`; because `build` is a no-op, the workflow does not regenerate entry bundles. A push to `release/v*` runs the publish job after tests; pull requests and manual dispatch run the test job only. Rebuild and review tracked `lib/` artifacts for source changes before a release.

## Coding Style & Naming Conventions

JavaScript uses ESLint Standard style with repository overrides: 2-space indentation, semicolons required, double quotes, `const`/`let` instead of `var`, and a 120-character warning limit. Use ES modules in `src/` and CommonJS in Webpack/config files. Name page folders by `ENTRY` because Webpack resolves `./src/pages/${ENTRY}/index.js`. Keep userscript selectors, storage keys, and metadata centralized.

## Testing Guidelines

For source changes, run `npm test`, a no-fix ESLint check such as `./node_modules/.bin/eslint src --ext .js`, and the relevant build. `npm run lint:fix` writes source files. The WordPress regression test keeps the compatibility entry and committed artifact log-only while the legacy source remains outside active build paths. For `webhook`, run `npm run build:webhook` and manually verify metadata, selectors, storage behavior, and endpoint setup in Tampermonkey. For `link`, run `npm run dev` with the sibling HTML and CSS development servers, then check `127.0.0.1:4130/link/` in a browser. Name new tests with a `.test.js` suffix.

## Commit & Pull Request Guidelines

Recent commits use short Conventional Commit-style prefixes such as `feat(hook): ...`, `chore(script): ...`, and `chore(link): ...`. Follow that pattern with a concise scope, for example `fix(hook): cancel stale safe redirect`. Pull requests should describe the affected entry, list commands run, link related issues, and include screenshots or recordings for UI changes.

## Security & Configuration Tips

Do not commit secrets, API keys, or private webhook endpoints. The userscript lets users configure endpoint and API key locally through Tampermonkey storage/menu commands. Keep `@connect` choices intentional, and rebuild instead of hand-editing `lib/webhook.user.js`. Keep Link runtime globals such as `window.LINK_FOREIGN_BASE_URL` and legacy `window.TINY_FOREIGN_BASE_URL` configurable by the consuming HTML.
