import { Hotkey } from "react-better-hotkeys";

Hotkey.Sequence.A.B.C.end; // valid
Hotkey.Sequence.A.A.A.end; // valid
// doc-hide-line
// @ts-expect-error Property 'Shift' does not exist on type 'HotkeySequenceBuilder'.
// This will error
Hotkey.Sequence.Shift.A.B.end; // Property 'Shift' does not exist on type 'HotkeySequenceBuilder'.
// doc-hide-line
// @ts-expect-error Property 'Mod' does not exist on type 'SequenceNode<PrimaryKey>'.
// This will error
Hotkey.Sequence.A.Mod.C.end; // Property 'Mod' does not exist on type 'SequenceNode<PrimaryKey>'.
Hotkey.Sequence.A.C; // incomplete
