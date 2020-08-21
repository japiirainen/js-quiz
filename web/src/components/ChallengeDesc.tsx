import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/core'
import { Container } from './Container'

interface ChallengeDescProps {
   primary: string
   secondary?: string
}

export const ChallengeDesc: React.FC<ChallengeDescProps> = ({ primary, secondary }) => {
   return (
      <Container>
         <Box m={4} p={4} w={'100%'}>
            <Flex d={'column'}>
               <Text fontSize={20}>{primary}</Text>
               <Text mt={3} fontSize={18}>
                  {secondary}
               </Text>
            </Flex>
         </Box>
      </Container>
   )
}
