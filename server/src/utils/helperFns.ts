import { subtract, add, __, includes, map, pipe, replace, startsWith, trim } from 'ramda'
import { Problem } from 'src/qql-schema/problem/problem.model'
import { Ref } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

export const inc = add(1)

export const dec = subtract(__, 1)

export const isCompleted = (
   problemId: string,
   completeList: Ref<Problem, ObjectId | undefined>[] | undefined
) => {
   const stringId = problemId.toString()
   const stringList = completeList?.length && completeList.map(x => x && x.toString())
   if (!stringList) return false
   return includes(stringId, stringList)
}

export const removeComment = (str: string): string =>
   startsWith('/*', str) ? replace(/\*(.|[\r\n])*?\*\//, '', str) : str

export function testsToFnCalls(testCases: string[]) {
   return testCases.map((f: any) => new Function('solution', 'expect', f))
}

const errorMapper = (item: any) => {
   return { message: item.message, actual: item.actual, expected: item.expected }
}
export const formatError = (testResults: any[]) => map(errorMapper, testResults)

const removeNormalComment = (str: string) => (startsWith('/', str) ? replace(/[/]/g, '', str) : str)

const resolveArrowFn = (str: string) =>
   startsWith('const', str) || startsWith('let', str) || startsWith('var', str)
      ? replace(/[^(]*/, '', str)
      : str

export const trimAndRemoveComments = pipe(removeComment, removeNormalComment, trim, resolveArrowFn)
