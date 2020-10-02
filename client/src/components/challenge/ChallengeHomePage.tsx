import { useGetProblemsInGroupQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { Layout } from '../layouts/Layout'
import { LoadingSpinner } from '../LoadingSpinner'
import { Icon, Stack, Text, Flex, Divider } from '@chakra-ui/core'
import { ChallengeList } from './ChallengeList'
import { ProgressBar } from '../ProgressBar'
import { motion } from 'framer-motion'
import { fadeInDown } from '../../animations'

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
            <motion.div initial="initial" animate="animate">
               <motion.div variants={fadeInDown}>
                  <Text fontSize={[18, 18, 22, 26]}>
                     {description}
                     <Icon name="info" color="blue.500" mx="2px" />
                  </Text>
                  <Divider mt={15} />
               </motion.div>
               <Stack isInline spacing={8} align="center" mt={50}>
                  <Flex direction={['column', 'row']} flex={1}>
                     <ChallengeList groupName={groupName} problemList={data?.findProblemsInGroup} />
                     <ProgressBar ProblemData={data} />
                  </Flex>
               </Stack>
            </motion.div>
         )}
      </Layout>
   )
}
