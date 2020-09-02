import gql from 'graphql-tag'

export default gql`
   type ProblemResult {
      userId: ID!
      problemId: ID!
      result: Result
   }

   type Error {
      message: String
      actual: String
      expected: String
   }

   type Result {
      solution: String!
      success: Boolean
      errors: [Error]
      user: User
   }

   input ProblemResultInput {
      userId: ID
      problemId: ID!
      solution: String!
   }

   extend type Mutation {
      submitResult(input: ProblemResultInput!): Result
   }
`
