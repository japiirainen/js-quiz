/* eslint-disable react/no-unescaped-entities */
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { LandingPage } from '../components/Landing/LandingPage'
import { LandingLoggedIn } from '../components/Landing/LandingLoggedIn'

const Index = () => {
   const [{ data: meData, fetching: meFetching }] = useMeQuery({ pause: isServer() })

   if (meFetching) {
      return <LoadingSpinner />
   }
   if (!meData?.me?._id) {
      return <LandingPage />
   }
   if (meData.me._id) {
      return <LandingLoggedIn />
   } else {
      return <LoadingSpinner />
   }
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
