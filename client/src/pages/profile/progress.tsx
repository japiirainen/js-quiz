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
} from '@chakra-ui/core'
import { useGetAllProblemsQuery, useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'

const Progress = () => {
   const [{ data: problemData }] = useGetAllProblemsQuery({ pause: isServer() })
   const [{ data: meData }] = useMeQuery({ pause: isServer() })

   const allProblemsLen = problemData?.getAllProblems.length && length(problemData?.getAllProblems)
   const userProblemsLen = meData?.me?.completedProblems && length(meData.me.completedProblems)

   const allPercentage =
      userProblemsLen &&
      allProblemsLen &&
      Math.round(multiply(divide(userProblemsLen, allProblemsLen), 100))

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
         <Heading>Progress in challenges</Heading>
         <StatGroup>
            <Stat>
               <StatLabel>Total completed:</StatLabel>
               <StatNumber>
                  {userProblemsLen} / {allProblemsLen}
               </StatNumber>
               <StatHelpText>
                  <StatArrow type="increase" />
                  {allPercentage} %
               </StatHelpText>
            </Stat>

            <Stat>
               <StatLabel>Clicked</StatLabel>
               <StatNumber>45</StatNumber>
               <StatHelpText>
                  <StatArrow type="decrease" />
                  9.05%
               </StatHelpText>
            </Stat>
         </StatGroup>
      </AccountLayout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Progress)
