import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {},
  staged: {
    "*.{js,jsx,ts,tsx,json,css,md}": [
      "biome check --write",
      "biome format --write",
    ],
  },
});
