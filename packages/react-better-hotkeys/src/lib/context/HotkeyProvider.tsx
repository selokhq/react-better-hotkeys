import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { HotkeyContext } from "./HotkeyContext";
import { HotkeyRegistry } from "../HotkeyRegistry";
import type { HotkeyProviderProps } from "../types/hotkey/provider/HotkeyProviderProps";

export function HotkeyProvider({
  children,
  sequenceTimeout,
}: PropsWithChildren<HotkeyProviderProps>) {
  const [registry] = useState(new HotkeyRegistry(sequenceTimeout));

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) =>
      registry.handleKeydown(event);
    const handleKeyup = (event: KeyboardEvent) => registry.handleKeyup(event);
    addEventListener("keydown", handleKeydown);
    addEventListener("keyup", handleKeyup);

    return () => {
      removeEventListener("keydown", handleKeydown);
      removeEventListener("keyup", handleKeyup);
    };
  }, [registry, registry.handleKeydown, registry.handleKeyup]);

  return (
    <HotkeyContext.Provider value={{ registry: registry }}>
      {children}
    </HotkeyContext.Provider>
  );
}
