import Head from 'next/head'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { ChallengeHomePage } from '../../components/challenge/ChallengeHomePage'

const Home: NextPage = () => {
   return (
      <>
         <Head>
            <title>Js Quiz Loops</title>
            <meta property="og:title" content="Js Quiz Loops" key="title" />
         </Head>
         <ChallengeHomePage
            description="In this section you will be challenged with some problems that require using loops. This is also an essential part of programming so spend some time on these!"
            groupName="loops"
         />
      </>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
