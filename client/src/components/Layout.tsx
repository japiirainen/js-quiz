import React from 'react'

import { Container, ContainerVariant } from './Container'
import { Hero } from './Hero'
import { Main } from './Main'
import { Footer } from './Footer'
import { Text } from '@chakra-ui/core'
import { SideDrawer } from './SideDrawer'
import { DarkModeSwitch } from './DarkModeSwitch'

interface LayoutProps {
   title?: string
   fontSize: string
   height: string
   variant?: ContainerVariant
   minH?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, fontSize, height, title = '', variant, minH }) => {
   return (
      <Container height={'100%'} variant={variant} minH={minH}>
         <Hero title={title} fontSize={fontSize} height={height} />
         <Main marginTop={'0'}>{children}</Main>
         <SideDrawer />
         <DarkModeSwitch />
         <Footer>
            <Text>© js-quiz</Text>
         </Footer>
      </Container>
   )
}
