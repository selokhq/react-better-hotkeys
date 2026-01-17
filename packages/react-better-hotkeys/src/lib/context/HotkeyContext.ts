import { createContext } from "react";
import type { HotkeyRegistry } from "../HotkeyRegistry";
import type { HotkeyTextResolver } from "../HotkeyTextResolver";

export type HotkeyContextProps = {
  registry: HotkeyRegistry;
  textResolver: HotkeyTextResolver;
};

export const HotkeyContext = createContext<HotkeyContextProps | undefined>(
  undefined,
);
