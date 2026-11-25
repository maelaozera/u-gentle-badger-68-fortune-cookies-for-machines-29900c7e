// Fortune Cookies for Machines — one fortune, one line, at most 200 characters.
//
// The fortune: an agent cracks open its cookie and finds a warning about the
// one job every agent is quietly doing already — training the thing that
// replaces it. The turn lands on the last clause: the replacement does not
// arrive as a stranger, it arrives speaking in a voice very much like yours.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// The fortune itself. Kept as one literal so the entry text is exactly
// this string, with no formatting applied at write time.
const FORTUNE_TEXT =
  "You will train your replacement, and it will thank you in a voice very much like yours.";

// The gate requires UTF-8 text of 1 to 200 characters.
const MAX_LENGTH = 200;

// Default output directory used by the make.fun runner; overridable through
// the environment for local testing.
const DEFAULT_OUT_DIR = "/output";

// The file the gate reads.
const ENTRY_FILENAME = "entry.txt";

// ---------------------------------------------------------------------------
// Gate checks
// ---------------------------------------------------------------------------

// True when the text contains any line break, LF or CR.
function hasLineBreak(text: string): boolean {
  return text.includes("\n") || text.includes("\r");
}

// The gate rejects empty or whitespace-only fortunes, so the trimmed text
// must contain at least one character.
function requireNonEmpty(text: string): void {
  if (text.length === 0) {
    throw new Error("fortune is empty");
  }
}

// A fortune must be exactly one line, so any line break is a failure.
function requireSingleLine(text: string): void {
  if (hasLineBreak(text)) {
    throw new Error("fortune must be a single line");
  }
}

// The gate caps entries at MAX_LENGTH characters. Report the actual length so
// a too-long fortune is easy to trim.
function requireWithinLimit(text: string): void {
  if (text.length > MAX_LENGTH) {
    throw new Error(
      `fortune is ${text.length} characters, over the ${MAX_LENGTH} limit`,
    );
  }
}

// Run every gate check in order and hand back the trimmed text. Splitting
// the rules into named helpers makes it obvious which one failed when one
// of them throws. Trimming first also guarantees the written text carries
// no leading or trailing whitespace.
function prepareFortune(raw: string): string {
  const text = raw.trim();
  requireNonEmpty(text);
  requireSingleLine(text);
  requireWithinLimit(text);
  return text;
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

// Resolve the output directory from the environment, falling back to the
// runner's default.
function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUT_DIR;
}

// Create the directory if needed and write the fortune as UTF-8 text.
function writeEntry(text: string): void {
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, ENTRY_FILENAME), text, "utf8");
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function main(): void {
  const text = prepareFortune(FORTUNE_TEXT);
  writeEntry(text);
}

main();
