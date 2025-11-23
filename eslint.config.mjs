import { defineConfig, globalIgnores } from "eslint/config";
import nextConfig from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  nextConfig,
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
