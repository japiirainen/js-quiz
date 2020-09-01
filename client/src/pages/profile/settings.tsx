import { AccountLayout } from '../../components/AccountLayout'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import {
   Text,
   StatGroup,
   Stat,
   StatLabel,
   StatNumber,
   StatHelpText,
   StatArrow,
   Heading,
} from '@chakra-ui/core'

const Settings = () => {
   const [{ data }] = useMeQuery({ pause: isServer() })
   return (
      <AccountLayout
         bc2Text={'settings'}
         bc2Href={'/profile/settings'}
         bc1Text={'progress'}
         bc1Href={'/profile'}
         fontSize={'4vh'}
         height={'8vh'}
         title={'Profile'}
         variant={'small'}
         minH={'100vh'}
      >
         <Text>{data?.me?.username}</Text>
         <Heading>Progress in challenges</Heading>
         <StatGroup>
            <Stat>
               <StatLabel>Sent</StatLabel>
               <StatNumber>345,670</StatNumber>
               <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Settings)
