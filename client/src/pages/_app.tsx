import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core'
import { NextComponentType } from 'next'
import theme from '../theme'
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
