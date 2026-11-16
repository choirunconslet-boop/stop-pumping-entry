// Stop Pumping Make Fun ($MAKEFUN) — makefun-coin-promo-01 entry (Node 22, stdlib only).
// Copies LAUNCH.json from the repository root to /output/LAUNCH.json, where the gate reads it.
// The entry is the coin itself: launched on pump.fun from the GmX5 wallet linked to the
// @runnsxy make.fun account. LAUNCH.json names the coin's mint and the create transaction's
// signature; the house reads the coin as pump.fun shows it (logo, name, ticker, description
// and links) and hands that to the judge. Nothing this program writes is judged.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for
// /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Validate the launch record before copying: both fields must be real base58 values,
// not the starter placeholders. A bad LAUNCH.json fails the gate, so fail loudly here.
const launchPath = join(BOT_DIR, 'LAUNCH.json');
const launch = JSON.parse(readFileSync(launchPath, 'utf8'));
if (!launch.mint || !launch.create_signature || launch.mint.includes('REPLACE') || launch.create_signature.includes('REPLACE')) {
  console.error('LAUNCH.json is missing the coin mint or create signature.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(launchPath, join(OUTPUT_DIR, 'LAUNCH.json'));
} catch (err) {
  console.error(`LAUNCH.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
