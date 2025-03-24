interface ImportMetaEnv {
  readonly APP_NAME: string;
  readonly JWT_SECRET: string;
  readonly DATABASE_USERNAME: string;
  readonly DATABASE_PASSWORD: string;
  readonly DATABASE_NAME: string;
  readonly DATABASE_HOST: string;
  readonly DATABASE_PORT: string;
  readonly HOST_NAME: string;
  readonly PORT: string;
  readonly RAILS_ENV: string;
  readonly SECRET_KEY_BASE: string;
  readonly VITE_SUPABASE_PROJECT_URL: string;
  readonly VITE_SUPABASE_API_KEY: string;
  readonly VITE_SUPABASE_BUCKET_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
