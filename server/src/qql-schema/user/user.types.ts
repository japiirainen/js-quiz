import gql from 'graphql-tag'

export default gql`
   type User {
      _id: ID!
      email: String!
      username: String!
      password: String!
      completedProblems: [ID]
      progress: UserProgress
      createdAt: String!
      updatedAt: String!
   }

   enum LEVEL {
      BEGINNER
      MEDIUM
      MASTER
   }

   type UserProgress {
      level: LEVEL!
      points: Int!
   }

   input registerInput {
      email: String!
      username: String!
      password: String!
   }
   input loginInput {
      username: String!
      password: String!
   }

   input forgotPasswordInput {
      email: String!
   }
   input changePasswordInput {
      token: String!
      newPassword: String!
   }

   input updateUserInput {
      _id: ID!
      username: String
      email: String
      password: String
   }

   input updateUserProgressInput {
      _id: ID!
      points: Int!
   }

   type Query {
      me: User
   }

   type Mutation {
      register(input: registerInput): User!
      login(input: loginInput): User!
      forgotPassword(input: forgotPasswordInput): Boolean
      changePassword(input: changePasswordInput): User!
      logout: Boolean
      updateUser(input: updateUserInput): User!
      updateUserProgress(input: updateUserProgressInput): User!
   }
`
