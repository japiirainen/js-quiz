import React from 'react'
import { Container } from './Container'
import { Flex, Spinner } from '@chakra-ui/core'

export const LoadingSpinner: React.FC = () => {
   return (
      <Container minHeight="100vh">
         <Flex justifyContent="center" alignItems="center">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
         </Flex>
      </Container>
   )
}
