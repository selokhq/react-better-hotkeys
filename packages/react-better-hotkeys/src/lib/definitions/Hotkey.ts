import type { HotkeyChordBuilder } from "../types/hotkey/chord/HotkeyChordBuilder";
import type { HotkeySequenceBuilder } from "../types/hotkey/sequence/HotkeySequenceBuilder";
import { createHotkeyChordBuilder } from "./Chord";
import { createHotkeySequenceBuilder } from "./Sequence";

export const Hotkey = {
  get Chord(): HotkeyChordBuilder {
    return createHotkeyChordBuilder([]);
  },
  get Sequence(): HotkeySequenceBuilder {
    return createHotkeySequenceBuilder([]);
  },
} as const;
