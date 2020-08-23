import { register, login } from './user/user.services'

export const resolvers = {
   Query: {
      me: () => 0,
   },
   Mutation: {
      register: register,
      login: login,
   },
}
