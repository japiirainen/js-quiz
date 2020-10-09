import { testRunner } from '../../utils/testRunner'
import { testsToFnCalls, formatError } from '../../utils/helperFns'
import { ProblemModel } from '../problem/problem.model'
import { ApolloError } from 'apollo-server-express'
import { UserModel } from '../user/user.model'
import { ProblemResultInputIf, Solution } from './problem.result.model'
import { SolutionModel } from './problem.result.model'

const isFail = (testResults: string[]) => {
   return testResults.find(x => typeof x === 'object')
}

const createSolution = async (userId: string, problemId: string, solution: string) => {
   const maybeSolution = await SolutionModel.findOne({ userId, problemId })
   if (!maybeSolution) await SolutionModel.create({ userId, problemId, solution })
   const result = await maybeSolution?.updateOne({ userId, problemId, solution }, { new: true })
   return result
}

export const submitResult = async (_: any, { input }: { input: ProblemResultInputIf }) => {
   const [problem, user] = await Promise.all([
      ProblemModel.findOneAndUpdate({ _id: input.problemId }, { $inc: { attempts: 1 } }),
      UserModel.findById(input.userId),
   ])
   if (!problem?.testCases) throw new ApolloError('No testcases found')
   const testFunctions = testsToFnCalls(problem.testCases)
   const testResults = testRunner(input.solution, testFunctions as any)

   if (isFail(testResults)) {
      return {
         success: false,
         errors: formatError(testResults),
         solution: input.solution,
         user: null,
      }
   } else {
      input.userId && (await createSolution(input.userId, input.problemId, input.solution))
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
   { input }: { input: { userId: string; problemId: string } }
): Promise<Solution | undefined> => {
   const solution = await SolutionModel.findOne({
      userId: input.userId,
      problemId: input.problemId,
   })
   if (!solution) throw new ApolloError('couldnt find a solution')
   return solution
}
