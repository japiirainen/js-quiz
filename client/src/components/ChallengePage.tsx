import { useRouter } from 'next/router'
import { useGetProblemsInGroupQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { inc, dec } from 'ramda'
import { Layout } from './Layout'
import { ChallengeDesc } from './ChallengeDesc'
import { Challenge } from './Challenge'
import { Flex } from '@chakra-ui/core'
import { NextOrPrevButton } from './NextOrPrevButton'

interface ChallengePageProps {
   problemGroup: string
}

export const ChallengePage: React.FC<ChallengePageProps> = ({ problemGroup }) => {
   const router = useRouter()
   const [{ data, fetching, error }] = useGetProblemsInGroupQuery({
      variables: { groupName: problemGroup },
      pause: isServer(),
   })
   const routeIndex = parseInt(router.query.index as string) as number
   const findProblemWithIndex = (queryIndex: number) => {
      return data?.findProblemsInGroup?.filter(problem => problem?.index === queryIndex)[0]
   }

   const problem = findProblemWithIndex(routeIndex)
   const nextProblem = findProblemWithIndex(inc(routeIndex))
   const prevProblem = findProblemWithIndex(dec(routeIndex))

   return (
      <Layout
         fontSize={'4vh'}
         height={'1vh'}
         title={problem?.name}
         variant={'regular'}
         minH={'100vh'}
      >
         <ChallengeDesc problemData={problem} />
         <Challenge problemData={problem} error={error} loading={fetching} />
         <Flex mt={15} direction={'row-reverse'}>
            {nextProblem && (
               <NextOrPrevButton
                  problemName={nextProblem.name}
                  url={`/${problemGroup}/${inc(routeIndex)}`}
                  variant={'Next'}
               />
            )}
            {prevProblem && (
               <NextOrPrevButton
                  problemName={prevProblem.name}
                  url={`/${problemGroup}/${dec(routeIndex)}`}
                  variant={'Prev'}
               />
            )}
         </Flex>
      </Layout>
   )
}
