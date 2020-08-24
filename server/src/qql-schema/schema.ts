import { makeExecutableSchema } from 'apollo-server-express'
import { resolvers } from './resolvers'
import user from './user/user.types'
import testcase from './testcase/testcase.types'
import problem from './problem/problem.types'
import problemGroup from './problem-group/problem-group.types'

const typeDefs = [user, testcase, problem, problemGroup]

export const schema = makeExecutableSchema({ typeDefs, resolvers })
