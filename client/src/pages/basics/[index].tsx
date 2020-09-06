import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { ChallengePage } from '../../components/challenge/ChallengePage'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetPostFromUrl } from '../../utils/useGetProblemFromUrl'

const Basics: NextPage = ({}) => {
   const [{ data, fetching, error }] = useGetPostFromUrl()
   return <ChallengePage error={error} fetching={fetching} data={data} problemGroup={'basics'} />
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Basics)
