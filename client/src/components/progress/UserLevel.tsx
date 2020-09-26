import {
   Text,
   Progress,
   Divider,
   Heading,
   Box,
   Tag,
   TagIcon,
   TagLabel,
   Flex,
   Stat,
   StatNumber,
} from '@chakra-ui/core'
import { useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { calcColor, calcValue, calcUserLevelColor } from '../../utils/helperFns'
import { LoadingSpinner } from '../LoadingSpinner'
import { motion } from 'framer-motion'

export const UserLevelDisplay: React.FC = () => {
   const [{ data: meData, fetching }] = useMeQuery({ pause: isServer() })
   return (
      <motion.div initial="initial" animate="animate">
         <Heading textAlign="center" fontSize={30}>
            Level status
         </Heading>
         {fetching ? (
            <LoadingSpinner height={'300px'} />
         ) : (
            <Box h={'300px'}>
               <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
               >
                  <Flex>
                     <Text fontSize={[20, 20, 25, 25]} mt={25}>
                        Current level:{' '}
                        <Text
                           fontSize={[20, 20, 25, 25]}
                           ml={20}
                           as={'span'}
                           color={calcUserLevelColor(meData?.me?.progress?.level as any)}
                        >
                           {meData?.me?.progress?.level || 'BEGINNER'}
                        </Text>
                     </Text>
                  </Flex>
                  <Text fontSize={25} mt={25}>
                     Points to level up:
                  </Text>
                  <Box>
                     <Stat mt={8}>
                        <Flex direction="column" alignItems="center">
                           <StatNumber>
                              {meData?.me?.progress?.points &&
                                 calcValue(meData?.me?.progress?.points)}{' '}
                              / 100
                           </StatNumber>
                        </Flex>
                     </Stat>
                     {meData?.me?.progress?.points ? (
                        <Progress
                           color={calcColor(meData?.me?.progress?.points as never)}
                           hasStripe
                           value={calcValue(meData?.me?.progress?.points)}
                           size={'lg'}
                           isAnimated
                           mt={7}
                        />
                     ) : (
                        <Progress color={'red'} hasStripe value={1} size={'lg'} isAnimated mt={7} />
                     )}
                     <Flex mt={2}>
                        <Tag ml={'auto'} size={'sm'} variantColor="green">
                           <TagLabel>Level Up</TagLabel>
                           <TagIcon icon="check" size="12px" />
                        </Tag>
                     </Flex>
                  </Box>
               </motion.div>
            </Box>
         )}
         <Divider m={5} />
      </motion.div>
   )
}
