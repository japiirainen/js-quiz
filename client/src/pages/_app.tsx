import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core'
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache'
import { NextComponentType } from 'next'
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql'
import theme from '../theme'
import { LoginMutation, MeQuery, MeDocument, RegisterMutation } from '../generated/graphql'

function updateQuery<Result, Query>(cache: Cache, qi: QueryInput, result: any, fn: (r: Result, q: Query) => Query) {
   return cache.updateQuery(qi, data => fn(result, data as any) as any)
}

const client = createClient({
   url: 'http://localhost:5000/graphql',
   fetchOptions: {
      credentials: 'include',
   },
   exchanges: [
      dedupExchange,
      cacheExchange({
         updates: {
            Mutation: {
               login: (_result, _, cache, __) => {
                  updateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
                     if (!result.login.username) {
                        return query
                     } else {
                        return {
                           me: {
                              id: result.login.id,
                              username: result.login.username,
                           },
                        }
                     }
                  })
               },
               register: (_result, _, cache, __) => {
                  updateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
                     if (!result.register.username) {
                        return query
                     } else {
                        return {
                           me: {
                              id: result.register.id,
                              username: result.register.username,
                           },
                        }
                     }
                  })
               },
            },
         },
      }),
      fetchExchange,
   ],
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
