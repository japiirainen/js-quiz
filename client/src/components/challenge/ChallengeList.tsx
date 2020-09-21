import { List, ListItem, Link, Text, ListIcon, Divider } from '@chakra-ui/core'
import { RegProblemFragment, useMeQuery } from '../../generated/graphql'
import { map, includes } from 'ramda'
import NextLink from 'next/link'
import { isServer } from '../../utils/isServer'
import { FaCheckCircle } from 'react-icons/fa'

interface ChallengeListProps {
   problemList: any
   groupName: string | undefined
}

export const ChallengeList: React.FC<ChallengeListProps> = ({ problemList, groupName }) => {
   const [{ data }] = useMeQuery({ pause: isServer() })
   const isComplete = (id: string) => includes(id, data?.me?.completedProblems as any)

   const listMapper = (x: RegProblemFragment) => (
      <ListItem key={x._id} fontSize={[22, 22, 20, 18]}>
         <Link>
            <NextLink href={`[index]`} as={`/${groupName}/${x.index}`}>
               <a>{x.name}</a>
            </NextLink>
            {isComplete(x._id) && (
               <ListIcon icon={FaCheckCircle} ml={2} color="green.500" size={'13px'} />
            )}
         </Link>
      </ListItem>
   )
   return (
      <>
         <List as="ol" styleType="decimal" spacing={3}>
            <Text fontSize={[25, 22, 20, 20]} textDecoration="underline" mb={4}>
               Challenges in this section:
            </Text>
            {problemList && map(listMapper, problemList)}
         </List>
         <Divider m={10} />
      </>
   )
}
