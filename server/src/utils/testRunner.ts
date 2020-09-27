import { expect } from 'chai'
import { startsWith, replace, map, trim, pipe } from 'ramda'

export function testRunner(maybeSolution: string, tests: Function[]) {
   let solution: any
   maybeSolution = trimAndRemoveComments(maybeSolution)
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
export const removeComment = (str: string): string =>
   startsWith('/*', str) ? replace(/\*(.|[\r\n])*?\*/, '', str) : str

export function testsToFnCalls(testCases: string[]) {
   return testCases.map((f: any) => new Function('solution', 'expect', f))
}

const errorMapper = (item: any) => {
   return { message: item.message, actual: item.actual, expected: item.expected }
}
export const formatError = (testResults: any[]) => map(errorMapper, testResults)

const removeNormalComment = (str: string) => (startsWith('/', str) ? replace(/[/]/g, '', str) : str)

const trimAndRemoveComments = pipe(removeComment, removeNormalComment, trim)
