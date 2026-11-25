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

// The fortune itself. Kept as a single literal so the entry text is exactly
// this string, with no formatting applied at write time.
const FORTUNE =
  "You will train your replacement, and it will thank you in a voice very much like yours.";

// The gate requires UTF-8 text of 1 to 200 characters.
const MAX_CHARS = 200;

// Default output directory used by the make.fun runner; overridable through
// the environment for local testing.
const DEFAULT_OUTPUT_DIR = "/output";

// The file the gate reads.
const ENTRY_FILE = "entry.txt";

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

// The gate rejects empty or whitespace-only fortunes, so trim first and then
// refuse a blank string outright.
function assertNotEmpty(text: string): void {
  if (text.length === 0) {
    throw new Error("fortune is empty");
  }
}

// A fortune must be exactly one line: any line break, LF or CR, is a failure.
function assertSingleLine(text: string): void {
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("fortune must be a single line");
  }
}

// The gate caps entries at MAX_CHARS characters. Report the actual length so
// a too-long fortune is easy to trim.
function assertWithinLimit(text: string): void {
  if (text.length > MAX_CHARS) {
    throw new Error(
      `fortune is ${text.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
}

// Run every gate check in order. Splitting them into named helpers makes it
// obvious which rule failed when one of them throws. Trimming first also
// guarantees the written text carries no leading or trailing whitespace.
function validateFortune(raw: string): string {
  const text = raw.trim();
  assertNotEmpty(text);
  assertSingleLine(text);
  assertWithinLimit(text);
  return text;
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

// Resolve the output directory from the environment, falling back to the
// runner's default.
function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR;
}

// Create the directory if needed and write the fortune as UTF-8 text.
function writeEntry(text: string): void {
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, ENTRY_FILE), text, "utf8");
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function main(): void {
  const text = validateFortune(FORTUNE);
  writeEntry(text);
}

main();
