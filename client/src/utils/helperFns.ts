import { add, subtract, __, multiply, compose, divide, length } from 'ramda'

export const inc = add(1)

export const dec = subtract(__, 1)

export const multBy100 = multiply(100)

export const calcPercentage = compose(Math.round, multBy100, divide(__))

export const filterIds = (userIds: any, groupIds: any) =>
   groupIds.filter((x: any) => userIds.includes(x))

export const calcAmount = compose(length, filterIds)
