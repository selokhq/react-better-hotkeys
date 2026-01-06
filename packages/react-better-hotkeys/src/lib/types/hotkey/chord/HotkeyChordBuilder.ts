import type { ModifierKeyCode } from "../../key/ModifierKeyCode";
import type { PrimaryKeyCode } from "../../key/PrimaryKeyCode";
import type { PrimaryKeyValue } from "../../key/PrimaryKeyValue";
import type { ChordNode } from "./ChordNode";

export type HotkeyChordBuilder = ChordNode<
  ModifierKeyCode,
  PrimaryKeyCode | PrimaryKeyValue
>;
