import { AccountLayout } from '../../components/layouts/AccountLayout'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { UserLevelDisplay } from '../../components/progress/UserLevel'
import { NextPage } from 'next'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import {
   Heading,
   StatGroup,
   Stat,
   StatLabel,
   Flex,
   StatNumber,
   StatHelpText,
   StatArrow,
} from '@chakra-ui/core'
import {
   useGetAllProblemsQuery,
   useMeQuery,
   useGetManyGroupsOfProblemsQuery,
} from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { calcLen, calcPercentage } from '../../utils/helperFns'
import { map, prop, length } from 'ramda'

const Progress: NextPage = () => {
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
      <AccountLayout
         bc2Text={'settings'}
         bc2Href={'/profile/settings'}
         bc1Text={'progress'}
         bc1Href={'/profile/progress'}
         fontSize={'4vh'}
         height={'8vh'}
         title={'Profile'}
         variant={'small'}
         minH={'100vh'}
      >
         <UserLevelDisplay />
         {fetching || problemFetching ? (
            <LoadingSpinner />
         ) : (
            <>
               <Heading textAlign="center" fontSize={30}>
                  Progress in challenges
               </Heading>
               <StatGroup direction="column" alignItems={'center'}>
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
                              <StatArrow type={userLoopsProbLen === 0 ? 'decrease' : 'increase'} />
                              {loopsPercentage} %
                           </StatHelpText>
                        </Flex>
                     )}
                  </Stat>
               </StatGroup>
            </>
         )}
      </AccountLayout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Progress)
