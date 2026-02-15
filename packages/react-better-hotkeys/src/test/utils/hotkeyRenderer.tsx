import type * as _lib from "react-better-hotkeys";
import type { UseHotkeyFn } from "react-better-hotkeys/types/hotkey/UseHotkeyFn";
import type { PropsWithChildren } from "react";
import { useEffect, useRef, type ReactNode } from "react";
import type { HotkeyProviderProps } from "../../../dist/types/hotkey/provider/HotkeyProviderProps";
import type { ChordHotkeySpec } from "../../../dist/types/hotkey/definition/ChordHotkeySpec";
import type { ChordHotkey } from "../../../dist/types/hotkey/definition/ChordHotkey";
import type { SequenceHotkey } from "../../../dist/types/hotkey/definition/SequenceHotkey";
import type { HotkeySpec } from "../../../dist/types/hotkey/definition/HotkeySpec";
import type { Hotkey } from "../../../dist/types/hotkey/definition/Hotkey";
export type ReactHotkeys = typeof _lib;

type HotkeyInput = HotkeySpec | HotkeySpec[];

type HotkeyOut<T extends HotkeyInput> = T extends readonly HotkeySpec[]
  ? Hotkey[]
  : T extends ChordHotkeySpec
    ? ChordHotkey
    : SequenceHotkey;

type HotkeyHarnessProps<T extends HotkeyInput> = {
  RH: ReactHotkeys;
  callback: Parameters<UseHotkeyFn>[1];
  options?: Parameters<UseHotkeyFn>[2];
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
  options,
  out,
  childrenWrapper,
}: HotkeyHarnessProps<T>) {
  const { useHotkey } = RH;

  const res = useHotkey(
    hotkey as Parameters<UseHotkeyFn>[0],
    callback,
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
