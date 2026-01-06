import type { HotKeySequenceDef } from "../HotKeySequenceDef";

export type SequenceTree = {
  hotkey: HotKeySequenceDef[];
  keyBased: Partial<{
    [key in string]: SequenceTree;
  }>;
  codeBased: Partial<{
    [code in string]: SequenceTree;
  }>;
};
