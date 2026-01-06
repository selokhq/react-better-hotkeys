import type { PrimaryKey } from "../key/PrimaryKey";

export type HotKeyDefSequenceBase = {
  type: "sequence";
  keys: PrimaryKey[];
};
