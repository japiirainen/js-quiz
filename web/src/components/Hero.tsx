import { Flex, Heading } from '@chakra-ui/core'

import React from 'react'

interface HeroProps {
   title: string
}

export const Hero: React.FC<HeroProps> = ({ title }) => (
   <Flex justifyContent="center" alignContent="center" height="50vh">
      <Heading fontSize={'8vh'}>{title}</Heading>
   </Flex>
)
