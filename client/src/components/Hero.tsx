import { Flex, Heading, useColorMode } from '@chakra-ui/core'

import React from 'react'

interface HeroProps {
   title: string
   fontSize: string | string[]
   height: string
}

export const Hero: React.FC<HeroProps> = ({ title, fontSize, height }) => {
   const { colorMode } = useColorMode()
   const fontColor = { light: 'red.300', dark: 'white' }

   return (
      <Flex justifyContent="center" alignContent="center" height={height}>
         <Heading color={fontColor[colorMode]} fontSize={fontSize}>
            {title}
         </Heading>
      </Flex>
   )
}
