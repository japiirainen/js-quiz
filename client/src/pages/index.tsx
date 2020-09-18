import { Divider, Icon, Text } from '@chakra-ui/core'
import { Challenge } from '../components/challenge/Challenge'
import { ChallengeDesc } from '../components/challenge/ChallengeDesc'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { Layout } from '../components/layouts/Layout'
import { useGetProblemByIdQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { LoadingSpinner } from '../components/LoadingSpinner'

const Index = () => {
   const [{ data, fetching, error }] = useGetProblemByIdQuery({
      variables: { _id: '5f478058f712257781ecf239' },
      pause: isServer(),
   })
   return (
      <Layout fontSize={'8vh'} title={'Js-quiz'} height={'8vh'} minH={'100vh'}>
         <Text fontSize={[20, 20, 25, 30]}>
            Website for learning or to test you're skills in javascript through fun challenges
            <Icon name="check-circle" color="green.500" mx="2px" />
         </Text>
         <Divider m={10} />
         {data && !fetching ? (
            <>
               <ChallengeDesc problemData={data?.getProblemById} />
               <Challenge problemData={data?.getProblemById} error={error} loading={fetching} />
            </>
         ) : (
            <LoadingSpinner />
         )}
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
