import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { ChallengePage } from '../../components/ChallengePage'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetPostFromUrl } from '../../utils/usegetProblemFromUrl'

const Conditionals: NextPage = () => {
   const [{ data, fetching, error }] = useGetPostFromUrl()
   return (
      <ChallengePage error={error} fetching={fetching} data={data} problemGroup={'conditionals'} />
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Conditionals)
