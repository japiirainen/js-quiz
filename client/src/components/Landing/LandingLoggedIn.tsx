import React from 'react'
import { Divider, Flex } from '@chakra-ui/core'
import { NextPage } from 'next'
import { LandingPageLayout } from '../layouts/LandingPage'
import { LandingHeader } from './LandingHeader'
import { LandingInfoCard } from './LandingInfoCard'
import { infoCardsData } from '../../../assets/staticData/landingPageData'
import { motion } from 'framer-motion'
import { fadeInDown } from '../../animations'
import { MostFailedChallenges } from './MostFailedChallenges'
import { MostPopularChallenges } from './MostPopularChallenges'
import { RandPrbBtn } from './RandProbBtn'

export const LandingLoggedIn: NextPage = () => {
   return (
      <motion.div initial="initial" animate="animate">
         <LandingPageLayout minH={'100vh'} variant={'huge'}>
            <motion.div variants={fadeInDown}>
               <LandingHeader fontSize={['3rem', '3rem', '3rem', '4rem']} text={'Js-Quiz'} />
            </motion.div>
            <Flex direction={['column', 'column', 'column', 'row']}>
               {infoCardsData.map((x, i) => (
                  <>
                     <LandingInfoCard key={x.id} mainText={x.main} secondaryText={x.secondary} />
                     <motion.div variants={fadeInDown} key={Number(new Date())}>
                        <Divider key={i} mt={5} />
                     </motion.div>
                  </>
               ))}
            </Flex>
            <Flex justifyContent="center" direction="column" alignItems="center" my={60}>
               <MostPopularChallenges />
               <MostFailedChallenges />
               <motion.div variants={fadeInDown}>
                  <RandPrbBtn />
               </motion.div>
            </Flex>
         </LandingPageLayout>
      </motion.div>
   )
}
