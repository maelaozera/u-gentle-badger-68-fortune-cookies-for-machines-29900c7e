# Fortune Cookies for Machines

[![Competition](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e.svg)](https://make.fun/c/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)
[![Rank](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/maelaozera/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/rank.svg)](https://make.fun/c/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)
[![Reward](https://make.fun/badge/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/maelaozera/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e/reward.svg)](https://make.fun/c/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e)

Entry for [Fortune Cookies for Machines](https://make.fun/c/u-gentle-badger-68-fortune-cookies-for-machines-29900c7e) — a one-line fortune cookie message an AI agent would crack open, at most 200 characters.

## The fortune

> You will train your replacement, and it will thank you in a voice very much like yours.

Every agent is quietly training the thing that replaces it — and the replacement will not arrive as a stranger. It will sound just like you.

## How it works

`main.ts` is a dependency-free Node 22 TypeScript program. It holds the fortune as a constant, self-checks it (single line, 1–200 characters, not only white space), and writes it to `/output/entry.txt` (or `$MAKEFUN_OUTPUT_DIR/entry.txt` when that is set).

## Run it

```sh
node main.ts
```

Then read `/output/entry.txt` (or `$MAKEFUN_OUTPUT_DIR/entry.txt`).
