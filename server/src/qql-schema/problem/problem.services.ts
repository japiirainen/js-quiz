import { Problem, ProblemModel } from './problem.model'
import { ApolloError } from 'apollo-server-express'

export const newProblem = async (_: any, { input }: { input: Problem }) => {
   const doc = await ProblemModel.create(input)
   if (!doc) throw new ApolloError('something went wrong!')
   return doc
}

export const addTestCase = async (_: any, { input }: { input: { _id: string; testCase: string } }) => {
   await ProblemModel.updateOne(
      { _id: input._id },
      {
         $push: {
            testCases: input.testCase,
         },
      }
   )
   return await ProblemModel.findById(input._id)
}

export const formatTestCases = async (parent: Problem) => {
   const problem = await ProblemModel.findOne({ name: parent.name })
   const testCase = problem?.testCases?.map((x: any) => x.flat())
   return {
      case: testCase,
   }
}

export const getProblemById = async (_: any, { _id }: { _id: string }) => {
   const doc = await ProblemModel.findById(_id)
   if (!doc) throw new ApolloError('something went wrong')
   return doc
}
