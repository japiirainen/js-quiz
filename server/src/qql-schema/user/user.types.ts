import gql from 'graphql-tag'

export default gql`
   type User {
      _id: ID!
      email: String!
      username: String!
      password: String!
      completedProblems: [ID]
      createdAt: String!
      updatedAt: String!
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

   type Query {
      me: User
   }

   type Mutation {
      register(input: registerInput): User!
      login(input: loginInput): User!
      forgotPassword(input: forgotPasswordInput): Boolean
      changePassword(input: changePasswordInput): User!
      logout: Boolean
   }
`
