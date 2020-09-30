import React from 'react'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { LandingPage } from '../components/Landing/LandingPage'

const Intro: NextPage = () => {
   return <LandingPage />
}
export default withUrqlClient(createUrqlClient, { ssr: true })(Intro)
