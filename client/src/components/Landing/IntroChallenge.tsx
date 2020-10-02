import React, { useContext, useEffect } from 'react'
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
import { useService } from '@xstate/react'
import { EditorValueContext } from '../../context/editorValueContext'
import { ChallengeContext } from '../../context/challengeContext'
import { LPMachineContext, serviceType } from '../../context/LPMachineContext'

export const IntroChallenge: NextPage = () => {
   const [{ data, fetching, error }] = useGetProblemByIdQuery({
      variables: { _id: '5f478058f712257781ecf239' },
      pause: isServer(),
   })
   const { value } = useContext(EditorValueContext)
   const { completedState } = useContext(ChallengeContext)
   const { service } = useContext(LPMachineContext)
   const [current, send] = useService(service as serviceType)

   useEffect(() => {
      completedState &&
         current.matches('active.intro.solving') &&
         send({ type: 'INTRO_SUCCESS', solution: value })
   }, [completedState, send, value, current])

   return (
      <motion.div initial="initial" animate="animate">
         <Layout fontSize={['4vh', '5vh', '6vh']} height={'0vh'} minH={'100vh'} hideFooter={true}>
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
