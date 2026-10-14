import { readFileSync, writeFileSync } from 'fs';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const docsRoot = join(process.cwd(), 'src', 'content', 'docs');

const replacements = [
  ['â†â†’', ' <-> '],
  ['â€”', ' - '],
  ['â†’', ' -> '],
  ['â†“', ' v '],
  ['â†‘', ' ^ '],
  ['âœ…', '[OK]'],
  ['âœ“', '[OK]'],
  ['âŒ', '[NO]'],
  ['âš ï¸', '[WARN]'],
  ['Ã—', 'x'],
  ['â†', '<-'],
  ['â‰¥', '>='],
  ['â”œâ”€â”€', '|- '],
  ['â””â”€â”€', '`- '],
  ['â”‚', '|'],
  ['â–¼', 'v'],
  ['â–‘', '-'],
  ['â–“', '*'],
  ['â–ˆ', '#'],
  ['â”Œ', '+'],
  ['â”', '+'],
  ['â”˜', '+'],
  ['â”´', '+'],
  ['â”€', '-'],
  ['â”', '|'],
  ['â•”', '+'],
  ['â•', '='],
  ['â•‘', '|'],
  ['â• ', '+'],
  ['â•£', '|'],
  ['â•š', '+'],
  ['â•', '+'],
];

function walk(dirPath) {
  const files = [];

  for (const entry of readdirSync(dirPath)) {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

for (const filePath of walk(docsRoot)) {
  const content = readFileSync(filePath, 'utf8');
  let updated = content;

  for (const [from, to] of replacements) {
    updated = updated.split(from).join(to);
  }

  if (updated !== content) {
    writeFileSync(filePath, updated, 'utf8');
  }
}
