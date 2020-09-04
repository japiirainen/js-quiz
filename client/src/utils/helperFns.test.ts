import { calcLen, calcColor } from './helperFns'
export const userProblemIds = ['1', '3', '5']
export const basicsIds = ['1', '2', '3', '4', '5']
test('it should return the number of problems completed by the user in a group', () => {
   const res = calcLen(userProblemIds, basicsIds)
   expect(res).toBe(3)
})

test('should calculate color based on value', () => {
   const color = calcColor(50 as never)
   expect(color).toBe('orange')
   const color2 = calcColor(20 as never)
   expect(color2).toBe('red')
   const color3 = calcColor(80 as never)
   expect(color3).toBe('green')
})
