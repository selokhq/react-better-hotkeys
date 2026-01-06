import type { KeyDescription } from "../types/key/KeyDescription";
import type { PrimaryKeyCode } from "../types/key/PrimaryKeyCode";
import type { PrimaryKeyValue } from "../types/key/PrimaryKeyValue";

export const KeyMap: Record<PrimaryKeyCode, KeyDescription<"code">> &
  Record<PrimaryKeyValue, KeyDescription<"key">> = {
  Zero: {
    on: "code",
    value: "Digit0",
  },
  One: {
    on: "code",
    value: "Digit1",
  },
  Two: {
    on: "code",
    value: "Digit2",
  },
  Three: {
    on: "code",
    value: "Digit3",
  },
  Four: {
    on: "code",
    value: "Digit4",
  },
  Five: {
    on: "code",
    value: "Digit5",
  },
  Six: {
    on: "code",
    value: "Digit6",
  },
  Seven: {
    on: "code",
    value: "Digit7",
  },
  Eight: {
    on: "code",
    value: "Digit8",
  },
  Nine: {
    on: "code",
    value: "Digit9",
  },
  A: {
    on: "code",
    value: "KeyA",
  },
  B: {
    on: "code",
    value: "KeyB",
  },
  C: {
    on: "code",
    value: "KeyC",
  },
  D: {
    on: "code",
    value: "KeyD",
  },
  E: {
    on: "code",
    value: "KeyE",
  },
  F: {
    on: "code",
    value: "KeyF",
  },
  G: {
    on: "code",
    value: "KeyG",
  },
  H: {
    on: "code",
    value: "KeyH",
  },
  I: {
    on: "code",
    value: "KeyI",
  },
  J: {
    on: "code",
    value: "KeyJ",
  },
  K: {
    on: "code",
    value: "KeyK",
  },
  L: {
    on: "code",
    value: "KeyL",
  },
  M: {
    on: "code",
    value: "KeyM",
  },
  N: {
    on: "code",
    value: "KeyN",
  },
  O: {
    on: "code",
    value: "KeyO",
  },
  P: {
    on: "code",
    value: "KeyP",
  },
  Q: {
    on: "code",
    value: "KeyQ",
  },
  R: {
    on: "code",
    value: "KeyR",
  },
  S: {
    on: "code",
    value: "KeyS",
  },
  T: {
    on: "code",
    value: "KeyT",
  },
  U: {
    on: "code",
    value: "KeyU",
  },
  V: {
    on: "code",
    value: "KeyV",
  },
  W: {
    on: "code",
    value: "KeyW",
  },
  X: {
    on: "code",
    value: "KeyX",
  },
  Y: {
    on: "code",
    value: "KeyY",
  },
  Z: {
    on: "code",
    value: "KeyZ",
  },
  F1: {
    on: "code",
    value: "F1",
  },
  F2: {
    on: "code",
    value: "F2",
  },
  F3: {
    on: "code",
    value: "F3",
  },
  F4: {
    on: "code",
    value: "F4",
  },
  F5: {
    on: "code",
    value: "F5",
  },
  F6: {
    on: "code",
    value: "F6",
  },
  F7: {
    on: "code",
    value: "F7",
  },
  F8: {
    on: "code",
    value: "F8",
  },
  F9: {
    on: "code",
    value: "F9",
  },
  F10: {
    on: "code",
    value: "F10",
  },
  F11: {
    on: "code",
    value: "F11",
  },
  F12: {
    on: "code",
    value: "F12",
  },
  NumLock: {
    on: "code",
    value: "", //TODO
  },
  Numpad0: {
    on: "code",
    value: "", //TODO
  },
  Numpad1: {
    on: "code",
    value: "", //TODO
  },
  Numpad2: {
    on: "code",
    value: "", //TODO
  },
  Numpad3: {
    on: "code",
    value: "", //TODO
  },
  Numpad4: {
    on: "code",
    value: "", //TODO
  },
  Numpad5: {
    on: "code",
    value: "", //TODO
  },
  Numpad6: {
    on: "code",
    value: "", //TODO
  },
  Numpad7: {
    on: "code",
    value: "", //TODO
  },
  Numpad8: {
    on: "code",
    value: "", //TODO
  },
  Numpad9: {
    on: "code",
    value: "", //TODO
  },
  NumpadAdd: {
    on: "code",
    value: "", //TODO
  },
  NumpadDecimal: {
    on: "code",
    value: "", //TODO
  },
  NumpadDivide: {
    on: "code",
    value: "", //TODO
  },
  NumpadEnter: {
    on: "code",
    value: "", //TODO
  },
  NumpadEqual: {
    on: "code",
    value: "", //TODO
  },
  NumpadMultiply: {
    on: "code",
    value: "", //TODO
  },
  NumpadSubtract: {
    on: "code",
    value: "", //TODO
  },
  ArrowDown: {
    on: "code",
    value: "ArrowDown",
  },
  ArrowLeft: {
    on: "code",
    value: "ArrowLeft",
  },
  ArrowRight: {
    on: "code",
    value: "ArrowRight",
  },
  ArrowUp: {
    on: "code",
    value: "ArrowUp",
  },
  Backquote: {
    on: "code",
    value: "Backquote",
  },
  Backslash: {
    on: "code",
    value: "Backslash",
  },
  Backspace: {
    on: "code",
    value: "Backspace",
  },
  BracketLeft: {
    on: "code",
    value: "BracketLeft",
  },
  BracketRight: {
    on: "code",
    value: "BracketRight",
  },
  CapsLock: {
    on: "code",
    value: "CapsLock",
  },
  Comma: {
    on: "code",
    value: "Comma",
  },
  Delete: {
    on: "code",
    value: "Delete",
  },
  End: {
    on: "code",
    value: "", //TODO
  },
  Enter: {
    on: "code",
    value: "Enter",
  },
  Equal: {
    on: "code",
    value: "Equal",
  },
  Escape: {
    on: "code",
    value: "Escape",
  },
  Minus: {
    on: "code",
    value: "Minus",
  },
  Home: {
    on: "code",
    value: "", // TODO
  },
  PageDown: {
    on: "code",
    value: "", //TODO
  },
  PageUp: {
    on: "code",
    value: "", //TODO
  },
  Period: {
    on: "code",
    value: "Period",
  },
  Quote: {
    on: "code",
    value: "Quote",
  },
  Semicolon: {
    on: "code",
    value: "Semicolon",
  },
  Slash: {
    on: "code",
    value: "Slash",
  },
  Space: {
    on: "code",
    value: "Space",
  },
  Tab: {
    on: "code",
    value: "Tab",
  },
  KeyZero: {
    on: "key",
    value: "0",
  },
  KeyOne: {
    on: "key",
    value: "1",
  },
  KeyTwo: {
    on: "key",
    value: "2",
  },
  KeyThree: {
    on: "key",
    value: "3",
  },
  KeyFour: {
    on: "key",
    value: "4",
  },
  KeyFive: {
    on: "key",
    value: "5",
  },
  KeySix: {
    on: "key",
    value: "6",
  },
  KeySeven: {
    on: "key",
    value: "7",
  },
  KeyEight: {
    on: "key",
    value: "8",
  },
  KeyNine: {
    on: "key",
    value: "9",
  },
  KeyA: {
    on: "key",
    value: "a",
  },
  KeyB: {
    on: "key",
    value: "b",
  },
  KeyC: {
    on: "key",
    value: "c",
  },
  KeyD: {
    on: "key",
    value: "d",
  },
  KeyE: {
    on: "key",
    value: "e",
  },
  KeyF: {
    on: "key",
    value: "f",
  },
  KeyG: {
    on: "key",
    value: "g",
  },
  KeyH: {
    on: "key",
    value: "h",
  },
  KeyI: {
    on: "key",
    value: "i",
  },
  KeyJ: {
    on: "key",
    value: "j",
  },
  KeyK: {
    on: "key",
    value: "k",
  },
  KeyL: {
    on: "key",
    value: "l",
  },
  KeyM: {
    on: "key",
    value: "m",
  },
  KeyN: {
    on: "key",
    value: "n",
  },
  KeyO: {
    on: "key",
    value: "o",
  },
  KeyP: {
    on: "key",
    value: "p",
  },
  KeyQ: {
    on: "key",
    value: "q",
  },
  KeyR: {
    on: "key",
    value: "r",
  },
  KeyS: {
    on: "key",
    value: "s",
  },
  KeyT: {
    on: "key",
    value: "t",
  },
  KeyU: {
    on: "key",
    value: "u",
  },
  KeyV: {
    on: "key",
    value: "v",
  },
  KeyW: {
    on: "key",
    value: "w",
  },
  KeyX: {
    on: "key",
    value: "x",
  },
  KeyY: {
    on: "key",
    value: "y",
  },
  KeyZ: {
    on: "key",
    value: "z",
  },
  KeyBackquote: {
    on: "key",
    value: "`",
  },
  KeyBackslash: {
    on: "key",
    value: "\\",
  },
  KeyBackspace: {
    on: "key",
    value: "Backspace",
  },
  KeyBracketLeft: {
    on: "key",
    value: "[",
  },
  KeyBracketRight: {
    on: "key",
    value: "]",
  },
  KeyComma: {
    on: "key",
    value: ",",
  },
  KeyEqual: {
    on: "key",
    value: "=",
  },
  KeyMinus: {
    on: "key",
    value: "-",
  },
  KeyPeriod: {
    on: "key",
    value: ".",
  },
  KeyQuote: {
    on: "key",
    value: "'",
  },
  KeySemicolon: {
    on: "key",
    value: ";",
  },
  KeySlash: {
    on: "key",
    value: "/",
  },
  KeySpace: {
    on: "key",
    value: " ",
  },
};
