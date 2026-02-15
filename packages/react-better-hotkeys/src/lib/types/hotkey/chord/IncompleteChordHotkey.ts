import type { ChordHotkey } from "../definition/ChordHotkey";

export type IncompleteHotkey = {
  hotkey: ChordHotkey;
  timeoutId: number;
};
