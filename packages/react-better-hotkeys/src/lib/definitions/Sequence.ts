import type { HotKeyDefSequenceBase } from "../types/hotkey/HotKeyDefSequenceBase";
import type { SequenceNode } from "../types/hotkey/sequence/SequenceNode";
import type { PrimaryKey } from "../types/key/PrimaryKey";

export const createHotkeySequenceBuilder = (
  mods: PrimaryKey[],
): SequenceNode<PrimaryKey> =>
  new Proxy(
    {},
    {
      get(_t, prop) {
        if (typeof prop !== "string") {
          return undefined;
        }
        if (prop === "end") {
          const def: HotKeyDefSequenceBase = {
            type: "sequence",
            keys: mods,
          };
          return def;
        }
        // Each access consumes the key by returning a *new* proxy state
        return createHotkeySequenceBuilder([...mods, prop as PrimaryKey]);
      },
    },
  ) as SequenceNode<PrimaryKey>;
