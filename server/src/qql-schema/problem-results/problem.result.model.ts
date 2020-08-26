import mongoose from 'mongoose'
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Problem } from '../problem/problem.model'
import { User } from '../user/user.model'

@modelOptions({
   options: { customName: 'result' },
})
export class Result extends TimeStamps {
   @prop({ required: true })
   public solution!: string

   @prop({ required: true })
   public success?: Boolean

   @prop({ required: true })
   public errors: Array<string>
}

@modelOptions({
   options: { customName: 'function-call' },
})
export class ProblemResult extends TimeStamps {
   @prop({ required: true, ref: User })
   public userId!: mongoose.Types.ObjectId

   @prop({ required: true, ref: Problem })
   public problemId!: mongoose.Types.ObjectId

   @prop({ required: true })
   public result!: string
}

export const ResultModel = getModelForClass(Result)
export const ProblemResultModel = getModelForClass(ProblemResult)
