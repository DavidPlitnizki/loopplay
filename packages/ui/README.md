# @loop-play/ui

Shared React components used across the lobby (and potentially other React surfaces).

## What lives here
- Buttons, inputs, modals, cards
- Layout primitives (Stack, Grid)
- Game-catalog cards, score widgets, leaderboard rows
- Anything visual that more than one app would render

## What does NOT live here
- App-specific pages/screens (those belong in `apps/lobby`)
- Game-rendering code (Pixi / canvas stays in `apps/game-*`)
- Business logic — this package is presentational

## Conventions
- All components are typed and accept a `className` prop for Tailwind overrides.
- Tailwind base config comes from `@loop-play/config`.
- No side effects on import (tree-shakeable).
- Stories / visual tests can live under `stories/` if you add Storybook later.
