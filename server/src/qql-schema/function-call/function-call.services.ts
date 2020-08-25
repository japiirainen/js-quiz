import { FunctionCall, FunctionCallModel } from './function-call.model'
import { ApolloError } from 'apollo-server-express'

export const newTestcase = async (_: any, { input }: { input: FunctionCall }) => {
   const testCase = await FunctionCallModel.create(input)
   if (!testCase) throw new ApolloError('something went wrong!')
   return testCase
}
