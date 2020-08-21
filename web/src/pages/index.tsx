import { Text, Icon, List, ListIcon, ListItem } from '@chakra-ui/core'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'

import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { SideDrawer } from '../components/SideDrawer'
import { Challenge } from '../components/Challenge'
import { indexPageChallenge } from '../questions/indexPage'
import { Footer } from '../components/Footer'

const Index = () => {
   const { testCases, defVal, correctAnswer } = indexPageChallenge
   return (
      <>
         <Container height={'100vh'}>
            <Hero title="Js-quiz" fontSize={'8vh'} height={'50vh'} />
            <Main marginTop={'-45vh'}>
               <Text fontSize={25}>
                  Website for learning javascript through fun little challenges{' '}
                  <Icon name="check-circle" color="green.500" mx="2px" />
               </Text>
               <List spacing={3} my={0}>
                  <ListItem>
                     <Text fontSize={20}>
                        <ListIcon icon="arrow-right" size="10px" />
                        Here is your first challenge!
                     </Text>
                  </ListItem>
                  <ListItem>
                     <Text fontSize={20}>
                        <ListIcon icon="arrow-right" size="10px" />
                        So youre challenge is to make the following function return the message that it is already
                        taking as input
                     </Text>
                  </ListItem>
               </List>
               <Challenge defaultValue={defVal} testCases={testCases} correctAnswer={correctAnswer} />
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

export default Index
