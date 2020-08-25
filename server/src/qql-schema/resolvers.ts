import { register, login, me, logout, forgotPassword, changePassword } from './user/user.services'
import { newProblem } from './problem/problem.services'

export const resolvers = {
   Query: {
      me: me,
   },
   Mutation: {
      register: register,
      login: login,
      logout: logout,
      forgotPassword: forgotPassword,
      changePassword: changePassword,
      newProblem: newProblem,
   },
}
