import gql from 'graphql-tag'

export default gql`
   type FunctionCall {
      _id: ID!
      user: ID!
      userCode: String!
      problemFn: String!
      problemCalls: [String!]!
      results: [String!]!
   }

   input newFunctionCall {
      userId: ID!
      problemId: ID!
      userCode: String!
      problemFn: String!
      problemCalls: [String!]!
      results: [String!]!
   }

   type Result {
      success: Boolean
      errors: [String]
   }

   extend type Mutation {
      functionCall(input: newFunctionCall): Result
   }
`
