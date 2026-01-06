/**
 * All options of an individual hotkey
 */
export type HotkeyOptions = {
  /**
   * Determines if the default event of a key stroke should get prevented or not
   * @default true
   */
  preventDefault: boolean;
  /**
   * Determines if the hotkey can be triggered while having an editable tag in focus (e.g. input)
   * @default false
   */
  enableOnContentEditable: boolean;
  /**
   * Determines if the hotkey is actively listening
   * @default false
   */
  disabled: boolean;
};
