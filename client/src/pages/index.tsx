/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import { Divider, Icon, Text } from '@chakra-ui/core'
import { Challenge } from '../components/challenge/Challenge'
import { ChallengeDesc } from '../components/challenge/ChallengeDesc'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { Layout } from '../components/layouts/Layout'
import { useGetProblemByIdQuery, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { motion } from 'framer-motion'
import { fadeInDown, fadeInUp } from '../animations'
import { LandingPage } from '../components/Landing/LandingPage'

const Index = () => {
   const [{ data, fetching, error }] = useGetProblemByIdQuery({
      variables: { _id: '5f478058f712257781ecf239' },
      pause: isServer(),
   })
   const [{ data: meData, fetching: meFetching }] = useMeQuery({ pause: isServer() })

   if (fetching || meFetching) {
      return <LoadingSpinner />
   }

   if (!meData?.me?._id) {
      return <LandingPage />
   }

   return (
      <motion.div initial="initial" animate="animate">
         <Layout fontSize={['4vh', '6vh', '8vh']} title={'Js-quiz'} height={'8vh'} minH={'100vh'}>
            <Head>
               <title>Js Quiz</title>
               <meta property="og:title" content="Js Quiz" key="title" />
            </Head>
            <motion.div variants={fadeInDown}></motion.div>
            <Divider m={2} />
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
