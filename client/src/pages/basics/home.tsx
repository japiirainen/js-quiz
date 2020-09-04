import { NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { ChallengeList } from '../../components/ChallengeList'
import { useGetProblemsInGroupQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { Stack, Text, Icon, theme } from '@chakra-ui/core'
import { ProgressBar } from '../../components/ProgressBar'

const Home: NextPage = () => {
   const [{ data, fetching }] = useGetProblemsInGroupQuery({
      variables: {
         groupName: 'basics',
      },
      pause: isServer(),
   })
   return (
      <Layout
         fontSize={'4vh'}
         height={'8vh'}
         title={'Javascript Basics'}
         variant={'regular'}
         minH={'100vh'}
      >
         {fetching ? (
            <LoadingSpinner />
         ) : (
            <>
               <Text fontSize={22} fontStyle={theme.fonts.mono}>
                  In this section you will be challenged with a few challenges touching on some core
                  concepts of Javascript. The problems will get harder throughout the section. Hope
                  you enjoy!
                  <Icon name="info" color="blue.500" mx="2px" />
               </Text>
               <Stack isInline spacing={8} align="center" mt={50}>
                  <ChallengeList problemList={data?.findProblemsInGroup} />
                  <ProgressBar ProblemData={data} />
               </Stack>
            </>
         )}
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
