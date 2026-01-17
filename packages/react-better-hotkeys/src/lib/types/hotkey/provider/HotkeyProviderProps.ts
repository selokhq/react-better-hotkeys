import type { PrimaryKeyCode } from "../../key/PrimaryKeyCode";

/**
 * All options regarding an entire hotkey scope
 */
export type HotkeyProviderProps = {
  /**
   * Defines how many milliseconds can pass between two key presses in a sequence hotkey
   * @default 400
   */
  sequenceTimeout?: number;
  /**
   * Defines how many milliseconds can pass from pressing a primary key until all required modifier keys are also pressed in a chord hotkey
   * @default 100
   */
  chordTimeout?: number;
  /**
   * Defines what string will be used in stringified sequence hotkeys
   * @default ">"
   */
  sequenceDelimiter?: string;
  /**
   * Defines what string will be used in stringified chord hotkeys
   * @default "+"
   */
  chordDelimiter?: string;

  /**
   * Defines custom key code mappings for text representation of hotkey for alternative keyboard layouts. (e.g. German: KeyY -> Z)
   * @default undefined
   */
  customSymbolMap?: Partial<Record<PrimaryKeyCode, string>>;
};
