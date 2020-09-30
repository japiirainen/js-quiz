import React from 'react'
import { Flex } from '@chakra-ui/core'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { LandingPageLayout } from '../components/layouts/LandingPage'
import { LandingHeader } from '../components/LandingHeader'
import { LandingInfoCard } from '../components/LandingInfoCard'
import { infoCardsData, landingCarouselData } from '../../assets/staticData/landingPageData'
import { LandingCarouselCard } from '../components/LandingCarouselCard'
import { motion } from 'framer-motion'
import { fadeInDown } from '../animations'

const Intro: NextPage = () => {
   return (
      <motion.div initial="initial" animate="animate">
         <LandingPageLayout height={'8vh'} minH={'100vh'} variant={'huge'}>
            <motion.div variants={fadeInDown}>
               <LandingHeader />
            </motion.div>
            <Flex direction={['column', 'row']}>
               {infoCardsData.map(x => (
                  <LandingInfoCard key={x.id} mainText={x.main} secondaryText={x.secondary} />
               ))}
            </Flex>
            <Flex justifyContent="center">
               {landingCarouselData.map(x => (
                  <LandingCarouselCard
                     key={x.id}
                     id={x.id}
                     title={x.title}
                     exampleTitle={x.exampleTitle}
                     exampleCode={x.exampleCode}
                     exampleSolution={x.exampleSolution}
                     exampleSolutionTitle={x.exampleSolutionTitle}
                  />
               ))}
            </Flex>
         </LandingPageLayout>
      </motion.div>
   )
}
export default withUrqlClient(createUrqlClient, { ssr: true })(Intro)
