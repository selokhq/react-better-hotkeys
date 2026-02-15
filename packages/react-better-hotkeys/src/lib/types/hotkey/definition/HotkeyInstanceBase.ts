import type { RefObject } from "react";
import type { HotkeyCallback } from "../HotkeyCallback";
import type { HotkeyOptions } from "../HotkeyOptions";
import type { HotkeyTextParts } from "../HotkeyTextParts";

export type HotkeyInstanceBase = {
  id: string;
  callbackRef: RefObject<HotkeyCallback>;
  options: HotkeyOptions;
  toString: () => string;
  toParts: () => HotkeyTextParts;
};
