import { KeyMap } from "./definitions/KeyMap";
import type { Hotkey } from "./types/hotkey/definition/Hotkey";
import type { HotKeyType } from "./types/hotkey/HotkeyType";
import type { ResolvedKeyStatus } from "./types/hotkey/renderer/ResolvedKeyStatus";
import type { PrimaryKeyCode } from "./types/key/PrimaryKeyCode";

type HotkeyTextResolverSubscriber = {
  id: number;
  callback: (newSymbol: string) => void;
};

type StoredStated = {
  symbolMap: Partial<Record<PrimaryKeyCode, string>>;
  invalidSymbolMap: PrimaryKeyCode[];
};

const SYMBOL_MAPPING_STORAGE_KEY = "rbh-symbols-cache";

export class HotkeyTextResolver {
  symbolMap: Partial<Record<PrimaryKeyCode, string>> = {};
  invalidSymbolMap: Set<PrimaryKeyCode> = new Set();

  chordDelimiter: string;
  sequnceDelimiter: string;

  id: number = Math.random();

  private nextSubscriberId = 0;

  private subscribers: Partial<
    Record<string, Map<number, HotkeyTextResolverSubscriber>>
  > = {};

  constructor(
    symbolMap?: Partial<Record<PrimaryKeyCode, string>>,
    chordDelimiter?: string,
    sequenceDelimiter?: string,
  ) {
    this.chordDelimiter = chordDelimiter ?? "+";
    this.sequnceDelimiter = sequenceDelimiter ?? ">";

    if (!this.loadState()) {
      this.symbolMap = { ...this.buildInitialMap() };
    }
    if (symbolMap) this.insertCustomMap(symbolMap);
  }

  private insertCustomMap(symbolMap: Partial<Record<PrimaryKeyCode, string>>) {
    let changedKeys: PrimaryKeyCode[] = [];
    for (const [key, value] of Object.entries(symbolMap) as [
      PrimaryKeyCode,
      string,
    ][]) {
      if (this.symbolMap[key] !== value) {
        this.symbolMap[key] =
          value.length === 1 ? value.toLocaleUpperCase() : value;
        changedKeys.push(key);
      }
    }
    if (changedKeys.length > 0) {
      this.storeState(changedKeys);
    }
  }

  private stringifyState(): string {
    return JSON.stringify({
      symbolMap: this.symbolMap,
      invalidSymbolMap: Array.from(this.invalidSymbolMap),
    } satisfies StoredStated);
  }

  private buildInitialMap(): Partial<Record<PrimaryKeyCode, string>> {
    return {
      ...Object.entries(KeyMap).reduce<Record<string, string>>((prev, cur) => {
        if (cur[1].on === "code") {
          prev[cur[0]] =
            cur[1].value.length === 1
              ? cur[1].value.toLocaleUpperCase()
              : cur[1].value;
        }
        return prev;
      }, {}),
      ...Object.entries(KeyMap).reduce<Record<string, string>>((prev, cur) => {
        if (cur[1].on === "key") {
          const keyCodeIdentifier = cur[0].slice(3);
          prev[keyCodeIdentifier] =
            cur[1].value.length === 1
              ? cur[1].value.toLocaleUpperCase()
              : cur[1].value;
        }
        return prev;
      }, {}),
    };
  }

  private parseState(state: StoredStated) {
    this.symbolMap = state.symbolMap;
    this.invalidSymbolMap = new Set(state.invalidSymbolMap);
  }

  private storeState(changedKeys: PrimaryKeyCode[]) {
    for (const key of changedKeys) this.invalidSymbolMap.delete(key);
    localStorage.setItem(SYMBOL_MAPPING_STORAGE_KEY, this.stringifyState());
  }

  private loadState(): boolean {
    const stringifiedState = localStorage.getItem(SYMBOL_MAPPING_STORAGE_KEY);
    if (stringifiedState) {
      const state = JSON.parse(stringifiedState) as StoredStated;
      this.parseState(state);
      return true;
    }
    return false;
  }

  public setSymbol(code: string, symbol: string) {
    const entry = Object.entries(KeyMap).find(
      (e) => e[1].on === "code" && e[1].value === code,
    );

    if (entry == null) {
      return;
    }

    const internalCode = entry[0] as PrimaryKeyCode;
    const casedSymbol =
      symbol.length === 1 ? symbol.toLocaleUpperCase() : symbol;

    if (this.symbolMap[internalCode] === casedSymbol) return;
    this.symbolMap[internalCode] = casedSymbol;

    const entryWithSameSymbol = Object.entries(this.symbolMap).find(
      ([c, v]) => c !== internalCode && v === this.symbolMap[internalCode],
    ) as [PrimaryKeyCode, string] | undefined;
    if (entryWithSameSymbol) {
      this.invalidSymbolMap.add(entryWithSameSymbol[0]);
    }

    this.storeState([internalCode]);

    const subs = this.subscribers[internalCode];
    if (!subs) return;

    for (const sub of subs.values()) {
      sub.callback(symbol);
    }
  }

  public resolve(
    code: PrimaryKeyCode,
  ): [string, ResolvedKeyStatus] | undefined {
    const symbol = this.symbolMap[code];
    return symbol != null
      ? [symbol, this.invalidSymbolMap.has(code) ? "invalid" : "valid"]
      : undefined;
  }

  public subscribe(
    code: PrimaryKeyCode,
    callback: (newSymbol: string) => void,
  ): () => void {
    const id = this.nextSubscriberId++;

    if (!this.subscribers[code]) {
      this.subscribers[code] = new Map();
    }

    this.subscribers[code].set(id, { id, callback });

    return () => {
      this.unsubscribe(code, id);
    };
  }

  public unsubscribe(code: PrimaryKeyCode, subscriberId: number): void {
    const subs = this.subscribers[code];
    if (!subs) return;

    subs.delete(subscriberId);

    if (subs.size === 0) {
      Reflect.deleteProperty(this.subscribe, code);
    }
  }

  public delimiterForType(type: HotKeyType): string {
    if (type === "chord") return this.chordDelimiter;
    return this.sequnceDelimiter;
  }

  public toString(hotkey: Hotkey): string {
    const parts = hotkey.toParts();
    return parts[0].map((p) => p[0]).join(parts[1]);
  }
}
