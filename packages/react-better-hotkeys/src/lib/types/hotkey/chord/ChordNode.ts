import type { ChordHotkeySpec } from "../definition/ChordHotkeySpec";

export type ChordNode<Modifier extends string, Keys extends string> = {
  readonly [K in Keys]: ChordHotkeySpec;
} & {
  readonly [K in Modifier]: ChordNode<Exclude<Modifier, K>, Keys>;
};
