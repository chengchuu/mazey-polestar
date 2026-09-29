# HTTP Copy Code Fallback Plan

## Goal

Allow `window.MAZEY_COPY_CODE()` to copy code text on HTTP/no-SSL pages, where
the native Clipboard API is normally unavailable, without changing the preferred
native behavior on secure pages.

## Design

- Add `copy-to-clipboard` version `4.0.2` as a direct dependency with pnpm.
  Although it is currently installed transitively through
  `react-copy-to-clipboard`, Copy Code must not depend on that indirect
  relationship.
- Keep `navigator.clipboard.writeText` as the first choice whenever it exists.
- If `navigator.clipboard.writeText` is unavailable, call
  `copy-to-clipboard` synchronously from the activated click or keyboard event,
  passing the code element's exact `textContent`.
- Do not invoke the package if a native clipboard write rejects. Permission,
  iframe-policy, and other native failures remain failures and are not retried.
- Treat a `false` return or thrown package operation as a copy failure. Do not
  show `Copied` and do not include copied content in warning output.
- Keep the existing Layer feedback: show the exact `Copied` message for two
  seconds only after the selected copy path reports success.

`copy-to-clipboard` owns the deprecated, browser-dependent `execCommand("copy")`
fallback and its temporary selection handling. This keeps compatibility behavior
out of `src/copy-code.js` while supporting browsers that permit legacy copying
from insecure contexts.

## Implementation Steps

1. Update `guides/COPY_CODE_PLAN.md` and `README.md` to document the
   package-backed fallback and its browser-dependent behavior.
2. Add `copy-to-clipboard` `4.0.2` to `dependencies` using pnpm, updating only
   the tracked pnpm lockfile as needed.
3. Update `src/copy-code.js` to import the package and use it only when the
   native Clipboard API is unavailable.
4. Extend `test/copy-code.test.js` to cover fallback success, false returns,
   thrown failures, exact-text forwarding, success feedback, and native
   rejection without fallback retry.
5. Regenerate `lib/copy-code.js` with `npm run build:copy-code`; do not
   hand-edit the bundle.

## Validation

Run:

```bash
npm run build:copy-code
npm test
./node_modules/.bin/eslint src --ext .js
npm pack --dry-run
git diff --check
```

Manually verify the global initializer on both an HTTPS page and an HTTP page.
Confirm that an HTTP page displays `Copied` only when the package fallback
reports success, and that denied or unavailable copy paths never show a false
success notification.

## Scope

This plan does not add retries, clipboard reads, a new UI error message, a
polyfill service, or changes to unrelated library entries.
