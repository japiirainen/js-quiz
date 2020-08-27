const { expect } = require('chai')

function testRunner(maybeSolution, tests) {
   let solution
   try {
      solution = eval(` 
   const func = ${maybeSolution};
   func
   `)
   } catch (e) {
      console.error('syntax error')
   }

   const results = tests.map(fn => {
      try {
         fn(solution, expect)
         return 'pass'
      } catch (err) {
         return err
      }
   })
   return results
}

function testsToFnCalls(testCases) {
   return testCases.map(f => new Function('solution', 'expect', f))
}

module.exports = { testRunner, testsToFnCalls }
