import { Code, Text } from '@chakra-ui/core'
import React, { useContext } from 'react'
import { RegProblemFragment, SubmitResultMutation } from '../../generated/graphql'
import { ChallengeContext } from '../../context/challengeContext'

interface ChallengeTerminalProps {
   problemData: RegProblemFragment | undefined | null
   submitData?: SubmitResultMutation | undefined
}

export const ChallengeTerminal: React.FC<ChallengeTerminalProps> = ({
   problemData,
   submitData,
}) => {
   const { completedState } = useContext(ChallengeContext)
   return (
      <Code bg={'black'} color={'white'} width="100%" height={'auto'} p={10} mt={5}>
         {submitData?.submitResult?.errors &&
            submitData.submitResult.errors.map(err =>
               err ? (
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
               ) : (
                  <Text fontSize={15} color="green.200">
                     {problemData?.placeHolderExpectation}
                  </Text>
               )
            )}
         {completedState ? (
            <Text fontSize={15} color="green.200">
               {problemData?.placeHolderExpectation}
            </Text>
         ) : (
            <Text fontSize={15} color="yellow.200">
               {problemData?.placeHolderExpectation}
            </Text>
         )}
      </Code>
   )
}
