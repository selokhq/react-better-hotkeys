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
};
