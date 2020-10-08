import { ProblemGroup, ProblemGroupModel } from './problem-group.model'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { MyContext } from 'src/utils/types'
import { ProblemModel, Problem } from '../problem/problem.model'
import { isAuth } from '../../utils/middleware'

export const newProblemGroup = async (_: any, { input }: { input: ProblemGroup }) => {
   //isAuth(ctx)
   const maybeDoc = await ProblemGroupModel.findOne({ name: input.name })
   if (maybeDoc) throw new ApolloError('group with that name already exists')
   const doc = await ProblemGroupModel.create(input)
   if (!doc) throw new ApolloError('Something went wrong!')
   return doc
}

export const addProblemToGroup = async (
   _: any,
   { input }: { input: { groupId: ProblemGroup; problemId: Problem } },
   ctx: MyContext
) => {
   isAuth(ctx)
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
export const findProblemsInGroup = async (
   _: any,
   { groupName }: { groupName: string },
   { req }: MyContext
) => {
   if (!req.session!.cookie) throw new AuthenticationError('no auth')
   const group = await ProblemGroupModel.findOne({ name: groupName })
   if (!group) throw new ApolloError('something went wrong')
   const problems = await Promise.all(group.problems.map(getGroupById))
   if (!problems) throw new ApolloError('no problems found')
   return problems
}

export const getManyGroupsOfProblems = async (
   _: any,
   { names }: { names: string[] },
   ctx: MyContext
) => {
   isAuth(ctx)
   const [...problemGroups] = await Promise.all(
      names.map(name => ProblemGroupModel.findOne({ name: name }))
   )
   const [...problems] = await Promise.all(
      problemGroups.map(g => g && Promise.all(g.problems.map(getGroupById)))
   )
   return {
      g1: problems[0],
      g2: problems[1],
      g3: problems[2],
      g4: problems[3],
      g5: problems[4],
   }
}
