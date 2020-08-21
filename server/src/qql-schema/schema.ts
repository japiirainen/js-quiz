import { makeExecutableSchema } from 'apollo-server-express'
import { resolvers } from './resolvers'
import user from './user/user.types'

const typeDefs = [user]

export const schema = makeExecutableSchema({ typeDefs, resolvers })
