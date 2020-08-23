import argon2 from 'argon2'
import * as yup from 'yup'
import { User, UserModel } from './user.model'
import { AuthenticationError } from 'apollo-server-express'

const schema = yup.object().shape({
   username: yup.string().trim().min(2).required(),
   password: yup.string().min(2).max(250).required(),
})

export const register = async (_: any, { input }: { input: User }) => {
   const user = await UserModel.findOne({ username: input.username })
   if (user) throw new AuthenticationError(`user with username: ${input.username} already exists`)
   const hashedPassword = await argon2.hash(input.password)
   const userInput = {
      username: input.username,
      password: hashedPassword,
   }
   if (userInput) {
      try {
         await schema.validate(
            { username: input.username, password: input.password },
            {
               abortEarly: false,
            }
         )
         const newUser = await UserModel.create(userInput)
         return newUser
      } catch (e) {
         throw new AuthenticationError(e)
      }
   } else {
      throw new AuthenticationError('Registration failed, please try again later.')
   }
}

export const login = async (_: any, { input }: { input: User }) => {
   const user = await UserModel.findOne({ username: input.username })
   if (!user) {
      throw new AuthenticationError('no user found with username or password')
   } else {
      const valid = await argon2.verify(user.password, input.password)
      if (!valid) {
         throw new AuthenticationError('username or password incorrect')
      } else {
         return user
      }
   }
}
