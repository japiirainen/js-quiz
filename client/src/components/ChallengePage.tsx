import { useRouter } from 'next/router'
import { useGetProblemByIndexQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { inc, dec } from 'ramda'
import { Layout } from './Layout'
import { ChallengeDesc } from './ChallengeDesc'
import { Challenge } from './Challenge'
import { Flex } from '@chakra-ui/core'
import { NextOrPrevButton } from './NextOrPrevButton'

interface ChallengePageProps {
   index: number
   problemGroup: string
}

export const ChallengePage: React.FC<ChallengePageProps> = ({ index, problemGroup }) => {
   const router = useRouter()
   const [{ data, fetching, error }] = useGetProblemByIndexQuery({
      variables: { index: index },
      pause: isServer(),
   })
   const routeIndex = parseInt(router.query.index as string) as number

   const problem = data?.getProblemByIndex?.currProblem
   const nextProblem = data?.getProblemByIndex?.nextProblem
   const prevProblem = data?.getProblemByIndex?.prevProblem

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


