import { useContext, useEffect, useState } from "react";
import type { Hotkey } from "../types/hotkey/definition/Hotkey";
import { HotkeyContext } from "../context/HotkeyContext";
import { toPrimaryKeyCode } from "../util/toPrimaryKeyCode";
import type { RenderedHotkey } from "../types/hotkey/renderer/RenderedHotkey";

export function useRenderedHotkey(hotkey: Hotkey): RenderedHotkey;

export function useRenderedHotkey(hotkey: undefined): undefined;

export function useRenderedHotkey(
  hotkey: Hotkey | undefined,
): RenderedHotkey | undefined;

export function useRenderedHotkey(hotkey: Hotkey | undefined) {
  const cxt = useContext(HotkeyContext);

  const [rendered, setRendered] = useState<RenderedHotkey | undefined>(
    hotkey
      ? {
          asString: hotkey.toString(),
          asParts: hotkey.toParts(),
        }
      : undefined,
  );

  useEffect(() => {
    if (cxt == null || hotkey == null) return;

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
