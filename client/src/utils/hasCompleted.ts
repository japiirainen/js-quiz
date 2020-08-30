import { includes } from 'ramda'

export const hasCompleted = ({
   problemId,
   completedProblems,
}: {
   problemId: string | undefined
   completedProblems: (string | null)[]
}) => {
   return includes(problemId, completedProblems)
}
