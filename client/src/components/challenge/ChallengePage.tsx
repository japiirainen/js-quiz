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
import { motion } from 'framer-motion'
import { fadeInDown } from '../../animations'

interface ChallengePageProps {
   problemGroup: string
   data: GetProblemByIndexQuery | undefined
   error: CombinedError | undefined
   fetching: boolean | undefined
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
      <motion.div initial="initial" animate="animate">
         <Layout
            fontSize={['2.5vh', '3vh', '4vh']}
            height={'0vh'}
            title={problem?.name}
            variant={'regular'}
            minH={'100vh'}
         >
            {data ? (
               <>
                  <motion.div variants={fadeInDown}>
                     <ChallengeDesc problemData={problem} />
                     <Challenge problemData={problem} error={error} loading={fetching} />
                  </motion.div>
               </>
            ) : (
               <LoadingSpinner />
            )}
            {fetching ? null : (
               <Flex mt={20} direction={'row-reverse'}>
                  {nextProblem && (
                     <NextOrPrevButton
                        url={`/${problemGroup}/${inc(routeIndex)}`}
                        variant={'Next'}
                     />
                  )}
                  {prevProblem && (
                     <NextOrPrevButton
                        url={`/${problemGroup}/${dec(routeIndex)}`}
                        variant={'Prev'}
                     />
                  )}
               </Flex>
            )}
         </Layout>
      </motion.div>
   )
}
