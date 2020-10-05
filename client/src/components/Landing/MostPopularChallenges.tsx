import { Box, Text } from '@chakra-ui/core'
import { Feature } from './Feature'

export const MostPopularChallenges: React.FC = () => {
   return (
      <Box>
         <Feature width={['90vw', '90vw', 700, 700]} p={5} height={['auto', 200]}>
            <Text color="red.300" fontSize={[20, 20, 20, 25]}>
               Most popular challenges:
            </Text>
         </Feature>
      </Box>
   )
}
