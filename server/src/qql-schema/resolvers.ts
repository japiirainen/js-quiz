import { register, login, me, logout } from './user/user.services'

export const resolvers = {
   Query: {
      me: me,
   },
   Mutation: {
      register: register,
      login: login,
      logout: logout,
   },
}
