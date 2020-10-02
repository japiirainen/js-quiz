import React from 'react'
import { Divider, Flex } from '@chakra-ui/core'
import { NextPage } from 'next'
import { LandingPageLayout } from '../layouts/LandingPage'
import { LandingHeader } from './LandingHeader'
import { LandingInfoCard } from './LandingInfoCard'
import { infoCardsData } from '../../../assets/staticData/landingPageData'
import { motion } from 'framer-motion'
import { fadeInDown } from '../../animations'
import { LandingCarousel } from './LandingCarousel'

export const LandingPage: NextPage = () => {
   return (
      <motion.div initial="initial" animate="animate">
         <LandingPageLayout minH={'100vh'} variant={'huge'}>
            <motion.div variants={fadeInDown}>
               <LandingHeader />
            </motion.div>
            <Flex direction={['column', 'row']}>
               {infoCardsData.map((x, i) => (
                  <>
                     <LandingInfoCard key={x.id} mainText={x.main} secondaryText={x.secondary} />
                     <Divider key={i} mt={5} />
                  </>
               ))}
            </Flex>
            <Flex justifyContent="center" my={60}>
               <LandingCarousel />
            </Flex>
         </LandingPageLayout>
      </motion.div>
   )
}
