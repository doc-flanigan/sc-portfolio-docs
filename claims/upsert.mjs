// Safe writer for the claims ledger — guarantees well-formed frontmatter so
// research agents (sc-fact-check, sc-news, sc-event-tracker) can update the
// ledger with only the Bash tool, without hand-writing YAML.
//
// Usage (run with the ledger's own path so cwd doesn't matter):
//   node docs/claims/upsert.mjs verify <id>
//       → bump lastVerified to today on an existing claim
//   node docs/claims/upsert.mjs status <id> <verified|unverifiable|refuted>
//       → set status AND bump lastVerified (records a re-verification)
//   node docs/claims/upsert.mjs add <id> --claim "…" --status verified \
//       --source <url> [--source <url> …] [--usage "site /page — where"] [--note "…"]
//       → create a NEW claim file (refuses to clobber an existing id)
//
// Every command prints one confirmation line and exits 0 on success, non-zero
// on error (e.g. `verify` on a missing id → tells you to use `add`).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const today = new Date().toISOString().slice(0, 10);
const argv = process.argv.slice(2);
const [cmd, id] = argv;
const fail = (m) => { console.error('upsert: ' + m); process.exit(1); };

if (!cmd || !id) fail('usage: verify <id> | status <id> <status> | add <id> --claim … --status … --source …');
if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) fail(`bad id "${id}" (use kebab-case, e.g. sq42-cast-oldman-bishop)`);
const file = join(DIR, id + '.md');

// Collect repeatable/optional flags for `add`.
function flags(names) {
  const out = {};
  for (const n of names) out[n] = [];
  for (let i = 2; i < argv.length; i++) {
    const m = argv[i].match(/^--(\w+)$/);
    if (m && names.includes(m[1]) && argv[i + 1] != null) { out[m[1]].push(argv[++i]); }
  }
  return out;
}
const yamlStr = (s) => '"' + String(s).replace(/"/g, "'").trim() + '"';

if (cmd === 'verify' || cmd === 'status') {
  if (!existsSync(file)) fail(`no claim "${id}" — nothing to ${cmd}. Use \`add\` to create it.`);
  let txt = readFileSync(file, 'utf8');
  const fm = txt.match(/^---\r?\n[\s\S]*?\r?\n---/);
  if (!fm) fail(`"${id}.md" has no frontmatter block`);
  let block = fm[0];
  if (cmd === 'status') {
    const status = argv[2];
    if (!['verified', 'unverifiable', 'refuted'].includes(status)) fail('status must be verified | unverifiable | refuted');
    block = /^status:/m.test(block)
      ? block.replace(/^status:.*$/m, `status: ${status}`)
      : block.replace(/\n---$/, `\nstatus: ${status}\n---`);
  }
  block = /^lastVerified:/m.test(block)
    ? block.replace(/^lastVerified:.*$/m, `lastVerified: ${today}`)
    : block.replace(/\n---$/, `\nlastVerified: ${today}\n---`);
  writeFileSync(file, txt.replace(fm[0], block));
  console.log(`upsert: ${cmd} ${id} → lastVerified ${today}${cmd === 'status' ? `, status ${argv[2]}` : ''}`);
  process.exit(0);
}

if (cmd === 'add') {
  if (existsSync(file)) fail(`"${id}" already exists — use \`verify\`/\`status\`, or edit the file directly.`);
  const f = flags(['claim', 'status', 'source', 'usage', 'note']);
  const claim = f.claim[0];
  const status = f.status[0] || 'verified';
  if (!claim) fail('add requires --claim "…"');
  if (!['verified', 'unverifiable', 'refuted'].includes(status)) fail('--status must be verified | unverifiable | refuted');
  if (!f.source.length) fail('add requires at least one --source <url>');
  const lines = [
    '---',
    `id: ${id}`,
    `claim: ${yamlStr(claim)}`,
    `status: ${status}`,
    'sources:',
    ...f.source.map((s) => `  - ${s.trim()}`),
    `lastVerified: ${today}`,
    'usage:',
    ...(f.usage.length ? f.usage.map((u) => `  - ${u.trim()}`) : ['  - (not yet placed on a page)']),
    '---',
    '',
    f.note.length ? f.note.join('\n\n') : `Added ${today}. Verify against the cited source(s) before re-use.`,
    '',
  ];
  writeFileSync(file, lines.join('\n'));
  console.log(`upsert: add ${id} (${status}, ${f.source.length} source(s)) → ${id}.md`);
  process.exit(0);
}

fail(`unknown command "${cmd}"`);
