import type { HotkeyCallback } from "./HotkeyCallback";
import type { HotkeyOptions } from "./HotkeyOptions";
import type { HotkeyTextParts } from "./HotkeyTextParts";

export type HotKeyDefBase = {
  id: string;
  callback: HotkeyCallback;
  options: HotkeyOptions;
  toString: () => string;
  toParts: () => HotkeyTextParts;
};
