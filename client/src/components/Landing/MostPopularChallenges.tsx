import { Box, List, Text, useColorMode } from '@chakra-ui/core'
import { motion } from 'framer-motion'
import { fadeInOpacity } from '../../animations'
import { useGetPopularProblemsQuery, useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { LoadingSpinner } from '../LoadingSpinner'
import { ChallengeListItem } from './ChallengeListItem'
import { Feature } from './Feature'

export const MostPopularChallenges: React.FC = () => {
   const [{ data: meData }] = useMeQuery({ pause: isServer() })
   const [{ data, fetching }] = useGetPopularProblemsQuery()

   const { colorMode } = useColorMode()
   const fontColor = { light: 'red.300', dark: 'white' }

   if (fetching) <LoadingSpinner />

   return (
      <Box>
         <motion.div initial="initial" animate="animate">
            <motion.div variants={fadeInOpacity}>
               <Feature width={['90vw', '90vw', 700, 700]} p={5} height={['auto', 200]}>
                  <motion.div variants={fadeInOpacity}>
                     <Text color={fontColor[colorMode]} fontSize={[20, 20, 20, 25]}>
                        Most popular challenges:
                     </Text>
                  </motion.div>
                  <List as="ol" styleType="decimal">
                     {data?.getPopularProblems.map(x => (
                        <ChallengeListItem key={x?._id} data={x} me={meData} />
                     ))}
                  </List>
               </Feature>
            </motion.div>
         </motion.div>
      </Box>
   )
}
