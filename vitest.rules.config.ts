import { defineConfig } from 'vitest/config';

// Test Firestore rules — chạy bằng: npm run test:rules (cần Firebase CLI + Java cho Emulator)
export default defineConfig({
  test: { include: ['tests/rules/**/*.test.ts'], environment: 'node', testTimeout: 20_000, fileParallelism: false }
});
