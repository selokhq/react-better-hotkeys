import type { ChordHotkeySpec } from "../types/hotkey/definition/ChordHotkeySpec";
import type { SequenceHotkeySpec } from "../types/hotkey/definition/SequenceHotkeySpec";
import type { ChordHotkey } from "../types/hotkey/definition/ChordHotkey";
import type { SequenceHotkey } from "../types/hotkey/definition/SequenceHotkey";
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
import type { HotkeySpec } from "../types/hotkey/definition/HotkeySpec";
import type { Hotkey } from "../types/hotkey/definition/Hotkey";

const useSafeLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useHotkey(
  hotkey: HotkeySpec[],
  callback: HotkeyCallback,
  options?: Partial<HotkeyOptions>,
): Hotkey[];
export function useHotkey(
  hotkey: HotkeySpec[] | undefined,
  callback: HotkeyCallback,
  options?: Partial<HotkeyOptions>,
): Hotkey[] | undefined;
export function useHotkey(
  hotkey: ChordHotkeySpec,
  callback: HotkeyCallback,
  options?: Partial<HotkeyOptions>,
): ChordHotkey;
export function useHotkey(
  hotkey: ChordHotkeySpec | undefined,
  callback: HotkeyCallback,
  options?: Partial<HotkeyOptions>,
): ChordHotkey | undefined;
export function useHotkey(
  hotkey: SequenceHotkeySpec,
  callback: HotkeyCallback,
  options?: Partial<HotkeyOptions>,
): SequenceHotkey;
export function useHotkey(
  hotkey: SequenceHotkeySpec | undefined,
  callback: HotkeyCallback,
  options?: Partial<HotkeyOptions>,
): SequenceHotkey | undefined;
export function useHotkey(
  hotkey: HotkeySpec,
  callback: HotkeyCallback,
  options?: Partial<HotkeyOptions>,
): Hotkey;
export function useHotkey(
  hotkey: HotkeySpec | undefined,
  callback: HotkeyCallback,
  options?: Partial<HotkeyOptions>,
): Hotkey | undefined;

export function useHotkey(
  hotkey: HotkeySpec | HotkeySpec[] | undefined,
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
      let v: [string, ResolvedKeyStatus] = isPrimaryKeyCode(k)
        ? (hotkeyContext?.textResolver.resolve(k) ?? [
            KeyMap[`Key${k}` as PrimaryKey].value,
            "unknown",
          ])
        : [KeyMap[k].value, "unknown"];
      if (v[0].length === 1) v = [v[0].toLocaleUpperCase(), v[1]];
      return v;
    },
    [hotkeyContext?.textResolver],
  );

  const createSequenceHotkey = useCallback(
    (hk: SequenceHotkeySpec, index?: number) => {
      const hotkey: SequenceHotkey = {
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

  const createChordHotkey = useCallback(
    (hk: ChordHotkeySpec, index?: number) => {
      const hotkey: ChordHotkey = {
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

  const entries = useMemo<Hotkey | Hotkey[]>(() => {
    if (hotkey == null) return [];
    if (Array.isArray(hotkey)) {
      return hotkey.map((hk, i) => {
        if (hk.type === "chord") {
          return createChordHotkey(hk, i);
        } else {
          return createSequenceHotkey(hk, i);
        }
      });
    } else {
      if (hotkey.type === "chord") return createChordHotkey(hotkey);
      return createSequenceHotkey(hotkey);
    }
  }, [createChordHotkey, createSequenceHotkey, hotkey]); // TODO: this will trigger on every render, right?

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

  return hotkey ? entries : undefined;
}
