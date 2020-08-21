import { Container } from '../components/Container'
import { Main } from '../components/Main'

import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { SideDrawer } from '../components/SideDrawer'
import { Challenge } from '../components/Challenge'
import { basicsPageChallenges } from '../questions/basicsPage'
import { ChallengeDesc } from '../components/ChallengeDesc'
import { Divider, Box, Text } from '@chakra-ui/core'
import { Hero } from '../components/Hero'
import { Footer } from '../components/Footer'

const Basics = () => {
   const {
      q1: { testCases, defVal, correctAnswer },
   } = basicsPageChallenges
   return (
      <>
         <Container height={'100%'}>
            <Hero title="basics" fontSize={'5vh'} height={'auto'} />
            <Main marginTop={'0'}>
               <Box p={4}>
                  <ChallengeDesc
                     primary={'In this challenge you will have to make the function add the two inputs together!'}
                     secondary={'You should only need to touch the function body! 😇'}
                  />
                  <Challenge defaultValue={defVal} testCases={testCases} correctAnswer={correctAnswer} />
               </Box>
               <Divider m={10} />
               <Box p={4}>
                  <ChallengeDesc
                     primary={'In this challenge you will have to make the function add the two inputs together!'}
                     secondary={'You should only need to touch the function body! 😇'}
                  />

                  <Challenge defaultValue={defVal} testCases={testCases} correctAnswer={correctAnswer} />
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

export default Basics
