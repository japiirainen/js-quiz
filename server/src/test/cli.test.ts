import { runCLI } from 'jest'
import path from 'path'

const projectRootPath = path.join(__dirname, '..')
console.log(projectRootPath)

const userCode = `function add(a, b) { return a + b }`
const problemCalls = [`add(2, 2)`, `add(4, 100)`, `add(0, 5)`].map(call => {
   return eval(`${userCode}${call}`)
})
const results = ['4', '104', '5'].map(x => Number(x))
test('should add 2 numbers together', () => {
   problemCalls.map(call => {
      results.map(results => () => {
         expect(call).toEqual(results)
      })
   })
})
