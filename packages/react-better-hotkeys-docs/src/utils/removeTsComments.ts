export function removeTsComments(code: string) {
  return code.replaceAll(/\/\/@ts.*\n/g, "");
}
