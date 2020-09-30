import { Box, Button, Code, Flex, Heading, IconButton, Text } from '@chakra-ui/core'
import { useMachine } from '@xstate/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { LandingCarousel } from '../../../assets/staticData/landingPageData'
import { fadeInUp } from '../../animations'
import { LPCarouselMachine } from '../../machines/LPCarouselMachine'
import { Feature } from './Feature'

export const LandingCarouselCard: React.FC<{ data: LandingCarousel[] }> = ({ data }) => {
   const router = useRouter()
   const [current, send] = useMachine(LPCarouselMachine)
   const currData = data.find(x => x.id === current.context.page)

   if (current.matches('not_active')) {
      return (
         <motion.div variants={fadeInUp}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Button
                  variant="solid"
                  variantColor="blue"
                  size="lg"
                  marginTop={150}
                  onClick={() => send({ type: 'CLICK_START' })}
               >
                  Start intro
               </Button>
            </motion.div>
         </motion.div>
      )
   }
   if (current.matches('active')) {
      return (
         <Box marginTop={150}>
            <Feature>
               <Flex
                  height={'100%'}
                  width={'100%'}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
               >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                     <IconButton
                        onClick={() => send({ type: 'CLICK_PREVIOUS' })}
                        variantColor="blue"
                        variant="outline"
                        aria-label="previous"
                        size="lg"
                        icon="arrow-back"
                        display={current.matches('active.p_1') ? 'none' : 'inline'}
                     />
                  </motion.div>
                  <Flex
                     maxWidth={'70%'}
                     justifyContent="center"
                     direction="column"
                     flexGrow={2}
                     ml={'auto'}
                     mr={'auto'}
                  >
                     {current.matches('active.p_4') ? (
                        <Button
                           fontSize={[25, 30, 40]}
                           ml={12}
                           variant="link"
                           variantColor="blue"
                           size="lg"
                           alignSelf="center"
                           onClick={() => {
                              send({ type: 'CLICK_INTRO' })
                              router.push('/intro')
                           }}
                        >
                           First challenge! {'=>'}
                        </Button>
                     ) : (
                        <>
                           <Heading
                              fontSize={['lg']}
                              fontWeight="medium"
                              textAlign="left"
                              fontFamily="monospace"
                           >
                              {currData?.title}
                           </Heading>
                           {currData?.exampleTitle && (
                              <Text fontSize={['lg']} fontWeight="bold" textAlign="left" mt={5}>
                                 {currData?.exampleTitle}:
                              </Text>
                           )}
                           <Code m={2}>
                              <pre>{currData?.exampleCode}</pre>
                           </Code>
                        </>
                     )}
                  </Flex>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                     <IconButton
                        onClick={() => send({ type: 'CLICK_NEXT' })}
                        ml={'auto'}
                        variant="outline"
                        variantColor="blue"
                        aria-label="next"
                        size="lg"
                        icon="arrow-forward"
                        display={current.matches('active.p_4') ? 'none' : 'inline'}
                     />
                  </motion.div>
               </Flex>
            </Feature>
         </Box>
      )
   } else {
      return <Text>Hepefully impossible state</Text>
   }
}
