import { testRunner, testsToFnCalls, formatError } from '../../utils/testRunner'
import { ProblemModel } from '../problem/problem.model'
import { ApolloError } from 'apollo-server-express'
import { UserModel } from '../user/user.model'
import { ProblemResultInputIf, Solution } from './problem.result.model'
import { SolutionModel } from './problem.result.model'
import { isAuth } from '../../utils/middleware'
import { MyContext } from '../../utils/types'

export const submitResult = async (_: any, { input }: { input: ProblemResultInputIf }) => {
   const [problem, user] = await Promise.all([
      ProblemModel.findById(input.problemId),
      UserModel.findById(input.userId),
   ])

   if (!problem?.testCases) throw new ApolloError('No testcases found')
   const testFunctions = testsToFnCalls(problem.testCases)
   const testResults = testRunner(input.solution, testFunctions)

   if (!testResults.includes('pass')) {
      return {
         success: false,
         errors: formatError(testResults),
         solution: input.solution,
         user: null,
      }
   } else {
      input.userId &&
         !user?.completedProblems?.includes(problem.id) &&
         (await UserModel.updateOne(
            { _id: input.userId },
            {
               $push: {
                  completedProblems: problem.id,
               },
            }
         ))
      input.userId &&
         (await SolutionModel.create({
            userId: input.userId,
            problemId: input.problemId,
            solution: input.solution,
         }))
      return {
         success: true,
         errors: [],
         solution: await SolutionModel.findOne({
            userId: input.userId,
            problemId: input.problemId,
            solution: input.solution,
         }),
         user: await UserModel.findById(input.userId),
      }
   }
}

export const getSolution = async (
   _: any,
   { input }: { input: { userId: string; problemId: string } },
   ctx: MyContext
): Promise<Solution | undefined> => {
   isAuth(ctx)
   const solution = await SolutionModel.findOne({
      userId: input.userId,
      problemId: input.problemId,
   })
   if (!solution) throw new ApolloError('couldnt find a solution')
   return solution
}
