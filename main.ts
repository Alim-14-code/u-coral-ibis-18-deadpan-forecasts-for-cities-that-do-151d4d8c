// Deadpan Forecasts for Cities That Do Not Exist
// Reads the one-line forecast from entry.txt (next to this file) and writes
// it verbatim to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Node 22 stdlib only. No network, no secrets, no dynamic code.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "entry.txt"), "utf8");
const line = raw.replace(/\r?\n$/, "");

if (line.length < 1 || line.length > 160 || line.trim().length === 0) {
  throw new Error(
    `entry.txt must hold one non-blank line of 1-160 characters, got ${line.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line + "\n", "utf8");
console.log(`wrote ${line.length} characters to ${outPath}`);
