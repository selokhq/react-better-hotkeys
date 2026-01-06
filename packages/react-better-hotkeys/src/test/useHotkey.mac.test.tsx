import { describe, it, vi, expect } from "vitest";
import { MAC_UA, withUserAgent } from "./utils/userAgent";
import { render } from "@testing-library/react";
import { HotkeyHarness } from "./utils/hotkeyRenderer";
import userEvent from "@testing-library/user-event";

import { tests } from "./useHotkey.tests";

const RH = await withUserAgent(MAC_UA);
const { Hotkey, detectOS } = RH;

describe("useHotkey", () => {
  // platform independent tests
  tests.forEach((test) => it(test.name, test.fn(RH)));

  it("respects OS-specific modifiers by distinguishing resolving 'Mod' to Meta for macOS", async () => {
    const callback = vi.fn();

    let lastEvent: KeyboardEvent | undefined;
    window.addEventListener("keydown", (e) => (lastEvent = e));

    const user = userEvent.setup();

    render(
      <HotkeyHarness RH={RH} hotkey={Hotkey.Chord.Mod.K} callback={callback} />,
    );

    expect(detectOS()).toBe("macOS");

    await user.keyboard("{Control>}k{/Control}");
    expect(callback).not.toHaveBeenCalled();

    await user.keyboard("{Meta>}k{/Meta}");
    expect(callback).toHaveBeenCalledTimes(1);
    expect(lastEvent).toBeDefined();
    expect(lastEvent?.defaultPrevented).toBe(true);
  });
});
