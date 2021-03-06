import { Alert, AlertIcon, Box, useDisclosure, useToast } from '@chakra-ui/core'
import React, { useEffect, useContext } from 'react'
import { CombinedError } from 'urql'
import {
   RegProblemFragment,
   useSubmitResultMutation,
   useMeQuery,
   useUpdateUserProgressMutation,
   useGetSolutionQuery,
} from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { ChallengeContext } from '../../context/challengeContext'
import { ChallengeTerminal } from './ChallengeTerminal'
import { LoginModal } from '../LoginModal'
import { ChallengeEditor } from './ChallengeEditor'
import { formatDefVal } from '../../utils/helperFns'
import { EditorValueContext } from '../../context/editorValueContext'

export interface ChallengeProps {
   problemData: RegProblemFragment | undefined
   loading?: boolean
   error?: CombinedError | undefined
}

export const Challenge: React.FC<ChallengeProps> = ({ problemData, error }) => {
   const [{ data: SubmitData, fetching }, submitResult] = useSubmitResultMutation()
   const [{ data: meData }] = useMeQuery({ pause: isServer() })
   const [, updateUserProgress] = useUpdateUserProgressMutation()
   const [{ data }] = useGetSolutionQuery({
      requestPolicy: 'network-only',
      pause: isServer(),
      variables: { input: { userId: meData?.me?._id, problemId: problemData?._id } },
   })

   const toast = useToast()
   const { isOpen, onClose, onToggle } = useDisclosure()
   const { value, setValue } = useContext(EditorValueContext)
   const { setCompletedState, completedState } = useContext(ChallengeContext)

   useEffect(() => {
      if (meData?.me?.completedProblems?.includes(problemData?._id as string)) {
         setCompletedState(true)
      } else {
         setCompletedState(false)
      }
   }, [problemData?._id, meData?.me?.completedProblems, setCompletedState])

   useEffect(() => {
      completedState
         ? setValue(
              formatDefVal(
                 SubmitData?.submitResult?.solution?.solution ||
                    data?.getSolution?.solution ||
                    value,
                 problemData?.correctSolution
              )
           )
         : setValue(problemData?.placeHolder)
   }, [
      completedState,
      data?.getSolution?.solution,
      problemData?.placeHolder,
      problemData?.correctSolution,
   ])

   return (
      <Box minH="30vh">
         <Box>
            <ChallengeEditor
               fetching={fetching}
               setValue={setValue}
               value={value}
               defaultValue={
                  (SubmitData?.submitResult?.errors &&
                     SubmitData.submitResult.solution?.solution) ||
                  problemData?.placeHolder
               }
               problemData={problemData}
               onSubmit={async () => {
                  const res = await submitResult({
                     input: {
                        problemId: problemData?._id || '',
                        solution: value || '',
                        userId: meData?.me?._id,
                     },
                  })
                  if (res.data?.submitResult?.success && !meData?.me?._id) {
                     setCompletedState(true)
                     onToggle()
                  } else if (res.data?.submitResult?.success && meData?.me) {
                     const res = await updateUserProgress({
                        input: {
                           _id: meData?.me?._id,
                           points: 20,
                           problemId: problemData?._id || '',
                        },
                     })
                     if (
                        res.data &&
                        res.data?.updateUserProgress.progress?.points !== meData.me.progress?.points
                     ) {
                        setCompletedState(true)
                        return toast({
                           title: 'Correct! You just gained 20 points',
                           description:
                              'Go to account page to have more information about your progress!',
                           status: 'success',
                           duration: 10000,
                           isClosable: true,
                        })
                     } else if (
                        res.data &&
                        res.data?.updateUserProgress.progress?.points === meData.me.progress?.points
                     ) {
                        setCompletedState(true)
                        return toast({
                           title: "That's correct!",
                           description:
                              'You have already won the points from this challenge! Complete other challenges to level up!',
                           status: 'info',
                           duration: 10000,
                           isClosable: true,
                        })
                     }
                  }
               }}
            />
            <ChallengeTerminal problemData={problemData} submitData={SubmitData} />
            {error && (
               <Alert status="error">
                  <AlertIcon />
                  {error?.message}
               </Alert>
            )}
         </Box>
         <LoginModal isOpen={isOpen} onClose={onClose} />
      </Box>
   )
}
