import React from 'react'
import { Text, Divider, useColorMode } from '@chakra-ui/core'

export const MenuItems = ({ children }) => {
   const { colorMode } = useColorMode()
   const color = { light: 'blue.800', dark: 'white' }

   return (
      <>
         <Text mt={{ base: 4, md: 0 }} ml={4} display="block">
            {children}
         </Text>
         <Divider borderColor={color[colorMode]} />
      </>
   )
}
