import { Hotkey, useHotkey } from "react-better-hotkeys";

useHotkey(Hotkey.Chord.K, () => {
  // triggered when the key with the keycode "k" gets pressed
});

useHotkey(Hotkey.Chord.KeyK, () => {
  // triggered when the key producing the symbol "k" gets pressed
});
