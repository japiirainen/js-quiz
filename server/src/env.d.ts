declare namespace NodeJS {
   export interface ProcessEnv {
      PORT: string
      NODE_ENV: string
      DB_URL: string
      SESSION_SECRET: string
      EMAIL_USER: string
      EMAIL_PASSWORD: string
      REDIS_URL: string
      CORS_ORIGIN: string
   }
}
