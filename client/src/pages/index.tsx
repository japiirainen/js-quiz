import { Divider, Icon, Text } from '@chakra-ui/core'
import { Challenge } from '../components/challenge/Challenge'
import { ChallengeDesc } from '../components/challenge/ChallengeDesc'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { Layout } from '../components/layouts/Layout'
import { useGetProblemByIdQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

const Index = () => {
   const [{ data, fetching, error }] = useGetProblemByIdQuery({
      variables: { _id: '5f478058f712257781ecf239' },
      pause: isServer(),
   })
   return (
      <Layout fontSize={'8vh'} height={'15vh'} title={'Js-quiz'}>
         <Text fontSize={30}>
            Website for learning or test you're skills in javascript through fun little challenges
            <Icon name="check-circle" color="green.500" mx="2px" />
         </Text>
         <Divider m={10} />
         <ChallengeDesc problemData={data?.getProblemById} />
         <Challenge problemData={data?.getProblemById} error={error} loading={fetching} />
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
