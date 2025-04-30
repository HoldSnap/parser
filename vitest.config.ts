import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.{ts,js}"],

    environment: "node",
    globals: true,
    testTimeout: 5000,
    setupFiles: [],
  },
});
