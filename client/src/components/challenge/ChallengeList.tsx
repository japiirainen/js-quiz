import { List, ListItem, Link, Text, ListIcon, Divider } from '@chakra-ui/core'
import { RegProblemFragment, useMeQuery } from '../../generated/graphql'
import { map, includes } from 'ramda'
import NextLink from 'next/link'
import { isServer } from '../../utils/isServer'
import { FaCheckCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '../../animations'

interface ChallengeListProps {
   problemList: any
   groupName: string | undefined
}

export const ChallengeList: React.FC<ChallengeListProps> = ({ problemList, groupName }) => {
   const [{ data }] = useMeQuery({ pause: isServer() })
   const isComplete = (id: string) => includes(id, data?.me?.completedProblems as any)

   const listMapper = (x: RegProblemFragment) => (
      <motion.div variants={fadeInUp}>
         <ListItem key={x._id} fontSize={[20, 20, 20, 18]} m={1}>
            <Link>
               <NextLink href={`[index]`} as={`/${groupName}/${x.index}`}>
                  <a>{x.name}</a>
               </NextLink>
               {isComplete(x._id) && (
                  <ListIcon icon={FaCheckCircle} ml={2} color="green.500" size={'13px'} />
               )}
            </Link>
         </ListItem>
      </motion.div>
   )
   return (
      <motion.div initial="initial" animate="animate">
         <List as="ol" styleType="decimal" spacing={3}>
            <motion.div
               initial={{ x: 100, opacity: 0 }}
               transition={{ delay: 0.2 }}
               animate={{ x: 0, opacity: 1 }}
            >
               <Text fontSize={[25, 22, 20, 20]} textDecoration="underline" mb={4}>
                  Challenges in this section:
               </Text>
            </motion.div>
            <motion.div variants={stagger}>
               {problemList && map(listMapper, problemList)}
            </motion.div>
         </List>
         <Divider m={10} />
      </motion.div>
   )
}
