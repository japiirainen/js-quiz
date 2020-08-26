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
module.exports = { testRunner }
