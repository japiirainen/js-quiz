import { Box, Button, Code, Flex, Heading, IconButton, Text } from '@chakra-ui/core'
import { useMachine } from '@xstate/react'
import { motion } from 'framer-motion'
import { useContext, useEffect } from 'react'
import { LandingCarousel } from '../../../assets/staticData/landingPageData'
import { fadeInUp } from '../../animations'
import { LPMachineContext } from '../../context/LPMachineContext'
import { LPCarouselMachine } from '../../machines/LPCarouselMachine'
import { Feature } from './Feature'
import { IntroChallenge } from './IntroChallenge'

export const LandingCarouselCard: React.FC<{ data: LandingCarousel[] }> = ({ data }) => {
   const [current, send, service] = useMachine(LPCarouselMachine)
   const { setService } = useContext(LPMachineContext)
   const currData = data.find(x => x.id === current.context.page)

   useEffect(() => {
      setService(service)
   }, [service, current, send, setService])
   if (current.matches('not_active')) {
      return (
         <motion.div variants={fadeInUp}>
            <Box mt={50}>
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                     variant="solid"
                     variantColor="blue"
                     size="lg"
                     onClick={() => send({ type: 'CLICK_START' })}
                  >
                     Click to start an introduction
                  </Button>
               </motion.div>
            </Box>
         </motion.div>
      )
   }
   if (
      current.matches('active.intro.solving') ||
      current.matches('active.intro.registering.in_progress')
   ) {
      return <IntroChallenge />
   }
   if (current.matches('active')) {
      return (
         <Box marginTop={50}>
            <Feature
               width={['90vw', '90vw', 700, 700]}
               maxWidth="100%"
               p={5}
               height={['auto', 300]}
            >
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
                     {current.matches('active.p_5') ? (
                        <Button
                           fontSize={[25, 30, 40]}
                           ml={12}
                           variant="link"
                           variantColor="blue"
                           size="lg"
                           alignSelf="center"
                           onClick={() => send({ type: 'CLICK_INTRO' })}
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
                              <br />
                              {currData?.github && <a href={currData.github}>{currData.github}</a>}
                           </Heading>
                           <Flex direction={['column', 'row']}>
                              {currData?.exampleTitle && (
                                 <Flex direction={'column'}>
                                    <Text
                                       fontSize={['lg']}
                                       fontWeight="bold"
                                       textAlign="left"
                                       mt={5}
                                    >
                                       {currData?.exampleTitle}
                                    </Text>
                                    {currData.exampleCode && (
                                       <Code m={2} h={'100px'}>
                                          <pre>{currData?.exampleCode}</pre>
                                       </Code>
                                    )}
                                 </Flex>
                              )}
                              {currData?.exampleSolutionTitle && (
                                 <Flex direction={'column'}>
                                    <Text
                                       fontSize={['lg']}
                                       fontWeight="bold"
                                       textAlign="left"
                                       mt={5}
                                    >
                                       {currData?.exampleSolutionTitle}:
                                    </Text>
                                    <Code m={2} h={'100px'}>
                                       <pre>{currData?.exampleSolution}</pre>
                                    </Code>
                                 </Flex>
                              )}
                           </Flex>
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
                        display={current.matches('active.p_5') ? 'none' : 'inline'}
                     />
                  </motion.div>
               </Flex>
            </Feature>
         </Box>
      )
   } else {
      return <Text>Hopefully impossible state</Text>
   }
}
