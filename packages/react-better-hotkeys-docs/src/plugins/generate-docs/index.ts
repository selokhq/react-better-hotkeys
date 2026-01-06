import fs from "fs";
import path from "path";

export default function generateDocsPlugin() {
  return {
    name: "generate-docs-plugin",

    async loadContent() {
      const srcDir = path.resolve("../react-better-hotkeys/src/lib/types");
      const outDir = path.resolve("./docs/Types");

      fs.mkdirSync(outDir, { recursive: true });

      for (const filePath of collectTypeFiles(srcDir)) {
        const doc = generateDocsForFile(srcDir, filePath);
        const relativePathParts = path
          .relative(srcDir, filePath)
          .split(path.sep);
        const fileName = relativePathParts.pop() ?? "";
        const outputDirs = relativePathParts.map(toKebabTitleCase);
        const outputPath = path.join(
          outDir,
          ...outputDirs,
          fileName.replace(/\.ts$/, ".mdx"),
        );

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, doc);
      }
    },
  };
}

function collectTypeFiles(rootDir: string) {
  const files: string[] = [];
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectTypeFiles(entryPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".ts")) {
      files.push(entryPath);
    }
  }

  return files;
}

function generateDocsForFile(typesRoot: string, filePath: string) {
  const typeName = path.basename(filePath, ".ts");
  const relativePath = path
    .relative(typesRoot, filePath)
    .replace(/\.ts$/, "")
    .split(path.sep)
    .join("/");
  const importPath = `react-better-hotkeys/types/${relativePath}`;
  const slug = `/types/${typeName}`;

  return `---
slug: ${slug}
---

import CodeBlock from '@theme/CodeBlock'
import type_source from '!!raw-loader!${importPath}'
import { parseTypeDeclaration } from '@site/src/utils/parseTypeDeclaration'
import {TypeDeclarationDocs} from "@site/src/components/TypeDeclarationDocs"

export const typeDeclaration = parseTypeDeclaration(type_source)

<TypeDeclarationDocs declaration={typeDeclaration} />
`;
}

function toKebabTitleCase(segment: string) {
  const normalized = segment
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2")
    .replace(/[_\s]+/g, "-");
  const words = normalized.split("-").filter(Boolean);

  return words
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join("-");
}
