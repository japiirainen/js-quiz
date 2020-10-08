import { List, Text, Stat, StatLabel, StatNumber, Flex } from '@chakra-ui/core'
import React from 'react'
import { Container } from '../Container'
import { ChallengeProps } from './Challenge'

const calculateBorderColor = (difficulty: string | undefined) => {
   if (difficulty === 'EASY') {
      return 'green.500'
   } else if (difficulty === 'MEDIUM') {
      return 'orange.500'
   } else {
      return 'red.500'
   }
}

export const ChallengeDesc: React.FC<ChallengeProps> = ({ problemData }) => {
   return (
      <Container mt={0}>
         <List spacing={3} my={0}>
            <Flex p={4} width="100%" direction="column">
               <Stat
                  borderBottom="1px"
                  borderStyle="dashed"
                  paddingTop="2"
                  paddingBottom="2"
                  paddingRight="4"
                  paddingLeft="4"
                  mt={4}
                  mb={4}
               >
                  <StatLabel>Problem description:</StatLabel>
                  <StatNumber fontSize={['md', 'md', 'lg', 'xl']}>
                     {problemData?.description}
                  </StatNumber>
               </Stat>
               <Flex direction="row-reverse">
                  <Flex direction="column">
                     {problemData?.placeHolderInputOutput.typeSignature ? (
                        <Stat>
                           <StatLabel borderBottom="1px" borderBottomColor="red.200">
                              Type signature:
                           </StatLabel>
                           <StatNumber fontSize={18}>
                              <Text>{problemData.placeHolderInputOutput.typeSignature}</Text>
                           </StatNumber>
                        </Stat>
                     ) : null}
                     <Stat>
                        <StatLabel borderBottom="1px" borderBottomColor="red.200">
                           example input:
                        </StatLabel>
                        <StatNumber fontSize={18}>
                           <Text>{problemData?.placeHolderInputOutput.input}</Text>
                        </StatNumber>
                     </Stat>
                     <Stat>
                        <StatLabel borderBottom="1px" borderBottomColor="red.200">
                           example output:
                        </StatLabel>
                        <StatNumber fontSize={18}>
                           <Text>{problemData?.placeHolderInputOutput.output}</Text>
                        </StatNumber>
                     </Stat>
                  </Flex>
                  <Stat>
                     <StatLabel>Difficulty:</StatLabel>
                     <StatNumber>
                        <Text color={calculateBorderColor(problemData?.difficulty)}>
                           {problemData?.difficulty}
                        </Text>
                     </StatNumber>
                  </Stat>
               </Flex>
            </Flex>
         </List>
      </Container>
   )
}
