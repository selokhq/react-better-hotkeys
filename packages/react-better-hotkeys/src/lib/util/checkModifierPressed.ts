import type { ChordHotkey } from "../types/hotkey/definition/ChordHotkey";

export function checkModifierPressed(
  chord: ChordHotkey,
  event: KeyboardEvent,
): boolean {
  return (
    chord.modifier.Shift === event.shiftKey &&
    chord.modifier.Control === event.ctrlKey &&
    chord.modifier.Alt === event.altKey &&
    chord.modifier.Meta === event.metaKey
  );
}
