import { Box, Heading, useColorMode } from '@chakra-ui/core'

interface LandingHeader {
   text: string
   fontSize: string | string[]
}

export const LandingHeader: React.FC<LandingHeader> = ({ text, fontSize }) => {
   const { colorMode } = useColorMode()
   const fontColor = { light: 'red.300', dark: 'white' }
   return (
      <Box maxWidth={'100%'} justifyContent="center" marginTop={[150, 150, 150, 150]} mb={10}>
         <Heading
            fontSize={fontSize}
            fontFamily="monospace"
            textAlign="center"
            color={fontColor[colorMode]}
         >
            {text}
         </Heading>
      </Box>
   )
}
