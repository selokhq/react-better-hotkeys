import type { HotKeyDefSequenceBase } from "../HotKeyDefSequenceBase";

export type SequenceNode<All extends string> = {
  end: HotKeyDefSequenceBase;
} & {
  readonly [K in All]: SequenceNode<All>;
};
