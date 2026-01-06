import { createContext } from "react";
import type { HotkeyRegistry } from "../HotkeyRegistry";

export type HotkeyContextProps = {
  registry: HotkeyRegistry;
};

export const HotkeyContext = createContext<HotkeyContextProps | undefined>(
  undefined,
);
