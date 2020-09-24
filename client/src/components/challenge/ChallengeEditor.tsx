import { Button, Flex, Text, useColorMode } from '@chakra-ui/core'
import React, { useContext } from 'react'
import { ChallengeContext } from '../../context/challengeContext'
import { RegProblemFragment } from '../../generated/graphql'

import { Editor } from '../Editor'

interface ChallengeEditorProps {
   problemData: RegProblemFragment | undefined | null
   onSubmit: () => void
   value: string | undefined
   setValue: any
   fetching: boolean
}

export const ChallengeEditor: React.FC<ChallengeEditorProps> = ({
   problemData,
   onSubmit,
   value,
   setValue,
   fetching,
}) => {
   const { colorMode } = useColorMode()
   const theme = { light: 'tomorrow', dark: 'merbivore' }
   const { completedState } = useContext(ChallengeContext)

   return (
      <>
         <Editor
            height={'300px'}
            defaultValue={problemData?.placeHolder}
            theme={theme[colorMode]}
            value={value}
            setValue={setValue}
         />
         <Flex>
            <Button
               fontSize={[15, 15, 25, 25]}
               isLoading={fetching}
               leftIcon="check"
               mt={2}
               bg="green.300"
               onClick={onSubmit}
            >
               Run your code
            </Button>
            {completedState && <Text>challenge complete</Text>}
         </Flex>
      </>
   )
}
