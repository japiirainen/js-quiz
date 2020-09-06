import { List, Text, Stat, StatLabel, StatNumber, Flex } from '@chakra-ui/core'
import React, { useContext } from 'react'

import { Container } from '../Container'
import { ChallengeProps } from './Challenge'
import { ChallengeContext } from '../../context/challengeContext'

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
   const { completedState } = useContext(ChallengeContext)

   return !completedState ? (
      <Container>
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
                  <StatNumber>{problemData?.description}</StatNumber>
               </Stat>
               <Stat
                  paddingTop="2"
                  paddingBottom="2"
                  paddingRight="4"
                  paddingLeft="4"
                  mt={4}
                  ml={'auto'}
               >
                  <StatLabel>Difficulty:</StatLabel>
                  <StatNumber>
                     <Text color={calculateBorderColor(problemData?.difficulty)}>
                        {problemData?.difficulty}
                     </Text>
                  </StatNumber>
               </Stat>
            </Flex>
         </List>
      </Container>
   ) : null
}
