import { Box, Progress, Text, Flex, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/core'
import { calcPercentage, calcLen, calcColor } from '../utils/helperFns'
import { map, prop, length } from 'ramda'
import { useMeQuery, GetProblemsInGroupQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

interface ProgressBarProps {
   ProblemData: GetProblemsInGroupQuery | undefined
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ ProblemData }) => {
   const [{ data: meData }] = useMeQuery({ pause: isServer() })

   const userProblemLen =
      ProblemData &&
      meData?.me?.completedProblems &&
      calcLen(meData.me.completedProblems, map(prop('_id') as any, ProblemData.findProblemsInGroup))

   const problemsLen =
      ProblemData?.findProblemsInGroup?.length && length(ProblemData.findProblemsInGroup)

   const percentage =
      userProblemLen && problemsLen && (calcPercentage(userProblemLen, problemsLen) as never)

   return (
      <Box width="60%" ml={'auto'}>
         <Text fontSize={22} mb={24}>
            Your progress in this section:
         </Text>
         <Flex direction="column" alignItems="center">
            <StatNumber>
               {userProblemLen} / {problemsLen}
            </StatNumber>
            <StatHelpText>
               <StatArrow type={userProblemLen === 0 ? 'decrease' : 'increase'} />
               {percentage} %
            </StatHelpText>
         </Flex>
         {percentage ? (
            <Progress
               color={calcColor(percentage)}
               hasStripe
               value={percentage}
               size={'lg'}
               isAnimated
               mt={7}
            />
         ) : (
            <Progress color={'red'} hasStripe value={1} size={'lg'} isAnimated mt={7} />
         )}
      </Box>
   )
}
