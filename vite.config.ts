import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {},
  staged: {
    "*.{js,jsx,ts,tsx,json,css,md}": ["oxlint --fix", "oxfmt --write"],
  },
});
