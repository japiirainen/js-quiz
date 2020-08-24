import { register, login, me, logout, forgotPassword, changePassword } from './user/user.services'

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
   },
}
