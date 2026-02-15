import { detectOS } from "../util/detectOS";

import { ALL_MODIFIER_KEY_CODES } from "./ModifierKeyCodes";
import { KeyMap } from "./KeyMap";
import type { ChordNode } from "../types/hotkey/chord/ChordNode";
import type { ModifierKeyCode } from "../types/key/ModifierKeyCode";
import type { PrimaryKeyCode } from "../types/key/PrimaryKeyCode";
import type { PrimaryKeyValue } from "../types/key/PrimaryKeyValue";
import type { ChordHotkeySpec } from "../types/hotkey/definition/ChordHotkeySpec";
import type { PrimaryKey } from "../types/key/PrimaryKey";

export const createHotkeyChordBuilder = (
  mods: ModifierKeyCode[],
): ChordNode<ModifierKeyCode, PrimaryKeyCode | PrimaryKeyValue> =>
  new Proxy(
    {},
    {
      get(_t, prop) {
        if (typeof prop !== "string") return undefined;
        if (ALL_MODIFIER_KEY_CODES.indexOf(prop as ModifierKeyCode) === -1) {
          const keyId = prop as PrimaryKey;
          const info = KeyMap[keyId];

          const modifier: Record<Exclude<ModifierKeyCode, "Mod">, boolean> = {
            Shift: false,
            Alt: false,
            Control: false,
            Meta: false,
          };

          mods.forEach((m) => {
            if (m === "Mod") {
              modifier[detectOS() === "macOS" ? "Meta" : "Control"] = true;
            } else modifier[m] = true;
          });

          const def: ChordHotkeySpec = {
            type: "chord",
            modifier: modifier,
            keyId: keyId,
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
