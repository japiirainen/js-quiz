import { runTests } from '../../utils/testRunning'
import { writeTestSuite } from '../../utils/testRunning'
const userCode = `function add(a, b) { return a + b }`
const problemCalls = [`add(2, 2)`, `add(4, 100)`, `add(0, 5)`].map(call => {
   return eval(`${userCode}${call}`)
})

const results = ['4', '104', '5'].map(x => Number(x))

export const makePairs = (calls: string[], results: number[]) => {
   let pairs: any = []
   calls.map((call, i) => (pairs[i] = { result: call }))
   results.map((res, i) => (pairs[i].expectation = res))
   return pairs
}
test('should transform data to pairs and execute tests on it', async () => {
   await writeTestSuite(problemCalls, results, makePairs)
   await runTests()
})
