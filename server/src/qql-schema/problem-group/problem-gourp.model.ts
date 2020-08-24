import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Problem } from '../problem/problem.model'

@modelOptions({
   options: { customName: 'problem-group' },
})
export class ProblemGroup extends TimeStamps {
   @prop({ required: true, unique: true })
   public name!: string

   @prop({ ref: Problem })
   public problems?: Array<Ref<Problem>>
}

export const ProblemGroupModel = getModelForClass(ProblemGroup)
