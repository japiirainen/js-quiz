import { Flex, Box } from '@chakra-ui/core'
import React from 'react'

export type ContainerVariant = 'small' | 'regular'

type WrapperProps = any

export const Container: React.FC<WrapperProps> = ({ children, variant = 'regular', ...rest }) => {
   return (
      <Flex direction="column" alignItems="center" justifyContent="flex-start" {...rest}>
         <Box mt={8} mx="auto" maxW={variant === 'regular' ? '800px' : '400px'} w="100%">
            {children}
         </Box>
      </Flex>
   )
}
