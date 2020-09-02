import { AccountLayout } from '../../components/AccountLayout'
import { length, divide, multiply } from 'ramda'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
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
   useGetProblemsInGroupQuery,
} from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { LoadingSpinner } from '../../components/LoadingSpinner'

const Progress = () => {
   const [{ data: problemData, fetching: problemFetching }] = useGetAllProblemsQuery({
      pause: isServer(),
   })
   const [{ data: meData }] = useMeQuery({ pause: isServer() })
   const [{ data: basicsData, fetching: basicsFetching }] = useGetProblemsInGroupQuery({
      variables: { groupName: 'basics' },
      pause: isServer(),
   })
   const [{ data: condData, fetching: condFetching }] = useGetProblemsInGroupQuery({
      variables: { groupName: 'conditionals' },
      pause: isServer(),
   })

   const allProblemsLen = problemData?.getAllProblems.length && length(problemData?.getAllProblems)
   const userAllProblemsLen = meData?.me?.completedProblems && length(meData.me.completedProblems)
   const basicProblemsLen =
      basicsData?.findProblemsInGroup?.length && length(basicsData?.findProblemsInGroup)
   const condProblemsLen =
      condData?.findProblemsInGroup?.length && length(condData?.findProblemsInGroup)
   const userBasicsProblemsLen =
      basicsData?.findProblemsInGroup &&
      length(
         basicsData?.findProblemsInGroup.filter(
            x => x && meData?.me?.completedProblems?.includes(x?._id)
         )
      )
   const userCondProblemsLen =
      condData?.findProblemsInGroup &&
      length(
         condData?.findProblemsInGroup.filter(
            x => x && meData?.me?.completedProblems?.includes(x?._id)
         )
      )
   const allPercentage =
      userAllProblemsLen &&
      allProblemsLen &&
      Math.round(multiply(divide(userAllProblemsLen, allProblemsLen), 100))

   const basicsPercentage =
      userBasicsProblemsLen &&
      basicProblemsLen &&
      Math.round(multiply(divide(userBasicsProblemsLen, basicProblemsLen), 100))
   const condPercentage =
      userCondProblemsLen &&
      condProblemsLen &&
      Math.round(multiply(divide(userCondProblemsLen, condProblemsLen), 100))
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
                        <StatArrow type={userAllProblemsLen === 0 ? 'decrease' : 'increase'} />
                        {allPercentage} %
                     </StatHelpText>
                  </Flex>
               )}
            </Stat>
            <Stat mt={8}>
               <StatLabel fontSize={20}>Basics completed:</StatLabel>
               {basicsFetching ? (
                  <LoadingSpinner />
               ) : (
                  <Flex direction="column" alignItems="center">
                     <StatNumber>
                        {userBasicsProblemsLen} / {basicProblemsLen}
                     </StatNumber>
                     <StatHelpText>
                        <StatArrow type={userBasicsProblemsLen === 0 ? 'decrease' : 'increase'} />
                        {basicsPercentage} %
                     </StatHelpText>
                  </Flex>
               )}
            </Stat>
            <Stat mt={8}>
               <StatLabel fontSize={20}>Conditionals completed:</StatLabel>
               {condFetching ? (
                  <LoadingSpinner />
               ) : (
                  <Flex direction="column" alignItems="center">
                     <StatNumber>
                        {userCondProblemsLen} / {condProblemsLen}
                     </StatNumber>
                     <StatHelpText>
                        <StatArrow type={userCondProblemsLen === 0 ? 'decrease' : 'increase'} />
                        {condPercentage} %
                     </StatHelpText>
                  </Flex>
               )}
            </Stat>
         </StatGroup>
      </AccountLayout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Progress)
