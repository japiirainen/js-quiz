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
import { calcColor } from '../../utils/helperFns'
import { LoadingSpinner } from '../LoadingSpinner'

export const UserLevelDisplay = () => {
   const [{ data: meData, fetching }] = useMeQuery({ pause: isServer() })
   return (
      <>
         <Heading textAlign="center" fontSize={30}>
            Level status
         </Heading>
         {fetching ? (
            <LoadingSpinner />
         ) : (
            <>
               <Flex>
                  <Text fontSize={[20, 20, 25, 25]} mt={25}>
                     Current level:{' '}
                     <Text
                        fontSize={[20, 20, 25, 25]}
                        ml={20}
                        as={'span'}
                        color={calcColor(meData?.me?.progress?.points as never) + '.500'}
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
                        <StatNumber>{meData?.me?.progress?.points} / 100</StatNumber>
                     </Flex>
                  </Stat>
                  {meData?.me?.progress?.points ? (
                     <Progress
                        color={calcColor(meData?.me?.progress?.points as never)}
                        hasStripe
                        value={meData?.me?.progress?.points}
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
            </>
         )}
         <Divider m={20} />
      </>
   )
}
