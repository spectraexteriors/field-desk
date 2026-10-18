import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './test/browser', fullyParallel: false, workers: 1, use: { baseURL: 'http://127.0.0.1:3219', headless: true }, webServer: { command: 'node scripts/browser-server.js', url: 'http://127.0.0.1:3219/api/health', reuseExistingServer: false }, reporter: 'list' });
