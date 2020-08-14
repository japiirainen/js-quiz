import React from 'react'
import { Link as RrLink } from 'react-router-dom'
import { Box, Heading, Flex, Button, useColorMode, Icon, Link, Text } from '@chakra-ui/core'
import { FaBars } from 'react-icons/fa'
import { MenuItems } from './MenuItems'

export const Header = props => {
   const [show, setShow] = React.useState(false)
   const { colorMode, toggleColorMode } = useColorMode()
   const handleToggle = () => setShow(!show)
   const bgColor = { light: 'red.100', dark: 'gray.700' }
   const color = { light: 'blue.800', dark: 'white' }

   return (
      <Flex
         as="nav"
         align="center"
         justify="space-between"
         wrap="wrap"
         padding="1rem"
         borderBottom="1px"
         borderBottomColor={color[colorMode]}
         bg={bgColor[colorMode]}
         color={color[colorMode]}
         {...props}
      >
         <Flex align="center" mr={5}>
            <Heading as="h1" size="xl" letterSpacing={'-.1rem'}>
               <Link as={RrLink} to="/">
                  Js-quiz
               </Link>
            </Heading>
         </Flex>

         <Button
            onClick={handleToggle}
            bg={bgColor[colorMode]}
            color={color[colorMode]}
            display={{ base: 'block', md: 'none' }}
         >
            <Box as={FaBars} color={color[colorMode]} size="32px" display={{ base: 'block', md: 'none' }} />
         </Button>
         <Box
            display={{ sm: show ? 'block' : 'none', md: 'flex' }}
            width={{ sm: 'full', md: 'auto', xs: 'full' }}
            alignItems="center"
            flexGrow={1}
         >
            {show && (
               <>
                  <MenuItems>
                     <Button as={RrLink} to="/basics" color={color[colorMode]} bg={bgColor[colorMode]}>
                        <Text>Basic questions</Text>
                     </Button>
                  </MenuItems>
                  <MenuItems>
                     <Button as={RrLink} to="/hard" color={color[colorMode]} bg={bgColor[colorMode]}>
                        <Text>Hard questions</Text>
                     </Button>
                  </MenuItems>
                  <MenuItems>
                     <Button
                        justifyContent="flex-start"
                        bg={bgColor[colorMode]}
                        color={color[colorMode]}
                        onClick={toggleColorMode}
                     >
                        <Text mr="15px">Color mode</Text>
                        {colorMode === 'light' ? (
                           <Icon size="25px" color="blue.800" name="moon" />
                        ) : (
                           <Icon size="25px" color="yellow.300" name="sun" />
                        )}
                     </Button>
                  </MenuItems>
               </>
            )}
         </Box>
      </Flex>
   )
}
