import { Box, Divider, Text, Icon } from '@chakra-ui/core'
import { Challenge } from '../components/Challenge'
import { ChallengeDesc } from '../components/ChallengeDesc'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { Layout } from '../components/Layout'
import { useGetProblemsInGroupQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { v4 } from 'uuid'

const Basics = () => {
   const [{ fetching, data, error }] = useGetProblemsInGroupQuery({
      variables: { groupName: 'basics' },
      pause: isServer(),
   })
   return (
      <Layout title={'JavaScript basics'} height={'8vh'} fontSize={'4vh'}>
         <Text fontSize={30}>
            In this section you will be challenged with some basic concepts of JavaScript{' '}
            <Icon name="unlock" color="blue.500" mx="2px" size={'5'} />
         </Text>
         <Divider m={10} />

         {fetching && <LoadingSpinner />}
         {data?.findProblemsInGroup?.map(problem => {
            return (
               <>
                  <Box p={4} key={v4()}>
                     <ChallengeDesc problemData={problem} key={problem?.name} />
                     <Challenge
                        problemData={problem}
                        error={error}
                        loading={fetching}
                        key={problem?._id}
                     />
                  </Box>
                  <Divider m={10} key={v4()} />
               </>
            )
         })}
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Basics)
