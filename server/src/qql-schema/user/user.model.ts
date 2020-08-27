import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Problem } from '../problem/problem.model'

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
}

export const UserModel = getModelForClass(User)
