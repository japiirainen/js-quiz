import { testRunner, testsToFnCalls, formatError } from '../../utils/testRunner'
import { ProblemModel } from '../problem/problem.model'
import { ApolloError } from 'apollo-server-express'

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
      result.success = false
      result.errors = formatError(testResults)
      result.solution = input.solution
      return result
   } else {
      result.success = true
      result.errors = []
      result.solution = input.solution
      return result
   }
}
