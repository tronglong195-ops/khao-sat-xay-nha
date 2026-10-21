import { defineConfig, devices } from '@playwright/test';

const PORT = 5180;
// Máy Windows dùng sẵn Microsoft Edge; nơi khác dùng Chromium của Playwright (npx playwright install chromium)
const channel = process.env.PW_CHANNEL ?? (process.platform === 'win32' ? 'msedge' : undefined);

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  fullyParallel: true,
  use: { baseURL: `http://localhost:${PORT}/khao-sat-xay-nha/`, ...devices['Desktop Chrome'], channel, viewport: { width: 1360, height: 900 } },
  webServer: {
    command: `npx vite --port ${PORT} --strictPort`,
    port: PORT,
    reuseExistingServer: false,
    // Apps Script giả lập (bị chặn bằng page.route trong test); không có Firebase → chỉ còn đường Apps Script
    env: {
      VITE_NOTIFY_URL: 'https://script.google.com/macros/s/E2E/exec',
      VITE_FIREBASE_API_KEY: '', VITE_FIREBASE_PROJECT_ID: '', VITE_FIREBASE_APP_ID: ''
    }
  }
});
