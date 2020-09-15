import {
   register,
   login,
   me,
   logout,
   forgotPassword,
   changePassword,
   updateUser,
   updateUserProgress,
} from './user/user.services'
import {
   newProblem,
   addTestCase,
   formatTestCases,
   getProblemById,
   getAllProblems,
   getProblemByIndex,
} from './problem/problem.services'
import { submitResult, getSolution } from './problem-results/problem-result.services'
import {
   newProblemGroup,
   findProblemsInGroup,
   addProblemToGroup,
   getManyGroupsOfProblems,
} from './problem-group/problem-group.services'

export const resolvers = {
   Problem: {
      testCases: formatTestCases,
   },
   Query: {
      me: me,
      getProblemById: getProblemById,
      getProblemByIndex: getProblemByIndex,
      getManyGroupsOfProblems: getManyGroupsOfProblems,
      findProblemsInGroup: findProblemsInGroup,
      getAllProblems: getAllProblems,
      getSolution: getSolution,
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
      updateUser: updateUser,
      updateUserProgress: updateUserProgress,
   },
}
