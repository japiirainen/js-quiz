import { Divider, Icon, Text } from '@chakra-ui/core'
import { Challenge } from '../components/Challenge'
import { ChallengeDesc } from '../components/ChallengeDesc'
import { indexPageChallenge } from '../questions/indexPage'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { Layout } from '../components/Layout'

const Index = () => {
   const { testCases, defVal, correctAnswer } = indexPageChallenge
   return (
      <Layout fontSize={'8vh'} height={'15vh'} title={'Js-quiz'}>
         <Text fontSize={30}>
            Website for learning or test you're skills in javascript through fun little challenges{' '}
            <Icon name="check-circle" color="green.500" mx="2px" />
         </Text>
         <Divider m={10} />
         <ChallengeDesc
            primary={'In this challenge you will have to make the function add the two inputs together.'}
            secondary={'You should only need to touch the function body! 🤓'}
         />
         <Challenge defaultValue={defVal} testCases={testCases} correctAnswer={correctAnswer} />
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
