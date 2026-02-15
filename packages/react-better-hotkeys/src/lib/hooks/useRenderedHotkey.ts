import { useContext, useEffect, useState } from "react";
import type { Hotkey } from "../types/hotkey/definition/Hotkey";
import { HotkeyContext } from "../context/HotkeyContext";
import { toPrimaryKeyCode } from "../util/toPrimaryKeyCode";
import type { HotkeyTextParts } from "../types/hotkey/HotkeyTextParts";

export function useRenderedHotkey(hotkey: Hotkey) {
  const cxt = useContext(HotkeyContext);

  const [rendered, setRendered] = useState<{
    asString: string;
    asParts: HotkeyTextParts;
  }>({
    asString: hotkey.toString(),
    asParts: hotkey.toParts(),
  });

  useEffect(() => {
    if (cxt == null) return;

    let subscriptions: (() => void)[];
    if (hotkey.type === "chord") {
      subscriptions = [
        cxt.textResolver.subscribe(toPrimaryKeyCode(hotkey.keyId), () => {
          setRendered({
            asParts: hotkey.toParts(),
            asString: hotkey.toString(),
          });
        }),
      ];
    } else {
      subscriptions = hotkey.keys.map((keyId) =>
        cxt.textResolver.subscribe(toPrimaryKeyCode(keyId), () => {
          setRendered({
            asParts: hotkey.toParts(),
            asString: hotkey.toString(),
          });
        }),
      );
    }
    return () => subscriptions.forEach((s) => s());
  }, [cxt, hotkey]);

  return rendered;
}
