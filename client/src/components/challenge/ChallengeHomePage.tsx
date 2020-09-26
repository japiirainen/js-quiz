import { useGetProblemsInGroupQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { Layout } from '../layouts/Layout'
import { LoadingSpinner } from '../LoadingSpinner'
import { Icon, Stack, Text, Flex } from '@chakra-ui/core'
import { ChallengeList } from './ChallengeList'
import { ProgressBar } from '../ProgressBar'
import { motion } from 'framer-motion'

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
      <Layout fontSize={'4vh'} height={'8vh'} title={groupName} variant={'regular'} minH={'100vh'}>
         {fetching ? (
            <LoadingSpinner />
         ) : (
            <>
               <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  animate={{ x: 0, opacity: 1 }}
               >
                  <Text fontSize={[18, 18, 22, 26]}>
                     {description}
                     <Icon name="info" color="blue.500" mx="2px" />
                  </Text>
               </motion.div>
               <Stack isInline spacing={8} align="center" mt={50}>
                  <Flex direction={['column', 'row']} flex={1}>
                     <ChallengeList groupName={groupName} problemList={data?.findProblemsInGroup} />
                     <ProgressBar ProblemData={data} />
                  </Flex>
               </Stack>
            </>
         )}
      </Layout>
   )
}
