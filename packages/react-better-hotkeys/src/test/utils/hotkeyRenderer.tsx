import type * as _lib from "react-better-hotkeys";
import type { UseHotkeyFn } from "react-better-hotkeys/types/hotkey/UseHotkeyFn";
import type { HotKeyDefChordBase } from "react-better-hotkeys/types/hotkey/HotKeyDefChordBase";
import type { HotKeyDefSequenceBase } from "react-better-hotkeys/types/hotkey/HotKeyDefSequenceBase";
import type { HotKeyChordDef } from "react-better-hotkeys/types/hotkey/HotKeyChordDef";
import type { HotKeySequenceDef } from "react-better-hotkeys/types/hotkey/HotKeySequenceDef";
import type { ReactNode } from "react";
export type ReactHotkeys = typeof _lib;

type ChordIn = HotKeyDefChordBase;
type SequenceIn = HotKeyDefSequenceBase;
type ChordOut = HotKeyChordDef;
type SequenceOut = HotKeySequenceDef;

type SwapAB<T extends readonly (ChordIn | SequenceIn)[]> = {
  [K in keyof T]: T[K] extends ChordIn ? ChordOut : SequenceOut;
};

type HotkeyInput = ChordIn | SequenceIn | readonly (ChordIn | SequenceIn)[];

type HotkeyOut<T extends HotkeyInput> = T extends readonly (
  | ChordIn
  | SequenceIn
)[]
  ? SwapAB<T>
  : T extends ChordIn
    ? ChordOut
    : SequenceOut;

type HotkeyHarnessProps<T extends HotkeyInput> = {
  RH: ReactHotkeys;
  callback: Parameters<UseHotkeyFn>[1];
  dependencies?: Parameters<UseHotkeyFn>[2];
  options?: Parameters<UseHotkeyFn>[3];
  hotkey: T;
  out?: (hotkeys: HotkeyOut<T>) => void;
};

function Wrapper<const T extends HotkeyInput>({
  RH,
  hotkey,
  callback,
  dependencies,
  options,
  out,
}: HotkeyHarnessProps<T>) {
  const { useHotkey } = RH;

  const res = useHotkey(
    hotkey as Parameters<UseHotkeyFn>[0],
    callback,
    dependencies,
    options,
  ) as HotkeyOut<T>;
  out?.(res);

  return <></>;
}

export function HotkeyHarness<const T extends HotkeyInput>(
  props: HotkeyHarnessProps<T>,
): ReactNode {
  const { HotkeyProvider } = props.RH;

  return (
    <HotkeyProvider>
      <Wrapper {...props} />
    </HotkeyProvider>
  );
}
