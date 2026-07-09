# Repository Guidelines

## Project Structure & Module Organization

This repository is a Webpack build demo/package named `mazey-polestar`. Source files live in `src/`. Page entries are under `src/pages/<entry>/`; examples include `link`, `cdn`, `wordpress`, and `obfuscator`. Library and userscript entries are `src/*.js`, including `src/webhook.js`. Shared helpers are in `src/helpers/`, Sass is in `src/style/`, and userscript metadata is in `config/userscript.js`. Built artifacts are committed in `lib/`; edit source/config first, then rebuild. Read `src/pages/link/AGENTS.md` before changing that page.

## Build, Test, and Development Commands

- `npm run serve:link`: starts `webpack-dev-server` for the `link` entry on port `9202`.
- `npm run build:link`: builds the production `link` page into `lib/`.
- `npm run build:index`, `build:cdn`, `build:wordpress`, `build:obfuscator`: build individual page entries.
- `npm run build:webhook`: builds `src/webhook.js` to `lib/webhook.user.js` with the Tampermonkey banner.
- `npm run build:addstyle`, `build:confluence`, `build:list`: build other library-style entries with `webpack.config.lib.js`.
- `npm run watch:confluence`: watches the `confluence` library entry during development.
- `npm run lint:fix`: runs ESLint on `src/**/*.js` and applies safe fixes.
- `npm test`: placeholder only; it currently prints a message and exits successfully.

## Coding Style & Naming Conventions

JavaScript uses ESLint Standard style with repository overrides: 2-space indentation, semicolons required, double quotes, `const`/`let` instead of `var`, and a 120-character warning limit. Use ES modules in `src/` and CommonJS in Webpack/config files. Name page folders by `ENTRY` because Webpack resolves `./src/pages/${ENTRY}/index.js`. Keep userscript selectors, storage keys, and metadata centralized.

## Testing Guidelines

There is no active automated test suite yet. Validate changes with `npm run lint:fix` plus the relevant build. For `webhook`, run `npm run build:webhook` and manually verify metadata, selectors, storage behavior, and endpoint setup in Tampermonkey. For `link`, check `npm run serve:link` in a browser. If you add tests, use names such as `linkApi.test.js` and update `npm test`.

## Commit & Pull Request Guidelines

Recent commits use short Conventional Commit-style prefixes such as `feat(hook): ...`, `chore(script): ...`, and `chore(link): ...`. Follow that pattern with a concise scope, for example `fix(hook): cancel stale safe redirect`. Pull requests should describe the affected entry, list commands run, link related issues, and include screenshots or recordings for UI changes.

## Security & Configuration Tips

Do not commit secrets, API keys, or private webhook endpoints. The userscript should let users configure endpoint and API key locally through Tampermonkey storage/menu commands. Keep `@connect` choices intentional, and rebuild instead of hand-editing `lib/webhook.user.js`. Runtime globals such as `window.TINY_FOREIGN_BASE_URL` should remain deployment-configurable.
