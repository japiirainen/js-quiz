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
            <meta property="og:title" content="Js Quiz Ramda" key="title" />
         </Head>
         <ChallengeHomePage
            description="This section is all about learning Ramda! Ramda is an awesome library that makes functional programming a pleasure in JavaScript. In this section you have access to all ramda utilities. You have to use them with the R prefix. so if you want to use ramda's 'map' utility you need to use it like this. 'R.map'. Hope you enjoy!"
            groupName="ramda"
         />
      </>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
