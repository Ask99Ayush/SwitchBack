/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_APP_AUTHOR: string
  readonly VITE_APP_GITHUB_URL: string
  readonly VITE_APP_LINKEDIN_URL: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_YEAR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
