import ts from "typescript";

export type JSDoc = {
  text: string;
  default?: string;
};

export type TypeDeclaration = {
  name: string;
  source: string;
  doc: JSDoc;
  attributes: {
    doc?: JSDoc;
    name: string;
    typeName: string;
  }[];
};

export function parseTypeDeclaration(sourceText: string): TypeDeclaration {
  const sourceFile = ts.createSourceFile(
    "temp.d.ts",
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  let result: TypeDeclaration | undefined;

  function getJsDoc(node: ts.Node): { text: string; default?: string } {
    const jsDocs = ts.getJSDocCommentsAndTags(node);
    if (jsDocs.length === 0) {
      return { text: "" };
    }

    let text = "";
    let defaultValue: string | undefined;

    for (const doc of jsDocs) {
      if (ts.isJSDoc(doc)) {
        if (typeof doc.comment === "string") {
          text += doc.comment;
        }
        if (doc.tags) {
          for (const tag of doc.tags) {
            if (tag.tagName.getText() === "default") {
              defaultValue = tag.comment?.toString().trim();
            }
          }
        }
        continue;
      }

      if (ts.isJSDocUnknownTag(doc) && doc.tagName.getText() === "default") {
        defaultValue = doc.comment?.toString().trim();
      }
    }

    return {
      text: text.trim(),
      default: defaultValue,
    };
  }

  sourceFile.forEachChild((node) => {
    if (!ts.isTypeAliasDeclaration(node)) return;

    const typeDoc = getJsDoc(node);
    const attributes: TypeDeclaration["attributes"] = [];

    if (ts.isTypeLiteralNode(node.type)) {
      for (const member of node.type.members) {
        if (!ts.isPropertySignature(member)) continue;
        if (!member.type) continue;

        attributes.push({
          name: member.name.getText(sourceFile),
          typeName: member.type.getText(sourceFile),
          doc: getJsDoc(member),
        });
      }
    }

    const printer = ts.createPrinter({ removeComments: true });
    const plainType = printer
      .printNode(ts.EmitHint.Unspecified, node, sourceFile)
      .replace(/^export\s+/, "")
      .trim();

    result = {
      name: node.name.getText(sourceFile),
      source: plainType,
      doc: typeDoc,
      attributes,
    };
  });

  if (!result) {
    throw new Error("No type alias found in source");
  }

  return result;
}
