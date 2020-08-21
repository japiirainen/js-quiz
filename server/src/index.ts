import express from 'express'
//import { applyMiddleware } from 'graphql-middleware'
import { ApolloServer } from 'apollo-server-express'

const port = 1337
const app = express()

const server = new ApolloServer({
   //schema: applyMiddleware(schema),
   context: ({ req, res }) => ({ req, res }),
})

server.applyMiddleware({ app })

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))
