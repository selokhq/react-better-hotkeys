import { describe, it, vi, expect } from "vitest";
import { MAC_UA, withUserAgent } from "./utils/userAgent";
import { render } from "@testing-library/react";
import { HotkeyHarness } from "./utils/hotkeyRenderer";
import userEvent from "@testing-library/user-event";
import type { HotKeySequenceDef } from "../../dist/types/hotkey/HotKeySequenceDef";
import { germanKeyMap } from "./keyboard/german";

const RH = await withUserAgent(MAC_UA);
const { Hotkey, useRenderedHotkey } = RH;

describe("useRenderedHotkey", () => {
  it("rerenders when the text representation of a hotkey changes", async () => {
    const callback = vi.fn();
    const wrapperRenderCounter = vi.fn();
    let renderCounter = 0;

    const user = userEvent.setup({ keyboardMap: germanKeyMap });

    const RenderExample = (hotkeys: HotKeySequenceDef) => {
      const { asString } = useRenderedHotkey(hotkeys);
      renderCounter++;
      return <p id="rendered-hotkey">{asString}</p>;
    };

    render(
      <HotkeyHarness
        RH={RH}
        hotkey={Hotkey.Sequence.Y.Z.end}
        callback={callback}
        childrenWrapper={(v) => RenderExample(v)}
        onRender={wrapperRenderCounter}
      />,
    );

    const p = document.getElementById(
      "rendered-hotkey",
    ) as HTMLParagraphElement;

    expect(renderCounter).toBe(1);
    expect(p.textContent).toBe("Y>Z");

    await user.keyboard("Z");
    expect(renderCounter).toBe(2);
    expect(p.textContent).toBe("Z>Z");

    await user.keyboard("Y");
    expect(renderCounter).toBe(3);
    expect(p.textContent).toBe("Z>Y");

    expect(wrapperRenderCounter).toBeCalledTimes(1);
  });
  it("does not trigger a subscriber callback if no changes were made to the internal mapping", async () => {
    const callback = vi.fn();
    const wrapperRenderCounter = vi.fn();
    let renderCounter = 0;

    const user = userEvent.setup({ keyboardMap: germanKeyMap });

    const RenderExample = (hotkeys: HotKeySequenceDef) => {
      const { asString } = useRenderedHotkey(hotkeys);
      renderCounter++;
      return <p id="rendered-hotkey">{asString}</p>;
    };

    render(
      <HotkeyHarness
        RH={RH}
        hotkey={Hotkey.Sequence.A.B.C.end}
        callback={callback}
        childrenWrapper={(v) => RenderExample(v)}
        onRender={wrapperRenderCounter}
      />,
    );

    const p = document.getElementById(
      "rendered-hotkey",
    ) as HTMLParagraphElement;

    expect(renderCounter).toBe(1);
    expect(p.textContent).toBe("A>B>C");
    await user.keyboard("a");
    expect(renderCounter).toBe(1);
    await user.keyboard("b");
    expect(renderCounter).toBe(1);
    await user.keyboard("c");
    expect(renderCounter).toBe(1);

    expect(wrapperRenderCounter).toBeCalledTimes(1);
  });
});
