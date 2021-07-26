declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    PORT: string
    DATABASE_URL: string;
  }
}