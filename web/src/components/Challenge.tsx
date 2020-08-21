import React, { useState, MouseEvent } from 'react'
import {
   Box,
   Code,
   useColorMode,
   Button,
   Spinner,
   Text,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   useDisclosure,
   ModalFooter,
} from '@chakra-ui/core'
import { Editor } from './Editor'
import { Container } from './Container'

interface ChallengeProps {
   defaultValue: string
   testCases: string
   correctAnswer: string | number
}

export const Challenge: React.FC<ChallengeProps> = ({ defaultValue, testCases, correctAnswer }) => {
   const { colorMode } = useColorMode()
   const { isOpen, onClose, onToggle } = useDisclosure()
   const theme = { light: 'kuroir', dark: 'monokai' }

   const [value, setValue] = useState(defaultValue)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(false)

   const captureFunction = (value: string) => {
      setLoading(true)
      return eval(value)
   }
   const handleLoading = () => {
      setTimeout(() => setLoading(() => false), 1000)
   }

   const handleRun = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const res = captureFunction(value)
      if (res === correctAnswer) {
         handleLoading()
         onToggle()
         console.log('success')
      } else {
         handleLoading()
         setError(true)
         console.log('incorrect answer')
      }
   }

   if (loading)
      return (
         <Container>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="red.500" size="xl" />
         </Container>
      )

   return (
      <>
         <Box>
            <Editor
               height={'200px'}
               defaultValue={defaultValue}
               theme={theme[colorMode]}
               value={value}
               setValue={setValue}
            />
            <Button leftIcon="check" mt={2} bg="green.300" onClick={handleRun}>
               run
            </Button>
            <Code width="100%" mt={2} height={20}>
               {testCases}
               {error && (
                  <Text color="red.500" fontSize={15}>
                     Wrong answer, please try again
                  </Text>
               )}
            </Code>
         </Box>
         <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modal Title</ModalHeader>
               <ModalCloseButton color={'red.500'} />
               <ModalBody>
                  <Code fontSize={20}>
                     Thats correct! 😎 Please login if you would like to have your progress saved.
                  </Code>
               </ModalBody>
               <ModalFooter>
                  <Button onClick={onToggle}>login</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}
