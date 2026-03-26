/// <reference types="astro/client" />

declare module "@fontsource/*";

interface ImportMetaEnv {
  readonly SITE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
