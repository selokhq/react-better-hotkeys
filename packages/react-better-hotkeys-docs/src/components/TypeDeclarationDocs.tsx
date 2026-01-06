import CodeBlock from "@theme/CodeBlock";
import Heading from "@theme/Heading";
import type { TypeDeclaration } from "../utils/parseTypeDeclaration";

type TypeDeclarationDocsProps = {
  declaration: TypeDeclaration;
};

export const TypeDeclarationDocs = ({
  declaration,
}: TypeDeclarationDocsProps) => {
  return (
    <>
      <p>{declaration.doc.text}</p>

      <CodeBlock className="language-tsx">{declaration.source}</CodeBlock>

      {declaration.attributes.length > 0 && (
        <Heading as="h2" id="attributes">
          Attributes
        </Heading>
      )}

      {declaration.attributes.map((att) => (
        <section key={att.name} style={{ overflowX: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Heading as="h3" id={`attribute-${att.name}`}>
              <code>{att.name}</code>
            </Heading>
            {att.doc?.default && (
              <p>
                defaults to <code>{att.doc.default}</code>
              </p>
            )}
          </div>

          <CodeBlock language="ts">{`${att.name}: ${att.typeName};`}</CodeBlock>

          {att.doc && <p>{att.doc.text}</p>}
        </section>
      ))}
    </>
  );
};
