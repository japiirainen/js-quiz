import argon2 from 'argon2'
import { validateUser, validatePassword } from '../../utils/validations'
import { User, UserModel } from './user.model'
import { AuthenticationError } from 'apollo-server-express'
import { MyContext } from 'src/utils/types'
import { cookieName, PASSWORD_RESET_TEXT, FORGOT_PASSWORD_PREFIX } from '../../utils/constants'
import { sendEmail } from '../../utils/sendEmail'
import { v4 } from 'uuid'
import { isAuth } from '../../utils/middleware'
import { add } from 'ramda'

export const register = async (_: any, { input }: { input: User }, { req }: MyContext) => {
   const user = await UserModel.findOne({ username: input.username })
   if (user) throw new AuthenticationError(`user with username: ${input.username} already exists`)
   const hashedPassword = await argon2.hash(input.password)
   const userInput = {
      username: input.username,
      password: hashedPassword,
      email: input.email,
   }
   if (userInput) {
      try {
         await validateUser(input.username, input.password, input.email)
         const newUser = await UserModel.create(userInput)
         req.session!.userId = newUser._id
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
         req.session!.userId = user._id
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

export const forgotPassword = async (_: any, { input }: { input: User }, { redis }: MyContext) => {
   const user = await UserModel.findOne({ email: input.email })
   if (!user) {
      return false
   }
   const token = v4()

   redis.set(FORGOT_PASSWORD_PREFIX + token, user._id, 'ex', 1000 * 60 * 60 * 24)

   await sendEmail(user.email, PASSWORD_RESET_TEXT(token))
   return true
}

export const changePassword = async (
   _: any,
   { input }: { input: { token: string; newPassword: string } },
   { redis }: MyContext
) => {
   const validPassword = await validatePassword(input.newPassword)

   const key = FORGOT_PASSWORD_PREFIX + input.token
   const userId = await redis.get(key)

   if (!userId) throw new AuthenticationError('No auth')
   if (!validPassword) throw new AuthenticationError('Password must be at least 2 characters long')
   await UserModel.updateOne(
      { _id: userId },
      {
         $set: {
            password: await argon2.hash(validPassword.password),
         },
      }
   )
   await redis.del(key)
   return await UserModel.findById(userId)
}

export const updateUser = async (
   _: any,
   { input }: { input: { password: string; _id: string; username: string } },
   ctx: MyContext
) => {
   isAuth(ctx)
   const maybeUser = await UserModel.findById(input._id)
   if (!maybeUser) throw new AuthenticationError('no user found')
   if (input.password) {
      const validPassword = await validatePassword(input.password)
      if (!validPassword)
         throw new AuthenticationError('Password must be at least 2 characters long')
      await maybeUser.updateOne({
         username: input.username || maybeUser.username,
         password: await argon2.hash(validPassword.password),
      })
      return await UserModel.findById(maybeUser._id)
   } else {
      await maybeUser.updateOne({ username: input.username })
      return await UserModel.findById(maybeUser._id)
   }
}

const calcNewProgress = async (user: User, incPoints: number) => {
   const points = user.progress?.points as number
   const updatedPoints = points ? add(points, incPoints) : incPoints
   if (!points || updatedPoints < 100) {
      return { newLevel: 'BEGINNER', newPoints: updatedPoints }
   } else if (updatedPoints >= 100 && updatedPoints < 200) {
      return { newLevel: 'MEDIUM', newPoints: updatedPoints }
   } else return { newLevel: 'MASTER', newPoints: updatedPoints }
}

export const updateUserProgress = async (
   _: any,
   { input }: { input: { _id: User; points: number } }
) => {
   const user = await UserModel.findById(input._id)
   if (!user) return
   const { newLevel, newPoints } = await calcNewProgress(user, input.points)
   return await UserModel.findOneAndUpdate(
      { _id: input._id },
      {
         $set: {
            progress: {
               level: newLevel as any,
               points: newPoints,
            },
         },
      },
      { new: true }
   )
}
