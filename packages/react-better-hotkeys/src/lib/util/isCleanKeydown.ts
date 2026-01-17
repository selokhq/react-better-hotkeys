export function isClearKeydown(event: KeyboardEvent) {
  return !event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey;
}
