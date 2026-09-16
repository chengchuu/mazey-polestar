# Repository Guidelines

## Project Structure & Module Organization

This repository is a Webpack build demo/package named `mazey-polestar`. Source files live in `src/`. Page entries are under `src/pages/<entry>/` with `index.js` and `index.html`; examples include `link`, `cdn`, `wordpress`, and `obfuscator`. Shared helpers are in `src/helpers/`, shared Sass is in `src/style/`, and package/library entry files are in `src/*.js`. Built artifacts are emitted to `lib/` and are committed here, so avoid editing generated files unless intentionally updating release output. Read `src/pages/link/AGENTS.md` before changing that page.

## Build, Test, and Development Commands

- `npm run serve:link`: starts `webpack-dev-server` for the `link` entry on port `9202`.
- `npm run build:link`: builds the production `link` page into `lib/`.
- `npm run build:index`, `build:cdn`, `build:wordpress`, `build:obfuscator`: build individual page entries.
- `npm run build:addstyle`, `build:confluence`, `build:list`: build library-style entries with `webpack.config.lib.js`.
- `npm run watch:confluence`: watches the `confluence` library entry during development.
- `npm run lint:fix`: runs ESLint on `src/**/*.js` and applies safe fixes.
- `npm test`: placeholder only; it currently prints a message and exits successfully.

## Coding Style & Naming Conventions

JavaScript uses ESLint Standard style with repository overrides: 2-space indentation, semicolons required, double quotes, `const`/`let` instead of `var`, and a 120-character warning limit. Use ES modules in `src/` and CommonJS in Webpack/config files. Name page folders by their `ENTRY` value because Webpack resolves `./src/pages/${ENTRY}/index.js`. Keep page-local Redux, API, and utilities inside that page folder unless sharing is clearly needed.

## Testing Guidelines

There is no active automated test suite yet. Validate changes by running the relevant build command and, for `link`, checking `npm run serve:link` in a browser. If you add tests, place them near the feature or in a clearly named test folder, use names such as `linkApi.test.js`, and update `npm test`.

## Commit & Pull Request Guidelines

Recent commits use short Conventional Commit-style prefixes such as `chore(script): ...`, `chore(flow): ...`, and `chore(link): ...`. Follow that pattern with a concise scope, for example `fix(link): handle empty backup response`. Pull requests should describe the affected entry, list commands run, link related issues, and include screenshots or recordings for UI changes.

## Security & Configuration Tips

Do not commit secrets or environment-specific URLs. Runtime browser globals such as `window.TINY_FOREIGN_BASE_URL` should remain configurable from HTML or deployment context. Be careful when changing remote script loading, short-link API URLs, or obfuscation settings because those affect deployed page behavior.
