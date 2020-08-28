import { register, login, me, logout, forgotPassword, changePassword } from './user/user.services'
import { newProblem, addTestCase, formatTestCases, getProblemById } from './problem/problem.services'
import { submitResult } from './problem-results/problem-result.services'
import { newProblemGroup, findProblemsInGroup, addProblemToGroup } from './problem-group/problem-group.services'

export const resolvers = {
   Problem: {
      testCases: formatTestCases,
   },
   Query: {
      me: me,
      getProblemById: getProblemById,
      findProblemsInGroup: findProblemsInGroup,
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
      addProblemToGroup: addProblemToGroup,
   },
}
