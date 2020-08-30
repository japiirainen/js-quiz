import React from 'react'
import { Box, Text, Button, Flex } from '@chakra-ui/core'
import { Container } from './Container'

interface ChallengeCompleteProps {
   onRedoClick: any
   onNextClick: any
}

export const ChallengeComplete: React.FC<ChallengeCompleteProps> = ({
   onRedoClick,
   onNextClick,
}) => {
   return (
      <Box h="200px">
         <Container textAlign={'center'}>
            <Text fontSize={25}>Challenge complete! 😎</Text>
            <Flex alignItems={'center'} justifyContent="space-around" mt={4}>
               <Button onClick={onRedoClick} bg="red.200">
                  Redo this challenge
               </Button>
               <Button onClick={onNextClick} bg="blue.200">
                  Next challenge
               </Button>
            </Flex>
         </Container>
      </Box>
   )
}
