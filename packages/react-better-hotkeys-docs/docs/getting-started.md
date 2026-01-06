---
sidebar_position: 1
slug: /
---

import CodeBlock from '@theme/CodeBlock';

# Getting Started

## Installation

<CodeBlock className="language-shell">npm i react-better-hotkeys --save</CodeBlock>

## Setup

You can use `useHotkey` only within a `<HotkeyProvider>`. Make sure you wrap your app with a Provider.

```jsx
import { HotkeyProvider } from 'react-better-hotkeys';

const App = () => {
  return (
    <HotkeyProvider>
      {/* Your App */}
    </HotkeyProvider>
  )
}

export default App;
```
