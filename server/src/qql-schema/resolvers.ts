import { register, login, me, logout, forgotPassword, changePassword } from './user/user.services'
import { newProblem, addTestCase } from './problem/problem.services'
import { submitResult } from './problem-results/problem-result.services'
import { newProblemGroup } from './problem-group/problem-group.services'

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
      addTestCase: addTestCase,
      submitResult: submitResult,
      newProblemGroup: newProblemGroup,
   },
}
