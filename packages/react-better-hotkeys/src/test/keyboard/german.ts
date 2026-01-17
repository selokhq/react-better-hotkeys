import type { keyboardKey } from "@testing-library/user-event";
import { DOM_KEY_LOCATION } from "@testing-library/user-event/dist/cjs/system/keyboard.js";

/**
 * Mapping for a default DE-104-QWERTZ keyboard
 */
export const germanKeyMap: keyboardKey[] = [
  // alphanumeric block - writing system
  ..."0123456789".split("").map((c) => ({ code: `Digit${c}`, key: c })),
  ...'=!\"§$%&/()'
    .split("")
    .map((c, i) => ({ code: `Digit${i}`, key: c, shiftKey: true })),
  ..."abcdefghijklmnopqrstuvwx"
    .split("")
    .map((c) => ({ code: `Key${c.toUpperCase()}`, key: c })),
  ..."ABCDEFGHIJKLMNOPQRSTUVWX"
    .split("")
    .map((c) => ({ code: `Key${c}`, key: c, shiftKey: true })),
  { code: "KeyZ", key: "y" },
  { code: "KeyZ", key: "Y", shiftKey: true },
  { code: "KeyY", key: "z" },
  { code: "KeyY", key: "Z", shiftKey: true },
  { code: "Minus", key: "ß" },
  { code: "Minus", key: "?", shiftKey: true },
  { code: "Equal", key: "´" },
  { code: "Equal", key: "`", shiftKey: true },

  { code: "BracketLeft", key: "ü" },
  { code: "BracketLeft", key: "Ü", shiftKey: true },
  { code: "BracketRight", key: "+", shiftKey: true },
  { code: "BracketRight", key: "*", shiftKey: true },

  { code: "Semicolon", key: "ö" },
  { code: "Semicolon", key: "Ö", shiftKey: true },
  { code: "Quote", key: "ä" },
  { code: "Quote", key: "Ä", shiftKey: true },
  { code: "Backslash", key: "#" },
  { code: "Backslash", key: "'", shiftKey: true },

  { code: "Backquote", key: "<" },
  { code: "Backquote", key: ">", shiftKey: true },
  { code: "Comma", key: "," },
  { code: "Comma", key: ";", shiftKey: true },
  { code: "Period", key: "." },
  { code: "Period", key: ":", shiftKey: true },
  { code: "Slash", key: "-" },
  { code: "Slash", key: "_", shiftKey: true },

  // alphanumeric block - functional
  { code: "Space", key: " " },

  { code: "AltLeft", key: "Alt", location: DOM_KEY_LOCATION.LEFT },
  { code: "AltRight", key: "Alt", location: DOM_KEY_LOCATION.RIGHT },
  { code: "ShiftLeft", key: "Shift", location: DOM_KEY_LOCATION.LEFT },
  { code: "ShiftRight", key: "Shift", location: DOM_KEY_LOCATION.RIGHT },
  { code: "ControlLeft", key: "Control", location: DOM_KEY_LOCATION.LEFT },
  { code: "ControlRight", key: "Control", location: DOM_KEY_LOCATION.RIGHT },
  { code: "MetaLeft", key: "Meta", location: DOM_KEY_LOCATION.LEFT },
  { code: "MetaRight", key: "Meta", location: DOM_KEY_LOCATION.RIGHT },

  { code: "OSLeft", key: "OS", location: DOM_KEY_LOCATION.LEFT },
  { code: "OSRight", key: "OS", location: DOM_KEY_LOCATION.RIGHT },
  { code: "ContextMenu", key: "ContextMenu" },

  { code: "Tab", key: "Tab" },
  { code: "CapsLock", key: "CapsLock" },
  { code: "Backspace", key: "Backspace" },
  { code: "Enter", key: "Enter" },

  // function
  { code: "Escape", key: "Escape" },

  // arrows
  { code: "ArrowUp", key: "ArrowUp" },
  { code: "ArrowDown", key: "ArrowDown" },
  { code: "ArrowLeft", key: "ArrowLeft" },
  { code: "ArrowRight", key: "ArrowRight" },

  // control pad
  { code: "Home", key: "Home" },
  { code: "End", key: "End" },
  { code: "Delete", key: "Delete" },
  { code: "PageUp", key: "PageUp" },
  { code: "PageDown", key: "PageDown" },

  // Special keys that are not part of a default US-layout but included for specific behavior
  { code: "Fn", key: "Fn" },
  { code: "Symbol", key: "Symbol" },
  { code: "AltRight", key: "AltGraph" },
];
