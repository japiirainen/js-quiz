import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'

import theme from '../theme'
import { NextComponentType } from 'next'

interface MyAppProps {
   Component: NextComponentType
   pageProps: any
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
   return (
      <ThemeProvider theme={theme}>
         <ColorModeProvider>
            <CSSReset />
            <Component {...pageProps} />
         </ColorModeProvider>
      </ThemeProvider>
   )
}

export default MyApp
