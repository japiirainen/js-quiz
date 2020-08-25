import mongoose from 'mongoose'
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Problem } from '../problem/problem.model'
import { User } from '../user/user.model'

@modelOptions({
   options: { customName: 'function-call' },
})
export class FunctionCall extends TimeStamps {
   @prop({ required: true, ref: User })
   public userId!: mongoose.Types.ObjectId

   @prop({ required: true, ref: Problem })
   public problemId!: mongoose.Types.ObjectId

   @prop({ required: true })
   public userCode!: string

   @prop({ required: true })
   public problemFn!: string

   @prop({ required: true })
   public problemCalls!: Array<string>

   @prop({ required: true })
   public results!: Array<string>
}

export const FunctionCallModel = getModelForClass(FunctionCall)
