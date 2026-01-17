import type * as _lib from "react-better-hotkeys";
import type { UseHotkeyFn } from "react-better-hotkeys/types/hotkey/UseHotkeyFn";
import type { HotKeyDefChordBase } from "react-better-hotkeys/types/hotkey/HotKeyDefChordBase";
import type { HotKeyDefSequenceBase } from "react-better-hotkeys/types/hotkey/HotKeyDefSequenceBase";
import type { HotKeyChordDef } from "react-better-hotkeys/types/hotkey/HotKeyChordDef";
import type { HotKeySequenceDef } from "react-better-hotkeys/types/hotkey/HotKeySequenceDef";
import type { PropsWithChildren } from "react";
import { useEffect, useRef, type ReactNode } from "react";
import type { HotkeyProviderProps } from "../../../dist/types/hotkey/provider/HotkeyProviderProps";
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
  providerProps?: HotkeyProviderProps;
  onRender?: (n: number) => void;
  childrenWrapper?: (hotkeys: HotkeyOut<T>) => ReactNode;
};

function Wrapper<const T extends HotkeyInput>({
  RH,
  hotkey,
  callback,
  dependencies,
  options,
  out,
  childrenWrapper,
}: HotkeyHarnessProps<T>) {
  const { useHotkey } = RH;

  const res = useHotkey(
    hotkey as Parameters<UseHotkeyFn>[0],
    callback,
    dependencies,
    options,
  ) as HotkeyOut<T>;

  useEffect(() => {
    out?.(res);
  }, [out, res]);

  return <>{childrenWrapper?.(res)}</>;
}

function WithRenderCount({
  children,
  onRender,
}: PropsWithChildren<{
  onRender?: (n: number) => void;
}>) {
  const count = useRef(0);
  // eslint-disable-next-line react-hooks/refs
  count.current += 1;
  // eslint-disable-next-line react-hooks/refs
  onRender?.(count.current);
  return <>{children}</>;
}

export function HotkeyHarness<const T extends HotkeyInput>({
  providerProps,
  onRender,
  ...props
}: HotkeyHarnessProps<T>): ReactNode {
  const { HotkeyProvider } = props.RH;

  return (
    <HotkeyProvider {...providerProps}>
      <WithRenderCount onRender={onRender}>
        <Wrapper {...props} />
      </WithRenderCount>
    </HotkeyProvider>
  );
}
