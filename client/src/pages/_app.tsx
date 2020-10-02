import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core'
import { NextComponentType } from 'next'
import { AnimatePresence } from 'framer-motion'
import theme from '../theme'
import { ChallengeContextProvider } from '../context/challengeContext'
import { EditorValueProvider } from '../context/editorValueContext'
import { LPMachineContextProvider } from '../context/LPMachineContext'

interface MyAppProps {
   Component: NextComponentType
   pageProps: any
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps, children }) => {
   return (
      <AnimatePresence exitBeforeEnter>
         <ThemeProvider theme={theme}>
            <ChallengeContextProvider>
               <EditorValueProvider>
                  <LPMachineContextProvider>
                     <ColorModeProvider>
                        <CSSReset />
                        {children}
                        <Component {...pageProps} />
                     </ColorModeProvider>
                  </LPMachineContextProvider>
               </EditorValueProvider>
            </ChallengeContextProvider>
         </ThemeProvider>
      </AnimatePresence>
   )
}

export default MyApp
