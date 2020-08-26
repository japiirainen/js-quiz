import gql from 'graphql-tag'

export default gql`
   type ProblemResult {
      userId: ID!
      problemId: ID!
      result: Result
   }

   type Result {
      solution: String!
      success: Boolean
      errors: [String]
   }

   input ProblemResultInput {
      userId: ID!
      problemId: ID!
      solution: String!
   }

   extend type Mutation {
      submitResult(input: ProblemResultInput!): Result
   }
`
