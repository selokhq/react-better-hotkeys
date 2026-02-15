import type { SequenceHotkey } from "../definition/SequenceHotkey";

export type SequenceTree = {
  hotkey: SequenceHotkey[];
  keyBased: Partial<{
    [key in string]: SequenceTree;
  }>;
  codeBased: Partial<{
    [code in string]: SequenceTree;
  }>;
};
