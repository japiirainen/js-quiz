import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Problem } from '../problem/problem.model'

export enum LEVEL {
   BEGINNER = 'BEGINNER',
   MEDIUM = 'MEDIUM',
   MASTER = 'MASTER',
}
@modelOptions({
   options: { customName: 'points-history' },
})
export class UserProgress {
   @prop({ default: 'BEGINNER' })
   public level: LEVEL
   @prop({ default: 0 })
   public points: number
   @prop({})
   public userId: string
   @prop({})
   public problemId: string
}
@modelOptions({
   options: { customName: 'users' },
})
export class User extends TimeStamps {
   @prop({ required: true, unique: true })
   public email!: string

   @prop({ required: true, unique: true })
   public username!: string

   @prop({ required: true, trim: true })
   public password!: string

   @prop({ ref: Problem })
   public completedProblems?: Array<Ref<Problem>>

   @prop({})
   public progress?: UserProgress
}

export const UserModel = getModelForClass(User)
export const UserProgressModel = getModelForClass(UserProgress)
