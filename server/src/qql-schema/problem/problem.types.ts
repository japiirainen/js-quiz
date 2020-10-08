import gql from 'graphql-tag'

export default gql`
   enum DIFFICULTY {
      EASY
      MEDIUM
      HARD
   }

   type TestCase {
      case: [String]
   }

   type PlaceHolderInputOutput {
      typeSignature: String
      input: String
      output: String
   }

   type PopProblem {
      _id: ID!
      name: String!
      uri: String!
      index: Int!
      problemGroup: String!
      attempts: String!
   }
   type FailProblem {
      _id: ID!
      name: String!
      uri: String!
      index: Int!
      problemGroup: String!
      attempts: String!
      successPrc: String!
   }

   input PlaceHolderInputOutputInput {
      typeSignature: String
      input: String
      output: String
   }

   type Problem {
      _id: ID!
      name: String!
      description: String!
      difficulty: DIFFICULTY!
      index: Int!
      problemGroup: ID
      testCases: TestCase
      correctSolution: String!
      placeHolder: String!
      placeHolderExpectation: String!
      category: String!
      placeHolderInputOutput: PlaceHolderInputOutput!
      isCompleted: Boolean
      attempts: Int
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
      placeHolderExpectation: String!
      category: String!
      placeHolderInputOutput: PlaceHolderInputOutputInput!
   }

   input testCaseInput {
      _id: ID!
      testCase: String!
   }

   type byIndexRes {
      currProblem: Problem!
      prevProblem: Problem
      nextProblem: Problem
   }

   extend type Query {
      getProblemById(_id: ID!): Problem!
      getProblemByIndex(index: Int!): byIndexRes
      getAllProblems: [Problem]!
      getPopularProblems: [PopProblem]!
      getMostFailedProblems: [FailProblem]!
      getRandomProblem: PopProblem!
   }

   extend type Mutation {
      newProblem(input: problemInput): Problem!
      addTestCase(input: testCaseInput): Problem
   }
`
