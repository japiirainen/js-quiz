import { Flex, Heading } from '@chakra-ui/core'

import React from 'react'

interface HeroProps {
   title: string
   fontSize: string | string[]
   height: string
}

export const Hero: React.FC<HeroProps> = ({ title, fontSize, height }) => (
   <Flex justifyContent="center" alignContent="center" height={height}>
      <Heading fontSize={fontSize}>{title}</Heading>
   </Flex>
)
