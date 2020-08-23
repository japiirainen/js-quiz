import { ApolloServer } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import express from 'express'
import session from 'express-session'
import { applyMiddleware } from 'graphql-middleware'
import redis from 'redis'
import { connect } from './db/connect'
import { schema } from './qql-schema/schema'
import { PORT, sessionSecret, __prod__, cookieName } from './utils/constants'
import { MyContext } from './utils/types'

const main = async () => {
   connect()

   const app = express()

   const RedisStore = connectRedis(session)
   const redisClient = redis.createClient()

   app.use(
      session({
         name: cookieName,
         store: new RedisStore({ client: redisClient, disableTouch: true }),
         cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            httpOnly: true,
            sameSite: 'lax',
            secure: __prod__,
            domain: __prod__ ? '.codeponder.com' : undefined,
         },
         secret: sessionSecret,
         saveUninitialized: false,
         resave: false,
      })
   )

   const server = new ApolloServer({
      schema: applyMiddleware(schema),
      context: ({ req, res }): MyContext => ({ req, res }),
   })

   server.applyMiddleware({ app, cors: false })

   const port = PORT

   app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))
}

main().catch(err => {
   console.error(err)
})
