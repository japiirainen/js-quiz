import connectRedis from 'connect-redis'
import cors from 'cors'
import session from 'express-session'
import Redis from 'ioredis'
import { cookieName, sessionSecret, __prod__, REDIS_URL, CORS_ORIGIN } from './constants'
import { MyContext } from './types'
import { AuthenticationError } from 'apollo-server-express'

export const redis = new Redis(REDIS_URL)
const RedisStore = connectRedis(session)

export const mySession = session({
   name: cookieName,
   store: new RedisStore({ client: redis, disableTouch: true }),
   cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      sameSite: 'lax',
      secure: __prod__,
      domain: __prod__ ? '.some.com' : undefined,
   },
   secret: sessionSecret,
   saveUninitialized: false,
   resave: false,
})

export const myCors = cors({
   origin: __prod__ ? CORS_ORIGIN : 'http://localhost:3000',
   credentials: true,
})

export const isAuth = (ctx: MyContext) => {
   if (!ctx.req.session?.userId) throw new AuthenticationError('no auth')
}
