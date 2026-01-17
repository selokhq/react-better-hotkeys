import type {} from "@docusaurus/theme-live-codeblock";
import { HotkeyProvider } from "react-better-hotkeys";
import LiveCodeBlock from "@theme/LiveCodeBlock";
import { removeImports } from "../utils/removeImports";
import BrowserOnly from "@docusaurus/BrowserOnly";

export type LiveEditorProps = {
  code: string;
};

export const LiveEditor = ({ code }: LiveEditorProps) => {
  return (
    <BrowserOnly>
      {() => (
        <HotkeyProvider>
          <LiveCodeBlock className="language-tsx">
            {removeImports(code)}
          </LiveCodeBlock>
        </HotkeyProvider>
      )}
    </BrowserOnly>
  );
};
