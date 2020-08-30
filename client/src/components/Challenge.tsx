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
import { useSubmitResultMutation, useMeQuery, RegProblemFragment } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { CombinedError } from 'urql'
import { ChallengeComplete } from './ChallengeComplete'

export interface ChallengeProps {
   problemData: RegProblemFragment | undefined
   loading?: Boolean
   error?: CombinedError | undefined
}

export const Challenge: React.FC<ChallengeProps> = ({ problemData, loading, error }) => {
   const [{ data: meData }] = useMeQuery({ pause: isServer() })
   const [{ data }, submitResult] = useSubmitResultMutation()

   const router = useRouter()
   const { colorMode } = useColorMode()
   const { isOpen, onClose, onToggle } = useDisclosure()
   const theme = { light: 'kuroir', dark: 'pastel_on_dark' }

   const [value, setValue] = useState(problemData?.placeHolder)
   const [completedState, setCompletedState] = useState(false)

   return (
      <>
         <Box>
            {loading && !value && <LoadingSpinner />}
            {problemData && !completedState && (
               <Editor
                  height={'200px'}
                  defaultValue={problemData!.placeHolder}
                  theme={theme[colorMode]}
                  value={value || ''}
                  setValue={setValue}
               />
            )}
            {completedState && (
               <ChallengeComplete
                  onNextClick={() => router.push('/basics')}
                  onRedoClick={() => setCompletedState(false)}
               />
            )}
            {completedState ? null : (
               <Button
                  leftIcon="check"
                  mt={2}
                  bg="green.300"
                  onClick={async () => {
                     const res = await await submitResult({
                        input: {
                           problemId: problemData!._id,
                           solution: value || '',
                           userId: meData?.me?._id,
                        },
                     })
                     if (res.data?.submitResult?.success && !meData?.me?._id) {
                        onToggle()
                     } else if (res.data?.submitResult?.success) {
                        setCompletedState(true)
                     }
                  }}
               >
                  run
               </Button>
            )}
            <Code width="100%" mt={2} height={'auto'} p={10}>
               {data?.submitResult?.success && (
                  <>
                     <Text color="green.500" fontSize={15}>
                        your solution: {data.submitResult.solution}
                     </Text>
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
                  <>{problemData?.placeHolderExpectation}</>
               )}
            </Code>
            {error && (
               <Alert status="error">
                  <AlertIcon />
                  {error?.message}
               </Alert>
            )}
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
