import { Flex } from '@chakra-ui/core'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { Challenge } from '../../components/Challenge'
import { ChallengeDesc } from '../../components/ChallengeDesc'
import { Layout } from '../../components/Layout'
import { NextOrPrevButton } from '../../components/NextOrPrevButton'
import { useGetProblemsInGroupQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { dec, inc } from '../../utils/helperFns'
import { isServer } from '../../utils/isServer'

const Loops: NextPage = () => {
   const router = useRouter()
   const [{ data, fetching, error }] = useGetProblemsInGroupQuery({
      variables: { groupName: 'loops' },
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
         <Flex mt={15}>
            {nextProblem && (
               <NextOrPrevButton
                  problemName={nextProblem.name}
                  url={`/loops/${inc(routeIndex)}`}
                  variant={'Next'}
               />
            )}
            {prevProblem && (
               <NextOrPrevButton
                  problemName={prevProblem.name}
                  url={`/loops/${dec(routeIndex)}`}
                  variant={'Prev'}
               />
            )}
         </Flex>
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Loops)
