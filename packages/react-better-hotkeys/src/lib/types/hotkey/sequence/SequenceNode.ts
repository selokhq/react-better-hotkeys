import type { SequenceHotkeySpec } from "../definition/SequenceHotkeySpec";

export type SequenceNode<All extends string> = {
  end: SequenceHotkeySpec;
} & {
  readonly [K in All]: SequenceNode<All>;
};
