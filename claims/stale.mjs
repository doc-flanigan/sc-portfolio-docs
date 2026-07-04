// Staleness sweep: list claims by lastVerified, oldest first.
// Usage: node docs/claims/stale.mjs [--days N]
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const daysArg = process.argv.indexOf('--days');
const maxAgeDays = daysArg > -1 ? Number(process.argv[daysArg + 1]) : null;

const rows = [];
for (const f of readdirSync(dir)) {
  if (!f.endsWith('.md') || f === 'README.md') continue;
  const txt = readFileSync(join(dir, f), 'utf8');
  const get = (k) => (txt.match(new RegExp(`^${k}:\\s*"?([^"\\n]+)"?`, 'm')) || [])[1]?.trim();
  const last = get('lastVerified');
  const ageDays = last ? Math.floor((Date.now() - new Date(last).getTime()) / 86400000) : Infinity;
  if (maxAgeDays !== null && ageDays < maxAgeDays) continue;
  rows.push({ file: f, status: get('status') || '?', lastVerified: last || 'MISSING', ageDays });
}

rows.sort((a, b) => b.ageDays - a.ageDays);
if (!rows.length) { console.log('Nothing stale.'); process.exit(0); }
const w = Math.max(...rows.map((r) => r.file.length));
for (const r of rows) {
  console.log(`${r.file.padEnd(w)}  ${String(r.ageDays).padStart(4)}d  ${r.status.padEnd(12)}  ${r.lastVerified}`);
}
console.log(`\n${rows.length} claim(s). Re-verify oldest first; write lastVerified back after checking.`);
