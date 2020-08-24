import gql from 'graphql-tag'

export default gql`
   type User {
      id: ID!
      email: String!
      username: String!
      password: String!
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

   type Query {
      me: User
   }

   type Mutation {
      register(input: registerInput): User!
      login(input: loginInput): User!
      logout: Boolean
   }
`
