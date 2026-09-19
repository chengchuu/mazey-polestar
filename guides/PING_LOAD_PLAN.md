# Ping Load Plan

Status: plan only. This document does not implement the runtime, build script, tests, or generated artifact.

## Recommendation

Add a browser-only library entry named `ping-load.js` that performs one CORS-enabled `GET` health check before loading a target JavaScript file.

The public API is the single browser function `window.MAZEY_PING_LOAD({ ping, target })`, returning `Promise<boolean>`:

- `true` means the ping returned a 2xx response and the target script loaded successfully.
- `false` means the URLs were invalid, the ping timed out, the request failed, the response was not 2xx, or the target script failed to load.

The ping timeout is fixed at 200 ms for the first version. The target script uses Mazey's existing script-loader timeout contract; the ping timeout must not also constrain the target download.

## Confirmed requirements

- Source and generated artifact name: `ping-load.js`.
- Browser global: `window.MAZEY_PING_LOAD`.
- Public call shape: one function with `ping` and `target` properties.
- Ping method: `GET`.
- The ping endpoint provides the required CORS response header.
- No automatic retries.
- Target loading uses Mazey `loadScript`, not a local script-element implementation.
- The new entry is a plan-only addition at this stage.

## Repository fit

The existing library build already maps `ENTRY=ping-load` to `src/ping-load.js` and emits `lib/ping-load.js` through `webpack.config.lib.js`. Existing library entries expose browser globals directly, and `package.json` publishes the `lib` directory. The implementation should therefore reuse these boundaries rather than introduce another bundler configuration or package format.

Mazey is already a runtime dependency. The implementation should use named imports for:

- `loadScript` for normal script insertion, load completion, load errors, and the target timeout;
- `isValidHttpUrl` for strict absolute HTTP/HTTPS URL validation.

`loadScriptIfUndefined` is not selected because the target contract does not provide a known global property that can identify the loaded script.

## Runtime flow

1. Validate `ping` and `target` as absolute HTTP or HTTPS URLs.
2. Start one `GET` request for `ping` with `cache: "no-store"` and an abort signal limited to 200 ms.
3. Treat only the final response status range 200 through 299 as a successful gate.
4. Do not read the response body.
5. Call Mazey `loadScript(target)` only after the gate succeeds.
6. Resolve `true` after Mazey reports `"loaded"`.
7. Resolve `false` for expected gate or target-loading failures. Do not retry inside the library.

The implementation may share an in-flight operation for the same target and retain a successful target result so repeated calls do not execute the same third-party script twice. A failed operation must not schedule an automatic retry; a later explicit caller invocation may make a new attempt.

## Browser and security boundaries

- The entry is browser-only at call time and must not touch `document` while the module is being imported.
- The ping response must expose `Access-Control-Allow-Origin` for the page that calls the library. `no-cors` is not an alternative because it hides the response status.
- A successful ping proves availability only; it does not validate or authenticate the target code.
- The target URL is executable third-party code and must be trusted by the caller.
- Content Security Policy may block the target script; the library must allow that failure to resolve `false` rather than bypass CSP.
- Restricting inputs to HTTP/HTTPS prevents non-network script schemes from entering the dynamic loader.
- No credentials, custom headers, retries, or redirect policy should be added to the first version without a concrete requirement.

## Planned repository changes

Only the following surfaces should change during implementation:

```text
src/ping-load.js              maintained browser entry
lib/ping-load.js              generated published artifact
package.json                  build:ping-load script
test/ping-load.test.js        public behavior regression coverage
README.md                     consumer usage and CORS/timeout notes
```

`webpack.config.lib.js` should remain unchanged because its existing dynamic entry contract already supports this name. No new dependency or `packageManager` field is needed. The generated `lib/ping-load.js` must be rebuilt through the repository command and retained because `lib` is the package publication boundary.

## Testing and validation plan

Use the existing Node.js test runner and a focused browser-like test boundary without adding a test framework merely for this entry. Cover:

- a 2xx ping followed by exactly one target-script load;
- a non-2xx response with no target-script insertion;
- a rejected fetch, CORS failure, and 200 ms abort with no target-script insertion;
- a target script load error or timeout returning `false`;
- invalid or non-HTTP(S) URLs returning `false` without a network request;
- concurrent calls for one target not executing the target twice;
- no automatic retry after any failed attempt.

After implementation, validate the consumer boundary with:

1. `npm run build:ping-load`;
2. `npm test`;
3. `npm pack --dry-run` and inspection of `lib/ping-load.js` in the package;
4. the repository's lint command, with any formatter changes reviewed;
5. `git diff --check`.

The root `npm run build` command currently does not build library entries, so a successful root build alone must not be treated as proof that this artifact exists.

## Acceptance criteria

- `src/ping-load.js` exposes exactly the agreed `window.MAZEY_PING_LOAD` function.
- The function accepts `{ ping, target }` and returns `Promise<boolean>`.
- The target is never passed to Mazey `loadScript` unless the ping finishes within 200 ms with a 2xx status.
- The implementation performs no automatic retry.
- Mazey owns script-element creation and target load handling.
- The generated `lib/ping-load.js` is present and included by `npm pack --dry-run`.
- Tests cover both the successful sequence and all gate-failure paths above.
- Existing working-tree changes remain unrelated and untouched.

## Rollback

Rollback is limited to removing the new entry, its dedicated build script, its generated artifact, its tests, and its documentation section. Existing package metadata, lockfile, workflow, and unrelated working-tree changes must not be reverted as part of this feature rollback.
