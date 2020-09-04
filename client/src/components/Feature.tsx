import Box from '@chakra-ui/core/dist/Box'
import { Heading, Text } from '@chakra-ui/core'

interface FeatureProps {
   title: string
   desc: string
}

export const Feature: React.FC<FeatureProps> = ({ title, desc, ...rest }) => {
   return (
      <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md" {...rest}>
         <Heading fontSize="xl">{title}</Heading>
         <Text mt={4}>{desc}</Text>
      </Box>
   )
}
