# Link page agent guide

## Ownership and entry points

This directory owns the Link JavaScript entry for generating short links, sharing messages, and rendering QR codes. `src/pages/link/index.js` is the Webpack entry when `ENTRY=link`. The sibling `pages` project owns the integrated HTML at `src/pages/link/index.html`; the sibling `mazey.css` project owns `link.css`. Treat those repositories as read-only unless the task explicitly includes them.

`npm run dev` serves `link.js` and the other maintained JavaScript entries from `127.0.0.1:4131`. Its Link entry includes a reload client for the separate HTML page. For integrated development, also run `npm run dev` in `pages` (HTML at `http://127.0.0.1:4130/link/`) and `mazey.css` (CSS at `127.0.0.1:4132`). The `pages` Link configuration loads both assets by URL. `npm run build:link` uses the shared production page config and writes `lib/link.js`; it also generates an ignored compatibility `lib/link.html` from this directory's `index.html`. Edit source and rebuild rather than editing `lib/link.js`.

The local `index.html` contains the legacy `#tiny-box` mount point and an example `window.TINY_FOREIGN_BASE_URL`. The integrated HTML uses `#link-box`, waits for the window `load` event, and calls `window.LINK_INIT("#link-box", { isGrayBackground: true })`.

## Runtime contract

- `index.js` defines `TinyInit(selector, options)`, automatically mounts into `#tiny-box` when that element exists, and exposes the function as both `window.LINK_INIT` and `window.TINY_INIT`. Each successful call creates a React root and a fresh Redux store. The optional `isGrayBackground` setting injects a style through `mazey`.
- `store.js` configures the local `link` reducer, the RTK Query `linkApi` reducer, and `linkApi.middleware`. `linkSlice.js` owns input, primary and backup results, message state, copy status, QR visibility, and Layer loading state.
- `linkApi.js` exports `linkBaseUrl` (`//i.mazey.net`) and `useGenerateShortLinkMutation`. The mutation posts to `/api/gee/generate-short-link` with `ori_link`, optional `one_time`, and optional `base_url`, then returns `response.tiny_link`.
- `utils.js` provides query-parameter, HTML-tag, URL, alphabetic-code, and Unicode character-count helpers. `images.js` exports `QRCodeFavBase64`, but `index.js` currently uses a remote favicon URL for QR rendering.

On mount, `Tiny` writes `mazey_loaded_tiny` to `localStorage`, loads jQuery when needed, and loads the remote Layer script for messages and confirmations. A `msg` query parameter populates the result and message state. Input can be a URL, a short alphabetic code of up to four characters that prompts navigation to `/t/{code}`, a domain that receives an `http://` prefix, or text/HTML that requires confirmation before becoming a `?msg=` sharing URL. The normalized original URL must be at most 500 Unicode code points.

The primary request uses the normalized original URL. The `onetime`, `oneTime`, or `one_time` query parameter enables `one_time` only for `on` or `1`. On success, the page displays the returned short link. When the original URL contains `http`, it also renders a QR code containing that original URL; repeated QR generation clears the previous QR DOM. If `window.LINK_FOREIGN_BASE_URL` or the legacy `window.TINY_FOREIGN_BASE_URL` is set, a second request seeks a backup link. The page displays that link only when it passes `isValidHttpUrl`. `LINK_FOREIGN_BASE_URL` takes precedence. Copy buttons use `react-copy-to-clipboard` and update the local copy status.

The page depends on React, React DOM, React Redux, RTK Query, `qr-code-styling`, `react-copy-to-clipboard`, and `mazey`. The remote Layer script exposes `window.layer`; jQuery is loaded remotely only when neither `window.$` nor `window.jQuery` exists. Do not infer that the package's `layer-esm` dependency is used by this entry.

## Checks for Link changes

Run `npm test` for the Link development and QR-source regression assertions in `test/link-development.test.js`. For a source change, run `npm run build:link` and review the generated `lib/link.js` diff. The package has no non-fixing lint script; run ESLint without `--fix` when linting. For UI or external-asset changes, run the three development servers and check `http://127.0.0.1:4130/link/` in a browser. Keep runtime globals configurable by the consuming HTML.
