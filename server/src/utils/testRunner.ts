import { expect } from 'chai'

export function testRunner(maybeSolution: string, tests: Function[]) {
   let solution: any
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

export function testsToFnCalls(testCases: string[]) {
   return testCases.map((f: any) => new Function('solution', 'expect', f))
}

export function formatError(testResults: any[]) {
   let errors: any = []
   testResults.map(item => {
      const error = {
         message: item.message,
         actual: item.actual,
         expected: item.expected,
      }
      errors.push(error)
   })
   return errors
}
