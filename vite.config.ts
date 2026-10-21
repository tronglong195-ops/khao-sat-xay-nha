/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { version: string };

// base = '/<tên-repo>/' cho GitHub Pages; dùng tên miền riêng/Firebase Hosting thì đặt VITE_BASE=/ hoặc chạy mode hosting
export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE ?? (mode === 'hosting' ? '/' : '/khao-sat-xay-nha/'),
  plugins: [react()],
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  build: { sourcemap: false },
  test: {
    include: ['src/**/*.test.ts', 'tests/unit/**/*.test.ts'],
    environment: 'node'
  }
}));
