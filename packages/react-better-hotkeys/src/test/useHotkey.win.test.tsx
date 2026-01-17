import { describe, it } from "vitest";
import { WIN_UA, withUserAgent } from "./utils/userAgent";
import { tests } from "./useHotkey.tests.tsx";

const RH = await withUserAgent(WIN_UA);
// const { Hotkey, detectOS } = RH;

describe("useHotkey", () => {
  // platform independent tests
  tests.forEach((test) => it(test.name, test.fn(RH)));

  // (() => it("bitte", x(RH)))();
  // it("respects OS-specific modifiers by distinguishing resolving 'Mod' to Ctrl for Windows", async () => {
  //   const callback = vi.fn();
  //   let lastEvent: KeyboardEvent | undefined;
  //   window.addEventListener("keydown", (e) => (lastEvent = e));
  //   const user = userEvent.setup();
  //   render(
  //     <HotkeyHarness RH={RH} hotkey={Hotkey.Chord.Mod.K} callback={callback} />,
  //   );
  //   expect(detectOS()).toBe("Windows");
  //   await user.keyboard("{Meta>}k{/Meta}");
  //   expect(callback).not.toHaveBeenCalled();
  //   await user.keyboard("{Control>}k{/Control}");
  //   expect(callback).toHaveBeenCalledTimes(1);
  //   expect(lastEvent).toBeDefined();
  //   expect(lastEvent?.defaultPrevented).toBe(true);
  // });
});
