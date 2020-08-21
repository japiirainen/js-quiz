import { Link as ChakraLink, Text, Code, Icon, List, ListIcon, ListItem } from '@chakra-ui/core'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Editor } from '../components/Editor'
import { useState } from 'react'

const Index = () => {
   const [value, setValue] = useState('')
   const defVal = `function myFunc(msg) {
      return msg
   }`

   return (
      <Container height={'100vh'}>
         <Hero />
         <Main>
            <Text>Website for learning javascript through fun little challenges</Text>
            <List spacing={3} my={0}>
               <ListItem>
                  <ListIcon icon="check-circle" color="green.500" />
                  {value}
               </ListItem>
               <ListItem>
                  <ListIcon icon="check-circle" color="green.500" />
                  <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
                     Next.js <Icon name="external-link" mx="2px" />
                  </ChakraLink>
               </ListItem>
            </List>
            <Editor value={value} setValue={setValue} defVal={defVal} />
         </Main>

         <DarkModeSwitch />
      </Container>
   )
}

export default Index
