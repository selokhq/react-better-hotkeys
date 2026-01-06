import type { HotKeyDefChordBase } from "../types/hotkey/HotKeyDefChordBase";
import type { HotKeyDefSequenceBase } from "../types/hotkey/HotKeyDefSequenceBase";
import type { HotKeyChordDef } from "../types/hotkey/HotKeyChordDef";
import type { HotKeySequenceDef } from "../types/hotkey/HotKeySequenceDef";
import type { HotkeyCallback } from "../types/hotkey/HotkeyCallback";
import type { HotkeyOptions } from "../types/hotkey/HotkeyOptions";
import { useContext, useEffect, useId, useLayoutEffect, useMemo } from "react";
import { HotkeyContext } from "../context/HotkeyContext";

type ChordIn = HotKeyDefChordBase;
type SequenceIn = HotKeyDefSequenceBase;
type ChordOut = HotKeyChordDef;
type SequenceOut = HotKeySequenceDef;

const useSafeLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type HotkeyMapping<T extends readonly (ChordIn | SequenceIn)[]> = {
  [K in keyof T]: T[K] extends ChordIn ? ChordOut : SequenceOut;
};
function isHotkeyArray<const T extends readonly (ChordIn | SequenceIn)[]>(
  value: ChordIn | SequenceIn | T,
): value is T {
  return Array.isArray(value);
}

export function useHotkey(
  hotkey: ChordIn,
  callback: HotkeyCallback,
  dependencies?: unknown[],
  options?: Partial<HotkeyOptions>,
): ChordOut;
export function useHotkey(
  hotkey: SequenceIn,
  callback: HotkeyCallback,
  dependencies?: unknown[],
  options?: Partial<HotkeyOptions>,
): SequenceOut;
export function useHotkey<const T extends readonly (ChordIn | SequenceIn)[]>(
  hotkey: T,
  callback: HotkeyCallback,
  dependencies?: unknown[],
  options?: Partial<HotkeyOptions>,
): HotkeyMapping<typeof hotkey>;

export function useHotkey<const T extends readonly (ChordIn | SequenceIn)[]>(
  hotkey: ChordIn | SequenceIn | T,
  callback: HotkeyCallback,
  dependencies?: unknown[],
  options?: Partial<HotkeyOptions>,
) {
  const hotkeyContext = useContext(HotkeyContext);
  const id = useId();

  const _options: HotkeyOptions = useMemo(
    () => ({
      preventDefault: true,
      enableOnContentEditable: false,
      disabled: false,
      ...options,
    }),
    [options],
  );

  const entries = useMemo<HotkeyMapping<T> | ChordOut | SequenceOut>(() => {
    if (isHotkeyArray(hotkey)) {
      return hotkey.map((hk, i) =>
        hk.type === "chord"
          ? ({
              ...hk,
              options: _options,
              id: `${id}-${i}`,
              callback,
              toParts: () => [[], ""],
              toString: () => "",
            } satisfies ChordOut)
          : ({
              ...hk,
              options: _options,
              id: `${id}-${i}`,
              callback,
              toParts: () => [[], ""],
              toString: () => "",
            } satisfies SequenceOut),
      ) as HotkeyMapping<typeof hotkey>;
    } else {
      return {
        ...hotkey,
        options: _options,
        id: id,
        callback,
        toParts: () => [[], ""],
        toString: () => "",
      };
    }
  }, [_options, callback, hotkey, id]); // TODO: this will trigger on every render, right?

  useSafeLayoutEffect(() => {
    if (hotkeyContext == null) {
      console.warn(
        "No HotkeyContext provided. Use <HotkeyProvider> to provide a HotkeyContext",
      );
      return;
    }

    const arr = Array.isArray(entries) ? entries : [entries];

    arr.forEach((entry) => {
      if (entry.type === "chord") {
        hotkeyContext.registry.addChordHotkey(entry);
      } else {
        hotkeyContext.registry.addSequenceHotkey(entry);
      }
    });

    return () => {
      arr.forEach((entry) => {
        if (entry.type === "chord") {
          hotkeyContext.registry.removeChordHotkey(entry.id);
        } else {
          hotkeyContext.registry.removeSequenceHotkey(entry.id);
        }
      });
    };
  }, [entries, ...(dependencies ? dependencies : [])]);

  return entries;
}
