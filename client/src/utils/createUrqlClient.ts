import { cacheExchange } from '@urql/exchange-graphcache'
import { dedupExchange, fetchExchange } from 'urql'
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql'
import { updateQuery } from './updateQuery'

export const createUrqlClient = (ssrExchange: any) => ({
   url: 'http://localhost:5000/graphql',
   fetchOptions: {
      credentials: 'include' as const,
   },
   exchanges: [
      dedupExchange,
      cacheExchange({
         updates: {
            Mutation: {
               logout: (_result, _, cache, __) => {
                  updateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({ me: null }))
               },
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
      ssrExchange,
      fetchExchange,
   ],
})
