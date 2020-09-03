import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { ChallengePage } from '../../components/ChallengePage'
import { createUrqlClient } from '../../utils/createUrqlClient'

const Loops: NextPage = () => {
   return <ChallengePage problemGroup={'loops'} />
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Loops)
