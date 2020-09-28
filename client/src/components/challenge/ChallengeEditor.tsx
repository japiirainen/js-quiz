import { Button, Flex, Tag, TagIcon, TagLabel, useColorMode } from '@chakra-ui/core'
import { FaPlay } from 'react-icons/fa'
import React, { Dispatch, SetStateAction, useContext } from 'react'
import { ChallengeContext } from '../../context/challengeContext'
import { RegProblemFragment } from '../../generated/graphql'
import { Editor } from '../Editor'
import { motion } from 'framer-motion'

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
   const theme = { light: 'tomorrow', dark: 'monokai' }
   const { completedState } = useContext(ChallengeContext)

   return (
      <>
         <Editor
            height={'400px'}
            defaultValue={defaultValue}
            theme={theme[colorMode]}
            value={value}
            setValue={setValue}
         />
         <Flex>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
               <Button
                  fontSize={[20, 20, 25, 25]}
                  isLoading={fetching}
                  mt={2}
                  bg="green.500"
                  onClick={onSubmit}
                  _hover={{ color: 'white', backgroundColor: 'green.300' }}
               >
                  <FaPlay color="white" />
               </Button>
            </motion.div>
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
