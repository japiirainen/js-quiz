import { Divider, Icon, Text, Alert, AlertIcon } from '@chakra-ui/core'
import { Challenge } from '../components/Challenge'
import { ChallengeDesc } from '../components/ChallengeDesc'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { Layout } from '../components/Layout'
import { useGetProblemByIdQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

const Index = () => {
   const [{ data, fetching, error }] = useGetProblemByIdQuery({
      variables: { _id: '5f478058f712257781ecf239' },
      pause: isServer(),
   })
   console.log(data)

   if (!data && !fetching) {
      return (
         <Alert status="error">
            <AlertIcon />
            {error?.message}
         </Alert>
      )
   } else if (fetching) {
      return null
   } else {
      return (
         <Layout fontSize={'8vh'} height={'15vh'} title={'Js-quiz'}>
            <Text fontSize={30}>
               Website for learning or test you're skills in javascript through fun little challenges{' '}
               <Icon name="check-circle" color="green.500" mx="2px" />
            </Text>
            <Divider m={10} />
            <ChallengeDesc primary={data!.getProblemById.description} difficulty={data?.getProblemById.difficulty} />
            <Challenge
               problemId={data!.getProblemById._id}
               defaultValue={data!.getProblemById.placeHolder}
               testCasesToDisplay={data!.getProblemById.placeHolderExpectation}
            />
         </Layout>
      )
   }
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
