import { defineConfig } from '@playwright/test';
const port = Number(process.env.FIELD_DESK_BROWSER_PORT || 3219);
export default defineConfig({ testDir: './test/browser', fullyParallel: false, workers: 1, use: { baseURL: `http://127.0.0.1:${port}`, headless: true }, webServer: { command: 'node scripts/browser-server.js', url: `http://127.0.0.1:${port}/api/health`, reuseExistingServer: false }, reporter: 'list' });
