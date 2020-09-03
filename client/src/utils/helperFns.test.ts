import { calcAmount } from './helperFns'
export const userProblemIds = ['1', '3', '5']
export const basicsIds = ['1', '2', '3', '4', '5']
test('it should return the number of problems completed by the user in a group', () => {
   const res = calcAmount(userProblemIds, basicsIds)
   expect(res).toBe(3)
})
