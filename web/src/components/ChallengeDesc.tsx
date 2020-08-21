import { Box, List, ListIcon, ListItem, Text } from '@chakra-ui/core'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { Container } from './Container'

interface ChallengeDescProps {
   primary: string
   secondary?: string
}

export const ChallengeDesc: React.FC<ChallengeDescProps> = ({ primary, secondary }) => {
   return (
      <Container>
         <List spacing={3} my={0}>
            <Box m={4} p={4} w={'100%'}>
               <ListItem>
                  <Text fontSize={20}>
                     <ListIcon icon={FaAngleRight} size="15px" />
                     {primary}
                  </Text>
               </ListItem>
               <ListItem>
                  <Text fontSize={20}>
                     <ListIcon icon={FaAngleRight} size="15px" />
                     {secondary}
                  </Text>
               </ListItem>
            </Box>
         </List>
      </Container>
   )
}
