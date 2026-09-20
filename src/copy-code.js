import copyToClipboard from "copy-to-clipboard";
import { close, msg } from "layer-esm";

const COPY_ATTRIBUTES = {
  role: "button",
  tabindex: "0",
};
const INTERACTIVE_TAGS = new Set([
  "BUTTON",
  "INPUT",
  "LABEL",
  "OPTION",
  "SELECT",
  "SUMMARY",
  "TEXTAREA",
]);
const INTERACTIVE_ROLES = new Set([
  "button",
  "checkbox",
  "link",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "option",
  "radio",
  "switch",
  "tab",
  "treeitem",
]);
const WARNING_PREFIX = "[mazey-polestar]";
const POINTER_COPY_DELAY_MS = 400;

let activeRegistration = null;

function warn (message) {
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn(`${WARNING_PREFIX} ${message}`);
  }
}

function isCodeElement (element) {
  return element && element.nodeType === 1 && element.tagName === "CODE";
}

function findCodeElement (target) {
  let element = target && target.nodeType === 1 ? target : target && target.parentElement;
  while (element) {
    if (isCodeElement(element)) return element;
    element = element.parentElement;
  }
  return null;
}

function isInteractiveElement (element) {
  if (!element || element.nodeType !== 1) return false;
  if (INTERACTIVE_TAGS.has(element.tagName)) return true;
  if (element.tagName === "A" && element.hasAttribute("href")) return true;
  if ((element.tagName === "AUDIO" || element.tagName === "VIDEO") && element.hasAttribute("controls")) return true;
  if (element.hasAttribute("tabindex")) return true;
  const role = String(element.getAttribute("role") || "").trim().toLowerCase();
  return INTERACTIVE_ROLES.has(role);
}

function isEditableElement (element, document) {
  if (String(document.designMode || "").toLowerCase() === "on") return true;

  let current = element;
  while (current && current.nodeType === 1) {
    if (current.tagName === "INPUT" || current.tagName === "TEXTAREA") return true;
    const contentEditable = current.getAttribute("contenteditable");
    if (contentEditable !== null) return contentEditable.trim().toLowerCase() !== "false";
    current = current.parentElement;
  }
  return false;
}

function hasInteractiveAncestor (code) {
  let current = code.parentElement;
  while (current) {
    if (isInteractiveElement(current)) return true;
    current = current.parentElement;
  }
  return false;
}

function hasInteractiveDescendant (element) {
  for (const child of element.children || []) {
    if (isInteractiveElement(child) || hasInteractiveDescendant(child)) return true;
  }
  return false;
}

function hasInteractiveTarget (target, code) {
  let current = target;
  while (current && current !== code) {
    if (isInteractiveElement(current)) return true;
    current = current.parentElement;
  }
  return false;
}

function isEligibleCode (registration, code, target = code) {
  return isCodeElement(code) &&
    !isEditableElement(code, registration.document) &&
    !isEditableElement(target, registration.document) &&
    !hasInteractiveAncestor(code) &&
    !hasInteractiveDescendant(code) &&
    !hasInteractiveTarget(target, code);
}

function restoreOwnedAttributes (registration, code) {
  const owned = registration.ownedAttributes.get(code);
  if (!owned) return;

  for (const [name, values] of owned) {
    if (values.relinquished) continue;
    if (code.getAttribute(name) !== values.applied) continue;
    if (values.previous === null) code.removeAttribute(name);
    else code.setAttribute(name, values.previous);
  }
  registration.ownedAttributes.delete(code);
}

function setOwnedAttribute (registration, code, name, value) {
  let owned = registration.ownedAttributes.get(code);
  const values = owned && owned.get(name);
  if (values) {
    if (values.relinquished) return;
    if (code.getAttribute(name) !== values.applied) {
      values.relinquished = true;
      return;
    }
    if (values.applied !== value) {
      values.applied = value;
      code.setAttribute(name, value);
    }
    return;
  }

  if (code.hasAttribute(name)) return;
  if (!owned) {
    owned = new Map();
    registration.ownedAttributes.set(code, owned);
  }
  owned.set(name, { previous: null, applied: value, relinquished: false });
  code.setAttribute(name, value);
}

function enhanceCode (registration, code) {
  if (!isEligibleCode(registration, code) || code.textContent === "") {
    restoreOwnedAttributes(registration, code);
    return;
  }

  for (const [name, value] of Object.entries(COPY_ATTRIBUTES)) {
    setOwnedAttribute(registration, code, name, value);
  }
  const owned = registration.ownedAttributes.get(code);
  if (!code.hasAttribute("aria-labelledby") &&
      (!code.hasAttribute("aria-label") || (owned && owned.has("aria-label")))) {
    setOwnedAttribute(registration, code, "aria-label", `Copy code: ${code.textContent}`);
  }
}

function selectionIntersectsCode (document, code) {
  const selection = document.getSelection && document.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return false;

  for (let index = 0; index < selection.rangeCount; index += 1) {
    try {
      if (selection.getRangeAt(index).intersectsNode(code)) return true;
    } catch (error) {
      // Ignore stale ranges and preserve the click behavior.
    }
  }
  return false;
}

function closeOwnedMessage (registration) {
  if (registration.messageIndex === null) return;
  const messageIndex = registration.messageIndex;
  registration.messageIndex = null;
  try {
    close(messageIndex);
  } catch (error) {
    warn("Unable to close the copy confirmation.");
  }
}

function showCopiedMessage (registration) {
  closeOwnedMessage(registration);

  try {
    let messageIndex = null;
    messageIndex = msg("Copied", {
      icon: 1,
      time: 2,
      offset: "20px",
      shade: false,
      btn: false,
      end: () => {
        if (registration.messageIndex === messageIndex) registration.messageIndex = null;
      },
    });
    registration.messageIndex = messageIndex;
  } catch (error) {
    warn("Unable to show the copy confirmation.");
  }
}

function cancelPendingPointerCopy (registration) {
  if (registration.pointerCopyTimer === null) return;
  registration.document.defaultView.clearTimeout(registration.pointerCopyTimer);
  registration.pointerCopyTimer = null;
}

function schedulePointerCopy (registration, code, target) {
  cancelPendingPointerCopy(registration);
  registration.pointerCopyTimer = registration.document.defaultView.setTimeout(() => {
    registration.pointerCopyTimer = null;
    if (!registration.document.documentElement.contains(code)) return;
    activateCode(registration, code, target);
  }, POINTER_COPY_DELAY_MS);
}

function isActive (registration) {
  return activeRegistration === registration && !registration.cleaned;
}

function activateCode (registration, code, target = code) {
  if (!isActive(registration)) return false;
  if (!isEligibleCode(registration, code, target)) return false;

  const text = code.textContent;
  if (text === "") return false;
  if (registration.writePending) return true;

  const view = registration.document.defaultView;
  const clipboard = view && view.navigator && view.navigator.clipboard;
  registration.writePending = true;
  let write;
  let usesFallback = false;
  try {
    if (clipboard && typeof clipboard.writeText === "function") {
      write = clipboard.writeText(text);
    } else {
      usesFallback = true;
      write = copyToClipboard(text, { format: "text/plain" });
    }
  } catch (error) {
    registration.writePending = false;
    warn("Unable to copy to the clipboard.");
    return true;
  }

  Promise.resolve(write).then((copied) => {
    registration.writePending = false;
    if (!isActive(registration)) return;
    if (usesFallback && copied !== true) {
      warn("Unable to copy to the clipboard.");
      return;
    }
    showCopiedMessage(registration);
  }, () => {
    registration.writePending = false;
    if (isActive(registration)) warn("Unable to copy to the clipboard.");
  });
  return true;
}

function handleClick (registration, event) {
  const code = findCodeElement(event.target);
  if (!code) return;
  if (event.detail > 1) {
    cancelPendingPointerCopy(registration);
    return;
  }
  if (event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (selectionIntersectsCode(registration.document, code)) return;
  if (!isEligibleCode(registration, code, event.target) || code.textContent === "") return;
  if (event.detail === 0) {
    cancelPendingPointerCopy(registration);
    activateCode(registration, code, event.target);
    return;
  }
  schedulePointerCopy(registration, code, event.target);
}

function handleKeyDown (registration, event) {
  if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") return;

  const code = findCodeElement(event.target);
  if (!code) return;
  cancelPendingPointerCopy(registration);
  if (activateCode(registration, code, event.target) && (event.key === " " || event.key === "Spacebar")) {
    event.preventDefault();
  }
}

function refreshMutation (registration, mutation) {
  const codes = new Set();
  const targetCode = findCodeElement(mutation.target);
  if (targetCode) codes.add(targetCode);
  for (const node of mutation.addedNodes || []) {
    const element = node && node.nodeType === 1 ? node : node && node.parentElement;
    if (!element) continue;
    const ancestorCode = findCodeElement(element);
    if (ancestorCode) codes.add(ancestorCode);
    if (isCodeElement(element)) codes.add(element);
    if (typeof element.querySelectorAll === "function") {
      for (const code of element.querySelectorAll("code")) codes.add(code);
    }
  }
  for (const code of codes) enhanceCode(registration, code);
}

function startRegistration (registration) {
  if (registration.cleaned || registration.started) return;
  registration.started = true;
  const document = registration.document;

  document.addEventListener("click", registration.onClick);
  document.addEventListener("keydown", registration.onKeyDown);
  for (const code of document.querySelectorAll("code")) enhanceCode(registration, code);

  const MutationObserver = document.defaultView && document.defaultView.MutationObserver;
  if (typeof MutationObserver === "function" && document.documentElement) {
    registration.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) refreshMutation(registration, mutation);
    });
    registration.observer.observe(document.documentElement, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  }
}

function initializeCopyCode () {
  if (activeRegistration) return activeRegistration.cleanup;
  const document = typeof window !== "undefined" && window.document;
  if (!document) return () => {};

  const registration = {
    document,
    cleaned: false,
    started: false,
    writePending: false,
    pointerCopyTimer: null,
    messageIndex: null,
    observer: null,
    ownedAttributes: new Map(),
  };
  registration.onClick = (event) => handleClick(registration, event);
  registration.onKeyDown = (event) => handleKeyDown(registration, event);
  registration.onReady = () => startRegistration(registration);
  registration.cleanup = () => {
    if (activeRegistration !== registration || registration.cleaned) return;
    registration.cleaned = true;
    activeRegistration = null;
    document.removeEventListener("DOMContentLoaded", registration.onReady);
    document.removeEventListener("click", registration.onClick);
    document.removeEventListener("keydown", registration.onKeyDown);
    cancelPendingPointerCopy(registration);
    if (registration.observer) registration.observer.disconnect();
    for (const code of Array.from(registration.ownedAttributes.keys())) {
      restoreOwnedAttributes(registration, code);
    }
    closeOwnedMessage(registration);
  };

  activeRegistration = registration;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", registration.onReady, { once: true });
  } else {
    startRegistration(registration);
  }
  return registration.cleanup;
}

if (typeof window !== "undefined") {
  window.MAZEY_COPY_CODE = initializeCopyCode;
}
