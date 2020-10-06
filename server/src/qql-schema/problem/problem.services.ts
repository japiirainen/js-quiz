/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Problem, ProblemModel } from './problem.model'
import { ApolloError } from 'apollo-server-express'
import { MyContext } from 'src/utils/types'
import { isAuth } from '../../utils/middleware'
import { ProblemGroup, ProblemGroupModel } from '../problem-group/problem-group.model'
import { compose, dec, divide, inc, length, multiply, prop, sortBy, take } from 'ramda'
import { isCompleted } from '../../utils/helperFns'
import { UserModel } from '../user/user.model'
import { DocumentType } from '@typegoose/typegoose'
import { SolutionModel } from '../problem-results/problem.result.model'

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

const formatPopular = (popProbls: any[], probGrps: (DocumentType<ProblemGroup> | null)[]) => {
   const groupNames = probGrps.map(x => x?.name)
   const formattedProblems = popProbls.map(x => ({
      _id: x._id,
      name: x.name,
      index: x.index,
      attempts: x.attempts,
   }))
   return formattedProblems.map((v, i) => ({
      ...v,
      problemGroup: groupNames[i],
   }))
}

export const getPopularProblems = async () => {
   const popularProblems = await ProblemModel.find().sort({ attempts: -1 }).limit(5)
   const groupIds = popularProblems.map(x => x.problemGroup)
   const problemGroups = await Promise.all(groupIds.map(id => ProblemGroupModel.findById(id)))
   if (!popularProblems || !problemGroups) throw new ApolloError('could not find problems')
   return formatPopular(popularProblems, problemGroups)
}

export const getMostFailedProblems = async () => {
   const [allProblems, solutions] = await Promise.all([ProblemModel.find(), SolutionModel.find()])

   const successPercentage = allProblems
      .map(v => ({
         _id: v._id,
         index: v.index,
         name: v.name,
         group: v.problemGroup,
         attempts: v.attempts,
         solutionsCount: length(solutions.filter(s => s.problemId.toString() === v._id.toString())),
      }))
      .map(x => ({
         ...x,
         //@ts-ignore
         successPrc: divide(x.solutionsCount === 0 ? 1 : x.solutionsCount, x.attempts),
      }))
   //@ts-ignore
   const fiveMostFailed = compose(take(5), sortBy(prop('successPrc')))(successPercentage)

   return fiveMostFailed.map(async (x: any) => {
      const pGroup = await ProblemGroupModel.findById(x.group)
      return {
         _id: x._id,
         name: x.name,
         index: x.index,
         problemGroup: pGroup?.name,
         attempts: x.attempts,
         successPrc: multiply(100, x.successPrc.toFixed(2)),
      }
   })
}

export const getRandomProblem = async (_: any, __: any, ctx: MyContext) => {
   const [problems, user] = await Promise.all([
      ProblemModel.find(),
      UserModel.findById(ctx.req.session?.userId),
   ])
   const notCopletedProblems = problems.filter(
      problem => !user?.completedProblems?.map(id => id && id.toString()).includes(problem._id)
   )
   return notCopletedProblems[Math.floor(Math.random() * notCopletedProblems.length)]
}
