import 'dotenv-safe/config'

export const PORT = process.env.PORT
export const CORS_ORIGIN = process.env.CORS_ORIGIN
export const REDIS_URL = process.env.REDIS_URL
export const DB_URL = process.env.DB_URL
export const __prod__ = process.env.NODE_ENV === 'production'
export const sessionSecret = process.env.SESSION_SECRET || 'secret'
export const cookieName = 'id'
export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
export const FORGOT_PASSWORD_PREFIX = 'forgot-password'
export const PASSWORD_RESET_TEXT = (token: string) =>
   `<a href="https://js-quiz.me/change-password/${token}">reset password</a>`
export const REDIS_SETTINGS = __prod__ ? { host: 'redis-server', port: 6379 } : undefined
