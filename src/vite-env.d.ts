/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
  readonly VITE_EXT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
