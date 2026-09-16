# Webhook Monitor UserScript — User Guide

This guide reflects the current userscript implementation.

- [Overview](#overview)
- [Installation](#installation)
- [Initial Configuration](#initial-configuration)
  - [Webhook endpoint](#webhook-endpoint)
  - [Webhook API key](#webhook-api-key)
- [Selector Configuration](#selector-configuration)
  - [Message container selector](#message-container-selector)
  - [Message key selector](#message-key-selector)
  - [Message exclusion selector](#message-exclusion-selector)
  - [Message list scroll selector](#message-list-scroll-selector)
- [Example Configuration](#example-configuration)
- [Domain Management](#domain-management)
  - [Show current configuration](#show-current-configuration)
  - [Remove current domain configuration](#remove-current-domain-configuration)
  - [Show configured domains](#show-configured-domains)
  - [Clear processed records](#clear-processed-records)
- [Starting and Stopping](#starting-and-stopping)
  - [Start](#start)
  - [Stop](#stop)
- [Message Processing](#message-processing)
  - [Deduplication](#deduplication)
- [Content Filtering](#content-filtering)
- [Read the current domain](#read-the-current-domain)
- [Read the current selectors](#read-the-current-selectors)
- [Configure `afterScan`](#configure-afterscan)
  - [Scroll the document to the bottom](#scroll-the-document-to-the-bottom)
  - [Click a “Load more” button](#click-a-load-more-button)
  - [Restore default behavior](#restore-default-behavior)
  - [Read the current callback](#read-the-current-callback)
- [Inspect runtime state](#inspect-runtime-state)
- [Inspect processed records](#inspect-processed-records)
- [Inspect processed hashes](#inspect-processed-hashes)
- [Preview content normalization](#preview-content-normalization)
- [Clear processed records](#clear-processed-records-1)
- [Reload processed records](#reload-processed-records)
- [Debug API availability](#debug-api-availability)
- [Safe Redirect](#safe-redirect)
- [Troubleshooting](#troubleshooting)
  - [Start reports that selectors are missing](#start-reports-that-selectors-are-missing)
  - [No message containers are found](#no-message-containers-are-found)
  - [A container has zero or multiple keys](#a-container-has-zero-or-multiple-keys)
  - [Unimportant text is included](#unimportant-text-is-included)
  - [The page does not scroll](#the-page-does-not-scroll)
  - [A message is not sent again](#a-message-is-not-sent-again)
  - [The webhook request fails](#the-webhook-request-fails)
- [Security Notes](#security-notes)

## Overview

Webhook Monitor scans message-like elements on a webpage and sends newly detected content to a configured webhook endpoint.

The script supports:

* Any HTTP or HTTPS website supported by the userscript metadata
* Separate CSS selector configuration for each hostname
* Automatic message deduplication
* Configurable webhook endpoint and API key
* Optional content-element filtering
* Optional scrolling after each scan
* Custom after-scan behavior through the browser console
* Runtime configuration and debugging APIs

Each hostname has an independent selector configuration. For example:

```text
example.com
www.example.com
chat.example.com
```

are treated as three separate domains.

---

## Installation

1. Install a userscript manager such as Tampermonkey.
2. Install the generated userscript file.
3. Open the website that you want to monitor.
4. Open the Tampermonkey menu for the script.
5. Configure the webhook endpoint and page selectors.
6. Click the **Start** button in the bottom-right corner.

The script will not start until the current domain has valid required selectors.

---

## Initial Configuration

Open the userscript menu and configure the following values.

### Webhook endpoint

Choose:

```text
Set webhook endpoint
```

Enter a complete HTTP or HTTPS endpoint:

```text
https://example.com/api/webhook-message
```

The script sends a JSON request in this format:

```json
{
  "content": "message-key\nmessage-body"
}
```

### Webhook API key

Choose:

```text
Set webhook API key
```

When configured, the API key is sent through this header:

```http
X-Webhook-API-Key: your-api-key
```

The API key is stored in userscript storage and is not displayed by the configuration summary or console APIs.

Entering an empty value removes the saved API key.

---

## Selector Configuration

Selectors are stored separately for the current hostname.

The four selector settings are:

```js
{
  messageContainerSelector: "",
  messageKeySelector: "",
  messageExcludeSelector: "",
  messageListScrollSelector: ""
}
```

### Message container selector

Required.

This selector must match every complete message container.

Example HTML:

```html
<article class="message" data-message-id="1001">
  <time class="message-key" title="2026-07-20 10:30"></time>
  <div class="message-body">Hello world</div>
</article>
```

Example selector:

```css
article.message
```

Configure it through:

```text
Set message container selector for <hostname>
```

### Message key selector

Required.

This selector must match exactly one key element inside each message container. The container itself may also be used when it matches the selector.

Example:

```css
.message-key
```

The script extracts the key in this order:

1. The element’s `title` attribute
2. The element’s form `value`
3. Its visible text or `textContent`

The key can be:

* A timestamp
* A message ID
* A sequence number
* A title
* A link label
* Any other stable value

A message is skipped when its container contains zero or multiple matching key elements.

Configure it through:

```text
Set message key selector for <hostname>
```

### Message exclusion selector

Optional.

This selector identifies descendants that should be removed before extracting the message body.

Example:

```css
.message-actions, .message-reactions, .message-views
```

Given:

```html
<article class="message">
  <div class="message-body">Hello world</div>
  <div class="message-views">100 views</div>
</article>
```

the exclusion selector:

```css
.message-views
```

prevents `100 views` from being included.

The script removes these elements only from a cloned message. It does not change the original page.

Leave the selector empty to disable exclusions.

Configure it through:

```text
Set message exclusion selector for <hostname>
```

### Message list scroll selector

Optional.

This selector identifies the scrollable element that should move to the bottom after each scan.

Example:

```css
.message-list
```

The default after-scan behavior is equivalent to:

```js
const element = document.querySelector(".message-list");
element.scrollTop = element.scrollHeight;
```

Leave this selector empty to disable default scrolling.

Configure it through:

```text
Set message list scroll selector for <hostname>
```

---

## Example Configuration

For this page:

```html
<div id="message-list">
  <article class="message">
    <time class="message-time" title="2026-07-20 10:30"></time>
    <div class="message-text">
      Hello world
      <span class="message-reaction">👍 3</span>
    </div>
  </article>
</div>
```

Use:

```text
Message container selector:
article.message

Message key selector:
time.message-time

Message exclusion selector:
.message-reaction

Message list scroll selector:
#message-list
```

The resulting webhook content is structured as:

```text
2026-07-20 10:30
Hello world
```

---

## Domain Management

The userscript menu provides the following domain-related commands:

```text
Show configuration for <hostname>
Remove configuration for <hostname>
Show configured domains
Clear processed records for <hostname>
```

### Show current configuration

Displays:

* Current hostname
* All four selectors
* Global webhook endpoint
* Whether an API key is stored

The API key value is never shown.

### Remove current domain configuration

Deletes only the selector configuration for the current hostname.

It does not remove:

* Configurations for other domains
* The global webhook endpoint
* The global API key
* Processed-message records for other domains

Monitoring stops automatically when the active domain configuration is removed.

### Show configured domains

Displays all hostnames with saved selector profiles.

### Clear processed records

Clears the deduplication history only for the current hostname.

Use this when previously delivered messages should be processed again.

---

## Starting and Stopping

A low-opacity control appears in the bottom-right corner of the page.

### Start

Click **Start** to:

1. Validate the current domain configuration.
2. Prefix the page title with:

```text
[Webhook Running]
```

3. Add a dark page mask.
4. Scan immediately.
5. Continue scanning at the configured interval.

The current implementation scans every minute.

### Stop

Click **Stop** to:

* Stop scheduled scans
* Cancel the safe-redirect timer
* Remove the page mask
* Restore the original page title

A scan already in progress uses run-state checks to avoid continuing after monitoring has stopped.

---

## Message Processing

For every matched message container, the script:

1. Finds exactly one message-key element.
2. Clones the message container.
3. Replaces images containing `alt` text with that text.
4. Removes elements matching the exclusion selector.
5. Extracts the message body.
6. Normalizes the body for hashing.
7. Checks whether it was previously delivered.
8. Sends new content to the webhook.
9. Records the message hash only after successful delivery.

Failed requests are not recorded and can be retried during a later scan.

### Deduplication

Processed messages are stored separately for each hostname.

The current implementation hashes the normalized message body. Messages with identical normalized bodies may therefore be treated as duplicates even when their keys differ.

---

## Content Filtering

The current configuration enables message-body filtering:

```js
filterApiMessageBody: true
```

Before delivery, the script normalizes the body and replaces several kinds of content with `#`, including:

* URLs
* Usernames beginning with `@`
* Han characters
* Emoji sequences
* Parentheses
* Whitespace sequences

Repeated `#` characters are collapsed.

You can preview this behavior through the Debug API:

```js
PEACE_WEBHOOK_DEBUG.normalizeContent(
  "Hello 张三 https://example.com 😀"
);
```

---

# Config API

The script exposes this page-console API:

```js
window.PEACE_WEBHOOK_CONFIG
```

In Chrome DevTools, it is generally available directly as:

```js
PEACE_WEBHOOK_CONFIG
```

The API is scoped to the current hostname.

## Read the current domain

```js
PEACE_WEBHOOK_CONFIG.domain
```

Example result:

```text
example.com
```

## Read the current selectors

```js
PEACE_WEBHOOK_CONFIG.getSelectors()
```

Example result:

```js
{
  messageContainerSelector: "article.message",
  messageKeySelector: ".message-key",
  messageExcludeSelector: ".message-actions, .message-reactions",
  messageListScrollSelector: "#message-list"
}
```

The returned object is a read-only snapshot. Selectors should be changed through the userscript menu.

## Configure `afterScan`

`afterScan` runs after an active scan finishes.

Set a callback:

```js
PEACE_WEBHOOK_CONFIG.afterScan = context => {
  console.log("Scan completed:", context);
};
```

The callback receives:

```js
{
  domain: "example.com",
  runId: 1,
  running: true,
  messageCount: 10
}
```

Properties:

| Property       | Description                        |
| -------------- | ---------------------------------- |
| `domain`       | Hostname scanned                   |
| `runId`        | Current monitoring run identifier  |
| `running`      | Whether monitoring is still active |
| `messageCount` | Number of message containers found |

The callback may be asynchronous:

```js
PEACE_WEBHOOK_CONFIG.afterScan = async context => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("Completed after-scan task:", context);
};
```

Callback errors are caught and logged. They do not stop future scans.

### Scroll the document to the bottom

```js
PEACE_WEBHOOK_CONFIG.afterScan = () => {
  window.scrollTo({
    top: Math.max(
      document.body?.scrollHeight || 0,
      document.documentElement?.scrollHeight || 0
    ),
    left: 0,
    behavior: "smooth"
  });
};
```

### Click a “Load more” button

```js
PEACE_WEBHOOK_CONFIG.afterScan = () => {
  document.querySelector("button.load-more")?.click();
};
```

### Restore default behavior

```js
PEACE_WEBHOOK_CONFIG.afterScan = null;
```

The default behavior scrolls the element matched by `messageListScrollSelector`.

The custom callback is runtime-only and is not persisted after the page reloads.

### Read the current callback

```js
PEACE_WEBHOOK_CONFIG.afterScan
```

The result is either:

```text
function
```

or:

```text
null
```

---

# Debug API

When debugging is enabled, the script exposes:

```js
window.PEACE_WEBHOOK_DEBUG
```

In Chrome DevTools, it is generally available as:

```js
PEACE_WEBHOOK_DEBUG
```

The Debug API operates on the current hostname.

## Inspect runtime state

```js
PEACE_WEBHOOK_DEBUG.getState()
```

Example result:

```js
{
  domain: "example.com",
  enableDebug: true,
  running: true,
  scanning: false,
  runId: 1,
  hasTimer: true,
  hasSafeRedirectTimer: true,
  safeRedirectAfterMs: 604800000,
  filterApiMessageBody: true,
  configuredDomainCount: 2,
  currentDomainConfigured: true,
  processedRecordCount: 20,
  processedHashCount: 20,
  endpointConfigured: true,
  apiKeyConfigured: true
}
```

Sensitive values such as the endpoint path and API key are not returned.

## Inspect processed records

```js
PEACE_WEBHOOK_DEBUG.getProcessedRecords()
```

Example:

```js
[
  {
    hash: "e3b0c44298fc1c149afbf4c8996fb924...",
    processedAt: 1784512800000
  }
]
```

## Inspect processed hashes

```js
PEACE_WEBHOOK_DEBUG.getProcessedHashes()
```

Example:

```js
[
  "e3b0c44298fc1c149afbf4c8996fb924..."
]
```

## Preview content normalization

```js
PEACE_WEBHOOK_DEBUG.normalizeContent(
  "Hello @alice https://example.com 😀"
);
```

Use this to understand what content is hashed and sent when message-body filtering is enabled.

## Clear processed records

```js
PEACE_WEBHOOK_DEBUG.clearProcessedRecords()
```

Example result:

```js
{
  domain: "example.com",
  persisted: true
}
```

This affects only the current hostname.

## Reload processed records

```js
PEACE_WEBHOOK_DEBUG.reloadProcessedRecords()
```

This reloads records from userscript storage and returns the latest state snapshot.

## Debug API availability

The Debug API exists only when:

```js
CONFIG.enableDebug === true
```

When debugging is disabled, `PEACE_WEBHOOK_DEBUG` is removed.

---

## Safe Redirect

The current script includes a safety timer.

After seven continuous days of monitoring, it attempts to:

1. Send a final webhook message.
2. Redirect the page to:

```text
https://www.bing.com/search?q=peace
```

Stopping monitoring cancels this timer.

---

## Troubleshooting

### Start reports that selectors are missing

Configure both required selectors:

```text
Message container selector
Message key selector
```

Then click **Start** again.

### No message containers are found

Test the selector in Chrome DevTools:

```js
document.querySelectorAll("your-selector")
```

The result should contain the expected message elements.

### A container has zero or multiple keys

Test the key selector inside one message:

```js
const message = document.querySelector("your-container-selector");

[
  ...(message.matches("your-key-selector") ? [message] : []),
  ...message.querySelectorAll("your-key-selector")
]
```

The result must contain exactly one element.

### Unimportant text is included

Add the unwanted descendants to the exclusion selector:

```css
.metadata, .reaction, .view-count
```

### The page does not scroll

Check the configured scroll element:

```js
document.querySelector(
  PEACE_WEBHOOK_CONFIG.getSelectors().messageListScrollSelector
)
```

For pages that scroll the entire document instead of an internal element, use a custom `afterScan` callback.

### A message is not sent again

It may already exist in the current domain’s processed-message history.

Inspect or clear it:

```js
PEACE_WEBHOOK_DEBUG.getProcessedRecords();
PEACE_WEBHOOK_DEBUG.clearProcessedRecords();
```

### The webhook request fails

Check:

* The endpoint begins with `http://` or `https://`.
* The API key is correct.
* The endpoint accepts `POST` requests.
* The endpoint accepts JSON containing a `content` field.
* The userscript metadata permits connections to the endpoint domain.
* The browser console contains no network, timeout, or HTTP errors.

---

## Security Notes

* Do not paste API keys into ordinary page scripts.
* Configure the API key through the userscript menu.
* Do not expose `PEACE_WEBHOOK_DEBUG` output publicly.
* Review selectors carefully before monitoring private pages.
* Confirm what content filtering produces before sending page data to a remote endpoint.
* Use an HTTPS webhook endpoint whenever possible.
