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
   useToast,
} from '@chakra-ui/core'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useContext } from 'react'
import { CombinedError } from 'urql'
import {
   RegProblemFragment,
   useSubmitResultMutation,
   useMeQuery,
   useUpdateUserProgressMutation,
} from '../../generated/graphql'
import { ChallengeComplete } from './ChallengeComplete'
import { Editor } from '../Editor'
import { LoadingSpinner } from '../LoadingSpinner'
import { isServer } from '../../utils/isServer'
import { ChallengeContext } from '../../context/challengeContext'

export interface ChallengeProps {
   problemData: RegProblemFragment | undefined | null
   loading?: Boolean
   error?: CombinedError | undefined
}

export const Challenge: React.FC<ChallengeProps> = ({ problemData, loading, error }) => {
   const [{ data, fetching }, submitResult] = useSubmitResultMutation()
   const [{ data: meData }] = useMeQuery({ pause: isServer() })
   const [, updateUserProgress] = useUpdateUserProgressMutation()
   const router = useRouter()
   const { colorMode } = useColorMode()
   const { isOpen, onClose, onToggle } = useDisclosure()
   const theme = { light: 'tomorrow', dark: 'merbivore' }
   //@ts-ignore
   const { completedState, setCompletedState } = useContext(ChallengeContext)
   const [value, setValue] = useState(problemData?.placeHolder)
   const toast = useToast()

   useEffect(() => {
      if (problemData?.isCompleted && meData?.me) {
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
                  height={'300px'}
                  defaultValue={problemData!.placeHolder}
                  theme={theme[colorMode]}
                  value={value}
                  setValue={setValue}
               />
            )}
            {completedState && (
               <ChallengeComplete
                  problem={problemData}
                  userId={meData?.me?._id}
                  onRedoClick={() => setCompletedState(false)}
                  tempSolution={data?.submitResult?.solution}
               />
            )}
            {completedState ? null : (
               <Button
                  leftIcon="check"
                  mt={2}
                  bg="green.300"
                  onClick={async () => {
                     const res = await submitResult({
                        input: {
                           problemId: problemData!._id,
                           solution: value || '',
                           userId: meData?.me?._id,
                        },
                     })
                     if (res.data?.submitResult?.success && !meData?.me?._id) {
                        onToggle()
                     } else if (res.data?.submitResult?.success && meData?.me) {
                        const res = await updateUserProgress({
                           input: {
                              _id: meData?.me?._id,
                              points: 20,
                              problemId: problemData!._id,
                           },
                        })
                        setCompletedState(true)
                        if (
                           res.data &&
                           res.data?.updateUserProgress.progress?.points !==
                              meData.me.progress?.points
                        ) {
                           return toast({
                              title: 'You just gained 20 points',
                              description:
                                 'Go to account page to have more information about your progress!',
                              status: 'success',
                              duration: 10000,
                              isClosable: true,
                           })
                        } else {
                           return toast({
                              title: 'Nice',
                              description:
                                 'You have already won the points from this challenge! Complete other challenges to level up!',
                              status: 'info',
                              duration: 10000,
                              isClosable: true,
                           })
                        }
                     }
                  }}
               >
                  run
               </Button>
            )}
            {completedState || fetching ? null : (
               <Code bg={'black'} color={'white'} width="100%" height={'auto'} p={10} mt={5}>
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
            )}
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
                     That's correct! 😎 Please login if you would like to have your progress saved.
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
