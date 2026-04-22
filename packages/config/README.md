# @loop-play/config

Shared base configurations — ESLint, TypeScript, Tailwind.

## What lives here
```
eslint/
├── base.js         # base rules (all JS/TS)
├── react.js        # extends base + React rules
└── next.js         # extends react + Next.js rules

tsconfig/
├── base.json       # strict TS defaults
├── react.json      # extends base for React apps
├── next.json       # extends react for Next.js
└── node.json       # extends base for Node/Hono

tailwind/
└── base.js         # design tokens + base theme
```

## How apps/packages consume it

**TypeScript:**
```json
// apps/lobby/tsconfig.json
{ "extends": "@loop-play/config/tsconfig/next.json" }
```

**ESLint (flat config):**
```js
// apps/lobby/eslint.config.js
import next from "@loop-play/config/eslint/next.js";
export default [...next];
```

**Tailwind:**
```js
// apps/lobby/tailwind.config.js
import base from "@loop-play/config/tailwind/base.js";
export default { ...base, content: [...] };
```

## Rules
- No app-specific rules here — only defaults every app should inherit.
- App overrides live in each app's own config file.
- Keep dependencies minimal; this package is consumed everywhere.
