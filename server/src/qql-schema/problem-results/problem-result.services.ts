import { testRunner, testsToFnCalls, formatError } from '../../utils/testRunner'
import { ProblemModel } from '../problem/problem.model'
import { ApolloError } from 'apollo-server-express'
import { UserModel } from '../user/user.model'
import { ProblemResultInputIf, ResultIf } from './problem.result.model'

export const submitResult = async (_: any, { input }: { input: ProblemResultInputIf }) => {
   const [problem, user] = await Promise.all([
      ProblemModel.findById(input.problemId),
      UserModel.findById(input.userId),
   ])
   if (!problem?.testCases) throw new ApolloError('No testcases found')
   const testFunctions = testsToFnCalls(problem.testCases)
   const testResults = testRunner(input.solution, testFunctions)
   let result: ResultIf = {
      success: false,
      errors: [],
      solution: input.solution,
      user: null,
   }
   if (!testResults.includes('pass')) {
      result = {
         success: false,
         errors: formatError(testResults),
         solution: input.solution,
         user: null,
      }
      return result
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
      result = {
         success: true,
         errors: [],
         solution: input.solution,
         user: await UserModel.findById(input.userId),
      }
      return result
   }
}
