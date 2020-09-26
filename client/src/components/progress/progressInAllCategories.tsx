import { length, __, prop, map } from 'ramda'
import {
   StatGroup,
   Stat,
   StatLabel,
   StatNumber,
   StatHelpText,
   StatArrow,
   Heading,
   Flex,
} from '@chakra-ui/core'
import {
   useGetAllProblemsQuery,
   useMeQuery,
   useGetManyGroupsOfProblemsQuery,
} from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { LoadingSpinner } from '../LoadingSpinner'
import { calcPercentage, calcLen } from '../../utils/helperFns'
import { motion } from 'framer-motion'
import { fadeInDown, fadeInUp, stagger } from '../../animations'

export const ProgressInAllCategories: React.FC = () => {
   const [{ data: problemData, fetching: problemFetching }] = useGetAllProblemsQuery({
      pause: isServer(),
   })
   const [{ data: meData }] = useMeQuery({ pause: isServer() })
   const [{ data: groupsData, fetching }] = useGetManyGroupsOfProblemsQuery({
      variables: {
         names: ['basics', 'conditionals', 'loops'],
      },
      pause: isServer(),
   })
   const basics =
      groupsData?.getManyGroupsOfProblems.g1?.length && groupsData?.getManyGroupsOfProblems.g1
   const conditionals =
      groupsData?.getManyGroupsOfProblems.g2?.length && groupsData?.getManyGroupsOfProblems.g2
   const loops =
      groupsData?.getManyGroupsOfProblems.g3?.length && groupsData?.getManyGroupsOfProblems.g3

   const allProblemsLen = problemData?.getAllProblems.length && length(problemData?.getAllProblems)
   const userAllProblemsLen = meData?.me?.completedProblems && length(meData.me.completedProblems)
   const basicProblemsLen = basics && length(basics)
   const condProblemsLen = conditionals && length(conditionals)
   const loopsProbLen = loops && length(loops)

   const userBasicsProblemsLen =
      basics &&
      meData?.me?.completedProblems &&
      calcLen(meData.me.completedProblems, map(prop('_id') as any, basics))
   const userCondProblemsLen =
      conditionals &&
      meData?.me?.completedProblems &&
      calcLen(meData?.me?.completedProblems, map(prop('_id') as any, conditionals))
   const userLoopsProbLen =
      loops &&
      meData?.me?.completedProblems &&
      calcLen(meData?.me?.completedProblems, map(prop('_id') as any, loops))

   const allPercentage =
      userAllProblemsLen && allProblemsLen && calcPercentage(userAllProblemsLen, allProblemsLen)
   const basicsPercentage =
      userBasicsProblemsLen &&
      basicProblemsLen &&
      calcPercentage(userBasicsProblemsLen, basicProblemsLen)

   const condPercentage =
      userCondProblemsLen && condProblemsLen && calcPercentage(userCondProblemsLen, condProblemsLen)
   const loopsPercentage =
      userLoopsProbLen && loopsProbLen && calcPercentage(userLoopsProbLen, loopsProbLen)

   return (
      <motion.div initial="initial" animate="animate">
         {fetching || problemFetching ? (
            <LoadingSpinner />
         ) : (
            <motion.div variants={stagger}>
               <motion.div variants={fadeInDown}>
                  <Heading textAlign="center" fontSize={30}>
                     Progress in challenges
                  </Heading>
               </motion.div>
               <StatGroup direction="column" alignItems={'center'}>
                  <motion.div variants={fadeInUp}>
                     <Stat mt={8}>
                        <StatLabel fontSize={20}>Total completed:</StatLabel>
                        {problemFetching ? (
                           <LoadingSpinner />
                        ) : (
                           <Flex direction="column" alignItems="center">
                              <StatNumber>
                                 {userAllProblemsLen} / {allProblemsLen}
                              </StatNumber>
                              <StatHelpText>
                                 <StatArrow
                                    type={userAllProblemsLen === 0 ? 'decrease' : 'increase'}
                                 />
                                 {allPercentage} %
                              </StatHelpText>
                           </Flex>
                        )}
                     </Stat>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                     <Stat mt={8}>
                        <StatLabel fontSize={20}>Basics completed:</StatLabel>
                        {fetching ? (
                           <LoadingSpinner />
                        ) : (
                           <Flex direction="column" alignItems="center">
                              <StatNumber>
                                 {userBasicsProblemsLen} / {basicProblemsLen}
                              </StatNumber>
                              <StatHelpText>
                                 <StatArrow
                                    type={userBasicsProblemsLen === 0 ? 'decrease' : 'increase'}
                                 />
                                 {basicsPercentage} %
                              </StatHelpText>
                           </Flex>
                        )}
                     </Stat>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                     <Stat mt={8}>
                        <StatLabel fontSize={20}>Conditionals completed:</StatLabel>
                        {fetching ? (
                           <LoadingSpinner />
                        ) : (
                           <Flex direction="column" alignItems="center">
                              <StatNumber>
                                 {userCondProblemsLen} / {condProblemsLen}
                              </StatNumber>
                              <StatHelpText>
                                 <StatArrow
                                    type={userCondProblemsLen === 0 ? 'decrease' : 'increase'}
                                 />
                                 {condPercentage} %
                              </StatHelpText>
                           </Flex>
                        )}
                     </Stat>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                     <Stat mt={8}>
                        <StatLabel fontSize={20}>Loops completed:</StatLabel>
                        {fetching ? (
                           <LoadingSpinner />
                        ) : (
                           <Flex direction="column" alignItems="center">
                              <StatNumber>
                                 {userLoopsProbLen} / {loopsProbLen}
                              </StatNumber>
                              <StatHelpText>
                                 <StatArrow
                                    type={userLoopsProbLen === 0 ? 'decrease' : 'increase'}
                                 />
                                 {loopsPercentage} %
                              </StatHelpText>
                           </Flex>
                        )}
                     </Stat>
                  </motion.div>
               </StatGroup>
            </motion.div>
         )}
      </motion.div>
   )
}
