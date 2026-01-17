import { useContext } from "react";
import { Hotkey } from "react-better-hotkeys";
import { HotkeyContext } from "react-better-hotkeys";
import { useHotkey } from "react-better-hotkeys";
import { useRenderedHotkey } from "react-better-hotkeys";

//@ts-expect-error 'Comp' is declared but its value is never read.
function Comp() {
  const hotkeyContext = useContext(HotkeyContext);
  const hotkey = useHotkey(Hotkey.Sequence.A.Y.Z.end, () => {
    console.log("CMD+K pressed!");
  });
  const { asString, asParts } = useRenderedHotkey(hotkey);

  return (
    <div>
      <p>Hotkey as String: {asString}</p>

      <p>Hotkey as Parts: </p>
      <p>Delimiter: {asParts[1]}</p>
      {asParts[0].map((p, i) => (
        <p style={{ marginBottom: 0 }} key={i}>
          Part {i}: {p[0]}; status: {p[1]}
        </p>
      ))}

      <button
        onClick={() => {
          hotkeyContext?.textResolver.setSymbol("KeyA", "X");
          hotkeyContext?.textResolver.setSymbol("KeyB", "A");
          hotkeyContext?.textResolver.setSymbol("KeyC", "Z");
        }}
      >
        change internal keyboard layout
      </button>
    </div>
  );
}
