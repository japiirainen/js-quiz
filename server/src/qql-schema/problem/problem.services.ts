import { Problem, ProblemModel } from './problem.model'
import { ApolloError } from 'apollo-server-express'
import { MyContext } from 'src/utils/types'
import { isAuth } from '../../utils/middleware'
import { ProblemGroupModel } from '../problem-group/problem-group.model'
import { dec, inc } from 'ramda'
import { isCompleted } from '../../utils/helperFns'
import { UserModel } from '../user/user.model'

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

export const getProblemById = async (_: any, { _id }: { _id: string }, { req }: MyContext) => {
   const maybeUser = await UserModel.findById(req.session?.userId)
   if (!maybeUser) {
      return await ProblemModel.findById(_id)
   }
   const doc = await ProblemModel.findById(_id)
   if (!doc) throw new ApolloError('something went wrong')
   doc.isCompleted = isCompleted(doc._id, maybeUser.completedProblems)
   return doc
}

export const getAllProblems = async (_: any, __: any, ctx: MyContext) => {
   isAuth(ctx)
   const docs = await ProblemModel.find()
   if (!docs) throw new ApolloError('something went wrong')
   return docs
}

//returns problem with index and with previous and next indexes
export const getProblemByIndex = async (
   _: any,
   { index }: { index: number },
   { req }: MyContext
) => {
   const [currProblem, prevProblem, nextProblem, user] = await Promise.all([
      ProblemModel.findOne({ index }),
      ProblemModel.findOne({ index: dec(index) }),
      ProblemModel.findOne({ index: inc(index) }),
      UserModel.findById(req.session?.userId),
   ])
   if (currProblem) {
      currProblem.isCompleted = isCompleted(currProblem._id, user?.completedProblems)
      return {
         currProblem,
         prevProblem,
         nextProblem,
      }
   } else {
      throw new ApolloError('no problem found with that index')
   }
}
