import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT
export const DB_URL = process.env.DB_URL
export const __prod__ = process.env.NODE_ENV === 'prod'
