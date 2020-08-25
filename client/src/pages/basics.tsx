import { Box, Divider, Text, Icon } from '@chakra-ui/core'
import { Challenge } from '../components/Challenge'
import { ChallengeDesc } from '../components/ChallengeDesc'
import { basicsPageChallenges } from '../questions/basicsPage'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { Layout } from '../components/Layout'

const Basics = () => {
   const {
      q1: { testCases1, defVal1, correctAnswer1 },
      q2: { testCases2, defVal2, correctAnswer2 },
   } = basicsPageChallenges
   return (
      <Layout title={'JavaScript basics'} height={'8vh'} fontSize={'4vh'}>
         <Text fontSize={30}>
            In this section you will be challenged with some basic concepts of JavaScript{' '}
            <Icon name="unlock" color="blue.500" mx="2px" size={'5'} />
         </Text>
         <Divider m={10} />
         <Box p={4}>
            <ChallengeDesc
               primary={'In this this challenge you will have to make the function add the two inputs together.'}
               secondary={'You should only need to touch the function body! 🤨'}
            />
            <Challenge defaultValue={defVal1} testCases={testCases1} correctAnswer={correctAnswer1} />
         </Box>
         <Divider m={10} />
         <Box p={4}>
            <ChallengeDesc
               primary={'Now I want you to concatinate two strings and return a full sentence.'}
               secondary={'tip: here could be a dropdown'}
            />
            <Challenge defaultValue={defVal2} testCases={testCases2} correctAnswer={correctAnswer2} />
         </Box>
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient)(Basics)
