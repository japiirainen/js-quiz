import { testRunner, testsToFnCalls, formatError } from '../../utils/testRunner'
import { ProblemModel } from '../problem/problem.model'
import { ApolloError } from 'apollo-server-express'
import { UserModel } from '../user/user.model'

interface ProblemResultInput {
   userId: string
   problemId: string
   solution: string
}

interface Result {
   solution: string
   success: Boolean
   errors: any[]
}

export const submitResult = async (_: any, { input }: { input: ProblemResultInput }) => {
   const problem = await ProblemModel.findById(input.problemId)
   if (!problem?.testCases) throw new ApolloError('No testcases found')
   const testFunctions = testsToFnCalls(problem.testCases)
   const testResults = testRunner(input.solution, testFunctions)
   let result: Result = {
      success: false,
      errors: [],
      solution: input.solution,
   }
   if (!testResults.includes('pass')) {
      result = { success: false, errors: formatError(testResults), solution: input.solution }
      return result
   } else {
      await UserModel.updateOne({ _id: input.userId }, { $push: { completedProblems: problem._id } })
      result = { success: true, errors: [], solution: input.solution }
      return result
   }
}
