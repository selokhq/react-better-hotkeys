import type { TestFunction } from "vitest";
import { vi, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import type { ReactHotkeys } from "./utils/hotkeyRenderer";
import { HotkeyHarness } from "./utils/hotkeyRenderer";
import userEvent from "@testing-library/user-event";
import { germanKeyMap } from "./keyboard/german";
import type { HotKeySequenceDef } from "../../dist/types/hotkey/HotKeySequenceDef";
import type { HotKeyChordDef } from "../../dist/types/hotkey/HotKeyChordDef";

export type Test = {
  name: string;
  fn: (RH: ReactHotkeys) => TestFunction<object>;
};

export const tests: Test[] = [
  {
    name: "triggers when escape is pressed",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={Hotkey.Chord.Escape}
          callback={callback}
        />,
      );

      await user.keyboard("{Escape}");

      expect(callback).toHaveBeenCalledTimes(1);
    },
  },
  {
    name: "triggers when multiple hotkeys were provided",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={[Hotkey.Chord.A, Hotkey.Chord.B]}
          callback={callback}
        />,
      );

      await user.keyboard("ab");

      expect(callback).toHaveBeenCalledTimes(2);
    },
  },
  {
    name: "triggers when A then B then C was pressed",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={Hotkey.Sequence.A.B.C.end}
          callback={callback}
        />,
      );

      await user.keyboard("abc");

      expect(callback).toHaveBeenCalledTimes(1);
    },
  },
  {
    name: "does not trigger when escape is pressed but hotkey is disabled",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={Hotkey.Chord.Escape}
          callback={callback}
          options={{ disabled: true }}
        />,
      );

      await user.keyboard("{Escape}");

      expect(callback).toHaveBeenCalledTimes(0);
    },
  },
  {
    name: "does not trigger when A then B then C was pressed but hotkey is disabled",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={Hotkey.Sequence.A.B.C.end}
          callback={callback}
          options={{ disabled: true }}
        />,
      );

      await user.keyboard("abc");

      expect(callback).toHaveBeenCalledTimes(0);
    },
  },
  {
    name: "triggers when code 'KeyA' is pressed with 'Shift' and 'Alt'",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={Hotkey.Chord.Shift.Alt.A}
          callback={callback}
        />,
      );

      await user.keyboard("{Shift>}{Alt>}A{/Shift}{/Alt}");

      expect(callback).toHaveBeenCalledTimes(1);
    },
  },
  {
    name: "does not trigger when code 'KeyA' is pressed with 'Shift' and 'Alt' but also 'Ctrl'",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={Hotkey.Chord.Shift.Alt.A}
          callback={callback}
        />,
      );

      await user.keyboard("{Shift>}{Alt>}{Control>}A{/Shift}{/Alt}{/Control}");

      expect(callback).not.toHaveBeenCalled();
    },
  },
  {
    name: "does not trigger when code 'KeyA' is pressed with 'Shift' but missing 'Alt'",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={Hotkey.Chord.Shift.A}
          callback={callback}
        />,
      );

      await user.keyboard("{Shift>}{Alt>}A{/Shift}{/Alt}");

      expect(callback).not.toHaveBeenCalled();
    },
  },
  {
    name: "does not trigger when code 'KeyA' is pressed with 'Alt' but 'Shift' is pressed too",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={Hotkey.Chord.Alt.A}
          callback={callback}
        />,
      );
      await user.keyboard("{Shift>}{Alt>}A{/Shift}{/Alt}");

      expect(callback).not.toHaveBeenCalled();
    },
  },
  {
    name: "triggers when value 'z' / code 'KeyZ' is pressed",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={Hotkey.Chord.KeyZ}
          callback={callback}
        />,
      );

      await user.keyboard("z");

      expect(callback).toHaveBeenCalledTimes(1);
    },
  },
  {
    name: "does not trigger when value 'y' / code 'KeyZ' is pressed",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup({
        keyboardMap: germanKeyMap,
      });
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={Hotkey.Chord.KeyZ}
          callback={callback}
        />,
      );

      await user.keyboard("y");

      expect(callback).not.toHaveBeenCalled();
    },
  },
  {
    name: "triggers code 'KeyK' is pressed and 'Control' follows after",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={Hotkey.Chord.Control.K}
          callback={callback}
        />,
      );

      await user.keyboard("{k>}");
      await user.keyboard("{Control}{/k}");

      expect(callback).toHaveBeenCalledTimes(1);
    },
  },
  {
    name: "triggers same hotkey multiple times on one keyboard event",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <>
          <HotkeyHarness
            RH={RH}
            hotkey={Hotkey.Chord.Control.K}
            callback={callback}
          />
          <HotkeyHarness
            RH={RH}
            hotkey={Hotkey.Chord.Control.K}
            callback={callback}
          />
          <HotkeyHarness
            RH={RH}
            hotkey={Hotkey.Chord.Control.K}
            callback={callback}
          />
          <HotkeyHarness
            RH={RH}
            hotkey={Hotkey.Chord.Control.K}
            callback={callback}
          />
          <HotkeyHarness
            RH={RH}
            hotkey={Hotkey.Chord.Control.K}
            callback={callback}
          />
        </>,
      );

      await user.keyboard("{Control>}k{/Control}");

      expect(callback).toHaveBeenCalledTimes(5);
    },
  },
  {
    name: "does not trigger when editable content is focused",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <>
          <HotkeyHarness RH={RH} hotkey={Hotkey.Chord.A} callback={callback} />
          <input id={"test-input"} />
        </>,
      );

      const input = document.getElementById("test-input");
      (input as HTMLInputElement).focus();

      await user.keyboard("a");

      expect(callback).not.toHaveBeenCalled();
      expect(input).toBeDefined();
      expect((input as HTMLInputElement).value).toBe("a");
    },
  },
  {
    name: "triggers when editable content is focused and enableOnContentEditable is set",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const user = userEvent.setup();
      const callback = vi.fn();

      render(
        <>
          <HotkeyHarness
            RH={RH}
            hotkey={Hotkey.Chord.A}
            callback={callback}
            options={{ enableOnContentEditable: true }}
          />
          <input id={"test-input"} />
        </>,
      );

      const input = document.getElementById("test-input");
      (input as HTMLInputElement).focus();

      await user.keyboard("a");

      expect(callback).toHaveBeenCalledTimes(1);
      expect(input).toBeDefined();
      expect((input as HTMLInputElement).value).toBe("");
    },
  },
  {
    name: "triggers when editable content is focused and enableOnContentEditable is set",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const callback = vi.fn();
      const hotkeyOut = vi.fn();

      render(
        <>
          <HotkeyHarness
            RH={RH}
            hotkey={Hotkey.Sequence.A.end}
            callback={callback}
            out={hotkeyOut}
          />
        </>,
      );

      const [hotkey] = hotkeyOut.mock.calls[0];
      expect(hotkey).toBeDefined();
      expect(hotkey.type).toBe("sequence");
      expect(hotkey.keys.length).toBe(1);
      expect(hotkey.keys[0]).toBe("A");
    },
  },
  {
    name: "resolves sequence hotkeys to strings correctly",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const callback = vi.fn();
      const hotkeyOut = vi.fn<(hotkey: readonly [HotKeySequenceDef]) => void>();

      render(
        <>
          <HotkeyHarness
            RH={RH}
            hotkey={[Hotkey.Sequence.A.Z.K.Space.end]}
            callback={callback}
            out={hotkeyOut}
          />
        </>,
      );

      const [hotkey] = hotkeyOut.mock.calls[0];
      expect(hotkey).toBeDefined();
      expect(hotkey.length).toBe(1);
      expect(hotkey[0].toParts()[0]).toStrictEqual([
        ["A", "valid"],
        ["Z", "valid"],
        ["K", "valid"],
        ["Space", "valid"],
      ]);
      expect(hotkey[0].toString()).toEqual("A>Z>K>Space");
    },
  },
  {
    name: "resolves sequence hotkeys to strings correctly for different keyboard layouts after pressing keys differing from ANSI US 104",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const callback = vi.fn();
      const hotkeyOut = vi.fn<(hotkey: readonly [HotKeySequenceDef]) => void>();

      const user = userEvent.setup({
        keyboardMap: germanKeyMap,
      });

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={[Hotkey.Sequence.Y.Z.end]}
          callback={callback}
          out={hotkeyOut}
        />,
      );

      await user.keyboard("YZ");

      await waitFor(() => expect(hotkeyOut).toHaveBeenCalled());
      const [hotkey] = hotkeyOut.mock.calls[0];
      expect(hotkey).toBeDefined();
      expect(hotkey.length).toBe(1);
      expect(hotkey[0].toParts()[0]).toStrictEqual([
        ["Z", "valid"],
        ["Y", "valid"],
      ]);

      expect(hotkey[0].toString()).toStrictEqual("Z>Y");
    },
  },
  {
    name: "resolves sequence hotkeys to strings correctly for different keyboard layouts after pressing keys differing from ANSI US 104",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const callback = vi.fn();
      const hotkeyOut = vi.fn<(hotkey: readonly [HotKeySequenceDef]) => void>();

      const user = userEvent.setup({
        keyboardMap: germanKeyMap,
      });

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={[Hotkey.Sequence.Z.end]}
          callback={callback}
          out={hotkeyOut}
        />,
      );

      await user.keyboard("Z");

      await waitFor(() => expect(hotkeyOut).toHaveBeenCalled());
      const [hotkey] = hotkeyOut.mock.calls[0];
      expect(hotkey).toBeDefined();
      expect(hotkey.length).toBe(1);
      expect(hotkey[0].toParts()[0][0][0]).toStrictEqual("Z");
      expect(hotkey[0].toString()).toStrictEqual("Z");
    },
  },
  {
    name: "resolves sequence hotkeys to strings correctly for different keyboard layouts before and after pressing keys differing from ANSI US 104",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const callback = vi.fn();
      const hotkeyOut = vi.fn<(hotkey: readonly [HotKeySequenceDef]) => void>();

      const user = userEvent.setup({
        keyboardMap: germanKeyMap,
      });

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={[Hotkey.Sequence.Z.end]}
          callback={callback}
          out={hotkeyOut}
        />,
      );

      await user.keyboard("Z");

      await waitFor(() => expect(hotkeyOut).toHaveBeenCalled());
      const [hotkey] = hotkeyOut.mock.calls[0];
      expect(hotkey).toBeDefined();
      expect(hotkey.length).toBe(1);
      expect(hotkey[0].toParts()[0][0]).toStrictEqual(["Z", "invalid"]);
      expect(hotkey[0].toString()).toStrictEqual("Z");

      await user.keyboard("Y");
      expect(hotkey[0].toParts()[0][0]).toStrictEqual(["Y", "valid"]);
      expect(hotkey[0].toString()).toStrictEqual("Y");
    },
  },
  {
    name: "resolves simple chord hotkeys to strings correctly",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const callback = vi.fn();
      const hotkeyOut = vi.fn<(hotkey: readonly [HotKeyChordDef]) => void>();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={[Hotkey.Chord.A]}
          callback={callback}
          out={hotkeyOut}
        />,
      );

      await waitFor(() => expect(hotkeyOut).toHaveBeenCalled());
      const [hotkey] = hotkeyOut.mock.calls[0];
      expect(hotkey).toBeDefined();
      expect(hotkey.length).toBe(1);
      expect(hotkey[0].toParts()[0][0]).toStrictEqual(["A", "valid"]);
      expect(hotkey[0].toString()).toStrictEqual("A");
    },
  },
  {
    name: "resolves compound chord hotkeys to strings correctly",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const callback = vi.fn();
      const hotkeyOut = vi.fn<(hotkey: readonly [HotKeyChordDef]) => void>();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={[Hotkey.Chord.Shift.Meta.A]}
          callback={callback}
          out={hotkeyOut}
        />,
      );

      await waitFor(() => expect(hotkeyOut).toHaveBeenCalled());
      const [hotkey] = hotkeyOut.mock.calls[0];
      expect(hotkey).toBeDefined();
      expect(hotkey.length).toBe(1);
      expect(hotkey[0].toParts()[0]).toStrictEqual([
        ["Shift", "valid"],
        ["Meta", "valid"],
        ["A", "valid"],
      ]);
      expect(hotkey[0].toString()).toStrictEqual("Shift+Meta+A");
    },
  },
  {
    name: "resolves compound chord hotkeys to strings correctly with custom delimiter",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const callback = vi.fn();
      const hotkeyOut = vi.fn<(hotkey: readonly [HotKeyChordDef]) => void>();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={[Hotkey.Chord.Shift.Meta.A]}
          callback={callback}
          out={hotkeyOut}
          providerProps={{
            chordDelimiter: " and ",
          }}
        />,
      );

      await waitFor(() => expect(hotkeyOut).toHaveBeenCalled());
      const [hotkey] = hotkeyOut.mock.calls[0];
      expect(hotkey).toBeDefined();
      expect(hotkey.length).toBe(1);
      expect(hotkey[0].toParts()[0]).toStrictEqual([
        ["Shift", "valid"],
        ["Meta", "valid"],
        ["A", "valid"],
      ]);
      expect(hotkey[0].toString()).toStrictEqual("Shift and Meta and A");
    },
  },
  {
    name: "resolves compound chord hotkeys to strings correctly with custom delimiter",
    fn: (RH) => async () => {
      const { Hotkey } = RH;
      const callback = vi.fn();
      const hotkeyOut = vi.fn<(hotkey: readonly [HotKeyChordDef]) => void>();

      render(
        <HotkeyHarness
          RH={RH}
          hotkey={[Hotkey.Chord.Shift.Meta.A]}
          callback={callback}
          out={hotkeyOut}
          providerProps={{
            chordDelimiter: " and ",
          }}
        />,
      );

      await waitFor(() => expect(hotkeyOut).toHaveBeenCalled());
      const [hotkey] = hotkeyOut.mock.calls[0];
      expect(hotkey).toBeDefined();
      expect(hotkey.length).toBe(1);
      expect(hotkey[0].toParts()[0]).toStrictEqual([
        ["Shift", "valid"],
        ["Meta", "valid"],
        ["A", "valid"],
      ]);
      expect(hotkey[0].toString()).toStrictEqual("Shift and Meta and A");
    },
  },
];
