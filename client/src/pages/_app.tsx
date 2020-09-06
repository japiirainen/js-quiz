import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core'
import { NextComponentType } from 'next'
import theme from '../theme'
import { ChallengeContextProvider } from '../context/challengeContext'

interface MyAppProps {
   Component: NextComponentType
   pageProps: any
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
   return (
      <ThemeProvider theme={theme}>
         <ChallengeContextProvider>
            <ColorModeProvider>
               <CSSReset />
               <Component {...pageProps} />
            </ColorModeProvider>
         </ChallengeContextProvider>
      </ThemeProvider>
   )
}

export default MyApp
