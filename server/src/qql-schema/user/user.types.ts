import gql from 'graphql-tag'

export default gql`
   type User {
      id: ID!
      username: String!
      email: String!
   }

   type Query {
      me: User
   }
`
