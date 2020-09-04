import {
   LoginMutation,
   LogoutMutation,
   MeDocument,
   MeQuery,
   RegisterMutation,
   SubmitResultMutation,
   UpdateUserMutation,
} from '../generated/graphql'
import { updateQuery } from './updateQuery'
import { Data, Variables, ResolveInfo } from '@urql/exchange-graphcache'

export const logoutUpdate = (_result: Data, _: Variables, cache: any, __: ResolveInfo) => {
   return updateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({
      me: null,
   }))
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
               completedProblems: result.login.completedProblems,
            },
         }
      }
   })
}
export const registerUpdate = (_result: Data, _: Variables, cache: any, __: ResolveInfo) => {
   updateQuery<RegisterMutation, MeQuery>(
      cache,
      { query: MeDocument },
      _result,
      (result, query) => {
         if (!result.register.username) {
            return query
         } else {
            return {
               me: {
                  _id: result.register._id,
                  username: result.register.username,
                  completedProblems: result.register.completedProblems,
               },
            }
         }
      }
   )
}

export const submitResultUpdate = (_result: Data, _: Variables, cache: any, __: ResolveInfo) => {
   updateQuery<SubmitResultMutation, MeQuery>(
      cache,
      { query: MeDocument },
      _result,
      (result, query) => {
         if (!result.submitResult?.user?.completedProblems) {
            return query
         } else {
            return {
               me: {
                  _id: result.submitResult.user._id,
                  username: result.submitResult.user.username,
                  completedProblems: result.submitResult.user.completedProblems,
               },
            }
         }
      }
   )
}

export const updateUser = (_result: Data, _: Variables, cache: any, __: ResolveInfo) => {
   updateQuery<UpdateUserMutation, MeQuery>(
      cache,
      { query: MeDocument },
      _result,
      (result, query) => {
         if (!result.updateUser._id) {
            return query
         } else {
            return {
               me: {
                  _id: result.updateUser._id,
                  username: result.updateUser.username,
                  completedProblems: result.updateUser.completedProblems,
               },
            }
         }
      }
   )
}
