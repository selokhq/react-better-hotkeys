import { removeTsComments } from "./removeTsComments";

export function removeImports(code: string) {
  return removeTsComments(code.replaceAll(/import.*\n*/g, ""));
}
