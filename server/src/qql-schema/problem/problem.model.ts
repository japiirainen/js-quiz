import mongoose from 'mongoose'
import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ProblemGroup } from '../problem-group/problem-gourp.model'
import { FunctionCall } from '../function-call/function-call.model'

export enum DIFFICULTY {
   EASY = 'EASY',
   MEDIUM = 'MEDIUM',
   HARD = 'HARD',
}

@modelOptions({
   options: { customName: 'problem' },
})
export class Problem extends TimeStamps {
   @prop({ required: true, unique: true })
   public name!: string

   @prop({ required: true })
   public description!: string

   @prop({ required: true, enum: DIFFICULTY })
   public difficulty!: string

   @prop({ required: true, unique: true })
   public category!: string

   @prop({ required: true, ref: ProblemGroup })
   public problemGroup!: mongoose.Types.ObjectId

   @prop({ required: true })
   public code!: string

   @prop({ required: true, ref: FunctionCall })
   public testcases!: Array<Ref<FunctionCall>>

   @prop({ required: true })
   public solution!: string
}

export const ProblemModel = getModelForClass(Problem)
