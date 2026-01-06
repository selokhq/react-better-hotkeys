import { Hotkey, useHotkey } from "react-better-hotkeys";
import { useState } from "react";

//@ts-expect-error 'Comp' is declared but its value is never read.
function Comp() {
  const [incValue, setIncValue] = useState<number>(1);
  const [counter, setCounter] = useState<number>(0);

  useHotkey(
    Hotkey.Chord.B,
    () => {
      setCounter((prev) => prev + incValue);
    },
    [incValue],
  );

  return (
    <>
      <input
        value={isNaN(incValue) ? "" : incValue}
        onChange={(e) => setIncValue(parseInt(e.target.value))}
      />
      <p>{`B pressed ${counter} times`}</p>
    </>
  );
}
