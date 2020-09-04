import { useGetProblemsInGroupQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { Layout } from './Layout'
import { LoadingSpinner } from './LoadingSpinner'
import { Icon, Stack, Text } from '@chakra-ui/core'
import { ChallengeList } from './ChallengeList'
import { ProgressBar } from './ProgressBar'

interface ChallengeHomeProps {
   groupName: string
   description: string
}

export const ChallengeHomePage: React.FC<ChallengeHomeProps> = ({ groupName, description }) => {
   const [{ data, fetching }] = useGetProblemsInGroupQuery({
      variables: {
         groupName: groupName,
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
               <Text fontSize={22}>
                  {description}
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
