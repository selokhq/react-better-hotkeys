import type { HotKeyDefChordBase } from "../types/hotkey/HotKeyDefChordBase";
import type { HotKeyDefSequenceBase } from "../types/hotkey/HotKeyDefSequenceBase";
import type { HotKeyChordDef } from "../types/hotkey/HotKeyChordDef";
import type { HotKeySequenceDef } from "../types/hotkey/HotKeySequenceDef";
import type { HotkeyCallback } from "../types/hotkey/HotkeyCallback";
import type { HotkeyOptions } from "../types/hotkey/HotkeyOptions";
import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { HotkeyContext } from "../context/HotkeyContext";
import { KeyMap } from "../definitions/KeyMap";
import type { PrimaryKey } from "../types/key/PrimaryKey";
import { isPrimaryKeyCode } from "../util/isPrimaryKeyCode";
import type { ResolvedKeyStatus } from "../types/hotkey/renderer/ResolvedKeyStatus";

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
  options?: Partial<HotkeyOptions>,
): ChordOut;
export function useHotkey(
  hotkey: SequenceIn,
  callback: HotkeyCallback,
  options?: Partial<HotkeyOptions>,
): SequenceOut;
export function useHotkey<const T extends readonly (ChordIn | SequenceIn)[]>(
  hotkey: T,
  callback: HotkeyCallback,
  options?: Partial<HotkeyOptions>,
): HotkeyMapping<typeof hotkey>;

export function useHotkey<const T extends readonly (ChordIn | SequenceIn)[]>(
  hotkey: ChordIn | SequenceIn | T,
  callback: HotkeyCallback,
  options?: Partial<HotkeyOptions>,
) {
  const hotkeyContext = useContext(HotkeyContext);
  const id = useId();

  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const _options: HotkeyOptions = useMemo(
    () => ({
      preventDefault: true,
      enableOnContentEditable: false,
      disabled: false,
      ...options,
    }),
    [options],
  );

  const resolveKey = useCallback(
    (k: PrimaryKey): [string, ResolvedKeyStatus] => {
      return isPrimaryKeyCode(k)
        ? (hotkeyContext?.textResolver.resolve(k) ?? [
            KeyMap[`Key${k}` as PrimaryKey].value,
            "unknown",
          ])
        : [KeyMap[k].value, "unknown"];
    },
    [hotkeyContext?.textResolver],
  );

  const createSequenceOut = useCallback(
    (hk: SequenceIn, index?: number) => {
      const hotkey: SequenceOut = {
        ...hk,
        options: _options,
        id: index == null ? id : `${id}-${index}`,
        callbackRef,
        toParts: () => [
          hk.keys.map((k) => {
            return resolveKey(k);
          }),
          hotkeyContext?.textResolver.delimiterForType(hk.type) ?? "",
        ],
        toString: () => {
          return hotkeyContext?.textResolver.toString(hotkey) ?? "";
        },
      };
      return hotkey;
    },
    [_options, hotkeyContext?.textResolver, id, resolveKey],
  );

  const createChordOut = useCallback(
    (hk: ChordIn, index?: number) => {
      const hotkey: ChordOut = {
        ...hk,
        options: _options,
        id: index == null ? id : `${id}-${index}`,
        callbackRef,
        toParts: () => [
          [
            ...Object.entries(hk.modifier)
              .filter((e) => e[1])
              .map((e) => [e[0], "valid"] as [string, ResolvedKeyStatus]),
            resolveKey(hk.keyId),
          ],
          hotkeyContext?.textResolver.delimiterForType(hk.type) ?? "",
        ],
        toString: () => {
          return hotkeyContext?.textResolver.toString(hotkey) ?? "";
        },
      };
      return hotkey;
    },
    [_options, hotkeyContext?.textResolver, id, resolveKey],
  );

  const entries = useMemo<HotkeyMapping<T> | ChordOut | SequenceOut>(() => {
    if (isHotkeyArray(hotkey)) {
      return hotkey.map((hk, i) => {
        if (hk.type === "chord") {
          return createChordOut(hk, i);
        } else {
          return createSequenceOut(hk, i);
        }
      }) as HotkeyMapping<typeof hotkey>;
    } else {
      if (hotkey.type === "chord") return createChordOut(hotkey);
      return createSequenceOut(hotkey);
    }
  }, [createChordOut, createSequenceOut, hotkey]); // TODO: this will trigger on every render, right?

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
  }, [entries]);

  return entries;
}
