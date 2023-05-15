interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  // еще переменные env ...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
