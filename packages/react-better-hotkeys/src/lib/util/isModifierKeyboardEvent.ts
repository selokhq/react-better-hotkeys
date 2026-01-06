export function isModifierKeyboardEvent(event: KeyboardEvent): boolean {
  return (
    event.code.startsWith("Meta") ||
    event.code.startsWith("Shift") ||
    event.code.startsWith("Alt") ||
    event.code.startsWith("Control")
  );
}
