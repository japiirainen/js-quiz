import React from 'react'
import { Box, Text, Button, Flex, Stack, Heading, Code } from '@chakra-ui/core'
import { Container } from './Container'
import { RegProblemFragment, useGetSolutionQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

interface ChallengeCompleteProps {
   onRedoClick: any
   problem: RegProblemFragment | undefined | null
   userId: string | undefined
}

export const ChallengeComplete: React.FC<ChallengeCompleteProps> = ({
   onRedoClick,
   problem,
   userId,
}) => {
   const [{data, fetching}] = useGetSolutionQuery({ pause: isServer(), variables: {input: { userId: userId, problemId: problem?._id }} })
   console.log(data)
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
               {!fetching && data?.getSolution?.solution && 
               <Code color={'white'} width="100%" height={'auto'} p={5} mt={2}>
                  <Text color="green.900" fontSize={15}>
                     {data?.getSolution?.solution}
                  </Text>
               </Code>
               }
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
