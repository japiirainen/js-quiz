import { Box, Heading } from '@chakra-ui/core'

export const LandingHeader: React.FC = () => {
   return (
      <Box maxWidth={'100%'} justifyContent="center" marginTop={[150, 150, 150, 150]}>
         <Heading
            fontSize={['3rem', '5rem', '5rem', '7rem']}
            fontFamily="monospace"
            textAlign="center"
         >
            Welcome to Js-Quiz
         </Heading>
      </Box>
   )
}
