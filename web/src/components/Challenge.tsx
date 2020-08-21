import React from 'react'
import { Box, Code, useColorMode, Button } from '@chakra-ui/core'
import { Editor } from './Editor'

const defVal = `function sayHi(msg) {}
         
sayHi('Well hello!)`

export default function Challenge() {
   const { colorMode } = useColorMode()
   const theme = { light: 'kuroir', dark: 'monokai' }

   return (
      <Box>
         <Editor height="200px" defaultValue={defVal} theme={theme[colorMode]} />
         <Button leftIcon="check" mt={2} bg="green.300">
            run
         </Button>
         <Code width="100%" mt={2} height={20}>
            expect(sayHi).toEqual('Well hello!')
         </Code>
      </Box>
   )
}
