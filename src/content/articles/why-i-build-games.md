---
title: Why I Build Games on Linux
description: A short essay on learning programming by shipping small games and tools on Fedora.
date: 2026-04-12
tags:
  - gamedev
  - linux
  - learning
---

I did not start making games because I wanted to become a professional developer. I started because I was curious about what happens when you press a key and something moves on the screen.

That question sounds small, but it opens a huge door. Suddenly you care about frames per second, coordinate systems, input lag, and why a bug only appears when you turn too fast. Each problem teaches you a new word in the language of computers.

## Learning by shipping

My Fedora laptop is not a perfect game studio, and that is fine. Constraints force creativity. When you cannot rely on a giant engine template, you learn what each piece actually does:

- How a game loop schedules work every frame
- How to store player progress in a file
- How to debug without guessing

Shipping small projects matters more than polishing one giant idea forever. A playable prototype teaches you faster than a perfect design document.

## Code is a tool, not the goal

Here is a tiny TypeScript snippet I might use to clamp player speed:

```typescript
function clampSpeed(speed: number, max: number): number {
  return Math.max(-max, Math.min(max, speed));
}
```

The function is only three lines, but it represents a real design decision: the player should never move faster than the level was tested for.

## What comes next

I will keep writing about the systems I build — networking, rendering, tools, and the mistakes I make along the way. If you are learning too, build something small this week and write down what surprised you.
