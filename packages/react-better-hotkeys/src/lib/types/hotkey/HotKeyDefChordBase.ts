import type { KeyValueType } from "../key/KeyValueType";
import type { ModifierKeyCode } from "../key/ModifierKeyCode";

export type HotKeyDefChordBase = {
  type: "chord";
  resolve: KeyValueType;
  primaryValue: string;
  modifier: Record<Exclude<ModifierKeyCode, "Mod">, boolean>;
};
