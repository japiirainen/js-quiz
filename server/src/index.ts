import express from 'express'
import { applyMiddleware } from 'graphql-middleware'
import { ApolloServer } from 'apollo-server-express'
import { connect } from './db/connect'
import { PORT } from './utils/constants'
import { schema } from './qql-schema/schema'

connect()

const app = express()

const server = new ApolloServer({
   schema: applyMiddleware(schema),
   context: ({ req, res }) => ({ req, res }),
})

server.applyMiddleware({ app })

const port = PORT

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))
