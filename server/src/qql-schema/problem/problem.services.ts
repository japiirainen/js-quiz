import { Problem, ProblemModel } from './problem.model'
import { ApolloError } from 'apollo-server-express'

export const newProblem = async (_: any, { input }: { input: Problem }) => {
   const problem = await ProblemModel.create(input)
   if (!problem) throw new ApolloError('something went wrong!')
   return problem
}
