import { KeyMap } from "./definitions/KeyMap";
import type { HotkeyTextResolver } from "./HotkeyTextResolver";
import type { IncompleteHotkey } from "./types/hotkey/chord/IncompleteChordHotkey";
import type { HotKeyChordDef } from "./types/hotkey/HotKeyChordDef";
import type { HotKeySequenceDef } from "./types/hotkey/HotKeySequenceDef";
import type { SequenceTree } from "./types/hotkey/sequence/SequenceTree";
import type { KeyDescription } from "./types/key/KeyDescription";
import type { KeyValueType } from "./types/key/KeyValueType";
import { checkModifierPressed } from "./util/checkModifierPressed";
import { isClearKeydown } from "./util/isCleanKeydown";
import { isEditingKeystrokeContext } from "./util/isEditable";
import { isModifierKeyboardEvent } from "./util/isModifierKeyboardEvent";
import { wrongModifierPressed } from "./util/wrongModifierPressed";

export class HotkeyRegistry {
  sequenceTimeout: number;
  chordTimeout: number;

  // hotkeyId -> HotKeyChordDef
  chords: Record<string, HotKeyChordDef> = {};
  // Event key/code -> HotKeyChordDef[]
  chordMap: Partial<Record<string, HotKeyChordDef[]>> = {};

  sequence: Record<string, HotKeySequenceDef> = {};
  sequenceTree: SequenceTree | undefined;

  // hotkeyId -> IncompleteHotkey
  incompleteChords: Record<string, IncompleteHotkey> = {};

  waitingSequenceNodes: Record<number, SequenceTree> = {};

  textResolver?: HotkeyTextResolver;

  constructor(
    sequenceTimeout?: number,
    chordTimeout?: number,
    textResolver?: HotkeyTextResolver,
  ) {
    this.sequenceTimeout = sequenceTimeout ?? 400;
    this.chordTimeout = chordTimeout ?? 100;
    this.textResolver = textResolver;
  }

  public addChordHotkey(hotkey: HotKeyChordDef) {
    this.chords[hotkey.id] = hotkey;
    const hks = this.chordMap[hotkey.primaryValue];
    if (hks == null) this.chordMap[hotkey.primaryValue] = [hotkey];
    else hks.push(hotkey);
  }

  public addSequenceHotkey(hotkey: HotKeySequenceDef) {
    this.sequence[hotkey.id] = hotkey;

    if (this.sequenceTree == null)
      this.sequenceTree = { hotkey: [], keyBased: {}, codeBased: {} };

    let treeNode: SequenceTree = this.sequenceTree;

    for (let i = 0; i < hotkey.keys.length; i++) {
      const k = KeyMap[hotkey.keys[i]];
      const subtree = k.on === "key" ? treeNode.keyBased : treeNode.codeBased;
      const key = k.value;

      if (subtree[key] == null)
        subtree[key] = {
          hotkey: [],
          keyBased: {},
          codeBased: {},
        };
      if (i === hotkey.keys.length - 1) subtree[key].hotkey.push(hotkey);
      treeNode = subtree[key];
    }
  }

  public removeChordHotkey(id: string) {
    const hotkey = this.chords[id];
    const hks = this.chordMap[hotkey.primaryValue];
    if (hks)
      this.chordMap[hotkey.primaryValue] = hks.filter((hk) => hk.id != id);
    Reflect.deleteProperty(this.chords, id);
  }

  public removeSequenceHotkey(id: string) {
    const hotkey = this.sequence[id];

    const clearTree = (
      node: SequenceTree,
      leftKeys: KeyDescription<KeyValueType>[],
    ) => {
      if (leftKeys.length == 0) {
        node.hotkey = node.hotkey.filter((hk) => hk.id !== hotkey.id);
        return;
      }

      const [cur, ...other] = leftKeys;
      const key = cur.value;
      const subtree = cur.on === "key" ? node.keyBased : node.codeBased;
      const nextNode = subtree[key];
      if (nextNode != null) {
        clearTree(nextNode, other);
        if (
          nextNode.hotkey.length === 0 &&
          Object.keys(nextNode.codeBased).length == 0 &&
          Object.keys(nextNode.keyBased).length == 0
        )
          Reflect.deleteProperty(subtree, key);
      }
    };

    if (this.sequenceTree != null)
      clearTree(
        this.sequenceTree,
        hotkey.keys.map((k) => KeyMap[k]),
      );

    Reflect.deleteProperty(this.chords, id);
  }

  private resolveSequenceTreeNode(
    treeNode: SequenceTree,
    event: KeyboardEvent,
  ) {
    const sequenceNodeCodeBased = treeNode.codeBased[event.code];
    const sequenceNodeKeyBased = treeNode.keyBased[event.key];

    if (sequenceNodeCodeBased != null) {
      if (
        sequenceNodeCodeBased.hotkey.length > 0 &&
        Object.keys(sequenceNodeCodeBased.codeBased).length === 0 &&
        Object.keys(sequenceNodeCodeBased.keyBased).length === 0
      ) {
        sequenceNodeCodeBased.hotkey.forEach((hk) => {
          if (!hk.options.disabled) hk.callback(event);
        });
        this.waitingSequenceNodes = {};
      } else {
        const id = setTimeout(() => {
          Reflect.deleteProperty(this.waitingSequenceNodes, id);
        }, this.sequenceTimeout);
        this.waitingSequenceNodes[id] = sequenceNodeCodeBased;
      }
    }

    if (sequenceNodeKeyBased != null) {
      if (
        sequenceNodeKeyBased.hotkey.length > 0 &&
        Object.keys(sequenceNodeKeyBased.codeBased).length === 0 &&
        Object.keys(sequenceNodeKeyBased.keyBased).length === 0
      ) {
        sequenceNodeKeyBased.hotkey.forEach((hk) => {
          if (!hk.options.disabled) hk.callback(event);
        });
        this.waitingSequenceNodes = {};
      } else {
        const id = setTimeout(() => {
          Reflect.deleteProperty(this.waitingSequenceNodes, id);
        }, this.sequenceTimeout);
        this.waitingSequenceNodes[id] = sequenceNodeKeyBased;
      }
    }
  }

  clearIncompleteChords() {
    for (const [id, missing] of Object.entries(this.incompleteChords)) {
      clearTimeout(missing.timeoutId);
      Reflect.deleteProperty(this.incompleteChords, id);
    }
  }

  handleModifierKeydown(event: KeyboardEvent) {
    for (const missing of Object.values(this.incompleteChords)) {
      if (checkModifierPressed(missing.hotkey, event)) {
        this.handleChordHotkeyPressSuccess(missing.hotkey, event);
        this.clearIncompleteChords();
      } else if (wrongModifierPressed(missing.hotkey, event)) {
        this.clearIncompleteChords();
      }
    }
  }

  handleChordHotkeyPressSuccess(chord: HotKeyChordDef, event: KeyboardEvent) {
    if (
      isEditingKeystrokeContext(event) &&
      !chord.options.enableOnContentEditable
    ) {
      return;
    }
    if (chord.options.preventDefault) event.preventDefault();
    chord.callback(event);

    // clear partial sequence hotkeys
    this.waitingSequenceNodes = {};
  }

  public handleKeydown(event: KeyboardEvent) {
    if (isModifierKeyboardEvent(event)) {
      this.handleModifierKeydown(event);
      return;
    } else if (isClearKeydown(event)) {
      this.textResolver?.setSymbol(event.code, event.key);
    }
    this.clearIncompleteChords();

    const chordKeys = [
      ...(this.chordMap[event.key.toLowerCase()] ?? []),
      ...(this.chordMap[event.code] ?? []),
    ];

    for (const chord of chordKeys) {
      if (chord.options.disabled) continue;
      if (checkModifierPressed(chord, event)) {
        this.handleChordHotkeyPressSuccess(chord, event);
        return; // TODO: same chord keys should trigger together, not only the first one...
      } else {
        this.incompleteChords[chord.id] = {
          hotkey: chord,
          timeoutId: setTimeout(() => {
            Reflect.deleteProperty(this.incompleteChords, chord.id);
          }, this.chordTimeout),
        };
      }
    }

    if (this.sequenceTree) {
      if (Object.keys(this.waitingSequenceNodes).length === 0) {
        this.resolveSequenceTreeNode(this.sequenceTree, event);
      } else {
        const nodes = { ...this.waitingSequenceNodes };
        this.waitingSequenceNodes = {};

        Object.values(nodes).forEach((node) =>
          this.resolveSequenceTreeNode(node, event),
        );
      }
    }
  }

  public handleKeyup(event: KeyboardEvent) {
    if (isModifierKeyboardEvent(event)) this.clearIncompleteChords();
  }
}
