import React from 'react'
import { Flex } from '@chakra-ui/core'
import { NextPage } from 'next'
import { LandingPageLayout } from '../layouts/LandingPage'
import { LandingHeader } from '../LandingHeader'
import { LandingInfoCard } from '../LandingInfoCard'
import { infoCardsData } from '../../../assets/staticData/landingPageData'
import { motion } from 'framer-motion'
import { fadeInDown } from '../../animations'
import { LandingCarousel } from './LandingCarousel'

export const LandingPage: NextPage = () => {
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
               <LandingCarousel />
            </Flex>
         </LandingPageLayout>
      </motion.div>
   )
}
