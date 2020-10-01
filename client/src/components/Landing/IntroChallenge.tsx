import React from 'react'
import { NextPage } from 'next'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { fadeInUp } from '../../animations'
import { useGetProblemByIdQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { Challenge } from '../challenge/Challenge'
import { ChallengeDesc } from '../challenge/ChallengeDesc'
import { Layout } from '../layouts/Layout'
import { LoadingSpinner } from '../LoadingSpinner'

export const IntroChallenge: NextPage = () => {
   const [{ data, fetching, error }] = useGetProblemByIdQuery({
      variables: { _id: '5f478058f712257781ecf239' },
      pause: isServer(),
   })
   return (
      <motion.div initial="initial" animate="animate">
         <Layout fontSize={['4vh', '5vh', '6vh']} height={'0vh'} minH={'100vh'}>
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
