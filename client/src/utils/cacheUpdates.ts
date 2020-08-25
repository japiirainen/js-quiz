import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql'
import { updateQuery } from './updateQuery'
import { Data, Variables, ResolveInfo } from '@urql/exchange-graphcache'

export const logoutUpdate = (_result: Data, _: Variables, cache: any, __: ResolveInfo) => {
   return updateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({ me: null }))
}

export const loginUpdate = (_result: Data, _: Variables, cache: any, __: ResolveInfo) => {
   updateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
      if (!result.login.username) {
         return query
      } else {
         return {
            me: {
               _id: result.login._id,
               username: result.login.username,
            },
         }
      }
   })
}
export const registerUpdate = (_result: Data, _: Variables, cache: any, __: ResolveInfo) => {
   updateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
      if (!result.register.username) {
         return query
      } else {
         return {
            me: {
               _id: result.register._id,
               username: result.register.username,
            },
         }
      }
   })
}
