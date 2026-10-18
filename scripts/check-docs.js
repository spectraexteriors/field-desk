import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
const failures = []; let links = 0;
function walk(dir) {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'data', '.local-evidence', 'test-results', 'playwright-report'].includes(item.name)) continue;
    const file = join(dir, item.name);
    if (item.isDirectory()) walk(file);
    else if (item.name.endsWith('.md')) {
      const source = readFileSync(file, 'utf8');
      for (const match of source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
        const target = match[1].split('#')[0].replace(/^<|>$/g, '');
        if (!target || /^[a-z]+:/i.test(target)) continue;
        links++;
        if (!existsSync(resolve(dirname(file), decodeURIComponent(target)))) failures.push(`${file}: ${target}`);
      }
    }
  }
}
walk('.');
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`${links} relative Markdown links resolve.`);
