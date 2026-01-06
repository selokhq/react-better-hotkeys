import type { HotKeyChordDef } from "../types/hotkey/HotKeyChordDef";

export function wrongModifierPressed(
  chord: HotKeyChordDef,
  event: KeyboardEvent,
): boolean {
  return (
    (!chord.modifier.Shift && event.shiftKey) ||
    (!chord.modifier.Control && event.ctrlKey) ||
    (!chord.modifier.Alt && event.altKey) ||
    (!chord.modifier.Meta && event.metaKey)
  );
}
