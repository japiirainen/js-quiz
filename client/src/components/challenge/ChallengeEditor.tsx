import { Button, Flex, Tag, TagIcon, TagLabel, useColorMode } from '@chakra-ui/core'
import React, { Dispatch, SetStateAction, useContext } from 'react'
import { ChallengeContext } from '../../context/challengeContext'
import { RegProblemFragment } from '../../generated/graphql'
import { Editor } from '../Editor'

interface ChallengeEditorProps {
   problemData: RegProblemFragment | undefined | null
   onSubmit: () => void
   value: string | undefined
   defaultValue: string | undefined
   setValue: Dispatch<SetStateAction<string | undefined>>
   fetching: boolean
}

export const ChallengeEditor: React.FC<ChallengeEditorProps> = ({
   onSubmit,
   value,
   setValue,
   fetching,
   defaultValue,
}) => {
   const { colorMode } = useColorMode()
   const theme = { light: 'tomorrow', dark: 'merbivore' }
   const { completedState } = useContext(ChallengeContext)

   return (
      <>
         <Editor
            height={'300px'}
            defaultValue={defaultValue}
            theme={theme[colorMode]}
            value={value}
            setValue={setValue}
         />
         <Flex>
            <Button
               fontSize={[15, 15, 25, 25]}
               isLoading={fetching}
               mt={2}
               bg="green.300"
               onClick={onSubmit}
            >
               Run your code
            </Button>
            {completedState && (
               <Tag ml={'auto'} mt={2} size={'md'} variantColor="green">
                  <TagLabel>Challenge complete!</TagLabel>
                  <TagIcon icon="check" size="12px" />
               </Tag>
            )}
         </Flex>
      </>
   )
}
