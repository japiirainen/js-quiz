import {
   Alert,
   AlertIcon,
   Box,
   Button,
   Code,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useColorMode,
   useDisclosure,
   Flex,
} from '@chakra-ui/core'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { CombinedError } from 'urql'
import { RegProblemFragment, useSubmitResultMutation, useMeQuery } from '../generated/graphql'
import { ChallengeComplete } from './ChallengeComplete'
import { Editor } from './Editor'
import { LoadingSpinner } from './LoadingSpinner'
import { isServer } from '../utils/isServer'
import { includes } from 'ramda'

export interface ChallengeProps {
   problemData: RegProblemFragment | undefined | null
   loading?: Boolean
   error?: CombinedError | undefined
}

export const Challenge: React.FC<ChallengeProps> = ({ problemData, loading, error }) => {
   const [{ data, fetching }, submitResult] = useSubmitResultMutation()
   const [{ data: meData }] = useMeQuery({ pause: isServer() })
   const router = useRouter()
   const { colorMode } = useColorMode()
   const { isOpen, onClose, onToggle } = useDisclosure()
   const theme = { light: 'tomorrow', dark: 'merbivore' }

   const [value, setValue] = useState(problemData?.placeHolder)
   const [completedState, setCompletedState] = useState(false)

   useEffect(() => {
      if (includes(problemData?._id, meData?.me?.completedProblems || [])) {
         setCompletedState(true)
      } else {
         setCompletedState(false)
      }
   }, [problemData?._id, meData?.me?.completedProblems])

   return (
      <Box minH="30vh">
         <Box>
            {fetching && <LoadingSpinner />}
            {loading && !value && <LoadingSpinner />}
            {problemData && !completedState && (
               <Editor
                  height={'200px'}
                  defaultValue={problemData!.placeHolder}
                  theme={theme[colorMode]}
                  value={value}
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

            <Code bg={'black'} color={'white'} width="100%" height={'auto'} p={10} mt={5}>
               {data?.submitResult?.success && (
                  <Flex direction="column">
                     <Text fontSize={15}>your solution:</Text>
                     <Text color="green.500" fontSize={15}>
                        {data.submitResult.solution}
                     </Text>
                  </Flex>
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
                  <Text fontSize={15}>{problemData?.placeHolderExpectation}</Text>
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
      </Box>
   )
}
