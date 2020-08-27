import mongoose from 'mongoose'
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ProblemGroup } from '../problem-group/problem-group.model'

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

   @prop({ ref: ProblemGroup })
   public problemGroup?: mongoose.Types.ObjectId

   @prop({})
   testCases?: Array<string>

   @prop({ required: true })
   public correctSolution!: string

   @prop({ required: true })
   public placeHolder!: string
}

export const ProblemModel = getModelForClass(Problem)
