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
      index: Int!
      problemGroup: ID
      testCases: [String!]
      correctSolution: String!
      placeHolder: String!
   }

   input problemInput {
      name: String!
      description: String!
      difficulty: DIFFICULTY!
      index: Int!
      problemGroup: ID
      testCases: [String]
      correctSolution: String!
      placeHolder: String!
   }

   input testCaseInput {
      _id: ID!
      testCase: String!
   }

   extend type Query {
      problem: Problem!
      allProblems: [Problem]!
   }

   extend type Mutation {
      newProblem(input: problemInput): Problem!
      addTestCase(input: testCaseInput): Problem
   }
`
