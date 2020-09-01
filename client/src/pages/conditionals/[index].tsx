import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { Layout } from '../../components/Layout'
import { useGetProblemsInGroupQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { ChallengeDesc } from '../../components/ChallengeDesc'
import { Challenge } from '../../components/Challenge'
import { Button, Flex, Text } from '@chakra-ui/core'
import NextLink from 'next/link'

const Conditionals: NextPage = () => {
   const router = useRouter()
   const [{ data, fetching, error }] = useGetProblemsInGroupQuery({
      variables: { groupName: 'conditionals' },
      pause: isServer(),
   })
   const routeIndex = parseInt(router.query.index as string) as number
   const findProblemWithIndex = (queryIndex: number) => {
      return data?.findProblemsInGroup?.filter(problem => problem?.index === queryIndex)[0]
   }

   const problem = findProblemWithIndex(routeIndex)
   const nextProblem = findProblemWithIndex(routeIndex + 1)
   const prevProblem = findProblemWithIndex(routeIndex - 1)

   return (
      <Layout
         fontSize={'3vh'}
         height={'1vh'}
         title={problem?.name}
         variant={'regular'}
         minH={'100vh'}
      >
         <ChallengeDesc problemData={problem} />
         <Challenge problemData={problem} error={error} loading={fetching} />
         <Flex mt={15}>
            {nextProblem && (
               <NextLink href={`/conditionals/${routeIndex + 1}`}>
               <Button
                  ml={'auto'}
                  variant="solid"
                  variantColor="blue"
               >
                  <Text mr={4}>next:</Text>
                  <Text>({nextProblem.name})</Text>
               </Button>
               </NextLink>
            )}
            {prevProblem && (
               <NextLink href={`/conditionals/${routeIndex - 1}`}>
               <Button
                  mr={'auto'}
                  variant="solid"
                  variantColor="pink"
               >
                  <Text mr={4}>Prev:</Text>
                  <Text>({prevProblem.name})</Text>
               </Button>
               </NextLink>
            )}
         </Flex>
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Conditionals)
