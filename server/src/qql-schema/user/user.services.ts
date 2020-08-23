import argon2 from 'argon2'
import { validateUser } from '../../utils/validations'
import { User, UserModel } from './user.model'
import { AuthenticationError } from 'apollo-server-express'
import { MyContext } from 'src/utils/types'
import { cookieName } from '../../utils/constants'

export const register = async (_: any, { input }: { input: User }, { req }: MyContext) => {
   const user = await UserModel.findOne({ username: input.username })
   if (user) throw new AuthenticationError(`user with username: ${input.username} already exists`)
   const hashedPassword = await argon2.hash(input.password)
   const userInput = {
      username: input.username,
      password: hashedPassword,
   }
   if (userInput) {
      try {
         await validateUser(input.username, input.password)
         const newUser = await UserModel.create(userInput)
         req.session!.userId = newUser.id
         return newUser
      } catch (e) {
         throw new AuthenticationError(e)
      }
   } else {
      throw new AuthenticationError('Registration failed, please try again later.')
   }
}

export const login = async (_: any, { input }: { input: User }, { req }: MyContext) => {
   const user = await UserModel.findOne({ username: input.username })
   if (!user) {
      throw new AuthenticationError('no user found with username or password')
   } else {
      const valid = await argon2.verify(user.password, input.password)
      if (!valid) {
         throw new AuthenticationError('username or password incorrect')
      } else {
         req.session!.userId = user.id
         return user
      }
   }
}

export const me = async (_: any, __: any, { req }: MyContext) => {
   if (!req.session!.userId) {
      return null
   }
   return await UserModel.findById(req.session!.userId)
}

export const logout = async (_: any, __: any, { req, res }: MyContext) => {
   return new Promise(resolve =>
      req.session?.destroy(err => {
         res.clearCookie(cookieName)
         if (err) {
            console.log(err)
            resolve(false)
            return
         }
         resolve(true)
      })
   )
}
