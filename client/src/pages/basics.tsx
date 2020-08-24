import { Box, Divider, Text, Icon } from '@chakra-ui/core'
import { Challenge } from '../components/Challenge'
import { ChallengeDesc } from '../components/ChallengeDesc'
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Main } from '../components/Main'
import { SideDrawer } from '../components/SideDrawer'
import { basicsPageChallenges } from '../questions/basicsPage'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'

const Basics = () => {
   const {
      q1: { testCases1, defVal1, correctAnswer1 },
      q2: { testCases2, defVal2, correctAnswer2 },
   } = basicsPageChallenges
   return (
      <>
         <Container height={'100%'}>
            <Hero title="basics" fontSize={'8vh'} height={'15vh'} />
            <Main marginTop={'0'}>
               <Text fontSize={30}>
                  In this section you will be challenged with some basic concepts of JavaScript{' '}
                  <Icon name="unlock" color="blue.500" mx="2px" size={'5'} />
               </Text>
               <Divider m={10} />
               <Box p={4}>
                  <ChallengeDesc
                     primary={'In this challenge you will have to make the function add the two inputs together.'}
                     secondary={'You should only need to touch the function body! 🧐'}
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
            </Main>
            <SideDrawer />
            <DarkModeSwitch />
            <Footer>
               <Text>© js-quiz</Text>
            </Footer>
         </Container>
      </>
   )
}

export default withUrqlClient(createUrqlClient)(Basics)
