import gql from 'graphql-tag'

export default gql`
   type Testcase {
      _id: ID!
      problem: ID!
      data: String!
   }

   input newTestcaseInput {
      _id: ID!
      problem: ID!
      data: String!
   }

   extend type Query {
      testCasesForProblem(_id: ID!): [Testcase]!
   }

   extend type Mutation {
      newTestcase(input: newTestcaseInput): Testcase!
   }
`
