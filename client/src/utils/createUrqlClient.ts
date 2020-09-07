import { cacheExchange } from '@urql/exchange-graphcache'
import { dedupExchange, fetchExchange } from 'urql'
import { isServer } from './isServer'
import {
   loginUpdate,
   logoutUpdate,
   registerUpdate,
   submitResultUpdate,
   updateUser,
} from './cacheUpdates'

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
   let cookie = ''
   if (isServer()) {
      cookie = ctx?.req?.headers?.cookie
   }
   const URI = 'http://localhost:5000/graphql'
   return {
      url: URI,
      fetchOptions: {
         credentials: 'include' as const,
         headers: cookie
            ? {
                 cookie,
              }
            : undefined,
      },
      exchanges: [
         dedupExchange,
         cacheExchange({
            updates: {
               Mutation: {
                  logout: logoutUpdate,
                  login: loginUpdate,
                  register: registerUpdate,
                  submitResult: submitResultUpdate,
                  updateUser: updateUser,
               },
            },
         }),
         ssrExchange,
         fetchExchange,
      ],
   }
}
