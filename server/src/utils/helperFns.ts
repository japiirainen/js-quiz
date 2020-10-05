import { subtract, add, __, includes } from 'ramda'
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
