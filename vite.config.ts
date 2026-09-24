import { defineConfig } from "vite-plus";

const ignorePatterns = [
  "dist/**",
  ".astro/**",
  ".next/**",
  ".open-next/**",
  "out/**",
  "build/**",
  "node_modules/**",
  "public/**",
  "**/*.lock",
  "**/*.tsbuildinfo",
  "**/*.astro",
  "content/blog/posts.json",
  "wrangler.toml",
  "next-env.d.ts",
];

export default defineConfig({
  lint: {
    plugins: ["typescript", "unicorn", "oxc", "react", "jsx-a11y", "import"],
    ignorePatterns,
    env: {
      browser: true,
      es2022: true,
      node: true,
      builtin: true,
    },
    settings: {
      react: {
        version: "19.0",
      },
    },
    categories: {
      correctness: "error",
      suspicious: "warn",
    },
    rules: {
      "unicorn/filename-case": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-null": "off",
      "unicorn/no-array-sort": "off",
      "import/no-cycle": "off",
      "import/prefer-default-export": "off",
      "import/no-named-export": "off",
      "import/group-exports": "off",
      "import/consistent-type-specifier-style": "off",
      "eslint/sort-keys": "off",
      "eslint/func-style": "off",
      "eslint/one-var": "off",
      "eslint/max-lines": "off",
      "eslint/id-length": "off",
      "eslint/no-shadow": "off",
      "eslint/no-new": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",
      "react/set-state-in-effect": "warn",
      "react/incompatible-library": "warn",
      "jsx-a11y/prefer-tag-over-role": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "typescript/no-explicit-any": "error",
    },
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
          "typescript/no-unused-vars": "warn",
        },
      },
      {
        files: ["**/*.d.ts"],
        rules: {
          "typescript/triple-slash-reference": "off",
        },
      },
    ],
  },
  fmt: {
    ignorePatterns,
    useTabs: false,
    tabWidth: 2,
    printWidth: 80,
    singleQuote: false,
    jsxSingleQuote: false,
    quoteProps: "as-needed",
    trailingComma: "all",
    semi: true,
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    singleAttributePerLine: false,
  },
  staged: {
    // JSON, CSS, and Markdown are not lint targets. Ignored paths (and
    // non-source files) must not fail the hook with "no files found".
    "*.{js,jsx,ts,tsx,mjs}": [
      "vp lint --fix --no-error-on-unmatched-pattern",
      "vp fmt --write --no-error-on-unmatched-pattern",
    ],
    "*.{json,css,md}": ["vp fmt --write --no-error-on-unmatched-pattern"],
  },
});
