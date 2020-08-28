import { Flex, useColorMode, Box } from '@chakra-ui/core'
import React from 'react'

export type ContainerVariant = 'small' | 'regular'

type WrapperProps = any

export const Container: React.FC<WrapperProps> = ({ children, variant = 'regular', ...rest }) => {
   const { colorMode } = useColorMode()

   const bgColor = { light: 'gray.50', dark: 'gray.900' }
   const color = { light: 'black', dark: 'white' }

   return (
      <Flex
         direction="column"
         alignItems="center"
         justifyContent="flex-start"
         bg={bgColor[colorMode]}
         color={color[colorMode]}
         {...rest}
      >
         <Box mt={8} mx="auto" maxW={variant === 'regular' ? '800px' : '400px'} w="100%">
            {children}
         </Box>
      </Flex>
   )
}
