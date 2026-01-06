function getEventTargetElement(e: Event): Element | null {
  const anyE = e as Event & { composedPath?: () => EventTarget[] };

  const path =
    typeof anyE.composedPath === "function" ? anyE.composedPath() : null;
  const firstElementInPath =
    path?.find((n): n is Element => n instanceof Element) ?? null;

  const target = (firstElementInPath ?? e.target) as EventTarget | null;
  return target instanceof Element ? target : null;
}

function isNativeTextInput(el: Element): el is HTMLInputElement {
  if (!(el instanceof HTMLInputElement)) return false;

  const type = (el.type || "").toLowerCase();
  return (
    type === "text" ||
    type === "search" ||
    type === "url" ||
    type === "tel" ||
    type === "email" ||
    type === "password" ||
    type === "number"
  );
}

function isEditableElement(el: Element | null): boolean {
  if (!el) return false;

  // contenteditable region (treat "true" or empty as editable; ignore explicit "false")
  const ceHost = el.closest("[contenteditable]");
  if (ceHost) {
    const ce = ceHost.getAttribute("contenteditable");
    if (ce !== "false") return true;
  }

  // textarea
  const ta = el.closest("textarea");
  if (ta instanceof HTMLTextAreaElement) {
    return !ta.readOnly && !ta.disabled;
  }

  // input (text-like)
  const input = el.closest("input");
  if (input instanceof HTMLInputElement && isNativeTextInput(input)) {
    return !input.readOnly && !input.disabled;
  }

  // ARIA textbox-ish roles (best-effort: don't steal keys from custom widgets)
  const ariaEditable = el.closest(
    '[role="textbox"],[role="searchbox"],[role="combobox"],[role="spinbutton"]',
  );
  if (ariaEditable) return true;

  return false;
}

export function isEditingKeystrokeContext(e: KeyboardEvent): boolean {
  // IME/composition in progress
  if (e.isComposing) return true;

  const el = getEventTargetElement(e);
  return isEditableElement(el);
}
