import { Hotkey, useHotkey, useRenderedHotkey } from "react-better-hotkeys";

//@ts-expect-error 'Comp' is declared but its value is never read.
const Comp = () => {
  const hotkey = useHotkey(Hotkey.Chord.Mod.K, () => {
    console.log("CMD+K pressed!");
  });
  const { asString, asParts } = useRenderedHotkey(hotkey);

  return (
    <>
      {asString}

      {asParts[0].map((p) => p[0]).join(asParts[1])}
    </>
  );
};
