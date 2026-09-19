# Copy code plan

Status: plan only. Implementation requires a separate request. This document does
not add runtime code, build scripts, tests, or generated artifacts.

## Confirmed decisions

- Source: `src/copy-code.js`.
- Published artifact: `lib/copy-code.js`.
- Explicit initializer: `window.MAZEY_COPY_CODE()`.
- Clicking a page's `<code>` element copies its text without its HTML markup.
- After copying succeeds, use `layer-esm` to display the exact message `Copied`
  for two seconds.
- Importing the library must not activate copying automatically.

For the supplied inline example, clicking `<code>Dockerfile</code>` copies exactly
`Dockerfile`. The surrounding paragraph is excluded.

## Repository fit

Reuse `webpack.config.lib.js`, which selects `src/<ENTRY>.js` and writes ordinary
library entries to `lib/<ENTRY>.js`. Follow the browser-global registration pattern
in `src/addstyle.js`. Keep the source as an ES module and use root named imports
from `layer-esm`.

The project already declares `layer-esm`; the previously inspected installed
version is 1.2.3. Its `msg` helper returns a numeric index, accepts the `success`
icon, and measures `time` in seconds. Verify the installed contract again when
implementation begins. No new dependency or React integration layer is proposed.

The package publishes `lib`, and generated artifacts are committed. The root
`build` script is currently a placeholder; building the dedicated entry is required.

## Proposed initialization and lifecycle

The following details complete the agreed API and are implementation proposals:

- Register the global on browser import, without registering page listeners or
  creating notifications until initialization and user interaction.
- Initialize against the current document. Repeated initialization reuses the
  active registration and returns the same cleanup function.
- Return an idempotent cleanup function. It removes owned listeners, disconnects
  any observer, restores owned accessibility attributes where they have not been
  changed by the page, and closes only the feature's current notification.
- Allow initialization again after cleanup. A stale cleanup function must not
  dispose a newer registration.
- Suppress feedback from clipboard operations that finish after cleanup.

Use delegated click handling so code elements inserted later work without adding
individual click handlers. Start DOM enhancement immediately if the document is
ready, or at DOM readiness if initialization occurs earlier.

## Copy behavior

1. Resolve the nearest `<code>` ancestor when a highlighted child is clicked.
2. Skip code in editable regions or existing interactive controls, such as links
   and buttons, to preserve their behavior. Ignore non-primary or modified clicks.
3. Skip pointer copying when a noncollapsed selection intersects the code element,
   preserving deliberate text selection. Unrelated selections should not block it.
4. Read `textContent` at activation time. Preserve spaces, indentation, line breaks,
   and decoded entities. Skip empty text without clearing the clipboard.
5. Invoke native `navigator.clipboard.writeText` directly from the user action.
6. Show success feedback only after the clipboard promise resolves.

Do not use `innerHTML`, strip tags with regular expressions, or trim the copied
value. Literal markup represented as text, such as escaped `<div>`, remains part
of the copied code. Hidden descendant text is included by `textContent`; page
authors should keep line numbers and copy controls outside `<code>`.

Use one in-flight clipboard write per registration. Ignore additional activations
until it settles to prevent concurrent writes from racing. Do not retry failed
writes automatically.

## Feedback and failure handling

Select Layer `msg` with the fixed content `Copied`, the `success` icon, a two-second
timeout, no buttons, and no shade. Retain its numeric index and use `close` to
replace only a message owned by this feature. Clear ownership when that specific
message ends; an older message's end callback must not clear a newer index.

Never pass the copied code into Layer message content, which accepts trusted HTML.
Do not use `window.layer`, global `closeAll`, or `destroy`, and do not change the
page's global Layer theme or configuration. A simple message uses polite live
status semantics and should not take focus from the code element.

Clipboard writes require a secure context and can be denied by browser or iframe
policy. Handle missing clipboard capability and rejected writes at that boundary:
show no success message, preserve the source content and selection, and allow a
later explicit user action. Proposed initial failure reporting is a concise
console warning without the copied text; a visible failure message is outside
the confirmed requirement.

Keep clipboard failure handling separate from Layer rendering. Do not report a
successful copy as failed because feedback rendering throws. Avoid broad catches,
unrelated fallback UI, or duplicated Layer option validation.

## Keyboard access

Propose focusable, button-like behavior for eligible noninteractive code elements,
with an accessible copy-action description that retains the code text as context.
Support Enter and Space, prevent Space scrolling only when handling the copy
action, and ignore held-key repeats. Preserve an existing meaningful role,
accessible name, focus policy, or interactive descendant instead of overwriting it.

Delegated clicks alone do not make dynamically inserted elements keyboard
accessible. Use an initial enhancement pass and a focused mutation observer for
new code elements. Track only attributes owned by this feature, avoid observer
loops, and disconnect on cleanup. Verify focus visibility in the consuming page.

## Options and trade-offs

- `copy-code.js` uses an action-oriented name that matches `MAZEY_COPY_CODE`.
- Explicit initialization provides lifecycle control and avoids activating on
  import. Automatic activation is outside the agreed contract.
- Native clipboard support keeps the implementation small. Legacy clipboard
  fallbacks are deferred unless a concrete browser or HTTP requirement emerges.
- Layer provides the requested feedback through its existing imperative API.
  Its React and styled-components runtime increases the generated bundle size;
  inspect the built artifact rather than assuming a named import eliminates that
  cost. Consumers do not need to mount a React provider or load a stylesheet.
- Runtime style injection must be compatible with the consuming page's Content
  Security Policy. Do not weaken CSP or invent a nonce inside this library.

The initial scope is ordinary DOM content in the current document, including
inline code and `<pre><code>` blocks. Cross-document traversal, shadow-root
integration, configurable selectors, localization, clipboard reads, and HTML
clipboard formats are deferred.

## Implementation steps after authorization

1. Recheck repository guidance, installed Layer APIs, and Git status.
2. Add `src/copy-code.js` with initialization, copy handling, owned feedback, and
   cleanup. Keep unrelated entries and existing user changes intact.
3. Add `build:copy-code` to `package.json`, following the existing production
   library build convention with `ENTRY=copy-code`.
4. Add focused regression coverage in `test/copy-code.test.js` using the existing
   Node.js test runner and controlled DOM, clipboard, and Layer boundaries.
5. Document initialization, cleanup, text semantics, and browser requirements in
   `README.md`; add the dedicated command to `AGENTS.md` if needed.
6. Generate `lib/copy-code.js` through its build command. Include any generated
   license notices referenced by the artifact. Never hand-edit generated files.

No bundler migration, dependency upgrade, lockfile rewrite, package identity
change, workflow change, or publication is part of this feature plan.

## Validation and acceptance

Regression coverage should demonstrate:

- The example copies `Dockerfile` exactly, and nested highlighting excludes tags.
- Whitespace, multiline code, escaped markup, and non-ASCII text are preserved.
- Empty code, editable regions, interactive controls, and selection gestures do
  not trigger unintended writes.
- Newly inserted code supports pointer and keyboard activation.
- Import alone is inactive; repeated initialization does not duplicate copying.
- A pending, denied, or unavailable clipboard write never shows `Copied`.
- Successful writes show the exact message and two-second duration through Layer.
- Rapid interactions do not create competing writes or close unrelated messages.
- Cleanup removes owned behavior and prevents late feedback; reinitialization
  works without interference from older registrations.

After implementation, run `npm run build:copy-code`, `npm run test`, the repository's
no-fix ESLint check, `npm pack --dry-run`, and `git diff --check`. Inspect the actual
packed artifact and exercise its global initializer in a browser. Test real
clipboard success and denial, keyboard focus, dynamic content, and notification
behavior in supported browsers; mocked tests cannot prove browser permissions,
CSP compatibility, or screen-reader announcements.

These are future validation steps. No runtime tests or builds are required for
creating this plan file.

## Rollback

Remove only the new entry, its generated output and owned notices, dedicated build
script, tests, and documentation changes. Do not revert existing dependency or
lockfile edits, unrelated libraries, or shared Layer configuration.
