import React, { useState } from 'react'
import {
   Box,
   Code,
   useColorMode,
   Button,
   Text,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   useDisclosure,
   ModalFooter,
   Alert,
   AlertIcon,
} from '@chakra-ui/core'
import { Editor } from './Editor'
import { useRouter } from 'next/router'
import { LoadingSpinner } from './LoadingSpinner'
import { useSubmitResultMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

interface ChallengeProps {
   defaultValue: string
   testCasesToDisplay: string
   problemId: string
}

export const Challenge: React.FC<ChallengeProps> = ({ defaultValue, testCasesToDisplay, problemId }) => {
   const [{ data: meData }] = useMeQuery({ pause: isServer() })
   const [{ data, error }, submitResult] = useSubmitResultMutation()

   console.log(data)
   const router = useRouter()
   const { colorMode } = useColorMode()
   const { isOpen, onClose, onToggle } = useDisclosure()
   const theme = { light: 'kuroir', dark: 'pastel_on_dark' }

   const [value, setValue] = useState(defaultValue)
   const [loading, setLoading] = useState(false)

   const handleLoading = () => {
      setTimeout(() => {
         setLoading(() => false)
         onToggle()
      }, 1000)
   }
   const handleSubmit = () => {
      setLoading(true)
      handleLoading()
      submitResult({ input: { problemId, solution: value, userId: meData!.me!._id } })
   }
   if (loading) return <LoadingSpinner />

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
            <Button leftIcon="check" mt={2} bg="green.300" onClick={handleSubmit}>
               run
            </Button>
            <Code width="100%" mt={2} height={'auto'} p={10}>
               {data?.submitResult?.success && (
                  <>
                     <Alert status="success">
                        <AlertIcon />
                        {data.submitResult.solution}
                     </Alert>
                  </>
               )}
               {data?.submitResult?.errors ? (
                  data.submitResult.errors.map(err =>
                     !err ? null : (
                        <>
                           <Text color="red.500" fontSize={15}>
                              message: {err.message}
                           </Text>
                           <Text color="red.500" fontSize={15}>
                              actual: {err.actual}
                           </Text>
                           <Text color="red.500" fontSize={15}>
                              expected: {err.expected}
                           </Text>
                        </>
                     )
                  )
               ) : (
                  <>{testCasesToDisplay}</>
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
                  <Button onClick={() => router.push('/login')}>login</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}
