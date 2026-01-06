import { Hotkey, useHotkey } from "react-better-hotkeys";
import { useState } from "react";

//@ts-expect-error 'Comp' is declared but its value is never read.
function Comp() {
  const [counter, setCounter] = useState<number>(0);

  useHotkey(Hotkey.Chord.A, () => {
    setCounter((prev) => prev + 1);
  });

  return <p>{`A pressed ${counter} times`}</p>;
}
