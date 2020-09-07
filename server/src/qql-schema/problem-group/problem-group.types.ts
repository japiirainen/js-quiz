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
   type manyGroupRes {
      g1: [Problem]
      g2: [Problem]
      g3: [Problem]
      g4: [Problem]
      g5: [Problem]
   }

   extend type Query {
      problemGroup(_id: ID!): ProblemGroup!
      findProblemsInGroup(groupName: String!): [Problem]
      getManyGroupsOfProblems(names: [String]): manyGroupRes!
   }

   extend type Mutation {
      newProblemGroup(input: problemGroupInput): ProblemGroup!
      addProblemToGroup(input: addProblem): ProblemGroup
   }
`
