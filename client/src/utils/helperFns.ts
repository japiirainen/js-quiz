import { add, subtract, __, multiply, compose, divide, length } from 'ramda'
import { Maybe } from 'graphql/jsutils/Maybe'

export const inc = add(1)

export const dec = subtract(__, 1)

export const multBy100 = multiply(100)

export const calcPercentage = compose(Math.round, multBy100, divide(__))

export const filterIds = (userIds: Maybe<string>[], groupIds: string[]) =>
   groupIds.filter((x: Maybe<string>) => userIds.includes(x))

export const calcLen = compose(length, filterIds)

export const calcColor = (val: number) => {
   if (val < 30) {
      return 'red'
   } else if (val < 70) {
      return 'orange'
   }
   return 'green'
}
