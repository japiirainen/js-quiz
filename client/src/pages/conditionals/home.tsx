import Head from 'next/head'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { ChallengeHomePage } from '../../components/challenge/ChallengeHomePage'
import { useIsAuth } from '../../utils/useIsAuth'

const Home: NextPage = () => {
   useIsAuth()
   return (
      <>
         <Head>
            <title>Js Quiz Conditionals</title>
            <meta property="og:title" content="Js Quiz Conditionals" key="title" />
         </Head>
         <ChallengeHomePage
            description="In this section you will be challenged with conditionals. This is an essential concept in programming so don't just gloss over these!"
            groupName="conditionals"
         />
      </>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
