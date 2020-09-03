import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { ChallengePage } from '../../components/ChallengePage'
import { createUrqlClient } from '../../utils/createUrqlClient'

const Conditionals: NextPage = () => {
   return <ChallengePage problemGroup={'conditionals'} />
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Conditionals)
