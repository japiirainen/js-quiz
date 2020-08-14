import React from 'react'
import { Box, useColorMode, Link, Text, Icon, Flex } from '@chakra-ui/core'
import { Link as RrLink } from 'react-router-dom'
import { MenuItems } from './MenuItems'
export const SideDrawer = () => {
   const { colorMode, toggleColorMode } = useColorMode()
   const bgColor = { light: 'white', dark: 'gray.700' }
   const color = { light: 'blue.800', dark: 'white' }
   return (
      <Box
         display={{ md: 'block', base: 'none' }}
         width="250px"
         height="1000px"
         color={color[colorMode]}
         bg={bgColor[colorMode]}
         borderRight="1px"
         borderRightColor={color[colorMode]}
      >
         <MenuItems>
            <Link as={RrLink} to="/basics" color={color[colorMode]} bg={bgColor[colorMode]}>
               <Text>Basic questions</Text>
            </Link>
         </MenuItems>
         <MenuItems>
            <Link as={RrLink} to="/hard" color={color[colorMode]} bg={bgColor[colorMode]}>
               <Text>Hard questions</Text>
            </Link>
         </MenuItems>
         <Link
            ml={10}
            mt={100}
            position="relative"
            right="10px"
            bg={bgColor[colorMode]}
            color={color[colorMode]}
            onClick={toggleColorMode}
            display={{ md: 'block', base: 'none' }}
         >
            {colorMode === 'light' ? (
               <Icon size="25px" color="blue.800" name="moon" />
            ) : (
               <Icon size="25px" color="yellow.300" name="sun" />
            )}
         </Link>
      </Box>
   )
}
