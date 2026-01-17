import type { PrimaryKey } from "../types/key/PrimaryKey";
import type { PrimaryKeyCode } from "../types/key/PrimaryKeyCode";

export function isPrimaryKeyCode(
  identifier: PrimaryKey,
): identifier is PrimaryKeyCode {
  return !identifier.startsWith("Key");
}
