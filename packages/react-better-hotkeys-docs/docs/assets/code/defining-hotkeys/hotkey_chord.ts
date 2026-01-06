import { Hotkey } from "react-better-hotkeys";

Hotkey.Chord.Shift.Alt.A; // valid
Hotkey.Chord.Shift.Alt.Mod.A; // valid
// doc-hide-line
// @ts-expect-error Property 'B' does not exist on type 'HotKeyDefChordBase'.
// This will error
Hotkey.Chord.Shift.A.B; // Property 'B' does not exist on type 'HotKeyDefChordBase'.
// doc-hide-line
// @ts-expect-error Property 'Mod' does not exist on type 'HotKeyDefChordBase'.
// This will error
Hotkey.Chord.Shift.A.Mod; // Property 'Mod' does not exist on type 'HotKeyDefChordBase'.
// doc-hide-line
// @ts-expect-error Property 'Shift' does not exist on type 'ConsumeOnce<"Meta" | "Alt" | "Control" | "Mod", PrimaryKeyCode | PrimaryKeyValue>'.
// This will error
Hotkey.Chord.Shift.Shift.A; // Property 'Shift' does not exist on type 'ConsumeOnce<"Meta" | "Alt" | "Control" | "Mod", PrimaryKeyCode | PrimaryKeyValue>'.
