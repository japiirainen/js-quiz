import Head from 'next/head'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { ChallengeHomePage } from '../../components/challenge/ChallengeHomePage'

const Home: NextPage = () => {
   return (
      <>
         <Head>
            <title>Js Quiz Basics</title>
            <meta property="og:title" content="Js Quiz Basics" key="title" />
         </Head>
         <ChallengeHomePage
            description="In this section you will be challenged with a few challenges touching on some core
      concepts of Javascript. The problems will get harder throughout the section. Hope
      you enjoy!"
            groupName="basics"
         />
      </>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
