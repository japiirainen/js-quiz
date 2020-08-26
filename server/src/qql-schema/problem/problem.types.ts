import gql from 'graphql-tag'

export default gql`
   enum DIFFICULTY {
      EASY
      MEDIUM
      HARD
   }

   type Problem {
      _id: ID!
      name: String!
      description: String!
      difficulty: DIFFICULTY!
      category: String!
      problemGroup: ID!
      testCases: [String!]!
      solution: String!
   }

   input problemInput {
      name: String!
      description: String!
      difficulty: DIFFICULTY!
      category: String!
      problemGroup: ID!
      testCases: [String!]!
      solution: String!
   }

   extend type Query {
      problem: Problem!
      allProblems: [Problem]!
   }

   extend type Mutation {
      newProblem(input: problemInput): Problem!
   }
`
