import { ProblemGroup, ProblemGroupModel } from './problem-group.model'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { MyContext } from 'src/utils/types'

export const newProblemGroup = async (_: any, { input }: { input: ProblemGroup }, { req }: MyContext) => {
   if (!req.session!.userId) throw new AuthenticationError('no auth')
   const doc = await ProblemGroupModel.create(input)
   if (!doc) throw new ApolloError('Something went wrong!')
   return doc
}
