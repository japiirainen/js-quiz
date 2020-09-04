import React from 'react'
import { Box, Text, Button, Flex, Stack, Heading, Code } from '@chakra-ui/core'
import { Container } from './Container'
import { RegProblemFragment } from '../generated/graphql'

interface ChallengeCompleteProps {
   onRedoClick: any
   problem: RegProblemFragment | undefined | null
   userSolution: string | undefined
}

export const ChallengeComplete: React.FC<ChallengeCompleteProps> = ({
   onRedoClick,
   problem,
   userSolution,
}) => {
   return (
      <Box h="500px">
         <Container textAlign={'center'}>
            <Stack boxShadow="lg" p={2}>
               <Heading fontSize="xl">Challenge completed!</Heading>
               <Text mt={4}>
                  Nice Job!😎 Below you can see your solution and also my solution so you can see
                  similarities and differences between them.
               </Text>
               <Text>Your solution:</Text>
               <Code color={'white'} width="100%" height={'auto'} p={5} mt={2}>
                  <Text color="green.900" fontSize={15}>
                     {userSolution}
                  </Text>
               </Code>
               <Text>Creator solution:</Text>
               <Code color={'white'} width="100%" height={'auto'} p={5} mt={2}>
                  <Text color="green.900" fontSize={15}>
                     {problem?.correctSolution}
                  </Text>
               </Code>
               <Flex alignItems={'center'} justifyContent="space-around" mt={4}>
                  <Button variant="solid" variantColor={'red'} onClick={onRedoClick}>
                     Redo this problem
                  </Button>
               </Flex>
            </Stack>
         </Container>
      </Box>
   )
}
