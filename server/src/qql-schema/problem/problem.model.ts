import mongoose from 'mongoose'
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ProblemGroup } from '../problem-group/problem-group.model'

export enum DIFFICULTY {
   EASY = 'EASY',
   MEDIUM = 'MEDIUM',
   HARD = 'HARD',
}
class PlaceHolderInputOutput {
   @prop({})
   public input: string
   @prop({})
   public output: string
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

   @prop({ required: true })
   public index!: number

   @prop({ ref: ProblemGroup })
   public problemGroup?: mongoose.Types.ObjectId

   @prop({})
   testCases?: Array<string>

   @prop({ required: true })
   public correctSolution!: string

   @prop({ required: true })
   public placeHolder!: string

   @prop({})
   public placeHolderExpectation!: string

   @prop({})
   public placeHolderInputOutput!: PlaceHolderInputOutput

   @prop({})
   public category!: string
}

export const ProblemModel = getModelForClass(Problem)
