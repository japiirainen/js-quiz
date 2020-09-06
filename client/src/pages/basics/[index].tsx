import { NextPage, GetStaticProps } from 'next'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { ChallengePage } from '../../components/ChallengePage'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useRouter } from 'next/router'
import { useGetProblemByIndexQuery, RegProblemFragment } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'

interface BasicsProps {
   data: RegProblemFragment | undefined | null
}

const Basics: NextPage<BasicsProps> = ({ data }) => {
   console.log(data)
   const router = useRouter()
   const routeIndex = parseInt(router.query.index as string) as number
   if (router.isFallback) {
      return <div>Loading...</div>
   }
   return <ChallengePage index={routeIndex} problemGroup={'basics'} />
}

// export const getStaticPaths = async () => {
//    return {
//       paths: [{ params: { index: '1' } }, { params: { index: '2' } }],
//       fallback: true,
//    }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//    const routeIndex = params?.index ? parseInt(params.index[0]) : 1
//    const [{ data }] = useGetProblemByIndexQuery({
//       variables: { index: routeIndex },
//       pause: isServer(),
//    })

//    return {
//       props: { data },
//       revalidate: 1,
//    }
// }

export default withUrqlClient(createUrqlClient, { ssr: true })(Basics)
