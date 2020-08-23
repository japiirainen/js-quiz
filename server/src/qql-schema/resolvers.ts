import { register, login, me } from './user/user.services'

export const resolvers = {
   Query: {
      me: me,
   },
   Mutation: {
      register: register,
      login: login,
   },
}
