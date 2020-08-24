import mongoose from 'mongoose'
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Problem } from '../problem/problem.model'

@modelOptions({
   options: { customName: 'testcase' },
})
export class Testcase extends TimeStamps {
   @prop({ required: true, ref: Problem })
   public problem!: mongoose.Types.ObjectId

   @prop({ required: true })
   public data!: string
}

export const TestcaseModel = getModelForClass(Testcase)
