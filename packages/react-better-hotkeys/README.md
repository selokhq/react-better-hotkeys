React Better Hotkeyss
======================

A tiny, typed helper for registering global hotkeys in React. It supports both **chords** (e.g. `Shift + Alt + A`) and **key sequences** (e.g. `g` then `h`), respects platform-specific modifier keys, and cleans up registrations automatically.

Docs: https://selokhq.github.io/react-better-hotkeys/

Features
--------
- Chainable builders for chords and sequences with full TypeScript coverage.
- `Mod` alias mapping to `⌘` on macOS and `Ctrl` on Windows/Linux.
- Distinguish physical key `code` vs character `key` so shortcuts stay stable across layouts.
- Efficient global listener optimizing event handling

Installation
------------

```sh
npm install react-better-hotkeys
```

Quick start
-----------

```tsx
import { Hotkey, HotkeyProvider, useHotkey } from "react-better-hotkeys";

function Shortcuts() {
  // Layout-stable chord: Shift + OS-aware Mod + physical "K" key
  useHotkey(Hotkey.Chord.Shift.Mod.K, () => {
    console.log("Shift+⌘+K / Shift+Ctrl+K pressed")
  });

  // Sequence: press "g" then "h"
  useHotkey(Hotkey.Sequence.KeyG.KeyH.end, () => {
    console.log("[G]o [H]ome")
 });

  return null;
}

export default function App() {
  return (
    <HotkeyProvider>
      <Shortcuts />
    </HotkeyProvider>
  );
}
```

## Issues

Looking to contribute? Look for the [Good First Issue][good-first-issue] label.

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps to prioritize what to work on.

[**See Feature Requests**][requests]

## License

[MIT](LICENSE)

[requests]: https://github.com/selokhq/react-better-hotkeys/issues?q=is%3Aissue%20state%3Aopen%20sort%3Areactions-%2B1-desc%20label%3Aenhancement
[bugs]: https://github.com/selokhq/react-better-hotkeys/issues?q=is%3Aissue%20is%3Aopen%20sort%3Acreated-desc%20label%3Abug
[good-first-issue]: https://github.com/selokhq/react-better-hotkeys/issues?q=is%3Aissue%20is%3Aopen%20sort%3Areactions-%2B1-desc%20label%3Aenhancement%20label%3A%22good%20first%20issue%22
