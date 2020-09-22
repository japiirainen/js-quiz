import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { applyMiddleware } from 'graphql-middleware'
import { connect } from './db/connect'
import { schema } from './qql-schema/schema'
import { PORT } from './utils/constants'
import { mySession, redis, myCors } from './utils/middleware'
import { MyContext } from './utils/types'

export const start = async (): Promise<void> => {
   connect()

   const app = express()

   app.set('trust proxy', 1)
   app.use(mySession)
   app.use(myCors)

   const server = new ApolloServer({
      schema: applyMiddleware(schema),
      context: ({ req, res }): MyContext => ({ req, res, redis }),
      introspection: true,
      playground: true,
   })

   server.applyMiddleware({
      app,
      cors: false,
   })

   app.listen({ port: PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
   )
}
