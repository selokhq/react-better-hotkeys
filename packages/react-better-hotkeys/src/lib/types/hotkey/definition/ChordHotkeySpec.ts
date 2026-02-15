import type { KeyValueType } from "../../key/KeyValueType";
import type { ModifierKeyCode } from "../../key/ModifierKeyCode";
import type { PrimaryKey } from "../../key/PrimaryKey";

export type ChordHotkeySpec = {
  type: "chord";
  resolve: KeyValueType;
  keyId: PrimaryKey;
  primaryValue: string;
  modifier: Record<Exclude<ModifierKeyCode, "Mod">, boolean>;
};
