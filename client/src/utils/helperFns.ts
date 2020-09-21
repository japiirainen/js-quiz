import {
   add,
   subtract,
   __,
   multiply,
   compose,
   divide,
   length,
   lte,
   cond,
   always,
   T,
   identity,
   gte,
} from 'ramda'
import { Maybe } from 'graphql/jsutils/Maybe'

export const inc = add(1)

export const dec = subtract(__, 1)

export const multBy100 = multiply(100)

export const calcPercentage = compose(Math.round, multBy100, divide(__))

export const filterIds = (userIds: Maybe<string>[], groupIds: string[]) =>
   groupIds.filter((x: Maybe<string>) => userIds.includes(x))

export const calcLen = compose(length, filterIds)

export const calcColor_ = (val: number) => {
   if (val <= 30) {
      return 'red'
   } else if (val <= 70) {
      return 'orange'
   } else {
      return 'green'
   }
}

export const calcColor = cond([
   [lte(__, 30), always('red')],
   [lte(__, 70), always('orange')],
   [T, always('green')],
])
enum LEVEL {
   BEGINNER = 'BEGINNER',
   MEDIUM = 'MEDIUM',
   MASTER = 'MASTER',
}
export const calcUserLevelColor = (level: LEVEL) => {
   if (level === 'BEGINNER') {
      return 'green.500'
   } else if (level === 'MEDIUM') {
      return 'orange.500'
   } else {
      return 'red.500'
   }
}

export const calcValue = (n: number) =>
   cond([
      [gte(__, 300), always(subtract(n, 300))],
      [gte(__, 200), always(subtract(n, 200))],
      [gte(__, 100), always(subtract(n, 100))],
      [T, identity],
   ])(n as never)

export function sleep(ms: number) {
   return new Promise(fulfil => {
      setTimeout(fulfil, ms)
   })
}
