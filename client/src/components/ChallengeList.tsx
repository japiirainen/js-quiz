import { List, ListItem, Link, Text } from '@chakra-ui/core'
import { RegProblemFragment } from '../generated/graphql'
import { map } from 'ramda'
import NextLink from 'next/link'

interface ChallengeListProps {
   problemList: any
}

const listMapper = (x: RegProblemFragment) => (
   <ListItem key={x._id} fontSize={18}>
      <Link>
         <NextLink href={`/basics/${x.index}`}>{x.name}</NextLink>
      </Link>
   </ListItem>
)

export const ChallengeList: React.FC<ChallengeListProps> = ({ problemList }) => {
   console.log('list', problemList)
   return (
      <List as="ol" styleType="decimal" spacing={3}>
         <Text fontSize={20} textDecoration="underline" mb={4}>
            Challenges in this section:
         </Text>
         {problemList && map(listMapper, problemList)}
      </List>
   )
}
