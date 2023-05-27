interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_ACCESS_TYPE: string;
  // еще переменные env ...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
