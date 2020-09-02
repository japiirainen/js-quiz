import { add, subtract, __, multiply, compose, divide } from 'ramda'

export const inc = add(1)
export const dec = subtract(__, 1)
export const multBy100 = multiply(100)
export const calcPercentage = compose(Math.round, multBy100, divide(__))
