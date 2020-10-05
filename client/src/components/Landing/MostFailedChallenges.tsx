import { Box, Text } from '@chakra-ui/core'
import { ChallengeListItem } from './ChallengeList'
import { Feature } from './Feature'

export const MostFailedChallenges: React.FC = () => {
   return (
      <Box mt={3}>
         <Feature width={['90vw', '90vw', 700, 700]} p={5} height={['auto', 200]}>
            <Text color="red.300" fontSize={[20, 20, 20, 25]}>
               Most failed challenges:
            </Text>
            {/* <ChallengeListItem /> */}
         </Feature>
      </Box>
   )
}
