import { Problem, ProblemModel } from './problem.model'
import { ApolloError } from 'apollo-server-express'
import { MyContext } from 'src/utils/types'
import { isAuth } from '../../utils/middleware'
import { ProblemGroupModel } from '../problem-group/problem-group.model'

export const newProblem = async (_: any, { input }: { input: Problem }, ctx: MyContext) => {
   isAuth(ctx)
   const doc = await ProblemModel.create(input)
   if (!doc) throw new ApolloError('something went wrong!')
   await ProblemGroupModel.findOneAndUpdate(
      { _id: input.problemGroup },
      {
         $push: {
            problems: doc._id,
         },
      }
   )

   return doc
}
//need to make some kind of testCase formatter

export const addTestCase = async (
   _: any,
   { input }: { input: { _id: string; testCase: string } },
   ctx: MyContext
) => {
   isAuth(ctx)
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

export const getAllProblems = async (_: any, __: any, ctx: MyContext) => {
   isAuth(ctx)
   const docs = await ProblemModel.find()
   if (!docs) throw new ApolloError('something went wrong')
   return docs
}
