import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { ChallengePage } from '../../components/ChallengePage'
import { createUrqlClient } from '../../utils/createUrqlClient'

const Basics: NextPage = () => {
   return <ChallengePage problemGroup={'basics'} />
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Basics)
