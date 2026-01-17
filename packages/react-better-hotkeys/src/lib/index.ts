import { HotkeyContext } from "./context/HotkeyContext";
import { HotkeyProvider } from "./context/HotkeyProvider";
import { Hotkey } from "./definitions/Hotkey";
import { useHotkey } from "./hooks/useHotkey";
import { useRenderedHotkey } from "./hooks/useRenderedHotkey";
import { detectOS } from "./util/detectOS";

export {
  Hotkey,
  useHotkey,
  useRenderedHotkey,
  HotkeyContext,
  HotkeyProvider,
  detectOS,
};
