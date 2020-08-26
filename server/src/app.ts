import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { applyMiddleware } from 'graphql-middleware'
import { connect } from './db/connect'
import { schema } from './qql-schema/schema'
import { PORT } from './utils/constants'
import { mySession, redis, myCors } from './utils/middleware'
import { MyContext } from './utils/types'

export const start = async () => {
   connect()

   const app = express()

   // app.set('trust proxy', 1) uncomment this when prod to make cookies work
   app.use(mySession)
   app.use(myCors)

   const server = new ApolloServer({
      schema: applyMiddleware(schema),
      context: ({ req, res }): MyContext => ({ req, res, redis }),
   })

   server.applyMiddleware({ app, cors: false })

   const port = PORT

   app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))
}
