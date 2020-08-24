import { Testcase, TestcaseModel } from './testcase.model'

export const newTestcase = async (_: any, { input }: { input: Testcase }) => await TestcaseModel.create(input)
