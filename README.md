# webpack-build-demo

[![npm version][npm-image]][npm-url]
[![license][l-image]][l-url]

[npm-image]: https://img.shields.io/npm/v/mazey-polestar
[npm-url]: https://www.npmjs.com/package/mazey-polestar
[l-image]: https://img.shields.io/npm/l/mazey-polestar
[l-url]: https://github.com/chengchuu/webpack-build-demo/blob/main/LICENSE

A Demo for Webpack Build

## Install

```bash
npm install mazey-polestar
```

## Copy code

Load `lib/copy-code.js` in a browser and initialize copying explicitly:

```javascript
const stopCopyCode = window.MAZEY_COPY_CODE();
```

Eligible `<code>` elements become keyboard accessible. Activating one with a
primary click, Enter, or Space copies its exact `textContent`, including spaces,
line breaks, decoded entities, and nested highlighting text. A successful copy
shows `Copied` for two seconds. Code inside editable or interactive content is
left unchanged, and selecting text inside a code element does not copy it.

Call the returned cleanup function to remove owned listeners and accessibility
attributes, disconnect dynamic-content observation, and close the current Copy
Code message:

```javascript
stopCopyCode();
```

The native Clipboard API is preferred when available. On HTTP pages and other
contexts where that API is unavailable, the library uses `copy-to-clipboard`'s
browser-dependent `execCommand("copy")` fallback with an explicit plain-text
format. It does not retry a rejected native write through the fallback, and
failed writes never show `Copied`. Layer
feedback injects runtime styles, so the consuming page's Content Security Policy
must allow those styles or provide its existing nonce through `layer-esm`.

## Ping Load

Load `lib/ping-load.js` in a browser, then call `window.MAZEY_PING_LOAD` with an
HTTP or HTTPS health-check URL and the trusted JavaScript URL to load:

```javascript
const loaded = await window.MAZEY_PING_LOAD({
  ping: "https://example.com/health",
  target: "https://example.com/library.js",
});
```

The function returns `Promise<boolean>`. It returns `true` only when the ping
finishes within 200 ms with a 2xx response and the target script loads. The ping
uses `GET` with `cache: "no-store"`; its server must allow the calling page with
an `Access-Control-Allow-Origin` response header. The target download uses
Mazey's script-loader timeout separately, so the 200 ms ping limit does not
apply to the script download.

Failed calls return `false` and are not retried automatically. Concurrent calls
for the same target share one operation, and a successfully loaded target is
not executed again. A later explicit call can retry a failed operation. The
target executes as third-party code and must be trusted by the caller. Content
Security Policy can block it, in which case the function returns `false`.

## Contributing

### Development Environment

| Dependency | Version  |
|------------|----------|
| Node.js    | v22.22.2 |

### Develop library entries

Compile and serve the configured development entries on `127.0.0.1:4131`:

```bash
npm run dev
```

The server watches `addstyle.js`, `cdn.js`, `confluence.js`, `index.js`, `link.js`, `list.js`, `obfuscator.js`, `webhook.user.js`, and `wordpress.js`. It keeps output in memory and does not serve legacy `tiny.js` or `tiny.css`.

Build the Ping Load library artifact separately with `npm run build:ping-load`.
Build the Copy Code library artifact with `npm run build:copy-code`.

The sibling `pages` project owns the integrated Link HTML at <http://127.0.0.1:4130/link/>, and the sibling `mazey.css` project serves `link.css` on port `4132`. Run all three development servers while working on the Link page.

## License

This software is released under the terms of the [GPL-2.0 license](https://github.com/chengchuu/webpack-build-demo/blob/main/LICENSE).
