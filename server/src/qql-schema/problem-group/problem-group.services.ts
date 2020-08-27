import { ProblemGroup, ProblemGroupModel } from './problem-group.model'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { MyContext } from 'src/utils/types'
import { ProblemModel, Problem } from '../problem/problem.model'

export const newProblemGroup = async (_: any, { input }: { input: ProblemGroup }, { req }: MyContext) => {
   if (!req.session!.userId) throw new AuthenticationError('no auth')
   const doc = await ProblemGroupModel.create(input)
   if (!doc) throw new ApolloError('Something went wrong!')
   return doc
}

export const addProblemToGroup = async (
   _: any,
   { input }: { input: { groupId: ProblemGroup; problemId: Problem } },
   { req }: MyContext
) => {
   if (!req.session!.userId) throw new AuthenticationError('no auth')
   console.log(input.problemId)
   return await ProblemGroupModel.findOneAndUpdate(
      { _id: input.groupId },
      {
         $push: {
            problems: input.problemId,
         },
      },
      { new: true }
   )
}

const getGroupById = async (groupId: any) => {
   return await ProblemModel.findById(groupId)
}

//resolver to return all problems in a group
export const findProblemsInGroup = async (_: any, { _id }: { _id: string }, { req }: MyContext) => {
   if (!req.session!.cookie) throw new AuthenticationError('no auth')
   const group = await ProblemGroupModel.findById(_id)
   if (!group) throw new ApolloError('something went wrong')
   const problems = await Promise.all(group.problems.map(getGroupById))
   if (!problems) throw new ApolloError('no problems found')
   return problems
}
