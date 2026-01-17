import type { PropsWithChildren } from "react";
import { useContext, useEffect, useState } from "react";
import type { HotkeyContextProps } from "./HotkeyContext";
import { HotkeyContext } from "./HotkeyContext";
import { HotkeyRegistry } from "../HotkeyRegistry";
import type { HotkeyProviderProps } from "../types/hotkey/provider/HotkeyProviderProps";
import { HotkeyTextResolver } from "../HotkeyTextResolver";

export function HotkeyProvider({
  children,
  sequenceTimeout,
  chordTimeout,
  sequenceDelimiter,
  chordDelimiter,
  customSymbolMap,
}: PropsWithChildren<HotkeyProviderProps>) {
  const parentContext = useContext(HotkeyContext);

  const [state] = useState<HotkeyContextProps>(() => {
    const textResolver =
      parentContext?.textResolver ??
      new HotkeyTextResolver(
        customSymbolMap,
        chordDelimiter,
        sequenceDelimiter,
      );
    const registry = new HotkeyRegistry(
      sequenceTimeout,
      chordTimeout,
      textResolver,
    );
    return { registry: registry, textResolver: textResolver };
  });

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) =>
      state.registry.handleKeydown(event);
    const handleKeyup = (event: KeyboardEvent) =>
      state.registry.handleKeyup(event);
    addEventListener("keydown", handleKeydown);
    addEventListener("keyup", handleKeyup);

    return () => {
      removeEventListener("keydown", handleKeydown);
      removeEventListener("keyup", handleKeyup);
    };
  }, [state.registry]);

  return (
    <HotkeyContext.Provider value={state}>{children}</HotkeyContext.Provider>
  );
}
