import React from 'react'
import { Flex, Spinner } from '@chakra-ui/core'

interface MySpinnerProps {
   height?: string
}

export const LoadingSpinner: React.FC<MySpinnerProps> = ({ height }) => {
   return (
      <Flex height={height || '500px'} justifyContent="center" alignItems="center">
         <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="red.300" size="xl" />
      </Flex>
   )
}
