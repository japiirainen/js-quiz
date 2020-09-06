import { useRouter } from 'next/router'
import { useGetProblemByIndexQuery } from '../generated/graphql'

export const useGetIntIndex = () => {
   const router = useRouter()
   const intId = typeof router.query.index === 'string' ? parseInt(router.query.index) : -1

   return intId
}

export const useGetPostFromUrl = () => {
   const intIndex = useGetIntIndex()
   return useGetProblemByIndexQuery({
      pause: intIndex === -1,
      variables: {
         index: intIndex,
      },
   })
}
