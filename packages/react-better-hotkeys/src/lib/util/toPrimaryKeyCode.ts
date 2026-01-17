import type { PrimaryKey } from "../types/key/PrimaryKey";
import type { PrimaryKeyCode } from "../types/key/PrimaryKeyCode";
import { isPrimaryKeyCode } from "./isPrimaryKeyCode";

export function toPrimaryKeyCode(keyId: PrimaryKey): PrimaryKeyCode {
  return isPrimaryKeyCode(keyId) ? keyId : (keyId.slice(3) as PrimaryKeyCode);
}
