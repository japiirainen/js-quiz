import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

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
}

export const UserModel = getModelForClass(User)
