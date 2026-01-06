import { HotkeyContext } from "./context/HotkeyContext";
import { HotkeyProvider } from "./context/HotkeyProvider";
import { Hotkey } from "./definitions/Hotkey";
import { useHotkey } from "./hooks/useHotkey";
import { detectOS } from "./util/detectOS";

export { Hotkey, useHotkey, HotkeyContext, HotkeyProvider, detectOS };
