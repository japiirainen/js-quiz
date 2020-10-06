import { expect } from 'chai'
import { trimAndRemoveComments } from './helperFns'
import * as R from 'ramda'

export function testRunner(maybeSolution: string, tests: Function[]) {
   let solution: any
   maybeSolution = trimAndRemoveComments(maybeSolution)
   console.log(maybeSolution)
   try {
      solution = eval(` 
   const func = ${maybeSolution};
   func
   `)
   } catch (e) {
      console.error(e)
   }
   const results = tests.map(fn => {
      try {
         fn(solution, expect, R)
         return 'pass'
      } catch (err) {
         return err
      }
   })
   return results
}
