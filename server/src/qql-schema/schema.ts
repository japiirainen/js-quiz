import { makeExecutableSchema } from 'apollo-server-express'
import { resolvers } from './resolvers'
import user from './user/user.types'
import functionCall from './function-call/function-call.types'
import problem from './problem/problem.types'
import problemGroup from './problem-group/problem-group.types'

const typeDefs = [user, functionCall, problem, problemGroup]

export const schema = makeExecutableSchema({ typeDefs, resolvers })
