import { Box, List, Text, useColorMode } from '@chakra-ui/core'
import { motion } from 'framer-motion'
import { fadeInOpacity, stagger } from '../../animations'
import { useGetMostFailedProblemsQuery, useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { LoadingSpinner } from '../LoadingSpinner'
import { ChallengeListItem } from './ChallengeListItem'
import { Feature } from './Feature'

export const MostFailedChallenges: React.FC = () => {
   const [{ data: meData }] = useMeQuery({ pause: isServer() })
   const [{ data, fetching }] = useGetMostFailedProblemsQuery({ pause: isServer() })

   const { colorMode } = useColorMode()
   const fontColor = { light: 'red.300', dark: 'white' }

   if (fetching) <LoadingSpinner />

   return (
      <Box mt={3}>
         <motion.div initial="initial" animate="animate">
            <motion.div variants={fadeInOpacity}>
               <Feature width={['90vw', '90vw', 700, 700]} p={5} height={['auto', 200]}>
                  <motion.div variants={fadeInOpacity}>
                     <Text color={fontColor[colorMode]} fontSize={[20, 20, 20, 25]}>
                        Most failed challenges:
                     </Text>
                  </motion.div>
                  <List as="ol" styleType="decimal">
                     <motion.div variants={stagger}>
                        {data?.getMostFailedProblems.map(x => (
                           <ChallengeListItem key={x?._id} data={x} me={meData} />
                        ))}
                     </motion.div>
                  </List>
               </Feature>
            </motion.div>
         </motion.div>
      </Box>
   )
}
