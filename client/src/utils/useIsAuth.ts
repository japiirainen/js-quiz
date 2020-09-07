import { useMeQuery } from '../generated/graphql'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useIsAuth = () => {
   const [{ data }] = useMeQuery()
   const router = useRouter()
   useEffect(() => {
      if (!data?.me) {
         router.replace('/login?next=' + router.pathname)
      }
   }, [data, router])
}
