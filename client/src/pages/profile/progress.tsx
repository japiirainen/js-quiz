import Head from 'next/head'
import { AccountLayout } from '../../components/layouts/AccountLayout'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { UserLevelDisplay } from '../../components/progress/UserLevel'
import { NextPage } from 'next'
import { ProgressInAllCategories } from '../../components/progress/progressInAllCategories'

const Progress: NextPage = () => {
   return (
      <>
         <Head>
            <title>Js Quiz Progress</title>
            <meta property="og:title" content="Js Quiz Progress" key="title" />
         </Head>
         <AccountLayout
            bc2Text={'settings'}
            bc2Href={'/profile/settings'}
            bc1Text={'progress'}
            bc1Href={'/profile/progress'}
            fontSize={'4vh'}
            height={'8vh'}
            title={'Profile'}
            variant={'small'}
            minH={'100vh'}
         >
            <UserLevelDisplay />
            <ProgressInAllCategories />
         </AccountLayout>
      </>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Progress)
