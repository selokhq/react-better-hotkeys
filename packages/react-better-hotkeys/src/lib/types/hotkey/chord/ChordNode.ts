import type { HotKeyDefChordBase } from "../HotKeyDefChordBase";

export type ChordNode<Modifier extends string, Keys extends string> = {
  readonly [K in Keys]: HotKeyDefChordBase;
} & {
  readonly [K in Modifier]: ChordNode<Exclude<Modifier, K>, Keys>;
};
