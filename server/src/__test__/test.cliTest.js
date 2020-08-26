const userCode = `function add(a, b) { return a + b }`
const problemCalls = [`add(2, 2)`, `add(4, 100)`, `add(0, 5)`].map(call => {
   return eval(`${userCode}${call}`)
})

const results = [4, 104, 5]

const makePairs = (calls, results) => {
   let pairs = []
   calls.map((call, i) => (pairs[i] = { result: call }))
   results.map((res, i) => (pairs[i].expectation = res))
   return pairs
}

test('should add 2 numbers together', () => {
   const pairs = makePairs(problemCalls, results)
   pairs.map(pair => expect(pair.result).toEqual(pair.expectation))
})
