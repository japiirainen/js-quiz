import { Box, Heading } from '@chakra-ui/core'

interface LandingHeader {
   text: string
   fontSize: string | string[]
}

export const LandingHeader: React.FC<LandingHeader> = ({ text, fontSize }) => {
   return (
      <Box maxWidth={'100%'} justifyContent="center" marginTop={[150, 150, 150, 150]} mb={10}>
         <Heading fontSize={fontSize} fontFamily="monospace" textAlign="center" color="red.400">
            {text}
         </Heading>
      </Box>
   )
}
