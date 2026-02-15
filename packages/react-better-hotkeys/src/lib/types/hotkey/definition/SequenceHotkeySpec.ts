import type { PrimaryKey } from "../../key/PrimaryKey";

export type SequenceHotkeySpec = {
  type: "sequence";
  keys: PrimaryKey[];
};
