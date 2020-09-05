import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { ChallengePage } from '../../components/ChallengePage'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useRouter } from 'next/router'

const Basics: NextPage = () => {
  const router = useRouter()
  const routeIndex = parseInt(router.query.index as string) as number

  return <ChallengePage index={routeIndex} problemGroup={'basics'} />
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Basics)
