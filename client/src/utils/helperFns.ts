import { add, subtract, __, multiply, compose, divide, length, lte, cond, always, T } from 'ramda'
import { Maybe } from 'graphql/jsutils/Maybe'

export const inc = add(1)

export const dec = subtract(__, 1)

export const multBy100 = multiply(100)

export const calcPercentage = compose(Math.round, multBy100, divide(__))

export const filterIds = (userIds: Maybe<string>[], groupIds: string[]) =>
   groupIds.filter((x: Maybe<string>) => userIds.includes(x))

export const calcLen = compose(length, filterIds)

export const lte30 = lte(__, 30)
export const lte70 = lte(__, 70)
export const lte100 = lte(__, 100)

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
   [lte30, always('red')],
   [lte70, always('orange')],
   [T, always('green')],
])
