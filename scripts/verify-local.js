import { chromium, expect } from '@playwright/test';
import { spawn, execFileSync } from 'node:child_process';
import { once } from 'node:events';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url)).replace(/\/$/, '');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
if (git('status', '--porcelain')) throw new Error('Commit project changes before clean-checkout acceptance.');
const evidence = { testedCommit: git('rev-parse', 'HEAD'), cleanAtLaunch: true, node: process.version, startedAt: new Date().toISOString(), launches: [], checks: [] };
const output = join(root, '.local-evidence'); mkdirSync(output, { recursive: true });
const temp = mkdtempSync(join(tmpdir(), 'field-desk-local-'));
let active, browser;
async function launch() {
  const child = spawn(process.execPath, ['src/server.js'], { cwd: root, env: { ...process.env, PORT: '0', FIELD_DESK_DB: join(temp, 'app.sqlite') }, stdio: ['ignore', 'pipe', 'pipe'] });
  let stdout = '', stderr = '';
  child.stderr.on('data', value => { stderr += value; });
  const ready = new Promise((resolveReady, reject) => {
    const timer = setTimeout(() => { child.kill(); reject(new Error('Startup timed out: ' + stderr)); }, 10000);
    child.once('error', error => { clearTimeout(timer); reject(error); });
    child.once('exit', () => { clearTimeout(timer); reject(new Error('Startup failed: ' + stderr)); });
    child.stdout.on('data', chunk => { stdout += chunk; const match = stdout.match(/http:\/\/127\.0\.0\.1:\d+/); if (match) { clearTimeout(timer); resolveReady(match[0]); } });
  });
  const url = await ready;
  const identity = { pid: child.pid, command: execFileSync('ps', ['-p', String(child.pid), '-o', 'command='], { encoding: 'utf8' }).trim(), cwd: root, url, stopped: false };
  const cwdVerified = () => process.platform === 'darwin'
    ? execFileSync('lsof', ['-a', '-p', String(child.pid), '-d', 'cwd', '-Fn'], { encoding: 'utf8' }).split('\n').includes('n' + root)
    : execFileSync('readlink', [`/proc/${child.pid}/cwd`], { encoding: 'utf8' }).trim() === root;
  if (!cwdVerified()) throw new Error('Process working directory did not match.');
  evidence.launches.push(identity);
  return { url, async stop() {
    if (identity.stopped) return;
    if (child.exitCode !== null || !cwdVerified()) throw new Error('Unexpected process identity before shutdown.');
    const command = execFileSync('ps', ['-p', String(child.pid), '-o', 'command='], { encoding: 'utf8' }).trim();
    if (command !== identity.command) throw new Error('Process command changed.');
    identity.identityCheckedBeforeStop = true;
    const exited = once(child, 'exit'); child.kill('SIGTERM'); const [code] = await exited;
    if (code !== 0) throw new Error(`Shutdown exited ${code}`);
    identity.stopped = true; identity.exitCode = code;
  } };
}
try {
  active = await launch();
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  const pageErrors = []; page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto(active.url);
  await page.getByLabel('Title', { exact: true }).fill('Confirm café trim delivery');
  await page.getByLabel('Project (optional)', { exact: true }).fill('Sample exterior project');
  await page.getByLabel('Notes (optional)', { exact: true }).fill('Check color and arrival window.');
  await page.getByRole('button', { name: 'Add follow-up', exact: true }).click();
  await expect(page.getByRole('article', { name: 'Confirm café trim delivery', exact: true })).toBeVisible();
  evidence.checks.push('browser follow-up creation with Unicode');
  await page.getByRole('button', { name: 'Checklists', exact: true }).click();
  await page.getByLabel('Template name', { exact: true }).fill('Site visit preparation');
  await page.getByLabel('Items (one per line)', { exact: true }).fill('Confirm dimensions\nPhotograph existing condition');
  await page.getByRole('button', { name: 'Save template', exact: true }).click();
  await page.getByLabel('Checklist template', { exact: true }).selectOption({ label: 'Site visit preparation' });
  await page.getByLabel('Run name', { exact: true }).fill('Monday site visit');
  await page.getByRole('button', { name: 'Start run', exact: true }).click();
  let run = page.getByRole('article', { name: 'Run Monday site visit', exact: true });
  await run.getByRole('checkbox', { name: 'Confirm dimensions', exact: true }).check();
  await expect(run.getByRole('progressbar')).toHaveAttribute('value', '1');
  await page.getByRole('button', { name: 'Edit template Site visit preparation', exact: true }).click();
  await page.getByLabel('Template name', { exact: true }).fill('Updated visit preparation');
  await page.getByLabel('Items (one per line)', { exact: true }).fill('New instruction');
  await page.getByRole('button', { name: 'Save template', exact: true }).click();
  await expect(page.getByLabel('Checklist template', { exact: true })).toContainText('Updated visit preparation');
  evidence.checks.push('browser template/run creation, item completion and template edit');
  await active.stop(); active = await launch();
  await page.goto(active.url);
  await expect(page.getByRole('article', { name: 'Confirm café trim delivery', exact: true })).toContainText('Check color and arrival window.');
  await page.screenshot({ path: join(output, 'field-desk-followups.png'), fullPage: true });
  await page.getByRole('button', { name: 'Checklists', exact: true }).click();
  run = page.getByRole('article', { name: 'Run Monday site visit', exact: true });
  await expect(run.getByRole('checkbox', { name: 'Confirm dimensions', exact: true })).toBeChecked();
  await expect(run).toContainText('Photograph existing condition');
  await expect(run).toContainText('Site visit preparation');
  await expect(page.getByLabel('Checklist template', { exact: true })).toContainText('Updated visit preparation');
  await page.screenshot({ path: join(output, 'field-desk-checklists.png'), fullPage: true });
  await page.setViewportSize({ width: 375, height: 812 });
  if (!await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)) throw new Error('Mobile page overflows.');
  expect(pageErrors).toEqual([]);
  evidence.checks.push('both features persist across process restart', 'run snapshot survives template edits and restart', '375px layout without horizontal overflow', 'no browser script errors');
  evidence.result = 'passed';
} finally {
  if (browser) await browser.close();
  if (active) await active.stop();
  rmSync(temp, { recursive: true, force: true });
  evidence.temporaryDatabaseRemoved = !existsSync(temp); evidence.finishedAt = new Date().toISOString();
  writeFileSync(join(output, 'local-acceptance.json'), JSON.stringify(evidence, null, 2) + '\n');
}
console.log(JSON.stringify(evidence, null, 2));
