import React from 'react'
import { Text } from '@chakra-ui/core'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { Layout } from '../components/layouts/Layout'

const Intro: NextPage = () => {
   return (
      <Layout fontSize={'6vh'} title={'Intro to challenges'} height={'8vh'} minH={'100vh'}>
         <Text>
            For the most part the things regarding the challenges on this website should be quite
            self explanatory
         </Text>
      </Layout>
   )
}
export default withUrqlClient(createUrqlClient, { ssr: true })(Intro)
