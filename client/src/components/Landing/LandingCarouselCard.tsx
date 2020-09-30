import { Box, Code, Flex, Heading, IconButton, Text } from '@chakra-ui/core'
import { LandingCarousel } from '../../../assets/staticData/landingPageData'
import { Feature } from './Feature'

export const LandingCarouselCard: React.FC<{ data: LandingCarousel }> = ({ data }) => {
   const { id, title, exampleCode, exampleTitle } = data
   return (
      <Box maxWidth={800} minWidth={['100%', 700]} marginTop={150}>
         <Feature>
            <Flex height={'100%'} width={'100%'} direction="column" alignItems="center">
               <Flex maxWidth={500} justifyContent="center" direction="column">
                  <Heading
                     fontSize={['lg']}
                     fontWeight="medium"
                     textAlign="left"
                     fontFamily="monospace"
                  >
                     {title}
                  </Heading>
                  {exampleTitle && (
                     <Text fontSize={['lg']} fontWeight="bold" textAlign="left" mt={5}>
                        {exampleTitle}:
                     </Text>
                  )}
                  <Code m={2}>
                     <pre>{exampleCode}</pre>
                  </Code>
               </Flex>
               <Flex width={'100%'}>
                  <IconButton
                     variantColor="blue"
                     variant="outline"
                     aria-label="previous"
                     size="lg"
                     icon="arrow-back"
                  />
                  <IconButton
                     ml={'auto'}
                     variant="outline"
                     variantColor="blue"
                     aria-label="next"
                     size="lg"
                     icon="arrow-forward"
                  />
               </Flex>
            </Flex>
         </Feature>
      </Box>
   )
}
