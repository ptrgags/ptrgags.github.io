import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    expect: {
      requireAssertions: true,
    },
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    isolate: false,
    setupFiles: ['./src/lib/test-helpers/setup.ts'],
  },
})
