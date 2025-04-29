import stylisticTs from "@stylistic/eslint-plugin-ts";
import parserTs from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["dist/**", "node_modules/**"] },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: parserTs,
      sourceType: "module",
    },
    plugins: {
      "@stylistic/ts": stylisticTs,
    },
    rules: {
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],

      "@stylistic/ts/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["block", "block-like"], next: "*" },
        { blankLine: "never", prev: "directive", next: "*" },
      ],

      "@stylistic/ts/indent": ["error", 2],
      "@stylistic/ts/space-infix-ops": ["error"],
      "@stylistic/ts/keyword-spacing": ["error", { before: true, after: true }],
      "@stylistic/ts/space-before-function-paren": ["error", "never"],
      "@stylistic/ts/semi-spacing": ["error", { before: false, after: true }],
    },
  },
]);
