import React from 'react'
import { Box, Heading, Flex, Button, useColorMode, Icon } from '@chakra-ui/core'

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
          Js-quiz
        </Heading>
      </Flex>
      <Button bg={bgColor[colorMode]} color={color[colorMode]} onClick={toggleColorMode}>
        {colorMode === 'light' ? <Icon color="blue.600" name="moon" /> : <Icon color="yellow.300" name="sun" />}
      </Button>
      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>
    </Flex>
  )
}
