import { calcLen, calcColor, calcValue } from './helperFns'
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

test('should return numbers between 0 and 100', () => {
   const number1 = calcValue(50)
   expect(number1).toBe(50)
   const number2 = calcValue(140)
   expect(number2).toBe(40)
   const number3 = calcValue(240)
   expect(number3).toBe(40)
   const number4 = calcValue(200)
   expect(number4).toBe(0)
})
