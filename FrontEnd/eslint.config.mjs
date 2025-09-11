import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig({
  ignores: ["dist/**", "build/**"],
  extends: [js.configs.recommended],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.browser,
    },
  },

  linterOptions: {
    reportUnusedDisableDirectives: true,
  },

  rules: {
    "no-console": "off",
    "no-debugger": "error",
    "eqeqeq": ["error", "always"],
  },
});