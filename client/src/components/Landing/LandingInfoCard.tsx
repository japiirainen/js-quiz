import { Flex, Text } from '@chakra-ui/core'
import { motion } from 'framer-motion'
import { fadeInDown } from '../../animations'

interface LandingInfoCardProps {
   mainText: string
   secondaryText: string
}

export const LandingInfoCard: React.FC<LandingInfoCardProps> = ({ mainText, secondaryText }) => {
   return (
      <Flex
         maxWidth={'100%'}
         width={'100%'}
         alignItems="top"
         marginTop={[30, 30, 30, 150]}
         direction="column"
      >
         <motion.div variants={fadeInDown}>
            <Text
               marginBottom={2}
               fontSize={['xl', 'xl']}
               fontFamily="monospace"
               textAlign="center"
               fontWeight="bold"
            >
               {mainText}
            </Text>
            <Text
               fontSize={['2xl', '2xl', '2xl', 'xl']}
               fontFamily="monospace"
               textAlign="center"
               fontWeight="light"
            >
               {secondaryText}
            </Text>
         </motion.div>
      </Flex>
   )
}
