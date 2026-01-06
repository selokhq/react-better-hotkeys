import { Hotkey, useHotkey } from "react-better-hotkeys";
import { useState } from "react";

//@ts-expect-error 'Comp' is declared but its value is never read.
function Comp() {
  const [counter, setCounter] = useState<number>(0);

  useHotkey(
    Hotkey.Chord.Mod.F,
    () => {
      setCounter((prev) => prev + 1);
    },
    [],
    {
      preventDefault: false,
    },
  );

  return <p>{`Mod+F pressed ${counter} times`}</p>;
}
