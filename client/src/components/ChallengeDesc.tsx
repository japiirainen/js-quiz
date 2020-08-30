import { Box, List, ListIcon, ListItem, Text } from '@chakra-ui/core'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { Container } from './Container'
import { ChallengeProps } from './Challenge'

export const ChallengeDesc: React.FC<ChallengeProps> = ({ problemData }) => {
   return (
      <Container>
         <List spacing={3} my={0}>
            <Box m={4} p={4} w={'100%'}>
               <ListItem>
                  <Text fontSize={20}>
                     <ListIcon icon={FaAngleRight} size="15px" />
                     {problemData?.description}
                  </Text>
               </ListItem>
            </Box>
         </List>
      </Container>
   )
}
