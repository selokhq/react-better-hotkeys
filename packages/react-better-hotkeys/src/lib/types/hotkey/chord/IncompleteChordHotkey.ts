import type { HotKeyChordDef } from "../HotKeyChordDef";

export type IncompleteHotkey = {
  hotkey: HotKeyChordDef;
  timeoutId: number;
};
