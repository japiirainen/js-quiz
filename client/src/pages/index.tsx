import { Divider, Icon, Text } from '@chakra-ui/core'
import { Challenge } from '../components/Challenge'
import { ChallengeDesc } from '../components/ChallengeDesc'
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Main } from '../components/Main'
import { SideDrawer } from '../components/SideDrawer'
import { indexPageChallenge } from '../questions/indexPage'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'

const Index = () => {
   const { testCases, defVal, correctAnswer } = indexPageChallenge
   return (
      <Container height={'100vh'}>
         <Hero title="Js-quiz" fontSize={'8vh'} height={'15vh'} />
         <Main marginTop={'0'}>
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
         </Main>
         <SideDrawer />
         <DarkModeSwitch />
         <Footer>
            <Text>© js-quiz</Text>
         </Footer>
      </Container>
   )
}

export default withUrqlClient(createUrqlClient)(Index)
