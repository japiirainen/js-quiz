import gql from 'graphql-tag'

export default gql`
   type ProblemGroup {
      _id: ID!
      name: String!
      problems: [ID!]!
   }

   input problemGroupInput {
      name: String!
   }

   input addProblem {
      groupId: ID!
      problemId: ID!
   }

   extend type Query {
      problemGroup(_id: ID!): ProblemGroup!
   }

   extend type Mutation {
      newProblemGroup(input: problemGroupInput): ProblemGroup!
      addProblemToProblemGroup(input: addProblem): ProblemGroup
   }
`
