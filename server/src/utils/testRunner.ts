import { expect } from 'chai'
import { startsWith, replace, map } from 'ramda'

export function testRunner(maybeSolution: string, tests: Function[]) {
   let solution: any
   try {
      if (resolveArrowFn(maybeSolution)) {
         maybeSolution = replace(/[^(]*/, '', maybeSolution)
      }
      solution = eval(` 
   const func = ${maybeSolution};
   func
   `)
   } catch (e) {
      console.error(e)
   }
   console.log(solution)
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

const resolveArrowFn = (str: string) => {
   return startsWith('const', str) || startsWith('let', str) || startsWith('var', str)
}

export function testsToFnCalls(testCases: string[]) {
   return testCases.map((f: any) => new Function('solution', 'expect', f))
}

const errorMapper = (item: any) => {
   return { message: item.message, actual: item.actual, expected: item.expected }
}
export const formatError = (testResults: any[]) => map(errorMapper, testResults)
