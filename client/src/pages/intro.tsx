import React from 'react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { fadeInUp } from '../animations'
import { Challenge } from '../components/challenge/Challenge'
import { ChallengeDesc } from '../components/challenge/ChallengeDesc'
import { Layout } from '../components/layouts/Layout'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useGetProblemByIdQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

const Intro: NextPage = () => {
   const [{ data, fetching, error }] = useGetProblemByIdQuery({
      variables: { _id: '5f478058f712257781ecf239' },
      pause: isServer(),
   })
   return (
      <motion.div initial="initial" animate="animate">
         <Layout fontSize={['4vh', '6vh', '8vh']} title={'Js-quiz'} height={'8vh'} minH={'100vh'}>
            <Head>
               <title>Js Quiz</title>
               <meta property="og:title" content="Js Quiz" key="title" />
            </Head>
            {data && !fetching ? (
               <motion.div variants={fadeInUp} transition={{ delay: 0.4 }}>
                  <ChallengeDesc problemData={data?.getProblemById} />
                  <Challenge problemData={data?.getProblemById} error={error} loading={fetching} />
               </motion.div>
            ) : (
               <LoadingSpinner />
            )}
         </Layout>
      </motion.div>
   )
}
export default withUrqlClient(createUrqlClient, { ssr: true })(Intro)
