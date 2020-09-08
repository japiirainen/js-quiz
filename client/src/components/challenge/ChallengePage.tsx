import { useRouter } from 'next/router'
import { GetProblemByIndexQuery } from '../../generated/graphql'
import { inc, dec } from 'ramda'
import { Layout } from '../layouts/Layout'
import { ChallengeDesc } from './ChallengeDesc'
import { Challenge } from './Challenge'
import { Flex } from '@chakra-ui/core'
import { NextOrPrevButton } from '../NextOrPrevButton'
import { CombinedError } from 'urql'
import { LoadingSpinner } from '../LoadingSpinner'

interface ChallengePageProps {
   problemGroup: string
   data: GetProblemByIndexQuery | undefined
   error: CombinedError | undefined
   fetching: Boolean
}

export const ChallengePage: React.FC<ChallengePageProps> = ({
   problemGroup,
   data,
   error,
   fetching,
}) => {
   const router = useRouter()
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
         {data && !fetching ? (
            <>
               <ChallengeDesc problemData={problem} />
               <Challenge problemData={problem} error={error} loading={fetching} />
            </>
         ) : (
            <LoadingSpinner />
         )}
         <Flex mt={20} direction={'row-reverse'}>
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
