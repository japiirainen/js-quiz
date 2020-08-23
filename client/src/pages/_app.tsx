import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core'
import { NextComponentType } from 'next'
import { Provider, createClient } from 'urql'
import theme from '../theme'

const client = createClient({
   url: 'http://localhost:5000/graphql',
   fetchOptions: {
      credentials: 'include',
   },
})
interface MyAppProps {
   Component: NextComponentType
   pageProps: any
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
   return (
      <Provider value={client}>
         <ThemeProvider theme={theme}>
            <ColorModeProvider>
               <CSSReset />
               <Component {...pageProps} />
            </ColorModeProvider>
         </ThemeProvider>
      </Provider>
   )
}

export default MyApp
