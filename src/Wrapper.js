import React from 'react'
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core'
import { App } from './App'
import { Theme } from './Theme'

export const Wrapper = () => {
   return (
      <ThemeProvider theme={Theme}>
         <ColorModeProvider>
            <CSSReset />
            <App />
         </ColorModeProvider>
      </ThemeProvider>
   )
}
