import gql from 'graphql-tag'

export default gql`
   type User {
      id: ID!
      username: String!
      password: String!
      createdAt: String!
      updatedAt: String!
   }

   input userInput {
      username: String!
      password: String!
   }

   type Query {
      me: User
   }

   type Mutation {
      register(input: userInput): User!
      login(input: userInput): User!
      logout: Boolean
   }
`
