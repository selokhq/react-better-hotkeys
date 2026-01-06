import { detectOS } from "../util/detectOS";

import { ALL_MODIFIER_KEY_CODES } from "./ModifierKeyCodes";
import { KeyMap } from "./KeyMap";
import type { ChordNode } from "../types/hotkey/chord/ChordNode";
import type { ModifierKeyCode } from "../types/key/ModifierKeyCode";
import type { PrimaryKeyCode } from "../types/key/PrimaryKeyCode";
import type { PrimaryKeyValue } from "../types/key/PrimaryKeyValue";
import type { HotKeyDefChordBase } from "../types/hotkey/HotKeyDefChordBase";

export const createHotkeyChordBuilder = (
  mods: ModifierKeyCode[],
): ChordNode<ModifierKeyCode, PrimaryKeyCode | PrimaryKeyValue> =>
  new Proxy(
    {},
    {
      get(_t, prop) {
        if (typeof prop !== "string") return undefined;
        if (ALL_MODIFIER_KEY_CODES.indexOf(prop as ModifierKeyCode) === -1) {
          const info = KeyMap[prop as PrimaryKeyCode | PrimaryKeyValue];

          const modifier: Record<Exclude<ModifierKeyCode, "Mod">, boolean> = {
            Meta: false,
            Alt: false,
            Control: false,
            Shift: false,
          };

          mods.forEach((m) => {
            if (m === "Mod") {
              modifier[detectOS() === "macOS" ? "Meta" : "Control"] = true;
            } else modifier[m] = true;
          });

          const def: HotKeyDefChordBase = {
            type: "chord",
            modifier: modifier,
            resolve: info.on,
            primaryValue: info.value,
          };
          return def;
        }
        // Each access consumes the key by returning a *new* proxy state
        return createHotkeyChordBuilder([...mods, prop as ModifierKeyCode]);
      },
    },
  ) as ChordNode<ModifierKeyCode, PrimaryKeyCode | PrimaryKeyValue>;
